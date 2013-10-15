var http = require('http');
var __ = require("underscore");
var db = require('./db');
var through2 = require('through2');
var ReadableStream = require('stream').Readable;

var Concussions = {
  update: function(concussion){
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
    rs.push(sql);
    rs.on('error', function(error){
      console.log(error);
    })
    console.log(rs);
    return rs;
  },

  getAll: function(){
    return db.readQuery("SELECT * FROM concussions LIMIT 5;")
  }
}

Remote = {
  fetch: function(cb){
    var options = {
      hostname: "api.nfldata.apiphany.com",
      path: "/trial/JSON/Injuries/2013REG/5?key=" + "9CBEBE65-6870-42C9-BE25-A239C4218647"
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
          Concussions.update(concussion).pipe(db.writeQuery(cb));
        });
      });
    });
  }
}


if (process.argv[2] === 'seed') {
  Remote.fetch(function() { process.exit() })
  return
}


