/* eslint-disable */
(function($) {
  $.fn.jTruncate = function(options) {
    var defaults = {
      length: 300,
      minTrail: 0,
      ellipsisText: "..."
    };

    var options = $.extend(defaults, options);

    return this.each(function() {
      obj = $(this);
      var body = obj.html();

      if (body.length > options.length + options.minTrail) {
        var splitLocation = body.indexOf("", options.length);
        if (splitLocation != -1) {
          // truncate tip
          var splitLocation = body.indexOf("", options.length);
          var str1 = body.substring(0, splitLocation);
          obj.html(
            str1 +
              '<span class="truncate_ellipsis">' +
              options.ellipsisText +
              "</span>"
          );
        }
      }
    });
  };
})(jQuery);
