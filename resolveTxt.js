module.exports = {
  name: "resolveTxt",
  ns: "dns",
  title: "Resolve TXT",
  description: "dns resolveTxt",
  phrases: {
    active: "Resolving Text record for {{input.domain}}"
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
  fn: function resolveTxt(input, output, state, done, cb, on, dns) {
    var r = function() {
      dns.resolveTxt(input.domain, function resolveTxtCallback(results) {
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