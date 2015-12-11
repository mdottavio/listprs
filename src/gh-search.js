'use strict';

// var request = require('superagent');
var request = require('request');
var Q = require('q');
var loader = require('./loader.js');

var searchHdl = function(){
  var searchIssues = function(config){
    var deferred = Q.defer();
    loader.start();

    request({
      uri: config.apiUrl.replace(/\/$/, '') + '/search/issues?q=' + queryString(config),
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
    var querystring = 'type:pr+state:open';
    var lIn = '';
    var lOut = '';

    querystring += (config.organization) ? '+user:'+config.organization : '';
    if(config.inLabel){
      lIn = extractLabels(config.inLabel);
      querystring += lIn ? '+'+lIn : '';
    }
    if(config.outLabel){
      lOut = extractLabels(config.outLabel, '-');
      querystring += lOut ? '+'+lOut : '';
    }
    return querystring;
  };

  var extractLabels = function(labels, prefix){
    var result = '';

    prefix = prefix || '';
    for (var i = 0; i <= labels.length - 1; i++) {
      result += (result ? '+' : '') + prefix+'label:'+'"' + labels[i].trim() + '"';
    }
    return result;
  };

  return {
    searchIssues: searchIssues
  };

};
module.exports = searchHdl();
