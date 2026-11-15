// =========================
// MOBILE NAVIGATION
// =========================
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");
        menuBtn.setAttribute("aria-expanded", String(isOpen));
        menuBtn.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
        menuBtn.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.setAttribute("aria-label", "Open navigation menu");
            menuBtn.textContent = "☰";
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 950) {
            navLinks.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.setAttribute("aria-label", "Open navigation menu");
            menuBtn.textContent = "☰";
        }
    });
}

// =========================
// CONTACT FORM - FORMSPREE
// =========================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessageText");

if (contactForm && formMessage) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        formMessage.textContent = "";

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                formMessage.textContent =
                    "Thank you! Your message has been sent successfully.";

                formMessage.style.color = "green";
                contactForm.reset();

            } else {
                formMessage.textContent =
                    "Sorry, your message could not be sent. Please try again.";

                formMessage.style.color = "red";
            }

        } catch (error) {
            formMessage.textContent =
                "Connection problem. Please check your internet and try again.";

            formMessage.style.color = "red";

        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Send Message";
        }
    });
}

// =========================
// GALLERY + LEADERSHIP LIGHTBOX
// =========================
const imageElements = Array.from(
    document.querySelectorAll(".gallery-item img, .leader-card img")
);

let currentImageIndex = 0;
let previouslyFocusedElement = null;

const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.setAttribute("role", "dialog");
lightbox.setAttribute("aria-modal", "true");
lightbox.setAttribute("aria-label", "Image viewer");

lightbox.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Close image viewer">&times;</button>
    <button class="lightbox-prev" type="button" aria-label="Previous image">&#10094;</button>
    <img class="lightbox-image" src="" alt="">
    <button class="lightbox-next" type="button" aria-label="Next image">&#10095;</button>
`;

document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector(".lightbox-image");
const closeButton = lightbox.querySelector(".lightbox-close");
const prevButton = lightbox.querySelector(".lightbox-prev");
const nextButton = lightbox.querySelector(".lightbox-next");

function showImage(index) {
    if (imageElements.length === 0) return;

    currentImageIndex = (index + imageElements.length) % imageElements.length;
    const selectedImage = imageElements[currentImageIndex];

    lightboxImage.src = selectedImage.currentSrc || selectedImage.src;
    lightboxImage.alt = selectedImage.alt || "Church photograph";
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
    if (previouslyFocusedElement) previouslyFocusedElement.focus();
}

imageElements.forEach((img, index) => {
    img.classList.add("clickable-image");
    img.addEventListener("click", (event) => {
        event.preventDefault();
        previouslyFocusedElement = img;
        showImage(index);
        closeButton.focus();
    });
});

closeButton.addEventListener("click", closeLightbox);
prevButton.addEventListener("click", () => showImage(currentImageIndex - 1));
nextButton.addEventListener("click", () => showImage(currentImageIndex + 1));

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") showImage(currentImageIndex + 1);
    if (event.key === "ArrowLeft") showImage(currentImageIndex - 1);
});
