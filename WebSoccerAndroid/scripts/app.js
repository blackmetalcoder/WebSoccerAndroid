let games;
let datum;
let ligor;
$(document).ready(function () {

    $('.modal').modal();
    $('.tabs').tabs();
    $('#progress').show();
    datum = dagensDatum();
    getGames();
    $('.datepicker').datepicker({
        selectMonths: true,
        selectYears: 15,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        closeOnSelect: true,
        format: 'yyyy-mm-dd',
        firstDay: 1,
        onClose: function () {
            $('#P1').show();
            getGames();
        }

    });
});
var timer = setInterval(function () {
    var datum = $('#cboDate').val();
    if (dagensDatum === datum) {
        getGames();
        //alert('Hämtar nytt');
    }

}, 60000);
$(document).on('click', '#info', function (ev) {
    var uid = $(this).data('id');
    let result = games.find(match => match.Id === uid);
    $('#home').html(result.HomeTeam);
    $('#away').html(result.AwayTeam);
    /*Game stats */
    let stats = '<strong>Legue: </strong>' + result.League + '</br>';
    stats += '<Strong>Round: </strong>' + result.Round + '</br>';
    stats += '<strong>Stadium: </strong>' + result.Location + '</br></br>';
    stats += '<strong>Homegoals:  </strong></br>' + result.HomeGoalDetails + '</br></br>';
    stats += '<strong>Awaygoals:  </strong></br>' + result.AwayGoalDetails + '</br></br>';
    stats += 'Referee: ' + result.Referee;
    $('#stats').html(stats);
    /*HomeTeam*/
    let sRomove = result.HomeLineupGoalkeeper;
    try {
        sRomove = sRomove.replace(';', '');
    }
    catch{
        sRomove = '';
    }
    let homeTeam = '<strong>Goalkeeper: <strong></br>' + sRomove + '</br></br>';
    homeTeam += '<strong>Defense: </strong></br>' + result.HomeLineupDefense + '</br></br>';
    homeTeam += '<strong>Midfield: </strong></br>' + result.HomeLineupMidfield + '</br></br>';
    homeTeam += '<strong>Forwards: </strong></br>' + result.HomeLineupForward + '</br></br>';
    sRomove = result.HomeLineupSubstitutes;
    try {
        sRomove = sRomove.replace(';', '');
    }
    catch{
        sRomove = '';
    }
    homeTeam += '<strong>Substitutes: </strong></br>' + sRomove + '</br></br>';
    $('#homeTeam').html(homeTeam);
    /*Awayteam*/
    let AwayTeam = '<strong>Goalkeeper: <strong></br>' + result.AwayLineupGoalkeeper + '</br></br>';
    AwayTeam += '<strong>Defense: </strong></br>' + result.AwayLineupDefense + '</br></br>';
    AwayTeam += '<strong>Midfield: </strong></br>' + result.AwayLineupMidfield + '</br></br>'
    AwayTeam += '<strong>Forwards: </strong></br>' + result.AwayLineupForward + '</br></br>';
    sRomove = result.AwayLineupSubstitutes;
    try {
        sRomove = sRomove.replace(';', '');
    }
    catch{
        sRomove = '';
    }
    AwayTeam += '<strong>Substitutes: </strong></br>' + sRomove;
    $('#awayTeam').html(AwayTeam);
    $("#test-swipe-2").removeClass("active");
    $("#test-swipe-1").removeClass("active");
    $("#test-swipe-3").addClass("active");
    $('#modal1').modal('open');
});
$(document).on('click', '#datum', function () {
    $('.datepicker').datepicker('open');
});
$(document).on('click', '#ligor', function () {
    var settings = {
        "async": true,
        "url": "/api/Ligors",
        "method": "GET",

    }
    $.ajax(settings).done(function (data) {
        let l;
        let land;
        let sData = '<ul class="collection with-header">';
        $.each(data, function (key, item) {

            if (land != item.Country.trim()) {
                sData += '<li class="collection-header teal lighten-2 z-depth-3" > <strong>' + item.Country.trim() + '</strong></li>';
                sData += '<li class="collection-item " >' + item.Name + '</li>';
                land = item.Country.trim();
                ;
            }
            else {
                sData += '<li class="collection-item " >' + item.Name + '</li>';
            }
        });
        sData += '</ul>'
        $('#ligorLista').empty();
        $('#ligorLista').html($(sData));
        $('#modalLigor').modal('open');
    });
});
$(document).on('click', '#about', function () {
    $('#modalAbout').modal('open');
});
function test(datum) {
    var dT = new Date();
    var n = dT.getTimezoneOffset();
    var d = new Date(datum);
    d.setMinutes(d.getMinutes() - (n));
    return d.toString().substring(16, 21);
}
function getGames() {
    $('#progress').show();
    var datum = $('#cboDate').val();
    var settings = {
        "async": true,
        "url": "/api/Fixtures?StartDatum=" + datum,// + datum,
        "method": "GET",

    }

    var S = '<ul class="collection with-header">';
    $.ajax(settings).done(function (data) {
        games = data;
        $.each(data, function (key, item) {
            var tid = test(item.Date);
            let matchTid = (item.Time != null) ? item.Time : 0;

            if (isNaN(matchTid)) {
                if (item.Time.trim() === 'Finished') {
                    matchTid = 90;
                }
                else {
                    matchTid = 0;
                }
            }
            else {
                try {
                    matchTid = parseInt(matchTid);
                    if (isNaN(parseFloat(matchTid))) {
                        matchTid = 0;
                    }
                }
                catch (err) {
                    matchTid = 0;
                }
            }


            if (key === 0) {
                S += '<li class="collection-header teal lighten-2 z-depth-3"><strong>' + item.League.trim() + '</strong></li>';
                S += '<li class="collection-item "><div class="row" style=" margin-bottom: 2px;"><div class="col s2">' + tid + '</div><div class="col s8">' + item.HomeTeam + '</div><div class="col s1">' + item.HomeGoals + '</div></div><div class="row" style=" margin-bottom: 2px;"><div class="col s2 "><progress max="90" value="' + matchTid + '" data-label="' + matchTid + '" class="z-depth-2"></progress></div> <div class="col s8">' + item.AwayTeam + '</div> <div class="col s1">' + item.AwayGoals + '</div><div class="secondary-content"><i class="material-icons hoverable" id="info" data-id="' + item.Id + '" > send</i ></div></div ></li >';
                lastLiga = item.League.trim();
                ligor += item.League.trim();
            }
            else {
                if (lastLiga !== item.League.trim()) {
                    S += '<li class="collection-header teal lighten-2 z-depth-3"><strong>' + item.League.trim() + '</strong></li>';
                    S += '<li class="collection-item "><div class="row" style=" margin-bottom: 2px;"><div class="col s2">' + tid + '</div><div class="col s8">' + item.HomeTeam + '</div><div class="col s1">' + item.HomeGoals + '</div></div><div class="row" style=" margin-bottom: 2px;"><div class="col s2 "><progress max="90" value="' + matchTid + '" data-label="' + matchTid + '" class="z-depth-2"></progress></div> <div class="col s8">' + item.AwayTeam + '</div> <div class="col s1">' + item.AwayGoals + '</div><div class="secondary-content"><i class="material-icons hoverable" id="info" data-id="' + item.Id + '" > send</i ></div></div ></li >';
                    lastLiga = item.League.trim();
                    ligor += item.League.trim();
                }
                else {
                    S += '<li class="collection-item "><div class="row" style=" margin-bottom: 2px;"><div class="col s2">' + tid + '</div><div class="col s8">' + item.HomeTeam + '</div><div class="col s1">' + item.HomeGoals + '</div></div><div class="row" style=" margin-bottom: 2px;"><div class="col s2 "><progress max="90" value="' + matchTid + '" data-label="' + matchTid + '" class="z-depth-2"></progress></div> <div class="col s8">' + item.AwayTeam + '</div> <div class="col s1">' + item.AwayGoals + '</div><div class="secondary-content"><i class="material-icons hoverable" id="info" data-id="' + item.Id + '" > send</i ></div></div ></li >';

                }
            }

        });
        $('#games').empty();
        $('#games').append($(S));
        $('#games').append($('</ul>'));
        $('#P1').hide();
    });


}
//Dagens datum
function dagensDatum() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;
    dagensDatum = today;
    $('#cboDate').val(today);
}
