var http = require('http');
var __ = require("underscore");
var db = require('./db');
var through2 = require('through2');
var ReadableStream = require('stream').Readable;
// var keys = require('./api_keys');

module.exports = concussions = {}

concussions.update = function(concussions){
  var rs = new ReadableStream({objectMode:true})
  rs._read = function(){}
  var sql =
    "INSERT INTO concussions (body_part, injury_id, name, uniform_number, opponent, player_id, position, practice, practice_description, season, status, team, week) values("
      + "'" + concussion.BodyPart + "'"
      + "," + concussion.InjuryID
      + "," + "'" + concussion.Name + "'"
      + "," + concussion.Number
      + "," + "'" + concussion.Opponent + "'"
      + "," + concussion.PlayerID
      + "," + "'" + concussion.Position + "'"
      + "," + "'" + concussion.Practice + "'"
      + "," + "'" + concussion.PracticeDescription + "'"
      + "," + concussion.Season
      + "," + "'" + concussion.Status + "'"
      + "," + "'" + concussion.Team + "'"
      + "," + concussion.Week + ");"
  rs.on('error', function(error){ console.log(error) });
  rs.push(sql);
  return rs;
}

concussions.index = function(week, season){
  if (week && season)
    var sql = "SELECT * FROM concussions WHERE week =" + week + "AND season=" + season + "GROUP BY team;"
  else if (week)
    var sql = "SELECT * FROM concussions WHERE week =" + week + "GROUP BY team;"
  else if (season)
    var sql = "SELECT * FROM concussions WHERE season =" + season + "GROUP BY team;"
  else
    var sql = "SELECT * FROM concussions;"
  return db.readQuery(sql);
}

concussions.getBy = function(filter, week, season){
  if (week && season)
    var sql = "SELECT " + filter + " as filter, count(*) FROM concussions WHERE week =" + week + "AND season=" + season + "GROUP BY " + filter + ";"
  else if (week)
    var sql = "SELECT " + filter + " as filter, count(*) FROM concussions WHERE week =" + week + "GROUP BY " + filter + ";"
  else if (season)
    var sql = "SELECT " + filter + " as filter, count(*) FROM concussions WHERE season =" + season + "GROUP BY " + filter + ";"
  else
    var sql = "SELECT " + filter + " as filter, count(*) FROM concussions GROUP BY " + filter + ";"
  return db.readQuery(sql);
}


Remote = {
  fetch: function(cb){
    var options = {
      hostname: "api.nfldata.apiphany.com",
      path: "/trial/JSON/Injuries/2012REG/3?key=" + nflDataKey
    }

    http.get(options, function (result) {
      var buffer = "";
      var concussions = {};
      result.on("data", function (data) {
        buffer += data;
      });
      result.on("end", function () {
        var injuries_data = JSON.parse(buffer);
        var concussions_data = __.filter(injuries_data, function(injury){
          return injury.BodyPart == 'Concussion' || injury.BodyPart == 'Head';
        });
        console.log(concussions_data);
        __.each(concussions_data, function(concussion){
          concussions.update(concussion).pipe(db.writeQuery(cb));
        });
      });
    });
  }
}

if (process.argv[2] === 'seed') {
  Remote.fetch(function() { process.exit() })
  return
}


