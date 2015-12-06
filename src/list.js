'use strict';


var listHdl = function(){


  var Table = require('cli-table');

  // instantiate
  var headerTable = new Table({
    colWidths: [20, 30]
  });
  var prsTable = new Table({
    head: ['PR'.blue, 'Labels'.blue, 'Author'.blue],
    colWidths: [70, 50, 20]
  });

  var showPrs = function(prs){
    for (var i = 0; i <= prs.items.length - 1; i++) {
      var a = [ prs.items[i].pull_request.html_url, processLabels(prs.items[i].labels), prs.items[i].user.login ];
      prsTable.push( a )
    };
    console.log(prsTable.toString())
  };

  var processLabels = function(labels){
    var result = '';
    for (var i = 0; i <= labels.length - 1; i++) {
      result += (result ? ' ' : '') + labels[i].name;
    }
    return result;
  };

  var completeResults = function(prs, config){
    showPrs(prs);
    headerTable.push( ['Total Prs', prs.total_count] );
    headerTable.push( ['Organization', config.organization] );
    headerTable.push( ['Included Labels', config.inLabel.join(', ')] );
    headerTable.push( ['Exclude Labels', config.outLabel.join(', ')] );
    console.log(headerTable.toString());

  };

  return {
    showTable: showPrs,
    show: completeResults
  }
};
module.exports = listHdl();


// // table is an Array, so you can `push`, `unshift`, `splice` and friends
// prsTable.push(
//     ['First valueFirst valueFirst valueFirst valueFirst valueFirst valueFirst value', 'Second value']
//   , ['First value', 'Second value']
// );
