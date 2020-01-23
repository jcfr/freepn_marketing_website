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
})();

(function paginate () {
  // Load the script
  var script = document.createElement('SCRIPT')
  script.src = 'https://code.jquery.com/jquery-3.3.1.slim.min.js'
  script.type = 'text/javascript'
  document.getElementsByTagName('head')[0].appendChild(script)

  // Poll for jQuery to come into existance
  var checkReady = function (callback) {
    if (window.jQuery) {
      /* eslint-disable-next-line */
      callback(jQuery);
    } else {
      window.setTimeout(function () {
        checkReady(callback)
      }, 20)
    }
  }

  // Start polling...
  checkReady(function ($) {
    $(function () {
      $('#article_table').blogPagination({
        searchable: false,
        pagination: true,
        paginationClass: 'blog_pagination_index',
        paginationClassActive: 'blog_pagination_index_active',
        pagClosest: 1,
        perPage: 4
      })
    })
  })
})()
