'use strict';

// var request = require('superagent');
var request = require('request');
var Q = require('q');
var loader = require('./loader.js');

var searchHdl = function(){
  var baseUrl = 'https://api.github.com/search/';

  var searchIssues = function(config){
    var deferred = Q.defer();
    loader.start();

    request({
      uri: baseUrl + 'issues?q=' + queryString(config),
      headers: {
        'Authorization': 'token ' + config.token,
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.73 Safari/537.36'
      },
      method: 'GET'
    }, function (err, res, body) {
      loader.stop();
      if(err){
        deferred.reject(err);
      } else {
        deferred.resolve(JSON.parse(body));
      }
    });

    return deferred.promise;
  };

  var queryString = function(config){
    // label:frontend+user:Olapic+state:open+type:pr+-label:wip
    var querystring = 'type:pr+state:open';
    querystring += (config.organization) ? '+user:'+config.organization : '';
    if(config.inLabel){
      querystring += '+'+extractLabels(config.inLabel);
    }
    if(config.outLabel){
      querystring += '+'+extractLabels(config.outLabel, '-');
    }
    return querystring;
  };

  var extractLabels = function(string, prefix){
    var labels = string.split(',');
    var result = '';

    prefix = prefix || '';
    for (var i = 0; i <= labels.length - 1; i++) {
      result += prefix+'label:'+labels[i].trim();
    }
    return result;
  };

  return {
    searchIssues: searchIssues
  };

};
module.exports = searchHdl();
