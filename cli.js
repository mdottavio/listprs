#! /usr/bin/env node --harmony

'use strict';

var program = require('commander');
var colors = require('./src/colors-wrapper.js');
var clientConfig = require('./src/config.js');
var gh = require('./src/gh-search.js');
var list = require('./src/list.js');

clientConfig.init();

program
  .option('-c, --configure', 'prompt configuration section')
  .option('-n, --nocolor', 'remove colors')
.parse(process.argv);

if(program.nocolor === true){
  colors.safe();
  clientConfig.safe();
};

function run(){
  gh.searchIssues(clientConfig.config)
  .then(function(prs){
    list.show(prs, clientConfig.config);
  })
  .catch(function(err){
    console.log(colors.red(' × ') + 'Error searching for PRs.');
    console.log('Run listprs -c to reconfigure your client.')
  });
}

if(!clientConfig.config.token || program.configure){
  if(!program.configure){
    console.log(colors.red(' × ') + 'Empty token.');
    console.log('Please create a new token on '+colors.green('https://github.com/settings/tokens/new'));
    console.log('and insert paste it below.');
    console.log('Why do you we need it? '+colors.green('https://github.com/mdottavio/blabla#token'));
  }
  clientConfig.configureToken()
  .then(run)
  .catch(function(err){
    console.error(chalk.red('Error saving token.'));
    console.log(err);
  });
} else {
  run();
}
