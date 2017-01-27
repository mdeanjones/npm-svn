/* eslint-disable strict, no-var */
/* global process, module */

'use strict';

const getSvnArguments = function() {
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
          props[match[2].replace(/_/g, '-')] = env[match[0]];
        }
      }
    );

  return props;
};

module.exports = getSvnArguments;