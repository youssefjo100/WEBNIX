
document.addEventListener("DOMContentLoaded", () => {

document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // WEBNIX INTRO
    // =========================

    const intro = document.getElementById("webnixIntro");
    const canvas = document.getElementById("introCanvas");

    if (intro) {
        document.body.classList.add("intro-active");

        let animationId = null;
        let particles = [];

        if (canvas) {
            const ctx = canvas.getContext("2d");

            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                particles = Array.from({ length: 65 }, () => ({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5
                }));
            }

            function animateNetwork() {
                if (!intro.isConnected || intro.classList.contains("hide")) {
                    return;
                }

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                particles.forEach((p, i) => {
                    p.x += p.vx;
                    p.y += p.vy;

                    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                    ctx.fillStyle = "rgba(255,255,255,.7)";
                    ctx.fillRect(p.x, p.y, 2, 2);

                    particles.slice(i + 1).forEach(other => {
                        const dx = p.x - other.x;
                        const dy = p.y - other.y;
                        const distance = Math.hypot(dx, dy);

                        if (distance < 120) {
                            ctx.beginPath();

                            ctx.strokeStyle =
                                `rgba(139,92,246,${0.2 * (1 - distance / 120)})`;

                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(other.x, other.y);
                            ctx.stroke();
                        }
                    });
                });

                animationId = requestAnimationFrame(animateNetwork);
            }

            resizeCanvas();
            animateNetwork();

            window.addEventListener("resize", resizeCanvas);
        }

        // Hide intro after 3.5 seconds
        setTimeout(() => {
            intro.classList.add("hide");
            document.body.classList.remove("intro-active");

            if (animationId) {
                cancelAnimationFrame(animationId);
            }

            setTimeout(() => {
                intro.remove();
            }, 1300);

        }, 3500);
    }

    // =========================
    // LANGUAGE BUTTON
    // =========================

    const languageBtn = document.getElementById("languageBtn");

    if (languageBtn) {
        languageBtn.addEventListener("click", () => {
            setLanguage(
                currentLanguage === "en" ? "ar" : "en"
            );
        });
    }

    // باقي أكواد الموقع الأصلية تفضل هنا
});

    // =====================================
    // WEBNIX SETTINGS
    // =====================================

    // حط رقم واتسابك هنا بصيغة دولية
    // مثال مصر: 201012345678
    const WHATSAPP_NUMBER = "201274550027";

    let currentLanguage = localStorage.getItem("webnix-language") || "en";

    // =====================================
    // ICONS
    // =====================================

    function refreshIcons() {
        if (window.lucide) {
            lucide.createIcons();
        }
    }
    

    refreshIcons();

    // =====================================
    // LANGUAGE SWITCHER
    // =====================================

    const languageBtn = document.getElementById("languageBtn");

    function setLanguage(language) {

        currentLanguage = language;

        document.documentElement.lang = language;
        document.documentElement.dir =
            language === "ar" ? "rtl" : "ltr";

        document.body.dir =
            language === "ar" ? "rtl" : "ltr";

        document.querySelectorAll("[data-en][data-ar]")
            .forEach(element => {

                element.innerHTML =
                    element.dataset[language];

            });

        if (languageBtn) {
            languageBtn.textContent =
                language === "en" ? "AR" : "EN";
        }

        const nameInput =
            document.getElementById("clientName");

        const emailInput =
            document.getElementById("clientEmail");

        const detailsInput =
            document.getElementById("projectDetails");

        if (nameInput) {
            nameInput.placeholder =
                language === "ar" ? "اسمك" : "Your Name";
        }

        if (emailInput) {
            emailInput.placeholder =
                language === "ar" ? "بريدك الإلكتروني" : "Your Email";
        }

        if (detailsInput) {
            detailsInput.placeholder =
                language === "ar"
                    ? "احكيلنا عن مشروعك..."
                    : "Tell us about your project...";
        }

        localStorage.setItem("webnix-language", language);

        refreshIcons();
    }

    languageBtn.addEventListener("click", () => {

        setLanguage(
            currentLanguage === "en" ? "ar" : "en"
        );

    });

    setLanguage(currentLanguage);

    // =====================================
    // MOBILE MENU
    // =====================================

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    function closeMenu() {

        navLinks.classList.remove("open");

        menuBtn.innerHTML =
            '<i data-lucide="menu"></i>';

        refreshIcons();
    }

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        menuBtn.innerHTML =
            navLinks.classList.contains("open")
                ? '<i data-lucide="x"></i>'
                : '<i data-lucide="menu"></i>';

        refreshIcons();
    });

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", closeMenu);

    });

    document.addEventListener("click", event => {

        if (
            !navLinks.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {
            closeMenu();
        }

    });

    // =====================================
    // SCROLL REVEAL
    // =====================================
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach(element => {
        observer.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("active");
    });

}

    // =====================================
    // CURSOR GLOW
    // =====================================

    const cursorGlow =
        document.querySelector(".cursor-glow");

    if (
        cursorGlow &&
        window.matchMedia("(pointer:fine)").matches
    ) {

        window.addEventListener("mousemove", event => {

            cursorGlow.style.left =
                event.clientX + "px";

            cursorGlow.style.top =
                event.clientY + "px";

        });

    } else if (cursorGlow) {

        cursorGlow.style.display = "none";

    }

    // =====================================
    // 3D MOUSE INTERACTION
    // =====================================

    const heroVisual =
        document.querySelector(".hero-visual");

    const cube =
        document.getElementById("core3d");

    if (
        heroVisual &&
        cube &&
        window.matchMedia("(pointer:fine)").matches
    ) {

        heroVisual.addEventListener("mousemove", event => {

            const rect =
                heroVisual.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) / rect.width;

            const y =
                (event.clientY - rect.top) / rect.height;

            const rotateY = (x - 0.5) * 35;
            const rotateX = (0.5 - y) * 35;

            cube.style.animation = "none";

            cube.style.transform =
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        });

        heroVisual.addEventListener("mouseleave", () => {

            cube.style.transform = "";
            cube.style.animation = "";

        });

    }

    // =====================================
    // WHATSAPP CONTACT FORM
    // =====================================

    const contactForm =
        document.getElementById("contactForm");

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const name =
            document.getElementById("clientName").value.trim();

        const email =
            document.getElementById("clientEmail").value.trim();

        const projectType =
            document.getElementById("projectType").value;

        const details =
            document.getElementById("projectDetails").value.trim();

        if (!name || !details) {

            alert(
                currentLanguage === "ar"
                    ? "من فضلك اكتب اسمك وتفاصيل المشروع."
                    : "Please enter your name and project details."
            );

            return;
        }

        const message =
            currentLanguage === "ar"

                ? `مرحباً WEBNIX 👋

الاسم: ${name}
البريد الإلكتروني: ${email}
نوع المشروع: ${projectType}

تفاصيل المشروع:
${details}`

                : `Hello WEBNIX 👋

Name: ${name}
Email: ${email}
Project Type: ${projectType}

Project Details:
${details}`;

        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    });

    // =====================================
    // NAVBAR SCROLL EFFECT
    // =====================================

    const navbar =
        document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.style.boxShadow =
                "0 10px 35px rgba(0,0,0,.3)";

        } else {

            navbar.style.boxShadow = "none";

        }

    }, { passive: true });

    // =====================================
    // CURRENT YEAR
    // =====================================

    document.getElementById("year").textContent =
        new Date().getFullYear();

    // =====================================

    refreshIcons();

    console.log("WEBNIX Studio is ready 🚀");

});
