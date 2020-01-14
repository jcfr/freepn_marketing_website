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
      duration: 1500,
      distance: '40px',
      easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
      origin: 'bottom',
      interval: 150
    })
  }
})()

// animates FAQ accordion
class Details {
  constructor (el, settings) {
    this.group = el
    this.details = this.group.getElementsByClassName(
      'faq_section_one_question_details'
    )
    this.toggles = this.group.getElementsByClassName(
      'faq_section_one_question_details_header'
    )
    this.contents = this.group.getElementsByClassName(
      'faq_section_one_question_details_content'
    )

    // Set default settings if necessary
    this.settings = Object.assign(
      {
        speed: 300,
        one_visible: false
      },
      settings
    )

    // Setup inital positions
    for (let i = 0; i < this.details.length; i++) {
      const detail = this.details[i]
      const toggle = this.toggles[i]
      const content = this.contents[i]

      // Set transition-duration to match JS setting
      detail.style.transitionDuration = this.settings.speed + 'ms'

      // Set initial height to transition from
      if (!detail.hasAttribute('open')) {
        detail.style.height = toggle.clientHeight + 'px'
      } else {
        detail.style.height = toggle.clientHeight + content.clientHeight + 'px'
      }
    }

    // Setup click handler
    this.group.addEventListener('click', e => {
      if (
        e.target.classList.contains('faq_section_one_question_details_header')
      ) {
        e.preventDefault()

        let num = 0
        for (let i = 0; i < this.toggles.length; i++) {
          if (this.toggles[i] === e.target) {
            num = i
            break
          }
        }

        if (!e.target.parentNode.hasAttribute('open')) {
          this.open(num)
        } else {
          this.close(num)
        }
      }
    })
  }

  open (i) {
    const detail = this.details[i]
    const toggle = this.toggles[i]
    const content = this.contents[i]

    // If applicable, hide all the other details first
    if (this.settings.one_visible) {
      for (let a = 0; a < this.toggles.length; a++) {
        if (i !== a) this.close(a)
      }
    }

    // Update class
    detail.classList.remove('is-closing')

    // Get height of toggle
    const toggleHeight = toggle.clientHeight

    // Momentarily show the contents just to get the height
    detail.setAttribute('open', true)
    const contentHeight = content.clientHeight
    detail.removeAttribute('open')

    // Set the correct height and let CSS transition it
    detail.style.height = toggleHeight + contentHeight + 'px'

    // Finally set the open attr
    detail.setAttribute('open', true)
  }

  close (i) {
    const detail = this.details[i]
    const toggle = this.toggles[i]

    // Update class
    detail.classList.add('is-closing')

    // Get height of toggle
    const toggleHeight = toggle.clientHeight

    // Set the height so only the toggle is visible
    detail.style.height = toggleHeight + 'px'

    setTimeout(() => {
      // Check if still closing
      if (detail.classList.contains('is-closing')) {
        detail.removeAttribute('open')
      }
      detail.classList.remove('is-closing')
    }, this.settings.speed)
  }
}

(() => {
  const els = document.getElementsByClassName(
    'faq_section_one_question_details_group'
  )

  for (let i = 0; i < els.length; i++) {
    /* eslint-disable-next-line */
    const details = new Details(els[i], {
      speed: 300,
      one_visible: true
    })
  }
})()
