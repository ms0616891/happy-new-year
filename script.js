/* ===================================
   SNOW ANIMATION - CANVAS
   =================================== */
const canvas = document.getElementById("snowCanvas")
const ctx = canvas.getContext("2d")

// Set canvas size
function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
resizeCanvas()
window.addEventListener("resize", resizeCanvas)

// Snowflake class
class Snowflake {
  constructor() {
    this.reset()
  }

  reset() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height - canvas.height
    this.radius = Math.random() * 3 + 1
    this.speed = Math.random() * 1 + 0.5
    this.wind = Math.random() * 0.5 - 0.25
    this.opacity = Math.random() * 0.6 + 0.4
  }

  update() {
    this.y += this.speed
    this.x += this.wind

    // Reset snowflake when it goes off screen
    if (this.y > canvas.height) {
      this.y = -10
      this.x = Math.random() * canvas.width
    }

    if (this.x > canvas.width) {
      this.x = 0
    } else if (this.x < 0) {
      this.x = canvas.width
    }
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
    ctx.fill()
    ctx.closePath()
  }
}

// Create snowflakes array
const snowflakes = []
const snowflakeCount = 150

for (let i = 0; i < snowflakeCount; i++) {
  snowflakes.push(new Snowflake())
}

// Animation loop
function animateSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  snowflakes.forEach((snowflake) => {
    snowflake.update()
    snowflake.draw()
  })

  requestAnimationFrame(animateSnow)
}

animateSnow()

/* ===================================
   PARALLAX MOUSE EFFECT
   =================================== */
document.addEventListener("mousemove", (e) => {
  const cards = document.querySelectorAll(".glass-card")
  const mouseX = e.clientX / window.innerWidth
  const mouseY = e.clientY / window.innerHeight

  cards.forEach((card) => {
    const moveX = (mouseX - 0.5) * 10
    const moveY = (mouseY - 0.5) * 10

    if (window.innerWidth > 768) {
      card.style.transform = `translate(${moveX}px, ${moveY}px)`
    }
  })
})

/* ===================================
   LOGIN FORM HANDLING
   =================================== */
const loginForm = document.getElementById("loginForm")
const nameInput = document.getElementById("nameInput")
const loginPage = document.getElementById("loginPage")
const messagePage = document.getElementById("messagePage")
const userNameSpan = document.getElementById("userName")
const backBtn = document.getElementById("backBtn")

// Check if user is already logged in


// Handle login form submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const userName = nameInput.value.trim()

  if (userName) {
    // Save name to localStorage
    localStorage.setItem("userName", userName)

    // Update message page with user's name
    userNameSpan.textContent = userName

    // Smooth transition to message page
    loginPage.classList.remove("active")

    setTimeout(() => {
      messagePage.classList.add("active")
    }, 300)

    // Clear input field
    nameInput.value = ""
  }
})

// Handle back button
backBtn.addEventListener("click", () => {
  messagePage.classList.remove("active")

  setTimeout(() => {
    loginPage.classList.add("active")
  }, 300)

  // Optionally clear localStorage
  // localStorage.removeItem('userName');
})

/* ===================================
   INPUT ANIMATIONS
   =================================== */
nameInput.addEventListener("focus", () => {
  nameInput.parentElement.parentElement.style.transform = "scale(1.02)"
})

nameInput.addEventListener("blur", () => {
  nameInput.parentElement.parentElement.style.transform = "scale(1)"
})

/* ===================================
   TOUCH FEEDBACK FOR MOBILE
   =================================== */
const addTouchFeedback = (element) => {
  element.addEventListener("touchstart", () => {
    element.style.transform = "scale(0.98)"
  })

  element.addEventListener("touchend", () => {
    element.style.transform = "scale(1)"
  })
}

const submitBtn = document.querySelector(".submit-btn")
addTouchFeedback(submitBtn)
addTouchFeedback(backBtn)

/* ===================================
   PREVENT ZOOM ON DOUBLE TAP (MOBILE)
   =================================== */
let lastTouchEnd = 0
document.addEventListener(
  "touchend",
  (e) => {
    const now = Date.now()
    if (now - lastTouchEnd <= 300) {
      e.preventDefault()
    }
    lastTouchEnd = now
  },
  false,
)

/* ===================================
   AUDIO AUTOPLAY ATTEMPT (OPTIONAL)
   =================================== */
// Uncomment this if you want to try auto-playing music
// Note: Most browsers block autoplay without user interaction
/*
messagePage.addEventListener('transitionend', () => {
    if (messagePage.classList.contains('active')) {
        const audio = document.getElementById('bgMusic');
        audio.play().catch(err => {
            console.log('Autoplay prevented:', err);
        });
    }
});
*/
const music = document.getElementById("bgMusic");

function startMusic() {
    music.muted = false;
    music.play().catch(() => {});
    document.removeEventListener("click", startMusic);
    document.removeEventListener("touchstart", startMusic);
}

// أول تفاعل من المستخدم
document.addEventListener("click", startMusic);
document.addEventListener("touchstart", startMusic);
