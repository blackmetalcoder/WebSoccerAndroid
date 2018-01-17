$(document).on("pageshow", "#ligor", function (e) {
    var url = "api/Ligors";
    $.getJSON(url)
          .done(function (data) {
              var S;
              $.each(data, function (key, item) {
                  S += '<li>' + item.Name.trim() + '</li>';
              });
              $('#LigaList').empty();
              //undefined
              var S1 = S.replace("undefined", "");
              $('#LigaList').append($(S1));
              $('#LigaList').trigger('create');
              $("#LigaList").listview({
                  autodividers: true,
                  autodividersSelector: function (li) {
                      var out = li.attr('liga');
                      return out;
                  }
              }).listview('refresh');
          });
});