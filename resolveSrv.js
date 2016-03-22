module.exports = {
  name: "resolveSrv",
  ns: "dns",
  title: "Resolve Srv",
  description: "dns resolveSrv",
  phrases: {
    active: "Resolving Service record for {{input.domain}}"
  },
  ports: {
    input: {
      domain: {
        type: "string"
      }
    },
    output: {
      results: {
        type: "object"
      }
    }
  },
  dependencies: {
    npm: {
      dns: require('dns')
    }
  },
  fn: function resolveSrv(input, $, output, state, done, cb, on, dns) {
    var r = function() {
      dns.resolveSrv($.domain, function resolveSrvCallback(results) {
        cb({
          results: results
        });
      });
    }.call(this);
    return {
      output: output,
      state: state,
      on: on,
      return: r
    };
  }
}