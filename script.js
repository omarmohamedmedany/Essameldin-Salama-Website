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

    // Form submission
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you for your inquiry. A member of our executive team will contact you shortly.");
            contactForm.reset();
        });
    }

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
});
