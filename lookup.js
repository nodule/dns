module.exports = {
  name: "lookup",
  ns: "dns",
  title: "Lookup",
  description: "Resolves a domain (e.g. 'google.com') into the first found A (IPv4) or AAAA (IPv6) record.",
  phrases: {
    active: "Looking up domain name {{input.domain}}"
  },
  ports: {
    input: {
      domain: {
        type: "string",
        format: "host",
        title: "Domain",
        description: "e.g. 'google.com'"
      },
      family: {
        "enum": [4,
          6
        ],
        title: "Family",
        description: "The family can be the integer 4 or 6. Defaults to null that indicates both Ip v4 and v6 address family.",
        "default": null,
        required: false
      }
    },
    output: {
      error: {
        title: "error",
        type: "object"
      },
      address: {
        type: "string",
        format: ["ipv4",
          "ipv6"
        ],
        title: "Address",
        description: "The address is a string representation of a IP v4 or v6 address"
      },
      family: {
        "enum": [4,
          6
        ],
        title: "Family",
        description: "Denotes the family of the address"
      }
    }
  },
  dependencies: {
    npm: {
      dns: require('dns')
    }
  },
  fn: function lookup(input, $, output, state, done, cb, on, dns) {
    var r = function() {
      dns.lookup($.domain, $.family, function lookupCallback(error, address, family) {
        cb({
          error: error,
          address: address,
          family: family
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