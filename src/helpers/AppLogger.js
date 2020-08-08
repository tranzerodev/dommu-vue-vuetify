export default {
  consoleLogging: process.env.VUE_APP_ENABLE_CONSOLE_LOGGING
    ? process.env.VUE_APP_ENABLE_CONSOLE_LOGGING === "true"
    : true,
  log() {
    if (this.consoleLogging) {
      const args = Array.prototype.slice.call(arguments);
      console.log.apply(console, args);
    }
  },
  warn() {
    if (this.consoleLogging) {
      const args = Array.prototype.slice.call(arguments);
      console.warn.apply(console, args);
    }
  },
  error() {
    if (this.consoleLogging) {
      const args = Array.prototype.slice.call(arguments);
      console.error.apply(console, args);
    }
  }
};
