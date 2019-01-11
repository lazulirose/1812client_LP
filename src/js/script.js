! function () {
    "use strict";

    function e(n) {
        return "undefined" == typeof this || Object.getPrototypeOf(this) !== e.prototype ? new e(n) : (x = this, x.version = "3.4.0", x.tools = new A, x.isSupported() ? (x.tools.extend(x.defaults, n || {}), x.defaults.container = t(x.defaults), x.store = {
            elements: {},
            containers: []
        }, x.sequences = {}, x.history = [], x.uid = 0, x.initialized = !1) : "undefined" != typeof console && null !== console, x)
    }

    function t(e) {
        if (e && e.container) {
            if ("string" == typeof e.container) return window.document.documentElement.querySelector(e.container);
            if (x.tools.isNode(e.container)) return e.container
        }
        return x.defaults.container
    }

    function n(e, t) {
        return "string" == typeof e ? Array.prototype.slice.call(t.querySelectorAll(e)) : x.tools.isNode(e) ? [e] : x.tools.isNodeList(e) ? Array.prototype.slice.call(e) : Array.isArray(e) ? e.filter(x.tools.isNode) : []
    }

    function o() {
        return ++x.uid
    }

    function i(e, t, n) {
        t.container && (t.container = n), e.config ? e.config = x.tools.extendClone(e.config, t) : e.config = x.tools.extendClone(x.defaults, t), "top" === e.config.origin || "bottom" === e.config.origin ? e.config.axis = "Y" : e.config.axis = "X"
    }

    function r(e) {
        var t = window.getComputedStyle(e.domEl);
        e.styles || (e.styles = {
            transition: {},
            transform: {},
            computed: {}
        }, e.styles.inline = e.domEl.getAttribute("style") || "", e.styles.inline += "; visibility: visible; ", e.styles.computed.opacity = t.opacity, t.transition && "all 0s ease 0s" !== t.transition ? e.styles.computed.transition = t.transition + ", " : e.styles.computed.transition = ""), e.styles.transition.instant = a(e, 0), e.styles.transition.delayed = a(e, e.config.delay), e.styles.transform.initial = " -webkit-transform:", e.styles.transform.target = " -webkit-transform:", s(e), e.styles.transform.initial += "transform:", e.styles.transform.target += "transform:", s(e)
    }

    function a(e, t) {
        var n = e.config;
        return "-webkit-transition: " + e.styles.computed.transition + "-webkit-transform " + n.duration / 1e3 + "s " + n.easing + " " + t / 1e3 + "s, opacity " + n.duration / 1e3 + "s " + n.easing + " " + t / 1e3 + "s; transition: " + e.styles.computed.transition + "transform " + n.duration / 1e3 + "s " + n.easing + " " + t / 1e3 + "s, opacity " + n.duration / 1e3 + "s " + n.easing + " " + t / 1e3 + "s; "
    }

    function s(e) {
        var t, n = e.config,
            o = e.styles.transform;
        t = "top" === n.origin || "left" === n.origin ? /^-/.test(n.distance) ? n.distance.substr(1) : "-" + n.distance : n.distance, parseInt(n.distance) && (o.initial += " translate" + n.axis + "(" + t + ")", o.target += " translate" + n.axis + "(0)"), n.scale && (o.initial += " scale(" + n.scale + ")", o.target += " scale(1)"), n.rotate.x && (o.initial += " rotateX(" + n.rotate.x + "deg)", o.target += " rotateX(0)"), n.rotate.y && (o.initial += " rotateY(" + n.rotate.y + "deg)", o.target += " rotateY(0)"), n.rotate.z && (o.initial += " rotateZ(" + n.rotate.z + "deg)", o.target += " rotateZ(0)"), o.initial += "; opacity: " + n.opacity + ";", o.target += "; opacity: " + e.styles.computed.opacity + ";"
    }

    function l(e) {
        var t = e.config.container;
        t && -1 === x.store.containers.indexOf(t) && x.store.containers.push(e.config.container), x.store.elements[e.id] = e
    }

    function c(e, t, n) {
        var o = {
            target: e,
            config: t,
            interval: n
        };
        x.history.push(o)
    }

    function u() {
        if (x.isSupported()) {
            m();
            for (var e = 0; e < x.store.containers.length; e++) x.store.containers[e].addEventListener("scroll", d), x.store.containers[e].addEventListener("resize", d);
            x.initialized || (window.addEventListener("scroll", d), window.addEventListener("resize", d), x.initialized = !0)
        }
        return x
    }

    function d() {
        q(m)
    }

    function f() {
        var e, t, n, o;
        x.tools.forOwn(x.sequences, function (i) {
            o = x.sequences[i], e = !1;
            for (var r = 0; r < o.elemIds.length; r++) n = o.elemIds[r], t = x.store.elements[n], O(t) && !e && (e = !0);
            o.active = e
        })
    }

    function m() {
        var e, t;
        f(), x.tools.forOwn(x.store.elements, function (n) {
            t = x.store.elements[n], e = v(t), p(t) ? (t.config.beforeReveal(t.domEl), e ? t.domEl.setAttribute("style", t.styles.inline + t.styles.transform.target + t.styles.transition.delayed) : t.domEl.setAttribute("style", t.styles.inline + t.styles.transform.target + t.styles.transition.instant), y("reveal", t, e), t.revealing = !0, t.seen = !0, t.sequence && g(t, e)) : h(t) && (t.config.beforeReset(t.domEl), t.domEl.setAttribute("style", t.styles.inline + t.styles.transform.initial + t.styles.transition.instant), y("reset", t), t.revealing = !1)
        })
    }

    function g(e, t) {
        var n = 0,
            o = 0,
            i = x.sequences[e.sequence.id];
        i.blocked = !0, t && "onload" === e.config.useDelay && (o = e.config.delay), e.sequence.timer && (n = Math.abs(e.sequence.timer.started - new Date), window.clearTimeout(e.sequence.timer)), e.sequence.timer = {
            started: new Date
        }, e.sequence.timer.clock = window.setTimeout(function () {
            i.blocked = !1, e.sequence.timer = null, d()
        }, Math.abs(i.interval) + o - n)
    }

    function y(e, t, n) {
        var o = 0,
            i = 0,
            r = "after";
        switch (e) {
            case "reveal":
                i = t.config.duration, n && (i += t.config.delay), r += "Reveal";
                break;
            case "reset":
                i = t.config.duration, r += "Reset"
        }
        t.timer && (o = Math.abs(t.timer.started - new Date), window.clearTimeout(t.timer.clock)), t.timer = {
            started: new Date
        }, t.timer.clock = window.setTimeout(function () {
            t.config[r](t.domEl), t.timer = null
        }, i - o)
    }

    function p(e) {
        if (e.sequence) {
            var t = x.sequences[e.sequence.id];
            return t.active && !t.blocked && !e.revealing && !e.disabled
        }
        return O(e) && !e.revealing && !e.disabled
    }

    function v(e) {
        var t = e.config.useDelay;
        return "always" === t || "onload" === t && !x.initialized || "once" === t && !e.seen
    }

    function h(e) {
        if (e.sequence) {
            var t = x.sequences[e.sequence.id];
            return !t.active && e.config.reset && e.revealing && !e.disabled
        }
        return !O(e) && e.config.reset && e.revealing && !e.disabled
    }

    function b(e) {
        return {
            width: e.clientWidth,
            height: e.clientHeight
        }
    }

    function w(e) {
        if (e && e !== window.document.documentElement) {
            var t = E(e);
            return {
                x: e.scrollLeft + t.left,
                y: e.scrollTop + t.top
            }
        }
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    }

    function E(e) {
        var t = 0,
            n = 0,
            o = e.offsetHeight,
            i = e.offsetWidth;
        do isNaN(e.offsetTop) || (t += e.offsetTop), isNaN(e.offsetLeft) || (n += e.offsetLeft), e = e.offsetParent; while (e);
        return {
            top: t,
            left: n,
            height: o,
            width: i
        }
    }

    function O(e) {
        function t() {
            var t = c + s * a,
                n = u + l * a,
                o = d - s * a,
                m = f - l * a,
                g = r.y + e.config.viewOffset.top,
                y = r.x + e.config.viewOffset.left,
                p = r.y - e.config.viewOffset.bottom + i.height,
                v = r.x - e.config.viewOffset.right + i.width;
            return p > t && o > g && v > n && m > y
        }

        function n() {
            return "fixed" === window.getComputedStyle(e.domEl).position
        }
        var o = E(e.domEl),
            i = b(e.config.container),
            r = w(e.config.container),
            a = e.config.viewFactor,
            s = o.height,
            l = o.width,
            c = o.top,
            u = o.left,
            d = c + s,
            f = u + l;
        return t() || n()
    }

    function A() {}
    var x, q;
    e.prototype.defaults = {
        origin: "bottom",
        distance: "20px",
        duration: 500,
        delay: 0,
        rotate: {
            x: 0,
            y: 0,
            z: 0
        },
        opacity: 0,
        scale: .9,
        easing: "cubic-bezier(0.6, 0.2, 0.1, 1)",
        container: window.document.documentElement,
        mobile: !0,
        reset: !1,
        useDelay: "always",
        viewFactor: .2,
        viewOffset: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        beforeReveal: function () {},
        beforeReset: function () {},
        afterReveal: function () {},
        afterReset: function () {}
    }, e.prototype.isSupported = function () {
        var e = document.documentElement.style;
        return "WebkitTransition" in e && "WebkitTransform" in e || "transition" in e && "transform" in e
    }, e.prototype.reveal = function (e, a, s, d) {
        var f, m, g, y, p, v;
        if (void 0 !== a && "number" == typeof a ? (s = a, a = {}) : void 0 !== a && null !== a || (a = {}), f = t(a), m = n(e, f), !m.length) return x;
        s && "number" == typeof s && (v = o(), p = x.sequences[v] = {
            id: v,
            interval: s,
            elemIds: [],
            active: !1
        });
        for (var h = 0; h < m.length; h++) y = m[h].getAttribute("data-sr-id"), y ? g = x.store.elements[y] : (g = {
            id: o(),
            domEl: m[h],
            seen: !1,
            revealing: !1
        }, g.domEl.setAttribute("data-sr-id", g.id)), p && (g.sequence = {
            id: p.id,
            index: p.elemIds.length
        }, p.elemIds.push(g.id)), i(g, a, f), r(g), l(g), x.tools.isMobile() && !g.config.mobile || !x.isSupported() ? (g.domEl.setAttribute("style", g.styles.inline), g.disabled = !0) : g.revealing || g.domEl.setAttribute("style", g.styles.inline + g.styles.transform.initial);
        return !d && x.isSupported() && (c(e, a, s), x.initTimeout && window.clearTimeout(x.initTimeout), x.initTimeout = window.setTimeout(u, 0)), x
    }, e.prototype.sync = function () {
        if (x.history.length && x.isSupported()) {
            for (var e = 0; e < x.history.length; e++) {
                var t = x.history[e];
                x.reveal(t.target, t.config, t.interval, !0)
            }
            u()
        }
        return x
    }, A.prototype.isObject = function (e) {
        return null !== e && "object" == typeof e && e.constructor === Object
    }, A.prototype.isNode = function (e) {
        return "object" == typeof window.Node ? e instanceof window.Node : e && "object" == typeof e && "number" == typeof e.nodeType && "string" == typeof e.nodeName
    }, A.prototype.isNodeList = function (e) {
        var t = Object.prototype.toString.call(e),
            n = /^\[object (HTMLCollection|NodeList|Object)\]$/;
        return "object" == typeof window.NodeList ? e instanceof window.NodeList : e && "object" == typeof e && n.test(t) && "number" == typeof e.length && (0 === e.length || this.isNode(e[0]))
    }, A.prototype.forOwn = function (e, t) {
        if (!this.isObject(e)) throw new TypeError('Expected "object", but received "' + typeof e + '".');
        for (var n in e) e.hasOwnProperty(n) && t(n)
    }, A.prototype.extend = function (e, t) {
        return this.forOwn(t, function (n) {
            this.isObject(t[n]) ? (e[n] && this.isObject(e[n]) || (e[n] = {}), this.extend(e[n], t[n])) : e[n] = t[n]
        }.bind(this)), e
    }, A.prototype.extendClone = function (e, t) {
        return this.extend(this.extend({}, e), t)
    }, A.prototype.isMobile = function () {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }, q = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (e) {
        window.setTimeout(e, 1e3 / 60)
    }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function () {
        return e
    }) : "undefined" != typeof module && module.exports ? module.exports = e : window.ScrollReveal = e
}(),
function (e, t) {
    "function" == typeof define && define.amd ? define([], function () {
        return t(e)
    }) : "object" == typeof exports ? module.exports = t(e) : e.SmoothScroll = t(e)
}("undefined" != typeof global ? global : "undefined" != typeof window ? window : this, function (e) {
    var t = "querySelector" in document && "addEventListener" in e && "requestAnimationFrame" in e && "closest" in e.Element.prototype,
        n = {
            ignore: "[data-scroll-ignore]",
            header: null,
            speed: 500,
            offset: 0,
            easing: "easeInOutCubic",
            customEasing: null,
            before: function () {},
            after: function () {}
        },
        o = function () {
            for (var e = {}, t = 0, n = arguments.length, o = function (t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                }; n > t; t++) {
                var i = arguments[t];
                o(i)
            }
            return e
        },
        i = function (t) {
            return parseInt(e.getComputedStyle(t).height, 10)
        },
        r = function (e) {
            "#" === e.charAt(0) && (e = e.substr(1));
            for (var t, n = String(e), o = n.length, i = -1, r = "", a = n.charCodeAt(0); ++i < o;) {
                if (t = n.charCodeAt(i), 0 === t) throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
                r += t >= 1 && 31 >= t || 127 == t || 0 === i && t >= 48 && 57 >= t || 1 === i && t >= 48 && 57 >= t && 45 === a ? "\\" + t.toString(16) + " " : t >= 128 || 45 === t || 95 === t || t >= 48 && 57 >= t || t >= 65 && 90 >= t || t >= 97 && 122 >= t ? n.charAt(i) : "\\" + n.charAt(i)
            }
            return "#" + r
        },
        a = function (e, t) {
            var n;
            return "easeInQuad" === e.easing && (n = t * t), "easeOutQuad" === e.easing && (n = t * (2 - t)), "easeInOutQuad" === e.easing && (n = .5 > t ? 2 * t * t : -1 + (4 - 2 * t) * t), "easeInCubic" === e.easing && (n = t * t * t), "easeOutCubic" === e.easing && (n = --t * t * t + 1), "easeInOutCubic" === e.easing && (n = .5 > t ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1), "easeInQuart" === e.easing && (n = t * t * t * t), "easeOutQuart" === e.easing && (n = 1 - --t * t * t * t), "easeInOutQuart" === e.easing && (n = .5 > t ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t), "easeInQuint" === e.easing && (n = t * t * t * t * t), "easeOutQuint" === e.easing && (n = 1 + --t * t * t * t * t), "easeInOutQuint" === e.easing && (n = .5 > t ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t), e.customEasing && (n = e.customEasing(t)), n || t
        },
        s = function () {
            return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight)
        },
        l = function (e, t, n) {
            var o = 0;
            if (e.offsetParent)
                do o += e.offsetTop, e = e.offsetParent; while (e);
            return o = Math.max(o - t - n, 0)
        },
        c = function (e) {
            return e ? i(e) + e.offsetTop : 0
        },
        u = function (t, n, o) {
            o || (t.focus(), document.activeElement.id !== t.id && (t.setAttribute("tabindex", "-1"), t.focus(), t.style.outline = "none"), e.scrollTo(0, n))
        },
        d = function () {
            return !!("matchMedia" in e && e.matchMedia("(prefers-reduced-motion)").matches)
        },
        f = function (i, f) {
            var m, g, y, p, v, h, b, w = {};
            w.cancelScroll = function () {
                cancelAnimationFrame(b)
            }, w.animateScroll = function (t, i, r) {
                var d = o(m || n, r || {}),
                    f = "[object Number]" === Object.prototype.toString.call(t),
                    g = f || !t.tagName ? null : t;
                if (f || g) {
                    var y = e.pageYOffset;
                    d.header && !p && (p = document.querySelector(d.header)), v || (v = c(p));
                    var h, b, E, O = f ? t : l(g, v, parseInt("function" == typeof d.offset ? d.offset() : d.offset, 10)),
                        A = O - y,
                        x = s(),
                        q = 0,
                        N = function (n, o) {
                            var r = e.pageYOffset;
                            return n == o || r == o || (o > y && e.innerHeight + r) >= x ? (w.cancelScroll(), u(t, o, f), d.after(t, i), h = null, !0) : void 0
                        },
                        S = function (t) {
                            h || (h = t), q += t - h, b = q / parseInt(d.speed, 10), b = b > 1 ? 1 : b, E = y + A * a(d, b), e.scrollTo(0, Math.floor(E)), N(E, O) || (e.requestAnimationFrame(S), h = t)
                        };
                    0 === e.pageYOffset && e.scrollTo(0, 0), d.before(t, i), w.cancelScroll(), e.requestAnimationFrame(S)
                }
            };
            var E = function () {
                    g && (g.id = g.getAttribute("data-scroll-id"), w.animateScroll(g, y), g = null, y = null)
                },
                O = function (t) {
                    if (!d(m) && 0 === t.button && !t.metaKey && !t.ctrlKey && (y = t.target.closest(i), y && "a" === y.tagName.toLowerCase() && !t.target.closest(m.ignore) && y.hostname === e.location.hostname && y.pathname === e.location.pathname && /#/.test(y.href))) {
                        var n;
                        try {
                            n = r(decodeURIComponent(y.hash))
                        } catch (o) {
                            n = r(y.hash)
                        }
                        if ("#" === n) {
                            t.preventDefault(), g = document.body;
                            var a = g.id ? g.id : "smooth-scroll-top";
                            return g.setAttribute("data-scroll-id", a), g.id = "", void(e.location.hash.substring(1) === a ? E() : e.location.hash = a)
                        }
                        g = document.querySelector(n), g && (g.setAttribute("data-scroll-id", g.id), g.id = "", y.hash === e.location.hash && (t.preventDefault(), E()))
                    }
                },
                A = function () {
                    h || (h = setTimeout(function () {
                        h = null, v = c(p)
                    }, 66))
                };
            return w.destroy = function () {
                m && (document.removeEventListener("click", O, !1), e.removeEventListener("resize", A, !1), w.cancelScroll(), m = null, g = null, y = null, p = null, v = null, h = null, b = null)
            }, w.init = function (i) {
                t && (w.destroy(), m = o(n, i || {}), p = m.header ? document.querySelector(m.header) : null, v = c(p), document.addEventListener("click", O, !1), e.addEventListener("hashchange", E, !1), p && e.addEventListener("resize", A, !1))
            }, w.init(f), w
        };
    return f
});
var validate = function () {
        var e = !0;
        return removeElementsByClass("error"), removeClass("error-form"), "" == document.form.name.value && (errorElement(document.form.name, "お名前が入力されていません"), e = !1), "" == document.form.furigana.value ? (errorElement(document.form.furigana, "ふりがなが入力されていません"), e = !1) : validateKana(document.form.furigana.value) || (errorElement(document.form.furigana, "ひらがな以外の文字が入っています"), e = !1), "" == document.form.email.value ? (errorElement(document.form.email, "メールアドレスが入力されていません"), e = !1) : validateMail(document.form.email.value) || (errorElement(document.form.email, "メールアドレスが正しくありません"), e = !1), "" == document.form.tel.value ? (errorElement(document.form.tel, "電話番号が入力されていません"), e = !1) : validateNumber(document.form.tel.value) ? validateTel(document.form.tel.value) || (errorElement(document.form.tel, "電話番号が正しくありません"), e = !1) : (errorElement(document.form.tel, "半角数字のみを入力してください"), e = !1), "" == document.form.item.value && (errorElement(document.form.item, "お問い合わせ項目が選択されていません"), e = !1), "" == document.form.content.value && (errorElement(document.form.content, "お問い合わせ内容が入力されていません"), e = !1), e
    },
    errorElement = function (e, t) {
        e.className = "error-form";
        var n = document.createElement("div");
        n.className = "error";
        var o = document.createTextNode(t);
        n.appendChild(o), e.parentNode.insertBefore(n, e.nextSibling)
    },
    removeElementsByClass = function (e) {
        for (var t = document.getElementsByClassName(e); t.length > 0;) t[0].parentNode.removeChild(t[0])
    },
    removeClass = function (e) {
        for (var t = document.getElementsByClassName(e); t.length > 0;) t[0].className = ""
    },
    validateMail = function (e) {
        return null != e.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    },
    validateNumber = function (e) {
        return !e.match(/[^0-9]+/)
    },
    validateTel = function (e) {
        return null != e.match(/^[0-9-]{6,13}$/)
    },
    validateKana = function (e) {
        return null != e.match(/^[ぁ-ん]+$/)
    };
