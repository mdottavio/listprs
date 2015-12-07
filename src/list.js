'use strict';

var colors = require('./colors-wrapper.js');

var listHdl = function(){


  var Table = require('cli-table');

  // instantiate
  var headerTable = new Table({
    colWidths: [20, 30]
  });
  var prsTable = new Table({
    head: [colors.white('PR'), colors.white('Labels'), colors.white('Author')],
    colWidths: [70, 50, 20]
  });

  var showPrs = function(prs){
    for (var i = 0; i <= prs.items.length - 1; i++) {
      var a = [ colors.green(prs.items[i].pull_request.html_url), processLabels(prs.items[i].labels), colors.grey(prs.items[i].user.login) ];
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
    headerTable.push( ['Total Prs', colors.grey((prs.total_count+''))] );
    headerTable.push( ['Organization', colors.grey(config.organization)] );
    headerTable.push( ['Included Labels', colors.grey(config.inLabel.join(', '))] );
    headerTable.push( ['Exclude Labels', colors.grey(config.outLabel.join(', '))] );
    console.log(headerTable.toString());

  };

  return {
    showTable: showPrs,
    show: completeResults
  }
};
module.exports = listHdl();
