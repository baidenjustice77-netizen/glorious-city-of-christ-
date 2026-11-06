// ===== MOBILE MENU =====

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
}

// ===== CLOSE MOBILE MENU AFTER CLICK =====

const links = document.querySelectorAll(".nav-links a");

links.forEach(function (link) {
    link.addEventListener("click", function () {
        if (navLinks) {
            navLinks.classList.remove("active");
        }
    });
});

// ===== CONTACT FORM =====

const contactForm = document.getElementById("formMessage");
const formMessage = document.getElementById("formMessageText");

if (contactForm && formMessage) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
            formMessage.textContent = "Please fill in all the fields.";
            formMessage.style.color = "red";
            return;
        }

        formMessage.textContent =
            "Thank you! Your message has been received.";

        formMessage.style.color = "green";
        contactForm.reset();
    });
}

// ===== SERMON BUTTONS =====

const sermonButtons = document.querySelectorAll(".watch-btn");

sermonButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        alert("The sermon video will be added here.");
    });
});

// ===== ADVANCED IMAGE LIGHTBOX =====

const galleryImages = document.querySelectorAll(".gallery-item img");

let currentImageIndex = 0;

const lightbox = document.createElement("div");
lightbox.className = "lightbox";

lightbox.innerHTML = `
    <button class="lightbox-close">&times;</button>
    <button class="lightbox-prev">&#10094;</button>
    <img class="lightbox-image" src="" alt="Church gallery image">
    <button class="lightbox-next">&#10095;</button>
`;

document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector(".lightbox-image");
const closeButton = lightbox.querySelector(".lightbox-close");
const prevButton = lightbox.querySelector(".lightbox-prev");
const nextButton = lightbox.querySelector(".lightbox-next");

function showImage(index) {
    currentImageIndex =
        (index + galleryImages.length) % galleryImages.length;

    lightboxImage.src = galleryImages[currentImageIndex].src;
    lightbox.style.display = "flex";
}

galleryImages.forEach(function (img, index) {
    img.style.cursor = "pointer";

    img.addEventListener("click", function () {
        showImage(index);
    });
});

closeButton.addEventListener("click", function () {
    lightbox.style.display = "none";
});

prevButton.addEventListener("click", function () {
    showImage(currentImageIndex - 1);
});

nextButton.addEventListener("click", function () {
    showImage(currentImageIndex + 1);
});

lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        lightbox.style.display = "none";
    }
});

document.addEventListener("keydown", function (event) {
    if (lightbox.style.display === "flex") {
        if (event.key === "Escape") {
            lightbox.style.display = "none";
        }

        if (event.key === "ArrowRight") {
            showImage(currentImageIndex + 1);
        }

        if (event.key === "ArrowLeft") {
            showImage(currentImageIndex - 1);
        }
    }
});