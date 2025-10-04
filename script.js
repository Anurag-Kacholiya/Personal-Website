// This event listener waits for the entire HTML document to be loaded and parsed
// before running any of the JavaScript inside it. This fixes the error.
document.addEventListener('DOMContentLoaded', () => {

  // Ensure .no-js fallback is removed (so CSS animations can run)
  document.documentElement.classList.remove('no-js');

  // 1. Setup the Intersection Observer for fade-in animations
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // If the element is in the viewport, add the 'fade-in' class
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  });

  // Observe all elements with the class '.section'
  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });


  // 2. Animate navbar shrink on scroll
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    // If user scrolls more than 50px, add the 'scrolled' class, otherwise remove it
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  // 3. Custom cursor glow effect
  // This line will now correctly find the div because the DOM is loaded
  const cursorGlow = document.getElementById('cursor-glow');
  const interactiveElements = document.querySelectorAll('a, .btn, .flip-card');

  window.addEventListener('mousemove', e => {
    // Get the x and y coordinates of the mouse
    const x = e.clientX;
    const y = e.clientY;

    // Use requestAnimationFrame for smoother animation
    requestAnimationFrame(() => {
      // Set the position of the glow div using transform for better performance
      cursorGlow.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    });
  });

  // Add a hover effect when the cursor is over interactive elements
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorGlow.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursorGlow.classList.remove('hover');
    });
  });

}); // End of the DOMContentLoaded event listener

