// Generated by CoffeeScript 1.6.3
var cli;

cli = require('../cli');

module.exports = function(program) {
  return program.command('shrink [names]').description('shrink disk usage for virtual machines').option('-f, --force', 'force if archive not present (must be redownloaded)').action(function(names, command) {
    return cli.fail(cli.find(names, 'ovaed').maybeWhere(!command.force, 'archived').found().groupReused(function(xps, win7s, rest) {
      return xps.then(function(xps) {
        return win7s.then(function(win7s) {
          return rest.then(function(rest) {
            if (xps.length > 0) {
              rest.push(xps[0]);
            }
            if (win7s.length > 0) {
              rest.push(win7s[0]);
            }
            return cli.dsl(rest).all(function(vm) {
              return vm.unova();
            });
          });
        });
      });
    }));
  });
};
