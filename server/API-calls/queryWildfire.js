'use strict'

const fs = require('fs');

module.exports = {
  getWildfireByYear: function(year){
    var results = [];
    const json = queryDB();
    const data = JSON.parse(json);

    for(var i = 0; i < data.length; i++){
      if(data[i]['year'].toString() === year){
      let obj = {};
      obj.name = data[i]['country_name'];
      obj.year = data[i]["year"];
      obj.occurence = data[i]['occurrence'];
      obj.deaths = data[i]['Total deaths'];
      obj.rating = data[i]['severity rating'];
      obj.muOccur = data[i]['average deaths per occurance'];

      results.push(obj);
      
    }
  }
return results;

}
}


function queryDB(){
  return fs.readFileSync(__dirname + '/../data/wildfire.json', 'utf-8');
} 

queryDB();