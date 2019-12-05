// Generated by CoffeeScript 1.6.3
var Q, cli,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Q = require('q');

cli = require('../cli');

module.exports = function(program) {
  return program.command('install [names]').description('install virtual machines with ievms').option('-X, --no-reuse-xp', 'Do not reuse the XP VM for IE7 and IE8').option('-7, --no-reuse-7', 'Do not reuse the Win7 VM for IE10 and IE11').option('-s, --shrink', 'Shrink the virtual machines after installing').action(function(names, command) {
    return cli.fail(cli.find(names).found().then(function(vms) {
      var vm;
      if (names != null) {
        names = names.split('');
      }
      if (names == null) {
        names = [];
      }
      if (command.reuseXp) {
        if (__indexOf.call(names, 'IE7 - Vista') < 0) {
          vms = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = vms.length; _i < _len; _i++) {
              vm = vms[_i];
              if (vm.name !== 'IE7 - Vista') {
                _results.push(vm);
              }
            }
            return _results;
          })();
        }
        if (__indexOf.call(names, 'IE8 - Win7') < 0) {
          vms = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = vms.length; _i < _len; _i++) {
              vm = vms[_i];
              if (vm.name !== 'IE8 - Win7') {
                _results.push(vm);
              }
            }
            return _results;
          })();
        }
      } else {
        if (__indexOf.call(names, 'IE7 - WinXP') < 0) {
          vms = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = vms.length; _i < _len; _i++) {
              vm = vms[_i];
              if (vm.name !== 'IE7 - WinXP') {
                _results.push(vm);
              }
            }
            return _results;
          })();
        }
        if (__indexOf.call(names, 'IE8 - WinXP') < 0) {
          vms = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = vms.length; _i < _len; _i++) {
              vm = vms[_i];
              if (vm.name !== 'IE8 - WinXP') {
                _results.push(vm);
              }
            }
            return _results;
          })();
        }
      }
      if (command.reuse7) {
        if (__indexOf.call(names, 'IE10 - Win8') < 0) {
          vms = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = vms.length; _i < _len; _i++) {
              vm = vms[_i];
              if (vm.name !== 'IE10 - Win8') {
                _results.push(vm);
              }
            }
            return _results;
          })();
        }
      } else {
        if (__indexOf.call(names, 'IE10 - Win7') < 0) {
          vms = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = vms.length; _i < _len; _i++) {
              vm = vms[_i];
              if (vm.name !== 'IE10 - Win7') {
                _results.push(vm);
              }
            }
            return _results;
          })();
        }
        if (__indexOf.call(names, 'IE11 - Win7') < 0) {
          vms = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = vms.length; _i < _len; _i++) {
              vm = vms[_i];
              if (vm.name !== 'IE11 - Win7') {
                _results.push(vm);
              }
            }
            return _results;
          })();
        }
      }
      return cli.dsl(vms).found().groupReused(function(xps, win7s, rest) {
        var i;
        i = function(vm) {
          return vm.install();
        };
        return Q.all([xps.seq(i), win7s.seq(i), rest.all(i)]).then(function() {
          if (!command.shrink) {
            return null;
          }
          return xps.then(function(xps) {
            return win7s.then(function(win7s) {
              return rest.then(function(rest) {
                if (xps.length > 0) {
                  rest.push(xps[0]);
                }
                if (win7s.length > 0) {
                  rest.push(win7s[0]);
                }
                return cli.dsl(rest).where('ovaed').all(function(vm) {
                  return vm.unova();
                });
              });
            });
          });
        });
      });
    }));
  });
};