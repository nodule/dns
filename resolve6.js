module.exports = {
  name: "resolve6",
  ns: "dns",
  title: "Resolve6",
  description: "dns resolve6",
  phrases: {
    active: "Resolving {{input.domain}}"
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
  fn: function resolve6(input, $, output, state, done, cb, on, dns) {
    var r = function() {
      dns.resolve6($.domain, function resolve6Callback(results) {
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