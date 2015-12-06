'use strict';

var elegantSpinner = require('elegant-spinner');
var logUpdate = require('log-update');
var frame = elegantSpinner();

var loaderHdl = function(){
  var loaderInterval;

  var start = function(){
    logUpdate.clear();
    loaderInterval = setInterval(function () { logUpdate(frame()); }, 50);
  };

  var stop = function(){
    logUpdate.clear();
    clearInterval(loaderInterval);
  };
  return {
    start:start,
    stop: stop
  }
};

module.exports = loaderHdl();
