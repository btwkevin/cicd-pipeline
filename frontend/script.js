const typingText = document.querySelector(".typing-text")
const phrases = [
  "Linux Enthusiast",
  "Backend Developer",
  "Home Lab Tinkerer",
  "System Administrator",
]

let phraseIndex = 0
let charIndex = 0
let isDeleting = false
let typingSpeed = 100

function typeWriter() {
  const currentPhrase = phrases[phraseIndex]

  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1)
    charIndex--
    typingSpeed = 50
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1)
    charIndex++
    typingSpeed = 100
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    setTimeout(() => {
      isDeleting = true
    }, 2000)
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    phraseIndex = (phraseIndex + 1) % phrases.length
  }

  setTimeout(typeWriter, typingSpeed)
}

// Start typing animation
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeWriter, 1000)
})

// Tooltip functionality
const skillItems = document.querySelectorAll(".skill-item")
const tooltip = document.getElementById("tooltip")

skillItems.forEach((item) => {
  item.addEventListener("mouseenter", (e) => {
    const tooltipText = item.getAttribute("data-tooltip")
    tooltip.textContent = tooltipText
    tooltip.classList.add("show")

    // Position tooltip
    const rect = item.getBoundingClientRect()
    const tooltipRect = tooltip.getBoundingClientRect()

    tooltip.style.left = rect.left + rect.width / 2 - tooltipRect.width / 2 + "px"
    tooltip.style.top = rect.top - tooltipRect.height - 10 + "px"
  })

  item.addEventListener("mouseleave", () => {
    tooltip.classList.remove("show")
  })
})

// Update tooltip position on mouse move
document.addEventListener("mousemove", (e) => {
  if (tooltip.classList.contains("show")) {
    const hoveredSkill = document.querySelector(".skill-item:hover")
    if (hoveredSkill) {
      const rect = hoveredSkill.getBoundingClientRect()
      const tooltipRect = tooltip.getBoundingClientRect()

      tooltip.style.left = rect.left + rect.width / 2 - tooltipRect.width / 2 + "px"
      tooltip.style.top = rect.top - tooltipRect.height - 10 + "px"
    }
  }
})

// Smooth scrolling for any future navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add some interactive particles effect (optional)
function createParticle() {
  const particle = document.createElement("div")
  particle.style.position = "fixed"
  particle.style.width = "2px"
  particle.style.height = "2px"
  particle.style.backgroundColor = "var(--accent)"
  particle.style.borderRadius = "50%"
  particle.style.pointerEvents = "none"
  particle.style.opacity = "0.6"
  particle.style.zIndex = "-1"

  particle.style.left = Math.random() * window.innerWidth + "px"
  particle.style.top = window.innerHeight + "px"

  document.body.appendChild(particle)

  const animation = particle.animate(
    [
      { transform: "translateY(0px)", opacity: 0.6 },
      { transform: `translateY(-${window.innerHeight + 100}px)`, opacity: 0 },
    ],
    {
      duration: Math.random() * 3000 + 2000,
      easing: "linear",
    },
  )

  animation.onfinish = () => {
    particle.remove()
  }
}

// Create particles occasionally
setInterval(createParticle, 3000)

// Add scroll-based animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for scroll animations
document.querySelectorAll(".bio-card, .skills-section").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.8s ease, transform 0.8s ease"
  observer.observe(el)
})
