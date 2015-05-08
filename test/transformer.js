/*eslint-env mocha */

import expect from "expect.js";
import transformer from "../src/transformer";

const matches = (regex, string) => expect(string).to.match(transformer(regex.source));

describe("transformer", function() {
  it("should match hi", function() {
    matches(/^\p{L}+$/, "hi");
  });

  it("should match utf-8 word with \\p{L}", function() {
    matches(/^\p{L}+$/, "häßlich");
  });

  it("should match utf-8 word with alias \\p{Letter}", function() {
    matches(/^\p{Letter}+$/, "häßlich");
  });

  it("should not match non-words with \\p{^L}", function() {
    matches(/\p{^L}/, " ");
    matches(/\p{^L}/, "»");
    matches(/\p{^L}/, "💩");
  });

  it("should not match non-words with \\P{L}", function() {
    matches(/\p{^L}/, " ");
    matches(/\p{^L}/, "»");
    matches(/\p{^L}/, "💩");
  });

  it("shoud work with multiple appearances", function() {
    matches(/^\p{L}-\p{L}$/, "ä-ß");
  });

  it("should work with Scripts", function() {
    matches(/\p{Arabic}/, "حالة البثمسجل. برنامج النشرة الجوية.");
  });

  it("should work with Properties", function() {
    matches(/\p{White_Space}/, " \t\n");
  });

  it("should throw for unknown code points", function() {
    expect(() => {transformer(/\p{Foo}/.source); }).to.throwException();
  });

  it("should throw for double negative", function() {
    expect(() => {transformer(/\P{^L}/.source); }).to.throwException();
  });
});
