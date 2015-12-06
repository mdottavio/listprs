'use strict';


var listHdl = function(){


  var Table = require('cli-table');

  // instantiate
  var table = new Table({
      head: ['PR'.blue, 'Author'.blue, 'Labels'.blue]
    , colWidths: [50, 30, 50]
  });

  var showTable = function(prs){
    for (var i = 0; i <= prs.items.length - 1; i++) {
      var a = [ prs.items[i].pull_request.html_url, prs.items[i].user.login, processLabels(prs.items[i].labels) ];
      table.push( a )
    };
    console.log(table.toString())
  };

  var processLabels = function(labels){
    var result = '';
    for (var i = 0; i <= labels.length - 1; i++) {
      result += (result ? ' ' : '') + labels[i].name;
    }
    return result;
  };

  return {
    showTable: showTable
  }
};
module.exports = listHdl();


// // table is an Array, so you can `push`, `unshift`, `splice` and friends
// table.push(
//     ['First valueFirst valueFirst valueFirst valueFirst valueFirst valueFirst value', 'Second value']
//   , ['First value', 'Second value']
// );
