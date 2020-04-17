// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"assets/SplitText.min.js":[function(require,module,exports) {
var global = arguments[3];
var define;
/*!
 * VERSION: 0.3.4
 * DATE: 2015-08-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * SplitText is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://www.greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;

!function (a) {
  "use strict";

  var b = a.GreenSockGlobals || a,
      c = function c(a) {
    var c,
        d = a.split("."),
        e = b;

    for (c = 0; c < d.length; c++) {
      e[d[c]] = e = e[d[c]] || {};
    }

    return e;
  },
      d = c("com.greensock.utils"),
      e = function e(a) {
    var b = a.nodeType,
        c = "";

    if (1 === b || 9 === b || 11 === b) {
      if ("string" == typeof a.textContent) return a.textContent;

      for (a = a.firstChild; a; a = a.nextSibling) {
        c += e(a);
      }
    } else if (3 === b || 4 === b) return a.nodeValue;

    return c;
  },
      f = document,
      g = f.defaultView ? f.defaultView.getComputedStyle : function () {},
      h = /([A-Z])/g,
      i = function i(a, b, c, d) {
    var e;
    return (c = c || g(a, null)) ? (a = c.getPropertyValue(b.replace(h, "-$1").toLowerCase()), e = a || c.length ? a : c[b]) : a.currentStyle && (c = a.currentStyle, e = c[b]), d ? e : parseInt(e, 10) || 0;
  },
      j = function j(a) {
    return a.length && a[0] && (a[0].nodeType && a[0].style && !a.nodeType || a[0].length && a[0][0]) ? !0 : !1;
  },
      k = function k(a) {
    var b,
        c,
        d,
        e = [],
        f = a.length;

    for (b = 0; f > b; b++) {
      if (c = a[b], j(c)) for (d = c.length, d = 0; d < c.length; d++) {
        e.push(c[d]);
      } else e.push(c);
    }

    return e;
  },
      l = ")eefec303079ad17405c",
      m = /(?:<br>|<br\/>|<br \/>)/gi,
      n = f.all && !f.addEventListener,
      o = "<div style='position:relative;display:inline-block;" + (n ? "*display:inline;*zoom:1;'" : "'"),
      p = function p(a) {
    a = a || "";
    var b = -1 !== a.indexOf("++"),
        c = 1;
    return b && (a = a.split("++").join("")), function () {
      return o + (a ? " class='" + a + (b ? c++ : "") + "'>" : ">");
    };
  },
      q = d.SplitText = b.SplitText = function (a, b) {
    if ("string" == typeof a && (a = q.selector(a)), !a) throw "cannot split a null element.";
    this.elements = j(a) ? k(a) : [a], this.chars = [], this.words = [], this.lines = [], this._originals = [], this.vars = b || {}, this.split(b);
  },
      r = function r(a, b, c) {
    var d = a.nodeType;
    if (1 === d || 9 === d || 11 === d) for (a = a.firstChild; a; a = a.nextSibling) {
      r(a, b, c);
    } else (3 === d || 4 === d) && (a.nodeValue = a.nodeValue.split(b).join(c));
  },
      s = function s(a, b) {
    for (var c = b.length; --c > -1;) {
      a.push(b[c]);
    }
  },
      t = function t(a, b, c, d, h) {
    m.test(a.innerHTML) && (a.innerHTML = a.innerHTML.replace(m, l));
    var j,
        k,
        n,
        o,
        q,
        t,
        u,
        v,
        w,
        x,
        y,
        z,
        A,
        B,
        C = e(a),
        D = b.type || b.split || "chars,words,lines",
        E = -1 !== D.indexOf("lines") ? [] : null,
        F = -1 !== D.indexOf("words"),
        G = -1 !== D.indexOf("chars"),
        H = "absolute" === b.position || b.absolute === !0,
        I = H ? "&#173; " : " ",
        J = -999,
        K = g(a),
        L = i(a, "paddingLeft", K),
        M = i(a, "borderBottomWidth", K) + i(a, "borderTopWidth", K),
        N = i(a, "borderLeftWidth", K) + i(a, "borderRightWidth", K),
        O = i(a, "paddingTop", K) + i(a, "paddingBottom", K),
        P = i(a, "paddingLeft", K) + i(a, "paddingRight", K),
        Q = i(a, "textAlign", K, !0),
        R = a.clientHeight,
        S = a.clientWidth,
        T = "</div>",
        U = p(b.wordsClass),
        V = p(b.charsClass),
        W = -1 !== (b.linesClass || "").indexOf("++"),
        X = b.linesClass,
        Y = -1 !== C.indexOf("<"),
        Z = !0,
        $ = [],
        _ = [],
        aa = [];

    for (W && (X = X.split("++").join("")), Y && (C = C.split("<").join("{{LT}}")), j = C.length, o = U(), q = 0; j > q; q++) {
      if (u = C.charAt(q), ")" === u && C.substr(q, 20) === l) o += (Z ? T : "") + "<BR/>", Z = !1, q !== j - 20 && C.substr(q + 20, 20) !== l && (o += " " + U(), Z = !0), q += 19;else if (" " === u && " " !== C.charAt(q - 1) && q !== j - 1 && C.substr(q - 20, 20) !== l) {
        for (o += Z ? T : "", Z = !1; " " === C.charAt(q + 1);) {
          o += I, q++;
        }

        (")" !== C.charAt(q + 1) || C.substr(q + 1, 20) !== l) && (o += I + U(), Z = !0);
      } else "{" === u && "{{LT}}" === C.substr(q, 6) ? (o += G ? V() + "{{LT}}</div>" : "{{LT}}", q += 5) : o += G && " " !== u ? V() + u + "</div>" : u;
    }

    for (a.innerHTML = o + (Z ? T : ""), Y && r(a, "{{LT}}", "<"), t = a.getElementsByTagName("*"), j = t.length, v = [], q = 0; j > q; q++) {
      v[q] = t[q];
    }

    if (E || H) for (q = 0; j > q; q++) {
      w = v[q], n = w.parentNode === a, (n || H || G && !F) && (x = w.offsetTop, E && n && x !== J && "BR" !== w.nodeName && (k = [], E.push(k), J = x), H && (w._x = w.offsetLeft, w._y = x, w._w = w.offsetWidth, w._h = w.offsetHeight), E && (F !== n && G || (k.push(w), w._x -= L), n && q && (v[q - 1]._wordEnd = !0), "BR" === w.nodeName && w.nextSibling && "BR" === w.nextSibling.nodeName && E.push([])));
    }

    for (q = 0; j > q; q++) {
      w = v[q], n = w.parentNode === a, "BR" !== w.nodeName ? (H && (z = w.style, F || n || (w._x += w.parentNode._x, w._y += w.parentNode._y), z.left = w._x + "px", z.top = w._y + "px", z.position = "absolute", z.display = "block", z.width = w._w + 1 + "px", z.height = w._h + "px"), F ? n && "" !== w.innerHTML ? _.push(w) : G && $.push(w) : n ? (a.removeChild(w), v.splice(q--, 1), j--) : !n && G && (x = !E && !H && w.nextSibling, a.appendChild(w), x || a.appendChild(f.createTextNode(" ")), $.push(w))) : E || H ? (a.removeChild(w), v.splice(q--, 1), j--) : F || a.appendChild(w);
    }

    if (E) {
      for (H && (y = f.createElement("div"), a.appendChild(y), A = y.offsetWidth + "px", x = y.offsetParent === a ? 0 : a.offsetLeft, a.removeChild(y)), z = a.style.cssText, a.style.cssText = "display:none;"; a.firstChild;) {
        a.removeChild(a.firstChild);
      }

      for (B = !H || !F && !G, q = 0; q < E.length; q++) {
        for (k = E[q], y = f.createElement("div"), y.style.cssText = "display:block;text-align:" + Q + ";position:" + (H ? "absolute;" : "relative;"), X && (y.className = X + (W ? q + 1 : "")), aa.push(y), j = k.length, t = 0; j > t; t++) {
          "BR" !== k[t].nodeName && (w = k[t], y.appendChild(w), B && (w._wordEnd || F) && y.appendChild(f.createTextNode(" ")), H && (0 === t && (y.style.top = w._y + "px", y.style.left = L + x + "px"), w.style.top = "0px", x && (w.style.left = w._x - x + "px")));
        }

        0 === j && (y.innerHTML = "&nbsp;"), F || G || (y.innerHTML = e(y).split(String.fromCharCode(160)).join(" ")), H && (y.style.width = A, y.style.height = w._h + "px"), a.appendChild(y);
      }

      a.style.cssText = z;
    }

    H && (R > a.clientHeight && (a.style.height = R - O + "px", a.clientHeight < R && (a.style.height = R + M + "px")), S > a.clientWidth && (a.style.width = S - P + "px", a.clientWidth < S && (a.style.width = S + N + "px"))), s(c, $), s(d, _), s(h, aa);
  },
      u = q.prototype;

  u.split = function (a) {
    this.isSplit && this.revert(), this.vars = a || this.vars, this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;

    for (var b = this.elements.length; --b > -1;) {
      this._originals[b] = this.elements[b].innerHTML, t(this.elements[b], this.vars, this.chars, this.words, this.lines);
    }

    return this.chars.reverse(), this.words.reverse(), this.lines.reverse(), this.isSplit = !0, this;
  }, u.revert = function () {
    if (!this._originals) throw "revert() call wasn't scoped properly.";

    for (var a = this._originals.length; --a > -1;) {
      this.elements[a].innerHTML = this._originals[a];
    }

    return this.chars = [], this.words = [], this.lines = [], this.isSplit = !1, this;
  }, q.selector = a.$ || a.jQuery || function (b) {
    var c = a.$ || a.jQuery;
    return c ? (q.selector = c, c(b)) : "undefined" == typeof document ? b : document.querySelectorAll ? document.querySelectorAll(b) : document.getElementById("#" === b.charAt(0) ? b.substr(1) : b);
  }, q.version = "0.3.4";
}(_gsScope), function (a) {
  "use strict";

  var b = function b() {
    return (_gsScope.GreenSockGlobals || _gsScope)[a];
  };

  "function" == typeof define && define.amd ? define(["TweenLite"], b) : "undefined" != typeof module && module.exports && (module.exports = b());
}("SplitText");
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62544" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/SplitText.min.js"], null)
//# sourceMappingURL=/SplitText.min.10cc9bfc.js.map