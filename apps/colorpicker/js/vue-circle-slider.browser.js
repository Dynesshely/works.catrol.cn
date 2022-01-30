!(function (root, factory) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = factory())
    : "function" == typeof define && define.amd
    ? define([], factory)
    : "object" == typeof exports
    ? (exports.VueCircleSlider = factory())
    : (root.VueCircleSlider = factory());
})(this, function () {
  return (function (modules) {
    function __webpack_require__(moduleId) {
      if (installedModules[moduleId]) return installedModules[moduleId].exports;
      var module = (installedModules[moduleId] = {
        i: moduleId,
        l: !1,
        exports: {},
      });
      return (
        modules[moduleId].call(
          module.exports,
          module,
          module.exports,
          __webpack_require__
        ),
        (module.l = !0),
        module.exports
      );
    }
    var installedModules = {};
    return (
      (__webpack_require__.m = modules),
      (__webpack_require__.c = installedModules),
      (__webpack_require__.i = function (value) {
        return value;
      }),
      (__webpack_require__.d = function (exports, name, getter) {
        __webpack_require__.o(exports, name) ||
          Object.defineProperty(exports, name, {
            configurable: !1,
            enumerable: !0,
            get: getter,
          });
      }),
      (__webpack_require__.n = function (module) {
        var getter =
          module && module.__esModule
            ? function () {
                return module.default;
              }
            : function () {
                return module;
              };
        return __webpack_require__.d(getter, "a", getter), getter;
      }),
      (__webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      }),
      (__webpack_require__.p = ""),
      __webpack_require__((__webpack_require__.s = 2))
    );
  })([
    function (module, exports) {
      var g,
        _typeof =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (obj) {
                return typeof obj;
              }
            : function (obj) {
                return obj &&
                  "function" == typeof Symbol &&
                  obj.constructor === Symbol &&
                  obj !== Symbol.prototype
                  ? "symbol"
                  : typeof obj;
              };
      g = (function () {
        return this;
      })();
      try {
        g = g || Function("return this")() || (0, eval)("this");
      } catch (e) {
        "object" ===
          ("undefined" == typeof window ? "undefined" : _typeof(window)) &&
          (g = window);
      }
      module.exports = g;
    },
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(6)(
        __webpack_require__(5),
        __webpack_require__(7),
        null,
        null
      );
      module.exports = Component.exports;
    },
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      Object.defineProperty(__webpack_exports__, "__esModule", { value: !0 }),
        function (global) {
          function install(Vue) {
            Vue.component(
              "circle-slider",
              __WEBPACK_IMPORTED_MODULE_0__components_CircleSlider_vue___default.a
            );
          }
          __webpack_exports__.install = install;
          var __WEBPACK_IMPORTED_MODULE_0__components_CircleSlider_vue__ =
              __webpack_require__(1),
            __WEBPACK_IMPORTED_MODULE_0__components_CircleSlider_vue___default =
              __webpack_require__.n(
                __WEBPACK_IMPORTED_MODULE_0__components_CircleSlider_vue__
              );
          __webpack_require__.d(
            __webpack_exports__,
            "CircleSlider",
            function () {
              return __WEBPACK_IMPORTED_MODULE_0__components_CircleSlider_vue___default.a;
            }
          );
          var plugin = { version: "1.0.2", install: install };
          __webpack_exports__.default = plugin;
          var GlobalVue = null;
          "undefined" != typeof window
            ? (GlobalVue = window.Vue)
            : void 0 !== global && (GlobalVue = global.Vue),
            GlobalVue && GlobalVue.use(plugin);
        }.call(__webpack_exports__, __webpack_require__(0));
    },
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
          throw new TypeError("Cannot call a class as a function");
      }
      var _createClass = (function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              (descriptor.enumerable = descriptor.enumerable || !1),
                (descriptor.configurable = !0),
                "value" in descriptor && (descriptor.writable = !0),
                Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          return function (Constructor, protoProps, staticProps) {
            return (
              protoProps && defineProperties(Constructor.prototype, protoProps),
              staticProps && defineProperties(Constructor, staticProps),
              Constructor
            );
          };
        })(),
        CircleSliderState = (function () {
          function CircleSliderState(steps, offset, initialValue) {
            _classCallCheck(this, CircleSliderState),
              (this.steps = steps),
              (this.offset = offset),
              (this.currentStepIndex = 0);
            for (var stepIndex in this.steps)
              if (this.steps[stepIndex] === initialValue) {
                this.currentStepIndex = stepIndex;
                break;
              }
            (this.firstStep = this.steps[0]),
              (this.length = this.steps.length - 1),
              (this.lastStep = this.steps[this.length]);
          }
          return (
            _createClass(CircleSliderState, [
              {
                key: "updateCurrentStepFromValue",
                value: function (value) {
                  for (var i = 0; i < this.length; i++)
                    if (value <= this.steps[i])
                      return void (this.currentStepIndex = i);
                  this.currentStepIndex = this.length;
                },
              },
              {
                key: "updateCurrentStepFromAngle",
                value: function (angle) {
                  var stepIndex = Math.round(
                    (angle - this.offset) / this.angleUnit
                  );
                  this.currentStepIndex = Math.min(
                    Math.max(stepIndex, 0),
                    this.length
                  );
                },
              },
              {
                key: "angleUnit",
                get: function () {
                  return (2 * Math.PI - this.offset) / this.length;
                },
              },
              {
                key: "angleValue",
                get: function () {
                  return (
                    Math.min(
                      this.offset + this.angleUnit * this.currentStepIndex,
                      2 * Math.PI - Number.EPSILON
                    ) - 1e-5
                  );
                },
              },
              {
                key: "currentStep",
                get: function () {
                  return this.steps[this.currentStepIndex];
                },
              },
            ]),
            CircleSliderState
          );
        })();
      __webpack_exports__.a = CircleSliderState;
    },
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor))
          throw new TypeError("Cannot call a class as a function");
      }
      var _createClass = (function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              (descriptor.enumerable = descriptor.enumerable || !1),
                (descriptor.configurable = !0),
                "value" in descriptor && (descriptor.writable = !0),
                Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          return function (Constructor, protoProps, staticProps) {
            return (
              protoProps && defineProperties(Constructor.prototype, protoProps),
              staticProps && defineProperties(Constructor, staticProps),
              Constructor
            );
          };
        })(),
        TouchPosition = (function () {
          function TouchPosition(
            containerElement,
            sliderRadius,
            sliderTolerance
          ) {
            _classCallCheck(this, TouchPosition),
              (this.containerElement = containerElement),
              (this.sliderRadius = sliderRadius),
              (this.sliderTolerance = sliderTolerance),
              this.setNewPosition({ x: 0, y: 0 });
          }
          return (
            _createClass(TouchPosition, [
              {
                key: "setNewPosition",
                value: function (e) {
                  var dimensions =
                      this.containerElement.getBoundingClientRect(),
                    side = dimensions.width;
                  (this.center = side / 2),
                    (this.relativeX = e.clientX - dimensions.left),
                    (this.relativeY = e.clientY - dimensions.top);
                },
              },
              {
                key: "sliderAngle",
                get: function () {
                  return (
                    (Math.atan2(
                      this.relativeY - this.center,
                      this.relativeX - this.center
                    ) +
                      (3 * Math.PI) / 2) %
                    (2 * Math.PI)
                  );
                },
              },
              {
                key: "isTouchWithinSliderRange",
                get: function () {
                  var touchOffset = Math.sqrt(
                    Math.pow(Math.abs(this.relativeX - this.center), 2) +
                      Math.pow(Math.abs(this.relativeY - this.center), 2)
                  );
                  return (
                    Math.abs(touchOffset - this.sliderRadius) <=
                    this.sliderTolerance
                  );
                },
              },
            ]),
            TouchPosition
          );
        })();
      __webpack_exports__.a = TouchPosition;
    },
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      Object.defineProperty(__webpack_exports__, "__esModule", { value: !0 });
      var __WEBPACK_IMPORTED_MODULE_0__modules_touch_position_js__ =
          __webpack_require__(4),
        __WEBPACK_IMPORTED_MODULE_1__modules_circle_slider_state_js__ =
          __webpack_require__(3);
      __webpack_exports__.default = {
        name: "CircleSlider",
        created: function () {
          var _this = this;
          (this.stepsCount = 1 + (this.max - this.min) / this.stepSize),
            (this.steps = Array.from(
              { length: this.stepsCount },
              function (_, i) {
                return _this.min + i * _this.stepSize;
              }
            )),
            (this.circleSliderState =
              new __WEBPACK_IMPORTED_MODULE_1__modules_circle_slider_state_js__.a(
                this.steps,
                this.startAngleOffset,
                this.value
              )),
            (this.angle = this.circleSliderState.angleValue),
            (this.currentStepValue = this.circleSliderState.currentStep);
          var maxCurveWidth = Math.max(
            this.cpMainCircleStrokeWidth,
            this.cpPathStrokeWidth
          );
          (this.radius =
            this.side / 2 - Math.max(maxCurveWidth, 2 * this.cpKnobRadius) / 2),
            this.updateFromPropValue(this.value);
        },
        mounted: function () {
          this.touchPosition =
            new __WEBPACK_IMPORTED_MODULE_0__modules_touch_position_js__.a(
              this.$refs._svg,
              this.radius,
              this.radius / 2
            );
        },
        props: {
          startAngleOffset: {
            type: Number,
            required: !1,
            default: function () {
              return 0;
            },
          },
          value: { type: Number, required: !1, default: 0 },
          side: { type: Number, required: !1, default: 100 },
          stepSize: { type: Number, required: !1, default: 1 },
          min: { type: Number, required: !1, default: 0 },
          max: { type: Number, required: !1, default: 100 },
          circleColor: { type: String, required: !1, default: "#334860" },
          progressColor: { type: String, required: !1, default: "#00be7e" },
          knobColor: { type: String, required: !1, default: "#00be7e" },
          knobRadius: { type: Number, required: !1, default: null },
          knobRadiusRel: { type: Number, required: !1, default: 7 },
          circleWidth: { type: Number, required: !1, default: null },
          circleWidthRel: { type: Number, required: !1, default: 20 },
          progressWidth: { type: Number, required: !1, default: null },
          progressWidthRel: { type: Number, required: !1, default: 10 },
        },
        data: function () {
          return {
            steps: null,
            stepsCount: null,
            radius: 0,
            angle: 0,
            currentStepValue: 0,
            mousePressed: !1,
            circleSliderState: null,
            mousemoveTicks: 0,
          };
        },
        computed: {
          cpCenter: function () {
            return this.side / 2;
          },
          cpAngle: function () {
            return this.angle + Math.PI / 2;
          },
          cpMainCircleStrokeWidth: function () {
            return this.circleWidth || this.side / 2 / this.circleWidthRel;
          },
          cpPathDirection: function () {
            return this.cpAngle < 1.5 * Math.PI ? 0 : 1;
          },
          cpPathX: function () {
            return this.cpCenter + this.radius * Math.cos(this.cpAngle);
          },
          cpPathY: function () {
            return this.cpCenter + this.radius * Math.sin(this.cpAngle);
          },
          cpPathStrokeWidth: function () {
            return this.progressWidth || this.side / 2 / this.progressWidthRel;
          },
          cpKnobRadius: function () {
            return this.knobRadius || this.side / 2 / this.knobRadiusRel;
          },
          cpPathD: function () {
            var parts = [];
            return (
              parts.push("M" + this.cpCenter),
              parts.push(this.cpCenter + this.radius),
              parts.push("A"),
              parts.push(this.radius),
              parts.push(this.radius),
              parts.push(0),
              parts.push(this.cpPathDirection),
              parts.push(1),
              parts.push(this.cpPathX),
              parts.push(this.cpPathY),
              parts.join(" ")
            );
          },
        },
        methods: {
          fitToStep: function (val) {
            return Math.round(val / this.stepSize) * this.stepSize;
          },
          handleClick: function (e) {
            if (
              (this.touchPosition.setNewPosition(e),
              this.touchPosition.isTouchWithinSliderRange)
            ) {
              var newAngle = this.touchPosition.sliderAngle;
              this.animateSlider(this.angle, newAngle);
            }
          },
          handleMouseDown: function (e) {
            e.preventDefault(),
              (this.mousePressed = !0),
              window.addEventListener("mousemove", this.handleWindowMouseMove),
              window.addEventListener("mouseup", this.handleMouseUp);
          },
          handleMouseUp: function (e) {
            e.preventDefault(),
              (this.mousePressed = !1),
              window.removeEventListener(
                "mousemove",
                this.handleWindowMouseMove
              ),
              window.removeEventListener("mouseup", this.handleMouseUp),
              (this.mousemoveTicks = 0);
          },
          handleWindowMouseMove: function (e) {
            if ((e.preventDefault(), this.mousemoveTicks < 5))
              return void this.mousemoveTicks++;
            this.touchPosition.setNewPosition(e), this.updateSlider();
          },
          handleTouchMove: function (e) {
            if (
              (this.$emit("touchmove"),
              e.targetTouches.length > 1 ||
                e.changedTouches.length > 1 ||
                e.touches.length > 1)
            )
              return !0;
            var lastTouch = e.targetTouches.item(e.targetTouches.length - 1);
            this.touchPosition.setNewPosition(lastTouch),
              this.touchPosition.isTouchWithinSliderRange &&
                (e.preventDefault(), this.updateSlider());
          },
          updateAngle: function (angle) {
            this.circleSliderState.updateCurrentStepFromAngle(angle),
              (this.angle = this.circleSliderState.angleValue),
              (this.currentStepValue = this.circleSliderState.currentStep),
              this.$emit("input", this.currentStepValue);
          },
          updateFromPropValue: function (value) {
            var stepValue = this.fitToStep(value);
            this.circleSliderState.updateCurrentStepFromValue(stepValue),
              (this.angle = this.circleSliderState.angleValue),
              (this.currentStepValue = stepValue),
              this.$emit("input", this.currentStepValue);
          },
          updateSlider: function () {
            var angle = this.touchPosition.sliderAngle;
            Math.abs(angle - this.angle) < Math.PI && this.updateAngle(angle);
          },
          animateSlider: function (startAngle, endAngle) {
            var _this2 = this,
              direction = startAngle < endAngle ? 1 : -1,
              curveAngleMovementUnit =
                direction * this.circleSliderState.angleUnit * 2,
              animate = function () {
                if (
                  Math.abs(endAngle - startAngle) <
                  Math.abs(2 * curveAngleMovementUnit)
                )
                  _this2.updateAngle(endAngle);
                else {
                  var newAngle = startAngle + curveAngleMovementUnit;
                  _this2.updateAngle(newAngle),
                    _this2.animateSlider(newAngle, endAngle);
                }
              };
            window.requestAnimationFrame(animate);
          },
        },
        watch: {
          value: function (val) {
            this.updateFromPropValue(val);
          },
        },
      };
    },
    function (module, exports) {
      module.exports = function (
        rawScriptExports,
        compiledTemplate,
        scopeId,
        cssModules
      ) {
        var esModule,
          scriptExports = (rawScriptExports = rawScriptExports || {}),
          type = typeof rawScriptExports.default;
        ("object" !== type && "function" !== type) ||
          ((esModule = rawScriptExports),
          (scriptExports = rawScriptExports.default));
        var options =
          "function" == typeof scriptExports
            ? scriptExports.options
            : scriptExports;
        if (
          (compiledTemplate &&
            ((options.render = compiledTemplate.render),
            (options.staticRenderFns = compiledTemplate.staticRenderFns)),
          scopeId && (options._scopeId = scopeId),
          cssModules)
        ) {
          var computed = options.computed || (options.computed = {});
          Object.keys(cssModules).forEach(function (key) {
            var module = cssModules[key];
            computed[key] = function () {
              return module;
            };
          });
        }
        return { esModule: esModule, exports: scriptExports, options: options };
      };
    },
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this,
            _h = _vm.$createElement,
            _c = _vm._self._c || _h;
          return _c("div", [
            _c(
              "svg",
              {
                ref: "_svg",
                attrs: {
                  width: _vm.side + "px",
                  height: _vm.side + "px",
                  viewBox: "0 0 " + _vm.side + " " + _vm.side,
                },
                on: {
                  touchmove: _vm.handleTouchMove,
                  click: _vm.handleClick,
                  mousedown: _vm.handleMouseDown,
                  mouseup: _vm.handleMouseUp,
                },
              },
              [
                _c("g", [
                  _c("circle", {
                    attrs: {
                      stroke: _vm.circleColor,
                      fill: "none",
                      "stroke-width": _vm.cpMainCircleStrokeWidth,
                      cx: _vm.cpCenter,
                      cy: _vm.cpCenter,
                      r: _vm.radius,
                    },
                  }),
                  _vm._v(" "),
                  _c("path", {
                    attrs: {
                      stroke: _vm.progressColor,
                      fill: "none",
                      "stroke-width": _vm.cpPathStrokeWidth,
                      d: _vm.cpPathD,
                    },
                  }),
                  _vm._v(" "),
                  _c("circle", {
                    attrs: {
                      fill: _vm.knobColor,
                      r: _vm.cpKnobRadius,
                      cx: _vm.cpPathX,
                      cy: _vm.cpPathY,
                    },
                  }),
                ]),
              ]
            ),
          ]);
        },
        staticRenderFns: [],
      };
    },
  ]);
});
