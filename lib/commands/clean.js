// Generated by CoffeeScript 1.6.3
var cli;

cli = require('../cli');

module.exports = function(program) {
  return program.command('clean [names]').description('restore virtual machines to the clean snapshot').action(function(names, command) {
    return cli.fail(cli.find(names, '!missing').found().all(function(vm) {
      return vm.clean();
    }));
  });
};