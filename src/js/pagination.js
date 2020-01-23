/* eslint-disable */
(function($) {
  $.fn.blogPagination = function(options) {
    var settings = $.extend(
      {
        inputStyle: "",
        inputPlaceholder: "Search...",
        pagination: false,
        paginationClass: "blog_pagination_index",
        paginationClassActive: "blog_pagination_index_active",
        pagClosest: 3,
        perPage: 10,
        sortable: true,
        searchable: true,
        onInit: function() {},
        onUpdate: function() {},
        testing: false
      },
      options
    );
    var instance = this;
    this.settings = settings;
    this.tableUpdate = function(elm) {
      elm.blogPagination.matches = 0;
      $(elm)
        .find("tbody tr")
        .each(function() {
          var n = 0;
          var match = true;
          var globalMatch = false;
          $(this)
            .find("td")
            .each(function() {
              if (
                !settings.globalSearch &&
                elm.blogPagination.searchArr[n] &&
                !new RegExp(elm.blogPagination.searchArr[n], "i").test(
                  $(this).html()
                )
              ) {
                match = false;
              } else if (
                settings.globalSearch &&
                (!elm.blogPagination.search ||
                  new RegExp(elm.blogPagination.search, "i").test(
                    $(this).html()
                  ))
              ) {
                if (
                  !Array.isArray(settings.globalSearchExcludeColumns) ||
                  !settings.globalSearchExcludeColumns.includes(n + 1)
                ) {
                  globalMatch = true;
                }
              }
              n++;
            });
          if (
            (settings.globalSearch && globalMatch) ||
            (!settings.globalSearch && match)
          ) {
            elm.blogPagination.matches++;
            if (
              !settings.pagination ||
              (elm.blogPagination.matches >
                elm.blogPagination.perPage * (elm.blogPagination.page - 1) &&
                elm.blogPagination.matches <=
                  elm.blogPagination.perPage * elm.blogPagination.page)
            ) {
              $(this).show();
            } else {
              $(this).hide();
            }
          } else {
            $(this).hide();
          }
        });
      elm.blogPagination.pages = Math.ceil(
        elm.blogPagination.matches / elm.blogPagination.perPage
      );
      if (settings.pagination) {
        var paginationElement = elm.blogPagination.paginationElement
          ? $(elm.blogPagination.paginationElement)
          : $(elm).find(".pag");
        paginationElement.empty();
        for (var n = 1; n <= elm.blogPagination.pages; n++) {
          if (
            n == 1 ||
            (n > elm.blogPagination.page - (settings.pagClosest + 1) &&
              n < elm.blogPagination.page + (settings.pagClosest + 1)) ||
            n == elm.blogPagination.pages
          ) {
            var a = $("<a>", {
              html: n,
              "data-n": n,
              style: "margin:0.2em",
              class:
                settings.paginationClass +
                " " +
                (n == elm.blogPagination.page
                  ? settings.paginationClassActive
                  : "")
            })
              .css("cursor", "pointer")
              .bind("click", function() {
                elm.blogPagination.page = $(this).data("n");
                instance.tableUpdate(elm);
              });
            if (
              n == elm.blogPagination.pages &&
              elm.blogPagination.page <
                elm.blogPagination.pages - settings.pagClosest - 1
            ) {
              paginationElement.append($("<span>...</span>"));
            }
            paginationElement.append(a);
            if (n == 1 && elm.blogPagination.page > settings.pagClosest + 2) {
              paginationElement.append($("<span>...</span>"));
            }
          }
        }
      }
      settings.onUpdate.call(this, elm);
    };
    this.reinit = function(elm) {
      $(this).each(function() {
        $(this)
          .find("th a")
          .contents()
          .unwrap();
        $(this)
          .find("tr.fancySearchRow")
          .remove();
      });
      $(this).blogPagination(this.settings);
    };
    this.tableSort = function(elm) {
      if (
        typeof elm.blogPagination.sortColumn !== "undefined" &&
        elm.blogPagination.sortColumn < elm.blogPagination.nColumns
      ) {
        $(elm)
          .find("thead th div.sortArrow")
          .each(function() {
            $(this).remove();
          });
        var sortArrow = $("<div>", { class: "sortArrow" }).css({
          margin: "0.1em",
          display: "inline-block",
          width: 0,
          height: 0,
          "border-left": "0.4em solid transparent",
          "border-right": "0.4em solid transparent"
        });
        sortArrow.css(
          elm.blogPagination.sortOrder > 0
            ? { "border-top": "0.4em solid #000" }
            : { "border-bottom": "0.4em solid #000" }
        );
        $(elm)
          .find("thead th a")
          .eq(elm.blogPagination.sortColumn)
          .append(sortArrow);
        var rows = $(elm)
          .find("tbody tr")
          .toArray()
          .sort(function(a, b) {
            var stra = $(a)
              .find("td")
              .eq(elm.blogPagination.sortColumn)
              .html();
            var strb = $(b)
              .find("td")
              .eq(elm.blogPagination.sortColumn)
              .html();
            if (
              elm.blogPagination.sortAs[elm.blogPagination.sortColumn] ==
              "numeric"
            ) {
              return elm.blogPagination.sortOrder > 0
                ? parseFloat(stra) - parseFloat(strb)
                : parseFloat(strb) - parseFloat(stra);
            } else {
              return stra < strb
                ? -elm.blogPagination.sortOrder
                : stra > strb
                ? elm.blogPagination.sortOrder
                : 0;
            }
          });
        $(elm)
          .find("tbody")
          .empty()
          .append(rows);
      }
    };
    this.each(function() {
      if ($(this).prop("tagName") !== "TABLE") {
        console.warn("blogPagination: Element is not a table.");
        return true;
      }
      var elm = this;
      elm.blogPagination = {
        nColumns: $(elm)
          .find("td")
          .first()
          .parent()
          .find("td").length,
        nRows: $(this).find("tbody tr").length,
        perPage: settings.perPage,
        page: 1,
        pages: 0,
        matches: 0,
        searchArr: [],
        search: "",
        sortColumn: settings.sortColumn,
        sortOrder:
          typeof settings.sortOrder === "undefined"
            ? 1
            : new RegExp("desc", "i").test(settings.sortOrder) ||
              settings.sortOrder == -1
            ? -1
            : 1,
        sortAs: [], // undefined or numeric
        paginationElement: settings.paginationElement
      };
      if ($(elm).find("tbody").length == 0) {
        var content = $(elm).html();
        $(elm).empty();
        $(elm)
          .append("<tbody>")
          .append($(content));
      }
      if ($(elm).find("thead").length == 0) {
        $(elm).prepend($("<thead>"));
        // Maybe add generated headers at some point
        //var c=$(elm).find("tr").first().find("td").length;
        //for(var n=0; n<c; n++){
        //	$(elm).find("thead").append($("<th></th>"));
        //}
      }
      if (settings.sortable) {
        var n = 0;
        $(elm)
          .find("thead th")
          .each(function() {
            elm.blogPagination.sortAs.push(
              $(this).data("sortas") == "numeric" ? "numeric" : ""
            );
            var content = $(this).html();
            var a = $("<a>", {
              html: content,
              "data-n": n,
              class: ""
            })
              .css("cursor", "pointer")
              .bind("click", function() {
                if (elm.blogPagination.sortColumn == $(this).data("n")) {
                  elm.blogPagination.sortOrder = -elm.blogPagination.sortOrder;
                } else {
                  elm.blogPagination.sortOrder = 1;
                }
                elm.blogPagination.sortColumn = $(this).data("n");
                instance.tableSort(elm);
                instance.tableUpdate(elm);
              });
            $(this).empty();
            $(this).append(a);
            n++;
          });
      }
      if (settings.searchable) {
        var searchHeader = $("<tr>").addClass("fancySearchRow");
        if (settings.globalSearch) {
          var searchField = $("<input>", {
            placeholder: settings.inputPlaceholder,
            style: "width:100%;" + settings.inputStyle
          }).bind("change paste keyup", function() {
            elm.blogPagination.search = $(this).val();
            elm.blogPagination.page = 1;
            instance.tableUpdate(elm);
          });
          var th = $("<th>", { style: "padding:2px;" }).attr(
            "colspan",
            elm.blogPagination.nColumns
          );
          $(searchField).appendTo($(th));
          $(th).appendTo($(searchHeader));
        } else {
          var n = 0;
          $(elm)
            .find("td")
            .first()
            .parent()
            .find("td")
            .each(function() {
              elm.blogPagination.searchArr.push("");
              var searchField = $("<input>", {
                "data-n": n,
                placeholder: settings.inputPlaceholder,
                style: "width:100%;" + settings.inputStyle
              }).bind("change paste keyup", function() {
                elm.blogPagination.searchArr[$(this).data("n")] = $(this).val();
                elm.blogPagination.page = 1;
                instance.tableUpdate(elm);
              });
              var th = $("<th>", { style: "padding:2px;" });
              $(searchField).appendTo($(th));
              $(th).appendTo($(searchHeader));
              n++;
            });
        }
        searchHeader.appendTo($(elm).find("thead"));
      }
      // Sort
      instance.tableSort(elm);
      if (settings.pagination && !settings.paginationElement) {
        $(elm)
          .find("tfoot")
          .remove();
        $(elm).append($("<tfoot><tr></tr></tfoot>"));
        $(elm)
          .find("tfoot tr")
          .append(
            $("<td class='pag'></td>", {}).attr(
              "colspan",
              elm.blogPagination.nColumns
            )
          );
      }
      instance.tableUpdate(elm);
      settings.onInit.call(this, elm);
    });
    return this;
  };
})(jQuery);
