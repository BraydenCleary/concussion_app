var http = require('http');
var __ = require("underscore");
var db = require('./db');
var through2 = require('through2');
var ReadableStream = require('stream').Readable;
var csv2json = require('csvtojson');
var Converter=require("csvtojson").core.Converter;

module.exports = concussions = {}

concussions.update = function(concussion){
  var rs = new ReadableStream({objectMode:true})
  rs._read = function(){}
  var sql =
    "INSERT INTO concussions (body_part, injury_id, name, uniform_number, opponent, player_id, position, practice, practice_description, season, season_type, status, team, updated, week) values("
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
      + "," + concussion.SeasonType
      + "," + "'" + concussion.Status + "'"
      + "," + "'" + concussion.Team + "'"
      + "," + "'" + concussion.Updated + "'"
      + "," + concussion.Week + ");"
  rs.on('error', function(error){ console.log(error) });
  rs.push(sql);
  return rs;
}

concussions.index = function(week, season){
  if (week && season)
    var sql = "SELECT * FROM concussions WHERE week =" + week + "AND season=" + season + " and (body_part='Concussion' or body_part='Head') GROUP BY team;"
  else if (week)
    var sql = "SELECT * FROM concussions WHERE week =" + week + " and (body_part='Concussion' or body_part='Head') GROUP BY team;"
  else if (season)
    var sql = "SELECT * FROM concussions WHERE season =" + season + " and (body_part='Concussion' or body_part='Head') GROUP BY team;"
  else
    var sql = "SELECT * FROM concussions;"
  return db.readQuery(sql);
}

concussions.getBy = function(filter, week, season){
  if (week && season)
    var sql = "SELECT " + filter + " as filter, count(*) FROM concussions WHERE week =" + week + "AND season=" + season + " and (body_part='Concussion' or body_part='Head') GROUP BY " + filter + ";"
  else if (week)
    var sql = "SELECT " + filter + " as filter, count(*) FROM concussions WHERE week =" + week + " and (body_part='Concussion' or body_part='Head') GROUP BY " + filter + ";"
  else if (season)
    var sql = "SELECT " + filter + " as filter, count(*) FROM concussions WHERE season =" + season + " and (body_part='Concussion' or body_part='Head') GROUP BY " + filter + ";"
  else
    var sql = "SELECT " + filter + " as filter, count(*) FROM concussions WHERE body_part='Concussion' or body_part='Head' GROUP BY " + filter + ";"
  return db.readQuery(sql);
}

concussions.seed = function(){
  var csvFileName="injuries.csv";

  var csvConverter=new Converter();

  csvConverter.on("end_parsed",function(jsonObj){
      __.each(jsonObj.csvRows, function(injury){
        var cb = function(){};
        concussions.update(injury).pipe(db.writeQuery(cb))
      });
  });

  csvConverter.from(csvFileName)
}


if (process.argv[2] === 'seed') {
  concussions.seed(function() { process.exit() })
  return
}


