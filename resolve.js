module.exports = {
  name: "resolve",
  ns: "dns",
  title: "Resolve",
  description: "Resolves a domain (e.g. 'google.com') into an array of the record types specified by rrtype.",
  phrases: {
    active: "Resolving {{input.rrtype} for {{input.domain}}"
  },
  ports: {
    input: {
      domain: {
        type: "string",
        format: "host",
        title: "Domain"
      },
      rrtype: {
        "enum": ["A",
          "AAAA",
          "CNAME",
          "MX",
          "NS",
          "PTR",
          "SRV",
          "TXT"
        ],
        title: "Resource Record Type",
        description: "DNS record types stored in the zone files of the Domain Name System (DNS)"
      }
    },
    output: {
      error: {
        type: "object"
      }
    }
  },
  dependencies: {
    npm: {
      dns: require('dns')
    }
  },
  fn: function resolve(input, $, output, state, done, cb, on, dns) {
    var r = function() {
      dns.resolve($.domain, $.rrtype, function resolveCallback(error) {
        cb({
          error: error
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