
$(document).on("pageshow", "#match-info", function (e) {
    var query = window.location.search;
    query = query.replace("?id=", "");
    var url = "api/matchen?match=" + query;
    $.getJSON(url)
          .done(function (data) {
              var S;
              var laget;
              $.each(data, function (key, item) {
                  S = '<table><tr><td class="text3 ">Homegoals</td></tr>';
                  S += '<tr><td class="text1 linje">' + item.HomeGoalDetails.trim() + '</td></tr>';
                  S += '<tr><td class="text3" >Hometeam yellowcards</td></tr>';
                  S += '<tr><td class="text1 linje">' + item.HomeTeamYellowCardDetails.trim() + '</td></tr>';
                  S += '<tr><td class="text3">Hometeam redcards</td></tr>';
                  S += '<tr><td class="text1 linje">' + item.HomeTeamRedCardDetails.trim() + '</td></tr>';
                  S += '<tr><td class="text3">Awaygoals</td></tr>';
                  S += '<tr><td class="text1 linje">' + item.AwayGoalDetails.trim() + '</td></tr>';
                  S += '<tr><td class="text3">Avayteam yellowcards</td></tr>';
                  S += '<tr><td class="text1 linje">' + item.AwayTeamYellowCardDetails.trim() + '</td></tr>';
                  S += '<tr><td class="text3">Awayteam redcards</td></tr>';
                  S += '<tr><td class="text1">' + item.AwayTeamRedCardDetails.trim() + '</td></tr></table>';
                  /*Här kommer laguppställning*/
                  laget = '<table><tr><td class="text2">Hometeam formation</td></tr>';
                  laget += '<tr><td class="text3 linje">Goalkeeper</td></tr>';
                  laget += '<tr><td class="text1">' + item.HomeLineupGoalkeeper + '</tr></td>';
                  laget += '<tr><td class="text3 linje">Defenders</td></tr>';
                  laget += '<tr><td class="text1">' + item.HomeLineupDefense + '</tr></td>';
                  laget += '<tr><td class="text3 linje">Midfield</td></tr>';
                  laget += '<tr><td class="text1">' + item.HomeLineupMidfield + '</tr></td>';
                  laget += '<tr><td class="text3 linje">Forwards</td></tr>';
                  laget += '<tr><td class="text1">' + item.HomeLineupForward + '</tr></td>';
                  laget += '<tr><td class="text3 linje">Substitudes</td></tr>';
                  laget += '<tr><td class="text1">' + item.HomeLineupSubstitutes + '</tr></td>';
                  laget += '<tr><td class="text1"></td></tr>';
                  laget += '<tr><td class="text2">Awayteam formation</td></tr>';
                  laget += '<tr><td class="text3 linje">Goalkeeper</td></tr>';
                  laget += '<tr><td class="text1">' + item.AwayLineupGoalkeeper + '</tr></td>';
                  laget += '<tr><td class="text3 linje">Defenders</td></tr>';
                  laget += '<tr><td class="text1">' + item.AwayLineupDefense + '</tr></td>';
                  laget += '<tr><td class="text3 linje">Midfield</td></tr>';
                  laget += '<tr><td class="text1">' + item.AwayLineupMidfield + '</tr></td>';
                  laget += '<tr><td class="text3 linje">Forwards</td></tr>';
                  laget += '<tr><td class="text1">' + item.AwayLineupForward + '</tr></td>';
                  laget += '<tr><td class="text3 linje">Substitudes</td></tr>';
                  laget += '<tr><td class="text1">' + item.AwayLineupSubstitutes + '</tr></td>';
                  laget += '<tr><td class="text3 linje">Referee</td></tr>';
                  laget += '<tr><td class="text1">' + item.Referee + '</tr></td><table>';
              });
              $("#fragment-1").html(S);
              $("#fragment-2").html(laget);
          });
});
