module.exports = {
  name: "resolveNs",
  ns: "dns",
  title: "Resolve NS",
  description: "dns resolveNs",
  phrases: {
    active: "Resolving nameserver record for {{input.domain}}"
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
  fn: function resolveNs(input, $, output, state, done, cb, on, dns) {
    var r = function() {
      dns.resolveNs($.domain, function resolveNsCallback(results) {
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