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
        limit: 6,
        sort: 'date:desc',
        category: 'all',
        q: ''
    },

    get totalPages() {
        const last = this.page.lastPage || Math.ceil((this.page.total || 0) / this.state.limit) || 1;
        return Math.max(1, last);
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
            const res = await fetch('/api/taxonomies/categories/terms');
            const json = await res.json();
            this.categories = (json.data || []).map(t => ({ slug: t.slug || t.id || t.handle || t.title?.toLowerCase?.(), title: t.title }));
        } catch (e) {
            console.error('Failed to load categories', e);
        }
    },

    async fetchPosts() {
        this.loading = true;
        try {
            const params = new URLSearchParams();
            // pagination (Statamic REST API expects per_page & page)
            params.set('limit', String(this.state.limit));
            params.set('page', String(this.state.page));
            // sorting: Statamic expects field names with optional - prefix
            if (this.state.sort) {
                const [field, dir] = this.state.sort.split(':');
                params.set('sort', dir === 'desc' ? `-${field}` : field);
            }
            // filtering
            if (this.state.q) params.set('filter[title:contains]', this.state.q);
            if (this.state.category && this.state.category !== 'all') params.set('filter[categories:contains]', this.state.category);

            const res = await fetch(`/api/collections/posts/entries?${params.toString()}`, { headers: { 'Accept': 'application/json' } });
            const json = await res.json();

            const items = json.data || [];
            // Map entries to the shape used in the template
            const stripHtml = (html) => {
                if (!html) return '';
                const el = document.createElement('div');
                el.innerHTML = html;
                return (el.textContent || '').trim();
            };

            this.posts = items.map(item => {
                const rawContent = Array.isArray(item.content) ? item.content.map(n => n.text).filter(Boolean).join(' ') : '';
                const excerpt = stripHtml(rawContent).slice(0, 160);
                const categories = (item.categories || []).map(cat => ({ slug: cat.slug || cat.id || '', title: cat.title || '' }));
                const featured = (typeof item.featured_image === 'object' && item.featured_image) ? item.featured_image.url : item.featured_image;
                return {
                    id: item.id,
                    title: item.title,
                    url: item.url || item.permalink,
                    date: item.date,
                    featured_image: featured,
                    excerpt,
                    categories,
                };
            });

            const total = json.meta?.total ?? json.meta?.pagination?.total ?? 0;
            const from = json.meta?.from ?? json.meta?.pagination?.from ?? (total ? (this.state.page - 1) * this.state.limit + 1 : 0);
            const to = json.meta?.to ?? json.meta?.pagination?.to ?? Math.min(this.state.page * this.state.limit, total);
            const lastPage = json.meta?.last_page ?? json.meta?.pagination?.last_page ?? undefined;
            this.page = { total, from, to, lastPage };
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
