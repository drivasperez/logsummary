const Environment = require("jest-environment-jsdom");
const { TextEncoder, TextDecoder } = require("util");

/**
 * A custom environment to enable global TextEncoder and TextDecoder.
 */
module.exports = class CustomTestEnvironment extends Environment {
  async setup() {
    await super.setup();
    if (typeof this.global.TextEncoder === "undefined") {
      this.global.TextEncoder = TextEncoder;
    }
    if (typeof this.global.TextDecoder === "undefined") {
      this.global.TextDecoder = TextDecoder;
    }
  }
};
