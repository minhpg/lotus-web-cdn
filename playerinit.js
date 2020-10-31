!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.playerInitScript = e()
}(this, function() {
    "use strict";
    function t(t) {
        return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t
    }
    function e(t, e) {
        return e = {
            exports: {}
        },
        t(e, e.exports),
        e.exports
    }
    function n(t, e, n) {
        var r = t;
        return Hn(e) ? (n = e,
        "string" == typeof t && (r = {
            uri: t
        })) : r = Jn(e, {
            uri: t
        }),
        r.callback = n,
        r
    }
    function r(t, e, r) {
        return e = n(t, e, r),
        o(e)
    }
    function o(t) {
        function e(t) {
            return clearTimeout(u),
            t instanceof Error || (t = new Error("" + (t || "Unknown XMLHttpRequest Error"))),
            t.statusCode = 0,
            i(t, m)
        }
        function n() {
            if (!c) {
                var e;
                clearTimeout(u),
                e = t.useXDR && void 0 === a.status ? 200 : 1223 === a.status ? 204 : a.status;
                var n = m
                  , r = null;
                return 0 !== e ? (n = {
                    body: function() {
                        var t = void 0;
                        if (t = a.response ? a.response : a.responseText || function(t) {
                            if ("document" === t.responseType)
                                return t.responseXML;
                            var e = t.responseXML && "parsererror" === t.responseXML.documentElement.nodeName;
                            return "" !== t.responseType || e ? null : t.responseXML
                        }(a),
                        v)
                            try {
                                t = JSON.parse(t)
                            } catch (t) {}
                        return t
                    }(),
                    statusCode: e,
                    method: f,
                    headers: {},
                    url: l,
                    rawRequest: a
                },
                a.getAllResponseHeaders && (n.headers = Gn(a.getAllResponseHeaders()))) : r = new Error("Internal XMLHttpRequest Error"),
                i(r, n, n.body)
            }
        }
        if (void 0 === t.callback)
            throw new Error("callback argument missing");
        var o = !1
          , i = function(e, n, r) {
            o || (o = !0,
            t.callback(e, n, r))
        }
          , a = t.xhr || null;
        a || (a = t.cors || t.useXDR ? new r.XDomainRequest : new r.XMLHttpRequest);
        var s, c, u, l = a.url = t.uri || t.url, f = a.method = t.method || "GET", h = t.body || t.data, p = a.headers = t.headers || {}, d = !!t.sync, v = !1, m = {
            body: void 0,
            headers: {},
            statusCode: 0,
            method: f,
            url: l,
            rawRequest: a
        };
        if ("json"in t && !1 !== t.json && (v = !0,
        p.accept || p.Accept || (p.Accept = "application/json"),
        "GET" !== f && "HEAD" !== f && (p["content-type"] || p["Content-Type"] || (p["Content-Type"] = "application/json"),
        h = JSON.stringify(!0 === t.json ? h : t.json))),
        a.onreadystatechange = function() {
            4 === a.readyState && setTimeout(n, 0)
        }
        ,
        a.onload = n,
        a.onerror = e,
        a.onprogress = function() {}
        ,
        a.onabort = function() {
            c = !0
        }
        ,
        a.ontimeout = e,
        a.open(f, l, !d, t.username, t.password),
        d || (a.withCredentials = !!t.withCredentials),
        !d && t.timeout > 0 && (u = setTimeout(function() {
            if (!c) {
                c = !0,
                a.abort("timeout");
                var t = new Error("XMLHttpRequest timeout");
                t.code = "ETIMEDOUT",
                e(t)
            }
        }, t.timeout)),
        a.setRequestHeader)
            for (s in p)
                p.hasOwnProperty(s) && a.setRequestHeader(s, p[s]);
        else if (t.headers && !function(t) {
            for (var e in t)
                if (t.hasOwnProperty(e))
                    return !1;
            return !0
        }(t.headers))
            throw new Error("Headers cannot be set on an XDomainRequest object");
        return "responseType"in t && (a.responseType = t.responseType),
        "beforeSend"in t && "function" == typeof t.beforeSend && t.beforeSend(a),
        a.send(h || null),
        a
    }
    function i() {
        return "about:blank" === document.location.href ? window.parent.location : location
    }
    function a(t, e, n, r) {
        try {
            tr[e].dispose()
        } catch (t) {}
        /worldcup/.test(document.location.href) && (n.params.midroll = "",
        n.params.nopre = !1,
        n.params.postroll = !0,
        n.params.openPostroll = !0);
        var o = tr[e] = window[t](e, n, r);
        return o.on("player:viewactive", function() {
            s.onactiveinview(this)
        }),
        er.push(o),
        o
    }
    function s(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
          , n = arguments[2];
        setTimeout(function() {
            !function(t) {
                var e = "#" + t + " { background-color: black;}"
                  , n = document.head || document.getElementsByTagName("head")[0]
                  , r = document.createElement("style");
                r.type = "text/css",
                r.styleSheet ? r.styleSheet.cssText = e : r.appendChild(document.createTextNode(e)),
                n.appendChild(r)
            }(t)
        }, 0);
        (function(t) {
            var e = t.secure
              , n = void 0;
            try {
                n = Qn.decode(e),
                /^http/.test(n) || (n = "https://player.sohatv.vn" + n)
            } catch (t) {
                return Dn.reject(t)
            }
            return zn({
                uri: n
            })
        }
        )({
            secure: e.secure
        }).then(function(r) {
            var o = (r = JSON.parse(r)).data
              , s = o.core
              , c = o.plugins
              , u = o.playerId
              , l = s.name
              , f = i()
              , h = ["" + f.protocol + s.style]
              , p = f.protocol + "//player.sohatv.vn/resource/concat/??"
              , d = f.protocol + "//player.sohatv.vn/resource/concat/??"
              , v = {};
            e.plugins && (v = e.plugins),
            e.scriptinfo = r.data;
            var m = {};
            if (c.forEach(function(t) {
                var e = t.name
                  , n = t.src
                  , r = t.style
                  , o = t.options
                  , i = void 0 === o ? {} : o
                  , a = v[e] || {};
                !1 !== v[e] && (m[e] = st({}, i, a)),
                n && (n = (n = n.replace("//player.sohatv.vn/resource/", ",")).replace("//adminplayer.sohatv.vn/resource/", ","),
                Yn && (n = n.replace(".min.js", ".js")),
                p = p.concat("" + n)),
                r && (r = (r = r.replace("//player.sohatv.vn/resource/", ",")).replace("//adminplayer.sohatv.vn/resource/", ","),
                d = d.concat("" + r))
            }),
            h.push("" + p),
            h.push("" + d),
            Zn[l] = Zn[l] || {
                state: "ide",
                players: []
            },
            "ide" === Zn[l].state) {
                var y = new Ie(h,l)
                  , g = window.React ? s.compileSrc : s.src;
                Yn && (g = g.replace(".min.js", ".js")),
                y.loadCore("" + f.protocol + g, function() {
                    y.loadFiles().onload(function() {
                        Zn[l].state = "inited",
                        function(t) {
                            for (var e = Zn[t].players; e.length; ) {
                                var n = e.shift();
                                a(t, n.video, n.options, n.ready)
                            }
                        }(l)
                    })
                }),
                Zn[l].state = "waiting"
            }
            "waiting" === Zn[l].state ? Zn[l].players.push({
                video: t,
                options: st({}, e, {
                    playerid: u,
                    plugins: m
                }),
                ready: n
            }) : a(l, t, st({}, e, {
                playerid: u,
                plugins: m
            }), n)
        }).catch(function() {})
    }
    var c = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}
      , u = e(function(t) {
        var e = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = e)
    })
      , l = e(function(t) {
        var e = t.exports = {
            version: "2.5.1"
        };
        "number" == typeof __e && (__e = e)
    })
      , f = function(t) {
        if ("function" != typeof t)
            throw TypeError(t + " is not a function!");
        return t
    }
      , h = function(t, e, n) {
        if (f(t),
        void 0 === e)
            return t;
        switch (n) {
        case 1:
            return function(n) {
                return t.call(e, n)
            }
            ;
        case 2:
            return function(n, r) {
                return t.call(e, n, r)
            }
            ;
        case 3:
            return function(n, r, o) {
                return t.call(e, n, r, o)
            }
        }
        return function() {
            return t.apply(e, arguments)
        }
    }
      , p = function(t) {
        return "object" == typeof t ? null !== t : "function" == typeof t
    }
      , d = function(t) {
        if (!p(t))
            throw TypeError(t + " is not an object!");
        return t
    }
      , v = function(t) {
        try {
            return !!t()
        } catch (t) {
            return !0
        }
    }
      , m = !v(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7
            }
        }).a
    })
      , y = u.document
      , g = p(y) && p(y.createElement)
      , w = function(t) {
        return g ? y.createElement(t) : {}
    }
      , b = !m && !v(function() {
        return 7 != Object.defineProperty(w("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    })
      , S = function(t, e) {
        if (!p(t))
            return t;
        var n, r;
        if (e && "function" == typeof (n = t.toString) && !p(r = n.call(t)))
            return r;
        if ("function" == typeof (n = t.valueOf) && !p(r = n.call(t)))
            return r;
        if (!e && "function" == typeof (n = t.toString) && !p(r = n.call(t)))
            return r;
        throw TypeError("Can't convert object to primitive value")
    }
      , x = Object.defineProperty
      , _ = {
        f: m ? Object.defineProperty : function(t, e, n) {
            if (d(t),
            e = S(e, !0),
            d(n),
            b)
                try {
                    return x(t, e, n)
                } catch (t) {}
            if ("get"in n || "set"in n)
                throw TypeError("Accessors not supported!");
            return "value"in n && (t[e] = n.value),
            t
        }
    }
      , E = function(t, e) {
        return {
            enumerable: !(1 & t),
            configurable: !(2 & t),
            writable: !(4 & t),
            value: e
        }
    }
      , j = m ? function(t, e, n) {
        return _.f(t, e, E(1, n))
    }
    : function(t, e, n) {
        return t[e] = n,
        t
    }
      , O = function(t, e, n) {
        var r, o, i, a = t & O.F, s = t & O.G, c = t & O.S, f = t & O.P, p = t & O.B, d = t & O.W, v = s ? l : l[e] || (l[e] = {}), m = v.prototype, y = s ? u : c ? u[e] : (u[e] || {}).prototype;
        s && (n = e);
        for (r in n)
            (o = !a && y && void 0 !== y[r]) && r in v || (i = o ? y[r] : n[r],
            v[r] = s && "function" != typeof y[r] ? n[r] : p && o ? h(i, u) : d && y[r] == i ? function(t) {
                var e = function(e, n, r) {
                    if (this instanceof t) {
                        switch (arguments.length) {
                        case 0:
                            return new t;
                        case 1:
                            return new t(e);
                        case 2:
                            return new t(e,n)
                        }
                        return new t(e,n,r)
                    }
                    return t.apply(this, arguments)
                };
                return e.prototype = t.prototype,
                e
            }(i) : f && "function" == typeof i ? h(Function.call, i) : i,
            f && ((v.virtual || (v.virtual = {}))[r] = i,
            t & O.R && m && !m[r] && j(m, r, i)))
    };
    O.F = 1,
    O.G = 2,
    O.S = 4,
    O.P = 8,
    O.B = 16,
    O.W = 32,
    O.U = 64,
    O.R = 128;
    var T = O
      , k = {}.hasOwnProperty
      , C = function(t, e) {
        return k.call(t, e)
    }
      , P = {}.toString
      , M = function(t) {
        return P.call(t).slice(8, -1)
    }
      , R = Object("z").propertyIsEnumerable(0) ? Object : function(t) {
        return "String" == M(t) ? t.split("") : Object(t)
    }
      , L = function(t) {
        if (void 0 == t)
            throw TypeError("Can't call method on  " + t);
        return t
    }
      , A = function(t) {
        return R(L(t))
    }
      , N = Math.ceil
      , F = Math.floor
      , I = function(t) {
        return isNaN(t = +t) ? 0 : (t > 0 ? F : N)(t)
    }
      , D = Math.min
      , q = function(t) {
        return t > 0 ? D(I(t), 9007199254740991) : 0
    }
      , H = Math.max
      , U = Math.min
      , B = u["__core-js_shared__"] || (u["__core-js_shared__"] = {})
      , X = function(t) {
        return B[t] || (B[t] = {})
    }
      , W = 0
      , $ = Math.random()
      , G = function(t) {
        return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++W + $).toString(36))
    }
      , J = X("keys")
      , V = function(t) {
        return J[t] || (J[t] = G(t))
    }
      , K = function(t) {
        return function(e, n, r) {
            var o, i = A(e), a = q(i.length), s = function(t, e) {
                return (t = I(t)) < 0 ? H(t + e, 0) : U(t, e)
            }(r, a);
            if (t && n != n) {
                for (; a > s; )
                    if ((o = i[s++]) != o)
                        return !0
            } else
                for (; a > s; s++)
                    if ((t || s in i) && i[s] === n)
                        return t || s || 0;
            return !t && -1
        }
    }(!1)
      , z = V("IE_PROTO")
      , Q = function(t, e) {
        var n, r = A(t), o = 0, i = [];
        for (n in r)
            n != z && C(r, n) && i.push(n);
        for (; e.length > o; )
            C(r, n = e[o++]) && (~K(i, n) || i.push(n));
        return i
    }
      , Z = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
      , Y = Object.keys || function(t) {
        return Q(t, Z)
    }
      , tt = {
        f: Object.getOwnPropertySymbols
    }
      , et = {
        f: {}.propertyIsEnumerable
    }
      , nt = function(t) {
        return Object(L(t))
    }
      , rt = Object.assign
      , ot = !rt || v(function() {
        var t = {}
          , e = {}
          , n = Symbol()
          , r = "abcdefghijklmnopqrst";
        return t[n] = 7,
        r.split("").forEach(function(t) {
            e[t] = t
        }),
        7 != rt({}, t)[n] || Object.keys(rt({}, e)).join("") != r
    }) ? function(t, e) {
        for (var n = nt(t), r = arguments.length, o = 1, i = tt.f, a = et.f; r > o; )
            for (var s, c = R(arguments[o++]), u = i ? Y(c).concat(i(c)) : Y(c), l = u.length, f = 0; l > f; )
                a.call(c, s = u[f++]) && (n[s] = c[s]);
        return n
    }
    : rt;
    T(T.S + T.F, "Object", {
        assign: ot
    });
    var it = l.Object.assign
      , at = e(function(t) {
        t.exports = {
            default: it,
            __esModule: !0
        }
    });
    t(at);
    var st = t(e(function(t, e) {
        e.__esModule = !0;
        var n = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(at);
        e.default = n.default || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
            }
            return t
        }
    }))
      , ct = l.JSON || (l.JSON = {
        stringify: JSON.stringify
    })
      , ut = t(e(function(t) {
        t.exports = {
            default: function(t) {
                return ct.stringify.apply(ct, arguments)
            },
            __esModule: !0
        }
    }))
      , lt = j
      , ft = {}
      , ht = m ? Object.defineProperties : function(t, e) {
        d(t);
        for (var n, r = Y(e), o = r.length, i = 0; o > i; )
            _.f(t, n = r[i++], e[n]);
        return t
    }
      , pt = u.document
      , dt = pt && pt.documentElement
      , vt = V("IE_PROTO")
      , mt = function() {}
      , yt = function() {
        var t, e = w("iframe"), n = Z.length;
        for (e.style.display = "none",
        dt.appendChild(e),
        e.src = "javascript:",
        (t = e.contentWindow.document).open(),
        t.write("<script>document.F=Object<\/script>"),
        t.close(),
        yt = t.F; n--; )
            delete yt.prototype[Z[n]];
        return yt()
    }
      , gt = Object.create || function(t, e) {
        var n;
        return null !== t ? (mt.prototype = d(t),
        n = new mt,
        mt.prototype = null,
        n[vt] = t) : n = yt(),
        void 0 === e ? n : ht(n, e)
    }
      , wt = e(function(t) {
        var e = X("wks")
          , n = u.Symbol
          , r = "function" == typeof n;
        (t.exports = function(t) {
            return e[t] || (e[t] = r && n[t] || (r ? n : G)("Symbol." + t))
        }
        ).store = e
    })
      , bt = _.f
      , St = wt("toStringTag")
      , xt = function(t, e, n) {
        t && !C(t = n ? t : t.prototype, St) && bt(t, St, {
            configurable: !0,
            value: e
        })
    }
      , _t = {};
    j(_t, wt("iterator"), function() {
        return this
    });
    var Et = function(t, e, n) {
        t.prototype = gt(_t, {
            next: E(1, n)
        }),
        xt(t, e + " Iterator")
    }
      , jt = V("IE_PROTO")
      , Ot = Object.prototype
      , Tt = Object.getPrototypeOf || function(t) {
        return t = nt(t),
        C(t, jt) ? t[jt] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? Ot : null
    }
      , kt = wt("iterator")
      , Ct = !([].keys && "next"in [].keys())
      , Pt = function() {
        return this
    }
      , Mt = function(t, e, n, r, o, i, a) {
        Et(n, e, r);
        var s, c, u, l = function(t) {
            if (!Ct && t in d)
                return d[t];
            switch (t) {
            case "keys":
            case "values":
                return function() {
                    return new n(this,t)
                }
            }
            return function() {
                return new n(this,t)
            }
        }, f = e + " Iterator", h = "values" == o, p = !1, d = t.prototype, v = d[kt] || d["@@iterator"] || o && d[o], m = v || l(o), y = o ? h ? l("entries") : m : void 0, g = "Array" == e ? d.entries || v : v;
        if (g && (u = Tt(g.call(new t))) !== Object.prototype && u.next && xt(u, f, !0),
        h && v && "values" !== v.name && (p = !0,
        m = function() {
            return v.call(this)
        }
        ),
        a && (Ct || p || !d[kt]) && j(d, kt, m),
        ft[e] = m,
        ft[f] = Pt,
        o)
            if (s = {
                values: h ? m : l("values"),
                keys: i ? m : l("keys"),
                entries: y
            },
            a)
                for (c in s)
                    c in d || lt(d, c, s[c]);
            else
                T(T.P + T.F * (Ct || p), e, s);
        return s
    }
      , Rt = function(t) {
        return function(e, n) {
            var r, o, i = String(L(e)), a = I(n), s = i.length;
            return a < 0 || a >= s ? t ? "" : void 0 : (r = i.charCodeAt(a)) < 55296 || r > 56319 || a + 1 === s || (o = i.charCodeAt(a + 1)) < 56320 || o > 57343 ? t ? i.charAt(a) : r : t ? i.slice(a, a + 2) : o - 56320 + (r - 55296 << 10) + 65536
        }
    }(!0);
    Mt(String, "String", function(t) {
        this._t = String(t),
        this._i = 0
    }, function() {
        var t, e = this._t, n = this._i;
        return n >= e.length ? {
            value: void 0,
            done: !0
        } : (t = Rt(e, n),
        this._i += t.length,
        {
            value: t,
            done: !1
        })
    });
    var Lt = function(t, e) {
        return {
            value: e,
            done: !!t
        }
    };
    Mt(Array, "Array", function(t, e) {
        this._t = A(t),
        this._i = 0,
        this._k = e
    }, function() {
        var t = this._t
          , e = this._k
          , n = this._i++;
        return !t || n >= t.length ? (this._t = void 0,
        Lt(1)) : "keys" == e ? Lt(0, n) : "values" == e ? Lt(0, t[n]) : Lt(0, [n, t[n]])
    }, "values");
    ft.Arguments = ft.Array;
    for (var At = wt("toStringTag"), Nt = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), Ft = 0; Ft < Nt.length; Ft++) {
        var It = Nt[Ft]
          , Dt = u[It]
          , qt = Dt && Dt.prototype;
        qt && !qt[At] && j(qt, At, It),
        ft[It] = ft.Array
    }
    var Ht = {
        f: wt
    }
      , Ut = Ht.f("iterator")
      , Bt = e(function(t) {
        t.exports = {
            default: Ut,
            __esModule: !0
        }
    });
    t(Bt);
    var Xt = e(function(t) {
        var e = G("meta")
          , n = _.f
          , r = 0
          , o = Object.isExtensible || function() {
            return !0
        }
          , i = !v(function() {
            return o(Object.preventExtensions({}))
        })
          , a = function(t) {
            n(t, e, {
                value: {
                    i: "O" + ++r,
                    w: {}
                }
            })
        }
          , s = t.exports = {
            KEY: e,
            NEED: !1,
            fastKey: function(t, n) {
                if (!p(t))
                    return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t;
                if (!C(t, e)) {
                    if (!o(t))
                        return "F";
                    if (!n)
                        return "E";
                    a(t)
                }
                return t[e].i
            },
            getWeak: function(t, n) {
                if (!C(t, e)) {
                    if (!o(t))
                        return !0;
                    if (!n)
                        return !1;
                    a(t)
                }
                return t[e].w
            },
            onFreeze: function(t) {
                return i && s.NEED && o(t) && !C(t, e) && a(t),
                t
            }
        }
    })
      , Wt = _.f
      , $t = function(t) {
        var e = l.Symbol || (l.Symbol = {});
        "_" == t.charAt(0) || t in e || Wt(e, t, {
            value: Ht.f(t)
        })
    }
      , Gt = Array.isArray || function(t) {
        return "Array" == M(t)
    }
      , Jt = Z.concat("length", "prototype")
      , Vt = {
        f: Object.getOwnPropertyNames || function(t) {
            return Q(t, Jt)
        }
    }
      , Kt = Vt.f
      , zt = {}.toString
      , Qt = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : []
      , Zt = {
        f: function(t) {
            return Qt && "[object Window]" == zt.call(t) ? function(t) {
                try {
                    return Kt(t)
                } catch (t) {
                    return Qt.slice()
                }
            }(t) : Kt(A(t))
        }
    }
      , Yt = Object.getOwnPropertyDescriptor
      , te = {
        f: m ? Yt : function(t, e) {
            if (t = A(t),
            e = S(e, !0),
            b)
                try {
                    return Yt(t, e)
                } catch (t) {}
            if (C(t, e))
                return E(!et.f.call(t, e), t[e])
        }
    }
      , ee = Xt.KEY
      , ne = te.f
      , re = _.f
      , oe = Zt.f
      , ie = u.Symbol
      , ae = u.JSON
      , se = ae && ae.stringify
      , ce = wt("_hidden")
      , ue = wt("toPrimitive")
      , le = {}.propertyIsEnumerable
      , fe = X("symbol-registry")
      , he = X("symbols")
      , pe = X("op-symbols")
      , de = Object.prototype
      , ve = "function" == typeof ie
      , me = u.QObject
      , ye = !me || !me.prototype || !me.prototype.findChild
      , ge = m && v(function() {
        return 7 != gt(re({}, "a", {
            get: function() {
                return re(this, "a", {
                    value: 7
                }).a
            }
        })).a
    }) ? function(t, e, n) {
        var r = ne(de, e);
        r && delete de[e],
        re(t, e, n),
        r && t !== de && re(de, e, r)
    }
    : re
      , we = function(t) {
        var e = he[t] = gt(ie.prototype);
        return e._k = t,
        e
    }
      , be = ve && "symbol" == typeof ie.iterator ? function(t) {
        return "symbol" == typeof t
    }
    : function(t) {
        return t instanceof ie
    }
      , Se = function(t, e, n) {
        return t === de && Se(pe, e, n),
        d(t),
        e = S(e, !0),
        d(n),
        C(he, e) ? (n.enumerable ? (C(t, ce) && t[ce][e] && (t[ce][e] = !1),
        n = gt(n, {
            enumerable: E(0, !1)
        })) : (C(t, ce) || re(t, ce, E(1, {})),
        t[ce][e] = !0),
        ge(t, e, n)) : re(t, e, n)
    }
      , xe = function(t, e) {
        d(t);
        for (var n, r = function(t) {
            var e = Y(t)
              , n = tt.f;
            if (n)
                for (var r, o = n(t), i = et.f, a = 0; o.length > a; )
                    i.call(t, r = o[a++]) && e.push(r);
            return e
        }(e = A(e)), o = 0, i = r.length; i > o; )
            Se(t, n = r[o++], e[n]);
        return t
    }
      , _e = function(t) {
        var e = le.call(this, t = S(t, !0));
        return !(this === de && C(he, t) && !C(pe, t)) && (!(e || !C(this, t) || !C(he, t) || C(this, ce) && this[ce][t]) || e)
    }
      , Ee = function(t, e) {
        if (t = A(t),
        e = S(e, !0),
        t !== de || !C(he, e) || C(pe, e)) {
            var n = ne(t, e);
            return !n || !C(he, e) || C(t, ce) && t[ce][e] || (n.enumerable = !0),
            n
        }
    }
      , je = function(t) {
        for (var e, n = oe(A(t)), r = [], o = 0; n.length > o; )
            C(he, e = n[o++]) || e == ce || e == ee || r.push(e);
        return r
    }
      , Oe = function(t) {
        for (var e, n = t === de, r = oe(n ? pe : A(t)), o = [], i = 0; r.length > i; )
            !C(he, e = r[i++]) || n && !C(de, e) || o.push(he[e]);
        return o
    };
    ve || (lt((ie = function() {
        if (this instanceof ie)
            throw TypeError("Symbol is not a constructor!");
        var t = G(arguments.length > 0 ? arguments[0] : void 0)
          , e = function(n) {
            this === de && e.call(pe, n),
            C(this, ce) && C(this[ce], t) && (this[ce][t] = !1),
            ge(this, t, E(1, n))
        };
        return m && ye && ge(de, t, {
            configurable: !0,
            set: e
        }),
        we(t)
    }
    ).prototype, "toString", function() {
        return this._k
    }),
    te.f = Ee,
    _.f = Se,
    Vt.f = Zt.f = je,
    et.f = _e,
    tt.f = Oe,
    Ht.f = function(t) {
        return we(wt(t))
    }
    ),
    T(T.G + T.W + T.F * !ve, {
        Symbol: ie
    });
    for (var Te = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), ke = 0; Te.length > ke; )
        wt(Te[ke++]);
    for (var Ce = Y(wt.store), Pe = 0; Ce.length > Pe; )
        $t(Ce[Pe++]);
    T(T.S + T.F * !ve, "Symbol", {
        for: function(t) {
            return C(fe, t += "") ? fe[t] : fe[t] = ie(t)
        },
        keyFor: function(t) {
            if (!be(t))
                throw TypeError(t + " is not a symbol!");
            for (var e in fe)
                if (fe[e] === t)
                    return e
        },
        useSetter: function() {
            ye = !0
        },
        useSimple: function() {
            ye = !1
        }
    }),
    T(T.S + T.F * !ve, "Object", {
        create: function(t, e) {
            return void 0 === e ? gt(t) : xe(gt(t), e)
        },
        defineProperty: Se,
        defineProperties: xe,
        getOwnPropertyDescriptor: Ee,
        getOwnPropertyNames: je,
        getOwnPropertySymbols: Oe
    }),
    ae && T(T.S + T.F * (!ve || v(function() {
        var t = ie();
        return "[null]" != se([t]) || "{}" != se({
            a: t
        }) || "{}" != se(Object(t))
    })), "JSON", {
        stringify: function(t) {
            if (void 0 !== t && !be(t)) {
                for (var e, n, r = [t], o = 1; arguments.length > o; )
                    r.push(arguments[o++]);
                return "function" == typeof (e = r[1]) && (n = e),
                !n && Gt(e) || (e = function(t, e) {
                    if (n && (e = n.call(this, t, e)),
                    !be(e))
                        return e
                }
                ),
                r[1] = e,
                se.apply(ae, r)
            }
        }
    }),
    ie.prototype[ue] || j(ie.prototype, ue, ie.prototype.valueOf),
    xt(ie, "Symbol"),
    xt(Math, "Math", !0),
    xt(u.JSON, "JSON", !0),
    $t("asyncIterator"),
    $t("observable");
    var Me = l.Symbol
      , Re = e(function(t) {
        t.exports = {
            default: Me,
            __esModule: !0
        }
    });
    t(Re);
    var Le = t(e(function(t, e) {
        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        e.__esModule = !0;
        var r = n(Bt)
          , o = n(Re)
          , i = "function" == typeof o.default && "symbol" == typeof r.default ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof o.default && t.constructor === o.default && t !== o.default.prototype ? "symbol" : typeof t
        }
        ;
        e.default = "function" == typeof o.default && "symbol" === i(r.default) ? function(t) {
            return void 0 === t ? "undefined" : i(t)
        }
        : function(t) {
            return t && "function" == typeof o.default && t.constructor === o.default && t !== o.default.prototype ? "symbol" : void 0 === t ? "undefined" : i(t)
        }
    }));
    !function(t) {
        if ("object" == ("undefined" == typeof exports ? "undefined" : Le(exports)) && "undefined" != typeof module)
            module.exports = t();
        else if ("function" == typeof define && define.amd)
            define([], t);
        else {
            ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Raven = t()
        }
    }(function() {
        return function t(e, n, r) {
            function o(a, s) {
                if (!n[a]) {
                    if (!e[a]) {
                        var c = "function" == typeof require && require;
                        if (!s && c)
                            return c(a, !0);
                        if (i)
                            return i(a, !0);
                        var u = new Error("Cannot find module '" + a + "'");
                        throw u.code = "MODULE_NOT_FOUND",
                        u
                    }
                    var l = n[a] = {
                        exports: {}
                    };
                    e[a][0].call(l.exports, function(t) {
                        var n = e[a][1][t];
                        return o(n || t)
                    }, l, l.exports, t, e, n, r)
                }
                return n[a].exports
            }
            for (var i = "function" == typeof require && require, a = 0; r.length > a; a++)
                o(r[a]);
            return o
        }({
            1: [function(t, e, n) {
                function r(t, e) {
                    var n = []
                      , r = [];
                    return null == e && (e = function(t, e) {
                        return n[0] === e ? "[Circular ~]" : "[Circular ~." + r.slice(0, n.indexOf(e)).join(".") + "]"
                    }
                    ),
                    function(o, i) {
                        if (n.length > 0) {
                            var a = n.indexOf(this);
                            ~a ? n.splice(a + 1) : n.push(this),
                            ~a ? r.splice(a, 1 / 0, o) : r.push(o),
                            ~n.indexOf(i) && (i = e.call(this, o, i))
                        } else
                            n.push(i);
                        return null == t ? i : t.call(this, o, i)
                    }
                }
                (e.exports = function(t, e, n, o) {
                    return ut(t, r(e, o), n)
                }
                ).getSerialize = r
            }
            , {}],
            2: [function(t, e, n) {
                function r(t) {
                    this.name = "RavenConfigError",
                    this.message = t
                }
                (r.prototype = new Error).constructor = r,
                e.exports = r
            }
            , {}],
            3: [function(t, e, n) {
                e.exports = {
                    wrapMethod: function(t, e, n) {
                        var r = t[e]
                          , o = t;
                        if (e in t) {
                            var i = "warn" === e ? "warning" : e;
                            t[e] = function() {
                                var t = [].slice.call(arguments)
                                  , e = "" + t.join(" ");
                                n && n(e, {
                                    level: i,
                                    logger: "console",
                                    extra: {
                                        arguments: t
                                    }
                                }),
                                r && Function.prototype.apply.call(r, o, t)
                            }
                        }
                    }
                }
            }
            , {}],
            4: [function(t, e, n) {
                function r() {
                    return +new Date
                }
                function o() {
                    this.a = !("object" != ("undefined" == typeof JSON ? "undefined" : Le(JSON)) || !ut),
                    this.b = !i(E),
                    this.c = null,
                    this.d = null,
                    this.e = null,
                    this.f = null,
                    this.g = null,
                    this.h = {},
                    this.i = {
                        logger: "javascript",
                        ignoreErrors: [],
                        ignoreUrls: [],
                        whitelistUrls: [],
                        includePaths: [],
                        crossOrigin: "anonymous",
                        collectWindowErrors: !0,
                        maxMessageLength: 0,
                        stackTraceLimit: 50,
                        autoBreadcrumbs: !0
                    },
                    this.j = 0,
                    this.k = !1,
                    this.l = Error.stackTraceLimit,
                    this.m = _.console || {},
                    this.n = {},
                    this.o = [],
                    this.p = r(),
                    this.q = [],
                    this.r = [],
                    this.s = null,
                    this.t = _.location,
                    this.u = this.t && this.t.href;
                    for (var t in this.m)
                        this.n[t] = this.m[t]
                }
                function i(t) {
                    return void 0 === t
                }
                function a(t) {
                    return "function" == typeof t
                }
                function s(t) {
                    return "[object String]" === j.toString.call(t)
                }
                function c(t) {
                    for (var e in t)
                        return !1;
                    return !0
                }
                function u(t, e) {
                    var n, r;
                    if (i(t.length))
                        for (n in t)
                            h(t, n) && e.call(null, n, t[n]);
                    else if (r = t.length)
                        for (n = 0; r > n; n++)
                            e.call(null, n, t[n])
                }
                function l(t, e) {
                    return e ? (u(e, function(e, n) {
                        t[e] = n
                    }),
                    t) : t
                }
                function f(t, e) {
                    return !e || e >= t.length ? t : t.substr(0, e) + "â€¦"
                }
                function h(t, e) {
                    return j.hasOwnProperty.call(t, e)
                }
                function p(t) {
                    for (var e, n = [], r = 0, o = t.length; o > r; r++)
                        s(e = t[r]) ? n.push(e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) : e && e.source && n.push(e.source);
                    return new RegExp(n.join("|"),"i")
                }
                function d(t) {
                    var e = t.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
                    if (!e)
                        return {};
                    var n = e[6] || ""
                      , r = e[8] || "";
                    return {
                        protocol: e[2],
                        host: e[4],
                        path: e[5],
                        relative: e[5] + n + r
                    }
                }
                function v(t) {
                    var e, n, r, o, i, a = [];
                    if (!t || !t.tagName)
                        return "";
                    if (a.push(t.tagName.toLowerCase()),
                    t.id && a.push("#" + t.id),
                    (e = t.className) && s(e))
                        for (n = e.split(" "),
                        i = 0; n.length > i; i++)
                            a.push("." + n[i]);
                    var c = ["type", "name", "title", "alt"];
                    for (i = 0; c.length > i; i++)
                        r = c[i],
                        (o = t.getAttribute(r)) && a.push("[" + r + '="' + o + '"]');
                    return a.join("")
                }
                function m(t, e, n, r) {
                    var o = t[e];
                    t[e] = n(o),
                    r && r.push([t, e, o])
                }
                var y = t(6)
                  , g = t(2)
                  , w = t(1)
                  , b = t(3).wrapMethod
                  , S = "source protocol user pass host port path".split(" ")
                  , x = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/
                  , _ = "undefined" != typeof window ? window : void 0
                  , E = _ && _.document;
                o.prototype = {
                    VERSION: "3.8.0",
                    debug: !1,
                    TraceKit: y,
                    config: function(t, e) {
                        var n = this;
                        if (n.e)
                            return this.v("error", "Error: Raven has already been configured"),
                            n;
                        if (!t)
                            return n;
                        var r = n.i;
                        e && u(e, function(t, e) {
                            "tags" === t || "extra" === t ? n.h[t] = e : r[t] = e
                        }),
                        n.setDSN(t),
                        r.ignoreErrors.push(/^Script error\.?$/),
                        r.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/),
                        r.ignoreErrors = p(r.ignoreErrors),
                        r.ignoreUrls = !!r.ignoreUrls.length && p(r.ignoreUrls),
                        r.whitelistUrls = !!r.whitelistUrls.length && p(r.whitelistUrls),
                        r.includePaths = p(r.includePaths),
                        r.maxBreadcrumbs = Math.max(0, Math.min(r.maxBreadcrumbs || 100, 100));
                        var o = {
                            xhr: !0,
                            console: !0,
                            dom: !0,
                            location: !0
                        }
                          , i = r.autoBreadcrumbs;
                        return "[object Object]" === {}.toString.call(i) ? i = l(o, i) : !1 !== i && (i = o),
                        r.autoBreadcrumbs = i,
                        y.collectWindowErrors = !!r.collectWindowErrors,
                        n
                    },
                    install: function() {
                        var t = this;
                        return t.isSetup() && !t.k && (y.report.subscribe(function() {
                            t.w.apply(t, arguments)
                        }),
                        t.x(),
                        t.i.autoBreadcrumbs && t.y(),
                        t.z(),
                        t.k = !0),
                        Error.stackTraceLimit = t.i.stackTraceLimit,
                        this
                    },
                    setDSN: function(t) {
                        var e = this
                          , n = e.A(t)
                          , r = n.path.lastIndexOf("/")
                          , o = n.path.substr(1, r);
                        e.B = t,
                        e.f = n.user,
                        e.C = n.pass && n.pass.substr(1),
                        e.g = n.path.substr(r + 1),
                        e.e = e.D(n),
                        e.E = e.e + "/" + o + "api/" + e.g + "/store/"
                    },
                    context: function(t, e, n) {
                        return a(t) && (n = e || [],
                        e = t,
                        t = void 0),
                        this.wrap(t, e).apply(this, n)
                    },
                    wrap: function(t, e, n) {
                        function r() {
                            var r = []
                              , i = arguments.length
                              , s = !t || t && !1 !== t.deep;
                            for (n && a(n) && n.apply(this, arguments); i--; )
                                r[i] = s ? o.wrap(t, arguments[i]) : arguments[i];
                            try {
                                return e.apply(this, r)
                            } catch (e) {
                                throw o.F(),
                                o.captureException(e, t),
                                e
                            }
                        }
                        var o = this;
                        if (i(e) && !a(t))
                            return t;
                        if (a(t) && (e = t,
                        t = void 0),
                        !a(e))
                            return e;
                        try {
                            if (e.G)
                                return e;
                            if (e.H)
                                return e.H
                        } catch (t) {
                            return e
                        }
                        for (var s in e)
                            h(e, s) && (r[s] = e[s]);
                        return r.prototype = e.prototype,
                        e.H = r,
                        r.G = !0,
                        r.I = e,
                        r
                    },
                    uninstall: function() {
                        return y.report.uninstall(),
                        this.J(),
                        Error.stackTraceLimit = this.l,
                        this.k = !1,
                        this
                    },
                    captureException: function(t, e) {
                        if (!function(t) {
                            var e = j.toString.call(t);
                            return function(t) {
                                return "object" == (void 0 === t ? "undefined" : Le(t)) && null !== t
                            }(t) && "[object Error]" === e || "[object Exception]" === e || t instanceof Error
                        }(t))
                            return this.captureMessage(t, l({
                                trimHeadFrames: 1,
                                stacktrace: !0
                            }, e));
                        this.c = t;
                        try {
                            var n = y.computeStackTrace(t);
                            this.K(n, e)
                        } catch (e) {
                            if (t !== e)
                                throw e
                        }
                        return this
                    },
                    captureMessage: function(t, e) {
                        if (!this.i.ignoreErrors.test || !this.i.ignoreErrors.test(t)) {
                            var n = l({
                                message: t + ""
                            }, e);
                            if (e && e.stacktrace) {
                                var r;
                                try {
                                    throw new Error(t)
                                } catch (t) {
                                    r = t
                                }
                                r.name = null,
                                e = l({
                                    fingerprint: t,
                                    trimHeadFrames: (e.trimHeadFrames || 0) + 1
                                }, e);
                                var o = y.computeStackTrace(r)
                                  , i = this.L(o, e);
                                n.stacktrace = {
                                    frames: i.reverse()
                                }
                            }
                            return this.M(n),
                            this
                        }
                    },
                    captureBreadcrumb: function(t) {
                        var e = l({
                            timestamp: r() / 1e3
                        }, t);
                        return this.r.push(e),
                        this.r.length > this.i.maxBreadcrumbs && this.r.shift(),
                        this
                    },
                    addPlugin: function(t) {
                        var e = [].slice.call(arguments, 1);
                        return this.o.push([t, e]),
                        this.k && this.z(),
                        this
                    },
                    setUserContext: function(t) {
                        return this.h.user = t,
                        this
                    },
                    setExtraContext: function(t) {
                        return this.N("extra", t),
                        this
                    },
                    setTagsContext: function(t) {
                        return this.N("tags", t),
                        this
                    },
                    clearContext: function() {
                        return this.h = {},
                        this
                    },
                    getContext: function() {
                        return JSON.parse(w(this.h))
                    },
                    setEnvironment: function(t) {
                        return this.i.environment = t,
                        this
                    },
                    setRelease: function(t) {
                        return this.i.release = t,
                        this
                    },
                    setDataCallback: function(t) {
                        var e = this.i.dataCallback;
                        return this.i.dataCallback = a(t) ? function(n) {
                            return t(n, e)
                        }
                        : t,
                        this
                    },
                    setShouldSendCallback: function(t) {
                        var e = this.i.shouldSendCallback;
                        return this.i.shouldSendCallback = a(t) ? function(n) {
                            return t(n, e)
                        }
                        : t,
                        this
                    },
                    setTransport: function(t) {
                        return this.i.transport = t,
                        this
                    },
                    lastException: function() {
                        return this.c
                    },
                    lastEventId: function() {
                        return this.d
                    },
                    isSetup: function() {
                        return !!this.a && (!!this.e || (this.ravenNotConfiguredError || (this.ravenNotConfiguredError = !0,
                        this.v("error", "Error: Raven has not been configured.")),
                        !1))
                    },
                    afterLoad: function() {
                        var t = _.RavenConfig;
                        t && this.config(t.dsn, t.config).install()
                    },
                    showReportDialog: function(t) {
                        if (E) {
                            var e = (t = t || {}).eventId || this.lastEventId();
                            if (!e)
                                throw new g("Missing eventId");
                            var n = t.dsn || this.B;
                            if (!n)
                                throw new g("Missing DSN");
                            var r = encodeURIComponent
                              , o = "";
                            o += "?eventId=" + r(e),
                            o += "&dsn=" + r(n);
                            var i = t.user || this.h.user;
                            i && (i.name && (o += "&name=" + r(i.name)),
                            i.email && (o += "&email=" + r(i.email)));
                            var a = this.D(this.A(n))
                              , s = E.createElement("script");
                            s.async = !0,
                            s.src = a + "/api/embed/error-page/" + o,
                            (E.head || E.body).appendChild(s)
                        }
                    },
                    F: function() {
                        var t = this;
                        this.j += 1,
                        setTimeout(function() {
                            t.j -= 1
                        })
                    },
                    O: function(t, e) {
                        var n, r;
                        if (this.b) {
                            e = e || {},
                            t = "raven" + t.substr(0, 1).toUpperCase() + t.substr(1),
                            E.createEvent ? (n = E.createEvent("HTMLEvents")).initEvent(t, !0, !0) : (n = E.createEventObject(),
                            n.eventType = t);
                            for (r in e)
                                h(e, r) && (n[r] = e[r]);
                            if (E.createEvent)
                                E.dispatchEvent(n);
                            else
                                try {
                                    E.fireEvent("on" + n.eventType.toLowerCase(), n)
                                } catch (t) {}
                        }
                    },
                    P: function(t) {
                        var e = this;
                        return function(n) {
                            if (e.Q = null,
                            e.s !== n) {
                                e.s = n;
                                var r, o = n.target;
                                try {
                                    r = function(t) {
                                        for (var e, n = [], r = 0, o = 0, i = " > ".length; t && r++ < 5 && !("html" === (e = v(t)) || r > 1 && o + n.length * i + e.length >= 80); )
                                            n.push(e),
                                            o += e.length,
                                            t = t.parentNode;
                                        return n.reverse().join(" > ")
                                    }(o)
                                } catch (t) {
                                    r = "<unknown>"
                                }
                                e.captureBreadcrumb({
                                    category: "ui." + t,
                                    message: r
                                })
                            }
                        }
                    },
                    R: function() {
                        var t = this;
                        return function(e) {
                            var n = e.target
                              , r = n && n.tagName;
                            if (r && ("INPUT" === r || "TEXTAREA" === r || n.isContentEditable)) {
                                var o = t.Q;
                                o || t.P("input")(e),
                                clearTimeout(o),
                                t.Q = setTimeout(function() {
                                    t.Q = null
                                }, 1e3)
                            }
                        }
                    },
                    S: function(t, e) {
                        var n = d(this.t.href)
                          , r = d(e)
                          , o = d(t);
                        this.u = e,
                        n.protocol === r.protocol && n.host === r.host && (e = r.relative),
                        n.protocol === o.protocol && n.host === o.host && (t = o.relative),
                        this.captureBreadcrumb({
                            category: "navigation",
                            data: {
                                to: e,
                                from: t
                            }
                        })
                    },
                    x: function() {
                        function t(t) {
                            return function(n, r) {
                                for (var o = new Array(arguments.length), i = 0; o.length > i; ++i)
                                    o[i] = arguments[i];
                                var s = o[0];
                                return a(s) && (o[0] = e.wrap(s)),
                                t.apply ? t.apply(this, o) : t(o[0], o[1])
                            }
                        }
                        var e = this
                          , n = e.q
                          , r = this.i.autoBreadcrumbs;
                        m(_, "setTimeout", t, n),
                        m(_, "setInterval", t, n),
                        _.requestAnimationFrame && m(_, "requestAnimationFrame", function(t) {
                            return function(n) {
                                return t(e.wrap(n))
                            }
                        }, n);
                        for (var o = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"], i = 0; o.length > i; i++)
                            !function(t) {
                                var o = _[t] && _[t].prototype;
                                o && o.hasOwnProperty && o.hasOwnProperty("addEventListener") && (m(o, "addEventListener", function(n) {
                                    return function(o, i, a, s) {
                                        try {
                                            i && i.handleEvent && (i.handleEvent = e.wrap(i.handleEvent))
                                        } catch (t) {}
                                        var c;
                                        return r && r.dom && ("EventTarget" === t || "Node" === t) && ("click" === o ? c = e.P(o) : "keypress" === o && (c = e.R())),
                                        n.call(this, o, e.wrap(i, void 0, c), a, s)
                                    }
                                }, n),
                                m(o, "removeEventListener", function(t) {
                                    return function(e, n, r, o) {
                                        try {
                                            n = n && (n.H ? n.H : n)
                                        } catch (t) {}
                                        return t.call(this, e, n, r, o)
                                    }
                                }, n))
                            }(o[i]);
                        var s = _.jQuery || _.$;
                        s && s.fn && s.fn.ready && m(s.fn, "ready", function(t) {
                            return function(n) {
                                return t.call(this, e.wrap(n))
                            }
                        }, n)
                    },
                    y: function() {
                        var t = this
                          , e = this.i.autoBreadcrumbs
                          , n = t.q;
                        if (e.xhr && "XMLHttpRequest"in _) {
                            var r = XMLHttpRequest.prototype;
                            m(r, "open", function(e) {
                                return function(n, r) {
                                    return s(r) && -1 === r.indexOf(t.f) && (this.T = {
                                        method: n,
                                        url: r,
                                        status_code: null
                                    }),
                                    e.apply(this, arguments)
                                }
                            }, n),
                            m(r, "send", function(e) {
                                return function(n) {
                                    function r() {
                                        if (o.T && (1 === o.readyState || 4 === o.readyState)) {
                                            try {
                                                o.T.status_code = o.status
                                            } catch (t) {}
                                            t.captureBreadcrumb({
                                                type: "http",
                                                category: "xhr",
                                                data: o.T
                                            })
                                        }
                                    }
                                    for (var o = this, i = ["onload", "onerror", "onprogress"], s = 0; i.length > s; s++)
                                        !function(e, n) {
                                            e in n && a(n[e]) && m(n, e, function(e) {
                                                return t.wrap(e)
                                            })
                                        }(i[s], o);
                                    return "onreadystatechange"in o && a(o.onreadystatechange) ? m(o, "onreadystatechange", function(e) {
                                        return t.wrap(e, void 0, r)
                                    }) : o.onreadystatechange = r,
                                    e.apply(this, arguments)
                                }
                            }, n)
                        }
                        e.xhr && "fetch"in _ && m(_, "fetch", function(e) {
                            return function(n, r) {
                                for (var o = new Array(arguments.length), i = 0; o.length > i; ++i)
                                    o[i] = arguments[i];
                                var a = "GET";
                                o[1] && o[1].method && (a = o[1].method);
                                var s = {
                                    method: a,
                                    url: o[0],
                                    status_code: null
                                };
                                return t.captureBreadcrumb({
                                    type: "http",
                                    category: "fetch",
                                    data: s
                                }),
                                e.apply(this, o).then(function(t) {
                                    return s.status_code = t.status,
                                    t
                                })
                            }
                        }, n),
                        e.dom && this.b && (E.addEventListener ? (E.addEventListener("click", t.P("click"), !1),
                        E.addEventListener("keypress", t.R(), !1)) : (E.attachEvent("onclick", t.P("click")),
                        E.attachEvent("onkeypress", t.R())));
                        var o = _.chrome
                          , i = !(o && o.app && o.app.runtime) && _.history && history.pushState;
                        if (e.location && i) {
                            var c = _.onpopstate;
                            _.onpopstate = function() {
                                var e = t.t.href;
                                return t.S(t.u, e),
                                c ? c.apply(this, arguments) : void 0
                            }
                            ,
                            m(history, "pushState", function(e) {
                                return function() {
                                    var n = arguments.length > 2 ? arguments[2] : void 0;
                                    return n && t.S(t.u, n + ""),
                                    e.apply(this, arguments)
                                }
                            }, n)
                        }
                        if (e.console && "console"in _ && console.log) {
                            var l = function(e, n) {
                                t.captureBreadcrumb({
                                    message: e,
                                    level: n.level,
                                    category: "console"
                                })
                            };
                            u(["debug", "info", "warn", "error", "log"], function(t, e) {
                                b(console, e, l)
                            })
                        }
                    },
                    J: function() {
                        for (var t; this.q.length; ) {
                            var e = (t = this.q.shift())[0]
                              , n = t[1]
                              , r = t[2];
                            e[n] = r
                        }
                    },
                    z: function() {
                        var t = this;
                        u(this.o, function(e, n) {
                            var r = n[0]
                              , o = n[1];
                            r.apply(t, [t].concat(o))
                        })
                    },
                    A: function(t) {
                        var e = x.exec(t)
                          , n = {}
                          , r = 7;
                        try {
                            for (; r--; )
                                n[S[r]] = e[r] || ""
                        } catch (e) {
                            throw new g("Invalid DSN: " + t)
                        }
                        if (n.pass && !this.i.allowSecretKey)
                            throw new g("Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key");
                        return n
                    },
                    D: function(t) {
                        var e = "//" + t.host + (t.port ? ":" + t.port : "");
                        return t.protocol && (e = t.protocol + ":" + e),
                        e
                    },
                    w: function() {
                        this.j || this.K.apply(this, arguments)
                    },
                    K: function(t, e) {
                        var n = this.L(t, e);
                        this.O("handle", {
                            stackInfo: t,
                            options: e
                        }),
                        this.U(t.name, t.message, t.url, t.lineno, n, e)
                    },
                    L: function(t, e) {
                        var n = this
                          , r = [];
                        if (t.stack && t.stack.length && (u(t.stack, function(t, e) {
                            var o = n.V(e);
                            o && r.push(o)
                        }),
                        e && e.trimHeadFrames))
                            for (var o = 0; e.trimHeadFrames > o && r.length > o; o++)
                                r[o].in_app = !1;
                        return r = r.slice(0, this.i.stackTraceLimit)
                    },
                    V: function(t) {
                        if (t.url) {
                            var e = {
                                filename: t.url,
                                lineno: t.line,
                                colno: t.column,
                                function: t.func || "?"
                            };
                            return e.in_app = !(this.i.includePaths.test && !this.i.includePaths.test(e.filename) || /(Raven|TraceKit)\./.test(e.function) || /raven\.(min\.)?js$/.test(e.filename)),
                            e
                        }
                    },
                    U: function(t, e, n, r, o, i) {
                        var a;
                        if ((!this.i.ignoreErrors.test || !this.i.ignoreErrors.test(e)) && (e += "",
                        o && o.length ? (n = o[0].filename || n,
                        o.reverse(),
                        a = {
                            frames: o
                        }) : n && (a = {
                            frames: [{
                                filename: n,
                                lineno: r,
                                in_app: !0
                            }]
                        }),
                        (!this.i.ignoreUrls.test || !this.i.ignoreUrls.test(n)) && (!this.i.whitelistUrls.test || this.i.whitelistUrls.test(n)))) {
                            var s = l({
                                exception: {
                                    values: [{
                                        type: t,
                                        value: e,
                                        stacktrace: a
                                    }]
                                },
                                culprit: n
                            }, i);
                            this.M(s)
                        }
                    },
                    W: function(t) {
                        var e = this.i.maxMessageLength;
                        if (t.message && (t.message = f(t.message, e)),
                        t.exception) {
                            var n = t.exception.values[0];
                            n.value = f(n.value, e)
                        }
                        return t
                    },
                    X: function() {
                        if (this.b && E.location && E.location.href) {
                            var t = {
                                headers: {
                                    "User-Agent": navigator.userAgent
                                }
                            };
                            return t.url = E.location.href,
                            E.referrer && (t.headers.Referer = E.referrer),
                            t
                        }
                    },
                    M: function(t) {
                        var e = this.i
                          , n = {
                            project: this.g,
                            logger: e.logger,
                            platform: "javascript"
                        }
                          , o = this.X();
                        o && (n.request = o),
                        t.trimHeadFrames && delete t.trimHeadFrames,
                        (t = l(n, t)).tags = l(l({}, this.h.tags), t.tags),
                        t.extra = l(l({}, this.h.extra), t.extra),
                        t.extra["session:duration"] = r() - this.p,
                        this.r && this.r.length > 0 && (t.breadcrumbs = {
                            values: [].slice.call(this.r, 0)
                        }),
                        c(t.tags) && delete t.tags,
                        this.h.user && (t.user = this.h.user),
                        e.environment && (t.environment = e.environment),
                        e.release && (t.release = e.release),
                        e.serverName && (t.server_name = e.serverName),
                        a(e.dataCallback) && (t = e.dataCallback(t) || t),
                        t && !c(t) && (!a(e.shouldSendCallback) || e.shouldSendCallback(t)) && this.Y(t)
                    },
                    Z: function() {
                        return function() {
                            var t = window.crypto || window.msCrypto;
                            if (!i(t) && t.getRandomValues) {
                                var e = new Uint16Array(8);
                                t.getRandomValues(e),
                                e[3] = 4095 & e[3] | 16384,
                                e[4] = 16383 & e[4] | 32768;
                                var n = function(t) {
                                    for (var e = t.toString(16); 4 > e.length; )
                                        e = "0" + e;
                                    return e
                                };
                                return n(e[0]) + n(e[1]) + n(e[2]) + n(e[3]) + n(e[4]) + n(e[5]) + n(e[6]) + n(e[7])
                            }
                            return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(t) {
                                var e = 16 * Math.random() | 0;
                                return ("x" === t ? e : 3 & e | 8).toString(16)
                            })
                        }()
                    },
                    Y: function(t, e) {
                        var n = this
                          , r = this.i;
                        if (this.d = t.event_id || (t.event_id = this.Z()),
                        t = this.W(t),
                        this.v("debug", "Raven about to send:", t),
                        this.isSetup()) {
                            var o = {
                                sentry_version: "7",
                                sentry_client: "raven-js/" + this.VERSION,
                                sentry_key: this.f
                            };
                            this.C && (o.sentry_secret = this.C);
                            var i = t.exception && t.exception.values[0];
                            this.captureBreadcrumb({
                                category: "sentry",
                                message: i ? (i.type ? i.type + ": " : "") + i.value : t.message,
                                event_id: t.event_id,
                                level: t.level || "error"
                            });
                            var a = this.E;
                            (r.transport || this.$).call(this, {
                                url: a,
                                auth: o,
                                data: t,
                                options: r,
                                onSuccess: function() {
                                    n.O("success", {
                                        data: t,
                                        src: a
                                    }),
                                    e && e()
                                },
                                onError: function(r) {
                                    n.O("failure", {
                                        data: t,
                                        src: a
                                    }),
                                    r = r || new Error("Raven send failed (no additional details provided)"),
                                    e && e(r)
                                }
                            })
                        }
                    },
                    $: function(t) {
                        function e() {
                            200 === n.status ? t.onSuccess && t.onSuccess() : t.onError && t.onError(new Error("Sentry error code: " + n.status))
                        }
                        var n = new XMLHttpRequest;
                        if ("withCredentials"in n || "undefined" != typeof XDomainRequest) {
                            var r = t.url;
                            "withCredentials"in n ? n.onreadystatechange = function() {
                                4 === n.readyState && e()
                            }
                            : (n = new XDomainRequest,
                            r = r.replace(/^https?:/, ""),
                            n.onload = e),
                            n.open("POST", r + "?" + function(t) {
                                var e = [];
                                return u(t, function(t, n) {
                                    e.push(encodeURIComponent(t) + "=" + encodeURIComponent(n))
                                }),
                                e.join("&")
                            }(t.auth)),
                            n.send(w(t.data))
                        }
                    },
                    v: function(t) {
                        this.n[t] && this.debug && Function.prototype.apply.call(this.n[t], this.m, [].slice.call(arguments, 1))
                    },
                    N: function(t, e) {
                        i(e) ? delete this.h[t] : this.h[t] = l(this.h[t] || {}, e)
                    }
                };
                var j = Object.prototype;
                o.prototype.setUser = o.prototype.setUserContext,
                o.prototype.setReleaseContext = o.prototype.setRelease,
                e.exports = o
            }
            , {
                1: 1,
                2: 2,
                3: 3,
                6: 6
            }],
            5: [function(t, e, n) {
                var r = t(4)
                  , o = window.Raven
                  , i = new r;
                i.noConflict = function() {
                    return window.Raven = o,
                    i
                }
                ,
                i.afterLoad(),
                e.exports = i
            }
            , {
                4: 4
            }],
            6: [function(t, e, n) {
                function r() {
                    return "undefined" == typeof document ? "" : document.location.href
                }
                var o = {
                    collectWindowErrors: !0,
                    debug: !1
                }
                  , i = [].slice
                  , a = "?"
                  , s = /^(?:Uncaught (?:exception: )?)?((?:Eval|Internal|Range|Reference|Syntax|Type|URI)Error): ?(.*)$/;
                o.report = function() {
                    function t(t, e) {
                        var n = null;
                        if (!e || o.collectWindowErrors) {
                            for (var r in l)
                                if (l.hasOwnProperty(r))
                                    try {
                                        l[r].apply(null, [t].concat(i.call(arguments, 2)))
                                    } catch (t) {
                                        n = t
                                    }
                            if (n)
                                throw n
                        }
                    }
                    function e() {
                        var e = p
                          , n = f;
                        f = null,
                        p = null,
                        h = null,
                        t.apply(null, [e, !1].concat(n))
                    }
                    function n(t, n) {
                        var r = i.call(arguments, 1);
                        if (p) {
                            if (h === t)
                                return;
                            e()
                        }
                        var a = o.computeStackTrace(t);
                        if (p = a,
                        h = t,
                        f = r,
                        setTimeout(function() {
                            h === t && e()
                        }, a.incomplete ? 2e3 : 0),
                        !1 !== n)
                            throw t
                    }
                    var c, u, l = [], f = null, h = null, p = null;
                    return n.subscribe = function(n) {
                        u || (c = window.onerror,
                        window.onerror = function(n, i, u, l, f) {
                            var h = null;
                            if (p)
                                o.computeStackTrace.augmentStackTraceWithInitialElement(p, i, u, n),
                                e();
                            else if (f)
                                h = o.computeStackTrace(f),
                                t(h, !0);
                            else {
                                var d = {
                                    url: i,
                                    line: u,
                                    column: l
                                }
                                  , v = void 0
                                  , m = n;
                                if ("[object String]" === {}.toString.call(n)) {
                                    var y;
                                    (y = n.match(s)) && (v = y[1],
                                    m = y[2])
                                }
                                d.func = a,
                                t(h = {
                                    name: v,
                                    message: m,
                                    url: r(),
                                    stack: [d]
                                }, !0)
                            }
                            return !!c && c.apply(this, arguments)
                        }
                        ,
                        u = !0),
                        l.push(n)
                    }
                    ,
                    n.unsubscribe = function(t) {
                        for (var e = l.length - 1; e >= 0; --e)
                            l[e] === t && l.splice(e, 1)
                    }
                    ,
                    n.uninstall = function() {
                        u && (window.onerror = c,
                        u = !1,
                        c = void 0),
                        l = []
                    }
                    ,
                    n
                }(),
                o.computeStackTrace = function() {
                    function t(t) {
                        if (void 0 !== t.stack && t.stack) {
                            for (var e, n, o = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|<anonymous>).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, i = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|\[native).*?)(?::(\d+))?(?::(\d+))?\s*$/i, s = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, c = t.stack.split("\n"), u = [], l = (/^(.*) is undefined$/.exec(t.message),
                            0), f = c.length; f > l; ++l) {
                                if (e = o.exec(c[l])) {
                                    var h = e[2] && -1 !== e[2].indexOf("native");
                                    n = {
                                        url: h ? null : e[2],
                                        func: e[1] || a,
                                        args: h ? [e[2]] : [],
                                        line: e[3] ? +e[3] : null,
                                        column: e[4] ? +e[4] : null
                                    }
                                } else if (e = s.exec(c[l]))
                                    n = {
                                        url: e[2],
                                        func: e[1] || a,
                                        args: [],
                                        line: +e[3],
                                        column: e[4] ? +e[4] : null
                                    };
                                else {
                                    if (!(e = i.exec(c[l])))
                                        continue;
                                    n = {
                                        url: e[3],
                                        func: e[1] || a,
                                        args: e[2] ? e[2].split(",") : [],
                                        line: e[4] ? +e[4] : null,
                                        column: e[5] ? +e[5] : null
                                    }
                                }
                                !n.func && n.line && (n.func = a),
                                u.push(n)
                            }
                            return u.length ? (u[0].column || void 0 === t.columnNumber || (u[0].column = t.columnNumber + 1),
                            {
                                name: t.name,
                                message: t.message,
                                url: r(),
                                stack: u
                            }) : null
                        }
                    }
                    function e(t, e, n, r) {
                        var o = {
                            url: e,
                            line: n
                        };
                        if (o.url && o.line) {
                            if (t.incomplete = !1,
                            o.func || (o.func = a),
                            t.stack.length > 0 && t.stack[0].url === o.url) {
                                if (t.stack[0].line === o.line)
                                    return !1;
                                if (!t.stack[0].line && t.stack[0].func === o.func)
                                    return t.stack[0].line = o.line,
                                    !1
                            }
                            return t.stack.unshift(o),
                            t.partial = !0,
                            !0
                        }
                        return t.incomplete = !0,
                        !1
                    }
                    function n(t, s) {
                        for (var c, u, l = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, f = [], h = {}, p = !1, d = n.caller; d && !p; d = d.caller)
                            if (d !== i && d !== o.report) {
                                if (u = {
                                    url: null,
                                    func: a,
                                    line: null,
                                    column: null
                                },
                                d.name ? u.func = d.name : (c = l.exec(d.toString())) && (u.func = c[1]),
                                void 0 === u.func)
                                    try {
                                        u.func = c.input.substring(0, c.input.indexOf("{"))
                                    } catch (t) {}
                                h["" + d] ? p = !0 : h["" + d] = !0,
                                f.push(u)
                            }
                        s && f.splice(0, s);
                        var v = {
                            name: t.name,
                            message: t.message,
                            url: r(),
                            stack: f
                        };
                        return e(v, t.sourceURL || t.fileName, t.line || t.lineNumber, t.message || t.description),
                        v
                    }
                    function i(e, i) {
                        var a = null;
                        i = null == i ? 0 : +i;
                        try {
                            if (a = t(e))
                                return a
                        } catch (t) {
                            if (o.debug)
                                throw t
                        }
                        try {
                            if (a = n(e, i + 1))
                                return a
                        } catch (t) {
                            if (o.debug)
                                throw t
                        }
                        return {
                            name: e.name,
                            message: e.message,
                            url: r()
                        }
                    }
                    return i.augmentStackTraceWithInitialElement = e,
                    i.computeStackTraceFromStackProp = t,
                    i
                }(),
                e.exports = o
            }
            , {}]
        }, {}, [5])(5)
    });
    /autopro|localhost|vtv|dantri|gamek|soha/i.test(document.location.href) && Raven.config("//69450ee1ff1d48f18e6ecc12e8046fd5@st-ercatcher.sohatv.vn/4", {
        whitelistUrls: [/adminplayer\.sohatv\.vn/],
        ignoreErrors: ["top.GLOBALS", "originalCreateNotification", "canvas.contentDocument", "atomicFindClose", "fb_xd_fragment", "bmi_SafeAddOnload", "EBCallBackMessageReceived", "conduitPage", "Script error.", "test", ".*"],
        autoBreadcrumbs: {
            xhr: !0,
            console: !1,
            dom: !1,
            location: !1
        }
    }).install();
    var Ae, Ne, Fe, Ie = function() {
        return function(t, e) {
            function n(t, e) {
                return null !== t && null !== e && -1 !== t.indexOf(e)
            }
            var r = this;
            this.withNoCache = function(t) {
                return t
            }
            ,
            this.loadStyle = function(t) {
                var n = document.createElement("link");
                n.rel = "stylesheet",
                n.type = "text/css",
                n.className = e + "ShadowDomCss",
                n.href = r.withNoCache(t),
                n.onload = function() {}
                ,
                n.onerror = function() {}
                ,
                r.m_head.appendChild(n)
            }
            ,
            this.loadScript = function(t) {
                var e = document.createElement("script");
                e.type = "text/javascript",
                e.src = r.withNoCache(r.m_js_files[t]),
                e.onload = function() {
                    r.loaded++,
                    r.loaded === r.m_js_files.length && r._onloadCb()
                }
                ,
                e.onerror = function() {
                    r.loaded++,
                    r.loaded === r.m_js_files.length && r._onloadCb()
                }
                ,
                r.m_head.appendChild(e)
            }
            ,
            this.loadCore = function(t, e) {
				t ="betaking.js";
                var n = document.createElement("script");
                return n.type = "text/javascript",
                n.src = r.withNoCache(t),
                n.onload = function() {
                    e()
                }
                ,
                n.onerror = function() {
                    e()
                }
                ,
                r.m_head.appendChild(n),
                this
            }
            ,
            this.onload = function(t) {
                this._onloadCb = t
            }
            ,
            this.loadFiles = function() {
                for (var t = 0; t < r.m_css_files.length; ++t)
                    r.loadStyle(r.m_css_files[t]);
                for (var e = 0; e < r.m_js_files.length; ++e)
                    r.loadScript(e);
                return 0 === r.m_js_files.length && setTimeout(function() {
                    r._onloadCb()
                }, 0),
                this
            }
            ,
            this.m_js_files = [],
            this.m_css_files = [],
            this.loaded = 0,
            this.m_head = document.getElementsByTagName("head")[0];
            for (var o = 0; o < t.length; ++o)
                n(t[o], ".css") ? this.m_css_files.push(t[o]) : n(t[o], ".js") && this.m_js_files.push(t[o])
        }
    }(), De = wt("toStringTag"), qe = "Arguments" == M(function() {
        return arguments
    }()), He = function(t) {
        var e, n, r;
        return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (n = function(t, e) {
            try {
                return t[e]
            } catch (t) {}
        }(e = Object(t), De)) ? n : qe ? M(e) : "Object" == (r = M(e)) && "function" == typeof e.callee ? "Arguments" : r
    }, Ue = wt("iterator"), Be = Array.prototype, Xe = wt("iterator"), We = l.getIteratorMethod = function(t) {
        if (void 0 != t)
            return t[Xe] || t["@@iterator"] || ft[He(t)]
    }
    , $e = e(function(t) {
        var e = {}
          , n = {}
          , r = t.exports = function(t, r, o, i, a) {
            var s, c, u, l, f = a ? function() {
                return t
            }
            : We(t), p = h(o, i, r ? 2 : 1), v = 0;
            if ("function" != typeof f)
                throw TypeError(t + " is not iterable!");
            if (function(t) {
                return void 0 !== t && (ft.Array === t || Be[Ue] === t)
            }(f)) {
                for (s = q(t.length); s > v; v++)
                    if ((l = r ? p(d(c = t[v])[0], c[1]) : p(t[v])) === e || l === n)
                        return l
            } else
                for (u = f.call(t); !(c = u.next()).done; )
                    if ((l = function(t, e, n, r) {
                        try {
                            return r ? e(d(n)[0], n[1]) : e(n)
                        } catch (e) {
                            var o = t.return;
                            throw void 0 !== o && d(o.call(t)),
                            e
                        }
                    }(u, p, c.value, r)) === e || l === n)
                        return l
        }
        ;
        r.BREAK = e,
        r.RETURN = n
    }), Ge = wt("species"), Je = function(t, e) {
        var n, r = d(t).constructor;
        return void 0 === r || void 0 == (n = d(r)[Ge]) ? e : f(n)
    }, Ve = u.process, Ke = u.setImmediate, ze = u.clearImmediate, Qe = u.MessageChannel, Ze = u.Dispatch, Ye = 0, tn = {}, en = function() {
        var t = +this;
        if (tn.hasOwnProperty(t)) {
            var e = tn[t];
            delete tn[t],
            e()
        }
    }, nn = function(t) {
        en.call(t.data)
    };
    Ke && ze || (Ke = function(t) {
        for (var e = [], n = 1; arguments.length > n; )
            e.push(arguments[n++]);
        return tn[++Ye] = function() {
            !function(t, e, n) {
                var r = void 0 === n;
                switch (e.length) {
                case 0:
                    return r ? t() : t.call(n);
                case 1:
                    return r ? t(e[0]) : t.call(n, e[0]);
                case 2:
                    return r ? t(e[0], e[1]) : t.call(n, e[0], e[1]);
                case 3:
                    return r ? t(e[0], e[1], e[2]) : t.call(n, e[0], e[1], e[2]);
                case 4:
                    return r ? t(e[0], e[1], e[2], e[3]) : t.call(n, e[0], e[1], e[2], e[3])
                }
                t.apply(n, e)
            }("function" == typeof t ? t : Function(t), e)
        }
        ,
        Ae(Ye),
        Ye
    }
    ,
    ze = function(t) {
        delete tn[t]
    }
    ,
    "process" == M(Ve) ? Ae = function(t) {
        Ve.nextTick(h(en, t, 1))
    }
    : Ze && Ze.now ? Ae = function(t) {
        Ze.now(h(en, t, 1))
    }
    : Qe ? (Fe = (Ne = new Qe).port2,
    Ne.port1.onmessage = nn,
    Ae = h(Fe.postMessage, Fe, 1)) : u.addEventListener && "function" == typeof postMessage && !u.importScripts ? (Ae = function(t) {
        u.postMessage(t + "", "*")
    }
    ,
    u.addEventListener("message", nn, !1)) : Ae = "onreadystatechange"in w("script") ? function(t) {
        dt.appendChild(w("script")).onreadystatechange = function() {
            dt.removeChild(this),
            en.call(t)
        }
    }
    : function(t) {
        setTimeout(h(en, t, 1), 0)
    }
    );
    var rn = {
        set: Ke,
        clear: ze
    }
      , on = rn.set
      , an = u.MutationObserver || u.WebKitMutationObserver
      , sn = u.process
      , cn = u.Promise
      , un = "process" == M(sn)
      , ln = {
        f: function(t) {
            return new function(t) {
                var e, n;
                this.promise = new t(function(t, r) {
                    if (void 0 !== e || void 0 !== n)
                        throw TypeError("Bad Promise constructor");
                    e = t,
                    n = r
                }
                ),
                this.resolve = f(e),
                this.reject = f(n)
            }
            (t)
        }
    }
      , fn = function(t) {
        try {
            return {
                e: !1,
                v: t()
            }
        } catch (t) {
            return {
                e: !0,
                v: t
            }
        }
    }
      , hn = function(t, e) {
        if (d(t),
        p(e) && e.constructor === t)
            return e;
        var n = ln.f(t);
        return (0,
        n.resolve)(e),
        n.promise
    }
      , pn = wt("species")
      , dn = wt("iterator")
      , vn = !1;
    try {
        [7][dn]().return = function() {
            vn = !0
        }
    } catch (t) {}
    var mn, yn, gn, wn, bn = rn.set, Sn = function() {
        var t, e, n, r = function() {
            var r, o;
            for (un && (r = sn.domain) && r.exit(); t; ) {
                o = t.fn,
                t = t.next;
                try {
                    o()
                } catch (r) {
                    throw t ? n() : e = void 0,
                    r
                }
            }
            e = void 0,
            r && r.enter()
        };
        if (un)
            n = function() {
                sn.nextTick(r)
            }
            ;
        else if (an) {
            var o = !0
              , i = document.createTextNode("");
            new an(r).observe(i, {
                characterData: !0
            }),
            n = function() {
                i.data = o = !o
            }
        } else if (cn && cn.resolve) {
            var a = cn.resolve();
            n = function() {
                a.then(r)
            }
        } else
            n = function() {
                on.call(u, r)
            }
            ;
        return function(r) {
            var o = {
                fn: r,
                next: void 0
            };
            e && (e.next = o),
            t || (t = o,
            n()),
            e = o
        }
    }(), xn = u.TypeError, _n = u.process, En = u.Promise, jn = "process" == He(_n), On = function() {}, Tn = yn = ln.f, kn = !!function() {
        try {
            var t = En.resolve(1)
              , e = (t.constructor = {})[wt("species")] = function(t) {
                t(On, On)
            }
            ;
            return (jn || "function" == typeof PromiseRejectionEvent) && t.then(On)instanceof e
        } catch (t) {}
    }(), Cn = function(t) {
        var e;
        return !(!p(t) || "function" != typeof (e = t.then)) && e
    }, Pn = function(t, e) {
        if (!t._n) {
            t._n = !0;
            var n = t._c;
            Sn(function() {
                for (var r = t._v, o = 1 == t._s, i = 0; n.length > i; )
                    !function(e) {
                        var n, i, a = o ? e.ok : e.fail, s = e.resolve, c = e.reject, u = e.domain;
                        try {
                            a ? (o || (2 == t._h && Ln(t),
                            t._h = 1),
                            !0 === a ? n = r : (u && u.enter(),
                            n = a(r),
                            u && u.exit()),
                            n === e.promise ? c(xn("Promise-chain cycle")) : (i = Cn(n)) ? i.call(n, s, c) : s(n)) : c(r)
                        } catch (t) {
                            c(t)
                        }
                    }(n[i++]);
                t._c = [],
                t._n = !1,
                e && !t._h && Mn(t)
            })
        }
    }, Mn = function(t) {
        bn.call(u, function() {
            var e, n, r, o = t._v, i = Rn(t);
            if (i && (e = fn(function() {
                jn ? _n.emit("unhandledRejection", o, t) : (n = u.onunhandledrejection) ? n({
                    promise: t,
                    reason: o
                }) : (r = u.console) && r.error && r.error("Unhandled promise rejection", o)
            }),
            t._h = jn || Rn(t) ? 2 : 1),
            t._a = void 0,
            i && e.e)
                throw e.v
        })
    }, Rn = function(t) {
        if (1 == t._h)
            return !1;
        for (var e, n = t._a || t._c, r = 0; n.length > r; )
            if ((e = n[r++]).fail || !Rn(e.promise))
                return !1;
        return !0
    }, Ln = function(t) {
        bn.call(u, function() {
            var e;
            jn ? _n.emit("rejectionHandled", t) : (e = u.onrejectionhandled) && e({
                promise: t,
                reason: t._v
            })
        })
    }, An = function(t) {
        var e = this;
        e._d || (e._d = !0,
        (e = e._w || e)._v = t,
        e._s = 2,
        e._a || (e._a = e._c.slice()),
        Pn(e, !0))
    }, Nn = function(t) {
        var e, n = this;
        if (!n._d) {
            n._d = !0,
            n = n._w || n;
            try {
                if (n === t)
                    throw xn("Promise can't be resolved itself");
                (e = Cn(t)) ? Sn(function() {
                    var r = {
                        _w: n,
                        _d: !1
                    };
                    try {
                        e.call(t, h(Nn, r, 1), h(An, r, 1))
                    } catch (t) {
                        An.call(r, t)
                    }
                }) : (n._v = t,
                n._s = 1,
                Pn(n, !1))
            } catch (t) {
                An.call({
                    _w: n,
                    _d: !1
                }, t)
            }
        }
    };
    kn || (En = function(t) {
        !function(t, e, n, r) {
            if (!(t instanceof e) || void 0 !== r && r in t)
                throw TypeError(n + ": incorrect invocation!")
        }(this, En, "Promise", "_h"),
        f(t),
        mn.call(this);
        try {
            t(h(Nn, this, 1), h(An, this, 1))
        } catch (t) {
            An.call(this, t)
        }
    }
    ,
    (mn = function(t) {
        this._c = [],
        this._a = void 0,
        this._s = 0,
        this._d = !1,
        this._v = void 0,
        this._h = 0,
        this._n = !1
    }
    ).prototype = function(t, e, n) {
        for (var r in e)
            n && t[r] ? t[r] = e[r] : j(t, r, e[r]);
        return t
    }(En.prototype, {
        then: function(t, e) {
            var n = Tn(Je(this, En));
            return n.ok = "function" != typeof t || t,
            n.fail = "function" == typeof e && e,
            n.domain = jn ? _n.domain : void 0,
            this._c.push(n),
            this._a && this._a.push(n),
            this._s && Pn(this, !1),
            n.promise
        },
        catch: function(t) {
            return this.then(void 0, t)
        }
    }),
    gn = function() {
        var t = new mn;
        this.promise = t,
        this.resolve = h(Nn, t, 1),
        this.reject = h(An, t, 1)
    }
    ,
    ln.f = Tn = function(t) {
        return t === En || t === wn ? new gn(t) : yn(t)
    }
    ),
    T(T.G + T.W + T.F * !kn, {
        Promise: En
    }),
    xt(En, "Promise"),
    function(t) {
        var e = "function" == typeof l[t] ? l[t] : u[t];
        m && e && !e[pn] && _.f(e, pn, {
            configurable: !0,
            get: function() {
                return this
            }
        })
    }("Promise"),
    wn = l.Promise,
    T(T.S + T.F * !kn, "Promise", {
        reject: function(t) {
            var e = Tn(this);
            return (0,
            e.reject)(t),
            e.promise
        }
    }),
    T(T.S + !0 * T.F, "Promise", {
        resolve: function(t) {
            return hn(this === wn ? En : this, t)
        }
    }),
    T(T.S + T.F * !(kn && function(t, e) {
        if (!e && !vn)
            return !1;
        var n = !1;
        try {
            var r = [7]
              , o = r[dn]();
            o.next = function() {
                return {
                    done: n = !0
                }
            }
            ,
            r[dn] = function() {
                return o
            }
            ,
            t(r)
        } catch (t) {}
        return n
    }(function(t) {
        En.all(t).catch(On)
    })), "Promise", {
        all: function(t) {
            var e = this
              , n = Tn(e)
              , r = n.resolve
              , o = n.reject
              , i = fn(function() {
                var n = []
                  , i = 0
                  , a = 1;
                $e(t, !1, function(t) {
                    var s = i++
                      , c = !1;
                    n.push(void 0),
                    a++,
                    e.resolve(t).then(function(t) {
                        c || (c = !0,
                        n[s] = t,
                        --a || r(n))
                    }, o)
                }),
                --a || r(n)
            });
            return i.e && o(i.v),
            n.promise
        },
        race: function(t) {
            var e = this
              , n = Tn(e)
              , r = n.reject
              , o = fn(function() {
                $e(t, !1, function(t) {
                    e.resolve(t).then(n.resolve, r)
                })
            });
            return o.e && r(o.v),
            n.promise
        }
    }),
    T(T.P + T.R, "Promise", {
        finally: function(t) {
            var e = Je(this, l.Promise || u.Promise)
              , n = "function" == typeof t;
            return this.then(n ? function(n) {
                return hn(e, t()).then(function() {
                    return n
                })
            }
            : t, n ? function(n) {
                return hn(e, t()).then(function() {
                    throw n
                })
            }
            : t)
        }
    }),
    T(T.S, "Promise", {
        try: function(t) {
            var e = ln.f(this)
              , n = fn(t);
            return (n.e ? e.reject : e.resolve)(n.v),
            e.promise
        }
    });
    var Fn, In = l.Promise, Dn = t(e(function(t) {
        t.exports = {
            default: In,
            __esModule: !0
        }
    })), qn = Fn = "undefined" != typeof window ? window : void 0 !== c ? c : "undefined" != typeof self ? self : {}, Hn = function(t) {
        var e = Un.call(t);
        return "[object Function]" === e || "function" == typeof t && "[object RegExp]" !== e || "undefined" != typeof window && (t === window.setTimeout || t === window.alert || t === window.confirm || t === window.prompt)
    }, Un = Object.prototype.toString, Bn = e(function(t, e) {
        (e = t.exports = function(t) {
            return t.replace(/^\s*|\s*$/g, "")
        }
        ).left = function(t) {
            return t.replace(/^\s*/, "")
        }
        ,
        e.right = function(t) {
            return t.replace(/\s*$/, "")
        }
    }), Xn = function(t, e, n) {
        if (!Hn(e))
            throw new TypeError("iterator must be a function");
        arguments.length < 3 && (n = this),
        "[object Array]" === Wn.call(t) ? function(t, e, n) {
            for (var r = 0, o = t.length; r < o; r++)
                $n.call(t, r) && e.call(n, t[r], r, t)
        }(t, e, n) : "string" == typeof t ? function(t, e, n) {
            for (var r = 0, o = t.length; r < o; r++)
                e.call(n, t.charAt(r), r, t)
        }(t, e, n) : function(t, e, n) {
            for (var r in t)
                $n.call(t, r) && e.call(n, t[r], r, t)
        }(t, e, n)
    }, Wn = Object.prototype.toString, $n = Object.prototype.hasOwnProperty, Gn = function(t) {
        if (!t)
            return {};
        var e = {};
        return Xn(Bn(t).split("\n"), function(t) {
            var n = t.indexOf(":")
              , r = Bn(t.slice(0, n)).toLowerCase()
              , o = Bn(t.slice(n + 1));
            void 0 === e[r] ? e[r] = o : !function(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            }(e[r]) ? e[r] = [e[r], o] : e[r].push(o)
        }),
        e
    }, Jn = function() {
        for (var t = {}, e = 0; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n)
                Vn.call(n, r) && (t[r] = n[r])
        }
        return t
    }, Vn = Object.prototype.hasOwnProperty, Kn = r;
    r.XMLHttpRequest = qn.XMLHttpRequest || function() {}
    ,
    r.XDomainRequest = "withCredentials"in new r.XMLHttpRequest ? r.XMLHttpRequest : qn.XDomainRequest,
    function(t, e) {
        for (var n = 0; n < t.length; n++)
            e(t[n])
    }(["get", "put", "post", "patch", "head", "delete"], function(t) {
        r["delete" === t ? "del" : t] = function(e, r, i) {
            return r = n(e, r, i),
            r.method = t.toUpperCase(),
            o(r)
        }
    });
    var zn = function t(e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3
          , r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
        return new Dn(function(o, i) {
            Kn(e, function(a, s, c) {
                200 === s.statusCode ? o(c) : n && r < n ? t(e, n, ++r).then(function(t) {
                    o(t)
                }).catch(function(t) {
                    i(t)
                }) : i(a)
            })
        }
        )
    }
      , Qn = e(function(t, e) {
        !function(n) {
            var r = e
              , o = t && t.exports == r && t
              , i = "object" == typeof c && c;
            i.global !== i && i.window !== i || (n = i);
            var a = function(t) {
                this.message = t
            };
            (a.prototype = new Error).name = "InvalidCharacterError";
            var s = function(t) {
                throw new a(t)
            }
              , u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
              , l = /[\t\n\f\r ]/g
              , f = {
                encode: function(t) {
                    t = String(t),
                    /[^\0-\xFF]/.test(t) && s("The string to be encoded contains characters outside of the Latin1 range.");
                    for (var e, n, r, o, i = t.length % 3, a = "", c = -1, l = t.length - i; ++c < l; )
                        e = t.charCodeAt(c) << 16,
                        n = t.charCodeAt(++c) << 8,
                        r = t.charCodeAt(++c),
                        a += u.charAt((o = e + n + r) >> 18 & 63) + u.charAt(o >> 12 & 63) + u.charAt(o >> 6 & 63) + u.charAt(63 & o);
                    return 2 == i ? (e = t.charCodeAt(c) << 8,
                    n = t.charCodeAt(++c),
                    a += u.charAt((o = e + n) >> 10) + u.charAt(o >> 4 & 63) + u.charAt(o << 2 & 63) + "=") : 1 == i && (o = t.charCodeAt(c),
                    a += u.charAt(o >> 2) + u.charAt(o << 4 & 63) + "=="),
                    a
                },
                decode: function(t) {
                    var e = (t = String(t).replace(l, "")).length;
                    e % 4 == 0 && (e = (t = t.replace(/==?$/, "")).length),
                    (e % 4 == 1 || /[^+a-zA-Z0-9/]/.test(t)) && s("Invalid character: the string to be decoded is not correctly encoded.");
                    for (var n, r, o = 0, i = "", a = -1; ++a < e; )
                        r = u.indexOf(t.charAt(a)),
                        n = o % 4 ? 64 * n + r : r,
                        o++ % 4 && (i += String.fromCharCode(255 & n >> (-2 * o & 6)));
                    return i
                },
                version: "0.1.0"
            };
            if (r && !r.nodeType)
                if (o)
                    o.exports = f;
                else
                    for (var h in f)
                        f.hasOwnProperty(h) && (r[h] = f[h]);
            else
                n.base64 = f
        }(c)
    })
      , Zn = {}
      , Yn = window.playerDebugMode || /channelvn|playerDebugMode=true/.test(document.location.href)
      , tr = {}
      , er = [];
    s.getPlayers = function() {
        return tr
    }
    ,
    s.pauseAll = function() {
        er.map(function(t) {
            try {
                t.pause(),
                t.trigger("site:pause")
            } catch (t) {}
        })
    }
    ,
    s.remove = function(t) {
        t && 0 !== t.length && t.map(function(t) {
            try {
                tr[t].dispose(),
                delete tr[t]
            } catch (t) {}
        })
    }
    ,
    s.onactiveinview = function() {}
    ;
    return window.playerInitScript || s
});