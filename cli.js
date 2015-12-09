#! /usr/bin/env node --harmony

'use strict';

var program = require('commander');
var colors = require('./src/colors-wrapper.js');
var clientConfig = require('./src/config.js');
var gh = require('./src/gh-search.js');
var list = require('./src/list.js');

clientConfig.init();

program
  .option('-c, --configure', 'Prompt configuration section')
  .option('-e, --empty-config [organization|inLabel|outLabel]', 'Emtpy a configuration value', /^(organization|inLabel|outLabel)$/i)
  .option('-n, --nocolor', 'Remove colors')

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
    console.log('Please create a new token on '
      +colors.green('https://github.com/settings/tokens/new')
      +' and paste it below. Use Enter to confirm.');
    console.log('Why do you we need it? '
      +colors.green('https://github.com/mdottavio/listprs#personal-access-tokens'));
  }
  clientConfig.configureToken()
  .then(run)
  .catch(function(err){
    console.error(colors.red(' × ') + ' Error saving token');
    console.log(err);
  });
} else if( program.emptyConfig ) {
  if(typeof program.emptyConfig === 'string' ){
    // empty configuration
    clientConfig.empty(program.emptyConfig)
    .then(function(){
      console.log(colors.green(' ✓ ') + ' %s empty', program.emptyConfig);
    })
    .catch(function(err){
      console.error(colors.red(' × ') + ' %s couldn\'t be empty', colors.grey(program.emptyConfig));
    });
  } else {
    console.error(colors.red(' × ') + ' unknow config: %s', colors.grey(program.rawArgs[3]));
  }
} else {
  run();
}
