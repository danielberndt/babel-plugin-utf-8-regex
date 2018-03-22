
> You probably want to use the official babel-plugin here:
> https://github.com/babel/babel/tree/master/packages/babel-plugin-proposal-unicode-property-regex


# babel-plugin-utf-8-regex

Transforms a regular expression like `/^\p{Cyrillic}+$/` to `/^[Ѐ-҄҇-ԧᴫᵸⷠ-ⷿꙀ-ꚗꚟ]+$/`.

This Plugin was inspired by the unicode addon of [xregexp](http://xregexp.com/). The list of possible types are explained [here](http://www.regular-expressions.info/unicode.html) or can be found [in the code](/src/transformer.js). The most useful probably is `\p{L}` or its alias `\p{Letter}` which indicates any letter in any alphabet.

It also works with negations: either `\P{L}` or `\p{^L}`.

## shortcomings

* This plugin currently supports only a limited set of regular expressions. It basically transforms `\p{TYPE}` into `[TYPE-RANGES]`. This means that regular expressions like `/[\p{Arabic}\p{Greek}]/` or `/[^0-9\p{White_Space}]/` won't be correctly translated.

So either commit a pull request or use something like `/(\p{Arabic}|\p{Greek})/` for now.

## installation

```
npm install babel-plugin-utf-8-regex
```

## usage

Node API:

```
require("babel").transform("code", {
  plugins: ["babel-plugin-utf-8-regex"]
});
```

CLI:

```
babel --plugins babel-plugin-utf-8-regex script.js
```

babelrc:
```
{
  "plugins": ["babel-plugin-utf-8-regex"]
}
```

## contributing

Contributions are more than welcome!

Clone this repo, hack around, add your tests and hit `npm test`.


### Ideas for improvements

* fix the shortcomings
* add a module to the transformed code containing all used types to not bloat the code. I.e. the regex `/\p{L}-\p{L}/` would be translated to something like `var regexTypes = require("regexTypes"); [..] new RegExp(regexTypes.L+"-"+regexTypes.L)`
