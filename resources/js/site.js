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

window.Alpine = Alpine;

Alpine.start();
