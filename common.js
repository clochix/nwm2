/*global exports: true */
// Debug Log {{
var log = {
  levels: ['error', 'warn', 'info', 'debug'],
  level:  'info',
};
log.levels.forEach(function (level) {
  "use strict";
  var colors = {
    error: 31,
    warn: 33,
    info: 32,
    debug: 34
  };
  log[level] = function mylog() {
    if (log.levels.indexOf(level) <= log.levels.indexOf(log.level)) {
      var args = [].splice.call(arguments, 0),
          d    = new Date(),
          levc = "[" + level + "]         ";
      levc = "\u001b[" + colors[level] + "m" + levc.substr(0, 8) + "\u001b[0m";
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      args[0] = "[%s] %s " + args[0];
      args.splice(1, 0, d.toISOString(), levc);
      console.log.apply(console, args);
    }
  };
});
// }}

/**
 * Add padding
 *
 * @param {String}
 * @param {Integer}
 * @param {Boolean} [r] true for right padding
 *
 * @return {String}
 */
function pad(str, l, r) {
  "use strict";
  var strClean,
      tmp = new Array(l).join('0');
  str = '' + str;
  strClean = str.replace(/\u001b\[[^m]+m/g, '');

  return r ? tmp.substr(0, l - strClean.length) + str.substr(0, l + str.length - strClean.length) : str.substr(0, l + str.length - strClean.length) + tmp.substr(0, l - strClean.length);
}

exports.log = log;
exports.pad = pad;
