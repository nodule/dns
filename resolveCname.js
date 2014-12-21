module.exports = {
  name: "resolveCname",
  ns: "dns",
  title: "Resolve Cname",
  description: "dns resolveCname",
  phrases: {
    active: "Resolving Canonical Name Record for {{input.domain}}"
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
  fn: function resolveCname(input, output, state, done, cb, on, dns) {
    var r = function() {
      dns.resolveCname(input.domain, function resolveCnameCallback(results) {
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