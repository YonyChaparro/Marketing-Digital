const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Load More/Less Logic
const loadMoreBtn = document.getElementById('load-more-btn');
const loadLessBtn = document.getElementById('load-less-btn');
const hiddenPhotos = document.querySelectorAll('.hidden-photo');

loadMoreBtn.addEventListener('click', () => {
    hiddenPhotos.forEach(photo => {
        photo.classList.remove('hidden');
        photo.classList.add('animate-fade-in'); 
    });
    loadMoreBtn.classList.add('hidden');
    loadLessBtn.classList.remove('hidden');
});

loadLessBtn.addEventListener('click', () => {
    hiddenPhotos.forEach(photo => {
        photo.classList.add('hidden');
        photo.classList.remove('animate-fade-in'); 
    });
    loadMoreBtn.classList.remove('hidden');
    loadLessBtn.classList.add('hidden');
    // Scroll back to gallery start smoothly
    document.getElementById('galeria').scrollIntoView({ behavior: 'smooth' });
});

// Carousel Logic
const track = document.getElementById('carousel-track');

// Event Data
const events = [
    { img: './img/Eventos/1.jpg', title: 'EVENTO EL ESPIRAL' },
    { img: './img/Eventos/2.jpg', title: 'BATALLA DE GALLOS' },
    { img: './img/Eventos/3.webp', title: 'WORKSHOP URBANO' },
    { img: './img/Eventos/4.jpg', title: 'CONCIERTO EN VIVO' },
    { img: './img/Eventos/5.jpg', title: 'EXHIBICIÓN DE ARTE' },
    { img: './img/Eventos/6.jpg', title: 'TORNEO DE BREAKDANCE' },
    { img: './img/Eventos/7.jpg', title: 'SESIÓN DE DJ' },
    { img: './img/Eventos/8.jpg', title: 'FIESTA URBANA' },
    { img: './img/Eventos/9.jpg', title: 'SHOWCASE' },
    { img: './img/Eventos/10.jpg', title: 'EVENTO ESPECIAL' },
    { img: './img/Eventos/11.webp', title: 'NOCHE DE TALENTOS' },
    { img: './img/Eventos/12.jpg', title: 'FESTIVAL URBANO' },
    { img: './img/Eventos/13.jpg', title: 'COMPETENCIA DE RAP' },
    { img: './img/Eventos/14.jpg', title: 'ENCUENTRO CULTURAL' },
    { img: './img/Eventos/15.jpg', title: 'GRAN FINAL' }
];

// Render Carousel Items
function renderCarouselItems() {
    const itemsHTML = events.map((event) => `
        <div class="carousel-item min-w-full md:min-w-[33.333%] p-4 flex-shrink-0 select-none">
            <div class="border-2 border-yellow-400 p-4 flex flex-col items-center bg-black hover:shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-shadow h-full">
                <div class="w-full mb-4 overflow-hidden flex justify-center pointer-events-none">
                    <img src="${event.img}" alt="${event.title}" class="h-auto max-h-96 w-auto max-w-[90%] object-contain hover:scale-110 transition-transform duration-500">
                </div>
                <h3 class="text-2xl font-urban text-center mb-2 uppercase leading-none tracking-wide pointer-events-none">${event.title}</h3>
                <p class="text-gray-300 mb-6 font-bold pointer-events-none">PRÓXIMAMENTE</p>
                <a href="#" class="mt-auto bg-yellow-400 text-black font-urban py-2 px-6 rounded hover:bg-yellow-300 transition-colors uppercase w-full text-center text-xl tracking-wider pointer-events-auto">INFO & ENTRADAS</a>
            </div>
        </div>
    `).join('');
    
    // Duplicate items for infinite scroll effect
    track.innerHTML = itemsHTML + itemsHTML;
}

// Initialize Carousel
renderCarouselItems();

// Continuous Scroll & Drag Logic
let position = 0;
let isDragging = false;
let startX = 0;
let animationId;
let speed = 1; // Pixels per frame

function getSingleSetWidth() {
    const items = track.children;
    if (items.length === 0) return 0;
    // Calculate width of the first half of items (original set)
    let width = 0;
    const halfCount = items.length / 2;
    for (let i = 0; i < halfCount; i++) {
        width += items[i].offsetWidth;
    }
    return width;
}

function animate() {
    if (!isDragging) {
        position -= speed;
        const setWidth = getSingleSetWidth();

        // Reset if moved past the first set
        if (position <= -setWidth) {
            position = 0;
        }
        
        // Handle positive position (dragging right)
        if (position > 0) {
            position = -setWidth;
        }

        track.style.transform = `translateX(${position}px)`;
    }
    animationId = requestAnimationFrame(animate);
}

// Start animation
animationId = requestAnimationFrame(animate);

// Drag Events
track.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - position;
    track.style.cursor = 'grabbing';
});

track.addEventListener('mouseleave', () => {
    isDragging = false;
    track.style.cursor = 'grab';
});

track.addEventListener('mouseup', () => {
    isDragging = false;
    track.style.cursor = 'grab';
});

track.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    position = e.pageX - startX;
    track.style.transform = `translateX(${position}px)`;
});

// Touch events for mobile
track.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - position;
});

track.addEventListener('touchend', () => {
    isDragging = false;
});

track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    position = e.touches[0].pageX - startX;
    track.style.transform = `translateX(${position}px)`;
});

// Handle resize to recalculate widths if needed (though getSingleSetWidth does it dynamically)
window.addEventListener('resize', () => {
    // Optional: Reset position or adjust if layout breaks significantly
});
