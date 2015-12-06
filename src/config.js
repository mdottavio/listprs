'use strict';

var fs = require('fs');
var extend = require('util')._extend;
var prompt = require('prompt');
var Q = require('q');

var configHdl = function(){
  prompt.message = '';
  prompt.delimiter = '';
  var configFile = {
    path : __dirname + '/../conf/client.json',
    charSet : 'utf8'
  };
  // default config object
  var config = {
    'token': '',
    'organization' : '',
    'inLabel' : '',
    'outLabel' : '',
  };

  /**
   * Try to read the config file and return its value
   * @return {object}
   */
  var init = function(){
    var c;
    try{
      c = JSON.parse(fs.readFileSync(configFile.path, configFile.charSet));
      config = extend(config, c);
    } catch (e){
      // TODO check if the config path is writable
      saveConfig();
    }
    return config;
  };

  /**
   * Prompt user to enter a token and save it.
   */
  var configureToken = function(){
    return getUserToken()
      .then(saveConfig);
  };

  /**
   * Prompt user to enter a token
   */
  var getUserToken = function(){
    var deferred = Q.defer();
    prompt.get([{
      description: 'Personal access tokens:',
      name: 'token',
      hidden: true,
      required: true,
      default: config.token
    }, {
      description: 'Search within a user\'s or organization\'s repositories:',
      name: 'organization',
      default: config.organization
    }, {
      description: 'Include Prs using the labels (coma separate):',
      name: 'inLabel',
      default: config.inLabel
    }, {
      description: 'Exclude Prs using the labels (coma separate):',
      name: 'outLabel',
      default: config.outLabel
    }], function (err, result) {
      config = extend(config, result);
      deferred.resolve(config);
    });
    return deferred.promise;
  };

  /**
   * Save the config file
   */
  var saveConfig = function(){
    var deferred = Q.defer();
    var data = JSON.stringify(config, null, 2);
    fs.writeFile(configFile.path, data, configFile.charSet, function(err) {
      if(err) {
        deferred.reject(err);
      } else {
        deferred.resolve(config);
      }
    });
    return deferred.promise;
  };

  return {
    init: init,
    configureToken: configureToken,
    config: config
  };

};
module.exports = configHdl();
