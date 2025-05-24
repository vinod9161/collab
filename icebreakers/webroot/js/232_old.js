window.Modernizr = function(e, t, n) {
        function i(e) {
            h.cssText = e
        }

        function r(e, t) {
            return typeof e === t
        }
        var o, a, s, u = "2.6.2",
            l = {},
            c = !0,
            d = t.documentElement,
            f = "modernizr",
            p = t.createElement(f),
            h = p.style,
            m = ({}.toString, {}),
            g = [],
            v = g.slice,
            y = {}.hasOwnProperty;
        s = r(y, "undefined") || r(y.call, "undefined") ? function(e, t) {
            return t in e && r(e.constructor.prototype[t], "undefined")
        } : function(e, t) {
            return y.call(e, t)
        }, Function.prototype.bind || (Function.prototype.bind = function(e) {
            var t = this;
            if ("function" != typeof t) throw new TypeError;
            var n = v.call(arguments, 1),
                i = function() {
                    if (this instanceof i) {
                        var r = function() {};
                        r.prototype = t.prototype;
                        var o = new r,
                            a = t.apply(o, n.concat(v.call(arguments)));
                        return Object(a) === a ? a : o
                    }
                    return t.apply(e, n.concat(v.call(arguments)))
                };
            return i
        });
        for (var b in m) s(m, b) && (a = b.toLowerCase(), l[a] = m[b](), g.push((l[a] ? "" : "no-") + a));
        return l.addTest = function(e, t) {
                if ("object" == typeof e)
                    for (var i in e) s(e, i) && l.addTest(i, e[i]);
                else {
                    if (e = e.toLowerCase(), l[e] !== n) return l;
                    t = "function" == typeof t ? t() : t, "undefined" != typeof c && c && (d.className += " " + (t ? "" : "no-") + e), l[e] = t
                }
                return l
            }, i(""), p = o = null,
            function(e, t) {
                function n(e, t) {
                    var n = e.createElement("p"),
                        i = e.getElementsByTagName("head")[0] || e.documentElement;
                    return n.innerHTML = "x<style>" + t + "</style>", i.insertBefore(n.lastChild, i.firstChild)
                }

                function i() {
                    var e = v.elements;
                    return "string" == typeof e ? e.split(" ") : e
                }

                function r(e) {
                    var t = g[e[h]];
                    return t || (t = {}, m++, e[h] = m, g[m] = t), t
                }

                function o(e, n, i) {
                    if (n || (n = t), c) return n.createElement(e);
                    i || (i = r(n));
                    var o;
                    return o = i.cache[e] ? i.cache[e].cloneNode() : p.test(e) ? (i.cache[e] = i.createElem(e)).cloneNode() : i.createElem(e), o.canHaveChildren && !f.test(e) ? i.frag.appendChild(o) : o
                }

                function a(e, n) {
                    if (e || (e = t), c) return e.createDocumentFragment();
                    n = n || r(e);
                    for (var o = n.frag.cloneNode(), a = 0, s = i(), u = s.length; u > a; a++) o.createElement(s[a]);
                    return o
                }

                function s(e, t) {
                    t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function(n) {
                        return v.shivMethods ? o(n, e, t) : t.createElem(n)
                    }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + i().join().replace(/\w+/g, function(e) {
                        return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
                    }) + ");return n}")(v, t.frag)
                }

                function u(e) {
                    e || (e = t);
                    var i = r(e);
                    return v.shivCSS && !l && !i.hasCSS && (i.hasCSS = !!n(e, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), c || s(e, i), e
                }
                var l, c, d = e.html5 || {},
                    f = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    p = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    h = "_html5shiv",
                    m = 0,
                    g = {};
                ! function() {
                    try {
                        var e = t.createElement("a");
                        e.innerHTML = "<xyz></xyz>", l = "hidden" in e, c = 1 == e.childNodes.length || function() {
                            t.createElement("a");
                            var e = t.createDocumentFragment();
                            return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement
                        }()
                    } catch (n) {
                        l = !0, c = !0
                    }
                }();
                var v = {
                    elements: d.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
                    shivCSS: d.shivCSS !== !1,
                    supportsUnknownElements: c,
                    shivMethods: d.shivMethods !== !1,
                    type: "default",
                    shivDocument: u,
                    createElement: o,
                    createDocumentFragment: a
                };
                e.html5 = v, u(t)
            }(this, t), l._version = u, d.className = d.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (c ? " js " + g.join(" ") : ""), l
    }(this, this.document),
    function(e, t, n) {
        function i(e) {
            return "[object Function]" == g.call(e)
        }

        function r(e) {
            return "string" == typeof e
        }

        function o() {}

        function a(e) {
            return !e || "loaded" == e || "complete" == e || "uninitialized" == e
        }

        function s() {
            var e = v.shift();
            y = 1, e ? e.t ? h(function() {
                ("c" == e.t ? f.injectCss : f.injectJs)(e.s, 0, e.a, e.x, e.e, 1)
            }, 0) : (e(), s()) : y = 0
        }

        function u(e, n, i, r, o, u, l) {
            function c(t) {
                if (!p && a(d.readyState) && (b.r = p = 1, !y && s(), d.onload = d.onreadystatechange = null, t)) {
                    "img" != e && h(function() {
                        x.removeChild(d)
                    }, 50);
                    for (var i in E[n]) E[n].hasOwnProperty(i) && E[n][i].onload()
                }
            }
            var l = l || f.errorTimeout,
                d = t.createElement(e),
                p = 0,
                g = 0,
                b = {
                    t: i,
                    s: n,
                    e: o,
                    a: u,
                    x: l
                };
            1 === E[n] && (g = 1, E[n] = []), "object" == e ? d.data = n : (d.src = n, d.type = e), d.width = d.height = "0", d.onerror = d.onload = d.onreadystatechange = function() {
                c.call(this, g)
            }, v.splice(r, 0, b), "img" != e && (g || 2 === E[n] ? (x.insertBefore(d, w ? null : m), h(c, l)) : E[n].push(d))
        }

        function l(e, t, n, i, o) {
            return y = 0, t = t || "j", r(e) ? u("c" == t ? k : $, e, t, this.i++, n, i, o) : (v.splice(this.i++, 0, e), 1 == v.length && s()), this
        }

        function c() {
            var e = f;
            return e.loader = {
                load: l,
                i: 0
            }, e
        }
        var d, f, p = t.documentElement,
            h = e.setTimeout,
            m = t.getElementsByTagName("script")[0],
            g = {}.toString,
            v = [],
            y = 0,
            b = "MozAppearance" in p.style,
            w = b && !!t.createRange().compareNode,
            x = w ? p : m.parentNode,
            p = e.opera && "[object Opera]" == g.call(e.opera),
            p = !!t.attachEvent && !p,
            $ = b ? "object" : p ? "script" : "img",
            k = p ? "script" : $,
            _ = Array.isArray || function(e) {
                return "[object Array]" == g.call(e)
            },
            C = [],
            E = {},
            S = {
                timeout: function(e, t) {
                    return t.length && (e.timeout = t[0]), e
                }
            };
        f = function(e) {
            function t(e) {
                var t, n, i, e = e.split("!"),
                    r = C.length,
                    o = e.pop(),
                    a = e.length,
                    o = {
                        url: o,
                        origUrl: o,
                        prefixes: e
                    };
                for (n = 0; a > n; n++) i = e[n].split("="), (t = S[i.shift()]) && (o = t(o, i));
                for (n = 0; r > n; n++) o = C[n](o);
                return o
            }

            function a(e, r, o, a, s) {
                var u = t(e),
                    l = u.autoCallback;
                u.url.split(".").pop().split("?").shift(), u.bypass || (r && (r = i(r) ? r : r[e] || r[a] || r[e.split("/").pop().split("?")[0]]), u.instead ? u.instead(e, r, o, a, s) : (E[u.url] ? u.noexec = !0 : E[u.url] = 1, o.load(u.url, u.forceCSS || !u.forceJS && "css" == u.url.split(".").pop().split("?").shift() ? "c" : n, u.noexec, u.attrs, u.timeout), (i(r) || i(l)) && o.load(function() {
                    c(), r && r(u.origUrl, s, a), l && l(u.origUrl, s, a), E[u.url] = 2
                })))
            }

            function s(e, t) {
                function n(e, n) {
                    if (e) {
                        if (r(e)) n || (d = function() {
                            var e = [].slice.call(arguments);
                            f.apply(this, e), p()
                        }), a(e, d, t, 0, l);
                        else if (Object(e) === e)
                            for (u in s = function() {
                                    var t, n = 0;
                                    for (t in e) e.hasOwnProperty(t) && n++;
                                    return n
                                }(), e) e.hasOwnProperty(u) && (!n && !--s && (i(d) ? d = function() {
                                var e = [].slice.call(arguments);
                                f.apply(this, e), p()
                            } : d[u] = function(e) {
                                return function() {
                                    var t = [].slice.call(arguments);
                                    e && e.apply(this, t), p()
                                }
                            }(f[u])), a(e[u], d, t, u, l))
                    } else !n && p()
                }
                var s, u, l = !!e.test,
                    c = e.load || e.both,
                    d = e.callback || o,
                    f = d,
                    p = e.complete || o;
                n(l ? e.yep : e.nope, !!c), c && n(c)
            }
            var u, l, d = this.yepnope.loader;
            if (r(e)) a(e, 0, d, 0);
            else if (_(e))
                for (u = 0; u < e.length; u++) l = e[u], r(l) ? a(l, 0, d, 0) : _(l) ? f(l) : Object(l) === l && s(l, d);
            else Object(e) === e && s(e, d)
        }, f.addPrefix = function(e, t) {
            S[e] = t
        }, f.addFilter = function(e) {
            C.push(e)
        }, f.errorTimeout = 1e4, null == t.readyState && t.addEventListener && (t.readyState = "loading", t.addEventListener("DOMContentLoaded", d = function() {
            t.removeEventListener("DOMContentLoaded", d, 0), t.readyState = "complete"
        }, 0)), e.yepnope = c(), e.yepnope.executeStack = s, e.yepnope.injectJs = function(e, n, i, r, u, l) {
            var c, d, p = t.createElement("script"),
                r = r || f.errorTimeout;
            p.src = e;
            for (d in i) p.setAttribute(d, i[d]);
            n = l ? s : n || o, p.onreadystatechange = p.onload = function() {
                !c && a(p.readyState) && (c = 1, n(), p.onload = p.onreadystatechange = null)
            }, h(function() {
                c || (c = 1, n(1))
            }, r), u ? p.onload() : m.parentNode.insertBefore(p, m)
        }, e.yepnope.injectCss = function(e, n, i, r, a, u) {
            var l, r = t.createElement("link"),
                n = u ? s : n || o;
            r.href = e, r.rel = "stylesheet", r.type = "text/css";
            for (l in i) r.setAttribute(l, i[l]);
            a || (m.parentNode.insertBefore(r, m), h(n, 0))
        }
    }(this, document), Modernizr.load = function() {
        yepnope.apply(window, [].slice.call(arguments, 0))
    },
    /*!
     * jQuery JavaScript Library v1.10.0
     * http://jquery.com/
     *
     * Includes Sizzle.js
     * http://sizzlejs.com/
     *
     * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
     * Released under the MIT license
     * http://jquery.org/license
     *
     * Date: 2013-05-24T18:39Z
     */
    function(e, t) {
        function n(e) {
            var t = e.length,
                n = ct.type(e);
            return ct.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)
        }

        function i(e) {
            var t = Ct[e] = {};
            return ct.each(e.match(ft) || [], function(e, n) {
                t[n] = !0
            }), t
        }

        function r(e, n, i, r) {
            if (ct.acceptData(e)) {
                var o, a, s = ct.expando,
                    u = e.nodeType,
                    l = u ? ct.cache : e,
                    c = u ? e[s] : e[s] && s;
                if (c && l[c] && (r || l[c].data) || i !== t || "string" != typeof n) return c || (c = u ? e[s] = tt.pop() || ct.guid++ : s), l[c] || (l[c] = u ? {} : {
                    toJSON: ct.noop
                }), ("object" == typeof n || "function" == typeof n) && (r ? l[c] = ct.extend(l[c], n) : l[c].data = ct.extend(l[c].data, n)), a = l[c], r || (a.data || (a.data = {}), a = a.data), i !== t && (a[ct.camelCase(n)] = i), "string" == typeof n ? (o = a[n], null == o && (o = a[ct.camelCase(n)])) : o = a, o
            }
        }

        function o(e, t, n) {
            if (ct.acceptData(e)) {
                var i, r, o = e.nodeType,
                    a = o ? ct.cache : e,
                    u = o ? e[ct.expando] : ct.expando;
                if (a[u]) {
                    if (t && (i = n ? a[u] : a[u].data)) {
                        ct.isArray(t) ? t = t.concat(ct.map(t, ct.camelCase)) : t in i ? t = [t] : (t = ct.camelCase(t), t = t in i ? [t] : t.split(" ")), r = t.length;
                        for (; r--;) delete i[t[r]];
                        if (n ? !s(i) : !ct.isEmptyObject(i)) return
                    }(n || (delete a[u].data, s(a[u]))) && (o ? ct.cleanData([e], !0) : ct.support.deleteExpando || a != a.window ? delete a[u] : a[u] = null)
                }
            }
        }

        function a(e, n, i) {
            if (i === t && 1 === e.nodeType) {
                var r = "data-" + n.replace(St, "-$1").toLowerCase();
                if (i = e.getAttribute(r), "string" == typeof i) {
                    try {
                        i = "true" === i ? !0 : "false" === i ? !1 : "null" === i ? null : +i + "" === i ? +i : Et.test(i) ? ct.parseJSON(i) : i
                    } catch (o) {}
                    ct.data(e, n, i)
                } else i = t
            }
            return i
        }

        function s(e) {
            var t;
            for (t in e)
                if (("data" !== t || !ct.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
            return !0
        }

        function u() {
            return !0
        }

        function l() {
            return !1
        }

        function c() {
            try {
                return K.activeElement
            } catch (e) {}
        }

        function d(e, t) {
            do e = e[t]; while (e && 1 !== e.nodeType);
            return e
        }

        function f(e, t, n) {
            if (ct.isFunction(t)) return ct.grep(e, function(e, i) {
                return !!t.call(e, i, e) !== n
            });
            if (t.nodeType) return ct.grep(e, function(e) {
                return e === t !== n
            });
            if ("string" == typeof t) {
                if (Ht.test(t)) return ct.filter(t, e, n);
                t = ct.filter(t, e)
            }
            return ct.grep(e, function(e) {
                return ct.inArray(e, t) >= 0 !== n
            })
        }

        function p(e) {
            var t = Ut.split("|"),
                n = e.createDocumentFragment();
            if (n.createElement)
                for (; t.length;) n.createElement(t.pop());
            return n
        }

        function h(e, t) {
            return ct.nodeName(e, "table") && ct.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
        }

        function m(e) {
            return e.type = (null !== ct.find.attr(e, "type")) + "/" + e.type, e
        }

        function g(e) {
            var t = on.exec(e.type);
            return t ? e.type = t[1] : e.removeAttribute("type"), e
        }

        function v(e, t) {
            for (var n, i = 0; null != (n = e[i]); i++) ct._data(n, "globalEval", !t || ct._data(t[i], "globalEval"))
        }

        function y(e, t) {
            if (1 === t.nodeType && ct.hasData(e)) {
                var n, i, r, o = ct._data(e),
                    a = ct._data(t, o),
                    s = o.events;
                if (s) {
                    delete a.handle, a.events = {};
                    for (n in s)
                        for (i = 0, r = s[n].length; r > i; i++) ct.event.add(t, n, s[n][i])
                }
                a.data && (a.data = ct.extend({}, a.data))
            }
        }

        function b(e, t) {
            var n, i, r;
            if (1 === t.nodeType) {
                if (n = t.nodeName.toLowerCase(), !ct.support.noCloneEvent && t[ct.expando]) {
                    r = ct._data(t);
                    for (i in r.events) ct.removeEvent(t, i, r.handle);
                    t.removeAttribute(ct.expando)
                }
                "script" === n && t.text !== e.text ? (m(t).text = e.text, g(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), ct.support.html5Clone && e.innerHTML && !ct.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && tn.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
            }
        }

        function w(e, n) {
            var i, r, o = 0,
                a = typeof e.getElementsByTagName !== Q ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== Q ? e.querySelectorAll(n || "*") : t;
            if (!a)
                for (a = [], i = e.childNodes || e; null != (r = i[o]); o++) !n || ct.nodeName(r, n) ? a.push(r) : ct.merge(a, w(r, n));
            return n === t || n && ct.nodeName(e, n) ? ct.merge([e], a) : a
        }

        function x(e) {
            tn.test(e.type) && (e.defaultChecked = e.checked)
        }

        function $(e, t) {
            if (t in e) return t;
            for (var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, r = Cn.length; r--;)
                if (t = Cn[r] + n, t in e) return t;
            return i
        }

        function k(e, t) {
            return e = t || e, "none" === ct.css(e, "display") || !ct.contains(e.ownerDocument, e)
        }

        function _(e, t) {
            for (var n, i, r, o = [], a = 0, s = e.length; s > a; a++) i = e[a], i.style && (o[a] = ct._data(i, "olddisplay"), n = i.style.display, t ? (o[a] || "none" !== n || (i.style.display = ""), "" === i.style.display && k(i) && (o[a] = ct._data(i, "olddisplay", T(i.nodeName)))) : o[a] || (r = k(i), (n && "none" !== n || !r) && ct._data(i, "olddisplay", r ? n : ct.css(i, "display"))));
            for (a = 0; s > a; a++) i = e[a], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? o[a] || "" : "none"));
            return e
        }

        function C(e, t, n) {
            var i = yn.exec(t);
            return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
        }

        function E(e, t, n, i, r) {
            for (var o = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2) "margin" === n && (a += ct.css(e, n + _n[o], !0, r)), i ? ("content" === n && (a -= ct.css(e, "padding" + _n[o], !0, r)), "margin" !== n && (a -= ct.css(e, "border" + _n[o] + "Width", !0, r))) : (a += ct.css(e, "padding" + _n[o], !0, r), "padding" !== n && (a += ct.css(e, "border" + _n[o] + "Width", !0, r)));
            return a
        }

        function S(e, t, n) {
            var i = !0,
                r = "width" === t ? e.offsetWidth : e.offsetHeight,
                o = dn(e),
                a = ct.support.boxSizing && "border-box" === ct.css(e, "boxSizing", !1, o);
            if (0 >= r || null == r) {
                if (r = fn(e, t, o), (0 > r || null == r) && (r = e.style[t]), bn.test(r)) return r;
                i = a && (ct.support.boxSizingReliable || r === e.style[t]), r = parseFloat(r) || 0
            }
            return r + E(e, t, n || (a ? "border" : "content"), i, o) + "px"
        }

        function T(e) {
            var t = K,
                n = xn[e];
            return n || (n = P(e, t), "none" !== n && n || (cn = (cn || ct("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (cn[0].contentWindow || cn[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = P(e, t), cn.detach()), xn[e] = n), n
        }

        function P(e, t) {
            var n = ct(t.createElement(e)).appendTo(t.body),
                i = ct.css(n[0], "display");
            return n.remove(), i
        }

        function A(e, t, n, i) {
            var r;
            if (ct.isArray(t)) ct.each(t, function(t, r) {
                n || Sn.test(e) ? i(e, r) : A(e + "[" + ("object" == typeof r ? t : "") + "]", r, n, i)
            });
            else if (n || "object" !== ct.type(t)) i(e, t);
            else
                for (r in t) A(e + "[" + r + "]", t[r], n, i)
        }

        function I(e) {
            return function(t, n) {
                "string" != typeof t && (n = t, t = "*");
                var i, r = 0,
                    o = t.toLowerCase().match(ft) || [];
                if (ct.isFunction(n))
                    for (; i = o[r++];) "+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
            }
        }

        function N(e, t, n, i) {
            function r(s) {
                var u;
                return o[s] = !0, ct.each(e[s] || [], function(e, s) {
                    var l = s(t, n, i);
                    return "string" != typeof l || a || o[l] ? a ? !(u = l) : void 0 : (t.dataTypes.unshift(l), r(l), !1)
                }), u
            }
            var o = {},
                a = e === Wn;
            return r(t.dataTypes[0]) || !o["*"] && r("*")
        }

        function D(e, n) {
            var i, r, o = ct.ajaxSettings.flatOptions || {};
            for (r in n) n[r] !== t && ((o[r] ? e : i || (i = {}))[r] = n[r]);
            return i && ct.extend(!0, e, i), e
        }

        function M(e, n, i) {
            for (var r, o, a, s, u = e.contents, l = e.dataTypes;
                "*" === l[0];) l.shift(), o === t && (o = e.mimeType || n.getResponseHeader("Content-Type"));
            if (o)
                for (s in u)
                    if (u[s] && u[s].test(o)) {
                        l.unshift(s);
                        break
                    }
            if (l[0] in i) a = l[0];
            else {
                for (s in i) {
                    if (!l[0] || e.converters[s + " " + l[0]]) {
                        a = s;
                        break
                    }
                    r || (r = s)
                }
                a = a || r
            }
            return a ? (a !== l[0] && l.unshift(a), i[a]) : void 0
        }

        function L(e, t, n, i) {
            var r, o, a, s, u, l = {},
                c = e.dataTypes.slice();
            if (c[1])
                for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
            for (o = c.shift(); o;)
                if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())
                    if ("*" === o) o = u;
                    else if ("*" !== u && u !== o) {
                if (a = l[u + " " + o] || l["* " + o], !a)
                    for (r in l)
                        if (s = r.split(" "), s[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                            a === !0 ? a = l[r] : l[r] !== !0 && (o = s[0], c.unshift(s[1]));
                            break
                        }
                if (a !== !0)
                    if (a && e["throws"]) t = a(t);
                    else try {
                        t = a(t)
                    } catch (d) {
                        return {
                            state: "parsererror",
                            error: a ? d : "No conversion from " + u + " to " + o
                        }
                    }
            }
            return {
                state: "success",
                data: t
            }
        }

        function j() {
            try {
                return new e.XMLHttpRequest
            } catch (t) {}
        }

        function O() {
            try {
                return new e.ActiveXObject("Microsoft.XMLHTTP")
            } catch (t) {}
        }

        function F() {
            return setTimeout(function() {
                Zn = t
            }), Zn = ct.now()
        }

        function B(e, t, n) {
            for (var i, r = (oi[t] || []).concat(oi["*"]), o = 0, a = r.length; a > o; o++)
                if (i = r[o].call(n, t, e)) return i
        }

        function z(e, t, n) {
            var i, r, o = 0,
                a = ri.length,
                s = ct.Deferred().always(function() {
                    delete u.elem
                }),
                u = function() {
                    if (r) return !1;
                    for (var t = Zn || F(), n = Math.max(0, l.startTime + l.duration - t), i = n / l.duration || 0, o = 1 - i, a = 0, u = l.tweens.length; u > a; a++) l.tweens[a].run(o);
                    return s.notifyWith(e, [l, o, n]), 1 > o && u ? n : (s.resolveWith(e, [l]), !1)
                },
                l = s.promise({
                    elem: e,
                    props: ct.extend({}, t),
                    opts: ct.extend(!0, {
                        specialEasing: {}
                    }, n),
                    originalProperties: t,
                    originalOptions: n,
                    startTime: Zn || F(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function(t, n) {
                        var i = ct.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                        return l.tweens.push(i), i
                    },
                    stop: function(t) {
                        var n = 0,
                            i = t ? l.tweens.length : 0;
                        if (r) return this;
                        for (r = !0; i > n; n++) l.tweens[n].run(1);
                        return t ? s.resolveWith(e, [l, t]) : s.rejectWith(e, [l, t]), this
                    }
                }),
                c = l.props;
            for (R(c, l.opts.specialEasing); a > o; o++)
                if (i = ri[o].call(l, e, c, l.opts)) return i;
            return ct.map(c, B, l), ct.isFunction(l.opts.start) && l.opts.start.call(e, l), ct.fx.timer(ct.extend(u, {
                elem: e,
                anim: l,
                queue: l.opts.queue
            })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
        }

        function R(e, t) {
            var n, i, r, o, a;
            for (n in e)
                if (i = ct.camelCase(n), r = t[i], o = e[n], ct.isArray(o) && (r = o[1], o = e[n] = o[0]), n !== i && (e[i] = o, delete e[n]), a = ct.cssHooks[i], a && "expand" in a) {
                    o = a.expand(o), delete e[i];
                    for (n in o) n in e || (e[n] = o[n], t[n] = r)
                } else t[i] = r
        }

        function H(e, t, n) {
            var i, r, o, a, s, u, l = this,
                c = {},
                d = e.style,
                f = e.nodeType && k(e),
                p = ct._data(e, "fxshow");
            n.queue || (s = ct._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, u = s.empty.fire, s.empty.fire = function() {
                s.unqueued || u()
            }), s.unqueued++, l.always(function() {
                l.always(function() {
                    s.unqueued--, ct.queue(e, "fx").length || s.empty.fire()
                })
            })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], "inline" === ct.css(e, "display") && "none" === ct.css(e, "float") && (ct.support.inlineBlockNeedsLayout && "inline" !== T(e.nodeName) ? d.zoom = 1 : d.display = "inline-block")), n.overflow && (d.overflow = "hidden", ct.support.shrinkWrapBlocks || l.always(function() {
                d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
            }));
            for (i in t)
                if (r = t[i], ti.exec(r)) {
                    if (delete t[i], o = o || "toggle" === r, r === (f ? "hide" : "show")) continue;
                    c[i] = p && p[i] || ct.style(e, i)
                }
            if (!ct.isEmptyObject(c)) {
                p ? "hidden" in p && (f = p.hidden) : p = ct._data(e, "fxshow", {}), o && (p.hidden = !f), f ? ct(e).show() : l.done(function() {
                    ct(e).hide()
                }), l.done(function() {
                    var t;
                    ct._removeData(e, "fxshow");
                    for (t in c) ct.style(e, t, c[t])
                });
                for (i in c) a = B(f ? p[i] : 0, i, l), i in p || (p[i] = a.start, f && (a.end = a.start, a.start = "width" === i || "height" === i ? 1 : 0))
            }
        }

        function q(e, t, n, i, r) {
            return new q.prototype.init(e, t, n, i, r)
        }

        function W(e, t) {
            var n, i = {
                    height: e
                },
                r = 0;
            for (t = t ? 1 : 0; 4 > r; r += 2 - t) n = _n[r], i["margin" + n] = i["padding" + n] = e;
            return t && (i.opacity = i.width = e), i
        }

        function V(e) {
            return ct.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
        }
        var U, X, Q = typeof t,
            Y = e.location,
            K = e.document,
            G = K.documentElement,
            J = e.jQuery,
            Z = e.$,
            et = {},
            tt = [],
            nt = "1.10.0",
            it = tt.concat,
            rt = tt.push,
            ot = tt.slice,
            at = tt.indexOf,
            st = et.toString,
            ut = et.hasOwnProperty,
            lt = nt.trim,
            ct = function(e, t) {
                return new ct.fn.init(e, t, X)
            },
            dt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            ft = /\S+/g,
            pt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            ht = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            mt = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            gt = /^[\],:{}\s]*$/,
            vt = /(?:^|:|,)(?:\s*\[)+/g,
            yt = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
            bt = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
            wt = /^-ms-/,
            xt = /-([\da-z])/gi,
            $t = function(e, t) {
                return t.toUpperCase()
            },
            kt = function(e) {
                (K.addEventListener || "load" === e.type || "complete" === K.readyState) && (_t(), ct.ready())
            },
            _t = function() {
                K.addEventListener ? (K.removeEventListener("DOMContentLoaded", kt, !1), e.removeEventListener("load", kt, !1)) : (K.detachEvent("onreadystatechange", kt), e.detachEvent("onload", kt))
            };
        ct.fn = ct.prototype = {
                jquery: nt,
                constructor: ct,
                init: function(e, n, i) {
                    var r, o;
                    if (!e) return this;
                    if ("string" == typeof e) {
                        if (r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : ht.exec(e), !r || !r[1] && n) return !n || n.jquery ? (n || i).find(e) : this.constructor(n).find(e);
                        if (r[1]) {
                            if (n = n instanceof ct ? n[0] : n, ct.merge(this, ct.parseHTML(r[1], n && n.nodeType ? n.ownerDocument || n : K, !0)), mt.test(r[1]) && ct.isPlainObject(n))
                                for (r in n) ct.isFunction(this[r]) ? this[r](n[r]) : this.attr(r, n[r]);
                            return this
                        }
                        if (o = K.getElementById(r[2]), o && o.parentNode) {
                            if (o.id !== r[2]) return i.find(e);
                            this.length = 1, this[0] = o
                        }
                        return this.context = K, this.selector = e, this
                    }
                    return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : ct.isFunction(e) ? i.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), ct.makeArray(e, this))
                },
                selector: "",
                length: 0,
                toArray: function() {
                    return ot.call(this)
                },
                get: function(e) {
                    return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
                },
                pushStack: function(e) {
                    var t = ct.merge(this.constructor(), e);
                    return t.prevObject = this, t.context = this.context, t
                },
                each: function(e, t) {
                    return ct.each(this, e, t)
                },
                ready: function(e) {
                    return ct.ready.promise().done(e), this
                },
                slice: function() {
                    return this.pushStack(ot.apply(this, arguments))
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                eq: function(e) {
                    var t = this.length,
                        n = +e + (0 > e ? t : 0);
                    return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
                },
                map: function(e) {
                    return this.pushStack(ct.map(this, function(t, n) {
                        return e.call(t, n, t)
                    }))
                },
                end: function() {
                    return this.prevObject || this.constructor(null)
                },
                push: rt,
                sort: [].sort,
                splice: [].splice
            }, ct.fn.init.prototype = ct.fn, ct.extend = ct.fn.extend = function() {
                var e, n, i, r, o, a, s = arguments[0] || {},
                    u = 1,
                    l = arguments.length,
                    c = !1;
                for ("boolean" == typeof s && (c = s, s = arguments[1] || {}, u = 2), "object" == typeof s || ct.isFunction(s) || (s = {}), l === u && (s = this, --u); l > u; u++)
                    if (null != (o = arguments[u]))
                        for (r in o) e = s[r], i = o[r], s !== i && (c && i && (ct.isPlainObject(i) || (n = ct.isArray(i))) ? (n ? (n = !1, a = e && ct.isArray(e) ? e : []) : a = e && ct.isPlainObject(e) ? e : {}, s[r] = ct.extend(c, a, i)) : i !== t && (s[r] = i));
                return s
            }, ct.extend({
                expando: "jQuery" + (nt + Math.random()).replace(/\D/g, ""),
                noConflict: function(t) {
                    return e.$ === ct && (e.$ = Z), t && e.jQuery === ct && (e.jQuery = J), ct
                },
                isReady: !1,
                readyWait: 1,
                holdReady: function(e) {
                    e ? ct.readyWait++ : ct.ready(!0)
                },
                ready: function(e) {
                    if (e === !0 ? !--ct.readyWait : !ct.isReady) {
                        if (!K.body) return setTimeout(ct.ready);
                        ct.isReady = !0, e !== !0 && --ct.readyWait > 0 || (U.resolveWith(K, [ct]), ct.fn.trigger && ct(K).trigger("ready").off("ready"))
                    }
                },
                isFunction: function(e) {
                    return "function" === ct.type(e)
                },
                isArray: Array.isArray || function(e) {
                    return "array" === ct.type(e)
                },
                isWindow: function(e) {
                    return null != e && e == e.window
                },
                isNumeric: function(e) {
                    return !isNaN(parseFloat(e)) && isFinite(e)
                },
                type: function(e) {
                    return null == e ? String(e) : "object" == typeof e || "function" == typeof e ? et[st.call(e)] || "object" : typeof e
                },
                isPlainObject: function(e) {
                    var n;
                    if (!e || "object" !== ct.type(e) || e.nodeType || ct.isWindow(e)) return !1;
                    try {
                        if (e.constructor && !ut.call(e, "constructor") && !ut.call(e.constructor.prototype, "isPrototypeOf")) return !1
                    } catch (i) {
                        return !1
                    }
                    if (ct.support.ownLast)
                        for (n in e) return ut.call(e, n);
                    for (n in e);
                    return n === t || ut.call(e, n)
                },
                isEmptyObject: function(e) {
                    var t;
                    for (t in e) return !1;
                    return !0
                },
                error: function(e) {
                    throw new Error(e)
                },
                parseHTML: function(e, t, n) {
                    if (!e || "string" != typeof e) return null;
                    "boolean" == typeof t && (n = t, t = !1), t = t || K;
                    var i = mt.exec(e),
                        r = !n && [];
                    return i ? [t.createElement(i[1])] : (i = ct.buildFragment([e], t, r), r && ct(r).remove(), ct.merge([], i.childNodes))
                },
                parseJSON: function(t) {
                    return e.JSON && e.JSON.parse ? e.JSON.parse(t) : null === t ? t : "string" == typeof t && (t = ct.trim(t), t && gt.test(t.replace(yt, "@").replace(bt, "]").replace(vt, ""))) ? new Function("return " + t)() : (ct.error("Invalid JSON: " + t), void 0)
                },
                parseXML: function(n) {
                    var i, r;
                    if (!n || "string" != typeof n) return null;
                    try {
                        e.DOMParser ? (r = new DOMParser, i = r.parseFromString(n, "text/xml")) : (i = new ActiveXObject("Microsoft.XMLDOM"), i.async = "false", i.loadXML(n))
                    } catch (o) {
                        i = t
                    }
                    return i && i.documentElement && !i.getElementsByTagName("parsererror").length || ct.error("Invalid XML: " + n), i
                },
                noop: function() {},
                globalEval: function(t) {
                    t && ct.trim(t) && (e.execScript || function(t) {
                        e.eval.call(e, t)
                    })(t)
                },
                camelCase: function(e) {
                    return e.replace(wt, "ms-").replace(xt, $t)
                },
                nodeName: function(e, t) {
                    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
                },
                each: function(e, t, i) {
                    var r, o = 0,
                        a = e.length,
                        s = n(e);
                    if (i) {
                        if (s)
                            for (; a > o && (r = t.apply(e[o], i), r !== !1); o++);
                        else
                            for (o in e)
                                if (r = t.apply(e[o], i), r === !1) break
                    } else if (s)
                        for (; a > o && (r = t.call(e[o], o, e[o]), r !== !1); o++);
                    else
                        for (o in e)
                            if (r = t.call(e[o], o, e[o]), r === !1) break; return e
                },
                trim: lt && !lt.call("ï»¿Â ") ? function(e) {
                    return null == e ? "" : lt.call(e)
                } : function(e) {
                    return null == e ? "" : (e + "").replace(pt, "")
                },
                makeArray: function(e, t) {
                    var i = t || [];
                    return null != e && (n(Object(e)) ? ct.merge(i, "string" == typeof e ? [e] : e) : rt.call(i, e)), i
                },
                inArray: function(e, t, n) {
                    var i;
                    if (t) {
                        if (at) return at.call(t, e, n);
                        for (i = t.length, n = n ? 0 > n ? Math.max(0, i + n) : n : 0; i > n; n++)
                            if (n in t && t[n] === e) return n
                    }
                    return -1
                },
                merge: function(e, n) {
                    var i = n.length,
                        r = e.length,
                        o = 0;
                    if ("number" == typeof i)
                        for (; i > o; o++) e[r++] = n[o];
                    else
                        for (; n[o] !== t;) e[r++] = n[o++];
                    return e.length = r, e
                },
                grep: function(e, t, n) {
                    var i, r = [],
                        o = 0,
                        a = e.length;
                    for (n = !!n; a > o; o++) i = !!t(e[o], o), n !== i && r.push(e[o]);
                    return r
                },
                map: function(e, t, i) {
                    var r, o = 0,
                        a = e.length,
                        s = n(e),
                        u = [];
                    if (s)
                        for (; a > o; o++) r = t(e[o], o, i), null != r && (u[u.length] = r);
                    else
                        for (o in e) r = t(e[o], o, i), null != r && (u[u.length] = r);
                    return it.apply([], u)
                },
                guid: 1,
                proxy: function(e, n) {
                    var i, r, o;
                    return "string" == typeof n && (o = e[n], n = e, e = o), ct.isFunction(e) ? (i = ot.call(arguments, 2), r = function() {
                        return e.apply(n || this, i.concat(ot.call(arguments)))
                    }, r.guid = e.guid = e.guid || ct.guid++, r) : t
                },
                access: function(e, n, i, r, o, a, s) {
                    var u = 0,
                        l = e.length,
                        c = null == i;
                    if ("object" === ct.type(i)) {
                        o = !0;
                        for (u in i) ct.access(e, n, u, i[u], !0, a, s)
                    } else if (r !== t && (o = !0, ct.isFunction(r) || (s = !0), c && (s ? (n.call(e, r), n = null) : (c = n, n = function(e, t, n) {
                            return c.call(ct(e), n)
                        })), n))
                        for (; l > u; u++) n(e[u], i, s ? r : r.call(e[u], u, n(e[u], i)));
                    return o ? e : c ? n.call(e) : l ? n(e[0], i) : a
                },
                now: function() {
                    return (new Date).getTime()
                },
                swap: function(e, t, n, i) {
                    var r, o, a = {};
                    for (o in t) a[o] = e.style[o], e.style[o] = t[o];
                    r = n.apply(e, i || []);
                    for (o in t) e.style[o] = a[o];
                    return r
                }
            }), ct.ready.promise = function(t) {
                if (!U)
                    if (U = ct.Deferred(), "complete" === K.readyState) setTimeout(ct.ready);
                    else if (K.addEventListener) K.addEventListener("DOMContentLoaded", kt, !1), e.addEventListener("load", kt, !1);
                else {
                    K.attachEvent("onreadystatechange", kt), e.attachEvent("onload", kt);
                    var n = !1;
                    try {
                        n = null == e.frameElement && K.documentElement
                    } catch (i) {}
                    n && n.doScroll && function r() {
                        if (!ct.isReady) {
                            try {
                                n.doScroll("left")
                            } catch (e) {
                                return setTimeout(r, 50)
                            }
                            _t(), ct.ready()
                        }
                    }()
                }
                return U.promise(t)
            }, ct.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
                et["[object " + t + "]"] = t.toLowerCase()
            }), X = ct(K),
            /*!
             * Sizzle CSS Selector Engine v1.9.4-pre
             * http://sizzlejs.com/
             *
             * Copyright 2013 jQuery Foundation, Inc. and other contributors
             * Released under the MIT license
             * http://jquery.org/license
             *
             * Date: 2013-05-15
             */
            function(e, t) {
                function n(e, t, n, i) {
                    var r, o, a, s, u, l, c, d, f, p;
                    if ((t ? t.ownerDocument || t : W) !== j && L(t), t = t || j, n = n || [], !e || "string" != typeof e) return n;
                    if (1 !== (s = t.nodeType) && 9 !== s) return [];
                    if (F && !i) {
                        if (r = kt.exec(e))
                            if (a = r[1]) {
                                if (9 === s) {
                                    if (o = t.getElementById(a), !o || !o.parentNode) return n;
                                    if (o.id === a) return n.push(o), n
                                } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && H(t, o) && o.id === a) return n.push(o), n
                            } else {
                                if (r[2]) return rt.apply(n, t.getElementsByTagName(e)), n;
                                if ((a = r[3]) && S.getElementsByClassName && t.getElementsByClassName) return rt.apply(n, t.getElementsByClassName(a)), n
                            }
                        if (S.qsa && (!B || !B.test(e))) {
                            if (d = c = q, f = t, p = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
                                for (l = m(e), (c = t.getAttribute("id")) ? d = c.replace(Et, "\\$&") : t.setAttribute("id", d), d = "[id='" + d + "'] ", u = l.length; u--;) l[u] = d + g(l[u]);
                                f = vt.test(e) && t.parentNode || t, p = l.join(",")
                            }
                            if (p) try {
                                return rt.apply(n, f.querySelectorAll(p)), n
                            } catch (h) {} finally {
                                c || t.removeAttribute("id")
                            }
                        }
                    }
                    return _(e.replace(ht, "$1"), t, n, i)
                }

                function i(e) {
                    return $t.test(e + "")
                }

                function r() {
                    function e(n, i) {
                        return t.push(n += " ") > P.cacheLength && delete e[t.shift()], e[n] = i
                    }
                    var t = [];
                    return e
                }

                function o(e) {
                    return e[q] = !0, e
                }

                function a(e) {
                    var t = j.createElement("div");
                    try {
                        return !!e(t)
                    } catch (n) {
                        return !1
                    } finally {
                        t.parentNode && t.parentNode.removeChild(t), t = null
                    }
                }

                function s(e, t, n) {
                    e = e.split("|");
                    for (var i, r = e.length, o = n ? null : t; r--;)(i = P.attrHandle[e[r]]) && i !== t || (P.attrHandle[e[r]] = o)
                }

                function u(e, t) {
                    var n = e.getAttributeNode(t);
                    return n && n.specified ? n.value : e[t] === !0 ? t.toLowerCase() : null
                }

                function l(e, t) {
                    return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
                }

                function c(e) {
                    return "input" === e.nodeName.toLowerCase() ? e.defaultValue : void 0
                }

                function d(e, t) {
                    var n = t && e,
                        i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || Z) - (~e.sourceIndex || Z);
                    if (i) return i;
                    if (n)
                        for (; n = n.nextSibling;)
                            if (n === t) return -1;
                    return e ? 1 : -1
                }

                function f(e) {
                    return function(t) {
                        var n = t.nodeName.toLowerCase();
                        return "input" === n && t.type === e
                    }
                }

                function p(e) {
                    return function(t) {
                        var n = t.nodeName.toLowerCase();
                        return ("input" === n || "button" === n) && t.type === e
                    }
                }

                function h(e) {
                    return o(function(t) {
                        return t = +t, o(function(n, i) {
                            for (var r, o = e([], n.length, t), a = o.length; a--;) n[r = o[a]] && (n[r] = !(i[r] = n[r]))
                        })
                    })
                }

                function m(e, t) {
                    var i, r, o, a, s, u, l, c = Q[e + " "];
                    if (c) return t ? 0 : c.slice(0);
                    for (s = e, u = [], l = P.preFilter; s;) {
                        (!i || (r = mt.exec(s))) && (r && (s = s.slice(r[0].length) || s), u.push(o = [])), i = !1, (r = gt.exec(s)) && (i = r.shift(), o.push({
                            value: i,
                            type: r[0].replace(ht, " ")
                        }), s = s.slice(i.length));
                        for (a in P.filter) !(r = xt[a].exec(s)) || l[a] && !(r = l[a](r)) || (i = r.shift(), o.push({
                            value: i,
                            type: a,
                            matches: r
                        }), s = s.slice(i.length));
                        if (!i) break
                    }
                    return t ? s.length : s ? n.error(e) : Q(e, u).slice(0)
                }

                function g(e) {
                    for (var t = 0, n = e.length, i = ""; n > t; t++) i += e[t].value;
                    return i
                }

                function v(e, t, n) {
                    var i = t.dir,
                        r = n && "parentNode" === i,
                        o = U++;
                    return t.first ? function(t, n, o) {
                        for (; t = t[i];)
                            if (1 === t.nodeType || r) return e(t, n, o)
                    } : function(t, n, a) {
                        var s, u, l, c = V + " " + o;
                        if (a) {
                            for (; t = t[i];)
                                if ((1 === t.nodeType || r) && e(t, n, a)) return !0
                        } else
                            for (; t = t[i];)
                                if (1 === t.nodeType || r)
                                    if (l = t[q] || (t[q] = {}), (u = l[i]) && u[0] === c) {
                                        if ((s = u[1]) === !0 || s === T) return s === !0
                                    } else if (u = l[i] = [c], u[1] = e(t, n, a) || T, u[1] === !0) return !0
                    }
                }

                function y(e) {
                    return e.length > 1 ? function(t, n, i) {
                        for (var r = e.length; r--;)
                            if (!e[r](t, n, i)) return !1;
                        return !0
                    } : e[0]
                }

                function b(e, t, n, i, r) {
                    for (var o, a = [], s = 0, u = e.length, l = null != t; u > s; s++)(o = e[s]) && (!n || n(o, i, r)) && (a.push(o), l && t.push(s));
                    return a
                }

                function w(e, t, n, i, r, a) {
                    return i && !i[q] && (i = w(i)), r && !r[q] && (r = w(r, a)), o(function(o, a, s, u) {
                        var l, c, d, f = [],
                            p = [],
                            h = a.length,
                            m = o || k(t || "*", s.nodeType ? [s] : s, []),
                            g = !e || !o && t ? m : b(m, f, e, s, u),
                            v = n ? r || (o ? e : h || i) ? [] : a : g;
                        if (n && n(g, v, s, u), i)
                            for (l = b(v, p), i(l, [], s, u), c = l.length; c--;)(d = l[c]) && (v[p[c]] = !(g[p[c]] = d));
                        if (o) {
                            if (r || e) {
                                if (r) {
                                    for (l = [], c = v.length; c--;)(d = v[c]) && l.push(g[c] = d);
                                    r(null, v = [], l, u)
                                }
                                for (c = v.length; c--;)(d = v[c]) && (l = r ? at.call(o, d) : f[c]) > -1 && (o[l] = !(a[l] = d))
                            }
                        } else v = b(v === a ? v.splice(h, v.length) : v), r ? r(null, a, v, u) : rt.apply(a, v)
                    })
                }

                function x(e) {
                    for (var t, n, i, r = e.length, o = P.relative[e[0].type], a = o || P.relative[" "], s = o ? 1 : 0, u = v(function(e) {
                            return e === t
                        }, a, !0), l = v(function(e) {
                            return at.call(t, e) > -1
                        }, a, !0), c = [function(e, n, i) {
                            return !o && (i || n !== D) || ((t = n).nodeType ? u(e, n, i) : l(e, n, i))
                        }]; r > s; s++)
                        if (n = P.relative[e[s].type]) c = [v(y(c), n)];
                        else {
                            if (n = P.filter[e[s].type].apply(null, e[s].matches), n[q]) {
                                for (i = ++s; r > i && !P.relative[e[i].type]; i++);
                                return w(s > 1 && y(c), s > 1 && g(e.slice(0, s - 1).concat({
                                    value: " " === e[s - 2].type ? "*" : ""
                                })).replace(ht, "$1"), n, i > s && x(e.slice(s, i)), r > i && x(e = e.slice(i)), r > i && g(e))
                            }
                            c.push(n)
                        }
                    return y(c)
                }

                function $(e, t) {
                    var i = 0,
                        r = t.length > 0,
                        a = e.length > 0,
                        s = function(o, s, u, l, c) {
                            var d, f, p, h = [],
                                m = 0,
                                g = "0",
                                v = o && [],
                                y = null != c,
                                w = D,
                                x = o || a && P.find.TAG("*", c && s.parentNode || s),
                                $ = V += null == w ? 1 : Math.random() || .1;
                            for (y && (D = s !== j && s, T = i); null != (d = x[g]); g++) {
                                if (a && d) {
                                    for (f = 0; p = e[f++];)
                                        if (p(d, s, u)) {
                                            l.push(d);
                                            break
                                        }
                                    y && (V = $, T = ++i)
                                }
                                r && ((d = !p && d) && m--, o && v.push(d))
                            }
                            if (m += g, r && g !== m) {
                                for (f = 0; p = t[f++];) p(v, h, s, u);
                                if (o) {
                                    if (m > 0)
                                        for (; g--;) v[g] || h[g] || (h[g] = nt.call(l));
                                    h = b(h)
                                }
                                rt.apply(l, h), y && !o && h.length > 0 && m + t.length > 1 && n.uniqueSort(l)
                            }
                            return y && (V = $, D = w), v
                        };
                    return r ? o(s) : s
                }

                function k(e, t, i) {
                    for (var r = 0, o = t.length; o > r; r++) n(e, t[r], i);
                    return i
                }

                function _(e, t, n, i) {
                    var r, o, a, s, u, l = m(e);
                    if (!i && 1 === l.length) {
                        if (o = l[0] = l[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && S.getById && 9 === t.nodeType && F && P.relative[o[1].type]) {
                            if (t = (P.find.ID(a.matches[0].replace(St, Tt), t) || [])[0], !t) return n;
                            e = e.slice(o.shift().value.length)
                        }
                        for (r = xt.needsContext.test(e) ? 0 : o.length; r-- && (a = o[r], !P.relative[s = a.type]);)
                            if ((u = P.find[s]) && (i = u(a.matches[0].replace(St, Tt), vt.test(o[0].type) && t.parentNode || t))) {
                                if (o.splice(r, 1), e = i.length && g(o), !e) return rt.apply(n, i), n;
                                break
                            }
                    }
                    return N(e, l)(i, t, !F, n, vt.test(e)), n
                }

                function C() {}
                var E, S, T, P, A, I, N, D, M, L, j, O, F, B, z, R, H, q = "sizzle" + -new Date,
                    W = e.document,
                    V = 0,
                    U = 0,
                    X = r(),
                    Q = r(),
                    Y = r(),
                    K = !1,
                    G = function() {
                        return 0
                    },
                    J = typeof t,
                    Z = 1 << 31,
                    et = {}.hasOwnProperty,
                    tt = [],
                    nt = tt.pop,
                    it = tt.push,
                    rt = tt.push,
                    ot = tt.slice,
                    at = tt.indexOf || function(e) {
                        for (var t = 0, n = this.length; n > t; t++)
                            if (this[t] === e) return t;
                        return -1
                    },
                    st = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    ut = "[\\x20\\t\\r\\n\\f]",
                    lt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                    dt = lt.replace("w", "w#"),
                    ft = "\\[" + ut + "*(" + lt + ")" + ut + "*(?:([*^$|!~]?=)" + ut + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + dt + ")|)|)" + ut + "*\\]",
                    pt = ":(" + lt + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + ft.replace(3, 8) + ")*)|.*)\\)|)",
                    ht = new RegExp("^" + ut + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ut + "+$", "g"),
                    mt = new RegExp("^" + ut + "*," + ut + "*"),
                    gt = new RegExp("^" + ut + "*([>+~]|" + ut + ")" + ut + "*"),
                    vt = new RegExp(ut + "*[+~]"),
                    yt = new RegExp("=" + ut + "*([^\\]'\"]*)" + ut + "*\\]", "g"),
                    bt = new RegExp(pt),
                    wt = new RegExp("^" + dt + "$"),
                    xt = {
                        ID: new RegExp("^#(" + lt + ")"),
                        CLASS: new RegExp("^\\.(" + lt + ")"),
                        TAG: new RegExp("^(" + lt.replace("w", "w*") + ")"),
                        ATTR: new RegExp("^" + ft),
                        PSEUDO: new RegExp("^" + pt),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ut + "*(even|odd|(([+-]|)(\\d*)n|)" + ut + "*(?:([+-]|)" + ut + "*(\\d+)|))" + ut + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + st + ")$", "i"),
                        needsContext: new RegExp("^" + ut + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ut + "*((?:-\\d)?\\d*)" + ut + "*\\)|)(?=[^-]|$)", "i")
                    },
                    $t = /^[^{]+\{\s*\[native \w/,
                    kt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    _t = /^(?:input|select|textarea|button)$/i,
                    Ct = /^h\d$/i,
                    Et = /'|\\/g,
                    St = new RegExp("\\\\([\\da-f]{1,6}" + ut + "?|(" + ut + ")|.)", "ig"),
                    Tt = function(e, t, n) {
                        var i = "0x" + t - 65536;
                        return i !== i || n ? t : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(55296 | i >> 10, 56320 | 1023 & i)
                    };
                try {
                    rt.apply(tt = ot.call(W.childNodes), W.childNodes), tt[W.childNodes.length].nodeType
                } catch (Pt) {
                    rt = {
                        apply: tt.length ? function(e, t) {
                            it.apply(e, ot.call(t))
                        } : function(e, t) {
                            for (var n = e.length, i = 0; e[n++] = t[i++];);
                            e.length = n - 1
                        }
                    }
                }
                I = n.isXML = function(e) {
                    var t = e && (e.ownerDocument || e).documentElement;
                    return t ? "HTML" !== t.nodeName : !1
                }, S = n.support = {}, L = n.setDocument = function(e) {
                    var t = e ? e.ownerDocument || e : W;
                    return t !== j && 9 === t.nodeType && t.documentElement ? (j = t, O = t.documentElement, F = !I(t), S.attributes = a(function(e) {
                        return e.innerHTML = "<a href='#'></a>", s("type|href|height|width", l, "#" === e.firstChild.getAttribute("href")), s(st, u, null == e.getAttribute("disabled")), e.className = "i", !e.getAttribute("className")
                    }), S.input = a(function(e) {
                        return e.innerHTML = "<input>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
                    }), s("value", c, S.attributes && S.input), S.getElementsByTagName = a(function(e) {
                        return e.appendChild(t.createComment("")), !e.getElementsByTagName("*").length
                    }), S.getElementsByClassName = a(function(e) {
                        return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
                    }), S.getById = a(function(e) {
                        return O.appendChild(e).id = q, !t.getElementsByName || !t.getElementsByName(q).length
                    }), S.getById ? (P.find.ID = function(e, t) {
                        if (typeof t.getElementById !== J && F) {
                            var n = t.getElementById(e);
                            return n && n.parentNode ? [n] : []
                        }
                    }, P.filter.ID = function(e) {
                        var t = e.replace(St, Tt);
                        return function(e) {
                            return e.getAttribute("id") === t
                        }
                    }) : (delete P.find.ID, P.filter.ID = function(e) {
                        var t = e.replace(St, Tt);
                        return function(e) {
                            var n = typeof e.getAttributeNode !== J && e.getAttributeNode("id");
                            return n && n.value === t
                        }
                    }), P.find.TAG = S.getElementsByTagName ? function(e, t) {
                        return typeof t.getElementsByTagName !== J ? t.getElementsByTagName(e) : void 0
                    } : function(e, t) {
                        var n, i = [],
                            r = 0,
                            o = t.getElementsByTagName(e);
                        if ("*" === e) {
                            for (; n = o[r++];) 1 === n.nodeType && i.push(n);
                            return i
                        }
                        return o
                    }, P.find.CLASS = S.getElementsByClassName && function(e, t) {
                        return typeof t.getElementsByClassName !== J && F ? t.getElementsByClassName(e) : void 0
                    }, z = [], B = [], (S.qsa = i(t.querySelectorAll)) && (a(function(e) {
                        e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || B.push("\\[" + ut + "*(?:value|" + st + ")"), e.querySelectorAll(":checked").length || B.push(":checked")
                    }), a(function(e) {
                        var n = t.createElement("input");
                        n.setAttribute("type", "hidden"), e.appendChild(n).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && B.push("[*^$]=" + ut + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || B.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), B.push(",.*:")
                    })), (S.matchesSelector = i(R = O.webkitMatchesSelector || O.mozMatchesSelector || O.oMatchesSelector || O.msMatchesSelector)) && a(function(e) {
                        S.disconnectedMatch = R.call(e, "div"), R.call(e, "[s!='']:x"), z.push("!=", pt)
                    }), B = B.length && new RegExp(B.join("|")), z = z.length && new RegExp(z.join("|")), H = i(O.contains) || O.compareDocumentPosition ? function(e, t) {
                        var n = 9 === e.nodeType ? e.documentElement : e,
                            i = t && t.parentNode;
                        return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
                    } : function(e, t) {
                        if (t)
                            for (; t = t.parentNode;)
                                if (t === e) return !0;
                        return !1
                    }, S.sortDetached = a(function(e) {
                        return 1 & e.compareDocumentPosition(t.createElement("div"))
                    }), G = O.compareDocumentPosition ? function(e, n) {
                        if (e === n) return K = !0, 0;
                        var i = n.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(n);
                        return i ? 1 & i || !S.sortDetached && n.compareDocumentPosition(e) === i ? e === t || H(W, e) ? -1 : n === t || H(W, n) ? 1 : M ? at.call(M, e) - at.call(M, n) : 0 : 4 & i ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
                    } : function(e, n) {
                        var i, r = 0,
                            o = e.parentNode,
                            a = n.parentNode,
                            s = [e],
                            u = [n];
                        if (e === n) return K = !0, 0;
                        if (!o || !a) return e === t ? -1 : n === t ? 1 : o ? -1 : a ? 1 : M ? at.call(M, e) - at.call(M, n) : 0;
                        if (o === a) return d(e, n);
                        for (i = e; i = i.parentNode;) s.unshift(i);
                        for (i = n; i = i.parentNode;) u.unshift(i);
                        for (; s[r] === u[r];) r++;
                        return r ? d(s[r], u[r]) : s[r] === W ? -1 : u[r] === W ? 1 : 0
                    }, t) : j
                }, n.matches = function(e, t) {
                    return n(e, null, null, t)
                }, n.matchesSelector = function(e, t) {
                    if ((e.ownerDocument || e) !== j && L(e), t = t.replace(yt, "='$1']"), !(!S.matchesSelector || !F || z && z.test(t) || B && B.test(t))) try {
                        var i = R.call(e, t);
                        if (i || S.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
                    } catch (r) {}
                    return n(t, j, null, [e]).length > 0
                }, n.contains = function(e, t) {
                    return (e.ownerDocument || e) !== j && L(e), H(e, t)
                }, n.attr = function(e, n) {
                    (e.ownerDocument || e) !== j && L(e);
                    var i = P.attrHandle[n.toLowerCase()],
                        r = i && et.call(P.attrHandle, n.toLowerCase()) ? i(e, n, !F) : t;
                    return r === t ? S.attributes || !F ? e.getAttribute(n) : (r = e.getAttributeNode(n)) && r.specified ? r.value : null : r
                }, n.error = function(e) {
                    throw new Error("Syntax error, unrecognized expression: " + e)
                }, n.uniqueSort = function(e) {
                    var t, n = [],
                        i = 0,
                        r = 0;
                    if (K = !S.detectDuplicates, M = !S.sortStable && e.slice(0), e.sort(G), K) {
                        for (; t = e[r++];) t === e[r] && (i = n.push(r));
                        for (; i--;) e.splice(n[i], 1)
                    }
                    return e
                }, A = n.getText = function(e) {
                    var t, n = "",
                        i = 0,
                        r = e.nodeType;
                    if (r) {
                        if (1 === r || 9 === r || 11 === r) {
                            if ("string" == typeof e.textContent) return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling) n += A(e)
                        } else if (3 === r || 4 === r) return e.nodeValue
                    } else
                        for (; t = e[i]; i++) n += A(t);
                    return n
                }, P = n.selectors = {
                    cacheLength: 50,
                    createPseudo: o,
                    match: xt,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(e) {
                            return e[1] = e[1].replace(St, Tt), e[3] = (e[4] || e[5] || "").replace(St, Tt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                        },
                        CHILD: function(e) {
                            return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || n.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && n.error(e[0]), e
                        },
                        PSEUDO: function(e) {
                            var n, i = !e[5] && e[2];
                            return xt.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : i && bt.test(i) && (n = m(i, !0)) && (n = i.indexOf(")", i.length - n) - i.length) && (e[0] = e[0].slice(0, n), e[2] = i.slice(0, n)), e.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(e) {
                            var t = e.replace(St, Tt).toLowerCase();
                            return "*" === e ? function() {
                                return !0
                            } : function(e) {
                                return e.nodeName && e.nodeName.toLowerCase() === t
                            }
                        },
                        CLASS: function(e) {
                            var t = X[e + " "];
                            return t || (t = new RegExp("(^|" + ut + ")" + e + "(" + ut + "|$)")) && X(e, function(e) {
                                return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== J && e.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(e, t, i) {
                            return function(r) {
                                var o = n.attr(r, e);
                                return null == o ? "!=" === t : t ? (o += "", "=" === t ? o === i : "!=" === t ? o !== i : "^=" === t ? i && 0 === o.indexOf(i) : "*=" === t ? i && o.indexOf(i) > -1 : "$=" === t ? i && o.slice(-i.length) === i : "~=" === t ? (" " + o + " ").indexOf(i) > -1 : "|=" === t ? o === i || o.slice(0, i.length + 1) === i + "-" : !1) : !0
                            }
                        },
                        CHILD: function(e, t, n, i, r) {
                            var o = "nth" !== e.slice(0, 3),
                                a = "last" !== e.slice(-4),
                                s = "of-type" === t;
                            return 1 === i && 0 === r ? function(e) {
                                return !!e.parentNode
                            } : function(t, n, u) {
                                var l, c, d, f, p, h, m = o !== a ? "nextSibling" : "previousSibling",
                                    g = t.parentNode,
                                    v = s && t.nodeName.toLowerCase(),
                                    y = !u && !s;
                                if (g) {
                                    if (o) {
                                        for (; m;) {
                                            for (d = t; d = d[m];)
                                                if (s ? d.nodeName.toLowerCase() === v : 1 === d.nodeType) return !1;
                                            h = m = "only" === e && !h && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (h = [a ? g.firstChild : g.lastChild], a && y) {
                                        for (c = g[q] || (g[q] = {}), l = c[e] || [], p = l[0] === V && l[1], f = l[0] === V && l[2], d = p && g.childNodes[p]; d = ++p && d && d[m] || (f = p = 0) || h.pop();)
                                            if (1 === d.nodeType && ++f && d === t) {
                                                c[e] = [V, p, f];
                                                break
                                            }
                                    } else if (y && (l = (t[q] || (t[q] = {}))[e]) && l[0] === V) f = l[1];
                                    else
                                        for (;
                                            (d = ++p && d && d[m] || (f = p = 0) || h.pop()) && ((s ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++f || (y && ((d[q] || (d[q] = {}))[e] = [V, f]), d !== t)););
                                    return f -= r, f === i || 0 === f % i && f / i >= 0
                                }
                            }
                        },
                        PSEUDO: function(e, t) {
                            var i, r = P.pseudos[e] || P.setFilters[e.toLowerCase()] || n.error("unsupported pseudo: " + e);
                            return r[q] ? r(t) : r.length > 1 ? (i = [e, e, "", t], P.setFilters.hasOwnProperty(e.toLowerCase()) ? o(function(e, n) {
                                for (var i, o = r(e, t), a = o.length; a--;) i = at.call(e, o[a]), e[i] = !(n[i] = o[a])
                            }) : function(e) {
                                return r(e, 0, i)
                            }) : r
                        }
                    },
                    pseudos: {
                        not: o(function(e) {
                            var t = [],
                                n = [],
                                i = N(e.replace(ht, "$1"));
                            return i[q] ? o(function(e, t, n, r) {
                                for (var o, a = i(e, null, r, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                            }) : function(e, r, o) {
                                return t[0] = e, i(t, null, o, n), !n.pop()
                            }
                        }),
                        has: o(function(e) {
                            return function(t) {
                                return n(e, t).length > 0
                            }
                        }),
                        contains: o(function(e) {
                            return function(t) {
                                return (t.textContent || t.innerText || A(t)).indexOf(e) > -1
                            }
                        }),
                        lang: o(function(e) {
                            return wt.test(e || "") || n.error("unsupported lang: " + e), e = e.replace(St, Tt).toLowerCase(),
                                function(t) {
                                    var n;
                                    do
                                        if (n = F ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
                                    while ((t = t.parentNode) && 1 === t.nodeType);
                                    return !1
                                }
                        }),
                        target: function(t) {
                            var n = e.location && e.location.hash;
                            return n && n.slice(1) === t.id
                        },
                        root: function(e) {
                            return e === O
                        },
                        focus: function(e) {
                            return e === j.activeElement && (!j.hasFocus || j.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                        },
                        enabled: function(e) {
                            return e.disabled === !1
                        },
                        disabled: function(e) {
                            return e.disabled === !0
                        },
                        checked: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && !!e.checked || "option" === t && !!e.selected
                        },
                        selected: function(e) {
                            return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                        },
                        empty: function(e) {
                            for (e = e.firstChild; e; e = e.nextSibling)
                                if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
                            return !0
                        },
                        parent: function(e) {
                            return !P.pseudos.empty(e)
                        },
                        header: function(e) {
                            return Ct.test(e.nodeName)
                        },
                        input: function(e) {
                            return _t.test(e.nodeName)
                        },
                        button: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && "button" === e.type || "button" === t
                        },
                        text: function(e) {
                            var t;
                            return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
                        },
                        first: h(function() {
                            return [0]
                        }),
                        last: h(function(e, t) {
                            return [t - 1]
                        }),
                        eq: h(function(e, t, n) {
                            return [0 > n ? n + t : n]
                        }),
                        even: h(function(e, t) {
                            for (var n = 0; t > n; n += 2) e.push(n);
                            return e
                        }),
                        odd: h(function(e, t) {
                            for (var n = 1; t > n; n += 2) e.push(n);
                            return e
                        }),
                        lt: h(function(e, t, n) {
                            for (var i = 0 > n ? n + t : n; --i >= 0;) e.push(i);
                            return e
                        }),
                        gt: h(function(e, t, n) {
                            for (var i = 0 > n ? n + t : n; ++i < t;) e.push(i);
                            return e
                        })
                    }
                };
                for (E in {
                        radio: !0,
                        checkbox: !0,
                        file: !0,
                        password: !0,
                        image: !0
                    }) P.pseudos[E] = f(E);
                for (E in {
                        submit: !0,
                        reset: !0
                    }) P.pseudos[E] = p(E);
                N = n.compile = function(e, t) {
                    var n, i = [],
                        r = [],
                        o = Y[e + " "];
                    if (!o) {
                        for (t || (t = m(e)), n = t.length; n--;) o = x(t[n]), o[q] ? i.push(o) : r.push(o);
                        o = Y(e, $(r, i))
                    }
                    return o
                }, P.pseudos.nth = P.pseudos.eq, C.prototype = P.filters = P.pseudos, P.setFilters = new C, S.sortStable = q.split("").sort(G).join("") === q, L(), [0, 0].sort(G), S.detectDuplicates = K, ct.find = n, ct.expr = n.selectors, ct.expr[":"] = ct.expr.pseudos, ct.unique = n.uniqueSort, ct.text = n.getText, ct.isXMLDoc = n.isXML, ct.contains = n.contains
            }(e);
        var Ct = {};
        ct.Callbacks = function(e) {
            e = "string" == typeof e ? Ct[e] || i(e) : ct.extend({}, e);
            var n, r, o, a, s, u, l = [],
                c = !e.once && [],
                d = function(t) {
                    for (r = e.memory && t, o = !0, s = u || 0, u = 0, a = l.length, n = !0; l && a > s; s++)
                        if (l[s].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                            r = !1;
                            break
                        }
                    n = !1, l && (c ? c.length && d(c.shift()) : r ? l = [] : f.disable())
                },
                f = {
                    add: function() {
                        if (l) {
                            var t = l.length;
                            ! function i(t) {
                                ct.each(t, function(t, n) {
                                    var r = ct.type(n);
                                    "function" === r ? e.unique && f.has(n) || l.push(n) : n && n.length && "string" !== r && i(n)
                                })
                            }(arguments), n ? a = l.length : r && (u = t, d(r))
                        }
                        return this
                    },
                    remove: function() {
                        return l && ct.each(arguments, function(e, t) {
                            for (var i;
                                (i = ct.inArray(t, l, i)) > -1;) l.splice(i, 1), n && (a >= i && a--, s >= i && s--)
                        }), this
                    },
                    has: function(e) {
                        return e ? ct.inArray(e, l) > -1 : !(!l || !l.length)
                    },
                    empty: function() {
                        return l = [], a = 0, this
                    },
                    disable: function() {
                        return l = c = r = t, this
                    },
                    disabled: function() {
                        return !l
                    },
                    lock: function() {
                        return c = t, r || f.disable(), this
                    },
                    locked: function() {
                        return !c
                    },
                    fireWith: function(e, t) {
                        return t = t || [], t = [e, t.slice ? t.slice() : t], !l || o && !c || (n ? c.push(t) : d(t)), this
                    },
                    fire: function() {
                        return f.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!o
                    }
                };
            return f
        }, ct.extend({
            Deferred: function(e) {
                var t = [
                        ["resolve", "done", ct.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", ct.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", ct.Callbacks("memory")]
                    ],
                    n = "pending",
                    i = {
                        state: function() {
                            return n
                        },
                        always: function() {
                            return r.done(arguments).fail(arguments), this
                        },
                        then: function() {
                            var e = arguments;
                            return ct.Deferred(function(n) {
                                ct.each(t, function(t, o) {
                                    var a = o[0],
                                        s = ct.isFunction(e[t]) && e[t];
                                    r[o[1]](function() {
                                        var e = s && s.apply(this, arguments);
                                        e && ct.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === i ? n.promise() : this, s ? [e] : arguments)
                                    })
                                }), e = null
                            }).promise()
                        },
                        promise: function(e) {
                            return null != e ? ct.extend(e, i) : i
                        }
                    },
                    r = {};
                return i.pipe = i.then, ct.each(t, function(e, o) {
                    var a = o[2],
                        s = o[3];
                    i[o[1]] = a.add, s && a.add(function() {
                        n = s
                    }, t[1 ^ e][2].disable, t[2][2].lock), r[o[0]] = function() {
                        return r[o[0] + "With"](this === r ? i : this, arguments), this
                    }, r[o[0] + "With"] = a.fireWith
                }), i.promise(r), e && e.call(r, r), r
            },
            when: function(e) {
                var t, n, i, r = 0,
                    o = ot.call(arguments),
                    a = o.length,
                    s = 1 !== a || e && ct.isFunction(e.promise) ? a : 0,
                    u = 1 === s ? e : ct.Deferred(),
                    l = function(e, n, i) {
                        return function(r) {
                            n[e] = this, i[e] = arguments.length > 1 ? ot.call(arguments) : r, i === t ? u.notifyWith(n, i) : --s || u.resolveWith(n, i)
                        }
                    };
                if (a > 1)
                    for (t = new Array(a), n = new Array(a), i = new Array(a); a > r; r++) o[r] && ct.isFunction(o[r].promise) ? o[r].promise().done(l(r, i, o)).fail(u.reject).progress(l(r, n, t)) : --s;
                return s || u.resolveWith(i, o), u.promise()
            }
        }), ct.support = function(t) {
            var n, i, r, o, a, s, u, l, c, d = K.createElement("div");
            if (d.setAttribute("className", "t"), d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = d.getElementsByTagName("*") || [], i = d.getElementsByTagName("a")[0], !i || !i.style || !n.length) return t;
            o = K.createElement("select"), s = o.appendChild(K.createElement("option")), r = d.getElementsByTagName("input")[0], i.style.cssText = "top:1px;float:left;opacity:.5", t.getSetAttribute = "t" !== d.className, t.leadingWhitespace = 3 === d.firstChild.nodeType, t.tbody = !d.getElementsByTagName("tbody").length, t.htmlSerialize = !!d.getElementsByTagName("link").length, t.style = /top/.test(i.getAttribute("style")), t.hrefNormalized = "/a" === i.getAttribute("href"), t.opacity = /^0.5/.test(i.style.opacity), t.cssFloat = !!i.style.cssFloat, t.checkOn = !!r.value, t.optSelected = s.selected, t.enctype = !!K.createElement("form").enctype, t.html5Clone = "<:nav></:nav>" !== K.createElement("nav").cloneNode(!0).outerHTML, t.inlineBlockNeedsLayout = !1, t.shrinkWrapBlocks = !1, t.pixelPosition = !1, t.deleteExpando = !0, t.noCloneEvent = !0, t.reliableMarginRight = !0, t.boxSizingReliable = !0, r.checked = !0, t.noCloneChecked = r.cloneNode(!0).checked, o.disabled = !0, t.optDisabled = !s.disabled;
            try {
                delete d.test
            } catch (f) {
                t.deleteExpando = !1
            }
            r = K.createElement("input"), r.setAttribute("value", ""), t.input = "" === r.getAttribute("value"), r.value = "t", r.setAttribute("type", "radio"), t.radioValue = "t" === r.value, r.setAttribute("checked", "t"), r.setAttribute("name", "t"), a = K.createDocumentFragment(), a.appendChild(r), t.appendChecked = r.checked, t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, d.attachEvent && (d.attachEvent("onclick", function() {
                t.noCloneEvent = !1
            }), d.cloneNode(!0).click());
            for (c in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                }) d.setAttribute(u = "on" + c, "t"), t[c + "Bubbles"] = u in e || d.attributes[u].expando === !1;
            d.style.backgroundClip = "content-box", d.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === d.style.backgroundClip;
            for (c in ct(t)) break;
            return t.ownLast = "0" !== c, ct(function() {
                var n, i, r, o = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                    a = K.getElementsByTagName("body")[0];
                a && (n = K.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", a.appendChild(n).appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", r = d.getElementsByTagName("td"), r[0].style.cssText = "padding:0;margin:0;border:0;display:none", l = 0 === r[0].offsetHeight, r[0].style.display = "", r[1].style.display = "none", t.reliableHiddenOffsets = l && 0 === r[0].offsetHeight, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", ct.swap(a, null != a.style.zoom ? {
                    zoom: 1
                } : {}, function() {
                    t.boxSizing = 4 === d.offsetWidth
                }), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(d, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(d, null) || {
                    width: "4px"
                }).width, i = d.appendChild(K.createElement("div")), i.style.cssText = d.style.cssText = o, i.style.marginRight = i.style.width = "0", d.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(i, null) || {}).marginRight)), typeof d.style.zoom !== Q && (d.innerHTML = "", d.style.cssText = o + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === d.offsetWidth, d.style.display = "block", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== d.offsetWidth, t.inlineBlockNeedsLayout && (a.style.zoom = 1)), a.removeChild(n), n = d = r = i = null)
            }), n = o = a = s = i = r = null, t
        }({});
        var Et = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
            St = /([A-Z])/g;
        ct.extend({
            cache: {},
            noData: {
                applet: !0,
                embed: !0,
                object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
            },
            hasData: function(e) {
                return e = e.nodeType ? ct.cache[e[ct.expando]] : e[ct.expando], !!e && !s(e)
            },
            data: function(e, t, n) {
                return r(e, t, n)
            },
            removeData: function(e, t) {
                return o(e, t)
            },
            _data: function(e, t, n) {
                return r(e, t, n, !0)
            },
            _removeData: function(e, t) {
                return o(e, t, !0)
            },
            acceptData: function(e) {
                if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) return !1;
                var t = e.nodeName && ct.noData[e.nodeName.toLowerCase()];
                return !t || t !== !0 && e.getAttribute("classid") === t
            }
        }), ct.fn.extend({
            data: function(e, n) {
                var i, r, o = null,
                    s = 0,
                    u = this[0];
                if (e === t) {
                    if (this.length && (o = ct.data(u), 1 === u.nodeType && !ct._data(u, "parsedAttrs"))) {
                        for (i = u.attributes; s < i.length; s++) r = i[s].name, 0 === r.indexOf("data-") && (r = ct.camelCase(r.slice(5)), a(u, r, o[r]));
                        ct._data(u, "parsedAttrs", !0)
                    }
                    return o
                }
                return "object" == typeof e ? this.each(function() {
                    ct.data(this, e)
                }) : arguments.length > 1 ? this.each(function() {
                    ct.data(this, e, n)
                }) : u ? a(u, e, ct.data(u, e)) : null
            },
            removeData: function(e) {
                return this.each(function() {
                    ct.removeData(this, e)
                })
            }
        }), ct.extend({
            queue: function(e, t, n) {
                var i;
                return e ? (t = (t || "fx") + "queue", i = ct._data(e, t), n && (!i || ct.isArray(n) ? i = ct._data(e, t, ct.makeArray(n)) : i.push(n)), i || []) : void 0
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var n = ct.queue(e, t),
                    i = n.length,
                    r = n.shift(),
                    o = ct._queueHooks(e, t),
                    a = function() {
                        ct.dequeue(e, t)
                    };
                "inprogress" === r && (r = n.shift(), i--), o.cur = r, r && ("fx" === t && n.unshift("inprogress"), delete o.stop, r.call(e, a, o)), !i && o && o.empty.fire()
            },
            _queueHooks: function(e, t) {
                var n = t + "queueHooks";
                return ct._data(e, n) || ct._data(e, n, {
                    empty: ct.Callbacks("once memory").add(function() {
                        ct._removeData(e, t + "queue"), ct._removeData(e, n)
                    })
                })
            }
        }), ct.fn.extend({
            queue: function(e, n) {
                var i = 2;
                return "string" != typeof e && (n = e, e = "fx", i--), arguments.length < i ? ct.queue(this[0], e) : n === t ? this : this.each(function() {
                    var t = ct.queue(this, e, n);
                    ct._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && ct.dequeue(this, e)
                })
            },
            dequeue: function(e) {
                return this.each(function() {
                    ct.dequeue(this, e)
                })
            },
            delay: function(e, t) {
                return e = ct.fx ? ct.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                    var i = setTimeout(t, e);
                    n.stop = function() {
                        clearTimeout(i)
                    }
                })
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            },
            promise: function(e, n) {
                var i, r = 1,
                    o = ct.Deferred(),
                    a = this,
                    s = this.length,
                    u = function() {
                        --r || o.resolveWith(a, [a])
                    };
                for ("string" != typeof e && (n = e, e = t), e = e || "fx"; s--;) i = ct._data(a[s], e + "queueHooks"), i && i.empty && (r++, i.empty.add(u));
                return u(), o.promise(n)
            }
        });
        var Tt, Pt, At = /[\t\r\n\f]/g,
            It = /\r/g,
            Nt = /^(?:input|select|textarea|button|object)$/i,
            Dt = /^(?:a|area)$/i,
            Mt = /^(?:checked|selected)$/i,
            Lt = ct.support.getSetAttribute,
            jt = ct.support.input;
        ct.fn.extend({
            attr: function(e, t) {
                return ct.access(this, ct.attr, e, t, arguments.length > 1)
            },
            removeAttr: function(e) {
                return this.each(function() {
                    ct.removeAttr(this, e)
                })
            },
            prop: function(e, t) {
                return ct.access(this, ct.prop, e, t, arguments.length > 1)
            },
            removeProp: function(e) {
                return e = ct.propFix[e] || e, this.each(function() {
                    try {
                        this[e] = t, delete this[e]
                    } catch (n) {}
                })
            },
            addClass: function(e) {
                var t, n, i, r, o, a = 0,
                    s = this.length,
                    u = "string" == typeof e && e;
                if (ct.isFunction(e)) return this.each(function(t) {
                    ct(this).addClass(e.call(this, t, this.className))
                });
                if (u)
                    for (t = (e || "").match(ft) || []; s > a; a++)
                        if (n = this[a], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(At, " ") : " ")) {
                            for (o = 0; r = t[o++];) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                            n.className = ct.trim(i)
                        }
                return this
            },
            removeClass: function(e) {
                var t, n, i, r, o, a = 0,
                    s = this.length,
                    u = 0 === arguments.length || "string" == typeof e && e;
                if (ct.isFunction(e)) return this.each(function(t) {
                    ct(this).removeClass(e.call(this, t, this.className))
                });
                if (u)
                    for (t = (e || "").match(ft) || []; s > a; a++)
                        if (n = this[a], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(At, " ") : "")) {
                            for (o = 0; r = t[o++];)
                                for (; i.indexOf(" " + r + " ") >= 0;) i = i.replace(" " + r + " ", " ");
                            n.className = e ? ct.trim(i) : ""
                        }
                return this
            },
            toggleClass: function(e, t) {
                var n = typeof e,
                    i = "boolean" == typeof t;
                return ct.isFunction(e) ? this.each(function(n) {
                    ct(this).toggleClass(e.call(this, n, this.className, t), t)
                }) : this.each(function() {
                    if ("string" === n)
                        for (var r, o = 0, a = ct(this), s = t, u = e.match(ft) || []; r = u[o++];) s = i ? s : !a.hasClass(r), a[s ? "addClass" : "removeClass"](r);
                    else(n === Q || "boolean" === n) && (this.className && ct._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ct._data(this, "__className__") || "")
                })
            },
            hasClass: function(e) {
                for (var t = " " + e + " ", n = 0, i = this.length; i > n; n++)
                    if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(At, " ").indexOf(t) >= 0) return !0;
                return !1
            },
            val: function(e) {
                var n, i, r, o = this[0]; {
                    if (arguments.length) return r = ct.isFunction(e), this.each(function(n) {
                        var o;
                        1 === this.nodeType && (o = r ? e.call(this, n, ct(this).val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : ct.isArray(o) && (o = ct.map(o, function(e) {
                            return null == e ? "" : e + ""
                        })), i = ct.valHooks[this.type] || ct.valHooks[this.nodeName.toLowerCase()], i && "set" in i && i.set(this, o, "value") !== t || (this.value = o))
                    });
                    if (o) return i = ct.valHooks[o.type] || ct.valHooks[o.nodeName.toLowerCase()], i && "get" in i && (n = i.get(o, "value")) !== t ? n : (n = o.value, "string" == typeof n ? n.replace(It, "") : null == n ? "" : n)
                }
            }
        }), ct.extend({
            valHooks: {
                option: {
                    get: function(e) {
                        var t = ct.find.attr(e, "value");
                        return null != t ? t : e.text
                    }
                },
                select: {
                    get: function(e) {
                        for (var t, n, i = e.options, r = e.selectedIndex, o = "select-one" === e.type || 0 > r, a = o ? null : [], s = o ? r + 1 : i.length, u = 0 > r ? s : o ? r : 0; s > u; u++)
                            if (n = i[u], !(!n.selected && u !== r || (ct.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && ct.nodeName(n.parentNode, "optgroup"))) {
                                if (t = ct(n).val(), o) return t;
                                a.push(t)
                            }
                        return a
                    },
                    set: function(e, t) {
                        for (var n, i, r = e.options, o = ct.makeArray(t), a = r.length; a--;) i = r[a], (i.selected = ct.inArray(ct(i).val(), o) >= 0) && (n = !0);
                        return n || (e.selectedIndex = -1), o
                    }
                }
            },
            attr: function(e, n, i) {
                var r, o, a = e.nodeType;
                if (e && 3 !== a && 8 !== a && 2 !== a) return typeof e.getAttribute === Q ? ct.prop(e, n, i) : (1 === a && ct.isXMLDoc(e) || (n = n.toLowerCase(), r = ct.attrHooks[n] || (ct.expr.match.bool.test(n) ? Pt : Tt)), i === t ? r && "get" in r && null !== (o = r.get(e, n)) ? o : (o = ct.find.attr(e, n), null == o ? t : o) : null !== i ? r && "set" in r && (o = r.set(e, i, n)) !== t ? o : (e.setAttribute(n, i + ""), i) : (ct.removeAttr(e, n), void 0))
            },
            removeAttr: function(e, t) {
                var n, i, r = 0,
                    o = t && t.match(ft);
                if (o && 1 === e.nodeType)
                    for (; n = o[r++];) i = ct.propFix[n] || n, ct.expr.match.bool.test(n) ? jt && Lt || !Mt.test(n) ? e[i] = !1 : e[ct.camelCase("default-" + n)] = e[i] = !1 : ct.attr(e, n, ""), e.removeAttribute(Lt ? n : i)
            },
            attrHooks: {
                type: {
                    set: function(e, t) {
                        if (!ct.support.radioValue && "radio" === t && ct.nodeName(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t), n && (e.value = n), t
                        }
                    }
                }
            },
            propFix: {
                "for": "htmlFor",
                "class": "className"
            },
            prop: function(e, n, i) {
                var r, o, a, s = e.nodeType;
                if (e && 3 !== s && 8 !== s && 2 !== s) return a = 1 !== s || !ct.isXMLDoc(e), a && (n = ct.propFix[n] || n, o = ct.propHooks[n]), i !== t ? o && "set" in o && (r = o.set(e, i, n)) !== t ? r : e[n] = i : o && "get" in o && null !== (r = o.get(e, n)) ? r : e[n]
            },
            propHooks: {
                tabIndex: {
                    get: function(e) {
                        var t = ct.find.attr(e, "tabindex");
                        return t ? parseInt(t, 10) : Nt.test(e.nodeName) || Dt.test(e.nodeName) && e.href ? 0 : -1
                    }
                }
            }
        }), Pt = {
            set: function(e, t, n) {
                return t === !1 ? ct.removeAttr(e, n) : jt && Lt || !Mt.test(n) ? e.setAttribute(!Lt && ct.propFix[n] || n, n) : e[ct.camelCase("default-" + n)] = e[n] = !0, n
            }
        }, ct.each(ct.expr.match.bool.source.match(/\w+/g), function(e, n) {
            var i = ct.expr.attrHandle[n] || ct.find.attr;
            ct.expr.attrHandle[n] = jt && Lt || !Mt.test(n) ? function(e, n, r) {
                var o = ct.expr.attrHandle[n],
                    a = r ? t : (ct.expr.attrHandle[n] = t) != i(e, n, r) ? n.toLowerCase() : null;
                return ct.expr.attrHandle[n] = o, a
            } : function(e, n, i) {
                return i ? t : e[ct.camelCase("default-" + n)] ? n.toLowerCase() : null
            }
        }), jt && Lt || (ct.attrHooks.value = {
            set: function(e, t, n) {
                return ct.nodeName(e, "input") ? (e.defaultValue = t, void 0) : Tt && Tt.set(e, t, n)
            }
        }), Lt || (Tt = {
            set: function(e, n, i) {
                var r = e.getAttributeNode(i);
                return r || e.setAttributeNode(r = e.ownerDocument.createAttribute(i)), r.value = n += "", "value" === i || n === e.getAttribute(i) ? n : t
            }
        }, ct.expr.attrHandle.id = ct.expr.attrHandle.name = ct.expr.attrHandle.coords = function(e, n, i) {
            var r;
            return i ? t : (r = e.getAttributeNode(n)) && "" !== r.value ? r.value : null
        }, ct.valHooks.button = {
            get: function(e, n) {
                var i = e.getAttributeNode(n);
                return i && i.specified ? i.value : t
            },
            set: Tt.set
        }, ct.attrHooks.contenteditable = {
            set: function(e, t, n) {
                Tt.set(e, "" === t ? !1 : t, n)
            }
        }, ct.each(["width", "height"], function(e, t) {
            ct.attrHooks[t] = {
                set: function(e, n) {
                    return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
                }
            }
        })), ct.support.hrefNormalized || ct.each(["href", "src"], function(e, t) {
            ct.propHooks[t] = {
                get: function(e) {
                    return e.getAttribute(t, 4)
                }
            }
        }), ct.support.style || (ct.attrHooks.style = {
            get: function(e) {
                return e.style.cssText || t
            },
            set: function(e, t) {
                return e.style.cssText = t + ""
            }
        }), ct.support.optSelected || (ct.propHooks.selected = {
            get: function(e) {
                var t = e.parentNode;
                return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
            }
        }), ct.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            ct.propFix[this.toLowerCase()] = this
        }), ct.support.enctype || (ct.propFix.enctype = "encoding"), ct.each(["radio", "checkbox"], function() {
            ct.valHooks[this] = {
                set: function(e, t) {
                    return ct.isArray(t) ? e.checked = ct.inArray(ct(e).val(), t) >= 0 : void 0
                }
            }, ct.support.checkOn || (ct.valHooks[this].get = function(e) {
                return null === e.getAttribute("value") ? "on" : e.value
            })
        });
        var Ot = /^(?:input|select|textarea)$/i,
            Ft = /^key/,
            Bt = /^(?:mouse|contextmenu)|click/,
            zt = /^(?:focusinfocus|focusoutblur)$/,
            Rt = /^([^.]*)(?:\.(.+)|)$/;
        ct.event = {
            global: {},
            add: function(e, n, i, r, o) {
                var a, s, u, l, c, d, f, p, h, m, g, v = ct._data(e);
                if (v) {
                    for (i.handler && (l = i, i = l.handler, o = l.selector), i.guid || (i.guid = ct.guid++), (s = v.events) || (s = v.events = {}), (d = v.handle) || (d = v.handle = function(e) {
                            return typeof ct === Q || e && ct.event.triggered === e.type ? t : ct.event.dispatch.apply(d.elem, arguments)
                        }, d.elem = e), n = (n || "").match(ft) || [""], u = n.length; u--;) a = Rt.exec(n[u]) || [], h = g = a[1], m = (a[2] || "").split(".").sort(), h && (c = ct.event.special[h] || {}, h = (o ? c.delegateType : c.bindType) || h, c = ct.event.special[h] || {}, f = ct.extend({
                        type: h,
                        origType: g,
                        data: r,
                        handler: i,
                        guid: i.guid,
                        selector: o,
                        needsContext: o && ct.expr.match.needsContext.test(o),
                        namespace: m.join(".")
                    }, l), (p = s[h]) || (p = s[h] = [], p.delegateCount = 0, c.setup && c.setup.call(e, r, m, d) !== !1 || (e.addEventListener ? e.addEventListener(h, d, !1) : e.attachEvent && e.attachEvent("on" + h, d))), c.add && (c.add.call(e, f), f.handler.guid || (f.handler.guid = i.guid)), o ? p.splice(p.delegateCount++, 0, f) : p.push(f), ct.event.global[h] = !0);
                    e = null
                }
            },
            remove: function(e, t, n, i, r) {
                var o, a, s, u, l, c, d, f, p, h, m, g = ct.hasData(e) && ct._data(e);
                if (g && (c = g.events)) {
                    for (t = (t || "").match(ft) || [""], l = t.length; l--;)
                        if (s = Rt.exec(t[l]) || [], p = m = s[1], h = (s[2] || "").split(".").sort(), p) {
                            for (d = ct.event.special[p] || {}, p = (i ? d.delegateType : d.bindType) || p, f = c[p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), u = o = f.length; o--;) a = f[o], !r && m !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || i && i !== a.selector && ("**" !== i || !a.selector) || (f.splice(o, 1), a.selector && f.delegateCount--, d.remove && d.remove.call(e, a));
                            u && !f.length && (d.teardown && d.teardown.call(e, h, g.handle) !== !1 || ct.removeEvent(e, p, g.handle), delete c[p])
                        } else
                            for (p in c) ct.event.remove(e, p + t[l], n, i, !0);
                    ct.isEmptyObject(c) && (delete g.handle, ct._removeData(e, "events"))
                }
            },
            trigger: function(n, i, r, o) {
                var a, s, u, l, c, d, f, p = [r || K],
                    h = ut.call(n, "type") ? n.type : n,
                    m = ut.call(n, "namespace") ? n.namespace.split(".") : [];
                if (u = d = r = r || K, 3 !== r.nodeType && 8 !== r.nodeType && !zt.test(h + ct.event.triggered) && (h.indexOf(".") >= 0 && (m = h.split("."), h = m.shift(), m.sort()), s = h.indexOf(":") < 0 && "on" + h, n = n[ct.expando] ? n : new ct.Event(h, "object" == typeof n && n), n.isTrigger = o ? 2 : 3, n.namespace = m.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = r), i = null == i ? [n] : ct.makeArray(i, [n]), c = ct.event.special[h] || {}, o || !c.trigger || c.trigger.apply(r, i) !== !1)) {
                    if (!o && !c.noBubble && !ct.isWindow(r)) {
                        for (l = c.delegateType || h, zt.test(l + h) || (u = u.parentNode); u; u = u.parentNode) p.push(u), d = u;
                        d === (r.ownerDocument || K) && p.push(d.defaultView || d.parentWindow || e)
                    }
                    for (f = 0;
                        (u = p[f++]) && !n.isPropagationStopped();) n.type = f > 1 ? l : c.bindType || h, a = (ct._data(u, "events") || {})[n.type] && ct._data(u, "handle"), a && a.apply(u, i), a = s && u[s], a && ct.acceptData(u) && a.apply && a.apply(u, i) === !1 && n.preventDefault();
                    if (n.type = h, !o && !n.isDefaultPrevented() && (!c._default || c._default.apply(p.pop(), i) === !1) && ct.acceptData(r) && s && r[h] && !ct.isWindow(r)) {
                        d = r[s], d && (r[s] = null), ct.event.triggered = h;
                        try {
                            r[h]()
                        } catch (g) {}
                        ct.event.triggered = t, d && (r[s] = d)
                    }
                    return n.result
                }
            },
            dispatch: function(e) {
                e = ct.event.fix(e);
                var n, i, r, o, a, s = [],
                    u = ot.call(arguments),
                    l = (ct._data(this, "events") || {})[e.type] || [],
                    c = ct.event.special[e.type] || {};
                if (u[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
                    for (s = ct.event.handlers.call(this, e, l), n = 0;
                        (o = s[n++]) && !e.isPropagationStopped();)
                        for (e.currentTarget = o.elem, a = 0;
                            (r = o.handlers[a++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(r.namespace)) && (e.handleObj = r, e.data = r.data, i = ((ct.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, u), i !== t && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()));
                    return c.postDispatch && c.postDispatch.call(this, e), e.result
                }
            },
            handlers: function(e, n) {
                var i, r, o, a, s = [],
                    u = n.delegateCount,
                    l = e.target;
                if (u && l.nodeType && (!e.button || "click" !== e.type))
                    for (; l != this; l = l.parentNode || this)
                        if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
                            for (o = [], a = 0; u > a; a++) r = n[a], i = r.selector + " ", o[i] === t && (o[i] = r.needsContext ? ct(i, this).index(l) >= 0 : ct.find(i, this, null, [l]).length), o[i] && o.push(r);
                            o.length && s.push({
                                elem: l,
                                handlers: o
                            })
                        }
                return u < n.length && s.push({
                    elem: this,
                    handlers: n.slice(u)
                }), s
            },
            fix: function(e) {
                if (e[ct.expando]) return e;
                var t, n, i, r = e.type,
                    o = e,
                    a = this.fixHooks[r];
                for (a || (this.fixHooks[r] = a = Bt.test(r) ? this.mouseHooks : Ft.test(r) ? this.keyHooks : {}), i = a.props ? this.props.concat(a.props) : this.props, e = new ct.Event(o), t = i.length; t--;) n = i[t], e[n] = o[n];
                return e.target || (e.target = o.srcElement || K), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, a.filter ? a.filter(e, o) : e
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(e, t) {
                    return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(e, n) {
                    var i, r, o, a = n.button,
                        s = n.fromElement;
                    return null == e.pageX && null != n.clientX && (r = e.target.ownerDocument || K, o = r.documentElement, i = r.body, e.pageX = n.clientX + (o && o.scrollLeft || i && i.scrollLeft || 0) - (o && o.clientLeft || i && i.clientLeft || 0), e.pageY = n.clientY + (o && o.scrollTop || i && i.scrollTop || 0) - (o && o.clientTop || i && i.clientTop || 0)), !e.relatedTarget && s && (e.relatedTarget = s === e.target ? n.toElement : s), e.which || a === t || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e
                }
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== c() && this.focus) try {
                            return this.focus(), !1
                        } catch (e) {}
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        return this === c() && this.blur ? (this.blur(), !1) : void 0
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        return ct.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                    },
                    _default: function(e) {
                        return ct.nodeName(e.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(e) {
                        e.result !== t && (e.originalEvent.returnValue = e.result)
                    }
                }
            },
            simulate: function(e, t, n, i) {
                var r = ct.extend(new ct.Event, n, {
                    type: e,
                    isSimulated: !0,
                    originalEvent: {}
                });
                i ? ct.event.trigger(r, null, t) : ct.event.dispatch.call(t, r), r.isDefaultPrevented() && n.preventDefault()
            }
        }, ct.removeEvent = K.removeEventListener ? function(e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n, !1)
        } : function(e, t, n) {
            var i = "on" + t;
            e.detachEvent && (typeof e[i] === Q && (e[i] = null), e.detachEvent(i, n))
        }, ct.Event = function(e, t) {
            return this instanceof ct.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? u : l) : this.type = e, t && ct.extend(this, t), this.timeStamp = e && e.timeStamp || ct.now(), this[ct.expando] = !0, void 0) : new ct.Event(e, t)
        }, ct.Event.prototype = {
            isDefaultPrevented: l,
            isPropagationStopped: l,
            isImmediatePropagationStopped: l,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = u, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = u, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
            },
            stopImmediatePropagation: function() {
                this.isImmediatePropagationStopped = u, this.stopPropagation()
            }
        }, ct.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }, function(e, t) {
            ct.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function(e) {
                    var n, i = this,
                        r = e.relatedTarget,
                        o = e.handleObj;
                    return (!r || r !== i && !ct.contains(i, r)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
                }
            }
        }), ct.support.submitBubbles || (ct.event.special.submit = {
            setup: function() {
                return ct.nodeName(this, "form") ? !1 : (ct.event.add(this, "click._submit keypress._submit", function(e) {
                    var n = e.target,
                        i = ct.nodeName(n, "input") || ct.nodeName(n, "button") ? n.form : t;
                    i && !ct._data(i, "submitBubbles") && (ct.event.add(i, "submit._submit", function(e) {
                        e._submit_bubble = !0
                    }), ct._data(i, "submitBubbles", !0))
                }), void 0)
            },
            postDispatch: function(e) {
                e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && ct.event.simulate("submit", this.parentNode, e, !0))
            },
            teardown: function() {
                return ct.nodeName(this, "form") ? !1 : (ct.event.remove(this, "._submit"), void 0)
            }
        }), ct.support.changeBubbles || (ct.event.special.change = {
            setup: function() {
                return Ot.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ct.event.add(this, "propertychange._change", function(e) {
                    "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
                }), ct.event.add(this, "click._change", function(e) {
                    this._just_changed && !e.isTrigger && (this._just_changed = !1), ct.event.simulate("change", this, e, !0)
                })), !1) : (ct.event.add(this, "beforeactivate._change", function(e) {
                    var t = e.target;
                    Ot.test(t.nodeName) && !ct._data(t, "changeBubbles") && (ct.event.add(t, "change._change", function(e) {
                        !this.parentNode || e.isSimulated || e.isTrigger || ct.event.simulate("change", this.parentNode, e, !0)
                    }), ct._data(t, "changeBubbles", !0))
                }), void 0)
            },
            handle: function(e) {
                var t = e.target;
                return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
            },
            teardown: function() {
                return ct.event.remove(this, "._change"), !Ot.test(this.nodeName)
            }
        }), ct.support.focusinBubbles || ct.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            var n = 0,
                i = function(e) {
                    ct.event.simulate(t, e.target, ct.event.fix(e), !0)
                };
            ct.event.special[t] = {
                setup: function() {
                    0 === n++ && K.addEventListener(e, i, !0)
                },
                teardown: function() {
                    0 === --n && K.removeEventListener(e, i, !0)
                }
            }
        }), ct.fn.extend({
            on: function(e, n, i, r, o) {
                var a, s;
                if ("object" == typeof e) {
                    "string" != typeof n && (i = i || n, n = t);
                    for (a in e) this.on(a, n, i, e[a], o);
                    return this
                }
                if (null == i && null == r ? (r = n, i = n = t) : null == r && ("string" == typeof n ? (r = i, i = t) : (r = i, i = n, n = t)), r === !1) r = l;
                else if (!r) return this;
                return 1 === o && (s = r, r = function(e) {
                    return ct().off(e), s.apply(this, arguments)
                }, r.guid = s.guid || (s.guid = ct.guid++)), this.each(function() {
                    ct.event.add(this, e, r, i, n)
                })
            },
            one: function(e, t, n, i) {
                return this.on(e, t, n, i, 1)
            },
            off: function(e, n, i) {
                var r, o;
                if (e && e.preventDefault && e.handleObj) return r = e.handleObj, ct(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                if ("object" == typeof e) {
                    for (o in e) this.off(o, n, e[o]);
                    return this
                }
                return (n === !1 || "function" == typeof n) && (i = n, n = t), i === !1 && (i = l), this.each(function() {
                    ct.event.remove(this, e, i, n)
                })
            },
            trigger: function(e, t) {
                return this.each(function() {
                    ct.event.trigger(e, t, this)
                })
            },
            triggerHandler: function(e, t) {
                var n = this[0];
                return n ? ct.event.trigger(e, t, n, !0) : void 0
            }
        });
        var Ht = /^.[^:#\[\.,]*$/,
            qt = /^(?:parents|prev(?:Until|All))/,
            Wt = ct.expr.match.needsContext,
            Vt = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        ct.fn.extend({
            find: function(e) {
                var t, n = [],
                    i = this,
                    r = i.length;
                if ("string" != typeof e) return this.pushStack(ct(e).filter(function() {
                    for (t = 0; r > t; t++)
                        if (ct.contains(i[t], this)) return !0
                }));
                for (t = 0; r > t; t++) ct.find(e, i[t], n);
                return n = this.pushStack(r > 1 ? ct.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
            },
            has: function(e) {
                var t, n = ct(e, this),
                    i = n.length;
                return this.filter(function() {
                    for (t = 0; i > t; t++)
                        if (ct.contains(this, n[t])) return !0
                })
            },
            not: function(e) {
                return this.pushStack(f(this, e || [], !0))
            },
            filter: function(e) {
                return this.pushStack(f(this, e || [], !1))
            },
            is: function(e) {
                return !!f(this, "string" == typeof e && Wt.test(e) ? ct(e) : e || [], !1).length
            },
            closest: function(e, t) {
                for (var n, i = 0, r = this.length, o = [], a = Wt.test(e) || "string" != typeof e ? ct(e, t || this.context) : 0; r > i; i++)
                    for (n = this[i]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && ct.find.matchesSelector(n, e))) {
                            n = o.push(n);
                            break
                        }
                return this.pushStack(o.length > 1 ? ct.unique(o) : o)
            },
            index: function(e) {
                return e ? "string" == typeof e ? ct.inArray(this[0], ct(e)) : ct.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(e, t) {
                var n = "string" == typeof e ? ct(e, t) : ct.makeArray(e && e.nodeType ? [e] : e),
                    i = ct.merge(this.get(), n);
                return this.pushStack(ct.unique(i))
            },
            addBack: function(e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
            }
        }), ct.each({
            parent: function(e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            },
            parents: function(e) {
                return ct.dir(e, "parentNode")
            },
            parentsUntil: function(e, t, n) {
                return ct.dir(e, "parentNode", n)
            },
            next: function(e) {
                return d(e, "nextSibling")
            },
            prev: function(e) {
                return d(e, "previousSibling")
            },
            nextAll: function(e) {
                return ct.dir(e, "nextSibling")
            },
            prevAll: function(e) {
                return ct.dir(e, "previousSibling")
            },
            nextUntil: function(e, t, n) {
                return ct.dir(e, "nextSibling", n)
            },
            prevUntil: function(e, t, n) {
                return ct.dir(e, "previousSibling", n)
            },
            siblings: function(e) {
                return ct.sibling((e.parentNode || {}).firstChild, e)
            },
            children: function(e) {
                return ct.sibling(e.firstChild)
            },
            contents: function(e) {
                return ct.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ct.merge([], e.childNodes)
            }
        }, function(e, t) {
            ct.fn[e] = function(n, i) {
                var r = ct.map(this, t, n);
                return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (r = ct.filter(i, r)), this.length > 1 && (Vt[e] || (r = ct.unique(r)), qt.test(e) && (r = r.reverse())), this.pushStack(r)
            }
        }), ct.extend({
            filter: function(e, t, n) {
                var i = t[0];
                return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? ct.find.matchesSelector(i, e) ? [i] : [] : ct.find.matches(e, ct.grep(t, function(e) {
                    return 1 === e.nodeType
                }))
            },
            dir: function(e, n, i) {
                for (var r = [], o = e[n]; o && 9 !== o.nodeType && (i === t || 1 !== o.nodeType || !ct(o).is(i));) 1 === o.nodeType && r.push(o), o = o[n];
                return r
            },
            sibling: function(e, t) {
                for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                return n
            }
        });
        var Ut = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            Xt = / jQuery\d+="(?:null|\d+)"/g,
            Qt = new RegExp("<(?:" + Ut + ")[\\s/>]", "i"),
            Yt = /^\s+/,
            Kt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            Gt = /<([\w:]+)/,
            Jt = /<tbody/i,
            Zt = /<|&#?\w+;/,
            en = /<(?:script|style|link)/i,
            tn = /^(?:checkbox|radio)$/i,
            nn = /checked\s*(?:[^=]|=\s*.checked.)/i,
            rn = /^$|\/(?:java|ecma)script/i,
            on = /^true\/(.*)/,
            an = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            sn = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                area: [1, "<map>", "</map>"],
                param: [1, "<object>", "</object>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: ct.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
            },
            un = p(K),
            ln = un.appendChild(K.createElement("div"));
        sn.optgroup = sn.option, sn.tbody = sn.tfoot = sn.colgroup = sn.caption = sn.thead, sn.th = sn.td, ct.fn.extend({
            text: function(e) {
                return ct.access(this, function(e) {
                    return e === t ? ct.text(this) : this.empty().append((this[0] && this[0].ownerDocument || K).createTextNode(e))
                }, null, e, arguments.length)
            },
            append: function() {
                return this.domManip(arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = h(this, e);
                        t.appendChild(e)
                    }
                })
            },
            prepend: function() {
                return this.domManip(arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = h(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                })
            },
            before: function() {
                return this.domManip(arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            },
            after: function() {
                return this.domManip(arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            },
            remove: function(e, t) {
                for (var n, i = e ? ct.filter(e, this) : this, r = 0; null != (n = i[r]); r++) t || 1 !== n.nodeType || ct.cleanData(w(n)), n.parentNode && (t && ct.contains(n.ownerDocument, n) && v(w(n, "script")), n.parentNode.removeChild(n));
                return this
            },
            empty: function() {
                for (var e, t = 0; null != (e = this[t]); t++) {
                    for (1 === e.nodeType && ct.cleanData(w(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
                    e.options && ct.nodeName(e, "select") && (e.options.length = 0)
                }
                return this
            },
            clone: function(e, t) {
                return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                    return ct.clone(this, e, t)
                })
            },
            html: function(e) {
                return ct.access(this, function(e) {
                    var n = this[0] || {},
                        i = 0,
                        r = this.length;
                    if (e === t) return 1 === n.nodeType ? n.innerHTML.replace(Xt, "") : t;
                    if (!("string" != typeof e || en.test(e) || !ct.support.htmlSerialize && Qt.test(e) || !ct.support.leadingWhitespace && Yt.test(e) || sn[(Gt.exec(e) || ["", ""])[1].toLowerCase()])) {
                        e = e.replace(Kt, "<$1></$2>");
                        try {
                            for (; r > i; i++) n = this[i] || {}, 1 === n.nodeType && (ct.cleanData(w(n, !1)), n.innerHTML = e);
                            n = 0
                        } catch (o) {}
                    }
                    n && this.empty().append(e)
                }, null, e, arguments.length)
            },
            replaceWith: function() {
                var e = ct.map(this, function(e) {
                        return [e.nextSibling, e.parentNode]
                    }),
                    t = 0;
                return this.domManip(arguments, function(n) {
                    var i = e[t++],
                        r = e[t++];
                    r && (i && i.parentNode !== r && (i = this.nextSibling), ct(this).remove(), r.insertBefore(n, i))
                }, !0), t ? this : this.remove()
            },
            detach: function(e) {
                return this.remove(e, !0)
            },
            domManip: function(e, t, n) {
                e = it.apply([], e);
                var i, r, o, a, s, u, l = 0,
                    c = this.length,
                    d = this,
                    f = c - 1,
                    p = e[0],
                    h = ct.isFunction(p);
                if (h || !(1 >= c || "string" != typeof p || ct.support.checkClone) && nn.test(p)) return this.each(function(i) {
                    var r = d.eq(i);
                    h && (e[0] = p.call(this, i, r.html())), r.domManip(e, t, n)
                });
                if (c && (u = ct.buildFragment(e, this[0].ownerDocument, !1, !n && this), i = u.firstChild, 1 === u.childNodes.length && (u = i), i)) {
                    for (a = ct.map(w(u, "script"), m), o = a.length; c > l; l++) r = u, l !== f && (r = ct.clone(r, !0, !0), o && ct.merge(a, w(r, "script"))), t.call(this[l], r, l);
                    if (o)
                        for (s = a[a.length - 1].ownerDocument, ct.map(a, g), l = 0; o > l; l++) r = a[l], rn.test(r.type || "") && !ct._data(r, "globalEval") && ct.contains(s, r) && (r.src ? ct._evalUrl(r.src) : ct.globalEval((r.text || r.textContent || r.innerHTML || "").replace(an, "")));
                    u = i = null
                }
                return this
            }
        }), ct.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(e, t) {
            ct.fn[e] = function(e) {
                for (var n, i = 0, r = [], o = ct(e), a = o.length - 1; a >= i; i++) n = i === a ? this : this.clone(!0), ct(o[i])[t](n), rt.apply(r, n.get());
                return this.pushStack(r)
            }
        }), ct.extend({
            clone: function(e, t, n) {
                var i, r, o, a, s, u = ct.contains(e.ownerDocument, e);
                if (ct.support.html5Clone || ct.isXMLDoc(e) || !Qt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (ln.innerHTML = e.outerHTML, ln.removeChild(o = ln.firstChild)), !(ct.support.noCloneEvent && ct.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ct.isXMLDoc(e)))
                    for (i = w(o), s = w(e), a = 0; null != (r = s[a]); ++a) i[a] && b(r, i[a]);
                if (t)
                    if (n)
                        for (s = s || w(e), i = i || w(o), a = 0; null != (r = s[a]); a++) y(r, i[a]);
                    else y(e, o);
                return i = w(o, "script"), i.length > 0 && v(i, !u && w(e, "script")), i = s = r = null, o
            },
            buildFragment: function(e, t, n, i) {
                for (var r, o, a, s, u, l, c, d = e.length, f = p(t), h = [], m = 0; d > m; m++)
                    if (o = e[m], o || 0 === o)
                        if ("object" === ct.type(o)) ct.merge(h, o.nodeType ? [o] : o);
                        else if (Zt.test(o)) {
                    for (s = s || f.appendChild(t.createElement("div")), u = (Gt.exec(o) || ["", ""])[1].toLowerCase(), c = sn[u] || sn._default, s.innerHTML = c[1] + o.replace(Kt, "<$1></$2>") + c[2], r = c[0]; r--;) s = s.lastChild;
                    if (!ct.support.leadingWhitespace && Yt.test(o) && h.push(t.createTextNode(Yt.exec(o)[0])), !ct.support.tbody)
                        for (o = "table" !== u || Jt.test(o) ? "<table>" !== c[1] || Jt.test(o) ? 0 : s : s.firstChild, r = o && o.childNodes.length; r--;) ct.nodeName(l = o.childNodes[r], "tbody") && !l.childNodes.length && o.removeChild(l);
                    for (ct.merge(h, s.childNodes), s.textContent = ""; s.firstChild;) s.removeChild(s.firstChild);
                    s = f.lastChild
                } else h.push(t.createTextNode(o));
                for (s && f.removeChild(s), ct.support.appendChecked || ct.grep(w(h, "input"), x), m = 0; o = h[m++];)
                    if ((!i || -1 === ct.inArray(o, i)) && (a = ct.contains(o.ownerDocument, o), s = w(f.appendChild(o), "script"), a && v(s), n))
                        for (r = 0; o = s[r++];) rn.test(o.type || "") && n.push(o);
                return s = null, f
            },
            cleanData: function(e, t) {
                for (var n, i, r, o, a = 0, s = ct.expando, u = ct.cache, l = ct.support.deleteExpando, c = ct.event.special; null != (n = e[a]); a++)
                    if ((t || ct.acceptData(n)) && (r = n[s], o = r && u[r])) {
                        if (o.events)
                            for (i in o.events) c[i] ? ct.event.remove(n, i) : ct.removeEvent(n, i, o.handle);
                        u[r] && (delete u[r], l ? delete n[s] : typeof n.removeAttribute !== Q ? n.removeAttribute(s) : n[s] = null, tt.push(r))
                    }
            },
            _evalUrl: function(e) {
                return ct.ajax({
                    url: e,
                    type: "GET",
                    dataType: "script",
                    async: !1,
                    global: !1,
                    "throws": !0
                })
            }
        }), ct.fn.extend({
            wrapAll: function(e) {
                if (ct.isFunction(e)) return this.each(function(t) {
                    ct(this).wrapAll(e.call(this, t))
                });
                if (this[0]) {
                    var t = ct(e, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                        for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                        return e
                    }).append(this)
                }
                return this
            },
            wrapInner: function(e) {
                return ct.isFunction(e) ? this.each(function(t) {
                    ct(this).wrapInner(e.call(this, t))
                }) : this.each(function() {
                    var t = ct(this),
                        n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                })
            },
            wrap: function(e) {
                var t = ct.isFunction(e);
                return this.each(function(n) {
                    ct(this).wrapAll(t ? e.call(this, n) : e)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    ct.nodeName(this, "body") || ct(this).replaceWith(this.childNodes)
                }).end()
            }
        });
        var cn, dn, fn, pn = /alpha\([^)]*\)/i,
            hn = /opacity\s*=\s*([^)]*)/,
            mn = /^(top|right|bottom|left)$/,
            gn = /^(none|table(?!-c[ea]).+)/,
            vn = /^margin/,
            yn = new RegExp("^(" + dt + ")(.*)$", "i"),
            bn = new RegExp("^(" + dt + ")(?!px)[a-z%]+$", "i"),
            wn = new RegExp("^([+-])=(" + dt + ")", "i"),
            xn = {
                BODY: "block"
            },
            $n = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            kn = {
                letterSpacing: 0,
                fontWeight: 400
            },
            _n = ["Top", "Right", "Bottom", "Left"],
            Cn = ["Webkit", "O", "Moz", "ms"];
        ct.fn.extend({
            css: function(e, n) {
                return ct.access(this, function(e, n, i) {
                    var r, o, a = {},
                        s = 0;
                    if (ct.isArray(n)) {
                        for (o = dn(e), r = n.length; r > s; s++) a[n[s]] = ct.css(e, n[s], !1, o);
                        return a
                    }
                    return i !== t ? ct.style(e, n, i) : ct.css(e, n)
                }, e, n, arguments.length > 1)
            },
            show: function() {
                return _(this, !0)
            },
            hide: function() {
                return _(this)
            },
            toggle: function(e) {
                var t = "boolean" == typeof e;
                return this.each(function() {
                    (t ? e : k(this)) ? ct(this).show(): ct(this).hide()
                })
            }
        }), ct.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            var n = fn(e, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                columnCount: !0,
                fillOpacity: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": ct.support.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function(e, n, i, r) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var o, a, s, u = ct.camelCase(n),
                        l = e.style;
                    if (n = ct.cssProps[u] || (ct.cssProps[u] = $(l, u)), s = ct.cssHooks[n] || ct.cssHooks[u], i === t) return s && "get" in s && (o = s.get(e, !1, r)) !== t ? o : l[n];
                    if (a = typeof i, "string" === a && (o = wn.exec(i)) && (i = (o[1] + 1) * o[2] + parseFloat(ct.css(e, n)), a = "number"), !(null == i || "number" === a && isNaN(i) || ("number" !== a || ct.cssNumber[u] || (i += "px"), ct.support.clearCloneStyle || "" !== i || 0 !== n.indexOf("background") || (l[n] = "inherit"), s && "set" in s && (i = s.set(e, i, r)) === t))) try {
                        l[n] = i
                    } catch (c) {}
                }
            },
            css: function(e, n, i, r) {
                var o, a, s, u = ct.camelCase(n);
                return n = ct.cssProps[u] || (ct.cssProps[u] = $(e.style, u)), s = ct.cssHooks[n] || ct.cssHooks[u], s && "get" in s && (a = s.get(e, !0, i)), a === t && (a = fn(e, n, r)), "normal" === a && n in kn && (a = kn[n]), "" === i || i ? (o = parseFloat(a), i === !0 || ct.isNumeric(o) ? o || 0 : a) : a
            }
        }), e.getComputedStyle ? (dn = function(t) {
            return e.getComputedStyle(t, null)
        }, fn = function(e, n, i) {
            var r, o, a, s = i || dn(e),
                u = s ? s.getPropertyValue(n) || s[n] : t,
                l = e.style;
            return s && ("" !== u || ct.contains(e.ownerDocument, e) || (u = ct.style(e, n)), bn.test(u) && vn.test(n) && (r = l.width, o = l.minWidth, a = l.maxWidth, l.minWidth = l.maxWidth = l.width = u, u = s.width, l.width = r, l.minWidth = o, l.maxWidth = a)), u
        }) : K.documentElement.currentStyle && (dn = function(e) {
            return e.currentStyle
        }, fn = function(e, n, i) {
            var r, o, a, s = i || dn(e),
                u = s ? s[n] : t,
                l = e.style;
            return null == u && l && l[n] && (u = l[n]), bn.test(u) && !mn.test(n) && (r = l.left, o = e.runtimeStyle, a = o && o.left, a && (o.left = e.currentStyle.left), l.left = "fontSize" === n ? "1em" : u, u = l.pixelLeft + "px", l.left = r, a && (o.left = a)), "" === u ? "auto" : u
        }), ct.each(["height", "width"], function(e, t) {
            ct.cssHooks[t] = {
                get: function(e, n, i) {
                    return n ? 0 === e.offsetWidth && gn.test(ct.css(e, "display")) ? ct.swap(e, $n, function() {
                        return S(e, t, i)
                    }) : S(e, t, i) : void 0
                },
                set: function(e, n, i) {
                    var r = i && dn(e);
                    return C(e, n, i ? E(e, t, i, ct.support.boxSizing && "border-box" === ct.css(e, "boxSizing", !1, r), r) : 0)
                }
            }
        }), ct.support.opacity || (ct.cssHooks.opacity = {
            get: function(e, t) {
                return hn.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
            },
            set: function(e, t) {
                var n = e.style,
                    i = e.currentStyle,
                    r = ct.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                    o = i && i.filter || n.filter || "";
                n.zoom = 1, (t >= 1 || "" === t) && "" === ct.trim(o.replace(pn, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || i && !i.filter) || (n.filter = pn.test(o) ? o.replace(pn, r) : o + " " + r)
            }
        }), ct(function() {
            ct.support.reliableMarginRight || (ct.cssHooks.marginRight = {
                get: function(e, t) {
                    return t ? ct.swap(e, {
                        display: "inline-block"
                    }, fn, [e, "marginRight"]) : void 0
                }
            }), !ct.support.pixelPosition && ct.fn.position && ct.each(["top", "left"], function(e, t) {
                ct.cssHooks[t] = {
                    get: function(e, n) {
                        return n ? (n = fn(e, t), bn.test(n) ? ct(e).position()[t] + "px" : n) : void 0
                    }
                }
            })
        }), ct.expr && ct.expr.filters && (ct.expr.filters.hidden = function(e) {
            return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ct.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || ct.css(e, "display"))
        }, ct.expr.filters.visible = function(e) {
            return !ct.expr.filters.hidden(e)
        }), ct.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(e, t) {
            ct.cssHooks[e + t] = {
                expand: function(n) {
                    for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++) r[e + _n[i] + t] = o[i] || o[i - 2] || o[0];
                    return r
                }
            }, vn.test(e) || (ct.cssHooks[e + t].set = C)
        });
        var En = /%20/g,
            Sn = /\[\]$/,
            Tn = /\r?\n/g,
            Pn = /^(?:submit|button|image|reset|file)$/i,
            An = /^(?:input|select|textarea|keygen)/i;
        ct.fn.extend({
            serialize: function() {
                return ct.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var e = ct.prop(this, "elements");
                    return e ? ct.makeArray(e) : this
                }).filter(function() {
                    var e = this.type;
                    return this.name && !ct(this).is(":disabled") && An.test(this.nodeName) && !Pn.test(e) && (this.checked || !tn.test(e))
                }).map(function(e, t) {
                    var n = ct(this).val();
                    return null == n ? null : ct.isArray(n) ? ct.map(n, function(e) {
                        return {
                            name: t.name,
                            value: e.replace(Tn, "\r\n")
                        }
                    }) : {
                        name: t.name,
                        value: n.replace(Tn, "\r\n")
                    }
                }).get()
            }
        }), ct.param = function(e, n) {
            var i, r = [],
                o = function(e, t) {
                    t = ct.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                };
            if (n === t && (n = ct.ajaxSettings && ct.ajaxSettings.traditional), ct.isArray(e) || e.jquery && !ct.isPlainObject(e)) ct.each(e, function() {
                o(this.name, this.value)
            });
            else
                for (i in e) A(i, e[i], n, o);
            return r.join("&").replace(En, "+")
        }, ct.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
            ct.fn[t] = function(e, n) {
                return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
            }
        }), ct.fn.extend({
            hover: function(e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            },
            bind: function(e, t, n) {
                return this.on(e, null, t, n)
            },
            unbind: function(e, t) {
                return this.off(e, null, t)
            },
            delegate: function(e, t, n, i) {
                return this.on(t, e, n, i)
            },
            undelegate: function(e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
            }
        });
        var In, Nn, Dn = ct.now(),
            Mn = /\?/,
            Ln = /#.*$/,
            jn = /([?&])_=[^&]*/,
            On = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
            Fn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            Bn = /^(?:GET|HEAD)$/,
            zn = /^\/\//,
            Rn = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
            Hn = ct.fn.load,
            qn = {},
            Wn = {},
            Vn = "*/".concat("*");
        try {
            Nn = Y.href
        } catch (Un) {
            Nn = K.createElement("a"), Nn.href = "", Nn = Nn.href
        }
        In = Rn.exec(Nn.toLowerCase()) || [], ct.fn.load = function(e, n, i) {
            if ("string" != typeof e && Hn) return Hn.apply(this, arguments);
            var r, o, a, s = this,
                u = e.indexOf(" ");
            return u >= 0 && (r = e.slice(u, e.length), e = e.slice(0, u)), ct.isFunction(n) ? (i = n, n = t) : n && "object" == typeof n && (a = "POST"), s.length > 0 && ct.ajax({
                url: e,
                type: a,
                dataType: "html",
                data: n
            }).done(function(e) {
                o = arguments, s.html(r ? ct("<div>").append(ct.parseHTML(e)).find(r) : e)
            }).complete(i && function(e, t) {
                s.each(i, o || [e.responseText, t, e])
            }), this
        }, ct.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
            ct.fn[t] = function(e) {
                return this.on(t, e)
            }
        }), ct.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: Nn,
                type: "GET",
                isLocal: Fn.test(In[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Vn,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": ct.parseJSON,
                    "text xml": ct.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(e, t) {
                return t ? D(D(e, ct.ajaxSettings), t) : D(ct.ajaxSettings, e)
            },
            ajaxPrefilter: I(qn),
            ajaxTransport: I(Wn),
            ajax: function(e, n) {
                function i(e, n, i, r) {
                    var o, d, y, b, x, k = n;
                    2 !== w && (w = 2, u && clearTimeout(u), c = t, s = r || "", $.readyState = e > 0 ? 4 : 0, o = e >= 200 && 300 > e || 304 === e, i && (b = M(f, $, i)), b = L(f, b, $, o), o ? (f.ifModified && (x = $.getResponseHeader("Last-Modified"), x && (ct.lastModified[a] = x), x = $.getResponseHeader("etag"), x && (ct.etag[a] = x)), 204 === e || "HEAD" === f.type ? k = "nocontent" : 304 === e ? k = "notmodified" : (k = b.state, d = b.data, y = b.error, o = !y)) : (y = k, (e || !k) && (k = "error", 0 > e && (e = 0))), $.status = e, $.statusText = (n || k) + "", o ? m.resolveWith(p, [d, k, $]) : m.rejectWith(p, [$, k, y]), $.statusCode(v), v = t, l && h.trigger(o ? "ajaxSuccess" : "ajaxError", [$, f, o ? d : y]), g.fireWith(p, [$, k]), l && (h.trigger("ajaxComplete", [$, f]), --ct.active || ct.event.trigger("ajaxStop")))
                }
                "object" == typeof e && (n = e, e = t), n = n || {};
                var r, o, a, s, u, l, c, d, f = ct.ajaxSetup({}, n),
                    p = f.context || f,
                    h = f.context && (p.nodeType || p.jquery) ? ct(p) : ct.event,
                    m = ct.Deferred(),
                    g = ct.Callbacks("once memory"),
                    v = f.statusCode || {},
                    y = {},
                    b = {},
                    w = 0,
                    x = "canceled",
                    $ = {
                        readyState: 0,
                        getResponseHeader: function(e) {
                            var t;
                            if (2 === w) {
                                if (!d)
                                    for (d = {}; t = On.exec(s);) d[t[1].toLowerCase()] = t[2];
                                t = d[e.toLowerCase()]
                            }
                            return null == t ? null : t
                        },
                        getAllResponseHeaders: function() {
                            return 2 === w ? s : null
                        },
                        setRequestHeader: function(e, t) {
                            var n = e.toLowerCase();
                            return w || (e = b[n] = b[n] || e, y[e] = t), this
                        },
                        overrideMimeType: function(e) {
                            return w || (f.mimeType = e), this
                        },
                        statusCode: function(e) {
                            var t;
                            if (e)
                                if (2 > w)
                                    for (t in e) v[t] = [v[t], e[t]];
                                else $.always(e[$.status]);
                            return this
                        },
                        abort: function(e) {
                            var t = e || x;
                            return c && c.abort(t), i(0, t), this
                        }
                    };
                if (m.promise($).complete = g.add, $.success = $.done, $.error = $.fail, f.url = ((e || f.url || Nn) + "").replace(Ln, "").replace(zn, In[1] + "//"), f.type = n.method || n.type || f.method || f.type, f.dataTypes = ct.trim(f.dataType || "*").toLowerCase().match(ft) || [""], null == f.crossDomain && (r = Rn.exec(f.url.toLowerCase()), f.crossDomain = !(!r || r[1] === In[1] && r[2] === In[2] && (r[3] || ("http:" === r[1] ? "80" : "443")) === (In[3] || ("http:" === In[1] ? "80" : "443")))), f.data && f.processData && "string" != typeof f.data && (f.data = ct.param(f.data, f.traditional)), N(qn, f, n, $), 2 === w) return $;
                l = f.global, l && 0 === ct.active++ && ct.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !Bn.test(f.type), a = f.url, f.hasContent || (f.data && (a = f.url += (Mn.test(a) ? "&" : "?") + f.data, delete f.data), f.cache === !1 && (f.url = jn.test(a) ? a.replace(jn, "$1_=" + Dn++) : a + (Mn.test(a) ? "&" : "?") + "_=" + Dn++)), f.ifModified && (ct.lastModified[a] && $.setRequestHeader("If-Modified-Since", ct.lastModified[a]), ct.etag[a] && $.setRequestHeader("If-None-Match", ct.etag[a])), (f.data && f.hasContent && f.contentType !== !1 || n.contentType) && $.setRequestHeader("Content-Type", f.contentType), $.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + Vn + "; q=0.01" : "") : f.accepts["*"]);
                for (o in f.headers) $.setRequestHeader(o, f.headers[o]);
                if (f.beforeSend && (f.beforeSend.call(p, $, f) === !1 || 2 === w)) return $.abort();
                x = "abort";
                for (o in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) $[o](f[o]);
                if (c = N(Wn, f, n, $)) {
                    $.readyState = 1, l && h.trigger("ajaxSend", [$, f]), f.async && f.timeout > 0 && (u = setTimeout(function() {
                        $.abort("timeout")
                    }, f.timeout));
                    try {
                        w = 1, c.send(y, i)
                    } catch (k) {
                        if (!(2 > w)) throw k;
                        i(-1, k)
                    }
                } else i(-1, "No Transport");
                return $
            },
            getJSON: function(e, t, n) {
                return ct.get(e, t, n, "json")
            },
            getScript: function(e, n) {
                return ct.get(e, t, n, "script")
            }
        }), ct.each(["get", "post"], function(e, n) {
            ct[n] = function(e, i, r, o) {
                return ct.isFunction(i) && (o = o || r, r = i, i = t), ct.ajax({
                    url: e,
                    type: n,
                    dataType: o,
                    data: i,
                    success: r
                })
            }
        }), ct.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function(e) {
                    return ct.globalEval(e), e
                }
            }
        }), ct.ajaxPrefilter("script", function(e) {
            e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
        }), ct.ajaxTransport("script", function(e) {
            if (e.crossDomain) {
                var n, i = K.head || ct("head")[0] || K.documentElement;
                return {
                    send: function(t, r) {
                        n = K.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function(e, t) {
                            (t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || r(200, "success"))
                        }, i.insertBefore(n, i.firstChild)
                    },
                    abort: function() {
                        n && n.onload(t, !0)
                    }
                }
            }
        });
        var Xn = [],
            Qn = /(=)\?(?=&|$)|\?\?/;
        ct.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = Xn.pop() || ct.expando + "_" + Dn++;
                return this[e] = !0, e
            }
        }), ct.ajaxPrefilter("json jsonp", function(n, i, r) {
            var o, a, s, u = n.jsonp !== !1 && (Qn.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Qn.test(n.data) && "data");
            return u || "jsonp" === n.dataTypes[0] ? (o = n.jsonpCallback = ct.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, u ? n[u] = n[u].replace(Qn, "$1" + o) : n.jsonp !== !1 && (n.url += (Mn.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), n.converters["script json"] = function() {
                return s || ct.error(o + " was not called"), s[0]
            }, n.dataTypes[0] = "json", a = e[o], e[o] = function() {
                s = arguments
            }, r.always(function() {
                e[o] = a, n[o] && (n.jsonpCallback = i.jsonpCallback, Xn.push(o)), s && ct.isFunction(a) && a(s[0]), s = a = t
            }), "script") : void 0
        });
        var Yn, Kn, Gn = 0,
            Jn = e.ActiveXObject && function() {
                var e;
                for (e in Yn) Yn[e](t, !0)
            };
        ct.ajaxSettings.xhr = e.ActiveXObject ? function() {
            return !this.isLocal && j() || O()
        } : j, Kn = ct.ajaxSettings.xhr(), ct.support.cors = !!Kn && "withCredentials" in Kn, Kn = ct.support.ajax = !!Kn, Kn && ct.ajaxTransport(function(n) {
            if (!n.crossDomain || ct.support.cors) {
                var i;
                return {
                    send: function(r, o) {
                        var a, s, u = n.xhr();
                        if (n.username ? u.open(n.type, n.url, n.async, n.username, n.password) : u.open(n.type, n.url, n.async), n.xhrFields)
                            for (s in n.xhrFields) u[s] = n.xhrFields[s];
                        n.mimeType && u.overrideMimeType && u.overrideMimeType(n.mimeType), n.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
                        try {
                            for (s in r) u.setRequestHeader(s, r[s])
                        } catch (l) {}
                        u.send(n.hasContent && n.data || null), i = function(e, r) {
                            var s, l, c, d;
                            try {
                                if (i && (r || 4 === u.readyState))
                                    if (i = t, a && (u.onreadystatechange = ct.noop, Jn && delete Yn[a]), r) 4 !== u.readyState && u.abort();
                                    else {
                                        d = {}, s = u.status, l = u.getAllResponseHeaders(), "string" == typeof u.responseText && (d.text = u.responseText);
                                        try {
                                            c = u.statusText
                                        } catch (f) {
                                            c = ""
                                        }
                                        s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = d.text ? 200 : 404
                                    }
                            } catch (p) {
                                r || o(-1, p)
                            }
                            d && o(s, c, d, l)
                        }, n.async ? 4 === u.readyState ? setTimeout(i) : (a = ++Gn, Jn && (Yn || (Yn = {}, ct(e).unload(Jn)), Yn[a] = i), u.onreadystatechange = i) : i()
                    },
                    abort: function() {
                        i && i(t, !0)
                    }
                }
            }
        });
        var Zn, ei, ti = /^(?:toggle|show|hide)$/,
            ni = new RegExp("^(?:([+-])=|)(" + dt + ")([a-z%]*)$", "i"),
            ii = /queueHooks$/,
            ri = [H],
            oi = {
                "*": [function(e, t) {
                    var n = this.createTween(e, t),
                        i = n.cur(),
                        r = ni.exec(t),
                        o = r && r[3] || (ct.cssNumber[e] ? "" : "px"),
                        a = (ct.cssNumber[e] || "px" !== o && +i) && ni.exec(ct.css(n.elem, e)),
                        s = 1,
                        u = 20;
                    if (a && a[3] !== o) {
                        o = o || a[3], r = r || [], a = +i || 1;
                        do s = s || ".5", a /= s, ct.style(n.elem, e, a + o); while (s !== (s = n.cur() / i) && 1 !== s && --u)
                    }
                    return r && (n.unit = o, n.start = +a || +i || 0, n.end = r[1] ? a + (r[1] + 1) * r[2] : +r[2]), n
                }]
            };
        ct.Animation = ct.extend(z, {
            tweener: function(e, t) {
                ct.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
                for (var n, i = 0, r = e.length; r > i; i++) n = e[i], oi[n] = oi[n] || [], oi[n].unshift(t)
            },
            prefilter: function(e, t) {
                t ? ri.unshift(e) : ri.push(e)
            }
        }), ct.Tween = q, q.prototype = {
            constructor: q,
            init: function(e, t, n, i, r, o) {
                this.elem = e, this.prop = n, this.easing = r || "swing", this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = o || (ct.cssNumber[n] ? "" : "px")
            },
            cur: function() {
                var e = q.propHooks[this.prop];
                return e && e.get ? e.get(this) : q.propHooks._default.get(this)
            },
            run: function(e) {
                var t, n = q.propHooks[this.prop];
                return this.pos = t = this.options.duration ? ct.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : q.propHooks._default.set(this), this
            }
        }, q.prototype.init.prototype = q.prototype, q.propHooks = {
            _default: {
                get: function(e) {
                    var t;
                    return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = ct.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
                },
                set: function(e) {
                    ct.fx.step[e.prop] ? ct.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ct.cssProps[e.prop]] || ct.cssHooks[e.prop]) ? ct.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                }
            }
        }, q.propHooks.scrollTop = q.propHooks.scrollLeft = {
            set: function(e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        }, ct.each(["toggle", "show", "hide"], function(e, t) {
            var n = ct.fn[t];
            ct.fn[t] = function(e, i, r) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(W(t, !0), e, i, r)
            }
        }), ct.fn.extend({
            fadeTo: function(e, t, n, i) {
                return this.filter(k).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, i)
            },
            animate: function(e, t, n, i) {
                var r = ct.isEmptyObject(e),
                    o = ct.speed(t, n, i),
                    a = function() {
                        var t = z(this, ct.extend({}, e), o);
                        a.finish = function() {
                            t.stop(!0)
                        }, (r || ct._data(this, "finish")) && t.stop(!0)
                    };
                return a.finish = a, r || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
            },
            stop: function(e, n, i) {
                var r = function(e) {
                    var t = e.stop;
                    delete e.stop, t(i)
                };
                return "string" != typeof e && (i = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                    var t = !0,
                        n = null != e && e + "queueHooks",
                        o = ct.timers,
                        a = ct._data(this);
                    if (n) a[n] && a[n].stop && r(a[n]);
                    else
                        for (n in a) a[n] && a[n].stop && ii.test(n) && r(a[n]);
                    for (n = o.length; n--;) o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(i), t = !1, o.splice(n, 1));
                    (t || !i) && ct.dequeue(this, e)
                })
            },
            finish: function(e) {
                return e !== !1 && (e = e || "fx"), this.each(function() {
                    var t, n = ct._data(this),
                        i = n[e + "queue"],
                        r = n[e + "queueHooks"],
                        o = ct.timers,
                        a = i ? i.length : 0;
                    for (n.finish = !0, ct.queue(this, e, []), r && r.cur && r.cur.finish && r.cur.finish.call(this), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                    for (t = 0; a > t; t++) i[t] && i[t].finish && i[t].finish.call(this);
                    delete n.finish
                })
            }
        }), ct.each({
            slideDown: W("show"),
            slideUp: W("hide"),
            slideToggle: W("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            ct.fn[e] = function(e, n, i) {
                return this.animate(t, e, n, i)
            }
        }), ct.speed = function(e, t, n) {
            var i = e && "object" == typeof e ? ct.extend({}, e) : {
                complete: n || !n && t || ct.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !ct.isFunction(t) && t
            };
            return i.duration = ct.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in ct.fx.speeds ? ct.fx.speeds[i.duration] : ct.fx.speeds._default, (null == i.queue || i.queue === !0) && (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                ct.isFunction(i.old) && i.old.call(this), i.queue && ct.dequeue(this, i.queue)
            }, i
        }, ct.easing = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            }
        }, ct.timers = [], ct.fx = q.prototype.init, ct.fx.tick = function() {
            var e, n = ct.timers,
                i = 0;
            for (Zn = ct.now(); i < n.length; i++) e = n[i], e() || n[i] !== e || n.splice(i--, 1);
            n.length || ct.fx.stop(), Zn = t
        }, ct.fx.timer = function(e) {
            e() && ct.timers.push(e) && ct.fx.start()
        }, ct.fx.interval = 13, ct.fx.start = function() {
            ei || (ei = setInterval(ct.fx.tick, ct.fx.interval))
        }, ct.fx.stop = function() {
            clearInterval(ei), ei = null
        }, ct.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, ct.fx.step = {}, ct.expr && ct.expr.filters && (ct.expr.filters.animated = function(e) {
            return ct.grep(ct.timers, function(t) {
                return e === t.elem
            }).length
        }), ct.fn.offset = function(e) {
            if (arguments.length) return e === t ? this : this.each(function(t) {
                ct.offset.setOffset(this, e, t)
            });
            var n, i, r = {
                    top: 0,
                    left: 0
                },
                o = this[0],
                a = o && o.ownerDocument;
            if (a) return n = a.documentElement, ct.contains(n, o) ? (typeof o.getBoundingClientRect !== Q && (r = o.getBoundingClientRect()), i = V(a), {
                top: r.top + (i.pageYOffset || n.scrollTop) - (n.clientTop || 0),
                left: r.left + (i.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
            }) : r
        }, ct.offset = {
            setOffset: function(e, t, n) {
                var i = ct.css(e, "position");
                "static" === i && (e.style.position = "relative");
                var r, o, a = ct(e),
                    s = a.offset(),
                    u = ct.css(e, "top"),
                    l = ct.css(e, "left"),
                    c = ("absolute" === i || "fixed" === i) && ct.inArray("auto", [u, l]) > -1,
                    d = {},
                    f = {};
                c ? (f = a.position(), r = f.top, o = f.left) : (r = parseFloat(u) || 0, o = parseFloat(l) || 0), ct.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (d.top = t.top - s.top + r), null != t.left && (d.left = t.left - s.left + o), "using" in t ? t.using.call(e, d) : a.css(d)
            }
        }, ct.fn.extend({
            position: function() {
                if (this[0]) {
                    var e, t, n = {
                            top: 0,
                            left: 0
                        },
                        i = this[0];
                    return "fixed" === ct.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ct.nodeName(e[0], "html") || (n = e.offset()), n.top += ct.css(e[0], "borderTopWidth", !0), n.left += ct.css(e[0], "borderLeftWidth", !0)), {
                        top: t.top - n.top - ct.css(i, "marginTop", !0),
                        left: t.left - n.left - ct.css(i, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var e = this.offsetParent || G; e && !ct.nodeName(e, "html") && "static" === ct.css(e, "position");) e = e.offsetParent;
                    return e || G
                })
            }
        }), ct.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(e, n) {
            var i = /Y/.test(n);
            ct.fn[e] = function(r) {
                return ct.access(this, function(e, r, o) {
                    var a = V(e);
                    return o === t ? a ? n in a ? a[n] : a.document.documentElement[r] : e[r] : (a ? a.scrollTo(i ? ct(a).scrollLeft() : o, i ? o : ct(a).scrollTop()) : e[r] = o, void 0)
                }, e, r, arguments.length, null)
            }
        }), ct.each({
            Height: "height",
            Width: "width"
        }, function(e, n) {
            ct.each({
                padding: "inner" + e,
                content: n,
                "": "outer" + e
            }, function(i, r) {
                ct.fn[r] = function(r, o) {
                    var a = arguments.length && (i || "boolean" != typeof r),
                        s = i || (r === !0 || o === !0 ? "margin" : "border");
                    return ct.access(this, function(n, i, r) {
                        var o;
                        return ct.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : r === t ? ct.css(n, i, s) : ct.style(n, i, r, s)
                    }, n, a ? r : t, a, null)
                }
            })
        }), ct.fn.size = function() {
            return this.length
        }, ct.fn.andSelf = ct.fn.addBack, "object" == typeof module && "object" == typeof module.exports ? module.exports = ct : (e.jQuery = e.$ = ct, "function" == typeof define && define.amd && define("jquery", [], function() {
            return ct
        }))
    }(window),
    function(e, t) {
        e.rails !== t && e.error("jquery-ujs has already been loaded!");
        var n;
        e.rails = n = {
            linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
            buttonClickSelector: "button[data-remote]",
            inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
            formSubmitSelector: "form",
            formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
            disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
            enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
            requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
            fileInputSelector: "input[type=file]",
            linkDisableSelector: "a[data-disable-with]",
            CSRFProtection: function(t) {
                var n = e('meta[name="csrf-token"]').attr("content");
                n && t.setRequestHeader("X-CSRF-Token", n)
            },
            fire: function(t, n, i) {
                var r = e.Event(n);
                return t.trigger(r, i), r.result !== !1
            },
            confirm: function(e) {
                return confirm(e)
            },
            ajax: function(t) {
                return e.ajax(t)
            },
            href: function(e) {
                return e.attr("href")
            },
            handleRemote: function(i) {
                var r, o, a, s, u, l, c, d;
                if (n.fire(i, "ajax:before")) {
                    if (s = i.data("cross-domain"), u = s === t ? null : s, l = i.data("with-credentials") || null, c = i.data("type") || e.ajaxSettings && e.ajaxSettings.dataType, i.is("form")) {
                        r = i.attr("method"), o = i.attr("action"), a = i.serializeArray();
                        var f = i.data("ujs:submit-button");
                        f && (a.push(f), i.data("ujs:submit-button", null))
                    } else i.is(n.inputChangeSelector) ? (r = i.data("method"), o = i.data("url"), a = i.serialize(), i.data("params") && (a = a + "&" + i.data("params"))) : i.is(n.buttonClickSelector) ? (r = i.data("method") || "get", o = i.data("url"), a = i.serialize(), i.data("params") && (a = a + "&" + i.data("params"))) : (r = i.data("method"), o = n.href(i), a = i.data("params") || null);
                    d = {
                        type: r || "GET",
                        data: a,
                        dataType: c,
                        beforeSend: function(e, r) {
                            return r.dataType === t && e.setRequestHeader("accept", "*/*;q=0.5, " + r.accepts.script), n.fire(i, "ajax:beforeSend", [e, r])
                        },
                        success: function(e, t, n) {
                            i.trigger("ajax:success", [e, t, n])
                        },
                        complete: function(e, t) {
                            i.trigger("ajax:complete", [e, t])
                        },
                        error: function(e, t, n) {
                            i.trigger("ajax:error", [e, t, n])
                        },
                        crossDomain: u
                    }, l && (d.xhrFields = {
                        withCredentials: l
                    }), o && (d.url = o);
                    var p = n.ajax(d);
                    return i.trigger("ajax:send", p), p
                }
                return !1
            },
            handleMethod: function(i) {
                var r = n.href(i),
                    o = i.data("method"),
                    a = i.attr("target"),
                    s = e("meta[name=csrf-token]").attr("content"),
                    u = e("meta[name=csrf-param]").attr("content"),
                    l = e('<form method="post" action="' + r + '"></form>'),
                    c = '<input name="_method" value="' + o + '" type="hidden" />';
                u !== t && s !== t && (c += '<input name="' + u + '" value="' + s + '" type="hidden" />'), a && l.attr("target", a), l.hide().append(c).appendTo("body"), l.submit()
            },
            disableFormElements: function(t) {
                t.find(n.disableSelector).each(function() {
                    var t = e(this),
                        n = t.is("button") ? "html" : "val";
                    t.data("ujs:enable-with", t[n]()), t[n](t.data("disable-with")), t.prop("disabled", !0)
                })
            },
            enableFormElements: function(t) {
                t.find(n.enableSelector).each(function() {
                    var t = e(this),
                        n = t.is("button") ? "html" : "val";
                    t.data("ujs:enable-with") && t[n](t.data("ujs:enable-with")), t.prop("disabled", !1)
                })
            },
            allowAction: function(e) {
                var t, i = e.data("confirm"),
                    r = !1;
                return i ? (n.fire(e, "confirm") && (r = n.confirm(i), t = n.fire(e, "confirm:complete", [r])), r && t) : !0
            },
            blankInputs: function(t, n, i) {
                var r, o, a = e(),
                    s = n || "input,textarea",
                    u = t.find(s);
                return u.each(function() {
                    if (r = e(this), o = r.is("input[type=checkbox],input[type=radio]") ? r.is(":checked") : r.val(), !o == !i) {
                        if (r.is("input[type=radio]") && u.filter('input[type=radio]:checked[name="' + r.attr("name") + '"]').length) return !0;
                        a = a.add(r)
                    }
                }), a.length ? a : !1
            },
            nonBlankInputs: function(e, t) {
                return n.blankInputs(e, t, !0)
            },
            stopEverything: function(t) {
                return e(t.target).trigger("ujs:everythingStopped"), t.stopImmediatePropagation(), !1
            },
            disableElement: function(e) {
                e.data("ujs:enable-with", e.html()), e.html(e.data("disable-with")), e.bind("click.railsDisable", function(e) {
                    return n.stopEverything(e)
                })
            },
            enableElement: function(e) {
                e.data("ujs:enable-with") !== t && (e.html(e.data("ujs:enable-with")), e.removeData("ujs:enable-with")), e.unbind("click.railsDisable")
            }
        }, n.fire(e(document), "rails:attachBindings") && (e.ajaxPrefilter(function(e, t, i) {
            e.crossDomain || n.CSRFProtection(i)
        }), e(document).delegate(n.linkDisableSelector, "ajax:complete", function() {
            n.enableElement(e(this))
        }), e(document).delegate(n.linkClickSelector, "click.rails", function(i) {
            var r = e(this),
                o = r.data("method"),
                a = r.data("params");
            if (!n.allowAction(r)) return n.stopEverything(i);
            if (r.is(n.linkDisableSelector) && n.disableElement(r), r.data("remote") !== t) {
                if (!(!i.metaKey && !i.ctrlKey || o && "GET" !== o || a)) return !0;
                var s = n.handleRemote(r);
                return s === !1 ? n.enableElement(r) : s.error(function() {
                    n.enableElement(r)
                }), !1
            }
            return r.data("method") ? (n.handleMethod(r), !1) : void 0
        }), e(document).delegate(n.buttonClickSelector, "click.rails", function(t) {
            var i = e(this);
            return n.allowAction(i) ? (n.handleRemote(i), !1) : n.stopEverything(t)
        }), e(document).delegate(n.inputChangeSelector, "change.rails", function(t) {
            var i = e(this);
            return n.allowAction(i) ? (n.handleRemote(i), !1) : n.stopEverything(t)
        }), e(document).delegate(n.formSubmitSelector, "submit.rails", function(i) {
            var r = e(this),
                o = r.data("remote") !== t,
                a = n.blankInputs(r, n.requiredInputSelector),
                s = n.nonBlankInputs(r, n.fileInputSelector);
            if (!n.allowAction(r)) return n.stopEverything(i);
            if (a && r.attr("novalidate") == t && n.fire(r, "ajax:aborted:required", [a])) return n.stopEverything(i);
            if (o) {
                if (s) {
                    setTimeout(function() {
                        n.disableFormElements(r)
                    }, 13);
                    var u = n.fire(r, "ajax:aborted:file", [s]);
                    return u || setTimeout(function() {
                        n.enableFormElements(r)
                    }, 13), u
                }
                return n.handleRemote(r), !1
            }
            setTimeout(function() {
                n.disableFormElements(r)
            }, 13)
        }), e(document).delegate(n.formInputClickSelector, "click.rails", function(t) {
            var i = e(this);
            if (!n.allowAction(i)) return n.stopEverything(t);
            var r = i.attr("name"),
                o = r ? {
                    name: r,
                    value: i.val()
                } : null;
            i.closest("form").data("ujs:submit-button", o)
        }), e(document).delegate(n.formSubmitSelector, "ajax:beforeSend.rails", function(t) {
            this == t.target && n.disableFormElements(e(this))
        }), e(document).delegate(n.formSubmitSelector, "ajax:complete.rails", function(t) {
            this == t.target && n.enableFormElements(e(this))
        }), e(function() {
            var t = e("meta[name=csrf-token]").attr("content"),
                n = e("meta[name=csrf-param]").attr("content");
            e('form input[name="' + n + '"]').val(t)
        }))
    }(jQuery),
    /*! jQuery UI - v1.10.3 - 2013-06-25
     * http://jqueryui.com
     * Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.sortable.js
     * Copyright 2013 jQuery Foundation and other contributors Licensed MIT */
    function(e, t) {
        function n(t, n) {
            var r, o, a, s = t.nodeName.toLowerCase();
            return "area" === s ? (r = t.parentNode, o = r.name, t.href && o && "map" === r.nodeName.toLowerCase() ? (a = e("img[usemap=#" + o + "]")[0], !!a && i(a)) : !1) : (/input|select|textarea|button|object/.test(s) ? !t.disabled : "a" === s ? t.href || n : n) && i(t)
        }

        function i(t) {
            return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
                return "hidden" === e.css(this, "visibility")
            }).length
        }
        var r = 0,
            o = /^ui-id-\d+$/;
        e.ui = e.ui || {}, e.extend(e.ui, {
            version: "1.10.3",
            keyCode: {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38
            }
        }), e.fn.extend({
            focus: function(t) {
                return function(n, i) {
                    return "number" == typeof n ? this.each(function() {
                        var t = this;
                        setTimeout(function() {
                            e(t).focus(), i && i.call(t)
                        }, n)
                    }) : t.apply(this, arguments)
                }
            }(e.fn.focus),
            scrollParent: function() {
                var t;
                return t = e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                    return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
                }).eq(0) : this.parents().filter(function() {
                    return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
                }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t
            },
            zIndex: function(n) {
                if (n !== t) return this.css("zIndex", n);
                if (this.length)
                    for (var i, r, o = e(this[0]); o.length && o[0] !== document;) {
                        if (i = o.css("position"), ("absolute" === i || "relative" === i || "fixed" === i) && (r = parseInt(o.css("zIndex"), 10), !isNaN(r) && 0 !== r)) return r;
                        o = o.parent()
                    }
                return 0
            },
            uniqueId: function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++r)
                })
            },
            removeUniqueId: function() {
                return this.each(function() {
                    o.test(this.id) && e(this).removeAttr("id")
                })
            }
        }), e.extend(e.expr[":"], {
            data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
                return function(n) {
                    return !!e.data(n, t)
                }
            }) : function(t, n, i) {
                return !!e.data(t, i[3])
            },
            focusable: function(t) {
                return n(t, !isNaN(e.attr(t, "tabindex")))
            },
            tabbable: function(t) {
                var i = e.attr(t, "tabindex"),
                    r = isNaN(i);
                return (r || i >= 0) && n(t, !r)
            }
        }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(n, i) {
            function r(t, n, i, r) {
                return e.each(o, function() {
                    n -= parseFloat(e.css(t, "padding" + this)) || 0, i && (n -= parseFloat(e.css(t, "border" + this + "Width")) || 0), r && (n -= parseFloat(e.css(t, "margin" + this)) || 0)
                }), n
            }
            var o = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
                a = i.toLowerCase(),
                s = {
                    innerWidth: e.fn.innerWidth,
                    innerHeight: e.fn.innerHeight,
                    outerWidth: e.fn.outerWidth,
                    outerHeight: e.fn.outerHeight
                };
            e.fn["inner" + i] = function(n) {
                return n === t ? s["inner" + i].call(this) : this.each(function() {
                    e(this).css(a, r(this, n) + "px")
                })
            }, e.fn["outer" + i] = function(t, n) {
                return "number" != typeof t ? s["outer" + i].call(this, t) : this.each(function() {
                    e(this).css(a, r(this, t, !0, n) + "px")
                })
            }
        }), e.fn.addBack || (e.fn.addBack = function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
            return function(n) {
                return arguments.length ? t.call(this, e.camelCase(n)) : t.call(this)
            }
        }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.support.selectstart = "onselectstart" in document.createElement("div"), e.fn.extend({
            disableSelection: function() {
                return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
                    e.preventDefault()
                })
            },
            enableSelection: function() {
                return this.unbind(".ui-disableSelection")
            }
        }), e.extend(e.ui, {
            plugin: {
                add: function(t, n, i) {
                    var r, o = e.ui[t].prototype;
                    for (r in i) o.plugins[r] = o.plugins[r] || [], o.plugins[r].push([n, i[r]])
                },
                call: function(e, t, n) {
                    var i, r = e.plugins[t];
                    if (r && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType)
                        for (i = 0; r.length > i; i++) e.options[r[i][0]] && r[i][1].apply(e.element, n)
                }
            },
            hasScroll: function(t, n) {
                if ("hidden" === e(t).css("overflow")) return !1;
                var i = n && "left" === n ? "scrollLeft" : "scrollTop",
                    r = !1;
                return t[i] > 0 ? !0 : (t[i] = 1, r = t[i] > 0, t[i] = 0, r)
            }
        })
    }(jQuery),
    function(e, t) {
        var n = 0,
            i = Array.prototype.slice,
            r = e.cleanData;
        e.cleanData = function(t) {
            for (var n, i = 0; null != (n = t[i]); i++) try {
                e(n).triggerHandler("remove")
            } catch (o) {}
            r(t)
        }, e.widget = function(n, i, r) {
            var o, a, s, u, l = {},
                c = n.split(".")[0];
            n = n.split(".")[1], o = c + "-" + n, r || (r = i, i = e.Widget), e.expr[":"][o.toLowerCase()] = function(t) {
                return !!e.data(t, o)
            }, e[c] = e[c] || {}, a = e[c][n], s = e[c][n] = function(e, n) {
                return this._createWidget ? (arguments.length && this._createWidget(e, n), t) : new s(e, n)
            }, e.extend(s, a, {
                version: r.version,
                _proto: e.extend({}, r),
                _childConstructors: []
            }), u = new i, u.options = e.widget.extend({}, u.options), e.each(r, function(n, r) {
                return e.isFunction(r) ? (l[n] = function() {
                    var e = function() {
                            return i.prototype[n].apply(this, arguments)
                        },
                        t = function(e) {
                            return i.prototype[n].apply(this, e)
                        };
                    return function() {
                        var n, i = this._super,
                            o = this._superApply;
                        return this._super = e, this._superApply = t, n = r.apply(this, arguments), this._super = i, this._superApply = o, n
                    }
                }(), t) : (l[n] = r, t)
            }), s.prototype = e.widget.extend(u, {
                widgetEventPrefix: a ? u.widgetEventPrefix : n
            }, l, {
                constructor: s,
                namespace: c,
                widgetName: n,
                widgetFullName: o
            }), a ? (e.each(a._childConstructors, function(t, n) {
                var i = n.prototype;
                e.widget(i.namespace + "." + i.widgetName, s, n._proto)
            }), delete a._childConstructors) : i._childConstructors.push(s), e.widget.bridge(n, s)
        }, e.widget.extend = function(n) {
            for (var r, o, a = i.call(arguments, 1), s = 0, u = a.length; u > s; s++)
                for (r in a[s]) o = a[s][r], a[s].hasOwnProperty(r) && o !== t && (n[r] = e.isPlainObject(o) ? e.isPlainObject(n[r]) ? e.widget.extend({}, n[r], o) : e.widget.extend({}, o) : o);
            return n
        }, e.widget.bridge = function(n, r) {
            var o = r.prototype.widgetFullName || n;
            e.fn[n] = function(a) {
                var s = "string" == typeof a,
                    u = i.call(arguments, 1),
                    l = this;
                return a = !s && u.length ? e.widget.extend.apply(null, [a].concat(u)) : a, s ? this.each(function() {
                    var i, r = e.data(this, o);
                    return r ? e.isFunction(r[a]) && "_" !== a.charAt(0) ? (i = r[a].apply(r, u), i !== r && i !== t ? (l = i && i.jquery ? l.pushStack(i.get()) : i, !1) : t) : e.error("no such method '" + a + "' for " + n + " widget instance") : e.error("cannot call methods on " + n + " prior to initialization; " + "attempted to call method '" + a + "'")
                }) : this.each(function() {
                    var t = e.data(this, o);
                    t ? t.option(a || {})._init() : e.data(this, o, new r(a, this))
                }), l
            }
        }, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                disabled: !1,
                create: null
            },
            _createWidget: function(t, i) {
                i = e(i || this.defaultElement || this)[0], this.element = e(i), this.uuid = n++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), i !== this && (e.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function(e) {
                        e.target === i && this.destroy()
                    }
                }), this.document = e(i.style ? i.ownerDocument : i.document || i), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
            },
            _getCreateOptions: e.noop,
            _getCreateEventData: e.noop,
            _create: e.noop,
            _init: e.noop,
            destroy: function() {
                this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
            },
            _destroy: e.noop,
            widget: function() {
                return this.element
            },
            option: function(n, i) {
                var r, o, a, s = n;
                if (0 === arguments.length) return e.widget.extend({}, this.options);
                if ("string" == typeof n)
                    if (s = {}, r = n.split("."), n = r.shift(), r.length) {
                        for (o = s[n] = e.widget.extend({}, this.options[n]), a = 0; r.length - 1 > a; a++) o[r[a]] = o[r[a]] || {}, o = o[r[a]];
                        if (n = r.pop(), i === t) return o[n] === t ? null : o[n];
                        o[n] = i
                    } else {
                        if (i === t) return this.options[n] === t ? null : this.options[n];
                        s[n] = i
                    }
                return this._setOptions(s), this
            },
            _setOptions: function(e) {
                var t;
                for (t in e) this._setOption(t, e[t]);
                return this
            },
            _setOption: function(e, t) {
                return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
            },
            enable: function() {
                return this._setOption("disabled", !1)
            },
            disable: function() {
                return this._setOption("disabled", !0)
            },
            _on: function(n, i, r) {
                var o, a = this;
                "boolean" != typeof n && (r = i, i = n, n = !1), r ? (i = o = e(i), this.bindings = this.bindings.add(i)) : (r = i, i = this.element, o = this.widget()), e.each(r, function(r, s) {
                    function u() {
                        return n || a.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof s ? a[s] : s).apply(a, arguments) : t
                    }
                    "string" != typeof s && (u.guid = s.guid = s.guid || u.guid || e.guid++);
                    var l = r.match(/^(\w+)\s*(.*)$/),
                        c = l[1] + a.eventNamespace,
                        d = l[2];
                    d ? o.delegate(d, c, u) : i.bind(c, u)
                })
            },
            _off: function(e, t) {
                t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t)
            },
            _delay: function(e, t) {
                function n() {
                    return ("string" == typeof e ? i[e] : e).apply(i, arguments)
                }
                var i = this;
                return setTimeout(n, t || 0)
            },
            _hoverable: function(t) {
                this.hoverable = this.hoverable.add(t), this._on(t, {
                    mouseenter: function(t) {
                        e(t.currentTarget).addClass("ui-state-hover")
                    },
                    mouseleave: function(t) {
                        e(t.currentTarget).removeClass("ui-state-hover")
                    }
                })
            },
            _focusable: function(t) {
                this.focusable = this.focusable.add(t), this._on(t, {
                    focusin: function(t) {
                        e(t.currentTarget).addClass("ui-state-focus")
                    },
                    focusout: function(t) {
                        e(t.currentTarget).removeClass("ui-state-focus")
                    }
                })
            },
            _trigger: function(t, n, i) {
                var r, o, a = this.options[t];
                if (i = i || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), n.target = this.element[0], o = n.originalEvent)
                    for (r in o) r in n || (n[r] = o[r]);
                return this.element.trigger(n, i), !(e.isFunction(a) && a.apply(this.element[0], [n].concat(i)) === !1 || n.isDefaultPrevented())
            }
        }, e.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function(t, n) {
            e.Widget.prototype["_" + t] = function(i, r, o) {
                "string" == typeof r && (r = {
                    effect: r
                });
                var a, s = r ? r === !0 || "number" == typeof r ? n : r.effect || n : t;
                r = r || {}, "number" == typeof r && (r = {
                    duration: r
                }), a = !e.isEmptyObject(r), r.complete = o, r.delay && i.delay(r.delay), a && e.effects && e.effects.effect[s] ? i[t](r) : s !== t && i[s] ? i[s](r.duration, r.easing, o) : i.queue(function(n) {
                    e(this)[t](), o && o.call(i[0]), n()
                })
            }
        })
    }(jQuery),
    function(e) {
        var t = !1;
        e(document).mouseup(function() {
            t = !1
        }), e.widget("ui.mouse", {
            version: "1.10.3",
            options: {
                cancel: "input,textarea,button,select,option",
                distance: 1,
                delay: 0
            },
            _mouseInit: function() {
                var t = this;
                this.element.bind("mousedown." + this.widgetName, function(e) {
                    return t._mouseDown(e)
                }).bind("click." + this.widgetName, function(n) {
                    return !0 === e.data(n.target, t.widgetName + ".preventClickEvent") ? (e.removeData(n.target, t.widgetName + ".preventClickEvent"), n.stopImmediatePropagation(), !1) : void 0
                }), this.started = !1
            },
            _mouseDestroy: function() {
                this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
            },
            _mouseDown: function(n) {
                if (!t) {
                    this._mouseStarted && this._mouseUp(n), this._mouseDownEvent = n;
                    var i = this,
                        r = 1 === n.which,
                        o = "string" == typeof this.options.cancel && n.target.nodeName ? e(n.target).closest(this.options.cancel).length : !1;
                    return r && !o && this._mouseCapture(n) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                        i.mouseDelayMet = !0
                    }, this.options.delay)), this._mouseDistanceMet(n) && this._mouseDelayMet(n) && (this._mouseStarted = this._mouseStart(n) !== !1, !this._mouseStarted) ? (n.preventDefault(), !0) : (!0 === e.data(n.target, this.widgetName + ".preventClickEvent") && e.removeData(n.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(e) {
                        return i._mouseMove(e)
                    }, this._mouseUpDelegate = function(e) {
                        return i._mouseUp(e)
                    }, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), n.preventDefault(), t = !0, !0)) : !0
                }
            },
            _mouseMove: function(t) {
                return e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button ? this._mouseUp(t) : this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted)
            },
            _mouseUp: function(t) {
                return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
            },
            _mouseDistanceMet: function(e) {
                return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
            },
            _mouseDelayMet: function() {
                return this.mouseDelayMet
            },
            _mouseStart: function() {},
            _mouseDrag: function() {},
            _mouseStop: function() {},
            _mouseCapture: function() {
                return !0
            }
        })
    }(jQuery),
    function(e) {
        function t(e, t, n) {
            return e > t && t + n > e
        }

        function n(e) {
            return /left|right/.test(e.css("float")) || /inline|table-cell/.test(e.css("display"))
        }
        e.widget("ui.sortable", e.ui.mouse, {
            version: "1.10.3",
            widgetEventPrefix: "sort",
            ready: !1,
            options: {
                appendTo: "parent",
                axis: !1,
                connectWith: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                dropOnEmpty: !0,
                forcePlaceholderSize: !1,
                forceHelperSize: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                items: "> *",
                opacity: !1,
                placeholder: !1,
                revert: !1,
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                scope: "default",
                tolerance: "intersect",
                zIndex: 1e3,
                activate: null,
                beforeStop: null,
                change: null,
                deactivate: null,
                out: null,
                over: null,
                receive: null,
                remove: null,
                sort: null,
                start: null,
                stop: null,
                update: null
            },
            _create: function() {
                var e = this.options;
                this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? "x" === e.axis || n(this.items[0].item) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
            },
            _destroy: function() {
                this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
                for (var e = this.items.length - 1; e >= 0; e--) this.items[e].item.removeData(this.widgetName + "-item");
                return this
            },
            _setOption: function(t, n) {
                "disabled" === t ? (this.options[t] = n, this.widget().toggleClass("ui-sortable-disabled", !!n)) : e.Widget.prototype._setOption.apply(this, arguments)
            },
            _mouseCapture: function(t, n) {
                var i = null,
                    r = !1,
                    o = this;
                return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(t), e(t.target).parents().each(function() {
                    return e.data(this, o.widgetName + "-item") === o ? (i = e(this), !1) : void 0
                }), e.data(t.target, o.widgetName + "-item") === o && (i = e(t.target)), i ? !this.options.handle || n || (e(this.options.handle, i).find("*").addBack().each(function() {
                    this === t.target && (r = !0)
                }), r) ? (this.currentItem = i, this._removeCurrentsFromItems(), !0) : !1 : !1)
            },
            _mouseStart: function(t, n, i) {
                var r, o, a = this.options;
                if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(t), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                        top: this.offset.top - this.margins.top,
                        left: this.offset.left - this.margins.left
                    }, e.extend(this.offset, {
                        click: {
                            left: t.pageX - this.offset.left,
                            top: t.pageY - this.offset.top
                        },
                        parent: this._getParentOffset(),
                        relative: this._getRelativeOffset()
                    }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, a.cursorAt && this._adjustOffsetFromHelper(a.cursorAt), this.domPosition = {
                        prev: this.currentItem.prev()[0],
                        parent: this.currentItem.parent()[0]
                    }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), a.containment && this._setContainment(), a.cursor && "auto" !== a.cursor && (o = this.document.find("body"), this.storedCursor = o.css("cursor"), o.css("cursor", a.cursor), this.storedStylesheet = e("<style>*{ cursor: " + a.cursor + " !important; }</style>").appendTo(o)), a.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", a.opacity)), a.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", a.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", t, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !i)
                    for (r = this.containers.length - 1; r >= 0; r--) this.containers[r]._trigger("activate", t, this._uiHash(this));
                return e.ui.ddmanager && (e.ui.ddmanager.current = this), e.ui.ddmanager && !a.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(t), !0
            },
            _mouseDrag: function(t) {
                var n, i, r, o, a = this.options,
                    s = !1;
                for (this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < a.scrollSensitivity ? this.scrollParent[0].scrollTop = s = this.scrollParent[0].scrollTop + a.scrollSpeed : t.pageY - this.overflowOffset.top < a.scrollSensitivity && (this.scrollParent[0].scrollTop = s = this.scrollParent[0].scrollTop - a.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < a.scrollSensitivity ? this.scrollParent[0].scrollLeft = s = this.scrollParent[0].scrollLeft + a.scrollSpeed : t.pageX - this.overflowOffset.left < a.scrollSensitivity && (this.scrollParent[0].scrollLeft = s = this.scrollParent[0].scrollLeft - a.scrollSpeed)) : (t.pageY - e(document).scrollTop() < a.scrollSensitivity ? s = e(document).scrollTop(e(document).scrollTop() - a.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < a.scrollSensitivity && (s = e(document).scrollTop(e(document).scrollTop() + a.scrollSpeed)), t.pageX - e(document).scrollLeft() < a.scrollSensitivity ? s = e(document).scrollLeft(e(document).scrollLeft() - a.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < a.scrollSensitivity && (s = e(document).scrollLeft(e(document).scrollLeft() + a.scrollSpeed))), s !== !1 && e.ui.ddmanager && !a.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), n = this.items.length - 1; n >= 0; n--)
                    if (i = this.items[n], r = i.item[0], o = this._intersectsWithPointer(i), o && i.instance === this.currentContainer && r !== this.currentItem[0] && this.placeholder[1 === o ? "next" : "prev"]()[0] !== r && !e.contains(this.placeholder[0], r) && ("semi-dynamic" === this.options.type ? !e.contains(this.element[0], r) : !0)) {
                        if (this.direction = 1 === o ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(i)) break;
                        this._rearrange(t, i), this._trigger("change", t, this._uiHash());
                        break
                    }
                return this._contactContainers(t), e.ui.ddmanager && e.ui.ddmanager.drag(this, t), this._trigger("sort", t, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
            },
            _mouseStop: function(t, n) {
                if (t) {
                    if (e.ui.ddmanager && !this.options.dropBehaviour && e.ui.ddmanager.drop(this, t), this.options.revert) {
                        var i = this,
                            r = this.placeholder.offset(),
                            o = this.options.axis,
                            a = {};
                        o && "x" !== o || (a.left = r.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), o && "y" !== o || (a.top = r.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, e(this.helper).animate(a, parseInt(this.options.revert, 10) || 500, function() {
                            i._clear(t)
                        })
                    } else this._clear(t, n);
                    return !1
                }
            },
            cancel: function() {
                if (this.dragging) {
                    this._mouseUp({
                        target: null
                    }), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                    for (var t = this.containers.length - 1; t >= 0; t--) this.containers[t]._trigger("deactivate", null, this._uiHash(this)), this.containers[t].containerCache.over && (this.containers[t]._trigger("out", null, this._uiHash(this)), this.containers[t].containerCache.over = 0)
                }
                return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), e.extend(this, {
                    helper: null,
                    dragging: !1,
                    reverting: !1,
                    _noFinalSort: null
                }), this.domPosition.prev ? e(this.domPosition.prev).after(this.currentItem) : e(this.domPosition.parent).prepend(this.currentItem)), this
            },
            serialize: function(t) {
                var n = this._getItemsAsjQuery(t && t.connected),
                    i = [];
                return t = t || {}, e(n).each(function() {
                    var n = (e(t.item || this).attr(t.attribute || "id") || "").match(t.expression || /(.+)[\-=_](.+)/);
                    n && i.push((t.key || n[1] + "[]") + "=" + (t.key && t.expression ? n[1] : n[2]))
                }), !i.length && t.key && i.push(t.key + "="), i.join("&")
            },
            toArray: function(t) {
                var n = this._getItemsAsjQuery(t && t.connected),
                    i = [];
                return t = t || {}, n.each(function() {
                    i.push(e(t.item || this).attr(t.attribute || "id") || "")
                }), i
            },
            _intersectsWith: function(e) {
                var t = this.positionAbs.left,
                    n = t + this.helperProportions.width,
                    i = this.positionAbs.top,
                    r = i + this.helperProportions.height,
                    o = e.left,
                    a = o + e.width,
                    s = e.top,
                    u = s + e.height,
                    l = this.offset.click.top,
                    c = this.offset.click.left,
                    d = "x" === this.options.axis || i + l > s && u > i + l,
                    f = "y" === this.options.axis || t + c > o && a > t + c,
                    p = d && f;
                return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > e[this.floating ? "width" : "height"] ? p : t + this.helperProportions.width / 2 > o && a > n - this.helperProportions.width / 2 && i + this.helperProportions.height / 2 > s && u > r - this.helperProportions.height / 2
            },
            _intersectsWithPointer: function(e) {
                var n = "x" === this.options.axis || t(this.positionAbs.top + this.offset.click.top, e.top, e.height),
                    i = "y" === this.options.axis || t(this.positionAbs.left + this.offset.click.left, e.left, e.width),
                    r = n && i,
                    o = this._getDragVerticalDirection(),
                    a = this._getDragHorizontalDirection();
                return r ? this.floating ? a && "right" === a || "down" === o ? 2 : 1 : o && ("down" === o ? 2 : 1) : !1
            },
            _intersectsWithSides: function(e) {
                var n = t(this.positionAbs.top + this.offset.click.top, e.top + e.height / 2, e.height),
                    i = t(this.positionAbs.left + this.offset.click.left, e.left + e.width / 2, e.width),
                    r = this._getDragVerticalDirection(),
                    o = this._getDragHorizontalDirection();
                return this.floating && o ? "right" === o && i || "left" === o && !i : r && ("down" === r && n || "up" === r && !n)
            },
            _getDragVerticalDirection: function() {
                var e = this.positionAbs.top - this.lastPositionAbs.top;
                return 0 !== e && (e > 0 ? "down" : "up")
            },
            _getDragHorizontalDirection: function() {
                var e = this.positionAbs.left - this.lastPositionAbs.left;
                return 0 !== e && (e > 0 ? "right" : "left")
            },
            refresh: function(e) {
                return this._refreshItems(e), this.refreshPositions(), this
            },
            _connectWith: function() {
                var e = this.options;
                return e.connectWith.constructor === String ? [e.connectWith] : e.connectWith
            },
            _getItemsAsjQuery: function(t) {
                var n, i, r, o, a = [],
                    s = [],
                    u = this._connectWith();
                if (u && t)
                    for (n = u.length - 1; n >= 0; n--)
                        for (r = e(u[n]), i = r.length - 1; i >= 0; i--) o = e.data(r[i], this.widgetFullName), o && o !== this && !o.options.disabled && s.push([e.isFunction(o.options.items) ? o.options.items.call(o.element) : e(o.options.items, o.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), o]);
                for (s.push([e.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                        options: this.options,
                        item: this.currentItem
                    }) : e(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), n = s.length - 1; n >= 0; n--) s[n][0].each(function() {
                    a.push(this)
                });
                return e(a)
            },
            _removeCurrentsFromItems: function() {
                var t = this.currentItem.find(":data(" + this.widgetName + "-item)");
                this.items = e.grep(this.items, function(e) {
                    for (var n = 0; t.length > n; n++)
                        if (t[n] === e.item[0]) return !1;
                    return !0
                })
            },
            _refreshItems: function(t) {
                this.items = [], this.containers = [this];
                var n, i, r, o, a, s, u, l, c = this.items,
                    d = [
                        [e.isFunction(this.options.items) ? this.options.items.call(this.element[0], t, {
                            item: this.currentItem
                        }) : e(this.options.items, this.element), this]
                    ],
                    f = this._connectWith();
                if (f && this.ready)
                    for (n = f.length - 1; n >= 0; n--)
                        for (r = e(f[n]), i = r.length - 1; i >= 0; i--) o = e.data(r[i], this.widgetFullName), o && o !== this && !o.options.disabled && (d.push([e.isFunction(o.options.items) ? o.options.items.call(o.element[0], t, {
                            item: this.currentItem
                        }) : e(o.options.items, o.element), o]), this.containers.push(o));
                for (n = d.length - 1; n >= 0; n--)
                    for (a = d[n][1], s = d[n][0], i = 0, l = s.length; l > i; i++) u = e(s[i]), u.data(this.widgetName + "-item", a), c.push({
                        item: u,
                        instance: a,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
            },
            refreshPositions: function(t) {
                this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
                var n, i, r, o;
                for (n = this.items.length - 1; n >= 0; n--) i = this.items[n], i.instance !== this.currentContainer && this.currentContainer && i.item[0] !== this.currentItem[0] || (r = this.options.toleranceElement ? e(this.options.toleranceElement, i.item) : i.item, t || (i.width = r.outerWidth(), i.height = r.outerHeight()), o = r.offset(), i.left = o.left, i.top = o.top);
                if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
                else
                    for (n = this.containers.length - 1; n >= 0; n--) o = this.containers[n].element.offset(), this.containers[n].containerCache.left = o.left, this.containers[n].containerCache.top = o.top, this.containers[n].containerCache.width = this.containers[n].element.outerWidth(), this.containers[n].containerCache.height = this.containers[n].element.outerHeight();
                return this
            },
            _createPlaceholder: function(t) {
                t = t || this;
                var n, i = t.options;
                i.placeholder && i.placeholder.constructor !== String || (n = i.placeholder, i.placeholder = {
                    element: function() {
                        var i = t.currentItem[0].nodeName.toLowerCase(),
                            r = e("<" + i + ">", t.document[0]).addClass(n || t.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                        return "tr" === i ? t.currentItem.children().each(function() {
                            e("<td>&#160;</td>", t.document[0]).attr("colspan", e(this).attr("colspan") || 1).appendTo(r)
                        }) : "img" === i && r.attr("src", t.currentItem.attr("src")), n || r.css("visibility", "hidden"), r
                    },
                    update: function(e, r) {
                        (!n || i.forcePlaceholderSize) && (r.height() || r.height(t.currentItem.innerHeight() - parseInt(t.currentItem.css("paddingTop") || 0, 10) - parseInt(t.currentItem.css("paddingBottom") || 0, 10)), r.width() || r.width(t.currentItem.innerWidth() - parseInt(t.currentItem.css("paddingLeft") || 0, 10) - parseInt(t.currentItem.css("paddingRight") || 0, 10)))
                    }
                }), t.placeholder = e(i.placeholder.element.call(t.element, t.currentItem)), t.currentItem.after(t.placeholder), i.placeholder.update(t, t.placeholder)
            },
            _contactContainers: function(i) {
                var r, o, a, s, u, l, c, d, f, p, h = null,
                    m = null;
                for (r = this.containers.length - 1; r >= 0; r--)
                    if (!e.contains(this.currentItem[0], this.containers[r].element[0]))
                        if (this._intersectsWith(this.containers[r].containerCache)) {
                            if (h && e.contains(this.containers[r].element[0], h.element[0])) continue;
                            h = this.containers[r], m = r
                        } else this.containers[r].containerCache.over && (this.containers[r]._trigger("out", i, this._uiHash(this)), this.containers[r].containerCache.over = 0);
                if (h)
                    if (1 === this.containers.length) this.containers[m].containerCache.over || (this.containers[m]._trigger("over", i, this._uiHash(this)), this.containers[m].containerCache.over = 1);
                    else {
                        for (a = 1e4, s = null, p = h.floating || n(this.currentItem), u = p ? "left" : "top", l = p ? "width" : "height", c = this.positionAbs[u] + this.offset.click[u], o = this.items.length - 1; o >= 0; o--) e.contains(this.containers[m].element[0], this.items[o].item[0]) && this.items[o].item[0] !== this.currentItem[0] && (!p || t(this.positionAbs.top + this.offset.click.top, this.items[o].top, this.items[o].height)) && (d = this.items[o].item.offset()[u], f = !1, Math.abs(d - c) > Math.abs(d + this.items[o][l] - c) && (f = !0, d += this.items[o][l]), a > Math.abs(d - c) && (a = Math.abs(d - c), s = this.items[o], this.direction = f ? "up" : "down"));
                        if (!s && !this.options.dropOnEmpty) return;
                        if (this.currentContainer === this.containers[m]) return;
                        s ? this._rearrange(i, s, null, !0) : this._rearrange(i, null, this.containers[m].element, !0), this._trigger("change", i, this._uiHash()), this.containers[m]._trigger("change", i, this._uiHash(this)), this.currentContainer = this.containers[m], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[m]._trigger("over", i, this._uiHash(this)), this.containers[m].containerCache.over = 1
                    }
            },
            _createHelper: function(t) {
                var n = this.options,
                    i = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [t, this.currentItem])) : "clone" === n.helper ? this.currentItem.clone() : this.currentItem;
                return i.parents("body").length || e("parent" !== n.appendTo ? n.appendTo : this.currentItem[0].parentNode)[0].appendChild(i[0]), i[0] === this.currentItem[0] && (this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }), (!i[0].style.width || n.forceHelperSize) && i.width(this.currentItem.width()), (!i[0].style.height || n.forceHelperSize) && i.height(this.currentItem.height()), i
            },
            _adjustOffsetFromHelper: function(t) {
                "string" == typeof t && (t = t.split(" ")), e.isArray(t) && (t = {
                    left: +t[0],
                    top: +t[1] || 0
                }), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
            },
            _getParentOffset: function() {
                this.offsetParent = this.helper.offsetParent();
                var t = this.offsetParent.offset();
                return "absolute" === this.cssPosition && this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && e.ui.ie) && (t = {
                    top: 0,
                    left: 0
                }), {
                    top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                }
            },
            _getRelativeOffset: function() {
                if ("relative" === this.cssPosition) {
                    var e = this.currentItem.position();
                    return {
                        top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                        left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                    }
                }
                return {
                    top: 0,
                    left: 0
                }
            },
            _cacheMargins: function() {
                this.margins = {
                    left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                    top: parseInt(this.currentItem.css("marginTop"), 10) || 0
                }
            },
            _cacheHelperProportions: function() {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function() {
                var t, n, i, r = this.options;
                "parent" === r.containment && (r.containment = this.helper[0].parentNode), ("document" === r.containment || "window" === r.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, e("document" === r.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (e("document" === r.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(r.containment) || (t = e(r.containment)[0], n = e(r.containment).offset(), i = "hidden" !== e(t).css("overflow"), this.containment = [n.left + (parseInt(e(t).css("borderLeftWidth"), 10) || 0) + (parseInt(e(t).css("paddingLeft"), 10) || 0) - this.margins.left, n.top + (parseInt(e(t).css("borderTopWidth"), 10) || 0) + (parseInt(e(t).css("paddingTop"), 10) || 0) - this.margins.top, n.left + (i ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) - (parseInt(e(t).css("borderLeftWidth"), 10) || 0) - (parseInt(e(t).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, n.top + (i ? Math.max(t.scrollHeight, t.offsetHeight) : t.offsetHeight) - (parseInt(e(t).css("borderTopWidth"), 10) || 0) - (parseInt(e(t).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
            },
            _convertPositionTo: function(t, n) {
                n || (n = this.position);
                var i = "absolute" === t ? 1 : -1,
                    r = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    o = /(html|body)/i.test(r[0].tagName);
                return {
                    top: n.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : r.scrollTop()) * i,
                    left: n.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : r.scrollLeft()) * i
                }
            },
            _generatePosition: function(t) {
                var n, i, r = this.options,
                    o = t.pageX,
                    a = t.pageY,
                    s = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    u = /(html|body)/i.test(s[0].tagName);
                return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (o = this.containment[0] + this.offset.click.left), t.pageY - this.offset.click.top < this.containment[1] && (a = this.containment[1] + this.offset.click.top), t.pageX - this.offset.click.left > this.containment[2] && (o = this.containment[2] + this.offset.click.left), t.pageY - this.offset.click.top > this.containment[3] && (a = this.containment[3] + this.offset.click.top)), r.grid && (n = this.originalPageY + Math.round((a - this.originalPageY) / r.grid[1]) * r.grid[1], a = this.containment ? n - this.offset.click.top >= this.containment[1] && n - this.offset.click.top <= this.containment[3] ? n : n - this.offset.click.top >= this.containment[1] ? n - r.grid[1] : n + r.grid[1] : n, i = this.originalPageX + Math.round((o - this.originalPageX) / r.grid[0]) * r.grid[0], o = this.containment ? i - this.offset.click.left >= this.containment[0] && i - this.offset.click.left <= this.containment[2] ? i : i - this.offset.click.left >= this.containment[0] ? i - r.grid[0] : i + r.grid[0] : i)), {
                    top: a - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : u ? 0 : s.scrollTop()),
                    left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : u ? 0 : s.scrollLeft())
                }
            },
            _rearrange: function(e, t, n, i) {
                n ? n[0].appendChild(this.placeholder[0]) : t.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? t.item[0] : t.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
                var r = this.counter;
                this._delay(function() {
                    r === this.counter && this.refreshPositions(!i)
                })
            },
            _clear: function(e, t) {
                this.reverting = !1;
                var n, i = [];
                if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                    for (n in this._storedCSS)("auto" === this._storedCSS[n] || "static" === this._storedCSS[n]) && (this._storedCSS[n] = "");
                    this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                } else this.currentItem.show();
                for (this.fromOutside && !t && i.push(function(e) {
                        this._trigger("receive", e, this._uiHash(this.fromOutside))
                    }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || t || i.push(function(e) {
                        this._trigger("update", e, this._uiHash())
                    }), this !== this.currentContainer && (t || (i.push(function(e) {
                        this._trigger("remove", e, this._uiHash())
                    }), i.push(function(e) {
                        return function(t) {
                            e._trigger("receive", t, this._uiHash(this))
                        }
                    }.call(this, this.currentContainer)), i.push(function(e) {
                        return function(t) {
                            e._trigger("update", t, this._uiHash(this))
                        }
                    }.call(this, this.currentContainer)))), n = this.containers.length - 1; n >= 0; n--) t || i.push(function(e) {
                    return function(t) {
                        e._trigger("deactivate", t, this._uiHash(this))
                    }
                }.call(this, this.containers[n])), this.containers[n].containerCache.over && (i.push(function(e) {
                    return function(t) {
                        e._trigger("out", t, this._uiHash(this))
                    }
                }.call(this, this.containers[n])), this.containers[n].containerCache.over = 0);
                if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
                    if (!t) {
                        for (this._trigger("beforeStop", e, this._uiHash()), n = 0; i.length > n; n++) i[n].call(this, e);
                        this._trigger("stop", e, this._uiHash())
                    }
                    return this.fromOutside = !1, !1
                }
                if (t || this._trigger("beforeStop", e, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !t) {
                    for (n = 0; i.length > n; n++) i[n].call(this, e);
                    this._trigger("stop", e, this._uiHash())
                }
                return this.fromOutside = !1, !0
            },
            _trigger: function() {
                e.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
            },
            _uiHash: function(t) {
                var n = t || this;
                return {
                    helper: n.helper,
                    placeholder: n.placeholder || e([]),
                    position: n.position,
                    originalPosition: n.originalPosition,
                    offset: n.positionAbs,
                    item: n.currentItem,
                    sender: t ? t.element : null
                }
            }
        })
    }(jQuery),
    function() {
        var e = this,
            t = e._,
            n = {},
            i = Array.prototype,
            r = Object.prototype,
            o = Function.prototype,
            a = i.push,
            s = i.slice,
            u = i.concat,
            l = r.toString,
            c = r.hasOwnProperty,
            d = i.forEach,
            f = i.map,
            p = i.reduce,
            h = i.reduceRight,
            m = i.filter,
            g = i.every,
            v = i.some,
            y = i.indexOf,
            b = i.lastIndexOf,
            w = Array.isArray,
            x = Object.keys,
            $ = o.bind,
            k = function(e) {
                return e instanceof k ? e : this instanceof k ? (this._wrapped = e, void 0) : new k(e)
            };
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = k), exports._ = k) : e._ = k, k.VERSION = "1.4.4";
        var _ = k.each = k.forEach = function(e, t, i) {
            if (null != e)
                if (d && e.forEach === d) e.forEach(t, i);
                else if (e.length === +e.length) {
                for (var r = 0, o = e.length; o > r; r++)
                    if (t.call(i, e[r], r, e) === n) return
            } else
                for (var a in e)
                    if (k.has(e, a) && t.call(i, e[a], a, e) === n) return
        };
        k.map = k.collect = function(e, t, n) {
            var i = [];
            return null == e ? i : f && e.map === f ? e.map(t, n) : (_(e, function(e, r, o) {
                i[i.length] = t.call(n, e, r, o)
            }), i)
        };
        var C = "Reduce of empty array with no initial value";
        k.reduce = k.foldl = k.inject = function(e, t, n, i) {
            var r = arguments.length > 2;
            if (null == e && (e = []), p && e.reduce === p) return i && (t = k.bind(t, i)), r ? e.reduce(t, n) : e.reduce(t);
            if (_(e, function(e, o, a) {
                    r ? n = t.call(i, n, e, o, a) : (n = e, r = !0)
                }), !r) throw new TypeError(C);
            return n
        }, k.reduceRight = k.foldr = function(e, t, n, i) {
            var r = arguments.length > 2;
            if (null == e && (e = []), h && e.reduceRight === h) return i && (t = k.bind(t, i)), r ? e.reduceRight(t, n) : e.reduceRight(t);
            var o = e.length;
            if (o !== +o) {
                var a = k.keys(e);
                o = a.length
            }
            if (_(e, function(s, u, l) {
                    u = a ? a[--o] : --o, r ? n = t.call(i, n, e[u], u, l) : (n = e[u], r = !0)
                }), !r) throw new TypeError(C);
            return n
        }, k.find = k.detect = function(e, t, n) {
            var i;
            return E(e, function(e, r, o) {
                return t.call(n, e, r, o) ? (i = e, !0) : void 0
            }), i
        }, k.filter = k.select = function(e, t, n) {
            var i = [];
            return null == e ? i : m && e.filter === m ? e.filter(t, n) : (_(e, function(e, r, o) {
                t.call(n, e, r, o) && (i[i.length] = e)
            }), i)
        }, k.reject = function(e, t, n) {
            return k.filter(e, function(e, i, r) {
                return !t.call(n, e, i, r)
            }, n)
        }, k.every = k.all = function(e, t, i) {
            t || (t = k.identity);
            var r = !0;
            return null == e ? r : g && e.every === g ? e.every(t, i) : (_(e, function(e, o, a) {
                return (r = r && t.call(i, e, o, a)) ? void 0 : n
            }), !!r)
        };
        var E = k.some = k.any = function(e, t, i) {
            t || (t = k.identity);
            var r = !1;
            return null == e ? r : v && e.some === v ? e.some(t, i) : (_(e, function(e, o, a) {
                return r || (r = t.call(i, e, o, a)) ? n : void 0
            }), !!r)
        };
        k.contains = k.include = function(e, t) {
            return null == e ? !1 : y && e.indexOf === y ? -1 != e.indexOf(t) : E(e, function(e) {
                return e === t
            })
        }, k.invoke = function(e, t) {
            var n = s.call(arguments, 2),
                i = k.isFunction(t);
            return k.map(e, function(e) {
                return (i ? t : e[t]).apply(e, n)
            })
        }, k.pluck = function(e, t) {
            return k.map(e, function(e) {
                return e[t]
            })
        }, k.where = function(e, t, n) {
            return k.isEmpty(t) ? n ? null : [] : k[n ? "find" : "filter"](e, function(e) {
                for (var n in t)
                    if (t[n] !== e[n]) return !1;
                return !0
            })
        }, k.findWhere = function(e, t) {
            return k.where(e, t, !0)
        }, k.max = function(e, t, n) {
            if (!t && k.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.max.apply(Math, e);
            if (!t && k.isEmpty(e)) return -1 / 0;
            var i = {
                computed: -1 / 0,
                value: -1 / 0
            };
            return _(e, function(e, r, o) {
                var a = t ? t.call(n, e, r, o) : e;
                a >= i.computed && (i = {
                    value: e,
                    computed: a
                })
            }), i.value
        }, k.min = function(e, t, n) {
            if (!t && k.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.min.apply(Math, e);
            if (!t && k.isEmpty(e)) return 1 / 0;
            var i = {
                computed: 1 / 0,
                value: 1 / 0
            };
            return _(e, function(e, r, o) {
                var a = t ? t.call(n, e, r, o) : e;
                a < i.computed && (i = {
                    value: e,
                    computed: a
                })
            }), i.value
        }, k.shuffle = function(e) {
            var t, n = 0,
                i = [];
            return _(e, function(e) {
                t = k.random(n++), i[n - 1] = i[t], i[t] = e
            }), i
        };
        var S = function(e) {
            return k.isFunction(e) ? e : function(t) {
                return t[e]
            }
        };
        k.sortBy = function(e, t, n) {
            var i = S(t);
            return k.pluck(k.map(e, function(e, t, r) {
                return {
                    value: e,
                    index: t,
                    criteria: i.call(n, e, t, r)
                }
            }).sort(function(e, t) {
                var n = e.criteria,
                    i = t.criteria;
                if (n !== i) {
                    if (n > i || void 0 === n) return 1;
                    if (i > n || void 0 === i) return -1
                }
                return e.index < t.index ? -1 : 1
            }), "value")
        };
        var T = function(e, t, n, i) {
            var r = {},
                o = S(t || k.identity);
            return _(e, function(t, a) {
                var s = o.call(n, t, a, e);
                i(r, s, t)
            }), r
        };
        k.groupBy = function(e, t, n) {
            return T(e, t, n, function(e, t, n) {
                (k.has(e, t) ? e[t] : e[t] = []).push(n)
            })
        }, k.countBy = function(e, t, n) {
            return T(e, t, n, function(e, t) {
                k.has(e, t) || (e[t] = 0), e[t] ++
            })
        }, k.sortedIndex = function(e, t, n, i) {
            n = null == n ? k.identity : S(n);
            for (var r = n.call(i, t), o = 0, a = e.length; a > o;) {
                var s = o + a >>> 1;
                n.call(i, e[s]) < r ? o = s + 1 : a = s
            }
            return o
        }, k.toArray = function(e) {
            return e ? k.isArray(e) ? s.call(e) : e.length === +e.length ? k.map(e, k.identity) : k.values(e) : []
        }, k.size = function(e) {
            return null == e ? 0 : e.length === +e.length ? e.length : k.keys(e).length
        }, k.first = k.head = k.take = function(e, t, n) {
            return null == e ? void 0 : null == t || n ? e[0] : s.call(e, 0, t)
        }, k.initial = function(e, t, n) {
            return s.call(e, 0, e.length - (null == t || n ? 1 : t))
        }, k.last = function(e, t, n) {
            return null == e ? void 0 : null == t || n ? e[e.length - 1] : s.call(e, Math.max(e.length - t, 0))
        }, k.rest = k.tail = k.drop = function(e, t, n) {
            return s.call(e, null == t || n ? 1 : t)
        }, k.compact = function(e) {
            return k.filter(e, k.identity)
        };
        var P = function(e, t, n) {
            return _(e, function(e) {
                k.isArray(e) ? t ? a.apply(n, e) : P(e, t, n) : n.push(e)
            }), n
        };
        k.flatten = function(e, t) {
            return P(e, t, [])
        }, k.without = function(e) {
            return k.difference(e, s.call(arguments, 1))
        }, k.uniq = k.unique = function(e, t, n, i) {
            k.isFunction(t) && (i = n, n = t, t = !1);
            var r = n ? k.map(e, n, i) : e,
                o = [],
                a = [];
            return _(r, function(n, i) {
                (t ? i && a[a.length - 1] === n : k.contains(a, n)) || (a.push(n), o.push(e[i]))
            }), o
        }, k.union = function() {
            return k.uniq(u.apply(i, arguments))
        }, k.intersection = function(e) {
            var t = s.call(arguments, 1);
            return k.filter(k.uniq(e), function(e) {
                return k.every(t, function(t) {
                    return k.indexOf(t, e) >= 0
                })
            })
        }, k.difference = function(e) {
            var t = u.apply(i, s.call(arguments, 1));
            return k.filter(e, function(e) {
                return !k.contains(t, e)
            })
        }, k.zip = function() {
            for (var e = s.call(arguments), t = k.max(k.pluck(e, "length")), n = new Array(t), i = 0; t > i; i++) n[i] = k.pluck(e, "" + i);
            return n
        }, k.object = function(e, t) {
            if (null == e) return {};
            for (var n = {}, i = 0, r = e.length; r > i; i++) t ? n[e[i]] = t[i] : n[e[i][0]] = e[i][1];
            return n
        }, k.indexOf = function(e, t, n) {
            if (null == e) return -1;
            var i = 0,
                r = e.length;
            if (n) {
                if ("number" != typeof n) return i = k.sortedIndex(e, t), e[i] === t ? i : -1;
                i = 0 > n ? Math.max(0, r + n) : n
            }
            if (y && e.indexOf === y) return e.indexOf(t, n);
            for (; r > i; i++)
                if (e[i] === t) return i;
            return -1
        }, k.lastIndexOf = function(e, t, n) {
            if (null == e) return -1;
            var i = null != n;
            if (b && e.lastIndexOf === b) return i ? e.lastIndexOf(t, n) : e.lastIndexOf(t);
            for (var r = i ? n : e.length; r--;)
                if (e[r] === t) return r;
            return -1
        }, k.range = function(e, t, n) {
            arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
            for (var i = Math.max(Math.ceil((t - e) / n), 0), r = 0, o = new Array(i); i > r;) o[r++] = e, e += n;
            return o
        }, k.bind = function(e, t) {
            if (e.bind === $ && $) return $.apply(e, s.call(arguments, 1));
            var n = s.call(arguments, 2);
            return function() {
                return e.apply(t, n.concat(s.call(arguments)))
            }
        }, k.partial = function(e) {
            var t = s.call(arguments, 1);
            return function() {
                return e.apply(this, t.concat(s.call(arguments)))
            }
        }, k.bindAll = function(e) {
            var t = s.call(arguments, 1);
            return 0 === t.length && (t = k.functions(e)), _(t, function(t) {
                e[t] = k.bind(e[t], e)
            }), e
        }, k.memoize = function(e, t) {
            var n = {};
            return t || (t = k.identity),
                function() {
                    var i = t.apply(this, arguments);
                    return k.has(n, i) ? n[i] : n[i] = e.apply(this, arguments)
                }
        }, k.delay = function(e, t) {
            var n = s.call(arguments, 2);
            return setTimeout(function() {
                return e.apply(null, n)
            }, t)
        }, k.defer = function(e) {
            return k.delay.apply(k, [e, 1].concat(s.call(arguments, 1)))
        }, k.throttle = function(e, t) {
            var n, i, r, o, a = 0,
                s = function() {
                    a = new Date, r = null, o = e.apply(n, i)
                };
            return function() {
                var u = new Date,
                    l = t - (u - a);
                return n = this, i = arguments, 0 >= l ? (clearTimeout(r), r = null, a = u, o = e.apply(n, i)) : r || (r = setTimeout(s, l)), o
            }
        }, k.debounce = function(e, t, n) {
            var i, r;
            return function() {
                var o = this,
                    a = arguments,
                    s = function() {
                        i = null, n || (r = e.apply(o, a))
                    },
                    u = n && !i;
                return clearTimeout(i), i = setTimeout(s, t), u && (r = e.apply(o, a)), r
            }
        }, k.once = function(e) {
            var t, n = !1;
            return function() {
                return n ? t : (n = !0, t = e.apply(this, arguments), e = null, t)
            }
        }, k.wrap = function(e, t) {
            return function() {
                var n = [e];
                return a.apply(n, arguments), t.apply(this, n)
            }
        }, k.compose = function() {
            var e = arguments;
            return function() {
                for (var t = arguments, n = e.length - 1; n >= 0; n--) t = [e[n].apply(this, t)];
                return t[0]
            }
        }, k.after = function(e, t) {
            return 0 >= e ? t() : function() {
                return --e < 1 ? t.apply(this, arguments) : void 0
            }
        }, k.keys = x || function(e) {
            if (e !== Object(e)) throw new TypeError("Invalid object");
            var t = [];
            for (var n in e) k.has(e, n) && (t[t.length] = n);
            return t
        }, k.values = function(e) {
            var t = [];
            for (var n in e) k.has(e, n) && t.push(e[n]);
            return t
        }, k.pairs = function(e) {
            var t = [];
            for (var n in e) k.has(e, n) && t.push([n, e[n]]);
            return t
        }, k.invert = function(e) {
            var t = {};
            for (var n in e) k.has(e, n) && (t[e[n]] = n);
            return t
        }, k.functions = k.methods = function(e) {
            var t = [];
            for (var n in e) k.isFunction(e[n]) && t.push(n);
            return t.sort()
        }, k.extend = function(e) {
            return _(s.call(arguments, 1), function(t) {
                if (t)
                    for (var n in t) e[n] = t[n]
            }), e
        }, k.pick = function(e) {
            var t = {},
                n = u.apply(i, s.call(arguments, 1));
            return _(n, function(n) {
                n in e && (t[n] = e[n])
            }), t
        }, k.omit = function(e) {
            var t = {},
                n = u.apply(i, s.call(arguments, 1));
            for (var r in e) k.contains(n, r) || (t[r] = e[r]);
            return t
        }, k.defaults = function(e) {
            return _(s.call(arguments, 1), function(t) {
                if (t)
                    for (var n in t) null == e[n] && (e[n] = t[n])
            }), e
        }, k.clone = function(e) {
            return k.isObject(e) ? k.isArray(e) ? e.slice() : k.extend({}, e) : e
        }, k.tap = function(e, t) {
            return t(e), e
        };
        var A = function(e, t, n, i) {
            if (e === t) return 0 !== e || 1 / e == 1 / t;
            if (null == e || null == t) return e === t;
            e instanceof k && (e = e._wrapped), t instanceof k && (t = t._wrapped);
            var r = l.call(e);
            if (r != l.call(t)) return !1;
            switch (r) {
                case "[object String]":
                    return e == String(t);
                case "[object Number]":
                    return e != +e ? t != +t : 0 == e ? 1 / e == 1 / t : e == +t;
                case "[object Date]":
                case "[object Boolean]":
                    return +e == +t;
                case "[object RegExp]":
                    return e.source == t.source && e.global == t.global && e.multiline == t.multiline && e.ignoreCase == t.ignoreCase
            }
            if ("object" != typeof e || "object" != typeof t) return !1;
            for (var o = n.length; o--;)
                if (n[o] == e) return i[o] == t;
            n.push(e), i.push(t);
            var a = 0,
                s = !0;
            if ("[object Array]" == r) {
                if (a = e.length, s = a == t.length)
                    for (; a-- && (s = A(e[a], t[a], n, i)););
            } else {
                var u = e.constructor,
                    c = t.constructor;
                if (u !== c && !(k.isFunction(u) && u instanceof u && k.isFunction(c) && c instanceof c)) return !1;
                for (var d in e)
                    if (k.has(e, d) && (a++, !(s = k.has(t, d) && A(e[d], t[d], n, i)))) break;
                if (s) {
                    for (d in t)
                        if (k.has(t, d) && !a--) break;
                    s = !a
                }
            }
            return n.pop(), i.pop(), s
        };
        k.isEqual = function(e, t) {
            return A(e, t, [], [])
        }, k.isEmpty = function(e) {
            if (null == e) return !0;
            if (k.isArray(e) || k.isString(e)) return 0 === e.length;
            for (var t in e)
                if (k.has(e, t)) return !1;
            return !0
        }, k.isElement = function(e) {
            return !(!e || 1 !== e.nodeType)
        }, k.isArray = w || function(e) {
            return "[object Array]" == l.call(e)
        }, k.isObject = function(e) {
            return e === Object(e)
        }, _(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(e) {
            k["is" + e] = function(t) {
                return l.call(t) == "[object " + e + "]"
            }
        }), k.isArguments(arguments) || (k.isArguments = function(e) {
            return !(!e || !k.has(e, "callee"))
        }), "function" != typeof /./ && (k.isFunction = function(e) {
            return "function" == typeof e
        }), k.isFinite = function(e) {
            return isFinite(e) && !isNaN(parseFloat(e))
        }, k.isNaN = function(e) {
            return k.isNumber(e) && e != +e
        }, k.isBoolean = function(e) {
            return e === !0 || e === !1 || "[object Boolean]" == l.call(e)
        }, k.isNull = function(e) {
            return null === e
        }, k.isUndefined = function(e) {
            return void 0 === e
        }, k.has = function(e, t) {
            return c.call(e, t)
        }, k.noConflict = function() {
            return e._ = t, this
        }, k.identity = function(e) {
            return e
        }, k.times = function(e, t, n) {
            for (var i = Array(e), r = 0; e > r; r++) i[r] = t.call(n, r);
            return i
        }, k.random = function(e, t) {
            return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
        };
        var I = {
            escape: {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "/": "&#x2F;"
            }
        };
        I.unescape = k.invert(I.escape);
        var N = {
            escape: new RegExp("[" + k.keys(I.escape).join("") + "]", "g"),
            unescape: new RegExp("(" + k.keys(I.unescape).join("|") + ")", "g")
        };
        k.each(["escape", "unescape"], function(e) {
            k[e] = function(t) {
                return null == t ? "" : ("" + t).replace(N[e], function(t) {
                    return I[e][t]
                })
            }
        }), k.result = function(e, t) {
            if (null == e) return null;
            var n = e[t];
            return k.isFunction(n) ? n.call(e) : n
        }, k.mixin = function(e) {
            _(k.functions(e), function(t) {
                var n = k[t] = e[t];
                k.prototype[t] = function() {
                    var e = [this._wrapped];
                    return a.apply(e, arguments), O.call(this, n.apply(k, e))
                }
            })
        };
        var D = 0;
        k.uniqueId = function(e) {
            var t = ++D + "";
            return e ? e + t : t
        }, k.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var M = /(.)^/,
            L = {
                "'": "'",
                "\\": "\\",
                "\r": "r",
                "\n": "n",
                "	": "t",
                "\u2028": "u2028",
                "\u2029": "u2029"
            },
            j = /\\|'|\r|\n|\t|\u2028|\u2029/g;
        k.template = function(e, t, n) {
            var i;
            n = k.defaults({}, n, k.templateSettings);
            var r = new RegExp([(n.escape || M).source, (n.interpolate || M).source, (n.evaluate || M).source].join("|") + "|$", "g"),
                o = 0,
                a = "__p+='";
            e.replace(r, function(t, n, i, r, s) {
                return a += e.slice(o, s).replace(j, function(e) {
                    return "\\" + L[e]
                }), n && (a += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"), i && (a += "'+\n((__t=(" + i + "))==null?'':__t)+\n'"), r && (a += "';\n" + r + "\n__p+='"), o = s + t.length, t
            }), a += "';\n", n.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
            try {
                i = new Function(n.variable || "obj", "_", a)
            } catch (s) {
                throw s.source = a, s
            }
            if (t) return i(t, k);
            var u = function(e) {
                return i.call(this, e, k)
            };
            return u.source = "function(" + (n.variable || "obj") + "){\n" + a + "}", u
        }, k.chain = function(e) {
            return k(e).chain()
        };
        var O = function(e) {
            return this._chain ? k(e).chain() : e
        };
        k.mixin(k), _(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
            var t = i[e];
            k.prototype[e] = function() {
                var n = this._wrapped;
                return t.apply(n, arguments), "shift" != e && "splice" != e || 0 !== n.length || delete n[0], O.call(this, n)
            }
        }), _(["concat", "join", "slice"], function(e) {
            var t = i[e];
            k.prototype[e] = function() {
                return O.call(this, t.apply(this._wrapped, arguments))
            }
        }), k.extend(k.prototype, {
            chain: function() {
                return this._chain = !0, this
            },
            value: function() {
                return this._wrapped
            }
        })
    }.call(this),
    function() {
        var e, t = this,
            n = t.Backbone,
            i = [],
            r = i.push,
            o = i.slice,
            a = i.splice;
        e = "undefined" != typeof exports ? exports : t.Backbone = {}, e.VERSION = "1.0.0";
        var s = t._;
        s || "undefined" == typeof require || (s = require("underscore")), e.$ = t.jQuery || t.Zepto || t.ender || t.$, e.noConflict = function() {
            return t.Backbone = n, this
        }, e.emulateHTTP = !1, e.emulateJSON = !1;
        var u = e.Events = {
                on: function(e, t, n) {
                    if (!c(this, "on", e, [t, n]) || !t) return this;
                    this._events || (this._events = {});
                    var i = this._events[e] || (this._events[e] = []);
                    return i.push({
                        callback: t,
                        context: n,
                        ctx: n || this
                    }), this
                },
                once: function(e, t, n) {
                    if (!c(this, "once", e, [t, n]) || !t) return this;
                    var i = this,
                        r = s.once(function() {
                            i.off(e, r), t.apply(this, arguments)
                        });
                    return r._callback = t, this.on(e, r, n)
                },
                off: function(e, t, n) {
                    var i, r, o, a, u, l, d, f;
                    if (!this._events || !c(this, "off", e, [t, n])) return this;
                    if (!e && !t && !n) return this._events = {}, this;
                    for (a = e ? [e] : s.keys(this._events), u = 0, l = a.length; l > u; u++)
                        if (e = a[u], o = this._events[e]) {
                            if (this._events[e] = i = [], t || n)
                                for (d = 0, f = o.length; f > d; d++) r = o[d], (t && t !== r.callback && t !== r.callback._callback || n && n !== r.context) && i.push(r);
                            i.length || delete this._events[e]
                        }
                    return this
                },
                trigger: function(e) {
                    if (!this._events) return this;
                    var t = o.call(arguments, 1);
                    if (!c(this, "trigger", e, t)) return this;
                    var n = this._events[e],
                        i = this._events.all;
                    return n && d(n, t), i && d(i, arguments), this
                },
                stopListening: function(e, t, n) {
                    var i = this._listeners;
                    if (!i) return this;
                    var r = !t && !n;
                    "object" == typeof t && (n = this), e && ((i = {})[e._listenerId] = e);
                    for (var o in i) i[o].off(t, n, this), r && delete this._listeners[o];
                    return this
                }
            },
            l = /\s+/,
            c = function(e, t, n, i) {
                if (!n) return !0;
                if ("object" == typeof n) {
                    for (var r in n) e[t].apply(e, [r, n[r]].concat(i));
                    return !1
                }
                if (l.test(n)) {
                    for (var o = n.split(l), a = 0, s = o.length; s > a; a++) e[t].apply(e, [o[a]].concat(i));
                    return !1
                }
                return !0
            },
            d = function(e, t) {
                var n, i = -1,
                    r = e.length,
                    o = t[0],
                    a = t[1],
                    s = t[2];
                switch (t.length) {
                    case 0:
                        for (; ++i < r;)(n = e[i]).callback.call(n.ctx);
                        return;
                    case 1:
                        for (; ++i < r;)(n = e[i]).callback.call(n.ctx, o);
                        return;
                    case 2:
                        for (; ++i < r;)(n = e[i]).callback.call(n.ctx, o, a);
                        return;
                    case 3:
                        for (; ++i < r;)(n = e[i]).callback.call(n.ctx, o, a, s);
                        return;
                    default:
                        for (; ++i < r;)(n = e[i]).callback.apply(n.ctx, t)
                }
            },
            f = {
                listenTo: "on",
                listenToOnce: "once"
            };
        s.each(f, function(e, t) {
            u[t] = function(t, n, i) {
                var r = this._listeners || (this._listeners = {}),
                    o = t._listenerId || (t._listenerId = s.uniqueId("l"));
                return r[o] = t, "object" == typeof n && (i = this), t[e](n, i, this), this
            }
        }), u.bind = u.on, u.unbind = u.off, s.extend(e, u);
        var p = e.Model = function(e, t) {
                var n, i = e || {};
                t || (t = {}), this.cid = s.uniqueId("c"), this.attributes = {}, s.extend(this, s.pick(t, h)), t.parse && (i = this.parse(i, t) || {}), (n = s.result(this, "defaults")) && (i = s.defaults({}, i, n)), this.set(i, t), this.changed = {}, this.initialize.apply(this, arguments)
            },
            h = ["url", "urlRoot", "collection"];
        s.extend(p.prototype, u, {
            changed: null,
            validationError: null,
            idAttribute: "id",
            initialize: function() {},
            toJSON: function() {
                return s.clone(this.attributes)
            },
            sync: function() {
                return e.sync.apply(this, arguments)
            },
            get: function(e) {
                return this.attributes[e]
            },
            escape: function(e) {
                return s.escape(this.get(e))
            },
            has: function(e) {
                return null != this.get(e)
            },
            set: function(e, t, n) {
                var i, r, o, a, u, l, c, d;
                if (null == e) return this;
                if ("object" == typeof e ? (r = e, n = t) : (r = {})[e] = t, n || (n = {}), !this._validate(r, n)) return !1;
                o = n.unset, u = n.silent, a = [], l = this._changing, this._changing = !0, l || (this._previousAttributes = s.clone(this.attributes), this.changed = {}), d = this.attributes, c = this._previousAttributes, this.idAttribute in r && (this.id = r[this.idAttribute]);
                for (i in r) t = r[i], s.isEqual(d[i], t) || a.push(i), s.isEqual(c[i], t) ? delete this.changed[i] : this.changed[i] = t, o ? delete d[i] : d[i] = t;
                if (!u) {
                    a.length && (this._pending = !0);
                    for (var f = 0, p = a.length; p > f; f++) this.trigger("change:" + a[f], this, d[a[f]], n)
                }
                if (l) return this;
                if (!u)
                    for (; this._pending;) this._pending = !1, this.trigger("change", this, n);
                return this._pending = !1, this._changing = !1, this
            },
            unset: function(e, t) {
                return this.set(e, void 0, s.extend({}, t, {
                    unset: !0
                }))
            },
            clear: function(e) {
                var t = {};
                for (var n in this.attributes) t[n] = void 0;
                return this.set(t, s.extend({}, e, {
                    unset: !0
                }))
            },
            hasChanged: function(e) {
                return null == e ? !s.isEmpty(this.changed) : s.has(this.changed, e)
            },
            changedAttributes: function(e) {
                if (!e) return this.hasChanged() ? s.clone(this.changed) : !1;
                var t, n = !1,
                    i = this._changing ? this._previousAttributes : this.attributes;
                for (var r in e) s.isEqual(i[r], t = e[r]) || ((n || (n = {}))[r] = t);
                return n
            },
            previous: function(e) {
                return null != e && this._previousAttributes ? this._previousAttributes[e] : null
            },
            previousAttributes: function() {
                return s.clone(this._previousAttributes)
            },
            fetch: function(e) {
                e = e ? s.clone(e) : {}, void 0 === e.parse && (e.parse = !0);
                var t = this,
                    n = e.success;
                return e.success = function(i) {
                    return t.set(t.parse(i, e), e) ? (n && n(t, i, e), t.trigger("sync", t, i, e), void 0) : !1
                }, O(this, e), this.sync("read", this, e)
            },
            save: function(e, t, n) {
                var i, r, o, a = this.attributes;
                if (null == e || "object" == typeof e ? (i = e, n = t) : (i = {})[e] = t, !(!i || n && n.wait || this.set(i, n))) return !1;
                if (n = s.extend({
                        validate: !0
                    }, n), !this._validate(i, n)) return !1;
                i && n.wait && (this.attributes = s.extend({}, a, i)), void 0 === n.parse && (n.parse = !0);
                var u = this,
                    l = n.success;
                return n.success = function(e) {
                    u.attributes = a;
                    var t = u.parse(e, n);
                    return n.wait && (t = s.extend(i || {}, t)), s.isObject(t) && !u.set(t, n) ? !1 : (l && l(u, e, n), u.trigger("sync", u, e, n), void 0)
                }, O(this, n), r = this.isNew() ? "create" : n.patch ? "patch" : "update", "patch" === r && (n.attrs = i), o = this.sync(r, this, n), i && n.wait && (this.attributes = a), o
            },
            destroy: function(e) {
                e = e ? s.clone(e) : {};
                var t = this,
                    n = e.success,
                    i = function() {
                        t.trigger("destroy", t, t.collection, e)
                    };
                if (e.success = function(r) {
                        (e.wait || t.isNew()) && i(), n && n(t, r, e), t.isNew() || t.trigger("sync", t, r, e)
                    }, this.isNew()) return e.success(), !1;
                O(this, e);
                var r = this.sync("delete", this, e);
                return e.wait || i(), r
            },
            url: function() {
                var e = s.result(this, "urlRoot") || s.result(this.collection, "url") || j();
                return this.isNew() ? e : e + ("/" === e.charAt(e.length - 1) ? "" : "/") + encodeURIComponent(this.id)
            },
            parse: function(e) {
                return e
            },
            clone: function() {
                return new this.constructor(this.attributes)
            },
            isNew: function() {
                return null == this.id
            },
            isValid: function(e) {
                return this._validate({}, s.extend(e || {}, {
                    validate: !0
                }))
            },
            _validate: function(e, t) {
                if (!t.validate || !this.validate) return !0;
                e = s.extend({}, this.attributes, e);
                var n = this.validationError = this.validate(e, t) || null;
                return n ? (this.trigger("invalid", this, n, s.extend(t || {}, {
                    validationError: n
                })), !1) : !0
            }
        });
        var m = ["keys", "values", "pairs", "invert", "pick", "omit"];
        s.each(m, function(e) {
            p.prototype[e] = function() {
                var t = o.call(arguments);
                return t.unshift(this.attributes), s[e].apply(s, t)
            }
        });
        var g = e.Collection = function(e, t) {
                t || (t = {}), t.url && (this.url = t.url), t.model && (this.model = t.model), void 0 !== t.comparator && (this.comparator = t.comparator), this._reset(), this.initialize.apply(this, arguments), e && this.reset(e, s.extend({
                    silent: !0
                }, t))
            },
            v = {
                add: !0,
                remove: !0,
                merge: !0
            },
            y = {
                add: !0,
                merge: !1,
                remove: !1
            };
        s.extend(g.prototype, u, {
            model: p,
            initialize: function() {},
            toJSON: function(e) {
                return this.map(function(t) {
                    return t.toJSON(e)
                })
            },
            sync: function() {
                return e.sync.apply(this, arguments)
            },
            add: function(e, t) {
                return this.set(e, s.defaults(t || {}, y))
            },
            remove: function(e, t) {
                e = s.isArray(e) ? e.slice() : [e], t || (t = {});
                var n, i, r, o;
                for (n = 0, i = e.length; i > n; n++) o = this.get(e[n]), o && (delete this._byId[o.id], delete this._byId[o.cid], r = this.indexOf(o), this.models.splice(r, 1), this.length--, t.silent || (t.index = r, o.trigger("remove", o, this, t)), this._removeReference(o));
                return this
            },
            set: function(e, t) {
                t = s.defaults(t || {}, v), t.parse && (e = this.parse(e, t)), s.isArray(e) || (e = e ? [e] : []);
                var n, i, o, u, l, c = t.at,
                    d = this.comparator && null == c && t.sort !== !1,
                    f = s.isString(this.comparator) ? this.comparator : null,
                    p = [],
                    h = [],
                    m = {};
                for (n = 0, i = e.length; i > n; n++)(o = this._prepareModel(e[n], t)) && ((u = this.get(o)) ? (t.remove && (m[u.cid] = !0), t.merge && (u.set(o.attributes, t), d && !l && u.hasChanged(f) && (l = !0))) : t.add && (p.push(o), o.on("all", this._onModelEvent, this), this._byId[o.cid] = o, null != o.id && (this._byId[o.id] = o)));
                if (t.remove) {
                    for (n = 0, i = this.length; i > n; ++n) m[(o = this.models[n]).cid] || h.push(o);
                    h.length && this.remove(h, t)
                }
                if (p.length && (d && (l = !0), this.length += p.length, null != c ? a.apply(this.models, [c, 0].concat(p)) : r.apply(this.models, p)), l && this.sort({
                        silent: !0
                    }), t.silent) return this;
                for (n = 0, i = p.length; i > n; n++)(o = p[n]).trigger("add", o, this, t);
                return l && this.trigger("sort", this, t), this
            },
            reset: function(e, t) {
                t || (t = {});
                for (var n = 0, i = this.models.length; i > n; n++) this._removeReference(this.models[n]);
                return t.previousModels = this.models, this._reset(), this.add(e, s.extend({
                    silent: !0
                }, t)), t.silent || this.trigger("reset", this, t), this
            },
            push: function(e, t) {
                return e = this._prepareModel(e, t), this.add(e, s.extend({
                    at: this.length
                }, t)), e
            },
            pop: function(e) {
                var t = this.at(this.length - 1);
                return this.remove(t, e), t
            },
            unshift: function(e, t) {
                return e = this._prepareModel(e, t), this.add(e, s.extend({
                    at: 0
                }, t)), e
            },
            shift: function(e) {
                var t = this.at(0);
                return this.remove(t, e), t
            },
            slice: function(e, t) {
                return this.models.slice(e, t)
            },
            get: function(e) {
                return null == e ? void 0 : this._byId[null != e.id ? e.id : e.cid || e]
            },
            at: function(e) {
                return this.models[e]
            },
            where: function(e, t) {
                return s.isEmpty(e) ? t ? void 0 : [] : this[t ? "find" : "filter"](function(t) {
                    for (var n in e)
                        if (e[n] !== t.get(n)) return !1;
                    return !0
                })
            },
            findWhere: function(e) {
                return this.where(e, !0)
            },
            sort: function(e) {
                if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
                return e || (e = {}), s.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(s.bind(this.comparator, this)), e.silent || this.trigger("sort", this, e), this
            },
            sortedIndex: function(e, t, n) {
                t || (t = this.comparator);
                var i = s.isFunction(t) ? t : function(e) {
                    return e.get(t)
                };
                return s.sortedIndex(this.models, e, i, n)
            },
            pluck: function(e) {
                return s.invoke(this.models, "get", e)
            },
            fetch: function(e) {
                e = e ? s.clone(e) : {}, void 0 === e.parse && (e.parse = !0);
                var t = e.success,
                    n = this;
                return e.success = function(i) {
                    var r = e.reset ? "reset" : "set";
                    n[r](i, e), t && t(n, i, e), n.trigger("sync", n, i, e)
                }, O(this, e), this.sync("read", this, e)
            },
            create: function(e, t) {
                if (t = t ? s.clone(t) : {}, !(e = this._prepareModel(e, t))) return !1;
                t.wait || this.add(e, t);
                var n = this,
                    i = t.success;
                return t.success = function(r) {
                    t.wait && n.add(e, t), i && i(e, r, t)
                }, e.save(null, t), e
            },
            parse: function(e) {
                return e
            },
            clone: function() {
                return new this.constructor(this.models)
            },
            _reset: function() {
                this.length = 0, this.models = [], this._byId = {}
            },
            _prepareModel: function(e, t) {
                if (e instanceof p) return e.collection || (e.collection = this), e;
                t || (t = {}), t.collection = this;
                var n = new this.model(e, t);
                return n._validate(e, t) ? n : (this.trigger("invalid", this, e, t), !1)
            },
            _removeReference: function(e) {
                this === e.collection && delete e.collection, e.off("all", this._onModelEvent, this)
            },
            _onModelEvent: function(e, t, n, i) {
                ("add" !== e && "remove" !== e || n === this) && ("destroy" === e && this.remove(t, i), t && e === "change:" + t.idAttribute && (delete this._byId[t.previous(t.idAttribute)], null != t.id && (this._byId[t.id] = t)), this.trigger.apply(this, arguments))
            }
        });
        var b = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain"];
        s.each(b, function(e) {
            g.prototype[e] = function() {
                var t = o.call(arguments);
                return t.unshift(this.models), s[e].apply(s, t)
            }
        });
        var w = ["groupBy", "countBy", "sortBy"];
        s.each(w, function(e) {
            g.prototype[e] = function(t, n) {
                var i = s.isFunction(t) ? t : function(e) {
                    return e.get(t)
                };
                return s[e](this.models, i, n)
            }
        });
        var x = e.View = function(e) {
                this.cid = s.uniqueId("view"), this._configure(e || {}), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
            },
            $ = /^(\S+)\s*(.*)$/,
            k = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
        s.extend(x.prototype, u, {
            tagName: "div",
            $: function(e) {
                return this.$el.find(e)
            },
            initialize: function() {},
            render: function() {
                return this
            },
            remove: function() {
                return this.$el.remove(), this.stopListening(), this
            },
            setElement: function(t, n) {
                return this.$el && this.undelegateEvents(), this.$el = t instanceof e.$ ? t : e.$(t), this.el = this.$el[0], n !== !1 && this.delegateEvents(), this
            },
            delegateEvents: function(e) {
                if (!e && !(e = s.result(this, "events"))) return this;
                this.undelegateEvents();
                for (var t in e) {
                    var n = e[t];
                    if (s.isFunction(n) || (n = this[e[t]]), n) {
                        var i = t.match($),
                            r = i[1],
                            o = i[2];
                        n = s.bind(n, this), r += ".delegateEvents" + this.cid, "" === o ? this.$el.on(r, n) : this.$el.on(r, o, n)
                    }
                }
                return this
            },
            undelegateEvents: function() {
                return this.$el.off(".delegateEvents" + this.cid), this
            },
            _configure: function(e) {
                this.options && (e = s.extend({}, s.result(this, "options"), e)), s.extend(this, s.pick(e, k)), this.options = e
            },
            _ensureElement: function() {
                if (this.el) this.setElement(s.result(this, "el"), !1);
                else {
                    var t = s.extend({}, s.result(this, "attributes"));
                    this.id && (t.id = s.result(this, "id")), this.className && (t["class"] = s.result(this, "className"));
                    var n = e.$("<" + s.result(this, "tagName") + ">").attr(t);
                    this.setElement(n, !1)
                }
            }
        }), e.sync = function(t, n, i) {
            var r = _[t];
            s.defaults(i || (i = {}), {
                emulateHTTP: e.emulateHTTP,
                emulateJSON: e.emulateJSON
            });
            var o = {
                type: r,
                dataType: "json"
            };
            if (i.url || (o.url = s.result(n, "url") || j()), null != i.data || !n || "create" !== t && "update" !== t && "patch" !== t || (o.contentType = "application/json", o.data = JSON.stringify(i.attrs || n.toJSON(i))), i.emulateJSON && (o.contentType = "application/x-www-form-urlencoded", o.data = o.data ? {
                    model: o.data
                } : {}), i.emulateHTTP && ("PUT" === r || "DELETE" === r || "PATCH" === r)) {
                o.type = "POST", i.emulateJSON && (o.data._method = r);
                var a = i.beforeSend;
                i.beforeSend = function(e) {
                    return e.setRequestHeader("X-HTTP-Method-Override", r), a ? a.apply(this, arguments) : void 0
                }
            }
            "GET" === o.type || i.emulateJSON || (o.processData = !1), "PATCH" !== o.type || !window.ActiveXObject || window.external && window.external.msActiveXFilteringEnabled || (o.xhr = function() {
                return new ActiveXObject("Microsoft.XMLHTTP")
            });
            var u = i.xhr = e.ajax(s.extend(o, i));
            return n.trigger("request", n, u, i), u
        };
        var _ = {
            create: "POST",
            update: "PUT",
            patch: "PATCH",
            "delete": "DELETE",
            read: "GET"
        };
        e.ajax = function() {
            return e.$.ajax.apply(e.$, arguments)
        };
        var C = e.Router = function(e) {
                e || (e = {}), e.routes && (this.routes = e.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
            },
            E = /\((.*?)\)/g,
            S = /(\(\?)?:\w+/g,
            T = /\*\w+/g,
            P = /[\-{}\[\]+?.,\\\^$|#\s]/g;
        s.extend(C.prototype, u, {
            initialize: function() {},
            route: function(t, n, i) {
                s.isRegExp(t) || (t = this._routeToRegExp(t)), s.isFunction(n) && (i = n, n = ""), i || (i = this[n]);
                var r = this;
                return e.history.route(t, function(o) {
                    var a = r._extractParameters(t, o);
                    i && i.apply(r, a), r.trigger.apply(r, ["route:" + n].concat(a)), r.trigger("route", n, a), e.history.trigger("route", r, n, a)
                }), this
            },
            navigate: function(t, n) {
                return e.history.navigate(t, n), this
            },
            _bindRoutes: function() {
                if (this.routes) {
                    this.routes = s.result(this, "routes");
                    for (var e, t = s.keys(this.routes); null != (e = t.pop());) this.route(e, this.routes[e])
                }
            },
            _routeToRegExp: function(e) {
                return e = e.replace(P, "\\$&").replace(E, "(?:$1)?").replace(S, function(e, t) {
                    return t ? e : "([^/]+)"
                }).replace(T, "(.*?)"), new RegExp("^" + e + "$")
            },
            _extractParameters: function(e, t) {
                var n = e.exec(t).slice(1);
                return s.map(n, function(e) {
                    return e ? decodeURIComponent(e) : null
                })
            }
        });
        var A = e.History = function() {
                this.handlers = [], s.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, this.history = window.history)
            },
            I = /^[#\/]|\s+$/g,
            N = /^\/+|\/+$/g,
            D = /msie [\w.]+/,
            M = /\/$/;
        A.started = !1, s.extend(A.prototype, u, {
            interval: 50,
            getHash: function(e) {
                var t = (e || this).location.href.match(/#(.*)$/);
                return t ? t[1] : ""
            },
            getFragment: function(e, t) {
                if (null == e)
                    if (this._hasPushState || !this._wantsHashChange || t) {
                        e = this.location.pathname;
                        var n = this.root.replace(M, "");
                        e.indexOf(n) || (e = e.substr(n.length))
                    } else e = this.getHash();
                return e.replace(I, "")
            },
            start: function(t) {
                if (A.started) throw new Error("Backbone.history has already been started");
                A.started = !0, this.options = s.extend({}, {
                    root: "/"
                }, this.options, t), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
                var n = this.getFragment(),
                    i = document.documentMode,
                    r = D.exec(navigator.userAgent.toLowerCase()) && (!i || 7 >= i);
                this.root = ("/" + this.root + "/").replace(N, "/"), r && this._wantsHashChange && (this.iframe = e.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(n)), this._hasPushState ? e.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !r ? e.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = n;
                var o = this.location,
                    a = o.pathname.replace(/[^\/]$/, "$&/") === this.root;
                return this._wantsHashChange && this._wantsPushState && !this._hasPushState && !a ? (this.fragment = this.getFragment(null, !0), this.location.replace(this.root + this.location.search + "#" + this.fragment), !0) : (this._wantsPushState && this._hasPushState && a && o.hash && (this.fragment = this.getHash().replace(I, ""), this.history.replaceState({}, document.title, this.root + this.fragment + o.search)), this.options.silent ? void 0 : this.loadUrl())
            },
            stop: function() {
                e.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), clearInterval(this._checkUrlInterval), A.started = !1
            },
            route: function(e, t) {
                this.handlers.unshift({
                    route: e,
                    callback: t
                })
            },
            checkUrl: function() {
                var e = this.getFragment();
                return e === this.fragment && this.iframe && (e = this.getFragment(this.getHash(this.iframe))), e === this.fragment ? !1 : (this.iframe && this.navigate(e), this.loadUrl() || this.loadUrl(this.getHash()), void 0)
            },
            loadUrl: function(e) {
                var t = this.fragment = this.getFragment(e),
                    n = s.any(this.handlers, function(e) {
                        return e.route.test(t) ? (e.callback(t), !0) : void 0
                    });
                return n
            },
            navigate: function(e, t) {
                if (!A.started) return !1;
                if (t && t !== !0 || (t = {
                        trigger: t
                    }), e = this.getFragment(e || ""), this.fragment !== e) {
                    this.fragment = e;
                    var n = this.root + e;
                    if (this._hasPushState) this.history[t.replace ? "replaceState" : "pushState"]({}, document.title, n);
                    else {
                        if (!this._wantsHashChange) return this.location.assign(n);
                        this._updateHash(this.location, e, t.replace), this.iframe && e !== this.getFragment(this.getHash(this.iframe)) && (t.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, e, t.replace))
                    }
                    t.trigger && this.loadUrl(e)
                }
            },
            _updateHash: function(e, t, n) {
                if (n) {
                    var i = e.href.replace(/(javascript:|#).*$/, "");
                    e.replace(i + "#" + t)
                } else e.hash = "#" + t
            }
        }), e.history = new A;
        var L = function(e, t) {
            var n, i = this;
            n = e && s.has(e, "constructor") ? e.constructor : function() {
                return i.apply(this, arguments)
            }, s.extend(n, i, t);
            var r = function() {
                this.constructor = n
            };
            return r.prototype = i.prototype, n.prototype = new r, e && s.extend(n.prototype, e), n.__super__ = i.prototype, n
        };
        p.extend = g.extend = C.extend = x.extend = A.extend = L;
        var j = function() {
                throw new Error('A "url" property or function must be specified')
            },
            O = function(e, t) {
                var n = t.error;
                t.error = function(i) {
                    n && n(e, i, t), e.trigger("error", e, i, t)
                }
            }
    }.call(this), // Copyright
    this.oak = function() {
        "use strict";

        function e(e) {
            for (var t in e) n.core.prototype[t] = e[t]
        }
        var t = "0.0.3",
            n = {},
            i = {
                _identifier: /^#[a-zA-Z\-_]+$/,
                _splitter: /\s+/,
                _arrProto: Array.prototype,
                _funcProto: Function.prototype,
                _objProto: Object.prototype,
                _strProto: String.prototype,
                each: function(e, t, n) {
                    if (i._arrProto.forEach && e.forEach === i._arrProto.forEach) return e.forEach(t, n);
                    if (e.length) {
                        var r, o = e.length;
                        for (r = 0; o > r; r += 1)
                            if (t.call(n, e[r], r, e) === {}) return
                    } else {
                        var a;
                        for (a in e)
                            if (i._objProto.hasOwnProperty.call(e, a) && t.call(n, e[a], a, e) === {}) return
                    }
                },
                defined: function() {
                    var e, t = i._arrProto.slice.call(arguments, 0),
                        n = t.length;
                    for (e = 0; n > e; e += 1)
                        if ("undefined" == typeof t[e]) return !1;
                    return !0
                },
                exists: function() {
                    var e, t = i._arrProto.slice.call(arguments, 0),
                        n = t.length;
                    for (e = 0; n > e; e += 1)
                        if ("undefined" == typeof t[e] || !t[e]) return !1;
                    return !0
                },
                extend: function(e) {
                    var t = i._arrProto.slice.call(arguments, 1);
                    return i.each(t, function(t) {
                        if (t)
                            for (var n in t) e[n] = t[n]
                    }), e
                },
                isArray: Array.isArray || function(e) {
                    return "[object Array]" === i._objProto.toString.call(e)
                },
                isElement: function(e) {
                    return e instanceof HTMLElement
                },
                isEmpty: function(e) {
                    if (null == e) return !0;
                    if (i.isArray(e) || i.isString(e)) return 0 === e.length;
                    for (var t in e)
                        if (i._objProto.hasOwnProperty.call(e, t)) return !1;
                    return !0
                },
                isNode: function(e) {
                    return 1 === e.nodeType
                },
                isStrap: function(e) {
                    return n.core.prototype.isPrototypeOf(e)
                },
                privateKey: "oak" + (t + Math.random()).replace(/\D/g, "")
            };
        return n.core = function() {}, n.core.prototype = {
            add: function(e) {
                if (e.length) {
                    var t, n = e.length;
                    for (t = 0; n > t; t += 1) this.push(e[t])
                } else this.push(e);
                return this
            },
            each: function(e, t) {
                return i.each(this, e, t), this
            },
            extend: function() {
                var e = [this].concat(i._arrProto.slice.call(arguments, 0));
                return i.extend.apply(i, e), this
            },
            push: i._arrProto.push,
            splice: i._arrProto.splice
        }, i.strap = function(e, t) {
            var r = new n.core;
            if ("string" == typeof e) i._identifier.test(e) ? (r[0] = document.getElementById(e.substr(1)), r.length = 1) : r.add(document.querySelectorAll(e));
            else {
                if (i.defined(e) && i.defined(e.find, t) && "string" == typeof t) return e.find(t);
                arguments.length && r.add(i._arrProto.slice.call(arguments, 0))
            }
            return r
        }, i.core = {
            extend: function() {
                var e = [i].concat(i._arrProto.slice.call(arguments, 0));
                i.extend.apply(i, e)
            },
            expose: e
        }, i.each(["Arguments", "Date", "Function", "Number", "RegExp", "String"], function(e) {
            i["is" + e] = function(t) {
                return i._objProto.toString.call(t) === "[object " + e + "]"
            }
        }), "function" == typeof define && define.amd && define(i), i
    }(),
    function(e) {
        "use strict";
        var t = {
            on: function(t, n) {
                if (!e.defined(t, n)) return this;
                this.events = this.events || {};
                var i = this.events[t] || (this.events[t] = []);
                return i.push(n), this
            },
            off: function(t, n) {
                if (!e.defined(t, this.events) || !e.defined(this.events[t])) return this;
                if (e.defined(n)) {
                    var i = this;
                    e.each(this.events[t], function(e, r) {
                        e === n && i.events[t].splice(r, 1)
                    })
                }
                return e.defined(n) && 0 !== this.events[t].length || delete this.events[t], this
            },
            once: function(t, n) {
                if (!e.defined(t, n)) return this;
                var i = function() {
                    n.apply(this, arguments), this.off(t, i)
                };
                return this.on(t, i)
            },
            trigger: function(t) {
                if (!e.defined(t, this.events) || !e.defined(this.events[t])) return this;
                var n = this,
                    i = e._arrProto.slice.call(arguments, 1);
                return e.each(this.events[t], function(e) {
                    e.apply(n, i)
                }), this
            }
        };
        e.core.expose(t)
    }(oak),
    function(e) {
        "use strict";

        function t(e, t) {
            return r(e)[t]
        }

        function n(e, t) {
            return t ? a : e
        }

        function i(t, n) {
            return n ? t[e.privateKey] : t[e.privateKey] && e.privateKey
        }

        function r(t) {
            var r, o = e.isNode(t),
                a = n(t, o),
                u = i(t, o);
            return u || (o ? t[e.privateKey] = u = s += 1 : u = e.privateKey), r = a[u] = a[u] || {}
        }

        function o(e, t, n) {
            var i = r(e);
            i[t] = n
        }
        var a = {},
            s = 0,
            u = {
                data: function(n, i) {
                    if (n.match(e._splitter)) throw new Error("Data key must not contain whitespace");
                    return e.defined(i) ? this.each(function(e) {
                        o(e, n, i)
                    }) : this.length ? t(this[0], n) : void 0
                },
                removeData: function(t) {
                    return this.each(function(r) {
                        var o = e.isNode(r),
                            a = i(r, o),
                            s = n(r, o),
                            u = s[a];
                        e.defined(u) && (delete u[t], !o && e.isEmpty(u) && delete r[e.privateKey])
                    })
                }
            };
        e.core.expose(u)
    }(oak),
    function(e) {
        "use strict";

        function t(e, t, n) {
            e.each(function(e) {
                e.style[t] = n
            })
        }

        function n(e) {
            return "undefined" != typeof e && null !== e
        }
        var i = document.createElement("div"),
            r = {
                addClass: function(e) {
                    return this.each(function(t) {
                        if (o.hasClass(t, e) === !1) {
                            var n = t.className + (t.className.length ? " " : "");
                            n += e, t.className = n
                        }
                    })
                },
                append: function(t) {
                    return this.each(function(n) {
                        e.isNode(t) ? n.appendChild(t) : e.isString(t) ? n.appendChild(o.build(t)) : e.isStrap(t) && t.each(function(e) {
                            n.appendChild(e)
                        })
                    })
                },
                bounds: function() {
                    return this[0].getBoundingClientRect()
                },
                css: function(i, r) {
                    if ("object" == typeof i) {
                        var a, s;
                        for (a in i) i.hasOwnProperty(a) && (s = e.isString(s) ? i[a] : i[a].toString(), a = o.toStyle(a), t(this, a, s))
                    } else {
                        if (i = o.toStyle(i), !n(r)) return this[0].style[i] || window.getComputedStyle(this[0])[i];
                        this.each(function(e) {
                            e.style[i] = r
                        })
                    }
                    return this
                },
                find: function(t) {
                    var n, i = e.strap();
                    return this.each(function(r) {
                        n = r.querySelectorAll(t), e.each(n, function(e) {
                            i.push(e)
                        })
                    }), i
                },
                forceEvent: function(e) {
                    return this.each(function(t) {
                        var n;
                        document.createEvent ? (n = document.createEvent("HTMLEvents"), n.initEvent(e, !0, !0), t.dispatchEvent(n)) : (n = document.createEventObject(), t.fireEvent("on" + e, n))
                    })
                },
                hasClass: function(e) {
                    var t = !1;
                    return this.each(function(n) {
                        o.hasClass(n, e) && (t = !0)
                    }), t
                },
                html: function(e) {
                    return this.each(function(t) {
                        t.innerHTML = e
                    })
                },
                hide: function() {
                    return this.css("display", "none")
                },
                prepend: function(t) {
                    return this.each(function(n) {
                        var i = t;
                        e.isStrap(t) ? t.each(function(e) {
                            n.children.length ? n.insertBefore(e, n.firstChild) : n.appendChild(e)
                        }) : (e.isString(t) ? i = e.build(t) : e.isNode(t) && (i = t), n.children.length ? n.insertBefore(i, n.firstChild) : n.appendChild(i))
                    })
                },
                remove: function() {
                    return this.each(function(e) {
                        var t = e.parentNode;
                        t && t.removeChild(e)
                    })
                },
                removeClass: function(e) {
                    var t, n = new RegExp("\\b" + e + "\\b\\s?", "g");
                    return this.each(function(e) {
                        t = e.className.replace(n, ""), e.className = t
                    })
                },
                show: function() {
                    return this.each(function(e) {
                        e.style.display = "block"
                    })
                },
                transform: function(t, n) {
                    var i = this.css(e.support.transform),
                        r = new RegExp("(" + t + ")\\([^\\(\\)]+\\)");
                    return r.test(i) ? i = i.replace(r, "$1(" + n + ")") : i += " " + t + "(" + n + ")", this.css(e.support.transform, i), this
                },
                visible: function(t) {
                    return e.defined(t) ? this.each(function(e) {
                        e.style.visibility = t === !1 ? "hidden" : "visible"
                    }) : "hidden" !== this.css("visibility")
                }
            },
            o = {
                build: function(e) {
                    i.innerHTML = e;
                    var t = i.firstChild;
                    return t
                },
                contains: function(e, t) {
                    if (t)
                        for (var n; n = n.parentNode;)
                            if (n === e[0]) return !0;
                    return !1
                },
                find: function(e) {
                    return document.querySelector(e)
                },
                findAll: function(e) {
                    return document.querySelectorAll(e)
                },
                hasClass: function(e, t) {
                    var n = !1,
                        i = new RegExp("\\b" + t + "\\b\\s?", "g");
                    return i.test(e.className) && (n = !0), n
                },
                toDash: function(e) {
                    var t = e.replace(/^(webkit|moz|o|ms)(?=[A-Z]{1})/, function(e) {
                        return "-" + e
                    });
                    return t = t.replace(/([A-Z])/g, function(e) {
                        return "-" + e.toLowerCase()
                    })
                },
                toStyle: function(e) {
                    return e.replace(/\b-(\w{1})|-/g, function(e) {
                        return e.replace(/\-/, "").toUpperCase()
                    })
                }
            };
        e.core.expose(r), e.core.extend(o)
    }(oak),
    function(e) {
        "use strict";

        function t(e) {
            var t, n, i;
            if (e in f) return o(e);
            for (n = e.charAt(0).toUpperCase() + e.substr(1), t = 0; d > t; t += 1)
                if (i = c[t] + n, i in f) return o(i)
        }

        function n() {
            return -1 !== navigator.appVersion.indexOf("MSIE") ? !0 : !1
        }

        function i(e) {
            var t;
            return p.ie === !0 && (t = parseFloat(navigator.appVersion.split("MSIE")[1])), t === e
        }

        function r() {
            return "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch || window.navigator.msMaxTouchPoints ? !0 : !1
        }

        function o(e) {
            return e.replace(/([A-Z])/g, function(e) {
                return "-" + e.toLowerCase()
            })
        }

        function a() {
            return window.DeviceOrientationEvent ? "deviceOrientation" : window.orientationEvent ? "MozOrientation" : void 0
        }

        function s() {
            if (u.canvas === !1) return 1;
            var e = p._dummyCtx,
                t = window.devicePixelRatio || 1,
                n = e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1;
            return t / n
        }
        var u, l = {
                animation: "animationend",
                "-moz-animation": "animationend",
                "-webkit-animation": "webkitAnimationEnd"
            },
            c = ["Moz", "Webkit", "O", "ms"],
            d = c.length,
            f = (document.body || document.documentElement).style,
            p = {};
        u = {
            animation: t("animation"),
            animationDelay: t("animationDelay"),
            animationDirection: t("animationDirection"),
            animationDuration: t("animationDuration"),
            animationFillMode: t("animationFillMode"),
            animationIterationCount: t("animationIterationCount"),
            animationName: t("animationName"),
            animationPlayState: t("animationPlayState"),
            animationTimingFunction: t("animationTimingFunction"),
            ie: n(),
            isIEVersion: i,
            isTouch: r(),
            deviceMotion: window.DeviceMotionEvent ? !0 : !1,
            orientation: window.DeviceOrientationEvent || window.OrientationEvent ? !0 : !1,
            orientationEvent: a(),
            getProp: t,
            perspective: t("perspective"),
            perspectiveOrigin: t("perspective-origin"),
            pixelRatio: window.devicePixelRatio || 1,
            prefixes: c,
            transition: t("transition"),
            transitionDelay: t("transitionDelay"),
            transitionDuration: t("transitionDuration"),
            transitionProperty: t("transitionProperty"),
            transitionTimingFunction: t("transitionTimingFunction"),
            transform: t("transform")
        }, p._dummyCanvas = document.createElement("canvas"), "undefined" != typeof p._dummyCanvas && p._dummyCanvas.getContext && (p._dummyCtx = p._dummyCanvas.getContext("2d")), u.animationEnd = l[u.animation], u.canvas = e.defined(p._dummyCtx), u.cssanimations = "undefined" == typeof u.animation ? !1 : !0, u.csstransitions = "undefined" == typeof u.transition ? !1 : !0;
        var h, m = {
                ontransitionend: "transitionend",
                onotransitionend: "oTransitionEnd",
                onwebkittransitionend: "webkitTransitionEnd"
            },
            g = {
                transition: "transitionend",
                "-moz-transition": "transitionend",
                "-o-transition": "oTransitionEnd",
                "-webkit-transition": "webkitTransitionEnd",
                "-ms-transition": "MSTransitionEnd"
            };
        for (h in m)
            if (h in window) {
                u.transitionEnd = m[h];
                break
            }
            "undefined" == typeof u.transitionEnd && (u.transitionEnd = g[u.transition]), u.deviceBackingRatio = s(), p.support = u, e.core.extend(p)
    }(oak),
    function(e) {
        "use strict";
        var t = {
            ease: "ease",
            easeLinear: "linear",
            easeOut: "ease-out",
            easeIn: "ease-in",
            easeInOut: "ease-in-out",
            easeInQuad: "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
            easeOutQuad: "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
            easeInOutQuad: "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
            easeInCubic: "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
            easeOutCubic: "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
            easeInOutCubic: "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
            easeInQuart: "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
            easeOutQuart: "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
            easeInOutQuart: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
            easeInQuint: "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
            easeOutQuint: "cubic-bezier(0.230, 1.000, 0.320, 1.000)",
            easeOnOutQuint: "cubic-bezier(0.860, 0.000, 0.070, 1.000)",
            easeInSine: "cubic-bezier(0.470, 0.000, 0.745, 0.715)",
            easeOutSine: "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
            easeInOutSine: "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
            easeInExpo: "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
            easeOutExpo: "cubic-bezier(0.190, 1.000, 0.220, 1.000)",
            easeInOutExpo: "cubic-bezier(1.000, 0.000, 0.000, 1.000)",
            easeInCirc: "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
            easeOutCirc: "cubic-bezier(0.075, 0.820, 0.165, 1.000)",
            easeInOutCirc: "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
            easeInBack: "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
            easeOutBack: "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
            easeInOutBack: "cubic-bezier(0.680, -0.550, 0.265, 1.550)"
        };
        e.core.extend({
            timing: t
        })
    }(oak),
    function(e) {
        "use strict";

        function t(t, n) {
            var a, s = !1,
                u = !1;
            e.each(n, function(l, c) {
                e.defined(r[c]) || (a = e.toDash(c), o[a] && (a = o[c]), t[a] = {
                    value: n[c],
                    timing: n.timing || r.timing,
                    delay: i(n.delay, "ms"),
                    duration: i(n.duration || r.duration, "ms")
                }, s === !1 && "function" == typeof n.onComplete && (s = !0, t[a].onComplete = n.onComplete), u === !1 && "function" == typeof n.fallback && (u = !0, t[a].fallback = n.fallback))
            })
        }

        function n(t, n) {
            return function i(r) {
                if (r.target === this && r.propertyName in n != !1) {
                    var o, a = n[r.propertyName],
                        s = a.onComplete;
                    o = t.data("trans-data"), e.defined(o) ? 1 === o.numTrans ? (this.removeEventListener(e.support.transitionEnd, i), t.css(e.support.transition, o.oldCSS), t.removeData("trans-data")) : (o.numTrans -= 1, t.data("trans-data", o)) : t.css(e.support.transition, ""), "function" == typeof s && (a.onComplete = void 0, s.call(t))
                }
            }
        }

        function i(e, t) {
            return "string" != typeof e || e.match(/^[\-0-9\.]+$/) ? "undefined" != typeof e ? e + t : void 0 : e
        }
        var r = {
                duration: "500",
                timing: e.timing.ease,
                delay: "0ms",
                onComplete: "",
                fallback: ""
            },
            o = {
                transform: e.support.transform
            },
            a = {};
        a.transition = function(i) {
            var r, o, a, s, u = {},
                l = 0,
                c = {},
                d = [];
            t(c, i);
            for (r in c) o = c[r], s = e.toDash(r) + " " + o.duration + " " + o.timing, "undefined" != typeof o.delay && (s += " " + o.delay), d.push(s), u[r] = o.value, l += 1;
            if (e.support.csstransitions === !0) a = this.data("trans-data") || {}, ("undefined" == typeof a.running || a.running === !1) && (a = {
                oldCSS: this.css(e.support.transition),
                onEnd: n(this, c)
            }, this[0].addEventListener(e.support.transitionEnd, a.onEnd)), a.running = !0, a.numTrans = d.length, this.data("trans-data", a).css(e.support.transition, d.join(", ")).css(u);
            else if (o.fallback) o.fallback.call(this);
            else if (this.css(u), "function" == typeof o.onComplete) {
                var f = o.onComplete;
                o.onComplete = null, setTimeout(function() {
                    f.call(this)
                }, 0)
            }
            return this
        }, e.core.expose(a)
    }(oak),
    function(e) {
        "use strict";
        var t, n, i = {},
            r = 0,
            o = e.support.prefixes;
        if (window.requestAnimationFrame) n = window.requestAnimationFrame;
        else
            for (var a = 0; a < o.length && !i.requestAnimationFrame; a += 1) n = window[o[a] + "RequestAnimationFrame"], t = window[o[a] + "CancelAnimationFrame"] || window[o[a] + "CancelRequestAnimationFrame"];
        i.cancelAnimationFrame = t ? function() {
            t.apply(window, arguments)
        } : function(e) {
            clearTimeout(e)
        }, i.requestAnimationFrame = n ? function() {
            n.apply(window, arguments)
        } : function(e) {
            var t = (new Date).getTime(),
                n = Math.max(0, 16 - (t - r)),
                i = window.setTimeout(function() {
                    e(t + n)
                }, n);
            return r = t + n, i
        }, e.core.extend(i)
    }(oak),
    function(e) {
        "use strict";
        var t = /^(\w)/,
            n = {
                capitalize: function(e) {
                    return e.replace(t, function(e) {
                        return e.toUpperCase()
                    })
                },
                degsToRads: function(e) {
                    return e * Math.PI / 180
                },
                hexToRGB: function(e) {
                    var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
                    return t ? {
                        r: parseInt(t[1], 16),
                        g: parseInt(t[2], 16),
                        b: parseInt(t[3], 16)
                    } : void 0
                },
                radsToDegs: function(e) {
                    return 180 * e / Math.PI
                },
                rand: function(e, t) {
                    return Math.random() * (t - e) + e
                },
                rgbToHex: function(e, t, n) {
                    return "#" + ((1 << 24) + (e << 16) + (t << 8) + n).toString(16).slice(1)
                },
                shuffle: function(e) {
                    var t, n, i, r = e.length;
                    if (0 === r) return !1;
                    for (; --r;) t = Math.floor(Math.random() * (r + 1)), n = e[r], i = e[t], e[r] = i, e[t] = n;
                    return e
                },
                shuffleString: function(e) {
                    if ("undefined" == typeof e || !e || !e.length) return e;
                    var t = e.toString();
                    return n.shuffle(t.split("")).join("")
                }
            };
        e.core.extend(n)
    }(oak);
var TWEEN = TWEEN || function() {
    var e = [];
    return {
        REVISION: "10",
        getAll: function() {
            return e
        },
        removeAll: function() {
            e = []
        },
        add: function(t) {
            e.push(t)
        },
        remove: function(t) {
            t = e.indexOf(t), -1 !== t && e.splice(t, 1)
        },
        update: function(t) {
            if (0 === e.length) return !1;
            for (var n = 0, i = e.length, t = void 0 !== t ? t : void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now(); i > n;) e[n].update(t) ? n++ : (e.splice(n, 1), i--);
            return !0
        }
    }
}();
TWEEN.Tween = function(e) {
        var t, n = {},
            i = {},
            r = {},
            o = 1e3,
            a = 0,
            s = 0,
            u = null,
            l = TWEEN.Easing.Linear.None,
            c = TWEEN.Interpolation.Linear,
            d = [],
            f = null,
            p = !1,
            h = null,
            m = null;
        for (t in e) n[t] = parseFloat(e[t], 10);
        this.to = function(e, t) {
            return void 0 !== t && (o = t), i = e, this
        }, this.start = function(t) {
            TWEEN.add(this), p = !1, u = void 0 !== t ? t : void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now(), u += s;
            for (var o in i) {
                if (i[o] instanceof Array) {
                    if (0 === i[o].length) continue;
                    i[o] = [e[o]].concat(i[o])
                }
                n[o] = e[o], !1 == n[o] instanceof Array && (n[o] *= 1), r[o] = n[o] || 0
            }
            return this
        }, this.stop = function() {
            return TWEEN.remove(this), this
        }, this.delay = function(e) {
            return s = e, this
        }, this.repeat = function(e) {
            return a = e, this
        }, this.easing = function(e) {
            return l = e, this
        }, this.interpolation = function(e) {
            return c = e, this
        }, this.chain = function() {
            return d = arguments, this
        }, this.onStart = function(e) {
            return f = e, this
        }, this.onUpdate = function(e) {
            return h = e, this
        }, this.onComplete = function(e) {
            return m = e, this
        }, this.update = function(t) {
            if (u > t) return !0;
            !1 === p && (null !== f && f.call(e), p = !0);
            var g, v = (t - u) / o,
                v = v > 1 ? 1 : v,
                y = l(v);
            for (g in i) {
                var b = n[g] || 0,
                    w = i[g];
                w instanceof Array ? e[g] = c(w, y) : ("string" == typeof w && (w = b + parseFloat(w, 10)), e[g] = b + (w - b) * y)
            }
            if (null !== h && h.call(e, y), 1 == v) {
                if (!(a > 0)) {
                    for (null !== m && m.call(e), v = 0, y = d.length; y > v; v++) d[v].start(t);
                    return !1
                }
                isFinite(a) && a--;
                for (g in r) "string" == typeof i[g] && (r[g] += parseFloat(i[g], 10)), n[g] = r[g];
                u = t + s
            }
            return !0
        }
    }, TWEEN.Easing = {
        Linear: {
            None: function(e) {
                return e
            }
        },
        Quadratic: {
            In: function(e) {
                return e * e
            },
            Out: function(e) {
                return e * (2 - e)
            },
            InOut: function(e) {
                return 1 > (e *= 2) ? .5 * e * e : -.5 * (--e * (e - 2) - 1)
            }
        },
        Cubic: {
            In: function(e) {
                return e * e * e
            },
            Out: function(e) {
                return --e * e * e + 1
            },
            InOut: function(e) {
                return 1 > (e *= 2) ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2)
            }
        },
        Quartic: {
            In: function(e) {
                return e * e * e * e
            },
            Out: function(e) {
                return 1 - --e * e * e * e
            },
            InOut: function(e) {
                return 1 > (e *= 2) ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2)
            }
        },
        Quintic: {
            In: function(e) {
                return e * e * e * e * e
            },
            Out: function(e) {
                return --e * e * e * e * e + 1
            },
            InOut: function(e) {
                return 1 > (e *= 2) ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2)
            }
        },
        Sinusoidal: {
            In: function(e) {
                return 1 - Math.cos(e * Math.PI / 2)
            },
            Out: function(e) {
                return Math.sin(e * Math.PI / 2)
            },
            InOut: function(e) {
                return .5 * (1 - Math.cos(Math.PI * e))
            }
        },
        Exponential: {
            In: function(e) {
                return 0 === e ? 0 : Math.pow(1024, e - 1)
            },
            Out: function(e) {
                return 1 === e ? 1 : 1 - Math.pow(2, -10 * e)
            },
            InOut: function(e) {
                return 0 === e ? 0 : 1 === e ? 1 : 1 > (e *= 2) ? .5 * Math.pow(1024, e - 1) : .5 * (-Math.pow(2, -10 * (e - 1)) + 2)
            }
        },
        Circular: {
            In: function(e) {
                return 1 - Math.sqrt(1 - e * e)
            },
            Out: function(e) {
                return Math.sqrt(1 - --e * e)
            },
            InOut: function(e) {
                return 1 > (e *= 2) ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
            }
        },
        Elastic: {
            In: function(e) {
                var t, n = .1;
                return 0 === e ? 0 : 1 === e ? 1 : (!n || 1 > n ? (n = 1, t = .1) : t = .4 * Math.asin(1 / n) / (2 * Math.PI), -(n * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e - t) * Math.PI / .4)))
            },
            Out: function(e) {
                var t, n = .1;
                return 0 === e ? 0 : 1 === e ? 1 : (!n || 1 > n ? (n = 1, t = .1) : t = .4 * Math.asin(1 / n) / (2 * Math.PI), n * Math.pow(2, -10 * e) * Math.sin(2 * (e - t) * Math.PI / .4) + 1)
            },
            InOut: function(e) {
                var t, n = .1;
                return 0 === e ? 0 : 1 === e ? 1 : (!n || 1 > n ? (n = 1, t = .1) : t = .4 * Math.asin(1 / n) / (2 * Math.PI), 1 > (e *= 2) ? -.5 * n * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e - t) * Math.PI / .4) : .5 * n * Math.pow(2, -10 * (e -= 1)) * Math.sin(2 * (e - t) * Math.PI / .4) + 1)
            }
        },
        Back: {
            In: function(e) {
                return e * e * (2.70158 * e - 1.70158)
            },
            Out: function(e) {
                return --e * e * (2.70158 * e + 1.70158) + 1
            },
            InOut: function(e) {
                return 1 > (e *= 2) ? .5 * e * e * (3.5949095 * e - 2.5949095) : .5 * ((e -= 2) * e * (3.5949095 * e + 2.5949095) + 2)
            }
        },
        Bounce: {
            In: function(e) {
                return 1 - TWEEN.Easing.Bounce.Out(1 - e)
            },
            Out: function(e) {
                return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
            },
            InOut: function(e) {
                return .5 > e ? .5 * TWEEN.Easing.Bounce.In(2 * e) : .5 * TWEEN.Easing.Bounce.Out(2 * e - 1) + .5
            }
        }
    }, TWEEN.Interpolation = {
        Linear: function(e, t) {
            var n = e.length - 1,
                i = n * t,
                r = Math.floor(i),
                o = TWEEN.Interpolation.Utils.Linear;
            return 0 > t ? o(e[0], e[1], i) : t > 1 ? o(e[n], e[n - 1], n - i) : o(e[r], e[r + 1 > n ? n : r + 1], i - r)
        },
        Bezier: function(e, t) {
            var n, i = 0,
                r = e.length - 1,
                o = Math.pow,
                a = TWEEN.Interpolation.Utils.Bernstein;
            for (n = 0; r >= n; n++) i += o(1 - t, r - n) * o(t, n) * e[n] * a(r, n);
            return i
        },
        CatmullRom: function(e, t) {
            var n = e.length - 1,
                i = n * t,
                r = Math.floor(i),
                o = TWEEN.Interpolation.Utils.CatmullRom;
            return e[0] === e[n] ? (0 > t && (r = Math.floor(i = n * (1 + t))), o(e[(r - 1 + n) % n], e[r], e[(r + 1) % n], e[(r + 2) % n], i - r)) : 0 > t ? e[0] - (o(e[0], e[0], e[1], e[1], -i) - e[0]) : t > 1 ? e[n] - (o(e[n], e[n], e[n - 1], e[n - 1], i - n) - e[n]) : o(e[r ? r - 1 : 0], e[r], e[r + 1 > n ? n : r + 1], e[r + 2 > n ? n : r + 2], i - r)
        },
        Utils: {
            Linear: function(e, t, n) {
                return (t - e) * n + e
            },
            Bernstein: function(e, t) {
                var n = TWEEN.Interpolation.Utils.Factorial;
                return n(e) / n(t) / n(e - t)
            },
            Factorial: function() {
                var e = [1];
                return function(t) {
                    var n, i = 1;
                    if (e[t]) return e[t];
                    for (n = t; n > 1; n--) i *= n;
                    return e[t] = i
                }
            }(),
            CatmullRom: function(e, t, n, i, r) {
                var e = .5 * (n - e),
                    i = .5 * (i - t),
                    o = r * r;
                return (2 * t - 2 * n + e + i) * r * o + (-3 * t + 3 * n - 2 * e - i) * o + e * r + t
            }
        }
    },
    /*!
     * typeahead.js 0.9.2
     * https://github.com/twitter/typeahead
     * Copyright 2013 Twitter, Inc. and other contributors; Licensed MIT
     */
    function(e) {
        var t = "0.9.2",
            n = {
                isMsie: function() {
                    var e = /(msie) ([\w.]+)/i.exec(navigator.userAgent);
                    return e ? parseInt(e[2], 10) : !1
                },
                isBlankString: function(e) {
                    return !e || /^\s*$/.test(e)
                },
                escapeRegExChars: function(e) {
                    return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                },
                isString: function(e) {
                    return "string" == typeof e
                },
                isNumber: function(e) {
                    return "number" == typeof e
                },
                isArray: e.isArray,
                isFunction: e.isFunction,
                isObject: e.isPlainObject,
                isUndefined: function(e) {
                    return void 0 === e
                },
                bind: e.proxy,
                bindAll: function(t) {
                    var n;
                    for (var i in t) e.isFunction(n = t[i]) && (t[i] = e.proxy(n, t))
                },
                indexOf: function(e, t) {
                    for (var n = 0; e.length > n; n++)
                        if (e[n] === t) return n;
                    return -1
                },
                each: e.each,
                map: e.map,
                filter: e.grep,
                every: function(t, n) {
                    var i = !0;
                    return t ? (e.each(t, function(e, r) {
                        return (i = n.call(null, r, e, t)) ? void 0 : !1
                    }), !!i) : i
                },
                some: function(t, n) {
                    var i = !1;
                    return t ? (e.each(t, function(e, r) {
                        return (i = n.call(null, r, e, t)) ? !1 : void 0
                    }), !!i) : i
                },
                mixin: e.extend,
                getUniqueId: function() {
                    var e = 0;
                    return function() {
                        return e++
                    }
                }(),
                defer: function(e) {
                    setTimeout(e, 0)
                },
                debounce: function(e, t, n) {
                    var i, r;
                    return function() {
                        var o, a, s = this,
                            u = arguments;
                        return o = function() {
                            i = null, n || (r = e.apply(s, u))
                        }, a = n && !i, clearTimeout(i), i = setTimeout(o, t), a && (r = e.apply(s, u)), r
                    }
                },
                throttle: function(e, t) {
                    var n, i, r, o, a, s;
                    return a = 0, s = function() {
                            a = new Date, r = null, o = e.apply(n, i)
                        },
                        function() {
                            var u = new Date,
                                l = t - (u - a);
                            return n = this, i = arguments, 0 >= l ? (clearTimeout(r), r = null, a = u, o = e.apply(n, i)) : r || (r = setTimeout(s, l)), o
                        }
                },
                tokenizeQuery: function(t) {
                    return e.trim(t).toLowerCase().split(/[\s]+/)
                },
                tokenizeText: function(t) {
                    return e.trim(t).toLowerCase().split(/[\s\-_]+/)
                },
                getProtocol: function() {
                    return location.protocol
                },
                noop: function() {}
            },
            i = function() {
                var e = /\s+/;
                return {
                    on: function(t, n) {
                        var i;
                        if (!n) return this;
                        for (this._callbacks = this._callbacks || {}, t = t.split(e); i = t.shift();) this._callbacks[i] = this._callbacks[i] || [], this._callbacks[i].push(n);
                        return this
                    },
                    trigger: function(t, n) {
                        var i, r;
                        if (!this._callbacks) return this;
                        for (t = t.split(e); i = t.shift();)
                            if (r = this._callbacks[i])
                                for (var o = 0; r.length > o; o += 1) r[o].call(this, {
                                    type: i,
                                    data: n
                                });
                        return this
                    }
                }
            }(),
            r = function() {
                function t(t) {
                    t && t.el || e.error("EventBus initialized without el"), this.$el = e(t.el)
                }
                var i = "typeahead:";
                return n.mixin(t.prototype, {
                    trigger: function(e) {
                        var t = [].slice.call(arguments, 1);
                        this.$el.trigger(i + e, t)
                    }
                }), t
            }(),
            o = function() {
                function e(e) {
                    this.prefix = ["__", e, "__"].join(""), this.ttlKey = "__ttl__", this.keyMatcher = RegExp("^" + this.prefix)
                }

                function t() {
                    return (new Date).getTime()
                }

                function i(e) {
                    return JSON.stringify(n.isUndefined(e) ? null : e)
                }

                function r(e) {
                    return JSON.parse(e)
                }
                var o, a;
                try {
                    o = window.localStorage
                } catch (s) {
                    o = null
                }
                return a = o && window.JSON ? {
                    _prefix: function(e) {
                        return this.prefix + e
                    },
                    _ttlKey: function(e) {
                        return this._prefix(e) + this.ttlKey
                    },
                    get: function(e) {
                        return this.isExpired(e) && this.remove(e), r(o.getItem(this._prefix(e)))
                    },
                    set: function(e, r, a) {
                        return n.isNumber(a) ? o.setItem(this._ttlKey(e), i(t() + a)) : o.removeItem(this._ttlKey(e)), o.setItem(this._prefix(e), i(r))
                    },
                    remove: function(e) {
                        return o.removeItem(this._ttlKey(e)), o.removeItem(this._prefix(e)), this
                    },
                    clear: function() {
                        var e, t, n = [],
                            i = o.length;
                        for (e = 0; i > e; e++)(t = o.key(e)).match(this.keyMatcher) && n.push(t.replace(this.keyMatcher, ""));
                        for (e = n.length; e--;) this.remove(n[e]);
                        return this
                    },
                    isExpired: function(e) {
                        var i = r(o.getItem(this._ttlKey(e)));
                        return n.isNumber(i) && t() > i ? !0 : !1
                    }
                } : {
                    get: n.noop,
                    set: n.noop,
                    remove: n.noop,
                    clear: n.noop,
                    isExpired: n.noop
                }, n.mixin(e.prototype, a), e
            }(),
            a = function() {
                function e(e) {
                    n.bindAll(this), e = e || {}, this.sizeLimit = e.sizeLimit || 10, this.cache = {}, this.cachedKeysByAge = []
                }
                return n.mixin(e.prototype, {
                    get: function(e) {
                        return this.cache[e]
                    },
                    set: function(e, t) {
                        var n;
                        this.cachedKeysByAge.length === this.sizeLimit && (n = this.cachedKeysByAge.shift(), delete this.cache[n]), this.cache[e] = t, this.cachedKeysByAge.push(e)
                    }
                }), e
            }(),
            s = function() {
                function t(e) {
                    n.bindAll(this), e = n.isString(e) ? {
                        url: e
                    } : e, u = u || new a, s = n.isNumber(e.maxParallelRequests) ? e.maxParallelRequests : s || 6, this.url = e.url, this.wildcard = e.wildcard || "%QUERY", this.filter = e.filter, this.replace = e.replace, this.ajaxSettings = {
                        type: "get",
                        cache: e.cache,
                        timeout: e.timeout,
                        dataType: e.dataType || "json",
                        beforeSend: e.beforeSend
                    }, this._get = (/^throttle$/i.test(e.rateLimitFn) ? n.throttle : n.debounce)(this._get, e.rateLimitWait || 300)
                }

                function i() {
                    l++
                }

                function r() {
                    l--
                }

                function o() {
                    return s > l
                }
                var s, u, l = 0,
                    c = {};
                return n.mixin(t.prototype, {
                    _get: function(e, t) {
                        function n(n) {
                            var r = i.filter ? i.filter(n) : n;
                            t && t(r), u.set(e, n)
                        }
                        var i = this;
                        o() ? this._sendRequest(e).done(n) : this.onDeckRequestArgs = [].slice.call(arguments, 0)
                    },
                    _sendRequest: function(t) {
                        function n() {
                            r(), c[t] = null, o.onDeckRequestArgs && (o._get.apply(o, o.onDeckRequestArgs), o.onDeckRequestArgs = null)
                        }
                        var o = this,
                            a = c[t];
                        return a || (i(), a = c[t] = e.ajax(t, this.ajaxSettings).always(n)), a
                    },
                    get: function(e, t) {
                        var i, r, o = this,
                            a = encodeURIComponent(e || "");
                        return t = t || n.noop, i = this.replace ? this.replace(this.url, a) : this.url.replace(this.wildcard, a), (r = u.get(i)) ? n.defer(function() {
                            t(o.filter ? o.filter(r) : r)
                        }) : this._get(i, t), !!r
                    }
                }), t
            }(),
            u = function() {
                function i(t) {
                    n.bindAll(this), n.isString(t.template) && !t.engine && e.error("no template engine specified"), t.local || t.prefetch || t.remote || e.error("one of local, prefetch, or remote is required"), this.name = t.name || n.getUniqueId(), this.limit = t.limit || 5, this.minLength = t.minLength || 1, this.header = t.header, this.footer = t.footer, this.valueKey = t.valueKey || "value", this.template = r(t.template, t.engine, this.valueKey), this.local = t.local, this.prefetch = t.prefetch, this.remote = t.remote, this.itemHash = {}, this.adjacencyList = {}, this.storage = t.name ? new o(t.name) : null
                }

                function r(e, t, i) {
                    var r, o;
                    return n.isFunction(e) ? r = e : n.isString(e) ? (o = t.compile(e), r = n.bind(o.render, o)) : r = function(e) {
                        return "<p>" + e[i] + "</p>"
                    }, r
                }
                var a = {
                    thumbprint: "thumbprint",
                    protocol: "protocol",
                    itemHash: "itemHash",
                    adjacencyList: "adjacencyList"
                };
                return n.mixin(i.prototype, {
                    _processLocalData: function(e) {
                        this._mergeProcessedData(this._processData(e))
                    },
                    _loadPrefetchData: function(i) {
                        function r(e) {
                            var t = i.filter ? i.filter(e) : e,
                                r = f._processData(t),
                                o = r.itemHash,
                                s = r.adjacencyList;
                            f.storage && (f.storage.set(a.itemHash, o, i.ttl), f.storage.set(a.adjacencyList, s, i.ttl), f.storage.set(a.thumbprint, p, i.ttl), f.storage.set(a.protocol, n.getProtocol(), i.ttl)), f._mergeProcessedData(r)
                        }
                        var o, s, u, l, c, d, f = this,
                            p = t + (i.thumbprint || "");
                        return this.storage && (o = this.storage.get(a.thumbprint), s = this.storage.get(a.protocol), u = this.storage.get(a.itemHash), l = this.storage.get(a.adjacencyList)), c = o !== p || s !== n.getProtocol(), i = n.isString(i) ? {
                            url: i
                        } : i, i.ttl = n.isNumber(i.ttl) ? i.ttl : 864e5, u && l && !c ? (this._mergeProcessedData({
                            itemHash: u,
                            adjacencyList: l
                        }), d = e.Deferred().resolve()) : d = e.getJSON(i.url).done(r), d
                    },
                    _transformDatum: function(e) {
                        var t = n.isString(e) ? e : e[this.valueKey],
                            i = e.tokens || n.tokenizeText(t),
                            r = {
                                value: t,
                                tokens: i
                            };
                        return n.isString(e) ? (r.datum = {}, r.datum[this.valueKey] = e) : r.datum = e, r.tokens = n.filter(r.tokens, function(e) {
                            return !n.isBlankString(e)
                        }), r.tokens = n.map(r.tokens, function(e) {
                            return e.toLowerCase()
                        }), r
                    },
                    _processData: function(e) {
                        var t = this,
                            i = {},
                            r = {};
                        return n.each(e, function(e, o) {
                            var a = t._transformDatum(o),
                                s = n.getUniqueId(a.value);
                            i[s] = a, n.each(a.tokens, function(e, t) {
                                var i = t.charAt(0),
                                    o = r[i] || (r[i] = [s]);
                                !~n.indexOf(o, s) && o.push(s)
                            })
                        }), {
                            itemHash: i,
                            adjacencyList: r
                        }
                    },
                    _mergeProcessedData: function(e) {
                        var t = this;
                        n.mixin(this.itemHash, e.itemHash), n.each(e.adjacencyList, function(e, n) {
                            var i = t.adjacencyList[e];
                            t.adjacencyList[e] = i ? i.concat(n) : n
                        })
                    },
                    _getLocalSuggestions: function(e) {
                        var t, i = this,
                            r = [],
                            o = [],
                            a = [];
                        return n.each(e, function(e, t) {
                            var i = t.charAt(0);
                            !~n.indexOf(r, i) && r.push(i)
                        }), n.each(r, function(e, n) {
                            var r = i.adjacencyList[n];
                            return r ? (o.push(r), (!t || r.length < t.length) && (t = r), void 0) : !1
                        }), o.length < r.length ? [] : (n.each(t, function(t, r) {
                            var s, u, l = i.itemHash[r];
                            s = n.every(o, function(e) {
                                return ~n.indexOf(e, r)
                            }), u = s && n.every(e, function(e) {
                                return n.some(l.tokens, function(t) {
                                    return 0 === t.indexOf(e)
                                })
                            }), u && a.push(l)
                        }), a)
                    },
                    initialize: function() {
                        var t;
                        return this.local && this._processLocalData(this.local), this.transport = this.remote ? new s(this.remote) : null, t = this.prefetch ? this._loadPrefetchData(this.prefetch) : e.Deferred().resolve(), this.local = this.prefetch = this.remote = null, this.initialize = function() {
                            return t
                        }, t
                    },
                    getSuggestions: function(e, t) {
                        function i(e) {
                            o = o.slice(0), n.each(e, function(e, t) {
                                var i, r = a._transformDatum(t);
                                return i = n.some(o, function(e) {
                                    return r.value === e.value
                                }), !i && o.push(r), o.length < a.limit
                            }), t && t(o)
                        }
                        var r, o, a = this,
                            s = !1;
                        e.length < this.minLength || (r = n.tokenizeQuery(e), o = this._getLocalSuggestions(r).slice(0, this.limit), o.length < this.limit && this.transport && (s = this.transport.get(e, i)), !s && t && t(o))
                    }
                }), i
            }(),
            l = function() {
                function t(t) {
                    var i = this;
                    n.bindAll(this), this.specialKeyCodeMap = {
                        9: "tab",
                        27: "esc",
                        37: "left",
                        39: "right",
                        13: "enter",
                        38: "up",
                        40: "down"
                    }, this.$hint = e(t.hint), this.$input = e(t.input).on("blur.tt", this._handleBlur).on("focus.tt", this._handleFocus).on("keydown.tt", this._handleSpecialKeyEvent), n.isMsie() ? this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function(e) {
                        i.specialKeyCodeMap[e.which || e.keyCode] || n.defer(i._compareQueryToInputValue)
                    }) : this.$input.on("input.tt", this._compareQueryToInputValue), this.query = this.$input.val(), this.$overflowHelper = r(this.$input)
                }

                function r(t) {
                    return e("<span></span>").css({
                        position: "absolute",
                        left: "-9999px",
                        visibility: "hidden",
                        whiteSpace: "nowrap",
                        fontFamily: t.css("font-family"),
                        fontSize: t.css("font-size"),
                        fontStyle: t.css("font-style"),
                        fontVariant: t.css("font-variant"),
                        fontWeight: t.css("font-weight"),
                        wordSpacing: t.css("word-spacing"),
                        letterSpacing: t.css("letter-spacing"),
                        textIndent: t.css("text-indent"),
                        textRendering: t.css("text-rendering"),
                        textTransform: t.css("text-transform")
                    }).insertAfter(t)
                }

                function o(e, t) {
                    return e = (e || "").replace(/^\s*/g, "").replace(/\s{2,}/g, " "), t = (t || "").replace(/^\s*/g, "").replace(/\s{2,}/g, " "), e === t
                }
                return n.mixin(t.prototype, i, {
                    _handleFocus: function() {
                        this.trigger("focused")
                    },
                    _handleBlur: function() {
                        this.trigger("blured")
                    },
                    _handleSpecialKeyEvent: function(e) {
                        var t = this.specialKeyCodeMap[e.which || e.keyCode];
                        t && this.trigger(t + "Keyed", e)
                    },
                    _compareQueryToInputValue: function() {
                        var e = this.getInputValue(),
                            t = o(this.query, e),
                            n = t ? this.query.length !== e.length : !1;
                        n ? this.trigger("whitespaceChanged", {
                            value: this.query
                        }) : t || this.trigger("queryChanged", {
                            value: this.query = e
                        })
                    },
                    destroy: function() {
                        this.$hint.off(".tt"), this.$input.off(".tt"), this.$hint = this.$input = this.$overflowHelper = null
                    },
                    focus: function() {
                        this.$input.focus()
                    },
                    blur: function() {
                        this.$input.blur()
                    },
                    getQuery: function() {
                        return this.query
                    },
                    setQuery: function(e) {
                        this.query = e
                    },
                    getInputValue: function() {
                        return this.$input.val()
                    },
                    setInputValue: function(e, t) {
                        this.$input.val(e), !t && this._compareQueryToInputValue()
                    },
                    getHintValue: function() {
                        return this.$hint.val()
                    },
                    setHintValue: function(e) {
                        this.$hint.val(e)
                    },
                    getLanguageDirection: function() {
                        return (this.$input.css("direction") || "ltr").toLowerCase()
                    },
                    isOverflow: function() {
                        return this.$overflowHelper.text(this.getInputValue()), this.$overflowHelper.width() > this.$input.width()
                    },
                    isCursorAtEnd: function() {
                        var e, t = this.$input.val().length,
                            i = this.$input[0].selectionStart;
                        return n.isNumber(i) ? i === t : document.selection ? (e = document.selection.createRange(), e.moveStart("character", -t), t === e.text.length) : !0
                    }
                }), t
            }(),
            c = function() {
                function t(t) {
                    n.bindAll(this), this.isOpen = !1, this.isEmpty = !0, this.isMouseOverDropdown = !1, this.$menu = e(t.menu).on("mouseenter.tt", this._handleMouseenter).on("mouseleave.tt", this._handleMouseleave).on("click.tt", ".tt-suggestion", this._handleSelection).on("mouseover.tt", ".tt-suggestion", this._handleMouseover)
                }

                function r(e) {
                    return e.data("suggestion")
                }
                var o = {
                        suggestionsList: '<span class="tt-suggestions"></span>'
                    },
                    a = {
                        suggestionsList: {
                            display: "block"
                        },
                        suggestion: {
                            whiteSpace: "nowrap",
                            cursor: "pointer"
                        },
                        suggestionChild: {
                            whiteSpace: "normal"
                        }
                    };
                return n.mixin(t.prototype, i, {
                    _handleMouseenter: function() {
                        this.isMouseOverDropdown = !0
                    },
                    _handleMouseleave: function() {
                        this.isMouseOverDropdown = !1
                    },
                    _handleMouseover: function(t) {
                        var n = e(t.currentTarget);
                        this._getSuggestions().removeClass("tt-is-under-cursor"), n.addClass("tt-is-under-cursor")
                    },
                    _handleSelection: function(t) {
                        var n = e(t.currentTarget);
                        this.trigger("suggestionSelected", r(n))
                    },
                    _show: function() {
                        this.$menu.css("display", "block")
                    },
                    _hide: function() {
                        this.$menu.hide()
                    },
                    _moveCursor: function(e) {
                        var t, n, i, o;
                        if (this.isVisible()) {
                            if (t = this._getSuggestions(), n = t.filter(".tt-is-under-cursor"), n.removeClass("tt-is-under-cursor"), i = t.index(n) + e, i = (i + 1) % (t.length + 1) - 1, -1 === i) return this.trigger("cursorRemoved"), void 0; - 1 > i && (i = t.length - 1), o = t.eq(i).addClass("tt-is-under-cursor"), this.trigger("cursorMoved", r(o))
                        }
                    },
                    _getSuggestions: function() {
                        return this.$menu.find(".tt-suggestions > .tt-suggestion")
                    },
                    destroy: function() {
                        this.$menu.off(".tt"), this.$menu = null
                    },
                    isVisible: function() {
                        return this.isOpen && !this.isEmpty
                    },
                    closeUnlessMouseIsOverDropdown: function() {
                        this.isMouseOverDropdown || this.close()
                    },
                    close: function() {
                        this.isOpen && (this.isOpen = !1, this._hide(), this.$menu.find(".tt-suggestions > .tt-suggestion").removeClass("tt-is-under-cursor"), this.trigger("closed"))
                    },
                    open: function() {
                        this.isOpen || (this.isOpen = !0, !this.isEmpty && this._show(), this.trigger("opened"))
                    },
                    setLanguageDirection: function(e) {
                        var t = {
                                left: "0",
                                right: "auto"
                            },
                            n = {
                                left: "auto",
                                right: " 0"
                            };
                        "ltr" === e ? this.$menu.css(t) : this.$menu.css(n)
                    },
                    moveCursorUp: function() {
                        this._moveCursor(-1)
                    },
                    moveCursorDown: function() {
                        this._moveCursor(1)
                    },
                    getSuggestionUnderCursor: function() {
                        var e = this._getSuggestions().filter(".tt-is-under-cursor").first();
                        return e.length > 0 ? r(e) : null
                    },
                    getFirstSuggestion: function() {
                        var e = this._getSuggestions().first();
                        return e.length > 0 ? r(e) : null
                    },
                    renderSuggestions: function(t, i) {
                        var r, s, u, l, c, d = "tt-dataset-" + t.name,
                            f = '<div class="tt-suggestion">%body</div>',
                            p = this.$menu.find("." + d);
                        0 === p.length && (s = e(o.suggestionsList).css(a.suggestionsList), p = e("<div></div>").addClass(d).append(t.header).append(s).append(t.footer).appendTo(this.$menu)), i.length > 0 ? (this.isEmpty = !1, this.isOpen && this._show(), u = document.createElement("div"), l = document.createDocumentFragment(), n.each(i, function(n, i) {
                            r = t.template(i.datum), u.innerHTML = f.replace("%body", r), c = e(u.firstChild).css(a.suggestion).data("suggestion", i), c.children().each(function() {
                                e(this).css(a.suggestionChild)
                            }), l.appendChild(c[0])
                        }), p.show().find(".tt-suggestions").html(l)) : this.clearSuggestions(t.name), this.trigger("suggestionsRendered")
                    },
                    clearSuggestions: function(e) {
                        var t = e ? this.$menu.find(".tt-dataset-" + e) : this.$menu.find('[class^="tt-dataset-"]'),
                            n = t.find(".tt-suggestions");
                        t.hide(), n.empty(), 0 === this._getSuggestions().length && (this.isEmpty = !0, this._hide())
                    }
                }), t
            }(),
            d = function() {
                function t(e) {
                    var t, i, o;
                    n.bindAll(this), this.$node = r(e.input), this.datasets = e.datasets, this.dir = null, this.eventBus = e.eventBus, t = this.$node.find(".tt-dropdown-menu"), i = this.$node.find(".tt-query"), o = this.$node.find(".tt-hint"), this.dropdownView = new c({
                        menu: t
                    }).on("suggestionSelected", this._handleSelection).on("cursorMoved", this._clearHint).on("cursorMoved", this._setInputValueToSuggestionUnderCursor).on("cursorRemoved", this._setInputValueToQuery).on("cursorRemoved", this._updateHint).on("suggestionsRendered", this._updateHint).on("opened", this._updateHint).on("closed", this._clearHint).on("opened closed", this._propagateEvent), this.inputView = new l({
                        input: i,
                        hint: o
                    }).on("focused", this._openDropdown).on("blured", this._closeDropdown).on("blured", this._setInputValueToQuery).on("enterKeyed", this._handleSelection).on("queryChanged", this._clearHint).on("queryChanged", this._clearSuggestions).on("queryChanged", this._getSuggestions).on("whitespaceChanged", this._updateHint).on("queryChanged whitespaceChanged", this._openDropdown).on("queryChanged whitespaceChanged", this._setLanguageDirection).on("escKeyed", this._closeDropdown).on("escKeyed", this._setInputValueToQuery).on("tabKeyed upKeyed downKeyed", this._managePreventDefault).on("upKeyed downKeyed", this._moveDropdownCursor).on("upKeyed downKeyed", this._openDropdown).on("tabKeyed leftKeyed rightKeyed", this._autocomplete)
                }

                function r(t) {
                    var n = e(a.wrapper),
                        i = e(a.dropdown),
                        r = e(t),
                        o = e(a.hint);
                    n = n.css(s.wrapper), i = i.css(s.dropdown), o.css(s.hint).css({
                        backgroundAttachment: r.css("background-attachment"),
                        backgroundClip: r.css("background-clip"),
                        backgroundColor: r.css("background-color"),
                        backgroundImage: r.css("background-image"),
                        backgroundOrigin: r.css("background-origin"),
                        backgroundPosition: r.css("background-position"),
                        backgroundRepeat: r.css("background-repeat"),
                        backgroundSize: r.css("background-size")
                    }), r.data("ttAttrs", {
                        dir: r.attr("dir"),
                        autocomplete: r.attr("autocomplete"),
                        spellcheck: r.attr("spellcheck"),
                        style: r.attr("style")
                    }), r.addClass("tt-query").attr({
                        autocomplete: "off",
                        spellcheck: !1
                    }).css(s.query);
                    try {
                        !r.attr("dir") && r.attr("dir", "auto")
                    } catch (u) {}
                    return r.wrap(n).parent().prepend(o).append(i)
                }

                function o(e) {
                    var t = e.find(".tt-query");
                    n.each(t.data("ttAttrs"), function(e, i) {
                        n.isUndefined(i) ? t.removeAttr(e) : t.attr(e, i)
                    }), t.detach().removeData("ttAttrs").removeClass("tt-query").insertAfter(e), e.remove()
                }
                var a = {
                        wrapper: '<span class="twitter-typeahead"></span>',
                        hint: '<input class="tt-hint" type="text" autocomplete="off" spellcheck="off" disabled>',
                        dropdown: '<span class="tt-dropdown-menu"></span>'
                    },
                    s = {
                        wrapper: {
                            position: "relative",
                            display: "inline-block"
                        },
                        hint: {
                            position: "absolute",
                            top: "0",
                            left: "0",
                            borderColor: "transparent",
                            boxShadow: "none"
                        },
                        query: {
                            position: "relative",
                            verticalAlign: "top",
                            backgroundColor: "transparent"
                        },
                        dropdown: {
                            position: "absolute",
                            top: "100%",
                            left: "0",
                            zIndex: "100",
                            display: "none"
                        }
                    };
                return n.isMsie() && n.mixin(s.query, {
                    backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
                }), n.isMsie() && 7 >= n.isMsie() && (n.mixin(s.wrapper, {
                    display: "inline",
                    zoom: "1"
                }), n.mixin(s.query, {
                    marginTop: "-1px"
                })), n.mixin(t.prototype, i, {
                    _managePreventDefault: function(e) {
                        var t, n, i = e.data,
                            r = !1;
                        switch (e.type) {
                            case "tabKeyed":
                                t = this.inputView.getHintValue(), n = this.inputView.getInputValue(), r = t && t !== n;
                                break;
                            case "upKeyed":
                            case "downKeyed":
                                r = !i.shiftKey && !i.ctrlKey && !i.metaKey
                        }
                        r && i.preventDefault()
                    },
                    _setLanguageDirection: function() {
                        var e = this.inputView.getLanguageDirection();
                        e !== this.dir && (this.dir = e, this.$node.css("direction", e), this.dropdownView.setLanguageDirection(e))
                    },
                    _updateHint: function() {
                        var e, t, i, r, o, a = this.dropdownView.getFirstSuggestion(),
                            s = a ? a.value : null,
                            u = this.dropdownView.isVisible(),
                            l = this.inputView.isOverflow();
                        s && u && !l && (e = this.inputView.getInputValue(), t = e.replace(/\s{2,}/g, " ").replace(/^\s+/g, ""), i = n.escapeRegExChars(t), r = RegExp("^(?:" + i + ")(.*$)", "i"), o = r.exec(s), this.inputView.setHintValue(e + (o ? o[1] : "")))
                    },
                    _clearHint: function() {
                        this.inputView.setHintValue("")
                    },
                    _clearSuggestions: function() {
                        this.dropdownView.clearSuggestions()
                    },
                    _setInputValueToQuery: function() {
                        this.inputView.setInputValue(this.inputView.getQuery())
                    },
                    _setInputValueToSuggestionUnderCursor: function(e) {
                        var t = e.data;
                        this.inputView.setInputValue(t.value, !0)
                    },
                    _openDropdown: function() {
                        this.dropdownView.open()
                    },
                    _closeDropdown: function(e) {
                        this.dropdownView["blured" === e.type ? "closeUnlessMouseIsOverDropdown" : "close"]()
                    },
                    _moveDropdownCursor: function(e) {
                        var t = e.data;
                        t.shiftKey || t.ctrlKey || t.metaKey || this.dropdownView["upKeyed" === e.type ? "moveCursorUp" : "moveCursorDown"]()
                    },
                    _handleSelection: function(e) {
                        var t = "suggestionSelected" === e.type,
                            i = t ? e.data : this.dropdownView.getSuggestionUnderCursor();
                        i && (this.inputView.setInputValue(i.value), t ? this.inputView.focus() : e.data.preventDefault(), t && n.isMsie() ? n.defer(this.dropdownView.close) : this.dropdownView.close(), this.eventBus.trigger("selected", i.datum))
                    },
                    _getSuggestions: function() {
                        var e = this,
                            t = this.inputView.getQuery();
                        n.isBlankString(t) || n.each(this.datasets, function(n, i) {
                            i.getSuggestions(t, function(n) {
                                t === e.inputView.getQuery() && e.dropdownView.renderSuggestions(i, n)
                            })
                        })
                    },
                    _autocomplete: function(e) {
                        var t, n, i, r, o;
                        ("rightKeyed" !== e.type && "leftKeyed" !== e.type || (t = this.inputView.isCursorAtEnd(), n = "ltr" === this.inputView.getLanguageDirection() ? "leftKeyed" === e.type : "rightKeyed" === e.type, t && !n)) && (i = this.inputView.getQuery(), r = this.inputView.getHintValue(), "" !== r && i !== r && (o = this.dropdownView.getFirstSuggestion(), this.inputView.setInputValue(o.value), this.eventBus.trigger("autocompleted", o.datum)))
                    },
                    _propagateEvent: function(e) {
                        this.eventBus.trigger(e.type)
                    },
                    destroy: function() {
                        this.inputView.destroy(), this.dropdownView.destroy(), o(this.$node), this.$node = null
                    },
                    setQuery: function(e) {
                        this.inputView.setQuery(e), this.inputView.setInputValue(e), this._clearHint(), this._clearSuggestions(), this._getSuggestions()
                    }
                }), t
            }();
        ! function() {
            var t, i = {},
                o = "ttView";
            t = {
                initialize: function(t) {
                    function a() {
                        var t, i = e(this),
                            a = new r({
                                el: i
                            });
                        t = n.map(s, function(e) {
                            return e.initialize()
                        }), i.data(o, new d({
                            input: i,
                            eventBus: a = new r({
                                el: i
                            }),
                            datasets: s
                        })), e.when.apply(e, t).always(function() {
                            n.defer(function() {
                                a.trigger("initialized")
                            })
                        })
                    }
                    var s;
                    return t = n.isArray(t) ? t : [t], 0 === t.length && e.error("no datasets provided"), s = n.map(t, function(e) {
                        var t = i[e.name] ? i[e.name] : new u(e);
                        return e.name && (i[e.name] = t), t
                    }), this.each(a)
                },
                destroy: function() {
                    function t() {
                        var t = e(this),
                            n = t.data(o);
                        n && (n.destroy(), t.removeData(o))
                    }
                    return this.each(t)
                },
                setQuery: function(t) {
                    function n() {
                        var n = e(this).data(o);
                        n && n.setQuery(t)
                    }
                    return this.each(n)
                }
            }, jQuery.fn.typeahead = function(e) {
                return t[e] ? t[e].apply(this, [].slice.call(arguments, 1)) : t.initialize.apply(this, arguments)
            }
        }()
    }(window.jQuery),
    function(e, t) {
        "object" == typeof exports ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Spinner = t()
    }(this, function() {
        "use strict";

        function e(e, t) {
            var n, i = document.createElement(e || "div");
            for (n in t) i[n] = t[n];
            return i
        }

        function t(e) {
            for (var t = 1, n = arguments.length; n > t; t++) e.appendChild(arguments[t]);
            return e
        }

        function n(e, t, n, i) {
            var r = ["opacity", t, ~~(100 * e), n, i].join("-"),
                o = .01 + 100 * (n / i),
                a = Math.max(1 - (1 - e) / t * (100 - o), e),
                s = l.substring(0, l.indexOf("Animation")).toLowerCase(),
                u = s && "-" + s + "-" || "";
            return d[r] || (f.insertRule("@" + u + "keyframes " + r + "{" + "0%{opacity:" + a + "}" + o + "%{opacity:" + e + "}" + (o + .01) + "%{opacity:1}" + (o + t) % 100 + "%{opacity:" + e + "}" + "100%{opacity:" + a + "}" + "}", f.cssRules.length), d[r] = 1), r
        }

        function i(e, t) {
            var n, i, r = e.style;
            if (void 0 !== r[t]) return t;
            for (t = t.charAt(0).toUpperCase() + t.slice(1), i = 0; i < c.length; i++)
                if (n = c[i] + t, void 0 !== r[n]) return n
        }

        function r(e, t) {
            for (var n in t) e.style[i(e, n) || n] = t[n];
            return e
        }

        function o(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var i in n) void 0 === e[i] && (e[i] = n[i])
            }
            return e
        }

        function a(e) {
            for (var t = {
                    x: e.offsetLeft,
                    y: e.offsetTop
                }; e = e.offsetParent;) t.x += e.offsetLeft, t.y += e.offsetTop;
            return t
        }

        function s(e) {
            return "undefined" == typeof this ? new s(e) : (this.opts = o(e || {}, s.defaults, p), void 0)
        }

        function u() {
            function n(t, n) {
                return e("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', n)
            }
            f.addRule(".spin-vml", "behavior:url(#default#VML)"), s.prototype.lines = function(e, i) {
                function o() {
                    return r(n("group", {
                        coordsize: l + " " + l,
                        coordorigin: -u + " " + -u
                    }), {
                        width: l,
                        height: l
                    })
                }

                function a(e, a, s) {
                    t(d, t(r(o(), {
                        rotation: 360 / i.lines * e + "deg",
                        left: ~~a
                    }), t(r(n("roundrect", {
                        arcsize: i.corners
                    }), {
                        width: u,
                        height: i.width,
                        left: i.radius,
                        top: -i.width >> 1,
                        filter: s
                    }), n("fill", {
                        color: i.color,
                        opacity: i.opacity
                    }), n("stroke", {
                        opacity: 0
                    }))))
                }
                var s, u = i.length + i.width,
                    l = 2 * u,
                    c = 2 * -(i.width + i.length) + "px",
                    d = r(o(), {
                        position: "absolute",
                        top: c,
                        left: c
                    });
                if (i.shadow)
                    for (s = 1; s <= i.lines; s++) a(s, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
                for (s = 1; s <= i.lines; s++) a(s);
                return t(e, d)
            }, s.prototype.opacity = function(e, t, n, i) {
                var r = e.firstChild;
                i = i.shadow && i.lines || 0, r && t + i < r.childNodes.length && (r = r.childNodes[t + i], r = r && r.firstChild, r = r && r.firstChild, r && (r.opacity = n))
            }
        }
        var l, c = ["webkit", "Moz", "ms", "O"],
            d = {},
            f = function() {
                var n = e("style", {
                    type: "text/css"
                });
                return t(document.getElementsByTagName("head")[0], n), n.sheet || n.styleSheet
            }(),
            p = {
                lines: 12,
                length: 7,
                width: 5,
                radius: 10,
                rotate: 0,
                corners: 1,
                color: "#000",
                direction: 1,
                speed: 1,
                trail: 100,
                opacity: .25,
                fps: 20,
                zIndex: 2e9,
                className: "spinner",
                top: "auto",
                left: "auto",
                position: "relative"
            };
        s.defaults = {}, o(s.prototype, {
            spin: function(t) {
                this.stop();
                var n, i, o = this,
                    s = o.opts,
                    u = o.el = r(e(0, {
                        className: s.className
                    }), {
                        position: s.position,
                        width: 0,
                        zIndex: s.zIndex
                    }),
                    c = s.radius + s.length + s.width;
                if (t && (t.insertBefore(u, t.firstChild || null), i = a(t), n = a(u), r(u, {
                        left: ("auto" == s.left ? i.x - n.x + (t.offsetWidth >> 1) : parseInt(s.left, 10) + c) + "px",
                        top: ("auto" == s.top ? i.y - n.y + (t.offsetHeight >> 1) : parseInt(s.top, 10) + c) + "px"
                    })), u.setAttribute("role", "progressbar"), o.lines(u, o.opts), !l) {
                    var d, f = 0,
                        p = (s.lines - 1) * (1 - s.direction) / 2,
                        h = s.fps,
                        m = h / s.speed,
                        g = (1 - s.opacity) / (m * s.trail / 100),
                        v = m / s.lines;
                    ! function y() {
                        f++;
                        for (var e = 0; e < s.lines; e++) d = Math.max(1 - (f + (s.lines - e) * v) % m * g, s.opacity), o.opacity(u, e * s.direction + p, d, s);
                        o.timeout = o.el && setTimeout(y, ~~(1e3 / h))
                    }()
                }
                return o
            },
            stop: function() {
                var e = this.el;
                return e && (clearTimeout(this.timeout), e.parentNode && e.parentNode.removeChild(e), this.el = void 0), this
            },
            lines: function(i, o) {
                function a(t, n) {
                    return r(e(), {
                        position: "absolute",
                        width: o.length + o.width + "px",
                        height: o.width + "px",
                        background: t,
                        boxShadow: n,
                        transformOrigin: "left",
                        transform: "rotate(" + ~~(360 / o.lines * u + o.rotate) + "deg) translate(" + o.radius + "px" + ",0)",
                        borderRadius: (o.corners * o.width >> 1) + "px"
                    })
                }
                for (var s, u = 0, c = (o.lines - 1) * (1 - o.direction) / 2; u < o.lines; u++) s = r(e(), {
                    position: "absolute",
                    top: 1 + ~(o.width / 2) + "px",
                    transform: o.hwaccel ? "translate3d(0,0,0)" : "",
                    opacity: o.opacity,
                    animation: l && n(o.opacity, o.trail, c + u * o.direction, o.lines) + " " + 1 / o.speed + "s linear infinite"
                }), o.shadow && t(s, r(a("#000", "0 0 4px #000"), {
                    top: "2px"
                })), t(i, t(s, a(o.color, "0 0 1px rgba(0,0,0,.1)")));
                return i
            },
            opacity: function(e, t, n) {
                t < e.childNodes.length && (e.childNodes[t].style.opacity = n)
            }
        });
        var h = r(e("group"), {
            behavior: "url(#default#VML)"
        });
        return !i(h, "transform") && h.adj ? u() : l = i(h, "animation"), s
    }),
    function(e) {
        e.fn.fastClick = function(t) {
            return e(this).each(function() {
                e.FastButton(e(this)[0], t)
            })
        }, e.FastButton = function(t, n) {
            var i, r, o = function() {
                    e(t).unbind("touchend"), e("body").unbind("touchmove.fastClick")
                },
                a = function(t) {
                    t.stopPropagation(), o(), n.call(this, t), "touchend" === t.type && e.clickbuster.preventGhostClick(i, r)
                },
                s = function(e) {
                    (Math.abs(e.originalEvent.touches[0].clientX - i) > 10 || Math.abs(e.originalEvent.touches[0].clientY - r) > 10) && o()
                },
                u = function(n) {
                    n.stopPropagation(), e(t).bind("touchend", a), e("body").bind("touchmove.fastClick", s), i = n.originalEvent.touches[0].clientX, r = n.originalEvent.touches[0].clientY
                };
            e(t).bind({
                touchstart: u,
                click: a
            })
        }, e.clickbuster = {
            coordinates: [],
            preventGhostClick: function(t, n) {
                e.clickbuster.coordinates.push(t, n), window.setTimeout(e.clickbuster.pop, 2500)
            },
            pop: function() {
                e.clickbuster.coordinates.splice(0, 2)
            },
            onClick: function(t) {
                var n, i, r;
                for (r = 0; r < e.clickbuster.coordinates.length; r += 2) n = e.clickbuster.coordinates[r], i = e.clickbuster.coordinates[r + 1], Math.abs(t.clientX - n) < 25 && Math.abs(t.clientY - i) < 25 && (t.stopPropagation(), t.preventDefault())
            }
        }, e(function() {
            document.addEventListener ? document.addEventListener("click", e.clickbuster.onClick, !0) : document.attachEvent && document.attachEvent("onclick", e.clickbuster.onClick)
        })
    }(jQuery),
    function(e) {
        "use strict";

        function t(e) {
            if (e) {
                if ("string" == typeof i[e]) return e;
                e = e.charAt(0).toUpperCase() + e.slice(1);
                for (var t, r = 0, o = n.length; o > r; r++)
                    if (t = n[r] + e, "string" == typeof i[t]) return t
            }
        }
        var n = "Webkit Moz ms Ms O".split(" "),
            i = document.documentElement.style;
        "function" == typeof define && define.amd ? define(function() {
            return t
        }) : e.getStyleProperty = t
    }(window),
    function(e) {
        "use strict";

        function t(e) {
            var t = parseFloat(e),
                n = -1 === e.indexOf("%") && !isNaN(t);
            return n && t
        }

        function n() {
            for (var e = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0
                }, t = 0, n = a.length; n > t; t++) {
                var i = a[t];
                e[i] = 0
            }
            return e
        }

        function i(e) {
            function i(e) {
                if ("string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
                    var i = o(e);
                    if ("none" === i.display) return n();
                    var u = {};
                    u.width = e.offsetWidth, u.height = e.offsetHeight;
                    for (var l = u.isBorderBox = !(!s || !i[s] || "border-box" !== i[s]), c = 0, d = a.length; d > c; c++) {
                        var f = a[c],
                            p = i[f],
                            h = parseFloat(p);
                        u[f] = isNaN(h) ? 0 : h
                    }
                    var m = u.paddingLeft + u.paddingRight,
                        g = u.paddingTop + u.paddingBottom,
                        v = u.marginLeft + u.marginRight,
                        y = u.marginTop + u.marginBottom,
                        b = u.borderLeftWidth + u.borderRightWidth,
                        w = u.borderTopWidth + u.borderBottomWidth,
                        x = l && r,
                        $ = t(i.width);
                    $ !== !1 && (u.width = $ + (x ? 0 : m + b));
                    var k = t(i.height);
                    return k !== !1 && (u.height = k + (x ? 0 : g + w)), u.innerWidth = u.width - (m + b), u.innerHeight = u.height - (g + w), u.outerWidth = u.width + v, u.outerHeight = u.height + y, u
                }
            }
            var r, s = e("boxSizing");
            return function() {
                if (s) {
                    var e = document.createElement("div");
                    e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style[s] = "border-box";
                    var n = document.body || document.documentElement;
                    n.appendChild(e);
                    var i = o(e);
                    r = 200 === t(i.width), n.removeChild(e)
                }
            }(), i
        }
        var r = document.defaultView,
            o = r && r.getComputedStyle ? function(e) {
                return r.getComputedStyle(e, null)
            } : function(e) {
                return e.currentStyle
            },
            a = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
        "function" == typeof define && define.amd ? define(["get-style-property/get-style-property"], i) : e.getSize = i(e.getStyleProperty)
    }(window),
    function(e) {
        "use strict";
        var t = document.documentElement,
            n = function() {};
        t.addEventListener ? n = function(e, t, n) {
            e.addEventListener(t, n, !1)
        } : t.attachEvent && (n = function(t, n, i) {
            t[n + i] = i.handleEvent ? function() {
                var t = e.event;
                t.target = t.target || t.srcElement, i.handleEvent.call(i, t)
            } : function() {
                var n = e.event;
                n.target = n.target || n.srcElement, i.call(t, n)
            }, t.attachEvent("on" + n, t[n + i])
        });
        var i = function() {};
        t.removeEventListener ? i = function(e, t, n) {
            e.removeEventListener(t, n, !1)
        } : t.detachEvent && (i = function(e, t, n) {
            e.detachEvent("on" + t, e[t + n]);
            try {
                delete e[t + n]
            } catch (i) {
                e[t + n] = void 0
            }
        });
        var r = {
            bind: n,
            unbind: i
        };
        "function" == typeof define && define.amd ? define(r) : e.eventie = r
    }(this),
    function(e) {
        "use strict";

        function t(e) {
            "function" == typeof e && (t.isReady ? e() : o.push(e))
        }

        function n(e) {
            var n = "readystatechange" === e.type && "complete" !== r.readyState;
            if (!t.isReady && !n) {
                t.isReady = !0;
                for (var i = 0, a = o.length; a > i; i++) {
                    var s = o[i];
                    s()
                }
            }
        }

        function i(i) {
            return i.bind(r, "DOMContentLoaded", n), i.bind(r, "readystatechange", n), i.bind(e, "load", n), t
        }
        var r = e.document,
            o = [];
        t.isReady = !1, "function" == typeof define && define.amd ? define(["eventie/eventie"], i) : e.docReady = i(e.eventie)
    }(this),
    function() {
        "use strict";

        function e() {}

        function t(e, t) {
            for (var n = e.length; n--;)
                if (e[n].listener === t) return n;
            return -1
        }
        var n = e.prototype;
        n.getListeners = function(e) {
            var t, n, i = this._getEvents();
            if ("object" == typeof e) {
                t = {};
                for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n])
            } else t = i[e] || (i[e] = []);
            return t
        }, n.flattenListeners = function(e) {
            var t, n = [];
            for (t = 0; e.length > t; t += 1) n.push(e[t].listener);
            return n
        }, n.getListenersAsObject = function(e) {
            var t, n = this.getListeners(e);
            return n instanceof Array && (t = {}, t[e] = n), t || n
        }, n.addListener = function(e, n) {
            var i, r = this.getListenersAsObject(e),
                o = "object" == typeof n;
            for (i in r) r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(o ? n : {
                listener: n,
                once: !1
            });
            return this
        }, n.on = n.addListener, n.addOnceListener = function(e, t) {
            return this.addListener(e, {
                listener: t,
                once: !0
            })
        }, n.once = n.addOnceListener, n.defineEvent = function(e) {
            return this.getListeners(e), this
        }, n.defineEvents = function(e) {
            for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
            return this
        }, n.removeListener = function(e, n) {
            var i, r, o = this.getListenersAsObject(e);
            for (r in o) o.hasOwnProperty(r) && (i = t(o[r], n), -1 !== i && o[r].splice(i, 1));
            return this
        }, n.off = n.removeListener, n.addListeners = function(e, t) {
            return this.manipulateListeners(!1, e, t)
        }, n.removeListeners = function(e, t) {
            return this.manipulateListeners(!0, e, t)
        }, n.manipulateListeners = function(e, t, n) {
            var i, r, o = e ? this.removeListener : this.addListener,
                a = e ? this.removeListeners : this.addListeners;
            if ("object" != typeof t || t instanceof RegExp)
                for (i = n.length; i--;) o.call(this, t, n[i]);
            else
                for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : a.call(this, i, r));
            return this
        }, n.removeEvent = function(e) {
            var t, n = typeof e,
                i = this._getEvents();
            if ("string" === n) delete i[e];
            else if ("object" === n)
                for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
            else delete this._events;
            return this
        }, n.emitEvent = function(e, t) {
            var n, i, r, o, a = this.getListenersAsObject(e);
            for (r in a)
                if (a.hasOwnProperty(r))
                    for (i = a[r].length; i--;) n = a[r][i], o = n.listener.apply(this, t || []), (o === this._getOnceReturnValue() || n.once === !0) && this.removeListener(e, a[r][i].listener);
            return this
        }, n.trigger = n.emitEvent, n.emit = function(e) {
            var t = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(e, t)
        }, n.setOnceReturnValue = function(e) {
            return this._onceReturnValue = e, this
        }, n._getOnceReturnValue = function() {
            return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
        }, n._getEvents = function() {
            return this._events || (this._events = {})
        }, "function" == typeof define && define.amd ? define(function() {
            return e
        }) : "undefined" != typeof module && module.exports ? module.exports = e : this.EventEmitter = e
    }.call(this),
    function(e) {
        "use strict";

        function t() {}

        function n(e) {
            function n(t) {
                t.prototype.option || (t.prototype.option = function(t) {
                    e.isPlainObject(t) && (this.options = e.extend(!0, this.options, t))
                })
            }

            function r(t, n) {
                e.fn[t] = function(r) {
                    if ("string" == typeof r) {
                        for (var a = i.call(arguments, 1), s = 0, u = this.length; u > s; s++) {
                            var l = this[s],
                                c = e.data(l, t);
                            if (c)
                                if (e.isFunction(c[r]) && "_" !== r.charAt(0)) {
                                    var d = c[r].apply(c, a);
                                    if (void 0 !== d) return d
                                } else o("no such method '" + r + "' for " + t + " instance");
                            else o("cannot call methods on " + t + " prior to initialization; " + "attempted to call '" + r + "'")
                        }
                        return this
                    }
                    return this.each(function() {
                        var i = e.data(this, t);
                        i ? (i.option(r), i._init()) : (i = new n(this, r), e.data(this, t, i))
                    })
                }
            }
            if (e) {
                var o = "undefined" == typeof console ? t : function(e) {
                    console.error(e)
                };
                e.bridget = function(e, t) {
                    n(t), r(e, t)
                }
            }
        }
        var i = Array.prototype.slice;
        "function" == typeof define && define.amd ? define(["jquery"], n) : n(e.jQuery)
    }(window),
    function(e, t) {
        "use strict";

        function n(e, t) {
            return e[s](t)
        }

        function i(e) {
            if (!e.parentNode) {
                var t = document.createDocumentFragment();
                t.appendChild(e)
            }
        }

        function r(e, t) {
            i(e);
            for (var n = e.parentNode.querySelectorAll(t), r = 0, o = n.length; o > r; r++)
                if (n[r] === e) return !0;
            return !1
        }

        function o(e, t) {
            return i(e), n(e, t)
        }
        var a, s = function() {
            if (t.matchesSelector) return "matchesSelector";
            for (var e = ["webkit", "moz", "ms", "o"], n = 0, i = e.length; i > n; n++) {
                var r = e[n],
                    o = r + "MatchesSelector";
                if (t[o]) return o
            }
        }();
        if (s) {
            var u = document.createElement("div"),
                l = n(u, "div");
            a = l ? n : o
        } else a = r;
        "function" == typeof define && define.amd ? define(function() {
            return a
        }) : window.matchesSelector = a
    }(this, Element.prototype),
    function(e) {
        "use strict";

        function t(e, t) {
            for (var n in t) e[n] = t[n];
            return e
        }

        function n(e, n, i) {
            function o(e, t) {
                e && (this.element = e, this.layout = t, this.position = {
                    x: 0,
                    y: 0
                }, this._create())
            }
            var a = i("transition"),
                s = i("transform"),
                u = a && s,
                l = !!i("perspective"),
                c = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "otransitionend",
                    transition: "transitionend"
                }[a],
                d = ["transform", "transition", "transitionDuration", "transitionProperty"],
                f = function() {
                    for (var e = {}, t = 0, n = d.length; n > t; t++) {
                        var r = d[t],
                            o = i(r);
                        o && o !== r && (e[r] = o)
                    }
                    return e
                }();
            t(o.prototype, e.prototype), o.prototype._create = function() {
                this.css({
                    position: "absolute"
                })
            }, o.prototype.handleEvent = function(e) {
                var t = "on" + e.type;
                this[t] && this[t](e)
            }, o.prototype.getSize = function() {
                this.size = n(this.element)
            }, o.prototype.css = function(e) {
                var t = this.element.style;
                for (var n in e) {
                    var i = f[n] || n;
                    t[i] = e[n]
                }
            }, o.prototype.getPosition = function() {
                var e = r(this.element),
                    t = this.layout.options,
                    n = t.isOriginLeft,
                    i = t.isOriginTop,
                    o = parseInt(e[n ? "left" : "right"], 10),
                    a = parseInt(e[i ? "top" : "bottom"], 10);
                o = isNaN(o) ? 0 : o, a = isNaN(a) ? 0 : a;
                var s = this.layout.size;
                o -= n ? s.paddingLeft : s.paddingRight, a -= i ? s.paddingTop : s.paddingBottom, this.position.x = o, this.position.y = a
            }, o.prototype.layoutPosition = function() {
                var e = this.layout.size,
                    t = this.layout.options,
                    n = {};
                t.isOriginLeft ? (n.left = this.position.x + e.paddingLeft + "px", n.right = "") : (n.right = this.position.x + e.paddingRight + "px", n.left = ""), t.isOriginTop ? (n.top = this.position.y + e.paddingTop + "px", n.bottom = "") : (n.bottom = this.position.y + e.paddingBottom + "px", n.top = ""), this.css(n), this.emitEvent("layout", [this])
            };
            var p = l ? function(e, t) {
                return "translate3d(" + e + "px, " + t + "px, 0)"
            } : function(e, t) {
                return "translate(" + e + "px, " + t + "px)"
            };
            o.prototype._transitionTo = function(e, t) {
                this.getPosition();
                var n = this.position.x,
                    i = this.position.y,
                    r = parseInt(e, 10),
                    o = parseInt(t, 10),
                    a = r === this.position.x && o === this.position.y;
                if (this.setPosition(e, t), a && !this.isTransitioning) return this.layoutPosition(), void 0;
                var s = e - n,
                    u = t - i,
                    l = {},
                    c = this.layout.options;
                s = c.isOriginLeft ? s : -s, u = c.isOriginTop ? u : -u, l.transform = p(s, u), this.transition({
                    to: l,
                    onTransitionEnd: this.layoutPosition,
                    isCleaning: !0
                })
            }, o.prototype.goTo = function(e, t) {
                this.setPosition(e, t), this.layoutPosition()
            }, o.prototype.moveTo = u ? o.prototype._transitionTo : o.prototype.goTo, o.prototype.setPosition = function(e, t) {
                this.position.x = parseInt(e, 10), this.position.y = parseInt(t, 10)
            }, o.prototype._nonTransition = function(e) {
                this.css(e.to), e.isCleaning && this._removeStyles(e.to), e.onTransitionEnd && e.onTransitionEnd.call(this)
            }, o.prototype._transition = function(e) {
                var t = this.layout.options.transitionDuration;
                if (!parseFloat(t)) return this._nonTransition(e), void 0;
                var n = e.to,
                    i = [];
                for (var r in n) i.push(r);
                var o = {};
                if (o.transitionProperty = i.join(","), o.transitionDuration = t, this.element.addEventListener(c, this, !1), (e.isCleaning || e.onTransitionEnd) && this.on("transitionEnd", function(t) {
                        return e.isCleaning && t._removeStyles(n), e.onTransitionEnd && e.onTransitionEnd.call(t), !0
                    }), e.from) {
                    this.css(e.from);
                    var a = this.element.offsetHeight;
                    a = null
                }
                this.css(o), this.css(n), this.isTransitioning = !0
            }, o.prototype.transition = o.prototype[a ? "_transition" : "_nonTransition"], o.prototype.onwebkitTransitionEnd = function(e) {
                this.ontransitionend(e)
            }, o.prototype.onotransitionend = function(e) {
                this.ontransitionend(e)
            }, o.prototype.ontransitionend = function(e) {
                e.target === this.element && (this.removeTransitionStyles(), this.element.removeEventListener(c, this, !1), this.isTransitioning = !1, this.emitEvent("transitionEnd", [this]))
            }, o.prototype._removeStyles = function(e) {
                var t = {};
                for (var n in e) t[n] = "";
                this.css(t)
            };
            var h = {
                transitionProperty: "",
                transitionDuration: ""
            };
            return o.prototype.removeTransitionStyles = function() {
                this.css(h)
            }, o.prototype.removeElem = function() {
                this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this])
            }, o.prototype.remove = a ? function() {
                var e = this;
                this.on("transitionEnd", function() {
                    return e.removeElem(), !0
                }), this.hide()
            } : o.prototype.removeElem, o.prototype.reveal = function() {
                delete this.isHidden, this.css({
                    display: ""
                });
                var e = this.layout.options;
                this.transition({
                    from: e.hiddenStyle,
                    to: e.visibleStyle,
                    isCleaning: !0
                })
            }, o.prototype.hide = function() {
                this.isHidden = !0, this.css({
                    display: ""
                });
                var e = this.layout.options;
                this.transition({
                    from: e.visibleStyle,
                    to: e.hiddenStyle,
                    isCleaning: !0,
                    onTransitionEnd: function() {
                        this.css({
                            display: "none"
                        })
                    }
                })
            }, o.prototype.destroy = function() {
                this.css({
                    position: "",
                    left: "",
                    right: "",
                    top: "",
                    bottom: "",
                    transition: "",
                    transform: ""
                })
            }, o
        }
        var i = document.defaultView,
            r = i && i.getComputedStyle ? function(e) {
                return i.getComputedStyle(e, null)
            } : function(e) {
                return e.currentStyle
            };
        "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], n) : (e.Outlayer = {}, e.Outlayer.Item = n(e.EventEmitter, e.getSize, e.getStyleProperty))
    }(window),
    function(e) {
        "use strict";

        function t(e, t) {
            for (var n in t) e[n] = t[n];
            return e
        }

        function n(e) {
            return "[object Array]" === c.call(e)
        }

        function i(e) {
            var t = [];
            if (n(e)) t = e;
            else if ("number" == typeof e.length)
                for (var i = 0, r = e.length; r > i; i++) t.push(e[i]);
            else t.push(e);
            return t
        }

        function r(e) {
            return e.replace(/(.)([A-Z])/g, function(e, t, n) {
                return t + "-" + n
            }).toLowerCase()
        }

        function o(n, o, c, p, h, m) {
            function g(e, n) {
                if ("string" == typeof e && (e = a.querySelector(e)), !e || !d(e)) return s && s.error("Bad " + this.settings.namespace + " element: " + e), void 0;
                this.element = e, this.options = t({}, this.options), t(this.options, n);
                var i = ++y;
                this.element.outlayerGUID = i, b[i] = this, this._create(), this.options.isInitLayout && this.layout()
            }

            function v(e, n) {
                e.prototype[n] = t({}, g.prototype[n])
            }
            var y = 0,
                b = {};
            return g.prototype.settings = {
                namespace: "outlayer",
                item: m
            }, g.prototype.options = {
                containerStyle: {
                    position: "relative"
                },
                isInitLayout: !0,
                isOriginLeft: !0,
                isOriginTop: !0,
                isResizeBound: !0,
                transitionDuration: "0.4s",
                hiddenStyle: {
                    opacity: 0,
                    transform: "scale(0.001)"
                },
                visibleStyle: {
                    opacity: 1,
                    transform: "scale(1)"
                }
            }, t(g.prototype, c.prototype), g.prototype._create = function() {
                this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), t(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
            }, g.prototype.reloadItems = function() {
                this.items = this._getItems(this.element.children)
            }, g.prototype._getItems = function(e) {
                for (var t = this._filterFindItemElements(e), n = this.settings.item, i = [], r = 0, o = t.length; o > r; r++) {
                    var a = t[r],
                        s = new n(a, this, this.options.itemOptions);
                    i.push(s)
                }
                return i
            }, g.prototype._filterFindItemElements = function(e) {
                e = i(e);
                var t = this.options.itemSelector;
                if (!t) return e;
                for (var n = [], r = 0, o = e.length; o > r; r++) {
                    var a = e[r];
                    h(a, t) && n.push(a);
                    for (var s = a.querySelectorAll(t), u = 0, l = s.length; l > u; u++) n.push(s[u])
                }
                return n
            }, g.prototype.getItemElements = function() {
                for (var e = [], t = 0, n = this.items.length; n > t; t++) e.push(this.items[t].element);
                return e
            }, g.prototype.layout = function() {
                this._resetLayout(), this._manageStamps();
                var e = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
                this.layoutItems(this.items, e), this._isLayoutInited = !0
            }, g.prototype._init = g.prototype.layout, g.prototype._resetLayout = function() {
                this.getSize()
            }, g.prototype.getSize = function() {
                this.size = p(this.element)
            }, g.prototype._getMeasurement = function(e, t) {
                var n, i = this.options[e];
                i ? ("string" == typeof i ? n = this.element.querySelector(i) : d(i) && (n = i), this[e] = n ? p(n)[t] : i) : this[e] = 0
            }, g.prototype.layoutItems = function(e, t) {
                e = this._getItemsForLayout(e), this._layoutItems(e, t), this._postLayout()
            }, g.prototype._getItemsForLayout = function(e) {
                for (var t = [], n = 0, i = e.length; i > n; n++) {
                    var r = e[n];
                    r.isIgnored || t.push(r)
                }
                return t
            }, g.prototype._layoutItems = function(e, t) {
                if (!e || !e.length) return this.emitEvent("layoutComplete", [this, e]), void 0;
                this._itemsOn(e, "layout", function() {
                    this.emitEvent("layoutComplete", [this, e])
                });
                for (var n = [], i = 0, r = e.length; r > i; i++) {
                    var o = e[i],
                        a = this._getItemLayoutPosition(o);
                    a.item = o, a.isInstant = t, n.push(a)
                }
                this._processLayoutQueue(n)
            }, g.prototype._getItemLayoutPosition = function() {
                return {
                    x: 0,
                    y: 0
                }
            }, g.prototype._processLayoutQueue = function(e) {
                for (var t = 0, n = e.length; n > t; t++) {
                    var i = e[t];
                    this._positionItem(i.item, i.x, i.y, i.isInstant)
                }
            }, g.prototype._positionItem = function(e, t, n, i) {
                i ? e.goTo(t, n) : e.moveTo(t, n)
            }, g.prototype._postLayout = function() {
                var e = this._getContainerSize();
                e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
            }, g.prototype._getContainerSize = l, g.prototype._setContainerMeasure = function(e, t) {
                if (void 0 !== e) {
                    var n = this.size;
                    n.isBorderBox && (e += t ? n.paddingLeft + n.paddingRight + n.borderLeftWidth + n.borderRightWidth : n.paddingBottom + n.paddingTop + n.borderTopWidth + n.borderBottomWidth), e = Math.max(e, 0), this.element.style[t ? "width" : "height"] = e + "px"
                }
            }, g.prototype._itemsOn = function(e, t, n) {
                function i() {
                    return r++, r === o && n.call(a), !0
                }
                for (var r = 0, o = e.length, a = this, s = 0, u = e.length; u > s; s++) {
                    var l = e[s];
                    l.on(t, i)
                }
            }, g.prototype.ignore = function(e) {
                var t = this.getItem(e);
                t && (t.isIgnored = !0)
            }, g.prototype.unignore = function(e) {
                var t = this.getItem(e);
                t && delete t.isIgnored
            }, g.prototype.stamp = function(e) {
                if (e = this._find(e)) {
                    this.stamps = this.stamps.concat(e);
                    for (var t = 0, n = e.length; n > t; t++) {
                        var i = e[t];
                        this.ignore(i)
                    }
                }
            }, g.prototype.unstamp = function(e) {
                if (e = this._find(e))
                    for (var t = 0, n = e.length; n > t; t++) {
                        var i = e[t],
                            r = f(this.stamps, i); - 1 !== r && this.stamps.splice(r, 1), this.unignore(i)
                    }
            }, g.prototype._find = function(e) {
                return e ? ("string" == typeof e && (e = this.element.querySelectorAll(e)), e = i(e)) : void 0
            }, g.prototype._manageStamps = function() {
                if (this.stamps && this.stamps.length) {
                    this._getBoundingRect();
                    for (var e = 0, t = this.stamps.length; t > e; e++) {
                        var n = this.stamps[e];
                        this._manageStamp(n)
                    }
                }
            }, g.prototype._getBoundingRect = function() {
                var e = this.element.getBoundingClientRect(),
                    t = this.size;
                this._boundingRect = {
                    left: e.left + t.paddingLeft + t.borderLeftWidth,
                    top: e.top + t.paddingTop + t.borderTopWidth,
                    right: e.right - (t.paddingRight + t.borderRightWidth),
                    bottom: e.bottom - (t.paddingBottom + t.borderBottomWidth)
                }
            }, g.prototype._manageStamp = l, g.prototype._getElementOffset = function(e) {
                var t = e.getBoundingClientRect(),
                    n = this._boundingRect,
                    i = p(e),
                    r = {
                        left: t.left - n.left - i.marginLeft,
                        top: t.top - n.top - i.marginTop,
                        right: n.right - t.right - i.marginRight,
                        bottom: n.bottom - t.bottom - i.marginBottom
                    };
                return r
            }, g.prototype.handleEvent = function(e) {
                var t = "on" + e.type;
                this[t] && this[t](e)
            }, g.prototype.bindResize = function() {
                this.isResizeBound || (n.bind(e, "resize", this), this.isResizeBound = !0)
            }, g.prototype.unbindResize = function() {
                n.unbind(e, "resize", this), this.isResizeBound = !1
            }, g.prototype.onresize = function() {
                function e() {
                    t.resize()
                }
                this.resizeTimeout && clearTimeout(this.resizeTimeout);
                var t = this;
                this.resizeTimeout = setTimeout(e, 100)
            }, g.prototype.resize = function() {
                var e = p(this.element),
                    t = this.size && e;
                t && e.innerWidth === this.size.innerWidth || (this.layout(), delete this.resizeTimeout)
            }, g.prototype.addItems = function(e) {
                var t = this._getItems(e);
                return t.length ? (this.items = this.items.concat(t), t) : void 0
            }, g.prototype.appended = function(e) {
                var t = this.addItems(e);
                t.length && (this.layoutItems(t, !0), this.reveal(t))
            }, g.prototype.prepended = function(e) {
                var t = this._getItems(e);
                if (t.length) {
                    var n = this.items.slice(0);
                    this.items = t.concat(n), this._resetLayout(), this.layoutItems(t, !0), this.reveal(t), this.layoutItems(n)
                }
            }, g.prototype.reveal = function(e) {
                if (e && e.length)
                    for (var t = 0, n = e.length; n > t; t++) {
                        var i = e[t];
                        i.reveal()
                    }
            }, g.prototype.hide = function(e) {
                if (e && e.length)
                    for (var t = 0, n = e.length; n > t; t++) {
                        var i = e[t];
                        i.hide()
                    }
            }, g.prototype.getItem = function(e) {
                for (var t = 0, n = this.items.length; n > t; t++) {
                    var i = this.items[t];
                    if (i.element === e) return i
                }
            }, g.prototype.getItems = function(e) {
                if (e && e.length) {
                    for (var t = [], n = 0, i = e.length; i > n; n++) {
                        var r = e[n],
                            o = this.getItem(r);
                        o && t.push(o)
                    }
                    return t
                }
            }, g.prototype.remove = function(e) {
                e = i(e);
                var t = this.getItems(e);
                this._itemsOn(t, "remove", function() {
                    this.emitEvent("removeComplete", [this, t])
                });
                for (var n = 0, r = t.length; r > n; n++) {
                    var o = t[n];
                    o.remove();
                    var a = f(this.items, o);
                    this.items.splice(a, 1)
                }
            }, g.prototype.destroy = function() {
                var e = this.element.style;
                e.height = "", e.position = "", e.width = "";
                for (var t = 0, n = this.items.length; n > t; t++) {
                    var i = this.items[t];
                    i.destroy()
                }
                this.unbindResize(), delete this.element.outlayerGUID
            }, g.data = function(e) {
                var t = e && e.outlayerGUID;
                return t && b[t]
            }, g.create = function(e, n) {
                function i() {
                    g.apply(this, arguments)
                }
                return t(i.prototype, g.prototype), v(i, "options"), v(i, "settings"), t(i.prototype.options, n), i.prototype.settings.namespace = e, i.data = g.data, i.Item = function() {
                    m.apply(this, arguments)
                }, i.Item.prototype = new m, i.prototype.settings.item = i.Item, o(function() {
                    for (var t = r(e), n = a.querySelectorAll(".js-" + t), o = "data-" + t + "-options", l = 0, c = n.length; c > l; l++) {
                        var d, f = n[l],
                            p = f.getAttribute(o);
                        try {
                            d = p && JSON.parse(p)
                        } catch (h) {
                            s && s.error("Error parsing " + o + " on " + f.nodeName.toLowerCase() + (f.id ? "#" + f.id : "") + ": " + h);
                            continue
                        }
                        var m = new i(f, d);
                        u && u.data(f, e, m)
                    }
                }), u && u.bridget && u.bridget(e, i), i
            }, g.Item = m, g
        }
        var a = e.document,
            s = e.console,
            u = e.jQuery,
            l = function() {},
            c = Object.prototype.toString,
            d = "object" == typeof HTMLElement ? function(e) {
                return e instanceof HTMLElement
            } : function(e) {
                return e && "object" == typeof e && 1 === e.nodeType && "string" == typeof e.nodeName
            },
            f = Array.prototype.indexOf ? function(e, t) {
                return e.indexOf(t)
            } : function(e, t) {
                for (var n = 0, i = e.length; i > n; n++)
                    if (e[n] === t) return n;
                return -1
            };
        "function" == typeof define && define.amd ? define(["eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], o) : e.Outlayer = o(e.eventie, e.docReady, e.EventEmitter, e.getSize, e.matchesSelector, e.Outlayer.Item)
    }(window),
    function(e) {
        "use strict";

        function t(e, t) {
            var i = e.create("masonry");
            return i.prototype._resetLayout = function() {
                this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
                var e = this.cols;
                for (this.colYs = []; e--;) this.colYs.push(0);
                this.maxY = 0
            }, i.prototype.measureColumns = function() {
                var e = this._getSizingContainer(),
                    n = this.items[0],
                    i = n && n.element;
                this.columnWidth || (this.columnWidth = i ? t(i).outerWidth : this.size.innerWidth), this.columnWidth += this.gutter, this._containerWidth = t(e).innerWidth, this.cols = Math.floor((this._containerWidth + this.gutter) / this.columnWidth), this.cols = Math.max(this.cols, 1)
            }, i.prototype._getSizingContainer = function() {
                return this.options.isFitWidth ? this.element.parentNode : this.element
            }, i.prototype._getItemLayoutPosition = function(e) {
                e.getSize();
                var t = Math.ceil(e.size.outerWidth / this.columnWidth);
                t = Math.min(t, this.cols);
                for (var i = this._getColGroup(t), r = Math.min.apply(Math, i), o = n(i, r), a = {
                        x: this.columnWidth * o,
                        y: r
                    }, s = r + e.size.outerHeight, u = this.cols + 1 - i.length, l = 0; u > l; l++) this.colYs[o + l] = s;
                return a
            }, i.prototype._getColGroup = function(e) {
                if (1 === e) return this.colYs;
                for (var t = [], n = this.cols + 1 - e, i = 0; n > i; i++) {
                    var r = this.colYs.slice(i, i + e);
                    t[i] = Math.max.apply(Math, r)
                }
                return t
            }, i.prototype._manageStamp = function(e) {
                var n = t(e),
                    i = this._getElementOffset(e),
                    r = this.options.isOriginLeft ? i.left : i.right,
                    o = r + n.outerWidth,
                    a = Math.floor(r / this.columnWidth);
                a = Math.max(0, a);
                var s = Math.floor(o / this.columnWidth);
                s = Math.min(this.cols - 1, s);
                for (var u = (this.options.isOriginTop ? i.top : i.bottom) + n.outerHeight, l = a; s >= l; l++) this.colYs[l] = Math.max(u, this.colYs[l])
            }, i.prototype._getContainerSize = function() {
                this.maxY = Math.max.apply(Math, this.colYs);
                var e = {
                    height: this.maxY
                };
                return this.options.isFitWidth && (e.width = this._getContainerFitWidth()), e
            }, i.prototype._getContainerFitWidth = function() {
                for (var e = 0, t = this.cols; --t && 0 === this.colYs[t];) e++;
                return (this.cols - e) * this.columnWidth - this.gutter
            }, i.prototype.resize = function() {
                var e = this._getSizingContainer(),
                    n = t(e),
                    i = this.size && n;
                i && n.innerWidth === this._containerWidth || (this.layout(), delete this.resizeTimeout)
            }, i
        }
        var n = Array.prototype.indexOf ? function(e, t) {
            return e.indexOf(t)
        } : function(e, t) {
            for (var n = 0, i = e.length; i > n; n++) {
                var r = e[n];
                if (r === t) return n
            }
            return -1
        };
        "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], t) : e.Masonry = t(e.Outlayer, e.getSize)
    }(window);
/*!
 * MediaElement.js
 * HTML5 <video> and <audio> shim and player
 * http://mediaelementjs.com/
 *
 * Creates a JavaScript object that mimics HTML5 MediaElement API
 * for browsers that don't understand HTML5 or can't play the provided codec
 * Can play MP4 (H.264), Ogg, WebM, FLV, WMV, WMA, ACC, and MP3
 *
 * Copyright 2010-2014, John Dyer (http://j.hn)
 * License: MIT
 *
 */
var mejs = mejs || {};
mejs.version = "2.14.2", mejs.meIndex = 0, mejs.plugins = {
        silverlight: [{
            version: [3, 0],
            types: ["video/mp4", "video/m4v", "video/mov", "video/wmv", "audio/wma", "audio/m4a", "audio/mp3", "audio/wav", "audio/mpeg"]
        }],
        flash: [{
            version: [9, 0, 124],
            types: ["video/mp4", "video/m4v", "video/mov", "video/flv", "video/rtmp", "video/x-flv", "audio/flv", "audio/x-flv", "audio/mp3", "audio/m4a", "audio/mpeg", "video/youtube", "video/x-youtube"]
        }],
        youtube: [{
            version: null,
            types: ["video/youtube", "video/x-youtube", "audio/youtube", "audio/x-youtube"]
        }],
        vimeo: [{
            version: null,
            types: ["video/vimeo", "video/x-vimeo"]
        }]
    }, mejs.Utility = {
        encodeUrl: function(e) {
            return encodeURIComponent(e)
        },
        escapeHTML: function(e) {
            return e.toString().split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;")
        },
        absolutizeUrl: function(e) {
            var t = document.createElement("div");
            return t.innerHTML = '<a href="' + this.escapeHTML(e) + '">x</a>', t.firstChild.href
        },
        getScriptPath: function(e) {
            for (var t, n, i, r, o, a, s = 0, u = "", l = "", c = document.getElementsByTagName("script"), d = c.length, f = e.length; d > s; s++) {
                for (r = c[s].src, n = r.lastIndexOf("/"), n > -1 ? (a = r.substring(n + 1), o = r.substring(0, n + 1)) : (a = r, o = ""), t = 0; f > t; t++)
                    if (l = e[t], i = a.indexOf(l), i > -1) {
                        u = o;
                        break
                    }
                if ("" !== u) break
            }
            return u
        },
        secondsToTimeCode: function(e, t, n, i) {
            "undefined" == typeof n ? n = !1 : "undefined" == typeof i && (i = 25);
            var r = Math.floor(e / 3600) % 24,
                o = Math.floor(e / 60) % 60,
                a = Math.floor(e % 60),
                s = Math.floor((e % 1 * i).toFixed(3)),
                u = (t || r > 0 ? (10 > r ? "0" + r : r) + ":" : "") + (10 > o ? "0" + o : o) + ":" + (10 > a ? "0" + a : a) + (n ? ":" + (10 > s ? "0" + s : s) : "");
            return u
        },
        timeCodeToSeconds: function(e, t, n, i) {
            "undefined" == typeof n ? n = !1 : "undefined" == typeof i && (i = 25);
            var r = e.split(":"),
                o = parseInt(r[0], 10),
                a = parseInt(r[1], 10),
                s = parseInt(r[2], 10),
                u = 0,
                l = 0;
            return n && (u = parseInt(r[3]) / i), l = 3600 * o + 60 * a + s + u
        },
        convertSMPTEtoSeconds: function(e) {
            if ("string" != typeof e) return !1;
            e = e.replace(",", ".");
            var t = 0,
                n = -1 != e.indexOf(".") ? e.split(".")[1].length : 0,
                i = 1;
            e = e.split(":").reverse();
            for (var r = 0; r < e.length; r++) i = 1, r > 0 && (i = Math.pow(60, r)), t += Number(e[r]) * i;
            return Number(t.toFixed(n))
        },
        removeSwf: function(e) {
            var t = document.getElementById(e);
            t && /object|embed/i.test(t.nodeName) && (mejs.MediaFeatures.isIE ? (t.style.display = "none", function() {
                4 == t.readyState ? mejs.Utility.removeObjectInIE(e) : setTimeout(arguments.callee, 10)
            }()) : t.parentNode.removeChild(t))
        },
        removeObjectInIE: function(e) {
            var t = document.getElementById(e);
            if (t) {
                for (var n in t) "function" == typeof t[n] && (t[n] = null);
                t.parentNode.removeChild(t)
            }
        }
    }, mejs.PluginDetector = {
        hasPluginVersion: function(e, t) {
            var n = this.plugins[e];
            return t[1] = t[1] || 0, t[2] = t[2] || 0, n[0] > t[0] || n[0] == t[0] && n[1] > t[1] || n[0] == t[0] && n[1] == t[1] && n[2] >= t[2] ? !0 : !1
        },
        nav: window.navigator,
        ua: window.navigator.userAgent.toLowerCase(),
        plugins: [],
        addPlugin: function(e, t, n, i, r) {
            this.plugins[e] = this.detectPlugin(t, n, i, r)
        },
        detectPlugin: function(e, t, n, i) {
            var r, o, a, s = [0, 0, 0];
            if ("undefined" != typeof this.nav.plugins && "object" == typeof this.nav.plugins[e]) {
                if (r = this.nav.plugins[e].description, r && ("undefined" == typeof this.nav.mimeTypes || !this.nav.mimeTypes[t] || this.nav.mimeTypes[t].enabledPlugin))
                    for (s = r.replace(e, "").replace(/^\s+/, "").replace(/\sr/gi, ".").split("."), o = 0; o < s.length; o++) s[o] = parseInt(s[o].match(/\d+/), 10)
            } else if ("undefined" != typeof window.ActiveXObject) try {
                a = new ActiveXObject(n), a && (s = i(a))
            } catch (u) {}
            return s
        }
    }, mejs.PluginDetector.addPlugin("flash", "Shockwave Flash", "application/x-shockwave-flash", "ShockwaveFlash.ShockwaveFlash", function(e) {
        var t = [],
            n = e.GetVariable("$version");
        return n && (n = n.split(" ")[1].split(","), t = [parseInt(n[0], 10), parseInt(n[1], 10), parseInt(n[2], 10)]), t
    }), mejs.PluginDetector.addPlugin("silverlight", "Silverlight Plug-In", "application/x-silverlight-2", "AgControl.AgControl", function(e) {
        var t = [0, 0, 0, 0],
            n = function(e, t, n, i) {
                for (; e.isVersionSupported(t[0] + "." + t[1] + "." + t[2] + "." + t[3]);) t[n] += i;
                t[n] -= i
            };
        return n(e, t, 0, 1), n(e, t, 1, 1), n(e, t, 2, 1e4), n(e, t, 2, 1e3), n(e, t, 2, 100), n(e, t, 2, 10), n(e, t, 2, 1), n(e, t, 3, 1), t
    }), mejs.MediaFeatures = {
        init: function() {
            var e, t, n = this,
                i = document,
                r = mejs.PluginDetector.nav,
                o = mejs.PluginDetector.ua.toLowerCase(),
                a = ["source", "track", "audio", "video"];
            n.isiPad = null !== o.match(/ipad/i), n.isiPhone = null !== o.match(/iphone/i), n.isiOS = n.isiPhone || n.isiPad, n.isAndroid = null !== o.match(/android/i), n.isBustedAndroid = null !== o.match(/android 2\.[12]/), n.isBustedNativeHTTPS = "https:" === location.protocol && (null !== o.match(/android [12]\./) || null !== o.match(/macintosh.* version.* safari/)), n.isIE = -1 != r.appName.toLowerCase().indexOf("microsoft") || null !== r.appName.toLowerCase().match(/trident/gi), n.isChrome = null !== o.match(/chrome/gi), n.isFirefox = null !== o.match(/firefox/gi), n.isWebkit = null !== o.match(/webkit/gi), n.isGecko = null !== o.match(/gecko/gi) && !n.isWebkit && !n.isIE, n.isOpera = null !== o.match(/opera/gi), n.hasTouch = "ontouchstart" in window, n.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
            for (e = 0; e < a.length; e++) t = document.createElement(a[e]);
            n.supportsMediaTag = "undefined" != typeof t.canPlayType || n.isBustedAndroid;
            try {
                t.canPlayType("video/mp4")
            } catch (s) {
                n.supportsMediaTag = !1
            }
            n.hasSemiNativeFullScreen = "undefined" != typeof t.webkitEnterFullscreen, n.hasNativeFullscreen = "undefined" != typeof t.requestFullscreen, n.hasWebkitNativeFullScreen = "undefined" != typeof t.webkitRequestFullScreen, n.hasMozNativeFullScreen = "undefined" != typeof t.mozRequestFullScreen, n.hasMsNativeFullScreen = "undefined" != typeof t.msRequestFullscreen, n.hasTrueNativeFullScreen = n.hasWebkitNativeFullScreen || n.hasMozNativeFullScreen || n.hasMsNativeFullScreen, n.nativeFullScreenEnabled = n.hasTrueNativeFullScreen, n.hasMozNativeFullScreen ? n.nativeFullScreenEnabled = document.mozFullScreenEnabled : n.hasMsNativeFullScreen && (n.nativeFullScreenEnabled = document.msFullscreenEnabled), n.isChrome && (n.hasSemiNativeFullScreen = !1), n.hasTrueNativeFullScreen && (n.fullScreenEventName = "", n.hasWebkitNativeFullScreen ? n.fullScreenEventName = "webkitfullscreenchange" : n.hasMozNativeFullScreen ? n.fullScreenEventName = "mozfullscreenchange" : n.hasMsNativeFullScreen && (n.fullScreenEventName = "MSFullscreenChange"), n.isFullScreen = function() {
                return t.mozRequestFullScreen ? i.mozFullScreen : t.webkitRequestFullScreen ? i.webkitIsFullScreen : t.hasMsNativeFullScreen ? null !== i.msFullscreenElement : void 0
            }, n.requestFullScreen = function(e) {
                n.hasWebkitNativeFullScreen ? e.webkitRequestFullScreen() : n.hasMozNativeFullScreen ? e.mozRequestFullScreen() : n.hasMsNativeFullScreen && e.msRequestFullscreen()
            }, n.cancelFullScreen = function() {
                n.hasWebkitNativeFullScreen ? document.webkitCancelFullScreen() : n.hasMozNativeFullScreen ? document.mozCancelFullScreen() : n.hasMsNativeFullScreen && document.msExitFullscreen()
            }), n.hasSemiNativeFullScreen && o.match(/mac os x 10_5/i) && (n.hasNativeFullScreen = !1, n.hasSemiNativeFullScreen = !1)
        }
    }, mejs.MediaFeatures.init(), mejs.HtmlMediaElement = {
        pluginType: "native",
        isFullScreen: !1,

    }, mejs.PluginMediaElement = function(e, t, n) {
        this.id = e, this.pluginType = t, this.src = n, this.events = {}, this.attributes = {}
    }, mejs.PluginMediaElement.prototype = {
        pluginElement: null,
        pluginType: "",
        isFullScreen: !1,
        playbackRate: -1,
        defaultPlaybackRate: -1,
        seekable: [],
        played: [],
        paused: !0,
        ended: !1,
        seeking: !1,
        duration: 0,
        error: null,
        tagName: "",
        muted: !1,
        volume: 1,
        currentTime: 0,
        setAttribute: function(e, t) {
            this.attributes[e] = t
        },
    }, mejs.MediaPluginBridge = {
        pluginMediaElements: {},
        htmlMediaElements: {},
        registerPluginElement: function(e, t, n) {
            this.pluginMediaElements[e] = t, this.htmlMediaElements[e] = n
        },
        unregisterPluginElement: function(e) {
            delete this.pluginMediaElements[e], delete this.htmlMediaElements[e]
        },
        initPlugin: function(e) {
            var t = this.pluginMediaElements[e],
                n = this.htmlMediaElements[e];
            if (t) {
                switch (t.pluginType) {
                    case "flash":
                        t.pluginElement = t.pluginApi = document.getElementById(e);
                        break;
                    case "silverlight":
                        t.pluginElement = document.getElementById(t.id), t.pluginApi = t.pluginElement.Content.MediaElementJS
                }
                null != t.pluginApi && t.success && t.success(t, n)
            }
        },
        fireEvent: function(e, t, n) {
            var i, r, o, a = this.pluginMediaElements[e];
            if (a) {
                i = {
                    type: t,
                    target: a
                };
                for (r in n) a[r] = n[r], i[r] = n[r];
                o = n.bufferedTime || 0, i.target.buffered = i.buffered = {
                    start: function() {
                        return 0
                    },
                    end: function() {
                        return o
                    },
                    length: 1
                }, a.dispatchEvent(i.type, i)
            }
        }
    }, mejs.MediaElementDefaults = {
        mode: "auto",
        plugins: ["flash", "silverlight", "youtube", "vimeo"],
        enablePluginDebug: !1,
        httpsBasicAuthSite: !1,
        type: "",
        pluginPath: mejs.Utility.getScriptPath(["mediaelement.js", "mediaelement.min.js", "mediaelement-and-player.js", "mediaelement-and-player.min.js"]),
        flashName: "flashmediaelement.swf",
        flashStreamer: "",
        enablePluginSmoothing: !1,
        enablePseudoStreaming: !1,
        pseudoStreamingStartQueryParam: "start",
        silverlightName: "silverlightmediaelement.xap",
        defaultVideoWidth: 480,
        defaultVideoHeight: 270,
        pluginWidth: -1,
        pluginHeight: -1,
        pluginVars: [],
        timerRate: 250,
        startVolume: .8,
        success: function() {},
        error: function() {}
    }, mejs.MediaElement = function(e, t) {
        return mejs.HtmlMediaElementShim.create(e, t)
    }, mejs.HtmlMediaElementShim = {
        create: function(e, t) {
            var n, i, r = mejs.MediaElementDefaults,
                o = "string" == typeof e ? document.getElementById(e) : e,
                a = o.tagName.toLowerCase(),
                s = "audio" === a || "video" === a,
                u = s ? o.getAttribute("src") : o.getAttribute("href"),
                l = o.getAttribute("poster"),
                c = o.getAttribute("autoplay"),
                d = o.getAttribute("preload"),
                f = o.getAttribute("controls");
            for (i in t) r[i] = t[i];
            return u = "undefined" == typeof u || null === u || "" == u ? null : u, l = "undefined" == typeof l || null === l ? "" : l, d = "undefined" == typeof d || null === d || "false" === d ? "none" : d, c = !("undefined" == typeof c || null === c || "false" === c), f = !("undefined" == typeof f || null === f || "false" === f), n = this.determinePlayback(o, r, mejs.MediaFeatures.supportsMediaTag, s, u), n.url = null !== n.url ? mejs.Utility.absolutizeUrl(n.url) : "", "native" == n.method ? (mejs.MediaFeatures.isBustedAndroid && (o.src = n.url, o.addEventListener("click", function() {
                o.play()
            }, !1)), this.updateNative(n, r, c, d)) : "" !== n.method ? this.createPlugin(n, r, l, c, d, f) : (this.createErrorMessage(n, r, l), this)
        },
        determinePlayback: function(e, t, n, i, r) {
            var o, a, s, u, l, c, d, f, p, h, m, g = [],
                v = {
                    method: "",
                    url: "",
                    htmlMediaElement: e,
                    isVideo: "audio" != e.tagName.toLowerCase()
                };
            if ("undefined" != typeof t.type && "" !== t.type)
                if ("string" == typeof t.type) g.push({
                    type: t.type,
                    url: r
                });
                else
                    for (o = 0; o < t.type.length; o++) g.push({
                        type: t.type[o],
                        url: r
                    });
            else if (null !== r) c = this.formatType(r, e.getAttribute("type")), g.push({
                type: c,
                url: r
            });
            else
                for (o = 0; o < e.childNodes.length; o++) l = e.childNodes[o], 1 == l.nodeType && "source" == l.tagName.toLowerCase() && (r = l.getAttribute("src"), c = this.formatType(r, l.getAttribute("type")), m = l.getAttribute("media"), (!m || !window.matchMedia || window.matchMedia && window.matchMedia(m).matches) && g.push({
                    type: c,
                    url: r
                }));
            if (!i && g.length > 0 && null !== g[0].url && this.getTypeFromFile(g[0].url).indexOf("audio") > -1 && (v.isVideo = !1), mejs.MediaFeatures.isBustedAndroid && (e.canPlayType = function(e) {
                    return null !== e.match(/video\/(mp4|m4v)/gi) ? "maybe" : ""
                }), !(!n || "auto" !== t.mode && "auto_plugin" !== t.mode && "native" !== t.mode || mejs.MediaFeatures.isBustedNativeHTTPS && t.httpsBasicAuthSite === !0)) {
                for (i || (h = document.createElement(v.isVideo ? "video" : "audio"), e.parentNode.insertBefore(h, e), e.style.display = "none", v.htmlMediaElement = e = h), o = 0; o < g.length; o++)
                    if ("" !== e.canPlayType(g[o].type).replace(/no/, "") || "" !== e.canPlayType(g[o].type.replace(/mp3/, "mpeg")).replace(/no/, "") || "" !== e.canPlayType(g[o].type.replace(/m4a/, "mp4")).replace(/no/, "")) {
                        v.method = "native", v.url = g[o].url;
                        break
                    }
                if ("native" === v.method && (null !== v.url && (e.src = v.url), "auto_plugin" !== t.mode)) return v
            }
            if ("auto" === t.mode || "auto_plugin" === t.mode || "shim" === t.mode)
                for (o = 0; o < g.length; o++)
                    for (c = g[o].type, a = 0; a < t.plugins.length; a++)
                        for (d = t.plugins[a], f = mejs.plugins[d], s = 0; s < f.length; s++)
                            if (p = f[s], null == p.version || mejs.PluginDetector.hasPluginVersion(d, p.version))
                                for (u = 0; u < p.types.length; u++)
                                    if (c == p.types[u]) return v.method = d, v.url = g[o].url, v;
            return "auto_plugin" === t.mode && "native" === v.method ? v : ("" === v.method && g.length > 0 && (v.url = g[0].url), v)
        },
        formatType: function(e, t) {
            return e && !t ? this.getTypeFromFile(e) : t && ~t.indexOf(";") ? t.substr(0, t.indexOf(";")) : t
        },
        getTypeFromFile: function(e) {
            e = e.split("?")[0];
            var t = e.substring(e.lastIndexOf(".") + 1).toLowerCase();
            return (/(mp4|m4v|ogg|ogv|webm|webmv|flv|wmv|mpeg|mov)/gi.test(t) ? "video" : "audio") + "/" + this.getTypeFromExtension(t)
        },
        getTypeFromExtension: function(e) {
            switch (e) {
                case "mp4":
                case "m4v":
                case "m4a":
                    return "mp4";
                case "webm":
                case "webma":
                case "webmv":
                    return "webm";
                case "ogg":
                case "oga":
                case "ogv":
                    return "ogg";
                default:
                    return e
            }
        },
        createPlugin: function(e, t, n, i, r, o) {
            var a, s, u, l = e.htmlMediaElement,
                c = 1,
                d = 1,
                f = "me_" + e.method + "_" + mejs.meIndex++,
                p = new mejs.PluginMediaElement(f, e.method, e.url),
                h = document.createElement("div");
            p.tagName = l.tagName;
            for (var m = 0; m < l.attributes.length; m++) {
                var g = l.attributes[m];
                1 == g.specified && p.setAttribute(g.name, g.value)
            }
            for (s = l.parentNode; null !== s && "body" !== s.tagName.toLowerCase() && null != s.parentNode;) {
                if ("p" === s.parentNode.tagName.toLowerCase()) {
                    s.parentNode.parentNode.insertBefore(s, s.parentNode);
                    break
                }
                s = s.parentNode
            }
            switch (e.isVideo ? (c = t.pluginWidth > 0 ? t.pluginWidth : t.videoWidth > 0 ? t.videoWidth : null !== l.getAttribute("width") ? l.getAttribute("width") : t.defaultVideoWidth, d = t.pluginHeight > 0 ? t.pluginHeight : t.videoHeight > 0 ? t.videoHeight : null !== l.getAttribute("height") ? l.getAttribute("height") : t.defaultVideoHeight, c = mejs.Utility.encodeUrl(c), d = mejs.Utility.encodeUrl(d)) : t.enablePluginDebug && (c = 320, d = 240), p.success = t.success, mejs.MediaPluginBridge.registerPluginElement(f, p, l), h.className = "me-plugin", h.id = f + "_container", e.isVideo ? l.parentNode.insertBefore(h, l) : document.body.insertBefore(h, document.body.childNodes[0]), u = ["id=" + f, "isvideo=" + (e.isVideo ? "true" : "false"), "autoplay=" + (i ? "true" : "false"), "preload=" + r, "width=" + c, "startvolume=" + t.startVolume, "timerrate=" + t.timerRate, "flashstreamer=" + t.flashStreamer, "height=" + d, "pseudostreamstart=" + t.pseudoStreamingStartQueryParam], null !== e.url && ("flash" == e.method ? u.push("file=" + mejs.Utility.encodeUrl(e.url)) : u.push("file=" + e.url)), t.enablePluginDebug && u.push("debug=true"), t.enablePluginSmoothing && u.push("smoothing=true"), t.enablePseudoStreaming && u.push("pseudostreaming=true"), o && u.push("controls=true"), t.pluginVars && (u = u.concat(t.pluginVars)), e.method) {
                case "silverlight":
                    h.innerHTML = '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + f + '" name="' + f + '" width="' + c + '" height="' + d + '" class="mejs-shim">' + '<param name="initParams" value="' + u.join(",") + '" />' + '<param name="windowless" value="true" />' + '<param name="background" value="black" />' + '<param name="minRuntimeVersion" value="3.0.0.0" />' + '<param name="autoUpgrade" value="true" />' + '<param name="source" value="' + t.pluginPath + t.silverlightName + '" />' + "</object>";
                    break;
                case "flash":
                    mejs.MediaFeatures.isIE ? (a = document.createElement("div"), h.appendChild(a), a.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + f + '" width="' + c + '" height="' + d + '" class="mejs-shim">' + '<param name="movie" value="' + t.pluginPath + t.flashName + "?x=" + new Date + '" />' + '<param name="flashvars" value="' + u.join("&amp;") + '" />' + '<param name="quality" value="high" />' + '<param name="bgcolor" value="#000000" />' + '<param name="wmode" value="transparent" />' + '<param name="allowScriptAccess" value="always" />' + '<param name="allowFullScreen" value="true" />' + '<param name="scale" value="default" />' + "</object>") : h.innerHTML = '<embed id="' + f + '" name="' + f + '" ' + 'play="true" ' + 'loop="false" ' + 'quality="high" ' + 'bgcolor="#000000" ' + 'wmode="transparent" ' + 'allowScriptAccess="always" ' + 'allowFullScreen="true" ' + 'type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" ' + 'src="' + t.pluginPath + t.flashName + '" ' + 'flashvars="' + u.join("&") + '" ' + 'width="' + c + '" ' + 'height="' + d + '" ' + 'scale="default"' + 'class="mejs-shim"></embed>';
                    break;
                case "youtube":
                    var v; - 1 != e.url.lastIndexOf("youtu.be") ? (v = e.url.substr(e.url.lastIndexOf("/") + 1), -1 != v.indexOf("?") && (v = v.substr(0, v.indexOf("?")))) : v = e.url.substr(e.url.lastIndexOf("=") + 1), youtubeSettings = {
                        container: h,
                        containerId: h.id,
                        pluginMediaElement: p,
                        pluginId: f,
                        videoId: v,
                        height: d,
                        width: c
                    }, mejs.PluginDetector.hasPluginVersion("flash", [10, 0, 0]) ? mejs.YouTubeApi.createFlash(youtubeSettings) : mejs.YouTubeApi.enqueueIframe(youtubeSettings);
                    break;
                case "vimeo":
                    var y = f + "_player";
                    if (p.vimeoid = e.url.substr(e.url.lastIndexOf("/") + 1), h.innerHTML = '<iframe src="//player.vimeo.com/video/' + p.vimeoid + "?api=1&portrait=0&byline=0&title=0&player_id=" + y + '" width="' + c + '" height="' + d + '" frameborder="0" class="mejs-shim" id="' + y + '"></iframe>', "function" == typeof $f) {
                        var b = $f(h.childNodes[0]);
                        b.addEvent("ready", function() {
                            function e(e, t, n, i) {
                                var r = {
                                    type: n,
                                    target: t
                                };
                                "timeupdate" == n && (t.currentTime = r.currentTime = i.seconds, t.duration = r.duration = i.duration), t.dispatchEvent(r.type, r)
                            }
                            b.playVideo = function() {
                                b.api("play")
                            }, b.pauseVideo = function() {
                                b.api("pause")
                            }, b.seekTo = function(e) {
                                b.api("seekTo", e)
                            }, b.addEvent("play", function() {
                                e(b, p, "play"), e(b, p, "playing")
                            }), b.addEvent("pause", function() {
                                e(b, p, "pause")
                            }), b.addEvent("finish", function() {
                                e(b, p, "ended")
                            }), b.addEvent("playProgress", function(t) {
                                e(b, p, "timeupdate", t)
                            }), p.pluginApi = b, mejs.MediaPluginBridge.initPlugin(f)
                        })
                    } else console.warn("You need to include froogaloop for vimeo to work")
            }
            return l.style.display = "none", l.removeAttribute("autoplay"), p
        },
    }, mejs.YouTubeApi = {
        isIframeStarted: !1,
        isIframeLoaded: !1,
        loadIframeApi: function() {
            if (!this.isIframeStarted) {
                var e = document.createElement("script");
                e.src = "//www.youtube.com/player_api";
                var t = document.getElementsByTagName("script")[0];
                t.parentNode.insertBefore(e, t), this.isIframeStarted = !0
            }
        },
        iframeQueue: [],
        enqueueIframe: function(e) {
            this.isLoaded ? this.createIframe(e) : (this.loadIframeApi(), this.iframeQueue.push(e))
        },
        createIframe: function(e) {
            var t = e.pluginMediaElement,
                n = new YT.Player(e.containerId, {
                    height: e.height,
                    width: e.width,
                    videoId: e.videoId,
                    playerVars: {
                        controls: 0
                    },
                    events: {
                        onReady: function() {
                            e.pluginMediaElement.pluginApi = n, mejs.MediaPluginBridge.initPlugin(e.pluginId), setInterval(function() {
                                mejs.YouTubeApi.createEvent(n, t, "timeupdate")
                            }, 250)
                        },
                        onStateChange: function(e) {
                            mejs.YouTubeApi.handleStateChange(e.data, n, t)
                        }
                    }
                })
        },
        createEvent: function(e, t, n) {
            var i = {
                type: n,
                target: t
            };
            if (e && e.getDuration) {
                t.currentTime = i.currentTime = e.getCurrentTime(), t.duration = i.duration = e.getDuration(), i.paused = t.paused, i.ended = t.ended, i.muted = e.isMuted(), i.volume = e.getVolume() / 100, i.bytesTotal = e.getVideoBytesTotal(), i.bufferedBytes = e.getVideoBytesLoaded();
                var r = i.bufferedBytes / i.bytesTotal * i.duration;
                i.target.buffered = i.buffered = {
                    start: function() {
                        return 0
                    },
                    end: function() {
                        return r
                    },
                    length: 1
                }
            }
            t.dispatchEvent(i.type, i)
        },
        flashPlayers: {},

        handleStateChange: function(e, t, n) {
            switch (e) {
                case -1:
                    n.paused = !0, n.ended = !0, mejs.YouTubeApi.createEvent(t, n, "loadedmetadata");
                    break;
                case 0:
                    n.paused = !1, n.ended = !0, mejs.YouTubeApi.createEvent(t, n, "ended");
                    break;
                case 1:
                    n.paused = !1, n.ended = !1, mejs.YouTubeApi.createEvent(t, n, "play"), mejs.YouTubeApi.createEvent(t, n, "playing");
                    break;
                case 2:
                    n.paused = !0, n.ended = !1, mejs.YouTubeApi.createEvent(t, n, "pause");
                    break;
                case 3:
                    mejs.YouTubeApi.createEvent(t, n, "progress");
                    break;
                case 5:
            }
        }
    }, window.mejs = mejs, window.MediaElement = mejs.MediaElement,
    function(e, t) {
        "use strict";
        var n = {
            locale: {
                language: "",
                strings: {}
            },
            methods: {}
        };
        n.getLanguage = function() {
            var e = n.locale.language || window.navigator.userLanguage || window.navigator.language;
            return e.substr(0, 2).toLowerCase()
        }, "undefined" != typeof mejsL10n && (n.locale.language = mejsL10n.language), n.methods.checkPlain = function(e) {
            var t, n, i = {
                "&": "&amp;",
                '"': "&quot;",
                "<": "&lt;",
                ">": "&gt;"
            };
            e = String(e);
            for (t in i) i.hasOwnProperty(t) && (n = new RegExp(t, "g"), e = e.replace(n, i[t]));
            return e
        }, n.methods.t = function(e, t) {
            return n.locale.strings && n.locale.strings[t.context] && n.locale.strings[t.context][e] && (e = n.locale.strings[t.context][e]), n.methods.checkPlain(e)
        }, n.t = function(e, t) {
            if ("string" == typeof e && e.length > 0) {
                var i = n.getLanguage();
                return t = t || {
                    context: i
                }, n.methods.t(e, t)
            }
            throw {
                name: "InvalidArgumentException",
                message: "First argument is either not a string or empty."
            }
        }, t.i18n = n
    }(document, mejs),


function(e) {
    "use strict";
}
var mm = window.mm = {};
"undefined" == typeof console && (console = {
        log: function() {},
        error: function() {},
        warn: function() {}
    }), mm.hasHistory = "pushState" in window.history ? !0 : !1, mm.facade = _.extend({}, Backbone.Events), mm.drawerProxy = _.extend({}, Backbone.Events), mm.drawerProxy.on("all", function(e, t) {
        $(document.body).attr("data-device"), mm.drawer.trigger(e, t)
    }), mm.playerProxy = _.extend({}, Backbone.Events), mm.playerProxy.on("all", function(e, t) {
        var n = $(document.body).attr("data-device");
        oak.support.isTouch && (n = "mobile"), mm[n + "Player"].trigger(e, t), mm.mixtapePage.trigger(e)
    }),
    function() {
        for (var e = 0, t = ["ms", "moz", "webkit", "o"], n = 0; n < t.length && !window.requestAnimationFrame; ++n) window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[n] + "CancelAnimationFrame"] || window[t[n] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(t) {
            var n = (new Date).getTime(),
                i = Math.max(0, 16 - (n - e)),
                r = window.setTimeout(function() {
                    t(n + i)
                }, i);
            return e = n + i, r
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
            clearTimeout(e)
        })
    }(),
    function() {
        function e(e) {
            e = e || window.event;
            var n = {
                    focus: "visible",
                    focusin: "visible",
                    pageshow: "visible",
                    blur: "hidden",
                    focusout: "hidden",
                    pagehide: "hidden"
                },
                i = n[e.type];
            i = "undefined" != typeof i ? i : this[t] ? "hidden" : "visible", "hidden" === i ? mm.facade.trigger("page:hidden") : "visible" === i && mm.facade.trigger("page:visible")
        }
        var t = "hidden";
        t in document ? document.addEventListener("visibilitychange", e) : (t = "mozHidden") in document ? document.addEventListener("mozvisibilitychange", e) : (t = "webkitHidden") in document ? document.addEventListener("webkitvisibilitychange", e) : (t = "msHidden") in document ? document.addEventListener("msvisibilitychange", e) : "onfocusin" in document ? document.onfocusin = document.onfocusout = e : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = e
    }(), String.prototype.width = function(e) {
        var t = e || "12px arial",
            n = $("<div>" + this + "</div>").css({
                position: "absolute",
                "float": "left",
                "white-space": "nowrap",
                visibility: "hidden",
                font: t
            }).appendTo($("body")),
            i = n.width();
        return n.remove(), i
    },
    function(e) {
        oak.support.isTouch && (e("body").addClass("touch"), e("[data-touch]").addClass("touch"))
    }(jQuery),
    function(e) {
        var t = (-1 !== navigator.appVersion.indexOf("MSIE"), 9 === parseInt(navigator.appVersion.split("MSIE")[1]));
        t && (mm.degraded = !0, e("body").addClass("degraded"))
    }(jQuery), String.prototype.validEmail = function() {
        var e = this.toString(),
            t = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return t.test(e)
    }, window.scrollBarWidth = function() {
        var e = document.createElement("div");
        e.className = "scrollbar-measure", document.body.appendChild(e);
        var t = e.offsetWidth - e.clientWidth;
        return document.body.removeChild(e), t
    },
    function(e) {
        e.fn.hasScrollBar = function() {
            return this.get(0).scrollHeight > this.height()
        }
    }(jQuery),
    function() {
        function e(e) {
            var t = window.innerHeight + 60;
            (e === !0 || parseInt(document.body.style.height, 10) < t) && (document.body.style.height = t + "px"), setTimeout(function() {
                window.scrollTo(0, 1)
            }, 0)
        }
        var t = navigator.userAgent.match(/iPhone|iPod/i);
        t && (e(!0), window.addEventListener("orientationchange", e))
    }(), window.isFF = navigator.userAgent.toLowerCase().indexOf("firefox") > -1, mm.share = {}, window.fbAsyncInit = function() {
        FB.init({
            appId: "311354448990817",
            status: !0,
            xfbml: !0
        })
    },
    function(e, t, n) {
        var i, r = e.getElementsByTagName(t)[0];
        e.getElementById(n) || (i = e.createElement(t), i.id = n, i.src = "//connect.facebook.net/en_US/all.js", r.parentNode.insertBefore(i, r))
    }(document, "script", "facebook-jssdk"), window.___gcfg = {
        lang: "en-US"
    },
    function() {
        var e = document.createElement("script");
        e.type = "text/javascript", e.async = !0, e.src = "https://apis.google.com/js/plusone.js";
        var t = document.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(e, t)
    }(), mm.share.gPlus = function() {
        function e(e) {
            e.preventDefault();
            var a, s, u = this;
            a = Math.round(o / 2 - n / 2), s = 0, r > i && (s = Math.round(r / 2 - i / 2)), window.open(u.href, "intent", t + ",width=" + n + ",height=" + i + ",left=" + a + ",top=" + s), e.returnValue = !1, e.preventDefault && e.preventDefault()
        }
        var t = "scrollbars=yes,resizable=yes,toolbar=no,location=yes",
            n = 530,
            i = 370,
            r = screen.height,
            o = screen.width;
        return e
    }(),  mm.AsyncImage = function(e) {
        "use strict";

        function t() {
            return r.onload = function() {
                i.trigger("loaded", r), r.onload = null, r = null
            }, i
        }
        var n = {
            el: void 0,
            url: void 0
        };
        e = _.extend(n, e || {});
        var i = _.extend({}, e, Backbone.Events),
            r = new Image;
        return i.load = function() {
            i.on("loaded", i.loaded), r.src = i.url
        }, i.loaded = function() {}, t()
    }, mm.Canvas = function(e, t, n) {
        function i() {
            return r.ctx = r.canvas.getContext("2d"), r.pixelReady()
        }
        if ("undefined" == typeof e || "undefined" == typeof t || "undefined" == typeof n) return !1;
        var r = {
            canvas: e,
            deviceBackingRatio: oak.support.deviceBackingRatio >= 2 ? 2 : 1,
            height: n,
            pixelRatio: oak.support.pixelRatio >= 2 ? 2 : 1,
            width: t
        };
        return r.pixelReady = function() {
            return r.canvas.height = r.height * r.deviceBackingRatio, r.canvas.width = r.deviceBackingRatio > 1 ? r.width * r.deviceBackingRatio - 1 : r.width * r.deviceBackingRatio, r.canvas.style.height = r.height + "px", r.canvas.style.width = r.width + "px", r.ctx.scale(r.deviceBackingRatio, r.deviceBackingRatio), r
        }, i()
    }, mm.Collection = function(e) {
        var t = _.extend({
            list: {}
        }, mm.EventEmitter(), e);
        return t.add = function(e) {
            return t.list[e.id] = e, e.on("save change update", t.touch), e.on("destroy", function(e) {
                t.remove(this, !0), t.touch(e)
            }), t
        }, t.remove = function(e, n) {
            return t.list[e.id].off("save change"), delete t.list[e.id], n || t.fetch(), t
        }, t.find_by = function(e, n) {
            for (var i in t.list) {
                var r = t.list[i];
                if (r.attributes[e] === n) return r
            }
        }, t.find_all_by = function(e, n) {
            var i = [];
            for (var r in t.list) {
                var o = t.list[r];
                o.attributes[e] === n && i.push(o)
            }
            return i
        }, t.removeAll = function() {
            for (var e in t.list) t.remove(t.list[e]);
            return t.touch(""), t
        }, t.fetch = function() {
            if (t.url) return $.get(t.url).done(function(e) {
                t.touch(e)
            });
            throw new Error("A URL must be set on the collection in order to fetch.")
        }, t.touch = function(e) {
            return "undefined" == typeof e ? t.fetch() : t.trigger("change", e), t
        }, t
    }, mm.DrawerPage = function(e) {
        function t() {
            e[0].removeEventListener(oak.support.transitionEnd, t), r.resize()
        }

        function n(e) {
            var t = e.find(".nested form, .root form");
            t.length > 0 && t.each(function() {
                var e = $(this);
                e.get(0).reset(), e.find(".error, .errors").hide(), e.find("[data-default-text]").each(function() {
                    var e = $(this);
                    e.html(e.data("default-text"))
                })
            })
        }

        function i(e) {
            var t = $(e).css("left");
            $(e).css({
                left: 0,
                transition: "none"
            }), _.defer(function() {
                $(e).css({
                    left: t
                }), _.defer(function() {
                    $(e).css({
                        left: "",
                        transition: ""
                    })
                })
            })
        }
        var r = mm.EventEmitter();
        return r.hideNested = function(t) {
            t && t.preventDefault(), e.removeClass("left"), r.$back.removeClass("available"), r.nested = !1, r.resize(), n(e)
        }, r.$el = e, r.$back = $("#mm-drawer .back"), r.$nestLinks = $(".nest", e), r.id = r.$el.attr("id"), r.nested = !1, r.cleanup = function() {
            return e.removeClass("hiding"), r.$nestLinks.off("click"), r.nested && r.hideNested(), e[0].removeEventListener(oak.support.transitionEnd, r.cleanup), r
        }, r.hide = function() {
            return e[0].addEventListener(oak.support.transitionEnd, r.cleanup), e.addClass("hiding").removeClass("showing"), r
        }, r.resize = function() {
            var t;
            t = e.hasClass("left") ? $(".nested", e).first().outerHeight() : $(".root", e).first().outerHeight(), e.height(t).siblings().height("")
        }, r.rebuild = function() {
            return r.$back.on("click", r.hideNested), r.$nestLinks = $(".nest", e), r.$nestLinks.on("click", function(e) {
                r.showNested(e, this)
            }), r.resize(), r
        }, r.show = function() {
            return r.rebuild(), e[0].addEventListener(oak.support.transitionEnd, t), e.addClass("showing"), r.resize(), window.isFF && $(".nested", e).each(function() {
                i(this)
            }), r
        }, r.showNested = function(i) {
            return i.preventDefault(), r.$back.addClass("available"), e.addClass("left"), r.nested = !0, n(e), r.resize(), $(".nested", e)[0].addEventListener(oak.support.transitionEnd, t), r
        }, mm.drawer.on("resize:" + r.id, r.resize), r
    }, mm.EventEmitter = function() {
        "use strict";
        var e, t = _.extend({
            states: {}
        }, Backbone.Events);
        return t.isState = function(t) {
            return t === e ? !0 : !1
        }, t.setState = function(n) {
            var i, r, o = n,
                a = Array.prototype.slice.call(arguments, 1);
            o !== e && (r = t.states["on" + o.replace(/^\w/, function(e) {
                return e.toUpperCase()
            })], "undefined" != typeof e && (i = t.states["off" + e.replace(/^\w/, function(e) {
                return e.toUpperCase()
            })]), e = o, "undefined" != typeof r && r.apply(t, a), "undefined" != typeof i && i.apply())
        }, t
    }, mm.format = function() {
        var e = mm.EventEmitter();
        return e.numberToCurrency = function(e) {
            return "$" + Number(e).toFixed(2)
        }, e
    }(), mm.Model = function(e, t) {
        var n = _.extend({
            attributes: e || {},
            id: _.uniqueId("m")
        }, mm.EventEmitter(), t);
        return n.get = function(e) {
            return n.attributes[e]
        }, n.set = function(e, t) {
            return n.attributes[e] = t, n.touch(), n
        }, n.create = function(e) {
            if (n.url) {
                var t = {};
                return n.name ? t[n.name] = n.attributes : t = n.attributes, $.post(n.url, t).done(function(t) {
                    _.extend(n.attributes, t), e || n.trigger("save", t)
                })
            }
            throw new Error("A URL must be set on the model in order to save.")
        }, n.update = function(e, t) {
            if (n.url) {
                var i = n.url + "/" + n.attributes.id.toString(),
                    r = {};
                return n.name ? r[n.name] = e : r = e, $.ajax({
                    url: i,
                    data: r,
                    type: "PUT"
                }).done(function(e) {
                    _.extend(n.attributes, e), t || n.trigger("update", e)
                })
            }
            throw new Error("A URL must be set on the model in order to save.")
        }, n.destroy = function(e) {
            if (n.url) {
                var t = n.url + "/" + n.attributes.id.toString();
                return $.ajax({
                    url: t,
                    type: "DELETE"
                }).done(function(t) {
                    e || n.trigger("destroy", t)
                })
            }
            throw new Error("A URL must be set on the model in order to destroy.")
        }, n.touch = function(e) {
            return n.trigger("change", e), n
        }, n
    }, mm.Page = function() {
        var e = mm.EventEmitter();
        return e.ps = {}, e.offLoad = function() {
            for (var t in e.ps) delete e.ps[t]
        }, e
    }, mm.Process = function(e) {
        "use strict";

        function t() {
            return e.url ? (e.timeout && "number" == typeof e.timeout && setTimeout(function() {
                mm.facade.trigger("process:timeout:" + e.type, e.id), clearInterval(r.loop)
            }, e.timeout), r.loop = setInterval(i, e.poll), r) : !1
        }

        function n(t) {
            var n = _.extend(t, {
                id: e.id
            });
            n && n.success ? (clearInterval(r.loop), mm.facade.trigger("process:success:" + e.type, n, e.id)) : n && !n.success && mm.facade.trigger("process:processing:" + e.type, n, e.id)
        }

        function i() {
            $.get(e.url).done(n)
        }
        e = e || {}, e = _.extend({
            poll: 2e3,
            timeout: !1,
            url: !1,
            id: null,
            type: null
        }, e);
        var r = mm.EventEmitter();
        return r.loop = null, t()
    },
    function() {
        function e(t) {
            if ("object" == typeof e.instance) return e.instance;
            var n = this;
            if (this._el = t || window, this._calls = [], this.lastKnown = {
                    w: this._el.innerWidth,
                    h: this._el.innerHeight
                }, this._ticking = !1, this.resize = e.prototype.resize.bind(this), this._update = e.prototype._update.bind(this), this._el.addEventListener("resize", this.resize, !1), oak.support.isTouch) {
                var i;
                this._el.addEventListener("orientationchange", function() {
                    clearTimeout(i);
                    var e = 0;
                    i = setInterval(function() {
                        n.resize(), e += 1, 6 === e && clearTimeout(i)
                    }, 500), n.resize()
                })
            }
            e.instance = this
        }
        e.prototype._request_tick = function() {
            return this._ticking || oak.requestAnimationFrame(this._update), this._ticking = !0
        }, e.prototype._update = function() {
            var e = 0,
                t = this._lastKnown,
                n = this._calls.length;
            for (this._ticking = !1, e; n > e; e += 1) this._calls[e](t)
        }, e.prototype.attach = function(e) {
            if ("function" != typeof e) throw {
                name: "Invalid Argument",
                message: "Resizer's attach method requires a function argument."
            };
            return this.exists(e) ? !1 : (this._calls.push(e), this)
        }, e.prototype.detach = function(e) {
            if ("function" != typeof e) throw {
                name: "Invalid Argument",
                message: "Resizer's detach method requires a function argument."
            };
            var t = this._calls.indexOf(e);
            return 0 > t ? !1 : (this._calls.splice(t, 1), !0)
        }, e.prototype.exists = function(e) {
            if ("function" != typeof e) throw {
                name: "Invalid Argument",
                message: "Resizer's exists method requires a function argument."
            };
            return this._calls.indexOf(e) >= 0
        }, e.prototype.resize = function() {
            var e = this;
            this._lastKnown = {
                w: e._el.innerWidth,
                h: e._el.innerHeight
            }, this._request_tick()
        }, mm.resizer = new e
    }(),
    function() {
        function e(t) {
            return "object" == typeof e.instance ? e.instance : (this._el = t || window, this._calls = [], this._lastKnown = this._el.scrollTop, this._ticking = !1, this.scroll = e.prototype.scroll.bind(this), this._update = e.prototype._update.bind(this), this._el.addEventListener("scroll", this.scroll, !1), e.instance = this, void 0)
        }
        e.prototype._request_tick = function() {
            return this._ticking || oak.requestAnimationFrame(this._update), this._ticking = !0
        }, e.prototype._update = function() {
            var e = 0,
                t = this._lastKnown,
                n = this._calls.length;
            for (this._ticking = !1, e; n > e; e += 1) this._calls[e](t)
        }, e.prototype.attach = function(e) {
            if ("function" != typeof e) throw {
                name: "Invalid Argument",
                message: "Scroller's attach method requires a function argument."
            };
            return this.exists(e) ? !1 : (this._calls.push(e), this)
        }, e.prototype.detach = function(e) {
            if ("function" != typeof e) throw {
                name: "Invalid Argument",
                message: "Scroller's detach method requires a function argument."
            };
            var t = this._calls.indexOf(e);
            return 0 > t ? !1 : (this._calls.splice(t, 1), !0)
        }, e.prototype.exists = function(e) {
            if ("function" != typeof e) throw {
                name: "Invalid Argument",
                message: "Scroller's exists method requires a function argument."
            };
            return this._calls.indexOf(e) >= 0
        }, e.prototype.scroll = function() {
            this._lastKnown = this._el.scrollTop, this._request_tick()
        }, mm.scroller = new e(document.getElementById("container"))
    }(), mm.SlidingCarousel = function(e) {
        var u = _.extend({}, mm.EventEmitter());
        if (u.el = $(e), u.slides = $("> li", e).map(function(e, t) {
                return new SlidingCarouselSlide(t, e)
            }), u.numSlides = u.slides.length, u.events = {
                transitionStart: "SlidingCarouselTransitionStart",
                transitionComplete: "SlidingCarouselTransitionComplete"
            }, u.goToSlide = function(e, i) {
                if (e != u.currentSlide.index && !p) {
                    p = !0, u.trigger(u.events.transitionStart);
                    var a = o(e);
                    i || (i = e > u.currentSlide.index ? 1 : -1), i > 0 ? (u.nextSlide = u.slides[e], r({
                        override: "next"
                    })) : (u.previousSlide = u.slides[e], r({
                        override: "previous"
                    })), _.defer(function() {
                        i > 0 ? oak.strap(u.nextSlide.el[0]).transition({
                            left: "0%",
                            duration: 400,
                            timing: oak.timing.easeInOutQuad
                        }) : oak.strap(u.previousSlide.el[0]).transition({
                            left: "0%",
                            duration: 400,
                            timing: oak.timing.easeInOutQuad
                        }), oak.strap(u.currentSlide.el[0]).transition({
                            left: -1 * 100 * i + "%",
                            duration: 400,
                            timing: oak.timing.easeInOutQuad,
                            onComplete: function() {
                                p = !1, r(), t(), u.trigger(u.events.transitionComplete, {
                                    index: a.index,
                                    slide: a.el
                                })
                            }
                        }), n(a.index)
                    })
                }
            }, 0 === u.slides.length) return u.currentSlide = new SlidingCarouselSlide(e, 0), u;
    };
    mm.Spinner = function(e) {
        var t = _.extend({
            lines: 9,
            length: 0,
            width: 4,
            radius: 7,
            corners: 1,
            rotate: 0,
            direction: 1,
            color: "#000",
            speed: 1.6,
            trail: 60,
            shadow: !1,
            hwaccel: !1,
            className: "spinner",
            zIndex: 2e9,
            top: "auto",
            left: "auto"
        }, e || {});
        return new Spinner(t)
    }, mm.Video = function(e, t, n, i) {
        "use strict";

        function r() {
            return o.$el.attr("id", "wistia_" + e).addClass("wistia_embed").attr("data-video-width", "100%").attr("data-video-height", "100%").css({
                height: o.height * a,
                width: o.width
            }).html("&nbsp;"), o
        }
        if (void 0 === e) return !1;
        i = i || {}, i = {
            version: "v1",
            videoWidth: "100%",
            playButton: i.playButton || !1,
            smallPlayButton: i.smallPlayButton || !1,
            playbar: i.playbar || !1,
            fullscreenButton: i.fullscreenButton || !1,
            autoPlay: i.autoPlay || !1,
            endVideoBehavior: i.endVideoBehavior || "reset",
            controlsVisibleOnLoad: i.controlsVisibleOnLoad || !0,
            platformPreference: i.platformPreference || "html5",
            chromeless: i.chromeless || !0,
            wmode: i.wmode || "opaque",
            videoFoam: i.videoFoam || !1,
            videoQuality: i.videoQuality || "hd-only"
        };
        var o = {
                $el: $(document.createElement("div")),
                wistia: void 0,
                height: n || 360,
                width: t || 640
            },
            a = .5625;
        return o.embed = function(t) {
            t.append(o.$el), o.wistia = Wistia.embed(e, i), o.wistia.ready(o.onReady)
        }, o.onReady = function() {}, o.size = function() {}, r()
    }, mm.Mixtape = function(e) {
        return mm.Model(e, {
            name: "mixtape",
            url: "/mixtapes"
        })
    }, mm.MixtapeCollection = function() {
        return mm.Collection({
            url: "/mixtapes"
        })
    }, mm.BasePlayer = function(e) {

        if ("undefined" != typeof e && "undefined" != typeof Audio) {
            var a, s = mm.EventEmitter(),
                u = $(".mm-player-controls", e),
                l = 0,
                c = !1,
                d = new mm.Spinner,
                f = null;
            s.init = function() {
                s.createAudio(function() {
                    s.bindEvents(), s.setState("idle"), t(), mm.user.isLoggedIn() ? i("show") : i("hide")
                })
            };
            var p = new Audio;
            return $("body").append(p), s.$el = e, s.$trackDetails = $(".track-details", e), s.$trackStream = $(".track-stream", e), s.$trackElapsed = $(".track-elapsed", e), s.$trackBuffered = $(".track-buffered", e), s.$deck = $(".player-deck", e), s.$scrubber = $(".mm-scrubber", e), s.$photo = $(".artist-image img", e), s.$name = $(".artist-name", e), s.$title = $(".track-title", e), s.$actionWrap = $(".mm-player-actions", e), s.$elapsed = $(".elapsed", e), s.$radio = $(".mm-radio", e), s.$radioSelect = $(".mm-station-select", e.closest("[role='main']")), s.$total = $(".total", e), s.$actionLyrics = $(".lyrics", s.$actionWrap), s.$actionCustomize = $(".customize", s.$actionWrap), s.$nextButton = $(".action.next", e), s.$playButton = $(".action.play", e), s.$prevButton = $(".action.prev", e), s.bufferEnd = 0, s.isRadio = !1, s.pointer = 0, s.queue = [], s.streamWidth = 0, s.radioQueue = [], s._onCanplay = function() {
                s.$trackDetails.off("click").on("click", function(e) {
                    if (e.preventDefault(), "A" === e.target.tagName) return !1;
                    var t = e.offsetX || e.clientX - $(e.target).offset().left,
                        n = t / s.streamWidth * s.audio.duration;
                    s.audio.setCurrentTime(n)
                }), oak.support.isTouch ? mm.spin(!1) : d.stop(), u.removeClass("spinning"), s.audio.paused && s.audio.play(), oak.support.ie && setTimeout(function() {
                    s.audio.setCurrentTime(0)
                }, 100)
            }, s._onEnded = function() {
                s.$playButton.attr("data-action", "play"), e.removeClass("playing"), s.next()
            }, s._onLoadedmetadata = function() {
                var e = new Date(null);
                e.setSeconds(s.audio.duration), e = e.toTimeString().substr(3, 5).replace(/^0+/, ""), s.$elapsed.html("0:00"), s.$total.html(e), e = null
            }, s._onPause = function() {
                s.setState("paused")
            }, s._onPlay = function() {
                s.setState("playing")
            }, s._onProgress = function() {
                s.audio.buffered.length && (s.bufferEnd = s.audio.buffered.end(0), s.sizeBuffer())
            }, s._onTimeupdate = function() {
                oak.support.isTouch && mm.spin(!1);
                var e = new Date(null);
                e.setSeconds(s.audio.currentTime), e = e.toTimeString().substr(3, 5).replace(/^0/, ""), s.$elapsed.html(e), e = null, s.sizeElapsed(), s.audio.buffered.length && !s.bufferEnd && (s.bufferEnd = s.audio.buffered.end(0), s.sizeBuffer())
            }, s.createAudio = function(e) {
                s.audio = new MediaElement(p, {
                    pluginPath: "/assets/",
                    enablePluginDebug: !1,
                    type: ["audio/mp3", "audio/ogg"],
                    mode: "auto_plugin",
                    success: function(t) {
                        s.audio = t, e.call()
                    },
                    error: function(e) {
                        console.log("Error creating audio player.", e)
                    }
                })
            }, s.bindEvents = function() {
                s.audio.preload = "auto", s.audio.addEventListener("canplay", s._onCanplay, !1), s.audio.addEventListener("ended", s._onEnded, !1), s.audio.addEventListener("loadedmetadata", s._onLoadedmetadata, !1), s.audio.addEventListener("pause", s._onPause, !1), s.audio.addEventListener("play", s._onPlay, !1), s.audio.addEventListener("progress", s._onProgress, !1), s.audio.addEventListener("timeupdate", s._onTimeupdate, !1), s.$radio.on("click", function(e) {
                    return e.preventDefault(), e.stopImmediatePropagation(), s.radio(), _gaq.push(["_trackEvent", "Radio", "Play Marmoset Radio", "Clicked Turn on Marmoset Radio Label"]), !1
                }), s.$radioSelect.find("select").first().on("change", function() {
                    var e = $("option:selected", this),
                        t = e.val();
                    t && n(t, s.radio)
                }), s.$nextButton.on("click", function(e) {
                    e.preventDefault(), s.next()
                }), s.$prevButton.on("click", function(e) {
                    e.preventDefault(), s.prev()
                })
            }, s.injectPlaying = function(t) {
                if ("undefined" == typeof t) return !1;
                null !== f && (f.destroy(), f = null), s.$photo.attr("src", t.artist.photo), s.$name.html(t.artist.name).attr("data-bypass", !0).attr("href", "/artists/" + t.artist.slug), s.$title.html(t.display_name).attr("data-bypass", !0).attr("href", "/browse/" + t.id), s.$deck.attr("data-track-id", t.id).attr("data-track", JSON.stringify(t)), e.attr("data-track-id", t.id).attr("data-track", JSON.stringify(t)), mm.facade.trigger("bypass");
                var n = t.lyrics ? "removeClass" : "addClass";
                $(".action.lyrics", e)[n]("hide"), n = t.customizable ? "removeClass" : "addClass", $(".action.customize", e)[n]("hide");
                var i = $(".action.download a", e);
                i.attr("href", "/tracks/" + t.id + "/download")
            }, s.next = function() {
                var e = s.pointer + 1,
                    t = s.queue.length;
                return s.pointer >= t - 1 ? a > 0 ? (s.pointer = a, c = !1, l = s.pointer, mm.playerProxy.trigger("next"), r()) : !1 : e >= t - 1 ? (0 > a && s.$nextButton.addClass("disabled"), s.pointer = t - 1, s.pointer > l ? (c = !1, l = s.pointer) : c = !0, mm.playerProxy.trigger("next"), r()) : (s.pointer = e, s.pointer > l ? (c = !1, l = s.pointer) : c = !0, mm.playerProxy.trigger("next"), r())
            }, s.pause = function() {
                s.audio.pause()
            }, s.play = function(e, t) {
                if (!e) return s.audio.play();
                if (s.isRadio = "undefined" == typeof t ? !1 : t, Array.isArray(e)) {
                    var n, i = e[0];
                    s.queue = s.queue.concat(e), n = s.queue.indexOf(i), s.pointer = a = n, s.$nextButton.removeClass("disabled")
                } else s.queue.push(e), s.pointer = s.queue.length - 1, a = -1, s.$nextButton.addClass("disabled");
                c = !1, l = s.pointer, r()
            }, s.prev = function() {
                return s.audio.currentTime > 5 || 0 === s.pointer ? s.audio.setCurrentTime(0) : (s.$nextButton.removeClass("disabled"), c = !0, s.pointer -= 1, mm.playerProxy.trigger("back"), r())
            }, s.radio = function() {
                s.play(s.radioQueue, !0), s.setState("idle"), mm.playerProxy.trigger("radio")
            }, s.sizeElapsed = function() {
                var e = s.audio.currentTime / s.audio.duration * s.streamWidth;
                e >= s.streamWidth && (e = s.streamWidth), s.$trackElapsed.width(e)
            }, s.sizeBuffer = function() {
                var e = s.bufferEnd / s.audio.duration * s.streamWidth;
                e >= s.streamWidth && (e = s.streamWidth), s.$trackBuffered.width(e)
            }, s.states = {
                onIdle: function() {
                    e.removeClass("has-track playing"), s.$playButton[0].addEventListener("click", o, !1)
                },
                offIdle: function() {
                    s.$playButton[0].removeEventListener("click", o)
                },
                onPlaying: function() {
                    e.addClass("has-track playing"), s.$playButton.attr("data-action", "pause")
                },
                onPaused: function() {
                    e.removeClass("playing"), s.$playButton.attr("data-action", "play")
                }
            }, s.on("history", function(e) {
                var t = e.data.reverse();
                if (e.wipe) return s.queue = t, s.pointer = 0;
                var n = s.queue[s.pointer];
                s.queue = t.concat(s.queue), s.pointer = s.queue.indexOf(n)
            }), s.on("pause", s.pause), s.on("play", function(e) {
                var t;
                t = _.isObject(e) && _.has(e, "tracks") ? e.tracks : e, s.play(t)
            }), mm.user.on("logged_in", function() {
                i("show")
            }), mm.user.on("logged_out", function() {
                i("hide")
            }), s
        }
    }, mm.Bubbler = function(e) {
        "use strict";

        function t() {
            var t = $(".bubble", e);
            return t.each(function(e, t) {
                var n = mm.BubblerImage($(t), E, e);
                E.bubbles.push(n), q += $(t).outerWidth(!0)
            }), S.on("mousedown", d), mm.facade.on("page:hidden", u), mm.facade.on("page:visible", l), _.extend(F, E.bubbles), B = F.length, j = E.bubbles.length, S.width(q), E.setOffsets(), r(), mm.scroller.attach(o), E
        }

        function n(e) {
            S.append(e.$el)
        }

        function i() {
            var e = S.offset().left,
                t = H >= e + q,
                i = e >= -T;
            if (t ? (n(a(A, !0)), A += 1, A > B - 1 && (A = 0)) : i && (m(a(P, !1)), P -= 1, 0 > P && (P = B - 1)), j > 10) {
                var r;
                E.direction ? (r = E.bubbles.pop(), A = r.position) : (r = E.bubbles.shift(), O += T, P = r.position), S.css({
                    width: q -= T,
                    marginLeft: O
                }), r.$el.remove(), j = E.bubbles.length
            }
        }

        function r() {
            var e = H - q,
                t = 0;
            e % T > 0 ? (n(a(A, !0)), A += 1, r()) : (t = R = j % 2 > 0 ? q / -2 + 1.5 * T : q / -2 + T, v(t), P = B - 1)
        }

        function o(e) {
            e > z - window.innerHeight && !C ? C = setInterval(E.next, 3e3) : e < z - window.innerHeight && C && (C = function() {
                return clearInterval(C), 0
            }())
        }

        function a(e, t) {
            var n = F[e].$el.clone(),
                i = mm.BubblerImage(n, E, F[e].position);
            return S.width(q += T), t ? E.bubbles.push(i) : E.bubbles.unshift(i), j = E.bubbles.length, i.draw(), i
        }

        function s(e) {
            if (I = e, Math.abs(e) < 10) {
                var t = R % T << 0;
                return g(t), cancelAnimationFrame(y)
            }
            I > 100 ? I = 100 : -100 > I && (I = -100), R += I, v(R), I *= .9, f(), i(), y = requestAnimationFrame(function() {
                s(I)
            })
        }

        function u() {
            x && clearInterval(x), C && clearInterval(C), cancelAnimationFrame(y)
        }

        function l() {
            0 !== I && (y = requestAnimationFrame(function() {
                s(I)
            })), C = setInterval(E.next, 3e3)
        }

        function c(e) {
            e.preventDefault(), isNaN(R) && (R = parseInt(S.attr("data-trans"), 10)), b = e.clientX, N = R + (b - D);
            var t = N;
            v(N), f(), t > L ? E.direction = 1 : L > t && (E.direction = 0), i(), L = t
        }

        function d(e) {
            e.preventDefault(), $(document.body).on("mousemove", c).on("mouseup", p).on("mouseleave", p), D = e.clientX, L = R, cancelAnimationFrame(y), E.setState("dragging"), C && clearInterval(C)
        }

        function f() {
            var e = 0,
                t = E.bubbles.length;
            for (e; t > e; e += 1) E.bubbles[e].draw()
        }

        function p(e) {
            e.preventDefault(), $(document.body).off("mousemove", c).off("mousemove", p).off("mouseleave", p), E.setState("coasting")
        }

        function h() {
            x = setInterval(function() {
                w = b
            }, 150)
        }

        function m(e) {
            O -= T, S.prepend(e.$el), S.css("margin-left", O)
        }

        function g(e) {
            var t, n = Math.abs(e),
                i = e / n;
            R <<= 0, t = M >= n ? i > 0 ? R - e : R + e * i : R + (T - n) * i, v(t, !0)
        }

        function v(e, t) {
            isNaN(e) && (e = parseInt(S.attr("data-trans"), 10)), t ? k = new TWEEN.Tween({
                a: R
            }).to({
                a: e
            }, 200).easing(TWEEN.Easing.Back.Out).onUpdate(function() {
                S.css("transform", "translateX(" + this.a + "px)"), S.attr("data-trans", this.a), R = this.a, i(), f()
            }).start() : S.css("transform", "translateX(" + e + "px)")
        }
        if (void 0 === e) return !1;
        var y, b, w, x, k, C, E = mm.EventEmitter(),
            S = $("ul", e),
            T = 392,
            P = 0,
            A = 0,
            I = 0,
            N = 0,
            D = 0,
            M = 196,
            L = 0,
            j = 0,
            O = 0,
            F = [],
            B = 0,
            z = e.offset().top,
            R = 0,
            H = 0,
            q = 0;
        return E.bubbles = [], E.offScreenLeft = 0, E.offScreenRight = 0, E.on("dragStart", d), E.on("dragEnd", p), E.states = {
            onCoasting: function() {
                clearInterval(x);
                var t = b - w,
                    n = 100;
                return 0 === N ? !1 : ($(document.body).removeClass("inside-dragging"), e.removeClass("dragging"), R = N, N = 0, 1 === E.direction ? t >= n && (t = n) : -n > t && (t = -n), s(t), void 0)
            },
            onDragging: function() {
                $(document.body).addClass("inside-dragging"), e.addClass("dragging"), h()
            }
        }, E.setOffsets = function(e) {
            e = e || window.innerWidth, H = e, E.offScreenLeft = (e - 1140) / 2, E.offScreenRight = 1140 + E.offScreenLeft
        }, E.next = function() {
            s(-50)
        }, E.offLoad = function() {
            mm.scroller.detach(o), mm.facade.off("page:hidden", u), mm.facade.off("page:visible", l), clearInterval(C), clearInterval(x), _.each(E.bubbles, function(e) {
                e.offLoad()
            })
        }, t()
    }, mm.DrawerForm = function(e, t) {
        "use strict";

        function n() {
            return i.$form.off("submit").on("submit", i.submit), i
        }
        if ("undefined" != typeof e) {
            t = t || _.extend({}, {
                url: null,
                type: "GET",
                empty: !0
            });
            var i = mm.EventEmitter();
            return i.$el = e, i.$form = $("form", e), i.$hides = $(".form-hide", e), i.$inputs = $("input", i.$form).add($("textarea", i.$form)), i.$submit = $("[type=submit]", e), i.$errors = $(".errors", e), i.$success = $(".success", e), i.options = t, i.scope = i.$form.attr("data-scope"), i.spinner = new mm.Spinner, i.spinTarg = i.$submit.parent("div")[0], i.buildPayload = function() {
                var e = {},
                    t = {};
                return i.$inputs.each(function(t, n) {
                    var i = n.getAttribute("name");
                    e[i] = n.value
                }), "none" === i.scope ? t = e : t[i.scope] = e, t
            }, i.complete = function() {
                return i.spin(!1), i
            }, i.handleErrors = function(e, n) {
                var r;
                (t.empty || n) && i.$errors.empty(), i.$inputs.removeClass("invalid");
                for (var o in e.errors) {
                    var a = e.errors[o];
                    i.$inputs.filter('[name="' + o + '"]').addClass("invalid"), _.each(a, function(e) {
                        var t;
                        o = o.replace("_", " "), o = o.charAt(0).toUpperCase() + o.slice(1), t = o + " " + e, t !== r && i.$errors.append($("<div/>").text(t)), r = t
                    })
                }
                return i.$errors.addClass("display"), mm.drawer.trigger("resize:" + i.$el.closest("article").attr("id")), i
            }, i.handleFail = function() {
                return i.handleErrors({
                    all: ["An error has occurred. Please try again later."]
                }, !0), i.trigger("form:failure"), i
            }, i.handleSuccess = function(e) {
                return e.success ? (t.empty && i.$errors.empty(), i.$errors.removeClass("display"), i.$inputs.removeClass("invalid"), i.$success.addClass("display"), i.$hides.addClass("hide"), i.$form.addClass("success"), i.trigger("form:success"), i) : i.handleErrors(e)
            }, i.reset = function() {
                return t.empty && i.$errors.empty(), i.$errors.removeClass("display"), oak.support.isTouch ? i.$inputs.removeClass("invalid") : i.$inputs.removeClass("invalid").first().focus(), i.$success.removeClass("display"), i.$hides.removeClass("hide"), i.$form.removeClass("success"), i.$form[0].reset(), i
            }, i.spin = function(e) {
                e ? (i.$el.addClass("processing"), i.$inputs.attr("disabled", !0), i.$submit.attr("disabled", !0), i.spinner.spin(i.spinTarg), mm.drawer.spin(!0)) : (i.$el.removeClass("processing"), i.$inputs.removeAttr("disabled"), i.$submit.removeAttr("disabled"), i.spinner.stop(), mm.drawer.spin(!1))
            }, i.submit = function(e) {
                e.preventDefault();
                var t = i.buildPayload();
                return i.spin(!0), $.ajax({
                    url: i.options.url,
                    type: i.options.type,
                    data: t
                }).done(i.handleSuccess).fail(i.handleFail).always(i.complete), i
            }, n()
        }
    }, mm.FancyInput = function(e) {
        "use strict";

        function t() {
            return e.on("click", i).on("blur", n), l.on("submit", function(t) {
                t.preventDefault();
                var n = encodeURIComponent(e.val());
                mm.router.navigate("/browse?search=" + n, {
                    trigger: !0
                })
            }), oak.support.isTouch && $("#container").not(l).on("click touch", function(t) {
                t.stopImmediatePropagation(), e.is(":focus") || e.blur()
            }), setTimeout(r, 100), s
        }

        function n(t) {
            t.preventDefault(), c = !0, e.val() || (d = f, e.val(d), l.removeClass("user-focused"), u.attr("disabled", !0))
        }

        function i(t) {
            t.preventDefault(), c = !0, a && clearInterval(a), (e.val() === d || p) && e.val(""), l.addClass("user-focused"), u.attr("disabled", !1)
        }

        function r() {
            return p || oak.support.isTouch ? e.val(f) : (e[0].focus(), setTimeout(o, 1500), void 0)
        }

        function o() {
            if (!c) {
                var t = 0,
                    n = f.length;
                a = setInterval(function() {
                    d += f[t], e.val(d), t += 1, t >= n && clearInterval(a)
                }, 50)
            }
        }
        if (void 0 !== e) {
            var a, s = {},
                u = e.next("button"),
                l = e.parent("form"),
                c = !1,
                d = "",
                f = e.attr("data-value"),
                p = window.isFF;
            return t()
        }
    }, mm.FilterArc = function(e) {
        "use strict";

        function t() {
            a.line = {};
            for (var e in f) {
                a.line[e] = {};
                for (var t in f[e]) a.line[e][t] = f[e][t]
            }
            return a.tween = void 0, n(), mm.facade.on("page:hidden", i), mm.facade.on("page:visible", r), a
        }

        function n() {
            if (u) {
                u.clearRect(0, 0, c, l), requestAnimationFrame(n);
                var e = 0;
                for (u.save(), u.fillStyle = "#FFFFFF", e; 549 > e; e += 9) u.fillRect(e, 0, 9, l), e += 9;
                u.lineWidth = 1, u.strokeStyle = "#e3e3e3";
                for (var t in d) {
                    u.beginPath();
                    for (var i in d[t]) "a" === i ? u.moveTo(d[t][i].x, d[t][i].y) : u.lineTo(d[t][i].x, d[t][i].y);
                    u.stroke(), u.closePath()
                }
                u.lineWidth = 4, u.strokeStyle = "#37b480", u.beginPath();
                for (var t in a.line) "a" === t ? u.moveTo(a.line[t].x, a.line[t].y) : u.lineTo(a.line[t].x, a.line[t].y);
                u.stroke(), u.closePath(), u.restore()
            }
        }

        function i() {
            cancelAnimationFrame(n)
        }

        function r() {
            requestAnimationFrame(n)
        }

        function o(e) {
            var t = void 0 === e ? f : d[e];
            for (var n in a.line) new TWEEN.Tween(a.line[n]).to(t[n], 500).easing(TWEEN.Easing.Exponential.Out).start()
        }
        if (void 0 !== e) {
            var a = mm.FilterBaseRadio(e),
                s = document.getElementById("mm-arc-canvas"),
                u = s.getContext("2d"),
                l = s.height,
                c = s.width,
                d = {
                    steady: {
                        a: {
                            x: 0,
                            y: 100.5
                        },
                        b: {
                            x: 94.5,
                            y: 100.5
                        },
                        c: {
                            x: 130.5,
                            y: 100.5
                        },
                        d: {
                            x: 184.5,
                            y: 100.5
                        },
                        e: {
                            x: 274.5,
                            y: 100.5
                        },
                        f: {
                            x: 346.5,
                            y: 100.5
                        },
                        g: {
                            x: 418.5,
                            y: 100.5
                        },
                        h: {
                            x: 436.5,
                            y: 100.5
                        },
                        i: {
                            x: c,
                            y: 100.5
                        }
                    },
                    ascending: {
                        a: {
                            x: 0,
                            y: l
                        },
                        b: {
                            x: 94.5,
                            y: 172.1225
                        },
                        c: {
                            x: 130.5,
                            y: 161.5
                        },
                        d: {
                            x: 184.5,
                            y: 145.5725
                        },
                        e: {
                            x: 274.5,
                            y: 119.0225
                        },
                        f: {
                            x: 346.5,
                            y: 97.7825
                        },
                        g: {
                            x: 418.5,
                            y: 76.5425
                        },
                        h: {
                            x: 436.5,
                            y: 71.2325
                        },
                        i: {
                            x: c,
                            y: 38
                        }
                    },
                    descending: {
                        a: {
                            x: 0,
                            y: 38
                        },
                        b: {
                            x: 94.5,
                            y: 65.8775
                        },
                        c: {
                            x: 130.5,
                            y: 76.4975
                        },
                        d: {
                            x: 184.5,
                            y: 92.4275
                        },
                        e: {
                            x: 274.5,
                            y: 118.9775
                        },
                        f: {
                            x: 346.5,
                            y: 140.2175
                        },
                        g: {
                            x: 418.5,
                            y: 161.4575
                        },
                        h: {
                            x: 436.5,
                            y: 166.7675
                        },
                        i: {
                            x: c,
                            y: l
                        }
                    },
                    crescendo: {
                        a: {
                            x: 0,
                            y: l
                        },
                        b: {
                            x: 94.5,
                            y: 140.0964
                        },
                        c: {
                            x: 130.5,
                            y: 117.2761
                        },
                        d: {
                            x: 184.5,
                            y: 83.04545
                        },
                        e: {
                            x: 274.5,
                            y: 26
                        },
                        f: {
                            x: 346.5,
                            y: 71.6353
                        },
                        g: {
                            x: 418.5,
                            y: 117.2761
                        },
                        h: {
                            x: 436.5,
                            y: 128.6863
                        },
                        i: {
                            x: c,
                            y: l
                        }
                    },
                    multiple: {
                        a: {
                            x: 0,
                            y: l
                        },
                        b: {
                            x: 94.5,
                            y: 74.7875
                        },
                        c: {
                            x: 130.5,
                            y: 27
                        },
                        d: {
                            x: 184.5,
                            y: 82.498
                        },
                        e: {
                            x: 274.5,
                            y: 175
                        },
                        f: {
                            x: 346.5,
                            y: 101
                        },
                        g: {
                            x: 418.5,
                            y: 27
                        },
                        h: {
                            x: 436.5,
                            y: 50.9375
                        },
                        i: {
                            x: c,
                            y: l
                        }
                    },
                    frenetic: {
                        a: {
                            x: 0,
                            y: 113
                        },
                        b: {
                            x: 94.5,
                            y: 140
                        },
                        c: {
                            x: 130.5,
                            y: 101.97
                        },
                        d: {
                            x: 184.5,
                            y: 45
                        },
                        e: {
                            x: 274.5,
                            y: 119
                        },
                        f: {
                            x: 346.5,
                            y: 72
                        },
                        g: {
                            x: 418.5,
                            y: 117.6
                        },
                        h: {
                            x: 436.5,
                            y: 129
                        },
                        i: {
                            x: c + 1,
                            y: 45
                        }
                    }
                },
                f = {
                    a: {
                        x: 0,
                        y: 198
                    },
                    b: {
                        x: 94.5,
                        y: 198
                    },
                    c: {
                        x: 130.5,
                        y: 198
                    },
                    d: {
                        x: 184.5,
                        y: 198
                    },
                    e: {
                        x: 274.5,
                        y: 198
                    },
                    f: {
                        x: 346.5,
                        y: 198
                    },
                    g: {
                        x: 418.5,
                        y: 198
                    },
                    h: {
                        x: 436.5,
                        y: 198
                    },
                    i: {
                        x: c,
                        y: 198
                    }
                };
            a.actionables.hover(function() {
                var e = $(this).data("val");
                o(e)
            }, function() {
                var e = void 0;
                if (a.set) {
                    var t = Object.keys(a.values);
                    e = a.values[t].value
                }
                o(e)
            });
            var p = a.create;
            a.create = function(e) {
                p(e), o(e[0])
            };
            var h = a.remove;
            return a.remove = function(e) {
                o(), h(e)
            }, a.offLoad = function() {
                cancelAnimationFrame(n), mm.facade.off("page:hidden", i), mm.facade.off("page:visible", r), s = null, u = null
            }, t()
        }
    }, mm.FilterBase = function(e) {
        "use strict";

        function t() {
            if ("search" !== i.id) {
                var e = '.mm-filter-link[href="#' + i.id + '"]';
                i.navigation = mm.FilterSupportNavigationView($(e))
            }
            return i
        }

        function n() {
            var e = "unset";
            Object.keys(i.values).length && (e = "set"), i.setState(e)
        }
        if ("undefined" != typeof e) {
            var i = mm.EventEmitter();
            return i.actionables = $(".actionable", e), i.id = e.attr("id"), i.navigation = null, i.set = !1, i.values = {}, i.add = function(e) {
                var t = mm.FilterSupportValue(e);
                return i.values[e.id] = t, mm.workbench.add(i.values[e.id], !0), n(), i
            }, i.create = function() {}, i.current = function() {
                return e.addClass("current"), mm.isMobile && (mm.workbench.select[0].blur(), i.navigation.setState("active")), i
            }, i.exists = function(e) {
                return i.values[e]
            }, i.inactive = function() {
                var t = "unsetAndIdle";
                return i.set && (t = "setAndIdle"), i.navigation.setState(t), e.removeClass("current"), i
            }, i.insert = function(e, t) {
                var r = mm.FilterSupportValue(t);
                return i.values[t.id] = r, mm.workbench.insert(e, r), n(), i
            }, i.remove = function(e) {
                if (i.values[e.id]) {
                    var t = i.values[e.id];
                    delete i.values[e.id], mm.workbench.remove(t)
                }
                return n(), t
            }, i.removeAll = function() {
                return i.values = {}, mm.workbench.removeAllFromFilter(i.id), n(), i
            }, i.replace = function(e) {
                return i.values = {}, mm.workbench.replace(e.filter, function() {
                    i.add(e)
                }), i
            }, i.or = function(e) {
                var t = mm.FilterSupportValue(e);
                return i.values[e.id] = t, mm.workbench.or(i.values[e.id], !0), n(), i
            }, i.onSet = function() {
                i.set = !0
            }, i.onUnset = function() {
                i.set = !1
            }, i.states = {
                onSet: i.onSet,
                onUnset: i.onUnset
            }, t()
        }
    }, mm.FilterBaseCheck = function(e) {
        "use strict";

        function t(e, t) {
            var i = e.data("selected") || !1,
                r = e.data("val"),
                o = {
                    filter: n.id,
                    id: r,
                    value: r,
                    pretty: e.data("pretty")
                };
            i ? (t || n.remove(o), e.removeClass("selected").data("selected", !1)) : (t || n.add(o), e.addClass("selected").data("selected", !0))
        }
        if (void 0 !== e) {
            var n = mm.FilterBase(e);
            n.actionables.on("click", function(e) {
                e.preventDefault();
                var n = $(this);
                t(n)
            }), n.create = function(e) {
                e.forEach(function(e) {
                    var i = n.actionables.filter('[data-val="' + e + '"]');
                    t(i)
                })
            };
            var i = n.remove;
            return n.remove = function(e) {
                var r = n.actionables.filter('[data-val="' + e.value + '"]');
                t(r, !0), i(e)
            }, n
        }
    }, mm.FilterGenres = function(e) {
        return mm.FilterBaseCheck(e)
    }, mm.FilterInstruments = function(e) {
        "use strict";

        function t() {
            return _.each(u, function(e, t) {
                l >= 0 || s.canPlayType && "" != s.canPlayType(e.type) && (l = t)
            }), l
        }

        function n() {}

        function i(e) {
            0 > l || (s.setAttribute("src", e[l].src), s.setAttribute("type", e[l].type), s.load(), s.play())
        }

        function r() {
            var e = $(this).data(),
                t = [{
                    src: e.audioMp3,
                    type: u[0]
                }, {
                    src: e.audioOgg,
                    type: u[1]
                }];
            i(t)
        }

        function o() {
            s.setAttribute("src", ""), s.setAttribute("type", "")
        }
        var a = mm.FilterBaseCheck(e),
            s = new Audio,
            u = [{
                extension: "mp3",
                type: "audio/mpeg;"
            }, {
                extension: "ogg",
                type: "audio/ogg;"
            }],
            l = -1;
        return t(), n(), a.actionables.hover(r, o), a
    }, mm.FilterBaseRadio = function(e) {
        "use strict";

        function t(e, t) {
            var i = e.data("selected") || !1,
                r = e.data("val"),
                o = {
                    filter: n.id,
                    id: r,
                    value: r,
                    pretty: e.data("pretty")
                };
            i ? (t || n.remove(o), e.removeClass("selected").data("selected", !1)) : (t || ("energy" === o.filter ? n.or(o) : n.replace(o)), "energy" !== o.filter && n.actionables.not(e).removeClass("selected").data("selected", !1), e.addClass("selected").data("selected", !0))
        }
        if ("undefined" != typeof e) {
            var n = mm.FilterBase(e);
            n.actionables.on("click", function(e) {
                e.preventDefault();
                var n = $(this);
                t(n)
            }), n.create = function(e) {
                e.forEach(function(e) {
                    var i = n.actionables.filter('[data-val="' + e + '"]');
                    t(i)
                })
            };
            var i = n.remove;
            return n.remove = function(e) {
                var r = n.actionables.filter('[data-val="' + e.value + '"]');
                t(r, !0), i(e)
            }, n
        }
    }, mm.FilterCustomizable = function(e) {
        return mm.FilterBaseRadio(e)
    }, mm.FilterVocals = function(e) {
        return mm.FilterBaseRadio(e)
    }, mm.FilterEnergy = function(e) {
        function t(e) {
            if ("undefined" != typeof e) {
                var t;
                for (var n in e) e.hasOwnProperty(n) && (t = e[n].value);
                if ("undefined" != typeof t) return t = t.split("-"), t[0] = t[0].toLowerCase(), t = t.join("")
            }
        }
        var n = mm.FilterBaseRadio(e);
        n.high = mm.HighEnergy(document.getElementById("high-energy-canvas"), 90, 90), n.mediumHigh = mm.MediumHighEnergy(document.getElementById("medium-high-energy-canvas"), 90, 90), n.medium = mm.MediumEnergy(document.getElementById("medium-energy-canvas"), 90, 90), n.lowMedium = mm.LowMediumEnergy(document.getElementById("low-medium-energy-canvas"), 90, 90), n.low = mm.LowEnergy(document.getElementById("low-energy-canvas"), 90, 90);
        var i = n.create;
        n.create = function(e) {
            i(e), _.each(e, function(e) {
                var t = e.toLowerCase().replace(/-([a-z])/g, function(e) {
                    return e[1].toUpperCase()
                });
                n[t].tweenSelected()
            })
        };
        var r = n.replace;
        return n.replace = function(e) {
            t(n.values), r(e)
        }, n
    }, mm.BaseEnergy = function(e, t, n) {
        function i() {
            return a(), o(), l.on("loaded", r), mm.facade.on("page:hidden", s), mm.facade.on("page:visible", u), l
        }

        function r() {
            requestAnimationFrame(r), l.ctx.clearRect(0, 0, l.width, l.height), l.ctx.save(), l.ctx.translate(l.width / 2, l.height / 2), l.ctx.save(), l.ctx.globalAlpha = l.opacities.d, l.ctx.drawImage(l.images.d.img, -l.images.d.hw, -l.images.d.hh, l.images.d.img.width / l.deviceBackingRatio, l.images.d.img.height / l.deviceBackingRatio), l.ctx.restore(), l.ctx.save(), l.ctx.globalAlpha = l.opacities.o, l.ctx.drawImage(l.images.o.img, -l.images.o.hw, -l.images.o.hh, l.images.o.img.width / l.deviceBackingRatio, l.images.o.img.height / l.deviceBackingRatio), l.ctx.restore(), l.ctx.save(), l.ctx.globalAlpha = l.opacities.s, l.ctx.drawImage(l.images.s.img, -l.images.s.hw, -l.images.s.hh, l.images.s.img.width / l.deviceBackingRatio, l.images.s.img.height / l.deviceBackingRatio), l.ctx.restore(), l._draw(), l.ctx.restore()
        }

        function o() {
            l.$parent.hover(function() {
                l._hovered = !0, l.tweenHover(), "function" == typeof l.rotate && requestAnimationFrame(l.rotate)
            }, function() {
                l._hovered = !1, cancelAnimationFrame(l._rotate), $(this).hasClass("selected") ? l.tweenSelected() : l.tweenIdle()
            })
        }

        function a() {
            var e = 0;
            _.each(l.images, function(t) {
                t.img.onload = function() {
                    t.w = t.img.width / l.deviceBackingRatio, t.h = t.img.height / l.deviceBackingRatio, t.hw = t.w / 2, t.hh = t.h / 2, e += 1, 3 === e && l.trigger("loaded")
                }, t.img.src = l.deviceBackingRatio > 1 ? t.src.split("|")[1] : t.src.split("|")[0]
            })
        }

        function s() {
            cancelAnimationFrame(r)
        }

        function u() {
            requestAnimationFrame(r)
        }
        var l = _.extend(mm.Canvas(e, t, n), mm.EventEmitter()),
            c = {
                r: 58,
                g: 53,
                b: 50
            },
            d = {
                r: 138,
                g: 79,
                b: 171
            },
            f = {
                r: 255,
                g: 255,
                b: 255
            };
        return l.$canvas = $(l.canvas), l.$parent = l.$canvas.parents("li"), l.stroke = _.extend({}, c), l.opacities = {
            d: 1,
            o: 0,
            s: 0
        }, l.angleOuter = 0, l.angleInner = 0, l._default = l.$canvas.attr("data-image-default"), l._over = l.$canvas.attr("data-image-over"), l._selected = l.$canvas.attr("data-image-selected"), l._rotate = null, l._hovered = !1, l.images = {
            d: {
                img: new Image,
                src: l._default,
                w: 0,
                h: 0,
                hw: 0,
                hh: 0
            },
            o: {
                img: new Image,
                src: l._over,
                w: 0,
                h: 0,
                hw: 0,
                hh: 0
            },
            s: {
                img: new Image,
                src: l._selected,
                w: 0,
                h: 0,
                hw: 0,
                hh: 0
            }
        }, l._draw = function() {}, l.offLoad = function() {
            s()
        }, l.tweenHover = function() {
            new TWEEN.Tween(l.opacities).to({
                d: 0,
                o: 1,
                s: 0
            }, 100).start(), new TWEEN.Tween(_.extend({}, l.stroke)).to(f, 100).onUpdate(function() {
                l.stroke.r = this.r << 0, l.stroke.g = this.g << 0, l.stroke.b = this.b << 0
            }).start()
        }, l.tweenIdle = function() {
            new TWEEN.Tween(l.opacities).to({
                d: 1,
                o: 0,
                s: 0
            }, 100).start(), new TWEEN.Tween(_.extend({}, l.stroke)).to(c, 100).onUpdate(function() {
                l.stroke.r = this.r << 0, l.stroke.g = this.g << 0, l.stroke.b = this.b << 0
            }).start()
        }, l.tweenSelected = function() {
            new TWEEN.Tween(l.opacities).to({
                d: 0,
                o: 0,
                s: 1
            }, 100).start(), new TWEEN.Tween(_.extend({}, l.stroke)).to(d, 100).onUpdate(function() {
                l.stroke.r = this.r << 0, l.stroke.g = this.g << 0, l.stroke.b = this.b << 0
            }).start()
        }, i()
    }, mm.HighEnergy = function(e, t, n) {
        var i = mm.BaseEnergy(e, t, n);
        return i._draw = function() {
            i.ctx.save(), i.ctx.rotate(Math.PI / 180 * i.angleOuter), i.ctx.shadowColor = "rgba(0,0,0,0.20)", i._hovered ? (i.ctx.shadowOffsetX = 0, i.ctx.shadowOffsetY = 1, i.ctx.shadowBlur = 2) : (i.ctx.shadowOffsetX = 0, i.ctx.shadowOffsetY = 0, i.ctx.shadowBlur = 0), i.ctx.lineWidth = 4, i.ctx.strokeStyle = "rgba(" + i.stroke.r + "," + i.stroke.g + "," + i.stroke.b + ",1)", i.ctx.beginPath(), i.ctx.arc(0, 0, 39, oak.degsToRads(18), oak.degsToRads(162), !1), i.ctx.stroke(), i.ctx.closePath(), i.ctx.beginPath(), i.ctx.arc(0, 0, 39, oak.degsToRads(198), oak.degsToRads(342), !1), i.ctx.stroke(), i.ctx.closePath(), i.ctx.rotate(Math.PI / 180 * i.angleInner), i.ctx.beginPath(), i.ctx.arc(0, 0, 32, oak.degsToRads(310), oak.degsToRads(50), !1), i.ctx.stroke(), i.ctx.closePath(), i.ctx.beginPath(), i.ctx.arc(0, 0, 32, oak.degsToRads(130), oak.degsToRads(230), !1), i.ctx.stroke(), i.ctx.closePath(), i.ctx.restore()
        }, i.rotate = function() {
            i.angleOuter += 4, i.angleInner -= 12, i._rotate = requestAnimationFrame(i.rotate)
        }, i
    }, mm.LowEnergy = function(e, t, n) {
        var i = mm.BaseEnergy(e, t, n);
        return i._draw = function() {
            i.ctx.save(), i.ctx.shadowColor = "rgba(0,0,0,0.20)", i._hovered ? (i.ctx.shadowOffsetX = 0, i.ctx.shadowOffsetY = 1, i.ctx.shadowBlur = 2) : (i.ctx.shadowOffsetX = 0, i.ctx.shadowOffsetY = 0, i.ctx.shadowBlur = 0), i.ctx.lineWidth = 4, i.ctx.strokeStyle = "rgba(" + i.stroke.r + "," + i.stroke.g + "," + i.stroke.b + ",1)", i.ctx.rotate(Math.PI / 180 * i.angleInner), i.ctx.beginPath(), i.ctx.arc(0, 0, 32, oak.degsToRads(360), oak.degsToRads(50), !1), i.ctx.stroke(), i.ctx.closePath(), i.ctx.restore()
        }, i.rotate = function() {
            i.angleInner -= .5, i._rotate = requestAnimationFrame(i.rotate)
        }, i
    }, mm.LowMediumEnergy = function(e, t, n) {
        var i = mm.BaseEnergy(e, t, n);
        return i._draw = function() {
            i.ctx.save(), i.ctx.shadowColor = "rgba(0,0,0,0.20)", i._hovered ? (i.ctx.shadowOffsetX = 0, i.ctx.shadowOffsetY = 1, i.ctx.shadowBlur = 2) : (i.ctx.shadowOffsetX = 0, i.ctx.shadowOffsetY = 0, i.ctx.shadowBlur = 0), i.ctx.lineWidth = 4, i.ctx.strokeStyle = "rgba(" + i.stroke.r + "," + i.stroke.g + "," + i.stroke.b + ",1)", i.ctx.rotate(Math.PI / 180 * i.angleInner), i.ctx.beginPath(), i.ctx.arc(0, 0, 32, oak.degsToRads(310), oak.degsToRads(50), !1), i.ctx.stroke(), i.ctx.closePath(), i.ctx.restore()
        }, i.rotate = function() {
            i.angleInner -= 2, i._rotate = requestAnimationFrame(i.rotate)
        }, i
    }, mm.MediumEnergy = function(e, t, n) {
        var i = mm.BaseEnergy(e, t, n);
        return i._draw = function() {
            i.ctx.save(), i.ctx.shadowColor = "rgba(0,0,0,0.20)", i._hovered ? (i.ctx.shadowOffsetX = 0, i.ctx.shadowOffsetY = 1, i.ctx.shadowBlur = 2) : (i.ctx.shadowOffsetX = 0, i.ctx.shadowOffsetY = 0, i.ctx.shadowBlur = 0), i.ctx.lineWidth = 4, i.ctx.strokeStyle = "rgba(" + i.stroke.r + "," + i.stroke.g + "," + i.stroke.b + ",1)", i.ctx.rotate(Math.PI / 180 * i.angleInner), i.ctx.beginPath(), i.ctx.arc(0, 0, 32, oak.degsToRads(310), oak.degsToRads(50), !1), i.ctx.stroke(), i.ctx.closePath(), i.ctx.beginPath(), i.ctx.arc(0, 0, 32, oak.degsToRads(130), oak.degsToRads(230), !1), i.ctx.stroke(), i.ctx.closePath(), i.ctx.restore()
        }, i.rotate = function() {
            i.angleInner -= 4, i._rotate = requestAnimationFrame(i.rotate)
        }, i
    }, mm.MediumHighEnergy = function(e, t, n) {
        var i = mm.BaseEnergy(e, t, n);
        return i._draw = function() {
            i.ctx.save(), i.ctx.rotate(Math.PI / 180 * i.angleOuter), i.ctx.shadowColor = "rgba(0,0,0,0.20)", i._hovered ? (i.ctx.shadowOffsetX = 0, i.ctx.shadowOffsetY = 1, i.ctx.shadowBlur = 2) : (i.ctx.shadowOffsetX = 0, i.ctx.shadowOffsetY = 0, i.ctx.shadowBlur = 0), i.ctx.lineWidth = 4, i.ctx.strokeStyle = "rgba(" + i.stroke.r + "," + i.stroke.g + "," + i.stroke.b + ",1)", i.ctx.beginPath(), i.ctx.arc(0, 0, 39, oak.degsToRads(198), oak.degsToRads(342), !1), i.ctx.stroke(), i.ctx.closePath(), i.ctx.rotate(Math.PI / 180 * i.angleInner), i.ctx.beginPath(), i.ctx.arc(0, 0, 32, oak.degsToRads(310), oak.degsToRads(50), !1), i.ctx.stroke(), i.ctx.closePath(), i.ctx.beginPath(), i.ctx.arc(0, 0, 32, oak.degsToRads(130), oak.degsToRads(230), !1), i.ctx.stroke(), i.ctx.closePath(), i.ctx.restore()
        }, i.rotate = function() {
            i.angleOuter += 2, i.angleInner -= 8, i._rotate = requestAnimationFrame(i.rotate)
        }, i
    }, mm.FilterLength = function(e) {
        "use strict";

        function t() {
            v.off("mousedown touchstart").on("mousedown touchstart", u);
            var e = $(".filter-wrap")[0].clientWidth;
            return C = e, S.max = e, h
        }

        function n(e) {
            var t = e.attr("data-range");
            "min" === t && k >= S.max - x ? k = S.max - x : "max" === t && k <= S.min + x && (k = S.min + x)
        }

        function i() {
            if (S.max === C && 0 === S.min) h.remove({
                filter: h.id,
                id: h.id
            }), b.removeClass("highlight");
            else {
                var e = {
                        filter: h.id,
                        id: h.id,
                        value: "",
                        pretty: ""
                    },
                    t = [],
                    n = [];
                v.each(function(e, i) {
                    i = $(i), t.push(i.attr("data-val")), n.push(i.attr("data-pretty"))
                }), e.value = t.join("-"), T = [e.value], e.pretty = n.join(" to "), h.replace(e)
            }
        }

        function r(e) {
            var t, n, i, r = e.attr("data-range");
            "min" === r ? t = k * E / C : (i = (x * E - 1e3 * C) / C, t = k * E / C - i), n = l(t), c(e), d(e, k, t, n)
        }

        function o(e) {
            return C * e / E
        }

        function a(e, t) {
            t = t.originalEvent;
            var i = e.attr("data-range");
            p = t.pageX, oak.support.isTouch && (p = t.changedTouches[0].pageX), k = S[i] + (p - f), n(e), r(e)
        }

        function s(e) {
            var t = e.attr("data-range");
            0 > k ? k = 0 : k > C && (k = C), S[t] = k, k = 0, y.off("mousemove mouseup mouseleave touchmove touchend"), v.removeClass("dragging"), i()
        }

        function u(e) {
            e.preventDefault(), e = e.originalEvent;
            var t = $(this);
            f = e.pageX, oak.support.isTouch && (f = e.targetTouches[0].pageX), _ = !0, y.on("mousemove touchmove", function(e) {
                a(t, e)
            }).on("mouseup mouseleave touchend", function() {
                s(t)
            }), t.addClass("dragging")
        }

        function l(e) {
            var t = e / 1e3 / 60 << 0,
                n = e / 1e3 % 60;
            return n = n.toFixed(0), 10 > n && (n = "0" + n), 0 >= t && (t = ""), t + ":" + n
        }

        function c(e) {
            if (_) {
                var t = e.data("range");
                b.each(function(e, n) {
                    var i = $(n),
                        r = i.position().left;
                    "min" === t && r >= k && r <= S.max || "max" === t && k >= r && r >= S.min ? i.addClass("highlight") : i.removeClass("highlight")
                })
            }
        }

        function d(e, t, n, i) {
            n <<= 0, 0 > t ? (t = 0, n = 0, i = ":00") : t > C && (t = C, n = E, i = "20:00"), e.css("transform", "translateX(" + t + "px)").html(i).attr("data-pretty", i).attr("data-val", n)
        }
        if ("undefined" != typeof e) {
            var f, p, h = mm.FilterBase(e),
                m = h.actionables.filter(".max"),
                g = h.actionables.filter(".min"),
                v = m.add(g),
                y = $(document.body),
                b = $("ul li", e),
                w = $("ul", e),
                x = 80,
                k = 0,
                _ = !1,
                C = 0,
                E = 12e5,
                S = {
                    max: 0,
                    min: 0
                },
                T = [],
                P = h.current;
            h.current = function() {
                P(), h.resize(), S.max = C, T.length && h.create(T)
            }, h.create = function(e) {
                C || (C = $(".filter-wrap")[0].clientWidth, S.max = C), T = e, _ = !0, e = e[0].split("-"), e.forEach(function(e, t) {
                    var i;
                    if (e = parseInt(e, 10), 0 === t) i = g, k = e * C / E;
                    else {
                        var o = (x * E - 1e3 * C) / C;
                        i = m, k = (e + o) * C / E
                    }
                    S[i.attr("data-range")] = k, n(i), r(i)
                }), i()
            };
            var A = h.remove;
            return h.remove = function(e) {
                d(g, 0, 0, ":00"), d(m, C, E, "20:00"), c(g), c(m), k = 0, S = {
                    max: C,
                    min: 0
                }, b.removeClass("highlight"), T = [], A(e)
            }, h.resize = function() {
                x = m[0].clientWidth, C = w[0].clientWidth - x, v.each(function(e, t) {
                    t = $(t);
                    var n = parseInt(t.attr("data-val"), 10),
                        i = o(n);
                    d(t, i, n, t.attr("data-pretty"))
                })
            }, t()
        }
    }, mm.FilterMood = function(e) {
        "use strict";

        function t() {
            return delete a.actionables, a.on("closeAll", function() {
                s.each(function(e, t) {
                    var n = $(t).attr("data-mood-key");
                    a.modules[n].close()
                })
            }), s.each(function(e, t) {
                t = $(t);
                var n = t.attr("data-class"),
                    i = t.attr("data-mood-key");
                t = mm[n](t), a.modules[i] = t
            }), $(document.body).not(e).on("click", function(e) {
                e.stopImmediatePropagation(), a.trigger("closeAll")
            }), r(a.bucket), a
        }

        function n() {
            var e = "unset";
            Object.keys(a.values).length && (e = "set"), a.setState(e)
        }

        function i(e) {
            if ("undefined" == typeof e || !e.length) return !1;
            for (var t; t = e.shift();) {
                var n = l.shift();
                a.modules[n].create(t)
            }
            return !0
        }

        function r(e, t) {
            $.ajax({
                url: "/moods.json",
                data: {
                    bucket: e
                },
                dataType: "JSON",
                success: function(e) {
                    o(e), "function" == typeof t && t()
                }
            })
        }

        function o(e) {
            a.options = {}, _.each(e, function(e) {
                var t = a._formatOption(e);
                a.options[t] = {
                    value: e,
                    selected: !1,
                    module: null
                }
            }), _.each(a.modules, function(e) {
                "first" !== e.key && e.buildOptions()
            })
        }
        if ("undefined" != typeof e) {
            var a = mm.FilterBase(e),
                s = $("ol > li", e),
                u = ["first", "second", "third", "fourth"],
                l = u.slice(1);
            a.bucket = "story", a.modules = {}, a.options = {}, a._formatOption = function(e) {
                return e.replace(/\s+/g, "_").toLowerCase()
            };
            var c = a.add;
            a.add = function(e) {
                var t = a._formatOption(e.value);
                a.options[t].selected = !0, a.options[t].module = e.id, mm.workbench.trigger("option:change"), c(e)
            }, a.addOrInsert = function(e) {
                var t = a.exists(e.id);
                return t ? a.insert(t, e) : a.add(e), a
            }, a.create = function(e) {
                a.bucket = e.shift(), r(a.bucket, function() {
                    i(e)
                }), mm.workbench.moodBucket = a.bucket
            }, a.createValue = function(e) {
                var t = mm.FilterSupportValue(e),
                    i = a._formatOption(e.value);
                return a.values[e.id] = t, mm.workbench.add(a.values[e.id], !1), a.options[i].selected = !0, a.options[i].module = e.id, mm.workbench.trigger("option:change"), n(), a
            }, a.currentMood = function(e) {
                var t = s.not('[data-mood-key="' + e + '"]');
                return t.each(function(e, t) {
                    var n = $(t).attr("data-mood-key");
                    a.modules[n].close()
                }), a
            }, a.fetch = function(e) {
                return mm.workbench.moodBucket = e, a.bucket = e, r(a.bucket, function() {
                    a.removeAll(), a.modules.first.setBucket(a.bucket)
                }), a
            };
            var d = a.insert;
            a.insert = function(e, t) {
                var n = a._formatOption(t.value),
                    i = a._formatOption(e.value);
                a.options[n].selected = !0, a.options[i].selected = !1, a.options[n].module = t.id, a.options[i].module = null, mm.workbench.trigger("option:change"), d(e, t)
            };
            var f = a.remove;
            a.remove = function(e) {
                var t, n = e.id,
                    i = Object.keys(a.values),
                    r = i.length,
                    o = u.indexOf(n),
                    s = r - o,
                    l = a._formatOption(a.values[n].value);
                if (f({
                        id: n
                    }), a.options[l].selected = !1, a.options[l].module = null, 0 === s) t = a.modules[u[o + 1]], a.modules[n].available().ammendOptions(), t && t.idle().ammendOptions(), 0 === _.size(a.values) && a.fetch(a.bucket);
                else if (1 === s) {
                    var c, d = u[o + 1],
                        p = a.modules[u[o + 2]];
                    t = a.modules[d], a.values[n] = a.values[d].shiftTo(n), c = a._formatOption(a.values[n].value), a.options[c].module = n, a.modules[n].display(a.values[n].pretty).ammendOptions(), t.available().ammendOptions(), delete a.values[d], p && p.idle().ammendOptions()
                } else {
                    if (2 !== s) return !1;
                    var c, h, d = u[o + 1],
                        m = u[o + 2],
                        g = a.modules[m];
                    t = a.modules[d], a.values[n] = a.values[d].shiftTo(n), c = a._formatOption(a.values[n].value), a.options[c].module = n, a.values[d] = a.values[m].shiftTo(d), h = a._formatOption(a.values[d].value), a.options[h].module = d, a.modules[n].display(a.values[n].pretty).ammendOptions(), a.modules[d].display(a.values[d].pretty).ammendOptions(), g.available().ammendOptions(), delete a.values[m]
                }
                return a
            };
            var p = a.removeAll;
            return a.removeAll = function() {
                var e = [];
                return _.each(a.values, function(t) {
                    e.unshift(t)
                }), _.each(e, function(e) {
                    a.remove(e)
                }), p(), a
            }, a.setModule = function(e) {
                var t = s.filter('[data-mood-key="' + e + '"]').next("li").attr("data-mood-key");
                return a.modules[t] && a.modules[t].available(), a
            }, t()
        }
    }, mm.FilterSearch = function(e) {
        "use strict";

        function t() {
            var siteurl = $('#siteurl').attr('siteurl');
            return r = a.typeahead({
                name: "search",
                prefetch: siteurl+"ajax/searchtags",
                remote: siteurl+"ajax/searchtags/%QUERY",
                template: '<a class="suggestion"><%= value %></a>',
                engine: {
                    compile: function(e) {
                        var t = _.template(e);
                        return t.render = function(e) {
                            return this(e)
                        }, t
                    }
                }
            }), i(), o
        }

        function n() {
            var e = r.val();
            if ("" !== e) {
                var t = {
                    filter: "search",
                    id: e,
                    value: e,
                    pretty: e
                };
                o.replace(t)
            } else
                for (var n in o.values) o.remove({
                    id: n
                })
        }

        function i() {
            r.on("typeahead:selected", function() {
                e.submit(), a.blur()
            });
            var t = _.throttle(n, 1e3);
            a.on("keyup", function() {
                t()
            }), a.on("blur", function() {
                n()
            }), a.on("keydown", function(e) {
                13 == e.which && r.blur()
            }), e.on("submit", function(e) {
                e.preventDefault(), n(), r.blur()
            })
        }
        if (void 0 !== e) {
            var r, o = mm.FilterBase(e),
                a = $("input", e);
            mm.workbench.on("filter:search:remove", function() {
                r.typeahead("setQuery", "")
            }), o.destroy = function() {
                a.typeahead("destroy")
            }, o.create = function(e) {
                var t = {
                    filter: "search",
                    id: e[0],
                    value: e[0],
                    pretty: e[0]
                };
                r.val(e[0]), o.replace(t)
            };
            var s = o.remove;
            return o.remove = function(e) {
                s(e), r.typeahead("setQuery", "")
            }, t()
        }
    }, mm.FilterSupportFooterView = function(e) {
        "use strict";
        if (void 0 !== e) {
            var t = mm.EventEmitter(),
                n = mm.isMobile ? "&times;" : "",
                i = $("<li/>").attr("data-filter", e.filter).attr("data-id", e.id).attr("data-val", e.value).html(e.pretty + "<span>" + n + "</span>");
            return t.addTo = function(t) {
                t.prepend(i), i.on("click", function(t) {
                    t.preventDefault(), t.stopImmediatePropagation(), mm.workbench.filters[e.filter].remove({
                        filter: e.filter,
                        id: e.id,
                        value: e.value
                    })
                })
            }, t.remove = function() {
                i.off("click").remove()
            }, mm.workbench.on("footer:shift", function(t, n) {
                t === e.id && i.attr("data-id", n)
            }), t
        }
    }, mm.FilterMoodBase = function(e) {
        "use strict";

        function t() {
            return e.off("click").on("click", n), i
        }

        function n(t) {
            t.preventDefault(), t.stopImmediatePropagation(), "idle" === e.attr("data-action") && mm.workbench.filters.mood.trigger("closeAll");
            var n = e.attr("data-action");
            return n in i && i[n](), !1
        }
        if ("undefined" != typeof e) {
            var i = mm.EventEmitter();
            return i.$el = e, i.key = e.attr("data-mood-key"), i.$fauxOptionWrap = $("ul", e), i.$fauxOptions = $(".faux-option", i.$fauxOptionWrap), i.$select = $("select", e), i.$target = $(".target", e), i.close = function() {
                oak.support.isTouch ? i.$select.blur() : i.$fauxOptionWrap.removeClass("focused")
            }, i.open = function() {
                oak.support.isTouch ? i.$select.focus() : i.$fauxOptionWrap.addClass("focused"), mm.workbench.filters.mood.currentMood(i.key)
            }, t()
        }
    }, mm.FilterMoodModule = function(e) {
        "use strict";

        function t() {
            return u.off("click").on("click", r), s
        }

        function n(e) {
            return $("<li/>").addClass("faux-option").attr("data-val", e.toLowerCase()).attr("data-pretty", e).html("<a data-prevent-default>" + e + "</a>")
        }

        function i(e) {
            e.preventDefault(), e.stopImmediatePropagation();
            var t = $(this),
                n = t.attr("data-val"),
                i = {
                    filter: "mood",
                    id: s.key,
                    value: n,
                    pretty: t.attr("data-pretty")
                };
            s.addValue(i)
        }

        function r(e) {
            e.preventDefault(), e.stopImmediatePropagation(), s.$fauxOptions.removeClass("selected"), mm.workbench.filters.mood.remove({
                filter: "mood",
                id: s.key
            })
        }

        function o() {
            var e = $(this).find(":selected"),
                t = e.attr("data-val"),
                n = {
                    filter: "mood",
                    id: s.key,
                    value: t,
                    pretty: e.attr("data-pretty")
                };
            s.addValue(n), $(this).blur()
        }

        function a(e) {
            return $("<option/>").val(e).attr("data-val", e.toLowerCase()).attr("data-pretty", e).text(e)
        }
        if ("undefined" != typeof e) {
            var s = mm.FilterMoodBase(e),
                u = $(".remove", e);
            return s.addValue = function(e) {
                s.display(e.pretty), mm.workbench.filters.mood.addOrInsert(e)
            }, s.ammendOptions = function() {
                s.$fauxOptions.removeClass("disabled selected"), s.$select.find("option").removeAttr("disabled"), _.each(mm.workbench.filters.mood.options, function(e) {
                    if (e.selected && e.module !== s.key) {
                        var t = s.$select.find('option[value="' + e.value + '"]'),
                            n = s.$fauxOptions.filter('[data-pretty="' + e.value + '"]');
                        t.attr("disabled", !0), setTimeout(function() {
                            n.addClass("disabled")
                        }, 100)
                    }
                })
            }, s.available = function(e) {
                return s.$target.html(""), s.setState("available"), e && e(), s
            }, s.buildOptions = function() {
                return s.$fauxOptionWrap.empty(), s.$select.empty(), _.each(mm.workbench.filters.mood.options, function(e) {
                    s.$select.append(a(e.value)), s.$fauxOptionWrap.append(n(e.value))
                }), s.$fauxOptions = $(".faux-option", s.$fauxOptionWrap), s.$fauxOptions.off("click").on("click", i), s.$select.off("change").on("change", o), s
            }, s.create = function(e) {
                var t = s.$fauxOptions.filter('[data-val="' + e + '"]'),
                    n = {
                        filter: "mood",
                        id: s.key,
                        value: e,
                        pretty: t.attr("data-pretty")
                    };
                return s.createValue(n), s
            }, s.createValue = function(e) {
                s.display(e.pretty), mm.workbench.filters.mood.createValue(e)
            }, s.display = function(e) {
                return _.defer(function() {
                    s.$fauxOptions.removeClass("selected").filter('[data-pretty="' + e + '"]').addClass("selected")
                }), s.$target.html(e), s.close(), s.setState("set"), s
            }, s.idle = function() {
                return s.$target.html(""), s.setState("idle"), s
            }, s.states = {
                onAvailable: function() {
                    e.removeClass("set").addClass("available").attr("data-action", "open")
                },
                onIdle: function() {
                    e.removeClass("set available").attr("data-action", "idle")
                },
                onSet: function() {
                    e.removeClass("available").addClass("set"), mm.workbench.filters.mood.setModule(s.key)
                }
            }, mm.workbench.on("option:change", s.ammendOptions), t()
        }
    }, mm.FilterMoodRoot = function(e) {
        "use strict";

        function t() {
            return r.$fauxOptions.off("click").on("click", i), r.$select.off("change").on("change", n), r
        }

        function n() {
            var e = $(this).find(":selected"),
                t = e.val(),
                n = t.toLowerCase();
            r.display(t), mm.workbench.filters.mood.fetch(n), $(this).blur()
        }

        function i(e) {
            e.preventDefault(), e.stopImmediatePropagation();
            var t = $(this),
                n = t.attr("data-val"),
                i = n.toLowerCase();
            return r.display(n), mm.workbench.filters.mood.fetch(i), !1
        }
        if ("undefined" != typeof e) {
            var r = mm.FilterMoodBase(e);
            return r.display = function(e) {
                r.$fauxOptions.removeClass("selected").filter('[data-val="' + e + '"]').addClass("selected"), r.$target.html(e), r.close()
            }, r.setBucket = function(e) {
                return e = e.charAt(0).toUpperCase() + e.slice(1), r.display(e), r
            }, t()
        }
    }, mm.FilterSupportNavigationView = function(e) {
        "use strict";

        function t() {
            var t = "unsetAndIdle";
            return e.hasClass("current") && (t = "active"), mm.facade.on("app:ready", function() {
                n.setState(t)
            }), n
        }
        if ("undefined" != typeof e) {
            var n = mm.EventEmitter();
            return n.href = e.attr("href"), n.id = n.href.replace(/^#/, ""), n.states = {
                onActive: function() {
                    e.addClass("current").on("click", function(e) {
                        return e.preventDefault(), mm.isMobile && mm.workbench.select[0].focus(), !1
                    }), mm.workbench.current(n.href)
                },
                onSetAndIdle: function() {
                    e.removeClass("current").addClass("set").on("click", function(e) {
                        e.preventDefault(), n.setState("active")
                    })
                },
                onUnsetAndIdle: function() {
                    e.removeClass("current set").on("click", function(e) {
                        e.preventDefault(), n.setState("active")
                    })
                }
            }, t()
        }
    }, mm.Sorter = function(e) {
        "use strict";
        if ("undefined" != typeof e) {
            var t, n = $("option", e),
                i = e.attr("data-context"),
                r = !0,
                o = [];
            n.each(function(e, t) {
                var n, i = t.getAttribute("data-sort"),
                    r = t.getAttribute("data-sort-by");
                i = i ? " (" + i + ")" : "", n = {
                    text: t.value,
                    data: r,
                    alt: i
                }, o.push(n)
            }), t = mm.Selectable(e, o);
            var a = t.selected;
            return t.selected = function(e) {
                return a(e), r ? r = !1 : (mm.facade.trigger("tracks:sort:" + i, e.value), void 0)
            }, t.select(!1, t.$options.first()), t
        }
    }, mm.FilterSupportValue = function(e) {
        "use strict";

        function t() {
            return n = mm.isMobile ? $("#mm-tracks-listing > footer") : "search" === o.filter ? $("footer .searched-by") : $("footer .filtered-by"), i = $("ul", n), o
        }
        if (void 0 !== e) {
            var n, i, r, o = _.extend(e, mm.EventEmitter());
            return o.add = function() {
                r = mm.FilterSupportFooterView(o), r.addTo(i);
                var e = i.find("li").length;
                e > 1 && n.addClass("active")
            }, o.remove = function() {
                r.remove();
                var e = i.find("li").length;
                1 === e && n.removeClass("active")
            }, o.shiftTo = function(e) {
                return mm.workbench.trigger("footer:shift", o.id, e), o.id = e, o
            }, t()
        }
    }, mm.ProfileForm = function(e, t) {
        "use strict";

        function n() {
            h.each(function(e, t) {
                if (!$(t).attr("disabled")) {
                    var n = {
                        text: t.value,
                        data: t.value
                    };
                    x.push(n)
                }
            }), s = mm.Selectable(v, x);
            var e = s.selected;
            if (s.selected = function(t) {
                    e(t), u.find("select#user_address_attributes_country").val(t.value)
                }, g.on("click", function(e) {
                    e.preventDefault();
                    var t = $(this),
                        n = t.attr("data-value");
                    g.removeClass("active"), t.addClass("active"), "other" === n ? (p.attr("disabled", !0), m.attr("disabled", !1), m[0].focus()) : (m.attr("disabled", !0).val(""), p.attr("disabled", !1).val(n))
                }), p.val()) {
                var n = g.filter('[data-value="' + p.val() + '"]');
                n.length ? n.addClass("active") : (g.filter('[data-value="other"]').addClass("active"), m.attr("disabled", !1).val(p.val()), p.attr("disabled", !0))
            }
            if (w) {
                var i = {
                    html: w,
                    value: w
                };
                s.selected(i)
            }
            return t && u.on("submit", o), l
        }

        function i() {
            u.addClass("processing"), c.prop("disabled", !0), k.spin(y[0])
        }

        function r() {
            u.removeClass("processing"), c.prop("disabled", !1), k.stop()
        }

        function o(e) {
            e.preventDefault();
            var t = u.serialize();
            return i(), f.add(b).html(""), $("input", u).removeClass("invalid"), $.post("/account/update", t).done(function(e) {
                e.success && e.message ? b.append($("<p/>").text(e.message)) : a(e)
            }).fail(a).always(r), !1
        }

        function a(e) {
            var t;
            for (var n in e.errors) {
                var i = e.errors[n];
                $('input[name="user[' + n + ']"]', u).addClass("invalid"), _.each(i, function(e) {
                    var i;
                    n = n.replace("_", " "), n = n.charAt(0).toUpperCase() + n.slice(1), i = n + " " + e, i !== t && f.append($("<p/>").text(i)), t = i
                })
            }
        }
        if ("undefined" != typeof e) {
            "undefined" == typeof t && (t = !0);
            var s, u = e.find("form"),
                l = {},
                c = $("button[type=submit]", u),
                d = $("select#user_address_attributes_country", u),
                f = $("#edit-errors", e),
                p = $("input#user_job", u),
                h = $("option", v),
                m = $("input#job_other", u),
                g = $("ul li a", u),
                v = $("select", u),
                y = c.parent("div"),
                b = $("#edit-success", e),
                w = d.find(":selected").text(),
                x = [],
                k = new mm.Spinner;
            return n()
        }
    }, mm.header = function() {
        "use strict";

        function e(e) {
            var t;
            i.addClass("scrolling"), u && clearTimeout(u), u = setTimeout(function() {
                i.removeClass("scrolling up")
            }, 200), t = e - s, t /= Math.abs(t), t > 0 && a - 93 > e ? i.removeClass("absolute up") : t > 0 && e >= a - 93 ? i.addClass("absolute").removeClass("up") : 0 > t && e >= a - 93 ? i.addClass("absolute up") : 0 > t && a - 93 > e && i.removeClass("absolute").addClass("up"), s = e
        }
        var t, n, i, r, o, a, s, u, l = mm.EventEmitter();
        return l.setWidth = function() {
            o = $("#content"), n = $('header[role="main"]'), t = $(".header-bg"), i = n.add(t), i.width(o.width())
        }, l.build = function() {
            mm.degraded || (r = $("#container"), n = $('header[role="main"]'), t = $(".header-bg"), i = n.add(t), o = $("#content"), s = 0, i.removeClass("scrolling absolute up"), t.length ? (t.width(o.width()), a = t.height(), l.setWidth(), mm.scroller.attach(e)) : mm.scroller.exists(e) && mm.scroller.detach(e))
        }, l
    }(), mm.facade.on("app:ready", function() {
        mm.header.build(), mm.facade.on("app:header", mm.header.build)
    }), mm.HoverConnect = function(e, t) {
        "use strict";

        function n() {
            return a.append(s), i
        }
        if (void 0 !== e && void 0 !== t) {
            var i = {},
                r = e.data("connect"),
                o = e.data("connect-text"),
                a = $(".mm-connect-" + r, t),
                s = $("<div/>").addClass("connect-label").html(o);
            return e.on("mouseover", function() {
                s.addClass("connected")
            }), e.on("mouseleave", function() {
                s.removeClass("connected")
            }), i.update = function() {
                o = e.attr("data-connect-text"), s.html(o)
            }, i.destroy = function() {
                e.off("mouseover mouseleave"), r = null, a = null
            }, n()
        }
    }, mm.Selectable = function(e, t) {
        "use strict";
        if ("undefined" != typeof e) {
            var n = mm.EventEmitter(),
                i = t || {};
            return n._template = '<div class="sorter-wrap"><a class="sorter-link" data-prevent-default><div class="selected-option"></div><div class="icon"><span></span></div></a><ol class="options"><% _.each(options, function (option) { %><li class="option" data-value="<%= option.data %>"><%= option.text %><% if (option.alt && option.alt.length) { %><span><%= option.alt %></span><% } %></li><% }); %></ol></div>', n.$el = e, n.$link = void 0, n.$options = void 0, n.$wrap = void 0, n.build = function(t) {
                return "undefined" != typeof t && (i = t), n.template = _.template(n._template, {
                    options: i
                }), e.after(n.template), n.rebind(), n
            }, n.rebind = function() {
                n.$wrap = e.next(".sorter-wrap"), n.$link = $(".sorter-link", n.$wrap), n.$options = $(".option", n.$wrap), n.$link.off("click").on("click", function(e) {
                    n.toggle(e, this)
                }), n.$options.off("click").on("click", function(e) {
                    n.select(e, this)
                })
            }, n.select = function(e, t) {
                e && e.preventDefault(), t = $(t);
                var i = {
                    html: t.html(),
                    value: t.attr("data-value")
                };
                n.selected(i), n.$wrap.removeClass("open")
            }, n.selected = function(e) {
                n.$options.removeClass("selected"), $(".selected-option", n.$link).html(e.html), n.$options.filter('[data-value="' + e.value + '"]').addClass("selected"), n.trigger("selected", e)
            }, n.toggle = function(e) {
                e.preventDefault(), e.stopImmediatePropagation(), n.$wrap.toggleClass("open"), n.$wrap.hasClass("open") && $(document.body).not(n.$wrap).off("click").on("click", function(e) {
                    e.stopImmediatePropagation(), n.$wrap.removeClass("open")
                })
            }, n.build()
        }
    }, mm.Toggle = function(e) {
        "use strict";

        function t() {
            return a = $("[data-toggle].current", e), $("[data-toggle]", e).each(function(e, t) {
                var n = $(t).data("toggle");
                $(t).data("toggle-target") ? o[n] ? o[n].push(t) : o[n] = [t] : r[n] ? r[n].push(t) : r[n] = [t]
            }), n(), i
        }

        function n() {
            $.each(o, function(e, t) {
                $(t).on("click", function(t) {
                    t.preventDefault(), a && $(a).removeClass("current"), a = $.merge(o[e], r[e]), $(a).addClass("current"), i.trigger("toggle", e)
                })
            })
        }
        if (void 0 !== e) {
            var i = mm.EventEmitter(),
                r = {},
                o = {},
                a = [];
            return t()
        }
    }, mm.user = function() {
        "use strict";

        function e() {
            var e = $('meta[name="marmoset:user"]').attr("content");
            return "" !== e && (e = JSON.parse(e), t(e)), mm.facade.on("app:ready", n), i
        }

        function t(e) {
            if (_.extend(i.attributes, e), i.attributes.mixtapes) {
                for (var t = 0; t < i.attributes.mixtapes.length; t += 1) i.mixtapes.add(new mm.Mixtape(i.attributes.mixtapes[t]));
                delete i.attributes.mixtapes
            }
            i.attributes.csrfToken && (mm.csrf = i.attributes.csrfToken)
        }

        function n(e) {
            r = "undefined" == typeof e ? !1 : e, $.get("/tracks/history", {
                raw: !0
            }).done(function(e) {
                Array.isArray(e) && (mm.playerProxy.trigger("history", {
                    wipe: r,
                    data: e
                }), r = !1)
            })
        }
        var i = _.extend({
                cart: mm.cart,
                mixtapes: new mm.MixtapeCollection,
                processes: [],
                attributes: {}
            }, mm.EventEmitter()),
            r = !1;
        return i.isLoggedIn = function() {
            return "undefined" != typeof i.attributes.id
        }, i.login = function(e, r) {
            if (i.isLoggedIn()) {
                var o = $.Deferred();
                return o.resolve(i), o.promise()
            }
            var a = {
                user: {
                    remember_me: 1,
                    password: r,
                    email: e
                }
            };
            return $.ajax({
                url: "/login",
                type: "POST",
                data: a,
                dataType: "json",
                success: function(e) {
                    t(e), n(!0), i.trigger("logged_in"), _gaq.push(["_setCustomVar", 1, "Job", e.job, 2]), _gaq.push(["_setCustomVar", 1, "UserID", e.id, 2]), _gaq.push(["_trackEvent", "user", "logged in"])
                },
                error: function() {}
            })
        }, i.logout = function(e) {
            if (i.isLoggedIn()) return $.ajax({
                url: "/logout",
                type: "DELETE",
                success: function(t) {
                    i.attributes = {}, i.mixtapes.removeAll(), n(!0), i.trigger("logged_out"), t.csrfToken && (mm.csrf = t.csrfToken), _gaq.push(["_trackEvent", "user", "logged out"]), _gaq.push(["_setCustomVar", 1, "Job", "", 2]), _gaq.push(["_setCustomVar", 1, "UserID", 0, 2]), e && e()
                },
                error: function(e, t, n) {
                    console.error("Error logging out user: ", n)
                }
            });
            var t = $.Deferred();
            return t.resolve(i), t.promise()
        }, i.on("logged_in logged_out", function() {
            mm.cart.hydrate(function() {
                var e = i.cart.order.line_items.length;
                $("#mm-drawer-nav .cart .count").text(e)
            })
        }), i.on("update", function() {
            var e = i.cart.order.line_items.length;
            $("#mm-drawer-nav .cart .count").text(e)
        }), mm.facade.on("process:success:mixtape", function(e, t) {
            t = parseInt(t, 10), i.processes.splice(t, 1)
        }), e()
    }(), mm.VideoCarousel = function() {
        function e(e) {
            e.preventDefault();
            var t = $(this),
                n = t.data("hashed-id"),
                i = t.closest(h.opts.article),
                r = i.data("id"),
                o = i.find(h.opts.video),
                a = o.filter("[data-hashed-id='" + n + "']"),
                s = a.find(h.opts.play_pause),
                u = i.find(h.opts.grid_close);
            return u.trigger("click"), v[r].goToSlide(a.data("eq")), _.delay(function() {
                s.trigger("click")
            }, 500), !1
        }

        function t(e) {
            e.preventDefault();
            var t = $(this).closest(h.opts.article),
                n = t.find(h.opts.video).filter(".current"),
                i = t.find(h.opts.grid_wrapper);
            t.find(h.opts.ui);
            var r = t.find(h.opts.arrows),
                a = t.data("id"),
                s = n.data("wistia"),
                u = y[a][s.hashed_id];
            return i.is(":visible") ? (i.fadeOut(), r.off("click").on("click", f)) : (o(u, n), i.fadeIn(), r.off("click").on("click", p)), !1
        }

        function n(e, t) {
            var n = t.closest(h.opts.article),
                o = n.find(h.opts.ui);
            return t.addClass("playing"), e.play(), oak.support.isTouch ? i(t) : ($("video", t).removeAttr("controls"), t.find(h.opts.poster).fadeOut(), o.fadeOut(_.once(function() {
                n.one("mousemove.init", r)
            }))), e.state()
        }

        function i(e) {
            var t = $("video", e).get(0);
            return t ? ($(t).css({
                display: "block"
            }), t.addEventListener("webkitbeginfullscreen", function() {
                this.removeEventListener("webkitbeginfullscreen", arguments.callee), window.clearInterval(g)
            }), t.addEventListener("webkitendfullscreen", function() {
                this.removeEventListener("webkitendfullscreen", arguments.callee), $(t).css({
                    display: "none"
                });
                var n = e.closest(h.opts.article),
                    i = n.data("id"),
                    r = e.data("wistia"),
                    a = y[i][r.hashed_id];
                o(a, e)
            }), g = window.setInterval(function() {
                try {
                    t.webkitEnterFullscreen()
                } catch (e) {}
            }, 250), t.play(), void 0) : !1
        }

        function r() {
            if (!oak.support.isTouch) {
                var e = $(this),
                    t = e.find(h.opts.ui);
                t.fadeIn(), e.on("mousemove.idle", function() {
                    clearTimeout(m), m = setTimeout(function() {
                        t.fadeOut(_.once(function() {
                            e.off("mousemove.idle").one("mousemove.init", r)
                        }))
                    }, 1e3)
                })
            }
        }

        function o(e, t) {
            var n = t.closest(h.opts.article),
                i = n.find(h.opts.ui);
            return t.removeClass("playing").find(h.opts.poster).fadeIn(), e.pause(), clearTimeout(m), n.off("mousemove"), oak.support.isTouch || i.fadeIn(), e.state()
        }

        function a(e, t) {
            var n = t.closest(h.opts.article),
                i = n.find(h.opts.ui);
            if (t.removeClass("playing").find(h.opts.poster).fadeIn(), oak.support.isTouch) {
                var r = $("video", t).get(0);
                r.webkitExitFullscreen()
            }
            return clearTimeout(m), n.off("mousemove"), oak.support.isTouch || i.fadeIn(), e.state()
        }

        function s(e) {
            e.preventDefault();
            var t = $(this),
                i = t.closest(h.opts.video),
                r = i.closest(h.opts.article),
                a = r.data("id"),
                s = i.data("wistia"),
                u = y[a][s.hashed_id];
            if (_.isUndefined(u) || "unknown" === u.state()) return _.delay(function() {
                t.trigger("click")
            }, 250), !1;
            switch (u.state()) {
                case "ended":
                case "beforeplay":
                case "paused":
                    n(u, i);
                    break;
                case "playing":
                    o(u, i)
            }
            return !1
        }

        function u(e) {
            e.preventDefault();
            var t, n = $(this),
                i = n.closest(h.opts.article),
                r = i.data("id"),
                o = n.parent("li").index(),
                a = n.parent("li").siblings().andSelf().filter(".current").first().index();
            if (o > a) t = 1;
            else {
                if (!(a > o)) return !1;
                t = -1
            }
            return v[r].goToSlide(o), !1
        }

        function l() {
            var e = $(h.opts.article),
                t = e.first().outerWidth(),
                n = Math.ceil(.5625 * t),
                i = e.find(h.opts.embed);
            i.css({
                width: t,
                height: n,
                "margin-top": "",
                "margin-left": ""
            }), h.$els.$articles.css({
                height: n,
                minHeight: 0
            }), t > i.first().width() && i.css({
                width: t,
                height: n,
                "margin-top": Math.round((n - i.first().height()) / 2),
                "margin-left": ""
            })
        }

        function c(e, t) {
            var n = e.find(h.opts.grid_item);
            n.removeClass("active"), n.filter("[data-hashed-id='" + t.hashed_id + "']").addClass("active").closest(h.opts.grid_page).addClass("visible").siblings().removeClass("visible")
        }

        function d(e) {
            var t = $(e.slide),
                n = t.closest(h.opts.article),
                i = n.find(h.opts.ui),
                r = n.find(h.opts.video),
                o = n.find(h.opts.poster),
                s = n.data("id"),
                u = n.find(h.opts.dots),
                d = t.data("wistia");
            return t.hasClass("current") ? !1 : (t.addClass("current").siblings().removeClass("current"), u.eq(e.index).addClass("current").siblings().removeClass("current"), r.removeClass("playing").find(h.opts.embed).empty(), o.filter(":not(:visible)").fadeIn(), _.isUndefined(y[s][d.hashed_id]) || (y[s][d.hashed_id].remove(), delete y[s][d.hashed_id]), y[s][d.hashed_id] = Wistia.embed(d.hashed_id, h.opts.wistia), y[s][d.hashed_id].ready(function() {
                t.find("video").removeAttr("controls"), l()
            }), y[s][d.hashed_id].bind("end", _.bind(a, null, y[s][d.hashed_id], t)), clearTimeout(m), n.off("mousemove"), oak.support.isTouch || i.fadeIn(), c(n, d), !1)
        }

        function f(e) {
            e.preventDefault();
            var t = $(this).closest(h.opts.article),
                n = t.data("id"),
                i = t.find(h.opts.carousel),
                r = i.find(h.opts.video),
                o = r.filter(".current").index(),
                a = r.length - 1,
                s = $(this).hasClass("next") ? 1 : -1,
                u = o + s;
            return u > a ? u = 0 : 0 > u && (u = a), v[n].goToSlide(u, s), !1
        }

        function p(e) {
            e.preventDefault();
            var t = $(this).closest(h.opts.article),
                n = t.find(h.opts.grid_page),
                i = n.length - 1,
                r = n.filter(".visible").index(),
                o = r;
            return $(this).hasClass("back") ? (o -= 1, 0 > o && (o = i)) : $(this).hasClass("next") && (o += 1, o > i && (o = 0)), n.removeClass("visible").filter(":eq(" + o + ")").addClass("visible"), !1
        }
        var h = {};
        h.opts = {
            article: ".video-carousel",
            carousel: ".video-carousel-videos",
            video: ".video-carousel-video",
            embed: ".video-carousel-embed",
            poster: ".video-carousel-poster",
            grid_wrapper: ".video-grid-container",
            grid: ".video-carousel-grid",
            grid_item: ".video-carousel-grid-item",
            grid_page: ".video-carousel-grid-page",
            grid_button: ".video-carousel-grid-button",
            grid_close: ".close",
            arrows: ".carousel-controls-control",
            dots: ".page-dots > li",
            play_pause: ".video-carousel-play-pause",
            ui: ".video-ui",
            wistia: {
                chromeless: !0,
                fullscreenButton: !1,
                playButton: !1,
                smallPlayButton: !1,
                autoPlay: !1,
                playbar: !1,
                version: "v1",
                wmode: "opaque",
                platformPreference: "html5",
                videoQuality: oak.support.isTouch ? "auto" : "hd-only"
            }
        }, h.$els = {};
        var m, g, v = [],
            y = [];
        return h.init = function() {
            return h.$els.$articles = $(h.opts.article), h.$els.$carousels = h.$els.$articles.find(h.opts.carousel), h.$els.$articles.each(function(n) {
                var i = $(this),
                    r = i.find(h.opts.carousel);
                oak.support.isTouch && r.children(h.opts.video + ":gt(3)").remove();
                var o = r.find(h.opts.video),
                    a = i.find(h.opts.arrows),
                    l = i.find(h.opts.dots);
                oak.support.isTouch && l.filter(":gt(3)").remove();
                var c = r.find(h.opts.play_pause),
                    p = i.find(h.opts.grid_button),
                    m = i.find(h.opts.grid_close),
                    g = i.find(h.opts.grid_item);
                i.attr("data-id", n), v[n] = new mm.SlidingCarousel(r), v[n].on(v[n].events.transitionComplete, d), _.defer(function() {
                    d({
                        index: 0,
                        slide: o.first()
                    })
                }), y[n] = [], a.on("click", f), l.find("a").fastClick(u), c.on("click", s), p.add(m).on("click", t), g.on("click", e)
            }), $(window).off("resize.video-carousel").on("resize.video-carousel", _.throttle(l, 100)), !1
        }, h
    }(), mm.workbench = function() {
        "use strict";

        function e() {
            var e = i();
            N = 0, P.query = "?" + e.collection.join("&"), mm.router.navigate("browse" + P.query, {
                replace: !1
            }), mm.facade.trigger("route:update"), c({
                q: e.map
            })
        }

        function t() {
            var e = $(".track-item", w);
            M.length && (M.forEach(function(e) {
                e.destroy()
            }), M = []), e.each(function(e, t) {
                
            })
        }

        function n() {
            m.on("click", function(e) {
                e.preventDefault();
                var t;
                t = mm.isMobile ? $("ul.mobile li") : $(this).parent("ul").find("li").not($(this)), t.each(function(e, t) {
                    t = $(t);
                    var n = {
                        filter: t.attr("data-filter"),
                        id: t.attr("data-id"),
                        value: t.attr("data-val")
                    };
                    P.filters[n.filter].remove(n)
                }), $(this).parents(".searched-by").length || ($("nav.filter li a").removeClass("set"), $("ul li", p).removeClass("selected"))
            })
        }

        function i() {
            var e = [],
                t = {};
            for (var n in P.values) {
                var i = P.values[n],
                    r = [];
                i.length && (r = i.map(o), i = "mood" === n ? n + "=" + P.moodBucket + "+" + r.join("+") : "energy" === n ? n + "=" + r.join("|") : n + "=" + r.join("+"), t[n] = r, e.push(i))
            }
            return {
                collection: e,
                map: t
            }
        }

        function r() {
            var e = b.find(".mm-tracks-table-result-info").first();
            I = parseInt(e.attr("data-count"), 10), I > 14 ? k.addClass("available") : k.removeClass("available"), g.html(I)
        }

        function o(e) {
            return encodeURIComponent(e.value)
        }

        function a() {
            var e = !1;
            y.on("click", function(t) {
                t.preventDefault();
                var n = $(this).attr("href"),
                    i = $("#mm-filter-info", p);
                if (i.hasClass("showing")) e = !1, $(this).removeClass("active"), i.removeClass("showing"), $(n, i).removeClass("showing"), setTimeout(function() {
                    e || i.removeClass("visible")
                }, 150);
                else {
                    var r = 4;
                    e = !0, $(n, i).addClass("showing"), i.addClass("visible showing"), $(this).css("z-index", r).addClass("active")
                }
            })
        }

        function s() {
            var e = P.select.find(":selected").val();
            P.current("#" + e)
        }

        function u(e) {
            D = e;
            var t = i();
            c({
                q: t.map,
                order: D
            })
        }

        function l() {
            var e = document.location.search,
                t = {};
            return e ? (e = e.split("&"), e.forEach(function(e) {
                e = decodeURIComponent(e).replace(/^\?/, "");
                var n = e.match(/^[A-Za-z]+(?=\=)/)[0];
                if (n) {
                    var i = e.replace(n, "").replace(/\=/, "");
                    i = "energy" === n ? i.split("|") : i.split("+"), t[n] = i, P.filters[n].create(i)
                }
            }), A = !0, c({
                q: t
            }), void 0) : (A = !0, c(), void 0)
        }

        function c(e, t) {
            var n;
            e = e || {}, e = _.extend(e, {
                limit: 14,
                order: D
            }), t = t || "html", n = {
                params: e,
                method: t
            }, d(n)
        }

        function d(e) {
            P.spin(!0), mm.isMobile && mm.spin(!0), T && T.abort(), T = $.ajax({
                url: "/filter_tracks",
                data: e.params,
                success: function(n) {
                    w[e.method](n), t(), mm.facade.trigger("bypass"), P.spin(!1), mm.isMobile && mm.spin(!1), mm.isMobile && !e.params.offset && P.view(!1), e.params.offset || _.defer(r)
                }
            }).always(function() {
                T = null
            })
        }

        function f() {
            k.on("click", function(e) {
                e.preventDefault(), N += 14;
                var t = i(),
                    n = $("#mm-tracks-listing .track-item").length;
                n + 14 >= I && k.removeClass("available"), c({
                    q: t.map,
                    offset: N
                }, "append")
            })
        }
        var p, h, m, g, v, y, b, w, x, k, C, E, S, T, P = mm.EventEmitter(),
            A = !1,
            I = 0,
            N = 0,
            D = "listens_count DESC",
            M = [];
        return P.build = function() {
            p = $("#work-bench"), h = $(".bench", p), m = $(".clear-all", p).add('[data-action="clear-all"]'), g = p.find(".result-count .count"), y = $(".info", p), b = $("#mm-tracks-listing"), w = $("#mm-tracks-listing .mm-tracks-table-list"), x = $(".result-count .spinner-target", p), k = $(".mm-view-more"), C = $(".view-results"), E = mm.Sorter($(".mm-filter-sorter", p)), S = new mm.Spinner, mm.HoverConnect(y, p), $(".playing", b).removeClass(".playing"), v = $(".mm-filter", p), v.each(function(e, t) {
                var n = "Filter" + t.id.charAt(0).toUpperCase() + t.id.slice(1),
                    i = t.id;
                P.values[t.id] = [], t = mm[n]($(t)), P.filters[i] = t
            }), P.select = $("select#filter-select", p), P.select.off("change").on("change", s), C.off("click").on("click", function(e) {
                e.preventDefault(), P.view(!0)
            }), l(), n(), a(), f(), P.current("#mood"), mm.resizer.attach(P.filters.length.resize)
        }, P.filters = {}, P.moodBucket = "story", P.queue = [], P.select = null, P.values = {}, P.add = function(t, n) {
            return _gaq.push(["_trackEvent", "filter", t.filter, t.pretty]), n = "undefined" == typeof n ? !0 : n, P.values[t.filter].push(t), t.add(), n ? (n && A && e(), P) : P
        }, P.or = function(t, n) {
            return _gaq.push(["_trackEvent", "filter", t.filter, t.pretty]), n = "undefined" == typeof n ? !0 : n, P.values[t.filter].push(t), t.add(), n ? (n && A && e(), P) : P
        }, P.current = function(e) {
            var t = e.slice(1);
            return P.filters[t].current(), v.not(e).not("#search").each(function(e, t) {
                P.filters[t.id].inactive()
            }), y.attr("href", e), P
        }, P.insert = function(t, n) {
            var i = P.values[t.filter].indexOf(t);
            return -1 !== i ? (P.values[t.filter][i] = n, t.remove(), n.add(), A && e(), !0) : !1
        }, P.remove = function(t) {
            var n = P.values[t.filter].indexOf(t);
            return -1 !== n ? (P.values[t.filter].splice(n, 1), t.remove(), e(), !0) : !1
        }, P.removeAllFromFilter = function(t, n) {
            return n = "undefined" === n ? !0 : n, P.values[t].forEach(function(e) {
                e.remove()
            }), P.values[t] = [], n && e(), P
        }, P.replace = function(e, t) {
            return P.removeAllFromFilter(e), "function" == typeof t && t(), P
        }, P.spin = function(e) {
            return e ? (S.spin(x[0]), x.addClass("spinning")) : (S.stop(), x.removeClass("spinning")), P
        }, P.offLoad = function() {
            mm.resizer.detach(P.filters.length.resize), _.each(P.filters, function(e) {
                e.offLoad && e.offLoad()
            })
        }, P.view = function(e) {
            e ? (b.addClass("visible"), C.addClass("hidden")) : (b.removeClass("visible"), C.removeClass("hidden"))
        }, mm.facade.on("tracks:sort:filter", u), P
    }(), mm.desktopPlayer = function() {
        "use strict";

        function e() {
            var e = $(".track-item", a);
            e.each(function(e, t) {
                
            })
        }

        function t() {
            a.html(""), $.get("/tracks/history", function(t) {
                a.html(t), e()
            })
        }
        var n = mm.BasePlayer($("#player.desktop")),
            i = $(".close-history", n.$el),
            r = $(".close-stations", n.$el),
            o = $(".mm-history", n.$el),
            a = $(".mm-tracks-table-list", n.$el),
            s = $(".mm-stations", n.$el),
            u = $("#mm-player-stations-list", n.$el),
            l = n.injectPlaying;
        n.injectPlaying = function(e) {
            $(".mm-connect-right", n.$el).html(""), l(e), _.defer(n.resize)
        }, n.resize = function(e) {
            e = e || $("#container").outerWidth();
            var t = n.$scrubber.offset().left,
                i = n.$actionWrap.outerWidth(!0);
            n.streamWidth = e - t - i - 51, n.$trackStream.width(n.streamWidth), n.$trackDetails.width(n.streamWidth - 10), n.sizeBuffer(), n.sizeElapsed()
        }, n._buildCSS = function(e) {
            _.isUndefined(e) && (e = !0);
            var t, i, r = $(document.body).width(),
                o = r - mm.drawer.$shelf.width();
            e || n.$el.addClass("no-transition"), $("style[data-mm='desktop-player']").remove(), t = "#player.desktop { width: " + r + "px; }\n" + "body.pushed #player.desktop { width: " + o + "px; }", i = $("<style/>", {
                "data-mm": "desktop-player",
                type: "text/css"
            }).html(t), $("link, style", "head").last().after(i), _.defer(function() {
                n.$el.removeClass("no-transition")
            })
        };
        var c = n.init;
        return n.init = function() {
            c(), i.on("click", function(e) {
                e.preventDefault(), n.$el.removeClass("expanded")
            }), o.on("click", function(e) {
                e.preventDefault(), n.$el.hasClass("expanded") ? n.$el.removeClass("expanded") : (r.trigger("click"), n.$el.addClass("expanded"), t())
            }), r.on("click", function(e) {
                e.preventDefault(), n.$el.removeClass("expanded-stations")
            }), s.on("click", function(e) {
                e.preventDefault(), n.$el.hasClass("expanded-stations") ? n.$el.removeClass("expanded-stations") : (i.trigger("click"), n.$el.addClass("expanded-stations"))
            }), mm.HoverConnect($("a", o), n.$deck), mm.HoverConnect($("a", s), n.$deck), n._buildCSS(), n.resize()
        }, n
    }(), mm.facade.on("app:ready", mm.desktopPlayer.init), mm.registerConfirmation = function() {
        var e = mm.Page();
        return e.init = function() {
            e.ps.$el = $("#mm-session.register-confirmation"), e.ps.form = mm.ProfileForm($("#edit-profile", e.ps.$el), !1)
        }, e
    }(), mm.facade.on("app:ready", function() {
        $("#mm-session.register-confirmation").length && mm.registerConfirmation.init()
    }), mm.drawer = function() {
        "use strict";
        var e = mm.EventEmitter();
        return e._callbacks = [], e.$container = $("#container"), e.$el = $("#mm-drawer"), e.$header = $("header[role=main]"), e.$menuAnchor = $("nav[role=main].mobile .menu"), e.$playerAnchor = $("nav[role=main].mobile .player"), e.desktopNav = "#mm-drawer-nav.desktop", e.$desktopNav = $(e.desktopNav), e.$nav = $("#mm-drawer-nav.desktop nav"), e.$navMobile = $("nav[role=drawer]", e.$el), e.$navMobileGuestLinks = $("li.guest", e.$navMobile), e.$navMobileLinks = $("a", e.$navMobile), e.$navMobileUserLinks = $("li.user", e.$navMobile), e.$navGuestLinks = $("li.guest", e.$nav), e.$navLinks = $("a", e.$nav), e.$navUserLinks = $("li.user", e.$nav), e.$shelf = $(".mm-drawer-shelf", e.$el), e.$shelfDrawerNavInternal = $(".mm-drawer-nav-internal", e.$shelf).first(), e.$shelfDrawerWrap = $(".mm-drawer-wrap", e.$shelf).first(), e.$shelfClose = $(".close", e.$shelf), e.$shelfNavAnchor = $("a.nav", e.$shelf), e.$shelfNavAnchorLinks = $("nav[role=main] > ol > li > a", e.$el), e.spinner = new mm.Spinner, e.$target = $("#drawer-target"), e.delay = !1, e.pushed = !1, e.pushing = !1, e.userOrGuest = mm.user.isLoggedIn() ? "user" : "guest", e.init = function() {
            e._callbacks = [], e.$container = $("#container"), e.$el = $("#mm-drawer"), e.$header = $("header[role=main]"), e.$menuAnchor = $("nav[role=main].mobile .menu"), e.$playerAnchor = $("nav[role=main].mobile .player"), e.desktopNav = "#mm-drawer-nav.desktop", e.$desktopNav = $(e.desktopNav), e.$nav = $("#mm-drawer-nav.desktop nav"), e.$navMobile = $("nav[role=drawer]", e.$el), e.$navMobileGuestLinks = $("li.guest", e.$navMobile), e.$navMobileLinks = $("a", e.$navMobile), e.$navMobileUserLinks = $("li.user", e.$navMobile), e.$navGuestLinks = $("li.guest", e.$nav), e.$navLinks = $("a", e.$nav), e.$navUserLinks = $("li.user", e.$nav), e.$shelf = $(".mm-drawer-shelf", e.$el), e.$shelfDrawerNavInternal = $(".mm-drawer-nav-internal", e.$shelf).first(), e.$shelfDrawerWrap = $(".mm-drawer-wrap", e.$shelf).first(), e.$shelfClose = $(".close", e.$shelf), e.$shelfNavAnchor = $("a.nav", e.$shelf), e.$shelfNavAnchorLinks = $("nav[role=main] > ol > li > a", e.$el), e.$target = $("#drawer-target"), e.delay = !1, e.pushed = !1, e.spinner = new mm.Spinner, e.userOrGuest = mm.user.isLoggedIn() ? "user" : "guest", mm.drawerCartPage = mm.DrawerCartPage(), mm.drawerCartbenchPage = mm.DrawerCartbenchPage(), mm.drawerCustomizePage = mm.DrawerCustomizePage(), mm.drawerLoginPage = mm.DrawerLoginPage(), mm.drawerMixbenchPage = mm.DrawerMixbenchPage(), mm.drawerMixtapesPage = mm.DrawerMixtapesPage(), mm.drawerNavPage = mm.DrawerNavPage(), mm.drawerRegisterPage = mm.DrawerRegisterPage(), mm.drawerNewsletterPage = mm.DrawerNewsletterPage(), e.trigger("calc"), e._buildCSS(), e.bindEvents(), e.close()
        }, e._buildCSS = function() {
            $("style[data-mm='drawer']").remove();
            var t, n, i, r;
            e.$container.hasScrollBar() ? (i = e.$shelf.width() + window.scrollBarWidth(), r = window.scrollBarWidth()) : (i = e.$shelf.width(), r = 0), e.$desktopNav.addClass("no-transition"), t = e.desktopNav + " { right: " + r + "px; }\n" + "body.pushed " + e.desktopNav + " { right: " + i + "px; }", n = $("<style/>", {
                "data-mm": "drawer",
                type: "text/css"
            }).html(t), $("link, style", "head").last().after(n), _.defer(function() {
                e.$desktopNav.removeClass("no-transition")
            })
        }, e.on("calc", function() {}), e.bindEvents = function() {
            e.$navLinks.add(e.$navMobileLinks).on("click", function(t) {
                t.preventDefault();
                var n = $(this).attr("href").replace(/^#/, "");
                return "account" === n ? mm.router.navigate("/account", {
                    trigger: !0
                }) : (e._current(n), e.setState(n), e.delay = !1, void 0)
            }), e.$navLinks.hover(function() {
                e.$navLinks.not($(this)).addClass("faded")
            }, function() {
                e.$navLinks.not($(this)).removeClass("faded")
            }), e.$shelfClose.on("click", function(t) {
                t.preventDefault(), e.delay = !0, e.setState(e.userOrGuest)
            }), e.$menuAnchor.off("click").on("click", function(t) {
                t.preventDefault(), $(document.body).hasClass("pushed") ? e.close() : e.setState("nav")
            }), e.$playerAnchor.on("click", function(t) {
                t.preventDefault(), e.setState("nav")
            }), e.$shelfNavAnchor.on("click", function(t) {
                t.preventDefault(), e.setState("nav")
            }), e.$shelfNavAnchorLinks.on("click", function(t) {
                return $(this).attr("data-external") ? !0 : (t.preventDefault(), e.close(), void 0)
            })
        }, e.close = function(t) {
            e.userOrGuest = mm.user.isLoggedIn() ? "user" : "guest", e.delay = !0, e.setState(e.userOrGuest), "function" == typeof t && e._checkDelay(t)
        }, e._checkDelay = function(t) {
            return "function" != typeof t ? !1 : e.delay && "function" == typeof t ? (e._callbacks.push(t), !0) : (t(), !1)
        }, e._current = function(t) {
            e.$navLinks.removeClass("over").filter('[href="#' + t + '"]').addClass("over")
        }, e._pull = function() {
            return e.pushed ? ($(document.body).removeClass("pushed"), e.$el.removeClass("viewing"), e.$shelf.removeClass("onscreen"), e.$navLinks.removeClass("over"), e.pushed = !1, $("#container").off("click"), e.$container[0].addEventListener(oak.support.transitionEnd, function t() {
                mm.desktopPlayer.resize();
                for (var n; n = e._callbacks.shift();) n();
                e.$container[0].removeEventListener(oak.support.transitionEnd, t)
            }), !0) : !1
        }, e._push = function() {
            e.pushing = !0;
            var t = !1;
            return oak.support.isTouch && e.trigger("calc"), e.pushed || ($(document.body).addClass("pushed"), e.$el.addClass("viewing"), e.$shelf.addClass("onscreen"), e.pushed = !0, e.$container[0].addEventListener(oak.support.transitionEnd, function n() {
                var t = $("#container").outerWidth() - 339;
                mm.desktopPlayer.resize(t), e.$container[0].removeEventListener(oak.support.transitionEnd, n)
            }), _.defer(function() {
                $("#container").on("click", function() {
                    e.pushing || mm.drawer.trigger("close")
                })
            }), t = !0), _.defer(function() {
                e.pushing = !1, e.delay = !1
            }), t
        }, e._render = function() {
            $.get("/render_drawer").done(function(t) {
                e.$target.html(t), e.init()
            })
        }, e.spin = function(t) {
            t ? (e.spinner.spin(e.$shelfClose[0]), e.$shelfClose.addClass("spinning")) : (e.spinner.stop(), e.$shelfClose.removeClass("spinning"))
        }, e.states = {
            onGuest: function() {
                e.$navGuestLinks.add(e.$navMobileGuestLinks).removeClass("hidden"), e.$navUserLinks.add(e.$navMobileUserLinks).addClass("hidden"), e._pull()
            },
            onUser: function() {
                e.$navGuestLinks.add(e.$navMobileGuestLinks).addClass("hidden"), e.$navUserLinks.add(e.$navMobileUserLinks).removeClass("hidden"), e._pull()
            },
            onCart: function() {
                mm.drawerCartPage.show(), e._push()
            },
            offCart: function() {
                e._checkDelay(mm.drawerCartPage.hide)
            },
            onCartbench: function(t, n) {
                mm.drawerCartbenchPage.show(t, n), e._push()
            },
            offCartbench: function() {
                e._checkDelay(mm.drawerCartbenchPage.hide)
            },
            onCustomize: function(t) {
                mm.drawerCustomizePage.show(t), e._push()
            },
            offCustomize: function() {
                e._checkDelay(mm.drawerCustomizePage.hide)
            },
            onLogin: function() {
                mm.drawerLoginPage.show(), e._push(), mm.user.once("logged_in", function() {
                    /order\/[0-9]*/.test(Backbone.history.fragment) ? e.close(function() {
                        mm.router.navigate("/account", {
                            trigger: !0,
                            replace: !0
                        })
                    }) : e.close(function() {
                        mm.facade.trigger("refresh")
                    })
                })
            },
            offLogin: function() {
                e._checkDelay(mm.drawerLoginPage.hide)
            },
            onLogout: function() {
                mm.user.logout(e.close), mm.user.once("logged_out", function() {
                    "account" === Backbone.history.fragment ? mm.router.navigate("/", {
                        trigger: !0,
                        replace: !0
                    }) : /order\/[0-9]*/.test(Backbone.history.fragment) ? mm.router.navigate("/", {
                        trigger: !0,
                        replace: !0
                    }) : mm.facade.trigger("refresh")
                })
            },
            onMixbench: function(t) {
                mm.drawerMixbenchPage.show(t), e._push()
            },
            offMixbench: function() {
                e._checkDelay(mm.drawerMixbenchPage.hide)
            },
            onMixtapes: function() {
                mm.drawerMixtapesPage.show(), e._push()
            },
            offMixtapes: function() {
                e._checkDelay(mm.drawerMixtapesPage.hide)
            },
            onNav: function() {
                mm.drawerNavPage.show(), e._push()
            },
            offNav: function() {
                e._checkDelay(mm.drawerNavPage.hide)
            },
            onRegister: function() {
                mm.drawerRegisterPage.show(), e._push()
            },
            offRegister: function() {
                e._checkDelay(mm.drawerRegisterPage.hide)
            },
            onSubscribe: function() {
                mm.drawerNewsletterPage.show(), e._push()
            },
            offSubscribe: function() {
                e._checkDelay(mm.drawerNewsletterPage.hide)
            }
        }, mm.facade.on("refresh", e._render), mm.facade.on("desktop mobile", e.close), e.on("cart", function() {
            e.setState("cart")
        }), e.on("cart:add", function(t, n) {
            n = "undefined" == typeof n ? !1 : n, e.setState("cartbench", t, n), _gaq.push(["_trackEvent", "order", "cart", "add", t.id])
        }), e.on("checkNav", function(t) {
            e._current(t)
        }), e.on("close", function(t) {
            t = t || void 0, e.close(t)
        }), e.on("customize", function(t) {
            e.setState("customize", t)
        }), e.on("mixtapes", function() {
            e.setState("mixtapes")
        }), e.on("mixtape:add", function(t) {
            return mm.user.isLoggedIn() ? (e.setState("mixbench", t), void 0) : !1
        }), e.on("register", function() {
            e.setState("register")
        }), e.on("login", function() {
            e.setState("login")
        }), e.on("subscribe", function() {
            e.setState("subscribe")
        }), e.on("share:track", function(t) {
            e.setState("share")
        }), e
    }(), mm.facade.on("app:ready", mm.drawer.init), mm.DrawerCartPage = function() {
        function e() {
            var e = _.template(h, mm.cart.order),
                n = mm.cart.order.promo_code && mm.cart.order.promo_code.name;
            n = n ? n : "";
            var i = _.template(p, {
                    label: "Promotions",
                    value: n + " -" + mm.format.numberToCurrency(mm.cart.order.discount)
                }),
                r = _.template(p, {
                    label: "Subtotal",
                    value: mm.format.numberToCurrency(mm.cart.order.price)
                }),
                o = _.template(p, {
                    label: "Total",
                    value: mm.format.numberToCurrency(mm.cart.order.total)
                });
            mm.cart.order.promo_code || (i = ""), mm.cart.order.line_items.length > 0 ? (d.html(e), c.html(r), f.html(o), l.html(i), u.html(t(mm.cart.order.line_items.length, "Item")), s.attr("href", "/order/" + mm.cart.order.id), s.show(), c.show(), f.show(), l.show(), u.show()) : (d.html("<p>Your cart is empty!</p>"), c.hide(), f.hide(), l.hide(), u.hide(), s.hide()), a.rebuild(), mm.drawer.spin(!1)
        }

        function t(e, t) {
            return e > 1 || 0 === e ? e + " " + t + "s" : e + " " + t
        }

        function n(t, n) {
            var i = {
                id: mm.cart.order.id,
                line_item: t
            };
            mm.drawer.spin(!0), $.post("/remove-line", i).done(function() {
                oak.strap($(n).parent("li")[0]).transition({
                    opacity: 0,
                    height: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    duration: 400,
                    timing: oak.timing.easeOutQuad,
                    onComplete: function() {
                        $(this).remove(), mm.cart.hydrate(e)
                    }
                })
            }).fail(function() {
                console.log("fail")
            })
        }
        var i, r, o, a = mm.DrawerPage($(".mm-drawer-wrap #cart")),
            s = $("a.checkout", a.$el),
            u = $(".count", a.$el),
            l = $(".totals .promotions", a.$el),
            c = $(".totals .subtotal", a.$el),
            d = $(".mm-cart-target", a.$el),
            f = $(".totals .total", a.$el),
            p = '<span class="left"><%= label %></span><span class="right"><%= value %></span>',
            h = '<% _.each(line_items, function (item) { %><li><div class="row top"><span class="title"><%= item.track.title %></span><span class="price"><%= mm.format.numberToCurrency(item.price) %></span></div><div class="row bottom"><span class="artist"><%= item.track.artist.name %></span><a data-prevent-default data-action="replace" data-id="<%= item.id %>" data-track-id="<%= item.track.id %>" class="license"><%= item.license.name %></a></div><a data-prevent-default data-action="remove" data-id="<%= item.id %>"></a></li><% }); %>',
            m = a.rebuild;
        a.rebuild = function() {
            m(), i = $("[data-action=remove]", a.$el), r = $("[data-action=replace]", a.$el), i.on("click", function(e) {
                e.preventDefault(), e.stopImmediatePropagation();
                var t = $(this).attr("data-id");
                n(t, this)
            }), r.on("click", function(e) {
                e.preventDefault(), e.stopImmediatePropagation(), o = $(this).attr("data-id"), mm.drawer.trigger("cart:add", $(this).attr("data-track-id"), !0)
            }), s.on("click", function() {
                mm.drawerProxy.trigger("close")
            })
        };
        var g = a.show;
        return a.show = function() {
            return e(), g(), a
        }, a.remove = function(e, t) {
            $.post("/remove-line", {
                id: mm.cart.order.id,
                line_item: e
            }).done(t)
        }, mm.drawer.on("cart:remove", function(e) {
            "function" != typeof e && (e = function() {}), _gaq.push(["_trackEvent", "order", "cart", "remove", o]), a.remove(o, e)
        }), a
    }, mm.DrawerCartbenchPage = function() {
        "use strict";

        function e(e) {
            mm.drawer.spin(!0), $.get("/tracks/licenses/" + s).done(function(t) {
                l.$el.html(t), l.rebuild(), mm.drawer.spin(!1), "function" == typeof e && e()
            })
        }

        function t() {
            var e = {
                line_item: {
                    track_id: s,
                    license_id: a
                }
            };
            mm.drawer.spin(!0), c ? mm.drawer.trigger("cart:remove", function() {
                n(e)
            }) : n(e)
        }

        function n(e) {
            $.post("/add-to-cart", e).done(function() {
                mm.user.cart.hydrate(function() {
                    mm.drawer.spin(!1), mm.drawer.delay = !1, mm.drawerProxy.trigger("cart")
                })
            }).fail(function(e) {
                console.error(e)
            })
        }
        var i, r, o, a, s, u, l = mm.DrawerPage($(".mm-drawer-wrap #cartbench")),
            c = !1,
            d = l.hide;
        l.hide = function() {
            return s = null, a = null, c = !1, d(), _.isUndefined(i) || i.reset(), l
        };
        var f = l.rebuild;
        l.rebuild = function() {
            f(), r = $("[data-bucket-targ]", l.$el), o = $(".license", r);
            var e = $(".local-nest", l.$el);
            return l.$nestLinks.on("click", function(e) {
                e.preventDefault();
                var t = $(this).attr("data-bucket"),
                    n = $('[data-bucket-targ="' + t + '"]', l.$el);
                r.not(n).removeClass("active"), n.addClass("active")
            }), e.on("click", function(e) {
                e.preventDefault();
                var t = $(this).attr("href").replace(/^#/, "");
                mm.drawer.delay = !1, mm.drawer.setState(t)
            }), o.on("click", function(e) {
                e.preventDefault(), a = $(this).attr("data-license-id"), o.off("click"), t();
                var n = $(this).data("license-name"),
                    i = u && _.has(u, "display_name") ? u.display_name : "";
                _gaq.push(["_trackEvent", "Track", "License", i, n])
            }), l
        };
        var p = l.show;
        return l.show = function(t, n) {
            return c = n, t && _.has(t, "id") && (u = t, s = t.id, e(function() {
                i = mm.DrawerForm($(".mm-drawer-form", l.$el), {
                    url: "/tracks/" + s + "/customize_license",
                    type: "POST",
                    empty: !0
                }), i.reset(), i.$inputs.on("focus", function() {
                    var e = this;
                    $(e).on("keydown keyup", function() {
                        e.value.length > 0 ? i.$submit.addClass("available").removeAttr("disabled") : i.$submit.removeClass("available").attr("disabled", !0)
                    })
                })
            })), p(), l
        }, l
    }, mm.DrawerCustomizePage = function() {
        "use strict";
        var e, t = mm.DrawerPage($(".mm-drawer-wrap #customize")),
            n = mm.DrawerForm($(".mm-drawer-form", t.$el), {
                type: "POST",
                empty: !0
            }),
            i = t.hide;
        t.hide = function() {
            i(), n.reset()
        };
        var r = t.show;
        return t.show = function(i) {
            r(), e = i, n.reset(), n.options.url = "/tracks/" + e + "/customize", n.off("submit").on("submit", n.submit), t.resize()
        }, t
    }, mm.DrawerLoginPage = function() {
        var e = mm.DrawerPage($(".mm-drawer-wrap #login")),
            t = mm.DrawerForm($(".mm-drawer-form.forgot-form", e.$el), {
                url: "/account/reset_password",
                type: "POST",
                empty: !1
            }),
            n = mm.DrawerForm($(".mm-drawer-form.login", e.$el), {}),
            i = $(".register", e.$el);
        e.$message = $(".message", e.$el), i.on("click", function(e) {
            e.preventDefault(), mm.drawerProxy.trigger("checkNav", "register"), mm.drawerProxy.trigger("register")
        }), n.handleErrors = function() {
            return n.$errors.addClass("display"), n
        }, n.handleSuccess = function() {
            return n.$errors.removeClass("display"), n.$success.addClass("display"), n.$hides.addClass("hide"), n.$form.addClass("success"), setTimeout(function() {
                mm.drawerProxy.trigger("close")
            }, 1e3), _gaq.push(["_trackEvent", "Account", "Login", "User Logs In"]), n
        }, n.reset = function() {
            return mm.isMobile ? n.$inputs.removeClass("invalid") : n.$inputs.removeClass("invalid").first().focus(), n.$errors.removeClass("display"), n.$success.removeClass("display"), n.$hides.removeClass("hide"), n.$form.removeClass("success"), n.$form[0].reset(), n
        }, n.submit = function(e) {
            e.preventDefault(), n.spin(!0);
            var t = n.$inputs.filter('[name="email"]').val(),
                i = n.$inputs.filter('[name="password"]').val();
            return mm.user.login(t, i).done(n.handleSuccess).fail(n.handleFail).always(n.complete), n
        }, n.$form.off("submit").on("submit", n.submit);
        var r = e.hide;
        e.hide = function() {
            r(), n.reset(), t.reset(), e.notifyReset()
        };
        var o = e.show;
        return e.show = function() {
            o(), n.reset(), t.reset()
        }, e.notify = function(t) {
            e.$message.html(t || "").addClass("display")
        }, e.notifyReset = function() {
            e.$message.empty().removeClass("display")
        }, e
    }, mm.DrawerMixbenchPage = function() {
        "use strict";

        function e() {
            f.prop("checked", !1), c.blur().val("")
        }

        function t() {
            return a = $("li[data-mixtape-id]", u.$el), f.off("change").on("change", function() {
                var e = $(this).is(":checked") ? "public" : "secret";
                $("> label", l).removeClass("hidden"), $("> label." + e, l).addClass("hidden")
            }), a.on("click", function(e) {
                e.preventDefault();
                var t = $(this).attr("data-mixtape-id");
                m.spin(h), d.attr("disabled", !0), l.addClass("processing"), $.ajax({
                    url: "/mixtapes/" + t + "/add/" + s,
                    success: r
                }), _gaq.push(["_trackEvent", "mixtape", "add track"])
            }), c.on("keyup keydown", function() {
                "" !== this.value ? p.removeAttr("disabled") : p.attr("disabled", !0)
            }), u
        }

        function n(e) {
            console.error(e)
        }

        function i(t) {
            if (t.preventDefault(), "" === c.val()) return !1;
            var i, o = {
                name: c.val(),
                secret: f.is(":checked")
            };
            s && (o.track = s), c.off("keyup keydown"), i = mm.Mixtape(o), m.spin(h), d.attr("disabled", !0), l.addClass("processing"), mm.user.mixtapes.add(i), i.create().done(r).fail(n).always(e)
        }

        function r() {
            m.stop(), d.removeAttr("disabled"), l.removeClass("processing"), s = void 0, a.off("click"), mm.drawer.delay = !1, mm.drawerProxy.trigger("mixtapes")
        }

        function o() {
            $.ajax({
                url: "/mixtapes",
                data: {
                    style: "benchlist"
                },
                success: function(e) {
                    $(".list", u.$el).html(e), t()
                }
            })
        }
        var a, s, u = mm.DrawerPage($(".mm-drawer-wrap #mixbench")),
            l = $("form", u.$el),
            c = $("input[type=text]", l),
            d = $("input", l),
            f = $("input#privacy", l),
            p = $("button[type=submit]", l),
            h = $("button", l).parent("div")[0],
            m = new mm.Spinner;
        l.on("submit", i), p.attr("disabled", !0);
        var g = u.show;
        return u.show = function(e) {
            o(), g(), s = e
        }, t()
    }, mm.DrawerMixtapesPage = function() {
        "use strict";

        function e() {
            return d = $("li[data-mixtape-id]", f.$el), c = $(".list ul", f.$el), l = d.find("a.title"), p = $("form", f.$el), l.on("click", function(e) {
                e.preventDefault(), mm.drawerProxy.trigger("close")
            }), d.each(function() {
                var e = $(this).data("mixtape-id");
                if ("undefined" == typeof mm.user.mixtapes.find_by("id", e)) {
                    var t = mm.Mixtape();
                    t.attributes.id = e, mm.user.mixtapes.add(t)
                }
            }), $(".no-mixtapes a").click(function(e) {
                e.preventDefault(), mm.drawer.trigger("close")
            }), d.length > 1 ? c.sortable({
                handle: "[data-action=drag]",
                axis: "y",
                start: a,
                stop: s,
                update: u
            }) : d.addClass("no-sort"), p.length && t(), mm.facade.trigger("bypass"), f
        }

        function t() {
            h = $("input[type=text]", p), m = $('textarea[name="description"]', p), g = $("input#privacy", p), v = $("button", p), p.on("submit", i), v.attr("disabled", !0), g.removeAttr("checked"), h.blur().val(""), g.off("change").on("change", function() {
                var e = $(this).is(":checked") ? "public" : "secret";
                $("> label", p).removeClass("hidden"), $("> label." + e, p).addClass("hidden")
            }), h.on("keyup keydown", function() {
                "" !== this.value ? v.removeAttr("disabled") : v.attr("disabled", !0)
            })
        }

        function n(e) {
            console.error(e)
        }

        function i(e) {
            if (e.preventDefault(), !y) {
                if (y = !0, mm.drawer.spin(!0), "" === h.val()) return !1;
                var t, i = {
                    name: h.val(),
                    description: m.val(),
                    secret: g.is(":checked")
                };
                _gaq.push(["_trackEvent", "mixtape", "create", i.name]), h.off("keyup keydown"), t = mm.Mixtape(i), w.spin(b[0]), $("input", p).attr("disabled", !0), p.addClass("processing"), mm.user.mixtapes.add(t), t.create().done(r).fail(n)
            }
        }

        function r() {
            y = !1, w.stop(), $("input", p).removeAttr("disabled"), p.removeClass("processing"), o("full")
        }

        function o(t) {
            t = t || "list", $.ajax({
                url: "/mixtapes",
                data: {
                    style: t
                },
                success: function(n) {
                    mm.drawer.spin(!1), "list" === t ? $(".list", f.$el).html(n) : "full" === t && (f.$el.find(".root").html(n), f.resize()), e()
                }
            })
        }

        function a(e, t) {
            t.item.addClass("dragging")
        }

        function s(e, t) {
            t.item.removeClass("dragging")
        }

        function u(t, n) {
            var i = n.item.index() + 1,
                r = parseInt(n.item.attr("data-mixtape-id"), 10),
                o = mm.user.mixtapes.find_by("id", r);
            o.update({
                position: i
            }, !0), n.item.removeClass("dragging"), e(), _gaq.push(["_trackEvent", "mixtape", "sort"])
        }
        var l, c, d, f = mm.DrawerPage($(".mm-drawer-wrap #mixtapes")),
            p = $("form", f.$el),
            h = $("input[type=text]", p),
            m = $('textarea[name="description"]', p),
            g = $("input#privacy", p),
            v = $("button", p),
            y = !1,
            b = $("button", p).parent("div"),
            w = new mm.Spinner,
            x = f.show;
        return f.show = function() {
            o("full"), x()
        }, e()
    }, mm.DrawerNavPage = function() {
        "use strict";
        var e = mm.DrawerPage($(".mm-drawer-wrap #nav"));
        return e.showNested = function() {}, e
    }, mm.DrawerNewsletterPage = function() {
        var e, t;
        return e = mm.DrawerPage($(".mm-drawer-wrap #subscribe")), t = mm.DrawerForm($(".mm-drawer-form", e.$el), {
            url: "/newsletter",
            type: "POST"
        }), e
    }, mm.DrawerRegisterPage = function() {
        function e() {
            _gaq.push(["_trackEvent", "Account", "Register", "Account Registered"]), _gaq.push(["_trackEvent", "user", "register"]), n.off("form:success", e)
        }
        var t = mm.DrawerPage($(".mm-drawer-wrap #register")),
            n = mm.DrawerForm($(".mm-drawer-form", t.$el), {
                url: "/register",
                type: "POST",
                empty: !0
            });
        n.on("form:success", e);
        var i = t.hide;
        t.hide = function() {
            i(), n.reset()
        };
        var r = t.show;
        return t.show = function() {
            r(), n.reset()
        }, t
    }, $("#newsletter").click(function() {
        $("#newsletter").prop("checked") ? $(this).val("true") : $(this).val("false")
    }), mm.messageCenter = function() {


        var n = mm.EventEmitter();
        return n.init = function() {
            return n.$el = $("#message-center"), n.__el = oak.strap(n.$el[0]), n.$close = $(".close", n.$el), n.$cover = $(".cover", n.$el), n.$target = $(".target", n.$el), n.$close.on("click", function(e) {
                e.preventDefault(), n.close()
            }), n.$cover.on("click", function(e) {
                e.preventDefault(), n.close()
            }), n
        }, n.queue = [], n.close = function() {
            n.$el.addClass("hiding").removeClass("showing"), n.$el[0].addEventListener(oak.support.transitionEnd, function e() {
                n.$el.removeClass("hiding"), n.$el[0].className = "", n.$close[0].className = "close", n.$target.html(""), n.$el[0].removeEventListener(oak.support.transitionEnd, e)
            }, !1)
        }, n.read = function(t) {
            "undefined" != typeof t && (n.queue.push(t), e())
        }, n
    }(), mm.facade.on("app:ready", mm.messageCenter.init), mm.mobilePlayer = function() {
        "use strict";

        function e() {
            t.isState("playing") ? t.pause() : t.isState("paused") && t.play()
        }
        var t = mm.BasePlayer($("#player.mobile")),
            n = t.init;
        t.init = function() {
            n(), t.streamWidth = t.$trackStream.width(), t.sizeBuffer(), t.sizeElapsed(), $("nav[role=main] .player-toggle").off("click").on("click", e)
        }, t._onCanplay = function() {
            mm.spin(!1), t.$playButton.removeClass("spinning"), t.audio.play()
        };
        var i = t.states.onPlaying;
        t.states.onPlaying = function() {
            i(), t.$el.add(t.$el.parents("li.player")).addClass("expanded"), $("nav[role=main] .hamburger").addClass("music-playing"), $("nav[role=main]").removeClass("paused"), $("nav[role=main]").addClass("playing")
        };
        var r = t.states.onPaused;
        t.states.onPaused = function() {
            r(), $("nav[role=main] .hamburger").removeClass("music-playing"), $("nav[role=main]").removeClass("playing"), $("nav[role=main]").addClass("paused")
        };
        var o = t.states.onIdle;
        return t.states.onIdle = function() {
            o(), $("nav[role=main]").removeClass("playing paused")
        }, t
    }(), mm.facade.on("app:ready", mm.mobilePlayer.init), mm.accountPage = function() {
        "use strict";

        function e(e) {
            e.preventDefault();
            var t = window.confirm("Are you sure? Your account will be deleted forever!");
            return t && $.post("/account/cancel").done(function() {
                mm.user.logout(), mm.router.navigate("/", {
                    trigger: !0
                }), _gaq.push(["_trackEvent", "account", "cancel"])
            }), !1
        }

        function t(e) {
            var t = e.find("button[type=submit]"),
                n = t.parent("div")[0];
            e.addClass("processing"), t.prop("disabled", !0), r.ps.spinner.spin(n)
        }

        function n(e, t) {
            var n = e.find("button[type=submit]");
            e.removeClass("processing"), n.prop("disabled", !1), r.ps.spinner.stop(), t && e.find("input").val("")
        }

        function i(e) {
            e.preventDefault();
            var i = r.ps.resetForm.serialize(),
                o = $("#reset-errors", r.ps.$el),
                a = $("#reset-success", r.ps.$el);
            return o.add(a).html(""), t(r.ps.resetForm), $.post("/account/update_password", i).done(function(e) {
                if (e.success && e.message) a.append($("<p/>").text(e.message));
                else {
                    var t = e.errors;
                    for (var n in t) t[n].forEach(function(e) {
                        var t = $("<p/>").text("Password " + e);
                        o.append(t)
                    });
                    if (!t && e.message) {
                        var i = $("<p/>").text(e.message);
                        o.append(i)
                    }
                }
            }).fail(function(e) {
                if (!e.success && e.errors) {
                    var t = e.errors;
                    for (var n in t) t[n].forEach(function(e) {
                        var t = $("<p/>").text(e);
                        o.append(t)
                    })
                }
            }).always(function() {
                n(r.ps.resetForm, !0)
            }), !1
        }
        var r = mm.Page();
        return r.init = function() {
            r.ps.$el = $("#mm-account"), r.ps.editForm = mm.ProfileForm($("#edit-profile", r.ps.$el)), r.ps.resetForm = $("#reset-password form", r.ps.$el), r.ps.cancelForm = $("#cancel-account form", r.ps.$el), r.ps.mixtapeAnchor = $('.anchors a[href="#mixtapes"]', r.ps.$el), r.ps.spinner = new mm.Spinner;
            var t = $("select", r.ps.$el),
                n = ($("option", t), $("input:checkbox", r.ps.cancelForm));
            return r.ps.resetForm.on("submit", i), r.ps.cancelForm.on("submit", e), n.change(function() {
                var e = $(this);
                e.attr("checked") ? (e.attr("checked", !1), r.ps.cancelForm.find("button").attr("disabled", !0)) : (e.attr("checked", !0), r.ps.cancelForm.find("button").removeAttr("disabled"))
            }), r.ps.mixtapeAnchor.on("click", function(e) {
                e.preventDefault(), mm.drawer.setState("mixtapes")
            }), r
        }, r
    }(), mm.facade.on("app:ready", function() {
        $("#mm-account").length && mm.accountPage.init()
    }), mm.artistPage = function() {
        "use strict";

        function e() {
            var e = $("#mm-artist-landing h2 a", u.ps.$el);
            e.each(function(e, t) {
                var n = $(t).attr("data-genre");
                n = "/browse?genres=" + encodeURIComponent(n), t.setAttribute("href", n)
            })
        }

        function t() {
            var e = $(".staff-picks .track-item", u.ps.$el);
            e.each(function(e, t) {
               
            });
            var t = $(".discog .track-item", u.ps.$el);
            t.each(function(e, t) {
                
            })
        }

        function n() {
            var e = parseInt($(".discog .mm-tracks-table-result-info").attr("data-count"), 10);
            0 === l && (e > 14 ? u.ps.viewMore.addClass("available") : u.ps.viewMore.removeClass("available")), l = e
        }

        function i(e, n) {
            e = e || "html", n = _.extend({
                order: f,
                offset: d,
                limit: c,
                cache_tag: u.ps.cache_tag
            }, n), $.ajax({
                url: "/artists/" + u.ps.slug + "/tracks",
                data: n,
                success: function(n) {
                    s[e](n), $(".mm-connect-right").add(".mm-connect-left").html(""), t()
                }
            })
        }

        function r() {
            var e = $(".discog .track-item", u.ps.$el).length,
                t = {
                    order: f,
                    offset: 0,
                    limit: e
                };
            i("html", t)
        }

        function o() {
            u.ps.viewMore.on("click", function(e) {
                e.preventDefault(), d += 14;
                var t = $(".discog .track-item", u.ps.$el).length;
                t + 14 >= l && u.ps.viewMore.removeClass("available"), i("append")
            })
        }

        function a(e) {
            f = e, r()
        }
        var s, u = mm.Page(),
            l = 0,
            c = 14,
            d = 0,
            f = "listens_count DESC";
        return u.init = function() {
            return u.ps.$el = $("#mm-artist"), u.ps.id = u.ps.$el.attr("data-id"), u.ps.slug = u.ps.$el.attr("data-slug"), u.ps.sorter = mm.Sorter($(".mm-filter-sorter", u.ps.$el)), u.ps.cache_tag = u.ps.$el.data("cache-tag"), u.ps.viewMore = $(".view-more", u.ps.$el), s = $(".discog .mm-tracks-table-list"), e(), t(), o(), l = 0, c = 14, d = 0, n(), u
        }, mm.facade.on("tracks:sort:artist", a), u
    }(), mm.facade.on("app:ready", function() {
        $("#mm-artist").length && mm.artistPage.init()
    }), mm.contactPage = function() {
        "use strict";

        function e() {
            var e = t.ps.$el.find("a[href^='mailto:']");
            e.on("click", function() {
                var e = $(this).data("track-title");
                return e ? (_gaq.push(["_trackEvent", "Contact", "Email", e]), void 0) : !0
            })
        }
        var t = mm.Page($("#mm-contact"));
        return t.init = function() {
            t.ps.$el = $("#mm-contact"), e()
        }, t
    }(), mm.facade.on("app:ready", function() {
        $("#mm-contact").length && mm.contactPage.init()
    }), mm.familyPage = function() {
        "use strict";
        var e = mm.Page();
        return e.init = function() {
            e.ps.$el = $("#mm-family"), new Masonry($(".columns")[0], {
                columnWidth: ".bio",
                transitionDuration: 0,
                gutter: 0
            })
        }, e
    }(), mm.facade.on("app:ready", function() {
        $("#mm-family").length && mm.familyPage.init()
    }), mm.helpPage = function() {
        var e = mm.Page();
        return e.init = function() {}, e
    }(), mm.facade.on("app:ready", function() {
        $("#mm-help").length && mm.helpPage.init()
    }), mm.historyPage = function() {
        "use strict";
        var e = mm.Page();
        return e.init = function() {
            e.ps.$el = $("#mm-order-history"), e.ps.mixtapeAnchor = $('.anchors a[href="#mixtapes"]', e.ps.$el), e.ps.mixtapeAnchor.on("click", function(e) {
                e.preventDefault(), mm.drawer.setState("mixtapes")
            })
        }, e
    }(), mm.facade.on("app:ready", function() {
        $("#mm-order-history").length && mm.historyPage.init()
    }), mm.historyDetailPage = function() {
        "use strict";

        function e() {
            var e = t.ps.$el.find(".line-item");
            e.each(function(e, t) {
                
            })
        }
        var t = mm.Page();
        return t.init = function() {
            t.ps.$el = $("#mm-history-detail"), e()
        }, t
    }(), mm.facade.on("app:ready", function() {
        $("#mm-history-detail").length && mm.historyDetailPage.init()
    }), mm.homePage = function() {
        "use strict";

        function e() {
            var e = $("#mm-home-landing .ctas"),
                t = $("#mm-home-landing .bottom");
            s.ps.typeahead = $("#search").typeahead({
                name: "search",
                prefetch: "/search/terms",
                remote: "/search/terms/%QUERY",
                template: '<a class="suggestion"><%= value %></a>',
                engine: {
                    compile: function(e) {
                        var t = _.template(e);
                        return t.render = function(e) {
                            return this(e)
                        }, t
                    }
                }
            }), s.ps.typeahead.on("typeahead:selected", function() {
                $("form.search").submit()
            }), $("form.search").one("click", function() {
                s.ps.typeahead.on("typeahead:opened", function() {
                    e.css({
                        opacity: 0
                    }), t.css({
                        opacity: 0
                    })
                }), s.ps.typeahead.on("typeahead:closed", function() {
                    e.css({
                        opacity: 1
                    }), t.css({
                        opacity: 1
                    })
                }), s.ps.typeahead.trigger("typeahead:opened")
            }), e.css({
                opacity: 1
            }), t.css({
                opacity: 1
            })
        }

        function t() {
            var e = $("#mm-home-picks", s.ps.$el),
                t = $("#mm-home-picks-carousel", e),
                i = $(".page", t),
                r = $(".carousel-controls", e).first(),
                o = $(".back", r).first(),
                a = $(".next", r).first(),
                u = 0,
                l = i.length - 1 || 0,
                c = $(".page-dots", e).first().find("li");
            o.hide(), c.find("a").on("click", function(e) {
                e.preventDefault();
                var i = $(this).closest("li"),
                    r = i.index();
                return r !== u && (u = r, c.removeClass("current"), i.addClass("current"), n(t, u, l)), !1
            }), o.add(a).on("click", function(e) {
                e.preventDefault();
                var i = $(this);
                return i.hasClass("back") ? u -= 1 : u += 1, 0 >= u ? (u = 0, a.show(), o.hide()) : u >= l && (u = l, a.hide(), o.show()), n(t, u, l), !1
            })
        }

        function n(e, t, n) {
            return oak.strap(e.get(0)).transition({
                transform: "translateX(" + -(100 * t / (n + 1)) + "%)",
                duration: 400,
                timing: oak.timing.easeInOutQuad
            })
        }

        function i() {
            s.ps.$featuredArtists = $("#mm-home-artist ul.artists"), s.ps.featuredArtists = $("#mm-home-artist ul.artists > li"), $("a.artist-listen", s.ps.featuredArtists).click(function(e) {
                e.preventDefault(), mm.playerProxy.trigger("play", $(this).data("tracks"))
            }), s.ps.featureCarousel = new mm.SlidingCarousel(s.ps.$featuredArtists), s.ps.featuredArtistsPadding = parseInt($("#mm-home-artist").height(), 10) / 2 - 87.5, s.ps.featuredArtists.css({
                "padding-top": s.ps.featuredArtistsPadding
            }), s.ps.featuredArtists.height($("#mm-home-artist").height() - s.ps.featuredArtistsPadding), s.ps.featuredArtistTabs = $("#mm-home-artist ul.more > li"), s.ps.featuredArtistTabs.on("click", function(e) {
                e.preventDefault();
                var t = s.ps.featuredArtistTabs.index($(this));
                return s.ps.featureCarousel.goToSlide(t), !1
            }), s.ps.$featuredArtistsControls = $(".carousel-controls-control", "#mm-home-artist"), s.ps.$featuredArtistsControls.on("click", function(e) {
                e.preventDefault();
                var t = s.ps.featuredArtistTabs.length - 1,
                    n = s.ps.featuredArtistTabs.filter(".current").first().index(),
                    i = $(this).hasClass("next") ? 1 : -1,
                    r = n + i;
                return r > t ? r = 0 : 0 > r && (r = t), s.ps.featureCarousel.goToSlide(r, i), !1
            }), s.ps.$featuredArtistsDots = $("#mm-home-artist .page-dots > li"), s.ps.$featuredArtistsDots.children("a").fastClick(function(e) {
                e.preventDefault();
                var t = $(this).parent("li").index();
                return s.ps.featureCarousel.goToSlide(t), !1
            }), s.ps.featureCarousel.on(s.ps.featureCarousel.events.transitionComplete, function(e) {
                $("#mm-home-artist ul.more > li.current").add(s.ps.$featuredArtistsDots.filter(".current")).removeClass("current"), $(s.ps.featuredArtistTabs.get(e.index)).add(s.ps.$featuredArtistsDots.get(e.index)).addClass("current")
            })
        }

        function r() {
            var e = $("#mm-home-picks", s.ps.$el),
                t = $("#mm-home-picks-carousel", e),
                n = $(".page li", t);
            n.addClass("hover")
        }

        function o() {
            s.ps.staffMixtapes = $("#mm-home-picks-carousel .mixtape"), s.ps.staffMixtapes.each(function(e, t) {
                var n = $(t).data("urls");
                if (n) {
                    n = n.split("|");
                    for (var i = 0; i < n.length; i += 1) {
                        var r = mm.AsyncImage({
                            el: document.createElement("div"),
                            url: n[i],
                            pos: i
                        });
                        r.loaded = function(e) {
                            switch (this.pos) {
                                case 0:
                                    this.pos = "top left";
                                    break;
                                case 1:
                                    this.pos = "top right";
                                    break;
                                case 2:
                                    this.pos = "bottom left";
                                    break;
                                case 3:
                                    this.pos = "bottom right";
                                    break;
                                default:
                                    this.pos = "center center"
                            }
                            $(this.el).css({
                                background: "url(" + e.src + ") no-repeat " + this.pos,
                                backgroundSize: "50.3% 50.3%",
                                height: "100%",
                                left: 0,
                                position: "absolute",
                                top: 0,
                                width: "100%",
                                zIndex: 1
                            }).addClass("async-loaded"), $(t).prepend(this.el)
                        }, r.load()
                    }
                }
            })
        }

        function a(e) {
            return s.ps.$el.length ? (s.ps.bubbler && s.ps.bubbler.setOffsets(e.w), s.ps.featuredArtists.height($("#mm-home-artist").height() - s.ps.featuredArtistsPadding), s.sizeHeader(), void 0) : !1
        }
        var s = mm.Page();
        s.ps = {
            $el: null,
            bubbler: null,
            scenes: []
        }, s.init = function() {
            var n = $("#mm-home-landing"),
                u = $(".mm-fancy-input"),
                l = $("#mm-home-picks");
            s.ps.$el = $("#mm-home"), 0 !== $("#mm-home-inside").length && (oak.support.isTouch ? $("#mm-home-inside").remove() : '');
            var c = s.ps.$el.find("div[data-wistia]");
            return !oak.support.isTouch && c.length > 0 && (window.isFF || (s.ps.homePageVideoData = c.data("wistia"), c.remove(), s.ps.video.embed(n))), mm.VideoCarousel.init(), $(".track", l).each(function(e, t) {
               
            }), $(".mixtape", l).each(function(e, t) {
                mm.Playlist($(t))
            }), i(), t(), mm.isMobile && r(), mm.facade.on("mobile", r), o(), s.ps.search = mm.FancyInput(u), e(), mm.resizer.attach(a), mm.resizer.resize(), s
        }, s.sizeHeader = function() {
            var e, t = $(window).height(),
                n = $(window).width(),
                i = $("#player.desktop").first().height();
            (mm.isMobile || oak.support.isTouch) && (i = 0), e = t - i, $("#mm-home-landing").first().height(e), _.isUndefined(s.ps.video) || s.ps.video.size({
                w: n,
                h: t
            })
        };
        var u = s.offLoad;
        return s.offLoad = function() {
            s.ps.bubbler && s.ps.bubbler.offLoad(), $("#search").typeahead("destroy"), mm.resizer.detach(a), u()
        }, s
    }(), mm.facade.on("app:ready", function() {
        $("#mm-home").length && mm.homePage.init()
    }), mm.legalPage = function() {
        var e = mm.Page();
        return e.init = function() {}, e
    }(), mm.facade.on("app:ready", function() {
        $("#mm-legal").length && mm.legalPage.init()
    }), mm.mixtapePage = function() {
        "use strict";

        function e() {
            var e = oak.support.isTouch ? "mobile" : "desktop",
                t = mm[e + "Player"];
            return t.isState("playing")
        }

        function t() {
            var e = oak.support.isTouch ? "mobile" : "desktop",
                t = e + "Player",
                n = mm[t].queue[mm[t].pointer];
            if (_.isUndefined(n)) return !1;
            var i = $("[data-mixtape]", a.ps.$el).data("mixtape"),
                r = i.tracks,
                o = _.find(r, function(e) {
                    return e.id === n.id
                });
            return o
        }

        function n() {
            a.ps.$cassette.hasClass("counterclockwise") ? (a.ps.$cassette.removeClass("counterclockwise"), _.defer(function() {
                a.ps.$cassette.addClass("clockwise")
            })) : (a.ps.$cassette.removeClass("clockwise"), _.defer(function() {
                a.ps.$cassette.addClass("counterclockwise")
            }))
        }

        function i() {
            u += 1, l && 10 === u ? (n(), l = !1, u = 0) : 20 === u && (n(), u = 0)
        }

        function r(e) {
            a.ps.status.html(e), a.ps.hovers.each(function(e, t) {
                t.update()
            })
        }

        function o() {
            $(".track-item", a.ps.$el).each(function(e, t) {
               
            })
        }
        var a = mm.Page(),
            s = "animationiteration webkitAnimationIteration oanimationiteration MSAnimationIteration";
        a.init = function() {
            a.ps.$el = $("#mm-mixtape"), a.ps.id = a.ps.$el.attr("data-id"), a.ps.owner = "true" === a.ps.$el.attr("data-owner"), a.ps.mixtape = $(".actions", a.ps.$el), a.ps.status = $(".heading .info li.status", a.ps.$el), a.ps.mixtape = mm.Playlist(a.ps.mixtape), a.ps.$mixtape_animation_page = $("#mixtape-wrapper", a.ps.$el), a.ps.$mixtape_default_page = $("#mixtape-default", a.ps.$el), a.ps.$cassette = $("#mixtape-playing"), a.ps.hovers = $(".mm-hover-connect", a.ps.$el), a.ps.hovers.length && a.ps.hovers.each(function(e, t) {
                a.ps.hovers[e] = mm.HoverConnect($(t), a.ps.$el)
            }), a.ps.initial_page_load = !0, a.ps.mixtape.on("action:update", r);
            var n = $(".mm-tracks-table-list li").length;
            return n > 1 && a.ps.owner && $(".mm-tracks-table-list", a.ps.$el).sortable({
                handle: ".over",
                axis: "y",
                start: function(e, t) {
                    t.item.addClass("dragging")
                },
                stop: function(e, t) {
                    t.item.removeClass("dragging")
                },
                update: function(e, t) {
                    var n = t.item.attr("data-track-id");
                    $.ajax({
                        url: "/mixtapes/" + a.ps.id + "/sort",
                        data: {
                            mixtape_id: a.ps.id,
                            track_id: n,
                            position: t.item.index()
                        },
                        success: function(e) {
                            var t = $(".actions", a.ps.$el),
                                n = JSON.stringify(e.serialized);
                            t.attr("data-mixtape", n), a.ps.mixtape = mm.Playlist(t)
                        }
                    })
                }
            }), o(), a.on("play", a.player_change), a.on("pause", a.mixtape_pause), a.on("next", a.player_change), a.on("back", a.player_change), a.on("radio", a.player_change), t() && e() ? a.mixtape_view("animation") : a.mixtape_view(), a
        }, a.player_change = function() {
            var e;
            return t() && (e = "animation"), a.mixtape_view(e)
        }, a.mixtape_pause = function() {
            return a.mixtape_view()
        };
        var u = 0,
            l = !0;
        a.mixtape_view = function(e) {
            return a.ps.initial_page_load && (u = 0, l = !0, $("#mixtape-reel-left").off(s).on(s, i), a.ps.$cassette.addClass("spinning counterclockwise")), a.ps.initial_page_load && !e ? (a.ps.initial_page_load = !1, void 0) : ("animation" === e ? (a.ps.$cassette.removeClass("fadeout"), a.ps.$mixtape_default_page.removeClass("fadein"), _.defer(function() {
                a.ps.$cassette.addClass("fadein"), a.ps.$mixtape_default_page.addClass("fadeout")
            })) : (a.ps.$cassette.removeClass("fadein"), a.ps.$mixtape_default_page.removeClass("fadeout"), _.defer(function() {
                a.ps.$cassette.addClass("fadeout"), a.ps.$mixtape_default_page.addClass("fadein")
            })), void 0)
        };
        var c = a.offLoad;
        return a.offLoad = function() {
            a.ps.mixtape.off("action:update", r), a.off("play pause next back radio"), c()
        }, a
    }(), mm.facade.on("app:ready", function() {
        $("#mm-mixtape").length && mm.mixtapePage.init()
    }), mm.orderPage = function() {
        "use strict";

        function e() {
            a.ps.errors.empty(), a.ps.spinner.spin(a.ps.spinTarg[0]), a.ps.form.addClass("processing"), a.ps.submit.prop("disabled", !0)
        }

        function t() {
            a.ps.spinner.stop(), a.ps.form.removeClass("processing"), a.ps.submit.prop("disabled", !1)
        }

        function n(e) {
            if ("undefined" != typeof e) {
                if (Object.keys(e).indexOf("message") > -1) {
                    var t = $("<p/>").text(e.message);
                    a.ps.errors.append(t)
                } else
                    for (var n in e) e[n].forEach(function(e) {
                        var t = $("<p/>").text(e);
                        a.ps.errors.append(t)
                    });
                $("#container").scrollTop($("#container").scrollTop() + $(".billing-info").offset().top)
            }
        }

        function i() {
            var e = a.ps.form.serialize(),
                i = a.ps.inputs.filter("#order_id").val();
            $.post("/order/complete", e).done(function(e) {
                e.success ? (mm.cart.hydrate(), r(i)) : n(e.errors), t()
            }).fail(function(e) {
                n(e.errors)
            })
        }

        function r(e) {
            var t = "/order/" + e + "/receipt";
            mm.router.navigate(t, {
                trigger: !0
            })
        }

        function o(e, r) {
            if (r.error) n(r.error), t();
            else {
                var o = r.id;
                a.ps.success = !0, a.ps.form.find('[name="order[stripe_card_token]"]').remove(), a.ps.form.append('<input type="hidden" name="order[stripe_card_token]" value="' + o + '" />'), i()
            }
        }
        var a = mm.Page();
        return a.init = function() {
            a.ps.$el = $("#mm-order"), a.ps.form = $("form", a.ps.$el), a.ps.errors = $("#errors", a.ps.$el), a.ps.inputs = a.ps.form.find("input"), a.ps.submit = a.ps.form.find("button[type=submit]"), a.ps.spinner = new mm.Spinner, a.ps.spinTarg = a.ps.submit.parent("div"), a.ps.success = !1, a.ps.terms = $("#agree_to_terms", a.ps.$el), a.ps.agreement = $(".master-license-agreement", a.ps.$el);
            var t = $("select", a.ps.$el),
                n = $("option", t),
                i = [];
            n.each(function(e, t) {
                if (!$(t).attr("disabled")) {
                    var n = {
                        text: t.value,
                        data: t.value
                    };
                    i.push(n)
                }
            }), a.ps.selectable = mm.Selectable(t, i), a.ps.selectable.on("selected", function(e) {
                n.filter('[value="' + e.value + '"]').eq(0).attr("selected", !0), t.val(e.value)
            });
            var r = a.ps.selectable.$options.eq(3);
            a.ps.selectable.select(!1, r), a.ps.terms.on("change", function() {
                this.checked ? (a.ps.submit.removeClass("disabled"), a.ps.submit.removeAttr("disabled")) : (a.ps.submit.addClass("disabled"), a.ps.submit.attr("disabled", "disabled"))
            }), a.ps.form.on("submit", function(t) {
                return t.preventDefault(), e(), Stripe.createToken($(this), o), !1
            }), a.ps.agreement.on("click", function() {
                var e = $(this);
                e.hasClass("show") ? e.removeClass("show") : e.addClass("show")
            })
        }, a
    }(), mm.facade.on("app:ready", function() {
        $("#mm-order").length && mm.orderPage.init()
    }), mm.originalsPage = function() {
        "use strict";
        var e = mm.Page();
        return e.init = function() {
            return e.ps.$el = $("#mm-originals"), e.ps.scenes = [], mm.VideoCarousel.init(), $(".ctas a").click(function(e) {
                e.preventDefault();
                var t = $(this).attr("href"),
                    n = $("#container"),
                    i = $(t).offset().top + n.scrollTop();
                $("#container").animate({
                    scrollTop: i
                })
            }), e
        }, e
    }(), mm.facade.on("app:ready", function() {
        $("#mm-originals").length && mm.originalsPage.init()
    }), mm.promoPage = function() {
        "use strict";
        var e = mm.Page();
        return e.init = function() {
            e.ps.$el = $("#mm-promo");
            var t = $("a.login", e.ps.$el),
                n = $("a.register", e.ps.$el);
            t.length && t.on("click", function(e) {
                e.preventDefault(), mm.drawer.setState("login")
            }), n.length && n.on("click", function(e) {
                e.preventDefault(), mm.drawer.setState("register")
            })
        }, e
    }(), mm.facade.on("app:ready", function() {
        $("#mm-promo").length && mm.promoPage.init()
    }), mm.receiptPage = function() {
        "use strict";

        function e() {
            n.ps.tracks = n.ps.$el.find(".line-item"), n.ps.tracks.each(function(e, t) {
              
            })
        }

        function t() {
            var e = n.ps.$el.data();
            if (_gaq) {
                _gaq.push(["_addTrans", e.orderId, "Marmoset Music", e.total, "", "", e.city, e.subregion, e.country]);
                var t;
                n.ps.tracks.each(function(n, i) {
                    t = $(i).data("track"), _gaq.push(["_addItem", e.orderId, t.id, t.display_name, t.artist.name, $(i).data("price"), "1"])
                }), _gaq.push(["_trackTrans"])
            }
        }
        var n = mm.Page();
        return n.init = function() {
            n.ps.$el = $("#mm-receipt");
            var i = $("a.newsletter", n.ps.$el);
            i.length && (i = mm.Newsletter($("a.newsletter", n.ps.$el)));
            var r = $("a.register", n.ps.$el);
            r.length && r.on("click", function(e) {
                e.preventDefault(), mm.drawerProxy.trigger("register")
            }), e(), t()
        }, n
    }(), mm.facade.on("app:ready", function() {
        $("#mm-receipt").length && mm.receiptPage.init()
    }), mm.storyPage = function() {
        "use strict";

        function e(e, t, n) {
            var i = $(window).height();
            t.each(function(t, r) {
                r = $(r), r.hasClass("delay") ? r.offset().top + r.height() + 50 < i && r.addClass("reveal") : e.scrollTop - n / 2 > r.offset().top && r.addClass("reveal")
            })
        }

        function t() {
            $(".contain > p").each(function(e, t) {
                var n = $(t).html(),
                    i = "";
                n.replace(/\(?[A-Z][^\.]+[\.!\?]\)?/g, function(e) {
                    i += "<span class='delay'>" + e + "</span> "
                }), $(t).html(i)
            }), $(".contain.delay").removeClass("delay")
        }

        function n() {
            var t, n = $("p span"),
                i = window.innerHeight,
                o = document.getElementById("container");
            o.addEventListener("scroll", function() {
                e(this, n, i)
            }, !1), t = function(t) {
                e(window, n, t.h)
            }, mm.resizer.attach(t), r.offLoad = function() {
                mm.resizer.detach(t)
            }, e(o, n, i)
        }

        function i() {
            var e = $(".tiles li", r.ps.$el),
                t = $(".tiles a", r.ps.$el);
            t.hover(function() {
                e.removeClass("highlight").filter($(this).attr("data-target")).addClass("highlight")
            }, function() {
                e.removeClass("highlight")
            })
        }
        var r = mm.Page($("#mm-story"));
        return r.init = function() {
            r.ps.$el = $("#mm-story"), i(), mm.isMobile ? $(".contain.delay").removeClass("delay") : (t(), n())
        }, r
    }(), mm.facade.on("app:ready", function() {
        $("#mm-story").length && mm.storyPage.init()
    }), mm.trackPage = function() {
        "use strict";

        function e() {
            var e = $(".related .track-item", t.ps.$el);
            e.each(function(e, t) {
            });
            var n = $(".actions", t.ps.$el);
        }
        var t = mm.Page();
        return t.init = function() {
            return t.ps.$el = $("#mm-track"), e(), t
        }, t
    }(), mm.facade.on("app:ready", function() {
        $("#mm-track").length && mm.trackPage.init()
    }), mm.tracksPage = function() {
        "use strict";
        var e = mm.Page();
        e.init = function() {
            return e.ps.$el = $("#mm-tracks"), e.ps.filter_toggle = mm.Toggle(e.ps.$el), mm.workbench.build(), e
        };
        var t = e.offLoad;
        return e.offLoad = function() {
            mm.workbench.offLoad(), t.call(this)
        }, e
    }(), mm.facade.on("app:ready", function() {
        $("#mm-tracks").length && mm.tracksPage.init()
    }),
    function(e, t, n) {
        "use strict";

        function i() {
            n.csrf = $('meta[name="csrf-token"]').attr("content"), $.ajaxSetup({
                beforeSend: function(e) {
                    e.setRequestHeader("X-CSRF-Token", n.csrf)
                }
            })
        }

        function r() {
            t.history.fragment === w.fragment && (t.history.fragment = null, n.router.navigate(w.fragment, {
                trigger: !0,
                replace: !0
            }))
        }

        function o() {
            $("[data-prevent-default]").on("hover click", function(e) {
                e.preventDefault()
            }), $("[data-marmoset-newsletter]").on("click", function(e) {
                return e.preventDefault(), n.drawer.pushed ? n.drawerProxy.trigger("close") : (n.drawerProxy.trigger("subscribe"), _gaq.push(["_trackEvent", "Newsletter", "MarmoNews Sign Up", "Count Me In"])), !1
            }), $(".social ol li a", "footer[role='main']").on("click", function() {
                var e, t = $(this),
                    n = t.closest("li");
                if (n.hasClass("facebook") ? e = "Facebook" : n.hasClass("vimeo") ? e = "Vimeo" : n.hasClass("instagram") ? e = "Instagram" : n.hasClass("twitter") && (e = "Twitter"), e) {
                    var i = [e, "Icon"].join(" ");
                    _gaq.push(["_trackEvent", "Social Media Footer Link", i])
                }
            })
        }

        function a(e) {
            return e += /\?/.test(e) ? "&_ajax=1" : "?_ajax=1"
        }

        function s() {
            $('a[data-bypass="true"]').on("click", function(e) {
                e.preventDefault();
                var t = $(this).attr("href");
                n.router.navigate(t, {
                    trigger: !0
                })
            }), $("[data-prevent-default]").on("hover click", function(e) {
                e.preventDefault()
            })
        }

        function u(e, t) {
            ("undefined" == typeof e || "undefined" == typeof t) && n.router.navigate("not_found", {
                trigger: !0
            }), t = a(t), h(), $.get(t).done(function(t) {
                d(e, t)
            }).fail(function(t, n, i) {
                c(e, t, n, i)
            }).always(function(t) {
                l(e, t)
            })
        }

        function l() {
            m(), g(), s(), n.facade.trigger("app:header")
        }

        function c(e, t, n, i) {
            console.error("Error retreiving page data: " + i)
        }

        function d(e, t) {
            var i = e + "Page",
                r = _[w.path] + "Page",
                o = w.path.split("/");
            if (o.length > 1) {
                var a, s = o[0].toLowerCase();
                switch (s) {
                    case "artists":
                        a = "artist";
                        break;
                    case "mixtapes":
                        a = "mixtape"
                }
                a && (r = a + "Page")
            }
            _gaq.push(["_trackPageview", location.pathname]), k.html(t), n[i] && n[i].init && (n[r] && n[r].offLoad && n[r].offLoad(), n[i].init()), b(), x.attr("data-section", e), f($(t).data("title") || ""), n.CoverImage.loadAll(), x.scrollTop(0), oak.support.isTouch && $("body").scrollTop(0), n.drawer._buildCSS()
        }

        function f(e) {
            var t = "Marmoset";
            "" != e && (t += " // " + e), $("head > title").html(t)
        }

        function p(e) {
            e.w > 767 ? ($(document.body).attr("data-device", "desktop"), n.isMobile && n.facade.trigger("desktop"), n.isMobile = !1) : ($(document.body).attr("data-device", "mobile"), n.isMobile || n.facade.trigger("mobile"), n.isMobile = !0), n.drawer.trigger("calc"), n.drawer._buildCSS(), n.header.setWidth(), n.desktopPlayer.resize(), n.desktopPlayer._buildCSS(!1)
        }

        function h() {
            var e = $("#mm-drawer-nav li.loading"),
                t = E.spin();
            $("div", e).append(t.el), $(t.el).css({
                left: 24,
                top: 24
            }), e.removeClass("hidden"), oak.support.isTouch && n.spin(!0)
        }

        function m() {
            var e = $("#mm-drawer-nav li.loading");
            e.addClass("hidden"), E.stop(), oak.support.isTouch && n.spin(!1)
        }

        function g() {
            var e = $('nav[role="main"]');
            $("a", e).removeClass("current"), $('a[href="/' + w.path + '"]').addClass("current")
        }

        function v(e) {
            var t = $(".global-spin");
            e ? E.spin(t[0]) : E.stop()
        }

        function y() {
            requestAnimationFrame(y), TWEEN.update()
        }

        function b() {
            w = {
                fragment: t.history.fragment,
                path: t.history.location.pathname.replace(/^\//, "")
            }
        }
        var w, x, k, _ = {
                "": "home",
                account: "account",
                "account/history": "history",
                "account/history/:id": "historyDetail",
                "artists/:slug": "artist",
                contact: "contact",
                help: "help",
                legal: "legal",
                licensing: "licensing",
                mixtapes: "mixtapes",
                "mixtapes/:id": "mixtape",
                "order/:id": "order",
                "order/:id/receipt": "receipt",
                originals: "originals",
                "our-story": "story",
                "our-story/family": "family",
                browse: "tracks",
                "browse/:id": "track",
                "browse?*path": "tracks",
                "promos/:promo": "promos",
                "*not_found": "not_found"
            },
            C = {
                routes: _,
                home: function() {
                    u("home", "/")
                },
                account: function() {
                    u("account", "/account")
                },
                history: function() {
                    u("history", "/account/history")
                },
                historyDetail: function(e) {
                    u("historyDetail", "/account/history/" + e)
                },
                artist: function(e) {
                    u("artist", "/artists/" + e)
                },
                contact: function() {
                    u("contact", "/contact")
                },
                help: function() {
                    u("help", "/help")
                },
                legal: function() {
                    u("legal", "/legal")
                },
                licensing: function() {
                    u("licensing", "/licensing")
                },
                mixtapes: function() {
                    u("mixtapes", "/mixtapes")
                },
                mixtape: function(e) {
                    u("mixtape", "/mixtapes/" + e)
                },
                order: function(e) {
                    u("order", "/order/" + e)
                },
                receipt: function(e) {
                    u("receipt", "/order/" + e + "/receipt")
                },
                originals: function() {
                    u("originals", "/originals")
                },
                story: function() {
                    u("story", "/our-story")
                },
                family: function() {
                    u("family", "/our-story/family")
                },
                tracks: function() {
                    u("tracks", "/browse" + location.search)
                },
                track: function(e) {
                    u("track", "/browse/" + e)
                },
                promos: function(e) {
                    u("promos", "/promos/" + e)
                },
                not_found: function() {
                    u("not_found", "/*not_found")
                }
            },
            E = new n.Spinner({
                color: "#FFF"
            }),
            S = n.hasHistory,
            T = location.hash,
            P = location.pathname;
        n.init = function() {
            x = $("#container"), k = $("#content", x), i();
            var e = t.Router.extend(C);
            n.router = new e, s(), !S && !T.length && P.length > 1 && (S = !0), t.history.start({
                pushState: !0,
                silent: S
            }), y(), b(), g(), o(), n.resizer.attach(p), n.resizer.resize(), n.facade.trigger("app:ready")
        }, n.facade.on("bypass", s), n.facade.on("refresh", r), n.facade.on("route:update", b), n.spin = v, $(document).ready(n.init)
    }(window, Backbone, mm);