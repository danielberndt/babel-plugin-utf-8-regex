import transformer from "./transformer";

export default function(babel) {
  return new babel.Transformer("babel-utf8-regex-plugin", {
    Literal: function(node) {
      if (node.regex) {
        return transformer(node.regex.pattern, node.regex.flags).toString();
      }
    }
  });
}
