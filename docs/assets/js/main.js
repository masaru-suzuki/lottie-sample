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
var complete = function () { /* eslint-disable */ return console.log.apply(/* eslint-disable */ console, __spreadArray([], __read(oo_oo("77c6f00e_0", 'complete')), false)); };
var gsapSample = function () {
    gsap__WEBPACK_IMPORTED_MODULE_0__.gsap.to('.box', { x: 200, backgroundColor: 'red', rotate: 180, duration: 1, yoyo: true, repeat: 1, onComplete: complete, ease: 'power1.inOut' });
};
var tl = gsap__WEBPACK_IMPORTED_MODULE_0__.gsap.timeline({ repeat: -1, repeatDelay: 2 });
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
        .from('.box2', { y: 32, opacity: 0, duration: 0.5 })
        .from('.box3', { y: -32, opacity: 0, duration: 0.5 })
        .from('.box4', { y: 32, opacity: 0, duration: 0.5 })
        .from('.box5', { y: -32, opacity: 0, duration: 0.5 })
        .from('.box6', { y: 32, opacity: 0, duration: 0.5 })
        .set('.js-section02-heading', { textContent: 'Hide Motion' }, '+=1') // 1秒待機
        .to('.box1', { y: -32, opacity: 0, duration: 0.5 }, '+=0.5')
        .to('.box2', { y: 32, opacity: 0, duration: 0.5 }, '-=0.4') // 0.4秒開始を早める
        .to('.box3', { y: -32, opacity: 0, duration: 0.5 }, '-=0.4')
        .to('.box4', { y: 32, opacity: 0, duration: 0.5 }, '-=0.4')
        .to('.box5', { y: -32, opacity: 0, duration: 0.5 }, '-=0.4')
        .to('.box6', { y: 32, opacity: 0, duration: 0.5 }, '-=0.4');
};
var Home = function () {
    gsapTimelineSample();
    gsapTimelineSample2();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsK0pBQStKO0FBQy9KO0FBQ0E7O0FBRUEsU0FBUywyQ0FBMkM7O0FBRXBEO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRDtBQUN0RCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSwySUFBMkk7QUFDM0k7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxlQUFlO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUEsbURBQW1EO0FBQ25ELENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsa0RBQWtEO0FBQ2xEOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7O0FBR0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtREFBbUQ7O0FBRW5EO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUM7QUFDakM7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGlFQUFpRTs7QUFFakU7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpRUFBaUU7O0FBRWpFLHNFQUFzRTs7QUFFdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkVBQTZFO0FBQzdFOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7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Q0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxRkFBcUY7O0FBRXJGOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSw2Q0FBNkM7O0FBRTdDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFROztBQUVSOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsNEJBQTRCLDhFQUE4RTtBQUNwSSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUyxPQUFPO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkZBQTJGO0FBQzNGLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxJQUFJOztBQUVKLGtCQUFrQjs7QUFFbEI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLG9FQUFvRTtBQUNwRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhDQUE4QztBQUM5QywyQkFBMkI7QUFDM0I7O0FBRUEseURBQXlEO0FBQ3pEOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3TUFBd007QUFDeE07O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNEQUFzRDtBQUN0RDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsMEdBQTBHO0FBQzFHLHNHQUFzRztBQUN0RztBQUNBOztBQUVBO0FBQ0EsZ0VBQWdFOztBQUVoRTs7QUFFQSxtQkFBbUI7OztBQUduQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw2RUFBNkU7O0FBRTdFLGtDQUFrQztBQUNsQyxRQUFRO0FBQ1I7O0FBRUEsOEJBQThCOztBQUU5QiwrTUFBK007QUFDL007QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMENBQTBDOztBQUUxQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1IQUFtSDtBQUNuSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNEZBQTRGOztBQUU1RjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR087QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EseUNBQXlDOztBQUV6QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxREFBcUQ7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxnS0FBZ0s7O0FBRWhLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7O0FBRS9CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCOztBQUUzQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFlBQVk7OztBQUdaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4QkFBOEI7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHFEQUFxRCw2TkFBNk4sT0FBTyxXQUFXLEtBQUs7QUFDL1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRDs7QUFFMUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSw2REFBNkQ7O0FBRTdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtUUFBbVE7O0FBRW5RO0FBQ0E7QUFDQTtBQUNBLG9GQUFvRjs7QUFFcEY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1DQUFtQzs7QUFFbkM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlIQUF5SDs7QUFFekg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUEsMEVBQTBFO0FBQzFFOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0VBQWdFO0FBQ2hFO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw0QkFBNEI7O0FBRTVCLCtDQUErQzs7QUFFL0M7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQjs7QUFF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QTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRJQUE0STs7QUFFNUksaUlBQWlJOztBQUVqSTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrREFBK0Q7O0FBRS9EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxHQUFHLHlFQUF5RSxJQUFJO0FBQ3JGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxHQUFHO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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QTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQSx5QkFBeUI7QUFDekI7QUFDQSxDQUFDLEdBQUc7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsR0FBRzs7O0FBR2Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0k7QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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U0FBUyxDQUFDLENBQUM7SUFFekQscURBQXFEO0lBQ3JELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7Q0FDNUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWItdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvZ3NhcC9DU1NQbHVnaW4uanMiLCJ3ZWJwYWNrOi8vd2ViLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2dzYXAvZ3NhcC1jb3JlLmpzIiwid2VicGFjazovL3dlYi10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9nc2FwL2luZGV4LmpzIiwid2VicGFjazovL3dlYi10ZW1wbGF0ZS8uL3NyYy9zY3JpcHRzL2FwcExvYWRlci50cyIsIndlYnBhY2s6Ly93ZWItdGVtcGxhdGUvLi9zcmMvc2NyaXB0cy9hcHBzL0NvbW1vbi50cyIsIndlYnBhY2s6Ly93ZWItdGVtcGxhdGUvLi9zcmMvc2NyaXB0cy9hcHBzL0hvbWUudHMiLCJ3ZWJwYWNrOi8vd2ViLXRlbXBsYXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYi10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2ViLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2ViLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2ViLXRlbXBsYXRlLy4vc3JjL3NjcmlwdHMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIENTU1BsdWdpbiAzLjEyLjFcbiAqIGh0dHBzOi8vZ3JlZW5zb2NrLmNvbVxuICpcbiAqIENvcHlyaWdodCAyMDA4LTIwMjMsIEdyZWVuU29jay4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFN1YmplY3QgdG8gdGhlIHRlcm1zIGF0IGh0dHBzOi8vZ3JlZW5zb2NrLmNvbS9zdGFuZGFyZC1saWNlbnNlIG9yIGZvclxuICogQ2x1YiBHcmVlblNvY2sgbWVtYmVycywgdGhlIGFncmVlbWVudCBpc3N1ZWQgd2l0aCB0aGF0IG1lbWJlcnNoaXAuXG4gKiBAYXV0aG9yOiBKYWNrIERveWxlLCBqYWNrQGdyZWVuc29jay5jb21cbiovXG5cbi8qIGVzbGludC1kaXNhYmxlICovXG5pbXBvcnQgeyBnc2FwLCBfZ2V0UHJvcGVydHksIF9udW1FeHAsIF9udW1XaXRoVW5pdEV4cCwgZ2V0VW5pdCwgX2lzU3RyaW5nLCBfaXNVbmRlZmluZWQsIF9yZW5kZXJDb21wbGV4U3RyaW5nLCBfcmVsRXhwLCBfZm9yRWFjaE5hbWUsIF9zb3J0UHJvcFR3ZWVuc0J5UHJpb3JpdHksIF9jb2xvclN0cmluZ0ZpbHRlciwgX2NoZWNrUGx1Z2luLCBfcmVwbGFjZVJhbmRvbSwgX3BsdWdpbnMsIEdTQ2FjaGUsIFByb3BUd2VlbiwgX2NvbmZpZywgX3RpY2tlciwgX3JvdW5kLCBfbWlzc2luZ1BsdWdpbiwgX2dldFNldHRlciwgX2dldENhY2hlLCBfY29sb3JFeHAsIF9wYXJzZVJlbGF0aXZlLCBfc2V0RGVmYXVsdHMsIF9yZW1vdmVMaW5rZWRMaXN0SXRlbSAvL2ZvciB0aGUgY29tbWVudGVkLW91dCBjbGFzc05hbWUgZmVhdHVyZS5cbn0gZnJvbSBcIi4vZ3NhcC1jb3JlLmpzXCI7XG5cbnZhciBfd2luLFxuICAgIF9kb2MsXG4gICAgX2RvY0VsZW1lbnQsXG4gICAgX3BsdWdpbkluaXR0ZWQsXG4gICAgX3RlbXBEaXYsXG4gICAgX3RlbXBEaXZTdHlsZXIsXG4gICAgX3JlY2VudFNldHRlclBsdWdpbixcbiAgICBfcmV2ZXJ0aW5nLFxuICAgIF93aW5kb3dFeGlzdHMgPSBmdW5jdGlvbiBfd2luZG93RXhpc3RzKCkge1xuICByZXR1cm4gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIjtcbn0sXG4gICAgX3RyYW5zZm9ybVByb3BzID0ge30sXG4gICAgX1JBRDJERUcgPSAxODAgLyBNYXRoLlBJLFxuICAgIF9ERUcyUkFEID0gTWF0aC5QSSAvIDE4MCxcbiAgICBfYXRhbjIgPSBNYXRoLmF0YW4yLFxuICAgIF9iaWdOdW0gPSAxZTgsXG4gICAgX2NhcHNFeHAgPSAvKFtBLVpdKS9nLFxuICAgIF9ob3Jpem9udGFsRXhwID0gLyhsZWZ0fHJpZ2h0fHdpZHRofG1hcmdpbnxwYWRkaW5nfHgpL2ksXG4gICAgX2NvbXBsZXhFeHAgPSAvW1xccyxcXChdXFxTLyxcbiAgICBfcHJvcGVydHlBbGlhc2VzID0ge1xuICBhdXRvQWxwaGE6IFwib3BhY2l0eSx2aXNpYmlsaXR5XCIsXG4gIHNjYWxlOiBcInNjYWxlWCxzY2FsZVlcIixcbiAgYWxwaGE6IFwib3BhY2l0eVwiXG59LFxuICAgIF9yZW5kZXJDU1NQcm9wID0gZnVuY3Rpb24gX3JlbmRlckNTU1Byb3AocmF0aW8sIGRhdGEpIHtcbiAgcmV0dXJuIGRhdGEuc2V0KGRhdGEudCwgZGF0YS5wLCBNYXRoLnJvdW5kKChkYXRhLnMgKyBkYXRhLmMgKiByYXRpbykgKiAxMDAwMCkgLyAxMDAwMCArIGRhdGEudSwgZGF0YSk7XG59LFxuICAgIF9yZW5kZXJQcm9wV2l0aEVuZCA9IGZ1bmN0aW9uIF9yZW5kZXJQcm9wV2l0aEVuZChyYXRpbywgZGF0YSkge1xuICByZXR1cm4gZGF0YS5zZXQoZGF0YS50LCBkYXRhLnAsIHJhdGlvID09PSAxID8gZGF0YS5lIDogTWF0aC5yb3VuZCgoZGF0YS5zICsgZGF0YS5jICogcmF0aW8pICogMTAwMDApIC8gMTAwMDAgKyBkYXRhLnUsIGRhdGEpO1xufSxcbiAgICBfcmVuZGVyQ1NTUHJvcFdpdGhCZWdpbm5pbmcgPSBmdW5jdGlvbiBfcmVuZGVyQ1NTUHJvcFdpdGhCZWdpbm5pbmcocmF0aW8sIGRhdGEpIHtcbiAgcmV0dXJuIGRhdGEuc2V0KGRhdGEudCwgZGF0YS5wLCByYXRpbyA/IE1hdGgucm91bmQoKGRhdGEucyArIGRhdGEuYyAqIHJhdGlvKSAqIDEwMDAwKSAvIDEwMDAwICsgZGF0YS51IDogZGF0YS5iLCBkYXRhKTtcbn0sXG4gICAgLy9pZiB1bml0cyBjaGFuZ2UsIHdlIG5lZWQgYSB3YXkgdG8gcmVuZGVyIHRoZSBvcmlnaW5hbCB1bml0L3ZhbHVlIHdoZW4gdGhlIHR3ZWVuIGdvZXMgYWxsIHRoZSB3YXkgYmFjayB0byB0aGUgYmVnaW5uaW5nIChyYXRpbzowKVxuX3JlbmRlclJvdW5kZWRDU1NQcm9wID0gZnVuY3Rpb24gX3JlbmRlclJvdW5kZWRDU1NQcm9wKHJhdGlvLCBkYXRhKSB7XG4gIHZhciB2YWx1ZSA9IGRhdGEucyArIGRhdGEuYyAqIHJhdGlvO1xuICBkYXRhLnNldChkYXRhLnQsIGRhdGEucCwgfn4odmFsdWUgKyAodmFsdWUgPCAwID8gLS41IDogLjUpKSArIGRhdGEudSwgZGF0YSk7XG59LFxuICAgIF9yZW5kZXJOb25Ud2VlbmluZ1ZhbHVlID0gZnVuY3Rpb24gX3JlbmRlck5vblR3ZWVuaW5nVmFsdWUocmF0aW8sIGRhdGEpIHtcbiAgcmV0dXJuIGRhdGEuc2V0KGRhdGEudCwgZGF0YS5wLCByYXRpbyA/IGRhdGEuZSA6IGRhdGEuYiwgZGF0YSk7XG59LFxuICAgIF9yZW5kZXJOb25Ud2VlbmluZ1ZhbHVlT25seUF0RW5kID0gZnVuY3Rpb24gX3JlbmRlck5vblR3ZWVuaW5nVmFsdWVPbmx5QXRFbmQocmF0aW8sIGRhdGEpIHtcbiAgcmV0dXJuIGRhdGEuc2V0KGRhdGEudCwgZGF0YS5wLCByYXRpbyAhPT0gMSA/IGRhdGEuYiA6IGRhdGEuZSwgZGF0YSk7XG59LFxuICAgIF9zZXR0ZXJDU1NTdHlsZSA9IGZ1bmN0aW9uIF9zZXR0ZXJDU1NTdHlsZSh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSkge1xuICByZXR1cm4gdGFyZ2V0LnN0eWxlW3Byb3BlcnR5XSA9IHZhbHVlO1xufSxcbiAgICBfc2V0dGVyQ1NTUHJvcCA9IGZ1bmN0aW9uIF9zZXR0ZXJDU1NQcm9wKHRhcmdldCwgcHJvcGVydHksIHZhbHVlKSB7XG4gIHJldHVybiB0YXJnZXQuc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKTtcbn0sXG4gICAgX3NldHRlclRyYW5zZm9ybSA9IGZ1bmN0aW9uIF9zZXR0ZXJUcmFuc2Zvcm0odGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgcmV0dXJuIHRhcmdldC5fZ3NhcFtwcm9wZXJ0eV0gPSB2YWx1ZTtcbn0sXG4gICAgX3NldHRlclNjYWxlID0gZnVuY3Rpb24gX3NldHRlclNjYWxlKHRhcmdldCwgcHJvcGVydHksIHZhbHVlKSB7XG4gIHJldHVybiB0YXJnZXQuX2dzYXAuc2NhbGVYID0gdGFyZ2V0Ll9nc2FwLnNjYWxlWSA9IHZhbHVlO1xufSxcbiAgICBfc2V0dGVyU2NhbGVXaXRoUmVuZGVyID0gZnVuY3Rpb24gX3NldHRlclNjYWxlV2l0aFJlbmRlcih0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSwgZGF0YSwgcmF0aW8pIHtcbiAgdmFyIGNhY2hlID0gdGFyZ2V0Ll9nc2FwO1xuICBjYWNoZS5zY2FsZVggPSBjYWNoZS5zY2FsZVkgPSB2YWx1ZTtcbiAgY2FjaGUucmVuZGVyVHJhbnNmb3JtKHJhdGlvLCBjYWNoZSk7XG59LFxuICAgIF9zZXR0ZXJUcmFuc2Zvcm1XaXRoUmVuZGVyID0gZnVuY3Rpb24gX3NldHRlclRyYW5zZm9ybVdpdGhSZW5kZXIodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUsIGRhdGEsIHJhdGlvKSB7XG4gIHZhciBjYWNoZSA9IHRhcmdldC5fZ3NhcDtcbiAgY2FjaGVbcHJvcGVydHldID0gdmFsdWU7XG4gIGNhY2hlLnJlbmRlclRyYW5zZm9ybShyYXRpbywgY2FjaGUpO1xufSxcbiAgICBfdHJhbnNmb3JtUHJvcCA9IFwidHJhbnNmb3JtXCIsXG4gICAgX3RyYW5zZm9ybU9yaWdpblByb3AgPSBfdHJhbnNmb3JtUHJvcCArIFwiT3JpZ2luXCIsXG4gICAgX3NhdmVTdHlsZSA9IGZ1bmN0aW9uIF9zYXZlU3R5bGUocHJvcGVydHksIGlzTm90Q1NTKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgdmFyIHRhcmdldCA9IHRoaXMudGFyZ2V0LFxuICAgICAgc3R5bGUgPSB0YXJnZXQuc3R5bGU7XG5cbiAgaWYgKHByb3BlcnR5IGluIF90cmFuc2Zvcm1Qcm9wcyAmJiBzdHlsZSkge1xuICAgIHRoaXMudGZtID0gdGhpcy50Zm0gfHwge307XG5cbiAgICBpZiAocHJvcGVydHkgIT09IFwidHJhbnNmb3JtXCIpIHtcbiAgICAgIHByb3BlcnR5ID0gX3Byb3BlcnR5QWxpYXNlc1twcm9wZXJ0eV0gfHwgcHJvcGVydHk7XG4gICAgICB+cHJvcGVydHkuaW5kZXhPZihcIixcIikgPyBwcm9wZXJ0eS5zcGxpdChcIixcIikuZm9yRWFjaChmdW5jdGlvbiAoYSkge1xuICAgICAgICByZXR1cm4gX3RoaXMudGZtW2FdID0gX2dldCh0YXJnZXQsIGEpO1xuICAgICAgfSkgOiB0aGlzLnRmbVtwcm9wZXJ0eV0gPSB0YXJnZXQuX2dzYXAueCA/IHRhcmdldC5fZ3NhcFtwcm9wZXJ0eV0gOiBfZ2V0KHRhcmdldCwgcHJvcGVydHkpOyAvLyBub3RlOiBzY2FsZSB3b3VsZCBtYXAgdG8gXCJzY2FsZVgsc2NhbGVZXCIsIHRodXMgd2UgbG9vcCBhbmQgYXBwbHkgdGhlbSBib3RoLlxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gX3Byb3BlcnR5QWxpYXNlcy50cmFuc2Zvcm0uc3BsaXQoXCIsXCIpLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICAgICAgcmV0dXJuIF9zYXZlU3R5bGUuY2FsbChfdGhpcywgcCwgaXNOb3RDU1MpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMuaW5kZXhPZihfdHJhbnNmb3JtUHJvcCkgPj0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0YXJnZXQuX2dzYXAuc3ZnKSB7XG4gICAgICB0aGlzLnN2Z28gPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1zdmctb3JpZ2luXCIpO1xuICAgICAgdGhpcy5wcm9wcy5wdXNoKF90cmFuc2Zvcm1PcmlnaW5Qcm9wLCBpc05vdENTUywgXCJcIik7XG4gICAgfVxuXG4gICAgcHJvcGVydHkgPSBfdHJhbnNmb3JtUHJvcDtcbiAgfVxuXG4gIChzdHlsZSB8fCBpc05vdENTUykgJiYgdGhpcy5wcm9wcy5wdXNoKHByb3BlcnR5LCBpc05vdENTUywgc3R5bGVbcHJvcGVydHldKTtcbn0sXG4gICAgX3JlbW92ZUluZGVwZW5kZW50VHJhbnNmb3JtcyA9IGZ1bmN0aW9uIF9yZW1vdmVJbmRlcGVuZGVudFRyYW5zZm9ybXMoc3R5bGUpIHtcbiAgaWYgKHN0eWxlLnRyYW5zbGF0ZSkge1xuICAgIHN0eWxlLnJlbW92ZVByb3BlcnR5KFwidHJhbnNsYXRlXCIpO1xuICAgIHN0eWxlLnJlbW92ZVByb3BlcnR5KFwic2NhbGVcIik7XG4gICAgc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJyb3RhdGVcIik7XG4gIH1cbn0sXG4gICAgX3JldmVydFN0eWxlID0gZnVuY3Rpb24gX3JldmVydFN0eWxlKCkge1xuICB2YXIgcHJvcHMgPSB0aGlzLnByb3BzLFxuICAgICAgdGFyZ2V0ID0gdGhpcy50YXJnZXQsXG4gICAgICBzdHlsZSA9IHRhcmdldC5zdHlsZSxcbiAgICAgIGNhY2hlID0gdGFyZ2V0Ll9nc2FwLFxuICAgICAgaSxcbiAgICAgIHA7XG5cbiAgZm9yIChpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSArPSAzKSB7XG4gICAgLy8gc3RvcmVkIGxpa2UgdGhpczogcHJvcGVydHksIGlzTm90Q1NTLCB2YWx1ZVxuICAgIHByb3BzW2kgKyAxXSA/IHRhcmdldFtwcm9wc1tpXV0gPSBwcm9wc1tpICsgMl0gOiBwcm9wc1tpICsgMl0gPyBzdHlsZVtwcm9wc1tpXV0gPSBwcm9wc1tpICsgMl0gOiBzdHlsZS5yZW1vdmVQcm9wZXJ0eShwcm9wc1tpXS5zdWJzdHIoMCwgMikgPT09IFwiLS1cIiA/IHByb3BzW2ldIDogcHJvcHNbaV0ucmVwbGFjZShfY2Fwc0V4cCwgXCItJDFcIikudG9Mb3dlckNhc2UoKSk7XG4gIH1cblxuICBpZiAodGhpcy50Zm0pIHtcbiAgICBmb3IgKHAgaW4gdGhpcy50Zm0pIHtcbiAgICAgIGNhY2hlW3BdID0gdGhpcy50Zm1bcF07XG4gICAgfVxuXG4gICAgaWYgKGNhY2hlLnN2Zykge1xuICAgICAgY2FjaGUucmVuZGVyVHJhbnNmb3JtKCk7XG4gICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKFwiZGF0YS1zdmctb3JpZ2luXCIsIHRoaXMuc3ZnbyB8fCBcIlwiKTtcbiAgICB9XG5cbiAgICBpID0gX3JldmVydGluZygpO1xuXG4gICAgaWYgKCghaSB8fCAhaS5pc1N0YXJ0KSAmJiAhc3R5bGVbX3RyYW5zZm9ybVByb3BdKSB7XG4gICAgICBfcmVtb3ZlSW5kZXBlbmRlbnRUcmFuc2Zvcm1zKHN0eWxlKTtcblxuICAgICAgY2FjaGUudW5jYWNoZSA9IDE7IC8vIGlmIGl0J3MgYSBzdGFydEF0IHRoYXQncyBiZWluZyByZXZlcnRlZCBpbiB0aGUgX2luaXRUd2VlbigpIG9mIHRoZSBjb3JlLCB3ZSBkb24ndCBuZWVkIHRvIHVuY2FjaGUgdHJhbnNmb3Jtcy4gVGhpcyBpcyBwdXJlbHkgYSBwZXJmb3JtYW5jZSBvcHRpbWl6YXRpb24uXG4gICAgfVxuICB9XG59LFxuICAgIF9nZXRTdHlsZVNhdmVyID0gZnVuY3Rpb24gX2dldFN0eWxlU2F2ZXIodGFyZ2V0LCBwcm9wZXJ0aWVzKSB7XG4gIHZhciBzYXZlciA9IHtcbiAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICBwcm9wczogW10sXG4gICAgcmV2ZXJ0OiBfcmV2ZXJ0U3R5bGUsXG4gICAgc2F2ZTogX3NhdmVTdHlsZVxuICB9O1xuICB0YXJnZXQuX2dzYXAgfHwgZ3NhcC5jb3JlLmdldENhY2hlKHRhcmdldCk7IC8vIGp1c3QgbWFrZSBzdXJlIHRoZXJlJ3MgYSBfZ3NhcCBjYWNoZSBkZWZpbmVkIGJlY2F1c2Ugd2UgcmVhZCBmcm9tIGl0IGluIF9zYXZlU3R5bGUoKSBhbmQgaXQncyBtb3JlIGVmZmljaWVudCB0byBqdXN0IGNoZWNrIGl0IGhlcmUgb25jZS5cblxuICBwcm9wZXJ0aWVzICYmIHByb3BlcnRpZXMuc3BsaXQoXCIsXCIpLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gc2F2ZXIuc2F2ZShwKTtcbiAgfSk7XG4gIHJldHVybiBzYXZlcjtcbn0sXG4gICAgX3N1cHBvcnRzM0QsXG4gICAgX2NyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiBfY3JlYXRlRWxlbWVudCh0eXBlLCBucykge1xuICB2YXIgZSA9IF9kb2MuY3JlYXRlRWxlbWVudE5TID8gX2RvYy5jcmVhdGVFbGVtZW50TlMoKG5zIHx8IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiKS5yZXBsYWNlKC9eaHR0cHMvLCBcImh0dHBcIiksIHR5cGUpIDogX2RvYy5jcmVhdGVFbGVtZW50KHR5cGUpOyAvL3NvbWUgc2VydmVycyBzd2FwIGluIGh0dHBzIGZvciBodHRwIGluIHRoZSBuYW1lc3BhY2Ugd2hpY2ggY2FuIGJyZWFrIHRoaW5ncywgbWFraW5nIFwic3R5bGVcIiBpbmFjY2Vzc2libGUuXG5cbiAgcmV0dXJuIGUuc3R5bGUgPyBlIDogX2RvYy5jcmVhdGVFbGVtZW50KHR5cGUpOyAvL3NvbWUgZW52aXJvbm1lbnRzIHdvbid0IGFsbG93IGFjY2VzcyB0byB0aGUgZWxlbWVudCdzIHN0eWxlIHdoZW4gY3JlYXRlZCB3aXRoIGEgbmFtZXNwYWNlIGluIHdoaWNoIGNhc2Ugd2UgZGVmYXVsdCB0byB0aGUgc3RhbmRhcmQgY3JlYXRlRWxlbWVudCgpIHRvIHdvcmsgYXJvdW5kIHRoZSBpc3N1ZS4gQWxzbyBub3RlIHRoYXQgd2hlbiBHU0FQIGlzIGVtYmVkZGVkIGRpcmVjdGx5IGluc2lkZSBhbiBTVkcgZmlsZSwgY3JlYXRlRWxlbWVudCgpIHdvbid0IGFsbG93IGFjY2VzcyB0byB0aGUgc3R5bGUgb2JqZWN0IGluIEZpcmVmb3ggKHNlZSBodHRwczovL2dyZWVuc29jay5jb20vZm9ydW1zL3RvcGljLzIwMjE1LXByb2JsZW0tdXNpbmctdHdlZW5tYXgtaW4tc3RhbmRhbG9uZS1zZWxmLWNvbnRhaW5pbmctc3ZnLWZpbGUtZXJyLWNhbm5vdC1zZXQtcHJvcGVydHktY3NzdGV4dC1vZi11bmRlZmluZWQvKS5cbn0sXG4gICAgX2dldENvbXB1dGVkUHJvcGVydHkgPSBmdW5jdGlvbiBfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5LCBza2lwUHJlZml4RmFsbGJhY2spIHtcbiAgdmFyIGNzID0gZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXQpO1xuICByZXR1cm4gY3NbcHJvcGVydHldIHx8IGNzLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkucmVwbGFjZShfY2Fwc0V4cCwgXCItJDFcIikudG9Mb3dlckNhc2UoKSkgfHwgY3MuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSkgfHwgIXNraXBQcmVmaXhGYWxsYmFjayAmJiBfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSh0YXJnZXQsIF9jaGVja1Byb3BQcmVmaXgocHJvcGVydHkpIHx8IHByb3BlcnR5LCAxKSB8fCBcIlwiOyAvL2NzcyB2YXJpYWJsZXMgbWF5IG5vdCBuZWVkIGNhcHMgc3dhcHBlZCBvdXQgZm9yIGRhc2hlcyBhbmQgbG93ZXJjYXNlLlxufSxcbiAgICBfcHJlZml4ZXMgPSBcIk8sTW96LG1zLE1zLFdlYmtpdFwiLnNwbGl0KFwiLFwiKSxcbiAgICBfY2hlY2tQcm9wUHJlZml4ID0gZnVuY3Rpb24gX2NoZWNrUHJvcFByZWZpeChwcm9wZXJ0eSwgZWxlbWVudCwgcHJlZmVyUHJlZml4KSB7XG4gIHZhciBlID0gZWxlbWVudCB8fCBfdGVtcERpdixcbiAgICAgIHMgPSBlLnN0eWxlLFxuICAgICAgaSA9IDU7XG5cbiAgaWYgKHByb3BlcnR5IGluIHMgJiYgIXByZWZlclByZWZpeCkge1xuICAgIHJldHVybiBwcm9wZXJ0eTtcbiAgfVxuXG4gIHByb3BlcnR5ID0gcHJvcGVydHkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBwcm9wZXJ0eS5zdWJzdHIoMSk7XG5cbiAgd2hpbGUgKGktLSAmJiAhKF9wcmVmaXhlc1tpXSArIHByb3BlcnR5IGluIHMpKSB7fVxuXG4gIHJldHVybiBpIDwgMCA/IG51bGwgOiAoaSA9PT0gMyA/IFwibXNcIiA6IGkgPj0gMCA/IF9wcmVmaXhlc1tpXSA6IFwiXCIpICsgcHJvcGVydHk7XG59LFxuICAgIF9pbml0Q29yZSA9IGZ1bmN0aW9uIF9pbml0Q29yZSgpIHtcbiAgaWYgKF93aW5kb3dFeGlzdHMoKSAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICBfd2luID0gd2luZG93O1xuICAgIF9kb2MgPSBfd2luLmRvY3VtZW50O1xuICAgIF9kb2NFbGVtZW50ID0gX2RvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgX3RlbXBEaXYgPSBfY3JlYXRlRWxlbWVudChcImRpdlwiKSB8fCB7XG4gICAgICBzdHlsZToge31cbiAgICB9O1xuICAgIF90ZW1wRGl2U3R5bGVyID0gX2NyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgX3RyYW5zZm9ybVByb3AgPSBfY2hlY2tQcm9wUHJlZml4KF90cmFuc2Zvcm1Qcm9wKTtcbiAgICBfdHJhbnNmb3JtT3JpZ2luUHJvcCA9IF90cmFuc2Zvcm1Qcm9wICsgXCJPcmlnaW5cIjtcbiAgICBfdGVtcERpdi5zdHlsZS5jc3NUZXh0ID0gXCJib3JkZXItd2lkdGg6MDtsaW5lLWhlaWdodDowO3Bvc2l0aW9uOmFic29sdXRlO3BhZGRpbmc6MFwiOyAvL21ha2Ugc3VyZSB0byBvdmVycmlkZSBjZXJ0YWluIHByb3BlcnRpZXMgdGhhdCBtYXkgY29udGFtaW5hdGUgbWVhc3VyZW1lbnRzLCBpbiBjYXNlIHRoZSB1c2VyIGhhcyBvdmVycmVhY2hpbmcgc3R5bGUgc2hlZXRzLlxuXG4gICAgX3N1cHBvcnRzM0QgPSAhIV9jaGVja1Byb3BQcmVmaXgoXCJwZXJzcGVjdGl2ZVwiKTtcbiAgICBfcmV2ZXJ0aW5nID0gZ3NhcC5jb3JlLnJldmVydGluZztcbiAgICBfcGx1Z2luSW5pdHRlZCA9IDE7XG4gIH1cbn0sXG4gICAgX2dldEJCb3hIYWNrID0gZnVuY3Rpb24gX2dldEJCb3hIYWNrKHN3YXBJZlBvc3NpYmxlKSB7XG4gIC8vd29ya3MgYXJvdW5kIGlzc3VlcyBpbiBzb21lIGJyb3dzZXJzIChsaWtlIEZpcmVmb3gpIHRoYXQgZG9uJ3QgY29ycmVjdGx5IHJlcG9ydCBnZXRCQm94KCkgb24gU1ZHIGVsZW1lbnRzIGluc2lkZSBhIDxkZWZzPiBlbGVtZW50IGFuZC9vciA8bWFzaz4uIFdlIHRyeSBjcmVhdGluZyBhbiBTVkcsIGFkZGluZyBpdCB0byB0aGUgZG9jdW1lbnRFbGVtZW50IGFuZCB0b3NzIHRoZSBlbGVtZW50IGluIHRoZXJlIHNvIHRoYXQgaXQncyBkZWZpbml0ZWx5IHBhcnQgb2YgdGhlIHJlbmRlcmluZyB0cmVlLCB0aGVuIGdyYWIgdGhlIGJib3ggYW5kIGlmIGl0IHdvcmtzLCB3ZSBhY3R1YWxseSBzd2FwIG91dCB0aGUgb3JpZ2luYWwgZ2V0QkJveCgpIG1ldGhvZCBmb3Igb3VyIG93biB0aGF0IGRvZXMgdGhlc2UgZXh0cmEgc3RlcHMgd2hlbmV2ZXIgZ2V0QkJveCBpcyBuZWVkZWQuIFRoaXMgaGVscHMgZW5zdXJlIHRoYXQgcGVyZm9ybWFuY2UgaXMgb3B0aW1hbCAob25seSBkbyBhbGwgdGhlc2UgZXh0cmEgc3RlcHMgd2hlbiBhYnNvbHV0ZWx5IG5lY2Vzc2FyeS4uLm1vc3QgZWxlbWVudHMgZG9uJ3QgbmVlZCBpdCkuXG4gIHZhciBzdmcgPSBfY3JlYXRlRWxlbWVudChcInN2Z1wiLCB0aGlzLm93bmVyU1ZHRWxlbWVudCAmJiB0aGlzLm93bmVyU1ZHRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJ4bWxuc1wiKSB8fCBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIpLFxuICAgICAgb2xkUGFyZW50ID0gdGhpcy5wYXJlbnROb2RlLFxuICAgICAgb2xkU2libGluZyA9IHRoaXMubmV4dFNpYmxpbmcsXG4gICAgICBvbGRDU1MgPSB0aGlzLnN0eWxlLmNzc1RleHQsXG4gICAgICBiYm94O1xuXG4gIF9kb2NFbGVtZW50LmFwcGVuZENoaWxkKHN2Zyk7XG5cbiAgc3ZnLmFwcGVuZENoaWxkKHRoaXMpO1xuICB0aGlzLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cbiAgaWYgKHN3YXBJZlBvc3NpYmxlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGJib3ggPSB0aGlzLmdldEJCb3goKTtcbiAgICAgIHRoaXMuX2dzYXBCQm94ID0gdGhpcy5nZXRCQm94OyAvL3N0b3JlIHRoZSBvcmlnaW5hbFxuXG4gICAgICB0aGlzLmdldEJCb3ggPSBfZ2V0QkJveEhhY2s7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfSBlbHNlIGlmICh0aGlzLl9nc2FwQkJveCkge1xuICAgIGJib3ggPSB0aGlzLl9nc2FwQkJveCgpO1xuICB9XG5cbiAgaWYgKG9sZFBhcmVudCkge1xuICAgIGlmIChvbGRTaWJsaW5nKSB7XG4gICAgICBvbGRQYXJlbnQuaW5zZXJ0QmVmb3JlKHRoaXMsIG9sZFNpYmxpbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvbGRQYXJlbnQuYXBwZW5kQ2hpbGQodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgX2RvY0VsZW1lbnQucmVtb3ZlQ2hpbGQoc3ZnKTtcblxuICB0aGlzLnN0eWxlLmNzc1RleHQgPSBvbGRDU1M7XG4gIHJldHVybiBiYm94O1xufSxcbiAgICBfZ2V0QXR0cmlidXRlRmFsbGJhY2tzID0gZnVuY3Rpb24gX2dldEF0dHJpYnV0ZUZhbGxiYWNrcyh0YXJnZXQsIGF0dHJpYnV0ZXNBcnJheSkge1xuICB2YXIgaSA9IGF0dHJpYnV0ZXNBcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKGktLSkge1xuICAgIGlmICh0YXJnZXQuaGFzQXR0cmlidXRlKGF0dHJpYnV0ZXNBcnJheVtpXSkpIHtcbiAgICAgIHJldHVybiB0YXJnZXQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZXNBcnJheVtpXSk7XG4gICAgfVxuICB9XG59LFxuICAgIF9nZXRCQm94ID0gZnVuY3Rpb24gX2dldEJCb3godGFyZ2V0KSB7XG4gIHZhciBib3VuZHM7XG5cbiAgdHJ5IHtcbiAgICBib3VuZHMgPSB0YXJnZXQuZ2V0QkJveCgpOyAvL0ZpcmVmb3ggdGhyb3dzIGVycm9ycyBpZiB5b3UgdHJ5IGNhbGxpbmcgZ2V0QkJveCgpIG9uIGFuIFNWRyBlbGVtZW50IHRoYXQncyBub3QgcmVuZGVyZWQgKGxpa2UgaW4gYSA8c3ltYm9sPiBvciA8ZGVmcz4pLiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02MTIxMThcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBib3VuZHMgPSBfZ2V0QkJveEhhY2suY2FsbCh0YXJnZXQsIHRydWUpO1xuICB9XG5cbiAgYm91bmRzICYmIChib3VuZHMud2lkdGggfHwgYm91bmRzLmhlaWdodCkgfHwgdGFyZ2V0LmdldEJCb3ggPT09IF9nZXRCQm94SGFjayB8fCAoYm91bmRzID0gX2dldEJCb3hIYWNrLmNhbGwodGFyZ2V0LCB0cnVlKSk7IC8vc29tZSBicm93c2VycyAobGlrZSBGaXJlZm94KSBtaXNyZXBvcnQgdGhlIGJvdW5kcyBpZiB0aGUgZWxlbWVudCBoYXMgemVybyB3aWR0aCBhbmQgaGVpZ2h0IChpdCBqdXN0IGFzc3VtZXMgaXQncyBhdCB4OjAsIHk6MCksIHRodXMgd2UgbmVlZCB0byBtYW51YWxseSBncmFiIHRoZSBwb3NpdGlvbiBpbiB0aGF0IGNhc2UuXG5cbiAgcmV0dXJuIGJvdW5kcyAmJiAhYm91bmRzLndpZHRoICYmICFib3VuZHMueCAmJiAhYm91bmRzLnkgPyB7XG4gICAgeDogK19nZXRBdHRyaWJ1dGVGYWxsYmFja3ModGFyZ2V0LCBbXCJ4XCIsIFwiY3hcIiwgXCJ4MVwiXSkgfHwgMCxcbiAgICB5OiArX2dldEF0dHJpYnV0ZUZhbGxiYWNrcyh0YXJnZXQsIFtcInlcIiwgXCJjeVwiLCBcInkxXCJdKSB8fCAwLFxuICAgIHdpZHRoOiAwLFxuICAgIGhlaWdodDogMFxuICB9IDogYm91bmRzO1xufSxcbiAgICBfaXNTVkcgPSBmdW5jdGlvbiBfaXNTVkcoZSkge1xuICByZXR1cm4gISEoZS5nZXRDVE0gJiYgKCFlLnBhcmVudE5vZGUgfHwgZS5vd25lclNWR0VsZW1lbnQpICYmIF9nZXRCQm94KGUpKTtcbn0sXG4gICAgLy9yZXBvcnRzIGlmIHRoZSBlbGVtZW50IGlzIGFuIFNWRyBvbiB3aGljaCBnZXRCQm94KCkgYWN0dWFsbHkgd29ya3Ncbl9yZW1vdmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIF9yZW1vdmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5KSB7XG4gIGlmIChwcm9wZXJ0eSkge1xuICAgIHZhciBzdHlsZSA9IHRhcmdldC5zdHlsZTtcblxuICAgIGlmIChwcm9wZXJ0eSBpbiBfdHJhbnNmb3JtUHJvcHMgJiYgcHJvcGVydHkgIT09IF90cmFuc2Zvcm1PcmlnaW5Qcm9wKSB7XG4gICAgICBwcm9wZXJ0eSA9IF90cmFuc2Zvcm1Qcm9wO1xuICAgIH1cblxuICAgIGlmIChzdHlsZS5yZW1vdmVQcm9wZXJ0eSkge1xuICAgICAgaWYgKHByb3BlcnR5LnN1YnN0cigwLCAyKSA9PT0gXCJtc1wiIHx8IHByb3BlcnR5LnN1YnN0cigwLCA2KSA9PT0gXCJ3ZWJraXRcIikge1xuICAgICAgICAvL01pY3Jvc29mdCBhbmQgc29tZSBXZWJraXQgYnJvd3NlcnMgZG9uJ3QgY29uZm9ybSB0byB0aGUgc3RhbmRhcmQgb2YgY2FwaXRhbGl6aW5nIHRoZSBmaXJzdCBwcmVmaXggY2hhcmFjdGVyLCBzbyB3ZSBhZGp1c3Qgc28gdGhhdCB3aGVuIHdlIHByZWZpeCB0aGUgY2FwcyB3aXRoIGEgZGFzaCwgaXQncyBjb3JyZWN0IChvdGhlcndpc2UgaXQnZCBiZSBcIm1zLXRyYW5zZm9ybVwiIGluc3RlYWQgb2YgXCItbXMtdHJhbnNmb3JtXCIgZm9yIElFOSwgZm9yIGV4YW1wbGUpXG4gICAgICAgIHByb3BlcnR5ID0gXCItXCIgKyBwcm9wZXJ0eTtcbiAgICAgIH1cblxuICAgICAgc3R5bGUucmVtb3ZlUHJvcGVydHkocHJvcGVydHkucmVwbGFjZShfY2Fwc0V4cCwgXCItJDFcIikudG9Mb3dlckNhc2UoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vbm90ZTogb2xkIHZlcnNpb25zIG9mIElFIHVzZSBcInJlbW92ZUF0dHJpYnV0ZSgpXCIgaW5zdGVhZCBvZiBcInJlbW92ZVByb3BlcnR5KClcIlxuICAgICAgc3R5bGUucmVtb3ZlQXR0cmlidXRlKHByb3BlcnR5KTtcbiAgICB9XG4gIH1cbn0sXG4gICAgX2FkZE5vblR3ZWVuaW5nUFQgPSBmdW5jdGlvbiBfYWRkTm9uVHdlZW5pbmdQVChwbHVnaW4sIHRhcmdldCwgcHJvcGVydHksIGJlZ2lubmluZywgZW5kLCBvbmx5U2V0QXRFbmQpIHtcbiAgdmFyIHB0ID0gbmV3IFByb3BUd2VlbihwbHVnaW4uX3B0LCB0YXJnZXQsIHByb3BlcnR5LCAwLCAxLCBvbmx5U2V0QXRFbmQgPyBfcmVuZGVyTm9uVHdlZW5pbmdWYWx1ZU9ubHlBdEVuZCA6IF9yZW5kZXJOb25Ud2VlbmluZ1ZhbHVlKTtcbiAgcGx1Z2luLl9wdCA9IHB0O1xuICBwdC5iID0gYmVnaW5uaW5nO1xuICBwdC5lID0gZW5kO1xuXG4gIHBsdWdpbi5fcHJvcHMucHVzaChwcm9wZXJ0eSk7XG5cbiAgcmV0dXJuIHB0O1xufSxcbiAgICBfbm9uQ29udmVydGlibGVVbml0cyA9IHtcbiAgZGVnOiAxLFxuICByYWQ6IDEsXG4gIHR1cm46IDFcbn0sXG4gICAgX25vblN0YW5kYXJkTGF5b3V0cyA9IHtcbiAgZ3JpZDogMSxcbiAgZmxleDogMVxufSxcbiAgICAvL3Rha2VzIGEgc2luZ2xlIHZhbHVlIGxpa2UgMjBweCBhbmQgY29udmVydHMgaXQgdG8gdGhlIHVuaXQgc3BlY2lmaWVkLCBsaWtlIFwiJVwiLCByZXR1cm5pbmcgb25seSB0aGUgbnVtZXJpYyBhbW91bnQuXG5fY29udmVydFRvVW5pdCA9IGZ1bmN0aW9uIF9jb252ZXJ0VG9Vbml0KHRhcmdldCwgcHJvcGVydHksIHZhbHVlLCB1bml0KSB7XG4gIHZhciBjdXJWYWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpIHx8IDAsXG4gICAgICBjdXJVbml0ID0gKHZhbHVlICsgXCJcIikudHJpbSgpLnN1YnN0cigoY3VyVmFsdWUgKyBcIlwiKS5sZW5ndGgpIHx8IFwicHhcIixcbiAgICAgIC8vIHNvbWUgYnJvd3NlcnMgbGVhdmUgZXh0cmEgd2hpdGVzcGFjZSBhdCB0aGUgYmVnaW5uaW5nIG9mIENTUyB2YXJpYWJsZXMsIGhlbmNlIHRoZSBuZWVkIHRvIHRyaW0oKVxuICBzdHlsZSA9IF90ZW1wRGl2LnN0eWxlLFxuICAgICAgaG9yaXpvbnRhbCA9IF9ob3Jpem9udGFsRXhwLnRlc3QocHJvcGVydHkpLFxuICAgICAgaXNSb290U1ZHID0gdGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJzdmdcIixcbiAgICAgIG1lYXN1cmVQcm9wZXJ0eSA9IChpc1Jvb3RTVkcgPyBcImNsaWVudFwiIDogXCJvZmZzZXRcIikgKyAoaG9yaXpvbnRhbCA/IFwiV2lkdGhcIiA6IFwiSGVpZ2h0XCIpLFxuICAgICAgYW1vdW50ID0gMTAwLFxuICAgICAgdG9QaXhlbHMgPSB1bml0ID09PSBcInB4XCIsXG4gICAgICB0b1BlcmNlbnQgPSB1bml0ID09PSBcIiVcIixcbiAgICAgIHB4LFxuICAgICAgcGFyZW50LFxuICAgICAgY2FjaGUsXG4gICAgICBpc1NWRztcblxuICBpZiAodW5pdCA9PT0gY3VyVW5pdCB8fCAhY3VyVmFsdWUgfHwgX25vbkNvbnZlcnRpYmxlVW5pdHNbdW5pdF0gfHwgX25vbkNvbnZlcnRpYmxlVW5pdHNbY3VyVW5pdF0pIHtcbiAgICByZXR1cm4gY3VyVmFsdWU7XG4gIH1cblxuICBjdXJVbml0ICE9PSBcInB4XCIgJiYgIXRvUGl4ZWxzICYmIChjdXJWYWx1ZSA9IF9jb252ZXJ0VG9Vbml0KHRhcmdldCwgcHJvcGVydHksIHZhbHVlLCBcInB4XCIpKTtcbiAgaXNTVkcgPSB0YXJnZXQuZ2V0Q1RNICYmIF9pc1NWRyh0YXJnZXQpO1xuXG4gIGlmICgodG9QZXJjZW50IHx8IGN1clVuaXQgPT09IFwiJVwiKSAmJiAoX3RyYW5zZm9ybVByb3BzW3Byb3BlcnR5XSB8fCB+cHJvcGVydHkuaW5kZXhPZihcImFkaXVzXCIpKSkge1xuICAgIHB4ID0gaXNTVkcgPyB0YXJnZXQuZ2V0QkJveCgpW2hvcml6b250YWwgPyBcIndpZHRoXCIgOiBcImhlaWdodFwiXSA6IHRhcmdldFttZWFzdXJlUHJvcGVydHldO1xuICAgIHJldHVybiBfcm91bmQodG9QZXJjZW50ID8gY3VyVmFsdWUgLyBweCAqIGFtb3VudCA6IGN1clZhbHVlIC8gMTAwICogcHgpO1xuICB9XG5cbiAgc3R5bGVbaG9yaXpvbnRhbCA/IFwid2lkdGhcIiA6IFwiaGVpZ2h0XCJdID0gYW1vdW50ICsgKHRvUGl4ZWxzID8gY3VyVW5pdCA6IHVuaXQpO1xuICBwYXJlbnQgPSB+cHJvcGVydHkuaW5kZXhPZihcImFkaXVzXCIpIHx8IHVuaXQgPT09IFwiZW1cIiAmJiB0YXJnZXQuYXBwZW5kQ2hpbGQgJiYgIWlzUm9vdFNWRyA/IHRhcmdldCA6IHRhcmdldC5wYXJlbnROb2RlO1xuXG4gIGlmIChpc1NWRykge1xuICAgIHBhcmVudCA9ICh0YXJnZXQub3duZXJTVkdFbGVtZW50IHx8IHt9KS5wYXJlbnROb2RlO1xuICB9XG5cbiAgaWYgKCFwYXJlbnQgfHwgcGFyZW50ID09PSBfZG9jIHx8ICFwYXJlbnQuYXBwZW5kQ2hpbGQpIHtcbiAgICBwYXJlbnQgPSBfZG9jLmJvZHk7XG4gIH1cblxuICBjYWNoZSA9IHBhcmVudC5fZ3NhcDtcblxuICBpZiAoY2FjaGUgJiYgdG9QZXJjZW50ICYmIGNhY2hlLndpZHRoICYmIGhvcml6b250YWwgJiYgY2FjaGUudGltZSA9PT0gX3RpY2tlci50aW1lICYmICFjYWNoZS51bmNhY2hlKSB7XG4gICAgcmV0dXJuIF9yb3VuZChjdXJWYWx1ZSAvIGNhY2hlLndpZHRoICogYW1vdW50KTtcbiAgfSBlbHNlIHtcbiAgICAodG9QZXJjZW50IHx8IGN1clVuaXQgPT09IFwiJVwiKSAmJiAhX25vblN0YW5kYXJkTGF5b3V0c1tfZ2V0Q29tcHV0ZWRQcm9wZXJ0eShwYXJlbnQsIFwiZGlzcGxheVwiKV0gJiYgKHN0eWxlLnBvc2l0aW9uID0gX2dldENvbXB1dGVkUHJvcGVydHkodGFyZ2V0LCBcInBvc2l0aW9uXCIpKTtcbiAgICBwYXJlbnQgPT09IHRhcmdldCAmJiAoc3R5bGUucG9zaXRpb24gPSBcInN0YXRpY1wiKTsgLy8gbGlrZSBmb3IgYm9yZGVyUmFkaXVzLCBpZiBpdCdzIGEgJSB3ZSBtdXN0IGhhdmUgaXQgcmVsYXRpdmUgdG8gdGhlIHRhcmdldCBpdHNlbGYgYnV0IHRoYXQgbWF5IG5vdCBoYXZlIHBvc2l0aW9uOiByZWxhdGl2ZSBvciBwb3NpdGlvbjogYWJzb2x1dGUgaW4gd2hpY2ggY2FzZSBpdCdkIGdvIHVwIHRoZSBjaGFpbiB1bnRpbCBpdCBmaW5kcyBpdHMgb2Zmc2V0UGFyZW50IChiYWQpLiBwb3NpdGlvbjogc3RhdGljIHByb3RlY3RzIGFnYWluc3QgdGhhdC5cblxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChfdGVtcERpdik7XG4gICAgcHggPSBfdGVtcERpdlttZWFzdXJlUHJvcGVydHldO1xuICAgIHBhcmVudC5yZW1vdmVDaGlsZChfdGVtcERpdik7XG4gICAgc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG5cbiAgICBpZiAoaG9yaXpvbnRhbCAmJiB0b1BlcmNlbnQpIHtcbiAgICAgIGNhY2hlID0gX2dldENhY2hlKHBhcmVudCk7XG4gICAgICBjYWNoZS50aW1lID0gX3RpY2tlci50aW1lO1xuICAgICAgY2FjaGUud2lkdGggPSBwYXJlbnRbbWVhc3VyZVByb3BlcnR5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gX3JvdW5kKHRvUGl4ZWxzID8gcHggKiBjdXJWYWx1ZSAvIGFtb3VudCA6IHB4ICYmIGN1clZhbHVlID8gYW1vdW50IC8gcHggKiBjdXJWYWx1ZSA6IDApO1xufSxcbiAgICBfZ2V0ID0gZnVuY3Rpb24gX2dldCh0YXJnZXQsIHByb3BlcnR5LCB1bml0LCB1bmNhY2hlKSB7XG4gIHZhciB2YWx1ZTtcbiAgX3BsdWdpbkluaXR0ZWQgfHwgX2luaXRDb3JlKCk7XG5cbiAgaWYgKHByb3BlcnR5IGluIF9wcm9wZXJ0eUFsaWFzZXMgJiYgcHJvcGVydHkgIT09IFwidHJhbnNmb3JtXCIpIHtcbiAgICBwcm9wZXJ0eSA9IF9wcm9wZXJ0eUFsaWFzZXNbcHJvcGVydHldO1xuXG4gICAgaWYgKH5wcm9wZXJ0eS5pbmRleE9mKFwiLFwiKSkge1xuICAgICAgcHJvcGVydHkgPSBwcm9wZXJ0eS5zcGxpdChcIixcIilbMF07XG4gICAgfVxuICB9XG5cbiAgaWYgKF90cmFuc2Zvcm1Qcm9wc1twcm9wZXJ0eV0gJiYgcHJvcGVydHkgIT09IFwidHJhbnNmb3JtXCIpIHtcbiAgICB2YWx1ZSA9IF9wYXJzZVRyYW5zZm9ybSh0YXJnZXQsIHVuY2FjaGUpO1xuICAgIHZhbHVlID0gcHJvcGVydHkgIT09IFwidHJhbnNmb3JtT3JpZ2luXCIgPyB2YWx1ZVtwcm9wZXJ0eV0gOiB2YWx1ZS5zdmcgPyB2YWx1ZS5vcmlnaW4gOiBfZmlyc3RUd29Pbmx5KF9nZXRDb21wdXRlZFByb3BlcnR5KHRhcmdldCwgX3RyYW5zZm9ybU9yaWdpblByb3ApKSArIFwiIFwiICsgdmFsdWUuek9yaWdpbiArIFwicHhcIjtcbiAgfSBlbHNlIHtcbiAgICB2YWx1ZSA9IHRhcmdldC5zdHlsZVtwcm9wZXJ0eV07XG5cbiAgICBpZiAoIXZhbHVlIHx8IHZhbHVlID09PSBcImF1dG9cIiB8fCB1bmNhY2hlIHx8IH4odmFsdWUgKyBcIlwiKS5pbmRleE9mKFwiY2FsYyhcIikpIHtcbiAgICAgIHZhbHVlID0gX3NwZWNpYWxQcm9wc1twcm9wZXJ0eV0gJiYgX3NwZWNpYWxQcm9wc1twcm9wZXJ0eV0odGFyZ2V0LCBwcm9wZXJ0eSwgdW5pdCkgfHwgX2dldENvbXB1dGVkUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSkgfHwgX2dldFByb3BlcnR5KHRhcmdldCwgcHJvcGVydHkpIHx8IChwcm9wZXJ0eSA9PT0gXCJvcGFjaXR5XCIgPyAxIDogMCk7IC8vIG5vdGU6IHNvbWUgYnJvd3NlcnMsIGxpa2UgRmlyZWZveCwgZG9uJ3QgcmVwb3J0IGJvcmRlclJhZGl1cyBjb3JyZWN0bHkhIEluc3RlYWQsIGl0IG9ubHkgcmVwb3J0cyBldmVyeSBjb3JuZXIgbGlrZSAgYm9yZGVyVG9wTGVmdFJhZGl1c1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB1bml0ICYmICF+KHZhbHVlICsgXCJcIikudHJpbSgpLmluZGV4T2YoXCIgXCIpID8gX2NvbnZlcnRUb1VuaXQodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUsIHVuaXQpICsgdW5pdCA6IHZhbHVlO1xufSxcbiAgICBfdHdlZW5Db21wbGV4Q1NTU3RyaW5nID0gZnVuY3Rpb24gX3R3ZWVuQ29tcGxleENTU1N0cmluZyh0YXJnZXQsIHByb3AsIHN0YXJ0LCBlbmQpIHtcbiAgLy8gbm90ZTogd2UgY2FsbCBfdHdlZW5Db21wbGV4Q1NTU3RyaW5nLmNhbGwocGx1Z2luSW5zdGFuY2UuLi4pIHRvIGVuc3VyZSB0aGF0IGl0J3Mgc2NvcGVkIHByb3Blcmx5LiBXZSBtYXkgY2FsbCBpdCBmcm9tIHdpdGhpbiBhIHBsdWdpbiB0b28sIHRodXMgXCJ0aGlzXCIgd291bGQgcmVmZXIgdG8gdGhlIHBsdWdpbi5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA9PT0gXCJub25lXCIpIHtcbiAgICAvLyBzb21lIGJyb3dzZXJzIGxpa2UgU2FmYXJpIGFjdHVhbGx5IFBSRUZFUiB0aGUgcHJlZml4ZWQgcHJvcGVydHkgYW5kIG1pcy1yZXBvcnQgdGhlIHVucHJlZml4ZWQgdmFsdWUgbGlrZSBjbGlwUGF0aCAoQlVHKS4gSW4gb3RoZXIgd29yZHMsIGV2ZW4gdGhvdWdoIGNsaXBQYXRoIGV4aXN0cyBpbiB0aGUgc3R5bGUgKFwiY2xpcFBhdGhcIiBpbiB0YXJnZXQuc3R5bGUpIGFuZCBpdCdzIHNldCBpbiB0aGUgQ1NTIHByb3Blcmx5IChhbG9uZyB3aXRoIC13ZWJraXQtY2xpcC1wYXRoKSwgU2FmYXJpIHJlcG9ydHMgY2xpcFBhdGggYXMgXCJub25lXCIgd2hlcmVhcyBXZWJraXRDbGlwUGF0aCByZXBvcnRzIGFjY3VyYXRlbHkgbGlrZSBcImVsbGlwc2UoMTAwJSAwJSBhdCA1MCUgMCUpXCIsIHNvIGluIHRoaXMgY2FzZSB3ZSBtdXN0IFNXSVRDSCB0byB1c2luZyB0aGUgcHJlZml4ZWQgcHJvcGVydHkgaW5zdGVhZC4gU2VlIGh0dHBzOi8vZ3JlZW5zb2NrLmNvbS9mb3J1bXMvdG9waWMvMTgzMTAtY2xpcHBhdGgtZG9lc250LXdvcmstb24taW9zL1xuICAgIHZhciBwID0gX2NoZWNrUHJvcFByZWZpeChwcm9wLCB0YXJnZXQsIDEpLFxuICAgICAgICBzID0gcCAmJiBfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSh0YXJnZXQsIHAsIDEpO1xuXG4gICAgaWYgKHMgJiYgcyAhPT0gc3RhcnQpIHtcbiAgICAgIHByb3AgPSBwO1xuICAgICAgc3RhcnQgPSBzO1xuICAgIH0gZWxzZSBpZiAocHJvcCA9PT0gXCJib3JkZXJDb2xvclwiKSB7XG4gICAgICBzdGFydCA9IF9nZXRDb21wdXRlZFByb3BlcnR5KHRhcmdldCwgXCJib3JkZXJUb3BDb2xvclwiKTsgLy8gRmlyZWZveCBidWc6IGFsd2F5cyByZXBvcnRzIFwiYm9yZGVyQ29sb3JcIiBhcyBcIlwiLCBzbyB3ZSBtdXN0IGZhbGwgYmFjayB0byBib3JkZXJUb3BDb2xvci4gU2VlIGh0dHBzOi8vZ3JlZW5zb2NrLmNvbS9mb3J1bXMvdG9waWMvMjQ1ODMtaG93LXRvLXJldHVybi1jb2xvcnMtdGhhdC1pLWhhZC1hZnRlci1yZXZlcnNlL1xuICAgIH1cbiAgfVxuXG4gIHZhciBwdCA9IG5ldyBQcm9wVHdlZW4odGhpcy5fcHQsIHRhcmdldC5zdHlsZSwgcHJvcCwgMCwgMSwgX3JlbmRlckNvbXBsZXhTdHJpbmcpLFxuICAgICAgaW5kZXggPSAwLFxuICAgICAgbWF0Y2hJbmRleCA9IDAsXG4gICAgICBhLFxuICAgICAgcmVzdWx0LFxuICAgICAgc3RhcnRWYWx1ZXMsXG4gICAgICBzdGFydE51bSxcbiAgICAgIGNvbG9yLFxuICAgICAgc3RhcnRWYWx1ZSxcbiAgICAgIGVuZFZhbHVlLFxuICAgICAgZW5kTnVtLFxuICAgICAgY2h1bmssXG4gICAgICBlbmRVbml0LFxuICAgICAgc3RhcnRVbml0LFxuICAgICAgZW5kVmFsdWVzO1xuICBwdC5iID0gc3RhcnQ7XG4gIHB0LmUgPSBlbmQ7XG4gIHN0YXJ0ICs9IFwiXCI7IC8vIGVuc3VyZSB2YWx1ZXMgYXJlIHN0cmluZ3NcblxuICBlbmQgKz0gXCJcIjtcblxuICBpZiAoZW5kID09PSBcImF1dG9cIikge1xuICAgIHRhcmdldC5zdHlsZVtwcm9wXSA9IGVuZDtcbiAgICBlbmQgPSBfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSh0YXJnZXQsIHByb3ApIHx8IGVuZDtcbiAgICB0YXJnZXQuc3R5bGVbcHJvcF0gPSBzdGFydDtcbiAgfVxuXG4gIGEgPSBbc3RhcnQsIGVuZF07XG5cbiAgX2NvbG9yU3RyaW5nRmlsdGVyKGEpOyAvLyBwYXNzIGFuIGFycmF5IHdpdGggdGhlIHN0YXJ0aW5nIGFuZCBlbmRpbmcgdmFsdWVzIGFuZCBsZXQgdGhlIGZpbHRlciBkbyB3aGF0ZXZlciBpdCBuZWVkcyB0byB0aGUgdmFsdWVzLiBJZiBjb2xvcnMgYXJlIGZvdW5kLCBpdCByZXR1cm5zIHRydWUgYW5kIHRoZW4gd2UgbXVzdCBtYXRjaCB3aGVyZSB0aGUgY29sb3Igc2hvd3MgdXAgb3JkZXItd2lzZSBiZWNhdXNlIGZvciB0aGluZ3MgbGlrZSBib3hTaGFkb3csIHNvbWV0aW1lcyB0aGUgYnJvd3NlciBwcm92aWRlcyB0aGUgY29tcHV0ZWQgdmFsdWVzIHdpdGggdGhlIGNvbG9yIEZJUlNULCBidXQgdGhlIHVzZXIgcHJvdmlkZXMgaXQgd2l0aCB0aGUgY29sb3IgTEFTVCwgc28gZmxpcCB0aGVtIGlmIG5lY2Vzc2FyeS4gU2FtZSBmb3IgZHJvcC1zaGFkb3coKS5cblxuXG4gIHN0YXJ0ID0gYVswXTtcbiAgZW5kID0gYVsxXTtcbiAgc3RhcnRWYWx1ZXMgPSBzdGFydC5tYXRjaChfbnVtV2l0aFVuaXRFeHApIHx8IFtdO1xuICBlbmRWYWx1ZXMgPSBlbmQubWF0Y2goX251bVdpdGhVbml0RXhwKSB8fCBbXTtcblxuICBpZiAoZW5kVmFsdWVzLmxlbmd0aCkge1xuICAgIHdoaWxlIChyZXN1bHQgPSBfbnVtV2l0aFVuaXRFeHAuZXhlYyhlbmQpKSB7XG4gICAgICBlbmRWYWx1ZSA9IHJlc3VsdFswXTtcbiAgICAgIGNodW5rID0gZW5kLnN1YnN0cmluZyhpbmRleCwgcmVzdWx0LmluZGV4KTtcblxuICAgICAgaWYgKGNvbG9yKSB7XG4gICAgICAgIGNvbG9yID0gKGNvbG9yICsgMSkgJSA1O1xuICAgICAgfSBlbHNlIGlmIChjaHVuay5zdWJzdHIoLTUpID09PSBcInJnYmEoXCIgfHwgY2h1bmsuc3Vic3RyKC01KSA9PT0gXCJoc2xhKFwiKSB7XG4gICAgICAgIGNvbG9yID0gMTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVuZFZhbHVlICE9PSAoc3RhcnRWYWx1ZSA9IHN0YXJ0VmFsdWVzW21hdGNoSW5kZXgrK10gfHwgXCJcIikpIHtcbiAgICAgICAgc3RhcnROdW0gPSBwYXJzZUZsb2F0KHN0YXJ0VmFsdWUpIHx8IDA7XG4gICAgICAgIHN0YXJ0VW5pdCA9IHN0YXJ0VmFsdWUuc3Vic3RyKChzdGFydE51bSArIFwiXCIpLmxlbmd0aCk7XG4gICAgICAgIGVuZFZhbHVlLmNoYXJBdCgxKSA9PT0gXCI9XCIgJiYgKGVuZFZhbHVlID0gX3BhcnNlUmVsYXRpdmUoc3RhcnROdW0sIGVuZFZhbHVlKSArIHN0YXJ0VW5pdCk7XG4gICAgICAgIGVuZE51bSA9IHBhcnNlRmxvYXQoZW5kVmFsdWUpO1xuICAgICAgICBlbmRVbml0ID0gZW5kVmFsdWUuc3Vic3RyKChlbmROdW0gKyBcIlwiKS5sZW5ndGgpO1xuICAgICAgICBpbmRleCA9IF9udW1XaXRoVW5pdEV4cC5sYXN0SW5kZXggLSBlbmRVbml0Lmxlbmd0aDtcblxuICAgICAgICBpZiAoIWVuZFVuaXQpIHtcbiAgICAgICAgICAvL2lmIHNvbWV0aGluZyBsaWtlIFwicGVyc3BlY3RpdmU6MzAwXCIgaXMgcGFzc2VkIGluIGFuZCB3ZSBtdXN0IGFkZCBhIHVuaXQgdG8gdGhlIGVuZFxuICAgICAgICAgIGVuZFVuaXQgPSBlbmRVbml0IHx8IF9jb25maWcudW5pdHNbcHJvcF0gfHwgc3RhcnRVbml0O1xuXG4gICAgICAgICAgaWYgKGluZGV4ID09PSBlbmQubGVuZ3RoKSB7XG4gICAgICAgICAgICBlbmQgKz0gZW5kVW5pdDtcbiAgICAgICAgICAgIHB0LmUgKz0gZW5kVW5pdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhcnRVbml0ICE9PSBlbmRVbml0KSB7XG4gICAgICAgICAgc3RhcnROdW0gPSBfY29udmVydFRvVW5pdCh0YXJnZXQsIHByb3AsIHN0YXJ0VmFsdWUsIGVuZFVuaXQpIHx8IDA7XG4gICAgICAgIH0gLy8gdGhlc2UgbmVzdGVkIFByb3BUd2VlbnMgYXJlIGhhbmRsZWQgaW4gYSBzcGVjaWFsIHdheSAtIHdlJ2xsIG5ldmVyIGFjdHVhbGx5IGNhbGwgYSByZW5kZXIgb3Igc2V0dGVyIG1ldGhvZCBvbiB0aGVtLiBXZSdsbCBqdXN0IGxvb3AgdGhyb3VnaCB0aGVtIGluIHRoZSBwYXJlbnQgY29tcGxleCBzdHJpbmcgUHJvcFR3ZWVuJ3MgcmVuZGVyIG1ldGhvZC5cblxuXG4gICAgICAgIHB0Ll9wdCA9IHtcbiAgICAgICAgICBfbmV4dDogcHQuX3B0LFxuICAgICAgICAgIHA6IGNodW5rIHx8IG1hdGNoSW5kZXggPT09IDEgPyBjaHVuayA6IFwiLFwiLFxuICAgICAgICAgIC8vbm90ZTogU1ZHIHNwZWMgYWxsb3dzIG9taXNzaW9uIG9mIGNvbW1hL3NwYWNlIHdoZW4gYSBuZWdhdGl2ZSBzaWduIGlzIHdlZGdlZCBiZXR3ZWVuIHR3byBudW1iZXJzLCBsaWtlIDIuNS01LjMgaW5zdGVhZCBvZiAyLjUsLTUuMyBidXQgd2hlbiB0d2VlbmluZywgdGhlIG5lZ2F0aXZlIHZhbHVlIG1heSBzd2l0Y2ggdG8gcG9zaXRpdmUsIHNvIHdlIGluc2VydCB0aGUgY29tbWEganVzdCBpbiBjYXNlLlxuICAgICAgICAgIHM6IHN0YXJ0TnVtLFxuICAgICAgICAgIGM6IGVuZE51bSAtIHN0YXJ0TnVtLFxuICAgICAgICAgIG06IGNvbG9yICYmIGNvbG9yIDwgNCB8fCBwcm9wID09PSBcInpJbmRleFwiID8gTWF0aC5yb3VuZCA6IDBcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwdC5jID0gaW5kZXggPCBlbmQubGVuZ3RoID8gZW5kLnN1YnN0cmluZyhpbmRleCwgZW5kLmxlbmd0aCkgOiBcIlwiOyAvL3dlIHVzZSB0aGUgXCJjXCIgb2YgdGhlIFByb3BUd2VlbiB0byBzdG9yZSB0aGUgZmluYWwgcGFydCBvZiB0aGUgc3RyaW5nIChhZnRlciB0aGUgbGFzdCBudW1iZXIpXG4gIH0gZWxzZSB7XG4gICAgcHQuciA9IHByb3AgPT09IFwiZGlzcGxheVwiICYmIGVuZCA9PT0gXCJub25lXCIgPyBfcmVuZGVyTm9uVHdlZW5pbmdWYWx1ZU9ubHlBdEVuZCA6IF9yZW5kZXJOb25Ud2VlbmluZ1ZhbHVlO1xuICB9XG5cbiAgX3JlbEV4cC50ZXN0KGVuZCkgJiYgKHB0LmUgPSAwKTsgLy9pZiB0aGUgZW5kIHN0cmluZyBjb250YWlucyByZWxhdGl2ZSB2YWx1ZXMgb3IgZHluYW1pYyByYW5kb20oLi4uKSB2YWx1ZXMsIGRlbGV0ZSB0aGUgZW5kIGl0IHNvIHRoYXQgb24gdGhlIGZpbmFsIHJlbmRlciB3ZSBkb24ndCBhY3R1YWxseSBzZXQgaXQgdG8gdGhlIHN0cmluZyB3aXRoICs9IG9yIC09IGNoYXJhY3RlcnMgKGZvcmNlcyBpdCB0byB1c2UgdGhlIGNhbGN1bGF0ZWQgdmFsdWUpLlxuXG4gIHRoaXMuX3B0ID0gcHQ7IC8vc3RhcnQgdGhlIGxpbmtlZCBsaXN0IHdpdGggdGhpcyBuZXcgUHJvcFR3ZWVuLiBSZW1lbWJlciwgd2UgY2FsbCBfdHdlZW5Db21wbGV4Q1NTU3RyaW5nLmNhbGwocGx1Z2luSW5zdGFuY2UuLi4pIHRvIGVuc3VyZSB0aGF0IGl0J3Mgc2NvcGVkIHByb3Blcmx5LiBXZSBtYXkgY2FsbCBpdCBmcm9tIHdpdGhpbiBhbm90aGVyIHBsdWdpbiB0b28sIHRodXMgXCJ0aGlzXCIgd291bGQgcmVmZXIgdG8gdGhlIHBsdWdpbi5cblxuICByZXR1cm4gcHQ7XG59LFxuICAgIF9rZXl3b3JkVG9QZXJjZW50ID0ge1xuICB0b3A6IFwiMCVcIixcbiAgYm90dG9tOiBcIjEwMCVcIixcbiAgbGVmdDogXCIwJVwiLFxuICByaWdodDogXCIxMDAlXCIsXG4gIGNlbnRlcjogXCI1MCVcIlxufSxcbiAgICBfY29udmVydEtleXdvcmRzVG9QZXJjZW50YWdlcyA9IGZ1bmN0aW9uIF9jb252ZXJ0S2V5d29yZHNUb1BlcmNlbnRhZ2VzKHZhbHVlKSB7XG4gIHZhciBzcGxpdCA9IHZhbHVlLnNwbGl0KFwiIFwiKSxcbiAgICAgIHggPSBzcGxpdFswXSxcbiAgICAgIHkgPSBzcGxpdFsxXSB8fCBcIjUwJVwiO1xuXG4gIGlmICh4ID09PSBcInRvcFwiIHx8IHggPT09IFwiYm90dG9tXCIgfHwgeSA9PT0gXCJsZWZ0XCIgfHwgeSA9PT0gXCJyaWdodFwiKSB7XG4gICAgLy90aGUgdXNlciBwcm92aWRlZCB0aGVtIGluIHRoZSB3cm9uZyBvcmRlciwgc28gZmxpcCB0aGVtXG4gICAgdmFsdWUgPSB4O1xuICAgIHggPSB5O1xuICAgIHkgPSB2YWx1ZTtcbiAgfVxuXG4gIHNwbGl0WzBdID0gX2tleXdvcmRUb1BlcmNlbnRbeF0gfHwgeDtcbiAgc3BsaXRbMV0gPSBfa2V5d29yZFRvUGVyY2VudFt5XSB8fCB5O1xuICByZXR1cm4gc3BsaXQuam9pbihcIiBcIik7XG59LFxuICAgIF9yZW5kZXJDbGVhclByb3BzID0gZnVuY3Rpb24gX3JlbmRlckNsZWFyUHJvcHMocmF0aW8sIGRhdGEpIHtcbiAgaWYgKGRhdGEudHdlZW4gJiYgZGF0YS50d2Vlbi5fdGltZSA9PT0gZGF0YS50d2Vlbi5fZHVyKSB7XG4gICAgdmFyIHRhcmdldCA9IGRhdGEudCxcbiAgICAgICAgc3R5bGUgPSB0YXJnZXQuc3R5bGUsXG4gICAgICAgIHByb3BzID0gZGF0YS51LFxuICAgICAgICBjYWNoZSA9IHRhcmdldC5fZ3NhcCxcbiAgICAgICAgcHJvcCxcbiAgICAgICAgY2xlYXJUcmFuc2Zvcm1zLFxuICAgICAgICBpO1xuXG4gICAgaWYgKHByb3BzID09PSBcImFsbFwiIHx8IHByb3BzID09PSB0cnVlKSB7XG4gICAgICBzdHlsZS5jc3NUZXh0ID0gXCJcIjtcbiAgICAgIGNsZWFyVHJhbnNmb3JtcyA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb3BzID0gcHJvcHMuc3BsaXQoXCIsXCIpO1xuICAgICAgaSA9IHByb3BzLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKC0taSA+IC0xKSB7XG4gICAgICAgIHByb3AgPSBwcm9wc1tpXTtcblxuICAgICAgICBpZiAoX3RyYW5zZm9ybVByb3BzW3Byb3BdKSB7XG4gICAgICAgICAgY2xlYXJUcmFuc2Zvcm1zID0gMTtcbiAgICAgICAgICBwcm9wID0gcHJvcCA9PT0gXCJ0cmFuc2Zvcm1PcmlnaW5cIiA/IF90cmFuc2Zvcm1PcmlnaW5Qcm9wIDogX3RyYW5zZm9ybVByb3A7XG4gICAgICAgIH1cblxuICAgICAgICBfcmVtb3ZlUHJvcGVydHkodGFyZ2V0LCBwcm9wKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2xlYXJUcmFuc2Zvcm1zKSB7XG4gICAgICBfcmVtb3ZlUHJvcGVydHkodGFyZ2V0LCBfdHJhbnNmb3JtUHJvcCk7XG5cbiAgICAgIGlmIChjYWNoZSkge1xuICAgICAgICBjYWNoZS5zdmcgJiYgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShcInRyYW5zZm9ybVwiKTtcblxuICAgICAgICBfcGFyc2VUcmFuc2Zvcm0odGFyZ2V0LCAxKTsgLy8gZm9yY2UgYWxsIHRoZSBjYWNoZWQgdmFsdWVzIGJhY2sgdG8gXCJub3JtYWxcIi9pZGVudGl0eSwgb3RoZXJ3aXNlIGlmIHRoZXJlJ3MgYW5vdGhlciB0d2VlbiB0aGF0J3MgYWxyZWFkeSBzZXQgdG8gcmVuZGVyIHRyYW5zZm9ybXMgb24gdGhpcyBlbGVtZW50LCBpdCBjb3VsZCBkaXNwbGF5IHRoZSB3cm9uZyB2YWx1ZXMuXG5cblxuICAgICAgICBjYWNoZS51bmNhY2hlID0gMTtcblxuICAgICAgICBfcmVtb3ZlSW5kZXBlbmRlbnRUcmFuc2Zvcm1zKHN0eWxlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0sXG4gICAgLy8gbm90ZTogc3BlY2lhbFByb3BzIHNob3VsZCByZXR1cm4gMSBpZiAoYW5kIG9ubHkgaWYpIHRoZXkgaGF2ZSBhIG5vbi16ZXJvIHByaW9yaXR5LiBJdCBpbmRpY2F0ZXMgd2UgbmVlZCB0byBzb3J0IHRoZSBsaW5rZWQgbGlzdC5cbl9zcGVjaWFsUHJvcHMgPSB7XG4gIGNsZWFyUHJvcHM6IGZ1bmN0aW9uIGNsZWFyUHJvcHMocGx1Z2luLCB0YXJnZXQsIHByb3BlcnR5LCBlbmRWYWx1ZSwgdHdlZW4pIHtcbiAgICBpZiAodHdlZW4uZGF0YSAhPT0gXCJpc0Zyb21TdGFydFwiKSB7XG4gICAgICB2YXIgcHQgPSBwbHVnaW4uX3B0ID0gbmV3IFByb3BUd2VlbihwbHVnaW4uX3B0LCB0YXJnZXQsIHByb3BlcnR5LCAwLCAwLCBfcmVuZGVyQ2xlYXJQcm9wcyk7XG4gICAgICBwdC51ID0gZW5kVmFsdWU7XG4gICAgICBwdC5wciA9IC0xMDtcbiAgICAgIHB0LnR3ZWVuID0gdHdlZW47XG5cbiAgICAgIHBsdWdpbi5fcHJvcHMucHVzaChwcm9wZXJ0eSk7XG5cbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgfVxuICAvKiBjbGFzc05hbWUgZmVhdHVyZSAoYWJvdXQgMC40a2IgZ3ppcHBlZCkuXG4gICwgY2xhc3NOYW1lKHBsdWdpbiwgdGFyZ2V0LCBwcm9wZXJ0eSwgZW5kVmFsdWUsIHR3ZWVuKSB7XG4gIFx0bGV0IF9yZW5kZXJDbGFzc05hbWUgPSAocmF0aW8sIGRhdGEpID0+IHtcbiAgXHRcdFx0ZGF0YS5jc3MucmVuZGVyKHJhdGlvLCBkYXRhLmNzcyk7XG4gIFx0XHRcdGlmICghcmF0aW8gfHwgcmF0aW8gPT09IDEpIHtcbiAgXHRcdFx0XHRsZXQgaW5saW5lID0gZGF0YS5ybXYsXG4gIFx0XHRcdFx0XHR0YXJnZXQgPSBkYXRhLnQsXG4gIFx0XHRcdFx0XHRwO1xuICBcdFx0XHRcdHRhcmdldC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCByYXRpbyA/IGRhdGEuZSA6IGRhdGEuYik7XG4gIFx0XHRcdFx0Zm9yIChwIGluIGlubGluZSkge1xuICBcdFx0XHRcdFx0X3JlbW92ZVByb3BlcnR5KHRhcmdldCwgcCk7XG4gIFx0XHRcdFx0fVxuICBcdFx0XHR9XG4gIFx0XHR9LFxuICBcdFx0X2dldEFsbFN0eWxlcyA9ICh0YXJnZXQpID0+IHtcbiAgXHRcdFx0bGV0IHN0eWxlcyA9IHt9LFxuICBcdFx0XHRcdGNvbXB1dGVkID0gZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXQpLFxuICBcdFx0XHRcdHA7XG4gIFx0XHRcdGZvciAocCBpbiBjb21wdXRlZCkge1xuICBcdFx0XHRcdGlmIChpc05hTihwKSAmJiBwICE9PSBcImNzc1RleHRcIiAmJiBwICE9PSBcImxlbmd0aFwiKSB7XG4gIFx0XHRcdFx0XHRzdHlsZXNbcF0gPSBjb21wdXRlZFtwXTtcbiAgXHRcdFx0XHR9XG4gIFx0XHRcdH1cbiAgXHRcdFx0X3NldERlZmF1bHRzKHN0eWxlcywgX3BhcnNlVHJhbnNmb3JtKHRhcmdldCwgMSkpO1xuICBcdFx0XHRyZXR1cm4gc3R5bGVzO1xuICBcdFx0fSxcbiAgXHRcdHN0YXJ0Q2xhc3NMaXN0ID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcImNsYXNzXCIpLFxuICBcdFx0c3R5bGUgPSB0YXJnZXQuc3R5bGUsXG4gIFx0XHRjc3NUZXh0ID0gc3R5bGUuY3NzVGV4dCxcbiAgXHRcdGNhY2hlID0gdGFyZ2V0Ll9nc2FwLFxuICBcdFx0Y2xhc3NQVCA9IGNhY2hlLmNsYXNzUFQsXG4gIFx0XHRpbmxpbmVUb1JlbW92ZUF0RW5kID0ge30sXG4gIFx0XHRkYXRhID0ge3Q6dGFyZ2V0LCBwbHVnaW46cGx1Z2luLCBybXY6aW5saW5lVG9SZW1vdmVBdEVuZCwgYjpzdGFydENsYXNzTGlzdCwgZTooZW5kVmFsdWUuY2hhckF0KDEpICE9PSBcIj1cIikgPyBlbmRWYWx1ZSA6IHN0YXJ0Q2xhc3NMaXN0LnJlcGxhY2UobmV3IFJlZ0V4cChcIig/OlxcXFxzfF4pXCIgKyBlbmRWYWx1ZS5zdWJzdHIoMikgKyBcIig/IVtcXFxcdy1dKVwiKSwgXCJcIikgKyAoKGVuZFZhbHVlLmNoYXJBdCgwKSA9PT0gXCIrXCIpID8gXCIgXCIgKyBlbmRWYWx1ZS5zdWJzdHIoMikgOiBcIlwiKX0sXG4gIFx0XHRjaGFuZ2luZ1ZhcnMgPSB7fSxcbiAgXHRcdHN0YXJ0VmFycyA9IF9nZXRBbGxTdHlsZXModGFyZ2V0KSxcbiAgXHRcdHRyYW5zZm9ybVJlbGF0ZWQgPSAvKHRyYW5zZm9ybXxwZXJzcGVjdGl2ZSkvaSxcbiAgXHRcdGVuZFZhcnMsIHA7XG4gIFx0aWYgKGNsYXNzUFQpIHtcbiAgXHRcdGNsYXNzUFQucigxLCBjbGFzc1BULmQpO1xuICBcdFx0X3JlbW92ZUxpbmtlZExpc3RJdGVtKGNsYXNzUFQuZC5wbHVnaW4sIGNsYXNzUFQsIFwiX3B0XCIpO1xuICBcdH1cbiAgXHR0YXJnZXQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgZGF0YS5lKTtcbiAgXHRlbmRWYXJzID0gX2dldEFsbFN0eWxlcyh0YXJnZXQsIHRydWUpO1xuICBcdHRhcmdldC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBzdGFydENsYXNzTGlzdCk7XG4gIFx0Zm9yIChwIGluIGVuZFZhcnMpIHtcbiAgXHRcdGlmIChlbmRWYXJzW3BdICE9PSBzdGFydFZhcnNbcF0gJiYgIXRyYW5zZm9ybVJlbGF0ZWQudGVzdChwKSkge1xuICBcdFx0XHRjaGFuZ2luZ1ZhcnNbcF0gPSBlbmRWYXJzW3BdO1xuICBcdFx0XHRpZiAoIXN0eWxlW3BdICYmIHN0eWxlW3BdICE9PSBcIjBcIikge1xuICBcdFx0XHRcdGlubGluZVRvUmVtb3ZlQXRFbmRbcF0gPSAxO1xuICBcdFx0XHR9XG4gIFx0XHR9XG4gIFx0fVxuICBcdGNhY2hlLmNsYXNzUFQgPSBwbHVnaW4uX3B0ID0gbmV3IFByb3BUd2VlbihwbHVnaW4uX3B0LCB0YXJnZXQsIFwiY2xhc3NOYW1lXCIsIDAsIDAsIF9yZW5kZXJDbGFzc05hbWUsIGRhdGEsIDAsIC0xMSk7XG4gIFx0aWYgKHN0eWxlLmNzc1RleHQgIT09IGNzc1RleHQpIHsgLy9vbmx5IGFwcGx5IGlmIHRoaW5ncyBjaGFuZ2UuIE90aGVyd2lzZSwgaW4gY2FzZXMgbGlrZSBhIGJhY2tncm91bmQtaW1hZ2UgdGhhdCdzIHB1bGxlZCBkeW5hbWljYWxseSwgaXQgY291bGQgY2F1c2UgYSByZWZyZXNoLiBTZWUgaHR0cHM6Ly9ncmVlbnNvY2suY29tL2ZvcnVtcy90b3BpYy8yMDM2OC1wb3NzaWJsZS1nc2FwLWJ1Zy1zd2l0Y2hpbmctY2xhc3NuYW1lcy1pbi1jaHJvbWUvLlxuICBcdFx0c3R5bGUuY3NzVGV4dCA9IGNzc1RleHQ7IC8vd2UgcmVjb3JkZWQgY3NzVGV4dCBiZWZvcmUgd2Ugc3dhcHBlZCBjbGFzc2VzIGFuZCByYW4gX2dldEFsbFN0eWxlcygpIGJlY2F1c2UgaW4gY2FzZXMgd2hlbiBhIGNsYXNzTmFtZSB0d2VlbiBpcyBvdmVyd3JpdHRlbiwgd2UgcmVtb3ZlIGFsbCB0aGUgcmVsYXRlZCB0d2VlbmluZyBwcm9wZXJ0aWVzIGZyb20gdGhhdCBjbGFzcyBjaGFuZ2UgKG90aGVyd2lzZSBjbGFzcy1zcGVjaWZpYyBzdHVmZiBjYW4ndCBvdmVycmlkZSBwcm9wZXJ0aWVzIHdlJ3ZlIGRpcmVjdGx5IHNldCBvbiB0aGUgdGFyZ2V0J3Mgc3R5bGUgb2JqZWN0IGR1ZSB0byBzcGVjaWZpY2l0eSkuXG4gIFx0fVxuICBcdF9wYXJzZVRyYW5zZm9ybSh0YXJnZXQsIHRydWUpOyAvL3RvIGNsZWFyIHRoZSBjYWNoaW5nIG9mIHRyYW5zZm9ybXNcbiAgXHRkYXRhLmNzcyA9IG5ldyBnc2FwLnBsdWdpbnMuY3NzKCk7XG4gIFx0ZGF0YS5jc3MuaW5pdCh0YXJnZXQsIGNoYW5naW5nVmFycywgdHdlZW4pO1xuICBcdHBsdWdpbi5fcHJvcHMucHVzaCguLi5kYXRhLmNzcy5fcHJvcHMpO1xuICBcdHJldHVybiAxO1xuICB9XG4gICovXG5cbn0sXG5cbi8qXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVFJBTlNGT1JNU1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuX2lkZW50aXR5MkRNYXRyaXggPSBbMSwgMCwgMCwgMSwgMCwgMF0sXG4gICAgX3JvdGF0aW9uYWxQcm9wZXJ0aWVzID0ge30sXG4gICAgX2lzTnVsbFRyYW5zZm9ybSA9IGZ1bmN0aW9uIF9pc051bGxUcmFuc2Zvcm0odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBcIm1hdHJpeCgxLCAwLCAwLCAxLCAwLCAwKVwiIHx8IHZhbHVlID09PSBcIm5vbmVcIiB8fCAhdmFsdWU7XG59LFxuICAgIF9nZXRDb21wdXRlZFRyYW5zZm9ybU1hdHJpeEFzQXJyYXkgPSBmdW5jdGlvbiBfZ2V0Q29tcHV0ZWRUcmFuc2Zvcm1NYXRyaXhBc0FycmF5KHRhcmdldCkge1xuICB2YXIgbWF0cml4U3RyaW5nID0gX2dldENvbXB1dGVkUHJvcGVydHkodGFyZ2V0LCBfdHJhbnNmb3JtUHJvcCk7XG5cbiAgcmV0dXJuIF9pc051bGxUcmFuc2Zvcm0obWF0cml4U3RyaW5nKSA/IF9pZGVudGl0eTJETWF0cml4IDogbWF0cml4U3RyaW5nLnN1YnN0cig3KS5tYXRjaChfbnVtRXhwKS5tYXAoX3JvdW5kKTtcbn0sXG4gICAgX2dldE1hdHJpeCA9IGZ1bmN0aW9uIF9nZXRNYXRyaXgodGFyZ2V0LCBmb3JjZTJEKSB7XG4gIHZhciBjYWNoZSA9IHRhcmdldC5fZ3NhcCB8fCBfZ2V0Q2FjaGUodGFyZ2V0KSxcbiAgICAgIHN0eWxlID0gdGFyZ2V0LnN0eWxlLFxuICAgICAgbWF0cml4ID0gX2dldENvbXB1dGVkVHJhbnNmb3JtTWF0cml4QXNBcnJheSh0YXJnZXQpLFxuICAgICAgcGFyZW50LFxuICAgICAgbmV4dFNpYmxpbmcsXG4gICAgICB0ZW1wLFxuICAgICAgYWRkZWRUb0RPTTtcblxuICBpZiAoY2FjaGUuc3ZnICYmIHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIikpIHtcbiAgICB0ZW1wID0gdGFyZ2V0LnRyYW5zZm9ybS5iYXNlVmFsLmNvbnNvbGlkYXRlKCkubWF0cml4OyAvL2Vuc3VyZXMgdGhhdCBldmVuIGNvbXBsZXggdmFsdWVzIGxpa2UgXCJ0cmFuc2xhdGUoNTAsNjApIHJvdGF0ZSgxMzUsMCwwKVwiIGFyZSBwYXJzZWQgYmVjYXVzZSBpdCBtYXNoZXMgaXQgaW50byBhIG1hdHJpeC5cblxuICAgIG1hdHJpeCA9IFt0ZW1wLmEsIHRlbXAuYiwgdGVtcC5jLCB0ZW1wLmQsIHRlbXAuZSwgdGVtcC5mXTtcbiAgICByZXR1cm4gbWF0cml4LmpvaW4oXCIsXCIpID09PSBcIjEsMCwwLDEsMCwwXCIgPyBfaWRlbnRpdHkyRE1hdHJpeCA6IG1hdHJpeDtcbiAgfSBlbHNlIGlmIChtYXRyaXggPT09IF9pZGVudGl0eTJETWF0cml4ICYmICF0YXJnZXQub2Zmc2V0UGFyZW50ICYmIHRhcmdldCAhPT0gX2RvY0VsZW1lbnQgJiYgIWNhY2hlLnN2Zykge1xuICAgIC8vbm90ZTogaWYgb2Zmc2V0UGFyZW50IGlzIG51bGwsIHRoYXQgbWVhbnMgdGhlIGVsZW1lbnQgaXNuJ3QgaW4gdGhlIG5vcm1hbCBkb2N1bWVudCBmbG93LCBsaWtlIGlmIGl0IGhhcyBkaXNwbGF5Om5vbmUgb3Igb25lIG9mIGl0cyBhbmNlc3RvcnMgaGFzIGRpc3BsYXk6bm9uZSkuIEZpcmVmb3ggcmV0dXJucyBudWxsIGZvciBnZXRDb21wdXRlZFN0eWxlKCkgaWYgdGhlIGVsZW1lbnQgaXMgaW4gYW4gaWZyYW1lIHRoYXQgaGFzIGRpc3BsYXk6bm9uZS4gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NTQ4Mzk3XG4gICAgLy9icm93c2VycyBkb24ndCByZXBvcnQgdHJhbnNmb3JtcyBhY2N1cmF0ZWx5IHVubGVzcyB0aGUgZWxlbWVudCBpcyBpbiB0aGUgRE9NIGFuZCBoYXMgYSBkaXNwbGF5IHZhbHVlIHRoYXQncyBub3QgXCJub25lXCIuIEZpcmVmb3ggYW5kIE1pY3Jvc29mdCBicm93c2VycyBoYXZlIGEgcGFydGlhbCBidWcgd2hlcmUgdGhleSdsbCByZXBvcnQgdHJhbnNmb3JtcyBldmVuIGlmIGRpc3BsYXk6bm9uZSBCVVQgbm90IGFueSBwZXJjZW50YWdlLWJhc2VkIHZhbHVlcyBsaWtlIHRyYW5zbGF0ZSgtNTAlLCA4cHgpIHdpbGwgYmUgcmVwb3J0ZWQgYXMgaWYgaXQncyB0cmFuc2xhdGUoMCwgOHB4KS5cbiAgICB0ZW1wID0gc3R5bGUuZGlzcGxheTtcbiAgICBzdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIHBhcmVudCA9IHRhcmdldC5wYXJlbnROb2RlO1xuXG4gICAgaWYgKCFwYXJlbnQgfHwgIXRhcmdldC5vZmZzZXRQYXJlbnQpIHtcbiAgICAgIC8vIG5vdGU6IGluIDMuMy4wIHdlIHN3aXRjaGVkIHRhcmdldC5vZmZzZXRQYXJlbnQgdG8gX2RvYy5ib2R5LmNvbnRhaW5zKHRhcmdldCkgdG8gYXZvaWQgW3NvbWV0aW1lcyB1bm5lY2Vzc2FyeV0gTXV0YXRpb25PYnNlcnZlciBjYWxscyBidXQgdGhhdCB3YXNuJ3QgYWRlcXVhdGUgYmVjYXVzZSB0aGVyZSBhcmUgZWRnZSBjYXNlcyB3aGVyZSBuZXN0ZWQgcG9zaXRpb246IGZpeGVkIGVsZW1lbnRzIG5lZWQgdG8gZ2V0IHJlcGFyZW50ZWQgdG8gYWNjdXJhdGVseSBzZW5zZSB0cmFuc2Zvcm1zLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2dyZWVuc29jay9HU0FQL2lzc3Vlcy8zODggYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9ncmVlbnNvY2svR1NBUC9pc3N1ZXMvMzc1XG4gICAgICBhZGRlZFRvRE9NID0gMTsgLy9mbGFnXG5cbiAgICAgIG5leHRTaWJsaW5nID0gdGFyZ2V0Lm5leHRFbGVtZW50U2libGluZztcblxuICAgICAgX2RvY0VsZW1lbnQuYXBwZW5kQ2hpbGQodGFyZ2V0KTsgLy93ZSBtdXN0IGFkZCBpdCB0byB0aGUgRE9NIGluIG9yZGVyIHRvIGdldCB2YWx1ZXMgcHJvcGVybHlcblxuICAgIH1cblxuICAgIG1hdHJpeCA9IF9nZXRDb21wdXRlZFRyYW5zZm9ybU1hdHJpeEFzQXJyYXkodGFyZ2V0KTtcbiAgICB0ZW1wID8gc3R5bGUuZGlzcGxheSA9IHRlbXAgOiBfcmVtb3ZlUHJvcGVydHkodGFyZ2V0LCBcImRpc3BsYXlcIik7XG5cbiAgICBpZiAoYWRkZWRUb0RPTSkge1xuICAgICAgbmV4dFNpYmxpbmcgPyBwYXJlbnQuaW5zZXJ0QmVmb3JlKHRhcmdldCwgbmV4dFNpYmxpbmcpIDogcGFyZW50ID8gcGFyZW50LmFwcGVuZENoaWxkKHRhcmdldCkgOiBfZG9jRWxlbWVudC5yZW1vdmVDaGlsZCh0YXJnZXQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmb3JjZTJEICYmIG1hdHJpeC5sZW5ndGggPiA2ID8gW21hdHJpeFswXSwgbWF0cml4WzFdLCBtYXRyaXhbNF0sIG1hdHJpeFs1XSwgbWF0cml4WzEyXSwgbWF0cml4WzEzXV0gOiBtYXRyaXg7XG59LFxuICAgIF9hcHBseVNWR09yaWdpbiA9IGZ1bmN0aW9uIF9hcHBseVNWR09yaWdpbih0YXJnZXQsIG9yaWdpbiwgb3JpZ2luSXNBYnNvbHV0ZSwgc21vb3RoLCBtYXRyaXhBcnJheSwgcGx1Z2luVG9BZGRQcm9wVHdlZW5zVG8pIHtcbiAgdmFyIGNhY2hlID0gdGFyZ2V0Ll9nc2FwLFxuICAgICAgbWF0cml4ID0gbWF0cml4QXJyYXkgfHwgX2dldE1hdHJpeCh0YXJnZXQsIHRydWUpLFxuICAgICAgeE9yaWdpbk9sZCA9IGNhY2hlLnhPcmlnaW4gfHwgMCxcbiAgICAgIHlPcmlnaW5PbGQgPSBjYWNoZS55T3JpZ2luIHx8IDAsXG4gICAgICB4T2Zmc2V0T2xkID0gY2FjaGUueE9mZnNldCB8fCAwLFxuICAgICAgeU9mZnNldE9sZCA9IGNhY2hlLnlPZmZzZXQgfHwgMCxcbiAgICAgIGEgPSBtYXRyaXhbMF0sXG4gICAgICBiID0gbWF0cml4WzFdLFxuICAgICAgYyA9IG1hdHJpeFsyXSxcbiAgICAgIGQgPSBtYXRyaXhbM10sXG4gICAgICB0eCA9IG1hdHJpeFs0XSxcbiAgICAgIHR5ID0gbWF0cml4WzVdLFxuICAgICAgb3JpZ2luU3BsaXQgPSBvcmlnaW4uc3BsaXQoXCIgXCIpLFxuICAgICAgeE9yaWdpbiA9IHBhcnNlRmxvYXQob3JpZ2luU3BsaXRbMF0pIHx8IDAsXG4gICAgICB5T3JpZ2luID0gcGFyc2VGbG9hdChvcmlnaW5TcGxpdFsxXSkgfHwgMCxcbiAgICAgIGJvdW5kcyxcbiAgICAgIGRldGVybWluYW50LFxuICAgICAgeCxcbiAgICAgIHk7XG5cbiAgaWYgKCFvcmlnaW5Jc0Fic29sdXRlKSB7XG4gICAgYm91bmRzID0gX2dldEJCb3godGFyZ2V0KTtcbiAgICB4T3JpZ2luID0gYm91bmRzLnggKyAofm9yaWdpblNwbGl0WzBdLmluZGV4T2YoXCIlXCIpID8geE9yaWdpbiAvIDEwMCAqIGJvdW5kcy53aWR0aCA6IHhPcmlnaW4pO1xuICAgIHlPcmlnaW4gPSBib3VuZHMueSArICh+KG9yaWdpblNwbGl0WzFdIHx8IG9yaWdpblNwbGl0WzBdKS5pbmRleE9mKFwiJVwiKSA/IHlPcmlnaW4gLyAxMDAgKiBib3VuZHMuaGVpZ2h0IDogeU9yaWdpbik7XG4gIH0gZWxzZSBpZiAobWF0cml4ICE9PSBfaWRlbnRpdHkyRE1hdHJpeCAmJiAoZGV0ZXJtaW5hbnQgPSBhICogZCAtIGIgKiBjKSkge1xuICAgIC8vaWYgaXQncyB6ZXJvIChsaWtlIGlmIHNjYWxlWCBhbmQgc2NhbGVZIGFyZSB6ZXJvKSwgc2tpcCBpdCB0byBhdm9pZCBlcnJvcnMgd2l0aCBkaXZpZGluZyBieSB6ZXJvLlxuICAgIHggPSB4T3JpZ2luICogKGQgLyBkZXRlcm1pbmFudCkgKyB5T3JpZ2luICogKC1jIC8gZGV0ZXJtaW5hbnQpICsgKGMgKiB0eSAtIGQgKiB0eCkgLyBkZXRlcm1pbmFudDtcbiAgICB5ID0geE9yaWdpbiAqICgtYiAvIGRldGVybWluYW50KSArIHlPcmlnaW4gKiAoYSAvIGRldGVybWluYW50KSAtIChhICogdHkgLSBiICogdHgpIC8gZGV0ZXJtaW5hbnQ7XG4gICAgeE9yaWdpbiA9IHg7XG4gICAgeU9yaWdpbiA9IHk7XG4gIH1cblxuICBpZiAoc21vb3RoIHx8IHNtb290aCAhPT0gZmFsc2UgJiYgY2FjaGUuc21vb3RoKSB7XG4gICAgdHggPSB4T3JpZ2luIC0geE9yaWdpbk9sZDtcbiAgICB0eSA9IHlPcmlnaW4gLSB5T3JpZ2luT2xkO1xuICAgIGNhY2hlLnhPZmZzZXQgPSB4T2Zmc2V0T2xkICsgKHR4ICogYSArIHR5ICogYykgLSB0eDtcbiAgICBjYWNoZS55T2Zmc2V0ID0geU9mZnNldE9sZCArICh0eCAqIGIgKyB0eSAqIGQpIC0gdHk7XG4gIH0gZWxzZSB7XG4gICAgY2FjaGUueE9mZnNldCA9IGNhY2hlLnlPZmZzZXQgPSAwO1xuICB9XG5cbiAgY2FjaGUueE9yaWdpbiA9IHhPcmlnaW47XG4gIGNhY2hlLnlPcmlnaW4gPSB5T3JpZ2luO1xuICBjYWNoZS5zbW9vdGggPSAhIXNtb290aDtcbiAgY2FjaGUub3JpZ2luID0gb3JpZ2luO1xuICBjYWNoZS5vcmlnaW5Jc0Fic29sdXRlID0gISFvcmlnaW5Jc0Fic29sdXRlO1xuICB0YXJnZXQuc3R5bGVbX3RyYW5zZm9ybU9yaWdpblByb3BdID0gXCIwcHggMHB4XCI7IC8vb3RoZXJ3aXNlLCBpZiBzb21lb25lIHNldHMgIGFuIG9yaWdpbiB2aWEgQ1NTLCBpdCB3aWxsIGxpa2VseSBpbnRlcmZlcmUgd2l0aCB0aGUgU1ZHIHRyYW5zZm9ybSBhdHRyaWJ1dGUgb25lcyAoYmVjYXVzZSByZW1lbWJlciwgd2UncmUgYmFraW5nIHRoZSBvcmlnaW4gaW50byB0aGUgbWF0cml4KCkgdmFsdWUpLlxuXG4gIGlmIChwbHVnaW5Ub0FkZFByb3BUd2VlbnNUbykge1xuICAgIF9hZGROb25Ud2VlbmluZ1BUKHBsdWdpblRvQWRkUHJvcFR3ZWVuc1RvLCBjYWNoZSwgXCJ4T3JpZ2luXCIsIHhPcmlnaW5PbGQsIHhPcmlnaW4pO1xuXG4gICAgX2FkZE5vblR3ZWVuaW5nUFQocGx1Z2luVG9BZGRQcm9wVHdlZW5zVG8sIGNhY2hlLCBcInlPcmlnaW5cIiwgeU9yaWdpbk9sZCwgeU9yaWdpbik7XG5cbiAgICBfYWRkTm9uVHdlZW5pbmdQVChwbHVnaW5Ub0FkZFByb3BUd2VlbnNUbywgY2FjaGUsIFwieE9mZnNldFwiLCB4T2Zmc2V0T2xkLCBjYWNoZS54T2Zmc2V0KTtcblxuICAgIF9hZGROb25Ud2VlbmluZ1BUKHBsdWdpblRvQWRkUHJvcFR3ZWVuc1RvLCBjYWNoZSwgXCJ5T2Zmc2V0XCIsIHlPZmZzZXRPbGQsIGNhY2hlLnlPZmZzZXQpO1xuICB9XG5cbiAgdGFyZ2V0LnNldEF0dHJpYnV0ZShcImRhdGEtc3ZnLW9yaWdpblwiLCB4T3JpZ2luICsgXCIgXCIgKyB5T3JpZ2luKTtcbn0sXG4gICAgX3BhcnNlVHJhbnNmb3JtID0gZnVuY3Rpb24gX3BhcnNlVHJhbnNmb3JtKHRhcmdldCwgdW5jYWNoZSkge1xuICB2YXIgY2FjaGUgPSB0YXJnZXQuX2dzYXAgfHwgbmV3IEdTQ2FjaGUodGFyZ2V0KTtcblxuICBpZiAoXCJ4XCIgaW4gY2FjaGUgJiYgIXVuY2FjaGUgJiYgIWNhY2hlLnVuY2FjaGUpIHtcbiAgICByZXR1cm4gY2FjaGU7XG4gIH1cblxuICB2YXIgc3R5bGUgPSB0YXJnZXQuc3R5bGUsXG4gICAgICBpbnZlcnRlZFNjYWxlWCA9IGNhY2hlLnNjYWxlWCA8IDAsXG4gICAgICBweCA9IFwicHhcIixcbiAgICAgIGRlZyA9IFwiZGVnXCIsXG4gICAgICBjcyA9IGdldENvbXB1dGVkU3R5bGUodGFyZ2V0KSxcbiAgICAgIG9yaWdpbiA9IF9nZXRDb21wdXRlZFByb3BlcnR5KHRhcmdldCwgX3RyYW5zZm9ybU9yaWdpblByb3ApIHx8IFwiMFwiLFxuICAgICAgeCxcbiAgICAgIHksXG4gICAgICB6LFxuICAgICAgc2NhbGVYLFxuICAgICAgc2NhbGVZLFxuICAgICAgcm90YXRpb24sXG4gICAgICByb3RhdGlvblgsXG4gICAgICByb3RhdGlvblksXG4gICAgICBza2V3WCxcbiAgICAgIHNrZXdZLFxuICAgICAgcGVyc3BlY3RpdmUsXG4gICAgICB4T3JpZ2luLFxuICAgICAgeU9yaWdpbixcbiAgICAgIG1hdHJpeCxcbiAgICAgIGFuZ2xlLFxuICAgICAgY29zLFxuICAgICAgc2luLFxuICAgICAgYSxcbiAgICAgIGIsXG4gICAgICBjLFxuICAgICAgZCxcbiAgICAgIGExMixcbiAgICAgIGEyMixcbiAgICAgIHQxLFxuICAgICAgdDIsXG4gICAgICB0MyxcbiAgICAgIGExMyxcbiAgICAgIGEyMyxcbiAgICAgIGEzMyxcbiAgICAgIGE0MixcbiAgICAgIGE0MyxcbiAgICAgIGEzMjtcbiAgeCA9IHkgPSB6ID0gcm90YXRpb24gPSByb3RhdGlvblggPSByb3RhdGlvblkgPSBza2V3WCA9IHNrZXdZID0gcGVyc3BlY3RpdmUgPSAwO1xuICBzY2FsZVggPSBzY2FsZVkgPSAxO1xuICBjYWNoZS5zdmcgPSAhISh0YXJnZXQuZ2V0Q1RNICYmIF9pc1NWRyh0YXJnZXQpKTtcblxuICBpZiAoY3MudHJhbnNsYXRlKSB7XG4gICAgLy8gYWNjb21tb2RhdGUgaW5kZXBlbmRlbnQgdHJhbnNmb3JtcyBieSBjb21iaW5pbmcgdGhlbSBpbnRvIG5vcm1hbCBvbmVzLlxuICAgIGlmIChjcy50cmFuc2xhdGUgIT09IFwibm9uZVwiIHx8IGNzLnNjYWxlICE9PSBcIm5vbmVcIiB8fCBjcy5yb3RhdGUgIT09IFwibm9uZVwiKSB7XG4gICAgICBzdHlsZVtfdHJhbnNmb3JtUHJvcF0gPSAoY3MudHJhbnNsYXRlICE9PSBcIm5vbmVcIiA/IFwidHJhbnNsYXRlM2QoXCIgKyAoY3MudHJhbnNsYXRlICsgXCIgMCAwXCIpLnNwbGl0KFwiIFwiKS5zbGljZSgwLCAzKS5qb2luKFwiLCBcIikgKyBcIikgXCIgOiBcIlwiKSArIChjcy5yb3RhdGUgIT09IFwibm9uZVwiID8gXCJyb3RhdGUoXCIgKyBjcy5yb3RhdGUgKyBcIikgXCIgOiBcIlwiKSArIChjcy5zY2FsZSAhPT0gXCJub25lXCIgPyBcInNjYWxlKFwiICsgY3Muc2NhbGUuc3BsaXQoXCIgXCIpLmpvaW4oXCIsXCIpICsgXCIpIFwiIDogXCJcIikgKyAoY3NbX3RyYW5zZm9ybVByb3BdICE9PSBcIm5vbmVcIiA/IGNzW190cmFuc2Zvcm1Qcm9wXSA6IFwiXCIpO1xuICAgIH1cblxuICAgIHN0eWxlLnNjYWxlID0gc3R5bGUucm90YXRlID0gc3R5bGUudHJhbnNsYXRlID0gXCJub25lXCI7XG4gIH1cblxuICBtYXRyaXggPSBfZ2V0TWF0cml4KHRhcmdldCwgY2FjaGUuc3ZnKTtcblxuICBpZiAoY2FjaGUuc3ZnKSB7XG4gICAgaWYgKGNhY2hlLnVuY2FjaGUpIHtcbiAgICAgIC8vIGlmIGNhY2hlLnVuY2FjaGUgaXMgdHJ1ZSAoYW5kIG1heWJlIGlmIG9yaWdpbiBpcyAwLDApLCB3ZSBuZWVkIHRvIHNldCBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9IChjYWNoZS54T3JpZ2luIC0gYmJveC54KSArIFwicHggXCIgKyAoY2FjaGUueU9yaWdpbiAtIGJib3gueSkgKyBcInB4XCIuIFByZXZpb3VzbHkgd2UgbGV0IHRoZSBkYXRhLXN2Zy1vcmlnaW4gc3RheSBpbnN0ZWFkLCBidXQgd2hlbiBpbnRyb2R1Y2luZyByZXZlcnQoKSwgaXQgY29tcGxpY2F0ZWQgdGhpbmdzLlxuICAgICAgdDIgPSB0YXJnZXQuZ2V0QkJveCgpO1xuICAgICAgb3JpZ2luID0gY2FjaGUueE9yaWdpbiAtIHQyLnggKyBcInB4IFwiICsgKGNhY2hlLnlPcmlnaW4gLSB0Mi55KSArIFwicHhcIjtcbiAgICAgIHQxID0gXCJcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdDEgPSAhdW5jYWNoZSAmJiB0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1zdmctb3JpZ2luXCIpOyAvLyAgUmVtZW1iZXIsIHRvIHdvcmsgYXJvdW5kIGJyb3dzZXIgaW5jb25zaXN0ZW5jaWVzIHdlIGFsd2F5cyBmb3JjZSBTVkcgZWxlbWVudHMnIHRyYW5zZm9ybU9yaWdpbiB0byAwLDAgYW5kIG9mZnNldCB0aGUgdHJhbnNsYXRpb24gYWNjb3JkaW5nbHkuXG4gICAgfVxuXG4gICAgX2FwcGx5U1ZHT3JpZ2luKHRhcmdldCwgdDEgfHwgb3JpZ2luLCAhIXQxIHx8IGNhY2hlLm9yaWdpbklzQWJzb2x1dGUsIGNhY2hlLnNtb290aCAhPT0gZmFsc2UsIG1hdHJpeCk7XG4gIH1cblxuICB4T3JpZ2luID0gY2FjaGUueE9yaWdpbiB8fCAwO1xuICB5T3JpZ2luID0gY2FjaGUueU9yaWdpbiB8fCAwO1xuXG4gIGlmIChtYXRyaXggIT09IF9pZGVudGl0eTJETWF0cml4KSB7XG4gICAgYSA9IG1hdHJpeFswXTsgLy9hMTFcblxuICAgIGIgPSBtYXRyaXhbMV07IC8vYTIxXG5cbiAgICBjID0gbWF0cml4WzJdOyAvL2EzMVxuXG4gICAgZCA9IG1hdHJpeFszXTsgLy9hNDFcblxuICAgIHggPSBhMTIgPSBtYXRyaXhbNF07XG4gICAgeSA9IGEyMiA9IG1hdHJpeFs1XTsgLy8yRCBtYXRyaXhcblxuICAgIGlmIChtYXRyaXgubGVuZ3RoID09PSA2KSB7XG4gICAgICBzY2FsZVggPSBNYXRoLnNxcnQoYSAqIGEgKyBiICogYik7XG4gICAgICBzY2FsZVkgPSBNYXRoLnNxcnQoZCAqIGQgKyBjICogYyk7XG4gICAgICByb3RhdGlvbiA9IGEgfHwgYiA/IF9hdGFuMihiLCBhKSAqIF9SQUQyREVHIDogMDsgLy9ub3RlOiBpZiBzY2FsZVggaXMgMCwgd2UgY2Fubm90IGFjY3VyYXRlbHkgbWVhc3VyZSByb3RhdGlvbi4gU2FtZSBmb3Igc2tld1ggd2l0aCBhIHNjYWxlWSBvZiAwLiBUaGVyZWZvcmUsIHdlIGRlZmF1bHQgdG8gdGhlIHByZXZpb3VzbHkgcmVjb3JkZWQgdmFsdWUgKG9yIHplcm8gaWYgdGhhdCBkb2Vzbid0IGV4aXN0KS5cblxuICAgICAgc2tld1ggPSBjIHx8IGQgPyBfYXRhbjIoYywgZCkgKiBfUkFEMkRFRyArIHJvdGF0aW9uIDogMDtcbiAgICAgIHNrZXdYICYmIChzY2FsZVkgKj0gTWF0aC5hYnMoTWF0aC5jb3Moc2tld1ggKiBfREVHMlJBRCkpKTtcblxuICAgICAgaWYgKGNhY2hlLnN2Zykge1xuICAgICAgICB4IC09IHhPcmlnaW4gLSAoeE9yaWdpbiAqIGEgKyB5T3JpZ2luICogYyk7XG4gICAgICAgIHkgLT0geU9yaWdpbiAtICh4T3JpZ2luICogYiArIHlPcmlnaW4gKiBkKTtcbiAgICAgIH0gLy8zRCBtYXRyaXhcblxuICAgIH0gZWxzZSB7XG4gICAgICBhMzIgPSBtYXRyaXhbNl07XG4gICAgICBhNDIgPSBtYXRyaXhbN107XG4gICAgICBhMTMgPSBtYXRyaXhbOF07XG4gICAgICBhMjMgPSBtYXRyaXhbOV07XG4gICAgICBhMzMgPSBtYXRyaXhbMTBdO1xuICAgICAgYTQzID0gbWF0cml4WzExXTtcbiAgICAgIHggPSBtYXRyaXhbMTJdO1xuICAgICAgeSA9IG1hdHJpeFsxM107XG4gICAgICB6ID0gbWF0cml4WzE0XTtcbiAgICAgIGFuZ2xlID0gX2F0YW4yKGEzMiwgYTMzKTtcbiAgICAgIHJvdGF0aW9uWCA9IGFuZ2xlICogX1JBRDJERUc7IC8vcm90YXRpb25YXG5cbiAgICAgIGlmIChhbmdsZSkge1xuICAgICAgICBjb3MgPSBNYXRoLmNvcygtYW5nbGUpO1xuICAgICAgICBzaW4gPSBNYXRoLnNpbigtYW5nbGUpO1xuICAgICAgICB0MSA9IGExMiAqIGNvcyArIGExMyAqIHNpbjtcbiAgICAgICAgdDIgPSBhMjIgKiBjb3MgKyBhMjMgKiBzaW47XG4gICAgICAgIHQzID0gYTMyICogY29zICsgYTMzICogc2luO1xuICAgICAgICBhMTMgPSBhMTIgKiAtc2luICsgYTEzICogY29zO1xuICAgICAgICBhMjMgPSBhMjIgKiAtc2luICsgYTIzICogY29zO1xuICAgICAgICBhMzMgPSBhMzIgKiAtc2luICsgYTMzICogY29zO1xuICAgICAgICBhNDMgPSBhNDIgKiAtc2luICsgYTQzICogY29zO1xuICAgICAgICBhMTIgPSB0MTtcbiAgICAgICAgYTIyID0gdDI7XG4gICAgICAgIGEzMiA9IHQzO1xuICAgICAgfSAvL3JvdGF0aW9uWVxuXG5cbiAgICAgIGFuZ2xlID0gX2F0YW4yKC1jLCBhMzMpO1xuICAgICAgcm90YXRpb25ZID0gYW5nbGUgKiBfUkFEMkRFRztcblxuICAgICAgaWYgKGFuZ2xlKSB7XG4gICAgICAgIGNvcyA9IE1hdGguY29zKC1hbmdsZSk7XG4gICAgICAgIHNpbiA9IE1hdGguc2luKC1hbmdsZSk7XG4gICAgICAgIHQxID0gYSAqIGNvcyAtIGExMyAqIHNpbjtcbiAgICAgICAgdDIgPSBiICogY29zIC0gYTIzICogc2luO1xuICAgICAgICB0MyA9IGMgKiBjb3MgLSBhMzMgKiBzaW47XG4gICAgICAgIGE0MyA9IGQgKiBzaW4gKyBhNDMgKiBjb3M7XG4gICAgICAgIGEgPSB0MTtcbiAgICAgICAgYiA9IHQyO1xuICAgICAgICBjID0gdDM7XG4gICAgICB9IC8vcm90YXRpb25aXG5cblxuICAgICAgYW5nbGUgPSBfYXRhbjIoYiwgYSk7XG4gICAgICByb3RhdGlvbiA9IGFuZ2xlICogX1JBRDJERUc7XG5cbiAgICAgIGlmIChhbmdsZSkge1xuICAgICAgICBjb3MgPSBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgIHNpbiA9IE1hdGguc2luKGFuZ2xlKTtcbiAgICAgICAgdDEgPSBhICogY29zICsgYiAqIHNpbjtcbiAgICAgICAgdDIgPSBhMTIgKiBjb3MgKyBhMjIgKiBzaW47XG4gICAgICAgIGIgPSBiICogY29zIC0gYSAqIHNpbjtcbiAgICAgICAgYTIyID0gYTIyICogY29zIC0gYTEyICogc2luO1xuICAgICAgICBhID0gdDE7XG4gICAgICAgIGExMiA9IHQyO1xuICAgICAgfVxuXG4gICAgICBpZiAocm90YXRpb25YICYmIE1hdGguYWJzKHJvdGF0aW9uWCkgKyBNYXRoLmFicyhyb3RhdGlvbikgPiAzNTkuOSkge1xuICAgICAgICAvL3doZW4gcm90YXRpb25ZIGlzIHNldCwgaXQgd2lsbCBvZnRlbiBiZSBwYXJzZWQgYXMgMTgwIGRlZ3JlZXMgZGlmZmVyZW50IHRoYW4gaXQgc2hvdWxkIGJlLCBhbmQgcm90YXRpb25YIGFuZCByb3RhdGlvbiBib3RoIGJlaW5nIDE4MCAoaXQgbG9va3MgdGhlIHNhbWUpLCBzbyB3ZSBhZGp1c3QgZm9yIHRoYXQgaGVyZS5cbiAgICAgICAgcm90YXRpb25YID0gcm90YXRpb24gPSAwO1xuICAgICAgICByb3RhdGlvblkgPSAxODAgLSByb3RhdGlvblk7XG4gICAgICB9XG5cbiAgICAgIHNjYWxlWCA9IF9yb3VuZChNYXRoLnNxcnQoYSAqIGEgKyBiICogYiArIGMgKiBjKSk7XG4gICAgICBzY2FsZVkgPSBfcm91bmQoTWF0aC5zcXJ0KGEyMiAqIGEyMiArIGEzMiAqIGEzMikpO1xuICAgICAgYW5nbGUgPSBfYXRhbjIoYTEyLCBhMjIpO1xuICAgICAgc2tld1ggPSBNYXRoLmFicyhhbmdsZSkgPiAwLjAwMDIgPyBhbmdsZSAqIF9SQUQyREVHIDogMDtcbiAgICAgIHBlcnNwZWN0aXZlID0gYTQzID8gMSAvIChhNDMgPCAwID8gLWE0MyA6IGE0MykgOiAwO1xuICAgIH1cblxuICAgIGlmIChjYWNoZS5zdmcpIHtcbiAgICAgIC8vc2Vuc2UgaWYgdGhlcmUgYXJlIENTUyB0cmFuc2Zvcm1zIGFwcGxpZWQgb24gYW4gU1ZHIGVsZW1lbnQgaW4gd2hpY2ggY2FzZSB3ZSBtdXN0IG92ZXJ3cml0ZSB0aGVtIHdoZW4gcmVuZGVyaW5nLiBUaGUgdHJhbnNmb3JtIGF0dHJpYnV0ZSBpcyBtb3JlIHJlbGlhYmxlIGNyb3NzLWJyb3dzZXIsIGJ1dCB3ZSBjYW4ndCBqdXN0IHJlbW92ZSB0aGUgQ1NTIG9uZXMgYmVjYXVzZSB0aGV5IG1heSBiZSBhcHBsaWVkIGluIGEgQ1NTIHJ1bGUgc29tZXdoZXJlIChub3QganVzdCBpbmxpbmUpLlxuICAgICAgdDEgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIpO1xuICAgICAgY2FjaGUuZm9yY2VDU1MgPSB0YXJnZXQuc2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIsIFwiXCIpIHx8ICFfaXNOdWxsVHJhbnNmb3JtKF9nZXRDb21wdXRlZFByb3BlcnR5KHRhcmdldCwgX3RyYW5zZm9ybVByb3ApKTtcbiAgICAgIHQxICYmIHRhcmdldC5zZXRBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIiwgdDEpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChNYXRoLmFicyhza2V3WCkgPiA5MCAmJiBNYXRoLmFicyhza2V3WCkgPCAyNzApIHtcbiAgICBpZiAoaW52ZXJ0ZWRTY2FsZVgpIHtcbiAgICAgIHNjYWxlWCAqPSAtMTtcbiAgICAgIHNrZXdYICs9IHJvdGF0aW9uIDw9IDAgPyAxODAgOiAtMTgwO1xuICAgICAgcm90YXRpb24gKz0gcm90YXRpb24gPD0gMCA/IDE4MCA6IC0xODA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNjYWxlWSAqPSAtMTtcbiAgICAgIHNrZXdYICs9IHNrZXdYIDw9IDAgPyAxODAgOiAtMTgwO1xuICAgIH1cbiAgfVxuXG4gIHVuY2FjaGUgPSB1bmNhY2hlIHx8IGNhY2hlLnVuY2FjaGU7XG4gIGNhY2hlLnggPSB4IC0gKChjYWNoZS54UGVyY2VudCA9IHggJiYgKCF1bmNhY2hlICYmIGNhY2hlLnhQZXJjZW50IHx8IChNYXRoLnJvdW5kKHRhcmdldC5vZmZzZXRXaWR0aCAvIDIpID09PSBNYXRoLnJvdW5kKC14KSA/IC01MCA6IDApKSkgPyB0YXJnZXQub2Zmc2V0V2lkdGggKiBjYWNoZS54UGVyY2VudCAvIDEwMCA6IDApICsgcHg7XG4gIGNhY2hlLnkgPSB5IC0gKChjYWNoZS55UGVyY2VudCA9IHkgJiYgKCF1bmNhY2hlICYmIGNhY2hlLnlQZXJjZW50IHx8IChNYXRoLnJvdW5kKHRhcmdldC5vZmZzZXRIZWlnaHQgLyAyKSA9PT0gTWF0aC5yb3VuZCgteSkgPyAtNTAgOiAwKSkpID8gdGFyZ2V0Lm9mZnNldEhlaWdodCAqIGNhY2hlLnlQZXJjZW50IC8gMTAwIDogMCkgKyBweDtcbiAgY2FjaGUueiA9IHogKyBweDtcbiAgY2FjaGUuc2NhbGVYID0gX3JvdW5kKHNjYWxlWCk7XG4gIGNhY2hlLnNjYWxlWSA9IF9yb3VuZChzY2FsZVkpO1xuICBjYWNoZS5yb3RhdGlvbiA9IF9yb3VuZChyb3RhdGlvbikgKyBkZWc7XG4gIGNhY2hlLnJvdGF0aW9uWCA9IF9yb3VuZChyb3RhdGlvblgpICsgZGVnO1xuICBjYWNoZS5yb3RhdGlvblkgPSBfcm91bmQocm90YXRpb25ZKSArIGRlZztcbiAgY2FjaGUuc2tld1ggPSBza2V3WCArIGRlZztcbiAgY2FjaGUuc2tld1kgPSBza2V3WSArIGRlZztcbiAgY2FjaGUudHJhbnNmb3JtUGVyc3BlY3RpdmUgPSBwZXJzcGVjdGl2ZSArIHB4O1xuXG4gIGlmIChjYWNoZS56T3JpZ2luID0gcGFyc2VGbG9hdChvcmlnaW4uc3BsaXQoXCIgXCIpWzJdKSB8fCAwKSB7XG4gICAgc3R5bGVbX3RyYW5zZm9ybU9yaWdpblByb3BdID0gX2ZpcnN0VHdvT25seShvcmlnaW4pO1xuICB9XG5cbiAgY2FjaGUueE9mZnNldCA9IGNhY2hlLnlPZmZzZXQgPSAwO1xuICBjYWNoZS5mb3JjZTNEID0gX2NvbmZpZy5mb3JjZTNEO1xuICBjYWNoZS5yZW5kZXJUcmFuc2Zvcm0gPSBjYWNoZS5zdmcgPyBfcmVuZGVyU1ZHVHJhbnNmb3JtcyA6IF9zdXBwb3J0czNEID8gX3JlbmRlckNTU1RyYW5zZm9ybXMgOiBfcmVuZGVyTm9uM0RUcmFuc2Zvcm1zO1xuICBjYWNoZS51bmNhY2hlID0gMDtcbiAgcmV0dXJuIGNhY2hlO1xufSxcbiAgICBfZmlyc3RUd29Pbmx5ID0gZnVuY3Rpb24gX2ZpcnN0VHdvT25seSh2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlID0gdmFsdWUuc3BsaXQoXCIgXCIpKVswXSArIFwiIFwiICsgdmFsdWVbMV07XG59LFxuICAgIC8vZm9yIGhhbmRsaW5nIHRyYW5zZm9ybU9yaWdpbiB2YWx1ZXMsIHN0cmlwcGluZyBvdXQgdGhlIDNyZCBkaW1lbnNpb25cbl9hZGRQeFRyYW5zbGF0ZSA9IGZ1bmN0aW9uIF9hZGRQeFRyYW5zbGF0ZSh0YXJnZXQsIHN0YXJ0LCB2YWx1ZSkge1xuICB2YXIgdW5pdCA9IGdldFVuaXQoc3RhcnQpO1xuICByZXR1cm4gX3JvdW5kKHBhcnNlRmxvYXQoc3RhcnQpICsgcGFyc2VGbG9hdChfY29udmVydFRvVW5pdCh0YXJnZXQsIFwieFwiLCB2YWx1ZSArIFwicHhcIiwgdW5pdCkpKSArIHVuaXQ7XG59LFxuICAgIF9yZW5kZXJOb24zRFRyYW5zZm9ybXMgPSBmdW5jdGlvbiBfcmVuZGVyTm9uM0RUcmFuc2Zvcm1zKHJhdGlvLCBjYWNoZSkge1xuICBjYWNoZS56ID0gXCIwcHhcIjtcbiAgY2FjaGUucm90YXRpb25ZID0gY2FjaGUucm90YXRpb25YID0gXCIwZGVnXCI7XG4gIGNhY2hlLmZvcmNlM0QgPSAwO1xuXG4gIF9yZW5kZXJDU1NUcmFuc2Zvcm1zKHJhdGlvLCBjYWNoZSk7XG59LFxuICAgIF96ZXJvRGVnID0gXCIwZGVnXCIsXG4gICAgX3plcm9QeCA9IFwiMHB4XCIsXG4gICAgX2VuZFBhcmVudGhlc2lzID0gXCIpIFwiLFxuICAgIF9yZW5kZXJDU1NUcmFuc2Zvcm1zID0gZnVuY3Rpb24gX3JlbmRlckNTU1RyYW5zZm9ybXMocmF0aW8sIGNhY2hlKSB7XG4gIHZhciBfcmVmID0gY2FjaGUgfHwgdGhpcyxcbiAgICAgIHhQZXJjZW50ID0gX3JlZi54UGVyY2VudCxcbiAgICAgIHlQZXJjZW50ID0gX3JlZi55UGVyY2VudCxcbiAgICAgIHggPSBfcmVmLngsXG4gICAgICB5ID0gX3JlZi55LFxuICAgICAgeiA9IF9yZWYueixcbiAgICAgIHJvdGF0aW9uID0gX3JlZi5yb3RhdGlvbixcbiAgICAgIHJvdGF0aW9uWSA9IF9yZWYucm90YXRpb25ZLFxuICAgICAgcm90YXRpb25YID0gX3JlZi5yb3RhdGlvblgsXG4gICAgICBza2V3WCA9IF9yZWYuc2tld1gsXG4gICAgICBza2V3WSA9IF9yZWYuc2tld1ksXG4gICAgICBzY2FsZVggPSBfcmVmLnNjYWxlWCxcbiAgICAgIHNjYWxlWSA9IF9yZWYuc2NhbGVZLFxuICAgICAgdHJhbnNmb3JtUGVyc3BlY3RpdmUgPSBfcmVmLnRyYW5zZm9ybVBlcnNwZWN0aXZlLFxuICAgICAgZm9yY2UzRCA9IF9yZWYuZm9yY2UzRCxcbiAgICAgIHRhcmdldCA9IF9yZWYudGFyZ2V0LFxuICAgICAgek9yaWdpbiA9IF9yZWYuek9yaWdpbixcbiAgICAgIHRyYW5zZm9ybXMgPSBcIlwiLFxuICAgICAgdXNlM0QgPSBmb3JjZTNEID09PSBcImF1dG9cIiAmJiByYXRpbyAmJiByYXRpbyAhPT0gMSB8fCBmb3JjZTNEID09PSB0cnVlOyAvLyBTYWZhcmkgaGFzIGEgYnVnIHRoYXQgY2F1c2VzIGl0IG5vdCB0byByZW5kZXIgM0QgdHJhbnNmb3JtLW9yaWdpbiB2YWx1ZXMgcHJvcGVybHksIHNvIHdlIGZvcmNlIHRoZSB6IG9yaWdpbiB0byAwLCByZWNvcmQgaXQgaW4gdGhlIGNhY2hlLCBhbmQgdGhlbiBkbyB0aGUgbWF0aCBoZXJlIHRvIG9mZnNldCB0aGUgdHJhbnNsYXRlIHZhbHVlcyBhY2NvcmRpbmdseSAoYmFzaWNhbGx5IGRvIHRoZSAzRCB0cmFuc2Zvcm0tb3JpZ2luIHBhcnQgbWFudWFsbHkpXG5cblxuICBpZiAoek9yaWdpbiAmJiAocm90YXRpb25YICE9PSBfemVyb0RlZyB8fCByb3RhdGlvblkgIT09IF96ZXJvRGVnKSkge1xuICAgIHZhciBhbmdsZSA9IHBhcnNlRmxvYXQocm90YXRpb25ZKSAqIF9ERUcyUkFELFxuICAgICAgICBhMTMgPSBNYXRoLnNpbihhbmdsZSksXG4gICAgICAgIGEzMyA9IE1hdGguY29zKGFuZ2xlKSxcbiAgICAgICAgY29zO1xuXG4gICAgYW5nbGUgPSBwYXJzZUZsb2F0KHJvdGF0aW9uWCkgKiBfREVHMlJBRDtcbiAgICBjb3MgPSBNYXRoLmNvcyhhbmdsZSk7XG4gICAgeCA9IF9hZGRQeFRyYW5zbGF0ZSh0YXJnZXQsIHgsIGExMyAqIGNvcyAqIC16T3JpZ2luKTtcbiAgICB5ID0gX2FkZFB4VHJhbnNsYXRlKHRhcmdldCwgeSwgLU1hdGguc2luKGFuZ2xlKSAqIC16T3JpZ2luKTtcbiAgICB6ID0gX2FkZFB4VHJhbnNsYXRlKHRhcmdldCwgeiwgYTMzICogY29zICogLXpPcmlnaW4gKyB6T3JpZ2luKTtcbiAgfVxuXG4gIGlmICh0cmFuc2Zvcm1QZXJzcGVjdGl2ZSAhPT0gX3plcm9QeCkge1xuICAgIHRyYW5zZm9ybXMgKz0gXCJwZXJzcGVjdGl2ZShcIiArIHRyYW5zZm9ybVBlcnNwZWN0aXZlICsgX2VuZFBhcmVudGhlc2lzO1xuICB9XG5cbiAgaWYgKHhQZXJjZW50IHx8IHlQZXJjZW50KSB7XG4gICAgdHJhbnNmb3JtcyArPSBcInRyYW5zbGF0ZShcIiArIHhQZXJjZW50ICsgXCIlLCBcIiArIHlQZXJjZW50ICsgXCIlKSBcIjtcbiAgfVxuXG4gIGlmICh1c2UzRCB8fCB4ICE9PSBfemVyb1B4IHx8IHkgIT09IF96ZXJvUHggfHwgeiAhPT0gX3plcm9QeCkge1xuICAgIHRyYW5zZm9ybXMgKz0geiAhPT0gX3plcm9QeCB8fCB1c2UzRCA/IFwidHJhbnNsYXRlM2QoXCIgKyB4ICsgXCIsIFwiICsgeSArIFwiLCBcIiArIHogKyBcIikgXCIgOiBcInRyYW5zbGF0ZShcIiArIHggKyBcIiwgXCIgKyB5ICsgX2VuZFBhcmVudGhlc2lzO1xuICB9XG5cbiAgaWYgKHJvdGF0aW9uICE9PSBfemVyb0RlZykge1xuICAgIHRyYW5zZm9ybXMgKz0gXCJyb3RhdGUoXCIgKyByb3RhdGlvbiArIF9lbmRQYXJlbnRoZXNpcztcbiAgfVxuXG4gIGlmIChyb3RhdGlvblkgIT09IF96ZXJvRGVnKSB7XG4gICAgdHJhbnNmb3JtcyArPSBcInJvdGF0ZVkoXCIgKyByb3RhdGlvblkgKyBfZW5kUGFyZW50aGVzaXM7XG4gIH1cblxuICBpZiAocm90YXRpb25YICE9PSBfemVyb0RlZykge1xuICAgIHRyYW5zZm9ybXMgKz0gXCJyb3RhdGVYKFwiICsgcm90YXRpb25YICsgX2VuZFBhcmVudGhlc2lzO1xuICB9XG5cbiAgaWYgKHNrZXdYICE9PSBfemVyb0RlZyB8fCBza2V3WSAhPT0gX3plcm9EZWcpIHtcbiAgICB0cmFuc2Zvcm1zICs9IFwic2tldyhcIiArIHNrZXdYICsgXCIsIFwiICsgc2tld1kgKyBfZW5kUGFyZW50aGVzaXM7XG4gIH1cblxuICBpZiAoc2NhbGVYICE9PSAxIHx8IHNjYWxlWSAhPT0gMSkge1xuICAgIHRyYW5zZm9ybXMgKz0gXCJzY2FsZShcIiArIHNjYWxlWCArIFwiLCBcIiArIHNjYWxlWSArIF9lbmRQYXJlbnRoZXNpcztcbiAgfVxuXG4gIHRhcmdldC5zdHlsZVtfdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2Zvcm1zIHx8IFwidHJhbnNsYXRlKDAsIDApXCI7XG59LFxuICAgIF9yZW5kZXJTVkdUcmFuc2Zvcm1zID0gZnVuY3Rpb24gX3JlbmRlclNWR1RyYW5zZm9ybXMocmF0aW8sIGNhY2hlKSB7XG4gIHZhciBfcmVmMiA9IGNhY2hlIHx8IHRoaXMsXG4gICAgICB4UGVyY2VudCA9IF9yZWYyLnhQZXJjZW50LFxuICAgICAgeVBlcmNlbnQgPSBfcmVmMi55UGVyY2VudCxcbiAgICAgIHggPSBfcmVmMi54LFxuICAgICAgeSA9IF9yZWYyLnksXG4gICAgICByb3RhdGlvbiA9IF9yZWYyLnJvdGF0aW9uLFxuICAgICAgc2tld1ggPSBfcmVmMi5za2V3WCxcbiAgICAgIHNrZXdZID0gX3JlZjIuc2tld1ksXG4gICAgICBzY2FsZVggPSBfcmVmMi5zY2FsZVgsXG4gICAgICBzY2FsZVkgPSBfcmVmMi5zY2FsZVksXG4gICAgICB0YXJnZXQgPSBfcmVmMi50YXJnZXQsXG4gICAgICB4T3JpZ2luID0gX3JlZjIueE9yaWdpbixcbiAgICAgIHlPcmlnaW4gPSBfcmVmMi55T3JpZ2luLFxuICAgICAgeE9mZnNldCA9IF9yZWYyLnhPZmZzZXQsXG4gICAgICB5T2Zmc2V0ID0gX3JlZjIueU9mZnNldCxcbiAgICAgIGZvcmNlQ1NTID0gX3JlZjIuZm9yY2VDU1MsXG4gICAgICB0eCA9IHBhcnNlRmxvYXQoeCksXG4gICAgICB0eSA9IHBhcnNlRmxvYXQoeSksXG4gICAgICBhMTEsXG4gICAgICBhMjEsXG4gICAgICBhMTIsXG4gICAgICBhMjIsXG4gICAgICB0ZW1wO1xuXG4gIHJvdGF0aW9uID0gcGFyc2VGbG9hdChyb3RhdGlvbik7XG4gIHNrZXdYID0gcGFyc2VGbG9hdChza2V3WCk7XG4gIHNrZXdZID0gcGFyc2VGbG9hdChza2V3WSk7XG5cbiAgaWYgKHNrZXdZKSB7XG4gICAgLy9mb3IgcGVyZm9ybWFuY2UgcmVhc29ucywgd2UgY29tYmluZSBhbGwgc2tld2luZyBpbnRvIHRoZSBza2V3WCBhbmQgcm90YXRpb24gdmFsdWVzLiBSZW1lbWJlciwgYSBza2V3WSBvZiAxMCBkZWdyZWVzIGxvb2tzIHRoZSBzYW1lIGFzIGEgcm90YXRpb24gb2YgMTAgZGVncmVlcyBwbHVzIGEgc2tld1ggb2YgMTAgZGVncmVlcy5cbiAgICBza2V3WSA9IHBhcnNlRmxvYXQoc2tld1kpO1xuICAgIHNrZXdYICs9IHNrZXdZO1xuICAgIHJvdGF0aW9uICs9IHNrZXdZO1xuICB9XG5cbiAgaWYgKHJvdGF0aW9uIHx8IHNrZXdYKSB7XG4gICAgcm90YXRpb24gKj0gX0RFRzJSQUQ7XG4gICAgc2tld1ggKj0gX0RFRzJSQUQ7XG4gICAgYTExID0gTWF0aC5jb3Mocm90YXRpb24pICogc2NhbGVYO1xuICAgIGEyMSA9IE1hdGguc2luKHJvdGF0aW9uKSAqIHNjYWxlWDtcbiAgICBhMTIgPSBNYXRoLnNpbihyb3RhdGlvbiAtIHNrZXdYKSAqIC1zY2FsZVk7XG4gICAgYTIyID0gTWF0aC5jb3Mocm90YXRpb24gLSBza2V3WCkgKiBzY2FsZVk7XG5cbiAgICBpZiAoc2tld1gpIHtcbiAgICAgIHNrZXdZICo9IF9ERUcyUkFEO1xuICAgICAgdGVtcCA9IE1hdGgudGFuKHNrZXdYIC0gc2tld1kpO1xuICAgICAgdGVtcCA9IE1hdGguc3FydCgxICsgdGVtcCAqIHRlbXApO1xuICAgICAgYTEyICo9IHRlbXA7XG4gICAgICBhMjIgKj0gdGVtcDtcblxuICAgICAgaWYgKHNrZXdZKSB7XG4gICAgICAgIHRlbXAgPSBNYXRoLnRhbihza2V3WSk7XG4gICAgICAgIHRlbXAgPSBNYXRoLnNxcnQoMSArIHRlbXAgKiB0ZW1wKTtcbiAgICAgICAgYTExICo9IHRlbXA7XG4gICAgICAgIGEyMSAqPSB0ZW1wO1xuICAgICAgfVxuICAgIH1cblxuICAgIGExMSA9IF9yb3VuZChhMTEpO1xuICAgIGEyMSA9IF9yb3VuZChhMjEpO1xuICAgIGExMiA9IF9yb3VuZChhMTIpO1xuICAgIGEyMiA9IF9yb3VuZChhMjIpO1xuICB9IGVsc2Uge1xuICAgIGExMSA9IHNjYWxlWDtcbiAgICBhMjIgPSBzY2FsZVk7XG4gICAgYTIxID0gYTEyID0gMDtcbiAgfVxuXG4gIGlmICh0eCAmJiAhfih4ICsgXCJcIikuaW5kZXhPZihcInB4XCIpIHx8IHR5ICYmICF+KHkgKyBcIlwiKS5pbmRleE9mKFwicHhcIikpIHtcbiAgICB0eCA9IF9jb252ZXJ0VG9Vbml0KHRhcmdldCwgXCJ4XCIsIHgsIFwicHhcIik7XG4gICAgdHkgPSBfY29udmVydFRvVW5pdCh0YXJnZXQsIFwieVwiLCB5LCBcInB4XCIpO1xuICB9XG5cbiAgaWYgKHhPcmlnaW4gfHwgeU9yaWdpbiB8fCB4T2Zmc2V0IHx8IHlPZmZzZXQpIHtcbiAgICB0eCA9IF9yb3VuZCh0eCArIHhPcmlnaW4gLSAoeE9yaWdpbiAqIGExMSArIHlPcmlnaW4gKiBhMTIpICsgeE9mZnNldCk7XG4gICAgdHkgPSBfcm91bmQodHkgKyB5T3JpZ2luIC0gKHhPcmlnaW4gKiBhMjEgKyB5T3JpZ2luICogYTIyKSArIHlPZmZzZXQpO1xuICB9XG5cbiAgaWYgKHhQZXJjZW50IHx8IHlQZXJjZW50KSB7XG4gICAgLy9UaGUgU1ZHIHNwZWMgZG9lc24ndCBzdXBwb3J0IHBlcmNlbnRhZ2UtYmFzZWQgdHJhbnNsYXRpb24gaW4gdGhlIFwidHJhbnNmb3JtXCIgYXR0cmlidXRlLCBzbyB3ZSBtZXJnZSBpdCBpbnRvIHRoZSB0cmFuc2xhdGlvbiB0byBzaW11bGF0ZSBpdC5cbiAgICB0ZW1wID0gdGFyZ2V0LmdldEJCb3goKTtcbiAgICB0eCA9IF9yb3VuZCh0eCArIHhQZXJjZW50IC8gMTAwICogdGVtcC53aWR0aCk7XG4gICAgdHkgPSBfcm91bmQodHkgKyB5UGVyY2VudCAvIDEwMCAqIHRlbXAuaGVpZ2h0KTtcbiAgfVxuXG4gIHRlbXAgPSBcIm1hdHJpeChcIiArIGExMSArIFwiLFwiICsgYTIxICsgXCIsXCIgKyBhMTIgKyBcIixcIiArIGEyMiArIFwiLFwiICsgdHggKyBcIixcIiArIHR5ICsgXCIpXCI7XG4gIHRhcmdldC5zZXRBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIiwgdGVtcCk7XG4gIGZvcmNlQ1NTICYmICh0YXJnZXQuc3R5bGVbX3RyYW5zZm9ybVByb3BdID0gdGVtcCk7IC8vc29tZSBicm93c2VycyBwcmlvcml0aXplIENTUyB0cmFuc2Zvcm1zIG92ZXIgdGhlIHRyYW5zZm9ybSBhdHRyaWJ1dGUuIFdoZW4gd2Ugc2Vuc2UgdGhhdCB0aGUgdXNlciBoYXMgQ1NTIHRyYW5zZm9ybXMgYXBwbGllZCwgd2UgbXVzdCBvdmVyd3JpdGUgdGhlbSB0aGlzIHdheSAob3RoZXJ3aXNlIHNvbWUgYnJvd3NlciBzaW1wbHkgd29uJ3QgcmVuZGVyIHRoZSB0cmFuc2Zvcm0gYXR0cmlidXRlIGNoYW5nZXMhKVxufSxcbiAgICBfYWRkUm90YXRpb25hbFByb3BUd2VlbiA9IGZ1bmN0aW9uIF9hZGRSb3RhdGlvbmFsUHJvcFR3ZWVuKHBsdWdpbiwgdGFyZ2V0LCBwcm9wZXJ0eSwgc3RhcnROdW0sIGVuZFZhbHVlKSB7XG4gIHZhciBjYXAgPSAzNjAsXG4gICAgICBpc1N0cmluZyA9IF9pc1N0cmluZyhlbmRWYWx1ZSksXG4gICAgICBlbmROdW0gPSBwYXJzZUZsb2F0KGVuZFZhbHVlKSAqIChpc1N0cmluZyAmJiB+ZW5kVmFsdWUuaW5kZXhPZihcInJhZFwiKSA/IF9SQUQyREVHIDogMSksXG4gICAgICBjaGFuZ2UgPSBlbmROdW0gLSBzdGFydE51bSxcbiAgICAgIGZpbmFsVmFsdWUgPSBzdGFydE51bSArIGNoYW5nZSArIFwiZGVnXCIsXG4gICAgICBkaXJlY3Rpb24sXG4gICAgICBwdDtcblxuICBpZiAoaXNTdHJpbmcpIHtcbiAgICBkaXJlY3Rpb24gPSBlbmRWYWx1ZS5zcGxpdChcIl9cIilbMV07XG5cbiAgICBpZiAoZGlyZWN0aW9uID09PSBcInNob3J0XCIpIHtcbiAgICAgIGNoYW5nZSAlPSBjYXA7XG5cbiAgICAgIGlmIChjaGFuZ2UgIT09IGNoYW5nZSAlIChjYXAgLyAyKSkge1xuICAgICAgICBjaGFuZ2UgKz0gY2hhbmdlIDwgMCA/IGNhcCA6IC1jYXA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJjd1wiICYmIGNoYW5nZSA8IDApIHtcbiAgICAgIGNoYW5nZSA9IChjaGFuZ2UgKyBjYXAgKiBfYmlnTnVtKSAlIGNhcCAtIH5+KGNoYW5nZSAvIGNhcCkgKiBjYXA7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwiY2N3XCIgJiYgY2hhbmdlID4gMCkge1xuICAgICAgY2hhbmdlID0gKGNoYW5nZSAtIGNhcCAqIF9iaWdOdW0pICUgY2FwIC0gfn4oY2hhbmdlIC8gY2FwKSAqIGNhcDtcbiAgICB9XG4gIH1cblxuICBwbHVnaW4uX3B0ID0gcHQgPSBuZXcgUHJvcFR3ZWVuKHBsdWdpbi5fcHQsIHRhcmdldCwgcHJvcGVydHksIHN0YXJ0TnVtLCBjaGFuZ2UsIF9yZW5kZXJQcm9wV2l0aEVuZCk7XG4gIHB0LmUgPSBmaW5hbFZhbHVlO1xuICBwdC51ID0gXCJkZWdcIjtcblxuICBwbHVnaW4uX3Byb3BzLnB1c2gocHJvcGVydHkpO1xuXG4gIHJldHVybiBwdDtcbn0sXG4gICAgX2Fzc2lnbiA9IGZ1bmN0aW9uIF9hc3NpZ24odGFyZ2V0LCBzb3VyY2UpIHtcbiAgLy8gSW50ZXJuZXQgRXhwbG9yZXIgZG9lc24ndCBoYXZlIE9iamVjdC5hc3NpZ24oKSwgc28gd2UgcmVjcmVhdGUgaXQgaGVyZS5cbiAgZm9yICh2YXIgcCBpbiBzb3VyY2UpIHtcbiAgICB0YXJnZXRbcF0gPSBzb3VyY2VbcF07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufSxcbiAgICBfYWRkUmF3VHJhbnNmb3JtUFRzID0gZnVuY3Rpb24gX2FkZFJhd1RyYW5zZm9ybVBUcyhwbHVnaW4sIHRyYW5zZm9ybXMsIHRhcmdldCkge1xuICAvL2ZvciBoYW5kbGluZyBjYXNlcyB3aGVyZSBzb21lb25lIHBhc3NlcyBpbiBhIHdob2xlIHRyYW5zZm9ybSBzdHJpbmcsIGxpa2UgdHJhbnNmb3JtOiBcInNjYWxlKDIsIDMpIHJvdGF0ZSgyMGRlZykgdHJhbnNsYXRlWSgzMGVtKVwiXG4gIHZhciBzdGFydENhY2hlID0gX2Fzc2lnbih7fSwgdGFyZ2V0Ll9nc2FwKSxcbiAgICAgIGV4Y2x1ZGUgPSBcInBlcnNwZWN0aXZlLGZvcmNlM0QsdHJhbnNmb3JtT3JpZ2luLHN2Z09yaWdpblwiLFxuICAgICAgc3R5bGUgPSB0YXJnZXQuc3R5bGUsXG4gICAgICBlbmRDYWNoZSxcbiAgICAgIHAsXG4gICAgICBzdGFydFZhbHVlLFxuICAgICAgZW5kVmFsdWUsXG4gICAgICBzdGFydE51bSxcbiAgICAgIGVuZE51bSxcbiAgICAgIHN0YXJ0VW5pdCxcbiAgICAgIGVuZFVuaXQ7XG5cbiAgaWYgKHN0YXJ0Q2FjaGUuc3ZnKSB7XG4gICAgc3RhcnRWYWx1ZSA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIik7XG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShcInRyYW5zZm9ybVwiLCBcIlwiKTtcbiAgICBzdHlsZVtfdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2Zvcm1zO1xuICAgIGVuZENhY2hlID0gX3BhcnNlVHJhbnNmb3JtKHRhcmdldCwgMSk7XG5cbiAgICBfcmVtb3ZlUHJvcGVydHkodGFyZ2V0LCBfdHJhbnNmb3JtUHJvcCk7XG5cbiAgICB0YXJnZXQuc2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIsIHN0YXJ0VmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIHN0YXJ0VmFsdWUgPSBnZXRDb21wdXRlZFN0eWxlKHRhcmdldClbX3RyYW5zZm9ybVByb3BdO1xuICAgIHN0eWxlW190cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zZm9ybXM7XG4gICAgZW5kQ2FjaGUgPSBfcGFyc2VUcmFuc2Zvcm0odGFyZ2V0LCAxKTtcbiAgICBzdHlsZVtfdHJhbnNmb3JtUHJvcF0gPSBzdGFydFZhbHVlO1xuICB9XG5cbiAgZm9yIChwIGluIF90cmFuc2Zvcm1Qcm9wcykge1xuICAgIHN0YXJ0VmFsdWUgPSBzdGFydENhY2hlW3BdO1xuICAgIGVuZFZhbHVlID0gZW5kQ2FjaGVbcF07XG5cbiAgICBpZiAoc3RhcnRWYWx1ZSAhPT0gZW5kVmFsdWUgJiYgZXhjbHVkZS5pbmRleE9mKHApIDwgMCkge1xuICAgICAgLy90d2VlbmluZyB0byBubyBwZXJzcGVjdGl2ZSBnaXZlcyB2ZXJ5IHVuaW50dWl0aXZlIHJlc3VsdHMgLSBqdXN0IGtlZXAgdGhlIHNhbWUgcGVyc3BlY3RpdmUgaW4gdGhhdCBjYXNlLlxuICAgICAgc3RhcnRVbml0ID0gZ2V0VW5pdChzdGFydFZhbHVlKTtcbiAgICAgIGVuZFVuaXQgPSBnZXRVbml0KGVuZFZhbHVlKTtcbiAgICAgIHN0YXJ0TnVtID0gc3RhcnRVbml0ICE9PSBlbmRVbml0ID8gX2NvbnZlcnRUb1VuaXQodGFyZ2V0LCBwLCBzdGFydFZhbHVlLCBlbmRVbml0KSA6IHBhcnNlRmxvYXQoc3RhcnRWYWx1ZSk7XG4gICAgICBlbmROdW0gPSBwYXJzZUZsb2F0KGVuZFZhbHVlKTtcbiAgICAgIHBsdWdpbi5fcHQgPSBuZXcgUHJvcFR3ZWVuKHBsdWdpbi5fcHQsIGVuZENhY2hlLCBwLCBzdGFydE51bSwgZW5kTnVtIC0gc3RhcnROdW0sIF9yZW5kZXJDU1NQcm9wKTtcbiAgICAgIHBsdWdpbi5fcHQudSA9IGVuZFVuaXQgfHwgMDtcblxuICAgICAgcGx1Z2luLl9wcm9wcy5wdXNoKHApO1xuICAgIH1cbiAgfVxuXG4gIF9hc3NpZ24oZW5kQ2FjaGUsIHN0YXJ0Q2FjaGUpO1xufTsgLy8gaGFuZGxlIHNwbGl0dGluZyBhcGFydCBwYWRkaW5nLCBtYXJnaW4sIGJvcmRlcldpZHRoLCBhbmQgYm9yZGVyUmFkaXVzIGludG8gdGhlaXIgNCBjb21wb25lbnRzLiBGaXJlZm94LCBmb3IgZXhhbXBsZSwgd29uJ3QgcmVwb3J0IGJvcmRlclJhZGl1cyBjb3JyZWN0bHkgLSBpdCB3aWxsIG9ubHkgZG8gYm9yZGVyVG9wTGVmdFJhZGl1cyBhbmQgdGhlIG90aGVyIGNvcm5lcnMuIFdlIGFsc28gd2FudCB0byBoYW5kbGUgcGFkZGluZ1RvcCwgbWFyZ2luTGVmdCwgYm9yZGVyUmlnaHRXaWR0aCwgZXRjLlxuXG5cbl9mb3JFYWNoTmFtZShcInBhZGRpbmcsbWFyZ2luLFdpZHRoLFJhZGl1c1wiLCBmdW5jdGlvbiAobmFtZSwgaW5kZXgpIHtcbiAgdmFyIHQgPSBcIlRvcFwiLFxuICAgICAgciA9IFwiUmlnaHRcIixcbiAgICAgIGIgPSBcIkJvdHRvbVwiLFxuICAgICAgbCA9IFwiTGVmdFwiLFxuICAgICAgcHJvcHMgPSAoaW5kZXggPCAzID8gW3QsIHIsIGIsIGxdIDogW3QgKyBsLCB0ICsgciwgYiArIHIsIGIgKyBsXSkubWFwKGZ1bmN0aW9uIChzaWRlKSB7XG4gICAgcmV0dXJuIGluZGV4IDwgMiA/IG5hbWUgKyBzaWRlIDogXCJib3JkZXJcIiArIHNpZGUgKyBuYW1lO1xuICB9KTtcblxuICBfc3BlY2lhbFByb3BzW2luZGV4ID4gMSA/IFwiYm9yZGVyXCIgKyBuYW1lIDogbmFtZV0gPSBmdW5jdGlvbiAocGx1Z2luLCB0YXJnZXQsIHByb3BlcnR5LCBlbmRWYWx1ZSwgdHdlZW4pIHtcbiAgICB2YXIgYSwgdmFycztcblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgNCkge1xuICAgICAgLy8gZ2V0dGVyLCBwYXNzZWQgdGFyZ2V0LCBwcm9wZXJ0eSwgYW5kIHVuaXQgKGZyb20gX2dldCgpKVxuICAgICAgYSA9IHByb3BzLm1hcChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICByZXR1cm4gX2dldChwbHVnaW4sIHByb3AsIHByb3BlcnR5KTtcbiAgICAgIH0pO1xuICAgICAgdmFycyA9IGEuam9pbihcIiBcIik7XG4gICAgICByZXR1cm4gdmFycy5zcGxpdChhWzBdKS5sZW5ndGggPT09IDUgPyBhWzBdIDogdmFycztcbiAgICB9XG5cbiAgICBhID0gKGVuZFZhbHVlICsgXCJcIikuc3BsaXQoXCIgXCIpO1xuICAgIHZhcnMgPSB7fTtcbiAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wLCBpKSB7XG4gICAgICByZXR1cm4gdmFyc1twcm9wXSA9IGFbaV0gPSBhW2ldIHx8IGFbKGkgLSAxKSAvIDIgfCAwXTtcbiAgICB9KTtcbiAgICBwbHVnaW4uaW5pdCh0YXJnZXQsIHZhcnMsIHR3ZWVuKTtcbiAgfTtcbn0pO1xuXG5leHBvcnQgdmFyIENTU1BsdWdpbiA9IHtcbiAgbmFtZTogXCJjc3NcIixcbiAgcmVnaXN0ZXI6IF9pbml0Q29yZSxcbiAgdGFyZ2V0VGVzdDogZnVuY3Rpb24gdGFyZ2V0VGVzdCh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGFyZ2V0LnN0eWxlICYmIHRhcmdldC5ub2RlVHlwZTtcbiAgfSxcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCh0YXJnZXQsIHZhcnMsIHR3ZWVuLCBpbmRleCwgdGFyZ2V0cykge1xuICAgIHZhciBwcm9wcyA9IHRoaXMuX3Byb3BzLFxuICAgICAgICBzdHlsZSA9IHRhcmdldC5zdHlsZSxcbiAgICAgICAgc3RhcnRBdCA9IHR3ZWVuLnZhcnMuc3RhcnRBdCxcbiAgICAgICAgc3RhcnRWYWx1ZSxcbiAgICAgICAgZW5kVmFsdWUsXG4gICAgICAgIGVuZE51bSxcbiAgICAgICAgc3RhcnROdW0sXG4gICAgICAgIHR5cGUsXG4gICAgICAgIHNwZWNpYWxQcm9wLFxuICAgICAgICBwLFxuICAgICAgICBzdGFydFVuaXQsXG4gICAgICAgIGVuZFVuaXQsXG4gICAgICAgIHJlbGF0aXZlLFxuICAgICAgICBpc1RyYW5zZm9ybVJlbGF0ZWQsXG4gICAgICAgIHRyYW5zZm9ybVByb3BUd2VlbixcbiAgICAgICAgY2FjaGUsXG4gICAgICAgIHNtb290aCxcbiAgICAgICAgaGFzUHJpb3JpdHksXG4gICAgICAgIGlubGluZVByb3BzO1xuICAgIF9wbHVnaW5Jbml0dGVkIHx8IF9pbml0Q29yZSgpOyAvLyB3ZSBtYXkgY2FsbCBpbml0KCkgbXVsdGlwbGUgdGltZXMgb24gdGhlIHNhbWUgcGx1Z2luIGluc3RhbmNlLCBsaWtlIHdoZW4gYWRkaW5nIHNwZWNpYWwgcHJvcGVydGllcywgc28gbWFrZSBzdXJlIHdlIGRvbid0IG92ZXJ3cml0ZSB0aGUgcmV2ZXJ0IGRhdGEgb3IgaW5saW5lUHJvcHNcblxuICAgIHRoaXMuc3R5bGVzID0gdGhpcy5zdHlsZXMgfHwgX2dldFN0eWxlU2F2ZXIodGFyZ2V0KTtcbiAgICBpbmxpbmVQcm9wcyA9IHRoaXMuc3R5bGVzLnByb3BzO1xuICAgIHRoaXMudHdlZW4gPSB0d2VlbjtcblxuICAgIGZvciAocCBpbiB2YXJzKSB7XG4gICAgICBpZiAocCA9PT0gXCJhdXRvUm91bmRcIikge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgZW5kVmFsdWUgPSB2YXJzW3BdO1xuXG4gICAgICBpZiAoX3BsdWdpbnNbcF0gJiYgX2NoZWNrUGx1Z2luKHAsIHZhcnMsIHR3ZWVuLCBpbmRleCwgdGFyZ2V0LCB0YXJnZXRzKSkge1xuICAgICAgICAvLyBwbHVnaW5zXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB0eXBlID0gdHlwZW9mIGVuZFZhbHVlO1xuICAgICAgc3BlY2lhbFByb3AgPSBfc3BlY2lhbFByb3BzW3BdO1xuXG4gICAgICBpZiAodHlwZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGVuZFZhbHVlID0gZW5kVmFsdWUuY2FsbCh0d2VlbiwgaW5kZXgsIHRhcmdldCwgdGFyZ2V0cyk7XG4gICAgICAgIHR5cGUgPSB0eXBlb2YgZW5kVmFsdWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlID09PSBcInN0cmluZ1wiICYmIH5lbmRWYWx1ZS5pbmRleE9mKFwicmFuZG9tKFwiKSkge1xuICAgICAgICBlbmRWYWx1ZSA9IF9yZXBsYWNlUmFuZG9tKGVuZFZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNwZWNpYWxQcm9wKSB7XG4gICAgICAgIHNwZWNpYWxQcm9wKHRoaXMsIHRhcmdldCwgcCwgZW5kVmFsdWUsIHR3ZWVuKSAmJiAoaGFzUHJpb3JpdHkgPSAxKTtcbiAgICAgIH0gZWxzZSBpZiAocC5zdWJzdHIoMCwgMikgPT09IFwiLS1cIikge1xuICAgICAgICAvL0NTUyB2YXJpYWJsZVxuICAgICAgICBzdGFydFZhbHVlID0gKGdldENvbXB1dGVkU3R5bGUodGFyZ2V0KS5nZXRQcm9wZXJ0eVZhbHVlKHApICsgXCJcIikudHJpbSgpO1xuICAgICAgICBlbmRWYWx1ZSArPSBcIlwiO1xuICAgICAgICBfY29sb3JFeHAubGFzdEluZGV4ID0gMDtcblxuICAgICAgICBpZiAoIV9jb2xvckV4cC50ZXN0KHN0YXJ0VmFsdWUpKSB7XG4gICAgICAgICAgLy8gY29sb3JzIGRvbid0IGhhdmUgdW5pdHNcbiAgICAgICAgICBzdGFydFVuaXQgPSBnZXRVbml0KHN0YXJ0VmFsdWUpO1xuICAgICAgICAgIGVuZFVuaXQgPSBnZXRVbml0KGVuZFZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVuZFVuaXQgPyBzdGFydFVuaXQgIT09IGVuZFVuaXQgJiYgKHN0YXJ0VmFsdWUgPSBfY29udmVydFRvVW5pdCh0YXJnZXQsIHAsIHN0YXJ0VmFsdWUsIGVuZFVuaXQpICsgZW5kVW5pdCkgOiBzdGFydFVuaXQgJiYgKGVuZFZhbHVlICs9IHN0YXJ0VW5pdCk7XG4gICAgICAgIHRoaXMuYWRkKHN0eWxlLCBcInNldFByb3BlcnR5XCIsIHN0YXJ0VmFsdWUsIGVuZFZhbHVlLCBpbmRleCwgdGFyZ2V0cywgMCwgMCwgcCk7XG4gICAgICAgIHByb3BzLnB1c2gocCk7XG4gICAgICAgIGlubGluZVByb3BzLnB1c2gocCwgMCwgc3R5bGVbcF0pO1xuICAgICAgfSBlbHNlIGlmICh0eXBlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmIChzdGFydEF0ICYmIHAgaW4gc3RhcnRBdCkge1xuICAgICAgICAgIC8vIGluIGNhc2Ugc29tZW9uZSBoYXJkLWNvZGVzIGEgY29tcGxleCB2YWx1ZSBhcyB0aGUgc3RhcnQsIGxpa2UgdG9wOiBcImNhbGMoMnZoIC8gMilcIi4gV2l0aG91dCB0aGlzLCBpdCdkIHVzZSB0aGUgY29tcHV0ZWQgdmFsdWUgKGFsd2F5cyBpbiBweClcbiAgICAgICAgICBzdGFydFZhbHVlID0gdHlwZW9mIHN0YXJ0QXRbcF0gPT09IFwiZnVuY3Rpb25cIiA/IHN0YXJ0QXRbcF0uY2FsbCh0d2VlbiwgaW5kZXgsIHRhcmdldCwgdGFyZ2V0cykgOiBzdGFydEF0W3BdO1xuICAgICAgICAgIF9pc1N0cmluZyhzdGFydFZhbHVlKSAmJiB+c3RhcnRWYWx1ZS5pbmRleE9mKFwicmFuZG9tKFwiKSAmJiAoc3RhcnRWYWx1ZSA9IF9yZXBsYWNlUmFuZG9tKHN0YXJ0VmFsdWUpKTtcbiAgICAgICAgICBnZXRVbml0KHN0YXJ0VmFsdWUgKyBcIlwiKSB8fCAoc3RhcnRWYWx1ZSArPSBfY29uZmlnLnVuaXRzW3BdIHx8IGdldFVuaXQoX2dldCh0YXJnZXQsIHApKSB8fCBcIlwiKTsgLy8gZm9yIGNhc2VzIHdoZW4gc29tZW9uZSBwYXNzZXMgaW4gYSB1bml0bGVzcyB2YWx1ZSBsaWtlIHt4OiAxMDB9OyBpZiB3ZSB0cnkgc2V0dGluZyB0cmFuc2xhdGUoMTAwLCAwcHgpIGl0IHdvbid0IHdvcmsuXG5cbiAgICAgICAgICAoc3RhcnRWYWx1ZSArIFwiXCIpLmNoYXJBdCgxKSA9PT0gXCI9XCIgJiYgKHN0YXJ0VmFsdWUgPSBfZ2V0KHRhcmdldCwgcCkpOyAvLyBjYW4ndCB3b3JrIHdpdGggcmVsYXRpdmUgdmFsdWVzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RhcnRWYWx1ZSA9IF9nZXQodGFyZ2V0LCBwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0TnVtID0gcGFyc2VGbG9hdChzdGFydFZhbHVlKTtcbiAgICAgICAgcmVsYXRpdmUgPSB0eXBlID09PSBcInN0cmluZ1wiICYmIGVuZFZhbHVlLmNoYXJBdCgxKSA9PT0gXCI9XCIgJiYgZW5kVmFsdWUuc3Vic3RyKDAsIDIpO1xuICAgICAgICByZWxhdGl2ZSAmJiAoZW5kVmFsdWUgPSBlbmRWYWx1ZS5zdWJzdHIoMikpO1xuICAgICAgICBlbmROdW0gPSBwYXJzZUZsb2F0KGVuZFZhbHVlKTtcblxuICAgICAgICBpZiAocCBpbiBfcHJvcGVydHlBbGlhc2VzKSB7XG4gICAgICAgICAgaWYgKHAgPT09IFwiYXV0b0FscGhhXCIpIHtcbiAgICAgICAgICAgIC8vc3BlY2lhbCBjYXNlIHdoZXJlIHdlIGNvbnRyb2wgdGhlIHZpc2liaWxpdHkgYWxvbmcgd2l0aCBvcGFjaXR5LiBXZSBzdGlsbCBhbGxvdyB0aGUgb3BhY2l0eSB2YWx1ZSB0byBwYXNzIHRocm91Z2ggYW5kIGdldCB0d2VlbmVkLlxuICAgICAgICAgICAgaWYgKHN0YXJ0TnVtID09PSAxICYmIF9nZXQodGFyZ2V0LCBcInZpc2liaWxpdHlcIikgPT09IFwiaGlkZGVuXCIgJiYgZW5kTnVtKSB7XG4gICAgICAgICAgICAgIC8vaWYgdmlzaWJpbGl0eSBpcyBpbml0aWFsbHkgc2V0IHRvIFwiaGlkZGVuXCIsIHdlIHNob3VsZCBpbnRlcnByZXQgdGhhdCBhcyBpbnRlbnQgdG8gbWFrZSBvcGFjaXR5IDAgKGEgY29udmVuaWVuY2UpXG4gICAgICAgICAgICAgIHN0YXJ0TnVtID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaW5saW5lUHJvcHMucHVzaChcInZpc2liaWxpdHlcIiwgMCwgc3R5bGUudmlzaWJpbGl0eSk7XG5cbiAgICAgICAgICAgIF9hZGROb25Ud2VlbmluZ1BUKHRoaXMsIHN0eWxlLCBcInZpc2liaWxpdHlcIiwgc3RhcnROdW0gPyBcImluaGVyaXRcIiA6IFwiaGlkZGVuXCIsIGVuZE51bSA/IFwiaW5oZXJpdFwiIDogXCJoaWRkZW5cIiwgIWVuZE51bSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHAgIT09IFwic2NhbGVcIiAmJiBwICE9PSBcInRyYW5zZm9ybVwiKSB7XG4gICAgICAgICAgICBwID0gX3Byb3BlcnR5QWxpYXNlc1twXTtcbiAgICAgICAgICAgIH5wLmluZGV4T2YoXCIsXCIpICYmIChwID0gcC5zcGxpdChcIixcIilbMF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlzVHJhbnNmb3JtUmVsYXRlZCA9IHAgaW4gX3RyYW5zZm9ybVByb3BzOyAvLy0tLSBUUkFOU0ZPUk0tUkVMQVRFRCAtLS1cblxuICAgICAgICBpZiAoaXNUcmFuc2Zvcm1SZWxhdGVkKSB7XG4gICAgICAgICAgdGhpcy5zdHlsZXMuc2F2ZShwKTtcblxuICAgICAgICAgIGlmICghdHJhbnNmb3JtUHJvcFR3ZWVuKSB7XG4gICAgICAgICAgICBjYWNoZSA9IHRhcmdldC5fZ3NhcDtcbiAgICAgICAgICAgIGNhY2hlLnJlbmRlclRyYW5zZm9ybSAmJiAhdmFycy5wYXJzZVRyYW5zZm9ybSB8fCBfcGFyc2VUcmFuc2Zvcm0odGFyZ2V0LCB2YXJzLnBhcnNlVHJhbnNmb3JtKTsgLy8gaWYsIGZvciBleGFtcGxlLCBnc2FwLnNldCguLi4ge3RyYW5zZm9ybTpcInRyYW5zbGF0ZVgoNTB2dylcIn0pLCB0aGUgX2dldCgpIGNhbGwgZG9lc24ndCBwYXJzZSB0aGUgdHJhbnNmb3JtLCB0aHVzIGNhY2hlLnJlbmRlclRyYW5zZm9ybSB3b24ndCBiZSBzZXQgeWV0IHNvIGZvcmNlIHRoZSBwYXJzaW5nIG9mIHRoZSB0cmFuc2Zvcm0gaGVyZS5cblxuICAgICAgICAgICAgc21vb3RoID0gdmFycy5zbW9vdGhPcmlnaW4gIT09IGZhbHNlICYmIGNhY2hlLnNtb290aDtcbiAgICAgICAgICAgIHRyYW5zZm9ybVByb3BUd2VlbiA9IHRoaXMuX3B0ID0gbmV3IFByb3BUd2Vlbih0aGlzLl9wdCwgc3R5bGUsIF90cmFuc2Zvcm1Qcm9wLCAwLCAxLCBjYWNoZS5yZW5kZXJUcmFuc2Zvcm0sIGNhY2hlLCAwLCAtMSk7IC8vdGhlIGZpcnN0IHRpbWUgdGhyb3VnaCwgY3JlYXRlIHRoZSByZW5kZXJpbmcgUHJvcFR3ZWVuIHNvIHRoYXQgaXQgcnVucyBMQVNUIChpbiB0aGUgbGlua2VkIGxpc3QsIHdlIGtlZXAgYWRkaW5nIHRvIHRoZSBiZWdpbm5pbmcpXG5cbiAgICAgICAgICAgIHRyYW5zZm9ybVByb3BUd2Vlbi5kZXAgPSAxOyAvL2ZsYWcgaXQgYXMgZGVwZW5kZW50IHNvIHRoYXQgaWYgdGhpbmdzIGdldCBraWxsZWQvb3ZlcndyaXR0ZW4gYW5kIHRoaXMgaXMgdGhlIG9ubHkgUHJvcFR3ZWVuIGxlZnQsIHdlIGNhbiBzYWZlbHkga2lsbCB0aGUgd2hvbGUgdHdlZW4uXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHAgPT09IFwic2NhbGVcIikge1xuICAgICAgICAgICAgdGhpcy5fcHQgPSBuZXcgUHJvcFR3ZWVuKHRoaXMuX3B0LCBjYWNoZSwgXCJzY2FsZVlcIiwgY2FjaGUuc2NhbGVZLCAocmVsYXRpdmUgPyBfcGFyc2VSZWxhdGl2ZShjYWNoZS5zY2FsZVksIHJlbGF0aXZlICsgZW5kTnVtKSA6IGVuZE51bSkgLSBjYWNoZS5zY2FsZVkgfHwgMCwgX3JlbmRlckNTU1Byb3ApO1xuICAgICAgICAgICAgdGhpcy5fcHQudSA9IDA7XG4gICAgICAgICAgICBwcm9wcy5wdXNoKFwic2NhbGVZXCIsIHApO1xuICAgICAgICAgICAgcCArPSBcIlhcIjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHAgPT09IFwidHJhbnNmb3JtT3JpZ2luXCIpIHtcbiAgICAgICAgICAgIGlubGluZVByb3BzLnB1c2goX3RyYW5zZm9ybU9yaWdpblByb3AsIDAsIHN0eWxlW190cmFuc2Zvcm1PcmlnaW5Qcm9wXSk7XG4gICAgICAgICAgICBlbmRWYWx1ZSA9IF9jb252ZXJ0S2V5d29yZHNUb1BlcmNlbnRhZ2VzKGVuZFZhbHVlKTsgLy9pbiBjYXNlIHNvbWV0aGluZyBsaWtlIFwibGVmdCB0b3BcIiBvciBcImJvdHRvbSByaWdodFwiIGlzIHBhc3NlZCBpbi4gQ29udmVydCB0byBwZXJjZW50YWdlcy5cblxuICAgICAgICAgICAgaWYgKGNhY2hlLnN2Zykge1xuICAgICAgICAgICAgICBfYXBwbHlTVkdPcmlnaW4odGFyZ2V0LCBlbmRWYWx1ZSwgMCwgc21vb3RoLCAwLCB0aGlzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVuZFVuaXQgPSBwYXJzZUZsb2F0KGVuZFZhbHVlLnNwbGl0KFwiIFwiKVsyXSkgfHwgMDsgLy9oYW5kbGUgdGhlIHpPcmlnaW4gc2VwYXJhdGVseSFcblxuICAgICAgICAgICAgICBlbmRVbml0ICE9PSBjYWNoZS56T3JpZ2luICYmIF9hZGROb25Ud2VlbmluZ1BUKHRoaXMsIGNhY2hlLCBcInpPcmlnaW5cIiwgY2FjaGUuek9yaWdpbiwgZW5kVW5pdCk7XG5cbiAgICAgICAgICAgICAgX2FkZE5vblR3ZWVuaW5nUFQodGhpcywgc3R5bGUsIHAsIF9maXJzdFR3b09ubHkoc3RhcnRWYWx1ZSksIF9maXJzdFR3b09ubHkoZW5kVmFsdWUpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChwID09PSBcInN2Z09yaWdpblwiKSB7XG4gICAgICAgICAgICBfYXBwbHlTVkdPcmlnaW4odGFyZ2V0LCBlbmRWYWx1ZSwgMSwgc21vb3RoLCAwLCB0aGlzKTtcblxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChwIGluIF9yb3RhdGlvbmFsUHJvcGVydGllcykge1xuICAgICAgICAgICAgX2FkZFJvdGF0aW9uYWxQcm9wVHdlZW4odGhpcywgY2FjaGUsIHAsIHN0YXJ0TnVtLCByZWxhdGl2ZSA/IF9wYXJzZVJlbGF0aXZlKHN0YXJ0TnVtLCByZWxhdGl2ZSArIGVuZFZhbHVlKSA6IGVuZFZhbHVlKTtcblxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChwID09PSBcInNtb290aE9yaWdpblwiKSB7XG4gICAgICAgICAgICBfYWRkTm9uVHdlZW5pbmdQVCh0aGlzLCBjYWNoZSwgXCJzbW9vdGhcIiwgY2FjaGUuc21vb3RoLCBlbmRWYWx1ZSk7XG5cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAocCA9PT0gXCJmb3JjZTNEXCIpIHtcbiAgICAgICAgICAgIGNhY2hlW3BdID0gZW5kVmFsdWU7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHAgPT09IFwidHJhbnNmb3JtXCIpIHtcbiAgICAgICAgICAgIF9hZGRSYXdUcmFuc2Zvcm1QVHModGhpcywgZW5kVmFsdWUsIHRhcmdldCk7XG5cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICghKHAgaW4gc3R5bGUpKSB7XG4gICAgICAgICAgcCA9IF9jaGVja1Byb3BQcmVmaXgocCkgfHwgcDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1RyYW5zZm9ybVJlbGF0ZWQgfHwgKGVuZE51bSB8fCBlbmROdW0gPT09IDApICYmIChzdGFydE51bSB8fCBzdGFydE51bSA9PT0gMCkgJiYgIV9jb21wbGV4RXhwLnRlc3QoZW5kVmFsdWUpICYmIHAgaW4gc3R5bGUpIHtcbiAgICAgICAgICBzdGFydFVuaXQgPSAoc3RhcnRWYWx1ZSArIFwiXCIpLnN1YnN0cigoc3RhcnROdW0gKyBcIlwiKS5sZW5ndGgpO1xuICAgICAgICAgIGVuZE51bSB8fCAoZW5kTnVtID0gMCk7IC8vIHByb3RlY3QgYWdhaW5zdCBOYU5cblxuICAgICAgICAgIGVuZFVuaXQgPSBnZXRVbml0KGVuZFZhbHVlKSB8fCAocCBpbiBfY29uZmlnLnVuaXRzID8gX2NvbmZpZy51bml0c1twXSA6IHN0YXJ0VW5pdCk7XG4gICAgICAgICAgc3RhcnRVbml0ICE9PSBlbmRVbml0ICYmIChzdGFydE51bSA9IF9jb252ZXJ0VG9Vbml0KHRhcmdldCwgcCwgc3RhcnRWYWx1ZSwgZW5kVW5pdCkpO1xuICAgICAgICAgIHRoaXMuX3B0ID0gbmV3IFByb3BUd2Vlbih0aGlzLl9wdCwgaXNUcmFuc2Zvcm1SZWxhdGVkID8gY2FjaGUgOiBzdHlsZSwgcCwgc3RhcnROdW0sIChyZWxhdGl2ZSA/IF9wYXJzZVJlbGF0aXZlKHN0YXJ0TnVtLCByZWxhdGl2ZSArIGVuZE51bSkgOiBlbmROdW0pIC0gc3RhcnROdW0sICFpc1RyYW5zZm9ybVJlbGF0ZWQgJiYgKGVuZFVuaXQgPT09IFwicHhcIiB8fCBwID09PSBcInpJbmRleFwiKSAmJiB2YXJzLmF1dG9Sb3VuZCAhPT0gZmFsc2UgPyBfcmVuZGVyUm91bmRlZENTU1Byb3AgOiBfcmVuZGVyQ1NTUHJvcCk7XG4gICAgICAgICAgdGhpcy5fcHQudSA9IGVuZFVuaXQgfHwgMDtcblxuICAgICAgICAgIGlmIChzdGFydFVuaXQgIT09IGVuZFVuaXQgJiYgZW5kVW5pdCAhPT0gXCIlXCIpIHtcbiAgICAgICAgICAgIC8vd2hlbiB0aGUgdHdlZW4gZ29lcyBhbGwgdGhlIHdheSBiYWNrIHRvIHRoZSBiZWdpbm5pbmcsIHdlIG5lZWQgdG8gcmV2ZXJ0IGl0IHRvIHRoZSBPTEQvT1JJR0lOQUwgdmFsdWUgKHdpdGggdGhvc2UgdW5pdHMpLiBXZSByZWNvcmQgdGhhdCBhcyBhIFwiYlwiIChiZWdpbm5pbmcpIHByb3BlcnR5IGFuZCBwb2ludCB0byBhIHJlbmRlciBtZXRob2QgdGhhdCBoYW5kbGVzIHRoYXQuIChwZXJmb3JtYW5jZSBvcHRpbWl6YXRpb24pXG4gICAgICAgICAgICB0aGlzLl9wdC5iID0gc3RhcnRWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX3B0LnIgPSBfcmVuZGVyQ1NTUHJvcFdpdGhCZWdpbm5pbmc7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCEocCBpbiBzdHlsZSkpIHtcbiAgICAgICAgICBpZiAocCBpbiB0YXJnZXQpIHtcbiAgICAgICAgICAgIC8vbWF5YmUgaXQncyBub3QgYSBzdHlsZSAtIGl0IGNvdWxkIGJlIGEgcHJvcGVydHkgYWRkZWQgZGlyZWN0bHkgdG8gYW4gZWxlbWVudCBpbiB3aGljaCBjYXNlIHdlJ2xsIHRyeSB0byBhbmltYXRlIHRoYXQuXG4gICAgICAgICAgICB0aGlzLmFkZCh0YXJnZXQsIHAsIHN0YXJ0VmFsdWUgfHwgdGFyZ2V0W3BdLCByZWxhdGl2ZSA/IHJlbGF0aXZlICsgZW5kVmFsdWUgOiBlbmRWYWx1ZSwgaW5kZXgsIHRhcmdldHMpO1xuICAgICAgICAgIH0gZWxzZSBpZiAocCAhPT0gXCJwYXJzZVRyYW5zZm9ybVwiKSB7XG4gICAgICAgICAgICBfbWlzc2luZ1BsdWdpbihwLCBlbmRWYWx1ZSk7XG5cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdHdlZW5Db21wbGV4Q1NTU3RyaW5nLmNhbGwodGhpcywgdGFyZ2V0LCBwLCBzdGFydFZhbHVlLCByZWxhdGl2ZSA/IHJlbGF0aXZlICsgZW5kVmFsdWUgOiBlbmRWYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpc1RyYW5zZm9ybVJlbGF0ZWQgfHwgKHAgaW4gc3R5bGUgPyBpbmxpbmVQcm9wcy5wdXNoKHAsIDAsIHN0eWxlW3BdKSA6IGlubGluZVByb3BzLnB1c2gocCwgMSwgc3RhcnRWYWx1ZSB8fCB0YXJnZXRbcF0pKTtcbiAgICAgICAgcHJvcHMucHVzaChwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNQcmlvcml0eSAmJiBfc29ydFByb3BUd2VlbnNCeVByaW9yaXR5KHRoaXMpO1xuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcihyYXRpbywgZGF0YSkge1xuICAgIGlmIChkYXRhLnR3ZWVuLl90aW1lIHx8ICFfcmV2ZXJ0aW5nKCkpIHtcbiAgICAgIHZhciBwdCA9IGRhdGEuX3B0O1xuXG4gICAgICB3aGlsZSAocHQpIHtcbiAgICAgICAgcHQucihyYXRpbywgcHQuZCk7XG4gICAgICAgIHB0ID0gcHQuX25leHQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEuc3R5bGVzLnJldmVydCgpO1xuICAgIH1cbiAgfSxcbiAgZ2V0OiBfZ2V0LFxuICBhbGlhc2VzOiBfcHJvcGVydHlBbGlhc2VzLFxuICBnZXRTZXR0ZXI6IGZ1bmN0aW9uIGdldFNldHRlcih0YXJnZXQsIHByb3BlcnR5LCBwbHVnaW4pIHtcbiAgICAvL3JldHVybnMgYSBzZXR0ZXIgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIHRhcmdldCwgcHJvcGVydHksIHZhbHVlIGFuZCBhcHBsaWVzIGl0IGFjY29yZGluZ2x5LiBSZW1lbWJlciwgcHJvcGVydGllcyBsaWtlIFwieFwiIGFyZW4ndCBhcyBzaW1wbGUgYXMgdGFyZ2V0LnN0eWxlLnByb3BlcnR5ID0gdmFsdWUgYmVjYXVzZSB0aGV5J3ZlIGdvdCB0byBiZSBhcHBsaWVkIHRvIGEgcHJveHkgb2JqZWN0IGFuZCB0aGVuIG1lcmdlZCBpbnRvIGEgdHJhbnNmb3JtIHN0cmluZyBpbiBhIHJlbmRlcmVyLlxuICAgIHZhciBwID0gX3Byb3BlcnR5QWxpYXNlc1twcm9wZXJ0eV07XG4gICAgcCAmJiBwLmluZGV4T2YoXCIsXCIpIDwgMCAmJiAocHJvcGVydHkgPSBwKTtcbiAgICByZXR1cm4gcHJvcGVydHkgaW4gX3RyYW5zZm9ybVByb3BzICYmIHByb3BlcnR5ICE9PSBfdHJhbnNmb3JtT3JpZ2luUHJvcCAmJiAodGFyZ2V0Ll9nc2FwLnggfHwgX2dldCh0YXJnZXQsIFwieFwiKSkgPyBwbHVnaW4gJiYgX3JlY2VudFNldHRlclBsdWdpbiA9PT0gcGx1Z2luID8gcHJvcGVydHkgPT09IFwic2NhbGVcIiA/IF9zZXR0ZXJTY2FsZSA6IF9zZXR0ZXJUcmFuc2Zvcm0gOiAoX3JlY2VudFNldHRlclBsdWdpbiA9IHBsdWdpbiB8fCB7fSkgJiYgKHByb3BlcnR5ID09PSBcInNjYWxlXCIgPyBfc2V0dGVyU2NhbGVXaXRoUmVuZGVyIDogX3NldHRlclRyYW5zZm9ybVdpdGhSZW5kZXIpIDogdGFyZ2V0LnN0eWxlICYmICFfaXNVbmRlZmluZWQodGFyZ2V0LnN0eWxlW3Byb3BlcnR5XSkgPyBfc2V0dGVyQ1NTU3R5bGUgOiB+cHJvcGVydHkuaW5kZXhPZihcIi1cIikgPyBfc2V0dGVyQ1NTUHJvcCA6IF9nZXRTZXR0ZXIodGFyZ2V0LCBwcm9wZXJ0eSk7XG4gIH0sXG4gIGNvcmU6IHtcbiAgICBfcmVtb3ZlUHJvcGVydHk6IF9yZW1vdmVQcm9wZXJ0eSxcbiAgICBfZ2V0TWF0cml4OiBfZ2V0TWF0cml4XG4gIH1cbn07XG5nc2FwLnV0aWxzLmNoZWNrUHJlZml4ID0gX2NoZWNrUHJvcFByZWZpeDtcbmdzYXAuY29yZS5nZXRTdHlsZVNhdmVyID0gX2dldFN0eWxlU2F2ZXI7XG5cbihmdW5jdGlvbiAocG9zaXRpb25BbmRTY2FsZSwgcm90YXRpb24sIG90aGVycywgYWxpYXNlcykge1xuICB2YXIgYWxsID0gX2ZvckVhY2hOYW1lKHBvc2l0aW9uQW5kU2NhbGUgKyBcIixcIiArIHJvdGF0aW9uICsgXCIsXCIgKyBvdGhlcnMsIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgX3RyYW5zZm9ybVByb3BzW25hbWVdID0gMTtcbiAgfSk7XG5cbiAgX2ZvckVhY2hOYW1lKHJvdGF0aW9uLCBmdW5jdGlvbiAobmFtZSkge1xuICAgIF9jb25maWcudW5pdHNbbmFtZV0gPSBcImRlZ1wiO1xuICAgIF9yb3RhdGlvbmFsUHJvcGVydGllc1tuYW1lXSA9IDE7XG4gIH0pO1xuXG4gIF9wcm9wZXJ0eUFsaWFzZXNbYWxsWzEzXV0gPSBwb3NpdGlvbkFuZFNjYWxlICsgXCIsXCIgKyByb3RhdGlvbjtcblxuICBfZm9yRWFjaE5hbWUoYWxpYXNlcywgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgc3BsaXQgPSBuYW1lLnNwbGl0KFwiOlwiKTtcbiAgICBfcHJvcGVydHlBbGlhc2VzW3NwbGl0WzFdXSA9IGFsbFtzcGxpdFswXV07XG4gIH0pO1xufSkoXCJ4LHkseixzY2FsZSxzY2FsZVgsc2NhbGVZLHhQZXJjZW50LHlQZXJjZW50XCIsIFwicm90YXRpb24scm90YXRpb25YLHJvdGF0aW9uWSxza2V3WCxza2V3WVwiLCBcInRyYW5zZm9ybSx0cmFuc2Zvcm1PcmlnaW4sc3ZnT3JpZ2luLGZvcmNlM0Qsc21vb3RoT3JpZ2luLHRyYW5zZm9ybVBlcnNwZWN0aXZlXCIsIFwiMDp0cmFuc2xhdGVYLDE6dHJhbnNsYXRlWSwyOnRyYW5zbGF0ZVosODpyb3RhdGUsODpyb3RhdGlvblosODpyb3RhdGVaLDk6cm90YXRlWCwxMDpyb3RhdGVZXCIpO1xuXG5fZm9yRWFjaE5hbWUoXCJ4LHkseix0b3AscmlnaHQsYm90dG9tLGxlZnQsd2lkdGgsaGVpZ2h0LGZvbnRTaXplLHBhZGRpbmcsbWFyZ2luLHBlcnNwZWN0aXZlXCIsIGZ1bmN0aW9uIChuYW1lKSB7XG4gIF9jb25maWcudW5pdHNbbmFtZV0gPSBcInB4XCI7XG59KTtcblxuZ3NhcC5yZWdpc3RlclBsdWdpbihDU1NQbHVnaW4pO1xuZXhwb3J0IHsgQ1NTUGx1Z2luIGFzIGRlZmF1bHQsIF9nZXRCQm94LCBfY3JlYXRlRWxlbWVudCwgX2NoZWNrUHJvcFByZWZpeCBhcyBjaGVja1ByZWZpeCB9OyIsImZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyohXG4gKiBHU0FQIDMuMTIuMVxuICogaHR0cHM6Ly9ncmVlbnNvY2suY29tXG4gKlxuICogQGxpY2Vuc2UgQ29weXJpZ2h0IDIwMDgtMjAyMywgR3JlZW5Tb2NrLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogU3ViamVjdCB0byB0aGUgdGVybXMgYXQgaHR0cHM6Ly9ncmVlbnNvY2suY29tL3N0YW5kYXJkLWxpY2Vuc2Ugb3IgZm9yXG4gKiBDbHViIEdyZWVuU29jayBtZW1iZXJzLCB0aGUgYWdyZWVtZW50IGlzc3VlZCB3aXRoIHRoYXQgbWVtYmVyc2hpcC5cbiAqIEBhdXRob3I6IEphY2sgRG95bGUsIGphY2tAZ3JlZW5zb2NrLmNvbVxuKi9cblxuLyogZXNsaW50LWRpc2FibGUgKi9cbnZhciBfY29uZmlnID0ge1xuICBhdXRvU2xlZXA6IDEyMCxcbiAgZm9yY2UzRDogXCJhdXRvXCIsXG4gIG51bGxUYXJnZXRXYXJuOiAxLFxuICB1bml0czoge1xuICAgIGxpbmVIZWlnaHQ6IFwiXCJcbiAgfVxufSxcbiAgICBfZGVmYXVsdHMgPSB7XG4gIGR1cmF0aW9uOiAuNSxcbiAgb3ZlcndyaXRlOiBmYWxzZSxcbiAgZGVsYXk6IDBcbn0sXG4gICAgX3N1cHByZXNzT3ZlcndyaXRlcyxcbiAgICBfcmV2ZXJ0aW5nLFxuICAgIF9jb250ZXh0LFxuICAgIF9iaWdOdW0gPSAxZTgsXG4gICAgX3RpbnlOdW0gPSAxIC8gX2JpZ051bSxcbiAgICBfMlBJID0gTWF0aC5QSSAqIDIsXG4gICAgX0hBTEZfUEkgPSBfMlBJIC8gNCxcbiAgICBfZ3NJRCA9IDAsXG4gICAgX3NxcnQgPSBNYXRoLnNxcnQsXG4gICAgX2NvcyA9IE1hdGguY29zLFxuICAgIF9zaW4gPSBNYXRoLnNpbixcbiAgICBfaXNTdHJpbmcgPSBmdW5jdGlvbiBfaXNTdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn0sXG4gICAgX2lzRnVuY3Rpb24gPSBmdW5jdGlvbiBfaXNGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCI7XG59LFxuICAgIF9pc051bWJlciA9IGZ1bmN0aW9uIF9pc051bWJlcih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufSxcbiAgICBfaXNVbmRlZmluZWQgPSBmdW5jdGlvbiBfaXNVbmRlZmluZWQodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIjtcbn0sXG4gICAgX2lzT2JqZWN0ID0gZnVuY3Rpb24gX2lzT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59LFxuICAgIF9pc05vdEZhbHNlID0gZnVuY3Rpb24gX2lzTm90RmFsc2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSBmYWxzZTtcbn0sXG4gICAgX3dpbmRvd0V4aXN0cyA9IGZ1bmN0aW9uIF93aW5kb3dFeGlzdHMoKSB7XG4gIHJldHVybiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiO1xufSxcbiAgICBfaXNGdW5jT3JTdHJpbmcgPSBmdW5jdGlvbiBfaXNGdW5jT3JTdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIF9pc0Z1bmN0aW9uKHZhbHVlKSB8fCBfaXNTdHJpbmcodmFsdWUpO1xufSxcbiAgICBfaXNUeXBlZEFycmF5ID0gdHlwZW9mIEFycmF5QnVmZmVyID09PSBcImZ1bmN0aW9uXCIgJiYgQXJyYXlCdWZmZXIuaXNWaWV3IHx8IGZ1bmN0aW9uICgpIHt9LFxuICAgIC8vIG5vdGU6IElFMTAgaGFzIEFycmF5QnVmZmVyLCBidXQgTk9UIEFycmF5QnVmZmVyLmlzVmlldygpLlxuX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5LFxuICAgIF9zdHJpY3ROdW1FeHAgPSAvKD86LT9cXC4/XFxkfFxcLikrL2dpLFxuICAgIC8vb25seSBudW1iZXJzIChpbmNsdWRpbmcgbmVnYXRpdmVzIGFuZCBkZWNpbWFscykgYnV0IE5PVCByZWxhdGl2ZSB2YWx1ZXMuXG5fbnVtRXhwID0gL1stKz0uXSpcXGQrWy5lXFwtK10qXFxkKltlXFwtK10qXFxkKi9nLFxuICAgIC8vZmluZHMgYW55IG51bWJlcnMsIGluY2x1ZGluZyBvbmVzIHRoYXQgc3RhcnQgd2l0aCArPSBvciAtPSwgbmVnYXRpdmUgbnVtYmVycywgYW5kIG9uZXMgaW4gc2NpZW50aWZpYyBub3RhdGlvbiBsaWtlIDFlLTguXG5fbnVtV2l0aFVuaXRFeHAgPSAvWy0rPS5dKlxcZCtbLmUtXSpcXGQqW2EteiVdKi9nLFxuICAgIF9jb21wbGV4U3RyaW5nTnVtRXhwID0gL1stKz0uXSpcXGQrXFwuP1xcZCooPzplLXxlXFwrKT9cXGQqL2dpLFxuICAgIC8vZHVwbGljYXRlIHNvIHRoYXQgd2hpbGUgd2UncmUgbG9vcGluZyB0aHJvdWdoIG1hdGNoZXMgZnJvbSBleGVjKCksIGl0IGRvZXNuJ3QgY29udGFtaW5hdGUgdGhlIGxhc3RJbmRleCBvZiBfbnVtRXhwIHdoaWNoIHdlIHVzZSB0byBzZWFyY2ggZm9yIGNvbG9ycyB0b28uXG5fcmVsRXhwID0gL1srLV09LT9bLlxcZF0rLyxcbiAgICBfZGVsaW1pdGVkVmFsdWVFeHAgPSAvW14sJ1wiXFxbXFxdXFxzXSsvZ2ksXG4gICAgLy8gcHJldmlvdXNseSAvWyNcXC0rLl0qXFxiW2EtelxcZFxcLT0rJS5dKy9naSBidXQgZGlkbid0IGNhdGNoIHNwZWNpYWwgY2hhcmFjdGVycy5cbl91bml0RXhwID0gL15bK1xcLT1lXFxzXFxkXSpcXGQrWy5cXGRdKihbYS16XSp8JSlcXHMqJC9pLFxuICAgIF9nbG9iYWxUaW1lbGluZSxcbiAgICBfd2luLFxuICAgIF9jb3JlSW5pdHRlZCxcbiAgICBfZG9jLFxuICAgIF9nbG9iYWxzID0ge30sXG4gICAgX2luc3RhbGxTY29wZSA9IHt9LFxuICAgIF9jb3JlUmVhZHksXG4gICAgX2luc3RhbGwgPSBmdW5jdGlvbiBfaW5zdGFsbChzY29wZSkge1xuICByZXR1cm4gKF9pbnN0YWxsU2NvcGUgPSBfbWVyZ2Uoc2NvcGUsIF9nbG9iYWxzKSkgJiYgZ3NhcDtcbn0sXG4gICAgX21pc3NpbmdQbHVnaW4gPSBmdW5jdGlvbiBfbWlzc2luZ1BsdWdpbihwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgcmV0dXJuIGNvbnNvbGUud2FybihcIkludmFsaWQgcHJvcGVydHlcIiwgcHJvcGVydHksIFwic2V0IHRvXCIsIHZhbHVlLCBcIk1pc3NpbmcgcGx1Z2luPyBnc2FwLnJlZ2lzdGVyUGx1Z2luKClcIik7XG59LFxuICAgIF93YXJuID0gZnVuY3Rpb24gX3dhcm4obWVzc2FnZSwgc3VwcHJlc3MpIHtcbiAgcmV0dXJuICFzdXBwcmVzcyAmJiBjb25zb2xlLndhcm4obWVzc2FnZSk7XG59LFxuICAgIF9hZGRHbG9iYWwgPSBmdW5jdGlvbiBfYWRkR2xvYmFsKG5hbWUsIG9iaikge1xuICByZXR1cm4gbmFtZSAmJiAoX2dsb2JhbHNbbmFtZV0gPSBvYmopICYmIF9pbnN0YWxsU2NvcGUgJiYgKF9pbnN0YWxsU2NvcGVbbmFtZV0gPSBvYmopIHx8IF9nbG9iYWxzO1xufSxcbiAgICBfZW1wdHlGdW5jID0gZnVuY3Rpb24gX2VtcHR5RnVuYygpIHtcbiAgcmV0dXJuIDA7XG59LFxuICAgIF9zdGFydEF0UmV2ZXJ0Q29uZmlnID0ge1xuICBzdXBwcmVzc0V2ZW50czogdHJ1ZSxcbiAgaXNTdGFydDogdHJ1ZSxcbiAga2lsbDogZmFsc2Vcbn0sXG4gICAgX3JldmVydENvbmZpZ05vS2lsbCA9IHtcbiAgc3VwcHJlc3NFdmVudHM6IHRydWUsXG4gIGtpbGw6IGZhbHNlXG59LFxuICAgIF9yZXZlcnRDb25maWcgPSB7XG4gIHN1cHByZXNzRXZlbnRzOiB0cnVlXG59LFxuICAgIF9yZXNlcnZlZFByb3BzID0ge30sXG4gICAgX2xhenlUd2VlbnMgPSBbXSxcbiAgICBfbGF6eUxvb2t1cCA9IHt9LFxuICAgIF9sYXN0UmVuZGVyZWRGcmFtZSxcbiAgICBfcGx1Z2lucyA9IHt9LFxuICAgIF9lZmZlY3RzID0ge30sXG4gICAgX25leHRHQ0ZyYW1lID0gMzAsXG4gICAgX2hhcm5lc3NQbHVnaW5zID0gW10sXG4gICAgX2NhbGxiYWNrTmFtZXMgPSBcIlwiLFxuICAgIF9oYXJuZXNzID0gZnVuY3Rpb24gX2hhcm5lc3ModGFyZ2V0cykge1xuICB2YXIgdGFyZ2V0ID0gdGFyZ2V0c1swXSxcbiAgICAgIGhhcm5lc3NQbHVnaW4sXG4gICAgICBpO1xuICBfaXNPYmplY3QodGFyZ2V0KSB8fCBfaXNGdW5jdGlvbih0YXJnZXQpIHx8ICh0YXJnZXRzID0gW3RhcmdldHNdKTtcblxuICBpZiAoIShoYXJuZXNzUGx1Z2luID0gKHRhcmdldC5fZ3NhcCB8fCB7fSkuaGFybmVzcykpIHtcbiAgICAvLyBmaW5kIHRoZSBmaXJzdCB0YXJnZXQgd2l0aCBhIGhhcm5lc3MuIFdlIGFzc3VtZSB0YXJnZXRzIHBhc3NlZCBpbnRvIGFuIGFuaW1hdGlvbiB3aWxsIGJlIG9mIHNpbWlsYXIgdHlwZSwgbWVhbmluZyB0aGUgc2FtZSBraW5kIG9mIGhhcm5lc3MgY2FuIGJlIHVzZWQgZm9yIHRoZW0gYWxsIChwZXJmb3JtYW5jZSBvcHRpbWl6YXRpb24pXG4gICAgaSA9IF9oYXJuZXNzUGx1Z2lucy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tICYmICFfaGFybmVzc1BsdWdpbnNbaV0udGFyZ2V0VGVzdCh0YXJnZXQpKSB7fVxuXG4gICAgaGFybmVzc1BsdWdpbiA9IF9oYXJuZXNzUGx1Z2luc1tpXTtcbiAgfVxuXG4gIGkgPSB0YXJnZXRzLmxlbmd0aDtcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgdGFyZ2V0c1tpXSAmJiAodGFyZ2V0c1tpXS5fZ3NhcCB8fCAodGFyZ2V0c1tpXS5fZ3NhcCA9IG5ldyBHU0NhY2hlKHRhcmdldHNbaV0sIGhhcm5lc3NQbHVnaW4pKSkgfHwgdGFyZ2V0cy5zcGxpY2UoaSwgMSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0cztcbn0sXG4gICAgX2dldENhY2hlID0gZnVuY3Rpb24gX2dldENhY2hlKHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0Ll9nc2FwIHx8IF9oYXJuZXNzKHRvQXJyYXkodGFyZ2V0KSlbMF0uX2dzYXA7XG59LFxuICAgIF9nZXRQcm9wZXJ0eSA9IGZ1bmN0aW9uIF9nZXRQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5LCB2KSB7XG4gIHJldHVybiAodiA9IHRhcmdldFtwcm9wZXJ0eV0pICYmIF9pc0Z1bmN0aW9uKHYpID8gdGFyZ2V0W3Byb3BlcnR5XSgpIDogX2lzVW5kZWZpbmVkKHYpICYmIHRhcmdldC5nZXRBdHRyaWJ1dGUgJiYgdGFyZ2V0LmdldEF0dHJpYnV0ZShwcm9wZXJ0eSkgfHwgdjtcbn0sXG4gICAgX2ZvckVhY2hOYW1lID0gZnVuY3Rpb24gX2ZvckVhY2hOYW1lKG5hbWVzLCBmdW5jKSB7XG4gIHJldHVybiAobmFtZXMgPSBuYW1lcy5zcGxpdChcIixcIikpLmZvckVhY2goZnVuYykgfHwgbmFtZXM7XG59LFxuICAgIC8vc3BsaXQgYSBjb21tYS1kZWxpbWl0ZWQgbGlzdCBvZiBuYW1lcyBpbnRvIGFuIGFycmF5LCB0aGVuIHJ1biBhIGZvckVhY2goKSBmdW5jdGlvbiBhbmQgcmV0dXJuIHRoZSBzcGxpdCBhcnJheSAodGhpcyBpcyBqdXN0IGEgd2F5IHRvIGNvbnNvbGlkYXRlL3Nob3J0ZW4gc29tZSBjb2RlKS5cbl9yb3VuZCA9IGZ1bmN0aW9uIF9yb3VuZCh2YWx1ZSkge1xuICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIDEwMDAwMCkgLyAxMDAwMDAgfHwgMDtcbn0sXG4gICAgX3JvdW5kUHJlY2lzZSA9IGZ1bmN0aW9uIF9yb3VuZFByZWNpc2UodmFsdWUpIHtcbiAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiAxMDAwMDAwMCkgLyAxMDAwMDAwMCB8fCAwO1xufSxcbiAgICAvLyBpbmNyZWFzZWQgcHJlY2lzaW9uIG1vc3RseSBmb3IgdGltaW5nIHZhbHVlcy5cbl9wYXJzZVJlbGF0aXZlID0gZnVuY3Rpb24gX3BhcnNlUmVsYXRpdmUoc3RhcnQsIHZhbHVlKSB7XG4gIHZhciBvcGVyYXRvciA9IHZhbHVlLmNoYXJBdCgwKSxcbiAgICAgIGVuZCA9IHBhcnNlRmxvYXQodmFsdWUuc3Vic3RyKDIpKTtcbiAgc3RhcnQgPSBwYXJzZUZsb2F0KHN0YXJ0KTtcbiAgcmV0dXJuIG9wZXJhdG9yID09PSBcIitcIiA/IHN0YXJ0ICsgZW5kIDogb3BlcmF0b3IgPT09IFwiLVwiID8gc3RhcnQgLSBlbmQgOiBvcGVyYXRvciA9PT0gXCIqXCIgPyBzdGFydCAqIGVuZCA6IHN0YXJ0IC8gZW5kO1xufSxcbiAgICBfYXJyYXlDb250YWluc0FueSA9IGZ1bmN0aW9uIF9hcnJheUNvbnRhaW5zQW55KHRvU2VhcmNoLCB0b0ZpbmQpIHtcbiAgLy9zZWFyY2hlcyBvbmUgYXJyYXkgdG8gZmluZCBtYXRjaGVzIGZvciBhbnkgb2YgdGhlIGl0ZW1zIGluIHRoZSB0b0ZpbmQgYXJyYXkuIEFzIHNvb24gYXMgb25lIGlzIGZvdW5kLCBpdCByZXR1cm5zIHRydWUuIEl0IGRvZXMgTk9UIHJldHVybiBhbGwgdGhlIG1hdGNoZXM7IGl0J3Mgc2ltcGx5IGEgYm9vbGVhbiBzZWFyY2guXG4gIHZhciBsID0gdG9GaW5kLmxlbmd0aCxcbiAgICAgIGkgPSAwO1xuXG4gIGZvciAoOyB0b1NlYXJjaC5pbmRleE9mKHRvRmluZFtpXSkgPCAwICYmICsraSA8IGw7KSB7fVxuXG4gIHJldHVybiBpIDwgbDtcbn0sXG4gICAgX2xhenlSZW5kZXIgPSBmdW5jdGlvbiBfbGF6eVJlbmRlcigpIHtcbiAgdmFyIGwgPSBfbGF6eVR3ZWVucy5sZW5ndGgsXG4gICAgICBhID0gX2xhenlUd2VlbnMuc2xpY2UoMCksXG4gICAgICBpLFxuICAgICAgdHdlZW47XG5cbiAgX2xhenlMb29rdXAgPSB7fTtcbiAgX2xhenlUd2VlbnMubGVuZ3RoID0gMDtcblxuICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgdHdlZW4gPSBhW2ldO1xuICAgIHR3ZWVuICYmIHR3ZWVuLl9sYXp5ICYmICh0d2Vlbi5yZW5kZXIodHdlZW4uX2xhenlbMF0sIHR3ZWVuLl9sYXp5WzFdLCB0cnVlKS5fbGF6eSA9IDApO1xuICB9XG59LFxuICAgIF9sYXp5U2FmZVJlbmRlciA9IGZ1bmN0aW9uIF9sYXp5U2FmZVJlbmRlcihhbmltYXRpb24sIHRpbWUsIHN1cHByZXNzRXZlbnRzLCBmb3JjZSkge1xuICBfbGF6eVR3ZWVucy5sZW5ndGggJiYgIV9yZXZlcnRpbmcgJiYgX2xhenlSZW5kZXIoKTtcbiAgYW5pbWF0aW9uLnJlbmRlcih0aW1lLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UgfHwgX3JldmVydGluZyAmJiB0aW1lIDwgMCAmJiAoYW5pbWF0aW9uLl9pbml0dGVkIHx8IGFuaW1hdGlvbi5fc3RhcnRBdCkpO1xuICBfbGF6eVR3ZWVucy5sZW5ndGggJiYgIV9yZXZlcnRpbmcgJiYgX2xhenlSZW5kZXIoKTsgLy9pbiBjYXNlIHJlbmRlcmluZyBjYXVzZWQgYW55IHR3ZWVucyB0byBsYXp5LWluaXQsIHdlIHNob3VsZCByZW5kZXIgdGhlbSBiZWNhdXNlIHR5cGljYWxseSB3aGVuIHNvbWVvbmUgY2FsbHMgc2VlaygpIG9yIHRpbWUoKSBvciBwcm9ncmVzcygpLCB0aGV5IGV4cGVjdCBhbiBpbW1lZGlhdGUgcmVuZGVyLlxufSxcbiAgICBfbnVtZXJpY0lmUG9zc2libGUgPSBmdW5jdGlvbiBfbnVtZXJpY0lmUG9zc2libGUodmFsdWUpIHtcbiAgdmFyIG4gPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgcmV0dXJuIChuIHx8IG4gPT09IDApICYmICh2YWx1ZSArIFwiXCIpLm1hdGNoKF9kZWxpbWl0ZWRWYWx1ZUV4cCkubGVuZ3RoIDwgMiA/IG4gOiBfaXNTdHJpbmcodmFsdWUpID8gdmFsdWUudHJpbSgpIDogdmFsdWU7XG59LFxuICAgIF9wYXNzVGhyb3VnaCA9IGZ1bmN0aW9uIF9wYXNzVGhyb3VnaChwKSB7XG4gIHJldHVybiBwO1xufSxcbiAgICBfc2V0RGVmYXVsdHMgPSBmdW5jdGlvbiBfc2V0RGVmYXVsdHMob2JqLCBkZWZhdWx0cykge1xuICBmb3IgKHZhciBwIGluIGRlZmF1bHRzKSB7XG4gICAgcCBpbiBvYmogfHwgKG9ialtwXSA9IGRlZmF1bHRzW3BdKTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59LFxuICAgIF9zZXRLZXlmcmFtZURlZmF1bHRzID0gZnVuY3Rpb24gX3NldEtleWZyYW1lRGVmYXVsdHMoZXhjbHVkZUR1cmF0aW9uKSB7XG4gIHJldHVybiBmdW5jdGlvbiAob2JqLCBkZWZhdWx0cykge1xuICAgIGZvciAodmFyIHAgaW4gZGVmYXVsdHMpIHtcbiAgICAgIHAgaW4gb2JqIHx8IHAgPT09IFwiZHVyYXRpb25cIiAmJiBleGNsdWRlRHVyYXRpb24gfHwgcCA9PT0gXCJlYXNlXCIgfHwgKG9ialtwXSA9IGRlZmF1bHRzW3BdKTtcbiAgICB9XG4gIH07XG59LFxuICAgIF9tZXJnZSA9IGZ1bmN0aW9uIF9tZXJnZShiYXNlLCB0b01lcmdlKSB7XG4gIGZvciAodmFyIHAgaW4gdG9NZXJnZSkge1xuICAgIGJhc2VbcF0gPSB0b01lcmdlW3BdO1xuICB9XG5cbiAgcmV0dXJuIGJhc2U7XG59LFxuICAgIF9tZXJnZURlZXAgPSBmdW5jdGlvbiBfbWVyZ2VEZWVwKGJhc2UsIHRvTWVyZ2UpIHtcbiAgZm9yICh2YXIgcCBpbiB0b01lcmdlKSB7XG4gICAgcCAhPT0gXCJfX3Byb3RvX19cIiAmJiBwICE9PSBcImNvbnN0cnVjdG9yXCIgJiYgcCAhPT0gXCJwcm90b3R5cGVcIiAmJiAoYmFzZVtwXSA9IF9pc09iamVjdCh0b01lcmdlW3BdKSA/IF9tZXJnZURlZXAoYmFzZVtwXSB8fCAoYmFzZVtwXSA9IHt9KSwgdG9NZXJnZVtwXSkgOiB0b01lcmdlW3BdKTtcbiAgfVxuXG4gIHJldHVybiBiYXNlO1xufSxcbiAgICBfY29weUV4Y2x1ZGluZyA9IGZ1bmN0aW9uIF9jb3B5RXhjbHVkaW5nKG9iaiwgZXhjbHVkaW5nKSB7XG4gIHZhciBjb3B5ID0ge30sXG4gICAgICBwO1xuXG4gIGZvciAocCBpbiBvYmopIHtcbiAgICBwIGluIGV4Y2x1ZGluZyB8fCAoY29weVtwXSA9IG9ialtwXSk7XG4gIH1cblxuICByZXR1cm4gY29weTtcbn0sXG4gICAgX2luaGVyaXREZWZhdWx0cyA9IGZ1bmN0aW9uIF9pbmhlcml0RGVmYXVsdHModmFycykge1xuICB2YXIgcGFyZW50ID0gdmFycy5wYXJlbnQgfHwgX2dsb2JhbFRpbWVsaW5lLFxuICAgICAgZnVuYyA9IHZhcnMua2V5ZnJhbWVzID8gX3NldEtleWZyYW1lRGVmYXVsdHMoX2lzQXJyYXkodmFycy5rZXlmcmFtZXMpKSA6IF9zZXREZWZhdWx0cztcblxuICBpZiAoX2lzTm90RmFsc2UodmFycy5pbmhlcml0KSkge1xuICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgIGZ1bmModmFycywgcGFyZW50LnZhcnMuZGVmYXVsdHMpO1xuICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudCB8fCBwYXJlbnQuX2RwO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB2YXJzO1xufSxcbiAgICBfYXJyYXlzTWF0Y2ggPSBmdW5jdGlvbiBfYXJyYXlzTWF0Y2goYTEsIGEyKSB7XG4gIHZhciBpID0gYTEubGVuZ3RoLFxuICAgICAgbWF0Y2ggPSBpID09PSBhMi5sZW5ndGg7XG5cbiAgd2hpbGUgKG1hdGNoICYmIGktLSAmJiBhMVtpXSA9PT0gYTJbaV0pIHt9XG5cbiAgcmV0dXJuIGkgPCAwO1xufSxcbiAgICBfYWRkTGlua2VkTGlzdEl0ZW0gPSBmdW5jdGlvbiBfYWRkTGlua2VkTGlzdEl0ZW0ocGFyZW50LCBjaGlsZCwgZmlyc3RQcm9wLCBsYXN0UHJvcCwgc29ydEJ5KSB7XG4gIGlmIChmaXJzdFByb3AgPT09IHZvaWQgMCkge1xuICAgIGZpcnN0UHJvcCA9IFwiX2ZpcnN0XCI7XG4gIH1cblxuICBpZiAobGFzdFByb3AgPT09IHZvaWQgMCkge1xuICAgIGxhc3RQcm9wID0gXCJfbGFzdFwiO1xuICB9XG5cbiAgdmFyIHByZXYgPSBwYXJlbnRbbGFzdFByb3BdLFxuICAgICAgdDtcblxuICBpZiAoc29ydEJ5KSB7XG4gICAgdCA9IGNoaWxkW3NvcnRCeV07XG5cbiAgICB3aGlsZSAocHJldiAmJiBwcmV2W3NvcnRCeV0gPiB0KSB7XG4gICAgICBwcmV2ID0gcHJldi5fcHJldjtcbiAgICB9XG4gIH1cblxuICBpZiAocHJldikge1xuICAgIGNoaWxkLl9uZXh0ID0gcHJldi5fbmV4dDtcbiAgICBwcmV2Ll9uZXh0ID0gY2hpbGQ7XG4gIH0gZWxzZSB7XG4gICAgY2hpbGQuX25leHQgPSBwYXJlbnRbZmlyc3RQcm9wXTtcbiAgICBwYXJlbnRbZmlyc3RQcm9wXSA9IGNoaWxkO1xuICB9XG5cbiAgaWYgKGNoaWxkLl9uZXh0KSB7XG4gICAgY2hpbGQuX25leHQuX3ByZXYgPSBjaGlsZDtcbiAgfSBlbHNlIHtcbiAgICBwYXJlbnRbbGFzdFByb3BdID0gY2hpbGQ7XG4gIH1cblxuICBjaGlsZC5fcHJldiA9IHByZXY7XG4gIGNoaWxkLnBhcmVudCA9IGNoaWxkLl9kcCA9IHBhcmVudDtcbiAgcmV0dXJuIGNoaWxkO1xufSxcbiAgICBfcmVtb3ZlTGlua2VkTGlzdEl0ZW0gPSBmdW5jdGlvbiBfcmVtb3ZlTGlua2VkTGlzdEl0ZW0ocGFyZW50LCBjaGlsZCwgZmlyc3RQcm9wLCBsYXN0UHJvcCkge1xuICBpZiAoZmlyc3RQcm9wID09PSB2b2lkIDApIHtcbiAgICBmaXJzdFByb3AgPSBcIl9maXJzdFwiO1xuICB9XG5cbiAgaWYgKGxhc3RQcm9wID09PSB2b2lkIDApIHtcbiAgICBsYXN0UHJvcCA9IFwiX2xhc3RcIjtcbiAgfVxuXG4gIHZhciBwcmV2ID0gY2hpbGQuX3ByZXYsXG4gICAgICBuZXh0ID0gY2hpbGQuX25leHQ7XG5cbiAgaWYgKHByZXYpIHtcbiAgICBwcmV2Ll9uZXh0ID0gbmV4dDtcbiAgfSBlbHNlIGlmIChwYXJlbnRbZmlyc3RQcm9wXSA9PT0gY2hpbGQpIHtcbiAgICBwYXJlbnRbZmlyc3RQcm9wXSA9IG5leHQ7XG4gIH1cblxuICBpZiAobmV4dCkge1xuICAgIG5leHQuX3ByZXYgPSBwcmV2O1xuICB9IGVsc2UgaWYgKHBhcmVudFtsYXN0UHJvcF0gPT09IGNoaWxkKSB7XG4gICAgcGFyZW50W2xhc3RQcm9wXSA9IHByZXY7XG4gIH1cblxuICBjaGlsZC5fbmV4dCA9IGNoaWxkLl9wcmV2ID0gY2hpbGQucGFyZW50ID0gbnVsbDsgLy8gZG9uJ3QgZGVsZXRlIHRoZSBfZHAganVzdCBzbyB3ZSBjYW4gcmV2ZXJ0IGlmIG5lY2Vzc2FyeS4gQnV0IHBhcmVudCBzaG91bGQgYmUgbnVsbCB0byBpbmRpY2F0ZSB0aGUgaXRlbSBpc24ndCBpbiBhIGxpbmtlZCBsaXN0LlxufSxcbiAgICBfcmVtb3ZlRnJvbVBhcmVudCA9IGZ1bmN0aW9uIF9yZW1vdmVGcm9tUGFyZW50KGNoaWxkLCBvbmx5SWZQYXJlbnRIYXNBdXRvUmVtb3ZlKSB7XG4gIGNoaWxkLnBhcmVudCAmJiAoIW9ubHlJZlBhcmVudEhhc0F1dG9SZW1vdmUgfHwgY2hpbGQucGFyZW50LmF1dG9SZW1vdmVDaGlsZHJlbikgJiYgY2hpbGQucGFyZW50LnJlbW92ZSAmJiBjaGlsZC5wYXJlbnQucmVtb3ZlKGNoaWxkKTtcbiAgY2hpbGQuX2FjdCA9IDA7XG59LFxuICAgIF91bmNhY2hlID0gZnVuY3Rpb24gX3VuY2FjaGUoYW5pbWF0aW9uLCBjaGlsZCkge1xuICBpZiAoYW5pbWF0aW9uICYmICghY2hpbGQgfHwgY2hpbGQuX2VuZCA+IGFuaW1hdGlvbi5fZHVyIHx8IGNoaWxkLl9zdGFydCA8IDApKSB7XG4gICAgLy8gcGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uOiBpZiBhIGNoaWxkIGFuaW1hdGlvbiBpcyBwYXNzZWQgaW4gd2Ugc2hvdWxkIG9ubHkgdW5jYWNoZSBpZiB0aGF0IGNoaWxkIEVYVEVORFMgdGhlIGFuaW1hdGlvbiAoaXRzIGVuZCB0aW1lIGlzIGJleW9uZCB0aGUgZW5kKVxuICAgIHZhciBhID0gYW5pbWF0aW9uO1xuXG4gICAgd2hpbGUgKGEpIHtcbiAgICAgIGEuX2RpcnR5ID0gMTtcbiAgICAgIGEgPSBhLnBhcmVudDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYW5pbWF0aW9uO1xufSxcbiAgICBfcmVjYWNoZUFuY2VzdG9ycyA9IGZ1bmN0aW9uIF9yZWNhY2hlQW5jZXN0b3JzKGFuaW1hdGlvbikge1xuICB2YXIgcGFyZW50ID0gYW5pbWF0aW9uLnBhcmVudDtcblxuICB3aGlsZSAocGFyZW50ICYmIHBhcmVudC5wYXJlbnQpIHtcbiAgICAvL3NvbWV0aW1lcyB3ZSBtdXN0IGZvcmNlIGEgcmUtc29ydCBvZiBhbGwgY2hpbGRyZW4gYW5kIHVwZGF0ZSB0aGUgZHVyYXRpb24vdG90YWxEdXJhdGlvbiBvZiBhbGwgYW5jZXN0b3IgdGltZWxpbmVzIGltbWVkaWF0ZWx5IGluIGNhc2UsIGZvciBleGFtcGxlLCBpbiB0aGUgbWlkZGxlIG9mIGEgcmVuZGVyIGxvb3AsIG9uZSB0d2VlbiBhbHRlcnMgYW5vdGhlciB0d2VlbidzIHRpbWVTY2FsZSB3aGljaCBzaG92ZXMgaXRzIHN0YXJ0VGltZSBiZWZvcmUgMCwgZm9yY2luZyB0aGUgcGFyZW50IHRpbWVsaW5lIHRvIHNoaWZ0IGFyb3VuZCBhbmQgc2hpZnRDaGlsZHJlbigpIHdoaWNoIGNvdWxkIGFmZmVjdCB0aGF0IG5leHQgdHdlZW4ncyByZW5kZXIgKHN0YXJ0VGltZSkuIERvZXNuJ3QgbWF0dGVyIGZvciB0aGUgcm9vdCB0aW1lbGluZSB0aG91Z2guXG4gICAgcGFyZW50Ll9kaXJ0eSA9IDE7XG4gICAgcGFyZW50LnRvdGFsRHVyYXRpb24oKTtcbiAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICB9XG5cbiAgcmV0dXJuIGFuaW1hdGlvbjtcbn0sXG4gICAgX3Jld2luZFN0YXJ0QXQgPSBmdW5jdGlvbiBfcmV3aW5kU3RhcnRBdCh0d2VlbiwgdG90YWxUaW1lLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpIHtcbiAgcmV0dXJuIHR3ZWVuLl9zdGFydEF0ICYmIChfcmV2ZXJ0aW5nID8gdHdlZW4uX3N0YXJ0QXQucmV2ZXJ0KF9yZXZlcnRDb25maWdOb0tpbGwpIDogdHdlZW4udmFycy5pbW1lZGlhdGVSZW5kZXIgJiYgIXR3ZWVuLnZhcnMuYXV0b1JldmVydCB8fCB0d2Vlbi5fc3RhcnRBdC5yZW5kZXIodG90YWxUaW1lLCB0cnVlLCBmb3JjZSkpO1xufSxcbiAgICBfaGFzTm9QYXVzZWRBbmNlc3RvcnMgPSBmdW5jdGlvbiBfaGFzTm9QYXVzZWRBbmNlc3RvcnMoYW5pbWF0aW9uKSB7XG4gIHJldHVybiAhYW5pbWF0aW9uIHx8IGFuaW1hdGlvbi5fdHMgJiYgX2hhc05vUGF1c2VkQW5jZXN0b3JzKGFuaW1hdGlvbi5wYXJlbnQpO1xufSxcbiAgICBfZWxhcHNlZEN5Y2xlRHVyYXRpb24gPSBmdW5jdGlvbiBfZWxhcHNlZEN5Y2xlRHVyYXRpb24oYW5pbWF0aW9uKSB7XG4gIHJldHVybiBhbmltYXRpb24uX3JlcGVhdCA/IF9hbmltYXRpb25DeWNsZShhbmltYXRpb24uX3RUaW1lLCBhbmltYXRpb24gPSBhbmltYXRpb24uZHVyYXRpb24oKSArIGFuaW1hdGlvbi5fckRlbGF5KSAqIGFuaW1hdGlvbiA6IDA7XG59LFxuICAgIC8vIGZlZWQgaW4gdGhlIHRvdGFsVGltZSBhbmQgY3ljbGVEdXJhdGlvbiBhbmQgaXQnbGwgcmV0dXJuIHRoZSBjeWNsZSAoaXRlcmF0aW9uIG1pbnVzIDEpIGFuZCBpZiB0aGUgcGxheWhlYWQgaXMgZXhhY3RseSBhdCB0aGUgdmVyeSBFTkQsIGl0IHdpbGwgTk9UIGJ1bXAgdXAgdG8gdGhlIG5leHQgY3ljbGUuXG5fYW5pbWF0aW9uQ3ljbGUgPSBmdW5jdGlvbiBfYW5pbWF0aW9uQ3ljbGUodFRpbWUsIGN5Y2xlRHVyYXRpb24pIHtcbiAgdmFyIHdob2xlID0gTWF0aC5mbG9vcih0VGltZSAvPSBjeWNsZUR1cmF0aW9uKTtcbiAgcmV0dXJuIHRUaW1lICYmIHdob2xlID09PSB0VGltZSA/IHdob2xlIC0gMSA6IHdob2xlO1xufSxcbiAgICBfcGFyZW50VG9DaGlsZFRvdGFsVGltZSA9IGZ1bmN0aW9uIF9wYXJlbnRUb0NoaWxkVG90YWxUaW1lKHBhcmVudFRpbWUsIGNoaWxkKSB7XG4gIHJldHVybiAocGFyZW50VGltZSAtIGNoaWxkLl9zdGFydCkgKiBjaGlsZC5fdHMgKyAoY2hpbGQuX3RzID49IDAgPyAwIDogY2hpbGQuX2RpcnR5ID8gY2hpbGQudG90YWxEdXJhdGlvbigpIDogY2hpbGQuX3REdXIpO1xufSxcbiAgICBfc2V0RW5kID0gZnVuY3Rpb24gX3NldEVuZChhbmltYXRpb24pIHtcbiAgcmV0dXJuIGFuaW1hdGlvbi5fZW5kID0gX3JvdW5kUHJlY2lzZShhbmltYXRpb24uX3N0YXJ0ICsgKGFuaW1hdGlvbi5fdER1ciAvIE1hdGguYWJzKGFuaW1hdGlvbi5fdHMgfHwgYW5pbWF0aW9uLl9ydHMgfHwgX3RpbnlOdW0pIHx8IDApKTtcbn0sXG4gICAgX2FsaWduUGxheWhlYWQgPSBmdW5jdGlvbiBfYWxpZ25QbGF5aGVhZChhbmltYXRpb24sIHRvdGFsVGltZSkge1xuICAvLyBhZGp1c3RzIHRoZSBhbmltYXRpb24ncyBfc3RhcnQgYW5kIF9lbmQgYWNjb3JkaW5nIHRvIHRoZSBwcm92aWRlZCB0b3RhbFRpbWUgKG9ubHkgaWYgdGhlIHBhcmVudCdzIHNtb290aENoaWxkVGltaW5nIGlzIHRydWUgYW5kIHRoZSBhbmltYXRpb24gaXNuJ3QgcGF1c2VkKS4gSXQgZG9lc24ndCBkbyBhbnkgcmVuZGVyaW5nIG9yIGZvcmNpbmcgdGhpbmdzIGJhY2sgaW50byBwYXJlbnQgdGltZWxpbmVzLCBldGMuIC0gdGhhdCdzIHdoYXQgdG90YWxUaW1lKCkgaXMgZm9yLlxuICB2YXIgcGFyZW50ID0gYW5pbWF0aW9uLl9kcDtcblxuICBpZiAocGFyZW50ICYmIHBhcmVudC5zbW9vdGhDaGlsZFRpbWluZyAmJiBhbmltYXRpb24uX3RzKSB7XG4gICAgYW5pbWF0aW9uLl9zdGFydCA9IF9yb3VuZFByZWNpc2UocGFyZW50Ll90aW1lIC0gKGFuaW1hdGlvbi5fdHMgPiAwID8gdG90YWxUaW1lIC8gYW5pbWF0aW9uLl90cyA6ICgoYW5pbWF0aW9uLl9kaXJ0eSA/IGFuaW1hdGlvbi50b3RhbER1cmF0aW9uKCkgOiBhbmltYXRpb24uX3REdXIpIC0gdG90YWxUaW1lKSAvIC1hbmltYXRpb24uX3RzKSk7XG5cbiAgICBfc2V0RW5kKGFuaW1hdGlvbik7XG5cbiAgICBwYXJlbnQuX2RpcnR5IHx8IF91bmNhY2hlKHBhcmVudCwgYW5pbWF0aW9uKTsgLy9mb3IgcGVyZm9ybWFuY2UgaW1wcm92ZW1lbnQuIElmIHRoZSBwYXJlbnQncyBjYWNoZSBpcyBhbHJlYWR5IGRpcnR5LCBpdCBhbHJlYWR5IHRvb2sgY2FyZSBvZiBtYXJraW5nIHRoZSBhbmNlc3RvcnMgYXMgZGlydHkgdG9vLCBzbyBza2lwIHRoZSBmdW5jdGlvbiBjYWxsIGhlcmUuXG4gIH1cblxuICByZXR1cm4gYW5pbWF0aW9uO1xufSxcblxuLypcbl90b3RhbFRpbWVUb1RpbWUgPSAoY2xhbXBlZFRvdGFsVGltZSwgZHVyYXRpb24sIHJlcGVhdCwgcmVwZWF0RGVsYXksIHlveW8pID0+IHtcblx0bGV0IGN5Y2xlRHVyYXRpb24gPSBkdXJhdGlvbiArIHJlcGVhdERlbGF5LFxuXHRcdHRpbWUgPSBfcm91bmQoY2xhbXBlZFRvdGFsVGltZSAlIGN5Y2xlRHVyYXRpb24pO1xuXHRpZiAodGltZSA+IGR1cmF0aW9uKSB7XG5cdFx0dGltZSA9IGR1cmF0aW9uO1xuXHR9XG5cdHJldHVybiAoeW95byAmJiAofn4oY2xhbXBlZFRvdGFsVGltZSAvIGN5Y2xlRHVyYXRpb24pICYgMSkpID8gZHVyYXRpb24gLSB0aW1lIDogdGltZTtcbn0sXG4qL1xuX3Bvc3RBZGRDaGVja3MgPSBmdW5jdGlvbiBfcG9zdEFkZENoZWNrcyh0aW1lbGluZSwgY2hpbGQpIHtcbiAgdmFyIHQ7XG5cbiAgaWYgKGNoaWxkLl90aW1lIHx8IGNoaWxkLl9pbml0dGVkICYmICFjaGlsZC5fZHVyKSB7XG4gICAgLy9pbiBjYXNlLCBmb3IgZXhhbXBsZSwgdGhlIF9zdGFydCBpcyBtb3ZlZCBvbiBhIHR3ZWVuIHRoYXQgaGFzIGFscmVhZHkgcmVuZGVyZWQuIEltYWdpbmUgaXQncyBhdCBpdHMgZW5kIHN0YXRlLCB0aGVuIHRoZSBzdGFydFRpbWUgaXMgbW92ZWQgV0FZIGxhdGVyIChhZnRlciB0aGUgZW5kIG9mIHRoaXMgdGltZWxpbmUpLCBpdCBzaG91bGQgcmVuZGVyIGF0IGl0cyBiZWdpbm5pbmcuXG4gICAgdCA9IF9wYXJlbnRUb0NoaWxkVG90YWxUaW1lKHRpbWVsaW5lLnJhd1RpbWUoKSwgY2hpbGQpO1xuXG4gICAgaWYgKCFjaGlsZC5fZHVyIHx8IF9jbGFtcCgwLCBjaGlsZC50b3RhbER1cmF0aW9uKCksIHQpIC0gY2hpbGQuX3RUaW1lID4gX3RpbnlOdW0pIHtcbiAgICAgIGNoaWxkLnJlbmRlcih0LCB0cnVlKTtcbiAgICB9XG4gIH0gLy9pZiB0aGUgdGltZWxpbmUgaGFzIGFscmVhZHkgZW5kZWQgYnV0IHRoZSBpbnNlcnRlZCB0d2Vlbi90aW1lbGluZSBleHRlbmRzIHRoZSBkdXJhdGlvbiwgd2Ugc2hvdWxkIGVuYWJsZSB0aGlzIHRpbWVsaW5lIGFnYWluIHNvIHRoYXQgaXQgcmVuZGVycyBwcm9wZXJseS4gV2Ugc2hvdWxkIGFsc28gYWxpZ24gdGhlIHBsYXloZWFkIHdpdGggdGhlIHBhcmVudCB0aW1lbGluZSdzIHdoZW4gYXBwcm9wcmlhdGUuXG5cblxuICBpZiAoX3VuY2FjaGUodGltZWxpbmUsIGNoaWxkKS5fZHAgJiYgdGltZWxpbmUuX2luaXR0ZWQgJiYgdGltZWxpbmUuX3RpbWUgPj0gdGltZWxpbmUuX2R1ciAmJiB0aW1lbGluZS5fdHMpIHtcbiAgICAvL2luIGNhc2UgYW55IG9mIHRoZSBhbmNlc3RvcnMgaGFkIGNvbXBsZXRlZCBidXQgc2hvdWxkIG5vdyBiZSBlbmFibGVkLi4uXG4gICAgaWYgKHRpbWVsaW5lLl9kdXIgPCB0aW1lbGluZS5kdXJhdGlvbigpKSB7XG4gICAgICB0ID0gdGltZWxpbmU7XG5cbiAgICAgIHdoaWxlICh0Ll9kcCkge1xuICAgICAgICB0LnJhd1RpbWUoKSA+PSAwICYmIHQudG90YWxUaW1lKHQuX3RUaW1lKTsgLy9tb3ZlcyB0aGUgdGltZWxpbmUgKHNoaWZ0cyBpdHMgc3RhcnRUaW1lKSBpZiBuZWNlc3NhcnksIGFuZCBhbHNvIGVuYWJsZXMgaXQuIElmIGl0J3MgY3VycmVudGx5IHplcm8sIHRob3VnaCwgaXQgbWF5IG5vdCBiZSBzY2hlZHVsZWQgdG8gcmVuZGVyIHVudGlsIGxhdGVyIHNvIHRoZXJlJ3Mgbm8gbmVlZCB0byBmb3JjZSBpdCB0byBhbGlnbiB3aXRoIHRoZSBjdXJyZW50IHBsYXloZWFkIHBvc2l0aW9uLiBPbmx5IG1vdmUgdG8gY2F0Y2ggdXAgd2l0aCB0aGUgcGxheWhlYWQuXG5cbiAgICAgICAgdCA9IHQuX2RwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRpbWVsaW5lLl96VGltZSA9IC1fdGlueU51bTsgLy8gaGVscHMgZW5zdXJlIHRoYXQgdGhlIG5leHQgcmVuZGVyKCkgd2lsbCBiZSBmb3JjZWQgKGNyb3NzaW5nU3RhcnQgPSB0cnVlIGluIHJlbmRlcigpKSwgZXZlbiBpZiB0aGUgZHVyYXRpb24gaGFzbid0IGNoYW5nZWQgKHdlJ3JlIGFkZGluZyBhIGNoaWxkIHdoaWNoIHdvdWxkIG5lZWQgdG8gZ2V0IHJlbmRlcmVkKS4gRGVmaW5pdGVseSBhbiBlZGdlIGNhc2UuIE5vdGU6IHdlIE1VU1QgZG8gdGhpcyBBRlRFUiB0aGUgbG9vcCBhYm92ZSB3aGVyZSB0aGUgdG90YWxUaW1lKCkgbWlnaHQgdHJpZ2dlciBhIHJlbmRlcigpIGJlY2F1c2UgdGhpcyBfYWRkVG9UaW1lbGluZSgpIG1ldGhvZCBnZXRzIGNhbGxlZCBmcm9tIHRoZSBBbmltYXRpb24gY29uc3RydWN0b3IsIEJFRk9SRSB0d2VlbnMgZXZlbiByZWNvcmQgdGhlaXIgdGFyZ2V0cywgZXRjLiBzbyB3ZSB3b3VsZG4ndCB3YW50IHRoaW5ncyB0byBnZXQgdHJpZ2dlcmVkIGluIHRoZSB3cm9uZyBvcmRlci5cbiAgfVxufSxcbiAgICBfYWRkVG9UaW1lbGluZSA9IGZ1bmN0aW9uIF9hZGRUb1RpbWVsaW5lKHRpbWVsaW5lLCBjaGlsZCwgcG9zaXRpb24sIHNraXBDaGVja3MpIHtcbiAgY2hpbGQucGFyZW50ICYmIF9yZW1vdmVGcm9tUGFyZW50KGNoaWxkKTtcbiAgY2hpbGQuX3N0YXJ0ID0gX3JvdW5kUHJlY2lzZSgoX2lzTnVtYmVyKHBvc2l0aW9uKSA/IHBvc2l0aW9uIDogcG9zaXRpb24gfHwgdGltZWxpbmUgIT09IF9nbG9iYWxUaW1lbGluZSA/IF9wYXJzZVBvc2l0aW9uKHRpbWVsaW5lLCBwb3NpdGlvbiwgY2hpbGQpIDogdGltZWxpbmUuX3RpbWUpICsgY2hpbGQuX2RlbGF5KTtcbiAgY2hpbGQuX2VuZCA9IF9yb3VuZFByZWNpc2UoY2hpbGQuX3N0YXJ0ICsgKGNoaWxkLnRvdGFsRHVyYXRpb24oKSAvIE1hdGguYWJzKGNoaWxkLnRpbWVTY2FsZSgpKSB8fCAwKSk7XG5cbiAgX2FkZExpbmtlZExpc3RJdGVtKHRpbWVsaW5lLCBjaGlsZCwgXCJfZmlyc3RcIiwgXCJfbGFzdFwiLCB0aW1lbGluZS5fc29ydCA/IFwiX3N0YXJ0XCIgOiAwKTtcblxuICBfaXNGcm9tT3JGcm9tU3RhcnQoY2hpbGQpIHx8ICh0aW1lbGluZS5fcmVjZW50ID0gY2hpbGQpO1xuICBza2lwQ2hlY2tzIHx8IF9wb3N0QWRkQ2hlY2tzKHRpbWVsaW5lLCBjaGlsZCk7XG4gIHRpbWVsaW5lLl90cyA8IDAgJiYgX2FsaWduUGxheWhlYWQodGltZWxpbmUsIHRpbWVsaW5lLl90VGltZSk7IC8vIGlmIHRoZSB0aW1lbGluZSBpcyByZXZlcnNlZCBhbmQgdGhlIG5ldyBjaGlsZCBtYWtlcyBpdCBsb25nZXIsIHdlIG1heSBuZWVkIHRvIGFkanVzdCB0aGUgcGFyZW50J3MgX3N0YXJ0IChwdXNoIGl0IGJhY2spXG5cbiAgcmV0dXJuIHRpbWVsaW5lO1xufSxcbiAgICBfc2Nyb2xsVHJpZ2dlciA9IGZ1bmN0aW9uIF9zY3JvbGxUcmlnZ2VyKGFuaW1hdGlvbiwgdHJpZ2dlcikge1xuICByZXR1cm4gKF9nbG9iYWxzLlNjcm9sbFRyaWdnZXIgfHwgX21pc3NpbmdQbHVnaW4oXCJzY3JvbGxUcmlnZ2VyXCIsIHRyaWdnZXIpKSAmJiBfZ2xvYmFscy5TY3JvbGxUcmlnZ2VyLmNyZWF0ZSh0cmlnZ2VyLCBhbmltYXRpb24pO1xufSxcbiAgICBfYXR0ZW1wdEluaXRUd2VlbiA9IGZ1bmN0aW9uIF9hdHRlbXB0SW5pdFR3ZWVuKHR3ZWVuLCB0aW1lLCBmb3JjZSwgc3VwcHJlc3NFdmVudHMsIHRUaW1lKSB7XG4gIF9pbml0VHdlZW4odHdlZW4sIHRpbWUsIHRUaW1lKTtcblxuICBpZiAoIXR3ZWVuLl9pbml0dGVkKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICBpZiAoIWZvcmNlICYmIHR3ZWVuLl9wdCAmJiAhX3JldmVydGluZyAmJiAodHdlZW4uX2R1ciAmJiB0d2Vlbi52YXJzLmxhenkgIT09IGZhbHNlIHx8ICF0d2Vlbi5fZHVyICYmIHR3ZWVuLnZhcnMubGF6eSkgJiYgX2xhc3RSZW5kZXJlZEZyYW1lICE9PSBfdGlja2VyLmZyYW1lKSB7XG4gICAgX2xhenlUd2VlbnMucHVzaCh0d2Vlbik7XG5cbiAgICB0d2Vlbi5fbGF6eSA9IFt0VGltZSwgc3VwcHJlc3NFdmVudHNdO1xuICAgIHJldHVybiAxO1xuICB9XG59LFxuICAgIF9wYXJlbnRQbGF5aGVhZElzQmVmb3JlU3RhcnQgPSBmdW5jdGlvbiBfcGFyZW50UGxheWhlYWRJc0JlZm9yZVN0YXJ0KF9yZWYpIHtcbiAgdmFyIHBhcmVudCA9IF9yZWYucGFyZW50O1xuICByZXR1cm4gcGFyZW50ICYmIHBhcmVudC5fdHMgJiYgcGFyZW50Ll9pbml0dGVkICYmICFwYXJlbnQuX2xvY2sgJiYgKHBhcmVudC5yYXdUaW1lKCkgPCAwIHx8IF9wYXJlbnRQbGF5aGVhZElzQmVmb3JlU3RhcnQocGFyZW50KSk7XG59LFxuICAgIC8vIGNoZWNrIHBhcmVudCdzIF9sb2NrIGJlY2F1c2Ugd2hlbiBhIHRpbWVsaW5lIHJlcGVhdHMveW95b3MgYW5kIGRvZXMgaXRzIGFydGlmaWNpYWwgd3JhcHBpbmcsIHdlIHNob3VsZG4ndCBmb3JjZSB0aGUgcmF0aW8gYmFjayB0byAwXG5faXNGcm9tT3JGcm9tU3RhcnQgPSBmdW5jdGlvbiBfaXNGcm9tT3JGcm9tU3RhcnQoX3JlZjIpIHtcbiAgdmFyIGRhdGEgPSBfcmVmMi5kYXRhO1xuICByZXR1cm4gZGF0YSA9PT0gXCJpc0Zyb21TdGFydFwiIHx8IGRhdGEgPT09IFwiaXNTdGFydFwiO1xufSxcbiAgICBfcmVuZGVyWmVyb0R1cmF0aW9uVHdlZW4gPSBmdW5jdGlvbiBfcmVuZGVyWmVyb0R1cmF0aW9uVHdlZW4odHdlZW4sIHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKSB7XG4gIHZhciBwcmV2UmF0aW8gPSB0d2Vlbi5yYXRpbyxcbiAgICAgIHJhdGlvID0gdG90YWxUaW1lIDwgMCB8fCAhdG90YWxUaW1lICYmICghdHdlZW4uX3N0YXJ0ICYmIF9wYXJlbnRQbGF5aGVhZElzQmVmb3JlU3RhcnQodHdlZW4pICYmICEoIXR3ZWVuLl9pbml0dGVkICYmIF9pc0Zyb21PckZyb21TdGFydCh0d2VlbikpIHx8ICh0d2Vlbi5fdHMgPCAwIHx8IHR3ZWVuLl9kcC5fdHMgPCAwKSAmJiAhX2lzRnJvbU9yRnJvbVN0YXJ0KHR3ZWVuKSkgPyAwIDogMSxcbiAgICAgIC8vIGlmIHRoZSB0d2VlbiBvciBpdHMgcGFyZW50IGlzIHJldmVyc2VkIGFuZCB0aGUgdG90YWxUaW1lIGlzIDAsIHdlIHNob3VsZCBnbyB0byBhIHJhdGlvIG9mIDAuIEVkZ2UgY2FzZTogaWYgYSBmcm9tKCkgb3IgZnJvbVRvKCkgc3RhZ2dlciB0d2VlbiBpcyBwbGFjZWQgbGF0ZXIgaW4gYSB0aW1lbGluZSwgdGhlIFwic3RhcnRBdFwiIHplcm8tZHVyYXRpb24gdHdlZW4gY291bGQgaW5pdGlhbGx5IHJlbmRlciBhdCBhIHRpbWUgd2hlbiB0aGUgcGFyZW50IHRpbWVsaW5lJ3MgcGxheWhlYWQgaXMgdGVjaG5pY2FsbHkgQkVGT1JFIHdoZXJlIHRoaXMgdHdlZW4gaXMsIHNvIG1ha2Ugc3VyZSB0aGF0IGFueSBcImZyb21cIiBhbmQgXCJmcm9tVG9cIiBzdGFydEF0IHR3ZWVucyBhcmUgcmVuZGVyZWQgdGhlIGZpcnN0IHRpbWUgYXQgYSByYXRpbyBvZiAxLlxuICByZXBlYXREZWxheSA9IHR3ZWVuLl9yRGVsYXksXG4gICAgICB0VGltZSA9IDAsXG4gICAgICBwdCxcbiAgICAgIGl0ZXJhdGlvbixcbiAgICAgIHByZXZJdGVyYXRpb247XG5cbiAgaWYgKHJlcGVhdERlbGF5ICYmIHR3ZWVuLl9yZXBlYXQpIHtcbiAgICAvLyBpbiBjYXNlIHRoZXJlJ3MgYSB6ZXJvLWR1cmF0aW9uIHR3ZWVuIHRoYXQgaGFzIGEgcmVwZWF0IHdpdGggYSByZXBlYXREZWxheVxuICAgIHRUaW1lID0gX2NsYW1wKDAsIHR3ZWVuLl90RHVyLCB0b3RhbFRpbWUpO1xuICAgIGl0ZXJhdGlvbiA9IF9hbmltYXRpb25DeWNsZSh0VGltZSwgcmVwZWF0RGVsYXkpO1xuICAgIHR3ZWVuLl95b3lvICYmIGl0ZXJhdGlvbiAmIDEgJiYgKHJhdGlvID0gMSAtIHJhdGlvKTtcblxuICAgIGlmIChpdGVyYXRpb24gIT09IF9hbmltYXRpb25DeWNsZSh0d2Vlbi5fdFRpbWUsIHJlcGVhdERlbGF5KSkge1xuICAgICAgLy8gaWYgaXRlcmF0aW9uIGNoYW5nZWRcbiAgICAgIHByZXZSYXRpbyA9IDEgLSByYXRpbztcbiAgICAgIHR3ZWVuLnZhcnMucmVwZWF0UmVmcmVzaCAmJiB0d2Vlbi5faW5pdHRlZCAmJiB0d2Vlbi5pbnZhbGlkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHJhdGlvICE9PSBwcmV2UmF0aW8gfHwgX3JldmVydGluZyB8fCBmb3JjZSB8fCB0d2Vlbi5felRpbWUgPT09IF90aW55TnVtIHx8ICF0b3RhbFRpbWUgJiYgdHdlZW4uX3pUaW1lKSB7XG4gICAgaWYgKCF0d2Vlbi5faW5pdHRlZCAmJiBfYXR0ZW1wdEluaXRUd2Vlbih0d2VlbiwgdG90YWxUaW1lLCBmb3JjZSwgc3VwcHJlc3NFdmVudHMsIHRUaW1lKSkge1xuICAgICAgLy8gaWYgd2UgcmVuZGVyIHRoZSB2ZXJ5IGJlZ2lubmluZyAodGltZSA9PSAwKSBvZiBhIGZyb21UbygpLCB3ZSBtdXN0IGZvcmNlIHRoZSByZW5kZXIgKG5vcm1hbCB0d2VlbnMgd291bGRuJ3QgbmVlZCB0byByZW5kZXIgYXQgYSB0aW1lIG9mIDAgd2hlbiB0aGUgcHJldlRpbWUgd2FzIGFsc28gMCkuIFRoaXMgaXMgYWxzbyBtYW5kYXRvcnkgdG8gbWFrZSBzdXJlIG92ZXJ3cml0aW5nIGtpY2tzIGluIGltbWVkaWF0ZWx5LlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHByZXZJdGVyYXRpb24gPSB0d2Vlbi5felRpbWU7XG4gICAgdHdlZW4uX3pUaW1lID0gdG90YWxUaW1lIHx8IChzdXBwcmVzc0V2ZW50cyA/IF90aW55TnVtIDogMCk7IC8vIHdoZW4gdGhlIHBsYXloZWFkIGFycml2ZXMgYXQgRVhBQ1RMWSB0aW1lIDAgKHJpZ2h0IG9uIHRvcCkgb2YgYSB6ZXJvLWR1cmF0aW9uIHR3ZWVuLCB3ZSBuZWVkIHRvIGRpc2Nlcm4gaWYgZXZlbnRzIGFyZSBzdXBwcmVzc2VkIHNvIHRoYXQgd2hlbiB0aGUgcGxheWhlYWQgbW92ZXMgYWdhaW4gKG5leHQgdGltZSksIGl0J2xsIHRyaWdnZXIgdGhlIGNhbGxiYWNrLiBJZiBldmVudHMgYXJlIE5PVCBzdXBwcmVzc2VkLCBvYnZpb3VzbHkgdGhlIGNhbGxiYWNrIHdvdWxkIGJlIHRyaWdnZXJlZCBpbiB0aGlzIHJlbmRlci4gQmFzaWNhbGx5LCB0aGUgY2FsbGJhY2sgc2hvdWxkIGZpcmUgZWl0aGVyIHdoZW4gdGhlIHBsYXloZWFkIEFSUklWRVMgb3IgTEVBVkVTIHRoaXMgZXhhY3Qgc3BvdCwgbm90IGJvdGguIEltYWdpbmUgZG9pbmcgYSB0aW1lbGluZS5zZWVrKDApIGFuZCB0aGVyZSdzIGEgY2FsbGJhY2sgdGhhdCBzaXRzIGF0IDAuIFNpbmNlIGV2ZW50cyBhcmUgc3VwcHJlc3NlZCBvbiB0aGF0IHNlZWsoKSBieSBkZWZhdWx0LCBub3RoaW5nIHdpbGwgZmlyZSwgYnV0IHdoZW4gdGhlIHBsYXloZWFkIG1vdmVzIG9mZiBvZiB0aGF0IHBvc2l0aW9uLCB0aGUgY2FsbGJhY2sgc2hvdWxkIGZpcmUuIFRoaXMgYmVoYXZpb3IgaXMgd2hhdCBwZW9wbGUgaW50dWl0aXZlbHkgZXhwZWN0LlxuXG4gICAgc3VwcHJlc3NFdmVudHMgfHwgKHN1cHByZXNzRXZlbnRzID0gdG90YWxUaW1lICYmICFwcmV2SXRlcmF0aW9uKTsgLy8gaWYgaXQgd2FzIHJlbmRlcmVkIHByZXZpb3VzbHkgYXQgZXhhY3RseSAwIChfelRpbWUpIGFuZCBub3cgdGhlIHBsYXloZWFkIGlzIG1vdmluZyBhd2F5LCBET04nVCBmaXJlIGNhbGxiYWNrcyBvdGhlcndpc2UgdGhleSdsbCBzZWVtIGxpa2UgZHVwbGljYXRlcy5cblxuICAgIHR3ZWVuLnJhdGlvID0gcmF0aW87XG4gICAgdHdlZW4uX2Zyb20gJiYgKHJhdGlvID0gMSAtIHJhdGlvKTtcbiAgICB0d2Vlbi5fdGltZSA9IDA7XG4gICAgdHdlZW4uX3RUaW1lID0gdFRpbWU7XG4gICAgcHQgPSB0d2Vlbi5fcHQ7XG5cbiAgICB3aGlsZSAocHQpIHtcbiAgICAgIHB0LnIocmF0aW8sIHB0LmQpO1xuICAgICAgcHQgPSBwdC5fbmV4dDtcbiAgICB9XG5cbiAgICB0b3RhbFRpbWUgPCAwICYmIF9yZXdpbmRTdGFydEF0KHR3ZWVuLCB0b3RhbFRpbWUsIHN1cHByZXNzRXZlbnRzLCB0cnVlKTtcbiAgICB0d2Vlbi5fb25VcGRhdGUgJiYgIXN1cHByZXNzRXZlbnRzICYmIF9jYWxsYmFjayh0d2VlbiwgXCJvblVwZGF0ZVwiKTtcbiAgICB0VGltZSAmJiB0d2Vlbi5fcmVwZWF0ICYmICFzdXBwcmVzc0V2ZW50cyAmJiB0d2Vlbi5wYXJlbnQgJiYgX2NhbGxiYWNrKHR3ZWVuLCBcIm9uUmVwZWF0XCIpO1xuXG4gICAgaWYgKCh0b3RhbFRpbWUgPj0gdHdlZW4uX3REdXIgfHwgdG90YWxUaW1lIDwgMCkgJiYgdHdlZW4ucmF0aW8gPT09IHJhdGlvKSB7XG4gICAgICByYXRpbyAmJiBfcmVtb3ZlRnJvbVBhcmVudCh0d2VlbiwgMSk7XG5cbiAgICAgIGlmICghc3VwcHJlc3NFdmVudHMgJiYgIV9yZXZlcnRpbmcpIHtcbiAgICAgICAgX2NhbGxiYWNrKHR3ZWVuLCByYXRpbyA/IFwib25Db21wbGV0ZVwiIDogXCJvblJldmVyc2VDb21wbGV0ZVwiLCB0cnVlKTtcblxuICAgICAgICB0d2Vlbi5fcHJvbSAmJiB0d2Vlbi5fcHJvbSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmICghdHdlZW4uX3pUaW1lKSB7XG4gICAgdHdlZW4uX3pUaW1lID0gdG90YWxUaW1lO1xuICB9XG59LFxuICAgIF9maW5kTmV4dFBhdXNlVHdlZW4gPSBmdW5jdGlvbiBfZmluZE5leHRQYXVzZVR3ZWVuKGFuaW1hdGlvbiwgcHJldlRpbWUsIHRpbWUpIHtcbiAgdmFyIGNoaWxkO1xuXG4gIGlmICh0aW1lID4gcHJldlRpbWUpIHtcbiAgICBjaGlsZCA9IGFuaW1hdGlvbi5fZmlyc3Q7XG5cbiAgICB3aGlsZSAoY2hpbGQgJiYgY2hpbGQuX3N0YXJ0IDw9IHRpbWUpIHtcbiAgICAgIGlmIChjaGlsZC5kYXRhID09PSBcImlzUGF1c2VcIiAmJiBjaGlsZC5fc3RhcnQgPiBwcmV2VGltZSkge1xuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICB9XG5cbiAgICAgIGNoaWxkID0gY2hpbGQuX25leHQ7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNoaWxkID0gYW5pbWF0aW9uLl9sYXN0O1xuXG4gICAgd2hpbGUgKGNoaWxkICYmIGNoaWxkLl9zdGFydCA+PSB0aW1lKSB7XG4gICAgICBpZiAoY2hpbGQuZGF0YSA9PT0gXCJpc1BhdXNlXCIgJiYgY2hpbGQuX3N0YXJ0IDwgcHJldlRpbWUpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgfVxuXG4gICAgICBjaGlsZCA9IGNoaWxkLl9wcmV2O1xuICAgIH1cbiAgfVxufSxcbiAgICBfc2V0RHVyYXRpb24gPSBmdW5jdGlvbiBfc2V0RHVyYXRpb24oYW5pbWF0aW9uLCBkdXJhdGlvbiwgc2tpcFVuY2FjaGUsIGxlYXZlUGxheWhlYWQpIHtcbiAgdmFyIHJlcGVhdCA9IGFuaW1hdGlvbi5fcmVwZWF0LFxuICAgICAgZHVyID0gX3JvdW5kUHJlY2lzZShkdXJhdGlvbikgfHwgMCxcbiAgICAgIHRvdGFsUHJvZ3Jlc3MgPSBhbmltYXRpb24uX3RUaW1lIC8gYW5pbWF0aW9uLl90RHVyO1xuICB0b3RhbFByb2dyZXNzICYmICFsZWF2ZVBsYXloZWFkICYmIChhbmltYXRpb24uX3RpbWUgKj0gZHVyIC8gYW5pbWF0aW9uLl9kdXIpO1xuICBhbmltYXRpb24uX2R1ciA9IGR1cjtcbiAgYW5pbWF0aW9uLl90RHVyID0gIXJlcGVhdCA/IGR1ciA6IHJlcGVhdCA8IDAgPyAxZTEwIDogX3JvdW5kUHJlY2lzZShkdXIgKiAocmVwZWF0ICsgMSkgKyBhbmltYXRpb24uX3JEZWxheSAqIHJlcGVhdCk7XG4gIHRvdGFsUHJvZ3Jlc3MgPiAwICYmICFsZWF2ZVBsYXloZWFkICYmIF9hbGlnblBsYXloZWFkKGFuaW1hdGlvbiwgYW5pbWF0aW9uLl90VGltZSA9IGFuaW1hdGlvbi5fdER1ciAqIHRvdGFsUHJvZ3Jlc3MpO1xuICBhbmltYXRpb24ucGFyZW50ICYmIF9zZXRFbmQoYW5pbWF0aW9uKTtcbiAgc2tpcFVuY2FjaGUgfHwgX3VuY2FjaGUoYW5pbWF0aW9uLnBhcmVudCwgYW5pbWF0aW9uKTtcbiAgcmV0dXJuIGFuaW1hdGlvbjtcbn0sXG4gICAgX29uVXBkYXRlVG90YWxEdXJhdGlvbiA9IGZ1bmN0aW9uIF9vblVwZGF0ZVRvdGFsRHVyYXRpb24oYW5pbWF0aW9uKSB7XG4gIHJldHVybiBhbmltYXRpb24gaW5zdGFuY2VvZiBUaW1lbGluZSA/IF91bmNhY2hlKGFuaW1hdGlvbikgOiBfc2V0RHVyYXRpb24oYW5pbWF0aW9uLCBhbmltYXRpb24uX2R1cik7XG59LFxuICAgIF96ZXJvUG9zaXRpb24gPSB7XG4gIF9zdGFydDogMCxcbiAgZW5kVGltZTogX2VtcHR5RnVuYyxcbiAgdG90YWxEdXJhdGlvbjogX2VtcHR5RnVuY1xufSxcbiAgICBfcGFyc2VQb3NpdGlvbiA9IGZ1bmN0aW9uIF9wYXJzZVBvc2l0aW9uKGFuaW1hdGlvbiwgcG9zaXRpb24sIHBlcmNlbnRBbmltYXRpb24pIHtcbiAgdmFyIGxhYmVscyA9IGFuaW1hdGlvbi5sYWJlbHMsXG4gICAgICByZWNlbnQgPSBhbmltYXRpb24uX3JlY2VudCB8fCBfemVyb1Bvc2l0aW9uLFxuICAgICAgY2xpcHBlZER1cmF0aW9uID0gYW5pbWF0aW9uLmR1cmF0aW9uKCkgPj0gX2JpZ051bSA/IHJlY2VudC5lbmRUaW1lKGZhbHNlKSA6IGFuaW1hdGlvbi5fZHVyLFxuICAgICAgLy9pbiBjYXNlIHRoZXJlJ3MgYSBjaGlsZCB0aGF0IGluZmluaXRlbHkgcmVwZWF0cywgdXNlcnMgYWxtb3N0IG5ldmVyIGludGVuZCBmb3IgdGhlIGluc2VydGlvbiBwb2ludCBvZiBhIG5ldyBjaGlsZCB0byBiZSBiYXNlZCBvbiBhIFNVUEVSIGxvbmcgdmFsdWUgbGlrZSB0aGF0IHNvIHdlIGNsaXAgaXQgYW5kIGFzc3VtZSB0aGUgbW9zdCByZWNlbnRseS1hZGRlZCBjaGlsZCdzIGVuZFRpbWUgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZC5cbiAgaSxcbiAgICAgIG9mZnNldCxcbiAgICAgIGlzUGVyY2VudDtcblxuICBpZiAoX2lzU3RyaW5nKHBvc2l0aW9uKSAmJiAoaXNOYU4ocG9zaXRpb24pIHx8IHBvc2l0aW9uIGluIGxhYmVscykpIHtcbiAgICAvL2lmIHRoZSBzdHJpbmcgaXMgYSBudW1iZXIgbGlrZSBcIjFcIiwgY2hlY2sgdG8gc2VlIGlmIHRoZXJlJ3MgYSBsYWJlbCB3aXRoIHRoYXQgbmFtZSwgb3RoZXJ3aXNlIGludGVycHJldCBpdCBhcyBhIG51bWJlciAoYWJzb2x1dGUgdmFsdWUpLlxuICAgIG9mZnNldCA9IHBvc2l0aW9uLmNoYXJBdCgwKTtcbiAgICBpc1BlcmNlbnQgPSBwb3NpdGlvbi5zdWJzdHIoLTEpID09PSBcIiVcIjtcbiAgICBpID0gcG9zaXRpb24uaW5kZXhPZihcIj1cIik7XG5cbiAgICBpZiAob2Zmc2V0ID09PSBcIjxcIiB8fCBvZmZzZXQgPT09IFwiPlwiKSB7XG4gICAgICBpID49IDAgJiYgKHBvc2l0aW9uID0gcG9zaXRpb24ucmVwbGFjZSgvPS8sIFwiXCIpKTtcbiAgICAgIHJldHVybiAob2Zmc2V0ID09PSBcIjxcIiA/IHJlY2VudC5fc3RhcnQgOiByZWNlbnQuZW5kVGltZShyZWNlbnQuX3JlcGVhdCA+PSAwKSkgKyAocGFyc2VGbG9hdChwb3NpdGlvbi5zdWJzdHIoMSkpIHx8IDApICogKGlzUGVyY2VudCA/IChpIDwgMCA/IHJlY2VudCA6IHBlcmNlbnRBbmltYXRpb24pLnRvdGFsRHVyYXRpb24oKSAvIDEwMCA6IDEpO1xuICAgIH1cblxuICAgIGlmIChpIDwgMCkge1xuICAgICAgcG9zaXRpb24gaW4gbGFiZWxzIHx8IChsYWJlbHNbcG9zaXRpb25dID0gY2xpcHBlZER1cmF0aW9uKTtcbiAgICAgIHJldHVybiBsYWJlbHNbcG9zaXRpb25dO1xuICAgIH1cblxuICAgIG9mZnNldCA9IHBhcnNlRmxvYXQocG9zaXRpb24uY2hhckF0KGkgLSAxKSArIHBvc2l0aW9uLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGlzUGVyY2VudCAmJiBwZXJjZW50QW5pbWF0aW9uKSB7XG4gICAgICBvZmZzZXQgPSBvZmZzZXQgLyAxMDAgKiAoX2lzQXJyYXkocGVyY2VudEFuaW1hdGlvbikgPyBwZXJjZW50QW5pbWF0aW9uWzBdIDogcGVyY2VudEFuaW1hdGlvbikudG90YWxEdXJhdGlvbigpO1xuICAgIH1cblxuICAgIHJldHVybiBpID4gMSA/IF9wYXJzZVBvc2l0aW9uKGFuaW1hdGlvbiwgcG9zaXRpb24uc3Vic3RyKDAsIGkgLSAxKSwgcGVyY2VudEFuaW1hdGlvbikgKyBvZmZzZXQgOiBjbGlwcGVkRHVyYXRpb24gKyBvZmZzZXQ7XG4gIH1cblxuICByZXR1cm4gcG9zaXRpb24gPT0gbnVsbCA/IGNsaXBwZWREdXJhdGlvbiA6ICtwb3NpdGlvbjtcbn0sXG4gICAgX2NyZWF0ZVR3ZWVuVHlwZSA9IGZ1bmN0aW9uIF9jcmVhdGVUd2VlblR5cGUodHlwZSwgcGFyYW1zLCB0aW1lbGluZSkge1xuICB2YXIgaXNMZWdhY3kgPSBfaXNOdW1iZXIocGFyYW1zWzFdKSxcbiAgICAgIHZhcnNJbmRleCA9IChpc0xlZ2FjeSA/IDIgOiAxKSArICh0eXBlIDwgMiA/IDAgOiAxKSxcbiAgICAgIHZhcnMgPSBwYXJhbXNbdmFyc0luZGV4XSxcbiAgICAgIGlyVmFycyxcbiAgICAgIHBhcmVudDtcblxuICBpc0xlZ2FjeSAmJiAodmFycy5kdXJhdGlvbiA9IHBhcmFtc1sxXSk7XG4gIHZhcnMucGFyZW50ID0gdGltZWxpbmU7XG5cbiAgaWYgKHR5cGUpIHtcbiAgICBpclZhcnMgPSB2YXJzO1xuICAgIHBhcmVudCA9IHRpbWVsaW5lO1xuXG4gICAgd2hpbGUgKHBhcmVudCAmJiAhKFwiaW1tZWRpYXRlUmVuZGVyXCIgaW4gaXJWYXJzKSkge1xuICAgICAgLy8gaW5oZXJpdGFuY2UgaGFzbid0IGhhcHBlbmVkIHlldCwgYnV0IHNvbWVvbmUgbWF5IGhhdmUgc2V0IGEgZGVmYXVsdCBpbiBhbiBhbmNlc3RvciB0aW1lbGluZS4gV2UgY291bGQgZG8gdmFycy5pbW1lZGlhdGVSZW5kZXIgPSBfaXNOb3RGYWxzZShfaW5oZXJpdERlZmF1bHRzKHZhcnMpLmltbWVkaWF0ZVJlbmRlcikgYnV0IHRoYXQnZCBleGFjdCBhIHNsaWdodCBwZXJmb3JtYW5jZSBwZW5hbHR5IGJlY2F1c2UgX2luaGVyaXREZWZhdWx0cygpIGFsc28gcnVucyBpbiB0aGUgVHdlZW4gY29uc3RydWN0b3IuIFdlJ3JlIHBheWluZyBhIHNtYWxsIGtiIHByaWNlIGhlcmUgdG8gZ2FpbiBzcGVlZC5cbiAgICAgIGlyVmFycyA9IHBhcmVudC52YXJzLmRlZmF1bHRzIHx8IHt9O1xuICAgICAgcGFyZW50ID0gX2lzTm90RmFsc2UocGFyZW50LnZhcnMuaW5oZXJpdCkgJiYgcGFyZW50LnBhcmVudDtcbiAgICB9XG5cbiAgICB2YXJzLmltbWVkaWF0ZVJlbmRlciA9IF9pc05vdEZhbHNlKGlyVmFycy5pbW1lZGlhdGVSZW5kZXIpO1xuICAgIHR5cGUgPCAyID8gdmFycy5ydW5CYWNrd2FyZHMgPSAxIDogdmFycy5zdGFydEF0ID0gcGFyYW1zW3ZhcnNJbmRleCAtIDFdOyAvLyBcImZyb21cIiB2YXJzXG4gIH1cblxuICByZXR1cm4gbmV3IFR3ZWVuKHBhcmFtc1swXSwgdmFycywgcGFyYW1zW3ZhcnNJbmRleCArIDFdKTtcbn0sXG4gICAgX2NvbmRpdGlvbmFsUmV0dXJuID0gZnVuY3Rpb24gX2NvbmRpdGlvbmFsUmV0dXJuKHZhbHVlLCBmdW5jKSB7XG4gIHJldHVybiB2YWx1ZSB8fCB2YWx1ZSA9PT0gMCA/IGZ1bmModmFsdWUpIDogZnVuYztcbn0sXG4gICAgX2NsYW1wID0gZnVuY3Rpb24gX2NsYW1wKG1pbiwgbWF4LCB2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPCBtaW4gPyBtaW4gOiB2YWx1ZSA+IG1heCA/IG1heCA6IHZhbHVlO1xufSxcbiAgICBnZXRVbml0ID0gZnVuY3Rpb24gZ2V0VW5pdCh2YWx1ZSwgdikge1xuICByZXR1cm4gIV9pc1N0cmluZyh2YWx1ZSkgfHwgISh2ID0gX3VuaXRFeHAuZXhlYyh2YWx1ZSkpID8gXCJcIiA6IHZbMV07XG59LFxuICAgIC8vIG5vdGU6IHByb3RlY3QgYWdhaW5zdCBwYWRkZWQgbnVtYmVycyBhcyBzdHJpbmdzLCBsaWtlIFwiMTAwLjEwMFwiLiBUaGF0IHNob3VsZG4ndCByZXR1cm4gXCIwMFwiIGFzIHRoZSB1bml0LiBJZiBpdCdzIG51bWVyaWMsIHJldHVybiBubyB1bml0LlxuY2xhbXAgPSBmdW5jdGlvbiBjbGFtcChtaW4sIG1heCwgdmFsdWUpIHtcbiAgcmV0dXJuIF9jb25kaXRpb25hbFJldHVybih2YWx1ZSwgZnVuY3Rpb24gKHYpIHtcbiAgICByZXR1cm4gX2NsYW1wKG1pbiwgbWF4LCB2KTtcbiAgfSk7XG59LFxuICAgIF9zbGljZSA9IFtdLnNsaWNlLFxuICAgIF9pc0FycmF5TGlrZSA9IGZ1bmN0aW9uIF9pc0FycmF5TGlrZSh2YWx1ZSwgbm9uRW1wdHkpIHtcbiAgcmV0dXJuIHZhbHVlICYmIF9pc09iamVjdCh2YWx1ZSkgJiYgXCJsZW5ndGhcIiBpbiB2YWx1ZSAmJiAoIW5vbkVtcHR5ICYmICF2YWx1ZS5sZW5ndGggfHwgdmFsdWUubGVuZ3RoIC0gMSBpbiB2YWx1ZSAmJiBfaXNPYmplY3QodmFsdWVbMF0pKSAmJiAhdmFsdWUubm9kZVR5cGUgJiYgdmFsdWUgIT09IF93aW47XG59LFxuICAgIF9mbGF0dGVuID0gZnVuY3Rpb24gX2ZsYXR0ZW4oYXIsIGxlYXZlU3RyaW5ncywgYWNjdW11bGF0b3IpIHtcbiAgaWYgKGFjY3VtdWxhdG9yID09PSB2b2lkIDApIHtcbiAgICBhY2N1bXVsYXRvciA9IFtdO1xuICB9XG5cbiAgcmV0dXJuIGFyLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgdmFyIF9hY2N1bXVsYXRvcjtcblxuICAgIHJldHVybiBfaXNTdHJpbmcodmFsdWUpICYmICFsZWF2ZVN0cmluZ3MgfHwgX2lzQXJyYXlMaWtlKHZhbHVlLCAxKSA/IChfYWNjdW11bGF0b3IgPSBhY2N1bXVsYXRvcikucHVzaC5hcHBseShfYWNjdW11bGF0b3IsIHRvQXJyYXkodmFsdWUpKSA6IGFjY3VtdWxhdG9yLnB1c2godmFsdWUpO1xuICB9KSB8fCBhY2N1bXVsYXRvcjtcbn0sXG4gICAgLy90YWtlcyBhbnkgdmFsdWUgYW5kIHJldHVybnMgYW4gYXJyYXkuIElmIGl0J3MgYSBzdHJpbmcgKGFuZCBsZWF2ZVN0cmluZ3MgaXNuJ3QgdHJ1ZSksIGl0J2xsIHVzZSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCkgYW5kIGNvbnZlcnQgdGhhdCB0byBhbiBhcnJheS4gSXQnbGwgYWxzbyBhY2NlcHQgaXRlcmFibGVzIGxpa2UgalF1ZXJ5IG9iamVjdHMuXG50b0FycmF5ID0gZnVuY3Rpb24gdG9BcnJheSh2YWx1ZSwgc2NvcGUsIGxlYXZlU3RyaW5ncykge1xuICByZXR1cm4gX2NvbnRleHQgJiYgIXNjb3BlICYmIF9jb250ZXh0LnNlbGVjdG9yID8gX2NvbnRleHQuc2VsZWN0b3IodmFsdWUpIDogX2lzU3RyaW5nKHZhbHVlKSAmJiAhbGVhdmVTdHJpbmdzICYmIChfY29yZUluaXR0ZWQgfHwgIV93YWtlKCkpID8gX3NsaWNlLmNhbGwoKHNjb3BlIHx8IF9kb2MpLnF1ZXJ5U2VsZWN0b3JBbGwodmFsdWUpLCAwKSA6IF9pc0FycmF5KHZhbHVlKSA/IF9mbGF0dGVuKHZhbHVlLCBsZWF2ZVN0cmluZ3MpIDogX2lzQXJyYXlMaWtlKHZhbHVlKSA/IF9zbGljZS5jYWxsKHZhbHVlLCAwKSA6IHZhbHVlID8gW3ZhbHVlXSA6IFtdO1xufSxcbiAgICBzZWxlY3RvciA9IGZ1bmN0aW9uIHNlbGVjdG9yKHZhbHVlKSB7XG4gIHZhbHVlID0gdG9BcnJheSh2YWx1ZSlbMF0gfHwgX3dhcm4oXCJJbnZhbGlkIHNjb3BlXCIpIHx8IHt9O1xuICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcbiAgICB2YXIgZWwgPSB2YWx1ZS5jdXJyZW50IHx8IHZhbHVlLm5hdGl2ZUVsZW1lbnQgfHwgdmFsdWU7XG4gICAgcmV0dXJuIHRvQXJyYXkodiwgZWwucXVlcnlTZWxlY3RvckFsbCA/IGVsIDogZWwgPT09IHZhbHVlID8gX3dhcm4oXCJJbnZhbGlkIHNjb3BlXCIpIHx8IF9kb2MuY3JlYXRlRWxlbWVudChcImRpdlwiKSA6IHZhbHVlKTtcbiAgfTtcbn0sXG4gICAgc2h1ZmZsZSA9IGZ1bmN0aW9uIHNodWZmbGUoYSkge1xuICByZXR1cm4gYS5zb3J0KGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gLjUgLSBNYXRoLnJhbmRvbSgpO1xuICB9KTtcbn0sXG4gICAgLy8gYWx0ZXJuYXRpdmUgdGhhdCdzIGEgYml0IGZhc3RlciBhbmQgbW9yZSByZWxpYWJseSBkaXZlcnNlIGJ1dCBiaWdnZXI6ICAgZm9yIChsZXQgaiwgdiwgaSA9IGEubGVuZ3RoOyBpOyBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSksIHYgPSBhWy0taV0sIGFbaV0gPSBhW2pdLCBhW2pdID0gdik7IHJldHVybiBhO1xuLy9mb3IgZGlzdHJpYnV0aW5nIHZhbHVlcyBhY3Jvc3MgYW4gYXJyYXkuIENhbiBhY2NlcHQgYSBudW1iZXIsIGEgZnVuY3Rpb24gb3IgKG1vc3QgY29tbW9ubHkpIGEgZnVuY3Rpb24gd2hpY2ggY2FuIGNvbnRhaW4gdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOiB7YmFzZSwgYW1vdW50LCBmcm9tLCBlYXNlLCBncmlkLCBheGlzLCBsZW5ndGgsIGVhY2h9LiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBleHBlY3RzIHRoZSBmb2xsb3dpbmcgcGFyYW1ldGVyczogaW5kZXgsIHRhcmdldCwgYXJyYXkuIFJlY29nbml6ZXMgdGhlIGZvbGxvd2luZ1xuZGlzdHJpYnV0ZSA9IGZ1bmN0aW9uIGRpc3RyaWJ1dGUodikge1xuICBpZiAoX2lzRnVuY3Rpb24odikpIHtcbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIHZhciB2YXJzID0gX2lzT2JqZWN0KHYpID8gdiA6IHtcbiAgICBlYWNoOiB2XG4gIH0sXG4gICAgICAvL246MSBpcyBqdXN0IHRvIGluZGljYXRlIHYgd2FzIGEgbnVtYmVyOyB3ZSBsZXZlcmFnZSB0aGF0IGxhdGVyIHRvIHNldCB2IGFjY29yZGluZyB0byB0aGUgbGVuZ3RoIHdlIGdldC4gSWYgYSBudW1iZXIgaXMgcGFzc2VkIGluLCB3ZSB0cmVhdCBpdCBsaWtlIHRoZSBvbGQgc3RhZ2dlciB2YWx1ZSB3aGVyZSAwLjEsIGZvciBleGFtcGxlLCB3b3VsZCBtZWFuIHRoYXQgdGhpbmdzIHdvdWxkIGJlIGRpc3RyaWJ1dGVkIHdpdGggMC4xIGJldHdlZW4gZWFjaCBlbGVtZW50IGluIHRoZSBhcnJheSByYXRoZXIgdGhhbiBhIHRvdGFsIFwiYW1vdW50XCIgdGhhdCdzIGNodW5rZWQgb3V0IGFtb25nIHRoZW0gYWxsLlxuICBlYXNlID0gX3BhcnNlRWFzZSh2YXJzLmVhc2UpLFxuICAgICAgZnJvbSA9IHZhcnMuZnJvbSB8fCAwLFxuICAgICAgYmFzZSA9IHBhcnNlRmxvYXQodmFycy5iYXNlKSB8fCAwLFxuICAgICAgY2FjaGUgPSB7fSxcbiAgICAgIGlzRGVjaW1hbCA9IGZyb20gPiAwICYmIGZyb20gPCAxLFxuICAgICAgcmF0aW9zID0gaXNOYU4oZnJvbSkgfHwgaXNEZWNpbWFsLFxuICAgICAgYXhpcyA9IHZhcnMuYXhpcyxcbiAgICAgIHJhdGlvWCA9IGZyb20sXG4gICAgICByYXRpb1kgPSBmcm9tO1xuXG4gIGlmIChfaXNTdHJpbmcoZnJvbSkpIHtcbiAgICByYXRpb1ggPSByYXRpb1kgPSB7XG4gICAgICBjZW50ZXI6IC41LFxuICAgICAgZWRnZXM6IC41LFxuICAgICAgZW5kOiAxXG4gICAgfVtmcm9tXSB8fCAwO1xuICB9IGVsc2UgaWYgKCFpc0RlY2ltYWwgJiYgcmF0aW9zKSB7XG4gICAgcmF0aW9YID0gZnJvbVswXTtcbiAgICByYXRpb1kgPSBmcm9tWzFdO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChpLCB0YXJnZXQsIGEpIHtcbiAgICB2YXIgbCA9IChhIHx8IHZhcnMpLmxlbmd0aCxcbiAgICAgICAgZGlzdGFuY2VzID0gY2FjaGVbbF0sXG4gICAgICAgIG9yaWdpblgsXG4gICAgICAgIG9yaWdpblksXG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIGQsXG4gICAgICAgIGosXG4gICAgICAgIG1heCxcbiAgICAgICAgbWluLFxuICAgICAgICB3cmFwQXQ7XG5cbiAgICBpZiAoIWRpc3RhbmNlcykge1xuICAgICAgd3JhcEF0ID0gdmFycy5ncmlkID09PSBcImF1dG9cIiA/IDAgOiAodmFycy5ncmlkIHx8IFsxLCBfYmlnTnVtXSlbMV07XG5cbiAgICAgIGlmICghd3JhcEF0KSB7XG4gICAgICAgIG1heCA9IC1fYmlnTnVtO1xuXG4gICAgICAgIHdoaWxlIChtYXggPCAobWF4ID0gYVt3cmFwQXQrK10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCkgJiYgd3JhcEF0IDwgbCkge31cblxuICAgICAgICB3cmFwQXQtLTtcbiAgICAgIH1cblxuICAgICAgZGlzdGFuY2VzID0gY2FjaGVbbF0gPSBbXTtcbiAgICAgIG9yaWdpblggPSByYXRpb3MgPyBNYXRoLm1pbih3cmFwQXQsIGwpICogcmF0aW9YIC0gLjUgOiBmcm9tICUgd3JhcEF0O1xuICAgICAgb3JpZ2luWSA9IHdyYXBBdCA9PT0gX2JpZ051bSA/IDAgOiByYXRpb3MgPyBsICogcmF0aW9ZIC8gd3JhcEF0IC0gLjUgOiBmcm9tIC8gd3JhcEF0IHwgMDtcbiAgICAgIG1heCA9IDA7XG4gICAgICBtaW4gPSBfYmlnTnVtO1xuXG4gICAgICBmb3IgKGogPSAwOyBqIDwgbDsgaisrKSB7XG4gICAgICAgIHggPSBqICUgd3JhcEF0IC0gb3JpZ2luWDtcbiAgICAgICAgeSA9IG9yaWdpblkgLSAoaiAvIHdyYXBBdCB8IDApO1xuICAgICAgICBkaXN0YW5jZXNbal0gPSBkID0gIWF4aXMgPyBfc3FydCh4ICogeCArIHkgKiB5KSA6IE1hdGguYWJzKGF4aXMgPT09IFwieVwiID8geSA6IHgpO1xuICAgICAgICBkID4gbWF4ICYmIChtYXggPSBkKTtcbiAgICAgICAgZCA8IG1pbiAmJiAobWluID0gZCk7XG4gICAgICB9XG5cbiAgICAgIGZyb20gPT09IFwicmFuZG9tXCIgJiYgc2h1ZmZsZShkaXN0YW5jZXMpO1xuICAgICAgZGlzdGFuY2VzLm1heCA9IG1heCAtIG1pbjtcbiAgICAgIGRpc3RhbmNlcy5taW4gPSBtaW47XG4gICAgICBkaXN0YW5jZXMudiA9IGwgPSAocGFyc2VGbG9hdCh2YXJzLmFtb3VudCkgfHwgcGFyc2VGbG9hdCh2YXJzLmVhY2gpICogKHdyYXBBdCA+IGwgPyBsIC0gMSA6ICFheGlzID8gTWF0aC5tYXgod3JhcEF0LCBsIC8gd3JhcEF0KSA6IGF4aXMgPT09IFwieVwiID8gbCAvIHdyYXBBdCA6IHdyYXBBdCkgfHwgMCkgKiAoZnJvbSA9PT0gXCJlZGdlc1wiID8gLTEgOiAxKTtcbiAgICAgIGRpc3RhbmNlcy5iID0gbCA8IDAgPyBiYXNlIC0gbCA6IGJhc2U7XG4gICAgICBkaXN0YW5jZXMudSA9IGdldFVuaXQodmFycy5hbW91bnQgfHwgdmFycy5lYWNoKSB8fCAwOyAvL3VuaXRcblxuICAgICAgZWFzZSA9IGVhc2UgJiYgbCA8IDAgPyBfaW52ZXJ0RWFzZShlYXNlKSA6IGVhc2U7XG4gICAgfVxuXG4gICAgbCA9IChkaXN0YW5jZXNbaV0gLSBkaXN0YW5jZXMubWluKSAvIGRpc3RhbmNlcy5tYXggfHwgMDtcbiAgICByZXR1cm4gX3JvdW5kUHJlY2lzZShkaXN0YW5jZXMuYiArIChlYXNlID8gZWFzZShsKSA6IGwpICogZGlzdGFuY2VzLnYpICsgZGlzdGFuY2VzLnU7IC8vcm91bmQgaW4gb3JkZXIgdG8gd29yayBhcm91bmQgZmxvYXRpbmcgcG9pbnQgZXJyb3JzXG4gIH07XG59LFxuICAgIF9yb3VuZE1vZGlmaWVyID0gZnVuY3Rpb24gX3JvdW5kTW9kaWZpZXIodikge1xuICAvL3Bhc3MgaW4gMC4xIGdldCBhIGZ1bmN0aW9uIHRoYXQnbGwgcm91bmQgdG8gdGhlIG5lYXJlc3QgdGVudGgsIG9yIDUgdG8gcm91bmQgdG8gdGhlIGNsb3Nlc3QgNSwgb3IgMC4wMDEgdG8gdGhlIGNsb3Nlc3QgMTAwMHRoLCBldGMuXG4gIHZhciBwID0gTWF0aC5wb3coMTAsICgodiArIFwiXCIpLnNwbGl0KFwiLlwiKVsxXSB8fCBcIlwiKS5sZW5ndGgpOyAvL3RvIGF2b2lkIGZsb2F0aW5nIHBvaW50IG1hdGggZXJyb3JzIChsaWtlIDI0ICogMC4xID09IDIuNDAwMDAwMDAwMDAwMDAwNCksIHdlIGNob3Agb2ZmIGF0IGEgc3BlY2lmaWMgbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIChtdWNoIGZhc3RlciB0aGFuIHRvRml4ZWQoKSlcblxuICByZXR1cm4gZnVuY3Rpb24gKHJhdykge1xuICAgIHZhciBuID0gX3JvdW5kUHJlY2lzZShNYXRoLnJvdW5kKHBhcnNlRmxvYXQocmF3KSAvIHYpICogdiAqIHApO1xuXG4gICAgcmV0dXJuIChuIC0gbiAlIDEpIC8gcCArIChfaXNOdW1iZXIocmF3KSA/IDAgOiBnZXRVbml0KHJhdykpOyAvLyBuIC0gbiAlIDEgcmVwbGFjZXMgTWF0aC5mbG9vcigpIGluIG9yZGVyIHRvIGhhbmRsZSBuZWdhdGl2ZSB2YWx1ZXMgcHJvcGVybHkuIEZvciBleGFtcGxlLCBNYXRoLmZsb29yKC0xNTAuMDAwMDAwMDAwMDAwMDMpIGlzIDE1MSFcbiAgfTtcbn0sXG4gICAgc25hcCA9IGZ1bmN0aW9uIHNuYXAoc25hcFRvLCB2YWx1ZSkge1xuICB2YXIgaXNBcnJheSA9IF9pc0FycmF5KHNuYXBUbyksXG4gICAgICByYWRpdXMsXG4gICAgICBpczJEO1xuXG4gIGlmICghaXNBcnJheSAmJiBfaXNPYmplY3Qoc25hcFRvKSkge1xuICAgIHJhZGl1cyA9IGlzQXJyYXkgPSBzbmFwVG8ucmFkaXVzIHx8IF9iaWdOdW07XG5cbiAgICBpZiAoc25hcFRvLnZhbHVlcykge1xuICAgICAgc25hcFRvID0gdG9BcnJheShzbmFwVG8udmFsdWVzKTtcblxuICAgICAgaWYgKGlzMkQgPSAhX2lzTnVtYmVyKHNuYXBUb1swXSkpIHtcbiAgICAgICAgcmFkaXVzICo9IHJhZGl1czsgLy9wZXJmb3JtYW5jZSBvcHRpbWl6YXRpb24gc28gd2UgZG9uJ3QgaGF2ZSB0byBNYXRoLnNxcnQoKSBpbiB0aGUgbG9vcC5cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc25hcFRvID0gX3JvdW5kTW9kaWZpZXIoc25hcFRvLmluY3JlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9jb25kaXRpb25hbFJldHVybih2YWx1ZSwgIWlzQXJyYXkgPyBfcm91bmRNb2RpZmllcihzbmFwVG8pIDogX2lzRnVuY3Rpb24oc25hcFRvKSA/IGZ1bmN0aW9uIChyYXcpIHtcbiAgICBpczJEID0gc25hcFRvKHJhdyk7XG4gICAgcmV0dXJuIE1hdGguYWJzKGlzMkQgLSByYXcpIDw9IHJhZGl1cyA/IGlzMkQgOiByYXc7XG4gIH0gOiBmdW5jdGlvbiAocmF3KSB7XG4gICAgdmFyIHggPSBwYXJzZUZsb2F0KGlzMkQgPyByYXcueCA6IHJhdyksXG4gICAgICAgIHkgPSBwYXJzZUZsb2F0KGlzMkQgPyByYXcueSA6IDApLFxuICAgICAgICBtaW4gPSBfYmlnTnVtLFxuICAgICAgICBjbG9zZXN0ID0gMCxcbiAgICAgICAgaSA9IHNuYXBUby5sZW5ndGgsXG4gICAgICAgIGR4LFxuICAgICAgICBkeTtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlmIChpczJEKSB7XG4gICAgICAgIGR4ID0gc25hcFRvW2ldLnggLSB4O1xuICAgICAgICBkeSA9IHNuYXBUb1tpXS55IC0geTtcbiAgICAgICAgZHggPSBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGR4ID0gTWF0aC5hYnMoc25hcFRvW2ldIC0geCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChkeCA8IG1pbikge1xuICAgICAgICBtaW4gPSBkeDtcbiAgICAgICAgY2xvc2VzdCA9IGk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2xvc2VzdCA9ICFyYWRpdXMgfHwgbWluIDw9IHJhZGl1cyA/IHNuYXBUb1tjbG9zZXN0XSA6IHJhdztcbiAgICByZXR1cm4gaXMyRCB8fCBjbG9zZXN0ID09PSByYXcgfHwgX2lzTnVtYmVyKHJhdykgPyBjbG9zZXN0IDogY2xvc2VzdCArIGdldFVuaXQocmF3KTtcbiAgfSk7XG59LFxuICAgIHJhbmRvbSA9IGZ1bmN0aW9uIHJhbmRvbShtaW4sIG1heCwgcm91bmRpbmdJbmNyZW1lbnQsIHJldHVybkZ1bmN0aW9uKSB7XG4gIHJldHVybiBfY29uZGl0aW9uYWxSZXR1cm4oX2lzQXJyYXkobWluKSA/ICFtYXggOiByb3VuZGluZ0luY3JlbWVudCA9PT0gdHJ1ZSA/ICEhKHJvdW5kaW5nSW5jcmVtZW50ID0gMCkgOiAhcmV0dXJuRnVuY3Rpb24sIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX2lzQXJyYXkobWluKSA/IG1pblt+fihNYXRoLnJhbmRvbSgpICogbWluLmxlbmd0aCldIDogKHJvdW5kaW5nSW5jcmVtZW50ID0gcm91bmRpbmdJbmNyZW1lbnQgfHwgMWUtNSkgJiYgKHJldHVybkZ1bmN0aW9uID0gcm91bmRpbmdJbmNyZW1lbnQgPCAxID8gTWF0aC5wb3coMTAsIChyb3VuZGluZ0luY3JlbWVudCArIFwiXCIpLmxlbmd0aCAtIDIpIDogMSkgJiYgTWF0aC5mbG9vcihNYXRoLnJvdW5kKChtaW4gLSByb3VuZGluZ0luY3JlbWVudCAvIDIgKyBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIHJvdW5kaW5nSW5jcmVtZW50ICogLjk5KSkgLyByb3VuZGluZ0luY3JlbWVudCkgKiByb3VuZGluZ0luY3JlbWVudCAqIHJldHVybkZ1bmN0aW9uKSAvIHJldHVybkZ1bmN0aW9uO1xuICB9KTtcbn0sXG4gICAgcGlwZSA9IGZ1bmN0aW9uIHBpcGUoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBmdW5jdGlvbnMgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgZnVuY3Rpb25zW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbnMucmVkdWNlKGZ1bmN0aW9uICh2LCBmKSB7XG4gICAgICByZXR1cm4gZih2KTtcbiAgICB9LCB2YWx1ZSk7XG4gIH07XG59LFxuICAgIHVuaXRpemUgPSBmdW5jdGlvbiB1bml0aXplKGZ1bmMsIHVuaXQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jKHBhcnNlRmxvYXQodmFsdWUpKSArICh1bml0IHx8IGdldFVuaXQodmFsdWUpKTtcbiAgfTtcbn0sXG4gICAgbm9ybWFsaXplID0gZnVuY3Rpb24gbm9ybWFsaXplKG1pbiwgbWF4LCB2YWx1ZSkge1xuICByZXR1cm4gbWFwUmFuZ2UobWluLCBtYXgsIDAsIDEsIHZhbHVlKTtcbn0sXG4gICAgX3dyYXBBcnJheSA9IGZ1bmN0aW9uIF93cmFwQXJyYXkoYSwgd3JhcHBlciwgdmFsdWUpIHtcbiAgcmV0dXJuIF9jb25kaXRpb25hbFJldHVybih2YWx1ZSwgZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgcmV0dXJuIGFbfn53cmFwcGVyKGluZGV4KV07XG4gIH0pO1xufSxcbiAgICB3cmFwID0gZnVuY3Rpb24gd3JhcChtaW4sIG1heCwgdmFsdWUpIHtcbiAgLy8gTk9URTogd3JhcCgpIENBTk5PVCBiZSBhbiBhcnJvdyBmdW5jdGlvbiEgQSB2ZXJ5IG9kZCBjb21waWxpbmcgYnVnIGNhdXNlcyBwcm9ibGVtcyAodW5yZWxhdGVkIHRvIEdTQVApLlxuICB2YXIgcmFuZ2UgPSBtYXggLSBtaW47XG4gIHJldHVybiBfaXNBcnJheShtaW4pID8gX3dyYXBBcnJheShtaW4sIHdyYXAoMCwgbWluLmxlbmd0aCksIG1heCkgOiBfY29uZGl0aW9uYWxSZXR1cm4odmFsdWUsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiAocmFuZ2UgKyAodmFsdWUgLSBtaW4pICUgcmFuZ2UpICUgcmFuZ2UgKyBtaW47XG4gIH0pO1xufSxcbiAgICB3cmFwWW95byA9IGZ1bmN0aW9uIHdyYXBZb3lvKG1pbiwgbWF4LCB2YWx1ZSkge1xuICB2YXIgcmFuZ2UgPSBtYXggLSBtaW4sXG4gICAgICB0b3RhbCA9IHJhbmdlICogMjtcbiAgcmV0dXJuIF9pc0FycmF5KG1pbikgPyBfd3JhcEFycmF5KG1pbiwgd3JhcFlveW8oMCwgbWluLmxlbmd0aCAtIDEpLCBtYXgpIDogX2NvbmRpdGlvbmFsUmV0dXJuKHZhbHVlLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB2YWx1ZSA9ICh0b3RhbCArICh2YWx1ZSAtIG1pbikgJSB0b3RhbCkgJSB0b3RhbCB8fCAwO1xuICAgIHJldHVybiBtaW4gKyAodmFsdWUgPiByYW5nZSA/IHRvdGFsIC0gdmFsdWUgOiB2YWx1ZSk7XG4gIH0pO1xufSxcbiAgICBfcmVwbGFjZVJhbmRvbSA9IGZ1bmN0aW9uIF9yZXBsYWNlUmFuZG9tKHZhbHVlKSB7XG4gIC8vcmVwbGFjZXMgYWxsIG9jY3VycmVuY2VzIG9mIHJhbmRvbSguLi4pIGluIGEgc3RyaW5nIHdpdGggdGhlIGNhbGN1bGF0ZWQgcmFuZG9tIHZhbHVlLiBjYW4gYmUgYSByYW5nZSBsaWtlIHJhbmRvbSgtMTAwLCAxMDAsIDUpIG9yIGFuIGFycmF5IGxpa2UgcmFuZG9tKFswLCAxMDAsIDUwMF0pXG4gIHZhciBwcmV2ID0gMCxcbiAgICAgIHMgPSBcIlwiLFxuICAgICAgaSxcbiAgICAgIG51bXMsXG4gICAgICBlbmQsXG4gICAgICBpc0FycmF5O1xuXG4gIHdoaWxlICh+KGkgPSB2YWx1ZS5pbmRleE9mKFwicmFuZG9tKFwiLCBwcmV2KSkpIHtcbiAgICBlbmQgPSB2YWx1ZS5pbmRleE9mKFwiKVwiLCBpKTtcbiAgICBpc0FycmF5ID0gdmFsdWUuY2hhckF0KGkgKyA3KSA9PT0gXCJbXCI7XG4gICAgbnVtcyA9IHZhbHVlLnN1YnN0cihpICsgNywgZW5kIC0gaSAtIDcpLm1hdGNoKGlzQXJyYXkgPyBfZGVsaW1pdGVkVmFsdWVFeHAgOiBfc3RyaWN0TnVtRXhwKTtcbiAgICBzICs9IHZhbHVlLnN1YnN0cihwcmV2LCBpIC0gcHJldikgKyByYW5kb20oaXNBcnJheSA/IG51bXMgOiArbnVtc1swXSwgaXNBcnJheSA/IDAgOiArbnVtc1sxXSwgK251bXNbMl0gfHwgMWUtNSk7XG4gICAgcHJldiA9IGVuZCArIDE7XG4gIH1cblxuICByZXR1cm4gcyArIHZhbHVlLnN1YnN0cihwcmV2LCB2YWx1ZS5sZW5ndGggLSBwcmV2KTtcbn0sXG4gICAgbWFwUmFuZ2UgPSBmdW5jdGlvbiBtYXBSYW5nZShpbk1pbiwgaW5NYXgsIG91dE1pbiwgb3V0TWF4LCB2YWx1ZSkge1xuICB2YXIgaW5SYW5nZSA9IGluTWF4IC0gaW5NaW4sXG4gICAgICBvdXRSYW5nZSA9IG91dE1heCAtIG91dE1pbjtcbiAgcmV0dXJuIF9jb25kaXRpb25hbFJldHVybih2YWx1ZSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIG91dE1pbiArICgodmFsdWUgLSBpbk1pbikgLyBpblJhbmdlICogb3V0UmFuZ2UgfHwgMCk7XG4gIH0pO1xufSxcbiAgICBpbnRlcnBvbGF0ZSA9IGZ1bmN0aW9uIGludGVycG9sYXRlKHN0YXJ0LCBlbmQsIHByb2dyZXNzLCBtdXRhdGUpIHtcbiAgdmFyIGZ1bmMgPSBpc05hTihzdGFydCArIGVuZCkgPyAwIDogZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gKDEgLSBwKSAqIHN0YXJ0ICsgcCAqIGVuZDtcbiAgfTtcblxuICBpZiAoIWZ1bmMpIHtcbiAgICB2YXIgaXNTdHJpbmcgPSBfaXNTdHJpbmcoc3RhcnQpLFxuICAgICAgICBtYXN0ZXIgPSB7fSxcbiAgICAgICAgcCxcbiAgICAgICAgaSxcbiAgICAgICAgaW50ZXJwb2xhdG9ycyxcbiAgICAgICAgbCxcbiAgICAgICAgaWw7XG5cbiAgICBwcm9ncmVzcyA9PT0gdHJ1ZSAmJiAobXV0YXRlID0gMSkgJiYgKHByb2dyZXNzID0gbnVsbCk7XG5cbiAgICBpZiAoaXNTdHJpbmcpIHtcbiAgICAgIHN0YXJ0ID0ge1xuICAgICAgICBwOiBzdGFydFxuICAgICAgfTtcbiAgICAgIGVuZCA9IHtcbiAgICAgICAgcDogZW5kXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoX2lzQXJyYXkoc3RhcnQpICYmICFfaXNBcnJheShlbmQpKSB7XG4gICAgICBpbnRlcnBvbGF0b3JzID0gW107XG4gICAgICBsID0gc3RhcnQubGVuZ3RoO1xuICAgICAgaWwgPSBsIC0gMjtcblxuICAgICAgZm9yIChpID0gMTsgaSA8IGw7IGkrKykge1xuICAgICAgICBpbnRlcnBvbGF0b3JzLnB1c2goaW50ZXJwb2xhdGUoc3RhcnRbaSAtIDFdLCBzdGFydFtpXSkpOyAvL2J1aWxkIHRoZSBpbnRlcnBvbGF0b3JzIHVwIGZyb250IGFzIGEgcGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uIHNvIHRoYXQgd2hlbiB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkIG1hbnkgdGltZXMsIGl0IGNhbiBqdXN0IHJldXNlIHRoZW0uXG4gICAgICB9XG5cbiAgICAgIGwtLTtcblxuICAgICAgZnVuYyA9IGZ1bmN0aW9uIGZ1bmMocCkge1xuICAgICAgICBwICo9IGw7XG4gICAgICAgIHZhciBpID0gTWF0aC5taW4oaWwsIH5+cCk7XG4gICAgICAgIHJldHVybiBpbnRlcnBvbGF0b3JzW2ldKHAgLSBpKTtcbiAgICAgIH07XG5cbiAgICAgIHByb2dyZXNzID0gZW5kO1xuICAgIH0gZWxzZSBpZiAoIW11dGF0ZSkge1xuICAgICAgc3RhcnQgPSBfbWVyZ2UoX2lzQXJyYXkoc3RhcnQpID8gW10gOiB7fSwgc3RhcnQpO1xuICAgIH1cblxuICAgIGlmICghaW50ZXJwb2xhdG9ycykge1xuICAgICAgZm9yIChwIGluIGVuZCkge1xuICAgICAgICBfYWRkUHJvcFR3ZWVuLmNhbGwobWFzdGVyLCBzdGFydCwgcCwgXCJnZXRcIiwgZW5kW3BdKTtcbiAgICAgIH1cblxuICAgICAgZnVuYyA9IGZ1bmN0aW9uIGZ1bmMocCkge1xuICAgICAgICByZXR1cm4gX3JlbmRlclByb3BUd2VlbnMocCwgbWFzdGVyKSB8fCAoaXNTdHJpbmcgPyBzdGFydC5wIDogc3RhcnQpO1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gX2NvbmRpdGlvbmFsUmV0dXJuKHByb2dyZXNzLCBmdW5jKTtcbn0sXG4gICAgX2dldExhYmVsSW5EaXJlY3Rpb24gPSBmdW5jdGlvbiBfZ2V0TGFiZWxJbkRpcmVjdGlvbih0aW1lbGluZSwgZnJvbVRpbWUsIGJhY2t3YXJkKSB7XG4gIC8vdXNlZCBmb3IgbmV4dExhYmVsKCkgYW5kIHByZXZpb3VzTGFiZWwoKVxuICB2YXIgbGFiZWxzID0gdGltZWxpbmUubGFiZWxzLFxuICAgICAgbWluID0gX2JpZ051bSxcbiAgICAgIHAsXG4gICAgICBkaXN0YW5jZSxcbiAgICAgIGxhYmVsO1xuXG4gIGZvciAocCBpbiBsYWJlbHMpIHtcbiAgICBkaXN0YW5jZSA9IGxhYmVsc1twXSAtIGZyb21UaW1lO1xuXG4gICAgaWYgKGRpc3RhbmNlIDwgMCA9PT0gISFiYWNrd2FyZCAmJiBkaXN0YW5jZSAmJiBtaW4gPiAoZGlzdGFuY2UgPSBNYXRoLmFicyhkaXN0YW5jZSkpKSB7XG4gICAgICBsYWJlbCA9IHA7XG4gICAgICBtaW4gPSBkaXN0YW5jZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbGFiZWw7XG59LFxuICAgIF9jYWxsYmFjayA9IGZ1bmN0aW9uIF9jYWxsYmFjayhhbmltYXRpb24sIHR5cGUsIGV4ZWN1dGVMYXp5Rmlyc3QpIHtcbiAgdmFyIHYgPSBhbmltYXRpb24udmFycyxcbiAgICAgIGNhbGxiYWNrID0gdlt0eXBlXSxcbiAgICAgIHByZXZDb250ZXh0ID0gX2NvbnRleHQsXG4gICAgICBjb250ZXh0ID0gYW5pbWF0aW9uLl9jdHgsXG4gICAgICBwYXJhbXMsXG4gICAgICBzY29wZSxcbiAgICAgIHJlc3VsdDtcblxuICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcGFyYW1zID0gdlt0eXBlICsgXCJQYXJhbXNcIl07XG4gIHNjb3BlID0gdi5jYWxsYmFja1Njb3BlIHx8IGFuaW1hdGlvbjtcbiAgZXhlY3V0ZUxhenlGaXJzdCAmJiBfbGF6eVR3ZWVucy5sZW5ndGggJiYgX2xhenlSZW5kZXIoKTsgLy9pbiBjYXNlIHJlbmRlcmluZyBjYXVzZWQgYW55IHR3ZWVucyB0byBsYXp5LWluaXQsIHdlIHNob3VsZCByZW5kZXIgdGhlbSBiZWNhdXNlIHR5cGljYWxseSB3aGVuIGEgdGltZWxpbmUgZmluaXNoZXMsIHVzZXJzIGV4cGVjdCB0aGluZ3MgdG8gaGF2ZSByZW5kZXJlZCBmdWxseS4gSW1hZ2luZSBhbiBvblVwZGF0ZSBvbiBhIHRpbWVsaW5lIHRoYXQgcmVwb3J0cy9jaGVja3MgdHdlZW5lZCB2YWx1ZXMuXG5cbiAgY29udGV4dCAmJiAoX2NvbnRleHQgPSBjb250ZXh0KTtcbiAgcmVzdWx0ID0gcGFyYW1zID8gY2FsbGJhY2suYXBwbHkoc2NvcGUsIHBhcmFtcykgOiBjYWxsYmFjay5jYWxsKHNjb3BlKTtcbiAgX2NvbnRleHQgPSBwcmV2Q29udGV4dDtcbiAgcmV0dXJuIHJlc3VsdDtcbn0sXG4gICAgX2ludGVycnVwdCA9IGZ1bmN0aW9uIF9pbnRlcnJ1cHQoYW5pbWF0aW9uKSB7XG4gIF9yZW1vdmVGcm9tUGFyZW50KGFuaW1hdGlvbik7XG5cbiAgYW5pbWF0aW9uLnNjcm9sbFRyaWdnZXIgJiYgYW5pbWF0aW9uLnNjcm9sbFRyaWdnZXIua2lsbCghIV9yZXZlcnRpbmcpO1xuICBhbmltYXRpb24ucHJvZ3Jlc3MoKSA8IDEgJiYgX2NhbGxiYWNrKGFuaW1hdGlvbiwgXCJvbkludGVycnVwdFwiKTtcbiAgcmV0dXJuIGFuaW1hdGlvbjtcbn0sXG4gICAgX3F1aWNrVHdlZW4sXG4gICAgX3JlZ2lzdGVyUGx1Z2luUXVldWUgPSBbXSxcbiAgICBfY3JlYXRlUGx1Z2luID0gZnVuY3Rpb24gX2NyZWF0ZVBsdWdpbihjb25maWcpIHtcbiAgaWYgKF93aW5kb3dFeGlzdHMoKSAmJiBjb25maWcpIHtcbiAgICAvLyBlZGdlIGNhc2U6IHNvbWUgYnVpbGQgdG9vbHMgbWF5IHBhc3MgaW4gYSBudWxsL3VuZGVmaW5lZCB2YWx1ZVxuICAgIGNvbmZpZyA9ICFjb25maWcubmFtZSAmJiBjb25maWdbXCJkZWZhdWx0XCJdIHx8IGNvbmZpZzsgLy9VTUQgcGFja2FnaW5nIHdyYXBzIHRoaW5ncyBvZGRseSwgc28gZm9yIGV4YW1wbGUgTW90aW9uUGF0aEhlbHBlciBiZWNvbWVzIHtNb3Rpb25QYXRoSGVscGVyOk1vdGlvblBhdGhIZWxwZXIsIGRlZmF1bHQ6TW90aW9uUGF0aEhlbHBlcn0uXG5cbiAgICB2YXIgbmFtZSA9IGNvbmZpZy5uYW1lLFxuICAgICAgICBpc0Z1bmMgPSBfaXNGdW5jdGlvbihjb25maWcpLFxuICAgICAgICBQbHVnaW4gPSBuYW1lICYmICFpc0Z1bmMgJiYgY29uZmlnLmluaXQgPyBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLl9wcm9wcyA9IFtdO1xuICAgIH0gOiBjb25maWcsXG4gICAgICAgIC8vaW4gY2FzZSBzb21lb25lIHBhc3NlcyBpbiBhbiBvYmplY3QgdGhhdCdzIG5vdCBhIHBsdWdpbiwgbGlrZSBDdXN0b21FYXNlXG4gICAgaW5zdGFuY2VEZWZhdWx0cyA9IHtcbiAgICAgIGluaXQ6IF9lbXB0eUZ1bmMsXG4gICAgICByZW5kZXI6IF9yZW5kZXJQcm9wVHdlZW5zLFxuICAgICAgYWRkOiBfYWRkUHJvcFR3ZWVuLFxuICAgICAga2lsbDogX2tpbGxQcm9wVHdlZW5zT2YsXG4gICAgICBtb2RpZmllcjogX2FkZFBsdWdpbk1vZGlmaWVyLFxuICAgICAgcmF3VmFyczogMFxuICAgIH0sXG4gICAgICAgIHN0YXRpY3MgPSB7XG4gICAgICB0YXJnZXRUZXN0OiAwLFxuICAgICAgZ2V0OiAwLFxuICAgICAgZ2V0U2V0dGVyOiBfZ2V0U2V0dGVyLFxuICAgICAgYWxpYXNlczoge30sXG4gICAgICByZWdpc3RlcjogMFxuICAgIH07XG5cbiAgICBfd2FrZSgpO1xuXG4gICAgaWYgKGNvbmZpZyAhPT0gUGx1Z2luKSB7XG4gICAgICBpZiAoX3BsdWdpbnNbbmFtZV0pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBfc2V0RGVmYXVsdHMoUGx1Z2luLCBfc2V0RGVmYXVsdHMoX2NvcHlFeGNsdWRpbmcoY29uZmlnLCBpbnN0YW5jZURlZmF1bHRzKSwgc3RhdGljcykpOyAvL3N0YXRpYyBtZXRob2RzXG5cblxuICAgICAgX21lcmdlKFBsdWdpbi5wcm90b3R5cGUsIF9tZXJnZShpbnN0YW5jZURlZmF1bHRzLCBfY29weUV4Y2x1ZGluZyhjb25maWcsIHN0YXRpY3MpKSk7IC8vaW5zdGFuY2UgbWV0aG9kc1xuXG5cbiAgICAgIF9wbHVnaW5zW1BsdWdpbi5wcm9wID0gbmFtZV0gPSBQbHVnaW47XG5cbiAgICAgIGlmIChjb25maWcudGFyZ2V0VGVzdCkge1xuICAgICAgICBfaGFybmVzc1BsdWdpbnMucHVzaChQbHVnaW4pO1xuXG4gICAgICAgIF9yZXNlcnZlZFByb3BzW25hbWVdID0gMTtcbiAgICAgIH1cblxuICAgICAgbmFtZSA9IChuYW1lID09PSBcImNzc1wiID8gXCJDU1NcIiA6IG5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnN1YnN0cigxKSkgKyBcIlBsdWdpblwiOyAvL2ZvciB0aGUgZ2xvYmFsIG5hbWUuIFwibW90aW9uUGF0aFwiIHNob3VsZCBiZWNvbWUgTW90aW9uUGF0aFBsdWdpblxuICAgIH1cblxuICAgIF9hZGRHbG9iYWwobmFtZSwgUGx1Z2luKTtcblxuICAgIGNvbmZpZy5yZWdpc3RlciAmJiBjb25maWcucmVnaXN0ZXIoZ3NhcCwgUGx1Z2luLCBQcm9wVHdlZW4pO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZyAmJiBfcmVnaXN0ZXJQbHVnaW5RdWV1ZS5wdXNoKGNvbmZpZyk7XG4gIH1cbn0sXG5cbi8qXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ09MT1JTXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5fMjU1ID0gMjU1LFxuICAgIF9jb2xvckxvb2t1cCA9IHtcbiAgYXF1YTogWzAsIF8yNTUsIF8yNTVdLFxuICBsaW1lOiBbMCwgXzI1NSwgMF0sXG4gIHNpbHZlcjogWzE5MiwgMTkyLCAxOTJdLFxuICBibGFjazogWzAsIDAsIDBdLFxuICBtYXJvb246IFsxMjgsIDAsIDBdLFxuICB0ZWFsOiBbMCwgMTI4LCAxMjhdLFxuICBibHVlOiBbMCwgMCwgXzI1NV0sXG4gIG5hdnk6IFswLCAwLCAxMjhdLFxuICB3aGl0ZTogW18yNTUsIF8yNTUsIF8yNTVdLFxuICBvbGl2ZTogWzEyOCwgMTI4LCAwXSxcbiAgeWVsbG93OiBbXzI1NSwgXzI1NSwgMF0sXG4gIG9yYW5nZTogW18yNTUsIDE2NSwgMF0sXG4gIGdyYXk6IFsxMjgsIDEyOCwgMTI4XSxcbiAgcHVycGxlOiBbMTI4LCAwLCAxMjhdLFxuICBncmVlbjogWzAsIDEyOCwgMF0sXG4gIHJlZDogW18yNTUsIDAsIDBdLFxuICBwaW5rOiBbXzI1NSwgMTkyLCAyMDNdLFxuICBjeWFuOiBbMCwgXzI1NSwgXzI1NV0sXG4gIHRyYW5zcGFyZW50OiBbXzI1NSwgXzI1NSwgXzI1NSwgMF1cbn0sXG4gICAgLy8gcG9zc2libGUgZnV0dXJlIGlkZWEgdG8gcmVwbGFjZSB0aGUgaGFyZC1jb2RlZCBjb2xvciBuYW1lIHZhbHVlcyAtIHB1dCB0aGlzIGluIHRoZSB0aWNrZXIud2FrZSgpIHdoZXJlIHdlIHNldCB0aGUgX2RvYzpcbi8vIGxldCBjdHggPSBfZG9jLmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikuZ2V0Q29udGV4dChcIjJkXCIpO1xuLy8gX2ZvckVhY2hOYW1lKFwiYXF1YSxsaW1lLHNpbHZlcixibGFjayxtYXJvb24sdGVhbCxibHVlLG5hdnksd2hpdGUsb2xpdmUseWVsbG93LG9yYW5nZSxncmF5LHB1cnBsZSxncmVlbixyZWQscGluayxjeWFuXCIsIGNvbG9yID0+IHtjdHguZmlsbFN0eWxlID0gY29sb3I7IF9jb2xvckxvb2t1cFtjb2xvcl0gPSBzcGxpdENvbG9yKGN0eC5maWxsU3R5bGUpfSk7XG5faHVlID0gZnVuY3Rpb24gX2h1ZShoLCBtMSwgbTIpIHtcbiAgaCArPSBoIDwgMCA/IDEgOiBoID4gMSA/IC0xIDogMDtcbiAgcmV0dXJuIChoICogNiA8IDEgPyBtMSArIChtMiAtIG0xKSAqIGggKiA2IDogaCA8IC41ID8gbTIgOiBoICogMyA8IDIgPyBtMSArIChtMiAtIG0xKSAqICgyIC8gMyAtIGgpICogNiA6IG0xKSAqIF8yNTUgKyAuNSB8IDA7XG59LFxuICAgIHNwbGl0Q29sb3IgPSBmdW5jdGlvbiBzcGxpdENvbG9yKHYsIHRvSFNMLCBmb3JjZUFscGhhKSB7XG4gIHZhciBhID0gIXYgPyBfY29sb3JMb29rdXAuYmxhY2sgOiBfaXNOdW1iZXIodikgPyBbdiA+PiAxNiwgdiA+PiA4ICYgXzI1NSwgdiAmIF8yNTVdIDogMCxcbiAgICAgIHIsXG4gICAgICBnLFxuICAgICAgYixcbiAgICAgIGgsXG4gICAgICBzLFxuICAgICAgbCxcbiAgICAgIG1heCxcbiAgICAgIG1pbixcbiAgICAgIGQsXG4gICAgICB3YXNIU0w7XG5cbiAgaWYgKCFhKSB7XG4gICAgaWYgKHYuc3Vic3RyKC0xKSA9PT0gXCIsXCIpIHtcbiAgICAgIC8vc29tZXRpbWVzIGEgdHJhaWxpbmcgY29tbWEgaXMgaW5jbHVkZWQgYW5kIHdlIHNob3VsZCBjaG9wIGl0IG9mZiAodHlwaWNhbGx5IGZyb20gYSBjb21tYS1kZWxpbWl0ZWQgbGlzdCBvZiB2YWx1ZXMgbGlrZSBhIHRleHRTaGFkb3c6XCIycHggMnB4IDJweCBibHVlLCA1cHggNXB4IDVweCByZ2IoMjU1LDAsMClcIiAtIGluIHRoaXMgZXhhbXBsZSBcImJsdWUsXCIgaGFzIGEgdHJhaWxpbmcgY29tbWEuIFdlIGNvdWxkIHN0cmlwIGl0IG91dCBpbnNpZGUgcGFyc2VDb21wbGV4KCkgYnV0IHdlJ2QgbmVlZCB0byBkbyBpdCB0byB0aGUgYmVnaW5uaW5nIGFuZCBlbmRpbmcgdmFsdWVzIHBsdXMgaXQgd291bGRuJ3QgcHJvdmlkZSBwcm90ZWN0aW9uIGZyb20gb3RoZXIgcG90ZW50aWFsIHNjZW5hcmlvcyBsaWtlIGlmIHRoZSB1c2VyIHBhc3NlcyBpbiBhIHNpbWlsYXIgdmFsdWUuXG4gICAgICB2ID0gdi5zdWJzdHIoMCwgdi5sZW5ndGggLSAxKTtcbiAgICB9XG5cbiAgICBpZiAoX2NvbG9yTG9va3VwW3ZdKSB7XG4gICAgICBhID0gX2NvbG9yTG9va3VwW3ZdO1xuICAgIH0gZWxzZSBpZiAodi5jaGFyQXQoMCkgPT09IFwiI1wiKSB7XG4gICAgICBpZiAodi5sZW5ndGggPCA2KSB7XG4gICAgICAgIC8vZm9yIHNob3J0aGFuZCBsaWtlICM5RjAgb3IgIzlGMEYgKGNvdWxkIGhhdmUgYWxwaGEpXG4gICAgICAgIHIgPSB2LmNoYXJBdCgxKTtcbiAgICAgICAgZyA9IHYuY2hhckF0KDIpO1xuICAgICAgICBiID0gdi5jaGFyQXQoMyk7XG4gICAgICAgIHYgPSBcIiNcIiArIHIgKyByICsgZyArIGcgKyBiICsgYiArICh2Lmxlbmd0aCA9PT0gNSA/IHYuY2hhckF0KDQpICsgdi5jaGFyQXQoNCkgOiBcIlwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHYubGVuZ3RoID09PSA5KSB7XG4gICAgICAgIC8vIGhleCB3aXRoIGFscGhhLCBsaWtlICNmZDVlNTNmZlxuICAgICAgICBhID0gcGFyc2VJbnQodi5zdWJzdHIoMSwgNiksIDE2KTtcbiAgICAgICAgcmV0dXJuIFthID4+IDE2LCBhID4+IDggJiBfMjU1LCBhICYgXzI1NSwgcGFyc2VJbnQodi5zdWJzdHIoNyksIDE2KSAvIDI1NV07XG4gICAgICB9XG5cbiAgICAgIHYgPSBwYXJzZUludCh2LnN1YnN0cigxKSwgMTYpO1xuICAgICAgYSA9IFt2ID4+IDE2LCB2ID4+IDggJiBfMjU1LCB2ICYgXzI1NV07XG4gICAgfSBlbHNlIGlmICh2LnN1YnN0cigwLCAzKSA9PT0gXCJoc2xcIikge1xuICAgICAgYSA9IHdhc0hTTCA9IHYubWF0Y2goX3N0cmljdE51bUV4cCk7XG5cbiAgICAgIGlmICghdG9IU0wpIHtcbiAgICAgICAgaCA9ICthWzBdICUgMzYwIC8gMzYwO1xuICAgICAgICBzID0gK2FbMV0gLyAxMDA7XG4gICAgICAgIGwgPSArYVsyXSAvIDEwMDtcbiAgICAgICAgZyA9IGwgPD0gLjUgPyBsICogKHMgKyAxKSA6IGwgKyBzIC0gbCAqIHM7XG4gICAgICAgIHIgPSBsICogMiAtIGc7XG4gICAgICAgIGEubGVuZ3RoID4gMyAmJiAoYVszXSAqPSAxKTsgLy9jYXN0IGFzIG51bWJlclxuXG4gICAgICAgIGFbMF0gPSBfaHVlKGggKyAxIC8gMywgciwgZyk7XG4gICAgICAgIGFbMV0gPSBfaHVlKGgsIHIsIGcpO1xuICAgICAgICBhWzJdID0gX2h1ZShoIC0gMSAvIDMsIHIsIGcpO1xuICAgICAgfSBlbHNlIGlmICh+di5pbmRleE9mKFwiPVwiKSkge1xuICAgICAgICAvL2lmIHJlbGF0aXZlIHZhbHVlcyBhcmUgZm91bmQsIGp1c3QgcmV0dXJuIHRoZSByYXcgc3RyaW5ncyB3aXRoIHRoZSByZWxhdGl2ZSBwcmVmaXhlcyBpbiBwbGFjZS5cbiAgICAgICAgYSA9IHYubWF0Y2goX251bUV4cCk7XG4gICAgICAgIGZvcmNlQWxwaGEgJiYgYS5sZW5ndGggPCA0ICYmIChhWzNdID0gMSk7XG4gICAgICAgIHJldHVybiBhO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhID0gdi5tYXRjaChfc3RyaWN0TnVtRXhwKSB8fCBfY29sb3JMb29rdXAudHJhbnNwYXJlbnQ7XG4gICAgfVxuXG4gICAgYSA9IGEubWFwKE51bWJlcik7XG4gIH1cblxuICBpZiAodG9IU0wgJiYgIXdhc0hTTCkge1xuICAgIHIgPSBhWzBdIC8gXzI1NTtcbiAgICBnID0gYVsxXSAvIF8yNTU7XG4gICAgYiA9IGFbMl0gLyBfMjU1O1xuICAgIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpO1xuICAgIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuICAgIGwgPSAobWF4ICsgbWluKSAvIDI7XG5cbiAgICBpZiAobWF4ID09PSBtaW4pIHtcbiAgICAgIGggPSBzID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgZCA9IG1heCAtIG1pbjtcbiAgICAgIHMgPSBsID4gMC41ID8gZCAvICgyIC0gbWF4IC0gbWluKSA6IGQgLyAobWF4ICsgbWluKTtcbiAgICAgIGggPSBtYXggPT09IHIgPyAoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKSA6IG1heCA9PT0gZyA/IChiIC0gcikgLyBkICsgMiA6IChyIC0gZykgLyBkICsgNDtcbiAgICAgIGggKj0gNjA7XG4gICAgfVxuXG4gICAgYVswXSA9IH5+KGggKyAuNSk7XG4gICAgYVsxXSA9IH5+KHMgKiAxMDAgKyAuNSk7XG4gICAgYVsyXSA9IH5+KGwgKiAxMDAgKyAuNSk7XG4gIH1cblxuICBmb3JjZUFscGhhICYmIGEubGVuZ3RoIDwgNCAmJiAoYVszXSA9IDEpO1xuICByZXR1cm4gYTtcbn0sXG4gICAgX2NvbG9yT3JkZXJEYXRhID0gZnVuY3Rpb24gX2NvbG9yT3JkZXJEYXRhKHYpIHtcbiAgLy8gc3RyaXBzIG91dCB0aGUgY29sb3JzIGZyb20gdGhlIHN0cmluZywgZmluZHMgYWxsIHRoZSBudW1lcmljIHNsb3RzICh3aXRoIHVuaXRzKSBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiB0aG9zZS4gVGhlIEFycmF5IGFsc28gaGFzIGEgXCJjXCIgcHJvcGVydHkgd2hpY2ggaXMgYW4gQXJyYXkgb2YgdGhlIGluZGV4IHZhbHVlcyB3aGVyZSB0aGUgY29sb3JzIGJlbG9uZy4gVGhpcyBpcyB0byBoZWxwIHdvcmsgYXJvdW5kIGlzc3VlcyB3aGVyZSB0aGVyZSdzIGEgbWlzLW1hdGNoZWQgb3JkZXIgb2YgY29sb3IvbnVtZXJpYyBkYXRhIGxpa2UgZHJvcC1zaGFkb3coI2YwMCAwcHggMXB4IDJweCkgYW5kIGRyb3Atc2hhZG93KDB4IDFweCAycHggI2YwMCkuIFRoaXMgaXMgYmFzaWNhbGx5IGEgaGVscGVyIGZ1bmN0aW9uIHVzZWQgaW4gX2Zvcm1hdENvbG9ycygpXG4gIHZhciB2YWx1ZXMgPSBbXSxcbiAgICAgIGMgPSBbXSxcbiAgICAgIGkgPSAtMTtcbiAgdi5zcGxpdChfY29sb3JFeHApLmZvckVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICB2YXIgYSA9IHYubWF0Y2goX251bVdpdGhVbml0RXhwKSB8fCBbXTtcbiAgICB2YWx1ZXMucHVzaC5hcHBseSh2YWx1ZXMsIGEpO1xuICAgIGMucHVzaChpICs9IGEubGVuZ3RoICsgMSk7XG4gIH0pO1xuICB2YWx1ZXMuYyA9IGM7XG4gIHJldHVybiB2YWx1ZXM7XG59LFxuICAgIF9mb3JtYXRDb2xvcnMgPSBmdW5jdGlvbiBfZm9ybWF0Q29sb3JzKHMsIHRvSFNMLCBvcmRlck1hdGNoRGF0YSkge1xuICB2YXIgcmVzdWx0ID0gXCJcIixcbiAgICAgIGNvbG9ycyA9IChzICsgcmVzdWx0KS5tYXRjaChfY29sb3JFeHApLFxuICAgICAgdHlwZSA9IHRvSFNMID8gXCJoc2xhKFwiIDogXCJyZ2JhKFwiLFxuICAgICAgaSA9IDAsXG4gICAgICBjLFxuICAgICAgc2hlbGwsXG4gICAgICBkLFxuICAgICAgbDtcblxuICBpZiAoIWNvbG9ycykge1xuICAgIHJldHVybiBzO1xuICB9XG5cbiAgY29sb3JzID0gY29sb3JzLm1hcChmdW5jdGlvbiAoY29sb3IpIHtcbiAgICByZXR1cm4gKGNvbG9yID0gc3BsaXRDb2xvcihjb2xvciwgdG9IU0wsIDEpKSAmJiB0eXBlICsgKHRvSFNMID8gY29sb3JbMF0gKyBcIixcIiArIGNvbG9yWzFdICsgXCIlLFwiICsgY29sb3JbMl0gKyBcIiUsXCIgKyBjb2xvclszXSA6IGNvbG9yLmpvaW4oXCIsXCIpKSArIFwiKVwiO1xuICB9KTtcblxuICBpZiAob3JkZXJNYXRjaERhdGEpIHtcbiAgICBkID0gX2NvbG9yT3JkZXJEYXRhKHMpO1xuICAgIGMgPSBvcmRlck1hdGNoRGF0YS5jO1xuXG4gICAgaWYgKGMuam9pbihyZXN1bHQpICE9PSBkLmMuam9pbihyZXN1bHQpKSB7XG4gICAgICBzaGVsbCA9IHMucmVwbGFjZShfY29sb3JFeHAsIFwiMVwiKS5zcGxpdChfbnVtV2l0aFVuaXRFeHApO1xuICAgICAgbCA9IHNoZWxsLmxlbmd0aCAtIDE7XG5cbiAgICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCArPSBzaGVsbFtpXSArICh+Yy5pbmRleE9mKGkpID8gY29sb3JzLnNoaWZ0KCkgfHwgdHlwZSArIFwiMCwwLDAsMClcIiA6IChkLmxlbmd0aCA/IGQgOiBjb2xvcnMubGVuZ3RoID8gY29sb3JzIDogb3JkZXJNYXRjaERhdGEpLnNoaWZ0KCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmICghc2hlbGwpIHtcbiAgICBzaGVsbCA9IHMuc3BsaXQoX2NvbG9yRXhwKTtcbiAgICBsID0gc2hlbGwubGVuZ3RoIC0gMTtcblxuICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgICByZXN1bHQgKz0gc2hlbGxbaV0gKyBjb2xvcnNbaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdCArIHNoZWxsW2xdO1xufSxcbiAgICBfY29sb3JFeHAgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzID0gXCIoPzpcXFxcYig/Oig/OnJnYnxyZ2JhfGhzbHxoc2xhKVxcXFwoLis/XFxcXCkpfFxcXFxCIyg/OlswLTlhLWZdezMsNH0pezEsMn1cXFxcYlwiLFxuICAgICAgLy93ZSdsbCBkeW5hbWljYWxseSBidWlsZCB0aGlzIFJlZ3VsYXIgRXhwcmVzc2lvbiB0byBjb25zZXJ2ZSBmaWxlIHNpemUuIEFmdGVyIGJ1aWxkaW5nIGl0LCBpdCB3aWxsIGJlIGFibGUgdG8gZmluZCByZ2IoKSwgcmdiYSgpLCAjIChoZXhhZGVjaW1hbCksIGFuZCBuYW1lZCBjb2xvciB2YWx1ZXMgbGlrZSByZWQsIGJsdWUsIHB1cnBsZSwgZXRjLixcbiAgcDtcblxuICBmb3IgKHAgaW4gX2NvbG9yTG9va3VwKSB7XG4gICAgcyArPSBcInxcIiArIHAgKyBcIlxcXFxiXCI7XG4gIH1cblxuICByZXR1cm4gbmV3IFJlZ0V4cChzICsgXCIpXCIsIFwiZ2lcIik7XG59KCksXG4gICAgX2hzbEV4cCA9IC9oc2xbYV0/XFwoLyxcbiAgICBfY29sb3JTdHJpbmdGaWx0ZXIgPSBmdW5jdGlvbiBfY29sb3JTdHJpbmdGaWx0ZXIoYSkge1xuICB2YXIgY29tYmluZWQgPSBhLmpvaW4oXCIgXCIpLFxuICAgICAgdG9IU0w7XG4gIF9jb2xvckV4cC5sYXN0SW5kZXggPSAwO1xuXG4gIGlmIChfY29sb3JFeHAudGVzdChjb21iaW5lZCkpIHtcbiAgICB0b0hTTCA9IF9oc2xFeHAudGVzdChjb21iaW5lZCk7XG4gICAgYVsxXSA9IF9mb3JtYXRDb2xvcnMoYVsxXSwgdG9IU0wpO1xuICAgIGFbMF0gPSBfZm9ybWF0Q29sb3JzKGFbMF0sIHRvSFNMLCBfY29sb3JPcmRlckRhdGEoYVsxXSkpOyAvLyBtYWtlIHN1cmUgdGhlIG9yZGVyIG9mIG51bWJlcnMvY29sb3JzIG1hdGNoIHdpdGggdGhlIEVORCB2YWx1ZS5cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG59LFxuXG4vKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFRJQ0tFUlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuX3RpY2tlckFjdGl2ZSxcbiAgICBfdGlja2VyID0gZnVuY3Rpb24gKCkge1xuICB2YXIgX2dldFRpbWUgPSBEYXRlLm5vdyxcbiAgICAgIF9sYWdUaHJlc2hvbGQgPSA1MDAsXG4gICAgICBfYWRqdXN0ZWRMYWcgPSAzMyxcbiAgICAgIF9zdGFydFRpbWUgPSBfZ2V0VGltZSgpLFxuICAgICAgX2xhc3RVcGRhdGUgPSBfc3RhcnRUaW1lLFxuICAgICAgX2dhcCA9IDEwMDAgLyAyNDAsXG4gICAgICBfbmV4dFRpbWUgPSBfZ2FwLFxuICAgICAgX2xpc3RlbmVycyA9IFtdLFxuICAgICAgX2lkLFxuICAgICAgX3JlcSxcbiAgICAgIF9yYWYsXG4gICAgICBfc2VsZixcbiAgICAgIF9kZWx0YSxcbiAgICAgIF9pLFxuICAgICAgX3RpY2sgPSBmdW5jdGlvbiBfdGljayh2KSB7XG4gICAgdmFyIGVsYXBzZWQgPSBfZ2V0VGltZSgpIC0gX2xhc3RVcGRhdGUsXG4gICAgICAgIG1hbnVhbCA9IHYgPT09IHRydWUsXG4gICAgICAgIG92ZXJsYXAsXG4gICAgICAgIGRpc3BhdGNoLFxuICAgICAgICB0aW1lLFxuICAgICAgICBmcmFtZTtcblxuICAgIGVsYXBzZWQgPiBfbGFnVGhyZXNob2xkICYmIChfc3RhcnRUaW1lICs9IGVsYXBzZWQgLSBfYWRqdXN0ZWRMYWcpO1xuICAgIF9sYXN0VXBkYXRlICs9IGVsYXBzZWQ7XG4gICAgdGltZSA9IF9sYXN0VXBkYXRlIC0gX3N0YXJ0VGltZTtcbiAgICBvdmVybGFwID0gdGltZSAtIF9uZXh0VGltZTtcblxuICAgIGlmIChvdmVybGFwID4gMCB8fCBtYW51YWwpIHtcbiAgICAgIGZyYW1lID0gKytfc2VsZi5mcmFtZTtcbiAgICAgIF9kZWx0YSA9IHRpbWUgLSBfc2VsZi50aW1lICogMTAwMDtcbiAgICAgIF9zZWxmLnRpbWUgPSB0aW1lID0gdGltZSAvIDEwMDA7XG4gICAgICBfbmV4dFRpbWUgKz0gb3ZlcmxhcCArIChvdmVybGFwID49IF9nYXAgPyA0IDogX2dhcCAtIG92ZXJsYXApO1xuICAgICAgZGlzcGF0Y2ggPSAxO1xuICAgIH1cblxuICAgIG1hbnVhbCB8fCAoX2lkID0gX3JlcShfdGljaykpOyAvL21ha2Ugc3VyZSB0aGUgcmVxdWVzdCBpcyBtYWRlIGJlZm9yZSB3ZSBkaXNwYXRjaCB0aGUgXCJ0aWNrXCIgZXZlbnQgc28gdGhhdCB0aW1pbmcgaXMgbWFpbnRhaW5lZC4gT3RoZXJ3aXNlLCBpZiBwcm9jZXNzaW5nIHRoZSBcInRpY2tcIiByZXF1aXJlcyBhIGJ1bmNoIG9mIHRpbWUgKGxpa2UgMTVtcykgYW5kIHdlJ3JlIHVzaW5nIGEgc2V0VGltZW91dCgpIHRoYXQncyBiYXNlZCBvbiAxNi43bXMsIGl0J2QgdGVjaG5pY2FsbHkgdGFrZSAzMS43bXMgYmV0d2VlbiBmcmFtZXMgb3RoZXJ3aXNlLlxuXG4gICAgaWYgKGRpc3BhdGNoKSB7XG4gICAgICBmb3IgKF9pID0gMDsgX2kgPCBfbGlzdGVuZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAvLyB1c2UgX2kgYW5kIGNoZWNrIF9saXN0ZW5lcnMubGVuZ3RoIGluc3RlYWQgb2YgYSB2YXJpYWJsZSBiZWNhdXNlIGEgbGlzdGVuZXIgY291bGQgZ2V0IHJlbW92ZWQgZHVyaW5nIHRoZSBsb29wLCBhbmQgaWYgdGhhdCBoYXBwZW5zIHRvIGFuIGVsZW1lbnQgbGVzcyB0aGFuIHRoZSBjdXJyZW50IGluZGV4LCBpdCdkIHRocm93IHRoaW5ncyBvZmYgaW4gdGhlIGxvb3AuXG4gICAgICAgIF9saXN0ZW5lcnNbX2ldKHRpbWUsIF9kZWx0YSwgZnJhbWUsIHYpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBfc2VsZiA9IHtcbiAgICB0aW1lOiAwLFxuICAgIGZyYW1lOiAwLFxuICAgIHRpY2s6IGZ1bmN0aW9uIHRpY2soKSB7XG4gICAgICBfdGljayh0cnVlKTtcbiAgICB9LFxuICAgIGRlbHRhUmF0aW86IGZ1bmN0aW9uIGRlbHRhUmF0aW8oZnBzKSB7XG4gICAgICByZXR1cm4gX2RlbHRhIC8gKDEwMDAgLyAoZnBzIHx8IDYwKSk7XG4gICAgfSxcbiAgICB3YWtlOiBmdW5jdGlvbiB3YWtlKCkge1xuICAgICAgaWYgKF9jb3JlUmVhZHkpIHtcbiAgICAgICAgaWYgKCFfY29yZUluaXR0ZWQgJiYgX3dpbmRvd0V4aXN0cygpKSB7XG4gICAgICAgICAgX3dpbiA9IF9jb3JlSW5pdHRlZCA9IHdpbmRvdztcbiAgICAgICAgICBfZG9jID0gX3dpbi5kb2N1bWVudCB8fCB7fTtcbiAgICAgICAgICBfZ2xvYmFscy5nc2FwID0gZ3NhcDtcbiAgICAgICAgICAoX3dpbi5nc2FwVmVyc2lvbnMgfHwgKF93aW4uZ3NhcFZlcnNpb25zID0gW10pKS5wdXNoKGdzYXAudmVyc2lvbik7XG5cbiAgICAgICAgICBfaW5zdGFsbChfaW5zdGFsbFNjb3BlIHx8IF93aW4uR3JlZW5Tb2NrR2xvYmFscyB8fCAhX3dpbi5nc2FwICYmIF93aW4gfHwge30pO1xuXG4gICAgICAgICAgX3JhZiA9IF93aW4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXG4gICAgICAgICAgX3JlZ2lzdGVyUGx1Z2luUXVldWUuZm9yRWFjaChfY3JlYXRlUGx1Z2luKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9pZCAmJiBfc2VsZi5zbGVlcCgpO1xuXG4gICAgICAgIF9yZXEgPSBfcmFmIHx8IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZiwgX25leHRUaW1lIC0gX3NlbGYudGltZSAqIDEwMDAgKyAxIHwgMCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgX3RpY2tlckFjdGl2ZSA9IDE7XG5cbiAgICAgICAgX3RpY2soMik7XG4gICAgICB9XG4gICAgfSxcbiAgICBzbGVlcDogZnVuY3Rpb24gc2xlZXAoKSB7XG4gICAgICAoX3JhZiA/IF93aW4uY2FuY2VsQW5pbWF0aW9uRnJhbWUgOiBjbGVhclRpbWVvdXQpKF9pZCk7XG4gICAgICBfdGlja2VyQWN0aXZlID0gMDtcbiAgICAgIF9yZXEgPSBfZW1wdHlGdW5jO1xuICAgIH0sXG4gICAgbGFnU21vb3RoaW5nOiBmdW5jdGlvbiBsYWdTbW9vdGhpbmcodGhyZXNob2xkLCBhZGp1c3RlZExhZykge1xuICAgICAgX2xhZ1RocmVzaG9sZCA9IHRocmVzaG9sZCB8fCBJbmZpbml0eTsgLy8gemVybyBzaG91bGQgYmUgaW50ZXJwcmV0ZWQgYXMgYmFzaWNhbGx5IHVubGltaXRlZFxuXG4gICAgICBfYWRqdXN0ZWRMYWcgPSBNYXRoLm1pbihhZGp1c3RlZExhZyB8fCAzMywgX2xhZ1RocmVzaG9sZCk7XG4gICAgfSxcbiAgICBmcHM6IGZ1bmN0aW9uIGZwcyhfZnBzKSB7XG4gICAgICBfZ2FwID0gMTAwMCAvIChfZnBzIHx8IDI0MCk7XG4gICAgICBfbmV4dFRpbWUgPSBfc2VsZi50aW1lICogMTAwMCArIF9nYXA7XG4gICAgfSxcbiAgICBhZGQ6IGZ1bmN0aW9uIGFkZChjYWxsYmFjaywgb25jZSwgcHJpb3JpdGl6ZSkge1xuICAgICAgdmFyIGZ1bmMgPSBvbmNlID8gZnVuY3Rpb24gKHQsIGQsIGYsIHYpIHtcbiAgICAgICAgY2FsbGJhY2sodCwgZCwgZiwgdik7XG5cbiAgICAgICAgX3NlbGYucmVtb3ZlKGZ1bmMpO1xuICAgICAgfSA6IGNhbGxiYWNrO1xuXG4gICAgICBfc2VsZi5yZW1vdmUoY2FsbGJhY2spO1xuXG4gICAgICBfbGlzdGVuZXJzW3ByaW9yaXRpemUgPyBcInVuc2hpZnRcIiA6IFwicHVzaFwiXShmdW5jKTtcblxuICAgICAgX3dha2UoKTtcblxuICAgICAgcmV0dXJuIGZ1bmM7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShjYWxsYmFjaywgaSkge1xuICAgICAgfihpID0gX2xpc3RlbmVycy5pbmRleE9mKGNhbGxiYWNrKSkgJiYgX2xpc3RlbmVycy5zcGxpY2UoaSwgMSkgJiYgX2kgPj0gaSAmJiBfaS0tO1xuICAgIH0sXG4gICAgX2xpc3RlbmVyczogX2xpc3RlbmVyc1xuICB9O1xuICByZXR1cm4gX3NlbGY7XG59KCksXG4gICAgX3dha2UgPSBmdW5jdGlvbiBfd2FrZSgpIHtcbiAgcmV0dXJuICFfdGlja2VyQWN0aXZlICYmIF90aWNrZXIud2FrZSgpO1xufSxcbiAgICAvL2Fsc28gZW5zdXJlcyB0aGUgY29yZSBjbGFzc2VzIGFyZSBpbml0aWFsaXplZC5cblxuLypcbiogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuKiBFQVNJTkdcbiogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuKi9cbl9lYXNlTWFwID0ge30sXG4gICAgX2N1c3RvbUVhc2VFeHAgPSAvXltcXGQuXFwtTV1bXFxkLlxcLSxcXHNdLyxcbiAgICBfcXVvdGVzRXhwID0gL1tcIiddL2csXG4gICAgX3BhcnNlT2JqZWN0SW5TdHJpbmcgPSBmdW5jdGlvbiBfcGFyc2VPYmplY3RJblN0cmluZyh2YWx1ZSkge1xuICAvL3Rha2VzIGEgc3RyaW5nIGxpa2UgXCJ7d2lnZ2xlczoxMCwgdHlwZTphbnRpY2lwYXRlfSlcIiBhbmQgdHVybnMgaXQgaW50byBhIHJlYWwgb2JqZWN0LiBOb3RpY2UgaXQgZW5kcyBpbiBcIilcIiBhbmQgaW5jbHVkZXMgdGhlIHt9IHdyYXBwZXJzLiBUaGlzIGlzIGJlY2F1c2Ugd2Ugb25seSB1c2UgdGhpcyBmdW5jdGlvbiBmb3IgcGFyc2luZyBlYXNlIGNvbmZpZ3MgYW5kIHByaW9yaXRpemVkIG9wdGltaXphdGlvbiByYXRoZXIgdGhhbiByZXVzYWJpbGl0eS5cbiAgdmFyIG9iaiA9IHt9LFxuICAgICAgc3BsaXQgPSB2YWx1ZS5zdWJzdHIoMSwgdmFsdWUubGVuZ3RoIC0gMykuc3BsaXQoXCI6XCIpLFxuICAgICAga2V5ID0gc3BsaXRbMF0sXG4gICAgICBpID0gMSxcbiAgICAgIGwgPSBzcGxpdC5sZW5ndGgsXG4gICAgICBpbmRleCxcbiAgICAgIHZhbCxcbiAgICAgIHBhcnNlZFZhbDtcblxuICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgIHZhbCA9IHNwbGl0W2ldO1xuICAgIGluZGV4ID0gaSAhPT0gbCAtIDEgPyB2YWwubGFzdEluZGV4T2YoXCIsXCIpIDogdmFsLmxlbmd0aDtcbiAgICBwYXJzZWRWYWwgPSB2YWwuc3Vic3RyKDAsIGluZGV4KTtcbiAgICBvYmpba2V5XSA9IGlzTmFOKHBhcnNlZFZhbCkgPyBwYXJzZWRWYWwucmVwbGFjZShfcXVvdGVzRXhwLCBcIlwiKS50cmltKCkgOiArcGFyc2VkVmFsO1xuICAgIGtleSA9IHZhbC5zdWJzdHIoaW5kZXggKyAxKS50cmltKCk7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufSxcbiAgICBfdmFsdWVJblBhcmVudGhlc2VzID0gZnVuY3Rpb24gX3ZhbHVlSW5QYXJlbnRoZXNlcyh2YWx1ZSkge1xuICB2YXIgb3BlbiA9IHZhbHVlLmluZGV4T2YoXCIoXCIpICsgMSxcbiAgICAgIGNsb3NlID0gdmFsdWUuaW5kZXhPZihcIilcIiksXG4gICAgICBuZXN0ZWQgPSB2YWx1ZS5pbmRleE9mKFwiKFwiLCBvcGVuKTtcbiAgcmV0dXJuIHZhbHVlLnN1YnN0cmluZyhvcGVuLCB+bmVzdGVkICYmIG5lc3RlZCA8IGNsb3NlID8gdmFsdWUuaW5kZXhPZihcIilcIiwgY2xvc2UgKyAxKSA6IGNsb3NlKTtcbn0sXG4gICAgX2NvbmZpZ0Vhc2VGcm9tU3RyaW5nID0gZnVuY3Rpb24gX2NvbmZpZ0Vhc2VGcm9tU3RyaW5nKG5hbWUpIHtcbiAgLy9uYW1lIGNhbiBiZSBhIHN0cmluZyBsaWtlIFwiZWxhc3RpYy5vdXQoMSwwLjUpXCIsIGFuZCBwYXNzIGluIF9lYXNlTWFwIGFzIG9iaiBhbmQgaXQnbGwgcGFyc2UgaXQgb3V0IGFuZCBjYWxsIHRoZSBhY3R1YWwgZnVuY3Rpb24gbGlrZSBfZWFzZU1hcC5FbGFzdGljLmVhc2VPdXQuY29uZmlnKDEsMC41KS4gSXQgd2lsbCBhbHNvIHBhcnNlIGN1c3RvbSBlYXNlIHN0cmluZ3MgYXMgbG9uZyBhcyBDdXN0b21FYXNlIGlzIGxvYWRlZCBhbmQgcmVnaXN0ZXJlZCAoaW50ZXJuYWxseSBhcyBfZWFzZU1hcC5fQ0UpLlxuICB2YXIgc3BsaXQgPSAobmFtZSArIFwiXCIpLnNwbGl0KFwiKFwiKSxcbiAgICAgIGVhc2UgPSBfZWFzZU1hcFtzcGxpdFswXV07XG4gIHJldHVybiBlYXNlICYmIHNwbGl0Lmxlbmd0aCA+IDEgJiYgZWFzZS5jb25maWcgPyBlYXNlLmNvbmZpZy5hcHBseShudWxsLCB+bmFtZS5pbmRleE9mKFwie1wiKSA/IFtfcGFyc2VPYmplY3RJblN0cmluZyhzcGxpdFsxXSldIDogX3ZhbHVlSW5QYXJlbnRoZXNlcyhuYW1lKS5zcGxpdChcIixcIikubWFwKF9udW1lcmljSWZQb3NzaWJsZSkpIDogX2Vhc2VNYXAuX0NFICYmIF9jdXN0b21FYXNlRXhwLnRlc3QobmFtZSkgPyBfZWFzZU1hcC5fQ0UoXCJcIiwgbmFtZSkgOiBlYXNlO1xufSxcbiAgICBfaW52ZXJ0RWFzZSA9IGZ1bmN0aW9uIF9pbnZlcnRFYXNlKGVhc2UpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChwKSB7XG4gICAgcmV0dXJuIDEgLSBlYXNlKDEgLSBwKTtcbiAgfTtcbn0sXG4gICAgLy8gYWxsb3cgeW95b0Vhc2UgdG8gYmUgc2V0IGluIGNoaWxkcmVuIGFuZCBoYXZlIHRob3NlIGFmZmVjdGVkIHdoZW4gdGhlIHBhcmVudC9hbmNlc3RvciB0aW1lbGluZSB5b3lvcy5cbl9wcm9wYWdhdGVZb3lvRWFzZSA9IGZ1bmN0aW9uIF9wcm9wYWdhdGVZb3lvRWFzZSh0aW1lbGluZSwgaXNZb3lvKSB7XG4gIHZhciBjaGlsZCA9IHRpbWVsaW5lLl9maXJzdCxcbiAgICAgIGVhc2U7XG5cbiAgd2hpbGUgKGNoaWxkKSB7XG4gICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgVGltZWxpbmUpIHtcbiAgICAgIF9wcm9wYWdhdGVZb3lvRWFzZShjaGlsZCwgaXNZb3lvKTtcbiAgICB9IGVsc2UgaWYgKGNoaWxkLnZhcnMueW95b0Vhc2UgJiYgKCFjaGlsZC5feW95byB8fCAhY2hpbGQuX3JlcGVhdCkgJiYgY2hpbGQuX3lveW8gIT09IGlzWW95bykge1xuICAgICAgaWYgKGNoaWxkLnRpbWVsaW5lKSB7XG4gICAgICAgIF9wcm9wYWdhdGVZb3lvRWFzZShjaGlsZC50aW1lbGluZSwgaXNZb3lvKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVhc2UgPSBjaGlsZC5fZWFzZTtcbiAgICAgICAgY2hpbGQuX2Vhc2UgPSBjaGlsZC5feUVhc2U7XG4gICAgICAgIGNoaWxkLl95RWFzZSA9IGVhc2U7XG4gICAgICAgIGNoaWxkLl95b3lvID0gaXNZb3lvO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNoaWxkID0gY2hpbGQuX25leHQ7XG4gIH1cbn0sXG4gICAgX3BhcnNlRWFzZSA9IGZ1bmN0aW9uIF9wYXJzZUVhc2UoZWFzZSwgZGVmYXVsdEVhc2UpIHtcbiAgcmV0dXJuICFlYXNlID8gZGVmYXVsdEVhc2UgOiAoX2lzRnVuY3Rpb24oZWFzZSkgPyBlYXNlIDogX2Vhc2VNYXBbZWFzZV0gfHwgX2NvbmZpZ0Vhc2VGcm9tU3RyaW5nKGVhc2UpKSB8fCBkZWZhdWx0RWFzZTtcbn0sXG4gICAgX2luc2VydEVhc2UgPSBmdW5jdGlvbiBfaW5zZXJ0RWFzZShuYW1lcywgZWFzZUluLCBlYXNlT3V0LCBlYXNlSW5PdXQpIHtcbiAgaWYgKGVhc2VPdXQgPT09IHZvaWQgMCkge1xuICAgIGVhc2VPdXQgPSBmdW5jdGlvbiBlYXNlT3V0KHApIHtcbiAgICAgIHJldHVybiAxIC0gZWFzZUluKDEgLSBwKTtcbiAgICB9O1xuICB9XG5cbiAgaWYgKGVhc2VJbk91dCA9PT0gdm9pZCAwKSB7XG4gICAgZWFzZUluT3V0ID0gZnVuY3Rpb24gZWFzZUluT3V0KHApIHtcbiAgICAgIHJldHVybiBwIDwgLjUgPyBlYXNlSW4ocCAqIDIpIC8gMiA6IDEgLSBlYXNlSW4oKDEgLSBwKSAqIDIpIC8gMjtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGVhc2UgPSB7XG4gICAgZWFzZUluOiBlYXNlSW4sXG4gICAgZWFzZU91dDogZWFzZU91dCxcbiAgICBlYXNlSW5PdXQ6IGVhc2VJbk91dFxuICB9LFxuICAgICAgbG93ZXJjYXNlTmFtZTtcblxuICBfZm9yRWFjaE5hbWUobmFtZXMsIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgX2Vhc2VNYXBbbmFtZV0gPSBfZ2xvYmFsc1tuYW1lXSA9IGVhc2U7XG4gICAgX2Vhc2VNYXBbbG93ZXJjYXNlTmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKV0gPSBlYXNlT3V0O1xuXG4gICAgZm9yICh2YXIgcCBpbiBlYXNlKSB7XG4gICAgICBfZWFzZU1hcFtsb3dlcmNhc2VOYW1lICsgKHAgPT09IFwiZWFzZUluXCIgPyBcIi5pblwiIDogcCA9PT0gXCJlYXNlT3V0XCIgPyBcIi5vdXRcIiA6IFwiLmluT3V0XCIpXSA9IF9lYXNlTWFwW25hbWUgKyBcIi5cIiArIHBdID0gZWFzZVtwXTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBlYXNlO1xufSxcbiAgICBfZWFzZUluT3V0RnJvbU91dCA9IGZ1bmN0aW9uIF9lYXNlSW5PdXRGcm9tT3V0KGVhc2VPdXQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChwKSB7XG4gICAgcmV0dXJuIHAgPCAuNSA/ICgxIC0gZWFzZU91dCgxIC0gcCAqIDIpKSAvIDIgOiAuNSArIGVhc2VPdXQoKHAgLSAuNSkgKiAyKSAvIDI7XG4gIH07XG59LFxuICAgIF9jb25maWdFbGFzdGljID0gZnVuY3Rpb24gX2NvbmZpZ0VsYXN0aWModHlwZSwgYW1wbGl0dWRlLCBwZXJpb2QpIHtcbiAgdmFyIHAxID0gYW1wbGl0dWRlID49IDEgPyBhbXBsaXR1ZGUgOiAxLFxuICAgICAgLy9ub3RlOiBpZiBhbXBsaXR1ZGUgaXMgPCAxLCB3ZSBzaW1wbHkgYWRqdXN0IHRoZSBwZXJpb2QgZm9yIGEgbW9yZSBuYXR1cmFsIGZlZWwuIE90aGVyd2lzZSB0aGUgbWF0aCBkb2Vzbid0IHdvcmsgcmlnaHQgYW5kIHRoZSBjdXJ2ZSBzdGFydHMgYXQgMS5cbiAgcDIgPSAocGVyaW9kIHx8ICh0eXBlID8gLjMgOiAuNDUpKSAvIChhbXBsaXR1ZGUgPCAxID8gYW1wbGl0dWRlIDogMSksXG4gICAgICBwMyA9IHAyIC8gXzJQSSAqIChNYXRoLmFzaW4oMSAvIHAxKSB8fCAwKSxcbiAgICAgIGVhc2VPdXQgPSBmdW5jdGlvbiBlYXNlT3V0KHApIHtcbiAgICByZXR1cm4gcCA9PT0gMSA/IDEgOiBwMSAqIE1hdGgucG93KDIsIC0xMCAqIHApICogX3NpbigocCAtIHAzKSAqIHAyKSArIDE7XG4gIH0sXG4gICAgICBlYXNlID0gdHlwZSA9PT0gXCJvdXRcIiA/IGVhc2VPdXQgOiB0eXBlID09PSBcImluXCIgPyBmdW5jdGlvbiAocCkge1xuICAgIHJldHVybiAxIC0gZWFzZU91dCgxIC0gcCk7XG4gIH0gOiBfZWFzZUluT3V0RnJvbU91dChlYXNlT3V0KTtcblxuICBwMiA9IF8yUEkgLyBwMjsgLy9wcmVjYWxjdWxhdGUgdG8gb3B0aW1pemVcblxuICBlYXNlLmNvbmZpZyA9IGZ1bmN0aW9uIChhbXBsaXR1ZGUsIHBlcmlvZCkge1xuICAgIHJldHVybiBfY29uZmlnRWxhc3RpYyh0eXBlLCBhbXBsaXR1ZGUsIHBlcmlvZCk7XG4gIH07XG5cbiAgcmV0dXJuIGVhc2U7XG59LFxuICAgIF9jb25maWdCYWNrID0gZnVuY3Rpb24gX2NvbmZpZ0JhY2sodHlwZSwgb3ZlcnNob290KSB7XG4gIGlmIChvdmVyc2hvb3QgPT09IHZvaWQgMCkge1xuICAgIG92ZXJzaG9vdCA9IDEuNzAxNTg7XG4gIH1cblxuICB2YXIgZWFzZU91dCA9IGZ1bmN0aW9uIGVhc2VPdXQocCkge1xuICAgIHJldHVybiBwID8gLS1wICogcCAqICgob3ZlcnNob290ICsgMSkgKiBwICsgb3ZlcnNob290KSArIDEgOiAwO1xuICB9LFxuICAgICAgZWFzZSA9IHR5cGUgPT09IFwib3V0XCIgPyBlYXNlT3V0IDogdHlwZSA9PT0gXCJpblwiID8gZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gMSAtIGVhc2VPdXQoMSAtIHApO1xuICB9IDogX2Vhc2VJbk91dEZyb21PdXQoZWFzZU91dCk7XG5cbiAgZWFzZS5jb25maWcgPSBmdW5jdGlvbiAob3ZlcnNob290KSB7XG4gICAgcmV0dXJuIF9jb25maWdCYWNrKHR5cGUsIG92ZXJzaG9vdCk7XG4gIH07XG5cbiAgcmV0dXJuIGVhc2U7XG59OyAvLyBhIGNoZWFwZXIgKGtiIGFuZCBjcHUpIGJ1dCBtb3JlIG1pbGQgd2F5IHRvIGdldCBhIHBhcmFtZXRlcml6ZWQgd2VpZ2h0ZWQgZWFzZSBieSBmZWVkaW5nIGluIGEgdmFsdWUgYmV0d2VlbiAtMSAoZWFzZUluKSBhbmQgMSAoZWFzZU91dCkgd2hlcmUgMCBpcyBsaW5lYXIuXG4vLyBfd2VpZ2h0ZWRFYXNlID0gcmF0aW8gPT4ge1xuLy8gXHRsZXQgeSA9IDAuNSArIHJhdGlvIC8gMjtcbi8vIFx0cmV0dXJuIHAgPT4gKDIgKiAoMSAtIHApICogcCAqIHkgKyBwICogcCk7XG4vLyB9LFxuLy8gYSBzdHJvbmdlciAoYnV0IG1vcmUgZXhwZW5zaXZlIGtiL2NwdSkgcGFyYW1ldGVyaXplZCB3ZWlnaHRlZCBlYXNlIHRoYXQgbGV0cyB5b3UgZmVlZCBpbiBhIHZhbHVlIGJldHdlZW4gLTEgKGVhc2VJbikgYW5kIDEgKGVhc2VPdXQpIHdoZXJlIDAgaXMgbGluZWFyLlxuLy8gX3dlaWdodGVkRWFzZVN0cm9uZyA9IHJhdGlvID0+IHtcbi8vIFx0cmF0aW8gPSAuNSArIHJhdGlvIC8gMjtcbi8vIFx0bGV0IG8gPSAxIC8gMyAqIChyYXRpbyA8IC41ID8gcmF0aW8gOiAxIC0gcmF0aW8pLFxuLy8gXHRcdGIgPSByYXRpbyAtIG8sXG4vLyBcdFx0YyA9IHJhdGlvICsgbztcbi8vIFx0cmV0dXJuIHAgPT4gcCA9PT0gMSA/IHAgOiAzICogYiAqICgxIC0gcCkgKiAoMSAtIHApICogcCArIDMgKiBjICogKDEgLSBwKSAqIHAgKiBwICsgcCAqIHAgKiBwO1xuLy8gfTtcblxuXG5fZm9yRWFjaE5hbWUoXCJMaW5lYXIsUXVhZCxDdWJpYyxRdWFydCxRdWludCxTdHJvbmdcIiwgZnVuY3Rpb24gKG5hbWUsIGkpIHtcbiAgdmFyIHBvd2VyID0gaSA8IDUgPyBpICsgMSA6IGk7XG5cbiAgX2luc2VydEVhc2UobmFtZSArIFwiLFBvd2VyXCIgKyAocG93ZXIgLSAxKSwgaSA/IGZ1bmN0aW9uIChwKSB7XG4gICAgcmV0dXJuIE1hdGgucG93KHAsIHBvd2VyKTtcbiAgfSA6IGZ1bmN0aW9uIChwKSB7XG4gICAgcmV0dXJuIHA7XG4gIH0sIGZ1bmN0aW9uIChwKSB7XG4gICAgcmV0dXJuIDEgLSBNYXRoLnBvdygxIC0gcCwgcG93ZXIpO1xuICB9LCBmdW5jdGlvbiAocCkge1xuICAgIHJldHVybiBwIDwgLjUgPyBNYXRoLnBvdyhwICogMiwgcG93ZXIpIC8gMiA6IDEgLSBNYXRoLnBvdygoMSAtIHApICogMiwgcG93ZXIpIC8gMjtcbiAgfSk7XG59KTtcblxuX2Vhc2VNYXAuTGluZWFyLmVhc2VOb25lID0gX2Vhc2VNYXAubm9uZSA9IF9lYXNlTWFwLkxpbmVhci5lYXNlSW47XG5cbl9pbnNlcnRFYXNlKFwiRWxhc3RpY1wiLCBfY29uZmlnRWxhc3RpYyhcImluXCIpLCBfY29uZmlnRWxhc3RpYyhcIm91dFwiKSwgX2NvbmZpZ0VsYXN0aWMoKSk7XG5cbihmdW5jdGlvbiAobiwgYykge1xuICB2YXIgbjEgPSAxIC8gYyxcbiAgICAgIG4yID0gMiAqIG4xLFxuICAgICAgbjMgPSAyLjUgKiBuMSxcbiAgICAgIGVhc2VPdXQgPSBmdW5jdGlvbiBlYXNlT3V0KHApIHtcbiAgICByZXR1cm4gcCA8IG4xID8gbiAqIHAgKiBwIDogcCA8IG4yID8gbiAqIE1hdGgucG93KHAgLSAxLjUgLyBjLCAyKSArIC43NSA6IHAgPCBuMyA/IG4gKiAocCAtPSAyLjI1IC8gYykgKiBwICsgLjkzNzUgOiBuICogTWF0aC5wb3cocCAtIDIuNjI1IC8gYywgMikgKyAuOTg0Mzc1O1xuICB9O1xuXG4gIF9pbnNlcnRFYXNlKFwiQm91bmNlXCIsIGZ1bmN0aW9uIChwKSB7XG4gICAgcmV0dXJuIDEgLSBlYXNlT3V0KDEgLSBwKTtcbiAgfSwgZWFzZU91dCk7XG59KSg3LjU2MjUsIDIuNzUpO1xuXG5faW5zZXJ0RWFzZShcIkV4cG9cIiwgZnVuY3Rpb24gKHApIHtcbiAgcmV0dXJuIHAgPyBNYXRoLnBvdygyLCAxMCAqIChwIC0gMSkpIDogMDtcbn0pO1xuXG5faW5zZXJ0RWFzZShcIkNpcmNcIiwgZnVuY3Rpb24gKHApIHtcbiAgcmV0dXJuIC0oX3NxcnQoMSAtIHAgKiBwKSAtIDEpO1xufSk7XG5cbl9pbnNlcnRFYXNlKFwiU2luZVwiLCBmdW5jdGlvbiAocCkge1xuICByZXR1cm4gcCA9PT0gMSA/IDEgOiAtX2NvcyhwICogX0hBTEZfUEkpICsgMTtcbn0pO1xuXG5faW5zZXJ0RWFzZShcIkJhY2tcIiwgX2NvbmZpZ0JhY2soXCJpblwiKSwgX2NvbmZpZ0JhY2soXCJvdXRcIiksIF9jb25maWdCYWNrKCkpO1xuXG5fZWFzZU1hcC5TdGVwcGVkRWFzZSA9IF9lYXNlTWFwLnN0ZXBzID0gX2dsb2JhbHMuU3RlcHBlZEVhc2UgPSB7XG4gIGNvbmZpZzogZnVuY3Rpb24gY29uZmlnKHN0ZXBzLCBpbW1lZGlhdGVTdGFydCkge1xuICAgIGlmIChzdGVwcyA9PT0gdm9pZCAwKSB7XG4gICAgICBzdGVwcyA9IDE7XG4gICAgfVxuXG4gICAgdmFyIHAxID0gMSAvIHN0ZXBzLFxuICAgICAgICBwMiA9IHN0ZXBzICsgKGltbWVkaWF0ZVN0YXJ0ID8gMCA6IDEpLFxuICAgICAgICBwMyA9IGltbWVkaWF0ZVN0YXJ0ID8gMSA6IDAsXG4gICAgICAgIG1heCA9IDEgLSBfdGlueU51bTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHApIHtcbiAgICAgIHJldHVybiAoKHAyICogX2NsYW1wKDAsIG1heCwgcCkgfCAwKSArIHAzKSAqIHAxO1xuICAgIH07XG4gIH1cbn07XG5fZGVmYXVsdHMuZWFzZSA9IF9lYXNlTWFwW1wicXVhZC5vdXRcIl07XG5cbl9mb3JFYWNoTmFtZShcIm9uQ29tcGxldGUsb25VcGRhdGUsb25TdGFydCxvblJlcGVhdCxvblJldmVyc2VDb21wbGV0ZSxvbkludGVycnVwdFwiLCBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gX2NhbGxiYWNrTmFtZXMgKz0gbmFtZSArIFwiLFwiICsgbmFtZSArIFwiUGFyYW1zLFwiO1xufSk7XG4vKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENBQ0hFXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cblxuZXhwb3J0IHZhciBHU0NhY2hlID0gZnVuY3Rpb24gR1NDYWNoZSh0YXJnZXQsIGhhcm5lc3MpIHtcbiAgdGhpcy5pZCA9IF9nc0lEKys7XG4gIHRhcmdldC5fZ3NhcCA9IHRoaXM7XG4gIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICB0aGlzLmhhcm5lc3MgPSBoYXJuZXNzO1xuICB0aGlzLmdldCA9IGhhcm5lc3MgPyBoYXJuZXNzLmdldCA6IF9nZXRQcm9wZXJ0eTtcbiAgdGhpcy5zZXQgPSBoYXJuZXNzID8gaGFybmVzcy5nZXRTZXR0ZXIgOiBfZ2V0U2V0dGVyO1xufTtcbi8qXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQU5JTUFUSU9OXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmV4cG9ydCB2YXIgQW5pbWF0aW9uID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQW5pbWF0aW9uKHZhcnMpIHtcbiAgICB0aGlzLnZhcnMgPSB2YXJzO1xuICAgIHRoaXMuX2RlbGF5ID0gK3ZhcnMuZGVsYXkgfHwgMDtcblxuICAgIGlmICh0aGlzLl9yZXBlYXQgPSB2YXJzLnJlcGVhdCA9PT0gSW5maW5pdHkgPyAtMiA6IHZhcnMucmVwZWF0IHx8IDApIHtcbiAgICAgIC8vIFRPRE86IHJlcGVhdDogSW5maW5pdHkgb24gYSB0aW1lbGluZSdzIGNoaWxkcmVuIG11c3QgZmxhZyB0aGF0IHRpbWVsaW5lIGludGVybmFsbHkgYW5kIGFmZmVjdCBpdHMgdG90YWxEdXJhdGlvbiwgb3RoZXJ3aXNlIGl0J2xsIHN0b3AgaW4gdGhlIG5lZ2F0aXZlIGRpcmVjdGlvbiB3aGVuIHJlYWNoaW5nIHRoZSBzdGFydC5cbiAgICAgIHRoaXMuX3JEZWxheSA9IHZhcnMucmVwZWF0RGVsYXkgfHwgMDtcbiAgICAgIHRoaXMuX3lveW8gPSAhIXZhcnMueW95byB8fCAhIXZhcnMueW95b0Vhc2U7XG4gICAgfVxuXG4gICAgdGhpcy5fdHMgPSAxO1xuXG4gICAgX3NldER1cmF0aW9uKHRoaXMsICt2YXJzLmR1cmF0aW9uLCAxLCAxKTtcblxuICAgIHRoaXMuZGF0YSA9IHZhcnMuZGF0YTtcblxuICAgIGlmIChfY29udGV4dCkge1xuICAgICAgdGhpcy5fY3R4ID0gX2NvbnRleHQ7XG5cbiAgICAgIF9jb250ZXh0LmRhdGEucHVzaCh0aGlzKTtcbiAgICB9XG5cbiAgICBfdGlja2VyQWN0aXZlIHx8IF90aWNrZXIud2FrZSgpO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IEFuaW1hdGlvbi5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmRlbGF5ID0gZnVuY3Rpb24gZGVsYXkodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgfHwgdmFsdWUgPT09IDApIHtcbiAgICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LnNtb290aENoaWxkVGltaW5nICYmIHRoaXMuc3RhcnRUaW1lKHRoaXMuX3N0YXJ0ICsgdmFsdWUgLSB0aGlzLl9kZWxheSk7XG4gICAgICB0aGlzLl9kZWxheSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2RlbGF5O1xuICB9O1xuXG4gIF9wcm90by5kdXJhdGlvbiA9IGZ1bmN0aW9uIGR1cmF0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyB0aGlzLnRvdGFsRHVyYXRpb24odGhpcy5fcmVwZWF0ID4gMCA/IHZhbHVlICsgKHZhbHVlICsgdGhpcy5fckRlbGF5KSAqIHRoaXMuX3JlcGVhdCA6IHZhbHVlKSA6IHRoaXMudG90YWxEdXJhdGlvbigpICYmIHRoaXMuX2R1cjtcbiAgfTtcblxuICBfcHJvdG8udG90YWxEdXJhdGlvbiA9IGZ1bmN0aW9uIHRvdGFsRHVyYXRpb24odmFsdWUpIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLl90RHVyO1xuICAgIH1cblxuICAgIHRoaXMuX2RpcnR5ID0gMDtcbiAgICByZXR1cm4gX3NldER1cmF0aW9uKHRoaXMsIHRoaXMuX3JlcGVhdCA8IDAgPyB2YWx1ZSA6ICh2YWx1ZSAtIHRoaXMuX3JlcGVhdCAqIHRoaXMuX3JEZWxheSkgLyAodGhpcy5fcmVwZWF0ICsgMSkpO1xuICB9O1xuXG4gIF9wcm90by50b3RhbFRpbWUgPSBmdW5jdGlvbiB0b3RhbFRpbWUoX3RvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMpIHtcbiAgICBfd2FrZSgpO1xuXG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fdFRpbWU7XG4gICAgfVxuXG4gICAgdmFyIHBhcmVudCA9IHRoaXMuX2RwO1xuXG4gICAgaWYgKHBhcmVudCAmJiBwYXJlbnQuc21vb3RoQ2hpbGRUaW1pbmcgJiYgdGhpcy5fdHMpIHtcbiAgICAgIF9hbGlnblBsYXloZWFkKHRoaXMsIF90b3RhbFRpbWUpO1xuXG4gICAgICAhcGFyZW50Ll9kcCB8fCBwYXJlbnQucGFyZW50IHx8IF9wb3N0QWRkQ2hlY2tzKHBhcmVudCwgdGhpcyk7IC8vIGVkZ2UgY2FzZTogaWYgdGhpcyBpcyBhIGNoaWxkIG9mIGEgdGltZWxpbmUgdGhhdCBhbHJlYWR5IGNvbXBsZXRlZCwgZm9yIGV4YW1wbGUsIHdlIG11c3QgcmUtYWN0aXZhdGUgdGhlIHBhcmVudC5cbiAgICAgIC8vaW4gY2FzZSBhbnkgb2YgdGhlIGFuY2VzdG9yIHRpbWVsaW5lcyBoYWQgY29tcGxldGVkIGJ1dCBzaG91bGQgbm93IGJlIGVuYWJsZWQsIHdlIHNob3VsZCByZXNldCB0aGVpciB0b3RhbFRpbWUoKSB3aGljaCB3aWxsIGFsc28gZW5zdXJlIHRoYXQgdGhleSdyZSBsaW5lZCB1cCBwcm9wZXJseSBhbmQgZW5hYmxlZC4gU2tpcCBmb3IgYW5pbWF0aW9ucyB0aGF0IGFyZSBvbiB0aGUgcm9vdCAod2FzdGVmdWwpLiBFeGFtcGxlOiBhIFRpbWVsaW5lTGl0ZS5leHBvcnRSb290KCkgaXMgcGVyZm9ybWVkIHdoZW4gdGhlcmUncyBhIHBhdXNlZCB0d2VlbiBvbiB0aGUgcm9vdCwgdGhlIGV4cG9ydCB3aWxsIG5vdCBjb21wbGV0ZSB1bnRpbCB0aGF0IHR3ZWVuIGlzIHVucGF1c2VkLCBidXQgaW1hZ2luZSBhIGNoaWxkIGdldHMgcmVzdGFydGVkIGxhdGVyLCBhZnRlciBhbGwgW3VucGF1c2VkXSB0d2VlbnMgaGF2ZSBjb21wbGV0ZWQuIFRoZSBzdGFydCBvZiB0aGF0IGNoaWxkIHdvdWxkIGdldCBwdXNoZWQgb3V0LCBidXQgb25lIG9mIHRoZSBhbmNlc3RvcnMgbWF5IGhhdmUgY29tcGxldGVkLlxuXG4gICAgICB3aGlsZSAocGFyZW50ICYmIHBhcmVudC5wYXJlbnQpIHtcbiAgICAgICAgaWYgKHBhcmVudC5wYXJlbnQuX3RpbWUgIT09IHBhcmVudC5fc3RhcnQgKyAocGFyZW50Ll90cyA+PSAwID8gcGFyZW50Ll90VGltZSAvIHBhcmVudC5fdHMgOiAocGFyZW50LnRvdGFsRHVyYXRpb24oKSAtIHBhcmVudC5fdFRpbWUpIC8gLXBhcmVudC5fdHMpKSB7XG4gICAgICAgICAgcGFyZW50LnRvdGFsVGltZShwYXJlbnQuX3RUaW1lLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5wYXJlbnQgJiYgdGhpcy5fZHAuYXV0b1JlbW92ZUNoaWxkcmVuICYmICh0aGlzLl90cyA+IDAgJiYgX3RvdGFsVGltZSA8IHRoaXMuX3REdXIgfHwgdGhpcy5fdHMgPCAwICYmIF90b3RhbFRpbWUgPiAwIHx8ICF0aGlzLl90RHVyICYmICFfdG90YWxUaW1lKSkge1xuICAgICAgICAvL2lmIHRoZSBhbmltYXRpb24gZG9lc24ndCBoYXZlIGEgcGFyZW50LCBwdXQgaXQgYmFjayBpbnRvIGl0cyBsYXN0IHBhcmVudCAocmVjb3JkZWQgYXMgX2RwIGZvciBleGFjdGx5IGNhc2VzIGxpa2UgdGhpcykuIExpbWl0IHRvIHBhcmVudHMgd2l0aCBhdXRvUmVtb3ZlQ2hpbGRyZW4gKGxpa2UgZ2xvYmFsVGltZWxpbmUpIHNvIHRoYXQgaWYgdGhlIHVzZXIgbWFudWFsbHkgcmVtb3ZlcyBhbiBhbmltYXRpb24gZnJvbSBhIHRpbWVsaW5lIGFuZCB0aGVuIGFsdGVycyBpdHMgcGxheWhlYWQsIGl0IGRvZXNuJ3QgZ2V0IGFkZGVkIGJhY2sgaW4uXG4gICAgICAgIF9hZGRUb1RpbWVsaW5lKHRoaXMuX2RwLCB0aGlzLCB0aGlzLl9zdGFydCAtIHRoaXMuX2RlbGF5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fdFRpbWUgIT09IF90b3RhbFRpbWUgfHwgIXRoaXMuX2R1ciAmJiAhc3VwcHJlc3NFdmVudHMgfHwgdGhpcy5faW5pdHRlZCAmJiBNYXRoLmFicyh0aGlzLl96VGltZSkgPT09IF90aW55TnVtIHx8ICFfdG90YWxUaW1lICYmICF0aGlzLl9pbml0dGVkICYmICh0aGlzLmFkZCB8fCB0aGlzLl9wdExvb2t1cCkpIHtcbiAgICAgIC8vIGNoZWNrIGZvciBfcHRMb29rdXAgb24gYSBUd2VlbiBpbnN0YW5jZSB0byBlbnN1cmUgaXQgaGFzIGFjdHVhbGx5IGZpbmlzaGVkIGJlaW5nIGluc3RhbnRpYXRlZCwgb3RoZXJ3aXNlIGlmIHRoaXMucmV2ZXJzZSgpIGdldHMgY2FsbGVkIGluIHRoZSBBbmltYXRpb24gY29uc3RydWN0b3IsIGl0IGNvdWxkIHRyaWdnZXIgYSByZW5kZXIoKSBoZXJlIGV2ZW4gdGhvdWdoIHRoZSBfdGFyZ2V0cyB3ZXJlbid0IHBvcHVsYXRlZCwgdGh1cyB3aGVuIF9pbml0KCkgaXMgY2FsbGVkIHRoZXJlIHdvbid0IGJlIGFueSBQcm9wVHdlZW5zIChpdCdsbCBhY3QgbGlrZSB0aGUgdHdlZW4gaXMgbm9uLWZ1bmN0aW9uYWwpXG4gICAgICB0aGlzLl90cyB8fCAodGhpcy5fcFRpbWUgPSBfdG90YWxUaW1lKTsgLy8gb3RoZXJ3aXNlLCBpZiBhbiBhbmltYXRpb24gaXMgcGF1c2VkLCB0aGVuIHRoZSBwbGF5aGVhZCBpcyBtb3ZlZCBiYWNrIHRvIHplcm8sIHRoZW4gcmVzdW1lZCwgaXQnZCByZXZlcnQgYmFjayB0byB0aGUgb3JpZ2luYWwgdGltZSBhdCB0aGUgcGF1c2VcbiAgICAgIC8vaWYgKCF0aGlzLl9sb2NrKSB7IC8vIGF2b2lkIGVuZGxlc3MgcmVjdXJzaW9uIChub3Qgc3VyZSB3ZSBuZWVkIHRoaXMgeWV0IG9yIGlmIGl0J3Mgd29ydGggdGhlIHBlcmZvcm1hbmNlIGhpdClcbiAgICAgIC8vICAgdGhpcy5fbG9jayA9IDE7XG5cbiAgICAgIF9sYXp5U2FmZVJlbmRlcih0aGlzLCBfdG90YWxUaW1lLCBzdXBwcmVzc0V2ZW50cyk7IC8vICAgdGhpcy5fbG9jayA9IDA7XG4gICAgICAvL31cblxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90by50aW1lID0gZnVuY3Rpb24gdGltZSh2YWx1ZSwgc3VwcHJlc3NFdmVudHMpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IHRoaXMudG90YWxUaW1lKE1hdGgubWluKHRoaXMudG90YWxEdXJhdGlvbigpLCB2YWx1ZSArIF9lbGFwc2VkQ3ljbGVEdXJhdGlvbih0aGlzKSkgJSAodGhpcy5fZHVyICsgdGhpcy5fckRlbGF5KSB8fCAodmFsdWUgPyB0aGlzLl9kdXIgOiAwKSwgc3VwcHJlc3NFdmVudHMpIDogdGhpcy5fdGltZTsgLy8gbm90ZTogaWYgdGhlIG1vZHVsdXMgcmVzdWx0cyBpbiAwLCB0aGUgcGxheWhlYWQgY291bGQgYmUgZXhhY3RseSBhdCB0aGUgZW5kIG9yIHRoZSBiZWdpbm5pbmcsIGFuZCB3ZSBhbHdheXMgZGVmZXIgdG8gdGhlIEVORCB3aXRoIGEgbm9uLXplcm8gdmFsdWUsIG90aGVyd2lzZSBpZiB5b3Ugc2V0IHRoZSB0aW1lKCkgdG8gdGhlIHZlcnkgZW5kIChkdXJhdGlvbigpKSwgaXQgd291bGQgcmVuZGVyIGF0IHRoZSBTVEFSVCFcbiAgfTtcblxuICBfcHJvdG8udG90YWxQcm9ncmVzcyA9IGZ1bmN0aW9uIHRvdGFsUHJvZ3Jlc3ModmFsdWUsIHN1cHByZXNzRXZlbnRzKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyB0aGlzLnRvdGFsVGltZSh0aGlzLnRvdGFsRHVyYXRpb24oKSAqIHZhbHVlLCBzdXBwcmVzc0V2ZW50cykgOiB0aGlzLnRvdGFsRHVyYXRpb24oKSA/IE1hdGgubWluKDEsIHRoaXMuX3RUaW1lIC8gdGhpcy5fdER1cikgOiB0aGlzLnJhdGlvO1xuICB9O1xuXG4gIF9wcm90by5wcm9ncmVzcyA9IGZ1bmN0aW9uIHByb2dyZXNzKHZhbHVlLCBzdXBwcmVzc0V2ZW50cykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gdGhpcy50b3RhbFRpbWUodGhpcy5kdXJhdGlvbigpICogKHRoaXMuX3lveW8gJiYgISh0aGlzLml0ZXJhdGlvbigpICYgMSkgPyAxIC0gdmFsdWUgOiB2YWx1ZSkgKyBfZWxhcHNlZEN5Y2xlRHVyYXRpb24odGhpcyksIHN1cHByZXNzRXZlbnRzKSA6IHRoaXMuZHVyYXRpb24oKSA/IE1hdGgubWluKDEsIHRoaXMuX3RpbWUgLyB0aGlzLl9kdXIpIDogdGhpcy5yYXRpbztcbiAgfTtcblxuICBfcHJvdG8uaXRlcmF0aW9uID0gZnVuY3Rpb24gaXRlcmF0aW9uKHZhbHVlLCBzdXBwcmVzc0V2ZW50cykge1xuICAgIHZhciBjeWNsZUR1cmF0aW9uID0gdGhpcy5kdXJhdGlvbigpICsgdGhpcy5fckRlbGF5O1xuXG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyB0aGlzLnRvdGFsVGltZSh0aGlzLl90aW1lICsgKHZhbHVlIC0gMSkgKiBjeWNsZUR1cmF0aW9uLCBzdXBwcmVzc0V2ZW50cykgOiB0aGlzLl9yZXBlYXQgPyBfYW5pbWF0aW9uQ3ljbGUodGhpcy5fdFRpbWUsIGN5Y2xlRHVyYXRpb24pICsgMSA6IDE7XG4gIH0gLy8gcG90ZW50aWFsIGZ1dHVyZSBhZGRpdGlvbjpcbiAgLy8gaXNQbGF5aW5nQmFja3dhcmRzKCkge1xuICAvLyBcdGxldCBhbmltYXRpb24gPSB0aGlzLFxuICAvLyBcdFx0b3JpZW50YXRpb24gPSAxOyAvLyAxID0gZm9yd2FyZCwgLTEgPSBiYWNrd2FyZFxuICAvLyBcdHdoaWxlIChhbmltYXRpb24pIHtcbiAgLy8gXHRcdG9yaWVudGF0aW9uICo9IGFuaW1hdGlvbi5yZXZlcnNlZCgpIHx8IChhbmltYXRpb24ucmVwZWF0KCkgJiYgIShhbmltYXRpb24uaXRlcmF0aW9uKCkgJiAxKSkgPyAtMSA6IDE7XG4gIC8vIFx0XHRhbmltYXRpb24gPSBhbmltYXRpb24ucGFyZW50O1xuICAvLyBcdH1cbiAgLy8gXHRyZXR1cm4gb3JpZW50YXRpb24gPCAwO1xuICAvLyB9XG4gIDtcblxuICBfcHJvdG8udGltZVNjYWxlID0gZnVuY3Rpb24gdGltZVNjYWxlKHZhbHVlKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcnRzID09PSAtX3RpbnlOdW0gPyAwIDogdGhpcy5fcnRzOyAvLyByZWNvcmRlZCB0aW1lU2NhbGUuIFNwZWNpYWwgY2FzZTogaWYgc29tZW9uZSBjYWxscyByZXZlcnNlKCkgb24gYW4gYW5pbWF0aW9uIHdpdGggdGltZVNjYWxlIG9mIDAsIHdlIGFzc2lnbiBpdCAtX3RpbnlOdW0gdG8gcmVtZW1iZXIgaXQncyByZXZlcnNlZC5cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcnRzID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdmFyIHRUaW1lID0gdGhpcy5wYXJlbnQgJiYgdGhpcy5fdHMgPyBfcGFyZW50VG9DaGlsZFRvdGFsVGltZSh0aGlzLnBhcmVudC5fdGltZSwgdGhpcykgOiB0aGlzLl90VGltZTsgLy8gbWFrZSBzdXJlIHRvIGRvIHRoZSBwYXJlbnRUb0NoaWxkVG90YWxUaW1lKCkgQkVGT1JFIHNldHRpbmcgdGhlIG5ldyBfdHMgYmVjYXVzZSB0aGUgb2xkIG9uZSBtdXN0IGJlIHVzZWQgaW4gdGhhdCBjYWxjdWxhdGlvbi5cbiAgICAvLyBmdXR1cmUgYWRkaXRpb24/IFVwIHNpZGU6IGZhc3QgYW5kIG1pbmltYWwgZmlsZSBzaXplLiBEb3duIHNpZGU6IG9ubHkgd29ya3Mgb24gdGhpcyBhbmltYXRpb247IGlmIGEgdGltZWxpbmUgaXMgcmV2ZXJzZWQsIGZvciBleGFtcGxlLCBpdHMgY2hpbGRyZW5zJyBvblJldmVyc2Ugd291bGRuJ3QgZ2V0IGNhbGxlZC5cbiAgICAvLygrdmFsdWUgPCAwICYmIHRoaXMuX3J0cyA+PSAwKSAmJiBfY2FsbGJhY2sodGhpcywgXCJvblJldmVyc2VcIiwgdHJ1ZSk7XG4gICAgLy8gcHJpb3JpdGl6ZSByZW5kZXJpbmcgd2hlcmUgdGhlIHBhcmVudCdzIHBsYXloZWFkIGxpbmVzIHVwIGluc3RlYWQgb2YgdGhpcy5fdFRpbWUgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBhIHR3ZWVuIHRoYXQncyBhbmltYXRpbmcgYW5vdGhlciB0d2VlbidzIHRpbWVTY2FsZSBpbiB0aGUgc2FtZSByZW5kZXJpbmcgbG9vcCAoc2FtZSBwYXJlbnQpLCB0aHVzIGlmIHRoZSB0aW1lU2NhbGUgdHdlZW4gcmVuZGVycyBmaXJzdCwgaXQgd291bGQgYWx0ZXIgX3N0YXJ0IEJFRk9SRSBfdFRpbWUgd2FzIHNldCBvbiB0aGF0IHRpY2sgKGluIHRoZSByZW5kZXJpbmcgbG9vcCksIGVmZmVjdGl2ZWx5IGZyZWV6aW5nIGl0IHVudGlsIHRoZSB0aW1lU2NhbGUgdHdlZW4gZmluaXNoZXMuXG5cbiAgICB0aGlzLl9ydHMgPSArdmFsdWUgfHwgMDtcbiAgICB0aGlzLl90cyA9IHRoaXMuX3BzIHx8IHZhbHVlID09PSAtX3RpbnlOdW0gPyAwIDogdGhpcy5fcnRzOyAvLyBfdHMgaXMgdGhlIGZ1bmN0aW9uYWwgdGltZVNjYWxlIHdoaWNoIHdvdWxkIGJlIDAgaWYgdGhlIGFuaW1hdGlvbiBpcyBwYXVzZWQuXG5cbiAgICB0aGlzLnRvdGFsVGltZShfY2xhbXAoLU1hdGguYWJzKHRoaXMuX2RlbGF5KSwgdGhpcy5fdER1ciwgdFRpbWUpLCB0cnVlKTtcblxuICAgIF9zZXRFbmQodGhpcyk7IC8vIGlmIHBhcmVudC5zbW9vdGhDaGlsZFRpbWluZyB3YXMgZmFsc2UsIHRoZSBlbmQgdGltZSBkaWRuJ3QgZ2V0IHVwZGF0ZWQgaW4gdGhlIF9hbGlnblBsYXloZWFkKCkgbWV0aG9kLCBzbyBkbyBpdCBoZXJlLlxuXG5cbiAgICByZXR1cm4gX3JlY2FjaGVBbmNlc3RvcnModGhpcyk7XG4gIH07XG5cbiAgX3Byb3RvLnBhdXNlZCA9IGZ1bmN0aW9uIHBhdXNlZCh2YWx1ZSkge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3BzO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9wcyAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX3BzID0gdmFsdWU7XG5cbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9wVGltZSA9IHRoaXMuX3RUaW1lIHx8IE1hdGgubWF4KC10aGlzLl9kZWxheSwgdGhpcy5yYXdUaW1lKCkpOyAvLyBpZiB0aGUgcGF1c2Ugb2NjdXJzIGR1cmluZyB0aGUgZGVsYXkgcGhhc2UsIG1ha2Ugc3VyZSB0aGF0J3MgZmFjdG9yZWQgaW4gd2hlbiByZXN1bWluZy5cblxuICAgICAgICB0aGlzLl90cyA9IHRoaXMuX2FjdCA9IDA7IC8vIF90cyBpcyB0aGUgZnVuY3Rpb25hbCB0aW1lU2NhbGUsIHNvIGEgcGF1c2VkIHR3ZWVuIHdvdWxkIGVmZmVjdGl2ZWx5IGhhdmUgYSB0aW1lU2NhbGUgb2YgMC4gV2UgcmVjb3JkIHRoZSBcInJlYWxcIiB0aW1lU2NhbGUgYXMgX3J0cyAocmVjb3JkZWQgdGltZSBzY2FsZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF93YWtlKCk7XG5cbiAgICAgICAgdGhpcy5fdHMgPSB0aGlzLl9ydHM7IC8vb25seSBkZWZlciB0byBfcFRpbWUgKHBhdXNlVGltZSkgaWYgdFRpbWUgaXMgemVyby4gUmVtZW1iZXIsIHNvbWVvbmUgY291bGQgcGF1c2UoKSBhbiBhbmltYXRpb24sIHRoZW4gc2NydWIgdGhlIHBsYXloZWFkIGFuZCByZXN1bWUoKS4gSWYgdGhlIHBhcmVudCBkb2Vzbid0IGhhdmUgc21vb3RoQ2hpbGRUaW1pbmcsIHdlIHJlbmRlciBhdCB0aGUgcmF3VGltZSgpIGJlY2F1c2UgdGhlIHN0YXJ0VGltZSB3b24ndCBnZXQgdXBkYXRlZC5cblxuICAgICAgICB0aGlzLnRvdGFsVGltZSh0aGlzLnBhcmVudCAmJiAhdGhpcy5wYXJlbnQuc21vb3RoQ2hpbGRUaW1pbmcgPyB0aGlzLnJhd1RpbWUoKSA6IHRoaXMuX3RUaW1lIHx8IHRoaXMuX3BUaW1lLCB0aGlzLnByb2dyZXNzKCkgPT09IDEgJiYgTWF0aC5hYnModGhpcy5felRpbWUpICE9PSBfdGlueU51bSAmJiAodGhpcy5fdFRpbWUgLT0gX3RpbnlOdW0pKTsgLy8gZWRnZSBjYXNlOiBhbmltYXRpb24ucHJvZ3Jlc3MoMSkucGF1c2UoKS5wbGF5KCkgd291bGRuJ3QgcmVuZGVyIGFnYWluIGJlY2F1c2UgdGhlIHBsYXloZWFkIGlzIGFscmVhZHkgYXQgdGhlIGVuZCwgYnV0IHRoZSBjYWxsIHRvIHRvdGFsVGltZSgpIGJlbG93IHdpbGwgYWRkIGl0IGJhY2sgdG8gaXRzIHBhcmVudC4uLmFuZCBub3QgcmVtb3ZlIGl0IGFnYWluIChzaW5jZSByZW1vdmluZyBvbmx5IGhhcHBlbnMgdXBvbiByZW5kZXJpbmcgYXQgYSBuZXcgdGltZSkuIE9mZnNldHRpbmcgdGhlIF90VGltZSBzbGlnaHRseSBpcyBkb25lIHNpbXBseSB0byBjYXVzZSB0aGUgZmluYWwgcmVuZGVyIGluIHRvdGFsVGltZSgpIHRoYXQnbGwgcG9wIGl0IG9mZiBpdHMgdGltZWxpbmUgKGlmIGF1dG9SZW1vdmVDaGlsZHJlbiBpcyB0cnVlLCBvZiBjb3Vyc2UpLiBDaGVjayB0byBtYWtlIHN1cmUgX3pUaW1lIGlzbid0IC1fdGlueU51bSB0byBhdm9pZCBhbiBlZGdlIGNhc2Ugd2hlcmUgdGhlIHBsYXloZWFkIGlzIHB1c2hlZCB0byB0aGUgZW5kIGJ1dCBJTlNJREUgYSB0d2Vlbi9jYWxsYmFjaywgdGhlIHRpbWVsaW5lIGl0c2VsZiBpcyBwYXVzZWQgdGh1cyBoYWx0aW5nIHJlbmRlcmluZyBhbmQgbGVhdmluZyBhIGZldyB1bnJlbmRlcmVkLiBXaGVuIHJlc3VtaW5nLCBpdCB3b3VsZG4ndCByZW5kZXIgdGhvc2Ugb3RoZXJ3aXNlLlxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90by5zdGFydFRpbWUgPSBmdW5jdGlvbiBzdGFydFRpbWUodmFsdWUpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgdGhpcy5fc3RhcnQgPSB2YWx1ZTtcbiAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudCB8fCB0aGlzLl9kcDtcbiAgICAgIHBhcmVudCAmJiAocGFyZW50Ll9zb3J0IHx8ICF0aGlzLnBhcmVudCkgJiYgX2FkZFRvVGltZWxpbmUocGFyZW50LCB0aGlzLCB2YWx1ZSAtIHRoaXMuX2RlbGF5KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9zdGFydDtcbiAgfTtcblxuICBfcHJvdG8uZW5kVGltZSA9IGZ1bmN0aW9uIGVuZFRpbWUoaW5jbHVkZVJlcGVhdHMpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhcnQgKyAoX2lzTm90RmFsc2UoaW5jbHVkZVJlcGVhdHMpID8gdGhpcy50b3RhbER1cmF0aW9uKCkgOiB0aGlzLmR1cmF0aW9uKCkpIC8gTWF0aC5hYnModGhpcy5fdHMgfHwgMSk7XG4gIH07XG5cbiAgX3Byb3RvLnJhd1RpbWUgPSBmdW5jdGlvbiByYXdUaW1lKHdyYXBSZXBlYXRzKSB7XG4gICAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50IHx8IHRoaXMuX2RwOyAvLyBfZHAgPSBkZXRhY2hlZCBwYXJlbnRcblxuICAgIHJldHVybiAhcGFyZW50ID8gdGhpcy5fdFRpbWUgOiB3cmFwUmVwZWF0cyAmJiAoIXRoaXMuX3RzIHx8IHRoaXMuX3JlcGVhdCAmJiB0aGlzLl90aW1lICYmIHRoaXMudG90YWxQcm9ncmVzcygpIDwgMSkgPyB0aGlzLl90VGltZSAlICh0aGlzLl9kdXIgKyB0aGlzLl9yRGVsYXkpIDogIXRoaXMuX3RzID8gdGhpcy5fdFRpbWUgOiBfcGFyZW50VG9DaGlsZFRvdGFsVGltZShwYXJlbnQucmF3VGltZSh3cmFwUmVwZWF0cyksIHRoaXMpO1xuICB9O1xuXG4gIF9wcm90by5yZXZlcnQgPSBmdW5jdGlvbiByZXZlcnQoY29uZmlnKSB7XG4gICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7XG4gICAgICBjb25maWcgPSBfcmV2ZXJ0Q29uZmlnO1xuICAgIH1cblxuICAgIHZhciBwcmV2SXNSZXZlcnRpbmcgPSBfcmV2ZXJ0aW5nO1xuICAgIF9yZXZlcnRpbmcgPSBjb25maWc7XG5cbiAgICBpZiAodGhpcy5faW5pdHRlZCB8fCB0aGlzLl9zdGFydEF0KSB7XG4gICAgICB0aGlzLnRpbWVsaW5lICYmIHRoaXMudGltZWxpbmUucmV2ZXJ0KGNvbmZpZyk7XG4gICAgICB0aGlzLnRvdGFsVGltZSgtMC4wMSwgY29uZmlnLnN1cHByZXNzRXZlbnRzKTtcbiAgICB9XG5cbiAgICB0aGlzLmRhdGEgIT09IFwibmVzdGVkXCIgJiYgY29uZmlnLmtpbGwgIT09IGZhbHNlICYmIHRoaXMua2lsbCgpO1xuICAgIF9yZXZlcnRpbmcgPSBwcmV2SXNSZXZlcnRpbmc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLmdsb2JhbFRpbWUgPSBmdW5jdGlvbiBnbG9iYWxUaW1lKHJhd1RpbWUpIHtcbiAgICB2YXIgYW5pbWF0aW9uID0gdGhpcyxcbiAgICAgICAgdGltZSA9IGFyZ3VtZW50cy5sZW5ndGggPyByYXdUaW1lIDogYW5pbWF0aW9uLnJhd1RpbWUoKTtcblxuICAgIHdoaWxlIChhbmltYXRpb24pIHtcbiAgICAgIHRpbWUgPSBhbmltYXRpb24uX3N0YXJ0ICsgdGltZSAvIChhbmltYXRpb24uX3RzIHx8IDEpO1xuICAgICAgYW5pbWF0aW9uID0gYW5pbWF0aW9uLl9kcDtcbiAgICB9XG5cbiAgICByZXR1cm4gIXRoaXMucGFyZW50ICYmIHRoaXMuX3NhdCA/IHRoaXMuX3NhdC52YXJzLmltbWVkaWF0ZVJlbmRlciA/IC0xIDogdGhpcy5fc2F0Lmdsb2JhbFRpbWUocmF3VGltZSkgOiB0aW1lOyAvLyB0aGUgX3N0YXJ0QXQgdHdlZW5zIGZvciAuZnJvbVRvKCkgYW5kIC5mcm9tKCkgdGhhdCBoYXZlIGltbWVkaWF0ZVJlbmRlciBzaG91bGQgYWx3YXlzIGJlIEZJUlNUIGluIHRoZSB0aW1lbGluZSAoaW1wb3J0YW50IGZvciBjb250ZXh0LnJldmVydCgpKS4gXCJfc2F0XCIgc3RhbmRzIGZvciBfc3RhcnRBdFR3ZWVuLCByZWZlcnJpbmcgdG8gdGhlIHBhcmVudCB0d2VlbiB0aGF0IGNyZWF0ZWQgdGhlIF9zdGFydEF0LiBXZSBtdXN0IGRpc2Nlcm4gaWYgdGhhdCB0d2VlbiBoYWQgaW1tZWRpYXRlUmVuZGVyIHNvIHRoYXQgd2UgY2FuIGtub3cgd2hldGhlciBvciBub3QgdG8gcHJpb3JpdGl6ZSBpdCBpbiByZXZlcnQoKS5cbiAgfTtcblxuICBfcHJvdG8ucmVwZWF0ID0gZnVuY3Rpb24gcmVwZWF0KHZhbHVlKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX3JlcGVhdCA9IHZhbHVlID09PSBJbmZpbml0eSA/IC0yIDogdmFsdWU7XG4gICAgICByZXR1cm4gX29uVXBkYXRlVG90YWxEdXJhdGlvbih0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fcmVwZWF0ID09PSAtMiA/IEluZmluaXR5IDogdGhpcy5fcmVwZWF0O1xuICB9O1xuXG4gIF9wcm90by5yZXBlYXREZWxheSA9IGZ1bmN0aW9uIHJlcGVhdERlbGF5KHZhbHVlKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHZhciB0aW1lID0gdGhpcy5fdGltZTtcbiAgICAgIHRoaXMuX3JEZWxheSA9IHZhbHVlO1xuXG4gICAgICBfb25VcGRhdGVUb3RhbER1cmF0aW9uKHRoaXMpO1xuXG4gICAgICByZXR1cm4gdGltZSA/IHRoaXMudGltZSh0aW1lKSA6IHRoaXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3JEZWxheTtcbiAgfTtcblxuICBfcHJvdG8ueW95byA9IGZ1bmN0aW9uIHlveW8odmFsdWUpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgdGhpcy5feW95byA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3lveW87XG4gIH07XG5cbiAgX3Byb3RvLnNlZWsgPSBmdW5jdGlvbiBzZWVrKHBvc2l0aW9uLCBzdXBwcmVzc0V2ZW50cykge1xuICAgIHJldHVybiB0aGlzLnRvdGFsVGltZShfcGFyc2VQb3NpdGlvbih0aGlzLCBwb3NpdGlvbiksIF9pc05vdEZhbHNlKHN1cHByZXNzRXZlbnRzKSk7XG4gIH07XG5cbiAgX3Byb3RvLnJlc3RhcnQgPSBmdW5jdGlvbiByZXN0YXJ0KGluY2x1ZGVEZWxheSwgc3VwcHJlc3NFdmVudHMpIHtcbiAgICByZXR1cm4gdGhpcy5wbGF5KCkudG90YWxUaW1lKGluY2x1ZGVEZWxheSA/IC10aGlzLl9kZWxheSA6IDAsIF9pc05vdEZhbHNlKHN1cHByZXNzRXZlbnRzKSk7XG4gIH07XG5cbiAgX3Byb3RvLnBsYXkgPSBmdW5jdGlvbiBwbGF5KGZyb20sIHN1cHByZXNzRXZlbnRzKSB7XG4gICAgZnJvbSAhPSBudWxsICYmIHRoaXMuc2Vlayhmcm9tLCBzdXBwcmVzc0V2ZW50cyk7XG4gICAgcmV0dXJuIHRoaXMucmV2ZXJzZWQoZmFsc2UpLnBhdXNlZChmYWxzZSk7XG4gIH07XG5cbiAgX3Byb3RvLnJldmVyc2UgPSBmdW5jdGlvbiByZXZlcnNlKGZyb20sIHN1cHByZXNzRXZlbnRzKSB7XG4gICAgZnJvbSAhPSBudWxsICYmIHRoaXMuc2Vlayhmcm9tIHx8IHRoaXMudG90YWxEdXJhdGlvbigpLCBzdXBwcmVzc0V2ZW50cyk7XG4gICAgcmV0dXJuIHRoaXMucmV2ZXJzZWQodHJ1ZSkucGF1c2VkKGZhbHNlKTtcbiAgfTtcblxuICBfcHJvdG8ucGF1c2UgPSBmdW5jdGlvbiBwYXVzZShhdFRpbWUsIHN1cHByZXNzRXZlbnRzKSB7XG4gICAgYXRUaW1lICE9IG51bGwgJiYgdGhpcy5zZWVrKGF0VGltZSwgc3VwcHJlc3NFdmVudHMpO1xuICAgIHJldHVybiB0aGlzLnBhdXNlZCh0cnVlKTtcbiAgfTtcblxuICBfcHJvdG8ucmVzdW1lID0gZnVuY3Rpb24gcmVzdW1lKCkge1xuICAgIHJldHVybiB0aGlzLnBhdXNlZChmYWxzZSk7XG4gIH07XG5cbiAgX3Byb3RvLnJldmVyc2VkID0gZnVuY3Rpb24gcmV2ZXJzZWQodmFsdWUpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgISF2YWx1ZSAhPT0gdGhpcy5yZXZlcnNlZCgpICYmIHRoaXMudGltZVNjYWxlKC10aGlzLl9ydHMgfHwgKHZhbHVlID8gLV90aW55TnVtIDogMCkpOyAvLyBpbiBjYXNlIHRpbWVTY2FsZSBpcyB6ZXJvLCByZXZlcnNpbmcgd291bGQgaGF2ZSBubyBlZmZlY3Qgc28gd2UgdXNlIF90aW55TnVtLlxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fcnRzIDwgMDtcbiAgfTtcblxuICBfcHJvdG8uaW52YWxpZGF0ZSA9IGZ1bmN0aW9uIGludmFsaWRhdGUoKSB7XG4gICAgdGhpcy5faW5pdHRlZCA9IHRoaXMuX2FjdCA9IDA7XG4gICAgdGhpcy5felRpbWUgPSAtX3RpbnlOdW07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50IHx8IHRoaXMuX2RwLFxuICAgICAgICBzdGFydCA9IHRoaXMuX3N0YXJ0LFxuICAgICAgICByYXdUaW1lO1xuICAgIHJldHVybiAhISghcGFyZW50IHx8IHRoaXMuX3RzICYmIHRoaXMuX2luaXR0ZWQgJiYgcGFyZW50LmlzQWN0aXZlKCkgJiYgKHJhd1RpbWUgPSBwYXJlbnQucmF3VGltZSh0cnVlKSkgPj0gc3RhcnQgJiYgcmF3VGltZSA8IHRoaXMuZW5kVGltZSh0cnVlKSAtIF90aW55TnVtKTtcbiAgfTtcblxuICBfcHJvdG8uZXZlbnRDYWxsYmFjayA9IGZ1bmN0aW9uIGV2ZW50Q2FsbGJhY2sodHlwZSwgY2FsbGJhY2ssIHBhcmFtcykge1xuICAgIHZhciB2YXJzID0gdGhpcy52YXJzO1xuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgIGRlbGV0ZSB2YXJzW3R5cGVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyc1t0eXBlXSA9IGNhbGxiYWNrO1xuICAgICAgICBwYXJhbXMgJiYgKHZhcnNbdHlwZSArIFwiUGFyYW1zXCJdID0gcGFyYW1zKTtcbiAgICAgICAgdHlwZSA9PT0gXCJvblVwZGF0ZVwiICYmICh0aGlzLl9vblVwZGF0ZSA9IGNhbGxiYWNrKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhcnNbdHlwZV07XG4gIH07XG5cbiAgX3Byb3RvLnRoZW4gPSBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgdmFyIGYgPSBfaXNGdW5jdGlvbihvbkZ1bGZpbGxlZCkgPyBvbkZ1bGZpbGxlZCA6IF9wYXNzVGhyb3VnaCxcbiAgICAgICAgICBfcmVzb2x2ZSA9IGZ1bmN0aW9uIF9yZXNvbHZlKCkge1xuICAgICAgICB2YXIgX3RoZW4gPSBzZWxmLnRoZW47XG4gICAgICAgIHNlbGYudGhlbiA9IG51bGw7IC8vIHRlbXBvcmFyaWx5IG51bGwgdGhlIHRoZW4oKSBtZXRob2QgdG8gYXZvaWQgYW4gaW5maW5pdGUgbG9vcCAoc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ncmVlbnNvY2svR1NBUC9pc3N1ZXMvMzIyKVxuXG4gICAgICAgIF9pc0Z1bmN0aW9uKGYpICYmIChmID0gZihzZWxmKSkgJiYgKGYudGhlbiB8fCBmID09PSBzZWxmKSAmJiAoc2VsZi50aGVuID0gX3RoZW4pO1xuICAgICAgICByZXNvbHZlKGYpO1xuICAgICAgICBzZWxmLnRoZW4gPSBfdGhlbjtcbiAgICAgIH07XG5cbiAgICAgIGlmIChzZWxmLl9pbml0dGVkICYmIHNlbGYudG90YWxQcm9ncmVzcygpID09PSAxICYmIHNlbGYuX3RzID49IDAgfHwgIXNlbGYuX3RUaW1lICYmIHNlbGYuX3RzIDwgMCkge1xuICAgICAgICBfcmVzb2x2ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5fcHJvbSA9IF9yZXNvbHZlO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5raWxsID0gZnVuY3Rpb24ga2lsbCgpIHtcbiAgICBfaW50ZXJydXB0KHRoaXMpO1xuICB9O1xuXG4gIHJldHVybiBBbmltYXRpb247XG59KCk7XG5cbl9zZXREZWZhdWx0cyhBbmltYXRpb24ucHJvdG90eXBlLCB7XG4gIF90aW1lOiAwLFxuICBfc3RhcnQ6IDAsXG4gIF9lbmQ6IDAsXG4gIF90VGltZTogMCxcbiAgX3REdXI6IDAsXG4gIF9kaXJ0eTogMCxcbiAgX3JlcGVhdDogMCxcbiAgX3lveW86IGZhbHNlLFxuICBwYXJlbnQ6IG51bGwsXG4gIF9pbml0dGVkOiBmYWxzZSxcbiAgX3JEZWxheTogMCxcbiAgX3RzOiAxLFxuICBfZHA6IDAsXG4gIHJhdGlvOiAwLFxuICBfelRpbWU6IC1fdGlueU51bSxcbiAgX3Byb206IDAsXG4gIF9wczogZmFsc2UsXG4gIF9ydHM6IDFcbn0pO1xuLypcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFRJTUVMSU5FXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuXG5leHBvcnQgdmFyIFRpbWVsaW5lID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfQW5pbWF0aW9uKSB7XG4gIF9pbmhlcml0c0xvb3NlKFRpbWVsaW5lLCBfQW5pbWF0aW9uKTtcblxuICBmdW5jdGlvbiBUaW1lbGluZSh2YXJzLCBwb3NpdGlvbikge1xuICAgIHZhciBfdGhpcztcblxuICAgIGlmICh2YXJzID09PSB2b2lkIDApIHtcbiAgICAgIHZhcnMgPSB7fTtcbiAgICB9XG5cbiAgICBfdGhpcyA9IF9BbmltYXRpb24uY2FsbCh0aGlzLCB2YXJzKSB8fCB0aGlzO1xuICAgIF90aGlzLmxhYmVscyA9IHt9O1xuICAgIF90aGlzLnNtb290aENoaWxkVGltaW5nID0gISF2YXJzLnNtb290aENoaWxkVGltaW5nO1xuICAgIF90aGlzLmF1dG9SZW1vdmVDaGlsZHJlbiA9ICEhdmFycy5hdXRvUmVtb3ZlQ2hpbGRyZW47XG4gICAgX3RoaXMuX3NvcnQgPSBfaXNOb3RGYWxzZSh2YXJzLnNvcnRDaGlsZHJlbik7XG4gICAgX2dsb2JhbFRpbWVsaW5lICYmIF9hZGRUb1RpbWVsaW5lKHZhcnMucGFyZW50IHx8IF9nbG9iYWxUaW1lbGluZSwgX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIHBvc2l0aW9uKTtcbiAgICB2YXJzLnJldmVyc2VkICYmIF90aGlzLnJldmVyc2UoKTtcbiAgICB2YXJzLnBhdXNlZCAmJiBfdGhpcy5wYXVzZWQodHJ1ZSk7XG4gICAgdmFycy5zY3JvbGxUcmlnZ2VyICYmIF9zY3JvbGxUcmlnZ2VyKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCB2YXJzLnNjcm9sbFRyaWdnZXIpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8yID0gVGltZWxpbmUucHJvdG90eXBlO1xuXG4gIF9wcm90bzIudG8gPSBmdW5jdGlvbiB0byh0YXJnZXRzLCB2YXJzLCBwb3NpdGlvbikge1xuICAgIF9jcmVhdGVUd2VlblR5cGUoMCwgYXJndW1lbnRzLCB0aGlzKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90bzIuZnJvbSA9IGZ1bmN0aW9uIGZyb20odGFyZ2V0cywgdmFycywgcG9zaXRpb24pIHtcbiAgICBfY3JlYXRlVHdlZW5UeXBlKDEsIGFyZ3VtZW50cywgdGhpcyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8yLmZyb21UbyA9IGZ1bmN0aW9uIGZyb21Ubyh0YXJnZXRzLCBmcm9tVmFycywgdG9WYXJzLCBwb3NpdGlvbikge1xuICAgIF9jcmVhdGVUd2VlblR5cGUoMiwgYXJndW1lbnRzLCB0aGlzKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90bzIuc2V0ID0gZnVuY3Rpb24gc2V0KHRhcmdldHMsIHZhcnMsIHBvc2l0aW9uKSB7XG4gICAgdmFycy5kdXJhdGlvbiA9IDA7XG4gICAgdmFycy5wYXJlbnQgPSB0aGlzO1xuICAgIF9pbmhlcml0RGVmYXVsdHModmFycykucmVwZWF0RGVsYXkgfHwgKHZhcnMucmVwZWF0ID0gMCk7XG4gICAgdmFycy5pbW1lZGlhdGVSZW5kZXIgPSAhIXZhcnMuaW1tZWRpYXRlUmVuZGVyO1xuICAgIG5ldyBUd2Vlbih0YXJnZXRzLCB2YXJzLCBfcGFyc2VQb3NpdGlvbih0aGlzLCBwb3NpdGlvbiksIDEpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90bzIuY2FsbCA9IGZ1bmN0aW9uIGNhbGwoY2FsbGJhY2ssIHBhcmFtcywgcG9zaXRpb24pIHtcbiAgICByZXR1cm4gX2FkZFRvVGltZWxpbmUodGhpcywgVHdlZW4uZGVsYXllZENhbGwoMCwgY2FsbGJhY2ssIHBhcmFtcyksIHBvc2l0aW9uKTtcbiAgfSAvL09OTFkgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkhIE1heWJlIGRlbGV0ZT9cbiAgO1xuXG4gIF9wcm90bzIuc3RhZ2dlclRvID0gZnVuY3Rpb24gc3RhZ2dlclRvKHRhcmdldHMsIGR1cmF0aW9uLCB2YXJzLCBzdGFnZ2VyLCBwb3NpdGlvbiwgb25Db21wbGV0ZUFsbCwgb25Db21wbGV0ZUFsbFBhcmFtcykge1xuICAgIHZhcnMuZHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICB2YXJzLnN0YWdnZXIgPSB2YXJzLnN0YWdnZXIgfHwgc3RhZ2dlcjtcbiAgICB2YXJzLm9uQ29tcGxldGUgPSBvbkNvbXBsZXRlQWxsO1xuICAgIHZhcnMub25Db21wbGV0ZVBhcmFtcyA9IG9uQ29tcGxldGVBbGxQYXJhbXM7XG4gICAgdmFycy5wYXJlbnQgPSB0aGlzO1xuICAgIG5ldyBUd2Vlbih0YXJnZXRzLCB2YXJzLCBfcGFyc2VQb3NpdGlvbih0aGlzLCBwb3NpdGlvbikpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90bzIuc3RhZ2dlckZyb20gPSBmdW5jdGlvbiBzdGFnZ2VyRnJvbSh0YXJnZXRzLCBkdXJhdGlvbiwgdmFycywgc3RhZ2dlciwgcG9zaXRpb24sIG9uQ29tcGxldGVBbGwsIG9uQ29tcGxldGVBbGxQYXJhbXMpIHtcbiAgICB2YXJzLnJ1bkJhY2t3YXJkcyA9IDE7XG4gICAgX2luaGVyaXREZWZhdWx0cyh2YXJzKS5pbW1lZGlhdGVSZW5kZXIgPSBfaXNOb3RGYWxzZSh2YXJzLmltbWVkaWF0ZVJlbmRlcik7XG4gICAgcmV0dXJuIHRoaXMuc3RhZ2dlclRvKHRhcmdldHMsIGR1cmF0aW9uLCB2YXJzLCBzdGFnZ2VyLCBwb3NpdGlvbiwgb25Db21wbGV0ZUFsbCwgb25Db21wbGV0ZUFsbFBhcmFtcyk7XG4gIH07XG5cbiAgX3Byb3RvMi5zdGFnZ2VyRnJvbVRvID0gZnVuY3Rpb24gc3RhZ2dlckZyb21Ubyh0YXJnZXRzLCBkdXJhdGlvbiwgZnJvbVZhcnMsIHRvVmFycywgc3RhZ2dlciwgcG9zaXRpb24sIG9uQ29tcGxldGVBbGwsIG9uQ29tcGxldGVBbGxQYXJhbXMpIHtcbiAgICB0b1ZhcnMuc3RhcnRBdCA9IGZyb21WYXJzO1xuICAgIF9pbmhlcml0RGVmYXVsdHModG9WYXJzKS5pbW1lZGlhdGVSZW5kZXIgPSBfaXNOb3RGYWxzZSh0b1ZhcnMuaW1tZWRpYXRlUmVuZGVyKTtcbiAgICByZXR1cm4gdGhpcy5zdGFnZ2VyVG8odGFyZ2V0cywgZHVyYXRpb24sIHRvVmFycywgc3RhZ2dlciwgcG9zaXRpb24sIG9uQ29tcGxldGVBbGwsIG9uQ29tcGxldGVBbGxQYXJhbXMpO1xuICB9O1xuXG4gIF9wcm90bzIucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKSB7XG4gICAgdmFyIHByZXZUaW1lID0gdGhpcy5fdGltZSxcbiAgICAgICAgdER1ciA9IHRoaXMuX2RpcnR5ID8gdGhpcy50b3RhbER1cmF0aW9uKCkgOiB0aGlzLl90RHVyLFxuICAgICAgICBkdXIgPSB0aGlzLl9kdXIsXG4gICAgICAgIHRUaW1lID0gdG90YWxUaW1lIDw9IDAgPyAwIDogX3JvdW5kUHJlY2lzZSh0b3RhbFRpbWUpLFxuICAgICAgICAvLyBpZiBhIHBhdXNlZCB0aW1lbGluZSBpcyByZXN1bWVkIChvciBpdHMgX3N0YXJ0IGlzIHVwZGF0ZWQgZm9yIGFub3RoZXIgcmVhc29uLi4ud2hpY2ggcm91bmRzIGl0KSwgdGhhdCBjb3VsZCByZXN1bHQgaW4gdGhlIHBsYXloZWFkIHNoaWZ0aW5nIGEgKip0aW55KiogYW1vdW50IGFuZCBhIHplcm8tZHVyYXRpb24gY2hpbGQgYXQgdGhhdCBzcG90IG1heSBnZXQgcmVuZGVyZWQgYXQgYSBkaWZmZXJlbnQgcmF0aW8sIGxpa2UgaXRzIHRvdGFsVGltZSBpbiByZW5kZXIoKSBtYXkgYmUgMWUtMTcgaW5zdGVhZCBvZiAwLCBmb3IgZXhhbXBsZS5cbiAgICBjcm9zc2luZ1N0YXJ0ID0gdGhpcy5felRpbWUgPCAwICE9PSB0b3RhbFRpbWUgPCAwICYmICh0aGlzLl9pbml0dGVkIHx8ICFkdXIpLFxuICAgICAgICB0aW1lLFxuICAgICAgICBjaGlsZCxcbiAgICAgICAgbmV4dCxcbiAgICAgICAgaXRlcmF0aW9uLFxuICAgICAgICBjeWNsZUR1cmF0aW9uLFxuICAgICAgICBwcmV2UGF1c2VkLFxuICAgICAgICBwYXVzZVR3ZWVuLFxuICAgICAgICB0aW1lU2NhbGUsXG4gICAgICAgIHByZXZTdGFydCxcbiAgICAgICAgcHJldkl0ZXJhdGlvbixcbiAgICAgICAgeW95byxcbiAgICAgICAgaXNZb3lvO1xuICAgIHRoaXMgIT09IF9nbG9iYWxUaW1lbGluZSAmJiB0VGltZSA+IHREdXIgJiYgdG90YWxUaW1lID49IDAgJiYgKHRUaW1lID0gdER1cik7XG5cbiAgICBpZiAodFRpbWUgIT09IHRoaXMuX3RUaW1lIHx8IGZvcmNlIHx8IGNyb3NzaW5nU3RhcnQpIHtcbiAgICAgIGlmIChwcmV2VGltZSAhPT0gdGhpcy5fdGltZSAmJiBkdXIpIHtcbiAgICAgICAgLy9pZiB0b3RhbER1cmF0aW9uKCkgZmluZHMgYSBjaGlsZCB3aXRoIGEgbmVnYXRpdmUgc3RhcnRUaW1lIGFuZCBzbW9vdGhDaGlsZFRpbWluZyBpcyB0cnVlLCB0aGluZ3MgZ2V0IHNoaWZ0ZWQgYXJvdW5kIGludGVybmFsbHkgc28gd2UgbmVlZCB0byBhZGp1c3QgdGhlIHRpbWUgYWNjb3JkaW5nbHkuIEZvciBleGFtcGxlLCBpZiBhIHR3ZWVuIHN0YXJ0cyBhdCAtMzAgd2UgbXVzdCBzaGlmdCBFVkVSWVRISU5HIGZvcndhcmQgMzAgc2Vjb25kcyBhbmQgbW92ZSB0aGlzIHRpbWVsaW5lJ3Mgc3RhcnRUaW1lIGJhY2t3YXJkIGJ5IDMwIHNlY29uZHMgc28gdGhhdCB0aGluZ3MgYWxpZ24gd2l0aCB0aGUgcGxheWhlYWQgKG5vIGp1bXApLlxuICAgICAgICB0VGltZSArPSB0aGlzLl90aW1lIC0gcHJldlRpbWU7XG4gICAgICAgIHRvdGFsVGltZSArPSB0aGlzLl90aW1lIC0gcHJldlRpbWU7XG4gICAgICB9XG5cbiAgICAgIHRpbWUgPSB0VGltZTtcbiAgICAgIHByZXZTdGFydCA9IHRoaXMuX3N0YXJ0O1xuICAgICAgdGltZVNjYWxlID0gdGhpcy5fdHM7XG4gICAgICBwcmV2UGF1c2VkID0gIXRpbWVTY2FsZTtcblxuICAgICAgaWYgKGNyb3NzaW5nU3RhcnQpIHtcbiAgICAgICAgZHVyIHx8IChwcmV2VGltZSA9IHRoaXMuX3pUaW1lKTsgLy93aGVuIHRoZSBwbGF5aGVhZCBhcnJpdmVzIGF0IEVYQUNUTFkgdGltZSAwIChyaWdodCBvbiB0b3ApIG9mIGEgemVyby1kdXJhdGlvbiB0aW1lbGluZSwgd2UgbmVlZCB0byBkaXNjZXJuIGlmIGV2ZW50cyBhcmUgc3VwcHJlc3NlZCBzbyB0aGF0IHdoZW4gdGhlIHBsYXloZWFkIG1vdmVzIGFnYWluIChuZXh0IHRpbWUpLCBpdCdsbCB0cmlnZ2VyIHRoZSBjYWxsYmFjay4gSWYgZXZlbnRzIGFyZSBOT1Qgc3VwcHJlc3NlZCwgb2J2aW91c2x5IHRoZSBjYWxsYmFjayB3b3VsZCBiZSB0cmlnZ2VyZWQgaW4gdGhpcyByZW5kZXIuIEJhc2ljYWxseSwgdGhlIGNhbGxiYWNrIHNob3VsZCBmaXJlIGVpdGhlciB3aGVuIHRoZSBwbGF5aGVhZCBBUlJJVkVTIG9yIExFQVZFUyB0aGlzIGV4YWN0IHNwb3QsIG5vdCBib3RoLiBJbWFnaW5lIGRvaW5nIGEgdGltZWxpbmUuc2VlaygwKSBhbmQgdGhlcmUncyBhIGNhbGxiYWNrIHRoYXQgc2l0cyBhdCAwLiBTaW5jZSBldmVudHMgYXJlIHN1cHByZXNzZWQgb24gdGhhdCBzZWVrKCkgYnkgZGVmYXVsdCwgbm90aGluZyB3aWxsIGZpcmUsIGJ1dCB3aGVuIHRoZSBwbGF5aGVhZCBtb3ZlcyBvZmYgb2YgdGhhdCBwb3NpdGlvbiwgdGhlIGNhbGxiYWNrIHNob3VsZCBmaXJlLiBUaGlzIGJlaGF2aW9yIGlzIHdoYXQgcGVvcGxlIGludHVpdGl2ZWx5IGV4cGVjdC5cblxuICAgICAgICAodG90YWxUaW1lIHx8ICFzdXBwcmVzc0V2ZW50cykgJiYgKHRoaXMuX3pUaW1lID0gdG90YWxUaW1lKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX3JlcGVhdCkge1xuICAgICAgICAvL2FkanVzdCB0aGUgdGltZSBmb3IgcmVwZWF0cyBhbmQgeW95b3NcbiAgICAgICAgeW95byA9IHRoaXMuX3lveW87XG4gICAgICAgIGN5Y2xlRHVyYXRpb24gPSBkdXIgKyB0aGlzLl9yRGVsYXk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3JlcGVhdCA8IC0xICYmIHRvdGFsVGltZSA8IDApIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy50b3RhbFRpbWUoY3ljbGVEdXJhdGlvbiAqIDEwMCArIHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRpbWUgPSBfcm91bmRQcmVjaXNlKHRUaW1lICUgY3ljbGVEdXJhdGlvbik7IC8vcm91bmQgdG8gYXZvaWQgZmxvYXRpbmcgcG9pbnQgZXJyb3JzLiAoNCAlIDAuOCBzaG91bGQgYmUgMCBidXQgc29tZSBicm93c2VycyByZXBvcnQgaXQgYXMgMC43OTk5OTk5OSEpXG5cbiAgICAgICAgaWYgKHRUaW1lID09PSB0RHVyKSB7XG4gICAgICAgICAgLy8gdGhlIHREdXIgPT09IHRUaW1lIGlzIGZvciBlZGdlIGNhc2VzIHdoZXJlIHRoZXJlJ3MgYSBsZW5ndGh5IGRlY2ltYWwgb24gdGhlIGR1cmF0aW9uIGFuZCBpdCBtYXkgcmVhY2ggdGhlIHZlcnkgZW5kIGJ1dCB0aGUgdGltZSBpcyByZW5kZXJlZCBhcyBub3QtcXVpdGUtdGhlcmUgKHJlbWVtYmVyLCB0RHVyIGlzIHJvdW5kZWQgdG8gNCBkZWNpbWFscyB3aGVyZWFzIGR1ciBpc24ndClcbiAgICAgICAgICBpdGVyYXRpb24gPSB0aGlzLl9yZXBlYXQ7XG4gICAgICAgICAgdGltZSA9IGR1cjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVyYXRpb24gPSB+fih0VGltZSAvIGN5Y2xlRHVyYXRpb24pO1xuXG4gICAgICAgICAgaWYgKGl0ZXJhdGlvbiAmJiBpdGVyYXRpb24gPT09IHRUaW1lIC8gY3ljbGVEdXJhdGlvbikge1xuICAgICAgICAgICAgdGltZSA9IGR1cjtcbiAgICAgICAgICAgIGl0ZXJhdGlvbi0tO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRpbWUgPiBkdXIgJiYgKHRpbWUgPSBkdXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJldkl0ZXJhdGlvbiA9IF9hbmltYXRpb25DeWNsZSh0aGlzLl90VGltZSwgY3ljbGVEdXJhdGlvbik7XG4gICAgICAgICFwcmV2VGltZSAmJiB0aGlzLl90VGltZSAmJiBwcmV2SXRlcmF0aW9uICE9PSBpdGVyYXRpb24gJiYgdGhpcy5fdFRpbWUgLSBwcmV2SXRlcmF0aW9uICogY3ljbGVEdXJhdGlvbiAtIHRoaXMuX2R1ciA8PSAwICYmIChwcmV2SXRlcmF0aW9uID0gaXRlcmF0aW9uKTsgLy8gZWRnZSBjYXNlIC0gaWYgc29tZW9uZSBkb2VzIGFkZFBhdXNlKCkgYXQgdGhlIHZlcnkgYmVnaW5uaW5nIG9mIGEgcmVwZWF0aW5nIHRpbWVsaW5lLCB0aGF0IHBhdXNlIGlzIHRlY2huaWNhbGx5IGF0IHRoZSBzYW1lIHNwb3QgYXMgdGhlIGVuZCB3aGljaCBjYXVzZXMgdGhpcy5fdGltZSB0byBnZXQgc2V0IHRvIDAgd2hlbiB0aGUgdG90YWxUaW1lIHdvdWxkIG5vcm1hbGx5IHBsYWNlIHRoZSBwbGF5aGVhZCBhdCB0aGUgZW5kLiBTZWUgaHR0cHM6Ly9ncmVlbnNvY2suY29tL2ZvcnVtcy90b3BpYy8yMzgyMy1jbG9zaW5nLW5hdi1hbmltYXRpb24tbm90LXdvcmtpbmctb24taWUtYW5kLWlwaG9uZS02LW1heWJlLW90aGVyLW9sZGVyLWJyb3dzZXIvP3RhYj1jb21tZW50cyNjb21tZW50LTExMzAwNSBhbHNvLCB0aGlzLl90VGltZSAtIHByZXZJdGVyYXRpb24gKiBjeWNsZUR1cmF0aW9uIC0gdGhpcy5fZHVyIDw9IDAganVzdCBjaGVja3MgdG8gbWFrZSBzdXJlIGl0IHdhc24ndCBwcmV2aW91c2x5IGluIHRoZSBcInJlcGVhdERlbGF5XCIgcG9ydGlvblxuXG4gICAgICAgIGlmICh5b3lvICYmIGl0ZXJhdGlvbiAmIDEpIHtcbiAgICAgICAgICB0aW1lID0gZHVyIC0gdGltZTtcbiAgICAgICAgICBpc1lveW8gPSAxO1xuICAgICAgICB9XG4gICAgICAgIC8qXG4gICAgICAgIG1ha2Ugc3VyZSBjaGlsZHJlbiBhdCB0aGUgZW5kL2JlZ2lubmluZyBvZiB0aGUgdGltZWxpbmUgYXJlIHJlbmRlcmVkIHByb3Blcmx5LiBJZiwgZm9yIGV4YW1wbGUsXG4gICAgICAgIGEgMy1zZWNvbmQgbG9uZyB0aW1lbGluZSByZW5kZXJlZCBhdCAyLjkgc2Vjb25kcyBwcmV2aW91c2x5LCBhbmQgbm93IHJlbmRlcnMgYXQgMy4yIHNlY29uZHMgKHdoaWNoXG4gICAgICAgIHdvdWxkIGdldCB0cmFuc2xhdGVkIHRvIDIuOCBzZWNvbmRzIGlmIHRoZSB0aW1lbGluZSB5b3lvcyBvciAwLjIgc2Vjb25kcyBpZiBpdCBqdXN0IHJlcGVhdHMpLCB0aGVyZVxuICAgICAgICBjb3VsZCBiZSBhIGNhbGxiYWNrIG9yIGEgc2hvcnQgdHdlZW4gdGhhdCdzIGF0IDIuOTUgb3IgMyBzZWNvbmRzIGluIHdoaWNoIHdvdWxkbid0IHJlbmRlci4gU29cbiAgICAgICAgd2UgbmVlZCB0byBwdXNoIHRoZSB0aW1lbGluZSB0byB0aGUgZW5kIChhbmQvb3IgYmVnaW5uaW5nIGRlcGVuZGluZyBvbiBpdHMgeW95byB2YWx1ZSkuIEFsc28gd2UgbXVzdFxuICAgICAgICBlbnN1cmUgdGhhdCB6ZXJvLWR1cmF0aW9uIHR3ZWVucyBhdCB0aGUgdmVyeSBiZWdpbm5pbmcgb3IgZW5kIG9mIHRoZSBUaW1lbGluZSB3b3JrLlxuICAgICAgICAqL1xuXG5cbiAgICAgICAgaWYgKGl0ZXJhdGlvbiAhPT0gcHJldkl0ZXJhdGlvbiAmJiAhdGhpcy5fbG9jaykge1xuICAgICAgICAgIHZhciByZXdpbmRpbmcgPSB5b3lvICYmIHByZXZJdGVyYXRpb24gJiAxLFxuICAgICAgICAgICAgICBkb2VzV3JhcCA9IHJld2luZGluZyA9PT0gKHlveW8gJiYgaXRlcmF0aW9uICYgMSk7XG4gICAgICAgICAgaXRlcmF0aW9uIDwgcHJldkl0ZXJhdGlvbiAmJiAocmV3aW5kaW5nID0gIXJld2luZGluZyk7XG4gICAgICAgICAgcHJldlRpbWUgPSByZXdpbmRpbmcgPyAwIDogZHVyO1xuICAgICAgICAgIHRoaXMuX2xvY2sgPSAxO1xuICAgICAgICAgIHRoaXMucmVuZGVyKHByZXZUaW1lIHx8IChpc1lveW8gPyAwIDogX3JvdW5kUHJlY2lzZShpdGVyYXRpb24gKiBjeWNsZUR1cmF0aW9uKSksIHN1cHByZXNzRXZlbnRzLCAhZHVyKS5fbG9jayA9IDA7XG4gICAgICAgICAgdGhpcy5fdFRpbWUgPSB0VGltZTsgLy8gaWYgYSB1c2VyIGdldHMgdGhlIGl0ZXJhdGlvbigpIGluc2lkZSB0aGUgb25SZXBlYXQsIGZvciBleGFtcGxlLCBpdCBzaG91bGQgYmUgYWNjdXJhdGUuXG5cbiAgICAgICAgICAhc3VwcHJlc3NFdmVudHMgJiYgdGhpcy5wYXJlbnQgJiYgX2NhbGxiYWNrKHRoaXMsIFwib25SZXBlYXRcIik7XG4gICAgICAgICAgdGhpcy52YXJzLnJlcGVhdFJlZnJlc2ggJiYgIWlzWW95byAmJiAodGhpcy5pbnZhbGlkYXRlKCkuX2xvY2sgPSAxKTtcblxuICAgICAgICAgIGlmIChwcmV2VGltZSAmJiBwcmV2VGltZSAhPT0gdGhpcy5fdGltZSB8fCBwcmV2UGF1c2VkICE9PSAhdGhpcy5fdHMgfHwgdGhpcy52YXJzLm9uUmVwZWF0ICYmICF0aGlzLnBhcmVudCAmJiAhdGhpcy5fYWN0KSB7XG4gICAgICAgICAgICAvLyBpZiBwcmV2VGltZSBpcyAwIGFuZCB3ZSByZW5kZXIgYXQgdGhlIHZlcnkgZW5kLCBfdGltZSB3aWxsIGJlIHRoZSBlbmQsIHRodXMgd29uJ3QgbWF0Y2guIFNvIGluIHRoaXMgZWRnZSBjYXNlLCBwcmV2VGltZSB3b24ndCBtYXRjaCBfdGltZSBidXQgdGhhdCdzIG9rYXkuIElmIGl0IGdldHMga2lsbGVkIGluIHRoZSBvblJlcGVhdCwgZWplY3QgYXMgd2VsbC5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGR1ciA9IHRoaXMuX2R1cjsgLy8gaW4gY2FzZSB0aGUgZHVyYXRpb24gY2hhbmdlZCBpbiB0aGUgb25SZXBlYXRcblxuICAgICAgICAgIHREdXIgPSB0aGlzLl90RHVyO1xuXG4gICAgICAgICAgaWYgKGRvZXNXcmFwKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2NrID0gMjtcbiAgICAgICAgICAgIHByZXZUaW1lID0gcmV3aW5kaW5nID8gZHVyIDogLTAuMDAwMTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKHByZXZUaW1lLCB0cnVlKTtcbiAgICAgICAgICAgIHRoaXMudmFycy5yZXBlYXRSZWZyZXNoICYmICFpc1lveW8gJiYgdGhpcy5pbnZhbGlkYXRlKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fbG9jayA9IDA7XG5cbiAgICAgICAgICBpZiAoIXRoaXMuX3RzICYmICFwcmV2UGF1c2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICB9IC8vaW4gb3JkZXIgZm9yIHlveW9FYXNlIHRvIHdvcmsgcHJvcGVybHkgd2hlbiB0aGVyZSdzIGEgc3RhZ2dlciwgd2UgbXVzdCBzd2FwIG91dCB0aGUgZWFzZSBpbiBlYWNoIHN1Yi10d2Vlbi5cblxuXG4gICAgICAgICAgX3Byb3BhZ2F0ZVlveW9FYXNlKHRoaXMsIGlzWW95byk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2hhc1BhdXNlICYmICF0aGlzLl9mb3JjaW5nICYmIHRoaXMuX2xvY2sgPCAyKSB7XG4gICAgICAgIHBhdXNlVHdlZW4gPSBfZmluZE5leHRQYXVzZVR3ZWVuKHRoaXMsIF9yb3VuZFByZWNpc2UocHJldlRpbWUpLCBfcm91bmRQcmVjaXNlKHRpbWUpKTtcblxuICAgICAgICBpZiAocGF1c2VUd2Vlbikge1xuICAgICAgICAgIHRUaW1lIC09IHRpbWUgLSAodGltZSA9IHBhdXNlVHdlZW4uX3N0YXJ0KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLl90VGltZSA9IHRUaW1lO1xuICAgICAgdGhpcy5fdGltZSA9IHRpbWU7XG4gICAgICB0aGlzLl9hY3QgPSAhdGltZVNjYWxlOyAvL2FzIGxvbmcgYXMgaXQncyBub3QgcGF1c2VkLCBmb3JjZSBpdCB0byBiZSBhY3RpdmUgc28gdGhhdCBpZiB0aGUgdXNlciByZW5kZXJzIGluZGVwZW5kZW50IG9mIHRoZSBwYXJlbnQgdGltZWxpbmUsIGl0J2xsIGJlIGZvcmNlZCB0byByZS1yZW5kZXIgb24gdGhlIG5leHQgdGljay5cblxuICAgICAgaWYgKCF0aGlzLl9pbml0dGVkKSB7XG4gICAgICAgIHRoaXMuX29uVXBkYXRlID0gdGhpcy52YXJzLm9uVXBkYXRlO1xuICAgICAgICB0aGlzLl9pbml0dGVkID0gMTtcbiAgICAgICAgdGhpcy5felRpbWUgPSB0b3RhbFRpbWU7XG4gICAgICAgIHByZXZUaW1lID0gMDsgLy8gdXBvbiBpbml0LCB0aGUgcGxheWhlYWQgc2hvdWxkIGFsd2F5cyBnbyBmb3J3YXJkOyBzb21lb25lIGNvdWxkIGludmFsaWRhdGUoKSBhIGNvbXBsZXRlZCB0aW1lbGluZSBhbmQgdGhlbiBpZiB0aGV5IHJlc3RhcnQoKSwgdGhhdCB3b3VsZCBtYWtlIGNoaWxkIHR3ZWVucyByZW5kZXIgaW4gcmV2ZXJzZSBvcmRlciB3aGljaCBjb3VsZCBsb2NrIGluIHRoZSB3cm9uZyBzdGFydGluZyB2YWx1ZXMgaWYgdGhleSBidWlsZCBvbiBlYWNoIG90aGVyLCBsaWtlIHRsLnRvKG9iaiwge3g6IDEwMH0pLnRvKG9iaiwge3g6IDB9KS5cbiAgICAgIH1cblxuICAgICAgaWYgKCFwcmV2VGltZSAmJiB0aW1lICYmICFzdXBwcmVzc0V2ZW50cyAmJiAhaXRlcmF0aW9uKSB7XG4gICAgICAgIF9jYWxsYmFjayh0aGlzLCBcIm9uU3RhcnRcIik7XG5cbiAgICAgICAgaWYgKHRoaXMuX3RUaW1lICE9PSB0VGltZSkge1xuICAgICAgICAgIC8vIGluIGNhc2UgdGhlIG9uU3RhcnQgdHJpZ2dlcmVkIGEgcmVuZGVyIGF0IGEgZGlmZmVyZW50IHNwb3QsIGVqZWN0LiBMaWtlIGlmIHNvbWVvbmUgZGlkIGFuaW1hdGlvbi5wYXVzZSgwLjUpIG9yIHNvbWV0aGluZyBpbnNpZGUgdGhlIG9uU3RhcnQuXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRpbWUgPj0gcHJldlRpbWUgJiYgdG90YWxUaW1lID49IDApIHtcbiAgICAgICAgY2hpbGQgPSB0aGlzLl9maXJzdDtcblxuICAgICAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgICAgICBuZXh0ID0gY2hpbGQuX25leHQ7XG5cbiAgICAgICAgICBpZiAoKGNoaWxkLl9hY3QgfHwgdGltZSA+PSBjaGlsZC5fc3RhcnQpICYmIGNoaWxkLl90cyAmJiBwYXVzZVR3ZWVuICE9PSBjaGlsZCkge1xuICAgICAgICAgICAgaWYgKGNoaWxkLnBhcmVudCAhPT0gdGhpcykge1xuICAgICAgICAgICAgICAvLyBhbiBleHRyZW1lIGVkZ2UgY2FzZSAtIHRoZSBjaGlsZCdzIHJlbmRlciBjb3VsZCBkbyBzb21ldGhpbmcgbGlrZSBraWxsKCkgdGhlIFwibmV4dFwiIG9uZSBpbiB0aGUgbGlua2VkIGxpc3QsIG9yIHJlcGFyZW50IGl0LiBJbiB0aGF0IGNhc2Ugd2UgbXVzdCByZS1pbml0aWF0ZSB0aGUgd2hvbGUgcmVuZGVyIHRvIGJlIHNhZmUuXG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlcih0b3RhbFRpbWUsIHN1cHByZXNzRXZlbnRzLCBmb3JjZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNoaWxkLnJlbmRlcihjaGlsZC5fdHMgPiAwID8gKHRpbWUgLSBjaGlsZC5fc3RhcnQpICogY2hpbGQuX3RzIDogKGNoaWxkLl9kaXJ0eSA/IGNoaWxkLnRvdGFsRHVyYXRpb24oKSA6IGNoaWxkLl90RHVyKSArICh0aW1lIC0gY2hpbGQuX3N0YXJ0KSAqIGNoaWxkLl90cywgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcblxuICAgICAgICAgICAgaWYgKHRpbWUgIT09IHRoaXMuX3RpbWUgfHwgIXRoaXMuX3RzICYmICFwcmV2UGF1c2VkKSB7XG4gICAgICAgICAgICAgIC8vaW4gY2FzZSBhIHR3ZWVuIHBhdXNlcyBvciBzZWVrcyB0aGUgdGltZWxpbmUgd2hlbiByZW5kZXJpbmcsIGxpa2UgaW5zaWRlIG9mIGFuIG9uVXBkYXRlL29uQ29tcGxldGVcbiAgICAgICAgICAgICAgcGF1c2VUd2VlbiA9IDA7XG4gICAgICAgICAgICAgIG5leHQgJiYgKHRUaW1lICs9IHRoaXMuX3pUaW1lID0gLV90aW55TnVtKTsgLy8gaXQgZGlkbid0IGZpbmlzaCByZW5kZXJpbmcsIHNvIGZsYWcgelRpbWUgYXMgbmVnYXRpdmUgc28gdGhhdCBzbyB0aGF0IHRoZSBuZXh0IHRpbWUgcmVuZGVyKCkgaXMgY2FsbGVkIGl0J2xsIGJlIGZvcmNlZCAodG8gcmVuZGVyIGFueSByZW1haW5pbmcgY2hpbGRyZW4pXG5cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2hpbGQgPSBuZXh0O1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaGlsZCA9IHRoaXMuX2xhc3Q7XG4gICAgICAgIHZhciBhZGp1c3RlZFRpbWUgPSB0b3RhbFRpbWUgPCAwID8gdG90YWxUaW1lIDogdGltZTsgLy93aGVuIHRoZSBwbGF5aGVhZCBnb2VzIGJhY2t3YXJkIGJleW9uZCB0aGUgc3RhcnQgb2YgdGhpcyB0aW1lbGluZSwgd2UgbXVzdCBwYXNzIHRoYXQgaW5mb3JtYXRpb24gZG93biB0byB0aGUgY2hpbGQgYW5pbWF0aW9ucyBzbyB0aGF0IHplcm8tZHVyYXRpb24gdHdlZW5zIGtub3cgd2hldGhlciB0byByZW5kZXIgdGhlaXIgc3RhcnRpbmcgb3IgZW5kaW5nIHZhbHVlcy5cblxuICAgICAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgICAgICBuZXh0ID0gY2hpbGQuX3ByZXY7XG5cbiAgICAgICAgICBpZiAoKGNoaWxkLl9hY3QgfHwgYWRqdXN0ZWRUaW1lIDw9IGNoaWxkLl9lbmQpICYmIGNoaWxkLl90cyAmJiBwYXVzZVR3ZWVuICE9PSBjaGlsZCkge1xuICAgICAgICAgICAgaWYgKGNoaWxkLnBhcmVudCAhPT0gdGhpcykge1xuICAgICAgICAgICAgICAvLyBhbiBleHRyZW1lIGVkZ2UgY2FzZSAtIHRoZSBjaGlsZCdzIHJlbmRlciBjb3VsZCBkbyBzb21ldGhpbmcgbGlrZSBraWxsKCkgdGhlIFwibmV4dFwiIG9uZSBpbiB0aGUgbGlua2VkIGxpc3QsIG9yIHJlcGFyZW50IGl0LiBJbiB0aGF0IGNhc2Ugd2UgbXVzdCByZS1pbml0aWF0ZSB0aGUgd2hvbGUgcmVuZGVyIHRvIGJlIHNhZmUuXG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlcih0b3RhbFRpbWUsIHN1cHByZXNzRXZlbnRzLCBmb3JjZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNoaWxkLnJlbmRlcihjaGlsZC5fdHMgPiAwID8gKGFkanVzdGVkVGltZSAtIGNoaWxkLl9zdGFydCkgKiBjaGlsZC5fdHMgOiAoY2hpbGQuX2RpcnR5ID8gY2hpbGQudG90YWxEdXJhdGlvbigpIDogY2hpbGQuX3REdXIpICsgKGFkanVzdGVkVGltZSAtIGNoaWxkLl9zdGFydCkgKiBjaGlsZC5fdHMsIHN1cHByZXNzRXZlbnRzLCBmb3JjZSB8fCBfcmV2ZXJ0aW5nICYmIChjaGlsZC5faW5pdHRlZCB8fCBjaGlsZC5fc3RhcnRBdCkpOyAvLyBpZiByZXZlcnRpbmcsIHdlIHNob3VsZCBhbHdheXMgZm9yY2UgcmVuZGVycyBvZiBpbml0dGVkIHR3ZWVucyAoYnV0IHJlbWVtYmVyIHRoYXQgLmZyb21UbygpIG9yIC5mcm9tKCkgbWF5IGhhdmUgYSBfc3RhcnRBdCBidXQgbm90IF9pbml0dGVkIHlldCkuIElmLCBmb3IgZXhhbXBsZSwgYSAuZnJvbVRvKCkgdHdlZW4gd2l0aCBhIHN0YWdnZXIgKHdoaWNoIGNyZWF0ZXMgYW4gaW50ZXJuYWwgdGltZWxpbmUpIGdldHMgcmV2ZXJ0ZWQgQkVGT1JFIHNvbWUgb2YgaXRzIGNoaWxkIHR3ZWVucyByZW5kZXIgZm9yIHRoZSBmaXJzdCB0aW1lLCBpdCBtYXkgbm90IHByb3Blcmx5IHRyaWdnZXIgdGhlbSB0byByZXZlcnQuXG5cbiAgICAgICAgICAgIGlmICh0aW1lICE9PSB0aGlzLl90aW1lIHx8ICF0aGlzLl90cyAmJiAhcHJldlBhdXNlZCkge1xuICAgICAgICAgICAgICAvL2luIGNhc2UgYSB0d2VlbiBwYXVzZXMgb3Igc2Vla3MgdGhlIHRpbWVsaW5lIHdoZW4gcmVuZGVyaW5nLCBsaWtlIGluc2lkZSBvZiBhbiBvblVwZGF0ZS9vbkNvbXBsZXRlXG4gICAgICAgICAgICAgIHBhdXNlVHdlZW4gPSAwO1xuICAgICAgICAgICAgICBuZXh0ICYmICh0VGltZSArPSB0aGlzLl96VGltZSA9IGFkanVzdGVkVGltZSA/IC1fdGlueU51bSA6IF90aW55TnVtKTsgLy8gaXQgZGlkbid0IGZpbmlzaCByZW5kZXJpbmcsIHNvIGFkanVzdCB6VGltZSBzbyB0aGF0IHNvIHRoYXQgdGhlIG5leHQgdGltZSByZW5kZXIoKSBpcyBjYWxsZWQgaXQnbGwgYmUgZm9yY2VkICh0byByZW5kZXIgYW55IHJlbWFpbmluZyBjaGlsZHJlbilcblxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjaGlsZCA9IG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHBhdXNlVHdlZW4gJiYgIXN1cHByZXNzRXZlbnRzKSB7XG4gICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgcGF1c2VUd2Vlbi5yZW5kZXIodGltZSA+PSBwcmV2VGltZSA/IDAgOiAtX3RpbnlOdW0pLl96VGltZSA9IHRpbWUgPj0gcHJldlRpbWUgPyAxIDogLTE7XG5cbiAgICAgICAgaWYgKHRoaXMuX3RzKSB7XG4gICAgICAgICAgLy90aGUgY2FsbGJhY2sgcmVzdW1lZCBwbGF5YmFjayEgU28gc2luY2Ugd2UgbWF5IGhhdmUgaGVsZCBiYWNrIHRoZSBwbGF5aGVhZCBkdWUgdG8gd2hlcmUgdGhlIHBhdXNlIGlzIHBvc2l0aW9uZWQsIGdvIGFoZWFkIGFuZCBqdW1wIHRvIHdoZXJlIGl0J3MgU1VQUE9TRUQgdG8gYmUgKGlmIG5vIHBhdXNlIGhhcHBlbmVkKS5cbiAgICAgICAgICB0aGlzLl9zdGFydCA9IHByZXZTdGFydDsgLy9pZiB0aGUgcGF1c2Ugd2FzIGF0IGFuIGVhcmxpZXIgdGltZSBhbmQgdGhlIHVzZXIgcmVzdW1lZCBpbiB0aGUgY2FsbGJhY2ssIGl0IGNvdWxkIHJlcG9zaXRpb24gdGhlIHRpbWVsaW5lIChjaGFuZ2luZyBpdHMgc3RhcnRUaW1lKSwgdGhyb3dpbmcgdGhpbmdzIG9mZiBzbGlnaHRseSwgc28gd2UgbWFrZSBzdXJlIHRoZSBfc3RhcnQgZG9lc24ndCBzaGlmdC5cblxuICAgICAgICAgIF9zZXRFbmQodGhpcyk7XG5cbiAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXIodG90YWxUaW1lLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX29uVXBkYXRlICYmICFzdXBwcmVzc0V2ZW50cyAmJiBfY2FsbGJhY2sodGhpcywgXCJvblVwZGF0ZVwiLCB0cnVlKTtcbiAgICAgIGlmICh0VGltZSA9PT0gdER1ciAmJiB0aGlzLl90VGltZSA+PSB0aGlzLnRvdGFsRHVyYXRpb24oKSB8fCAhdFRpbWUgJiYgcHJldlRpbWUpIGlmIChwcmV2U3RhcnQgPT09IHRoaXMuX3N0YXJ0IHx8IE1hdGguYWJzKHRpbWVTY2FsZSkgIT09IE1hdGguYWJzKHRoaXMuX3RzKSkgaWYgKCF0aGlzLl9sb2NrKSB7XG4gICAgICAgIC8vIHJlbWVtYmVyLCBhIGNoaWxkJ3MgY2FsbGJhY2sgbWF5IGFsdGVyIHRoaXMgdGltZWxpbmUncyBwbGF5aGVhZCBvciB0aW1lU2NhbGUgd2hpY2ggaXMgd2h5IHdlIG5lZWQgdG8gYWRkIHNvbWUgb2YgdGhlc2UgY2hlY2tzLlxuICAgICAgICAodG90YWxUaW1lIHx8ICFkdXIpICYmICh0VGltZSA9PT0gdER1ciAmJiB0aGlzLl90cyA+IDAgfHwgIXRUaW1lICYmIHRoaXMuX3RzIDwgMCkgJiYgX3JlbW92ZUZyb21QYXJlbnQodGhpcywgMSk7IC8vIGRvbid0IHJlbW92ZSBpZiB0aGUgdGltZWxpbmUgaXMgcmV2ZXJzZWQgYW5kIHRoZSBwbGF5aGVhZCBpc24ndCBhdCAwLCBvdGhlcndpc2UgdGwucHJvZ3Jlc3MoMSkucmV2ZXJzZSgpIHdvbid0IHdvcmsuIE9ubHkgcmVtb3ZlIGlmIHRoZSBwbGF5aGVhZCBpcyBhdCB0aGUgZW5kIGFuZCB0aW1lU2NhbGUgaXMgcG9zaXRpdmUsIG9yIGlmIHRoZSBwbGF5aGVhZCBpcyBhdCAwIGFuZCB0aGUgdGltZVNjYWxlIGlzIG5lZ2F0aXZlLlxuXG4gICAgICAgIGlmICghc3VwcHJlc3NFdmVudHMgJiYgISh0b3RhbFRpbWUgPCAwICYmICFwcmV2VGltZSkgJiYgKHRUaW1lIHx8IHByZXZUaW1lIHx8ICF0RHVyKSkge1xuICAgICAgICAgIF9jYWxsYmFjayh0aGlzLCB0VGltZSA9PT0gdER1ciAmJiB0b3RhbFRpbWUgPj0gMCA/IFwib25Db21wbGV0ZVwiIDogXCJvblJldmVyc2VDb21wbGV0ZVwiLCB0cnVlKTtcblxuICAgICAgICAgIHRoaXMuX3Byb20gJiYgISh0VGltZSA8IHREdXIgJiYgdGhpcy50aW1lU2NhbGUoKSA+IDApICYmIHRoaXMuX3Byb20oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90bzIuYWRkID0gZnVuY3Rpb24gYWRkKGNoaWxkLCBwb3NpdGlvbikge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgX2lzTnVtYmVyKHBvc2l0aW9uKSB8fCAocG9zaXRpb24gPSBfcGFyc2VQb3NpdGlvbih0aGlzLCBwb3NpdGlvbiwgY2hpbGQpKTtcblxuICAgIGlmICghKGNoaWxkIGluc3RhbmNlb2YgQW5pbWF0aW9uKSkge1xuICAgICAgaWYgKF9pc0FycmF5KGNoaWxkKSkge1xuICAgICAgICBjaGlsZC5mb3JFYWNoKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMyLmFkZChvYmosIHBvc2l0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBpZiAoX2lzU3RyaW5nKGNoaWxkKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRMYWJlbChjaGlsZCwgcG9zaXRpb24pO1xuICAgICAgfVxuXG4gICAgICBpZiAoX2lzRnVuY3Rpb24oY2hpbGQpKSB7XG4gICAgICAgIGNoaWxkID0gVHdlZW4uZGVsYXllZENhbGwoMCwgY2hpbGQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMgIT09IGNoaWxkID8gX2FkZFRvVGltZWxpbmUodGhpcywgY2hpbGQsIHBvc2l0aW9uKSA6IHRoaXM7IC8vZG9uJ3QgYWxsb3cgYSB0aW1lbGluZSB0byBiZSBhZGRlZCB0byBpdHNlbGYgYXMgYSBjaGlsZCFcbiAgfTtcblxuICBfcHJvdG8yLmdldENoaWxkcmVuID0gZnVuY3Rpb24gZ2V0Q2hpbGRyZW4obmVzdGVkLCB0d2VlbnMsIHRpbWVsaW5lcywgaWdub3JlQmVmb3JlVGltZSkge1xuICAgIGlmIChuZXN0ZWQgPT09IHZvaWQgMCkge1xuICAgICAgbmVzdGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodHdlZW5zID09PSB2b2lkIDApIHtcbiAgICAgIHR3ZWVucyA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRpbWVsaW5lcyA9PT0gdm9pZCAwKSB7XG4gICAgICB0aW1lbGluZXMgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChpZ25vcmVCZWZvcmVUaW1lID09PSB2b2lkIDApIHtcbiAgICAgIGlnbm9yZUJlZm9yZVRpbWUgPSAtX2JpZ051bTtcbiAgICB9XG5cbiAgICB2YXIgYSA9IFtdLFxuICAgICAgICBjaGlsZCA9IHRoaXMuX2ZpcnN0O1xuXG4gICAgd2hpbGUgKGNoaWxkKSB7XG4gICAgICBpZiAoY2hpbGQuX3N0YXJ0ID49IGlnbm9yZUJlZm9yZVRpbWUpIHtcbiAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgVHdlZW4pIHtcbiAgICAgICAgICB0d2VlbnMgJiYgYS5wdXNoKGNoaWxkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aW1lbGluZXMgJiYgYS5wdXNoKGNoaWxkKTtcbiAgICAgICAgICBuZXN0ZWQgJiYgYS5wdXNoLmFwcGx5KGEsIGNoaWxkLmdldENoaWxkcmVuKHRydWUsIHR3ZWVucywgdGltZWxpbmVzKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY2hpbGQgPSBjaGlsZC5fbmV4dDtcbiAgICB9XG5cbiAgICByZXR1cm4gYTtcbiAgfTtcblxuICBfcHJvdG8yLmdldEJ5SWQgPSBmdW5jdGlvbiBnZXRCeUlkKGlkKSB7XG4gICAgdmFyIGFuaW1hdGlvbnMgPSB0aGlzLmdldENoaWxkcmVuKDEsIDEsIDEpLFxuICAgICAgICBpID0gYW5pbWF0aW9ucy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZiAoYW5pbWF0aW9uc1tpXS52YXJzLmlkID09PSBpZCkge1xuICAgICAgICByZXR1cm4gYW5pbWF0aW9uc1tpXTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvMi5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoY2hpbGQpIHtcbiAgICBpZiAoX2lzU3RyaW5nKGNoaWxkKSkge1xuICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlTGFiZWwoY2hpbGQpO1xuICAgIH1cblxuICAgIGlmIChfaXNGdW5jdGlvbihjaGlsZCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmtpbGxUd2VlbnNPZihjaGlsZCk7XG4gICAgfVxuXG4gICAgX3JlbW92ZUxpbmtlZExpc3RJdGVtKHRoaXMsIGNoaWxkKTtcblxuICAgIGlmIChjaGlsZCA9PT0gdGhpcy5fcmVjZW50KSB7XG4gICAgICB0aGlzLl9yZWNlbnQgPSB0aGlzLl9sYXN0O1xuICAgIH1cblxuICAgIHJldHVybiBfdW5jYWNoZSh0aGlzKTtcbiAgfTtcblxuICBfcHJvdG8yLnRvdGFsVGltZSA9IGZ1bmN0aW9uIHRvdGFsVGltZShfdG90YWxUaW1lMiwgc3VwcHJlc3NFdmVudHMpIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLl90VGltZTtcbiAgICB9XG5cbiAgICB0aGlzLl9mb3JjaW5nID0gMTtcblxuICAgIGlmICghdGhpcy5fZHAgJiYgdGhpcy5fdHMpIHtcbiAgICAgIC8vc3BlY2lhbCBjYXNlIGZvciB0aGUgZ2xvYmFsIHRpbWVsaW5lIChvciBhbnkgb3RoZXIgdGhhdCBoYXMgbm8gcGFyZW50IG9yIGRldGFjaGVkIHBhcmVudCkuXG4gICAgICB0aGlzLl9zdGFydCA9IF9yb3VuZFByZWNpc2UoX3RpY2tlci50aW1lIC0gKHRoaXMuX3RzID4gMCA/IF90b3RhbFRpbWUyIC8gdGhpcy5fdHMgOiAodGhpcy50b3RhbER1cmF0aW9uKCkgLSBfdG90YWxUaW1lMikgLyAtdGhpcy5fdHMpKTtcbiAgICB9XG5cbiAgICBfQW5pbWF0aW9uLnByb3RvdHlwZS50b3RhbFRpbWUuY2FsbCh0aGlzLCBfdG90YWxUaW1lMiwgc3VwcHJlc3NFdmVudHMpO1xuXG4gICAgdGhpcy5fZm9yY2luZyA9IDA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvMi5hZGRMYWJlbCA9IGZ1bmN0aW9uIGFkZExhYmVsKGxhYmVsLCBwb3NpdGlvbikge1xuICAgIHRoaXMubGFiZWxzW2xhYmVsXSA9IF9wYXJzZVBvc2l0aW9uKHRoaXMsIHBvc2l0aW9uKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8yLnJlbW92ZUxhYmVsID0gZnVuY3Rpb24gcmVtb3ZlTGFiZWwobGFiZWwpIHtcbiAgICBkZWxldGUgdGhpcy5sYWJlbHNbbGFiZWxdO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90bzIuYWRkUGF1c2UgPSBmdW5jdGlvbiBhZGRQYXVzZShwb3NpdGlvbiwgY2FsbGJhY2ssIHBhcmFtcykge1xuICAgIHZhciB0ID0gVHdlZW4uZGVsYXllZENhbGwoMCwgY2FsbGJhY2sgfHwgX2VtcHR5RnVuYywgcGFyYW1zKTtcbiAgICB0LmRhdGEgPSBcImlzUGF1c2VcIjtcbiAgICB0aGlzLl9oYXNQYXVzZSA9IDE7XG4gICAgcmV0dXJuIF9hZGRUb1RpbWVsaW5lKHRoaXMsIHQsIF9wYXJzZVBvc2l0aW9uKHRoaXMsIHBvc2l0aW9uKSk7XG4gIH07XG5cbiAgX3Byb3RvMi5yZW1vdmVQYXVzZSA9IGZ1bmN0aW9uIHJlbW92ZVBhdXNlKHBvc2l0aW9uKSB7XG4gICAgdmFyIGNoaWxkID0gdGhpcy5fZmlyc3Q7XG4gICAgcG9zaXRpb24gPSBfcGFyc2VQb3NpdGlvbih0aGlzLCBwb3NpdGlvbik7XG5cbiAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgIGlmIChjaGlsZC5fc3RhcnQgPT09IHBvc2l0aW9uICYmIGNoaWxkLmRhdGEgPT09IFwiaXNQYXVzZVwiKSB7XG4gICAgICAgIF9yZW1vdmVGcm9tUGFyZW50KGNoaWxkKTtcbiAgICAgIH1cblxuICAgICAgY2hpbGQgPSBjaGlsZC5fbmV4dDtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvMi5raWxsVHdlZW5zT2YgPSBmdW5jdGlvbiBraWxsVHdlZW5zT2YodGFyZ2V0cywgcHJvcHMsIG9ubHlBY3RpdmUpIHtcbiAgICB2YXIgdHdlZW5zID0gdGhpcy5nZXRUd2VlbnNPZih0YXJnZXRzLCBvbmx5QWN0aXZlKSxcbiAgICAgICAgaSA9IHR3ZWVucy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBfb3ZlcndyaXRpbmdUd2VlbiAhPT0gdHdlZW5zW2ldICYmIHR3ZWVuc1tpXS5raWxsKHRhcmdldHMsIHByb3BzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8yLmdldFR3ZWVuc09mID0gZnVuY3Rpb24gZ2V0VHdlZW5zT2YodGFyZ2V0cywgb25seUFjdGl2ZSkge1xuICAgIHZhciBhID0gW10sXG4gICAgICAgIHBhcnNlZFRhcmdldHMgPSB0b0FycmF5KHRhcmdldHMpLFxuICAgICAgICBjaGlsZCA9IHRoaXMuX2ZpcnN0LFxuICAgICAgICBpc0dsb2JhbFRpbWUgPSBfaXNOdW1iZXIob25seUFjdGl2ZSksXG4gICAgICAgIC8vIGEgbnVtYmVyIGlzIGludGVycHJldGVkIGFzIGEgZ2xvYmFsIHRpbWUuIElmIHRoZSBhbmltYXRpb24gc3BhbnNcbiAgICBjaGlsZHJlbjtcblxuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgVHdlZW4pIHtcbiAgICAgICAgaWYgKF9hcnJheUNvbnRhaW5zQW55KGNoaWxkLl90YXJnZXRzLCBwYXJzZWRUYXJnZXRzKSAmJiAoaXNHbG9iYWxUaW1lID8gKCFfb3ZlcndyaXRpbmdUd2VlbiB8fCBjaGlsZC5faW5pdHRlZCAmJiBjaGlsZC5fdHMpICYmIGNoaWxkLmdsb2JhbFRpbWUoMCkgPD0gb25seUFjdGl2ZSAmJiBjaGlsZC5nbG9iYWxUaW1lKGNoaWxkLnRvdGFsRHVyYXRpb24oKSkgPiBvbmx5QWN0aXZlIDogIW9ubHlBY3RpdmUgfHwgY2hpbGQuaXNBY3RpdmUoKSkpIHtcbiAgICAgICAgICAvLyBub3RlOiBpZiB0aGlzIGlzIGZvciBvdmVyd3JpdGluZywgaXQgc2hvdWxkIG9ubHkgYmUgZm9yIHR3ZWVucyB0aGF0IGFyZW4ndCBwYXVzZWQgYW5kIGFyZSBpbml0dGVkLlxuICAgICAgICAgIGEucHVzaChjaGlsZCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoKGNoaWxkcmVuID0gY2hpbGQuZ2V0VHdlZW5zT2YocGFyc2VkVGFyZ2V0cywgb25seUFjdGl2ZSkpLmxlbmd0aCkge1xuICAgICAgICBhLnB1c2guYXBwbHkoYSwgY2hpbGRyZW4pO1xuICAgICAgfVxuXG4gICAgICBjaGlsZCA9IGNoaWxkLl9uZXh0O1xuICAgIH1cblxuICAgIHJldHVybiBhO1xuICB9IC8vIHBvdGVudGlhbCBmdXR1cmUgZmVhdHVyZSAtIHRhcmdldHMoKSBvbiB0aW1lbGluZXNcbiAgLy8gdGFyZ2V0cygpIHtcbiAgLy8gXHRsZXQgcmVzdWx0ID0gW107XG4gIC8vIFx0dGhpcy5nZXRDaGlsZHJlbih0cnVlLCB0cnVlLCBmYWxzZSkuZm9yRWFjaCh0ID0+IHJlc3VsdC5wdXNoKC4uLnQudGFyZ2V0cygpKSk7XG4gIC8vIFx0cmV0dXJuIHJlc3VsdC5maWx0ZXIoKHYsIGkpID0+IHJlc3VsdC5pbmRleE9mKHYpID09PSBpKTtcbiAgLy8gfVxuICA7XG5cbiAgX3Byb3RvMi50d2VlblRvID0gZnVuY3Rpb24gdHdlZW5Ubyhwb3NpdGlvbiwgdmFycykge1xuICAgIHZhcnMgPSB2YXJzIHx8IHt9O1xuXG4gICAgdmFyIHRsID0gdGhpcyxcbiAgICAgICAgZW5kVGltZSA9IF9wYXJzZVBvc2l0aW9uKHRsLCBwb3NpdGlvbiksXG4gICAgICAgIF92YXJzID0gdmFycyxcbiAgICAgICAgc3RhcnRBdCA9IF92YXJzLnN0YXJ0QXQsXG4gICAgICAgIF9vblN0YXJ0ID0gX3ZhcnMub25TdGFydCxcbiAgICAgICAgb25TdGFydFBhcmFtcyA9IF92YXJzLm9uU3RhcnRQYXJhbXMsXG4gICAgICAgIGltbWVkaWF0ZVJlbmRlciA9IF92YXJzLmltbWVkaWF0ZVJlbmRlcixcbiAgICAgICAgaW5pdHRlZCxcbiAgICAgICAgdHdlZW4gPSBUd2Vlbi50byh0bCwgX3NldERlZmF1bHRzKHtcbiAgICAgIGVhc2U6IHZhcnMuZWFzZSB8fCBcIm5vbmVcIixcbiAgICAgIGxhenk6IGZhbHNlLFxuICAgICAgaW1tZWRpYXRlUmVuZGVyOiBmYWxzZSxcbiAgICAgIHRpbWU6IGVuZFRpbWUsXG4gICAgICBvdmVyd3JpdGU6IFwiYXV0b1wiLFxuICAgICAgZHVyYXRpb246IHZhcnMuZHVyYXRpb24gfHwgTWF0aC5hYnMoKGVuZFRpbWUgLSAoc3RhcnRBdCAmJiBcInRpbWVcIiBpbiBzdGFydEF0ID8gc3RhcnRBdC50aW1lIDogdGwuX3RpbWUpKSAvIHRsLnRpbWVTY2FsZSgpKSB8fCBfdGlueU51bSxcbiAgICAgIG9uU3RhcnQ6IGZ1bmN0aW9uIG9uU3RhcnQoKSB7XG4gICAgICAgIHRsLnBhdXNlKCk7XG5cbiAgICAgICAgaWYgKCFpbml0dGVkKSB7XG4gICAgICAgICAgdmFyIGR1cmF0aW9uID0gdmFycy5kdXJhdGlvbiB8fCBNYXRoLmFicygoZW5kVGltZSAtIChzdGFydEF0ICYmIFwidGltZVwiIGluIHN0YXJ0QXQgPyBzdGFydEF0LnRpbWUgOiB0bC5fdGltZSkpIC8gdGwudGltZVNjYWxlKCkpO1xuICAgICAgICAgIHR3ZWVuLl9kdXIgIT09IGR1cmF0aW9uICYmIF9zZXREdXJhdGlvbih0d2VlbiwgZHVyYXRpb24sIDAsIDEpLnJlbmRlcih0d2Vlbi5fdGltZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgaW5pdHRlZCA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBfb25TdGFydCAmJiBfb25TdGFydC5hcHBseSh0d2Vlbiwgb25TdGFydFBhcmFtcyB8fCBbXSk7IC8vaW4gY2FzZSB0aGUgdXNlciBoYWQgYW4gb25TdGFydCBpbiB0aGUgdmFycyAtIHdlIGRvbid0IHdhbnQgdG8gb3ZlcndyaXRlIGl0LlxuICAgICAgfVxuICAgIH0sIHZhcnMpKTtcblxuICAgIHJldHVybiBpbW1lZGlhdGVSZW5kZXIgPyB0d2Vlbi5yZW5kZXIoMCkgOiB0d2VlbjtcbiAgfTtcblxuICBfcHJvdG8yLnR3ZWVuRnJvbVRvID0gZnVuY3Rpb24gdHdlZW5Gcm9tVG8oZnJvbVBvc2l0aW9uLCB0b1Bvc2l0aW9uLCB2YXJzKSB7XG4gICAgcmV0dXJuIHRoaXMudHdlZW5Ubyh0b1Bvc2l0aW9uLCBfc2V0RGVmYXVsdHMoe1xuICAgICAgc3RhcnRBdDoge1xuICAgICAgICB0aW1lOiBfcGFyc2VQb3NpdGlvbih0aGlzLCBmcm9tUG9zaXRpb24pXG4gICAgICB9XG4gICAgfSwgdmFycykpO1xuICB9O1xuXG4gIF9wcm90bzIucmVjZW50ID0gZnVuY3Rpb24gcmVjZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9yZWNlbnQ7XG4gIH07XG5cbiAgX3Byb3RvMi5uZXh0TGFiZWwgPSBmdW5jdGlvbiBuZXh0TGFiZWwoYWZ0ZXJUaW1lKSB7XG4gICAgaWYgKGFmdGVyVGltZSA9PT0gdm9pZCAwKSB7XG4gICAgICBhZnRlclRpbWUgPSB0aGlzLl90aW1lO1xuICAgIH1cblxuICAgIHJldHVybiBfZ2V0TGFiZWxJbkRpcmVjdGlvbih0aGlzLCBfcGFyc2VQb3NpdGlvbih0aGlzLCBhZnRlclRpbWUpKTtcbiAgfTtcblxuICBfcHJvdG8yLnByZXZpb3VzTGFiZWwgPSBmdW5jdGlvbiBwcmV2aW91c0xhYmVsKGJlZm9yZVRpbWUpIHtcbiAgICBpZiAoYmVmb3JlVGltZSA9PT0gdm9pZCAwKSB7XG4gICAgICBiZWZvcmVUaW1lID0gdGhpcy5fdGltZTtcbiAgICB9XG5cbiAgICByZXR1cm4gX2dldExhYmVsSW5EaXJlY3Rpb24odGhpcywgX3BhcnNlUG9zaXRpb24odGhpcywgYmVmb3JlVGltZSksIDEpO1xuICB9O1xuXG4gIF9wcm90bzIuY3VycmVudExhYmVsID0gZnVuY3Rpb24gY3VycmVudExhYmVsKHZhbHVlKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyB0aGlzLnNlZWsodmFsdWUsIHRydWUpIDogdGhpcy5wcmV2aW91c0xhYmVsKHRoaXMuX3RpbWUgKyBfdGlueU51bSk7XG4gIH07XG5cbiAgX3Byb3RvMi5zaGlmdENoaWxkcmVuID0gZnVuY3Rpb24gc2hpZnRDaGlsZHJlbihhbW91bnQsIGFkanVzdExhYmVscywgaWdub3JlQmVmb3JlVGltZSkge1xuICAgIGlmIChpZ25vcmVCZWZvcmVUaW1lID09PSB2b2lkIDApIHtcbiAgICAgIGlnbm9yZUJlZm9yZVRpbWUgPSAwO1xuICAgIH1cblxuICAgIHZhciBjaGlsZCA9IHRoaXMuX2ZpcnN0LFxuICAgICAgICBsYWJlbHMgPSB0aGlzLmxhYmVscyxcbiAgICAgICAgcDtcblxuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgaWYgKGNoaWxkLl9zdGFydCA+PSBpZ25vcmVCZWZvcmVUaW1lKSB7XG4gICAgICAgIGNoaWxkLl9zdGFydCArPSBhbW91bnQ7XG4gICAgICAgIGNoaWxkLl9lbmQgKz0gYW1vdW50O1xuICAgICAgfVxuXG4gICAgICBjaGlsZCA9IGNoaWxkLl9uZXh0O1xuICAgIH1cblxuICAgIGlmIChhZGp1c3RMYWJlbHMpIHtcbiAgICAgIGZvciAocCBpbiBsYWJlbHMpIHtcbiAgICAgICAgaWYgKGxhYmVsc1twXSA+PSBpZ25vcmVCZWZvcmVUaW1lKSB7XG4gICAgICAgICAgbGFiZWxzW3BdICs9IGFtb3VudDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBfdW5jYWNoZSh0aGlzKTtcbiAgfTtcblxuICBfcHJvdG8yLmludmFsaWRhdGUgPSBmdW5jdGlvbiBpbnZhbGlkYXRlKHNvZnQpIHtcbiAgICB2YXIgY2hpbGQgPSB0aGlzLl9maXJzdDtcbiAgICB0aGlzLl9sb2NrID0gMDtcblxuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgY2hpbGQuaW52YWxpZGF0ZShzb2Z0KTtcbiAgICAgIGNoaWxkID0gY2hpbGQuX25leHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIF9BbmltYXRpb24ucHJvdG90eXBlLmludmFsaWRhdGUuY2FsbCh0aGlzLCBzb2Z0KTtcbiAgfTtcblxuICBfcHJvdG8yLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoaW5jbHVkZUxhYmVscykge1xuICAgIGlmIChpbmNsdWRlTGFiZWxzID09PSB2b2lkIDApIHtcbiAgICAgIGluY2x1ZGVMYWJlbHMgPSB0cnVlO1xuICAgIH1cblxuICAgIHZhciBjaGlsZCA9IHRoaXMuX2ZpcnN0LFxuICAgICAgICBuZXh0O1xuXG4gICAgd2hpbGUgKGNoaWxkKSB7XG4gICAgICBuZXh0ID0gY2hpbGQuX25leHQ7XG4gICAgICB0aGlzLnJlbW92ZShjaGlsZCk7XG4gICAgICBjaGlsZCA9IG5leHQ7XG4gICAgfVxuXG4gICAgdGhpcy5fZHAgJiYgKHRoaXMuX3RpbWUgPSB0aGlzLl90VGltZSA9IHRoaXMuX3BUaW1lID0gMCk7XG4gICAgaW5jbHVkZUxhYmVscyAmJiAodGhpcy5sYWJlbHMgPSB7fSk7XG4gICAgcmV0dXJuIF91bmNhY2hlKHRoaXMpO1xuICB9O1xuXG4gIF9wcm90bzIudG90YWxEdXJhdGlvbiA9IGZ1bmN0aW9uIHRvdGFsRHVyYXRpb24odmFsdWUpIHtcbiAgICB2YXIgbWF4ID0gMCxcbiAgICAgICAgc2VsZiA9IHRoaXMsXG4gICAgICAgIGNoaWxkID0gc2VsZi5fbGFzdCxcbiAgICAgICAgcHJldlN0YXJ0ID0gX2JpZ051bSxcbiAgICAgICAgcHJldixcbiAgICAgICAgc3RhcnQsXG4gICAgICAgIHBhcmVudDtcblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gc2VsZi50aW1lU2NhbGUoKHNlbGYuX3JlcGVhdCA8IDAgPyBzZWxmLmR1cmF0aW9uKCkgOiBzZWxmLnRvdGFsRHVyYXRpb24oKSkgLyAoc2VsZi5yZXZlcnNlZCgpID8gLXZhbHVlIDogdmFsdWUpKTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZi5fZGlydHkpIHtcbiAgICAgIHBhcmVudCA9IHNlbGYucGFyZW50O1xuXG4gICAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgICAgcHJldiA9IGNoaWxkLl9wcmV2OyAvL3JlY29yZCBpdCBoZXJlIGluIGNhc2UgdGhlIHR3ZWVuIGNoYW5nZXMgcG9zaXRpb24gaW4gdGhlIHNlcXVlbmNlLi4uXG5cbiAgICAgICAgY2hpbGQuX2RpcnR5ICYmIGNoaWxkLnRvdGFsRHVyYXRpb24oKTsgLy9jb3VsZCBjaGFuZ2UgdGhlIHR3ZWVuLl9zdGFydFRpbWUsIHNvIG1ha2Ugc3VyZSB0aGUgYW5pbWF0aW9uJ3MgY2FjaGUgaXMgY2xlYW4gYmVmb3JlIGFuYWx5emluZyBpdC5cblxuICAgICAgICBzdGFydCA9IGNoaWxkLl9zdGFydDtcblxuICAgICAgICBpZiAoc3RhcnQgPiBwcmV2U3RhcnQgJiYgc2VsZi5fc29ydCAmJiBjaGlsZC5fdHMgJiYgIXNlbGYuX2xvY2spIHtcbiAgICAgICAgICAvL2luIGNhc2Ugb25lIG9mIHRoZSB0d2VlbnMgc2hpZnRlZCBvdXQgb2Ygb3JkZXIsIGl0IG5lZWRzIHRvIGJlIHJlLWluc2VydGVkIGludG8gdGhlIGNvcnJlY3QgcG9zaXRpb24gaW4gdGhlIHNlcXVlbmNlXG4gICAgICAgICAgc2VsZi5fbG9jayA9IDE7IC8vcHJldmVudCBlbmRsZXNzIHJlY3Vyc2l2ZSBjYWxscyAtIHRoZXJlIGFyZSBtZXRob2RzIHRoYXQgZ2V0IHRyaWdnZXJlZCB0aGF0IGNoZWNrIGR1cmF0aW9uL3RvdGFsRHVyYXRpb24gd2hlbiB3ZSBhZGQoKS5cblxuICAgICAgICAgIF9hZGRUb1RpbWVsaW5lKHNlbGYsIGNoaWxkLCBzdGFydCAtIGNoaWxkLl9kZWxheSwgMSkuX2xvY2sgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByZXZTdGFydCA9IHN0YXJ0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXJ0IDwgMCAmJiBjaGlsZC5fdHMpIHtcbiAgICAgICAgICAvL2NoaWxkcmVuIGFyZW4ndCBhbGxvd2VkIHRvIGhhdmUgbmVnYXRpdmUgc3RhcnRUaW1lcyB1bmxlc3Mgc21vb3RoQ2hpbGRUaW1pbmcgaXMgdHJ1ZSwgc28gYWRqdXN0IGhlcmUgaWYgb25lIGlzIGZvdW5kLlxuICAgICAgICAgIG1heCAtPSBzdGFydDtcblxuICAgICAgICAgIGlmICghcGFyZW50ICYmICFzZWxmLl9kcCB8fCBwYXJlbnQgJiYgcGFyZW50LnNtb290aENoaWxkVGltaW5nKSB7XG4gICAgICAgICAgICBzZWxmLl9zdGFydCArPSBzdGFydCAvIHNlbGYuX3RzO1xuICAgICAgICAgICAgc2VsZi5fdGltZSAtPSBzdGFydDtcbiAgICAgICAgICAgIHNlbGYuX3RUaW1lIC09IHN0YXJ0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNlbGYuc2hpZnRDaGlsZHJlbigtc3RhcnQsIGZhbHNlLCAtMWU5OTkpO1xuICAgICAgICAgIHByZXZTdGFydCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBjaGlsZC5fZW5kID4gbWF4ICYmIGNoaWxkLl90cyAmJiAobWF4ID0gY2hpbGQuX2VuZCk7XG4gICAgICAgIGNoaWxkID0gcHJldjtcbiAgICAgIH1cblxuICAgICAgX3NldER1cmF0aW9uKHNlbGYsIHNlbGYgPT09IF9nbG9iYWxUaW1lbGluZSAmJiBzZWxmLl90aW1lID4gbWF4ID8gc2VsZi5fdGltZSA6IG1heCwgMSwgMSk7XG5cbiAgICAgIHNlbGYuX2RpcnR5ID0gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZi5fdER1cjtcbiAgfTtcblxuICBUaW1lbGluZS51cGRhdGVSb290ID0gZnVuY3Rpb24gdXBkYXRlUm9vdCh0aW1lKSB7XG4gICAgaWYgKF9nbG9iYWxUaW1lbGluZS5fdHMpIHtcbiAgICAgIF9sYXp5U2FmZVJlbmRlcihfZ2xvYmFsVGltZWxpbmUsIF9wYXJlbnRUb0NoaWxkVG90YWxUaW1lKHRpbWUsIF9nbG9iYWxUaW1lbGluZSkpO1xuXG4gICAgICBfbGFzdFJlbmRlcmVkRnJhbWUgPSBfdGlja2VyLmZyYW1lO1xuICAgIH1cblxuICAgIGlmIChfdGlja2VyLmZyYW1lID49IF9uZXh0R0NGcmFtZSkge1xuICAgICAgX25leHRHQ0ZyYW1lICs9IF9jb25maWcuYXV0b1NsZWVwIHx8IDEyMDtcbiAgICAgIHZhciBjaGlsZCA9IF9nbG9iYWxUaW1lbGluZS5fZmlyc3Q7XG4gICAgICBpZiAoIWNoaWxkIHx8ICFjaGlsZC5fdHMpIGlmIChfY29uZmlnLmF1dG9TbGVlcCAmJiBfdGlja2VyLl9saXN0ZW5lcnMubGVuZ3RoIDwgMikge1xuICAgICAgICB3aGlsZSAoY2hpbGQgJiYgIWNoaWxkLl90cykge1xuICAgICAgICAgIGNoaWxkID0gY2hpbGQuX25leHQ7XG4gICAgICAgIH1cblxuICAgICAgICBjaGlsZCB8fCBfdGlja2VyLnNsZWVwKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBUaW1lbGluZTtcbn0oQW5pbWF0aW9uKTtcblxuX3NldERlZmF1bHRzKFRpbWVsaW5lLnByb3RvdHlwZSwge1xuICBfbG9jazogMCxcbiAgX2hhc1BhdXNlOiAwLFxuICBfZm9yY2luZzogMFxufSk7XG5cbnZhciBfYWRkQ29tcGxleFN0cmluZ1Byb3BUd2VlbiA9IGZ1bmN0aW9uIF9hZGRDb21wbGV4U3RyaW5nUHJvcFR3ZWVuKHRhcmdldCwgcHJvcCwgc3RhcnQsIGVuZCwgc2V0dGVyLCBzdHJpbmdGaWx0ZXIsIGZ1bmNQYXJhbSkge1xuICAvL25vdGU6IHdlIGNhbGwgX2FkZENvbXBsZXhTdHJpbmdQcm9wVHdlZW4uY2FsbCh0d2Vlbkluc3RhbmNlLi4uKSB0byBlbnN1cmUgdGhhdCBpdCdzIHNjb3BlZCBwcm9wZXJseS4gV2UgbWF5IGNhbGwgaXQgZnJvbSB3aXRoaW4gYSBwbHVnaW4gdG9vLCB0aHVzIFwidGhpc1wiIHdvdWxkIHJlZmVyIHRvIHRoZSBwbHVnaW4uXG4gIHZhciBwdCA9IG5ldyBQcm9wVHdlZW4odGhpcy5fcHQsIHRhcmdldCwgcHJvcCwgMCwgMSwgX3JlbmRlckNvbXBsZXhTdHJpbmcsIG51bGwsIHNldHRlciksXG4gICAgICBpbmRleCA9IDAsXG4gICAgICBtYXRjaEluZGV4ID0gMCxcbiAgICAgIHJlc3VsdCxcbiAgICAgIHN0YXJ0TnVtcyxcbiAgICAgIGNvbG9yLFxuICAgICAgZW5kTnVtLFxuICAgICAgY2h1bmssXG4gICAgICBzdGFydE51bSxcbiAgICAgIGhhc1JhbmRvbSxcbiAgICAgIGE7XG4gIHB0LmIgPSBzdGFydDtcbiAgcHQuZSA9IGVuZDtcbiAgc3RhcnQgKz0gXCJcIjsgLy9lbnN1cmUgdmFsdWVzIGFyZSBzdHJpbmdzXG5cbiAgZW5kICs9IFwiXCI7XG5cbiAgaWYgKGhhc1JhbmRvbSA9IH5lbmQuaW5kZXhPZihcInJhbmRvbShcIikpIHtcbiAgICBlbmQgPSBfcmVwbGFjZVJhbmRvbShlbmQpO1xuICB9XG5cbiAgaWYgKHN0cmluZ0ZpbHRlcikge1xuICAgIGEgPSBbc3RhcnQsIGVuZF07XG4gICAgc3RyaW5nRmlsdGVyKGEsIHRhcmdldCwgcHJvcCk7IC8vcGFzcyBhbiBhcnJheSB3aXRoIHRoZSBzdGFydGluZyBhbmQgZW5kaW5nIHZhbHVlcyBhbmQgbGV0IHRoZSBmaWx0ZXIgZG8gd2hhdGV2ZXIgaXQgbmVlZHMgdG8gdGhlIHZhbHVlcy5cblxuICAgIHN0YXJ0ID0gYVswXTtcbiAgICBlbmQgPSBhWzFdO1xuICB9XG5cbiAgc3RhcnROdW1zID0gc3RhcnQubWF0Y2goX2NvbXBsZXhTdHJpbmdOdW1FeHApIHx8IFtdO1xuXG4gIHdoaWxlIChyZXN1bHQgPSBfY29tcGxleFN0cmluZ051bUV4cC5leGVjKGVuZCkpIHtcbiAgICBlbmROdW0gPSByZXN1bHRbMF07XG4gICAgY2h1bmsgPSBlbmQuc3Vic3RyaW5nKGluZGV4LCByZXN1bHQuaW5kZXgpO1xuXG4gICAgaWYgKGNvbG9yKSB7XG4gICAgICBjb2xvciA9IChjb2xvciArIDEpICUgNTtcbiAgICB9IGVsc2UgaWYgKGNodW5rLnN1YnN0cigtNSkgPT09IFwicmdiYShcIikge1xuICAgICAgY29sb3IgPSAxO1xuICAgIH1cblxuICAgIGlmIChlbmROdW0gIT09IHN0YXJ0TnVtc1ttYXRjaEluZGV4KytdKSB7XG4gICAgICBzdGFydE51bSA9IHBhcnNlRmxvYXQoc3RhcnROdW1zW21hdGNoSW5kZXggLSAxXSkgfHwgMDsgLy90aGVzZSBuZXN0ZWQgUHJvcFR3ZWVucyBhcmUgaGFuZGxlZCBpbiBhIHNwZWNpYWwgd2F5IC0gd2UnbGwgbmV2ZXIgYWN0dWFsbHkgY2FsbCBhIHJlbmRlciBvciBzZXR0ZXIgbWV0aG9kIG9uIHRoZW0uIFdlJ2xsIGp1c3QgbG9vcCB0aHJvdWdoIHRoZW0gaW4gdGhlIHBhcmVudCBjb21wbGV4IHN0cmluZyBQcm9wVHdlZW4ncyByZW5kZXIgbWV0aG9kLlxuXG4gICAgICBwdC5fcHQgPSB7XG4gICAgICAgIF9uZXh0OiBwdC5fcHQsXG4gICAgICAgIHA6IGNodW5rIHx8IG1hdGNoSW5kZXggPT09IDEgPyBjaHVuayA6IFwiLFwiLFxuICAgICAgICAvL25vdGU6IFNWRyBzcGVjIGFsbG93cyBvbWlzc2lvbiBvZiBjb21tYS9zcGFjZSB3aGVuIGEgbmVnYXRpdmUgc2lnbiBpcyB3ZWRnZWQgYmV0d2VlbiB0d28gbnVtYmVycywgbGlrZSAyLjUtNS4zIGluc3RlYWQgb2YgMi41LC01LjMgYnV0IHdoZW4gdHdlZW5pbmcsIHRoZSBuZWdhdGl2ZSB2YWx1ZSBtYXkgc3dpdGNoIHRvIHBvc2l0aXZlLCBzbyB3ZSBpbnNlcnQgdGhlIGNvbW1hIGp1c3QgaW4gY2FzZS5cbiAgICAgICAgczogc3RhcnROdW0sXG4gICAgICAgIGM6IGVuZE51bS5jaGFyQXQoMSkgPT09IFwiPVwiID8gX3BhcnNlUmVsYXRpdmUoc3RhcnROdW0sIGVuZE51bSkgLSBzdGFydE51bSA6IHBhcnNlRmxvYXQoZW5kTnVtKSAtIHN0YXJ0TnVtLFxuICAgICAgICBtOiBjb2xvciAmJiBjb2xvciA8IDQgPyBNYXRoLnJvdW5kIDogMFxuICAgICAgfTtcbiAgICAgIGluZGV4ID0gX2NvbXBsZXhTdHJpbmdOdW1FeHAubGFzdEluZGV4O1xuICAgIH1cbiAgfVxuXG4gIHB0LmMgPSBpbmRleCA8IGVuZC5sZW5ndGggPyBlbmQuc3Vic3RyaW5nKGluZGV4LCBlbmQubGVuZ3RoKSA6IFwiXCI7IC8vd2UgdXNlIHRoZSBcImNcIiBvZiB0aGUgUHJvcFR3ZWVuIHRvIHN0b3JlIHRoZSBmaW5hbCBwYXJ0IG9mIHRoZSBzdHJpbmcgKGFmdGVyIHRoZSBsYXN0IG51bWJlcilcblxuICBwdC5mcCA9IGZ1bmNQYXJhbTtcblxuICBpZiAoX3JlbEV4cC50ZXN0KGVuZCkgfHwgaGFzUmFuZG9tKSB7XG4gICAgcHQuZSA9IDA7IC8vaWYgdGhlIGVuZCBzdHJpbmcgY29udGFpbnMgcmVsYXRpdmUgdmFsdWVzIG9yIGR5bmFtaWMgcmFuZG9tKC4uLikgdmFsdWVzLCBkZWxldGUgdGhlIGVuZCBpdCBzbyB0aGF0IG9uIHRoZSBmaW5hbCByZW5kZXIgd2UgZG9uJ3QgYWN0dWFsbHkgc2V0IGl0IHRvIHRoZSBzdHJpbmcgd2l0aCArPSBvciAtPSBjaGFyYWN0ZXJzIChmb3JjZXMgaXQgdG8gdXNlIHRoZSBjYWxjdWxhdGVkIHZhbHVlKS5cbiAgfVxuXG4gIHRoaXMuX3B0ID0gcHQ7IC8vc3RhcnQgdGhlIGxpbmtlZCBsaXN0IHdpdGggdGhpcyBuZXcgUHJvcFR3ZWVuLiBSZW1lbWJlciwgd2UgY2FsbCBfYWRkQ29tcGxleFN0cmluZ1Byb3BUd2Vlbi5jYWxsKHR3ZWVuSW5zdGFuY2UuLi4pIHRvIGVuc3VyZSB0aGF0IGl0J3Mgc2NvcGVkIHByb3Blcmx5LiBXZSBtYXkgY2FsbCBpdCBmcm9tIHdpdGhpbiBhIHBsdWdpbiB0b28sIHRodXMgXCJ0aGlzXCIgd291bGQgcmVmZXIgdG8gdGhlIHBsdWdpbi5cblxuICByZXR1cm4gcHQ7XG59LFxuICAgIF9hZGRQcm9wVHdlZW4gPSBmdW5jdGlvbiBfYWRkUHJvcFR3ZWVuKHRhcmdldCwgcHJvcCwgc3RhcnQsIGVuZCwgaW5kZXgsIHRhcmdldHMsIG1vZGlmaWVyLCBzdHJpbmdGaWx0ZXIsIGZ1bmNQYXJhbSwgb3B0aW9uYWwpIHtcbiAgX2lzRnVuY3Rpb24oZW5kKSAmJiAoZW5kID0gZW5kKGluZGV4IHx8IDAsIHRhcmdldCwgdGFyZ2V0cykpO1xuICB2YXIgY3VycmVudFZhbHVlID0gdGFyZ2V0W3Byb3BdLFxuICAgICAgcGFyc2VkU3RhcnQgPSBzdGFydCAhPT0gXCJnZXRcIiA/IHN0YXJ0IDogIV9pc0Z1bmN0aW9uKGN1cnJlbnRWYWx1ZSkgPyBjdXJyZW50VmFsdWUgOiBmdW5jUGFyYW0gPyB0YXJnZXRbcHJvcC5pbmRleE9mKFwic2V0XCIpIHx8ICFfaXNGdW5jdGlvbih0YXJnZXRbXCJnZXRcIiArIHByb3Auc3Vic3RyKDMpXSkgPyBwcm9wIDogXCJnZXRcIiArIHByb3Auc3Vic3RyKDMpXShmdW5jUGFyYW0pIDogdGFyZ2V0W3Byb3BdKCksXG4gICAgICBzZXR0ZXIgPSAhX2lzRnVuY3Rpb24oY3VycmVudFZhbHVlKSA/IF9zZXR0ZXJQbGFpbiA6IGZ1bmNQYXJhbSA/IF9zZXR0ZXJGdW5jV2l0aFBhcmFtIDogX3NldHRlckZ1bmMsXG4gICAgICBwdDtcblxuICBpZiAoX2lzU3RyaW5nKGVuZCkpIHtcbiAgICBpZiAofmVuZC5pbmRleE9mKFwicmFuZG9tKFwiKSkge1xuICAgICAgZW5kID0gX3JlcGxhY2VSYW5kb20oZW5kKTtcbiAgICB9XG5cbiAgICBpZiAoZW5kLmNoYXJBdCgxKSA9PT0gXCI9XCIpIHtcbiAgICAgIHB0ID0gX3BhcnNlUmVsYXRpdmUocGFyc2VkU3RhcnQsIGVuZCkgKyAoZ2V0VW5pdChwYXJzZWRTdGFydCkgfHwgMCk7XG5cbiAgICAgIGlmIChwdCB8fCBwdCA9PT0gMCkge1xuICAgICAgICAvLyB0byBhdm9pZCBpc05hTiwgbGlrZSBpZiBzb21lb25lIHBhc3NlcyBpbiBhIHZhbHVlIGxpa2UgXCIhPSB3aGF0ZXZlclwiXG4gICAgICAgIGVuZCA9IHB0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmICghb3B0aW9uYWwgfHwgcGFyc2VkU3RhcnQgIT09IGVuZCB8fCBfZm9yY2VBbGxQcm9wVHdlZW5zKSB7XG4gICAgaWYgKCFpc05hTihwYXJzZWRTdGFydCAqIGVuZCkgJiYgZW5kICE9PSBcIlwiKSB7XG4gICAgICAvLyBmdW4gZmFjdDogYW55IG51bWJlciBtdWx0aXBsaWVkIGJ5IFwiXCIgaXMgZXZhbHVhdGVkIGFzIHRoZSBudW1iZXIgMCFcbiAgICAgIHB0ID0gbmV3IFByb3BUd2Vlbih0aGlzLl9wdCwgdGFyZ2V0LCBwcm9wLCArcGFyc2VkU3RhcnQgfHwgMCwgZW5kIC0gKHBhcnNlZFN0YXJ0IHx8IDApLCB0eXBlb2YgY3VycmVudFZhbHVlID09PSBcImJvb2xlYW5cIiA/IF9yZW5kZXJCb29sZWFuIDogX3JlbmRlclBsYWluLCAwLCBzZXR0ZXIpO1xuICAgICAgZnVuY1BhcmFtICYmIChwdC5mcCA9IGZ1bmNQYXJhbSk7XG4gICAgICBtb2RpZmllciAmJiBwdC5tb2RpZmllcihtb2RpZmllciwgdGhpcywgdGFyZ2V0KTtcbiAgICAgIHJldHVybiB0aGlzLl9wdCA9IHB0O1xuICAgIH1cblxuICAgICFjdXJyZW50VmFsdWUgJiYgIShwcm9wIGluIHRhcmdldCkgJiYgX21pc3NpbmdQbHVnaW4ocHJvcCwgZW5kKTtcbiAgICByZXR1cm4gX2FkZENvbXBsZXhTdHJpbmdQcm9wVHdlZW4uY2FsbCh0aGlzLCB0YXJnZXQsIHByb3AsIHBhcnNlZFN0YXJ0LCBlbmQsIHNldHRlciwgc3RyaW5nRmlsdGVyIHx8IF9jb25maWcuc3RyaW5nRmlsdGVyLCBmdW5jUGFyYW0pO1xuICB9XG59LFxuICAgIC8vY3JlYXRlcyBhIGNvcHkgb2YgdGhlIHZhcnMgb2JqZWN0IGFuZCBwcm9jZXNzZXMgYW55IGZ1bmN0aW9uLWJhc2VkIHZhbHVlcyAocHV0dGluZyB0aGUgcmVzdWx0aW5nIHZhbHVlcyBkaXJlY3RseSBpbnRvIHRoZSBjb3B5KSBhcyB3ZWxsIGFzIHN0cmluZ3Mgd2l0aCBcInJhbmRvbSgpXCIgaW4gdGhlbS4gSXQgZG9lcyBOT1QgcHJvY2VzcyByZWxhdGl2ZSB2YWx1ZXMuXG5fcHJvY2Vzc1ZhcnMgPSBmdW5jdGlvbiBfcHJvY2Vzc1ZhcnModmFycywgaW5kZXgsIHRhcmdldCwgdGFyZ2V0cywgdHdlZW4pIHtcbiAgX2lzRnVuY3Rpb24odmFycykgJiYgKHZhcnMgPSBfcGFyc2VGdW5jT3JTdHJpbmcodmFycywgdHdlZW4sIGluZGV4LCB0YXJnZXQsIHRhcmdldHMpKTtcblxuICBpZiAoIV9pc09iamVjdCh2YXJzKSB8fCB2YXJzLnN0eWxlICYmIHZhcnMubm9kZVR5cGUgfHwgX2lzQXJyYXkodmFycykgfHwgX2lzVHlwZWRBcnJheSh2YXJzKSkge1xuICAgIHJldHVybiBfaXNTdHJpbmcodmFycykgPyBfcGFyc2VGdW5jT3JTdHJpbmcodmFycywgdHdlZW4sIGluZGV4LCB0YXJnZXQsIHRhcmdldHMpIDogdmFycztcbiAgfVxuXG4gIHZhciBjb3B5ID0ge30sXG4gICAgICBwO1xuXG4gIGZvciAocCBpbiB2YXJzKSB7XG4gICAgY29weVtwXSA9IF9wYXJzZUZ1bmNPclN0cmluZyh2YXJzW3BdLCB0d2VlbiwgaW5kZXgsIHRhcmdldCwgdGFyZ2V0cyk7XG4gIH1cblxuICByZXR1cm4gY29weTtcbn0sXG4gICAgX2NoZWNrUGx1Z2luID0gZnVuY3Rpb24gX2NoZWNrUGx1Z2luKHByb3BlcnR5LCB2YXJzLCB0d2VlbiwgaW5kZXgsIHRhcmdldCwgdGFyZ2V0cykge1xuICB2YXIgcGx1Z2luLCBwdCwgcHRMb29rdXAsIGk7XG5cbiAgaWYgKF9wbHVnaW5zW3Byb3BlcnR5XSAmJiAocGx1Z2luID0gbmV3IF9wbHVnaW5zW3Byb3BlcnR5XSgpKS5pbml0KHRhcmdldCwgcGx1Z2luLnJhd1ZhcnMgPyB2YXJzW3Byb3BlcnR5XSA6IF9wcm9jZXNzVmFycyh2YXJzW3Byb3BlcnR5XSwgaW5kZXgsIHRhcmdldCwgdGFyZ2V0cywgdHdlZW4pLCB0d2VlbiwgaW5kZXgsIHRhcmdldHMpICE9PSBmYWxzZSkge1xuICAgIHR3ZWVuLl9wdCA9IHB0ID0gbmV3IFByb3BUd2Vlbih0d2Vlbi5fcHQsIHRhcmdldCwgcHJvcGVydHksIDAsIDEsIHBsdWdpbi5yZW5kZXIsIHBsdWdpbiwgMCwgcGx1Z2luLnByaW9yaXR5KTtcblxuICAgIGlmICh0d2VlbiAhPT0gX3F1aWNrVHdlZW4pIHtcbiAgICAgIHB0TG9va3VwID0gdHdlZW4uX3B0TG9va3VwW3R3ZWVuLl90YXJnZXRzLmluZGV4T2YodGFyZ2V0KV07IC8vbm90ZTogd2UgY2FuJ3QgdXNlIHR3ZWVuLl9wdExvb2t1cFtpbmRleF0gYmVjYXVzZSBmb3Igc3RhZ2dlcmVkIHR3ZWVucywgdGhlIGluZGV4IGZyb20gdGhlIGZ1bGxUYXJnZXRzIGFycmF5IHdvbid0IG1hdGNoIHdoYXQgaXQgaXMgaW4gZWFjaCBpbmRpdmlkdWFsIHR3ZWVuIHRoYXQgc3Bhd25zIGZyb20gdGhlIHN0YWdnZXIuXG5cbiAgICAgIGkgPSBwbHVnaW4uX3Byb3BzLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBwdExvb2t1cFtwbHVnaW4uX3Byb3BzW2ldXSA9IHB0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwbHVnaW47XG59LFxuICAgIF9vdmVyd3JpdGluZ1R3ZWVuLFxuICAgIC8vc3RvcmUgYSByZWZlcmVuY2UgdGVtcG9yYXJpbHkgc28gd2UgY2FuIGF2b2lkIG92ZXJ3cml0aW5nIGl0c2VsZi5cbl9mb3JjZUFsbFByb3BUd2VlbnMsXG4gICAgX2luaXRUd2VlbiA9IGZ1bmN0aW9uIF9pbml0VHdlZW4odHdlZW4sIHRpbWUsIHRUaW1lKSB7XG4gIHZhciB2YXJzID0gdHdlZW4udmFycyxcbiAgICAgIGVhc2UgPSB2YXJzLmVhc2UsXG4gICAgICBzdGFydEF0ID0gdmFycy5zdGFydEF0LFxuICAgICAgaW1tZWRpYXRlUmVuZGVyID0gdmFycy5pbW1lZGlhdGVSZW5kZXIsXG4gICAgICBsYXp5ID0gdmFycy5sYXp5LFxuICAgICAgb25VcGRhdGUgPSB2YXJzLm9uVXBkYXRlLFxuICAgICAgb25VcGRhdGVQYXJhbXMgPSB2YXJzLm9uVXBkYXRlUGFyYW1zLFxuICAgICAgY2FsbGJhY2tTY29wZSA9IHZhcnMuY2FsbGJhY2tTY29wZSxcbiAgICAgIHJ1bkJhY2t3YXJkcyA9IHZhcnMucnVuQmFja3dhcmRzLFxuICAgICAgeW95b0Vhc2UgPSB2YXJzLnlveW9FYXNlLFxuICAgICAga2V5ZnJhbWVzID0gdmFycy5rZXlmcmFtZXMsXG4gICAgICBhdXRvUmV2ZXJ0ID0gdmFycy5hdXRvUmV2ZXJ0LFxuICAgICAgZHVyID0gdHdlZW4uX2R1cixcbiAgICAgIHByZXZTdGFydEF0ID0gdHdlZW4uX3N0YXJ0QXQsXG4gICAgICB0YXJnZXRzID0gdHdlZW4uX3RhcmdldHMsXG4gICAgICBwYXJlbnQgPSB0d2Vlbi5wYXJlbnQsXG4gICAgICBmdWxsVGFyZ2V0cyA9IHBhcmVudCAmJiBwYXJlbnQuZGF0YSA9PT0gXCJuZXN0ZWRcIiA/IHBhcmVudC52YXJzLnRhcmdldHMgOiB0YXJnZXRzLFxuICAgICAgYXV0b092ZXJ3cml0ZSA9IHR3ZWVuLl9vdmVyd3JpdGUgPT09IFwiYXV0b1wiICYmICFfc3VwcHJlc3NPdmVyd3JpdGVzLFxuICAgICAgdGwgPSB0d2Vlbi50aW1lbGluZSxcbiAgICAgIGNsZWFuVmFycyxcbiAgICAgIGksXG4gICAgICBwLFxuICAgICAgcHQsXG4gICAgICB0YXJnZXQsXG4gICAgICBoYXNQcmlvcml0eSxcbiAgICAgIGdzRGF0YSxcbiAgICAgIGhhcm5lc3MsXG4gICAgICBwbHVnaW4sXG4gICAgICBwdExvb2t1cCxcbiAgICAgIGluZGV4LFxuICAgICAgaGFybmVzc1ZhcnMsXG4gICAgICBvdmVyd3JpdHRlbjtcbiAgdGwgJiYgKCFrZXlmcmFtZXMgfHwgIWVhc2UpICYmIChlYXNlID0gXCJub25lXCIpO1xuICB0d2Vlbi5fZWFzZSA9IF9wYXJzZUVhc2UoZWFzZSwgX2RlZmF1bHRzLmVhc2UpO1xuICB0d2Vlbi5feUVhc2UgPSB5b3lvRWFzZSA/IF9pbnZlcnRFYXNlKF9wYXJzZUVhc2UoeW95b0Vhc2UgPT09IHRydWUgPyBlYXNlIDogeW95b0Vhc2UsIF9kZWZhdWx0cy5lYXNlKSkgOiAwO1xuXG4gIGlmICh5b3lvRWFzZSAmJiB0d2Vlbi5feW95byAmJiAhdHdlZW4uX3JlcGVhdCkge1xuICAgIC8vdGhlcmUgbXVzdCBoYXZlIGJlZW4gYSBwYXJlbnQgdGltZWxpbmUgd2l0aCB5b3lvOnRydWUgdGhhdCBpcyBjdXJyZW50bHkgaW4gaXRzIHlveW8gcGhhc2UsIHNvIGZsaXAgdGhlIGVhc2VzLlxuICAgIHlveW9FYXNlID0gdHdlZW4uX3lFYXNlO1xuICAgIHR3ZWVuLl95RWFzZSA9IHR3ZWVuLl9lYXNlO1xuICAgIHR3ZWVuLl9lYXNlID0geW95b0Vhc2U7XG4gIH1cblxuICB0d2Vlbi5fZnJvbSA9ICF0bCAmJiAhIXZhcnMucnVuQmFja3dhcmRzOyAvL25lc3RlZCB0aW1lbGluZXMgc2hvdWxkIG5ldmVyIHJ1biBiYWNrd2FyZHMgLSB0aGUgYmFja3dhcmRzLW5lc3MgaXMgaW4gdGhlIGNoaWxkIHR3ZWVucy5cblxuICBpZiAoIXRsIHx8IGtleWZyYW1lcyAmJiAhdmFycy5zdGFnZ2VyKSB7XG4gICAgLy9pZiB0aGVyZSdzIGFuIGludGVybmFsIHRpbWVsaW5lLCBza2lwIGFsbCB0aGUgcGFyc2luZyBiZWNhdXNlIHdlIHBhc3NlZCB0aGF0IHRhc2sgZG93biB0aGUgY2hhaW4uXG4gICAgaGFybmVzcyA9IHRhcmdldHNbMF0gPyBfZ2V0Q2FjaGUodGFyZ2V0c1swXSkuaGFybmVzcyA6IDA7XG4gICAgaGFybmVzc1ZhcnMgPSBoYXJuZXNzICYmIHZhcnNbaGFybmVzcy5wcm9wXTsgLy9zb21lb25lIG1heSBuZWVkIHRvIHNwZWNpZnkgQ1NTLXNwZWNpZmljIHZhbHVlcyBBTkQgbm9uLUNTUyB2YWx1ZXMsIGxpa2UgaWYgdGhlIGVsZW1lbnQgaGFzIGFuIFwieFwiIHByb3BlcnR5IHBsdXMgaXQncyBhIHN0YW5kYXJkIERPTSBlbGVtZW50LiBXZSBhbGxvdyBwZW9wbGUgdG8gZGlzdGluZ3Vpc2ggYnkgd3JhcHBpbmcgcGx1Z2luLXNwZWNpZmljIHN0dWZmIGluIGEgY3NzOnt9IG9iamVjdCBmb3IgZXhhbXBsZS5cblxuICAgIGNsZWFuVmFycyA9IF9jb3B5RXhjbHVkaW5nKHZhcnMsIF9yZXNlcnZlZFByb3BzKTtcblxuICAgIGlmIChwcmV2U3RhcnRBdCkge1xuICAgICAgcHJldlN0YXJ0QXQuX3pUaW1lIDwgMCAmJiBwcmV2U3RhcnRBdC5wcm9ncmVzcygxKTsgLy8gaW4gY2FzZSBpdCdzIGEgbGF6eSBzdGFydEF0IHRoYXQgaGFzbid0IHJlbmRlcmVkIHlldC5cblxuICAgICAgdGltZSA8IDAgJiYgcnVuQmFja3dhcmRzICYmIGltbWVkaWF0ZVJlbmRlciAmJiAhYXV0b1JldmVydCA/IHByZXZTdGFydEF0LnJlbmRlcigtMSwgdHJ1ZSkgOiBwcmV2U3RhcnRBdC5yZXZlcnQocnVuQmFja3dhcmRzICYmIGR1ciA/IF9yZXZlcnRDb25maWdOb0tpbGwgOiBfc3RhcnRBdFJldmVydENvbmZpZyk7IC8vIGlmIGl0J3MgYSBcInN0YXJ0QXRcIiAobm90IFwiZnJvbSgpXCIgb3IgcnVuQmFja3dhcmRzOiB0cnVlKSwgd2Ugb25seSBuZWVkIHRvIGRvIGEgc2hhbGxvdyByZXZlcnQgKGtlZXAgdHJhbnNmb3JtcyBjYWNoZWQgaW4gQ1NTUGx1Z2luKVxuICAgICAgLy8gZG9uJ3QganVzdCBfcmVtb3ZlRnJvbVBhcmVudChwcmV2U3RhcnRBdC5yZW5kZXIoLTEsIHRydWUpKSBiZWNhdXNlIHRoYXQnbGwgbGVhdmUgaW5saW5lIHN0eWxlcy4gV2UncmUgY3JlYXRpbmcgYSBuZXcgX3N0YXJ0QXQgZm9yIFwic3RhcnRBdFwiIHR3ZWVucyB0aGF0IHJlLWNhcHR1cmUgdGhpbmdzIHRvIGVuc3VyZSB0aGF0IGlmIHRoZSBwcmUtdHdlZW4gdmFsdWVzIGNoYW5nZWQgc2luY2UgdGhlIHR3ZWVuIHdhcyBjcmVhdGVkLCB0aGV5J3JlIHJlY29yZGVkLlxuXG4gICAgICBwcmV2U3RhcnRBdC5fbGF6eSA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0QXQpIHtcbiAgICAgIF9yZW1vdmVGcm9tUGFyZW50KHR3ZWVuLl9zdGFydEF0ID0gVHdlZW4uc2V0KHRhcmdldHMsIF9zZXREZWZhdWx0cyh7XG4gICAgICAgIGRhdGE6IFwiaXNTdGFydFwiLFxuICAgICAgICBvdmVyd3JpdGU6IGZhbHNlLFxuICAgICAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICAgICAgaW1tZWRpYXRlUmVuZGVyOiB0cnVlLFxuICAgICAgICBsYXp5OiAhcHJldlN0YXJ0QXQgJiYgX2lzTm90RmFsc2UobGF6eSksXG4gICAgICAgIHN0YXJ0QXQ6IG51bGwsXG4gICAgICAgIGRlbGF5OiAwLFxuICAgICAgICBvblVwZGF0ZTogb25VcGRhdGUsXG4gICAgICAgIG9uVXBkYXRlUGFyYW1zOiBvblVwZGF0ZVBhcmFtcyxcbiAgICAgICAgY2FsbGJhY2tTY29wZTogY2FsbGJhY2tTY29wZSxcbiAgICAgICAgc3RhZ2dlcjogMFxuICAgICAgfSwgc3RhcnRBdCkpKTsgLy9jb3B5IHRoZSBwcm9wZXJ0aWVzL3ZhbHVlcyBpbnRvIGEgbmV3IG9iamVjdCB0byBhdm9pZCBjb2xsaXNpb25zLCBsaWtlIHZhciB0byA9IHt4OjB9LCBmcm9tID0ge3g6NTAwfTsgdGltZWxpbmUuZnJvbVRvKGUsIGZyb20sIHRvKS5mcm9tVG8oZSwgdG8sIGZyb20pO1xuXG5cbiAgICAgIHR3ZWVuLl9zdGFydEF0Ll9kcCA9IDA7IC8vIGRvbid0IGFsbG93IGl0IHRvIGdldCBwdXQgYmFjayBpbnRvIHJvb3QgdGltZWxpbmUhIExpa2Ugd2hlbiByZXZlcnQoKSBpcyBjYWxsZWQgYW5kIHRvdGFsVGltZSgpIGdldHMgc2V0LlxuXG4gICAgICB0d2Vlbi5fc3RhcnRBdC5fc2F0ID0gdHdlZW47IC8vIHVzZWQgaW4gZ2xvYmFsVGltZSgpLiBfc2F0IHN0YW5kcyBmb3IgX3N0YXJ0QXRUd2VlblxuXG4gICAgICB0aW1lIDwgMCAmJiAoX3JldmVydGluZyB8fCAhaW1tZWRpYXRlUmVuZGVyICYmICFhdXRvUmV2ZXJ0KSAmJiB0d2Vlbi5fc3RhcnRBdC5yZXZlcnQoX3JldmVydENvbmZpZ05vS2lsbCk7IC8vIHJhcmUgZWRnZSBjYXNlLCBsaWtlIGlmIGEgcmVuZGVyIGlzIGZvcmNlZCBpbiB0aGUgbmVnYXRpdmUgZGlyZWN0aW9uIG9mIGEgbm9uLWluaXR0ZWQgdHdlZW4uXG5cbiAgICAgIGlmIChpbW1lZGlhdGVSZW5kZXIpIHtcbiAgICAgICAgaWYgKGR1ciAmJiB0aW1lIDw9IDAgJiYgdFRpbWUgPD0gMCkge1xuICAgICAgICAgIC8vIGNoZWNrIHRUaW1lIGhlcmUgYmVjYXVzZSBpbiB0aGUgY2FzZSBvZiBhIHlveW8gdHdlZW4gd2hvc2UgcGxheWhlYWQgZ2V0cyBwdXNoZWQgdG8gdGhlIGVuZCBsaWtlIHR3ZWVuLnByb2dyZXNzKDEpLCB3ZSBzaG91bGQgYWxsb3cgaXQgdGhyb3VnaCBzbyB0aGF0IHRoZSBvbkNvbXBsZXRlIGdldHMgZmlyZWQgcHJvcGVybHkuXG4gICAgICAgICAgdGltZSAmJiAodHdlZW4uX3pUaW1lID0gdGltZSk7XG4gICAgICAgICAgcmV0dXJuOyAvL3dlIHNraXAgaW5pdGlhbGl6YXRpb24gaGVyZSBzbyB0aGF0IG92ZXJ3cml0aW5nIGRvZXNuJ3Qgb2NjdXIgdW50aWwgdGhlIHR3ZWVuIGFjdHVhbGx5IGJlZ2lucy4gT3RoZXJ3aXNlLCBpZiB5b3UgY3JlYXRlIHNldmVyYWwgaW1tZWRpYXRlUmVuZGVyOnRydWUgdHdlZW5zIG9mIHRoZSBzYW1lIHRhcmdldC9wcm9wZXJ0aWVzIHRvIGRyb3AgaW50byBhIFRpbWVsaW5lLCB0aGUgbGFzdCBvbmUgY3JlYXRlZCB3b3VsZCBvdmVyd3JpdGUgdGhlIGZpcnN0IG9uZXMgYmVjYXVzZSB0aGV5IGRpZG4ndCBnZXQgcGxhY2VkIGludG8gdGhlIHRpbWVsaW5lIHlldCBiZWZvcmUgdGhlIGZpcnN0IHJlbmRlciBvY2N1cnMgYW5kIGtpY2tzIGluIG92ZXJ3cml0aW5nLlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChydW5CYWNrd2FyZHMgJiYgZHVyKSB7XG4gICAgICAvL2Zyb20oKSB0d2VlbnMgbXVzdCBiZSBoYW5kbGVkIHVuaXF1ZWx5OiB0aGVpciBiZWdpbm5pbmcgdmFsdWVzIG11c3QgYmUgcmVuZGVyZWQgYnV0IHdlIGRvbid0IHdhbnQgb3ZlcndyaXRpbmcgdG8gb2NjdXIgeWV0ICh3aGVuIHRpbWUgaXMgc3RpbGwgMCkuIFdhaXQgdW50aWwgdGhlIHR3ZWVuIGFjdHVhbGx5IGJlZ2lucyBiZWZvcmUgZG9pbmcgYWxsIHRoZSByb3V0aW5lcyBsaWtlIG92ZXJ3cml0aW5nLiBBdCB0aGF0IHRpbWUsIHdlIHNob3VsZCByZW5kZXIgYXQgdGhlIEVORCBvZiB0aGUgdHdlZW4gdG8gZW5zdXJlIHRoYXQgdGhpbmdzIGluaXRpYWxpemUgY29ycmVjdGx5IChyZW1lbWJlciwgZnJvbSgpIHR3ZWVucyBnbyBiYWNrd2FyZHMpXG4gICAgICBpZiAoIXByZXZTdGFydEF0KSB7XG4gICAgICAgIHRpbWUgJiYgKGltbWVkaWF0ZVJlbmRlciA9IGZhbHNlKTsgLy9pbiByYXJlIGNhc2VzIChsaWtlIGlmIGEgZnJvbSgpIHR3ZWVuIHJ1bnMgYW5kIHRoZW4gaXMgaW52YWxpZGF0ZSgpLWVkKSwgaW1tZWRpYXRlUmVuZGVyIGNvdWxkIGJlIHRydWUgYnV0IHRoZSBpbml0aWFsIGZvcmNlZC1yZW5kZXIgZ2V0cyBza2lwcGVkLCBzbyB0aGVyZSdzIG5vIG5lZWQgdG8gZm9yY2UgdGhlIHJlbmRlciBpbiB0aGlzIGNvbnRleHQgd2hlbiB0aGUgX3RpbWUgaXMgZ3JlYXRlciB0aGFuIDBcblxuICAgICAgICBwID0gX3NldERlZmF1bHRzKHtcbiAgICAgICAgICBvdmVyd3JpdGU6IGZhbHNlLFxuICAgICAgICAgIGRhdGE6IFwiaXNGcm9tU3RhcnRcIixcbiAgICAgICAgICAvL3dlIHRhZyB0aGUgdHdlZW4gd2l0aCBhcyBcImlzRnJvbVN0YXJ0XCIgc28gdGhhdCBpZiBbaW5zaWRlIGEgcGx1Z2luXSB3ZSBuZWVkIHRvIG9ubHkgZG8gc29tZXRoaW5nIGF0IHRoZSB2ZXJ5IEVORCBvZiBhIHR3ZWVuLCB3ZSBoYXZlIGEgd2F5IG9mIGlkZW50aWZ5aW5nIHRoaXMgdHdlZW4gYXMgbWVyZWx5IHRoZSBvbmUgdGhhdCdzIHNldHRpbmcgdGhlIGJlZ2lubmluZyB2YWx1ZXMgZm9yIGEgXCJmcm9tKClcIiB0d2Vlbi4gRm9yIGV4YW1wbGUsIGNsZWFyUHJvcHMgaW4gQ1NTUGx1Z2luIHNob3VsZCBvbmx5IGdldCBhcHBsaWVkIGF0IHRoZSB2ZXJ5IEVORCBvZiBhIHR3ZWVuIGFuZCB3aXRob3V0IHRoaXMgdGFnLCBmcm9tKC4uLntoZWlnaHQ6MTAwLCBjbGVhclByb3BzOlwiaGVpZ2h0XCIsIGRlbGF5OjF9KSB3b3VsZCB3aXBlIHRoZSBoZWlnaHQgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgdHdlZW4gYW5kIGFmdGVyIDEgc2Vjb25kLCBpdCdkIGtpY2sgYmFjayBpbi5cbiAgICAgICAgICBsYXp5OiBpbW1lZGlhdGVSZW5kZXIgJiYgIXByZXZTdGFydEF0ICYmIF9pc05vdEZhbHNlKGxhenkpLFxuICAgICAgICAgIGltbWVkaWF0ZVJlbmRlcjogaW1tZWRpYXRlUmVuZGVyLFxuICAgICAgICAgIC8vemVyby1kdXJhdGlvbiB0d2VlbnMgcmVuZGVyIGltbWVkaWF0ZWx5IGJ5IGRlZmF1bHQsIGJ1dCBpZiB3ZSdyZSBub3Qgc3BlY2lmaWNhbGx5IGluc3RydWN0ZWQgdG8gcmVuZGVyIHRoaXMgdHdlZW4gaW1tZWRpYXRlbHksIHdlIHNob3VsZCBza2lwIHRoaXMgYW5kIG1lcmVseSBfaW5pdCgpIHRvIHJlY29yZCB0aGUgc3RhcnRpbmcgdmFsdWVzIChyZW5kZXJpbmcgdGhlbSBpbW1lZGlhdGVseSB3b3VsZCBwdXNoIHRoZW0gdG8gY29tcGxldGlvbiB3aGljaCBpcyB3YXN0ZWZ1bCBpbiB0aGF0IGNhc2UgLSB3ZSdkIGhhdmUgdG8gcmVuZGVyKC0xKSBpbW1lZGlhdGVseSBhZnRlcilcbiAgICAgICAgICBzdGFnZ2VyOiAwLFxuICAgICAgICAgIHBhcmVudDogcGFyZW50IC8vZW5zdXJlcyB0aGF0IG5lc3RlZCB0d2VlbnMgdGhhdCBoYWQgYSBzdGFnZ2VyIGFyZSBoYW5kbGVkIHByb3Blcmx5LCBsaWtlIGdzYXAuZnJvbShcIi5jbGFzc1wiLCB7eTpnc2FwLnV0aWxzLndyYXAoWy0xMDAsMTAwXSl9KVxuXG4gICAgICAgIH0sIGNsZWFuVmFycyk7XG4gICAgICAgIGhhcm5lc3NWYXJzICYmIChwW2hhcm5lc3MucHJvcF0gPSBoYXJuZXNzVmFycyk7IC8vIGluIGNhc2Ugc29tZW9uZSBkb2VzIHNvbWV0aGluZyBsaWtlIC5mcm9tKC4uLiwge2Nzczp7fX0pXG5cbiAgICAgICAgX3JlbW92ZUZyb21QYXJlbnQodHdlZW4uX3N0YXJ0QXQgPSBUd2Vlbi5zZXQodGFyZ2V0cywgcCkpO1xuXG4gICAgICAgIHR3ZWVuLl9zdGFydEF0Ll9kcCA9IDA7IC8vIGRvbid0IGFsbG93IGl0IHRvIGdldCBwdXQgYmFjayBpbnRvIHJvb3QgdGltZWxpbmUhXG5cbiAgICAgICAgdHdlZW4uX3N0YXJ0QXQuX3NhdCA9IHR3ZWVuOyAvLyB1c2VkIGluIGdsb2JhbFRpbWUoKVxuXG4gICAgICAgIHRpbWUgPCAwICYmIChfcmV2ZXJ0aW5nID8gdHdlZW4uX3N0YXJ0QXQucmV2ZXJ0KF9yZXZlcnRDb25maWdOb0tpbGwpIDogdHdlZW4uX3N0YXJ0QXQucmVuZGVyKC0xLCB0cnVlKSk7XG4gICAgICAgIHR3ZWVuLl96VGltZSA9IHRpbWU7XG5cbiAgICAgICAgaWYgKCFpbW1lZGlhdGVSZW5kZXIpIHtcbiAgICAgICAgICBfaW5pdFR3ZWVuKHR3ZWVuLl9zdGFydEF0LCBfdGlueU51bSwgX3RpbnlOdW0pOyAvL2Vuc3VyZXMgdGhhdCB0aGUgaW5pdGlhbCB2YWx1ZXMgYXJlIHJlY29yZGVkXG5cbiAgICAgICAgfSBlbHNlIGlmICghdGltZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHR3ZWVuLl9wdCA9IHR3ZWVuLl9wdENhY2hlID0gMDtcbiAgICBsYXp5ID0gZHVyICYmIF9pc05vdEZhbHNlKGxhenkpIHx8IGxhenkgJiYgIWR1cjtcblxuICAgIGZvciAoaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0YXJnZXQgPSB0YXJnZXRzW2ldO1xuICAgICAgZ3NEYXRhID0gdGFyZ2V0Ll9nc2FwIHx8IF9oYXJuZXNzKHRhcmdldHMpW2ldLl9nc2FwO1xuICAgICAgdHdlZW4uX3B0TG9va3VwW2ldID0gcHRMb29rdXAgPSB7fTtcbiAgICAgIF9sYXp5TG9va3VwW2dzRGF0YS5pZF0gJiYgX2xhenlUd2VlbnMubGVuZ3RoICYmIF9sYXp5UmVuZGVyKCk7IC8vaWYgb3RoZXIgdHdlZW5zIG9mIHRoZSBzYW1lIHRhcmdldCBoYXZlIHJlY2VudGx5IGluaXR0ZWQgYnV0IGhhdmVuJ3QgcmVuZGVyZWQgeWV0LCB3ZSd2ZSBnb3QgdG8gZm9yY2UgdGhlIHJlbmRlciBzbyB0aGF0IHRoZSBzdGFydGluZyB2YWx1ZXMgYXJlIGNvcnJlY3QgKGltYWdpbmUgcG9wdWxhdGluZyBhIHRpbWVsaW5lIHdpdGggYSBidW5jaCBvZiBzZXF1ZW50aWFsIHR3ZWVucyBhbmQgdGhlbiBqdW1waW5nIHRvIHRoZSBlbmQpXG5cbiAgICAgIGluZGV4ID0gZnVsbFRhcmdldHMgPT09IHRhcmdldHMgPyBpIDogZnVsbFRhcmdldHMuaW5kZXhPZih0YXJnZXQpO1xuXG4gICAgICBpZiAoaGFybmVzcyAmJiAocGx1Z2luID0gbmV3IGhhcm5lc3MoKSkuaW5pdCh0YXJnZXQsIGhhcm5lc3NWYXJzIHx8IGNsZWFuVmFycywgdHdlZW4sIGluZGV4LCBmdWxsVGFyZ2V0cykgIT09IGZhbHNlKSB7XG4gICAgICAgIHR3ZWVuLl9wdCA9IHB0ID0gbmV3IFByb3BUd2Vlbih0d2Vlbi5fcHQsIHRhcmdldCwgcGx1Z2luLm5hbWUsIDAsIDEsIHBsdWdpbi5yZW5kZXIsIHBsdWdpbiwgMCwgcGx1Z2luLnByaW9yaXR5KTtcblxuICAgICAgICBwbHVnaW4uX3Byb3BzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICBwdExvb2t1cFtuYW1lXSA9IHB0O1xuICAgICAgICB9KTtcblxuICAgICAgICBwbHVnaW4ucHJpb3JpdHkgJiYgKGhhc1ByaW9yaXR5ID0gMSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghaGFybmVzcyB8fCBoYXJuZXNzVmFycykge1xuICAgICAgICBmb3IgKHAgaW4gY2xlYW5WYXJzKSB7XG4gICAgICAgICAgaWYgKF9wbHVnaW5zW3BdICYmIChwbHVnaW4gPSBfY2hlY2tQbHVnaW4ocCwgY2xlYW5WYXJzLCB0d2VlbiwgaW5kZXgsIHRhcmdldCwgZnVsbFRhcmdldHMpKSkge1xuICAgICAgICAgICAgcGx1Z2luLnByaW9yaXR5ICYmIChoYXNQcmlvcml0eSA9IDEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwdExvb2t1cFtwXSA9IHB0ID0gX2FkZFByb3BUd2Vlbi5jYWxsKHR3ZWVuLCB0YXJnZXQsIHAsIFwiZ2V0XCIsIGNsZWFuVmFyc1twXSwgaW5kZXgsIGZ1bGxUYXJnZXRzLCAwLCB2YXJzLnN0cmluZ0ZpbHRlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHR3ZWVuLl9vcCAmJiB0d2Vlbi5fb3BbaV0gJiYgdHdlZW4ua2lsbCh0YXJnZXQsIHR3ZWVuLl9vcFtpXSk7XG5cbiAgICAgIGlmIChhdXRvT3ZlcndyaXRlICYmIHR3ZWVuLl9wdCkge1xuICAgICAgICBfb3ZlcndyaXRpbmdUd2VlbiA9IHR3ZWVuO1xuXG4gICAgICAgIF9nbG9iYWxUaW1lbGluZS5raWxsVHdlZW5zT2YodGFyZ2V0LCBwdExvb2t1cCwgdHdlZW4uZ2xvYmFsVGltZSh0aW1lKSk7IC8vIG1ha2Ugc3VyZSB0aGUgb3ZlcndyaXRpbmcgZG9lc24ndCBvdmVyd3JpdGUgVEhJUyB0d2VlbiEhIVxuXG5cbiAgICAgICAgb3ZlcndyaXR0ZW4gPSAhdHdlZW4ucGFyZW50O1xuICAgICAgICBfb3ZlcndyaXRpbmdUd2VlbiA9IDA7XG4gICAgICB9XG5cbiAgICAgIHR3ZWVuLl9wdCAmJiBsYXp5ICYmIChfbGF6eUxvb2t1cFtnc0RhdGEuaWRdID0gMSk7XG4gICAgfVxuXG4gICAgaGFzUHJpb3JpdHkgJiYgX3NvcnRQcm9wVHdlZW5zQnlQcmlvcml0eSh0d2Vlbik7XG4gICAgdHdlZW4uX29uSW5pdCAmJiB0d2Vlbi5fb25Jbml0KHR3ZWVuKTsgLy9wbHVnaW5zIGxpa2UgUm91bmRQcm9wcyBtdXN0IHdhaXQgdW50aWwgQUxMIG9mIHRoZSBQcm9wVHdlZW5zIGFyZSBpbnN0YW50aWF0ZWQuIEluIHRoZSBwbHVnaW4ncyBpbml0KCkgZnVuY3Rpb24sIGl0IHNldHMgdGhlIF9vbkluaXQgb24gdGhlIHR3ZWVuIGluc3RhbmNlLiBNYXkgbm90IGJlIHByZXR0eS9pbnR1aXRpdmUsIGJ1dCBpdCdzIGZhc3QgYW5kIGtlZXBzIGZpbGUgc2l6ZSBkb3duLlxuICB9XG5cbiAgdHdlZW4uX29uVXBkYXRlID0gb25VcGRhdGU7XG4gIHR3ZWVuLl9pbml0dGVkID0gKCF0d2Vlbi5fb3AgfHwgdHdlZW4uX3B0KSAmJiAhb3ZlcndyaXR0ZW47IC8vIGlmIG92ZXJ3cml0dGVuUHJvcHMgcmVzdWx0ZWQgaW4gdGhlIGVudGlyZSB0d2VlbiBiZWluZyBraWxsZWQsIGRvIE5PVCBmbGFnIGl0IGFzIGluaXR0ZWQgb3IgZWxzZSBpdCBtYXkgcmVuZGVyIGZvciBvbmUgdGljay5cblxuICBrZXlmcmFtZXMgJiYgdGltZSA8PSAwICYmIHRsLnJlbmRlcihfYmlnTnVtLCB0cnVlLCB0cnVlKTsgLy8gaWYgdGhlcmUncyBhIDAlIGtleWZyYW1lLCBpdCdsbCByZW5kZXIgaW4gdGhlIFwiYmVmb3JlXCIgc3RhdGUgZm9yIGFueSBzdGFnZ2VyZWQvZGVsYXllZCBhbmltYXRpb25zIHRodXMgd2hlbiB0aGUgZm9sbG93aW5nIHR3ZWVuIGluaXRpYWxpemVzLCBpdCdsbCB1c2UgdGhlIFwiYmVmb3JlXCIgc3RhdGUgaW5zdGVhZCBvZiB0aGUgXCJhZnRlclwiIHN0YXRlIGFzIHRoZSBpbml0aWFsIHZhbHVlcy5cbn0sXG4gICAgX3VwZGF0ZVByb3BUd2VlbnMgPSBmdW5jdGlvbiBfdXBkYXRlUHJvcFR3ZWVucyh0d2VlbiwgcHJvcGVydHksIHZhbHVlLCBzdGFydCwgc3RhcnRJc1JlbGF0aXZlLCByYXRpbywgdGltZSkge1xuICB2YXIgcHRDYWNoZSA9ICh0d2Vlbi5fcHQgJiYgdHdlZW4uX3B0Q2FjaGUgfHwgKHR3ZWVuLl9wdENhY2hlID0ge30pKVtwcm9wZXJ0eV0sXG4gICAgICBwdCxcbiAgICAgIHJvb3RQVCxcbiAgICAgIGxvb2t1cCxcbiAgICAgIGk7XG5cbiAgaWYgKCFwdENhY2hlKSB7XG4gICAgcHRDYWNoZSA9IHR3ZWVuLl9wdENhY2hlW3Byb3BlcnR5XSA9IFtdO1xuICAgIGxvb2t1cCA9IHR3ZWVuLl9wdExvb2t1cDtcbiAgICBpID0gdHdlZW4uX3RhcmdldHMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgcHQgPSBsb29rdXBbaV1bcHJvcGVydHldO1xuXG4gICAgICBpZiAocHQgJiYgcHQuZCAmJiBwdC5kLl9wdCkge1xuICAgICAgICAvLyBpdCdzIGEgcGx1Z2luLCBzbyBmaW5kIHRoZSBuZXN0ZWQgUHJvcFR3ZWVuXG4gICAgICAgIHB0ID0gcHQuZC5fcHQ7XG5cbiAgICAgICAgd2hpbGUgKHB0ICYmIHB0LnAgIT09IHByb3BlcnR5ICYmIHB0LmZwICE9PSBwcm9wZXJ0eSkge1xuICAgICAgICAgIC8vIFwiZnBcIiBpcyBmdW5jdGlvblBhcmFtIGZvciB0aGluZ3MgbGlrZSBzZXR0aW5nIENTUyB2YXJpYWJsZXMgd2hpY2ggcmVxdWlyZSAuc2V0UHJvcGVydHkoXCItLXZhci1uYW1lXCIsIHZhbHVlKVxuICAgICAgICAgIHB0ID0gcHQuX25leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFwdCkge1xuICAgICAgICAvLyB0aGVyZSBpcyBubyBQcm9wVHdlZW4gYXNzb2NpYXRlZCB3aXRoIHRoYXQgcHJvcGVydHksIHNvIHdlIG11c3QgRk9SQ0Ugb25lIHRvIGJlIGNyZWF0ZWQgYW5kIGRpdGNoIG91dCBvZiB0aGlzXG4gICAgICAgIC8vIGlmIHRoZSB0d2VlbiBoYXMgb3RoZXIgcHJvcGVydGllcyB0aGF0IGFscmVhZHkgcmVuZGVyZWQgYXQgbmV3IHBvc2l0aW9ucywgd2UnZCBub3JtYWxseSBoYXZlIHRvIHJld2luZCB0byBwdXQgdGhlbSBiYWNrIGxpa2UgdHdlZW4ucmVuZGVyKDAsIHRydWUpIGJlZm9yZSBmb3JjaW5nIGFuIF9pbml0VHdlZW4oKSwgYnV0IHRoYXQgY2FuIGNyZWF0ZSBhbm90aGVyIGVkZ2UgY2FzZSBsaWtlIHR3ZWVuaW5nIGEgdGltZWxpbmUncyBwcm9ncmVzcyB3b3VsZCB0cmlnZ2VyIG9uVXBkYXRlcyB0byBmaXJlIHdoaWNoIGNvdWxkIG1vdmUgb3RoZXIgdGhpbmdzIGFyb3VuZC4gSXQncyBiZXR0ZXIgdG8ganVzdCBpbmZvcm0gdXNlcnMgdGhhdCAucmVzZXRUbygpIHNob3VsZCBPTkxZIGJlIHVzZWQgZm9yIHR3ZWVucyB0aGF0IGFscmVhZHkgaGF2ZSB0aGF0IHByb3BlcnR5LiBGb3IgZXhhbXBsZSwgeW91IGNhbid0IGdzYXAudG8oLi4ueyB5OiAwIH0pIGFuZCB0aGVuIHR3ZWVuLnJlc3RUbyhcInhcIiwgMjAwKSBmb3IgZXhhbXBsZS5cbiAgICAgICAgX2ZvcmNlQWxsUHJvcFR3ZWVucyA9IDE7IC8vIG90aGVyd2lzZSwgd2hlbiB3ZSBfYWRkUHJvcFR3ZWVuKCkgYW5kIGl0IGZpbmRzIG5vIGNoYW5nZSBiZXR3ZWVuIHRoZSBzdGFydCBhbmQgZW5kIHZhbHVlcywgaXQgc2tpcHMgY3JlYXRpbmcgYSBQcm9wVHdlZW4gKGZvciBlZmZpY2llbmN5Li4ud2h5IHR3ZWVuIHdoZW4gdGhlcmUncyBubyBkaWZmZXJlbmNlPykgYnV0IGluIHRoaXMgY2FzZSB3ZSBORUVEIHRoYXQgUHJvcFR3ZWVuIGNyZWF0ZWQgc28gd2UgY2FuIGVkaXQgaXQuXG5cbiAgICAgICAgdHdlZW4udmFyc1twcm9wZXJ0eV0gPSBcIis9MFwiO1xuXG4gICAgICAgIF9pbml0VHdlZW4odHdlZW4sIHRpbWUpO1xuXG4gICAgICAgIF9mb3JjZUFsbFByb3BUd2VlbnMgPSAwO1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cblxuICAgICAgcHRDYWNoZS5wdXNoKHB0KTtcbiAgICB9XG4gIH1cblxuICBpID0gcHRDYWNoZS5sZW5ndGg7XG5cbiAgd2hpbGUgKGktLSkge1xuICAgIHJvb3RQVCA9IHB0Q2FjaGVbaV07XG4gICAgcHQgPSByb290UFQuX3B0IHx8IHJvb3RQVDsgLy8gY29tcGxleCB2YWx1ZXMgbWF5IGhhdmUgbmVzdGVkIFByb3BUd2VlbnMuIFdlIG9ubHkgYWNjb21tb2RhdGUgdGhlIEZJUlNUIHZhbHVlLlxuXG4gICAgcHQucyA9IChzdGFydCB8fCBzdGFydCA9PT0gMCkgJiYgIXN0YXJ0SXNSZWxhdGl2ZSA/IHN0YXJ0IDogcHQucyArIChzdGFydCB8fCAwKSArIHJhdGlvICogcHQuYztcbiAgICBwdC5jID0gdmFsdWUgLSBwdC5zO1xuICAgIHJvb3RQVC5lICYmIChyb290UFQuZSA9IF9yb3VuZCh2YWx1ZSkgKyBnZXRVbml0KHJvb3RQVC5lKSk7IC8vIG1haW5seSBmb3IgQ1NTUGx1Z2luIChlbmQgdmFsdWUpXG5cbiAgICByb290UFQuYiAmJiAocm9vdFBULmIgPSBwdC5zICsgZ2V0VW5pdChyb290UFQuYikpOyAvLyAoYmVnaW5uaW5nIHZhbHVlKVxuICB9XG59LFxuICAgIF9hZGRBbGlhc2VzVG9WYXJzID0gZnVuY3Rpb24gX2FkZEFsaWFzZXNUb1ZhcnModGFyZ2V0cywgdmFycykge1xuICB2YXIgaGFybmVzcyA9IHRhcmdldHNbMF0gPyBfZ2V0Q2FjaGUodGFyZ2V0c1swXSkuaGFybmVzcyA6IDAsXG4gICAgICBwcm9wZXJ0eUFsaWFzZXMgPSBoYXJuZXNzICYmIGhhcm5lc3MuYWxpYXNlcyxcbiAgICAgIGNvcHksXG4gICAgICBwLFxuICAgICAgaSxcbiAgICAgIGFsaWFzZXM7XG5cbiAgaWYgKCFwcm9wZXJ0eUFsaWFzZXMpIHtcbiAgICByZXR1cm4gdmFycztcbiAgfVxuXG4gIGNvcHkgPSBfbWVyZ2Uoe30sIHZhcnMpO1xuXG4gIGZvciAocCBpbiBwcm9wZXJ0eUFsaWFzZXMpIHtcbiAgICBpZiAocCBpbiBjb3B5KSB7XG4gICAgICBhbGlhc2VzID0gcHJvcGVydHlBbGlhc2VzW3BdLnNwbGl0KFwiLFwiKTtcbiAgICAgIGkgPSBhbGlhc2VzLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBjb3B5W2FsaWFzZXNbaV1dID0gY29weVtwXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29weTtcbn0sXG4gICAgLy8gcGFyc2VzIG11bHRpcGxlIGZvcm1hdHMsIGxpa2Uge1wiMCVcIjoge3g6IDEwMH0sIHtcIjUwJVwiOiB7eDogLTIwfX0gYW5kIHsgeDoge1wiMCVcIjogMTAwLCBcIjUwJVwiOiAtMjB9IH0sIGFuZCBhbiBcImVhc2VcIiBjYW4gYmUgc2V0IG9uIGFueSBvYmplY3QuIFdlIHBvcHVsYXRlIGFuIFwiYWxsUHJvcHNcIiBvYmplY3Qgd2l0aCBhbiBBcnJheSBmb3IgZWFjaCBwcm9wZXJ0eSwgbGlrZSB7eDogW3t9LCB7fV0sIHk6W3t9LCB7fV19IHdpdGggZGF0YSBmb3IgZWFjaCBwcm9wZXJ0eSB0d2Vlbi4gVGhlIG9iamVjdHMgaGF2ZSBhIFwidFwiICh0aW1lKSwgXCJ2XCIsICh2YWx1ZSksIGFuZCBcImVcIiAoZWFzZSkgcHJvcGVydHkuIFRoaXMgYWxsb3dzIHVzIHRvIHBpZWNlIHRvZ2V0aGVyIGEgdGltZWxpbmUgbGF0ZXIuXG5fcGFyc2VLZXlmcmFtZSA9IGZ1bmN0aW9uIF9wYXJzZUtleWZyYW1lKHByb3AsIG9iaiwgYWxsUHJvcHMsIGVhc2VFYWNoKSB7XG4gIHZhciBlYXNlID0gb2JqLmVhc2UgfHwgZWFzZUVhY2ggfHwgXCJwb3dlcjEuaW5PdXRcIixcbiAgICAgIHAsXG4gICAgICBhO1xuXG4gIGlmIChfaXNBcnJheShvYmopKSB7XG4gICAgYSA9IGFsbFByb3BzW3Byb3BdIHx8IChhbGxQcm9wc1twcm9wXSA9IFtdKTsgLy8gdCA9IHRpbWUgKG91dCBvZiAxMDApLCB2ID0gdmFsdWUsIGUgPSBlYXNlXG5cbiAgICBvYmouZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGkpIHtcbiAgICAgIHJldHVybiBhLnB1c2goe1xuICAgICAgICB0OiBpIC8gKG9iai5sZW5ndGggLSAxKSAqIDEwMCxcbiAgICAgICAgdjogdmFsdWUsXG4gICAgICAgIGU6IGVhc2VcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGZvciAocCBpbiBvYmopIHtcbiAgICAgIGEgPSBhbGxQcm9wc1twXSB8fCAoYWxsUHJvcHNbcF0gPSBbXSk7XG4gICAgICBwID09PSBcImVhc2VcIiB8fCBhLnB1c2goe1xuICAgICAgICB0OiBwYXJzZUZsb2F0KHByb3ApLFxuICAgICAgICB2OiBvYmpbcF0sXG4gICAgICAgIGU6IGVhc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufSxcbiAgICBfcGFyc2VGdW5jT3JTdHJpbmcgPSBmdW5jdGlvbiBfcGFyc2VGdW5jT3JTdHJpbmcodmFsdWUsIHR3ZWVuLCBpLCB0YXJnZXQsIHRhcmdldHMpIHtcbiAgcmV0dXJuIF9pc0Z1bmN0aW9uKHZhbHVlKSA/IHZhbHVlLmNhbGwodHdlZW4sIGksIHRhcmdldCwgdGFyZ2V0cykgOiBfaXNTdHJpbmcodmFsdWUpICYmIH52YWx1ZS5pbmRleE9mKFwicmFuZG9tKFwiKSA/IF9yZXBsYWNlUmFuZG9tKHZhbHVlKSA6IHZhbHVlO1xufSxcbiAgICBfc3RhZ2dlclR3ZWVuUHJvcHMgPSBfY2FsbGJhY2tOYW1lcyArIFwicmVwZWF0LHJlcGVhdERlbGF5LHlveW8scmVwZWF0UmVmcmVzaCx5b3lvRWFzZSxhdXRvUmV2ZXJ0XCIsXG4gICAgX3N0YWdnZXJQcm9wc1RvU2tpcCA9IHt9O1xuXG5fZm9yRWFjaE5hbWUoX3N0YWdnZXJUd2VlblByb3BzICsgXCIsaWQsc3RhZ2dlcixkZWxheSxkdXJhdGlvbixwYXVzZWQsc2Nyb2xsVHJpZ2dlclwiLCBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gX3N0YWdnZXJQcm9wc1RvU2tpcFtuYW1lXSA9IDE7XG59KTtcbi8qXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVFdFRU5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuXG5leHBvcnQgdmFyIFR3ZWVuID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfQW5pbWF0aW9uMikge1xuICBfaW5oZXJpdHNMb29zZShUd2VlbiwgX0FuaW1hdGlvbjIpO1xuXG4gIGZ1bmN0aW9uIFR3ZWVuKHRhcmdldHMsIHZhcnMsIHBvc2l0aW9uLCBza2lwSW5oZXJpdCkge1xuICAgIHZhciBfdGhpczM7XG5cbiAgICBpZiAodHlwZW9mIHZhcnMgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIHBvc2l0aW9uLmR1cmF0aW9uID0gdmFycztcbiAgICAgIHZhcnMgPSBwb3NpdGlvbjtcbiAgICAgIHBvc2l0aW9uID0gbnVsbDtcbiAgICB9XG5cbiAgICBfdGhpczMgPSBfQW5pbWF0aW9uMi5jYWxsKHRoaXMsIHNraXBJbmhlcml0ID8gdmFycyA6IF9pbmhlcml0RGVmYXVsdHModmFycykpIHx8IHRoaXM7XG4gICAgdmFyIF90aGlzMyR2YXJzID0gX3RoaXMzLnZhcnMsXG4gICAgICAgIGR1cmF0aW9uID0gX3RoaXMzJHZhcnMuZHVyYXRpb24sXG4gICAgICAgIGRlbGF5ID0gX3RoaXMzJHZhcnMuZGVsYXksXG4gICAgICAgIGltbWVkaWF0ZVJlbmRlciA9IF90aGlzMyR2YXJzLmltbWVkaWF0ZVJlbmRlcixcbiAgICAgICAgc3RhZ2dlciA9IF90aGlzMyR2YXJzLnN0YWdnZXIsXG4gICAgICAgIG92ZXJ3cml0ZSA9IF90aGlzMyR2YXJzLm92ZXJ3cml0ZSxcbiAgICAgICAga2V5ZnJhbWVzID0gX3RoaXMzJHZhcnMua2V5ZnJhbWVzLFxuICAgICAgICBkZWZhdWx0cyA9IF90aGlzMyR2YXJzLmRlZmF1bHRzLFxuICAgICAgICBzY3JvbGxUcmlnZ2VyID0gX3RoaXMzJHZhcnMuc2Nyb2xsVHJpZ2dlcixcbiAgICAgICAgeW95b0Vhc2UgPSBfdGhpczMkdmFycy55b3lvRWFzZSxcbiAgICAgICAgcGFyZW50ID0gdmFycy5wYXJlbnQgfHwgX2dsb2JhbFRpbWVsaW5lLFxuICAgICAgICBwYXJzZWRUYXJnZXRzID0gKF9pc0FycmF5KHRhcmdldHMpIHx8IF9pc1R5cGVkQXJyYXkodGFyZ2V0cykgPyBfaXNOdW1iZXIodGFyZ2V0c1swXSkgOiBcImxlbmd0aFwiIGluIHZhcnMpID8gW3RhcmdldHNdIDogdG9BcnJheSh0YXJnZXRzKSxcbiAgICAgICAgdGwsXG4gICAgICAgIGksXG4gICAgICAgIGNvcHksXG4gICAgICAgIGwsXG4gICAgICAgIHAsXG4gICAgICAgIGN1clRhcmdldCxcbiAgICAgICAgc3RhZ2dlckZ1bmMsXG4gICAgICAgIHN0YWdnZXJWYXJzVG9NZXJnZTtcbiAgICBfdGhpczMuX3RhcmdldHMgPSBwYXJzZWRUYXJnZXRzLmxlbmd0aCA/IF9oYXJuZXNzKHBhcnNlZFRhcmdldHMpIDogX3dhcm4oXCJHU0FQIHRhcmdldCBcIiArIHRhcmdldHMgKyBcIiBub3QgZm91bmQuIGh0dHBzOi8vZ3JlZW5zb2NrLmNvbVwiLCAhX2NvbmZpZy5udWxsVGFyZ2V0V2FybikgfHwgW107XG4gICAgX3RoaXMzLl9wdExvb2t1cCA9IFtdOyAvL1Byb3BUd2VlbiBsb29rdXAuIEFuIGFycmF5IGNvbnRhaW5pbmcgYW4gb2JqZWN0IGZvciBlYWNoIHRhcmdldCwgaGF2aW5nIGtleXMgZm9yIGVhY2ggdHdlZW5pbmcgcHJvcGVydHlcblxuICAgIF90aGlzMy5fb3ZlcndyaXRlID0gb3ZlcndyaXRlO1xuXG4gICAgaWYgKGtleWZyYW1lcyB8fCBzdGFnZ2VyIHx8IF9pc0Z1bmNPclN0cmluZyhkdXJhdGlvbikgfHwgX2lzRnVuY09yU3RyaW5nKGRlbGF5KSkge1xuICAgICAgdmFycyA9IF90aGlzMy52YXJzO1xuICAgICAgdGwgPSBfdGhpczMudGltZWxpbmUgPSBuZXcgVGltZWxpbmUoe1xuICAgICAgICBkYXRhOiBcIm5lc3RlZFwiLFxuICAgICAgICBkZWZhdWx0czogZGVmYXVsdHMgfHwge30sXG4gICAgICAgIHRhcmdldHM6IHBhcmVudCAmJiBwYXJlbnQuZGF0YSA9PT0gXCJuZXN0ZWRcIiA/IHBhcmVudC52YXJzLnRhcmdldHMgOiBwYXJzZWRUYXJnZXRzXG4gICAgICB9KTsgLy8gd2UgbmVlZCB0byBzdG9yZSB0aGUgdGFyZ2V0cyBiZWNhdXNlIGZvciBzdGFnZ2VycyBhbmQga2V5ZnJhbWVzLCB3ZSBlbmQgdXAgY3JlYXRpbmcgYW4gaW5kaXZpZHVhbCB0d2VlbiBmb3IgZWFjaCBidXQgZnVuY3Rpb24tYmFzZWQgdmFsdWVzIG5lZWQgdG8ga25vdyB0aGUgaW5kZXggYW5kIHRoZSB3aG9sZSBBcnJheSBvZiB0YXJnZXRzLlxuXG4gICAgICB0bC5raWxsKCk7XG4gICAgICB0bC5wYXJlbnQgPSB0bC5fZHAgPSBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzMyk7XG4gICAgICB0bC5fc3RhcnQgPSAwO1xuXG4gICAgICBpZiAoc3RhZ2dlciB8fCBfaXNGdW5jT3JTdHJpbmcoZHVyYXRpb24pIHx8IF9pc0Z1bmNPclN0cmluZyhkZWxheSkpIHtcbiAgICAgICAgbCA9IHBhcnNlZFRhcmdldHMubGVuZ3RoO1xuICAgICAgICBzdGFnZ2VyRnVuYyA9IHN0YWdnZXIgJiYgZGlzdHJpYnV0ZShzdGFnZ2VyKTtcblxuICAgICAgICBpZiAoX2lzT2JqZWN0KHN0YWdnZXIpKSB7XG4gICAgICAgICAgLy91c2VycyBjYW4gcGFzcyBpbiBjYWxsYmFja3MgbGlrZSBvblN0YXJ0L29uQ29tcGxldGUgaW4gdGhlIHN0YWdnZXIgb2JqZWN0LiBUaGVzZSBzaG91bGQgZmlyZSB3aXRoIGVhY2ggaW5kaXZpZHVhbCB0d2Vlbi5cbiAgICAgICAgICBmb3IgKHAgaW4gc3RhZ2dlcikge1xuICAgICAgICAgICAgaWYgKH5fc3RhZ2dlclR3ZWVuUHJvcHMuaW5kZXhPZihwKSkge1xuICAgICAgICAgICAgICBzdGFnZ2VyVmFyc1RvTWVyZ2UgfHwgKHN0YWdnZXJWYXJzVG9NZXJnZSA9IHt9KTtcbiAgICAgICAgICAgICAgc3RhZ2dlclZhcnNUb01lcmdlW3BdID0gc3RhZ2dlcltwXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgY29weSA9IF9jb3B5RXhjbHVkaW5nKHZhcnMsIF9zdGFnZ2VyUHJvcHNUb1NraXApO1xuICAgICAgICAgIGNvcHkuc3RhZ2dlciA9IDA7XG4gICAgICAgICAgeW95b0Vhc2UgJiYgKGNvcHkueW95b0Vhc2UgPSB5b3lvRWFzZSk7XG4gICAgICAgICAgc3RhZ2dlclZhcnNUb01lcmdlICYmIF9tZXJnZShjb3B5LCBzdGFnZ2VyVmFyc1RvTWVyZ2UpO1xuICAgICAgICAgIGN1clRhcmdldCA9IHBhcnNlZFRhcmdldHNbaV07IC8vZG9uJ3QganVzdCBjb3B5IGR1cmF0aW9uIG9yIGRlbGF5IGJlY2F1c2UgaWYgdGhleSdyZSBhIHN0cmluZyBvciBmdW5jdGlvbiwgd2UnZCBlbmQgdXAgaW4gYW4gaW5maW5pdGUgbG9vcCBiZWNhdXNlIF9pc0Z1bmNPclN0cmluZygpIHdvdWxkIGV2YWx1YXRlIGFzIHRydWUgaW4gdGhlIGNoaWxkIHR3ZWVucywgZW50ZXJpbmcgdGhpcyBsb29wLCBldGMuIFNvIHdlIHBhcnNlIHRoZSB2YWx1ZSBzdHJhaWdodCBmcm9tIHZhcnMgYW5kIGRlZmF1bHQgdG8gMC5cblxuICAgICAgICAgIGNvcHkuZHVyYXRpb24gPSArX3BhcnNlRnVuY09yU3RyaW5nKGR1cmF0aW9uLCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzMyksIGksIGN1clRhcmdldCwgcGFyc2VkVGFyZ2V0cyk7XG4gICAgICAgICAgY29weS5kZWxheSA9ICgrX3BhcnNlRnVuY09yU3RyaW5nKGRlbGF5LCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzMyksIGksIGN1clRhcmdldCwgcGFyc2VkVGFyZ2V0cykgfHwgMCkgLSBfdGhpczMuX2RlbGF5O1xuXG4gICAgICAgICAgaWYgKCFzdGFnZ2VyICYmIGwgPT09IDEgJiYgY29weS5kZWxheSkge1xuICAgICAgICAgICAgLy8gaWYgc29tZW9uZSBkb2VzIGRlbGF5OlwicmFuZG9tKDEsIDUpXCIsIHJlcGVhdDotMSwgZm9yIGV4YW1wbGUsIHRoZSBkZWxheSBzaG91bGRuJ3QgYmUgaW5zaWRlIHRoZSByZXBlYXQuXG4gICAgICAgICAgICBfdGhpczMuX2RlbGF5ID0gZGVsYXkgPSBjb3B5LmRlbGF5O1xuICAgICAgICAgICAgX3RoaXMzLl9zdGFydCArPSBkZWxheTtcbiAgICAgICAgICAgIGNvcHkuZGVsYXkgPSAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRsLnRvKGN1clRhcmdldCwgY29weSwgc3RhZ2dlckZ1bmMgPyBzdGFnZ2VyRnVuYyhpLCBjdXJUYXJnZXQsIHBhcnNlZFRhcmdldHMpIDogMCk7XG4gICAgICAgICAgdGwuX2Vhc2UgPSBfZWFzZU1hcC5ub25lO1xuICAgICAgICB9XG5cbiAgICAgICAgdGwuZHVyYXRpb24oKSA/IGR1cmF0aW9uID0gZGVsYXkgPSAwIDogX3RoaXMzLnRpbWVsaW5lID0gMDsgLy8gaWYgdGhlIHRpbWVsaW5lJ3MgZHVyYXRpb24gaXMgMCwgd2UgZG9uJ3QgbmVlZCBhIHRpbWVsaW5lIGludGVybmFsbHkhXG4gICAgICB9IGVsc2UgaWYgKGtleWZyYW1lcykge1xuICAgICAgICBfaW5oZXJpdERlZmF1bHRzKF9zZXREZWZhdWx0cyh0bC52YXJzLmRlZmF1bHRzLCB7XG4gICAgICAgICAgZWFzZTogXCJub25lXCJcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIHRsLl9lYXNlID0gX3BhcnNlRWFzZShrZXlmcmFtZXMuZWFzZSB8fCB2YXJzLmVhc2UgfHwgXCJub25lXCIpO1xuICAgICAgICB2YXIgdGltZSA9IDAsXG4gICAgICAgICAgICBhLFxuICAgICAgICAgICAga2YsXG4gICAgICAgICAgICB2O1xuXG4gICAgICAgIGlmIChfaXNBcnJheShrZXlmcmFtZXMpKSB7XG4gICAgICAgICAga2V5ZnJhbWVzLmZvckVhY2goZnVuY3Rpb24gKGZyYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdGwudG8ocGFyc2VkVGFyZ2V0cywgZnJhbWUsIFwiPlwiKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0bC5kdXJhdGlvbigpOyAvLyB0byBlbnN1cmUgdGwuX2R1ciBpcyBjYWNoZWQgYmVjYXVzZSB3ZSB0YXAgaW50byBpdCBmb3IgcGVyZm9ybWFuY2UgcHVycG9zZXMgaW4gdGhlIHJlbmRlcigpIG1ldGhvZC5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb3B5ID0ge307XG5cbiAgICAgICAgICBmb3IgKHAgaW4ga2V5ZnJhbWVzKSB7XG4gICAgICAgICAgICBwID09PSBcImVhc2VcIiB8fCBwID09PSBcImVhc2VFYWNoXCIgfHwgX3BhcnNlS2V5ZnJhbWUocCwga2V5ZnJhbWVzW3BdLCBjb3B5LCBrZXlmcmFtZXMuZWFzZUVhY2gpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvciAocCBpbiBjb3B5KSB7XG4gICAgICAgICAgICBhID0gY29weVtwXS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgIHJldHVybiBhLnQgLSBiLnQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRpbWUgPSAwO1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBrZiA9IGFbaV07XG4gICAgICAgICAgICAgIHYgPSB7XG4gICAgICAgICAgICAgICAgZWFzZToga2YuZSxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogKGtmLnQgLSAoaSA/IGFbaSAtIDFdLnQgOiAwKSkgLyAxMDAgKiBkdXJhdGlvblxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB2W3BdID0ga2YudjtcbiAgICAgICAgICAgICAgdGwudG8ocGFyc2VkVGFyZ2V0cywgdiwgdGltZSk7XG4gICAgICAgICAgICAgIHRpbWUgKz0gdi5kdXJhdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0bC5kdXJhdGlvbigpIDwgZHVyYXRpb24gJiYgdGwudG8oe30sIHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbiAtIHRsLmR1cmF0aW9uKClcbiAgICAgICAgICB9KTsgLy8gaW4gY2FzZSBrZXlmcmFtZXMgZGlkbid0IGdvIHRvIDEwMCVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkdXJhdGlvbiB8fCBfdGhpczMuZHVyYXRpb24oZHVyYXRpb24gPSB0bC5kdXJhdGlvbigpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgX3RoaXMzLnRpbWVsaW5lID0gMDsgLy9zcGVlZCBvcHRpbWl6YXRpb24sIGZhc3RlciBsb29rdXBzIChubyBnb2luZyB1cCB0aGUgcHJvdG90eXBlIGNoYWluKVxuICAgIH1cblxuICAgIGlmIChvdmVyd3JpdGUgPT09IHRydWUgJiYgIV9zdXBwcmVzc092ZXJ3cml0ZXMpIHtcbiAgICAgIF9vdmVyd3JpdGluZ1R3ZWVuID0gX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpczMpO1xuXG4gICAgICBfZ2xvYmFsVGltZWxpbmUua2lsbFR3ZWVuc09mKHBhcnNlZFRhcmdldHMpO1xuXG4gICAgICBfb3ZlcndyaXRpbmdUd2VlbiA9IDA7XG4gICAgfVxuXG4gICAgX2FkZFRvVGltZWxpbmUocGFyZW50LCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzMyksIHBvc2l0aW9uKTtcblxuICAgIHZhcnMucmV2ZXJzZWQgJiYgX3RoaXMzLnJldmVyc2UoKTtcbiAgICB2YXJzLnBhdXNlZCAmJiBfdGhpczMucGF1c2VkKHRydWUpO1xuXG4gICAgaWYgKGltbWVkaWF0ZVJlbmRlciB8fCAhZHVyYXRpb24gJiYgIWtleWZyYW1lcyAmJiBfdGhpczMuX3N0YXJ0ID09PSBfcm91bmRQcmVjaXNlKHBhcmVudC5fdGltZSkgJiYgX2lzTm90RmFsc2UoaW1tZWRpYXRlUmVuZGVyKSAmJiBfaGFzTm9QYXVzZWRBbmNlc3RvcnMoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpczMpKSAmJiBwYXJlbnQuZGF0YSAhPT0gXCJuZXN0ZWRcIikge1xuICAgICAgX3RoaXMzLl90VGltZSA9IC1fdGlueU51bTsgLy9mb3JjZXMgYSByZW5kZXIgd2l0aG91dCBoYXZpbmcgdG8gc2V0IHRoZSByZW5kZXIoKSBcImZvcmNlXCIgcGFyYW1ldGVyIHRvIHRydWUgYmVjYXVzZSB3ZSB3YW50IHRvIGFsbG93IGxhenlpbmcgYnkgZGVmYXVsdCAodXNpbmcgdGhlIFwiZm9yY2VcIiBwYXJhbWV0ZXIgYWx3YXlzIGZvcmNlcyBhbiBpbW1lZGlhdGUgZnVsbCByZW5kZXIpXG5cbiAgICAgIF90aGlzMy5yZW5kZXIoTWF0aC5tYXgoMCwgLWRlbGF5KSB8fCAwKTsgLy9pbiBjYXNlIGRlbGF5IGlzIG5lZ2F0aXZlXG5cbiAgICB9XG5cbiAgICBzY3JvbGxUcmlnZ2VyICYmIF9zY3JvbGxUcmlnZ2VyKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMzKSwgc2Nyb2xsVHJpZ2dlcik7XG4gICAgcmV0dXJuIF90aGlzMztcbiAgfVxuXG4gIHZhciBfcHJvdG8zID0gVHdlZW4ucHJvdG90eXBlO1xuXG4gIF9wcm90bzMucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKSB7XG4gICAgdmFyIHByZXZUaW1lID0gdGhpcy5fdGltZSxcbiAgICAgICAgdER1ciA9IHRoaXMuX3REdXIsXG4gICAgICAgIGR1ciA9IHRoaXMuX2R1cixcbiAgICAgICAgaXNOZWdhdGl2ZSA9IHRvdGFsVGltZSA8IDAsXG4gICAgICAgIHRUaW1lID0gdG90YWxUaW1lID4gdER1ciAtIF90aW55TnVtICYmICFpc05lZ2F0aXZlID8gdER1ciA6IHRvdGFsVGltZSA8IF90aW55TnVtID8gMCA6IHRvdGFsVGltZSxcbiAgICAgICAgdGltZSxcbiAgICAgICAgcHQsXG4gICAgICAgIGl0ZXJhdGlvbixcbiAgICAgICAgY3ljbGVEdXJhdGlvbixcbiAgICAgICAgcHJldkl0ZXJhdGlvbixcbiAgICAgICAgaXNZb3lvLFxuICAgICAgICByYXRpbyxcbiAgICAgICAgdGltZWxpbmUsXG4gICAgICAgIHlveW9FYXNlO1xuXG4gICAgaWYgKCFkdXIpIHtcbiAgICAgIF9yZW5kZXJaZXJvRHVyYXRpb25Ud2Vlbih0aGlzLCB0b3RhbFRpbWUsIHN1cHByZXNzRXZlbnRzLCBmb3JjZSk7XG4gICAgfSBlbHNlIGlmICh0VGltZSAhPT0gdGhpcy5fdFRpbWUgfHwgIXRvdGFsVGltZSB8fCBmb3JjZSB8fCAhdGhpcy5faW5pdHRlZCAmJiB0aGlzLl90VGltZSB8fCB0aGlzLl9zdGFydEF0ICYmIHRoaXMuX3pUaW1lIDwgMCAhPT0gaXNOZWdhdGl2ZSkge1xuICAgICAgLy90aGlzIHNlbnNlcyBpZiB3ZSdyZSBjcm9zc2luZyBvdmVyIHRoZSBzdGFydCB0aW1lLCBpbiB3aGljaCBjYXNlIHdlIG11c3QgcmVjb3JkIF96VGltZSBhbmQgZm9yY2UgdGhlIHJlbmRlciwgYnV0IHdlIGRvIGl0IGluIHRoaXMgbGVuZ3RoeSBjb25kaXRpb25hbCB3YXkgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMgKHVzdWFsbHkgd2UgY2FuIHNraXAgdGhlIGNhbGN1bGF0aW9ucyk6IHRoaXMuX2luaXR0ZWQgJiYgKHRoaXMuX3pUaW1lIDwgMCkgIT09ICh0b3RhbFRpbWUgPCAwKVxuICAgICAgdGltZSA9IHRUaW1lO1xuICAgICAgdGltZWxpbmUgPSB0aGlzLnRpbWVsaW5lO1xuXG4gICAgICBpZiAodGhpcy5fcmVwZWF0KSB7XG4gICAgICAgIC8vYWRqdXN0IHRoZSB0aW1lIGZvciByZXBlYXRzIGFuZCB5b3lvc1xuICAgICAgICBjeWNsZUR1cmF0aW9uID0gZHVyICsgdGhpcy5fckRlbGF5O1xuXG4gICAgICAgIGlmICh0aGlzLl9yZXBlYXQgPCAtMSAmJiBpc05lZ2F0aXZlKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudG90YWxUaW1lKGN5Y2xlRHVyYXRpb24gKiAxMDAgKyB0b3RhbFRpbWUsIHN1cHByZXNzRXZlbnRzLCBmb3JjZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aW1lID0gX3JvdW5kUHJlY2lzZSh0VGltZSAlIGN5Y2xlRHVyYXRpb24pOyAvL3JvdW5kIHRvIGF2b2lkIGZsb2F0aW5nIHBvaW50IGVycm9ycy4gKDQgJSAwLjggc2hvdWxkIGJlIDAgYnV0IHNvbWUgYnJvd3NlcnMgcmVwb3J0IGl0IGFzIDAuNzk5OTk5OTkhKVxuXG4gICAgICAgIGlmICh0VGltZSA9PT0gdER1cikge1xuICAgICAgICAgIC8vIHRoZSB0RHVyID09PSB0VGltZSBpcyBmb3IgZWRnZSBjYXNlcyB3aGVyZSB0aGVyZSdzIGEgbGVuZ3RoeSBkZWNpbWFsIG9uIHRoZSBkdXJhdGlvbiBhbmQgaXQgbWF5IHJlYWNoIHRoZSB2ZXJ5IGVuZCBidXQgdGhlIHRpbWUgaXMgcmVuZGVyZWQgYXMgbm90LXF1aXRlLXRoZXJlIChyZW1lbWJlciwgdER1ciBpcyByb3VuZGVkIHRvIDQgZGVjaW1hbHMgd2hlcmVhcyBkdXIgaXNuJ3QpXG4gICAgICAgICAgaXRlcmF0aW9uID0gdGhpcy5fcmVwZWF0O1xuICAgICAgICAgIHRpbWUgPSBkdXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlcmF0aW9uID0gfn4odFRpbWUgLyBjeWNsZUR1cmF0aW9uKTtcblxuICAgICAgICAgIGlmIChpdGVyYXRpb24gJiYgaXRlcmF0aW9uID09PSB0VGltZSAvIGN5Y2xlRHVyYXRpb24pIHtcbiAgICAgICAgICAgIHRpbWUgPSBkdXI7XG4gICAgICAgICAgICBpdGVyYXRpb24tLTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aW1lID4gZHVyICYmICh0aW1lID0gZHVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlzWW95byA9IHRoaXMuX3lveW8gJiYgaXRlcmF0aW9uICYgMTtcblxuICAgICAgICBpZiAoaXNZb3lvKSB7XG4gICAgICAgICAgeW95b0Vhc2UgPSB0aGlzLl95RWFzZTtcbiAgICAgICAgICB0aW1lID0gZHVyIC0gdGltZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByZXZJdGVyYXRpb24gPSBfYW5pbWF0aW9uQ3ljbGUodGhpcy5fdFRpbWUsIGN5Y2xlRHVyYXRpb24pO1xuXG4gICAgICAgIGlmICh0aW1lID09PSBwcmV2VGltZSAmJiAhZm9yY2UgJiYgdGhpcy5faW5pdHRlZCkge1xuICAgICAgICAgIC8vY291bGQgYmUgZHVyaW5nIHRoZSByZXBlYXREZWxheSBwYXJ0LiBObyBuZWVkIHRvIHJlbmRlciBhbmQgZmlyZSBjYWxsYmFja3MuXG4gICAgICAgICAgdGhpcy5fdFRpbWUgPSB0VGltZTtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpdGVyYXRpb24gIT09IHByZXZJdGVyYXRpb24pIHtcbiAgICAgICAgICB0aW1lbGluZSAmJiB0aGlzLl95RWFzZSAmJiBfcHJvcGFnYXRlWW95b0Vhc2UodGltZWxpbmUsIGlzWW95byk7IC8vcmVwZWF0UmVmcmVzaCBmdW5jdGlvbmFsaXR5XG5cbiAgICAgICAgICBpZiAodGhpcy52YXJzLnJlcGVhdFJlZnJlc2ggJiYgIWlzWW95byAmJiAhdGhpcy5fbG9jaykge1xuICAgICAgICAgICAgdGhpcy5fbG9jayA9IGZvcmNlID0gMTsgLy9mb3JjZSwgb3RoZXJ3aXNlIGlmIGxhenkgaXMgdHJ1ZSwgdGhlIF9hdHRlbXB0SW5pdFR3ZWVuKCkgd2lsbCByZXR1cm4gYW5kIHdlJ2xsIGp1bXAgb3V0IGFuZCBnZXQgY2F1Z2h0IGJvdW5jaW5nIG9uIGVhY2ggdGljay5cblxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoX3JvdW5kUHJlY2lzZShjeWNsZUR1cmF0aW9uICogaXRlcmF0aW9uKSwgdHJ1ZSkuaW52YWxpZGF0ZSgpLl9sb2NrID0gMDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLl9pbml0dGVkKSB7XG4gICAgICAgIGlmIChfYXR0ZW1wdEluaXRUd2Vlbih0aGlzLCBpc05lZ2F0aXZlID8gdG90YWxUaW1lIDogdGltZSwgZm9yY2UsIHN1cHByZXNzRXZlbnRzLCB0VGltZSkpIHtcbiAgICAgICAgICB0aGlzLl90VGltZSA9IDA7IC8vIGluIGNvbnN0cnVjdG9yIGlmIGltbWVkaWF0ZVJlbmRlciBpcyB0cnVlLCB3ZSBzZXQgX3RUaW1lIHRvIC1fdGlueU51bSB0byBoYXZlIHRoZSBwbGF5aGVhZCBjcm9zcyB0aGUgc3RhcnRpbmcgcG9pbnQgYnV0IHdlIGNhbid0IGxlYXZlIF90VGltZSBhcyBhIG5lZ2F0aXZlIG51bWJlci5cblxuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByZXZUaW1lICE9PSB0aGlzLl90aW1lKSB7XG4gICAgICAgICAgLy8gcmFyZSBlZGdlIGNhc2UgLSBkdXJpbmcgaW5pdGlhbGl6YXRpb24sIGFuIG9uVXBkYXRlIGluIHRoZSBfc3RhcnRBdCAoLmZyb21UbygpKSBtaWdodCBmb3JjZSB0aGlzIHR3ZWVuIHRvIHJlbmRlciBhdCBhIGRpZmZlcmVudCBzcG90IGluIHdoaWNoIGNhc2Ugd2Ugc2hvdWxkIGRpdGNoIHRoaXMgcmVuZGVyKCkgY2FsbCBzbyB0aGF0IGl0IGRvZXNuJ3QgcmV2ZXJ0IHRoZSB2YWx1ZXMuXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZHVyICE9PSB0aGlzLl9kdXIpIHtcbiAgICAgICAgICAvLyB3aGlsZSBpbml0dGluZywgYSBwbHVnaW4gbGlrZSBJbmVydGlhUGx1Z2luIG1pZ2h0IGFsdGVyIHRoZSBkdXJhdGlvbiwgc28gcmVydW4gZnJvbSB0aGUgc3RhcnQgdG8gZW5zdXJlIGV2ZXJ5dGhpbmcgcmVuZGVycyBhcyBpdCBzaG91bGQuXG4gICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLl90VGltZSA9IHRUaW1lO1xuICAgICAgdGhpcy5fdGltZSA9IHRpbWU7XG5cbiAgICAgIGlmICghdGhpcy5fYWN0ICYmIHRoaXMuX3RzKSB7XG4gICAgICAgIHRoaXMuX2FjdCA9IDE7IC8vYXMgbG9uZyBhcyBpdCdzIG5vdCBwYXVzZWQsIGZvcmNlIGl0IHRvIGJlIGFjdGl2ZSBzbyB0aGF0IGlmIHRoZSB1c2VyIHJlbmRlcnMgaW5kZXBlbmRlbnQgb2YgdGhlIHBhcmVudCB0aW1lbGluZSwgaXQnbGwgYmUgZm9yY2VkIHRvIHJlLXJlbmRlciBvbiB0aGUgbmV4dCB0aWNrLlxuXG4gICAgICAgIHRoaXMuX2xhenkgPSAwO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJhdGlvID0gcmF0aW8gPSAoeW95b0Vhc2UgfHwgdGhpcy5fZWFzZSkodGltZSAvIGR1cik7XG5cbiAgICAgIGlmICh0aGlzLl9mcm9tKSB7XG4gICAgICAgIHRoaXMucmF0aW8gPSByYXRpbyA9IDEgLSByYXRpbztcbiAgICAgIH1cblxuICAgICAgaWYgKHRpbWUgJiYgIXByZXZUaW1lICYmICFzdXBwcmVzc0V2ZW50cyAmJiAhaXRlcmF0aW9uKSB7XG4gICAgICAgIF9jYWxsYmFjayh0aGlzLCBcIm9uU3RhcnRcIik7XG5cbiAgICAgICAgaWYgKHRoaXMuX3RUaW1lICE9PSB0VGltZSkge1xuICAgICAgICAgIC8vIGluIGNhc2UgdGhlIG9uU3RhcnQgdHJpZ2dlcmVkIGEgcmVuZGVyIGF0IGEgZGlmZmVyZW50IHNwb3QsIGVqZWN0LiBMaWtlIGlmIHNvbWVvbmUgZGlkIGFuaW1hdGlvbi5wYXVzZSgwLjUpIG9yIHNvbWV0aGluZyBpbnNpZGUgdGhlIG9uU3RhcnQuXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcHQgPSB0aGlzLl9wdDtcblxuICAgICAgd2hpbGUgKHB0KSB7XG4gICAgICAgIHB0LnIocmF0aW8sIHB0LmQpO1xuICAgICAgICBwdCA9IHB0Ll9uZXh0O1xuICAgICAgfVxuXG4gICAgICB0aW1lbGluZSAmJiB0aW1lbGluZS5yZW5kZXIodG90YWxUaW1lIDwgMCA/IHRvdGFsVGltZSA6ICF0aW1lICYmIGlzWW95byA/IC1fdGlueU51bSA6IHRpbWVsaW5lLl9kdXIgKiB0aW1lbGluZS5fZWFzZSh0aW1lIC8gdGhpcy5fZHVyKSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKSB8fCB0aGlzLl9zdGFydEF0ICYmICh0aGlzLl96VGltZSA9IHRvdGFsVGltZSk7XG5cbiAgICAgIGlmICh0aGlzLl9vblVwZGF0ZSAmJiAhc3VwcHJlc3NFdmVudHMpIHtcbiAgICAgICAgaXNOZWdhdGl2ZSAmJiBfcmV3aW5kU3RhcnRBdCh0aGlzLCB0b3RhbFRpbWUsIHN1cHByZXNzRXZlbnRzLCBmb3JjZSk7IC8vbm90ZTogZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMsIHdlIHR1Y2sgdGhpcyBjb25kaXRpb25hbCBsb2dpYyBpbnNpZGUgbGVzcyB0cmF2ZWxlZCBhcmVhcyAobW9zdCB0d2VlbnMgZG9uJ3QgaGF2ZSBhbiBvblVwZGF0ZSkuIFdlJ2QganVzdCBoYXZlIGl0IGF0IHRoZSBlbmQgYmVmb3JlIHRoZSBvbkNvbXBsZXRlLCBidXQgdGhlIHZhbHVlcyBzaG91bGQgYmUgdXBkYXRlZCBiZWZvcmUgYW55IG9uVXBkYXRlIGlzIGNhbGxlZCwgc28gd2UgQUxTTyBwdXQgaXQgaGVyZSBhbmQgdGhlbiBpZiBpdCdzIG5vdCBjYWxsZWQsIHdlIGRvIHNvIGxhdGVyIG5lYXIgdGhlIG9uQ29tcGxldGUuXG5cbiAgICAgICAgX2NhbGxiYWNrKHRoaXMsIFwib25VcGRhdGVcIik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3JlcGVhdCAmJiBpdGVyYXRpb24gIT09IHByZXZJdGVyYXRpb24gJiYgdGhpcy52YXJzLm9uUmVwZWF0ICYmICFzdXBwcmVzc0V2ZW50cyAmJiB0aGlzLnBhcmVudCAmJiBfY2FsbGJhY2sodGhpcywgXCJvblJlcGVhdFwiKTtcblxuICAgICAgaWYgKCh0VGltZSA9PT0gdGhpcy5fdER1ciB8fCAhdFRpbWUpICYmIHRoaXMuX3RUaW1lID09PSB0VGltZSkge1xuICAgICAgICBpc05lZ2F0aXZlICYmICF0aGlzLl9vblVwZGF0ZSAmJiBfcmV3aW5kU3RhcnRBdCh0aGlzLCB0b3RhbFRpbWUsIHRydWUsIHRydWUpO1xuICAgICAgICAodG90YWxUaW1lIHx8ICFkdXIpICYmICh0VGltZSA9PT0gdGhpcy5fdER1ciAmJiB0aGlzLl90cyA+IDAgfHwgIXRUaW1lICYmIHRoaXMuX3RzIDwgMCkgJiYgX3JlbW92ZUZyb21QYXJlbnQodGhpcywgMSk7IC8vIGRvbid0IHJlbW92ZSBpZiB3ZSdyZSByZW5kZXJpbmcgYXQgZXhhY3RseSBhIHRpbWUgb2YgMCwgYXMgdGhlcmUgY291bGQgYmUgYXV0b1JldmVydCB2YWx1ZXMgdGhhdCBzaG91bGQgZ2V0IHNldCBvbiB0aGUgbmV4dCB0aWNrIChpZiB0aGUgcGxheWhlYWQgZ29lcyBiYWNrd2FyZCBiZXlvbmQgdGhlIHN0YXJ0VGltZSwgbmVnYXRpdmUgdG90YWxUaW1lKS4gRG9uJ3QgcmVtb3ZlIGlmIHRoZSB0aW1lbGluZSBpcyByZXZlcnNlZCBhbmQgdGhlIHBsYXloZWFkIGlzbid0IGF0IDAsIG90aGVyd2lzZSB0bC5wcm9ncmVzcygxKS5yZXZlcnNlKCkgd29uJ3Qgd29yay4gT25seSByZW1vdmUgaWYgdGhlIHBsYXloZWFkIGlzIGF0IHRoZSBlbmQgYW5kIHRpbWVTY2FsZSBpcyBwb3NpdGl2ZSwgb3IgaWYgdGhlIHBsYXloZWFkIGlzIGF0IDAgYW5kIHRoZSB0aW1lU2NhbGUgaXMgbmVnYXRpdmUuXG5cbiAgICAgICAgaWYgKCFzdXBwcmVzc0V2ZW50cyAmJiAhKGlzTmVnYXRpdmUgJiYgIXByZXZUaW1lKSAmJiAodFRpbWUgfHwgcHJldlRpbWUgfHwgaXNZb3lvKSkge1xuICAgICAgICAgIC8vIGlmIHByZXZUaW1lIGFuZCB0VGltZSBhcmUgemVybywgd2Ugc2hvdWxkbid0IGZpcmUgdGhlIG9uUmV2ZXJzZUNvbXBsZXRlLiBUaGlzIGNvdWxkIGhhcHBlbiBpZiB5b3UgZ3NhcC50byguLi4ge3BhdXNlZDp0cnVlfSkucGxheSgpO1xuICAgICAgICAgIF9jYWxsYmFjayh0aGlzLCB0VGltZSA9PT0gdER1ciA/IFwib25Db21wbGV0ZVwiIDogXCJvblJldmVyc2VDb21wbGV0ZVwiLCB0cnVlKTtcblxuICAgICAgICAgIHRoaXMuX3Byb20gJiYgISh0VGltZSA8IHREdXIgJiYgdGhpcy50aW1lU2NhbGUoKSA+IDApICYmIHRoaXMuX3Byb20oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90bzMudGFyZ2V0cyA9IGZ1bmN0aW9uIHRhcmdldHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RhcmdldHM7XG4gIH07XG5cbiAgX3Byb3RvMy5pbnZhbGlkYXRlID0gZnVuY3Rpb24gaW52YWxpZGF0ZShzb2Z0KSB7XG4gICAgLy8gXCJzb2Z0XCIgZ2l2ZXMgdXMgYSB3YXkgdG8gY2xlYXIgb3V0IGV2ZXJ5dGhpbmcgRVhDRVBUIHRoZSByZWNvcmRlZCBwcmUtXCJmcm9tXCIgcG9ydGlvbiBvZiBmcm9tKCkgdHdlZW5zLiBPdGhlcndpc2UsIGZvciBleGFtcGxlLCBpZiB5b3UgdHdlZW4ucHJvZ3Jlc3MoMSkucmVuZGVyKDAsIHRydWUgdHJ1ZSkuaW52YWxpZGF0ZSgpLCB0aGUgXCJmcm9tXCIgdmFsdWVzIHdvdWxkIHBlcnNpc3QgYW5kIHRoZW4gb24gdGhlIG5leHQgcmVuZGVyLCB0aGUgZnJvbSgpIHR3ZWVucyB3b3VsZCBpbml0aWFsaXplIGFuZCB0aGUgY3VycmVudCB2YWx1ZSB3b3VsZCBtYXRjaCB0aGUgXCJmcm9tXCIgdmFsdWVzLCB0aHVzIGFuaW1hdGUgZnJvbSB0aGUgc2FtZSB2YWx1ZSB0byB0aGUgc2FtZSB2YWx1ZSAobm8gYW5pbWF0aW9uKS4gV2UgdGFwIGludG8gdGhpcyBpbiBTY3JvbGxUcmlnZ2VyJ3MgcmVmcmVzaCgpIHdoZXJlIHdlIG11c3QgcHVzaCBhIHR3ZWVuIHRvIGNvbXBsZXRpb24gYW5kIHRoZW4gYmFjayBhZ2FpbiBidXQgaG9ub3IgaXRzIGluaXQgc3RhdGUgaW4gY2FzZSB0aGUgdHdlZW4gaXMgZGVwZW5kZW50IG9uIGFub3RoZXIgdHdlZW4gZnVydGhlciB1cCBvbiB0aGUgcGFnZS5cbiAgICAoIXNvZnQgfHwgIXRoaXMudmFycy5ydW5CYWNrd2FyZHMpICYmICh0aGlzLl9zdGFydEF0ID0gMCk7XG4gICAgdGhpcy5fcHQgPSB0aGlzLl9vcCA9IHRoaXMuX29uVXBkYXRlID0gdGhpcy5fbGF6eSA9IHRoaXMucmF0aW8gPSAwO1xuICAgIHRoaXMuX3B0TG9va3VwID0gW107XG4gICAgdGhpcy50aW1lbGluZSAmJiB0aGlzLnRpbWVsaW5lLmludmFsaWRhdGUoc29mdCk7XG4gICAgcmV0dXJuIF9BbmltYXRpb24yLnByb3RvdHlwZS5pbnZhbGlkYXRlLmNhbGwodGhpcywgc29mdCk7XG4gIH07XG5cbiAgX3Byb3RvMy5yZXNldFRvID0gZnVuY3Rpb24gcmVzZXRUbyhwcm9wZXJ0eSwgdmFsdWUsIHN0YXJ0LCBzdGFydElzUmVsYXRpdmUpIHtcbiAgICBfdGlja2VyQWN0aXZlIHx8IF90aWNrZXIud2FrZSgpO1xuICAgIHRoaXMuX3RzIHx8IHRoaXMucGxheSgpO1xuICAgIHZhciB0aW1lID0gTWF0aC5taW4odGhpcy5fZHVyLCAodGhpcy5fZHAuX3RpbWUgLSB0aGlzLl9zdGFydCkgKiB0aGlzLl90cyksXG4gICAgICAgIHJhdGlvO1xuICAgIHRoaXMuX2luaXR0ZWQgfHwgX2luaXRUd2Vlbih0aGlzLCB0aW1lKTtcbiAgICByYXRpbyA9IHRoaXMuX2Vhc2UodGltZSAvIHRoaXMuX2R1cik7IC8vIGRvbid0IGp1c3QgZ2V0IHR3ZWVuLnJhdGlvIGJlY2F1c2UgaXQgbWF5IG5vdCBoYXZlIHJlbmRlcmVkIHlldC5cbiAgICAvLyBwb3NzaWJsZSBmdXR1cmUgYWRkaXRpb24gdG8gYWxsb3cgYW4gb2JqZWN0IHdpdGggbXVsdGlwbGUgdmFsdWVzIHRvIHVwZGF0ZSwgbGlrZSB0d2Vlbi5yZXNldFRvKHt4OiAxMDAsIHk6IDIwMH0pOyBBdCB0aGlzIHBvaW50LCBpdCBkb2Vzbid0IHNlZW0gd29ydGggdGhlIGFkZGVkIGtiIGdpdmVuIHRoZSBmYWN0IHRoYXQgbW9zdCB1c2VycyB3aWxsIGxpa2VseSBvcHQgZm9yIHRoZSBjb252ZW5pZW50IGdzYXAucXVpY2tUbygpIHdheSBvZiBpbnRlcmFjdGluZyB3aXRoIHRoaXMgbWV0aG9kLlxuICAgIC8vIGlmIChfaXNPYmplY3QocHJvcGVydHkpKSB7IC8vIHBlcmZvcm1hbmNlIG9wdGltaXphdGlvblxuICAgIC8vIFx0Zm9yIChwIGluIHByb3BlcnR5KSB7XG4gICAgLy8gXHRcdGlmIChfdXBkYXRlUHJvcFR3ZWVucyh0aGlzLCBwLCBwcm9wZXJ0eVtwXSwgdmFsdWUgPyB2YWx1ZVtwXSA6IG51bGwsIHN0YXJ0LCByYXRpbywgdGltZSkpIHtcbiAgICAvLyBcdFx0XHRyZXR1cm4gdGhpcy5yZXNldFRvKHByb3BlcnR5LCB2YWx1ZSwgc3RhcnQsIHN0YXJ0SXNSZWxhdGl2ZSk7IC8vIGlmIGEgUHJvcFR3ZWVuIHdhc24ndCBmb3VuZCBmb3IgdGhlIHByb3BlcnR5LCBpdCdsbCBnZXQgZm9yY2VkIHdpdGggYSByZS1pbml0aWFsaXphdGlvbiBzbyB3ZSBuZWVkIHRvIGp1bXAgb3V0IGFuZCBzdGFydCBvdmVyIGFnYWluLlxuICAgIC8vIFx0XHR9XG4gICAgLy8gXHR9XG4gICAgLy8gfSBlbHNlIHtcblxuICAgIGlmIChfdXBkYXRlUHJvcFR3ZWVucyh0aGlzLCBwcm9wZXJ0eSwgdmFsdWUsIHN0YXJ0LCBzdGFydElzUmVsYXRpdmUsIHJhdGlvLCB0aW1lKSkge1xuICAgICAgcmV0dXJuIHRoaXMucmVzZXRUbyhwcm9wZXJ0eSwgdmFsdWUsIHN0YXJ0LCBzdGFydElzUmVsYXRpdmUpOyAvLyBpZiBhIFByb3BUd2VlbiB3YXNuJ3QgZm91bmQgZm9yIHRoZSBwcm9wZXJ0eSwgaXQnbGwgZ2V0IGZvcmNlZCB3aXRoIGEgcmUtaW5pdGlhbGl6YXRpb24gc28gd2UgbmVlZCB0byBqdW1wIG91dCBhbmQgc3RhcnQgb3ZlciBhZ2Fpbi5cbiAgICB9IC8vfVxuXG5cbiAgICBfYWxpZ25QbGF5aGVhZCh0aGlzLCAwKTtcblxuICAgIHRoaXMucGFyZW50IHx8IF9hZGRMaW5rZWRMaXN0SXRlbSh0aGlzLl9kcCwgdGhpcywgXCJfZmlyc3RcIiwgXCJfbGFzdFwiLCB0aGlzLl9kcC5fc29ydCA/IFwiX3N0YXJ0XCIgOiAwKTtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXIoMCk7XG4gIH07XG5cbiAgX3Byb3RvMy5raWxsID0gZnVuY3Rpb24ga2lsbCh0YXJnZXRzLCB2YXJzKSB7XG4gICAgaWYgKHZhcnMgPT09IHZvaWQgMCkge1xuICAgICAgdmFycyA9IFwiYWxsXCI7XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXRzICYmICghdmFycyB8fCB2YXJzID09PSBcImFsbFwiKSkge1xuICAgICAgdGhpcy5fbGF6eSA9IHRoaXMuX3B0ID0gMDtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudCA/IF9pbnRlcnJ1cHQodGhpcykgOiB0aGlzO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnRpbWVsaW5lKSB7XG4gICAgICB2YXIgdER1ciA9IHRoaXMudGltZWxpbmUudG90YWxEdXJhdGlvbigpO1xuICAgICAgdGhpcy50aW1lbGluZS5raWxsVHdlZW5zT2YodGFyZ2V0cywgdmFycywgX292ZXJ3cml0aW5nVHdlZW4gJiYgX292ZXJ3cml0aW5nVHdlZW4udmFycy5vdmVyd3JpdGUgIT09IHRydWUpLl9maXJzdCB8fCBfaW50ZXJydXB0KHRoaXMpOyAvLyBpZiBub3RoaW5nIGlzIGxlZnQgdHdlZW5pbmcsIGludGVycnVwdC5cblxuICAgICAgdGhpcy5wYXJlbnQgJiYgdER1ciAhPT0gdGhpcy50aW1lbGluZS50b3RhbER1cmF0aW9uKCkgJiYgX3NldER1cmF0aW9uKHRoaXMsIHRoaXMuX2R1ciAqIHRoaXMudGltZWxpbmUuX3REdXIgLyB0RHVyLCAwLCAxKTsgLy8gaWYgYSBuZXN0ZWQgdHdlZW4gaXMga2lsbGVkIHRoYXQgY2hhbmdlcyB0aGUgZHVyYXRpb24sIGl0IHNob3VsZCBhZmZlY3QgdGhpcyB0d2VlbidzIGR1cmF0aW9uLiBXZSBtdXN0IHVzZSB0aGUgcmF0aW8sIHRob3VnaCwgYmVjYXVzZSBzb21ldGltZXMgdGhlIGludGVybmFsIHRpbWVsaW5lIGlzIHN0cmV0Y2hlZCBsaWtlIGZvciBrZXlmcmFtZXMgd2hlcmUgdGhleSBkb24ndCBhbGwgYWRkIHVwIHRvIHdoYXRldmVyIHRoZSBwYXJlbnQgdHdlZW4ncyBkdXJhdGlvbiB3YXMgc2V0IHRvLlxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB2YXIgcGFyc2VkVGFyZ2V0cyA9IHRoaXMuX3RhcmdldHMsXG4gICAgICAgIGtpbGxpbmdUYXJnZXRzID0gdGFyZ2V0cyA/IHRvQXJyYXkodGFyZ2V0cykgOiBwYXJzZWRUYXJnZXRzLFxuICAgICAgICBwcm9wVHdlZW5Mb29rdXAgPSB0aGlzLl9wdExvb2t1cCxcbiAgICAgICAgZmlyc3RQVCA9IHRoaXMuX3B0LFxuICAgICAgICBvdmVyd3JpdHRlblByb3BzLFxuICAgICAgICBjdXJMb29rdXAsXG4gICAgICAgIGN1ck92ZXJ3cml0ZVByb3BzLFxuICAgICAgICBwcm9wcyxcbiAgICAgICAgcCxcbiAgICAgICAgcHQsXG4gICAgICAgIGk7XG5cbiAgICBpZiAoKCF2YXJzIHx8IHZhcnMgPT09IFwiYWxsXCIpICYmIF9hcnJheXNNYXRjaChwYXJzZWRUYXJnZXRzLCBraWxsaW5nVGFyZ2V0cykpIHtcbiAgICAgIHZhcnMgPT09IFwiYWxsXCIgJiYgKHRoaXMuX3B0ID0gMCk7XG4gICAgICByZXR1cm4gX2ludGVycnVwdCh0aGlzKTtcbiAgICB9XG5cbiAgICBvdmVyd3JpdHRlblByb3BzID0gdGhpcy5fb3AgPSB0aGlzLl9vcCB8fCBbXTtcblxuICAgIGlmICh2YXJzICE9PSBcImFsbFwiKSB7XG4gICAgICAvL3NvIHBlb3BsZSBjYW4gcGFzcyBpbiBhIGNvbW1hLWRlbGltaXRlZCBsaXN0IG9mIHByb3BlcnR5IG5hbWVzXG4gICAgICBpZiAoX2lzU3RyaW5nKHZhcnMpKSB7XG4gICAgICAgIHAgPSB7fTtcblxuICAgICAgICBfZm9yRWFjaE5hbWUodmFycywgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gcFtuYW1lXSA9IDE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhcnMgPSBwO1xuICAgICAgfVxuXG4gICAgICB2YXJzID0gX2FkZEFsaWFzZXNUb1ZhcnMocGFyc2VkVGFyZ2V0cywgdmFycyk7XG4gICAgfVxuXG4gICAgaSA9IHBhcnNlZFRhcmdldHMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaWYgKH5raWxsaW5nVGFyZ2V0cy5pbmRleE9mKHBhcnNlZFRhcmdldHNbaV0pKSB7XG4gICAgICAgIGN1ckxvb2t1cCA9IHByb3BUd2Vlbkxvb2t1cFtpXTtcblxuICAgICAgICBpZiAodmFycyA9PT0gXCJhbGxcIikge1xuICAgICAgICAgIG92ZXJ3cml0dGVuUHJvcHNbaV0gPSB2YXJzO1xuICAgICAgICAgIHByb3BzID0gY3VyTG9va3VwO1xuICAgICAgICAgIGN1ck92ZXJ3cml0ZVByb3BzID0ge307XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3VyT3ZlcndyaXRlUHJvcHMgPSBvdmVyd3JpdHRlblByb3BzW2ldID0gb3ZlcndyaXR0ZW5Qcm9wc1tpXSB8fCB7fTtcbiAgICAgICAgICBwcm9wcyA9IHZhcnM7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHAgaW4gcHJvcHMpIHtcbiAgICAgICAgICBwdCA9IGN1ckxvb2t1cCAmJiBjdXJMb29rdXBbcF07XG5cbiAgICAgICAgICBpZiAocHQpIHtcbiAgICAgICAgICAgIGlmICghKFwia2lsbFwiIGluIHB0LmQpIHx8IHB0LmQua2lsbChwKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBfcmVtb3ZlTGlua2VkTGlzdEl0ZW0odGhpcywgcHQsIFwiX3B0XCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWxldGUgY3VyTG9va3VwW3BdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjdXJPdmVyd3JpdGVQcm9wcyAhPT0gXCJhbGxcIikge1xuICAgICAgICAgICAgY3VyT3ZlcndyaXRlUHJvcHNbcF0gPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2luaXR0ZWQgJiYgIXRoaXMuX3B0ICYmIGZpcnN0UFQgJiYgX2ludGVycnVwdCh0aGlzKTsgLy9pZiBhbGwgdHdlZW5pbmcgcHJvcGVydGllcyBhcmUga2lsbGVkLCBraWxsIHRoZSB0d2Vlbi4gV2l0aG91dCB0aGlzIGxpbmUsIGlmIHRoZXJlJ3MgYSB0d2VlbiB3aXRoIG11bHRpcGxlIHRhcmdldHMgYW5kIHRoZW4geW91IGtpbGxUd2VlbnNPZigpIGVhY2ggdGFyZ2V0IGluZGl2aWR1YWxseSwgdGhlIHR3ZWVuIHdvdWxkIHRlY2huaWNhbGx5IHN0aWxsIHJlbWFpbiBhY3RpdmUgYW5kIGZpcmUgaXRzIG9uQ29tcGxldGUgZXZlbiB0aG91Z2ggdGhlcmUgYXJlbid0IGFueSBtb3JlIHByb3BlcnRpZXMgdHdlZW5pbmcuXG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBUd2Vlbi50byA9IGZ1bmN0aW9uIHRvKHRhcmdldHMsIHZhcnMpIHtcbiAgICByZXR1cm4gbmV3IFR3ZWVuKHRhcmdldHMsIHZhcnMsIGFyZ3VtZW50c1syXSk7XG4gIH07XG5cbiAgVHdlZW4uZnJvbSA9IGZ1bmN0aW9uIGZyb20odGFyZ2V0cywgdmFycykge1xuICAgIHJldHVybiBfY3JlYXRlVHdlZW5UeXBlKDEsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgVHdlZW4uZGVsYXllZENhbGwgPSBmdW5jdGlvbiBkZWxheWVkQ2FsbChkZWxheSwgY2FsbGJhY2ssIHBhcmFtcywgc2NvcGUpIHtcbiAgICByZXR1cm4gbmV3IFR3ZWVuKGNhbGxiYWNrLCAwLCB7XG4gICAgICBpbW1lZGlhdGVSZW5kZXI6IGZhbHNlLFxuICAgICAgbGF6eTogZmFsc2UsXG4gICAgICBvdmVyd3JpdGU6IGZhbHNlLFxuICAgICAgZGVsYXk6IGRlbGF5LFxuICAgICAgb25Db21wbGV0ZTogY2FsbGJhY2ssXG4gICAgICBvblJldmVyc2VDb21wbGV0ZTogY2FsbGJhY2ssXG4gICAgICBvbkNvbXBsZXRlUGFyYW1zOiBwYXJhbXMsXG4gICAgICBvblJldmVyc2VDb21wbGV0ZVBhcmFtczogcGFyYW1zLFxuICAgICAgY2FsbGJhY2tTY29wZTogc2NvcGVcbiAgICB9KTsgLy8gd2UgbXVzdCB1c2Ugb25SZXZlcnNlQ29tcGxldGUgdG9vIGZvciB0aGluZ3MgbGlrZSB0aW1lbGluZS5hZGQoKCkgPT4gey4uLn0pIHdoaWNoIHNob3VsZCBiZSB0cmlnZ2VyZWQgaW4gQk9USCBkaXJlY3Rpb25zIChmb3J3YXJkIGFuZCByZXZlcnNlKVxuICB9O1xuXG4gIFR3ZWVuLmZyb21UbyA9IGZ1bmN0aW9uIGZyb21Ubyh0YXJnZXRzLCBmcm9tVmFycywgdG9WYXJzKSB7XG4gICAgcmV0dXJuIF9jcmVhdGVUd2VlblR5cGUoMiwgYXJndW1lbnRzKTtcbiAgfTtcblxuICBUd2Vlbi5zZXQgPSBmdW5jdGlvbiBzZXQodGFyZ2V0cywgdmFycykge1xuICAgIHZhcnMuZHVyYXRpb24gPSAwO1xuICAgIHZhcnMucmVwZWF0RGVsYXkgfHwgKHZhcnMucmVwZWF0ID0gMCk7XG4gICAgcmV0dXJuIG5ldyBUd2Vlbih0YXJnZXRzLCB2YXJzKTtcbiAgfTtcblxuICBUd2Vlbi5raWxsVHdlZW5zT2YgPSBmdW5jdGlvbiBraWxsVHdlZW5zT2YodGFyZ2V0cywgcHJvcHMsIG9ubHlBY3RpdmUpIHtcbiAgICByZXR1cm4gX2dsb2JhbFRpbWVsaW5lLmtpbGxUd2VlbnNPZih0YXJnZXRzLCBwcm9wcywgb25seUFjdGl2ZSk7XG4gIH07XG5cbiAgcmV0dXJuIFR3ZWVuO1xufShBbmltYXRpb24pO1xuXG5fc2V0RGVmYXVsdHMoVHdlZW4ucHJvdG90eXBlLCB7XG4gIF90YXJnZXRzOiBbXSxcbiAgX2xhenk6IDAsXG4gIF9zdGFydEF0OiAwLFxuICBfb3A6IDAsXG4gIF9vbkluaXQ6IDBcbn0pOyAvL2FkZCB0aGUgcGVydGluZW50IHRpbWVsaW5lIG1ldGhvZHMgdG8gVHdlZW4gaW5zdGFuY2VzIHNvIHRoYXQgdXNlcnMgY2FuIGNoYWluIGNvbnZlbmllbnRseSBhbmQgY3JlYXRlIGEgdGltZWxpbmUgYXV0b21hdGljYWxseS4gKHJlbW92ZWQgZHVlIHRvIGNvbmNlcm5zIHRoYXQgaXQnZCB1bHRpbWF0ZWx5IGFkZCB0byBtb3JlIGNvbmZ1c2lvbiBlc3BlY2lhbGx5IGZvciBiZWdpbm5lcnMpXG4vLyBfZm9yRWFjaE5hbWUoXCJ0byxmcm9tLGZyb21UbyxzZXQsY2FsbCxhZGQsYWRkTGFiZWwsYWRkUGF1c2VcIiwgbmFtZSA9PiB7XG4vLyBcdFR3ZWVuLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xuLy8gXHRcdGxldCB0bCA9IG5ldyBUaW1lbGluZSgpO1xuLy8gXHRcdHJldHVybiBfYWRkVG9UaW1lbGluZSh0bCwgdGhpcylbbmFtZV0uYXBwbHkodGwsIHRvQXJyYXkoYXJndW1lbnRzKSk7XG4vLyBcdH1cbi8vIH0pO1xuLy9mb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eS4gTGV2ZXJhZ2UgdGhlIHRpbWVsaW5lIGNhbGxzLlxuXG5cbl9mb3JFYWNoTmFtZShcInN0YWdnZXJUbyxzdGFnZ2VyRnJvbSxzdGFnZ2VyRnJvbVRvXCIsIGZ1bmN0aW9uIChuYW1lKSB7XG4gIFR3ZWVuW25hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0bCA9IG5ldyBUaW1lbGluZSgpLFxuICAgICAgICBwYXJhbXMgPSBfc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuXG4gICAgcGFyYW1zLnNwbGljZShuYW1lID09PSBcInN0YWdnZXJGcm9tVG9cIiA/IDUgOiA0LCAwLCAwKTtcbiAgICByZXR1cm4gdGxbbmFtZV0uYXBwbHkodGwsIHBhcmFtcyk7XG4gIH07XG59KTtcbi8qXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogUFJPUFRXRUVOXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cblxudmFyIF9zZXR0ZXJQbGFpbiA9IGZ1bmN0aW9uIF9zZXR0ZXJQbGFpbih0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSkge1xuICByZXR1cm4gdGFyZ2V0W3Byb3BlcnR5XSA9IHZhbHVlO1xufSxcbiAgICBfc2V0dGVyRnVuYyA9IGZ1bmN0aW9uIF9zZXR0ZXJGdW5jKHRhcmdldCwgcHJvcGVydHksIHZhbHVlKSB7XG4gIHJldHVybiB0YXJnZXRbcHJvcGVydHldKHZhbHVlKTtcbn0sXG4gICAgX3NldHRlckZ1bmNXaXRoUGFyYW0gPSBmdW5jdGlvbiBfc2V0dGVyRnVuY1dpdGhQYXJhbSh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSwgZGF0YSkge1xuICByZXR1cm4gdGFyZ2V0W3Byb3BlcnR5XShkYXRhLmZwLCB2YWx1ZSk7XG59LFxuICAgIF9zZXR0ZXJBdHRyaWJ1dGUgPSBmdW5jdGlvbiBfc2V0dGVyQXR0cmlidXRlKHRhcmdldCwgcHJvcGVydHksIHZhbHVlKSB7XG4gIHJldHVybiB0YXJnZXQuc2V0QXR0cmlidXRlKHByb3BlcnR5LCB2YWx1ZSk7XG59LFxuICAgIF9nZXRTZXR0ZXIgPSBmdW5jdGlvbiBfZ2V0U2V0dGVyKHRhcmdldCwgcHJvcGVydHkpIHtcbiAgcmV0dXJuIF9pc0Z1bmN0aW9uKHRhcmdldFtwcm9wZXJ0eV0pID8gX3NldHRlckZ1bmMgOiBfaXNVbmRlZmluZWQodGFyZ2V0W3Byb3BlcnR5XSkgJiYgdGFyZ2V0LnNldEF0dHJpYnV0ZSA/IF9zZXR0ZXJBdHRyaWJ1dGUgOiBfc2V0dGVyUGxhaW47XG59LFxuICAgIF9yZW5kZXJQbGFpbiA9IGZ1bmN0aW9uIF9yZW5kZXJQbGFpbihyYXRpbywgZGF0YSkge1xuICByZXR1cm4gZGF0YS5zZXQoZGF0YS50LCBkYXRhLnAsIE1hdGgucm91bmQoKGRhdGEucyArIGRhdGEuYyAqIHJhdGlvKSAqIDEwMDAwMDApIC8gMTAwMDAwMCwgZGF0YSk7XG59LFxuICAgIF9yZW5kZXJCb29sZWFuID0gZnVuY3Rpb24gX3JlbmRlckJvb2xlYW4ocmF0aW8sIGRhdGEpIHtcbiAgcmV0dXJuIGRhdGEuc2V0KGRhdGEudCwgZGF0YS5wLCAhIShkYXRhLnMgKyBkYXRhLmMgKiByYXRpbyksIGRhdGEpO1xufSxcbiAgICBfcmVuZGVyQ29tcGxleFN0cmluZyA9IGZ1bmN0aW9uIF9yZW5kZXJDb21wbGV4U3RyaW5nKHJhdGlvLCBkYXRhKSB7XG4gIHZhciBwdCA9IGRhdGEuX3B0LFxuICAgICAgcyA9IFwiXCI7XG5cbiAgaWYgKCFyYXRpbyAmJiBkYXRhLmIpIHtcbiAgICAvL2IgPSBiZWdpbm5pbmcgc3RyaW5nXG4gICAgcyA9IGRhdGEuYjtcbiAgfSBlbHNlIGlmIChyYXRpbyA9PT0gMSAmJiBkYXRhLmUpIHtcbiAgICAvL2UgPSBlbmRpbmcgc3RyaW5nXG4gICAgcyA9IGRhdGEuZTtcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAocHQpIHtcbiAgICAgIHMgPSBwdC5wICsgKHB0Lm0gPyBwdC5tKHB0LnMgKyBwdC5jICogcmF0aW8pIDogTWF0aC5yb3VuZCgocHQucyArIHB0LmMgKiByYXRpbykgKiAxMDAwMCkgLyAxMDAwMCkgKyBzOyAvL3dlIHVzZSB0aGUgXCJwXCIgcHJvcGVydHkgZm9yIHRoZSB0ZXh0IGluYmV0d2VlbiAobGlrZSBhIHN1ZmZpeCkuIEFuZCBpbiB0aGUgY29udGV4dCBvZiBhIGNvbXBsZXggc3RyaW5nLCB0aGUgbW9kaWZpZXIgKG0pIGlzIHR5cGljYWxseSBqdXN0IE1hdGgucm91bmQoKSwgbGlrZSBmb3IgUkdCIGNvbG9ycy5cblxuICAgICAgcHQgPSBwdC5fbmV4dDtcbiAgICB9XG5cbiAgICBzICs9IGRhdGEuYzsgLy93ZSB1c2UgdGhlIFwiY1wiIG9mIHRoZSBQcm9wVHdlZW4gdG8gc3RvcmUgdGhlIGZpbmFsIGNodW5rIG9mIG5vbi1udW1lcmljIHRleHQuXG4gIH1cblxuICBkYXRhLnNldChkYXRhLnQsIGRhdGEucCwgcywgZGF0YSk7XG59LFxuICAgIF9yZW5kZXJQcm9wVHdlZW5zID0gZnVuY3Rpb24gX3JlbmRlclByb3BUd2VlbnMocmF0aW8sIGRhdGEpIHtcbiAgdmFyIHB0ID0gZGF0YS5fcHQ7XG5cbiAgd2hpbGUgKHB0KSB7XG4gICAgcHQucihyYXRpbywgcHQuZCk7XG4gICAgcHQgPSBwdC5fbmV4dDtcbiAgfVxufSxcbiAgICBfYWRkUGx1Z2luTW9kaWZpZXIgPSBmdW5jdGlvbiBfYWRkUGx1Z2luTW9kaWZpZXIobW9kaWZpZXIsIHR3ZWVuLCB0YXJnZXQsIHByb3BlcnR5KSB7XG4gIHZhciBwdCA9IHRoaXMuX3B0LFxuICAgICAgbmV4dDtcblxuICB3aGlsZSAocHQpIHtcbiAgICBuZXh0ID0gcHQuX25leHQ7XG4gICAgcHQucCA9PT0gcHJvcGVydHkgJiYgcHQubW9kaWZpZXIobW9kaWZpZXIsIHR3ZWVuLCB0YXJnZXQpO1xuICAgIHB0ID0gbmV4dDtcbiAgfVxufSxcbiAgICBfa2lsbFByb3BUd2VlbnNPZiA9IGZ1bmN0aW9uIF9raWxsUHJvcFR3ZWVuc09mKHByb3BlcnR5KSB7XG4gIHZhciBwdCA9IHRoaXMuX3B0LFxuICAgICAgaGFzTm9uRGVwZW5kZW50UmVtYWluaW5nLFxuICAgICAgbmV4dDtcblxuICB3aGlsZSAocHQpIHtcbiAgICBuZXh0ID0gcHQuX25leHQ7XG5cbiAgICBpZiAocHQucCA9PT0gcHJvcGVydHkgJiYgIXB0Lm9wIHx8IHB0Lm9wID09PSBwcm9wZXJ0eSkge1xuICAgICAgX3JlbW92ZUxpbmtlZExpc3RJdGVtKHRoaXMsIHB0LCBcIl9wdFwiKTtcbiAgICB9IGVsc2UgaWYgKCFwdC5kZXApIHtcbiAgICAgIGhhc05vbkRlcGVuZGVudFJlbWFpbmluZyA9IDE7XG4gICAgfVxuXG4gICAgcHQgPSBuZXh0O1xuICB9XG5cbiAgcmV0dXJuICFoYXNOb25EZXBlbmRlbnRSZW1haW5pbmc7XG59LFxuICAgIF9zZXR0ZXJXaXRoTW9kaWZpZXIgPSBmdW5jdGlvbiBfc2V0dGVyV2l0aE1vZGlmaWVyKHRhcmdldCwgcHJvcGVydHksIHZhbHVlLCBkYXRhKSB7XG4gIGRhdGEubVNldCh0YXJnZXQsIHByb3BlcnR5LCBkYXRhLm0uY2FsbChkYXRhLnR3ZWVuLCB2YWx1ZSwgZGF0YS5tdCksIGRhdGEpO1xufSxcbiAgICBfc29ydFByb3BUd2VlbnNCeVByaW9yaXR5ID0gZnVuY3Rpb24gX3NvcnRQcm9wVHdlZW5zQnlQcmlvcml0eShwYXJlbnQpIHtcbiAgdmFyIHB0ID0gcGFyZW50Ll9wdCxcbiAgICAgIG5leHQsXG4gICAgICBwdDIsXG4gICAgICBmaXJzdCxcbiAgICAgIGxhc3Q7IC8vc29ydHMgdGhlIFByb3BUd2VlbiBsaW5rZWQgbGlzdCBpbiBvcmRlciBvZiBwcmlvcml0eSBiZWNhdXNlIHNvbWUgcGx1Z2lucyBuZWVkIHRvIGRvIHRoZWlyIHdvcmsgYWZ0ZXIgQUxMIG9mIHRoZSBQcm9wVHdlZW5zIHdlcmUgY3JlYXRlZCAobGlrZSBSb3VuZFByb3BzUGx1Z2luIGFuZCBNb2RpZmllcnNQbHVnaW4pXG5cbiAgd2hpbGUgKHB0KSB7XG4gICAgbmV4dCA9IHB0Ll9uZXh0O1xuICAgIHB0MiA9IGZpcnN0O1xuXG4gICAgd2hpbGUgKHB0MiAmJiBwdDIucHIgPiBwdC5wcikge1xuICAgICAgcHQyID0gcHQyLl9uZXh0O1xuICAgIH1cblxuICAgIGlmIChwdC5fcHJldiA9IHB0MiA/IHB0Mi5fcHJldiA6IGxhc3QpIHtcbiAgICAgIHB0Ll9wcmV2Ll9uZXh0ID0gcHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpcnN0ID0gcHQ7XG4gICAgfVxuXG4gICAgaWYgKHB0Ll9uZXh0ID0gcHQyKSB7XG4gICAgICBwdDIuX3ByZXYgPSBwdDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGFzdCA9IHB0O1xuICAgIH1cblxuICAgIHB0ID0gbmV4dDtcbiAgfVxuXG4gIHBhcmVudC5fcHQgPSBmaXJzdDtcbn07IC8vUHJvcFR3ZWVuIGtleTogdCA9IHRhcmdldCwgcCA9IHByb3AsIHIgPSByZW5kZXJlciwgZCA9IGRhdGEsIHMgPSBzdGFydCwgYyA9IGNoYW5nZSwgb3AgPSBvdmVyd3JpdGVQcm9wZXJ0eSAoT05MWSBwb3B1bGF0ZWQgd2hlbiBpdCdzIGRpZmZlcmVudCB0aGFuIHApLCBwciA9IHByaW9yaXR5LCBfbmV4dC9fcHJldiBmb3IgdGhlIGxpbmtlZCBsaXN0IHNpYmxpbmdzLCBzZXQgPSBzZXR0ZXIsIG0gPSBtb2RpZmllciwgbVNldCA9IG1vZGlmaWVyU2V0dGVyICh0aGUgb3JpZ2luYWwgc2V0dGVyLCBiZWZvcmUgYSBtb2RpZmllciB3YXMgYWRkZWQpXG5cblxuZXhwb3J0IHZhciBQcm9wVHdlZW4gPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBQcm9wVHdlZW4obmV4dCwgdGFyZ2V0LCBwcm9wLCBzdGFydCwgY2hhbmdlLCByZW5kZXJlciwgZGF0YSwgc2V0dGVyLCBwcmlvcml0eSkge1xuICAgIHRoaXMudCA9IHRhcmdldDtcbiAgICB0aGlzLnMgPSBzdGFydDtcbiAgICB0aGlzLmMgPSBjaGFuZ2U7XG4gICAgdGhpcy5wID0gcHJvcDtcbiAgICB0aGlzLnIgPSByZW5kZXJlciB8fCBfcmVuZGVyUGxhaW47XG4gICAgdGhpcy5kID0gZGF0YSB8fCB0aGlzO1xuICAgIHRoaXMuc2V0ID0gc2V0dGVyIHx8IF9zZXR0ZXJQbGFpbjtcbiAgICB0aGlzLnByID0gcHJpb3JpdHkgfHwgMDtcbiAgICB0aGlzLl9uZXh0ID0gbmV4dDtcblxuICAgIGlmIChuZXh0KSB7XG4gICAgICBuZXh0Ll9wcmV2ID0gdGhpcztcbiAgICB9XG4gIH1cblxuICB2YXIgX3Byb3RvNCA9IFByb3BUd2Vlbi5wcm90b3R5cGU7XG5cbiAgX3Byb3RvNC5tb2RpZmllciA9IGZ1bmN0aW9uIG1vZGlmaWVyKGZ1bmMsIHR3ZWVuLCB0YXJnZXQpIHtcbiAgICB0aGlzLm1TZXQgPSB0aGlzLm1TZXQgfHwgdGhpcy5zZXQ7IC8vaW4gY2FzZSBpdCB3YXMgYWxyZWFkeSBzZXQgKGEgUHJvcFR3ZWVuIGNhbiBvbmx5IGhhdmUgb25lIG1vZGlmaWVyKVxuXG4gICAgdGhpcy5zZXQgPSBfc2V0dGVyV2l0aE1vZGlmaWVyO1xuICAgIHRoaXMubSA9IGZ1bmM7XG4gICAgdGhpcy5tdCA9IHRhcmdldDsgLy9tb2RpZmllciB0YXJnZXRcblxuICAgIHRoaXMudHdlZW4gPSB0d2VlbjtcbiAgfTtcblxuICByZXR1cm4gUHJvcFR3ZWVuO1xufSgpOyAvL0luaXRpYWxpemF0aW9uIHRhc2tzXG5cbl9mb3JFYWNoTmFtZShfY2FsbGJhY2tOYW1lcyArIFwicGFyZW50LGR1cmF0aW9uLGVhc2UsZGVsYXksb3ZlcndyaXRlLHJ1bkJhY2t3YXJkcyxzdGFydEF0LHlveW8saW1tZWRpYXRlUmVuZGVyLHJlcGVhdCxyZXBlYXREZWxheSxkYXRhLHBhdXNlZCxyZXZlcnNlZCxsYXp5LGNhbGxiYWNrU2NvcGUsc3RyaW5nRmlsdGVyLGlkLHlveW9FYXNlLHN0YWdnZXIsaW5oZXJpdCxyZXBlYXRSZWZyZXNoLGtleWZyYW1lcyxhdXRvUmV2ZXJ0LHNjcm9sbFRyaWdnZXJcIiwgZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIF9yZXNlcnZlZFByb3BzW25hbWVdID0gMTtcbn0pO1xuXG5fZ2xvYmFscy5Ud2Vlbk1heCA9IF9nbG9iYWxzLlR3ZWVuTGl0ZSA9IFR3ZWVuO1xuX2dsb2JhbHMuVGltZWxpbmVMaXRlID0gX2dsb2JhbHMuVGltZWxpbmVNYXggPSBUaW1lbGluZTtcbl9nbG9iYWxUaW1lbGluZSA9IG5ldyBUaW1lbGluZSh7XG4gIHNvcnRDaGlsZHJlbjogZmFsc2UsXG4gIGRlZmF1bHRzOiBfZGVmYXVsdHMsXG4gIGF1dG9SZW1vdmVDaGlsZHJlbjogdHJ1ZSxcbiAgaWQ6IFwicm9vdFwiLFxuICBzbW9vdGhDaGlsZFRpbWluZzogdHJ1ZVxufSk7XG5fY29uZmlnLnN0cmluZ0ZpbHRlciA9IF9jb2xvclN0cmluZ0ZpbHRlcjtcblxudmFyIF9tZWRpYSA9IFtdLFxuICAgIF9saXN0ZW5lcnMgPSB7fSxcbiAgICBfZW1wdHlBcnJheSA9IFtdLFxuICAgIF9sYXN0TWVkaWFUaW1lID0gMCxcbiAgICBfY29udGV4dElEID0gMCxcbiAgICBfZGlzcGF0Y2ggPSBmdW5jdGlvbiBfZGlzcGF0Y2godHlwZSkge1xuICByZXR1cm4gKF9saXN0ZW5lcnNbdHlwZV0gfHwgX2VtcHR5QXJyYXkpLm1hcChmdW5jdGlvbiAoZikge1xuICAgIHJldHVybiBmKCk7XG4gIH0pO1xufSxcbiAgICBfb25NZWRpYUNoYW5nZSA9IGZ1bmN0aW9uIF9vbk1lZGlhQ2hhbmdlKCkge1xuICB2YXIgdGltZSA9IERhdGUubm93KCksXG4gICAgICBtYXRjaGVzID0gW107XG5cbiAgaWYgKHRpbWUgLSBfbGFzdE1lZGlhVGltZSA+IDIpIHtcbiAgICBfZGlzcGF0Y2goXCJtYXRjaE1lZGlhSW5pdFwiKTtcblxuICAgIF9tZWRpYS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICB2YXIgcXVlcmllcyA9IGMucXVlcmllcyxcbiAgICAgICAgICBjb25kaXRpb25zID0gYy5jb25kaXRpb25zLFxuICAgICAgICAgIG1hdGNoLFxuICAgICAgICAgIHAsXG4gICAgICAgICAgYW55TWF0Y2gsXG4gICAgICAgICAgdG9nZ2xlZDtcblxuICAgICAgZm9yIChwIGluIHF1ZXJpZXMpIHtcbiAgICAgICAgbWF0Y2ggPSBfd2luLm1hdGNoTWVkaWEocXVlcmllc1twXSkubWF0Y2hlczsgLy8gRmlyZWZveCBkb2Vzbid0IHVwZGF0ZSB0aGUgXCJtYXRjaGVzXCIgcHJvcGVydHkgb2YgdGhlIE1lZGlhUXVlcnlMaXN0IG9iamVjdCBjb3JyZWN0bHkgLSBpdCBvbmx5IGRvZXMgc28gYXMgaXQgY2FsbHMgaXRzIGNoYW5nZSBoYW5kbGVyIC0gc28gd2UgbXVzdCByZS1jcmVhdGUgYSBtZWRpYSBxdWVyeSBoZXJlIHRvIGVuc3VyZSBpdCdzIGFjY3VyYXRlLlxuXG4gICAgICAgIG1hdGNoICYmIChhbnlNYXRjaCA9IDEpO1xuXG4gICAgICAgIGlmIChtYXRjaCAhPT0gY29uZGl0aW9uc1twXSkge1xuICAgICAgICAgIGNvbmRpdGlvbnNbcF0gPSBtYXRjaDtcbiAgICAgICAgICB0b2dnbGVkID0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodG9nZ2xlZCkge1xuICAgICAgICBjLnJldmVydCgpO1xuICAgICAgICBhbnlNYXRjaCAmJiBtYXRjaGVzLnB1c2goYyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBfZGlzcGF0Y2goXCJtYXRjaE1lZGlhUmV2ZXJ0XCIpO1xuXG4gICAgbWF0Y2hlcy5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICByZXR1cm4gYy5vbk1hdGNoKGMpO1xuICAgIH0pO1xuICAgIF9sYXN0TWVkaWFUaW1lID0gdGltZTtcblxuICAgIF9kaXNwYXRjaChcIm1hdGNoTWVkaWFcIik7XG4gIH1cbn07XG5cbnZhciBDb250ZXh0ID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQ29udGV4dChmdW5jLCBzY29wZSkge1xuICAgIHRoaXMuc2VsZWN0b3IgPSBzY29wZSAmJiBzZWxlY3RvcihzY29wZSk7XG4gICAgdGhpcy5kYXRhID0gW107XG4gICAgdGhpcy5fciA9IFtdOyAvLyByZXR1cm5lZC9jbGVhbnVwIGZ1bmN0aW9uc1xuXG4gICAgdGhpcy5pc1JldmVydGVkID0gZmFsc2U7XG4gICAgdGhpcy5pZCA9IF9jb250ZXh0SUQrKzsgLy8gdG8gd29yayBhcm91bmQgaXNzdWVzIHRoYXQgZnJhbWV3b3JrcyBsaWtlIFZ1ZSBjYXVzZSBieSBtYWtpbmcgdGhpbmdzIGludG8gUHJveGllcyB3aGljaCBtYWtlIGl0IGltcG9zc2libGUgdG8gZG8gc29tZXRoaW5nIGxpa2UgX21lZGlhLmluZGV4T2YodGhpcykgYmVjYXVzZSBcInRoaXNcIiB3b3VsZCBubyBsb25nZXIgcmVmZXIgdG8gdGhlIENvbnRleHQgaW5zdGFuY2UgaXRzZWxmIC0gaXQnZCByZWZlciB0byBhIFByb3h5ISBXZSBuZWVkZWQgYSB3YXkgdG8gaWRlbnRpZnkgdGhlIGNvbnRleHQgdW5pcXVlbHlcblxuICAgIGZ1bmMgJiYgdGhpcy5hZGQoZnVuYyk7XG4gIH1cblxuICB2YXIgX3Byb3RvNSA9IENvbnRleHQucHJvdG90eXBlO1xuXG4gIF9wcm90bzUuYWRkID0gZnVuY3Rpb24gYWRkKG5hbWUsIGZ1bmMsIHNjb3BlKSB7XG4gICAgLy8gcG9zc2libGUgZnV0dXJlIGFkZGl0aW9uIGlmIHdlIG5lZWQgdGhlIGFiaWxpdHkgdG8gYWRkKCkgYW4gYW5pbWF0aW9uIHRvIGEgY29udGV4dCBhbmQgZm9yIHdoYXRldmVyIHJlYXNvbiBjYW5ub3QgY3JlYXRlIHRoYXQgYW5pbWF0aW9uIGluc2lkZSBvZiBhIGNvbnRleHQuYWRkKCgpID0+IHsuLi59KSBmdW5jdGlvbi5cbiAgICAvLyBpZiAobmFtZSAmJiBfaXNGdW5jdGlvbihuYW1lLnJldmVydCkpIHtcbiAgICAvLyBcdHRoaXMuZGF0YS5wdXNoKG5hbWUpO1xuICAgIC8vIFx0cmV0dXJuIChuYW1lLl9jdHggPSB0aGlzKTtcbiAgICAvLyB9XG4gICAgaWYgKF9pc0Z1bmN0aW9uKG5hbWUpKSB7XG4gICAgICBzY29wZSA9IGZ1bmM7XG4gICAgICBmdW5jID0gbmFtZTtcbiAgICAgIG5hbWUgPSBfaXNGdW5jdGlvbjtcbiAgICB9XG5cbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGYgPSBmdW5jdGlvbiBmKCkge1xuICAgICAgdmFyIHByZXYgPSBfY29udGV4dCxcbiAgICAgICAgICBwcmV2U2VsZWN0b3IgPSBzZWxmLnNlbGVjdG9yLFxuICAgICAgICAgIHJlc3VsdDtcbiAgICAgIHByZXYgJiYgcHJldiAhPT0gc2VsZiAmJiBwcmV2LmRhdGEucHVzaChzZWxmKTtcbiAgICAgIHNjb3BlICYmIChzZWxmLnNlbGVjdG9yID0gc2VsZWN0b3Ioc2NvcGUpKTtcbiAgICAgIF9jb250ZXh0ID0gc2VsZjtcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoc2VsZiwgYXJndW1lbnRzKTtcbiAgICAgIF9pc0Z1bmN0aW9uKHJlc3VsdCkgJiYgc2VsZi5fci5wdXNoKHJlc3VsdCk7XG4gICAgICBfY29udGV4dCA9IHByZXY7XG4gICAgICBzZWxmLnNlbGVjdG9yID0gcHJldlNlbGVjdG9yO1xuICAgICAgc2VsZi5pc1JldmVydGVkID0gZmFsc2U7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbiAgICBzZWxmLmxhc3QgPSBmO1xuICAgIHJldHVybiBuYW1lID09PSBfaXNGdW5jdGlvbiA/IGYoc2VsZikgOiBuYW1lID8gc2VsZltuYW1lXSA9IGYgOiBmO1xuICB9O1xuXG4gIF9wcm90bzUuaWdub3JlID0gZnVuY3Rpb24gaWdub3JlKGZ1bmMpIHtcbiAgICB2YXIgcHJldiA9IF9jb250ZXh0O1xuICAgIF9jb250ZXh0ID0gbnVsbDtcbiAgICBmdW5jKHRoaXMpO1xuICAgIF9jb250ZXh0ID0gcHJldjtcbiAgfTtcblxuICBfcHJvdG81LmdldFR3ZWVucyA9IGZ1bmN0aW9uIGdldFR3ZWVucygpIHtcbiAgICB2YXIgYSA9IFtdO1xuICAgIHRoaXMuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gZSBpbnN0YW5jZW9mIENvbnRleHQgPyBhLnB1c2guYXBwbHkoYSwgZS5nZXRUd2VlbnMoKSkgOiBlIGluc3RhbmNlb2YgVHdlZW4gJiYgIShlLnBhcmVudCAmJiBlLnBhcmVudC5kYXRhID09PSBcIm5lc3RlZFwiKSAmJiBhLnB1c2goZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGE7XG4gIH07XG5cbiAgX3Byb3RvNS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIHRoaXMuX3IubGVuZ3RoID0gdGhpcy5kYXRhLmxlbmd0aCA9IDA7XG4gIH07XG5cbiAgX3Byb3RvNS5raWxsID0gZnVuY3Rpb24ga2lsbChyZXZlcnQsIG1hdGNoTWVkaWEpIHtcbiAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgIGlmIChyZXZlcnQpIHtcbiAgICAgIHZhciB0d2VlbnMgPSB0aGlzLmdldFR3ZWVucygpO1xuICAgICAgdGhpcy5kYXRhLmZvckVhY2goZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgLy8gRmxpcCBwbHVnaW4gdHdlZW5zIGFyZSB2ZXJ5IGRpZmZlcmVudCBpbiB0aGF0IHRoZXkgc2hvdWxkIGFjdHVhbGx5IGJlIHB1c2hlZCB0byB0aGVpciBlbmQuIFRoZSBwbHVnaW4gcmVwbGFjZXMgdGhlIHRpbWVsaW5lJ3MgLnJldmVydCgpIG1ldGhvZCB0byBkbyBleGFjdGx5IHRoYXQuIEJ1dCB3ZSBhbHNvIG5lZWQgdG8gcmVtb3ZlIGFueSBvZiB0aG9zZSBuZXN0ZWQgdHdlZW5zIGluc2lkZSB0aGUgZmxpcCB0aW1lbGluZSBzbyB0aGF0IHRoZXkgZG9uJ3QgZ2V0IGluZGl2aWR1YWxseSByZXZlcnRlZC5cbiAgICAgICAgaWYgKHQuZGF0YSA9PT0gXCJpc0ZsaXBcIikge1xuICAgICAgICAgIHQucmV2ZXJ0KCk7XG4gICAgICAgICAgdC5nZXRDaGlsZHJlbih0cnVlLCB0cnVlLCBmYWxzZSkuZm9yRWFjaChmdW5jdGlvbiAodHdlZW4pIHtcbiAgICAgICAgICAgIHJldHVybiB0d2VlbnMuc3BsaWNlKHR3ZWVucy5pbmRleE9mKHR3ZWVuKSwgMSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pOyAvLyBzYXZlIGFzIGFuIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBjYWNoZSB0aGUgZ2xvYmFsVGltZSBmb3IgZWFjaCB0d2VlbiB0byBvcHRpbWl6ZSBwZXJmb3JtYW5jZSBkdXJpbmcgdGhlIHNvcnRcblxuICAgICAgdHdlZW5zLm1hcChmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGc6IHQuZ2xvYmFsVGltZSgwKSxcbiAgICAgICAgICB0OiB0XG4gICAgICAgIH07XG4gICAgICB9KS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBiLmcgLSBhLmcgfHwgLTE7XG4gICAgICB9KS5mb3JFYWNoKGZ1bmN0aW9uIChvKSB7XG4gICAgICAgIHJldHVybiBvLnQucmV2ZXJ0KHJldmVydCk7XG4gICAgICB9KTsgLy8gbm90ZTogYWxsIG9mIHRoZSBfc3RhcnRBdCB0d2VlbnMgc2hvdWxkIGJlIHJldmVydGVkIGluIHJldmVyc2Ugb3JkZXIgdGhhdCB0aGV5IHdlcmUgY3JlYXRlZCwgYW5kIHRoZXknbGwgYWxsIGhhdmUgdGhlIHNhbWUgZ2xvYmFsVGltZSAoLTEpIHNvIHRoZSBcIiB8fCAtMVwiIGluIHRoZSBzb3J0IGtlZXBzIHRoZSBvcmRlciBwcm9wZXJseS5cblxuICAgICAgdGhpcy5kYXRhLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgcmV0dXJuIGUgaW5zdGFuY2VvZiBUaW1lbGluZSA/IGUuZGF0YSAhPT0gXCJuZXN0ZWRcIiAmJiBlLmtpbGwoKSA6ICEoZSBpbnN0YW5jZW9mIFR3ZWVuKSAmJiBlLnJldmVydCAmJiBlLnJldmVydChyZXZlcnQpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX3IuZm9yRWFjaChmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gZihyZXZlcnQsIF90aGlzNCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5pc1JldmVydGVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRhLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgcmV0dXJuIGUua2lsbCAmJiBlLmtpbGwoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuY2xlYXIoKTtcblxuICAgIGlmIChtYXRjaE1lZGlhKSB7XG4gICAgICB2YXIgaSA9IF9tZWRpYS5sZW5ndGg7XG5cbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgLy8gcHJldmlvdXNseSwgd2UgY2hlY2tlZCBfbWVkaWEuaW5kZXhPZih0aGlzKSwgYnV0IHNvbWUgZnJhbWV3b3JrcyBsaWtlIFZ1ZSBlbmZvcmNlIFByb3h5IG9iamVjdHMgdGhhdCBtYWtlIGl0IGltcG9zc2libGUgdG8gZ2V0IHRoZSBwcm9wZXIgcmVzdWx0IHRoYXQgd2F5LCBzbyB3ZSBtdXN0IHVzZSBhIHVuaXF1ZSBJRCBudW1iZXIgaW5zdGVhZC5cbiAgICAgICAgX21lZGlhW2ldLmlkID09PSB0aGlzLmlkICYmIF9tZWRpYS5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIF9wcm90bzUucmV2ZXJ0ID0gZnVuY3Rpb24gcmV2ZXJ0KGNvbmZpZykge1xuICAgIHRoaXMua2lsbChjb25maWcgfHwge30pO1xuICB9O1xuXG4gIHJldHVybiBDb250ZXh0O1xufSgpO1xuXG52YXIgTWF0Y2hNZWRpYSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIE1hdGNoTWVkaWEoc2NvcGUpIHtcbiAgICB0aGlzLmNvbnRleHRzID0gW107XG4gICAgdGhpcy5zY29wZSA9IHNjb3BlO1xuICB9XG5cbiAgdmFyIF9wcm90bzYgPSBNYXRjaE1lZGlhLnByb3RvdHlwZTtcblxuICBfcHJvdG82LmFkZCA9IGZ1bmN0aW9uIGFkZChjb25kaXRpb25zLCBmdW5jLCBzY29wZSkge1xuICAgIF9pc09iamVjdChjb25kaXRpb25zKSB8fCAoY29uZGl0aW9ucyA9IHtcbiAgICAgIG1hdGNoZXM6IGNvbmRpdGlvbnNcbiAgICB9KTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KDAsIHNjb3BlIHx8IHRoaXMuc2NvcGUpLFxuICAgICAgICBjb25kID0gY29udGV4dC5jb25kaXRpb25zID0ge30sXG4gICAgICAgIG1xLFxuICAgICAgICBwLFxuICAgICAgICBhY3RpdmU7XG4gICAgX2NvbnRleHQgJiYgIWNvbnRleHQuc2VsZWN0b3IgJiYgKGNvbnRleHQuc2VsZWN0b3IgPSBfY29udGV4dC5zZWxlY3Rvcik7IC8vIGluIGNhc2UgYSBjb250ZXh0IGlzIGNyZWF0ZWQgaW5zaWRlIGEgY29udGV4dC4gTGlrZSBhIGdzYXAubWF0Y2hNZWRpYSgpIHRoYXQncyBpbnNpZGUgYSBzY29wZWQgZ3NhcC5jb250ZXh0KClcblxuICAgIHRoaXMuY29udGV4dHMucHVzaChjb250ZXh0KTtcbiAgICBmdW5jID0gY29udGV4dC5hZGQoXCJvbk1hdGNoXCIsIGZ1bmMpO1xuICAgIGNvbnRleHQucXVlcmllcyA9IGNvbmRpdGlvbnM7XG5cbiAgICBmb3IgKHAgaW4gY29uZGl0aW9ucykge1xuICAgICAgaWYgKHAgPT09IFwiYWxsXCIpIHtcbiAgICAgICAgYWN0aXZlID0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1xID0gX3dpbi5tYXRjaE1lZGlhKGNvbmRpdGlvbnNbcF0pO1xuXG4gICAgICAgIGlmIChtcSkge1xuICAgICAgICAgIF9tZWRpYS5pbmRleE9mKGNvbnRleHQpIDwgMCAmJiBfbWVkaWEucHVzaChjb250ZXh0KTtcbiAgICAgICAgICAoY29uZFtwXSA9IG1xLm1hdGNoZXMpICYmIChhY3RpdmUgPSAxKTtcbiAgICAgICAgICBtcS5hZGRMaXN0ZW5lciA/IG1xLmFkZExpc3RlbmVyKF9vbk1lZGlhQ2hhbmdlKSA6IG1xLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgX29uTWVkaWFDaGFuZ2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgYWN0aXZlICYmIGZ1bmMoY29udGV4dCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0gLy8gcmVmcmVzaCgpIHtcbiAgLy8gXHRsZXQgdGltZSA9IF9sYXN0TWVkaWFUaW1lLFxuICAvLyBcdFx0bWVkaWEgPSBfbWVkaWE7XG4gIC8vIFx0X2xhc3RNZWRpYVRpbWUgPSAtMTtcbiAgLy8gXHRfbWVkaWEgPSB0aGlzLmNvbnRleHRzO1xuICAvLyBcdF9vbk1lZGlhQ2hhbmdlKCk7XG4gIC8vIFx0X2xhc3RNZWRpYVRpbWUgPSB0aW1lO1xuICAvLyBcdF9tZWRpYSA9IG1lZGlhO1xuICAvLyB9XG4gIDtcblxuICBfcHJvdG82LnJldmVydCA9IGZ1bmN0aW9uIHJldmVydChjb25maWcpIHtcbiAgICB0aGlzLmtpbGwoY29uZmlnIHx8IHt9KTtcbiAgfTtcblxuICBfcHJvdG82LmtpbGwgPSBmdW5jdGlvbiBraWxsKHJldmVydCkge1xuICAgIHRoaXMuY29udGV4dHMuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgcmV0dXJuIGMua2lsbChyZXZlcnQsIHRydWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBNYXRjaE1lZGlhO1xufSgpO1xuLypcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBHU0FQXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cblxudmFyIF9nc2FwID0ge1xuICByZWdpc3RlclBsdWdpbjogZnVuY3Rpb24gcmVnaXN0ZXJQbHVnaW4oKSB7XG4gICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgfVxuXG4gICAgYXJncy5mb3JFYWNoKGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgIHJldHVybiBfY3JlYXRlUGx1Z2luKGNvbmZpZyk7XG4gICAgfSk7XG4gIH0sXG4gIHRpbWVsaW5lOiBmdW5jdGlvbiB0aW1lbGluZSh2YXJzKSB7XG4gICAgcmV0dXJuIG5ldyBUaW1lbGluZSh2YXJzKTtcbiAgfSxcbiAgZ2V0VHdlZW5zT2Y6IGZ1bmN0aW9uIGdldFR3ZWVuc09mKHRhcmdldHMsIG9ubHlBY3RpdmUpIHtcbiAgICByZXR1cm4gX2dsb2JhbFRpbWVsaW5lLmdldFR3ZWVuc09mKHRhcmdldHMsIG9ubHlBY3RpdmUpO1xuICB9LFxuICBnZXRQcm9wZXJ0eTogZnVuY3Rpb24gZ2V0UHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSwgdW5pdCwgdW5jYWNoZSkge1xuICAgIF9pc1N0cmluZyh0YXJnZXQpICYmICh0YXJnZXQgPSB0b0FycmF5KHRhcmdldClbMF0pOyAvL2luIGNhc2Ugc2VsZWN0b3IgdGV4dCBvciBhbiBhcnJheSBpcyBwYXNzZWQgaW5cblxuICAgIHZhciBnZXR0ZXIgPSBfZ2V0Q2FjaGUodGFyZ2V0IHx8IHt9KS5nZXQsXG4gICAgICAgIGZvcm1hdCA9IHVuaXQgPyBfcGFzc1Rocm91Z2ggOiBfbnVtZXJpY0lmUG9zc2libGU7XG5cbiAgICB1bml0ID09PSBcIm5hdGl2ZVwiICYmICh1bml0ID0gXCJcIik7XG4gICAgcmV0dXJuICF0YXJnZXQgPyB0YXJnZXQgOiAhcHJvcGVydHkgPyBmdW5jdGlvbiAocHJvcGVydHksIHVuaXQsIHVuY2FjaGUpIHtcbiAgICAgIHJldHVybiBmb3JtYXQoKF9wbHVnaW5zW3Byb3BlcnR5XSAmJiBfcGx1Z2luc1twcm9wZXJ0eV0uZ2V0IHx8IGdldHRlcikodGFyZ2V0LCBwcm9wZXJ0eSwgdW5pdCwgdW5jYWNoZSkpO1xuICAgIH0gOiBmb3JtYXQoKF9wbHVnaW5zW3Byb3BlcnR5XSAmJiBfcGx1Z2luc1twcm9wZXJ0eV0uZ2V0IHx8IGdldHRlcikodGFyZ2V0LCBwcm9wZXJ0eSwgdW5pdCwgdW5jYWNoZSkpO1xuICB9LFxuICBxdWlja1NldHRlcjogZnVuY3Rpb24gcXVpY2tTZXR0ZXIodGFyZ2V0LCBwcm9wZXJ0eSwgdW5pdCkge1xuICAgIHRhcmdldCA9IHRvQXJyYXkodGFyZ2V0KTtcblxuICAgIGlmICh0YXJnZXQubGVuZ3RoID4gMSkge1xuICAgICAgdmFyIHNldHRlcnMgPSB0YXJnZXQubWFwKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiBnc2FwLnF1aWNrU2V0dGVyKHQsIHByb3BlcnR5LCB1bml0KTtcbiAgICAgIH0pLFxuICAgICAgICAgIGwgPSBzZXR0ZXJzLmxlbmd0aDtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIGkgPSBsO1xuXG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICBzZXR0ZXJzW2ldKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICB0YXJnZXQgPSB0YXJnZXRbMF0gfHwge307XG5cbiAgICB2YXIgUGx1Z2luID0gX3BsdWdpbnNbcHJvcGVydHldLFxuICAgICAgICBjYWNoZSA9IF9nZXRDYWNoZSh0YXJnZXQpLFxuICAgICAgICBwID0gY2FjaGUuaGFybmVzcyAmJiAoY2FjaGUuaGFybmVzcy5hbGlhc2VzIHx8IHt9KVtwcm9wZXJ0eV0gfHwgcHJvcGVydHksXG4gICAgICAgIC8vIGluIGNhc2UgaXQncyBhbiBhbGlhcywgbGlrZSBcInJvdGF0ZVwiIGZvciBcInJvdGF0aW9uXCIuXG4gICAgc2V0dGVyID0gUGx1Z2luID8gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICB2YXIgcCA9IG5ldyBQbHVnaW4oKTtcbiAgICAgIF9xdWlja1R3ZWVuLl9wdCA9IDA7XG4gICAgICBwLmluaXQodGFyZ2V0LCB1bml0ID8gdmFsdWUgKyB1bml0IDogdmFsdWUsIF9xdWlja1R3ZWVuLCAwLCBbdGFyZ2V0XSk7XG4gICAgICBwLnJlbmRlcigxLCBwKTtcbiAgICAgIF9xdWlja1R3ZWVuLl9wdCAmJiBfcmVuZGVyUHJvcFR3ZWVucygxLCBfcXVpY2tUd2Vlbik7XG4gICAgfSA6IGNhY2hlLnNldCh0YXJnZXQsIHApO1xuXG4gICAgcmV0dXJuIFBsdWdpbiA/IHNldHRlciA6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHNldHRlcih0YXJnZXQsIHAsIHVuaXQgPyB2YWx1ZSArIHVuaXQgOiB2YWx1ZSwgY2FjaGUsIDEpO1xuICAgIH07XG4gIH0sXG4gIHF1aWNrVG86IGZ1bmN0aW9uIHF1aWNrVG8odGFyZ2V0LCBwcm9wZXJ0eSwgdmFycykge1xuICAgIHZhciBfbWVyZ2UyO1xuXG4gICAgdmFyIHR3ZWVuID0gZ3NhcC50byh0YXJnZXQsIF9tZXJnZSgoX21lcmdlMiA9IHt9LCBfbWVyZ2UyW3Byb3BlcnR5XSA9IFwiKz0wLjFcIiwgX21lcmdlMi5wYXVzZWQgPSB0cnVlLCBfbWVyZ2UyKSwgdmFycyB8fCB7fSkpLFxuICAgICAgICBmdW5jID0gZnVuY3Rpb24gZnVuYyh2YWx1ZSwgc3RhcnQsIHN0YXJ0SXNSZWxhdGl2ZSkge1xuICAgICAgcmV0dXJuIHR3ZWVuLnJlc2V0VG8ocHJvcGVydHksIHZhbHVlLCBzdGFydCwgc3RhcnRJc1JlbGF0aXZlKTtcbiAgICB9O1xuXG4gICAgZnVuYy50d2VlbiA9IHR3ZWVuO1xuICAgIHJldHVybiBmdW5jO1xuICB9LFxuICBpc1R3ZWVuaW5nOiBmdW5jdGlvbiBpc1R3ZWVuaW5nKHRhcmdldHMpIHtcbiAgICByZXR1cm4gX2dsb2JhbFRpbWVsaW5lLmdldFR3ZWVuc09mKHRhcmdldHMsIHRydWUpLmxlbmd0aCA+IDA7XG4gIH0sXG4gIGRlZmF1bHRzOiBmdW5jdGlvbiBkZWZhdWx0cyh2YWx1ZSkge1xuICAgIHZhbHVlICYmIHZhbHVlLmVhc2UgJiYgKHZhbHVlLmVhc2UgPSBfcGFyc2VFYXNlKHZhbHVlLmVhc2UsIF9kZWZhdWx0cy5lYXNlKSk7XG4gICAgcmV0dXJuIF9tZXJnZURlZXAoX2RlZmF1bHRzLCB2YWx1ZSB8fCB7fSk7XG4gIH0sXG4gIGNvbmZpZzogZnVuY3Rpb24gY29uZmlnKHZhbHVlKSB7XG4gICAgcmV0dXJuIF9tZXJnZURlZXAoX2NvbmZpZywgdmFsdWUgfHwge30pO1xuICB9LFxuICByZWdpc3RlckVmZmVjdDogZnVuY3Rpb24gcmVnaXN0ZXJFZmZlY3QoX3JlZjMpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWYzLm5hbWUsXG4gICAgICAgIGVmZmVjdCA9IF9yZWYzLmVmZmVjdCxcbiAgICAgICAgcGx1Z2lucyA9IF9yZWYzLnBsdWdpbnMsXG4gICAgICAgIGRlZmF1bHRzID0gX3JlZjMuZGVmYXVsdHMsXG4gICAgICAgIGV4dGVuZFRpbWVsaW5lID0gX3JlZjMuZXh0ZW5kVGltZWxpbmU7XG4gICAgKHBsdWdpbnMgfHwgXCJcIikuc3BsaXQoXCIsXCIpLmZvckVhY2goZnVuY3Rpb24gKHBsdWdpbk5hbWUpIHtcbiAgICAgIHJldHVybiBwbHVnaW5OYW1lICYmICFfcGx1Z2luc1twbHVnaW5OYW1lXSAmJiAhX2dsb2JhbHNbcGx1Z2luTmFtZV0gJiYgX3dhcm4obmFtZSArIFwiIGVmZmVjdCByZXF1aXJlcyBcIiArIHBsdWdpbk5hbWUgKyBcIiBwbHVnaW4uXCIpO1xuICAgIH0pO1xuXG4gICAgX2VmZmVjdHNbbmFtZV0gPSBmdW5jdGlvbiAodGFyZ2V0cywgdmFycywgdGwpIHtcbiAgICAgIHJldHVybiBlZmZlY3QodG9BcnJheSh0YXJnZXRzKSwgX3NldERlZmF1bHRzKHZhcnMgfHwge30sIGRlZmF1bHRzKSwgdGwpO1xuICAgIH07XG5cbiAgICBpZiAoZXh0ZW5kVGltZWxpbmUpIHtcbiAgICAgIFRpbWVsaW5lLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uICh0YXJnZXRzLCB2YXJzLCBwb3NpdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGQoX2VmZmVjdHNbbmFtZV0odGFyZ2V0cywgX2lzT2JqZWN0KHZhcnMpID8gdmFycyA6IChwb3NpdGlvbiA9IHZhcnMpICYmIHt9LCB0aGlzKSwgcG9zaXRpb24pO1xuICAgICAgfTtcbiAgICB9XG4gIH0sXG4gIHJlZ2lzdGVyRWFzZTogZnVuY3Rpb24gcmVnaXN0ZXJFYXNlKG5hbWUsIGVhc2UpIHtcbiAgICBfZWFzZU1hcFtuYW1lXSA9IF9wYXJzZUVhc2UoZWFzZSk7XG4gIH0sXG4gIHBhcnNlRWFzZTogZnVuY3Rpb24gcGFyc2VFYXNlKGVhc2UsIGRlZmF1bHRFYXNlKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyBfcGFyc2VFYXNlKGVhc2UsIGRlZmF1bHRFYXNlKSA6IF9lYXNlTWFwO1xuICB9LFxuICBnZXRCeUlkOiBmdW5jdGlvbiBnZXRCeUlkKGlkKSB7XG4gICAgcmV0dXJuIF9nbG9iYWxUaW1lbGluZS5nZXRCeUlkKGlkKTtcbiAgfSxcbiAgZXhwb3J0Um9vdDogZnVuY3Rpb24gZXhwb3J0Um9vdCh2YXJzLCBpbmNsdWRlRGVsYXllZENhbGxzKSB7XG4gICAgaWYgKHZhcnMgPT09IHZvaWQgMCkge1xuICAgICAgdmFycyA9IHt9O1xuICAgIH1cblxuICAgIHZhciB0bCA9IG5ldyBUaW1lbGluZSh2YXJzKSxcbiAgICAgICAgY2hpbGQsXG4gICAgICAgIG5leHQ7XG4gICAgdGwuc21vb3RoQ2hpbGRUaW1pbmcgPSBfaXNOb3RGYWxzZSh2YXJzLnNtb290aENoaWxkVGltaW5nKTtcblxuICAgIF9nbG9iYWxUaW1lbGluZS5yZW1vdmUodGwpO1xuXG4gICAgdGwuX2RwID0gMDsgLy9vdGhlcndpc2UgaXQnbGwgZ2V0IHJlLWFjdGl2YXRlZCB3aGVuIGFkZGluZyBjaGlsZHJlbiBhbmQgYmUgcmUtaW50cm9kdWNlZCBpbnRvIF9nbG9iYWxUaW1lbGluZSdzIGxpbmtlZCBsaXN0ICh0aGVuIGFkZGVkIHRvIGl0c2VsZikuXG5cbiAgICB0bC5fdGltZSA9IHRsLl90VGltZSA9IF9nbG9iYWxUaW1lbGluZS5fdGltZTtcbiAgICBjaGlsZCA9IF9nbG9iYWxUaW1lbGluZS5fZmlyc3Q7XG5cbiAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgIG5leHQgPSBjaGlsZC5fbmV4dDtcblxuICAgICAgaWYgKGluY2x1ZGVEZWxheWVkQ2FsbHMgfHwgISghY2hpbGQuX2R1ciAmJiBjaGlsZCBpbnN0YW5jZW9mIFR3ZWVuICYmIGNoaWxkLnZhcnMub25Db21wbGV0ZSA9PT0gY2hpbGQuX3RhcmdldHNbMF0pKSB7XG4gICAgICAgIF9hZGRUb1RpbWVsaW5lKHRsLCBjaGlsZCwgY2hpbGQuX3N0YXJ0IC0gY2hpbGQuX2RlbGF5KTtcbiAgICAgIH1cblxuICAgICAgY2hpbGQgPSBuZXh0O1xuICAgIH1cblxuICAgIF9hZGRUb1RpbWVsaW5lKF9nbG9iYWxUaW1lbGluZSwgdGwsIDApO1xuXG4gICAgcmV0dXJuIHRsO1xuICB9LFxuICBjb250ZXh0OiBmdW5jdGlvbiBjb250ZXh0KGZ1bmMsIHNjb3BlKSB7XG4gICAgcmV0dXJuIGZ1bmMgPyBuZXcgQ29udGV4dChmdW5jLCBzY29wZSkgOiBfY29udGV4dDtcbiAgfSxcbiAgbWF0Y2hNZWRpYTogZnVuY3Rpb24gbWF0Y2hNZWRpYShzY29wZSkge1xuICAgIHJldHVybiBuZXcgTWF0Y2hNZWRpYShzY29wZSk7XG4gIH0sXG4gIG1hdGNoTWVkaWFSZWZyZXNoOiBmdW5jdGlvbiBtYXRjaE1lZGlhUmVmcmVzaCgpIHtcbiAgICByZXR1cm4gX21lZGlhLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgIHZhciBjb25kID0gYy5jb25kaXRpb25zLFxuICAgICAgICAgIGZvdW5kLFxuICAgICAgICAgIHA7XG5cbiAgICAgIGZvciAocCBpbiBjb25kKSB7XG4gICAgICAgIGlmIChjb25kW3BdKSB7XG4gICAgICAgICAgY29uZFtwXSA9IGZhbHNlO1xuICAgICAgICAgIGZvdW5kID0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3VuZCAmJiBjLnJldmVydCgpO1xuICAgIH0pIHx8IF9vbk1lZGlhQ2hhbmdlKCk7XG4gIH0sXG4gIGFkZEV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIodHlwZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgYSA9IF9saXN0ZW5lcnNbdHlwZV0gfHwgKF9saXN0ZW5lcnNbdHlwZV0gPSBbXSk7XG4gICAgfmEuaW5kZXhPZihjYWxsYmFjaykgfHwgYS5wdXNoKGNhbGxiYWNrKTtcbiAgfSxcbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjaykge1xuICAgIHZhciBhID0gX2xpc3RlbmVyc1t0eXBlXSxcbiAgICAgICAgaSA9IGEgJiYgYS5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICBpID49IDAgJiYgYS5zcGxpY2UoaSwgMSk7XG4gIH0sXG4gIHV0aWxzOiB7XG4gICAgd3JhcDogd3JhcCxcbiAgICB3cmFwWW95bzogd3JhcFlveW8sXG4gICAgZGlzdHJpYnV0ZTogZGlzdHJpYnV0ZSxcbiAgICByYW5kb206IHJhbmRvbSxcbiAgICBzbmFwOiBzbmFwLFxuICAgIG5vcm1hbGl6ZTogbm9ybWFsaXplLFxuICAgIGdldFVuaXQ6IGdldFVuaXQsXG4gICAgY2xhbXA6IGNsYW1wLFxuICAgIHNwbGl0Q29sb3I6IHNwbGl0Q29sb3IsXG4gICAgdG9BcnJheTogdG9BcnJheSxcbiAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXG4gICAgbWFwUmFuZ2U6IG1hcFJhbmdlLFxuICAgIHBpcGU6IHBpcGUsXG4gICAgdW5pdGl6ZTogdW5pdGl6ZSxcbiAgICBpbnRlcnBvbGF0ZTogaW50ZXJwb2xhdGUsXG4gICAgc2h1ZmZsZTogc2h1ZmZsZVxuICB9LFxuICBpbnN0YWxsOiBfaW5zdGFsbCxcbiAgZWZmZWN0czogX2VmZmVjdHMsXG4gIHRpY2tlcjogX3RpY2tlcixcbiAgdXBkYXRlUm9vdDogVGltZWxpbmUudXBkYXRlUm9vdCxcbiAgcGx1Z2luczogX3BsdWdpbnMsXG4gIGdsb2JhbFRpbWVsaW5lOiBfZ2xvYmFsVGltZWxpbmUsXG4gIGNvcmU6IHtcbiAgICBQcm9wVHdlZW46IFByb3BUd2VlbixcbiAgICBnbG9iYWxzOiBfYWRkR2xvYmFsLFxuICAgIFR3ZWVuOiBUd2VlbixcbiAgICBUaW1lbGluZTogVGltZWxpbmUsXG4gICAgQW5pbWF0aW9uOiBBbmltYXRpb24sXG4gICAgZ2V0Q2FjaGU6IF9nZXRDYWNoZSxcbiAgICBfcmVtb3ZlTGlua2VkTGlzdEl0ZW06IF9yZW1vdmVMaW5rZWRMaXN0SXRlbSxcbiAgICByZXZlcnRpbmc6IGZ1bmN0aW9uIHJldmVydGluZygpIHtcbiAgICAgIHJldHVybiBfcmV2ZXJ0aW5nO1xuICAgIH0sXG4gICAgY29udGV4dDogZnVuY3Rpb24gY29udGV4dCh0b0FkZCkge1xuICAgICAgaWYgKHRvQWRkICYmIF9jb250ZXh0KSB7XG4gICAgICAgIF9jb250ZXh0LmRhdGEucHVzaCh0b0FkZCk7XG5cbiAgICAgICAgdG9BZGQuX2N0eCA9IF9jb250ZXh0O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX2NvbnRleHQ7XG4gICAgfSxcbiAgICBzdXBwcmVzc092ZXJ3cml0ZXM6IGZ1bmN0aW9uIHN1cHByZXNzT3ZlcndyaXRlcyh2YWx1ZSkge1xuICAgICAgcmV0dXJuIF9zdXBwcmVzc092ZXJ3cml0ZXMgPSB2YWx1ZTtcbiAgICB9XG4gIH1cbn07XG5cbl9mb3JFYWNoTmFtZShcInRvLGZyb20sZnJvbVRvLGRlbGF5ZWRDYWxsLHNldCxraWxsVHdlZW5zT2ZcIiwgZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIF9nc2FwW25hbWVdID0gVHdlZW5bbmFtZV07XG59KTtcblxuX3RpY2tlci5hZGQoVGltZWxpbmUudXBkYXRlUm9vdCk7XG5cbl9xdWlja1R3ZWVuID0gX2dzYXAudG8oe30sIHtcbiAgZHVyYXRpb246IDBcbn0pOyAvLyAtLS0tIEVYVFJBIFBMVUdJTlMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIF9nZXRQbHVnaW5Qcm9wVHdlZW4gPSBmdW5jdGlvbiBfZ2V0UGx1Z2luUHJvcFR3ZWVuKHBsdWdpbiwgcHJvcCkge1xuICB2YXIgcHQgPSBwbHVnaW4uX3B0O1xuXG4gIHdoaWxlIChwdCAmJiBwdC5wICE9PSBwcm9wICYmIHB0Lm9wICE9PSBwcm9wICYmIHB0LmZwICE9PSBwcm9wKSB7XG4gICAgcHQgPSBwdC5fbmV4dDtcbiAgfVxuXG4gIHJldHVybiBwdDtcbn0sXG4gICAgX2FkZE1vZGlmaWVycyA9IGZ1bmN0aW9uIF9hZGRNb2RpZmllcnModHdlZW4sIG1vZGlmaWVycykge1xuICB2YXIgdGFyZ2V0cyA9IHR3ZWVuLl90YXJnZXRzLFxuICAgICAgcCxcbiAgICAgIGksXG4gICAgICBwdDtcblxuICBmb3IgKHAgaW4gbW9kaWZpZXJzKSB7XG4gICAgaSA9IHRhcmdldHMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgcHQgPSB0d2Vlbi5fcHRMb29rdXBbaV1bcF07XG5cbiAgICAgIGlmIChwdCAmJiAocHQgPSBwdC5kKSkge1xuICAgICAgICBpZiAocHQuX3B0KSB7XG4gICAgICAgICAgLy8gaXMgYSBwbHVnaW5cbiAgICAgICAgICBwdCA9IF9nZXRQbHVnaW5Qcm9wVHdlZW4ocHQsIHApO1xuICAgICAgICB9XG5cbiAgICAgICAgcHQgJiYgcHQubW9kaWZpZXIgJiYgcHQubW9kaWZpZXIobW9kaWZpZXJzW3BdLCB0d2VlbiwgdGFyZ2V0c1tpXSwgcCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59LFxuICAgIF9idWlsZE1vZGlmaWVyUGx1Z2luID0gZnVuY3Rpb24gX2J1aWxkTW9kaWZpZXJQbHVnaW4obmFtZSwgbW9kaWZpZXIpIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBuYW1lLFxuICAgIHJhd1ZhcnM6IDEsXG4gICAgLy9kb24ndCBwcmUtcHJvY2VzcyBmdW5jdGlvbi1iYXNlZCB2YWx1ZXMgb3IgXCJyYW5kb20oKVwiIHN0cmluZ3MuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdCh0YXJnZXQsIHZhcnMsIHR3ZWVuKSB7XG4gICAgICB0d2Vlbi5fb25Jbml0ID0gZnVuY3Rpb24gKHR3ZWVuKSB7XG4gICAgICAgIHZhciB0ZW1wLCBwO1xuXG4gICAgICAgIGlmIChfaXNTdHJpbmcodmFycykpIHtcbiAgICAgICAgICB0ZW1wID0ge307XG5cbiAgICAgICAgICBfZm9yRWFjaE5hbWUodmFycywgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0ZW1wW25hbWVdID0gMTtcbiAgICAgICAgICB9KTsgLy9pZiB0aGUgdXNlciBwYXNzZXMgaW4gYSBjb21tYS1kZWxpbWl0ZWQgbGlzdCBvZiBwcm9wZXJ0eSBuYW1lcyB0byByb3VuZFByb3BzLCBsaWtlIFwieCx5XCIsIHdlIHJvdW5kIHRvIHdob2xlIG51bWJlcnMuXG5cblxuICAgICAgICAgIHZhcnMgPSB0ZW1wO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1vZGlmaWVyKSB7XG4gICAgICAgICAgdGVtcCA9IHt9O1xuXG4gICAgICAgICAgZm9yIChwIGluIHZhcnMpIHtcbiAgICAgICAgICAgIHRlbXBbcF0gPSBtb2RpZmllcih2YXJzW3BdKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXJzID0gdGVtcDtcbiAgICAgICAgfVxuXG4gICAgICAgIF9hZGRNb2RpZmllcnModHdlZW4sIHZhcnMpO1xuICAgICAgfTtcbiAgICB9XG4gIH07XG59OyAvL3JlZ2lzdGVyIGNvcmUgcGx1Z2luc1xuXG5cbmV4cG9ydCB2YXIgZ3NhcCA9IF9nc2FwLnJlZ2lzdGVyUGx1Z2luKHtcbiAgbmFtZTogXCJhdHRyXCIsXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQodGFyZ2V0LCB2YXJzLCB0d2VlbiwgaW5kZXgsIHRhcmdldHMpIHtcbiAgICB2YXIgcCwgcHQsIHY7XG4gICAgdGhpcy50d2VlbiA9IHR3ZWVuO1xuXG4gICAgZm9yIChwIGluIHZhcnMpIHtcbiAgICAgIHYgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKHApIHx8IFwiXCI7XG4gICAgICBwdCA9IHRoaXMuYWRkKHRhcmdldCwgXCJzZXRBdHRyaWJ1dGVcIiwgKHYgfHwgMCkgKyBcIlwiLCB2YXJzW3BdLCBpbmRleCwgdGFyZ2V0cywgMCwgMCwgcCk7XG4gICAgICBwdC5vcCA9IHA7XG4gICAgICBwdC5iID0gdjsgLy8gcmVjb3JkIHRoZSBiZWdpbm5pbmcgdmFsdWUgc28gd2UgY2FuIHJldmVydCgpXG5cbiAgICAgIHRoaXMuX3Byb3BzLnB1c2gocCk7XG4gICAgfVxuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcihyYXRpbywgZGF0YSkge1xuICAgIHZhciBwdCA9IGRhdGEuX3B0O1xuXG4gICAgd2hpbGUgKHB0KSB7XG4gICAgICBfcmV2ZXJ0aW5nID8gcHQuc2V0KHB0LnQsIHB0LnAsIHB0LmIsIHB0KSA6IHB0LnIocmF0aW8sIHB0LmQpOyAvLyBpZiByZXZlcnRpbmcsIGdvIGJhY2sgdG8gdGhlIG9yaWdpbmFsIChwdC5iKVxuXG4gICAgICBwdCA9IHB0Ll9uZXh0O1xuICAgIH1cbiAgfVxufSwge1xuICBuYW1lOiBcImVuZEFycmF5XCIsXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQodGFyZ2V0LCB2YWx1ZSkge1xuICAgIHZhciBpID0gdmFsdWUubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdGhpcy5hZGQodGFyZ2V0LCBpLCB0YXJnZXRbaV0gfHwgMCwgdmFsdWVbaV0sIDAsIDAsIDAsIDAsIDAsIDEpO1xuICAgIH1cbiAgfVxufSwgX2J1aWxkTW9kaWZpZXJQbHVnaW4oXCJyb3VuZFByb3BzXCIsIF9yb3VuZE1vZGlmaWVyKSwgX2J1aWxkTW9kaWZpZXJQbHVnaW4oXCJtb2RpZmllcnNcIiksIF9idWlsZE1vZGlmaWVyUGx1Z2luKFwic25hcFwiLCBzbmFwKSkgfHwgX2dzYXA7IC8vdG8gcHJldmVudCB0aGUgY29yZSBwbHVnaW5zIGZyb20gYmVpbmcgZHJvcHBlZCB2aWEgYWdncmVzc2l2ZSB0cmVlIHNoYWtpbmcsIHdlIG11c3QgaW5jbHVkZSB0aGVtIGluIHRoZSB2YXJpYWJsZSBkZWNsYXJhdGlvbiBpbiB0aGlzIHdheS5cblxuVHdlZW4udmVyc2lvbiA9IFRpbWVsaW5lLnZlcnNpb24gPSBnc2FwLnZlcnNpb24gPSBcIjMuMTIuMVwiO1xuX2NvcmVSZWFkeSA9IDE7XG5fd2luZG93RXhpc3RzKCkgJiYgX3dha2UoKTtcbnZhciBQb3dlcjAgPSBfZWFzZU1hcC5Qb3dlcjAsXG4gICAgUG93ZXIxID0gX2Vhc2VNYXAuUG93ZXIxLFxuICAgIFBvd2VyMiA9IF9lYXNlTWFwLlBvd2VyMixcbiAgICBQb3dlcjMgPSBfZWFzZU1hcC5Qb3dlcjMsXG4gICAgUG93ZXI0ID0gX2Vhc2VNYXAuUG93ZXI0LFxuICAgIExpbmVhciA9IF9lYXNlTWFwLkxpbmVhcixcbiAgICBRdWFkID0gX2Vhc2VNYXAuUXVhZCxcbiAgICBDdWJpYyA9IF9lYXNlTWFwLkN1YmljLFxuICAgIFF1YXJ0ID0gX2Vhc2VNYXAuUXVhcnQsXG4gICAgUXVpbnQgPSBfZWFzZU1hcC5RdWludCxcbiAgICBTdHJvbmcgPSBfZWFzZU1hcC5TdHJvbmcsXG4gICAgRWxhc3RpYyA9IF9lYXNlTWFwLkVsYXN0aWMsXG4gICAgQmFjayA9IF9lYXNlTWFwLkJhY2ssXG4gICAgU3RlcHBlZEVhc2UgPSBfZWFzZU1hcC5TdGVwcGVkRWFzZSxcbiAgICBCb3VuY2UgPSBfZWFzZU1hcC5Cb3VuY2UsXG4gICAgU2luZSA9IF9lYXNlTWFwLlNpbmUsXG4gICAgRXhwbyA9IF9lYXNlTWFwLkV4cG8sXG4gICAgQ2lyYyA9IF9lYXNlTWFwLkNpcmM7XG5leHBvcnQgeyBQb3dlcjAsIFBvd2VyMSwgUG93ZXIyLCBQb3dlcjMsIFBvd2VyNCwgTGluZWFyLCBRdWFkLCBDdWJpYywgUXVhcnQsIFF1aW50LCBTdHJvbmcsIEVsYXN0aWMsIEJhY2ssIFN0ZXBwZWRFYXNlLCBCb3VuY2UsIFNpbmUsIEV4cG8sIENpcmMgfTtcbmV4cG9ydCB7IFR3ZWVuIGFzIFR3ZWVuTWF4LCBUd2VlbiBhcyBUd2VlbkxpdGUsIFRpbWVsaW5lIGFzIFRpbWVsaW5lTWF4LCBUaW1lbGluZSBhcyBUaW1lbGluZUxpdGUsIGdzYXAgYXMgZGVmYXVsdCwgd3JhcCwgd3JhcFlveW8sIGRpc3RyaWJ1dGUsIHJhbmRvbSwgc25hcCwgbm9ybWFsaXplLCBnZXRVbml0LCBjbGFtcCwgc3BsaXRDb2xvciwgdG9BcnJheSwgc2VsZWN0b3IsIG1hcFJhbmdlLCBwaXBlLCB1bml0aXplLCBpbnRlcnBvbGF0ZSwgc2h1ZmZsZSB9OyAvL2V4cG9ydCBzb21lIGludGVybmFsIG1ldGhvZHMvb3JvamVjdHMgZm9yIHVzZSBpbiBDU1NQbHVnaW4gc28gdGhhdCB3ZSBjYW4gZXh0ZXJuYWxpemUgdGhhdCBmaWxlIGFuZCBhbGxvdyBjdXN0b20gYnVpbGRzIHRoYXQgZXhjbHVkZSBpdC5cblxuZXhwb3J0IHsgX2dldFByb3BlcnR5LCBfbnVtRXhwLCBfbnVtV2l0aFVuaXRFeHAsIF9pc1N0cmluZywgX2lzVW5kZWZpbmVkLCBfcmVuZGVyQ29tcGxleFN0cmluZywgX3JlbEV4cCwgX3NldERlZmF1bHRzLCBfcmVtb3ZlTGlua2VkTGlzdEl0ZW0sIF9mb3JFYWNoTmFtZSwgX3NvcnRQcm9wVHdlZW5zQnlQcmlvcml0eSwgX2NvbG9yU3RyaW5nRmlsdGVyLCBfcmVwbGFjZVJhbmRvbSwgX2NoZWNrUGx1Z2luLCBfcGx1Z2lucywgX3RpY2tlciwgX2NvbmZpZywgX3JvdW5kTW9kaWZpZXIsIF9yb3VuZCwgX21pc3NpbmdQbHVnaW4sIF9nZXRTZXR0ZXIsIF9nZXRDYWNoZSwgX2NvbG9yRXhwLCBfcGFyc2VSZWxhdGl2ZSB9OyIsImltcG9ydCB7IGdzYXAsIFBvd2VyMCwgUG93ZXIxLCBQb3dlcjIsIFBvd2VyMywgUG93ZXI0LCBMaW5lYXIsIFF1YWQsIEN1YmljLCBRdWFydCwgUXVpbnQsIFN0cm9uZywgRWxhc3RpYywgQmFjaywgU3RlcHBlZEVhc2UsIEJvdW5jZSwgU2luZSwgRXhwbywgQ2lyYywgVHdlZW5MaXRlLCBUaW1lbGluZUxpdGUsIFRpbWVsaW5lTWF4IH0gZnJvbSBcIi4vZ3NhcC1jb3JlLmpzXCI7XG5pbXBvcnQgeyBDU1NQbHVnaW4gfSBmcm9tIFwiLi9DU1NQbHVnaW4uanNcIjtcbnZhciBnc2FwV2l0aENTUyA9IGdzYXAucmVnaXN0ZXJQbHVnaW4oQ1NTUGx1Z2luKSB8fCBnc2FwLFxuICAgIC8vIHRvIHByb3RlY3QgZnJvbSB0cmVlIHNoYWtpbmdcblR3ZWVuTWF4V2l0aENTUyA9IGdzYXBXaXRoQ1NTLmNvcmUuVHdlZW47XG5leHBvcnQgeyBnc2FwV2l0aENTUyBhcyBnc2FwLCBnc2FwV2l0aENTUyBhcyBkZWZhdWx0LCBDU1NQbHVnaW4sIFR3ZWVuTWF4V2l0aENTUyBhcyBUd2Vlbk1heCwgVHdlZW5MaXRlLCBUaW1lbGluZU1heCwgVGltZWxpbmVMaXRlLCBQb3dlcjAsIFBvd2VyMSwgUG93ZXIyLCBQb3dlcjMsIFBvd2VyNCwgTGluZWFyLCBRdWFkLCBDdWJpYywgUXVhcnQsIFF1aW50LCBTdHJvbmcsIEVsYXN0aWMsIEJhY2ssIFN0ZXBwZWRFYXNlLCBCb3VuY2UsIFNpbmUsIEV4cG8sIENpcmMgfTsiLCIvKipcbiAqIFvmjIflrprjg5rjg7zjgrjjga7jgb/jgafnmbrngavjgZXjgZvjgovjgrnjgq/jg6rjg5fjg4jjga7mp4vmiJBdKGh0dHBzOi8vYi4wMjE4LmpwLzIwMjAwMzEwMTg0Ni5odG1sKVxuICovXG5leHBvcnQgdHlwZSBGdW5jdGlvbnMgPSB7XG4gIFtrZXk6IHN0cmluZ106ICgpID0+IHZvaWQ7XG59O1xuXG5jb25zdCBjYWxsQXBwID0gKGZ1bmN0aW9uczogRnVuY3Rpb25zLCBhcHBJZDogc3RyaW5nKSA9PiB7XG4gIC8vIOaMh+WumuOBleOCjOOBn+ODmuODvOOCuOWQjeOBruOCpOODmeODs+ODiOOBjOWtmOWcqOOBmeOCi+OBi+ODgeOCp+ODg+OCr1xuICBjb25zdCBoYXNGdW5jdGlvbiA9ICEhZnVuY3Rpb25zW2FwcElkXSAmJiB0eXBlb2YgZnVuY3Rpb25zW2FwcElkXSA9PT0gJ2Z1bmN0aW9uJztcbiAgaWYgKCFoYXNGdW5jdGlvbikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIOS4gOiHtOOBl+OBn+OCpOODmeODs+ODiOOCkuWun+ihjFxuICB0cnkge1xuICAgIGZ1bmN0aW9uc1thcHBJZF0oKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gIH1cbn07XG5cbi8qKlxuICog44Oa44O844K45Zu65pyJ44GuSlPjgpLlrp/ooYzjgZnjgovplqLmlbBcbiAqL1xuZXhwb3J0IGNvbnN0IGFwcExvYWRlciA9IChmdW5jdGlvbnM6IEZ1bmN0aW9ucykgPT4ge1xuICAvL+OCteOCpOODiOWFsemAmuOBrkpT44KS5a6f6KGMXG4gIGNhbGxBcHAoZnVuY3Rpb25zLCAnQ29tbW9uJyk7XG5cbiAgLy8gQXBwIElEIChib2R5W2RhdGEtYXBwXSnjgpLlj5blvpdcbiAgY29uc3QgYXBwSWQgPSBkb2N1bWVudC5ib2R5LmRhdGFzZXQuYXBwO1xuICBpZiAodHlwZW9mIGFwcElkID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIOODmuODvOOCuOWbuuacieOBrkpT44KS5a6f6KGMXG4gIGNhbGxBcHAoZnVuY3Rpb25zLCBhcHBJZCk7XG59O1xuIiwiY29uc3QgY29tbW9uU2FtcGxlRm4gPSAoKSA9PiB7XG4gIC8qIGVzbGludC1kaXNhYmxlICovY29uc29sZS5sb2coLi4ub29fb28oYDFmNGE3MV8wYCwnY29tbW9uJykpO1xufTtcblxuZXhwb3J0IGNvbnN0IENvbW1vbiA9ICgpID0+IHtcbiAgY29tbW9uU2FtcGxlRm4oKTtcbn07XG4vKiBlc2xpbnQtZGlzYWJsZSAqLztmdW5jdGlvbiBvb19jbSgpe3RyeXtyZXR1cm4gKDAsZXZhbCkoXCJnbG9iYWxUaGlzLl9jb25zb2xlX25pbmphXCIpIHx8ICgwLGV2YWwpKFwiLyogaHR0cHM6Ly9naXRodWIuY29tL3dhbGxhYnlqcy9jb25zb2xlLW5pbmphI2hvdy1kb2VzLWl0LXdvcmsgKi8ndXNlIHN0cmljdCc7dmFyIF8weDI4ZDY2NT1fMHgxMzcyOyhmdW5jdGlvbihfMHgzYzkwODYsXzB4MTExOGY2KXt2YXIgXzB4MWY3YjM5PV8weDEzNzIsXzB4NTQxYzI3PV8weDNjOTA4NigpO3doaWxlKCEhW10pe3RyeXt2YXIgXzB4ZTg0ODZhPXBhcnNlSW50KF8weDFmN2IzOSgweDEyZikpLzB4MSstcGFyc2VJbnQoXzB4MWY3YjM5KDB4MTQ1KSkvMHgyKihwYXJzZUludChfMHgxZjdiMzkoMHgxMjkpKS8weDMpKy1wYXJzZUludChfMHgxZjdiMzkoMHgxNWUpKS8weDQrcGFyc2VJbnQoXzB4MWY3YjM5KDB4MWU5KSkvMHg1K3BhcnNlSW50KF8weDFmN2IzOSgweDE1MSkpLzB4NistcGFyc2VJbnQoXzB4MWY3YjM5KDB4MWNmKSkvMHg3K3BhcnNlSW50KF8weDFmN2IzOSgweDEzYSkpLzB4OCoocGFyc2VJbnQoXzB4MWY3YjM5KDB4MWU2KSkvMHg5KTtpZihfMHhlODQ4NmE9PT1fMHgxMTE4ZjYpYnJlYWs7ZWxzZSBfMHg1NDFjMjdbJ3B1c2gnXShfMHg1NDFjMjdbJ3NoaWZ0J10oKSk7fWNhdGNoKF8weDI1OTkxNil7XzB4NTQxYzI3WydwdXNoJ10oXzB4NTQxYzI3WydzaGlmdCddKCkpO319fShfMHgzNmQ5LDB4MzE3YTYpKTt2YXIgdWU9T2JqZWN0W18weDI4ZDY2NSgweDE2MSldLHRlPU9iamVjdFtfMHgyOGQ2NjUoMHgxN2MpXSxoZT1PYmplY3RbXzB4MjhkNjY1KDB4MWQ4KV0sbGU9T2JqZWN0W18weDI4ZDY2NSgweDFhNCldLGZlPU9iamVjdFtfMHgyOGQ2NjUoMHgxZTcpXSxfZT1PYmplY3RbXzB4MjhkNjY1KDB4MTgyKV1bXzB4MjhkNjY1KDB4MWIwKV0scGU9KF8weDUzMTc2MSxfMHg1MmQzMGYsXzB4M2ZhZTZlLF8weDUxOGM2Yyk9Pnt2YXIgXzB4MjQyMDQ4PV8weDI4ZDY2NTtpZihfMHg1MmQzMGYmJnR5cGVvZiBfMHg1MmQzMGY9PSdvYmplY3QnfHx0eXBlb2YgXzB4NTJkMzBmPT1fMHgyNDIwNDgoMHgxYzkpKXtmb3IobGV0IF8weGVlYjU0NyBvZiBsZShfMHg1MmQzMGYpKSFfZVsnY2FsbCddKF8weDUzMTc2MSxfMHhlZWI1NDcpJiZfMHhlZWI1NDchPT1fMHgzZmFlNmUmJnRlKF8weDUzMTc2MSxfMHhlZWI1NDcseydnZXQnOigpPT5fMHg1MmQzMGZbXzB4ZWViNTQ3XSwnZW51bWVyYWJsZSc6IShfMHg1MThjNmM9aGUoXzB4NTJkMzBmLF8weGVlYjU0NykpfHxfMHg1MThjNmNbXzB4MjQyMDQ4KDB4MWE3KV19KTt9cmV0dXJuIF8weDUzMTc2MTt9LG5lPShfMHgxNWI3MmIsXzB4MTczNWQ5LF8weDQ1MTMzYik9PihfMHg0NTEzM2I9XzB4MTViNzJiIT1udWxsP3VlKGZlKF8weDE1YjcyYikpOnt9LHBlKF8weDE3MzVkOXx8IV8weDE1YjcyYnx8IV8weDE1YjcyYltfMHgyOGQ2NjUoMHgxYWUpXT90ZShfMHg0NTEzM2IsXzB4MjhkNjY1KDB4MWNhKSx7J3ZhbHVlJzpfMHgxNWI3MmIsJ2VudW1lcmFibGUnOiEweDB9KTpfMHg0NTEzM2IsXzB4MTViNzJiKSksUT1jbGFzc3tjb25zdHJ1Y3RvcihfMHgzM2U3OGEsXzB4NTY5NDY2LF8weDFlODQ5NCxfMHgxYzM0Y2Ype3ZhciBfMHg1ODY5ZWI9XzB4MjhkNjY1O3RoaXNbXzB4NTg2OWViKDB4MTRkKV09XzB4MzNlNzhhLHRoaXNbXzB4NTg2OWViKDB4MTYzKV09XzB4NTY5NDY2LHRoaXNbJ3BvcnQnXT1fMHgxZTg0OTQsdGhpc1tfMHg1ODY5ZWIoMHgxZDUpXT1fMHgxYzM0Y2YsdGhpc1snX2FsbG93ZWRUb1NlbmQnXT0hMHgwLHRoaXNbXzB4NTg2OWViKDB4MWE2KV09ITB4MCx0aGlzW18weDU4NjllYigweDEzMildPSEweDEsdGhpc1tfMHg1ODY5ZWIoMHgxYjQpXT0hMHgxLHRoaXNbJ19pbkJyb3dzZXInXT0hIXRoaXNbXzB4NTg2OWViKDB4MTRkKV1bJ1dlYlNvY2tldCddLHRoaXNbXzB4NTg2OWViKDB4MThjKV09bnVsbCx0aGlzWydfY29ubmVjdEF0dGVtcHRDb3VudCddPTB4MCx0aGlzW18weDU4NjllYigweDFhMyldPTB4MTQsdGhpc1tfMHg1ODY5ZWIoMHgxMGEpXT10aGlzW18weDU4NjllYigweDE0YildP18weDU4NjllYigweDE0ZSk6XzB4NTg2OWViKDB4MWU1KTt9YXN5bmNbJ2dldFdlYlNvY2tldENsYXNzJ10oKXt2YXIgXzB4NDg5YzRiPV8weDI4ZDY2NTtpZih0aGlzWydfV2ViU29ja2V0Q2xhc3MnXSlyZXR1cm4gdGhpc1tfMHg0ODljNGIoMHgxOGMpXTtsZXQgXzB4MmE5NmJiO2lmKHRoaXNbXzB4NDg5YzRiKDB4MTRiKV0pXzB4MmE5NmJiPXRoaXNbJ2dsb2JhbCddWydXZWJTb2NrZXQnXTtlbHNle2lmKHRoaXNbXzB4NDg5YzRiKDB4MTRkKV1bXzB4NDg5YzRiKDB4MWMwKV0/LlsnX1dlYlNvY2tldCddKV8weDJhOTZiYj10aGlzW18weDQ4OWM0YigweDE0ZCldW18weDQ4OWM0YigweDFjMCldPy5bXzB4NDg5YzRiKDB4MTMxKV07ZWxzZSB0cnl7bGV0IF8weDMwNGJkMD1hd2FpdCBpbXBvcnQoXzB4NDg5YzRiKDB4MWNjKSk7XzB4MmE5NmJiPShhd2FpdCBpbXBvcnQoKGF3YWl0IGltcG9ydChfMHg0ODljNGIoMHgxOGQpKSlbXzB4NDg5YzRiKDB4MTJlKV0oXzB4MzA0YmQwWydqb2luJ10odGhpc1tfMHg0ODljNGIoMHgxZDUpXSxfMHg0ODljNGIoMHgxODgpKSlbXzB4NDg5YzRiKDB4MWExKV0oKSkpW18weDQ4OWM0YigweDFjYSldO31jYXRjaHt0cnl7XzB4MmE5NmJiPXJlcXVpcmUocmVxdWlyZSgncGF0aCcpW18weDQ4OWM0YigweDE0MSldKHRoaXNbXzB4NDg5YzRiKDB4MWQ1KV0sJ3dzJykpO31jYXRjaHt0aHJvdyBuZXcgRXJyb3IoXzB4NDg5YzRiKDB4MTc5KSk7fX19cmV0dXJuIHRoaXNbXzB4NDg5YzRiKDB4MThjKV09XzB4MmE5NmJiLF8weDJhOTZiYjt9WydfY29ubmVjdFRvSG9zdE5vdyddKCl7dmFyIF8weDQ5ZWFjYz1fMHgyOGQ2NjU7dGhpc1tfMHg0OWVhY2MoMHgxYjQpXXx8dGhpc1tfMHg0OWVhY2MoMHgxMzIpXXx8dGhpc1tfMHg0OWVhY2MoMHgxYmUpXT49dGhpc1tfMHg0OWVhY2MoMHgxYTMpXXx8KHRoaXNbXzB4NDllYWNjKDB4MWE2KV09ITB4MSx0aGlzW18weDQ5ZWFjYygweDFiNCldPSEweDAsdGhpc1tfMHg0OWVhY2MoMHgxYmUpXSsrLHRoaXNbXzB4NDllYWNjKDB4MTdmKV09bmV3IFByb21pc2UoKF8weDUzYTUzMCxfMHgxOWUzOTApPT57dmFyIF8weDQxMWFiZT1fMHg0OWVhY2M7dGhpc1tfMHg0MTFhYmUoMHgxYmIpXSgpW18weDQxMWFiZSgweDFkMSldKF8weDMwYWM2OD0+e3ZhciBfMHgzMjIyNmY9XzB4NDExYWJlO2xldCBfMHg0NzJjZGQ9bmV3IF8weDMwYWM2OCgnd3M6Ly8nK3RoaXNbXzB4MzIyMjZmKDB4MTYzKV0rJzonK3RoaXNbJ3BvcnQnXSk7XzB4NDcyY2RkW18weDMyMjI2ZigweDFjNildPSgpPT57dmFyIF8weDRkMDU4NT1fMHgzMjIyNmY7dGhpc1tfMHg0ZDA1ODUoMHgxMWIpXT0hMHgxLHRoaXNbXzB4NGQwNTg1KDB4MWRlKV0oXzB4NDcyY2RkKSx0aGlzWydfYXR0ZW1wdFRvUmVjb25uZWN0U2hvcnRseSddKCksXzB4MTllMzkwKG5ldyBFcnJvcihfMHg0ZDA1ODUoMHgxNDYpKSk7fSxfMHg0NzJjZGRbXzB4MzIyMjZmKDB4MTMwKV09KCk9Pnt2YXIgXzB4MzI1ZDNmPV8weDMyMjI2Zjt0aGlzWydfaW5Ccm93c2VyJ118fF8weDQ3MmNkZFtfMHgzMjVkM2YoMHgxOWMpXSYmXzB4NDcyY2RkWydfc29ja2V0J11bXzB4MzI1ZDNmKDB4MTM4KV0mJl8weDQ3MmNkZFtfMHgzMjVkM2YoMHgxOWMpXVtfMHgzMjVkM2YoMHgxMzgpXSgpLF8weDUzYTUzMChfMHg0NzJjZGQpO30sXzB4NDcyY2RkW18weDMyMjI2ZigweDE3ZCldPSgpPT57dmFyIF8weDNmNTRjYT1fMHgzMjIyNmY7dGhpc1tfMHgzZjU0Y2EoMHgxYTYpXT0hMHgwLHRoaXNbXzB4M2Y1NGNhKDB4MWRlKV0oXzB4NDcyY2RkKSx0aGlzW18weDNmNTRjYSgweDE2YildKCk7fSxfMHg0NzJjZGRbXzB4MzIyMjZmKDB4MTVjKV09XzB4NWNiYmRmPT57dmFyIF8weDMwMDE0OT1fMHgzMjIyNmY7dHJ5e18weDVjYmJkZiYmXzB4NWNiYmRmW18weDMwMDE0OSgweDEzZCldJiZ0aGlzW18weDMwMDE0OSgweDE0YildJiZKU09OW18weDMwMDE0OSgweDE1YildKF8weDVjYmJkZlsnZGF0YSddKVsnbWV0aG9kJ109PT1fMHgzMDAxNDkoMHgxYzcpJiZ0aGlzW18weDMwMDE0OSgweDE0ZCldW18weDMwMDE0OSgweDEyZCldW18weDMwMDE0OSgweDFjNyldKCk7fWNhdGNoe319O30pW18weDQxMWFiZSgweDFkMSldKF8weDRkMzUxMj0+KHRoaXNbXzB4NDExYWJlKDB4MTMyKV09ITB4MCx0aGlzW18weDQxMWFiZSgweDFiNCldPSEweDEsdGhpc1snX2FsbG93ZWRUb0Nvbm5lY3RPblNlbmQnXT0hMHgxLHRoaXNbJ19hbGxvd2VkVG9TZW5kJ109ITB4MCx0aGlzW18weDQxMWFiZSgweDFiZSldPTB4MCxfMHg0ZDM1MTIpKVtfMHg0MTFhYmUoMHgxNDkpXShfMHg0MGQ5YjI9Pih0aGlzW18weDQxMWFiZSgweDEzMildPSEweDEsdGhpc1tfMHg0MTFhYmUoMHgxYjQpXT0hMHgxLF8weDE5ZTM5MChuZXcgRXJyb3IoXzB4NDExYWJlKDB4MTYwKSsoXzB4NDBkOWIyJiZfMHg0MGQ5YjJbXzB4NDExYWJlKDB4MTg5KV0pKSkpKTt9KSk7fVtfMHgyOGQ2NjUoMHgxZGUpXShfMHg0ODI4N2Upe3ZhciBfMHg0ZjkwMzc9XzB4MjhkNjY1O3RoaXNbJ19jb25uZWN0ZWQnXT0hMHgxLHRoaXNbXzB4NGY5MDM3KDB4MWI0KV09ITB4MTt0cnl7XzB4NDgyODdlW18weDRmOTAzNygweDE3ZCldPW51bGwsXzB4NDgyODdlWydvbmVycm9yJ109bnVsbCxfMHg0ODI4N2VbXzB4NGY5MDM3KDB4MTMwKV09bnVsbDt9Y2F0Y2h7fXRyeXtfMHg0ODI4N2VbXzB4NGY5MDM3KDB4MTY4KV08MHgyJiZfMHg0ODI4N2VbXzB4NGY5MDM3KDB4MWRhKV0oKTt9Y2F0Y2h7fX1bXzB4MjhkNjY1KDB4MTZiKV0oKXt2YXIgXzB4M2UyNDFlPV8weDI4ZDY2NTtjbGVhclRpbWVvdXQodGhpc1tfMHgzZTI0MWUoMHgxYzEpXSksISh0aGlzWydfY29ubmVjdEF0dGVtcHRDb3VudCddPj10aGlzWydfbWF4Q29ubmVjdEF0dGVtcHRDb3VudCddKSYmKHRoaXNbJ19yZWNvbm5lY3RUaW1lb3V0J109c2V0VGltZW91dCgoKT0+e3ZhciBfMHg0Y2U5YzQ9XzB4M2UyNDFlO3RoaXNbXzB4NGNlOWM0KDB4MTMyKV18fHRoaXNbXzB4NGNlOWM0KDB4MWI0KV18fCh0aGlzWydfY29ubmVjdFRvSG9zdE5vdyddKCksdGhpc1tfMHg0Y2U5YzQoMHgxN2YpXT8uWydjYXRjaCddKCgpPT50aGlzW18weDRjZTljNCgweDE2YildKCkpKTt9LDB4MWY0KSx0aGlzWydfcmVjb25uZWN0VGltZW91dCddW18weDNlMjQxZSgweDEzOCldJiZ0aGlzW18weDNlMjQxZSgweDFjMSldW18weDNlMjQxZSgweDEzOCldKCkpO31hc3luY1tfMHgyOGQ2NjUoMHgxZDkpXShfMHg0ZTA1MGIpe3ZhciBfMHg1OWI5N2U9XzB4MjhkNjY1O3RyeXtpZighdGhpc1snX2FsbG93ZWRUb1NlbmQnXSlyZXR1cm47dGhpc1tfMHg1OWI5N2UoMHgxYTYpXSYmdGhpc1tfMHg1OWI5N2UoMHgxYjIpXSgpLChhd2FpdCB0aGlzW18weDU5Yjk3ZSgweDE3ZildKVtfMHg1OWI5N2UoMHgxZDkpXShKU09OW18weDU5Yjk3ZSgweDE5NSldKF8weDRlMDUwYikpO31jYXRjaChfMHgxOTJhNWYpe2NvbnNvbGVbXzB4NTliOTdlKDB4MTExKV0odGhpc1tfMHg1OWI5N2UoMHgxMGEpXSsnOlxcXFx4MjAnKyhfMHgxOTJhNWYmJl8weDE5MmE1ZltfMHg1OWI5N2UoMHgxODkpXSkpLHRoaXNbXzB4NTliOTdlKDB4MTFiKV09ITB4MSx0aGlzW18weDU5Yjk3ZSgweDE2YildKCk7fX19O2Z1bmN0aW9uIFYoXzB4NWJkMzg4LF8weDNjYjE1NixfMHgzNWMyMjksXzB4MzE3MjA4LF8weDNhMDExNyl7dmFyIF8weDVlNGRmNT1fMHgyOGQ2NjU7bGV0IF8weDFlOTQxMD1fMHgzNWMyMjlbXzB4NWU0ZGY1KDB4MWFjKV0oJywnKVtfMHg1ZTRkZjUoMHgxNmQpXShfMHgyMWM1YzA9Pnt2YXIgXzB4MTZlOTJjPV8weDVlNGRmNTt0cnl7XzB4NWJkMzg4W18weDE2ZTkyYygweDE4MCldfHwoKF8weDNhMDExNz09PSduZXh0LmpzJ3x8XzB4M2EwMTE3PT09XzB4MTZlOTJjKDB4MTlhKXx8XzB4M2EwMTE3PT09XzB4MTZlOTJjKDB4MTU4KSkmJihfMHgzYTAxMTcrPV8weDViZDM4OFtfMHgxNmU5MmMoMHgxYzApXT8uW18weDE2ZTkyYygweDE0NCldPy5bJ25vZGUnXT8nXFxcXHgyMHNlcnZlcic6J1xcXFx4MjBicm93c2VyJyksXzB4NWJkMzg4W18weDE2ZTkyYygweDE4MCldPXsnaWQnOituZXcgRGF0ZSgpLCd0b29sJzpfMHgzYTAxMTd9KTtsZXQgXzB4MzU5MDZkPW5ldyBRKF8weDViZDM4OCxfMHgzY2IxNTYsXzB4MjFjNWMwLF8weDMxNzIwOCk7cmV0dXJuIF8weDM1OTA2ZFsnc2VuZCddW18weDE2ZTkyYygweDExMCldKF8weDM1OTA2ZCk7fWNhdGNoKF8weDQ5MTYyOCl7cmV0dXJuIGNvbnNvbGVbJ3dhcm4nXShfMHgxNmU5MmMoMHgxNmUpLF8weDQ5MTYyOCYmXzB4NDkxNjI4W18weDE2ZTkyYygweDE4OSldKSwoKT0+e307fX0pO3JldHVybiBfMHhmODIxNjY9Pl8weDFlOTQxMFtfMHg1ZTRkZjUoMHgxMmMpXShfMHg1NjRmMjU9Pl8weDU2NGYyNShfMHhmODIxNjYpKTt9ZnVuY3Rpb24gXzB4MTM3MihfMHgxYTUxMjMsXzB4MjlhZDJhKXt2YXIgXzB4MzZkOTcyPV8weDM2ZDkoKTtyZXR1cm4gXzB4MTM3Mj1mdW5jdGlvbihfMHgxMzcyNTgsXzB4MjI4NmE2KXtfMHgxMzcyNTg9XzB4MTM3MjU4LTB4MTA5O3ZhciBfMHgzM2M3YjU9XzB4MzZkOTcyW18weDEzNzI1OF07cmV0dXJuIF8weDMzYzdiNTt9LF8weDEzNzIoXzB4MWE1MTIzLF8weDI5YWQyYSk7fWZ1bmN0aW9uIEgoXzB4MWZhNzI4KXt2YXIgXzB4MmJjNjY2PV8weDI4ZDY2NTtsZXQgXzB4NDc3OTczPWZ1bmN0aW9uKF8weDExMTA4MCxfMHg1MjBiYTQpe3JldHVybiBfMHg1MjBiYTQtXzB4MTExMDgwO30sXzB4M2NiZmZjO2lmKF8weDFmYTcyOFsncGVyZm9ybWFuY2UnXSlfMHgzY2JmZmM9ZnVuY3Rpb24oKXt2YXIgXzB4M2Q0ZDVjPV8weDEzNzI7cmV0dXJuIF8weDFmYTcyOFtfMHgzZDRkNWMoMHgxNjkpXVtfMHgzZDRkNWMoMHgxNzgpXSgpO307ZWxzZXtpZihfMHgxZmE3MjhbXzB4MmJjNjY2KDB4MWMwKV0mJl8weDFmYTcyOFsncHJvY2VzcyddW18weDJiYzY2NigweDExNCldKV8weDNjYmZmYz1mdW5jdGlvbigpe3ZhciBfMHgyZTI2MWM9XzB4MmJjNjY2O3JldHVybiBfMHgxZmE3MjhbXzB4MmUyNjFjKDB4MWMwKV1bXzB4MmUyNjFjKDB4MTE0KV0oKTt9LF8weDQ3Nzk3Mz1mdW5jdGlvbihfMHg0ZmYxMGYsXzB4MTRkNThhKXtyZXR1cm4gMHgzZTgqKF8weDE0ZDU4YVsweDBdLV8weDRmZjEwZlsweDBdKSsoXzB4MTRkNThhWzB4MV0tXzB4NGZmMTBmWzB4MV0pLzB4ZjQyNDA7fTtlbHNlIHRyeXtsZXQge3BlcmZvcm1hbmNlOl8weDIwODJjOH09cmVxdWlyZShfMHgyYmM2NjYoMHgxNTQpKTtfMHgzY2JmZmM9ZnVuY3Rpb24oKXt2YXIgXzB4MmQ3ODczPV8weDJiYzY2NjtyZXR1cm4gXzB4MjA4MmM4W18weDJkNzg3MygweDE3OCldKCk7fTt9Y2F0Y2h7XzB4M2NiZmZjPWZ1bmN0aW9uKCl7cmV0dXJuK25ldyBEYXRlKCk7fTt9fXJldHVybnsnZWxhcHNlZCc6XzB4NDc3OTczLCd0aW1lU3RhbXAnOl8weDNjYmZmYywnbm93JzooKT0+RGF0ZVtfMHgyYmM2NjYoMHgxNzgpXSgpfTt9ZnVuY3Rpb24gXzB4MzZkOSgpe3ZhciBfMHgzZDBkYWU9WydvbmNsb3NlJywnbmVnYXRpdmVJbmZpbml0eScsJ193cycsJ19jb25zb2xlX25pbmphX3Nlc3Npb24nLCdbb2JqZWN0XFxcXHgyMEFycmF5XScsJ3Byb3RvdHlwZScsJ21hdGNoJywnX3R5cGUnLCdfYWRkUHJvcGVydHknLCd0cmFjZScsJ3dlYnBhY2snLCd3cy9pbmRleC5qcycsJ21lc3NhZ2UnLCdkZXB0aCcsJ19nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3InLCdfV2ViU29ja2V0Q2xhc3MnLCd1cmwnLCdjb25zb2xlJywndGVzdCcsJ3RvdGFsU3RyTGVuZ3RoJywnb2JqZWN0JywnUmVnRXhwJywnX2RhdGVUb1N0cmluZycsJ19TeW1ib2wnLCdzdHJpbmdpZnknLCdTeW1ib2wnLCdpbmRleE9mJywndGltZUVuZCcsJ2F1dG9FeHBhbmRNYXhEZXB0aCcsJ3JlbWl4JywnX2lzUHJpbWl0aXZlVHlwZScsJ19zb2NrZXQnLCdzdHJMZW5ndGgnLCdjb3VudCcsJ190cmVlTm9kZVByb3BlcnRpZXNCZWZvcmVGdWxsVmFsdWUnLCdwcm9wcycsJ3RvU3RyaW5nJywndmFsdWUnLCdfbWF4Q29ubmVjdEF0dGVtcHRDb3VudCcsJ2dldE93blByb3BlcnR5TmFtZXMnLCdub2RlJywnX2FsbG93ZWRUb0Nvbm5lY3RPblNlbmQnLCdlbnVtZXJhYmxlJywnX2hhc1NldE9uSXRzUGF0aCcsXFxcIi9Vc2Vycy9zdXp1a2ltYXNhcnUvLnZzY29kZS9leHRlbnNpb25zL3dhbGxhYnlqcy5jb25zb2xlLW5pbmphLTAuMC4xNTcvbm9kZV9tb2R1bGVzXFxcIiwnTkVHQVRJVkVfSU5GSU5JVFknLCdfcF9uYW1lJywnc3BsaXQnLCdfaXNVbmRlZmluZWQnLCdfX2VzJysnTW9kdWxlJywnX3BfJywnaGFzT3duUHJvcGVydHknLCdjYXBwZWRFbGVtZW50cycsJ19jb25uZWN0VG9Ib3N0Tm93JywnbG9nJywnX2Nvbm5lY3RpbmcnLCdhdXRvRXhwYW5kUHJldmlvdXNPYmplY3RzJywnX3Byb3BlcnR5QWNjZXNzb3InLCdudXh0JyxbXFxcImxvY2FsaG9zdFxcXCIsXFxcIjEyNy4wLjAuMVxcXCIsXFxcImV4YW1wbGUuY3lwcmVzcy5pb1xcXCIsXFxcIm1hc2FydS1zdXp1a2kubG9jYWxcXFwiLFxcXCIxOTIuMTY4LjAuM1xcXCIsXFxcIjE5Mi4xNjguMC4xMFxcXCJdLCdfY2FwSWZTdHJpbmcnLCdQT1NJVElWRV9JTkZJTklUWScsJ2dldFdlYlNvY2tldENsYXNzJywnaW5jbHVkZXMnLCdwYXJlbnQnLCdfY29ubmVjdEF0dGVtcHRDb3VudCcsJ3JlcGxhY2UnLCdwcm9jZXNzJywnX3JlY29ubmVjdFRpbWVvdXQnLCd2YWx1ZU9mJywnaG9zdG5hbWUnLCdkYXRlJywnOmxvZ1BvaW50SWQ6Jywnb25lcnJvcicsJ3JlbG9hZCcsJ1tvYmplY3RcXFxceDIwRGF0ZV0nLCdmdW5jdGlvbicsJ2RlZmF1bHQnLCc1NjYyNScsJ3BhdGgnLCdfaGFzU3ltYm9sUHJvcGVydHlPbkl0c1BhdGgnLCdfcF9sZW5ndGgnLCcxNTgxNzkwQkJLZnlkJywnZWxhcHNlZCcsJ3RoZW4nLCdIVE1MQWxsQ29sbGVjdGlvbicsJ0Vycm9yJywnbmFtZScsJ25vZGVNb2R1bGVzJywncG9wJywnc3RyaW5nJywnZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJywnc2VuZCcsJ2Nsb3NlJywnX3RyZWVOb2RlUHJvcGVydGllc0FmdGVyRnVsbFZhbHVlJywnX2lzTWFwJywnX2FkZGl0aW9uYWxNZXRhZGF0YScsJ19kaXNwb3NlV2Vic29ja2V0JywnU2V0JywnX3NvcnRQcm9wcycsJ3Bvc2l0aXZlSW5maW5pdHknLCdOdW1iZXInLCdfZ2V0T3duUHJvcGVydHlTeW1ib2xzJywncHVzaCcsJ0NvbnNvbGVcXFxceDIwTmluamFcXFxceDIwZmFpbGVkXFxcXHgyMHRvXFxcXHgyMHNlbmRcXFxceDIwbG9ncyxcXFxceDIwcmVzdGFydGluZ1xcXFx4MjB0aGVcXFxceDIwcHJvY2Vzc1xcXFx4MjBtYXlcXFxceDIwaGVscCcsJzl6enBRVFAnLCdnZXRQcm90b3R5cGVPZicsJ3Vua25vd24nLCcxOTQxNzE1dGNtb3F3JywnbGV2ZWwnLCdfY29uc29sZU5pbmphQWxsb3dlZFRvU3RhcnQnLCdleHByZXNzaW9uc1RvRXZhbHVhdGUnLCdfc2VuZEVycm9yTWVzc2FnZScsJ2NhcHBlZCcsJ3N0YWNrVHJhY2VMaW1pdCcsJ1tvYmplY3RcXFxceDIwQmlnSW50XScsJ19zZXROb2RlTGFiZWwnLCcxLjAuMCcsJ2JpbmQnLCd3YXJuJywnX2NsZWFuTm9kZScsJ19oYXNNYXBPbkl0c1BhdGgnLCdocnRpbWUnLCdfdW5kZWZpbmVkJywnX2tleVN0clJlZ0V4cCcsJ19ibGFja2xpc3RlZFByb3BlcnR5JywnY29uc3RydWN0b3InLCdlbGVtZW50cycsJ19zZXROb2RlUGVybWlzc2lvbnMnLCdfYWxsb3dlZFRvU2VuZCcsJ2dldE93blByb3BlcnR5U3ltYm9scycsJ3N1YnN0cicsJ19hZGRMb2FkTm9kZScsJ2N1cnJlbnQnLCdfb2JqZWN0VG9TdHJpbmcnLCdjb25jYXQnLCdiaWdpbnQnLCdnZXR0ZXInLCd1bnNoaWZ0JywnTWFwJywnX3Byb2Nlc3NUcmVlTm9kZVJlc3VsdCcsJ2lzRXhwcmVzc2lvblRvRXZhbHVhdGUnLCdyb290RXhwcmVzc2lvbicsJzc5NjIwc3F6U0ZIJywnbnVtYmVyJywnX3NldE5vZGVRdWVyeVBhdGgnLCdmb3JFYWNoJywnbG9jYXRpb24nLCdwYXRoVG9GaWxlVVJMJywnMzQ1NDE4TnB6eU5SJywnb25vcGVuJywnX1dlYlNvY2tldCcsJ19jb25uZWN0ZWQnLCdfcHJvcGVydHknLCdub0Z1bmN0aW9ucycsJ3NlcmlhbGl6ZScsJ2F1dG9FeHBhbmRQcm9wZXJ0eUNvdW50JywnYXV0b0V4cGFuZExpbWl0JywndW5yZWYnLCd0aW1lJywnMTQzMDYwMGJERGV3QicsJzE2ODczMzA0NzczNTUnLCdfaXNBcnJheScsJ2RhdGEnLCdfc2V0Tm9kZUV4cGFuZGFibGVTdGF0ZScsJ19zZXROb2RlRXhwcmVzc2lvblBhdGgnLCd0b0xvd2VyQ2FzZScsJ2pvaW4nLCdfY29uc29sZV9uaW5qYScsJ2Jvb2xlYW4nLCd2ZXJzaW9ucycsJzIwUVhXdUJNJywnbG9nZ2VyXFxcXHgyMHdlYnNvY2tldFxcXFx4MjBlcnJvcicsJzEyNy4wLjAuMScsJ19IVE1MQWxsQ29sbGVjdGlvbicsJ2NhdGNoJywndHlwZScsJ19pbkJyb3dzZXInLCcuLi4nLCdnbG9iYWwnLCdDb25zb2xlXFxcXHgyME5pbmphXFxcXHgyMGZhaWxlZFxcXFx4MjB0b1xcXFx4MjBzZW5kXFxcXHgyMGxvZ3MsXFxcXHgyMHJlZnJlc2hpbmdcXFxceDIwdGhlXFxcXHgyMHBhZ2VcXFxceDIwbWF5XFxcXHgyMGhlbHAnLCdhbGxTdHJMZW5ndGgnLCdyb290X2V4cCcsJzQzNDIwMmVVaHBuQScsJ19wcm9wZXJ0eU5hbWUnLCdhdXRvRXhwYW5kJywncGVyZl9ob29rcycsJ19yZWdFeHBUb1N0cmluZycsJ1tvYmplY3RcXFxceDIwU2V0XScsJ2NhbGwnLCdhc3RybycsJ2xlbmd0aCcsJ19hZGRPYmplY3RQcm9wZXJ0eScsJ3BhcnNlJywnb25tZXNzYWdlJywnbnVsbCcsJzExNjM2ODRVeElrZ0UnLCd1bmRlZmluZWQnLCdmYWlsZWRcXFxceDIwdG9cXFxceDIwY29ubmVjdFxcXFx4MjB0b1xcXFx4MjBob3N0OlxcXFx4MjAnLCdjcmVhdGUnLCdhcnJheScsJ2hvc3QnLCdzeW1ib2wnLCdzb3J0Jywnc2V0dGVyJywnYXJndW1lbnRSZXNvbHV0aW9uRXJyb3InLCdyZWFkeVN0YXRlJywncGVyZm9ybWFuY2UnLCdmdW5jTmFtZScsJ19hdHRlbXB0VG9SZWNvbm5lY3RTaG9ydGx5JywnX2lzU2V0JywnbWFwJywnbG9nZ2VyXFxcXHgyMGZhaWxlZFxcXFx4MjB0b1xcXFx4MjBjb25uZWN0XFxcXHgyMHRvXFxcXHgyMGhvc3QnLCdfc2V0Tm9kZUlkJywncmVkdWNlTGltaXRzJywnX2lzTmVnYXRpdmVaZXJvJywnW29iamVjdFxcXFx4MjBNYXBdJywnX3F1b3RlZFJlZ0V4cCcsJ19pc1ByaW1pdGl2ZVdyYXBwZXJUeXBlJywnaGl0cycsJ2luZGV4Jywnc29ydFByb3BzJywnbm93JywnZmFpbGVkXFxcXHgyMHRvXFxcXHgyMGZpbmRcXFxceDIwYW5kXFxcXHgyMGxvYWRcXFxceDIwV2ViU29ja2V0Jywnc2V0JywncmVzb2x2ZUdldHRlcnMnLCdkZWZpbmVQcm9wZXJ0eSddO18weDM2ZDk9ZnVuY3Rpb24oKXtyZXR1cm4gXzB4M2QwZGFlO307cmV0dXJuIF8weDM2ZDkoKTt9ZnVuY3Rpb24gWChfMHg1YmRhNjYsXzB4MjEyYjJmLF8weDRkZGFkNil7dmFyIF8weDU2ZTdjYT1fMHgyOGQ2NjU7aWYoXzB4NWJkYTY2WydfY29uc29sZU5pbmphQWxsb3dlZFRvU3RhcnQnXSE9PXZvaWQgMHgwKXJldHVybiBfMHg1YmRhNjZbJ19jb25zb2xlTmluamFBbGxvd2VkVG9TdGFydCddO2xldCBfMHg1MjI0Njc9XzB4NWJkYTY2W18weDU2ZTdjYSgweDFjMCldPy5bJ3ZlcnNpb25zJ10/LltfMHg1NmU3Y2EoMHgxYTUpXTtyZXR1cm4gXzB4NTIyNDY3JiZfMHg0ZGRhZDY9PT1fMHg1NmU3Y2EoMHgxYjcpP18weDViZGE2NltfMHg1NmU3Y2EoMHgxZWIpXT0hMHgxOl8weDViZGE2NltfMHg1NmU3Y2EoMHgxZWIpXT1fMHg1MjI0Njd8fCFfMHgyMTJiMmZ8fF8weDViZGE2NlsnbG9jYXRpb24nXT8uWydob3N0bmFtZSddJiZfMHgyMTJiMmZbXzB4NTZlN2NhKDB4MWJjKV0oXzB4NWJkYTY2W18weDU2ZTdjYSgweDEyZCldW18weDU2ZTdjYSgweDFjMyldKSxfMHg1YmRhNjZbXzB4NTZlN2NhKDB4MWViKV07fSgoXzB4NTdiNDYzLF8weDE5MTdkMCxfMHg2MDA0NDQsXzB4NTU2MmIzLF8weGNmYzg5MyxfMHgxYjBjMWMsXzB4NDYwYzllLF8weDUyZTdmZixfMHgxYmQ5NzUpPT57dmFyIF8weDJlY2I3Mz1fMHgyOGQ2NjU7aWYoXzB4NTdiNDYzW18weDJlY2I3MygweDE0MildKXJldHVybiBfMHg1N2I0NjNbJ19jb25zb2xlX25pbmphJ107aWYoIVgoXzB4NTdiNDYzLF8weDUyZTdmZixfMHhjZmM4OTMpKXJldHVybiBfMHg1N2I0NjNbXzB4MmVjYjczKDB4MTQyKV09eydjb25zb2xlTG9nJzooKT0+e30sJ2NvbnNvbGVUcmFjZSc6KCk9Pnt9LCdjb25zb2xlVGltZSc6KCk9Pnt9LCdjb25zb2xlVGltZUVuZCc6KCk9Pnt9LCdhdXRvTG9nJzooKT0+e30sJ2F1dG9UcmFjZSc6KCk9Pnt9LCdhdXRvVGltZSc6KCk9Pnt9LCdhdXRvVGltZUVuZCc6KCk9Pnt9fSxfMHg1N2I0NjNbXzB4MmVjYjczKDB4MTQyKV07bGV0IF8weDVmNDI4Nz17J3Byb3BzJzoweDY0LCdlbGVtZW50cyc6MHg2NCwnc3RyTGVuZ3RoJzoweDQwMCoweDMyLCd0b3RhbFN0ckxlbmd0aCc6MHg0MDAqMHgzMiwnYXV0b0V4cGFuZExpbWl0JzoweDEzODgsJ2F1dG9FeHBhbmRNYXhEZXB0aCc6MHhhfSxfMHgzNjdjODA9eydwcm9wcyc6MHg1LCdlbGVtZW50cyc6MHg1LCdzdHJMZW5ndGgnOjB4MTAwLCd0b3RhbFN0ckxlbmd0aCc6MHgxMDAqMHgzLCdhdXRvRXhwYW5kTGltaXQnOjB4MWUsJ2F1dG9FeHBhbmRNYXhEZXB0aCc6MHgyfSxfMHg1Y2ZmODY9SChfMHg1N2I0NjMpLF8weDU3ODdjZD1fMHg1Y2ZmODZbXzB4MmVjYjczKDB4MWQwKV0sXzB4NGFjNzY3PV8weDVjZmY4NlsndGltZVN0YW1wJ10sXzB4ZDUzMmExPV8weDVjZmY4Nlsnbm93J10sXzB4MTc3ZmQxPXsnaGl0cyc6e30sJ3RzJzp7fX0sXzB4MmI3ZDI2PV8weDNkNWNmMj0+e18weDE3N2ZkMVsndHMnXVtfMHgzZDVjZjJdPV8weDRhYzc2NygpO30sXzB4MjNiNDU1PShfMHhjZGY2MTgsXzB4MTRhNDkpPT57bGV0IF8weDU3YjhkMz1fMHgxNzdmZDFbJ3RzJ11bXzB4MTRhNDldO2lmKGRlbGV0ZSBfMHgxNzdmZDFbJ3RzJ11bXzB4MTRhNDldLF8weDU3YjhkMyl7bGV0IF8weDEyYmJiZj1fMHg1Nzg3Y2QoXzB4NTdiOGQzLF8weDRhYzc2NygpKTtfMHgzZmQ3NTcoXzB4NDFmN2ZiKCd0aW1lJyxfMHhjZGY2MTgsXzB4ZDUzMmExKCksXzB4M2EzNjQ2LFtfMHgxMmJiYmZdLF8weDE0YTQ5KSk7fX0sXzB4MzY5NzFlPV8weDI5MTk2NT0+XzB4NDM0OTNkPT57dmFyIF8weDI0ZGI2Zj1fMHgyZWNiNzM7dHJ5e18weDJiN2QyNihfMHg0MzQ5M2QpLF8weDI5MTk2NShfMHg0MzQ5M2QpO31maW5hbGx5e18weDU3YjQ2M1tfMHgyNGRiNmYoMHgxOGUpXVtfMHgyNGRiNmYoMHgxMzkpXT1fMHgyOTE5NjU7fX0sXzB4NjNmNWMzPV8weDIxMzQyZT0+XzB4NDQ3NDY1PT57dmFyIF8weDRkZWE5ND1fMHgyZWNiNzM7dHJ5e2xldCBbXzB4MjgwMjM3LF8weDUxNTEzYV09XzB4NDQ3NDY1WydzcGxpdCddKF8weDRkZWE5NCgweDFjNSkpO18weDIzYjQ1NShfMHg1MTUxM2EsXzB4MjgwMjM3KSxfMHgyMTM0MmUoXzB4MjgwMjM3KTt9ZmluYWxseXtfMHg1N2I0NjNbXzB4NGRlYTk0KDB4MThlKV1bXzB4NGRlYTk0KDB4MTk4KV09XzB4MjEzNDJlO319O18weDU3YjQ2M1snX2NvbnNvbGVfbmluamEnXT17J2NvbnNvbGVMb2cnOihfMHgxNzk4NGYsXzB4M2NjNWU2KT0+e3ZhciBfMHgyMDc1MTM9XzB4MmVjYjczO18weDU3YjQ2M1tfMHgyMDc1MTMoMHgxOGUpXVsnbG9nJ11bXzB4MjA3NTEzKDB4MWQ0KV0hPT0nZGlzYWJsZWRMb2cnJiZfMHgzZmQ3NTcoXzB4NDFmN2ZiKF8weDIwNzUxMygweDFiMyksXzB4MTc5ODRmLF8weGQ1MzJhMSgpLF8weDNhMzY0NixfMHgzY2M1ZTYpKTt9LCdjb25zb2xlVHJhY2UnOihfMHgzOGJmOWMsXzB4NGQyYWQxKT0+e3ZhciBfMHg0YmI4YTM9XzB4MmVjYjczO18weDU3YjQ2M1snY29uc29sZSddWydsb2cnXVtfMHg0YmI4YTMoMHgxZDQpXSE9PSdkaXNhYmxlZFRyYWNlJyYmXzB4M2ZkNzU3KF8weDQxZjdmYigndHJhY2UnLF8weDM4YmY5YyxfMHhkNTMyYTEoKSxfMHgzYTM2NDYsXzB4NGQyYWQxKSk7fSwnY29uc29sZVRpbWUnOigpPT57dmFyIF8weDIxZGRkYz1fMHgyZWNiNzM7XzB4NTdiNDYzW18weDIxZGRkYygweDE4ZSldW18weDIxZGRkYygweDEzOSldPV8weDM2OTcxZShfMHg1N2I0NjNbXzB4MjFkZGRjKDB4MThlKV1bXzB4MjFkZGRjKDB4MTM5KV0pO30sJ2NvbnNvbGVUaW1lRW5kJzooKT0+e3ZhciBfMHgxZDYyZGU9XzB4MmVjYjczO18weDU3YjQ2M1tfMHgxZDYyZGUoMHgxOGUpXVtfMHgxZDYyZGUoMHgxOTgpXT1fMHg2M2Y1YzMoXzB4NTdiNDYzW18weDFkNjJkZSgweDE4ZSldW18weDFkNjJkZSgweDE5OCldKTt9LCdhdXRvTG9nJzooXzB4NGZiMzIzLF8weDVkODEyYyk9Pnt2YXIgXzB4MjE3YWUxPV8weDJlY2I3MztfMHgzZmQ3NTcoXzB4NDFmN2ZiKF8weDIxN2FlMSgweDFiMyksXzB4NWQ4MTJjLF8weGQ1MzJhMSgpLF8weDNhMzY0NixbXzB4NGZiMzIzXSkpO30sJ2F1dG9UcmFjZSc6KF8weDQ5OGEzYyxfMHg0ODA0NzEpPT57dmFyIF8weDM5MmFmNT1fMHgyZWNiNzM7XzB4M2ZkNzU3KF8weDQxZjdmYihfMHgzOTJhZjUoMHgxODYpLF8weDQ4MDQ3MSxfMHhkNTMyYTEoKSxfMHgzYTM2NDYsW18weDQ5OGEzY10pKTt9LCdhdXRvVGltZSc6KF8weDVlOTU4ZixfMHgzZWU3Y2QsXzB4NTdlOWFhKT0+e18weDJiN2QyNihfMHg1N2U5YWEpO30sJ2F1dG9UaW1lRW5kJzooXzB4MjViMzNkLF8weDM4ZDgzOSxfMHgyMzBkY2MpPT57XzB4MjNiNDU1KF8weDM4ZDgzOSxfMHgyMzBkY2MpO319O2xldCBfMHgzZmQ3NTc9VihfMHg1N2I0NjMsXzB4MTkxN2QwLF8weDYwMDQ0NCxfMHg1NTYyYjMsXzB4Y2ZjODkzKSxfMHgzYTM2NDY9XzB4NTdiNDYzW18weDJlY2I3MygweDE4MCldO2NsYXNzIF8weGQ5NmQ2OXtjb25zdHJ1Y3Rvcigpe3ZhciBfMHgxODM5MmQ9XzB4MmVjYjczO3RoaXNbJ19rZXlTdHJSZWdFeHAnXT0vXig/ISg/OmRvfGlmfGlufGZvcnxsZXR8bmV3fHRyeXx2YXJ8Y2FzZXxlbHNlfGVudW18ZXZhbHxmYWxzZXxudWxsfHRoaXN8dHJ1ZXx2b2lkfHdpdGh8YnJlYWt8Y2F0Y2h8Y2xhc3N8Y29uc3R8c3VwZXJ8dGhyb3d8d2hpbGV8eWllbGR8ZGVsZXRlfGV4cG9ydHxpbXBvcnR8cHVibGljfHJldHVybnxzdGF0aWN8c3dpdGNofHR5cGVvZnxkZWZhdWx0fGV4dGVuZHN8ZmluYWxseXxwYWNrYWdlfHByaXZhdGV8Y29udGludWV8ZGVidWdnZXJ8ZnVuY3Rpb258YXJndW1lbnRzfGludGVyZmFjZXxwcm90ZWN0ZWR8aW1wbGVtZW50c3xpbnN0YW5jZW9mKSQpW18kYS16QS1aXFxcXHhBMC1cXFxcdUZGRkZdW18kYS16QS1aMC05XFxcXHhBMC1cXFxcdUZGRkZdKiQvLHRoaXNbJ19udW1iZXJSZWdFeHAnXT0vXigwfFsxLTldWzAtOV0qKSQvLHRoaXNbXzB4MTgzOTJkKDB4MTczKV09LycoW15cXFxcXFxcXCddfFxcXFxcXFxcJykqJy8sdGhpc1tfMHgxODM5MmQoMHgxMTUpXT1fMHg1N2I0NjNbXzB4MTgzOTJkKDB4MTVmKV0sdGhpc1tfMHgxODM5MmQoMHgxNDgpXT1fMHg1N2I0NjNbXzB4MTgzOTJkKDB4MWQyKV0sdGhpc1tfMHgxODM5MmQoMHgxOGIpXT1PYmplY3RbXzB4MTgzOTJkKDB4MWQ4KV0sdGhpc1snX2dldE93blByb3BlcnR5TmFtZXMnXT1PYmplY3RbXzB4MTgzOTJkKDB4MWE0KV0sdGhpc1tfMHgxODM5MmQoMHgxOTQpXT1fMHg1N2I0NjNbXzB4MTgzOTJkKDB4MTk2KV0sdGhpc1snX3JlZ0V4cFRvU3RyaW5nJ109UmVnRXhwWydwcm90b3R5cGUnXVtfMHgxODM5MmQoMHgxYTEpXSx0aGlzW18weDE4MzkyZCgweDE5MyldPURhdGVbXzB4MTgzOTJkKDB4MTgyKV1bJ3RvU3RyaW5nJ107fVtfMHgyZWNiNzMoMHgxMzUpXShfMHg1NDhhODgsXzB4OGQ2NDUxLF8weDNjYjA4YSxfMHg3ODU0OGQpe3ZhciBfMHgyZjY4YzU9XzB4MmVjYjczLF8weDEyYmI0ZT10aGlzLF8weDRiZjkyMT1fMHgzY2IwOGFbXzB4MmY2OGM1KDB4MTUzKV07ZnVuY3Rpb24gXzB4NDkyMzZhKF8weDhlOGQ1ZCxfMHgxOTU2NTYsXzB4NGNlMGUyKXt2YXIgXzB4NTQ4MjU1PV8weDJmNjhjNTtfMHgxOTU2NTZbXzB4NTQ4MjU1KDB4MTRhKV09XzB4NTQ4MjU1KDB4MWU4KSxfMHgxOTU2NTZbJ2Vycm9yJ109XzB4OGU4ZDVkW18weDU0ODI1NSgweDE4OSldLF8weDUxMWNhMT1fMHg0Y2UwZTJbJ25vZGUnXVtfMHg1NDgyNTUoMHgxMWYpXSxfMHg0Y2UwZTJbXzB4NTQ4MjU1KDB4MWE1KV1bXzB4NTQ4MjU1KDB4MTFmKV09XzB4MTk1NjU2LF8weDEyYmI0ZVtfMHg1NDgyNTUoMHgxOWYpXShfMHgxOTU2NTYsXzB4NGNlMGUyKTt9aWYoXzB4OGQ2NDUxJiZfMHg4ZDY0NTFbXzB4MmY2OGM1KDB4MTY3KV0pXzB4NDkyMzZhKF8weDhkNjQ1MSxfMHg1NDhhODgsXzB4M2NiMDhhKTtlbHNlIHRyeXtfMHgzY2IwOGFbXzB4MmY2OGM1KDB4MWVhKV0rKyxfMHgzY2IwOGFbXzB4MmY2OGM1KDB4MTUzKV0mJl8weDNjYjA4YVtfMHgyZjY4YzUoMHgxYjUpXVtfMHgyZjY4YzUoMHgxZTQpXShfMHg4ZDY0NTEpO3ZhciBfMHgzMDgxMGIsXzB4M2VlZGEwLF8weDIxNDg3YSxfMHg0MzI5MzEsXzB4MTkxYjY1PVtdLF8weDE5YjIyZD1bXSxfMHg1Yzk4MjEsXzB4MjFlMGYxPXRoaXNbXzB4MmY2OGM1KDB4MTg0KV0oXzB4OGQ2NDUxKSxfMHgzMTc3YmQ9XzB4MjFlMGYxPT09XzB4MmY2OGM1KDB4MTYyKSxfMHgxNmVhYTg9ITB4MSxfMHg0ODc3NDY9XzB4MjFlMGYxPT09XzB4MmY2OGM1KDB4MWM5KSxfMHgxMTFhODQ9dGhpc1tfMHgyZjY4YzUoMHgxOWIpXShfMHgyMWUwZjEpLF8weDNlN2JiYj10aGlzW18weDJmNjhjNSgweDE3NCldKF8weDIxZTBmMSksXzB4M2U5NWM0PV8weDExMWE4NHx8XzB4M2U3YmJiLF8weDFjZjM0YT17fSxfMHg1MTUyNTY9MHgwLF8weDFkNGJkMD0hMHgxLF8weDUxMWNhMSxfMHgxNjgwNzg9L14oKFsxLTldezF9WzAtOV0qKXwwKSQvO2lmKF8weDNjYjA4YVtfMHgyZjY4YzUoMHgxOGEpXSl7aWYoXzB4MzE3N2JkKXtpZihfMHgzZWVkYTA9XzB4OGQ2NDUxW18weDJmNjhjNSgweDE1OSldLF8weDNlZWRhMD5fMHgzY2IwOGFbXzB4MmY2OGM1KDB4MTE5KV0pe2ZvcihfMHgyMTQ4N2E9MHgwLF8weDQzMjkzMT1fMHgzY2IwOGFbJ2VsZW1lbnRzJ10sXzB4MzA4MTBiPV8weDIxNDg3YTtfMHgzMDgxMGI8XzB4NDMyOTMxO18weDMwODEwYisrKV8weDE5YjIyZFtfMHgyZjY4YzUoMHgxZTQpXShfMHgxMmJiNGVbJ19hZGRQcm9wZXJ0eSddKF8weDE5MWI2NSxfMHg4ZDY0NTEsXzB4MjFlMGYxLF8weDMwODEwYixfMHgzY2IwOGEpKTtfMHg1NDhhODhbXzB4MmY2OGM1KDB4MWIxKV09ITB4MDt9ZWxzZXtmb3IoXzB4MjE0ODdhPTB4MCxfMHg0MzI5MzE9XzB4M2VlZGEwLF8weDMwODEwYj1fMHgyMTQ4N2E7XzB4MzA4MTBiPF8weDQzMjkzMTtfMHgzMDgxMGIrKylfMHgxOWIyMmRbXzB4MmY2OGM1KDB4MWU0KV0oXzB4MTJiYjRlW18weDJmNjhjNSgweDE4NSldKF8weDE5MWI2NSxfMHg4ZDY0NTEsXzB4MjFlMGYxLF8weDMwODEwYixfMHgzY2IwOGEpKTt9XzB4M2NiMDhhW18weDJmNjhjNSgweDEzNildKz1fMHgxOWIyMmRbXzB4MmY2OGM1KDB4MTU5KV07fWlmKCEoXzB4MjFlMGYxPT09XzB4MmY2OGM1KDB4MTVkKXx8XzB4MjFlMGYxPT09J3VuZGVmaW5lZCcpJiYhXzB4MTExYTg0JiZfMHgyMWUwZjEhPT0nU3RyaW5nJyYmXzB4MjFlMGYxIT09J0J1ZmZlcicmJl8weDIxZTBmMSE9PV8weDJmNjhjNSgweDEyMikpe3ZhciBfMHgxZWVkNjk9XzB4Nzg1NDhkWydwcm9wcyddfHxfMHgzY2IwOGFbXzB4MmY2OGM1KDB4MWEwKV07aWYodGhpc1tfMHgyZjY4YzUoMHgxNmMpXShfMHg4ZDY0NTEpPyhfMHgzMDgxMGI9MHgwLF8weDhkNjQ1MVtfMHgyZjY4YzUoMHgxMmMpXShmdW5jdGlvbihfMHhkOWZmNGIpe3ZhciBfMHgyNDhjMzI9XzB4MmY2OGM1O2lmKF8weDUxNTI1NisrLF8weDNjYjA4YVtfMHgyNDhjMzIoMHgxMzYpXSsrLF8weDUxNTI1Nj5fMHgxZWVkNjkpe18weDFkNGJkMD0hMHgwO3JldHVybjt9aWYoIV8weDNjYjA4YVtfMHgyNDhjMzIoMHgxMjcpXSYmXzB4M2NiMDhhW18weDI0OGMzMigweDE1MyldJiZfMHgzY2IwOGFbXzB4MjQ4YzMyKDB4MTM2KV0+XzB4M2NiMDhhW18weDI0OGMzMigweDEzNyldKXtfMHgxZDRiZDA9ITB4MDtyZXR1cm47fV8weDE5YjIyZFtfMHgyNDhjMzIoMHgxZTQpXShfMHgxMmJiNGVbXzB4MjQ4YzMyKDB4MTg1KV0oXzB4MTkxYjY1LF8weDhkNjQ1MSxfMHgyNDhjMzIoMHgxZGYpLF8weDMwODEwYisrLF8weDNjYjA4YSxmdW5jdGlvbihfMHg1OTg1M2Mpe3JldHVybiBmdW5jdGlvbigpe3JldHVybiBfMHg1OTg1M2M7fTt9KF8weGQ5ZmY0YikpKTt9KSk6dGhpc1tfMHgyZjY4YzUoMHgxZGMpXShfMHg4ZDY0NTEpJiZfMHg4ZDY0NTFbJ2ZvckVhY2gnXShmdW5jdGlvbihfMHg3ODhhOGMsXzB4NTk4MjkxKXt2YXIgXzB4NWVkYTAwPV8weDJmNjhjNTtpZihfMHg1MTUyNTYrKyxfMHgzY2IwOGFbXzB4NWVkYTAwKDB4MTM2KV0rKyxfMHg1MTUyNTY+XzB4MWVlZDY5KXtfMHgxZDRiZDA9ITB4MDtyZXR1cm47fWlmKCFfMHgzY2IwOGFbXzB4NWVkYTAwKDB4MTI3KV0mJl8weDNjYjA4YVtfMHg1ZWRhMDAoMHgxNTMpXSYmXzB4M2NiMDhhWydhdXRvRXhwYW5kUHJvcGVydHlDb3VudCddPl8weDNjYjA4YVtfMHg1ZWRhMDAoMHgxMzcpXSl7XzB4MWQ0YmQwPSEweDA7cmV0dXJuO312YXIgXzB4Mzk0YmY1PV8weDU5ODI5MVtfMHg1ZWRhMDAoMHgxYTEpXSgpO18weDM5NGJmNVtfMHg1ZWRhMDAoMHgxNTkpXT4weDY0JiYoXzB4Mzk0YmY1PV8weDM5NGJmNVsnc2xpY2UnXSgweDAsMHg2NCkrXzB4NWVkYTAwKDB4MTRjKSksXzB4MTliMjJkW18weDVlZGEwMCgweDFlNCldKF8weDEyYmI0ZVtfMHg1ZWRhMDAoMHgxODUpXShfMHgxOTFiNjUsXzB4OGQ2NDUxLF8weDVlZGEwMCgweDEyNSksXzB4Mzk0YmY1LF8weDNjYjA4YSxmdW5jdGlvbihfMHg1MTA1N2Upe3JldHVybiBmdW5jdGlvbigpe3JldHVybiBfMHg1MTA1N2U7fTt9KF8weDc4OGE4YykpKTt9KSwhXzB4MTZlYWE4KXt0cnl7Zm9yKF8weDVjOTgyMSBpbiBfMHg4ZDY0NTEpaWYoIShfMHgzMTc3YmQmJl8weDE2ODA3OFtfMHgyZjY4YzUoMHgxOGYpXShfMHg1Yzk4MjEpKSYmIXRoaXNbXzB4MmY2OGM1KDB4MTE3KV0oXzB4OGQ2NDUxLF8weDVjOTgyMSxfMHgzY2IwOGEpKXtpZihfMHg1MTUyNTYrKyxfMHgzY2IwOGFbXzB4MmY2OGM1KDB4MTM2KV0rKyxfMHg1MTUyNTY+XzB4MWVlZDY5KXtfMHgxZDRiZDA9ITB4MDticmVhazt9aWYoIV8weDNjYjA4YVtfMHgyZjY4YzUoMHgxMjcpXSYmXzB4M2NiMDhhWydhdXRvRXhwYW5kJ10mJl8weDNjYjA4YVtfMHgyZjY4YzUoMHgxMzYpXT5fMHgzY2IwOGFbXzB4MmY2OGM1KDB4MTM3KV0pe18weDFkNGJkMD0hMHgwO2JyZWFrO31fMHgxOWIyMmRbXzB4MmY2OGM1KDB4MWU0KV0oXzB4MTJiYjRlWydfYWRkT2JqZWN0UHJvcGVydHknXShfMHgxOTFiNjUsXzB4MWNmMzRhLF8weDhkNjQ1MSxfMHgyMWUwZjEsXzB4NWM5ODIxLF8weDNjYjA4YSkpO319Y2F0Y2h7fWlmKF8weDFjZjM0YVtfMHgyZjY4YzUoMHgxY2UpXT0hMHgwLF8weDQ4Nzc0NiYmKF8weDFjZjM0YVtfMHgyZjY4YzUoMHgxYWIpXT0hMHgwKSwhXzB4MWQ0YmQwKXt2YXIgXzB4NTk5MTJlPVtdW18weDJmNjhjNSgweDEyMSldKHRoaXNbJ19nZXRPd25Qcm9wZXJ0eU5hbWVzJ10oXzB4OGQ2NDUxKSlbXzB4MmY2OGM1KDB4MTIxKV0odGhpc1tfMHgyZjY4YzUoMHgxZTMpXShfMHg4ZDY0NTEpKTtmb3IoXzB4MzA4MTBiPTB4MCxfMHgzZWVkYTA9XzB4NTk5MTJlW18weDJmNjhjNSgweDE1OSldO18weDMwODEwYjxfMHgzZWVkYTA7XzB4MzA4MTBiKyspaWYoXzB4NWM5ODIxPV8weDU5OTEyZVtfMHgzMDgxMGJdLCEoXzB4MzE3N2JkJiZfMHgxNjgwNzhbXzB4MmY2OGM1KDB4MThmKV0oXzB4NWM5ODIxW18weDJmNjhjNSgweDFhMSldKCkpKSYmIXRoaXNbXzB4MmY2OGM1KDB4MTE3KV0oXzB4OGQ2NDUxLF8weDVjOTgyMSxfMHgzY2IwOGEpJiYhXzB4MWNmMzRhWydfcF8nK18weDVjOTgyMVtfMHgyZjY4YzUoMHgxYTEpXSgpXSl7aWYoXzB4NTE1MjU2KyssXzB4M2NiMDhhW18weDJmNjhjNSgweDEzNildKyssXzB4NTE1MjU2Pl8weDFlZWQ2OSl7XzB4MWQ0YmQwPSEweDA7YnJlYWs7fWlmKCFfMHgzY2IwOGFbXzB4MmY2OGM1KDB4MTI3KV0mJl8weDNjYjA4YVtfMHgyZjY4YzUoMHgxNTMpXSYmXzB4M2NiMDhhW18weDJmNjhjNSgweDEzNildPl8weDNjYjA4YVsnYXV0b0V4cGFuZExpbWl0J10pe18weDFkNGJkMD0hMHgwO2JyZWFrO31fMHgxOWIyMmRbXzB4MmY2OGM1KDB4MWU0KV0oXzB4MTJiYjRlW18weDJmNjhjNSgweDE1YSldKF8weDE5MWI2NSxfMHgxY2YzNGEsXzB4OGQ2NDUxLF8weDIxZTBmMSxfMHg1Yzk4MjEsXzB4M2NiMDhhKSk7fX19fX1pZihfMHg1NDhhODhbXzB4MmY2OGM1KDB4MTRhKV09XzB4MjFlMGYxLF8weDNlOTVjND8oXzB4NTQ4YTg4W18weDJmNjhjNSgweDFhMildPV8weDhkNjQ1MVtfMHgyZjY4YzUoMHgxYzIpXSgpLHRoaXNbXzB4MmY2OGM1KDB4MWI5KV0oXzB4MjFlMGYxLF8weDU0OGE4OCxfMHgzY2IwOGEsXzB4Nzg1NDhkKSk6XzB4MjFlMGYxPT09J2RhdGUnP18weDU0OGE4OFsndmFsdWUnXT10aGlzW18weDJmNjhjNSgweDE5MyldWydjYWxsJ10oXzB4OGQ2NDUxKTpfMHgyMWUwZjE9PT0nYmlnaW50Jz9fMHg1NDhhODhbXzB4MmY2OGM1KDB4MWEyKV09XzB4OGQ2NDUxWyd0b1N0cmluZyddKCk6XzB4MjFlMGYxPT09XzB4MmY2OGM1KDB4MTkyKT9fMHg1NDhhODhbXzB4MmY2OGM1KDB4MWEyKV09dGhpc1tfMHgyZjY4YzUoMHgxNTUpXVtfMHgyZjY4YzUoMHgxNTcpXShfMHg4ZDY0NTEpOl8weDIxZTBmMT09PV8weDJmNjhjNSgweDE2NCkmJnRoaXNbXzB4MmY2OGM1KDB4MTk0KV0/XzB4NTQ4YTg4Wyd2YWx1ZSddPXRoaXNbXzB4MmY2OGM1KDB4MTk0KV1bXzB4MmY2OGM1KDB4MTgyKV1bXzB4MmY2OGM1KDB4MWExKV1bXzB4MmY2OGM1KDB4MTU3KV0oXzB4OGQ2NDUxKTohXzB4M2NiMDhhW18weDJmNjhjNSgweDE4YSldJiYhKF8weDIxZTBmMT09PV8weDJmNjhjNSgweDE1ZCl8fF8weDIxZTBmMT09PV8weDJmNjhjNSgweDE1ZikpJiYoZGVsZXRlIF8weDU0OGE4OFsndmFsdWUnXSxfMHg1NDhhODhbJ2NhcHBlZCddPSEweDApLF8weDFkNGJkMCYmKF8weDU0OGE4OFsnY2FwcGVkUHJvcHMnXT0hMHgwKSxfMHg1MTFjYTE9XzB4M2NiMDhhW18weDJmNjhjNSgweDFhNSldWydjdXJyZW50J10sXzB4M2NiMDhhW18weDJmNjhjNSgweDFhNSldW18weDJmNjhjNSgweDExZildPV8weDU0OGE4OCx0aGlzWydfdHJlZU5vZGVQcm9wZXJ0aWVzQmVmb3JlRnVsbFZhbHVlJ10oXzB4NTQ4YTg4LF8weDNjYjA4YSksXzB4MTliMjJkW18weDJmNjhjNSgweDE1OSldKXtmb3IoXzB4MzA4MTBiPTB4MCxfMHgzZWVkYTA9XzB4MTliMjJkW18weDJmNjhjNSgweDE1OSldO18weDMwODEwYjxfMHgzZWVkYTA7XzB4MzA4MTBiKyspXzB4MTliMjJkW18weDMwODEwYl0oXzB4MzA4MTBiKTt9XzB4MTkxYjY1W18weDJmNjhjNSgweDE1OSldJiYoXzB4NTQ4YTg4Wydwcm9wcyddPV8weDE5MWI2NSk7fWNhdGNoKF8weDFkNTFhNSl7XzB4NDkyMzZhKF8weDFkNTFhNSxfMHg1NDhhODgsXzB4M2NiMDhhKTt9cmV0dXJuIHRoaXNbXzB4MmY2OGM1KDB4MWRkKV0oXzB4OGQ2NDUxLF8weDU0OGE4OCksdGhpc1tfMHgyZjY4YzUoMHgxZGIpXShfMHg1NDhhODgsXzB4M2NiMDhhKSxfMHgzY2IwOGFbXzB4MmY2OGM1KDB4MWE1KV1bXzB4MmY2OGM1KDB4MTFmKV09XzB4NTExY2ExLF8weDNjYjA4YVtfMHgyZjY4YzUoMHgxZWEpXS0tLF8weDNjYjA4YVsnYXV0b0V4cGFuZCddPV8weDRiZjkyMSxfMHgzY2IwOGFbXzB4MmY2OGM1KDB4MTUzKV0mJl8weDNjYjA4YVtfMHgyZjY4YzUoMHgxYjUpXVtfMHgyZjY4YzUoMHgxZDYpXSgpLF8weDU0OGE4ODt9WydfZ2V0T3duUHJvcGVydHlTeW1ib2xzJ10oXzB4M2ViOTI4KXt2YXIgXzB4ODVlMThkPV8weDJlY2I3MztyZXR1cm4gT2JqZWN0W18weDg1ZTE4ZCgweDExYyldP09iamVjdFtfMHg4NWUxOGQoMHgxMWMpXShfMHgzZWI5MjgpOltdO31bXzB4MmVjYjczKDB4MTZjKV0oXzB4ZmUwNDk4KXt2YXIgXzB4NGIwYWJmPV8weDJlY2I3MztyZXR1cm4hIShfMHhmZTA0OTgmJl8weDU3YjQ2M1tfMHg0YjBhYmYoMHgxZGYpXSYmdGhpc1tfMHg0YjBhYmYoMHgxMjApXShfMHhmZTA0OTgpPT09XzB4NGIwYWJmKDB4MTU2KSYmXzB4ZmUwNDk4W18weDRiMGFiZigweDEyYyldKTt9WydfYmxhY2tsaXN0ZWRQcm9wZXJ0eSddKF8weDMzYTAxYyxfMHgyMjU5N2QsXzB4OWZiNWYxKXt2YXIgXzB4MTljZTZkPV8weDJlY2I3MztyZXR1cm4gXzB4OWZiNWYxW18weDE5Y2U2ZCgweDEzNCldP3R5cGVvZiBfMHgzM2EwMWNbXzB4MjI1OTdkXT09XzB4MTljZTZkKDB4MWM5KTohMHgxO31bXzB4MmVjYjczKDB4MTg0KV0oXzB4NDBkODdlKXt2YXIgXzB4NGZlMjYxPV8weDJlY2I3MyxfMHgzZjNkNjQ9Jyc7cmV0dXJuIF8weDNmM2Q2ND10eXBlb2YgXzB4NDBkODdlLF8weDNmM2Q2ND09PV8weDRmZTI2MSgweDE5MSk/dGhpc1tfMHg0ZmUyNjEoMHgxMjApXShfMHg0MGQ4N2UpPT09XzB4NGZlMjYxKDB4MTgxKT9fMHgzZjNkNjQ9J2FycmF5Jzp0aGlzW18weDRmZTI2MSgweDEyMCldKF8weDQwZDg3ZSk9PT1fMHg0ZmUyNjEoMHgxYzgpP18weDNmM2Q2ND1fMHg0ZmUyNjEoMHgxYzQpOnRoaXNbXzB4NGZlMjYxKDB4MTIwKV0oXzB4NDBkODdlKT09PV8weDRmZTI2MSgweDEwZCk/XzB4M2YzZDY0PV8weDRmZTI2MSgweDEyMik6XzB4NDBkODdlPT09bnVsbD9fMHgzZjNkNjQ9XzB4NGZlMjYxKDB4MTVkKTpfMHg0MGQ4N2VbXzB4NGZlMjYxKDB4MTE4KV0mJihfMHgzZjNkNjQ9XzB4NDBkODdlW18weDRmZTI2MSgweDExOCldW18weDRmZTI2MSgweDFkNCldfHxfMHgzZjNkNjQpOl8weDNmM2Q2ND09PV8weDRmZTI2MSgweDE1ZikmJnRoaXNbXzB4NGZlMjYxKDB4MTQ4KV0mJl8weDQwZDg3ZSBpbnN0YW5jZW9mIHRoaXNbXzB4NGZlMjYxKDB4MTQ4KV0mJihfMHgzZjNkNjQ9J0hUTUxBbGxDb2xsZWN0aW9uJyksXzB4M2YzZDY0O31bXzB4MmVjYjczKDB4MTIwKV0oXzB4NThhOTZiKXt2YXIgXzB4NDJhNjA5PV8weDJlY2I3MztyZXR1cm4gT2JqZWN0W18weDQyYTYwOSgweDE4MildWyd0b1N0cmluZyddWydjYWxsJ10oXzB4NThhOTZiKTt9WydfaXNQcmltaXRpdmVUeXBlJ10oXzB4OTNmNDc3KXt2YXIgXzB4NTEyYmY5PV8weDJlY2I3MztyZXR1cm4gXzB4OTNmNDc3PT09XzB4NTEyYmY5KDB4MTQzKXx8XzB4OTNmNDc3PT09XzB4NTEyYmY5KDB4MWQ3KXx8XzB4OTNmNDc3PT09XzB4NTEyYmY5KDB4MTJhKTt9W18weDJlY2I3MygweDE3NCldKF8weDVhMGRiMyl7dmFyIF8weDVhOGVhYz1fMHgyZWNiNzM7cmV0dXJuIF8weDVhMGRiMz09PSdCb29sZWFuJ3x8XzB4NWEwZGIzPT09J1N0cmluZyd8fF8weDVhMGRiMz09PV8weDVhOGVhYygweDFlMik7fVtfMHgyZWNiNzMoMHgxODUpXShfMHg0YmNkNWIsXzB4NWVhYThkLF8weDE4NzM0ZSxfMHg0NTljN2QsXzB4MmNiYWQ1LF8weDQyN2VmZCl7dmFyIF8weDI3YjA5ND10aGlzO3JldHVybiBmdW5jdGlvbihfMHgxZDdiNDIpe3ZhciBfMHgxODY1NzI9XzB4MTM3MixfMHg0OTBkMzA9XzB4MmNiYWQ1W18weDE4NjU3MigweDFhNSldW18weDE4NjU3MigweDExZildLF8weDNhMTAxZD1fMHgyY2JhZDVbXzB4MTg2NTcyKDB4MWE1KV1bXzB4MTg2NTcyKDB4MTc2KV0sXzB4Mjc1OGQyPV8weDJjYmFkNVsnbm9kZSddW18weDE4NjU3MigweDFiZCldO18weDJjYmFkNVtfMHgxODY1NzIoMHgxYTUpXVtfMHgxODY1NzIoMHgxYmQpXT1fMHg0OTBkMzAsXzB4MmNiYWQ1W18weDE4NjU3MigweDFhNSldW18weDE4NjU3MigweDE3NildPXR5cGVvZiBfMHg0NTljN2Q9PSdudW1iZXInP18weDQ1OWM3ZDpfMHgxZDdiNDIsXzB4NGJjZDViW18weDE4NjU3MigweDFlNCldKF8weDI3YjA5NFsnX3Byb3BlcnR5J10oXzB4NWVhYThkLF8weDE4NzM0ZSxfMHg0NTljN2QsXzB4MmNiYWQ1LF8weDQyN2VmZCkpLF8weDJjYmFkNVtfMHgxODY1NzIoMHgxYTUpXVtfMHgxODY1NzIoMHgxYmQpXT1fMHgyNzU4ZDIsXzB4MmNiYWQ1W18weDE4NjU3MigweDFhNSldW18weDE4NjU3MigweDE3NildPV8weDNhMTAxZDt9O31bXzB4MmVjYjczKDB4MTVhKV0oXzB4MzZhZTY2LF8weDFmODZjNixfMHg0ODIyMjcsXzB4NGJhYjUyLF8weDEyYTJlOSxfMHg0MmU1NWEsXzB4NGJhNDM2KXt2YXIgXzB4MjU5MTE3PV8weDJlY2I3MyxfMHg2Zjk5NzU9dGhpcztyZXR1cm4gXzB4MWY4NmM2W18weDI1OTExNygweDFhZikrXzB4MTJhMmU5W18weDI1OTExNygweDFhMSldKCldPSEweDAsZnVuY3Rpb24oXzB4MTIwMzEwKXt2YXIgXzB4MWY1ZjdkPV8weDI1OTExNyxfMHg0NGQzNzg9XzB4NDJlNTVhW18weDFmNWY3ZCgweDFhNSldWydjdXJyZW50J10sXzB4M2ZmZWRiPV8weDQyZTU1YVtfMHgxZjVmN2QoMHgxYTUpXVtfMHgxZjVmN2QoMHgxNzYpXSxfMHgxNDVlNmQ9XzB4NDJlNTVhWydub2RlJ11bXzB4MWY1ZjdkKDB4MWJkKV07XzB4NDJlNTVhWydub2RlJ11bXzB4MWY1ZjdkKDB4MWJkKV09XzB4NDRkMzc4LF8weDQyZTU1YVtfMHgxZjVmN2QoMHgxYTUpXVtfMHgxZjVmN2QoMHgxNzYpXT1fMHgxMjAzMTAsXzB4MzZhZTY2WydwdXNoJ10oXzB4NmY5OTc1W18weDFmNWY3ZCgweDEzMyldKF8weDQ4MjIyNyxfMHg0YmFiNTIsXzB4MTJhMmU5LF8weDQyZTU1YSxfMHg0YmE0MzYpKSxfMHg0MmU1NWFbXzB4MWY1ZjdkKDB4MWE1KV1bXzB4MWY1ZjdkKDB4MWJkKV09XzB4MTQ1ZTZkLF8weDQyZTU1YVtfMHgxZjVmN2QoMHgxYTUpXVtfMHgxZjVmN2QoMHgxNzYpXT1fMHgzZmZlZGI7fTt9W18weDJlY2I3MygweDEzMyldKF8weDFhZDFkMyxfMHg1Y2FmZTIsXzB4Mzc3ZWM4LF8weDQ0NjMwZCxfMHg1Yzc4NjMpe3ZhciBfMHgzMGU1OTc9XzB4MmVjYjczLF8weDg0YjE0OT10aGlzO18weDVjNzg2M3x8KF8weDVjNzg2Mz1mdW5jdGlvbihfMHgzNGMxM2QsXzB4NTE4MTkyKXtyZXR1cm4gXzB4MzRjMTNkW18weDUxODE5Ml07fSk7dmFyIF8weDM3ZGUxYj1fMHgzNzdlYzhbXzB4MzBlNTk3KDB4MWExKV0oKSxfMHg1OGM5ZjM9XzB4NDQ2MzBkW18weDMwZTU5NygweDEwOSldfHx7fSxfMHgyMDllYjg9XzB4NDQ2MzBkW18weDMwZTU5NygweDE4YSldLF8weDI2ODZmNz1fMHg0NDYzMGRbXzB4MzBlNTk3KDB4MTI3KV07dHJ5e3ZhciBfMHg0MDU1MmY9dGhpc1tfMHgzMGU1OTcoMHgxZGMpXShfMHgxYWQxZDMpLF8weDE0OGFlND1fMHgzN2RlMWI7XzB4NDA1NTJmJiZfMHgxNDhhZTRbMHgwXT09PSdcXFxceDI3JyYmKF8weDE0OGFlND1fMHgxNDhhZTRbJ3N1YnN0ciddKDB4MSxfMHgxNDhhZTRbJ2xlbmd0aCddLTB4MikpO3ZhciBfMHgxODFkZGM9XzB4NDQ2MzBkW18weDMwZTU5NygweDEwOSldPV8weDU4YzlmM1snX3BfJytfMHgxNDhhZTRdO18weDE4MWRkYyYmKF8weDQ0NjMwZFtfMHgzMGU1OTcoMHgxOGEpXT1fMHg0NDYzMGRbXzB4MzBlNTk3KDB4MThhKV0rMHgxKSxfMHg0NDYzMGRbXzB4MzBlNTk3KDB4MTI3KV09ISFfMHgxODFkZGM7dmFyIF8weDQ0MGFlZj10eXBlb2YgXzB4Mzc3ZWM4PT0nc3ltYm9sJyxfMHhhYWM4MGY9eyduYW1lJzpfMHg0NDBhZWZ8fF8weDQwNTUyZj9fMHgzN2RlMWI6dGhpc1snX3Byb3BlcnR5TmFtZSddKF8weDM3ZGUxYil9O2lmKF8weDQ0MGFlZiYmKF8weGFhYzgwZltfMHgzMGU1OTcoMHgxNjQpXT0hMHgwKSwhKF8weDVjYWZlMj09PV8weDMwZTU5NygweDE2Mil8fF8weDVjYWZlMj09PV8weDMwZTU5NygweDFkMykpKXt2YXIgXzB4NTAzNWM1PXRoaXNbXzB4MzBlNTk3KDB4MThiKV0oXzB4MWFkMWQzLF8weDM3N2VjOCk7aWYoXzB4NTAzNWM1JiYoXzB4NTAzNWM1W18weDMwZTU5NygweDE3YSldJiYoXzB4YWFjODBmW18weDMwZTU5NygweDE2NildPSEweDApLF8weDUwMzVjNVsnZ2V0J10mJiFfMHgxODFkZGMmJiFfMHg0NDYzMGRbXzB4MzBlNTk3KDB4MTdiKV0pKXJldHVybiBfMHhhYWM4MGZbXzB4MzBlNTk3KDB4MTIzKV09ITB4MCx0aGlzW18weDMwZTU5NygweDEyNildKF8weGFhYzgwZixfMHg0NDYzMGQpLF8weGFhYzgwZjt9dmFyIF8weDQ5Zjg1MTt0cnl7XzB4NDlmODUxPV8weDVjNzg2MyhfMHgxYWQxZDMsXzB4Mzc3ZWM4KTt9Y2F0Y2goXzB4NGRhN2NmKXtyZXR1cm4gXzB4YWFjODBmPXsnbmFtZSc6XzB4MzdkZTFiLCd0eXBlJzpfMHgzMGU1OTcoMHgxZTgpLCdlcnJvcic6XzB4NGRhN2NmW18weDMwZTU5NygweDE4OSldfSx0aGlzW18weDMwZTU5NygweDEyNildKF8weGFhYzgwZixfMHg0NDYzMGQpLF8weGFhYzgwZjt9dmFyIF8weDI5ODEwZj10aGlzW18weDMwZTU5NygweDE4NCldKF8weDQ5Zjg1MSksXzB4NDhiNzMzPXRoaXNbXzB4MzBlNTk3KDB4MTliKV0oXzB4Mjk4MTBmKTtpZihfMHhhYWM4MGZbXzB4MzBlNTk3KDB4MTRhKV09XzB4Mjk4MTBmLF8weDQ4YjczMyl0aGlzWydfcHJvY2Vzc1RyZWVOb2RlUmVzdWx0J10oXzB4YWFjODBmLF8weDQ0NjMwZCxfMHg0OWY4NTEsZnVuY3Rpb24oKXt2YXIgXzB4M2E5NTVmPV8weDMwZTU5NztfMHhhYWM4MGZbXzB4M2E5NTVmKDB4MWEyKV09XzB4NDlmODUxW18weDNhOTU1ZigweDFjMildKCksIV8weDE4MWRkYyYmXzB4ODRiMTQ5W18weDNhOTU1ZigweDFiOSldKF8weDI5ODEwZixfMHhhYWM4MGYsXzB4NDQ2MzBkLHt9KTt9KTtlbHNle3ZhciBfMHg0OTFmMDE9XzB4NDQ2MzBkWydhdXRvRXhwYW5kJ10mJl8weDQ0NjMwZFsnbGV2ZWwnXTxfMHg0NDYzMGRbXzB4MzBlNTk3KDB4MTk5KV0mJl8weDQ0NjMwZFsnYXV0b0V4cGFuZFByZXZpb3VzT2JqZWN0cyddW18weDMwZTU5NygweDE5NyldKF8weDQ5Zjg1MSk8MHgwJiZfMHgyOTgxMGYhPT1fMHgzMGU1OTcoMHgxYzkpJiZfMHg0NDYzMGRbXzB4MzBlNTk3KDB4MTM2KV08XzB4NDQ2MzBkW18weDMwZTU5NygweDEzNyldO18weDQ5MWYwMXx8XzB4NDQ2MzBkW18weDMwZTU5NygweDFlYSldPF8weDIwOWViOHx8XzB4MTgxZGRjPyh0aGlzW18weDMwZTU5NygweDEzNSldKF8weGFhYzgwZixfMHg0OWY4NTEsXzB4NDQ2MzBkLF8weDE4MWRkY3x8e30pLHRoaXNbXzB4MzBlNTk3KDB4MWRkKV0oXzB4NDlmODUxLF8weGFhYzgwZikpOnRoaXNbXzB4MzBlNTk3KDB4MTI2KV0oXzB4YWFjODBmLF8weDQ0NjMwZCxfMHg0OWY4NTEsZnVuY3Rpb24oKXt2YXIgXzB4NTBlOTcyPV8weDMwZTU5NztfMHgyOTgxMGY9PT1fMHg1MGU5NzIoMHgxNWQpfHxfMHgyOTgxMGY9PT1fMHg1MGU5NzIoMHgxNWYpfHwoZGVsZXRlIF8weGFhYzgwZlsndmFsdWUnXSxfMHhhYWM4MGZbXzB4NTBlOTcyKDB4MTBiKV09ITB4MCk7fSk7fXJldHVybiBfMHhhYWM4MGY7fWZpbmFsbHl7XzB4NDQ2MzBkW18weDMwZTU5NygweDEwOSldPV8weDU4YzlmMyxfMHg0NDYzMGRbXzB4MzBlNTk3KDB4MThhKV09XzB4MjA5ZWI4LF8weDQ0NjMwZFsnaXNFeHByZXNzaW9uVG9FdmFsdWF0ZSddPV8weDI2ODZmNzt9fVsnX2NhcElmU3RyaW5nJ10oXzB4MmEzNzA4LF8weDFkYzNmYSxfMHgyODFiODcsXzB4M2FkOGE0KXt2YXIgXzB4NWI2OTMwPV8weDJlY2I3MyxfMHgxMDlkNGI9XzB4M2FkOGE0W18weDViNjkzMCgweDE5ZCldfHxfMHgyODFiODdbXzB4NWI2OTMwKDB4MTlkKV07aWYoKF8weDJhMzcwOD09PSdzdHJpbmcnfHxfMHgyYTM3MDg9PT0nU3RyaW5nJykmJl8weDFkYzNmYVsndmFsdWUnXSl7bGV0IF8weDRkNWU2MT1fMHgxZGMzZmFbXzB4NWI2OTMwKDB4MWEyKV1bXzB4NWI2OTMwKDB4MTU5KV07XzB4MjgxYjg3W18weDViNjkzMCgweDE0ZildKz1fMHg0ZDVlNjEsXzB4MjgxYjg3WydhbGxTdHJMZW5ndGgnXT5fMHgyODFiODdbXzB4NWI2OTMwKDB4MTkwKV0/KF8weDFkYzNmYVtfMHg1YjY5MzAoMHgxMGIpXT0nJyxkZWxldGUgXzB4MWRjM2ZhWyd2YWx1ZSddKTpfMHg0ZDVlNjE+XzB4MTA5ZDRiJiYoXzB4MWRjM2ZhW18weDViNjkzMCgweDEwYildPV8weDFkYzNmYVtfMHg1YjY5MzAoMHgxYTIpXVtfMHg1YjY5MzAoMHgxMWQpXSgweDAsXzB4MTA5ZDRiKSxkZWxldGUgXzB4MWRjM2ZhWyd2YWx1ZSddKTt9fVtfMHgyZWNiNzMoMHgxZGMpXShfMHgxZDc1YzMpe3ZhciBfMHgyOWNkMDM9XzB4MmVjYjczO3JldHVybiEhKF8weDFkNzVjMyYmXzB4NTdiNDYzW18weDI5Y2QwMygweDEyNSldJiZ0aGlzW18weDI5Y2QwMygweDEyMCldKF8weDFkNzVjMyk9PT1fMHgyOWNkMDMoMHgxNzIpJiZfMHgxZDc1YzNbJ2ZvckVhY2gnXSk7fVtfMHgyZWNiNzMoMHgxNTIpXShfMHgzMWY0NCl7dmFyIF8weDM3ZjliMz1fMHgyZWNiNzM7aWYoXzB4MzFmNDRbXzB4MzdmOWIzKDB4MTgzKV0oL15cXFxcZCskLykpcmV0dXJuIF8weDMxZjQ0O3ZhciBfMHgzMTUyOWY7dHJ5e18weDMxNTI5Zj1KU09OWydzdHJpbmdpZnknXSgnJytfMHgzMWY0NCk7fWNhdGNoe18weDMxNTI5Zj0nXFxcXHgyMicrdGhpc1snX29iamVjdFRvU3RyaW5nJ10oXzB4MzFmNDQpKydcXFxceDIyJzt9cmV0dXJuIF8weDMxNTI5ZlsnbWF0Y2gnXSgvXlxcXCIoW2EtekEtWl9dW2EtekEtWl8wLTldKilcXFwiJC8pP18weDMxNTI5Zj1fMHgzMTUyOWZbJ3N1YnN0ciddKDB4MSxfMHgzMTUyOWZbXzB4MzdmOWIzKDB4MTU5KV0tMHgyKTpfMHgzMTUyOWY9XzB4MzE1MjlmWydyZXBsYWNlJ10oLycvZywnXFxcXHg1Y1xcXFx4MjcnKVtfMHgzN2Y5YjMoMHgxYmYpXSgvXFxcXFxcXFxcXFwiL2csJ1xcXFx4MjInKVtfMHgzN2Y5YjMoMHgxYmYpXSgvKF5cXFwifFxcXCIkKS9nLCdcXFxceDI3JyksXzB4MzE1MjlmO31bXzB4MmVjYjczKDB4MTI2KV0oXzB4MTM4YzBjLF8weDEyNWM1MSxfMHgzNjJkZjcsXzB4NDU5MGM0KXt2YXIgXzB4MTEyY2Q4PV8weDJlY2I3Mzt0aGlzW18weDExMmNkOCgweDE5ZildKF8weDEzOGMwYyxfMHgxMjVjNTEpLF8weDQ1OTBjNCYmXzB4NDU5MGM0KCksdGhpc1tfMHgxMTJjZDgoMHgxZGQpXShfMHgzNjJkZjcsXzB4MTM4YzBjKSx0aGlzW18weDExMmNkOCgweDFkYildKF8weDEzOGMwYyxfMHgxMjVjNTEpO31bXzB4MmVjYjczKDB4MTlmKV0oXzB4MTUwZTQzLF8weDMyYTY1NCl7dmFyIF8weDQ0OGI3Yz1fMHgyZWNiNzM7dGhpc1snX3NldE5vZGVJZCddKF8weDE1MGU0MyxfMHgzMmE2NTQpLHRoaXNbXzB4NDQ4YjdjKDB4MTJiKV0oXzB4MTUwZTQzLF8weDMyYTY1NCksdGhpc1snX3NldE5vZGVFeHByZXNzaW9uUGF0aCddKF8weDE1MGU0MyxfMHgzMmE2NTQpLHRoaXNbXzB4NDQ4YjdjKDB4MTFhKV0oXzB4MTUwZTQzLF8weDMyYTY1NCk7fVtfMHgyZWNiNzMoMHgxNmYpXShfMHg0N2Q1NWUsXzB4N2ZhZTUzKXt9Wydfc2V0Tm9kZVF1ZXJ5UGF0aCddKF8weDJlMDNlZixfMHg1MzI5ZGEpe31bXzB4MmVjYjczKDB4MTBlKV0oXzB4MjZiMWM5LF8weDMyYTVkZil7fVtfMHgyZWNiNzMoMHgxYWQpXShfMHg1MWI1MDApe3ZhciBfMHgyZWU3MmE9XzB4MmVjYjczO3JldHVybiBfMHg1MWI1MDA9PT10aGlzW18weDJlZTcyYSgweDExNSldO31bXzB4MmVjYjczKDB4MWRiKV0oXzB4NDhkZDI5LF8weDI5ZmQxNyl7dmFyIF8weDJiNDVkND1fMHgyZWNiNzM7dGhpc1tfMHgyYjQ1ZDQoMHgxMGUpXShfMHg0OGRkMjksXzB4MjlmZDE3KSx0aGlzW18weDJiNDVkNCgweDEzZSldKF8weDQ4ZGQyOSksXzB4MjlmZDE3Wydzb3J0UHJvcHMnXSYmdGhpc1tfMHgyYjQ1ZDQoMHgxZTApXShfMHg0OGRkMjkpLHRoaXNbJ19hZGRGdW5jdGlvbnNOb2RlJ10oXzB4NDhkZDI5LF8weDI5ZmQxNyksdGhpc1snX2FkZExvYWROb2RlJ10oXzB4NDhkZDI5LF8weDI5ZmQxNyksdGhpc1tfMHgyYjQ1ZDQoMHgxMTIpXShfMHg0OGRkMjkpO31bJ19hZGRpdGlvbmFsTWV0YWRhdGEnXShfMHgxMDQxOWYsXzB4MTVjNWI1KXt2YXIgXzB4MjAxMTJjPV8weDJlY2I3Mzt0cnl7XzB4MTA0MTlmJiZ0eXBlb2YgXzB4MTA0MTlmW18weDIwMTEyYygweDE1OSldPT1fMHgyMDExMmMoMHgxMmEpJiYoXzB4MTVjNWI1W18weDIwMTEyYygweDE1OSldPV8weDEwNDE5ZltfMHgyMDExMmMoMHgxNTkpXSk7fWNhdGNoe31pZihfMHgxNWM1YjVbXzB4MjAxMTJjKDB4MTRhKV09PT1fMHgyMDExMmMoMHgxMmEpfHxfMHgxNWM1YjVbJ3R5cGUnXT09PSdOdW1iZXInKXtpZihpc05hTihfMHgxNWM1YjVbXzB4MjAxMTJjKDB4MWEyKV0pKV8weDE1YzViNVsnbmFuJ109ITB4MCxkZWxldGUgXzB4MTVjNWI1W18weDIwMTEyYygweDFhMildO2Vsc2Ugc3dpdGNoKF8weDE1YzViNVtfMHgyMDExMmMoMHgxYTIpXSl7Y2FzZSBOdW1iZXJbXzB4MjAxMTJjKDB4MWJhKV06XzB4MTVjNWI1W18weDIwMTEyYygweDFlMSldPSEweDAsZGVsZXRlIF8weDE1YzViNVtfMHgyMDExMmMoMHgxYTIpXTticmVhaztjYXNlIE51bWJlcltfMHgyMDExMmMoMHgxYWEpXTpfMHgxNWM1YjVbXzB4MjAxMTJjKDB4MTdlKV09ITB4MCxkZWxldGUgXzB4MTVjNWI1W18weDIwMTEyYygweDFhMildO2JyZWFrO2Nhc2UgMHgwOnRoaXNbXzB4MjAxMTJjKDB4MTcxKV0oXzB4MTVjNWI1Wyd2YWx1ZSddKSYmKF8weDE1YzViNVsnbmVnYXRpdmVaZXJvJ109ITB4MCk7YnJlYWs7fX1lbHNlIF8weDE1YzViNVtfMHgyMDExMmMoMHgxNGEpXT09PV8weDIwMTEyYygweDFjOSkmJnR5cGVvZiBfMHgxMDQxOWZbXzB4MjAxMTJjKDB4MWQ0KV09PV8weDIwMTEyYygweDFkNykmJl8weDEwNDE5ZltfMHgyMDExMmMoMHgxZDQpXSYmXzB4MTVjNWI1W18weDIwMTEyYygweDFkNCldJiZfMHgxMDQxOWZbXzB4MjAxMTJjKDB4MWQ0KV0hPT1fMHgxNWM1YjVbJ25hbWUnXSYmKF8weDE1YzViNVtfMHgyMDExMmMoMHgxNmEpXT1fMHgxMDQxOWZbXzB4MjAxMTJjKDB4MWQ0KV0pO31bXzB4MmVjYjczKDB4MTcxKV0oXzB4NGYwY2UyKXt2YXIgXzB4NGQ1Y2E4PV8weDJlY2I3MztyZXR1cm4gMHgxL18weDRmMGNlMj09PU51bWJlcltfMHg0ZDVjYTgoMHgxYWEpXTt9W18weDJlY2I3MygweDFlMCldKF8weDM4YmY4Zil7dmFyIF8weDUwOWYwYz1fMHgyZWNiNzM7IV8weDM4YmY4ZltfMHg1MDlmMGMoMHgxYTApXXx8IV8weDM4YmY4ZltfMHg1MDlmMGMoMHgxYTApXVtfMHg1MDlmMGMoMHgxNTkpXXx8XzB4MzhiZjhmW18weDUwOWYwYygweDE0YSldPT09XzB4NTA5ZjBjKDB4MTYyKXx8XzB4MzhiZjhmWyd0eXBlJ109PT1fMHg1MDlmMGMoMHgxMjUpfHxfMHgzOGJmOGZbXzB4NTA5ZjBjKDB4MTRhKV09PT1fMHg1MDlmMGMoMHgxZGYpfHxfMHgzOGJmOGZbJ3Byb3BzJ11bXzB4NTA5ZjBjKDB4MTY1KV0oZnVuY3Rpb24oXzB4MzVlMWUxLF8weGU3MmJmZCl7dmFyIF8weDQ4MDE0ZD1fMHg1MDlmMGMsXzB4NDc4ZWZkPV8weDM1ZTFlMVsnbmFtZSddW18weDQ4MDE0ZCgweDE0MCldKCksXzB4NTgxMDkwPV8weGU3MmJmZFtfMHg0ODAxNGQoMHgxZDQpXVtfMHg0ODAxNGQoMHgxNDApXSgpO3JldHVybiBfMHg0NzhlZmQ8XzB4NTgxMDkwPy0weDE6XzB4NDc4ZWZkPl8weDU4MTA5MD8weDE6MHgwO30pO31bJ19hZGRGdW5jdGlvbnNOb2RlJ10oXzB4ZTQ4OGZjLF8weDM5NGRhMyl7dmFyIF8weDVjYTVhOD1fMHgyZWNiNzM7aWYoIShfMHgzOTRkYTNbXzB4NWNhNWE4KDB4MTM0KV18fCFfMHhlNDg4ZmNbXzB4NWNhNWE4KDB4MWEwKV18fCFfMHhlNDg4ZmNbJ3Byb3BzJ11bJ2xlbmd0aCddKSl7Zm9yKHZhciBfMHg1YmQ5OGU9W10sXzB4MTU2YzA2PVtdLF8weDNkNDA4Yz0weDAsXzB4NTAxZmIwPV8weGU0ODhmY1tfMHg1Y2E1YTgoMHgxYTApXVtfMHg1Y2E1YTgoMHgxNTkpXTtfMHgzZDQwOGM8XzB4NTAxZmIwO18weDNkNDA4YysrKXt2YXIgXzB4MzZhYjA1PV8weGU0ODhmY1tfMHg1Y2E1YTgoMHgxYTApXVtfMHgzZDQwOGNdO18weDM2YWIwNVtfMHg1Y2E1YTgoMHgxNGEpXT09PV8weDVjYTVhOCgweDFjOSk/XzB4NWJkOThlW18weDVjYTVhOCgweDFlNCldKF8weDM2YWIwNSk6XzB4MTU2YzA2W18weDVjYTVhOCgweDFlNCldKF8weDM2YWIwNSk7fWlmKCEoIV8weDE1NmMwNltfMHg1Y2E1YTgoMHgxNTkpXXx8XzB4NWJkOThlWydsZW5ndGgnXTw9MHgxKSl7XzB4ZTQ4OGZjW18weDVjYTVhOCgweDFhMCldPV8weDE1NmMwNjt2YXIgXzB4M2FhZGViPXsnZnVuY3Rpb25zTm9kZSc6ITB4MCwncHJvcHMnOl8weDViZDk4ZX07dGhpc1snX3NldE5vZGVJZCddKF8weDNhYWRlYixfMHgzOTRkYTMpLHRoaXNbJ19zZXROb2RlTGFiZWwnXShfMHgzYWFkZWIsXzB4Mzk0ZGEzKSx0aGlzW18weDVjYTVhOCgweDEzZSldKF8weDNhYWRlYiksdGhpc1tfMHg1Y2E1YTgoMHgxMWEpXShfMHgzYWFkZWIsXzB4Mzk0ZGEzKSxfMHgzYWFkZWJbJ2lkJ10rPSdcXFxceDIwZicsXzB4ZTQ4OGZjW18weDVjYTVhOCgweDFhMCldW18weDVjYTVhOCgweDEyNCldKF8weDNhYWRlYik7fX19W18weDJlY2I3MygweDExZSldKF8weDE5MGJhMCxfMHgyMTYwYWEpe31bJ19zZXROb2RlRXhwYW5kYWJsZVN0YXRlJ10oXzB4NDE4OGYwKXt9W18weDJlY2I3MygweDEzYyldKF8weDNiY2YzNil7dmFyIF8weDZkNzU5Mj1fMHgyZWNiNzM7cmV0dXJuIEFycmF5Wydpc0FycmF5J10oXzB4M2JjZjM2KXx8dHlwZW9mIF8weDNiY2YzNj09J29iamVjdCcmJnRoaXNbXzB4NmQ3NTkyKDB4MTIwKV0oXzB4M2JjZjM2KT09PV8weDZkNzU5MigweDE4MSk7fVtfMHgyZWNiNzMoMHgxMWEpXShfMHgxMjcxNTgsXzB4MmI4ZGM3KXt9W18weDJlY2I3MygweDExMildKF8weDMwYWIxMyl7dmFyIF8weDFiOTk5YT1fMHgyZWNiNzM7ZGVsZXRlIF8weDMwYWIxM1tfMHgxYjk5OWEoMHgxY2QpXSxkZWxldGUgXzB4MzBhYjEzW18weDFiOTk5YSgweDFhOCldLGRlbGV0ZSBfMHgzMGFiMTNbXzB4MWI5OTlhKDB4MTEzKV07fVtfMHgyZWNiNzMoMHgxM2YpXShfMHg1YmQyNmQsXzB4MTQ1YmE0KXt9W18weDJlY2I3MygweDFiNildKF8weDI5NWJhYSl7dmFyIF8weDVhYWI0NT1fMHgyZWNiNzM7cmV0dXJuIF8weDI5NWJhYT9fMHgyOTViYWFbJ21hdGNoJ10odGhpc1snX251bWJlclJlZ0V4cCddKT8nWycrXzB4Mjk1YmFhKyddJzpfMHgyOTViYWFbXzB4NWFhYjQ1KDB4MTgzKV0odGhpc1tfMHg1YWFiNDUoMHgxMTYpXSk/Jy4nK18weDI5NWJhYTpfMHgyOTViYWFbXzB4NWFhYjQ1KDB4MTgzKV0odGhpc1tfMHg1YWFiNDUoMHgxNzMpXSk/J1snK18weDI5NWJhYSsnXSc6J1tcXFxceDI3JytfMHgyOTViYWErJ1xcXFx4MjddJzonJzt9fWxldCBfMHg0ZGMxZGM9bmV3IF8weGQ5NmQ2OSgpO2Z1bmN0aW9uIF8weDQxZjdmYihfMHgxYTU4YWMsXzB4M2NkOTA0LF8weDVhMzYyYixfMHgzZDZlYmQsXzB4NWJlMzg1LF8weDJhNmYxZSl7dmFyIF8weDQ2ZGM0Yz1fMHgyZWNiNzM7bGV0IF8weDFlM2E3MixfMHgyOTE2ZmE7dHJ5e18weDI5MTZmYT1fMHg0YWM3NjcoKSxfMHgxZTNhNzI9XzB4MTc3ZmQxW18weDNjZDkwNF0sIV8weDFlM2E3Mnx8XzB4MjkxNmZhLV8weDFlM2E3MlsndHMnXT4weDFmNCYmXzB4MWUzYTcyW18weDQ2ZGM0YygweDE5ZSldJiZfMHgxZTNhNzJbXzB4NDZkYzRjKDB4MTM5KV0vXzB4MWUzYTcyWydjb3VudCddPDB4NjQ/KF8weDE3N2ZkMVtfMHgzY2Q5MDRdPV8weDFlM2E3Mj17J2NvdW50JzoweDAsJ3RpbWUnOjB4MCwndHMnOl8weDI5MTZmYX0sXzB4MTc3ZmQxW18weDQ2ZGM0YygweDE3NSldPXt9KTpfMHgyOTE2ZmEtXzB4MTc3ZmQxW18weDQ2ZGM0YygweDE3NSldWyd0cyddPjB4MzImJl8weDE3N2ZkMVsnaGl0cyddW18weDQ2ZGM0YygweDE5ZSldJiZfMHgxNzdmZDFbXzB4NDZkYzRjKDB4MTc1KV1bXzB4NDZkYzRjKDB4MTM5KV0vXzB4MTc3ZmQxW18weDQ2ZGM0YygweDE3NSldW18weDQ2ZGM0YygweDE5ZSldPDB4NjQmJihfMHgxNzdmZDFbXzB4NDZkYzRjKDB4MTc1KV09e30pO2xldCBfMHhkYzI2MTM9W10sXzB4MWQ0OTU5PV8weDFlM2E3MlsncmVkdWNlTGltaXRzJ118fF8weDE3N2ZkMVtfMHg0NmRjNGMoMHgxNzUpXVsncmVkdWNlTGltaXRzJ10/XzB4MzY3YzgwOl8weDVmNDI4NyxfMHgyNGY0MzA9XzB4NDU5ZDdjPT57dmFyIF8weDQ4NmU3Mz1fMHg0NmRjNGM7bGV0IF8weDRjZGQ3Nz17fTtyZXR1cm4gXzB4NGNkZDc3W18weDQ4NmU3MygweDFhMCldPV8weDQ1OWQ3Y1tfMHg0ODZlNzMoMHgxYTApXSxfMHg0Y2RkNzdbJ2VsZW1lbnRzJ109XzB4NDU5ZDdjWydlbGVtZW50cyddLF8weDRjZGQ3N1snc3RyTGVuZ3RoJ109XzB4NDU5ZDdjW18weDQ4NmU3MygweDE5ZCldLF8weDRjZGQ3N1tfMHg0ODZlNzMoMHgxOTApXT1fMHg0NTlkN2NbXzB4NDg2ZTczKDB4MTkwKV0sXzB4NGNkZDc3W18weDQ4NmU3MygweDEzNyldPV8weDQ1OWQ3Y1tfMHg0ODZlNzMoMHgxMzcpXSxfMHg0Y2RkNzdbJ2F1dG9FeHBhbmRNYXhEZXB0aCddPV8weDQ1OWQ3Y1tfMHg0ODZlNzMoMHgxOTkpXSxfMHg0Y2RkNzdbXzB4NDg2ZTczKDB4MTc3KV09ITB4MSxfMHg0Y2RkNzdbXzB4NDg2ZTczKDB4MTM0KV09IV8weDFiZDk3NSxfMHg0Y2RkNzdbJ2RlcHRoJ109MHgxLF8weDRjZGQ3N1snbGV2ZWwnXT0weDAsXzB4NGNkZDc3WydleHBJZCddPSdyb290X2V4cF9pZCcsXzB4NGNkZDc3W18weDQ4NmU3MygweDEyOCldPV8weDQ4NmU3MygweDE1MCksXzB4NGNkZDc3WydhdXRvRXhwYW5kJ109ITB4MCxfMHg0Y2RkNzdbXzB4NDg2ZTczKDB4MWI1KV09W10sXzB4NGNkZDc3W18weDQ4NmU3MygweDEzNildPTB4MCxfMHg0Y2RkNzdbXzB4NDg2ZTczKDB4MTdiKV09ITB4MCxfMHg0Y2RkNzdbXzB4NDg2ZTczKDB4MTRmKV09MHgwLF8weDRjZGQ3N1tfMHg0ODZlNzMoMHgxYTUpXT17J2N1cnJlbnQnOnZvaWQgMHgwLCdwYXJlbnQnOnZvaWQgMHgwLCdpbmRleCc6MHgwfSxfMHg0Y2RkNzc7fTtmb3IodmFyIF8weDI4YmU5ZD0weDA7XzB4MjhiZTlkPF8weDViZTM4NVtfMHg0NmRjNGMoMHgxNTkpXTtfMHgyOGJlOWQrKylfMHhkYzI2MTNbXzB4NDZkYzRjKDB4MWU0KV0oXzB4NGRjMWRjW18weDQ2ZGM0YygweDEzNSldKHsndGltZU5vZGUnOl8weDFhNThhYz09PV8weDQ2ZGM0YygweDEzOSl8fHZvaWQgMHgwfSxfMHg1YmUzODVbXzB4MjhiZTlkXSxfMHgyNGY0MzAoXzB4MWQ0OTU5KSx7fSkpO2lmKF8weDFhNThhYz09PV8weDQ2ZGM0YygweDE4Nikpe2xldCBfMHg1ZjFjMGM9RXJyb3JbXzB4NDZkYzRjKDB4MTBjKV07dHJ5e0Vycm9yW18weDQ2ZGM0YygweDEwYyldPTB4MS8weDAsXzB4ZGMyNjEzW18weDQ2ZGM0YygweDFlNCldKF8weDRkYzFkY1tfMHg0NmRjNGMoMHgxMzUpXSh7J3N0YWNrTm9kZSc6ITB4MH0sbmV3IEVycm9yKClbJ3N0YWNrJ10sXzB4MjRmNDMwKF8weDFkNDk1OSkseydzdHJMZW5ndGgnOjB4MS8weDB9KSk7fWZpbmFsbHl7RXJyb3JbXzB4NDZkYzRjKDB4MTBjKV09XzB4NWYxYzBjO319cmV0dXJueydtZXRob2QnOl8weDQ2ZGM0YygweDFiMyksJ3ZlcnNpb24nOl8weDFiMGMxYywnYXJncyc6W3sndHMnOl8weDVhMzYyYiwnc2Vzc2lvbic6XzB4M2Q2ZWJkLCdhcmdzJzpfMHhkYzI2MTMsJ2lkJzpfMHgzY2Q5MDQsJ2NvbnRleHQnOl8weDJhNmYxZX1dfTt9Y2F0Y2goXzB4MjU0YTZkKXtyZXR1cm57J21ldGhvZCc6XzB4NDZkYzRjKDB4MWIzKSwndmVyc2lvbic6XzB4MWIwYzFjLCdhcmdzJzpbeyd0cyc6XzB4NWEzNjJiLCdzZXNzaW9uJzpfMHgzZDZlYmQsJ2FyZ3MnOlt7J3R5cGUnOid1bmtub3duJywnZXJyb3InOl8weDI1NGE2ZCYmXzB4MjU0YTZkW18weDQ2ZGM0YygweDE4OSldfV0sJ2lkJzpfMHgzY2Q5MDQsJ2NvbnRleHQnOl8weDJhNmYxZX1dfTt9ZmluYWxseXt0cnl7aWYoXzB4MWUzYTcyJiZfMHgyOTE2ZmEpe2xldCBfMHg1YWY4OWI9XzB4NGFjNzY3KCk7XzB4MWUzYTcyW18weDQ2ZGM0YygweDE5ZSldKyssXzB4MWUzYTcyW18weDQ2ZGM0YygweDEzOSldKz1fMHg1Nzg3Y2QoXzB4MjkxNmZhLF8weDVhZjg5YiksXzB4MWUzYTcyWyd0cyddPV8weDVhZjg5YixfMHgxNzdmZDFbXzB4NDZkYzRjKDB4MTc1KV1bXzB4NDZkYzRjKDB4MTllKV0rKyxfMHgxNzdmZDFbXzB4NDZkYzRjKDB4MTc1KV1bXzB4NDZkYzRjKDB4MTM5KV0rPV8weDU3ODdjZChfMHgyOTE2ZmEsXzB4NWFmODliKSxfMHgxNzdmZDFbXzB4NDZkYzRjKDB4MTc1KV1bJ3RzJ109XzB4NWFmODliLChfMHgxZTNhNzJbXzB4NDZkYzRjKDB4MTllKV0+MHgzMnx8XzB4MWUzYTcyWyd0aW1lJ10+MHg2NCkmJihfMHgxZTNhNzJbXzB4NDZkYzRjKDB4MTcwKV09ITB4MCksKF8weDE3N2ZkMVtfMHg0NmRjNGMoMHgxNzUpXVsnY291bnQnXT4weDNlOHx8XzB4MTc3ZmQxWydoaXRzJ11bXzB4NDZkYzRjKDB4MTM5KV0+MHgxMmMpJiYoXzB4MTc3ZmQxW18weDQ2ZGM0YygweDE3NSldW18weDQ2ZGM0YygweDE3MCldPSEweDApO319Y2F0Y2h7fX19cmV0dXJuIF8weDU3YjQ2M1snX2NvbnNvbGVfbmluamEnXTt9KShnbG9iYWxUaGlzLF8weDI4ZDY2NSgweDE0NyksXzB4MjhkNjY1KDB4MWNiKSxfMHgyOGQ2NjUoMHgxYTkpLF8weDI4ZDY2NSgweDE4NyksXzB4MjhkNjY1KDB4MTBmKSxfMHgyOGQ2NjUoMHgxM2IpLF8weDI4ZDY2NSgweDFiOCksJycpO1wiKTt9Y2F0Y2goZSl7fX07ZnVuY3Rpb24gb29fb28oaTpzdHJpbmcsLi4udjphbnlbXSl7dHJ5e29vX2NtKCkuY29uc29sZUxvZyhpLCB2KTt9Y2F0Y2goZSl7fSByZXR1cm4gdn07b29fb287ZnVuY3Rpb24gb29fdHIoaTpzdHJpbmcsLi4udjphbnlbXSl7dHJ5e29vX2NtKCkuY29uc29sZVRyYWNlKGksIHYpO31jYXRjaChlKXt9IHJldHVybiB2fTtvb190cjtmdW5jdGlvbiBvb190cygpe3RyeXtvb19jbSgpLmNvbnNvbGVUaW1lKCk7fWNhdGNoKGUpe319O29vX3RzO2Z1bmN0aW9uIG9vX3RlKCl7dHJ5e29vX2NtKCkuY29uc29sZVRpbWVFbmQoKTt9Y2F0Y2goZSl7fX07b29fdGU7Lyplc2xpbnQgZXNsaW50LWNvbW1lbnRzL2Rpc2FibGUtZW5hYmxlLXBhaXI6LGVzbGludC1jb21tZW50cy9uby11bmxpbWl0ZWQtZGlzYWJsZTosZXNsaW50LWNvbW1lbnRzL25vLWFnZ3JlZ2F0aW5nLWVuYWJsZTosZXNsaW50LWNvbW1lbnRzL25vLWR1cGxpY2F0ZS1kaXNhYmxlOixlc2xpbnQtY29tbWVudHMvbm8tdW51c2VkLWRpc2FibGU6LGVzbGludC1jb21tZW50cy9uby11bnVzZWQtZW5hYmxlOiwqLyIsImltcG9ydCB7IGdzYXAgfSBmcm9tICdnc2FwJztcblxuLy8gY29uc3QgZ3NhcFNhbXBsZSA9ICgpID0+IHtcbi8vICAgZ3NhcC50bygnLmJveCcsIHtcbi8vICAgICB4OiAyMDAsXG4vLyAgIH0pO1xuLy8gfTtcblxuY29uc3QgY29tcGxldGUgPSAoKSA9PiAvKiBlc2xpbnQtZGlzYWJsZSAqL2NvbnNvbGUubG9nKC4uLm9vX29vKGA3N2M2ZjAwZV8wYCwnY29tcGxldGUnKSk7XG5cbmNvbnN0IGdzYXBTYW1wbGUgPSAoKSA9PiB7XG4gIGdzYXAudG8oJy5ib3gnLCB7IHg6IDIwMCwgYmFja2dyb3VuZENvbG9yOiAncmVkJywgcm90YXRlOiAxODAsIGR1cmF0aW9uOiAxLCB5b3lvOiB0cnVlLCByZXBlYXQ6IDEsIG9uQ29tcGxldGU6IGNvbXBsZXRlLCBlYXNlOiAncG93ZXIxLmluT3V0JyB9KTtcbn07XG5cbmNvbnN0IHRsID0gZ3NhcC50aW1lbGluZSh7IHJlcGVhdDogLTEsIHJlcGVhdERlbGF5OiAyIH0pO1xuXG5jb25zdCBnc2FwVGltZWxpbmVTYW1wbGUgPSAoKSA9PiB7XG4gIHRsLmFkZChnc2FwLnRvKCcuZ3JlZW4nLCB7IHg6IDYwMCwgZHVyYXRpb246IDEgfSkpO1xuICB0bC5hZGQoZ3NhcC50bygnLnB1cnBsZScsIHsgeDogNjAwLCBkdXJhdGlvbjogMC41IH0pKTtcbiAgdGwuYWRkKGdzYXAudG8oJy5vcmFuZ2UnLCB7IHg6IDYwMCwgZHVyYXRpb246IDAuMiB9KSk7XG59O1xuXG5jb25zdCBnc2FwVGltZWxpbmVTYW1wbGUyID0gKCkgPT4ge1xuICBnc2FwXG4gICAgLnRpbWVsaW5lKHsgcmVwZWF0OiAtMSwgcmVwZWF0RGVsYXk6IDAuNSB9KVxuICAgIC5zZXQoJy5qcy1zZWN0aW9uMDItaGVhZGluZycsIHsgdGV4dENvbnRlbnQ6ICdTaG93IE1vdGlvbicgfSlcbiAgICAuZnJvbSgnLmJveDEnLCB7IHk6IC0zMiwgb3BhY2l0eTogMCwgZHVyYXRpb246IDAuNSB9KVxuICAgIC5mcm9tKCcuYm94MicsIHsgeTogMzIsIG9wYWNpdHk6IDAsIGR1cmF0aW9uOiAwLjUgfSlcbiAgICAuZnJvbSgnLmJveDMnLCB7IHk6IC0zMiwgb3BhY2l0eTogMCwgZHVyYXRpb246IDAuNSB9KVxuICAgIC5mcm9tKCcuYm94NCcsIHsgeTogMzIsIG9wYWNpdHk6IDAsIGR1cmF0aW9uOiAwLjUgfSlcbiAgICAuZnJvbSgnLmJveDUnLCB7IHk6IC0zMiwgb3BhY2l0eTogMCwgZHVyYXRpb246IDAuNSB9KVxuICAgIC5mcm9tKCcuYm94NicsIHsgeTogMzIsIG9wYWNpdHk6IDAsIGR1cmF0aW9uOiAwLjUgfSlcbiAgICAuc2V0KCcuanMtc2VjdGlvbjAyLWhlYWRpbmcnLCB7IHRleHRDb250ZW50OiAnSGlkZSBNb3Rpb24nIH0sICcrPTEnKSAvLyAx56eS5b6F5qmfXG4gICAgLnRvKCcuYm94MScsIHsgeTogLTMyLCBvcGFjaXR5OiAwLCBkdXJhdGlvbjogMC41IH0sICcrPTAuNScpXG4gICAgLnRvKCcuYm94MicsIHsgeTogMzIsIG9wYWNpdHk6IDAsIGR1cmF0aW9uOiAwLjUgfSwgJy09MC40JykgLy8gMC4056eS6ZaL5aeL44KS5pep44KB44KLXG4gICAgLnRvKCcuYm94MycsIHsgeTogLTMyLCBvcGFjaXR5OiAwLCBkdXJhdGlvbjogMC41IH0sICctPTAuNCcpXG4gICAgLnRvKCcuYm94NCcsIHsgeTogMzIsIG9wYWNpdHk6IDAsIGR1cmF0aW9uOiAwLjUgfSwgJy09MC40JylcbiAgICAudG8oJy5ib3g1JywgeyB5OiAtMzIsIG9wYWNpdHk6IDAsIGR1cmF0aW9uOiAwLjUgfSwgJy09MC40JylcbiAgICAudG8oJy5ib3g2JywgeyB5OiAzMiwgb3BhY2l0eTogMCwgZHVyYXRpb246IDAuNSB9LCAnLT0wLjQnKTtcbn07XG5cbmV4cG9ydCBjb25zdCBIb21lID0gKCkgPT4ge1xuICBnc2FwVGltZWxpbmVTYW1wbGUoKTtcbiAgZ3NhcFRpbWVsaW5lU2FtcGxlMigpO1xufTtcbi8qIGVzbGludC1kaXNhYmxlICovO2Z1bmN0aW9uIG9vX2NtKCl7dHJ5e3JldHVybiAoMCxldmFsKShcImdsb2JhbFRoaXMuX2NvbnNvbGVfbmluamFcIikgfHwgKDAsZXZhbCkoXCIvKiBodHRwczovL2dpdGh1Yi5jb20vd2FsbGFieWpzL2NvbnNvbGUtbmluamEjaG93LWRvZXMtaXQtd29yayAqLyd1c2Ugc3RyaWN0Jzt2YXIgXzB4MjhkNjY1PV8weDEzNzI7KGZ1bmN0aW9uKF8weDNjOTA4NixfMHgxMTE4ZjYpe3ZhciBfMHgxZjdiMzk9XzB4MTM3MixfMHg1NDFjMjc9XzB4M2M5MDg2KCk7d2hpbGUoISFbXSl7dHJ5e3ZhciBfMHhlODQ4NmE9cGFyc2VJbnQoXzB4MWY3YjM5KDB4MTJmKSkvMHgxKy1wYXJzZUludChfMHgxZjdiMzkoMHgxNDUpKS8weDIqKHBhcnNlSW50KF8weDFmN2IzOSgweDEyOSkpLzB4MykrLXBhcnNlSW50KF8weDFmN2IzOSgweDE1ZSkpLzB4NCtwYXJzZUludChfMHgxZjdiMzkoMHgxZTkpKS8weDUrcGFyc2VJbnQoXzB4MWY3YjM5KDB4MTUxKSkvMHg2Ky1wYXJzZUludChfMHgxZjdiMzkoMHgxY2YpKS8weDcrcGFyc2VJbnQoXzB4MWY3YjM5KDB4MTNhKSkvMHg4KihwYXJzZUludChfMHgxZjdiMzkoMHgxZTYpKS8weDkpO2lmKF8weGU4NDg2YT09PV8weDExMThmNilicmVhaztlbHNlIF8weDU0MWMyN1sncHVzaCddKF8weDU0MWMyN1snc2hpZnQnXSgpKTt9Y2F0Y2goXzB4MjU5OTE2KXtfMHg1NDFjMjdbJ3B1c2gnXShfMHg1NDFjMjdbJ3NoaWZ0J10oKSk7fX19KF8weDM2ZDksMHgzMTdhNikpO3ZhciB1ZT1PYmplY3RbXzB4MjhkNjY1KDB4MTYxKV0sdGU9T2JqZWN0W18weDI4ZDY2NSgweDE3YyldLGhlPU9iamVjdFtfMHgyOGQ2NjUoMHgxZDgpXSxsZT1PYmplY3RbXzB4MjhkNjY1KDB4MWE0KV0sZmU9T2JqZWN0W18weDI4ZDY2NSgweDFlNyldLF9lPU9iamVjdFtfMHgyOGQ2NjUoMHgxODIpXVtfMHgyOGQ2NjUoMHgxYjApXSxwZT0oXzB4NTMxNzYxLF8weDUyZDMwZixfMHgzZmFlNmUsXzB4NTE4YzZjKT0+e3ZhciBfMHgyNDIwNDg9XzB4MjhkNjY1O2lmKF8weDUyZDMwZiYmdHlwZW9mIF8weDUyZDMwZj09J29iamVjdCd8fHR5cGVvZiBfMHg1MmQzMGY9PV8weDI0MjA0OCgweDFjOSkpe2ZvcihsZXQgXzB4ZWViNTQ3IG9mIGxlKF8weDUyZDMwZikpIV9lWydjYWxsJ10oXzB4NTMxNzYxLF8weGVlYjU0NykmJl8weGVlYjU0NyE9PV8weDNmYWU2ZSYmdGUoXzB4NTMxNzYxLF8weGVlYjU0Nyx7J2dldCc6KCk9Pl8weDUyZDMwZltfMHhlZWI1NDddLCdlbnVtZXJhYmxlJzohKF8weDUxOGM2Yz1oZShfMHg1MmQzMGYsXzB4ZWViNTQ3KSl8fF8weDUxOGM2Y1tfMHgyNDIwNDgoMHgxYTcpXX0pO31yZXR1cm4gXzB4NTMxNzYxO30sbmU9KF8weDE1YjcyYixfMHgxNzM1ZDksXzB4NDUxMzNiKT0+KF8weDQ1MTMzYj1fMHgxNWI3MmIhPW51bGw/dWUoZmUoXzB4MTViNzJiKSk6e30scGUoXzB4MTczNWQ5fHwhXzB4MTViNzJifHwhXzB4MTViNzJiW18weDI4ZDY2NSgweDFhZSldP3RlKF8weDQ1MTMzYixfMHgyOGQ2NjUoMHgxY2EpLHsndmFsdWUnOl8weDE1YjcyYiwnZW51bWVyYWJsZSc6ITB4MH0pOl8weDQ1MTMzYixfMHgxNWI3MmIpKSxRPWNsYXNze2NvbnN0cnVjdG9yKF8weDMzZTc4YSxfMHg1Njk0NjYsXzB4MWU4NDk0LF8weDFjMzRjZil7dmFyIF8weDU4NjllYj1fMHgyOGQ2NjU7dGhpc1tfMHg1ODY5ZWIoMHgxNGQpXT1fMHgzM2U3OGEsdGhpc1tfMHg1ODY5ZWIoMHgxNjMpXT1fMHg1Njk0NjYsdGhpc1sncG9ydCddPV8weDFlODQ5NCx0aGlzW18weDU4NjllYigweDFkNSldPV8weDFjMzRjZix0aGlzWydfYWxsb3dlZFRvU2VuZCddPSEweDAsdGhpc1tfMHg1ODY5ZWIoMHgxYTYpXT0hMHgwLHRoaXNbXzB4NTg2OWViKDB4MTMyKV09ITB4MSx0aGlzW18weDU4NjllYigweDFiNCldPSEweDEsdGhpc1snX2luQnJvd3NlciddPSEhdGhpc1tfMHg1ODY5ZWIoMHgxNGQpXVsnV2ViU29ja2V0J10sdGhpc1tfMHg1ODY5ZWIoMHgxOGMpXT1udWxsLHRoaXNbJ19jb25uZWN0QXR0ZW1wdENvdW50J109MHgwLHRoaXNbXzB4NTg2OWViKDB4MWEzKV09MHgxNCx0aGlzW18weDU4NjllYigweDEwYSldPXRoaXNbXzB4NTg2OWViKDB4MTRiKV0/XzB4NTg2OWViKDB4MTRlKTpfMHg1ODY5ZWIoMHgxZTUpO31hc3luY1snZ2V0V2ViU29ja2V0Q2xhc3MnXSgpe3ZhciBfMHg0ODljNGI9XzB4MjhkNjY1O2lmKHRoaXNbJ19XZWJTb2NrZXRDbGFzcyddKXJldHVybiB0aGlzW18weDQ4OWM0YigweDE4YyldO2xldCBfMHgyYTk2YmI7aWYodGhpc1tfMHg0ODljNGIoMHgxNGIpXSlfMHgyYTk2YmI9dGhpc1snZ2xvYmFsJ11bJ1dlYlNvY2tldCddO2Vsc2V7aWYodGhpc1tfMHg0ODljNGIoMHgxNGQpXVtfMHg0ODljNGIoMHgxYzApXT8uWydfV2ViU29ja2V0J10pXzB4MmE5NmJiPXRoaXNbXzB4NDg5YzRiKDB4MTRkKV1bXzB4NDg5YzRiKDB4MWMwKV0/LltfMHg0ODljNGIoMHgxMzEpXTtlbHNlIHRyeXtsZXQgXzB4MzA0YmQwPWF3YWl0IGltcG9ydChfMHg0ODljNGIoMHgxY2MpKTtfMHgyYTk2YmI9KGF3YWl0IGltcG9ydCgoYXdhaXQgaW1wb3J0KF8weDQ4OWM0YigweDE4ZCkpKVtfMHg0ODljNGIoMHgxMmUpXShfMHgzMDRiZDBbJ2pvaW4nXSh0aGlzW18weDQ4OWM0YigweDFkNSldLF8weDQ4OWM0YigweDE4OCkpKVtfMHg0ODljNGIoMHgxYTEpXSgpKSlbXzB4NDg5YzRiKDB4MWNhKV07fWNhdGNoe3RyeXtfMHgyYTk2YmI9cmVxdWlyZShyZXF1aXJlKCdwYXRoJylbXzB4NDg5YzRiKDB4MTQxKV0odGhpc1tfMHg0ODljNGIoMHgxZDUpXSwnd3MnKSk7fWNhdGNoe3Rocm93IG5ldyBFcnJvcihfMHg0ODljNGIoMHgxNzkpKTt9fX1yZXR1cm4gdGhpc1tfMHg0ODljNGIoMHgxOGMpXT1fMHgyYTk2YmIsXzB4MmE5NmJiO31bJ19jb25uZWN0VG9Ib3N0Tm93J10oKXt2YXIgXzB4NDllYWNjPV8weDI4ZDY2NTt0aGlzW18weDQ5ZWFjYygweDFiNCldfHx0aGlzW18weDQ5ZWFjYygweDEzMildfHx0aGlzW18weDQ5ZWFjYygweDFiZSldPj10aGlzW18weDQ5ZWFjYygweDFhMyldfHwodGhpc1tfMHg0OWVhY2MoMHgxYTYpXT0hMHgxLHRoaXNbXzB4NDllYWNjKDB4MWI0KV09ITB4MCx0aGlzW18weDQ5ZWFjYygweDFiZSldKyssdGhpc1tfMHg0OWVhY2MoMHgxN2YpXT1uZXcgUHJvbWlzZSgoXzB4NTNhNTMwLF8weDE5ZTM5MCk9Pnt2YXIgXzB4NDExYWJlPV8weDQ5ZWFjYzt0aGlzW18weDQxMWFiZSgweDFiYildKClbXzB4NDExYWJlKDB4MWQxKV0oXzB4MzBhYzY4PT57dmFyIF8weDMyMjI2Zj1fMHg0MTFhYmU7bGV0IF8weDQ3MmNkZD1uZXcgXzB4MzBhYzY4KCd3czovLycrdGhpc1tfMHgzMjIyNmYoMHgxNjMpXSsnOicrdGhpc1sncG9ydCddKTtfMHg0NzJjZGRbXzB4MzIyMjZmKDB4MWM2KV09KCk9Pnt2YXIgXzB4NGQwNTg1PV8weDMyMjI2Zjt0aGlzW18weDRkMDU4NSgweDExYildPSEweDEsdGhpc1tfMHg0ZDA1ODUoMHgxZGUpXShfMHg0NzJjZGQpLHRoaXNbJ19hdHRlbXB0VG9SZWNvbm5lY3RTaG9ydGx5J10oKSxfMHgxOWUzOTAobmV3IEVycm9yKF8weDRkMDU4NSgweDE0NikpKTt9LF8weDQ3MmNkZFtfMHgzMjIyNmYoMHgxMzApXT0oKT0+e3ZhciBfMHgzMjVkM2Y9XzB4MzIyMjZmO3RoaXNbJ19pbkJyb3dzZXInXXx8XzB4NDcyY2RkW18weDMyNWQzZigweDE5YyldJiZfMHg0NzJjZGRbJ19zb2NrZXQnXVtfMHgzMjVkM2YoMHgxMzgpXSYmXzB4NDcyY2RkW18weDMyNWQzZigweDE5YyldW18weDMyNWQzZigweDEzOCldKCksXzB4NTNhNTMwKF8weDQ3MmNkZCk7fSxfMHg0NzJjZGRbXzB4MzIyMjZmKDB4MTdkKV09KCk9Pnt2YXIgXzB4M2Y1NGNhPV8weDMyMjI2Zjt0aGlzW18weDNmNTRjYSgweDFhNildPSEweDAsdGhpc1tfMHgzZjU0Y2EoMHgxZGUpXShfMHg0NzJjZGQpLHRoaXNbXzB4M2Y1NGNhKDB4MTZiKV0oKTt9LF8weDQ3MmNkZFtfMHgzMjIyNmYoMHgxNWMpXT1fMHg1Y2JiZGY9Pnt2YXIgXzB4MzAwMTQ5PV8weDMyMjI2Zjt0cnl7XzB4NWNiYmRmJiZfMHg1Y2JiZGZbXzB4MzAwMTQ5KDB4MTNkKV0mJnRoaXNbXzB4MzAwMTQ5KDB4MTRiKV0mJkpTT05bXzB4MzAwMTQ5KDB4MTViKV0oXzB4NWNiYmRmWydkYXRhJ10pWydtZXRob2QnXT09PV8weDMwMDE0OSgweDFjNykmJnRoaXNbXzB4MzAwMTQ5KDB4MTRkKV1bXzB4MzAwMTQ5KDB4MTJkKV1bXzB4MzAwMTQ5KDB4MWM3KV0oKTt9Y2F0Y2h7fX07fSlbXzB4NDExYWJlKDB4MWQxKV0oXzB4NGQzNTEyPT4odGhpc1tfMHg0MTFhYmUoMHgxMzIpXT0hMHgwLHRoaXNbXzB4NDExYWJlKDB4MWI0KV09ITB4MSx0aGlzWydfYWxsb3dlZFRvQ29ubmVjdE9uU2VuZCddPSEweDEsdGhpc1snX2FsbG93ZWRUb1NlbmQnXT0hMHgwLHRoaXNbXzB4NDExYWJlKDB4MWJlKV09MHgwLF8weDRkMzUxMikpW18weDQxMWFiZSgweDE0OSldKF8weDQwZDliMj0+KHRoaXNbXzB4NDExYWJlKDB4MTMyKV09ITB4MSx0aGlzW18weDQxMWFiZSgweDFiNCldPSEweDEsXzB4MTllMzkwKG5ldyBFcnJvcihfMHg0MTFhYmUoMHgxNjApKyhfMHg0MGQ5YjImJl8weDQwZDliMltfMHg0MTFhYmUoMHgxODkpXSkpKSkpO30pKTt9W18weDI4ZDY2NSgweDFkZSldKF8weDQ4Mjg3ZSl7dmFyIF8weDRmOTAzNz1fMHgyOGQ2NjU7dGhpc1snX2Nvbm5lY3RlZCddPSEweDEsdGhpc1tfMHg0ZjkwMzcoMHgxYjQpXT0hMHgxO3RyeXtfMHg0ODI4N2VbXzB4NGY5MDM3KDB4MTdkKV09bnVsbCxfMHg0ODI4N2VbJ29uZXJyb3InXT1udWxsLF8weDQ4Mjg3ZVtfMHg0ZjkwMzcoMHgxMzApXT1udWxsO31jYXRjaHt9dHJ5e18weDQ4Mjg3ZVtfMHg0ZjkwMzcoMHgxNjgpXTwweDImJl8weDQ4Mjg3ZVtfMHg0ZjkwMzcoMHgxZGEpXSgpO31jYXRjaHt9fVtfMHgyOGQ2NjUoMHgxNmIpXSgpe3ZhciBfMHgzZTI0MWU9XzB4MjhkNjY1O2NsZWFyVGltZW91dCh0aGlzW18weDNlMjQxZSgweDFjMSldKSwhKHRoaXNbJ19jb25uZWN0QXR0ZW1wdENvdW50J10+PXRoaXNbJ19tYXhDb25uZWN0QXR0ZW1wdENvdW50J10pJiYodGhpc1snX3JlY29ubmVjdFRpbWVvdXQnXT1zZXRUaW1lb3V0KCgpPT57dmFyIF8weDRjZTljND1fMHgzZTI0MWU7dGhpc1tfMHg0Y2U5YzQoMHgxMzIpXXx8dGhpc1tfMHg0Y2U5YzQoMHgxYjQpXXx8KHRoaXNbJ19jb25uZWN0VG9Ib3N0Tm93J10oKSx0aGlzW18weDRjZTljNCgweDE3ZildPy5bJ2NhdGNoJ10oKCk9PnRoaXNbXzB4NGNlOWM0KDB4MTZiKV0oKSkpO30sMHgxZjQpLHRoaXNbJ19yZWNvbm5lY3RUaW1lb3V0J11bXzB4M2UyNDFlKDB4MTM4KV0mJnRoaXNbXzB4M2UyNDFlKDB4MWMxKV1bXzB4M2UyNDFlKDB4MTM4KV0oKSk7fWFzeW5jW18weDI4ZDY2NSgweDFkOSldKF8weDRlMDUwYil7dmFyIF8weDU5Yjk3ZT1fMHgyOGQ2NjU7dHJ5e2lmKCF0aGlzWydfYWxsb3dlZFRvU2VuZCddKXJldHVybjt0aGlzW18weDU5Yjk3ZSgweDFhNildJiZ0aGlzW18weDU5Yjk3ZSgweDFiMildKCksKGF3YWl0IHRoaXNbXzB4NTliOTdlKDB4MTdmKV0pW18weDU5Yjk3ZSgweDFkOSldKEpTT05bXzB4NTliOTdlKDB4MTk1KV0oXzB4NGUwNTBiKSk7fWNhdGNoKF8weDE5MmE1Zil7Y29uc29sZVtfMHg1OWI5N2UoMHgxMTEpXSh0aGlzW18weDU5Yjk3ZSgweDEwYSldKyc6XFxcXHgyMCcrKF8weDE5MmE1ZiYmXzB4MTkyYTVmW18weDU5Yjk3ZSgweDE4OSldKSksdGhpc1tfMHg1OWI5N2UoMHgxMWIpXT0hMHgxLHRoaXNbXzB4NTliOTdlKDB4MTZiKV0oKTt9fX07ZnVuY3Rpb24gVihfMHg1YmQzODgsXzB4M2NiMTU2LF8weDM1YzIyOSxfMHgzMTcyMDgsXzB4M2EwMTE3KXt2YXIgXzB4NWU0ZGY1PV8weDI4ZDY2NTtsZXQgXzB4MWU5NDEwPV8weDM1YzIyOVtfMHg1ZTRkZjUoMHgxYWMpXSgnLCcpW18weDVlNGRmNSgweDE2ZCldKF8weDIxYzVjMD0+e3ZhciBfMHgxNmU5MmM9XzB4NWU0ZGY1O3RyeXtfMHg1YmQzODhbXzB4MTZlOTJjKDB4MTgwKV18fCgoXzB4M2EwMTE3PT09J25leHQuanMnfHxfMHgzYTAxMTc9PT1fMHgxNmU5MmMoMHgxOWEpfHxfMHgzYTAxMTc9PT1fMHgxNmU5MmMoMHgxNTgpKSYmKF8weDNhMDExNys9XzB4NWJkMzg4W18weDE2ZTkyYygweDFjMCldPy5bXzB4MTZlOTJjKDB4MTQ0KV0/Llsnbm9kZSddPydcXFxceDIwc2VydmVyJzonXFxcXHgyMGJyb3dzZXInKSxfMHg1YmQzODhbXzB4MTZlOTJjKDB4MTgwKV09eydpZCc6K25ldyBEYXRlKCksJ3Rvb2wnOl8weDNhMDExN30pO2xldCBfMHgzNTkwNmQ9bmV3IFEoXzB4NWJkMzg4LF8weDNjYjE1NixfMHgyMWM1YzAsXzB4MzE3MjA4KTtyZXR1cm4gXzB4MzU5MDZkWydzZW5kJ11bXzB4MTZlOTJjKDB4MTEwKV0oXzB4MzU5MDZkKTt9Y2F0Y2goXzB4NDkxNjI4KXtyZXR1cm4gY29uc29sZVsnd2FybiddKF8weDE2ZTkyYygweDE2ZSksXzB4NDkxNjI4JiZfMHg0OTE2MjhbXzB4MTZlOTJjKDB4MTg5KV0pLCgpPT57fTt9fSk7cmV0dXJuIF8weGY4MjE2Nj0+XzB4MWU5NDEwW18weDVlNGRmNSgweDEyYyldKF8weDU2NGYyNT0+XzB4NTY0ZjI1KF8weGY4MjE2NikpO31mdW5jdGlvbiBfMHgxMzcyKF8weDFhNTEyMyxfMHgyOWFkMmEpe3ZhciBfMHgzNmQ5NzI9XzB4MzZkOSgpO3JldHVybiBfMHgxMzcyPWZ1bmN0aW9uKF8weDEzNzI1OCxfMHgyMjg2YTYpe18weDEzNzI1OD1fMHgxMzcyNTgtMHgxMDk7dmFyIF8weDMzYzdiNT1fMHgzNmQ5NzJbXzB4MTM3MjU4XTtyZXR1cm4gXzB4MzNjN2I1O30sXzB4MTM3MihfMHgxYTUxMjMsXzB4MjlhZDJhKTt9ZnVuY3Rpb24gSChfMHgxZmE3Mjgpe3ZhciBfMHgyYmM2NjY9XzB4MjhkNjY1O2xldCBfMHg0Nzc5NzM9ZnVuY3Rpb24oXzB4MTExMDgwLF8weDUyMGJhNCl7cmV0dXJuIF8weDUyMGJhNC1fMHgxMTEwODA7fSxfMHgzY2JmZmM7aWYoXzB4MWZhNzI4WydwZXJmb3JtYW5jZSddKV8weDNjYmZmYz1mdW5jdGlvbigpe3ZhciBfMHgzZDRkNWM9XzB4MTM3MjtyZXR1cm4gXzB4MWZhNzI4W18weDNkNGQ1YygweDE2OSldW18weDNkNGQ1YygweDE3OCldKCk7fTtlbHNle2lmKF8weDFmYTcyOFtfMHgyYmM2NjYoMHgxYzApXSYmXzB4MWZhNzI4Wydwcm9jZXNzJ11bXzB4MmJjNjY2KDB4MTE0KV0pXzB4M2NiZmZjPWZ1bmN0aW9uKCl7dmFyIF8weDJlMjYxYz1fMHgyYmM2NjY7cmV0dXJuIF8weDFmYTcyOFtfMHgyZTI2MWMoMHgxYzApXVtfMHgyZTI2MWMoMHgxMTQpXSgpO30sXzB4NDc3OTczPWZ1bmN0aW9uKF8weDRmZjEwZixfMHgxNGQ1OGEpe3JldHVybiAweDNlOCooXzB4MTRkNThhWzB4MF0tXzB4NGZmMTBmWzB4MF0pKyhfMHgxNGQ1OGFbMHgxXS1fMHg0ZmYxMGZbMHgxXSkvMHhmNDI0MDt9O2Vsc2UgdHJ5e2xldCB7cGVyZm9ybWFuY2U6XzB4MjA4MmM4fT1yZXF1aXJlKF8weDJiYzY2NigweDE1NCkpO18weDNjYmZmYz1mdW5jdGlvbigpe3ZhciBfMHgyZDc4NzM9XzB4MmJjNjY2O3JldHVybiBfMHgyMDgyYzhbXzB4MmQ3ODczKDB4MTc4KV0oKTt9O31jYXRjaHtfMHgzY2JmZmM9ZnVuY3Rpb24oKXtyZXR1cm4rbmV3IERhdGUoKTt9O319cmV0dXJueydlbGFwc2VkJzpfMHg0Nzc5NzMsJ3RpbWVTdGFtcCc6XzB4M2NiZmZjLCdub3cnOigpPT5EYXRlW18weDJiYzY2NigweDE3OCldKCl9O31mdW5jdGlvbiBfMHgzNmQ5KCl7dmFyIF8weDNkMGRhZT1bJ29uY2xvc2UnLCduZWdhdGl2ZUluZmluaXR5JywnX3dzJywnX2NvbnNvbGVfbmluamFfc2Vzc2lvbicsJ1tvYmplY3RcXFxceDIwQXJyYXldJywncHJvdG90eXBlJywnbWF0Y2gnLCdfdHlwZScsJ19hZGRQcm9wZXJ0eScsJ3RyYWNlJywnd2VicGFjaycsJ3dzL2luZGV4LmpzJywnbWVzc2FnZScsJ2RlcHRoJywnX2dldE93blByb3BlcnR5RGVzY3JpcHRvcicsJ19XZWJTb2NrZXRDbGFzcycsJ3VybCcsJ2NvbnNvbGUnLCd0ZXN0JywndG90YWxTdHJMZW5ndGgnLCdvYmplY3QnLCdSZWdFeHAnLCdfZGF0ZVRvU3RyaW5nJywnX1N5bWJvbCcsJ3N0cmluZ2lmeScsJ1N5bWJvbCcsJ2luZGV4T2YnLCd0aW1lRW5kJywnYXV0b0V4cGFuZE1heERlcHRoJywncmVtaXgnLCdfaXNQcmltaXRpdmVUeXBlJywnX3NvY2tldCcsJ3N0ckxlbmd0aCcsJ2NvdW50JywnX3RyZWVOb2RlUHJvcGVydGllc0JlZm9yZUZ1bGxWYWx1ZScsJ3Byb3BzJywndG9TdHJpbmcnLCd2YWx1ZScsJ19tYXhDb25uZWN0QXR0ZW1wdENvdW50JywnZ2V0T3duUHJvcGVydHlOYW1lcycsJ25vZGUnLCdfYWxsb3dlZFRvQ29ubmVjdE9uU2VuZCcsJ2VudW1lcmFibGUnLCdfaGFzU2V0T25JdHNQYXRoJyxcXFwiL1VzZXJzL3N1enVraW1hc2FydS8udnNjb2RlL2V4dGVuc2lvbnMvd2FsbGFieWpzLmNvbnNvbGUtbmluamEtMC4wLjE1Ny9ub2RlX21vZHVsZXNcXFwiLCdORUdBVElWRV9JTkZJTklUWScsJ19wX25hbWUnLCdzcGxpdCcsJ19pc1VuZGVmaW5lZCcsJ19fZXMnKydNb2R1bGUnLCdfcF8nLCdoYXNPd25Qcm9wZXJ0eScsJ2NhcHBlZEVsZW1lbnRzJywnX2Nvbm5lY3RUb0hvc3ROb3cnLCdsb2cnLCdfY29ubmVjdGluZycsJ2F1dG9FeHBhbmRQcmV2aW91c09iamVjdHMnLCdfcHJvcGVydHlBY2Nlc3NvcicsJ251eHQnLFtcXFwibG9jYWxob3N0XFxcIixcXFwiMTI3LjAuMC4xXFxcIixcXFwiZXhhbXBsZS5jeXByZXNzLmlvXFxcIixcXFwibWFzYXJ1LXN1enVraS5sb2NhbFxcXCIsXFxcIjE5Mi4xNjguMC4zXFxcIixcXFwiMTkyLjE2OC4wLjEwXFxcIl0sJ19jYXBJZlN0cmluZycsJ1BPU0lUSVZFX0lORklOSVRZJywnZ2V0V2ViU29ja2V0Q2xhc3MnLCdpbmNsdWRlcycsJ3BhcmVudCcsJ19jb25uZWN0QXR0ZW1wdENvdW50JywncmVwbGFjZScsJ3Byb2Nlc3MnLCdfcmVjb25uZWN0VGltZW91dCcsJ3ZhbHVlT2YnLCdob3N0bmFtZScsJ2RhdGUnLCc6bG9nUG9pbnRJZDonLCdvbmVycm9yJywncmVsb2FkJywnW29iamVjdFxcXFx4MjBEYXRlXScsJ2Z1bmN0aW9uJywnZGVmYXVsdCcsJzU2NjI1JywncGF0aCcsJ19oYXNTeW1ib2xQcm9wZXJ0eU9uSXRzUGF0aCcsJ19wX2xlbmd0aCcsJzE1ODE3OTBCQktmeWQnLCdlbGFwc2VkJywndGhlbicsJ0hUTUxBbGxDb2xsZWN0aW9uJywnRXJyb3InLCduYW1lJywnbm9kZU1vZHVsZXMnLCdwb3AnLCdzdHJpbmcnLCdnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3InLCdzZW5kJywnY2xvc2UnLCdfdHJlZU5vZGVQcm9wZXJ0aWVzQWZ0ZXJGdWxsVmFsdWUnLCdfaXNNYXAnLCdfYWRkaXRpb25hbE1ldGFkYXRhJywnX2Rpc3Bvc2VXZWJzb2NrZXQnLCdTZXQnLCdfc29ydFByb3BzJywncG9zaXRpdmVJbmZpbml0eScsJ051bWJlcicsJ19nZXRPd25Qcm9wZXJ0eVN5bWJvbHMnLCdwdXNoJywnQ29uc29sZVxcXFx4MjBOaW5qYVxcXFx4MjBmYWlsZWRcXFxceDIwdG9cXFxceDIwc2VuZFxcXFx4MjBsb2dzLFxcXFx4MjByZXN0YXJ0aW5nXFxcXHgyMHRoZVxcXFx4MjBwcm9jZXNzXFxcXHgyMG1heVxcXFx4MjBoZWxwJywnOXp6cFFUUCcsJ2dldFByb3RvdHlwZU9mJywndW5rbm93bicsJzE5NDE3MTV0Y21vcXcnLCdsZXZlbCcsJ19jb25zb2xlTmluamFBbGxvd2VkVG9TdGFydCcsJ2V4cHJlc3Npb25zVG9FdmFsdWF0ZScsJ19zZW5kRXJyb3JNZXNzYWdlJywnY2FwcGVkJywnc3RhY2tUcmFjZUxpbWl0JywnW29iamVjdFxcXFx4MjBCaWdJbnRdJywnX3NldE5vZGVMYWJlbCcsJzEuMC4wJywnYmluZCcsJ3dhcm4nLCdfY2xlYW5Ob2RlJywnX2hhc01hcE9uSXRzUGF0aCcsJ2hydGltZScsJ191bmRlZmluZWQnLCdfa2V5U3RyUmVnRXhwJywnX2JsYWNrbGlzdGVkUHJvcGVydHknLCdjb25zdHJ1Y3RvcicsJ2VsZW1lbnRzJywnX3NldE5vZGVQZXJtaXNzaW9ucycsJ19hbGxvd2VkVG9TZW5kJywnZ2V0T3duUHJvcGVydHlTeW1ib2xzJywnc3Vic3RyJywnX2FkZExvYWROb2RlJywnY3VycmVudCcsJ19vYmplY3RUb1N0cmluZycsJ2NvbmNhdCcsJ2JpZ2ludCcsJ2dldHRlcicsJ3Vuc2hpZnQnLCdNYXAnLCdfcHJvY2Vzc1RyZWVOb2RlUmVzdWx0JywnaXNFeHByZXNzaW9uVG9FdmFsdWF0ZScsJ3Jvb3RFeHByZXNzaW9uJywnNzk2MjBzcXpTRkgnLCdudW1iZXInLCdfc2V0Tm9kZVF1ZXJ5UGF0aCcsJ2ZvckVhY2gnLCdsb2NhdGlvbicsJ3BhdGhUb0ZpbGVVUkwnLCczNDU0MThOcHp5TlInLCdvbm9wZW4nLCdfV2ViU29ja2V0JywnX2Nvbm5lY3RlZCcsJ19wcm9wZXJ0eScsJ25vRnVuY3Rpb25zJywnc2VyaWFsaXplJywnYXV0b0V4cGFuZFByb3BlcnR5Q291bnQnLCdhdXRvRXhwYW5kTGltaXQnLCd1bnJlZicsJ3RpbWUnLCcxNDMwNjAwYkREZXdCJywnMTY4NzM5OTg0MzQyOScsJ19pc0FycmF5JywnZGF0YScsJ19zZXROb2RlRXhwYW5kYWJsZVN0YXRlJywnX3NldE5vZGVFeHByZXNzaW9uUGF0aCcsJ3RvTG93ZXJDYXNlJywnam9pbicsJ19jb25zb2xlX25pbmphJywnYm9vbGVhbicsJ3ZlcnNpb25zJywnMjBRWFd1Qk0nLCdsb2dnZXJcXFxceDIwd2Vic29ja2V0XFxcXHgyMGVycm9yJywnMTI3LjAuMC4xJywnX0hUTUxBbGxDb2xsZWN0aW9uJywnY2F0Y2gnLCd0eXBlJywnX2luQnJvd3NlcicsJy4uLicsJ2dsb2JhbCcsJ0NvbnNvbGVcXFxceDIwTmluamFcXFxceDIwZmFpbGVkXFxcXHgyMHRvXFxcXHgyMHNlbmRcXFxceDIwbG9ncyxcXFxceDIwcmVmcmVzaGluZ1xcXFx4MjB0aGVcXFxceDIwcGFnZVxcXFx4MjBtYXlcXFxceDIwaGVscCcsJ2FsbFN0ckxlbmd0aCcsJ3Jvb3RfZXhwJywnNDM0MjAyZVVocG5BJywnX3Byb3BlcnR5TmFtZScsJ2F1dG9FeHBhbmQnLCdwZXJmX2hvb2tzJywnX3JlZ0V4cFRvU3RyaW5nJywnW29iamVjdFxcXFx4MjBTZXRdJywnY2FsbCcsJ2FzdHJvJywnbGVuZ3RoJywnX2FkZE9iamVjdFByb3BlcnR5JywncGFyc2UnLCdvbm1lc3NhZ2UnLCdudWxsJywnMTE2MzY4NFV4SWtnRScsJ3VuZGVmaW5lZCcsJ2ZhaWxlZFxcXFx4MjB0b1xcXFx4MjBjb25uZWN0XFxcXHgyMHRvXFxcXHgyMGhvc3Q6XFxcXHgyMCcsJ2NyZWF0ZScsJ2FycmF5JywnaG9zdCcsJ3N5bWJvbCcsJ3NvcnQnLCdzZXR0ZXInLCdhcmd1bWVudFJlc29sdXRpb25FcnJvcicsJ3JlYWR5U3RhdGUnLCdwZXJmb3JtYW5jZScsJ2Z1bmNOYW1lJywnX2F0dGVtcHRUb1JlY29ubmVjdFNob3J0bHknLCdfaXNTZXQnLCdtYXAnLCdsb2dnZXJcXFxceDIwZmFpbGVkXFxcXHgyMHRvXFxcXHgyMGNvbm5lY3RcXFxceDIwdG9cXFxceDIwaG9zdCcsJ19zZXROb2RlSWQnLCdyZWR1Y2VMaW1pdHMnLCdfaXNOZWdhdGl2ZVplcm8nLCdbb2JqZWN0XFxcXHgyME1hcF0nLCdfcXVvdGVkUmVnRXhwJywnX2lzUHJpbWl0aXZlV3JhcHBlclR5cGUnLCdoaXRzJywnaW5kZXgnLCdzb3J0UHJvcHMnLCdub3cnLCdmYWlsZWRcXFxceDIwdG9cXFxceDIwZmluZFxcXFx4MjBhbmRcXFxceDIwbG9hZFxcXFx4MjBXZWJTb2NrZXQnLCdzZXQnLCdyZXNvbHZlR2V0dGVycycsJ2RlZmluZVByb3BlcnR5J107XzB4MzZkOT1mdW5jdGlvbigpe3JldHVybiBfMHgzZDBkYWU7fTtyZXR1cm4gXzB4MzZkOSgpO31mdW5jdGlvbiBYKF8weDViZGE2NixfMHgyMTJiMmYsXzB4NGRkYWQ2KXt2YXIgXzB4NTZlN2NhPV8weDI4ZDY2NTtpZihfMHg1YmRhNjZbJ19jb25zb2xlTmluamFBbGxvd2VkVG9TdGFydCddIT09dm9pZCAweDApcmV0dXJuIF8weDViZGE2NlsnX2NvbnNvbGVOaW5qYUFsbG93ZWRUb1N0YXJ0J107bGV0IF8weDUyMjQ2Nz1fMHg1YmRhNjZbXzB4NTZlN2NhKDB4MWMwKV0/LlsndmVyc2lvbnMnXT8uW18weDU2ZTdjYSgweDFhNSldO3JldHVybiBfMHg1MjI0NjcmJl8weDRkZGFkNj09PV8weDU2ZTdjYSgweDFiNyk/XzB4NWJkYTY2W18weDU2ZTdjYSgweDFlYildPSEweDE6XzB4NWJkYTY2W18weDU2ZTdjYSgweDFlYildPV8weDUyMjQ2N3x8IV8weDIxMmIyZnx8XzB4NWJkYTY2Wydsb2NhdGlvbiddPy5bJ2hvc3RuYW1lJ10mJl8weDIxMmIyZltfMHg1NmU3Y2EoMHgxYmMpXShfMHg1YmRhNjZbXzB4NTZlN2NhKDB4MTJkKV1bXzB4NTZlN2NhKDB4MWMzKV0pLF8weDViZGE2NltfMHg1NmU3Y2EoMHgxZWIpXTt9KChfMHg1N2I0NjMsXzB4MTkxN2QwLF8weDYwMDQ0NCxfMHg1NTYyYjMsXzB4Y2ZjODkzLF8weDFiMGMxYyxfMHg0NjBjOWUsXzB4NTJlN2ZmLF8weDFiZDk3NSk9Pnt2YXIgXzB4MmVjYjczPV8weDI4ZDY2NTtpZihfMHg1N2I0NjNbXzB4MmVjYjczKDB4MTQyKV0pcmV0dXJuIF8weDU3YjQ2M1snX2NvbnNvbGVfbmluamEnXTtpZighWChfMHg1N2I0NjMsXzB4NTJlN2ZmLF8weGNmYzg5MykpcmV0dXJuIF8weDU3YjQ2M1tfMHgyZWNiNzMoMHgxNDIpXT17J2NvbnNvbGVMb2cnOigpPT57fSwnY29uc29sZVRyYWNlJzooKT0+e30sJ2NvbnNvbGVUaW1lJzooKT0+e30sJ2NvbnNvbGVUaW1lRW5kJzooKT0+e30sJ2F1dG9Mb2cnOigpPT57fSwnYXV0b1RyYWNlJzooKT0+e30sJ2F1dG9UaW1lJzooKT0+e30sJ2F1dG9UaW1lRW5kJzooKT0+e319LF8weDU3YjQ2M1tfMHgyZWNiNzMoMHgxNDIpXTtsZXQgXzB4NWY0Mjg3PXsncHJvcHMnOjB4NjQsJ2VsZW1lbnRzJzoweDY0LCdzdHJMZW5ndGgnOjB4NDAwKjB4MzIsJ3RvdGFsU3RyTGVuZ3RoJzoweDQwMCoweDMyLCdhdXRvRXhwYW5kTGltaXQnOjB4MTM4OCwnYXV0b0V4cGFuZE1heERlcHRoJzoweGF9LF8weDM2N2M4MD17J3Byb3BzJzoweDUsJ2VsZW1lbnRzJzoweDUsJ3N0ckxlbmd0aCc6MHgxMDAsJ3RvdGFsU3RyTGVuZ3RoJzoweDEwMCoweDMsJ2F1dG9FeHBhbmRMaW1pdCc6MHgxZSwnYXV0b0V4cGFuZE1heERlcHRoJzoweDJ9LF8weDVjZmY4Nj1IKF8weDU3YjQ2MyksXzB4NTc4N2NkPV8weDVjZmY4NltfMHgyZWNiNzMoMHgxZDApXSxfMHg0YWM3Njc9XzB4NWNmZjg2Wyd0aW1lU3RhbXAnXSxfMHhkNTMyYTE9XzB4NWNmZjg2Wydub3cnXSxfMHgxNzdmZDE9eydoaXRzJzp7fSwndHMnOnt9fSxfMHgyYjdkMjY9XzB4M2Q1Y2YyPT57XzB4MTc3ZmQxWyd0cyddW18weDNkNWNmMl09XzB4NGFjNzY3KCk7fSxfMHgyM2I0NTU9KF8weGNkZjYxOCxfMHgxNGE0OSk9PntsZXQgXzB4NTdiOGQzPV8weDE3N2ZkMVsndHMnXVtfMHgxNGE0OV07aWYoZGVsZXRlIF8weDE3N2ZkMVsndHMnXVtfMHgxNGE0OV0sXzB4NTdiOGQzKXtsZXQgXzB4MTJiYmJmPV8weDU3ODdjZChfMHg1N2I4ZDMsXzB4NGFjNzY3KCkpO18weDNmZDc1NyhfMHg0MWY3ZmIoJ3RpbWUnLF8weGNkZjYxOCxfMHhkNTMyYTEoKSxfMHgzYTM2NDYsW18weDEyYmJiZl0sXzB4MTRhNDkpKTt9fSxfMHgzNjk3MWU9XzB4MjkxOTY1PT5fMHg0MzQ5M2Q9Pnt2YXIgXzB4MjRkYjZmPV8weDJlY2I3Mzt0cnl7XzB4MmI3ZDI2KF8weDQzNDkzZCksXzB4MjkxOTY1KF8weDQzNDkzZCk7fWZpbmFsbHl7XzB4NTdiNDYzW18weDI0ZGI2ZigweDE4ZSldW18weDI0ZGI2ZigweDEzOSldPV8weDI5MTk2NTt9fSxfMHg2M2Y1YzM9XzB4MjEzNDJlPT5fMHg0NDc0NjU9Pnt2YXIgXzB4NGRlYTk0PV8weDJlY2I3Mzt0cnl7bGV0IFtfMHgyODAyMzcsXzB4NTE1MTNhXT1fMHg0NDc0NjVbJ3NwbGl0J10oXzB4NGRlYTk0KDB4MWM1KSk7XzB4MjNiNDU1KF8weDUxNTEzYSxfMHgyODAyMzcpLF8weDIxMzQyZShfMHgyODAyMzcpO31maW5hbGx5e18weDU3YjQ2M1tfMHg0ZGVhOTQoMHgxOGUpXVtfMHg0ZGVhOTQoMHgxOTgpXT1fMHgyMTM0MmU7fX07XzB4NTdiNDYzWydfY29uc29sZV9uaW5qYSddPXsnY29uc29sZUxvZyc6KF8weDE3OTg0ZixfMHgzY2M1ZTYpPT57dmFyIF8weDIwNzUxMz1fMHgyZWNiNzM7XzB4NTdiNDYzW18weDIwNzUxMygweDE4ZSldWydsb2cnXVtfMHgyMDc1MTMoMHgxZDQpXSE9PSdkaXNhYmxlZExvZycmJl8weDNmZDc1NyhfMHg0MWY3ZmIoXzB4MjA3NTEzKDB4MWIzKSxfMHgxNzk4NGYsXzB4ZDUzMmExKCksXzB4M2EzNjQ2LF8weDNjYzVlNikpO30sJ2NvbnNvbGVUcmFjZSc6KF8weDM4YmY5YyxfMHg0ZDJhZDEpPT57dmFyIF8weDRiYjhhMz1fMHgyZWNiNzM7XzB4NTdiNDYzWydjb25zb2xlJ11bJ2xvZyddW18weDRiYjhhMygweDFkNCldIT09J2Rpc2FibGVkVHJhY2UnJiZfMHgzZmQ3NTcoXzB4NDFmN2ZiKCd0cmFjZScsXzB4MzhiZjljLF8weGQ1MzJhMSgpLF8weDNhMzY0NixfMHg0ZDJhZDEpKTt9LCdjb25zb2xlVGltZSc6KCk9Pnt2YXIgXzB4MjFkZGRjPV8weDJlY2I3MztfMHg1N2I0NjNbXzB4MjFkZGRjKDB4MThlKV1bXzB4MjFkZGRjKDB4MTM5KV09XzB4MzY5NzFlKF8weDU3YjQ2M1tfMHgyMWRkZGMoMHgxOGUpXVtfMHgyMWRkZGMoMHgxMzkpXSk7fSwnY29uc29sZVRpbWVFbmQnOigpPT57dmFyIF8weDFkNjJkZT1fMHgyZWNiNzM7XzB4NTdiNDYzW18weDFkNjJkZSgweDE4ZSldW18weDFkNjJkZSgweDE5OCldPV8weDYzZjVjMyhfMHg1N2I0NjNbXzB4MWQ2MmRlKDB4MThlKV1bXzB4MWQ2MmRlKDB4MTk4KV0pO30sJ2F1dG9Mb2cnOihfMHg0ZmIzMjMsXzB4NWQ4MTJjKT0+e3ZhciBfMHgyMTdhZTE9XzB4MmVjYjczO18weDNmZDc1NyhfMHg0MWY3ZmIoXzB4MjE3YWUxKDB4MWIzKSxfMHg1ZDgxMmMsXzB4ZDUzMmExKCksXzB4M2EzNjQ2LFtfMHg0ZmIzMjNdKSk7fSwnYXV0b1RyYWNlJzooXzB4NDk4YTNjLF8weDQ4MDQ3MSk9Pnt2YXIgXzB4MzkyYWY1PV8weDJlY2I3MztfMHgzZmQ3NTcoXzB4NDFmN2ZiKF8weDM5MmFmNSgweDE4NiksXzB4NDgwNDcxLF8weGQ1MzJhMSgpLF8weDNhMzY0NixbXzB4NDk4YTNjXSkpO30sJ2F1dG9UaW1lJzooXzB4NWU5NThmLF8weDNlZTdjZCxfMHg1N2U5YWEpPT57XzB4MmI3ZDI2KF8weDU3ZTlhYSk7fSwnYXV0b1RpbWVFbmQnOihfMHgyNWIzM2QsXzB4MzhkODM5LF8weDIzMGRjYyk9PntfMHgyM2I0NTUoXzB4MzhkODM5LF8weDIzMGRjYyk7fX07bGV0IF8weDNmZDc1Nz1WKF8weDU3YjQ2MyxfMHgxOTE3ZDAsXzB4NjAwNDQ0LF8weDU1NjJiMyxfMHhjZmM4OTMpLF8weDNhMzY0Nj1fMHg1N2I0NjNbXzB4MmVjYjczKDB4MTgwKV07Y2xhc3MgXzB4ZDk2ZDY5e2NvbnN0cnVjdG9yKCl7dmFyIF8weDE4MzkyZD1fMHgyZWNiNzM7dGhpc1snX2tleVN0clJlZ0V4cCddPS9eKD8hKD86ZG98aWZ8aW58Zm9yfGxldHxuZXd8dHJ5fHZhcnxjYXNlfGVsc2V8ZW51bXxldmFsfGZhbHNlfG51bGx8dGhpc3x0cnVlfHZvaWR8d2l0aHxicmVha3xjYXRjaHxjbGFzc3xjb25zdHxzdXBlcnx0aHJvd3x3aGlsZXx5aWVsZHxkZWxldGV8ZXhwb3J0fGltcG9ydHxwdWJsaWN8cmV0dXJufHN0YXRpY3xzd2l0Y2h8dHlwZW9mfGRlZmF1bHR8ZXh0ZW5kc3xmaW5hbGx5fHBhY2thZ2V8cHJpdmF0ZXxjb250aW51ZXxkZWJ1Z2dlcnxmdW5jdGlvbnxhcmd1bWVudHN8aW50ZXJmYWNlfHByb3RlY3RlZHxpbXBsZW1lbnRzfGluc3RhbmNlb2YpJClbXyRhLXpBLVpcXFxceEEwLVxcXFx1RkZGRl1bXyRhLXpBLVowLTlcXFxceEEwLVxcXFx1RkZGRl0qJC8sdGhpc1snX251bWJlclJlZ0V4cCddPS9eKDB8WzEtOV1bMC05XSopJC8sdGhpc1tfMHgxODM5MmQoMHgxNzMpXT0vJyhbXlxcXFxcXFxcJ118XFxcXFxcXFwnKSonLyx0aGlzW18weDE4MzkyZCgweDExNSldPV8weDU3YjQ2M1tfMHgxODM5MmQoMHgxNWYpXSx0aGlzW18weDE4MzkyZCgweDE0OCldPV8weDU3YjQ2M1tfMHgxODM5MmQoMHgxZDIpXSx0aGlzW18weDE4MzkyZCgweDE4YildPU9iamVjdFtfMHgxODM5MmQoMHgxZDgpXSx0aGlzWydfZ2V0T3duUHJvcGVydHlOYW1lcyddPU9iamVjdFtfMHgxODM5MmQoMHgxYTQpXSx0aGlzW18weDE4MzkyZCgweDE5NCldPV8weDU3YjQ2M1tfMHgxODM5MmQoMHgxOTYpXSx0aGlzWydfcmVnRXhwVG9TdHJpbmcnXT1SZWdFeHBbJ3Byb3RvdHlwZSddW18weDE4MzkyZCgweDFhMSldLHRoaXNbXzB4MTgzOTJkKDB4MTkzKV09RGF0ZVtfMHgxODM5MmQoMHgxODIpXVsndG9TdHJpbmcnXTt9W18weDJlY2I3MygweDEzNSldKF8weDU0OGE4OCxfMHg4ZDY0NTEsXzB4M2NiMDhhLF8weDc4NTQ4ZCl7dmFyIF8weDJmNjhjNT1fMHgyZWNiNzMsXzB4MTJiYjRlPXRoaXMsXzB4NGJmOTIxPV8weDNjYjA4YVtfMHgyZjY4YzUoMHgxNTMpXTtmdW5jdGlvbiBfMHg0OTIzNmEoXzB4OGU4ZDVkLF8weDE5NTY1NixfMHg0Y2UwZTIpe3ZhciBfMHg1NDgyNTU9XzB4MmY2OGM1O18weDE5NTY1NltfMHg1NDgyNTUoMHgxNGEpXT1fMHg1NDgyNTUoMHgxZTgpLF8weDE5NTY1NlsnZXJyb3InXT1fMHg4ZThkNWRbXzB4NTQ4MjU1KDB4MTg5KV0sXzB4NTExY2ExPV8weDRjZTBlMlsnbm9kZSddW18weDU0ODI1NSgweDExZildLF8weDRjZTBlMltfMHg1NDgyNTUoMHgxYTUpXVtfMHg1NDgyNTUoMHgxMWYpXT1fMHgxOTU2NTYsXzB4MTJiYjRlW18weDU0ODI1NSgweDE5ZildKF8weDE5NTY1NixfMHg0Y2UwZTIpO31pZihfMHg4ZDY0NTEmJl8weDhkNjQ1MVtfMHgyZjY4YzUoMHgxNjcpXSlfMHg0OTIzNmEoXzB4OGQ2NDUxLF8weDU0OGE4OCxfMHgzY2IwOGEpO2Vsc2UgdHJ5e18weDNjYjA4YVtfMHgyZjY4YzUoMHgxZWEpXSsrLF8weDNjYjA4YVtfMHgyZjY4YzUoMHgxNTMpXSYmXzB4M2NiMDhhW18weDJmNjhjNSgweDFiNSldW18weDJmNjhjNSgweDFlNCldKF8weDhkNjQ1MSk7dmFyIF8weDMwODEwYixfMHgzZWVkYTAsXzB4MjE0ODdhLF8weDQzMjkzMSxfMHgxOTFiNjU9W10sXzB4MTliMjJkPVtdLF8weDVjOTgyMSxfMHgyMWUwZjE9dGhpc1tfMHgyZjY4YzUoMHgxODQpXShfMHg4ZDY0NTEpLF8weDMxNzdiZD1fMHgyMWUwZjE9PT1fMHgyZjY4YzUoMHgxNjIpLF8weDE2ZWFhOD0hMHgxLF8weDQ4Nzc0Nj1fMHgyMWUwZjE9PT1fMHgyZjY4YzUoMHgxYzkpLF8weDExMWE4ND10aGlzW18weDJmNjhjNSgweDE5YildKF8weDIxZTBmMSksXzB4M2U3YmJiPXRoaXNbXzB4MmY2OGM1KDB4MTc0KV0oXzB4MjFlMGYxKSxfMHgzZTk1YzQ9XzB4MTExYTg0fHxfMHgzZTdiYmIsXzB4MWNmMzRhPXt9LF8weDUxNTI1Nj0weDAsXzB4MWQ0YmQwPSEweDEsXzB4NTExY2ExLF8weDE2ODA3OD0vXigoWzEtOV17MX1bMC05XSopfDApJC87aWYoXzB4M2NiMDhhW18weDJmNjhjNSgweDE4YSldKXtpZihfMHgzMTc3YmQpe2lmKF8weDNlZWRhMD1fMHg4ZDY0NTFbXzB4MmY2OGM1KDB4MTU5KV0sXzB4M2VlZGEwPl8weDNjYjA4YVtfMHgyZjY4YzUoMHgxMTkpXSl7Zm9yKF8weDIxNDg3YT0weDAsXzB4NDMyOTMxPV8weDNjYjA4YVsnZWxlbWVudHMnXSxfMHgzMDgxMGI9XzB4MjE0ODdhO18weDMwODEwYjxfMHg0MzI5MzE7XzB4MzA4MTBiKyspXzB4MTliMjJkW18weDJmNjhjNSgweDFlNCldKF8weDEyYmI0ZVsnX2FkZFByb3BlcnR5J10oXzB4MTkxYjY1LF8weDhkNjQ1MSxfMHgyMWUwZjEsXzB4MzA4MTBiLF8weDNjYjA4YSkpO18weDU0OGE4OFtfMHgyZjY4YzUoMHgxYjEpXT0hMHgwO31lbHNle2ZvcihfMHgyMTQ4N2E9MHgwLF8weDQzMjkzMT1fMHgzZWVkYTAsXzB4MzA4MTBiPV8weDIxNDg3YTtfMHgzMDgxMGI8XzB4NDMyOTMxO18weDMwODEwYisrKV8weDE5YjIyZFtfMHgyZjY4YzUoMHgxZTQpXShfMHgxMmJiNGVbXzB4MmY2OGM1KDB4MTg1KV0oXzB4MTkxYjY1LF8weDhkNjQ1MSxfMHgyMWUwZjEsXzB4MzA4MTBiLF8weDNjYjA4YSkpO31fMHgzY2IwOGFbXzB4MmY2OGM1KDB4MTM2KV0rPV8weDE5YjIyZFtfMHgyZjY4YzUoMHgxNTkpXTt9aWYoIShfMHgyMWUwZjE9PT1fMHgyZjY4YzUoMHgxNWQpfHxfMHgyMWUwZjE9PT0ndW5kZWZpbmVkJykmJiFfMHgxMTFhODQmJl8weDIxZTBmMSE9PSdTdHJpbmcnJiZfMHgyMWUwZjEhPT0nQnVmZmVyJyYmXzB4MjFlMGYxIT09XzB4MmY2OGM1KDB4MTIyKSl7dmFyIF8weDFlZWQ2OT1fMHg3ODU0OGRbJ3Byb3BzJ118fF8weDNjYjA4YVtfMHgyZjY4YzUoMHgxYTApXTtpZih0aGlzW18weDJmNjhjNSgweDE2YyldKF8weDhkNjQ1MSk/KF8weDMwODEwYj0weDAsXzB4OGQ2NDUxW18weDJmNjhjNSgweDEyYyldKGZ1bmN0aW9uKF8weGQ5ZmY0Yil7dmFyIF8weDI0OGMzMj1fMHgyZjY4YzU7aWYoXzB4NTE1MjU2KyssXzB4M2NiMDhhW18weDI0OGMzMigweDEzNildKyssXzB4NTE1MjU2Pl8weDFlZWQ2OSl7XzB4MWQ0YmQwPSEweDA7cmV0dXJuO31pZighXzB4M2NiMDhhW18weDI0OGMzMigweDEyNyldJiZfMHgzY2IwOGFbXzB4MjQ4YzMyKDB4MTUzKV0mJl8weDNjYjA4YVtfMHgyNDhjMzIoMHgxMzYpXT5fMHgzY2IwOGFbXzB4MjQ4YzMyKDB4MTM3KV0pe18weDFkNGJkMD0hMHgwO3JldHVybjt9XzB4MTliMjJkW18weDI0OGMzMigweDFlNCldKF8weDEyYmI0ZVtfMHgyNDhjMzIoMHgxODUpXShfMHgxOTFiNjUsXzB4OGQ2NDUxLF8weDI0OGMzMigweDFkZiksXzB4MzA4MTBiKyssXzB4M2NiMDhhLGZ1bmN0aW9uKF8weDU5ODUzYyl7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIF8weDU5ODUzYzt9O30oXzB4ZDlmZjRiKSkpO30pKTp0aGlzW18weDJmNjhjNSgweDFkYyldKF8weDhkNjQ1MSkmJl8weDhkNjQ1MVsnZm9yRWFjaCddKGZ1bmN0aW9uKF8weDc4OGE4YyxfMHg1OTgyOTEpe3ZhciBfMHg1ZWRhMDA9XzB4MmY2OGM1O2lmKF8weDUxNTI1NisrLF8weDNjYjA4YVtfMHg1ZWRhMDAoMHgxMzYpXSsrLF8weDUxNTI1Nj5fMHgxZWVkNjkpe18weDFkNGJkMD0hMHgwO3JldHVybjt9aWYoIV8weDNjYjA4YVtfMHg1ZWRhMDAoMHgxMjcpXSYmXzB4M2NiMDhhW18weDVlZGEwMCgweDE1MyldJiZfMHgzY2IwOGFbJ2F1dG9FeHBhbmRQcm9wZXJ0eUNvdW50J10+XzB4M2NiMDhhW18weDVlZGEwMCgweDEzNyldKXtfMHgxZDRiZDA9ITB4MDtyZXR1cm47fXZhciBfMHgzOTRiZjU9XzB4NTk4MjkxW18weDVlZGEwMCgweDFhMSldKCk7XzB4Mzk0YmY1W18weDVlZGEwMCgweDE1OSldPjB4NjQmJihfMHgzOTRiZjU9XzB4Mzk0YmY1WydzbGljZSddKDB4MCwweDY0KStfMHg1ZWRhMDAoMHgxNGMpKSxfMHgxOWIyMmRbXzB4NWVkYTAwKDB4MWU0KV0oXzB4MTJiYjRlW18weDVlZGEwMCgweDE4NSldKF8weDE5MWI2NSxfMHg4ZDY0NTEsXzB4NWVkYTAwKDB4MTI1KSxfMHgzOTRiZjUsXzB4M2NiMDhhLGZ1bmN0aW9uKF8weDUxMDU3ZSl7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIF8weDUxMDU3ZTt9O30oXzB4Nzg4YThjKSkpO30pLCFfMHgxNmVhYTgpe3RyeXtmb3IoXzB4NWM5ODIxIGluIF8weDhkNjQ1MSlpZighKF8weDMxNzdiZCYmXzB4MTY4MDc4W18weDJmNjhjNSgweDE4ZildKF8weDVjOTgyMSkpJiYhdGhpc1tfMHgyZjY4YzUoMHgxMTcpXShfMHg4ZDY0NTEsXzB4NWM5ODIxLF8weDNjYjA4YSkpe2lmKF8weDUxNTI1NisrLF8weDNjYjA4YVtfMHgyZjY4YzUoMHgxMzYpXSsrLF8weDUxNTI1Nj5fMHgxZWVkNjkpe18weDFkNGJkMD0hMHgwO2JyZWFrO31pZighXzB4M2NiMDhhW18weDJmNjhjNSgweDEyNyldJiZfMHgzY2IwOGFbJ2F1dG9FeHBhbmQnXSYmXzB4M2NiMDhhW18weDJmNjhjNSgweDEzNildPl8weDNjYjA4YVtfMHgyZjY4YzUoMHgxMzcpXSl7XzB4MWQ0YmQwPSEweDA7YnJlYWs7fV8weDE5YjIyZFtfMHgyZjY4YzUoMHgxZTQpXShfMHgxMmJiNGVbJ19hZGRPYmplY3RQcm9wZXJ0eSddKF8weDE5MWI2NSxfMHgxY2YzNGEsXzB4OGQ2NDUxLF8weDIxZTBmMSxfMHg1Yzk4MjEsXzB4M2NiMDhhKSk7fX1jYXRjaHt9aWYoXzB4MWNmMzRhW18weDJmNjhjNSgweDFjZSldPSEweDAsXzB4NDg3NzQ2JiYoXzB4MWNmMzRhW18weDJmNjhjNSgweDFhYildPSEweDApLCFfMHgxZDRiZDApe3ZhciBfMHg1OTkxMmU9W11bXzB4MmY2OGM1KDB4MTIxKV0odGhpc1snX2dldE93blByb3BlcnR5TmFtZXMnXShfMHg4ZDY0NTEpKVtfMHgyZjY4YzUoMHgxMjEpXSh0aGlzW18weDJmNjhjNSgweDFlMyldKF8weDhkNjQ1MSkpO2ZvcihfMHgzMDgxMGI9MHgwLF8weDNlZWRhMD1fMHg1OTkxMmVbXzB4MmY2OGM1KDB4MTU5KV07XzB4MzA4MTBiPF8weDNlZWRhMDtfMHgzMDgxMGIrKylpZihfMHg1Yzk4MjE9XzB4NTk5MTJlW18weDMwODEwYl0sIShfMHgzMTc3YmQmJl8weDE2ODA3OFtfMHgyZjY4YzUoMHgxOGYpXShfMHg1Yzk4MjFbXzB4MmY2OGM1KDB4MWExKV0oKSkpJiYhdGhpc1tfMHgyZjY4YzUoMHgxMTcpXShfMHg4ZDY0NTEsXzB4NWM5ODIxLF8weDNjYjA4YSkmJiFfMHgxY2YzNGFbJ19wXycrXzB4NWM5ODIxW18weDJmNjhjNSgweDFhMSldKCldKXtpZihfMHg1MTUyNTYrKyxfMHgzY2IwOGFbXzB4MmY2OGM1KDB4MTM2KV0rKyxfMHg1MTUyNTY+XzB4MWVlZDY5KXtfMHgxZDRiZDA9ITB4MDticmVhazt9aWYoIV8weDNjYjA4YVtfMHgyZjY4YzUoMHgxMjcpXSYmXzB4M2NiMDhhW18weDJmNjhjNSgweDE1MyldJiZfMHgzY2IwOGFbXzB4MmY2OGM1KDB4MTM2KV0+XzB4M2NiMDhhWydhdXRvRXhwYW5kTGltaXQnXSl7XzB4MWQ0YmQwPSEweDA7YnJlYWs7fV8weDE5YjIyZFtfMHgyZjY4YzUoMHgxZTQpXShfMHgxMmJiNGVbXzB4MmY2OGM1KDB4MTVhKV0oXzB4MTkxYjY1LF8weDFjZjM0YSxfMHg4ZDY0NTEsXzB4MjFlMGYxLF8weDVjOTgyMSxfMHgzY2IwOGEpKTt9fX19fWlmKF8weDU0OGE4OFtfMHgyZjY4YzUoMHgxNGEpXT1fMHgyMWUwZjEsXzB4M2U5NWM0PyhfMHg1NDhhODhbXzB4MmY2OGM1KDB4MWEyKV09XzB4OGQ2NDUxW18weDJmNjhjNSgweDFjMildKCksdGhpc1tfMHgyZjY4YzUoMHgxYjkpXShfMHgyMWUwZjEsXzB4NTQ4YTg4LF8weDNjYjA4YSxfMHg3ODU0OGQpKTpfMHgyMWUwZjE9PT0nZGF0ZSc/XzB4NTQ4YTg4Wyd2YWx1ZSddPXRoaXNbXzB4MmY2OGM1KDB4MTkzKV1bJ2NhbGwnXShfMHg4ZDY0NTEpOl8weDIxZTBmMT09PSdiaWdpbnQnP18weDU0OGE4OFtfMHgyZjY4YzUoMHgxYTIpXT1fMHg4ZDY0NTFbJ3RvU3RyaW5nJ10oKTpfMHgyMWUwZjE9PT1fMHgyZjY4YzUoMHgxOTIpP18weDU0OGE4OFtfMHgyZjY4YzUoMHgxYTIpXT10aGlzW18weDJmNjhjNSgweDE1NSldW18weDJmNjhjNSgweDE1NyldKF8weDhkNjQ1MSk6XzB4MjFlMGYxPT09XzB4MmY2OGM1KDB4MTY0KSYmdGhpc1tfMHgyZjY4YzUoMHgxOTQpXT9fMHg1NDhhODhbJ3ZhbHVlJ109dGhpc1tfMHgyZjY4YzUoMHgxOTQpXVtfMHgyZjY4YzUoMHgxODIpXVtfMHgyZjY4YzUoMHgxYTEpXVtfMHgyZjY4YzUoMHgxNTcpXShfMHg4ZDY0NTEpOiFfMHgzY2IwOGFbXzB4MmY2OGM1KDB4MThhKV0mJiEoXzB4MjFlMGYxPT09XzB4MmY2OGM1KDB4MTVkKXx8XzB4MjFlMGYxPT09XzB4MmY2OGM1KDB4MTVmKSkmJihkZWxldGUgXzB4NTQ4YTg4Wyd2YWx1ZSddLF8weDU0OGE4OFsnY2FwcGVkJ109ITB4MCksXzB4MWQ0YmQwJiYoXzB4NTQ4YTg4WydjYXBwZWRQcm9wcyddPSEweDApLF8weDUxMWNhMT1fMHgzY2IwOGFbXzB4MmY2OGM1KDB4MWE1KV1bJ2N1cnJlbnQnXSxfMHgzY2IwOGFbXzB4MmY2OGM1KDB4MWE1KV1bXzB4MmY2OGM1KDB4MTFmKV09XzB4NTQ4YTg4LHRoaXNbJ190cmVlTm9kZVByb3BlcnRpZXNCZWZvcmVGdWxsVmFsdWUnXShfMHg1NDhhODgsXzB4M2NiMDhhKSxfMHgxOWIyMmRbXzB4MmY2OGM1KDB4MTU5KV0pe2ZvcihfMHgzMDgxMGI9MHgwLF8weDNlZWRhMD1fMHgxOWIyMmRbXzB4MmY2OGM1KDB4MTU5KV07XzB4MzA4MTBiPF8weDNlZWRhMDtfMHgzMDgxMGIrKylfMHgxOWIyMmRbXzB4MzA4MTBiXShfMHgzMDgxMGIpO31fMHgxOTFiNjVbXzB4MmY2OGM1KDB4MTU5KV0mJihfMHg1NDhhODhbJ3Byb3BzJ109XzB4MTkxYjY1KTt9Y2F0Y2goXzB4MWQ1MWE1KXtfMHg0OTIzNmEoXzB4MWQ1MWE1LF8weDU0OGE4OCxfMHgzY2IwOGEpO31yZXR1cm4gdGhpc1tfMHgyZjY4YzUoMHgxZGQpXShfMHg4ZDY0NTEsXzB4NTQ4YTg4KSx0aGlzW18weDJmNjhjNSgweDFkYildKF8weDU0OGE4OCxfMHgzY2IwOGEpLF8weDNjYjA4YVtfMHgyZjY4YzUoMHgxYTUpXVtfMHgyZjY4YzUoMHgxMWYpXT1fMHg1MTFjYTEsXzB4M2NiMDhhW18weDJmNjhjNSgweDFlYSldLS0sXzB4M2NiMDhhWydhdXRvRXhwYW5kJ109XzB4NGJmOTIxLF8weDNjYjA4YVtfMHgyZjY4YzUoMHgxNTMpXSYmXzB4M2NiMDhhW18weDJmNjhjNSgweDFiNSldW18weDJmNjhjNSgweDFkNildKCksXzB4NTQ4YTg4O31bJ19nZXRPd25Qcm9wZXJ0eVN5bWJvbHMnXShfMHgzZWI5Mjgpe3ZhciBfMHg4NWUxOGQ9XzB4MmVjYjczO3JldHVybiBPYmplY3RbXzB4ODVlMThkKDB4MTFjKV0/T2JqZWN0W18weDg1ZTE4ZCgweDExYyldKF8weDNlYjkyOCk6W107fVtfMHgyZWNiNzMoMHgxNmMpXShfMHhmZTA0OTgpe3ZhciBfMHg0YjBhYmY9XzB4MmVjYjczO3JldHVybiEhKF8weGZlMDQ5OCYmXzB4NTdiNDYzW18weDRiMGFiZigweDFkZildJiZ0aGlzW18weDRiMGFiZigweDEyMCldKF8weGZlMDQ5OCk9PT1fMHg0YjBhYmYoMHgxNTYpJiZfMHhmZTA0OThbXzB4NGIwYWJmKDB4MTJjKV0pO31bJ19ibGFja2xpc3RlZFByb3BlcnR5J10oXzB4MzNhMDFjLF8weDIyNTk3ZCxfMHg5ZmI1ZjEpe3ZhciBfMHgxOWNlNmQ9XzB4MmVjYjczO3JldHVybiBfMHg5ZmI1ZjFbXzB4MTljZTZkKDB4MTM0KV0/dHlwZW9mIF8weDMzYTAxY1tfMHgyMjU5N2RdPT1fMHgxOWNlNmQoMHgxYzkpOiEweDE7fVtfMHgyZWNiNzMoMHgxODQpXShfMHg0MGQ4N2Upe3ZhciBfMHg0ZmUyNjE9XzB4MmVjYjczLF8weDNmM2Q2ND0nJztyZXR1cm4gXzB4M2YzZDY0PXR5cGVvZiBfMHg0MGQ4N2UsXzB4M2YzZDY0PT09XzB4NGZlMjYxKDB4MTkxKT90aGlzW18weDRmZTI2MSgweDEyMCldKF8weDQwZDg3ZSk9PT1fMHg0ZmUyNjEoMHgxODEpP18weDNmM2Q2ND0nYXJyYXknOnRoaXNbXzB4NGZlMjYxKDB4MTIwKV0oXzB4NDBkODdlKT09PV8weDRmZTI2MSgweDFjOCk/XzB4M2YzZDY0PV8weDRmZTI2MSgweDFjNCk6dGhpc1tfMHg0ZmUyNjEoMHgxMjApXShfMHg0MGQ4N2UpPT09XzB4NGZlMjYxKDB4MTBkKT9fMHgzZjNkNjQ9XzB4NGZlMjYxKDB4MTIyKTpfMHg0MGQ4N2U9PT1udWxsP18weDNmM2Q2ND1fMHg0ZmUyNjEoMHgxNWQpOl8weDQwZDg3ZVtfMHg0ZmUyNjEoMHgxMTgpXSYmKF8weDNmM2Q2ND1fMHg0MGQ4N2VbXzB4NGZlMjYxKDB4MTE4KV1bXzB4NGZlMjYxKDB4MWQ0KV18fF8weDNmM2Q2NCk6XzB4M2YzZDY0PT09XzB4NGZlMjYxKDB4MTVmKSYmdGhpc1tfMHg0ZmUyNjEoMHgxNDgpXSYmXzB4NDBkODdlIGluc3RhbmNlb2YgdGhpc1tfMHg0ZmUyNjEoMHgxNDgpXSYmKF8weDNmM2Q2ND0nSFRNTEFsbENvbGxlY3Rpb24nKSxfMHgzZjNkNjQ7fVtfMHgyZWNiNzMoMHgxMjApXShfMHg1OGE5NmIpe3ZhciBfMHg0MmE2MDk9XzB4MmVjYjczO3JldHVybiBPYmplY3RbXzB4NDJhNjA5KDB4MTgyKV1bJ3RvU3RyaW5nJ11bJ2NhbGwnXShfMHg1OGE5NmIpO31bJ19pc1ByaW1pdGl2ZVR5cGUnXShfMHg5M2Y0Nzcpe3ZhciBfMHg1MTJiZjk9XzB4MmVjYjczO3JldHVybiBfMHg5M2Y0Nzc9PT1fMHg1MTJiZjkoMHgxNDMpfHxfMHg5M2Y0Nzc9PT1fMHg1MTJiZjkoMHgxZDcpfHxfMHg5M2Y0Nzc9PT1fMHg1MTJiZjkoMHgxMmEpO31bXzB4MmVjYjczKDB4MTc0KV0oXzB4NWEwZGIzKXt2YXIgXzB4NWE4ZWFjPV8weDJlY2I3MztyZXR1cm4gXzB4NWEwZGIzPT09J0Jvb2xlYW4nfHxfMHg1YTBkYjM9PT0nU3RyaW5nJ3x8XzB4NWEwZGIzPT09XzB4NWE4ZWFjKDB4MWUyKTt9W18weDJlY2I3MygweDE4NSldKF8weDRiY2Q1YixfMHg1ZWFhOGQsXzB4MTg3MzRlLF8weDQ1OWM3ZCxfMHgyY2JhZDUsXzB4NDI3ZWZkKXt2YXIgXzB4MjdiMDk0PXRoaXM7cmV0dXJuIGZ1bmN0aW9uKF8weDFkN2I0Mil7dmFyIF8weDE4NjU3Mj1fMHgxMzcyLF8weDQ5MGQzMD1fMHgyY2JhZDVbXzB4MTg2NTcyKDB4MWE1KV1bXzB4MTg2NTcyKDB4MTFmKV0sXzB4M2ExMDFkPV8weDJjYmFkNVtfMHgxODY1NzIoMHgxYTUpXVtfMHgxODY1NzIoMHgxNzYpXSxfMHgyNzU4ZDI9XzB4MmNiYWQ1Wydub2RlJ11bXzB4MTg2NTcyKDB4MWJkKV07XzB4MmNiYWQ1W18weDE4NjU3MigweDFhNSldW18weDE4NjU3MigweDFiZCldPV8weDQ5MGQzMCxfMHgyY2JhZDVbXzB4MTg2NTcyKDB4MWE1KV1bXzB4MTg2NTcyKDB4MTc2KV09dHlwZW9mIF8weDQ1OWM3ZD09J251bWJlcic/XzB4NDU5YzdkOl8weDFkN2I0MixfMHg0YmNkNWJbXzB4MTg2NTcyKDB4MWU0KV0oXzB4MjdiMDk0WydfcHJvcGVydHknXShfMHg1ZWFhOGQsXzB4MTg3MzRlLF8weDQ1OWM3ZCxfMHgyY2JhZDUsXzB4NDI3ZWZkKSksXzB4MmNiYWQ1W18weDE4NjU3MigweDFhNSldW18weDE4NjU3MigweDFiZCldPV8weDI3NThkMixfMHgyY2JhZDVbXzB4MTg2NTcyKDB4MWE1KV1bXzB4MTg2NTcyKDB4MTc2KV09XzB4M2ExMDFkO307fVtfMHgyZWNiNzMoMHgxNWEpXShfMHgzNmFlNjYsXzB4MWY4NmM2LF8weDQ4MjIyNyxfMHg0YmFiNTIsXzB4MTJhMmU5LF8weDQyZTU1YSxfMHg0YmE0MzYpe3ZhciBfMHgyNTkxMTc9XzB4MmVjYjczLF8weDZmOTk3NT10aGlzO3JldHVybiBfMHgxZjg2YzZbXzB4MjU5MTE3KDB4MWFmKStfMHgxMmEyZTlbXzB4MjU5MTE3KDB4MWExKV0oKV09ITB4MCxmdW5jdGlvbihfMHgxMjAzMTApe3ZhciBfMHgxZjVmN2Q9XzB4MjU5MTE3LF8weDQ0ZDM3OD1fMHg0MmU1NWFbXzB4MWY1ZjdkKDB4MWE1KV1bJ2N1cnJlbnQnXSxfMHgzZmZlZGI9XzB4NDJlNTVhW18weDFmNWY3ZCgweDFhNSldW18weDFmNWY3ZCgweDE3NildLF8weDE0NWU2ZD1fMHg0MmU1NWFbJ25vZGUnXVtfMHgxZjVmN2QoMHgxYmQpXTtfMHg0MmU1NWFbJ25vZGUnXVtfMHgxZjVmN2QoMHgxYmQpXT1fMHg0NGQzNzgsXzB4NDJlNTVhW18weDFmNWY3ZCgweDFhNSldW18weDFmNWY3ZCgweDE3NildPV8weDEyMDMxMCxfMHgzNmFlNjZbJ3B1c2gnXShfMHg2Zjk5NzVbXzB4MWY1ZjdkKDB4MTMzKV0oXzB4NDgyMjI3LF8weDRiYWI1MixfMHgxMmEyZTksXzB4NDJlNTVhLF8weDRiYTQzNikpLF8weDQyZTU1YVtfMHgxZjVmN2QoMHgxYTUpXVtfMHgxZjVmN2QoMHgxYmQpXT1fMHgxNDVlNmQsXzB4NDJlNTVhW18weDFmNWY3ZCgweDFhNSldW18weDFmNWY3ZCgweDE3NildPV8weDNmZmVkYjt9O31bXzB4MmVjYjczKDB4MTMzKV0oXzB4MWFkMWQzLF8weDVjYWZlMixfMHgzNzdlYzgsXzB4NDQ2MzBkLF8weDVjNzg2Myl7dmFyIF8weDMwZTU5Nz1fMHgyZWNiNzMsXzB4ODRiMTQ5PXRoaXM7XzB4NWM3ODYzfHwoXzB4NWM3ODYzPWZ1bmN0aW9uKF8weDM0YzEzZCxfMHg1MTgxOTIpe3JldHVybiBfMHgzNGMxM2RbXzB4NTE4MTkyXTt9KTt2YXIgXzB4MzdkZTFiPV8weDM3N2VjOFtfMHgzMGU1OTcoMHgxYTEpXSgpLF8weDU4YzlmMz1fMHg0NDYzMGRbXzB4MzBlNTk3KDB4MTA5KV18fHt9LF8weDIwOWViOD1fMHg0NDYzMGRbXzB4MzBlNTk3KDB4MThhKV0sXzB4MjY4NmY3PV8weDQ0NjMwZFtfMHgzMGU1OTcoMHgxMjcpXTt0cnl7dmFyIF8weDQwNTUyZj10aGlzW18weDMwZTU5NygweDFkYyldKF8weDFhZDFkMyksXzB4MTQ4YWU0PV8weDM3ZGUxYjtfMHg0MDU1MmYmJl8weDE0OGFlNFsweDBdPT09J1xcXFx4MjcnJiYoXzB4MTQ4YWU0PV8weDE0OGFlNFsnc3Vic3RyJ10oMHgxLF8weDE0OGFlNFsnbGVuZ3RoJ10tMHgyKSk7dmFyIF8weDE4MWRkYz1fMHg0NDYzMGRbXzB4MzBlNTk3KDB4MTA5KV09XzB4NThjOWYzWydfcF8nK18weDE0OGFlNF07XzB4MTgxZGRjJiYoXzB4NDQ2MzBkW18weDMwZTU5NygweDE4YSldPV8weDQ0NjMwZFtfMHgzMGU1OTcoMHgxOGEpXSsweDEpLF8weDQ0NjMwZFtfMHgzMGU1OTcoMHgxMjcpXT0hIV8weDE4MWRkYzt2YXIgXzB4NDQwYWVmPXR5cGVvZiBfMHgzNzdlYzg9PSdzeW1ib2wnLF8weGFhYzgwZj17J25hbWUnOl8weDQ0MGFlZnx8XzB4NDA1NTJmP18weDM3ZGUxYjp0aGlzWydfcHJvcGVydHlOYW1lJ10oXzB4MzdkZTFiKX07aWYoXzB4NDQwYWVmJiYoXzB4YWFjODBmW18weDMwZTU5NygweDE2NCldPSEweDApLCEoXzB4NWNhZmUyPT09XzB4MzBlNTk3KDB4MTYyKXx8XzB4NWNhZmUyPT09XzB4MzBlNTk3KDB4MWQzKSkpe3ZhciBfMHg1MDM1YzU9dGhpc1tfMHgzMGU1OTcoMHgxOGIpXShfMHgxYWQxZDMsXzB4Mzc3ZWM4KTtpZihfMHg1MDM1YzUmJihfMHg1MDM1YzVbXzB4MzBlNTk3KDB4MTdhKV0mJihfMHhhYWM4MGZbXzB4MzBlNTk3KDB4MTY2KV09ITB4MCksXzB4NTAzNWM1WydnZXQnXSYmIV8weDE4MWRkYyYmIV8weDQ0NjMwZFtfMHgzMGU1OTcoMHgxN2IpXSkpcmV0dXJuIF8weGFhYzgwZltfMHgzMGU1OTcoMHgxMjMpXT0hMHgwLHRoaXNbXzB4MzBlNTk3KDB4MTI2KV0oXzB4YWFjODBmLF8weDQ0NjMwZCksXzB4YWFjODBmO312YXIgXzB4NDlmODUxO3RyeXtfMHg0OWY4NTE9XzB4NWM3ODYzKF8weDFhZDFkMyxfMHgzNzdlYzgpO31jYXRjaChfMHg0ZGE3Y2Ype3JldHVybiBfMHhhYWM4MGY9eyduYW1lJzpfMHgzN2RlMWIsJ3R5cGUnOl8weDMwZTU5NygweDFlOCksJ2Vycm9yJzpfMHg0ZGE3Y2ZbXzB4MzBlNTk3KDB4MTg5KV19LHRoaXNbXzB4MzBlNTk3KDB4MTI2KV0oXzB4YWFjODBmLF8weDQ0NjMwZCksXzB4YWFjODBmO312YXIgXzB4Mjk4MTBmPXRoaXNbXzB4MzBlNTk3KDB4MTg0KV0oXzB4NDlmODUxKSxfMHg0OGI3MzM9dGhpc1tfMHgzMGU1OTcoMHgxOWIpXShfMHgyOTgxMGYpO2lmKF8weGFhYzgwZltfMHgzMGU1OTcoMHgxNGEpXT1fMHgyOTgxMGYsXzB4NDhiNzMzKXRoaXNbJ19wcm9jZXNzVHJlZU5vZGVSZXN1bHQnXShfMHhhYWM4MGYsXzB4NDQ2MzBkLF8weDQ5Zjg1MSxmdW5jdGlvbigpe3ZhciBfMHgzYTk1NWY9XzB4MzBlNTk3O18weGFhYzgwZltfMHgzYTk1NWYoMHgxYTIpXT1fMHg0OWY4NTFbXzB4M2E5NTVmKDB4MWMyKV0oKSwhXzB4MTgxZGRjJiZfMHg4NGIxNDlbXzB4M2E5NTVmKDB4MWI5KV0oXzB4Mjk4MTBmLF8weGFhYzgwZixfMHg0NDYzMGQse30pO30pO2Vsc2V7dmFyIF8weDQ5MWYwMT1fMHg0NDYzMGRbJ2F1dG9FeHBhbmQnXSYmXzB4NDQ2MzBkWydsZXZlbCddPF8weDQ0NjMwZFtfMHgzMGU1OTcoMHgxOTkpXSYmXzB4NDQ2MzBkWydhdXRvRXhwYW5kUHJldmlvdXNPYmplY3RzJ11bXzB4MzBlNTk3KDB4MTk3KV0oXzB4NDlmODUxKTwweDAmJl8weDI5ODEwZiE9PV8weDMwZTU5NygweDFjOSkmJl8weDQ0NjMwZFtfMHgzMGU1OTcoMHgxMzYpXTxfMHg0NDYzMGRbXzB4MzBlNTk3KDB4MTM3KV07XzB4NDkxZjAxfHxfMHg0NDYzMGRbXzB4MzBlNTk3KDB4MWVhKV08XzB4MjA5ZWI4fHxfMHgxODFkZGM/KHRoaXNbXzB4MzBlNTk3KDB4MTM1KV0oXzB4YWFjODBmLF8weDQ5Zjg1MSxfMHg0NDYzMGQsXzB4MTgxZGRjfHx7fSksdGhpc1tfMHgzMGU1OTcoMHgxZGQpXShfMHg0OWY4NTEsXzB4YWFjODBmKSk6dGhpc1tfMHgzMGU1OTcoMHgxMjYpXShfMHhhYWM4MGYsXzB4NDQ2MzBkLF8weDQ5Zjg1MSxmdW5jdGlvbigpe3ZhciBfMHg1MGU5NzI9XzB4MzBlNTk3O18weDI5ODEwZj09PV8weDUwZTk3MigweDE1ZCl8fF8weDI5ODEwZj09PV8weDUwZTk3MigweDE1Zil8fChkZWxldGUgXzB4YWFjODBmWyd2YWx1ZSddLF8weGFhYzgwZltfMHg1MGU5NzIoMHgxMGIpXT0hMHgwKTt9KTt9cmV0dXJuIF8weGFhYzgwZjt9ZmluYWxseXtfMHg0NDYzMGRbXzB4MzBlNTk3KDB4MTA5KV09XzB4NThjOWYzLF8weDQ0NjMwZFtfMHgzMGU1OTcoMHgxOGEpXT1fMHgyMDllYjgsXzB4NDQ2MzBkWydpc0V4cHJlc3Npb25Ub0V2YWx1YXRlJ109XzB4MjY4NmY3O319WydfY2FwSWZTdHJpbmcnXShfMHgyYTM3MDgsXzB4MWRjM2ZhLF8weDI4MWI4NyxfMHgzYWQ4YTQpe3ZhciBfMHg1YjY5MzA9XzB4MmVjYjczLF8weDEwOWQ0Yj1fMHgzYWQ4YTRbXzB4NWI2OTMwKDB4MTlkKV18fF8weDI4MWI4N1tfMHg1YjY5MzAoMHgxOWQpXTtpZigoXzB4MmEzNzA4PT09J3N0cmluZyd8fF8weDJhMzcwOD09PSdTdHJpbmcnKSYmXzB4MWRjM2ZhWyd2YWx1ZSddKXtsZXQgXzB4NGQ1ZTYxPV8weDFkYzNmYVtfMHg1YjY5MzAoMHgxYTIpXVtfMHg1YjY5MzAoMHgxNTkpXTtfMHgyODFiODdbXzB4NWI2OTMwKDB4MTRmKV0rPV8weDRkNWU2MSxfMHgyODFiODdbJ2FsbFN0ckxlbmd0aCddPl8weDI4MWI4N1tfMHg1YjY5MzAoMHgxOTApXT8oXzB4MWRjM2ZhW18weDViNjkzMCgweDEwYildPScnLGRlbGV0ZSBfMHgxZGMzZmFbJ3ZhbHVlJ10pOl8weDRkNWU2MT5fMHgxMDlkNGImJihfMHgxZGMzZmFbXzB4NWI2OTMwKDB4MTBiKV09XzB4MWRjM2ZhW18weDViNjkzMCgweDFhMildW18weDViNjkzMCgweDExZCldKDB4MCxfMHgxMDlkNGIpLGRlbGV0ZSBfMHgxZGMzZmFbJ3ZhbHVlJ10pO319W18weDJlY2I3MygweDFkYyldKF8weDFkNzVjMyl7dmFyIF8weDI5Y2QwMz1fMHgyZWNiNzM7cmV0dXJuISEoXzB4MWQ3NWMzJiZfMHg1N2I0NjNbXzB4MjljZDAzKDB4MTI1KV0mJnRoaXNbXzB4MjljZDAzKDB4MTIwKV0oXzB4MWQ3NWMzKT09PV8weDI5Y2QwMygweDE3MikmJl8weDFkNzVjM1snZm9yRWFjaCddKTt9W18weDJlY2I3MygweDE1MildKF8weDMxZjQ0KXt2YXIgXzB4MzdmOWIzPV8weDJlY2I3MztpZihfMHgzMWY0NFtfMHgzN2Y5YjMoMHgxODMpXSgvXlxcXFxkKyQvKSlyZXR1cm4gXzB4MzFmNDQ7dmFyIF8weDMxNTI5Zjt0cnl7XzB4MzE1MjlmPUpTT05bJ3N0cmluZ2lmeSddKCcnK18weDMxZjQ0KTt9Y2F0Y2h7XzB4MzE1MjlmPSdcXFxceDIyJyt0aGlzWydfb2JqZWN0VG9TdHJpbmcnXShfMHgzMWY0NCkrJ1xcXFx4MjInO31yZXR1cm4gXzB4MzE1MjlmWydtYXRjaCddKC9eXFxcIihbYS16QS1aX11bYS16QS1aXzAtOV0qKVxcXCIkLyk/XzB4MzE1MjlmPV8weDMxNTI5Zlsnc3Vic3RyJ10oMHgxLF8weDMxNTI5ZltfMHgzN2Y5YjMoMHgxNTkpXS0weDIpOl8weDMxNTI5Zj1fMHgzMTUyOWZbJ3JlcGxhY2UnXSgvJy9nLCdcXFxceDVjXFxcXHgyNycpW18weDM3ZjliMygweDFiZildKC9cXFxcXFxcXFxcXCIvZywnXFxcXHgyMicpW18weDM3ZjliMygweDFiZildKC8oXlxcXCJ8XFxcIiQpL2csJ1xcXFx4MjcnKSxfMHgzMTUyOWY7fVtfMHgyZWNiNzMoMHgxMjYpXShfMHgxMzhjMGMsXzB4MTI1YzUxLF8weDM2MmRmNyxfMHg0NTkwYzQpe3ZhciBfMHgxMTJjZDg9XzB4MmVjYjczO3RoaXNbXzB4MTEyY2Q4KDB4MTlmKV0oXzB4MTM4YzBjLF8weDEyNWM1MSksXzB4NDU5MGM0JiZfMHg0NTkwYzQoKSx0aGlzW18weDExMmNkOCgweDFkZCldKF8weDM2MmRmNyxfMHgxMzhjMGMpLHRoaXNbXzB4MTEyY2Q4KDB4MWRiKV0oXzB4MTM4YzBjLF8weDEyNWM1MSk7fVtfMHgyZWNiNzMoMHgxOWYpXShfMHgxNTBlNDMsXzB4MzJhNjU0KXt2YXIgXzB4NDQ4YjdjPV8weDJlY2I3Mzt0aGlzWydfc2V0Tm9kZUlkJ10oXzB4MTUwZTQzLF8weDMyYTY1NCksdGhpc1tfMHg0NDhiN2MoMHgxMmIpXShfMHgxNTBlNDMsXzB4MzJhNjU0KSx0aGlzWydfc2V0Tm9kZUV4cHJlc3Npb25QYXRoJ10oXzB4MTUwZTQzLF8weDMyYTY1NCksdGhpc1tfMHg0NDhiN2MoMHgxMWEpXShfMHgxNTBlNDMsXzB4MzJhNjU0KTt9W18weDJlY2I3MygweDE2ZildKF8weDQ3ZDU1ZSxfMHg3ZmFlNTMpe31bJ19zZXROb2RlUXVlcnlQYXRoJ10oXzB4MmUwM2VmLF8weDUzMjlkYSl7fVtfMHgyZWNiNzMoMHgxMGUpXShfMHgyNmIxYzksXzB4MzJhNWRmKXt9W18weDJlY2I3MygweDFhZCldKF8weDUxYjUwMCl7dmFyIF8weDJlZTcyYT1fMHgyZWNiNzM7cmV0dXJuIF8weDUxYjUwMD09PXRoaXNbXzB4MmVlNzJhKDB4MTE1KV07fVtfMHgyZWNiNzMoMHgxZGIpXShfMHg0OGRkMjksXzB4MjlmZDE3KXt2YXIgXzB4MmI0NWQ0PV8weDJlY2I3Mzt0aGlzW18weDJiNDVkNCgweDEwZSldKF8weDQ4ZGQyOSxfMHgyOWZkMTcpLHRoaXNbXzB4MmI0NWQ0KDB4MTNlKV0oXzB4NDhkZDI5KSxfMHgyOWZkMTdbJ3NvcnRQcm9wcyddJiZ0aGlzW18weDJiNDVkNCgweDFlMCldKF8weDQ4ZGQyOSksdGhpc1snX2FkZEZ1bmN0aW9uc05vZGUnXShfMHg0OGRkMjksXzB4MjlmZDE3KSx0aGlzWydfYWRkTG9hZE5vZGUnXShfMHg0OGRkMjksXzB4MjlmZDE3KSx0aGlzW18weDJiNDVkNCgweDExMildKF8weDQ4ZGQyOSk7fVsnX2FkZGl0aW9uYWxNZXRhZGF0YSddKF8weDEwNDE5ZixfMHgxNWM1YjUpe3ZhciBfMHgyMDExMmM9XzB4MmVjYjczO3RyeXtfMHgxMDQxOWYmJnR5cGVvZiBfMHgxMDQxOWZbXzB4MjAxMTJjKDB4MTU5KV09PV8weDIwMTEyYygweDEyYSkmJihfMHgxNWM1YjVbXzB4MjAxMTJjKDB4MTU5KV09XzB4MTA0MTlmW18weDIwMTEyYygweDE1OSldKTt9Y2F0Y2h7fWlmKF8weDE1YzViNVtfMHgyMDExMmMoMHgxNGEpXT09PV8weDIwMTEyYygweDEyYSl8fF8weDE1YzViNVsndHlwZSddPT09J051bWJlcicpe2lmKGlzTmFOKF8weDE1YzViNVtfMHgyMDExMmMoMHgxYTIpXSkpXzB4MTVjNWI1WyduYW4nXT0hMHgwLGRlbGV0ZSBfMHgxNWM1YjVbXzB4MjAxMTJjKDB4MWEyKV07ZWxzZSBzd2l0Y2goXzB4MTVjNWI1W18weDIwMTEyYygweDFhMildKXtjYXNlIE51bWJlcltfMHgyMDExMmMoMHgxYmEpXTpfMHgxNWM1YjVbXzB4MjAxMTJjKDB4MWUxKV09ITB4MCxkZWxldGUgXzB4MTVjNWI1W18weDIwMTEyYygweDFhMildO2JyZWFrO2Nhc2UgTnVtYmVyW18weDIwMTEyYygweDFhYSldOl8weDE1YzViNVtfMHgyMDExMmMoMHgxN2UpXT0hMHgwLGRlbGV0ZSBfMHgxNWM1YjVbXzB4MjAxMTJjKDB4MWEyKV07YnJlYWs7Y2FzZSAweDA6dGhpc1tfMHgyMDExMmMoMHgxNzEpXShfMHgxNWM1YjVbJ3ZhbHVlJ10pJiYoXzB4MTVjNWI1WyduZWdhdGl2ZVplcm8nXT0hMHgwKTticmVhazt9fWVsc2UgXzB4MTVjNWI1W18weDIwMTEyYygweDE0YSldPT09XzB4MjAxMTJjKDB4MWM5KSYmdHlwZW9mIF8weDEwNDE5ZltfMHgyMDExMmMoMHgxZDQpXT09XzB4MjAxMTJjKDB4MWQ3KSYmXzB4MTA0MTlmW18weDIwMTEyYygweDFkNCldJiZfMHgxNWM1YjVbXzB4MjAxMTJjKDB4MWQ0KV0mJl8weDEwNDE5ZltfMHgyMDExMmMoMHgxZDQpXSE9PV8weDE1YzViNVsnbmFtZSddJiYoXzB4MTVjNWI1W18weDIwMTEyYygweDE2YSldPV8weDEwNDE5ZltfMHgyMDExMmMoMHgxZDQpXSk7fVtfMHgyZWNiNzMoMHgxNzEpXShfMHg0ZjBjZTIpe3ZhciBfMHg0ZDVjYTg9XzB4MmVjYjczO3JldHVybiAweDEvXzB4NGYwY2UyPT09TnVtYmVyW18weDRkNWNhOCgweDFhYSldO31bXzB4MmVjYjczKDB4MWUwKV0oXzB4MzhiZjhmKXt2YXIgXzB4NTA5ZjBjPV8weDJlY2I3MzshXzB4MzhiZjhmW18weDUwOWYwYygweDFhMCldfHwhXzB4MzhiZjhmW18weDUwOWYwYygweDFhMCldW18weDUwOWYwYygweDE1OSldfHxfMHgzOGJmOGZbXzB4NTA5ZjBjKDB4MTRhKV09PT1fMHg1MDlmMGMoMHgxNjIpfHxfMHgzOGJmOGZbJ3R5cGUnXT09PV8weDUwOWYwYygweDEyNSl8fF8weDM4YmY4ZltfMHg1MDlmMGMoMHgxNGEpXT09PV8weDUwOWYwYygweDFkZil8fF8weDM4YmY4ZlsncHJvcHMnXVtfMHg1MDlmMGMoMHgxNjUpXShmdW5jdGlvbihfMHgzNWUxZTEsXzB4ZTcyYmZkKXt2YXIgXzB4NDgwMTRkPV8weDUwOWYwYyxfMHg0NzhlZmQ9XzB4MzVlMWUxWyduYW1lJ11bXzB4NDgwMTRkKDB4MTQwKV0oKSxfMHg1ODEwOTA9XzB4ZTcyYmZkW18weDQ4MDE0ZCgweDFkNCldW18weDQ4MDE0ZCgweDE0MCldKCk7cmV0dXJuIF8weDQ3OGVmZDxfMHg1ODEwOTA/LTB4MTpfMHg0NzhlZmQ+XzB4NTgxMDkwPzB4MToweDA7fSk7fVsnX2FkZEZ1bmN0aW9uc05vZGUnXShfMHhlNDg4ZmMsXzB4Mzk0ZGEzKXt2YXIgXzB4NWNhNWE4PV8weDJlY2I3MztpZighKF8weDM5NGRhM1tfMHg1Y2E1YTgoMHgxMzQpXXx8IV8weGU0ODhmY1tfMHg1Y2E1YTgoMHgxYTApXXx8IV8weGU0ODhmY1sncHJvcHMnXVsnbGVuZ3RoJ10pKXtmb3IodmFyIF8weDViZDk4ZT1bXSxfMHgxNTZjMDY9W10sXzB4M2Q0MDhjPTB4MCxfMHg1MDFmYjA9XzB4ZTQ4OGZjW18weDVjYTVhOCgweDFhMCldW18weDVjYTVhOCgweDE1OSldO18weDNkNDA4YzxfMHg1MDFmYjA7XzB4M2Q0MDhjKyspe3ZhciBfMHgzNmFiMDU9XzB4ZTQ4OGZjW18weDVjYTVhOCgweDFhMCldW18weDNkNDA4Y107XzB4MzZhYjA1W18weDVjYTVhOCgweDE0YSldPT09XzB4NWNhNWE4KDB4MWM5KT9fMHg1YmQ5OGVbXzB4NWNhNWE4KDB4MWU0KV0oXzB4MzZhYjA1KTpfMHgxNTZjMDZbXzB4NWNhNWE4KDB4MWU0KV0oXzB4MzZhYjA1KTt9aWYoISghXzB4MTU2YzA2W18weDVjYTVhOCgweDE1OSldfHxfMHg1YmQ5OGVbJ2xlbmd0aCddPD0weDEpKXtfMHhlNDg4ZmNbXzB4NWNhNWE4KDB4MWEwKV09XzB4MTU2YzA2O3ZhciBfMHgzYWFkZWI9eydmdW5jdGlvbnNOb2RlJzohMHgwLCdwcm9wcyc6XzB4NWJkOThlfTt0aGlzWydfc2V0Tm9kZUlkJ10oXzB4M2FhZGViLF8weDM5NGRhMyksdGhpc1snX3NldE5vZGVMYWJlbCddKF8weDNhYWRlYixfMHgzOTRkYTMpLHRoaXNbXzB4NWNhNWE4KDB4MTNlKV0oXzB4M2FhZGViKSx0aGlzW18weDVjYTVhOCgweDExYSldKF8weDNhYWRlYixfMHgzOTRkYTMpLF8weDNhYWRlYlsnaWQnXSs9J1xcXFx4MjBmJyxfMHhlNDg4ZmNbXzB4NWNhNWE4KDB4MWEwKV1bXzB4NWNhNWE4KDB4MTI0KV0oXzB4M2FhZGViKTt9fX1bXzB4MmVjYjczKDB4MTFlKV0oXzB4MTkwYmEwLF8weDIxNjBhYSl7fVsnX3NldE5vZGVFeHBhbmRhYmxlU3RhdGUnXShfMHg0MTg4ZjApe31bXzB4MmVjYjczKDB4MTNjKV0oXzB4M2JjZjM2KXt2YXIgXzB4NmQ3NTkyPV8weDJlY2I3MztyZXR1cm4gQXJyYXlbJ2lzQXJyYXknXShfMHgzYmNmMzYpfHx0eXBlb2YgXzB4M2JjZjM2PT0nb2JqZWN0JyYmdGhpc1tfMHg2ZDc1OTIoMHgxMjApXShfMHgzYmNmMzYpPT09XzB4NmQ3NTkyKDB4MTgxKTt9W18weDJlY2I3MygweDExYSldKF8weDEyNzE1OCxfMHgyYjhkYzcpe31bXzB4MmVjYjczKDB4MTEyKV0oXzB4MzBhYjEzKXt2YXIgXzB4MWI5OTlhPV8weDJlY2I3MztkZWxldGUgXzB4MzBhYjEzW18weDFiOTk5YSgweDFjZCldLGRlbGV0ZSBfMHgzMGFiMTNbXzB4MWI5OTlhKDB4MWE4KV0sZGVsZXRlIF8weDMwYWIxM1tfMHgxYjk5OWEoMHgxMTMpXTt9W18weDJlY2I3MygweDEzZildKF8weDViZDI2ZCxfMHgxNDViYTQpe31bXzB4MmVjYjczKDB4MWI2KV0oXzB4Mjk1YmFhKXt2YXIgXzB4NWFhYjQ1PV8weDJlY2I3MztyZXR1cm4gXzB4Mjk1YmFhP18weDI5NWJhYVsnbWF0Y2gnXSh0aGlzWydfbnVtYmVyUmVnRXhwJ10pPydbJytfMHgyOTViYWErJ10nOl8weDI5NWJhYVtfMHg1YWFiNDUoMHgxODMpXSh0aGlzW18weDVhYWI0NSgweDExNildKT8nLicrXzB4Mjk1YmFhOl8weDI5NWJhYVtfMHg1YWFiNDUoMHgxODMpXSh0aGlzW18weDVhYWI0NSgweDE3MyldKT8nWycrXzB4Mjk1YmFhKyddJzonW1xcXFx4MjcnK18weDI5NWJhYSsnXFxcXHgyN10nOicnO319bGV0IF8weDRkYzFkYz1uZXcgXzB4ZDk2ZDY5KCk7ZnVuY3Rpb24gXzB4NDFmN2ZiKF8weDFhNThhYyxfMHgzY2Q5MDQsXzB4NWEzNjJiLF8weDNkNmViZCxfMHg1YmUzODUsXzB4MmE2ZjFlKXt2YXIgXzB4NDZkYzRjPV8weDJlY2I3MztsZXQgXzB4MWUzYTcyLF8weDI5MTZmYTt0cnl7XzB4MjkxNmZhPV8weDRhYzc2NygpLF8weDFlM2E3Mj1fMHgxNzdmZDFbXzB4M2NkOTA0XSwhXzB4MWUzYTcyfHxfMHgyOTE2ZmEtXzB4MWUzYTcyWyd0cyddPjB4MWY0JiZfMHgxZTNhNzJbXzB4NDZkYzRjKDB4MTllKV0mJl8weDFlM2E3MltfMHg0NmRjNGMoMHgxMzkpXS9fMHgxZTNhNzJbJ2NvdW50J108MHg2ND8oXzB4MTc3ZmQxW18weDNjZDkwNF09XzB4MWUzYTcyPXsnY291bnQnOjB4MCwndGltZSc6MHgwLCd0cyc6XzB4MjkxNmZhfSxfMHgxNzdmZDFbXzB4NDZkYzRjKDB4MTc1KV09e30pOl8weDI5MTZmYS1fMHgxNzdmZDFbXzB4NDZkYzRjKDB4MTc1KV1bJ3RzJ10+MHgzMiYmXzB4MTc3ZmQxWydoaXRzJ11bXzB4NDZkYzRjKDB4MTllKV0mJl8weDE3N2ZkMVtfMHg0NmRjNGMoMHgxNzUpXVtfMHg0NmRjNGMoMHgxMzkpXS9fMHgxNzdmZDFbXzB4NDZkYzRjKDB4MTc1KV1bXzB4NDZkYzRjKDB4MTllKV08MHg2NCYmKF8weDE3N2ZkMVtfMHg0NmRjNGMoMHgxNzUpXT17fSk7bGV0IF8weGRjMjYxMz1bXSxfMHgxZDQ5NTk9XzB4MWUzYTcyWydyZWR1Y2VMaW1pdHMnXXx8XzB4MTc3ZmQxW18weDQ2ZGM0YygweDE3NSldWydyZWR1Y2VMaW1pdHMnXT9fMHgzNjdjODA6XzB4NWY0Mjg3LF8weDI0ZjQzMD1fMHg0NTlkN2M9Pnt2YXIgXzB4NDg2ZTczPV8weDQ2ZGM0YztsZXQgXzB4NGNkZDc3PXt9O3JldHVybiBfMHg0Y2RkNzdbXzB4NDg2ZTczKDB4MWEwKV09XzB4NDU5ZDdjW18weDQ4NmU3MygweDFhMCldLF8weDRjZGQ3N1snZWxlbWVudHMnXT1fMHg0NTlkN2NbJ2VsZW1lbnRzJ10sXzB4NGNkZDc3WydzdHJMZW5ndGgnXT1fMHg0NTlkN2NbXzB4NDg2ZTczKDB4MTlkKV0sXzB4NGNkZDc3W18weDQ4NmU3MygweDE5MCldPV8weDQ1OWQ3Y1tfMHg0ODZlNzMoMHgxOTApXSxfMHg0Y2RkNzdbXzB4NDg2ZTczKDB4MTM3KV09XzB4NDU5ZDdjW18weDQ4NmU3MygweDEzNyldLF8weDRjZGQ3N1snYXV0b0V4cGFuZE1heERlcHRoJ109XzB4NDU5ZDdjW18weDQ4NmU3MygweDE5OSldLF8weDRjZGQ3N1tfMHg0ODZlNzMoMHgxNzcpXT0hMHgxLF8weDRjZGQ3N1tfMHg0ODZlNzMoMHgxMzQpXT0hXzB4MWJkOTc1LF8weDRjZGQ3N1snZGVwdGgnXT0weDEsXzB4NGNkZDc3WydsZXZlbCddPTB4MCxfMHg0Y2RkNzdbJ2V4cElkJ109J3Jvb3RfZXhwX2lkJyxfMHg0Y2RkNzdbXzB4NDg2ZTczKDB4MTI4KV09XzB4NDg2ZTczKDB4MTUwKSxfMHg0Y2RkNzdbJ2F1dG9FeHBhbmQnXT0hMHgwLF8weDRjZGQ3N1tfMHg0ODZlNzMoMHgxYjUpXT1bXSxfMHg0Y2RkNzdbXzB4NDg2ZTczKDB4MTM2KV09MHgwLF8weDRjZGQ3N1tfMHg0ODZlNzMoMHgxN2IpXT0hMHgwLF8weDRjZGQ3N1tfMHg0ODZlNzMoMHgxNGYpXT0weDAsXzB4NGNkZDc3W18weDQ4NmU3MygweDFhNSldPXsnY3VycmVudCc6dm9pZCAweDAsJ3BhcmVudCc6dm9pZCAweDAsJ2luZGV4JzoweDB9LF8weDRjZGQ3Nzt9O2Zvcih2YXIgXzB4MjhiZTlkPTB4MDtfMHgyOGJlOWQ8XzB4NWJlMzg1W18weDQ2ZGM0YygweDE1OSldO18weDI4YmU5ZCsrKV8weGRjMjYxM1tfMHg0NmRjNGMoMHgxZTQpXShfMHg0ZGMxZGNbXzB4NDZkYzRjKDB4MTM1KV0oeyd0aW1lTm9kZSc6XzB4MWE1OGFjPT09XzB4NDZkYzRjKDB4MTM5KXx8dm9pZCAweDB9LF8weDViZTM4NVtfMHgyOGJlOWRdLF8weDI0ZjQzMChfMHgxZDQ5NTkpLHt9KSk7aWYoXzB4MWE1OGFjPT09XzB4NDZkYzRjKDB4MTg2KSl7bGV0IF8weDVmMWMwYz1FcnJvcltfMHg0NmRjNGMoMHgxMGMpXTt0cnl7RXJyb3JbXzB4NDZkYzRjKDB4MTBjKV09MHgxLzB4MCxfMHhkYzI2MTNbXzB4NDZkYzRjKDB4MWU0KV0oXzB4NGRjMWRjW18weDQ2ZGM0YygweDEzNSldKHsnc3RhY2tOb2RlJzohMHgwfSxuZXcgRXJyb3IoKVsnc3RhY2snXSxfMHgyNGY0MzAoXzB4MWQ0OTU5KSx7J3N0ckxlbmd0aCc6MHgxLzB4MH0pKTt9ZmluYWxseXtFcnJvcltfMHg0NmRjNGMoMHgxMGMpXT1fMHg1ZjFjMGM7fX1yZXR1cm57J21ldGhvZCc6XzB4NDZkYzRjKDB4MWIzKSwndmVyc2lvbic6XzB4MWIwYzFjLCdhcmdzJzpbeyd0cyc6XzB4NWEzNjJiLCdzZXNzaW9uJzpfMHgzZDZlYmQsJ2FyZ3MnOl8weGRjMjYxMywnaWQnOl8weDNjZDkwNCwnY29udGV4dCc6XzB4MmE2ZjFlfV19O31jYXRjaChfMHgyNTRhNmQpe3JldHVybnsnbWV0aG9kJzpfMHg0NmRjNGMoMHgxYjMpLCd2ZXJzaW9uJzpfMHgxYjBjMWMsJ2FyZ3MnOlt7J3RzJzpfMHg1YTM2MmIsJ3Nlc3Npb24nOl8weDNkNmViZCwnYXJncyc6W3sndHlwZSc6J3Vua25vd24nLCdlcnJvcic6XzB4MjU0YTZkJiZfMHgyNTRhNmRbXzB4NDZkYzRjKDB4MTg5KV19XSwnaWQnOl8weDNjZDkwNCwnY29udGV4dCc6XzB4MmE2ZjFlfV19O31maW5hbGx5e3RyeXtpZihfMHgxZTNhNzImJl8weDI5MTZmYSl7bGV0IF8weDVhZjg5Yj1fMHg0YWM3NjcoKTtfMHgxZTNhNzJbXzB4NDZkYzRjKDB4MTllKV0rKyxfMHgxZTNhNzJbXzB4NDZkYzRjKDB4MTM5KV0rPV8weDU3ODdjZChfMHgyOTE2ZmEsXzB4NWFmODliKSxfMHgxZTNhNzJbJ3RzJ109XzB4NWFmODliLF8weDE3N2ZkMVtfMHg0NmRjNGMoMHgxNzUpXVtfMHg0NmRjNGMoMHgxOWUpXSsrLF8weDE3N2ZkMVtfMHg0NmRjNGMoMHgxNzUpXVtfMHg0NmRjNGMoMHgxMzkpXSs9XzB4NTc4N2NkKF8weDI5MTZmYSxfMHg1YWY4OWIpLF8weDE3N2ZkMVtfMHg0NmRjNGMoMHgxNzUpXVsndHMnXT1fMHg1YWY4OWIsKF8weDFlM2E3MltfMHg0NmRjNGMoMHgxOWUpXT4weDMyfHxfMHgxZTNhNzJbJ3RpbWUnXT4weDY0KSYmKF8weDFlM2E3MltfMHg0NmRjNGMoMHgxNzApXT0hMHgwKSwoXzB4MTc3ZmQxW18weDQ2ZGM0YygweDE3NSldWydjb3VudCddPjB4M2U4fHxfMHgxNzdmZDFbJ2hpdHMnXVtfMHg0NmRjNGMoMHgxMzkpXT4weDEyYykmJihfMHgxNzdmZDFbXzB4NDZkYzRjKDB4MTc1KV1bXzB4NDZkYzRjKDB4MTcwKV09ITB4MCk7fX1jYXRjaHt9fX1yZXR1cm4gXzB4NTdiNDYzWydfY29uc29sZV9uaW5qYSddO30pKGdsb2JhbFRoaXMsXzB4MjhkNjY1KDB4MTQ3KSxfMHgyOGQ2NjUoMHgxY2IpLF8weDI4ZDY2NSgweDFhOSksXzB4MjhkNjY1KDB4MTg3KSxfMHgyOGQ2NjUoMHgxMGYpLF8weDI4ZDY2NSgweDEzYiksXzB4MjhkNjY1KDB4MWI4KSwnJyk7XCIpO31jYXRjaChlKXt9fTtmdW5jdGlvbiBvb19vbyhpOnN0cmluZywuLi52OmFueVtdKXt0cnl7b29fY20oKS5jb25zb2xlTG9nKGksIHYpO31jYXRjaChlKXt9IHJldHVybiB2fTtvb19vbztmdW5jdGlvbiBvb190cihpOnN0cmluZywuLi52OmFueVtdKXt0cnl7b29fY20oKS5jb25zb2xlVHJhY2UoaSwgdik7fWNhdGNoKGUpe30gcmV0dXJuIHZ9O29vX3RyO2Z1bmN0aW9uIG9vX3RzKCl7dHJ5e29vX2NtKCkuY29uc29sZVRpbWUoKTt9Y2F0Y2goZSl7fX07b29fdHM7ZnVuY3Rpb24gb29fdGUoKXt0cnl7b29fY20oKS5jb25zb2xlVGltZUVuZCgpO31jYXRjaChlKXt9fTtvb190ZTsvKmVzbGludCBlc2xpbnQtY29tbWVudHMvZGlzYWJsZS1lbmFibGUtcGFpcjosZXNsaW50LWNvbW1lbnRzL25vLXVubGltaXRlZC1kaXNhYmxlOixlc2xpbnQtY29tbWVudHMvbm8tYWdncmVnYXRpbmctZW5hYmxlOixlc2xpbnQtY29tbWVudHMvbm8tZHVwbGljYXRlLWRpc2FibGU6LGVzbGludC1jb21tZW50cy9uby11bnVzZWQtZGlzYWJsZTosZXNsaW50LWNvbW1lbnRzL25vLXVudXNlZC1lbmFibGU6LCovIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgYXBwTG9hZGVyLCBGdW5jdGlvbnMgfSBmcm9tICcuL2FwcExvYWRlcic7XG5pbXBvcnQgeyBDb21tb24gfSBmcm9tICcuL2FwcHMvQ29tbW9uJztcbmltcG9ydCB7IEhvbWUgfSBmcm9tICcuL2FwcHMvSG9tZSc7XG5cbmNvbnN0IGZ1bmN0aW9uczogRnVuY3Rpb25zID0ge1xuICBDb21tb24sXG4gIEhvbWUsXG59O1xuXG5jb25zdCBkb2NSZWFkeSA9ICgpID0+IHtcbiAgYXBwTG9hZGVyKGZ1bmN0aW9ucyk7XG59O1xuXG4vKipcbiAqIFRoZSByZWFkeSBldmVudCBoYW5kbGVyIGFuZCBzZWxmIGNsZWFudXAgbWV0aG9kXG4gKiBbanF1ZXJ5L3NyYy9jb3JlL3JlYWR5LmpzXShodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9ibG9iL21haW4vc3JjL2NvcmUvcmVhZHkuanMpXG4gKi9cbi8vIOOBqeOBhuOBl+OBpuOBk+OBruWHpueQhuOCkuaMn+OCgOOBruOBi+OBvuOBoOOCj+OBi+OBo+OBpuOBhOOBquOBhFxuZnVuY3Rpb24gY29tcGxldGVkKCkge1xuICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgY29tcGxldGVkKTtcbiAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBjb21wbGV0ZWQpO1xuICBkb2NSZWFkeSgpO1xufVxuXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gJ2xvYWRpbmcnKSB7XG4gIC8vIEhhbmRsZSBpdCBhc3luY2hyb25vdXNseSB0byBhbGxvdyBzY3JpcHRzIHRoZSBvcHBvcnR1bml0eSB0byBkZWxheSByZWFkeVxuICB3aW5kb3cuc2V0VGltZW91dChkb2NSZWFkeSk7XG59IGVsc2Uge1xuICAvLyBVc2UgdGhlIGhhbmR5IGV2ZW50IGNhbGxiYWNrXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBjb21wbGV0ZWQpO1xuXG4gIC8vIEEgZmFsbGJhY2sgdG8gd2luZG93Lm9ubG9hZCwgdGhhdCB3aWxsIGFsd2F5cyB3b3JrXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgY29tcGxldGVkKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==