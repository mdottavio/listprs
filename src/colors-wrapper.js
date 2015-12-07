'use strict';

var colors = require('colors');

var colorHdl = function(){

  var isDisabled = false;

  var makeitSafe = function(){
    isDisabled = true;
  };

  var makeitRed = function(theText){
    if(isDisabled) return theText;
    return colors.red(theText);
  };
  var makeitGreen = function(theText){
    if(isDisabled) return theText;
    return colors.green(theText);
  };
  var makeitGrey = function(theText){
    if(isDisabled) return theText;
    return colors.grey(theText);
  };
  var makeitWhite = function(theText){
    if(isDisabled) return theText;
    return colors.white(theText);
  };

  return {
    red: makeitRed,
    green: makeitGreen,
    grey: makeitGrey,
    white: makeitWhite,
    safe: makeitSafe
  };

};
module.exports = colorHdl();
