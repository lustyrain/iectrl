// Generated by CoffeeScript 1.6.3
var colors, fs, pkg, program, s, subcommands, _i, _len;

fs = require('fs');

program = require('commander');

colors = require('colors');

pkg = require('../package.json');

subcommands = ['clean', 'close', 'install', 'nuke', 'list', 'open', 'rearm', 'reinstall', 'restart', 'screenshot', 'shrink', 'start', 'status', 'stop', 'uninstall', 'uploaded'];

program.Command.prototype._commandHelp = program.Command.prototype.commandHelp;

program.Command.prototype.commandHelp = function() {
  var cmd, _i, _len, _ref;
  _ref = this.commands;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    cmd = _ref[_i];
    cmd._name = cmd._name.green;
    cmd._description = cmd._description.blue;
  }
  return this._commandHelp();
};

program.version(pkg.version);

for (_i = 0, _len = subcommands.length; _i < _len; _i++) {
  s = subcommands[_i];
  require("./commands/" + s)(program);
}

program._parse = program.parse;

program.parse = function() {
  program._parse.apply(program, arguments);
  if (program.rawArgs.length < 3) {
    return program.help();
  }
};

module.exports = program;

module.exports.IEVM = require('./ievm');