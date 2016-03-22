module.exports = {
  name: "resolve4",
  ns: "dns",
  title: "Resolve4",
  description: "Resolves a domain (e.g. 'google.com') into an array of the record types specified by rrtype.",
  phrases: {
    active: "Resolving {{input.rrtype}}  for {{input.domain}}"
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
  fn: function resolve4(input, $, output, state, done, cb, on, dns) {
    var r = function() {
      dns.resolve4($.domain, function resolve4Callback(results) {
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