module.exports = {
  name: "reverse",
  ns: "dns",
  title: "Reverse",
  description: "dns reverse",
  phrases: {
    active: "Performing reverse lookup for {{input.ip}}"
  },
  ports: {
    input: {
      ip: {
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
  fn: function reverse(input, $, output, state, done, cb, on, dns) {
    var r = function() {
      dns.reverse($.ip, function reverseCallback(results) {
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