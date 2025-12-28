/* ===================================
   SNOW ANIMATION - CANVAS
=================================== */
const canvas = document.getElementById("snowCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Snowflake {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.radius = Math.random() * 3 + 1;
        this.speed = Math.random() * 1 + 0.5;
        this.wind = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.6 + 0.4;
    }
    update() {
        this.y += this.speed;
        this.x += this.wind;
        if (this.y > canvas.height) this.reset();
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
        ctx.fill();
        ctx.closePath();
    }
}

const snowflakes = [];
for (let i = 0; i < 150; i++) snowflakes.push(new Snowflake());

function animateSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snowflakes.forEach(s => { s.update(); s.draw(); });
    requestAnimationFrame(animateSnow);
}
animateSnow();

/* ===================================
   PARALLAX MOUSE EFFECT
=================================== */
document.addEventListener("mousemove", (e) => {
    const cards = document.querySelectorAll(".glass-card");
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    cards.forEach(card => {
        const moveX = (mouseX - 0.5) * 10;
        const moveY = (mouseY - 0.5) * 10;
        if (window.innerWidth > 768) {
            card.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
});

/* ===================================
   LOGIN FORM & AUDIO HANDLING
=================================== */
const loginForm = document.getElementById("loginForm");
const nameInput = document.getElementById("nameInput");
const loginPage = document.getElementById("loginPage");
const messagePage = document.getElementById("messagePage");
const userNameSpan = document.getElementById("userName");
const backBtn = document.getElementById("backBtn");
const music = document.getElementById("bgMusic");

/* ===================================
   تشغيل الموسيقى تلقائي على اللاب
   وعلى الموبايل بعد أول Tap
=================================== */
window.addEventListener("load", () => {
    // محاولة تشغيل الموسيقى تلقائي (Laptop)
    music.muted = false;
    music.volume = 0.7;
    music.play().catch(err => {
        console.log("Autoplay blocked (mobile?), waiting for user interaction...");
    });
});

// Mobile fallback: تشغيل عند أول لمسة
document.addEventListener("touchstart", () => {
    music.muted = false;
    music.volume = 0.7;
    music.play().catch(() => {});
}, { once: true });

/* ===================================
   Handle login form submission
=================================== */
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userName = nameInput.value.trim();
    if (!userName) return;

    // Save name
    localStorage.setItem("userName", userName);
    userNameSpan.textContent = userName;

    // تشغيل الموسيقى (مضمون بعد التفاعل)
    music.muted = false;
    music.volume = 0.7;
    music.play().catch(() => {});

    // الانتقال للصفحة الثانية
    loginPage.classList.remove("active");
    setTimeout(() => messagePage.classList.add("active"), 300);

    // Clear input
    nameInput.value = "";
});

/* ===================================
   Handle back button
=================================== */
backBtn.addEventListener("click", () => {
    messagePage.classList.remove("active");
    setTimeout(() => loginPage.classList.add("active"), 300);

    // ايقاف الموسيقى
    music.pause();
    music.currentTime = 0;
});

/* ===================================
   Input animations
=================================== */
nameInput.addEventListener("focus", () => {
    nameInput.parentElement.parentElement.style.transform = "scale(1.02)";
});
nameInput.addEventListener("blur", () => {
    nameInput.parentElement.parentElement.style.transform = "scale(1)";
});

/* ===================================
   Touch feedback for mobile
=================================== */
const addTouchFeedback = (element) => {
    element.addEventListener("touchstart", () => {
        element.style.transform = "scale(0.98)";
    });
    element.addEventListener("touchend", () => {
        element.style.transform = "scale(1)";
    });
};

const submitBtn = document.querySelector(".submit-btn");
addTouchFeedback(submitBtn);
addTouchFeedback(backBtn);

/* ===================================
   Prevent double tap zoom on mobile
=================================== */
let lastTouchEnd = 0;
document.addEventListener("touchend", (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) e.preventDefault();
    lastTouchEnd = now;
});
