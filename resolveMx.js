module.exports = {
  name: "resolveMx",
  ns: "dns",
  title: "Resolve Mx",
  description: "dns resolveMx",
  phrases: {
    active: "Resolving Mail Exchanger Record for {{input.domain}}"
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
  fn: function resolveMx(input, $, output, state, done, cb, on, dns) {
    var r = function() {
      dns.resolveMx($.domain, function resolveMxCallback(results) {
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