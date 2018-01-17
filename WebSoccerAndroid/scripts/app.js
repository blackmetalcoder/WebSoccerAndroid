var timer;
var i = 0;
var dagensDatum;

$(document).on("pagecreate", "#main", function () {
    dagensDatum();
    Fixtures();
    var picker = $("input[type='text']", this);
    picker.mobipick();
    picker.on( "change", function() {
    // formatted date, like yyyy-mm-dd              
    var date = $( this ).val();
        Fixtures();
    // JavaScript Date object
        var dateObject = $(this).mobipick("option", "date");

    });
    var datum = $('#cboDate').val();
    timer = setInterval(function () {
        if (dagensDatum === datum) {
            Fixtures();
        }

    }, 60000);
});
function dagensDatum() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    dagensDatum = today;
    $('#cboDate').val(today);
}
function getResults() {
    var datum = $('#cboDate').val();
    $.ajax({
        type: "GET",
        url: "api/Fixtures?StartDatum=" + datum,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successFunction,
        error: function (msg) {
            alert(msg.statusText);
        }
    });
    function successFunction(data) {
        var html = '';
        $.each(data, function (index, item) {
            var namn = item.Time;
            var pris = item.Date;
            var Hemmalag = item.HomeTeam;
            var Bortalag = item.AwayTeam;

        });
    }
}
function Fixtures() {
    /*Visar att häntning pågår item.Date.substring(11)*/
    $("#load").addClass("cssload-loader");
    var datum = $('#cboDate').val();
    var url = "api/Fixtures?StartDatum=" + datum;
    $.getJSON(url)
          .done(function (data) {
              var S = '';
              $.each(data, function (key, item) {
                  var tid = test(item.Date);
                  var status = statustext(item.Time);
                  S += '<li liga="' + item.League.trim() + '"><a href="game.html?id=' + item.Id + '" data-ajax=false>' +
                      '<table>' + '<tr><td class="left">' + status + '</td><td class="middle">' + tid + '</td></tr>' +
                      '<tr><td class="left">' + item.HomeTeam.trim() + '</td><td class="middle">' + item.HomeGoals + '</td></tr><tr><td class="left"> ' + item.AwayTeam.trim() + '</td><td class="middle">' + item.AwayGoals + '</td></tr>' +
                      '</table></a></li>';
              });
        $('#MessagesList').empty();
        $('#MessagesList').append($(S));
        $('#MessagesList').trigger('create');
              $("#MessagesList").listview({
                  autodividers: true,
                  autodividersSelector: function (li) {
                      var out = li.attr('liga');
                      return out;
                  }
              }).listview('refresh');
              $("#load").removeClass("cssload-loader");
        var date = new Date();
        var hours = date.getHours();
        if (hours < 10) hours = '0' + hours;
              var minutes = date.getMinutes()
        if (minutes < 10) minutes = '0' + minutes;
        var seconds = date.getSeconds();
        if (seconds < 10) seconds = '0' + seconds;
        $("#info").empty();
              $("#info").append("Updated:" + hours +':' + minutes + ':' + seconds);
             

    });
    /*Hämtning slut*/
   
}
function test(datum) {
    var dT = new Date();
    var n = dT.getTimezoneOffset();
    //alert(n);
    var d = new Date(datum);
    //d.setMinutes(d.getMinutes() - (n));;
    return d.toString().substring(16,24);
}
function statustext(text) {
    if (text === null) {
        return 'Not started';
    } else {
        return text;
    }
}
$(document).on("pageshow", "#ligor", function (e) {
    var url = "api/Ligors";
    $.getJSON(url)
          .done(function (data) {
              var S;
              $.each(data, function (key, item) {
                  S += '<li liga="' + item.Country.trim() + '">' + item.Name.trim() + '</li>';
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
