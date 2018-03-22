const transformer = require("./transformer");

module.exports = function() {
  return {
    visitor: {
      RegExpLiteral({node}) {
        node.pattern = transformer(node.pattern);
      },
    },
  };
};
