/* eslint-disable strict, no-var */
/* global process, module */

'use strict';

var getSvnArguments = function() {
  var noArgs = ['no-auth-cache', 'non-interactive', 'trust-server-cert', 'auto-props', 'dry-run',
    'force', 'force-log', 'ignore-ancestry', 'ignore-externals', 'incremental', 'keep-changelists',
    'keep-local', 'no-auto-props', 'no-ignore', 'no-unlock', 'notice-ancestry', 'parents', 'quiet',
    'record-only', 'recursive', 'reintegrate'];

  var env = process.env;
  var regex = /^(npm_config|npm_package_config)_npm_svn_([\w,_]+)$/i;
  var props = {};

  // Gather up our properties - npm_config will come before npm_package_config and that is how we
  // want any overrides to work.
  Object
    .keys(env)
    .sort()
    .forEach(function(key) {
        var match = key.match(regex);

        if (match) {
          var name = match[2].replace(/_/g, '-');
          props[name] = noArgs.indexOf(name) !== -1 ? true : env[match[0]];
        }
      }
    );

  return props;
};

module.exports = getSvnArguments;