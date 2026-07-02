gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 87;
// Images are named ezgif-frame-001.jpg up to 087.jpg
const currentFrame = index => (
  `ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`
);

const images = [];
const canData = {
  frame: 0
};

let imagesLoaded = 0;

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  img.onload = () => {
      imagesLoaded++;
      if (imagesLoaded === 1) {
          // Set canvas to the resolution of the image
          canvas.width = img.width;
          canvas.height = img.height;
          render();
      }
      // Once all images are loaded, init animations
      if (imagesLoaded === frameCount) {
          initAnimations();
          generateFloatingParticles();
      }
  };
  images.push(img);
}

function render() {
  if (images[canData.frame]) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[canData.frame], 0, 0);
  }
}

function initAnimations() {
  // Canvas Sequence Animation
  gsap.to(canData, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5 // Smoother scrubbing, 1.5s delay
    },
    onUpdate: render
  });

  // UI Animations
  
  // Navbar fade in
  gsap.to(".navbar", {
      opacity: 1,
      duration: 1.5,
      delay: 0.5,
      ease: "power2.out"
  });

  // Hero text fade out as user scrolls
  gsap.to(".hero-title, .hero-subtitle, .hero .cta-btn", {
      y: -100,
      opacity: 0,
      scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "+=60%",
          scrub: true
      }
  });

  // Product Reveal Text
  gsap.from(".reveal-text", {
      y: 100,
      opacity: 0,
      scale: 0.9,
      scrollTrigger: {
          trigger: ".product-reveal",
          start: "top 70%",
          end: "center center",
          scrub: true
      }
  });

  // Features Cards
  gsap.from(".feature-card", {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      scrollTrigger: {
          trigger: ".features",
          start: "top 80%",
          end: "center center",
          scrub: true
      }
  });

  // Ingredients Labels
  gsap.from(".label", {
      scale: 0.5,
      opacity: 0,
      stagger: 0.3,
      scrollTrigger: {
          trigger: ".ingredients",
          start: "top 70%",
          end: "center center",
          scrub: true
      }
  });

  // Benefits Stats
  gsap.from(".stat", {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      scrollTrigger: {
          trigger: ".benefits",
          start: "top 80%",
          end: "center center",
          scrub: true
      }
  });

  // Mouse Parallax Effect on floating cards
  document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      
      gsap.to(".feature-card", {
          duration: 1.5,
          rotationY: mouseX * 10,
          rotationX: -mouseY * 10,
          ease: "power2.out",
          transformPerspective: 1000
      });
  });
}

function generateFloatingParticles() {
    const container = document.getElementById("parallax-container");
    const numParticles = 20;

    for (let i = 0; i < numParticles; i++) {
        const p = document.createElement("div");
        p.className = "floating-element";
        
        // Randomize size, position, and opacity
        const size = Math.random() * 60 + 10;
        p.style.width = size + "px";
        p.style.height = size + "px";
        p.style.left = Math.random() * 100 + "vw";
        p.style.top = (Math.random() * 200) + "vh"; // Spread across multiple screens
        p.style.opacity = Math.random() * 0.5 + 0.1;

        container.appendChild(p);

        // GSAP floating animation
        gsap.to(p, {
            y: "-=300",
            x: "+=" + (Math.random() * 100 - 50),
            rotation: Math.random() * 360,
            duration: Math.random() * 5 + 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        });
        
        // Continuous slow float independent of scroll
        gsap.to(p, {
            y: "+=30",
            x: "+=20",
            duration: Math.random() * 4 + 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
}
