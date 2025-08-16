// Skills page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Progress bar animations
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                
                // Reset width to 0 for animation
                progressBar.style.width = '0%';
                
                // Animate to target width
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
                
                progressObserver.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // Skill card hover effects
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Skill level tooltips
    skillCards.forEach(card => {
        const progressBar = card.querySelector('.progress-bar');
        const skillName = card.querySelector('h4').textContent;
        const level = card.querySelector('p').textContent;
        
        if (progressBar) {
            progressBar.addEventListener('mouseenter', function() {
                showTooltip(this, `${skillName}: ${level}`);
            });
            
            progressBar.addEventListener('mouseleave', function() {
                hideTooltip();
            });
        }
    });

    function showTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip absolute bg-gray-900 text-white px-3 py-2 rounded-lg text-sm z-50';
        tooltip.textContent = text;
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        document.body.appendChild(tooltip);
    }

    function hideTooltip() {
        const tooltip = document.querySelector('.skill-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    // Skill category filtering
    const skillCategories = ['Frontend', 'Backend', 'Database', 'Tools'];
    const categoryButtons = document.createElement('div');
    categoryButtons.className = 'flex flex-wrap justify-center gap-4 mb-8';
    
    // Add "All" button
    const allButton = document.createElement('button');
    allButton.textContent = 'All Skills';
    allButton.className = 'category-btn active px-4 py-2 rounded-lg border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300';
    allButton.setAttribute('data-category', 'all');
    categoryButtons.appendChild(allButton);
    
    skillCategories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.className = 'category-btn px-4 py-2 rounded-lg border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300';
        button.setAttribute('data-category', category.toLowerCase());
        categoryButtons.appendChild(button);
    });

    // Insert category buttons before skills section
    const skillsSection = document.querySelector('.mb-16.animate-slide-in-left');
    if (skillsSection) {
        skillsSection.parentNode.insertBefore(categoryButtons, skillsSection);
    }

    // Category filtering functionality
    const categoryBtns = document.querySelectorAll('.category-btn');
    const skillSections = document.querySelectorAll('.mb-16');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter skill sections
            skillSections.forEach(section => {
                const sectionTitle = section.querySelector('h3');
                if (sectionTitle) {
                    const sectionCategory = sectionTitle.textContent.toLowerCase();
                    
                    if (category === 'all' || sectionCategory.includes(category)) {
                        section.style.display = 'block';
                        section.style.animation = 'fadeIn 0.6s ease-in-out';
                    } else {
                        section.style.display = 'none';
                    }
                }
            });
        });
    });

    // Skill search functionality
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search skills...';
    searchInput.className = 'w-full max-w-md mx-auto mb-8 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 transition-colors duration-300';
    
    const skillsOverview = document.querySelector('.text-center.mb-16');
    if (skillsOverview) {
        skillsOverview.parentNode.insertBefore(searchInput, skillsOverview);
    }

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        skillCards.forEach(card => {
            const skillName = card.querySelector('h4').textContent.toLowerCase();
            const description = card.querySelector('p:last-child').textContent.toLowerCase();
            
            if (skillName.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease-in-out';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Skill proficiency levels
    const proficiencyLevels = {
        'Expert': { color: '#10b981', bgColor: '#d1fae5' },
        'Advanced': { color: '#3b82f6', bgColor: '#dbeafe' },
        'Intermediate': { color: '#f59e0b', bgColor: '#fef3c7' },
        'Beginner': { color: '#ef4444', bgColor: '#fee2e2' }
    };

    skillCards.forEach(card => {
        const levelElement = card.querySelector('p');
        if (levelElement) {
            const level = levelElement.textContent;
            const levelInfo = proficiencyLevels[level];
            
            if (levelInfo) {
                levelElement.style.color = levelInfo.color;
                levelElement.style.fontWeight = '600';
            }
        }
    });

    // Animate skill cards on scroll
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        skillObserver.observe(card);
    });

    // Certification cards animation
    const certificationCards = document.querySelectorAll('.bg-gray-50.p-6.rounded-2xl.text-center');
    
    const certObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 200);
            }
        });
    }, {
        threshold: 0.3
    });

    certificationCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.9)';
        card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        certObserver.observe(card);
    });

    // Skill comparison chart (if needed)
    function createSkillComparison() {
        const comparisonSection = document.createElement('section');
        comparisonSection.className = 'py-20 bg-gray-50';
        comparisonSection.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold text-gray-800 mb-4">Skill Comparison</h2>
                    <p class="text-xl text-gray-600">Visual representation of my skill proficiency levels</p>
                </div>
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="bg-white p-6 rounded-2xl shadow-lg">
                        <h3 class="text-xl font-bold text-gray-800 mb-6">Frontend vs Backend</h3>
                        <canvas id="skillChart" width="400" height="200"></canvas>
                    </div>
                    <div class="bg-white p-6 rounded-2xl shadow-lg">
                        <h3 class="text-xl font-bold text-gray-800 mb-6">Technology Stack</h3>
                        <div id="techStack"></div>
                    </div>
                </div>
            </div>
        `;

        // Insert before CTA section
        const ctaSection = document.querySelector('.gradient-bg');
        if (ctaSection) {
            ctaSection.parentNode.insertBefore(comparisonSection, ctaSection);
        }
    }

    // Initialize skill comparison if needed
    // createSkillComparison();

    // Skill level indicators
    const levelIndicators = document.querySelectorAll('.skill-card p');
    levelIndicators.forEach(indicator => {
        const level = indicator.textContent;
        const dot = document.createElement('span');
        dot.className = 'inline-block w-2 h-2 rounded-full ml-2';
        
        switch(level) {
            case 'Expert':
                dot.style.backgroundColor = '#10b981';
                break;
            case 'Advanced':
                dot.style.backgroundColor = '#3b82f6';
                break;
            case 'Intermediate':
                dot.style.backgroundColor = '#f59e0b';
                break;
            case 'Beginner':
                dot.style.backgroundColor = '#ef4444';
                break;
        }
        
        indicator.appendChild(dot);
    });

    // Skill card click to expand details
    skillCards.forEach(card => {
        card.addEventListener('click', function() {
            const skillName = this.querySelector('h4').textContent;
            const level = this.querySelector('p').textContent;
            const description = this.querySelector('p:last-child').textContent;
            
            showSkillDetails(skillName, level, description);
        });
    });

    function showSkillDetails(skillName, level, description) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        
        modal.innerHTML = `
            <div class="bg-white rounded-2xl max-w-md w-full p-6">
                <div class="flex justify-between items-start mb-4">
                    <h2 class="text-2xl font-bold text-gray-800">${skillName}</h2>
                    <button class="modal-close text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                </div>
                <div class="mb-4">
                    <span class="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">${level}</span>
                </div>
                <p class="text-gray-600 mb-6">${description}</p>
                <div class="flex gap-4">
                    <button class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300">
                        View Projects
                    </button>
                    <button class="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition-colors duration-300">
                        Learn More
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    console.log('Skills page functionality loaded!');
});
