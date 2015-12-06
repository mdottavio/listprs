#! /usr/bin/env node --harmony

'use strict';

var program = require('commander');
var chalk = require('chalk');
var clientConfg = require('./src/config.js');
var gh = require('./src/gh-search.js');
var list = require('./src/list.js');

clientConfg.init();

program
  .option('-c, --configure', 'prompt configuration section')
.parse(process.argv);


function run(){
  gh.searchIssues(clientConfg.config)
  .then(function(prs){
    list.showTable(prs);
  })
  .catch(function(err){
    console.error(chalk.red('Error searching for PRs.'));
    console.log('Run listprs -c to reconfigure your client.')
  });
}

if(!clientConfg.config.token || program.configure){
  if(!program.configure){
    console.error(chalk.red('Empty token.'));
    console.log('Please create a new token on '+'https://github.com/settings/tokens/new'.green);
    console.log('and insert paste it below.');
    console.log('Why do you we need it? '+'https://github.com/mdottavio/blabla#token'.green);
  }
  clientConfg.configureToken()
  .then(run)
  .catch(function(err){
    console.error(chalk.red('Error saving token.'));
    console.log(err);
  });
} else {
  run();
}
