// Intersection Observer for scroll reveals (fade and slide up)
document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                
                // If the element contains number counters, trigger them
                const counters = entry.target.querySelectorAll('.stat-number');
                if (counters.length > 0) {
                    counters.forEach(counter => {
                        // Prevent rapid re-triggering while already animating
                        if (counter.dataset.animated === "true") return;
                        counter.dataset.animated = "true";

                        const target = +counter.getAttribute('data-target');
                        const duration = 2000; // ms
                        const increment = target / (duration / 16); // 60fps
                        
                        let current = target > 1000 ? target - 50 : 0; // Prevent slot machine effect for years
                        
                        const updateCounter = () => {
                            current += increment;
                            if (current < target) {
                                counter.innerText = Math.ceil(current);
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCounter();
                    });
                }
            } else {
                // Reset everything when scrolled out of view
                entry.target.classList.remove("active");
                
                const counters = entry.target.querySelectorAll('.stat-number');
                if (counters.length > 0) {
                    counters.forEach(counter => {
                        counter.dataset.animated = "false";
                        const target = +counter.getAttribute('data-target');
                        let base = target > 1000 ? target - 50 : 0;
                        counter.innerText = base;
                    });
                }
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            
            // Toggle active class
            header.classList.toggle('active');
            
            // Toggle max-height for smooth opening
            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
            
            // Optional: Close other accordions
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.style.maxHeight = null;
                }
            });
        });
    });

    // Form submission handled natively by Web3Forms action attribute in inquiry.html

    // Highlight active nav link dynamically
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksList = document.querySelectorAll('.nav-links a');
    navLinksList.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Mobile Navigation Toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            
            // Swap icon
            const icon = menuToggle.querySelector("i");
            if (navLinks.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });

        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                const icon = menuToggle.querySelector("i");
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (navLinks.classList.contains("active") && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove("active");
                const icon = menuToggle.querySelector("i");
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });
    }

    // Email Obfuscation
    const emailLinks = document.querySelectorAll(".email-obfuscate");
    emailLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const user = link.getAttribute("data-user");
            const domain = link.getAttribute("data-domain");
            window.location.href = `mailto:${user}@${domain}`;
            link.innerText = `${user}@${domain}`;
        });
    });

    // C.A.R. Framework Case Study Toggle
    const carToggles = document.querySelectorAll('.car-toggle');
    carToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('i');
            
            toggle.classList.toggle('active');
            content.classList.toggle('active');
            
            if (toggle.classList.contains('active')) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    });

    // Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const myBars = document.querySelectorAll('.scroll-progress-bar');
        myBars.forEach(bar => {
            bar.style.width = scrolled + "%";
        });
    });

    // -----------------------------------------
    // Custom Magnetic Cursor
    // -----------------------------------------
    // Removed per user request

    // -----------------------------------------
    // Dynamic Typewriter Effect
    // -----------------------------------------
    const typeTarget = document.querySelector('.typewriter-text');
    if (typeTarget) {
        const textArray = [
            "Senior Strategic Advisor", 
            "MBA", 
            "Program Manager"
        ];
        let textIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex === 0 && typeTarget.textContent === '\u200B') {
                typeTarget.textContent = '';
            }
            if (charIndex < textArray[textIndex].length) {
                typeTarget.textContent += textArray[textIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, 50); // Sped up typing
            } else {
                setTimeout(erase, 1500); // Shorter pause before erasing
            }
        }

        function erase() {
            if (charIndex > 0) {
                typeTarget.textContent = textArray[textIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, 25); // Sped up erasing
            } else {
                typeTarget.textContent = '\u200B'; // Prevent height collapse when empty
                textIndex++;
                if (textIndex >= textArray.length) textIndex = 0;
                setTimeout(type, 300); // Faster switch to next word
            }
        }

        setTimeout(type, 1000);
    }

    // --- Inquiry Form Logic ---
    const countrySelect = document.getElementById('countryCodeSelect');
    const mobileInput = document.getElementById('mobileInput');
    const mobileCheck = document.getElementById('mobileCheck');

    function updateMaxLength() {
        const code = countrySelect.value;
        const exactLengths = {
            '+93': 9, '+355': 9, '+213': 9, '+376': 6, '+244': 9, '+1': 10, '+54': 10, '+374': 8, '+61': 9, '+43': 10, '+994': 9, '+973': 8, '+880': 10, '+375': 9, '+32': 9, '+501': 7, '+229': 8, '+975': 8, '+591': 8, '+387': 8, '+267': 8, '+55': [10, 11], '+673': 7, '+359': [8, 9], '+226': 8, '+257': 8, '+238': 7, '+855': [8, 9], '+237': 9, '+236': 8, '+235': 8, '+56': 9, '+86': 11, '+57': 10, '+269': 7, '+243': 9, '+242': 9, '+506': 8, '+385': 9, '+53': 8, '+357': 8, '+420': 9, '+45': 8, '+253': 8, '+670': 8, '+593': 9, '+20': 10, '+503': 8, '+240': 9, '+291': 7, '+372': [7, 8], '+268': 8, '+251': 9, '+679': 7, '+358': [5, 12], '+33': 9, '+241': 8, '+220': 7, '+995': 9, '+49': [10, 11], '+233': 9, '+30': 10, '+502': 8, '+224': 9, '+245': 7, '+592': 7, '+509': 8, '+504': 8, '+36': 9, '+354': 7, '+91': 10, '+62': [9, 12], '+98': 10, '+964': 10, '+353': 9, '+972': 9, '+39': [9, 10], '+225': 10, '+81': 10, '+962': 9, '+7': 10, '+254': 9, '+686': 5, '+965': 8, '+996': 9, '+856': [8, 10], '+371': 8, '+961': [7, 8], '+266': 8, '+231': 9, '+218': 9, '+423': [7, 9], '+370': 8, '+352': 9, '+261': 9, '+265': 9, '+60': [9, 10], '+960': 7, '+223': 8, '+356': 8, '+692': 7, '+222': 8, '+230': 8, '+52': 10, '+691': 7, '+373': 8, '+377': 8, '+976': 8, '+382': 8, '+212': 9, '+258': 9, '+95': 9, '+264': 9, '+674': 7, '+977': 10, '+31': 9, '+64': [8, 9], '+505': 8, '+227': 8, '+234': 10, '+850': [8, 10], '+389': 8, '+47': 8, '+968': 8, '+92': 10, '+680': 7, '+970': 9, '+507': 8, '+595': 9, '+51': 9, '+63': 10, '+48': 9, '+351': 9, '+1787': 10, '+40': 9, '+250': 9, '+685': 7, '+378': [6, 10], '+239': 7, '+221': 9, '+381': 9, '+248': 7, '+232': 8, '+65': 8, '+421': 9, '+386': 8, '+677': 7, '+252': 8, '+27': 9, '+82': [9, 10], '+211': 9, '+34': 9, '+94': 9, '+249': 9, '+597': 7, '+46': 9, '+41': 9, '+963': 9, '+886': 9, '+992': 9, '+255': 9, '+66': 9, '+228': 8, '+676': 5, '+1868': 10, '+216': 8, '+90': 10, '+993': 8, '+688': 5, '+256': 9, '+380': 9, '+598': 8, '+998': 9, '+58': 10, '+84': [9, 10], '+967': 9, '+260': 9, '+263': 9, '+974': 8, '+971': 9, '+966': 9, '+44': 10
        };
        
        const rule = exactLengths[code] || 15;
        const maxLen = Array.isArray(rule) ? rule[1] : rule;
        mobileInput.maxLength = maxLen;
        return rule;
    }

    function handleMobileInput() {
        let val = mobileInput.value.replace(/[^\d]/g, '');
        const rule = updateMaxLength();
        const maxLen = Array.isArray(rule) ? rule[1] : rule;
        const minLen = Array.isArray(rule) ? rule[0] : rule;

        if (val.length > maxLen) {
            val = val.substring(0, maxLen);
        }
        mobileInput.value = val;
        
        if (val.length >= minLen && val.length <= maxLen && val.length > 0 && maxLen !== 15) {
            mobileCheck.style.opacity = '1';
        } else {
            mobileCheck.style.opacity = '0';
        }
    }

    if (countrySelect && mobileInput) {
        updateMaxLength();
        mobileInput.addEventListener('input', handleMobileInput);
        
        mobileInput.addEventListener('paste', (e) => {
            let pasteData = (e.clipboardData || window.clipboardData).getData('text');
            let digits = pasteData.replace(/[^\d]/g, '');
            const codeDigits = countrySelect.value.replace('+', '');
            
            if (digits.startsWith('00' + codeDigits)) {
                digits = digits.substring(2 + codeDigits.length);
            } else if (digits.startsWith(codeDigits)) {
                digits = digits.substring(codeDigits.length);
            }
            
            const maxLen = updateMaxLength();
            const realMaxLen = Array.isArray(maxLen) ? maxLen[1] : maxLen;
            if (digits.length > realMaxLen) {
                digits = digits.substring(0, realMaxLen);
            }
            
            e.preventDefault();
            mobileInput.value = digits;
            handleMobileInput();
        });

        countrySelect.addEventListener('change', () => {
            mobileInput.value = ''; 
            handleMobileInput();
            mobileInput.focus();
        });
    }

    const selectAllBtn = document.getElementById('selectAllCategories');
    const catCheckboxes = document.querySelectorAll('.cat-checkbox');

    if(selectAllBtn && catCheckboxes.length > 0) {
        selectAllBtn.addEventListener('click', () => {
            const isActive = selectAllBtn.classList.toggle('active');
            catCheckboxes.forEach(cb => cb.checked = isActive);
        });

        catCheckboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                const allChecked = Array.from(catCheckboxes).every(c => c.checked);
                if(allChecked) {
                    selectAllBtn.classList.add('active');
                } else {
                    selectAllBtn.classList.remove('active');
                }
            });
        });
    }

    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(inquiryForm);
            
            const toTitleCase = (str) => {
                if (!str) return '';
                return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            };
            
            const name = toTitleCase(formData.get('Name') || '');
            const company = toTitleCase(formData.get('Company') || 'an organization');
            const country = toTitleCase(formData.get('Country') || 'your country');
            
            const categories = formData.getAll('Category');
            const categoryText = categories.length > 0 ? categories.join('\n') : 'No specific pathway selected';

            const industry = toTitleCase(formData.get('Industry') || 'Not specified');
            const size = toTitleCase(formData.get('Organization Size') || 'Not specified');
            
            const email = formData.get('Email') || '';
            
            const mobileCode = formData.get('Country Code') || '';
            const mobileNumber = formData.get('Mobile') || '';
            const mobile = `${mobileCode} ${mobileNumber}`.trim();

            const subject = `New Inquiry from ${name} (${company})`;
            
            const body = `Dear Mr. Essam,

My name is ${name} and I am reaching out from ${company} in ${country}.

I am interested in exploring your executive services, specifically:

${categoryText}

Here is some context about our organization:

Industry: ${industry}
Organization Size: ${size}

You can reach me via email at ${email} or by phone at ${mobile}.

I look forward to discussing how we can solve complexity and drive performance together.

Best regards, ${name}`;

            const mailtoUrl = `mailto:essamslama@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoUrl;
        });
    }
});
