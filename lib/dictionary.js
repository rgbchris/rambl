module.exports = { 
  // Numerical
  "digit": "\\d", // [0-9]
  "nonDigit": "\\D", // [^0-9]
  
  // Alphanumeric 
  "wordsAndUnderscores": "\\w",    // [a-zA-Z0-9_] (includes underscore)
  "words": "\\w",    // [a-zA-Z0-9_] (includes underscore)
  "alphanumeric": "\\w",    // [a-zA-Z0-9_] (includes underscore)
  "nonAlphanumeric": "\\W", // [^a-zA-Z0-9_] (includes underscore)

  // Hex
  "hexadecimal": "[\da-fA-F]", // hex digit

  // White Space
  "formFeed": "\\f",
  "lineFeed": "\\n",
  "carriageReturn": "\\r",
  "space": "\\s", // [\t\n\v\f\r]
  "tab": "\\t",
  "verticalTab": "\\v",

  "whitespace": "\\s",
  "whitespaces": "\\s",

  // Other
  "null": "\\0"
}
