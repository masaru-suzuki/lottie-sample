/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/gsap/CSSPlugin.js":
/*!****************************************!*\
  !*** ./node_modules/gsap/CSSPlugin.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CSSPlugin: function() { return /* binding */ CSSPlugin; },
/* harmony export */   _createElement: function() { return /* binding */ _createElement; },
/* harmony export */   _getBBox: function() { return /* binding */ _getBBox; },
/* harmony export */   checkPrefix: function() { return /* binding */ _checkPropPrefix; },
/* harmony export */   "default": function() { return /* binding */ CSSPlugin; }
/* harmony export */ });
/* harmony import */ var _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gsap-core.js */ "./node_modules/gsap/gsap-core.js");
/*!
 * CSSPlugin 3.12.1
 * https://greensock.com
 *
 * Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */


var _win,
    _doc,
    _docElement,
    _pluginInitted,
    _tempDiv,
    _tempDivStyler,
    _recentSetterPlugin,
    _reverting,
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _transformProps = {},
    _RAD2DEG = 180 / Math.PI,
    _DEG2RAD = Math.PI / 180,
    _atan2 = Math.atan2,
    _bigNum = 1e8,
    _capsExp = /([A-Z])/g,
    _horizontalExp = /(left|right|width|margin|padding|x)/i,
    _complexExp = /[\s,\(]\S/,
    _propertyAliases = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
},
    _renderCSSProp = function _renderCSSProp(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
},
    _renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
  return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
},
    _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
  return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u : data.b, data);
},
    //if units change, we need a way to render the original unit/value when the tween goes all the way back to the beginning (ratio:0)
_renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
  var value = data.s + data.c * ratio;
  data.set(data.t, data.p, ~~(value + (value < 0 ? -.5 : .5)) + data.u, data);
},
    _renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
  return data.set(data.t, data.p, ratio ? data.e : data.b, data);
},
    _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
  return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
},
    _setterCSSStyle = function _setterCSSStyle(target, property, value) {
  return target.style[property] = value;
},
    _setterCSSProp = function _setterCSSProp(target, property, value) {
  return target.style.setProperty(property, value);
},
    _setterTransform = function _setterTransform(target, property, value) {
  return target._gsap[property] = value;
},
    _setterScale = function _setterScale(target, property, value) {
  return target._gsap.scaleX = target._gsap.scaleY = value;
},
    _setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache.scaleX = cache.scaleY = value;
  cache.renderTransform(ratio, cache);
},
    _setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache[property] = value;
  cache.renderTransform(ratio, cache);
},
    _transformProp = "transform",
    _transformOriginProp = _transformProp + "Origin",
    _saveStyle = function _saveStyle(property, isNotCSS) {
  var _this = this;

  var target = this.target,
      style = target.style;

  if (property in _transformProps && style) {
    this.tfm = this.tfm || {};

    if (property !== "transform") {
      property = _propertyAliases[property] || property;
      ~property.indexOf(",") ? property.split(",").forEach(function (a) {
        return _this.tfm[a] = _get(target, a);
      }) : this.tfm[property] = target._gsap.x ? target._gsap[property] : _get(target, property); // note: scale would map to "scaleX,scaleY", thus we loop and apply them both.
    } else {
      return _propertyAliases.transform.split(",").forEach(function (p) {
        return _saveStyle.call(_this, p, isNotCSS);
      });
    }

    if (this.props.indexOf(_transformProp) >= 0) {
      return;
    }

    if (target._gsap.svg) {
      this.svgo = target.getAttribute("data-svg-origin");
      this.props.push(_transformOriginProp, isNotCSS, "");
    }

    property = _transformProp;
  }

  (style || isNotCSS) && this.props.push(property, isNotCSS, style[property]);
},
    _removeIndependentTransforms = function _removeIndependentTransforms(style) {
  if (style.translate) {
    style.removeProperty("translate");
    style.removeProperty("scale");
    style.removeProperty("rotate");
  }
},
    _revertStyle = function _revertStyle() {
  var props = this.props,
      target = this.target,
      style = target.style,
      cache = target._gsap,
      i,
      p;

  for (i = 0; i < props.length; i += 3) {
    // stored like this: property, isNotCSS, value
    props[i + 1] ? target[props[i]] = props[i + 2] : props[i + 2] ? style[props[i]] = props[i + 2] : style.removeProperty(props[i].substr(0, 2) === "--" ? props[i] : props[i].replace(_capsExp, "-$1").toLowerCase());
  }

  if (this.tfm) {
    for (p in this.tfm) {
      cache[p] = this.tfm[p];
    }

    if (cache.svg) {
      cache.renderTransform();
      target.setAttribute("data-svg-origin", this.svgo || "");
    }

    i = _reverting();

    if ((!i || !i.isStart) && !style[_transformProp]) {
      _removeIndependentTransforms(style);

      cache.uncache = 1; // if it's a startAt that's being reverted in the _initTween() of the core, we don't need to uncache transforms. This is purely a performance optimization.
    }
  }
},
    _getStyleSaver = function _getStyleSaver(target, properties) {
  var saver = {
    target: target,
    props: [],
    revert: _revertStyle,
    save: _saveStyle
  };
  target._gsap || _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.gsap.core.getCache(target); // just make sure there's a _gsap cache defined because we read from it in _saveStyle() and it's more efficient to just check it here once.

  properties && properties.split(",").forEach(function (p) {
    return saver.save(p);
  });
  return saver;
},
    _supports3D,
    _createElement = function _createElement(type, ns) {
  var e = _doc.createElementNS ? _doc.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc.createElement(type); //some servers swap in https for http in the namespace which can break things, making "style" inaccessible.

  return e.style ? e : _doc.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
},
    _getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
  var cs = getComputedStyle(target);
  return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty(target, _checkPropPrefix(property) || property, 1) || ""; //css variables may not need caps swapped out for dashes and lowercase.
},
    _prefixes = "O,Moz,ms,Ms,Webkit".split(","),
    _checkPropPrefix = function _checkPropPrefix(property, element, preferPrefix) {
  var e = element || _tempDiv,
      s = e.style,
      i = 5;

  if (property in s && !preferPrefix) {
    return property;
  }

  property = property.charAt(0).toUpperCase() + property.substr(1);

  while (i-- && !(_prefixes[i] + property in s)) {}

  return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
},
    _initCore = function _initCore() {
  if (_windowExists() && window.document) {
    _win = window;
    _doc = _win.document;
    _docElement = _doc.documentElement;
    _tempDiv = _createElement("div") || {
      style: {}
    };
    _tempDivStyler = _createElement("div");
    _transformProp = _checkPropPrefix(_transformProp);
    _transformOriginProp = _transformProp + "Origin";
    _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"; //make sure to override certain properties that may contaminate measurements, in case the user has overreaching style sheets.

    _supports3D = !!_checkPropPrefix("perspective");
    _reverting = _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.gsap.core.reverting;
    _pluginInitted = 1;
  }
},
    _getBBoxHack = function _getBBoxHack(swapIfPossible) {
  //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
  var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
      oldParent = this.parentNode,
      oldSibling = this.nextSibling,
      oldCSS = this.style.cssText,
      bbox;

  _docElement.appendChild(svg);

  svg.appendChild(this);
  this.style.display = "block";

  if (swapIfPossible) {
    try {
      bbox = this.getBBox();
      this._gsapBBox = this.getBBox; //store the original

      this.getBBox = _getBBoxHack;
    } catch (e) {}
  } else if (this._gsapBBox) {
    bbox = this._gsapBBox();
  }

  if (oldParent) {
    if (oldSibling) {
      oldParent.insertBefore(this, oldSibling);
    } else {
      oldParent.appendChild(this);
    }
  }

  _docElement.removeChild(svg);

  this.style.cssText = oldCSS;
  return bbox;
},
    _getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
  var i = attributesArray.length;

  while (i--) {
    if (target.hasAttribute(attributesArray[i])) {
      return target.getAttribute(attributesArray[i]);
    }
  }
},
    _getBBox = function _getBBox(target) {
  var bounds;

  try {
    bounds = target.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
  } catch (error) {
    bounds = _getBBoxHack.call(target, true);
  }

  bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true)); //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.

  return bounds && !bounds.width && !bounds.x && !bounds.y ? {
    x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
    y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : bounds;
},
    _isSVG = function _isSVG(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
},
    //reports if the element is an SVG on which getBBox() actually works
_removeProperty = function _removeProperty(target, property) {
  if (property) {
    var style = target.style;

    if (property in _transformProps && property !== _transformOriginProp) {
      property = _transformProp;
    }

    if (style.removeProperty) {
      if (property.substr(0, 2) === "ms" || property.substr(0, 6) === "webkit") {
        //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
        property = "-" + property;
      }

      style.removeProperty(property.replace(_capsExp, "-$1").toLowerCase());
    } else {
      //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
      style.removeAttribute(property);
    }
  }
},
    _addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
  var pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
  plugin._pt = pt;
  pt.b = beginning;
  pt.e = end;

  plugin._props.push(property);

  return pt;
},
    _nonConvertibleUnits = {
  deg: 1,
  rad: 1,
  turn: 1
},
    _nonStandardLayouts = {
  grid: 1,
  flex: 1
},
    //takes a single value like 20px and converts it to the unit specified, like "%", returning only the numeric amount.
_convertToUnit = function _convertToUnit(target, property, value, unit) {
  var curValue = parseFloat(value) || 0,
      curUnit = (value + "").trim().substr((curValue + "").length) || "px",
      // some browsers leave extra whitespace at the beginning of CSS variables, hence the need to trim()
  style = _tempDiv.style,
      horizontal = _horizontalExp.test(property),
      isRootSVG = target.tagName.toLowerCase() === "svg",
      measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"),
      amount = 100,
      toPixels = unit === "px",
      toPercent = unit === "%",
      px,
      parent,
      cache,
      isSVG;

  if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
    return curValue;
  }

  curUnit !== "px" && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
  isSVG = target.getCTM && _isSVG(target);

  if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
    px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
    return (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(toPercent ? curValue / px * amount : curValue / 100 * px);
  }

  style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
  parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;

  if (isSVG) {
    parent = (target.ownerSVGElement || {}).parentNode;
  }

  if (!parent || parent === _doc || !parent.appendChild) {
    parent = _doc.body;
  }

  cache = parent._gsap;

  if (cache && toPercent && cache.width && horizontal && cache.time === _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._ticker.time && !cache.uncache) {
    return (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(curValue / cache.width * amount);
  } else {
    (toPercent || curUnit === "%") && !_nonStandardLayouts[_getComputedProperty(parent, "display")] && (style.position = _getComputedProperty(target, "position"));
    parent === target && (style.position = "static"); // like for borderRadius, if it's a % we must have it relative to the target itself but that may not have position: relative or position: absolute in which case it'd go up the chain until it finds its offsetParent (bad). position: static protects against that.

    parent.appendChild(_tempDiv);
    px = _tempDiv[measureProperty];
    parent.removeChild(_tempDiv);
    style.position = "absolute";

    if (horizontal && toPercent) {
      cache = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._getCache)(parent);
      cache.time = _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._ticker.time;
      cache.width = parent[measureProperty];
    }
  }

  return (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
},
    _get = function _get(target, property, unit, uncache) {
  var value;
  _pluginInitted || _initCore();

  if (property in _propertyAliases && property !== "transform") {
    property = _propertyAliases[property];

    if (~property.indexOf(",")) {
      property = property.split(",")[0];
    }
  }

  if (_transformProps[property] && property !== "transform") {
    value = _parseTransform(target, uncache);
    value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
  } else {
    value = target.style[property];

    if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
      value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._getProperty)(target, property) || (property === "opacity" ? 1 : 0); // note: some browsers, like Firefox, don't report borderRadius correctly! Instead, it only reports every corner like  borderTopLeftRadius
    }
  }

  return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
},
    _tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
  // note: we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
  if (!start || start === "none") {
    // some browsers like Safari actually PREFER the prefixed property and mis-report the unprefixed value like clipPath (BUG). In other words, even though clipPath exists in the style ("clipPath" in target.style) and it's set in the CSS properly (along with -webkit-clip-path), Safari reports clipPath as "none" whereas WebkitClipPath reports accurately like "ellipse(100% 0% at 50% 0%)", so in this case we must SWITCH to using the prefixed property instead. See https://greensock.com/forums/topic/18310-clippath-doesnt-work-on-ios/
    var p = _checkPropPrefix(prop, target, 1),
        s = p && _getComputedProperty(target, p, 1);

    if (s && s !== start) {
      prop = p;
      start = s;
    } else if (prop === "borderColor") {
      start = _getComputedProperty(target, "borderTopColor"); // Firefox bug: always reports "borderColor" as "", so we must fall back to borderTopColor. See https://greensock.com/forums/topic/24583-how-to-return-colors-that-i-had-after-reverse/
    }
  }

  var pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.PropTween(this._pt, target.style, prop, 0, 1, _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._renderComplexString),
      index = 0,
      matchIndex = 0,
      a,
      result,
      startValues,
      startNum,
      color,
      startValue,
      endValue,
      endNum,
      chunk,
      endUnit,
      startUnit,
      endValues;
  pt.b = start;
  pt.e = end;
  start += ""; // ensure values are strings

  end += "";

  if (end === "auto") {
    target.style[prop] = end;
    end = _getComputedProperty(target, prop) || end;
    target.style[prop] = start;
  }

  a = [start, end];

  (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._colorStringFilter)(a); // pass an array with the starting and ending values and let the filter do whatever it needs to the values. If colors are found, it returns true and then we must match where the color shows up order-wise because for things like boxShadow, sometimes the browser provides the computed values with the color FIRST, but the user provides it with the color LAST, so flip them if necessary. Same for drop-shadow().


  start = a[0];
  end = a[1];
  startValues = start.match(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._numWithUnitExp) || [];
  endValues = end.match(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._numWithUnitExp) || [];

  if (endValues.length) {
    while (result = _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._numWithUnitExp.exec(end)) {
      endValue = result[0];
      chunk = end.substring(index, result.index);

      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
        color = 1;
      }

      if (endValue !== (startValue = startValues[matchIndex++] || "")) {
        startNum = parseFloat(startValue) || 0;
        startUnit = startValue.substr((startNum + "").length);
        endValue.charAt(1) === "=" && (endValue = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._parseRelative)(startNum, endValue) + startUnit);
        endNum = parseFloat(endValue);
        endUnit = endValue.substr((endNum + "").length);
        index = _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._numWithUnitExp.lastIndex - endUnit.length;

        if (!endUnit) {
          //if something like "perspective:300" is passed in and we must add a unit to the end
          endUnit = endUnit || _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._config.units[prop] || startUnit;

          if (index === end.length) {
            end += endUnit;
            pt.e += endUnit;
          }
        }

        if (startUnit !== endUnit) {
          startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
        } // these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.


        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
          s: startNum,
          c: endNum - startNum,
          m: color && color < 4 || prop === "zIndex" ? Math.round : 0
        };
      }
    }

    pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)
  } else {
    pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
  }

  _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._relExp.test(end) && (pt.e = 0); //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).

  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within another plugin too, thus "this" would refer to the plugin.

  return pt;
},
    _keywordToPercent = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
},
    _convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
  var split = value.split(" "),
      x = split[0],
      y = split[1] || "50%";

  if (x === "top" || x === "bottom" || y === "left" || y === "right") {
    //the user provided them in the wrong order, so flip them
    value = x;
    x = y;
    y = value;
  }

  split[0] = _keywordToPercent[x] || x;
  split[1] = _keywordToPercent[y] || y;
  return split.join(" ");
},
    _renderClearProps = function _renderClearProps(ratio, data) {
  if (data.tween && data.tween._time === data.tween._dur) {
    var target = data.t,
        style = target.style,
        props = data.u,
        cache = target._gsap,
        prop,
        clearTransforms,
        i;

    if (props === "all" || props === true) {
      style.cssText = "";
      clearTransforms = 1;
    } else {
      props = props.split(",");
      i = props.length;

      while (--i > -1) {
        prop = props[i];

        if (_transformProps[prop]) {
          clearTransforms = 1;
          prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
        }

        _removeProperty(target, prop);
      }
    }

    if (clearTransforms) {
      _removeProperty(target, _transformProp);

      if (cache) {
        cache.svg && target.removeAttribute("transform");

        _parseTransform(target, 1); // force all the cached values back to "normal"/identity, otherwise if there's another tween that's already set to render transforms on this element, it could display the wrong values.


        cache.uncache = 1;

        _removeIndependentTransforms(style);
      }
    }
  }
},
    // note: specialProps should return 1 if (and only if) they have a non-zero priority. It indicates we need to sort the linked list.
_specialProps = {
  clearProps: function clearProps(plugin, target, property, endValue, tween) {
    if (tween.data !== "isFromStart") {
      var pt = plugin._pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
      pt.u = endValue;
      pt.pr = -10;
      pt.tween = tween;

      plugin._props.push(property);

      return 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://greensock.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */

},

/*
 * --------------------------------------------------------------------------------------
 * TRANSFORMS
 * --------------------------------------------------------------------------------------
 */
_identity2DMatrix = [1, 0, 0, 1, 0, 0],
    _rotationalProperties = {},
    _isNullTransform = function _isNullTransform(value) {
  return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
},
    _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
  var matrixString = _getComputedProperty(target, _transformProp);

  return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._numExp).map(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round);
},
    _getMatrix = function _getMatrix(target, force2D) {
  var cache = target._gsap || (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._getCache)(target),
      style = target.style,
      matrix = _getComputedTransformMatrixAsArray(target),
      parent,
      nextSibling,
      temp,
      addedToDOM;

  if (cache.svg && target.getAttribute("transform")) {
    temp = target.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.

    matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
    return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
  } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
    //note: if offsetParent is null, that means the element isn't in the normal document flow, like if it has display:none or one of its ancestors has display:none). Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
    //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
    temp = style.display;
    style.display = "block";
    parent = target.parentNode;

    if (!parent || !target.offsetParent) {
      // note: in 3.3.0 we switched target.offsetParent to _doc.body.contains(target) to avoid [sometimes unnecessary] MutationObserver calls but that wasn't adequate because there are edge cases where nested position: fixed elements need to get reparented to accurately sense transforms. See https://github.com/greensock/GSAP/issues/388 and https://github.com/greensock/GSAP/issues/375
      addedToDOM = 1; //flag

      nextSibling = target.nextElementSibling;

      _docElement.appendChild(target); //we must add it to the DOM in order to get values properly

    }

    matrix = _getComputedTransformMatrixAsArray(target);
    temp ? style.display = temp : _removeProperty(target, "display");

    if (addedToDOM) {
      nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
    }
  }

  return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
},
    _applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
  var cache = target._gsap,
      matrix = matrixArray || _getMatrix(target, true),
      xOriginOld = cache.xOrigin || 0,
      yOriginOld = cache.yOrigin || 0,
      xOffsetOld = cache.xOffset || 0,
      yOffsetOld = cache.yOffset || 0,
      a = matrix[0],
      b = matrix[1],
      c = matrix[2],
      d = matrix[3],
      tx = matrix[4],
      ty = matrix[5],
      originSplit = origin.split(" "),
      xOrigin = parseFloat(originSplit[0]) || 0,
      yOrigin = parseFloat(originSplit[1]) || 0,
      bounds,
      determinant,
      x,
      y;

  if (!originIsAbsolute) {
    bounds = _getBBox(target);
    xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
    yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
  } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
    //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
    x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
    y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
    xOrigin = x;
    yOrigin = y;
  }

  if (smooth || smooth !== false && cache.smooth) {
    tx = xOrigin - xOriginOld;
    ty = yOrigin - yOriginOld;
    cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
    cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
  } else {
    cache.xOffset = cache.yOffset = 0;
  }

  cache.xOrigin = xOrigin;
  cache.yOrigin = yOrigin;
  cache.smooth = !!smooth;
  cache.origin = origin;
  cache.originIsAbsolute = !!originIsAbsolute;
  target.style[_transformOriginProp] = "0px 0px"; //otherwise, if someone sets  an origin via CSS, it will likely interfere with the SVG transform attribute ones (because remember, we're baking the origin into the matrix() value).

  if (pluginToAddPropTweensTo) {
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
  }

  target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
},
    _parseTransform = function _parseTransform(target, uncache) {
  var cache = target._gsap || new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.GSCache(target);

  if ("x" in cache && !uncache && !cache.uncache) {
    return cache;
  }

  var style = target.style,
      invertedScaleX = cache.scaleX < 0,
      px = "px",
      deg = "deg",
      cs = getComputedStyle(target),
      origin = _getComputedProperty(target, _transformOriginProp) || "0",
      x,
      y,
      z,
      scaleX,
      scaleY,
      rotation,
      rotationX,
      rotationY,
      skewX,
      skewY,
      perspective,
      xOrigin,
      yOrigin,
      matrix,
      angle,
      cos,
      sin,
      a,
      b,
      c,
      d,
      a12,
      a22,
      t1,
      t2,
      t3,
      a13,
      a23,
      a33,
      a42,
      a43,
      a32;
  x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
  scaleX = scaleY = 1;
  cache.svg = !!(target.getCTM && _isSVG(target));

  if (cs.translate) {
    // accommodate independent transforms by combining them into normal ones.
    if (cs.translate !== "none" || cs.scale !== "none" || cs.rotate !== "none") {
      style[_transformProp] = (cs.translate !== "none" ? "translate3d(" + (cs.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (cs.rotate !== "none" ? "rotate(" + cs.rotate + ") " : "") + (cs.scale !== "none" ? "scale(" + cs.scale.split(" ").join(",") + ") " : "") + (cs[_transformProp] !== "none" ? cs[_transformProp] : "");
    }

    style.scale = style.rotate = style.translate = "none";
  }

  matrix = _getMatrix(target, cache.svg);

  if (cache.svg) {
    if (cache.uncache) {
      // if cache.uncache is true (and maybe if origin is 0,0), we need to set element.style.transformOrigin = (cache.xOrigin - bbox.x) + "px " + (cache.yOrigin - bbox.y) + "px". Previously we let the data-svg-origin stay instead, but when introducing revert(), it complicated things.
      t2 = target.getBBox();
      origin = cache.xOrigin - t2.x + "px " + (cache.yOrigin - t2.y) + "px";
      t1 = "";
    } else {
      t1 = !uncache && target.getAttribute("data-svg-origin"); //  Remember, to work around browser inconsistencies we always force SVG elements' transformOrigin to 0,0 and offset the translation accordingly.
    }

    _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
  }

  xOrigin = cache.xOrigin || 0;
  yOrigin = cache.yOrigin || 0;

  if (matrix !== _identity2DMatrix) {
    a = matrix[0]; //a11

    b = matrix[1]; //a21

    c = matrix[2]; //a31

    d = matrix[3]; //a41

    x = a12 = matrix[4];
    y = a22 = matrix[5]; //2D matrix

    if (matrix.length === 6) {
      scaleX = Math.sqrt(a * a + b * b);
      scaleY = Math.sqrt(d * d + c * c);
      rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).

      skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
      skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));

      if (cache.svg) {
        x -= xOrigin - (xOrigin * a + yOrigin * c);
        y -= yOrigin - (xOrigin * b + yOrigin * d);
      } //3D matrix

    } else {
      a32 = matrix[6];
      a42 = matrix[7];
      a13 = matrix[8];
      a23 = matrix[9];
      a33 = matrix[10];
      a43 = matrix[11];
      x = matrix[12];
      y = matrix[13];
      z = matrix[14];
      angle = _atan2(a32, a33);
      rotationX = angle * _RAD2DEG; //rotationX

      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a12 * cos + a13 * sin;
        t2 = a22 * cos + a23 * sin;
        t3 = a32 * cos + a33 * sin;
        a13 = a12 * -sin + a13 * cos;
        a23 = a22 * -sin + a23 * cos;
        a33 = a32 * -sin + a33 * cos;
        a43 = a42 * -sin + a43 * cos;
        a12 = t1;
        a22 = t2;
        a32 = t3;
      } //rotationY


      angle = _atan2(-c, a33);
      rotationY = angle * _RAD2DEG;

      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a * cos - a13 * sin;
        t2 = b * cos - a23 * sin;
        t3 = c * cos - a33 * sin;
        a43 = d * sin + a43 * cos;
        a = t1;
        b = t2;
        c = t3;
      } //rotationZ


      angle = _atan2(b, a);
      rotation = angle * _RAD2DEG;

      if (angle) {
        cos = Math.cos(angle);
        sin = Math.sin(angle);
        t1 = a * cos + b * sin;
        t2 = a12 * cos + a22 * sin;
        b = b * cos - a * sin;
        a22 = a22 * cos - a12 * sin;
        a = t1;
        a12 = t2;
      }

      if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
        //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
        rotationX = rotation = 0;
        rotationY = 180 - rotationY;
      }

      scaleX = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(Math.sqrt(a * a + b * b + c * c));
      scaleY = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(Math.sqrt(a22 * a22 + a32 * a32));
      angle = _atan2(a12, a22);
      skewX = Math.abs(angle) > 0.0002 ? angle * _RAD2DEG : 0;
      perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
    }

    if (cache.svg) {
      //sense if there are CSS transforms applied on an SVG element in which case we must overwrite them when rendering. The transform attribute is more reliable cross-browser, but we can't just remove the CSS ones because they may be applied in a CSS rule somewhere (not just inline).
      t1 = target.getAttribute("transform");
      cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
      t1 && target.setAttribute("transform", t1);
    }
  }

  if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
    if (invertedScaleX) {
      scaleX *= -1;
      skewX += rotation <= 0 ? 180 : -180;
      rotation += rotation <= 0 ? 180 : -180;
    } else {
      scaleY *= -1;
      skewX += skewX <= 0 ? 180 : -180;
    }
  }

  uncache = uncache || cache.uncache;
  cache.x = x - ((cache.xPercent = x && (!uncache && cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
  cache.y = y - ((cache.yPercent = y && (!uncache && cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
  cache.z = z + px;
  cache.scaleX = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(scaleX);
  cache.scaleY = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(scaleY);
  cache.rotation = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(rotation) + deg;
  cache.rotationX = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(rotationX) + deg;
  cache.rotationY = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(rotationY) + deg;
  cache.skewX = skewX + deg;
  cache.skewY = skewY + deg;
  cache.transformPerspective = perspective + px;

  if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0) {
    style[_transformOriginProp] = _firstTwoOnly(origin);
  }

  cache.xOffset = cache.yOffset = 0;
  cache.force3D = _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._config.force3D;
  cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
  cache.uncache = 0;
  return cache;
},
    _firstTwoOnly = function _firstTwoOnly(value) {
  return (value = value.split(" "))[0] + " " + value[1];
},
    //for handling transformOrigin values, stripping out the 3rd dimension
_addPxTranslate = function _addPxTranslate(target, start, value) {
  var unit = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.getUnit)(start);
  return (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
},
    _renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
  cache.z = "0px";
  cache.rotationY = cache.rotationX = "0deg";
  cache.force3D = 0;

  _renderCSSTransforms(ratio, cache);
},
    _zeroDeg = "0deg",
    _zeroPx = "0px",
    _endParenthesis = ") ",
    _renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
  var _ref = cache || this,
      xPercent = _ref.xPercent,
      yPercent = _ref.yPercent,
      x = _ref.x,
      y = _ref.y,
      z = _ref.z,
      rotation = _ref.rotation,
      rotationY = _ref.rotationY,
      rotationX = _ref.rotationX,
      skewX = _ref.skewX,
      skewY = _ref.skewY,
      scaleX = _ref.scaleX,
      scaleY = _ref.scaleY,
      transformPerspective = _ref.transformPerspective,
      force3D = _ref.force3D,
      target = _ref.target,
      zOrigin = _ref.zOrigin,
      transforms = "",
      use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true; // Safari has a bug that causes it not to render 3D transform-origin values properly, so we force the z origin to 0, record it in the cache, and then do the math here to offset the translate values accordingly (basically do the 3D transform-origin part manually)


  if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
    var angle = parseFloat(rotationY) * _DEG2RAD,
        a13 = Math.sin(angle),
        a33 = Math.cos(angle),
        cos;

    angle = parseFloat(rotationX) * _DEG2RAD;
    cos = Math.cos(angle);
    x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
    y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
    z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
  }

  if (transformPerspective !== _zeroPx) {
    transforms += "perspective(" + transformPerspective + _endParenthesis;
  }

  if (xPercent || yPercent) {
    transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
  }

  if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
    transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
  }

  if (rotation !== _zeroDeg) {
    transforms += "rotate(" + rotation + _endParenthesis;
  }

  if (rotationY !== _zeroDeg) {
    transforms += "rotateY(" + rotationY + _endParenthesis;
  }

  if (rotationX !== _zeroDeg) {
    transforms += "rotateX(" + rotationX + _endParenthesis;
  }

  if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
    transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
  }

  if (scaleX !== 1 || scaleY !== 1) {
    transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
  }

  target.style[_transformProp] = transforms || "translate(0, 0)";
},
    _renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
  var _ref2 = cache || this,
      xPercent = _ref2.xPercent,
      yPercent = _ref2.yPercent,
      x = _ref2.x,
      y = _ref2.y,
      rotation = _ref2.rotation,
      skewX = _ref2.skewX,
      skewY = _ref2.skewY,
      scaleX = _ref2.scaleX,
      scaleY = _ref2.scaleY,
      target = _ref2.target,
      xOrigin = _ref2.xOrigin,
      yOrigin = _ref2.yOrigin,
      xOffset = _ref2.xOffset,
      yOffset = _ref2.yOffset,
      forceCSS = _ref2.forceCSS,
      tx = parseFloat(x),
      ty = parseFloat(y),
      a11,
      a21,
      a12,
      a22,
      temp;

  rotation = parseFloat(rotation);
  skewX = parseFloat(skewX);
  skewY = parseFloat(skewY);

  if (skewY) {
    //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
    skewY = parseFloat(skewY);
    skewX += skewY;
    rotation += skewY;
  }

  if (rotation || skewX) {
    rotation *= _DEG2RAD;
    skewX *= _DEG2RAD;
    a11 = Math.cos(rotation) * scaleX;
    a21 = Math.sin(rotation) * scaleX;
    a12 = Math.sin(rotation - skewX) * -scaleY;
    a22 = Math.cos(rotation - skewX) * scaleY;

    if (skewX) {
      skewY *= _DEG2RAD;
      temp = Math.tan(skewX - skewY);
      temp = Math.sqrt(1 + temp * temp);
      a12 *= temp;
      a22 *= temp;

      if (skewY) {
        temp = Math.tan(skewY);
        temp = Math.sqrt(1 + temp * temp);
        a11 *= temp;
        a21 *= temp;
      }
    }

    a11 = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(a11);
    a21 = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(a21);
    a12 = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(a12);
    a22 = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(a22);
  } else {
    a11 = scaleX;
    a22 = scaleY;
    a21 = a12 = 0;
  }

  if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
    tx = _convertToUnit(target, "x", x, "px");
    ty = _convertToUnit(target, "y", y, "px");
  }

  if (xOrigin || yOrigin || xOffset || yOffset) {
    tx = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
    ty = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
  }

  if (xPercent || yPercent) {
    //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the translation to simulate it.
    temp = target.getBBox();
    tx = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(tx + xPercent / 100 * temp.width);
    ty = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(ty + yPercent / 100 * temp.height);
  }

  temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
  target.setAttribute("transform", temp);
  forceCSS && (target.style[_transformProp] = temp); //some browsers prioritize CSS transforms over the transform attribute. When we sense that the user has CSS transforms applied, we must overwrite them this way (otherwise some browser simply won't render the transform attribute changes!)
},
    _addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue) {
  var cap = 360,
      isString = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._isString)(endValue),
      endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1),
      change = endNum - startNum,
      finalValue = startNum + change + "deg",
      direction,
      pt;

  if (isString) {
    direction = endValue.split("_")[1];

    if (direction === "short") {
      change %= cap;

      if (change !== change % (cap / 2)) {
        change += change < 0 ? cap : -cap;
      }
    }

    if (direction === "cw" && change < 0) {
      change = (change + cap * _bigNum) % cap - ~~(change / cap) * cap;
    } else if (direction === "ccw" && change > 0) {
      change = (change - cap * _bigNum) % cap - ~~(change / cap) * cap;
    }
  }

  plugin._pt = pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
  pt.e = finalValue;
  pt.u = "deg";

  plugin._props.push(property);

  return pt;
},
    _assign = function _assign(target, source) {
  // Internet Explorer doesn't have Object.assign(), so we recreate it here.
  for (var p in source) {
    target[p] = source[p];
  }

  return target;
},
    _addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
  //for handling cases where someone passes in a whole transform string, like transform: "scale(2, 3) rotate(20deg) translateY(30em)"
  var startCache = _assign({}, target._gsap),
      exclude = "perspective,force3D,transformOrigin,svgOrigin",
      style = target.style,
      endCache,
      p,
      startValue,
      endValue,
      startNum,
      endNum,
      startUnit,
      endUnit;

  if (startCache.svg) {
    startValue = target.getAttribute("transform");
    target.setAttribute("transform", "");
    style[_transformProp] = transforms;
    endCache = _parseTransform(target, 1);

    _removeProperty(target, _transformProp);

    target.setAttribute("transform", startValue);
  } else {
    startValue = getComputedStyle(target)[_transformProp];
    style[_transformProp] = transforms;
    endCache = _parseTransform(target, 1);
    style[_transformProp] = startValue;
  }

  for (p in _transformProps) {
    startValue = startCache[p];
    endValue = endCache[p];

    if (startValue !== endValue && exclude.indexOf(p) < 0) {
      //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
      startUnit = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.getUnit)(startValue);
      endUnit = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.getUnit)(endValue);
      startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
      endNum = parseFloat(endValue);
      plugin._pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
      plugin._pt.u = endUnit || 0;

      plugin._props.push(p);
    }
  }

  _assign(endCache, startCache);
}; // handle splitting apart padding, margin, borderWidth, and borderRadius into their 4 components. Firefox, for example, won't report borderRadius correctly - it will only do borderTopLeftRadius and the other corners. We also want to handle paddingTop, marginLeft, borderRightWidth, etc.


(0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._forEachName)("padding,margin,Width,Radius", function (name, index) {
  var t = "Top",
      r = "Right",
      b = "Bottom",
      l = "Left",
      props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function (side) {
    return index < 2 ? name + side : "border" + side + name;
  });

  _specialProps[index > 1 ? "border" + name : name] = function (plugin, target, property, endValue, tween) {
    var a, vars;

    if (arguments.length < 4) {
      // getter, passed target, property, and unit (from _get())
      a = props.map(function (prop) {
        return _get(plugin, prop, property);
      });
      vars = a.join(" ");
      return vars.split(a[0]).length === 5 ? a[0] : vars;
    }

    a = (endValue + "").split(" ");
    vars = {};
    props.forEach(function (prop, i) {
      return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
    });
    plugin.init(target, vars, tween);
  };
});

var CSSPlugin = {
  name: "css",
  register: _initCore,
  targetTest: function targetTest(target) {
    return target.style && target.nodeType;
  },
  init: function init(target, vars, tween, index, targets) {
    var props = this._props,
        style = target.style,
        startAt = tween.vars.startAt,
        startValue,
        endValue,
        endNum,
        startNum,
        type,
        specialProp,
        p,
        startUnit,
        endUnit,
        relative,
        isTransformRelated,
        transformPropTween,
        cache,
        smooth,
        hasPriority,
        inlineProps;
    _pluginInitted || _initCore(); // we may call init() multiple times on the same plugin instance, like when adding special properties, so make sure we don't overwrite the revert data or inlineProps

    this.styles = this.styles || _getStyleSaver(target);
    inlineProps = this.styles.props;
    this.tween = tween;

    for (p in vars) {
      if (p === "autoRound") {
        continue;
      }

      endValue = vars[p];

      if (_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._plugins[p] && (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._checkPlugin)(p, vars, tween, index, target, targets)) {
        // plugins
        continue;
      }

      type = typeof endValue;
      specialProp = _specialProps[p];

      if (type === "function") {
        endValue = endValue.call(tween, index, target, targets);
        type = typeof endValue;
      }

      if (type === "string" && ~endValue.indexOf("random(")) {
        endValue = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._replaceRandom)(endValue);
      }

      if (specialProp) {
        specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
      } else if (p.substr(0, 2) === "--") {
        //CSS variable
        startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
        endValue += "";
        _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._colorExp.lastIndex = 0;

        if (!_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._colorExp.test(startValue)) {
          // colors don't have units
          startUnit = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.getUnit)(startValue);
          endUnit = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.getUnit)(endValue);
        }

        endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
        this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
        props.push(p);
        inlineProps.push(p, 0, style[p]);
      } else if (type !== "undefined") {
        if (startAt && p in startAt) {
          // in case someone hard-codes a complex value as the start, like top: "calc(2vh / 2)". Without this, it'd use the computed value (always in px)
          startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
          (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._isString)(startValue) && ~startValue.indexOf("random(") && (startValue = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._replaceRandom)(startValue));
          (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.getUnit)(startValue + "") || (startValue += _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._config.units[p] || (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.getUnit)(_get(target, p)) || ""); // for cases when someone passes in a unitless value like {x: 100}; if we try setting translate(100, 0px) it won't work.

          (startValue + "").charAt(1) === "=" && (startValue = _get(target, p)); // can't work with relative values
        } else {
          startValue = _get(target, p);
        }

        startNum = parseFloat(startValue);
        relative = type === "string" && endValue.charAt(1) === "=" && endValue.substr(0, 2);
        relative && (endValue = endValue.substr(2));
        endNum = parseFloat(endValue);

        if (p in _propertyAliases) {
          if (p === "autoAlpha") {
            //special case where we control the visibility along with opacity. We still allow the opacity value to pass through and get tweened.
            if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
              //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
              startNum = 0;
            }

            inlineProps.push("visibility", 0, style.visibility);

            _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
          }

          if (p !== "scale" && p !== "transform") {
            p = _propertyAliases[p];
            ~p.indexOf(",") && (p = p.split(",")[0]);
          }
        }

        isTransformRelated = p in _transformProps; //--- TRANSFORM-RELATED ---

        if (isTransformRelated) {
          this.styles.save(p);

          if (!transformPropTween) {
            cache = target._gsap;
            cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform); // if, for example, gsap.set(... {transform:"translateX(50vw)"}), the _get() call doesn't parse the transform, thus cache.renderTransform won't be set yet so force the parsing of the transform here.

            smooth = vars.smoothOrigin !== false && cache.smooth;
            transformPropTween = this._pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1); //the first time through, create the rendering PropTween so that it runs LAST (in the linked list, we keep adding to the beginning)

            transformPropTween.dep = 1; //flag it as dependent so that if things get killed/overwritten and this is the only PropTween left, we can safely kill the whole tween.
          }

          if (p === "scale") {
            this._pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.PropTween(this._pt, cache, "scaleY", cache.scaleY, (relative ? (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._parseRelative)(cache.scaleY, relative + endNum) : endNum) - cache.scaleY || 0, _renderCSSProp);
            this._pt.u = 0;
            props.push("scaleY", p);
            p += "X";
          } else if (p === "transformOrigin") {
            inlineProps.push(_transformOriginProp, 0, style[_transformOriginProp]);
            endValue = _convertKeywordsToPercentages(endValue); //in case something like "left top" or "bottom right" is passed in. Convert to percentages.

            if (cache.svg) {
              _applySVGOrigin(target, endValue, 0, smooth, 0, this);
            } else {
              endUnit = parseFloat(endValue.split(" ")[2]) || 0; //handle the zOrigin separately!

              endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);

              _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
            }

            continue;
          } else if (p === "svgOrigin") {
            _applySVGOrigin(target, endValue, 1, smooth, 0, this);

            continue;
          } else if (p in _rotationalProperties) {
            _addRotationalPropTween(this, cache, p, startNum, relative ? (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._parseRelative)(startNum, relative + endValue) : endValue);

            continue;
          } else if (p === "smoothOrigin") {
            _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);

            continue;
          } else if (p === "force3D") {
            cache[p] = endValue;
            continue;
          } else if (p === "transform") {
            _addRawTransformPTs(this, endValue, target);

            continue;
          }
        } else if (!(p in style)) {
          p = _checkPropPrefix(p) || p;
        }

        if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
          startUnit = (startValue + "").substr((startNum + "").length);
          endNum || (endNum = 0); // protect against NaN

          endUnit = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.getUnit)(endValue) || (p in _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._config.units ? _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._config.units[p] : startUnit);
          startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
          this._pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, (relative ? (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._parseRelative)(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
          this._pt.u = endUnit || 0;

          if (startUnit !== endUnit && endUnit !== "%") {
            //when the tween goes all the way back to the beginning, we need to revert it to the OLD/ORIGINAL value (with those units). We record that as a "b" (beginning) property and point to a render method that handles that. (performance optimization)
            this._pt.b = startValue;
            this._pt.r = _renderCSSPropWithBeginning;
          }
        } else if (!(p in style)) {
          if (p in target) {
            //maybe it's not a style - it could be a property added directly to an element in which case we'll try to animate that.
            this.add(target, p, startValue || target[p], relative ? relative + endValue : endValue, index, targets);
          } else if (p !== "parseTransform") {
            (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._missingPlugin)(p, endValue);

            continue;
          }
        } else {
          _tweenComplexCSSString.call(this, target, p, startValue, relative ? relative + endValue : endValue);
        }

        isTransformRelated || (p in style ? inlineProps.push(p, 0, style[p]) : inlineProps.push(p, 1, startValue || target[p]));
        props.push(p);
      }
    }

    hasPriority && (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._sortPropTweensByPriority)(this);
  },
  render: function render(ratio, data) {
    if (data.tween._time || !_reverting()) {
      var pt = data._pt;

      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
    } else {
      data.styles.revert();
    }
  },
  get: _get,
  aliases: _propertyAliases,
  getSetter: function getSetter(target, property, plugin) {
    //returns a setter function that accepts target, property, value and applies it accordingly. Remember, properties like "x" aren't as simple as target.style.property = value because they've got to be applied to a proxy object and then merged into a transform string in a renderer.
    var p = _propertyAliases[property];
    p && p.indexOf(",") < 0 && (property = p);
    return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !(0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._isUndefined)(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._getSetter)(target, property);
  },
  core: {
    _removeProperty: _removeProperty,
    _getMatrix: _getMatrix
  }
};
_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.gsap.utils.checkPrefix = _checkPropPrefix;
_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.gsap.core.getStyleSaver = _getStyleSaver;

(function (positionAndScale, rotation, others, aliases) {
  var all = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._forEachName)(positionAndScale + "," + rotation + "," + others, function (name) {
    _transformProps[name] = 1;
  });

  (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._forEachName)(rotation, function (name) {
    _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._config.units[name] = "deg";
    _rotationalProperties[name] = 1;
  });

  _propertyAliases[all[13]] = positionAndScale + "," + rotation;

  (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._forEachName)(aliases, function (name) {
    var split = name.split(":");
    _propertyAliases[split[1]] = all[split[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");

(0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._forEachName)("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (name) {
  _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._config.units[name] = "px";
});

_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.gsap.registerPlugin(CSSPlugin);


/***/ }),

/***/ "./node_modules/gsap/gsap-core.js":
/*!****************************************!*\
  !*** ./node_modules/gsap/gsap-core.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Animation: function() { return /* binding */ Animation; },
/* harmony export */   Back: function() { return /* binding */ Back; },
/* harmony export */   Bounce: function() { return /* binding */ Bounce; },
/* harmony export */   Circ: function() { return /* binding */ Circ; },
/* harmony export */   Cubic: function() { return /* binding */ Cubic; },
/* harmony export */   Elastic: function() { return /* binding */ Elastic; },
/* harmony export */   Expo: function() { return /* binding */ Expo; },
/* harmony export */   GSCache: function() { return /* binding */ GSCache; },
/* harmony export */   Linear: function() { return /* binding */ Linear; },
/* harmony export */   Power0: function() { return /* binding */ Power0; },
/* harmony export */   Power1: function() { return /* binding */ Power1; },
/* harmony export */   Power2: function() { return /* binding */ Power2; },
/* harmony export */   Power3: function() { return /* binding */ Power3; },
/* harmony export */   Power4: function() { return /* binding */ Power4; },
/* harmony export */   PropTween: function() { return /* binding */ PropTween; },
/* harmony export */   Quad: function() { return /* binding */ Quad; },
/* harmony export */   Quart: function() { return /* binding */ Quart; },
/* harmony export */   Quint: function() { return /* binding */ Quint; },
/* harmony export */   Sine: function() { return /* binding */ Sine; },
/* harmony export */   SteppedEase: function() { return /* binding */ SteppedEase; },
/* harmony export */   Strong: function() { return /* binding */ Strong; },
/* harmony export */   Timeline: function() { return /* binding */ Timeline; },
/* harmony export */   TimelineLite: function() { return /* binding */ Timeline; },
/* harmony export */   TimelineMax: function() { return /* binding */ Timeline; },
/* harmony export */   Tween: function() { return /* binding */ Tween; },
/* harmony export */   TweenLite: function() { return /* binding */ Tween; },
/* harmony export */   TweenMax: function() { return /* binding */ Tween; },
/* harmony export */   _checkPlugin: function() { return /* binding */ _checkPlugin; },
/* harmony export */   _colorExp: function() { return /* binding */ _colorExp; },
/* harmony export */   _colorStringFilter: function() { return /* binding */ _colorStringFilter; },
/* harmony export */   _config: function() { return /* binding */ _config; },
/* harmony export */   _forEachName: function() { return /* binding */ _forEachName; },
/* harmony export */   _getCache: function() { return /* binding */ _getCache; },
/* harmony export */   _getProperty: function() { return /* binding */ _getProperty; },
/* harmony export */   _getSetter: function() { return /* binding */ _getSetter; },
/* harmony export */   _isString: function() { return /* binding */ _isString; },
/* harmony export */   _isUndefined: function() { return /* binding */ _isUndefined; },
/* harmony export */   _missingPlugin: function() { return /* binding */ _missingPlugin; },
/* harmony export */   _numExp: function() { return /* binding */ _numExp; },
/* harmony export */   _numWithUnitExp: function() { return /* binding */ _numWithUnitExp; },
/* harmony export */   _parseRelative: function() { return /* binding */ _parseRelative; },
/* harmony export */   _plugins: function() { return /* binding */ _plugins; },
/* harmony export */   _relExp: function() { return /* binding */ _relExp; },
/* harmony export */   _removeLinkedListItem: function() { return /* binding */ _removeLinkedListItem; },
/* harmony export */   _renderComplexString: function() { return /* binding */ _renderComplexString; },
/* harmony export */   _replaceRandom: function() { return /* binding */ _replaceRandom; },
/* harmony export */   _round: function() { return /* binding */ _round; },
/* harmony export */   _roundModifier: function() { return /* binding */ _roundModifier; },
/* harmony export */   _setDefaults: function() { return /* binding */ _setDefaults; },
/* harmony export */   _sortPropTweensByPriority: function() { return /* binding */ _sortPropTweensByPriority; },
/* harmony export */   _ticker: function() { return /* binding */ _ticker; },
/* harmony export */   clamp: function() { return /* binding */ clamp; },
/* harmony export */   "default": function() { return /* binding */ gsap; },
/* harmony export */   distribute: function() { return /* binding */ distribute; },
/* harmony export */   getUnit: function() { return /* binding */ getUnit; },
/* harmony export */   gsap: function() { return /* binding */ gsap; },
/* harmony export */   interpolate: function() { return /* binding */ interpolate; },
/* harmony export */   mapRange: function() { return /* binding */ mapRange; },
/* harmony export */   normalize: function() { return /* binding */ normalize; },
/* harmony export */   pipe: function() { return /* binding */ pipe; },
/* harmony export */   random: function() { return /* binding */ random; },
/* harmony export */   selector: function() { return /* binding */ selector; },
/* harmony export */   shuffle: function() { return /* binding */ shuffle; },
/* harmony export */   snap: function() { return /* binding */ snap; },
/* harmony export */   splitColor: function() { return /* binding */ splitColor; },
/* harmony export */   toArray: function() { return /* binding */ toArray; },
/* harmony export */   unitize: function() { return /* binding */ unitize; },
/* harmony export */   wrap: function() { return /* binding */ wrap; },
/* harmony export */   wrapYoyo: function() { return /* binding */ wrapYoyo; }
/* harmony export */ });
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*!
 * GSAP 3.12.1
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var _config = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
},
    _defaults = {
  duration: .5,
  overwrite: false,
  delay: 0
},
    _suppressOverwrites,
    _reverting,
    _context,
    _bigNum = 1e8,
    _tinyNum = 1 / _bigNum,
    _2PI = Math.PI * 2,
    _HALF_PI = _2PI / 4,
    _gsID = 0,
    _sqrt = Math.sqrt,
    _cos = Math.cos,
    _sin = Math.sin,
    _isString = function _isString(value) {
  return typeof value === "string";
},
    _isFunction = function _isFunction(value) {
  return typeof value === "function";
},
    _isNumber = function _isNumber(value) {
  return typeof value === "number";
},
    _isUndefined = function _isUndefined(value) {
  return typeof value === "undefined";
},
    _isObject = function _isObject(value) {
  return typeof value === "object";
},
    _isNotFalse = function _isNotFalse(value) {
  return value !== false;
},
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _isFuncOrString = function _isFuncOrString(value) {
  return _isFunction(value) || _isString(value);
},
    _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function () {},
    // note: IE10 has ArrayBuffer, but NOT ArrayBuffer.isView().
_isArray = Array.isArray,
    _strictNumExp = /(?:-?\.?\d|\.)+/gi,
    //only numbers (including negatives and decimals) but NOT relative values.
_numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    //finds any numbers, including ones that start with += or -=, negative numbers, and ones in scientific notation like 1e-8.
_numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    //duplicate so that while we're looping through matches from exec(), it doesn't contaminate the lastIndex of _numExp which we use to search for colors too.
_relExp = /[+-]=-?[.\d]+/,
    _delimitedValueExp = /[^,'"\[\]\s]+/gi,
    // previously /[#\-+.]*\b[a-z\d\-=+%.]+/gi but didn't catch special characters.
_unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
    _globalTimeline,
    _win,
    _coreInitted,
    _doc,
    _globals = {},
    _installScope = {},
    _coreReady,
    _install = function _install(scope) {
  return (_installScope = _merge(scope, _globals)) && gsap;
},
    _missingPlugin = function _missingPlugin(property, value) {
  return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
},
    _warn = function _warn(message, suppress) {
  return !suppress && console.warn(message);
},
    _addGlobal = function _addGlobal(name, obj) {
  return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
},
    _emptyFunc = function _emptyFunc() {
  return 0;
},
    _startAtRevertConfig = {
  suppressEvents: true,
  isStart: true,
  kill: false
},
    _revertConfigNoKill = {
  suppressEvents: true,
  kill: false
},
    _revertConfig = {
  suppressEvents: true
},
    _reservedProps = {},
    _lazyTweens = [],
    _lazyLookup = {},
    _lastRenderedFrame,
    _plugins = {},
    _effects = {},
    _nextGCFrame = 30,
    _harnessPlugins = [],
    _callbackNames = "",
    _harness = function _harness(targets) {
  var target = targets[0],
      harnessPlugin,
      i;
  _isObject(target) || _isFunction(target) || (targets = [targets]);

  if (!(harnessPlugin = (target._gsap || {}).harness)) {
    // find the first target with a harness. We assume targets passed into an animation will be of similar type, meaning the same kind of harness can be used for them all (performance optimization)
    i = _harnessPlugins.length;

    while (i-- && !_harnessPlugins[i].targetTest(target)) {}

    harnessPlugin = _harnessPlugins[i];
  }

  i = targets.length;

  while (i--) {
    targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
  }

  return targets;
},
    _getCache = function _getCache(target) {
  return target._gsap || _harness(toArray(target))[0]._gsap;
},
    _getProperty = function _getProperty(target, property, v) {
  return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
},
    _forEachName = function _forEachName(names, func) {
  return (names = names.split(",")).forEach(func) || names;
},
    //split a comma-delimited list of names into an array, then run a forEach() function and return the split array (this is just a way to consolidate/shorten some code).
_round = function _round(value) {
  return Math.round(value * 100000) / 100000 || 0;
},
    _roundPrecise = function _roundPrecise(value) {
  return Math.round(value * 10000000) / 10000000 || 0;
},
    // increased precision mostly for timing values.
_parseRelative = function _parseRelative(start, value) {
  var operator = value.charAt(0),
      end = parseFloat(value.substr(2));
  start = parseFloat(start);
  return operator === "+" ? start + end : operator === "-" ? start - end : operator === "*" ? start * end : start / end;
},
    _arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
  //searches one array to find matches for any of the items in the toFind array. As soon as one is found, it returns true. It does NOT return all the matches; it's simply a boolean search.
  var l = toFind.length,
      i = 0;

  for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l;) {}

  return i < l;
},
    _lazyRender = function _lazyRender() {
  var l = _lazyTweens.length,
      a = _lazyTweens.slice(0),
      i,
      tween;

  _lazyLookup = {};
  _lazyTweens.length = 0;

  for (i = 0; i < l; i++) {
    tween = a[i];
    tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
  }
},
    _lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
  _lazyTweens.length && !_reverting && _lazyRender();
  animation.render(time, suppressEvents, force || _reverting && time < 0 && (animation._initted || animation._startAt));
  _lazyTweens.length && !_reverting && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
},
    _numericIfPossible = function _numericIfPossible(value) {
  var n = parseFloat(value);
  return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
},
    _passThrough = function _passThrough(p) {
  return p;
},
    _setDefaults = function _setDefaults(obj, defaults) {
  for (var p in defaults) {
    p in obj || (obj[p] = defaults[p]);
  }

  return obj;
},
    _setKeyframeDefaults = function _setKeyframeDefaults(excludeDuration) {
  return function (obj, defaults) {
    for (var p in defaults) {
      p in obj || p === "duration" && excludeDuration || p === "ease" || (obj[p] = defaults[p]);
    }
  };
},
    _merge = function _merge(base, toMerge) {
  for (var p in toMerge) {
    base[p] = toMerge[p];
  }

  return base;
},
    _mergeDeep = function _mergeDeep(base, toMerge) {
  for (var p in toMerge) {
    p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
  }

  return base;
},
    _copyExcluding = function _copyExcluding(obj, excluding) {
  var copy = {},
      p;

  for (p in obj) {
    p in excluding || (copy[p] = obj[p]);
  }

  return copy;
},
    _inheritDefaults = function _inheritDefaults(vars) {
  var parent = vars.parent || _globalTimeline,
      func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults;

  if (_isNotFalse(vars.inherit)) {
    while (parent) {
      func(vars, parent.vars.defaults);
      parent = parent.parent || parent._dp;
    }
  }

  return vars;
},
    _arraysMatch = function _arraysMatch(a1, a2) {
  var i = a1.length,
      match = i === a2.length;

  while (match && i-- && a1[i] === a2[i]) {}

  return i < 0;
},
    _addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }

  if (lastProp === void 0) {
    lastProp = "_last";
  }

  var prev = parent[lastProp],
      t;

  if (sortBy) {
    t = child[sortBy];

    while (prev && prev[sortBy] > t) {
      prev = prev._prev;
    }
  }

  if (prev) {
    child._next = prev._next;
    prev._next = child;
  } else {
    child._next = parent[firstProp];
    parent[firstProp] = child;
  }

  if (child._next) {
    child._next._prev = child;
  } else {
    parent[lastProp] = child;
  }

  child._prev = prev;
  child.parent = child._dp = parent;
  return child;
},
    _removeLinkedListItem = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }

  if (lastProp === void 0) {
    lastProp = "_last";
  }

  var prev = child._prev,
      next = child._next;

  if (prev) {
    prev._next = next;
  } else if (parent[firstProp] === child) {
    parent[firstProp] = next;
  }

  if (next) {
    next._prev = prev;
  } else if (parent[lastProp] === child) {
    parent[lastProp] = prev;
  }

  child._next = child._prev = child.parent = null; // don't delete the _dp just so we can revert if necessary. But parent should be null to indicate the item isn't in a linked list.
},
    _removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
  child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove && child.parent.remove(child);
  child._act = 0;
},
    _uncache = function _uncache(animation, child) {
  if (animation && (!child || child._end > animation._dur || child._start < 0)) {
    // performance optimization: if a child animation is passed in we should only uncache if that child EXTENDS the animation (its end time is beyond the end)
    var a = animation;

    while (a) {
      a._dirty = 1;
      a = a.parent;
    }
  }

  return animation;
},
    _recacheAncestors = function _recacheAncestors(animation) {
  var parent = animation.parent;

  while (parent && parent.parent) {
    //sometimes we must force a re-sort of all children and update the duration/totalDuration of all ancestor timelines immediately in case, for example, in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
    parent._dirty = 1;
    parent.totalDuration();
    parent = parent.parent;
  }

  return animation;
},
    _rewindStartAt = function _rewindStartAt(tween, totalTime, suppressEvents, force) {
  return tween._startAt && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween.vars.immediateRender && !tween.vars.autoRevert || tween._startAt.render(totalTime, true, force));
},
    _hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
  return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
},
    _elapsedCycleDuration = function _elapsedCycleDuration(animation) {
  return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
},
    // feed in the totalTime and cycleDuration and it'll return the cycle (iteration minus 1) and if the playhead is exactly at the very END, it will NOT bump up to the next cycle.
_animationCycle = function _animationCycle(tTime, cycleDuration) {
  var whole = Math.floor(tTime /= cycleDuration);
  return tTime && whole === tTime ? whole - 1 : whole;
},
    _parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
  return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
},
    _setEnd = function _setEnd(animation) {
  return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
},
    _alignPlayhead = function _alignPlayhead(animation, totalTime) {
  // adjusts the animation's _start and _end according to the provided totalTime (only if the parent's smoothChildTiming is true and the animation isn't paused). It doesn't do any rendering or forcing things back into parent timelines, etc. - that's what totalTime() is for.
  var parent = animation._dp;

  if (parent && parent.smoothChildTiming && animation._ts) {
    animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));

    _setEnd(animation);

    parent._dirty || _uncache(parent, animation); //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
  }

  return animation;
},

/*
_totalTimeToTime = (clampedTotalTime, duration, repeat, repeatDelay, yoyo) => {
	let cycleDuration = duration + repeatDelay,
		time = _round(clampedTotalTime % cycleDuration);
	if (time > duration) {
		time = duration;
	}
	return (yoyo && (~~(clampedTotalTime / cycleDuration) & 1)) ? duration - time : time;
},
*/
_postAddChecks = function _postAddChecks(timeline, child) {
  var t;

  if (child._time || child._initted && !child._dur) {
    //in case, for example, the _start is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
    t = _parentToChildTotalTime(timeline.rawTime(), child);

    if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
      child.render(t, true);
    }
  } //if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.


  if (_uncache(timeline, child)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
    //in case any of the ancestors had completed but should now be enabled...
    if (timeline._dur < timeline.duration()) {
      t = timeline;

      while (t._dp) {
        t.rawTime() >= 0 && t.totalTime(t._tTime); //moves the timeline (shifts its startTime) if necessary, and also enables it. If it's currently zero, though, it may not be scheduled to render until later so there's no need to force it to align with the current playhead position. Only move to catch up with the playhead.

        t = t._dp;
      }
    }

    timeline._zTime = -_tinyNum; // helps ensure that the next render() will be forced (crossingStart = true in render()), even if the duration hasn't changed (we're adding a child which would need to get rendered). Definitely an edge case. Note: we MUST do this AFTER the loop above where the totalTime() might trigger a render() because this _addToTimeline() method gets called from the Animation constructor, BEFORE tweens even record their targets, etc. so we wouldn't want things to get triggered in the wrong order.
  }
},
    _addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
  child.parent && _removeFromParent(child);
  child._start = _roundPrecise((_isNumber(position) ? position : position || timeline !== _globalTimeline ? _parsePosition(timeline, position, child) : timeline._time) + child._delay);
  child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));

  _addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);

  _isFromOrFromStart(child) || (timeline._recent = child);
  skipChecks || _postAddChecks(timeline, child);
  timeline._ts < 0 && _alignPlayhead(timeline, timeline._tTime); // if the timeline is reversed and the new child makes it longer, we may need to adjust the parent's _start (push it back)

  return timeline;
},
    _scrollTrigger = function _scrollTrigger(animation, trigger) {
  return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
},
    _attemptInitTween = function _attemptInitTween(tween, time, force, suppressEvents, tTime) {
  _initTween(tween, time, tTime);

  if (!tween._initted) {
    return 1;
  }

  if (!force && tween._pt && !_reverting && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
    _lazyTweens.push(tween);

    tween._lazy = [tTime, suppressEvents];
    return 1;
  }
},
    _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart(_ref) {
  var parent = _ref.parent;
  return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart(parent));
},
    // check parent's _lock because when a timeline repeats/yoyos and does its artificial wrapping, we shouldn't force the ratio back to 0
_isFromOrFromStart = function _isFromOrFromStart(_ref2) {
  var data = _ref2.data;
  return data === "isFromStart" || data === "isStart";
},
    _renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
  var prevRatio = tween.ratio,
      ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1,
      // if the tween or its parent is reversed and the totalTime is 0, we should go to a ratio of 0. Edge case: if a from() or fromTo() stagger tween is placed later in a timeline, the "startAt" zero-duration tween could initially render at a time when the parent timeline's playhead is technically BEFORE where this tween is, so make sure that any "from" and "fromTo" startAt tweens are rendered the first time at a ratio of 1.
  repeatDelay = tween._rDelay,
      tTime = 0,
      pt,
      iteration,
      prevIteration;

  if (repeatDelay && tween._repeat) {
    // in case there's a zero-duration tween that has a repeat with a repeatDelay
    tTime = _clamp(0, tween._tDur, totalTime);
    iteration = _animationCycle(tTime, repeatDelay);
    tween._yoyo && iteration & 1 && (ratio = 1 - ratio);

    if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
      // if iteration changed
      prevRatio = 1 - ratio;
      tween.vars.repeatRefresh && tween._initted && tween.invalidate();
    }
  }

  if (ratio !== prevRatio || _reverting || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
    if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents, tTime)) {
      // if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
      return;
    }

    prevIteration = tween._zTime;
    tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0); // when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

    suppressEvents || (suppressEvents = totalTime && !prevIteration); // if it was rendered previously at exactly 0 (_zTime) and now the playhead is moving away, DON'T fire callbacks otherwise they'll seem like duplicates.

    tween.ratio = ratio;
    tween._from && (ratio = 1 - ratio);
    tween._time = 0;
    tween._tTime = tTime;
    pt = tween._pt;

    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }

    totalTime < 0 && _rewindStartAt(tween, totalTime, suppressEvents, true);
    tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
    tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");

    if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
      ratio && _removeFromParent(tween, 1);

      if (!suppressEvents && !_reverting) {
        _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);

        tween._prom && tween._prom();
      }
    }
  } else if (!tween._zTime) {
    tween._zTime = totalTime;
  }
},
    _findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
  var child;

  if (time > prevTime) {
    child = animation._first;

    while (child && child._start <= time) {
      if (child.data === "isPause" && child._start > prevTime) {
        return child;
      }

      child = child._next;
    }
  } else {
    child = animation._last;

    while (child && child._start >= time) {
      if (child.data === "isPause" && child._start < prevTime) {
        return child;
      }

      child = child._prev;
    }
  }
},
    _setDuration = function _setDuration(animation, duration, skipUncache, leavePlayhead) {
  var repeat = animation._repeat,
      dur = _roundPrecise(duration) || 0,
      totalProgress = animation._tTime / animation._tDur;
  totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
  animation._dur = dur;
  animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
  totalProgress > 0 && !leavePlayhead && _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress);
  animation.parent && _setEnd(animation);
  skipUncache || _uncache(animation.parent, animation);
  return animation;
},
    _onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
  return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
},
    _zeroPosition = {
  _start: 0,
  endTime: _emptyFunc,
  totalDuration: _emptyFunc
},
    _parsePosition = function _parsePosition(animation, position, percentAnimation) {
  var labels = animation.labels,
      recent = animation._recent || _zeroPosition,
      clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur,
      //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
  i,
      offset,
      isPercent;

  if (_isString(position) && (isNaN(position) || position in labels)) {
    //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
    offset = position.charAt(0);
    isPercent = position.substr(-1) === "%";
    i = position.indexOf("=");

    if (offset === "<" || offset === ">") {
      i >= 0 && (position = position.replace(/=/, ""));
      return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
    }

    if (i < 0) {
      position in labels || (labels[position] = clippedDuration);
      return labels[position];
    }

    offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));

    if (isPercent && percentAnimation) {
      offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
    }

    return i > 1 ? _parsePosition(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
  }

  return position == null ? clippedDuration : +position;
},
    _createTweenType = function _createTweenType(type, params, timeline) {
  var isLegacy = _isNumber(params[1]),
      varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1),
      vars = params[varsIndex],
      irVars,
      parent;

  isLegacy && (vars.duration = params[1]);
  vars.parent = timeline;

  if (type) {
    irVars = vars;
    parent = timeline;

    while (parent && !("immediateRender" in irVars)) {
      // inheritance hasn't happened yet, but someone may have set a default in an ancestor timeline. We could do vars.immediateRender = _isNotFalse(_inheritDefaults(vars).immediateRender) but that'd exact a slight performance penalty because _inheritDefaults() also runs in the Tween constructor. We're paying a small kb price here to gain speed.
      irVars = parent.vars.defaults || {};
      parent = _isNotFalse(parent.vars.inherit) && parent.parent;
    }

    vars.immediateRender = _isNotFalse(irVars.immediateRender);
    type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1]; // "from" vars
  }

  return new Tween(params[0], vars, params[varsIndex + 1]);
},
    _conditionalReturn = function _conditionalReturn(value, func) {
  return value || value === 0 ? func(value) : func;
},
    _clamp = function _clamp(min, max, value) {
  return value < min ? min : value > max ? max : value;
},
    getUnit = function getUnit(value, v) {
  return !_isString(value) || !(v = _unitExp.exec(value)) ? "" : v[1];
},
    // note: protect against padded numbers as strings, like "100.100". That shouldn't return "00" as the unit. If it's numeric, return no unit.
clamp = function clamp(min, max, value) {
  return _conditionalReturn(value, function (v) {
    return _clamp(min, max, v);
  });
},
    _slice = [].slice,
    _isArrayLike = function _isArrayLike(value, nonEmpty) {
  return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
},
    _flatten = function _flatten(ar, leaveStrings, accumulator) {
  if (accumulator === void 0) {
    accumulator = [];
  }

  return ar.forEach(function (value) {
    var _accumulator;

    return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
  }) || accumulator;
},
    //takes any value and returns an array. If it's a string (and leaveStrings isn't true), it'll use document.querySelectorAll() and convert that to an array. It'll also accept iterables like jQuery objects.
toArray = function toArray(value, scope, leaveStrings) {
  return _context && !scope && _context.selector ? _context.selector(value) : _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call((scope || _doc).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
},
    selector = function selector(value) {
  value = toArray(value)[0] || _warn("Invalid scope") || {};
  return function (v) {
    var el = value.current || value.nativeElement || value;
    return toArray(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc.createElement("div") : value);
  };
},
    shuffle = function shuffle(a) {
  return a.sort(function () {
    return .5 - Math.random();
  });
},
    // alternative that's a bit faster and more reliably diverse but bigger:   for (let j, v, i = a.length; i; j = Math.floor(Math.random() * i), v = a[--i], a[i] = a[j], a[j] = v); return a;
//for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
distribute = function distribute(v) {
  if (_isFunction(v)) {
    return v;
  }

  var vars = _isObject(v) ? v : {
    each: v
  },
      //n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
  ease = _parseEase(vars.ease),
      from = vars.from || 0,
      base = parseFloat(vars.base) || 0,
      cache = {},
      isDecimal = from > 0 && from < 1,
      ratios = isNaN(from) || isDecimal,
      axis = vars.axis,
      ratioX = from,
      ratioY = from;

  if (_isString(from)) {
    ratioX = ratioY = {
      center: .5,
      edges: .5,
      end: 1
    }[from] || 0;
  } else if (!isDecimal && ratios) {
    ratioX = from[0];
    ratioY = from[1];
  }

  return function (i, target, a) {
    var l = (a || vars).length,
        distances = cache[l],
        originX,
        originY,
        x,
        y,
        d,
        j,
        max,
        min,
        wrapAt;

    if (!distances) {
      wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];

      if (!wrapAt) {
        max = -_bigNum;

        while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {}

        wrapAt--;
      }

      distances = cache[l] = [];
      originX = ratios ? Math.min(wrapAt, l) * ratioX - .5 : from % wrapAt;
      originY = wrapAt === _bigNum ? 0 : ratios ? l * ratioY / wrapAt - .5 : from / wrapAt | 0;
      max = 0;
      min = _bigNum;

      for (j = 0; j < l; j++) {
        x = j % wrapAt - originX;
        y = originY - (j / wrapAt | 0);
        distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
        d > max && (max = d);
        d < min && (min = d);
      }

      from === "random" && shuffle(distances);
      distances.max = max - min;
      distances.min = min;
      distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
      distances.b = l < 0 ? base - l : base;
      distances.u = getUnit(vars.amount || vars.each) || 0; //unit

      ease = ease && l < 0 ? _invertEase(ease) : ease;
    }

    l = (distances[i] - distances.min) / distances.max || 0;
    return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u; //round in order to work around floating point errors
  };
},
    _roundModifier = function _roundModifier(v) {
  //pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
  var p = Math.pow(10, ((v + "").split(".")[1] || "").length); //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed())

  return function (raw) {
    var n = _roundPrecise(Math.round(parseFloat(raw) / v) * v * p);

    return (n - n % 1) / p + (_isNumber(raw) ? 0 : getUnit(raw)); // n - n % 1 replaces Math.floor() in order to handle negative values properly. For example, Math.floor(-150.00000000000003) is 151!
  };
},
    snap = function snap(snapTo, value) {
  var isArray = _isArray(snapTo),
      radius,
      is2D;

  if (!isArray && _isObject(snapTo)) {
    radius = isArray = snapTo.radius || _bigNum;

    if (snapTo.values) {
      snapTo = toArray(snapTo.values);

      if (is2D = !_isNumber(snapTo[0])) {
        radius *= radius; //performance optimization so we don't have to Math.sqrt() in the loop.
      }
    } else {
      snapTo = _roundModifier(snapTo.increment);
    }
  }

  return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function (raw) {
    is2D = snapTo(raw);
    return Math.abs(is2D - raw) <= radius ? is2D : raw;
  } : function (raw) {
    var x = parseFloat(is2D ? raw.x : raw),
        y = parseFloat(is2D ? raw.y : 0),
        min = _bigNum,
        closest = 0,
        i = snapTo.length,
        dx,
        dy;

    while (i--) {
      if (is2D) {
        dx = snapTo[i].x - x;
        dy = snapTo[i].y - y;
        dx = dx * dx + dy * dy;
      } else {
        dx = Math.abs(snapTo[i] - x);
      }

      if (dx < min) {
        min = dx;
        closest = i;
      }
    }

    closest = !radius || min <= radius ? snapTo[closest] : raw;
    return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
  });
},
    random = function random(min, max, roundingIncrement, returnFunction) {
  return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function () {
    return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * .99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
  });
},
    pipe = function pipe() {
  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return function (value) {
    return functions.reduce(function (v, f) {
      return f(v);
    }, value);
  };
},
    unitize = function unitize(func, unit) {
  return function (value) {
    return func(parseFloat(value)) + (unit || getUnit(value));
  };
},
    normalize = function normalize(min, max, value) {
  return mapRange(min, max, 0, 1, value);
},
    _wrapArray = function _wrapArray(a, wrapper, value) {
  return _conditionalReturn(value, function (index) {
    return a[~~wrapper(index)];
  });
},
    wrap = function wrap(min, max, value) {
  // NOTE: wrap() CANNOT be an arrow function! A very odd compiling bug causes problems (unrelated to GSAP).
  var range = max - min;
  return _isArray(min) ? _wrapArray(min, wrap(0, min.length), max) : _conditionalReturn(value, function (value) {
    return (range + (value - min) % range) % range + min;
  });
},
    wrapYoyo = function wrapYoyo(min, max, value) {
  var range = max - min,
      total = range * 2;
  return _isArray(min) ? _wrapArray(min, wrapYoyo(0, min.length - 1), max) : _conditionalReturn(value, function (value) {
    value = (total + (value - min) % total) % total || 0;
    return min + (value > range ? total - value : value);
  });
},
    _replaceRandom = function _replaceRandom(value) {
  //replaces all occurrences of random(...) in a string with the calculated random value. can be a range like random(-100, 100, 5) or an array like random([0, 100, 500])
  var prev = 0,
      s = "",
      i,
      nums,
      end,
      isArray;

  while (~(i = value.indexOf("random(", prev))) {
    end = value.indexOf(")", i);
    isArray = value.charAt(i + 7) === "[";
    nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
    s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
    prev = end + 1;
  }

  return s + value.substr(prev, value.length - prev);
},
    mapRange = function mapRange(inMin, inMax, outMin, outMax, value) {
  var inRange = inMax - inMin,
      outRange = outMax - outMin;
  return _conditionalReturn(value, function (value) {
    return outMin + ((value - inMin) / inRange * outRange || 0);
  });
},
    interpolate = function interpolate(start, end, progress, mutate) {
  var func = isNaN(start + end) ? 0 : function (p) {
    return (1 - p) * start + p * end;
  };

  if (!func) {
    var isString = _isString(start),
        master = {},
        p,
        i,
        interpolators,
        l,
        il;

    progress === true && (mutate = 1) && (progress = null);

    if (isString) {
      start = {
        p: start
      };
      end = {
        p: end
      };
    } else if (_isArray(start) && !_isArray(end)) {
      interpolators = [];
      l = start.length;
      il = l - 2;

      for (i = 1; i < l; i++) {
        interpolators.push(interpolate(start[i - 1], start[i])); //build the interpolators up front as a performance optimization so that when the function is called many times, it can just reuse them.
      }

      l--;

      func = function func(p) {
        p *= l;
        var i = Math.min(il, ~~p);
        return interpolators[i](p - i);
      };

      progress = end;
    } else if (!mutate) {
      start = _merge(_isArray(start) ? [] : {}, start);
    }

    if (!interpolators) {
      for (p in end) {
        _addPropTween.call(master, start, p, "get", end[p]);
      }

      func = function func(p) {
        return _renderPropTweens(p, master) || (isString ? start.p : start);
      };
    }
  }

  return _conditionalReturn(progress, func);
},
    _getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
  //used for nextLabel() and previousLabel()
  var labels = timeline.labels,
      min = _bigNum,
      p,
      distance,
      label;

  for (p in labels) {
    distance = labels[p] - fromTime;

    if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
      label = p;
      min = distance;
    }
  }

  return label;
},
    _callback = function _callback(animation, type, executeLazyFirst) {
  var v = animation.vars,
      callback = v[type],
      prevContext = _context,
      context = animation._ctx,
      params,
      scope,
      result;

  if (!callback) {
    return;
  }

  params = v[type + "Params"];
  scope = v.callbackScope || animation;
  executeLazyFirst && _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.

  context && (_context = context);
  result = params ? callback.apply(scope, params) : callback.call(scope);
  _context = prevContext;
  return result;
},
    _interrupt = function _interrupt(animation) {
  _removeFromParent(animation);

  animation.scrollTrigger && animation.scrollTrigger.kill(!!_reverting);
  animation.progress() < 1 && _callback(animation, "onInterrupt");
  return animation;
},
    _quickTween,
    _registerPluginQueue = [],
    _createPlugin = function _createPlugin(config) {
  if (_windowExists() && config) {
    // edge case: some build tools may pass in a null/undefined value
    config = !config.name && config["default"] || config; //UMD packaging wraps things oddly, so for example MotionPathHelper becomes {MotionPathHelper:MotionPathHelper, default:MotionPathHelper}.

    var name = config.name,
        isFunc = _isFunction(config),
        Plugin = name && !isFunc && config.init ? function () {
      this._props = [];
    } : config,
        //in case someone passes in an object that's not a plugin, like CustomEase
    instanceDefaults = {
      init: _emptyFunc,
      render: _renderPropTweens,
      add: _addPropTween,
      kill: _killPropTweensOf,
      modifier: _addPluginModifier,
      rawVars: 0
    },
        statics = {
      targetTest: 0,
      get: 0,
      getSetter: _getSetter,
      aliases: {},
      register: 0
    };

    _wake();

    if (config !== Plugin) {
      if (_plugins[name]) {
        return;
      }

      _setDefaults(Plugin, _setDefaults(_copyExcluding(config, instanceDefaults), statics)); //static methods


      _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config, statics))); //instance methods


      _plugins[Plugin.prop = name] = Plugin;

      if (config.targetTest) {
        _harnessPlugins.push(Plugin);

        _reservedProps[name] = 1;
      }

      name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin"; //for the global name. "motionPath" should become MotionPathPlugin
    }

    _addGlobal(name, Plugin);

    config.register && config.register(gsap, Plugin, PropTween);
  } else {
    config && _registerPluginQueue.push(config);
  }
},

/*
 * --------------------------------------------------------------------------------------
 * COLORS
 * --------------------------------------------------------------------------------------
 */
_255 = 255,
    _colorLookup = {
  aqua: [0, _255, _255],
  lime: [0, _255, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, _255],
  navy: [0, 0, 128],
  white: [_255, _255, _255],
  olive: [128, 128, 0],
  yellow: [_255, _255, 0],
  orange: [_255, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [_255, 0, 0],
  pink: [_255, 192, 203],
  cyan: [0, _255, _255],
  transparent: [_255, _255, _255, 0]
},
    // possible future idea to replace the hard-coded color name values - put this in the ticker.wake() where we set the _doc:
// let ctx = _doc.createElement("canvas").getContext("2d");
// _forEachName("aqua,lime,silver,black,maroon,teal,blue,navy,white,olive,yellow,orange,gray,purple,green,red,pink,cyan", color => {ctx.fillStyle = color; _colorLookup[color] = splitColor(ctx.fillStyle)});
_hue = function _hue(h, m1, m2) {
  h += h < 0 ? 1 : h > 1 ? -1 : 0;
  return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + .5 | 0;
},
    splitColor = function splitColor(v, toHSL, forceAlpha) {
  var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0,
      r,
      g,
      b,
      h,
      s,
      l,
      max,
      min,
      d,
      wasHSL;

  if (!a) {
    if (v.substr(-1) === ",") {
      //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
      v = v.substr(0, v.length - 1);
    }

    if (_colorLookup[v]) {
      a = _colorLookup[v];
    } else if (v.charAt(0) === "#") {
      if (v.length < 6) {
        //for shorthand like #9F0 or #9F0F (could have alpha)
        r = v.charAt(1);
        g = v.charAt(2);
        b = v.charAt(3);
        v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
      }

      if (v.length === 9) {
        // hex with alpha, like #fd5e53ff
        a = parseInt(v.substr(1, 6), 16);
        return [a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255];
      }

      v = parseInt(v.substr(1), 16);
      a = [v >> 16, v >> 8 & _255, v & _255];
    } else if (v.substr(0, 3) === "hsl") {
      a = wasHSL = v.match(_strictNumExp);

      if (!toHSL) {
        h = +a[0] % 360 / 360;
        s = +a[1] / 100;
        l = +a[2] / 100;
        g = l <= .5 ? l * (s + 1) : l + s - l * s;
        r = l * 2 - g;
        a.length > 3 && (a[3] *= 1); //cast as number

        a[0] = _hue(h + 1 / 3, r, g);
        a[1] = _hue(h, r, g);
        a[2] = _hue(h - 1 / 3, r, g);
      } else if (~v.indexOf("=")) {
        //if relative values are found, just return the raw strings with the relative prefixes in place.
        a = v.match(_numExp);
        forceAlpha && a.length < 4 && (a[3] = 1);
        return a;
      }
    } else {
      a = v.match(_strictNumExp) || _colorLookup.transparent;
    }

    a = a.map(Number);
  }

  if (toHSL && !wasHSL) {
    r = a[0] / _255;
    g = a[1] / _255;
    b = a[2] / _255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h *= 60;
    }

    a[0] = ~~(h + .5);
    a[1] = ~~(s * 100 + .5);
    a[2] = ~~(l * 100 + .5);
  }

  forceAlpha && a.length < 4 && (a[3] = 1);
  return a;
},
    _colorOrderData = function _colorOrderData(v) {
  // strips out the colors from the string, finds all the numeric slots (with units) and returns an array of those. The Array also has a "c" property which is an Array of the index values where the colors belong. This is to help work around issues where there's a mis-matched order of color/numeric data like drop-shadow(#f00 0px 1px 2px) and drop-shadow(0x 1px 2px #f00). This is basically a helper function used in _formatColors()
  var values = [],
      c = [],
      i = -1;
  v.split(_colorExp).forEach(function (v) {
    var a = v.match(_numWithUnitExp) || [];
    values.push.apply(values, a);
    c.push(i += a.length + 1);
  });
  values.c = c;
  return values;
},
    _formatColors = function _formatColors(s, toHSL, orderMatchData) {
  var result = "",
      colors = (s + result).match(_colorExp),
      type = toHSL ? "hsla(" : "rgba(",
      i = 0,
      c,
      shell,
      d,
      l;

  if (!colors) {
    return s;
  }

  colors = colors.map(function (color) {
    return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
  });

  if (orderMatchData) {
    d = _colorOrderData(s);
    c = orderMatchData.c;

    if (c.join(result) !== d.c.join(result)) {
      shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
      l = shell.length - 1;

      for (; i < l; i++) {
        result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
      }
    }
  }

  if (!shell) {
    shell = s.split(_colorExp);
    l = shell.length - 1;

    for (; i < l; i++) {
      result += shell[i] + colors[i];
    }
  }

  return result + shell[l];
},
    _colorExp = function () {
  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
      //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.,
  p;

  for (p in _colorLookup) {
    s += "|" + p + "\\b";
  }

  return new RegExp(s + ")", "gi");
}(),
    _hslExp = /hsl[a]?\(/,
    _colorStringFilter = function _colorStringFilter(a) {
  var combined = a.join(" "),
      toHSL;
  _colorExp.lastIndex = 0;

  if (_colorExp.test(combined)) {
    toHSL = _hslExp.test(combined);
    a[1] = _formatColors(a[1], toHSL);
    a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1])); // make sure the order of numbers/colors match with the END value.

    return true;
  }
},

/*
 * --------------------------------------------------------------------------------------
 * TICKER
 * --------------------------------------------------------------------------------------
 */
_tickerActive,
    _ticker = function () {
  var _getTime = Date.now,
      _lagThreshold = 500,
      _adjustedLag = 33,
      _startTime = _getTime(),
      _lastUpdate = _startTime,
      _gap = 1000 / 240,
      _nextTime = _gap,
      _listeners = [],
      _id,
      _req,
      _raf,
      _self,
      _delta,
      _i,
      _tick = function _tick(v) {
    var elapsed = _getTime() - _lastUpdate,
        manual = v === true,
        overlap,
        dispatch,
        time,
        frame;

    elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag);
    _lastUpdate += elapsed;
    time = _lastUpdate - _startTime;
    overlap = time - _nextTime;

    if (overlap > 0 || manual) {
      frame = ++_self.frame;
      _delta = time - _self.time * 1000;
      _self.time = time = time / 1000;
      _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
      dispatch = 1;
    }

    manual || (_id = _req(_tick)); //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.

    if (dispatch) {
      for (_i = 0; _i < _listeners.length; _i++) {
        // use _i and check _listeners.length instead of a variable because a listener could get removed during the loop, and if that happens to an element less than the current index, it'd throw things off in the loop.
        _listeners[_i](time, _delta, frame, v);
      }
    }
  };

  _self = {
    time: 0,
    frame: 0,
    tick: function tick() {
      _tick(true);
    },
    deltaRatio: function deltaRatio(fps) {
      return _delta / (1000 / (fps || 60));
    },
    wake: function wake() {
      if (_coreReady) {
        if (!_coreInitted && _windowExists()) {
          _win = _coreInitted = window;
          _doc = _win.document || {};
          _globals.gsap = gsap;
          (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);

          _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});

          _raf = _win.requestAnimationFrame;

          _registerPluginQueue.forEach(_createPlugin);
        }

        _id && _self.sleep();

        _req = _raf || function (f) {
          return setTimeout(f, _nextTime - _self.time * 1000 + 1 | 0);
        };

        _tickerActive = 1;

        _tick(2);
      }
    },
    sleep: function sleep() {
      (_raf ? _win.cancelAnimationFrame : clearTimeout)(_id);
      _tickerActive = 0;
      _req = _emptyFunc;
    },
    lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
      _lagThreshold = threshold || Infinity; // zero should be interpreted as basically unlimited

      _adjustedLag = Math.min(adjustedLag || 33, _lagThreshold);
    },
    fps: function fps(_fps) {
      _gap = 1000 / (_fps || 240);
      _nextTime = _self.time * 1000 + _gap;
    },
    add: function add(callback, once, prioritize) {
      var func = once ? function (t, d, f, v) {
        callback(t, d, f, v);

        _self.remove(func);
      } : callback;

      _self.remove(callback);

      _listeners[prioritize ? "unshift" : "push"](func);

      _wake();

      return func;
    },
    remove: function remove(callback, i) {
      ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
    },
    _listeners: _listeners
  };
  return _self;
}(),
    _wake = function _wake() {
  return !_tickerActive && _ticker.wake();
},
    //also ensures the core classes are initialized.

/*
* -------------------------------------------------
* EASING
* -------------------------------------------------
*/
_easeMap = {},
    _customEaseExp = /^[\d.\-M][\d.\-,\s]/,
    _quotesExp = /["']/g,
    _parseObjectInString = function _parseObjectInString(value) {
  //takes a string like "{wiggles:10, type:anticipate})" and turns it into a real object. Notice it ends in ")" and includes the {} wrappers. This is because we only use this function for parsing ease configs and prioritized optimization rather than reusability.
  var obj = {},
      split = value.substr(1, value.length - 3).split(":"),
      key = split[0],
      i = 1,
      l = split.length,
      index,
      val,
      parsedVal;

  for (; i < l; i++) {
    val = split[i];
    index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
    parsedVal = val.substr(0, index);
    obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
    key = val.substr(index + 1).trim();
  }

  return obj;
},
    _valueInParentheses = function _valueInParentheses(value) {
  var open = value.indexOf("(") + 1,
      close = value.indexOf(")"),
      nested = value.indexOf("(", open);
  return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
},
    _configEaseFromString = function _configEaseFromString(name) {
  //name can be a string like "elastic.out(1,0.5)", and pass in _easeMap as obj and it'll parse it out and call the actual function like _easeMap.Elastic.easeOut.config(1,0.5). It will also parse custom ease strings as long as CustomEase is loaded and registered (internally as _easeMap._CE).
  var split = (name + "").split("("),
      ease = _easeMap[split[0]];
  return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
},
    _invertEase = function _invertEase(ease) {
  return function (p) {
    return 1 - ease(1 - p);
  };
},
    // allow yoyoEase to be set in children and have those affected when the parent/ancestor timeline yoyos.
_propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
  var child = timeline._first,
      ease;

  while (child) {
    if (child instanceof Timeline) {
      _propagateYoyoEase(child, isYoyo);
    } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
      if (child.timeline) {
        _propagateYoyoEase(child.timeline, isYoyo);
      } else {
        ease = child._ease;
        child._ease = child._yEase;
        child._yEase = ease;
        child._yoyo = isYoyo;
      }
    }

    child = child._next;
  }
},
    _parseEase = function _parseEase(ease, defaultEase) {
  return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
},
    _insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
  if (easeOut === void 0) {
    easeOut = function easeOut(p) {
      return 1 - easeIn(1 - p);
    };
  }

  if (easeInOut === void 0) {
    easeInOut = function easeInOut(p) {
      return p < .5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
    };
  }

  var ease = {
    easeIn: easeIn,
    easeOut: easeOut,
    easeInOut: easeInOut
  },
      lowercaseName;

  _forEachName(names, function (name) {
    _easeMap[name] = _globals[name] = ease;
    _easeMap[lowercaseName = name.toLowerCase()] = easeOut;

    for (var p in ease) {
      _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
    }
  });

  return ease;
},
    _easeInOutFromOut = function _easeInOutFromOut(easeOut) {
  return function (p) {
    return p < .5 ? (1 - easeOut(1 - p * 2)) / 2 : .5 + easeOut((p - .5) * 2) / 2;
  };
},
    _configElastic = function _configElastic(type, amplitude, period) {
  var p1 = amplitude >= 1 ? amplitude : 1,
      //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
  p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1),
      p3 = p2 / _2PI * (Math.asin(1 / p1) || 0),
      easeOut = function easeOut(p) {
    return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
  },
      ease = type === "out" ? easeOut : type === "in" ? function (p) {
    return 1 - easeOut(1 - p);
  } : _easeInOutFromOut(easeOut);

  p2 = _2PI / p2; //precalculate to optimize

  ease.config = function (amplitude, period) {
    return _configElastic(type, amplitude, period);
  };

  return ease;
},
    _configBack = function _configBack(type, overshoot) {
  if (overshoot === void 0) {
    overshoot = 1.70158;
  }

  var easeOut = function easeOut(p) {
    return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
  },
      ease = type === "out" ? easeOut : type === "in" ? function (p) {
    return 1 - easeOut(1 - p);
  } : _easeInOutFromOut(easeOut);

  ease.config = function (overshoot) {
    return _configBack(type, overshoot);
  };

  return ease;
}; // a cheaper (kb and cpu) but more mild way to get a parameterized weighted ease by feeding in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEase = ratio => {
// 	let y = 0.5 + ratio / 2;
// 	return p => (2 * (1 - p) * p * y + p * p);
// },
// a stronger (but more expensive kb/cpu) parameterized weighted ease that lets you feed in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEaseStrong = ratio => {
// 	ratio = .5 + ratio / 2;
// 	let o = 1 / 3 * (ratio < .5 ? ratio : 1 - ratio),
// 		b = ratio - o,
// 		c = ratio + o;
// 	return p => p === 1 ? p : 3 * b * (1 - p) * (1 - p) * p + 3 * c * (1 - p) * p * p + p * p * p;
// };


_forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function (name, i) {
  var power = i < 5 ? i + 1 : i;

  _insertEase(name + ",Power" + (power - 1), i ? function (p) {
    return Math.pow(p, power);
  } : function (p) {
    return p;
  }, function (p) {
    return 1 - Math.pow(1 - p, power);
  }, function (p) {
    return p < .5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
  });
});

_easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;

_insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());

(function (n, c) {
  var n1 = 1 / c,
      n2 = 2 * n1,
      n3 = 2.5 * n1,
      easeOut = function easeOut(p) {
    return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + .75 : p < n3 ? n * (p -= 2.25 / c) * p + .9375 : n * Math.pow(p - 2.625 / c, 2) + .984375;
  };

  _insertEase("Bounce", function (p) {
    return 1 - easeOut(1 - p);
  }, easeOut);
})(7.5625, 2.75);

_insertEase("Expo", function (p) {
  return p ? Math.pow(2, 10 * (p - 1)) : 0;
});

_insertEase("Circ", function (p) {
  return -(_sqrt(1 - p * p) - 1);
});

_insertEase("Sine", function (p) {
  return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
});

_insertEase("Back", _configBack("in"), _configBack("out"), _configBack());

_easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
  config: function config(steps, immediateStart) {
    if (steps === void 0) {
      steps = 1;
    }

    var p1 = 1 / steps,
        p2 = steps + (immediateStart ? 0 : 1),
        p3 = immediateStart ? 1 : 0,
        max = 1 - _tinyNum;
    return function (p) {
      return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
    };
  }
};
_defaults.ease = _easeMap["quad.out"];

_forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (name) {
  return _callbackNames += name + "," + name + "Params,";
});
/*
 * --------------------------------------------------------------------------------------
 * CACHE
 * --------------------------------------------------------------------------------------
 */


var GSCache = function GSCache(target, harness) {
  this.id = _gsID++;
  target._gsap = this;
  this.target = target;
  this.harness = harness;
  this.get = harness ? harness.get : _getProperty;
  this.set = harness ? harness.getSetter : _getSetter;
};
/*
 * --------------------------------------------------------------------------------------
 * ANIMATION
 * --------------------------------------------------------------------------------------
 */

var Animation = /*#__PURE__*/function () {
  function Animation(vars) {
    this.vars = vars;
    this._delay = +vars.delay || 0;

    if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
      // TODO: repeat: Infinity on a timeline's children must flag that timeline internally and affect its totalDuration, otherwise it'll stop in the negative direction when reaching the start.
      this._rDelay = vars.repeatDelay || 0;
      this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
    }

    this._ts = 1;

    _setDuration(this, +vars.duration, 1, 1);

    this.data = vars.data;

    if (_context) {
      this._ctx = _context;

      _context.data.push(this);
    }

    _tickerActive || _ticker.wake();
  }

  var _proto = Animation.prototype;

  _proto.delay = function delay(value) {
    if (value || value === 0) {
      this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
      this._delay = value;
      return this;
    }

    return this._delay;
  };

  _proto.duration = function duration(value) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
  };

  _proto.totalDuration = function totalDuration(value) {
    if (!arguments.length) {
      return this._tDur;
    }

    this._dirty = 0;
    return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
  };

  _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
    _wake();

    if (!arguments.length) {
      return this._tTime;
    }

    var parent = this._dp;

    if (parent && parent.smoothChildTiming && this._ts) {
      _alignPlayhead(this, _totalTime);

      !parent._dp || parent.parent || _postAddChecks(parent, this); // edge case: if this is a child of a timeline that already completed, for example, we must re-activate the parent.
      //in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The start of that child would get pushed out, but one of the ancestors may have completed.

      while (parent && parent.parent) {
        if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
          parent.totalTime(parent._tTime, true);
        }

        parent = parent.parent;
      }

      if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
        //if the animation doesn't have a parent, put it back into its last parent (recorded as _dp for exactly cases like this). Limit to parents with autoRemoveChildren (like globalTimeline) so that if the user manually removes an animation from a timeline and then alters its playhead, it doesn't get added back in.
        _addToTimeline(this._dp, this, this._start - this._delay);
      }
    }

    if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
      // check for _ptLookup on a Tween instance to ensure it has actually finished being instantiated, otherwise if this.reverse() gets called in the Animation constructor, it could trigger a render() here even though the _targets weren't populated, thus when _init() is called there won't be any PropTweens (it'll act like the tween is non-functional)
      this._ts || (this._pTime = _totalTime); // otherwise, if an animation is paused, then the playhead is moved back to zero, then resumed, it'd revert back to the original time at the pause
      //if (!this._lock) { // avoid endless recursion (not sure we need this yet or if it's worth the performance hit)
      //   this._lock = 1;

      _lazySafeRender(this, _totalTime, suppressEvents); //   this._lock = 0;
      //}

    }

    return this;
  };

  _proto.time = function time(value, suppressEvents) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time; // note: if the modulus results in 0, the playhead could be exactly at the end or the beginning, and we always defer to the END with a non-zero value, otherwise if you set the time() to the very end (duration()), it would render at the START!
  };

  _proto.totalProgress = function totalProgress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
  };

  _proto.progress = function progress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
  };

  _proto.iteration = function iteration(value, suppressEvents) {
    var cycleDuration = this.duration() + this._rDelay;

    return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
  } // potential future addition:
  // isPlayingBackwards() {
  // 	let animation = this,
  // 		orientation = 1; // 1 = forward, -1 = backward
  // 	while (animation) {
  // 		orientation *= animation.reversed() || (animation.repeat() && !(animation.iteration() & 1)) ? -1 : 1;
  // 		animation = animation.parent;
  // 	}
  // 	return orientation < 0;
  // }
  ;

  _proto.timeScale = function timeScale(value) {
    if (!arguments.length) {
      return this._rts === -_tinyNum ? 0 : this._rts; // recorded timeScale. Special case: if someone calls reverse() on an animation with timeScale of 0, we assign it -_tinyNum to remember it's reversed.
    }

    if (this._rts === value) {
      return this;
    }

    var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime; // make sure to do the parentToChildTotalTime() BEFORE setting the new _ts because the old one must be used in that calculation.
    // future addition? Up side: fast and minimal file size. Down side: only works on this animation; if a timeline is reversed, for example, its childrens' onReverse wouldn't get called.
    //(+value < 0 && this._rts >= 0) && _callback(this, "onReverse", true);
    // prioritize rendering where the parent's playhead lines up instead of this._tTime because there could be a tween that's animating another tween's timeScale in the same rendering loop (same parent), thus if the timeScale tween renders first, it would alter _start BEFORE _tTime was set on that tick (in the rendering loop), effectively freezing it until the timeScale tween finishes.

    this._rts = +value || 0;
    this._ts = this._ps || value === -_tinyNum ? 0 : this._rts; // _ts is the functional timeScale which would be 0 if the animation is paused.

    this.totalTime(_clamp(-Math.abs(this._delay), this._tDur, tTime), true);

    _setEnd(this); // if parent.smoothChildTiming was false, the end time didn't get updated in the _alignPlayhead() method, so do it here.


    return _recacheAncestors(this);
  };

  _proto.paused = function paused(value) {
    if (!arguments.length) {
      return this._ps;
    }

    if (this._ps !== value) {
      this._ps = value;

      if (value) {
        this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()); // if the pause occurs during the delay phase, make sure that's factored in when resuming.

        this._ts = this._act = 0; // _ts is the functional timeScale, so a paused tween would effectively have a timeScale of 0. We record the "real" timeScale as _rts (recorded time scale)
      } else {
        _wake();

        this._ts = this._rts; //only defer to _pTime (pauseTime) if tTime is zero. Remember, someone could pause() an animation, then scrub the playhead and resume(). If the parent doesn't have smoothChildTiming, we render at the rawTime() because the startTime won't get updated.

        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum)); // edge case: animation.progress(1).pause().play() wouldn't render again because the playhead is already at the end, but the call to totalTime() below will add it back to its parent...and not remove it again (since removing only happens upon rendering at a new time). Offsetting the _tTime slightly is done simply to cause the final render in totalTime() that'll pop it off its timeline (if autoRemoveChildren is true, of course). Check to make sure _zTime isn't -_tinyNum to avoid an edge case where the playhead is pushed to the end but INSIDE a tween/callback, the timeline itself is paused thus halting rendering and leaving a few unrendered. When resuming, it wouldn't render those otherwise.
      }
    }

    return this;
  };

  _proto.startTime = function startTime(value) {
    if (arguments.length) {
      this._start = value;
      var parent = this.parent || this._dp;
      parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
      return this;
    }

    return this._start;
  };

  _proto.endTime = function endTime(includeRepeats) {
    return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  };

  _proto.rawTime = function rawTime(wrapRepeats) {
    var parent = this.parent || this._dp; // _dp = detached parent

    return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
  };

  _proto.revert = function revert(config) {
    if (config === void 0) {
      config = _revertConfig;
    }

    var prevIsReverting = _reverting;
    _reverting = config;

    if (this._initted || this._startAt) {
      this.timeline && this.timeline.revert(config);
      this.totalTime(-0.01, config.suppressEvents);
    }

    this.data !== "nested" && config.kill !== false && this.kill();
    _reverting = prevIsReverting;
    return this;
  };

  _proto.globalTime = function globalTime(rawTime) {
    var animation = this,
        time = arguments.length ? rawTime : animation.rawTime();

    while (animation) {
      time = animation._start + time / (animation._ts || 1);
      animation = animation._dp;
    }

    return !this.parent && this._sat ? this._sat.vars.immediateRender ? -1 : this._sat.globalTime(rawTime) : time; // the _startAt tweens for .fromTo() and .from() that have immediateRender should always be FIRST in the timeline (important for context.revert()). "_sat" stands for _startAtTween, referring to the parent tween that created the _startAt. We must discern if that tween had immediateRender so that we can know whether or not to prioritize it in revert().
  };

  _proto.repeat = function repeat(value) {
    if (arguments.length) {
      this._repeat = value === Infinity ? -2 : value;
      return _onUpdateTotalDuration(this);
    }

    return this._repeat === -2 ? Infinity : this._repeat;
  };

  _proto.repeatDelay = function repeatDelay(value) {
    if (arguments.length) {
      var time = this._time;
      this._rDelay = value;

      _onUpdateTotalDuration(this);

      return time ? this.time(time) : this;
    }

    return this._rDelay;
  };

  _proto.yoyo = function yoyo(value) {
    if (arguments.length) {
      this._yoyo = value;
      return this;
    }

    return this._yoyo;
  };

  _proto.seek = function seek(position, suppressEvents) {
    return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
  };

  _proto.restart = function restart(includeDelay, suppressEvents) {
    return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
  };

  _proto.play = function play(from, suppressEvents) {
    from != null && this.seek(from, suppressEvents);
    return this.reversed(false).paused(false);
  };

  _proto.reverse = function reverse(from, suppressEvents) {
    from != null && this.seek(from || this.totalDuration(), suppressEvents);
    return this.reversed(true).paused(false);
  };

  _proto.pause = function pause(atTime, suppressEvents) {
    atTime != null && this.seek(atTime, suppressEvents);
    return this.paused(true);
  };

  _proto.resume = function resume() {
    return this.paused(false);
  };

  _proto.reversed = function reversed(value) {
    if (arguments.length) {
      !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0)); // in case timeScale is zero, reversing would have no effect so we use _tinyNum.

      return this;
    }

    return this._rts < 0;
  };

  _proto.invalidate = function invalidate() {
    this._initted = this._act = 0;
    this._zTime = -_tinyNum;
    return this;
  };

  _proto.isActive = function isActive() {
    var parent = this.parent || this._dp,
        start = this._start,
        rawTime;
    return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
  };

  _proto.eventCallback = function eventCallback(type, callback, params) {
    var vars = this.vars;

    if (arguments.length > 1) {
      if (!callback) {
        delete vars[type];
      } else {
        vars[type] = callback;
        params && (vars[type + "Params"] = params);
        type === "onUpdate" && (this._onUpdate = callback);
      }

      return this;
    }

    return vars[type];
  };

  _proto.then = function then(onFulfilled) {
    var self = this;
    return new Promise(function (resolve) {
      var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough,
          _resolve = function _resolve() {
        var _then = self.then;
        self.then = null; // temporarily null the then() method to avoid an infinite loop (see https://github.com/greensock/GSAP/issues/322)

        _isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
        resolve(f);
        self.then = _then;
      };

      if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
        _resolve();
      } else {
        self._prom = _resolve;
      }
    });
  };

  _proto.kill = function kill() {
    _interrupt(this);
  };

  return Animation;
}();

_setDefaults(Animation.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: false,
  parent: null,
  _initted: false,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -_tinyNum,
  _prom: 0,
  _ps: false,
  _rts: 1
});
/*
 * -------------------------------------------------
 * TIMELINE
 * -------------------------------------------------
 */


var Timeline = /*#__PURE__*/function (_Animation) {
  _inheritsLoose(Timeline, _Animation);

  function Timeline(vars, position) {
    var _this;

    if (vars === void 0) {
      vars = {};
    }

    _this = _Animation.call(this, vars) || this;
    _this.labels = {};
    _this.smoothChildTiming = !!vars.smoothChildTiming;
    _this.autoRemoveChildren = !!vars.autoRemoveChildren;
    _this._sort = _isNotFalse(vars.sortChildren);
    _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
    vars.reversed && _this.reverse();
    vars.paused && _this.paused(true);
    vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
    return _this;
  }

  var _proto2 = Timeline.prototype;

  _proto2.to = function to(targets, vars, position) {
    _createTweenType(0, arguments, this);

    return this;
  };

  _proto2.from = function from(targets, vars, position) {
    _createTweenType(1, arguments, this);

    return this;
  };

  _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
    _createTweenType(2, arguments, this);

    return this;
  };

  _proto2.set = function set(targets, vars, position) {
    vars.duration = 0;
    vars.parent = this;
    _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
    vars.immediateRender = !!vars.immediateRender;
    new Tween(targets, vars, _parsePosition(this, position), 1);
    return this;
  };

  _proto2.call = function call(callback, params, position) {
    return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
  } //ONLY for backward compatibility! Maybe delete?
  ;

  _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.duration = duration;
    vars.stagger = vars.stagger || stagger;
    vars.onComplete = onCompleteAll;
    vars.onCompleteParams = onCompleteAllParams;
    vars.parent = this;
    new Tween(targets, vars, _parsePosition(this, position));
    return this;
  };

  _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.runBackwards = 1;
    _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
    return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
  };

  _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
    toVars.startAt = fromVars;
    _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
    return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
  };

  _proto2.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time,
        tDur = this._dirty ? this.totalDuration() : this._tDur,
        dur = this._dur,
        tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime),
        // if a paused timeline is resumed (or its _start is updated for another reason...which rounds it), that could result in the playhead shifting a **tiny** amount and a zero-duration child at that spot may get rendered at a different ratio, like its totalTime in render() may be 1e-17 instead of 0, for example.
    crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur),
        time,
        child,
        next,
        iteration,
        cycleDuration,
        prevPaused,
        pauseTween,
        timeScale,
        prevStart,
        prevIteration,
        yoyo,
        isYoyo;
    this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);

    if (tTime !== this._tTime || force || crossingStart) {
      if (prevTime !== this._time && dur) {
        //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
        tTime += this._time - prevTime;
        totalTime += this._time - prevTime;
      }

      time = tTime;
      prevStart = this._start;
      timeScale = this._ts;
      prevPaused = !timeScale;

      if (crossingStart) {
        dur || (prevTime = this._zTime); //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

        (totalTime || !suppressEvents) && (this._zTime = totalTime);
      }

      if (this._repeat) {
        //adjust the time for repeats and yoyos
        yoyo = this._yoyo;
        cycleDuration = dur + this._rDelay;

        if (this._repeat < -1 && totalTime < 0) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }

        time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (tTime === tDur) {
          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
          iteration = this._repeat;
          time = dur;
        } else {
          iteration = ~~(tTime / cycleDuration);

          if (iteration && iteration === tTime / cycleDuration) {
            time = dur;
            iteration--;
          }

          time > dur && (time = dur);
        }

        prevIteration = _animationCycle(this._tTime, cycleDuration);
        !prevTime && this._tTime && prevIteration !== iteration && this._tTime - prevIteration * cycleDuration - this._dur <= 0 && (prevIteration = iteration); // edge case - if someone does addPause() at the very beginning of a repeating timeline, that pause is technically at the same spot as the end which causes this._time to get set to 0 when the totalTime would normally place the playhead at the end. See https://greensock.com/forums/topic/23823-closing-nav-animation-not-working-on-ie-and-iphone-6-maybe-other-older-browser/?tab=comments#comment-113005 also, this._tTime - prevIteration * cycleDuration - this._dur <= 0 just checks to make sure it wasn't previously in the "repeatDelay" portion

        if (yoyo && iteration & 1) {
          time = dur - time;
          isYoyo = 1;
        }
        /*
        make sure children at the end/beginning of the timeline are rendered properly. If, for example,
        a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
        would get translated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
        could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
        we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
        ensure that zero-duration tweens at the very beginning or end of the Timeline work.
        */


        if (iteration !== prevIteration && !this._lock) {
          var rewinding = yoyo && prevIteration & 1,
              doesWrap = rewinding === (yoyo && iteration & 1);
          iteration < prevIteration && (rewinding = !rewinding);
          prevTime = rewinding ? 0 : dur;
          this._lock = 1;
          this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
          this._tTime = tTime; // if a user gets the iteration() inside the onRepeat, for example, it should be accurate.

          !suppressEvents && this.parent && _callback(this, "onRepeat");
          this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);

          if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
            // if prevTime is 0 and we render at the very end, _time will be the end, thus won't match. So in this edge case, prevTime won't match _time but that's okay. If it gets killed in the onRepeat, eject as well.
            return this;
          }

          dur = this._dur; // in case the duration changed in the onRepeat

          tDur = this._tDur;

          if (doesWrap) {
            this._lock = 2;
            prevTime = rewinding ? dur : -0.0001;
            this.render(prevTime, true);
            this.vars.repeatRefresh && !isYoyo && this.invalidate();
          }

          this._lock = 0;

          if (!this._ts && !prevPaused) {
            return this;
          } //in order for yoyoEase to work properly when there's a stagger, we must swap out the ease in each sub-tween.


          _propagateYoyoEase(this, isYoyo);
        }
      }

      if (this._hasPause && !this._forcing && this._lock < 2) {
        pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));

        if (pauseTween) {
          tTime -= time - (time = pauseTween._start);
        }
      }

      this._tTime = tTime;
      this._time = time;
      this._act = !timeScale; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

      if (!this._initted) {
        this._onUpdate = this.vars.onUpdate;
        this._initted = 1;
        this._zTime = totalTime;
        prevTime = 0; // upon init, the playhead should always go forward; someone could invalidate() a completed timeline and then if they restart(), that would make child tweens render in reverse order which could lock in the wrong starting values if they build on each other, like tl.to(obj, {x: 100}).to(obj, {x: 0}).
      }

      if (!prevTime && time && !suppressEvents && !iteration) {
        _callback(this, "onStart");

        if (this._tTime !== tTime) {
          // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
          return this;
        }
      }

      if (time >= prevTime && totalTime >= 0) {
        child = this._first;

        while (child) {
          next = child._next;

          if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
              return this.render(totalTime, suppressEvents, force);
            }

            child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);

            if (time !== this._time || !this._ts && !prevPaused) {
              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
              pauseTween = 0;
              next && (tTime += this._zTime = -_tinyNum); // it didn't finish rendering, so flag zTime as negative so that so that the next time render() is called it'll be forced (to render any remaining children)

              break;
            }
          }

          child = next;
        }
      } else {
        child = this._last;
        var adjustedTime = totalTime < 0 ? totalTime : time; //when the playhead goes backward beyond the start of this timeline, we must pass that information down to the child animations so that zero-duration tweens know whether to render their starting or ending values.

        while (child) {
          next = child._prev;

          if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
              return this.render(totalTime, suppressEvents, force);
            }

            child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force || _reverting && (child._initted || child._startAt)); // if reverting, we should always force renders of initted tweens (but remember that .fromTo() or .from() may have a _startAt but not _initted yet). If, for example, a .fromTo() tween with a stagger (which creates an internal timeline) gets reverted BEFORE some of its child tweens render for the first time, it may not properly trigger them to revert.

            if (time !== this._time || !this._ts && !prevPaused) {
              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
              pauseTween = 0;
              next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum); // it didn't finish rendering, so adjust zTime so that so that the next time render() is called it'll be forced (to render any remaining children)

              break;
            }
          }

          child = next;
        }
      }

      if (pauseTween && !suppressEvents) {
        this.pause();
        pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;

        if (this._ts) {
          //the callback resumed playback! So since we may have held back the playhead due to where the pause is positioned, go ahead and jump to where it's SUPPOSED to be (if no pause happened).
          this._start = prevStart; //if the pause was at an earlier time and the user resumed in the callback, it could reposition the timeline (changing its startTime), throwing things off slightly, so we make sure the _start doesn't shift.

          _setEnd(this);

          return this.render(totalTime, suppressEvents, force);
        }
      }

      this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
      if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) if (!this._lock) {
        // remember, a child's callback may alter this timeline's playhead or timeScale which is why we need to add some of these checks.
        (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
          _callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);

          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }

    return this;
  };

  _proto2.add = function add(child, position) {
    var _this2 = this;

    _isNumber(position) || (position = _parsePosition(this, position, child));

    if (!(child instanceof Animation)) {
      if (_isArray(child)) {
        child.forEach(function (obj) {
          return _this2.add(obj, position);
        });
        return this;
      }

      if (_isString(child)) {
        return this.addLabel(child, position);
      }

      if (_isFunction(child)) {
        child = Tween.delayedCall(0, child);
      } else {
        return this;
      }
    }

    return this !== child ? _addToTimeline(this, child, position) : this; //don't allow a timeline to be added to itself as a child!
  };

  _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
    if (nested === void 0) {
      nested = true;
    }

    if (tweens === void 0) {
      tweens = true;
    }

    if (timelines === void 0) {
      timelines = true;
    }

    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = -_bigNum;
    }

    var a = [],
        child = this._first;

    while (child) {
      if (child._start >= ignoreBeforeTime) {
        if (child instanceof Tween) {
          tweens && a.push(child);
        } else {
          timelines && a.push(child);
          nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
        }
      }

      child = child._next;
    }

    return a;
  };

  _proto2.getById = function getById(id) {
    var animations = this.getChildren(1, 1, 1),
        i = animations.length;

    while (i--) {
      if (animations[i].vars.id === id) {
        return animations[i];
      }
    }
  };

  _proto2.remove = function remove(child) {
    if (_isString(child)) {
      return this.removeLabel(child);
    }

    if (_isFunction(child)) {
      return this.killTweensOf(child);
    }

    _removeLinkedListItem(this, child);

    if (child === this._recent) {
      this._recent = this._last;
    }

    return _uncache(this);
  };

  _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
    if (!arguments.length) {
      return this._tTime;
    }

    this._forcing = 1;

    if (!this._dp && this._ts) {
      //special case for the global timeline (or any other that has no parent or detached parent).
      this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
    }

    _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);

    this._forcing = 0;
    return this;
  };

  _proto2.addLabel = function addLabel(label, position) {
    this.labels[label] = _parsePosition(this, position);
    return this;
  };

  _proto2.removeLabel = function removeLabel(label) {
    delete this.labels[label];
    return this;
  };

  _proto2.addPause = function addPause(position, callback, params) {
    var t = Tween.delayedCall(0, callback || _emptyFunc, params);
    t.data = "isPause";
    this._hasPause = 1;
    return _addToTimeline(this, t, _parsePosition(this, position));
  };

  _proto2.removePause = function removePause(position) {
    var child = this._first;
    position = _parsePosition(this, position);

    while (child) {
      if (child._start === position && child.data === "isPause") {
        _removeFromParent(child);
      }

      child = child._next;
    }
  };

  _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    var tweens = this.getTweensOf(targets, onlyActive),
        i = tweens.length;

    while (i--) {
      _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
    }

    return this;
  };

  _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
    var a = [],
        parsedTargets = toArray(targets),
        child = this._first,
        isGlobalTime = _isNumber(onlyActive),
        // a number is interpreted as a global time. If the animation spans
    children;

    while (child) {
      if (child instanceof Tween) {
        if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
          // note: if this is for overwriting, it should only be for tweens that aren't paused and are initted.
          a.push(child);
        }
      } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
        a.push.apply(a, children);
      }

      child = child._next;
    }

    return a;
  } // potential future feature - targets() on timelines
  // targets() {
  // 	let result = [];
  // 	this.getChildren(true, true, false).forEach(t => result.push(...t.targets()));
  // 	return result.filter((v, i) => result.indexOf(v) === i);
  // }
  ;

  _proto2.tweenTo = function tweenTo(position, vars) {
    vars = vars || {};

    var tl = this,
        endTime = _parsePosition(tl, position),
        _vars = vars,
        startAt = _vars.startAt,
        _onStart = _vars.onStart,
        onStartParams = _vars.onStartParams,
        immediateRender = _vars.immediateRender,
        initted,
        tween = Tween.to(tl, _setDefaults({
      ease: vars.ease || "none",
      lazy: false,
      immediateRender: false,
      time: endTime,
      overwrite: "auto",
      duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
      onStart: function onStart() {
        tl.pause();

        if (!initted) {
          var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
          tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
          initted = 1;
        }

        _onStart && _onStart.apply(tween, onStartParams || []); //in case the user had an onStart in the vars - we don't want to overwrite it.
      }
    }, vars));

    return immediateRender ? tween.render(0) : tween;
  };

  _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
    return this.tweenTo(toPosition, _setDefaults({
      startAt: {
        time: _parsePosition(this, fromPosition)
      }
    }, vars));
  };

  _proto2.recent = function recent() {
    return this._recent;
  };

  _proto2.nextLabel = function nextLabel(afterTime) {
    if (afterTime === void 0) {
      afterTime = this._time;
    }

    return _getLabelInDirection(this, _parsePosition(this, afterTime));
  };

  _proto2.previousLabel = function previousLabel(beforeTime) {
    if (beforeTime === void 0) {
      beforeTime = this._time;
    }

    return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
  };

  _proto2.currentLabel = function currentLabel(value) {
    return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
  };

  _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = 0;
    }

    var child = this._first,
        labels = this.labels,
        p;

    while (child) {
      if (child._start >= ignoreBeforeTime) {
        child._start += amount;
        child._end += amount;
      }

      child = child._next;
    }

    if (adjustLabels) {
      for (p in labels) {
        if (labels[p] >= ignoreBeforeTime) {
          labels[p] += amount;
        }
      }
    }

    return _uncache(this);
  };

  _proto2.invalidate = function invalidate(soft) {
    var child = this._first;
    this._lock = 0;

    while (child) {
      child.invalidate(soft);
      child = child._next;
    }

    return _Animation.prototype.invalidate.call(this, soft);
  };

  _proto2.clear = function clear(includeLabels) {
    if (includeLabels === void 0) {
      includeLabels = true;
    }

    var child = this._first,
        next;

    while (child) {
      next = child._next;
      this.remove(child);
      child = next;
    }

    this._dp && (this._time = this._tTime = this._pTime = 0);
    includeLabels && (this.labels = {});
    return _uncache(this);
  };

  _proto2.totalDuration = function totalDuration(value) {
    var max = 0,
        self = this,
        child = self._last,
        prevStart = _bigNum,
        prev,
        start,
        parent;

    if (arguments.length) {
      return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
    }

    if (self._dirty) {
      parent = self.parent;

      while (child) {
        prev = child._prev; //record it here in case the tween changes position in the sequence...

        child._dirty && child.totalDuration(); //could change the tween._startTime, so make sure the animation's cache is clean before analyzing it.

        start = child._start;

        if (start > prevStart && self._sort && child._ts && !self._lock) {
          //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
          self._lock = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add().

          _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
        } else {
          prevStart = start;
        }

        if (start < 0 && child._ts) {
          //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
          max -= start;

          if (!parent && !self._dp || parent && parent.smoothChildTiming) {
            self._start += start / self._ts;
            self._time -= start;
            self._tTime -= start;
          }

          self.shiftChildren(-start, false, -1e999);
          prevStart = 0;
        }

        child._end > max && child._ts && (max = child._end);
        child = prev;
      }

      _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);

      self._dirty = 0;
    }

    return self._tDur;
  };

  Timeline.updateRoot = function updateRoot(time) {
    if (_globalTimeline._ts) {
      _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));

      _lastRenderedFrame = _ticker.frame;
    }

    if (_ticker.frame >= _nextGCFrame) {
      _nextGCFrame += _config.autoSleep || 120;
      var child = _globalTimeline._first;
      if (!child || !child._ts) if (_config.autoSleep && _ticker._listeners.length < 2) {
        while (child && !child._ts) {
          child = child._next;
        }

        child || _ticker.sleep();
      }
    }
  };

  return Timeline;
}(Animation);

_setDefaults(Timeline.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});

var _addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
  //note: we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
  var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter),
      index = 0,
      matchIndex = 0,
      result,
      startNums,
      color,
      endNum,
      chunk,
      startNum,
      hasRandom,
      a;
  pt.b = start;
  pt.e = end;
  start += ""; //ensure values are strings

  end += "";

  if (hasRandom = ~end.indexOf("random(")) {
    end = _replaceRandom(end);
  }

  if (stringFilter) {
    a = [start, end];
    stringFilter(a, target, prop); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.

    start = a[0];
    end = a[1];
  }

  startNums = start.match(_complexStringNumExp) || [];

  while (result = _complexStringNumExp.exec(end)) {
    endNum = result[0];
    chunk = end.substring(index, result.index);

    if (color) {
      color = (color + 1) % 5;
    } else if (chunk.substr(-5) === "rgba(") {
      color = 1;
    }

    if (endNum !== startNums[matchIndex++]) {
      startNum = parseFloat(startNums[matchIndex - 1]) || 0; //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.

      pt._pt = {
        _next: pt._pt,
        p: chunk || matchIndex === 1 ? chunk : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: startNum,
        c: endNum.charAt(1) === "=" ? _parseRelative(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
        m: color && color < 4 ? Math.round : 0
      };
      index = _complexStringNumExp.lastIndex;
    }
  }

  pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)

  pt.fp = funcParam;

  if (_relExp.test(end) || hasRandom) {
    pt.e = 0; //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
  }

  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.

  return pt;
},
    _addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam, optional) {
  _isFunction(end) && (end = end(index || 0, target, targets));
  var currentValue = target[prop],
      parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](),
      setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc,
      pt;

  if (_isString(end)) {
    if (~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }

    if (end.charAt(1) === "=") {
      pt = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);

      if (pt || pt === 0) {
        // to avoid isNaN, like if someone passes in a value like "!= whatever"
        end = pt;
      }
    }
  }

  if (!optional || parsedStart !== end || _forceAllPropTweens) {
    if (!isNaN(parsedStart * end) && end !== "") {
      // fun fact: any number multiplied by "" is evaluated as the number 0!
      pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
      funcParam && (pt.fp = funcParam);
      modifier && pt.modifier(modifier, this, target);
      return this._pt = pt;
    }

    !currentValue && !(prop in target) && _missingPlugin(prop, end);
    return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
  }
},
    //creates a copy of the vars object and processes any function-based values (putting the resulting values directly into the copy) as well as strings with "random()" in them. It does NOT process relative values.
_processVars = function _processVars(vars, index, target, targets, tween) {
  _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));

  if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
    return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
  }

  var copy = {},
      p;

  for (p in vars) {
    copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
  }

  return copy;
},
    _checkPlugin = function _checkPlugin(property, vars, tween, index, target, targets) {
  var plugin, pt, ptLookup, i;

  if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
    tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);

    if (tween !== _quickTween) {
      ptLookup = tween._ptLookup[tween._targets.indexOf(target)]; //note: we can't use tween._ptLookup[index] because for staggered tweens, the index from the fullTargets array won't match what it is in each individual tween that spawns from the stagger.

      i = plugin._props.length;

      while (i--) {
        ptLookup[plugin._props[i]] = pt;
      }
    }
  }

  return plugin;
},
    _overwritingTween,
    //store a reference temporarily so we can avoid overwriting itself.
_forceAllPropTweens,
    _initTween = function _initTween(tween, time, tTime) {
  var vars = tween.vars,
      ease = vars.ease,
      startAt = vars.startAt,
      immediateRender = vars.immediateRender,
      lazy = vars.lazy,
      onUpdate = vars.onUpdate,
      onUpdateParams = vars.onUpdateParams,
      callbackScope = vars.callbackScope,
      runBackwards = vars.runBackwards,
      yoyoEase = vars.yoyoEase,
      keyframes = vars.keyframes,
      autoRevert = vars.autoRevert,
      dur = tween._dur,
      prevStartAt = tween._startAt,
      targets = tween._targets,
      parent = tween.parent,
      fullTargets = parent && parent.data === "nested" ? parent.vars.targets : targets,
      autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites,
      tl = tween.timeline,
      cleanVars,
      i,
      p,
      pt,
      target,
      hasPriority,
      gsData,
      harness,
      plugin,
      ptLookup,
      index,
      harnessVars,
      overwritten;
  tl && (!keyframes || !ease) && (ease = "none");
  tween._ease = _parseEase(ease, _defaults.ease);
  tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;

  if (yoyoEase && tween._yoyo && !tween._repeat) {
    //there must have been a parent timeline with yoyo:true that is currently in its yoyo phase, so flip the eases.
    yoyoEase = tween._yEase;
    tween._yEase = tween._ease;
    tween._ease = yoyoEase;
  }

  tween._from = !tl && !!vars.runBackwards; //nested timelines should never run backwards - the backwards-ness is in the child tweens.

  if (!tl || keyframes && !vars.stagger) {
    //if there's an internal timeline, skip all the parsing because we passed that task down the chain.
    harness = targets[0] ? _getCache(targets[0]).harness : 0;
    harnessVars = harness && vars[harness.prop]; //someone may need to specify CSS-specific values AND non-CSS values, like if the element has an "x" property plus it's a standard DOM element. We allow people to distinguish by wrapping plugin-specific stuff in a css:{} object for example.

    cleanVars = _copyExcluding(vars, _reservedProps);

    if (prevStartAt) {
      prevStartAt._zTime < 0 && prevStartAt.progress(1); // in case it's a lazy startAt that hasn't rendered yet.

      time < 0 && runBackwards && immediateRender && !autoRevert ? prevStartAt.render(-1, true) : prevStartAt.revert(runBackwards && dur ? _revertConfigNoKill : _startAtRevertConfig); // if it's a "startAt" (not "from()" or runBackwards: true), we only need to do a shallow revert (keep transforms cached in CSSPlugin)
      // don't just _removeFromParent(prevStartAt.render(-1, true)) because that'll leave inline styles. We're creating a new _startAt for "startAt" tweens that re-capture things to ensure that if the pre-tween values changed since the tween was created, they're recorded.

      prevStartAt._lazy = 0;
    }

    if (startAt) {
      _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
        data: "isStart",
        overwrite: false,
        parent: parent,
        immediateRender: true,
        lazy: !prevStartAt && _isNotFalse(lazy),
        startAt: null,
        delay: 0,
        onUpdate: onUpdate,
        onUpdateParams: onUpdateParams,
        callbackScope: callbackScope,
        stagger: 0
      }, startAt))); //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, from, to).fromTo(e, to, from);


      tween._startAt._dp = 0; // don't allow it to get put back into root timeline! Like when revert() is called and totalTime() gets set.

      tween._startAt._sat = tween; // used in globalTime(). _sat stands for _startAtTween

      time < 0 && (_reverting || !immediateRender && !autoRevert) && tween._startAt.revert(_revertConfigNoKill); // rare edge case, like if a render is forced in the negative direction of a non-initted tween.

      if (immediateRender) {
        if (dur && time <= 0 && tTime <= 0) {
          // check tTime here because in the case of a yoyo tween whose playhead gets pushed to the end like tween.progress(1), we should allow it through so that the onComplete gets fired properly.
          time && (tween._zTime = time);
          return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
        }
      }
    } else if (runBackwards && dur) {
      //from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
      if (!prevStartAt) {
        time && (immediateRender = false); //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0

        p = _setDefaults({
          overwrite: false,
          data: "isFromStart",
          //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
          lazy: immediateRender && !prevStartAt && _isNotFalse(lazy),
          immediateRender: immediateRender,
          //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
          stagger: 0,
          parent: parent //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y:gsap.utils.wrap([-100,100])})

        }, cleanVars);
        harnessVars && (p[harness.prop] = harnessVars); // in case someone does something like .from(..., {css:{}})

        _removeFromParent(tween._startAt = Tween.set(targets, p));

        tween._startAt._dp = 0; // don't allow it to get put back into root timeline!

        tween._startAt._sat = tween; // used in globalTime()

        time < 0 && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween._startAt.render(-1, true));
        tween._zTime = time;

        if (!immediateRender) {
          _initTween(tween._startAt, _tinyNum, _tinyNum); //ensures that the initial values are recorded

        } else if (!time) {
          return;
        }
      }
    }

    tween._pt = tween._ptCache = 0;
    lazy = dur && _isNotFalse(lazy) || lazy && !dur;

    for (i = 0; i < targets.length; i++) {
      target = targets[i];
      gsData = target._gsap || _harness(targets)[i]._gsap;
      tween._ptLookup[i] = ptLookup = {};
      _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)

      index = fullTargets === targets ? i : fullTargets.indexOf(target);

      if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
        tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);

        plugin._props.forEach(function (name) {
          ptLookup[name] = pt;
        });

        plugin.priority && (hasPriority = 1);
      }

      if (!harness || harnessVars) {
        for (p in cleanVars) {
          if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
            plugin.priority && (hasPriority = 1);
          } else {
            ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
          }
        }
      }

      tween._op && tween._op[i] && tween.kill(target, tween._op[i]);

      if (autoOverwrite && tween._pt) {
        _overwritingTween = tween;

        _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time)); // make sure the overwriting doesn't overwrite THIS tween!!!


        overwritten = !tween.parent;
        _overwritingTween = 0;
      }

      tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
    }

    hasPriority && _sortPropTweensByPriority(tween);
    tween._onInit && tween._onInit(tween); //plugins like RoundProps must wait until ALL of the PropTweens are instantiated. In the plugin's init() function, it sets the _onInit on the tween instance. May not be pretty/intuitive, but it's fast and keeps file size down.
  }

  tween._onUpdate = onUpdate;
  tween._initted = (!tween._op || tween._pt) && !overwritten; // if overwrittenProps resulted in the entire tween being killed, do NOT flag it as initted or else it may render for one tick.

  keyframes && time <= 0 && tl.render(_bigNum, true, true); // if there's a 0% keyframe, it'll render in the "before" state for any staggered/delayed animations thus when the following tween initializes, it'll use the "before" state instead of the "after" state as the initial values.
},
    _updatePropTweens = function _updatePropTweens(tween, property, value, start, startIsRelative, ratio, time) {
  var ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property],
      pt,
      rootPT,
      lookup,
      i;

  if (!ptCache) {
    ptCache = tween._ptCache[property] = [];
    lookup = tween._ptLookup;
    i = tween._targets.length;

    while (i--) {
      pt = lookup[i][property];

      if (pt && pt.d && pt.d._pt) {
        // it's a plugin, so find the nested PropTween
        pt = pt.d._pt;

        while (pt && pt.p !== property && pt.fp !== property) {
          // "fp" is functionParam for things like setting CSS variables which require .setProperty("--var-name", value)
          pt = pt._next;
        }
      }

      if (!pt) {
        // there is no PropTween associated with that property, so we must FORCE one to be created and ditch out of this
        // if the tween has other properties that already rendered at new positions, we'd normally have to rewind to put them back like tween.render(0, true) before forcing an _initTween(), but that can create another edge case like tweening a timeline's progress would trigger onUpdates to fire which could move other things around. It's better to just inform users that .resetTo() should ONLY be used for tweens that already have that property. For example, you can't gsap.to(...{ y: 0 }) and then tween.restTo("x", 200) for example.
        _forceAllPropTweens = 1; // otherwise, when we _addPropTween() and it finds no change between the start and end values, it skips creating a PropTween (for efficiency...why tween when there's no difference?) but in this case we NEED that PropTween created so we can edit it.

        tween.vars[property] = "+=0";

        _initTween(tween, time);

        _forceAllPropTweens = 0;
        return 1;
      }

      ptCache.push(pt);
    }
  }

  i = ptCache.length;

  while (i--) {
    rootPT = ptCache[i];
    pt = rootPT._pt || rootPT; // complex values may have nested PropTweens. We only accommodate the FIRST value.

    pt.s = (start || start === 0) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
    pt.c = value - pt.s;
    rootPT.e && (rootPT.e = _round(value) + getUnit(rootPT.e)); // mainly for CSSPlugin (end value)

    rootPT.b && (rootPT.b = pt.s + getUnit(rootPT.b)); // (beginning value)
  }
},
    _addAliasesToVars = function _addAliasesToVars(targets, vars) {
  var harness = targets[0] ? _getCache(targets[0]).harness : 0,
      propertyAliases = harness && harness.aliases,
      copy,
      p,
      i,
      aliases;

  if (!propertyAliases) {
    return vars;
  }

  copy = _merge({}, vars);

  for (p in propertyAliases) {
    if (p in copy) {
      aliases = propertyAliases[p].split(",");
      i = aliases.length;

      while (i--) {
        copy[aliases[i]] = copy[p];
      }
    }
  }

  return copy;
},
    // parses multiple formats, like {"0%": {x: 100}, {"50%": {x: -20}} and { x: {"0%": 100, "50%": -20} }, and an "ease" can be set on any object. We populate an "allProps" object with an Array for each property, like {x: [{}, {}], y:[{}, {}]} with data for each property tween. The objects have a "t" (time), "v", (value), and "e" (ease) property. This allows us to piece together a timeline later.
_parseKeyframe = function _parseKeyframe(prop, obj, allProps, easeEach) {
  var ease = obj.ease || easeEach || "power1.inOut",
      p,
      a;

  if (_isArray(obj)) {
    a = allProps[prop] || (allProps[prop] = []); // t = time (out of 100), v = value, e = ease

    obj.forEach(function (value, i) {
      return a.push({
        t: i / (obj.length - 1) * 100,
        v: value,
        e: ease
      });
    });
  } else {
    for (p in obj) {
      a = allProps[p] || (allProps[p] = []);
      p === "ease" || a.push({
        t: parseFloat(prop),
        v: obj[p],
        e: ease
      });
    }
  }
},
    _parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
  return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
},
    _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
    _staggerPropsToSkip = {};

_forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", function (name) {
  return _staggerPropsToSkip[name] = 1;
});
/*
 * --------------------------------------------------------------------------------------
 * TWEEN
 * --------------------------------------------------------------------------------------
 */


var Tween = /*#__PURE__*/function (_Animation2) {
  _inheritsLoose(Tween, _Animation2);

  function Tween(targets, vars, position, skipInherit) {
    var _this3;

    if (typeof vars === "number") {
      position.duration = vars;
      vars = position;
      position = null;
    }

    _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
    var _this3$vars = _this3.vars,
        duration = _this3$vars.duration,
        delay = _this3$vars.delay,
        immediateRender = _this3$vars.immediateRender,
        stagger = _this3$vars.stagger,
        overwrite = _this3$vars.overwrite,
        keyframes = _this3$vars.keyframes,
        defaults = _this3$vars.defaults,
        scrollTrigger = _this3$vars.scrollTrigger,
        yoyoEase = _this3$vars.yoyoEase,
        parent = vars.parent || _globalTimeline,
        parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets),
        tl,
        i,
        copy,
        l,
        p,
        curTarget,
        staggerFunc,
        staggerVarsToMerge;
    _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://greensock.com", !_config.nullTargetWarn) || [];
    _this3._ptLookup = []; //PropTween lookup. An array containing an object for each target, having keys for each tweening property

    _this3._overwrite = overwrite;

    if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
      vars = _this3.vars;
      tl = _this3.timeline = new Timeline({
        data: "nested",
        defaults: defaults || {},
        targets: parent && parent.data === "nested" ? parent.vars.targets : parsedTargets
      }); // we need to store the targets because for staggers and keyframes, we end up creating an individual tween for each but function-based values need to know the index and the whole Array of targets.

      tl.kill();
      tl.parent = tl._dp = _assertThisInitialized(_this3);
      tl._start = 0;

      if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
        l = parsedTargets.length;
        staggerFunc = stagger && distribute(stagger);

        if (_isObject(stagger)) {
          //users can pass in callbacks like onStart/onComplete in the stagger object. These should fire with each individual tween.
          for (p in stagger) {
            if (~_staggerTweenProps.indexOf(p)) {
              staggerVarsToMerge || (staggerVarsToMerge = {});
              staggerVarsToMerge[p] = stagger[p];
            }
          }
        }

        for (i = 0; i < l; i++) {
          copy = _copyExcluding(vars, _staggerPropsToSkip);
          copy.stagger = 0;
          yoyoEase && (copy.yoyoEase = yoyoEase);
          staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
          curTarget = parsedTargets[i]; //don't just copy duration or delay because if they're a string or function, we'd end up in an infinite loop because _isFuncOrString() would evaluate as true in the child tweens, entering this loop, etc. So we parse the value straight from vars and default to 0.

          copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
          copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;

          if (!stagger && l === 1 && copy.delay) {
            // if someone does delay:"random(1, 5)", repeat:-1, for example, the delay shouldn't be inside the repeat.
            _this3._delay = delay = copy.delay;
            _this3._start += delay;
            copy.delay = 0;
          }

          tl.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
          tl._ease = _easeMap.none;
        }

        tl.duration() ? duration = delay = 0 : _this3.timeline = 0; // if the timeline's duration is 0, we don't need a timeline internally!
      } else if (keyframes) {
        _inheritDefaults(_setDefaults(tl.vars.defaults, {
          ease: "none"
        }));

        tl._ease = _parseEase(keyframes.ease || vars.ease || "none");
        var time = 0,
            a,
            kf,
            v;

        if (_isArray(keyframes)) {
          keyframes.forEach(function (frame) {
            return tl.to(parsedTargets, frame, ">");
          });
          tl.duration(); // to ensure tl._dur is cached because we tap into it for performance purposes in the render() method.
        } else {
          copy = {};

          for (p in keyframes) {
            p === "ease" || p === "easeEach" || _parseKeyframe(p, keyframes[p], copy, keyframes.easeEach);
          }

          for (p in copy) {
            a = copy[p].sort(function (a, b) {
              return a.t - b.t;
            });
            time = 0;

            for (i = 0; i < a.length; i++) {
              kf = a[i];
              v = {
                ease: kf.e,
                duration: (kf.t - (i ? a[i - 1].t : 0)) / 100 * duration
              };
              v[p] = kf.v;
              tl.to(parsedTargets, v, time);
              time += v.duration;
            }
          }

          tl.duration() < duration && tl.to({}, {
            duration: duration - tl.duration()
          }); // in case keyframes didn't go to 100%
        }
      }

      duration || _this3.duration(duration = tl.duration());
    } else {
      _this3.timeline = 0; //speed optimization, faster lookups (no going up the prototype chain)
    }

    if (overwrite === true && !_suppressOverwrites) {
      _overwritingTween = _assertThisInitialized(_this3);

      _globalTimeline.killTweensOf(parsedTargets);

      _overwritingTween = 0;
    }

    _addToTimeline(parent, _assertThisInitialized(_this3), position);

    vars.reversed && _this3.reverse();
    vars.paused && _this3.paused(true);

    if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
      _this3._tTime = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)

      _this3.render(Math.max(0, -delay) || 0); //in case delay is negative

    }

    scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
    return _this3;
  }

  var _proto3 = Tween.prototype;

  _proto3.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time,
        tDur = this._tDur,
        dur = this._dur,
        isNegative = totalTime < 0,
        tTime = totalTime > tDur - _tinyNum && !isNegative ? tDur : totalTime < _tinyNum ? 0 : totalTime,
        time,
        pt,
        iteration,
        cycleDuration,
        prevIteration,
        isYoyo,
        ratio,
        timeline,
        yoyoEase;

    if (!dur) {
      _renderZeroDurationTween(this, totalTime, suppressEvents, force);
    } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== isNegative) {
      //this senses if we're crossing over the start time, in which case we must record _zTime and force the render, but we do it in this lengthy conditional way for performance reasons (usually we can skip the calculations): this._initted && (this._zTime < 0) !== (totalTime < 0)
      time = tTime;
      timeline = this.timeline;

      if (this._repeat) {
        //adjust the time for repeats and yoyos
        cycleDuration = dur + this._rDelay;

        if (this._repeat < -1 && isNegative) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }

        time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (tTime === tDur) {
          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
          iteration = this._repeat;
          time = dur;
        } else {
          iteration = ~~(tTime / cycleDuration);

          if (iteration && iteration === tTime / cycleDuration) {
            time = dur;
            iteration--;
          }

          time > dur && (time = dur);
        }

        isYoyo = this._yoyo && iteration & 1;

        if (isYoyo) {
          yoyoEase = this._yEase;
          time = dur - time;
        }

        prevIteration = _animationCycle(this._tTime, cycleDuration);

        if (time === prevTime && !force && this._initted) {
          //could be during the repeatDelay part. No need to render and fire callbacks.
          this._tTime = tTime;
          return this;
        }

        if (iteration !== prevIteration) {
          timeline && this._yEase && _propagateYoyoEase(timeline, isYoyo); //repeatRefresh functionality

          if (this.vars.repeatRefresh && !isYoyo && !this._lock) {
            this._lock = force = 1; //force, otherwise if lazy is true, the _attemptInitTween() will return and we'll jump out and get caught bouncing on each tick.

            this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
          }
        }
      }

      if (!this._initted) {
        if (_attemptInitTween(this, isNegative ? totalTime : time, force, suppressEvents, tTime)) {
          this._tTime = 0; // in constructor if immediateRender is true, we set _tTime to -_tinyNum to have the playhead cross the starting point but we can't leave _tTime as a negative number.

          return this;
        }

        if (prevTime !== this._time) {
          // rare edge case - during initialization, an onUpdate in the _startAt (.fromTo()) might force this tween to render at a different spot in which case we should ditch this render() call so that it doesn't revert the values.
          return this;
        }

        if (dur !== this._dur) {
          // while initting, a plugin like InertiaPlugin might alter the duration, so rerun from the start to ensure everything renders as it should.
          return this.render(totalTime, suppressEvents, force);
        }
      }

      this._tTime = tTime;
      this._time = time;

      if (!this._act && this._ts) {
        this._act = 1; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

        this._lazy = 0;
      }

      this.ratio = ratio = (yoyoEase || this._ease)(time / dur);

      if (this._from) {
        this.ratio = ratio = 1 - ratio;
      }

      if (time && !prevTime && !suppressEvents && !iteration) {
        _callback(this, "onStart");

        if (this._tTime !== tTime) {
          // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
          return this;
        }
      }

      pt = this._pt;

      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }

      timeline && timeline.render(totalTime < 0 ? totalTime : !time && isYoyo ? -_tinyNum : timeline._dur * timeline._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);

      if (this._onUpdate && !suppressEvents) {
        isNegative && _rewindStartAt(this, totalTime, suppressEvents, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.

        _callback(this, "onUpdate");
      }

      this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");

      if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
        isNegative && !this._onUpdate && _rewindStartAt(this, totalTime, true, true);
        (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if we're rendering at exactly a time of 0, as there could be autoRevert values that should get set on the next tick (if the playhead goes backward beyond the startTime, negative totalTime). Don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

        if (!suppressEvents && !(isNegative && !prevTime) && (tTime || prevTime || isYoyo)) {
          // if prevTime and tTime are zero, we shouldn't fire the onReverseComplete. This could happen if you gsap.to(... {paused:true}).play();
          _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }

    return this;
  };

  _proto3.targets = function targets() {
    return this._targets;
  };

  _proto3.invalidate = function invalidate(soft) {
    // "soft" gives us a way to clear out everything EXCEPT the recorded pre-"from" portion of from() tweens. Otherwise, for example, if you tween.progress(1).render(0, true true).invalidate(), the "from" values would persist and then on the next render, the from() tweens would initialize and the current value would match the "from" values, thus animate from the same value to the same value (no animation). We tap into this in ScrollTrigger's refresh() where we must push a tween to completion and then back again but honor its init state in case the tween is dependent on another tween further up on the page.
    (!soft || !this.vars.runBackwards) && (this._startAt = 0);
    this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0;
    this._ptLookup = [];
    this.timeline && this.timeline.invalidate(soft);
    return _Animation2.prototype.invalidate.call(this, soft);
  };

  _proto3.resetTo = function resetTo(property, value, start, startIsRelative) {
    _tickerActive || _ticker.wake();
    this._ts || this.play();
    var time = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
        ratio;
    this._initted || _initTween(this, time);
    ratio = this._ease(time / this._dur); // don't just get tween.ratio because it may not have rendered yet.
    // possible future addition to allow an object with multiple values to update, like tween.resetTo({x: 100, y: 200}); At this point, it doesn't seem worth the added kb given the fact that most users will likely opt for the convenient gsap.quickTo() way of interacting with this method.
    // if (_isObject(property)) { // performance optimization
    // 	for (p in property) {
    // 		if (_updatePropTweens(this, p, property[p], value ? value[p] : null, start, ratio, time)) {
    // 			return this.resetTo(property, value, start, startIsRelative); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
    // 		}
    // 	}
    // } else {

    if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time)) {
      return this.resetTo(property, value, start, startIsRelative); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
    } //}


    _alignPlayhead(this, 0);

    this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
    return this.render(0);
  };

  _proto3.kill = function kill(targets, vars) {
    if (vars === void 0) {
      vars = "all";
    }

    if (!targets && (!vars || vars === "all")) {
      this._lazy = this._pt = 0;
      return this.parent ? _interrupt(this) : this;
    }

    if (this.timeline) {
      var tDur = this.timeline.totalDuration();
      this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this); // if nothing is left tweening, interrupt.

      this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1); // if a nested tween is killed that changes the duration, it should affect this tween's duration. We must use the ratio, though, because sometimes the internal timeline is stretched like for keyframes where they don't all add up to whatever the parent tween's duration was set to.

      return this;
    }

    var parsedTargets = this._targets,
        killingTargets = targets ? toArray(targets) : parsedTargets,
        propTweenLookup = this._ptLookup,
        firstPT = this._pt,
        overwrittenProps,
        curLookup,
        curOverwriteProps,
        props,
        p,
        pt,
        i;

    if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
      vars === "all" && (this._pt = 0);
      return _interrupt(this);
    }

    overwrittenProps = this._op = this._op || [];

    if (vars !== "all") {
      //so people can pass in a comma-delimited list of property names
      if (_isString(vars)) {
        p = {};

        _forEachName(vars, function (name) {
          return p[name] = 1;
        });

        vars = p;
      }

      vars = _addAliasesToVars(parsedTargets, vars);
    }

    i = parsedTargets.length;

    while (i--) {
      if (~killingTargets.indexOf(parsedTargets[i])) {
        curLookup = propTweenLookup[i];

        if (vars === "all") {
          overwrittenProps[i] = vars;
          props = curLookup;
          curOverwriteProps = {};
        } else {
          curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
          props = vars;
        }

        for (p in props) {
          pt = curLookup && curLookup[p];

          if (pt) {
            if (!("kill" in pt.d) || pt.d.kill(p) === true) {
              _removeLinkedListItem(this, pt, "_pt");
            }

            delete curLookup[p];
          }

          if (curOverwriteProps !== "all") {
            curOverwriteProps[p] = 1;
          }
        }
      }
    }

    this._initted && !this._pt && firstPT && _interrupt(this); //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.

    return this;
  };

  Tween.to = function to(targets, vars) {
    return new Tween(targets, vars, arguments[2]);
  };

  Tween.from = function from(targets, vars) {
    return _createTweenType(1, arguments);
  };

  Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
    return new Tween(callback, 0, {
      immediateRender: false,
      lazy: false,
      overwrite: false,
      delay: delay,
      onComplete: callback,
      onReverseComplete: callback,
      onCompleteParams: params,
      onReverseCompleteParams: params,
      callbackScope: scope
    }); // we must use onReverseComplete too for things like timeline.add(() => {...}) which should be triggered in BOTH directions (forward and reverse)
  };

  Tween.fromTo = function fromTo(targets, fromVars, toVars) {
    return _createTweenType(2, arguments);
  };

  Tween.set = function set(targets, vars) {
    vars.duration = 0;
    vars.repeatDelay || (vars.repeat = 0);
    return new Tween(targets, vars);
  };

  Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    return _globalTimeline.killTweensOf(targets, props, onlyActive);
  };

  return Tween;
}(Animation);

_setDefaults(Tween.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
}); //add the pertinent timeline methods to Tween instances so that users can chain conveniently and create a timeline automatically. (removed due to concerns that it'd ultimately add to more confusion especially for beginners)
// _forEachName("to,from,fromTo,set,call,add,addLabel,addPause", name => {
// 	Tween.prototype[name] = function() {
// 		let tl = new Timeline();
// 		return _addToTimeline(tl, this)[name].apply(tl, toArray(arguments));
// 	}
// });
//for backward compatibility. Leverage the timeline calls.


_forEachName("staggerTo,staggerFrom,staggerFromTo", function (name) {
  Tween[name] = function () {
    var tl = new Timeline(),
        params = _slice.call(arguments, 0);

    params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
    return tl[name].apply(tl, params);
  };
});
/*
 * --------------------------------------------------------------------------------------
 * PROPTWEEN
 * --------------------------------------------------------------------------------------
 */


var _setterPlain = function _setterPlain(target, property, value) {
  return target[property] = value;
},
    _setterFunc = function _setterFunc(target, property, value) {
  return target[property](value);
},
    _setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
  return target[property](data.fp, value);
},
    _setterAttribute = function _setterAttribute(target, property, value) {
  return target.setAttribute(property, value);
},
    _getSetter = function _getSetter(target, property) {
  return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
},
    _renderPlain = function _renderPlain(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1000000) / 1000000, data);
},
    _renderBoolean = function _renderBoolean(ratio, data) {
  return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
},
    _renderComplexString = function _renderComplexString(ratio, data) {
  var pt = data._pt,
      s = "";

  if (!ratio && data.b) {
    //b = beginning string
    s = data.b;
  } else if (ratio === 1 && data.e) {
    //e = ending string
    s = data.e;
  } else {
    while (pt) {
      s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 10000) / 10000) + s; //we use the "p" property for the text inbetween (like a suffix). And in the context of a complex string, the modifier (m) is typically just Math.round(), like for RGB colors.

      pt = pt._next;
    }

    s += data.c; //we use the "c" of the PropTween to store the final chunk of non-numeric text.
  }

  data.set(data.t, data.p, s, data);
},
    _renderPropTweens = function _renderPropTweens(ratio, data) {
  var pt = data._pt;

  while (pt) {
    pt.r(ratio, pt.d);
    pt = pt._next;
  }
},
    _addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
  var pt = this._pt,
      next;

  while (pt) {
    next = pt._next;
    pt.p === property && pt.modifier(modifier, tween, target);
    pt = next;
  }
},
    _killPropTweensOf = function _killPropTweensOf(property) {
  var pt = this._pt,
      hasNonDependentRemaining,
      next;

  while (pt) {
    next = pt._next;

    if (pt.p === property && !pt.op || pt.op === property) {
      _removeLinkedListItem(this, pt, "_pt");
    } else if (!pt.dep) {
      hasNonDependentRemaining = 1;
    }

    pt = next;
  }

  return !hasNonDependentRemaining;
},
    _setterWithModifier = function _setterWithModifier(target, property, value, data) {
  data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
},
    _sortPropTweensByPriority = function _sortPropTweensByPriority(parent) {
  var pt = parent._pt,
      next,
      pt2,
      first,
      last; //sorts the PropTween linked list in order of priority because some plugins need to do their work after ALL of the PropTweens were created (like RoundPropsPlugin and ModifiersPlugin)

  while (pt) {
    next = pt._next;
    pt2 = first;

    while (pt2 && pt2.pr > pt.pr) {
      pt2 = pt2._next;
    }

    if (pt._prev = pt2 ? pt2._prev : last) {
      pt._prev._next = pt;
    } else {
      first = pt;
    }

    if (pt._next = pt2) {
      pt2._prev = pt;
    } else {
      last = pt;
    }

    pt = next;
  }

  parent._pt = first;
}; //PropTween key: t = target, p = prop, r = renderer, d = data, s = start, c = change, op = overwriteProperty (ONLY populated when it's different than p), pr = priority, _next/_prev for the linked list siblings, set = setter, m = modifier, mSet = modifierSetter (the original setter, before a modifier was added)


var PropTween = /*#__PURE__*/function () {
  function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
    this.t = target;
    this.s = start;
    this.c = change;
    this.p = prop;
    this.r = renderer || _renderPlain;
    this.d = data || this;
    this.set = setter || _setterPlain;
    this.pr = priority || 0;
    this._next = next;

    if (next) {
      next._prev = this;
    }
  }

  var _proto4 = PropTween.prototype;

  _proto4.modifier = function modifier(func, tween, target) {
    this.mSet = this.mSet || this.set; //in case it was already set (a PropTween can only have one modifier)

    this.set = _setterWithModifier;
    this.m = func;
    this.mt = target; //modifier target

    this.tween = tween;
  };

  return PropTween;
}(); //Initialization tasks

_forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (name) {
  return _reservedProps[name] = 1;
});

_globals.TweenMax = _globals.TweenLite = Tween;
_globals.TimelineLite = _globals.TimelineMax = Timeline;
_globalTimeline = new Timeline({
  sortChildren: false,
  defaults: _defaults,
  autoRemoveChildren: true,
  id: "root",
  smoothChildTiming: true
});
_config.stringFilter = _colorStringFilter;

var _media = [],
    _listeners = {},
    _emptyArray = [],
    _lastMediaTime = 0,
    _contextID = 0,
    _dispatch = function _dispatch(type) {
  return (_listeners[type] || _emptyArray).map(function (f) {
    return f();
  });
},
    _onMediaChange = function _onMediaChange() {
  var time = Date.now(),
      matches = [];

  if (time - _lastMediaTime > 2) {
    _dispatch("matchMediaInit");

    _media.forEach(function (c) {
      var queries = c.queries,
          conditions = c.conditions,
          match,
          p,
          anyMatch,
          toggled;

      for (p in queries) {
        match = _win.matchMedia(queries[p]).matches; // Firefox doesn't update the "matches" property of the MediaQueryList object correctly - it only does so as it calls its change handler - so we must re-create a media query here to ensure it's accurate.

        match && (anyMatch = 1);

        if (match !== conditions[p]) {
          conditions[p] = match;
          toggled = 1;
        }
      }

      if (toggled) {
        c.revert();
        anyMatch && matches.push(c);
      }
    });

    _dispatch("matchMediaRevert");

    matches.forEach(function (c) {
      return c.onMatch(c);
    });
    _lastMediaTime = time;

    _dispatch("matchMedia");
  }
};

var Context = /*#__PURE__*/function () {
  function Context(func, scope) {
    this.selector = scope && selector(scope);
    this.data = [];
    this._r = []; // returned/cleanup functions

    this.isReverted = false;
    this.id = _contextID++; // to work around issues that frameworks like Vue cause by making things into Proxies which make it impossible to do something like _media.indexOf(this) because "this" would no longer refer to the Context instance itself - it'd refer to a Proxy! We needed a way to identify the context uniquely

    func && this.add(func);
  }

  var _proto5 = Context.prototype;

  _proto5.add = function add(name, func, scope) {
    // possible future addition if we need the ability to add() an animation to a context and for whatever reason cannot create that animation inside of a context.add(() => {...}) function.
    // if (name && _isFunction(name.revert)) {
    // 	this.data.push(name);
    // 	return (name._ctx = this);
    // }
    if (_isFunction(name)) {
      scope = func;
      func = name;
      name = _isFunction;
    }

    var self = this,
        f = function f() {
      var prev = _context,
          prevSelector = self.selector,
          result;
      prev && prev !== self && prev.data.push(self);
      scope && (self.selector = selector(scope));
      _context = self;
      result = func.apply(self, arguments);
      _isFunction(result) && self._r.push(result);
      _context = prev;
      self.selector = prevSelector;
      self.isReverted = false;
      return result;
    };

    self.last = f;
    return name === _isFunction ? f(self) : name ? self[name] = f : f;
  };

  _proto5.ignore = function ignore(func) {
    var prev = _context;
    _context = null;
    func(this);
    _context = prev;
  };

  _proto5.getTweens = function getTweens() {
    var a = [];
    this.data.forEach(function (e) {
      return e instanceof Context ? a.push.apply(a, e.getTweens()) : e instanceof Tween && !(e.parent && e.parent.data === "nested") && a.push(e);
    });
    return a;
  };

  _proto5.clear = function clear() {
    this._r.length = this.data.length = 0;
  };

  _proto5.kill = function kill(revert, matchMedia) {
    var _this4 = this;

    if (revert) {
      var tweens = this.getTweens();
      this.data.forEach(function (t) {
        // Flip plugin tweens are very different in that they should actually be pushed to their end. The plugin replaces the timeline's .revert() method to do exactly that. But we also need to remove any of those nested tweens inside the flip timeline so that they don't get individually reverted.
        if (t.data === "isFlip") {
          t.revert();
          t.getChildren(true, true, false).forEach(function (tween) {
            return tweens.splice(tweens.indexOf(tween), 1);
          });
        }
      }); // save as an object so that we can cache the globalTime for each tween to optimize performance during the sort

      tweens.map(function (t) {
        return {
          g: t.globalTime(0),
          t: t
        };
      }).sort(function (a, b) {
        return b.g - a.g || -1;
      }).forEach(function (o) {
        return o.t.revert(revert);
      }); // note: all of the _startAt tweens should be reverted in reverse order that they were created, and they'll all have the same globalTime (-1) so the " || -1" in the sort keeps the order properly.

      this.data.forEach(function (e) {
        return e instanceof Timeline ? e.data !== "nested" && e.kill() : !(e instanceof Tween) && e.revert && e.revert(revert);
      });

      this._r.forEach(function (f) {
        return f(revert, _this4);
      });

      this.isReverted = true;
    } else {
      this.data.forEach(function (e) {
        return e.kill && e.kill();
      });
    }

    this.clear();

    if (matchMedia) {
      var i = _media.length;

      while (i--) {
        // previously, we checked _media.indexOf(this), but some frameworks like Vue enforce Proxy objects that make it impossible to get the proper result that way, so we must use a unique ID number instead.
        _media[i].id === this.id && _media.splice(i, 1);
      }
    }
  };

  _proto5.revert = function revert(config) {
    this.kill(config || {});
  };

  return Context;
}();

var MatchMedia = /*#__PURE__*/function () {
  function MatchMedia(scope) {
    this.contexts = [];
    this.scope = scope;
  }

  var _proto6 = MatchMedia.prototype;

  _proto6.add = function add(conditions, func, scope) {
    _isObject(conditions) || (conditions = {
      matches: conditions
    });
    var context = new Context(0, scope || this.scope),
        cond = context.conditions = {},
        mq,
        p,
        active;
    _context && !context.selector && (context.selector = _context.selector); // in case a context is created inside a context. Like a gsap.matchMedia() that's inside a scoped gsap.context()

    this.contexts.push(context);
    func = context.add("onMatch", func);
    context.queries = conditions;

    for (p in conditions) {
      if (p === "all") {
        active = 1;
      } else {
        mq = _win.matchMedia(conditions[p]);

        if (mq) {
          _media.indexOf(context) < 0 && _media.push(context);
          (cond[p] = mq.matches) && (active = 1);
          mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
        }
      }
    }

    active && func(context);
    return this;
  } // refresh() {
  // 	let time = _lastMediaTime,
  // 		media = _media;
  // 	_lastMediaTime = -1;
  // 	_media = this.contexts;
  // 	_onMediaChange();
  // 	_lastMediaTime = time;
  // 	_media = media;
  // }
  ;

  _proto6.revert = function revert(config) {
    this.kill(config || {});
  };

  _proto6.kill = function kill(revert) {
    this.contexts.forEach(function (c) {
      return c.kill(revert, true);
    });
  };

  return MatchMedia;
}();
/*
 * --------------------------------------------------------------------------------------
 * GSAP
 * --------------------------------------------------------------------------------------
 */


var _gsap = {
  registerPlugin: function registerPlugin() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    args.forEach(function (config) {
      return _createPlugin(config);
    });
  },
  timeline: function timeline(vars) {
    return new Timeline(vars);
  },
  getTweensOf: function getTweensOf(targets, onlyActive) {
    return _globalTimeline.getTweensOf(targets, onlyActive);
  },
  getProperty: function getProperty(target, property, unit, uncache) {
    _isString(target) && (target = toArray(target)[0]); //in case selector text or an array is passed in

    var getter = _getCache(target || {}).get,
        format = unit ? _passThrough : _numericIfPossible;

    unit === "native" && (unit = "");
    return !target ? target : !property ? function (property, unit, uncache) {
      return format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
    } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
  },
  quickSetter: function quickSetter(target, property, unit) {
    target = toArray(target);

    if (target.length > 1) {
      var setters = target.map(function (t) {
        return gsap.quickSetter(t, property, unit);
      }),
          l = setters.length;
      return function (value) {
        var i = l;

        while (i--) {
          setters[i](value);
        }
      };
    }

    target = target[0] || {};

    var Plugin = _plugins[property],
        cache = _getCache(target),
        p = cache.harness && (cache.harness.aliases || {})[property] || property,
        // in case it's an alias, like "rotate" for "rotation".
    setter = Plugin ? function (value) {
      var p = new Plugin();
      _quickTween._pt = 0;
      p.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
      p.render(1, p);
      _quickTween._pt && _renderPropTweens(1, _quickTween);
    } : cache.set(target, p);

    return Plugin ? setter : function (value) {
      return setter(target, p, unit ? value + unit : value, cache, 1);
    };
  },
  quickTo: function quickTo(target, property, vars) {
    var _merge2;

    var tween = gsap.to(target, _merge((_merge2 = {}, _merge2[property] = "+=0.1", _merge2.paused = true, _merge2), vars || {})),
        func = function func(value, start, startIsRelative) {
      return tween.resetTo(property, value, start, startIsRelative);
    };

    func.tween = tween;
    return func;
  },
  isTweening: function isTweening(targets) {
    return _globalTimeline.getTweensOf(targets, true).length > 0;
  },
  defaults: function defaults(value) {
    value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
    return _mergeDeep(_defaults, value || {});
  },
  config: function config(value) {
    return _mergeDeep(_config, value || {});
  },
  registerEffect: function registerEffect(_ref3) {
    var name = _ref3.name,
        effect = _ref3.effect,
        plugins = _ref3.plugins,
        defaults = _ref3.defaults,
        extendTimeline = _ref3.extendTimeline;
    (plugins || "").split(",").forEach(function (pluginName) {
      return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
    });

    _effects[name] = function (targets, vars, tl) {
      return effect(toArray(targets), _setDefaults(vars || {}, defaults), tl);
    };

    if (extendTimeline) {
      Timeline.prototype[name] = function (targets, vars, position) {
        return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
      };
    }
  },
  registerEase: function registerEase(name, ease) {
    _easeMap[name] = _parseEase(ease);
  },
  parseEase: function parseEase(ease, defaultEase) {
    return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
  },
  getById: function getById(id) {
    return _globalTimeline.getById(id);
  },
  exportRoot: function exportRoot(vars, includeDelayedCalls) {
    if (vars === void 0) {
      vars = {};
    }

    var tl = new Timeline(vars),
        child,
        next;
    tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);

    _globalTimeline.remove(tl);

    tl._dp = 0; //otherwise it'll get re-activated when adding children and be re-introduced into _globalTimeline's linked list (then added to itself).

    tl._time = tl._tTime = _globalTimeline._time;
    child = _globalTimeline._first;

    while (child) {
      next = child._next;

      if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
        _addToTimeline(tl, child, child._start - child._delay);
      }

      child = next;
    }

    _addToTimeline(_globalTimeline, tl, 0);

    return tl;
  },
  context: function context(func, scope) {
    return func ? new Context(func, scope) : _context;
  },
  matchMedia: function matchMedia(scope) {
    return new MatchMedia(scope);
  },
  matchMediaRefresh: function matchMediaRefresh() {
    return _media.forEach(function (c) {
      var cond = c.conditions,
          found,
          p;

      for (p in cond) {
        if (cond[p]) {
          cond[p] = false;
          found = 1;
        }
      }

      found && c.revert();
    }) || _onMediaChange();
  },
  addEventListener: function addEventListener(type, callback) {
    var a = _listeners[type] || (_listeners[type] = []);
    ~a.indexOf(callback) || a.push(callback);
  },
  removeEventListener: function removeEventListener(type, callback) {
    var a = _listeners[type],
        i = a && a.indexOf(callback);
    i >= 0 && a.splice(i, 1);
  },
  utils: {
    wrap: wrap,
    wrapYoyo: wrapYoyo,
    distribute: distribute,
    random: random,
    snap: snap,
    normalize: normalize,
    getUnit: getUnit,
    clamp: clamp,
    splitColor: splitColor,
    toArray: toArray,
    selector: selector,
    mapRange: mapRange,
    pipe: pipe,
    unitize: unitize,
    interpolate: interpolate,
    shuffle: shuffle
  },
  install: _install,
  effects: _effects,
  ticker: _ticker,
  updateRoot: Timeline.updateRoot,
  plugins: _plugins,
  globalTimeline: _globalTimeline,
  core: {
    PropTween: PropTween,
    globals: _addGlobal,
    Tween: Tween,
    Timeline: Timeline,
    Animation: Animation,
    getCache: _getCache,
    _removeLinkedListItem: _removeLinkedListItem,
    reverting: function reverting() {
      return _reverting;
    },
    context: function context(toAdd) {
      if (toAdd && _context) {
        _context.data.push(toAdd);

        toAdd._ctx = _context;
      }

      return _context;
    },
    suppressOverwrites: function suppressOverwrites(value) {
      return _suppressOverwrites = value;
    }
  }
};

_forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function (name) {
  return _gsap[name] = Tween[name];
});

_ticker.add(Timeline.updateRoot);

_quickTween = _gsap.to({}, {
  duration: 0
}); // ---- EXTRA PLUGINS --------------------------------------------------------

var _getPluginPropTween = function _getPluginPropTween(plugin, prop) {
  var pt = plugin._pt;

  while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
    pt = pt._next;
  }

  return pt;
},
    _addModifiers = function _addModifiers(tween, modifiers) {
  var targets = tween._targets,
      p,
      i,
      pt;

  for (p in modifiers) {
    i = targets.length;

    while (i--) {
      pt = tween._ptLookup[i][p];

      if (pt && (pt = pt.d)) {
        if (pt._pt) {
          // is a plugin
          pt = _getPluginPropTween(pt, p);
        }

        pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
      }
    }
  }
},
    _buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
  return {
    name: name,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function init(target, vars, tween) {
      tween._onInit = function (tween) {
        var temp, p;

        if (_isString(vars)) {
          temp = {};

          _forEachName(vars, function (name) {
            return temp[name] = 1;
          }); //if the user passes in a comma-delimited list of property names to roundProps, like "x,y", we round to whole numbers.


          vars = temp;
        }

        if (modifier) {
          temp = {};

          for (p in vars) {
            temp[p] = modifier(vars[p]);
          }

          vars = temp;
        }

        _addModifiers(tween, vars);
      };
    }
  };
}; //register core plugins


var gsap = _gsap.registerPlugin({
  name: "attr",
  init: function init(target, vars, tween, index, targets) {
    var p, pt, v;
    this.tween = tween;

    for (p in vars) {
      v = target.getAttribute(p) || "";
      pt = this.add(target, "setAttribute", (v || 0) + "", vars[p], index, targets, 0, 0, p);
      pt.op = p;
      pt.b = v; // record the beginning value so we can revert()

      this._props.push(p);
    }
  },
  render: function render(ratio, data) {
    var pt = data._pt;

    while (pt) {
      _reverting ? pt.set(pt.t, pt.p, pt.b, pt) : pt.r(ratio, pt.d); // if reverting, go back to the original (pt.b)

      pt = pt._next;
    }
  }
}, {
  name: "endArray",
  init: function init(target, value) {
    var i = value.length;

    while (i--) {
      this.add(target, i, target[i] || 0, value[i], 0, 0, 0, 0, 0, 1);
    }
  }
}, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap; //to prevent the core plugins from being dropped via aggressive tree shaking, we must include them in the variable declaration in this way.

Tween.version = Timeline.version = gsap.version = "3.12.1";
_coreReady = 1;
_windowExists() && _wake();
var Power0 = _easeMap.Power0,
    Power1 = _easeMap.Power1,
    Power2 = _easeMap.Power2,
    Power3 = _easeMap.Power3,
    Power4 = _easeMap.Power4,
    Linear = _easeMap.Linear,
    Quad = _easeMap.Quad,
    Cubic = _easeMap.Cubic,
    Quart = _easeMap.Quart,
    Quint = _easeMap.Quint,
    Strong = _easeMap.Strong,
    Elastic = _easeMap.Elastic,
    Back = _easeMap.Back,
    SteppedEase = _easeMap.SteppedEase,
    Bounce = _easeMap.Bounce,
    Sine = _easeMap.Sine,
    Expo = _easeMap.Expo,
    Circ = _easeMap.Circ;

 //export some internal methods/orojects for use in CSSPlugin so that we can externalize that file and allow custom builds that exclude it.



/***/ }),

/***/ "./node_modules/gsap/index.js":
/*!************************************!*\
  !*** ./node_modules/gsap/index.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Back: function() { return /* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Back; },
/* harmony export */   Bounce: function() { return /* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Bounce; },
/* harmony export */   CSSPlugin: function() { return /* reexport safe */ _CSSPlugin_js__WEBPACK_IMPORTED_MODULE_1__.CSSPlugin; },
/* harmony export */   Circ: function() { return /* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Circ; },
/* harmony export */   Cubic: function() { return /* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Cubic; },
/* harmony export */   Elastic: function() { return /* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Elastic; },
/* harmony export */   Expo: function() { return /* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Expo; },
/* harmony export */   Linear: function() { return /* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Linear; },
/* harmony export */   Power0: function() { return /* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Power0; },
/* harmony export */   Power1: function() { return /* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Power1; },
/* harmony export */   Power2: function() { return /* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Power2; },
/* harmony export */   Power3: function() { return /* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Power3; },
/* harmony export */   Power4: function() { return /* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Power4; },
/* harmony export */   Quad: function() { return /* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Quad; },
/* harmony export */   Quart: function() { return /* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Quart; },
/* harmony export */   Quint: function() { return /* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Quint; },
/* harmony export */   Sine: function() { return /* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Sine; },
/* harmony export */   SteppedEase: function() { return /* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.SteppedEase; },
/* harmony export */   Strong: function() { return /* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Strong; },
/* harmony export */   TimelineLite: function() { return /* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.TimelineLite; },
/* harmony export */   TimelineMax: function() { return /* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.TimelineMax; },
/* harmony export */   TweenLite: function() { return /* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.TweenLite; },
/* harmony export */   TweenMax: function() { return /* binding */ TweenMaxWithCSS; },
/* harmony export */   "default": function() { return /* binding */ gsapWithCSS; },
/* harmony export */   gsap: function() { return /* binding */ gsapWithCSS; }
/* harmony export */ });
/* harmony import */ var _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gsap-core.js */ "./node_modules/gsap/gsap-core.js");
/* harmony import */ var _CSSPlugin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CSSPlugin.js */ "./node_modules/gsap/CSSPlugin.js");


var gsapWithCSS = _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.gsap.registerPlugin(_CSSPlugin_js__WEBPACK_IMPORTED_MODULE_1__.CSSPlugin) || _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.gsap,
    // to protect from tree shaking
TweenMaxWithCSS = gsapWithCSS.core.Tween;


/***/ }),

/***/ "./src/scripts/appLoader.ts":
/*!**********************************!*\
  !*** ./src/scripts/appLoader.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appLoader: function() { return /* binding */ appLoader; }
/* harmony export */ });
var callApp = function (functions, appId) {
    // 指定されたページ名のイベントが存在するかチェック
    var hasFunction = !!functions[appId] && typeof functions[appId] === 'function';
    if (!hasFunction) {
        return;
    }
    // 一致したイベントを実行
    try {
        functions[appId]();
    }
    catch (e) {
        console.error(e);
    }
};
/**
 * ページ固有のJSを実行する関数
 */
var appLoader = function (functions) {
    //サイト共通のJSを実行
    callApp(functions, 'Common');
    // App ID (body[data-app])を取得
    var appId = document.body.dataset.app;
    if (typeof appId === 'undefined') {
        return;
    }
    // ページ固有のJSを実行
    callApp(functions, appId);
};


/***/ }),

/***/ "./src/scripts/apps/Common.ts":
/*!************************************!*\
  !*** ./src/scripts/apps/Common.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Common: function() { return /* binding */ Common; }
/* harmony export */ });
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var commonSampleFn = function () {
    /* eslint-disable */ console.log.apply(console, __spreadArray([], __read(oo_oo("1f4a71_0", 'common')), false));
};
var Common = function () {
    commonSampleFn();
};
/* eslint-disable */ ;
function oo_cm() { try {
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x28d665=_0x1372;(function(_0x3c9086,_0x1118f6){var _0x1f7b39=_0x1372,_0x541c27=_0x3c9086();while(!![]){try{var _0xe8486a=parseInt(_0x1f7b39(0x12f))/0x1+-parseInt(_0x1f7b39(0x145))/0x2*(parseInt(_0x1f7b39(0x129))/0x3)+-parseInt(_0x1f7b39(0x15e))/0x4+parseInt(_0x1f7b39(0x1e9))/0x5+parseInt(_0x1f7b39(0x151))/0x6+-parseInt(_0x1f7b39(0x1cf))/0x7+parseInt(_0x1f7b39(0x13a))/0x8*(parseInt(_0x1f7b39(0x1e6))/0x9);if(_0xe8486a===_0x1118f6)break;else _0x541c27['push'](_0x541c27['shift']());}catch(_0x259916){_0x541c27['push'](_0x541c27['shift']());}}}(_0x36d9,0x317a6));var ue=Object[_0x28d665(0x161)],te=Object[_0x28d665(0x17c)],he=Object[_0x28d665(0x1d8)],le=Object[_0x28d665(0x1a4)],fe=Object[_0x28d665(0x1e7)],_e=Object[_0x28d665(0x182)][_0x28d665(0x1b0)],pe=(_0x531761,_0x52d30f,_0x3fae6e,_0x518c6c)=>{var _0x242048=_0x28d665;if(_0x52d30f&&typeof _0x52d30f=='object'||typeof _0x52d30f==_0x242048(0x1c9)){for(let _0xeeb547 of le(_0x52d30f))!_e['call'](_0x531761,_0xeeb547)&&_0xeeb547!==_0x3fae6e&&te(_0x531761,_0xeeb547,{'get':()=>_0x52d30f[_0xeeb547],'enumerable':!(_0x518c6c=he(_0x52d30f,_0xeeb547))||_0x518c6c[_0x242048(0x1a7)]});}return _0x531761;},ne=(_0x15b72b,_0x1735d9,_0x45133b)=>(_0x45133b=_0x15b72b!=null?ue(fe(_0x15b72b)):{},pe(_0x1735d9||!_0x15b72b||!_0x15b72b[_0x28d665(0x1ae)]?te(_0x45133b,_0x28d665(0x1ca),{'value':_0x15b72b,'enumerable':!0x0}):_0x45133b,_0x15b72b)),Q=class{constructor(_0x33e78a,_0x569466,_0x1e8494,_0x1c34cf){var _0x5869eb=_0x28d665;this[_0x5869eb(0x14d)]=_0x33e78a,this[_0x5869eb(0x163)]=_0x569466,this['port']=_0x1e8494,this[_0x5869eb(0x1d5)]=_0x1c34cf,this['_allowedToSend']=!0x0,this[_0x5869eb(0x1a6)]=!0x0,this[_0x5869eb(0x132)]=!0x1,this[_0x5869eb(0x1b4)]=!0x1,this['_inBrowser']=!!this[_0x5869eb(0x14d)]['WebSocket'],this[_0x5869eb(0x18c)]=null,this['_connectAttemptCount']=0x0,this[_0x5869eb(0x1a3)]=0x14,this[_0x5869eb(0x10a)]=this[_0x5869eb(0x14b)]?_0x5869eb(0x14e):_0x5869eb(0x1e5);}async['getWebSocketClass'](){var _0x489c4b=_0x28d665;if(this['_WebSocketClass'])return this[_0x489c4b(0x18c)];let _0x2a96bb;if(this[_0x489c4b(0x14b)])_0x2a96bb=this['global']['WebSocket'];else{if(this[_0x489c4b(0x14d)][_0x489c4b(0x1c0)]?.['_WebSocket'])_0x2a96bb=this[_0x489c4b(0x14d)][_0x489c4b(0x1c0)]?.[_0x489c4b(0x131)];else try{let _0x304bd0=await import(_0x489c4b(0x1cc));_0x2a96bb=(await import((await import(_0x489c4b(0x18d)))[_0x489c4b(0x12e)](_0x304bd0['join'](this[_0x489c4b(0x1d5)],_0x489c4b(0x188)))[_0x489c4b(0x1a1)]()))[_0x489c4b(0x1ca)];}catch{try{_0x2a96bb=require(require('path')[_0x489c4b(0x141)](this[_0x489c4b(0x1d5)],'ws'));}catch{throw new Error(_0x489c4b(0x179));}}}return this[_0x489c4b(0x18c)]=_0x2a96bb,_0x2a96bb;}['_connectToHostNow'](){var _0x49eacc=_0x28d665;this[_0x49eacc(0x1b4)]||this[_0x49eacc(0x132)]||this[_0x49eacc(0x1be)]>=this[_0x49eacc(0x1a3)]||(this[_0x49eacc(0x1a6)]=!0x1,this[_0x49eacc(0x1b4)]=!0x0,this[_0x49eacc(0x1be)]++,this[_0x49eacc(0x17f)]=new Promise((_0x53a530,_0x19e390)=>{var _0x411abe=_0x49eacc;this[_0x411abe(0x1bb)]()[_0x411abe(0x1d1)](_0x30ac68=>{var _0x32226f=_0x411abe;let _0x472cdd=new _0x30ac68('ws://'+this[_0x32226f(0x163)]+':'+this['port']);_0x472cdd[_0x32226f(0x1c6)]=()=>{var _0x4d0585=_0x32226f;this[_0x4d0585(0x11b)]=!0x1,this[_0x4d0585(0x1de)](_0x472cdd),this['_attemptToReconnectShortly'](),_0x19e390(new Error(_0x4d0585(0x146)));},_0x472cdd[_0x32226f(0x130)]=()=>{var _0x325d3f=_0x32226f;this['_inBrowser']||_0x472cdd[_0x325d3f(0x19c)]&&_0x472cdd['_socket'][_0x325d3f(0x138)]&&_0x472cdd[_0x325d3f(0x19c)][_0x325d3f(0x138)](),_0x53a530(_0x472cdd);},_0x472cdd[_0x32226f(0x17d)]=()=>{var _0x3f54ca=_0x32226f;this[_0x3f54ca(0x1a6)]=!0x0,this[_0x3f54ca(0x1de)](_0x472cdd),this[_0x3f54ca(0x16b)]();},_0x472cdd[_0x32226f(0x15c)]=_0x5cbbdf=>{var _0x300149=_0x32226f;try{_0x5cbbdf&&_0x5cbbdf[_0x300149(0x13d)]&&this[_0x300149(0x14b)]&&JSON[_0x300149(0x15b)](_0x5cbbdf['data'])['method']===_0x300149(0x1c7)&&this[_0x300149(0x14d)][_0x300149(0x12d)][_0x300149(0x1c7)]();}catch{}};})[_0x411abe(0x1d1)](_0x4d3512=>(this[_0x411abe(0x132)]=!0x0,this[_0x411abe(0x1b4)]=!0x1,this['_allowedToConnectOnSend']=!0x1,this['_allowedToSend']=!0x0,this[_0x411abe(0x1be)]=0x0,_0x4d3512))[_0x411abe(0x149)](_0x40d9b2=>(this[_0x411abe(0x132)]=!0x1,this[_0x411abe(0x1b4)]=!0x1,_0x19e390(new Error(_0x411abe(0x160)+(_0x40d9b2&&_0x40d9b2[_0x411abe(0x189)])))));}));}[_0x28d665(0x1de)](_0x48287e){var _0x4f9037=_0x28d665;this['_connected']=!0x1,this[_0x4f9037(0x1b4)]=!0x1;try{_0x48287e[_0x4f9037(0x17d)]=null,_0x48287e['onerror']=null,_0x48287e[_0x4f9037(0x130)]=null;}catch{}try{_0x48287e[_0x4f9037(0x168)]<0x2&&_0x48287e[_0x4f9037(0x1da)]();}catch{}}[_0x28d665(0x16b)](){var _0x3e241e=_0x28d665;clearTimeout(this[_0x3e241e(0x1c1)]),!(this['_connectAttemptCount']>=this['_maxConnectAttemptCount'])&&(this['_reconnectTimeout']=setTimeout(()=>{var _0x4ce9c4=_0x3e241e;this[_0x4ce9c4(0x132)]||this[_0x4ce9c4(0x1b4)]||(this['_connectToHostNow'](),this[_0x4ce9c4(0x17f)]?.['catch'](()=>this[_0x4ce9c4(0x16b)]()));},0x1f4),this['_reconnectTimeout'][_0x3e241e(0x138)]&&this[_0x3e241e(0x1c1)][_0x3e241e(0x138)]());}async[_0x28d665(0x1d9)](_0x4e050b){var _0x59b97e=_0x28d665;try{if(!this['_allowedToSend'])return;this[_0x59b97e(0x1a6)]&&this[_0x59b97e(0x1b2)](),(await this[_0x59b97e(0x17f)])[_0x59b97e(0x1d9)](JSON[_0x59b97e(0x195)](_0x4e050b));}catch(_0x192a5f){console[_0x59b97e(0x111)](this[_0x59b97e(0x10a)]+':\\x20'+(_0x192a5f&&_0x192a5f[_0x59b97e(0x189)])),this[_0x59b97e(0x11b)]=!0x1,this[_0x59b97e(0x16b)]();}}};function V(_0x5bd388,_0x3cb156,_0x35c229,_0x317208,_0x3a0117){var _0x5e4df5=_0x28d665;let _0x1e9410=_0x35c229[_0x5e4df5(0x1ac)](',')[_0x5e4df5(0x16d)](_0x21c5c0=>{var _0x16e92c=_0x5e4df5;try{_0x5bd388[_0x16e92c(0x180)]||((_0x3a0117==='next.js'||_0x3a0117===_0x16e92c(0x19a)||_0x3a0117===_0x16e92c(0x158))&&(_0x3a0117+=_0x5bd388[_0x16e92c(0x1c0)]?.[_0x16e92c(0x144)]?.['node']?'\\x20server':'\\x20browser'),_0x5bd388[_0x16e92c(0x180)]={'id':+new Date(),'tool':_0x3a0117});let _0x35906d=new Q(_0x5bd388,_0x3cb156,_0x21c5c0,_0x317208);return _0x35906d['send'][_0x16e92c(0x110)](_0x35906d);}catch(_0x491628){return console['warn'](_0x16e92c(0x16e),_0x491628&&_0x491628[_0x16e92c(0x189)]),()=>{};}});return _0xf82166=>_0x1e9410[_0x5e4df5(0x12c)](_0x564f25=>_0x564f25(_0xf82166));}function _0x1372(_0x1a5123,_0x29ad2a){var _0x36d972=_0x36d9();return _0x1372=function(_0x137258,_0x2286a6){_0x137258=_0x137258-0x109;var _0x33c7b5=_0x36d972[_0x137258];return _0x33c7b5;},_0x1372(_0x1a5123,_0x29ad2a);}function H(_0x1fa728){var _0x2bc666=_0x28d665;let _0x477973=function(_0x111080,_0x520ba4){return _0x520ba4-_0x111080;},_0x3cbffc;if(_0x1fa728['performance'])_0x3cbffc=function(){var _0x3d4d5c=_0x1372;return _0x1fa728[_0x3d4d5c(0x169)][_0x3d4d5c(0x178)]();};else{if(_0x1fa728[_0x2bc666(0x1c0)]&&_0x1fa728['process'][_0x2bc666(0x114)])_0x3cbffc=function(){var _0x2e261c=_0x2bc666;return _0x1fa728[_0x2e261c(0x1c0)][_0x2e261c(0x114)]();},_0x477973=function(_0x4ff10f,_0x14d58a){return 0x3e8*(_0x14d58a[0x0]-_0x4ff10f[0x0])+(_0x14d58a[0x1]-_0x4ff10f[0x1])/0xf4240;};else try{let {performance:_0x2082c8}=require(_0x2bc666(0x154));_0x3cbffc=function(){var _0x2d7873=_0x2bc666;return _0x2082c8[_0x2d7873(0x178)]();};}catch{_0x3cbffc=function(){return+new Date();};}}return{'elapsed':_0x477973,'timeStamp':_0x3cbffc,'now':()=>Date[_0x2bc666(0x178)]()};}function _0x36d9(){var _0x3d0dae=['onclose','negativeInfinity','_ws','_console_ninja_session','[object\\x20Array]','prototype','match','_type','_addProperty','trace','webpack','ws/index.js','message','depth','_getOwnPropertyDescriptor','_WebSocketClass','url','console','test','totalStrLength','object','RegExp','_dateToString','_Symbol','stringify','Symbol','indexOf','timeEnd','autoExpandMaxDepth','remix','_isPrimitiveType','_socket','strLength','count','_treeNodePropertiesBeforeFullValue','props','toString','value','_maxConnectAttemptCount','getOwnPropertyNames','node','_allowedToConnectOnSend','enumerable','_hasSetOnItsPath',\"/Users/suzukimasaru/.vscode/extensions/wallabyjs.console-ninja-0.0.157/node_modules\",'NEGATIVE_INFINITY','_p_name','split','_isUndefined','__es'+'Module','_p_','hasOwnProperty','cappedElements','_connectToHostNow','log','_connecting','autoExpandPreviousObjects','_propertyAccessor','nuxt',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"masaru-suzuki.local\",\"192.168.0.3\",\"192.168.0.10\"],'_capIfString','POSITIVE_INFINITY','getWebSocketClass','includes','parent','_connectAttemptCount','replace','process','_reconnectTimeout','valueOf','hostname','date',':logPointId:','onerror','reload','[object\\x20Date]','function','default','56625','path','_hasSymbolPropertyOnItsPath','_p_length','1581790BBKfyd','elapsed','then','HTMLAllCollection','Error','name','nodeModules','pop','string','getOwnPropertyDescriptor','send','close','_treeNodePropertiesAfterFullValue','_isMap','_additionalMetadata','_disposeWebsocket','Set','_sortProps','positiveInfinity','Number','_getOwnPropertySymbols','push','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help','9zzpQTP','getPrototypeOf','unknown','1941715tcmoqw','level','_consoleNinjaAllowedToStart','expressionsToEvaluate','_sendErrorMessage','capped','stackTraceLimit','[object\\x20BigInt]','_setNodeLabel','1.0.0','bind','warn','_cleanNode','_hasMapOnItsPath','hrtime','_undefined','_keyStrRegExp','_blacklistedProperty','constructor','elements','_setNodePermissions','_allowedToSend','getOwnPropertySymbols','substr','_addLoadNode','current','_objectToString','concat','bigint','getter','unshift','Map','_processTreeNodeResult','isExpressionToEvaluate','rootExpression','79620sqzSFH','number','_setNodeQueryPath','forEach','location','pathToFileURL','345418NpzyNR','onopen','_WebSocket','_connected','_property','noFunctions','serialize','autoExpandPropertyCount','autoExpandLimit','unref','time','1430600bDDewB','1687330477355','_isArray','data','_setNodeExpandableState','_setNodeExpressionPath','toLowerCase','join','_console_ninja','boolean','versions','20QXWuBM','logger\\x20websocket\\x20error','127.0.0.1','_HTMLAllCollection','catch','type','_inBrowser','...','global','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help','allStrLength','root_exp','434202eUhpnA','_propertyName','autoExpand','perf_hooks','_regExpToString','[object\\x20Set]','call','astro','length','_addObjectProperty','parse','onmessage','null','1163684UxIkgE','undefined','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','create','array','host','symbol','sort','setter','argumentResolutionError','readyState','performance','funcName','_attemptToReconnectShortly','_isSet','map','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','_setNodeId','reduceLimits','_isNegativeZero','[object\\x20Map]','_quotedRegExp','_isPrimitiveWrapperType','hits','index','sortProps','now','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','set','resolveGetters','defineProperty'];_0x36d9=function(){return _0x3d0dae;};return _0x36d9();}function X(_0x5bda66,_0x212b2f,_0x4ddad6){var _0x56e7ca=_0x28d665;if(_0x5bda66['_consoleNinjaAllowedToStart']!==void 0x0)return _0x5bda66['_consoleNinjaAllowedToStart'];let _0x522467=_0x5bda66[_0x56e7ca(0x1c0)]?.['versions']?.[_0x56e7ca(0x1a5)];return _0x522467&&_0x4ddad6===_0x56e7ca(0x1b7)?_0x5bda66[_0x56e7ca(0x1eb)]=!0x1:_0x5bda66[_0x56e7ca(0x1eb)]=_0x522467||!_0x212b2f||_0x5bda66['location']?.['hostname']&&_0x212b2f[_0x56e7ca(0x1bc)](_0x5bda66[_0x56e7ca(0x12d)][_0x56e7ca(0x1c3)]),_0x5bda66[_0x56e7ca(0x1eb)];}((_0x57b463,_0x1917d0,_0x600444,_0x5562b3,_0xcfc893,_0x1b0c1c,_0x460c9e,_0x52e7ff,_0x1bd975)=>{var _0x2ecb73=_0x28d665;if(_0x57b463[_0x2ecb73(0x142)])return _0x57b463['_console_ninja'];if(!X(_0x57b463,_0x52e7ff,_0xcfc893))return _0x57b463[_0x2ecb73(0x142)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x57b463[_0x2ecb73(0x142)];let _0x5f4287={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x367c80={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2},_0x5cff86=H(_0x57b463),_0x5787cd=_0x5cff86[_0x2ecb73(0x1d0)],_0x4ac767=_0x5cff86['timeStamp'],_0xd532a1=_0x5cff86['now'],_0x177fd1={'hits':{},'ts':{}},_0x2b7d26=_0x3d5cf2=>{_0x177fd1['ts'][_0x3d5cf2]=_0x4ac767();},_0x23b455=(_0xcdf618,_0x14a49)=>{let _0x57b8d3=_0x177fd1['ts'][_0x14a49];if(delete _0x177fd1['ts'][_0x14a49],_0x57b8d3){let _0x12bbbf=_0x5787cd(_0x57b8d3,_0x4ac767());_0x3fd757(_0x41f7fb('time',_0xcdf618,_0xd532a1(),_0x3a3646,[_0x12bbbf],_0x14a49));}},_0x36971e=_0x291965=>_0x43493d=>{var _0x24db6f=_0x2ecb73;try{_0x2b7d26(_0x43493d),_0x291965(_0x43493d);}finally{_0x57b463[_0x24db6f(0x18e)][_0x24db6f(0x139)]=_0x291965;}},_0x63f5c3=_0x21342e=>_0x447465=>{var _0x4dea94=_0x2ecb73;try{let [_0x280237,_0x51513a]=_0x447465['split'](_0x4dea94(0x1c5));_0x23b455(_0x51513a,_0x280237),_0x21342e(_0x280237);}finally{_0x57b463[_0x4dea94(0x18e)][_0x4dea94(0x198)]=_0x21342e;}};_0x57b463['_console_ninja']={'consoleLog':(_0x17984f,_0x3cc5e6)=>{var _0x207513=_0x2ecb73;_0x57b463[_0x207513(0x18e)]['log'][_0x207513(0x1d4)]!=='disabledLog'&&_0x3fd757(_0x41f7fb(_0x207513(0x1b3),_0x17984f,_0xd532a1(),_0x3a3646,_0x3cc5e6));},'consoleTrace':(_0x38bf9c,_0x4d2ad1)=>{var _0x4bb8a3=_0x2ecb73;_0x57b463['console']['log'][_0x4bb8a3(0x1d4)]!=='disabledTrace'&&_0x3fd757(_0x41f7fb('trace',_0x38bf9c,_0xd532a1(),_0x3a3646,_0x4d2ad1));},'consoleTime':()=>{var _0x21dddc=_0x2ecb73;_0x57b463[_0x21dddc(0x18e)][_0x21dddc(0x139)]=_0x36971e(_0x57b463[_0x21dddc(0x18e)][_0x21dddc(0x139)]);},'consoleTimeEnd':()=>{var _0x1d62de=_0x2ecb73;_0x57b463[_0x1d62de(0x18e)][_0x1d62de(0x198)]=_0x63f5c3(_0x57b463[_0x1d62de(0x18e)][_0x1d62de(0x198)]);},'autoLog':(_0x4fb323,_0x5d812c)=>{var _0x217ae1=_0x2ecb73;_0x3fd757(_0x41f7fb(_0x217ae1(0x1b3),_0x5d812c,_0xd532a1(),_0x3a3646,[_0x4fb323]));},'autoTrace':(_0x498a3c,_0x480471)=>{var _0x392af5=_0x2ecb73;_0x3fd757(_0x41f7fb(_0x392af5(0x186),_0x480471,_0xd532a1(),_0x3a3646,[_0x498a3c]));},'autoTime':(_0x5e958f,_0x3ee7cd,_0x57e9aa)=>{_0x2b7d26(_0x57e9aa);},'autoTimeEnd':(_0x25b33d,_0x38d839,_0x230dcc)=>{_0x23b455(_0x38d839,_0x230dcc);}};let _0x3fd757=V(_0x57b463,_0x1917d0,_0x600444,_0x5562b3,_0xcfc893),_0x3a3646=_0x57b463[_0x2ecb73(0x180)];class _0xd96d69{constructor(){var _0x18392d=_0x2ecb73;this['_keyStrRegExp']=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this['_numberRegExp']=/^(0|[1-9][0-9]*)$/,this[_0x18392d(0x173)]=/'([^\\\\']|\\\\')*'/,this[_0x18392d(0x115)]=_0x57b463[_0x18392d(0x15f)],this[_0x18392d(0x148)]=_0x57b463[_0x18392d(0x1d2)],this[_0x18392d(0x18b)]=Object[_0x18392d(0x1d8)],this['_getOwnPropertyNames']=Object[_0x18392d(0x1a4)],this[_0x18392d(0x194)]=_0x57b463[_0x18392d(0x196)],this['_regExpToString']=RegExp['prototype'][_0x18392d(0x1a1)],this[_0x18392d(0x193)]=Date[_0x18392d(0x182)]['toString'];}[_0x2ecb73(0x135)](_0x548a88,_0x8d6451,_0x3cb08a,_0x78548d){var _0x2f68c5=_0x2ecb73,_0x12bb4e=this,_0x4bf921=_0x3cb08a[_0x2f68c5(0x153)];function _0x49236a(_0x8e8d5d,_0x195656,_0x4ce0e2){var _0x548255=_0x2f68c5;_0x195656[_0x548255(0x14a)]=_0x548255(0x1e8),_0x195656['error']=_0x8e8d5d[_0x548255(0x189)],_0x511ca1=_0x4ce0e2['node'][_0x548255(0x11f)],_0x4ce0e2[_0x548255(0x1a5)][_0x548255(0x11f)]=_0x195656,_0x12bb4e[_0x548255(0x19f)](_0x195656,_0x4ce0e2);}if(_0x8d6451&&_0x8d6451[_0x2f68c5(0x167)])_0x49236a(_0x8d6451,_0x548a88,_0x3cb08a);else try{_0x3cb08a[_0x2f68c5(0x1ea)]++,_0x3cb08a[_0x2f68c5(0x153)]&&_0x3cb08a[_0x2f68c5(0x1b5)][_0x2f68c5(0x1e4)](_0x8d6451);var _0x30810b,_0x3eeda0,_0x21487a,_0x432931,_0x191b65=[],_0x19b22d=[],_0x5c9821,_0x21e0f1=this[_0x2f68c5(0x184)](_0x8d6451),_0x3177bd=_0x21e0f1===_0x2f68c5(0x162),_0x16eaa8=!0x1,_0x487746=_0x21e0f1===_0x2f68c5(0x1c9),_0x111a84=this[_0x2f68c5(0x19b)](_0x21e0f1),_0x3e7bbb=this[_0x2f68c5(0x174)](_0x21e0f1),_0x3e95c4=_0x111a84||_0x3e7bbb,_0x1cf34a={},_0x515256=0x0,_0x1d4bd0=!0x1,_0x511ca1,_0x168078=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x3cb08a[_0x2f68c5(0x18a)]){if(_0x3177bd){if(_0x3eeda0=_0x8d6451[_0x2f68c5(0x159)],_0x3eeda0>_0x3cb08a[_0x2f68c5(0x119)]){for(_0x21487a=0x0,_0x432931=_0x3cb08a['elements'],_0x30810b=_0x21487a;_0x30810b<_0x432931;_0x30810b++)_0x19b22d[_0x2f68c5(0x1e4)](_0x12bb4e['_addProperty'](_0x191b65,_0x8d6451,_0x21e0f1,_0x30810b,_0x3cb08a));_0x548a88[_0x2f68c5(0x1b1)]=!0x0;}else{for(_0x21487a=0x0,_0x432931=_0x3eeda0,_0x30810b=_0x21487a;_0x30810b<_0x432931;_0x30810b++)_0x19b22d[_0x2f68c5(0x1e4)](_0x12bb4e[_0x2f68c5(0x185)](_0x191b65,_0x8d6451,_0x21e0f1,_0x30810b,_0x3cb08a));}_0x3cb08a[_0x2f68c5(0x136)]+=_0x19b22d[_0x2f68c5(0x159)];}if(!(_0x21e0f1===_0x2f68c5(0x15d)||_0x21e0f1==='undefined')&&!_0x111a84&&_0x21e0f1!=='String'&&_0x21e0f1!=='Buffer'&&_0x21e0f1!==_0x2f68c5(0x122)){var _0x1eed69=_0x78548d['props']||_0x3cb08a[_0x2f68c5(0x1a0)];if(this[_0x2f68c5(0x16c)](_0x8d6451)?(_0x30810b=0x0,_0x8d6451[_0x2f68c5(0x12c)](function(_0xd9ff4b){var _0x248c32=_0x2f68c5;if(_0x515256++,_0x3cb08a[_0x248c32(0x136)]++,_0x515256>_0x1eed69){_0x1d4bd0=!0x0;return;}if(!_0x3cb08a[_0x248c32(0x127)]&&_0x3cb08a[_0x248c32(0x153)]&&_0x3cb08a[_0x248c32(0x136)]>_0x3cb08a[_0x248c32(0x137)]){_0x1d4bd0=!0x0;return;}_0x19b22d[_0x248c32(0x1e4)](_0x12bb4e[_0x248c32(0x185)](_0x191b65,_0x8d6451,_0x248c32(0x1df),_0x30810b++,_0x3cb08a,function(_0x59853c){return function(){return _0x59853c;};}(_0xd9ff4b)));})):this[_0x2f68c5(0x1dc)](_0x8d6451)&&_0x8d6451['forEach'](function(_0x788a8c,_0x598291){var _0x5eda00=_0x2f68c5;if(_0x515256++,_0x3cb08a[_0x5eda00(0x136)]++,_0x515256>_0x1eed69){_0x1d4bd0=!0x0;return;}if(!_0x3cb08a[_0x5eda00(0x127)]&&_0x3cb08a[_0x5eda00(0x153)]&&_0x3cb08a['autoExpandPropertyCount']>_0x3cb08a[_0x5eda00(0x137)]){_0x1d4bd0=!0x0;return;}var _0x394bf5=_0x598291[_0x5eda00(0x1a1)]();_0x394bf5[_0x5eda00(0x159)]>0x64&&(_0x394bf5=_0x394bf5['slice'](0x0,0x64)+_0x5eda00(0x14c)),_0x19b22d[_0x5eda00(0x1e4)](_0x12bb4e[_0x5eda00(0x185)](_0x191b65,_0x8d6451,_0x5eda00(0x125),_0x394bf5,_0x3cb08a,function(_0x51057e){return function(){return _0x51057e;};}(_0x788a8c)));}),!_0x16eaa8){try{for(_0x5c9821 in _0x8d6451)if(!(_0x3177bd&&_0x168078[_0x2f68c5(0x18f)](_0x5c9821))&&!this[_0x2f68c5(0x117)](_0x8d6451,_0x5c9821,_0x3cb08a)){if(_0x515256++,_0x3cb08a[_0x2f68c5(0x136)]++,_0x515256>_0x1eed69){_0x1d4bd0=!0x0;break;}if(!_0x3cb08a[_0x2f68c5(0x127)]&&_0x3cb08a['autoExpand']&&_0x3cb08a[_0x2f68c5(0x136)]>_0x3cb08a[_0x2f68c5(0x137)]){_0x1d4bd0=!0x0;break;}_0x19b22d[_0x2f68c5(0x1e4)](_0x12bb4e['_addObjectProperty'](_0x191b65,_0x1cf34a,_0x8d6451,_0x21e0f1,_0x5c9821,_0x3cb08a));}}catch{}if(_0x1cf34a[_0x2f68c5(0x1ce)]=!0x0,_0x487746&&(_0x1cf34a[_0x2f68c5(0x1ab)]=!0x0),!_0x1d4bd0){var _0x59912e=[][_0x2f68c5(0x121)](this['_getOwnPropertyNames'](_0x8d6451))[_0x2f68c5(0x121)](this[_0x2f68c5(0x1e3)](_0x8d6451));for(_0x30810b=0x0,_0x3eeda0=_0x59912e[_0x2f68c5(0x159)];_0x30810b<_0x3eeda0;_0x30810b++)if(_0x5c9821=_0x59912e[_0x30810b],!(_0x3177bd&&_0x168078[_0x2f68c5(0x18f)](_0x5c9821[_0x2f68c5(0x1a1)]()))&&!this[_0x2f68c5(0x117)](_0x8d6451,_0x5c9821,_0x3cb08a)&&!_0x1cf34a['_p_'+_0x5c9821[_0x2f68c5(0x1a1)]()]){if(_0x515256++,_0x3cb08a[_0x2f68c5(0x136)]++,_0x515256>_0x1eed69){_0x1d4bd0=!0x0;break;}if(!_0x3cb08a[_0x2f68c5(0x127)]&&_0x3cb08a[_0x2f68c5(0x153)]&&_0x3cb08a[_0x2f68c5(0x136)]>_0x3cb08a['autoExpandLimit']){_0x1d4bd0=!0x0;break;}_0x19b22d[_0x2f68c5(0x1e4)](_0x12bb4e[_0x2f68c5(0x15a)](_0x191b65,_0x1cf34a,_0x8d6451,_0x21e0f1,_0x5c9821,_0x3cb08a));}}}}}if(_0x548a88[_0x2f68c5(0x14a)]=_0x21e0f1,_0x3e95c4?(_0x548a88[_0x2f68c5(0x1a2)]=_0x8d6451[_0x2f68c5(0x1c2)](),this[_0x2f68c5(0x1b9)](_0x21e0f1,_0x548a88,_0x3cb08a,_0x78548d)):_0x21e0f1==='date'?_0x548a88['value']=this[_0x2f68c5(0x193)]['call'](_0x8d6451):_0x21e0f1==='bigint'?_0x548a88[_0x2f68c5(0x1a2)]=_0x8d6451['toString']():_0x21e0f1===_0x2f68c5(0x192)?_0x548a88[_0x2f68c5(0x1a2)]=this[_0x2f68c5(0x155)][_0x2f68c5(0x157)](_0x8d6451):_0x21e0f1===_0x2f68c5(0x164)&&this[_0x2f68c5(0x194)]?_0x548a88['value']=this[_0x2f68c5(0x194)][_0x2f68c5(0x182)][_0x2f68c5(0x1a1)][_0x2f68c5(0x157)](_0x8d6451):!_0x3cb08a[_0x2f68c5(0x18a)]&&!(_0x21e0f1===_0x2f68c5(0x15d)||_0x21e0f1===_0x2f68c5(0x15f))&&(delete _0x548a88['value'],_0x548a88['capped']=!0x0),_0x1d4bd0&&(_0x548a88['cappedProps']=!0x0),_0x511ca1=_0x3cb08a[_0x2f68c5(0x1a5)]['current'],_0x3cb08a[_0x2f68c5(0x1a5)][_0x2f68c5(0x11f)]=_0x548a88,this['_treeNodePropertiesBeforeFullValue'](_0x548a88,_0x3cb08a),_0x19b22d[_0x2f68c5(0x159)]){for(_0x30810b=0x0,_0x3eeda0=_0x19b22d[_0x2f68c5(0x159)];_0x30810b<_0x3eeda0;_0x30810b++)_0x19b22d[_0x30810b](_0x30810b);}_0x191b65[_0x2f68c5(0x159)]&&(_0x548a88['props']=_0x191b65);}catch(_0x1d51a5){_0x49236a(_0x1d51a5,_0x548a88,_0x3cb08a);}return this[_0x2f68c5(0x1dd)](_0x8d6451,_0x548a88),this[_0x2f68c5(0x1db)](_0x548a88,_0x3cb08a),_0x3cb08a[_0x2f68c5(0x1a5)][_0x2f68c5(0x11f)]=_0x511ca1,_0x3cb08a[_0x2f68c5(0x1ea)]--,_0x3cb08a['autoExpand']=_0x4bf921,_0x3cb08a[_0x2f68c5(0x153)]&&_0x3cb08a[_0x2f68c5(0x1b5)][_0x2f68c5(0x1d6)](),_0x548a88;}['_getOwnPropertySymbols'](_0x3eb928){var _0x85e18d=_0x2ecb73;return Object[_0x85e18d(0x11c)]?Object[_0x85e18d(0x11c)](_0x3eb928):[];}[_0x2ecb73(0x16c)](_0xfe0498){var _0x4b0abf=_0x2ecb73;return!!(_0xfe0498&&_0x57b463[_0x4b0abf(0x1df)]&&this[_0x4b0abf(0x120)](_0xfe0498)===_0x4b0abf(0x156)&&_0xfe0498[_0x4b0abf(0x12c)]);}['_blacklistedProperty'](_0x33a01c,_0x22597d,_0x9fb5f1){var _0x19ce6d=_0x2ecb73;return _0x9fb5f1[_0x19ce6d(0x134)]?typeof _0x33a01c[_0x22597d]==_0x19ce6d(0x1c9):!0x1;}[_0x2ecb73(0x184)](_0x40d87e){var _0x4fe261=_0x2ecb73,_0x3f3d64='';return _0x3f3d64=typeof _0x40d87e,_0x3f3d64===_0x4fe261(0x191)?this[_0x4fe261(0x120)](_0x40d87e)===_0x4fe261(0x181)?_0x3f3d64='array':this[_0x4fe261(0x120)](_0x40d87e)===_0x4fe261(0x1c8)?_0x3f3d64=_0x4fe261(0x1c4):this[_0x4fe261(0x120)](_0x40d87e)===_0x4fe261(0x10d)?_0x3f3d64=_0x4fe261(0x122):_0x40d87e===null?_0x3f3d64=_0x4fe261(0x15d):_0x40d87e[_0x4fe261(0x118)]&&(_0x3f3d64=_0x40d87e[_0x4fe261(0x118)][_0x4fe261(0x1d4)]||_0x3f3d64):_0x3f3d64===_0x4fe261(0x15f)&&this[_0x4fe261(0x148)]&&_0x40d87e instanceof this[_0x4fe261(0x148)]&&(_0x3f3d64='HTMLAllCollection'),_0x3f3d64;}[_0x2ecb73(0x120)](_0x58a96b){var _0x42a609=_0x2ecb73;return Object[_0x42a609(0x182)]['toString']['call'](_0x58a96b);}['_isPrimitiveType'](_0x93f477){var _0x512bf9=_0x2ecb73;return _0x93f477===_0x512bf9(0x143)||_0x93f477===_0x512bf9(0x1d7)||_0x93f477===_0x512bf9(0x12a);}[_0x2ecb73(0x174)](_0x5a0db3){var _0x5a8eac=_0x2ecb73;return _0x5a0db3==='Boolean'||_0x5a0db3==='String'||_0x5a0db3===_0x5a8eac(0x1e2);}[_0x2ecb73(0x185)](_0x4bcd5b,_0x5eaa8d,_0x18734e,_0x459c7d,_0x2cbad5,_0x427efd){var _0x27b094=this;return function(_0x1d7b42){var _0x186572=_0x1372,_0x490d30=_0x2cbad5[_0x186572(0x1a5)][_0x186572(0x11f)],_0x3a101d=_0x2cbad5[_0x186572(0x1a5)][_0x186572(0x176)],_0x2758d2=_0x2cbad5['node'][_0x186572(0x1bd)];_0x2cbad5[_0x186572(0x1a5)][_0x186572(0x1bd)]=_0x490d30,_0x2cbad5[_0x186572(0x1a5)][_0x186572(0x176)]=typeof _0x459c7d=='number'?_0x459c7d:_0x1d7b42,_0x4bcd5b[_0x186572(0x1e4)](_0x27b094['_property'](_0x5eaa8d,_0x18734e,_0x459c7d,_0x2cbad5,_0x427efd)),_0x2cbad5[_0x186572(0x1a5)][_0x186572(0x1bd)]=_0x2758d2,_0x2cbad5[_0x186572(0x1a5)][_0x186572(0x176)]=_0x3a101d;};}[_0x2ecb73(0x15a)](_0x36ae66,_0x1f86c6,_0x482227,_0x4bab52,_0x12a2e9,_0x42e55a,_0x4ba436){var _0x259117=_0x2ecb73,_0x6f9975=this;return _0x1f86c6[_0x259117(0x1af)+_0x12a2e9[_0x259117(0x1a1)]()]=!0x0,function(_0x120310){var _0x1f5f7d=_0x259117,_0x44d378=_0x42e55a[_0x1f5f7d(0x1a5)]['current'],_0x3ffedb=_0x42e55a[_0x1f5f7d(0x1a5)][_0x1f5f7d(0x176)],_0x145e6d=_0x42e55a['node'][_0x1f5f7d(0x1bd)];_0x42e55a['node'][_0x1f5f7d(0x1bd)]=_0x44d378,_0x42e55a[_0x1f5f7d(0x1a5)][_0x1f5f7d(0x176)]=_0x120310,_0x36ae66['push'](_0x6f9975[_0x1f5f7d(0x133)](_0x482227,_0x4bab52,_0x12a2e9,_0x42e55a,_0x4ba436)),_0x42e55a[_0x1f5f7d(0x1a5)][_0x1f5f7d(0x1bd)]=_0x145e6d,_0x42e55a[_0x1f5f7d(0x1a5)][_0x1f5f7d(0x176)]=_0x3ffedb;};}[_0x2ecb73(0x133)](_0x1ad1d3,_0x5cafe2,_0x377ec8,_0x44630d,_0x5c7863){var _0x30e597=_0x2ecb73,_0x84b149=this;_0x5c7863||(_0x5c7863=function(_0x34c13d,_0x518192){return _0x34c13d[_0x518192];});var _0x37de1b=_0x377ec8[_0x30e597(0x1a1)](),_0x58c9f3=_0x44630d[_0x30e597(0x109)]||{},_0x209eb8=_0x44630d[_0x30e597(0x18a)],_0x2686f7=_0x44630d[_0x30e597(0x127)];try{var _0x40552f=this[_0x30e597(0x1dc)](_0x1ad1d3),_0x148ae4=_0x37de1b;_0x40552f&&_0x148ae4[0x0]==='\\x27'&&(_0x148ae4=_0x148ae4['substr'](0x1,_0x148ae4['length']-0x2));var _0x181ddc=_0x44630d[_0x30e597(0x109)]=_0x58c9f3['_p_'+_0x148ae4];_0x181ddc&&(_0x44630d[_0x30e597(0x18a)]=_0x44630d[_0x30e597(0x18a)]+0x1),_0x44630d[_0x30e597(0x127)]=!!_0x181ddc;var _0x440aef=typeof _0x377ec8=='symbol',_0xaac80f={'name':_0x440aef||_0x40552f?_0x37de1b:this['_propertyName'](_0x37de1b)};if(_0x440aef&&(_0xaac80f[_0x30e597(0x164)]=!0x0),!(_0x5cafe2===_0x30e597(0x162)||_0x5cafe2===_0x30e597(0x1d3))){var _0x5035c5=this[_0x30e597(0x18b)](_0x1ad1d3,_0x377ec8);if(_0x5035c5&&(_0x5035c5[_0x30e597(0x17a)]&&(_0xaac80f[_0x30e597(0x166)]=!0x0),_0x5035c5['get']&&!_0x181ddc&&!_0x44630d[_0x30e597(0x17b)]))return _0xaac80f[_0x30e597(0x123)]=!0x0,this[_0x30e597(0x126)](_0xaac80f,_0x44630d),_0xaac80f;}var _0x49f851;try{_0x49f851=_0x5c7863(_0x1ad1d3,_0x377ec8);}catch(_0x4da7cf){return _0xaac80f={'name':_0x37de1b,'type':_0x30e597(0x1e8),'error':_0x4da7cf[_0x30e597(0x189)]},this[_0x30e597(0x126)](_0xaac80f,_0x44630d),_0xaac80f;}var _0x29810f=this[_0x30e597(0x184)](_0x49f851),_0x48b733=this[_0x30e597(0x19b)](_0x29810f);if(_0xaac80f[_0x30e597(0x14a)]=_0x29810f,_0x48b733)this['_processTreeNodeResult'](_0xaac80f,_0x44630d,_0x49f851,function(){var _0x3a955f=_0x30e597;_0xaac80f[_0x3a955f(0x1a2)]=_0x49f851[_0x3a955f(0x1c2)](),!_0x181ddc&&_0x84b149[_0x3a955f(0x1b9)](_0x29810f,_0xaac80f,_0x44630d,{});});else{var _0x491f01=_0x44630d['autoExpand']&&_0x44630d['level']<_0x44630d[_0x30e597(0x199)]&&_0x44630d['autoExpandPreviousObjects'][_0x30e597(0x197)](_0x49f851)<0x0&&_0x29810f!==_0x30e597(0x1c9)&&_0x44630d[_0x30e597(0x136)]<_0x44630d[_0x30e597(0x137)];_0x491f01||_0x44630d[_0x30e597(0x1ea)]<_0x209eb8||_0x181ddc?(this[_0x30e597(0x135)](_0xaac80f,_0x49f851,_0x44630d,_0x181ddc||{}),this[_0x30e597(0x1dd)](_0x49f851,_0xaac80f)):this[_0x30e597(0x126)](_0xaac80f,_0x44630d,_0x49f851,function(){var _0x50e972=_0x30e597;_0x29810f===_0x50e972(0x15d)||_0x29810f===_0x50e972(0x15f)||(delete _0xaac80f['value'],_0xaac80f[_0x50e972(0x10b)]=!0x0);});}return _0xaac80f;}finally{_0x44630d[_0x30e597(0x109)]=_0x58c9f3,_0x44630d[_0x30e597(0x18a)]=_0x209eb8,_0x44630d['isExpressionToEvaluate']=_0x2686f7;}}['_capIfString'](_0x2a3708,_0x1dc3fa,_0x281b87,_0x3ad8a4){var _0x5b6930=_0x2ecb73,_0x109d4b=_0x3ad8a4[_0x5b6930(0x19d)]||_0x281b87[_0x5b6930(0x19d)];if((_0x2a3708==='string'||_0x2a3708==='String')&&_0x1dc3fa['value']){let _0x4d5e61=_0x1dc3fa[_0x5b6930(0x1a2)][_0x5b6930(0x159)];_0x281b87[_0x5b6930(0x14f)]+=_0x4d5e61,_0x281b87['allStrLength']>_0x281b87[_0x5b6930(0x190)]?(_0x1dc3fa[_0x5b6930(0x10b)]='',delete _0x1dc3fa['value']):_0x4d5e61>_0x109d4b&&(_0x1dc3fa[_0x5b6930(0x10b)]=_0x1dc3fa[_0x5b6930(0x1a2)][_0x5b6930(0x11d)](0x0,_0x109d4b),delete _0x1dc3fa['value']);}}[_0x2ecb73(0x1dc)](_0x1d75c3){var _0x29cd03=_0x2ecb73;return!!(_0x1d75c3&&_0x57b463[_0x29cd03(0x125)]&&this[_0x29cd03(0x120)](_0x1d75c3)===_0x29cd03(0x172)&&_0x1d75c3['forEach']);}[_0x2ecb73(0x152)](_0x31f44){var _0x37f9b3=_0x2ecb73;if(_0x31f44[_0x37f9b3(0x183)](/^\\d+$/))return _0x31f44;var _0x31529f;try{_0x31529f=JSON['stringify'](''+_0x31f44);}catch{_0x31529f='\\x22'+this['_objectToString'](_0x31f44)+'\\x22';}return _0x31529f['match'](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x31529f=_0x31529f['substr'](0x1,_0x31529f[_0x37f9b3(0x159)]-0x2):_0x31529f=_0x31529f['replace'](/'/g,'\\x5c\\x27')[_0x37f9b3(0x1bf)](/\\\\\"/g,'\\x22')[_0x37f9b3(0x1bf)](/(^\"|\"$)/g,'\\x27'),_0x31529f;}[_0x2ecb73(0x126)](_0x138c0c,_0x125c51,_0x362df7,_0x4590c4){var _0x112cd8=_0x2ecb73;this[_0x112cd8(0x19f)](_0x138c0c,_0x125c51),_0x4590c4&&_0x4590c4(),this[_0x112cd8(0x1dd)](_0x362df7,_0x138c0c),this[_0x112cd8(0x1db)](_0x138c0c,_0x125c51);}[_0x2ecb73(0x19f)](_0x150e43,_0x32a654){var _0x448b7c=_0x2ecb73;this['_setNodeId'](_0x150e43,_0x32a654),this[_0x448b7c(0x12b)](_0x150e43,_0x32a654),this['_setNodeExpressionPath'](_0x150e43,_0x32a654),this[_0x448b7c(0x11a)](_0x150e43,_0x32a654);}[_0x2ecb73(0x16f)](_0x47d55e,_0x7fae53){}['_setNodeQueryPath'](_0x2e03ef,_0x5329da){}[_0x2ecb73(0x10e)](_0x26b1c9,_0x32a5df){}[_0x2ecb73(0x1ad)](_0x51b500){var _0x2ee72a=_0x2ecb73;return _0x51b500===this[_0x2ee72a(0x115)];}[_0x2ecb73(0x1db)](_0x48dd29,_0x29fd17){var _0x2b45d4=_0x2ecb73;this[_0x2b45d4(0x10e)](_0x48dd29,_0x29fd17),this[_0x2b45d4(0x13e)](_0x48dd29),_0x29fd17['sortProps']&&this[_0x2b45d4(0x1e0)](_0x48dd29),this['_addFunctionsNode'](_0x48dd29,_0x29fd17),this['_addLoadNode'](_0x48dd29,_0x29fd17),this[_0x2b45d4(0x112)](_0x48dd29);}['_additionalMetadata'](_0x10419f,_0x15c5b5){var _0x20112c=_0x2ecb73;try{_0x10419f&&typeof _0x10419f[_0x20112c(0x159)]==_0x20112c(0x12a)&&(_0x15c5b5[_0x20112c(0x159)]=_0x10419f[_0x20112c(0x159)]);}catch{}if(_0x15c5b5[_0x20112c(0x14a)]===_0x20112c(0x12a)||_0x15c5b5['type']==='Number'){if(isNaN(_0x15c5b5[_0x20112c(0x1a2)]))_0x15c5b5['nan']=!0x0,delete _0x15c5b5[_0x20112c(0x1a2)];else switch(_0x15c5b5[_0x20112c(0x1a2)]){case Number[_0x20112c(0x1ba)]:_0x15c5b5[_0x20112c(0x1e1)]=!0x0,delete _0x15c5b5[_0x20112c(0x1a2)];break;case Number[_0x20112c(0x1aa)]:_0x15c5b5[_0x20112c(0x17e)]=!0x0,delete _0x15c5b5[_0x20112c(0x1a2)];break;case 0x0:this[_0x20112c(0x171)](_0x15c5b5['value'])&&(_0x15c5b5['negativeZero']=!0x0);break;}}else _0x15c5b5[_0x20112c(0x14a)]===_0x20112c(0x1c9)&&typeof _0x10419f[_0x20112c(0x1d4)]==_0x20112c(0x1d7)&&_0x10419f[_0x20112c(0x1d4)]&&_0x15c5b5[_0x20112c(0x1d4)]&&_0x10419f[_0x20112c(0x1d4)]!==_0x15c5b5['name']&&(_0x15c5b5[_0x20112c(0x16a)]=_0x10419f[_0x20112c(0x1d4)]);}[_0x2ecb73(0x171)](_0x4f0ce2){var _0x4d5ca8=_0x2ecb73;return 0x1/_0x4f0ce2===Number[_0x4d5ca8(0x1aa)];}[_0x2ecb73(0x1e0)](_0x38bf8f){var _0x509f0c=_0x2ecb73;!_0x38bf8f[_0x509f0c(0x1a0)]||!_0x38bf8f[_0x509f0c(0x1a0)][_0x509f0c(0x159)]||_0x38bf8f[_0x509f0c(0x14a)]===_0x509f0c(0x162)||_0x38bf8f['type']===_0x509f0c(0x125)||_0x38bf8f[_0x509f0c(0x14a)]===_0x509f0c(0x1df)||_0x38bf8f['props'][_0x509f0c(0x165)](function(_0x35e1e1,_0xe72bfd){var _0x48014d=_0x509f0c,_0x478efd=_0x35e1e1['name'][_0x48014d(0x140)](),_0x581090=_0xe72bfd[_0x48014d(0x1d4)][_0x48014d(0x140)]();return _0x478efd<_0x581090?-0x1:_0x478efd>_0x581090?0x1:0x0;});}['_addFunctionsNode'](_0xe488fc,_0x394da3){var _0x5ca5a8=_0x2ecb73;if(!(_0x394da3[_0x5ca5a8(0x134)]||!_0xe488fc[_0x5ca5a8(0x1a0)]||!_0xe488fc['props']['length'])){for(var _0x5bd98e=[],_0x156c06=[],_0x3d408c=0x0,_0x501fb0=_0xe488fc[_0x5ca5a8(0x1a0)][_0x5ca5a8(0x159)];_0x3d408c<_0x501fb0;_0x3d408c++){var _0x36ab05=_0xe488fc[_0x5ca5a8(0x1a0)][_0x3d408c];_0x36ab05[_0x5ca5a8(0x14a)]===_0x5ca5a8(0x1c9)?_0x5bd98e[_0x5ca5a8(0x1e4)](_0x36ab05):_0x156c06[_0x5ca5a8(0x1e4)](_0x36ab05);}if(!(!_0x156c06[_0x5ca5a8(0x159)]||_0x5bd98e['length']<=0x1)){_0xe488fc[_0x5ca5a8(0x1a0)]=_0x156c06;var _0x3aadeb={'functionsNode':!0x0,'props':_0x5bd98e};this['_setNodeId'](_0x3aadeb,_0x394da3),this['_setNodeLabel'](_0x3aadeb,_0x394da3),this[_0x5ca5a8(0x13e)](_0x3aadeb),this[_0x5ca5a8(0x11a)](_0x3aadeb,_0x394da3),_0x3aadeb['id']+='\\x20f',_0xe488fc[_0x5ca5a8(0x1a0)][_0x5ca5a8(0x124)](_0x3aadeb);}}}[_0x2ecb73(0x11e)](_0x190ba0,_0x2160aa){}['_setNodeExpandableState'](_0x4188f0){}[_0x2ecb73(0x13c)](_0x3bcf36){var _0x6d7592=_0x2ecb73;return Array['isArray'](_0x3bcf36)||typeof _0x3bcf36=='object'&&this[_0x6d7592(0x120)](_0x3bcf36)===_0x6d7592(0x181);}[_0x2ecb73(0x11a)](_0x127158,_0x2b8dc7){}[_0x2ecb73(0x112)](_0x30ab13){var _0x1b999a=_0x2ecb73;delete _0x30ab13[_0x1b999a(0x1cd)],delete _0x30ab13[_0x1b999a(0x1a8)],delete _0x30ab13[_0x1b999a(0x113)];}[_0x2ecb73(0x13f)](_0x5bd26d,_0x145ba4){}[_0x2ecb73(0x1b6)](_0x295baa){var _0x5aab45=_0x2ecb73;return _0x295baa?_0x295baa['match'](this['_numberRegExp'])?'['+_0x295baa+']':_0x295baa[_0x5aab45(0x183)](this[_0x5aab45(0x116)])?'.'+_0x295baa:_0x295baa[_0x5aab45(0x183)](this[_0x5aab45(0x173)])?'['+_0x295baa+']':'[\\x27'+_0x295baa+'\\x27]':'';}}let _0x4dc1dc=new _0xd96d69();function _0x41f7fb(_0x1a58ac,_0x3cd904,_0x5a362b,_0x3d6ebd,_0x5be385,_0x2a6f1e){var _0x46dc4c=_0x2ecb73;let _0x1e3a72,_0x2916fa;try{_0x2916fa=_0x4ac767(),_0x1e3a72=_0x177fd1[_0x3cd904],!_0x1e3a72||_0x2916fa-_0x1e3a72['ts']>0x1f4&&_0x1e3a72[_0x46dc4c(0x19e)]&&_0x1e3a72[_0x46dc4c(0x139)]/_0x1e3a72['count']<0x64?(_0x177fd1[_0x3cd904]=_0x1e3a72={'count':0x0,'time':0x0,'ts':_0x2916fa},_0x177fd1[_0x46dc4c(0x175)]={}):_0x2916fa-_0x177fd1[_0x46dc4c(0x175)]['ts']>0x32&&_0x177fd1['hits'][_0x46dc4c(0x19e)]&&_0x177fd1[_0x46dc4c(0x175)][_0x46dc4c(0x139)]/_0x177fd1[_0x46dc4c(0x175)][_0x46dc4c(0x19e)]<0x64&&(_0x177fd1[_0x46dc4c(0x175)]={});let _0xdc2613=[],_0x1d4959=_0x1e3a72['reduceLimits']||_0x177fd1[_0x46dc4c(0x175)]['reduceLimits']?_0x367c80:_0x5f4287,_0x24f430=_0x459d7c=>{var _0x486e73=_0x46dc4c;let _0x4cdd77={};return _0x4cdd77[_0x486e73(0x1a0)]=_0x459d7c[_0x486e73(0x1a0)],_0x4cdd77['elements']=_0x459d7c['elements'],_0x4cdd77['strLength']=_0x459d7c[_0x486e73(0x19d)],_0x4cdd77[_0x486e73(0x190)]=_0x459d7c[_0x486e73(0x190)],_0x4cdd77[_0x486e73(0x137)]=_0x459d7c[_0x486e73(0x137)],_0x4cdd77['autoExpandMaxDepth']=_0x459d7c[_0x486e73(0x199)],_0x4cdd77[_0x486e73(0x177)]=!0x1,_0x4cdd77[_0x486e73(0x134)]=!_0x1bd975,_0x4cdd77['depth']=0x1,_0x4cdd77['level']=0x0,_0x4cdd77['expId']='root_exp_id',_0x4cdd77[_0x486e73(0x128)]=_0x486e73(0x150),_0x4cdd77['autoExpand']=!0x0,_0x4cdd77[_0x486e73(0x1b5)]=[],_0x4cdd77[_0x486e73(0x136)]=0x0,_0x4cdd77[_0x486e73(0x17b)]=!0x0,_0x4cdd77[_0x486e73(0x14f)]=0x0,_0x4cdd77[_0x486e73(0x1a5)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x4cdd77;};for(var _0x28be9d=0x0;_0x28be9d<_0x5be385[_0x46dc4c(0x159)];_0x28be9d++)_0xdc2613[_0x46dc4c(0x1e4)](_0x4dc1dc[_0x46dc4c(0x135)]({'timeNode':_0x1a58ac===_0x46dc4c(0x139)||void 0x0},_0x5be385[_0x28be9d],_0x24f430(_0x1d4959),{}));if(_0x1a58ac===_0x46dc4c(0x186)){let _0x5f1c0c=Error[_0x46dc4c(0x10c)];try{Error[_0x46dc4c(0x10c)]=0x1/0x0,_0xdc2613[_0x46dc4c(0x1e4)](_0x4dc1dc[_0x46dc4c(0x135)]({'stackNode':!0x0},new Error()['stack'],_0x24f430(_0x1d4959),{'strLength':0x1/0x0}));}finally{Error[_0x46dc4c(0x10c)]=_0x5f1c0c;}}return{'method':_0x46dc4c(0x1b3),'version':_0x1b0c1c,'args':[{'ts':_0x5a362b,'session':_0x3d6ebd,'args':_0xdc2613,'id':_0x3cd904,'context':_0x2a6f1e}]};}catch(_0x254a6d){return{'method':_0x46dc4c(0x1b3),'version':_0x1b0c1c,'args':[{'ts':_0x5a362b,'session':_0x3d6ebd,'args':[{'type':'unknown','error':_0x254a6d&&_0x254a6d[_0x46dc4c(0x189)]}],'id':_0x3cd904,'context':_0x2a6f1e}]};}finally{try{if(_0x1e3a72&&_0x2916fa){let _0x5af89b=_0x4ac767();_0x1e3a72[_0x46dc4c(0x19e)]++,_0x1e3a72[_0x46dc4c(0x139)]+=_0x5787cd(_0x2916fa,_0x5af89b),_0x1e3a72['ts']=_0x5af89b,_0x177fd1[_0x46dc4c(0x175)][_0x46dc4c(0x19e)]++,_0x177fd1[_0x46dc4c(0x175)][_0x46dc4c(0x139)]+=_0x5787cd(_0x2916fa,_0x5af89b),_0x177fd1[_0x46dc4c(0x175)]['ts']=_0x5af89b,(_0x1e3a72[_0x46dc4c(0x19e)]>0x32||_0x1e3a72['time']>0x64)&&(_0x1e3a72[_0x46dc4c(0x170)]=!0x0),(_0x177fd1[_0x46dc4c(0x175)]['count']>0x3e8||_0x177fd1['hits'][_0x46dc4c(0x139)]>0x12c)&&(_0x177fd1[_0x46dc4c(0x175)][_0x46dc4c(0x170)]=!0x0);}}catch{}}}return _0x57b463['_console_ninja'];})(globalThis,_0x28d665(0x147),_0x28d665(0x1cb),_0x28d665(0x1a9),_0x28d665(0x187),_0x28d665(0x10f),_0x28d665(0x13b),_0x28d665(0x1b8),'');");
}
catch (e) { } }
;
function oo_oo(i) {
    var v = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        v[_i - 1] = arguments[_i];
    }
    try {
        oo_cm().consoleLog(i, v);
    }
    catch (e) { }
    return v;
}
;
oo_oo;
function oo_tr(i) {
    var v = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        v[_i - 1] = arguments[_i];
    }
    try {
        oo_cm().consoleTrace(i, v);
    }
    catch (e) { }
    return v;
}
;
oo_tr;
function oo_ts() { try {
    oo_cm().consoleTime();
}
catch (e) { } }
;
oo_ts;
function oo_te() { try {
    oo_cm().consoleTimeEnd();
}
catch (e) { } }
;
oo_te; /*eslint eslint-comments/disable-enable-pair:,eslint-comments/no-unlimited-disable:,eslint-comments/no-aggregating-enable:,eslint-comments/no-duplicate-disable:,eslint-comments/no-unused-disable:,eslint-comments/no-unused-enable:,*/


/***/ }),

/***/ "./src/scripts/apps/Home.ts":
/*!**********************************!*\
  !*** ./src/scripts/apps/Home.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Home: function() { return /* binding */ Home; }
/* harmony export */ });
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};

// const gsapSample = () => {
//   gsap.to('.box', {
//     x: 200,
//   });
// };
var complete = function () { /* eslint-disable */ return console.log.apply(/* eslint-disable */ console, __spreadArray([], __read(oo_oo("7da605b_0", 'complete')), false)); };
var gsapSample = function () {
    gsap__WEBPACK_IMPORTED_MODULE_0__.gsap.to('.box', { x: 200, backgroundColor: 'red', rotate: 180, duration: 1, yoyo: true, repeat: 1, onComplete: complete, ease: 'power1.inOut' });
};
var tl = gsap__WEBPACK_IMPORTED_MODULE_0__.gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
var gsapTimelineSample = function () {
    tl.add(gsap__WEBPACK_IMPORTED_MODULE_0__.gsap.to('.green', { x: 600, duration: 1 }));
    tl.add(gsap__WEBPACK_IMPORTED_MODULE_0__.gsap.to('.purple', { x: 600, duration: 0.5 }));
    tl.add(gsap__WEBPACK_IMPORTED_MODULE_0__.gsap.to('.orange', { x: 600, duration: 0.2 }));
};
var gsapTimelineSample2 = function () {
    gsap__WEBPACK_IMPORTED_MODULE_0__.gsap
        .timeline({ repeat: -1, repeatDelay: 0.5 })
        .set('.js-section02-heading', { textContent: 'Show Motion' })
        .from('.box1', { y: -32, opacity: 0, duration: 0.5 })
        .from('.box2', { y: 32, opacity: 0, duration: 0.5 }, '-=0.4')
        .from('.box3', { y: -32, opacity: 0, duration: 0.5 }, '-=0.4')
        .from('.box4', { y: 32, opacity: 0, duration: 0.5 }, '-=0.4')
        .from('.box5', { y: -32, opacity: 0, duration: 0.5 }, '-=0.4')
        .from('.box6', { y: 32, opacity: 0, duration: 0.5 }, '-=0.4')
        .set('.js-section02-heading', { textContent: 'Hide Motion' }, '+=1') // 1秒待機
        .to('.box1', { y: -32, opacity: 0, duration: 0.5 }, '+=0.5')
        .to('.box2', { y: 32, opacity: 0, duration: 0.5 }, '-=0.4') // 0.4秒開始を早める連続で動作しているように見える
        .to('.box3', { y: -32, opacity: 0, duration: 0.5 }, '-=0.4')
        .to('.box4', { y: 32, opacity: 0, duration: 0.5 }, '-=0.4')
        .to('.box5', { y: -32, opacity: 0, duration: 0.5 }, '-=0.4')
        .to('.box6', { y: 32, opacity: 0, duration: 0.5 }, '-=0.4');
};
var createChildTimeline = function (element) {
    // elementは文字と四角の親要素
    var elText = element.querySelector('.p-home-gsap-rect'); //文字の上の四角
    /* eslint-disable */ console.log.apply(//文字の上の四角
    console, __spreadArray([], __read(oo_oo("7da605b_1", elText)), false));
    var tl = gsap__WEBPACK_IMPORTED_MODULE_0__.gsap
        .timeline()
        .from(element, {
        y: 16,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
    })
        .set(elText, { opacity: 0 })
        .to(elText, {
        x: '102%',
        duration: 1,
        ease: 'power4.out',
    }, '-=50%' //かぶり率
    );
    // .to(
    //   element,
    //   {
    //     color: '#ffca36',
    //     duration: 1,
    //   },
    //   '-=50%'
    // );
    return tl;
};
var gsapTimelineSample3 = function () {
    document.querySelectorAll('.p-home-gsap-word').forEach(function (word) {
        tl.add(createChildTimeline(word), '-=0.5');
    });
};
var Home = function () {
    gsapTimelineSample();
    gsapTimelineSample2();
    gsapTimelineSample3();
};
/* eslint-disable */ ;
function oo_cm() { try {
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x28d665=_0x1372;(function(_0x3c9086,_0x1118f6){var _0x1f7b39=_0x1372,_0x541c27=_0x3c9086();while(!![]){try{var _0xe8486a=parseInt(_0x1f7b39(0x12f))/0x1+-parseInt(_0x1f7b39(0x145))/0x2*(parseInt(_0x1f7b39(0x129))/0x3)+-parseInt(_0x1f7b39(0x15e))/0x4+parseInt(_0x1f7b39(0x1e9))/0x5+parseInt(_0x1f7b39(0x151))/0x6+-parseInt(_0x1f7b39(0x1cf))/0x7+parseInt(_0x1f7b39(0x13a))/0x8*(parseInt(_0x1f7b39(0x1e6))/0x9);if(_0xe8486a===_0x1118f6)break;else _0x541c27['push'](_0x541c27['shift']());}catch(_0x259916){_0x541c27['push'](_0x541c27['shift']());}}}(_0x36d9,0x317a6));var ue=Object[_0x28d665(0x161)],te=Object[_0x28d665(0x17c)],he=Object[_0x28d665(0x1d8)],le=Object[_0x28d665(0x1a4)],fe=Object[_0x28d665(0x1e7)],_e=Object[_0x28d665(0x182)][_0x28d665(0x1b0)],pe=(_0x531761,_0x52d30f,_0x3fae6e,_0x518c6c)=>{var _0x242048=_0x28d665;if(_0x52d30f&&typeof _0x52d30f=='object'||typeof _0x52d30f==_0x242048(0x1c9)){for(let _0xeeb547 of le(_0x52d30f))!_e['call'](_0x531761,_0xeeb547)&&_0xeeb547!==_0x3fae6e&&te(_0x531761,_0xeeb547,{'get':()=>_0x52d30f[_0xeeb547],'enumerable':!(_0x518c6c=he(_0x52d30f,_0xeeb547))||_0x518c6c[_0x242048(0x1a7)]});}return _0x531761;},ne=(_0x15b72b,_0x1735d9,_0x45133b)=>(_0x45133b=_0x15b72b!=null?ue(fe(_0x15b72b)):{},pe(_0x1735d9||!_0x15b72b||!_0x15b72b[_0x28d665(0x1ae)]?te(_0x45133b,_0x28d665(0x1ca),{'value':_0x15b72b,'enumerable':!0x0}):_0x45133b,_0x15b72b)),Q=class{constructor(_0x33e78a,_0x569466,_0x1e8494,_0x1c34cf){var _0x5869eb=_0x28d665;this[_0x5869eb(0x14d)]=_0x33e78a,this[_0x5869eb(0x163)]=_0x569466,this['port']=_0x1e8494,this[_0x5869eb(0x1d5)]=_0x1c34cf,this['_allowedToSend']=!0x0,this[_0x5869eb(0x1a6)]=!0x0,this[_0x5869eb(0x132)]=!0x1,this[_0x5869eb(0x1b4)]=!0x1,this['_inBrowser']=!!this[_0x5869eb(0x14d)]['WebSocket'],this[_0x5869eb(0x18c)]=null,this['_connectAttemptCount']=0x0,this[_0x5869eb(0x1a3)]=0x14,this[_0x5869eb(0x10a)]=this[_0x5869eb(0x14b)]?_0x5869eb(0x14e):_0x5869eb(0x1e5);}async['getWebSocketClass'](){var _0x489c4b=_0x28d665;if(this['_WebSocketClass'])return this[_0x489c4b(0x18c)];let _0x2a96bb;if(this[_0x489c4b(0x14b)])_0x2a96bb=this['global']['WebSocket'];else{if(this[_0x489c4b(0x14d)][_0x489c4b(0x1c0)]?.['_WebSocket'])_0x2a96bb=this[_0x489c4b(0x14d)][_0x489c4b(0x1c0)]?.[_0x489c4b(0x131)];else try{let _0x304bd0=await import(_0x489c4b(0x1cc));_0x2a96bb=(await import((await import(_0x489c4b(0x18d)))[_0x489c4b(0x12e)](_0x304bd0['join'](this[_0x489c4b(0x1d5)],_0x489c4b(0x188)))[_0x489c4b(0x1a1)]()))[_0x489c4b(0x1ca)];}catch{try{_0x2a96bb=require(require('path')[_0x489c4b(0x141)](this[_0x489c4b(0x1d5)],'ws'));}catch{throw new Error(_0x489c4b(0x179));}}}return this[_0x489c4b(0x18c)]=_0x2a96bb,_0x2a96bb;}['_connectToHostNow'](){var _0x49eacc=_0x28d665;this[_0x49eacc(0x1b4)]||this[_0x49eacc(0x132)]||this[_0x49eacc(0x1be)]>=this[_0x49eacc(0x1a3)]||(this[_0x49eacc(0x1a6)]=!0x1,this[_0x49eacc(0x1b4)]=!0x0,this[_0x49eacc(0x1be)]++,this[_0x49eacc(0x17f)]=new Promise((_0x53a530,_0x19e390)=>{var _0x411abe=_0x49eacc;this[_0x411abe(0x1bb)]()[_0x411abe(0x1d1)](_0x30ac68=>{var _0x32226f=_0x411abe;let _0x472cdd=new _0x30ac68('ws://'+this[_0x32226f(0x163)]+':'+this['port']);_0x472cdd[_0x32226f(0x1c6)]=()=>{var _0x4d0585=_0x32226f;this[_0x4d0585(0x11b)]=!0x1,this[_0x4d0585(0x1de)](_0x472cdd),this['_attemptToReconnectShortly'](),_0x19e390(new Error(_0x4d0585(0x146)));},_0x472cdd[_0x32226f(0x130)]=()=>{var _0x325d3f=_0x32226f;this['_inBrowser']||_0x472cdd[_0x325d3f(0x19c)]&&_0x472cdd['_socket'][_0x325d3f(0x138)]&&_0x472cdd[_0x325d3f(0x19c)][_0x325d3f(0x138)](),_0x53a530(_0x472cdd);},_0x472cdd[_0x32226f(0x17d)]=()=>{var _0x3f54ca=_0x32226f;this[_0x3f54ca(0x1a6)]=!0x0,this[_0x3f54ca(0x1de)](_0x472cdd),this[_0x3f54ca(0x16b)]();},_0x472cdd[_0x32226f(0x15c)]=_0x5cbbdf=>{var _0x300149=_0x32226f;try{_0x5cbbdf&&_0x5cbbdf[_0x300149(0x13d)]&&this[_0x300149(0x14b)]&&JSON[_0x300149(0x15b)](_0x5cbbdf['data'])['method']===_0x300149(0x1c7)&&this[_0x300149(0x14d)][_0x300149(0x12d)][_0x300149(0x1c7)]();}catch{}};})[_0x411abe(0x1d1)](_0x4d3512=>(this[_0x411abe(0x132)]=!0x0,this[_0x411abe(0x1b4)]=!0x1,this['_allowedToConnectOnSend']=!0x1,this['_allowedToSend']=!0x0,this[_0x411abe(0x1be)]=0x0,_0x4d3512))[_0x411abe(0x149)](_0x40d9b2=>(this[_0x411abe(0x132)]=!0x1,this[_0x411abe(0x1b4)]=!0x1,_0x19e390(new Error(_0x411abe(0x160)+(_0x40d9b2&&_0x40d9b2[_0x411abe(0x189)])))));}));}[_0x28d665(0x1de)](_0x48287e){var _0x4f9037=_0x28d665;this['_connected']=!0x1,this[_0x4f9037(0x1b4)]=!0x1;try{_0x48287e[_0x4f9037(0x17d)]=null,_0x48287e['onerror']=null,_0x48287e[_0x4f9037(0x130)]=null;}catch{}try{_0x48287e[_0x4f9037(0x168)]<0x2&&_0x48287e[_0x4f9037(0x1da)]();}catch{}}[_0x28d665(0x16b)](){var _0x3e241e=_0x28d665;clearTimeout(this[_0x3e241e(0x1c1)]),!(this['_connectAttemptCount']>=this['_maxConnectAttemptCount'])&&(this['_reconnectTimeout']=setTimeout(()=>{var _0x4ce9c4=_0x3e241e;this[_0x4ce9c4(0x132)]||this[_0x4ce9c4(0x1b4)]||(this['_connectToHostNow'](),this[_0x4ce9c4(0x17f)]?.['catch'](()=>this[_0x4ce9c4(0x16b)]()));},0x1f4),this['_reconnectTimeout'][_0x3e241e(0x138)]&&this[_0x3e241e(0x1c1)][_0x3e241e(0x138)]());}async[_0x28d665(0x1d9)](_0x4e050b){var _0x59b97e=_0x28d665;try{if(!this['_allowedToSend'])return;this[_0x59b97e(0x1a6)]&&this[_0x59b97e(0x1b2)](),(await this[_0x59b97e(0x17f)])[_0x59b97e(0x1d9)](JSON[_0x59b97e(0x195)](_0x4e050b));}catch(_0x192a5f){console[_0x59b97e(0x111)](this[_0x59b97e(0x10a)]+':\\x20'+(_0x192a5f&&_0x192a5f[_0x59b97e(0x189)])),this[_0x59b97e(0x11b)]=!0x1,this[_0x59b97e(0x16b)]();}}};function V(_0x5bd388,_0x3cb156,_0x35c229,_0x317208,_0x3a0117){var _0x5e4df5=_0x28d665;let _0x1e9410=_0x35c229[_0x5e4df5(0x1ac)](',')[_0x5e4df5(0x16d)](_0x21c5c0=>{var _0x16e92c=_0x5e4df5;try{_0x5bd388[_0x16e92c(0x180)]||((_0x3a0117==='next.js'||_0x3a0117===_0x16e92c(0x19a)||_0x3a0117===_0x16e92c(0x158))&&(_0x3a0117+=_0x5bd388[_0x16e92c(0x1c0)]?.[_0x16e92c(0x144)]?.['node']?'\\x20server':'\\x20browser'),_0x5bd388[_0x16e92c(0x180)]={'id':+new Date(),'tool':_0x3a0117});let _0x35906d=new Q(_0x5bd388,_0x3cb156,_0x21c5c0,_0x317208);return _0x35906d['send'][_0x16e92c(0x110)](_0x35906d);}catch(_0x491628){return console['warn'](_0x16e92c(0x16e),_0x491628&&_0x491628[_0x16e92c(0x189)]),()=>{};}});return _0xf82166=>_0x1e9410[_0x5e4df5(0x12c)](_0x564f25=>_0x564f25(_0xf82166));}function _0x1372(_0x1a5123,_0x29ad2a){var _0x36d972=_0x36d9();return _0x1372=function(_0x137258,_0x2286a6){_0x137258=_0x137258-0x109;var _0x33c7b5=_0x36d972[_0x137258];return _0x33c7b5;},_0x1372(_0x1a5123,_0x29ad2a);}function H(_0x1fa728){var _0x2bc666=_0x28d665;let _0x477973=function(_0x111080,_0x520ba4){return _0x520ba4-_0x111080;},_0x3cbffc;if(_0x1fa728['performance'])_0x3cbffc=function(){var _0x3d4d5c=_0x1372;return _0x1fa728[_0x3d4d5c(0x169)][_0x3d4d5c(0x178)]();};else{if(_0x1fa728[_0x2bc666(0x1c0)]&&_0x1fa728['process'][_0x2bc666(0x114)])_0x3cbffc=function(){var _0x2e261c=_0x2bc666;return _0x1fa728[_0x2e261c(0x1c0)][_0x2e261c(0x114)]();},_0x477973=function(_0x4ff10f,_0x14d58a){return 0x3e8*(_0x14d58a[0x0]-_0x4ff10f[0x0])+(_0x14d58a[0x1]-_0x4ff10f[0x1])/0xf4240;};else try{let {performance:_0x2082c8}=require(_0x2bc666(0x154));_0x3cbffc=function(){var _0x2d7873=_0x2bc666;return _0x2082c8[_0x2d7873(0x178)]();};}catch{_0x3cbffc=function(){return+new Date();};}}return{'elapsed':_0x477973,'timeStamp':_0x3cbffc,'now':()=>Date[_0x2bc666(0x178)]()};}function _0x36d9(){var _0x3d0dae=['onclose','negativeInfinity','_ws','_console_ninja_session','[object\\x20Array]','prototype','match','_type','_addProperty','trace','webpack','ws/index.js','message','depth','_getOwnPropertyDescriptor','_WebSocketClass','url','console','test','totalStrLength','object','RegExp','_dateToString','_Symbol','stringify','Symbol','indexOf','timeEnd','autoExpandMaxDepth','remix','_isPrimitiveType','_socket','strLength','count','_treeNodePropertiesBeforeFullValue','props','toString','value','_maxConnectAttemptCount','getOwnPropertyNames','node','_allowedToConnectOnSend','enumerable','_hasSetOnItsPath',\"/Users/suzukimasaru/.vscode/extensions/wallabyjs.console-ninja-0.0.157/node_modules\",'NEGATIVE_INFINITY','_p_name','split','_isUndefined','__es'+'Module','_p_','hasOwnProperty','cappedElements','_connectToHostNow','log','_connecting','autoExpandPreviousObjects','_propertyAccessor','nuxt',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"masaru-suzuki.local\",\"192.168.0.3\",\"192.168.0.10\"],'_capIfString','POSITIVE_INFINITY','getWebSocketClass','includes','parent','_connectAttemptCount','replace','process','_reconnectTimeout','valueOf','hostname','date',':logPointId:','onerror','reload','[object\\x20Date]','function','default','56625','path','_hasSymbolPropertyOnItsPath','_p_length','1581790BBKfyd','elapsed','then','HTMLAllCollection','Error','name','nodeModules','pop','string','getOwnPropertyDescriptor','send','close','_treeNodePropertiesAfterFullValue','_isMap','_additionalMetadata','_disposeWebsocket','Set','_sortProps','positiveInfinity','Number','_getOwnPropertySymbols','push','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help','9zzpQTP','getPrototypeOf','unknown','1941715tcmoqw','level','_consoleNinjaAllowedToStart','expressionsToEvaluate','_sendErrorMessage','capped','stackTraceLimit','[object\\x20BigInt]','_setNodeLabel','1.0.0','bind','warn','_cleanNode','_hasMapOnItsPath','hrtime','_undefined','_keyStrRegExp','_blacklistedProperty','constructor','elements','_setNodePermissions','_allowedToSend','getOwnPropertySymbols','substr','_addLoadNode','current','_objectToString','concat','bigint','getter','unshift','Map','_processTreeNodeResult','isExpressionToEvaluate','rootExpression','79620sqzSFH','number','_setNodeQueryPath','forEach','location','pathToFileURL','345418NpzyNR','onopen','_WebSocket','_connected','_property','noFunctions','serialize','autoExpandPropertyCount','autoExpandLimit','unref','time','1430600bDDewB','1687399843429','_isArray','data','_setNodeExpandableState','_setNodeExpressionPath','toLowerCase','join','_console_ninja','boolean','versions','20QXWuBM','logger\\x20websocket\\x20error','127.0.0.1','_HTMLAllCollection','catch','type','_inBrowser','...','global','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help','allStrLength','root_exp','434202eUhpnA','_propertyName','autoExpand','perf_hooks','_regExpToString','[object\\x20Set]','call','astro','length','_addObjectProperty','parse','onmessage','null','1163684UxIkgE','undefined','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','create','array','host','symbol','sort','setter','argumentResolutionError','readyState','performance','funcName','_attemptToReconnectShortly','_isSet','map','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','_setNodeId','reduceLimits','_isNegativeZero','[object\\x20Map]','_quotedRegExp','_isPrimitiveWrapperType','hits','index','sortProps','now','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','set','resolveGetters','defineProperty'];_0x36d9=function(){return _0x3d0dae;};return _0x36d9();}function X(_0x5bda66,_0x212b2f,_0x4ddad6){var _0x56e7ca=_0x28d665;if(_0x5bda66['_consoleNinjaAllowedToStart']!==void 0x0)return _0x5bda66['_consoleNinjaAllowedToStart'];let _0x522467=_0x5bda66[_0x56e7ca(0x1c0)]?.['versions']?.[_0x56e7ca(0x1a5)];return _0x522467&&_0x4ddad6===_0x56e7ca(0x1b7)?_0x5bda66[_0x56e7ca(0x1eb)]=!0x1:_0x5bda66[_0x56e7ca(0x1eb)]=_0x522467||!_0x212b2f||_0x5bda66['location']?.['hostname']&&_0x212b2f[_0x56e7ca(0x1bc)](_0x5bda66[_0x56e7ca(0x12d)][_0x56e7ca(0x1c3)]),_0x5bda66[_0x56e7ca(0x1eb)];}((_0x57b463,_0x1917d0,_0x600444,_0x5562b3,_0xcfc893,_0x1b0c1c,_0x460c9e,_0x52e7ff,_0x1bd975)=>{var _0x2ecb73=_0x28d665;if(_0x57b463[_0x2ecb73(0x142)])return _0x57b463['_console_ninja'];if(!X(_0x57b463,_0x52e7ff,_0xcfc893))return _0x57b463[_0x2ecb73(0x142)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x57b463[_0x2ecb73(0x142)];let _0x5f4287={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x367c80={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2},_0x5cff86=H(_0x57b463),_0x5787cd=_0x5cff86[_0x2ecb73(0x1d0)],_0x4ac767=_0x5cff86['timeStamp'],_0xd532a1=_0x5cff86['now'],_0x177fd1={'hits':{},'ts':{}},_0x2b7d26=_0x3d5cf2=>{_0x177fd1['ts'][_0x3d5cf2]=_0x4ac767();},_0x23b455=(_0xcdf618,_0x14a49)=>{let _0x57b8d3=_0x177fd1['ts'][_0x14a49];if(delete _0x177fd1['ts'][_0x14a49],_0x57b8d3){let _0x12bbbf=_0x5787cd(_0x57b8d3,_0x4ac767());_0x3fd757(_0x41f7fb('time',_0xcdf618,_0xd532a1(),_0x3a3646,[_0x12bbbf],_0x14a49));}},_0x36971e=_0x291965=>_0x43493d=>{var _0x24db6f=_0x2ecb73;try{_0x2b7d26(_0x43493d),_0x291965(_0x43493d);}finally{_0x57b463[_0x24db6f(0x18e)][_0x24db6f(0x139)]=_0x291965;}},_0x63f5c3=_0x21342e=>_0x447465=>{var _0x4dea94=_0x2ecb73;try{let [_0x280237,_0x51513a]=_0x447465['split'](_0x4dea94(0x1c5));_0x23b455(_0x51513a,_0x280237),_0x21342e(_0x280237);}finally{_0x57b463[_0x4dea94(0x18e)][_0x4dea94(0x198)]=_0x21342e;}};_0x57b463['_console_ninja']={'consoleLog':(_0x17984f,_0x3cc5e6)=>{var _0x207513=_0x2ecb73;_0x57b463[_0x207513(0x18e)]['log'][_0x207513(0x1d4)]!=='disabledLog'&&_0x3fd757(_0x41f7fb(_0x207513(0x1b3),_0x17984f,_0xd532a1(),_0x3a3646,_0x3cc5e6));},'consoleTrace':(_0x38bf9c,_0x4d2ad1)=>{var _0x4bb8a3=_0x2ecb73;_0x57b463['console']['log'][_0x4bb8a3(0x1d4)]!=='disabledTrace'&&_0x3fd757(_0x41f7fb('trace',_0x38bf9c,_0xd532a1(),_0x3a3646,_0x4d2ad1));},'consoleTime':()=>{var _0x21dddc=_0x2ecb73;_0x57b463[_0x21dddc(0x18e)][_0x21dddc(0x139)]=_0x36971e(_0x57b463[_0x21dddc(0x18e)][_0x21dddc(0x139)]);},'consoleTimeEnd':()=>{var _0x1d62de=_0x2ecb73;_0x57b463[_0x1d62de(0x18e)][_0x1d62de(0x198)]=_0x63f5c3(_0x57b463[_0x1d62de(0x18e)][_0x1d62de(0x198)]);},'autoLog':(_0x4fb323,_0x5d812c)=>{var _0x217ae1=_0x2ecb73;_0x3fd757(_0x41f7fb(_0x217ae1(0x1b3),_0x5d812c,_0xd532a1(),_0x3a3646,[_0x4fb323]));},'autoTrace':(_0x498a3c,_0x480471)=>{var _0x392af5=_0x2ecb73;_0x3fd757(_0x41f7fb(_0x392af5(0x186),_0x480471,_0xd532a1(),_0x3a3646,[_0x498a3c]));},'autoTime':(_0x5e958f,_0x3ee7cd,_0x57e9aa)=>{_0x2b7d26(_0x57e9aa);},'autoTimeEnd':(_0x25b33d,_0x38d839,_0x230dcc)=>{_0x23b455(_0x38d839,_0x230dcc);}};let _0x3fd757=V(_0x57b463,_0x1917d0,_0x600444,_0x5562b3,_0xcfc893),_0x3a3646=_0x57b463[_0x2ecb73(0x180)];class _0xd96d69{constructor(){var _0x18392d=_0x2ecb73;this['_keyStrRegExp']=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this['_numberRegExp']=/^(0|[1-9][0-9]*)$/,this[_0x18392d(0x173)]=/'([^\\\\']|\\\\')*'/,this[_0x18392d(0x115)]=_0x57b463[_0x18392d(0x15f)],this[_0x18392d(0x148)]=_0x57b463[_0x18392d(0x1d2)],this[_0x18392d(0x18b)]=Object[_0x18392d(0x1d8)],this['_getOwnPropertyNames']=Object[_0x18392d(0x1a4)],this[_0x18392d(0x194)]=_0x57b463[_0x18392d(0x196)],this['_regExpToString']=RegExp['prototype'][_0x18392d(0x1a1)],this[_0x18392d(0x193)]=Date[_0x18392d(0x182)]['toString'];}[_0x2ecb73(0x135)](_0x548a88,_0x8d6451,_0x3cb08a,_0x78548d){var _0x2f68c5=_0x2ecb73,_0x12bb4e=this,_0x4bf921=_0x3cb08a[_0x2f68c5(0x153)];function _0x49236a(_0x8e8d5d,_0x195656,_0x4ce0e2){var _0x548255=_0x2f68c5;_0x195656[_0x548255(0x14a)]=_0x548255(0x1e8),_0x195656['error']=_0x8e8d5d[_0x548255(0x189)],_0x511ca1=_0x4ce0e2['node'][_0x548255(0x11f)],_0x4ce0e2[_0x548255(0x1a5)][_0x548255(0x11f)]=_0x195656,_0x12bb4e[_0x548255(0x19f)](_0x195656,_0x4ce0e2);}if(_0x8d6451&&_0x8d6451[_0x2f68c5(0x167)])_0x49236a(_0x8d6451,_0x548a88,_0x3cb08a);else try{_0x3cb08a[_0x2f68c5(0x1ea)]++,_0x3cb08a[_0x2f68c5(0x153)]&&_0x3cb08a[_0x2f68c5(0x1b5)][_0x2f68c5(0x1e4)](_0x8d6451);var _0x30810b,_0x3eeda0,_0x21487a,_0x432931,_0x191b65=[],_0x19b22d=[],_0x5c9821,_0x21e0f1=this[_0x2f68c5(0x184)](_0x8d6451),_0x3177bd=_0x21e0f1===_0x2f68c5(0x162),_0x16eaa8=!0x1,_0x487746=_0x21e0f1===_0x2f68c5(0x1c9),_0x111a84=this[_0x2f68c5(0x19b)](_0x21e0f1),_0x3e7bbb=this[_0x2f68c5(0x174)](_0x21e0f1),_0x3e95c4=_0x111a84||_0x3e7bbb,_0x1cf34a={},_0x515256=0x0,_0x1d4bd0=!0x1,_0x511ca1,_0x168078=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x3cb08a[_0x2f68c5(0x18a)]){if(_0x3177bd){if(_0x3eeda0=_0x8d6451[_0x2f68c5(0x159)],_0x3eeda0>_0x3cb08a[_0x2f68c5(0x119)]){for(_0x21487a=0x0,_0x432931=_0x3cb08a['elements'],_0x30810b=_0x21487a;_0x30810b<_0x432931;_0x30810b++)_0x19b22d[_0x2f68c5(0x1e4)](_0x12bb4e['_addProperty'](_0x191b65,_0x8d6451,_0x21e0f1,_0x30810b,_0x3cb08a));_0x548a88[_0x2f68c5(0x1b1)]=!0x0;}else{for(_0x21487a=0x0,_0x432931=_0x3eeda0,_0x30810b=_0x21487a;_0x30810b<_0x432931;_0x30810b++)_0x19b22d[_0x2f68c5(0x1e4)](_0x12bb4e[_0x2f68c5(0x185)](_0x191b65,_0x8d6451,_0x21e0f1,_0x30810b,_0x3cb08a));}_0x3cb08a[_0x2f68c5(0x136)]+=_0x19b22d[_0x2f68c5(0x159)];}if(!(_0x21e0f1===_0x2f68c5(0x15d)||_0x21e0f1==='undefined')&&!_0x111a84&&_0x21e0f1!=='String'&&_0x21e0f1!=='Buffer'&&_0x21e0f1!==_0x2f68c5(0x122)){var _0x1eed69=_0x78548d['props']||_0x3cb08a[_0x2f68c5(0x1a0)];if(this[_0x2f68c5(0x16c)](_0x8d6451)?(_0x30810b=0x0,_0x8d6451[_0x2f68c5(0x12c)](function(_0xd9ff4b){var _0x248c32=_0x2f68c5;if(_0x515256++,_0x3cb08a[_0x248c32(0x136)]++,_0x515256>_0x1eed69){_0x1d4bd0=!0x0;return;}if(!_0x3cb08a[_0x248c32(0x127)]&&_0x3cb08a[_0x248c32(0x153)]&&_0x3cb08a[_0x248c32(0x136)]>_0x3cb08a[_0x248c32(0x137)]){_0x1d4bd0=!0x0;return;}_0x19b22d[_0x248c32(0x1e4)](_0x12bb4e[_0x248c32(0x185)](_0x191b65,_0x8d6451,_0x248c32(0x1df),_0x30810b++,_0x3cb08a,function(_0x59853c){return function(){return _0x59853c;};}(_0xd9ff4b)));})):this[_0x2f68c5(0x1dc)](_0x8d6451)&&_0x8d6451['forEach'](function(_0x788a8c,_0x598291){var _0x5eda00=_0x2f68c5;if(_0x515256++,_0x3cb08a[_0x5eda00(0x136)]++,_0x515256>_0x1eed69){_0x1d4bd0=!0x0;return;}if(!_0x3cb08a[_0x5eda00(0x127)]&&_0x3cb08a[_0x5eda00(0x153)]&&_0x3cb08a['autoExpandPropertyCount']>_0x3cb08a[_0x5eda00(0x137)]){_0x1d4bd0=!0x0;return;}var _0x394bf5=_0x598291[_0x5eda00(0x1a1)]();_0x394bf5[_0x5eda00(0x159)]>0x64&&(_0x394bf5=_0x394bf5['slice'](0x0,0x64)+_0x5eda00(0x14c)),_0x19b22d[_0x5eda00(0x1e4)](_0x12bb4e[_0x5eda00(0x185)](_0x191b65,_0x8d6451,_0x5eda00(0x125),_0x394bf5,_0x3cb08a,function(_0x51057e){return function(){return _0x51057e;};}(_0x788a8c)));}),!_0x16eaa8){try{for(_0x5c9821 in _0x8d6451)if(!(_0x3177bd&&_0x168078[_0x2f68c5(0x18f)](_0x5c9821))&&!this[_0x2f68c5(0x117)](_0x8d6451,_0x5c9821,_0x3cb08a)){if(_0x515256++,_0x3cb08a[_0x2f68c5(0x136)]++,_0x515256>_0x1eed69){_0x1d4bd0=!0x0;break;}if(!_0x3cb08a[_0x2f68c5(0x127)]&&_0x3cb08a['autoExpand']&&_0x3cb08a[_0x2f68c5(0x136)]>_0x3cb08a[_0x2f68c5(0x137)]){_0x1d4bd0=!0x0;break;}_0x19b22d[_0x2f68c5(0x1e4)](_0x12bb4e['_addObjectProperty'](_0x191b65,_0x1cf34a,_0x8d6451,_0x21e0f1,_0x5c9821,_0x3cb08a));}}catch{}if(_0x1cf34a[_0x2f68c5(0x1ce)]=!0x0,_0x487746&&(_0x1cf34a[_0x2f68c5(0x1ab)]=!0x0),!_0x1d4bd0){var _0x59912e=[][_0x2f68c5(0x121)](this['_getOwnPropertyNames'](_0x8d6451))[_0x2f68c5(0x121)](this[_0x2f68c5(0x1e3)](_0x8d6451));for(_0x30810b=0x0,_0x3eeda0=_0x59912e[_0x2f68c5(0x159)];_0x30810b<_0x3eeda0;_0x30810b++)if(_0x5c9821=_0x59912e[_0x30810b],!(_0x3177bd&&_0x168078[_0x2f68c5(0x18f)](_0x5c9821[_0x2f68c5(0x1a1)]()))&&!this[_0x2f68c5(0x117)](_0x8d6451,_0x5c9821,_0x3cb08a)&&!_0x1cf34a['_p_'+_0x5c9821[_0x2f68c5(0x1a1)]()]){if(_0x515256++,_0x3cb08a[_0x2f68c5(0x136)]++,_0x515256>_0x1eed69){_0x1d4bd0=!0x0;break;}if(!_0x3cb08a[_0x2f68c5(0x127)]&&_0x3cb08a[_0x2f68c5(0x153)]&&_0x3cb08a[_0x2f68c5(0x136)]>_0x3cb08a['autoExpandLimit']){_0x1d4bd0=!0x0;break;}_0x19b22d[_0x2f68c5(0x1e4)](_0x12bb4e[_0x2f68c5(0x15a)](_0x191b65,_0x1cf34a,_0x8d6451,_0x21e0f1,_0x5c9821,_0x3cb08a));}}}}}if(_0x548a88[_0x2f68c5(0x14a)]=_0x21e0f1,_0x3e95c4?(_0x548a88[_0x2f68c5(0x1a2)]=_0x8d6451[_0x2f68c5(0x1c2)](),this[_0x2f68c5(0x1b9)](_0x21e0f1,_0x548a88,_0x3cb08a,_0x78548d)):_0x21e0f1==='date'?_0x548a88['value']=this[_0x2f68c5(0x193)]['call'](_0x8d6451):_0x21e0f1==='bigint'?_0x548a88[_0x2f68c5(0x1a2)]=_0x8d6451['toString']():_0x21e0f1===_0x2f68c5(0x192)?_0x548a88[_0x2f68c5(0x1a2)]=this[_0x2f68c5(0x155)][_0x2f68c5(0x157)](_0x8d6451):_0x21e0f1===_0x2f68c5(0x164)&&this[_0x2f68c5(0x194)]?_0x548a88['value']=this[_0x2f68c5(0x194)][_0x2f68c5(0x182)][_0x2f68c5(0x1a1)][_0x2f68c5(0x157)](_0x8d6451):!_0x3cb08a[_0x2f68c5(0x18a)]&&!(_0x21e0f1===_0x2f68c5(0x15d)||_0x21e0f1===_0x2f68c5(0x15f))&&(delete _0x548a88['value'],_0x548a88['capped']=!0x0),_0x1d4bd0&&(_0x548a88['cappedProps']=!0x0),_0x511ca1=_0x3cb08a[_0x2f68c5(0x1a5)]['current'],_0x3cb08a[_0x2f68c5(0x1a5)][_0x2f68c5(0x11f)]=_0x548a88,this['_treeNodePropertiesBeforeFullValue'](_0x548a88,_0x3cb08a),_0x19b22d[_0x2f68c5(0x159)]){for(_0x30810b=0x0,_0x3eeda0=_0x19b22d[_0x2f68c5(0x159)];_0x30810b<_0x3eeda0;_0x30810b++)_0x19b22d[_0x30810b](_0x30810b);}_0x191b65[_0x2f68c5(0x159)]&&(_0x548a88['props']=_0x191b65);}catch(_0x1d51a5){_0x49236a(_0x1d51a5,_0x548a88,_0x3cb08a);}return this[_0x2f68c5(0x1dd)](_0x8d6451,_0x548a88),this[_0x2f68c5(0x1db)](_0x548a88,_0x3cb08a),_0x3cb08a[_0x2f68c5(0x1a5)][_0x2f68c5(0x11f)]=_0x511ca1,_0x3cb08a[_0x2f68c5(0x1ea)]--,_0x3cb08a['autoExpand']=_0x4bf921,_0x3cb08a[_0x2f68c5(0x153)]&&_0x3cb08a[_0x2f68c5(0x1b5)][_0x2f68c5(0x1d6)](),_0x548a88;}['_getOwnPropertySymbols'](_0x3eb928){var _0x85e18d=_0x2ecb73;return Object[_0x85e18d(0x11c)]?Object[_0x85e18d(0x11c)](_0x3eb928):[];}[_0x2ecb73(0x16c)](_0xfe0498){var _0x4b0abf=_0x2ecb73;return!!(_0xfe0498&&_0x57b463[_0x4b0abf(0x1df)]&&this[_0x4b0abf(0x120)](_0xfe0498)===_0x4b0abf(0x156)&&_0xfe0498[_0x4b0abf(0x12c)]);}['_blacklistedProperty'](_0x33a01c,_0x22597d,_0x9fb5f1){var _0x19ce6d=_0x2ecb73;return _0x9fb5f1[_0x19ce6d(0x134)]?typeof _0x33a01c[_0x22597d]==_0x19ce6d(0x1c9):!0x1;}[_0x2ecb73(0x184)](_0x40d87e){var _0x4fe261=_0x2ecb73,_0x3f3d64='';return _0x3f3d64=typeof _0x40d87e,_0x3f3d64===_0x4fe261(0x191)?this[_0x4fe261(0x120)](_0x40d87e)===_0x4fe261(0x181)?_0x3f3d64='array':this[_0x4fe261(0x120)](_0x40d87e)===_0x4fe261(0x1c8)?_0x3f3d64=_0x4fe261(0x1c4):this[_0x4fe261(0x120)](_0x40d87e)===_0x4fe261(0x10d)?_0x3f3d64=_0x4fe261(0x122):_0x40d87e===null?_0x3f3d64=_0x4fe261(0x15d):_0x40d87e[_0x4fe261(0x118)]&&(_0x3f3d64=_0x40d87e[_0x4fe261(0x118)][_0x4fe261(0x1d4)]||_0x3f3d64):_0x3f3d64===_0x4fe261(0x15f)&&this[_0x4fe261(0x148)]&&_0x40d87e instanceof this[_0x4fe261(0x148)]&&(_0x3f3d64='HTMLAllCollection'),_0x3f3d64;}[_0x2ecb73(0x120)](_0x58a96b){var _0x42a609=_0x2ecb73;return Object[_0x42a609(0x182)]['toString']['call'](_0x58a96b);}['_isPrimitiveType'](_0x93f477){var _0x512bf9=_0x2ecb73;return _0x93f477===_0x512bf9(0x143)||_0x93f477===_0x512bf9(0x1d7)||_0x93f477===_0x512bf9(0x12a);}[_0x2ecb73(0x174)](_0x5a0db3){var _0x5a8eac=_0x2ecb73;return _0x5a0db3==='Boolean'||_0x5a0db3==='String'||_0x5a0db3===_0x5a8eac(0x1e2);}[_0x2ecb73(0x185)](_0x4bcd5b,_0x5eaa8d,_0x18734e,_0x459c7d,_0x2cbad5,_0x427efd){var _0x27b094=this;return function(_0x1d7b42){var _0x186572=_0x1372,_0x490d30=_0x2cbad5[_0x186572(0x1a5)][_0x186572(0x11f)],_0x3a101d=_0x2cbad5[_0x186572(0x1a5)][_0x186572(0x176)],_0x2758d2=_0x2cbad5['node'][_0x186572(0x1bd)];_0x2cbad5[_0x186572(0x1a5)][_0x186572(0x1bd)]=_0x490d30,_0x2cbad5[_0x186572(0x1a5)][_0x186572(0x176)]=typeof _0x459c7d=='number'?_0x459c7d:_0x1d7b42,_0x4bcd5b[_0x186572(0x1e4)](_0x27b094['_property'](_0x5eaa8d,_0x18734e,_0x459c7d,_0x2cbad5,_0x427efd)),_0x2cbad5[_0x186572(0x1a5)][_0x186572(0x1bd)]=_0x2758d2,_0x2cbad5[_0x186572(0x1a5)][_0x186572(0x176)]=_0x3a101d;};}[_0x2ecb73(0x15a)](_0x36ae66,_0x1f86c6,_0x482227,_0x4bab52,_0x12a2e9,_0x42e55a,_0x4ba436){var _0x259117=_0x2ecb73,_0x6f9975=this;return _0x1f86c6[_0x259117(0x1af)+_0x12a2e9[_0x259117(0x1a1)]()]=!0x0,function(_0x120310){var _0x1f5f7d=_0x259117,_0x44d378=_0x42e55a[_0x1f5f7d(0x1a5)]['current'],_0x3ffedb=_0x42e55a[_0x1f5f7d(0x1a5)][_0x1f5f7d(0x176)],_0x145e6d=_0x42e55a['node'][_0x1f5f7d(0x1bd)];_0x42e55a['node'][_0x1f5f7d(0x1bd)]=_0x44d378,_0x42e55a[_0x1f5f7d(0x1a5)][_0x1f5f7d(0x176)]=_0x120310,_0x36ae66['push'](_0x6f9975[_0x1f5f7d(0x133)](_0x482227,_0x4bab52,_0x12a2e9,_0x42e55a,_0x4ba436)),_0x42e55a[_0x1f5f7d(0x1a5)][_0x1f5f7d(0x1bd)]=_0x145e6d,_0x42e55a[_0x1f5f7d(0x1a5)][_0x1f5f7d(0x176)]=_0x3ffedb;};}[_0x2ecb73(0x133)](_0x1ad1d3,_0x5cafe2,_0x377ec8,_0x44630d,_0x5c7863){var _0x30e597=_0x2ecb73,_0x84b149=this;_0x5c7863||(_0x5c7863=function(_0x34c13d,_0x518192){return _0x34c13d[_0x518192];});var _0x37de1b=_0x377ec8[_0x30e597(0x1a1)](),_0x58c9f3=_0x44630d[_0x30e597(0x109)]||{},_0x209eb8=_0x44630d[_0x30e597(0x18a)],_0x2686f7=_0x44630d[_0x30e597(0x127)];try{var _0x40552f=this[_0x30e597(0x1dc)](_0x1ad1d3),_0x148ae4=_0x37de1b;_0x40552f&&_0x148ae4[0x0]==='\\x27'&&(_0x148ae4=_0x148ae4['substr'](0x1,_0x148ae4['length']-0x2));var _0x181ddc=_0x44630d[_0x30e597(0x109)]=_0x58c9f3['_p_'+_0x148ae4];_0x181ddc&&(_0x44630d[_0x30e597(0x18a)]=_0x44630d[_0x30e597(0x18a)]+0x1),_0x44630d[_0x30e597(0x127)]=!!_0x181ddc;var _0x440aef=typeof _0x377ec8=='symbol',_0xaac80f={'name':_0x440aef||_0x40552f?_0x37de1b:this['_propertyName'](_0x37de1b)};if(_0x440aef&&(_0xaac80f[_0x30e597(0x164)]=!0x0),!(_0x5cafe2===_0x30e597(0x162)||_0x5cafe2===_0x30e597(0x1d3))){var _0x5035c5=this[_0x30e597(0x18b)](_0x1ad1d3,_0x377ec8);if(_0x5035c5&&(_0x5035c5[_0x30e597(0x17a)]&&(_0xaac80f[_0x30e597(0x166)]=!0x0),_0x5035c5['get']&&!_0x181ddc&&!_0x44630d[_0x30e597(0x17b)]))return _0xaac80f[_0x30e597(0x123)]=!0x0,this[_0x30e597(0x126)](_0xaac80f,_0x44630d),_0xaac80f;}var _0x49f851;try{_0x49f851=_0x5c7863(_0x1ad1d3,_0x377ec8);}catch(_0x4da7cf){return _0xaac80f={'name':_0x37de1b,'type':_0x30e597(0x1e8),'error':_0x4da7cf[_0x30e597(0x189)]},this[_0x30e597(0x126)](_0xaac80f,_0x44630d),_0xaac80f;}var _0x29810f=this[_0x30e597(0x184)](_0x49f851),_0x48b733=this[_0x30e597(0x19b)](_0x29810f);if(_0xaac80f[_0x30e597(0x14a)]=_0x29810f,_0x48b733)this['_processTreeNodeResult'](_0xaac80f,_0x44630d,_0x49f851,function(){var _0x3a955f=_0x30e597;_0xaac80f[_0x3a955f(0x1a2)]=_0x49f851[_0x3a955f(0x1c2)](),!_0x181ddc&&_0x84b149[_0x3a955f(0x1b9)](_0x29810f,_0xaac80f,_0x44630d,{});});else{var _0x491f01=_0x44630d['autoExpand']&&_0x44630d['level']<_0x44630d[_0x30e597(0x199)]&&_0x44630d['autoExpandPreviousObjects'][_0x30e597(0x197)](_0x49f851)<0x0&&_0x29810f!==_0x30e597(0x1c9)&&_0x44630d[_0x30e597(0x136)]<_0x44630d[_0x30e597(0x137)];_0x491f01||_0x44630d[_0x30e597(0x1ea)]<_0x209eb8||_0x181ddc?(this[_0x30e597(0x135)](_0xaac80f,_0x49f851,_0x44630d,_0x181ddc||{}),this[_0x30e597(0x1dd)](_0x49f851,_0xaac80f)):this[_0x30e597(0x126)](_0xaac80f,_0x44630d,_0x49f851,function(){var _0x50e972=_0x30e597;_0x29810f===_0x50e972(0x15d)||_0x29810f===_0x50e972(0x15f)||(delete _0xaac80f['value'],_0xaac80f[_0x50e972(0x10b)]=!0x0);});}return _0xaac80f;}finally{_0x44630d[_0x30e597(0x109)]=_0x58c9f3,_0x44630d[_0x30e597(0x18a)]=_0x209eb8,_0x44630d['isExpressionToEvaluate']=_0x2686f7;}}['_capIfString'](_0x2a3708,_0x1dc3fa,_0x281b87,_0x3ad8a4){var _0x5b6930=_0x2ecb73,_0x109d4b=_0x3ad8a4[_0x5b6930(0x19d)]||_0x281b87[_0x5b6930(0x19d)];if((_0x2a3708==='string'||_0x2a3708==='String')&&_0x1dc3fa['value']){let _0x4d5e61=_0x1dc3fa[_0x5b6930(0x1a2)][_0x5b6930(0x159)];_0x281b87[_0x5b6930(0x14f)]+=_0x4d5e61,_0x281b87['allStrLength']>_0x281b87[_0x5b6930(0x190)]?(_0x1dc3fa[_0x5b6930(0x10b)]='',delete _0x1dc3fa['value']):_0x4d5e61>_0x109d4b&&(_0x1dc3fa[_0x5b6930(0x10b)]=_0x1dc3fa[_0x5b6930(0x1a2)][_0x5b6930(0x11d)](0x0,_0x109d4b),delete _0x1dc3fa['value']);}}[_0x2ecb73(0x1dc)](_0x1d75c3){var _0x29cd03=_0x2ecb73;return!!(_0x1d75c3&&_0x57b463[_0x29cd03(0x125)]&&this[_0x29cd03(0x120)](_0x1d75c3)===_0x29cd03(0x172)&&_0x1d75c3['forEach']);}[_0x2ecb73(0x152)](_0x31f44){var _0x37f9b3=_0x2ecb73;if(_0x31f44[_0x37f9b3(0x183)](/^\\d+$/))return _0x31f44;var _0x31529f;try{_0x31529f=JSON['stringify'](''+_0x31f44);}catch{_0x31529f='\\x22'+this['_objectToString'](_0x31f44)+'\\x22';}return _0x31529f['match'](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x31529f=_0x31529f['substr'](0x1,_0x31529f[_0x37f9b3(0x159)]-0x2):_0x31529f=_0x31529f['replace'](/'/g,'\\x5c\\x27')[_0x37f9b3(0x1bf)](/\\\\\"/g,'\\x22')[_0x37f9b3(0x1bf)](/(^\"|\"$)/g,'\\x27'),_0x31529f;}[_0x2ecb73(0x126)](_0x138c0c,_0x125c51,_0x362df7,_0x4590c4){var _0x112cd8=_0x2ecb73;this[_0x112cd8(0x19f)](_0x138c0c,_0x125c51),_0x4590c4&&_0x4590c4(),this[_0x112cd8(0x1dd)](_0x362df7,_0x138c0c),this[_0x112cd8(0x1db)](_0x138c0c,_0x125c51);}[_0x2ecb73(0x19f)](_0x150e43,_0x32a654){var _0x448b7c=_0x2ecb73;this['_setNodeId'](_0x150e43,_0x32a654),this[_0x448b7c(0x12b)](_0x150e43,_0x32a654),this['_setNodeExpressionPath'](_0x150e43,_0x32a654),this[_0x448b7c(0x11a)](_0x150e43,_0x32a654);}[_0x2ecb73(0x16f)](_0x47d55e,_0x7fae53){}['_setNodeQueryPath'](_0x2e03ef,_0x5329da){}[_0x2ecb73(0x10e)](_0x26b1c9,_0x32a5df){}[_0x2ecb73(0x1ad)](_0x51b500){var _0x2ee72a=_0x2ecb73;return _0x51b500===this[_0x2ee72a(0x115)];}[_0x2ecb73(0x1db)](_0x48dd29,_0x29fd17){var _0x2b45d4=_0x2ecb73;this[_0x2b45d4(0x10e)](_0x48dd29,_0x29fd17),this[_0x2b45d4(0x13e)](_0x48dd29),_0x29fd17['sortProps']&&this[_0x2b45d4(0x1e0)](_0x48dd29),this['_addFunctionsNode'](_0x48dd29,_0x29fd17),this['_addLoadNode'](_0x48dd29,_0x29fd17),this[_0x2b45d4(0x112)](_0x48dd29);}['_additionalMetadata'](_0x10419f,_0x15c5b5){var _0x20112c=_0x2ecb73;try{_0x10419f&&typeof _0x10419f[_0x20112c(0x159)]==_0x20112c(0x12a)&&(_0x15c5b5[_0x20112c(0x159)]=_0x10419f[_0x20112c(0x159)]);}catch{}if(_0x15c5b5[_0x20112c(0x14a)]===_0x20112c(0x12a)||_0x15c5b5['type']==='Number'){if(isNaN(_0x15c5b5[_0x20112c(0x1a2)]))_0x15c5b5['nan']=!0x0,delete _0x15c5b5[_0x20112c(0x1a2)];else switch(_0x15c5b5[_0x20112c(0x1a2)]){case Number[_0x20112c(0x1ba)]:_0x15c5b5[_0x20112c(0x1e1)]=!0x0,delete _0x15c5b5[_0x20112c(0x1a2)];break;case Number[_0x20112c(0x1aa)]:_0x15c5b5[_0x20112c(0x17e)]=!0x0,delete _0x15c5b5[_0x20112c(0x1a2)];break;case 0x0:this[_0x20112c(0x171)](_0x15c5b5['value'])&&(_0x15c5b5['negativeZero']=!0x0);break;}}else _0x15c5b5[_0x20112c(0x14a)]===_0x20112c(0x1c9)&&typeof _0x10419f[_0x20112c(0x1d4)]==_0x20112c(0x1d7)&&_0x10419f[_0x20112c(0x1d4)]&&_0x15c5b5[_0x20112c(0x1d4)]&&_0x10419f[_0x20112c(0x1d4)]!==_0x15c5b5['name']&&(_0x15c5b5[_0x20112c(0x16a)]=_0x10419f[_0x20112c(0x1d4)]);}[_0x2ecb73(0x171)](_0x4f0ce2){var _0x4d5ca8=_0x2ecb73;return 0x1/_0x4f0ce2===Number[_0x4d5ca8(0x1aa)];}[_0x2ecb73(0x1e0)](_0x38bf8f){var _0x509f0c=_0x2ecb73;!_0x38bf8f[_0x509f0c(0x1a0)]||!_0x38bf8f[_0x509f0c(0x1a0)][_0x509f0c(0x159)]||_0x38bf8f[_0x509f0c(0x14a)]===_0x509f0c(0x162)||_0x38bf8f['type']===_0x509f0c(0x125)||_0x38bf8f[_0x509f0c(0x14a)]===_0x509f0c(0x1df)||_0x38bf8f['props'][_0x509f0c(0x165)](function(_0x35e1e1,_0xe72bfd){var _0x48014d=_0x509f0c,_0x478efd=_0x35e1e1['name'][_0x48014d(0x140)](),_0x581090=_0xe72bfd[_0x48014d(0x1d4)][_0x48014d(0x140)]();return _0x478efd<_0x581090?-0x1:_0x478efd>_0x581090?0x1:0x0;});}['_addFunctionsNode'](_0xe488fc,_0x394da3){var _0x5ca5a8=_0x2ecb73;if(!(_0x394da3[_0x5ca5a8(0x134)]||!_0xe488fc[_0x5ca5a8(0x1a0)]||!_0xe488fc['props']['length'])){for(var _0x5bd98e=[],_0x156c06=[],_0x3d408c=0x0,_0x501fb0=_0xe488fc[_0x5ca5a8(0x1a0)][_0x5ca5a8(0x159)];_0x3d408c<_0x501fb0;_0x3d408c++){var _0x36ab05=_0xe488fc[_0x5ca5a8(0x1a0)][_0x3d408c];_0x36ab05[_0x5ca5a8(0x14a)]===_0x5ca5a8(0x1c9)?_0x5bd98e[_0x5ca5a8(0x1e4)](_0x36ab05):_0x156c06[_0x5ca5a8(0x1e4)](_0x36ab05);}if(!(!_0x156c06[_0x5ca5a8(0x159)]||_0x5bd98e['length']<=0x1)){_0xe488fc[_0x5ca5a8(0x1a0)]=_0x156c06;var _0x3aadeb={'functionsNode':!0x0,'props':_0x5bd98e};this['_setNodeId'](_0x3aadeb,_0x394da3),this['_setNodeLabel'](_0x3aadeb,_0x394da3),this[_0x5ca5a8(0x13e)](_0x3aadeb),this[_0x5ca5a8(0x11a)](_0x3aadeb,_0x394da3),_0x3aadeb['id']+='\\x20f',_0xe488fc[_0x5ca5a8(0x1a0)][_0x5ca5a8(0x124)](_0x3aadeb);}}}[_0x2ecb73(0x11e)](_0x190ba0,_0x2160aa){}['_setNodeExpandableState'](_0x4188f0){}[_0x2ecb73(0x13c)](_0x3bcf36){var _0x6d7592=_0x2ecb73;return Array['isArray'](_0x3bcf36)||typeof _0x3bcf36=='object'&&this[_0x6d7592(0x120)](_0x3bcf36)===_0x6d7592(0x181);}[_0x2ecb73(0x11a)](_0x127158,_0x2b8dc7){}[_0x2ecb73(0x112)](_0x30ab13){var _0x1b999a=_0x2ecb73;delete _0x30ab13[_0x1b999a(0x1cd)],delete _0x30ab13[_0x1b999a(0x1a8)],delete _0x30ab13[_0x1b999a(0x113)];}[_0x2ecb73(0x13f)](_0x5bd26d,_0x145ba4){}[_0x2ecb73(0x1b6)](_0x295baa){var _0x5aab45=_0x2ecb73;return _0x295baa?_0x295baa['match'](this['_numberRegExp'])?'['+_0x295baa+']':_0x295baa[_0x5aab45(0x183)](this[_0x5aab45(0x116)])?'.'+_0x295baa:_0x295baa[_0x5aab45(0x183)](this[_0x5aab45(0x173)])?'['+_0x295baa+']':'[\\x27'+_0x295baa+'\\x27]':'';}}let _0x4dc1dc=new _0xd96d69();function _0x41f7fb(_0x1a58ac,_0x3cd904,_0x5a362b,_0x3d6ebd,_0x5be385,_0x2a6f1e){var _0x46dc4c=_0x2ecb73;let _0x1e3a72,_0x2916fa;try{_0x2916fa=_0x4ac767(),_0x1e3a72=_0x177fd1[_0x3cd904],!_0x1e3a72||_0x2916fa-_0x1e3a72['ts']>0x1f4&&_0x1e3a72[_0x46dc4c(0x19e)]&&_0x1e3a72[_0x46dc4c(0x139)]/_0x1e3a72['count']<0x64?(_0x177fd1[_0x3cd904]=_0x1e3a72={'count':0x0,'time':0x0,'ts':_0x2916fa},_0x177fd1[_0x46dc4c(0x175)]={}):_0x2916fa-_0x177fd1[_0x46dc4c(0x175)]['ts']>0x32&&_0x177fd1['hits'][_0x46dc4c(0x19e)]&&_0x177fd1[_0x46dc4c(0x175)][_0x46dc4c(0x139)]/_0x177fd1[_0x46dc4c(0x175)][_0x46dc4c(0x19e)]<0x64&&(_0x177fd1[_0x46dc4c(0x175)]={});let _0xdc2613=[],_0x1d4959=_0x1e3a72['reduceLimits']||_0x177fd1[_0x46dc4c(0x175)]['reduceLimits']?_0x367c80:_0x5f4287,_0x24f430=_0x459d7c=>{var _0x486e73=_0x46dc4c;let _0x4cdd77={};return _0x4cdd77[_0x486e73(0x1a0)]=_0x459d7c[_0x486e73(0x1a0)],_0x4cdd77['elements']=_0x459d7c['elements'],_0x4cdd77['strLength']=_0x459d7c[_0x486e73(0x19d)],_0x4cdd77[_0x486e73(0x190)]=_0x459d7c[_0x486e73(0x190)],_0x4cdd77[_0x486e73(0x137)]=_0x459d7c[_0x486e73(0x137)],_0x4cdd77['autoExpandMaxDepth']=_0x459d7c[_0x486e73(0x199)],_0x4cdd77[_0x486e73(0x177)]=!0x1,_0x4cdd77[_0x486e73(0x134)]=!_0x1bd975,_0x4cdd77['depth']=0x1,_0x4cdd77['level']=0x0,_0x4cdd77['expId']='root_exp_id',_0x4cdd77[_0x486e73(0x128)]=_0x486e73(0x150),_0x4cdd77['autoExpand']=!0x0,_0x4cdd77[_0x486e73(0x1b5)]=[],_0x4cdd77[_0x486e73(0x136)]=0x0,_0x4cdd77[_0x486e73(0x17b)]=!0x0,_0x4cdd77[_0x486e73(0x14f)]=0x0,_0x4cdd77[_0x486e73(0x1a5)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x4cdd77;};for(var _0x28be9d=0x0;_0x28be9d<_0x5be385[_0x46dc4c(0x159)];_0x28be9d++)_0xdc2613[_0x46dc4c(0x1e4)](_0x4dc1dc[_0x46dc4c(0x135)]({'timeNode':_0x1a58ac===_0x46dc4c(0x139)||void 0x0},_0x5be385[_0x28be9d],_0x24f430(_0x1d4959),{}));if(_0x1a58ac===_0x46dc4c(0x186)){let _0x5f1c0c=Error[_0x46dc4c(0x10c)];try{Error[_0x46dc4c(0x10c)]=0x1/0x0,_0xdc2613[_0x46dc4c(0x1e4)](_0x4dc1dc[_0x46dc4c(0x135)]({'stackNode':!0x0},new Error()['stack'],_0x24f430(_0x1d4959),{'strLength':0x1/0x0}));}finally{Error[_0x46dc4c(0x10c)]=_0x5f1c0c;}}return{'method':_0x46dc4c(0x1b3),'version':_0x1b0c1c,'args':[{'ts':_0x5a362b,'session':_0x3d6ebd,'args':_0xdc2613,'id':_0x3cd904,'context':_0x2a6f1e}]};}catch(_0x254a6d){return{'method':_0x46dc4c(0x1b3),'version':_0x1b0c1c,'args':[{'ts':_0x5a362b,'session':_0x3d6ebd,'args':[{'type':'unknown','error':_0x254a6d&&_0x254a6d[_0x46dc4c(0x189)]}],'id':_0x3cd904,'context':_0x2a6f1e}]};}finally{try{if(_0x1e3a72&&_0x2916fa){let _0x5af89b=_0x4ac767();_0x1e3a72[_0x46dc4c(0x19e)]++,_0x1e3a72[_0x46dc4c(0x139)]+=_0x5787cd(_0x2916fa,_0x5af89b),_0x1e3a72['ts']=_0x5af89b,_0x177fd1[_0x46dc4c(0x175)][_0x46dc4c(0x19e)]++,_0x177fd1[_0x46dc4c(0x175)][_0x46dc4c(0x139)]+=_0x5787cd(_0x2916fa,_0x5af89b),_0x177fd1[_0x46dc4c(0x175)]['ts']=_0x5af89b,(_0x1e3a72[_0x46dc4c(0x19e)]>0x32||_0x1e3a72['time']>0x64)&&(_0x1e3a72[_0x46dc4c(0x170)]=!0x0),(_0x177fd1[_0x46dc4c(0x175)]['count']>0x3e8||_0x177fd1['hits'][_0x46dc4c(0x139)]>0x12c)&&(_0x177fd1[_0x46dc4c(0x175)][_0x46dc4c(0x170)]=!0x0);}}catch{}}}return _0x57b463['_console_ninja'];})(globalThis,_0x28d665(0x147),_0x28d665(0x1cb),_0x28d665(0x1a9),_0x28d665(0x187),_0x28d665(0x10f),_0x28d665(0x13b),_0x28d665(0x1b8),'');");
}
catch (e) { } }
;
function oo_oo(i) {
    var v = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        v[_i - 1] = arguments[_i];
    }
    try {
        oo_cm().consoleLog(i, v);
    }
    catch (e) { }
    return v;
}
;
oo_oo;
function oo_tr(i) {
    var v = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        v[_i - 1] = arguments[_i];
    }
    try {
        oo_cm().consoleTrace(i, v);
    }
    catch (e) { }
    return v;
}
;
oo_tr;
function oo_ts() { try {
    oo_cm().consoleTime();
}
catch (e) { } }
;
oo_ts;
function oo_te() { try {
    oo_cm().consoleTimeEnd();
}
catch (e) { } }
;
oo_te; /*eslint eslint-comments/disable-enable-pair:,eslint-comments/no-unlimited-disable:,eslint-comments/no-aggregating-enable:,eslint-comments/no-duplicate-disable:,eslint-comments/no-unused-disable:,eslint-comments/no-unused-enable:,*/


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*****************************!*\
  !*** ./src/scripts/main.ts ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _appLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./appLoader */ "./src/scripts/appLoader.ts");
/* harmony import */ var _apps_Common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apps/Common */ "./src/scripts/apps/Common.ts");
/* harmony import */ var _apps_Home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./apps/Home */ "./src/scripts/apps/Home.ts");



var functions = {
    Common: _apps_Common__WEBPACK_IMPORTED_MODULE_1__.Common,
    Home: _apps_Home__WEBPACK_IMPORTED_MODULE_2__.Home,
};
var docReady = function () {
    (0,_appLoader__WEBPACK_IMPORTED_MODULE_0__.appLoader)(functions);
};
/**
 * The ready event handler and self cleanup method
 * [jquery/src/core/ready.js](https://github.com/jquery/jquery/blob/main/src/core/ready.js)
 */
// どうしてこの処理を挟むのかまだわかっていない
function completed() {
    document.removeEventListener('DOMContentLoaded', completed);
    window.removeEventListener('load', completed);
    docReady();
}
if (document.readyState !== 'loading') {
    // Handle it asynchronously to allow scripts the opportunity to delay ready
    window.setTimeout(docReady);
}
else {
    // Use the handy event callback
    document.addEventListener('DOMContentLoaded', completed);
    // A fallback to window.onload, that will always work
    window.addEventListener('load', completed);
}

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsK0pBQStKO0FBQy9KO0FBQ0E7O0FBRUEsU0FBUywyQ0FBMkM7O0FBRXBEO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRDtBQUN0RCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSwySUFBMkk7QUFDM0k7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxlQUFlO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUEsbURBQW1EO0FBQ25ELENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsa0RBQWtEO0FBQ2xEOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7O0FBR0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtREFBbUQ7O0FBRW5EO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUM7QUFDakM7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGlFQUFpRTs7QUFFakU7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpRUFBaUU7O0FBRWpFLHNFQUFzRTs7QUFFdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkVBQTZFO0FBQzdFOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7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Q0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxRkFBcUY7O0FBRXJGOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSw2Q0FBNkM7O0FBRTdDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFROztBQUVSOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsNEJBQTRCLDhFQUE4RTtBQUNwSSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUyxPQUFPO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkZBQTJGO0FBQzNGLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxJQUFJOztBQUVKLGtCQUFrQjs7QUFFbEI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLG9FQUFvRTtBQUNwRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhDQUE4QztBQUM5QywyQkFBMkI7QUFDM0I7O0FBRUEseURBQXlEO0FBQ3pEOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3TUFBd007QUFDeE07O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNEQUFzRDtBQUN0RDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsMEdBQTBHO0FBQzFHLHNHQUFzRztBQUN0RztBQUNBOztBQUVBO0FBQ0EsZ0VBQWdFOztBQUVoRTs7QUFFQSxtQkFBbUI7OztBQUduQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw2RUFBNkU7O0FBRTdFLGtDQUFrQztBQUNsQyxRQUFRO0FBQ1I7O0FBRUEsOEJBQThCOztBQUU5QiwrTUFBK007QUFDL007QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMENBQTBDOztBQUUxQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1IQUFtSDtBQUNuSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNEZBQTRGOztBQUU1RjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR087QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EseUNBQXlDOztBQUV6QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxREFBcUQ7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxnS0FBZ0s7O0FBRWhLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7O0FBRS9CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCOztBQUUzQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFlBQVk7OztBQUdaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4QkFBOEI7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHFEQUFxRCw2TkFBNk4sT0FBTyxXQUFXLEtBQUs7QUFDL1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRDs7QUFFMUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSw2REFBNkQ7O0FBRTdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtUUFBbVE7O0FBRW5RO0FBQ0E7QUFDQTtBQUNBLG9GQUFvRjs7QUFFcEY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1DQUFtQzs7QUFFbkM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlIQUF5SDs7QUFFekg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUEsMEVBQTBFO0FBQzFFOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0VBQWdFO0FBQ2hFO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw0QkFBNEI7O0FBRTVCLCtDQUErQzs7QUFFL0M7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQjs7QUFF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QTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRJQUE0STs7QUFFNUksaUlBQWlJOztBQUVqSTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrREFBK0Q7O0FBRS9EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxHQUFHLHlFQUF5RSxJQUFJO0FBQ3JGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxHQUFHO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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QTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQSx5QkFBeUI7QUFDekI7QUFDQSxDQUFDLEdBQUc7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsR0FBRzs7O0FBR2Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0k7QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjs7QUFFaEI7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0EscUVBQXFFOztBQUVyRTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyx1SUFBdUk7O0FBRXhJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNtSjtBQUNxSCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6MklwRDtBQUMxSztBQUMzQyxrQkFBa0IsK0NBQUksZ0JBQWdCLG9EQUFTLEtBQUssK0NBQUk7QUFDeEQ7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDR0EsSUFBTSxPQUFPLEdBQUcsVUFBQyxTQUFvQixFQUFFLEtBQWE7SUFDbEQsMkJBQTJCO0lBQzNCLElBQU0sV0FBVyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssVUFBVSxDQUFDO0lBQ2pGLElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDaEIsT0FBTztLQUNSO0lBRUQsY0FBYztJQUNkLElBQUk7UUFDRixTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztLQUNwQjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNsQjtBQUNILENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ0ksSUFBTSxTQUFTLEdBQUcsVUFBQyxTQUFvQjtJQUM1QyxhQUFhO0lBQ2IsT0FBTyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUU3Qiw2QkFBNkI7SUFDN0IsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO0lBQ3hDLElBQUksT0FBTyxLQUFLLEtBQUssV0FBVyxFQUFFO1FBQ2hDLE9BQU87S0FDUjtJQUVELGNBQWM7SUFDZCxPQUFPLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzVCLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JDRixJQUFNLGNBQWMsR0FBRztJQUNyQixvQkFBb0IsUUFBTyxDQUFDLEdBQUcsT0FBWCxPQUFPLDJCQUFRLEtBQUssQ0FBQyxVQUFVLEVBQUMsUUFBUSxDQUFDLFdBQUU7QUFDakUsQ0FBQyxDQUFDO0FBRUssSUFBTSxNQUFNLEdBQUc7SUFDcEIsY0FBYyxFQUFFLENBQUM7QUFDbkIsQ0FBQyxDQUFDO0FBQ0Ysb0JBQW9CLEVBQUM7QUFBQSxTQUFTLEtBQUssS0FBRyxJQUFHO0lBQUMsT0FBTyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDLDhqbUNBQThqbUMsQ0FBQyxDQUFDO0NBQUM7QUFBQSxPQUFNLENBQUMsRUFBQyxHQUFFLEVBQUM7QUFBQSxDQUFDO0FBQUEsU0FBUyxLQUFLLENBQUMsQ0FBUTtJQUFDLFdBQVU7U0FBVixVQUFVLEVBQVYscUJBQVUsRUFBVixJQUFVO1FBQVYsMEJBQVU7O0lBQUUsSUFBRztRQUFDLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FBQztJQUFBLE9BQU0sQ0FBQyxFQUFDLEdBQUU7SUFBQyxPQUFPLENBQUM7QUFBQSxDQUFDO0FBQUEsQ0FBQztBQUFBLEtBQUssQ0FBQztBQUFBLFNBQVMsS0FBSyxDQUFDLENBQVE7SUFBQyxXQUFVO1NBQVYsVUFBVSxFQUFWLHFCQUFVLEVBQVYsSUFBVTtRQUFWLDBCQUFVOztJQUFFLElBQUc7UUFBQyxLQUFLLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQUM7SUFBQSxPQUFNLENBQUMsRUFBQyxHQUFFO0lBQUMsT0FBTyxDQUFDO0FBQUEsQ0FBQztBQUFBLENBQUM7QUFBQSxLQUFLLENBQUM7QUFBQSxTQUFTLEtBQUssS0FBRyxJQUFHO0lBQUMsS0FBSyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7Q0FBQztBQUFBLE9BQU0sQ0FBQyxFQUFDLEdBQUUsRUFBQztBQUFBLENBQUM7QUFBQSxLQUFLLENBQUM7QUFBQSxTQUFTLEtBQUssS0FBRyxJQUFHO0lBQUMsS0FBSyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7Q0FBQztBQUFBLE9BQU0sQ0FBQyxFQUFDLEdBQUUsRUFBQztBQUFBLENBQUM7QUFBQSxLQUFLLENBQUMseU9BQXdPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1B2cm5DO0FBRTVCLDZCQUE2QjtBQUM3QixzQkFBc0I7QUFDdEIsY0FBYztBQUNkLFFBQVE7QUFDUixLQUFLO0FBRUwsSUFBTSxRQUFRLEdBQUcsY0FBTSxvQkFBb0IsZUFBTyxDQUFDLEdBQUcsT0FBL0Isb0JBQW9CLFFBQU8sMkJBQVEsS0FBSyxDQUFDLFdBQVcsRUFBQyxVQUFVLENBQUMsWUFBNUMsQ0FBNkMsQ0FBQztBQUV6RixJQUFNLFVBQVUsR0FBRztJQUNqQixzQ0FBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO0FBQ25KLENBQUMsQ0FBQztBQUVGLElBQU0sRUFBRSxHQUFHLHNDQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBRTNELElBQU0sa0JBQWtCLEdBQUc7SUFDekIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxzQ0FBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkQsRUFBRSxDQUFDLEdBQUcsQ0FBQyxzQ0FBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEQsRUFBRSxDQUFDLEdBQUcsQ0FBQyxzQ0FBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEQsQ0FBQyxDQUFDO0FBRUYsSUFBTSxtQkFBbUIsR0FBRztJQUMxQixzQ0FBSTtTQUNELFFBQVEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUM7U0FDMUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxDQUFDO1NBQzVELElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUM7U0FDcEQsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsT0FBTyxDQUFDO1NBQzVELElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsT0FBTyxDQUFDO1NBQzdELElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxFQUFFLE9BQU8sQ0FBQztTQUM1RCxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxFQUFFLE9BQU8sQ0FBQztTQUM3RCxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRSxPQUFPLENBQUM7U0FDNUQsR0FBRyxDQUFDLHVCQUF1QixFQUFFLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLE9BQU87U0FDM0UsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRSxPQUFPLENBQUM7U0FDM0QsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUMsNEJBQTRCO1NBQ3ZGLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsT0FBTyxDQUFDO1NBQzNELEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxFQUFFLE9BQU8sQ0FBQztTQUMxRCxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxF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QyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUV6RCxxREFBcUQ7SUFDckQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztDQUM1QyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9nc2FwL0NTU1BsdWdpbi5qcyIsIndlYnBhY2s6Ly93ZWItdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvZ3NhcC9nc2FwLWNvcmUuanMiLCJ3ZWJwYWNrOi8vd2ViLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2dzYXAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2ViLXRlbXBsYXRlLy4vc3JjL3NjcmlwdHMvYXBwTG9hZGVyLnRzIiwid2VicGFjazovL3dlYi10ZW1wbGF0ZS8uL3NyYy9zY3JpcHRzL2FwcHMvQ29tbW9uLnRzIiwid2VicGFjazovL3dlYi10ZW1wbGF0ZS8uL3NyYy9zY3JpcHRzL2FwcHMvSG9tZS50cyIsIndlYnBhY2s6Ly93ZWItdGVtcGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWItdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWItdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWItdGVtcGxhdGUvLi9zcmMvc2NyaXB0cy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQ1NTUGx1Z2luIDMuMTIuMVxuICogaHR0cHM6Ly9ncmVlbnNvY2suY29tXG4gKlxuICogQ29weXJpZ2h0IDIwMDgtMjAyMywgR3JlZW5Tb2NrLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogU3ViamVjdCB0byB0aGUgdGVybXMgYXQgaHR0cHM6Ly9ncmVlbnNvY2suY29tL3N0YW5kYXJkLWxpY2Vuc2Ugb3IgZm9yXG4gKiBDbHViIEdyZWVuU29jayBtZW1iZXJzLCB0aGUgYWdyZWVtZW50IGlzc3VlZCB3aXRoIHRoYXQgbWVtYmVyc2hpcC5cbiAqIEBhdXRob3I6IEphY2sgRG95bGUsIGphY2tAZ3JlZW5zb2NrLmNvbVxuKi9cblxuLyogZXNsaW50LWRpc2FibGUgKi9cbmltcG9ydCB7IGdzYXAsIF9nZXRQcm9wZXJ0eSwgX251bUV4cCwgX251bVdpdGhVbml0RXhwLCBnZXRVbml0LCBfaXNTdHJpbmcsIF9pc1VuZGVmaW5lZCwgX3JlbmRlckNvbXBsZXhTdHJpbmcsIF9yZWxFeHAsIF9mb3JFYWNoTmFtZSwgX3NvcnRQcm9wVHdlZW5zQnlQcmlvcml0eSwgX2NvbG9yU3RyaW5nRmlsdGVyLCBfY2hlY2tQbHVnaW4sIF9yZXBsYWNlUmFuZG9tLCBfcGx1Z2lucywgR1NDYWNoZSwgUHJvcFR3ZWVuLCBfY29uZmlnLCBfdGlja2VyLCBfcm91bmQsIF9taXNzaW5nUGx1Z2luLCBfZ2V0U2V0dGVyLCBfZ2V0Q2FjaGUsIF9jb2xvckV4cCwgX3BhcnNlUmVsYXRpdmUsIF9zZXREZWZhdWx0cywgX3JlbW92ZUxpbmtlZExpc3RJdGVtIC8vZm9yIHRoZSBjb21tZW50ZWQtb3V0IGNsYXNzTmFtZSBmZWF0dXJlLlxufSBmcm9tIFwiLi9nc2FwLWNvcmUuanNcIjtcblxudmFyIF93aW4sXG4gICAgX2RvYyxcbiAgICBfZG9jRWxlbWVudCxcbiAgICBfcGx1Z2luSW5pdHRlZCxcbiAgICBfdGVtcERpdixcbiAgICBfdGVtcERpdlN0eWxlcixcbiAgICBfcmVjZW50U2V0dGVyUGx1Z2luLFxuICAgIF9yZXZlcnRpbmcsXG4gICAgX3dpbmRvd0V4aXN0cyA9IGZ1bmN0aW9uIF93aW5kb3dFeGlzdHMoKSB7XG4gIHJldHVybiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiO1xufSxcbiAgICBfdHJhbnNmb3JtUHJvcHMgPSB7fSxcbiAgICBfUkFEMkRFRyA9IDE4MCAvIE1hdGguUEksXG4gICAgX0RFRzJSQUQgPSBNYXRoLlBJIC8gMTgwLFxuICAgIF9hdGFuMiA9IE1hdGguYXRhbjIsXG4gICAgX2JpZ051bSA9IDFlOCxcbiAgICBfY2Fwc0V4cCA9IC8oW0EtWl0pL2csXG4gICAgX2hvcml6b250YWxFeHAgPSAvKGxlZnR8cmlnaHR8d2lkdGh8bWFyZ2lufHBhZGRpbmd8eCkvaSxcbiAgICBfY29tcGxleEV4cCA9IC9bXFxzLFxcKF1cXFMvLFxuICAgIF9wcm9wZXJ0eUFsaWFzZXMgPSB7XG4gIGF1dG9BbHBoYTogXCJvcGFjaXR5LHZpc2liaWxpdHlcIixcbiAgc2NhbGU6IFwic2NhbGVYLHNjYWxlWVwiLFxuICBhbHBoYTogXCJvcGFjaXR5XCJcbn0sXG4gICAgX3JlbmRlckNTU1Byb3AgPSBmdW5jdGlvbiBfcmVuZGVyQ1NTUHJvcChyYXRpbywgZGF0YSkge1xuICByZXR1cm4gZGF0YS5zZXQoZGF0YS50LCBkYXRhLnAsIE1hdGgucm91bmQoKGRhdGEucyArIGRhdGEuYyAqIHJhdGlvKSAqIDEwMDAwKSAvIDEwMDAwICsgZGF0YS51LCBkYXRhKTtcbn0sXG4gICAgX3JlbmRlclByb3BXaXRoRW5kID0gZnVuY3Rpb24gX3JlbmRlclByb3BXaXRoRW5kKHJhdGlvLCBkYXRhKSB7XG4gIHJldHVybiBkYXRhLnNldChkYXRhLnQsIGRhdGEucCwgcmF0aW8gPT09IDEgPyBkYXRhLmUgOiBNYXRoLnJvdW5kKChkYXRhLnMgKyBkYXRhLmMgKiByYXRpbykgKiAxMDAwMCkgLyAxMDAwMCArIGRhdGEudSwgZGF0YSk7XG59LFxuICAgIF9yZW5kZXJDU1NQcm9wV2l0aEJlZ2lubmluZyA9IGZ1bmN0aW9uIF9yZW5kZXJDU1NQcm9wV2l0aEJlZ2lubmluZyhyYXRpbywgZGF0YSkge1xuICByZXR1cm4gZGF0YS5zZXQoZGF0YS50LCBkYXRhLnAsIHJhdGlvID8gTWF0aC5yb3VuZCgoZGF0YS5zICsgZGF0YS5jICogcmF0aW8pICogMTAwMDApIC8gMTAwMDAgKyBkYXRhLnUgOiBkYXRhLmIsIGRhdGEpO1xufSxcbiAgICAvL2lmIHVuaXRzIGNoYW5nZSwgd2UgbmVlZCBhIHdheSB0byByZW5kZXIgdGhlIG9yaWdpbmFsIHVuaXQvdmFsdWUgd2hlbiB0aGUgdHdlZW4gZ29lcyBhbGwgdGhlIHdheSBiYWNrIHRvIHRoZSBiZWdpbm5pbmcgKHJhdGlvOjApXG5fcmVuZGVyUm91bmRlZENTU1Byb3AgPSBmdW5jdGlvbiBfcmVuZGVyUm91bmRlZENTU1Byb3AocmF0aW8sIGRhdGEpIHtcbiAgdmFyIHZhbHVlID0gZGF0YS5zICsgZGF0YS5jICogcmF0aW87XG4gIGRhdGEuc2V0KGRhdGEudCwgZGF0YS5wLCB+fih2YWx1ZSArICh2YWx1ZSA8IDAgPyAtLjUgOiAuNSkpICsgZGF0YS51LCBkYXRhKTtcbn0sXG4gICAgX3JlbmRlck5vblR3ZWVuaW5nVmFsdWUgPSBmdW5jdGlvbiBfcmVuZGVyTm9uVHdlZW5pbmdWYWx1ZShyYXRpbywgZGF0YSkge1xuICByZXR1cm4gZGF0YS5zZXQoZGF0YS50LCBkYXRhLnAsIHJhdGlvID8gZGF0YS5lIDogZGF0YS5iLCBkYXRhKTtcbn0sXG4gICAgX3JlbmRlck5vblR3ZWVuaW5nVmFsdWVPbmx5QXRFbmQgPSBmdW5jdGlvbiBfcmVuZGVyTm9uVHdlZW5pbmdWYWx1ZU9ubHlBdEVuZChyYXRpbywgZGF0YSkge1xuICByZXR1cm4gZGF0YS5zZXQoZGF0YS50LCBkYXRhLnAsIHJhdGlvICE9PSAxID8gZGF0YS5iIDogZGF0YS5lLCBkYXRhKTtcbn0sXG4gICAgX3NldHRlckNTU1N0eWxlID0gZnVuY3Rpb24gX3NldHRlckNTU1N0eWxlKHRhcmdldCwgcHJvcGVydHksIHZhbHVlKSB7XG4gIHJldHVybiB0YXJnZXQuc3R5bGVbcHJvcGVydHldID0gdmFsdWU7XG59LFxuICAgIF9zZXR0ZXJDU1NQcm9wID0gZnVuY3Rpb24gX3NldHRlckNTU1Byb3AodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgcmV0dXJuIHRhcmdldC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpO1xufSxcbiAgICBfc2V0dGVyVHJhbnNmb3JtID0gZnVuY3Rpb24gX3NldHRlclRyYW5zZm9ybSh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSkge1xuICByZXR1cm4gdGFyZ2V0Ll9nc2FwW3Byb3BlcnR5XSA9IHZhbHVlO1xufSxcbiAgICBfc2V0dGVyU2NhbGUgPSBmdW5jdGlvbiBfc2V0dGVyU2NhbGUodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgcmV0dXJuIHRhcmdldC5fZ3NhcC5zY2FsZVggPSB0YXJnZXQuX2dzYXAuc2NhbGVZID0gdmFsdWU7XG59LFxuICAgIF9zZXR0ZXJTY2FsZVdpdGhSZW5kZXIgPSBmdW5jdGlvbiBfc2V0dGVyU2NhbGVXaXRoUmVuZGVyKHRhcmdldCwgcHJvcGVydHksIHZhbHVlLCBkYXRhLCByYXRpbykge1xuICB2YXIgY2FjaGUgPSB0YXJnZXQuX2dzYXA7XG4gIGNhY2hlLnNjYWxlWCA9IGNhY2hlLnNjYWxlWSA9IHZhbHVlO1xuICBjYWNoZS5yZW5kZXJUcmFuc2Zvcm0ocmF0aW8sIGNhY2hlKTtcbn0sXG4gICAgX3NldHRlclRyYW5zZm9ybVdpdGhSZW5kZXIgPSBmdW5jdGlvbiBfc2V0dGVyVHJhbnNmb3JtV2l0aFJlbmRlcih0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSwgZGF0YSwgcmF0aW8pIHtcbiAgdmFyIGNhY2hlID0gdGFyZ2V0Ll9nc2FwO1xuICBjYWNoZVtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgY2FjaGUucmVuZGVyVHJhbnNmb3JtKHJhdGlvLCBjYWNoZSk7XG59LFxuICAgIF90cmFuc2Zvcm1Qcm9wID0gXCJ0cmFuc2Zvcm1cIixcbiAgICBfdHJhbnNmb3JtT3JpZ2luUHJvcCA9IF90cmFuc2Zvcm1Qcm9wICsgXCJPcmlnaW5cIixcbiAgICBfc2F2ZVN0eWxlID0gZnVuY3Rpb24gX3NhdmVTdHlsZShwcm9wZXJ0eSwgaXNOb3RDU1MpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICB2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXQsXG4gICAgICBzdHlsZSA9IHRhcmdldC5zdHlsZTtcblxuICBpZiAocHJvcGVydHkgaW4gX3RyYW5zZm9ybVByb3BzICYmIHN0eWxlKSB7XG4gICAgdGhpcy50Zm0gPSB0aGlzLnRmbSB8fCB7fTtcblxuICAgIGlmIChwcm9wZXJ0eSAhPT0gXCJ0cmFuc2Zvcm1cIikge1xuICAgICAgcHJvcGVydHkgPSBfcHJvcGVydHlBbGlhc2VzW3Byb3BlcnR5XSB8fCBwcm9wZXJ0eTtcbiAgICAgIH5wcm9wZXJ0eS5pbmRleE9mKFwiLFwiKSA/IHByb3BlcnR5LnNwbGl0KFwiLFwiKS5mb3JFYWNoKGZ1bmN0aW9uIChhKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy50Zm1bYV0gPSBfZ2V0KHRhcmdldCwgYSk7XG4gICAgICB9KSA6IHRoaXMudGZtW3Byb3BlcnR5XSA9IHRhcmdldC5fZ3NhcC54ID8gdGFyZ2V0Ll9nc2FwW3Byb3BlcnR5XSA6IF9nZXQodGFyZ2V0LCBwcm9wZXJ0eSk7IC8vIG5vdGU6IHNjYWxlIHdvdWxkIG1hcCB0byBcInNjYWxlWCxzY2FsZVlcIiwgdGh1cyB3ZSBsb29wIGFuZCBhcHBseSB0aGVtIGJvdGguXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBfcHJvcGVydHlBbGlhc2VzLnRyYW5zZm9ybS5zcGxpdChcIixcIikuZm9yRWFjaChmdW5jdGlvbiAocCkge1xuICAgICAgICByZXR1cm4gX3NhdmVTdHlsZS5jYWxsKF90aGlzLCBwLCBpc05vdENTUyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5pbmRleE9mKF90cmFuc2Zvcm1Qcm9wKSA+PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRhcmdldC5fZ3NhcC5zdmcpIHtcbiAgICAgIHRoaXMuc3ZnbyA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXN2Zy1vcmlnaW5cIik7XG4gICAgICB0aGlzLnByb3BzLnB1c2goX3RyYW5zZm9ybU9yaWdpblByb3AsIGlzTm90Q1NTLCBcIlwiKTtcbiAgICB9XG5cbiAgICBwcm9wZXJ0eSA9IF90cmFuc2Zvcm1Qcm9wO1xuICB9XG5cbiAgKHN0eWxlIHx8IGlzTm90Q1NTKSAmJiB0aGlzLnByb3BzLnB1c2gocHJvcGVydHksIGlzTm90Q1NTLCBzdHlsZVtwcm9wZXJ0eV0pO1xufSxcbiAgICBfcmVtb3ZlSW5kZXBlbmRlbnRUcmFuc2Zvcm1zID0gZnVuY3Rpb24gX3JlbW92ZUluZGVwZW5kZW50VHJhbnNmb3JtcyhzdHlsZSkge1xuICBpZiAoc3R5bGUudHJhbnNsYXRlKSB7XG4gICAgc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJ0cmFuc2xhdGVcIik7XG4gICAgc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJzY2FsZVwiKTtcbiAgICBzdHlsZS5yZW1vdmVQcm9wZXJ0eShcInJvdGF0ZVwiKTtcbiAgfVxufSxcbiAgICBfcmV2ZXJ0U3R5bGUgPSBmdW5jdGlvbiBfcmV2ZXJ0U3R5bGUoKSB7XG4gIHZhciBwcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICB0YXJnZXQgPSB0aGlzLnRhcmdldCxcbiAgICAgIHN0eWxlID0gdGFyZ2V0LnN0eWxlLFxuICAgICAgY2FjaGUgPSB0YXJnZXQuX2dzYXAsXG4gICAgICBpLFxuICAgICAgcDtcblxuICBmb3IgKGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAvLyBzdG9yZWQgbGlrZSB0aGlzOiBwcm9wZXJ0eSwgaXNOb3RDU1MsIHZhbHVlXG4gICAgcHJvcHNbaSArIDFdID8gdGFyZ2V0W3Byb3BzW2ldXSA9IHByb3BzW2kgKyAyXSA6IHByb3BzW2kgKyAyXSA/IHN0eWxlW3Byb3BzW2ldXSA9IHByb3BzW2kgKyAyXSA6IHN0eWxlLnJlbW92ZVByb3BlcnR5KHByb3BzW2ldLnN1YnN0cigwLCAyKSA9PT0gXCItLVwiID8gcHJvcHNbaV0gOiBwcm9wc1tpXS5yZXBsYWNlKF9jYXBzRXhwLCBcIi0kMVwiKS50b0xvd2VyQ2FzZSgpKTtcbiAgfVxuXG4gIGlmICh0aGlzLnRmbSkge1xuICAgIGZvciAocCBpbiB0aGlzLnRmbSkge1xuICAgICAgY2FjaGVbcF0gPSB0aGlzLnRmbVtwXTtcbiAgICB9XG5cbiAgICBpZiAoY2FjaGUuc3ZnKSB7XG4gICAgICBjYWNoZS5yZW5kZXJUcmFuc2Zvcm0oKTtcbiAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXN2Zy1vcmlnaW5cIiwgdGhpcy5zdmdvIHx8IFwiXCIpO1xuICAgIH1cblxuICAgIGkgPSBfcmV2ZXJ0aW5nKCk7XG5cbiAgICBpZiAoKCFpIHx8ICFpLmlzU3RhcnQpICYmICFzdHlsZVtfdHJhbnNmb3JtUHJvcF0pIHtcbiAgICAgIF9yZW1vdmVJbmRlcGVuZGVudFRyYW5zZm9ybXMoc3R5bGUpO1xuXG4gICAgICBjYWNoZS51bmNhY2hlID0gMTsgLy8gaWYgaXQncyBhIHN0YXJ0QXQgdGhhdCdzIGJlaW5nIHJldmVydGVkIGluIHRoZSBfaW5pdFR3ZWVuKCkgb2YgdGhlIGNvcmUsIHdlIGRvbid0IG5lZWQgdG8gdW5jYWNoZSB0cmFuc2Zvcm1zLiBUaGlzIGlzIHB1cmVseSBhIHBlcmZvcm1hbmNlIG9wdGltaXphdGlvbi5cbiAgICB9XG4gIH1cbn0sXG4gICAgX2dldFN0eWxlU2F2ZXIgPSBmdW5jdGlvbiBfZ2V0U3R5bGVTYXZlcih0YXJnZXQsIHByb3BlcnRpZXMpIHtcbiAgdmFyIHNhdmVyID0ge1xuICAgIHRhcmdldDogdGFyZ2V0LFxuICAgIHByb3BzOiBbXSxcbiAgICByZXZlcnQ6IF9yZXZlcnRTdHlsZSxcbiAgICBzYXZlOiBfc2F2ZVN0eWxlXG4gIH07XG4gIHRhcmdldC5fZ3NhcCB8fCBnc2FwLmNvcmUuZ2V0Q2FjaGUodGFyZ2V0KTsgLy8ganVzdCBtYWtlIHN1cmUgdGhlcmUncyBhIF9nc2FwIGNhY2hlIGRlZmluZWQgYmVjYXVzZSB3ZSByZWFkIGZyb20gaXQgaW4gX3NhdmVTdHlsZSgpIGFuZCBpdCdzIG1vcmUgZWZmaWNpZW50IHRvIGp1c3QgY2hlY2sgaXQgaGVyZSBvbmNlLlxuXG4gIHByb3BlcnRpZXMgJiYgcHJvcGVydGllcy5zcGxpdChcIixcIikuZm9yRWFjaChmdW5jdGlvbiAocCkge1xuICAgIHJldHVybiBzYXZlci5zYXZlKHApO1xuICB9KTtcbiAgcmV0dXJuIHNhdmVyO1xufSxcbiAgICBfc3VwcG9ydHMzRCxcbiAgICBfY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIF9jcmVhdGVFbGVtZW50KHR5cGUsIG5zKSB7XG4gIHZhciBlID0gX2RvYy5jcmVhdGVFbGVtZW50TlMgPyBfZG9jLmNyZWF0ZUVsZW1lbnROUygobnMgfHwgXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCIpLnJlcGxhY2UoL15odHRwcy8sIFwiaHR0cFwiKSwgdHlwZSkgOiBfZG9jLmNyZWF0ZUVsZW1lbnQodHlwZSk7IC8vc29tZSBzZXJ2ZXJzIHN3YXAgaW4gaHR0cHMgZm9yIGh0dHAgaW4gdGhlIG5hbWVzcGFjZSB3aGljaCBjYW4gYnJlYWsgdGhpbmdzLCBtYWtpbmcgXCJzdHlsZVwiIGluYWNjZXNzaWJsZS5cblxuICByZXR1cm4gZS5zdHlsZSA/IGUgOiBfZG9jLmNyZWF0ZUVsZW1lbnQodHlwZSk7IC8vc29tZSBlbnZpcm9ubWVudHMgd29uJ3QgYWxsb3cgYWNjZXNzIHRvIHRoZSBlbGVtZW50J3Mgc3R5bGUgd2hlbiBjcmVhdGVkIHdpdGggYSBuYW1lc3BhY2UgaW4gd2hpY2ggY2FzZSB3ZSBkZWZhdWx0IHRvIHRoZSBzdGFuZGFyZCBjcmVhdGVFbGVtZW50KCkgdG8gd29yayBhcm91bmQgdGhlIGlzc3VlLiBBbHNvIG5vdGUgdGhhdCB3aGVuIEdTQVAgaXMgZW1iZWRkZWQgZGlyZWN0bHkgaW5zaWRlIGFuIFNWRyBmaWxlLCBjcmVhdGVFbGVtZW50KCkgd29uJ3QgYWxsb3cgYWNjZXNzIHRvIHRoZSBzdHlsZSBvYmplY3QgaW4gRmlyZWZveCAoc2VlIGh0dHBzOi8vZ3JlZW5zb2NrLmNvbS9mb3J1bXMvdG9waWMvMjAyMTUtcHJvYmxlbS11c2luZy10d2Vlbm1heC1pbi1zdGFuZGFsb25lLXNlbGYtY29udGFpbmluZy1zdmctZmlsZS1lcnItY2Fubm90LXNldC1wcm9wZXJ0eS1jc3N0ZXh0LW9mLXVuZGVmaW5lZC8pLlxufSxcbiAgICBfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSA9IGZ1bmN0aW9uIF9nZXRDb21wdXRlZFByb3BlcnR5KHRhcmdldCwgcHJvcGVydHksIHNraXBQcmVmaXhGYWxsYmFjaykge1xuICB2YXIgY3MgPSBnZXRDb21wdXRlZFN0eWxlKHRhcmdldCk7XG4gIHJldHVybiBjc1twcm9wZXJ0eV0gfHwgY3MuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eS5yZXBsYWNlKF9jYXBzRXhwLCBcIi0kMVwiKS50b0xvd2VyQ2FzZSgpKSB8fCBjcy5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KSB8fCAhc2tpcFByZWZpeEZhbGxiYWNrICYmIF9nZXRDb21wdXRlZFByb3BlcnR5KHRhcmdldCwgX2NoZWNrUHJvcFByZWZpeChwcm9wZXJ0eSkgfHwgcHJvcGVydHksIDEpIHx8IFwiXCI7IC8vY3NzIHZhcmlhYmxlcyBtYXkgbm90IG5lZWQgY2FwcyBzd2FwcGVkIG91dCBmb3IgZGFzaGVzIGFuZCBsb3dlcmNhc2UuXG59LFxuICAgIF9wcmVmaXhlcyA9IFwiTyxNb3osbXMsTXMsV2Via2l0XCIuc3BsaXQoXCIsXCIpLFxuICAgIF9jaGVja1Byb3BQcmVmaXggPSBmdW5jdGlvbiBfY2hlY2tQcm9wUHJlZml4KHByb3BlcnR5LCBlbGVtZW50LCBwcmVmZXJQcmVmaXgpIHtcbiAgdmFyIGUgPSBlbGVtZW50IHx8IF90ZW1wRGl2LFxuICAgICAgcyA9IGUuc3R5bGUsXG4gICAgICBpID0gNTtcblxuICBpZiAocHJvcGVydHkgaW4gcyAmJiAhcHJlZmVyUHJlZml4KSB7XG4gICAgcmV0dXJuIHByb3BlcnR5O1xuICB9XG5cbiAgcHJvcGVydHkgPSBwcm9wZXJ0eS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3BlcnR5LnN1YnN0cigxKTtcblxuICB3aGlsZSAoaS0tICYmICEoX3ByZWZpeGVzW2ldICsgcHJvcGVydHkgaW4gcykpIHt9XG5cbiAgcmV0dXJuIGkgPCAwID8gbnVsbCA6IChpID09PSAzID8gXCJtc1wiIDogaSA+PSAwID8gX3ByZWZpeGVzW2ldIDogXCJcIikgKyBwcm9wZXJ0eTtcbn0sXG4gICAgX2luaXRDb3JlID0gZnVuY3Rpb24gX2luaXRDb3JlKCkge1xuICBpZiAoX3dpbmRvd0V4aXN0cygpICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgIF93aW4gPSB3aW5kb3c7XG4gICAgX2RvYyA9IF93aW4uZG9jdW1lbnQ7XG4gICAgX2RvY0VsZW1lbnQgPSBfZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICBfdGVtcERpdiA9IF9jcmVhdGVFbGVtZW50KFwiZGl2XCIpIHx8IHtcbiAgICAgIHN0eWxlOiB7fVxuICAgIH07XG4gICAgX3RlbXBEaXZTdHlsZXIgPSBfY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBfdHJhbnNmb3JtUHJvcCA9IF9jaGVja1Byb3BQcmVmaXgoX3RyYW5zZm9ybVByb3ApO1xuICAgIF90cmFuc2Zvcm1PcmlnaW5Qcm9wID0gX3RyYW5zZm9ybVByb3AgKyBcIk9yaWdpblwiO1xuICAgIF90ZW1wRGl2LnN0eWxlLmNzc1RleHQgPSBcImJvcmRlci13aWR0aDowO2xpbmUtaGVpZ2h0OjA7cG9zaXRpb246YWJzb2x1dGU7cGFkZGluZzowXCI7IC8vbWFrZSBzdXJlIHRvIG92ZXJyaWRlIGNlcnRhaW4gcHJvcGVydGllcyB0aGF0IG1heSBjb250YW1pbmF0ZSBtZWFzdXJlbWVudHMsIGluIGNhc2UgdGhlIHVzZXIgaGFzIG92ZXJyZWFjaGluZyBzdHlsZSBzaGVldHMuXG5cbiAgICBfc3VwcG9ydHMzRCA9ICEhX2NoZWNrUHJvcFByZWZpeChcInBlcnNwZWN0aXZlXCIpO1xuICAgIF9yZXZlcnRpbmcgPSBnc2FwLmNvcmUucmV2ZXJ0aW5nO1xuICAgIF9wbHVnaW5Jbml0dGVkID0gMTtcbiAgfVxufSxcbiAgICBfZ2V0QkJveEhhY2sgPSBmdW5jdGlvbiBfZ2V0QkJveEhhY2soc3dhcElmUG9zc2libGUpIHtcbiAgLy93b3JrcyBhcm91bmQgaXNzdWVzIGluIHNvbWUgYnJvd3NlcnMgKGxpa2UgRmlyZWZveCkgdGhhdCBkb24ndCBjb3JyZWN0bHkgcmVwb3J0IGdldEJCb3goKSBvbiBTVkcgZWxlbWVudHMgaW5zaWRlIGEgPGRlZnM+IGVsZW1lbnQgYW5kL29yIDxtYXNrPi4gV2UgdHJ5IGNyZWF0aW5nIGFuIFNWRywgYWRkaW5nIGl0IHRvIHRoZSBkb2N1bWVudEVsZW1lbnQgYW5kIHRvc3MgdGhlIGVsZW1lbnQgaW4gdGhlcmUgc28gdGhhdCBpdCdzIGRlZmluaXRlbHkgcGFydCBvZiB0aGUgcmVuZGVyaW5nIHRyZWUsIHRoZW4gZ3JhYiB0aGUgYmJveCBhbmQgaWYgaXQgd29ya3MsIHdlIGFjdHVhbGx5IHN3YXAgb3V0IHRoZSBvcmlnaW5hbCBnZXRCQm94KCkgbWV0aG9kIGZvciBvdXIgb3duIHRoYXQgZG9lcyB0aGVzZSBleHRyYSBzdGVwcyB3aGVuZXZlciBnZXRCQm94IGlzIG5lZWRlZC4gVGhpcyBoZWxwcyBlbnN1cmUgdGhhdCBwZXJmb3JtYW5jZSBpcyBvcHRpbWFsIChvbmx5IGRvIGFsbCB0aGVzZSBleHRyYSBzdGVwcyB3aGVuIGFic29sdXRlbHkgbmVjZXNzYXJ5Li4ubW9zdCBlbGVtZW50cyBkb24ndCBuZWVkIGl0KS5cbiAgdmFyIHN2ZyA9IF9jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHRoaXMub3duZXJTVkdFbGVtZW50ICYmIHRoaXMub3duZXJTVkdFbGVtZW50LmdldEF0dHJpYnV0ZShcInhtbG5zXCIpIHx8IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiksXG4gICAgICBvbGRQYXJlbnQgPSB0aGlzLnBhcmVudE5vZGUsXG4gICAgICBvbGRTaWJsaW5nID0gdGhpcy5uZXh0U2libGluZyxcbiAgICAgIG9sZENTUyA9IHRoaXMuc3R5bGUuY3NzVGV4dCxcbiAgICAgIGJib3g7XG5cbiAgX2RvY0VsZW1lbnQuYXBwZW5kQ2hpbGQoc3ZnKTtcblxuICBzdmcuYXBwZW5kQ2hpbGQodGhpcyk7XG4gIHRoaXMuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblxuICBpZiAoc3dhcElmUG9zc2libGUpIHtcbiAgICB0cnkge1xuICAgICAgYmJveCA9IHRoaXMuZ2V0QkJveCgpO1xuICAgICAgdGhpcy5fZ3NhcEJCb3ggPSB0aGlzLmdldEJCb3g7IC8vc3RvcmUgdGhlIG9yaWdpbmFsXG5cbiAgICAgIHRoaXMuZ2V0QkJveCA9IF9nZXRCQm94SGFjaztcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9IGVsc2UgaWYgKHRoaXMuX2dzYXBCQm94KSB7XG4gICAgYmJveCA9IHRoaXMuX2dzYXBCQm94KCk7XG4gIH1cblxuICBpZiAob2xkUGFyZW50KSB7XG4gICAgaWYgKG9sZFNpYmxpbmcpIHtcbiAgICAgIG9sZFBhcmVudC5pbnNlcnRCZWZvcmUodGhpcywgb2xkU2libGluZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9sZFBhcmVudC5hcHBlbmRDaGlsZCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBfZG9jRWxlbWVudC5yZW1vdmVDaGlsZChzdmcpO1xuXG4gIHRoaXMuc3R5bGUuY3NzVGV4dCA9IG9sZENTUztcbiAgcmV0dXJuIGJib3g7XG59LFxuICAgIF9nZXRBdHRyaWJ1dGVGYWxsYmFja3MgPSBmdW5jdGlvbiBfZ2V0QXR0cmlidXRlRmFsbGJhY2tzKHRhcmdldCwgYXR0cmlidXRlc0FycmF5KSB7XG4gIHZhciBpID0gYXR0cmlidXRlc0FycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgaWYgKHRhcmdldC5oYXNBdHRyaWJ1dGUoYXR0cmlidXRlc0FycmF5W2ldKSkge1xuICAgICAgcmV0dXJuIHRhcmdldC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlc0FycmF5W2ldKTtcbiAgICB9XG4gIH1cbn0sXG4gICAgX2dldEJCb3ggPSBmdW5jdGlvbiBfZ2V0QkJveCh0YXJnZXQpIHtcbiAgdmFyIGJvdW5kcztcblxuICB0cnkge1xuICAgIGJvdW5kcyA9IHRhcmdldC5nZXRCQm94KCk7IC8vRmlyZWZveCB0aHJvd3MgZXJyb3JzIGlmIHlvdSB0cnkgY2FsbGluZyBnZXRCQm94KCkgb24gYW4gU1ZHIGVsZW1lbnQgdGhhdCdzIG5vdCByZW5kZXJlZCAobGlrZSBpbiBhIDxzeW1ib2w+IG9yIDxkZWZzPikuIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTYxMjExOFxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGJvdW5kcyA9IF9nZXRCQm94SGFjay5jYWxsKHRhcmdldCwgdHJ1ZSk7XG4gIH1cblxuICBib3VuZHMgJiYgKGJvdW5kcy53aWR0aCB8fCBib3VuZHMuaGVpZ2h0KSB8fCB0YXJnZXQuZ2V0QkJveCA9PT0gX2dldEJCb3hIYWNrIHx8IChib3VuZHMgPSBfZ2V0QkJveEhhY2suY2FsbCh0YXJnZXQsIHRydWUpKTsgLy9zb21lIGJyb3dzZXJzIChsaWtlIEZpcmVmb3gpIG1pc3JlcG9ydCB0aGUgYm91bmRzIGlmIHRoZSBlbGVtZW50IGhhcyB6ZXJvIHdpZHRoIGFuZCBoZWlnaHQgKGl0IGp1c3QgYXNzdW1lcyBpdCdzIGF0IHg6MCwgeTowKSwgdGh1cyB3ZSBuZWVkIHRvIG1hbnVhbGx5IGdyYWIgdGhlIHBvc2l0aW9uIGluIHRoYXQgY2FzZS5cblxuICByZXR1cm4gYm91bmRzICYmICFib3VuZHMud2lkdGggJiYgIWJvdW5kcy54ICYmICFib3VuZHMueSA/IHtcbiAgICB4OiArX2dldEF0dHJpYnV0ZUZhbGxiYWNrcyh0YXJnZXQsIFtcInhcIiwgXCJjeFwiLCBcIngxXCJdKSB8fCAwLFxuICAgIHk6ICtfZ2V0QXR0cmlidXRlRmFsbGJhY2tzKHRhcmdldCwgW1wieVwiLCBcImN5XCIsIFwieTFcIl0pIHx8IDAsXG4gICAgd2lkdGg6IDAsXG4gICAgaGVpZ2h0OiAwXG4gIH0gOiBib3VuZHM7XG59LFxuICAgIF9pc1NWRyA9IGZ1bmN0aW9uIF9pc1NWRyhlKSB7XG4gIHJldHVybiAhIShlLmdldENUTSAmJiAoIWUucGFyZW50Tm9kZSB8fCBlLm93bmVyU1ZHRWxlbWVudCkgJiYgX2dldEJCb3goZSkpO1xufSxcbiAgICAvL3JlcG9ydHMgaWYgdGhlIGVsZW1lbnQgaXMgYW4gU1ZHIG9uIHdoaWNoIGdldEJCb3goKSBhY3R1YWxseSB3b3Jrc1xuX3JlbW92ZVByb3BlcnR5ID0gZnVuY3Rpb24gX3JlbW92ZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHkpIHtcbiAgaWYgKHByb3BlcnR5KSB7XG4gICAgdmFyIHN0eWxlID0gdGFyZ2V0LnN0eWxlO1xuXG4gICAgaWYgKHByb3BlcnR5IGluIF90cmFuc2Zvcm1Qcm9wcyAmJiBwcm9wZXJ0eSAhPT0gX3RyYW5zZm9ybU9yaWdpblByb3ApIHtcbiAgICAgIHByb3BlcnR5ID0gX3RyYW5zZm9ybVByb3A7XG4gICAgfVxuXG4gICAgaWYgKHN0eWxlLnJlbW92ZVByb3BlcnR5KSB7XG4gICAgICBpZiAocHJvcGVydHkuc3Vic3RyKDAsIDIpID09PSBcIm1zXCIgfHwgcHJvcGVydHkuc3Vic3RyKDAsIDYpID09PSBcIndlYmtpdFwiKSB7XG4gICAgICAgIC8vTWljcm9zb2Z0IGFuZCBzb21lIFdlYmtpdCBicm93c2VycyBkb24ndCBjb25mb3JtIHRvIHRoZSBzdGFuZGFyZCBvZiBjYXBpdGFsaXppbmcgdGhlIGZpcnN0IHByZWZpeCBjaGFyYWN0ZXIsIHNvIHdlIGFkanVzdCBzbyB0aGF0IHdoZW4gd2UgcHJlZml4IHRoZSBjYXBzIHdpdGggYSBkYXNoLCBpdCdzIGNvcnJlY3QgKG90aGVyd2lzZSBpdCdkIGJlIFwibXMtdHJhbnNmb3JtXCIgaW5zdGVhZCBvZiBcIi1tcy10cmFuc2Zvcm1cIiBmb3IgSUU5LCBmb3IgZXhhbXBsZSlcbiAgICAgICAgcHJvcGVydHkgPSBcIi1cIiArIHByb3BlcnR5O1xuICAgICAgfVxuXG4gICAgICBzdHlsZS5yZW1vdmVQcm9wZXJ0eShwcm9wZXJ0eS5yZXBsYWNlKF9jYXBzRXhwLCBcIi0kMVwiKS50b0xvd2VyQ2FzZSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy9ub3RlOiBvbGQgdmVyc2lvbnMgb2YgSUUgdXNlIFwicmVtb3ZlQXR0cmlidXRlKClcIiBpbnN0ZWFkIG9mIFwicmVtb3ZlUHJvcGVydHkoKVwiXG4gICAgICBzdHlsZS5yZW1vdmVBdHRyaWJ1dGUocHJvcGVydHkpO1xuICAgIH1cbiAgfVxufSxcbiAgICBfYWRkTm9uVHdlZW5pbmdQVCA9IGZ1bmN0aW9uIF9hZGROb25Ud2VlbmluZ1BUKHBsdWdpbiwgdGFyZ2V0LCBwcm9wZXJ0eSwgYmVnaW5uaW5nLCBlbmQsIG9ubHlTZXRBdEVuZCkge1xuICB2YXIgcHQgPSBuZXcgUHJvcFR3ZWVuKHBsdWdpbi5fcHQsIHRhcmdldCwgcHJvcGVydHksIDAsIDEsIG9ubHlTZXRBdEVuZCA/IF9yZW5kZXJOb25Ud2VlbmluZ1ZhbHVlT25seUF0RW5kIDogX3JlbmRlck5vblR3ZWVuaW5nVmFsdWUpO1xuICBwbHVnaW4uX3B0ID0gcHQ7XG4gIHB0LmIgPSBiZWdpbm5pbmc7XG4gIHB0LmUgPSBlbmQ7XG5cbiAgcGx1Z2luLl9wcm9wcy5wdXNoKHByb3BlcnR5KTtcblxuICByZXR1cm4gcHQ7XG59LFxuICAgIF9ub25Db252ZXJ0aWJsZVVuaXRzID0ge1xuICBkZWc6IDEsXG4gIHJhZDogMSxcbiAgdHVybjogMVxufSxcbiAgICBfbm9uU3RhbmRhcmRMYXlvdXRzID0ge1xuICBncmlkOiAxLFxuICBmbGV4OiAxXG59LFxuICAgIC8vdGFrZXMgYSBzaW5nbGUgdmFsdWUgbGlrZSAyMHB4IGFuZCBjb252ZXJ0cyBpdCB0byB0aGUgdW5pdCBzcGVjaWZpZWQsIGxpa2UgXCIlXCIsIHJldHVybmluZyBvbmx5IHRoZSBudW1lcmljIGFtb3VudC5cbl9jb252ZXJ0VG9Vbml0ID0gZnVuY3Rpb24gX2NvbnZlcnRUb1VuaXQodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUsIHVuaXQpIHtcbiAgdmFyIGN1clZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSkgfHwgMCxcbiAgICAgIGN1clVuaXQgPSAodmFsdWUgKyBcIlwiKS50cmltKCkuc3Vic3RyKChjdXJWYWx1ZSArIFwiXCIpLmxlbmd0aCkgfHwgXCJweFwiLFxuICAgICAgLy8gc29tZSBicm93c2VycyBsZWF2ZSBleHRyYSB3aGl0ZXNwYWNlIGF0IHRoZSBiZWdpbm5pbmcgb2YgQ1NTIHZhcmlhYmxlcywgaGVuY2UgdGhlIG5lZWQgdG8gdHJpbSgpXG4gIHN0eWxlID0gX3RlbXBEaXYuc3R5bGUsXG4gICAgICBob3Jpem9udGFsID0gX2hvcml6b250YWxFeHAudGVzdChwcm9wZXJ0eSksXG4gICAgICBpc1Jvb3RTVkcgPSB0YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcInN2Z1wiLFxuICAgICAgbWVhc3VyZVByb3BlcnR5ID0gKGlzUm9vdFNWRyA/IFwiY2xpZW50XCIgOiBcIm9mZnNldFwiKSArIChob3Jpem9udGFsID8gXCJXaWR0aFwiIDogXCJIZWlnaHRcIiksXG4gICAgICBhbW91bnQgPSAxMDAsXG4gICAgICB0b1BpeGVscyA9IHVuaXQgPT09IFwicHhcIixcbiAgICAgIHRvUGVyY2VudCA9IHVuaXQgPT09IFwiJVwiLFxuICAgICAgcHgsXG4gICAgICBwYXJlbnQsXG4gICAgICBjYWNoZSxcbiAgICAgIGlzU1ZHO1xuXG4gIGlmICh1bml0ID09PSBjdXJVbml0IHx8ICFjdXJWYWx1ZSB8fCBfbm9uQ29udmVydGlibGVVbml0c1t1bml0XSB8fCBfbm9uQ29udmVydGlibGVVbml0c1tjdXJVbml0XSkge1xuICAgIHJldHVybiBjdXJWYWx1ZTtcbiAgfVxuXG4gIGN1clVuaXQgIT09IFwicHhcIiAmJiAhdG9QaXhlbHMgJiYgKGN1clZhbHVlID0gX2NvbnZlcnRUb1VuaXQodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUsIFwicHhcIikpO1xuICBpc1NWRyA9IHRhcmdldC5nZXRDVE0gJiYgX2lzU1ZHKHRhcmdldCk7XG5cbiAgaWYgKCh0b1BlcmNlbnQgfHwgY3VyVW5pdCA9PT0gXCIlXCIpICYmIChfdHJhbnNmb3JtUHJvcHNbcHJvcGVydHldIHx8IH5wcm9wZXJ0eS5pbmRleE9mKFwiYWRpdXNcIikpKSB7XG4gICAgcHggPSBpc1NWRyA/IHRhcmdldC5nZXRCQm94KClbaG9yaXpvbnRhbCA/IFwid2lkdGhcIiA6IFwiaGVpZ2h0XCJdIDogdGFyZ2V0W21lYXN1cmVQcm9wZXJ0eV07XG4gICAgcmV0dXJuIF9yb3VuZCh0b1BlcmNlbnQgPyBjdXJWYWx1ZSAvIHB4ICogYW1vdW50IDogY3VyVmFsdWUgLyAxMDAgKiBweCk7XG4gIH1cblxuICBzdHlsZVtob3Jpem9udGFsID8gXCJ3aWR0aFwiIDogXCJoZWlnaHRcIl0gPSBhbW91bnQgKyAodG9QaXhlbHMgPyBjdXJVbml0IDogdW5pdCk7XG4gIHBhcmVudCA9IH5wcm9wZXJ0eS5pbmRleE9mKFwiYWRpdXNcIikgfHwgdW5pdCA9PT0gXCJlbVwiICYmIHRhcmdldC5hcHBlbmRDaGlsZCAmJiAhaXNSb290U1ZHID8gdGFyZ2V0IDogdGFyZ2V0LnBhcmVudE5vZGU7XG5cbiAgaWYgKGlzU1ZHKSB7XG4gICAgcGFyZW50ID0gKHRhcmdldC5vd25lclNWR0VsZW1lbnQgfHwge30pLnBhcmVudE5vZGU7XG4gIH1cblxuICBpZiAoIXBhcmVudCB8fCBwYXJlbnQgPT09IF9kb2MgfHwgIXBhcmVudC5hcHBlbmRDaGlsZCkge1xuICAgIHBhcmVudCA9IF9kb2MuYm9keTtcbiAgfVxuXG4gIGNhY2hlID0gcGFyZW50Ll9nc2FwO1xuXG4gIGlmIChjYWNoZSAmJiB0b1BlcmNlbnQgJiYgY2FjaGUud2lkdGggJiYgaG9yaXpvbnRhbCAmJiBjYWNoZS50aW1lID09PSBfdGlja2VyLnRpbWUgJiYgIWNhY2hlLnVuY2FjaGUpIHtcbiAgICByZXR1cm4gX3JvdW5kKGN1clZhbHVlIC8gY2FjaGUud2lkdGggKiBhbW91bnQpO1xuICB9IGVsc2Uge1xuICAgICh0b1BlcmNlbnQgfHwgY3VyVW5pdCA9PT0gXCIlXCIpICYmICFfbm9uU3RhbmRhcmRMYXlvdXRzW19nZXRDb21wdXRlZFByb3BlcnR5KHBhcmVudCwgXCJkaXNwbGF5XCIpXSAmJiAoc3R5bGUucG9zaXRpb24gPSBfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSh0YXJnZXQsIFwicG9zaXRpb25cIikpO1xuICAgIHBhcmVudCA9PT0gdGFyZ2V0ICYmIChzdHlsZS5wb3NpdGlvbiA9IFwic3RhdGljXCIpOyAvLyBsaWtlIGZvciBib3JkZXJSYWRpdXMsIGlmIGl0J3MgYSAlIHdlIG11c3QgaGF2ZSBpdCByZWxhdGl2ZSB0byB0aGUgdGFyZ2V0IGl0c2VsZiBidXQgdGhhdCBtYXkgbm90IGhhdmUgcG9zaXRpb246IHJlbGF0aXZlIG9yIHBvc2l0aW9uOiBhYnNvbHV0ZSBpbiB3aGljaCBjYXNlIGl0J2QgZ28gdXAgdGhlIGNoYWluIHVudGlsIGl0IGZpbmRzIGl0cyBvZmZzZXRQYXJlbnQgKGJhZCkuIHBvc2l0aW9uOiBzdGF0aWMgcHJvdGVjdHMgYWdhaW5zdCB0aGF0LlxuXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKF90ZW1wRGl2KTtcbiAgICBweCA9IF90ZW1wRGl2W21lYXN1cmVQcm9wZXJ0eV07XG4gICAgcGFyZW50LnJlbW92ZUNoaWxkKF90ZW1wRGl2KTtcbiAgICBzdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcblxuICAgIGlmIChob3Jpem9udGFsICYmIHRvUGVyY2VudCkge1xuICAgICAgY2FjaGUgPSBfZ2V0Q2FjaGUocGFyZW50KTtcbiAgICAgIGNhY2hlLnRpbWUgPSBfdGlja2VyLnRpbWU7XG4gICAgICBjYWNoZS53aWR0aCA9IHBhcmVudFttZWFzdXJlUHJvcGVydHldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfcm91bmQodG9QaXhlbHMgPyBweCAqIGN1clZhbHVlIC8gYW1vdW50IDogcHggJiYgY3VyVmFsdWUgPyBhbW91bnQgLyBweCAqIGN1clZhbHVlIDogMCk7XG59LFxuICAgIF9nZXQgPSBmdW5jdGlvbiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHVuaXQsIHVuY2FjaGUpIHtcbiAgdmFyIHZhbHVlO1xuICBfcGx1Z2luSW5pdHRlZCB8fCBfaW5pdENvcmUoKTtcblxuICBpZiAocHJvcGVydHkgaW4gX3Byb3BlcnR5QWxpYXNlcyAmJiBwcm9wZXJ0eSAhPT0gXCJ0cmFuc2Zvcm1cIikge1xuICAgIHByb3BlcnR5ID0gX3Byb3BlcnR5QWxpYXNlc1twcm9wZXJ0eV07XG5cbiAgICBpZiAofnByb3BlcnR5LmluZGV4T2YoXCIsXCIpKSB7XG4gICAgICBwcm9wZXJ0eSA9IHByb3BlcnR5LnNwbGl0KFwiLFwiKVswXTtcbiAgICB9XG4gIH1cblxuICBpZiAoX3RyYW5zZm9ybVByb3BzW3Byb3BlcnR5XSAmJiBwcm9wZXJ0eSAhPT0gXCJ0cmFuc2Zvcm1cIikge1xuICAgIHZhbHVlID0gX3BhcnNlVHJhbnNmb3JtKHRhcmdldCwgdW5jYWNoZSk7XG4gICAgdmFsdWUgPSBwcm9wZXJ0eSAhPT0gXCJ0cmFuc2Zvcm1PcmlnaW5cIiA/IHZhbHVlW3Byb3BlcnR5XSA6IHZhbHVlLnN2ZyA/IHZhbHVlLm9yaWdpbiA6IF9maXJzdFR3b09ubHkoX2dldENvbXB1dGVkUHJvcGVydHkodGFyZ2V0LCBfdHJhbnNmb3JtT3JpZ2luUHJvcCkpICsgXCIgXCIgKyB2YWx1ZS56T3JpZ2luICsgXCJweFwiO1xuICB9IGVsc2Uge1xuICAgIHZhbHVlID0gdGFyZ2V0LnN0eWxlW3Byb3BlcnR5XTtcblxuICAgIGlmICghdmFsdWUgfHwgdmFsdWUgPT09IFwiYXV0b1wiIHx8IHVuY2FjaGUgfHwgfih2YWx1ZSArIFwiXCIpLmluZGV4T2YoXCJjYWxjKFwiKSkge1xuICAgICAgdmFsdWUgPSBfc3BlY2lhbFByb3BzW3Byb3BlcnR5XSAmJiBfc3BlY2lhbFByb3BzW3Byb3BlcnR5XSh0YXJnZXQsIHByb3BlcnR5LCB1bml0KSB8fCBfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5KSB8fCBfZ2V0UHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSkgfHwgKHByb3BlcnR5ID09PSBcIm9wYWNpdHlcIiA/IDEgOiAwKTsgLy8gbm90ZTogc29tZSBicm93c2VycywgbGlrZSBGaXJlZm94LCBkb24ndCByZXBvcnQgYm9yZGVyUmFkaXVzIGNvcnJlY3RseSEgSW5zdGVhZCwgaXQgb25seSByZXBvcnRzIGV2ZXJ5IGNvcm5lciBsaWtlICBib3JkZXJUb3BMZWZ0UmFkaXVzXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVuaXQgJiYgIX4odmFsdWUgKyBcIlwiKS50cmltKCkuaW5kZXhPZihcIiBcIikgPyBfY29udmVydFRvVW5pdCh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSwgdW5pdCkgKyB1bml0IDogdmFsdWU7XG59LFxuICAgIF90d2VlbkNvbXBsZXhDU1NTdHJpbmcgPSBmdW5jdGlvbiBfdHdlZW5Db21wbGV4Q1NTU3RyaW5nKHRhcmdldCwgcHJvcCwgc3RhcnQsIGVuZCkge1xuICAvLyBub3RlOiB3ZSBjYWxsIF90d2VlbkNvbXBsZXhDU1NTdHJpbmcuY2FsbChwbHVnaW5JbnN0YW5jZS4uLikgdG8gZW5zdXJlIHRoYXQgaXQncyBzY29wZWQgcHJvcGVybHkuIFdlIG1heSBjYWxsIGl0IGZyb20gd2l0aGluIGEgcGx1Z2luIHRvbywgdGh1cyBcInRoaXNcIiB3b3VsZCByZWZlciB0byB0aGUgcGx1Z2luLlxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0ID09PSBcIm5vbmVcIikge1xuICAgIC8vIHNvbWUgYnJvd3NlcnMgbGlrZSBTYWZhcmkgYWN0dWFsbHkgUFJFRkVSIHRoZSBwcmVmaXhlZCBwcm9wZXJ0eSBhbmQgbWlzLXJlcG9ydCB0aGUgdW5wcmVmaXhlZCB2YWx1ZSBsaWtlIGNsaXBQYXRoIChCVUcpLiBJbiBvdGhlciB3b3JkcywgZXZlbiB0aG91Z2ggY2xpcFBhdGggZXhpc3RzIGluIHRoZSBzdHlsZSAoXCJjbGlwUGF0aFwiIGluIHRhcmdldC5zdHlsZSkgYW5kIGl0J3Mgc2V0IGluIHRoZSBDU1MgcHJvcGVybHkgKGFsb25nIHdpdGggLXdlYmtpdC1jbGlwLXBhdGgpLCBTYWZhcmkgcmVwb3J0cyBjbGlwUGF0aCBhcyBcIm5vbmVcIiB3aGVyZWFzIFdlYmtpdENsaXBQYXRoIHJlcG9ydHMgYWNjdXJhdGVseSBsaWtlIFwiZWxsaXBzZSgxMDAlIDAlIGF0IDUwJSAwJSlcIiwgc28gaW4gdGhpcyBjYXNlIHdlIG11c3QgU1dJVENIIHRvIHVzaW5nIHRoZSBwcmVmaXhlZCBwcm9wZXJ0eSBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9ncmVlbnNvY2suY29tL2ZvcnVtcy90b3BpYy8xODMxMC1jbGlwcGF0aC1kb2VzbnQtd29yay1vbi1pb3MvXG4gICAgdmFyIHAgPSBfY2hlY2tQcm9wUHJlZml4KHByb3AsIHRhcmdldCwgMSksXG4gICAgICAgIHMgPSBwICYmIF9nZXRDb21wdXRlZFByb3BlcnR5KHRhcmdldCwgcCwgMSk7XG5cbiAgICBpZiAocyAmJiBzICE9PSBzdGFydCkge1xuICAgICAgcHJvcCA9IHA7XG4gICAgICBzdGFydCA9IHM7XG4gICAgfSBlbHNlIGlmIChwcm9wID09PSBcImJvcmRlckNvbG9yXCIpIHtcbiAgICAgIHN0YXJ0ID0gX2dldENvbXB1dGVkUHJvcGVydHkodGFyZ2V0LCBcImJvcmRlclRvcENvbG9yXCIpOyAvLyBGaXJlZm94IGJ1ZzogYWx3YXlzIHJlcG9ydHMgXCJib3JkZXJDb2xvclwiIGFzIFwiXCIsIHNvIHdlIG11c3QgZmFsbCBiYWNrIHRvIGJvcmRlclRvcENvbG9yLiBTZWUgaHR0cHM6Ly9ncmVlbnNvY2suY29tL2ZvcnVtcy90b3BpYy8yNDU4My1ob3ctdG8tcmV0dXJuLWNvbG9ycy10aGF0LWktaGFkLWFmdGVyLXJldmVyc2UvXG4gICAgfVxuICB9XG5cbiAgdmFyIHB0ID0gbmV3IFByb3BUd2Vlbih0aGlzLl9wdCwgdGFyZ2V0LnN0eWxlLCBwcm9wLCAwLCAxLCBfcmVuZGVyQ29tcGxleFN0cmluZyksXG4gICAgICBpbmRleCA9IDAsXG4gICAgICBtYXRjaEluZGV4ID0gMCxcbiAgICAgIGEsXG4gICAgICByZXN1bHQsXG4gICAgICBzdGFydFZhbHVlcyxcbiAgICAgIHN0YXJ0TnVtLFxuICAgICAgY29sb3IsXG4gICAgICBzdGFydFZhbHVlLFxuICAgICAgZW5kVmFsdWUsXG4gICAgICBlbmROdW0sXG4gICAgICBjaHVuayxcbiAgICAgIGVuZFVuaXQsXG4gICAgICBzdGFydFVuaXQsXG4gICAgICBlbmRWYWx1ZXM7XG4gIHB0LmIgPSBzdGFydDtcbiAgcHQuZSA9IGVuZDtcbiAgc3RhcnQgKz0gXCJcIjsgLy8gZW5zdXJlIHZhbHVlcyBhcmUgc3RyaW5nc1xuXG4gIGVuZCArPSBcIlwiO1xuXG4gIGlmIChlbmQgPT09IFwiYXV0b1wiKSB7XG4gICAgdGFyZ2V0LnN0eWxlW3Byb3BdID0gZW5kO1xuICAgIGVuZCA9IF9nZXRDb21wdXRlZFByb3BlcnR5KHRhcmdldCwgcHJvcCkgfHwgZW5kO1xuICAgIHRhcmdldC5zdHlsZVtwcm9wXSA9IHN0YXJ0O1xuICB9XG5cbiAgYSA9IFtzdGFydCwgZW5kXTtcblxuICBfY29sb3JTdHJpbmdGaWx0ZXIoYSk7IC8vIHBhc3MgYW4gYXJyYXkgd2l0aCB0aGUgc3RhcnRpbmcgYW5kIGVuZGluZyB2YWx1ZXMgYW5kIGxldCB0aGUgZmlsdGVyIGRvIHdoYXRldmVyIGl0IG5lZWRzIHRvIHRoZSB2YWx1ZXMuIElmIGNvbG9ycyBhcmUgZm91bmQsIGl0IHJldHVybnMgdHJ1ZSBhbmQgdGhlbiB3ZSBtdXN0IG1hdGNoIHdoZXJlIHRoZSBjb2xvciBzaG93cyB1cCBvcmRlci13aXNlIGJlY2F1c2UgZm9yIHRoaW5ncyBsaWtlIGJveFNoYWRvdywgc29tZXRpbWVzIHRoZSBicm93c2VyIHByb3ZpZGVzIHRoZSBjb21wdXRlZCB2YWx1ZXMgd2l0aCB0aGUgY29sb3IgRklSU1QsIGJ1dCB0aGUgdXNlciBwcm92aWRlcyBpdCB3aXRoIHRoZSBjb2xvciBMQVNULCBzbyBmbGlwIHRoZW0gaWYgbmVjZXNzYXJ5LiBTYW1lIGZvciBkcm9wLXNoYWRvdygpLlxuXG5cbiAgc3RhcnQgPSBhWzBdO1xuICBlbmQgPSBhWzFdO1xuICBzdGFydFZhbHVlcyA9IHN0YXJ0Lm1hdGNoKF9udW1XaXRoVW5pdEV4cCkgfHwgW107XG4gIGVuZFZhbHVlcyA9IGVuZC5tYXRjaChfbnVtV2l0aFVuaXRFeHApIHx8IFtdO1xuXG4gIGlmIChlbmRWYWx1ZXMubGVuZ3RoKSB7XG4gICAgd2hpbGUgKHJlc3VsdCA9IF9udW1XaXRoVW5pdEV4cC5leGVjKGVuZCkpIHtcbiAgICAgIGVuZFZhbHVlID0gcmVzdWx0WzBdO1xuICAgICAgY2h1bmsgPSBlbmQuc3Vic3RyaW5nKGluZGV4LCByZXN1bHQuaW5kZXgpO1xuXG4gICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgY29sb3IgPSAoY29sb3IgKyAxKSAlIDU7XG4gICAgICB9IGVsc2UgaWYgKGNodW5rLnN1YnN0cigtNSkgPT09IFwicmdiYShcIiB8fCBjaHVuay5zdWJzdHIoLTUpID09PSBcImhzbGEoXCIpIHtcbiAgICAgICAgY29sb3IgPSAxO1xuICAgICAgfVxuXG4gICAgICBpZiAoZW5kVmFsdWUgIT09IChzdGFydFZhbHVlID0gc3RhcnRWYWx1ZXNbbWF0Y2hJbmRleCsrXSB8fCBcIlwiKSkge1xuICAgICAgICBzdGFydE51bSA9IHBhcnNlRmxvYXQoc3RhcnRWYWx1ZSkgfHwgMDtcbiAgICAgICAgc3RhcnRVbml0ID0gc3RhcnRWYWx1ZS5zdWJzdHIoKHN0YXJ0TnVtICsgXCJcIikubGVuZ3RoKTtcbiAgICAgICAgZW5kVmFsdWUuY2hhckF0KDEpID09PSBcIj1cIiAmJiAoZW5kVmFsdWUgPSBfcGFyc2VSZWxhdGl2ZShzdGFydE51bSwgZW5kVmFsdWUpICsgc3RhcnRVbml0KTtcbiAgICAgICAgZW5kTnVtID0gcGFyc2VGbG9hdChlbmRWYWx1ZSk7XG4gICAgICAgIGVuZFVuaXQgPSBlbmRWYWx1ZS5zdWJzdHIoKGVuZE51bSArIFwiXCIpLmxlbmd0aCk7XG4gICAgICAgIGluZGV4ID0gX251bVdpdGhVbml0RXhwLmxhc3RJbmRleCAtIGVuZFVuaXQubGVuZ3RoO1xuXG4gICAgICAgIGlmICghZW5kVW5pdCkge1xuICAgICAgICAgIC8vaWYgc29tZXRoaW5nIGxpa2UgXCJwZXJzcGVjdGl2ZTozMDBcIiBpcyBwYXNzZWQgaW4gYW5kIHdlIG11c3QgYWRkIGEgdW5pdCB0byB0aGUgZW5kXG4gICAgICAgICAgZW5kVW5pdCA9IGVuZFVuaXQgfHwgX2NvbmZpZy51bml0c1twcm9wXSB8fCBzdGFydFVuaXQ7XG5cbiAgICAgICAgICBpZiAoaW5kZXggPT09IGVuZC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGVuZCArPSBlbmRVbml0O1xuICAgICAgICAgICAgcHQuZSArPSBlbmRVbml0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGFydFVuaXQgIT09IGVuZFVuaXQpIHtcbiAgICAgICAgICBzdGFydE51bSA9IF9jb252ZXJ0VG9Vbml0KHRhcmdldCwgcHJvcCwgc3RhcnRWYWx1ZSwgZW5kVW5pdCkgfHwgMDtcbiAgICAgICAgfSAvLyB0aGVzZSBuZXN0ZWQgUHJvcFR3ZWVucyBhcmUgaGFuZGxlZCBpbiBhIHNwZWNpYWwgd2F5IC0gd2UnbGwgbmV2ZXIgYWN0dWFsbHkgY2FsbCBhIHJlbmRlciBvciBzZXR0ZXIgbWV0aG9kIG9uIHRoZW0uIFdlJ2xsIGp1c3QgbG9vcCB0aHJvdWdoIHRoZW0gaW4gdGhlIHBhcmVudCBjb21wbGV4IHN0cmluZyBQcm9wVHdlZW4ncyByZW5kZXIgbWV0aG9kLlxuXG5cbiAgICAgICAgcHQuX3B0ID0ge1xuICAgICAgICAgIF9uZXh0OiBwdC5fcHQsXG4gICAgICAgICAgcDogY2h1bmsgfHwgbWF0Y2hJbmRleCA9PT0gMSA/IGNodW5rIDogXCIsXCIsXG4gICAgICAgICAgLy9ub3RlOiBTVkcgc3BlYyBhbGxvd3Mgb21pc3Npb24gb2YgY29tbWEvc3BhY2Ugd2hlbiBhIG5lZ2F0aXZlIHNpZ24gaXMgd2VkZ2VkIGJldHdlZW4gdHdvIG51bWJlcnMsIGxpa2UgMi41LTUuMyBpbnN0ZWFkIG9mIDIuNSwtNS4zIGJ1dCB3aGVuIHR3ZWVuaW5nLCB0aGUgbmVnYXRpdmUgdmFsdWUgbWF5IHN3aXRjaCB0byBwb3NpdGl2ZSwgc28gd2UgaW5zZXJ0IHRoZSBjb21tYSBqdXN0IGluIGNhc2UuXG4gICAgICAgICAgczogc3RhcnROdW0sXG4gICAgICAgICAgYzogZW5kTnVtIC0gc3RhcnROdW0sXG4gICAgICAgICAgbTogY29sb3IgJiYgY29sb3IgPCA0IHx8IHByb3AgPT09IFwiekluZGV4XCIgPyBNYXRoLnJvdW5kIDogMFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIHB0LmMgPSBpbmRleCA8IGVuZC5sZW5ndGggPyBlbmQuc3Vic3RyaW5nKGluZGV4LCBlbmQubGVuZ3RoKSA6IFwiXCI7IC8vd2UgdXNlIHRoZSBcImNcIiBvZiB0aGUgUHJvcFR3ZWVuIHRvIHN0b3JlIHRoZSBmaW5hbCBwYXJ0IG9mIHRoZSBzdHJpbmcgKGFmdGVyIHRoZSBsYXN0IG51bWJlcilcbiAgfSBlbHNlIHtcbiAgICBwdC5yID0gcHJvcCA9PT0gXCJkaXNwbGF5XCIgJiYgZW5kID09PSBcIm5vbmVcIiA/IF9yZW5kZXJOb25Ud2VlbmluZ1ZhbHVlT25seUF0RW5kIDogX3JlbmRlck5vblR3ZWVuaW5nVmFsdWU7XG4gIH1cblxuICBfcmVsRXhwLnRlc3QoZW5kKSAmJiAocHQuZSA9IDApOyAvL2lmIHRoZSBlbmQgc3RyaW5nIGNvbnRhaW5zIHJlbGF0aXZlIHZhbHVlcyBvciBkeW5hbWljIHJhbmRvbSguLi4pIHZhbHVlcywgZGVsZXRlIHRoZSBlbmQgaXQgc28gdGhhdCBvbiB0aGUgZmluYWwgcmVuZGVyIHdlIGRvbid0IGFjdHVhbGx5IHNldCBpdCB0byB0aGUgc3RyaW5nIHdpdGggKz0gb3IgLT0gY2hhcmFjdGVycyAoZm9yY2VzIGl0IHRvIHVzZSB0aGUgY2FsY3VsYXRlZCB2YWx1ZSkuXG5cbiAgdGhpcy5fcHQgPSBwdDsgLy9zdGFydCB0aGUgbGlua2VkIGxpc3Qgd2l0aCB0aGlzIG5ldyBQcm9wVHdlZW4uIFJlbWVtYmVyLCB3ZSBjYWxsIF90d2VlbkNvbXBsZXhDU1NTdHJpbmcuY2FsbChwbHVnaW5JbnN0YW5jZS4uLikgdG8gZW5zdXJlIHRoYXQgaXQncyBzY29wZWQgcHJvcGVybHkuIFdlIG1heSBjYWxsIGl0IGZyb20gd2l0aGluIGFub3RoZXIgcGx1Z2luIHRvbywgdGh1cyBcInRoaXNcIiB3b3VsZCByZWZlciB0byB0aGUgcGx1Z2luLlxuXG4gIHJldHVybiBwdDtcbn0sXG4gICAgX2tleXdvcmRUb1BlcmNlbnQgPSB7XG4gIHRvcDogXCIwJVwiLFxuICBib3R0b206IFwiMTAwJVwiLFxuICBsZWZ0OiBcIjAlXCIsXG4gIHJpZ2h0OiBcIjEwMCVcIixcbiAgY2VudGVyOiBcIjUwJVwiXG59LFxuICAgIF9jb252ZXJ0S2V5d29yZHNUb1BlcmNlbnRhZ2VzID0gZnVuY3Rpb24gX2NvbnZlcnRLZXl3b3Jkc1RvUGVyY2VudGFnZXModmFsdWUpIHtcbiAgdmFyIHNwbGl0ID0gdmFsdWUuc3BsaXQoXCIgXCIpLFxuICAgICAgeCA9IHNwbGl0WzBdLFxuICAgICAgeSA9IHNwbGl0WzFdIHx8IFwiNTAlXCI7XG5cbiAgaWYgKHggPT09IFwidG9wXCIgfHwgeCA9PT0gXCJib3R0b21cIiB8fCB5ID09PSBcImxlZnRcIiB8fCB5ID09PSBcInJpZ2h0XCIpIHtcbiAgICAvL3RoZSB1c2VyIHByb3ZpZGVkIHRoZW0gaW4gdGhlIHdyb25nIG9yZGVyLCBzbyBmbGlwIHRoZW1cbiAgICB2YWx1ZSA9IHg7XG4gICAgeCA9IHk7XG4gICAgeSA9IHZhbHVlO1xuICB9XG5cbiAgc3BsaXRbMF0gPSBfa2V5d29yZFRvUGVyY2VudFt4XSB8fCB4O1xuICBzcGxpdFsxXSA9IF9rZXl3b3JkVG9QZXJjZW50W3ldIHx8IHk7XG4gIHJldHVybiBzcGxpdC5qb2luKFwiIFwiKTtcbn0sXG4gICAgX3JlbmRlckNsZWFyUHJvcHMgPSBmdW5jdGlvbiBfcmVuZGVyQ2xlYXJQcm9wcyhyYXRpbywgZGF0YSkge1xuICBpZiAoZGF0YS50d2VlbiAmJiBkYXRhLnR3ZWVuLl90aW1lID09PSBkYXRhLnR3ZWVuLl9kdXIpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZGF0YS50LFxuICAgICAgICBzdHlsZSA9IHRhcmdldC5zdHlsZSxcbiAgICAgICAgcHJvcHMgPSBkYXRhLnUsXG4gICAgICAgIGNhY2hlID0gdGFyZ2V0Ll9nc2FwLFxuICAgICAgICBwcm9wLFxuICAgICAgICBjbGVhclRyYW5zZm9ybXMsXG4gICAgICAgIGk7XG5cbiAgICBpZiAocHJvcHMgPT09IFwiYWxsXCIgfHwgcHJvcHMgPT09IHRydWUpIHtcbiAgICAgIHN0eWxlLmNzc1RleHQgPSBcIlwiO1xuICAgICAgY2xlYXJUcmFuc2Zvcm1zID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvcHMgPSBwcm9wcy5zcGxpdChcIixcIik7XG4gICAgICBpID0gcHJvcHMubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoLS1pID4gLTEpIHtcbiAgICAgICAgcHJvcCA9IHByb3BzW2ldO1xuXG4gICAgICAgIGlmIChfdHJhbnNmb3JtUHJvcHNbcHJvcF0pIHtcbiAgICAgICAgICBjbGVhclRyYW5zZm9ybXMgPSAxO1xuICAgICAgICAgIHByb3AgPSBwcm9wID09PSBcInRyYW5zZm9ybU9yaWdpblwiID8gX3RyYW5zZm9ybU9yaWdpblByb3AgOiBfdHJhbnNmb3JtUHJvcDtcbiAgICAgICAgfVxuXG4gICAgICAgIF9yZW1vdmVQcm9wZXJ0eSh0YXJnZXQsIHByb3ApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjbGVhclRyYW5zZm9ybXMpIHtcbiAgICAgIF9yZW1vdmVQcm9wZXJ0eSh0YXJnZXQsIF90cmFuc2Zvcm1Qcm9wKTtcblxuICAgICAgaWYgKGNhY2hlKSB7XG4gICAgICAgIGNhY2hlLnN2ZyAmJiB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKFwidHJhbnNmb3JtXCIpO1xuXG4gICAgICAgIF9wYXJzZVRyYW5zZm9ybSh0YXJnZXQsIDEpOyAvLyBmb3JjZSBhbGwgdGhlIGNhY2hlZCB2YWx1ZXMgYmFjayB0byBcIm5vcm1hbFwiL2lkZW50aXR5LCBvdGhlcndpc2UgaWYgdGhlcmUncyBhbm90aGVyIHR3ZWVuIHRoYXQncyBhbHJlYWR5IHNldCB0byByZW5kZXIgdHJhbnNmb3JtcyBvbiB0aGlzIGVsZW1lbnQsIGl0IGNvdWxkIGRpc3BsYXkgdGhlIHdyb25nIHZhbHVlcy5cblxuXG4gICAgICAgIGNhY2hlLnVuY2FjaGUgPSAxO1xuXG4gICAgICAgIF9yZW1vdmVJbmRlcGVuZGVudFRyYW5zZm9ybXMoc3R5bGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSxcbiAgICAvLyBub3RlOiBzcGVjaWFsUHJvcHMgc2hvdWxkIHJldHVybiAxIGlmIChhbmQgb25seSBpZikgdGhleSBoYXZlIGEgbm9uLXplcm8gcHJpb3JpdHkuIEl0IGluZGljYXRlcyB3ZSBuZWVkIHRvIHNvcnQgdGhlIGxpbmtlZCBsaXN0LlxuX3NwZWNpYWxQcm9wcyA9IHtcbiAgY2xlYXJQcm9wczogZnVuY3Rpb24gY2xlYXJQcm9wcyhwbHVnaW4sIHRhcmdldCwgcHJvcGVydHksIGVuZFZhbHVlLCB0d2Vlbikge1xuICAgIGlmICh0d2Vlbi5kYXRhICE9PSBcImlzRnJvbVN0YXJ0XCIpIHtcbiAgICAgIHZhciBwdCA9IHBsdWdpbi5fcHQgPSBuZXcgUHJvcFR3ZWVuKHBsdWdpbi5fcHQsIHRhcmdldCwgcHJvcGVydHksIDAsIDAsIF9yZW5kZXJDbGVhclByb3BzKTtcbiAgICAgIHB0LnUgPSBlbmRWYWx1ZTtcbiAgICAgIHB0LnByID0gLTEwO1xuICAgICAgcHQudHdlZW4gPSB0d2VlbjtcblxuICAgICAgcGx1Z2luLl9wcm9wcy5wdXNoKHByb3BlcnR5KTtcblxuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICB9XG4gIC8qIGNsYXNzTmFtZSBmZWF0dXJlIChhYm91dCAwLjRrYiBnemlwcGVkKS5cbiAgLCBjbGFzc05hbWUocGx1Z2luLCB0YXJnZXQsIHByb3BlcnR5LCBlbmRWYWx1ZSwgdHdlZW4pIHtcbiAgXHRsZXQgX3JlbmRlckNsYXNzTmFtZSA9IChyYXRpbywgZGF0YSkgPT4ge1xuICBcdFx0XHRkYXRhLmNzcy5yZW5kZXIocmF0aW8sIGRhdGEuY3NzKTtcbiAgXHRcdFx0aWYgKCFyYXRpbyB8fCByYXRpbyA9PT0gMSkge1xuICBcdFx0XHRcdGxldCBpbmxpbmUgPSBkYXRhLnJtdixcbiAgXHRcdFx0XHRcdHRhcmdldCA9IGRhdGEudCxcbiAgXHRcdFx0XHRcdHA7XG4gIFx0XHRcdFx0dGFyZ2V0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIHJhdGlvID8gZGF0YS5lIDogZGF0YS5iKTtcbiAgXHRcdFx0XHRmb3IgKHAgaW4gaW5saW5lKSB7XG4gIFx0XHRcdFx0XHRfcmVtb3ZlUHJvcGVydHkodGFyZ2V0LCBwKTtcbiAgXHRcdFx0XHR9XG4gIFx0XHRcdH1cbiAgXHRcdH0sXG4gIFx0XHRfZ2V0QWxsU3R5bGVzID0gKHRhcmdldCkgPT4ge1xuICBcdFx0XHRsZXQgc3R5bGVzID0ge30sXG4gIFx0XHRcdFx0Y29tcHV0ZWQgPSBnZXRDb21wdXRlZFN0eWxlKHRhcmdldCksXG4gIFx0XHRcdFx0cDtcbiAgXHRcdFx0Zm9yIChwIGluIGNvbXB1dGVkKSB7XG4gIFx0XHRcdFx0aWYgKGlzTmFOKHApICYmIHAgIT09IFwiY3NzVGV4dFwiICYmIHAgIT09IFwibGVuZ3RoXCIpIHtcbiAgXHRcdFx0XHRcdHN0eWxlc1twXSA9IGNvbXB1dGVkW3BdO1xuICBcdFx0XHRcdH1cbiAgXHRcdFx0fVxuICBcdFx0XHRfc2V0RGVmYXVsdHMoc3R5bGVzLCBfcGFyc2VUcmFuc2Zvcm0odGFyZ2V0LCAxKSk7XG4gIFx0XHRcdHJldHVybiBzdHlsZXM7XG4gIFx0XHR9LFxuICBcdFx0c3RhcnRDbGFzc0xpc3QgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIiksXG4gIFx0XHRzdHlsZSA9IHRhcmdldC5zdHlsZSxcbiAgXHRcdGNzc1RleHQgPSBzdHlsZS5jc3NUZXh0LFxuICBcdFx0Y2FjaGUgPSB0YXJnZXQuX2dzYXAsXG4gIFx0XHRjbGFzc1BUID0gY2FjaGUuY2xhc3NQVCxcbiAgXHRcdGlubGluZVRvUmVtb3ZlQXRFbmQgPSB7fSxcbiAgXHRcdGRhdGEgPSB7dDp0YXJnZXQsIHBsdWdpbjpwbHVnaW4sIHJtdjppbmxpbmVUb1JlbW92ZUF0RW5kLCBiOnN0YXJ0Q2xhc3NMaXN0LCBlOihlbmRWYWx1ZS5jaGFyQXQoMSkgIT09IFwiPVwiKSA/IGVuZFZhbHVlIDogc3RhcnRDbGFzc0xpc3QucmVwbGFjZShuZXcgUmVnRXhwKFwiKD86XFxcXHN8XilcIiArIGVuZFZhbHVlLnN1YnN0cigyKSArIFwiKD8hW1xcXFx3LV0pXCIpLCBcIlwiKSArICgoZW5kVmFsdWUuY2hhckF0KDApID09PSBcIitcIikgPyBcIiBcIiArIGVuZFZhbHVlLnN1YnN0cigyKSA6IFwiXCIpfSxcbiAgXHRcdGNoYW5naW5nVmFycyA9IHt9LFxuICBcdFx0c3RhcnRWYXJzID0gX2dldEFsbFN0eWxlcyh0YXJnZXQpLFxuICBcdFx0dHJhbnNmb3JtUmVsYXRlZCA9IC8odHJhbnNmb3JtfHBlcnNwZWN0aXZlKS9pLFxuICBcdFx0ZW5kVmFycywgcDtcbiAgXHRpZiAoY2xhc3NQVCkge1xuICBcdFx0Y2xhc3NQVC5yKDEsIGNsYXNzUFQuZCk7XG4gIFx0XHRfcmVtb3ZlTGlua2VkTGlzdEl0ZW0oY2xhc3NQVC5kLnBsdWdpbiwgY2xhc3NQVCwgXCJfcHRcIik7XG4gIFx0fVxuICBcdHRhcmdldC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBkYXRhLmUpO1xuICBcdGVuZFZhcnMgPSBfZ2V0QWxsU3R5bGVzKHRhcmdldCwgdHJ1ZSk7XG4gIFx0dGFyZ2V0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIHN0YXJ0Q2xhc3NMaXN0KTtcbiAgXHRmb3IgKHAgaW4gZW5kVmFycykge1xuICBcdFx0aWYgKGVuZFZhcnNbcF0gIT09IHN0YXJ0VmFyc1twXSAmJiAhdHJhbnNmb3JtUmVsYXRlZC50ZXN0KHApKSB7XG4gIFx0XHRcdGNoYW5naW5nVmFyc1twXSA9IGVuZFZhcnNbcF07XG4gIFx0XHRcdGlmICghc3R5bGVbcF0gJiYgc3R5bGVbcF0gIT09IFwiMFwiKSB7XG4gIFx0XHRcdFx0aW5saW5lVG9SZW1vdmVBdEVuZFtwXSA9IDE7XG4gIFx0XHRcdH1cbiAgXHRcdH1cbiAgXHR9XG4gIFx0Y2FjaGUuY2xhc3NQVCA9IHBsdWdpbi5fcHQgPSBuZXcgUHJvcFR3ZWVuKHBsdWdpbi5fcHQsIHRhcmdldCwgXCJjbGFzc05hbWVcIiwgMCwgMCwgX3JlbmRlckNsYXNzTmFtZSwgZGF0YSwgMCwgLTExKTtcbiAgXHRpZiAoc3R5bGUuY3NzVGV4dCAhPT0gY3NzVGV4dCkgeyAvL29ubHkgYXBwbHkgaWYgdGhpbmdzIGNoYW5nZS4gT3RoZXJ3aXNlLCBpbiBjYXNlcyBsaWtlIGEgYmFja2dyb3VuZC1pbWFnZSB0aGF0J3MgcHVsbGVkIGR5bmFtaWNhbGx5LCBpdCBjb3VsZCBjYXVzZSBhIHJlZnJlc2guIFNlZSBodHRwczovL2dyZWVuc29jay5jb20vZm9ydW1zL3RvcGljLzIwMzY4LXBvc3NpYmxlLWdzYXAtYnVnLXN3aXRjaGluZy1jbGFzc25hbWVzLWluLWNocm9tZS8uXG4gIFx0XHRzdHlsZS5jc3NUZXh0ID0gY3NzVGV4dDsgLy93ZSByZWNvcmRlZCBjc3NUZXh0IGJlZm9yZSB3ZSBzd2FwcGVkIGNsYXNzZXMgYW5kIHJhbiBfZ2V0QWxsU3R5bGVzKCkgYmVjYXVzZSBpbiBjYXNlcyB3aGVuIGEgY2xhc3NOYW1lIHR3ZWVuIGlzIG92ZXJ3cml0dGVuLCB3ZSByZW1vdmUgYWxsIHRoZSByZWxhdGVkIHR3ZWVuaW5nIHByb3BlcnRpZXMgZnJvbSB0aGF0IGNsYXNzIGNoYW5nZSAob3RoZXJ3aXNlIGNsYXNzLXNwZWNpZmljIHN0dWZmIGNhbid0IG92ZXJyaWRlIHByb3BlcnRpZXMgd2UndmUgZGlyZWN0bHkgc2V0IG9uIHRoZSB0YXJnZXQncyBzdHlsZSBvYmplY3QgZHVlIHRvIHNwZWNpZmljaXR5KS5cbiAgXHR9XG4gIFx0X3BhcnNlVHJhbnNmb3JtKHRhcmdldCwgdHJ1ZSk7IC8vdG8gY2xlYXIgdGhlIGNhY2hpbmcgb2YgdHJhbnNmb3Jtc1xuICBcdGRhdGEuY3NzID0gbmV3IGdzYXAucGx1Z2lucy5jc3MoKTtcbiAgXHRkYXRhLmNzcy5pbml0KHRhcmdldCwgY2hhbmdpbmdWYXJzLCB0d2Vlbik7XG4gIFx0cGx1Z2luLl9wcm9wcy5wdXNoKC4uLmRhdGEuY3NzLl9wcm9wcyk7XG4gIFx0cmV0dXJuIDE7XG4gIH1cbiAgKi9cblxufSxcblxuLypcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBUUkFOU0ZPUk1TXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5faWRlbnRpdHkyRE1hdHJpeCA9IFsxLCAwLCAwLCAxLCAwLCAwXSxcbiAgICBfcm90YXRpb25hbFByb3BlcnRpZXMgPSB7fSxcbiAgICBfaXNOdWxsVHJhbnNmb3JtID0gZnVuY3Rpb24gX2lzTnVsbFRyYW5zZm9ybSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IFwibWF0cml4KDEsIDAsIDAsIDEsIDAsIDApXCIgfHwgdmFsdWUgPT09IFwibm9uZVwiIHx8ICF2YWx1ZTtcbn0sXG4gICAgX2dldENvbXB1dGVkVHJhbnNmb3JtTWF0cml4QXNBcnJheSA9IGZ1bmN0aW9uIF9nZXRDb21wdXRlZFRyYW5zZm9ybU1hdHJpeEFzQXJyYXkodGFyZ2V0KSB7XG4gIHZhciBtYXRyaXhTdHJpbmcgPSBfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSh0YXJnZXQsIF90cmFuc2Zvcm1Qcm9wKTtcblxuICByZXR1cm4gX2lzTnVsbFRyYW5zZm9ybShtYXRyaXhTdHJpbmcpID8gX2lkZW50aXR5MkRNYXRyaXggOiBtYXRyaXhTdHJpbmcuc3Vic3RyKDcpLm1hdGNoKF9udW1FeHApLm1hcChfcm91bmQpO1xufSxcbiAgICBfZ2V0TWF0cml4ID0gZnVuY3Rpb24gX2dldE1hdHJpeCh0YXJnZXQsIGZvcmNlMkQpIHtcbiAgdmFyIGNhY2hlID0gdGFyZ2V0Ll9nc2FwIHx8IF9nZXRDYWNoZSh0YXJnZXQpLFxuICAgICAgc3R5bGUgPSB0YXJnZXQuc3R5bGUsXG4gICAgICBtYXRyaXggPSBfZ2V0Q29tcHV0ZWRUcmFuc2Zvcm1NYXRyaXhBc0FycmF5KHRhcmdldCksXG4gICAgICBwYXJlbnQsXG4gICAgICBuZXh0U2libGluZyxcbiAgICAgIHRlbXAsXG4gICAgICBhZGRlZFRvRE9NO1xuXG4gIGlmIChjYWNoZS5zdmcgJiYgdGFyZ2V0LmdldEF0dHJpYnV0ZShcInRyYW5zZm9ybVwiKSkge1xuICAgIHRlbXAgPSB0YXJnZXQudHJhbnNmb3JtLmJhc2VWYWwuY29uc29saWRhdGUoKS5tYXRyaXg7IC8vZW5zdXJlcyB0aGF0IGV2ZW4gY29tcGxleCB2YWx1ZXMgbGlrZSBcInRyYW5zbGF0ZSg1MCw2MCkgcm90YXRlKDEzNSwwLDApXCIgYXJlIHBhcnNlZCBiZWNhdXNlIGl0IG1hc2hlcyBpdCBpbnRvIGEgbWF0cml4LlxuXG4gICAgbWF0cml4ID0gW3RlbXAuYSwgdGVtcC5iLCB0ZW1wLmMsIHRlbXAuZCwgdGVtcC5lLCB0ZW1wLmZdO1xuICAgIHJldHVybiBtYXRyaXguam9pbihcIixcIikgPT09IFwiMSwwLDAsMSwwLDBcIiA/IF9pZGVudGl0eTJETWF0cml4IDogbWF0cml4O1xuICB9IGVsc2UgaWYgKG1hdHJpeCA9PT0gX2lkZW50aXR5MkRNYXRyaXggJiYgIXRhcmdldC5vZmZzZXRQYXJlbnQgJiYgdGFyZ2V0ICE9PSBfZG9jRWxlbWVudCAmJiAhY2FjaGUuc3ZnKSB7XG4gICAgLy9ub3RlOiBpZiBvZmZzZXRQYXJlbnQgaXMgbnVsbCwgdGhhdCBtZWFucyB0aGUgZWxlbWVudCBpc24ndCBpbiB0aGUgbm9ybWFsIGRvY3VtZW50IGZsb3csIGxpa2UgaWYgaXQgaGFzIGRpc3BsYXk6bm9uZSBvciBvbmUgb2YgaXRzIGFuY2VzdG9ycyBoYXMgZGlzcGxheTpub25lKS4gRmlyZWZveCByZXR1cm5zIG51bGwgZm9yIGdldENvbXB1dGVkU3R5bGUoKSBpZiB0aGUgZWxlbWVudCBpcyBpbiBhbiBpZnJhbWUgdGhhdCBoYXMgZGlzcGxheTpub25lLiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01NDgzOTdcbiAgICAvL2Jyb3dzZXJzIGRvbid0IHJlcG9ydCB0cmFuc2Zvcm1zIGFjY3VyYXRlbHkgdW5sZXNzIHRoZSBlbGVtZW50IGlzIGluIHRoZSBET00gYW5kIGhhcyBhIGRpc3BsYXkgdmFsdWUgdGhhdCdzIG5vdCBcIm5vbmVcIi4gRmlyZWZveCBhbmQgTWljcm9zb2Z0IGJyb3dzZXJzIGhhdmUgYSBwYXJ0aWFsIGJ1ZyB3aGVyZSB0aGV5J2xsIHJlcG9ydCB0cmFuc2Zvcm1zIGV2ZW4gaWYgZGlzcGxheTpub25lIEJVVCBub3QgYW55IHBlcmNlbnRhZ2UtYmFzZWQgdmFsdWVzIGxpa2UgdHJhbnNsYXRlKC01MCUsIDhweCkgd2lsbCBiZSByZXBvcnRlZCBhcyBpZiBpdCdzIHRyYW5zbGF0ZSgwLCA4cHgpLlxuICAgIHRlbXAgPSBzdHlsZS5kaXNwbGF5O1xuICAgIHN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgcGFyZW50ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG5cbiAgICBpZiAoIXBhcmVudCB8fCAhdGFyZ2V0Lm9mZnNldFBhcmVudCkge1xuICAgICAgLy8gbm90ZTogaW4gMy4zLjAgd2Ugc3dpdGNoZWQgdGFyZ2V0Lm9mZnNldFBhcmVudCB0byBfZG9jLmJvZHkuY29udGFpbnModGFyZ2V0KSB0byBhdm9pZCBbc29tZXRpbWVzIHVubmVjZXNzYXJ5XSBNdXRhdGlvbk9ic2VydmVyIGNhbGxzIGJ1dCB0aGF0IHdhc24ndCBhZGVxdWF0ZSBiZWNhdXNlIHRoZXJlIGFyZSBlZGdlIGNhc2VzIHdoZXJlIG5lc3RlZCBwb3NpdGlvbjogZml4ZWQgZWxlbWVudHMgbmVlZCB0byBnZXQgcmVwYXJlbnRlZCB0byBhY2N1cmF0ZWx5IHNlbnNlIHRyYW5zZm9ybXMuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZ3JlZW5zb2NrL0dTQVAvaXNzdWVzLzM4OCBhbmQgaHR0cHM6Ly9naXRodWIuY29tL2dyZWVuc29jay9HU0FQL2lzc3Vlcy8zNzVcbiAgICAgIGFkZGVkVG9ET00gPSAxOyAvL2ZsYWdcblxuICAgICAgbmV4dFNpYmxpbmcgPSB0YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nO1xuXG4gICAgICBfZG9jRWxlbWVudC5hcHBlbmRDaGlsZCh0YXJnZXQpOyAvL3dlIG11c3QgYWRkIGl0IHRvIHRoZSBET00gaW4gb3JkZXIgdG8gZ2V0IHZhbHVlcyBwcm9wZXJseVxuXG4gICAgfVxuXG4gICAgbWF0cml4ID0gX2dldENvbXB1dGVkVHJhbnNmb3JtTWF0cml4QXNBcnJheSh0YXJnZXQpO1xuICAgIHRlbXAgPyBzdHlsZS5kaXNwbGF5ID0gdGVtcCA6IF9yZW1vdmVQcm9wZXJ0eSh0YXJnZXQsIFwiZGlzcGxheVwiKTtcblxuICAgIGlmIChhZGRlZFRvRE9NKSB7XG4gICAgICBuZXh0U2libGluZyA/IHBhcmVudC5pbnNlcnRCZWZvcmUodGFyZ2V0LCBuZXh0U2libGluZykgOiBwYXJlbnQgPyBwYXJlbnQuYXBwZW5kQ2hpbGQodGFyZ2V0KSA6IF9kb2NFbGVtZW50LnJlbW92ZUNoaWxkKHRhcmdldCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZvcmNlMkQgJiYgbWF0cml4Lmxlbmd0aCA+IDYgPyBbbWF0cml4WzBdLCBtYXRyaXhbMV0sIG1hdHJpeFs0XSwgbWF0cml4WzVdLCBtYXRyaXhbMTJdLCBtYXRyaXhbMTNdXSA6IG1hdHJpeDtcbn0sXG4gICAgX2FwcGx5U1ZHT3JpZ2luID0gZnVuY3Rpb24gX2FwcGx5U1ZHT3JpZ2luKHRhcmdldCwgb3JpZ2luLCBvcmlnaW5Jc0Fic29sdXRlLCBzbW9vdGgsIG1hdHJpeEFycmF5LCBwbHVnaW5Ub0FkZFByb3BUd2VlbnNUbykge1xuICB2YXIgY2FjaGUgPSB0YXJnZXQuX2dzYXAsXG4gICAgICBtYXRyaXggPSBtYXRyaXhBcnJheSB8fCBfZ2V0TWF0cml4KHRhcmdldCwgdHJ1ZSksXG4gICAgICB4T3JpZ2luT2xkID0gY2FjaGUueE9yaWdpbiB8fCAwLFxuICAgICAgeU9yaWdpbk9sZCA9IGNhY2hlLnlPcmlnaW4gfHwgMCxcbiAgICAgIHhPZmZzZXRPbGQgPSBjYWNoZS54T2Zmc2V0IHx8IDAsXG4gICAgICB5T2Zmc2V0T2xkID0gY2FjaGUueU9mZnNldCB8fCAwLFxuICAgICAgYSA9IG1hdHJpeFswXSxcbiAgICAgIGIgPSBtYXRyaXhbMV0sXG4gICAgICBjID0gbWF0cml4WzJdLFxuICAgICAgZCA9IG1hdHJpeFszXSxcbiAgICAgIHR4ID0gbWF0cml4WzRdLFxuICAgICAgdHkgPSBtYXRyaXhbNV0sXG4gICAgICBvcmlnaW5TcGxpdCA9IG9yaWdpbi5zcGxpdChcIiBcIiksXG4gICAgICB4T3JpZ2luID0gcGFyc2VGbG9hdChvcmlnaW5TcGxpdFswXSkgfHwgMCxcbiAgICAgIHlPcmlnaW4gPSBwYXJzZUZsb2F0KG9yaWdpblNwbGl0WzFdKSB8fCAwLFxuICAgICAgYm91bmRzLFxuICAgICAgZGV0ZXJtaW5hbnQsXG4gICAgICB4LFxuICAgICAgeTtcblxuICBpZiAoIW9yaWdpbklzQWJzb2x1dGUpIHtcbiAgICBib3VuZHMgPSBfZ2V0QkJveCh0YXJnZXQpO1xuICAgIHhPcmlnaW4gPSBib3VuZHMueCArICh+b3JpZ2luU3BsaXRbMF0uaW5kZXhPZihcIiVcIikgPyB4T3JpZ2luIC8gMTAwICogYm91bmRzLndpZHRoIDogeE9yaWdpbik7XG4gICAgeU9yaWdpbiA9IGJvdW5kcy55ICsgKH4ob3JpZ2luU3BsaXRbMV0gfHwgb3JpZ2luU3BsaXRbMF0pLmluZGV4T2YoXCIlXCIpID8geU9yaWdpbiAvIDEwMCAqIGJvdW5kcy5oZWlnaHQgOiB5T3JpZ2luKTtcbiAgfSBlbHNlIGlmIChtYXRyaXggIT09IF9pZGVudGl0eTJETWF0cml4ICYmIChkZXRlcm1pbmFudCA9IGEgKiBkIC0gYiAqIGMpKSB7XG4gICAgLy9pZiBpdCdzIHplcm8gKGxpa2UgaWYgc2NhbGVYIGFuZCBzY2FsZVkgYXJlIHplcm8pLCBza2lwIGl0IHRvIGF2b2lkIGVycm9ycyB3aXRoIGRpdmlkaW5nIGJ5IHplcm8uXG4gICAgeCA9IHhPcmlnaW4gKiAoZCAvIGRldGVybWluYW50KSArIHlPcmlnaW4gKiAoLWMgLyBkZXRlcm1pbmFudCkgKyAoYyAqIHR5IC0gZCAqIHR4KSAvIGRldGVybWluYW50O1xuICAgIHkgPSB4T3JpZ2luICogKC1iIC8gZGV0ZXJtaW5hbnQpICsgeU9yaWdpbiAqIChhIC8gZGV0ZXJtaW5hbnQpIC0gKGEgKiB0eSAtIGIgKiB0eCkgLyBkZXRlcm1pbmFudDtcbiAgICB4T3JpZ2luID0geDtcbiAgICB5T3JpZ2luID0geTtcbiAgfVxuXG4gIGlmIChzbW9vdGggfHwgc21vb3RoICE9PSBmYWxzZSAmJiBjYWNoZS5zbW9vdGgpIHtcbiAgICB0eCA9IHhPcmlnaW4gLSB4T3JpZ2luT2xkO1xuICAgIHR5ID0geU9yaWdpbiAtIHlPcmlnaW5PbGQ7XG4gICAgY2FjaGUueE9mZnNldCA9IHhPZmZzZXRPbGQgKyAodHggKiBhICsgdHkgKiBjKSAtIHR4O1xuICAgIGNhY2hlLnlPZmZzZXQgPSB5T2Zmc2V0T2xkICsgKHR4ICogYiArIHR5ICogZCkgLSB0eTtcbiAgfSBlbHNlIHtcbiAgICBjYWNoZS54T2Zmc2V0ID0gY2FjaGUueU9mZnNldCA9IDA7XG4gIH1cblxuICBjYWNoZS54T3JpZ2luID0geE9yaWdpbjtcbiAgY2FjaGUueU9yaWdpbiA9IHlPcmlnaW47XG4gIGNhY2hlLnNtb290aCA9ICEhc21vb3RoO1xuICBjYWNoZS5vcmlnaW4gPSBvcmlnaW47XG4gIGNhY2hlLm9yaWdpbklzQWJzb2x1dGUgPSAhIW9yaWdpbklzQWJzb2x1dGU7XG4gIHRhcmdldC5zdHlsZVtfdHJhbnNmb3JtT3JpZ2luUHJvcF0gPSBcIjBweCAwcHhcIjsgLy9vdGhlcndpc2UsIGlmIHNvbWVvbmUgc2V0cyAgYW4gb3JpZ2luIHZpYSBDU1MsIGl0IHdpbGwgbGlrZWx5IGludGVyZmVyZSB3aXRoIHRoZSBTVkcgdHJhbnNmb3JtIGF0dHJpYnV0ZSBvbmVzIChiZWNhdXNlIHJlbWVtYmVyLCB3ZSdyZSBiYWtpbmcgdGhlIG9yaWdpbiBpbnRvIHRoZSBtYXRyaXgoKSB2YWx1ZSkuXG5cbiAgaWYgKHBsdWdpblRvQWRkUHJvcFR3ZWVuc1RvKSB7XG4gICAgX2FkZE5vblR3ZWVuaW5nUFQocGx1Z2luVG9BZGRQcm9wVHdlZW5zVG8sIGNhY2hlLCBcInhPcmlnaW5cIiwgeE9yaWdpbk9sZCwgeE9yaWdpbik7XG5cbiAgICBfYWRkTm9uVHdlZW5pbmdQVChwbHVnaW5Ub0FkZFByb3BUd2VlbnNUbywgY2FjaGUsIFwieU9yaWdpblwiLCB5T3JpZ2luT2xkLCB5T3JpZ2luKTtcblxuICAgIF9hZGROb25Ud2VlbmluZ1BUKHBsdWdpblRvQWRkUHJvcFR3ZWVuc1RvLCBjYWNoZSwgXCJ4T2Zmc2V0XCIsIHhPZmZzZXRPbGQsIGNhY2hlLnhPZmZzZXQpO1xuXG4gICAgX2FkZE5vblR3ZWVuaW5nUFQocGx1Z2luVG9BZGRQcm9wVHdlZW5zVG8sIGNhY2hlLCBcInlPZmZzZXRcIiwgeU9mZnNldE9sZCwgY2FjaGUueU9mZnNldCk7XG4gIH1cblxuICB0YXJnZXQuc2V0QXR0cmlidXRlKFwiZGF0YS1zdmctb3JpZ2luXCIsIHhPcmlnaW4gKyBcIiBcIiArIHlPcmlnaW4pO1xufSxcbiAgICBfcGFyc2VUcmFuc2Zvcm0gPSBmdW5jdGlvbiBfcGFyc2VUcmFuc2Zvcm0odGFyZ2V0LCB1bmNhY2hlKSB7XG4gIHZhciBjYWNoZSA9IHRhcmdldC5fZ3NhcCB8fCBuZXcgR1NDYWNoZSh0YXJnZXQpO1xuXG4gIGlmIChcInhcIiBpbiBjYWNoZSAmJiAhdW5jYWNoZSAmJiAhY2FjaGUudW5jYWNoZSkge1xuICAgIHJldHVybiBjYWNoZTtcbiAgfVxuXG4gIHZhciBzdHlsZSA9IHRhcmdldC5zdHlsZSxcbiAgICAgIGludmVydGVkU2NhbGVYID0gY2FjaGUuc2NhbGVYIDwgMCxcbiAgICAgIHB4ID0gXCJweFwiLFxuICAgICAgZGVnID0gXCJkZWdcIixcbiAgICAgIGNzID0gZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXQpLFxuICAgICAgb3JpZ2luID0gX2dldENvbXB1dGVkUHJvcGVydHkodGFyZ2V0LCBfdHJhbnNmb3JtT3JpZ2luUHJvcCkgfHwgXCIwXCIsXG4gICAgICB4LFxuICAgICAgeSxcbiAgICAgIHosXG4gICAgICBzY2FsZVgsXG4gICAgICBzY2FsZVksXG4gICAgICByb3RhdGlvbixcbiAgICAgIHJvdGF0aW9uWCxcbiAgICAgIHJvdGF0aW9uWSxcbiAgICAgIHNrZXdYLFxuICAgICAgc2tld1ksXG4gICAgICBwZXJzcGVjdGl2ZSxcbiAgICAgIHhPcmlnaW4sXG4gICAgICB5T3JpZ2luLFxuICAgICAgbWF0cml4LFxuICAgICAgYW5nbGUsXG4gICAgICBjb3MsXG4gICAgICBzaW4sXG4gICAgICBhLFxuICAgICAgYixcbiAgICAgIGMsXG4gICAgICBkLFxuICAgICAgYTEyLFxuICAgICAgYTIyLFxuICAgICAgdDEsXG4gICAgICB0MixcbiAgICAgIHQzLFxuICAgICAgYTEzLFxuICAgICAgYTIzLFxuICAgICAgYTMzLFxuICAgICAgYTQyLFxuICAgICAgYTQzLFxuICAgICAgYTMyO1xuICB4ID0geSA9IHogPSByb3RhdGlvbiA9IHJvdGF0aW9uWCA9IHJvdGF0aW9uWSA9IHNrZXdYID0gc2tld1kgPSBwZXJzcGVjdGl2ZSA9IDA7XG4gIHNjYWxlWCA9IHNjYWxlWSA9IDE7XG4gIGNhY2hlLnN2ZyA9ICEhKHRhcmdldC5nZXRDVE0gJiYgX2lzU1ZHKHRhcmdldCkpO1xuXG4gIGlmIChjcy50cmFuc2xhdGUpIHtcbiAgICAvLyBhY2NvbW1vZGF0ZSBpbmRlcGVuZGVudCB0cmFuc2Zvcm1zIGJ5IGNvbWJpbmluZyB0aGVtIGludG8gbm9ybWFsIG9uZXMuXG4gICAgaWYgKGNzLnRyYW5zbGF0ZSAhPT0gXCJub25lXCIgfHwgY3Muc2NhbGUgIT09IFwibm9uZVwiIHx8IGNzLnJvdGF0ZSAhPT0gXCJub25lXCIpIHtcbiAgICAgIHN0eWxlW190cmFuc2Zvcm1Qcm9wXSA9IChjcy50cmFuc2xhdGUgIT09IFwibm9uZVwiID8gXCJ0cmFuc2xhdGUzZChcIiArIChjcy50cmFuc2xhdGUgKyBcIiAwIDBcIikuc3BsaXQoXCIgXCIpLnNsaWNlKDAsIDMpLmpvaW4oXCIsIFwiKSArIFwiKSBcIiA6IFwiXCIpICsgKGNzLnJvdGF0ZSAhPT0gXCJub25lXCIgPyBcInJvdGF0ZShcIiArIGNzLnJvdGF0ZSArIFwiKSBcIiA6IFwiXCIpICsgKGNzLnNjYWxlICE9PSBcIm5vbmVcIiA/IFwic2NhbGUoXCIgKyBjcy5zY2FsZS5zcGxpdChcIiBcIikuam9pbihcIixcIikgKyBcIikgXCIgOiBcIlwiKSArIChjc1tfdHJhbnNmb3JtUHJvcF0gIT09IFwibm9uZVwiID8gY3NbX3RyYW5zZm9ybVByb3BdIDogXCJcIik7XG4gICAgfVxuXG4gICAgc3R5bGUuc2NhbGUgPSBzdHlsZS5yb3RhdGUgPSBzdHlsZS50cmFuc2xhdGUgPSBcIm5vbmVcIjtcbiAgfVxuXG4gIG1hdHJpeCA9IF9nZXRNYXRyaXgodGFyZ2V0LCBjYWNoZS5zdmcpO1xuXG4gIGlmIChjYWNoZS5zdmcpIHtcbiAgICBpZiAoY2FjaGUudW5jYWNoZSkge1xuICAgICAgLy8gaWYgY2FjaGUudW5jYWNoZSBpcyB0cnVlIChhbmQgbWF5YmUgaWYgb3JpZ2luIGlzIDAsMCksIHdlIG5lZWQgdG8gc2V0IGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gKGNhY2hlLnhPcmlnaW4gLSBiYm94LngpICsgXCJweCBcIiArIChjYWNoZS55T3JpZ2luIC0gYmJveC55KSArIFwicHhcIi4gUHJldmlvdXNseSB3ZSBsZXQgdGhlIGRhdGEtc3ZnLW9yaWdpbiBzdGF5IGluc3RlYWQsIGJ1dCB3aGVuIGludHJvZHVjaW5nIHJldmVydCgpLCBpdCBjb21wbGljYXRlZCB0aGluZ3MuXG4gICAgICB0MiA9IHRhcmdldC5nZXRCQm94KCk7XG4gICAgICBvcmlnaW4gPSBjYWNoZS54T3JpZ2luIC0gdDIueCArIFwicHggXCIgKyAoY2FjaGUueU9yaWdpbiAtIHQyLnkpICsgXCJweFwiO1xuICAgICAgdDEgPSBcIlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0MSA9ICF1bmNhY2hlICYmIHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXN2Zy1vcmlnaW5cIik7IC8vICBSZW1lbWJlciwgdG8gd29yayBhcm91bmQgYnJvd3NlciBpbmNvbnNpc3RlbmNpZXMgd2UgYWx3YXlzIGZvcmNlIFNWRyBlbGVtZW50cycgdHJhbnNmb3JtT3JpZ2luIHRvIDAsMCBhbmQgb2Zmc2V0IHRoZSB0cmFuc2xhdGlvbiBhY2NvcmRpbmdseS5cbiAgICB9XG5cbiAgICBfYXBwbHlTVkdPcmlnaW4odGFyZ2V0LCB0MSB8fCBvcmlnaW4sICEhdDEgfHwgY2FjaGUub3JpZ2luSXNBYnNvbHV0ZSwgY2FjaGUuc21vb3RoICE9PSBmYWxzZSwgbWF0cml4KTtcbiAgfVxuXG4gIHhPcmlnaW4gPSBjYWNoZS54T3JpZ2luIHx8IDA7XG4gIHlPcmlnaW4gPSBjYWNoZS55T3JpZ2luIHx8IDA7XG5cbiAgaWYgKG1hdHJpeCAhPT0gX2lkZW50aXR5MkRNYXRyaXgpIHtcbiAgICBhID0gbWF0cml4WzBdOyAvL2ExMVxuXG4gICAgYiA9IG1hdHJpeFsxXTsgLy9hMjFcblxuICAgIGMgPSBtYXRyaXhbMl07IC8vYTMxXG5cbiAgICBkID0gbWF0cml4WzNdOyAvL2E0MVxuXG4gICAgeCA9IGExMiA9IG1hdHJpeFs0XTtcbiAgICB5ID0gYTIyID0gbWF0cml4WzVdOyAvLzJEIG1hdHJpeFxuXG4gICAgaWYgKG1hdHJpeC5sZW5ndGggPT09IDYpIHtcbiAgICAgIHNjYWxlWCA9IE1hdGguc3FydChhICogYSArIGIgKiBiKTtcbiAgICAgIHNjYWxlWSA9IE1hdGguc3FydChkICogZCArIGMgKiBjKTtcbiAgICAgIHJvdGF0aW9uID0gYSB8fCBiID8gX2F0YW4yKGIsIGEpICogX1JBRDJERUcgOiAwOyAvL25vdGU6IGlmIHNjYWxlWCBpcyAwLCB3ZSBjYW5ub3QgYWNjdXJhdGVseSBtZWFzdXJlIHJvdGF0aW9uLiBTYW1lIGZvciBza2V3WCB3aXRoIGEgc2NhbGVZIG9mIDAuIFRoZXJlZm9yZSwgd2UgZGVmYXVsdCB0byB0aGUgcHJldmlvdXNseSByZWNvcmRlZCB2YWx1ZSAob3IgemVybyBpZiB0aGF0IGRvZXNuJ3QgZXhpc3QpLlxuXG4gICAgICBza2V3WCA9IGMgfHwgZCA/IF9hdGFuMihjLCBkKSAqIF9SQUQyREVHICsgcm90YXRpb24gOiAwO1xuICAgICAgc2tld1ggJiYgKHNjYWxlWSAqPSBNYXRoLmFicyhNYXRoLmNvcyhza2V3WCAqIF9ERUcyUkFEKSkpO1xuXG4gICAgICBpZiAoY2FjaGUuc3ZnKSB7XG4gICAgICAgIHggLT0geE9yaWdpbiAtICh4T3JpZ2luICogYSArIHlPcmlnaW4gKiBjKTtcbiAgICAgICAgeSAtPSB5T3JpZ2luIC0gKHhPcmlnaW4gKiBiICsgeU9yaWdpbiAqIGQpO1xuICAgICAgfSAvLzNEIG1hdHJpeFxuXG4gICAgfSBlbHNlIHtcbiAgICAgIGEzMiA9IG1hdHJpeFs2XTtcbiAgICAgIGE0MiA9IG1hdHJpeFs3XTtcbiAgICAgIGExMyA9IG1hdHJpeFs4XTtcbiAgICAgIGEyMyA9IG1hdHJpeFs5XTtcbiAgICAgIGEzMyA9IG1hdHJpeFsxMF07XG4gICAgICBhNDMgPSBtYXRyaXhbMTFdO1xuICAgICAgeCA9IG1hdHJpeFsxMl07XG4gICAgICB5ID0gbWF0cml4WzEzXTtcbiAgICAgIHogPSBtYXRyaXhbMTRdO1xuICAgICAgYW5nbGUgPSBfYXRhbjIoYTMyLCBhMzMpO1xuICAgICAgcm90YXRpb25YID0gYW5nbGUgKiBfUkFEMkRFRzsgLy9yb3RhdGlvblhcblxuICAgICAgaWYgKGFuZ2xlKSB7XG4gICAgICAgIGNvcyA9IE1hdGguY29zKC1hbmdsZSk7XG4gICAgICAgIHNpbiA9IE1hdGguc2luKC1hbmdsZSk7XG4gICAgICAgIHQxID0gYTEyICogY29zICsgYTEzICogc2luO1xuICAgICAgICB0MiA9IGEyMiAqIGNvcyArIGEyMyAqIHNpbjtcbiAgICAgICAgdDMgPSBhMzIgKiBjb3MgKyBhMzMgKiBzaW47XG4gICAgICAgIGExMyA9IGExMiAqIC1zaW4gKyBhMTMgKiBjb3M7XG4gICAgICAgIGEyMyA9IGEyMiAqIC1zaW4gKyBhMjMgKiBjb3M7XG4gICAgICAgIGEzMyA9IGEzMiAqIC1zaW4gKyBhMzMgKiBjb3M7XG4gICAgICAgIGE0MyA9IGE0MiAqIC1zaW4gKyBhNDMgKiBjb3M7XG4gICAgICAgIGExMiA9IHQxO1xuICAgICAgICBhMjIgPSB0MjtcbiAgICAgICAgYTMyID0gdDM7XG4gICAgICB9IC8vcm90YXRpb25ZXG5cblxuICAgICAgYW5nbGUgPSBfYXRhbjIoLWMsIGEzMyk7XG4gICAgICByb3RhdGlvblkgPSBhbmdsZSAqIF9SQUQyREVHO1xuXG4gICAgICBpZiAoYW5nbGUpIHtcbiAgICAgICAgY29zID0gTWF0aC5jb3MoLWFuZ2xlKTtcbiAgICAgICAgc2luID0gTWF0aC5zaW4oLWFuZ2xlKTtcbiAgICAgICAgdDEgPSBhICogY29zIC0gYTEzICogc2luO1xuICAgICAgICB0MiA9IGIgKiBjb3MgLSBhMjMgKiBzaW47XG4gICAgICAgIHQzID0gYyAqIGNvcyAtIGEzMyAqIHNpbjtcbiAgICAgICAgYTQzID0gZCAqIHNpbiArIGE0MyAqIGNvcztcbiAgICAgICAgYSA9IHQxO1xuICAgICAgICBiID0gdDI7XG4gICAgICAgIGMgPSB0MztcbiAgICAgIH0gLy9yb3RhdGlvblpcblxuXG4gICAgICBhbmdsZSA9IF9hdGFuMihiLCBhKTtcbiAgICAgIHJvdGF0aW9uID0gYW5nbGUgKiBfUkFEMkRFRztcblxuICAgICAgaWYgKGFuZ2xlKSB7XG4gICAgICAgIGNvcyA9IE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgc2luID0gTWF0aC5zaW4oYW5nbGUpO1xuICAgICAgICB0MSA9IGEgKiBjb3MgKyBiICogc2luO1xuICAgICAgICB0MiA9IGExMiAqIGNvcyArIGEyMiAqIHNpbjtcbiAgICAgICAgYiA9IGIgKiBjb3MgLSBhICogc2luO1xuICAgICAgICBhMjIgPSBhMjIgKiBjb3MgLSBhMTIgKiBzaW47XG4gICAgICAgIGEgPSB0MTtcbiAgICAgICAgYTEyID0gdDI7XG4gICAgICB9XG5cbiAgICAgIGlmIChyb3RhdGlvblggJiYgTWF0aC5hYnMocm90YXRpb25YKSArIE1hdGguYWJzKHJvdGF0aW9uKSA+IDM1OS45KSB7XG4gICAgICAgIC8vd2hlbiByb3RhdGlvblkgaXMgc2V0LCBpdCB3aWxsIG9mdGVuIGJlIHBhcnNlZCBhcyAxODAgZGVncmVlcyBkaWZmZXJlbnQgdGhhbiBpdCBzaG91bGQgYmUsIGFuZCByb3RhdGlvblggYW5kIHJvdGF0aW9uIGJvdGggYmVpbmcgMTgwIChpdCBsb29rcyB0aGUgc2FtZSksIHNvIHdlIGFkanVzdCBmb3IgdGhhdCBoZXJlLlxuICAgICAgICByb3RhdGlvblggPSByb3RhdGlvbiA9IDA7XG4gICAgICAgIHJvdGF0aW9uWSA9IDE4MCAtIHJvdGF0aW9uWTtcbiAgICAgIH1cblxuICAgICAgc2NhbGVYID0gX3JvdW5kKE1hdGguc3FydChhICogYSArIGIgKiBiICsgYyAqIGMpKTtcbiAgICAgIHNjYWxlWSA9IF9yb3VuZChNYXRoLnNxcnQoYTIyICogYTIyICsgYTMyICogYTMyKSk7XG4gICAgICBhbmdsZSA9IF9hdGFuMihhMTIsIGEyMik7XG4gICAgICBza2V3WCA9IE1hdGguYWJzKGFuZ2xlKSA+IDAuMDAwMiA/IGFuZ2xlICogX1JBRDJERUcgOiAwO1xuICAgICAgcGVyc3BlY3RpdmUgPSBhNDMgPyAxIC8gKGE0MyA8IDAgPyAtYTQzIDogYTQzKSA6IDA7XG4gICAgfVxuXG4gICAgaWYgKGNhY2hlLnN2Zykge1xuICAgICAgLy9zZW5zZSBpZiB0aGVyZSBhcmUgQ1NTIHRyYW5zZm9ybXMgYXBwbGllZCBvbiBhbiBTVkcgZWxlbWVudCBpbiB3aGljaCBjYXNlIHdlIG11c3Qgb3ZlcndyaXRlIHRoZW0gd2hlbiByZW5kZXJpbmcuIFRoZSB0cmFuc2Zvcm0gYXR0cmlidXRlIGlzIG1vcmUgcmVsaWFibGUgY3Jvc3MtYnJvd3NlciwgYnV0IHdlIGNhbid0IGp1c3QgcmVtb3ZlIHRoZSBDU1Mgb25lcyBiZWNhdXNlIHRoZXkgbWF5IGJlIGFwcGxpZWQgaW4gYSBDU1MgcnVsZSBzb21ld2hlcmUgKG5vdCBqdXN0IGlubGluZSkuXG4gICAgICB0MSA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIik7XG4gICAgICBjYWNoZS5mb3JjZUNTUyA9IHRhcmdldC5zZXRBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIiwgXCJcIikgfHwgIV9pc051bGxUcmFuc2Zvcm0oX2dldENvbXB1dGVkUHJvcGVydHkodGFyZ2V0LCBfdHJhbnNmb3JtUHJvcCkpO1xuICAgICAgdDEgJiYgdGFyZ2V0LnNldEF0dHJpYnV0ZShcInRyYW5zZm9ybVwiLCB0MSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKE1hdGguYWJzKHNrZXdYKSA+IDkwICYmIE1hdGguYWJzKHNrZXdYKSA8IDI3MCkge1xuICAgIGlmIChpbnZlcnRlZFNjYWxlWCkge1xuICAgICAgc2NhbGVYICo9IC0xO1xuICAgICAgc2tld1ggKz0gcm90YXRpb24gPD0gMCA/IDE4MCA6IC0xODA7XG4gICAgICByb3RhdGlvbiArPSByb3RhdGlvbiA8PSAwID8gMTgwIDogLTE4MDtcbiAgICB9IGVsc2Uge1xuICAgICAgc2NhbGVZICo9IC0xO1xuICAgICAgc2tld1ggKz0gc2tld1ggPD0gMCA/IDE4MCA6IC0xODA7XG4gICAgfVxuICB9XG5cbiAgdW5jYWNoZSA9IHVuY2FjaGUgfHwgY2FjaGUudW5jYWNoZTtcbiAgY2FjaGUueCA9IHggLSAoKGNhY2hlLnhQZXJjZW50ID0geCAmJiAoIXVuY2FjaGUgJiYgY2FjaGUueFBlcmNlbnQgfHwgKE1hdGgucm91bmQodGFyZ2V0Lm9mZnNldFdpZHRoIC8gMikgPT09IE1hdGgucm91bmQoLXgpID8gLTUwIDogMCkpKSA/IHRhcmdldC5vZmZzZXRXaWR0aCAqIGNhY2hlLnhQZXJjZW50IC8gMTAwIDogMCkgKyBweDtcbiAgY2FjaGUueSA9IHkgLSAoKGNhY2hlLnlQZXJjZW50ID0geSAmJiAoIXVuY2FjaGUgJiYgY2FjaGUueVBlcmNlbnQgfHwgKE1hdGgucm91bmQodGFyZ2V0Lm9mZnNldEhlaWdodCAvIDIpID09PSBNYXRoLnJvdW5kKC15KSA/IC01MCA6IDApKSkgPyB0YXJnZXQub2Zmc2V0SGVpZ2h0ICogY2FjaGUueVBlcmNlbnQgLyAxMDAgOiAwKSArIHB4O1xuICBjYWNoZS56ID0geiArIHB4O1xuICBjYWNoZS5zY2FsZVggPSBfcm91bmQoc2NhbGVYKTtcbiAgY2FjaGUuc2NhbGVZID0gX3JvdW5kKHNjYWxlWSk7XG4gIGNhY2hlLnJvdGF0aW9uID0gX3JvdW5kKHJvdGF0aW9uKSArIGRlZztcbiAgY2FjaGUucm90YXRpb25YID0gX3JvdW5kKHJvdGF0aW9uWCkgKyBkZWc7XG4gIGNhY2hlLnJvdGF0aW9uWSA9IF9yb3VuZChyb3RhdGlvblkpICsgZGVnO1xuICBjYWNoZS5za2V3WCA9IHNrZXdYICsgZGVnO1xuICBjYWNoZS5za2V3WSA9IHNrZXdZICsgZGVnO1xuICBjYWNoZS50cmFuc2Zvcm1QZXJzcGVjdGl2ZSA9IHBlcnNwZWN0aXZlICsgcHg7XG5cbiAgaWYgKGNhY2hlLnpPcmlnaW4gPSBwYXJzZUZsb2F0KG9yaWdpbi5zcGxpdChcIiBcIilbMl0pIHx8IDApIHtcbiAgICBzdHlsZVtfdHJhbnNmb3JtT3JpZ2luUHJvcF0gPSBfZmlyc3RUd29Pbmx5KG9yaWdpbik7XG4gIH1cblxuICBjYWNoZS54T2Zmc2V0ID0gY2FjaGUueU9mZnNldCA9IDA7XG4gIGNhY2hlLmZvcmNlM0QgPSBfY29uZmlnLmZvcmNlM0Q7XG4gIGNhY2hlLnJlbmRlclRyYW5zZm9ybSA9IGNhY2hlLnN2ZyA/IF9yZW5kZXJTVkdUcmFuc2Zvcm1zIDogX3N1cHBvcnRzM0QgPyBfcmVuZGVyQ1NTVHJhbnNmb3JtcyA6IF9yZW5kZXJOb24zRFRyYW5zZm9ybXM7XG4gIGNhY2hlLnVuY2FjaGUgPSAwO1xuICByZXR1cm4gY2FjaGU7XG59LFxuICAgIF9maXJzdFR3b09ubHkgPSBmdW5jdGlvbiBfZmlyc3RUd29Pbmx5KHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgPSB2YWx1ZS5zcGxpdChcIiBcIikpWzBdICsgXCIgXCIgKyB2YWx1ZVsxXTtcbn0sXG4gICAgLy9mb3IgaGFuZGxpbmcgdHJhbnNmb3JtT3JpZ2luIHZhbHVlcywgc3RyaXBwaW5nIG91dCB0aGUgM3JkIGRpbWVuc2lvblxuX2FkZFB4VHJhbnNsYXRlID0gZnVuY3Rpb24gX2FkZFB4VHJhbnNsYXRlKHRhcmdldCwgc3RhcnQsIHZhbHVlKSB7XG4gIHZhciB1bml0ID0gZ2V0VW5pdChzdGFydCk7XG4gIHJldHVybiBfcm91bmQocGFyc2VGbG9hdChzdGFydCkgKyBwYXJzZUZsb2F0KF9jb252ZXJ0VG9Vbml0KHRhcmdldCwgXCJ4XCIsIHZhbHVlICsgXCJweFwiLCB1bml0KSkpICsgdW5pdDtcbn0sXG4gICAgX3JlbmRlck5vbjNEVHJhbnNmb3JtcyA9IGZ1bmN0aW9uIF9yZW5kZXJOb24zRFRyYW5zZm9ybXMocmF0aW8sIGNhY2hlKSB7XG4gIGNhY2hlLnogPSBcIjBweFwiO1xuICBjYWNoZS5yb3RhdGlvblkgPSBjYWNoZS5yb3RhdGlvblggPSBcIjBkZWdcIjtcbiAgY2FjaGUuZm9yY2UzRCA9IDA7XG5cbiAgX3JlbmRlckNTU1RyYW5zZm9ybXMocmF0aW8sIGNhY2hlKTtcbn0sXG4gICAgX3plcm9EZWcgPSBcIjBkZWdcIixcbiAgICBfemVyb1B4ID0gXCIwcHhcIixcbiAgICBfZW5kUGFyZW50aGVzaXMgPSBcIikgXCIsXG4gICAgX3JlbmRlckNTU1RyYW5zZm9ybXMgPSBmdW5jdGlvbiBfcmVuZGVyQ1NTVHJhbnNmb3JtcyhyYXRpbywgY2FjaGUpIHtcbiAgdmFyIF9yZWYgPSBjYWNoZSB8fCB0aGlzLFxuICAgICAgeFBlcmNlbnQgPSBfcmVmLnhQZXJjZW50LFxuICAgICAgeVBlcmNlbnQgPSBfcmVmLnlQZXJjZW50LFxuICAgICAgeCA9IF9yZWYueCxcbiAgICAgIHkgPSBfcmVmLnksXG4gICAgICB6ID0gX3JlZi56LFxuICAgICAgcm90YXRpb24gPSBfcmVmLnJvdGF0aW9uLFxuICAgICAgcm90YXRpb25ZID0gX3JlZi5yb3RhdGlvblksXG4gICAgICByb3RhdGlvblggPSBfcmVmLnJvdGF0aW9uWCxcbiAgICAgIHNrZXdYID0gX3JlZi5za2V3WCxcbiAgICAgIHNrZXdZID0gX3JlZi5za2V3WSxcbiAgICAgIHNjYWxlWCA9IF9yZWYuc2NhbGVYLFxuICAgICAgc2NhbGVZID0gX3JlZi5zY2FsZVksXG4gICAgICB0cmFuc2Zvcm1QZXJzcGVjdGl2ZSA9IF9yZWYudHJhbnNmb3JtUGVyc3BlY3RpdmUsXG4gICAgICBmb3JjZTNEID0gX3JlZi5mb3JjZTNELFxuICAgICAgdGFyZ2V0ID0gX3JlZi50YXJnZXQsXG4gICAgICB6T3JpZ2luID0gX3JlZi56T3JpZ2luLFxuICAgICAgdHJhbnNmb3JtcyA9IFwiXCIsXG4gICAgICB1c2UzRCA9IGZvcmNlM0QgPT09IFwiYXV0b1wiICYmIHJhdGlvICYmIHJhdGlvICE9PSAxIHx8IGZvcmNlM0QgPT09IHRydWU7IC8vIFNhZmFyaSBoYXMgYSBidWcgdGhhdCBjYXVzZXMgaXQgbm90IHRvIHJlbmRlciAzRCB0cmFuc2Zvcm0tb3JpZ2luIHZhbHVlcyBwcm9wZXJseSwgc28gd2UgZm9yY2UgdGhlIHogb3JpZ2luIHRvIDAsIHJlY29yZCBpdCBpbiB0aGUgY2FjaGUsIGFuZCB0aGVuIGRvIHRoZSBtYXRoIGhlcmUgdG8gb2Zmc2V0IHRoZSB0cmFuc2xhdGUgdmFsdWVzIGFjY29yZGluZ2x5IChiYXNpY2FsbHkgZG8gdGhlIDNEIHRyYW5zZm9ybS1vcmlnaW4gcGFydCBtYW51YWxseSlcblxuXG4gIGlmICh6T3JpZ2luICYmIChyb3RhdGlvblggIT09IF96ZXJvRGVnIHx8IHJvdGF0aW9uWSAhPT0gX3plcm9EZWcpKSB7XG4gICAgdmFyIGFuZ2xlID0gcGFyc2VGbG9hdChyb3RhdGlvblkpICogX0RFRzJSQUQsXG4gICAgICAgIGExMyA9IE1hdGguc2luKGFuZ2xlKSxcbiAgICAgICAgYTMzID0gTWF0aC5jb3MoYW5nbGUpLFxuICAgICAgICBjb3M7XG5cbiAgICBhbmdsZSA9IHBhcnNlRmxvYXQocm90YXRpb25YKSAqIF9ERUcyUkFEO1xuICAgIGNvcyA9IE1hdGguY29zKGFuZ2xlKTtcbiAgICB4ID0gX2FkZFB4VHJhbnNsYXRlKHRhcmdldCwgeCwgYTEzICogY29zICogLXpPcmlnaW4pO1xuICAgIHkgPSBfYWRkUHhUcmFuc2xhdGUodGFyZ2V0LCB5LCAtTWF0aC5zaW4oYW5nbGUpICogLXpPcmlnaW4pO1xuICAgIHogPSBfYWRkUHhUcmFuc2xhdGUodGFyZ2V0LCB6LCBhMzMgKiBjb3MgKiAtek9yaWdpbiArIHpPcmlnaW4pO1xuICB9XG5cbiAgaWYgKHRyYW5zZm9ybVBlcnNwZWN0aXZlICE9PSBfemVyb1B4KSB7XG4gICAgdHJhbnNmb3JtcyArPSBcInBlcnNwZWN0aXZlKFwiICsgdHJhbnNmb3JtUGVyc3BlY3RpdmUgKyBfZW5kUGFyZW50aGVzaXM7XG4gIH1cblxuICBpZiAoeFBlcmNlbnQgfHwgeVBlcmNlbnQpIHtcbiAgICB0cmFuc2Zvcm1zICs9IFwidHJhbnNsYXRlKFwiICsgeFBlcmNlbnQgKyBcIiUsIFwiICsgeVBlcmNlbnQgKyBcIiUpIFwiO1xuICB9XG5cbiAgaWYgKHVzZTNEIHx8IHggIT09IF96ZXJvUHggfHwgeSAhPT0gX3plcm9QeCB8fCB6ICE9PSBfemVyb1B4KSB7XG4gICAgdHJhbnNmb3JtcyArPSB6ICE9PSBfemVyb1B4IHx8IHVzZTNEID8gXCJ0cmFuc2xhdGUzZChcIiArIHggKyBcIiwgXCIgKyB5ICsgXCIsIFwiICsgeiArIFwiKSBcIiA6IFwidHJhbnNsYXRlKFwiICsgeCArIFwiLCBcIiArIHkgKyBfZW5kUGFyZW50aGVzaXM7XG4gIH1cblxuICBpZiAocm90YXRpb24gIT09IF96ZXJvRGVnKSB7XG4gICAgdHJhbnNmb3JtcyArPSBcInJvdGF0ZShcIiArIHJvdGF0aW9uICsgX2VuZFBhcmVudGhlc2lzO1xuICB9XG5cbiAgaWYgKHJvdGF0aW9uWSAhPT0gX3plcm9EZWcpIHtcbiAgICB0cmFuc2Zvcm1zICs9IFwicm90YXRlWShcIiArIHJvdGF0aW9uWSArIF9lbmRQYXJlbnRoZXNpcztcbiAgfVxuXG4gIGlmIChyb3RhdGlvblggIT09IF96ZXJvRGVnKSB7XG4gICAgdHJhbnNmb3JtcyArPSBcInJvdGF0ZVgoXCIgKyByb3RhdGlvblggKyBfZW5kUGFyZW50aGVzaXM7XG4gIH1cblxuICBpZiAoc2tld1ggIT09IF96ZXJvRGVnIHx8IHNrZXdZICE9PSBfemVyb0RlZykge1xuICAgIHRyYW5zZm9ybXMgKz0gXCJza2V3KFwiICsgc2tld1ggKyBcIiwgXCIgKyBza2V3WSArIF9lbmRQYXJlbnRoZXNpcztcbiAgfVxuXG4gIGlmIChzY2FsZVggIT09IDEgfHwgc2NhbGVZICE9PSAxKSB7XG4gICAgdHJhbnNmb3JtcyArPSBcInNjYWxlKFwiICsgc2NhbGVYICsgXCIsIFwiICsgc2NhbGVZICsgX2VuZFBhcmVudGhlc2lzO1xuICB9XG5cbiAgdGFyZ2V0LnN0eWxlW190cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zZm9ybXMgfHwgXCJ0cmFuc2xhdGUoMCwgMClcIjtcbn0sXG4gICAgX3JlbmRlclNWR1RyYW5zZm9ybXMgPSBmdW5jdGlvbiBfcmVuZGVyU1ZHVHJhbnNmb3JtcyhyYXRpbywgY2FjaGUpIHtcbiAgdmFyIF9yZWYyID0gY2FjaGUgfHwgdGhpcyxcbiAgICAgIHhQZXJjZW50ID0gX3JlZjIueFBlcmNlbnQsXG4gICAgICB5UGVyY2VudCA9IF9yZWYyLnlQZXJjZW50LFxuICAgICAgeCA9IF9yZWYyLngsXG4gICAgICB5ID0gX3JlZjIueSxcbiAgICAgIHJvdGF0aW9uID0gX3JlZjIucm90YXRpb24sXG4gICAgICBza2V3WCA9IF9yZWYyLnNrZXdYLFxuICAgICAgc2tld1kgPSBfcmVmMi5za2V3WSxcbiAgICAgIHNjYWxlWCA9IF9yZWYyLnNjYWxlWCxcbiAgICAgIHNjYWxlWSA9IF9yZWYyLnNjYWxlWSxcbiAgICAgIHRhcmdldCA9IF9yZWYyLnRhcmdldCxcbiAgICAgIHhPcmlnaW4gPSBfcmVmMi54T3JpZ2luLFxuICAgICAgeU9yaWdpbiA9IF9yZWYyLnlPcmlnaW4sXG4gICAgICB4T2Zmc2V0ID0gX3JlZjIueE9mZnNldCxcbiAgICAgIHlPZmZzZXQgPSBfcmVmMi55T2Zmc2V0LFxuICAgICAgZm9yY2VDU1MgPSBfcmVmMi5mb3JjZUNTUyxcbiAgICAgIHR4ID0gcGFyc2VGbG9hdCh4KSxcbiAgICAgIHR5ID0gcGFyc2VGbG9hdCh5KSxcbiAgICAgIGExMSxcbiAgICAgIGEyMSxcbiAgICAgIGExMixcbiAgICAgIGEyMixcbiAgICAgIHRlbXA7XG5cbiAgcm90YXRpb24gPSBwYXJzZUZsb2F0KHJvdGF0aW9uKTtcbiAgc2tld1ggPSBwYXJzZUZsb2F0KHNrZXdYKTtcbiAgc2tld1kgPSBwYXJzZUZsb2F0KHNrZXdZKTtcblxuICBpZiAoc2tld1kpIHtcbiAgICAvL2ZvciBwZXJmb3JtYW5jZSByZWFzb25zLCB3ZSBjb21iaW5lIGFsbCBza2V3aW5nIGludG8gdGhlIHNrZXdYIGFuZCByb3RhdGlvbiB2YWx1ZXMuIFJlbWVtYmVyLCBhIHNrZXdZIG9mIDEwIGRlZ3JlZXMgbG9va3MgdGhlIHNhbWUgYXMgYSByb3RhdGlvbiBvZiAxMCBkZWdyZWVzIHBsdXMgYSBza2V3WCBvZiAxMCBkZWdyZWVzLlxuICAgIHNrZXdZID0gcGFyc2VGbG9hdChza2V3WSk7XG4gICAgc2tld1ggKz0gc2tld1k7XG4gICAgcm90YXRpb24gKz0gc2tld1k7XG4gIH1cblxuICBpZiAocm90YXRpb24gfHwgc2tld1gpIHtcbiAgICByb3RhdGlvbiAqPSBfREVHMlJBRDtcbiAgICBza2V3WCAqPSBfREVHMlJBRDtcbiAgICBhMTEgPSBNYXRoLmNvcyhyb3RhdGlvbikgKiBzY2FsZVg7XG4gICAgYTIxID0gTWF0aC5zaW4ocm90YXRpb24pICogc2NhbGVYO1xuICAgIGExMiA9IE1hdGguc2luKHJvdGF0aW9uIC0gc2tld1gpICogLXNjYWxlWTtcbiAgICBhMjIgPSBNYXRoLmNvcyhyb3RhdGlvbiAtIHNrZXdYKSAqIHNjYWxlWTtcblxuICAgIGlmIChza2V3WCkge1xuICAgICAgc2tld1kgKj0gX0RFRzJSQUQ7XG4gICAgICB0ZW1wID0gTWF0aC50YW4oc2tld1ggLSBza2V3WSk7XG4gICAgICB0ZW1wID0gTWF0aC5zcXJ0KDEgKyB0ZW1wICogdGVtcCk7XG4gICAgICBhMTIgKj0gdGVtcDtcbiAgICAgIGEyMiAqPSB0ZW1wO1xuXG4gICAgICBpZiAoc2tld1kpIHtcbiAgICAgICAgdGVtcCA9IE1hdGgudGFuKHNrZXdZKTtcbiAgICAgICAgdGVtcCA9IE1hdGguc3FydCgxICsgdGVtcCAqIHRlbXApO1xuICAgICAgICBhMTEgKj0gdGVtcDtcbiAgICAgICAgYTIxICo9IHRlbXA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYTExID0gX3JvdW5kKGExMSk7XG4gICAgYTIxID0gX3JvdW5kKGEyMSk7XG4gICAgYTEyID0gX3JvdW5kKGExMik7XG4gICAgYTIyID0gX3JvdW5kKGEyMik7XG4gIH0gZWxzZSB7XG4gICAgYTExID0gc2NhbGVYO1xuICAgIGEyMiA9IHNjYWxlWTtcbiAgICBhMjEgPSBhMTIgPSAwO1xuICB9XG5cbiAgaWYgKHR4ICYmICF+KHggKyBcIlwiKS5pbmRleE9mKFwicHhcIikgfHwgdHkgJiYgIX4oeSArIFwiXCIpLmluZGV4T2YoXCJweFwiKSkge1xuICAgIHR4ID0gX2NvbnZlcnRUb1VuaXQodGFyZ2V0LCBcInhcIiwgeCwgXCJweFwiKTtcbiAgICB0eSA9IF9jb252ZXJ0VG9Vbml0KHRhcmdldCwgXCJ5XCIsIHksIFwicHhcIik7XG4gIH1cblxuICBpZiAoeE9yaWdpbiB8fCB5T3JpZ2luIHx8IHhPZmZzZXQgfHwgeU9mZnNldCkge1xuICAgIHR4ID0gX3JvdW5kKHR4ICsgeE9yaWdpbiAtICh4T3JpZ2luICogYTExICsgeU9yaWdpbiAqIGExMikgKyB4T2Zmc2V0KTtcbiAgICB0eSA9IF9yb3VuZCh0eSArIHlPcmlnaW4gLSAoeE9yaWdpbiAqIGEyMSArIHlPcmlnaW4gKiBhMjIpICsgeU9mZnNldCk7XG4gIH1cblxuICBpZiAoeFBlcmNlbnQgfHwgeVBlcmNlbnQpIHtcbiAgICAvL1RoZSBTVkcgc3BlYyBkb2Vzbid0IHN1cHBvcnQgcGVyY2VudGFnZS1iYXNlZCB0cmFuc2xhdGlvbiBpbiB0aGUgXCJ0cmFuc2Zvcm1cIiBhdHRyaWJ1dGUsIHNvIHdlIG1lcmdlIGl0IGludG8gdGhlIHRyYW5zbGF0aW9uIHRvIHNpbXVsYXRlIGl0LlxuICAgIHRlbXAgPSB0YXJnZXQuZ2V0QkJveCgpO1xuICAgIHR4ID0gX3JvdW5kKHR4ICsgeFBlcmNlbnQgLyAxMDAgKiB0ZW1wLndpZHRoKTtcbiAgICB0eSA9IF9yb3VuZCh0eSArIHlQZXJjZW50IC8gMTAwICogdGVtcC5oZWlnaHQpO1xuICB9XG5cbiAgdGVtcCA9IFwibWF0cml4KFwiICsgYTExICsgXCIsXCIgKyBhMjEgKyBcIixcIiArIGExMiArIFwiLFwiICsgYTIyICsgXCIsXCIgKyB0eCArIFwiLFwiICsgdHkgKyBcIilcIjtcbiAgdGFyZ2V0LnNldEF0dHJpYnV0ZShcInRyYW5zZm9ybVwiLCB0ZW1wKTtcbiAgZm9yY2VDU1MgJiYgKHRhcmdldC5zdHlsZVtfdHJhbnNmb3JtUHJvcF0gPSB0ZW1wKTsgLy9zb21lIGJyb3dzZXJzIHByaW9yaXRpemUgQ1NTIHRyYW5zZm9ybXMgb3ZlciB0aGUgdHJhbnNmb3JtIGF0dHJpYnV0ZS4gV2hlbiB3ZSBzZW5zZSB0aGF0IHRoZSB1c2VyIGhhcyBDU1MgdHJhbnNmb3JtcyBhcHBsaWVkLCB3ZSBtdXN0IG92ZXJ3cml0ZSB0aGVtIHRoaXMgd2F5IChvdGhlcndpc2Ugc29tZSBicm93c2VyIHNpbXBseSB3b24ndCByZW5kZXIgdGhlIHRyYW5zZm9ybSBhdHRyaWJ1dGUgY2hhbmdlcyEpXG59LFxuICAgIF9hZGRSb3RhdGlvbmFsUHJvcFR3ZWVuID0gZnVuY3Rpb24gX2FkZFJvdGF0aW9uYWxQcm9wVHdlZW4ocGx1Z2luLCB0YXJnZXQsIHByb3BlcnR5LCBzdGFydE51bSwgZW5kVmFsdWUpIHtcbiAgdmFyIGNhcCA9IDM2MCxcbiAgICAgIGlzU3RyaW5nID0gX2lzU3RyaW5nKGVuZFZhbHVlKSxcbiAgICAgIGVuZE51bSA9IHBhcnNlRmxvYXQoZW5kVmFsdWUpICogKGlzU3RyaW5nICYmIH5lbmRWYWx1ZS5pbmRleE9mKFwicmFkXCIpID8gX1JBRDJERUcgOiAxKSxcbiAgICAgIGNoYW5nZSA9IGVuZE51bSAtIHN0YXJ0TnVtLFxuICAgICAgZmluYWxWYWx1ZSA9IHN0YXJ0TnVtICsgY2hhbmdlICsgXCJkZWdcIixcbiAgICAgIGRpcmVjdGlvbixcbiAgICAgIHB0O1xuXG4gIGlmIChpc1N0cmluZykge1xuICAgIGRpcmVjdGlvbiA9IGVuZFZhbHVlLnNwbGl0KFwiX1wiKVsxXTtcblxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwic2hvcnRcIikge1xuICAgICAgY2hhbmdlICU9IGNhcDtcblxuICAgICAgaWYgKGNoYW5nZSAhPT0gY2hhbmdlICUgKGNhcCAvIDIpKSB7XG4gICAgICAgIGNoYW5nZSArPSBjaGFuZ2UgPCAwID8gY2FwIDogLWNhcDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGlyZWN0aW9uID09PSBcImN3XCIgJiYgY2hhbmdlIDwgMCkge1xuICAgICAgY2hhbmdlID0gKGNoYW5nZSArIGNhcCAqIF9iaWdOdW0pICUgY2FwIC0gfn4oY2hhbmdlIC8gY2FwKSAqIGNhcDtcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJjY3dcIiAmJiBjaGFuZ2UgPiAwKSB7XG4gICAgICBjaGFuZ2UgPSAoY2hhbmdlIC0gY2FwICogX2JpZ051bSkgJSBjYXAgLSB+fihjaGFuZ2UgLyBjYXApICogY2FwO1xuICAgIH1cbiAgfVxuXG4gIHBsdWdpbi5fcHQgPSBwdCA9IG5ldyBQcm9wVHdlZW4ocGx1Z2luLl9wdCwgdGFyZ2V0LCBwcm9wZXJ0eSwgc3RhcnROdW0sIGNoYW5nZSwgX3JlbmRlclByb3BXaXRoRW5kKTtcbiAgcHQuZSA9IGZpbmFsVmFsdWU7XG4gIHB0LnUgPSBcImRlZ1wiO1xuXG4gIHBsdWdpbi5fcHJvcHMucHVzaChwcm9wZXJ0eSk7XG5cbiAgcmV0dXJuIHB0O1xufSxcbiAgICBfYXNzaWduID0gZnVuY3Rpb24gX2Fzc2lnbih0YXJnZXQsIHNvdXJjZSkge1xuICAvLyBJbnRlcm5ldCBFeHBsb3JlciBkb2Vzbid0IGhhdmUgT2JqZWN0LmFzc2lnbigpLCBzbyB3ZSByZWNyZWF0ZSBpdCBoZXJlLlxuICBmb3IgKHZhciBwIGluIHNvdXJjZSkge1xuICAgIHRhcmdldFtwXSA9IHNvdXJjZVtwXTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59LFxuICAgIF9hZGRSYXdUcmFuc2Zvcm1QVHMgPSBmdW5jdGlvbiBfYWRkUmF3VHJhbnNmb3JtUFRzKHBsdWdpbiwgdHJhbnNmb3JtcywgdGFyZ2V0KSB7XG4gIC8vZm9yIGhhbmRsaW5nIGNhc2VzIHdoZXJlIHNvbWVvbmUgcGFzc2VzIGluIGEgd2hvbGUgdHJhbnNmb3JtIHN0cmluZywgbGlrZSB0cmFuc2Zvcm06IFwic2NhbGUoMiwgMykgcm90YXRlKDIwZGVnKSB0cmFuc2xhdGVZKDMwZW0pXCJcbiAgdmFyIHN0YXJ0Q2FjaGUgPSBfYXNzaWduKHt9LCB0YXJnZXQuX2dzYXApLFxuICAgICAgZXhjbHVkZSA9IFwicGVyc3BlY3RpdmUsZm9yY2UzRCx0cmFuc2Zvcm1PcmlnaW4sc3ZnT3JpZ2luXCIsXG4gICAgICBzdHlsZSA9IHRhcmdldC5zdHlsZSxcbiAgICAgIGVuZENhY2hlLFxuICAgICAgcCxcbiAgICAgIHN0YXJ0VmFsdWUsXG4gICAgICBlbmRWYWx1ZSxcbiAgICAgIHN0YXJ0TnVtLFxuICAgICAgZW5kTnVtLFxuICAgICAgc3RhcnRVbml0LFxuICAgICAgZW5kVW5pdDtcblxuICBpZiAoc3RhcnRDYWNoZS5zdmcpIHtcbiAgICBzdGFydFZhbHVlID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcInRyYW5zZm9ybVwiKTtcbiAgICB0YXJnZXQuc2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIsIFwiXCIpO1xuICAgIHN0eWxlW190cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zZm9ybXM7XG4gICAgZW5kQ2FjaGUgPSBfcGFyc2VUcmFuc2Zvcm0odGFyZ2V0LCAxKTtcblxuICAgIF9yZW1vdmVQcm9wZXJ0eSh0YXJnZXQsIF90cmFuc2Zvcm1Qcm9wKTtcblxuICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIiwgc3RhcnRWYWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgc3RhcnRWYWx1ZSA9IGdldENvbXB1dGVkU3R5bGUodGFyZ2V0KVtfdHJhbnNmb3JtUHJvcF07XG4gICAgc3R5bGVbX3RyYW5zZm9ybVByb3BdID0gdHJhbnNmb3JtcztcbiAgICBlbmRDYWNoZSA9IF9wYXJzZVRyYW5zZm9ybSh0YXJnZXQsIDEpO1xuICAgIHN0eWxlW190cmFuc2Zvcm1Qcm9wXSA9IHN0YXJ0VmFsdWU7XG4gIH1cblxuICBmb3IgKHAgaW4gX3RyYW5zZm9ybVByb3BzKSB7XG4gICAgc3RhcnRWYWx1ZSA9IHN0YXJ0Q2FjaGVbcF07XG4gICAgZW5kVmFsdWUgPSBlbmRDYWNoZVtwXTtcblxuICAgIGlmIChzdGFydFZhbHVlICE9PSBlbmRWYWx1ZSAmJiBleGNsdWRlLmluZGV4T2YocCkgPCAwKSB7XG4gICAgICAvL3R3ZWVuaW5nIHRvIG5vIHBlcnNwZWN0aXZlIGdpdmVzIHZlcnkgdW5pbnR1aXRpdmUgcmVzdWx0cyAtIGp1c3Qga2VlcCB0aGUgc2FtZSBwZXJzcGVjdGl2ZSBpbiB0aGF0IGNhc2UuXG4gICAgICBzdGFydFVuaXQgPSBnZXRVbml0KHN0YXJ0VmFsdWUpO1xuICAgICAgZW5kVW5pdCA9IGdldFVuaXQoZW5kVmFsdWUpO1xuICAgICAgc3RhcnROdW0gPSBzdGFydFVuaXQgIT09IGVuZFVuaXQgPyBfY29udmVydFRvVW5pdCh0YXJnZXQsIHAsIHN0YXJ0VmFsdWUsIGVuZFVuaXQpIDogcGFyc2VGbG9hdChzdGFydFZhbHVlKTtcbiAgICAgIGVuZE51bSA9IHBhcnNlRmxvYXQoZW5kVmFsdWUpO1xuICAgICAgcGx1Z2luLl9wdCA9IG5ldyBQcm9wVHdlZW4ocGx1Z2luLl9wdCwgZW5kQ2FjaGUsIHAsIHN0YXJ0TnVtLCBlbmROdW0gLSBzdGFydE51bSwgX3JlbmRlckNTU1Byb3ApO1xuICAgICAgcGx1Z2luLl9wdC51ID0gZW5kVW5pdCB8fCAwO1xuXG4gICAgICBwbHVnaW4uX3Byb3BzLnB1c2gocCk7XG4gICAgfVxuICB9XG5cbiAgX2Fzc2lnbihlbmRDYWNoZSwgc3RhcnRDYWNoZSk7XG59OyAvLyBoYW5kbGUgc3BsaXR0aW5nIGFwYXJ0IHBhZGRpbmcsIG1hcmdpbiwgYm9yZGVyV2lkdGgsIGFuZCBib3JkZXJSYWRpdXMgaW50byB0aGVpciA0IGNvbXBvbmVudHMuIEZpcmVmb3gsIGZvciBleGFtcGxlLCB3b24ndCByZXBvcnQgYm9yZGVyUmFkaXVzIGNvcnJlY3RseSAtIGl0IHdpbGwgb25seSBkbyBib3JkZXJUb3BMZWZ0UmFkaXVzIGFuZCB0aGUgb3RoZXIgY29ybmVycy4gV2UgYWxzbyB3YW50IHRvIGhhbmRsZSBwYWRkaW5nVG9wLCBtYXJnaW5MZWZ0LCBib3JkZXJSaWdodFdpZHRoLCBldGMuXG5cblxuX2ZvckVhY2hOYW1lKFwicGFkZGluZyxtYXJnaW4sV2lkdGgsUmFkaXVzXCIsIGZ1bmN0aW9uIChuYW1lLCBpbmRleCkge1xuICB2YXIgdCA9IFwiVG9wXCIsXG4gICAgICByID0gXCJSaWdodFwiLFxuICAgICAgYiA9IFwiQm90dG9tXCIsXG4gICAgICBsID0gXCJMZWZ0XCIsXG4gICAgICBwcm9wcyA9IChpbmRleCA8IDMgPyBbdCwgciwgYiwgbF0gOiBbdCArIGwsIHQgKyByLCBiICsgciwgYiArIGxdKS5tYXAoZnVuY3Rpb24gKHNpZGUpIHtcbiAgICByZXR1cm4gaW5kZXggPCAyID8gbmFtZSArIHNpZGUgOiBcImJvcmRlclwiICsgc2lkZSArIG5hbWU7XG4gIH0pO1xuXG4gIF9zcGVjaWFsUHJvcHNbaW5kZXggPiAxID8gXCJib3JkZXJcIiArIG5hbWUgOiBuYW1lXSA9IGZ1bmN0aW9uIChwbHVnaW4sIHRhcmdldCwgcHJvcGVydHksIGVuZFZhbHVlLCB0d2Vlbikge1xuICAgIHZhciBhLCB2YXJzO1xuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCA0KSB7XG4gICAgICAvLyBnZXR0ZXIsIHBhc3NlZCB0YXJnZXQsIHByb3BlcnR5LCBhbmQgdW5pdCAoZnJvbSBfZ2V0KCkpXG4gICAgICBhID0gcHJvcHMubWFwKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgIHJldHVybiBfZ2V0KHBsdWdpbiwgcHJvcCwgcHJvcGVydHkpO1xuICAgICAgfSk7XG4gICAgICB2YXJzID0gYS5qb2luKFwiIFwiKTtcbiAgICAgIHJldHVybiB2YXJzLnNwbGl0KGFbMF0pLmxlbmd0aCA9PT0gNSA/IGFbMF0gOiB2YXJzO1xuICAgIH1cblxuICAgIGEgPSAoZW5kVmFsdWUgKyBcIlwiKS5zcGxpdChcIiBcIik7XG4gICAgdmFycyA9IHt9O1xuICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24gKHByb3AsIGkpIHtcbiAgICAgIHJldHVybiB2YXJzW3Byb3BdID0gYVtpXSA9IGFbaV0gfHwgYVsoaSAtIDEpIC8gMiB8IDBdO1xuICAgIH0pO1xuICAgIHBsdWdpbi5pbml0KHRhcmdldCwgdmFycywgdHdlZW4pO1xuICB9O1xufSk7XG5cbmV4cG9ydCB2YXIgQ1NTUGx1Z2luID0ge1xuICBuYW1lOiBcImNzc1wiLFxuICByZWdpc3RlcjogX2luaXRDb3JlLFxuICB0YXJnZXRUZXN0OiBmdW5jdGlvbiB0YXJnZXRUZXN0KHRhcmdldCkge1xuICAgIHJldHVybiB0YXJnZXQuc3R5bGUgJiYgdGFyZ2V0Lm5vZGVUeXBlO1xuICB9LFxuICBpbml0OiBmdW5jdGlvbiBpbml0KHRhcmdldCwgdmFycywgdHdlZW4sIGluZGV4LCB0YXJnZXRzKSB7XG4gICAgdmFyIHByb3BzID0gdGhpcy5fcHJvcHMsXG4gICAgICAgIHN0eWxlID0gdGFyZ2V0LnN0eWxlLFxuICAgICAgICBzdGFydEF0ID0gdHdlZW4udmFycy5zdGFydEF0LFxuICAgICAgICBzdGFydFZhbHVlLFxuICAgICAgICBlbmRWYWx1ZSxcbiAgICAgICAgZW5kTnVtLFxuICAgICAgICBzdGFydE51bSxcbiAgICAgICAgdHlwZSxcbiAgICAgICAgc3BlY2lhbFByb3AsXG4gICAgICAgIHAsXG4gICAgICAgIHN0YXJ0VW5pdCxcbiAgICAgICAgZW5kVW5pdCxcbiAgICAgICAgcmVsYXRpdmUsXG4gICAgICAgIGlzVHJhbnNmb3JtUmVsYXRlZCxcbiAgICAgICAgdHJhbnNmb3JtUHJvcFR3ZWVuLFxuICAgICAgICBjYWNoZSxcbiAgICAgICAgc21vb3RoLFxuICAgICAgICBoYXNQcmlvcml0eSxcbiAgICAgICAgaW5saW5lUHJvcHM7XG4gICAgX3BsdWdpbkluaXR0ZWQgfHwgX2luaXRDb3JlKCk7IC8vIHdlIG1heSBjYWxsIGluaXQoKSBtdWx0aXBsZSB0aW1lcyBvbiB0aGUgc2FtZSBwbHVnaW4gaW5zdGFuY2UsIGxpa2Ugd2hlbiBhZGRpbmcgc3BlY2lhbCBwcm9wZXJ0aWVzLCBzbyBtYWtlIHN1cmUgd2UgZG9uJ3Qgb3ZlcndyaXRlIHRoZSByZXZlcnQgZGF0YSBvciBpbmxpbmVQcm9wc1xuXG4gICAgdGhpcy5zdHlsZXMgPSB0aGlzLnN0eWxlcyB8fCBfZ2V0U3R5bGVTYXZlcih0YXJnZXQpO1xuICAgIGlubGluZVByb3BzID0gdGhpcy5zdHlsZXMucHJvcHM7XG4gICAgdGhpcy50d2VlbiA9IHR3ZWVuO1xuXG4gICAgZm9yIChwIGluIHZhcnMpIHtcbiAgICAgIGlmIChwID09PSBcImF1dG9Sb3VuZFwiKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBlbmRWYWx1ZSA9IHZhcnNbcF07XG5cbiAgICAgIGlmIChfcGx1Z2luc1twXSAmJiBfY2hlY2tQbHVnaW4ocCwgdmFycywgdHdlZW4sIGluZGV4LCB0YXJnZXQsIHRhcmdldHMpKSB7XG4gICAgICAgIC8vIHBsdWdpbnNcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHR5cGUgPSB0eXBlb2YgZW5kVmFsdWU7XG4gICAgICBzcGVjaWFsUHJvcCA9IF9zcGVjaWFsUHJvcHNbcF07XG5cbiAgICAgIGlmICh0eXBlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgZW5kVmFsdWUgPSBlbmRWYWx1ZS5jYWxsKHR3ZWVuLCBpbmRleCwgdGFyZ2V0LCB0YXJnZXRzKTtcbiAgICAgICAgdHlwZSA9IHR5cGVvZiBlbmRWYWx1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGUgPT09IFwic3RyaW5nXCIgJiYgfmVuZFZhbHVlLmluZGV4T2YoXCJyYW5kb20oXCIpKSB7XG4gICAgICAgIGVuZFZhbHVlID0gX3JlcGxhY2VSYW5kb20oZW5kVmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3BlY2lhbFByb3ApIHtcbiAgICAgICAgc3BlY2lhbFByb3AodGhpcywgdGFyZ2V0LCBwLCBlbmRWYWx1ZSwgdHdlZW4pICYmIChoYXNQcmlvcml0eSA9IDEpO1xuICAgICAgfSBlbHNlIGlmIChwLnN1YnN0cigwLCAyKSA9PT0gXCItLVwiKSB7XG4gICAgICAgIC8vQ1NTIHZhcmlhYmxlXG4gICAgICAgIHN0YXJ0VmFsdWUgPSAoZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXQpLmdldFByb3BlcnR5VmFsdWUocCkgKyBcIlwiKS50cmltKCk7XG4gICAgICAgIGVuZFZhbHVlICs9IFwiXCI7XG4gICAgICAgIF9jb2xvckV4cC5sYXN0SW5kZXggPSAwO1xuXG4gICAgICAgIGlmICghX2NvbG9yRXhwLnRlc3Qoc3RhcnRWYWx1ZSkpIHtcbiAgICAgICAgICAvLyBjb2xvcnMgZG9uJ3QgaGF2ZSB1bml0c1xuICAgICAgICAgIHN0YXJ0VW5pdCA9IGdldFVuaXQoc3RhcnRWYWx1ZSk7XG4gICAgICAgICAgZW5kVW5pdCA9IGdldFVuaXQoZW5kVmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZW5kVW5pdCA/IHN0YXJ0VW5pdCAhPT0gZW5kVW5pdCAmJiAoc3RhcnRWYWx1ZSA9IF9jb252ZXJ0VG9Vbml0KHRhcmdldCwgcCwgc3RhcnRWYWx1ZSwgZW5kVW5pdCkgKyBlbmRVbml0KSA6IHN0YXJ0VW5pdCAmJiAoZW5kVmFsdWUgKz0gc3RhcnRVbml0KTtcbiAgICAgICAgdGhpcy5hZGQoc3R5bGUsIFwic2V0UHJvcGVydHlcIiwgc3RhcnRWYWx1ZSwgZW5kVmFsdWUsIGluZGV4LCB0YXJnZXRzLCAwLCAwLCBwKTtcbiAgICAgICAgcHJvcHMucHVzaChwKTtcbiAgICAgICAgaW5saW5lUHJvcHMucHVzaChwLCAwLCBzdHlsZVtwXSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHN0YXJ0QXQgJiYgcCBpbiBzdGFydEF0KSB7XG4gICAgICAgICAgLy8gaW4gY2FzZSBzb21lb25lIGhhcmQtY29kZXMgYSBjb21wbGV4IHZhbHVlIGFzIHRoZSBzdGFydCwgbGlrZSB0b3A6IFwiY2FsYygydmggLyAyKVwiLiBXaXRob3V0IHRoaXMsIGl0J2QgdXNlIHRoZSBjb21wdXRlZCB2YWx1ZSAoYWx3YXlzIGluIHB4KVxuICAgICAgICAgIHN0YXJ0VmFsdWUgPSB0eXBlb2Ygc3RhcnRBdFtwXSA9PT0gXCJmdW5jdGlvblwiID8gc3RhcnRBdFtwXS5jYWxsKHR3ZWVuLCBpbmRleCwgdGFyZ2V0LCB0YXJnZXRzKSA6IHN0YXJ0QXRbcF07XG4gICAgICAgICAgX2lzU3RyaW5nKHN0YXJ0VmFsdWUpICYmIH5zdGFydFZhbHVlLmluZGV4T2YoXCJyYW5kb20oXCIpICYmIChzdGFydFZhbHVlID0gX3JlcGxhY2VSYW5kb20oc3RhcnRWYWx1ZSkpO1xuICAgICAgICAgIGdldFVuaXQoc3RhcnRWYWx1ZSArIFwiXCIpIHx8IChzdGFydFZhbHVlICs9IF9jb25maWcudW5pdHNbcF0gfHwgZ2V0VW5pdChfZ2V0KHRhcmdldCwgcCkpIHx8IFwiXCIpOyAvLyBmb3IgY2FzZXMgd2hlbiBzb21lb25lIHBhc3NlcyBpbiBhIHVuaXRsZXNzIHZhbHVlIGxpa2Uge3g6IDEwMH07IGlmIHdlIHRyeSBzZXR0aW5nIHRyYW5zbGF0ZSgxMDAsIDBweCkgaXQgd29uJ3Qgd29yay5cblxuICAgICAgICAgIChzdGFydFZhbHVlICsgXCJcIikuY2hhckF0KDEpID09PSBcIj1cIiAmJiAoc3RhcnRWYWx1ZSA9IF9nZXQodGFyZ2V0LCBwKSk7IC8vIGNhbid0IHdvcmsgd2l0aCByZWxhdGl2ZSB2YWx1ZXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdGFydFZhbHVlID0gX2dldCh0YXJnZXQsIHApO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnROdW0gPSBwYXJzZUZsb2F0KHN0YXJ0VmFsdWUpO1xuICAgICAgICByZWxhdGl2ZSA9IHR5cGUgPT09IFwic3RyaW5nXCIgJiYgZW5kVmFsdWUuY2hhckF0KDEpID09PSBcIj1cIiAmJiBlbmRWYWx1ZS5zdWJzdHIoMCwgMik7XG4gICAgICAgIHJlbGF0aXZlICYmIChlbmRWYWx1ZSA9IGVuZFZhbHVlLnN1YnN0cigyKSk7XG4gICAgICAgIGVuZE51bSA9IHBhcnNlRmxvYXQoZW5kVmFsdWUpO1xuXG4gICAgICAgIGlmIChwIGluIF9wcm9wZXJ0eUFsaWFzZXMpIHtcbiAgICAgICAgICBpZiAocCA9PT0gXCJhdXRvQWxwaGFcIikge1xuICAgICAgICAgICAgLy9zcGVjaWFsIGNhc2Ugd2hlcmUgd2UgY29udHJvbCB0aGUgdmlzaWJpbGl0eSBhbG9uZyB3aXRoIG9wYWNpdHkuIFdlIHN0aWxsIGFsbG93IHRoZSBvcGFjaXR5IHZhbHVlIHRvIHBhc3MgdGhyb3VnaCBhbmQgZ2V0IHR3ZWVuZWQuXG4gICAgICAgICAgICBpZiAoc3RhcnROdW0gPT09IDEgJiYgX2dldCh0YXJnZXQsIFwidmlzaWJpbGl0eVwiKSA9PT0gXCJoaWRkZW5cIiAmJiBlbmROdW0pIHtcbiAgICAgICAgICAgICAgLy9pZiB2aXNpYmlsaXR5IGlzIGluaXRpYWxseSBzZXQgdG8gXCJoaWRkZW5cIiwgd2Ugc2hvdWxkIGludGVycHJldCB0aGF0IGFzIGludGVudCB0byBtYWtlIG9wYWNpdHkgMCAoYSBjb252ZW5pZW5jZSlcbiAgICAgICAgICAgICAgc3RhcnROdW0gPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpbmxpbmVQcm9wcy5wdXNoKFwidmlzaWJpbGl0eVwiLCAwLCBzdHlsZS52aXNpYmlsaXR5KTtcblxuICAgICAgICAgICAgX2FkZE5vblR3ZWVuaW5nUFQodGhpcywgc3R5bGUsIFwidmlzaWJpbGl0eVwiLCBzdGFydE51bSA/IFwiaW5oZXJpdFwiIDogXCJoaWRkZW5cIiwgZW5kTnVtID8gXCJpbmhlcml0XCIgOiBcImhpZGRlblwiLCAhZW5kTnVtKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocCAhPT0gXCJzY2FsZVwiICYmIHAgIT09IFwidHJhbnNmb3JtXCIpIHtcbiAgICAgICAgICAgIHAgPSBfcHJvcGVydHlBbGlhc2VzW3BdO1xuICAgICAgICAgICAgfnAuaW5kZXhPZihcIixcIikgJiYgKHAgPSBwLnNwbGl0KFwiLFwiKVswXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaXNUcmFuc2Zvcm1SZWxhdGVkID0gcCBpbiBfdHJhbnNmb3JtUHJvcHM7IC8vLS0tIFRSQU5TRk9STS1SRUxBVEVEIC0tLVxuXG4gICAgICAgIGlmIChpc1RyYW5zZm9ybVJlbGF0ZWQpIHtcbiAgICAgICAgICB0aGlzLnN0eWxlcy5zYXZlKHApO1xuXG4gICAgICAgICAgaWYgKCF0cmFuc2Zvcm1Qcm9wVHdlZW4pIHtcbiAgICAgICAgICAgIGNhY2hlID0gdGFyZ2V0Ll9nc2FwO1xuICAgICAgICAgICAgY2FjaGUucmVuZGVyVHJhbnNmb3JtICYmICF2YXJzLnBhcnNlVHJhbnNmb3JtIHx8IF9wYXJzZVRyYW5zZm9ybSh0YXJnZXQsIHZhcnMucGFyc2VUcmFuc2Zvcm0pOyAvLyBpZiwgZm9yIGV4YW1wbGUsIGdzYXAuc2V0KC4uLiB7dHJhbnNmb3JtOlwidHJhbnNsYXRlWCg1MHZ3KVwifSksIHRoZSBfZ2V0KCkgY2FsbCBkb2Vzbid0IHBhcnNlIHRoZSB0cmFuc2Zvcm0sIHRodXMgY2FjaGUucmVuZGVyVHJhbnNmb3JtIHdvbid0IGJlIHNldCB5ZXQgc28gZm9yY2UgdGhlIHBhcnNpbmcgb2YgdGhlIHRyYW5zZm9ybSBoZXJlLlxuXG4gICAgICAgICAgICBzbW9vdGggPSB2YXJzLnNtb290aE9yaWdpbiAhPT0gZmFsc2UgJiYgY2FjaGUuc21vb3RoO1xuICAgICAgICAgICAgdHJhbnNmb3JtUHJvcFR3ZWVuID0gdGhpcy5fcHQgPSBuZXcgUHJvcFR3ZWVuKHRoaXMuX3B0LCBzdHlsZSwgX3RyYW5zZm9ybVByb3AsIDAsIDEsIGNhY2hlLnJlbmRlclRyYW5zZm9ybSwgY2FjaGUsIDAsIC0xKTsgLy90aGUgZmlyc3QgdGltZSB0aHJvdWdoLCBjcmVhdGUgdGhlIHJlbmRlcmluZyBQcm9wVHdlZW4gc28gdGhhdCBpdCBydW5zIExBU1QgKGluIHRoZSBsaW5rZWQgbGlzdCwgd2Uga2VlcCBhZGRpbmcgdG8gdGhlIGJlZ2lubmluZylcblxuICAgICAgICAgICAgdHJhbnNmb3JtUHJvcFR3ZWVuLmRlcCA9IDE7IC8vZmxhZyBpdCBhcyBkZXBlbmRlbnQgc28gdGhhdCBpZiB0aGluZ3MgZ2V0IGtpbGxlZC9vdmVyd3JpdHRlbiBhbmQgdGhpcyBpcyB0aGUgb25seSBQcm9wVHdlZW4gbGVmdCwgd2UgY2FuIHNhZmVseSBraWxsIHRoZSB3aG9sZSB0d2Vlbi5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocCA9PT0gXCJzY2FsZVwiKSB7XG4gICAgICAgICAgICB0aGlzLl9wdCA9IG5ldyBQcm9wVHdlZW4odGhpcy5fcHQsIGNhY2hlLCBcInNjYWxlWVwiLCBjYWNoZS5zY2FsZVksIChyZWxhdGl2ZSA/IF9wYXJzZVJlbGF0aXZlKGNhY2hlLnNjYWxlWSwgcmVsYXRpdmUgKyBlbmROdW0pIDogZW5kTnVtKSAtIGNhY2hlLnNjYWxlWSB8fCAwLCBfcmVuZGVyQ1NTUHJvcCk7XG4gICAgICAgICAgICB0aGlzLl9wdC51ID0gMDtcbiAgICAgICAgICAgIHByb3BzLnB1c2goXCJzY2FsZVlcIiwgcCk7XG4gICAgICAgICAgICBwICs9IFwiWFwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAocCA9PT0gXCJ0cmFuc2Zvcm1PcmlnaW5cIikge1xuICAgICAgICAgICAgaW5saW5lUHJvcHMucHVzaChfdHJhbnNmb3JtT3JpZ2luUHJvcCwgMCwgc3R5bGVbX3RyYW5zZm9ybU9yaWdpblByb3BdKTtcbiAgICAgICAgICAgIGVuZFZhbHVlID0gX2NvbnZlcnRLZXl3b3Jkc1RvUGVyY2VudGFnZXMoZW5kVmFsdWUpOyAvL2luIGNhc2Ugc29tZXRoaW5nIGxpa2UgXCJsZWZ0IHRvcFwiIG9yIFwiYm90dG9tIHJpZ2h0XCIgaXMgcGFzc2VkIGluLiBDb252ZXJ0IHRvIHBlcmNlbnRhZ2VzLlxuXG4gICAgICAgICAgICBpZiAoY2FjaGUuc3ZnKSB7XG4gICAgICAgICAgICAgIF9hcHBseVNWR09yaWdpbih0YXJnZXQsIGVuZFZhbHVlLCAwLCBzbW9vdGgsIDAsIHRoaXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZW5kVW5pdCA9IHBhcnNlRmxvYXQoZW5kVmFsdWUuc3BsaXQoXCIgXCIpWzJdKSB8fCAwOyAvL2hhbmRsZSB0aGUgek9yaWdpbiBzZXBhcmF0ZWx5IVxuXG4gICAgICAgICAgICAgIGVuZFVuaXQgIT09IGNhY2hlLnpPcmlnaW4gJiYgX2FkZE5vblR3ZWVuaW5nUFQodGhpcywgY2FjaGUsIFwiek9yaWdpblwiLCBjYWNoZS56T3JpZ2luLCBlbmRVbml0KTtcblxuICAgICAgICAgICAgICBfYWRkTm9uVHdlZW5pbmdQVCh0aGlzLCBzdHlsZSwgcCwgX2ZpcnN0VHdvT25seShzdGFydFZhbHVlKSwgX2ZpcnN0VHdvT25seShlbmRWYWx1ZSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHAgPT09IFwic3ZnT3JpZ2luXCIpIHtcbiAgICAgICAgICAgIF9hcHBseVNWR09yaWdpbih0YXJnZXQsIGVuZFZhbHVlLCAxLCBzbW9vdGgsIDAsIHRoaXMpO1xuXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHAgaW4gX3JvdGF0aW9uYWxQcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICBfYWRkUm90YXRpb25hbFByb3BUd2Vlbih0aGlzLCBjYWNoZSwgcCwgc3RhcnROdW0sIHJlbGF0aXZlID8gX3BhcnNlUmVsYXRpdmUoc3RhcnROdW0sIHJlbGF0aXZlICsgZW5kVmFsdWUpIDogZW5kVmFsdWUpO1xuXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHAgPT09IFwic21vb3RoT3JpZ2luXCIpIHtcbiAgICAgICAgICAgIF9hZGROb25Ud2VlbmluZ1BUKHRoaXMsIGNhY2hlLCBcInNtb290aFwiLCBjYWNoZS5zbW9vdGgsIGVuZFZhbHVlKTtcblxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChwID09PSBcImZvcmNlM0RcIikge1xuICAgICAgICAgICAgY2FjaGVbcF0gPSBlbmRWYWx1ZTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAocCA9PT0gXCJ0cmFuc2Zvcm1cIikge1xuICAgICAgICAgICAgX2FkZFJhd1RyYW5zZm9ybVBUcyh0aGlzLCBlbmRWYWx1ZSwgdGFyZ2V0KTtcblxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCEocCBpbiBzdHlsZSkpIHtcbiAgICAgICAgICBwID0gX2NoZWNrUHJvcFByZWZpeChwKSB8fCBwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzVHJhbnNmb3JtUmVsYXRlZCB8fCAoZW5kTnVtIHx8IGVuZE51bSA9PT0gMCkgJiYgKHN0YXJ0TnVtIHx8IHN0YXJ0TnVtID09PSAwKSAmJiAhX2NvbXBsZXhFeHAudGVzdChlbmRWYWx1ZSkgJiYgcCBpbiBzdHlsZSkge1xuICAgICAgICAgIHN0YXJ0VW5pdCA9IChzdGFydFZhbHVlICsgXCJcIikuc3Vic3RyKChzdGFydE51bSArIFwiXCIpLmxlbmd0aCk7XG4gICAgICAgICAgZW5kTnVtIHx8IChlbmROdW0gPSAwKTsgLy8gcHJvdGVjdCBhZ2FpbnN0IE5hTlxuXG4gICAgICAgICAgZW5kVW5pdCA9IGdldFVuaXQoZW5kVmFsdWUpIHx8IChwIGluIF9jb25maWcudW5pdHMgPyBfY29uZmlnLnVuaXRzW3BdIDogc3RhcnRVbml0KTtcbiAgICAgICAgICBzdGFydFVuaXQgIT09IGVuZFVuaXQgJiYgKHN0YXJ0TnVtID0gX2NvbnZlcnRUb1VuaXQodGFyZ2V0LCBwLCBzdGFydFZhbHVlLCBlbmRVbml0KSk7XG4gICAgICAgICAgdGhpcy5fcHQgPSBuZXcgUHJvcFR3ZWVuKHRoaXMuX3B0LCBpc1RyYW5zZm9ybVJlbGF0ZWQgPyBjYWNoZSA6IHN0eWxlLCBwLCBzdGFydE51bSwgKHJlbGF0aXZlID8gX3BhcnNlUmVsYXRpdmUoc3RhcnROdW0sIHJlbGF0aXZlICsgZW5kTnVtKSA6IGVuZE51bSkgLSBzdGFydE51bSwgIWlzVHJhbnNmb3JtUmVsYXRlZCAmJiAoZW5kVW5pdCA9PT0gXCJweFwiIHx8IHAgPT09IFwiekluZGV4XCIpICYmIHZhcnMuYXV0b1JvdW5kICE9PSBmYWxzZSA/IF9yZW5kZXJSb3VuZGVkQ1NTUHJvcCA6IF9yZW5kZXJDU1NQcm9wKTtcbiAgICAgICAgICB0aGlzLl9wdC51ID0gZW5kVW5pdCB8fCAwO1xuXG4gICAgICAgICAgaWYgKHN0YXJ0VW5pdCAhPT0gZW5kVW5pdCAmJiBlbmRVbml0ICE9PSBcIiVcIikge1xuICAgICAgICAgICAgLy93aGVuIHRoZSB0d2VlbiBnb2VzIGFsbCB0aGUgd2F5IGJhY2sgdG8gdGhlIGJlZ2lubmluZywgd2UgbmVlZCB0byByZXZlcnQgaXQgdG8gdGhlIE9MRC9PUklHSU5BTCB2YWx1ZSAod2l0aCB0aG9zZSB1bml0cykuIFdlIHJlY29yZCB0aGF0IGFzIGEgXCJiXCIgKGJlZ2lubmluZykgcHJvcGVydHkgYW5kIHBvaW50IHRvIGEgcmVuZGVyIG1ldGhvZCB0aGF0IGhhbmRsZXMgdGhhdC4gKHBlcmZvcm1hbmNlIG9wdGltaXphdGlvbilcbiAgICAgICAgICAgIHRoaXMuX3B0LmIgPSBzdGFydFZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fcHQuciA9IF9yZW5kZXJDU1NQcm9wV2l0aEJlZ2lubmluZztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIShwIGluIHN0eWxlKSkge1xuICAgICAgICAgIGlmIChwIGluIHRhcmdldCkge1xuICAgICAgICAgICAgLy9tYXliZSBpdCdzIG5vdCBhIHN0eWxlIC0gaXQgY291bGQgYmUgYSBwcm9wZXJ0eSBhZGRlZCBkaXJlY3RseSB0byBhbiBlbGVtZW50IGluIHdoaWNoIGNhc2Ugd2UnbGwgdHJ5IHRvIGFuaW1hdGUgdGhhdC5cbiAgICAgICAgICAgIHRoaXMuYWRkKHRhcmdldCwgcCwgc3RhcnRWYWx1ZSB8fCB0YXJnZXRbcF0sIHJlbGF0aXZlID8gcmVsYXRpdmUgKyBlbmRWYWx1ZSA6IGVuZFZhbHVlLCBpbmRleCwgdGFyZ2V0cyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChwICE9PSBcInBhcnNlVHJhbnNmb3JtXCIpIHtcbiAgICAgICAgICAgIF9taXNzaW5nUGx1Z2luKHAsIGVuZFZhbHVlKTtcblxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90d2VlbkNvbXBsZXhDU1NTdHJpbmcuY2FsbCh0aGlzLCB0YXJnZXQsIHAsIHN0YXJ0VmFsdWUsIHJlbGF0aXZlID8gcmVsYXRpdmUgKyBlbmRWYWx1ZSA6IGVuZFZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlzVHJhbnNmb3JtUmVsYXRlZCB8fCAocCBpbiBzdHlsZSA/IGlubGluZVByb3BzLnB1c2gocCwgMCwgc3R5bGVbcF0pIDogaW5saW5lUHJvcHMucHVzaChwLCAxLCBzdGFydFZhbHVlIHx8IHRhcmdldFtwXSkpO1xuICAgICAgICBwcm9wcy5wdXNoKHApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGhhc1ByaW9yaXR5ICYmIF9zb3J0UHJvcFR3ZWVuc0J5UHJpb3JpdHkodGhpcyk7XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKHJhdGlvLCBkYXRhKSB7XG4gICAgaWYgKGRhdGEudHdlZW4uX3RpbWUgfHwgIV9yZXZlcnRpbmcoKSkge1xuICAgICAgdmFyIHB0ID0gZGF0YS5fcHQ7XG5cbiAgICAgIHdoaWxlIChwdCkge1xuICAgICAgICBwdC5yKHJhdGlvLCBwdC5kKTtcbiAgICAgICAgcHQgPSBwdC5fbmV4dDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YS5zdHlsZXMucmV2ZXJ0KCk7XG4gICAgfVxuICB9LFxuICBnZXQ6IF9nZXQsXG4gIGFsaWFzZXM6IF9wcm9wZXJ0eUFsaWFzZXMsXG4gIGdldFNldHRlcjogZnVuY3Rpb24gZ2V0U2V0dGVyKHRhcmdldCwgcHJvcGVydHksIHBsdWdpbikge1xuICAgIC8vcmV0dXJucyBhIHNldHRlciBmdW5jdGlvbiB0aGF0IGFjY2VwdHMgdGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUgYW5kIGFwcGxpZXMgaXQgYWNjb3JkaW5nbHkuIFJlbWVtYmVyLCBwcm9wZXJ0aWVzIGxpa2UgXCJ4XCIgYXJlbid0IGFzIHNpbXBsZSBhcyB0YXJnZXQuc3R5bGUucHJvcGVydHkgPSB2YWx1ZSBiZWNhdXNlIHRoZXkndmUgZ290IHRvIGJlIGFwcGxpZWQgdG8gYSBwcm94eSBvYmplY3QgYW5kIHRoZW4gbWVyZ2VkIGludG8gYSB0cmFuc2Zvcm0gc3RyaW5nIGluIGEgcmVuZGVyZXIuXG4gICAgdmFyIHAgPSBfcHJvcGVydHlBbGlhc2VzW3Byb3BlcnR5XTtcbiAgICBwICYmIHAuaW5kZXhPZihcIixcIikgPCAwICYmIChwcm9wZXJ0eSA9IHApO1xuICAgIHJldHVybiBwcm9wZXJ0eSBpbiBfdHJhbnNmb3JtUHJvcHMgJiYgcHJvcGVydHkgIT09IF90cmFuc2Zvcm1PcmlnaW5Qcm9wICYmICh0YXJnZXQuX2dzYXAueCB8fCBfZ2V0KHRhcmdldCwgXCJ4XCIpKSA/IHBsdWdpbiAmJiBfcmVjZW50U2V0dGVyUGx1Z2luID09PSBwbHVnaW4gPyBwcm9wZXJ0eSA9PT0gXCJzY2FsZVwiID8gX3NldHRlclNjYWxlIDogX3NldHRlclRyYW5zZm9ybSA6IChfcmVjZW50U2V0dGVyUGx1Z2luID0gcGx1Z2luIHx8IHt9KSAmJiAocHJvcGVydHkgPT09IFwic2NhbGVcIiA/IF9zZXR0ZXJTY2FsZVdpdGhSZW5kZXIgOiBfc2V0dGVyVHJhbnNmb3JtV2l0aFJlbmRlcikgOiB0YXJnZXQuc3R5bGUgJiYgIV9pc1VuZGVmaW5lZCh0YXJnZXQuc3R5bGVbcHJvcGVydHldKSA/IF9zZXR0ZXJDU1NTdHlsZSA6IH5wcm9wZXJ0eS5pbmRleE9mKFwiLVwiKSA/IF9zZXR0ZXJDU1NQcm9wIDogX2dldFNldHRlcih0YXJnZXQsIHByb3BlcnR5KTtcbiAgfSxcbiAgY29yZToge1xuICAgIF9yZW1vdmVQcm9wZXJ0eTogX3JlbW92ZVByb3BlcnR5LFxuICAgIF9nZXRNYXRyaXg6IF9nZXRNYXRyaXhcbiAgfVxufTtcbmdzYXAudXRpbHMuY2hlY2tQcmVmaXggPSBfY2hlY2tQcm9wUHJlZml4O1xuZ3NhcC5jb3JlLmdldFN0eWxlU2F2ZXIgPSBfZ2V0U3R5bGVTYXZlcjtcblxuKGZ1bmN0aW9uIChwb3NpdGlvbkFuZFNjYWxlLCByb3RhdGlvbiwgb3RoZXJzLCBhbGlhc2VzKSB7XG4gIHZhciBhbGwgPSBfZm9yRWFjaE5hbWUocG9zaXRpb25BbmRTY2FsZSArIFwiLFwiICsgcm90YXRpb24gKyBcIixcIiArIG90aGVycywgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBfdHJhbnNmb3JtUHJvcHNbbmFtZV0gPSAxO1xuICB9KTtcblxuICBfZm9yRWFjaE5hbWUocm90YXRpb24sIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgX2NvbmZpZy51bml0c1tuYW1lXSA9IFwiZGVnXCI7XG4gICAgX3JvdGF0aW9uYWxQcm9wZXJ0aWVzW25hbWVdID0gMTtcbiAgfSk7XG5cbiAgX3Byb3BlcnR5QWxpYXNlc1thbGxbMTNdXSA9IHBvc2l0aW9uQW5kU2NhbGUgKyBcIixcIiArIHJvdGF0aW9uO1xuXG4gIF9mb3JFYWNoTmFtZShhbGlhc2VzLCBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBzcGxpdCA9IG5hbWUuc3BsaXQoXCI6XCIpO1xuICAgIF9wcm9wZXJ0eUFsaWFzZXNbc3BsaXRbMV1dID0gYWxsW3NwbGl0WzBdXTtcbiAgfSk7XG59KShcIngseSx6LHNjYWxlLHNjYWxlWCxzY2FsZVkseFBlcmNlbnQseVBlcmNlbnRcIiwgXCJyb3RhdGlvbixyb3RhdGlvblgscm90YXRpb25ZLHNrZXdYLHNrZXdZXCIsIFwidHJhbnNmb3JtLHRyYW5zZm9ybU9yaWdpbixzdmdPcmlnaW4sZm9yY2UzRCxzbW9vdGhPcmlnaW4sdHJhbnNmb3JtUGVyc3BlY3RpdmVcIiwgXCIwOnRyYW5zbGF0ZVgsMTp0cmFuc2xhdGVZLDI6dHJhbnNsYXRlWiw4OnJvdGF0ZSw4OnJvdGF0aW9uWiw4OnJvdGF0ZVosOTpyb3RhdGVYLDEwOnJvdGF0ZVlcIik7XG5cbl9mb3JFYWNoTmFtZShcIngseSx6LHRvcCxyaWdodCxib3R0b20sbGVmdCx3aWR0aCxoZWlnaHQsZm9udFNpemUscGFkZGluZyxtYXJnaW4scGVyc3BlY3RpdmVcIiwgZnVuY3Rpb24gKG5hbWUpIHtcbiAgX2NvbmZpZy51bml0c1tuYW1lXSA9IFwicHhcIjtcbn0pO1xuXG5nc2FwLnJlZ2lzdGVyUGx1Z2luKENTU1BsdWdpbik7XG5leHBvcnQgeyBDU1NQbHVnaW4gYXMgZGVmYXVsdCwgX2dldEJCb3gsIF9jcmVhdGVFbGVtZW50LCBfY2hlY2tQcm9wUHJlZml4IGFzIGNoZWNrUHJlZml4IH07IiwiZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKiFcbiAqIEdTQVAgMy4xMi4xXG4gKiBodHRwczovL2dyZWVuc29jay5jb21cbiAqXG4gKiBAbGljZW5zZSBDb3B5cmlnaHQgMjAwOC0yMDIzLCBHcmVlblNvY2suIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBTdWJqZWN0IHRvIHRoZSB0ZXJtcyBhdCBodHRwczovL2dyZWVuc29jay5jb20vc3RhbmRhcmQtbGljZW5zZSBvciBmb3JcbiAqIENsdWIgR3JlZW5Tb2NrIG1lbWJlcnMsIHRoZSBhZ3JlZW1lbnQgaXNzdWVkIHdpdGggdGhhdCBtZW1iZXJzaGlwLlxuICogQGF1dGhvcjogSmFjayBEb3lsZSwgamFja0BncmVlbnNvY2suY29tXG4qL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xudmFyIF9jb25maWcgPSB7XG4gIGF1dG9TbGVlcDogMTIwLFxuICBmb3JjZTNEOiBcImF1dG9cIixcbiAgbnVsbFRhcmdldFdhcm46IDEsXG4gIHVuaXRzOiB7XG4gICAgbGluZUhlaWdodDogXCJcIlxuICB9XG59LFxuICAgIF9kZWZhdWx0cyA9IHtcbiAgZHVyYXRpb246IC41LFxuICBvdmVyd3JpdGU6IGZhbHNlLFxuICBkZWxheTogMFxufSxcbiAgICBfc3VwcHJlc3NPdmVyd3JpdGVzLFxuICAgIF9yZXZlcnRpbmcsXG4gICAgX2NvbnRleHQsXG4gICAgX2JpZ051bSA9IDFlOCxcbiAgICBfdGlueU51bSA9IDEgLyBfYmlnTnVtLFxuICAgIF8yUEkgPSBNYXRoLlBJICogMixcbiAgICBfSEFMRl9QSSA9IF8yUEkgLyA0LFxuICAgIF9nc0lEID0gMCxcbiAgICBfc3FydCA9IE1hdGguc3FydCxcbiAgICBfY29zID0gTWF0aC5jb3MsXG4gICAgX3NpbiA9IE1hdGguc2luLFxuICAgIF9pc1N0cmluZyA9IGZ1bmN0aW9uIF9pc1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufSxcbiAgICBfaXNGdW5jdGlvbiA9IGZ1bmN0aW9uIF9pc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIjtcbn0sXG4gICAgX2lzTnVtYmVyID0gZnVuY3Rpb24gX2lzTnVtYmVyKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG59LFxuICAgIF9pc1VuZGVmaW5lZCA9IGZ1bmN0aW9uIF9pc1VuZGVmaW5lZCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiO1xufSxcbiAgICBfaXNPYmplY3QgPSBmdW5jdGlvbiBfaXNPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIjtcbn0sXG4gICAgX2lzTm90RmFsc2UgPSBmdW5jdGlvbiBfaXNOb3RGYWxzZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IGZhbHNlO1xufSxcbiAgICBfd2luZG93RXhpc3RzID0gZnVuY3Rpb24gX3dpbmRvd0V4aXN0cygpIHtcbiAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI7XG59LFxuICAgIF9pc0Z1bmNPclN0cmluZyA9IGZ1bmN0aW9uIF9pc0Z1bmNPclN0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gX2lzRnVuY3Rpb24odmFsdWUpIHx8IF9pc1N0cmluZyh2YWx1ZSk7XG59LFxuICAgIF9pc1R5cGVkQXJyYXkgPSB0eXBlb2YgQXJyYXlCdWZmZXIgPT09IFwiZnVuY3Rpb25cIiAmJiBBcnJheUJ1ZmZlci5pc1ZpZXcgfHwgZnVuY3Rpb24gKCkge30sXG4gICAgLy8gbm90ZTogSUUxMCBoYXMgQXJyYXlCdWZmZXIsIGJ1dCBOT1QgQXJyYXlCdWZmZXIuaXNWaWV3KCkuXG5faXNBcnJheSA9IEFycmF5LmlzQXJyYXksXG4gICAgX3N0cmljdE51bUV4cCA9IC8oPzotP1xcLj9cXGR8XFwuKSsvZ2ksXG4gICAgLy9vbmx5IG51bWJlcnMgKGluY2x1ZGluZyBuZWdhdGl2ZXMgYW5kIGRlY2ltYWxzKSBidXQgTk9UIHJlbGF0aXZlIHZhbHVlcy5cbl9udW1FeHAgPSAvWy0rPS5dKlxcZCtbLmVcXC0rXSpcXGQqW2VcXC0rXSpcXGQqL2csXG4gICAgLy9maW5kcyBhbnkgbnVtYmVycywgaW5jbHVkaW5nIG9uZXMgdGhhdCBzdGFydCB3aXRoICs9IG9yIC09LCBuZWdhdGl2ZSBudW1iZXJzLCBhbmQgb25lcyBpbiBzY2llbnRpZmljIG5vdGF0aW9uIGxpa2UgMWUtOC5cbl9udW1XaXRoVW5pdEV4cCA9IC9bLSs9Ll0qXFxkK1suZS1dKlxcZCpbYS16JV0qL2csXG4gICAgX2NvbXBsZXhTdHJpbmdOdW1FeHAgPSAvWy0rPS5dKlxcZCtcXC4/XFxkKig/OmUtfGVcXCspP1xcZCovZ2ksXG4gICAgLy9kdXBsaWNhdGUgc28gdGhhdCB3aGlsZSB3ZSdyZSBsb29waW5nIHRocm91Z2ggbWF0Y2hlcyBmcm9tIGV4ZWMoKSwgaXQgZG9lc24ndCBjb250YW1pbmF0ZSB0aGUgbGFzdEluZGV4IG9mIF9udW1FeHAgd2hpY2ggd2UgdXNlIHRvIHNlYXJjaCBmb3IgY29sb3JzIHRvby5cbl9yZWxFeHAgPSAvWystXT0tP1suXFxkXSsvLFxuICAgIF9kZWxpbWl0ZWRWYWx1ZUV4cCA9IC9bXiwnXCJcXFtcXF1cXHNdKy9naSxcbiAgICAvLyBwcmV2aW91c2x5IC9bI1xcLSsuXSpcXGJbYS16XFxkXFwtPSslLl0rL2dpIGJ1dCBkaWRuJ3QgY2F0Y2ggc3BlY2lhbCBjaGFyYWN0ZXJzLlxuX3VuaXRFeHAgPSAvXlsrXFwtPWVcXHNcXGRdKlxcZCtbLlxcZF0qKFthLXpdKnwlKVxccyokL2ksXG4gICAgX2dsb2JhbFRpbWVsaW5lLFxuICAgIF93aW4sXG4gICAgX2NvcmVJbml0dGVkLFxuICAgIF9kb2MsXG4gICAgX2dsb2JhbHMgPSB7fSxcbiAgICBfaW5zdGFsbFNjb3BlID0ge30sXG4gICAgX2NvcmVSZWFkeSxcbiAgICBfaW5zdGFsbCA9IGZ1bmN0aW9uIF9pbnN0YWxsKHNjb3BlKSB7XG4gIHJldHVybiAoX2luc3RhbGxTY29wZSA9IF9tZXJnZShzY29wZSwgX2dsb2JhbHMpKSAmJiBnc2FwO1xufSxcbiAgICBfbWlzc2luZ1BsdWdpbiA9IGZ1bmN0aW9uIF9taXNzaW5nUGx1Z2luKHByb3BlcnR5LCB2YWx1ZSkge1xuICByZXR1cm4gY29uc29sZS53YXJuKFwiSW52YWxpZCBwcm9wZXJ0eVwiLCBwcm9wZXJ0eSwgXCJzZXQgdG9cIiwgdmFsdWUsIFwiTWlzc2luZyBwbHVnaW4/IGdzYXAucmVnaXN0ZXJQbHVnaW4oKVwiKTtcbn0sXG4gICAgX3dhcm4gPSBmdW5jdGlvbiBfd2FybihtZXNzYWdlLCBzdXBwcmVzcykge1xuICByZXR1cm4gIXN1cHByZXNzICYmIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbn0sXG4gICAgX2FkZEdsb2JhbCA9IGZ1bmN0aW9uIF9hZGRHbG9iYWwobmFtZSwgb2JqKSB7XG4gIHJldHVybiBuYW1lICYmIChfZ2xvYmFsc1tuYW1lXSA9IG9iaikgJiYgX2luc3RhbGxTY29wZSAmJiAoX2luc3RhbGxTY29wZVtuYW1lXSA9IG9iaikgfHwgX2dsb2JhbHM7XG59LFxuICAgIF9lbXB0eUZ1bmMgPSBmdW5jdGlvbiBfZW1wdHlGdW5jKCkge1xuICByZXR1cm4gMDtcbn0sXG4gICAgX3N0YXJ0QXRSZXZlcnRDb25maWcgPSB7XG4gIHN1cHByZXNzRXZlbnRzOiB0cnVlLFxuICBpc1N0YXJ0OiB0cnVlLFxuICBraWxsOiBmYWxzZVxufSxcbiAgICBfcmV2ZXJ0Q29uZmlnTm9LaWxsID0ge1xuICBzdXBwcmVzc0V2ZW50czogdHJ1ZSxcbiAga2lsbDogZmFsc2Vcbn0sXG4gICAgX3JldmVydENvbmZpZyA9IHtcbiAgc3VwcHJlc3NFdmVudHM6IHRydWVcbn0sXG4gICAgX3Jlc2VydmVkUHJvcHMgPSB7fSxcbiAgICBfbGF6eVR3ZWVucyA9IFtdLFxuICAgIF9sYXp5TG9va3VwID0ge30sXG4gICAgX2xhc3RSZW5kZXJlZEZyYW1lLFxuICAgIF9wbHVnaW5zID0ge30sXG4gICAgX2VmZmVjdHMgPSB7fSxcbiAgICBfbmV4dEdDRnJhbWUgPSAzMCxcbiAgICBfaGFybmVzc1BsdWdpbnMgPSBbXSxcbiAgICBfY2FsbGJhY2tOYW1lcyA9IFwiXCIsXG4gICAgX2hhcm5lc3MgPSBmdW5jdGlvbiBfaGFybmVzcyh0YXJnZXRzKSB7XG4gIHZhciB0YXJnZXQgPSB0YXJnZXRzWzBdLFxuICAgICAgaGFybmVzc1BsdWdpbixcbiAgICAgIGk7XG4gIF9pc09iamVjdCh0YXJnZXQpIHx8IF9pc0Z1bmN0aW9uKHRhcmdldCkgfHwgKHRhcmdldHMgPSBbdGFyZ2V0c10pO1xuXG4gIGlmICghKGhhcm5lc3NQbHVnaW4gPSAodGFyZ2V0Ll9nc2FwIHx8IHt9KS5oYXJuZXNzKSkge1xuICAgIC8vIGZpbmQgdGhlIGZpcnN0IHRhcmdldCB3aXRoIGEgaGFybmVzcy4gV2UgYXNzdW1lIHRhcmdldHMgcGFzc2VkIGludG8gYW4gYW5pbWF0aW9uIHdpbGwgYmUgb2Ygc2ltaWxhciB0eXBlLCBtZWFuaW5nIHRoZSBzYW1lIGtpbmQgb2YgaGFybmVzcyBjYW4gYmUgdXNlZCBmb3IgdGhlbSBhbGwgKHBlcmZvcm1hbmNlIG9wdGltaXphdGlvbilcbiAgICBpID0gX2hhcm5lc3NQbHVnaW5zLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0gJiYgIV9oYXJuZXNzUGx1Z2luc1tpXS50YXJnZXRUZXN0KHRhcmdldCkpIHt9XG5cbiAgICBoYXJuZXNzUGx1Z2luID0gX2hhcm5lc3NQbHVnaW5zW2ldO1xuICB9XG5cbiAgaSA9IHRhcmdldHMubGVuZ3RoO1xuXG4gIHdoaWxlIChpLS0pIHtcbiAgICB0YXJnZXRzW2ldICYmICh0YXJnZXRzW2ldLl9nc2FwIHx8ICh0YXJnZXRzW2ldLl9nc2FwID0gbmV3IEdTQ2FjaGUodGFyZ2V0c1tpXSwgaGFybmVzc1BsdWdpbikpKSB8fCB0YXJnZXRzLnNwbGljZShpLCAxKTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXRzO1xufSxcbiAgICBfZ2V0Q2FjaGUgPSBmdW5jdGlvbiBfZ2V0Q2FjaGUodGFyZ2V0KSB7XG4gIHJldHVybiB0YXJnZXQuX2dzYXAgfHwgX2hhcm5lc3ModG9BcnJheSh0YXJnZXQpKVswXS5fZ3NhcDtcbn0sXG4gICAgX2dldFByb3BlcnR5ID0gZnVuY3Rpb24gX2dldFByb3BlcnR5KHRhcmdldCwgcHJvcGVydHksIHYpIHtcbiAgcmV0dXJuICh2ID0gdGFyZ2V0W3Byb3BlcnR5XSkgJiYgX2lzRnVuY3Rpb24odikgPyB0YXJnZXRbcHJvcGVydHldKCkgOiBfaXNVbmRlZmluZWQodikgJiYgdGFyZ2V0LmdldEF0dHJpYnV0ZSAmJiB0YXJnZXQuZ2V0QXR0cmlidXRlKHByb3BlcnR5KSB8fCB2O1xufSxcbiAgICBfZm9yRWFjaE5hbWUgPSBmdW5jdGlvbiBfZm9yRWFjaE5hbWUobmFtZXMsIGZ1bmMpIHtcbiAgcmV0dXJuIChuYW1lcyA9IG5hbWVzLnNwbGl0KFwiLFwiKSkuZm9yRWFjaChmdW5jKSB8fCBuYW1lcztcbn0sXG4gICAgLy9zcGxpdCBhIGNvbW1hLWRlbGltaXRlZCBsaXN0IG9mIG5hbWVzIGludG8gYW4gYXJyYXksIHRoZW4gcnVuIGEgZm9yRWFjaCgpIGZ1bmN0aW9uIGFuZCByZXR1cm4gdGhlIHNwbGl0IGFycmF5ICh0aGlzIGlzIGp1c3QgYSB3YXkgdG8gY29uc29saWRhdGUvc2hvcnRlbiBzb21lIGNvZGUpLlxuX3JvdW5kID0gZnVuY3Rpb24gX3JvdW5kKHZhbHVlKSB7XG4gIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlICogMTAwMDAwKSAvIDEwMDAwMCB8fCAwO1xufSxcbiAgICBfcm91bmRQcmVjaXNlID0gZnVuY3Rpb24gX3JvdW5kUHJlY2lzZSh2YWx1ZSkge1xuICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIDEwMDAwMDAwKSAvIDEwMDAwMDAwIHx8IDA7XG59LFxuICAgIC8vIGluY3JlYXNlZCBwcmVjaXNpb24gbW9zdGx5IGZvciB0aW1pbmcgdmFsdWVzLlxuX3BhcnNlUmVsYXRpdmUgPSBmdW5jdGlvbiBfcGFyc2VSZWxhdGl2ZShzdGFydCwgdmFsdWUpIHtcbiAgdmFyIG9wZXJhdG9yID0gdmFsdWUuY2hhckF0KDApLFxuICAgICAgZW5kID0gcGFyc2VGbG9hdCh2YWx1ZS5zdWJzdHIoMikpO1xuICBzdGFydCA9IHBhcnNlRmxvYXQoc3RhcnQpO1xuICByZXR1cm4gb3BlcmF0b3IgPT09IFwiK1wiID8gc3RhcnQgKyBlbmQgOiBvcGVyYXRvciA9PT0gXCItXCIgPyBzdGFydCAtIGVuZCA6IG9wZXJhdG9yID09PSBcIipcIiA/IHN0YXJ0ICogZW5kIDogc3RhcnQgLyBlbmQ7XG59LFxuICAgIF9hcnJheUNvbnRhaW5zQW55ID0gZnVuY3Rpb24gX2FycmF5Q29udGFpbnNBbnkodG9TZWFyY2gsIHRvRmluZCkge1xuICAvL3NlYXJjaGVzIG9uZSBhcnJheSB0byBmaW5kIG1hdGNoZXMgZm9yIGFueSBvZiB0aGUgaXRlbXMgaW4gdGhlIHRvRmluZCBhcnJheS4gQXMgc29vbiBhcyBvbmUgaXMgZm91bmQsIGl0IHJldHVybnMgdHJ1ZS4gSXQgZG9lcyBOT1QgcmV0dXJuIGFsbCB0aGUgbWF0Y2hlczsgaXQncyBzaW1wbHkgYSBib29sZWFuIHNlYXJjaC5cbiAgdmFyIGwgPSB0b0ZpbmQubGVuZ3RoLFxuICAgICAgaSA9IDA7XG5cbiAgZm9yICg7IHRvU2VhcmNoLmluZGV4T2YodG9GaW5kW2ldKSA8IDAgJiYgKytpIDwgbDspIHt9XG5cbiAgcmV0dXJuIGkgPCBsO1xufSxcbiAgICBfbGF6eVJlbmRlciA9IGZ1bmN0aW9uIF9sYXp5UmVuZGVyKCkge1xuICB2YXIgbCA9IF9sYXp5VHdlZW5zLmxlbmd0aCxcbiAgICAgIGEgPSBfbGF6eVR3ZWVucy5zbGljZSgwKSxcbiAgICAgIGksXG4gICAgICB0d2VlbjtcblxuICBfbGF6eUxvb2t1cCA9IHt9O1xuICBfbGF6eVR3ZWVucy5sZW5ndGggPSAwO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICB0d2VlbiA9IGFbaV07XG4gICAgdHdlZW4gJiYgdHdlZW4uX2xhenkgJiYgKHR3ZWVuLnJlbmRlcih0d2Vlbi5fbGF6eVswXSwgdHdlZW4uX2xhenlbMV0sIHRydWUpLl9sYXp5ID0gMCk7XG4gIH1cbn0sXG4gICAgX2xhenlTYWZlUmVuZGVyID0gZnVuY3Rpb24gX2xhenlTYWZlUmVuZGVyKGFuaW1hdGlvbiwgdGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKSB7XG4gIF9sYXp5VHdlZW5zLmxlbmd0aCAmJiAhX3JldmVydGluZyAmJiBfbGF6eVJlbmRlcigpO1xuICBhbmltYXRpb24ucmVuZGVyKHRpbWUsIHN1cHByZXNzRXZlbnRzLCBmb3JjZSB8fCBfcmV2ZXJ0aW5nICYmIHRpbWUgPCAwICYmIChhbmltYXRpb24uX2luaXR0ZWQgfHwgYW5pbWF0aW9uLl9zdGFydEF0KSk7XG4gIF9sYXp5VHdlZW5zLmxlbmd0aCAmJiAhX3JldmVydGluZyAmJiBfbGF6eVJlbmRlcigpOyAvL2luIGNhc2UgcmVuZGVyaW5nIGNhdXNlZCBhbnkgdHdlZW5zIHRvIGxhenktaW5pdCwgd2Ugc2hvdWxkIHJlbmRlciB0aGVtIGJlY2F1c2UgdHlwaWNhbGx5IHdoZW4gc29tZW9uZSBjYWxscyBzZWVrKCkgb3IgdGltZSgpIG9yIHByb2dyZXNzKCksIHRoZXkgZXhwZWN0IGFuIGltbWVkaWF0ZSByZW5kZXIuXG59LFxuICAgIF9udW1lcmljSWZQb3NzaWJsZSA9IGZ1bmN0aW9uIF9udW1lcmljSWZQb3NzaWJsZSh2YWx1ZSkge1xuICB2YXIgbiA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICByZXR1cm4gKG4gfHwgbiA9PT0gMCkgJiYgKHZhbHVlICsgXCJcIikubWF0Y2goX2RlbGltaXRlZFZhbHVlRXhwKS5sZW5ndGggPCAyID8gbiA6IF9pc1N0cmluZyh2YWx1ZSkgPyB2YWx1ZS50cmltKCkgOiB2YWx1ZTtcbn0sXG4gICAgX3Bhc3NUaHJvdWdoID0gZnVuY3Rpb24gX3Bhc3NUaHJvdWdoKHApIHtcbiAgcmV0dXJuIHA7XG59LFxuICAgIF9zZXREZWZhdWx0cyA9IGZ1bmN0aW9uIF9zZXREZWZhdWx0cyhvYmosIGRlZmF1bHRzKSB7XG4gIGZvciAodmFyIHAgaW4gZGVmYXVsdHMpIHtcbiAgICBwIGluIG9iaiB8fCAob2JqW3BdID0gZGVmYXVsdHNbcF0pO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn0sXG4gICAgX3NldEtleWZyYW1lRGVmYXVsdHMgPSBmdW5jdGlvbiBfc2V0S2V5ZnJhbWVEZWZhdWx0cyhleGNsdWRlRHVyYXRpb24pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChvYmosIGRlZmF1bHRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBkZWZhdWx0cykge1xuICAgICAgcCBpbiBvYmogfHwgcCA9PT0gXCJkdXJhdGlvblwiICYmIGV4Y2x1ZGVEdXJhdGlvbiB8fCBwID09PSBcImVhc2VcIiB8fCAob2JqW3BdID0gZGVmYXVsdHNbcF0pO1xuICAgIH1cbiAgfTtcbn0sXG4gICAgX21lcmdlID0gZnVuY3Rpb24gX21lcmdlKGJhc2UsIHRvTWVyZ2UpIHtcbiAgZm9yICh2YXIgcCBpbiB0b01lcmdlKSB7XG4gICAgYmFzZVtwXSA9IHRvTWVyZ2VbcF07XG4gIH1cblxuICByZXR1cm4gYmFzZTtcbn0sXG4gICAgX21lcmdlRGVlcCA9IGZ1bmN0aW9uIF9tZXJnZURlZXAoYmFzZSwgdG9NZXJnZSkge1xuICBmb3IgKHZhciBwIGluIHRvTWVyZ2UpIHtcbiAgICBwICE9PSBcIl9fcHJvdG9fX1wiICYmIHAgIT09IFwiY29uc3RydWN0b3JcIiAmJiBwICE9PSBcInByb3RvdHlwZVwiICYmIChiYXNlW3BdID0gX2lzT2JqZWN0KHRvTWVyZ2VbcF0pID8gX21lcmdlRGVlcChiYXNlW3BdIHx8IChiYXNlW3BdID0ge30pLCB0b01lcmdlW3BdKSA6IHRvTWVyZ2VbcF0pO1xuICB9XG5cbiAgcmV0dXJuIGJhc2U7XG59LFxuICAgIF9jb3B5RXhjbHVkaW5nID0gZnVuY3Rpb24gX2NvcHlFeGNsdWRpbmcob2JqLCBleGNsdWRpbmcpIHtcbiAgdmFyIGNvcHkgPSB7fSxcbiAgICAgIHA7XG5cbiAgZm9yIChwIGluIG9iaikge1xuICAgIHAgaW4gZXhjbHVkaW5nIHx8IChjb3B5W3BdID0gb2JqW3BdKTtcbiAgfVxuXG4gIHJldHVybiBjb3B5O1xufSxcbiAgICBfaW5oZXJpdERlZmF1bHRzID0gZnVuY3Rpb24gX2luaGVyaXREZWZhdWx0cyh2YXJzKSB7XG4gIHZhciBwYXJlbnQgPSB2YXJzLnBhcmVudCB8fCBfZ2xvYmFsVGltZWxpbmUsXG4gICAgICBmdW5jID0gdmFycy5rZXlmcmFtZXMgPyBfc2V0S2V5ZnJhbWVEZWZhdWx0cyhfaXNBcnJheSh2YXJzLmtleWZyYW1lcykpIDogX3NldERlZmF1bHRzO1xuXG4gIGlmIChfaXNOb3RGYWxzZSh2YXJzLmluaGVyaXQpKSB7XG4gICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgZnVuYyh2YXJzLCBwYXJlbnQudmFycy5kZWZhdWx0cyk7XG4gICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50IHx8IHBhcmVudC5fZHA7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHZhcnM7XG59LFxuICAgIF9hcnJheXNNYXRjaCA9IGZ1bmN0aW9uIF9hcnJheXNNYXRjaChhMSwgYTIpIHtcbiAgdmFyIGkgPSBhMS5sZW5ndGgsXG4gICAgICBtYXRjaCA9IGkgPT09IGEyLmxlbmd0aDtcblxuICB3aGlsZSAobWF0Y2ggJiYgaS0tICYmIGExW2ldID09PSBhMltpXSkge31cblxuICByZXR1cm4gaSA8IDA7XG59LFxuICAgIF9hZGRMaW5rZWRMaXN0SXRlbSA9IGZ1bmN0aW9uIF9hZGRMaW5rZWRMaXN0SXRlbShwYXJlbnQsIGNoaWxkLCBmaXJzdFByb3AsIGxhc3RQcm9wLCBzb3J0QnkpIHtcbiAgaWYgKGZpcnN0UHJvcCA9PT0gdm9pZCAwKSB7XG4gICAgZmlyc3RQcm9wID0gXCJfZmlyc3RcIjtcbiAgfVxuXG4gIGlmIChsYXN0UHJvcCA9PT0gdm9pZCAwKSB7XG4gICAgbGFzdFByb3AgPSBcIl9sYXN0XCI7XG4gIH1cblxuICB2YXIgcHJldiA9IHBhcmVudFtsYXN0UHJvcF0sXG4gICAgICB0O1xuXG4gIGlmIChzb3J0QnkpIHtcbiAgICB0ID0gY2hpbGRbc29ydEJ5XTtcblxuICAgIHdoaWxlIChwcmV2ICYmIHByZXZbc29ydEJ5XSA+IHQpIHtcbiAgICAgIHByZXYgPSBwcmV2Ll9wcmV2O1xuICAgIH1cbiAgfVxuXG4gIGlmIChwcmV2KSB7XG4gICAgY2hpbGQuX25leHQgPSBwcmV2Ll9uZXh0O1xuICAgIHByZXYuX25leHQgPSBjaGlsZDtcbiAgfSBlbHNlIHtcbiAgICBjaGlsZC5fbmV4dCA9IHBhcmVudFtmaXJzdFByb3BdO1xuICAgIHBhcmVudFtmaXJzdFByb3BdID0gY2hpbGQ7XG4gIH1cblxuICBpZiAoY2hpbGQuX25leHQpIHtcbiAgICBjaGlsZC5fbmV4dC5fcHJldiA9IGNoaWxkO1xuICB9IGVsc2Uge1xuICAgIHBhcmVudFtsYXN0UHJvcF0gPSBjaGlsZDtcbiAgfVxuXG4gIGNoaWxkLl9wcmV2ID0gcHJldjtcbiAgY2hpbGQucGFyZW50ID0gY2hpbGQuX2RwID0gcGFyZW50O1xuICByZXR1cm4gY2hpbGQ7XG59LFxuICAgIF9yZW1vdmVMaW5rZWRMaXN0SXRlbSA9IGZ1bmN0aW9uIF9yZW1vdmVMaW5rZWRMaXN0SXRlbShwYXJlbnQsIGNoaWxkLCBmaXJzdFByb3AsIGxhc3RQcm9wKSB7XG4gIGlmIChmaXJzdFByb3AgPT09IHZvaWQgMCkge1xuICAgIGZpcnN0UHJvcCA9IFwiX2ZpcnN0XCI7XG4gIH1cblxuICBpZiAobGFzdFByb3AgPT09IHZvaWQgMCkge1xuICAgIGxhc3RQcm9wID0gXCJfbGFzdFwiO1xuICB9XG5cbiAgdmFyIHByZXYgPSBjaGlsZC5fcHJldixcbiAgICAgIG5leHQgPSBjaGlsZC5fbmV4dDtcblxuICBpZiAocHJldikge1xuICAgIHByZXYuX25leHQgPSBuZXh0O1xuICB9IGVsc2UgaWYgKHBhcmVudFtmaXJzdFByb3BdID09PSBjaGlsZCkge1xuICAgIHBhcmVudFtmaXJzdFByb3BdID0gbmV4dDtcbiAgfVxuXG4gIGlmIChuZXh0KSB7XG4gICAgbmV4dC5fcHJldiA9IHByZXY7XG4gIH0gZWxzZSBpZiAocGFyZW50W2xhc3RQcm9wXSA9PT0gY2hpbGQpIHtcbiAgICBwYXJlbnRbbGFzdFByb3BdID0gcHJldjtcbiAgfVxuXG4gIGNoaWxkLl9uZXh0ID0gY2hpbGQuX3ByZXYgPSBjaGlsZC5wYXJlbnQgPSBudWxsOyAvLyBkb24ndCBkZWxldGUgdGhlIF9kcCBqdXN0IHNvIHdlIGNhbiByZXZlcnQgaWYgbmVjZXNzYXJ5LiBCdXQgcGFyZW50IHNob3VsZCBiZSBudWxsIHRvIGluZGljYXRlIHRoZSBpdGVtIGlzbid0IGluIGEgbGlua2VkIGxpc3QuXG59LFxuICAgIF9yZW1vdmVGcm9tUGFyZW50ID0gZnVuY3Rpb24gX3JlbW92ZUZyb21QYXJlbnQoY2hpbGQsIG9ubHlJZlBhcmVudEhhc0F1dG9SZW1vdmUpIHtcbiAgY2hpbGQucGFyZW50ICYmICghb25seUlmUGFyZW50SGFzQXV0b1JlbW92ZSB8fCBjaGlsZC5wYXJlbnQuYXV0b1JlbW92ZUNoaWxkcmVuKSAmJiBjaGlsZC5wYXJlbnQucmVtb3ZlICYmIGNoaWxkLnBhcmVudC5yZW1vdmUoY2hpbGQpO1xuICBjaGlsZC5fYWN0ID0gMDtcbn0sXG4gICAgX3VuY2FjaGUgPSBmdW5jdGlvbiBfdW5jYWNoZShhbmltYXRpb24sIGNoaWxkKSB7XG4gIGlmIChhbmltYXRpb24gJiYgKCFjaGlsZCB8fCBjaGlsZC5fZW5kID4gYW5pbWF0aW9uLl9kdXIgfHwgY2hpbGQuX3N0YXJ0IDwgMCkpIHtcbiAgICAvLyBwZXJmb3JtYW5jZSBvcHRpbWl6YXRpb246IGlmIGEgY2hpbGQgYW5pbWF0aW9uIGlzIHBhc3NlZCBpbiB3ZSBzaG91bGQgb25seSB1bmNhY2hlIGlmIHRoYXQgY2hpbGQgRVhURU5EUyB0aGUgYW5pbWF0aW9uIChpdHMgZW5kIHRpbWUgaXMgYmV5b25kIHRoZSBlbmQpXG4gICAgdmFyIGEgPSBhbmltYXRpb247XG5cbiAgICB3aGlsZSAoYSkge1xuICAgICAgYS5fZGlydHkgPSAxO1xuICAgICAgYSA9IGEucGFyZW50O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhbmltYXRpb247XG59LFxuICAgIF9yZWNhY2hlQW5jZXN0b3JzID0gZnVuY3Rpb24gX3JlY2FjaGVBbmNlc3RvcnMoYW5pbWF0aW9uKSB7XG4gIHZhciBwYXJlbnQgPSBhbmltYXRpb24ucGFyZW50O1xuXG4gIHdoaWxlIChwYXJlbnQgJiYgcGFyZW50LnBhcmVudCkge1xuICAgIC8vc29tZXRpbWVzIHdlIG11c3QgZm9yY2UgYSByZS1zb3J0IG9mIGFsbCBjaGlsZHJlbiBhbmQgdXBkYXRlIHRoZSBkdXJhdGlvbi90b3RhbER1cmF0aW9uIG9mIGFsbCBhbmNlc3RvciB0aW1lbGluZXMgaW1tZWRpYXRlbHkgaW4gY2FzZSwgZm9yIGV4YW1wbGUsIGluIHRoZSBtaWRkbGUgb2YgYSByZW5kZXIgbG9vcCwgb25lIHR3ZWVuIGFsdGVycyBhbm90aGVyIHR3ZWVuJ3MgdGltZVNjYWxlIHdoaWNoIHNob3ZlcyBpdHMgc3RhcnRUaW1lIGJlZm9yZSAwLCBmb3JjaW5nIHRoZSBwYXJlbnQgdGltZWxpbmUgdG8gc2hpZnQgYXJvdW5kIGFuZCBzaGlmdENoaWxkcmVuKCkgd2hpY2ggY291bGQgYWZmZWN0IHRoYXQgbmV4dCB0d2VlbidzIHJlbmRlciAoc3RhcnRUaW1lKS4gRG9lc24ndCBtYXR0ZXIgZm9yIHRoZSByb290IHRpbWVsaW5lIHRob3VnaC5cbiAgICBwYXJlbnQuX2RpcnR5ID0gMTtcbiAgICBwYXJlbnQudG90YWxEdXJhdGlvbigpO1xuICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gIH1cblxuICByZXR1cm4gYW5pbWF0aW9uO1xufSxcbiAgICBfcmV3aW5kU3RhcnRBdCA9IGZ1bmN0aW9uIF9yZXdpbmRTdGFydEF0KHR3ZWVuLCB0b3RhbFRpbWUsIHN1cHByZXNzRXZlbnRzLCBmb3JjZSkge1xuICByZXR1cm4gdHdlZW4uX3N0YXJ0QXQgJiYgKF9yZXZlcnRpbmcgPyB0d2Vlbi5fc3RhcnRBdC5yZXZlcnQoX3JldmVydENvbmZpZ05vS2lsbCkgOiB0d2Vlbi52YXJzLmltbWVkaWF0ZVJlbmRlciAmJiAhdHdlZW4udmFycy5hdXRvUmV2ZXJ0IHx8IHR3ZWVuLl9zdGFydEF0LnJlbmRlcih0b3RhbFRpbWUsIHRydWUsIGZvcmNlKSk7XG59LFxuICAgIF9oYXNOb1BhdXNlZEFuY2VzdG9ycyA9IGZ1bmN0aW9uIF9oYXNOb1BhdXNlZEFuY2VzdG9ycyhhbmltYXRpb24pIHtcbiAgcmV0dXJuICFhbmltYXRpb24gfHwgYW5pbWF0aW9uLl90cyAmJiBfaGFzTm9QYXVzZWRBbmNlc3RvcnMoYW5pbWF0aW9uLnBhcmVudCk7XG59LFxuICAgIF9lbGFwc2VkQ3ljbGVEdXJhdGlvbiA9IGZ1bmN0aW9uIF9lbGFwc2VkQ3ljbGVEdXJhdGlvbihhbmltYXRpb24pIHtcbiAgcmV0dXJuIGFuaW1hdGlvbi5fcmVwZWF0ID8gX2FuaW1hdGlvbkN5Y2xlKGFuaW1hdGlvbi5fdFRpbWUsIGFuaW1hdGlvbiA9IGFuaW1hdGlvbi5kdXJhdGlvbigpICsgYW5pbWF0aW9uLl9yRGVsYXkpICogYW5pbWF0aW9uIDogMDtcbn0sXG4gICAgLy8gZmVlZCBpbiB0aGUgdG90YWxUaW1lIGFuZCBjeWNsZUR1cmF0aW9uIGFuZCBpdCdsbCByZXR1cm4gdGhlIGN5Y2xlIChpdGVyYXRpb24gbWludXMgMSkgYW5kIGlmIHRoZSBwbGF5aGVhZCBpcyBleGFjdGx5IGF0IHRoZSB2ZXJ5IEVORCwgaXQgd2lsbCBOT1QgYnVtcCB1cCB0byB0aGUgbmV4dCBjeWNsZS5cbl9hbmltYXRpb25DeWNsZSA9IGZ1bmN0aW9uIF9hbmltYXRpb25DeWNsZSh0VGltZSwgY3ljbGVEdXJhdGlvbikge1xuICB2YXIgd2hvbGUgPSBNYXRoLmZsb29yKHRUaW1lIC89IGN5Y2xlRHVyYXRpb24pO1xuICByZXR1cm4gdFRpbWUgJiYgd2hvbGUgPT09IHRUaW1lID8gd2hvbGUgLSAxIDogd2hvbGU7XG59LFxuICAgIF9wYXJlbnRUb0NoaWxkVG90YWxUaW1lID0gZnVuY3Rpb24gX3BhcmVudFRvQ2hpbGRUb3RhbFRpbWUocGFyZW50VGltZSwgY2hpbGQpIHtcbiAgcmV0dXJuIChwYXJlbnRUaW1lIC0gY2hpbGQuX3N0YXJ0KSAqIGNoaWxkLl90cyArIChjaGlsZC5fdHMgPj0gMCA/IDAgOiBjaGlsZC5fZGlydHkgPyBjaGlsZC50b3RhbER1cmF0aW9uKCkgOiBjaGlsZC5fdER1cik7XG59LFxuICAgIF9zZXRFbmQgPSBmdW5jdGlvbiBfc2V0RW5kKGFuaW1hdGlvbikge1xuICByZXR1cm4gYW5pbWF0aW9uLl9lbmQgPSBfcm91bmRQcmVjaXNlKGFuaW1hdGlvbi5fc3RhcnQgKyAoYW5pbWF0aW9uLl90RHVyIC8gTWF0aC5hYnMoYW5pbWF0aW9uLl90cyB8fCBhbmltYXRpb24uX3J0cyB8fCBfdGlueU51bSkgfHwgMCkpO1xufSxcbiAgICBfYWxpZ25QbGF5aGVhZCA9IGZ1bmN0aW9uIF9hbGlnblBsYXloZWFkKGFuaW1hdGlvbiwgdG90YWxUaW1lKSB7XG4gIC8vIGFkanVzdHMgdGhlIGFuaW1hdGlvbidzIF9zdGFydCBhbmQgX2VuZCBhY2NvcmRpbmcgdG8gdGhlIHByb3ZpZGVkIHRvdGFsVGltZSAob25seSBpZiB0aGUgcGFyZW50J3Mgc21vb3RoQ2hpbGRUaW1pbmcgaXMgdHJ1ZSBhbmQgdGhlIGFuaW1hdGlvbiBpc24ndCBwYXVzZWQpLiBJdCBkb2Vzbid0IGRvIGFueSByZW5kZXJpbmcgb3IgZm9yY2luZyB0aGluZ3MgYmFjayBpbnRvIHBhcmVudCB0aW1lbGluZXMsIGV0Yy4gLSB0aGF0J3Mgd2hhdCB0b3RhbFRpbWUoKSBpcyBmb3IuXG4gIHZhciBwYXJlbnQgPSBhbmltYXRpb24uX2RwO1xuXG4gIGlmIChwYXJlbnQgJiYgcGFyZW50LnNtb290aENoaWxkVGltaW5nICYmIGFuaW1hdGlvbi5fdHMpIHtcbiAgICBhbmltYXRpb24uX3N0YXJ0ID0gX3JvdW5kUHJlY2lzZShwYXJlbnQuX3RpbWUgLSAoYW5pbWF0aW9uLl90cyA+IDAgPyB0b3RhbFRpbWUgLyBhbmltYXRpb24uX3RzIDogKChhbmltYXRpb24uX2RpcnR5ID8gYW5pbWF0aW9uLnRvdGFsRHVyYXRpb24oKSA6IGFuaW1hdGlvbi5fdER1cikgLSB0b3RhbFRpbWUpIC8gLWFuaW1hdGlvbi5fdHMpKTtcblxuICAgIF9zZXRFbmQoYW5pbWF0aW9uKTtcblxuICAgIHBhcmVudC5fZGlydHkgfHwgX3VuY2FjaGUocGFyZW50LCBhbmltYXRpb24pOyAvL2ZvciBwZXJmb3JtYW5jZSBpbXByb3ZlbWVudC4gSWYgdGhlIHBhcmVudCdzIGNhY2hlIGlzIGFscmVhZHkgZGlydHksIGl0IGFscmVhZHkgdG9vayBjYXJlIG9mIG1hcmtpbmcgdGhlIGFuY2VzdG9ycyBhcyBkaXJ0eSB0b28sIHNvIHNraXAgdGhlIGZ1bmN0aW9uIGNhbGwgaGVyZS5cbiAgfVxuXG4gIHJldHVybiBhbmltYXRpb247XG59LFxuXG4vKlxuX3RvdGFsVGltZVRvVGltZSA9IChjbGFtcGVkVG90YWxUaW1lLCBkdXJhdGlvbiwgcmVwZWF0LCByZXBlYXREZWxheSwgeW95bykgPT4ge1xuXHRsZXQgY3ljbGVEdXJhdGlvbiA9IGR1cmF0aW9uICsgcmVwZWF0RGVsYXksXG5cdFx0dGltZSA9IF9yb3VuZChjbGFtcGVkVG90YWxUaW1lICUgY3ljbGVEdXJhdGlvbik7XG5cdGlmICh0aW1lID4gZHVyYXRpb24pIHtcblx0XHR0aW1lID0gZHVyYXRpb247XG5cdH1cblx0cmV0dXJuICh5b3lvICYmICh+fihjbGFtcGVkVG90YWxUaW1lIC8gY3ljbGVEdXJhdGlvbikgJiAxKSkgPyBkdXJhdGlvbiAtIHRpbWUgOiB0aW1lO1xufSxcbiovXG5fcG9zdEFkZENoZWNrcyA9IGZ1bmN0aW9uIF9wb3N0QWRkQ2hlY2tzKHRpbWVsaW5lLCBjaGlsZCkge1xuICB2YXIgdDtcblxuICBpZiAoY2hpbGQuX3RpbWUgfHwgY2hpbGQuX2luaXR0ZWQgJiYgIWNoaWxkLl9kdXIpIHtcbiAgICAvL2luIGNhc2UsIGZvciBleGFtcGxlLCB0aGUgX3N0YXJ0IGlzIG1vdmVkIG9uIGEgdHdlZW4gdGhhdCBoYXMgYWxyZWFkeSByZW5kZXJlZC4gSW1hZ2luZSBpdCdzIGF0IGl0cyBlbmQgc3RhdGUsIHRoZW4gdGhlIHN0YXJ0VGltZSBpcyBtb3ZlZCBXQVkgbGF0ZXIgKGFmdGVyIHRoZSBlbmQgb2YgdGhpcyB0aW1lbGluZSksIGl0IHNob3VsZCByZW5kZXIgYXQgaXRzIGJlZ2lubmluZy5cbiAgICB0ID0gX3BhcmVudFRvQ2hpbGRUb3RhbFRpbWUodGltZWxpbmUucmF3VGltZSgpLCBjaGlsZCk7XG5cbiAgICBpZiAoIWNoaWxkLl9kdXIgfHwgX2NsYW1wKDAsIGNoaWxkLnRvdGFsRHVyYXRpb24oKSwgdCkgLSBjaGlsZC5fdFRpbWUgPiBfdGlueU51bSkge1xuICAgICAgY2hpbGQucmVuZGVyKHQsIHRydWUpO1xuICAgIH1cbiAgfSAvL2lmIHRoZSB0aW1lbGluZSBoYXMgYWxyZWFkeSBlbmRlZCBidXQgdGhlIGluc2VydGVkIHR3ZWVuL3RpbWVsaW5lIGV4dGVuZHMgdGhlIGR1cmF0aW9uLCB3ZSBzaG91bGQgZW5hYmxlIHRoaXMgdGltZWxpbmUgYWdhaW4gc28gdGhhdCBpdCByZW5kZXJzIHByb3Blcmx5LiBXZSBzaG91bGQgYWxzbyBhbGlnbiB0aGUgcGxheWhlYWQgd2l0aCB0aGUgcGFyZW50IHRpbWVsaW5lJ3Mgd2hlbiBhcHByb3ByaWF0ZS5cblxuXG4gIGlmIChfdW5jYWNoZSh0aW1lbGluZSwgY2hpbGQpLl9kcCAmJiB0aW1lbGluZS5faW5pdHRlZCAmJiB0aW1lbGluZS5fdGltZSA+PSB0aW1lbGluZS5fZHVyICYmIHRpbWVsaW5lLl90cykge1xuICAgIC8vaW4gY2FzZSBhbnkgb2YgdGhlIGFuY2VzdG9ycyBoYWQgY29tcGxldGVkIGJ1dCBzaG91bGQgbm93IGJlIGVuYWJsZWQuLi5cbiAgICBpZiAodGltZWxpbmUuX2R1ciA8IHRpbWVsaW5lLmR1cmF0aW9uKCkpIHtcbiAgICAgIHQgPSB0aW1lbGluZTtcblxuICAgICAgd2hpbGUgKHQuX2RwKSB7XG4gICAgICAgIHQucmF3VGltZSgpID49IDAgJiYgdC50b3RhbFRpbWUodC5fdFRpbWUpOyAvL21vdmVzIHRoZSB0aW1lbGluZSAoc2hpZnRzIGl0cyBzdGFydFRpbWUpIGlmIG5lY2Vzc2FyeSwgYW5kIGFsc28gZW5hYmxlcyBpdC4gSWYgaXQncyBjdXJyZW50bHkgemVybywgdGhvdWdoLCBpdCBtYXkgbm90IGJlIHNjaGVkdWxlZCB0byByZW5kZXIgdW50aWwgbGF0ZXIgc28gdGhlcmUncyBubyBuZWVkIHRvIGZvcmNlIGl0IHRvIGFsaWduIHdpdGggdGhlIGN1cnJlbnQgcGxheWhlYWQgcG9zaXRpb24uIE9ubHkgbW92ZSB0byBjYXRjaCB1cCB3aXRoIHRoZSBwbGF5aGVhZC5cblxuICAgICAgICB0ID0gdC5fZHA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGltZWxpbmUuX3pUaW1lID0gLV90aW55TnVtOyAvLyBoZWxwcyBlbnN1cmUgdGhhdCB0aGUgbmV4dCByZW5kZXIoKSB3aWxsIGJlIGZvcmNlZCAoY3Jvc3NpbmdTdGFydCA9IHRydWUgaW4gcmVuZGVyKCkpLCBldmVuIGlmIHRoZSBkdXJhdGlvbiBoYXNuJ3QgY2hhbmdlZCAod2UncmUgYWRkaW5nIGEgY2hpbGQgd2hpY2ggd291bGQgbmVlZCB0byBnZXQgcmVuZGVyZWQpLiBEZWZpbml0ZWx5IGFuIGVkZ2UgY2FzZS4gTm90ZTogd2UgTVVTVCBkbyB0aGlzIEFGVEVSIHRoZSBsb29wIGFib3ZlIHdoZXJlIHRoZSB0b3RhbFRpbWUoKSBtaWdodCB0cmlnZ2VyIGEgcmVuZGVyKCkgYmVjYXVzZSB0aGlzIF9hZGRUb1RpbWVsaW5lKCkgbWV0aG9kIGdldHMgY2FsbGVkIGZyb20gdGhlIEFuaW1hdGlvbiBjb25zdHJ1Y3RvciwgQkVGT1JFIHR3ZWVucyBldmVuIHJlY29yZCB0aGVpciB0YXJnZXRzLCBldGMuIHNvIHdlIHdvdWxkbid0IHdhbnQgdGhpbmdzIHRvIGdldCB0cmlnZ2VyZWQgaW4gdGhlIHdyb25nIG9yZGVyLlxuICB9XG59LFxuICAgIF9hZGRUb1RpbWVsaW5lID0gZnVuY3Rpb24gX2FkZFRvVGltZWxpbmUodGltZWxpbmUsIGNoaWxkLCBwb3NpdGlvbiwgc2tpcENoZWNrcykge1xuICBjaGlsZC5wYXJlbnQgJiYgX3JlbW92ZUZyb21QYXJlbnQoY2hpbGQpO1xuICBjaGlsZC5fc3RhcnQgPSBfcm91bmRQcmVjaXNlKChfaXNOdW1iZXIocG9zaXRpb24pID8gcG9zaXRpb24gOiBwb3NpdGlvbiB8fCB0aW1lbGluZSAhPT0gX2dsb2JhbFRpbWVsaW5lID8gX3BhcnNlUG9zaXRpb24odGltZWxpbmUsIHBvc2l0aW9uLCBjaGlsZCkgOiB0aW1lbGluZS5fdGltZSkgKyBjaGlsZC5fZGVsYXkpO1xuICBjaGlsZC5fZW5kID0gX3JvdW5kUHJlY2lzZShjaGlsZC5fc3RhcnQgKyAoY2hpbGQudG90YWxEdXJhdGlvbigpIC8gTWF0aC5hYnMoY2hpbGQudGltZVNjYWxlKCkpIHx8IDApKTtcblxuICBfYWRkTGlua2VkTGlzdEl0ZW0odGltZWxpbmUsIGNoaWxkLCBcIl9maXJzdFwiLCBcIl9sYXN0XCIsIHRpbWVsaW5lLl9zb3J0ID8gXCJfc3RhcnRcIiA6IDApO1xuXG4gIF9pc0Zyb21PckZyb21TdGFydChjaGlsZCkgfHwgKHRpbWVsaW5lLl9yZWNlbnQgPSBjaGlsZCk7XG4gIHNraXBDaGVja3MgfHwgX3Bvc3RBZGRDaGVja3ModGltZWxpbmUsIGNoaWxkKTtcbiAgdGltZWxpbmUuX3RzIDwgMCAmJiBfYWxpZ25QbGF5aGVhZCh0aW1lbGluZSwgdGltZWxpbmUuX3RUaW1lKTsgLy8gaWYgdGhlIHRpbWVsaW5lIGlzIHJldmVyc2VkIGFuZCB0aGUgbmV3IGNoaWxkIG1ha2VzIGl0IGxvbmdlciwgd2UgbWF5IG5lZWQgdG8gYWRqdXN0IHRoZSBwYXJlbnQncyBfc3RhcnQgKHB1c2ggaXQgYmFjaylcblxuICByZXR1cm4gdGltZWxpbmU7XG59LFxuICAgIF9zY3JvbGxUcmlnZ2VyID0gZnVuY3Rpb24gX3Njcm9sbFRyaWdnZXIoYW5pbWF0aW9uLCB0cmlnZ2VyKSB7XG4gIHJldHVybiAoX2dsb2JhbHMuU2Nyb2xsVHJpZ2dlciB8fCBfbWlzc2luZ1BsdWdpbihcInNjcm9sbFRyaWdnZXJcIiwgdHJpZ2dlcikpICYmIF9nbG9iYWxzLlNjcm9sbFRyaWdnZXIuY3JlYXRlKHRyaWdnZXIsIGFuaW1hdGlvbik7XG59LFxuICAgIF9hdHRlbXB0SW5pdFR3ZWVuID0gZnVuY3Rpb24gX2F0dGVtcHRJbml0VHdlZW4odHdlZW4sIHRpbWUsIGZvcmNlLCBzdXBwcmVzc0V2ZW50cywgdFRpbWUpIHtcbiAgX2luaXRUd2Vlbih0d2VlbiwgdGltZSwgdFRpbWUpO1xuXG4gIGlmICghdHdlZW4uX2luaXR0ZWQpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIGlmICghZm9yY2UgJiYgdHdlZW4uX3B0ICYmICFfcmV2ZXJ0aW5nICYmICh0d2Vlbi5fZHVyICYmIHR3ZWVuLnZhcnMubGF6eSAhPT0gZmFsc2UgfHwgIXR3ZWVuLl9kdXIgJiYgdHdlZW4udmFycy5sYXp5KSAmJiBfbGFzdFJlbmRlcmVkRnJhbWUgIT09IF90aWNrZXIuZnJhbWUpIHtcbiAgICBfbGF6eVR3ZWVucy5wdXNoKHR3ZWVuKTtcblxuICAgIHR3ZWVuLl9sYXp5ID0gW3RUaW1lLCBzdXBwcmVzc0V2ZW50c107XG4gICAgcmV0dXJuIDE7XG4gIH1cbn0sXG4gICAgX3BhcmVudFBsYXloZWFkSXNCZWZvcmVTdGFydCA9IGZ1bmN0aW9uIF9wYXJlbnRQbGF5aGVhZElzQmVmb3JlU3RhcnQoX3JlZikge1xuICB2YXIgcGFyZW50ID0gX3JlZi5wYXJlbnQ7XG4gIHJldHVybiBwYXJlbnQgJiYgcGFyZW50Ll90cyAmJiBwYXJlbnQuX2luaXR0ZWQgJiYgIXBhcmVudC5fbG9jayAmJiAocGFyZW50LnJhd1RpbWUoKSA8IDAgfHwgX3BhcmVudFBsYXloZWFkSXNCZWZvcmVTdGFydChwYXJlbnQpKTtcbn0sXG4gICAgLy8gY2hlY2sgcGFyZW50J3MgX2xvY2sgYmVjYXVzZSB3aGVuIGEgdGltZWxpbmUgcmVwZWF0cy95b3lvcyBhbmQgZG9lcyBpdHMgYXJ0aWZpY2lhbCB3cmFwcGluZywgd2Ugc2hvdWxkbid0IGZvcmNlIHRoZSByYXRpbyBiYWNrIHRvIDBcbl9pc0Zyb21PckZyb21TdGFydCA9IGZ1bmN0aW9uIF9pc0Zyb21PckZyb21TdGFydChfcmVmMikge1xuICB2YXIgZGF0YSA9IF9yZWYyLmRhdGE7XG4gIHJldHVybiBkYXRhID09PSBcImlzRnJvbVN0YXJ0XCIgfHwgZGF0YSA9PT0gXCJpc1N0YXJ0XCI7XG59LFxuICAgIF9yZW5kZXJaZXJvRHVyYXRpb25Ud2VlbiA9IGZ1bmN0aW9uIF9yZW5kZXJaZXJvRHVyYXRpb25Ud2Vlbih0d2VlbiwgdG90YWxUaW1lLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpIHtcbiAgdmFyIHByZXZSYXRpbyA9IHR3ZWVuLnJhdGlvLFxuICAgICAgcmF0aW8gPSB0b3RhbFRpbWUgPCAwIHx8ICF0b3RhbFRpbWUgJiYgKCF0d2Vlbi5fc3RhcnQgJiYgX3BhcmVudFBsYXloZWFkSXNCZWZvcmVTdGFydCh0d2VlbikgJiYgISghdHdlZW4uX2luaXR0ZWQgJiYgX2lzRnJvbU9yRnJvbVN0YXJ0KHR3ZWVuKSkgfHwgKHR3ZWVuLl90cyA8IDAgfHwgdHdlZW4uX2RwLl90cyA8IDApICYmICFfaXNGcm9tT3JGcm9tU3RhcnQodHdlZW4pKSA/IDAgOiAxLFxuICAgICAgLy8gaWYgdGhlIHR3ZWVuIG9yIGl0cyBwYXJlbnQgaXMgcmV2ZXJzZWQgYW5kIHRoZSB0b3RhbFRpbWUgaXMgMCwgd2Ugc2hvdWxkIGdvIHRvIGEgcmF0aW8gb2YgMC4gRWRnZSBjYXNlOiBpZiBhIGZyb20oKSBvciBmcm9tVG8oKSBzdGFnZ2VyIHR3ZWVuIGlzIHBsYWNlZCBsYXRlciBpbiBhIHRpbWVsaW5lLCB0aGUgXCJzdGFydEF0XCIgemVyby1kdXJhdGlvbiB0d2VlbiBjb3VsZCBpbml0aWFsbHkgcmVuZGVyIGF0IGEgdGltZSB3aGVuIHRoZSBwYXJlbnQgdGltZWxpbmUncyBwbGF5aGVhZCBpcyB0ZWNobmljYWxseSBCRUZPUkUgd2hlcmUgdGhpcyB0d2VlbiBpcywgc28gbWFrZSBzdXJlIHRoYXQgYW55IFwiZnJvbVwiIGFuZCBcImZyb21Ub1wiIHN0YXJ0QXQgdHdlZW5zIGFyZSByZW5kZXJlZCB0aGUgZmlyc3QgdGltZSBhdCBhIHJhdGlvIG9mIDEuXG4gIHJlcGVhdERlbGF5ID0gdHdlZW4uX3JEZWxheSxcbiAgICAgIHRUaW1lID0gMCxcbiAgICAgIHB0LFxuICAgICAgaXRlcmF0aW9uLFxuICAgICAgcHJldkl0ZXJhdGlvbjtcblxuICBpZiAocmVwZWF0RGVsYXkgJiYgdHdlZW4uX3JlcGVhdCkge1xuICAgIC8vIGluIGNhc2UgdGhlcmUncyBhIHplcm8tZHVyYXRpb24gdHdlZW4gdGhhdCBoYXMgYSByZXBlYXQgd2l0aCBhIHJlcGVhdERlbGF5XG4gICAgdFRpbWUgPSBfY2xhbXAoMCwgdHdlZW4uX3REdXIsIHRvdGFsVGltZSk7XG4gICAgaXRlcmF0aW9uID0gX2FuaW1hdGlvbkN5Y2xlKHRUaW1lLCByZXBlYXREZWxheSk7XG4gICAgdHdlZW4uX3lveW8gJiYgaXRlcmF0aW9uICYgMSAmJiAocmF0aW8gPSAxIC0gcmF0aW8pO1xuXG4gICAgaWYgKGl0ZXJhdGlvbiAhPT0gX2FuaW1hdGlvbkN5Y2xlKHR3ZWVuLl90VGltZSwgcmVwZWF0RGVsYXkpKSB7XG4gICAgICAvLyBpZiBpdGVyYXRpb24gY2hhbmdlZFxuICAgICAgcHJldlJhdGlvID0gMSAtIHJhdGlvO1xuICAgICAgdHdlZW4udmFycy5yZXBlYXRSZWZyZXNoICYmIHR3ZWVuLl9pbml0dGVkICYmIHR3ZWVuLmludmFsaWRhdGUoKTtcbiAgICB9XG4gIH1cblxuICBpZiAocmF0aW8gIT09IHByZXZSYXRpbyB8fCBfcmV2ZXJ0aW5nIHx8IGZvcmNlIHx8IHR3ZWVuLl96VGltZSA9PT0gX3RpbnlOdW0gfHwgIXRvdGFsVGltZSAmJiB0d2Vlbi5felRpbWUpIHtcbiAgICBpZiAoIXR3ZWVuLl9pbml0dGVkICYmIF9hdHRlbXB0SW5pdFR3ZWVuKHR3ZWVuLCB0b3RhbFRpbWUsIGZvcmNlLCBzdXBwcmVzc0V2ZW50cywgdFRpbWUpKSB7XG4gICAgICAvLyBpZiB3ZSByZW5kZXIgdGhlIHZlcnkgYmVnaW5uaW5nICh0aW1lID09IDApIG9mIGEgZnJvbVRvKCksIHdlIG11c3QgZm9yY2UgdGhlIHJlbmRlciAobm9ybWFsIHR3ZWVucyB3b3VsZG4ndCBuZWVkIHRvIHJlbmRlciBhdCBhIHRpbWUgb2YgMCB3aGVuIHRoZSBwcmV2VGltZSB3YXMgYWxzbyAwKS4gVGhpcyBpcyBhbHNvIG1hbmRhdG9yeSB0byBtYWtlIHN1cmUgb3ZlcndyaXRpbmcga2lja3MgaW4gaW1tZWRpYXRlbHkuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcHJldkl0ZXJhdGlvbiA9IHR3ZWVuLl96VGltZTtcbiAgICB0d2Vlbi5felRpbWUgPSB0b3RhbFRpbWUgfHwgKHN1cHByZXNzRXZlbnRzID8gX3RpbnlOdW0gOiAwKTsgLy8gd2hlbiB0aGUgcGxheWhlYWQgYXJyaXZlcyBhdCBFWEFDVExZIHRpbWUgMCAocmlnaHQgb24gdG9wKSBvZiBhIHplcm8tZHVyYXRpb24gdHdlZW4sIHdlIG5lZWQgdG8gZGlzY2VybiBpZiBldmVudHMgYXJlIHN1cHByZXNzZWQgc28gdGhhdCB3aGVuIHRoZSBwbGF5aGVhZCBtb3ZlcyBhZ2FpbiAobmV4dCB0aW1lKSwgaXQnbGwgdHJpZ2dlciB0aGUgY2FsbGJhY2suIElmIGV2ZW50cyBhcmUgTk9UIHN1cHByZXNzZWQsIG9idmlvdXNseSB0aGUgY2FsbGJhY2sgd291bGQgYmUgdHJpZ2dlcmVkIGluIHRoaXMgcmVuZGVyLiBCYXNpY2FsbHksIHRoZSBjYWxsYmFjayBzaG91bGQgZmlyZSBlaXRoZXIgd2hlbiB0aGUgcGxheWhlYWQgQVJSSVZFUyBvciBMRUFWRVMgdGhpcyBleGFjdCBzcG90LCBub3QgYm90aC4gSW1hZ2luZSBkb2luZyBhIHRpbWVsaW5lLnNlZWsoMCkgYW5kIHRoZXJlJ3MgYSBjYWxsYmFjayB0aGF0IHNpdHMgYXQgMC4gU2luY2UgZXZlbnRzIGFyZSBzdXBwcmVzc2VkIG9uIHRoYXQgc2VlaygpIGJ5IGRlZmF1bHQsIG5vdGhpbmcgd2lsbCBmaXJlLCBidXQgd2hlbiB0aGUgcGxheWhlYWQgbW92ZXMgb2ZmIG9mIHRoYXQgcG9zaXRpb24sIHRoZSBjYWxsYmFjayBzaG91bGQgZmlyZS4gVGhpcyBiZWhhdmlvciBpcyB3aGF0IHBlb3BsZSBpbnR1aXRpdmVseSBleHBlY3QuXG5cbiAgICBzdXBwcmVzc0V2ZW50cyB8fCAoc3VwcHJlc3NFdmVudHMgPSB0b3RhbFRpbWUgJiYgIXByZXZJdGVyYXRpb24pOyAvLyBpZiBpdCB3YXMgcmVuZGVyZWQgcHJldmlvdXNseSBhdCBleGFjdGx5IDAgKF96VGltZSkgYW5kIG5vdyB0aGUgcGxheWhlYWQgaXMgbW92aW5nIGF3YXksIERPTidUIGZpcmUgY2FsbGJhY2tzIG90aGVyd2lzZSB0aGV5J2xsIHNlZW0gbGlrZSBkdXBsaWNhdGVzLlxuXG4gICAgdHdlZW4ucmF0aW8gPSByYXRpbztcbiAgICB0d2Vlbi5fZnJvbSAmJiAocmF0aW8gPSAxIC0gcmF0aW8pO1xuICAgIHR3ZWVuLl90aW1lID0gMDtcbiAgICB0d2Vlbi5fdFRpbWUgPSB0VGltZTtcbiAgICBwdCA9IHR3ZWVuLl9wdDtcblxuICAgIHdoaWxlIChwdCkge1xuICAgICAgcHQucihyYXRpbywgcHQuZCk7XG4gICAgICBwdCA9IHB0Ll9uZXh0O1xuICAgIH1cblxuICAgIHRvdGFsVGltZSA8IDAgJiYgX3Jld2luZFN0YXJ0QXQodHdlZW4sIHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIHRydWUpO1xuICAgIHR3ZWVuLl9vblVwZGF0ZSAmJiAhc3VwcHJlc3NFdmVudHMgJiYgX2NhbGxiYWNrKHR3ZWVuLCBcIm9uVXBkYXRlXCIpO1xuICAgIHRUaW1lICYmIHR3ZWVuLl9yZXBlYXQgJiYgIXN1cHByZXNzRXZlbnRzICYmIHR3ZWVuLnBhcmVudCAmJiBfY2FsbGJhY2sodHdlZW4sIFwib25SZXBlYXRcIik7XG5cbiAgICBpZiAoKHRvdGFsVGltZSA+PSB0d2Vlbi5fdER1ciB8fCB0b3RhbFRpbWUgPCAwKSAmJiB0d2Vlbi5yYXRpbyA9PT0gcmF0aW8pIHtcbiAgICAgIHJhdGlvICYmIF9yZW1vdmVGcm9tUGFyZW50KHR3ZWVuLCAxKTtcblxuICAgICAgaWYgKCFzdXBwcmVzc0V2ZW50cyAmJiAhX3JldmVydGluZykge1xuICAgICAgICBfY2FsbGJhY2sodHdlZW4sIHJhdGlvID8gXCJvbkNvbXBsZXRlXCIgOiBcIm9uUmV2ZXJzZUNvbXBsZXRlXCIsIHRydWUpO1xuXG4gICAgICAgIHR3ZWVuLl9wcm9tICYmIHR3ZWVuLl9wcm9tKCk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKCF0d2Vlbi5felRpbWUpIHtcbiAgICB0d2Vlbi5felRpbWUgPSB0b3RhbFRpbWU7XG4gIH1cbn0sXG4gICAgX2ZpbmROZXh0UGF1c2VUd2VlbiA9IGZ1bmN0aW9uIF9maW5kTmV4dFBhdXNlVHdlZW4oYW5pbWF0aW9uLCBwcmV2VGltZSwgdGltZSkge1xuICB2YXIgY2hpbGQ7XG5cbiAgaWYgKHRpbWUgPiBwcmV2VGltZSkge1xuICAgIGNoaWxkID0gYW5pbWF0aW9uLl9maXJzdDtcblxuICAgIHdoaWxlIChjaGlsZCAmJiBjaGlsZC5fc3RhcnQgPD0gdGltZSkge1xuICAgICAgaWYgKGNoaWxkLmRhdGEgPT09IFwiaXNQYXVzZVwiICYmIGNoaWxkLl9zdGFydCA+IHByZXZUaW1lKSB7XG4gICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgIH1cblxuICAgICAgY2hpbGQgPSBjaGlsZC5fbmV4dDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY2hpbGQgPSBhbmltYXRpb24uX2xhc3Q7XG5cbiAgICB3aGlsZSAoY2hpbGQgJiYgY2hpbGQuX3N0YXJ0ID49IHRpbWUpIHtcbiAgICAgIGlmIChjaGlsZC5kYXRhID09PSBcImlzUGF1c2VcIiAmJiBjaGlsZC5fc3RhcnQgPCBwcmV2VGltZSkge1xuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICB9XG5cbiAgICAgIGNoaWxkID0gY2hpbGQuX3ByZXY7XG4gICAgfVxuICB9XG59LFxuICAgIF9zZXREdXJhdGlvbiA9IGZ1bmN0aW9uIF9zZXREdXJhdGlvbihhbmltYXRpb24sIGR1cmF0aW9uLCBza2lwVW5jYWNoZSwgbGVhdmVQbGF5aGVhZCkge1xuICB2YXIgcmVwZWF0ID0gYW5pbWF0aW9uLl9yZXBlYXQsXG4gICAgICBkdXIgPSBfcm91bmRQcmVjaXNlKGR1cmF0aW9uKSB8fCAwLFxuICAgICAgdG90YWxQcm9ncmVzcyA9IGFuaW1hdGlvbi5fdFRpbWUgLyBhbmltYXRpb24uX3REdXI7XG4gIHRvdGFsUHJvZ3Jlc3MgJiYgIWxlYXZlUGxheWhlYWQgJiYgKGFuaW1hdGlvbi5fdGltZSAqPSBkdXIgLyBhbmltYXRpb24uX2R1cik7XG4gIGFuaW1hdGlvbi5fZHVyID0gZHVyO1xuICBhbmltYXRpb24uX3REdXIgPSAhcmVwZWF0ID8gZHVyIDogcmVwZWF0IDwgMCA/IDFlMTAgOiBfcm91bmRQcmVjaXNlKGR1ciAqIChyZXBlYXQgKyAxKSArIGFuaW1hdGlvbi5fckRlbGF5ICogcmVwZWF0KTtcbiAgdG90YWxQcm9ncmVzcyA+IDAgJiYgIWxlYXZlUGxheWhlYWQgJiYgX2FsaWduUGxheWhlYWQoYW5pbWF0aW9uLCBhbmltYXRpb24uX3RUaW1lID0gYW5pbWF0aW9uLl90RHVyICogdG90YWxQcm9ncmVzcyk7XG4gIGFuaW1hdGlvbi5wYXJlbnQgJiYgX3NldEVuZChhbmltYXRpb24pO1xuICBza2lwVW5jYWNoZSB8fCBfdW5jYWNoZShhbmltYXRpb24ucGFyZW50LCBhbmltYXRpb24pO1xuICByZXR1cm4gYW5pbWF0aW9uO1xufSxcbiAgICBfb25VcGRhdGVUb3RhbER1cmF0aW9uID0gZnVuY3Rpb24gX29uVXBkYXRlVG90YWxEdXJhdGlvbihhbmltYXRpb24pIHtcbiAgcmV0dXJuIGFuaW1hdGlvbiBpbnN0YW5jZW9mIFRpbWVsaW5lID8gX3VuY2FjaGUoYW5pbWF0aW9uKSA6IF9zZXREdXJhdGlvbihhbmltYXRpb24sIGFuaW1hdGlvbi5fZHVyKTtcbn0sXG4gICAgX3plcm9Qb3NpdGlvbiA9IHtcbiAgX3N0YXJ0OiAwLFxuICBlbmRUaW1lOiBfZW1wdHlGdW5jLFxuICB0b3RhbER1cmF0aW9uOiBfZW1wdHlGdW5jXG59LFxuICAgIF9wYXJzZVBvc2l0aW9uID0gZnVuY3Rpb24gX3BhcnNlUG9zaXRpb24oYW5pbWF0aW9uLCBwb3NpdGlvbiwgcGVyY2VudEFuaW1hdGlvbikge1xuICB2YXIgbGFiZWxzID0gYW5pbWF0aW9uLmxhYmVscyxcbiAgICAgIHJlY2VudCA9IGFuaW1hdGlvbi5fcmVjZW50IHx8IF96ZXJvUG9zaXRpb24sXG4gICAgICBjbGlwcGVkRHVyYXRpb24gPSBhbmltYXRpb24uZHVyYXRpb24oKSA+PSBfYmlnTnVtID8gcmVjZW50LmVuZFRpbWUoZmFsc2UpIDogYW5pbWF0aW9uLl9kdXIsXG4gICAgICAvL2luIGNhc2UgdGhlcmUncyBhIGNoaWxkIHRoYXQgaW5maW5pdGVseSByZXBlYXRzLCB1c2VycyBhbG1vc3QgbmV2ZXIgaW50ZW5kIGZvciB0aGUgaW5zZXJ0aW9uIHBvaW50IG9mIGEgbmV3IGNoaWxkIHRvIGJlIGJhc2VkIG9uIGEgU1VQRVIgbG9uZyB2YWx1ZSBsaWtlIHRoYXQgc28gd2UgY2xpcCBpdCBhbmQgYXNzdW1lIHRoZSBtb3N0IHJlY2VudGx5LWFkZGVkIGNoaWxkJ3MgZW5kVGltZSBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkLlxuICBpLFxuICAgICAgb2Zmc2V0LFxuICAgICAgaXNQZXJjZW50O1xuXG4gIGlmIChfaXNTdHJpbmcocG9zaXRpb24pICYmIChpc05hTihwb3NpdGlvbikgfHwgcG9zaXRpb24gaW4gbGFiZWxzKSkge1xuICAgIC8vaWYgdGhlIHN0cmluZyBpcyBhIG51bWJlciBsaWtlIFwiMVwiLCBjaGVjayB0byBzZWUgaWYgdGhlcmUncyBhIGxhYmVsIHdpdGggdGhhdCBuYW1lLCBvdGhlcndpc2UgaW50ZXJwcmV0IGl0IGFzIGEgbnVtYmVyIChhYnNvbHV0ZSB2YWx1ZSkuXG4gICAgb2Zmc2V0ID0gcG9zaXRpb24uY2hhckF0KDApO1xuICAgIGlzUGVyY2VudCA9IHBvc2l0aW9uLnN1YnN0cigtMSkgPT09IFwiJVwiO1xuICAgIGkgPSBwb3NpdGlvbi5pbmRleE9mKFwiPVwiKTtcblxuICAgIGlmIChvZmZzZXQgPT09IFwiPFwiIHx8IG9mZnNldCA9PT0gXCI+XCIpIHtcbiAgICAgIGkgPj0gMCAmJiAocG9zaXRpb24gPSBwb3NpdGlvbi5yZXBsYWNlKC89LywgXCJcIikpO1xuICAgICAgcmV0dXJuIChvZmZzZXQgPT09IFwiPFwiID8gcmVjZW50Ll9zdGFydCA6IHJlY2VudC5lbmRUaW1lKHJlY2VudC5fcmVwZWF0ID49IDApKSArIChwYXJzZUZsb2F0KHBvc2l0aW9uLnN1YnN0cigxKSkgfHwgMCkgKiAoaXNQZXJjZW50ID8gKGkgPCAwID8gcmVjZW50IDogcGVyY2VudEFuaW1hdGlvbikudG90YWxEdXJhdGlvbigpIC8gMTAwIDogMSk7XG4gICAgfVxuXG4gICAgaWYgKGkgPCAwKSB7XG4gICAgICBwb3NpdGlvbiBpbiBsYWJlbHMgfHwgKGxhYmVsc1twb3NpdGlvbl0gPSBjbGlwcGVkRHVyYXRpb24pO1xuICAgICAgcmV0dXJuIGxhYmVsc1twb3NpdGlvbl07XG4gICAgfVxuXG4gICAgb2Zmc2V0ID0gcGFyc2VGbG9hdChwb3NpdGlvbi5jaGFyQXQoaSAtIDEpICsgcG9zaXRpb24uc3Vic3RyKGkgKyAxKSk7XG5cbiAgICBpZiAoaXNQZXJjZW50ICYmIHBlcmNlbnRBbmltYXRpb24pIHtcbiAgICAgIG9mZnNldCA9IG9mZnNldCAvIDEwMCAqIChfaXNBcnJheShwZXJjZW50QW5pbWF0aW9uKSA/IHBlcmNlbnRBbmltYXRpb25bMF0gOiBwZXJjZW50QW5pbWF0aW9uKS50b3RhbER1cmF0aW9uKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGkgPiAxID8gX3BhcnNlUG9zaXRpb24oYW5pbWF0aW9uLCBwb3NpdGlvbi5zdWJzdHIoMCwgaSAtIDEpLCBwZXJjZW50QW5pbWF0aW9uKSArIG9mZnNldCA6IGNsaXBwZWREdXJhdGlvbiArIG9mZnNldDtcbiAgfVxuXG4gIHJldHVybiBwb3NpdGlvbiA9PSBudWxsID8gY2xpcHBlZER1cmF0aW9uIDogK3Bvc2l0aW9uO1xufSxcbiAgICBfY3JlYXRlVHdlZW5UeXBlID0gZnVuY3Rpb24gX2NyZWF0ZVR3ZWVuVHlwZSh0eXBlLCBwYXJhbXMsIHRpbWVsaW5lKSB7XG4gIHZhciBpc0xlZ2FjeSA9IF9pc051bWJlcihwYXJhbXNbMV0pLFxuICAgICAgdmFyc0luZGV4ID0gKGlzTGVnYWN5ID8gMiA6IDEpICsgKHR5cGUgPCAyID8gMCA6IDEpLFxuICAgICAgdmFycyA9IHBhcmFtc1t2YXJzSW5kZXhdLFxuICAgICAgaXJWYXJzLFxuICAgICAgcGFyZW50O1xuXG4gIGlzTGVnYWN5ICYmICh2YXJzLmR1cmF0aW9uID0gcGFyYW1zWzFdKTtcbiAgdmFycy5wYXJlbnQgPSB0aW1lbGluZTtcblxuICBpZiAodHlwZSkge1xuICAgIGlyVmFycyA9IHZhcnM7XG4gICAgcGFyZW50ID0gdGltZWxpbmU7XG5cbiAgICB3aGlsZSAocGFyZW50ICYmICEoXCJpbW1lZGlhdGVSZW5kZXJcIiBpbiBpclZhcnMpKSB7XG4gICAgICAvLyBpbmhlcml0YW5jZSBoYXNuJ3QgaGFwcGVuZWQgeWV0LCBidXQgc29tZW9uZSBtYXkgaGF2ZSBzZXQgYSBkZWZhdWx0IGluIGFuIGFuY2VzdG9yIHRpbWVsaW5lLiBXZSBjb3VsZCBkbyB2YXJzLmltbWVkaWF0ZVJlbmRlciA9IF9pc05vdEZhbHNlKF9pbmhlcml0RGVmYXVsdHModmFycykuaW1tZWRpYXRlUmVuZGVyKSBidXQgdGhhdCdkIGV4YWN0IGEgc2xpZ2h0IHBlcmZvcm1hbmNlIHBlbmFsdHkgYmVjYXVzZSBfaW5oZXJpdERlZmF1bHRzKCkgYWxzbyBydW5zIGluIHRoZSBUd2VlbiBjb25zdHJ1Y3Rvci4gV2UncmUgcGF5aW5nIGEgc21hbGwga2IgcHJpY2UgaGVyZSB0byBnYWluIHNwZWVkLlxuICAgICAgaXJWYXJzID0gcGFyZW50LnZhcnMuZGVmYXVsdHMgfHwge307XG4gICAgICBwYXJlbnQgPSBfaXNOb3RGYWxzZShwYXJlbnQudmFycy5pbmhlcml0KSAmJiBwYXJlbnQucGFyZW50O1xuICAgIH1cblxuICAgIHZhcnMuaW1tZWRpYXRlUmVuZGVyID0gX2lzTm90RmFsc2UoaXJWYXJzLmltbWVkaWF0ZVJlbmRlcik7XG4gICAgdHlwZSA8IDIgPyB2YXJzLnJ1bkJhY2t3YXJkcyA9IDEgOiB2YXJzLnN0YXJ0QXQgPSBwYXJhbXNbdmFyc0luZGV4IC0gMV07IC8vIFwiZnJvbVwiIHZhcnNcbiAgfVxuXG4gIHJldHVybiBuZXcgVHdlZW4ocGFyYW1zWzBdLCB2YXJzLCBwYXJhbXNbdmFyc0luZGV4ICsgMV0pO1xufSxcbiAgICBfY29uZGl0aW9uYWxSZXR1cm4gPSBmdW5jdGlvbiBfY29uZGl0aW9uYWxSZXR1cm4odmFsdWUsIGZ1bmMpIHtcbiAgcmV0dXJuIHZhbHVlIHx8IHZhbHVlID09PSAwID8gZnVuYyh2YWx1ZSkgOiBmdW5jO1xufSxcbiAgICBfY2xhbXAgPSBmdW5jdGlvbiBfY2xhbXAobWluLCBtYXgsIHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA8IG1pbiA/IG1pbiA6IHZhbHVlID4gbWF4ID8gbWF4IDogdmFsdWU7XG59LFxuICAgIGdldFVuaXQgPSBmdW5jdGlvbiBnZXRVbml0KHZhbHVlLCB2KSB7XG4gIHJldHVybiAhX2lzU3RyaW5nKHZhbHVlKSB8fCAhKHYgPSBfdW5pdEV4cC5leGVjKHZhbHVlKSkgPyBcIlwiIDogdlsxXTtcbn0sXG4gICAgLy8gbm90ZTogcHJvdGVjdCBhZ2FpbnN0IHBhZGRlZCBudW1iZXJzIGFzIHN0cmluZ3MsIGxpa2UgXCIxMDAuMTAwXCIuIFRoYXQgc2hvdWxkbid0IHJldHVybiBcIjAwXCIgYXMgdGhlIHVuaXQuIElmIGl0J3MgbnVtZXJpYywgcmV0dXJuIG5vIHVuaXQuXG5jbGFtcCA9IGZ1bmN0aW9uIGNsYW1wKG1pbiwgbWF4LCB2YWx1ZSkge1xuICByZXR1cm4gX2NvbmRpdGlvbmFsUmV0dXJuKHZhbHVlLCBmdW5jdGlvbiAodikge1xuICAgIHJldHVybiBfY2xhbXAobWluLCBtYXgsIHYpO1xuICB9KTtcbn0sXG4gICAgX3NsaWNlID0gW10uc2xpY2UsXG4gICAgX2lzQXJyYXlMaWtlID0gZnVuY3Rpb24gX2lzQXJyYXlMaWtlKHZhbHVlLCBub25FbXB0eSkge1xuICByZXR1cm4gdmFsdWUgJiYgX2lzT2JqZWN0KHZhbHVlKSAmJiBcImxlbmd0aFwiIGluIHZhbHVlICYmICghbm9uRW1wdHkgJiYgIXZhbHVlLmxlbmd0aCB8fCB2YWx1ZS5sZW5ndGggLSAxIGluIHZhbHVlICYmIF9pc09iamVjdCh2YWx1ZVswXSkpICYmICF2YWx1ZS5ub2RlVHlwZSAmJiB2YWx1ZSAhPT0gX3dpbjtcbn0sXG4gICAgX2ZsYXR0ZW4gPSBmdW5jdGlvbiBfZmxhdHRlbihhciwgbGVhdmVTdHJpbmdzLCBhY2N1bXVsYXRvcikge1xuICBpZiAoYWNjdW11bGF0b3IgPT09IHZvaWQgMCkge1xuICAgIGFjY3VtdWxhdG9yID0gW107XG4gIH1cblxuICByZXR1cm4gYXIuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB2YXIgX2FjY3VtdWxhdG9yO1xuXG4gICAgcmV0dXJuIF9pc1N0cmluZyh2YWx1ZSkgJiYgIWxlYXZlU3RyaW5ncyB8fCBfaXNBcnJheUxpa2UodmFsdWUsIDEpID8gKF9hY2N1bXVsYXRvciA9IGFjY3VtdWxhdG9yKS5wdXNoLmFwcGx5KF9hY2N1bXVsYXRvciwgdG9BcnJheSh2YWx1ZSkpIDogYWNjdW11bGF0b3IucHVzaCh2YWx1ZSk7XG4gIH0pIHx8IGFjY3VtdWxhdG9yO1xufSxcbiAgICAvL3Rha2VzIGFueSB2YWx1ZSBhbmQgcmV0dXJucyBhbiBhcnJheS4gSWYgaXQncyBhIHN0cmluZyAoYW5kIGxlYXZlU3RyaW5ncyBpc24ndCB0cnVlKSwgaXQnbGwgdXNlIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoKSBhbmQgY29udmVydCB0aGF0IHRvIGFuIGFycmF5LiBJdCdsbCBhbHNvIGFjY2VwdCBpdGVyYWJsZXMgbGlrZSBqUXVlcnkgb2JqZWN0cy5cbnRvQXJyYXkgPSBmdW5jdGlvbiB0b0FycmF5KHZhbHVlLCBzY29wZSwgbGVhdmVTdHJpbmdzKSB7XG4gIHJldHVybiBfY29udGV4dCAmJiAhc2NvcGUgJiYgX2NvbnRleHQuc2VsZWN0b3IgPyBfY29udGV4dC5zZWxlY3Rvcih2YWx1ZSkgOiBfaXNTdHJpbmcodmFsdWUpICYmICFsZWF2ZVN0cmluZ3MgJiYgKF9jb3JlSW5pdHRlZCB8fCAhX3dha2UoKSkgPyBfc2xpY2UuY2FsbCgoc2NvcGUgfHwgX2RvYykucXVlcnlTZWxlY3RvckFsbCh2YWx1ZSksIDApIDogX2lzQXJyYXkodmFsdWUpID8gX2ZsYXR0ZW4odmFsdWUsIGxlYXZlU3RyaW5ncykgOiBfaXNBcnJheUxpa2UodmFsdWUpID8gX3NsaWNlLmNhbGwodmFsdWUsIDApIDogdmFsdWUgPyBbdmFsdWVdIDogW107XG59LFxuICAgIHNlbGVjdG9yID0gZnVuY3Rpb24gc2VsZWN0b3IodmFsdWUpIHtcbiAgdmFsdWUgPSB0b0FycmF5KHZhbHVlKVswXSB8fCBfd2FybihcIkludmFsaWQgc2NvcGVcIikgfHwge307XG4gIHJldHVybiBmdW5jdGlvbiAodikge1xuICAgIHZhciBlbCA9IHZhbHVlLmN1cnJlbnQgfHwgdmFsdWUubmF0aXZlRWxlbWVudCB8fCB2YWx1ZTtcbiAgICByZXR1cm4gdG9BcnJheSh2LCBlbC5xdWVyeVNlbGVjdG9yQWxsID8gZWwgOiBlbCA9PT0gdmFsdWUgPyBfd2FybihcIkludmFsaWQgc2NvcGVcIikgfHwgX2RvYy5jcmVhdGVFbGVtZW50KFwiZGl2XCIpIDogdmFsdWUpO1xuICB9O1xufSxcbiAgICBzaHVmZmxlID0gZnVuY3Rpb24gc2h1ZmZsZShhKSB7XG4gIHJldHVybiBhLnNvcnQoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAuNSAtIE1hdGgucmFuZG9tKCk7XG4gIH0pO1xufSxcbiAgICAvLyBhbHRlcm5hdGl2ZSB0aGF0J3MgYSBiaXQgZmFzdGVyIGFuZCBtb3JlIHJlbGlhYmx5IGRpdmVyc2UgYnV0IGJpZ2dlcjogICBmb3IgKGxldCBqLCB2LCBpID0gYS5sZW5ndGg7IGk7IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKSwgdiA9IGFbLS1pXSwgYVtpXSA9IGFbal0sIGFbal0gPSB2KTsgcmV0dXJuIGE7XG4vL2ZvciBkaXN0cmlidXRpbmcgdmFsdWVzIGFjcm9zcyBhbiBhcnJheS4gQ2FuIGFjY2VwdCBhIG51bWJlciwgYSBmdW5jdGlvbiBvciAobW9zdCBjb21tb25seSkgYSBmdW5jdGlvbiB3aGljaCBjYW4gY29udGFpbiB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6IHtiYXNlLCBhbW91bnQsIGZyb20sIGVhc2UsIGdyaWQsIGF4aXMsIGxlbmd0aCwgZWFjaH0uIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGV4cGVjdHMgdGhlIGZvbGxvd2luZyBwYXJhbWV0ZXJzOiBpbmRleCwgdGFyZ2V0LCBhcnJheS4gUmVjb2duaXplcyB0aGUgZm9sbG93aW5nXG5kaXN0cmlidXRlID0gZnVuY3Rpb24gZGlzdHJpYnV0ZSh2KSB7XG4gIGlmIChfaXNGdW5jdGlvbih2KSkge1xuICAgIHJldHVybiB2O1xuICB9XG5cbiAgdmFyIHZhcnMgPSBfaXNPYmplY3QodikgPyB2IDoge1xuICAgIGVhY2g6IHZcbiAgfSxcbiAgICAgIC8vbjoxIGlzIGp1c3QgdG8gaW5kaWNhdGUgdiB3YXMgYSBudW1iZXI7IHdlIGxldmVyYWdlIHRoYXQgbGF0ZXIgdG8gc2V0IHYgYWNjb3JkaW5nIHRvIHRoZSBsZW5ndGggd2UgZ2V0LiBJZiBhIG51bWJlciBpcyBwYXNzZWQgaW4sIHdlIHRyZWF0IGl0IGxpa2UgdGhlIG9sZCBzdGFnZ2VyIHZhbHVlIHdoZXJlIDAuMSwgZm9yIGV4YW1wbGUsIHdvdWxkIG1lYW4gdGhhdCB0aGluZ3Mgd291bGQgYmUgZGlzdHJpYnV0ZWQgd2l0aCAwLjEgYmV0d2VlbiBlYWNoIGVsZW1lbnQgaW4gdGhlIGFycmF5IHJhdGhlciB0aGFuIGEgdG90YWwgXCJhbW91bnRcIiB0aGF0J3MgY2h1bmtlZCBvdXQgYW1vbmcgdGhlbSBhbGwuXG4gIGVhc2UgPSBfcGFyc2VFYXNlKHZhcnMuZWFzZSksXG4gICAgICBmcm9tID0gdmFycy5mcm9tIHx8IDAsXG4gICAgICBiYXNlID0gcGFyc2VGbG9hdCh2YXJzLmJhc2UpIHx8IDAsXG4gICAgICBjYWNoZSA9IHt9LFxuICAgICAgaXNEZWNpbWFsID0gZnJvbSA+IDAgJiYgZnJvbSA8IDEsXG4gICAgICByYXRpb3MgPSBpc05hTihmcm9tKSB8fCBpc0RlY2ltYWwsXG4gICAgICBheGlzID0gdmFycy5heGlzLFxuICAgICAgcmF0aW9YID0gZnJvbSxcbiAgICAgIHJhdGlvWSA9IGZyb207XG5cbiAgaWYgKF9pc1N0cmluZyhmcm9tKSkge1xuICAgIHJhdGlvWCA9IHJhdGlvWSA9IHtcbiAgICAgIGNlbnRlcjogLjUsXG4gICAgICBlZGdlczogLjUsXG4gICAgICBlbmQ6IDFcbiAgICB9W2Zyb21dIHx8IDA7XG4gIH0gZWxzZSBpZiAoIWlzRGVjaW1hbCAmJiByYXRpb3MpIHtcbiAgICByYXRpb1ggPSBmcm9tWzBdO1xuICAgIHJhdGlvWSA9IGZyb21bMV07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGksIHRhcmdldCwgYSkge1xuICAgIHZhciBsID0gKGEgfHwgdmFycykubGVuZ3RoLFxuICAgICAgICBkaXN0YW5jZXMgPSBjYWNoZVtsXSxcbiAgICAgICAgb3JpZ2luWCxcbiAgICAgICAgb3JpZ2luWSxcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgZCxcbiAgICAgICAgaixcbiAgICAgICAgbWF4LFxuICAgICAgICBtaW4sXG4gICAgICAgIHdyYXBBdDtcblxuICAgIGlmICghZGlzdGFuY2VzKSB7XG4gICAgICB3cmFwQXQgPSB2YXJzLmdyaWQgPT09IFwiYXV0b1wiID8gMCA6ICh2YXJzLmdyaWQgfHwgWzEsIF9iaWdOdW1dKVsxXTtcblxuICAgICAgaWYgKCF3cmFwQXQpIHtcbiAgICAgICAgbWF4ID0gLV9iaWdOdW07XG5cbiAgICAgICAgd2hpbGUgKG1heCA8IChtYXggPSBhW3dyYXBBdCsrXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0KSAmJiB3cmFwQXQgPCBsKSB7fVxuXG4gICAgICAgIHdyYXBBdC0tO1xuICAgICAgfVxuXG4gICAgICBkaXN0YW5jZXMgPSBjYWNoZVtsXSA9IFtdO1xuICAgICAgb3JpZ2luWCA9IHJhdGlvcyA/IE1hdGgubWluKHdyYXBBdCwgbCkgKiByYXRpb1ggLSAuNSA6IGZyb20gJSB3cmFwQXQ7XG4gICAgICBvcmlnaW5ZID0gd3JhcEF0ID09PSBfYmlnTnVtID8gMCA6IHJhdGlvcyA/IGwgKiByYXRpb1kgLyB3cmFwQXQgLSAuNSA6IGZyb20gLyB3cmFwQXQgfCAwO1xuICAgICAgbWF4ID0gMDtcbiAgICAgIG1pbiA9IF9iaWdOdW07XG5cbiAgICAgIGZvciAoaiA9IDA7IGogPCBsOyBqKyspIHtcbiAgICAgICAgeCA9IGogJSB3cmFwQXQgLSBvcmlnaW5YO1xuICAgICAgICB5ID0gb3JpZ2luWSAtIChqIC8gd3JhcEF0IHwgMCk7XG4gICAgICAgIGRpc3RhbmNlc1tqXSA9IGQgPSAhYXhpcyA/IF9zcXJ0KHggKiB4ICsgeSAqIHkpIDogTWF0aC5hYnMoYXhpcyA9PT0gXCJ5XCIgPyB5IDogeCk7XG4gICAgICAgIGQgPiBtYXggJiYgKG1heCA9IGQpO1xuICAgICAgICBkIDwgbWluICYmIChtaW4gPSBkKTtcbiAgICAgIH1cblxuICAgICAgZnJvbSA9PT0gXCJyYW5kb21cIiAmJiBzaHVmZmxlKGRpc3RhbmNlcyk7XG4gICAgICBkaXN0YW5jZXMubWF4ID0gbWF4IC0gbWluO1xuICAgICAgZGlzdGFuY2VzLm1pbiA9IG1pbjtcbiAgICAgIGRpc3RhbmNlcy52ID0gbCA9IChwYXJzZUZsb2F0KHZhcnMuYW1vdW50KSB8fCBwYXJzZUZsb2F0KHZhcnMuZWFjaCkgKiAod3JhcEF0ID4gbCA/IGwgLSAxIDogIWF4aXMgPyBNYXRoLm1heCh3cmFwQXQsIGwgLyB3cmFwQXQpIDogYXhpcyA9PT0gXCJ5XCIgPyBsIC8gd3JhcEF0IDogd3JhcEF0KSB8fCAwKSAqIChmcm9tID09PSBcImVkZ2VzXCIgPyAtMSA6IDEpO1xuICAgICAgZGlzdGFuY2VzLmIgPSBsIDwgMCA/IGJhc2UgLSBsIDogYmFzZTtcbiAgICAgIGRpc3RhbmNlcy51ID0gZ2V0VW5pdCh2YXJzLmFtb3VudCB8fCB2YXJzLmVhY2gpIHx8IDA7IC8vdW5pdFxuXG4gICAgICBlYXNlID0gZWFzZSAmJiBsIDwgMCA/IF9pbnZlcnRFYXNlKGVhc2UpIDogZWFzZTtcbiAgICB9XG5cbiAgICBsID0gKGRpc3RhbmNlc1tpXSAtIGRpc3RhbmNlcy5taW4pIC8gZGlzdGFuY2VzLm1heCB8fCAwO1xuICAgIHJldHVybiBfcm91bmRQcmVjaXNlKGRpc3RhbmNlcy5iICsgKGVhc2UgPyBlYXNlKGwpIDogbCkgKiBkaXN0YW5jZXMudikgKyBkaXN0YW5jZXMudTsgLy9yb3VuZCBpbiBvcmRlciB0byB3b3JrIGFyb3VuZCBmbG9hdGluZyBwb2ludCBlcnJvcnNcbiAgfTtcbn0sXG4gICAgX3JvdW5kTW9kaWZpZXIgPSBmdW5jdGlvbiBfcm91bmRNb2RpZmllcih2KSB7XG4gIC8vcGFzcyBpbiAwLjEgZ2V0IGEgZnVuY3Rpb24gdGhhdCdsbCByb3VuZCB0byB0aGUgbmVhcmVzdCB0ZW50aCwgb3IgNSB0byByb3VuZCB0byB0aGUgY2xvc2VzdCA1LCBvciAwLjAwMSB0byB0aGUgY2xvc2VzdCAxMDAwdGgsIGV0Yy5cbiAgdmFyIHAgPSBNYXRoLnBvdygxMCwgKCh2ICsgXCJcIikuc3BsaXQoXCIuXCIpWzFdIHx8IFwiXCIpLmxlbmd0aCk7IC8vdG8gYXZvaWQgZmxvYXRpbmcgcG9pbnQgbWF0aCBlcnJvcnMgKGxpa2UgMjQgKiAwLjEgPT0gMi40MDAwMDAwMDAwMDAwMDA0KSwgd2UgY2hvcCBvZmYgYXQgYSBzcGVjaWZpYyBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMgKG11Y2ggZmFzdGVyIHRoYW4gdG9GaXhlZCgpKVxuXG4gIHJldHVybiBmdW5jdGlvbiAocmF3KSB7XG4gICAgdmFyIG4gPSBfcm91bmRQcmVjaXNlKE1hdGgucm91bmQocGFyc2VGbG9hdChyYXcpIC8gdikgKiB2ICogcCk7XG5cbiAgICByZXR1cm4gKG4gLSBuICUgMSkgLyBwICsgKF9pc051bWJlcihyYXcpID8gMCA6IGdldFVuaXQocmF3KSk7IC8vIG4gLSBuICUgMSByZXBsYWNlcyBNYXRoLmZsb29yKCkgaW4gb3JkZXIgdG8gaGFuZGxlIG5lZ2F0aXZlIHZhbHVlcyBwcm9wZXJseS4gRm9yIGV4YW1wbGUsIE1hdGguZmxvb3IoLTE1MC4wMDAwMDAwMDAwMDAwMykgaXMgMTUxIVxuICB9O1xufSxcbiAgICBzbmFwID0gZnVuY3Rpb24gc25hcChzbmFwVG8sIHZhbHVlKSB7XG4gIHZhciBpc0FycmF5ID0gX2lzQXJyYXkoc25hcFRvKSxcbiAgICAgIHJhZGl1cyxcbiAgICAgIGlzMkQ7XG5cbiAgaWYgKCFpc0FycmF5ICYmIF9pc09iamVjdChzbmFwVG8pKSB7XG4gICAgcmFkaXVzID0gaXNBcnJheSA9IHNuYXBUby5yYWRpdXMgfHwgX2JpZ051bTtcblxuICAgIGlmIChzbmFwVG8udmFsdWVzKSB7XG4gICAgICBzbmFwVG8gPSB0b0FycmF5KHNuYXBUby52YWx1ZXMpO1xuXG4gICAgICBpZiAoaXMyRCA9ICFfaXNOdW1iZXIoc25hcFRvWzBdKSkge1xuICAgICAgICByYWRpdXMgKj0gcmFkaXVzOyAvL3BlcmZvcm1hbmNlIG9wdGltaXphdGlvbiBzbyB3ZSBkb24ndCBoYXZlIHRvIE1hdGguc3FydCgpIGluIHRoZSBsb29wLlxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzbmFwVG8gPSBfcm91bmRNb2RpZmllcihzbmFwVG8uaW5jcmVtZW50KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gX2NvbmRpdGlvbmFsUmV0dXJuKHZhbHVlLCAhaXNBcnJheSA/IF9yb3VuZE1vZGlmaWVyKHNuYXBUbykgOiBfaXNGdW5jdGlvbihzbmFwVG8pID8gZnVuY3Rpb24gKHJhdykge1xuICAgIGlzMkQgPSBzbmFwVG8ocmF3KTtcbiAgICByZXR1cm4gTWF0aC5hYnMoaXMyRCAtIHJhdykgPD0gcmFkaXVzID8gaXMyRCA6IHJhdztcbiAgfSA6IGZ1bmN0aW9uIChyYXcpIHtcbiAgICB2YXIgeCA9IHBhcnNlRmxvYXQoaXMyRCA/IHJhdy54IDogcmF3KSxcbiAgICAgICAgeSA9IHBhcnNlRmxvYXQoaXMyRCA/IHJhdy55IDogMCksXG4gICAgICAgIG1pbiA9IF9iaWdOdW0sXG4gICAgICAgIGNsb3Nlc3QgPSAwLFxuICAgICAgICBpID0gc25hcFRvLmxlbmd0aCxcbiAgICAgICAgZHgsXG4gICAgICAgIGR5O1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaWYgKGlzMkQpIHtcbiAgICAgICAgZHggPSBzbmFwVG9baV0ueCAtIHg7XG4gICAgICAgIGR5ID0gc25hcFRvW2ldLnkgLSB5O1xuICAgICAgICBkeCA9IGR4ICogZHggKyBkeSAqIGR5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZHggPSBNYXRoLmFicyhzbmFwVG9baV0gLSB4KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGR4IDwgbWluKSB7XG4gICAgICAgIG1pbiA9IGR4O1xuICAgICAgICBjbG9zZXN0ID0gaTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9zZXN0ID0gIXJhZGl1cyB8fCBtaW4gPD0gcmFkaXVzID8gc25hcFRvW2Nsb3Nlc3RdIDogcmF3O1xuICAgIHJldHVybiBpczJEIHx8IGNsb3Nlc3QgPT09IHJhdyB8fCBfaXNOdW1iZXIocmF3KSA/IGNsb3Nlc3QgOiBjbG9zZXN0ICsgZ2V0VW5pdChyYXcpO1xuICB9KTtcbn0sXG4gICAgcmFuZG9tID0gZnVuY3Rpb24gcmFuZG9tKG1pbiwgbWF4LCByb3VuZGluZ0luY3JlbWVudCwgcmV0dXJuRnVuY3Rpb24pIHtcbiAgcmV0dXJuIF9jb25kaXRpb25hbFJldHVybihfaXNBcnJheShtaW4pID8gIW1heCA6IHJvdW5kaW5nSW5jcmVtZW50ID09PSB0cnVlID8gISEocm91bmRpbmdJbmNyZW1lbnQgPSAwKSA6ICFyZXR1cm5GdW5jdGlvbiwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfaXNBcnJheShtaW4pID8gbWluW35+KE1hdGgucmFuZG9tKCkgKiBtaW4ubGVuZ3RoKV0gOiAocm91bmRpbmdJbmNyZW1lbnQgPSByb3VuZGluZ0luY3JlbWVudCB8fCAxZS01KSAmJiAocmV0dXJuRnVuY3Rpb24gPSByb3VuZGluZ0luY3JlbWVudCA8IDEgPyBNYXRoLnBvdygxMCwgKHJvdW5kaW5nSW5jcmVtZW50ICsgXCJcIikubGVuZ3RoIC0gMikgOiAxKSAmJiBNYXRoLmZsb29yKE1hdGgucm91bmQoKG1pbiAtIHJvdW5kaW5nSW5jcmVtZW50IC8gMiArIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgcm91bmRpbmdJbmNyZW1lbnQgKiAuOTkpKSAvIHJvdW5kaW5nSW5jcmVtZW50KSAqIHJvdW5kaW5nSW5jcmVtZW50ICogcmV0dXJuRnVuY3Rpb24pIC8gcmV0dXJuRnVuY3Rpb247XG4gIH0pO1xufSxcbiAgICBwaXBlID0gZnVuY3Rpb24gcGlwZSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGZ1bmN0aW9ucyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBmdW5jdGlvbnNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9ucy5yZWR1Y2UoZnVuY3Rpb24gKHYsIGYpIHtcbiAgICAgIHJldHVybiBmKHYpO1xuICAgIH0sIHZhbHVlKTtcbiAgfTtcbn0sXG4gICAgdW5pdGl6ZSA9IGZ1bmN0aW9uIHVuaXRpemUoZnVuYywgdW5pdCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmMocGFyc2VGbG9hdCh2YWx1ZSkpICsgKHVuaXQgfHwgZ2V0VW5pdCh2YWx1ZSkpO1xuICB9O1xufSxcbiAgICBub3JtYWxpemUgPSBmdW5jdGlvbiBub3JtYWxpemUobWluLCBtYXgsIHZhbHVlKSB7XG4gIHJldHVybiBtYXBSYW5nZShtaW4sIG1heCwgMCwgMSwgdmFsdWUpO1xufSxcbiAgICBfd3JhcEFycmF5ID0gZnVuY3Rpb24gX3dyYXBBcnJheShhLCB3cmFwcGVyLCB2YWx1ZSkge1xuICByZXR1cm4gX2NvbmRpdGlvbmFsUmV0dXJuKHZhbHVlLCBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICByZXR1cm4gYVt+fndyYXBwZXIoaW5kZXgpXTtcbiAgfSk7XG59LFxuICAgIHdyYXAgPSBmdW5jdGlvbiB3cmFwKG1pbiwgbWF4LCB2YWx1ZSkge1xuICAvLyBOT1RFOiB3cmFwKCkgQ0FOTk9UIGJlIGFuIGFycm93IGZ1bmN0aW9uISBBIHZlcnkgb2RkIGNvbXBpbGluZyBidWcgY2F1c2VzIHByb2JsZW1zICh1bnJlbGF0ZWQgdG8gR1NBUCkuXG4gIHZhciByYW5nZSA9IG1heCAtIG1pbjtcbiAgcmV0dXJuIF9pc0FycmF5KG1pbikgPyBfd3JhcEFycmF5KG1pbiwgd3JhcCgwLCBtaW4ubGVuZ3RoKSwgbWF4KSA6IF9jb25kaXRpb25hbFJldHVybih2YWx1ZSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIChyYW5nZSArICh2YWx1ZSAtIG1pbikgJSByYW5nZSkgJSByYW5nZSArIG1pbjtcbiAgfSk7XG59LFxuICAgIHdyYXBZb3lvID0gZnVuY3Rpb24gd3JhcFlveW8obWluLCBtYXgsIHZhbHVlKSB7XG4gIHZhciByYW5nZSA9IG1heCAtIG1pbixcbiAgICAgIHRvdGFsID0gcmFuZ2UgKiAyO1xuICByZXR1cm4gX2lzQXJyYXkobWluKSA/IF93cmFwQXJyYXkobWluLCB3cmFwWW95bygwLCBtaW4ubGVuZ3RoIC0gMSksIG1heCkgOiBfY29uZGl0aW9uYWxSZXR1cm4odmFsdWUsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHZhbHVlID0gKHRvdGFsICsgKHZhbHVlIC0gbWluKSAlIHRvdGFsKSAlIHRvdGFsIHx8IDA7XG4gICAgcmV0dXJuIG1pbiArICh2YWx1ZSA+IHJhbmdlID8gdG90YWwgLSB2YWx1ZSA6IHZhbHVlKTtcbiAgfSk7XG59LFxuICAgIF9yZXBsYWNlUmFuZG9tID0gZnVuY3Rpb24gX3JlcGxhY2VSYW5kb20odmFsdWUpIHtcbiAgLy9yZXBsYWNlcyBhbGwgb2NjdXJyZW5jZXMgb2YgcmFuZG9tKC4uLikgaW4gYSBzdHJpbmcgd2l0aCB0aGUgY2FsY3VsYXRlZCByYW5kb20gdmFsdWUuIGNhbiBiZSBhIHJhbmdlIGxpa2UgcmFuZG9tKC0xMDAsIDEwMCwgNSkgb3IgYW4gYXJyYXkgbGlrZSByYW5kb20oWzAsIDEwMCwgNTAwXSlcbiAgdmFyIHByZXYgPSAwLFxuICAgICAgcyA9IFwiXCIsXG4gICAgICBpLFxuICAgICAgbnVtcyxcbiAgICAgIGVuZCxcbiAgICAgIGlzQXJyYXk7XG5cbiAgd2hpbGUgKH4oaSA9IHZhbHVlLmluZGV4T2YoXCJyYW5kb20oXCIsIHByZXYpKSkge1xuICAgIGVuZCA9IHZhbHVlLmluZGV4T2YoXCIpXCIsIGkpO1xuICAgIGlzQXJyYXkgPSB2YWx1ZS5jaGFyQXQoaSArIDcpID09PSBcIltcIjtcbiAgICBudW1zID0gdmFsdWUuc3Vic3RyKGkgKyA3LCBlbmQgLSBpIC0gNykubWF0Y2goaXNBcnJheSA/IF9kZWxpbWl0ZWRWYWx1ZUV4cCA6IF9zdHJpY3ROdW1FeHApO1xuICAgIHMgKz0gdmFsdWUuc3Vic3RyKHByZXYsIGkgLSBwcmV2KSArIHJhbmRvbShpc0FycmF5ID8gbnVtcyA6ICtudW1zWzBdLCBpc0FycmF5ID8gMCA6ICtudW1zWzFdLCArbnVtc1syXSB8fCAxZS01KTtcbiAgICBwcmV2ID0gZW5kICsgMTtcbiAgfVxuXG4gIHJldHVybiBzICsgdmFsdWUuc3Vic3RyKHByZXYsIHZhbHVlLmxlbmd0aCAtIHByZXYpO1xufSxcbiAgICBtYXBSYW5nZSA9IGZ1bmN0aW9uIG1hcFJhbmdlKGluTWluLCBpbk1heCwgb3V0TWluLCBvdXRNYXgsIHZhbHVlKSB7XG4gIHZhciBpblJhbmdlID0gaW5NYXggLSBpbk1pbixcbiAgICAgIG91dFJhbmdlID0gb3V0TWF4IC0gb3V0TWluO1xuICByZXR1cm4gX2NvbmRpdGlvbmFsUmV0dXJuKHZhbHVlLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gb3V0TWluICsgKCh2YWx1ZSAtIGluTWluKSAvIGluUmFuZ2UgKiBvdXRSYW5nZSB8fCAwKTtcbiAgfSk7XG59LFxuICAgIGludGVycG9sYXRlID0gZnVuY3Rpb24gaW50ZXJwb2xhdGUoc3RhcnQsIGVuZCwgcHJvZ3Jlc3MsIG11dGF0ZSkge1xuICB2YXIgZnVuYyA9IGlzTmFOKHN0YXJ0ICsgZW5kKSA/IDAgOiBmdW5jdGlvbiAocCkge1xuICAgIHJldHVybiAoMSAtIHApICogc3RhcnQgKyBwICogZW5kO1xuICB9O1xuXG4gIGlmICghZnVuYykge1xuICAgIHZhciBpc1N0cmluZyA9IF9pc1N0cmluZyhzdGFydCksXG4gICAgICAgIG1hc3RlciA9IHt9LFxuICAgICAgICBwLFxuICAgICAgICBpLFxuICAgICAgICBpbnRlcnBvbGF0b3JzLFxuICAgICAgICBsLFxuICAgICAgICBpbDtcblxuICAgIHByb2dyZXNzID09PSB0cnVlICYmIChtdXRhdGUgPSAxKSAmJiAocHJvZ3Jlc3MgPSBudWxsKTtcblxuICAgIGlmIChpc1N0cmluZykge1xuICAgICAgc3RhcnQgPSB7XG4gICAgICAgIHA6IHN0YXJ0XG4gICAgICB9O1xuICAgICAgZW5kID0ge1xuICAgICAgICBwOiBlbmRcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChfaXNBcnJheShzdGFydCkgJiYgIV9pc0FycmF5KGVuZCkpIHtcbiAgICAgIGludGVycG9sYXRvcnMgPSBbXTtcbiAgICAgIGwgPSBzdGFydC5sZW5ndGg7XG4gICAgICBpbCA9IGwgLSAyO1xuXG4gICAgICBmb3IgKGkgPSAxOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGludGVycG9sYXRvcnMucHVzaChpbnRlcnBvbGF0ZShzdGFydFtpIC0gMV0sIHN0YXJ0W2ldKSk7IC8vYnVpbGQgdGhlIGludGVycG9sYXRvcnMgdXAgZnJvbnQgYXMgYSBwZXJmb3JtYW5jZSBvcHRpbWl6YXRpb24gc28gdGhhdCB3aGVuIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgbWFueSB0aW1lcywgaXQgY2FuIGp1c3QgcmV1c2UgdGhlbS5cbiAgICAgIH1cblxuICAgICAgbC0tO1xuXG4gICAgICBmdW5jID0gZnVuY3Rpb24gZnVuYyhwKSB7XG4gICAgICAgIHAgKj0gbDtcbiAgICAgICAgdmFyIGkgPSBNYXRoLm1pbihpbCwgfn5wKTtcbiAgICAgICAgcmV0dXJuIGludGVycG9sYXRvcnNbaV0ocCAtIGkpO1xuICAgICAgfTtcblxuICAgICAgcHJvZ3Jlc3MgPSBlbmQ7XG4gICAgfSBlbHNlIGlmICghbXV0YXRlKSB7XG4gICAgICBzdGFydCA9IF9tZXJnZShfaXNBcnJheShzdGFydCkgPyBbXSA6IHt9LCBzdGFydCk7XG4gICAgfVxuXG4gICAgaWYgKCFpbnRlcnBvbGF0b3JzKSB7XG4gICAgICBmb3IgKHAgaW4gZW5kKSB7XG4gICAgICAgIF9hZGRQcm9wVHdlZW4uY2FsbChtYXN0ZXIsIHN0YXJ0LCBwLCBcImdldFwiLCBlbmRbcF0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jID0gZnVuY3Rpb24gZnVuYyhwKSB7XG4gICAgICAgIHJldHVybiBfcmVuZGVyUHJvcFR3ZWVucyhwLCBtYXN0ZXIpIHx8IChpc1N0cmluZyA/IHN0YXJ0LnAgOiBzdGFydCk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfY29uZGl0aW9uYWxSZXR1cm4ocHJvZ3Jlc3MsIGZ1bmMpO1xufSxcbiAgICBfZ2V0TGFiZWxJbkRpcmVjdGlvbiA9IGZ1bmN0aW9uIF9nZXRMYWJlbEluRGlyZWN0aW9uKHRpbWVsaW5lLCBmcm9tVGltZSwgYmFja3dhcmQpIHtcbiAgLy91c2VkIGZvciBuZXh0TGFiZWwoKSBhbmQgcHJldmlvdXNMYWJlbCgpXG4gIHZhciBsYWJlbHMgPSB0aW1lbGluZS5sYWJlbHMsXG4gICAgICBtaW4gPSBfYmlnTnVtLFxuICAgICAgcCxcbiAgICAgIGRpc3RhbmNlLFxuICAgICAgbGFiZWw7XG5cbiAgZm9yIChwIGluIGxhYmVscykge1xuICAgIGRpc3RhbmNlID0gbGFiZWxzW3BdIC0gZnJvbVRpbWU7XG5cbiAgICBpZiAoZGlzdGFuY2UgPCAwID09PSAhIWJhY2t3YXJkICYmIGRpc3RhbmNlICYmIG1pbiA+IChkaXN0YW5jZSA9IE1hdGguYWJzKGRpc3RhbmNlKSkpIHtcbiAgICAgIGxhYmVsID0gcDtcbiAgICAgIG1pbiA9IGRpc3RhbmNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBsYWJlbDtcbn0sXG4gICAgX2NhbGxiYWNrID0gZnVuY3Rpb24gX2NhbGxiYWNrKGFuaW1hdGlvbiwgdHlwZSwgZXhlY3V0ZUxhenlGaXJzdCkge1xuICB2YXIgdiA9IGFuaW1hdGlvbi52YXJzLFxuICAgICAgY2FsbGJhY2sgPSB2W3R5cGVdLFxuICAgICAgcHJldkNvbnRleHQgPSBfY29udGV4dCxcbiAgICAgIGNvbnRleHQgPSBhbmltYXRpb24uX2N0eCxcbiAgICAgIHBhcmFtcyxcbiAgICAgIHNjb3BlLFxuICAgICAgcmVzdWx0O1xuXG4gIGlmICghY2FsbGJhY2spIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBwYXJhbXMgPSB2W3R5cGUgKyBcIlBhcmFtc1wiXTtcbiAgc2NvcGUgPSB2LmNhbGxiYWNrU2NvcGUgfHwgYW5pbWF0aW9uO1xuICBleGVjdXRlTGF6eUZpcnN0ICYmIF9sYXp5VHdlZW5zLmxlbmd0aCAmJiBfbGF6eVJlbmRlcigpOyAvL2luIGNhc2UgcmVuZGVyaW5nIGNhdXNlZCBhbnkgdHdlZW5zIHRvIGxhenktaW5pdCwgd2Ugc2hvdWxkIHJlbmRlciB0aGVtIGJlY2F1c2UgdHlwaWNhbGx5IHdoZW4gYSB0aW1lbGluZSBmaW5pc2hlcywgdXNlcnMgZXhwZWN0IHRoaW5ncyB0byBoYXZlIHJlbmRlcmVkIGZ1bGx5LiBJbWFnaW5lIGFuIG9uVXBkYXRlIG9uIGEgdGltZWxpbmUgdGhhdCByZXBvcnRzL2NoZWNrcyB0d2VlbmVkIHZhbHVlcy5cblxuICBjb250ZXh0ICYmIChfY29udGV4dCA9IGNvbnRleHQpO1xuICByZXN1bHQgPSBwYXJhbXMgPyBjYWxsYmFjay5hcHBseShzY29wZSwgcGFyYW1zKSA6IGNhbGxiYWNrLmNhbGwoc2NvcGUpO1xuICBfY29udGV4dCA9IHByZXZDb250ZXh0O1xuICByZXR1cm4gcmVzdWx0O1xufSxcbiAgICBfaW50ZXJydXB0ID0gZnVuY3Rpb24gX2ludGVycnVwdChhbmltYXRpb24pIHtcbiAgX3JlbW92ZUZyb21QYXJlbnQoYW5pbWF0aW9uKTtcblxuICBhbmltYXRpb24uc2Nyb2xsVHJpZ2dlciAmJiBhbmltYXRpb24uc2Nyb2xsVHJpZ2dlci5raWxsKCEhX3JldmVydGluZyk7XG4gIGFuaW1hdGlvbi5wcm9ncmVzcygpIDwgMSAmJiBfY2FsbGJhY2soYW5pbWF0aW9uLCBcIm9uSW50ZXJydXB0XCIpO1xuICByZXR1cm4gYW5pbWF0aW9uO1xufSxcbiAgICBfcXVpY2tUd2VlbixcbiAgICBfcmVnaXN0ZXJQbHVnaW5RdWV1ZSA9IFtdLFxuICAgIF9jcmVhdGVQbHVnaW4gPSBmdW5jdGlvbiBfY3JlYXRlUGx1Z2luKGNvbmZpZykge1xuICBpZiAoX3dpbmRvd0V4aXN0cygpICYmIGNvbmZpZykge1xuICAgIC8vIGVkZ2UgY2FzZTogc29tZSBidWlsZCB0b29scyBtYXkgcGFzcyBpbiBhIG51bGwvdW5kZWZpbmVkIHZhbHVlXG4gICAgY29uZmlnID0gIWNvbmZpZy5uYW1lICYmIGNvbmZpZ1tcImRlZmF1bHRcIl0gfHwgY29uZmlnOyAvL1VNRCBwYWNrYWdpbmcgd3JhcHMgdGhpbmdzIG9kZGx5LCBzbyBmb3IgZXhhbXBsZSBNb3Rpb25QYXRoSGVscGVyIGJlY29tZXMge01vdGlvblBhdGhIZWxwZXI6TW90aW9uUGF0aEhlbHBlciwgZGVmYXVsdDpNb3Rpb25QYXRoSGVscGVyfS5cblxuICAgIHZhciBuYW1lID0gY29uZmlnLm5hbWUsXG4gICAgICAgIGlzRnVuYyA9IF9pc0Z1bmN0aW9uKGNvbmZpZyksXG4gICAgICAgIFBsdWdpbiA9IG5hbWUgJiYgIWlzRnVuYyAmJiBjb25maWcuaW5pdCA/IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuX3Byb3BzID0gW107XG4gICAgfSA6IGNvbmZpZyxcbiAgICAgICAgLy9pbiBjYXNlIHNvbWVvbmUgcGFzc2VzIGluIGFuIG9iamVjdCB0aGF0J3Mgbm90IGEgcGx1Z2luLCBsaWtlIEN1c3RvbUVhc2VcbiAgICBpbnN0YW5jZURlZmF1bHRzID0ge1xuICAgICAgaW5pdDogX2VtcHR5RnVuYyxcbiAgICAgIHJlbmRlcjogX3JlbmRlclByb3BUd2VlbnMsXG4gICAgICBhZGQ6IF9hZGRQcm9wVHdlZW4sXG4gICAgICBraWxsOiBfa2lsbFByb3BUd2VlbnNPZixcbiAgICAgIG1vZGlmaWVyOiBfYWRkUGx1Z2luTW9kaWZpZXIsXG4gICAgICByYXdWYXJzOiAwXG4gICAgfSxcbiAgICAgICAgc3RhdGljcyA9IHtcbiAgICAgIHRhcmdldFRlc3Q6IDAsXG4gICAgICBnZXQ6IDAsXG4gICAgICBnZXRTZXR0ZXI6IF9nZXRTZXR0ZXIsXG4gICAgICBhbGlhc2VzOiB7fSxcbiAgICAgIHJlZ2lzdGVyOiAwXG4gICAgfTtcblxuICAgIF93YWtlKCk7XG5cbiAgICBpZiAoY29uZmlnICE9PSBQbHVnaW4pIHtcbiAgICAgIGlmIChfcGx1Z2luc1tuYW1lXSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIF9zZXREZWZhdWx0cyhQbHVnaW4sIF9zZXREZWZhdWx0cyhfY29weUV4Y2x1ZGluZyhjb25maWcsIGluc3RhbmNlRGVmYXVsdHMpLCBzdGF0aWNzKSk7IC8vc3RhdGljIG1ldGhvZHNcblxuXG4gICAgICBfbWVyZ2UoUGx1Z2luLnByb3RvdHlwZSwgX21lcmdlKGluc3RhbmNlRGVmYXVsdHMsIF9jb3B5RXhjbHVkaW5nKGNvbmZpZywgc3RhdGljcykpKTsgLy9pbnN0YW5jZSBtZXRob2RzXG5cblxuICAgICAgX3BsdWdpbnNbUGx1Z2luLnByb3AgPSBuYW1lXSA9IFBsdWdpbjtcblxuICAgICAgaWYgKGNvbmZpZy50YXJnZXRUZXN0KSB7XG4gICAgICAgIF9oYXJuZXNzUGx1Z2lucy5wdXNoKFBsdWdpbik7XG5cbiAgICAgICAgX3Jlc2VydmVkUHJvcHNbbmFtZV0gPSAxO1xuICAgICAgfVxuXG4gICAgICBuYW1lID0gKG5hbWUgPT09IFwiY3NzXCIgPyBcIkNTU1wiIDogbmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG5hbWUuc3Vic3RyKDEpKSArIFwiUGx1Z2luXCI7IC8vZm9yIHRoZSBnbG9iYWwgbmFtZS4gXCJtb3Rpb25QYXRoXCIgc2hvdWxkIGJlY29tZSBNb3Rpb25QYXRoUGx1Z2luXG4gICAgfVxuXG4gICAgX2FkZEdsb2JhbChuYW1lLCBQbHVnaW4pO1xuXG4gICAgY29uZmlnLnJlZ2lzdGVyICYmIGNvbmZpZy5yZWdpc3Rlcihnc2FwLCBQbHVnaW4sIFByb3BUd2Vlbik7XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnICYmIF9yZWdpc3RlclBsdWdpblF1ZXVlLnB1c2goY29uZmlnKTtcbiAgfVxufSxcblxuLypcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDT0xPUlNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cbl8yNTUgPSAyNTUsXG4gICAgX2NvbG9yTG9va3VwID0ge1xuICBhcXVhOiBbMCwgXzI1NSwgXzI1NV0sXG4gIGxpbWU6IFswLCBfMjU1LCAwXSxcbiAgc2lsdmVyOiBbMTkyLCAxOTIsIDE5Ml0sXG4gIGJsYWNrOiBbMCwgMCwgMF0sXG4gIG1hcm9vbjogWzEyOCwgMCwgMF0sXG4gIHRlYWw6IFswLCAxMjgsIDEyOF0sXG4gIGJsdWU6IFswLCAwLCBfMjU1XSxcbiAgbmF2eTogWzAsIDAsIDEyOF0sXG4gIHdoaXRlOiBbXzI1NSwgXzI1NSwgXzI1NV0sXG4gIG9saXZlOiBbMTI4LCAxMjgsIDBdLFxuICB5ZWxsb3c6IFtfMjU1LCBfMjU1LCAwXSxcbiAgb3JhbmdlOiBbXzI1NSwgMTY1LCAwXSxcbiAgZ3JheTogWzEyOCwgMTI4LCAxMjhdLFxuICBwdXJwbGU6IFsxMjgsIDAsIDEyOF0sXG4gIGdyZWVuOiBbMCwgMTI4LCAwXSxcbiAgcmVkOiBbXzI1NSwgMCwgMF0sXG4gIHBpbms6IFtfMjU1LCAxOTIsIDIwM10sXG4gIGN5YW46IFswLCBfMjU1LCBfMjU1XSxcbiAgdHJhbnNwYXJlbnQ6IFtfMjU1LCBfMjU1LCBfMjU1LCAwXVxufSxcbiAgICAvLyBwb3NzaWJsZSBmdXR1cmUgaWRlYSB0byByZXBsYWNlIHRoZSBoYXJkLWNvZGVkIGNvbG9yIG5hbWUgdmFsdWVzIC0gcHV0IHRoaXMgaW4gdGhlIHRpY2tlci53YWtlKCkgd2hlcmUgd2Ugc2V0IHRoZSBfZG9jOlxuLy8gbGV0IGN0eCA9IF9kb2MuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwiMmRcIik7XG4vLyBfZm9yRWFjaE5hbWUoXCJhcXVhLGxpbWUsc2lsdmVyLGJsYWNrLG1hcm9vbix0ZWFsLGJsdWUsbmF2eSx3aGl0ZSxvbGl2ZSx5ZWxsb3csb3JhbmdlLGdyYXkscHVycGxlLGdyZWVuLHJlZCxwaW5rLGN5YW5cIiwgY29sb3IgPT4ge2N0eC5maWxsU3R5bGUgPSBjb2xvcjsgX2NvbG9yTG9va3VwW2NvbG9yXSA9IHNwbGl0Q29sb3IoY3R4LmZpbGxTdHlsZSl9KTtcbl9odWUgPSBmdW5jdGlvbiBfaHVlKGgsIG0xLCBtMikge1xuICBoICs9IGggPCAwID8gMSA6IGggPiAxID8gLTEgOiAwO1xuICByZXR1cm4gKGggKiA2IDwgMSA/IG0xICsgKG0yIC0gbTEpICogaCAqIDYgOiBoIDwgLjUgPyBtMiA6IGggKiAzIDwgMiA/IG0xICsgKG0yIC0gbTEpICogKDIgLyAzIC0gaCkgKiA2IDogbTEpICogXzI1NSArIC41IHwgMDtcbn0sXG4gICAgc3BsaXRDb2xvciA9IGZ1bmN0aW9uIHNwbGl0Q29sb3IodiwgdG9IU0wsIGZvcmNlQWxwaGEpIHtcbiAgdmFyIGEgPSAhdiA/IF9jb2xvckxvb2t1cC5ibGFjayA6IF9pc051bWJlcih2KSA/IFt2ID4+IDE2LCB2ID4+IDggJiBfMjU1LCB2ICYgXzI1NV0gOiAwLFxuICAgICAgcixcbiAgICAgIGcsXG4gICAgICBiLFxuICAgICAgaCxcbiAgICAgIHMsXG4gICAgICBsLFxuICAgICAgbWF4LFxuICAgICAgbWluLFxuICAgICAgZCxcbiAgICAgIHdhc0hTTDtcblxuICBpZiAoIWEpIHtcbiAgICBpZiAodi5zdWJzdHIoLTEpID09PSBcIixcIikge1xuICAgICAgLy9zb21ldGltZXMgYSB0cmFpbGluZyBjb21tYSBpcyBpbmNsdWRlZCBhbmQgd2Ugc2hvdWxkIGNob3AgaXQgb2ZmICh0eXBpY2FsbHkgZnJvbSBhIGNvbW1hLWRlbGltaXRlZCBsaXN0IG9mIHZhbHVlcyBsaWtlIGEgdGV4dFNoYWRvdzpcIjJweCAycHggMnB4IGJsdWUsIDVweCA1cHggNXB4IHJnYigyNTUsMCwwKVwiIC0gaW4gdGhpcyBleGFtcGxlIFwiYmx1ZSxcIiBoYXMgYSB0cmFpbGluZyBjb21tYS4gV2UgY291bGQgc3RyaXAgaXQgb3V0IGluc2lkZSBwYXJzZUNvbXBsZXgoKSBidXQgd2UnZCBuZWVkIHRvIGRvIGl0IHRvIHRoZSBiZWdpbm5pbmcgYW5kIGVuZGluZyB2YWx1ZXMgcGx1cyBpdCB3b3VsZG4ndCBwcm92aWRlIHByb3RlY3Rpb24gZnJvbSBvdGhlciBwb3RlbnRpYWwgc2NlbmFyaW9zIGxpa2UgaWYgdGhlIHVzZXIgcGFzc2VzIGluIGEgc2ltaWxhciB2YWx1ZS5cbiAgICAgIHYgPSB2LnN1YnN0cigwLCB2Lmxlbmd0aCAtIDEpO1xuICAgIH1cblxuICAgIGlmIChfY29sb3JMb29rdXBbdl0pIHtcbiAgICAgIGEgPSBfY29sb3JMb29rdXBbdl07XG4gICAgfSBlbHNlIGlmICh2LmNoYXJBdCgwKSA9PT0gXCIjXCIpIHtcbiAgICAgIGlmICh2Lmxlbmd0aCA8IDYpIHtcbiAgICAgICAgLy9mb3Igc2hvcnRoYW5kIGxpa2UgIzlGMCBvciAjOUYwRiAoY291bGQgaGF2ZSBhbHBoYSlcbiAgICAgICAgciA9IHYuY2hhckF0KDEpO1xuICAgICAgICBnID0gdi5jaGFyQXQoMik7XG4gICAgICAgIGIgPSB2LmNoYXJBdCgzKTtcbiAgICAgICAgdiA9IFwiI1wiICsgciArIHIgKyBnICsgZyArIGIgKyBiICsgKHYubGVuZ3RoID09PSA1ID8gdi5jaGFyQXQoNCkgKyB2LmNoYXJBdCg0KSA6IFwiXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAodi5sZW5ndGggPT09IDkpIHtcbiAgICAgICAgLy8gaGV4IHdpdGggYWxwaGEsIGxpa2UgI2ZkNWU1M2ZmXG4gICAgICAgIGEgPSBwYXJzZUludCh2LnN1YnN0cigxLCA2KSwgMTYpO1xuICAgICAgICByZXR1cm4gW2EgPj4gMTYsIGEgPj4gOCAmIF8yNTUsIGEgJiBfMjU1LCBwYXJzZUludCh2LnN1YnN0cig3KSwgMTYpIC8gMjU1XTtcbiAgICAgIH1cblxuICAgICAgdiA9IHBhcnNlSW50KHYuc3Vic3RyKDEpLCAxNik7XG4gICAgICBhID0gW3YgPj4gMTYsIHYgPj4gOCAmIF8yNTUsIHYgJiBfMjU1XTtcbiAgICB9IGVsc2UgaWYgKHYuc3Vic3RyKDAsIDMpID09PSBcImhzbFwiKSB7XG4gICAgICBhID0gd2FzSFNMID0gdi5tYXRjaChfc3RyaWN0TnVtRXhwKTtcblxuICAgICAgaWYgKCF0b0hTTCkge1xuICAgICAgICBoID0gK2FbMF0gJSAzNjAgLyAzNjA7XG4gICAgICAgIHMgPSArYVsxXSAvIDEwMDtcbiAgICAgICAgbCA9ICthWzJdIC8gMTAwO1xuICAgICAgICBnID0gbCA8PSAuNSA/IGwgKiAocyArIDEpIDogbCArIHMgLSBsICogcztcbiAgICAgICAgciA9IGwgKiAyIC0gZztcbiAgICAgICAgYS5sZW5ndGggPiAzICYmIChhWzNdICo9IDEpOyAvL2Nhc3QgYXMgbnVtYmVyXG5cbiAgICAgICAgYVswXSA9IF9odWUoaCArIDEgLyAzLCByLCBnKTtcbiAgICAgICAgYVsxXSA9IF9odWUoaCwgciwgZyk7XG4gICAgICAgIGFbMl0gPSBfaHVlKGggLSAxIC8gMywgciwgZyk7XG4gICAgICB9IGVsc2UgaWYgKH52LmluZGV4T2YoXCI9XCIpKSB7XG4gICAgICAgIC8vaWYgcmVsYXRpdmUgdmFsdWVzIGFyZSBmb3VuZCwganVzdCByZXR1cm4gdGhlIHJhdyBzdHJpbmdzIHdpdGggdGhlIHJlbGF0aXZlIHByZWZpeGVzIGluIHBsYWNlLlxuICAgICAgICBhID0gdi5tYXRjaChfbnVtRXhwKTtcbiAgICAgICAgZm9yY2VBbHBoYSAmJiBhLmxlbmd0aCA8IDQgJiYgKGFbM10gPSAxKTtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGEgPSB2Lm1hdGNoKF9zdHJpY3ROdW1FeHApIHx8IF9jb2xvckxvb2t1cC50cmFuc3BhcmVudDtcbiAgICB9XG5cbiAgICBhID0gYS5tYXAoTnVtYmVyKTtcbiAgfVxuXG4gIGlmICh0b0hTTCAmJiAhd2FzSFNMKSB7XG4gICAgciA9IGFbMF0gLyBfMjU1O1xuICAgIGcgPSBhWzFdIC8gXzI1NTtcbiAgICBiID0gYVsyXSAvIF8yNTU7XG4gICAgbWF4ID0gTWF0aC5tYXgociwgZywgYik7XG4gICAgbWluID0gTWF0aC5taW4ociwgZywgYik7XG4gICAgbCA9IChtYXggKyBtaW4pIC8gMjtcblxuICAgIGlmIChtYXggPT09IG1pbikge1xuICAgICAgaCA9IHMgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBkID0gbWF4IC0gbWluO1xuICAgICAgcyA9IGwgPiAwLjUgPyBkIC8gKDIgLSBtYXggLSBtaW4pIDogZCAvIChtYXggKyBtaW4pO1xuICAgICAgaCA9IG1heCA9PT0gciA/IChnIC0gYikgLyBkICsgKGcgPCBiID8gNiA6IDApIDogbWF4ID09PSBnID8gKGIgLSByKSAvIGQgKyAyIDogKHIgLSBnKSAvIGQgKyA0O1xuICAgICAgaCAqPSA2MDtcbiAgICB9XG5cbiAgICBhWzBdID0gfn4oaCArIC41KTtcbiAgICBhWzFdID0gfn4ocyAqIDEwMCArIC41KTtcbiAgICBhWzJdID0gfn4obCAqIDEwMCArIC41KTtcbiAgfVxuXG4gIGZvcmNlQWxwaGEgJiYgYS5sZW5ndGggPCA0ICYmIChhWzNdID0gMSk7XG4gIHJldHVybiBhO1xufSxcbiAgICBfY29sb3JPcmRlckRhdGEgPSBmdW5jdGlvbiBfY29sb3JPcmRlckRhdGEodikge1xuICAvLyBzdHJpcHMgb3V0IHRoZSBjb2xvcnMgZnJvbSB0aGUgc3RyaW5nLCBmaW5kcyBhbGwgdGhlIG51bWVyaWMgc2xvdHMgKHdpdGggdW5pdHMpIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIHRob3NlLiBUaGUgQXJyYXkgYWxzbyBoYXMgYSBcImNcIiBwcm9wZXJ0eSB3aGljaCBpcyBhbiBBcnJheSBvZiB0aGUgaW5kZXggdmFsdWVzIHdoZXJlIHRoZSBjb2xvcnMgYmVsb25nLiBUaGlzIGlzIHRvIGhlbHAgd29yayBhcm91bmQgaXNzdWVzIHdoZXJlIHRoZXJlJ3MgYSBtaXMtbWF0Y2hlZCBvcmRlciBvZiBjb2xvci9udW1lcmljIGRhdGEgbGlrZSBkcm9wLXNoYWRvdygjZjAwIDBweCAxcHggMnB4KSBhbmQgZHJvcC1zaGFkb3coMHggMXB4IDJweCAjZjAwKS4gVGhpcyBpcyBiYXNpY2FsbHkgYSBoZWxwZXIgZnVuY3Rpb24gdXNlZCBpbiBfZm9ybWF0Q29sb3JzKClcbiAgdmFyIHZhbHVlcyA9IFtdLFxuICAgICAgYyA9IFtdLFxuICAgICAgaSA9IC0xO1xuICB2LnNwbGl0KF9jb2xvckV4cCkuZm9yRWFjaChmdW5jdGlvbiAodikge1xuICAgIHZhciBhID0gdi5tYXRjaChfbnVtV2l0aFVuaXRFeHApIHx8IFtdO1xuICAgIHZhbHVlcy5wdXNoLmFwcGx5KHZhbHVlcywgYSk7XG4gICAgYy5wdXNoKGkgKz0gYS5sZW5ndGggKyAxKTtcbiAgfSk7XG4gIHZhbHVlcy5jID0gYztcbiAgcmV0dXJuIHZhbHVlcztcbn0sXG4gICAgX2Zvcm1hdENvbG9ycyA9IGZ1bmN0aW9uIF9mb3JtYXRDb2xvcnMocywgdG9IU0wsIG9yZGVyTWF0Y2hEYXRhKSB7XG4gIHZhciByZXN1bHQgPSBcIlwiLFxuICAgICAgY29sb3JzID0gKHMgKyByZXN1bHQpLm1hdGNoKF9jb2xvckV4cCksXG4gICAgICB0eXBlID0gdG9IU0wgPyBcImhzbGEoXCIgOiBcInJnYmEoXCIsXG4gICAgICBpID0gMCxcbiAgICAgIGMsXG4gICAgICBzaGVsbCxcbiAgICAgIGQsXG4gICAgICBsO1xuXG4gIGlmICghY29sb3JzKSB7XG4gICAgcmV0dXJuIHM7XG4gIH1cblxuICBjb2xvcnMgPSBjb2xvcnMubWFwKGZ1bmN0aW9uIChjb2xvcikge1xuICAgIHJldHVybiAoY29sb3IgPSBzcGxpdENvbG9yKGNvbG9yLCB0b0hTTCwgMSkpICYmIHR5cGUgKyAodG9IU0wgPyBjb2xvclswXSArIFwiLFwiICsgY29sb3JbMV0gKyBcIiUsXCIgKyBjb2xvclsyXSArIFwiJSxcIiArIGNvbG9yWzNdIDogY29sb3Iuam9pbihcIixcIikpICsgXCIpXCI7XG4gIH0pO1xuXG4gIGlmIChvcmRlck1hdGNoRGF0YSkge1xuICAgIGQgPSBfY29sb3JPcmRlckRhdGEocyk7XG4gICAgYyA9IG9yZGVyTWF0Y2hEYXRhLmM7XG5cbiAgICBpZiAoYy5qb2luKHJlc3VsdCkgIT09IGQuYy5qb2luKHJlc3VsdCkpIHtcbiAgICAgIHNoZWxsID0gcy5yZXBsYWNlKF9jb2xvckV4cCwgXCIxXCIpLnNwbGl0KF9udW1XaXRoVW5pdEV4cCk7XG4gICAgICBsID0gc2hlbGwubGVuZ3RoIC0gMTtcblxuICAgICAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgcmVzdWx0ICs9IHNoZWxsW2ldICsgKH5jLmluZGV4T2YoaSkgPyBjb2xvcnMuc2hpZnQoKSB8fCB0eXBlICsgXCIwLDAsMCwwKVwiIDogKGQubGVuZ3RoID8gZCA6IGNvbG9ycy5sZW5ndGggPyBjb2xvcnMgOiBvcmRlck1hdGNoRGF0YSkuc2hpZnQoKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKCFzaGVsbCkge1xuICAgIHNoZWxsID0gcy5zcGxpdChfY29sb3JFeHApO1xuICAgIGwgPSBzaGVsbC5sZW5ndGggLSAxO1xuXG4gICAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHJlc3VsdCArPSBzaGVsbFtpXSArIGNvbG9yc1tpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0ICsgc2hlbGxbbF07XG59LFxuICAgIF9jb2xvckV4cCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHMgPSBcIig/OlxcXFxiKD86KD86cmdifHJnYmF8aHNsfGhzbGEpXFxcXCguKz9cXFxcKSl8XFxcXEIjKD86WzAtOWEtZl17Myw0fSl7MSwyfVxcXFxiXCIsXG4gICAgICAvL3dlJ2xsIGR5bmFtaWNhbGx5IGJ1aWxkIHRoaXMgUmVndWxhciBFeHByZXNzaW9uIHRvIGNvbnNlcnZlIGZpbGUgc2l6ZS4gQWZ0ZXIgYnVpbGRpbmcgaXQsIGl0IHdpbGwgYmUgYWJsZSB0byBmaW5kIHJnYigpLCByZ2JhKCksICMgKGhleGFkZWNpbWFsKSwgYW5kIG5hbWVkIGNvbG9yIHZhbHVlcyBsaWtlIHJlZCwgYmx1ZSwgcHVycGxlLCBldGMuLFxuICBwO1xuXG4gIGZvciAocCBpbiBfY29sb3JMb29rdXApIHtcbiAgICBzICs9IFwifFwiICsgcCArIFwiXFxcXGJcIjtcbiAgfVxuXG4gIHJldHVybiBuZXcgUmVnRXhwKHMgKyBcIilcIiwgXCJnaVwiKTtcbn0oKSxcbiAgICBfaHNsRXhwID0gL2hzbFthXT9cXCgvLFxuICAgIF9jb2xvclN0cmluZ0ZpbHRlciA9IGZ1bmN0aW9uIF9jb2xvclN0cmluZ0ZpbHRlcihhKSB7XG4gIHZhciBjb21iaW5lZCA9IGEuam9pbihcIiBcIiksXG4gICAgICB0b0hTTDtcbiAgX2NvbG9yRXhwLmxhc3RJbmRleCA9IDA7XG5cbiAgaWYgKF9jb2xvckV4cC50ZXN0KGNvbWJpbmVkKSkge1xuICAgIHRvSFNMID0gX2hzbEV4cC50ZXN0KGNvbWJpbmVkKTtcbiAgICBhWzFdID0gX2Zvcm1hdENvbG9ycyhhWzFdLCB0b0hTTCk7XG4gICAgYVswXSA9IF9mb3JtYXRDb2xvcnMoYVswXSwgdG9IU0wsIF9jb2xvck9yZGVyRGF0YShhWzFdKSk7IC8vIG1ha2Ugc3VyZSB0aGUgb3JkZXIgb2YgbnVtYmVycy9jb2xvcnMgbWF0Y2ggd2l0aCB0aGUgRU5EIHZhbHVlLlxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn0sXG5cbi8qXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVElDS0VSXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5fdGlja2VyQWN0aXZlLFxuICAgIF90aWNrZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBfZ2V0VGltZSA9IERhdGUubm93LFxuICAgICAgX2xhZ1RocmVzaG9sZCA9IDUwMCxcbiAgICAgIF9hZGp1c3RlZExhZyA9IDMzLFxuICAgICAgX3N0YXJ0VGltZSA9IF9nZXRUaW1lKCksXG4gICAgICBfbGFzdFVwZGF0ZSA9IF9zdGFydFRpbWUsXG4gICAgICBfZ2FwID0gMTAwMCAvIDI0MCxcbiAgICAgIF9uZXh0VGltZSA9IF9nYXAsXG4gICAgICBfbGlzdGVuZXJzID0gW10sXG4gICAgICBfaWQsXG4gICAgICBfcmVxLFxuICAgICAgX3JhZixcbiAgICAgIF9zZWxmLFxuICAgICAgX2RlbHRhLFxuICAgICAgX2ksXG4gICAgICBfdGljayA9IGZ1bmN0aW9uIF90aWNrKHYpIHtcbiAgICB2YXIgZWxhcHNlZCA9IF9nZXRUaW1lKCkgLSBfbGFzdFVwZGF0ZSxcbiAgICAgICAgbWFudWFsID0gdiA9PT0gdHJ1ZSxcbiAgICAgICAgb3ZlcmxhcCxcbiAgICAgICAgZGlzcGF0Y2gsXG4gICAgICAgIHRpbWUsXG4gICAgICAgIGZyYW1lO1xuXG4gICAgZWxhcHNlZCA+IF9sYWdUaHJlc2hvbGQgJiYgKF9zdGFydFRpbWUgKz0gZWxhcHNlZCAtIF9hZGp1c3RlZExhZyk7XG4gICAgX2xhc3RVcGRhdGUgKz0gZWxhcHNlZDtcbiAgICB0aW1lID0gX2xhc3RVcGRhdGUgLSBfc3RhcnRUaW1lO1xuICAgIG92ZXJsYXAgPSB0aW1lIC0gX25leHRUaW1lO1xuXG4gICAgaWYgKG92ZXJsYXAgPiAwIHx8IG1hbnVhbCkge1xuICAgICAgZnJhbWUgPSArK19zZWxmLmZyYW1lO1xuICAgICAgX2RlbHRhID0gdGltZSAtIF9zZWxmLnRpbWUgKiAxMDAwO1xuICAgICAgX3NlbGYudGltZSA9IHRpbWUgPSB0aW1lIC8gMTAwMDtcbiAgICAgIF9uZXh0VGltZSArPSBvdmVybGFwICsgKG92ZXJsYXAgPj0gX2dhcCA/IDQgOiBfZ2FwIC0gb3ZlcmxhcCk7XG4gICAgICBkaXNwYXRjaCA9IDE7XG4gICAgfVxuXG4gICAgbWFudWFsIHx8IChfaWQgPSBfcmVxKF90aWNrKSk7IC8vbWFrZSBzdXJlIHRoZSByZXF1ZXN0IGlzIG1hZGUgYmVmb3JlIHdlIGRpc3BhdGNoIHRoZSBcInRpY2tcIiBldmVudCBzbyB0aGF0IHRpbWluZyBpcyBtYWludGFpbmVkLiBPdGhlcndpc2UsIGlmIHByb2Nlc3NpbmcgdGhlIFwidGlja1wiIHJlcXVpcmVzIGEgYnVuY2ggb2YgdGltZSAobGlrZSAxNW1zKSBhbmQgd2UncmUgdXNpbmcgYSBzZXRUaW1lb3V0KCkgdGhhdCdzIGJhc2VkIG9uIDE2LjdtcywgaXQnZCB0ZWNobmljYWxseSB0YWtlIDMxLjdtcyBiZXR3ZWVuIGZyYW1lcyBvdGhlcndpc2UuXG5cbiAgICBpZiAoZGlzcGF0Y2gpIHtcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IF9saXN0ZW5lcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIC8vIHVzZSBfaSBhbmQgY2hlY2sgX2xpc3RlbmVycy5sZW5ndGggaW5zdGVhZCBvZiBhIHZhcmlhYmxlIGJlY2F1c2UgYSBsaXN0ZW5lciBjb3VsZCBnZXQgcmVtb3ZlZCBkdXJpbmcgdGhlIGxvb3AsIGFuZCBpZiB0aGF0IGhhcHBlbnMgdG8gYW4gZWxlbWVudCBsZXNzIHRoYW4gdGhlIGN1cnJlbnQgaW5kZXgsIGl0J2QgdGhyb3cgdGhpbmdzIG9mZiBpbiB0aGUgbG9vcC5cbiAgICAgICAgX2xpc3RlbmVyc1tfaV0odGltZSwgX2RlbHRhLCBmcmFtZSwgdik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIF9zZWxmID0ge1xuICAgIHRpbWU6IDAsXG4gICAgZnJhbWU6IDAsXG4gICAgdGljazogZnVuY3Rpb24gdGljaygpIHtcbiAgICAgIF90aWNrKHRydWUpO1xuICAgIH0sXG4gICAgZGVsdGFSYXRpbzogZnVuY3Rpb24gZGVsdGFSYXRpbyhmcHMpIHtcbiAgICAgIHJldHVybiBfZGVsdGEgLyAoMTAwMCAvIChmcHMgfHwgNjApKTtcbiAgICB9LFxuICAgIHdha2U6IGZ1bmN0aW9uIHdha2UoKSB7XG4gICAgICBpZiAoX2NvcmVSZWFkeSkge1xuICAgICAgICBpZiAoIV9jb3JlSW5pdHRlZCAmJiBfd2luZG93RXhpc3RzKCkpIHtcbiAgICAgICAgICBfd2luID0gX2NvcmVJbml0dGVkID0gd2luZG93O1xuICAgICAgICAgIF9kb2MgPSBfd2luLmRvY3VtZW50IHx8IHt9O1xuICAgICAgICAgIF9nbG9iYWxzLmdzYXAgPSBnc2FwO1xuICAgICAgICAgIChfd2luLmdzYXBWZXJzaW9ucyB8fCAoX3dpbi5nc2FwVmVyc2lvbnMgPSBbXSkpLnB1c2goZ3NhcC52ZXJzaW9uKTtcblxuICAgICAgICAgIF9pbnN0YWxsKF9pbnN0YWxsU2NvcGUgfHwgX3dpbi5HcmVlblNvY2tHbG9iYWxzIHx8ICFfd2luLmdzYXAgJiYgX3dpbiB8fCB7fSk7XG5cbiAgICAgICAgICBfcmFmID0gX3dpbi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG5cbiAgICAgICAgICBfcmVnaXN0ZXJQbHVnaW5RdWV1ZS5mb3JFYWNoKF9jcmVhdGVQbHVnaW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgX2lkICYmIF9zZWxmLnNsZWVwKCk7XG5cbiAgICAgICAgX3JlcSA9IF9yYWYgfHwgZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChmLCBfbmV4dFRpbWUgLSBfc2VsZi50aW1lICogMTAwMCArIDEgfCAwKTtcbiAgICAgICAgfTtcblxuICAgICAgICBfdGlja2VyQWN0aXZlID0gMTtcblxuICAgICAgICBfdGljaygyKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNsZWVwOiBmdW5jdGlvbiBzbGVlcCgpIHtcbiAgICAgIChfcmFmID8gX3dpbi5jYW5jZWxBbmltYXRpb25GcmFtZSA6IGNsZWFyVGltZW91dCkoX2lkKTtcbiAgICAgIF90aWNrZXJBY3RpdmUgPSAwO1xuICAgICAgX3JlcSA9IF9lbXB0eUZ1bmM7XG4gICAgfSxcbiAgICBsYWdTbW9vdGhpbmc6IGZ1bmN0aW9uIGxhZ1Ntb290aGluZyh0aHJlc2hvbGQsIGFkanVzdGVkTGFnKSB7XG4gICAgICBfbGFnVGhyZXNob2xkID0gdGhyZXNob2xkIHx8IEluZmluaXR5OyAvLyB6ZXJvIHNob3VsZCBiZSBpbnRlcnByZXRlZCBhcyBiYXNpY2FsbHkgdW5saW1pdGVkXG5cbiAgICAgIF9hZGp1c3RlZExhZyA9IE1hdGgubWluKGFkanVzdGVkTGFnIHx8IDMzLCBfbGFnVGhyZXNob2xkKTtcbiAgICB9LFxuICAgIGZwczogZnVuY3Rpb24gZnBzKF9mcHMpIHtcbiAgICAgIF9nYXAgPSAxMDAwIC8gKF9mcHMgfHwgMjQwKTtcbiAgICAgIF9uZXh0VGltZSA9IF9zZWxmLnRpbWUgKiAxMDAwICsgX2dhcDtcbiAgICB9LFxuICAgIGFkZDogZnVuY3Rpb24gYWRkKGNhbGxiYWNrLCBvbmNlLCBwcmlvcml0aXplKSB7XG4gICAgICB2YXIgZnVuYyA9IG9uY2UgPyBmdW5jdGlvbiAodCwgZCwgZiwgdikge1xuICAgICAgICBjYWxsYmFjayh0LCBkLCBmLCB2KTtcblxuICAgICAgICBfc2VsZi5yZW1vdmUoZnVuYyk7XG4gICAgICB9IDogY2FsbGJhY2s7XG5cbiAgICAgIF9zZWxmLnJlbW92ZShjYWxsYmFjayk7XG5cbiAgICAgIF9saXN0ZW5lcnNbcHJpb3JpdGl6ZSA/IFwidW5zaGlmdFwiIDogXCJwdXNoXCJdKGZ1bmMpO1xuXG4gICAgICBfd2FrZSgpO1xuXG4gICAgICByZXR1cm4gZnVuYztcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKGNhbGxiYWNrLCBpKSB7XG4gICAgICB+KGkgPSBfbGlzdGVuZXJzLmluZGV4T2YoY2FsbGJhY2spKSAmJiBfbGlzdGVuZXJzLnNwbGljZShpLCAxKSAmJiBfaSA+PSBpICYmIF9pLS07XG4gICAgfSxcbiAgICBfbGlzdGVuZXJzOiBfbGlzdGVuZXJzXG4gIH07XG4gIHJldHVybiBfc2VsZjtcbn0oKSxcbiAgICBfd2FrZSA9IGZ1bmN0aW9uIF93YWtlKCkge1xuICByZXR1cm4gIV90aWNrZXJBY3RpdmUgJiYgX3RpY2tlci53YWtlKCk7XG59LFxuICAgIC8vYWxzbyBlbnN1cmVzIHRoZSBjb3JlIGNsYXNzZXMgYXJlIGluaXRpYWxpemVkLlxuXG4vKlxuKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4qIEVBU0lOR1xuKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4qL1xuX2Vhc2VNYXAgPSB7fSxcbiAgICBfY3VzdG9tRWFzZUV4cCA9IC9eW1xcZC5cXC1NXVtcXGQuXFwtLFxcc10vLFxuICAgIF9xdW90ZXNFeHAgPSAvW1wiJ10vZyxcbiAgICBfcGFyc2VPYmplY3RJblN0cmluZyA9IGZ1bmN0aW9uIF9wYXJzZU9iamVjdEluU3RyaW5nKHZhbHVlKSB7XG4gIC8vdGFrZXMgYSBzdHJpbmcgbGlrZSBcInt3aWdnbGVzOjEwLCB0eXBlOmFudGljaXBhdGV9KVwiIGFuZCB0dXJucyBpdCBpbnRvIGEgcmVhbCBvYmplY3QuIE5vdGljZSBpdCBlbmRzIGluIFwiKVwiIGFuZCBpbmNsdWRlcyB0aGUge30gd3JhcHBlcnMuIFRoaXMgaXMgYmVjYXVzZSB3ZSBvbmx5IHVzZSB0aGlzIGZ1bmN0aW9uIGZvciBwYXJzaW5nIGVhc2UgY29uZmlncyBhbmQgcHJpb3JpdGl6ZWQgb3B0aW1pemF0aW9uIHJhdGhlciB0aGFuIHJldXNhYmlsaXR5LlxuICB2YXIgb2JqID0ge30sXG4gICAgICBzcGxpdCA9IHZhbHVlLnN1YnN0cigxLCB2YWx1ZS5sZW5ndGggLSAzKS5zcGxpdChcIjpcIiksXG4gICAgICBrZXkgPSBzcGxpdFswXSxcbiAgICAgIGkgPSAxLFxuICAgICAgbCA9IHNwbGl0Lmxlbmd0aCxcbiAgICAgIGluZGV4LFxuICAgICAgdmFsLFxuICAgICAgcGFyc2VkVmFsO1xuXG4gIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgdmFsID0gc3BsaXRbaV07XG4gICAgaW5kZXggPSBpICE9PSBsIC0gMSA/IHZhbC5sYXN0SW5kZXhPZihcIixcIikgOiB2YWwubGVuZ3RoO1xuICAgIHBhcnNlZFZhbCA9IHZhbC5zdWJzdHIoMCwgaW5kZXgpO1xuICAgIG9ialtrZXldID0gaXNOYU4ocGFyc2VkVmFsKSA/IHBhcnNlZFZhbC5yZXBsYWNlKF9xdW90ZXNFeHAsIFwiXCIpLnRyaW0oKSA6ICtwYXJzZWRWYWw7XG4gICAga2V5ID0gdmFsLnN1YnN0cihpbmRleCArIDEpLnRyaW0oKTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59LFxuICAgIF92YWx1ZUluUGFyZW50aGVzZXMgPSBmdW5jdGlvbiBfdmFsdWVJblBhcmVudGhlc2VzKHZhbHVlKSB7XG4gIHZhciBvcGVuID0gdmFsdWUuaW5kZXhPZihcIihcIikgKyAxLFxuICAgICAgY2xvc2UgPSB2YWx1ZS5pbmRleE9mKFwiKVwiKSxcbiAgICAgIG5lc3RlZCA9IHZhbHVlLmluZGV4T2YoXCIoXCIsIG9wZW4pO1xuICByZXR1cm4gdmFsdWUuc3Vic3RyaW5nKG9wZW4sIH5uZXN0ZWQgJiYgbmVzdGVkIDwgY2xvc2UgPyB2YWx1ZS5pbmRleE9mKFwiKVwiLCBjbG9zZSArIDEpIDogY2xvc2UpO1xufSxcbiAgICBfY29uZmlnRWFzZUZyb21TdHJpbmcgPSBmdW5jdGlvbiBfY29uZmlnRWFzZUZyb21TdHJpbmcobmFtZSkge1xuICAvL25hbWUgY2FuIGJlIGEgc3RyaW5nIGxpa2UgXCJlbGFzdGljLm91dCgxLDAuNSlcIiwgYW5kIHBhc3MgaW4gX2Vhc2VNYXAgYXMgb2JqIGFuZCBpdCdsbCBwYXJzZSBpdCBvdXQgYW5kIGNhbGwgdGhlIGFjdHVhbCBmdW5jdGlvbiBsaWtlIF9lYXNlTWFwLkVsYXN0aWMuZWFzZU91dC5jb25maWcoMSwwLjUpLiBJdCB3aWxsIGFsc28gcGFyc2UgY3VzdG9tIGVhc2Ugc3RyaW5ncyBhcyBsb25nIGFzIEN1c3RvbUVhc2UgaXMgbG9hZGVkIGFuZCByZWdpc3RlcmVkIChpbnRlcm5hbGx5IGFzIF9lYXNlTWFwLl9DRSkuXG4gIHZhciBzcGxpdCA9IChuYW1lICsgXCJcIikuc3BsaXQoXCIoXCIpLFxuICAgICAgZWFzZSA9IF9lYXNlTWFwW3NwbGl0WzBdXTtcbiAgcmV0dXJuIGVhc2UgJiYgc3BsaXQubGVuZ3RoID4gMSAmJiBlYXNlLmNvbmZpZyA/IGVhc2UuY29uZmlnLmFwcGx5KG51bGwsIH5uYW1lLmluZGV4T2YoXCJ7XCIpID8gW19wYXJzZU9iamVjdEluU3RyaW5nKHNwbGl0WzFdKV0gOiBfdmFsdWVJblBhcmVudGhlc2VzKG5hbWUpLnNwbGl0KFwiLFwiKS5tYXAoX251bWVyaWNJZlBvc3NpYmxlKSkgOiBfZWFzZU1hcC5fQ0UgJiYgX2N1c3RvbUVhc2VFeHAudGVzdChuYW1lKSA/IF9lYXNlTWFwLl9DRShcIlwiLCBuYW1lKSA6IGVhc2U7XG59LFxuICAgIF9pbnZlcnRFYXNlID0gZnVuY3Rpb24gX2ludmVydEVhc2UoZWFzZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gMSAtIGVhc2UoMSAtIHApO1xuICB9O1xufSxcbiAgICAvLyBhbGxvdyB5b3lvRWFzZSB0byBiZSBzZXQgaW4gY2hpbGRyZW4gYW5kIGhhdmUgdGhvc2UgYWZmZWN0ZWQgd2hlbiB0aGUgcGFyZW50L2FuY2VzdG9yIHRpbWVsaW5lIHlveW9zLlxuX3Byb3BhZ2F0ZVlveW9FYXNlID0gZnVuY3Rpb24gX3Byb3BhZ2F0ZVlveW9FYXNlKHRpbWVsaW5lLCBpc1lveW8pIHtcbiAgdmFyIGNoaWxkID0gdGltZWxpbmUuX2ZpcnN0LFxuICAgICAgZWFzZTtcblxuICB3aGlsZSAoY2hpbGQpIHtcbiAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBUaW1lbGluZSkge1xuICAgICAgX3Byb3BhZ2F0ZVlveW9FYXNlKGNoaWxkLCBpc1lveW8pO1xuICAgIH0gZWxzZSBpZiAoY2hpbGQudmFycy55b3lvRWFzZSAmJiAoIWNoaWxkLl95b3lvIHx8ICFjaGlsZC5fcmVwZWF0KSAmJiBjaGlsZC5feW95byAhPT0gaXNZb3lvKSB7XG4gICAgICBpZiAoY2hpbGQudGltZWxpbmUpIHtcbiAgICAgICAgX3Byb3BhZ2F0ZVlveW9FYXNlKGNoaWxkLnRpbWVsaW5lLCBpc1lveW8pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWFzZSA9IGNoaWxkLl9lYXNlO1xuICAgICAgICBjaGlsZC5fZWFzZSA9IGNoaWxkLl95RWFzZTtcbiAgICAgICAgY2hpbGQuX3lFYXNlID0gZWFzZTtcbiAgICAgICAgY2hpbGQuX3lveW8gPSBpc1lveW87XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2hpbGQgPSBjaGlsZC5fbmV4dDtcbiAgfVxufSxcbiAgICBfcGFyc2VFYXNlID0gZnVuY3Rpb24gX3BhcnNlRWFzZShlYXNlLCBkZWZhdWx0RWFzZSkge1xuICByZXR1cm4gIWVhc2UgPyBkZWZhdWx0RWFzZSA6IChfaXNGdW5jdGlvbihlYXNlKSA/IGVhc2UgOiBfZWFzZU1hcFtlYXNlXSB8fCBfY29uZmlnRWFzZUZyb21TdHJpbmcoZWFzZSkpIHx8IGRlZmF1bHRFYXNlO1xufSxcbiAgICBfaW5zZXJ0RWFzZSA9IGZ1bmN0aW9uIF9pbnNlcnRFYXNlKG5hbWVzLCBlYXNlSW4sIGVhc2VPdXQsIGVhc2VJbk91dCkge1xuICBpZiAoZWFzZU91dCA9PT0gdm9pZCAwKSB7XG4gICAgZWFzZU91dCA9IGZ1bmN0aW9uIGVhc2VPdXQocCkge1xuICAgICAgcmV0dXJuIDEgLSBlYXNlSW4oMSAtIHApO1xuICAgIH07XG4gIH1cblxuICBpZiAoZWFzZUluT3V0ID09PSB2b2lkIDApIHtcbiAgICBlYXNlSW5PdXQgPSBmdW5jdGlvbiBlYXNlSW5PdXQocCkge1xuICAgICAgcmV0dXJuIHAgPCAuNSA/IGVhc2VJbihwICogMikgLyAyIDogMSAtIGVhc2VJbigoMSAtIHApICogMikgLyAyO1xuICAgIH07XG4gIH1cblxuICB2YXIgZWFzZSA9IHtcbiAgICBlYXNlSW46IGVhc2VJbixcbiAgICBlYXNlT3V0OiBlYXNlT3V0LFxuICAgIGVhc2VJbk91dDogZWFzZUluT3V0XG4gIH0sXG4gICAgICBsb3dlcmNhc2VOYW1lO1xuXG4gIF9mb3JFYWNoTmFtZShuYW1lcywgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBfZWFzZU1hcFtuYW1lXSA9IF9nbG9iYWxzW25hbWVdID0gZWFzZTtcbiAgICBfZWFzZU1hcFtsb3dlcmNhc2VOYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpXSA9IGVhc2VPdXQ7XG5cbiAgICBmb3IgKHZhciBwIGluIGVhc2UpIHtcbiAgICAgIF9lYXNlTWFwW2xvd2VyY2FzZU5hbWUgKyAocCA9PT0gXCJlYXNlSW5cIiA/IFwiLmluXCIgOiBwID09PSBcImVhc2VPdXRcIiA/IFwiLm91dFwiIDogXCIuaW5PdXRcIildID0gX2Vhc2VNYXBbbmFtZSArIFwiLlwiICsgcF0gPSBlYXNlW3BdO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGVhc2U7XG59LFxuICAgIF9lYXNlSW5PdXRGcm9tT3V0ID0gZnVuY3Rpb24gX2Vhc2VJbk91dEZyb21PdXQoZWFzZU91dCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gcCA8IC41ID8gKDEgLSBlYXNlT3V0KDEgLSBwICogMikpIC8gMiA6IC41ICsgZWFzZU91dCgocCAtIC41KSAqIDIpIC8gMjtcbiAgfTtcbn0sXG4gICAgX2NvbmZpZ0VsYXN0aWMgPSBmdW5jdGlvbiBfY29uZmlnRWxhc3RpYyh0eXBlLCBhbXBsaXR1ZGUsIHBlcmlvZCkge1xuICB2YXIgcDEgPSBhbXBsaXR1ZGUgPj0gMSA/IGFtcGxpdHVkZSA6IDEsXG4gICAgICAvL25vdGU6IGlmIGFtcGxpdHVkZSBpcyA8IDEsIHdlIHNpbXBseSBhZGp1c3QgdGhlIHBlcmlvZCBmb3IgYSBtb3JlIG5hdHVyYWwgZmVlbC4gT3RoZXJ3aXNlIHRoZSBtYXRoIGRvZXNuJ3Qgd29yayByaWdodCBhbmQgdGhlIGN1cnZlIHN0YXJ0cyBhdCAxLlxuICBwMiA9IChwZXJpb2QgfHwgKHR5cGUgPyAuMyA6IC40NSkpIC8gKGFtcGxpdHVkZSA8IDEgPyBhbXBsaXR1ZGUgOiAxKSxcbiAgICAgIHAzID0gcDIgLyBfMlBJICogKE1hdGguYXNpbigxIC8gcDEpIHx8IDApLFxuICAgICAgZWFzZU91dCA9IGZ1bmN0aW9uIGVhc2VPdXQocCkge1xuICAgIHJldHVybiBwID09PSAxID8gMSA6IHAxICogTWF0aC5wb3coMiwgLTEwICogcCkgKiBfc2luKChwIC0gcDMpICogcDIpICsgMTtcbiAgfSxcbiAgICAgIGVhc2UgPSB0eXBlID09PSBcIm91dFwiID8gZWFzZU91dCA6IHR5cGUgPT09IFwiaW5cIiA/IGZ1bmN0aW9uIChwKSB7XG4gICAgcmV0dXJuIDEgLSBlYXNlT3V0KDEgLSBwKTtcbiAgfSA6IF9lYXNlSW5PdXRGcm9tT3V0KGVhc2VPdXQpO1xuXG4gIHAyID0gXzJQSSAvIHAyOyAvL3ByZWNhbGN1bGF0ZSB0byBvcHRpbWl6ZVxuXG4gIGVhc2UuY29uZmlnID0gZnVuY3Rpb24gKGFtcGxpdHVkZSwgcGVyaW9kKSB7XG4gICAgcmV0dXJuIF9jb25maWdFbGFzdGljKHR5cGUsIGFtcGxpdHVkZSwgcGVyaW9kKTtcbiAgfTtcblxuICByZXR1cm4gZWFzZTtcbn0sXG4gICAgX2NvbmZpZ0JhY2sgPSBmdW5jdGlvbiBfY29uZmlnQmFjayh0eXBlLCBvdmVyc2hvb3QpIHtcbiAgaWYgKG92ZXJzaG9vdCA9PT0gdm9pZCAwKSB7XG4gICAgb3ZlcnNob290ID0gMS43MDE1ODtcbiAgfVxuXG4gIHZhciBlYXNlT3V0ID0gZnVuY3Rpb24gZWFzZU91dChwKSB7XG4gICAgcmV0dXJuIHAgPyAtLXAgKiBwICogKChvdmVyc2hvb3QgKyAxKSAqIHAgKyBvdmVyc2hvb3QpICsgMSA6IDA7XG4gIH0sXG4gICAgICBlYXNlID0gdHlwZSA9PT0gXCJvdXRcIiA/IGVhc2VPdXQgOiB0eXBlID09PSBcImluXCIgPyBmdW5jdGlvbiAocCkge1xuICAgIHJldHVybiAxIC0gZWFzZU91dCgxIC0gcCk7XG4gIH0gOiBfZWFzZUluT3V0RnJvbU91dChlYXNlT3V0KTtcblxuICBlYXNlLmNvbmZpZyA9IGZ1bmN0aW9uIChvdmVyc2hvb3QpIHtcbiAgICByZXR1cm4gX2NvbmZpZ0JhY2sodHlwZSwgb3ZlcnNob290KTtcbiAgfTtcblxuICByZXR1cm4gZWFzZTtcbn07IC8vIGEgY2hlYXBlciAoa2IgYW5kIGNwdSkgYnV0IG1vcmUgbWlsZCB3YXkgdG8gZ2V0IGEgcGFyYW1ldGVyaXplZCB3ZWlnaHRlZCBlYXNlIGJ5IGZlZWRpbmcgaW4gYSB2YWx1ZSBiZXR3ZWVuIC0xIChlYXNlSW4pIGFuZCAxIChlYXNlT3V0KSB3aGVyZSAwIGlzIGxpbmVhci5cbi8vIF93ZWlnaHRlZEVhc2UgPSByYXRpbyA9PiB7XG4vLyBcdGxldCB5ID0gMC41ICsgcmF0aW8gLyAyO1xuLy8gXHRyZXR1cm4gcCA9PiAoMiAqICgxIC0gcCkgKiBwICogeSArIHAgKiBwKTtcbi8vIH0sXG4vLyBhIHN0cm9uZ2VyIChidXQgbW9yZSBleHBlbnNpdmUga2IvY3B1KSBwYXJhbWV0ZXJpemVkIHdlaWdodGVkIGVhc2UgdGhhdCBsZXRzIHlvdSBmZWVkIGluIGEgdmFsdWUgYmV0d2VlbiAtMSAoZWFzZUluKSBhbmQgMSAoZWFzZU91dCkgd2hlcmUgMCBpcyBsaW5lYXIuXG4vLyBfd2VpZ2h0ZWRFYXNlU3Ryb25nID0gcmF0aW8gPT4ge1xuLy8gXHRyYXRpbyA9IC41ICsgcmF0aW8gLyAyO1xuLy8gXHRsZXQgbyA9IDEgLyAzICogKHJhdGlvIDwgLjUgPyByYXRpbyA6IDEgLSByYXRpbyksXG4vLyBcdFx0YiA9IHJhdGlvIC0gbyxcbi8vIFx0XHRjID0gcmF0aW8gKyBvO1xuLy8gXHRyZXR1cm4gcCA9PiBwID09PSAxID8gcCA6IDMgKiBiICogKDEgLSBwKSAqICgxIC0gcCkgKiBwICsgMyAqIGMgKiAoMSAtIHApICogcCAqIHAgKyBwICogcCAqIHA7XG4vLyB9O1xuXG5cbl9mb3JFYWNoTmFtZShcIkxpbmVhcixRdWFkLEN1YmljLFF1YXJ0LFF1aW50LFN0cm9uZ1wiLCBmdW5jdGlvbiAobmFtZSwgaSkge1xuICB2YXIgcG93ZXIgPSBpIDwgNSA/IGkgKyAxIDogaTtcblxuICBfaW5zZXJ0RWFzZShuYW1lICsgXCIsUG93ZXJcIiArIChwb3dlciAtIDEpLCBpID8gZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gTWF0aC5wb3cocCwgcG93ZXIpO1xuICB9IDogZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gcDtcbiAgfSwgZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gMSAtIE1hdGgucG93KDEgLSBwLCBwb3dlcik7XG4gIH0sIGZ1bmN0aW9uIChwKSB7XG4gICAgcmV0dXJuIHAgPCAuNSA/IE1hdGgucG93KHAgKiAyLCBwb3dlcikgLyAyIDogMSAtIE1hdGgucG93KCgxIC0gcCkgKiAyLCBwb3dlcikgLyAyO1xuICB9KTtcbn0pO1xuXG5fZWFzZU1hcC5MaW5lYXIuZWFzZU5vbmUgPSBfZWFzZU1hcC5ub25lID0gX2Vhc2VNYXAuTGluZWFyLmVhc2VJbjtcblxuX2luc2VydEVhc2UoXCJFbGFzdGljXCIsIF9jb25maWdFbGFzdGljKFwiaW5cIiksIF9jb25maWdFbGFzdGljKFwib3V0XCIpLCBfY29uZmlnRWxhc3RpYygpKTtcblxuKGZ1bmN0aW9uIChuLCBjKSB7XG4gIHZhciBuMSA9IDEgLyBjLFxuICAgICAgbjIgPSAyICogbjEsXG4gICAgICBuMyA9IDIuNSAqIG4xLFxuICAgICAgZWFzZU91dCA9IGZ1bmN0aW9uIGVhc2VPdXQocCkge1xuICAgIHJldHVybiBwIDwgbjEgPyBuICogcCAqIHAgOiBwIDwgbjIgPyBuICogTWF0aC5wb3cocCAtIDEuNSAvIGMsIDIpICsgLjc1IDogcCA8IG4zID8gbiAqIChwIC09IDIuMjUgLyBjKSAqIHAgKyAuOTM3NSA6IG4gKiBNYXRoLnBvdyhwIC0gMi42MjUgLyBjLCAyKSArIC45ODQzNzU7XG4gIH07XG5cbiAgX2luc2VydEVhc2UoXCJCb3VuY2VcIiwgZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gMSAtIGVhc2VPdXQoMSAtIHApO1xuICB9LCBlYXNlT3V0KTtcbn0pKDcuNTYyNSwgMi43NSk7XG5cbl9pbnNlcnRFYXNlKFwiRXhwb1wiLCBmdW5jdGlvbiAocCkge1xuICByZXR1cm4gcCA/IE1hdGgucG93KDIsIDEwICogKHAgLSAxKSkgOiAwO1xufSk7XG5cbl9pbnNlcnRFYXNlKFwiQ2lyY1wiLCBmdW5jdGlvbiAocCkge1xuICByZXR1cm4gLShfc3FydCgxIC0gcCAqIHApIC0gMSk7XG59KTtcblxuX2luc2VydEVhc2UoXCJTaW5lXCIsIGZ1bmN0aW9uIChwKSB7XG4gIHJldHVybiBwID09PSAxID8gMSA6IC1fY29zKHAgKiBfSEFMRl9QSSkgKyAxO1xufSk7XG5cbl9pbnNlcnRFYXNlKFwiQmFja1wiLCBfY29uZmlnQmFjayhcImluXCIpLCBfY29uZmlnQmFjayhcIm91dFwiKSwgX2NvbmZpZ0JhY2soKSk7XG5cbl9lYXNlTWFwLlN0ZXBwZWRFYXNlID0gX2Vhc2VNYXAuc3RlcHMgPSBfZ2xvYmFscy5TdGVwcGVkRWFzZSA9IHtcbiAgY29uZmlnOiBmdW5jdGlvbiBjb25maWcoc3RlcHMsIGltbWVkaWF0ZVN0YXJ0KSB7XG4gICAgaWYgKHN0ZXBzID09PSB2b2lkIDApIHtcbiAgICAgIHN0ZXBzID0gMTtcbiAgICB9XG5cbiAgICB2YXIgcDEgPSAxIC8gc3RlcHMsXG4gICAgICAgIHAyID0gc3RlcHMgKyAoaW1tZWRpYXRlU3RhcnQgPyAwIDogMSksXG4gICAgICAgIHAzID0gaW1tZWRpYXRlU3RhcnQgPyAxIDogMCxcbiAgICAgICAgbWF4ID0gMSAtIF90aW55TnVtO1xuICAgIHJldHVybiBmdW5jdGlvbiAocCkge1xuICAgICAgcmV0dXJuICgocDIgKiBfY2xhbXAoMCwgbWF4LCBwKSB8IDApICsgcDMpICogcDE7XG4gICAgfTtcbiAgfVxufTtcbl9kZWZhdWx0cy5lYXNlID0gX2Vhc2VNYXBbXCJxdWFkLm91dFwiXTtcblxuX2ZvckVhY2hOYW1lKFwib25Db21wbGV0ZSxvblVwZGF0ZSxvblN0YXJ0LG9uUmVwZWF0LG9uUmV2ZXJzZUNvbXBsZXRlLG9uSW50ZXJydXB0XCIsIGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBfY2FsbGJhY2tOYW1lcyArPSBuYW1lICsgXCIsXCIgKyBuYW1lICsgXCJQYXJhbXMsXCI7XG59KTtcbi8qXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ0FDSEVcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuXG5leHBvcnQgdmFyIEdTQ2FjaGUgPSBmdW5jdGlvbiBHU0NhY2hlKHRhcmdldCwgaGFybmVzcykge1xuICB0aGlzLmlkID0gX2dzSUQrKztcbiAgdGFyZ2V0Ll9nc2FwID0gdGhpcztcbiAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gIHRoaXMuaGFybmVzcyA9IGhhcm5lc3M7XG4gIHRoaXMuZ2V0ID0gaGFybmVzcyA/IGhhcm5lc3MuZ2V0IDogX2dldFByb3BlcnR5O1xuICB0aGlzLnNldCA9IGhhcm5lc3MgPyBoYXJuZXNzLmdldFNldHRlciA6IF9nZXRTZXR0ZXI7XG59O1xuLypcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBBTklNQVRJT05cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuZXhwb3J0IHZhciBBbmltYXRpb24gPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBBbmltYXRpb24odmFycykge1xuICAgIHRoaXMudmFycyA9IHZhcnM7XG4gICAgdGhpcy5fZGVsYXkgPSArdmFycy5kZWxheSB8fCAwO1xuXG4gICAgaWYgKHRoaXMuX3JlcGVhdCA9IHZhcnMucmVwZWF0ID09PSBJbmZpbml0eSA/IC0yIDogdmFycy5yZXBlYXQgfHwgMCkge1xuICAgICAgLy8gVE9ETzogcmVwZWF0OiBJbmZpbml0eSBvbiBhIHRpbWVsaW5lJ3MgY2hpbGRyZW4gbXVzdCBmbGFnIHRoYXQgdGltZWxpbmUgaW50ZXJuYWxseSBhbmQgYWZmZWN0IGl0cyB0b3RhbER1cmF0aW9uLCBvdGhlcndpc2UgaXQnbGwgc3RvcCBpbiB0aGUgbmVnYXRpdmUgZGlyZWN0aW9uIHdoZW4gcmVhY2hpbmcgdGhlIHN0YXJ0LlxuICAgICAgdGhpcy5fckRlbGF5ID0gdmFycy5yZXBlYXREZWxheSB8fCAwO1xuICAgICAgdGhpcy5feW95byA9ICEhdmFycy55b3lvIHx8ICEhdmFycy55b3lvRWFzZTtcbiAgICB9XG5cbiAgICB0aGlzLl90cyA9IDE7XG5cbiAgICBfc2V0RHVyYXRpb24odGhpcywgK3ZhcnMuZHVyYXRpb24sIDEsIDEpO1xuXG4gICAgdGhpcy5kYXRhID0gdmFycy5kYXRhO1xuXG4gICAgaWYgKF9jb250ZXh0KSB7XG4gICAgICB0aGlzLl9jdHggPSBfY29udGV4dDtcblxuICAgICAgX2NvbnRleHQuZGF0YS5wdXNoKHRoaXMpO1xuICAgIH1cblxuICAgIF90aWNrZXJBY3RpdmUgfHwgX3RpY2tlci53YWtlKCk7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gQW5pbWF0aW9uLnByb3RvdHlwZTtcblxuICBfcHJvdG8uZGVsYXkgPSBmdW5jdGlvbiBkZWxheSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSB8fCB2YWx1ZSA9PT0gMCkge1xuICAgICAgdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuc21vb3RoQ2hpbGRUaW1pbmcgJiYgdGhpcy5zdGFydFRpbWUodGhpcy5fc3RhcnQgKyB2YWx1ZSAtIHRoaXMuX2RlbGF5KTtcbiAgICAgIHRoaXMuX2RlbGF5ID0gdmFsdWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fZGVsYXk7XG4gIH07XG5cbiAgX3Byb3RvLmR1cmF0aW9uID0gZnVuY3Rpb24gZHVyYXRpb24odmFsdWUpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IHRoaXMudG90YWxEdXJhdGlvbih0aGlzLl9yZXBlYXQgPiAwID8gdmFsdWUgKyAodmFsdWUgKyB0aGlzLl9yRGVsYXkpICogdGhpcy5fcmVwZWF0IDogdmFsdWUpIDogdGhpcy50b3RhbER1cmF0aW9uKCkgJiYgdGhpcy5fZHVyO1xuICB9O1xuXG4gIF9wcm90by50b3RhbER1cmF0aW9uID0gZnVuY3Rpb24gdG90YWxEdXJhdGlvbih2YWx1ZSkge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3REdXI7XG4gICAgfVxuXG4gICAgdGhpcy5fZGlydHkgPSAwO1xuICAgIHJldHVybiBfc2V0RHVyYXRpb24odGhpcywgdGhpcy5fcmVwZWF0IDwgMCA/IHZhbHVlIDogKHZhbHVlIC0gdGhpcy5fcmVwZWF0ICogdGhpcy5fckRlbGF5KSAvICh0aGlzLl9yZXBlYXQgKyAxKSk7XG4gIH07XG5cbiAgX3Byb3RvLnRvdGFsVGltZSA9IGZ1bmN0aW9uIHRvdGFsVGltZShfdG90YWxUaW1lLCBzdXBwcmVzc0V2ZW50cykge1xuICAgIF93YWtlKCk7XG5cbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLl90VGltZTtcbiAgICB9XG5cbiAgICB2YXIgcGFyZW50ID0gdGhpcy5fZHA7XG5cbiAgICBpZiAocGFyZW50ICYmIHBhcmVudC5zbW9vdGhDaGlsZFRpbWluZyAmJiB0aGlzLl90cykge1xuICAgICAgX2FsaWduUGxheWhlYWQodGhpcywgX3RvdGFsVGltZSk7XG5cbiAgICAgICFwYXJlbnQuX2RwIHx8IHBhcmVudC5wYXJlbnQgfHwgX3Bvc3RBZGRDaGVja3MocGFyZW50LCB0aGlzKTsgLy8gZWRnZSBjYXNlOiBpZiB0aGlzIGlzIGEgY2hpbGQgb2YgYSB0aW1lbGluZSB0aGF0IGFscmVhZHkgY29tcGxldGVkLCBmb3IgZXhhbXBsZSwgd2UgbXVzdCByZS1hY3RpdmF0ZSB0aGUgcGFyZW50LlxuICAgICAgLy9pbiBjYXNlIGFueSBvZiB0aGUgYW5jZXN0b3IgdGltZWxpbmVzIGhhZCBjb21wbGV0ZWQgYnV0IHNob3VsZCBub3cgYmUgZW5hYmxlZCwgd2Ugc2hvdWxkIHJlc2V0IHRoZWlyIHRvdGFsVGltZSgpIHdoaWNoIHdpbGwgYWxzbyBlbnN1cmUgdGhhdCB0aGV5J3JlIGxpbmVkIHVwIHByb3Blcmx5IGFuZCBlbmFibGVkLiBTa2lwIGZvciBhbmltYXRpb25zIHRoYXQgYXJlIG9uIHRoZSByb290ICh3YXN0ZWZ1bCkuIEV4YW1wbGU6IGEgVGltZWxpbmVMaXRlLmV4cG9ydFJvb3QoKSBpcyBwZXJmb3JtZWQgd2hlbiB0aGVyZSdzIGEgcGF1c2VkIHR3ZWVuIG9uIHRoZSByb290LCB0aGUgZXhwb3J0IHdpbGwgbm90IGNvbXBsZXRlIHVudGlsIHRoYXQgdHdlZW4gaXMgdW5wYXVzZWQsIGJ1dCBpbWFnaW5lIGEgY2hpbGQgZ2V0cyByZXN0YXJ0ZWQgbGF0ZXIsIGFmdGVyIGFsbCBbdW5wYXVzZWRdIHR3ZWVucyBoYXZlIGNvbXBsZXRlZC4gVGhlIHN0YXJ0IG9mIHRoYXQgY2hpbGQgd291bGQgZ2V0IHB1c2hlZCBvdXQsIGJ1dCBvbmUgb2YgdGhlIGFuY2VzdG9ycyBtYXkgaGF2ZSBjb21wbGV0ZWQuXG5cbiAgICAgIHdoaWxlIChwYXJlbnQgJiYgcGFyZW50LnBhcmVudCkge1xuICAgICAgICBpZiAocGFyZW50LnBhcmVudC5fdGltZSAhPT0gcGFyZW50Ll9zdGFydCArIChwYXJlbnQuX3RzID49IDAgPyBwYXJlbnQuX3RUaW1lIC8gcGFyZW50Ll90cyA6IChwYXJlbnQudG90YWxEdXJhdGlvbigpIC0gcGFyZW50Ll90VGltZSkgLyAtcGFyZW50Ll90cykpIHtcbiAgICAgICAgICBwYXJlbnQudG90YWxUaW1lKHBhcmVudC5fdFRpbWUsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLnBhcmVudCAmJiB0aGlzLl9kcC5hdXRvUmVtb3ZlQ2hpbGRyZW4gJiYgKHRoaXMuX3RzID4gMCAmJiBfdG90YWxUaW1lIDwgdGhpcy5fdER1ciB8fCB0aGlzLl90cyA8IDAgJiYgX3RvdGFsVGltZSA+IDAgfHwgIXRoaXMuX3REdXIgJiYgIV90b3RhbFRpbWUpKSB7XG4gICAgICAgIC8vaWYgdGhlIGFuaW1hdGlvbiBkb2Vzbid0IGhhdmUgYSBwYXJlbnQsIHB1dCBpdCBiYWNrIGludG8gaXRzIGxhc3QgcGFyZW50IChyZWNvcmRlZCBhcyBfZHAgZm9yIGV4YWN0bHkgY2FzZXMgbGlrZSB0aGlzKS4gTGltaXQgdG8gcGFyZW50cyB3aXRoIGF1dG9SZW1vdmVDaGlsZHJlbiAobGlrZSBnbG9iYWxUaW1lbGluZSkgc28gdGhhdCBpZiB0aGUgdXNlciBtYW51YWxseSByZW1vdmVzIGFuIGFuaW1hdGlvbiBmcm9tIGEgdGltZWxpbmUgYW5kIHRoZW4gYWx0ZXJzIGl0cyBwbGF5aGVhZCwgaXQgZG9lc24ndCBnZXQgYWRkZWQgYmFjayBpbi5cbiAgICAgICAgX2FkZFRvVGltZWxpbmUodGhpcy5fZHAsIHRoaXMsIHRoaXMuX3N0YXJ0IC0gdGhpcy5fZGVsYXkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl90VGltZSAhPT0gX3RvdGFsVGltZSB8fCAhdGhpcy5fZHVyICYmICFzdXBwcmVzc0V2ZW50cyB8fCB0aGlzLl9pbml0dGVkICYmIE1hdGguYWJzKHRoaXMuX3pUaW1lKSA9PT0gX3RpbnlOdW0gfHwgIV90b3RhbFRpbWUgJiYgIXRoaXMuX2luaXR0ZWQgJiYgKHRoaXMuYWRkIHx8IHRoaXMuX3B0TG9va3VwKSkge1xuICAgICAgLy8gY2hlY2sgZm9yIF9wdExvb2t1cCBvbiBhIFR3ZWVuIGluc3RhbmNlIHRvIGVuc3VyZSBpdCBoYXMgYWN0dWFsbHkgZmluaXNoZWQgYmVpbmcgaW5zdGFudGlhdGVkLCBvdGhlcndpc2UgaWYgdGhpcy5yZXZlcnNlKCkgZ2V0cyBjYWxsZWQgaW4gdGhlIEFuaW1hdGlvbiBjb25zdHJ1Y3RvciwgaXQgY291bGQgdHJpZ2dlciBhIHJlbmRlcigpIGhlcmUgZXZlbiB0aG91Z2ggdGhlIF90YXJnZXRzIHdlcmVuJ3QgcG9wdWxhdGVkLCB0aHVzIHdoZW4gX2luaXQoKSBpcyBjYWxsZWQgdGhlcmUgd29uJ3QgYmUgYW55IFByb3BUd2VlbnMgKGl0J2xsIGFjdCBsaWtlIHRoZSB0d2VlbiBpcyBub24tZnVuY3Rpb25hbClcbiAgICAgIHRoaXMuX3RzIHx8ICh0aGlzLl9wVGltZSA9IF90b3RhbFRpbWUpOyAvLyBvdGhlcndpc2UsIGlmIGFuIGFuaW1hdGlvbiBpcyBwYXVzZWQsIHRoZW4gdGhlIHBsYXloZWFkIGlzIG1vdmVkIGJhY2sgdG8gemVybywgdGhlbiByZXN1bWVkLCBpdCdkIHJldmVydCBiYWNrIHRvIHRoZSBvcmlnaW5hbCB0aW1lIGF0IHRoZSBwYXVzZVxuICAgICAgLy9pZiAoIXRoaXMuX2xvY2spIHsgLy8gYXZvaWQgZW5kbGVzcyByZWN1cnNpb24gKG5vdCBzdXJlIHdlIG5lZWQgdGhpcyB5ZXQgb3IgaWYgaXQncyB3b3J0aCB0aGUgcGVyZm9ybWFuY2UgaGl0KVxuICAgICAgLy8gICB0aGlzLl9sb2NrID0gMTtcblxuICAgICAgX2xhenlTYWZlUmVuZGVyKHRoaXMsIF90b3RhbFRpbWUsIHN1cHByZXNzRXZlbnRzKTsgLy8gICB0aGlzLl9sb2NrID0gMDtcbiAgICAgIC8vfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLnRpbWUgPSBmdW5jdGlvbiB0aW1lKHZhbHVlLCBzdXBwcmVzc0V2ZW50cykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gdGhpcy50b3RhbFRpbWUoTWF0aC5taW4odGhpcy50b3RhbER1cmF0aW9uKCksIHZhbHVlICsgX2VsYXBzZWRDeWNsZUR1cmF0aW9uKHRoaXMpKSAlICh0aGlzLl9kdXIgKyB0aGlzLl9yRGVsYXkpIHx8ICh2YWx1ZSA/IHRoaXMuX2R1ciA6IDApLCBzdXBwcmVzc0V2ZW50cykgOiB0aGlzLl90aW1lOyAvLyBub3RlOiBpZiB0aGUgbW9kdWx1cyByZXN1bHRzIGluIDAsIHRoZSBwbGF5aGVhZCBjb3VsZCBiZSBleGFjdGx5IGF0IHRoZSBlbmQgb3IgdGhlIGJlZ2lubmluZywgYW5kIHdlIGFsd2F5cyBkZWZlciB0byB0aGUgRU5EIHdpdGggYSBub24temVybyB2YWx1ZSwgb3RoZXJ3aXNlIGlmIHlvdSBzZXQgdGhlIHRpbWUoKSB0byB0aGUgdmVyeSBlbmQgKGR1cmF0aW9uKCkpLCBpdCB3b3VsZCByZW5kZXIgYXQgdGhlIFNUQVJUIVxuICB9O1xuXG4gIF9wcm90by50b3RhbFByb2dyZXNzID0gZnVuY3Rpb24gdG90YWxQcm9ncmVzcyh2YWx1ZSwgc3VwcHJlc3NFdmVudHMpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IHRoaXMudG90YWxUaW1lKHRoaXMudG90YWxEdXJhdGlvbigpICogdmFsdWUsIHN1cHByZXNzRXZlbnRzKSA6IHRoaXMudG90YWxEdXJhdGlvbigpID8gTWF0aC5taW4oMSwgdGhpcy5fdFRpbWUgLyB0aGlzLl90RHVyKSA6IHRoaXMucmF0aW87XG4gIH07XG5cbiAgX3Byb3RvLnByb2dyZXNzID0gZnVuY3Rpb24gcHJvZ3Jlc3ModmFsdWUsIHN1cHByZXNzRXZlbnRzKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyB0aGlzLnRvdGFsVGltZSh0aGlzLmR1cmF0aW9uKCkgKiAodGhpcy5feW95byAmJiAhKHRoaXMuaXRlcmF0aW9uKCkgJiAxKSA/IDEgLSB2YWx1ZSA6IHZhbHVlKSArIF9lbGFwc2VkQ3ljbGVEdXJhdGlvbih0aGlzKSwgc3VwcHJlc3NFdmVudHMpIDogdGhpcy5kdXJhdGlvbigpID8gTWF0aC5taW4oMSwgdGhpcy5fdGltZSAvIHRoaXMuX2R1cikgOiB0aGlzLnJhdGlvO1xuICB9O1xuXG4gIF9wcm90by5pdGVyYXRpb24gPSBmdW5jdGlvbiBpdGVyYXRpb24odmFsdWUsIHN1cHByZXNzRXZlbnRzKSB7XG4gICAgdmFyIGN5Y2xlRHVyYXRpb24gPSB0aGlzLmR1cmF0aW9uKCkgKyB0aGlzLl9yRGVsYXk7XG5cbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IHRoaXMudG90YWxUaW1lKHRoaXMuX3RpbWUgKyAodmFsdWUgLSAxKSAqIGN5Y2xlRHVyYXRpb24sIHN1cHByZXNzRXZlbnRzKSA6IHRoaXMuX3JlcGVhdCA/IF9hbmltYXRpb25DeWNsZSh0aGlzLl90VGltZSwgY3ljbGVEdXJhdGlvbikgKyAxIDogMTtcbiAgfSAvLyBwb3RlbnRpYWwgZnV0dXJlIGFkZGl0aW9uOlxuICAvLyBpc1BsYXlpbmdCYWNrd2FyZHMoKSB7XG4gIC8vIFx0bGV0IGFuaW1hdGlvbiA9IHRoaXMsXG4gIC8vIFx0XHRvcmllbnRhdGlvbiA9IDE7IC8vIDEgPSBmb3J3YXJkLCAtMSA9IGJhY2t3YXJkXG4gIC8vIFx0d2hpbGUgKGFuaW1hdGlvbikge1xuICAvLyBcdFx0b3JpZW50YXRpb24gKj0gYW5pbWF0aW9uLnJldmVyc2VkKCkgfHwgKGFuaW1hdGlvbi5yZXBlYXQoKSAmJiAhKGFuaW1hdGlvbi5pdGVyYXRpb24oKSAmIDEpKSA/IC0xIDogMTtcbiAgLy8gXHRcdGFuaW1hdGlvbiA9IGFuaW1hdGlvbi5wYXJlbnQ7XG4gIC8vIFx0fVxuICAvLyBcdHJldHVybiBvcmllbnRhdGlvbiA8IDA7XG4gIC8vIH1cbiAgO1xuXG4gIF9wcm90by50aW1lU2NhbGUgPSBmdW5jdGlvbiB0aW1lU2NhbGUodmFsdWUpIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9ydHMgPT09IC1fdGlueU51bSA/IDAgOiB0aGlzLl9ydHM7IC8vIHJlY29yZGVkIHRpbWVTY2FsZS4gU3BlY2lhbCBjYXNlOiBpZiBzb21lb25lIGNhbGxzIHJldmVyc2UoKSBvbiBhbiBhbmltYXRpb24gd2l0aCB0aW1lU2NhbGUgb2YgMCwgd2UgYXNzaWduIGl0IC1fdGlueU51bSB0byByZW1lbWJlciBpdCdzIHJldmVyc2VkLlxuICAgIH1cblxuICAgIGlmICh0aGlzLl9ydHMgPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB2YXIgdFRpbWUgPSB0aGlzLnBhcmVudCAmJiB0aGlzLl90cyA/IF9wYXJlbnRUb0NoaWxkVG90YWxUaW1lKHRoaXMucGFyZW50Ll90aW1lLCB0aGlzKSA6IHRoaXMuX3RUaW1lOyAvLyBtYWtlIHN1cmUgdG8gZG8gdGhlIHBhcmVudFRvQ2hpbGRUb3RhbFRpbWUoKSBCRUZPUkUgc2V0dGluZyB0aGUgbmV3IF90cyBiZWNhdXNlIHRoZSBvbGQgb25lIG11c3QgYmUgdXNlZCBpbiB0aGF0IGNhbGN1bGF0aW9uLlxuICAgIC8vIGZ1dHVyZSBhZGRpdGlvbj8gVXAgc2lkZTogZmFzdCBhbmQgbWluaW1hbCBmaWxlIHNpemUuIERvd24gc2lkZTogb25seSB3b3JrcyBvbiB0aGlzIGFuaW1hdGlvbjsgaWYgYSB0aW1lbGluZSBpcyByZXZlcnNlZCwgZm9yIGV4YW1wbGUsIGl0cyBjaGlsZHJlbnMnIG9uUmV2ZXJzZSB3b3VsZG4ndCBnZXQgY2FsbGVkLlxuICAgIC8vKCt2YWx1ZSA8IDAgJiYgdGhpcy5fcnRzID49IDApICYmIF9jYWxsYmFjayh0aGlzLCBcIm9uUmV2ZXJzZVwiLCB0cnVlKTtcbiAgICAvLyBwcmlvcml0aXplIHJlbmRlcmluZyB3aGVyZSB0aGUgcGFyZW50J3MgcGxheWhlYWQgbGluZXMgdXAgaW5zdGVhZCBvZiB0aGlzLl90VGltZSBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIGEgdHdlZW4gdGhhdCdzIGFuaW1hdGluZyBhbm90aGVyIHR3ZWVuJ3MgdGltZVNjYWxlIGluIHRoZSBzYW1lIHJlbmRlcmluZyBsb29wIChzYW1lIHBhcmVudCksIHRodXMgaWYgdGhlIHRpbWVTY2FsZSB0d2VlbiByZW5kZXJzIGZpcnN0LCBpdCB3b3VsZCBhbHRlciBfc3RhcnQgQkVGT1JFIF90VGltZSB3YXMgc2V0IG9uIHRoYXQgdGljayAoaW4gdGhlIHJlbmRlcmluZyBsb29wKSwgZWZmZWN0aXZlbHkgZnJlZXppbmcgaXQgdW50aWwgdGhlIHRpbWVTY2FsZSB0d2VlbiBmaW5pc2hlcy5cblxuICAgIHRoaXMuX3J0cyA9ICt2YWx1ZSB8fCAwO1xuICAgIHRoaXMuX3RzID0gdGhpcy5fcHMgfHwgdmFsdWUgPT09IC1fdGlueU51bSA/IDAgOiB0aGlzLl9ydHM7IC8vIF90cyBpcyB0aGUgZnVuY3Rpb25hbCB0aW1lU2NhbGUgd2hpY2ggd291bGQgYmUgMCBpZiB0aGUgYW5pbWF0aW9uIGlzIHBhdXNlZC5cblxuICAgIHRoaXMudG90YWxUaW1lKF9jbGFtcCgtTWF0aC5hYnModGhpcy5fZGVsYXkpLCB0aGlzLl90RHVyLCB0VGltZSksIHRydWUpO1xuXG4gICAgX3NldEVuZCh0aGlzKTsgLy8gaWYgcGFyZW50LnNtb290aENoaWxkVGltaW5nIHdhcyBmYWxzZSwgdGhlIGVuZCB0aW1lIGRpZG4ndCBnZXQgdXBkYXRlZCBpbiB0aGUgX2FsaWduUGxheWhlYWQoKSBtZXRob2QsIHNvIGRvIGl0IGhlcmUuXG5cblxuICAgIHJldHVybiBfcmVjYWNoZUFuY2VzdG9ycyh0aGlzKTtcbiAgfTtcblxuICBfcHJvdG8ucGF1c2VkID0gZnVuY3Rpb24gcGF1c2VkKHZhbHVlKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcHM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3BzICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fcHMgPSB2YWx1ZTtcblxuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3BUaW1lID0gdGhpcy5fdFRpbWUgfHwgTWF0aC5tYXgoLXRoaXMuX2RlbGF5LCB0aGlzLnJhd1RpbWUoKSk7IC8vIGlmIHRoZSBwYXVzZSBvY2N1cnMgZHVyaW5nIHRoZSBkZWxheSBwaGFzZSwgbWFrZSBzdXJlIHRoYXQncyBmYWN0b3JlZCBpbiB3aGVuIHJlc3VtaW5nLlxuXG4gICAgICAgIHRoaXMuX3RzID0gdGhpcy5fYWN0ID0gMDsgLy8gX3RzIGlzIHRoZSBmdW5jdGlvbmFsIHRpbWVTY2FsZSwgc28gYSBwYXVzZWQgdHdlZW4gd291bGQgZWZmZWN0aXZlbHkgaGF2ZSBhIHRpbWVTY2FsZSBvZiAwLiBXZSByZWNvcmQgdGhlIFwicmVhbFwiIHRpbWVTY2FsZSBhcyBfcnRzIChyZWNvcmRlZCB0aW1lIHNjYWxlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3dha2UoKTtcblxuICAgICAgICB0aGlzLl90cyA9IHRoaXMuX3J0czsgLy9vbmx5IGRlZmVyIHRvIF9wVGltZSAocGF1c2VUaW1lKSBpZiB0VGltZSBpcyB6ZXJvLiBSZW1lbWJlciwgc29tZW9uZSBjb3VsZCBwYXVzZSgpIGFuIGFuaW1hdGlvbiwgdGhlbiBzY3J1YiB0aGUgcGxheWhlYWQgYW5kIHJlc3VtZSgpLiBJZiB0aGUgcGFyZW50IGRvZXNuJ3QgaGF2ZSBzbW9vdGhDaGlsZFRpbWluZywgd2UgcmVuZGVyIGF0IHRoZSByYXdUaW1lKCkgYmVjYXVzZSB0aGUgc3RhcnRUaW1lIHdvbid0IGdldCB1cGRhdGVkLlxuXG4gICAgICAgIHRoaXMudG90YWxUaW1lKHRoaXMucGFyZW50ICYmICF0aGlzLnBhcmVudC5zbW9vdGhDaGlsZFRpbWluZyA/IHRoaXMucmF3VGltZSgpIDogdGhpcy5fdFRpbWUgfHwgdGhpcy5fcFRpbWUsIHRoaXMucHJvZ3Jlc3MoKSA9PT0gMSAmJiBNYXRoLmFicyh0aGlzLl96VGltZSkgIT09IF90aW55TnVtICYmICh0aGlzLl90VGltZSAtPSBfdGlueU51bSkpOyAvLyBlZGdlIGNhc2U6IGFuaW1hdGlvbi5wcm9ncmVzcygxKS5wYXVzZSgpLnBsYXkoKSB3b3VsZG4ndCByZW5kZXIgYWdhaW4gYmVjYXVzZSB0aGUgcGxheWhlYWQgaXMgYWxyZWFkeSBhdCB0aGUgZW5kLCBidXQgdGhlIGNhbGwgdG8gdG90YWxUaW1lKCkgYmVsb3cgd2lsbCBhZGQgaXQgYmFjayB0byBpdHMgcGFyZW50Li4uYW5kIG5vdCByZW1vdmUgaXQgYWdhaW4gKHNpbmNlIHJlbW92aW5nIG9ubHkgaGFwcGVucyB1cG9uIHJlbmRlcmluZyBhdCBhIG5ldyB0aW1lKS4gT2Zmc2V0dGluZyB0aGUgX3RUaW1lIHNsaWdodGx5IGlzIGRvbmUgc2ltcGx5IHRvIGNhdXNlIHRoZSBmaW5hbCByZW5kZXIgaW4gdG90YWxUaW1lKCkgdGhhdCdsbCBwb3AgaXQgb2ZmIGl0cyB0aW1lbGluZSAoaWYgYXV0b1JlbW92ZUNoaWxkcmVuIGlzIHRydWUsIG9mIGNvdXJzZSkuIENoZWNrIHRvIG1ha2Ugc3VyZSBfelRpbWUgaXNuJ3QgLV90aW55TnVtIHRvIGF2b2lkIGFuIGVkZ2UgY2FzZSB3aGVyZSB0aGUgcGxheWhlYWQgaXMgcHVzaGVkIHRvIHRoZSBlbmQgYnV0IElOU0lERSBhIHR3ZWVuL2NhbGxiYWNrLCB0aGUgdGltZWxpbmUgaXRzZWxmIGlzIHBhdXNlZCB0aHVzIGhhbHRpbmcgcmVuZGVyaW5nIGFuZCBsZWF2aW5nIGEgZmV3IHVucmVuZGVyZWQuIFdoZW4gcmVzdW1pbmcsIGl0IHdvdWxkbid0IHJlbmRlciB0aG9zZSBvdGhlcndpc2UuXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLnN0YXJ0VGltZSA9IGZ1bmN0aW9uIHN0YXJ0VGltZSh2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9zdGFydCA9IHZhbHVlO1xuICAgICAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50IHx8IHRoaXMuX2RwO1xuICAgICAgcGFyZW50ICYmIChwYXJlbnQuX3NvcnQgfHwgIXRoaXMucGFyZW50KSAmJiBfYWRkVG9UaW1lbGluZShwYXJlbnQsIHRoaXMsIHZhbHVlIC0gdGhpcy5fZGVsYXkpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3N0YXJ0O1xuICB9O1xuXG4gIF9wcm90by5lbmRUaW1lID0gZnVuY3Rpb24gZW5kVGltZShpbmNsdWRlUmVwZWF0cykge1xuICAgIHJldHVybiB0aGlzLl9zdGFydCArIChfaXNOb3RGYWxzZShpbmNsdWRlUmVwZWF0cykgPyB0aGlzLnRvdGFsRHVyYXRpb24oKSA6IHRoaXMuZHVyYXRpb24oKSkgLyBNYXRoLmFicyh0aGlzLl90cyB8fCAxKTtcbiAgfTtcblxuICBfcHJvdG8ucmF3VGltZSA9IGZ1bmN0aW9uIHJhd1RpbWUod3JhcFJlcGVhdHMpIHtcbiAgICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnQgfHwgdGhpcy5fZHA7IC8vIF9kcCA9IGRldGFjaGVkIHBhcmVudFxuXG4gICAgcmV0dXJuICFwYXJlbnQgPyB0aGlzLl90VGltZSA6IHdyYXBSZXBlYXRzICYmICghdGhpcy5fdHMgfHwgdGhpcy5fcmVwZWF0ICYmIHRoaXMuX3RpbWUgJiYgdGhpcy50b3RhbFByb2dyZXNzKCkgPCAxKSA/IHRoaXMuX3RUaW1lICUgKHRoaXMuX2R1ciArIHRoaXMuX3JEZWxheSkgOiAhdGhpcy5fdHMgPyB0aGlzLl90VGltZSA6IF9wYXJlbnRUb0NoaWxkVG90YWxUaW1lKHBhcmVudC5yYXdUaW1lKHdyYXBSZXBlYXRzKSwgdGhpcyk7XG4gIH07XG5cbiAgX3Byb3RvLnJldmVydCA9IGZ1bmN0aW9uIHJldmVydChjb25maWcpIHtcbiAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHtcbiAgICAgIGNvbmZpZyA9IF9yZXZlcnRDb25maWc7XG4gICAgfVxuXG4gICAgdmFyIHByZXZJc1JldmVydGluZyA9IF9yZXZlcnRpbmc7XG4gICAgX3JldmVydGluZyA9IGNvbmZpZztcblxuICAgIGlmICh0aGlzLl9pbml0dGVkIHx8IHRoaXMuX3N0YXJ0QXQpIHtcbiAgICAgIHRoaXMudGltZWxpbmUgJiYgdGhpcy50aW1lbGluZS5yZXZlcnQoY29uZmlnKTtcbiAgICAgIHRoaXMudG90YWxUaW1lKC0wLjAxLCBjb25maWcuc3VwcHJlc3NFdmVudHMpO1xuICAgIH1cblxuICAgIHRoaXMuZGF0YSAhPT0gXCJuZXN0ZWRcIiAmJiBjb25maWcua2lsbCAhPT0gZmFsc2UgJiYgdGhpcy5raWxsKCk7XG4gICAgX3JldmVydGluZyA9IHByZXZJc1JldmVydGluZztcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8uZ2xvYmFsVGltZSA9IGZ1bmN0aW9uIGdsb2JhbFRpbWUocmF3VGltZSkge1xuICAgIHZhciBhbmltYXRpb24gPSB0aGlzLFxuICAgICAgICB0aW1lID0gYXJndW1lbnRzLmxlbmd0aCA/IHJhd1RpbWUgOiBhbmltYXRpb24ucmF3VGltZSgpO1xuXG4gICAgd2hpbGUgKGFuaW1hdGlvbikge1xuICAgICAgdGltZSA9IGFuaW1hdGlvbi5fc3RhcnQgKyB0aW1lIC8gKGFuaW1hdGlvbi5fdHMgfHwgMSk7XG4gICAgICBhbmltYXRpb24gPSBhbmltYXRpb24uX2RwO1xuICAgIH1cblxuICAgIHJldHVybiAhdGhpcy5wYXJlbnQgJiYgdGhpcy5fc2F0ID8gdGhpcy5fc2F0LnZhcnMuaW1tZWRpYXRlUmVuZGVyID8gLTEgOiB0aGlzLl9zYXQuZ2xvYmFsVGltZShyYXdUaW1lKSA6IHRpbWU7IC8vIHRoZSBfc3RhcnRBdCB0d2VlbnMgZm9yIC5mcm9tVG8oKSBhbmQgLmZyb20oKSB0aGF0IGhhdmUgaW1tZWRpYXRlUmVuZGVyIHNob3VsZCBhbHdheXMgYmUgRklSU1QgaW4gdGhlIHRpbWVsaW5lIChpbXBvcnRhbnQgZm9yIGNvbnRleHQucmV2ZXJ0KCkpLiBcIl9zYXRcIiBzdGFuZHMgZm9yIF9zdGFydEF0VHdlZW4sIHJlZmVycmluZyB0byB0aGUgcGFyZW50IHR3ZWVuIHRoYXQgY3JlYXRlZCB0aGUgX3N0YXJ0QXQuIFdlIG11c3QgZGlzY2VybiBpZiB0aGF0IHR3ZWVuIGhhZCBpbW1lZGlhdGVSZW5kZXIgc28gdGhhdCB3ZSBjYW4ga25vdyB3aGV0aGVyIG9yIG5vdCB0byBwcmlvcml0aXplIGl0IGluIHJldmVydCgpLlxuICB9O1xuXG4gIF9wcm90by5yZXBlYXQgPSBmdW5jdGlvbiByZXBlYXQodmFsdWUpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgdGhpcy5fcmVwZWF0ID0gdmFsdWUgPT09IEluZmluaXR5ID8gLTIgOiB2YWx1ZTtcbiAgICAgIHJldHVybiBfb25VcGRhdGVUb3RhbER1cmF0aW9uKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9yZXBlYXQgPT09IC0yID8gSW5maW5pdHkgOiB0aGlzLl9yZXBlYXQ7XG4gIH07XG5cbiAgX3Byb3RvLnJlcGVhdERlbGF5ID0gZnVuY3Rpb24gcmVwZWF0RGVsYXkodmFsdWUpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgdmFyIHRpbWUgPSB0aGlzLl90aW1lO1xuICAgICAgdGhpcy5fckRlbGF5ID0gdmFsdWU7XG5cbiAgICAgIF9vblVwZGF0ZVRvdGFsRHVyYXRpb24odGhpcyk7XG5cbiAgICAgIHJldHVybiB0aW1lID8gdGhpcy50aW1lKHRpbWUpIDogdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fckRlbGF5O1xuICB9O1xuXG4gIF9wcm90by55b3lvID0gZnVuY3Rpb24geW95byh2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl95b3lvID0gdmFsdWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5feW95bztcbiAgfTtcblxuICBfcHJvdG8uc2VlayA9IGZ1bmN0aW9uIHNlZWsocG9zaXRpb24sIHN1cHByZXNzRXZlbnRzKSB7XG4gICAgcmV0dXJuIHRoaXMudG90YWxUaW1lKF9wYXJzZVBvc2l0aW9uKHRoaXMsIHBvc2l0aW9uKSwgX2lzTm90RmFsc2Uoc3VwcHJlc3NFdmVudHMpKTtcbiAgfTtcblxuICBfcHJvdG8ucmVzdGFydCA9IGZ1bmN0aW9uIHJlc3RhcnQoaW5jbHVkZURlbGF5LCBzdXBwcmVzc0V2ZW50cykge1xuICAgIHJldHVybiB0aGlzLnBsYXkoKS50b3RhbFRpbWUoaW5jbHVkZURlbGF5ID8gLXRoaXMuX2RlbGF5IDogMCwgX2lzTm90RmFsc2Uoc3VwcHJlc3NFdmVudHMpKTtcbiAgfTtcblxuICBfcHJvdG8ucGxheSA9IGZ1bmN0aW9uIHBsYXkoZnJvbSwgc3VwcHJlc3NFdmVudHMpIHtcbiAgICBmcm9tICE9IG51bGwgJiYgdGhpcy5zZWVrKGZyb20sIHN1cHByZXNzRXZlbnRzKTtcbiAgICByZXR1cm4gdGhpcy5yZXZlcnNlZChmYWxzZSkucGF1c2VkKGZhbHNlKTtcbiAgfTtcblxuICBfcHJvdG8ucmV2ZXJzZSA9IGZ1bmN0aW9uIHJldmVyc2UoZnJvbSwgc3VwcHJlc3NFdmVudHMpIHtcbiAgICBmcm9tICE9IG51bGwgJiYgdGhpcy5zZWVrKGZyb20gfHwgdGhpcy50b3RhbER1cmF0aW9uKCksIHN1cHByZXNzRXZlbnRzKTtcbiAgICByZXR1cm4gdGhpcy5yZXZlcnNlZCh0cnVlKS5wYXVzZWQoZmFsc2UpO1xuICB9O1xuXG4gIF9wcm90by5wYXVzZSA9IGZ1bmN0aW9uIHBhdXNlKGF0VGltZSwgc3VwcHJlc3NFdmVudHMpIHtcbiAgICBhdFRpbWUgIT0gbnVsbCAmJiB0aGlzLnNlZWsoYXRUaW1lLCBzdXBwcmVzc0V2ZW50cyk7XG4gICAgcmV0dXJuIHRoaXMucGF1c2VkKHRydWUpO1xuICB9O1xuXG4gIF9wcm90by5yZXN1bWUgPSBmdW5jdGlvbiByZXN1bWUoKSB7XG4gICAgcmV0dXJuIHRoaXMucGF1c2VkKGZhbHNlKTtcbiAgfTtcblxuICBfcHJvdG8ucmV2ZXJzZWQgPSBmdW5jdGlvbiByZXZlcnNlZCh2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAhIXZhbHVlICE9PSB0aGlzLnJldmVyc2VkKCkgJiYgdGhpcy50aW1lU2NhbGUoLXRoaXMuX3J0cyB8fCAodmFsdWUgPyAtX3RpbnlOdW0gOiAwKSk7IC8vIGluIGNhc2UgdGltZVNjYWxlIGlzIHplcm8sIHJldmVyc2luZyB3b3VsZCBoYXZlIG5vIGVmZmVjdCBzbyB3ZSB1c2UgX3RpbnlOdW0uXG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9ydHMgPCAwO1xuICB9O1xuXG4gIF9wcm90by5pbnZhbGlkYXRlID0gZnVuY3Rpb24gaW52YWxpZGF0ZSgpIHtcbiAgICB0aGlzLl9pbml0dGVkID0gdGhpcy5fYWN0ID0gMDtcbiAgICB0aGlzLl96VGltZSA9IC1fdGlueU51bTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8uaXNBY3RpdmUgPSBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnQgfHwgdGhpcy5fZHAsXG4gICAgICAgIHN0YXJ0ID0gdGhpcy5fc3RhcnQsXG4gICAgICAgIHJhd1RpbWU7XG4gICAgcmV0dXJuICEhKCFwYXJlbnQgfHwgdGhpcy5fdHMgJiYgdGhpcy5faW5pdHRlZCAmJiBwYXJlbnQuaXNBY3RpdmUoKSAmJiAocmF3VGltZSA9IHBhcmVudC5yYXdUaW1lKHRydWUpKSA+PSBzdGFydCAmJiByYXdUaW1lIDwgdGhpcy5lbmRUaW1lKHRydWUpIC0gX3RpbnlOdW0pO1xuICB9O1xuXG4gIF9wcm90by5ldmVudENhbGxiYWNrID0gZnVuY3Rpb24gZXZlbnRDYWxsYmFjayh0eXBlLCBjYWxsYmFjaywgcGFyYW1zKSB7XG4gICAgdmFyIHZhcnMgPSB0aGlzLnZhcnM7XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgZGVsZXRlIHZhcnNbdHlwZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXJzW3R5cGVdID0gY2FsbGJhY2s7XG4gICAgICAgIHBhcmFtcyAmJiAodmFyc1t0eXBlICsgXCJQYXJhbXNcIl0gPSBwYXJhbXMpO1xuICAgICAgICB0eXBlID09PSBcIm9uVXBkYXRlXCIgJiYgKHRoaXMuX29uVXBkYXRlID0gY2FsbGJhY2spO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gdmFyc1t0eXBlXTtcbiAgfTtcblxuICBfcHJvdG8udGhlbiA9IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICB2YXIgZiA9IF9pc0Z1bmN0aW9uKG9uRnVsZmlsbGVkKSA/IG9uRnVsZmlsbGVkIDogX3Bhc3NUaHJvdWdoLFxuICAgICAgICAgIF9yZXNvbHZlID0gZnVuY3Rpb24gX3Jlc29sdmUoKSB7XG4gICAgICAgIHZhciBfdGhlbiA9IHNlbGYudGhlbjtcbiAgICAgICAgc2VsZi50aGVuID0gbnVsbDsgLy8gdGVtcG9yYXJpbHkgbnVsbCB0aGUgdGhlbigpIG1ldGhvZCB0byBhdm9pZCBhbiBpbmZpbml0ZSBsb29wIChzZWUgaHR0cHM6Ly9naXRodWIuY29tL2dyZWVuc29jay9HU0FQL2lzc3Vlcy8zMjIpXG5cbiAgICAgICAgX2lzRnVuY3Rpb24oZikgJiYgKGYgPSBmKHNlbGYpKSAmJiAoZi50aGVuIHx8IGYgPT09IHNlbGYpICYmIChzZWxmLnRoZW4gPSBfdGhlbik7XG4gICAgICAgIHJlc29sdmUoZik7XG4gICAgICAgIHNlbGYudGhlbiA9IF90aGVuO1xuICAgICAgfTtcblxuICAgICAgaWYgKHNlbGYuX2luaXR0ZWQgJiYgc2VsZi50b3RhbFByb2dyZXNzKCkgPT09IDEgJiYgc2VsZi5fdHMgPj0gMCB8fCAhc2VsZi5fdFRpbWUgJiYgc2VsZi5fdHMgPCAwKSB7XG4gICAgICAgIF9yZXNvbHZlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLl9wcm9tID0gX3Jlc29sdmU7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLmtpbGwgPSBmdW5jdGlvbiBraWxsKCkge1xuICAgIF9pbnRlcnJ1cHQodGhpcyk7XG4gIH07XG5cbiAgcmV0dXJuIEFuaW1hdGlvbjtcbn0oKTtcblxuX3NldERlZmF1bHRzKEFuaW1hdGlvbi5wcm90b3R5cGUsIHtcbiAgX3RpbWU6IDAsXG4gIF9zdGFydDogMCxcbiAgX2VuZDogMCxcbiAgX3RUaW1lOiAwLFxuICBfdER1cjogMCxcbiAgX2RpcnR5OiAwLFxuICBfcmVwZWF0OiAwLFxuICBfeW95bzogZmFsc2UsXG4gIHBhcmVudDogbnVsbCxcbiAgX2luaXR0ZWQ6IGZhbHNlLFxuICBfckRlbGF5OiAwLFxuICBfdHM6IDEsXG4gIF9kcDogMCxcbiAgcmF0aW86IDAsXG4gIF96VGltZTogLV90aW55TnVtLFxuICBfcHJvbTogMCxcbiAgX3BzOiBmYWxzZSxcbiAgX3J0czogMVxufSk7XG4vKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVElNRUxJTkVcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5cbmV4cG9ydCB2YXIgVGltZWxpbmUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9BbmltYXRpb24pIHtcbiAgX2luaGVyaXRzTG9vc2UoVGltZWxpbmUsIF9BbmltYXRpb24pO1xuXG4gIGZ1bmN0aW9uIFRpbWVsaW5lKHZhcnMsIHBvc2l0aW9uKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgaWYgKHZhcnMgPT09IHZvaWQgMCkge1xuICAgICAgdmFycyA9IHt9O1xuICAgIH1cblxuICAgIF90aGlzID0gX0FuaW1hdGlvbi5jYWxsKHRoaXMsIHZhcnMpIHx8IHRoaXM7XG4gICAgX3RoaXMubGFiZWxzID0ge307XG4gICAgX3RoaXMuc21vb3RoQ2hpbGRUaW1pbmcgPSAhIXZhcnMuc21vb3RoQ2hpbGRUaW1pbmc7XG4gICAgX3RoaXMuYXV0b1JlbW92ZUNoaWxkcmVuID0gISF2YXJzLmF1dG9SZW1vdmVDaGlsZHJlbjtcbiAgICBfdGhpcy5fc29ydCA9IF9pc05vdEZhbHNlKHZhcnMuc29ydENoaWxkcmVuKTtcbiAgICBfZ2xvYmFsVGltZWxpbmUgJiYgX2FkZFRvVGltZWxpbmUodmFycy5wYXJlbnQgfHwgX2dsb2JhbFRpbWVsaW5lLCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgcG9zaXRpb24pO1xuICAgIHZhcnMucmV2ZXJzZWQgJiYgX3RoaXMucmV2ZXJzZSgpO1xuICAgIHZhcnMucGF1c2VkICYmIF90aGlzLnBhdXNlZCh0cnVlKTtcbiAgICB2YXJzLnNjcm9sbFRyaWdnZXIgJiYgX3Njcm9sbFRyaWdnZXIoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIHZhcnMuc2Nyb2xsVHJpZ2dlcik7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90bzIgPSBUaW1lbGluZS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvMi50byA9IGZ1bmN0aW9uIHRvKHRhcmdldHMsIHZhcnMsIHBvc2l0aW9uKSB7XG4gICAgX2NyZWF0ZVR3ZWVuVHlwZSgwLCBhcmd1bWVudHMsIHRoaXMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvMi5mcm9tID0gZnVuY3Rpb24gZnJvbSh0YXJnZXRzLCB2YXJzLCBwb3NpdGlvbikge1xuICAgIF9jcmVhdGVUd2VlblR5cGUoMSwgYXJndW1lbnRzLCB0aGlzKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90bzIuZnJvbVRvID0gZnVuY3Rpb24gZnJvbVRvKHRhcmdldHMsIGZyb21WYXJzLCB0b1ZhcnMsIHBvc2l0aW9uKSB7XG4gICAgX2NyZWF0ZVR3ZWVuVHlwZSgyLCBhcmd1bWVudHMsIHRoaXMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvMi5zZXQgPSBmdW5jdGlvbiBzZXQodGFyZ2V0cywgdmFycywgcG9zaXRpb24pIHtcbiAgICB2YXJzLmR1cmF0aW9uID0gMDtcbiAgICB2YXJzLnBhcmVudCA9IHRoaXM7XG4gICAgX2luaGVyaXREZWZhdWx0cyh2YXJzKS5yZXBlYXREZWxheSB8fCAodmFycy5yZXBlYXQgPSAwKTtcbiAgICB2YXJzLmltbWVkaWF0ZVJlbmRlciA9ICEhdmFycy5pbW1lZGlhdGVSZW5kZXI7XG4gICAgbmV3IFR3ZWVuKHRhcmdldHMsIHZhcnMsIF9wYXJzZVBvc2l0aW9uKHRoaXMsIHBvc2l0aW9uKSwgMSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvMi5jYWxsID0gZnVuY3Rpb24gY2FsbChjYWxsYmFjaywgcGFyYW1zLCBwb3NpdGlvbikge1xuICAgIHJldHVybiBfYWRkVG9UaW1lbGluZSh0aGlzLCBUd2Vlbi5kZWxheWVkQ2FsbCgwLCBjYWxsYmFjaywgcGFyYW1zKSwgcG9zaXRpb24pO1xuICB9IC8vT05MWSBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSEgTWF5YmUgZGVsZXRlP1xuICA7XG5cbiAgX3Byb3RvMi5zdGFnZ2VyVG8gPSBmdW5jdGlvbiBzdGFnZ2VyVG8odGFyZ2V0cywgZHVyYXRpb24sIHZhcnMsIHN0YWdnZXIsIHBvc2l0aW9uLCBvbkNvbXBsZXRlQWxsLCBvbkNvbXBsZXRlQWxsUGFyYW1zKSB7XG4gICAgdmFycy5kdXJhdGlvbiA9IGR1cmF0aW9uO1xuICAgIHZhcnMuc3RhZ2dlciA9IHZhcnMuc3RhZ2dlciB8fCBzdGFnZ2VyO1xuICAgIHZhcnMub25Db21wbGV0ZSA9IG9uQ29tcGxldGVBbGw7XG4gICAgdmFycy5vbkNvbXBsZXRlUGFyYW1zID0gb25Db21wbGV0ZUFsbFBhcmFtcztcbiAgICB2YXJzLnBhcmVudCA9IHRoaXM7XG4gICAgbmV3IFR3ZWVuKHRhcmdldHMsIHZhcnMsIF9wYXJzZVBvc2l0aW9uKHRoaXMsIHBvc2l0aW9uKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvMi5zdGFnZ2VyRnJvbSA9IGZ1bmN0aW9uIHN0YWdnZXJGcm9tKHRhcmdldHMsIGR1cmF0aW9uLCB2YXJzLCBzdGFnZ2VyLCBwb3NpdGlvbiwgb25Db21wbGV0ZUFsbCwgb25Db21wbGV0ZUFsbFBhcmFtcykge1xuICAgIHZhcnMucnVuQmFja3dhcmRzID0gMTtcbiAgICBfaW5oZXJpdERlZmF1bHRzKHZhcnMpLmltbWVkaWF0ZVJlbmRlciA9IF9pc05vdEZhbHNlKHZhcnMuaW1tZWRpYXRlUmVuZGVyKTtcbiAgICByZXR1cm4gdGhpcy5zdGFnZ2VyVG8odGFyZ2V0cywgZHVyYXRpb24sIHZhcnMsIHN0YWdnZXIsIHBvc2l0aW9uLCBvbkNvbXBsZXRlQWxsLCBvbkNvbXBsZXRlQWxsUGFyYW1zKTtcbiAgfTtcblxuICBfcHJvdG8yLnN0YWdnZXJGcm9tVG8gPSBmdW5jdGlvbiBzdGFnZ2VyRnJvbVRvKHRhcmdldHMsIGR1cmF0aW9uLCBmcm9tVmFycywgdG9WYXJzLCBzdGFnZ2VyLCBwb3NpdGlvbiwgb25Db21wbGV0ZUFsbCwgb25Db21wbGV0ZUFsbFBhcmFtcykge1xuICAgIHRvVmFycy5zdGFydEF0ID0gZnJvbVZhcnM7XG4gICAgX2luaGVyaXREZWZhdWx0cyh0b1ZhcnMpLmltbWVkaWF0ZVJlbmRlciA9IF9pc05vdEZhbHNlKHRvVmFycy5pbW1lZGlhdGVSZW5kZXIpO1xuICAgIHJldHVybiB0aGlzLnN0YWdnZXJUbyh0YXJnZXRzLCBkdXJhdGlvbiwgdG9WYXJzLCBzdGFnZ2VyLCBwb3NpdGlvbiwgb25Db21wbGV0ZUFsbCwgb25Db21wbGV0ZUFsbFBhcmFtcyk7XG4gIH07XG5cbiAgX3Byb3RvMi5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIodG90YWxUaW1lLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpIHtcbiAgICB2YXIgcHJldlRpbWUgPSB0aGlzLl90aW1lLFxuICAgICAgICB0RHVyID0gdGhpcy5fZGlydHkgPyB0aGlzLnRvdGFsRHVyYXRpb24oKSA6IHRoaXMuX3REdXIsXG4gICAgICAgIGR1ciA9IHRoaXMuX2R1cixcbiAgICAgICAgdFRpbWUgPSB0b3RhbFRpbWUgPD0gMCA/IDAgOiBfcm91bmRQcmVjaXNlKHRvdGFsVGltZSksXG4gICAgICAgIC8vIGlmIGEgcGF1c2VkIHRpbWVsaW5lIGlzIHJlc3VtZWQgKG9yIGl0cyBfc3RhcnQgaXMgdXBkYXRlZCBmb3IgYW5vdGhlciByZWFzb24uLi53aGljaCByb3VuZHMgaXQpLCB0aGF0IGNvdWxkIHJlc3VsdCBpbiB0aGUgcGxheWhlYWQgc2hpZnRpbmcgYSAqKnRpbnkqKiBhbW91bnQgYW5kIGEgemVyby1kdXJhdGlvbiBjaGlsZCBhdCB0aGF0IHNwb3QgbWF5IGdldCByZW5kZXJlZCBhdCBhIGRpZmZlcmVudCByYXRpbywgbGlrZSBpdHMgdG90YWxUaW1lIGluIHJlbmRlcigpIG1heSBiZSAxZS0xNyBpbnN0ZWFkIG9mIDAsIGZvciBleGFtcGxlLlxuICAgIGNyb3NzaW5nU3RhcnQgPSB0aGlzLl96VGltZSA8IDAgIT09IHRvdGFsVGltZSA8IDAgJiYgKHRoaXMuX2luaXR0ZWQgfHwgIWR1ciksXG4gICAgICAgIHRpbWUsXG4gICAgICAgIGNoaWxkLFxuICAgICAgICBuZXh0LFxuICAgICAgICBpdGVyYXRpb24sXG4gICAgICAgIGN5Y2xlRHVyYXRpb24sXG4gICAgICAgIHByZXZQYXVzZWQsXG4gICAgICAgIHBhdXNlVHdlZW4sXG4gICAgICAgIHRpbWVTY2FsZSxcbiAgICAgICAgcHJldlN0YXJ0LFxuICAgICAgICBwcmV2SXRlcmF0aW9uLFxuICAgICAgICB5b3lvLFxuICAgICAgICBpc1lveW87XG4gICAgdGhpcyAhPT0gX2dsb2JhbFRpbWVsaW5lICYmIHRUaW1lID4gdER1ciAmJiB0b3RhbFRpbWUgPj0gMCAmJiAodFRpbWUgPSB0RHVyKTtcblxuICAgIGlmICh0VGltZSAhPT0gdGhpcy5fdFRpbWUgfHwgZm9yY2UgfHwgY3Jvc3NpbmdTdGFydCkge1xuICAgICAgaWYgKHByZXZUaW1lICE9PSB0aGlzLl90aW1lICYmIGR1cikge1xuICAgICAgICAvL2lmIHRvdGFsRHVyYXRpb24oKSBmaW5kcyBhIGNoaWxkIHdpdGggYSBuZWdhdGl2ZSBzdGFydFRpbWUgYW5kIHNtb290aENoaWxkVGltaW5nIGlzIHRydWUsIHRoaW5ncyBnZXQgc2hpZnRlZCBhcm91bmQgaW50ZXJuYWxseSBzbyB3ZSBuZWVkIHRvIGFkanVzdCB0aGUgdGltZSBhY2NvcmRpbmdseS4gRm9yIGV4YW1wbGUsIGlmIGEgdHdlZW4gc3RhcnRzIGF0IC0zMCB3ZSBtdXN0IHNoaWZ0IEVWRVJZVEhJTkcgZm9yd2FyZCAzMCBzZWNvbmRzIGFuZCBtb3ZlIHRoaXMgdGltZWxpbmUncyBzdGFydFRpbWUgYmFja3dhcmQgYnkgMzAgc2Vjb25kcyBzbyB0aGF0IHRoaW5ncyBhbGlnbiB3aXRoIHRoZSBwbGF5aGVhZCAobm8ganVtcCkuXG4gICAgICAgIHRUaW1lICs9IHRoaXMuX3RpbWUgLSBwcmV2VGltZTtcbiAgICAgICAgdG90YWxUaW1lICs9IHRoaXMuX3RpbWUgLSBwcmV2VGltZTtcbiAgICAgIH1cblxuICAgICAgdGltZSA9IHRUaW1lO1xuICAgICAgcHJldlN0YXJ0ID0gdGhpcy5fc3RhcnQ7XG4gICAgICB0aW1lU2NhbGUgPSB0aGlzLl90cztcbiAgICAgIHByZXZQYXVzZWQgPSAhdGltZVNjYWxlO1xuXG4gICAgICBpZiAoY3Jvc3NpbmdTdGFydCkge1xuICAgICAgICBkdXIgfHwgKHByZXZUaW1lID0gdGhpcy5felRpbWUpOyAvL3doZW4gdGhlIHBsYXloZWFkIGFycml2ZXMgYXQgRVhBQ1RMWSB0aW1lIDAgKHJpZ2h0IG9uIHRvcCkgb2YgYSB6ZXJvLWR1cmF0aW9uIHRpbWVsaW5lLCB3ZSBuZWVkIHRvIGRpc2Nlcm4gaWYgZXZlbnRzIGFyZSBzdXBwcmVzc2VkIHNvIHRoYXQgd2hlbiB0aGUgcGxheWhlYWQgbW92ZXMgYWdhaW4gKG5leHQgdGltZSksIGl0J2xsIHRyaWdnZXIgdGhlIGNhbGxiYWNrLiBJZiBldmVudHMgYXJlIE5PVCBzdXBwcmVzc2VkLCBvYnZpb3VzbHkgdGhlIGNhbGxiYWNrIHdvdWxkIGJlIHRyaWdnZXJlZCBpbiB0aGlzIHJlbmRlci4gQmFzaWNhbGx5LCB0aGUgY2FsbGJhY2sgc2hvdWxkIGZpcmUgZWl0aGVyIHdoZW4gdGhlIHBsYXloZWFkIEFSUklWRVMgb3IgTEVBVkVTIHRoaXMgZXhhY3Qgc3BvdCwgbm90IGJvdGguIEltYWdpbmUgZG9pbmcgYSB0aW1lbGluZS5zZWVrKDApIGFuZCB0aGVyZSdzIGEgY2FsbGJhY2sgdGhhdCBzaXRzIGF0IDAuIFNpbmNlIGV2ZW50cyBhcmUgc3VwcHJlc3NlZCBvbiB0aGF0IHNlZWsoKSBieSBkZWZhdWx0LCBub3RoaW5nIHdpbGwgZmlyZSwgYnV0IHdoZW4gdGhlIHBsYXloZWFkIG1vdmVzIG9mZiBvZiB0aGF0IHBvc2l0aW9uLCB0aGUgY2FsbGJhY2sgc2hvdWxkIGZpcmUuIFRoaXMgYmVoYXZpb3IgaXMgd2hhdCBwZW9wbGUgaW50dWl0aXZlbHkgZXhwZWN0LlxuXG4gICAgICAgICh0b3RhbFRpbWUgfHwgIXN1cHByZXNzRXZlbnRzKSAmJiAodGhpcy5felRpbWUgPSB0b3RhbFRpbWUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fcmVwZWF0KSB7XG4gICAgICAgIC8vYWRqdXN0IHRoZSB0aW1lIGZvciByZXBlYXRzIGFuZCB5b3lvc1xuICAgICAgICB5b3lvID0gdGhpcy5feW95bztcbiAgICAgICAgY3ljbGVEdXJhdGlvbiA9IGR1ciArIHRoaXMuX3JEZWxheTtcblxuICAgICAgICBpZiAodGhpcy5fcmVwZWF0IDwgLTEgJiYgdG90YWxUaW1lIDwgMCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnRvdGFsVGltZShjeWNsZUR1cmF0aW9uICogMTAwICsgdG90YWxUaW1lLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGltZSA9IF9yb3VuZFByZWNpc2UodFRpbWUgJSBjeWNsZUR1cmF0aW9uKTsgLy9yb3VuZCB0byBhdm9pZCBmbG9hdGluZyBwb2ludCBlcnJvcnMuICg0ICUgMC44IHNob3VsZCBiZSAwIGJ1dCBzb21lIGJyb3dzZXJzIHJlcG9ydCBpdCBhcyAwLjc5OTk5OTk5ISlcblxuICAgICAgICBpZiAodFRpbWUgPT09IHREdXIpIHtcbiAgICAgICAgICAvLyB0aGUgdER1ciA9PT0gdFRpbWUgaXMgZm9yIGVkZ2UgY2FzZXMgd2hlcmUgdGhlcmUncyBhIGxlbmd0aHkgZGVjaW1hbCBvbiB0aGUgZHVyYXRpb24gYW5kIGl0IG1heSByZWFjaCB0aGUgdmVyeSBlbmQgYnV0IHRoZSB0aW1lIGlzIHJlbmRlcmVkIGFzIG5vdC1xdWl0ZS10aGVyZSAocmVtZW1iZXIsIHREdXIgaXMgcm91bmRlZCB0byA0IGRlY2ltYWxzIHdoZXJlYXMgZHVyIGlzbid0KVxuICAgICAgICAgIGl0ZXJhdGlvbiA9IHRoaXMuX3JlcGVhdDtcbiAgICAgICAgICB0aW1lID0gZHVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZXJhdGlvbiA9IH5+KHRUaW1lIC8gY3ljbGVEdXJhdGlvbik7XG5cbiAgICAgICAgICBpZiAoaXRlcmF0aW9uICYmIGl0ZXJhdGlvbiA9PT0gdFRpbWUgLyBjeWNsZUR1cmF0aW9uKSB7XG4gICAgICAgICAgICB0aW1lID0gZHVyO1xuICAgICAgICAgICAgaXRlcmF0aW9uLS07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGltZSA+IGR1ciAmJiAodGltZSA9IGR1cik7XG4gICAgICAgIH1cblxuICAgICAgICBwcmV2SXRlcmF0aW9uID0gX2FuaW1hdGlvbkN5Y2xlKHRoaXMuX3RUaW1lLCBjeWNsZUR1cmF0aW9uKTtcbiAgICAgICAgIXByZXZUaW1lICYmIHRoaXMuX3RUaW1lICYmIHByZXZJdGVyYXRpb24gIT09IGl0ZXJhdGlvbiAmJiB0aGlzLl90VGltZSAtIHByZXZJdGVyYXRpb24gKiBjeWNsZUR1cmF0aW9uIC0gdGhpcy5fZHVyIDw9IDAgJiYgKHByZXZJdGVyYXRpb24gPSBpdGVyYXRpb24pOyAvLyBlZGdlIGNhc2UgLSBpZiBzb21lb25lIGRvZXMgYWRkUGF1c2UoKSBhdCB0aGUgdmVyeSBiZWdpbm5pbmcgb2YgYSByZXBlYXRpbmcgdGltZWxpbmUsIHRoYXQgcGF1c2UgaXMgdGVjaG5pY2FsbHkgYXQgdGhlIHNhbWUgc3BvdCBhcyB0aGUgZW5kIHdoaWNoIGNhdXNlcyB0aGlzLl90aW1lIHRvIGdldCBzZXQgdG8gMCB3aGVuIHRoZSB0b3RhbFRpbWUgd291bGQgbm9ybWFsbHkgcGxhY2UgdGhlIHBsYXloZWFkIGF0IHRoZSBlbmQuIFNlZSBodHRwczovL2dyZWVuc29jay5jb20vZm9ydW1zL3RvcGljLzIzODIzLWNsb3NpbmctbmF2LWFuaW1hdGlvbi1ub3Qtd29ya2luZy1vbi1pZS1hbmQtaXBob25lLTYtbWF5YmUtb3RoZXItb2xkZXItYnJvd3Nlci8/dGFiPWNvbW1lbnRzI2NvbW1lbnQtMTEzMDA1IGFsc28sIHRoaXMuX3RUaW1lIC0gcHJldkl0ZXJhdGlvbiAqIGN5Y2xlRHVyYXRpb24gLSB0aGlzLl9kdXIgPD0gMCBqdXN0IGNoZWNrcyB0byBtYWtlIHN1cmUgaXQgd2Fzbid0IHByZXZpb3VzbHkgaW4gdGhlIFwicmVwZWF0RGVsYXlcIiBwb3J0aW9uXG5cbiAgICAgICAgaWYgKHlveW8gJiYgaXRlcmF0aW9uICYgMSkge1xuICAgICAgICAgIHRpbWUgPSBkdXIgLSB0aW1lO1xuICAgICAgICAgIGlzWW95byA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgLypcbiAgICAgICAgbWFrZSBzdXJlIGNoaWxkcmVuIGF0IHRoZSBlbmQvYmVnaW5uaW5nIG9mIHRoZSB0aW1lbGluZSBhcmUgcmVuZGVyZWQgcHJvcGVybHkuIElmLCBmb3IgZXhhbXBsZSxcbiAgICAgICAgYSAzLXNlY29uZCBsb25nIHRpbWVsaW5lIHJlbmRlcmVkIGF0IDIuOSBzZWNvbmRzIHByZXZpb3VzbHksIGFuZCBub3cgcmVuZGVycyBhdCAzLjIgc2Vjb25kcyAod2hpY2hcbiAgICAgICAgd291bGQgZ2V0IHRyYW5zbGF0ZWQgdG8gMi44IHNlY29uZHMgaWYgdGhlIHRpbWVsaW5lIHlveW9zIG9yIDAuMiBzZWNvbmRzIGlmIGl0IGp1c3QgcmVwZWF0cyksIHRoZXJlXG4gICAgICAgIGNvdWxkIGJlIGEgY2FsbGJhY2sgb3IgYSBzaG9ydCB0d2VlbiB0aGF0J3MgYXQgMi45NSBvciAzIHNlY29uZHMgaW4gd2hpY2ggd291bGRuJ3QgcmVuZGVyLiBTb1xuICAgICAgICB3ZSBuZWVkIHRvIHB1c2ggdGhlIHRpbWVsaW5lIHRvIHRoZSBlbmQgKGFuZC9vciBiZWdpbm5pbmcgZGVwZW5kaW5nIG9uIGl0cyB5b3lvIHZhbHVlKS4gQWxzbyB3ZSBtdXN0XG4gICAgICAgIGVuc3VyZSB0aGF0IHplcm8tZHVyYXRpb24gdHdlZW5zIGF0IHRoZSB2ZXJ5IGJlZ2lubmluZyBvciBlbmQgb2YgdGhlIFRpbWVsaW5lIHdvcmsuXG4gICAgICAgICovXG5cblxuICAgICAgICBpZiAoaXRlcmF0aW9uICE9PSBwcmV2SXRlcmF0aW9uICYmICF0aGlzLl9sb2NrKSB7XG4gICAgICAgICAgdmFyIHJld2luZGluZyA9IHlveW8gJiYgcHJldkl0ZXJhdGlvbiAmIDEsXG4gICAgICAgICAgICAgIGRvZXNXcmFwID0gcmV3aW5kaW5nID09PSAoeW95byAmJiBpdGVyYXRpb24gJiAxKTtcbiAgICAgICAgICBpdGVyYXRpb24gPCBwcmV2SXRlcmF0aW9uICYmIChyZXdpbmRpbmcgPSAhcmV3aW5kaW5nKTtcbiAgICAgICAgICBwcmV2VGltZSA9IHJld2luZGluZyA/IDAgOiBkdXI7XG4gICAgICAgICAgdGhpcy5fbG9jayA9IDE7XG4gICAgICAgICAgdGhpcy5yZW5kZXIocHJldlRpbWUgfHwgKGlzWW95byA/IDAgOiBfcm91bmRQcmVjaXNlKGl0ZXJhdGlvbiAqIGN5Y2xlRHVyYXRpb24pKSwgc3VwcHJlc3NFdmVudHMsICFkdXIpLl9sb2NrID0gMDtcbiAgICAgICAgICB0aGlzLl90VGltZSA9IHRUaW1lOyAvLyBpZiBhIHVzZXIgZ2V0cyB0aGUgaXRlcmF0aW9uKCkgaW5zaWRlIHRoZSBvblJlcGVhdCwgZm9yIGV4YW1wbGUsIGl0IHNob3VsZCBiZSBhY2N1cmF0ZS5cblxuICAgICAgICAgICFzdXBwcmVzc0V2ZW50cyAmJiB0aGlzLnBhcmVudCAmJiBfY2FsbGJhY2sodGhpcywgXCJvblJlcGVhdFwiKTtcbiAgICAgICAgICB0aGlzLnZhcnMucmVwZWF0UmVmcmVzaCAmJiAhaXNZb3lvICYmICh0aGlzLmludmFsaWRhdGUoKS5fbG9jayA9IDEpO1xuXG4gICAgICAgICAgaWYgKHByZXZUaW1lICYmIHByZXZUaW1lICE9PSB0aGlzLl90aW1lIHx8IHByZXZQYXVzZWQgIT09ICF0aGlzLl90cyB8fCB0aGlzLnZhcnMub25SZXBlYXQgJiYgIXRoaXMucGFyZW50ICYmICF0aGlzLl9hY3QpIHtcbiAgICAgICAgICAgIC8vIGlmIHByZXZUaW1lIGlzIDAgYW5kIHdlIHJlbmRlciBhdCB0aGUgdmVyeSBlbmQsIF90aW1lIHdpbGwgYmUgdGhlIGVuZCwgdGh1cyB3b24ndCBtYXRjaC4gU28gaW4gdGhpcyBlZGdlIGNhc2UsIHByZXZUaW1lIHdvbid0IG1hdGNoIF90aW1lIGJ1dCB0aGF0J3Mgb2theS4gSWYgaXQgZ2V0cyBraWxsZWQgaW4gdGhlIG9uUmVwZWF0LCBlamVjdCBhcyB3ZWxsLlxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZHVyID0gdGhpcy5fZHVyOyAvLyBpbiBjYXNlIHRoZSBkdXJhdGlvbiBjaGFuZ2VkIGluIHRoZSBvblJlcGVhdFxuXG4gICAgICAgICAgdER1ciA9IHRoaXMuX3REdXI7XG5cbiAgICAgICAgICBpZiAoZG9lc1dyYXApIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2sgPSAyO1xuICAgICAgICAgICAgcHJldlRpbWUgPSByZXdpbmRpbmcgPyBkdXIgOiAtMC4wMDAxO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIocHJldlRpbWUsIHRydWUpO1xuICAgICAgICAgICAgdGhpcy52YXJzLnJlcGVhdFJlZnJlc2ggJiYgIWlzWW95byAmJiB0aGlzLmludmFsaWRhdGUoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9sb2NrID0gMDtcblxuICAgICAgICAgIGlmICghdGhpcy5fdHMgJiYgIXByZXZQYXVzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgIH0gLy9pbiBvcmRlciBmb3IgeW95b0Vhc2UgdG8gd29yayBwcm9wZXJseSB3aGVuIHRoZXJlJ3MgYSBzdGFnZ2VyLCB3ZSBtdXN0IHN3YXAgb3V0IHRoZSBlYXNlIGluIGVhY2ggc3ViLXR3ZWVuLlxuXG5cbiAgICAgICAgICBfcHJvcGFnYXRlWW95b0Vhc2UodGhpcywgaXNZb3lvKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5faGFzUGF1c2UgJiYgIXRoaXMuX2ZvcmNpbmcgJiYgdGhpcy5fbG9jayA8IDIpIHtcbiAgICAgICAgcGF1c2VUd2VlbiA9IF9maW5kTmV4dFBhdXNlVHdlZW4odGhpcywgX3JvdW5kUHJlY2lzZShwcmV2VGltZSksIF9yb3VuZFByZWNpc2UodGltZSkpO1xuXG4gICAgICAgIGlmIChwYXVzZVR3ZWVuKSB7XG4gICAgICAgICAgdFRpbWUgLT0gdGltZSAtICh0aW1lID0gcGF1c2VUd2Vlbi5fc3RhcnQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3RUaW1lID0gdFRpbWU7XG4gICAgICB0aGlzLl90aW1lID0gdGltZTtcbiAgICAgIHRoaXMuX2FjdCA9ICF0aW1lU2NhbGU7IC8vYXMgbG9uZyBhcyBpdCdzIG5vdCBwYXVzZWQsIGZvcmNlIGl0IHRvIGJlIGFjdGl2ZSBzbyB0aGF0IGlmIHRoZSB1c2VyIHJlbmRlcnMgaW5kZXBlbmRlbnQgb2YgdGhlIHBhcmVudCB0aW1lbGluZSwgaXQnbGwgYmUgZm9yY2VkIHRvIHJlLXJlbmRlciBvbiB0aGUgbmV4dCB0aWNrLlxuXG4gICAgICBpZiAoIXRoaXMuX2luaXR0ZWQpIHtcbiAgICAgICAgdGhpcy5fb25VcGRhdGUgPSB0aGlzLnZhcnMub25VcGRhdGU7XG4gICAgICAgIHRoaXMuX2luaXR0ZWQgPSAxO1xuICAgICAgICB0aGlzLl96VGltZSA9IHRvdGFsVGltZTtcbiAgICAgICAgcHJldlRpbWUgPSAwOyAvLyB1cG9uIGluaXQsIHRoZSBwbGF5aGVhZCBzaG91bGQgYWx3YXlzIGdvIGZvcndhcmQ7IHNvbWVvbmUgY291bGQgaW52YWxpZGF0ZSgpIGEgY29tcGxldGVkIHRpbWVsaW5lIGFuZCB0aGVuIGlmIHRoZXkgcmVzdGFydCgpLCB0aGF0IHdvdWxkIG1ha2UgY2hpbGQgdHdlZW5zIHJlbmRlciBpbiByZXZlcnNlIG9yZGVyIHdoaWNoIGNvdWxkIGxvY2sgaW4gdGhlIHdyb25nIHN0YXJ0aW5nIHZhbHVlcyBpZiB0aGV5IGJ1aWxkIG9uIGVhY2ggb3RoZXIsIGxpa2UgdGwudG8ob2JqLCB7eDogMTAwfSkudG8ob2JqLCB7eDogMH0pLlxuICAgICAgfVxuXG4gICAgICBpZiAoIXByZXZUaW1lICYmIHRpbWUgJiYgIXN1cHByZXNzRXZlbnRzICYmICFpdGVyYXRpb24pIHtcbiAgICAgICAgX2NhbGxiYWNrKHRoaXMsIFwib25TdGFydFwiKTtcblxuICAgICAgICBpZiAodGhpcy5fdFRpbWUgIT09IHRUaW1lKSB7XG4gICAgICAgICAgLy8gaW4gY2FzZSB0aGUgb25TdGFydCB0cmlnZ2VyZWQgYSByZW5kZXIgYXQgYSBkaWZmZXJlbnQgc3BvdCwgZWplY3QuIExpa2UgaWYgc29tZW9uZSBkaWQgYW5pbWF0aW9uLnBhdXNlKDAuNSkgb3Igc29tZXRoaW5nIGluc2lkZSB0aGUgb25TdGFydC5cbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGltZSA+PSBwcmV2VGltZSAmJiB0b3RhbFRpbWUgPj0gMCkge1xuICAgICAgICBjaGlsZCA9IHRoaXMuX2ZpcnN0O1xuXG4gICAgICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgICAgIG5leHQgPSBjaGlsZC5fbmV4dDtcblxuICAgICAgICAgIGlmICgoY2hpbGQuX2FjdCB8fCB0aW1lID49IGNoaWxkLl9zdGFydCkgJiYgY2hpbGQuX3RzICYmIHBhdXNlVHdlZW4gIT09IGNoaWxkKSB7XG4gICAgICAgICAgICBpZiAoY2hpbGQucGFyZW50ICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgIC8vIGFuIGV4dHJlbWUgZWRnZSBjYXNlIC0gdGhlIGNoaWxkJ3MgcmVuZGVyIGNvdWxkIGRvIHNvbWV0aGluZyBsaWtlIGtpbGwoKSB0aGUgXCJuZXh0XCIgb25lIGluIHRoZSBsaW5rZWQgbGlzdCwgb3IgcmVwYXJlbnQgaXQuIEluIHRoYXQgY2FzZSB3ZSBtdXN0IHJlLWluaXRpYXRlIHRoZSB3aG9sZSByZW5kZXIgdG8gYmUgc2FmZS5cbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2hpbGQucmVuZGVyKGNoaWxkLl90cyA+IDAgPyAodGltZSAtIGNoaWxkLl9zdGFydCkgKiBjaGlsZC5fdHMgOiAoY2hpbGQuX2RpcnR5ID8gY2hpbGQudG90YWxEdXJhdGlvbigpIDogY2hpbGQuX3REdXIpICsgKHRpbWUgLSBjaGlsZC5fc3RhcnQpICogY2hpbGQuX3RzLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpO1xuXG4gICAgICAgICAgICBpZiAodGltZSAhPT0gdGhpcy5fdGltZSB8fCAhdGhpcy5fdHMgJiYgIXByZXZQYXVzZWQpIHtcbiAgICAgICAgICAgICAgLy9pbiBjYXNlIGEgdHdlZW4gcGF1c2VzIG9yIHNlZWtzIHRoZSB0aW1lbGluZSB3aGVuIHJlbmRlcmluZywgbGlrZSBpbnNpZGUgb2YgYW4gb25VcGRhdGUvb25Db21wbGV0ZVxuICAgICAgICAgICAgICBwYXVzZVR3ZWVuID0gMDtcbiAgICAgICAgICAgICAgbmV4dCAmJiAodFRpbWUgKz0gdGhpcy5felRpbWUgPSAtX3RpbnlOdW0pOyAvLyBpdCBkaWRuJ3QgZmluaXNoIHJlbmRlcmluZywgc28gZmxhZyB6VGltZSBhcyBuZWdhdGl2ZSBzbyB0aGF0IHNvIHRoYXQgdGhlIG5leHQgdGltZSByZW5kZXIoKSBpcyBjYWxsZWQgaXQnbGwgYmUgZm9yY2VkICh0byByZW5kZXIgYW55IHJlbWFpbmluZyBjaGlsZHJlbilcblxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjaGlsZCA9IG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoaWxkID0gdGhpcy5fbGFzdDtcbiAgICAgICAgdmFyIGFkanVzdGVkVGltZSA9IHRvdGFsVGltZSA8IDAgPyB0b3RhbFRpbWUgOiB0aW1lOyAvL3doZW4gdGhlIHBsYXloZWFkIGdvZXMgYmFja3dhcmQgYmV5b25kIHRoZSBzdGFydCBvZiB0aGlzIHRpbWVsaW5lLCB3ZSBtdXN0IHBhc3MgdGhhdCBpbmZvcm1hdGlvbiBkb3duIHRvIHRoZSBjaGlsZCBhbmltYXRpb25zIHNvIHRoYXQgemVyby1kdXJhdGlvbiB0d2VlbnMga25vdyB3aGV0aGVyIHRvIHJlbmRlciB0aGVpciBzdGFydGluZyBvciBlbmRpbmcgdmFsdWVzLlxuXG4gICAgICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgICAgIG5leHQgPSBjaGlsZC5fcHJldjtcblxuICAgICAgICAgIGlmICgoY2hpbGQuX2FjdCB8fCBhZGp1c3RlZFRpbWUgPD0gY2hpbGQuX2VuZCkgJiYgY2hpbGQuX3RzICYmIHBhdXNlVHdlZW4gIT09IGNoaWxkKSB7XG4gICAgICAgICAgICBpZiAoY2hpbGQucGFyZW50ICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgIC8vIGFuIGV4dHJlbWUgZWRnZSBjYXNlIC0gdGhlIGNoaWxkJ3MgcmVuZGVyIGNvdWxkIGRvIHNvbWV0aGluZyBsaWtlIGtpbGwoKSB0aGUgXCJuZXh0XCIgb25lIGluIHRoZSBsaW5rZWQgbGlzdCwgb3IgcmVwYXJlbnQgaXQuIEluIHRoYXQgY2FzZSB3ZSBtdXN0IHJlLWluaXRpYXRlIHRoZSB3aG9sZSByZW5kZXIgdG8gYmUgc2FmZS5cbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2hpbGQucmVuZGVyKGNoaWxkLl90cyA+IDAgPyAoYWRqdXN0ZWRUaW1lIC0gY2hpbGQuX3N0YXJ0KSAqIGNoaWxkLl90cyA6IChjaGlsZC5fZGlydHkgPyBjaGlsZC50b3RhbER1cmF0aW9uKCkgOiBjaGlsZC5fdER1cikgKyAoYWRqdXN0ZWRUaW1lIC0gY2hpbGQuX3N0YXJ0KSAqIGNoaWxkLl90cywgc3VwcHJlc3NFdmVudHMsIGZvcmNlIHx8IF9yZXZlcnRpbmcgJiYgKGNoaWxkLl9pbml0dGVkIHx8IGNoaWxkLl9zdGFydEF0KSk7IC8vIGlmIHJldmVydGluZywgd2Ugc2hvdWxkIGFsd2F5cyBmb3JjZSByZW5kZXJzIG9mIGluaXR0ZWQgdHdlZW5zIChidXQgcmVtZW1iZXIgdGhhdCAuZnJvbVRvKCkgb3IgLmZyb20oKSBtYXkgaGF2ZSBhIF9zdGFydEF0IGJ1dCBub3QgX2luaXR0ZWQgeWV0KS4gSWYsIGZvciBleGFtcGxlLCBhIC5mcm9tVG8oKSB0d2VlbiB3aXRoIGEgc3RhZ2dlciAod2hpY2ggY3JlYXRlcyBhbiBpbnRlcm5hbCB0aW1lbGluZSkgZ2V0cyByZXZlcnRlZCBCRUZPUkUgc29tZSBvZiBpdHMgY2hpbGQgdHdlZW5zIHJlbmRlciBmb3IgdGhlIGZpcnN0IHRpbWUsIGl0IG1heSBub3QgcHJvcGVybHkgdHJpZ2dlciB0aGVtIHRvIHJldmVydC5cblxuICAgICAgICAgICAgaWYgKHRpbWUgIT09IHRoaXMuX3RpbWUgfHwgIXRoaXMuX3RzICYmICFwcmV2UGF1c2VkKSB7XG4gICAgICAgICAgICAgIC8vaW4gY2FzZSBhIHR3ZWVuIHBhdXNlcyBvciBzZWVrcyB0aGUgdGltZWxpbmUgd2hlbiByZW5kZXJpbmcsIGxpa2UgaW5zaWRlIG9mIGFuIG9uVXBkYXRlL29uQ29tcGxldGVcbiAgICAgICAgICAgICAgcGF1c2VUd2VlbiA9IDA7XG4gICAgICAgICAgICAgIG5leHQgJiYgKHRUaW1lICs9IHRoaXMuX3pUaW1lID0gYWRqdXN0ZWRUaW1lID8gLV90aW55TnVtIDogX3RpbnlOdW0pOyAvLyBpdCBkaWRuJ3QgZmluaXNoIHJlbmRlcmluZywgc28gYWRqdXN0IHpUaW1lIHNvIHRoYXQgc28gdGhhdCB0aGUgbmV4dCB0aW1lIHJlbmRlcigpIGlzIGNhbGxlZCBpdCdsbCBiZSBmb3JjZWQgKHRvIHJlbmRlciBhbnkgcmVtYWluaW5nIGNoaWxkcmVuKVxuXG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNoaWxkID0gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocGF1c2VUd2VlbiAmJiAhc3VwcHJlc3NFdmVudHMpIHtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICBwYXVzZVR3ZWVuLnJlbmRlcih0aW1lID49IHByZXZUaW1lID8gMCA6IC1fdGlueU51bSkuX3pUaW1lID0gdGltZSA+PSBwcmV2VGltZSA/IDEgOiAtMTtcblxuICAgICAgICBpZiAodGhpcy5fdHMpIHtcbiAgICAgICAgICAvL3RoZSBjYWxsYmFjayByZXN1bWVkIHBsYXliYWNrISBTbyBzaW5jZSB3ZSBtYXkgaGF2ZSBoZWxkIGJhY2sgdGhlIHBsYXloZWFkIGR1ZSB0byB3aGVyZSB0aGUgcGF1c2UgaXMgcG9zaXRpb25lZCwgZ28gYWhlYWQgYW5kIGp1bXAgdG8gd2hlcmUgaXQncyBTVVBQT1NFRCB0byBiZSAoaWYgbm8gcGF1c2UgaGFwcGVuZWQpLlxuICAgICAgICAgIHRoaXMuX3N0YXJ0ID0gcHJldlN0YXJ0OyAvL2lmIHRoZSBwYXVzZSB3YXMgYXQgYW4gZWFybGllciB0aW1lIGFuZCB0aGUgdXNlciByZXN1bWVkIGluIHRoZSBjYWxsYmFjaywgaXQgY291bGQgcmVwb3NpdGlvbiB0aGUgdGltZWxpbmUgKGNoYW5naW5nIGl0cyBzdGFydFRpbWUpLCB0aHJvd2luZyB0aGluZ3Mgb2ZmIHNsaWdodGx5LCBzbyB3ZSBtYWtlIHN1cmUgdGhlIF9zdGFydCBkb2Vzbid0IHNoaWZ0LlxuXG4gICAgICAgICAgX3NldEVuZCh0aGlzKTtcblxuICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlcih0b3RhbFRpbWUsIHN1cHByZXNzRXZlbnRzLCBmb3JjZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fb25VcGRhdGUgJiYgIXN1cHByZXNzRXZlbnRzICYmIF9jYWxsYmFjayh0aGlzLCBcIm9uVXBkYXRlXCIsIHRydWUpO1xuICAgICAgaWYgKHRUaW1lID09PSB0RHVyICYmIHRoaXMuX3RUaW1lID49IHRoaXMudG90YWxEdXJhdGlvbigpIHx8ICF0VGltZSAmJiBwcmV2VGltZSkgaWYgKHByZXZTdGFydCA9PT0gdGhpcy5fc3RhcnQgfHwgTWF0aC5hYnModGltZVNjYWxlKSAhPT0gTWF0aC5hYnModGhpcy5fdHMpKSBpZiAoIXRoaXMuX2xvY2spIHtcbiAgICAgICAgLy8gcmVtZW1iZXIsIGEgY2hpbGQncyBjYWxsYmFjayBtYXkgYWx0ZXIgdGhpcyB0aW1lbGluZSdzIHBsYXloZWFkIG9yIHRpbWVTY2FsZSB3aGljaCBpcyB3aHkgd2UgbmVlZCB0byBhZGQgc29tZSBvZiB0aGVzZSBjaGVja3MuXG4gICAgICAgICh0b3RhbFRpbWUgfHwgIWR1cikgJiYgKHRUaW1lID09PSB0RHVyICYmIHRoaXMuX3RzID4gMCB8fCAhdFRpbWUgJiYgdGhpcy5fdHMgPCAwKSAmJiBfcmVtb3ZlRnJvbVBhcmVudCh0aGlzLCAxKTsgLy8gZG9uJ3QgcmVtb3ZlIGlmIHRoZSB0aW1lbGluZSBpcyByZXZlcnNlZCBhbmQgdGhlIHBsYXloZWFkIGlzbid0IGF0IDAsIG90aGVyd2lzZSB0bC5wcm9ncmVzcygxKS5yZXZlcnNlKCkgd29uJ3Qgd29yay4gT25seSByZW1vdmUgaWYgdGhlIHBsYXloZWFkIGlzIGF0IHRoZSBlbmQgYW5kIHRpbWVTY2FsZSBpcyBwb3NpdGl2ZSwgb3IgaWYgdGhlIHBsYXloZWFkIGlzIGF0IDAgYW5kIHRoZSB0aW1lU2NhbGUgaXMgbmVnYXRpdmUuXG5cbiAgICAgICAgaWYgKCFzdXBwcmVzc0V2ZW50cyAmJiAhKHRvdGFsVGltZSA8IDAgJiYgIXByZXZUaW1lKSAmJiAodFRpbWUgfHwgcHJldlRpbWUgfHwgIXREdXIpKSB7XG4gICAgICAgICAgX2NhbGxiYWNrKHRoaXMsIHRUaW1lID09PSB0RHVyICYmIHRvdGFsVGltZSA+PSAwID8gXCJvbkNvbXBsZXRlXCIgOiBcIm9uUmV2ZXJzZUNvbXBsZXRlXCIsIHRydWUpO1xuXG4gICAgICAgICAgdGhpcy5fcHJvbSAmJiAhKHRUaW1lIDwgdER1ciAmJiB0aGlzLnRpbWVTY2FsZSgpID4gMCkgJiYgdGhpcy5fcHJvbSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvMi5hZGQgPSBmdW5jdGlvbiBhZGQoY2hpbGQsIHBvc2l0aW9uKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICBfaXNOdW1iZXIocG9zaXRpb24pIHx8IChwb3NpdGlvbiA9IF9wYXJzZVBvc2l0aW9uKHRoaXMsIHBvc2l0aW9uLCBjaGlsZCkpO1xuXG4gICAgaWYgKCEoY2hpbGQgaW5zdGFuY2VvZiBBbmltYXRpb24pKSB7XG4gICAgICBpZiAoX2lzQXJyYXkoY2hpbGQpKSB7XG4gICAgICAgIGNoaWxkLmZvckVhY2goZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgIHJldHVybiBfdGhpczIuYWRkKG9iaiwgcG9zaXRpb24pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGlmIChfaXNTdHJpbmcoY2hpbGQpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZExhYmVsKGNoaWxkLCBwb3NpdGlvbik7XG4gICAgICB9XG5cbiAgICAgIGlmIChfaXNGdW5jdGlvbihjaGlsZCkpIHtcbiAgICAgICAgY2hpbGQgPSBUd2Vlbi5kZWxheWVkQ2FsbCgwLCBjaGlsZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcyAhPT0gY2hpbGQgPyBfYWRkVG9UaW1lbGluZSh0aGlzLCBjaGlsZCwgcG9zaXRpb24pIDogdGhpczsgLy9kb24ndCBhbGxvdyBhIHRpbWVsaW5lIHRvIGJlIGFkZGVkIHRvIGl0c2VsZiBhcyBhIGNoaWxkIVxuICB9O1xuXG4gIF9wcm90bzIuZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbiBnZXRDaGlsZHJlbihuZXN0ZWQsIHR3ZWVucywgdGltZWxpbmVzLCBpZ25vcmVCZWZvcmVUaW1lKSB7XG4gICAgaWYgKG5lc3RlZCA9PT0gdm9pZCAwKSB7XG4gICAgICBuZXN0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0d2VlbnMgPT09IHZvaWQgMCkge1xuICAgICAgdHdlZW5zID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGltZWxpbmVzID09PSB2b2lkIDApIHtcbiAgICAgIHRpbWVsaW5lcyA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGlnbm9yZUJlZm9yZVRpbWUgPT09IHZvaWQgMCkge1xuICAgICAgaWdub3JlQmVmb3JlVGltZSA9IC1fYmlnTnVtO1xuICAgIH1cblxuICAgIHZhciBhID0gW10sXG4gICAgICAgIGNoaWxkID0gdGhpcy5fZmlyc3Q7XG5cbiAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgIGlmIChjaGlsZC5fc3RhcnQgPj0gaWdub3JlQmVmb3JlVGltZSkge1xuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBUd2Vlbikge1xuICAgICAgICAgIHR3ZWVucyAmJiBhLnB1c2goY2hpbGQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRpbWVsaW5lcyAmJiBhLnB1c2goY2hpbGQpO1xuICAgICAgICAgIG5lc3RlZCAmJiBhLnB1c2guYXBwbHkoYSwgY2hpbGQuZ2V0Q2hpbGRyZW4odHJ1ZSwgdHdlZW5zLCB0aW1lbGluZXMpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjaGlsZCA9IGNoaWxkLl9uZXh0O1xuICAgIH1cblxuICAgIHJldHVybiBhO1xuICB9O1xuXG4gIF9wcm90bzIuZ2V0QnlJZCA9IGZ1bmN0aW9uIGdldEJ5SWQoaWQpIHtcbiAgICB2YXIgYW5pbWF0aW9ucyA9IHRoaXMuZ2V0Q2hpbGRyZW4oMSwgMSwgMSksXG4gICAgICAgIGkgPSBhbmltYXRpb25zLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlmIChhbmltYXRpb25zW2ldLnZhcnMuaWQgPT09IGlkKSB7XG4gICAgICAgIHJldHVybiBhbmltYXRpb25zW2ldO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBfcHJvdG8yLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZShjaGlsZCkge1xuICAgIGlmIChfaXNTdHJpbmcoY2hpbGQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZW1vdmVMYWJlbChjaGlsZCk7XG4gICAgfVxuXG4gICAgaWYgKF9pc0Z1bmN0aW9uKGNoaWxkKSkge1xuICAgICAgcmV0dXJuIHRoaXMua2lsbFR3ZWVuc09mKGNoaWxkKTtcbiAgICB9XG5cbiAgICBfcmVtb3ZlTGlua2VkTGlzdEl0ZW0odGhpcywgY2hpbGQpO1xuXG4gICAgaWYgKGNoaWxkID09PSB0aGlzLl9yZWNlbnQpIHtcbiAgICAgIHRoaXMuX3JlY2VudCA9IHRoaXMuX2xhc3Q7XG4gICAgfVxuXG4gICAgcmV0dXJuIF91bmNhY2hlKHRoaXMpO1xuICB9O1xuXG4gIF9wcm90bzIudG90YWxUaW1lID0gZnVuY3Rpb24gdG90YWxUaW1lKF90b3RhbFRpbWUyLCBzdXBwcmVzc0V2ZW50cykge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3RUaW1lO1xuICAgIH1cblxuICAgIHRoaXMuX2ZvcmNpbmcgPSAxO1xuXG4gICAgaWYgKCF0aGlzLl9kcCAmJiB0aGlzLl90cykge1xuICAgICAgLy9zcGVjaWFsIGNhc2UgZm9yIHRoZSBnbG9iYWwgdGltZWxpbmUgKG9yIGFueSBvdGhlciB0aGF0IGhhcyBubyBwYXJlbnQgb3IgZGV0YWNoZWQgcGFyZW50KS5cbiAgICAgIHRoaXMuX3N0YXJ0ID0gX3JvdW5kUHJlY2lzZShfdGlja2VyLnRpbWUgLSAodGhpcy5fdHMgPiAwID8gX3RvdGFsVGltZTIgLyB0aGlzLl90cyA6ICh0aGlzLnRvdGFsRHVyYXRpb24oKSAtIF90b3RhbFRpbWUyKSAvIC10aGlzLl90cykpO1xuICAgIH1cblxuICAgIF9BbmltYXRpb24ucHJvdG90eXBlLnRvdGFsVGltZS5jYWxsKHRoaXMsIF90b3RhbFRpbWUyLCBzdXBwcmVzc0V2ZW50cyk7XG5cbiAgICB0aGlzLl9mb3JjaW5nID0gMDtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8yLmFkZExhYmVsID0gZnVuY3Rpb24gYWRkTGFiZWwobGFiZWwsIHBvc2l0aW9uKSB7XG4gICAgdGhpcy5sYWJlbHNbbGFiZWxdID0gX3BhcnNlUG9zaXRpb24odGhpcywgcG9zaXRpb24pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90bzIucmVtb3ZlTGFiZWwgPSBmdW5jdGlvbiByZW1vdmVMYWJlbChsYWJlbCkge1xuICAgIGRlbGV0ZSB0aGlzLmxhYmVsc1tsYWJlbF07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvMi5hZGRQYXVzZSA9IGZ1bmN0aW9uIGFkZFBhdXNlKHBvc2l0aW9uLCBjYWxsYmFjaywgcGFyYW1zKSB7XG4gICAgdmFyIHQgPSBUd2Vlbi5kZWxheWVkQ2FsbCgwLCBjYWxsYmFjayB8fCBfZW1wdHlGdW5jLCBwYXJhbXMpO1xuICAgIHQuZGF0YSA9IFwiaXNQYXVzZVwiO1xuICAgIHRoaXMuX2hhc1BhdXNlID0gMTtcbiAgICByZXR1cm4gX2FkZFRvVGltZWxpbmUodGhpcywgdCwgX3BhcnNlUG9zaXRpb24odGhpcywgcG9zaXRpb24pKTtcbiAgfTtcblxuICBfcHJvdG8yLnJlbW92ZVBhdXNlID0gZnVuY3Rpb24gcmVtb3ZlUGF1c2UocG9zaXRpb24pIHtcbiAgICB2YXIgY2hpbGQgPSB0aGlzLl9maXJzdDtcbiAgICBwb3NpdGlvbiA9IF9wYXJzZVBvc2l0aW9uKHRoaXMsIHBvc2l0aW9uKTtcblxuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgaWYgKGNoaWxkLl9zdGFydCA9PT0gcG9zaXRpb24gJiYgY2hpbGQuZGF0YSA9PT0gXCJpc1BhdXNlXCIpIHtcbiAgICAgICAgX3JlbW92ZUZyb21QYXJlbnQoY2hpbGQpO1xuICAgICAgfVxuXG4gICAgICBjaGlsZCA9IGNoaWxkLl9uZXh0O1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8yLmtpbGxUd2VlbnNPZiA9IGZ1bmN0aW9uIGtpbGxUd2VlbnNPZih0YXJnZXRzLCBwcm9wcywgb25seUFjdGl2ZSkge1xuICAgIHZhciB0d2VlbnMgPSB0aGlzLmdldFR3ZWVuc09mKHRhcmdldHMsIG9ubHlBY3RpdmUpLFxuICAgICAgICBpID0gdHdlZW5zLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIF9vdmVyd3JpdGluZ1R3ZWVuICE9PSB0d2VlbnNbaV0gJiYgdHdlZW5zW2ldLmtpbGwodGFyZ2V0cywgcHJvcHMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90bzIuZ2V0VHdlZW5zT2YgPSBmdW5jdGlvbiBnZXRUd2VlbnNPZih0YXJnZXRzLCBvbmx5QWN0aXZlKSB7XG4gICAgdmFyIGEgPSBbXSxcbiAgICAgICAgcGFyc2VkVGFyZ2V0cyA9IHRvQXJyYXkodGFyZ2V0cyksXG4gICAgICAgIGNoaWxkID0gdGhpcy5fZmlyc3QsXG4gICAgICAgIGlzR2xvYmFsVGltZSA9IF9pc051bWJlcihvbmx5QWN0aXZlKSxcbiAgICAgICAgLy8gYSBudW1iZXIgaXMgaW50ZXJwcmV0ZWQgYXMgYSBnbG9iYWwgdGltZS4gSWYgdGhlIGFuaW1hdGlvbiBzcGFuc1xuICAgIGNoaWxkcmVuO1xuXG4gICAgd2hpbGUgKGNoaWxkKSB7XG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBUd2Vlbikge1xuICAgICAgICBpZiAoX2FycmF5Q29udGFpbnNBbnkoY2hpbGQuX3RhcmdldHMsIHBhcnNlZFRhcmdldHMpICYmIChpc0dsb2JhbFRpbWUgPyAoIV9vdmVyd3JpdGluZ1R3ZWVuIHx8IGNoaWxkLl9pbml0dGVkICYmIGNoaWxkLl90cykgJiYgY2hpbGQuZ2xvYmFsVGltZSgwKSA8PSBvbmx5QWN0aXZlICYmIGNoaWxkLmdsb2JhbFRpbWUoY2hpbGQudG90YWxEdXJhdGlvbigpKSA+IG9ubHlBY3RpdmUgOiAhb25seUFjdGl2ZSB8fCBjaGlsZC5pc0FjdGl2ZSgpKSkge1xuICAgICAgICAgIC8vIG5vdGU6IGlmIHRoaXMgaXMgZm9yIG92ZXJ3cml0aW5nLCBpdCBzaG91bGQgb25seSBiZSBmb3IgdHdlZW5zIHRoYXQgYXJlbid0IHBhdXNlZCBhbmQgYXJlIGluaXR0ZWQuXG4gICAgICAgICAgYS5wdXNoKGNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICgoY2hpbGRyZW4gPSBjaGlsZC5nZXRUd2VlbnNPZihwYXJzZWRUYXJnZXRzLCBvbmx5QWN0aXZlKSkubGVuZ3RoKSB7XG4gICAgICAgIGEucHVzaC5hcHBseShhLCBjaGlsZHJlbik7XG4gICAgICB9XG5cbiAgICAgIGNoaWxkID0gY2hpbGQuX25leHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGE7XG4gIH0gLy8gcG90ZW50aWFsIGZ1dHVyZSBmZWF0dXJlIC0gdGFyZ2V0cygpIG9uIHRpbWVsaW5lc1xuICAvLyB0YXJnZXRzKCkge1xuICAvLyBcdGxldCByZXN1bHQgPSBbXTtcbiAgLy8gXHR0aGlzLmdldENoaWxkcmVuKHRydWUsIHRydWUsIGZhbHNlKS5mb3JFYWNoKHQgPT4gcmVzdWx0LnB1c2goLi4udC50YXJnZXRzKCkpKTtcbiAgLy8gXHRyZXR1cm4gcmVzdWx0LmZpbHRlcigodiwgaSkgPT4gcmVzdWx0LmluZGV4T2YodikgPT09IGkpO1xuICAvLyB9XG4gIDtcblxuICBfcHJvdG8yLnR3ZWVuVG8gPSBmdW5jdGlvbiB0d2VlblRvKHBvc2l0aW9uLCB2YXJzKSB7XG4gICAgdmFycyA9IHZhcnMgfHwge307XG5cbiAgICB2YXIgdGwgPSB0aGlzLFxuICAgICAgICBlbmRUaW1lID0gX3BhcnNlUG9zaXRpb24odGwsIHBvc2l0aW9uKSxcbiAgICAgICAgX3ZhcnMgPSB2YXJzLFxuICAgICAgICBzdGFydEF0ID0gX3ZhcnMuc3RhcnRBdCxcbiAgICAgICAgX29uU3RhcnQgPSBfdmFycy5vblN0YXJ0LFxuICAgICAgICBvblN0YXJ0UGFyYW1zID0gX3ZhcnMub25TdGFydFBhcmFtcyxcbiAgICAgICAgaW1tZWRpYXRlUmVuZGVyID0gX3ZhcnMuaW1tZWRpYXRlUmVuZGVyLFxuICAgICAgICBpbml0dGVkLFxuICAgICAgICB0d2VlbiA9IFR3ZWVuLnRvKHRsLCBfc2V0RGVmYXVsdHMoe1xuICAgICAgZWFzZTogdmFycy5lYXNlIHx8IFwibm9uZVwiLFxuICAgICAgbGF6eTogZmFsc2UsXG4gICAgICBpbW1lZGlhdGVSZW5kZXI6IGZhbHNlLFxuICAgICAgdGltZTogZW5kVGltZSxcbiAgICAgIG92ZXJ3cml0ZTogXCJhdXRvXCIsXG4gICAgICBkdXJhdGlvbjogdmFycy5kdXJhdGlvbiB8fCBNYXRoLmFicygoZW5kVGltZSAtIChzdGFydEF0ICYmIFwidGltZVwiIGluIHN0YXJ0QXQgPyBzdGFydEF0LnRpbWUgOiB0bC5fdGltZSkpIC8gdGwudGltZVNjYWxlKCkpIHx8IF90aW55TnVtLFxuICAgICAgb25TdGFydDogZnVuY3Rpb24gb25TdGFydCgpIHtcbiAgICAgICAgdGwucGF1c2UoKTtcblxuICAgICAgICBpZiAoIWluaXR0ZWQpIHtcbiAgICAgICAgICB2YXIgZHVyYXRpb24gPSB2YXJzLmR1cmF0aW9uIHx8IE1hdGguYWJzKChlbmRUaW1lIC0gKHN0YXJ0QXQgJiYgXCJ0aW1lXCIgaW4gc3RhcnRBdCA/IHN0YXJ0QXQudGltZSA6IHRsLl90aW1lKSkgLyB0bC50aW1lU2NhbGUoKSk7XG4gICAgICAgICAgdHdlZW4uX2R1ciAhPT0gZHVyYXRpb24gJiYgX3NldER1cmF0aW9uKHR3ZWVuLCBkdXJhdGlvbiwgMCwgMSkucmVuZGVyKHR3ZWVuLl90aW1lLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICBpbml0dGVkID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9vblN0YXJ0ICYmIF9vblN0YXJ0LmFwcGx5KHR3ZWVuLCBvblN0YXJ0UGFyYW1zIHx8IFtdKTsgLy9pbiBjYXNlIHRoZSB1c2VyIGhhZCBhbiBvblN0YXJ0IGluIHRoZSB2YXJzIC0gd2UgZG9uJ3Qgd2FudCB0byBvdmVyd3JpdGUgaXQuXG4gICAgICB9XG4gICAgfSwgdmFycykpO1xuXG4gICAgcmV0dXJuIGltbWVkaWF0ZVJlbmRlciA/IHR3ZWVuLnJlbmRlcigwKSA6IHR3ZWVuO1xuICB9O1xuXG4gIF9wcm90bzIudHdlZW5Gcm9tVG8gPSBmdW5jdGlvbiB0d2VlbkZyb21Ubyhmcm9tUG9zaXRpb24sIHRvUG9zaXRpb24sIHZhcnMpIHtcbiAgICByZXR1cm4gdGhpcy50d2VlblRvKHRvUG9zaXRpb24sIF9zZXREZWZhdWx0cyh7XG4gICAgICBzdGFydEF0OiB7XG4gICAgICAgIHRpbWU6IF9wYXJzZVBvc2l0aW9uKHRoaXMsIGZyb21Qb3NpdGlvbilcbiAgICAgIH1cbiAgICB9LCB2YXJzKSk7XG4gIH07XG5cbiAgX3Byb3RvMi5yZWNlbnQgPSBmdW5jdGlvbiByZWNlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY2VudDtcbiAgfTtcblxuICBfcHJvdG8yLm5leHRMYWJlbCA9IGZ1bmN0aW9uIG5leHRMYWJlbChhZnRlclRpbWUpIHtcbiAgICBpZiAoYWZ0ZXJUaW1lID09PSB2b2lkIDApIHtcbiAgICAgIGFmdGVyVGltZSA9IHRoaXMuX3RpbWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIF9nZXRMYWJlbEluRGlyZWN0aW9uKHRoaXMsIF9wYXJzZVBvc2l0aW9uKHRoaXMsIGFmdGVyVGltZSkpO1xuICB9O1xuXG4gIF9wcm90bzIucHJldmlvdXNMYWJlbCA9IGZ1bmN0aW9uIHByZXZpb3VzTGFiZWwoYmVmb3JlVGltZSkge1xuICAgIGlmIChiZWZvcmVUaW1lID09PSB2b2lkIDApIHtcbiAgICAgIGJlZm9yZVRpbWUgPSB0aGlzLl90aW1lO1xuICAgIH1cblxuICAgIHJldHVybiBfZ2V0TGFiZWxJbkRpcmVjdGlvbih0aGlzLCBfcGFyc2VQb3NpdGlvbih0aGlzLCBiZWZvcmVUaW1lKSwgMSk7XG4gIH07XG5cbiAgX3Byb3RvMi5jdXJyZW50TGFiZWwgPSBmdW5jdGlvbiBjdXJyZW50TGFiZWwodmFsdWUpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IHRoaXMuc2Vlayh2YWx1ZSwgdHJ1ZSkgOiB0aGlzLnByZXZpb3VzTGFiZWwodGhpcy5fdGltZSArIF90aW55TnVtKTtcbiAgfTtcblxuICBfcHJvdG8yLnNoaWZ0Q2hpbGRyZW4gPSBmdW5jdGlvbiBzaGlmdENoaWxkcmVuKGFtb3VudCwgYWRqdXN0TGFiZWxzLCBpZ25vcmVCZWZvcmVUaW1lKSB7XG4gICAgaWYgKGlnbm9yZUJlZm9yZVRpbWUgPT09IHZvaWQgMCkge1xuICAgICAgaWdub3JlQmVmb3JlVGltZSA9IDA7XG4gICAgfVxuXG4gICAgdmFyIGNoaWxkID0gdGhpcy5fZmlyc3QsXG4gICAgICAgIGxhYmVscyA9IHRoaXMubGFiZWxzLFxuICAgICAgICBwO1xuXG4gICAgd2hpbGUgKGNoaWxkKSB7XG4gICAgICBpZiAoY2hpbGQuX3N0YXJ0ID49IGlnbm9yZUJlZm9yZVRpbWUpIHtcbiAgICAgICAgY2hpbGQuX3N0YXJ0ICs9IGFtb3VudDtcbiAgICAgICAgY2hpbGQuX2VuZCArPSBhbW91bnQ7XG4gICAgICB9XG5cbiAgICAgIGNoaWxkID0gY2hpbGQuX25leHQ7XG4gICAgfVxuXG4gICAgaWYgKGFkanVzdExhYmVscykge1xuICAgICAgZm9yIChwIGluIGxhYmVscykge1xuICAgICAgICBpZiAobGFiZWxzW3BdID49IGlnbm9yZUJlZm9yZVRpbWUpIHtcbiAgICAgICAgICBsYWJlbHNbcF0gKz0gYW1vdW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF91bmNhY2hlKHRoaXMpO1xuICB9O1xuXG4gIF9wcm90bzIuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uIGludmFsaWRhdGUoc29mdCkge1xuICAgIHZhciBjaGlsZCA9IHRoaXMuX2ZpcnN0O1xuICAgIHRoaXMuX2xvY2sgPSAwO1xuXG4gICAgd2hpbGUgKGNoaWxkKSB7XG4gICAgICBjaGlsZC5pbnZhbGlkYXRlKHNvZnQpO1xuICAgICAgY2hpbGQgPSBjaGlsZC5fbmV4dDtcbiAgICB9XG5cbiAgICByZXR1cm4gX0FuaW1hdGlvbi5wcm90b3R5cGUuaW52YWxpZGF0ZS5jYWxsKHRoaXMsIHNvZnQpO1xuICB9O1xuXG4gIF9wcm90bzIuY2xlYXIgPSBmdW5jdGlvbiBjbGVhcihpbmNsdWRlTGFiZWxzKSB7XG4gICAgaWYgKGluY2x1ZGVMYWJlbHMgPT09IHZvaWQgMCkge1xuICAgICAgaW5jbHVkZUxhYmVscyA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGNoaWxkID0gdGhpcy5fZmlyc3QsXG4gICAgICAgIG5leHQ7XG5cbiAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgIG5leHQgPSBjaGlsZC5fbmV4dDtcbiAgICAgIHRoaXMucmVtb3ZlKGNoaWxkKTtcbiAgICAgIGNoaWxkID0gbmV4dDtcbiAgICB9XG5cbiAgICB0aGlzLl9kcCAmJiAodGhpcy5fdGltZSA9IHRoaXMuX3RUaW1lID0gdGhpcy5fcFRpbWUgPSAwKTtcbiAgICBpbmNsdWRlTGFiZWxzICYmICh0aGlzLmxhYmVscyA9IHt9KTtcbiAgICByZXR1cm4gX3VuY2FjaGUodGhpcyk7XG4gIH07XG5cbiAgX3Byb3RvMi50b3RhbER1cmF0aW9uID0gZnVuY3Rpb24gdG90YWxEdXJhdGlvbih2YWx1ZSkge1xuICAgIHZhciBtYXggPSAwLFxuICAgICAgICBzZWxmID0gdGhpcyxcbiAgICAgICAgY2hpbGQgPSBzZWxmLl9sYXN0LFxuICAgICAgICBwcmV2U3RhcnQgPSBfYmlnTnVtLFxuICAgICAgICBwcmV2LFxuICAgICAgICBzdGFydCxcbiAgICAgICAgcGFyZW50O1xuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBzZWxmLnRpbWVTY2FsZSgoc2VsZi5fcmVwZWF0IDwgMCA/IHNlbGYuZHVyYXRpb24oKSA6IHNlbGYudG90YWxEdXJhdGlvbigpKSAvIChzZWxmLnJldmVyc2VkKCkgPyAtdmFsdWUgOiB2YWx1ZSkpO1xuICAgIH1cblxuICAgIGlmIChzZWxmLl9kaXJ0eSkge1xuICAgICAgcGFyZW50ID0gc2VsZi5wYXJlbnQ7XG5cbiAgICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgICBwcmV2ID0gY2hpbGQuX3ByZXY7IC8vcmVjb3JkIGl0IGhlcmUgaW4gY2FzZSB0aGUgdHdlZW4gY2hhbmdlcyBwb3NpdGlvbiBpbiB0aGUgc2VxdWVuY2UuLi5cblxuICAgICAgICBjaGlsZC5fZGlydHkgJiYgY2hpbGQudG90YWxEdXJhdGlvbigpOyAvL2NvdWxkIGNoYW5nZSB0aGUgdHdlZW4uX3N0YXJ0VGltZSwgc28gbWFrZSBzdXJlIHRoZSBhbmltYXRpb24ncyBjYWNoZSBpcyBjbGVhbiBiZWZvcmUgYW5hbHl6aW5nIGl0LlxuXG4gICAgICAgIHN0YXJ0ID0gY2hpbGQuX3N0YXJ0O1xuXG4gICAgICAgIGlmIChzdGFydCA+IHByZXZTdGFydCAmJiBzZWxmLl9zb3J0ICYmIGNoaWxkLl90cyAmJiAhc2VsZi5fbG9jaykge1xuICAgICAgICAgIC8vaW4gY2FzZSBvbmUgb2YgdGhlIHR3ZWVucyBzaGlmdGVkIG91dCBvZiBvcmRlciwgaXQgbmVlZHMgdG8gYmUgcmUtaW5zZXJ0ZWQgaW50byB0aGUgY29ycmVjdCBwb3NpdGlvbiBpbiB0aGUgc2VxdWVuY2VcbiAgICAgICAgICBzZWxmLl9sb2NrID0gMTsgLy9wcmV2ZW50IGVuZGxlc3MgcmVjdXJzaXZlIGNhbGxzIC0gdGhlcmUgYXJlIG1ldGhvZHMgdGhhdCBnZXQgdHJpZ2dlcmVkIHRoYXQgY2hlY2sgZHVyYXRpb24vdG90YWxEdXJhdGlvbiB3aGVuIHdlIGFkZCgpLlxuXG4gICAgICAgICAgX2FkZFRvVGltZWxpbmUoc2VsZiwgY2hpbGQsIHN0YXJ0IC0gY2hpbGQuX2RlbGF5LCAxKS5fbG9jayA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJldlN0YXJ0ID0gc3RhcnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhcnQgPCAwICYmIGNoaWxkLl90cykge1xuICAgICAgICAgIC8vY2hpbGRyZW4gYXJlbid0IGFsbG93ZWQgdG8gaGF2ZSBuZWdhdGl2ZSBzdGFydFRpbWVzIHVubGVzcyBzbW9vdGhDaGlsZFRpbWluZyBpcyB0cnVlLCBzbyBhZGp1c3QgaGVyZSBpZiBvbmUgaXMgZm91bmQuXG4gICAgICAgICAgbWF4IC09IHN0YXJ0O1xuXG4gICAgICAgICAgaWYgKCFwYXJlbnQgJiYgIXNlbGYuX2RwIHx8IHBhcmVudCAmJiBwYXJlbnQuc21vb3RoQ2hpbGRUaW1pbmcpIHtcbiAgICAgICAgICAgIHNlbGYuX3N0YXJ0ICs9IHN0YXJ0IC8gc2VsZi5fdHM7XG4gICAgICAgICAgICBzZWxmLl90aW1lIC09IHN0YXJ0O1xuICAgICAgICAgICAgc2VsZi5fdFRpbWUgLT0gc3RhcnQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2VsZi5zaGlmdENoaWxkcmVuKC1zdGFydCwgZmFsc2UsIC0xZTk5OSk7XG4gICAgICAgICAgcHJldlN0YXJ0ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoaWxkLl9lbmQgPiBtYXggJiYgY2hpbGQuX3RzICYmIChtYXggPSBjaGlsZC5fZW5kKTtcbiAgICAgICAgY2hpbGQgPSBwcmV2O1xuICAgICAgfVxuXG4gICAgICBfc2V0RHVyYXRpb24oc2VsZiwgc2VsZiA9PT0gX2dsb2JhbFRpbWVsaW5lICYmIHNlbGYuX3RpbWUgPiBtYXggPyBzZWxmLl90aW1lIDogbWF4LCAxLCAxKTtcblxuICAgICAgc2VsZi5fZGlydHkgPSAwO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmLl90RHVyO1xuICB9O1xuXG4gIFRpbWVsaW5lLnVwZGF0ZVJvb3QgPSBmdW5jdGlvbiB1cGRhdGVSb290KHRpbWUpIHtcbiAgICBpZiAoX2dsb2JhbFRpbWVsaW5lLl90cykge1xuICAgICAgX2xhenlTYWZlUmVuZGVyKF9nbG9iYWxUaW1lbGluZSwgX3BhcmVudFRvQ2hpbGRUb3RhbFRpbWUodGltZSwgX2dsb2JhbFRpbWVsaW5lKSk7XG5cbiAgICAgIF9sYXN0UmVuZGVyZWRGcmFtZSA9IF90aWNrZXIuZnJhbWU7XG4gICAgfVxuXG4gICAgaWYgKF90aWNrZXIuZnJhbWUgPj0gX25leHRHQ0ZyYW1lKSB7XG4gICAgICBfbmV4dEdDRnJhbWUgKz0gX2NvbmZpZy5hdXRvU2xlZXAgfHwgMTIwO1xuICAgICAgdmFyIGNoaWxkID0gX2dsb2JhbFRpbWVsaW5lLl9maXJzdDtcbiAgICAgIGlmICghY2hpbGQgfHwgIWNoaWxkLl90cykgaWYgKF9jb25maWcuYXV0b1NsZWVwICYmIF90aWNrZXIuX2xpc3RlbmVycy5sZW5ndGggPCAyKSB7XG4gICAgICAgIHdoaWxlIChjaGlsZCAmJiAhY2hpbGQuX3RzKSB7XG4gICAgICAgICAgY2hpbGQgPSBjaGlsZC5fbmV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoaWxkIHx8IF90aWNrZXIuc2xlZXAoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFRpbWVsaW5lO1xufShBbmltYXRpb24pO1xuXG5fc2V0RGVmYXVsdHMoVGltZWxpbmUucHJvdG90eXBlLCB7XG4gIF9sb2NrOiAwLFxuICBfaGFzUGF1c2U6IDAsXG4gIF9mb3JjaW5nOiAwXG59KTtcblxudmFyIF9hZGRDb21wbGV4U3RyaW5nUHJvcFR3ZWVuID0gZnVuY3Rpb24gX2FkZENvbXBsZXhTdHJpbmdQcm9wVHdlZW4odGFyZ2V0LCBwcm9wLCBzdGFydCwgZW5kLCBzZXR0ZXIsIHN0cmluZ0ZpbHRlciwgZnVuY1BhcmFtKSB7XG4gIC8vbm90ZTogd2UgY2FsbCBfYWRkQ29tcGxleFN0cmluZ1Byb3BUd2Vlbi5jYWxsKHR3ZWVuSW5zdGFuY2UuLi4pIHRvIGVuc3VyZSB0aGF0IGl0J3Mgc2NvcGVkIHByb3Blcmx5LiBXZSBtYXkgY2FsbCBpdCBmcm9tIHdpdGhpbiBhIHBsdWdpbiB0b28sIHRodXMgXCJ0aGlzXCIgd291bGQgcmVmZXIgdG8gdGhlIHBsdWdpbi5cbiAgdmFyIHB0ID0gbmV3IFByb3BUd2Vlbih0aGlzLl9wdCwgdGFyZ2V0LCBwcm9wLCAwLCAxLCBfcmVuZGVyQ29tcGxleFN0cmluZywgbnVsbCwgc2V0dGVyKSxcbiAgICAgIGluZGV4ID0gMCxcbiAgICAgIG1hdGNoSW5kZXggPSAwLFxuICAgICAgcmVzdWx0LFxuICAgICAgc3RhcnROdW1zLFxuICAgICAgY29sb3IsXG4gICAgICBlbmROdW0sXG4gICAgICBjaHVuayxcbiAgICAgIHN0YXJ0TnVtLFxuICAgICAgaGFzUmFuZG9tLFxuICAgICAgYTtcbiAgcHQuYiA9IHN0YXJ0O1xuICBwdC5lID0gZW5kO1xuICBzdGFydCArPSBcIlwiOyAvL2Vuc3VyZSB2YWx1ZXMgYXJlIHN0cmluZ3NcblxuICBlbmQgKz0gXCJcIjtcblxuICBpZiAoaGFzUmFuZG9tID0gfmVuZC5pbmRleE9mKFwicmFuZG9tKFwiKSkge1xuICAgIGVuZCA9IF9yZXBsYWNlUmFuZG9tKGVuZCk7XG4gIH1cblxuICBpZiAoc3RyaW5nRmlsdGVyKSB7XG4gICAgYSA9IFtzdGFydCwgZW5kXTtcbiAgICBzdHJpbmdGaWx0ZXIoYSwgdGFyZ2V0LCBwcm9wKTsgLy9wYXNzIGFuIGFycmF5IHdpdGggdGhlIHN0YXJ0aW5nIGFuZCBlbmRpbmcgdmFsdWVzIGFuZCBsZXQgdGhlIGZpbHRlciBkbyB3aGF0ZXZlciBpdCBuZWVkcyB0byB0aGUgdmFsdWVzLlxuXG4gICAgc3RhcnQgPSBhWzBdO1xuICAgIGVuZCA9IGFbMV07XG4gIH1cblxuICBzdGFydE51bXMgPSBzdGFydC5tYXRjaChfY29tcGxleFN0cmluZ051bUV4cCkgfHwgW107XG5cbiAgd2hpbGUgKHJlc3VsdCA9IF9jb21wbGV4U3RyaW5nTnVtRXhwLmV4ZWMoZW5kKSkge1xuICAgIGVuZE51bSA9IHJlc3VsdFswXTtcbiAgICBjaHVuayA9IGVuZC5zdWJzdHJpbmcoaW5kZXgsIHJlc3VsdC5pbmRleCk7XG5cbiAgICBpZiAoY29sb3IpIHtcbiAgICAgIGNvbG9yID0gKGNvbG9yICsgMSkgJSA1O1xuICAgIH0gZWxzZSBpZiAoY2h1bmsuc3Vic3RyKC01KSA9PT0gXCJyZ2JhKFwiKSB7XG4gICAgICBjb2xvciA9IDE7XG4gICAgfVxuXG4gICAgaWYgKGVuZE51bSAhPT0gc3RhcnROdW1zW21hdGNoSW5kZXgrK10pIHtcbiAgICAgIHN0YXJ0TnVtID0gcGFyc2VGbG9hdChzdGFydE51bXNbbWF0Y2hJbmRleCAtIDFdKSB8fCAwOyAvL3RoZXNlIG5lc3RlZCBQcm9wVHdlZW5zIGFyZSBoYW5kbGVkIGluIGEgc3BlY2lhbCB3YXkgLSB3ZSdsbCBuZXZlciBhY3R1YWxseSBjYWxsIGEgcmVuZGVyIG9yIHNldHRlciBtZXRob2Qgb24gdGhlbS4gV2UnbGwganVzdCBsb29wIHRocm91Z2ggdGhlbSBpbiB0aGUgcGFyZW50IGNvbXBsZXggc3RyaW5nIFByb3BUd2VlbidzIHJlbmRlciBtZXRob2QuXG5cbiAgICAgIHB0Ll9wdCA9IHtcbiAgICAgICAgX25leHQ6IHB0Ll9wdCxcbiAgICAgICAgcDogY2h1bmsgfHwgbWF0Y2hJbmRleCA9PT0gMSA/IGNodW5rIDogXCIsXCIsXG4gICAgICAgIC8vbm90ZTogU1ZHIHNwZWMgYWxsb3dzIG9taXNzaW9uIG9mIGNvbW1hL3NwYWNlIHdoZW4gYSBuZWdhdGl2ZSBzaWduIGlzIHdlZGdlZCBiZXR3ZWVuIHR3byBudW1iZXJzLCBsaWtlIDIuNS01LjMgaW5zdGVhZCBvZiAyLjUsLTUuMyBidXQgd2hlbiB0d2VlbmluZywgdGhlIG5lZ2F0aXZlIHZhbHVlIG1heSBzd2l0Y2ggdG8gcG9zaXRpdmUsIHNvIHdlIGluc2VydCB0aGUgY29tbWEganVzdCBpbiBjYXNlLlxuICAgICAgICBzOiBzdGFydE51bSxcbiAgICAgICAgYzogZW5kTnVtLmNoYXJBdCgxKSA9PT0gXCI9XCIgPyBfcGFyc2VSZWxhdGl2ZShzdGFydE51bSwgZW5kTnVtKSAtIHN0YXJ0TnVtIDogcGFyc2VGbG9hdChlbmROdW0pIC0gc3RhcnROdW0sXG4gICAgICAgIG06IGNvbG9yICYmIGNvbG9yIDwgNCA/IE1hdGgucm91bmQgOiAwXG4gICAgICB9O1xuICAgICAgaW5kZXggPSBfY29tcGxleFN0cmluZ051bUV4cC5sYXN0SW5kZXg7XG4gICAgfVxuICB9XG5cbiAgcHQuYyA9IGluZGV4IDwgZW5kLmxlbmd0aCA/IGVuZC5zdWJzdHJpbmcoaW5kZXgsIGVuZC5sZW5ndGgpIDogXCJcIjsgLy93ZSB1c2UgdGhlIFwiY1wiIG9mIHRoZSBQcm9wVHdlZW4gdG8gc3RvcmUgdGhlIGZpbmFsIHBhcnQgb2YgdGhlIHN0cmluZyAoYWZ0ZXIgdGhlIGxhc3QgbnVtYmVyKVxuXG4gIHB0LmZwID0gZnVuY1BhcmFtO1xuXG4gIGlmIChfcmVsRXhwLnRlc3QoZW5kKSB8fCBoYXNSYW5kb20pIHtcbiAgICBwdC5lID0gMDsgLy9pZiB0aGUgZW5kIHN0cmluZyBjb250YWlucyByZWxhdGl2ZSB2YWx1ZXMgb3IgZHluYW1pYyByYW5kb20oLi4uKSB2YWx1ZXMsIGRlbGV0ZSB0aGUgZW5kIGl0IHNvIHRoYXQgb24gdGhlIGZpbmFsIHJlbmRlciB3ZSBkb24ndCBhY3R1YWxseSBzZXQgaXQgdG8gdGhlIHN0cmluZyB3aXRoICs9IG9yIC09IGNoYXJhY3RlcnMgKGZvcmNlcyBpdCB0byB1c2UgdGhlIGNhbGN1bGF0ZWQgdmFsdWUpLlxuICB9XG5cbiAgdGhpcy5fcHQgPSBwdDsgLy9zdGFydCB0aGUgbGlua2VkIGxpc3Qgd2l0aCB0aGlzIG5ldyBQcm9wVHdlZW4uIFJlbWVtYmVyLCB3ZSBjYWxsIF9hZGRDb21wbGV4U3RyaW5nUHJvcFR3ZWVuLmNhbGwodHdlZW5JbnN0YW5jZS4uLikgdG8gZW5zdXJlIHRoYXQgaXQncyBzY29wZWQgcHJvcGVybHkuIFdlIG1heSBjYWxsIGl0IGZyb20gd2l0aGluIGEgcGx1Z2luIHRvbywgdGh1cyBcInRoaXNcIiB3b3VsZCByZWZlciB0byB0aGUgcGx1Z2luLlxuXG4gIHJldHVybiBwdDtcbn0sXG4gICAgX2FkZFByb3BUd2VlbiA9IGZ1bmN0aW9uIF9hZGRQcm9wVHdlZW4odGFyZ2V0LCBwcm9wLCBzdGFydCwgZW5kLCBpbmRleCwgdGFyZ2V0cywgbW9kaWZpZXIsIHN0cmluZ0ZpbHRlciwgZnVuY1BhcmFtLCBvcHRpb25hbCkge1xuICBfaXNGdW5jdGlvbihlbmQpICYmIChlbmQgPSBlbmQoaW5kZXggfHwgMCwgdGFyZ2V0LCB0YXJnZXRzKSk7XG4gIHZhciBjdXJyZW50VmFsdWUgPSB0YXJnZXRbcHJvcF0sXG4gICAgICBwYXJzZWRTdGFydCA9IHN0YXJ0ICE9PSBcImdldFwiID8gc3RhcnQgOiAhX2lzRnVuY3Rpb24oY3VycmVudFZhbHVlKSA/IGN1cnJlbnRWYWx1ZSA6IGZ1bmNQYXJhbSA/IHRhcmdldFtwcm9wLmluZGV4T2YoXCJzZXRcIikgfHwgIV9pc0Z1bmN0aW9uKHRhcmdldFtcImdldFwiICsgcHJvcC5zdWJzdHIoMyldKSA/IHByb3AgOiBcImdldFwiICsgcHJvcC5zdWJzdHIoMyldKGZ1bmNQYXJhbSkgOiB0YXJnZXRbcHJvcF0oKSxcbiAgICAgIHNldHRlciA9ICFfaXNGdW5jdGlvbihjdXJyZW50VmFsdWUpID8gX3NldHRlclBsYWluIDogZnVuY1BhcmFtID8gX3NldHRlckZ1bmNXaXRoUGFyYW0gOiBfc2V0dGVyRnVuYyxcbiAgICAgIHB0O1xuXG4gIGlmIChfaXNTdHJpbmcoZW5kKSkge1xuICAgIGlmICh+ZW5kLmluZGV4T2YoXCJyYW5kb20oXCIpKSB7XG4gICAgICBlbmQgPSBfcmVwbGFjZVJhbmRvbShlbmQpO1xuICAgIH1cblxuICAgIGlmIChlbmQuY2hhckF0KDEpID09PSBcIj1cIikge1xuICAgICAgcHQgPSBfcGFyc2VSZWxhdGl2ZShwYXJzZWRTdGFydCwgZW5kKSArIChnZXRVbml0KHBhcnNlZFN0YXJ0KSB8fCAwKTtcblxuICAgICAgaWYgKHB0IHx8IHB0ID09PSAwKSB7XG4gICAgICAgIC8vIHRvIGF2b2lkIGlzTmFOLCBsaWtlIGlmIHNvbWVvbmUgcGFzc2VzIGluIGEgdmFsdWUgbGlrZSBcIiE9IHdoYXRldmVyXCJcbiAgICAgICAgZW5kID0gcHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKCFvcHRpb25hbCB8fCBwYXJzZWRTdGFydCAhPT0gZW5kIHx8IF9mb3JjZUFsbFByb3BUd2VlbnMpIHtcbiAgICBpZiAoIWlzTmFOKHBhcnNlZFN0YXJ0ICogZW5kKSAmJiBlbmQgIT09IFwiXCIpIHtcbiAgICAgIC8vIGZ1biBmYWN0OiBhbnkgbnVtYmVyIG11bHRpcGxpZWQgYnkgXCJcIiBpcyBldmFsdWF0ZWQgYXMgdGhlIG51bWJlciAwIVxuICAgICAgcHQgPSBuZXcgUHJvcFR3ZWVuKHRoaXMuX3B0LCB0YXJnZXQsIHByb3AsICtwYXJzZWRTdGFydCB8fCAwLCBlbmQgLSAocGFyc2VkU3RhcnQgfHwgMCksIHR5cGVvZiBjdXJyZW50VmFsdWUgPT09IFwiYm9vbGVhblwiID8gX3JlbmRlckJvb2xlYW4gOiBfcmVuZGVyUGxhaW4sIDAsIHNldHRlcik7XG4gICAgICBmdW5jUGFyYW0gJiYgKHB0LmZwID0gZnVuY1BhcmFtKTtcbiAgICAgIG1vZGlmaWVyICYmIHB0Lm1vZGlmaWVyKG1vZGlmaWVyLCB0aGlzLCB0YXJnZXQpO1xuICAgICAgcmV0dXJuIHRoaXMuX3B0ID0gcHQ7XG4gICAgfVxuXG4gICAgIWN1cnJlbnRWYWx1ZSAmJiAhKHByb3AgaW4gdGFyZ2V0KSAmJiBfbWlzc2luZ1BsdWdpbihwcm9wLCBlbmQpO1xuICAgIHJldHVybiBfYWRkQ29tcGxleFN0cmluZ1Byb3BUd2Vlbi5jYWxsKHRoaXMsIHRhcmdldCwgcHJvcCwgcGFyc2VkU3RhcnQsIGVuZCwgc2V0dGVyLCBzdHJpbmdGaWx0ZXIgfHwgX2NvbmZpZy5zdHJpbmdGaWx0ZXIsIGZ1bmNQYXJhbSk7XG4gIH1cbn0sXG4gICAgLy9jcmVhdGVzIGEgY29weSBvZiB0aGUgdmFycyBvYmplY3QgYW5kIHByb2Nlc3NlcyBhbnkgZnVuY3Rpb24tYmFzZWQgdmFsdWVzIChwdXR0aW5nIHRoZSByZXN1bHRpbmcgdmFsdWVzIGRpcmVjdGx5IGludG8gdGhlIGNvcHkpIGFzIHdlbGwgYXMgc3RyaW5ncyB3aXRoIFwicmFuZG9tKClcIiBpbiB0aGVtLiBJdCBkb2VzIE5PVCBwcm9jZXNzIHJlbGF0aXZlIHZhbHVlcy5cbl9wcm9jZXNzVmFycyA9IGZ1bmN0aW9uIF9wcm9jZXNzVmFycyh2YXJzLCBpbmRleCwgdGFyZ2V0LCB0YXJnZXRzLCB0d2Vlbikge1xuICBfaXNGdW5jdGlvbih2YXJzKSAmJiAodmFycyA9IF9wYXJzZUZ1bmNPclN0cmluZyh2YXJzLCB0d2VlbiwgaW5kZXgsIHRhcmdldCwgdGFyZ2V0cykpO1xuXG4gIGlmICghX2lzT2JqZWN0KHZhcnMpIHx8IHZhcnMuc3R5bGUgJiYgdmFycy5ub2RlVHlwZSB8fCBfaXNBcnJheSh2YXJzKSB8fCBfaXNUeXBlZEFycmF5KHZhcnMpKSB7XG4gICAgcmV0dXJuIF9pc1N0cmluZyh2YXJzKSA/IF9wYXJzZUZ1bmNPclN0cmluZyh2YXJzLCB0d2VlbiwgaW5kZXgsIHRhcmdldCwgdGFyZ2V0cykgOiB2YXJzO1xuICB9XG5cbiAgdmFyIGNvcHkgPSB7fSxcbiAgICAgIHA7XG5cbiAgZm9yIChwIGluIHZhcnMpIHtcbiAgICBjb3B5W3BdID0gX3BhcnNlRnVuY09yU3RyaW5nKHZhcnNbcF0sIHR3ZWVuLCBpbmRleCwgdGFyZ2V0LCB0YXJnZXRzKTtcbiAgfVxuXG4gIHJldHVybiBjb3B5O1xufSxcbiAgICBfY2hlY2tQbHVnaW4gPSBmdW5jdGlvbiBfY2hlY2tQbHVnaW4ocHJvcGVydHksIHZhcnMsIHR3ZWVuLCBpbmRleCwgdGFyZ2V0LCB0YXJnZXRzKSB7XG4gIHZhciBwbHVnaW4sIHB0LCBwdExvb2t1cCwgaTtcblxuICBpZiAoX3BsdWdpbnNbcHJvcGVydHldICYmIChwbHVnaW4gPSBuZXcgX3BsdWdpbnNbcHJvcGVydHldKCkpLmluaXQodGFyZ2V0LCBwbHVnaW4ucmF3VmFycyA/IHZhcnNbcHJvcGVydHldIDogX3Byb2Nlc3NWYXJzKHZhcnNbcHJvcGVydHldLCBpbmRleCwgdGFyZ2V0LCB0YXJnZXRzLCB0d2VlbiksIHR3ZWVuLCBpbmRleCwgdGFyZ2V0cykgIT09IGZhbHNlKSB7XG4gICAgdHdlZW4uX3B0ID0gcHQgPSBuZXcgUHJvcFR3ZWVuKHR3ZWVuLl9wdCwgdGFyZ2V0LCBwcm9wZXJ0eSwgMCwgMSwgcGx1Z2luLnJlbmRlciwgcGx1Z2luLCAwLCBwbHVnaW4ucHJpb3JpdHkpO1xuXG4gICAgaWYgKHR3ZWVuICE9PSBfcXVpY2tUd2Vlbikge1xuICAgICAgcHRMb29rdXAgPSB0d2Vlbi5fcHRMb29rdXBbdHdlZW4uX3RhcmdldHMuaW5kZXhPZih0YXJnZXQpXTsgLy9ub3RlOiB3ZSBjYW4ndCB1c2UgdHdlZW4uX3B0TG9va3VwW2luZGV4XSBiZWNhdXNlIGZvciBzdGFnZ2VyZWQgdHdlZW5zLCB0aGUgaW5kZXggZnJvbSB0aGUgZnVsbFRhcmdldHMgYXJyYXkgd29uJ3QgbWF0Y2ggd2hhdCBpdCBpcyBpbiBlYWNoIGluZGl2aWR1YWwgdHdlZW4gdGhhdCBzcGF3bnMgZnJvbSB0aGUgc3RhZ2dlci5cblxuICAgICAgaSA9IHBsdWdpbi5fcHJvcHMubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHB0TG9va3VwW3BsdWdpbi5fcHJvcHNbaV1dID0gcHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBsdWdpbjtcbn0sXG4gICAgX292ZXJ3cml0aW5nVHdlZW4sXG4gICAgLy9zdG9yZSBhIHJlZmVyZW5jZSB0ZW1wb3JhcmlseSBzbyB3ZSBjYW4gYXZvaWQgb3ZlcndyaXRpbmcgaXRzZWxmLlxuX2ZvcmNlQWxsUHJvcFR3ZWVucyxcbiAgICBfaW5pdFR3ZWVuID0gZnVuY3Rpb24gX2luaXRUd2Vlbih0d2VlbiwgdGltZSwgdFRpbWUpIHtcbiAgdmFyIHZhcnMgPSB0d2Vlbi52YXJzLFxuICAgICAgZWFzZSA9IHZhcnMuZWFzZSxcbiAgICAgIHN0YXJ0QXQgPSB2YXJzLnN0YXJ0QXQsXG4gICAgICBpbW1lZGlhdGVSZW5kZXIgPSB2YXJzLmltbWVkaWF0ZVJlbmRlcixcbiAgICAgIGxhenkgPSB2YXJzLmxhenksXG4gICAgICBvblVwZGF0ZSA9IHZhcnMub25VcGRhdGUsXG4gICAgICBvblVwZGF0ZVBhcmFtcyA9IHZhcnMub25VcGRhdGVQYXJhbXMsXG4gICAgICBjYWxsYmFja1Njb3BlID0gdmFycy5jYWxsYmFja1Njb3BlLFxuICAgICAgcnVuQmFja3dhcmRzID0gdmFycy5ydW5CYWNrd2FyZHMsXG4gICAgICB5b3lvRWFzZSA9IHZhcnMueW95b0Vhc2UsXG4gICAgICBrZXlmcmFtZXMgPSB2YXJzLmtleWZyYW1lcyxcbiAgICAgIGF1dG9SZXZlcnQgPSB2YXJzLmF1dG9SZXZlcnQsXG4gICAgICBkdXIgPSB0d2Vlbi5fZHVyLFxuICAgICAgcHJldlN0YXJ0QXQgPSB0d2Vlbi5fc3RhcnRBdCxcbiAgICAgIHRhcmdldHMgPSB0d2Vlbi5fdGFyZ2V0cyxcbiAgICAgIHBhcmVudCA9IHR3ZWVuLnBhcmVudCxcbiAgICAgIGZ1bGxUYXJnZXRzID0gcGFyZW50ICYmIHBhcmVudC5kYXRhID09PSBcIm5lc3RlZFwiID8gcGFyZW50LnZhcnMudGFyZ2V0cyA6IHRhcmdldHMsXG4gICAgICBhdXRvT3ZlcndyaXRlID0gdHdlZW4uX292ZXJ3cml0ZSA9PT0gXCJhdXRvXCIgJiYgIV9zdXBwcmVzc092ZXJ3cml0ZXMsXG4gICAgICB0bCA9IHR3ZWVuLnRpbWVsaW5lLFxuICAgICAgY2xlYW5WYXJzLFxuICAgICAgaSxcbiAgICAgIHAsXG4gICAgICBwdCxcbiAgICAgIHRhcmdldCxcbiAgICAgIGhhc1ByaW9yaXR5LFxuICAgICAgZ3NEYXRhLFxuICAgICAgaGFybmVzcyxcbiAgICAgIHBsdWdpbixcbiAgICAgIHB0TG9va3VwLFxuICAgICAgaW5kZXgsXG4gICAgICBoYXJuZXNzVmFycyxcbiAgICAgIG92ZXJ3cml0dGVuO1xuICB0bCAmJiAoIWtleWZyYW1lcyB8fCAhZWFzZSkgJiYgKGVhc2UgPSBcIm5vbmVcIik7XG4gIHR3ZWVuLl9lYXNlID0gX3BhcnNlRWFzZShlYXNlLCBfZGVmYXVsdHMuZWFzZSk7XG4gIHR3ZWVuLl95RWFzZSA9IHlveW9FYXNlID8gX2ludmVydEVhc2UoX3BhcnNlRWFzZSh5b3lvRWFzZSA9PT0gdHJ1ZSA/IGVhc2UgOiB5b3lvRWFzZSwgX2RlZmF1bHRzLmVhc2UpKSA6IDA7XG5cbiAgaWYgKHlveW9FYXNlICYmIHR3ZWVuLl95b3lvICYmICF0d2Vlbi5fcmVwZWF0KSB7XG4gICAgLy90aGVyZSBtdXN0IGhhdmUgYmVlbiBhIHBhcmVudCB0aW1lbGluZSB3aXRoIHlveW86dHJ1ZSB0aGF0IGlzIGN1cnJlbnRseSBpbiBpdHMgeW95byBwaGFzZSwgc28gZmxpcCB0aGUgZWFzZXMuXG4gICAgeW95b0Vhc2UgPSB0d2Vlbi5feUVhc2U7XG4gICAgdHdlZW4uX3lFYXNlID0gdHdlZW4uX2Vhc2U7XG4gICAgdHdlZW4uX2Vhc2UgPSB5b3lvRWFzZTtcbiAgfVxuXG4gIHR3ZWVuLl9mcm9tID0gIXRsICYmICEhdmFycy5ydW5CYWNrd2FyZHM7IC8vbmVzdGVkIHRpbWVsaW5lcyBzaG91bGQgbmV2ZXIgcnVuIGJhY2t3YXJkcyAtIHRoZSBiYWNrd2FyZHMtbmVzcyBpcyBpbiB0aGUgY2hpbGQgdHdlZW5zLlxuXG4gIGlmICghdGwgfHwga2V5ZnJhbWVzICYmICF2YXJzLnN0YWdnZXIpIHtcbiAgICAvL2lmIHRoZXJlJ3MgYW4gaW50ZXJuYWwgdGltZWxpbmUsIHNraXAgYWxsIHRoZSBwYXJzaW5nIGJlY2F1c2Ugd2UgcGFzc2VkIHRoYXQgdGFzayBkb3duIHRoZSBjaGFpbi5cbiAgICBoYXJuZXNzID0gdGFyZ2V0c1swXSA/IF9nZXRDYWNoZSh0YXJnZXRzWzBdKS5oYXJuZXNzIDogMDtcbiAgICBoYXJuZXNzVmFycyA9IGhhcm5lc3MgJiYgdmFyc1toYXJuZXNzLnByb3BdOyAvL3NvbWVvbmUgbWF5IG5lZWQgdG8gc3BlY2lmeSBDU1Mtc3BlY2lmaWMgdmFsdWVzIEFORCBub24tQ1NTIHZhbHVlcywgbGlrZSBpZiB0aGUgZWxlbWVudCBoYXMgYW4gXCJ4XCIgcHJvcGVydHkgcGx1cyBpdCdzIGEgc3RhbmRhcmQgRE9NIGVsZW1lbnQuIFdlIGFsbG93IHBlb3BsZSB0byBkaXN0aW5ndWlzaCBieSB3cmFwcGluZyBwbHVnaW4tc3BlY2lmaWMgc3R1ZmYgaW4gYSBjc3M6e30gb2JqZWN0IGZvciBleGFtcGxlLlxuXG4gICAgY2xlYW5WYXJzID0gX2NvcHlFeGNsdWRpbmcodmFycywgX3Jlc2VydmVkUHJvcHMpO1xuXG4gICAgaWYgKHByZXZTdGFydEF0KSB7XG4gICAgICBwcmV2U3RhcnRBdC5felRpbWUgPCAwICYmIHByZXZTdGFydEF0LnByb2dyZXNzKDEpOyAvLyBpbiBjYXNlIGl0J3MgYSBsYXp5IHN0YXJ0QXQgdGhhdCBoYXNuJ3QgcmVuZGVyZWQgeWV0LlxuXG4gICAgICB0aW1lIDwgMCAmJiBydW5CYWNrd2FyZHMgJiYgaW1tZWRpYXRlUmVuZGVyICYmICFhdXRvUmV2ZXJ0ID8gcHJldlN0YXJ0QXQucmVuZGVyKC0xLCB0cnVlKSA6IHByZXZTdGFydEF0LnJldmVydChydW5CYWNrd2FyZHMgJiYgZHVyID8gX3JldmVydENvbmZpZ05vS2lsbCA6IF9zdGFydEF0UmV2ZXJ0Q29uZmlnKTsgLy8gaWYgaXQncyBhIFwic3RhcnRBdFwiIChub3QgXCJmcm9tKClcIiBvciBydW5CYWNrd2FyZHM6IHRydWUpLCB3ZSBvbmx5IG5lZWQgdG8gZG8gYSBzaGFsbG93IHJldmVydCAoa2VlcCB0cmFuc2Zvcm1zIGNhY2hlZCBpbiBDU1NQbHVnaW4pXG4gICAgICAvLyBkb24ndCBqdXN0IF9yZW1vdmVGcm9tUGFyZW50KHByZXZTdGFydEF0LnJlbmRlcigtMSwgdHJ1ZSkpIGJlY2F1c2UgdGhhdCdsbCBsZWF2ZSBpbmxpbmUgc3R5bGVzLiBXZSdyZSBjcmVhdGluZyBhIG5ldyBfc3RhcnRBdCBmb3IgXCJzdGFydEF0XCIgdHdlZW5zIHRoYXQgcmUtY2FwdHVyZSB0aGluZ3MgdG8gZW5zdXJlIHRoYXQgaWYgdGhlIHByZS10d2VlbiB2YWx1ZXMgY2hhbmdlZCBzaW5jZSB0aGUgdHdlZW4gd2FzIGNyZWF0ZWQsIHRoZXkncmUgcmVjb3JkZWQuXG5cbiAgICAgIHByZXZTdGFydEF0Ll9sYXp5ID0gMDtcbiAgICB9XG5cbiAgICBpZiAoc3RhcnRBdCkge1xuICAgICAgX3JlbW92ZUZyb21QYXJlbnQodHdlZW4uX3N0YXJ0QXQgPSBUd2Vlbi5zZXQodGFyZ2V0cywgX3NldERlZmF1bHRzKHtcbiAgICAgICAgZGF0YTogXCJpc1N0YXJ0XCIsXG4gICAgICAgIG92ZXJ3cml0ZTogZmFsc2UsXG4gICAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgICBpbW1lZGlhdGVSZW5kZXI6IHRydWUsXG4gICAgICAgIGxhenk6ICFwcmV2U3RhcnRBdCAmJiBfaXNOb3RGYWxzZShsYXp5KSxcbiAgICAgICAgc3RhcnRBdDogbnVsbCxcbiAgICAgICAgZGVsYXk6IDAsXG4gICAgICAgIG9uVXBkYXRlOiBvblVwZGF0ZSxcbiAgICAgICAgb25VcGRhdGVQYXJhbXM6IG9uVXBkYXRlUGFyYW1zLFxuICAgICAgICBjYWxsYmFja1Njb3BlOiBjYWxsYmFja1Njb3BlLFxuICAgICAgICBzdGFnZ2VyOiAwXG4gICAgICB9LCBzdGFydEF0KSkpOyAvL2NvcHkgdGhlIHByb3BlcnRpZXMvdmFsdWVzIGludG8gYSBuZXcgb2JqZWN0IHRvIGF2b2lkIGNvbGxpc2lvbnMsIGxpa2UgdmFyIHRvID0ge3g6MH0sIGZyb20gPSB7eDo1MDB9OyB0aW1lbGluZS5mcm9tVG8oZSwgZnJvbSwgdG8pLmZyb21UbyhlLCB0bywgZnJvbSk7XG5cblxuICAgICAgdHdlZW4uX3N0YXJ0QXQuX2RwID0gMDsgLy8gZG9uJ3QgYWxsb3cgaXQgdG8gZ2V0IHB1dCBiYWNrIGludG8gcm9vdCB0aW1lbGluZSEgTGlrZSB3aGVuIHJldmVydCgpIGlzIGNhbGxlZCBhbmQgdG90YWxUaW1lKCkgZ2V0cyBzZXQuXG5cbiAgICAgIHR3ZWVuLl9zdGFydEF0Ll9zYXQgPSB0d2VlbjsgLy8gdXNlZCBpbiBnbG9iYWxUaW1lKCkuIF9zYXQgc3RhbmRzIGZvciBfc3RhcnRBdFR3ZWVuXG5cbiAgICAgIHRpbWUgPCAwICYmIChfcmV2ZXJ0aW5nIHx8ICFpbW1lZGlhdGVSZW5kZXIgJiYgIWF1dG9SZXZlcnQpICYmIHR3ZWVuLl9zdGFydEF0LnJldmVydChfcmV2ZXJ0Q29uZmlnTm9LaWxsKTsgLy8gcmFyZSBlZGdlIGNhc2UsIGxpa2UgaWYgYSByZW5kZXIgaXMgZm9yY2VkIGluIHRoZSBuZWdhdGl2ZSBkaXJlY3Rpb24gb2YgYSBub24taW5pdHRlZCB0d2Vlbi5cblxuICAgICAgaWYgKGltbWVkaWF0ZVJlbmRlcikge1xuICAgICAgICBpZiAoZHVyICYmIHRpbWUgPD0gMCAmJiB0VGltZSA8PSAwKSB7XG4gICAgICAgICAgLy8gY2hlY2sgdFRpbWUgaGVyZSBiZWNhdXNlIGluIHRoZSBjYXNlIG9mIGEgeW95byB0d2VlbiB3aG9zZSBwbGF5aGVhZCBnZXRzIHB1c2hlZCB0byB0aGUgZW5kIGxpa2UgdHdlZW4ucHJvZ3Jlc3MoMSksIHdlIHNob3VsZCBhbGxvdyBpdCB0aHJvdWdoIHNvIHRoYXQgdGhlIG9uQ29tcGxldGUgZ2V0cyBmaXJlZCBwcm9wZXJseS5cbiAgICAgICAgICB0aW1lICYmICh0d2Vlbi5felRpbWUgPSB0aW1lKTtcbiAgICAgICAgICByZXR1cm47IC8vd2Ugc2tpcCBpbml0aWFsaXphdGlvbiBoZXJlIHNvIHRoYXQgb3ZlcndyaXRpbmcgZG9lc24ndCBvY2N1ciB1bnRpbCB0aGUgdHdlZW4gYWN0dWFsbHkgYmVnaW5zLiBPdGhlcndpc2UsIGlmIHlvdSBjcmVhdGUgc2V2ZXJhbCBpbW1lZGlhdGVSZW5kZXI6dHJ1ZSB0d2VlbnMgb2YgdGhlIHNhbWUgdGFyZ2V0L3Byb3BlcnRpZXMgdG8gZHJvcCBpbnRvIGEgVGltZWxpbmUsIHRoZSBsYXN0IG9uZSBjcmVhdGVkIHdvdWxkIG92ZXJ3cml0ZSB0aGUgZmlyc3Qgb25lcyBiZWNhdXNlIHRoZXkgZGlkbid0IGdldCBwbGFjZWQgaW50byB0aGUgdGltZWxpbmUgeWV0IGJlZm9yZSB0aGUgZmlyc3QgcmVuZGVyIG9jY3VycyBhbmQga2lja3MgaW4gb3ZlcndyaXRpbmcuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJ1bkJhY2t3YXJkcyAmJiBkdXIpIHtcbiAgICAgIC8vZnJvbSgpIHR3ZWVucyBtdXN0IGJlIGhhbmRsZWQgdW5pcXVlbHk6IHRoZWlyIGJlZ2lubmluZyB2YWx1ZXMgbXVzdCBiZSByZW5kZXJlZCBidXQgd2UgZG9uJ3Qgd2FudCBvdmVyd3JpdGluZyB0byBvY2N1ciB5ZXQgKHdoZW4gdGltZSBpcyBzdGlsbCAwKS4gV2FpdCB1bnRpbCB0aGUgdHdlZW4gYWN0dWFsbHkgYmVnaW5zIGJlZm9yZSBkb2luZyBhbGwgdGhlIHJvdXRpbmVzIGxpa2Ugb3ZlcndyaXRpbmcuIEF0IHRoYXQgdGltZSwgd2Ugc2hvdWxkIHJlbmRlciBhdCB0aGUgRU5EIG9mIHRoZSB0d2VlbiB0byBlbnN1cmUgdGhhdCB0aGluZ3MgaW5pdGlhbGl6ZSBjb3JyZWN0bHkgKHJlbWVtYmVyLCBmcm9tKCkgdHdlZW5zIGdvIGJhY2t3YXJkcylcbiAgICAgIGlmICghcHJldlN0YXJ0QXQpIHtcbiAgICAgICAgdGltZSAmJiAoaW1tZWRpYXRlUmVuZGVyID0gZmFsc2UpOyAvL2luIHJhcmUgY2FzZXMgKGxpa2UgaWYgYSBmcm9tKCkgdHdlZW4gcnVucyBhbmQgdGhlbiBpcyBpbnZhbGlkYXRlKCktZWQpLCBpbW1lZGlhdGVSZW5kZXIgY291bGQgYmUgdHJ1ZSBidXQgdGhlIGluaXRpYWwgZm9yY2VkLXJlbmRlciBnZXRzIHNraXBwZWQsIHNvIHRoZXJlJ3Mgbm8gbmVlZCB0byBmb3JjZSB0aGUgcmVuZGVyIGluIHRoaXMgY29udGV4dCB3aGVuIHRoZSBfdGltZSBpcyBncmVhdGVyIHRoYW4gMFxuXG4gICAgICAgIHAgPSBfc2V0RGVmYXVsdHMoe1xuICAgICAgICAgIG92ZXJ3cml0ZTogZmFsc2UsXG4gICAgICAgICAgZGF0YTogXCJpc0Zyb21TdGFydFwiLFxuICAgICAgICAgIC8vd2UgdGFnIHRoZSB0d2VlbiB3aXRoIGFzIFwiaXNGcm9tU3RhcnRcIiBzbyB0aGF0IGlmIFtpbnNpZGUgYSBwbHVnaW5dIHdlIG5lZWQgdG8gb25seSBkbyBzb21ldGhpbmcgYXQgdGhlIHZlcnkgRU5EIG9mIGEgdHdlZW4sIHdlIGhhdmUgYSB3YXkgb2YgaWRlbnRpZnlpbmcgdGhpcyB0d2VlbiBhcyBtZXJlbHkgdGhlIG9uZSB0aGF0J3Mgc2V0dGluZyB0aGUgYmVnaW5uaW5nIHZhbHVlcyBmb3IgYSBcImZyb20oKVwiIHR3ZWVuLiBGb3IgZXhhbXBsZSwgY2xlYXJQcm9wcyBpbiBDU1NQbHVnaW4gc2hvdWxkIG9ubHkgZ2V0IGFwcGxpZWQgYXQgdGhlIHZlcnkgRU5EIG9mIGEgdHdlZW4gYW5kIHdpdGhvdXQgdGhpcyB0YWcsIGZyb20oLi4ue2hlaWdodDoxMDAsIGNsZWFyUHJvcHM6XCJoZWlnaHRcIiwgZGVsYXk6MX0pIHdvdWxkIHdpcGUgdGhlIGhlaWdodCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSB0d2VlbiBhbmQgYWZ0ZXIgMSBzZWNvbmQsIGl0J2Qga2ljayBiYWNrIGluLlxuICAgICAgICAgIGxhenk6IGltbWVkaWF0ZVJlbmRlciAmJiAhcHJldlN0YXJ0QXQgJiYgX2lzTm90RmFsc2UobGF6eSksXG4gICAgICAgICAgaW1tZWRpYXRlUmVuZGVyOiBpbW1lZGlhdGVSZW5kZXIsXG4gICAgICAgICAgLy96ZXJvLWR1cmF0aW9uIHR3ZWVucyByZW5kZXIgaW1tZWRpYXRlbHkgYnkgZGVmYXVsdCwgYnV0IGlmIHdlJ3JlIG5vdCBzcGVjaWZpY2FsbHkgaW5zdHJ1Y3RlZCB0byByZW5kZXIgdGhpcyB0d2VlbiBpbW1lZGlhdGVseSwgd2Ugc2hvdWxkIHNraXAgdGhpcyBhbmQgbWVyZWx5IF9pbml0KCkgdG8gcmVjb3JkIHRoZSBzdGFydGluZyB2YWx1ZXMgKHJlbmRlcmluZyB0aGVtIGltbWVkaWF0ZWx5IHdvdWxkIHB1c2ggdGhlbSB0byBjb21wbGV0aW9uIHdoaWNoIGlzIHdhc3RlZnVsIGluIHRoYXQgY2FzZSAtIHdlJ2QgaGF2ZSB0byByZW5kZXIoLTEpIGltbWVkaWF0ZWx5IGFmdGVyKVxuICAgICAgICAgIHN0YWdnZXI6IDAsXG4gICAgICAgICAgcGFyZW50OiBwYXJlbnQgLy9lbnN1cmVzIHRoYXQgbmVzdGVkIHR3ZWVucyB0aGF0IGhhZCBhIHN0YWdnZXIgYXJlIGhhbmRsZWQgcHJvcGVybHksIGxpa2UgZ3NhcC5mcm9tKFwiLmNsYXNzXCIsIHt5OmdzYXAudXRpbHMud3JhcChbLTEwMCwxMDBdKX0pXG5cbiAgICAgICAgfSwgY2xlYW5WYXJzKTtcbiAgICAgICAgaGFybmVzc1ZhcnMgJiYgKHBbaGFybmVzcy5wcm9wXSA9IGhhcm5lc3NWYXJzKTsgLy8gaW4gY2FzZSBzb21lb25lIGRvZXMgc29tZXRoaW5nIGxpa2UgLmZyb20oLi4uLCB7Y3NzOnt9fSlcblxuICAgICAgICBfcmVtb3ZlRnJvbVBhcmVudCh0d2Vlbi5fc3RhcnRBdCA9IFR3ZWVuLnNldCh0YXJnZXRzLCBwKSk7XG5cbiAgICAgICAgdHdlZW4uX3N0YXJ0QXQuX2RwID0gMDsgLy8gZG9uJ3QgYWxsb3cgaXQgdG8gZ2V0IHB1dCBiYWNrIGludG8gcm9vdCB0aW1lbGluZSFcblxuICAgICAgICB0d2Vlbi5fc3RhcnRBdC5fc2F0ID0gdHdlZW47IC8vIHVzZWQgaW4gZ2xvYmFsVGltZSgpXG5cbiAgICAgICAgdGltZSA8IDAgJiYgKF9yZXZlcnRpbmcgPyB0d2Vlbi5fc3RhcnRBdC5yZXZlcnQoX3JldmVydENvbmZpZ05vS2lsbCkgOiB0d2Vlbi5fc3RhcnRBdC5yZW5kZXIoLTEsIHRydWUpKTtcbiAgICAgICAgdHdlZW4uX3pUaW1lID0gdGltZTtcblxuICAgICAgICBpZiAoIWltbWVkaWF0ZVJlbmRlcikge1xuICAgICAgICAgIF9pbml0VHdlZW4odHdlZW4uX3N0YXJ0QXQsIF90aW55TnVtLCBfdGlueU51bSk7IC8vZW5zdXJlcyB0aGF0IHRoZSBpbml0aWFsIHZhbHVlcyBhcmUgcmVjb3JkZWRcblxuICAgICAgICB9IGVsc2UgaWYgKCF0aW1lKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdHdlZW4uX3B0ID0gdHdlZW4uX3B0Q2FjaGUgPSAwO1xuICAgIGxhenkgPSBkdXIgJiYgX2lzTm90RmFsc2UobGF6eSkgfHwgbGF6eSAmJiAhZHVyO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHRhcmdldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRhcmdldCA9IHRhcmdldHNbaV07XG4gICAgICBnc0RhdGEgPSB0YXJnZXQuX2dzYXAgfHwgX2hhcm5lc3ModGFyZ2V0cylbaV0uX2dzYXA7XG4gICAgICB0d2Vlbi5fcHRMb29rdXBbaV0gPSBwdExvb2t1cCA9IHt9O1xuICAgICAgX2xhenlMb29rdXBbZ3NEYXRhLmlkXSAmJiBfbGF6eVR3ZWVucy5sZW5ndGggJiYgX2xhenlSZW5kZXIoKTsgLy9pZiBvdGhlciB0d2VlbnMgb2YgdGhlIHNhbWUgdGFyZ2V0IGhhdmUgcmVjZW50bHkgaW5pdHRlZCBidXQgaGF2ZW4ndCByZW5kZXJlZCB5ZXQsIHdlJ3ZlIGdvdCB0byBmb3JjZSB0aGUgcmVuZGVyIHNvIHRoYXQgdGhlIHN0YXJ0aW5nIHZhbHVlcyBhcmUgY29ycmVjdCAoaW1hZ2luZSBwb3B1bGF0aW5nIGEgdGltZWxpbmUgd2l0aCBhIGJ1bmNoIG9mIHNlcXVlbnRpYWwgdHdlZW5zIGFuZCB0aGVuIGp1bXBpbmcgdG8gdGhlIGVuZClcblxuICAgICAgaW5kZXggPSBmdWxsVGFyZ2V0cyA9PT0gdGFyZ2V0cyA/IGkgOiBmdWxsVGFyZ2V0cy5pbmRleE9mKHRhcmdldCk7XG5cbiAgICAgIGlmIChoYXJuZXNzICYmIChwbHVnaW4gPSBuZXcgaGFybmVzcygpKS5pbml0KHRhcmdldCwgaGFybmVzc1ZhcnMgfHwgY2xlYW5WYXJzLCB0d2VlbiwgaW5kZXgsIGZ1bGxUYXJnZXRzKSAhPT0gZmFsc2UpIHtcbiAgICAgICAgdHdlZW4uX3B0ID0gcHQgPSBuZXcgUHJvcFR3ZWVuKHR3ZWVuLl9wdCwgdGFyZ2V0LCBwbHVnaW4ubmFtZSwgMCwgMSwgcGx1Z2luLnJlbmRlciwgcGx1Z2luLCAwLCBwbHVnaW4ucHJpb3JpdHkpO1xuXG4gICAgICAgIHBsdWdpbi5fcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgIHB0TG9va3VwW25hbWVdID0gcHQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBsdWdpbi5wcmlvcml0eSAmJiAoaGFzUHJpb3JpdHkgPSAxKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFoYXJuZXNzIHx8IGhhcm5lc3NWYXJzKSB7XG4gICAgICAgIGZvciAocCBpbiBjbGVhblZhcnMpIHtcbiAgICAgICAgICBpZiAoX3BsdWdpbnNbcF0gJiYgKHBsdWdpbiA9IF9jaGVja1BsdWdpbihwLCBjbGVhblZhcnMsIHR3ZWVuLCBpbmRleCwgdGFyZ2V0LCBmdWxsVGFyZ2V0cykpKSB7XG4gICAgICAgICAgICBwbHVnaW4ucHJpb3JpdHkgJiYgKGhhc1ByaW9yaXR5ID0gMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHB0TG9va3VwW3BdID0gcHQgPSBfYWRkUHJvcFR3ZWVuLmNhbGwodHdlZW4sIHRhcmdldCwgcCwgXCJnZXRcIiwgY2xlYW5WYXJzW3BdLCBpbmRleCwgZnVsbFRhcmdldHMsIDAsIHZhcnMuc3RyaW5nRmlsdGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdHdlZW4uX29wICYmIHR3ZWVuLl9vcFtpXSAmJiB0d2Vlbi5raWxsKHRhcmdldCwgdHdlZW4uX29wW2ldKTtcblxuICAgICAgaWYgKGF1dG9PdmVyd3JpdGUgJiYgdHdlZW4uX3B0KSB7XG4gICAgICAgIF9vdmVyd3JpdGluZ1R3ZWVuID0gdHdlZW47XG5cbiAgICAgICAgX2dsb2JhbFRpbWVsaW5lLmtpbGxUd2VlbnNPZih0YXJnZXQsIHB0TG9va3VwLCB0d2Vlbi5nbG9iYWxUaW1lKHRpbWUpKTsgLy8gbWFrZSBzdXJlIHRoZSBvdmVyd3JpdGluZyBkb2Vzbid0IG92ZXJ3cml0ZSBUSElTIHR3ZWVuISEhXG5cblxuICAgICAgICBvdmVyd3JpdHRlbiA9ICF0d2Vlbi5wYXJlbnQ7XG4gICAgICAgIF9vdmVyd3JpdGluZ1R3ZWVuID0gMDtcbiAgICAgIH1cblxuICAgICAgdHdlZW4uX3B0ICYmIGxhenkgJiYgKF9sYXp5TG9va3VwW2dzRGF0YS5pZF0gPSAxKTtcbiAgICB9XG5cbiAgICBoYXNQcmlvcml0eSAmJiBfc29ydFByb3BUd2VlbnNCeVByaW9yaXR5KHR3ZWVuKTtcbiAgICB0d2Vlbi5fb25Jbml0ICYmIHR3ZWVuLl9vbkluaXQodHdlZW4pOyAvL3BsdWdpbnMgbGlrZSBSb3VuZFByb3BzIG11c3Qgd2FpdCB1bnRpbCBBTEwgb2YgdGhlIFByb3BUd2VlbnMgYXJlIGluc3RhbnRpYXRlZC4gSW4gdGhlIHBsdWdpbidzIGluaXQoKSBmdW5jdGlvbiwgaXQgc2V0cyB0aGUgX29uSW5pdCBvbiB0aGUgdHdlZW4gaW5zdGFuY2UuIE1heSBub3QgYmUgcHJldHR5L2ludHVpdGl2ZSwgYnV0IGl0J3MgZmFzdCBhbmQga2VlcHMgZmlsZSBzaXplIGRvd24uXG4gIH1cblxuICB0d2Vlbi5fb25VcGRhdGUgPSBvblVwZGF0ZTtcbiAgdHdlZW4uX2luaXR0ZWQgPSAoIXR3ZWVuLl9vcCB8fCB0d2Vlbi5fcHQpICYmICFvdmVyd3JpdHRlbjsgLy8gaWYgb3ZlcndyaXR0ZW5Qcm9wcyByZXN1bHRlZCBpbiB0aGUgZW50aXJlIHR3ZWVuIGJlaW5nIGtpbGxlZCwgZG8gTk9UIGZsYWcgaXQgYXMgaW5pdHRlZCBvciBlbHNlIGl0IG1heSByZW5kZXIgZm9yIG9uZSB0aWNrLlxuXG4gIGtleWZyYW1lcyAmJiB0aW1lIDw9IDAgJiYgdGwucmVuZGVyKF9iaWdOdW0sIHRydWUsIHRydWUpOyAvLyBpZiB0aGVyZSdzIGEgMCUga2V5ZnJhbWUsIGl0J2xsIHJlbmRlciBpbiB0aGUgXCJiZWZvcmVcIiBzdGF0ZSBmb3IgYW55IHN0YWdnZXJlZC9kZWxheWVkIGFuaW1hdGlvbnMgdGh1cyB3aGVuIHRoZSBmb2xsb3dpbmcgdHdlZW4gaW5pdGlhbGl6ZXMsIGl0J2xsIHVzZSB0aGUgXCJiZWZvcmVcIiBzdGF0ZSBpbnN0ZWFkIG9mIHRoZSBcImFmdGVyXCIgc3RhdGUgYXMgdGhlIGluaXRpYWwgdmFsdWVzLlxufSxcbiAgICBfdXBkYXRlUHJvcFR3ZWVucyA9IGZ1bmN0aW9uIF91cGRhdGVQcm9wVHdlZW5zKHR3ZWVuLCBwcm9wZXJ0eSwgdmFsdWUsIHN0YXJ0LCBzdGFydElzUmVsYXRpdmUsIHJhdGlvLCB0aW1lKSB7XG4gIHZhciBwdENhY2hlID0gKHR3ZWVuLl9wdCAmJiB0d2Vlbi5fcHRDYWNoZSB8fCAodHdlZW4uX3B0Q2FjaGUgPSB7fSkpW3Byb3BlcnR5XSxcbiAgICAgIHB0LFxuICAgICAgcm9vdFBULFxuICAgICAgbG9va3VwLFxuICAgICAgaTtcblxuICBpZiAoIXB0Q2FjaGUpIHtcbiAgICBwdENhY2hlID0gdHdlZW4uX3B0Q2FjaGVbcHJvcGVydHldID0gW107XG4gICAgbG9va3VwID0gdHdlZW4uX3B0TG9va3VwO1xuICAgIGkgPSB0d2Vlbi5fdGFyZ2V0cy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBwdCA9IGxvb2t1cFtpXVtwcm9wZXJ0eV07XG5cbiAgICAgIGlmIChwdCAmJiBwdC5kICYmIHB0LmQuX3B0KSB7XG4gICAgICAgIC8vIGl0J3MgYSBwbHVnaW4sIHNvIGZpbmQgdGhlIG5lc3RlZCBQcm9wVHdlZW5cbiAgICAgICAgcHQgPSBwdC5kLl9wdDtcblxuICAgICAgICB3aGlsZSAocHQgJiYgcHQucCAhPT0gcHJvcGVydHkgJiYgcHQuZnAgIT09IHByb3BlcnR5KSB7XG4gICAgICAgICAgLy8gXCJmcFwiIGlzIGZ1bmN0aW9uUGFyYW0gZm9yIHRoaW5ncyBsaWtlIHNldHRpbmcgQ1NTIHZhcmlhYmxlcyB3aGljaCByZXF1aXJlIC5zZXRQcm9wZXJ0eShcIi0tdmFyLW5hbWVcIiwgdmFsdWUpXG4gICAgICAgICAgcHQgPSBwdC5fbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXB0KSB7XG4gICAgICAgIC8vIHRoZXJlIGlzIG5vIFByb3BUd2VlbiBhc3NvY2lhdGVkIHdpdGggdGhhdCBwcm9wZXJ0eSwgc28gd2UgbXVzdCBGT1JDRSBvbmUgdG8gYmUgY3JlYXRlZCBhbmQgZGl0Y2ggb3V0IG9mIHRoaXNcbiAgICAgICAgLy8gaWYgdGhlIHR3ZWVuIGhhcyBvdGhlciBwcm9wZXJ0aWVzIHRoYXQgYWxyZWFkeSByZW5kZXJlZCBhdCBuZXcgcG9zaXRpb25zLCB3ZSdkIG5vcm1hbGx5IGhhdmUgdG8gcmV3aW5kIHRvIHB1dCB0aGVtIGJhY2sgbGlrZSB0d2Vlbi5yZW5kZXIoMCwgdHJ1ZSkgYmVmb3JlIGZvcmNpbmcgYW4gX2luaXRUd2VlbigpLCBidXQgdGhhdCBjYW4gY3JlYXRlIGFub3RoZXIgZWRnZSBjYXNlIGxpa2UgdHdlZW5pbmcgYSB0aW1lbGluZSdzIHByb2dyZXNzIHdvdWxkIHRyaWdnZXIgb25VcGRhdGVzIHRvIGZpcmUgd2hpY2ggY291bGQgbW92ZSBvdGhlciB0aGluZ3MgYXJvdW5kLiBJdCdzIGJldHRlciB0byBqdXN0IGluZm9ybSB1c2VycyB0aGF0IC5yZXNldFRvKCkgc2hvdWxkIE9OTFkgYmUgdXNlZCBmb3IgdHdlZW5zIHRoYXQgYWxyZWFkeSBoYXZlIHRoYXQgcHJvcGVydHkuIEZvciBleGFtcGxlLCB5b3UgY2FuJ3QgZ3NhcC50byguLi57IHk6IDAgfSkgYW5kIHRoZW4gdHdlZW4ucmVzdFRvKFwieFwiLCAyMDApIGZvciBleGFtcGxlLlxuICAgICAgICBfZm9yY2VBbGxQcm9wVHdlZW5zID0gMTsgLy8gb3RoZXJ3aXNlLCB3aGVuIHdlIF9hZGRQcm9wVHdlZW4oKSBhbmQgaXQgZmluZHMgbm8gY2hhbmdlIGJldHdlZW4gdGhlIHN0YXJ0IGFuZCBlbmQgdmFsdWVzLCBpdCBza2lwcyBjcmVhdGluZyBhIFByb3BUd2VlbiAoZm9yIGVmZmljaWVuY3kuLi53aHkgdHdlZW4gd2hlbiB0aGVyZSdzIG5vIGRpZmZlcmVuY2U/KSBidXQgaW4gdGhpcyBjYXNlIHdlIE5FRUQgdGhhdCBQcm9wVHdlZW4gY3JlYXRlZCBzbyB3ZSBjYW4gZWRpdCBpdC5cblxuICAgICAgICB0d2Vlbi52YXJzW3Byb3BlcnR5XSA9IFwiKz0wXCI7XG5cbiAgICAgICAgX2luaXRUd2Vlbih0d2VlbiwgdGltZSk7XG5cbiAgICAgICAgX2ZvcmNlQWxsUHJvcFR3ZWVucyA9IDA7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuXG4gICAgICBwdENhY2hlLnB1c2gocHQpO1xuICAgIH1cbiAgfVxuXG4gIGkgPSBwdENhY2hlLmxlbmd0aDtcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgcm9vdFBUID0gcHRDYWNoZVtpXTtcbiAgICBwdCA9IHJvb3RQVC5fcHQgfHwgcm9vdFBUOyAvLyBjb21wbGV4IHZhbHVlcyBtYXkgaGF2ZSBuZXN0ZWQgUHJvcFR3ZWVucy4gV2Ugb25seSBhY2NvbW1vZGF0ZSB0aGUgRklSU1QgdmFsdWUuXG5cbiAgICBwdC5zID0gKHN0YXJ0IHx8IHN0YXJ0ID09PSAwKSAmJiAhc3RhcnRJc1JlbGF0aXZlID8gc3RhcnQgOiBwdC5zICsgKHN0YXJ0IHx8IDApICsgcmF0aW8gKiBwdC5jO1xuICAgIHB0LmMgPSB2YWx1ZSAtIHB0LnM7XG4gICAgcm9vdFBULmUgJiYgKHJvb3RQVC5lID0gX3JvdW5kKHZhbHVlKSArIGdldFVuaXQocm9vdFBULmUpKTsgLy8gbWFpbmx5IGZvciBDU1NQbHVnaW4gKGVuZCB2YWx1ZSlcblxuICAgIHJvb3RQVC5iICYmIChyb290UFQuYiA9IHB0LnMgKyBnZXRVbml0KHJvb3RQVC5iKSk7IC8vIChiZWdpbm5pbmcgdmFsdWUpXG4gIH1cbn0sXG4gICAgX2FkZEFsaWFzZXNUb1ZhcnMgPSBmdW5jdGlvbiBfYWRkQWxpYXNlc1RvVmFycyh0YXJnZXRzLCB2YXJzKSB7XG4gIHZhciBoYXJuZXNzID0gdGFyZ2V0c1swXSA/IF9nZXRDYWNoZSh0YXJnZXRzWzBdKS5oYXJuZXNzIDogMCxcbiAgICAgIHByb3BlcnR5QWxpYXNlcyA9IGhhcm5lc3MgJiYgaGFybmVzcy5hbGlhc2VzLFxuICAgICAgY29weSxcbiAgICAgIHAsXG4gICAgICBpLFxuICAgICAgYWxpYXNlcztcblxuICBpZiAoIXByb3BlcnR5QWxpYXNlcykge1xuICAgIHJldHVybiB2YXJzO1xuICB9XG5cbiAgY29weSA9IF9tZXJnZSh7fSwgdmFycyk7XG5cbiAgZm9yIChwIGluIHByb3BlcnR5QWxpYXNlcykge1xuICAgIGlmIChwIGluIGNvcHkpIHtcbiAgICAgIGFsaWFzZXMgPSBwcm9wZXJ0eUFsaWFzZXNbcF0uc3BsaXQoXCIsXCIpO1xuICAgICAgaSA9IGFsaWFzZXMubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGNvcHlbYWxpYXNlc1tpXV0gPSBjb3B5W3BdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb3B5O1xufSxcbiAgICAvLyBwYXJzZXMgbXVsdGlwbGUgZm9ybWF0cywgbGlrZSB7XCIwJVwiOiB7eDogMTAwfSwge1wiNTAlXCI6IHt4OiAtMjB9fSBhbmQgeyB4OiB7XCIwJVwiOiAxMDAsIFwiNTAlXCI6IC0yMH0gfSwgYW5kIGFuIFwiZWFzZVwiIGNhbiBiZSBzZXQgb24gYW55IG9iamVjdC4gV2UgcG9wdWxhdGUgYW4gXCJhbGxQcm9wc1wiIG9iamVjdCB3aXRoIGFuIEFycmF5IGZvciBlYWNoIHByb3BlcnR5LCBsaWtlIHt4OiBbe30sIHt9XSwgeTpbe30sIHt9XX0gd2l0aCBkYXRhIGZvciBlYWNoIHByb3BlcnR5IHR3ZWVuLiBUaGUgb2JqZWN0cyBoYXZlIGEgXCJ0XCIgKHRpbWUpLCBcInZcIiwgKHZhbHVlKSwgYW5kIFwiZVwiIChlYXNlKSBwcm9wZXJ0eS4gVGhpcyBhbGxvd3MgdXMgdG8gcGllY2UgdG9nZXRoZXIgYSB0aW1lbGluZSBsYXRlci5cbl9wYXJzZUtleWZyYW1lID0gZnVuY3Rpb24gX3BhcnNlS2V5ZnJhbWUocHJvcCwgb2JqLCBhbGxQcm9wcywgZWFzZUVhY2gpIHtcbiAgdmFyIGVhc2UgPSBvYmouZWFzZSB8fCBlYXNlRWFjaCB8fCBcInBvd2VyMS5pbk91dFwiLFxuICAgICAgcCxcbiAgICAgIGE7XG5cbiAgaWYgKF9pc0FycmF5KG9iaikpIHtcbiAgICBhID0gYWxsUHJvcHNbcHJvcF0gfHwgKGFsbFByb3BzW3Byb3BdID0gW10pOyAvLyB0ID0gdGltZSAob3V0IG9mIDEwMCksIHYgPSB2YWx1ZSwgZSA9IGVhc2VcblxuICAgIG9iai5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgaSkge1xuICAgICAgcmV0dXJuIGEucHVzaCh7XG4gICAgICAgIHQ6IGkgLyAob2JqLmxlbmd0aCAtIDEpICogMTAwLFxuICAgICAgICB2OiB2YWx1ZSxcbiAgICAgICAgZTogZWFzZVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZm9yIChwIGluIG9iaikge1xuICAgICAgYSA9IGFsbFByb3BzW3BdIHx8IChhbGxQcm9wc1twXSA9IFtdKTtcbiAgICAgIHAgPT09IFwiZWFzZVwiIHx8IGEucHVzaCh7XG4gICAgICAgIHQ6IHBhcnNlRmxvYXQocHJvcCksXG4gICAgICAgIHY6IG9ialtwXSxcbiAgICAgICAgZTogZWFzZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59LFxuICAgIF9wYXJzZUZ1bmNPclN0cmluZyA9IGZ1bmN0aW9uIF9wYXJzZUZ1bmNPclN0cmluZyh2YWx1ZSwgdHdlZW4sIGksIHRhcmdldCwgdGFyZ2V0cykge1xuICByZXR1cm4gX2lzRnVuY3Rpb24odmFsdWUpID8gdmFsdWUuY2FsbCh0d2VlbiwgaSwgdGFyZ2V0LCB0YXJnZXRzKSA6IF9pc1N0cmluZyh2YWx1ZSkgJiYgfnZhbHVlLmluZGV4T2YoXCJyYW5kb20oXCIpID8gX3JlcGxhY2VSYW5kb20odmFsdWUpIDogdmFsdWU7XG59LFxuICAgIF9zdGFnZ2VyVHdlZW5Qcm9wcyA9IF9jYWxsYmFja05hbWVzICsgXCJyZXBlYXQscmVwZWF0RGVsYXkseW95byxyZXBlYXRSZWZyZXNoLHlveW9FYXNlLGF1dG9SZXZlcnRcIixcbiAgICBfc3RhZ2dlclByb3BzVG9Ta2lwID0ge307XG5cbl9mb3JFYWNoTmFtZShfc3RhZ2dlclR3ZWVuUHJvcHMgKyBcIixpZCxzdGFnZ2VyLGRlbGF5LGR1cmF0aW9uLHBhdXNlZCxzY3JvbGxUcmlnZ2VyXCIsIGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBfc3RhZ2dlclByb3BzVG9Ta2lwW25hbWVdID0gMTtcbn0pO1xuLypcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBUV0VFTlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5cbmV4cG9ydCB2YXIgVHdlZW4gPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9BbmltYXRpb24yKSB7XG4gIF9pbmhlcml0c0xvb3NlKFR3ZWVuLCBfQW5pbWF0aW9uMik7XG5cbiAgZnVuY3Rpb24gVHdlZW4odGFyZ2V0cywgdmFycywgcG9zaXRpb24sIHNraXBJbmhlcml0KSB7XG4gICAgdmFyIF90aGlzMztcblxuICAgIGlmICh0eXBlb2YgdmFycyA9PT0gXCJudW1iZXJcIikge1xuICAgICAgcG9zaXRpb24uZHVyYXRpb24gPSB2YXJzO1xuICAgICAgdmFycyA9IHBvc2l0aW9uO1xuICAgICAgcG9zaXRpb24gPSBudWxsO1xuICAgIH1cblxuICAgIF90aGlzMyA9IF9BbmltYXRpb24yLmNhbGwodGhpcywgc2tpcEluaGVyaXQgPyB2YXJzIDogX2luaGVyaXREZWZhdWx0cyh2YXJzKSkgfHwgdGhpcztcbiAgICB2YXIgX3RoaXMzJHZhcnMgPSBfdGhpczMudmFycyxcbiAgICAgICAgZHVyYXRpb24gPSBfdGhpczMkdmFycy5kdXJhdGlvbixcbiAgICAgICAgZGVsYXkgPSBfdGhpczMkdmFycy5kZWxheSxcbiAgICAgICAgaW1tZWRpYXRlUmVuZGVyID0gX3RoaXMzJHZhcnMuaW1tZWRpYXRlUmVuZGVyLFxuICAgICAgICBzdGFnZ2VyID0gX3RoaXMzJHZhcnMuc3RhZ2dlcixcbiAgICAgICAgb3ZlcndyaXRlID0gX3RoaXMzJHZhcnMub3ZlcndyaXRlLFxuICAgICAgICBrZXlmcmFtZXMgPSBfdGhpczMkdmFycy5rZXlmcmFtZXMsXG4gICAgICAgIGRlZmF1bHRzID0gX3RoaXMzJHZhcnMuZGVmYXVsdHMsXG4gICAgICAgIHNjcm9sbFRyaWdnZXIgPSBfdGhpczMkdmFycy5zY3JvbGxUcmlnZ2VyLFxuICAgICAgICB5b3lvRWFzZSA9IF90aGlzMyR2YXJzLnlveW9FYXNlLFxuICAgICAgICBwYXJlbnQgPSB2YXJzLnBhcmVudCB8fCBfZ2xvYmFsVGltZWxpbmUsXG4gICAgICAgIHBhcnNlZFRhcmdldHMgPSAoX2lzQXJyYXkodGFyZ2V0cykgfHwgX2lzVHlwZWRBcnJheSh0YXJnZXRzKSA/IF9pc051bWJlcih0YXJnZXRzWzBdKSA6IFwibGVuZ3RoXCIgaW4gdmFycykgPyBbdGFyZ2V0c10gOiB0b0FycmF5KHRhcmdldHMpLFxuICAgICAgICB0bCxcbiAgICAgICAgaSxcbiAgICAgICAgY29weSxcbiAgICAgICAgbCxcbiAgICAgICAgcCxcbiAgICAgICAgY3VyVGFyZ2V0LFxuICAgICAgICBzdGFnZ2VyRnVuYyxcbiAgICAgICAgc3RhZ2dlclZhcnNUb01lcmdlO1xuICAgIF90aGlzMy5fdGFyZ2V0cyA9IHBhcnNlZFRhcmdldHMubGVuZ3RoID8gX2hhcm5lc3MocGFyc2VkVGFyZ2V0cykgOiBfd2FybihcIkdTQVAgdGFyZ2V0IFwiICsgdGFyZ2V0cyArIFwiIG5vdCBmb3VuZC4gaHR0cHM6Ly9ncmVlbnNvY2suY29tXCIsICFfY29uZmlnLm51bGxUYXJnZXRXYXJuKSB8fCBbXTtcbiAgICBfdGhpczMuX3B0TG9va3VwID0gW107IC8vUHJvcFR3ZWVuIGxvb2t1cC4gQW4gYXJyYXkgY29udGFpbmluZyBhbiBvYmplY3QgZm9yIGVhY2ggdGFyZ2V0LCBoYXZpbmcga2V5cyBmb3IgZWFjaCB0d2VlbmluZyBwcm9wZXJ0eVxuXG4gICAgX3RoaXMzLl9vdmVyd3JpdGUgPSBvdmVyd3JpdGU7XG5cbiAgICBpZiAoa2V5ZnJhbWVzIHx8IHN0YWdnZXIgfHwgX2lzRnVuY09yU3RyaW5nKGR1cmF0aW9uKSB8fCBfaXNGdW5jT3JTdHJpbmcoZGVsYXkpKSB7XG4gICAgICB2YXJzID0gX3RoaXMzLnZhcnM7XG4gICAgICB0bCA9IF90aGlzMy50aW1lbGluZSA9IG5ldyBUaW1lbGluZSh7XG4gICAgICAgIGRhdGE6IFwibmVzdGVkXCIsXG4gICAgICAgIGRlZmF1bHRzOiBkZWZhdWx0cyB8fCB7fSxcbiAgICAgICAgdGFyZ2V0czogcGFyZW50ICYmIHBhcmVudC5kYXRhID09PSBcIm5lc3RlZFwiID8gcGFyZW50LnZhcnMudGFyZ2V0cyA6IHBhcnNlZFRhcmdldHNcbiAgICAgIH0pOyAvLyB3ZSBuZWVkIHRvIHN0b3JlIHRoZSB0YXJnZXRzIGJlY2F1c2UgZm9yIHN0YWdnZXJzIGFuZCBrZXlmcmFtZXMsIHdlIGVuZCB1cCBjcmVhdGluZyBhbiBpbmRpdmlkdWFsIHR3ZWVuIGZvciBlYWNoIGJ1dCBmdW5jdGlvbi1iYXNlZCB2YWx1ZXMgbmVlZCB0byBrbm93IHRoZSBpbmRleCBhbmQgdGhlIHdob2xlIEFycmF5IG9mIHRhcmdldHMuXG5cbiAgICAgIHRsLmtpbGwoKTtcbiAgICAgIHRsLnBhcmVudCA9IHRsLl9kcCA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMzKTtcbiAgICAgIHRsLl9zdGFydCA9IDA7XG5cbiAgICAgIGlmIChzdGFnZ2VyIHx8IF9pc0Z1bmNPclN0cmluZyhkdXJhdGlvbikgfHwgX2lzRnVuY09yU3RyaW5nKGRlbGF5KSkge1xuICAgICAgICBsID0gcGFyc2VkVGFyZ2V0cy5sZW5ndGg7XG4gICAgICAgIHN0YWdnZXJGdW5jID0gc3RhZ2dlciAmJiBkaXN0cmlidXRlKHN0YWdnZXIpO1xuXG4gICAgICAgIGlmIChfaXNPYmplY3Qoc3RhZ2dlcikpIHtcbiAgICAgICAgICAvL3VzZXJzIGNhbiBwYXNzIGluIGNhbGxiYWNrcyBsaWtlIG9uU3RhcnQvb25Db21wbGV0ZSBpbiB0aGUgc3RhZ2dlciBvYmplY3QuIFRoZXNlIHNob3VsZCBmaXJlIHdpdGggZWFjaCBpbmRpdmlkdWFsIHR3ZWVuLlxuICAgICAgICAgIGZvciAocCBpbiBzdGFnZ2VyKSB7XG4gICAgICAgICAgICBpZiAofl9zdGFnZ2VyVHdlZW5Qcm9wcy5pbmRleE9mKHApKSB7XG4gICAgICAgICAgICAgIHN0YWdnZXJWYXJzVG9NZXJnZSB8fCAoc3RhZ2dlclZhcnNUb01lcmdlID0ge30pO1xuICAgICAgICAgICAgICBzdGFnZ2VyVmFyc1RvTWVyZ2VbcF0gPSBzdGFnZ2VyW3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICBjb3B5ID0gX2NvcHlFeGNsdWRpbmcodmFycywgX3N0YWdnZXJQcm9wc1RvU2tpcCk7XG4gICAgICAgICAgY29weS5zdGFnZ2VyID0gMDtcbiAgICAgICAgICB5b3lvRWFzZSAmJiAoY29weS55b3lvRWFzZSA9IHlveW9FYXNlKTtcbiAgICAgICAgICBzdGFnZ2VyVmFyc1RvTWVyZ2UgJiYgX21lcmdlKGNvcHksIHN0YWdnZXJWYXJzVG9NZXJnZSk7XG4gICAgICAgICAgY3VyVGFyZ2V0ID0gcGFyc2VkVGFyZ2V0c1tpXTsgLy9kb24ndCBqdXN0IGNvcHkgZHVyYXRpb24gb3IgZGVsYXkgYmVjYXVzZSBpZiB0aGV5J3JlIGEgc3RyaW5nIG9yIGZ1bmN0aW9uLCB3ZSdkIGVuZCB1cCBpbiBhbiBpbmZpbml0ZSBsb29wIGJlY2F1c2UgX2lzRnVuY09yU3RyaW5nKCkgd291bGQgZXZhbHVhdGUgYXMgdHJ1ZSBpbiB0aGUgY2hpbGQgdHdlZW5zLCBlbnRlcmluZyB0aGlzIGxvb3AsIGV0Yy4gU28gd2UgcGFyc2UgdGhlIHZhbHVlIHN0cmFpZ2h0IGZyb20gdmFycyBhbmQgZGVmYXVsdCB0byAwLlxuXG4gICAgICAgICAgY29weS5kdXJhdGlvbiA9ICtfcGFyc2VGdW5jT3JTdHJpbmcoZHVyYXRpb24sIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMzKSwgaSwgY3VyVGFyZ2V0LCBwYXJzZWRUYXJnZXRzKTtcbiAgICAgICAgICBjb3B5LmRlbGF5ID0gKCtfcGFyc2VGdW5jT3JTdHJpbmcoZGVsYXksIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMzKSwgaSwgY3VyVGFyZ2V0LCBwYXJzZWRUYXJnZXRzKSB8fCAwKSAtIF90aGlzMy5fZGVsYXk7XG5cbiAgICAgICAgICBpZiAoIXN0YWdnZXIgJiYgbCA9PT0gMSAmJiBjb3B5LmRlbGF5KSB7XG4gICAgICAgICAgICAvLyBpZiBzb21lb25lIGRvZXMgZGVsYXk6XCJyYW5kb20oMSwgNSlcIiwgcmVwZWF0Oi0xLCBmb3IgZXhhbXBsZSwgdGhlIGRlbGF5IHNob3VsZG4ndCBiZSBpbnNpZGUgdGhlIHJlcGVhdC5cbiAgICAgICAgICAgIF90aGlzMy5fZGVsYXkgPSBkZWxheSA9IGNvcHkuZGVsYXk7XG4gICAgICAgICAgICBfdGhpczMuX3N0YXJ0ICs9IGRlbGF5O1xuICAgICAgICAgICAgY29weS5kZWxheSA9IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGwudG8oY3VyVGFyZ2V0LCBjb3B5LCBzdGFnZ2VyRnVuYyA/IHN0YWdnZXJGdW5jKGksIGN1clRhcmdldCwgcGFyc2VkVGFyZ2V0cykgOiAwKTtcbiAgICAgICAgICB0bC5fZWFzZSA9IF9lYXNlTWFwLm5vbmU7XG4gICAgICAgIH1cblxuICAgICAgICB0bC5kdXJhdGlvbigpID8gZHVyYXRpb24gPSBkZWxheSA9IDAgOiBfdGhpczMudGltZWxpbmUgPSAwOyAvLyBpZiB0aGUgdGltZWxpbmUncyBkdXJhdGlvbiBpcyAwLCB3ZSBkb24ndCBuZWVkIGEgdGltZWxpbmUgaW50ZXJuYWxseSFcbiAgICAgIH0gZWxzZSBpZiAoa2V5ZnJhbWVzKSB7XG4gICAgICAgIF9pbmhlcml0RGVmYXVsdHMoX3NldERlZmF1bHRzKHRsLnZhcnMuZGVmYXVsdHMsIHtcbiAgICAgICAgICBlYXNlOiBcIm5vbmVcIlxuICAgICAgICB9KSk7XG5cbiAgICAgICAgdGwuX2Vhc2UgPSBfcGFyc2VFYXNlKGtleWZyYW1lcy5lYXNlIHx8IHZhcnMuZWFzZSB8fCBcIm5vbmVcIik7XG4gICAgICAgIHZhciB0aW1lID0gMCxcbiAgICAgICAgICAgIGEsXG4gICAgICAgICAgICBrZixcbiAgICAgICAgICAgIHY7XG5cbiAgICAgICAgaWYgKF9pc0FycmF5KGtleWZyYW1lcykpIHtcbiAgICAgICAgICBrZXlmcmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoZnJhbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0bC50byhwYXJzZWRUYXJnZXRzLCBmcmFtZSwgXCI+XCIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRsLmR1cmF0aW9uKCk7IC8vIHRvIGVuc3VyZSB0bC5fZHVyIGlzIGNhY2hlZCBiZWNhdXNlIHdlIHRhcCBpbnRvIGl0IGZvciBwZXJmb3JtYW5jZSBwdXJwb3NlcyBpbiB0aGUgcmVuZGVyKCkgbWV0aG9kLlxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvcHkgPSB7fTtcblxuICAgICAgICAgIGZvciAocCBpbiBrZXlmcmFtZXMpIHtcbiAgICAgICAgICAgIHAgPT09IFwiZWFzZVwiIHx8IHAgPT09IFwiZWFzZUVhY2hcIiB8fCBfcGFyc2VLZXlmcmFtZShwLCBrZXlmcmFtZXNbcF0sIGNvcHksIGtleWZyYW1lcy5lYXNlRWFjaCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9yIChwIGluIGNvcHkpIHtcbiAgICAgICAgICAgIGEgPSBjb3B5W3BdLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGEudCAtIGIudDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGltZSA9IDA7XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGtmID0gYVtpXTtcbiAgICAgICAgICAgICAgdiA9IHtcbiAgICAgICAgICAgICAgICBlYXNlOiBrZi5lLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAoa2YudCAtIChpID8gYVtpIC0gMV0udCA6IDApKSAvIDEwMCAqIGR1cmF0aW9uXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIHZbcF0gPSBrZi52O1xuICAgICAgICAgICAgICB0bC50byhwYXJzZWRUYXJnZXRzLCB2LCB0aW1lKTtcbiAgICAgICAgICAgICAgdGltZSArPSB2LmR1cmF0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRsLmR1cmF0aW9uKCkgPCBkdXJhdGlvbiAmJiB0bC50byh7fSwge1xuICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uIC0gdGwuZHVyYXRpb24oKVxuICAgICAgICAgIH0pOyAvLyBpbiBjYXNlIGtleWZyYW1lcyBkaWRuJ3QgZ28gdG8gMTAwJVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGR1cmF0aW9uIHx8IF90aGlzMy5kdXJhdGlvbihkdXJhdGlvbiA9IHRsLmR1cmF0aW9uKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBfdGhpczMudGltZWxpbmUgPSAwOyAvL3NwZWVkIG9wdGltaXphdGlvbiwgZmFzdGVyIGxvb2t1cHMgKG5vIGdvaW5nIHVwIHRoZSBwcm90b3R5cGUgY2hhaW4pXG4gICAgfVxuXG4gICAgaWYgKG92ZXJ3cml0ZSA9PT0gdHJ1ZSAmJiAhX3N1cHByZXNzT3ZlcndyaXRlcykge1xuICAgICAgX292ZXJ3cml0aW5nVHdlZW4gPSBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzMyk7XG5cbiAgICAgIF9nbG9iYWxUaW1lbGluZS5raWxsVHdlZW5zT2YocGFyc2VkVGFyZ2V0cyk7XG5cbiAgICAgIF9vdmVyd3JpdGluZ1R3ZWVuID0gMDtcbiAgICB9XG5cbiAgICBfYWRkVG9UaW1lbGluZShwYXJlbnQsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMzKSwgcG9zaXRpb24pO1xuXG4gICAgdmFycy5yZXZlcnNlZCAmJiBfdGhpczMucmV2ZXJzZSgpO1xuICAgIHZhcnMucGF1c2VkICYmIF90aGlzMy5wYXVzZWQodHJ1ZSk7XG5cbiAgICBpZiAoaW1tZWRpYXRlUmVuZGVyIHx8ICFkdXJhdGlvbiAmJiAha2V5ZnJhbWVzICYmIF90aGlzMy5fc3RhcnQgPT09IF9yb3VuZFByZWNpc2UocGFyZW50Ll90aW1lKSAmJiBfaXNOb3RGYWxzZShpbW1lZGlhdGVSZW5kZXIpICYmIF9oYXNOb1BhdXNlZEFuY2VzdG9ycyhfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzMykpICYmIHBhcmVudC5kYXRhICE9PSBcIm5lc3RlZFwiKSB7XG4gICAgICBfdGhpczMuX3RUaW1lID0gLV90aW55TnVtOyAvL2ZvcmNlcyBhIHJlbmRlciB3aXRob3V0IGhhdmluZyB0byBzZXQgdGhlIHJlbmRlcigpIFwiZm9yY2VcIiBwYXJhbWV0ZXIgdG8gdHJ1ZSBiZWNhdXNlIHdlIHdhbnQgdG8gYWxsb3cgbGF6eWluZyBieSBkZWZhdWx0ICh1c2luZyB0aGUgXCJmb3JjZVwiIHBhcmFtZXRlciBhbHdheXMgZm9yY2VzIGFuIGltbWVkaWF0ZSBmdWxsIHJlbmRlcilcblxuICAgICAgX3RoaXMzLnJlbmRlcihNYXRoLm1heCgwLCAtZGVsYXkpIHx8IDApOyAvL2luIGNhc2UgZGVsYXkgaXMgbmVnYXRpdmVcblxuICAgIH1cblxuICAgIHNjcm9sbFRyaWdnZXIgJiYgX3Njcm9sbFRyaWdnZXIoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpczMpLCBzY3JvbGxUcmlnZ2VyKTtcbiAgICByZXR1cm4gX3RoaXMzO1xuICB9XG5cbiAgdmFyIF9wcm90bzMgPSBUd2Vlbi5wcm90b3R5cGU7XG5cbiAgX3Byb3RvMy5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIodG90YWxUaW1lLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpIHtcbiAgICB2YXIgcHJldlRpbWUgPSB0aGlzLl90aW1lLFxuICAgICAgICB0RHVyID0gdGhpcy5fdER1cixcbiAgICAgICAgZHVyID0gdGhpcy5fZHVyLFxuICAgICAgICBpc05lZ2F0aXZlID0gdG90YWxUaW1lIDwgMCxcbiAgICAgICAgdFRpbWUgPSB0b3RhbFRpbWUgPiB0RHVyIC0gX3RpbnlOdW0gJiYgIWlzTmVnYXRpdmUgPyB0RHVyIDogdG90YWxUaW1lIDwgX3RpbnlOdW0gPyAwIDogdG90YWxUaW1lLFxuICAgICAgICB0aW1lLFxuICAgICAgICBwdCxcbiAgICAgICAgaXRlcmF0aW9uLFxuICAgICAgICBjeWNsZUR1cmF0aW9uLFxuICAgICAgICBwcmV2SXRlcmF0aW9uLFxuICAgICAgICBpc1lveW8sXG4gICAgICAgIHJhdGlvLFxuICAgICAgICB0aW1lbGluZSxcbiAgICAgICAgeW95b0Vhc2U7XG5cbiAgICBpZiAoIWR1cikge1xuICAgICAgX3JlbmRlclplcm9EdXJhdGlvblR3ZWVuKHRoaXMsIHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcbiAgICB9IGVsc2UgaWYgKHRUaW1lICE9PSB0aGlzLl90VGltZSB8fCAhdG90YWxUaW1lIHx8IGZvcmNlIHx8ICF0aGlzLl9pbml0dGVkICYmIHRoaXMuX3RUaW1lIHx8IHRoaXMuX3N0YXJ0QXQgJiYgdGhpcy5felRpbWUgPCAwICE9PSBpc05lZ2F0aXZlKSB7XG4gICAgICAvL3RoaXMgc2Vuc2VzIGlmIHdlJ3JlIGNyb3NzaW5nIG92ZXIgdGhlIHN0YXJ0IHRpbWUsIGluIHdoaWNoIGNhc2Ugd2UgbXVzdCByZWNvcmQgX3pUaW1lIGFuZCBmb3JjZSB0aGUgcmVuZGVyLCBidXQgd2UgZG8gaXQgaW4gdGhpcyBsZW5ndGh5IGNvbmRpdGlvbmFsIHdheSBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucyAodXN1YWxseSB3ZSBjYW4gc2tpcCB0aGUgY2FsY3VsYXRpb25zKTogdGhpcy5faW5pdHRlZCAmJiAodGhpcy5felRpbWUgPCAwKSAhPT0gKHRvdGFsVGltZSA8IDApXG4gICAgICB0aW1lID0gdFRpbWU7XG4gICAgICB0aW1lbGluZSA9IHRoaXMudGltZWxpbmU7XG5cbiAgICAgIGlmICh0aGlzLl9yZXBlYXQpIHtcbiAgICAgICAgLy9hZGp1c3QgdGhlIHRpbWUgZm9yIHJlcGVhdHMgYW5kIHlveW9zXG4gICAgICAgIGN5Y2xlRHVyYXRpb24gPSBkdXIgKyB0aGlzLl9yRGVsYXk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3JlcGVhdCA8IC0xICYmIGlzTmVnYXRpdmUpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy50b3RhbFRpbWUoY3ljbGVEdXJhdGlvbiAqIDEwMCArIHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRpbWUgPSBfcm91bmRQcmVjaXNlKHRUaW1lICUgY3ljbGVEdXJhdGlvbik7IC8vcm91bmQgdG8gYXZvaWQgZmxvYXRpbmcgcG9pbnQgZXJyb3JzLiAoNCAlIDAuOCBzaG91bGQgYmUgMCBidXQgc29tZSBicm93c2VycyByZXBvcnQgaXQgYXMgMC43OTk5OTk5OSEpXG5cbiAgICAgICAgaWYgKHRUaW1lID09PSB0RHVyKSB7XG4gICAgICAgICAgLy8gdGhlIHREdXIgPT09IHRUaW1lIGlzIGZvciBlZGdlIGNhc2VzIHdoZXJlIHRoZXJlJ3MgYSBsZW5ndGh5IGRlY2ltYWwgb24gdGhlIGR1cmF0aW9uIGFuZCBpdCBtYXkgcmVhY2ggdGhlIHZlcnkgZW5kIGJ1dCB0aGUgdGltZSBpcyByZW5kZXJlZCBhcyBub3QtcXVpdGUtdGhlcmUgKHJlbWVtYmVyLCB0RHVyIGlzIHJvdW5kZWQgdG8gNCBkZWNpbWFscyB3aGVyZWFzIGR1ciBpc24ndClcbiAgICAgICAgICBpdGVyYXRpb24gPSB0aGlzLl9yZXBlYXQ7XG4gICAgICAgICAgdGltZSA9IGR1cjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVyYXRpb24gPSB+fih0VGltZSAvIGN5Y2xlRHVyYXRpb24pO1xuXG4gICAgICAgICAgaWYgKGl0ZXJhdGlvbiAmJiBpdGVyYXRpb24gPT09IHRUaW1lIC8gY3ljbGVEdXJhdGlvbikge1xuICAgICAgICAgICAgdGltZSA9IGR1cjtcbiAgICAgICAgICAgIGl0ZXJhdGlvbi0tO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRpbWUgPiBkdXIgJiYgKHRpbWUgPSBkdXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaXNZb3lvID0gdGhpcy5feW95byAmJiBpdGVyYXRpb24gJiAxO1xuXG4gICAgICAgIGlmIChpc1lveW8pIHtcbiAgICAgICAgICB5b3lvRWFzZSA9IHRoaXMuX3lFYXNlO1xuICAgICAgICAgIHRpbWUgPSBkdXIgLSB0aW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJldkl0ZXJhdGlvbiA9IF9hbmltYXRpb25DeWNsZSh0aGlzLl90VGltZSwgY3ljbGVEdXJhdGlvbik7XG5cbiAgICAgICAgaWYgKHRpbWUgPT09IHByZXZUaW1lICYmICFmb3JjZSAmJiB0aGlzLl9pbml0dGVkKSB7XG4gICAgICAgICAgLy9jb3VsZCBiZSBkdXJpbmcgdGhlIHJlcGVhdERlbGF5IHBhcnQuIE5vIG5lZWQgdG8gcmVuZGVyIGFuZCBmaXJlIGNhbGxiYWNrcy5cbiAgICAgICAgICB0aGlzLl90VGltZSA9IHRUaW1lO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZXJhdGlvbiAhPT0gcHJldkl0ZXJhdGlvbikge1xuICAgICAgICAgIHRpbWVsaW5lICYmIHRoaXMuX3lFYXNlICYmIF9wcm9wYWdhdGVZb3lvRWFzZSh0aW1lbGluZSwgaXNZb3lvKTsgLy9yZXBlYXRSZWZyZXNoIGZ1bmN0aW9uYWxpdHlcblxuICAgICAgICAgIGlmICh0aGlzLnZhcnMucmVwZWF0UmVmcmVzaCAmJiAhaXNZb3lvICYmICF0aGlzLl9sb2NrKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2NrID0gZm9yY2UgPSAxOyAvL2ZvcmNlLCBvdGhlcndpc2UgaWYgbGF6eSBpcyB0cnVlLCB0aGUgX2F0dGVtcHRJbml0VHdlZW4oKSB3aWxsIHJldHVybiBhbmQgd2UnbGwganVtcCBvdXQgYW5kIGdldCBjYXVnaHQgYm91bmNpbmcgb24gZWFjaCB0aWNrLlxuXG4gICAgICAgICAgICB0aGlzLnJlbmRlcihfcm91bmRQcmVjaXNlKGN5Y2xlRHVyYXRpb24gKiBpdGVyYXRpb24pLCB0cnVlKS5pbnZhbGlkYXRlKCkuX2xvY2sgPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuX2luaXR0ZWQpIHtcbiAgICAgICAgaWYgKF9hdHRlbXB0SW5pdFR3ZWVuKHRoaXMsIGlzTmVnYXRpdmUgPyB0b3RhbFRpbWUgOiB0aW1lLCBmb3JjZSwgc3VwcHJlc3NFdmVudHMsIHRUaW1lKSkge1xuICAgICAgICAgIHRoaXMuX3RUaW1lID0gMDsgLy8gaW4gY29uc3RydWN0b3IgaWYgaW1tZWRpYXRlUmVuZGVyIGlzIHRydWUsIHdlIHNldCBfdFRpbWUgdG8gLV90aW55TnVtIHRvIGhhdmUgdGhlIHBsYXloZWFkIGNyb3NzIHRoZSBzdGFydGluZyBwb2ludCBidXQgd2UgY2FuJ3QgbGVhdmUgX3RUaW1lIGFzIGEgbmVnYXRpdmUgbnVtYmVyLlxuXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJldlRpbWUgIT09IHRoaXMuX3RpbWUpIHtcbiAgICAgICAgICAvLyByYXJlIGVkZ2UgY2FzZSAtIGR1cmluZyBpbml0aWFsaXphdGlvbiwgYW4gb25VcGRhdGUgaW4gdGhlIF9zdGFydEF0ICguZnJvbVRvKCkpIG1pZ2h0IGZvcmNlIHRoaXMgdHdlZW4gdG8gcmVuZGVyIGF0IGEgZGlmZmVyZW50IHNwb3QgaW4gd2hpY2ggY2FzZSB3ZSBzaG91bGQgZGl0Y2ggdGhpcyByZW5kZXIoKSBjYWxsIHNvIHRoYXQgaXQgZG9lc24ndCByZXZlcnQgdGhlIHZhbHVlcy5cbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkdXIgIT09IHRoaXMuX2R1cikge1xuICAgICAgICAgIC8vIHdoaWxlIGluaXR0aW5nLCBhIHBsdWdpbiBsaWtlIEluZXJ0aWFQbHVnaW4gbWlnaHQgYWx0ZXIgdGhlIGR1cmF0aW9uLCBzbyByZXJ1biBmcm9tIHRoZSBzdGFydCB0byBlbnN1cmUgZXZlcnl0aGluZyByZW5kZXJzIGFzIGl0IHNob3VsZC5cbiAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXIodG90YWxUaW1lLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3RUaW1lID0gdFRpbWU7XG4gICAgICB0aGlzLl90aW1lID0gdGltZTtcblxuICAgICAgaWYgKCF0aGlzLl9hY3QgJiYgdGhpcy5fdHMpIHtcbiAgICAgICAgdGhpcy5fYWN0ID0gMTsgLy9hcyBsb25nIGFzIGl0J3Mgbm90IHBhdXNlZCwgZm9yY2UgaXQgdG8gYmUgYWN0aXZlIHNvIHRoYXQgaWYgdGhlIHVzZXIgcmVuZGVycyBpbmRlcGVuZGVudCBvZiB0aGUgcGFyZW50IHRpbWVsaW5lLCBpdCdsbCBiZSBmb3JjZWQgdG8gcmUtcmVuZGVyIG9uIHRoZSBuZXh0IHRpY2suXG5cbiAgICAgICAgdGhpcy5fbGF6eSA9IDA7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmF0aW8gPSByYXRpbyA9ICh5b3lvRWFzZSB8fCB0aGlzLl9lYXNlKSh0aW1lIC8gZHVyKTtcblxuICAgICAgaWYgKHRoaXMuX2Zyb20pIHtcbiAgICAgICAgdGhpcy5yYXRpbyA9IHJhdGlvID0gMSAtIHJhdGlvO1xuICAgICAgfVxuXG4gICAgICBpZiAodGltZSAmJiAhcHJldlRpbWUgJiYgIXN1cHByZXNzRXZlbnRzICYmICFpdGVyYXRpb24pIHtcbiAgICAgICAgX2NhbGxiYWNrKHRoaXMsIFwib25TdGFydFwiKTtcblxuICAgICAgICBpZiAodGhpcy5fdFRpbWUgIT09IHRUaW1lKSB7XG4gICAgICAgICAgLy8gaW4gY2FzZSB0aGUgb25TdGFydCB0cmlnZ2VyZWQgYSByZW5kZXIgYXQgYSBkaWZmZXJlbnQgc3BvdCwgZWplY3QuIExpa2UgaWYgc29tZW9uZSBkaWQgYW5pbWF0aW9uLnBhdXNlKDAuNSkgb3Igc29tZXRoaW5nIGluc2lkZSB0aGUgb25TdGFydC5cbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBwdCA9IHRoaXMuX3B0O1xuXG4gICAgICB3aGlsZSAocHQpIHtcbiAgICAgICAgcHQucihyYXRpbywgcHQuZCk7XG4gICAgICAgIHB0ID0gcHQuX25leHQ7XG4gICAgICB9XG5cbiAgICAgIHRpbWVsaW5lICYmIHRpbWVsaW5lLnJlbmRlcih0b3RhbFRpbWUgPCAwID8gdG90YWxUaW1lIDogIXRpbWUgJiYgaXNZb3lvID8gLV90aW55TnVtIDogdGltZWxpbmUuX2R1ciAqIHRpbWVsaW5lLl9lYXNlKHRpbWUgLyB0aGlzLl9kdXIpLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpIHx8IHRoaXMuX3N0YXJ0QXQgJiYgKHRoaXMuX3pUaW1lID0gdG90YWxUaW1lKTtcblxuICAgICAgaWYgKHRoaXMuX29uVXBkYXRlICYmICFzdXBwcmVzc0V2ZW50cykge1xuICAgICAgICBpc05lZ2F0aXZlICYmIF9yZXdpbmRTdGFydEF0KHRoaXMsIHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTsgLy9ub3RlOiBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucywgd2UgdHVjayB0aGlzIGNvbmRpdGlvbmFsIGxvZ2ljIGluc2lkZSBsZXNzIHRyYXZlbGVkIGFyZWFzIChtb3N0IHR3ZWVucyBkb24ndCBoYXZlIGFuIG9uVXBkYXRlKS4gV2UnZCBqdXN0IGhhdmUgaXQgYXQgdGhlIGVuZCBiZWZvcmUgdGhlIG9uQ29tcGxldGUsIGJ1dCB0aGUgdmFsdWVzIHNob3VsZCBiZSB1cGRhdGVkIGJlZm9yZSBhbnkgb25VcGRhdGUgaXMgY2FsbGVkLCBzbyB3ZSBBTFNPIHB1dCBpdCBoZXJlIGFuZCB0aGVuIGlmIGl0J3Mgbm90IGNhbGxlZCwgd2UgZG8gc28gbGF0ZXIgbmVhciB0aGUgb25Db21wbGV0ZS5cblxuICAgICAgICBfY2FsbGJhY2sodGhpcywgXCJvblVwZGF0ZVwiKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fcmVwZWF0ICYmIGl0ZXJhdGlvbiAhPT0gcHJldkl0ZXJhdGlvbiAmJiB0aGlzLnZhcnMub25SZXBlYXQgJiYgIXN1cHByZXNzRXZlbnRzICYmIHRoaXMucGFyZW50ICYmIF9jYWxsYmFjayh0aGlzLCBcIm9uUmVwZWF0XCIpO1xuXG4gICAgICBpZiAoKHRUaW1lID09PSB0aGlzLl90RHVyIHx8ICF0VGltZSkgJiYgdGhpcy5fdFRpbWUgPT09IHRUaW1lKSB7XG4gICAgICAgIGlzTmVnYXRpdmUgJiYgIXRoaXMuX29uVXBkYXRlICYmIF9yZXdpbmRTdGFydEF0KHRoaXMsIHRvdGFsVGltZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICh0b3RhbFRpbWUgfHwgIWR1cikgJiYgKHRUaW1lID09PSB0aGlzLl90RHVyICYmIHRoaXMuX3RzID4gMCB8fCAhdFRpbWUgJiYgdGhpcy5fdHMgPCAwKSAmJiBfcmVtb3ZlRnJvbVBhcmVudCh0aGlzLCAxKTsgLy8gZG9uJ3QgcmVtb3ZlIGlmIHdlJ3JlIHJlbmRlcmluZyBhdCBleGFjdGx5IGEgdGltZSBvZiAwLCBhcyB0aGVyZSBjb3VsZCBiZSBhdXRvUmV2ZXJ0IHZhbHVlcyB0aGF0IHNob3VsZCBnZXQgc2V0IG9uIHRoZSBuZXh0IHRpY2sgKGlmIHRoZSBwbGF5aGVhZCBnb2VzIGJhY2t3YXJkIGJleW9uZCB0aGUgc3RhcnRUaW1lLCBuZWdhdGl2ZSB0b3RhbFRpbWUpLiBEb24ndCByZW1vdmUgaWYgdGhlIHRpbWVsaW5lIGlzIHJldmVyc2VkIGFuZCB0aGUgcGxheWhlYWQgaXNuJ3QgYXQgMCwgb3RoZXJ3aXNlIHRsLnByb2dyZXNzKDEpLnJldmVyc2UoKSB3b24ndCB3b3JrLiBPbmx5IHJlbW92ZSBpZiB0aGUgcGxheWhlYWQgaXMgYXQgdGhlIGVuZCBhbmQgdGltZVNjYWxlIGlzIHBvc2l0aXZlLCBvciBpZiB0aGUgcGxheWhlYWQgaXMgYXQgMCBhbmQgdGhlIHRpbWVTY2FsZSBpcyBuZWdhdGl2ZS5cblxuICAgICAgICBpZiAoIXN1cHByZXNzRXZlbnRzICYmICEoaXNOZWdhdGl2ZSAmJiAhcHJldlRpbWUpICYmICh0VGltZSB8fCBwcmV2VGltZSB8fCBpc1lveW8pKSB7XG4gICAgICAgICAgLy8gaWYgcHJldlRpbWUgYW5kIHRUaW1lIGFyZSB6ZXJvLCB3ZSBzaG91bGRuJ3QgZmlyZSB0aGUgb25SZXZlcnNlQ29tcGxldGUuIFRoaXMgY291bGQgaGFwcGVuIGlmIHlvdSBnc2FwLnRvKC4uLiB7cGF1c2VkOnRydWV9KS5wbGF5KCk7XG4gICAgICAgICAgX2NhbGxiYWNrKHRoaXMsIHRUaW1lID09PSB0RHVyID8gXCJvbkNvbXBsZXRlXCIgOiBcIm9uUmV2ZXJzZUNvbXBsZXRlXCIsIHRydWUpO1xuXG4gICAgICAgICAgdGhpcy5fcHJvbSAmJiAhKHRUaW1lIDwgdER1ciAmJiB0aGlzLnRpbWVTY2FsZSgpID4gMCkgJiYgdGhpcy5fcHJvbSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvMy50YXJnZXRzID0gZnVuY3Rpb24gdGFyZ2V0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fdGFyZ2V0cztcbiAgfTtcblxuICBfcHJvdG8zLmludmFsaWRhdGUgPSBmdW5jdGlvbiBpbnZhbGlkYXRlKHNvZnQpIHtcbiAgICAvLyBcInNvZnRcIiBnaXZlcyB1cyBhIHdheSB0byBjbGVhciBvdXQgZXZlcnl0aGluZyBFWENFUFQgdGhlIHJlY29yZGVkIHByZS1cImZyb21cIiBwb3J0aW9uIG9mIGZyb20oKSB0d2VlbnMuIE90aGVyd2lzZSwgZm9yIGV4YW1wbGUsIGlmIHlvdSB0d2Vlbi5wcm9ncmVzcygxKS5yZW5kZXIoMCwgdHJ1ZSB0cnVlKS5pbnZhbGlkYXRlKCksIHRoZSBcImZyb21cIiB2YWx1ZXMgd291bGQgcGVyc2lzdCBhbmQgdGhlbiBvbiB0aGUgbmV4dCByZW5kZXIsIHRoZSBmcm9tKCkgdHdlZW5zIHdvdWxkIGluaXRpYWxpemUgYW5kIHRoZSBjdXJyZW50IHZhbHVlIHdvdWxkIG1hdGNoIHRoZSBcImZyb21cIiB2YWx1ZXMsIHRodXMgYW5pbWF0ZSBmcm9tIHRoZSBzYW1lIHZhbHVlIHRvIHRoZSBzYW1lIHZhbHVlIChubyBhbmltYXRpb24pLiBXZSB0YXAgaW50byB0aGlzIGluIFNjcm9sbFRyaWdnZXIncyByZWZyZXNoKCkgd2hlcmUgd2UgbXVzdCBwdXNoIGEgdHdlZW4gdG8gY29tcGxldGlvbiBhbmQgdGhlbiBiYWNrIGFnYWluIGJ1dCBob25vciBpdHMgaW5pdCBzdGF0ZSBpbiBjYXNlIHRoZSB0d2VlbiBpcyBkZXBlbmRlbnQgb24gYW5vdGhlciB0d2VlbiBmdXJ0aGVyIHVwIG9uIHRoZSBwYWdlLlxuICAgICghc29mdCB8fCAhdGhpcy52YXJzLnJ1bkJhY2t3YXJkcykgJiYgKHRoaXMuX3N0YXJ0QXQgPSAwKTtcbiAgICB0aGlzLl9wdCA9IHRoaXMuX29wID0gdGhpcy5fb25VcGRhdGUgPSB0aGlzLl9sYXp5ID0gdGhpcy5yYXRpbyA9IDA7XG4gICAgdGhpcy5fcHRMb29rdXAgPSBbXTtcbiAgICB0aGlzLnRpbWVsaW5lICYmIHRoaXMudGltZWxpbmUuaW52YWxpZGF0ZShzb2Z0KTtcbiAgICByZXR1cm4gX0FuaW1hdGlvbjIucHJvdG90eXBlLmludmFsaWRhdGUuY2FsbCh0aGlzLCBzb2Z0KTtcbiAgfTtcblxuICBfcHJvdG8zLnJlc2V0VG8gPSBmdW5jdGlvbiByZXNldFRvKHByb3BlcnR5LCB2YWx1ZSwgc3RhcnQsIHN0YXJ0SXNSZWxhdGl2ZSkge1xuICAgIF90aWNrZXJBY3RpdmUgfHwgX3RpY2tlci53YWtlKCk7XG4gICAgdGhpcy5fdHMgfHwgdGhpcy5wbGF5KCk7XG4gICAgdmFyIHRpbWUgPSBNYXRoLm1pbih0aGlzLl9kdXIsICh0aGlzLl9kcC5fdGltZSAtIHRoaXMuX3N0YXJ0KSAqIHRoaXMuX3RzKSxcbiAgICAgICAgcmF0aW87XG4gICAgdGhpcy5faW5pdHRlZCB8fCBfaW5pdFR3ZWVuKHRoaXMsIHRpbWUpO1xuICAgIHJhdGlvID0gdGhpcy5fZWFzZSh0aW1lIC8gdGhpcy5fZHVyKTsgLy8gZG9uJ3QganVzdCBnZXQgdHdlZW4ucmF0aW8gYmVjYXVzZSBpdCBtYXkgbm90IGhhdmUgcmVuZGVyZWQgeWV0LlxuICAgIC8vIHBvc3NpYmxlIGZ1dHVyZSBhZGRpdGlvbiB0byBhbGxvdyBhbiBvYmplY3Qgd2l0aCBtdWx0aXBsZSB2YWx1ZXMgdG8gdXBkYXRlLCBsaWtlIHR3ZWVuLnJlc2V0VG8oe3g6IDEwMCwgeTogMjAwfSk7IEF0IHRoaXMgcG9pbnQsIGl0IGRvZXNuJ3Qgc2VlbSB3b3J0aCB0aGUgYWRkZWQga2IgZ2l2ZW4gdGhlIGZhY3QgdGhhdCBtb3N0IHVzZXJzIHdpbGwgbGlrZWx5IG9wdCBmb3IgdGhlIGNvbnZlbmllbnQgZ3NhcC5xdWlja1RvKCkgd2F5IG9mIGludGVyYWN0aW5nIHdpdGggdGhpcyBtZXRob2QuXG4gICAgLy8gaWYgKF9pc09iamVjdChwcm9wZXJ0eSkpIHsgLy8gcGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uXG4gICAgLy8gXHRmb3IgKHAgaW4gcHJvcGVydHkpIHtcbiAgICAvLyBcdFx0aWYgKF91cGRhdGVQcm9wVHdlZW5zKHRoaXMsIHAsIHByb3BlcnR5W3BdLCB2YWx1ZSA/IHZhbHVlW3BdIDogbnVsbCwgc3RhcnQsIHJhdGlvLCB0aW1lKSkge1xuICAgIC8vIFx0XHRcdHJldHVybiB0aGlzLnJlc2V0VG8ocHJvcGVydHksIHZhbHVlLCBzdGFydCwgc3RhcnRJc1JlbGF0aXZlKTsgLy8gaWYgYSBQcm9wVHdlZW4gd2Fzbid0IGZvdW5kIGZvciB0aGUgcHJvcGVydHksIGl0J2xsIGdldCBmb3JjZWQgd2l0aCBhIHJlLWluaXRpYWxpemF0aW9uIHNvIHdlIG5lZWQgdG8ganVtcCBvdXQgYW5kIHN0YXJ0IG92ZXIgYWdhaW4uXG4gICAgLy8gXHRcdH1cbiAgICAvLyBcdH1cbiAgICAvLyB9IGVsc2Uge1xuXG4gICAgaWYgKF91cGRhdGVQcm9wVHdlZW5zKHRoaXMsIHByb3BlcnR5LCB2YWx1ZSwgc3RhcnQsIHN0YXJ0SXNSZWxhdGl2ZSwgcmF0aW8sIHRpbWUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXNldFRvKHByb3BlcnR5LCB2YWx1ZSwgc3RhcnQsIHN0YXJ0SXNSZWxhdGl2ZSk7IC8vIGlmIGEgUHJvcFR3ZWVuIHdhc24ndCBmb3VuZCBmb3IgdGhlIHByb3BlcnR5LCBpdCdsbCBnZXQgZm9yY2VkIHdpdGggYSByZS1pbml0aWFsaXphdGlvbiBzbyB3ZSBuZWVkIHRvIGp1bXAgb3V0IGFuZCBzdGFydCBvdmVyIGFnYWluLlxuICAgIH0gLy99XG5cblxuICAgIF9hbGlnblBsYXloZWFkKHRoaXMsIDApO1xuXG4gICAgdGhpcy5wYXJlbnQgfHwgX2FkZExpbmtlZExpc3RJdGVtKHRoaXMuX2RwLCB0aGlzLCBcIl9maXJzdFwiLCBcIl9sYXN0XCIsIHRoaXMuX2RwLl9zb3J0ID8gXCJfc3RhcnRcIiA6IDApO1xuICAgIHJldHVybiB0aGlzLnJlbmRlcigwKTtcbiAgfTtcblxuICBfcHJvdG8zLmtpbGwgPSBmdW5jdGlvbiBraWxsKHRhcmdldHMsIHZhcnMpIHtcbiAgICBpZiAodmFycyA9PT0gdm9pZCAwKSB7XG4gICAgICB2YXJzID0gXCJhbGxcIjtcbiAgICB9XG5cbiAgICBpZiAoIXRhcmdldHMgJiYgKCF2YXJzIHx8IHZhcnMgPT09IFwiYWxsXCIpKSB7XG4gICAgICB0aGlzLl9sYXp5ID0gdGhpcy5fcHQgPSAwO1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50ID8gX2ludGVycnVwdCh0aGlzKSA6IHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudGltZWxpbmUpIHtcbiAgICAgIHZhciB0RHVyID0gdGhpcy50aW1lbGluZS50b3RhbER1cmF0aW9uKCk7XG4gICAgICB0aGlzLnRpbWVsaW5lLmtpbGxUd2VlbnNPZih0YXJnZXRzLCB2YXJzLCBfb3ZlcndyaXRpbmdUd2VlbiAmJiBfb3ZlcndyaXRpbmdUd2Vlbi52YXJzLm92ZXJ3cml0ZSAhPT0gdHJ1ZSkuX2ZpcnN0IHx8IF9pbnRlcnJ1cHQodGhpcyk7IC8vIGlmIG5vdGhpbmcgaXMgbGVmdCB0d2VlbmluZywgaW50ZXJydXB0LlxuXG4gICAgICB0aGlzLnBhcmVudCAmJiB0RHVyICE9PSB0aGlzLnRpbWVsaW5lLnRvdGFsRHVyYXRpb24oKSAmJiBfc2V0RHVyYXRpb24odGhpcywgdGhpcy5fZHVyICogdGhpcy50aW1lbGluZS5fdER1ciAvIHREdXIsIDAsIDEpOyAvLyBpZiBhIG5lc3RlZCB0d2VlbiBpcyBraWxsZWQgdGhhdCBjaGFuZ2VzIHRoZSBkdXJhdGlvbiwgaXQgc2hvdWxkIGFmZmVjdCB0aGlzIHR3ZWVuJ3MgZHVyYXRpb24uIFdlIG11c3QgdXNlIHRoZSByYXRpbywgdGhvdWdoLCBiZWNhdXNlIHNvbWV0aW1lcyB0aGUgaW50ZXJuYWwgdGltZWxpbmUgaXMgc3RyZXRjaGVkIGxpa2UgZm9yIGtleWZyYW1lcyB3aGVyZSB0aGV5IGRvbid0IGFsbCBhZGQgdXAgdG8gd2hhdGV2ZXIgdGhlIHBhcmVudCB0d2VlbidzIGR1cmF0aW9uIHdhcyBzZXQgdG8uXG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHZhciBwYXJzZWRUYXJnZXRzID0gdGhpcy5fdGFyZ2V0cyxcbiAgICAgICAga2lsbGluZ1RhcmdldHMgPSB0YXJnZXRzID8gdG9BcnJheSh0YXJnZXRzKSA6IHBhcnNlZFRhcmdldHMsXG4gICAgICAgIHByb3BUd2Vlbkxvb2t1cCA9IHRoaXMuX3B0TG9va3VwLFxuICAgICAgICBmaXJzdFBUID0gdGhpcy5fcHQsXG4gICAgICAgIG92ZXJ3cml0dGVuUHJvcHMsXG4gICAgICAgIGN1ckxvb2t1cCxcbiAgICAgICAgY3VyT3ZlcndyaXRlUHJvcHMsXG4gICAgICAgIHByb3BzLFxuICAgICAgICBwLFxuICAgICAgICBwdCxcbiAgICAgICAgaTtcblxuICAgIGlmICgoIXZhcnMgfHwgdmFycyA9PT0gXCJhbGxcIikgJiYgX2FycmF5c01hdGNoKHBhcnNlZFRhcmdldHMsIGtpbGxpbmdUYXJnZXRzKSkge1xuICAgICAgdmFycyA9PT0gXCJhbGxcIiAmJiAodGhpcy5fcHQgPSAwKTtcbiAgICAgIHJldHVybiBfaW50ZXJydXB0KHRoaXMpO1xuICAgIH1cblxuICAgIG92ZXJ3cml0dGVuUHJvcHMgPSB0aGlzLl9vcCA9IHRoaXMuX29wIHx8IFtdO1xuXG4gICAgaWYgKHZhcnMgIT09IFwiYWxsXCIpIHtcbiAgICAgIC8vc28gcGVvcGxlIGNhbiBwYXNzIGluIGEgY29tbWEtZGVsaW1pdGVkIGxpc3Qgb2YgcHJvcGVydHkgbmFtZXNcbiAgICAgIGlmIChfaXNTdHJpbmcodmFycykpIHtcbiAgICAgICAgcCA9IHt9O1xuXG4gICAgICAgIF9mb3JFYWNoTmFtZSh2YXJzLCBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgIHJldHVybiBwW25hbWVdID0gMTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFycyA9IHA7XG4gICAgICB9XG5cbiAgICAgIHZhcnMgPSBfYWRkQWxpYXNlc1RvVmFycyhwYXJzZWRUYXJnZXRzLCB2YXJzKTtcbiAgICB9XG5cbiAgICBpID0gcGFyc2VkVGFyZ2V0cy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZiAofmtpbGxpbmdUYXJnZXRzLmluZGV4T2YocGFyc2VkVGFyZ2V0c1tpXSkpIHtcbiAgICAgICAgY3VyTG9va3VwID0gcHJvcFR3ZWVuTG9va3VwW2ldO1xuXG4gICAgICAgIGlmICh2YXJzID09PSBcImFsbFwiKSB7XG4gICAgICAgICAgb3ZlcndyaXR0ZW5Qcm9wc1tpXSA9IHZhcnM7XG4gICAgICAgICAgcHJvcHMgPSBjdXJMb29rdXA7XG4gICAgICAgICAgY3VyT3ZlcndyaXRlUHJvcHMgPSB7fTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjdXJPdmVyd3JpdGVQcm9wcyA9IG92ZXJ3cml0dGVuUHJvcHNbaV0gPSBvdmVyd3JpdHRlblByb3BzW2ldIHx8IHt9O1xuICAgICAgICAgIHByb3BzID0gdmFycztcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAocCBpbiBwcm9wcykge1xuICAgICAgICAgIHB0ID0gY3VyTG9va3VwICYmIGN1ckxvb2t1cFtwXTtcblxuICAgICAgICAgIGlmIChwdCkge1xuICAgICAgICAgICAgaWYgKCEoXCJraWxsXCIgaW4gcHQuZCkgfHwgcHQuZC5raWxsKHApID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIF9yZW1vdmVMaW5rZWRMaXN0SXRlbSh0aGlzLCBwdCwgXCJfcHRcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlbGV0ZSBjdXJMb29rdXBbcF07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGN1ck92ZXJ3cml0ZVByb3BzICE9PSBcImFsbFwiKSB7XG4gICAgICAgICAgICBjdXJPdmVyd3JpdGVQcm9wc1twXSA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5faW5pdHRlZCAmJiAhdGhpcy5fcHQgJiYgZmlyc3RQVCAmJiBfaW50ZXJydXB0KHRoaXMpOyAvL2lmIGFsbCB0d2VlbmluZyBwcm9wZXJ0aWVzIGFyZSBraWxsZWQsIGtpbGwgdGhlIHR3ZWVuLiBXaXRob3V0IHRoaXMgbGluZSwgaWYgdGhlcmUncyBhIHR3ZWVuIHdpdGggbXVsdGlwbGUgdGFyZ2V0cyBhbmQgdGhlbiB5b3Uga2lsbFR3ZWVuc09mKCkgZWFjaCB0YXJnZXQgaW5kaXZpZHVhbGx5LCB0aGUgdHdlZW4gd291bGQgdGVjaG5pY2FsbHkgc3RpbGwgcmVtYWluIGFjdGl2ZSBhbmQgZmlyZSBpdHMgb25Db21wbGV0ZSBldmVuIHRob3VnaCB0aGVyZSBhcmVuJ3QgYW55IG1vcmUgcHJvcGVydGllcyB0d2VlbmluZy5cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIFR3ZWVuLnRvID0gZnVuY3Rpb24gdG8odGFyZ2V0cywgdmFycykge1xuICAgIHJldHVybiBuZXcgVHdlZW4odGFyZ2V0cywgdmFycywgYXJndW1lbnRzWzJdKTtcbiAgfTtcblxuICBUd2Vlbi5mcm9tID0gZnVuY3Rpb24gZnJvbSh0YXJnZXRzLCB2YXJzKSB7XG4gICAgcmV0dXJuIF9jcmVhdGVUd2VlblR5cGUoMSwgYXJndW1lbnRzKTtcbiAgfTtcblxuICBUd2Vlbi5kZWxheWVkQ2FsbCA9IGZ1bmN0aW9uIGRlbGF5ZWRDYWxsKGRlbGF5LCBjYWxsYmFjaywgcGFyYW1zLCBzY29wZSkge1xuICAgIHJldHVybiBuZXcgVHdlZW4oY2FsbGJhY2ssIDAsIHtcbiAgICAgIGltbWVkaWF0ZVJlbmRlcjogZmFsc2UsXG4gICAgICBsYXp5OiBmYWxzZSxcbiAgICAgIG92ZXJ3cml0ZTogZmFsc2UsXG4gICAgICBkZWxheTogZGVsYXksXG4gICAgICBvbkNvbXBsZXRlOiBjYWxsYmFjayxcbiAgICAgIG9uUmV2ZXJzZUNvbXBsZXRlOiBjYWxsYmFjayxcbiAgICAgIG9uQ29tcGxldGVQYXJhbXM6IHBhcmFtcyxcbiAgICAgIG9uUmV2ZXJzZUNvbXBsZXRlUGFyYW1zOiBwYXJhbXMsXG4gICAgICBjYWxsYmFja1Njb3BlOiBzY29wZVxuICAgIH0pOyAvLyB3ZSBtdXN0IHVzZSBvblJldmVyc2VDb21wbGV0ZSB0b28gZm9yIHRoaW5ncyBsaWtlIHRpbWVsaW5lLmFkZCgoKSA9PiB7Li4ufSkgd2hpY2ggc2hvdWxkIGJlIHRyaWdnZXJlZCBpbiBCT1RIIGRpcmVjdGlvbnMgKGZvcndhcmQgYW5kIHJldmVyc2UpXG4gIH07XG5cbiAgVHdlZW4uZnJvbVRvID0gZnVuY3Rpb24gZnJvbVRvKHRhcmdldHMsIGZyb21WYXJzLCB0b1ZhcnMpIHtcbiAgICByZXR1cm4gX2NyZWF0ZVR3ZWVuVHlwZSgyLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIFR3ZWVuLnNldCA9IGZ1bmN0aW9uIHNldCh0YXJnZXRzLCB2YXJzKSB7XG4gICAgdmFycy5kdXJhdGlvbiA9IDA7XG4gICAgdmFycy5yZXBlYXREZWxheSB8fCAodmFycy5yZXBlYXQgPSAwKTtcbiAgICByZXR1cm4gbmV3IFR3ZWVuKHRhcmdldHMsIHZhcnMpO1xuICB9O1xuXG4gIFR3ZWVuLmtpbGxUd2VlbnNPZiA9IGZ1bmN0aW9uIGtpbGxUd2VlbnNPZih0YXJnZXRzLCBwcm9wcywgb25seUFjdGl2ZSkge1xuICAgIHJldHVybiBfZ2xvYmFsVGltZWxpbmUua2lsbFR3ZWVuc09mKHRhcmdldHMsIHByb3BzLCBvbmx5QWN0aXZlKTtcbiAgfTtcblxuICByZXR1cm4gVHdlZW47XG59KEFuaW1hdGlvbik7XG5cbl9zZXREZWZhdWx0cyhUd2Vlbi5wcm90b3R5cGUsIHtcbiAgX3RhcmdldHM6IFtdLFxuICBfbGF6eTogMCxcbiAgX3N0YXJ0QXQ6IDAsXG4gIF9vcDogMCxcbiAgX29uSW5pdDogMFxufSk7IC8vYWRkIHRoZSBwZXJ0aW5lbnQgdGltZWxpbmUgbWV0aG9kcyB0byBUd2VlbiBpbnN0YW5jZXMgc28gdGhhdCB1c2VycyBjYW4gY2hhaW4gY29udmVuaWVudGx5IGFuZCBjcmVhdGUgYSB0aW1lbGluZSBhdXRvbWF0aWNhbGx5LiAocmVtb3ZlZCBkdWUgdG8gY29uY2VybnMgdGhhdCBpdCdkIHVsdGltYXRlbHkgYWRkIHRvIG1vcmUgY29uZnVzaW9uIGVzcGVjaWFsbHkgZm9yIGJlZ2lubmVycylcbi8vIF9mb3JFYWNoTmFtZShcInRvLGZyb20sZnJvbVRvLHNldCxjYWxsLGFkZCxhZGRMYWJlbCxhZGRQYXVzZVwiLCBuYW1lID0+IHtcbi8vIFx0VHdlZW4ucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oKSB7XG4vLyBcdFx0bGV0IHRsID0gbmV3IFRpbWVsaW5lKCk7XG4vLyBcdFx0cmV0dXJuIF9hZGRUb1RpbWVsaW5lKHRsLCB0aGlzKVtuYW1lXS5hcHBseSh0bCwgdG9BcnJheShhcmd1bWVudHMpKTtcbi8vIFx0fVxuLy8gfSk7XG4vL2ZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LiBMZXZlcmFnZSB0aGUgdGltZWxpbmUgY2FsbHMuXG5cblxuX2ZvckVhY2hOYW1lKFwic3RhZ2dlclRvLHN0YWdnZXJGcm9tLHN0YWdnZXJGcm9tVG9cIiwgZnVuY3Rpb24gKG5hbWUpIHtcbiAgVHdlZW5bbmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRsID0gbmV3IFRpbWVsaW5lKCksXG4gICAgICAgIHBhcmFtcyA9IF9zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG5cbiAgICBwYXJhbXMuc3BsaWNlKG5hbWUgPT09IFwic3RhZ2dlckZyb21Ub1wiID8gNSA6IDQsIDAsIDApO1xuICAgIHJldHVybiB0bFtuYW1lXS5hcHBseSh0bCwgcGFyYW1zKTtcbiAgfTtcbn0pO1xuLypcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBQUk9QVFdFRU5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuXG52YXIgX3NldHRlclBsYWluID0gZnVuY3Rpb24gX3NldHRlclBsYWluKHRhcmdldCwgcHJvcGVydHksIHZhbHVlKSB7XG4gIHJldHVybiB0YXJnZXRbcHJvcGVydHldID0gdmFsdWU7XG59LFxuICAgIF9zZXR0ZXJGdW5jID0gZnVuY3Rpb24gX3NldHRlckZ1bmModGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgcmV0dXJuIHRhcmdldFtwcm9wZXJ0eV0odmFsdWUpO1xufSxcbiAgICBfc2V0dGVyRnVuY1dpdGhQYXJhbSA9IGZ1bmN0aW9uIF9zZXR0ZXJGdW5jV2l0aFBhcmFtKHRhcmdldCwgcHJvcGVydHksIHZhbHVlLCBkYXRhKSB7XG4gIHJldHVybiB0YXJnZXRbcHJvcGVydHldKGRhdGEuZnAsIHZhbHVlKTtcbn0sXG4gICAgX3NldHRlckF0dHJpYnV0ZSA9IGZ1bmN0aW9uIF9zZXR0ZXJBdHRyaWJ1dGUodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgcmV0dXJuIHRhcmdldC5zZXRBdHRyaWJ1dGUocHJvcGVydHksIHZhbHVlKTtcbn0sXG4gICAgX2dldFNldHRlciA9IGZ1bmN0aW9uIF9nZXRTZXR0ZXIodGFyZ2V0LCBwcm9wZXJ0eSkge1xuICByZXR1cm4gX2lzRnVuY3Rpb24odGFyZ2V0W3Byb3BlcnR5XSkgPyBfc2V0dGVyRnVuYyA6IF9pc1VuZGVmaW5lZCh0YXJnZXRbcHJvcGVydHldKSAmJiB0YXJnZXQuc2V0QXR0cmlidXRlID8gX3NldHRlckF0dHJpYnV0ZSA6IF9zZXR0ZXJQbGFpbjtcbn0sXG4gICAgX3JlbmRlclBsYWluID0gZnVuY3Rpb24gX3JlbmRlclBsYWluKHJhdGlvLCBkYXRhKSB7XG4gIHJldHVybiBkYXRhLnNldChkYXRhLnQsIGRhdGEucCwgTWF0aC5yb3VuZCgoZGF0YS5zICsgZGF0YS5jICogcmF0aW8pICogMTAwMDAwMCkgLyAxMDAwMDAwLCBkYXRhKTtcbn0sXG4gICAgX3JlbmRlckJvb2xlYW4gPSBmdW5jdGlvbiBfcmVuZGVyQm9vbGVhbihyYXRpbywgZGF0YSkge1xuICByZXR1cm4gZGF0YS5zZXQoZGF0YS50LCBkYXRhLnAsICEhKGRhdGEucyArIGRhdGEuYyAqIHJhdGlvKSwgZGF0YSk7XG59LFxuICAgIF9yZW5kZXJDb21wbGV4U3RyaW5nID0gZnVuY3Rpb24gX3JlbmRlckNvbXBsZXhTdHJpbmcocmF0aW8sIGRhdGEpIHtcbiAgdmFyIHB0ID0gZGF0YS5fcHQsXG4gICAgICBzID0gXCJcIjtcblxuICBpZiAoIXJhdGlvICYmIGRhdGEuYikge1xuICAgIC8vYiA9IGJlZ2lubmluZyBzdHJpbmdcbiAgICBzID0gZGF0YS5iO1xuICB9IGVsc2UgaWYgKHJhdGlvID09PSAxICYmIGRhdGEuZSkge1xuICAgIC8vZSA9IGVuZGluZyBzdHJpbmdcbiAgICBzID0gZGF0YS5lO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChwdCkge1xuICAgICAgcyA9IHB0LnAgKyAocHQubSA/IHB0Lm0ocHQucyArIHB0LmMgKiByYXRpbykgOiBNYXRoLnJvdW5kKChwdC5zICsgcHQuYyAqIHJhdGlvKSAqIDEwMDAwKSAvIDEwMDAwKSArIHM7IC8vd2UgdXNlIHRoZSBcInBcIiBwcm9wZXJ0eSBmb3IgdGhlIHRleHQgaW5iZXR3ZWVuIChsaWtlIGEgc3VmZml4KS4gQW5kIGluIHRoZSBjb250ZXh0IG9mIGEgY29tcGxleCBzdHJpbmcsIHRoZSBtb2RpZmllciAobSkgaXMgdHlwaWNhbGx5IGp1c3QgTWF0aC5yb3VuZCgpLCBsaWtlIGZvciBSR0IgY29sb3JzLlxuXG4gICAgICBwdCA9IHB0Ll9uZXh0O1xuICAgIH1cblxuICAgIHMgKz0gZGF0YS5jOyAvL3dlIHVzZSB0aGUgXCJjXCIgb2YgdGhlIFByb3BUd2VlbiB0byBzdG9yZSB0aGUgZmluYWwgY2h1bmsgb2Ygbm9uLW51bWVyaWMgdGV4dC5cbiAgfVxuXG4gIGRhdGEuc2V0KGRhdGEudCwgZGF0YS5wLCBzLCBkYXRhKTtcbn0sXG4gICAgX3JlbmRlclByb3BUd2VlbnMgPSBmdW5jdGlvbiBfcmVuZGVyUHJvcFR3ZWVucyhyYXRpbywgZGF0YSkge1xuICB2YXIgcHQgPSBkYXRhLl9wdDtcblxuICB3aGlsZSAocHQpIHtcbiAgICBwdC5yKHJhdGlvLCBwdC5kKTtcbiAgICBwdCA9IHB0Ll9uZXh0O1xuICB9XG59LFxuICAgIF9hZGRQbHVnaW5Nb2RpZmllciA9IGZ1bmN0aW9uIF9hZGRQbHVnaW5Nb2RpZmllcihtb2RpZmllciwgdHdlZW4sIHRhcmdldCwgcHJvcGVydHkpIHtcbiAgdmFyIHB0ID0gdGhpcy5fcHQsXG4gICAgICBuZXh0O1xuXG4gIHdoaWxlIChwdCkge1xuICAgIG5leHQgPSBwdC5fbmV4dDtcbiAgICBwdC5wID09PSBwcm9wZXJ0eSAmJiBwdC5tb2RpZmllcihtb2RpZmllciwgdHdlZW4sIHRhcmdldCk7XG4gICAgcHQgPSBuZXh0O1xuICB9XG59LFxuICAgIF9raWxsUHJvcFR3ZWVuc09mID0gZnVuY3Rpb24gX2tpbGxQcm9wVHdlZW5zT2YocHJvcGVydHkpIHtcbiAgdmFyIHB0ID0gdGhpcy5fcHQsXG4gICAgICBoYXNOb25EZXBlbmRlbnRSZW1haW5pbmcsXG4gICAgICBuZXh0O1xuXG4gIHdoaWxlIChwdCkge1xuICAgIG5leHQgPSBwdC5fbmV4dDtcblxuICAgIGlmIChwdC5wID09PSBwcm9wZXJ0eSAmJiAhcHQub3AgfHwgcHQub3AgPT09IHByb3BlcnR5KSB7XG4gICAgICBfcmVtb3ZlTGlua2VkTGlzdEl0ZW0odGhpcywgcHQsIFwiX3B0XCIpO1xuICAgIH0gZWxzZSBpZiAoIXB0LmRlcCkge1xuICAgICAgaGFzTm9uRGVwZW5kZW50UmVtYWluaW5nID0gMTtcbiAgICB9XG5cbiAgICBwdCA9IG5leHQ7XG4gIH1cblxuICByZXR1cm4gIWhhc05vbkRlcGVuZGVudFJlbWFpbmluZztcbn0sXG4gICAgX3NldHRlcldpdGhNb2RpZmllciA9IGZ1bmN0aW9uIF9zZXR0ZXJXaXRoTW9kaWZpZXIodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUsIGRhdGEpIHtcbiAgZGF0YS5tU2V0KHRhcmdldCwgcHJvcGVydHksIGRhdGEubS5jYWxsKGRhdGEudHdlZW4sIHZhbHVlLCBkYXRhLm10KSwgZGF0YSk7XG59LFxuICAgIF9zb3J0UHJvcFR3ZWVuc0J5UHJpb3JpdHkgPSBmdW5jdGlvbiBfc29ydFByb3BUd2VlbnNCeVByaW9yaXR5KHBhcmVudCkge1xuICB2YXIgcHQgPSBwYXJlbnQuX3B0LFxuICAgICAgbmV4dCxcbiAgICAgIHB0MixcbiAgICAgIGZpcnN0LFxuICAgICAgbGFzdDsgLy9zb3J0cyB0aGUgUHJvcFR3ZWVuIGxpbmtlZCBsaXN0IGluIG9yZGVyIG9mIHByaW9yaXR5IGJlY2F1c2Ugc29tZSBwbHVnaW5zIG5lZWQgdG8gZG8gdGhlaXIgd29yayBhZnRlciBBTEwgb2YgdGhlIFByb3BUd2VlbnMgd2VyZSBjcmVhdGVkIChsaWtlIFJvdW5kUHJvcHNQbHVnaW4gYW5kIE1vZGlmaWVyc1BsdWdpbilcblxuICB3aGlsZSAocHQpIHtcbiAgICBuZXh0ID0gcHQuX25leHQ7XG4gICAgcHQyID0gZmlyc3Q7XG5cbiAgICB3aGlsZSAocHQyICYmIHB0Mi5wciA+IHB0LnByKSB7XG4gICAgICBwdDIgPSBwdDIuX25leHQ7XG4gICAgfVxuXG4gICAgaWYgKHB0Ll9wcmV2ID0gcHQyID8gcHQyLl9wcmV2IDogbGFzdCkge1xuICAgICAgcHQuX3ByZXYuX25leHQgPSBwdDtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlyc3QgPSBwdDtcbiAgICB9XG5cbiAgICBpZiAocHQuX25leHQgPSBwdDIpIHtcbiAgICAgIHB0Mi5fcHJldiA9IHB0O1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0ID0gcHQ7XG4gICAgfVxuXG4gICAgcHQgPSBuZXh0O1xuICB9XG5cbiAgcGFyZW50Ll9wdCA9IGZpcnN0O1xufTsgLy9Qcm9wVHdlZW4ga2V5OiB0ID0gdGFyZ2V0LCBwID0gcHJvcCwgciA9IHJlbmRlcmVyLCBkID0gZGF0YSwgcyA9IHN0YXJ0LCBjID0gY2hhbmdlLCBvcCA9IG92ZXJ3cml0ZVByb3BlcnR5IChPTkxZIHBvcHVsYXRlZCB3aGVuIGl0J3MgZGlmZmVyZW50IHRoYW4gcCksIHByID0gcHJpb3JpdHksIF9uZXh0L19wcmV2IGZvciB0aGUgbGlua2VkIGxpc3Qgc2libGluZ3MsIHNldCA9IHNldHRlciwgbSA9IG1vZGlmaWVyLCBtU2V0ID0gbW9kaWZpZXJTZXR0ZXIgKHRoZSBvcmlnaW5hbCBzZXR0ZXIsIGJlZm9yZSBhIG1vZGlmaWVyIHdhcyBhZGRlZClcblxuXG5leHBvcnQgdmFyIFByb3BUd2VlbiA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFByb3BUd2VlbihuZXh0LCB0YXJnZXQsIHByb3AsIHN0YXJ0LCBjaGFuZ2UsIHJlbmRlcmVyLCBkYXRhLCBzZXR0ZXIsIHByaW9yaXR5KSB7XG4gICAgdGhpcy50ID0gdGFyZ2V0O1xuICAgIHRoaXMucyA9IHN0YXJ0O1xuICAgIHRoaXMuYyA9IGNoYW5nZTtcbiAgICB0aGlzLnAgPSBwcm9wO1xuICAgIHRoaXMuciA9IHJlbmRlcmVyIHx8IF9yZW5kZXJQbGFpbjtcbiAgICB0aGlzLmQgPSBkYXRhIHx8IHRoaXM7XG4gICAgdGhpcy5zZXQgPSBzZXR0ZXIgfHwgX3NldHRlclBsYWluO1xuICAgIHRoaXMucHIgPSBwcmlvcml0eSB8fCAwO1xuICAgIHRoaXMuX25leHQgPSBuZXh0O1xuXG4gICAgaWYgKG5leHQpIHtcbiAgICAgIG5leHQuX3ByZXYgPSB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIHZhciBfcHJvdG80ID0gUHJvcFR3ZWVuLnByb3RvdHlwZTtcblxuICBfcHJvdG80Lm1vZGlmaWVyID0gZnVuY3Rpb24gbW9kaWZpZXIoZnVuYywgdHdlZW4sIHRhcmdldCkge1xuICAgIHRoaXMubVNldCA9IHRoaXMubVNldCB8fCB0aGlzLnNldDsgLy9pbiBjYXNlIGl0IHdhcyBhbHJlYWR5IHNldCAoYSBQcm9wVHdlZW4gY2FuIG9ubHkgaGF2ZSBvbmUgbW9kaWZpZXIpXG5cbiAgICB0aGlzLnNldCA9IF9zZXR0ZXJXaXRoTW9kaWZpZXI7XG4gICAgdGhpcy5tID0gZnVuYztcbiAgICB0aGlzLm10ID0gdGFyZ2V0OyAvL21vZGlmaWVyIHRhcmdldFxuXG4gICAgdGhpcy50d2VlbiA9IHR3ZWVuO1xuICB9O1xuXG4gIHJldHVybiBQcm9wVHdlZW47XG59KCk7IC8vSW5pdGlhbGl6YXRpb24gdGFza3NcblxuX2ZvckVhY2hOYW1lKF9jYWxsYmFja05hbWVzICsgXCJwYXJlbnQsZHVyYXRpb24sZWFzZSxkZWxheSxvdmVyd3JpdGUscnVuQmFja3dhcmRzLHN0YXJ0QXQseW95byxpbW1lZGlhdGVSZW5kZXIscmVwZWF0LHJlcGVhdERlbGF5LGRhdGEscGF1c2VkLHJldmVyc2VkLGxhenksY2FsbGJhY2tTY29wZSxzdHJpbmdGaWx0ZXIsaWQseW95b0Vhc2Usc3RhZ2dlcixpbmhlcml0LHJlcGVhdFJlZnJlc2gsa2V5ZnJhbWVzLGF1dG9SZXZlcnQsc2Nyb2xsVHJpZ2dlclwiLCBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gX3Jlc2VydmVkUHJvcHNbbmFtZV0gPSAxO1xufSk7XG5cbl9nbG9iYWxzLlR3ZWVuTWF4ID0gX2dsb2JhbHMuVHdlZW5MaXRlID0gVHdlZW47XG5fZ2xvYmFscy5UaW1lbGluZUxpdGUgPSBfZ2xvYmFscy5UaW1lbGluZU1heCA9IFRpbWVsaW5lO1xuX2dsb2JhbFRpbWVsaW5lID0gbmV3IFRpbWVsaW5lKHtcbiAgc29ydENoaWxkcmVuOiBmYWxzZSxcbiAgZGVmYXVsdHM6IF9kZWZhdWx0cyxcbiAgYXV0b1JlbW92ZUNoaWxkcmVuOiB0cnVlLFxuICBpZDogXCJyb290XCIsXG4gIHNtb290aENoaWxkVGltaW5nOiB0cnVlXG59KTtcbl9jb25maWcuc3RyaW5nRmlsdGVyID0gX2NvbG9yU3RyaW5nRmlsdGVyO1xuXG52YXIgX21lZGlhID0gW10sXG4gICAgX2xpc3RlbmVycyA9IHt9LFxuICAgIF9lbXB0eUFycmF5ID0gW10sXG4gICAgX2xhc3RNZWRpYVRpbWUgPSAwLFxuICAgIF9jb250ZXh0SUQgPSAwLFxuICAgIF9kaXNwYXRjaCA9IGZ1bmN0aW9uIF9kaXNwYXRjaCh0eXBlKSB7XG4gIHJldHVybiAoX2xpc3RlbmVyc1t0eXBlXSB8fCBfZW1wdHlBcnJheSkubWFwKGZ1bmN0aW9uIChmKSB7XG4gICAgcmV0dXJuIGYoKTtcbiAgfSk7XG59LFxuICAgIF9vbk1lZGlhQ2hhbmdlID0gZnVuY3Rpb24gX29uTWVkaWFDaGFuZ2UoKSB7XG4gIHZhciB0aW1lID0gRGF0ZS5ub3coKSxcbiAgICAgIG1hdGNoZXMgPSBbXTtcblxuICBpZiAodGltZSAtIF9sYXN0TWVkaWFUaW1lID4gMikge1xuICAgIF9kaXNwYXRjaChcIm1hdGNoTWVkaWFJbml0XCIpO1xuXG4gICAgX21lZGlhLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgIHZhciBxdWVyaWVzID0gYy5xdWVyaWVzLFxuICAgICAgICAgIGNvbmRpdGlvbnMgPSBjLmNvbmRpdGlvbnMsXG4gICAgICAgICAgbWF0Y2gsXG4gICAgICAgICAgcCxcbiAgICAgICAgICBhbnlNYXRjaCxcbiAgICAgICAgICB0b2dnbGVkO1xuXG4gICAgICBmb3IgKHAgaW4gcXVlcmllcykge1xuICAgICAgICBtYXRjaCA9IF93aW4ubWF0Y2hNZWRpYShxdWVyaWVzW3BdKS5tYXRjaGVzOyAvLyBGaXJlZm94IGRvZXNuJ3QgdXBkYXRlIHRoZSBcIm1hdGNoZXNcIiBwcm9wZXJ0eSBvZiB0aGUgTWVkaWFRdWVyeUxpc3Qgb2JqZWN0IGNvcnJlY3RseSAtIGl0IG9ubHkgZG9lcyBzbyBhcyBpdCBjYWxscyBpdHMgY2hhbmdlIGhhbmRsZXIgLSBzbyB3ZSBtdXN0IHJlLWNyZWF0ZSBhIG1lZGlhIHF1ZXJ5IGhlcmUgdG8gZW5zdXJlIGl0J3MgYWNjdXJhdGUuXG5cbiAgICAgICAgbWF0Y2ggJiYgKGFueU1hdGNoID0gMSk7XG5cbiAgICAgICAgaWYgKG1hdGNoICE9PSBjb25kaXRpb25zW3BdKSB7XG4gICAgICAgICAgY29uZGl0aW9uc1twXSA9IG1hdGNoO1xuICAgICAgICAgIHRvZ2dsZWQgPSAxO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0b2dnbGVkKSB7XG4gICAgICAgIGMucmV2ZXJ0KCk7XG4gICAgICAgIGFueU1hdGNoICYmIG1hdGNoZXMucHVzaChjKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIF9kaXNwYXRjaChcIm1hdGNoTWVkaWFSZXZlcnRcIik7XG5cbiAgICBtYXRjaGVzLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgIHJldHVybiBjLm9uTWF0Y2goYyk7XG4gICAgfSk7XG4gICAgX2xhc3RNZWRpYVRpbWUgPSB0aW1lO1xuXG4gICAgX2Rpc3BhdGNoKFwibWF0Y2hNZWRpYVwiKTtcbiAgfVxufTtcblxudmFyIENvbnRleHQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBDb250ZXh0KGZ1bmMsIHNjb3BlKSB7XG4gICAgdGhpcy5zZWxlY3RvciA9IHNjb3BlICYmIHNlbGVjdG9yKHNjb3BlKTtcbiAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICB0aGlzLl9yID0gW107IC8vIHJldHVybmVkL2NsZWFudXAgZnVuY3Rpb25zXG5cbiAgICB0aGlzLmlzUmV2ZXJ0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmlkID0gX2NvbnRleHRJRCsrOyAvLyB0byB3b3JrIGFyb3VuZCBpc3N1ZXMgdGhhdCBmcmFtZXdvcmtzIGxpa2UgVnVlIGNhdXNlIGJ5IG1ha2luZyB0aGluZ3MgaW50byBQcm94aWVzIHdoaWNoIG1ha2UgaXQgaW1wb3NzaWJsZSB0byBkbyBzb21ldGhpbmcgbGlrZSBfbWVkaWEuaW5kZXhPZih0aGlzKSBiZWNhdXNlIFwidGhpc1wiIHdvdWxkIG5vIGxvbmdlciByZWZlciB0byB0aGUgQ29udGV4dCBpbnN0YW5jZSBpdHNlbGYgLSBpdCdkIHJlZmVyIHRvIGEgUHJveHkhIFdlIG5lZWRlZCBhIHdheSB0byBpZGVudGlmeSB0aGUgY29udGV4dCB1bmlxdWVseVxuXG4gICAgZnVuYyAmJiB0aGlzLmFkZChmdW5jKTtcbiAgfVxuXG4gIHZhciBfcHJvdG81ID0gQ29udGV4dC5wcm90b3R5cGU7XG5cbiAgX3Byb3RvNS5hZGQgPSBmdW5jdGlvbiBhZGQobmFtZSwgZnVuYywgc2NvcGUpIHtcbiAgICAvLyBwb3NzaWJsZSBmdXR1cmUgYWRkaXRpb24gaWYgd2UgbmVlZCB0aGUgYWJpbGl0eSB0byBhZGQoKSBhbiBhbmltYXRpb24gdG8gYSBjb250ZXh0IGFuZCBmb3Igd2hhdGV2ZXIgcmVhc29uIGNhbm5vdCBjcmVhdGUgdGhhdCBhbmltYXRpb24gaW5zaWRlIG9mIGEgY29udGV4dC5hZGQoKCkgPT4gey4uLn0pIGZ1bmN0aW9uLlxuICAgIC8vIGlmIChuYW1lICYmIF9pc0Z1bmN0aW9uKG5hbWUucmV2ZXJ0KSkge1xuICAgIC8vIFx0dGhpcy5kYXRhLnB1c2gobmFtZSk7XG4gICAgLy8gXHRyZXR1cm4gKG5hbWUuX2N0eCA9IHRoaXMpO1xuICAgIC8vIH1cbiAgICBpZiAoX2lzRnVuY3Rpb24obmFtZSkpIHtcbiAgICAgIHNjb3BlID0gZnVuYztcbiAgICAgIGZ1bmMgPSBuYW1lO1xuICAgICAgbmFtZSA9IF9pc0Z1bmN0aW9uO1xuICAgIH1cblxuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgZiA9IGZ1bmN0aW9uIGYoKSB7XG4gICAgICB2YXIgcHJldiA9IF9jb250ZXh0LFxuICAgICAgICAgIHByZXZTZWxlY3RvciA9IHNlbGYuc2VsZWN0b3IsXG4gICAgICAgICAgcmVzdWx0O1xuICAgICAgcHJldiAmJiBwcmV2ICE9PSBzZWxmICYmIHByZXYuZGF0YS5wdXNoKHNlbGYpO1xuICAgICAgc2NvcGUgJiYgKHNlbGYuc2VsZWN0b3IgPSBzZWxlY3RvcihzY29wZSkpO1xuICAgICAgX2NvbnRleHQgPSBzZWxmO1xuICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgICAgX2lzRnVuY3Rpb24ocmVzdWx0KSAmJiBzZWxmLl9yLnB1c2gocmVzdWx0KTtcbiAgICAgIF9jb250ZXh0ID0gcHJldjtcbiAgICAgIHNlbGYuc2VsZWN0b3IgPSBwcmV2U2VsZWN0b3I7XG4gICAgICBzZWxmLmlzUmV2ZXJ0ZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxuICAgIHNlbGYubGFzdCA9IGY7XG4gICAgcmV0dXJuIG5hbWUgPT09IF9pc0Z1bmN0aW9uID8gZihzZWxmKSA6IG5hbWUgPyBzZWxmW25hbWVdID0gZiA6IGY7XG4gIH07XG5cbiAgX3Byb3RvNS5pZ25vcmUgPSBmdW5jdGlvbiBpZ25vcmUoZnVuYykge1xuICAgIHZhciBwcmV2ID0gX2NvbnRleHQ7XG4gICAgX2NvbnRleHQgPSBudWxsO1xuICAgIGZ1bmModGhpcyk7XG4gICAgX2NvbnRleHQgPSBwcmV2O1xuICB9O1xuXG4gIF9wcm90bzUuZ2V0VHdlZW5zID0gZnVuY3Rpb24gZ2V0VHdlZW5zKCkge1xuICAgIHZhciBhID0gW107XG4gICAgdGhpcy5kYXRhLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBlIGluc3RhbmNlb2YgQ29udGV4dCA/IGEucHVzaC5hcHBseShhLCBlLmdldFR3ZWVucygpKSA6IGUgaW5zdGFuY2VvZiBUd2VlbiAmJiAhKGUucGFyZW50ICYmIGUucGFyZW50LmRhdGEgPT09IFwibmVzdGVkXCIpICYmIGEucHVzaChlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gYTtcbiAgfTtcblxuICBfcHJvdG81LmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgdGhpcy5fci5sZW5ndGggPSB0aGlzLmRhdGEubGVuZ3RoID0gMDtcbiAgfTtcblxuICBfcHJvdG81LmtpbGwgPSBmdW5jdGlvbiBraWxsKHJldmVydCwgbWF0Y2hNZWRpYSkge1xuICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgaWYgKHJldmVydCkge1xuICAgICAgdmFyIHR3ZWVucyA9IHRoaXMuZ2V0VHdlZW5zKCk7XG4gICAgICB0aGlzLmRhdGEuZm9yRWFjaChmdW5jdGlvbiAodCkge1xuICAgICAgICAvLyBGbGlwIHBsdWdpbiB0d2VlbnMgYXJlIHZlcnkgZGlmZmVyZW50IGluIHRoYXQgdGhleSBzaG91bGQgYWN0dWFsbHkgYmUgcHVzaGVkIHRvIHRoZWlyIGVuZC4gVGhlIHBsdWdpbiByZXBsYWNlcyB0aGUgdGltZWxpbmUncyAucmV2ZXJ0KCkgbWV0aG9kIHRvIGRvIGV4YWN0bHkgdGhhdC4gQnV0IHdlIGFsc28gbmVlZCB0byByZW1vdmUgYW55IG9mIHRob3NlIG5lc3RlZCB0d2VlbnMgaW5zaWRlIHRoZSBmbGlwIHRpbWVsaW5lIHNvIHRoYXQgdGhleSBkb24ndCBnZXQgaW5kaXZpZHVhbGx5IHJldmVydGVkLlxuICAgICAgICBpZiAodC5kYXRhID09PSBcImlzRmxpcFwiKSB7XG4gICAgICAgICAgdC5yZXZlcnQoKTtcbiAgICAgICAgICB0LmdldENoaWxkcmVuKHRydWUsIHRydWUsIGZhbHNlKS5mb3JFYWNoKGZ1bmN0aW9uICh0d2Vlbikge1xuICAgICAgICAgICAgcmV0dXJuIHR3ZWVucy5zcGxpY2UodHdlZW5zLmluZGV4T2YodHdlZW4pLCAxKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7IC8vIHNhdmUgYXMgYW4gb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGNhY2hlIHRoZSBnbG9iYWxUaW1lIGZvciBlYWNoIHR3ZWVuIHRvIG9wdGltaXplIHBlcmZvcm1hbmNlIGR1cmluZyB0aGUgc29ydFxuXG4gICAgICB0d2VlbnMubWFwKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZzogdC5nbG9iYWxUaW1lKDApLFxuICAgICAgICAgIHQ6IHRcbiAgICAgICAgfTtcbiAgICAgIH0pLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGIuZyAtIGEuZyB8fCAtMTtcbiAgICAgIH0pLmZvckVhY2goZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgcmV0dXJuIG8udC5yZXZlcnQocmV2ZXJ0KTtcbiAgICAgIH0pOyAvLyBub3RlOiBhbGwgb2YgdGhlIF9zdGFydEF0IHR3ZWVucyBzaG91bGQgYmUgcmV2ZXJ0ZWQgaW4gcmV2ZXJzZSBvcmRlciB0aGF0IHRoZXkgd2VyZSBjcmVhdGVkLCBhbmQgdGhleSdsbCBhbGwgaGF2ZSB0aGUgc2FtZSBnbG9iYWxUaW1lICgtMSkgc28gdGhlIFwiIHx8IC0xXCIgaW4gdGhlIHNvcnQga2VlcHMgdGhlIG9yZGVyIHByb3Blcmx5LlxuXG4gICAgICB0aGlzLmRhdGEuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXR1cm4gZSBpbnN0YW5jZW9mIFRpbWVsaW5lID8gZS5kYXRhICE9PSBcIm5lc3RlZFwiICYmIGUua2lsbCgpIDogIShlIGluc3RhbmNlb2YgVHdlZW4pICYmIGUucmV2ZXJ0ICYmIGUucmV2ZXJ0KHJldmVydCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fci5mb3JFYWNoKGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHJldHVybiBmKHJldmVydCwgX3RoaXM0KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmlzUmV2ZXJ0ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRhdGEuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXR1cm4gZS5raWxsICYmIGUua2lsbCgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5jbGVhcigpO1xuXG4gICAgaWYgKG1hdGNoTWVkaWEpIHtcbiAgICAgIHZhciBpID0gX21lZGlhLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAvLyBwcmV2aW91c2x5LCB3ZSBjaGVja2VkIF9tZWRpYS5pbmRleE9mKHRoaXMpLCBidXQgc29tZSBmcmFtZXdvcmtzIGxpa2UgVnVlIGVuZm9yY2UgUHJveHkgb2JqZWN0cyB0aGF0IG1ha2UgaXQgaW1wb3NzaWJsZSB0byBnZXQgdGhlIHByb3BlciByZXN1bHQgdGhhdCB3YXksIHNvIHdlIG11c3QgdXNlIGEgdW5pcXVlIElEIG51bWJlciBpbnN0ZWFkLlxuICAgICAgICBfbWVkaWFbaV0uaWQgPT09IHRoaXMuaWQgJiYgX21lZGlhLnNwbGljZShpLCAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvNS5yZXZlcnQgPSBmdW5jdGlvbiByZXZlcnQoY29uZmlnKSB7XG4gICAgdGhpcy5raWxsKGNvbmZpZyB8fCB7fSk7XG4gIH07XG5cbiAgcmV0dXJuIENvbnRleHQ7XG59KCk7XG5cbnZhciBNYXRjaE1lZGlhID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gTWF0Y2hNZWRpYShzY29wZSkge1xuICAgIHRoaXMuY29udGV4dHMgPSBbXTtcbiAgICB0aGlzLnNjb3BlID0gc2NvcGU7XG4gIH1cblxuICB2YXIgX3Byb3RvNiA9IE1hdGNoTWVkaWEucHJvdG90eXBlO1xuXG4gIF9wcm90bzYuYWRkID0gZnVuY3Rpb24gYWRkKGNvbmRpdGlvbnMsIGZ1bmMsIHNjb3BlKSB7XG4gICAgX2lzT2JqZWN0KGNvbmRpdGlvbnMpIHx8IChjb25kaXRpb25zID0ge1xuICAgICAgbWF0Y2hlczogY29uZGl0aW9uc1xuICAgIH0pO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQoMCwgc2NvcGUgfHwgdGhpcy5zY29wZSksXG4gICAgICAgIGNvbmQgPSBjb250ZXh0LmNvbmRpdGlvbnMgPSB7fSxcbiAgICAgICAgbXEsXG4gICAgICAgIHAsXG4gICAgICAgIGFjdGl2ZTtcbiAgICBfY29udGV4dCAmJiAhY29udGV4dC5zZWxlY3RvciAmJiAoY29udGV4dC5zZWxlY3RvciA9IF9jb250ZXh0LnNlbGVjdG9yKTsgLy8gaW4gY2FzZSBhIGNvbnRleHQgaXMgY3JlYXRlZCBpbnNpZGUgYSBjb250ZXh0LiBMaWtlIGEgZ3NhcC5tYXRjaE1lZGlhKCkgdGhhdCdzIGluc2lkZSBhIHNjb3BlZCBnc2FwLmNvbnRleHQoKVxuXG4gICAgdGhpcy5jb250ZXh0cy5wdXNoKGNvbnRleHQpO1xuICAgIGZ1bmMgPSBjb250ZXh0LmFkZChcIm9uTWF0Y2hcIiwgZnVuYyk7XG4gICAgY29udGV4dC5xdWVyaWVzID0gY29uZGl0aW9ucztcblxuICAgIGZvciAocCBpbiBjb25kaXRpb25zKSB7XG4gICAgICBpZiAocCA9PT0gXCJhbGxcIikge1xuICAgICAgICBhY3RpdmUgPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbXEgPSBfd2luLm1hdGNoTWVkaWEoY29uZGl0aW9uc1twXSk7XG5cbiAgICAgICAgaWYgKG1xKSB7XG4gICAgICAgICAgX21lZGlhLmluZGV4T2YoY29udGV4dCkgPCAwICYmIF9tZWRpYS5wdXNoKGNvbnRleHQpO1xuICAgICAgICAgIChjb25kW3BdID0gbXEubWF0Y2hlcykgJiYgKGFjdGl2ZSA9IDEpO1xuICAgICAgICAgIG1xLmFkZExpc3RlbmVyID8gbXEuYWRkTGlzdGVuZXIoX29uTWVkaWFDaGFuZ2UpIDogbXEuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBfb25NZWRpYUNoYW5nZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBhY3RpdmUgJiYgZnVuYyhjb250ZXh0KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSAvLyByZWZyZXNoKCkge1xuICAvLyBcdGxldCB0aW1lID0gX2xhc3RNZWRpYVRpbWUsXG4gIC8vIFx0XHRtZWRpYSA9IF9tZWRpYTtcbiAgLy8gXHRfbGFzdE1lZGlhVGltZSA9IC0xO1xuICAvLyBcdF9tZWRpYSA9IHRoaXMuY29udGV4dHM7XG4gIC8vIFx0X29uTWVkaWFDaGFuZ2UoKTtcbiAgLy8gXHRfbGFzdE1lZGlhVGltZSA9IHRpbWU7XG4gIC8vIFx0X21lZGlhID0gbWVkaWE7XG4gIC8vIH1cbiAgO1xuXG4gIF9wcm90bzYucmV2ZXJ0ID0gZnVuY3Rpb24gcmV2ZXJ0KGNvbmZpZykge1xuICAgIHRoaXMua2lsbChjb25maWcgfHwge30pO1xuICB9O1xuXG4gIF9wcm90bzYua2lsbCA9IGZ1bmN0aW9uIGtpbGwocmV2ZXJ0KSB7XG4gICAgdGhpcy5jb250ZXh0cy5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICByZXR1cm4gYy5raWxsKHJldmVydCwgdHJ1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIE1hdGNoTWVkaWE7XG59KCk7XG4vKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEdTQVBcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuXG52YXIgX2dzYXAgPSB7XG4gIHJlZ2lzdGVyUGx1Z2luOiBmdW5jdGlvbiByZWdpc3RlclBsdWdpbigpIHtcbiAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICB9XG5cbiAgICBhcmdzLmZvckVhY2goZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgcmV0dXJuIF9jcmVhdGVQbHVnaW4oY29uZmlnKTtcbiAgICB9KTtcbiAgfSxcbiAgdGltZWxpbmU6IGZ1bmN0aW9uIHRpbWVsaW5lKHZhcnMpIHtcbiAgICByZXR1cm4gbmV3IFRpbWVsaW5lKHZhcnMpO1xuICB9LFxuICBnZXRUd2VlbnNPZjogZnVuY3Rpb24gZ2V0VHdlZW5zT2YodGFyZ2V0cywgb25seUFjdGl2ZSkge1xuICAgIHJldHVybiBfZ2xvYmFsVGltZWxpbmUuZ2V0VHdlZW5zT2YodGFyZ2V0cywgb25seUFjdGl2ZSk7XG4gIH0sXG4gIGdldFByb3BlcnR5OiBmdW5jdGlvbiBnZXRQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5LCB1bml0LCB1bmNhY2hlKSB7XG4gICAgX2lzU3RyaW5nKHRhcmdldCkgJiYgKHRhcmdldCA9IHRvQXJyYXkodGFyZ2V0KVswXSk7IC8vaW4gY2FzZSBzZWxlY3RvciB0ZXh0IG9yIGFuIGFycmF5IGlzIHBhc3NlZCBpblxuXG4gICAgdmFyIGdldHRlciA9IF9nZXRDYWNoZSh0YXJnZXQgfHwge30pLmdldCxcbiAgICAgICAgZm9ybWF0ID0gdW5pdCA/IF9wYXNzVGhyb3VnaCA6IF9udW1lcmljSWZQb3NzaWJsZTtcblxuICAgIHVuaXQgPT09IFwibmF0aXZlXCIgJiYgKHVuaXQgPSBcIlwiKTtcbiAgICByZXR1cm4gIXRhcmdldCA/IHRhcmdldCA6ICFwcm9wZXJ0eSA/IGZ1bmN0aW9uIChwcm9wZXJ0eSwgdW5pdCwgdW5jYWNoZSkge1xuICAgICAgcmV0dXJuIGZvcm1hdCgoX3BsdWdpbnNbcHJvcGVydHldICYmIF9wbHVnaW5zW3Byb3BlcnR5XS5nZXQgfHwgZ2V0dGVyKSh0YXJnZXQsIHByb3BlcnR5LCB1bml0LCB1bmNhY2hlKSk7XG4gICAgfSA6IGZvcm1hdCgoX3BsdWdpbnNbcHJvcGVydHldICYmIF9wbHVnaW5zW3Byb3BlcnR5XS5nZXQgfHwgZ2V0dGVyKSh0YXJnZXQsIHByb3BlcnR5LCB1bml0LCB1bmNhY2hlKSk7XG4gIH0sXG4gIHF1aWNrU2V0dGVyOiBmdW5jdGlvbiBxdWlja1NldHRlcih0YXJnZXQsIHByb3BlcnR5LCB1bml0KSB7XG4gICAgdGFyZ2V0ID0gdG9BcnJheSh0YXJnZXQpO1xuXG4gICAgaWYgKHRhcmdldC5sZW5ndGggPiAxKSB7XG4gICAgICB2YXIgc2V0dGVycyA9IHRhcmdldC5tYXAoZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIGdzYXAucXVpY2tTZXR0ZXIodCwgcHJvcGVydHksIHVuaXQpO1xuICAgICAgfSksXG4gICAgICAgICAgbCA9IHNldHRlcnMubGVuZ3RoO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgaSA9IGw7XG5cbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgIHNldHRlcnNbaV0odmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIHRhcmdldCA9IHRhcmdldFswXSB8fCB7fTtcblxuICAgIHZhciBQbHVnaW4gPSBfcGx1Z2luc1twcm9wZXJ0eV0sXG4gICAgICAgIGNhY2hlID0gX2dldENhY2hlKHRhcmdldCksXG4gICAgICAgIHAgPSBjYWNoZS5oYXJuZXNzICYmIChjYWNoZS5oYXJuZXNzLmFsaWFzZXMgfHwge30pW3Byb3BlcnR5XSB8fCBwcm9wZXJ0eSxcbiAgICAgICAgLy8gaW4gY2FzZSBpdCdzIGFuIGFsaWFzLCBsaWtlIFwicm90YXRlXCIgZm9yIFwicm90YXRpb25cIi5cbiAgICBzZXR0ZXIgPSBQbHVnaW4gPyBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHZhciBwID0gbmV3IFBsdWdpbigpO1xuICAgICAgX3F1aWNrVHdlZW4uX3B0ID0gMDtcbiAgICAgIHAuaW5pdCh0YXJnZXQsIHVuaXQgPyB2YWx1ZSArIHVuaXQgOiB2YWx1ZSwgX3F1aWNrVHdlZW4sIDAsIFt0YXJnZXRdKTtcbiAgICAgIHAucmVuZGVyKDEsIHApO1xuICAgICAgX3F1aWNrVHdlZW4uX3B0ICYmIF9yZW5kZXJQcm9wVHdlZW5zKDEsIF9xdWlja1R3ZWVuKTtcbiAgICB9IDogY2FjaGUuc2V0KHRhcmdldCwgcCk7XG5cbiAgICByZXR1cm4gUGx1Z2luID8gc2V0dGVyIDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gc2V0dGVyKHRhcmdldCwgcCwgdW5pdCA/IHZhbHVlICsgdW5pdCA6IHZhbHVlLCBjYWNoZSwgMSk7XG4gICAgfTtcbiAgfSxcbiAgcXVpY2tUbzogZnVuY3Rpb24gcXVpY2tUbyh0YXJnZXQsIHByb3BlcnR5LCB2YXJzKSB7XG4gICAgdmFyIF9tZXJnZTI7XG5cbiAgICB2YXIgdHdlZW4gPSBnc2FwLnRvKHRhcmdldCwgX21lcmdlKChfbWVyZ2UyID0ge30sIF9tZXJnZTJbcHJvcGVydHldID0gXCIrPTAuMVwiLCBfbWVyZ2UyLnBhdXNlZCA9IHRydWUsIF9tZXJnZTIpLCB2YXJzIHx8IHt9KSksXG4gICAgICAgIGZ1bmMgPSBmdW5jdGlvbiBmdW5jKHZhbHVlLCBzdGFydCwgc3RhcnRJc1JlbGF0aXZlKSB7XG4gICAgICByZXR1cm4gdHdlZW4ucmVzZXRUbyhwcm9wZXJ0eSwgdmFsdWUsIHN0YXJ0LCBzdGFydElzUmVsYXRpdmUpO1xuICAgIH07XG5cbiAgICBmdW5jLnR3ZWVuID0gdHdlZW47XG4gICAgcmV0dXJuIGZ1bmM7XG4gIH0sXG4gIGlzVHdlZW5pbmc6IGZ1bmN0aW9uIGlzVHdlZW5pbmcodGFyZ2V0cykge1xuICAgIHJldHVybiBfZ2xvYmFsVGltZWxpbmUuZ2V0VHdlZW5zT2YodGFyZ2V0cywgdHJ1ZSkubGVuZ3RoID4gMDtcbiAgfSxcbiAgZGVmYXVsdHM6IGZ1bmN0aW9uIGRlZmF1bHRzKHZhbHVlKSB7XG4gICAgdmFsdWUgJiYgdmFsdWUuZWFzZSAmJiAodmFsdWUuZWFzZSA9IF9wYXJzZUVhc2UodmFsdWUuZWFzZSwgX2RlZmF1bHRzLmVhc2UpKTtcbiAgICByZXR1cm4gX21lcmdlRGVlcChfZGVmYXVsdHMsIHZhbHVlIHx8IHt9KTtcbiAgfSxcbiAgY29uZmlnOiBmdW5jdGlvbiBjb25maWcodmFsdWUpIHtcbiAgICByZXR1cm4gX21lcmdlRGVlcChfY29uZmlnLCB2YWx1ZSB8fCB7fSk7XG4gIH0sXG4gIHJlZ2lzdGVyRWZmZWN0OiBmdW5jdGlvbiByZWdpc3RlckVmZmVjdChfcmVmMykge1xuICAgIHZhciBuYW1lID0gX3JlZjMubmFtZSxcbiAgICAgICAgZWZmZWN0ID0gX3JlZjMuZWZmZWN0LFxuICAgICAgICBwbHVnaW5zID0gX3JlZjMucGx1Z2lucyxcbiAgICAgICAgZGVmYXVsdHMgPSBfcmVmMy5kZWZhdWx0cyxcbiAgICAgICAgZXh0ZW5kVGltZWxpbmUgPSBfcmVmMy5leHRlbmRUaW1lbGluZTtcbiAgICAocGx1Z2lucyB8fCBcIlwiKS5zcGxpdChcIixcIikuZm9yRWFjaChmdW5jdGlvbiAocGx1Z2luTmFtZSkge1xuICAgICAgcmV0dXJuIHBsdWdpbk5hbWUgJiYgIV9wbHVnaW5zW3BsdWdpbk5hbWVdICYmICFfZ2xvYmFsc1twbHVnaW5OYW1lXSAmJiBfd2FybihuYW1lICsgXCIgZWZmZWN0IHJlcXVpcmVzIFwiICsgcGx1Z2luTmFtZSArIFwiIHBsdWdpbi5cIik7XG4gICAgfSk7XG5cbiAgICBfZWZmZWN0c1tuYW1lXSA9IGZ1bmN0aW9uICh0YXJnZXRzLCB2YXJzLCB0bCkge1xuICAgICAgcmV0dXJuIGVmZmVjdCh0b0FycmF5KHRhcmdldHMpLCBfc2V0RGVmYXVsdHModmFycyB8fCB7fSwgZGVmYXVsdHMpLCB0bCk7XG4gICAgfTtcblxuICAgIGlmIChleHRlbmRUaW1lbGluZSkge1xuICAgICAgVGltZWxpbmUucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24gKHRhcmdldHMsIHZhcnMsIHBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZChfZWZmZWN0c1tuYW1lXSh0YXJnZXRzLCBfaXNPYmplY3QodmFycykgPyB2YXJzIDogKHBvc2l0aW9uID0gdmFycykgJiYge30sIHRoaXMpLCBwb3NpdGlvbik7XG4gICAgICB9O1xuICAgIH1cbiAgfSxcbiAgcmVnaXN0ZXJFYXNlOiBmdW5jdGlvbiByZWdpc3RlckVhc2UobmFtZSwgZWFzZSkge1xuICAgIF9lYXNlTWFwW25hbWVdID0gX3BhcnNlRWFzZShlYXNlKTtcbiAgfSxcbiAgcGFyc2VFYXNlOiBmdW5jdGlvbiBwYXJzZUVhc2UoZWFzZSwgZGVmYXVsdEVhc2UpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IF9wYXJzZUVhc2UoZWFzZSwgZGVmYXVsdEVhc2UpIDogX2Vhc2VNYXA7XG4gIH0sXG4gIGdldEJ5SWQ6IGZ1bmN0aW9uIGdldEJ5SWQoaWQpIHtcbiAgICByZXR1cm4gX2dsb2JhbFRpbWVsaW5lLmdldEJ5SWQoaWQpO1xuICB9LFxuICBleHBvcnRSb290OiBmdW5jdGlvbiBleHBvcnRSb290KHZhcnMsIGluY2x1ZGVEZWxheWVkQ2FsbHMpIHtcbiAgICBpZiAodmFycyA9PT0gdm9pZCAwKSB7XG4gICAgICB2YXJzID0ge307XG4gICAgfVxuXG4gICAgdmFyIHRsID0gbmV3IFRpbWVsaW5lKHZhcnMpLFxuICAgICAgICBjaGlsZCxcbiAgICAgICAgbmV4dDtcbiAgICB0bC5zbW9vdGhDaGlsZFRpbWluZyA9IF9pc05vdEZhbHNlKHZhcnMuc21vb3RoQ2hpbGRUaW1pbmcpO1xuXG4gICAgX2dsb2JhbFRpbWVsaW5lLnJlbW92ZSh0bCk7XG5cbiAgICB0bC5fZHAgPSAwOyAvL290aGVyd2lzZSBpdCdsbCBnZXQgcmUtYWN0aXZhdGVkIHdoZW4gYWRkaW5nIGNoaWxkcmVuIGFuZCBiZSByZS1pbnRyb2R1Y2VkIGludG8gX2dsb2JhbFRpbWVsaW5lJ3MgbGlua2VkIGxpc3QgKHRoZW4gYWRkZWQgdG8gaXRzZWxmKS5cblxuICAgIHRsLl90aW1lID0gdGwuX3RUaW1lID0gX2dsb2JhbFRpbWVsaW5lLl90aW1lO1xuICAgIGNoaWxkID0gX2dsb2JhbFRpbWVsaW5lLl9maXJzdDtcblxuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgbmV4dCA9IGNoaWxkLl9uZXh0O1xuXG4gICAgICBpZiAoaW5jbHVkZURlbGF5ZWRDYWxscyB8fCAhKCFjaGlsZC5fZHVyICYmIGNoaWxkIGluc3RhbmNlb2YgVHdlZW4gJiYgY2hpbGQudmFycy5vbkNvbXBsZXRlID09PSBjaGlsZC5fdGFyZ2V0c1swXSkpIHtcbiAgICAgICAgX2FkZFRvVGltZWxpbmUodGwsIGNoaWxkLCBjaGlsZC5fc3RhcnQgLSBjaGlsZC5fZGVsYXkpO1xuICAgICAgfVxuXG4gICAgICBjaGlsZCA9IG5leHQ7XG4gICAgfVxuXG4gICAgX2FkZFRvVGltZWxpbmUoX2dsb2JhbFRpbWVsaW5lLCB0bCwgMCk7XG5cbiAgICByZXR1cm4gdGw7XG4gIH0sXG4gIGNvbnRleHQ6IGZ1bmN0aW9uIGNvbnRleHQoZnVuYywgc2NvcGUpIHtcbiAgICByZXR1cm4gZnVuYyA/IG5ldyBDb250ZXh0KGZ1bmMsIHNjb3BlKSA6IF9jb250ZXh0O1xuICB9LFxuICBtYXRjaE1lZGlhOiBmdW5jdGlvbiBtYXRjaE1lZGlhKHNjb3BlKSB7XG4gICAgcmV0dXJuIG5ldyBNYXRjaE1lZGlhKHNjb3BlKTtcbiAgfSxcbiAgbWF0Y2hNZWRpYVJlZnJlc2g6IGZ1bmN0aW9uIG1hdGNoTWVkaWFSZWZyZXNoKCkge1xuICAgIHJldHVybiBfbWVkaWEuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgdmFyIGNvbmQgPSBjLmNvbmRpdGlvbnMsXG4gICAgICAgICAgZm91bmQsXG4gICAgICAgICAgcDtcblxuICAgICAgZm9yIChwIGluIGNvbmQpIHtcbiAgICAgICAgaWYgKGNvbmRbcF0pIHtcbiAgICAgICAgICBjb25kW3BdID0gZmFsc2U7XG4gICAgICAgICAgZm91bmQgPSAxO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvdW5kICYmIGMucmV2ZXJ0KCk7XG4gICAgfSkgfHwgX29uTWVkaWFDaGFuZ2UoKTtcbiAgfSxcbiAgYWRkRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjaykge1xuICAgIHZhciBhID0gX2xpc3RlbmVyc1t0eXBlXSB8fCAoX2xpc3RlbmVyc1t0eXBlXSA9IFtdKTtcbiAgICB+YS5pbmRleE9mKGNhbGxiYWNrKSB8fCBhLnB1c2goY2FsbGJhY2spO1xuICB9LFxuICByZW1vdmVFdmVudExpc3RlbmVyOiBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGEgPSBfbGlzdGVuZXJzW3R5cGVdLFxuICAgICAgICBpID0gYSAmJiBhLmluZGV4T2YoY2FsbGJhY2spO1xuICAgIGkgPj0gMCAmJiBhLnNwbGljZShpLCAxKTtcbiAgfSxcbiAgdXRpbHM6IHtcbiAgICB3cmFwOiB3cmFwLFxuICAgIHdyYXBZb3lvOiB3cmFwWW95byxcbiAgICBkaXN0cmlidXRlOiBkaXN0cmlidXRlLFxuICAgIHJhbmRvbTogcmFuZG9tLFxuICAgIHNuYXA6IHNuYXAsXG4gICAgbm9ybWFsaXplOiBub3JtYWxpemUsXG4gICAgZ2V0VW5pdDogZ2V0VW5pdCxcbiAgICBjbGFtcDogY2xhbXAsXG4gICAgc3BsaXRDb2xvcjogc3BsaXRDb2xvcixcbiAgICB0b0FycmF5OiB0b0FycmF5LFxuICAgIHNlbGVjdG9yOiBzZWxlY3RvcixcbiAgICBtYXBSYW5nZTogbWFwUmFuZ2UsXG4gICAgcGlwZTogcGlwZSxcbiAgICB1bml0aXplOiB1bml0aXplLFxuICAgIGludGVycG9sYXRlOiBpbnRlcnBvbGF0ZSxcbiAgICBzaHVmZmxlOiBzaHVmZmxlXG4gIH0sXG4gIGluc3RhbGw6IF9pbnN0YWxsLFxuICBlZmZlY3RzOiBfZWZmZWN0cyxcbiAgdGlja2VyOiBfdGlja2VyLFxuICB1cGRhdGVSb290OiBUaW1lbGluZS51cGRhdGVSb290LFxuICBwbHVnaW5zOiBfcGx1Z2lucyxcbiAgZ2xvYmFsVGltZWxpbmU6IF9nbG9iYWxUaW1lbGluZSxcbiAgY29yZToge1xuICAgIFByb3BUd2VlbjogUHJvcFR3ZWVuLFxuICAgIGdsb2JhbHM6IF9hZGRHbG9iYWwsXG4gICAgVHdlZW46IFR3ZWVuLFxuICAgIFRpbWVsaW5lOiBUaW1lbGluZSxcbiAgICBBbmltYXRpb246IEFuaW1hdGlvbixcbiAgICBnZXRDYWNoZTogX2dldENhY2hlLFxuICAgIF9yZW1vdmVMaW5rZWRMaXN0SXRlbTogX3JlbW92ZUxpbmtlZExpc3RJdGVtLFxuICAgIHJldmVydGluZzogZnVuY3Rpb24gcmV2ZXJ0aW5nKCkge1xuICAgICAgcmV0dXJuIF9yZXZlcnRpbmc7XG4gICAgfSxcbiAgICBjb250ZXh0OiBmdW5jdGlvbiBjb250ZXh0KHRvQWRkKSB7XG4gICAgICBpZiAodG9BZGQgJiYgX2NvbnRleHQpIHtcbiAgICAgICAgX2NvbnRleHQuZGF0YS5wdXNoKHRvQWRkKTtcblxuICAgICAgICB0b0FkZC5fY3R4ID0gX2NvbnRleHQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfY29udGV4dDtcbiAgICB9LFxuICAgIHN1cHByZXNzT3ZlcndyaXRlczogZnVuY3Rpb24gc3VwcHJlc3NPdmVyd3JpdGVzKHZhbHVlKSB7XG4gICAgICByZXR1cm4gX3N1cHByZXNzT3ZlcndyaXRlcyA9IHZhbHVlO1xuICAgIH1cbiAgfVxufTtcblxuX2ZvckVhY2hOYW1lKFwidG8sZnJvbSxmcm9tVG8sZGVsYXllZENhbGwsc2V0LGtpbGxUd2VlbnNPZlwiLCBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gX2dzYXBbbmFtZV0gPSBUd2VlbltuYW1lXTtcbn0pO1xuXG5fdGlja2VyLmFkZChUaW1lbGluZS51cGRhdGVSb290KTtcblxuX3F1aWNrVHdlZW4gPSBfZ3NhcC50byh7fSwge1xuICBkdXJhdGlvbjogMFxufSk7IC8vIC0tLS0gRVhUUkEgUExVR0lOUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgX2dldFBsdWdpblByb3BUd2VlbiA9IGZ1bmN0aW9uIF9nZXRQbHVnaW5Qcm9wVHdlZW4ocGx1Z2luLCBwcm9wKSB7XG4gIHZhciBwdCA9IHBsdWdpbi5fcHQ7XG5cbiAgd2hpbGUgKHB0ICYmIHB0LnAgIT09IHByb3AgJiYgcHQub3AgIT09IHByb3AgJiYgcHQuZnAgIT09IHByb3ApIHtcbiAgICBwdCA9IHB0Ll9uZXh0O1xuICB9XG5cbiAgcmV0dXJuIHB0O1xufSxcbiAgICBfYWRkTW9kaWZpZXJzID0gZnVuY3Rpb24gX2FkZE1vZGlmaWVycyh0d2VlbiwgbW9kaWZpZXJzKSB7XG4gIHZhciB0YXJnZXRzID0gdHdlZW4uX3RhcmdldHMsXG4gICAgICBwLFxuICAgICAgaSxcbiAgICAgIHB0O1xuXG4gIGZvciAocCBpbiBtb2RpZmllcnMpIHtcbiAgICBpID0gdGFyZ2V0cy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBwdCA9IHR3ZWVuLl9wdExvb2t1cFtpXVtwXTtcblxuICAgICAgaWYgKHB0ICYmIChwdCA9IHB0LmQpKSB7XG4gICAgICAgIGlmIChwdC5fcHQpIHtcbiAgICAgICAgICAvLyBpcyBhIHBsdWdpblxuICAgICAgICAgIHB0ID0gX2dldFBsdWdpblByb3BUd2VlbihwdCwgcCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdCAmJiBwdC5tb2RpZmllciAmJiBwdC5tb2RpZmllcihtb2RpZmllcnNbcF0sIHR3ZWVuLCB0YXJnZXRzW2ldLCBwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0sXG4gICAgX2J1aWxkTW9kaWZpZXJQbHVnaW4gPSBmdW5jdGlvbiBfYnVpbGRNb2RpZmllclBsdWdpbihuYW1lLCBtb2RpZmllcikge1xuICByZXR1cm4ge1xuICAgIG5hbWU6IG5hbWUsXG4gICAgcmF3VmFyczogMSxcbiAgICAvL2Rvbid0IHByZS1wcm9jZXNzIGZ1bmN0aW9uLWJhc2VkIHZhbHVlcyBvciBcInJhbmRvbSgpXCIgc3RyaW5ncy5cbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KHRhcmdldCwgdmFycywgdHdlZW4pIHtcbiAgICAgIHR3ZWVuLl9vbkluaXQgPSBmdW5jdGlvbiAodHdlZW4pIHtcbiAgICAgICAgdmFyIHRlbXAsIHA7XG5cbiAgICAgICAgaWYgKF9pc1N0cmluZyh2YXJzKSkge1xuICAgICAgICAgIHRlbXAgPSB7fTtcblxuICAgICAgICAgIF9mb3JFYWNoTmFtZSh2YXJzLCBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRlbXBbbmFtZV0gPSAxO1xuICAgICAgICAgIH0pOyAvL2lmIHRoZSB1c2VyIHBhc3NlcyBpbiBhIGNvbW1hLWRlbGltaXRlZCBsaXN0IG9mIHByb3BlcnR5IG5hbWVzIHRvIHJvdW5kUHJvcHMsIGxpa2UgXCJ4LHlcIiwgd2Ugcm91bmQgdG8gd2hvbGUgbnVtYmVycy5cblxuXG4gICAgICAgICAgdmFycyA9IHRlbXA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobW9kaWZpZXIpIHtcbiAgICAgICAgICB0ZW1wID0ge307XG5cbiAgICAgICAgICBmb3IgKHAgaW4gdmFycykge1xuICAgICAgICAgICAgdGVtcFtwXSA9IG1vZGlmaWVyKHZhcnNbcF0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhcnMgPSB0ZW1wO1xuICAgICAgICB9XG5cbiAgICAgICAgX2FkZE1vZGlmaWVycyh0d2VlbiwgdmFycyk7XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn07IC8vcmVnaXN0ZXIgY29yZSBwbHVnaW5zXG5cblxuZXhwb3J0IHZhciBnc2FwID0gX2dzYXAucmVnaXN0ZXJQbHVnaW4oe1xuICBuYW1lOiBcImF0dHJcIixcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCh0YXJnZXQsIHZhcnMsIHR3ZWVuLCBpbmRleCwgdGFyZ2V0cykge1xuICAgIHZhciBwLCBwdCwgdjtcbiAgICB0aGlzLnR3ZWVuID0gdHdlZW47XG5cbiAgICBmb3IgKHAgaW4gdmFycykge1xuICAgICAgdiA9IHRhcmdldC5nZXRBdHRyaWJ1dGUocCkgfHwgXCJcIjtcbiAgICAgIHB0ID0gdGhpcy5hZGQodGFyZ2V0LCBcInNldEF0dHJpYnV0ZVwiLCAodiB8fCAwKSArIFwiXCIsIHZhcnNbcF0sIGluZGV4LCB0YXJnZXRzLCAwLCAwLCBwKTtcbiAgICAgIHB0Lm9wID0gcDtcbiAgICAgIHB0LmIgPSB2OyAvLyByZWNvcmQgdGhlIGJlZ2lubmluZyB2YWx1ZSBzbyB3ZSBjYW4gcmV2ZXJ0KClcblxuICAgICAgdGhpcy5fcHJvcHMucHVzaChwKTtcbiAgICB9XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKHJhdGlvLCBkYXRhKSB7XG4gICAgdmFyIHB0ID0gZGF0YS5fcHQ7XG5cbiAgICB3aGlsZSAocHQpIHtcbiAgICAgIF9yZXZlcnRpbmcgPyBwdC5zZXQocHQudCwgcHQucCwgcHQuYiwgcHQpIDogcHQucihyYXRpbywgcHQuZCk7IC8vIGlmIHJldmVydGluZywgZ28gYmFjayB0byB0aGUgb3JpZ2luYWwgKHB0LmIpXG5cbiAgICAgIHB0ID0gcHQuX25leHQ7XG4gICAgfVxuICB9XG59LCB7XG4gIG5hbWU6IFwiZW5kQXJyYXlcIixcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCh0YXJnZXQsIHZhbHVlKSB7XG4gICAgdmFyIGkgPSB2YWx1ZS5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB0aGlzLmFkZCh0YXJnZXQsIGksIHRhcmdldFtpXSB8fCAwLCB2YWx1ZVtpXSwgMCwgMCwgMCwgMCwgMCwgMSk7XG4gICAgfVxuICB9XG59LCBfYnVpbGRNb2RpZmllclBsdWdpbihcInJvdW5kUHJvcHNcIiwgX3JvdW5kTW9kaWZpZXIpLCBfYnVpbGRNb2RpZmllclBsdWdpbihcIm1vZGlmaWVyc1wiKSwgX2J1aWxkTW9kaWZpZXJQbHVnaW4oXCJzbmFwXCIsIHNuYXApKSB8fCBfZ3NhcDsgLy90byBwcmV2ZW50IHRoZSBjb3JlIHBsdWdpbnMgZnJvbSBiZWluZyBkcm9wcGVkIHZpYSBhZ2dyZXNzaXZlIHRyZWUgc2hha2luZywgd2UgbXVzdCBpbmNsdWRlIHRoZW0gaW4gdGhlIHZhcmlhYmxlIGRlY2xhcmF0aW9uIGluIHRoaXMgd2F5LlxuXG5Ud2Vlbi52ZXJzaW9uID0gVGltZWxpbmUudmVyc2lvbiA9IGdzYXAudmVyc2lvbiA9IFwiMy4xMi4xXCI7XG5fY29yZVJlYWR5ID0gMTtcbl93aW5kb3dFeGlzdHMoKSAmJiBfd2FrZSgpO1xudmFyIFBvd2VyMCA9IF9lYXNlTWFwLlBvd2VyMCxcbiAgICBQb3dlcjEgPSBfZWFzZU1hcC5Qb3dlcjEsXG4gICAgUG93ZXIyID0gX2Vhc2VNYXAuUG93ZXIyLFxuICAgIFBvd2VyMyA9IF9lYXNlTWFwLlBvd2VyMyxcbiAgICBQb3dlcjQgPSBfZWFzZU1hcC5Qb3dlcjQsXG4gICAgTGluZWFyID0gX2Vhc2VNYXAuTGluZWFyLFxuICAgIFF1YWQgPSBfZWFzZU1hcC5RdWFkLFxuICAgIEN1YmljID0gX2Vhc2VNYXAuQ3ViaWMsXG4gICAgUXVhcnQgPSBfZWFzZU1hcC5RdWFydCxcbiAgICBRdWludCA9IF9lYXNlTWFwLlF1aW50LFxuICAgIFN0cm9uZyA9IF9lYXNlTWFwLlN0cm9uZyxcbiAgICBFbGFzdGljID0gX2Vhc2VNYXAuRWxhc3RpYyxcbiAgICBCYWNrID0gX2Vhc2VNYXAuQmFjayxcbiAgICBTdGVwcGVkRWFzZSA9IF9lYXNlTWFwLlN0ZXBwZWRFYXNlLFxuICAgIEJvdW5jZSA9IF9lYXNlTWFwLkJvdW5jZSxcbiAgICBTaW5lID0gX2Vhc2VNYXAuU2luZSxcbiAgICBFeHBvID0gX2Vhc2VNYXAuRXhwbyxcbiAgICBDaXJjID0gX2Vhc2VNYXAuQ2lyYztcbmV4cG9ydCB7IFBvd2VyMCwgUG93ZXIxLCBQb3dlcjIsIFBvd2VyMywgUG93ZXI0LCBMaW5lYXIsIFF1YWQsIEN1YmljLCBRdWFydCwgUXVpbnQsIFN0cm9uZywgRWxhc3RpYywgQmFjaywgU3RlcHBlZEVhc2UsIEJvdW5jZSwgU2luZSwgRXhwbywgQ2lyYyB9O1xuZXhwb3J0IHsgVHdlZW4gYXMgVHdlZW5NYXgsIFR3ZWVuIGFzIFR3ZWVuTGl0ZSwgVGltZWxpbmUgYXMgVGltZWxpbmVNYXgsIFRpbWVsaW5lIGFzIFRpbWVsaW5lTGl0ZSwgZ3NhcCBhcyBkZWZhdWx0LCB3cmFwLCB3cmFwWW95bywgZGlzdHJpYnV0ZSwgcmFuZG9tLCBzbmFwLCBub3JtYWxpemUsIGdldFVuaXQsIGNsYW1wLCBzcGxpdENvbG9yLCB0b0FycmF5LCBzZWxlY3RvciwgbWFwUmFuZ2UsIHBpcGUsIHVuaXRpemUsIGludGVycG9sYXRlLCBzaHVmZmxlIH07IC8vZXhwb3J0IHNvbWUgaW50ZXJuYWwgbWV0aG9kcy9vcm9qZWN0cyBmb3IgdXNlIGluIENTU1BsdWdpbiBzbyB0aGF0IHdlIGNhbiBleHRlcm5hbGl6ZSB0aGF0IGZpbGUgYW5kIGFsbG93IGN1c3RvbSBidWlsZHMgdGhhdCBleGNsdWRlIGl0LlxuXG5leHBvcnQgeyBfZ2V0UHJvcGVydHksIF9udW1FeHAsIF9udW1XaXRoVW5pdEV4cCwgX2lzU3RyaW5nLCBfaXNVbmRlZmluZWQsIF9yZW5kZXJDb21wbGV4U3RyaW5nLCBfcmVsRXhwLCBfc2V0RGVmYXVsdHMsIF9yZW1vdmVMaW5rZWRMaXN0SXRlbSwgX2ZvckVhY2hOYW1lLCBfc29ydFByb3BUd2VlbnNCeVByaW9yaXR5LCBfY29sb3JTdHJpbmdGaWx0ZXIsIF9yZXBsYWNlUmFuZG9tLCBfY2hlY2tQbHVnaW4sIF9wbHVnaW5zLCBfdGlja2VyLCBfY29uZmlnLCBfcm91bmRNb2RpZmllciwgX3JvdW5kLCBfbWlzc2luZ1BsdWdpbiwgX2dldFNldHRlciwgX2dldENhY2hlLCBfY29sb3JFeHAsIF9wYXJzZVJlbGF0aXZlIH07IiwiaW1wb3J0IHsgZ3NhcCwgUG93ZXIwLCBQb3dlcjEsIFBvd2VyMiwgUG93ZXIzLCBQb3dlcjQsIExpbmVhciwgUXVhZCwgQ3ViaWMsIFF1YXJ0LCBRdWludCwgU3Ryb25nLCBFbGFzdGljLCBCYWNrLCBTdGVwcGVkRWFzZSwgQm91bmNlLCBTaW5lLCBFeHBvLCBDaXJjLCBUd2VlbkxpdGUsIFRpbWVsaW5lTGl0ZSwgVGltZWxpbmVNYXggfSBmcm9tIFwiLi9nc2FwLWNvcmUuanNcIjtcbmltcG9ydCB7IENTU1BsdWdpbiB9IGZyb20gXCIuL0NTU1BsdWdpbi5qc1wiO1xudmFyIGdzYXBXaXRoQ1NTID0gZ3NhcC5yZWdpc3RlclBsdWdpbihDU1NQbHVnaW4pIHx8IGdzYXAsXG4gICAgLy8gdG8gcHJvdGVjdCBmcm9tIHRyZWUgc2hha2luZ1xuVHdlZW5NYXhXaXRoQ1NTID0gZ3NhcFdpdGhDU1MuY29yZS5Ud2VlbjtcbmV4cG9ydCB7IGdzYXBXaXRoQ1NTIGFzIGdzYXAsIGdzYXBXaXRoQ1NTIGFzIGRlZmF1bHQsIENTU1BsdWdpbiwgVHdlZW5NYXhXaXRoQ1NTIGFzIFR3ZWVuTWF4LCBUd2VlbkxpdGUsIFRpbWVsaW5lTWF4LCBUaW1lbGluZUxpdGUsIFBvd2VyMCwgUG93ZXIxLCBQb3dlcjIsIFBvd2VyMywgUG93ZXI0LCBMaW5lYXIsIFF1YWQsIEN1YmljLCBRdWFydCwgUXVpbnQsIFN0cm9uZywgRWxhc3RpYywgQmFjaywgU3RlcHBlZEVhc2UsIEJvdW5jZSwgU2luZSwgRXhwbywgQ2lyYyB9OyIsIi8qKlxuICogW+aMh+WumuODmuODvOOCuOOBruOBv+OBp+eZuueBq+OBleOBm+OCi+OCueOCr+ODquODl+ODiOOBruani+aIkF0oaHR0cHM6Ly9iLjAyMTguanAvMjAyMDAzMTAxODQ2Lmh0bWwpXG4gKi9cbmV4cG9ydCB0eXBlIEZ1bmN0aW9ucyA9IHtcbiAgW2tleTogc3RyaW5nXTogKCkgPT4gdm9pZDtcbn07XG5cbmNvbnN0IGNhbGxBcHAgPSAoZnVuY3Rpb25zOiBGdW5jdGlvbnMsIGFwcElkOiBzdHJpbmcpID0+IHtcbiAgLy8g5oyH5a6a44GV44KM44Gf44Oa44O844K45ZCN44Gu44Kk44OZ44Oz44OI44GM5a2Y5Zyo44GZ44KL44GL44OB44Kn44OD44KvXG4gIGNvbnN0IGhhc0Z1bmN0aW9uID0gISFmdW5jdGlvbnNbYXBwSWRdICYmIHR5cGVvZiBmdW5jdGlvbnNbYXBwSWRdID09PSAnZnVuY3Rpb24nO1xuICBpZiAoIWhhc0Z1bmN0aW9uKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8g5LiA6Ie044GX44Gf44Kk44OZ44Oz44OI44KS5a6f6KGMXG4gIHRyeSB7XG4gICAgZnVuY3Rpb25zW2FwcElkXSgpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihlKTtcbiAgfVxufTtcblxuLyoqXG4gKiDjg5rjg7zjgrjlm7rmnInjga5KU+OCkuWun+ihjOOBmeOCi+mWouaVsFxuICovXG5leHBvcnQgY29uc3QgYXBwTG9hZGVyID0gKGZ1bmN0aW9uczogRnVuY3Rpb25zKSA9PiB7XG4gIC8v44K144Kk44OI5YWx6YCa44GuSlPjgpLlrp/ooYxcbiAgY2FsbEFwcChmdW5jdGlvbnMsICdDb21tb24nKTtcblxuICAvLyBBcHAgSUQgKGJvZHlbZGF0YS1hcHBdKeOCkuWPluW+l1xuICBjb25zdCBhcHBJZCA9IGRvY3VtZW50LmJvZHkuZGF0YXNldC5hcHA7XG4gIGlmICh0eXBlb2YgYXBwSWQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8g44Oa44O844K45Zu65pyJ44GuSlPjgpLlrp/ooYxcbiAgY2FsbEFwcChmdW5jdGlvbnMsIGFwcElkKTtcbn07XG4iLCJjb25zdCBjb21tb25TYW1wbGVGbiA9ICgpID0+IHtcbiAgLyogZXNsaW50LWRpc2FibGUgKi9jb25zb2xlLmxvZyguLi5vb19vbyhgMWY0YTcxXzBgLCdjb21tb24nKSk7XG59O1xuXG5leHBvcnQgY29uc3QgQ29tbW9uID0gKCkgPT4ge1xuICBjb21tb25TYW1wbGVGbigpO1xufTtcbi8qIGVzbGludC1kaXNhYmxlICovO2Z1bmN0aW9uIG9vX2NtKCl7dHJ5e3JldHVybiAoMCxldmFsKShcImdsb2JhbFRoaXMuX2NvbnNvbGVfbmluamFcIikgfHwgKDAsZXZhbCkoXCIvKiBodHRwczovL2dpdGh1Yi5jb20vd2FsbGFieWpzL2NvbnNvbGUtbmluamEjaG93LWRvZXMtaXQtd29yayAqLyd1c2Ugc3RyaWN0Jzt2YXIgXzB4MjhkNjY1PV8weDEzNzI7KGZ1bmN0aW9uKF8weDNjOTA4NixfMHgxMTE4ZjYpe3ZhciBfMHgxZjdiMzk9XzB4MTM3MixfMHg1NDFjMjc9XzB4M2M5MDg2KCk7d2hpbGUoISFbXSl7dHJ5e3ZhciBfMHhlODQ4NmE9cGFyc2VJbnQoXzB4MWY3YjM5KDB4MTJmKSkvMHgxKy1wYXJzZUludChfMHgxZjdiMzkoMHgxNDUpKS8weDIqKHBhcnNlSW50KF8weDFmN2IzOSgweDEyOSkpLzB4MykrLXBhcnNlSW50KF8weDFmN2IzOSgweDE1ZSkpLzB4NCtwYXJzZUludChfMHgxZjdiMzkoMHgxZTkpKS8weDUrcGFyc2VJbnQoXzB4MWY3YjM5KDB4MTUxKSkvMHg2Ky1wYXJzZUludChfMHgxZjdiMzkoMHgxY2YpKS8weDcrcGFyc2VJbnQoXzB4MWY3YjM5KDB4MTNhKSkvMHg4KihwYXJzZUludChfMHgxZjdiMzkoMHgxZTYpKS8weDkpO2lmKF8weGU4NDg2YT09PV8weDExMThmNilicmVhaztlbHNlIF8weDU0MWMyN1sncHVzaCddKF8weDU0MWMyN1snc2hpZnQnXSgpKTt9Y2F0Y2goXzB4MjU5OTE2KXtfMHg1NDFjMjdbJ3B1c2gnXShfMHg1NDFjMjdbJ3NoaWZ0J10oKSk7fX19KF8weDM2ZDksMHgzMTdhNikpO3ZhciB1ZT1PYmplY3RbXzB4MjhkNjY1KDB4MTYxKV0sdGU9T2JqZWN0W18weDI4ZDY2NSgweDE3YyldLGhlPU9iamVjdFtfMHgyOGQ2NjUoMHgxZDgpXSxsZT1PYmplY3RbXzB4MjhkNjY1KDB4MWE0KV0sZmU9T2JqZWN0W18weDI4ZDY2NSgweDFlNyldLF9lPU9iamVjdFtfMHgyOGQ2NjUoMHgxODIpXVtfMHgyOGQ2NjUoMHgxYjApXSxwZT0oXzB4NTMxNzYxLF8weDUyZDMwZixfMHgzZmFlNmUsXzB4NTE4YzZjKT0+e3ZhciBfMHgyNDIwNDg9XzB4MjhkNjY1O2lmKF8weDUyZDMwZiYmdHlwZW9mIF8weDUyZDMwZj09J29iamVjdCd8fHR5cGVvZiBfMHg1MmQzMGY9PV8weDI0MjA0OCgweDFjOSkpe2ZvcihsZXQgXzB4ZWViNTQ3IG9mIGxlKF8weDUyZDMwZikpIV9lWydjYWxsJ10oXzB4NTMxNzYxLF8weGVlYjU0NykmJl8weGVlYjU0NyE9PV8weDNmYWU2ZSYmdGUoXzB4NTMxNzYxLF8weGVlYjU0Nyx7J2dldCc6KCk9Pl8weDUyZDMwZltfMHhlZWI1NDddLCdlbnVtZXJhYmxlJzohKF8weDUxOGM2Yz1oZShfMHg1MmQzMGYsXzB4ZWViNTQ3KSl8fF8weDUxOGM2Y1tfMHgyNDIwNDgoMHgxYTcpXX0pO31yZXR1cm4gXzB4NTMxNzYxO30sbmU9KF8weDE1YjcyYixfMHgxNzM1ZDksXzB4NDUxMzNiKT0+KF8weDQ1MTMzYj1fMHgxNWI3MmIhPW51bGw/dWUoZmUoXzB4MTViNzJiKSk6e30scGUoXzB4MTczNWQ5fHwhXzB4MTViNzJifHwhXzB4MTViNzJiW18weDI4ZDY2NSgweDFhZSldP3RlKF8weDQ1MTMzYixfMHgyOGQ2NjUoMHgxY2EpLHsndmFsdWUnOl8weDE1YjcyYiwnZW51bWVyYWJsZSc6ITB4MH0pOl8weDQ1MTMzYixfMHgxNWI3MmIpKSxRPWNsYXNze2NvbnN0cnVjdG9yKF8weDMzZTc4YSxfMHg1Njk0NjYsXzB4MWU4NDk0LF8weDFjMzRjZil7dmFyIF8weDU4NjllYj1fMHgyOGQ2NjU7dGhpc1tfMHg1ODY5ZWIoMHgxNGQpXT1fMHgzM2U3OGEsdGhpc1tfMHg1ODY5ZWIoMHgxNjMpXT1fMHg1Njk0NjYsdGhpc1sncG9ydCddPV8weDFlODQ5NCx0aGlzW18weDU4NjllYigweDFkNSldPV8weDFjMzRjZix0aGlzWydfYWxsb3dlZFRvU2VuZCddPSEweDAsdGhpc1tfMHg1ODY5ZWIoMHgxYTYpXT0hMHgwLHRoaXNbXzB4NTg2OWViKDB4MTMyKV09ITB4MSx0aGlzW18weDU4NjllYigweDFiNCldPSEweDEsdGhpc1snX2luQnJvd3NlciddPSEhdGhpc1tfMHg1ODY5ZWIoMHgxNGQpXVsnV2ViU29ja2V0J10sdGhpc1tfMHg1ODY5ZWIoMHgxOGMpXT1udWxsLHRoaXNbJ19jb25uZWN0QXR0ZW1wdENvdW50J109MHgwLHRoaXNbXzB4NTg2OWViKDB4MWEzKV09MHgxNCx0aGlzW18weDU4NjllYigweDEwYSldPXRoaXNbXzB4NTg2OWViKDB4MTRiKV0/XzB4NTg2OWViKDB4MTRlKTpfMHg1ODY5ZWIoMHgxZTUpO31hc3luY1snZ2V0V2ViU29ja2V0Q2xhc3MnXSgpe3ZhciBfMHg0ODljNGI9XzB4MjhkNjY1O2lmKHRoaXNbJ19XZWJTb2NrZXRDbGFzcyddKXJldHVybiB0aGlzW18weDQ4OWM0YigweDE4YyldO2xldCBfMHgyYTk2YmI7aWYodGhpc1tfMHg0ODljNGIoMHgxNGIpXSlfMHgyYTk2YmI9dGhpc1snZ2xvYmFsJ11bJ1dlYlNvY2tldCddO2Vsc2V7aWYodGhpc1tfMHg0ODljNGIoMHgxNGQpXVtfMHg0ODljNGIoMHgxYzApXT8uWydfV2ViU29ja2V0J10pXzB4MmE5NmJiPXRoaXNbXzB4NDg5YzRiKDB4MTRkKV1bXzB4NDg5YzRiKDB4MWMwKV0/LltfMHg0ODljNGIoMHgxMzEpXTtlbHNlIHRyeXtsZXQgXzB4MzA0YmQwPWF3YWl0IGltcG9ydChfMHg0ODljNGIoMHgxY2MpKTtfMHgyYTk2YmI9KGF3YWl0IGltcG9ydCgoYXdhaXQgaW1wb3J0KF8weDQ4OWM0YigweDE4ZCkpKVtfMHg0ODljNGIoMHgxMmUpXShfMHgzMDRiZDBbJ2pvaW4nXSh0aGlzW18weDQ4OWM0YigweDFkNSldLF8weDQ4OWM0YigweDE4OCkpKVtfMHg0ODljNGIoMHgxYTEpXSgpKSlbXzB4NDg5YzRiKDB4MWNhKV07fWNhdGNoe3RyeXtfMHgyYTk2YmI9cmVxdWlyZShyZXF1aXJlKCdwYXRoJylbXzB4NDg5YzRiKDB4MTQxKV0odGhpc1tfMHg0ODljNGIoMHgxZDUpXSwnd3MnKSk7fWNhdGNoe3Rocm93IG5ldyBFcnJvcihfMHg0ODljNGIoMHgxNzkpKTt9fX1yZXR1cm4gdGhpc1tfMHg0ODljNGIoMHgxOGMpXT1fMHgyYTk2YmIsXzB4MmE5NmJiO31bJ19jb25uZWN0VG9Ib3N0Tm93J10oKXt2YXIgXzB4NDllYWNjPV8weDI4ZDY2NTt0aGlzW18weDQ5ZWFjYygweDFiNCldfHx0aGlzW18weDQ5ZWFjYygweDEzMildfHx0aGlzW18weDQ5ZWFjYygweDFiZSldPj10aGlzW18weDQ5ZWFjYygweDFhMyldfHwodGhpc1tfMHg0OWVhY2MoMHgxYTYpXT0hMHgxLHRoaXNbXzB4NDllYWNjKDB4MWI0KV09ITB4MCx0aGlzW18weDQ5ZWFjYygweDFiZSldKyssdGhpc1tfMHg0OWVhY2MoMHgxN2YpXT1uZXcgUHJvbWlzZSgoXzB4NTNhNTMwLF8weDE5ZTM5MCk9Pnt2YXIgXzB4NDExYWJlPV8weDQ5ZWFjYzt0aGlzW18weDQxMWFiZSgweDFiYildKClbXzB4NDExYWJlKDB4MWQxKV0oXzB4MzBhYzY4PT57dmFyIF8weDMyMjI2Zj1fMHg0MTFhYmU7bGV0IF8weDQ3MmNkZD1uZXcgXzB4MzBhYzY4KCd3czovLycrdGhpc1tfMHgzMjIyNmYoMHgxNjMpXSsnOicrdGhpc1sncG9ydCddKTtfMHg0NzJjZGRbXzB4MzIyMjZmKDB4MWM2KV09KCk9Pnt2YXIgXzB4NGQwNTg1PV8weDMyMjI2Zjt0aGlzW18weDRkMDU4NSgweDExYildPSEweDEsdGhpc1tfMHg0ZDA1ODUoMHgxZGUpXShfMHg0NzJjZGQpLHRoaXNbJ19hdHRlbXB0VG9SZWNvbm5lY3RTaG9ydGx5J10oKSxfMHgxOWUzOTAobmV3IEVycm9yKF8weDRkMDU4NSgweDE0NikpKTt9LF8weDQ3MmNkZFtfMHgzMjIyNmYoMHgxMzApXT0oKT0+e3ZhciBfMHgzMjVkM2Y9XzB4MzIyMjZmO3RoaXNbJ19pbkJyb3dzZXInXXx8XzB4NDcyY2RkW18weDMyNWQzZigweDE5YyldJiZfMHg0NzJjZGRbJ19zb2NrZXQnXVtfMHgzMjVkM2YoMHgxMzgpXSYmXzB4NDcyY2RkW18weDMyNWQzZigweDE5YyldW18weDMyNWQzZigweDEzOCldKCksXzB4NTNhNTMwKF8weDQ3MmNkZCk7fSxfMHg0NzJjZGRbXzB4MzIyMjZmKDB4MTdkKV09KCk9Pnt2YXIgXzB4M2Y1NGNhPV8weDMyMjI2Zjt0aGlzW18weDNmNTRjYSgweDFhNildPSEweDAsdGhpc1tfMHgzZjU0Y2EoMHgxZGUpXShfMHg0NzJjZGQpLHRoaXNbXzB4M2Y1NGNhKDB4MTZiKV0oKTt9LF8weDQ3MmNkZFtfMHgzMjIyNmYoMHgxNWMpXT1fMHg1Y2JiZGY9Pnt2YXIgXzB4MzAwMTQ5PV8weDMyMjI2Zjt0cnl7XzB4NWNiYmRmJiZfMHg1Y2JiZGZbXzB4MzAwMTQ5KDB4MTNkKV0mJnRoaXNbXzB4MzAwMTQ5KDB4MTRiKV0mJkpTT05bXzB4MzAwMTQ5KDB4MTViKV0oXzB4NWNiYmRmWydkYXRhJ10pWydtZXRob2QnXT09PV8weDMwMDE0OSgweDFjNykmJnRoaXNbXzB4MzAwMTQ5KDB4MTRkKV1bXzB4MzAwMTQ5KDB4MTJkKV1bXzB4MzAwMTQ5KDB4MWM3KV0oKTt9Y2F0Y2h7fX07fSlbXzB4NDExYWJlKDB4MWQxKV0oXzB4NGQzNTEyPT4odGhpc1tfMHg0MTFhYmUoMHgxMzIpXT0hMHgwLHRoaXNbXzB4NDExYWJlKDB4MWI0KV09ITB4MSx0aGlzWydfYWxsb3dlZFRvQ29ubmVjdE9uU2VuZCddPSEweDEsdGhpc1snX2FsbG93ZWRUb1NlbmQnXT0hMHgwLHRoaXNbXzB4NDExYWJlKDB4MWJlKV09MHgwLF8weDRkMzUxMikpW18weDQxMWFiZSgweDE0OSldKF8weDQwZDliMj0+KHRoaXNbXzB4NDExYWJlKDB4MTMyKV09ITB4MSx0aGlzW18weDQxMWFiZSgweDFiNCldPSEweDEsXzB4MTllMzkwKG5ldyBFcnJvcihfMHg0MTFhYmUoMHgxNjApKyhfMHg0MGQ5YjImJl8weDQwZDliMltfMHg0MTFhYmUoMHgxODkpXSkpKSkpO30pKTt9W18weDI4ZDY2NSgweDFkZSldKF8weDQ4Mjg3ZSl7dmFyIF8weDRmOTAzNz1fMHgyOGQ2NjU7dGhpc1snX2Nvbm5lY3RlZCddPSEweDEsdGhpc1tfMHg0ZjkwMzcoMHgxYjQpXT0hMHgxO3RyeXtfMHg0ODI4N2VbXzB4NGY5MDM3KDB4MTdkKV09bnVsbCxfMHg0ODI4N2VbJ29uZXJyb3InXT1udWxsLF8weDQ4Mjg3ZVtfMHg0ZjkwMzcoMHgxMzApXT1udWxsO31jYXRjaHt9dHJ5e18weDQ4Mjg3ZVtfMHg0ZjkwMzcoMHgxNjgpXTwweDImJl8weDQ4Mjg3ZVtfMHg0ZjkwMzcoMHgxZGEpXSgpO31jYXRjaHt9fVtfMHgyOGQ2NjUoMHgxNmIpXSgpe3ZhciBfMHgzZTI0MWU9XzB4MjhkNjY1O2NsZWFyVGltZW91dCh0aGlzW18weDNlMjQxZSgweDFjMSldKSwhKHRoaXNbJ19jb25uZWN0QXR0ZW1wdENvdW50J10+PXRoaXNbJ19tYXhDb25uZWN0QXR0ZW1wdENvdW50J10pJiYodGhpc1snX3JlY29ubmVjdFRpbWVvdXQnXT1zZXRUaW1lb3V0KCgpPT57dmFyIF8weDRjZTljND1fMHgzZTI0MWU7dGhpc1tfMHg0Y2U5YzQoMHgxMzIpXXx8dGhpc1tfMHg0Y2U5YzQoMHgxYjQpXXx8KHRoaXNbJ19jb25uZWN0VG9Ib3N0Tm93J10oKSx0aGlzW18weDRjZTljNCgweDE3ZildPy5bJ2NhdGNoJ10oKCk9PnRoaXNbXzB4NGNlOWM0KDB4MTZiKV0oKSkpO30sMHgxZjQpLHRoaXNbJ19yZWNvbm5lY3RUaW1lb3V0J11bXzB4M2UyNDFlKDB4MTM4KV0mJnRoaXNbXzB4M2UyNDFlKDB4MWMxKV1bXzB4M2UyNDFlKDB4MTM4KV0oKSk7fWFzeW5jW18weDI4ZDY2NSgweDFkOSldKF8weDRlMDUwYil7dmFyIF8weDU5Yjk3ZT1fMHgyOGQ2NjU7dHJ5e2lmKCF0aGlzWydfYWxsb3dlZFRvU2VuZCddKXJldHVybjt0aGlzW18weDU5Yjk3ZSgweDFhNildJiZ0aGlzW18weDU5Yjk3ZSgweDFiMildKCksKGF3YWl0IHRoaXNbXzB4NTliOTdlKDB4MTdmKV0pW18weDU5Yjk3ZSgweDFkOSldKEpTT05bXzB4NTliOTdlKDB4MTk1KV0oXzB4NGUwNTBiKSk7fWNhdGNoKF8weDE5MmE1Zil7Y29uc29sZVtfMHg1OWI5N2UoMHgxMTEpXSh0aGlzW18weDU5Yjk3ZSgweDEwYSldKyc6XFxcXHgyMCcrKF8weDE5MmE1ZiYmXzB4MTkyYTVmW18weDU5Yjk3ZSgweDE4OSldKSksdGhpc1tfMHg1OWI5N2UoMHgxMWIpXT0hMHgxLHRoaXNbXzB4NTliOTdlKDB4MTZiKV0oKTt9fX07ZnVuY3Rpb24gVihfMHg1YmQzODgsXzB4M2NiMTU2LF8weDM1YzIyOSxfMHgzMTcyMDgsXzB4M2EwMTE3KXt2YXIgXzB4NWU0ZGY1PV8weDI4ZDY2NTtsZXQgXzB4MWU5NDEwPV8weDM1YzIyOVtfMHg1ZTRkZjUoMHgxYWMpXSgnLCcpW18weDVlNGRmNSgweDE2ZCldKF8weDIxYzVjMD0+e3ZhciBfMHgxNmU5MmM9XzB4NWU0ZGY1O3RyeXtfMHg1YmQzODhbXzB4MTZlOTJjKDB4MTgwKV18fCgoXzB4M2EwMTE3PT09J25leHQuanMnfHxfMHgzYTAxMTc9PT1fMHgxNmU5MmMoMHgxOWEpfHxfMHgzYTAxMTc9PT1fMHgxNmU5MmMoMHgxNTgpKSYmKF8weDNhMDExNys9XzB4NWJkMzg4W18weDE2ZTkyYygweDFjMCldPy5bXzB4MTZlOTJjKDB4MTQ0KV0/Llsnbm9kZSddPydcXFxceDIwc2VydmVyJzonXFxcXHgyMGJyb3dzZXInKSxfMHg1YmQzODhbXzB4MTZlOTJjKDB4MTgwKV09eydpZCc6K25ldyBEYXRlKCksJ3Rvb2wnOl8weDNhMDExN30pO2xldCBfMHgzNTkwNmQ9bmV3IFEoXzB4NWJkMzg4LF8weDNjYjE1NixfMHgyMWM1YzAsXzB4MzE3MjA4KTtyZXR1cm4gXzB4MzU5MDZkWydzZW5kJ11bXzB4MTZlOTJjKDB4MTEwKV0oXzB4MzU5MDZkKTt9Y2F0Y2goXzB4NDkxNjI4KXtyZXR1cm4gY29uc29sZVsnd2FybiddKF8weDE2ZTkyYygweDE2ZSksXzB4NDkxNjI4JiZfMHg0OTE2MjhbXzB4MTZlOTJjKDB4MTg5KV0pLCgpPT57fTt9fSk7cmV0dXJuIF8weGY4MjE2Nj0+XzB4MWU5NDEwW18weDVlNGRmNSgweDEyYyldKF8weDU2NGYyNT0+XzB4NTY0ZjI1KF8weGY4MjE2NikpO31mdW5jdGlvbiBfMHgxMzcyKF8weDFhNTEyMyxfMHgyOWFkMmEpe3ZhciBfMHgzNmQ5NzI9XzB4MzZkOSgpO3JldHVybiBfMHgxMzcyPWZ1bmN0aW9uKF8weDEzNzI1OCxfMHgyMjg2YTYpe18weDEzNzI1OD1fMHgxMzcyNTgtMHgxMDk7dmFyIF8weDMzYzdiNT1fMHgzNmQ5NzJbXzB4MTM3MjU4XTtyZXR1cm4gXzB4MzNjN2I1O30sXzB4MTM3MihfMHgxYTUxMjMsXzB4MjlhZDJhKTt9ZnVuY3Rpb24gSChfMHgxZmE3Mjgpe3ZhciBfMHgyYmM2NjY9XzB4MjhkNjY1O2xldCBfMHg0Nzc5NzM9ZnVuY3Rpb24oXzB4MTExMDgwLF8weDUyMGJhNCl7cmV0dXJuIF8weDUyMGJhNC1fMHgxMTEwODA7fSxfMHgzY2JmZmM7aWYoXzB4MWZhNzI4WydwZXJmb3JtYW5jZSddKV8weDNjYmZmYz1mdW5jdGlvbigpe3ZhciBfMHgzZDRkNWM9XzB4MTM3MjtyZXR1cm4gXzB4MWZhNzI4W18weDNkNGQ1YygweDE2OSldW18weDNkNGQ1YygweDE3OCldKCk7fTtlbHNle2lmKF8weDFmYTcyOFtfMHgyYmM2NjYoMHgxYzApXSYmXzB4MWZhNzI4Wydwcm9jZXNzJ11bXzB4MmJjNjY2KDB4MTE0KV0pXzB4M2NiZmZjPWZ1bmN0aW9uKCl7dmFyIF8weDJlMjYxYz1fMHgyYmM2NjY7cmV0dXJuIF8weDFmYTcyOFtfMHgyZTI2MWMoMHgxYzApXVtfMHgyZTI2MWMoMHgxMTQpXSgpO30sXzB4NDc3OTczPWZ1bmN0aW9uKF8weDRmZjEwZixfMHgxNGQ1OGEpe3JldHVybiAweDNlOCooXzB4MTRkNThhWzB4MF0tXzB4NGZmMTBmWzB4MF0pKyhfMHgxNGQ1OGFbMHgxXS1fMHg0ZmYxMGZbMHgxXSkvMHhmNDI0MDt9O2Vsc2UgdHJ5e2xldCB7cGVyZm9ybWFuY2U6XzB4MjA4MmM4fT1yZXF1aXJlKF8weDJiYzY2NigweDE1NCkpO18weDNjYmZmYz1mdW5jdGlvbigpe3ZhciBfMHgyZDc4NzM9XzB4MmJjNjY2O3JldHVybiBfMHgyMDgyYzhbXzB4MmQ3ODczKDB4MTc4KV0oKTt9O31jYXRjaHtfMHgzY2JmZmM9ZnVuY3Rpb24oKXtyZXR1cm4rbmV3IERhdGUoKTt9O319cmV0dXJueydlbGFwc2VkJzpfMHg0Nzc5NzMsJ3RpbWVTdGFtcCc6XzB4M2NiZmZjLCdub3cnOigpPT5EYXRlW18weDJiYzY2NigweDE3OCldKCl9O31mdW5jdGlvbiBfMHgzNmQ5KCl7dmFyIF8weDNkMGRhZT1bJ29uY2xvc2UnLCduZWdhdGl2ZUluZmluaXR5JywnX3dzJywnX2NvbnNvbGVfbmluamFfc2Vzc2lvbicsJ1tvYmplY3RcXFxceDIwQXJyYXldJywncHJvdG90eXBlJywnbWF0Y2gnLCdfdHlwZScsJ19hZGRQcm9wZXJ0eScsJ3RyYWNlJywnd2VicGFjaycsJ3dzL2luZGV4LmpzJywnbWVzc2FnZScsJ2RlcHRoJywnX2dldE93blByb3BlcnR5RGVzY3JpcHRvcicsJ19XZWJTb2NrZXRDbGFzcycsJ3VybCcsJ2NvbnNvbGUnLCd0ZXN0JywndG90YWxTdHJMZW5ndGgnLCdvYmplY3QnLCdSZWdFeHAnLCdfZGF0ZVRvU3RyaW5nJywnX1N5bWJvbCcsJ3N0cmluZ2lmeScsJ1N5bWJvbCcsJ2luZGV4T2YnLCd0aW1lRW5kJywnYXV0b0V4cGFuZE1heERlcHRoJywncmVtaXgnLCdfaXNQcmltaXRpdmVUeXBlJywnX3NvY2tldCcsJ3N0ckxlbmd0aCcsJ2NvdW50JywnX3RyZWVOb2RlUHJvcGVydGllc0JlZm9yZUZ1bGxWYWx1ZScsJ3Byb3BzJywndG9TdHJpbmcnLCd2YWx1ZScsJ19tYXhDb25uZWN0QXR0ZW1wdENvdW50JywnZ2V0T3duUHJvcGVydHlOYW1lcycsJ25vZGUnLCdfYWxsb3dlZFRvQ29ubmVjdE9uU2VuZCcsJ2VudW1lcmFibGUnLCdfaGFzU2V0T25JdHNQYXRoJyxcXFwiL1VzZXJzL3N1enVraW1hc2FydS8udnNjb2RlL2V4dGVuc2lvbnMvd2FsbGFieWpzLmNvbnNvbGUtbmluamEtMC4wLjE1Ny9ub2RlX21vZHVsZXNcXFwiLCdORUdBVElWRV9JTkZJTklUWScsJ19wX25hbWUnLCdzcGxpdCcsJ19pc1VuZGVmaW5lZCcsJ19fZXMnKydNb2R1bGUnLCdfcF8nLCdoYXNPd25Qcm9wZXJ0eScsJ2NhcHBlZEVsZW1lbnRzJywnX2Nvbm5lY3RUb0hvc3ROb3cnLCdsb2cnLCdfY29ubmVjdGluZycsJ2F1dG9FeHBhbmRQcmV2aW91c09iamVjdHMnLCdfcHJvcGVydHlBY2Nlc3NvcicsJ251eHQnLFtcXFwibG9jYWxob3N0XFxcIixcXFwiMTI3LjAuMC4xXFxcIixcXFwiZXhhbXBsZS5jeXByZXNzLmlvXFxcIixcXFwibWFzYXJ1LXN1enVraS5sb2NhbFxcXCIsXFxcIjE5Mi4xNjguMC4zXFxcIixcXFwiMTkyLjE2OC4wLjEwXFxcIl0sJ19jYXBJZlN0cmluZycsJ1BPU0lUSVZFX0lORklOSVRZJywnZ2V0V2ViU29ja2V0Q2xhc3MnLCdpbmNsdWRlcycsJ3BhcmVudCcsJ19jb25uZWN0QXR0ZW1wdENvdW50JywncmVwbGFjZScsJ3Byb2Nlc3MnLCdfcmVjb25uZWN0VGltZW91dCcsJ3ZhbHVlT2YnLCdob3N0bmFtZScsJ2RhdGUnLCc6bG9nUG9pbnRJZDonLCdvbmVycm9yJywncmVsb2FkJywnW29iamVjdFxcXFx4MjBEYXRlXScsJ2Z1bmN0aW9uJywnZGVmYXVsdCcsJzU2NjI1JywncGF0aCcsJ19oYXNTeW1ib2xQcm9wZXJ0eU9uSXRzUGF0aCcsJ19wX2xlbmd0aCcsJzE1ODE3OTBCQktmeWQnLCdlbGFwc2VkJywndGhlbicsJ0hUTUxBbGxDb2xsZWN0aW9uJywnRXJyb3InLCduYW1lJywnbm9kZU1vZHVsZXMnLCdwb3AnLCdzdHJpbmcnLCdnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3InLCdzZW5kJywnY2xvc2UnLCdfdHJlZU5vZGVQcm9wZXJ0aWVzQWZ0ZXJGdWxsVmFsdWUnLCdfaXNNYXAnLCdfYWRkaXRpb25hbE1ldGFkYXRhJywnX2Rpc3Bvc2VXZWJzb2NrZXQnLCdTZXQnLCdfc29ydFByb3BzJywncG9zaXRpdmVJbmZpbml0eScsJ051bWJlcicsJ19nZXRPd25Qcm9wZXJ0eVN5bWJvbHMnLCdwdXNoJywnQ29uc29sZVxcXFx4MjBOaW5qYVxcXFx4MjBmYWlsZWRcXFxceDIwdG9cXFxceDIwc2VuZFxcXFx4MjBsb2dzLFxcXFx4MjByZXN0YXJ0aW5nXFxcXHgyMHRoZVxcXFx4MjBwcm9jZXNzXFxcXHgyMG1heVxcXFx4MjBoZWxwJywnOXp6cFFUUCcsJ2dldFByb3RvdHlwZU9mJywndW5rbm93bicsJzE5NDE3MTV0Y21vcXcnLCdsZXZlbCcsJ19jb25zb2xlTmluamFBbGxvd2VkVG9TdGFydCcsJ2V4cHJlc3Npb25zVG9FdmFsdWF0ZScsJ19zZW5kRXJyb3JNZXNzYWdlJywnY2FwcGVkJywnc3RhY2tUcmFjZUxpbWl0JywnW29iamVjdFxcXFx4MjBCaWdJbnRdJywnX3NldE5vZGVMYWJlbCcsJzEuMC4wJywnYmluZCcsJ3dhcm4nLCdfY2xlYW5Ob2RlJywnX2hhc01hcE9uSXRzUGF0aCcsJ2hydGltZScsJ191bmRlZmluZWQnLCdfa2V5U3RyUmVnRXhwJywnX2JsYWNrbGlzdGVkUHJvcGVydHknLCdjb25zdHJ1Y3RvcicsJ2VsZW1lbnRzJywnX3NldE5vZGVQZXJtaXNzaW9ucycsJ19hbGxvd2VkVG9TZW5kJywnZ2V0T3duUHJvcGVydHlTeW1ib2xzJywnc3Vic3RyJywnX2FkZExvYWROb2RlJywnY3VycmVudCcsJ19vYmplY3RUb1N0cmluZycsJ2NvbmNhdCcsJ2JpZ2ludCcsJ2dldHRlcicsJ3Vuc2hpZnQnLCdNYXAnLCdfcHJvY2Vzc1RyZWVOb2RlUmVzdWx0JywnaXNFeHByZXNzaW9uVG9FdmFsdWF0ZScsJ3Jvb3RFeHByZXNzaW9uJywnNzk2MjBzcXpTRkgnLCdudW1iZXInLCdfc2V0Tm9kZVF1ZXJ5UGF0aCcsJ2ZvckVhY2gnLCdsb2NhdGlvbicsJ3BhdGhUb0ZpbGVVUkwnLCczNDU0MThOcHp5TlInLCdvbm9wZW4nLCdfV2ViU29ja2V0JywnX2Nvbm5lY3RlZCcsJ19wcm9wZXJ0eScsJ25vRnVuY3Rpb25zJywnc2VyaWFsaXplJywnYXV0b0V4cGFuZFByb3BlcnR5Q291bnQnLCdhdXRvRXhwYW5kTGltaXQnLCd1bnJlZicsJ3RpbWUnLCcxNDMwNjAwYkREZXdCJywnMTY4NzMzMDQ3NzM1NScsJ19pc0FycmF5JywnZGF0YScsJ19zZXROb2RlRXhwYW5kYWJsZVN0YXRlJywnX3NldE5vZGVFeHByZXNzaW9uUGF0aCcsJ3RvTG93ZXJDYXNlJywnam9pbicsJ19jb25zb2xlX25pbmphJywnYm9vbGVhbicsJ3ZlcnNpb25zJywnMjBRWFd1Qk0nLCdsb2dnZXJcXFxceDIwd2Vic29ja2V0XFxcXHgyMGVycm9yJywnMTI3LjAuMC4xJywnX0hUTUxBbGxDb2xsZWN0aW9uJywnY2F0Y2gnLCd0eXBlJywnX2luQnJvd3NlcicsJy4uLicsJ2dsb2JhbCcsJ0NvbnNvbGVcXFxceDIwTmluamFcXFxceDIwZmFpbGVkXFxcXHgyMHRvXFxcXHgyMHNlbmRcXFxceDIwbG9ncyxcXFxceDIwcmVmcmVzaGluZ1xcXFx4MjB0aGVcXFxceDIwcGFnZVxcXFx4MjBtYXlcXFxceDIwaGVscCcsJ2FsbFN0ckxlbmd0aCcsJ3Jvb3RfZXhwJywnNDM0MjAyZVVocG5BJywnX3Byb3BlcnR5TmFtZScsJ2F1dG9FeHBhbmQnLCdwZXJmX2hvb2tzJywnX3JlZ0V4cFRvU3RyaW5nJywnW29iamVjdFxcXFx4MjBTZXRdJywnY2FsbCcsJ2FzdHJvJywnbGVuZ3RoJywnX2FkZE9iamVjdFByb3BlcnR5JywncGFyc2UnLCdvbm1lc3NhZ2UnLCdudWxsJywnMTE2MzY4NFV4SWtnRScsJ3VuZGVmaW5lZCcsJ2ZhaWxlZFxcXFx4MjB0b1xcXFx4MjBjb25uZWN0XFxcXHgyMHRvXFxcXHgyMGhvc3Q6XFxcXHgyMCcsJ2NyZWF0ZScsJ2FycmF5JywnaG9zdCcsJ3N5bWJvbCcsJ3NvcnQnLCdzZXR0ZXInLCdhcmd1bWVudFJlc29sdXRpb25FcnJvcicsJ3JlYWR5U3RhdGUnLCdwZXJmb3JtYW5jZScsJ2Z1bmNOYW1lJywnX2F0dGVtcHRUb1JlY29ubmVjdFNob3J0bHknLCdfaXNTZXQnLCdtYXAnLCdsb2dnZXJcXFxceDIwZmFpbGVkXFxcXHgyMHRvXFxcXHgyMGNvbm5lY3RcXFxceDIwdG9cXFxceDIwaG9zdCcsJ19zZXROb2RlSWQnLCdyZWR1Y2VMaW1pdHMnLCdfaXNOZWdhdGl2ZVplcm8nLCdbb2JqZWN0XFxcXHgyME1hcF0nLCdfcXVvdGVkUmVnRXhwJywnX2lzUHJpbWl0aXZlV3JhcHBlclR5cGUnLCdoaXRzJywnaW5kZXgnLCdzb3J0UHJvcHMnLCdub3cnLCdmYWlsZWRcXFxceDIwdG9cXFxceDIwZmluZFxcXFx4MjBhbmRcXFxceDIwbG9hZFxcXFx4MjBXZWJTb2NrZXQnLCdzZXQnLCdyZXNvbHZlR2V0dGVycycsJ2RlZmluZVByb3BlcnR5J107XzB4MzZkOT1mdW5jdGlvbigpe3JldHVybiBfMHgzZDBkYWU7fTtyZXR1cm4gXzB4MzZkOSgpO31mdW5jdGlvbiBYKF8weDViZGE2NixfMHgyMTJiMmYsXzB4NGRkYWQ2KXt2YXIgXzB4NTZlN2NhPV8weDI4ZDY2NTtpZihfMHg1YmRhNjZbJ19jb25zb2xlTmluamFBbGxvd2VkVG9TdGFydCddIT09dm9pZCAweDApcmV0dXJuIF8weDViZGE2NlsnX2NvbnNvbGVOaW5qYUFsbG93ZWRUb1N0YXJ0J107bGV0IF8weDUyMjQ2Nz1fMHg1YmRhNjZbXzB4NTZlN2NhKDB4MWMwKV0/LlsndmVyc2lvbnMnXT8uW18weDU2ZTdjYSgweDFhNSldO3JldHVybiBfMHg1MjI0NjcmJl8weDRkZGFkNj09PV8weDU2ZTdjYSgweDFiNyk/XzB4NWJkYTY2W18weDU2ZTdjYSgweDFlYildPSEweDE6XzB4NWJkYTY2W18weDU2ZTdjYSgweDFlYildPV8weDUyMjQ2N3x8IV8weDIxMmIyZnx8XzB4NWJkYTY2Wydsb2NhdGlvbiddPy5bJ2hvc3RuYW1lJ10mJl8weDIxMmIyZltfMHg1NmU3Y2EoMHgxYmMpXShfMHg1YmRhNjZbXzB4NTZlN2NhKDB4MTJkKV1bXzB4NTZlN2NhKDB4MWMzKV0pLF8weDViZGE2NltfMHg1NmU3Y2EoMHgxZWIpXTt9KChfMHg1N2I0NjMsXzB4MTkxN2QwLF8weDYwMDQ0NCxfMHg1NTYyYjMsXzB4Y2ZjODkzLF8weDFiMGMxYyxfMHg0NjBjOWUsXzB4NTJlN2ZmLF8weDFiZDk3NSk9Pnt2YXIgXzB4MmVjYjczPV8weDI4ZDY2NTtpZihfMHg1N2I0NjNbXzB4MmVjYjczKDB4MTQyKV0pcmV0dXJuIF8weDU3YjQ2M1snX2NvbnNvbGVfbmluamEnXTtpZighWChfMHg1N2I0NjMsXzB4NTJlN2ZmLF8weGNmYzg5MykpcmV0dXJuIF8weDU3YjQ2M1tfMHgyZWNiNzMoMHgxNDIpXT17J2NvbnNvbGVMb2cnOigpPT57fSwnY29uc29sZVRyYWNlJzooKT0+e30sJ2NvbnNvbGVUaW1lJzooKT0+e30sJ2NvbnNvbGVUaW1lRW5kJzooKT0+e30sJ2F1dG9Mb2cnOigpPT57fSwnYXV0b1RyYWNlJzooKT0+e30sJ2F1dG9UaW1lJzooKT0+e30sJ2F1dG9UaW1lRW5kJzooKT0+e319LF8weDU3YjQ2M1tfMHgyZWNiNzMoMHgxNDIpXTtsZXQgXzB4NWY0Mjg3PXsncHJvcHMnOjB4NjQsJ2VsZW1lbnRzJzoweDY0LCdzdHJMZW5ndGgnOjB4NDAwKjB4MzIsJ3RvdGFsU3RyTGVuZ3RoJzoweDQwMCoweDMyLCdhdXRvRXhwYW5kTGltaXQnOjB4MTM4OCwnYXV0b0V4cGFuZE1heERlcHRoJzoweGF9LF8weDM2N2M4MD17J3Byb3BzJzoweDUsJ2VsZW1lbnRzJzoweDUsJ3N0ckxlbmd0aCc6MHgxMDAsJ3RvdGFsU3RyTGVuZ3RoJzoweDEwMCoweDMsJ2F1dG9FeHBhbmRMaW1pdCc6MHgxZSwnYXV0b0V4cGFuZE1heERlcHRoJzoweDJ9LF8weDVjZmY4Nj1IKF8weDU3YjQ2MyksXzB4NTc4N2NkPV8weDVjZmY4NltfMHgyZWNiNzMoMHgxZDApXSxfMHg0YWM3Njc9XzB4NWNmZjg2Wyd0aW1lU3RhbXAnXSxfMHhkNTMyYTE9XzB4NWNmZjg2Wydub3cnXSxfMHgxNzdmZDE9eydoaXRzJzp7fSwndHMnOnt9fSxfMHgyYjdkMjY9XzB4M2Q1Y2YyPT57XzB4MTc3ZmQxWyd0cyddW18weDNkNWNmMl09XzB4NGFjNzY3KCk7fSxfMHgyM2I0NTU9KF8weGNkZjYxOCxfMHgxNGE0OSk9PntsZXQgXzB4NTdiOGQzPV8weDE3N2ZkMVsndHMnXVtfMHgxNGE0OV07aWYoZGVsZXRlIF8weDE3N2ZkMVsndHMnXVtfMHgxNGE0OV0sXzB4NTdiOGQzKXtsZXQgXzB4MTJiYmJmPV8weDU3ODdjZChfMHg1N2I4ZDMsXzB4NGFjNzY3KCkpO18weDNmZDc1NyhfMHg0MWY3ZmIoJ3RpbWUnLF8weGNkZjYxOCxfMHhkNTMyYTEoKSxfMHgzYTM2NDYsW18weDEyYmJiZl0sXzB4MTRhNDkpKTt9fSxfMHgzNjk3MWU9XzB4MjkxOTY1PT5fMHg0MzQ5M2Q9Pnt2YXIgXzB4MjRkYjZmPV8weDJlY2I3Mzt0cnl7XzB4MmI3ZDI2KF8weDQzNDkzZCksXzB4MjkxOTY1KF8weDQzNDkzZCk7fWZpbmFsbHl7XzB4NTdiNDYzW18weDI0ZGI2ZigweDE4ZSldW18weDI0ZGI2ZigweDEzOSldPV8weDI5MTk2NTt9fSxfMHg2M2Y1YzM9XzB4MjEzNDJlPT5fMHg0NDc0NjU9Pnt2YXIgXzB4NGRlYTk0PV8weDJlY2I3Mzt0cnl7bGV0IFtfMHgyODAyMzcsXzB4NTE1MTNhXT1fMHg0NDc0NjVbJ3NwbGl0J10oXzB4NGRlYTk0KDB4MWM1KSk7XzB4MjNiNDU1KF8weDUxNTEzYSxfMHgyODAyMzcpLF8weDIxMzQyZShfMHgyODAyMzcpO31maW5hbGx5e18weDU3YjQ2M1tfMHg0ZGVhOTQoMHgxOGUpXVtfMHg0ZGVhOTQoMHgxOTgpXT1fMHgyMTM0MmU7fX07XzB4NTdiNDYzWydfY29uc29sZV9uaW5qYSddPXsnY29uc29sZUxvZyc6KF8weDE3OTg0ZixfMHgzY2M1ZTYpPT57dmFyIF8weDIwNzUxMz1fMHgyZWNiNzM7XzB4NTdiNDYzW18weDIwNzUxMygweDE4ZSldWydsb2cnXVtfMHgyMDc1MTMoMHgxZDQpXSE9PSdkaXNhYmxlZExvZycmJl8weDNmZDc1NyhfMHg0MWY3ZmIoXzB4MjA3NTEzKDB4MWIzKSxfMHgxNzk4NGYsXzB4ZDUzMmExKCksXzB4M2EzNjQ2LF8weDNjYzVlNikpO30sJ2NvbnNvbGVUcmFjZSc6KF8weDM4YmY5YyxfMHg0ZDJhZDEpPT57dmFyIF8weDRiYjhhMz1fMHgyZWNiNzM7XzB4NTdiNDYzWydjb25zb2xlJ11bJ2xvZyddW18weDRiYjhhMygweDFkNCldIT09J2Rpc2FibGVkVHJhY2UnJiZfMHgzZmQ3NTcoXzB4NDFmN2ZiKCd0cmFjZScsXzB4MzhiZjljLF8weGQ1MzJhMSgpLF8weDNhMzY0NixfMHg0ZDJhZDEpKTt9LCdjb25zb2xlVGltZSc6KCk9Pnt2YXIgXzB4MjFkZGRjPV8weDJlY2I3MztfMHg1N2I0NjNbXzB4MjFkZGRjKDB4MThlKV1bXzB4MjFkZGRjKDB4MTM5KV09XzB4MzY5NzFlKF8weDU3YjQ2M1tfMHgyMWRkZGMoMHgxOGUpXVtfMHgyMWRkZGMoMHgxMzkpXSk7fSwnY29uc29sZVRpbWVFbmQnOigpPT57dmFyIF8weDFkNjJkZT1fMHgyZWNiNzM7XzB4NTdiNDYzW18weDFkNjJkZSgweDE4ZSldW18weDFkNjJkZSgweDE5OCldPV8weDYzZjVjMyhfMHg1N2I0NjNbXzB4MWQ2MmRlKDB4MThlKV1bXzB4MWQ2MmRlKDB4MTk4KV0pO30sJ2F1dG9Mb2cnOihfMHg0ZmIzMjMsXzB4NWQ4MTJjKT0+e3ZhciBfMHgyMTdhZTE9XzB4MmVjYjczO18weDNmZDc1NyhfMHg0MWY3ZmIoXzB4MjE3YWUxKDB4MWIzKSxfMHg1ZDgxMmMsXzB4ZDUzMmExKCksXzB4M2EzNjQ2LFtfMHg0ZmIzMjNdKSk7fSwnYXV0b1RyYWNlJzooXzB4NDk4YTNjLF8weDQ4MDQ3MSk9Pnt2YXIgXzB4MzkyYWY1PV8weDJlY2I3MztfMHgzZmQ3NTcoXzB4NDFmN2ZiKF8weDM5MmFmNSgweDE4NiksXzB4NDgwNDcxLF8weGQ1MzJhMSgpLF8weDNhMzY0NixbXzB4NDk4YTNjXSkpO30sJ2F1dG9UaW1lJzooXzB4NWU5NThmLF8weDNlZTdjZCxfMHg1N2U5YWEpPT57XzB4MmI3ZDI2KF8weDU3ZTlhYSk7fSwnYXV0b1RpbWVFbmQnOihfMHgyNWIzM2QsXzB4MzhkODM5LF8weDIzMGRjYyk9PntfMHgyM2I0NTUoXzB4MzhkODM5LF8weDIzMGRjYyk7fX07bGV0IF8weDNmZDc1Nz1WKF8weDU3YjQ2MyxfMHgxOTE3ZDAsXzB4NjAwNDQ0LF8weDU1NjJiMyxfMHhjZmM4OTMpLF8weDNhMzY0Nj1fMHg1N2I0NjNbXzB4MmVjYjczKDB4MTgwKV07Y2xhc3MgXzB4ZDk2ZDY5e2NvbnN0cnVjdG9yKCl7dmFyIF8weDE4MzkyZD1fMHgyZWNiNzM7dGhpc1snX2tleVN0clJlZ0V4cCddPS9eKD8hKD86ZG98aWZ8aW58Zm9yfGxldHxuZXd8dHJ5fHZhcnxjYXNlfGVsc2V8ZW51bXxldmFsfGZhbHNlfG51bGx8dGhpc3x0cnVlfHZvaWR8d2l0aHxicmVha3xjYXRjaHxjbGFzc3xjb25zdHxzdXBlcnx0aHJvd3x3aGlsZXx5aWVsZHxkZWxldGV8ZXhwb3J0fGltcG9ydHxwdWJsaWN8cmV0dXJufHN0YXRpY3xzd2l0Y2h8dHlwZW9mfGRlZmF1bHR8ZXh0ZW5kc3xmaW5hbGx5fHBhY2thZ2V8cHJpdmF0ZXxjb250aW51ZXxkZWJ1Z2dlcnxmdW5jdGlvbnxhcmd1bWVudHN8aW50ZXJmYWNlfHByb3RlY3RlZHxpbXBsZW1lbnRzfGluc3RhbmNlb2YpJClbXyRhLXpBLVpcXFxceEEwLVxcXFx1RkZGRl1bXyRhLXpBLVowLTlcXFxceEEwLVxcXFx1RkZGRl0qJC8sdGhpc1snX251bWJlclJlZ0V4cCddPS9eKDB8WzEtOV1bMC05XSopJC8sdGhpc1tfMHgxODM5MmQoMHgxNzMpXT0vJyhbXlxcXFxcXFxcJ118XFxcXFxcXFwnKSonLyx0aGlzW18weDE4MzkyZCgweDExNSldPV8weDU3YjQ2M1tfMHgxODM5MmQoMHgxNWYpXSx0aGlzW18weDE4MzkyZCgweDE0OCldPV8weDU3YjQ2M1tfMHgxODM5MmQoMHgxZDIpXSx0aGlzW18weDE4MzkyZCgweDE4YildPU9iamVjdFtfMHgxODM5MmQoMHgxZDgpXSx0aGlzWydfZ2V0T3duUHJvcGVydHlOYW1lcyddPU9iamVjdFtfMHgxODM5MmQoMHgxYTQpXSx0aGlzW18weDE4MzkyZCgweDE5NCldPV8weDU3YjQ2M1tfMHgxODM5MmQoMHgxOTYpXSx0aGlzWydfcmVnRXhwVG9TdHJpbmcnXT1SZWdFeHBbJ3Byb3RvdHlwZSddW18weDE4MzkyZCgweDFhMSldLHRoaXNbXzB4MTgzOTJkKDB4MTkzKV09RGF0ZVtfMHgxODM5MmQoMHgxODIpXVsndG9TdHJpbmcnXTt9W18weDJlY2I3MygweDEzNSldKF8weDU0OGE4OCxfMHg4ZDY0NTEsXzB4M2NiMDhhLF8weDc4NTQ4ZCl7dmFyIF8weDJmNjhjNT1fMHgyZWNiNzMsXzB4MTJiYjRlPXRoaXMsXzB4NGJmOTIxPV8weDNjYjA4YVtfMHgyZjY4YzUoMHgxNTMpXTtmdW5jdGlvbiBfMHg0OTIzNmEoXzB4OGU4ZDVkLF8weDE5NTY1NixfMHg0Y2UwZTIpe3ZhciBfMHg1NDgyNTU9XzB4MmY2OGM1O18weDE5NTY1NltfMHg1NDgyNTUoMHgxNGEpXT1fMHg1NDgyNTUoMHgxZTgpLF8weDE5NTY1NlsnZXJyb3InXT1fMHg4ZThkNWRbXzB4NTQ4MjU1KDB4MTg5KV0sXzB4NTExY2ExPV8weDRjZTBlMlsnbm9kZSddW18weDU0ODI1NSgweDExZildLF8weDRjZTBlMltfMHg1NDgyNTUoMHgxYTUpXVtfMHg1NDgyNTUoMHgxMWYpXT1fMHgxOTU2NTYsXzB4MTJiYjRlW18weDU0ODI1NSgweDE5ZildKF8weDE5NTY1NixfMHg0Y2UwZTIpO31pZihfMHg4ZDY0NTEmJl8weDhkNjQ1MVtfMHgyZjY4YzUoMHgxNjcpXSlfMHg0OTIzNmEoXzB4OGQ2NDUxLF8weDU0OGE4OCxfMHgzY2IwOGEpO2Vsc2UgdHJ5e18weDNjYjA4YVtfMHgyZjY4YzUoMHgxZWEpXSsrLF8weDNjYjA4YVtfMHgyZjY4YzUoMHgxNTMpXSYmXzB4M2NiMDhhW18weDJmNjhjNSgweDFiNSldW18weDJmNjhjNSgweDFlNCldKF8weDhkNjQ1MSk7dmFyIF8weDMwODEwYixfMHgzZWVkYTAsXzB4MjE0ODdhLF8weDQzMjkzMSxfMHgxOTFiNjU9W10sXzB4MTliMjJkPVtdLF8weDVjOTgyMSxfMHgyMWUwZjE9dGhpc1tfMHgyZjY4YzUoMHgxODQpXShfMHg4ZDY0NTEpLF8weDMxNzdiZD1fMHgyMWUwZjE9PT1fMHgyZjY4YzUoMHgxNjIpLF8weDE2ZWFhOD0hMHgxLF8weDQ4Nzc0Nj1fMHgyMWUwZjE9PT1fMHgyZjY4YzUoMHgxYzkpLF8weDExMWE4ND10aGlzW18weDJmNjhjNSgweDE5YildKF8weDIxZTBmMSksXzB4M2U3YmJiPXRoaXNbXzB4MmY2OGM1KDB4MTc0KV0oXzB4MjFlMGYxKSxfMHgzZTk1YzQ9XzB4MTExYTg0fHxfMHgzZTdiYmIsXzB4MWNmMzRhPXt9LF8weDUxNTI1Nj0weDAsXzB4MWQ0YmQwPSEweDEsXzB4NTExY2ExLF8weDE2ODA3OD0vXigoWzEtOV17MX1bMC05XSopfDApJC87aWYoXzB4M2NiMDhhW18weDJmNjhjNSgweDE4YSldKXtpZihfMHgzMTc3YmQpe2lmKF8weDNlZWRhMD1fMHg4ZDY0NTFbXzB4MmY2OGM1KDB4MTU5KV0sXzB4M2VlZGEwPl8weDNjYjA4YVtfMHgyZjY4YzUoMHgxMTkpXSl7Zm9yKF8weDIxNDg3YT0weDAsXzB4NDMyOTMxPV8weDNjYjA4YVsnZWxlbWVudHMnXSxfMHgzMDgxMGI9XzB4MjE0ODdhO18weDMwODEwYjxfMHg0MzI5MzE7XzB4MzA4MTBiKyspXzB4MTliMjJkW18weDJmNjhjNSgweDFlNCldKF8weDEyYmI0ZVsnX2FkZFByb3BlcnR5J10oXzB4MTkxYjY1LF8weDhkNjQ1MSxfMHgyMWUwZjEsXzB4MzA4MTBiLF8weDNjYjA4YSkpO18weDU0OGE4OFtfMHgyZjY4YzUoMHgxYjEpXT0hMHgwO31lbHNle2ZvcihfMHgyMTQ4N2E9MHgwLF8weDQzMjkzMT1fMHgzZWVkYTAsXzB4MzA4MTBiPV8weDIxNDg3YTtfMHgzMDgxMGI8XzB4NDMyOTMxO18weDMwODEwYisrKV8weDE5YjIyZFtfMHgyZjY4YzUoMHgxZTQpXShfMHgxMmJiNGVbXzB4MmY2OGM1KDB4MTg1KV0oXzB4MTkxYjY1LF8weDhkNjQ1MSxfMHgyMWUwZjEsXzB4MzA4MTBiLF8weDNjYjA4YSkpO31fMHgzY2IwOGFbXzB4MmY2OGM1KDB4MTM2KV0rPV8weDE5YjIyZFtfMHgyZjY4YzUoMHgxNTkpXTt9aWYoIShfMHgyMWUwZjE9PT1fMHgyZjY4YzUoMHgxNWQpfHxfMHgyMWUwZjE9PT0ndW5kZWZpbmVkJykmJiFfMHgxMTFhODQmJl8weDIxZTBmMSE9PSdTdHJpbmcnJiZfMHgyMWUwZjEhPT0nQnVmZmVyJyYmXzB4MjFlMGYxIT09XzB4MmY2OGM1KDB4MTIyKSl7dmFyIF8weDFlZWQ2OT1fMHg3ODU0OGRbJ3Byb3BzJ118fF8weDNjYjA4YVtfMHgyZjY4YzUoMHgxYTApXTtpZih0aGlzW18weDJmNjhjNSgweDE2YyldKF8weDhkNjQ1MSk/KF8weDMwODEwYj0weDAsXzB4OGQ2NDUxW18weDJmNjhjNSgweDEyYyldKGZ1bmN0aW9uKF8weGQ5ZmY0Yil7dmFyIF8weDI0OGMzMj1fMHgyZjY4YzU7aWYoXzB4NTE1MjU2KyssXzB4M2NiMDhhW18weDI0OGMzMigweDEzNildKyssXzB4NTE1MjU2Pl8weDFlZWQ2OSl7XzB4MWQ0YmQwPSEweDA7cmV0dXJuO31pZighXzB4M2NiMDhhW18weDI0OGMzMigweDEyNyldJiZfMHgzY2IwOGFbXzB4MjQ4YzMyKDB4MTUzKV0mJl8weDNjYjA4YVtfMHgyNDhjMzIoMHgxMzYpXT5fMHgzY2IwOGFbXzB4MjQ4YzMyKDB4MTM3KV0pe18weDFkNGJkMD0hMHgwO3JldHVybjt9XzB4MTliMjJkW18weDI0OGMzMigweDFlNCldKF8weDEyYmI0ZVtfMHgyNDhjMzIoMHgxODUpXShfMHgxOTFiNjUsXzB4OGQ2NDUxLF8weDI0OGMzMigweDFkZiksXzB4MzA4MTBiKyssXzB4M2NiMDhhLGZ1bmN0aW9uKF8weDU5ODUzYyl7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIF8weDU5ODUzYzt9O30oXzB4ZDlmZjRiKSkpO30pKTp0aGlzW18weDJmNjhjNSgweDFkYyldKF8weDhkNjQ1MSkmJl8weDhkNjQ1MVsnZm9yRWFjaCddKGZ1bmN0aW9uKF8weDc4OGE4YyxfMHg1OTgyOTEpe3ZhciBfMHg1ZWRhMDA9XzB4MmY2OGM1O2lmKF8weDUxNTI1NisrLF8weDNjYjA4YVtfMHg1ZWRhMDAoMHgxMzYpXSsrLF8weDUxNTI1Nj5fMHgxZWVkNjkpe18weDFkNGJkMD0hMHgwO3JldHVybjt9aWYoIV8weDNjYjA4YVtfMHg1ZWRhMDAoMHgxMjcpXSYmXzB4M2NiMDhhW18weDVlZGEwMCgweDE1MyldJiZfMHgzY2IwOGFbJ2F1dG9FeHBhbmRQcm9wZXJ0eUNvdW50J10+XzB4M2NiMDhhW18weDVlZGEwMCgweDEzNyldKXtfMHgxZDRiZDA9ITB4MDtyZXR1cm47fXZhciBfMHgzOTRiZjU9XzB4NTk4MjkxW18weDVlZGEwMCgweDFhMSldKCk7XzB4Mzk0YmY1W18weDVlZGEwMCgweDE1OSldPjB4NjQmJihfMHgzOTRiZjU9XzB4Mzk0YmY1WydzbGljZSddKDB4MCwweDY0KStfMHg1ZWRhMDAoMHgxNGMpKSxfMHgxOWIyMmRbXzB4NWVkYTAwKDB4MWU0KV0oXzB4MTJiYjRlW18weDVlZGEwMCgweDE4NSldKF8weDE5MWI2NSxfMHg4ZDY0NTEsXzB4NWVkYTAwKDB4MTI1KSxfMHgzOTRiZjUsXzB4M2NiMDhhLGZ1bmN0aW9uKF8weDUxMDU3ZSl7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIF8weDUxMDU3ZTt9O30oXzB4Nzg4YThjKSkpO30pLCFfMHgxNmVhYTgpe3RyeXtmb3IoXzB4NWM5ODIxIGluIF8weDhkNjQ1MSlpZighKF8weDMxNzdiZCYmXzB4MTY4MDc4W18weDJmNjhjNSgweDE4ZildKF8weDVjOTgyMSkpJiYhdGhpc1tfMHgyZjY4YzUoMHgxMTcpXShfMHg4ZDY0NTEsXzB4NWM5ODIxLF8weDNjYjA4YSkpe2lmKF8weDUxNTI1NisrLF8weDNjYjA4YVtfMHgyZjY4YzUoMHgxMzYpXSsrLF8weDUxNTI1Nj5fMHgxZWVkNjkpe18weDFkNGJkMD0hMHgwO2JyZWFrO31pZighXzB4M2NiMDhhW18weDJmNjhjNSgweDEyNyldJiZfMHgzY2IwOGFbJ2F1dG9FeHBhbmQnXSYmXzB4M2NiMDhhW18weDJmNjhjNSgweDEzNildPl8weDNjYjA4YVtfMHgyZjY4YzUoMHgxMzcpXSl7XzB4MWQ0YmQwPSEweDA7YnJlYWs7fV8weDE5YjIyZFtfMHgyZjY4YzUoMHgxZTQpXShfMHgxMmJiNGVbJ19hZGRPYmplY3RQcm9wZXJ0eSddKF8weDE5MWI2NSxfMHgxY2YzNGEsXzB4OGQ2NDUxLF8weDIxZTBmMSxfMHg1Yzk4MjEsXzB4M2NiMDhhKSk7fX1jYXRjaHt9aWYoXzB4MWNmMzRhW18weDJmNjhjNSgweDFjZSldPSEweDAsXzB4NDg3NzQ2JiYoXzB4MWNmMzRhW18weDJmNjhjNSgweDFhYildPSEweDApLCFfMHgxZDRiZDApe3ZhciBfMHg1OTkxMmU9W11bXzB4MmY2OGM1KDB4MTIxKV0odGhpc1snX2dldE93blByb3BlcnR5TmFtZXMnXShfMHg4ZDY0NTEpKVtfMHgyZjY4YzUoMHgxMjEpXSh0aGlzW18weDJmNjhjNSgweDFlMyldKF8weDhkNjQ1MSkpO2ZvcihfMHgzMDgxMGI9MHgwLF8weDNlZWRhMD1fMHg1OTkxMmVbXzB4MmY2OGM1KDB4MTU5KV07XzB4MzA4MTBiPF8weDNlZWRhMDtfMHgzMDgxMGIrKylpZihfMHg1Yzk4MjE9XzB4NTk5MTJlW18weDMwODEwYl0sIShfMHgzMTc3YmQmJl8weDE2ODA3OFtfMHgyZjY4YzUoMHgxOGYpXShfMHg1Yzk4MjFbXzB4MmY2OGM1KDB4MWExKV0oKSkpJiYhdGhpc1tfMHgyZjY4YzUoMHgxMTcpXShfMHg4ZDY0NTEsXzB4NWM5ODIxLF8weDNjYjA4YSkmJiFfMHgxY2YzNGFbJ19wXycrXzB4NWM5ODIxW18weDJmNjhjNSgweDFhMSldKCldKXtpZihfMHg1MTUyNTYrKyxfMHgzY2IwOGFbXzB4MmY2OGM1KDB4MTM2KV0rKyxfMHg1MTUyNTY+XzB4MWVlZDY5KXtfMHgxZDRiZDA9ITB4MDticmVhazt9aWYoIV8weDNjYjA4YVtfMHgyZjY4YzUoMHgxMjcpXSYmXzB4M2NiMDhhW18weDJmNjhjNSgweDE1MyldJiZfMHgzY2IwOGFbXzB4MmY2OGM1KDB4MTM2KV0+XzB4M2NiMDhhWydhdXRvRXhwYW5kTGltaXQnXSl7XzB4MWQ0YmQwPSEweDA7YnJlYWs7fV8weDE5YjIyZFtfMHgyZjY4YzUoMHgxZTQpXShfMHgxMmJiNGVbXzB4MmY2OGM1KDB4MTVhKV0oXzB4MTkxYjY1LF8weDFjZjM0YSxfMHg4ZDY0NTEsXzB4MjFlMGYxLF8weDVjOTgyMSxfMHgzY2IwOGEpKTt9fX19fWlmKF8weDU0OGE4OFtfMHgyZjY4YzUoMHgxNGEpXT1fMHgyMWUwZjEsXzB4M2U5NWM0PyhfMHg1NDhhODhbXzB4MmY2OGM1KDB4MWEyKV09XzB4OGQ2NDUxW18weDJmNjhjNSgweDFjMildKCksdGhpc1tfMHgyZjY4YzUoMHgxYjkpXShfMHgyMWUwZjEsXzB4NTQ4YTg4LF8weDNjYjA4YSxfMHg3ODU0OGQpKTpfMHgyMWUwZjE9PT0nZGF0ZSc/XzB4NTQ4YTg4Wyd2YWx1ZSddPXRoaXNbXzB4MmY2OGM1KDB4MTkzKV1bJ2NhbGwnXShfMHg4ZDY0NTEpOl8weDIxZTBmMT09PSdiaWdpbnQnP18weDU0OGE4OFtfMHgyZjY4YzUoMHgxYTIpXT1fMHg4ZDY0NTFbJ3RvU3RyaW5nJ10oKTpfMHgyMWUwZjE9PT1fMHgyZjY4YzUoMHgxOTIpP18weDU0OGE4OFtfMHgyZjY4YzUoMHgxYTIpXT10aGlzW18weDJmNjhjNSgweDE1NSldW18weDJmNjhjNSgweDE1NyldKF8weDhkNjQ1MSk6XzB4MjFlMGYxPT09XzB4MmY2OGM1KDB4MTY0KSYmdGhpc1tfMHgyZjY4YzUoMHgxOTQpXT9fMHg1NDhhODhbJ3ZhbHVlJ109dGhpc1tfMHgyZjY4YzUoMHgxOTQpXVtfMHgyZjY4YzUoMHgxODIpXVtfMHgyZjY4YzUoMHgxYTEpXVtfMHgyZjY4YzUoMHgxNTcpXShfMHg4ZDY0NTEpOiFfMHgzY2IwOGFbXzB4MmY2OGM1KDB4MThhKV0mJiEoXzB4MjFlMGYxPT09XzB4MmY2OGM1KDB4MTVkKXx8XzB4MjFlMGYxPT09XzB4MmY2OGM1KDB4MTVmKSkmJihkZWxldGUgXzB4NTQ4YTg4Wyd2YWx1ZSddLF8weDU0OGE4OFsnY2FwcGVkJ109ITB4MCksXzB4MWQ0YmQwJiYoXzB4NTQ4YTg4WydjYXBwZWRQcm9wcyddPSEweDApLF8weDUxMWNhMT1fMHgzY2IwOGFbXzB4MmY2OGM1KDB4MWE1KV1bJ2N1cnJlbnQnXSxfMHgzY2IwOGFbXzB4MmY2OGM1KDB4MWE1KV1bXzB4MmY2OGM1KDB4MTFmKV09XzB4NTQ4YTg4LHRoaXNbJ190cmVlTm9kZVByb3BlcnRpZXNCZWZvcmVGdWxsVmFsdWUnXShfMHg1NDhhODgsXzB4M2NiMDhhKSxfMHgxOWIyMmRbXzB4MmY2OGM1KDB4MTU5KV0pe2ZvcihfMHgzMDgxMGI9MHgwLF8weDNlZWRhMD1fMHgxOWIyMmRbXzB4MmY2OGM1KDB4MTU5KV07XzB4MzA4MTBiPF8weDNlZWRhMDtfMHgzMDgxMGIrKylfMHgxOWIyMmRbXzB4MzA4MTBiXShfMHgzMDgxMGIpO31fMHgxOTFiNjVbXzB4MmY2OGM1KDB4MTU5KV0mJihfMHg1NDhhODhbJ3Byb3BzJ109XzB4MTkxYjY1KTt9Y2F0Y2goXzB4MWQ1MWE1KXtfMHg0OTIzNmEoXzB4MWQ1MWE1LF8weDU0OGE4OCxfMHgzY2IwOGEpO31yZXR1cm4gdGhpc1tfMHgyZjY4YzUoMHgxZGQpXShfMHg4ZDY0NTEsXzB4NTQ4YTg4KSx0aGlzW18weDJmNjhjNSgweDFkYildKF8weDU0OGE4OCxfMHgzY2IwOGEpLF8weDNjYjA4YVtfMHgyZjY4YzUoMHgxYTUpXVtfMHgyZjY4YzUoMHgxMWYpXT1fMHg1MTFjYTEsXzB4M2NiMDhhW18weDJmNjhjNSgweDFlYSldLS0sXzB4M2NiMDhhWydhdXRvRXhwYW5kJ109XzB4NGJmOTIxLF8weDNjYjA4YVtfMHgyZjY4YzUoMHgxNTMpXSYmXzB4M2NiMDhhW18weDJmNjhjNSgweDFiNSldW18weDJmNjhjNSgweDFkNildKCksXzB4NTQ4YTg4O31bJ19nZXRPd25Qcm9wZXJ0eVN5bWJvbHMnXShfMHgzZWI5Mjgpe3ZhciBfMHg4NWUxOGQ9XzB4MmVjYjczO3JldHVybiBPYmplY3RbXzB4ODVlMThkKDB4MTFjKV0/T2JqZWN0W18weDg1ZTE4ZCgweDExYyldKF8weDNlYjkyOCk6W107fVtfMHgyZWNiNzMoMHgxNmMpXShfMHhmZTA0OTgpe3ZhciBfMHg0YjBhYmY9XzB4MmVjYjczO3JldHVybiEhKF8weGZlMDQ5OCYmXzB4NTdiNDYzW18weDRiMGFiZigweDFkZildJiZ0aGlzW18weDRiMGFiZigweDEyMCldKF8weGZlMDQ5OCk9PT1fMHg0YjBhYmYoMHgxNTYpJiZfMHhmZTA0OThbXzB4NGIwYWJmKDB4MTJjKV0pO31bJ19ibGFja2xpc3RlZFByb3BlcnR5J10oXzB4MzNhMDFjLF8weDIyNTk3ZCxfMHg5ZmI1ZjEpe3ZhciBfMHgxOWNlNmQ9XzB4MmVjYjczO3JldHVybiBfMHg5ZmI1ZjFbXzB4MTljZTZkKDB4MTM0KV0/dHlwZW9mIF8weDMzYTAxY1tfMHgyMjU5N2RdPT1fMHgxOWNlNmQoMHgxYzkpOiEweDE7fVtfMHgyZWNiNzMoMHgxODQpXShfMHg0MGQ4N2Upe3ZhciBfMHg0ZmUyNjE9XzB4MmVjYjczLF8weDNmM2Q2ND0nJztyZXR1cm4gXzB4M2YzZDY0PXR5cGVvZiBfMHg0MGQ4N2UsXzB4M2YzZDY0PT09XzB4NGZlMjYxKDB4MTkxKT90aGlzW18weDRmZTI2MSgweDEyMCldKF8weDQwZDg3ZSk9PT1fMHg0ZmUyNjEoMHgxODEpP18weDNmM2Q2ND0nYXJyYXknOnRoaXNbXzB4NGZlMjYxKDB4MTIwKV0oXzB4NDBkODdlKT09PV8weDRmZTI2MSgweDFjOCk/XzB4M2YzZDY0PV8weDRmZTI2MSgweDFjNCk6dGhpc1tfMHg0ZmUyNjEoMHgxMjApXShfMHg0MGQ4N2UpPT09XzB4NGZlMjYxKDB4MTBkKT9fMHgzZjNkNjQ9XzB4NGZlMjYxKDB4MTIyKTpfMHg0MGQ4N2U9PT1udWxsP18weDNmM2Q2ND1fMHg0ZmUyNjEoMHgxNWQpOl8weDQwZDg3ZVtfMHg0ZmUyNjEoMHgxMTgpXSYmKF8weDNmM2Q2ND1fMHg0MGQ4N2VbXzB4NGZlMjYxKDB4MTE4KV1bXzB4NGZlMjYxKDB4MWQ0KV18fF8weDNmM2Q2NCk6XzB4M2YzZDY0PT09XzB4NGZlMjYxKDB4MTVmKSYmdGhpc1tfMHg0ZmUyNjEoMHgxNDgpXSYmXzB4NDBkODdlIGluc3RhbmNlb2YgdGhpc1tfMHg0ZmUyNjEoMHgxNDgpXSYmKF8weDNmM2Q2ND0nSFRNTEFsbENvbGxlY3Rpb24nKSxfMHgzZjNkNjQ7fVtfMHgyZWNiNzMoMHgxMjApXShfMHg1OGE5NmIpe3ZhciBfMHg0MmE2MDk9XzB4MmVjYjczO3JldHVybiBPYmplY3RbXzB4NDJhNjA5KDB4MTgyKV1bJ3RvU3RyaW5nJ11bJ2NhbGwnXShfMHg1OGE5NmIpO31bJ19pc1ByaW1pdGl2ZVR5cGUnXShfMHg5M2Y0Nzcpe3ZhciBfMHg1MTJiZjk9XzB4MmVjYjczO3JldHVybiBfMHg5M2Y0Nzc9PT1fMHg1MTJiZjkoMHgxNDMpfHxfMHg5M2Y0Nzc9PT1fMHg1MTJiZjkoMHgxZDcpfHxfMHg5M2Y0Nzc9PT1fMHg1MTJiZjkoMHgxMmEpO31bXzB4MmVjYjczKDB4MTc0KV0oXzB4NWEwZGIzKXt2YXIgXzB4NWE4ZWFjPV8weDJlY2I3MztyZXR1cm4gXzB4NWEwZGIzPT09J0Jvb2xlYW4nfHxfMHg1YTBkYjM9PT0nU3RyaW5nJ3x8XzB4NWEwZGIzPT09XzB4NWE4ZWFjKDB4MWUyKTt9W18weDJlY2I3MygweDE4NSldKF8weDRiY2Q1YixfMHg1ZWFhOGQsXzB4MTg3MzRlLF8weDQ1OWM3ZCxfMHgyY2JhZDUsXzB4NDI3ZWZkKXt2YXIgXzB4MjdiMDk0PXRoaXM7cmV0dXJuIGZ1bmN0aW9uKF8weDFkN2I0Mil7dmFyIF8weDE4NjU3Mj1fMHgxMzcyLF8weDQ5MGQzMD1fMHgyY2JhZDVbXzB4MTg2NTcyKDB4MWE1KV1bXzB4MTg2NTcyKDB4MTFmKV0sXzB4M2ExMDFkPV8weDJjYmFkNVtfMHgxODY1NzIoMHgxYTUpXVtfMHgxODY1NzIoMHgxNzYpXSxfMHgyNzU4ZDI9XzB4MmNiYWQ1Wydub2RlJ11bXzB4MTg2NTcyKDB4MWJkKV07XzB4MmNiYWQ1W18weDE4NjU3MigweDFhNSldW18weDE4NjU3MigweDFiZCldPV8weDQ5MGQzMCxfMHgyY2JhZDVbXzB4MTg2NTcyKDB4MWE1KV1bXzB4MTg2NTcyKDB4MTc2KV09dHlwZW9mIF8weDQ1OWM3ZD09J251bWJlcic/XzB4NDU5YzdkOl8weDFkN2I0MixfMHg0YmNkNWJbXzB4MTg2NTcyKDB4MWU0KV0oXzB4MjdiMDk0WydfcHJvcGVydHknXShfMHg1ZWFhOGQsXzB4MTg3MzRlLF8weDQ1OWM3ZCxfMHgyY2JhZDUsXzB4NDI3ZWZkKSksXzB4MmNiYWQ1W18weDE4NjU3MigweDFhNSldW18weDE4NjU3MigweDFiZCldPV8weDI3NThkMixfMHgyY2JhZDVbXzB4MTg2NTcyKDB4MWE1KV1bXzB4MTg2NTcyKDB4MTc2KV09XzB4M2ExMDFkO307fVtfMHgyZWNiNzMoMHgxNWEpXShfMHgzNmFlNjYsXzB4MWY4NmM2LF8weDQ4MjIyNyxfMHg0YmFiNTIsXzB4MTJhMmU5LF8weDQyZTU1YSxfMHg0YmE0MzYpe3ZhciBfMHgyNTkxMTc9XzB4MmVjYjczLF8weDZmOTk3NT10aGlzO3JldHVybiBfMHgxZjg2YzZbXzB4MjU5MTE3KDB4MWFmKStfMHgxMmEyZTlbXzB4MjU5MTE3KDB4MWExKV0oKV09ITB4MCxmdW5jdGlvbihfMHgxMjAzMTApe3ZhciBfMHgxZjVmN2Q9XzB4MjU5MTE3LF8weDQ0ZDM3OD1fMHg0MmU1NWFbXzB4MWY1ZjdkKDB4MWE1KV1bJ2N1cnJlbnQnXSxfMHgzZmZlZGI9XzB4NDJlNTVhW18weDFmNWY3ZCgweDFhNSldW18weDFmNWY3ZCgweDE3NildLF8weDE0NWU2ZD1fMHg0MmU1NWFbJ25vZGUnXVtfMHgxZjVmN2QoMHgxYmQpXTtfMHg0MmU1NWFbJ25vZGUnXVtfMHgxZjVmN2QoMHgxYmQpXT1fMHg0NGQzNzgsXzB4NDJlNTVhW18weDFmNWY3ZCgweDFhNSldW18weDFmNWY3ZCgweDE3NildPV8weDEyMDMxMCxfMHgzNmFlNjZbJ3B1c2gnXShfMHg2Zjk5NzVbXzB4MWY1ZjdkKDB4MTMzKV0oXzB4NDgyMjI3LF8weDRiYWI1MixfMHgxMmEyZTksXzB4NDJlNTVhLF8weDRiYTQzNikpLF8weDQyZTU1YVtfMHgxZjVmN2QoMHgxYTUpXVtfMHgxZjVmN2QoMHgxYmQpXT1fMHgxNDVlNmQsXzB4NDJlNTVhW18weDFmNWY3ZCgweDFhNSldW18weDFmNWY3ZCgweDE3NildPV8weDNmZmVkYjt9O31bXzB4MmVjYjczKDB4MTMzKV0oXzB4MWFkMWQzLF8weDVjYWZlMixfMHgzNzdlYzgsXzB4NDQ2MzBkLF8weDVjNzg2Myl7dmFyIF8weDMwZTU5Nz1fMHgyZWNiNzMsXzB4ODRiMTQ5PXRoaXM7XzB4NWM3ODYzfHwoXzB4NWM3ODYzPWZ1bmN0aW9uKF8weDM0YzEzZCxfMHg1MTgxOTIpe3JldHVybiBfMHgzNGMxM2RbXzB4NTE4MTkyXTt9KTt2YXIgXzB4MzdkZTFiPV8weDM3N2VjOFtfMHgzMGU1OTcoMHgxYTEpXSgpLF8weDU4YzlmMz1fMHg0NDYzMGRbXzB4MzBlNTk3KDB4MTA5KV18fHt9LF8weDIwOWViOD1fMHg0NDYzMGRbXzB4MzBlNTk3KDB4MThhKV0sXzB4MjY4NmY3PV8weDQ0NjMwZFtfMHgzMGU1OTcoMHgxMjcpXTt0cnl7dmFyIF8weDQwNTUyZj10aGlzW18weDMwZTU5NygweDFkYyldKF8weDFhZDFkMyksXzB4MTQ4YWU0PV8weDM3ZGUxYjtfMHg0MDU1MmYmJl8weDE0OGFlNFsweDBdPT09J1xcXFx4MjcnJiYoXzB4MTQ4YWU0PV8weDE0OGFlNFsnc3Vic3RyJ10oMHgxLF8weDE0OGFlNFsnbGVuZ3RoJ10tMHgyKSk7dmFyIF8weDE4MWRkYz1fMHg0NDYzMGRbXzB4MzBlNTk3KDB4MTA5KV09XzB4NThjOWYzWydfcF8nK18weDE0OGFlNF07XzB4MTgxZGRjJiYoXzB4NDQ2MzBkW18weDMwZTU5NygweDE4YSldPV8weDQ0NjMwZFtfMHgzMGU1OTcoMHgxOGEpXSsweDEpLF8weDQ0NjMwZFtfMHgzMGU1OTcoMHgxMjcpXT0hIV8weDE4MWRkYzt2YXIgXzB4NDQwYWVmPXR5cGVvZiBfMHgzNzdlYzg9PSdzeW1ib2wnLF8weGFhYzgwZj17J25hbWUnOl8weDQ0MGFlZnx8XzB4NDA1NTJmP18weDM3ZGUxYjp0aGlzWydfcHJvcGVydHlOYW1lJ10oXzB4MzdkZTFiKX07aWYoXzB4NDQwYWVmJiYoXzB4YWFjODBmW18weDMwZTU5NygweDE2NCldPSEweDApLCEoXzB4NWNhZmUyPT09XzB4MzBlNTk3KDB4MTYyKXx8XzB4NWNhZmUyPT09XzB4MzBlNTk3KDB4MWQzKSkpe3ZhciBfMHg1MDM1YzU9dGhpc1tfMHgzMGU1OTcoMHgxOGIpXShfMHgxYWQxZDMsXzB4Mzc3ZWM4KTtpZihfMHg1MDM1YzUmJihfMHg1MDM1YzVbXzB4MzBlNTk3KDB4MTdhKV0mJihfMHhhYWM4MGZbXzB4MzBlNTk3KDB4MTY2KV09ITB4MCksXzB4NTAzNWM1WydnZXQnXSYmIV8weDE4MWRkYyYmIV8weDQ0NjMwZFtfMHgzMGU1OTcoMHgxN2IpXSkpcmV0dXJuIF8weGFhYzgwZltfMHgzMGU1OTcoMHgxMjMpXT0hMHgwLHRoaXNbXzB4MzBlNTk3KDB4MTI2KV0oXzB4YWFjODBmLF8weDQ0NjMwZCksXzB4YWFjODBmO312YXIgXzB4NDlmODUxO3RyeXtfMHg0OWY4NTE9XzB4NWM3ODYzKF8weDFhZDFkMyxfMHgzNzdlYzgpO31jYXRjaChfMHg0ZGE3Y2Ype3JldHVybiBfMHhhYWM4MGY9eyduYW1lJzpfMHgzN2RlMWIsJ3R5cGUnOl8weDMwZTU5NygweDFlOCksJ2Vycm9yJzpfMHg0ZGE3Y2ZbXzB4MzBlNTk3KDB4MTg5KV19LHRoaXNbXzB4MzBlNTk3KDB4MTI2KV0oXzB4YWFjODBmLF8weDQ0NjMwZCksXzB4YWFjODBmO312YXIgXzB4Mjk4MTBmPXRoaXNbXzB4MzBlNTk3KDB4MTg0KV0oXzB4NDlmODUxKSxfMHg0OGI3MzM9dGhpc1tfMHgzMGU1OTcoMHgxOWIpXShfMHgyOTgxMGYpO2lmKF8weGFhYzgwZltfMHgzMGU1OTcoMHgxNGEpXT1fMHgyOTgxMGYsXzB4NDhiNzMzKXRoaXNbJ19wcm9jZXNzVHJlZU5vZGVSZXN1bHQnXShfMHhhYWM4MGYsXzB4NDQ2MzBkLF8weDQ5Zjg1MSxmdW5jdGlvbigpe3ZhciBfMHgzYTk1NWY9XzB4MzBlNTk3O18weGFhYzgwZltfMHgzYTk1NWYoMHgxYTIpXT1fMHg0OWY4NTFbXzB4M2E5NTVmKDB4MWMyKV0oKSwhXzB4MTgxZGRjJiZfMHg4NGIxNDlbXzB4M2E5NTVmKDB4MWI5KV0oXzB4Mjk4MTBmLF8weGFhYzgwZixfMHg0NDYzMGQse30pO30pO2Vsc2V7dmFyIF8weDQ5MWYwMT1fMHg0NDYzMGRbJ2F1dG9FeHBhbmQnXSYmXzB4NDQ2MzBkWydsZXZlbCddPF8weDQ0NjMwZFtfMHgzMGU1OTcoMHgxOTkpXSYmXzB4NDQ2MzBkWydhdXRvRXhwYW5kUHJldmlvdXNPYmplY3RzJ11bXzB4MzBlNTk3KDB4MTk3KV0oXzB4NDlmODUxKTwweDAmJl8weDI5ODEwZiE9PV8weDMwZTU5NygweDFjOSkmJl8weDQ0NjMwZFtfMHgzMGU1OTcoMHgxMzYpXTxfMHg0NDYzMGRbXzB4MzBlNTk3KDB4MTM3KV07XzB4NDkxZjAxfHxfMHg0NDYzMGRbXzB4MzBlNTk3KDB4MWVhKV08XzB4MjA5ZWI4fHxfMHgxODFkZGM/KHRoaXNbXzB4MzBlNTk3KDB4MTM1KV0oXzB4YWFjODBmLF8weDQ5Zjg1MSxfMHg0NDYzMGQsXzB4MTgxZGRjfHx7fSksdGhpc1tfMHgzMGU1OTcoMHgxZGQpXShfMHg0OWY4NTEsXzB4YWFjODBmKSk6dGhpc1tfMHgzMGU1OTcoMHgxMjYpXShfMHhhYWM4MGYsXzB4NDQ2MzBkLF8weDQ5Zjg1MSxmdW5jdGlvbigpe3ZhciBfMHg1MGU5NzI9XzB4MzBlNTk3O18weDI5ODEwZj09PV8weDUwZTk3MigweDE1ZCl8fF8weDI5ODEwZj09PV8weDUwZTk3MigweDE1Zil8fChkZWxldGUgXzB4YWFjODBmWyd2YWx1ZSddLF8weGFhYzgwZltfMHg1MGU5NzIoMHgxMGIpXT0hMHgwKTt9KTt9cmV0dXJuIF8weGFhYzgwZjt9ZmluYWxseXtfMHg0NDYzMGRbXzB4MzBlNTk3KDB4MTA5KV09XzB4NThjOWYzLF8weDQ0NjMwZFtfMHgzMGU1OTcoMHgxOGEpXT1fMHgyMDllYjgsXzB4NDQ2MzBkWydpc0V4cHJlc3Npb25Ub0V2YWx1YXRlJ109XzB4MjY4NmY3O319WydfY2FwSWZTdHJpbmcnXShfMHgyYTM3MDgsXzB4MWRjM2ZhLF8weDI4MWI4NyxfMHgzYWQ4YTQpe3ZhciBfMHg1YjY5MzA9XzB4MmVjYjczLF8weDEwOWQ0Yj1fMHgzYWQ4YTRbXzB4NWI2OTMwKDB4MTlkKV18fF8weDI4MWI4N1tfMHg1YjY5MzAoMHgxOWQpXTtpZigoXzB4MmEzNzA4PT09J3N0cmluZyd8fF8weDJhMzcwOD09PSdTdHJpbmcnKSYmXzB4MWRjM2ZhWyd2YWx1ZSddKXtsZXQgXzB4NGQ1ZTYxPV8weDFkYzNmYVtfMHg1YjY5MzAoMHgxYTIpXVtfMHg1YjY5MzAoMHgxNTkpXTtfMHgyODFiODdbXzB4NWI2OTMwKDB4MTRmKV0rPV8weDRkNWU2MSxfMHgyODFiODdbJ2FsbFN0ckxlbmd0aCddPl8weDI4MWI4N1tfMHg1YjY5MzAoMHgxOTApXT8oXzB4MWRjM2ZhW18weDViNjkzMCgweDEwYildPScnLGRlbGV0ZSBfMHgxZGMzZmFbJ3ZhbHVlJ10pOl8weDRkNWU2MT5fMHgxMDlkNGImJihfMHgxZGMzZmFbXzB4NWI2OTMwKDB4MTBiKV09XzB4MWRjM2ZhW18weDViNjkzMCgweDFhMildW18weDViNjkzMCgweDExZCldKDB4MCxfMHgxMDlkNGIpLGRlbGV0ZSBfMHgxZGMzZmFbJ3ZhbHVlJ10pO319W18weDJlY2I3MygweDFkYyldKF8weDFkNzVjMyl7dmFyIF8weDI5Y2QwMz1fMHgyZWNiNzM7cmV0dXJuISEoXzB4MWQ3NWMzJiZfMHg1N2I0NjNbXzB4MjljZDAzKDB4MTI1KV0mJnRoaXNbXzB4MjljZDAzKDB4MTIwKV0oXzB4MWQ3NWMzKT09PV8weDI5Y2QwMygweDE3MikmJl8weDFkNzVjM1snZm9yRWFjaCddKTt9W18weDJlY2I3MygweDE1MildKF8weDMxZjQ0KXt2YXIgXzB4MzdmOWIzPV8weDJlY2I3MztpZihfMHgzMWY0NFtfMHgzN2Y5YjMoMHgxODMpXSgvXlxcXFxkKyQvKSlyZXR1cm4gXzB4MzFmNDQ7dmFyIF8weDMxNTI5Zjt0cnl7XzB4MzE1MjlmPUpTT05bJ3N0cmluZ2lmeSddKCcnK18weDMxZjQ0KTt9Y2F0Y2h7XzB4MzE1MjlmPSdcXFxceDIyJyt0aGlzWydfb2JqZWN0VG9TdHJpbmcnXShfMHgzMWY0NCkrJ1xcXFx4MjInO31yZXR1cm4gXzB4MzE1MjlmWydtYXRjaCddKC9eXFxcIihbYS16QS1aX11bYS16QS1aXzAtOV0qKVxcXCIkLyk/XzB4MzE1MjlmPV8weDMxNTI5Zlsnc3Vic3RyJ10oMHgxLF8weDMxNTI5ZltfMHgzN2Y5YjMoMHgxNTkpXS0weDIpOl8weDMxNTI5Zj1fMHgzMTUyOWZbJ3JlcGxhY2UnXSgvJy9nLCdcXFxceDVjXFxcXHgyNycpW18weDM3ZjliMygweDFiZildKC9cXFxcXFxcXFxcXCIvZywnXFxcXHgyMicpW18weDM3ZjliMygweDFiZildKC8oXlxcXCJ8XFxcIiQpL2csJ1xcXFx4MjcnKSxfMHgzMTUyOWY7fVtfMHgyZWNiNzMoMHgxMjYpXShfMHgxMzhjMGMsXzB4MTI1YzUxLF8weDM2MmRmNyxfMHg0NTkwYzQpe3ZhciBfMHgxMTJjZDg9XzB4MmVjYjczO3RoaXNbXzB4MTEyY2Q4KDB4MTlmKV0oXzB4MTM4YzBjLF8weDEyNWM1MSksXzB4NDU5MGM0JiZfMHg0NTkwYzQoKSx0aGlzW18weDExMmNkOCgweDFkZCldKF8weDM2MmRmNyxfMHgxMzhjMGMpLHRoaXNbXzB4MTEyY2Q4KDB4MWRiKV0oXzB4MTM4YzBjLF8weDEyNWM1MSk7fVtfMHgyZWNiNzMoMHgxOWYpXShfMHgxNTBlNDMsXzB4MzJhNjU0KXt2YXIgXzB4NDQ4YjdjPV8weDJlY2I3Mzt0aGlzWydfc2V0Tm9kZUlkJ10oXzB4MTUwZTQzLF8weDMyYTY1NCksdGhpc1tfMHg0NDhiN2MoMHgxMmIpXShfMHgxNTBlNDMsXzB4MzJhNjU0KSx0aGlzWydfc2V0Tm9kZUV4cHJlc3Npb25QYXRoJ10oXzB4MTUwZTQzLF8weDMyYTY1NCksdGhpc1tfMHg0NDhiN2MoMHgxMWEpXShfMHgxNTBlNDMsXzB4MzJhNjU0KTt9W18weDJlY2I3MygweDE2ZildKF8weDQ3ZDU1ZSxfMHg3ZmFlNTMpe31bJ19zZXROb2RlUXVlcnlQYXRoJ10oXzB4MmUwM2VmLF8weDUzMjlkYSl7fVtfMHgyZWNiNzMoMHgxMGUpXShfMHgyNmIxYzksXzB4MzJhNWRmKXt9W18weDJlY2I3MygweDFhZCldKF8weDUxYjUwMCl7dmFyIF8weDJlZTcyYT1fMHgyZWNiNzM7cmV0dXJuIF8weDUxYjUwMD09PXRoaXNbXzB4MmVlNzJhKDB4MTE1KV07fVtfMHgyZWNiNzMoMHgxZGIpXShfMHg0OGRkMjksXzB4MjlmZDE3KXt2YXIgXzB4MmI0NWQ0PV8weDJlY2I3Mzt0aGlzW18weDJiNDVkNCgweDEwZSldKF8weDQ4ZGQyOSxfMHgyOWZkMTcpLHRoaXNbXzB4MmI0NWQ0KDB4MTNlKV0oXzB4NDhkZDI5KSxfMHgyOWZkMTdbJ3NvcnRQcm9wcyddJiZ0aGlzW18weDJiNDVkNCgweDFlMCldKF8weDQ4ZGQyOSksdGhpc1snX2FkZEZ1bmN0aW9uc05vZGUnXShfMHg0OGRkMjksXzB4MjlmZDE3KSx0aGlzWydfYWRkTG9hZE5vZGUnXShfMHg0OGRkMjksXzB4MjlmZDE3KSx0aGlzW18weDJiNDVkNCgweDExMildKF8weDQ4ZGQyOSk7fVsnX2FkZGl0aW9uYWxNZXRhZGF0YSddKF8weDEwNDE5ZixfMHgxNWM1YjUpe3ZhciBfMHgyMDExMmM9XzB4MmVjYjczO3RyeXtfMHgxMDQxOWYmJnR5cGVvZiBfMHgxMDQxOWZbXzB4MjAxMTJjKDB4MTU5KV09PV8weDIwMTEyYygweDEyYSkmJihfMHgxNWM1YjVbXzB4MjAxMTJjKDB4MTU5KV09XzB4MTA0MTlmW18weDIwMTEyYygweDE1OSldKTt9Y2F0Y2h7fWlmKF8weDE1YzViNVtfMHgyMDExMmMoMHgxNGEpXT09PV8weDIwMTEyYygweDEyYSl8fF8weDE1YzViNVsndHlwZSddPT09J051bWJlcicpe2lmKGlzTmFOKF8weDE1YzViNVtfMHgyMDExMmMoMHgxYTIpXSkpXzB4MTVjNWI1WyduYW4nXT0hMHgwLGRlbGV0ZSBfMHgxNWM1YjVbXzB4MjAxMTJjKDB4MWEyKV07ZWxzZSBzd2l0Y2goXzB4MTVjNWI1W18weDIwMTEyYygweDFhMildKXtjYXNlIE51bWJlcltfMHgyMDExMmMoMHgxYmEpXTpfMHgxNWM1YjVbXzB4MjAxMTJjKDB4MWUxKV09ITB4MCxkZWxldGUgXzB4MTVjNWI1W18weDIwMTEyYygweDFhMildO2JyZWFrO2Nhc2UgTnVtYmVyW18weDIwMTEyYygweDFhYSldOl8weDE1YzViNVtfMHgyMDExMmMoMHgxN2UpXT0hMHgwLGRlbGV0ZSBfMHgxNWM1YjVbXzB4MjAxMTJjKDB4MWEyKV07YnJlYWs7Y2FzZSAweDA6dGhpc1tfMHgyMDExMmMoMHgxNzEpXShfMHgxNWM1YjVbJ3ZhbHVlJ10pJiYoXzB4MTVjNWI1WyduZWdhdGl2ZVplcm8nXT0hMHgwKTticmVhazt9fWVsc2UgXzB4MTVjNWI1W18weDIwMTEyYygweDE0YSldPT09XzB4MjAxMTJjKDB4MWM5KSYmdHlwZW9mIF8weDEwNDE5ZltfMHgyMDExMmMoMHgxZDQpXT09XzB4MjAxMTJjKDB4MWQ3KSYmXzB4MTA0MTlmW18weDIwMTEyYygweDFkNCldJiZfMHgxNWM1YjVbXzB4MjAxMTJjKDB4MWQ0KV0mJl8weDEwNDE5ZltfMHgyMDExMmMoMHgxZDQpXSE9PV8weDE1YzViNVsnbmFtZSddJiYoXzB4MTVjNWI1W18weDIwMTEyYygweDE2YSldPV8weDEwNDE5ZltfMHgyMDExMmMoMHgxZDQpXSk7fVtfMHgyZWNiNzMoMHgxNzEpXShfMHg0ZjBjZTIpe3ZhciBfMHg0ZDVjYTg9XzB4MmVjYjczO3JldHVybiAweDEvXzB4NGYwY2UyPT09TnVtYmVyW18weDRkNWNhOCgweDFhYSldO31bXzB4MmVjYjczKDB4MWUwKV0oXzB4MzhiZjhmKXt2YXIgXzB4NTA5ZjBjPV8weDJlY2I3MzshXzB4MzhiZjhmW18weDUwOWYwYygweDFhMCldfHwhXzB4MzhiZjhmW18weDUwOWYwYygweDFhMCldW18weDUwOWYwYygweDE1OSldfHxfMHgzOGJmOGZbXzB4NTA5ZjBjKDB4MTRhKV09PT1fMHg1MDlmMGMoMHgxNjIpfHxfMHgzOGJmOGZbJ3R5cGUnXT09PV8weDUwOWYwYygweDEyNSl8fF8weDM4YmY4ZltfMHg1MDlmMGMoMHgxNGEpXT09PV8weDUwOWYwYygweDFkZil8fF8weDM4YmY4ZlsncHJvcHMnXVtfMHg1MDlmMGMoMHgxNjUpXShmdW5jdGlvbihfMHgzNWUxZTEsXzB4ZTcyYmZkKXt2YXIgXzB4NDgwMTRkPV8weDUwOWYwYyxfMHg0NzhlZmQ9XzB4MzVlMWUxWyduYW1lJ11bXzB4NDgwMTRkKDB4MTQwKV0oKSxfMHg1ODEwOTA9XzB4ZTcyYmZkW18weDQ4MDE0ZCgweDFkNCldW18weDQ4MDE0ZCgweDE0MCldKCk7cmV0dXJuIF8weDQ3OGVmZDxfMHg1ODEwOTA/LTB4MTpfMHg0NzhlZmQ+XzB4NTgxMDkwPzB4MToweDA7fSk7fVsnX2FkZEZ1bmN0aW9uc05vZGUnXShfMHhlNDg4ZmMsXzB4Mzk0ZGEzKXt2YXIgXzB4NWNhNWE4PV8weDJlY2I3MztpZighKF8weDM5NGRhM1tfMHg1Y2E1YTgoMHgxMzQpXXx8IV8weGU0ODhmY1tfMHg1Y2E1YTgoMHgxYTApXXx8IV8weGU0ODhmY1sncHJvcHMnXVsnbGVuZ3RoJ10pKXtmb3IodmFyIF8weDViZDk4ZT1bXSxfMHgxNTZjMDY9W10sXzB4M2Q0MDhjPTB4MCxfMHg1MDFmYjA9XzB4ZTQ4OGZjW18weDVjYTVhOCgweDFhMCldW18weDVjYTVhOCgweDE1OSldO18weDNkNDA4YzxfMHg1MDFmYjA7XzB4M2Q0MDhjKyspe3ZhciBfMHgzNmFiMDU9XzB4ZTQ4OGZjW18weDVjYTVhOCgweDFhMCldW18weDNkNDA4Y107XzB4MzZhYjA1W18weDVjYTVhOCgweDE0YSldPT09XzB4NWNhNWE4KDB4MWM5KT9fMHg1YmQ5OGVbXzB4NWNhNWE4KDB4MWU0KV0oXzB4MzZhYjA1KTpfMHgxNTZjMDZbXzB4NWNhNWE4KDB4MWU0KV0oXzB4MzZhYjA1KTt9aWYoISghXzB4MTU2YzA2W18weDVjYTVhOCgweDE1OSldfHxfMHg1YmQ5OGVbJ2xlbmd0aCddPD0weDEpKXtfMHhlNDg4ZmNbXzB4NWNhNWE4KDB4MWEwKV09XzB4MTU2YzA2O3ZhciBfMHgzYWFkZWI9eydmdW5jdGlvbnNOb2RlJzohMHgwLCdwcm9wcyc6XzB4NWJkOThlfTt0aGlzWydfc2V0Tm9kZUlkJ10oXzB4M2FhZGViLF8weDM5NGRhMyksdGhpc1snX3NldE5vZGVMYWJlbCddKF8weDNhYWRlYixfMHgzOTRkYTMpLHRoaXNbXzB4NWNhNWE4KDB4MTNlKV0oXzB4M2FhZGViKSx0aGlzW18weDVjYTVhOCgweDExYSldKF8weDNhYWRlYixfMHgzOTRkYTMpLF8weDNhYWRlYlsnaWQnXSs9J1xcXFx4MjBmJyxfMHhlNDg4ZmNbXzB4NWNhNWE4KDB4MWEwKV1bXzB4NWNhNWE4KDB4MTI0KV0oXzB4M2FhZGViKTt9fX1bXzB4MmVjYjczKDB4MTFlKV0oXzB4MTkwYmEwLF8weDIxNjBhYSl7fVsnX3NldE5vZGVFeHBhbmRhYmxlU3RhdGUnXShfMHg0MTg4ZjApe31bXzB4MmVjYjczKDB4MTNjKV0oXzB4M2JjZjM2KXt2YXIgXzB4NmQ3NTkyPV8weDJlY2I3MztyZXR1cm4gQXJyYXlbJ2lzQXJyYXknXShfMHgzYmNmMzYpfHx0eXBlb2YgXzB4M2JjZjM2PT0nb2JqZWN0JyYmdGhpc1tfMHg2ZDc1OTIoMHgxMjApXShfMHgzYmNmMzYpPT09XzB4NmQ3NTkyKDB4MTgxKTt9W18weDJlY2I3MygweDExYSldKF8weDEyNzE1OCxfMHgyYjhkYzcpe31bXzB4MmVjYjczKDB4MTEyKV0oXzB4MzBhYjEzKXt2YXIgXzB4MWI5OTlhPV8weDJlY2I3MztkZWxldGUgXzB4MzBhYjEzW18weDFiOTk5YSgweDFjZCldLGRlbGV0ZSBfMHgzMGFiMTNbXzB4MWI5OTlhKDB4MWE4KV0sZGVsZXRlIF8weDMwYWIxM1tfMHgxYjk5OWEoMHgxMTMpXTt9W18weDJlY2I3MygweDEzZildKF8weDViZDI2ZCxfMHgxNDViYTQpe31bXzB4MmVjYjczKDB4MWI2KV0oXzB4Mjk1YmFhKXt2YXIgXzB4NWFhYjQ1PV8weDJlY2I3MztyZXR1cm4gXzB4Mjk1YmFhP18weDI5NWJhYVsnbWF0Y2gnXSh0aGlzWydfbnVtYmVyUmVnRXhwJ10pPydbJytfMHgyOTViYWErJ10nOl8weDI5NWJhYVtfMHg1YWFiNDUoMHgxODMpXSh0aGlzW18weDVhYWI0NSgweDExNildKT8nLicrXzB4Mjk1YmFhOl8weDI5NWJhYVtfMHg1YWFiNDUoMHgxODMpXSh0aGlzW18weDVhYWI0NSgweDE3MyldKT8nWycrXzB4Mjk1YmFhKyddJzonW1xcXFx4MjcnK18weDI5NWJhYSsnXFxcXHgyN10nOicnO319bGV0IF8weDRkYzFkYz1uZXcgXzB4ZDk2ZDY5KCk7ZnVuY3Rpb24gXzB4NDFmN2ZiKF8weDFhNThhYyxfMHgzY2Q5MDQsXzB4NWEzNjJiLF8weDNkNmViZCxfMHg1YmUzODUsXzB4MmE2ZjFlKXt2YXIgXzB4NDZkYzRjPV8weDJlY2I3MztsZXQgXzB4MWUzYTcyLF8weDI5MTZmYTt0cnl7XzB4MjkxNmZhPV8weDRhYzc2NygpLF8weDFlM2E3Mj1fMHgxNzdmZDFbXzB4M2NkOTA0XSwhXzB4MWUzYTcyfHxfMHgyOTE2ZmEtXzB4MWUzYTcyWyd0cyddPjB4MWY0JiZfMHgxZTNhNzJbXzB4NDZkYzRjKDB4MTllKV0mJl8weDFlM2E3MltfMHg0NmRjNGMoMHgxMzkpXS9fMHgxZTNhNzJbJ2NvdW50J108MHg2ND8oXzB4MTc3ZmQxW18weDNjZDkwNF09XzB4MWUzYTcyPXsnY291bnQnOjB4MCwndGltZSc6MHgwLCd0cyc6XzB4MjkxNmZhfSxfMHgxNzdmZDFbXzB4NDZkYzRjKDB4MTc1KV09e30pOl8weDI5MTZmYS1fMHgxNzdmZDFbXzB4NDZkYzRjKDB4MTc1KV1bJ3RzJ10+MHgzMiYmXzB4MTc3ZmQxWydoaXRzJ11bXzB4NDZkYzRjKDB4MTllKV0mJl8weDE3N2ZkMVtfMHg0NmRjNGMoMHgxNzUpXVtfMHg0NmRjNGMoMHgxMzkpXS9fMHgxNzdmZDFbXzB4NDZkYzRjKDB4MTc1KV1bXzB4NDZkYzRjKDB4MTllKV08MHg2NCYmKF8weDE3N2ZkMVtfMHg0NmRjNGMoMHgxNzUpXT17fSk7bGV0IF8weGRjMjYxMz1bXSxfMHgxZDQ5NTk9XzB4MWUzYTcyWydyZWR1Y2VMaW1pdHMnXXx8XzB4MTc3ZmQxW18weDQ2ZGM0YygweDE3NSldWydyZWR1Y2VMaW1pdHMnXT9fMHgzNjdjODA6XzB4NWY0Mjg3LF8weDI0ZjQzMD1fMHg0NTlkN2M9Pnt2YXIgXzB4NDg2ZTczPV8weDQ2ZGM0YztsZXQgXzB4NGNkZDc3PXt9O3JldHVybiBfMHg0Y2RkNzdbXzB4NDg2ZTczKDB4MWEwKV09XzB4NDU5ZDdjW18weDQ4NmU3MygweDFhMCldLF8weDRjZGQ3N1snZWxlbWVudHMnXT1fMHg0NTlkN2NbJ2VsZW1lbnRzJ10sXzB4NGNkZDc3WydzdHJMZW5ndGgnXT1fMHg0NTlkN2NbXzB4NDg2ZTczKDB4MTlkKV0sXzB4NGNkZDc3W18weDQ4NmU3MygweDE5MCldPV8weDQ1OWQ3Y1tfMHg0ODZlNzMoMHgxOTApXSxfMHg0Y2RkNzdbXzB4NDg2ZTczKDB4MTM3KV09XzB4NDU5ZDdjW18weDQ4NmU3MygweDEzNyldLF8weDRjZGQ3N1snYXV0b0V4cGFuZE1heERlcHRoJ109XzB4NDU5ZDdjW18weDQ4NmU3MygweDE5OSldLF8weDRjZGQ3N1tfMHg0ODZlNzMoMHgxNzcpXT0hMHgxLF8weDRjZGQ3N1tfMHg0ODZlNzMoMHgxMzQpXT0hXzB4MWJkOTc1LF8weDRjZGQ3N1snZGVwdGgnXT0weDEsXzB4NGNkZDc3WydsZXZlbCddPTB4MCxfMHg0Y2RkNzdbJ2V4cElkJ109J3Jvb3RfZXhwX2lkJyxfMHg0Y2RkNzdbXzB4NDg2ZTczKDB4MTI4KV09XzB4NDg2ZTczKDB4MTUwKSxfMHg0Y2RkNzdbJ2F1dG9FeHBhbmQnXT0hMHgwLF8weDRjZGQ3N1tfMHg0ODZlNzMoMHgxYjUpXT1bXSxfMHg0Y2RkNzdbXzB4NDg2ZTczKDB4MTM2KV09MHgwLF8weDRjZGQ3N1tfMHg0ODZlNzMoMHgxN2IpXT0hMHgwLF8weDRjZGQ3N1tfMHg0ODZlNzMoMHgxNGYpXT0weDAsXzB4NGNkZDc3W18weDQ4NmU3MygweDFhNSldPXsnY3VycmVudCc6dm9pZCAweDAsJ3BhcmVudCc6dm9pZCAweDAsJ2luZGV4JzoweDB9LF8weDRjZGQ3Nzt9O2Zvcih2YXIgXzB4MjhiZTlkPTB4MDtfMHgyOGJlOWQ8XzB4NWJlMzg1W18weDQ2ZGM0YygweDE1OSldO18weDI4YmU5ZCsrKV8weGRjMjYxM1tfMHg0NmRjNGMoMHgxZTQpXShfMHg0ZGMxZGNbXzB4NDZkYzRjKDB4MTM1KV0oeyd0aW1lTm9kZSc6XzB4MWE1OGFjPT09XzB4NDZkYzRjKDB4MTM5KXx8dm9pZCAweDB9LF8weDViZTM4NVtfMHgyOGJlOWRdLF8weDI0ZjQzMChfMHgxZDQ5NTkpLHt9KSk7aWYoXzB4MWE1OGFjPT09XzB4NDZkYzRjKDB4MTg2KSl7bGV0IF8weDVmMWMwYz1FcnJvcltfMHg0NmRjNGMoMHgxMGMpXTt0cnl7RXJyb3JbXzB4NDZkYzRjKDB4MTBjKV09MHgxLzB4MCxfMHhkYzI2MTNbXzB4NDZkYzRjKDB4MWU0KV0oXzB4NGRjMWRjW18weDQ2ZGM0YygweDEzNSldKHsnc3RhY2tOb2RlJzohMHgwfSxuZXcgRXJyb3IoKVsnc3RhY2snXSxfMHgyNGY0MzAoXzB4MWQ0OTU5KSx7J3N0ckxlbmd0aCc6MHgxLzB4MH0pKTt9ZmluYWxseXtFcnJvcltfMHg0NmRjNGMoMHgxMGMpXT1fMHg1ZjFjMGM7fX1yZXR1cm57J21ldGhvZCc6XzB4NDZkYzRjKDB4MWIzKSwndmVyc2lvbic6XzB4MWIwYzFjLCdhcmdzJzpbeyd0cyc6XzB4NWEzNjJiLCdzZXNzaW9uJzpfMHgzZDZlYmQsJ2FyZ3MnOl8weGRjMjYxMywnaWQnOl8weDNjZDkwNCwnY29udGV4dCc6XzB4MmE2ZjFlfV19O31jYXRjaChfMHgyNTRhNmQpe3JldHVybnsnbWV0aG9kJzpfMHg0NmRjNGMoMHgxYjMpLCd2ZXJzaW9uJzpfMHgxYjBjMWMsJ2FyZ3MnOlt7J3RzJzpfMHg1YTM2MmIsJ3Nlc3Npb24nOl8weDNkNmViZCwnYXJncyc6W3sndHlwZSc6J3Vua25vd24nLCdlcnJvcic6XzB4MjU0YTZkJiZfMHgyNTRhNmRbXzB4NDZkYzRjKDB4MTg5KV19XSwnaWQnOl8weDNjZDkwNCwnY29udGV4dCc6XzB4MmE2ZjFlfV19O31maW5hbGx5e3RyeXtpZihfMHgxZTNhNzImJl8weDI5MTZmYSl7bGV0IF8weDVhZjg5Yj1fMHg0YWM3NjcoKTtfMHgxZTNhNzJbXzB4NDZkYzRjKDB4MTllKV0rKyxfMHgxZTNhNzJbXzB4NDZkYzRjKDB4MTM5KV0rPV8weDU3ODdjZChfMHgyOTE2ZmEsXzB4NWFmODliKSxfMHgxZTNhNzJbJ3RzJ109XzB4NWFmODliLF8weDE3N2ZkMVtfMHg0NmRjNGMoMHgxNzUpXVtfMHg0NmRjNGMoMHgxOWUpXSsrLF8weDE3N2ZkMVtfMHg0NmRjNGMoMHgxNzUpXVtfMHg0NmRjNGMoMHgxMzkpXSs9XzB4NTc4N2NkKF8weDI5MTZmYSxfMHg1YWY4OWIpLF8weDE3N2ZkMVtfMHg0NmRjNGMoMHgxNzUpXVsndHMnXT1fMHg1YWY4OWIsKF8weDFlM2E3MltfMHg0NmRjNGMoMHgxOWUpXT4weDMyfHxfMHgxZTNhNzJbJ3RpbWUnXT4weDY0KSYmKF8weDFlM2E3MltfMHg0NmRjNGMoMHgxNzApXT0hMHgwKSwoXzB4MTc3ZmQxW18weDQ2ZGM0YygweDE3NSldWydjb3VudCddPjB4M2U4fHxfMHgxNzdmZDFbJ2hpdHMnXVtfMHg0NmRjNGMoMHgxMzkpXT4weDEyYykmJihfMHgxNzdmZDFbXzB4NDZkYzRjKDB4MTc1KV1bXzB4NDZkYzRjKDB4MTcwKV09ITB4MCk7fX1jYXRjaHt9fX1yZXR1cm4gXzB4NTdiNDYzWydfY29uc29sZV9uaW5qYSddO30pKGdsb2JhbFRoaXMsXzB4MjhkNjY1KDB4MTQ3KSxfMHgyOGQ2NjUoMHgxY2IpLF8weDI4ZDY2NSgweDFhOSksXzB4MjhkNjY1KDB4MTg3KSxfMHgyOGQ2NjUoMHgxMGYpLF8weDI4ZDY2NSgweDEzYiksXzB4MjhkNjY1KDB4MWI4KSwnJyk7XCIpO31jYXRjaChlKXt9fTtmdW5jdGlvbiBvb19vbyhpOnN0cmluZywuLi52OmFueVtdKXt0cnl7b29fY20oKS5jb25zb2xlTG9nKGksIHYpO31jYXRjaChlKXt9IHJldHVybiB2fTtvb19vbztmdW5jdGlvbiBvb190cihpOnN0cmluZywuLi52OmFueVtdKXt0cnl7b29fY20oKS5jb25zb2xlVHJhY2UoaSwgdik7fWNhdGNoKGUpe30gcmV0dXJuIHZ9O29vX3RyO2Z1bmN0aW9uIG9vX3RzKCl7dHJ5e29vX2NtKCkuY29uc29sZVRpbWUoKTt9Y2F0Y2goZSl7fX07b29fdHM7ZnVuY3Rpb24gb29fdGUoKXt0cnl7b29fY20oKS5jb25zb2xlVGltZUVuZCgpO31jYXRjaChlKXt9fTtvb190ZTsvKmVzbGludCBlc2xpbnQtY29tbWVudHMvZGlzYWJsZS1lbmFibGUtcGFpcjosZXNsaW50LWNvbW1lbnRzL25vLXVubGltaXRlZC1kaXNhYmxlOixlc2xpbnQtY29tbWVudHMvbm8tYWdncmVnYXRpbmctZW5hYmxlOixlc2xpbnQtY29tbWVudHMvbm8tZHVwbGljYXRlLWRpc2FibGU6LGVzbGludC1jb21tZW50cy9uby11bnVzZWQtZGlzYWJsZTosZXNsaW50LWNvbW1lbnRzL25vLXVudXNlZC1lbmFibGU6LCovIiwiaW1wb3J0IHsgZ3NhcCB9IGZyb20gJ2dzYXAnO1xuXG4vLyBjb25zdCBnc2FwU2FtcGxlID0gKCkgPT4ge1xuLy8gICBnc2FwLnRvKCcuYm94Jywge1xuLy8gICAgIHg6IDIwMCxcbi8vICAgfSk7XG4vLyB9O1xuXG5jb25zdCBjb21wbGV0ZSA9ICgpID0+IC8qIGVzbGludC1kaXNhYmxlICovY29uc29sZS5sb2coLi4ub29fb28oYDdkYTYwNWJfMGAsJ2NvbXBsZXRlJykpO1xuXG5jb25zdCBnc2FwU2FtcGxlID0gKCkgPT4ge1xuICBnc2FwLnRvKCcuYm94JywgeyB4OiAyMDAsIGJhY2tncm91bmRDb2xvcjogJ3JlZCcsIHJvdGF0ZTogMTgwLCBkdXJhdGlvbjogMSwgeW95bzogdHJ1ZSwgcmVwZWF0OiAxLCBvbkNvbXBsZXRlOiBjb21wbGV0ZSwgZWFzZTogJ3Bvd2VyMS5pbk91dCcgfSk7XG59O1xuXG5jb25zdCB0bCA9IGdzYXAudGltZWxpbmUoeyByZXBlYXQ6IC0xLCByZXBlYXREZWxheTogMC41IH0pO1xuXG5jb25zdCBnc2FwVGltZWxpbmVTYW1wbGUgPSAoKSA9PiB7XG4gIHRsLmFkZChnc2FwLnRvKCcuZ3JlZW4nLCB7IHg6IDYwMCwgZHVyYXRpb246IDEgfSkpO1xuICB0bC5hZGQoZ3NhcC50bygnLnB1cnBsZScsIHsgeDogNjAwLCBkdXJhdGlvbjogMC41IH0pKTtcbiAgdGwuYWRkKGdzYXAudG8oJy5vcmFuZ2UnLCB7IHg6IDYwMCwgZHVyYXRpb246IDAuMiB9KSk7XG59O1xuXG5jb25zdCBnc2FwVGltZWxpbmVTYW1wbGUyID0gKCkgPT4ge1xuICBnc2FwXG4gICAgLnRpbWVsaW5lKHsgcmVwZWF0OiAtMSwgcmVwZWF0RGVsYXk6IDAuNSB9KVxuICAgIC5zZXQoJy5qcy1zZWN0aW9uMDItaGVhZGluZycsIHsgdGV4dENvbnRlbnQ6ICdTaG93IE1vdGlvbicgfSlcbiAgICAuZnJvbSgnLmJveDEnLCB7IHk6IC0zMiwgb3BhY2l0eTogMCwgZHVyYXRpb246IDAuNSB9KVxuICAgIC5mcm9tKCcuYm94MicsIHsgeTogMzIsIG9wYWNpdHk6IDAsIGR1cmF0aW9uOiAwLjUgfSwgJy09MC40JylcbiAgICAuZnJvbSgnLmJveDMnLCB7IHk6IC0zMiwgb3BhY2l0eTogMCwgZHVyYXRpb246IDAuNSB9LCAnLT0wLjQnKVxuICAgIC5mcm9tKCcuYm94NCcsIHsgeTogMzIsIG9wYWNpdHk6IDAsIGR1cmF0aW9uOiAwLjUgfSwgJy09MC40JylcbiAgICAuZnJvbSgnLmJveDUnLCB7IHk6IC0zMiwgb3BhY2l0eTogMCwgZHVyYXRpb246IDAuNSB9LCAnLT0wLjQnKVxuICAgIC5mcm9tKCcuYm94NicsIHsgeTogMzIsIG9wYWNpdHk6IDAsIGR1cmF0aW9uOiAwLjUgfSwgJy09MC40JylcbiAgICAuc2V0KCcuanMtc2VjdGlvbjAyLWhlYWRpbmcnLCB7IHRleHRDb250ZW50OiAnSGlkZSBNb3Rpb24nIH0sICcrPTEnKSAvLyAx56eS5b6F5qmfXG4gICAgLnRvKCcuYm94MScsIHsgeTogLTMyLCBvcGFjaXR5OiAwLCBkdXJhdGlvbjogMC41IH0sICcrPTAuNScpXG4gICAgLnRvKCcuYm94MicsIHsgeTogMzIsIG9wYWNpdHk6IDAsIGR1cmF0aW9uOiAwLjUgfSwgJy09MC40JykgLy8gMC4056eS6ZaL5aeL44KS5pep44KB44KL6YCj57aa44Gn5YuV5L2c44GX44Gm44GE44KL44KI44GG44Gr6KaL44GI44KLXG4gICAgLnRvKCcuYm94MycsIHsgeTogLTMyLCBvcGFjaXR5OiAwLCBkdXJhdGlvbjogMC41IH0sICctPTAuNCcpXG4gICAgLnRvKCcuYm94NCcsIHsgeTogMzIsIG9wYWNpdHk6IDAsIGR1cmF0aW9uOiAwLjUgfSwgJy09MC40JylcbiAgICAudG8oJy5ib3g1JywgeyB5OiAtMzIsIG9wYWNpdHk6IDAsIGR1cmF0aW9uOiAwLjUgfSwgJy09MC40JylcbiAgICAudG8oJy5ib3g2JywgeyB5OiAzMiwgb3BhY2l0eTogMCwgZHVyYXRpb246IDAuNSB9LCAnLT0wLjQnKTtcbn07XG5cbmNvbnN0IGNyZWF0ZUNoaWxkVGltZWxpbmUgPSAoZWxlbWVudCkgPT4ge1xuICAvLyBlbGVtZW5044Gv5paH5a2X44Go5Zub6KeS44Gu6Kaq6KaB57SgXG4gIGNvbnN0IGVsVGV4dCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLnAtaG9tZS1nc2FwLXJlY3QnKTsgLy/mloflrZfjga7kuIrjga7lm5vop5JcbiAgLyogZXNsaW50LWRpc2FibGUgKi9jb25zb2xlLmxvZyguLi5vb19vbyhgN2RhNjA1Yl8xYCxlbFRleHQpKTtcblxuICBjb25zdCB0bCA9IGdzYXBcbiAgICAudGltZWxpbmUoKVxuICAgIC5mcm9tKGVsZW1lbnQsIHtcbiAgICAgIHk6IDE2LFxuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIGR1cmF0aW9uOiAxLFxuICAgICAgZWFzZTogJ3Bvd2VyNC5vdXQnLFxuICAgIH0pXG4gICAgLnNldChlbFRleHQsIHsgb3BhY2l0eTogMCB9KVxuICAgIC50byhcbiAgICAgIGVsVGV4dCxcbiAgICAgIHtcbiAgICAgICAgeDogJzEwMiUnLFxuICAgICAgICBkdXJhdGlvbjogMSxcbiAgICAgICAgZWFzZTogJ3Bvd2VyNC5vdXQnLFxuICAgICAgfSxcbiAgICAgICctPTUwJScgLy/jgYvjgbbjgornjodcbiAgICApO1xuICAvLyAudG8oXG4gIC8vICAgZWxlbWVudCxcbiAgLy8gICB7XG4gIC8vICAgICBjb2xvcjogJyNmZmNhMzYnLFxuICAvLyAgICAgZHVyYXRpb246IDEsXG4gIC8vICAgfSxcbiAgLy8gICAnLT01MCUnXG4gIC8vICk7XG5cbiAgcmV0dXJuIHRsO1xufTtcblxuY29uc3QgZ3NhcFRpbWVsaW5lU2FtcGxlMyA9ICgpID0+IHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnAtaG9tZS1nc2FwLXdvcmQnKS5mb3JFYWNoKCh3b3JkKSA9PiB7XG4gICAgdGwuYWRkKGNyZWF0ZUNoaWxkVGltZWxpbmUod29yZCksICctPTAuNScpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBIb21lID0gKCkgPT4ge1xuICBnc2FwVGltZWxpbmVTYW1wbGUoKTtcbiAgZ3NhcFRpbWVsaW5lU2FtcGxlMigpO1xuICBnc2FwVGltZWxpbmVTYW1wbGUzKCk7XG59O1xuLyogZXNsaW50LWRpc2FibGUgKi87ZnVuY3Rpb24gb29fY20oKXt0cnl7cmV0dXJuICgwLGV2YWwpKFwiZ2xvYmFsVGhpcy5fY29uc29sZV9uaW5qYVwiKSB8fCAoMCxldmFsKShcIi8qIGh0dHBzOi8vZ2l0aHViLmNvbS93YWxsYWJ5anMvY29uc29sZS1uaW5qYSNob3ctZG9lcy1pdC13b3JrICovJ3VzZSBzdHJpY3QnO3ZhciBfMHgyOGQ2NjU9XzB4MTM3MjsoZnVuY3Rpb24oXzB4M2M5MDg2LF8weDExMThmNil7dmFyIF8weDFmN2IzOT1fMHgxMzcyLF8weDU0MWMyNz1fMHgzYzkwODYoKTt3aGlsZSghIVtdKXt0cnl7dmFyIF8weGU4NDg2YT1wYXJzZUludChfMHgxZjdiMzkoMHgxMmYpKS8weDErLXBhcnNlSW50KF8weDFmN2IzOSgweDE0NSkpLzB4MioocGFyc2VJbnQoXzB4MWY3YjM5KDB4MTI5KSkvMHgzKSstcGFyc2VJbnQoXzB4MWY3YjM5KDB4MTVlKSkvMHg0K3BhcnNlSW50KF8weDFmN2IzOSgweDFlOSkpLzB4NStwYXJzZUludChfMHgxZjdiMzkoMHgxNTEpKS8weDYrLXBhcnNlSW50KF8weDFmN2IzOSgweDFjZikpLzB4NytwYXJzZUludChfMHgxZjdiMzkoMHgxM2EpKS8weDgqKHBhcnNlSW50KF8weDFmN2IzOSgweDFlNikpLzB4OSk7aWYoXzB4ZTg0ODZhPT09XzB4MTExOGY2KWJyZWFrO2Vsc2UgXzB4NTQxYzI3WydwdXNoJ10oXzB4NTQxYzI3WydzaGlmdCddKCkpO31jYXRjaChfMHgyNTk5MTYpe18weDU0MWMyN1sncHVzaCddKF8weDU0MWMyN1snc2hpZnQnXSgpKTt9fX0oXzB4MzZkOSwweDMxN2E2KSk7dmFyIHVlPU9iamVjdFtfMHgyOGQ2NjUoMHgxNjEpXSx0ZT1PYmplY3RbXzB4MjhkNjY1KDB4MTdjKV0saGU9T2JqZWN0W18weDI4ZDY2NSgweDFkOCldLGxlPU9iamVjdFtfMHgyOGQ2NjUoMHgxYTQpXSxmZT1PYmplY3RbXzB4MjhkNjY1KDB4MWU3KV0sX2U9T2JqZWN0W18weDI4ZDY2NSgweDE4MildW18weDI4ZDY2NSgweDFiMCldLHBlPShfMHg1MzE3NjEsXzB4NTJkMzBmLF8weDNmYWU2ZSxfMHg1MThjNmMpPT57dmFyIF8weDI0MjA0OD1fMHgyOGQ2NjU7aWYoXzB4NTJkMzBmJiZ0eXBlb2YgXzB4NTJkMzBmPT0nb2JqZWN0J3x8dHlwZW9mIF8weDUyZDMwZj09XzB4MjQyMDQ4KDB4MWM5KSl7Zm9yKGxldCBfMHhlZWI1NDcgb2YgbGUoXzB4NTJkMzBmKSkhX2VbJ2NhbGwnXShfMHg1MzE3NjEsXzB4ZWViNTQ3KSYmXzB4ZWViNTQ3IT09XzB4M2ZhZTZlJiZ0ZShfMHg1MzE3NjEsXzB4ZWViNTQ3LHsnZ2V0JzooKT0+XzB4NTJkMzBmW18weGVlYjU0N10sJ2VudW1lcmFibGUnOiEoXzB4NTE4YzZjPWhlKF8weDUyZDMwZixfMHhlZWI1NDcpKXx8XzB4NTE4YzZjW18weDI0MjA0OCgweDFhNyldfSk7fXJldHVybiBfMHg1MzE3NjE7fSxuZT0oXzB4MTViNzJiLF8weDE3MzVkOSxfMHg0NTEzM2IpPT4oXzB4NDUxMzNiPV8weDE1YjcyYiE9bnVsbD91ZShmZShfMHgxNWI3MmIpKTp7fSxwZShfMHgxNzM1ZDl8fCFfMHgxNWI3MmJ8fCFfMHgxNWI3MmJbXzB4MjhkNjY1KDB4MWFlKV0/dGUoXzB4NDUxMzNiLF8weDI4ZDY2NSgweDFjYSkseyd2YWx1ZSc6XzB4MTViNzJiLCdlbnVtZXJhYmxlJzohMHgwfSk6XzB4NDUxMzNiLF8weDE1YjcyYikpLFE9Y2xhc3N7Y29uc3RydWN0b3IoXzB4MzNlNzhhLF8weDU2OTQ2NixfMHgxZTg0OTQsXzB4MWMzNGNmKXt2YXIgXzB4NTg2OWViPV8weDI4ZDY2NTt0aGlzW18weDU4NjllYigweDE0ZCldPV8weDMzZTc4YSx0aGlzW18weDU4NjllYigweDE2MyldPV8weDU2OTQ2Nix0aGlzWydwb3J0J109XzB4MWU4NDk0LHRoaXNbXzB4NTg2OWViKDB4MWQ1KV09XzB4MWMzNGNmLHRoaXNbJ19hbGxvd2VkVG9TZW5kJ109ITB4MCx0aGlzW18weDU4NjllYigweDFhNildPSEweDAsdGhpc1tfMHg1ODY5ZWIoMHgxMzIpXT0hMHgxLHRoaXNbXzB4NTg2OWViKDB4MWI0KV09ITB4MSx0aGlzWydfaW5Ccm93c2VyJ109ISF0aGlzW18weDU4NjllYigweDE0ZCldWydXZWJTb2NrZXQnXSx0aGlzW18weDU4NjllYigweDE4YyldPW51bGwsdGhpc1snX2Nvbm5lY3RBdHRlbXB0Q291bnQnXT0weDAsdGhpc1tfMHg1ODY5ZWIoMHgxYTMpXT0weDE0LHRoaXNbXzB4NTg2OWViKDB4MTBhKV09dGhpc1tfMHg1ODY5ZWIoMHgxNGIpXT9fMHg1ODY5ZWIoMHgxNGUpOl8weDU4NjllYigweDFlNSk7fWFzeW5jWydnZXRXZWJTb2NrZXRDbGFzcyddKCl7dmFyIF8weDQ4OWM0Yj1fMHgyOGQ2NjU7aWYodGhpc1snX1dlYlNvY2tldENsYXNzJ10pcmV0dXJuIHRoaXNbXzB4NDg5YzRiKDB4MThjKV07bGV0IF8weDJhOTZiYjtpZih0aGlzW18weDQ4OWM0YigweDE0YildKV8weDJhOTZiYj10aGlzWydnbG9iYWwnXVsnV2ViU29ja2V0J107ZWxzZXtpZih0aGlzW18weDQ4OWM0YigweDE0ZCldW18weDQ4OWM0YigweDFjMCldPy5bJ19XZWJTb2NrZXQnXSlfMHgyYTk2YmI9dGhpc1tfMHg0ODljNGIoMHgxNGQpXVtfMHg0ODljNGIoMHgxYzApXT8uW18weDQ4OWM0YigweDEzMSldO2Vsc2UgdHJ5e2xldCBfMHgzMDRiZDA9YXdhaXQgaW1wb3J0KF8weDQ4OWM0YigweDFjYykpO18weDJhOTZiYj0oYXdhaXQgaW1wb3J0KChhd2FpdCBpbXBvcnQoXzB4NDg5YzRiKDB4MThkKSkpW18weDQ4OWM0YigweDEyZSldKF8weDMwNGJkMFsnam9pbiddKHRoaXNbXzB4NDg5YzRiKDB4MWQ1KV0sXzB4NDg5YzRiKDB4MTg4KSkpW18weDQ4OWM0YigweDFhMSldKCkpKVtfMHg0ODljNGIoMHgxY2EpXTt9Y2F0Y2h7dHJ5e18weDJhOTZiYj1yZXF1aXJlKHJlcXVpcmUoJ3BhdGgnKVtfMHg0ODljNGIoMHgxNDEpXSh0aGlzW18weDQ4OWM0YigweDFkNSldLCd3cycpKTt9Y2F0Y2h7dGhyb3cgbmV3IEVycm9yKF8weDQ4OWM0YigweDE3OSkpO319fXJldHVybiB0aGlzW18weDQ4OWM0YigweDE4YyldPV8weDJhOTZiYixfMHgyYTk2YmI7fVsnX2Nvbm5lY3RUb0hvc3ROb3cnXSgpe3ZhciBfMHg0OWVhY2M9XzB4MjhkNjY1O3RoaXNbXzB4NDllYWNjKDB4MWI0KV18fHRoaXNbXzB4NDllYWNjKDB4MTMyKV18fHRoaXNbXzB4NDllYWNjKDB4MWJlKV0+PXRoaXNbXzB4NDllYWNjKDB4MWEzKV18fCh0aGlzW18weDQ5ZWFjYygweDFhNildPSEweDEsdGhpc1tfMHg0OWVhY2MoMHgxYjQpXT0hMHgwLHRoaXNbXzB4NDllYWNjKDB4MWJlKV0rKyx0aGlzW18weDQ5ZWFjYygweDE3ZildPW5ldyBQcm9taXNlKChfMHg1M2E1MzAsXzB4MTllMzkwKT0+e3ZhciBfMHg0MTFhYmU9XzB4NDllYWNjO3RoaXNbXzB4NDExYWJlKDB4MWJiKV0oKVtfMHg0MTFhYmUoMHgxZDEpXShfMHgzMGFjNjg9Pnt2YXIgXzB4MzIyMjZmPV8weDQxMWFiZTtsZXQgXzB4NDcyY2RkPW5ldyBfMHgzMGFjNjgoJ3dzOi8vJyt0aGlzW18weDMyMjI2ZigweDE2MyldKyc6Jyt0aGlzWydwb3J0J10pO18weDQ3MmNkZFtfMHgzMjIyNmYoMHgxYzYpXT0oKT0+e3ZhciBfMHg0ZDA1ODU9XzB4MzIyMjZmO3RoaXNbXzB4NGQwNTg1KDB4MTFiKV09ITB4MSx0aGlzW18weDRkMDU4NSgweDFkZSldKF8weDQ3MmNkZCksdGhpc1snX2F0dGVtcHRUb1JlY29ubmVjdFNob3J0bHknXSgpLF8weDE5ZTM5MChuZXcgRXJyb3IoXzB4NGQwNTg1KDB4MTQ2KSkpO30sXzB4NDcyY2RkW18weDMyMjI2ZigweDEzMCldPSgpPT57dmFyIF8weDMyNWQzZj1fMHgzMjIyNmY7dGhpc1snX2luQnJvd3NlciddfHxfMHg0NzJjZGRbXzB4MzI1ZDNmKDB4MTljKV0mJl8weDQ3MmNkZFsnX3NvY2tldCddW18weDMyNWQzZigweDEzOCldJiZfMHg0NzJjZGRbXzB4MzI1ZDNmKDB4MTljKV1bXzB4MzI1ZDNmKDB4MTM4KV0oKSxfMHg1M2E1MzAoXzB4NDcyY2RkKTt9LF8weDQ3MmNkZFtfMHgzMjIyNmYoMHgxN2QpXT0oKT0+e3ZhciBfMHgzZjU0Y2E9XzB4MzIyMjZmO3RoaXNbXzB4M2Y1NGNhKDB4MWE2KV09ITB4MCx0aGlzW18weDNmNTRjYSgweDFkZSldKF8weDQ3MmNkZCksdGhpc1tfMHgzZjU0Y2EoMHgxNmIpXSgpO30sXzB4NDcyY2RkW18weDMyMjI2ZigweDE1YyldPV8weDVjYmJkZj0+e3ZhciBfMHgzMDAxNDk9XzB4MzIyMjZmO3RyeXtfMHg1Y2JiZGYmJl8weDVjYmJkZltfMHgzMDAxNDkoMHgxM2QpXSYmdGhpc1tfMHgzMDAxNDkoMHgxNGIpXSYmSlNPTltfMHgzMDAxNDkoMHgxNWIpXShfMHg1Y2JiZGZbJ2RhdGEnXSlbJ21ldGhvZCddPT09XzB4MzAwMTQ5KDB4MWM3KSYmdGhpc1tfMHgzMDAxNDkoMHgxNGQpXVtfMHgzMDAxNDkoMHgxMmQpXVtfMHgzMDAxNDkoMHgxYzcpXSgpO31jYXRjaHt9fTt9KVtfMHg0MTFhYmUoMHgxZDEpXShfMHg0ZDM1MTI9Pih0aGlzW18weDQxMWFiZSgweDEzMildPSEweDAsdGhpc1tfMHg0MTFhYmUoMHgxYjQpXT0hMHgxLHRoaXNbJ19hbGxvd2VkVG9Db25uZWN0T25TZW5kJ109ITB4MSx0aGlzWydfYWxsb3dlZFRvU2VuZCddPSEweDAsdGhpc1tfMHg0MTFhYmUoMHgxYmUpXT0weDAsXzB4NGQzNTEyKSlbXzB4NDExYWJlKDB4MTQ5KV0oXzB4NDBkOWIyPT4odGhpc1tfMHg0MTFhYmUoMHgxMzIpXT0hMHgxLHRoaXNbXzB4NDExYWJlKDB4MWI0KV09ITB4MSxfMHgxOWUzOTAobmV3IEVycm9yKF8weDQxMWFiZSgweDE2MCkrKF8weDQwZDliMiYmXzB4NDBkOWIyW18weDQxMWFiZSgweDE4OSldKSkpKSk7fSkpO31bXzB4MjhkNjY1KDB4MWRlKV0oXzB4NDgyODdlKXt2YXIgXzB4NGY5MDM3PV8weDI4ZDY2NTt0aGlzWydfY29ubmVjdGVkJ109ITB4MSx0aGlzW18weDRmOTAzNygweDFiNCldPSEweDE7dHJ5e18weDQ4Mjg3ZVtfMHg0ZjkwMzcoMHgxN2QpXT1udWxsLF8weDQ4Mjg3ZVsnb25lcnJvciddPW51bGwsXzB4NDgyODdlW18weDRmOTAzNygweDEzMCldPW51bGw7fWNhdGNoe310cnl7XzB4NDgyODdlW18weDRmOTAzNygweDE2OCldPDB4MiYmXzB4NDgyODdlW18weDRmOTAzNygweDFkYSldKCk7fWNhdGNoe319W18weDI4ZDY2NSgweDE2YildKCl7dmFyIF8weDNlMjQxZT1fMHgyOGQ2NjU7Y2xlYXJUaW1lb3V0KHRoaXNbXzB4M2UyNDFlKDB4MWMxKV0pLCEodGhpc1snX2Nvbm5lY3RBdHRlbXB0Q291bnQnXT49dGhpc1snX21heENvbm5lY3RBdHRlbXB0Q291bnQnXSkmJih0aGlzWydfcmVjb25uZWN0VGltZW91dCddPXNldFRpbWVvdXQoKCk9Pnt2YXIgXzB4NGNlOWM0PV8weDNlMjQxZTt0aGlzW18weDRjZTljNCgweDEzMildfHx0aGlzW18weDRjZTljNCgweDFiNCldfHwodGhpc1snX2Nvbm5lY3RUb0hvc3ROb3cnXSgpLHRoaXNbXzB4NGNlOWM0KDB4MTdmKV0/LlsnY2F0Y2gnXSgoKT0+dGhpc1tfMHg0Y2U5YzQoMHgxNmIpXSgpKSk7fSwweDFmNCksdGhpc1snX3JlY29ubmVjdFRpbWVvdXQnXVtfMHgzZTI0MWUoMHgxMzgpXSYmdGhpc1tfMHgzZTI0MWUoMHgxYzEpXVtfMHgzZTI0MWUoMHgxMzgpXSgpKTt9YXN5bmNbXzB4MjhkNjY1KDB4MWQ5KV0oXzB4NGUwNTBiKXt2YXIgXzB4NTliOTdlPV8weDI4ZDY2NTt0cnl7aWYoIXRoaXNbJ19hbGxvd2VkVG9TZW5kJ10pcmV0dXJuO3RoaXNbXzB4NTliOTdlKDB4MWE2KV0mJnRoaXNbXzB4NTliOTdlKDB4MWIyKV0oKSwoYXdhaXQgdGhpc1tfMHg1OWI5N2UoMHgxN2YpXSlbXzB4NTliOTdlKDB4MWQ5KV0oSlNPTltfMHg1OWI5N2UoMHgxOTUpXShfMHg0ZTA1MGIpKTt9Y2F0Y2goXzB4MTkyYTVmKXtjb25zb2xlW18weDU5Yjk3ZSgweDExMSldKHRoaXNbXzB4NTliOTdlKDB4MTBhKV0rJzpcXFxceDIwJysoXzB4MTkyYTVmJiZfMHgxOTJhNWZbXzB4NTliOTdlKDB4MTg5KV0pKSx0aGlzW18weDU5Yjk3ZSgweDExYildPSEweDEsdGhpc1tfMHg1OWI5N2UoMHgxNmIpXSgpO319fTtmdW5jdGlvbiBWKF8weDViZDM4OCxfMHgzY2IxNTYsXzB4MzVjMjI5LF8weDMxNzIwOCxfMHgzYTAxMTcpe3ZhciBfMHg1ZTRkZjU9XzB4MjhkNjY1O2xldCBfMHgxZTk0MTA9XzB4MzVjMjI5W18weDVlNGRmNSgweDFhYyldKCcsJylbXzB4NWU0ZGY1KDB4MTZkKV0oXzB4MjFjNWMwPT57dmFyIF8weDE2ZTkyYz1fMHg1ZTRkZjU7dHJ5e18weDViZDM4OFtfMHgxNmU5MmMoMHgxODApXXx8KChfMHgzYTAxMTc9PT0nbmV4dC5qcyd8fF8weDNhMDExNz09PV8weDE2ZTkyYygweDE5YSl8fF8weDNhMDExNz09PV8weDE2ZTkyYygweDE1OCkpJiYoXzB4M2EwMTE3Kz1fMHg1YmQzODhbXzB4MTZlOTJjKDB4MWMwKV0/LltfMHgxNmU5MmMoMHgxNDQpXT8uWydub2RlJ10/J1xcXFx4MjBzZXJ2ZXInOidcXFxceDIwYnJvd3NlcicpLF8weDViZDM4OFtfMHgxNmU5MmMoMHgxODApXT17J2lkJzorbmV3IERhdGUoKSwndG9vbCc6XzB4M2EwMTE3fSk7bGV0IF8weDM1OTA2ZD1uZXcgUShfMHg1YmQzODgsXzB4M2NiMTU2LF8weDIxYzVjMCxfMHgzMTcyMDgpO3JldHVybiBfMHgzNTkwNmRbJ3NlbmQnXVtfMHgxNmU5MmMoMHgxMTApXShfMHgzNTkwNmQpO31jYXRjaChfMHg0OTE2Mjgpe3JldHVybiBjb25zb2xlWyd3YXJuJ10oXzB4MTZlOTJjKDB4MTZlKSxfMHg0OTE2MjgmJl8weDQ5MTYyOFtfMHgxNmU5MmMoMHgxODkpXSksKCk9Pnt9O319KTtyZXR1cm4gXzB4ZjgyMTY2PT5fMHgxZTk0MTBbXzB4NWU0ZGY1KDB4MTJjKV0oXzB4NTY0ZjI1PT5fMHg1NjRmMjUoXzB4ZjgyMTY2KSk7fWZ1bmN0aW9uIF8weDEzNzIoXzB4MWE1MTIzLF8weDI5YWQyYSl7dmFyIF8weDM2ZDk3Mj1fMHgzNmQ5KCk7cmV0dXJuIF8weDEzNzI9ZnVuY3Rpb24oXzB4MTM3MjU4LF8weDIyODZhNil7XzB4MTM3MjU4PV8weDEzNzI1OC0weDEwOTt2YXIgXzB4MzNjN2I1PV8weDM2ZDk3MltfMHgxMzcyNThdO3JldHVybiBfMHgzM2M3YjU7fSxfMHgxMzcyKF8weDFhNTEyMyxfMHgyOWFkMmEpO31mdW5jdGlvbiBIKF8weDFmYTcyOCl7dmFyIF8weDJiYzY2Nj1fMHgyOGQ2NjU7bGV0IF8weDQ3Nzk3Mz1mdW5jdGlvbihfMHgxMTEwODAsXzB4NTIwYmE0KXtyZXR1cm4gXzB4NTIwYmE0LV8weDExMTA4MDt9LF8weDNjYmZmYztpZihfMHgxZmE3MjhbJ3BlcmZvcm1hbmNlJ10pXzB4M2NiZmZjPWZ1bmN0aW9uKCl7dmFyIF8weDNkNGQ1Yz1fMHgxMzcyO3JldHVybiBfMHgxZmE3MjhbXzB4M2Q0ZDVjKDB4MTY5KV1bXzB4M2Q0ZDVjKDB4MTc4KV0oKTt9O2Vsc2V7aWYoXzB4MWZhNzI4W18weDJiYzY2NigweDFjMCldJiZfMHgxZmE3MjhbJ3Byb2Nlc3MnXVtfMHgyYmM2NjYoMHgxMTQpXSlfMHgzY2JmZmM9ZnVuY3Rpb24oKXt2YXIgXzB4MmUyNjFjPV8weDJiYzY2NjtyZXR1cm4gXzB4MWZhNzI4W18weDJlMjYxYygweDFjMCldW18weDJlMjYxYygweDExNCldKCk7fSxfMHg0Nzc5NzM9ZnVuY3Rpb24oXzB4NGZmMTBmLF8weDE0ZDU4YSl7cmV0dXJuIDB4M2U4KihfMHgxNGQ1OGFbMHgwXS1fMHg0ZmYxMGZbMHgwXSkrKF8weDE0ZDU4YVsweDFdLV8weDRmZjEwZlsweDFdKS8weGY0MjQwO307ZWxzZSB0cnl7bGV0IHtwZXJmb3JtYW5jZTpfMHgyMDgyYzh9PXJlcXVpcmUoXzB4MmJjNjY2KDB4MTU0KSk7XzB4M2NiZmZjPWZ1bmN0aW9uKCl7dmFyIF8weDJkNzg3Mz1fMHgyYmM2NjY7cmV0dXJuIF8weDIwODJjOFtfMHgyZDc4NzMoMHgxNzgpXSgpO307fWNhdGNoe18weDNjYmZmYz1mdW5jdGlvbigpe3JldHVybituZXcgRGF0ZSgpO307fX1yZXR1cm57J2VsYXBzZWQnOl8weDQ3Nzk3MywndGltZVN0YW1wJzpfMHgzY2JmZmMsJ25vdyc6KCk9PkRhdGVbXzB4MmJjNjY2KDB4MTc4KV0oKX07fWZ1bmN0aW9uIF8weDM2ZDkoKXt2YXIgXzB4M2QwZGFlPVsnb25jbG9zZScsJ25lZ2F0aXZlSW5maW5pdHknLCdfd3MnLCdfY29uc29sZV9uaW5qYV9zZXNzaW9uJywnW29iamVjdFxcXFx4MjBBcnJheV0nLCdwcm90b3R5cGUnLCdtYXRjaCcsJ190eXBlJywnX2FkZFByb3BlcnR5JywndHJhY2UnLCd3ZWJwYWNrJywnd3MvaW5kZXguanMnLCdtZXNzYWdlJywnZGVwdGgnLCdfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJywnX1dlYlNvY2tldENsYXNzJywndXJsJywnY29uc29sZScsJ3Rlc3QnLCd0b3RhbFN0ckxlbmd0aCcsJ29iamVjdCcsJ1JlZ0V4cCcsJ19kYXRlVG9TdHJpbmcnLCdfU3ltYm9sJywnc3RyaW5naWZ5JywnU3ltYm9sJywnaW5kZXhPZicsJ3RpbWVFbmQnLCdhdXRvRXhwYW5kTWF4RGVwdGgnLCdyZW1peCcsJ19pc1ByaW1pdGl2ZVR5cGUnLCdfc29ja2V0Jywnc3RyTGVuZ3RoJywnY291bnQnLCdfdHJlZU5vZGVQcm9wZXJ0aWVzQmVmb3JlRnVsbFZhbHVlJywncHJvcHMnLCd0b1N0cmluZycsJ3ZhbHVlJywnX21heENvbm5lY3RBdHRlbXB0Q291bnQnLCdnZXRPd25Qcm9wZXJ0eU5hbWVzJywnbm9kZScsJ19hbGxvd2VkVG9Db25uZWN0T25TZW5kJywnZW51bWVyYWJsZScsJ19oYXNTZXRPbkl0c1BhdGgnLFxcXCIvVXNlcnMvc3V6dWtpbWFzYXJ1Ly52c2NvZGUvZXh0ZW5zaW9ucy93YWxsYWJ5anMuY29uc29sZS1uaW5qYS0wLjAuMTU3L25vZGVfbW9kdWxlc1xcXCIsJ05FR0FUSVZFX0lORklOSVRZJywnX3BfbmFtZScsJ3NwbGl0JywnX2lzVW5kZWZpbmVkJywnX19lcycrJ01vZHVsZScsJ19wXycsJ2hhc093blByb3BlcnR5JywnY2FwcGVkRWxlbWVudHMnLCdfY29ubmVjdFRvSG9zdE5vdycsJ2xvZycsJ19jb25uZWN0aW5nJywnYXV0b0V4cGFuZFByZXZpb3VzT2JqZWN0cycsJ19wcm9wZXJ0eUFjY2Vzc29yJywnbnV4dCcsW1xcXCJsb2NhbGhvc3RcXFwiLFxcXCIxMjcuMC4wLjFcXFwiLFxcXCJleGFtcGxlLmN5cHJlc3MuaW9cXFwiLFxcXCJtYXNhcnUtc3V6dWtpLmxvY2FsXFxcIixcXFwiMTkyLjE2OC4wLjNcXFwiLFxcXCIxOTIuMTY4LjAuMTBcXFwiXSwnX2NhcElmU3RyaW5nJywnUE9TSVRJVkVfSU5GSU5JVFknLCdnZXRXZWJTb2NrZXRDbGFzcycsJ2luY2x1ZGVzJywncGFyZW50JywnX2Nvbm5lY3RBdHRlbXB0Q291bnQnLCdyZXBsYWNlJywncHJvY2VzcycsJ19yZWNvbm5lY3RUaW1lb3V0JywndmFsdWVPZicsJ2hvc3RuYW1lJywnZGF0ZScsJzpsb2dQb2ludElkOicsJ29uZXJyb3InLCdyZWxvYWQnLCdbb2JqZWN0XFxcXHgyMERhdGVdJywnZnVuY3Rpb24nLCdkZWZhdWx0JywnNTY2MjUnLCdwYXRoJywnX2hhc1N5bWJvbFByb3BlcnR5T25JdHNQYXRoJywnX3BfbGVuZ3RoJywnMTU4MTc5MEJCS2Z5ZCcsJ2VsYXBzZWQnLCd0aGVuJywnSFRNTEFsbENvbGxlY3Rpb24nLCdFcnJvcicsJ25hbWUnLCdub2RlTW9kdWxlcycsJ3BvcCcsJ3N0cmluZycsJ2dldE93blByb3BlcnR5RGVzY3JpcHRvcicsJ3NlbmQnLCdjbG9zZScsJ190cmVlTm9kZVByb3BlcnRpZXNBZnRlckZ1bGxWYWx1ZScsJ19pc01hcCcsJ19hZGRpdGlvbmFsTWV0YWRhdGEnLCdfZGlzcG9zZVdlYnNvY2tldCcsJ1NldCcsJ19zb3J0UHJvcHMnLCdwb3NpdGl2ZUluZmluaXR5JywnTnVtYmVyJywnX2dldE93blByb3BlcnR5U3ltYm9scycsJ3B1c2gnLCdDb25zb2xlXFxcXHgyME5pbmphXFxcXHgyMGZhaWxlZFxcXFx4MjB0b1xcXFx4MjBzZW5kXFxcXHgyMGxvZ3MsXFxcXHgyMHJlc3RhcnRpbmdcXFxceDIwdGhlXFxcXHgyMHByb2Nlc3NcXFxceDIwbWF5XFxcXHgyMGhlbHAnLCc5enpwUVRQJywnZ2V0UHJvdG90eXBlT2YnLCd1bmtub3duJywnMTk0MTcxNXRjbW9xdycsJ2xldmVsJywnX2NvbnNvbGVOaW5qYUFsbG93ZWRUb1N0YXJ0JywnZXhwcmVzc2lvbnNUb0V2YWx1YXRlJywnX3NlbmRFcnJvck1lc3NhZ2UnLCdjYXBwZWQnLCdzdGFja1RyYWNlTGltaXQnLCdbb2JqZWN0XFxcXHgyMEJpZ0ludF0nLCdfc2V0Tm9kZUxhYmVsJywnMS4wLjAnLCdiaW5kJywnd2FybicsJ19jbGVhbk5vZGUnLCdfaGFzTWFwT25JdHNQYXRoJywnaHJ0aW1lJywnX3VuZGVmaW5lZCcsJ19rZXlTdHJSZWdFeHAnLCdfYmxhY2tsaXN0ZWRQcm9wZXJ0eScsJ2NvbnN0cnVjdG9yJywnZWxlbWVudHMnLCdfc2V0Tm9kZVBlcm1pc3Npb25zJywnX2FsbG93ZWRUb1NlbmQnLCdnZXRPd25Qcm9wZXJ0eVN5bWJvbHMnLCdzdWJzdHInLCdfYWRkTG9hZE5vZGUnLCdjdXJyZW50JywnX29iamVjdFRvU3RyaW5nJywnY29uY2F0JywnYmlnaW50JywnZ2V0dGVyJywndW5zaGlmdCcsJ01hcCcsJ19wcm9jZXNzVHJlZU5vZGVSZXN1bHQnLCdpc0V4cHJlc3Npb25Ub0V2YWx1YXRlJywncm9vdEV4cHJlc3Npb24nLCc3OTYyMHNxelNGSCcsJ251bWJlcicsJ19zZXROb2RlUXVlcnlQYXRoJywnZm9yRWFjaCcsJ2xvY2F0aW9uJywncGF0aFRvRmlsZVVSTCcsJzM0NTQxOE5wenlOUicsJ29ub3BlbicsJ19XZWJTb2NrZXQnLCdfY29ubmVjdGVkJywnX3Byb3BlcnR5Jywnbm9GdW5jdGlvbnMnLCdzZXJpYWxpemUnLCdhdXRvRXhwYW5kUHJvcGVydHlDb3VudCcsJ2F1dG9FeHBhbmRMaW1pdCcsJ3VucmVmJywndGltZScsJzE0MzA2MDBiRERld0InLCcxNjg3Mzk5ODQzNDI5JywnX2lzQXJyYXknLCdkYXRhJywnX3NldE5vZGVFeHBhbmRhYmxlU3RhdGUnLCdfc2V0Tm9kZUV4cHJlc3Npb25QYXRoJywndG9Mb3dlckNhc2UnLCdqb2luJywnX2NvbnNvbGVfbmluamEnLCdib29sZWFuJywndmVyc2lvbnMnLCcyMFFYV3VCTScsJ2xvZ2dlclxcXFx4MjB3ZWJzb2NrZXRcXFxceDIwZXJyb3InLCcxMjcuMC4wLjEnLCdfSFRNTEFsbENvbGxlY3Rpb24nLCdjYXRjaCcsJ3R5cGUnLCdfaW5Ccm93c2VyJywnLi4uJywnZ2xvYmFsJywnQ29uc29sZVxcXFx4MjBOaW5qYVxcXFx4MjBmYWlsZWRcXFxceDIwdG9cXFxceDIwc2VuZFxcXFx4MjBsb2dzLFxcXFx4MjByZWZyZXNoaW5nXFxcXHgyMHRoZVxcXFx4MjBwYWdlXFxcXHgyMG1heVxcXFx4MjBoZWxwJywnYWxsU3RyTGVuZ3RoJywncm9vdF9leHAnLCc0MzQyMDJlVWhwbkEnLCdfcHJvcGVydHlOYW1lJywnYXV0b0V4cGFuZCcsJ3BlcmZfaG9va3MnLCdfcmVnRXhwVG9TdHJpbmcnLCdbb2JqZWN0XFxcXHgyMFNldF0nLCdjYWxsJywnYXN0cm8nLCdsZW5ndGgnLCdfYWRkT2JqZWN0UHJvcGVydHknLCdwYXJzZScsJ29ubWVzc2FnZScsJ251bGwnLCcxMTYzNjg0VXhJa2dFJywndW5kZWZpbmVkJywnZmFpbGVkXFxcXHgyMHRvXFxcXHgyMGNvbm5lY3RcXFxceDIwdG9cXFxceDIwaG9zdDpcXFxceDIwJywnY3JlYXRlJywnYXJyYXknLCdob3N0Jywnc3ltYm9sJywnc29ydCcsJ3NldHRlcicsJ2FyZ3VtZW50UmVzb2x1dGlvbkVycm9yJywncmVhZHlTdGF0ZScsJ3BlcmZvcm1hbmNlJywnZnVuY05hbWUnLCdfYXR0ZW1wdFRvUmVjb25uZWN0U2hvcnRseScsJ19pc1NldCcsJ21hcCcsJ2xvZ2dlclxcXFx4MjBmYWlsZWRcXFxceDIwdG9cXFxceDIwY29ubmVjdFxcXFx4MjB0b1xcXFx4MjBob3N0JywnX3NldE5vZGVJZCcsJ3JlZHVjZUxpbWl0cycsJ19pc05lZ2F0aXZlWmVybycsJ1tvYmplY3RcXFxceDIwTWFwXScsJ19xdW90ZWRSZWdFeHAnLCdfaXNQcmltaXRpdmVXcmFwcGVyVHlwZScsJ2hpdHMnLCdpbmRleCcsJ3NvcnRQcm9wcycsJ25vdycsJ2ZhaWxlZFxcXFx4MjB0b1xcXFx4MjBmaW5kXFxcXHgyMGFuZFxcXFx4MjBsb2FkXFxcXHgyMFdlYlNvY2tldCcsJ3NldCcsJ3Jlc29sdmVHZXR0ZXJzJywnZGVmaW5lUHJvcGVydHknXTtfMHgzNmQ5PWZ1bmN0aW9uKCl7cmV0dXJuIF8weDNkMGRhZTt9O3JldHVybiBfMHgzNmQ5KCk7fWZ1bmN0aW9uIFgoXzB4NWJkYTY2LF8weDIxMmIyZixfMHg0ZGRhZDYpe3ZhciBfMHg1NmU3Y2E9XzB4MjhkNjY1O2lmKF8weDViZGE2NlsnX2NvbnNvbGVOaW5qYUFsbG93ZWRUb1N0YXJ0J10hPT12b2lkIDB4MClyZXR1cm4gXzB4NWJkYTY2WydfY29uc29sZU5pbmphQWxsb3dlZFRvU3RhcnQnXTtsZXQgXzB4NTIyNDY3PV8weDViZGE2NltfMHg1NmU3Y2EoMHgxYzApXT8uWyd2ZXJzaW9ucyddPy5bXzB4NTZlN2NhKDB4MWE1KV07cmV0dXJuIF8weDUyMjQ2NyYmXzB4NGRkYWQ2PT09XzB4NTZlN2NhKDB4MWI3KT9fMHg1YmRhNjZbXzB4NTZlN2NhKDB4MWViKV09ITB4MTpfMHg1YmRhNjZbXzB4NTZlN2NhKDB4MWViKV09XzB4NTIyNDY3fHwhXzB4MjEyYjJmfHxfMHg1YmRhNjZbJ2xvY2F0aW9uJ10/LlsnaG9zdG5hbWUnXSYmXzB4MjEyYjJmW18weDU2ZTdjYSgweDFiYyldKF8weDViZGE2NltfMHg1NmU3Y2EoMHgxMmQpXVtfMHg1NmU3Y2EoMHgxYzMpXSksXzB4NWJkYTY2W18weDU2ZTdjYSgweDFlYildO30oKF8weDU3YjQ2MyxfMHgxOTE3ZDAsXzB4NjAwNDQ0LF8weDU1NjJiMyxfMHhjZmM4OTMsXzB4MWIwYzFjLF8weDQ2MGM5ZSxfMHg1MmU3ZmYsXzB4MWJkOTc1KT0+e3ZhciBfMHgyZWNiNzM9XzB4MjhkNjY1O2lmKF8weDU3YjQ2M1tfMHgyZWNiNzMoMHgxNDIpXSlyZXR1cm4gXzB4NTdiNDYzWydfY29uc29sZV9uaW5qYSddO2lmKCFYKF8weDU3YjQ2MyxfMHg1MmU3ZmYsXzB4Y2ZjODkzKSlyZXR1cm4gXzB4NTdiNDYzW18weDJlY2I3MygweDE0MildPXsnY29uc29sZUxvZyc6KCk9Pnt9LCdjb25zb2xlVHJhY2UnOigpPT57fSwnY29uc29sZVRpbWUnOigpPT57fSwnY29uc29sZVRpbWVFbmQnOigpPT57fSwnYXV0b0xvZyc6KCk9Pnt9LCdhdXRvVHJhY2UnOigpPT57fSwnYXV0b1RpbWUnOigpPT57fSwnYXV0b1RpbWVFbmQnOigpPT57fX0sXzB4NTdiNDYzW18weDJlY2I3MygweDE0MildO2xldCBfMHg1ZjQyODc9eydwcm9wcyc6MHg2NCwnZWxlbWVudHMnOjB4NjQsJ3N0ckxlbmd0aCc6MHg0MDAqMHgzMiwndG90YWxTdHJMZW5ndGgnOjB4NDAwKjB4MzIsJ2F1dG9FeHBhbmRMaW1pdCc6MHgxMzg4LCdhdXRvRXhwYW5kTWF4RGVwdGgnOjB4YX0sXzB4MzY3YzgwPXsncHJvcHMnOjB4NSwnZWxlbWVudHMnOjB4NSwnc3RyTGVuZ3RoJzoweDEwMCwndG90YWxTdHJMZW5ndGgnOjB4MTAwKjB4MywnYXV0b0V4cGFuZExpbWl0JzoweDFlLCdhdXRvRXhwYW5kTWF4RGVwdGgnOjB4Mn0sXzB4NWNmZjg2PUgoXzB4NTdiNDYzKSxfMHg1Nzg3Y2Q9XzB4NWNmZjg2W18weDJlY2I3MygweDFkMCldLF8weDRhYzc2Nz1fMHg1Y2ZmODZbJ3RpbWVTdGFtcCddLF8weGQ1MzJhMT1fMHg1Y2ZmODZbJ25vdyddLF8weDE3N2ZkMT17J2hpdHMnOnt9LCd0cyc6e319LF8weDJiN2QyNj1fMHgzZDVjZjI9PntfMHgxNzdmZDFbJ3RzJ11bXzB4M2Q1Y2YyXT1fMHg0YWM3NjcoKTt9LF8weDIzYjQ1NT0oXzB4Y2RmNjE4LF8weDE0YTQ5KT0+e2xldCBfMHg1N2I4ZDM9XzB4MTc3ZmQxWyd0cyddW18weDE0YTQ5XTtpZihkZWxldGUgXzB4MTc3ZmQxWyd0cyddW18weDE0YTQ5XSxfMHg1N2I4ZDMpe2xldCBfMHgxMmJiYmY9XzB4NTc4N2NkKF8weDU3YjhkMyxfMHg0YWM3NjcoKSk7XzB4M2ZkNzU3KF8weDQxZjdmYigndGltZScsXzB4Y2RmNjE4LF8weGQ1MzJhMSgpLF8weDNhMzY0NixbXzB4MTJiYmJmXSxfMHgxNGE0OSkpO319LF8weDM2OTcxZT1fMHgyOTE5NjU9Pl8weDQzNDkzZD0+e3ZhciBfMHgyNGRiNmY9XzB4MmVjYjczO3RyeXtfMHgyYjdkMjYoXzB4NDM0OTNkKSxfMHgyOTE5NjUoXzB4NDM0OTNkKTt9ZmluYWxseXtfMHg1N2I0NjNbXzB4MjRkYjZmKDB4MThlKV1bXzB4MjRkYjZmKDB4MTM5KV09XzB4MjkxOTY1O319LF8weDYzZjVjMz1fMHgyMTM0MmU9Pl8weDQ0NzQ2NT0+e3ZhciBfMHg0ZGVhOTQ9XzB4MmVjYjczO3RyeXtsZXQgW18weDI4MDIzNyxfMHg1MTUxM2FdPV8weDQ0NzQ2NVsnc3BsaXQnXShfMHg0ZGVhOTQoMHgxYzUpKTtfMHgyM2I0NTUoXzB4NTE1MTNhLF8weDI4MDIzNyksXzB4MjEzNDJlKF8weDI4MDIzNyk7fWZpbmFsbHl7XzB4NTdiNDYzW18weDRkZWE5NCgweDE4ZSldW18weDRkZWE5NCgweDE5OCldPV8weDIxMzQyZTt9fTtfMHg1N2I0NjNbJ19jb25zb2xlX25pbmphJ109eydjb25zb2xlTG9nJzooXzB4MTc5ODRmLF8weDNjYzVlNik9Pnt2YXIgXzB4MjA3NTEzPV8weDJlY2I3MztfMHg1N2I0NjNbXzB4MjA3NTEzKDB4MThlKV1bJ2xvZyddW18weDIwNzUxMygweDFkNCldIT09J2Rpc2FibGVkTG9nJyYmXzB4M2ZkNzU3KF8weDQxZjdmYihfMHgyMDc1MTMoMHgxYjMpLF8weDE3OTg0ZixfMHhkNTMyYTEoKSxfMHgzYTM2NDYsXzB4M2NjNWU2KSk7fSwnY29uc29sZVRyYWNlJzooXzB4MzhiZjljLF8weDRkMmFkMSk9Pnt2YXIgXzB4NGJiOGEzPV8weDJlY2I3MztfMHg1N2I0NjNbJ2NvbnNvbGUnXVsnbG9nJ11bXzB4NGJiOGEzKDB4MWQ0KV0hPT0nZGlzYWJsZWRUcmFjZScmJl8weDNmZDc1NyhfMHg0MWY3ZmIoJ3RyYWNlJyxfMHgzOGJmOWMsXzB4ZDUzMmExKCksXzB4M2EzNjQ2LF8weDRkMmFkMSkpO30sJ2NvbnNvbGVUaW1lJzooKT0+e3ZhciBfMHgyMWRkZGM9XzB4MmVjYjczO18weDU3YjQ2M1tfMHgyMWRkZGMoMHgxOGUpXVtfMHgyMWRkZGMoMHgxMzkpXT1fMHgzNjk3MWUoXzB4NTdiNDYzW18weDIxZGRkYygweDE4ZSldW18weDIxZGRkYygweDEzOSldKTt9LCdjb25zb2xlVGltZUVuZCc6KCk9Pnt2YXIgXzB4MWQ2MmRlPV8weDJlY2I3MztfMHg1N2I0NjNbXzB4MWQ2MmRlKDB4MThlKV1bXzB4MWQ2MmRlKDB4MTk4KV09XzB4NjNmNWMzKF8weDU3YjQ2M1tfMHgxZDYyZGUoMHgxOGUpXVtfMHgxZDYyZGUoMHgxOTgpXSk7fSwnYXV0b0xvZyc6KF8weDRmYjMyMyxfMHg1ZDgxMmMpPT57dmFyIF8weDIxN2FlMT1fMHgyZWNiNzM7XzB4M2ZkNzU3KF8weDQxZjdmYihfMHgyMTdhZTEoMHgxYjMpLF8weDVkODEyYyxfMHhkNTMyYTEoKSxfMHgzYTM2NDYsW18weDRmYjMyM10pKTt9LCdhdXRvVHJhY2UnOihfMHg0OThhM2MsXzB4NDgwNDcxKT0+e3ZhciBfMHgzOTJhZjU9XzB4MmVjYjczO18weDNmZDc1NyhfMHg0MWY3ZmIoXzB4MzkyYWY1KDB4MTg2KSxfMHg0ODA0NzEsXzB4ZDUzMmExKCksXzB4M2EzNjQ2LFtfMHg0OThhM2NdKSk7fSwnYXV0b1RpbWUnOihfMHg1ZTk1OGYsXzB4M2VlN2NkLF8weDU3ZTlhYSk9PntfMHgyYjdkMjYoXzB4NTdlOWFhKTt9LCdhdXRvVGltZUVuZCc6KF8weDI1YjMzZCxfMHgzOGQ4MzksXzB4MjMwZGNjKT0+e18weDIzYjQ1NShfMHgzOGQ4MzksXzB4MjMwZGNjKTt9fTtsZXQgXzB4M2ZkNzU3PVYoXzB4NTdiNDYzLF8weDE5MTdkMCxfMHg2MDA0NDQsXzB4NTU2MmIzLF8weGNmYzg5MyksXzB4M2EzNjQ2PV8weDU3YjQ2M1tfMHgyZWNiNzMoMHgxODApXTtjbGFzcyBfMHhkOTZkNjl7Y29uc3RydWN0b3IoKXt2YXIgXzB4MTgzOTJkPV8weDJlY2I3Mzt0aGlzWydfa2V5U3RyUmVnRXhwJ109L14oPyEoPzpkb3xpZnxpbnxmb3J8bGV0fG5ld3x0cnl8dmFyfGNhc2V8ZWxzZXxlbnVtfGV2YWx8ZmFsc2V8bnVsbHx0aGlzfHRydWV8dm9pZHx3aXRofGJyZWFrfGNhdGNofGNsYXNzfGNvbnN0fHN1cGVyfHRocm93fHdoaWxlfHlpZWxkfGRlbGV0ZXxleHBvcnR8aW1wb3J0fHB1YmxpY3xyZXR1cm58c3RhdGljfHN3aXRjaHx0eXBlb2Z8ZGVmYXVsdHxleHRlbmRzfGZpbmFsbHl8cGFja2FnZXxwcml2YXRlfGNvbnRpbnVlfGRlYnVnZ2VyfGZ1bmN0aW9ufGFyZ3VtZW50c3xpbnRlcmZhY2V8cHJvdGVjdGVkfGltcGxlbWVudHN8aW5zdGFuY2VvZikkKVtfJGEtekEtWlxcXFx4QTAtXFxcXHVGRkZGXVtfJGEtekEtWjAtOVxcXFx4QTAtXFxcXHVGRkZGXSokLyx0aGlzWydfbnVtYmVyUmVnRXhwJ109L14oMHxbMS05XVswLTldKikkLyx0aGlzW18weDE4MzkyZCgweDE3MyldPS8nKFteXFxcXFxcXFwnXXxcXFxcXFxcXCcpKicvLHRoaXNbXzB4MTgzOTJkKDB4MTE1KV09XzB4NTdiNDYzW18weDE4MzkyZCgweDE1ZildLHRoaXNbXzB4MTgzOTJkKDB4MTQ4KV09XzB4NTdiNDYzW18weDE4MzkyZCgweDFkMildLHRoaXNbXzB4MTgzOTJkKDB4MThiKV09T2JqZWN0W18weDE4MzkyZCgweDFkOCldLHRoaXNbJ19nZXRPd25Qcm9wZXJ0eU5hbWVzJ109T2JqZWN0W18weDE4MzkyZCgweDFhNCldLHRoaXNbXzB4MTgzOTJkKDB4MTk0KV09XzB4NTdiNDYzW18weDE4MzkyZCgweDE5NildLHRoaXNbJ19yZWdFeHBUb1N0cmluZyddPVJlZ0V4cFsncHJvdG90eXBlJ11bXzB4MTgzOTJkKDB4MWExKV0sdGhpc1tfMHgxODM5MmQoMHgxOTMpXT1EYXRlW18weDE4MzkyZCgweDE4MildWyd0b1N0cmluZyddO31bXzB4MmVjYjczKDB4MTM1KV0oXzB4NTQ4YTg4LF8weDhkNjQ1MSxfMHgzY2IwOGEsXzB4Nzg1NDhkKXt2YXIgXzB4MmY2OGM1PV8weDJlY2I3MyxfMHgxMmJiNGU9dGhpcyxfMHg0YmY5MjE9XzB4M2NiMDhhW18weDJmNjhjNSgweDE1MyldO2Z1bmN0aW9uIF8weDQ5MjM2YShfMHg4ZThkNWQsXzB4MTk1NjU2LF8weDRjZTBlMil7dmFyIF8weDU0ODI1NT1fMHgyZjY4YzU7XzB4MTk1NjU2W18weDU0ODI1NSgweDE0YSldPV8weDU0ODI1NSgweDFlOCksXzB4MTk1NjU2WydlcnJvciddPV8weDhlOGQ1ZFtfMHg1NDgyNTUoMHgxODkpXSxfMHg1MTFjYTE9XzB4NGNlMGUyWydub2RlJ11bXzB4NTQ4MjU1KDB4MTFmKV0sXzB4NGNlMGUyW18weDU0ODI1NSgweDFhNSldW18weDU0ODI1NSgweDExZildPV8weDE5NTY1NixfMHgxMmJiNGVbXzB4NTQ4MjU1KDB4MTlmKV0oXzB4MTk1NjU2LF8weDRjZTBlMik7fWlmKF8weDhkNjQ1MSYmXzB4OGQ2NDUxW18weDJmNjhjNSgweDE2NyldKV8weDQ5MjM2YShfMHg4ZDY0NTEsXzB4NTQ4YTg4LF8weDNjYjA4YSk7ZWxzZSB0cnl7XzB4M2NiMDhhW18weDJmNjhjNSgweDFlYSldKyssXzB4M2NiMDhhW18weDJmNjhjNSgweDE1MyldJiZfMHgzY2IwOGFbXzB4MmY2OGM1KDB4MWI1KV1bXzB4MmY2OGM1KDB4MWU0KV0oXzB4OGQ2NDUxKTt2YXIgXzB4MzA4MTBiLF8weDNlZWRhMCxfMHgyMTQ4N2EsXzB4NDMyOTMxLF8weDE5MWI2NT1bXSxfMHgxOWIyMmQ9W10sXzB4NWM5ODIxLF8weDIxZTBmMT10aGlzW18weDJmNjhjNSgweDE4NCldKF8weDhkNjQ1MSksXzB4MzE3N2JkPV8weDIxZTBmMT09PV8weDJmNjhjNSgweDE2MiksXzB4MTZlYWE4PSEweDEsXzB4NDg3NzQ2PV8weDIxZTBmMT09PV8weDJmNjhjNSgweDFjOSksXzB4MTExYTg0PXRoaXNbXzB4MmY2OGM1KDB4MTliKV0oXzB4MjFlMGYxKSxfMHgzZTdiYmI9dGhpc1tfMHgyZjY4YzUoMHgxNzQpXShfMHgyMWUwZjEpLF8weDNlOTVjND1fMHgxMTFhODR8fF8weDNlN2JiYixfMHgxY2YzNGE9e30sXzB4NTE1MjU2PTB4MCxfMHgxZDRiZDA9ITB4MSxfMHg1MTFjYTEsXzB4MTY4MDc4PS9eKChbMS05XXsxfVswLTldKil8MCkkLztpZihfMHgzY2IwOGFbXzB4MmY2OGM1KDB4MThhKV0pe2lmKF8weDMxNzdiZCl7aWYoXzB4M2VlZGEwPV8weDhkNjQ1MVtfMHgyZjY4YzUoMHgxNTkpXSxfMHgzZWVkYTA+XzB4M2NiMDhhW18weDJmNjhjNSgweDExOSldKXtmb3IoXzB4MjE0ODdhPTB4MCxfMHg0MzI5MzE9XzB4M2NiMDhhWydlbGVtZW50cyddLF8weDMwODEwYj1fMHgyMTQ4N2E7XzB4MzA4MTBiPF8weDQzMjkzMTtfMHgzMDgxMGIrKylfMHgxOWIyMmRbXzB4MmY2OGM1KDB4MWU0KV0oXzB4MTJiYjRlWydfYWRkUHJvcGVydHknXShfMHgxOTFiNjUsXzB4OGQ2NDUxLF8weDIxZTBmMSxfMHgzMDgxMGIsXzB4M2NiMDhhKSk7XzB4NTQ4YTg4W18weDJmNjhjNSgweDFiMSldPSEweDA7fWVsc2V7Zm9yKF8weDIxNDg3YT0weDAsXzB4NDMyOTMxPV8weDNlZWRhMCxfMHgzMDgxMGI9XzB4MjE0ODdhO18weDMwODEwYjxfMHg0MzI5MzE7XzB4MzA4MTBiKyspXzB4MTliMjJkW18weDJmNjhjNSgweDFlNCldKF8weDEyYmI0ZVtfMHgyZjY4YzUoMHgxODUpXShfMHgxOTFiNjUsXzB4OGQ2NDUxLF8weDIxZTBmMSxfMHgzMDgxMGIsXzB4M2NiMDhhKSk7fV8weDNjYjA4YVtfMHgyZjY4YzUoMHgxMzYpXSs9XzB4MTliMjJkW18weDJmNjhjNSgweDE1OSldO31pZighKF8weDIxZTBmMT09PV8weDJmNjhjNSgweDE1ZCl8fF8weDIxZTBmMT09PSd1bmRlZmluZWQnKSYmIV8weDExMWE4NCYmXzB4MjFlMGYxIT09J1N0cmluZycmJl8weDIxZTBmMSE9PSdCdWZmZXInJiZfMHgyMWUwZjEhPT1fMHgyZjY4YzUoMHgxMjIpKXt2YXIgXzB4MWVlZDY5PV8weDc4NTQ4ZFsncHJvcHMnXXx8XzB4M2NiMDhhW18weDJmNjhjNSgweDFhMCldO2lmKHRoaXNbXzB4MmY2OGM1KDB4MTZjKV0oXzB4OGQ2NDUxKT8oXzB4MzA4MTBiPTB4MCxfMHg4ZDY0NTFbXzB4MmY2OGM1KDB4MTJjKV0oZnVuY3Rpb24oXzB4ZDlmZjRiKXt2YXIgXzB4MjQ4YzMyPV8weDJmNjhjNTtpZihfMHg1MTUyNTYrKyxfMHgzY2IwOGFbXzB4MjQ4YzMyKDB4MTM2KV0rKyxfMHg1MTUyNTY+XzB4MWVlZDY5KXtfMHgxZDRiZDA9ITB4MDtyZXR1cm47fWlmKCFfMHgzY2IwOGFbXzB4MjQ4YzMyKDB4MTI3KV0mJl8weDNjYjA4YVtfMHgyNDhjMzIoMHgxNTMpXSYmXzB4M2NiMDhhW18weDI0OGMzMigweDEzNildPl8weDNjYjA4YVtfMHgyNDhjMzIoMHgxMzcpXSl7XzB4MWQ0YmQwPSEweDA7cmV0dXJuO31fMHgxOWIyMmRbXzB4MjQ4YzMyKDB4MWU0KV0oXzB4MTJiYjRlW18weDI0OGMzMigweDE4NSldKF8weDE5MWI2NSxfMHg4ZDY0NTEsXzB4MjQ4YzMyKDB4MWRmKSxfMHgzMDgxMGIrKyxfMHgzY2IwOGEsZnVuY3Rpb24oXzB4NTk4NTNjKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gXzB4NTk4NTNjO307fShfMHhkOWZmNGIpKSk7fSkpOnRoaXNbXzB4MmY2OGM1KDB4MWRjKV0oXzB4OGQ2NDUxKSYmXzB4OGQ2NDUxWydmb3JFYWNoJ10oZnVuY3Rpb24oXzB4Nzg4YThjLF8weDU5ODI5MSl7dmFyIF8weDVlZGEwMD1fMHgyZjY4YzU7aWYoXzB4NTE1MjU2KyssXzB4M2NiMDhhW18weDVlZGEwMCgweDEzNildKyssXzB4NTE1MjU2Pl8weDFlZWQ2OSl7XzB4MWQ0YmQwPSEweDA7cmV0dXJuO31pZighXzB4M2NiMDhhW18weDVlZGEwMCgweDEyNyldJiZfMHgzY2IwOGFbXzB4NWVkYTAwKDB4MTUzKV0mJl8weDNjYjA4YVsnYXV0b0V4cGFuZFByb3BlcnR5Q291bnQnXT5fMHgzY2IwOGFbXzB4NWVkYTAwKDB4MTM3KV0pe18weDFkNGJkMD0hMHgwO3JldHVybjt9dmFyIF8weDM5NGJmNT1fMHg1OTgyOTFbXzB4NWVkYTAwKDB4MWExKV0oKTtfMHgzOTRiZjVbXzB4NWVkYTAwKDB4MTU5KV0+MHg2NCYmKF8weDM5NGJmNT1fMHgzOTRiZjVbJ3NsaWNlJ10oMHgwLDB4NjQpK18weDVlZGEwMCgweDE0YykpLF8weDE5YjIyZFtfMHg1ZWRhMDAoMHgxZTQpXShfMHgxMmJiNGVbXzB4NWVkYTAwKDB4MTg1KV0oXzB4MTkxYjY1LF8weDhkNjQ1MSxfMHg1ZWRhMDAoMHgxMjUpLF8weDM5NGJmNSxfMHgzY2IwOGEsZnVuY3Rpb24oXzB4NTEwNTdlKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gXzB4NTEwNTdlO307fShfMHg3ODhhOGMpKSk7fSksIV8weDE2ZWFhOCl7dHJ5e2ZvcihfMHg1Yzk4MjEgaW4gXzB4OGQ2NDUxKWlmKCEoXzB4MzE3N2JkJiZfMHgxNjgwNzhbXzB4MmY2OGM1KDB4MThmKV0oXzB4NWM5ODIxKSkmJiF0aGlzW18weDJmNjhjNSgweDExNyldKF8weDhkNjQ1MSxfMHg1Yzk4MjEsXzB4M2NiMDhhKSl7aWYoXzB4NTE1MjU2KyssXzB4M2NiMDhhW18weDJmNjhjNSgweDEzNildKyssXzB4NTE1MjU2Pl8weDFlZWQ2OSl7XzB4MWQ0YmQwPSEweDA7YnJlYWs7fWlmKCFfMHgzY2IwOGFbXzB4MmY2OGM1KDB4MTI3KV0mJl8weDNjYjA4YVsnYXV0b0V4cGFuZCddJiZfMHgzY2IwOGFbXzB4MmY2OGM1KDB4MTM2KV0+XzB4M2NiMDhhW18weDJmNjhjNSgweDEzNyldKXtfMHgxZDRiZDA9ITB4MDticmVhazt9XzB4MTliMjJkW18weDJmNjhjNSgweDFlNCldKF8weDEyYmI0ZVsnX2FkZE9iamVjdFByb3BlcnR5J10oXzB4MTkxYjY1LF8weDFjZjM0YSxfMHg4ZDY0NTEsXzB4MjFlMGYxLF8weDVjOTgyMSxfMHgzY2IwOGEpKTt9fWNhdGNoe31pZihfMHgxY2YzNGFbXzB4MmY2OGM1KDB4MWNlKV09ITB4MCxfMHg0ODc3NDYmJihfMHgxY2YzNGFbXzB4MmY2OGM1KDB4MWFiKV09ITB4MCksIV8weDFkNGJkMCl7dmFyIF8weDU5OTEyZT1bXVtfMHgyZjY4YzUoMHgxMjEpXSh0aGlzWydfZ2V0T3duUHJvcGVydHlOYW1lcyddKF8weDhkNjQ1MSkpW18weDJmNjhjNSgweDEyMSldKHRoaXNbXzB4MmY2OGM1KDB4MWUzKV0oXzB4OGQ2NDUxKSk7Zm9yKF8weDMwODEwYj0weDAsXzB4M2VlZGEwPV8weDU5OTEyZVtfMHgyZjY4YzUoMHgxNTkpXTtfMHgzMDgxMGI8XzB4M2VlZGEwO18weDMwODEwYisrKWlmKF8weDVjOTgyMT1fMHg1OTkxMmVbXzB4MzA4MTBiXSwhKF8weDMxNzdiZCYmXzB4MTY4MDc4W18weDJmNjhjNSgweDE4ZildKF8weDVjOTgyMVtfMHgyZjY4YzUoMHgxYTEpXSgpKSkmJiF0aGlzW18weDJmNjhjNSgweDExNyldKF8weDhkNjQ1MSxfMHg1Yzk4MjEsXzB4M2NiMDhhKSYmIV8weDFjZjM0YVsnX3BfJytfMHg1Yzk4MjFbXzB4MmY2OGM1KDB4MWExKV0oKV0pe2lmKF8weDUxNTI1NisrLF8weDNjYjA4YVtfMHgyZjY4YzUoMHgxMzYpXSsrLF8weDUxNTI1Nj5fMHgxZWVkNjkpe18weDFkNGJkMD0hMHgwO2JyZWFrO31pZighXzB4M2NiMDhhW18weDJmNjhjNSgweDEyNyldJiZfMHgzY2IwOGFbXzB4MmY2OGM1KDB4MTUzKV0mJl8weDNjYjA4YVtfMHgyZjY4YzUoMHgxMzYpXT5fMHgzY2IwOGFbJ2F1dG9FeHBhbmRMaW1pdCddKXtfMHgxZDRiZDA9ITB4MDticmVhazt9XzB4MTliMjJkW18weDJmNjhjNSgweDFlNCldKF8weDEyYmI0ZVtfMHgyZjY4YzUoMHgxNWEpXShfMHgxOTFiNjUsXzB4MWNmMzRhLF8weDhkNjQ1MSxfMHgyMWUwZjEsXzB4NWM5ODIxLF8weDNjYjA4YSkpO319fX19aWYoXzB4NTQ4YTg4W18weDJmNjhjNSgweDE0YSldPV8weDIxZTBmMSxfMHgzZTk1YzQ/KF8weDU0OGE4OFtfMHgyZjY4YzUoMHgxYTIpXT1fMHg4ZDY0NTFbXzB4MmY2OGM1KDB4MWMyKV0oKSx0aGlzW18weDJmNjhjNSgweDFiOSldKF8weDIxZTBmMSxfMHg1NDhhODgsXzB4M2NiMDhhLF8weDc4NTQ4ZCkpOl8weDIxZTBmMT09PSdkYXRlJz9fMHg1NDhhODhbJ3ZhbHVlJ109dGhpc1tfMHgyZjY4YzUoMHgxOTMpXVsnY2FsbCddKF8weDhkNjQ1MSk6XzB4MjFlMGYxPT09J2JpZ2ludCc/XzB4NTQ4YTg4W18weDJmNjhjNSgweDFhMildPV8weDhkNjQ1MVsndG9TdHJpbmcnXSgpOl8weDIxZTBmMT09PV8weDJmNjhjNSgweDE5Mik/XzB4NTQ4YTg4W18weDJmNjhjNSgweDFhMildPXRoaXNbXzB4MmY2OGM1KDB4MTU1KV1bXzB4MmY2OGM1KDB4MTU3KV0oXzB4OGQ2NDUxKTpfMHgyMWUwZjE9PT1fMHgyZjY4YzUoMHgxNjQpJiZ0aGlzW18weDJmNjhjNSgweDE5NCldP18weDU0OGE4OFsndmFsdWUnXT10aGlzW18weDJmNjhjNSgweDE5NCldW18weDJmNjhjNSgweDE4MildW18weDJmNjhjNSgweDFhMSldW18weDJmNjhjNSgweDE1NyldKF8weDhkNjQ1MSk6IV8weDNjYjA4YVtfMHgyZjY4YzUoMHgxOGEpXSYmIShfMHgyMWUwZjE9PT1fMHgyZjY4YzUoMHgxNWQpfHxfMHgyMWUwZjE9PT1fMHgyZjY4YzUoMHgxNWYpKSYmKGRlbGV0ZSBfMHg1NDhhODhbJ3ZhbHVlJ10sXzB4NTQ4YTg4WydjYXBwZWQnXT0hMHgwKSxfMHgxZDRiZDAmJihfMHg1NDhhODhbJ2NhcHBlZFByb3BzJ109ITB4MCksXzB4NTExY2ExPV8weDNjYjA4YVtfMHgyZjY4YzUoMHgxYTUpXVsnY3VycmVudCddLF8weDNjYjA4YVtfMHgyZjY4YzUoMHgxYTUpXVtfMHgyZjY4YzUoMHgxMWYpXT1fMHg1NDhhODgsdGhpc1snX3RyZWVOb2RlUHJvcGVydGllc0JlZm9yZUZ1bGxWYWx1ZSddKF8weDU0OGE4OCxfMHgzY2IwOGEpLF8weDE5YjIyZFtfMHgyZjY4YzUoMHgxNTkpXSl7Zm9yKF8weDMwODEwYj0weDAsXzB4M2VlZGEwPV8weDE5YjIyZFtfMHgyZjY4YzUoMHgxNTkpXTtfMHgzMDgxMGI8XzB4M2VlZGEwO18weDMwODEwYisrKV8weDE5YjIyZFtfMHgzMDgxMGJdKF8weDMwODEwYik7fV8weDE5MWI2NVtfMHgyZjY4YzUoMHgxNTkpXSYmKF8weDU0OGE4OFsncHJvcHMnXT1fMHgxOTFiNjUpO31jYXRjaChfMHgxZDUxYTUpe18weDQ5MjM2YShfMHgxZDUxYTUsXzB4NTQ4YTg4LF8weDNjYjA4YSk7fXJldHVybiB0aGlzW18weDJmNjhjNSgweDFkZCldKF8weDhkNjQ1MSxfMHg1NDhhODgpLHRoaXNbXzB4MmY2OGM1KDB4MWRiKV0oXzB4NTQ4YTg4LF8weDNjYjA4YSksXzB4M2NiMDhhW18weDJmNjhjNSgweDFhNSldW18weDJmNjhjNSgweDExZildPV8weDUxMWNhMSxfMHgzY2IwOGFbXzB4MmY2OGM1KDB4MWVhKV0tLSxfMHgzY2IwOGFbJ2F1dG9FeHBhbmQnXT1fMHg0YmY5MjEsXzB4M2NiMDhhW18weDJmNjhjNSgweDE1MyldJiZfMHgzY2IwOGFbXzB4MmY2OGM1KDB4MWI1KV1bXzB4MmY2OGM1KDB4MWQ2KV0oKSxfMHg1NDhhODg7fVsnX2dldE93blByb3BlcnR5U3ltYm9scyddKF8weDNlYjkyOCl7dmFyIF8weDg1ZTE4ZD1fMHgyZWNiNzM7cmV0dXJuIE9iamVjdFtfMHg4NWUxOGQoMHgxMWMpXT9PYmplY3RbXzB4ODVlMThkKDB4MTFjKV0oXzB4M2ViOTI4KTpbXTt9W18weDJlY2I3MygweDE2YyldKF8weGZlMDQ5OCl7dmFyIF8weDRiMGFiZj1fMHgyZWNiNzM7cmV0dXJuISEoXzB4ZmUwNDk4JiZfMHg1N2I0NjNbXzB4NGIwYWJmKDB4MWRmKV0mJnRoaXNbXzB4NGIwYWJmKDB4MTIwKV0oXzB4ZmUwNDk4KT09PV8weDRiMGFiZigweDE1NikmJl8weGZlMDQ5OFtfMHg0YjBhYmYoMHgxMmMpXSk7fVsnX2JsYWNrbGlzdGVkUHJvcGVydHknXShfMHgzM2EwMWMsXzB4MjI1OTdkLF8weDlmYjVmMSl7dmFyIF8weDE5Y2U2ZD1fMHgyZWNiNzM7cmV0dXJuIF8weDlmYjVmMVtfMHgxOWNlNmQoMHgxMzQpXT90eXBlb2YgXzB4MzNhMDFjW18weDIyNTk3ZF09PV8weDE5Y2U2ZCgweDFjOSk6ITB4MTt9W18weDJlY2I3MygweDE4NCldKF8weDQwZDg3ZSl7dmFyIF8weDRmZTI2MT1fMHgyZWNiNzMsXzB4M2YzZDY0PScnO3JldHVybiBfMHgzZjNkNjQ9dHlwZW9mIF8weDQwZDg3ZSxfMHgzZjNkNjQ9PT1fMHg0ZmUyNjEoMHgxOTEpP3RoaXNbXzB4NGZlMjYxKDB4MTIwKV0oXzB4NDBkODdlKT09PV8weDRmZTI2MSgweDE4MSk/XzB4M2YzZDY0PSdhcnJheSc6dGhpc1tfMHg0ZmUyNjEoMHgxMjApXShfMHg0MGQ4N2UpPT09XzB4NGZlMjYxKDB4MWM4KT9fMHgzZjNkNjQ9XzB4NGZlMjYxKDB4MWM0KTp0aGlzW18weDRmZTI2MSgweDEyMCldKF8weDQwZDg3ZSk9PT1fMHg0ZmUyNjEoMHgxMGQpP18weDNmM2Q2ND1fMHg0ZmUyNjEoMHgxMjIpOl8weDQwZDg3ZT09PW51bGw/XzB4M2YzZDY0PV8weDRmZTI2MSgweDE1ZCk6XzB4NDBkODdlW18weDRmZTI2MSgweDExOCldJiYoXzB4M2YzZDY0PV8weDQwZDg3ZVtfMHg0ZmUyNjEoMHgxMTgpXVtfMHg0ZmUyNjEoMHgxZDQpXXx8XzB4M2YzZDY0KTpfMHgzZjNkNjQ9PT1fMHg0ZmUyNjEoMHgxNWYpJiZ0aGlzW18weDRmZTI2MSgweDE0OCldJiZfMHg0MGQ4N2UgaW5zdGFuY2VvZiB0aGlzW18weDRmZTI2MSgweDE0OCldJiYoXzB4M2YzZDY0PSdIVE1MQWxsQ29sbGVjdGlvbicpLF8weDNmM2Q2NDt9W18weDJlY2I3MygweDEyMCldKF8weDU4YTk2Yil7dmFyIF8weDQyYTYwOT1fMHgyZWNiNzM7cmV0dXJuIE9iamVjdFtfMHg0MmE2MDkoMHgxODIpXVsndG9TdHJpbmcnXVsnY2FsbCddKF8weDU4YTk2Yik7fVsnX2lzUHJpbWl0aXZlVHlwZSddKF8weDkzZjQ3Nyl7dmFyIF8weDUxMmJmOT1fMHgyZWNiNzM7cmV0dXJuIF8weDkzZjQ3Nz09PV8weDUxMmJmOSgweDE0Myl8fF8weDkzZjQ3Nz09PV8weDUxMmJmOSgweDFkNyl8fF8weDkzZjQ3Nz09PV8weDUxMmJmOSgweDEyYSk7fVtfMHgyZWNiNzMoMHgxNzQpXShfMHg1YTBkYjMpe3ZhciBfMHg1YThlYWM9XzB4MmVjYjczO3JldHVybiBfMHg1YTBkYjM9PT0nQm9vbGVhbid8fF8weDVhMGRiMz09PSdTdHJpbmcnfHxfMHg1YTBkYjM9PT1fMHg1YThlYWMoMHgxZTIpO31bXzB4MmVjYjczKDB4MTg1KV0oXzB4NGJjZDViLF8weDVlYWE4ZCxfMHgxODczNGUsXzB4NDU5YzdkLF8weDJjYmFkNSxfMHg0MjdlZmQpe3ZhciBfMHgyN2IwOTQ9dGhpcztyZXR1cm4gZnVuY3Rpb24oXzB4MWQ3YjQyKXt2YXIgXzB4MTg2NTcyPV8weDEzNzIsXzB4NDkwZDMwPV8weDJjYmFkNVtfMHgxODY1NzIoMHgxYTUpXVtfMHgxODY1NzIoMHgxMWYpXSxfMHgzYTEwMWQ9XzB4MmNiYWQ1W18weDE4NjU3MigweDFhNSldW18weDE4NjU3MigweDE3NildLF8weDI3NThkMj1fMHgyY2JhZDVbJ25vZGUnXVtfMHgxODY1NzIoMHgxYmQpXTtfMHgyY2JhZDVbXzB4MTg2NTcyKDB4MWE1KV1bXzB4MTg2NTcyKDB4MWJkKV09XzB4NDkwZDMwLF8weDJjYmFkNVtfMHgxODY1NzIoMHgxYTUpXVtfMHgxODY1NzIoMHgxNzYpXT10eXBlb2YgXzB4NDU5YzdkPT0nbnVtYmVyJz9fMHg0NTljN2Q6XzB4MWQ3YjQyLF8weDRiY2Q1YltfMHgxODY1NzIoMHgxZTQpXShfMHgyN2IwOTRbJ19wcm9wZXJ0eSddKF8weDVlYWE4ZCxfMHgxODczNGUsXzB4NDU5YzdkLF8weDJjYmFkNSxfMHg0MjdlZmQpKSxfMHgyY2JhZDVbXzB4MTg2NTcyKDB4MWE1KV1bXzB4MTg2NTcyKDB4MWJkKV09XzB4Mjc1OGQyLF8weDJjYmFkNVtfMHgxODY1NzIoMHgxYTUpXVtfMHgxODY1NzIoMHgxNzYpXT1fMHgzYTEwMWQ7fTt9W18weDJlY2I3MygweDE1YSldKF8weDM2YWU2NixfMHgxZjg2YzYsXzB4NDgyMjI3LF8weDRiYWI1MixfMHgxMmEyZTksXzB4NDJlNTVhLF8weDRiYTQzNil7dmFyIF8weDI1OTExNz1fMHgyZWNiNzMsXzB4NmY5OTc1PXRoaXM7cmV0dXJuIF8weDFmODZjNltfMHgyNTkxMTcoMHgxYWYpK18weDEyYTJlOVtfMHgyNTkxMTcoMHgxYTEpXSgpXT0hMHgwLGZ1bmN0aW9uKF8weDEyMDMxMCl7dmFyIF8weDFmNWY3ZD1fMHgyNTkxMTcsXzB4NDRkMzc4PV8weDQyZTU1YVtfMHgxZjVmN2QoMHgxYTUpXVsnY3VycmVudCddLF8weDNmZmVkYj1fMHg0MmU1NWFbXzB4MWY1ZjdkKDB4MWE1KV1bXzB4MWY1ZjdkKDB4MTc2KV0sXzB4MTQ1ZTZkPV8weDQyZTU1YVsnbm9kZSddW18weDFmNWY3ZCgweDFiZCldO18weDQyZTU1YVsnbm9kZSddW18weDFmNWY3ZCgweDFiZCldPV8weDQ0ZDM3OCxfMHg0MmU1NWFbXzB4MWY1ZjdkKDB4MWE1KV1bXzB4MWY1ZjdkKDB4MTc2KV09XzB4MTIwMzEwLF8weDM2YWU2NlsncHVzaCddKF8weDZmOTk3NVtfMHgxZjVmN2QoMHgxMzMpXShfMHg0ODIyMjcsXzB4NGJhYjUyLF8weDEyYTJlOSxfMHg0MmU1NWEsXzB4NGJhNDM2KSksXzB4NDJlNTVhW18weDFmNWY3ZCgweDFhNSldW18weDFmNWY3ZCgweDFiZCldPV8weDE0NWU2ZCxfMHg0MmU1NWFbXzB4MWY1ZjdkKDB4MWE1KV1bXzB4MWY1ZjdkKDB4MTc2KV09XzB4M2ZmZWRiO307fVtfMHgyZWNiNzMoMHgxMzMpXShfMHgxYWQxZDMsXzB4NWNhZmUyLF8weDM3N2VjOCxfMHg0NDYzMGQsXzB4NWM3ODYzKXt2YXIgXzB4MzBlNTk3PV8weDJlY2I3MyxfMHg4NGIxNDk9dGhpcztfMHg1Yzc4NjN8fChfMHg1Yzc4NjM9ZnVuY3Rpb24oXzB4MzRjMTNkLF8weDUxODE5Mil7cmV0dXJuIF8weDM0YzEzZFtfMHg1MTgxOTJdO30pO3ZhciBfMHgzN2RlMWI9XzB4Mzc3ZWM4W18weDMwZTU5NygweDFhMSldKCksXzB4NThjOWYzPV8weDQ0NjMwZFtfMHgzMGU1OTcoMHgxMDkpXXx8e30sXzB4MjA5ZWI4PV8weDQ0NjMwZFtfMHgzMGU1OTcoMHgxOGEpXSxfMHgyNjg2Zjc9XzB4NDQ2MzBkW18weDMwZTU5NygweDEyNyldO3RyeXt2YXIgXzB4NDA1NTJmPXRoaXNbXzB4MzBlNTk3KDB4MWRjKV0oXzB4MWFkMWQzKSxfMHgxNDhhZTQ9XzB4MzdkZTFiO18weDQwNTUyZiYmXzB4MTQ4YWU0WzB4MF09PT0nXFxcXHgyNycmJihfMHgxNDhhZTQ9XzB4MTQ4YWU0WydzdWJzdHInXSgweDEsXzB4MTQ4YWU0WydsZW5ndGgnXS0weDIpKTt2YXIgXzB4MTgxZGRjPV8weDQ0NjMwZFtfMHgzMGU1OTcoMHgxMDkpXT1fMHg1OGM5ZjNbJ19wXycrXzB4MTQ4YWU0XTtfMHgxODFkZGMmJihfMHg0NDYzMGRbXzB4MzBlNTk3KDB4MThhKV09XzB4NDQ2MzBkW18weDMwZTU5NygweDE4YSldKzB4MSksXzB4NDQ2MzBkW18weDMwZTU5NygweDEyNyldPSEhXzB4MTgxZGRjO3ZhciBfMHg0NDBhZWY9dHlwZW9mIF8weDM3N2VjOD09J3N5bWJvbCcsXzB4YWFjODBmPXsnbmFtZSc6XzB4NDQwYWVmfHxfMHg0MDU1MmY/XzB4MzdkZTFiOnRoaXNbJ19wcm9wZXJ0eU5hbWUnXShfMHgzN2RlMWIpfTtpZihfMHg0NDBhZWYmJihfMHhhYWM4MGZbXzB4MzBlNTk3KDB4MTY0KV09ITB4MCksIShfMHg1Y2FmZTI9PT1fMHgzMGU1OTcoMHgxNjIpfHxfMHg1Y2FmZTI9PT1fMHgzMGU1OTcoMHgxZDMpKSl7dmFyIF8weDUwMzVjNT10aGlzW18weDMwZTU5NygweDE4YildKF8weDFhZDFkMyxfMHgzNzdlYzgpO2lmKF8weDUwMzVjNSYmKF8weDUwMzVjNVtfMHgzMGU1OTcoMHgxN2EpXSYmKF8weGFhYzgwZltfMHgzMGU1OTcoMHgxNjYpXT0hMHgwKSxfMHg1MDM1YzVbJ2dldCddJiYhXzB4MTgxZGRjJiYhXzB4NDQ2MzBkW18weDMwZTU5NygweDE3YildKSlyZXR1cm4gXzB4YWFjODBmW18weDMwZTU5NygweDEyMyldPSEweDAsdGhpc1tfMHgzMGU1OTcoMHgxMjYpXShfMHhhYWM4MGYsXzB4NDQ2MzBkKSxfMHhhYWM4MGY7fXZhciBfMHg0OWY4NTE7dHJ5e18weDQ5Zjg1MT1fMHg1Yzc4NjMoXzB4MWFkMWQzLF8weDM3N2VjOCk7fWNhdGNoKF8weDRkYTdjZil7cmV0dXJuIF8weGFhYzgwZj17J25hbWUnOl8weDM3ZGUxYiwndHlwZSc6XzB4MzBlNTk3KDB4MWU4KSwnZXJyb3InOl8weDRkYTdjZltfMHgzMGU1OTcoMHgxODkpXX0sdGhpc1tfMHgzMGU1OTcoMHgxMjYpXShfMHhhYWM4MGYsXzB4NDQ2MzBkKSxfMHhhYWM4MGY7fXZhciBfMHgyOTgxMGY9dGhpc1tfMHgzMGU1OTcoMHgxODQpXShfMHg0OWY4NTEpLF8weDQ4YjczMz10aGlzW18weDMwZTU5NygweDE5YildKF8weDI5ODEwZik7aWYoXzB4YWFjODBmW18weDMwZTU5NygweDE0YSldPV8weDI5ODEwZixfMHg0OGI3MzMpdGhpc1snX3Byb2Nlc3NUcmVlTm9kZVJlc3VsdCddKF8weGFhYzgwZixfMHg0NDYzMGQsXzB4NDlmODUxLGZ1bmN0aW9uKCl7dmFyIF8weDNhOTU1Zj1fMHgzMGU1OTc7XzB4YWFjODBmW18weDNhOTU1ZigweDFhMildPV8weDQ5Zjg1MVtfMHgzYTk1NWYoMHgxYzIpXSgpLCFfMHgxODFkZGMmJl8weDg0YjE0OVtfMHgzYTk1NWYoMHgxYjkpXShfMHgyOTgxMGYsXzB4YWFjODBmLF8weDQ0NjMwZCx7fSk7fSk7ZWxzZXt2YXIgXzB4NDkxZjAxPV8weDQ0NjMwZFsnYXV0b0V4cGFuZCddJiZfMHg0NDYzMGRbJ2xldmVsJ108XzB4NDQ2MzBkW18weDMwZTU5NygweDE5OSldJiZfMHg0NDYzMGRbJ2F1dG9FeHBhbmRQcmV2aW91c09iamVjdHMnXVtfMHgzMGU1OTcoMHgxOTcpXShfMHg0OWY4NTEpPDB4MCYmXzB4Mjk4MTBmIT09XzB4MzBlNTk3KDB4MWM5KSYmXzB4NDQ2MzBkW18weDMwZTU5NygweDEzNildPF8weDQ0NjMwZFtfMHgzMGU1OTcoMHgxMzcpXTtfMHg0OTFmMDF8fF8weDQ0NjMwZFtfMHgzMGU1OTcoMHgxZWEpXTxfMHgyMDllYjh8fF8weDE4MWRkYz8odGhpc1tfMHgzMGU1OTcoMHgxMzUpXShfMHhhYWM4MGYsXzB4NDlmODUxLF8weDQ0NjMwZCxfMHgxODFkZGN8fHt9KSx0aGlzW18weDMwZTU5NygweDFkZCldKF8weDQ5Zjg1MSxfMHhhYWM4MGYpKTp0aGlzW18weDMwZTU5NygweDEyNildKF8weGFhYzgwZixfMHg0NDYzMGQsXzB4NDlmODUxLGZ1bmN0aW9uKCl7dmFyIF8weDUwZTk3Mj1fMHgzMGU1OTc7XzB4Mjk4MTBmPT09XzB4NTBlOTcyKDB4MTVkKXx8XzB4Mjk4MTBmPT09XzB4NTBlOTcyKDB4MTVmKXx8KGRlbGV0ZSBfMHhhYWM4MGZbJ3ZhbHVlJ10sXzB4YWFjODBmW18weDUwZTk3MigweDEwYildPSEweDApO30pO31yZXR1cm4gXzB4YWFjODBmO31maW5hbGx5e18weDQ0NjMwZFtfMHgzMGU1OTcoMHgxMDkpXT1fMHg1OGM5ZjMsXzB4NDQ2MzBkW18weDMwZTU5NygweDE4YSldPV8weDIwOWViOCxfMHg0NDYzMGRbJ2lzRXhwcmVzc2lvblRvRXZhbHVhdGUnXT1fMHgyNjg2Zjc7fX1bJ19jYXBJZlN0cmluZyddKF8weDJhMzcwOCxfMHgxZGMzZmEsXzB4MjgxYjg3LF8weDNhZDhhNCl7dmFyIF8weDViNjkzMD1fMHgyZWNiNzMsXzB4MTA5ZDRiPV8weDNhZDhhNFtfMHg1YjY5MzAoMHgxOWQpXXx8XzB4MjgxYjg3W18weDViNjkzMCgweDE5ZCldO2lmKChfMHgyYTM3MDg9PT0nc3RyaW5nJ3x8XzB4MmEzNzA4PT09J1N0cmluZycpJiZfMHgxZGMzZmFbJ3ZhbHVlJ10pe2xldCBfMHg0ZDVlNjE9XzB4MWRjM2ZhW18weDViNjkzMCgweDFhMildW18weDViNjkzMCgweDE1OSldO18weDI4MWI4N1tfMHg1YjY5MzAoMHgxNGYpXSs9XzB4NGQ1ZTYxLF8weDI4MWI4N1snYWxsU3RyTGVuZ3RoJ10+XzB4MjgxYjg3W18weDViNjkzMCgweDE5MCldPyhfMHgxZGMzZmFbXzB4NWI2OTMwKDB4MTBiKV09JycsZGVsZXRlIF8weDFkYzNmYVsndmFsdWUnXSk6XzB4NGQ1ZTYxPl8weDEwOWQ0YiYmKF8weDFkYzNmYVtfMHg1YjY5MzAoMHgxMGIpXT1fMHgxZGMzZmFbXzB4NWI2OTMwKDB4MWEyKV1bXzB4NWI2OTMwKDB4MTFkKV0oMHgwLF8weDEwOWQ0YiksZGVsZXRlIF8weDFkYzNmYVsndmFsdWUnXSk7fX1bXzB4MmVjYjczKDB4MWRjKV0oXzB4MWQ3NWMzKXt2YXIgXzB4MjljZDAzPV8weDJlY2I3MztyZXR1cm4hIShfMHgxZDc1YzMmJl8weDU3YjQ2M1tfMHgyOWNkMDMoMHgxMjUpXSYmdGhpc1tfMHgyOWNkMDMoMHgxMjApXShfMHgxZDc1YzMpPT09XzB4MjljZDAzKDB4MTcyKSYmXzB4MWQ3NWMzWydmb3JFYWNoJ10pO31bXzB4MmVjYjczKDB4MTUyKV0oXzB4MzFmNDQpe3ZhciBfMHgzN2Y5YjM9XzB4MmVjYjczO2lmKF8weDMxZjQ0W18weDM3ZjliMygweDE4MyldKC9eXFxcXGQrJC8pKXJldHVybiBfMHgzMWY0NDt2YXIgXzB4MzE1MjlmO3RyeXtfMHgzMTUyOWY9SlNPTlsnc3RyaW5naWZ5J10oJycrXzB4MzFmNDQpO31jYXRjaHtfMHgzMTUyOWY9J1xcXFx4MjInK3RoaXNbJ19vYmplY3RUb1N0cmluZyddKF8weDMxZjQ0KSsnXFxcXHgyMic7fXJldHVybiBfMHgzMTUyOWZbJ21hdGNoJ10oL15cXFwiKFthLXpBLVpfXVthLXpBLVpfMC05XSopXFxcIiQvKT9fMHgzMTUyOWY9XzB4MzE1MjlmWydzdWJzdHInXSgweDEsXzB4MzE1MjlmW18weDM3ZjliMygweDE1OSldLTB4Mik6XzB4MzE1MjlmPV8weDMxNTI5ZlsncmVwbGFjZSddKC8nL2csJ1xcXFx4NWNcXFxceDI3JylbXzB4MzdmOWIzKDB4MWJmKV0oL1xcXFxcXFxcXFxcIi9nLCdcXFxceDIyJylbXzB4MzdmOWIzKDB4MWJmKV0oLyheXFxcInxcXFwiJCkvZywnXFxcXHgyNycpLF8weDMxNTI5Zjt9W18weDJlY2I3MygweDEyNildKF8weDEzOGMwYyxfMHgxMjVjNTEsXzB4MzYyZGY3LF8weDQ1OTBjNCl7dmFyIF8weDExMmNkOD1fMHgyZWNiNzM7dGhpc1tfMHgxMTJjZDgoMHgxOWYpXShfMHgxMzhjMGMsXzB4MTI1YzUxKSxfMHg0NTkwYzQmJl8weDQ1OTBjNCgpLHRoaXNbXzB4MTEyY2Q4KDB4MWRkKV0oXzB4MzYyZGY3LF8weDEzOGMwYyksdGhpc1tfMHgxMTJjZDgoMHgxZGIpXShfMHgxMzhjMGMsXzB4MTI1YzUxKTt9W18weDJlY2I3MygweDE5ZildKF8weDE1MGU0MyxfMHgzMmE2NTQpe3ZhciBfMHg0NDhiN2M9XzB4MmVjYjczO3RoaXNbJ19zZXROb2RlSWQnXShfMHgxNTBlNDMsXzB4MzJhNjU0KSx0aGlzW18weDQ0OGI3YygweDEyYildKF8weDE1MGU0MyxfMHgzMmE2NTQpLHRoaXNbJ19zZXROb2RlRXhwcmVzc2lvblBhdGgnXShfMHgxNTBlNDMsXzB4MzJhNjU0KSx0aGlzW18weDQ0OGI3YygweDExYSldKF8weDE1MGU0MyxfMHgzMmE2NTQpO31bXzB4MmVjYjczKDB4MTZmKV0oXzB4NDdkNTVlLF8weDdmYWU1Myl7fVsnX3NldE5vZGVRdWVyeVBhdGgnXShfMHgyZTAzZWYsXzB4NTMyOWRhKXt9W18weDJlY2I3MygweDEwZSldKF8weDI2YjFjOSxfMHgzMmE1ZGYpe31bXzB4MmVjYjczKDB4MWFkKV0oXzB4NTFiNTAwKXt2YXIgXzB4MmVlNzJhPV8weDJlY2I3MztyZXR1cm4gXzB4NTFiNTAwPT09dGhpc1tfMHgyZWU3MmEoMHgxMTUpXTt9W18weDJlY2I3MygweDFkYildKF8weDQ4ZGQyOSxfMHgyOWZkMTcpe3ZhciBfMHgyYjQ1ZDQ9XzB4MmVjYjczO3RoaXNbXzB4MmI0NWQ0KDB4MTBlKV0oXzB4NDhkZDI5LF8weDI5ZmQxNyksdGhpc1tfMHgyYjQ1ZDQoMHgxM2UpXShfMHg0OGRkMjkpLF8weDI5ZmQxN1snc29ydFByb3BzJ10mJnRoaXNbXzB4MmI0NWQ0KDB4MWUwKV0oXzB4NDhkZDI5KSx0aGlzWydfYWRkRnVuY3Rpb25zTm9kZSddKF8weDQ4ZGQyOSxfMHgyOWZkMTcpLHRoaXNbJ19hZGRMb2FkTm9kZSddKF8weDQ4ZGQyOSxfMHgyOWZkMTcpLHRoaXNbXzB4MmI0NWQ0KDB4MTEyKV0oXzB4NDhkZDI5KTt9WydfYWRkaXRpb25hbE1ldGFkYXRhJ10oXzB4MTA0MTlmLF8weDE1YzViNSl7dmFyIF8weDIwMTEyYz1fMHgyZWNiNzM7dHJ5e18weDEwNDE5ZiYmdHlwZW9mIF8weDEwNDE5ZltfMHgyMDExMmMoMHgxNTkpXT09XzB4MjAxMTJjKDB4MTJhKSYmKF8weDE1YzViNVtfMHgyMDExMmMoMHgxNTkpXT1fMHgxMDQxOWZbXzB4MjAxMTJjKDB4MTU5KV0pO31jYXRjaHt9aWYoXzB4MTVjNWI1W18weDIwMTEyYygweDE0YSldPT09XzB4MjAxMTJjKDB4MTJhKXx8XzB4MTVjNWI1Wyd0eXBlJ109PT0nTnVtYmVyJyl7aWYoaXNOYU4oXzB4MTVjNWI1W18weDIwMTEyYygweDFhMildKSlfMHgxNWM1YjVbJ25hbiddPSEweDAsZGVsZXRlIF8weDE1YzViNVtfMHgyMDExMmMoMHgxYTIpXTtlbHNlIHN3aXRjaChfMHgxNWM1YjVbXzB4MjAxMTJjKDB4MWEyKV0pe2Nhc2UgTnVtYmVyW18weDIwMTEyYygweDFiYSldOl8weDE1YzViNVtfMHgyMDExMmMoMHgxZTEpXT0hMHgwLGRlbGV0ZSBfMHgxNWM1YjVbXzB4MjAxMTJjKDB4MWEyKV07YnJlYWs7Y2FzZSBOdW1iZXJbXzB4MjAxMTJjKDB4MWFhKV06XzB4MTVjNWI1W18weDIwMTEyYygweDE3ZSldPSEweDAsZGVsZXRlIF8weDE1YzViNVtfMHgyMDExMmMoMHgxYTIpXTticmVhaztjYXNlIDB4MDp0aGlzW18weDIwMTEyYygweDE3MSldKF8weDE1YzViNVsndmFsdWUnXSkmJihfMHgxNWM1YjVbJ25lZ2F0aXZlWmVybyddPSEweDApO2JyZWFrO319ZWxzZSBfMHgxNWM1YjVbXzB4MjAxMTJjKDB4MTRhKV09PT1fMHgyMDExMmMoMHgxYzkpJiZ0eXBlb2YgXzB4MTA0MTlmW18weDIwMTEyYygweDFkNCldPT1fMHgyMDExMmMoMHgxZDcpJiZfMHgxMDQxOWZbXzB4MjAxMTJjKDB4MWQ0KV0mJl8weDE1YzViNVtfMHgyMDExMmMoMHgxZDQpXSYmXzB4MTA0MTlmW18weDIwMTEyYygweDFkNCldIT09XzB4MTVjNWI1WyduYW1lJ10mJihfMHgxNWM1YjVbXzB4MjAxMTJjKDB4MTZhKV09XzB4MTA0MTlmW18weDIwMTEyYygweDFkNCldKTt9W18weDJlY2I3MygweDE3MSldKF8weDRmMGNlMil7dmFyIF8weDRkNWNhOD1fMHgyZWNiNzM7cmV0dXJuIDB4MS9fMHg0ZjBjZTI9PT1OdW1iZXJbXzB4NGQ1Y2E4KDB4MWFhKV07fVtfMHgyZWNiNzMoMHgxZTApXShfMHgzOGJmOGYpe3ZhciBfMHg1MDlmMGM9XzB4MmVjYjczOyFfMHgzOGJmOGZbXzB4NTA5ZjBjKDB4MWEwKV18fCFfMHgzOGJmOGZbXzB4NTA5ZjBjKDB4MWEwKV1bXzB4NTA5ZjBjKDB4MTU5KV18fF8weDM4YmY4ZltfMHg1MDlmMGMoMHgxNGEpXT09PV8weDUwOWYwYygweDE2Mil8fF8weDM4YmY4ZlsndHlwZSddPT09XzB4NTA5ZjBjKDB4MTI1KXx8XzB4MzhiZjhmW18weDUwOWYwYygweDE0YSldPT09XzB4NTA5ZjBjKDB4MWRmKXx8XzB4MzhiZjhmWydwcm9wcyddW18weDUwOWYwYygweDE2NSldKGZ1bmN0aW9uKF8weDM1ZTFlMSxfMHhlNzJiZmQpe3ZhciBfMHg0ODAxNGQ9XzB4NTA5ZjBjLF8weDQ3OGVmZD1fMHgzNWUxZTFbJ25hbWUnXVtfMHg0ODAxNGQoMHgxNDApXSgpLF8weDU4MTA5MD1fMHhlNzJiZmRbXzB4NDgwMTRkKDB4MWQ0KV1bXzB4NDgwMTRkKDB4MTQwKV0oKTtyZXR1cm4gXzB4NDc4ZWZkPF8weDU4MTA5MD8tMHgxOl8weDQ3OGVmZD5fMHg1ODEwOTA/MHgxOjB4MDt9KTt9WydfYWRkRnVuY3Rpb25zTm9kZSddKF8weGU0ODhmYyxfMHgzOTRkYTMpe3ZhciBfMHg1Y2E1YTg9XzB4MmVjYjczO2lmKCEoXzB4Mzk0ZGEzW18weDVjYTVhOCgweDEzNCldfHwhXzB4ZTQ4OGZjW18weDVjYTVhOCgweDFhMCldfHwhXzB4ZTQ4OGZjWydwcm9wcyddWydsZW5ndGgnXSkpe2Zvcih2YXIgXzB4NWJkOThlPVtdLF8weDE1NmMwNj1bXSxfMHgzZDQwOGM9MHgwLF8weDUwMWZiMD1fMHhlNDg4ZmNbXzB4NWNhNWE4KDB4MWEwKV1bXzB4NWNhNWE4KDB4MTU5KV07XzB4M2Q0MDhjPF8weDUwMWZiMDtfMHgzZDQwOGMrKyl7dmFyIF8weDM2YWIwNT1fMHhlNDg4ZmNbXzB4NWNhNWE4KDB4MWEwKV1bXzB4M2Q0MDhjXTtfMHgzNmFiMDVbXzB4NWNhNWE4KDB4MTRhKV09PT1fMHg1Y2E1YTgoMHgxYzkpP18weDViZDk4ZVtfMHg1Y2E1YTgoMHgxZTQpXShfMHgzNmFiMDUpOl8weDE1NmMwNltfMHg1Y2E1YTgoMHgxZTQpXShfMHgzNmFiMDUpO31pZighKCFfMHgxNTZjMDZbXzB4NWNhNWE4KDB4MTU5KV18fF8weDViZDk4ZVsnbGVuZ3RoJ108PTB4MSkpe18weGU0ODhmY1tfMHg1Y2E1YTgoMHgxYTApXT1fMHgxNTZjMDY7dmFyIF8weDNhYWRlYj17J2Z1bmN0aW9uc05vZGUnOiEweDAsJ3Byb3BzJzpfMHg1YmQ5OGV9O3RoaXNbJ19zZXROb2RlSWQnXShfMHgzYWFkZWIsXzB4Mzk0ZGEzKSx0aGlzWydfc2V0Tm9kZUxhYmVsJ10oXzB4M2FhZGViLF8weDM5NGRhMyksdGhpc1tfMHg1Y2E1YTgoMHgxM2UpXShfMHgzYWFkZWIpLHRoaXNbXzB4NWNhNWE4KDB4MTFhKV0oXzB4M2FhZGViLF8weDM5NGRhMyksXzB4M2FhZGViWydpZCddKz0nXFxcXHgyMGYnLF8weGU0ODhmY1tfMHg1Y2E1YTgoMHgxYTApXVtfMHg1Y2E1YTgoMHgxMjQpXShfMHgzYWFkZWIpO319fVtfMHgyZWNiNzMoMHgxMWUpXShfMHgxOTBiYTAsXzB4MjE2MGFhKXt9Wydfc2V0Tm9kZUV4cGFuZGFibGVTdGF0ZSddKF8weDQxODhmMCl7fVtfMHgyZWNiNzMoMHgxM2MpXShfMHgzYmNmMzYpe3ZhciBfMHg2ZDc1OTI9XzB4MmVjYjczO3JldHVybiBBcnJheVsnaXNBcnJheSddKF8weDNiY2YzNil8fHR5cGVvZiBfMHgzYmNmMzY9PSdvYmplY3QnJiZ0aGlzW18weDZkNzU5MigweDEyMCldKF8weDNiY2YzNik9PT1fMHg2ZDc1OTIoMHgxODEpO31bXzB4MmVjYjczKDB4MTFhKV0oXzB4MTI3MTU4LF8weDJiOGRjNyl7fVtfMHgyZWNiNzMoMHgxMTIpXShfMHgzMGFiMTMpe3ZhciBfMHgxYjk5OWE9XzB4MmVjYjczO2RlbGV0ZSBfMHgzMGFiMTNbXzB4MWI5OTlhKDB4MWNkKV0sZGVsZXRlIF8weDMwYWIxM1tfMHgxYjk5OWEoMHgxYTgpXSxkZWxldGUgXzB4MzBhYjEzW18weDFiOTk5YSgweDExMyldO31bXzB4MmVjYjczKDB4MTNmKV0oXzB4NWJkMjZkLF8weDE0NWJhNCl7fVtfMHgyZWNiNzMoMHgxYjYpXShfMHgyOTViYWEpe3ZhciBfMHg1YWFiNDU9XzB4MmVjYjczO3JldHVybiBfMHgyOTViYWE/XzB4Mjk1YmFhWydtYXRjaCddKHRoaXNbJ19udW1iZXJSZWdFeHAnXSk/J1snK18weDI5NWJhYSsnXSc6XzB4Mjk1YmFhW18weDVhYWI0NSgweDE4MyldKHRoaXNbXzB4NWFhYjQ1KDB4MTE2KV0pPycuJytfMHgyOTViYWE6XzB4Mjk1YmFhW18weDVhYWI0NSgweDE4MyldKHRoaXNbXzB4NWFhYjQ1KDB4MTczKV0pPydbJytfMHgyOTViYWErJ10nOidbXFxcXHgyNycrXzB4Mjk1YmFhKydcXFxceDI3XSc6Jyc7fX1sZXQgXzB4NGRjMWRjPW5ldyBfMHhkOTZkNjkoKTtmdW5jdGlvbiBfMHg0MWY3ZmIoXzB4MWE1OGFjLF8weDNjZDkwNCxfMHg1YTM2MmIsXzB4M2Q2ZWJkLF8weDViZTM4NSxfMHgyYTZmMWUpe3ZhciBfMHg0NmRjNGM9XzB4MmVjYjczO2xldCBfMHgxZTNhNzIsXzB4MjkxNmZhO3RyeXtfMHgyOTE2ZmE9XzB4NGFjNzY3KCksXzB4MWUzYTcyPV8weDE3N2ZkMVtfMHgzY2Q5MDRdLCFfMHgxZTNhNzJ8fF8weDI5MTZmYS1fMHgxZTNhNzJbJ3RzJ10+MHgxZjQmJl8weDFlM2E3MltfMHg0NmRjNGMoMHgxOWUpXSYmXzB4MWUzYTcyW18weDQ2ZGM0YygweDEzOSldL18weDFlM2E3MlsnY291bnQnXTwweDY0PyhfMHgxNzdmZDFbXzB4M2NkOTA0XT1fMHgxZTNhNzI9eydjb3VudCc6MHgwLCd0aW1lJzoweDAsJ3RzJzpfMHgyOTE2ZmF9LF8weDE3N2ZkMVtfMHg0NmRjNGMoMHgxNzUpXT17fSk6XzB4MjkxNmZhLV8weDE3N2ZkMVtfMHg0NmRjNGMoMHgxNzUpXVsndHMnXT4weDMyJiZfMHgxNzdmZDFbJ2hpdHMnXVtfMHg0NmRjNGMoMHgxOWUpXSYmXzB4MTc3ZmQxW18weDQ2ZGM0YygweDE3NSldW18weDQ2ZGM0YygweDEzOSldL18weDE3N2ZkMVtfMHg0NmRjNGMoMHgxNzUpXVtfMHg0NmRjNGMoMHgxOWUpXTwweDY0JiYoXzB4MTc3ZmQxW18weDQ2ZGM0YygweDE3NSldPXt9KTtsZXQgXzB4ZGMyNjEzPVtdLF8weDFkNDk1OT1fMHgxZTNhNzJbJ3JlZHVjZUxpbWl0cyddfHxfMHgxNzdmZDFbXzB4NDZkYzRjKDB4MTc1KV1bJ3JlZHVjZUxpbWl0cyddP18weDM2N2M4MDpfMHg1ZjQyODcsXzB4MjRmNDMwPV8weDQ1OWQ3Yz0+e3ZhciBfMHg0ODZlNzM9XzB4NDZkYzRjO2xldCBfMHg0Y2RkNzc9e307cmV0dXJuIF8weDRjZGQ3N1tfMHg0ODZlNzMoMHgxYTApXT1fMHg0NTlkN2NbXzB4NDg2ZTczKDB4MWEwKV0sXzB4NGNkZDc3WydlbGVtZW50cyddPV8weDQ1OWQ3Y1snZWxlbWVudHMnXSxfMHg0Y2RkNzdbJ3N0ckxlbmd0aCddPV8weDQ1OWQ3Y1tfMHg0ODZlNzMoMHgxOWQpXSxfMHg0Y2RkNzdbXzB4NDg2ZTczKDB4MTkwKV09XzB4NDU5ZDdjW18weDQ4NmU3MygweDE5MCldLF8weDRjZGQ3N1tfMHg0ODZlNzMoMHgxMzcpXT1fMHg0NTlkN2NbXzB4NDg2ZTczKDB4MTM3KV0sXzB4NGNkZDc3WydhdXRvRXhwYW5kTWF4RGVwdGgnXT1fMHg0NTlkN2NbXzB4NDg2ZTczKDB4MTk5KV0sXzB4NGNkZDc3W18weDQ4NmU3MygweDE3NyldPSEweDEsXzB4NGNkZDc3W18weDQ4NmU3MygweDEzNCldPSFfMHgxYmQ5NzUsXzB4NGNkZDc3WydkZXB0aCddPTB4MSxfMHg0Y2RkNzdbJ2xldmVsJ109MHgwLF8weDRjZGQ3N1snZXhwSWQnXT0ncm9vdF9leHBfaWQnLF8weDRjZGQ3N1tfMHg0ODZlNzMoMHgxMjgpXT1fMHg0ODZlNzMoMHgxNTApLF8weDRjZGQ3N1snYXV0b0V4cGFuZCddPSEweDAsXzB4NGNkZDc3W18weDQ4NmU3MygweDFiNSldPVtdLF8weDRjZGQ3N1tfMHg0ODZlNzMoMHgxMzYpXT0weDAsXzB4NGNkZDc3W18weDQ4NmU3MygweDE3YildPSEweDAsXzB4NGNkZDc3W18weDQ4NmU3MygweDE0ZildPTB4MCxfMHg0Y2RkNzdbXzB4NDg2ZTczKDB4MWE1KV09eydjdXJyZW50Jzp2b2lkIDB4MCwncGFyZW50Jzp2b2lkIDB4MCwnaW5kZXgnOjB4MH0sXzB4NGNkZDc3O307Zm9yKHZhciBfMHgyOGJlOWQ9MHgwO18weDI4YmU5ZDxfMHg1YmUzODVbXzB4NDZkYzRjKDB4MTU5KV07XzB4MjhiZTlkKyspXzB4ZGMyNjEzW18weDQ2ZGM0YygweDFlNCldKF8weDRkYzFkY1tfMHg0NmRjNGMoMHgxMzUpXSh7J3RpbWVOb2RlJzpfMHgxYTU4YWM9PT1fMHg0NmRjNGMoMHgxMzkpfHx2b2lkIDB4MH0sXzB4NWJlMzg1W18weDI4YmU5ZF0sXzB4MjRmNDMwKF8weDFkNDk1OSkse30pKTtpZihfMHgxYTU4YWM9PT1fMHg0NmRjNGMoMHgxODYpKXtsZXQgXzB4NWYxYzBjPUVycm9yW18weDQ2ZGM0YygweDEwYyldO3RyeXtFcnJvcltfMHg0NmRjNGMoMHgxMGMpXT0weDEvMHgwLF8weGRjMjYxM1tfMHg0NmRjNGMoMHgxZTQpXShfMHg0ZGMxZGNbXzB4NDZkYzRjKDB4MTM1KV0oeydzdGFja05vZGUnOiEweDB9LG5ldyBFcnJvcigpWydzdGFjayddLF8weDI0ZjQzMChfMHgxZDQ5NTkpLHsnc3RyTGVuZ3RoJzoweDEvMHgwfSkpO31maW5hbGx5e0Vycm9yW18weDQ2ZGM0YygweDEwYyldPV8weDVmMWMwYzt9fXJldHVybnsnbWV0aG9kJzpfMHg0NmRjNGMoMHgxYjMpLCd2ZXJzaW9uJzpfMHgxYjBjMWMsJ2FyZ3MnOlt7J3RzJzpfMHg1YTM2MmIsJ3Nlc3Npb24nOl8weDNkNmViZCwnYXJncyc6XzB4ZGMyNjEzLCdpZCc6XzB4M2NkOTA0LCdjb250ZXh0JzpfMHgyYTZmMWV9XX07fWNhdGNoKF8weDI1NGE2ZCl7cmV0dXJueydtZXRob2QnOl8weDQ2ZGM0YygweDFiMyksJ3ZlcnNpb24nOl8weDFiMGMxYywnYXJncyc6W3sndHMnOl8weDVhMzYyYiwnc2Vzc2lvbic6XzB4M2Q2ZWJkLCdhcmdzJzpbeyd0eXBlJzondW5rbm93bicsJ2Vycm9yJzpfMHgyNTRhNmQmJl8weDI1NGE2ZFtfMHg0NmRjNGMoMHgxODkpXX1dLCdpZCc6XzB4M2NkOTA0LCdjb250ZXh0JzpfMHgyYTZmMWV9XX07fWZpbmFsbHl7dHJ5e2lmKF8weDFlM2E3MiYmXzB4MjkxNmZhKXtsZXQgXzB4NWFmODliPV8weDRhYzc2NygpO18weDFlM2E3MltfMHg0NmRjNGMoMHgxOWUpXSsrLF8weDFlM2E3MltfMHg0NmRjNGMoMHgxMzkpXSs9XzB4NTc4N2NkKF8weDI5MTZmYSxfMHg1YWY4OWIpLF8weDFlM2E3MlsndHMnXT1fMHg1YWY4OWIsXzB4MTc3ZmQxW18weDQ2ZGM0YygweDE3NSldW18weDQ2ZGM0YygweDE5ZSldKyssXzB4MTc3ZmQxW18weDQ2ZGM0YygweDE3NSldW18weDQ2ZGM0YygweDEzOSldKz1fMHg1Nzg3Y2QoXzB4MjkxNmZhLF8weDVhZjg5YiksXzB4MTc3ZmQxW18weDQ2ZGM0YygweDE3NSldWyd0cyddPV8weDVhZjg5YiwoXzB4MWUzYTcyW18weDQ2ZGM0YygweDE5ZSldPjB4MzJ8fF8weDFlM2E3MlsndGltZSddPjB4NjQpJiYoXzB4MWUzYTcyW18weDQ2ZGM0YygweDE3MCldPSEweDApLChfMHgxNzdmZDFbXzB4NDZkYzRjKDB4MTc1KV1bJ2NvdW50J10+MHgzZTh8fF8weDE3N2ZkMVsnaGl0cyddW18weDQ2ZGM0YygweDEzOSldPjB4MTJjKSYmKF8weDE3N2ZkMVtfMHg0NmRjNGMoMHgxNzUpXVtfMHg0NmRjNGMoMHgxNzApXT0hMHgwKTt9fWNhdGNoe319fXJldHVybiBfMHg1N2I0NjNbJ19jb25zb2xlX25pbmphJ107fSkoZ2xvYmFsVGhpcyxfMHgyOGQ2NjUoMHgxNDcpLF8weDI4ZDY2NSgweDFjYiksXzB4MjhkNjY1KDB4MWE5KSxfMHgyOGQ2NjUoMHgxODcpLF8weDI4ZDY2NSgweDEwZiksXzB4MjhkNjY1KDB4MTNiKSxfMHgyOGQ2NjUoMHgxYjgpLCcnKTtcIik7fWNhdGNoKGUpe319O2Z1bmN0aW9uIG9vX29vKGk6c3RyaW5nLC4uLnY6YW55W10pe3RyeXtvb19jbSgpLmNvbnNvbGVMb2coaSwgdik7fWNhdGNoKGUpe30gcmV0dXJuIHZ9O29vX29vO2Z1bmN0aW9uIG9vX3RyKGk6c3RyaW5nLC4uLnY6YW55W10pe3RyeXtvb19jbSgpLmNvbnNvbGVUcmFjZShpLCB2KTt9Y2F0Y2goZSl7fSByZXR1cm4gdn07b29fdHI7ZnVuY3Rpb24gb29fdHMoKXt0cnl7b29fY20oKS5jb25zb2xlVGltZSgpO31jYXRjaChlKXt9fTtvb190cztmdW5jdGlvbiBvb190ZSgpe3RyeXtvb19jbSgpLmNvbnNvbGVUaW1lRW5kKCk7fWNhdGNoKGUpe319O29vX3RlOy8qZXNsaW50IGVzbGludC1jb21tZW50cy9kaXNhYmxlLWVuYWJsZS1wYWlyOixlc2xpbnQtY29tbWVudHMvbm8tdW5saW1pdGVkLWRpc2FibGU6LGVzbGludC1jb21tZW50cy9uby1hZ2dyZWdhdGluZy1lbmFibGU6LGVzbGludC1jb21tZW50cy9uby1kdXBsaWNhdGUtZGlzYWJsZTosZXNsaW50LWNvbW1lbnRzL25vLXVudXNlZC1kaXNhYmxlOixlc2xpbnQtY29tbWVudHMvbm8tdW51c2VkLWVuYWJsZTosKi8iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBhcHBMb2FkZXIsIEZ1bmN0aW9ucyB9IGZyb20gJy4vYXBwTG9hZGVyJztcbmltcG9ydCB7IENvbW1vbiB9IGZyb20gJy4vYXBwcy9Db21tb24nO1xuaW1wb3J0IHsgSG9tZSB9IGZyb20gJy4vYXBwcy9Ib21lJztcblxuY29uc3QgZnVuY3Rpb25zOiBGdW5jdGlvbnMgPSB7XG4gIENvbW1vbixcbiAgSG9tZSxcbn07XG5cbmNvbnN0IGRvY1JlYWR5ID0gKCkgPT4ge1xuICBhcHBMb2FkZXIoZnVuY3Rpb25zKTtcbn07XG5cbi8qKlxuICogVGhlIHJlYWR5IGV2ZW50IGhhbmRsZXIgYW5kIHNlbGYgY2xlYW51cCBtZXRob2RcbiAqIFtqcXVlcnkvc3JjL2NvcmUvcmVhZHkuanNdKGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L2Jsb2IvbWFpbi9zcmMvY29yZS9yZWFkeS5qcylcbiAqL1xuLy8g44Gp44GG44GX44Gm44GT44Gu5Yem55CG44KS5oyf44KA44Gu44GL44G+44Gg44KP44GL44Gj44Gm44GE44Gq44GEXG5mdW5jdGlvbiBjb21wbGV0ZWQoKSB7XG4gIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBjb21wbGV0ZWQpO1xuICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIGNvbXBsZXRlZCk7XG4gIGRvY1JlYWR5KCk7XG59XG5cbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9PSAnbG9hZGluZycpIHtcbiAgLy8gSGFuZGxlIGl0IGFzeW5jaHJvbm91c2x5IHRvIGFsbG93IHNjcmlwdHMgdGhlIG9wcG9ydHVuaXR5IHRvIGRlbGF5IHJlYWR5XG4gIHdpbmRvdy5zZXRUaW1lb3V0KGRvY1JlYWR5KTtcbn0gZWxzZSB7XG4gIC8vIFVzZSB0aGUgaGFuZHkgZXZlbnQgY2FsbGJhY2tcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGNvbXBsZXRlZCk7XG5cbiAgLy8gQSBmYWxsYmFjayB0byB3aW5kb3cub25sb2FkLCB0aGF0IHdpbGwgYWx3YXlzIHdvcmtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBjb21wbGV0ZWQpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9