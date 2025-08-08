import Alpine from "alpinejs";
import screen from "@victoryoalli/alpinejs-screen";
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

Alpine.plugin(screen);

// Dynamic Card Carousel Alpine Component
Alpine.data('dynamicCardCarousel', () => ({
    swiper: null,
    
    init() {
        this.swiper = new Swiper(this.$el.querySelector('.dynamic-card-swiper'), {
            modules: [Navigation, Pagination, Autoplay],
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 1,
                },
                1024: {
                    slidesPerView: 1,
                },
            }
        });
    },
    
    destroy() {
        if (this.swiper) {
            this.swiper.destroy();
        }
    }
}));

// Blog Filter Alpine Component
Alpine.data('blogFeed', () => ({
    // UI state
    loading: false,
    posts: [],
    categories: [],
    page: { total: 0, from: 0, to: 0 },

    // Query state
    state: {
        page: 1,
        limit: 4,
        sort: 'date:desc',
        category: 'all',
        q: ''
    },

    get totalPages() {
        return Math.max(1, Math.ceil(this.page.total / this.state.limit));
    },

    get pageNumbers() {
        const total = this.totalPages;
        const current = this.state.page;
        const pages = [];
        if (total <= 5) {
            for (let i = 1; i <= total; i++) pages.push(i);
        } else {
            const start = Math.max(1, current - 2);
            const end = Math.min(total, current + 2);
            for (let i = start; i <= end; i++) pages.push(i);
            if (start > 1) {
                pages.unshift(1);
                if (start > 2) pages.splice(1, 0, '...');
            }
            if (end < total) {
                if (end < total - 1) pages.push('...');
                pages.push(total);
            }
        }
        return pages;
    },

    init() {
        this.fetchCategories();
        this.fetchPosts();
    },

    async fetchCategories() {
        try {
            const res = await fetch('/api/categories');
            const json = await res.json();
            this.categories = json.categories || [];
        } catch (e) {
            console.error('Failed to load categories', e);
        }
    },

    async fetchPosts() {
        this.loading = true;
        try {
            const params = new URLSearchParams();
            params.set('limit', String(this.state.limit));
            params.set('offset', String((this.state.page - 1) * this.state.limit));
            if (this.state.q) params.set('q', this.state.q);
            if (this.state.category && this.state.category !== 'all') params.set('category', this.state.category);
            if (this.state.sort) params.set('sort', this.state.sort);
            // Provide server-safe defaults if not set
            if (!params.has('limit')) params.set('limit', String(this.state.limit));
            if (!params.has('offset')) params.set('offset', String((this.state.page - 1) * this.state.limit));
            const res = await fetch(`/api/posts?${params.toString()}`, { headers: { 'Accept': 'application/json' } });
            const json = await res.json();
            this.posts = json.posts || [];
            const total = Number(json.total || 0);
            const from = total ? (this.state.page - 1) * this.state.limit + 1 : 0;
            const to = Math.min(this.state.page * this.state.limit, total);
            this.page = { total, from, to };
        } catch (e) {
            console.error('Failed to load posts', e);
        } finally {
            this.loading = false;
        }
    },

    // Handlers
    setCategory(slug) {
        this.state.category = slug;
        this.state.page = 1;
        this.fetchPosts();
    },

    onSearchInput(event) {
        this.state.q = event.target.value || '';
        this.state.page = 1;
        this.fetchPosts();
    },

    onSortChange() {
        this.state.page = 1;
        this.fetchPosts();
    },

    clearCategoryFilter() {
        this.setCategory('all');
    },

    clearSearch() {
        this.state.q = '';
        this.state.page = 1;
        this.fetchPosts();
    },

    clearAllFilters() {
        this.state = { ...this.state, category: 'all', q: '', page: 1 };
        this.fetchPosts();
    },

    getCategoryTitle(slug) {
        const found = this.categories.find(c => c.slug === slug);
        return found ? found.title : slug;
    },

    prevPage: function() {
        if (this.state.page > 1) {
            this.state.page -= 1;
            this.fetchPosts();
        }
    },
    nextPage: function() {
        if (this.state.page < this.totalPages) {
            this.state.page += 1;
            this.fetchPosts();
        }
    },
    goToPage(page) {
        if (page >= 1 && page <= this.totalPages) {
            this.state.page = page;
            this.fetchPosts();
        }
    }
}));

window.Alpine = Alpine;

Alpine.start();
