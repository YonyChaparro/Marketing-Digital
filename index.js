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
let animationId; // Declare globally for access in modal functions

// Event Data
const events = [
    { img: './img/Eventos/1.jpg', title: 'EVENTO EL ESPIRAL', price: 'GRATIS', description: 'Únete a nosotros para la gran inauguración de la temporada. Música en vivo, exhibiciones de arte y mucho más.' },
    { img: './img/Eventos/2.jpg', title: 'BATALLA DE GALLOS', price: '$20.000', description: 'Los mejores MCs de la ciudad se enfrentan en una batalla épica. ¿Quién se llevará el título?' },
    { img: './img/Eventos/3.webp', title: 'WORKSHOP URBANO', price: '$15.000', description: 'Aprende los fundamentos del graffiti y el breakdance con instructores expertos.' },
    { img: './img/Eventos/4.jpg', title: 'CONCIERTO EN VIVO', price: '$30.000', description: 'Una noche inolvidable con las mejores bandas locales y artistas invitados.' },
    { img: './img/Eventos/5.jpg', title: 'EXHIBICIÓN DE ARTE', price: 'GRATIS', description: 'Descubre el talento de artistas emergentes en nuestra galería urbana.' },
    { img: './img/Eventos/6.jpg', title: 'TORNEO DE BREAKDANCE', price: '$10.000', description: 'Siente el ritmo y la energía en este torneo donde los mejores B-boys y B-girls compiten.' },
    { img: './img/Eventos/7.jpg', title: 'SESIÓN DE DJ', price: '$25.000', description: 'Baila toda la noche con los sets más explosivos de nuestros DJs residentes.' },
    { img: './img/Eventos/8.jpg', title: 'FIESTA URBANA', price: '$20.000', description: 'La mejor fiesta de la ciudad con música, baile y buen ambiente.' },
    { img: './img/Eventos/9.jpg', title: 'SHOWCASE', price: 'GRATIS', description: 'Una muestra de los proyectos más innovadores de nuestra comunidad.' },
    { img: './img/Eventos/10.jpg', title: 'EVENTO ESPECIAL', price: '$50.000', description: 'Un evento exclusivo con sorpresas y actividades únicas.' },
    { img: './img/Eventos/11.webp', title: 'NOCHE DE TALENTOS', price: 'GRATIS', description: 'El escenario es tuyo. Ven y demuestra tu talento ante el público.' },
    { img: './img/Eventos/12.jpg', title: 'FESTIVAL URBANO', price: '$40.000', description: 'Un día completo de cultura urbana: música, arte, deporte y gastronomía.' },
    { img: './img/Eventos/13.jpg', title: 'COMPETENCIA DE RAP', price: '$15.000', description: 'Pon a prueba tus rimas y tu flow en esta competencia de alto nivel.' },
    { img: './img/Eventos/14.jpg', title: 'ENCUENTRO CULTURAL', price: 'GRATIS', description: 'Un espacio para el diálogo y el intercambio de ideas sobre la cultura urbana.' },
    { img: './img/Eventos/15.jpg', title: 'GRAN FINAL', price: '$60.000', description: 'El evento más esperado del año. Los finalistas se disputan el gran premio.' }
];

// Render Carousel Items
function renderCarouselItems() {
    const itemsHTML = events.map((event, index) => `
        <div class="carousel-item w-auto p-4 flex-shrink-0 select-none">
            <div class="border-2 border-yellow-400 p-4 flex flex-col items-center bg-black hover:shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-shadow h-full">
                <div class="mb-4 overflow-hidden flex justify-center pointer-events-none">
                    <img src="${event.img}" alt="${event.title}" class="h-80 md:h-96 w-auto object-contain hover:scale-110 transition-transform duration-500">
                </div>
                <h3 class="text-2xl font-urban text-center mb-2 uppercase leading-none tracking-wide pointer-events-none">${event.title}</h3>
                <p class="text-gray-300 mb-6 font-bold pointer-events-none">PRÓXIMAMENTE</p>
                <button data-index="${index}" class="open-modal-btn mt-auto bg-yellow-400 text-black font-urban py-2 px-6 rounded hover:bg-yellow-300 transition-colors uppercase w-full text-center text-xl tracking-wider pointer-events-auto">INFO & ENTRADAS</button>
            </div>
        </div>
    `).join('');
    
    // Duplicate items for infinite scroll effect
    track.innerHTML = itemsHTML + itemsHTML;
}

// Initialize Carousel
renderCarouselItems();

// Modal Logic
const eventModal = document.getElementById('event-modal');
const eventModalContent = document.getElementById('event-modal-content');
const closeEventModalBtn = document.getElementById('close-event-modal');
const eventModalOverlay = document.getElementById('event-modal-overlay');

function openEventModal(index) {
    const event = events[index];
    if (!event) return;

    // Stop carousel animation when modal is open
    if(animationId) cancelAnimationFrame(animationId);

    eventModalContent.innerHTML = `
        <div class="relative h-64 md:h-80">
            <img src="${event.img}" alt="${event.title}" class="w-full h-full object-contain bg-black">
            <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                <h2 class="text-3xl md:text-4xl font-urban text-white leading-none mb-2 text-shadow">${event.title}</h2>
                <span class="bg-yellow-400 text-black text-sm font-bold px-3 py-1 rounded uppercase tracking-wider inline-block shadow-lg">
                    ${event.price === 'GRATIS' ? 'ENTRADA LIBRE' : 'PRECIO: ' + event.price}
                </span>
            </div>
        </div>
        <div class="p-6 md:p-8 bg-zinc-900">
            <p class="text-gray-300 leading-relaxed text-lg mb-6">${event.description}</p>
            
            <div class="border-t border-gray-700 pt-6">
                <h4 class="text-yellow-400 font-urban text-xl mb-4 uppercase tracking-wide">Información de Entradas</h4>
                ${event.price === 'GRATIS' 
                    ? `<p class="text-white mb-4">Este evento es de acceso gratuito hasta completar aforo. Te recomendamos llegar temprano.</p>
                       <button class="w-full bg-gray-700 text-white font-urban py-3 rounded cursor-not-allowed opacity-75 uppercase tracking-widest">Registro en Puerta</button>`
                    : `<p class="text-white mb-4">Adquiere tus entradas en línea o en taquilla el día del evento.</p>
                       <button onclick="window.location.href='checkout.html?event=${encodeURIComponent(event.title)}&price=${encodeURIComponent(event.price)}'" class="w-full bg-yellow-400 text-black font-urban py-3 rounded hover:bg-yellow-300 transition-colors uppercase tracking-widest shadow-lg hover:shadow-yellow-400/20">Comprar Entradas (${event.price})</button>`
                }
            </div>
        </div>
    `;
    
    eventModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeEventModal() {
    eventModal.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Restore scrolling
    
    // Resume carousel animation
    animationId = requestAnimationFrame(animate);
}

// Make openEventModal globally available
window.openEventModal = openEventModal;

if (closeEventModalBtn) closeEventModalBtn.addEventListener('click', closeEventModal);
if (eventModalOverlay) eventModalOverlay.addEventListener('click', closeEventModal);

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !eventModal.classList.contains('hidden')) {
        closeEventModal();
    }
});

// Continuous Scroll & Drag Logic
let position = 0;
let isDragging = false;
let startX = 0;
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
    // Prevent drag if clicking a button or link
    if (e.target.closest('button') || e.target.closest('a')) {
        return;
    }
    
    isDragging = true;
    startX = e.pageX - position;
    track.style.cursor = 'grabbing';
});

// Click Event Delegation for Buttons
track.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-modal-btn');
    if (btn) {
        const index = parseInt(btn.getAttribute('data-index'));
        openEventModal(index);
    }
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
