import transform from "./transformer";

export default function(babel) {
  return {
    visitor: {
      Literal({ node }) {
        if (node.regex) {
          return transform(node.regex.pattern, node.regex.flags).toString();
        }
      }
    }
  }
}
