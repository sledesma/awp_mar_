(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : (global.NOMBRE_DE_MI_MODULO = factory());
})(this, function () {
  "use strict";
  /// Modulo UMD

  CODIGO_DE_MI_MODULO

  return MI_MODULO;
});