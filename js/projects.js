// Projects page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.6s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Project card hover effects
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // Project modal functionality (if needed)
    const projectLinks = document.querySelectorAll('.project-card a[href="#"]');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get project data from the card
            const card = this.closest('.project-card');
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            const technologies = Array.from(card.querySelectorAll('.flex.flex-wrap.gap-2 span')).map(span => span.textContent);
            
            // Create and show modal
            showProjectModal(title, description, technologies);
        });
    });

    function showProjectModal(title, description, technologies) {
        // Remove existing modal if any
        const existingModal = document.querySelector('.project-modal');
        if (existingModal) {
            existingModal.remove();
        }

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'project-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        
        modal.innerHTML = `
            <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex justify-between items-start mb-4">
                        <h2 class="text-2xl font-bold text-gray-800">${title}</h2>
                        <button class="modal-close text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                    </div>
                    <p class="text-gray-600 mb-6">${description}</p>
                    <div class="mb-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-3">Technologies Used:</h3>
                        <div class="flex flex-wrap gap-2">
                            ${technologies.map(tech => `<span class="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">${tech}</span>`).join('')}
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <button class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300">
                            View Live Demo
                        </button>
                        <button class="border border-purple-600 text-purple-600 px-6 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition-colors duration-300">
                            View Code
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                modal.remove();
            }
        });
    }

    // Animate project cards on scroll
    const projectObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        projectObserver.observe(card);
    });

    // Project search functionality
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search projects...';
    searchInput.className = 'w-full max-w-md mx-auto mb-8 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 transition-colors duration-300';
    
    const filterSection = document.querySelector('.text-center.mb-8');
    if (filterSection) {
        filterSection.appendChild(searchInput);
    }

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        projectCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const technologies = Array.from(card.querySelectorAll('.flex.flex-wrap.gap-2 span')).map(span => span.textContent.toLowerCase()).join(' ');
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || technologies.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Project statistics animation
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.text-4xl');
                counters.forEach(counter => {
                    const target = parseInt(counter.textContent);
                    animateCounter(counter, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.grid.md\\:grid-cols-4');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        }
        
        updateCounter();
    }

    // Project category badges
    const categoryBadges = document.querySelectorAll('.project-card .flex.flex-wrap.gap-2 span');
    categoryBadges.forEach(badge => {
        badge.addEventListener('click', function(e) {
            e.stopPropagation();
            const category = this.textContent.toLowerCase();
            
            // Find and click the corresponding filter button
            filterButtons.forEach(button => {
                if (button.getAttribute('data-filter') === category) {
                    button.click();
                }
            });
        });
    });

    // Project card click to expand
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a')) {
                const title = this.querySelector('h3').textContent;
                const description = this.querySelector('p').textContent;
                const technologies = Array.from(this.querySelectorAll('.flex.flex-wrap.gap-2 span')).map(span => span.textContent);
                
                showProjectModal(title, description, technologies);
            }
        });
    });

    // Keyboard navigation for filter buttons
    let currentFilterIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            
            if (e.key === 'ArrowLeft') {
                currentFilterIndex = Math.max(0, currentFilterIndex - 1);
            } else {
                currentFilterIndex = Math.min(filterButtons.length - 1, currentFilterIndex + 1);
            }
            
            filterButtons[currentFilterIndex].click();
            filterButtons[currentFilterIndex].focus();
        }
    });

    // Add focus styles to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('focus', function() {
            this.style.outline = '2px solid #667eea';
            this.style.outlineOffset = '2px';
        });
        
        button.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    console.log('Projects page functionality loaded!');
});
