// fades in page elements as they come into view
(function animate () {
  const doc = document.documentElement

  doc.classList.remove('no-js')
  doc.classList.add('js')

  // Reveal animations
  if (document.body.classList.contains('has_animation')) {
    /* global ScrollReveal */
    const sr = (window.sr = ScrollReveal())

    sr.reveal('.scroll_animate', {
      duration: 1000,
      distance: '40px',
      easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
      origin: 'bottom',
      interval: 150
    })
  }
})();

// animates scroll to anchor events on click
(function scroll () {
  let element = document.querySelector('a[href^="#test_anchor"]')
  element.addEventListener('click', function (event) {
    event.preventDefault()
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' })
  })
})()
