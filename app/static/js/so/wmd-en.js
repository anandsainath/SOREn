
"use strict";
var Markdown;
Markdown = "object" == typeof exports && "function" == typeof require ? exports : {},
    function() {
        function e(e) {
            return e
        }

        function t() {
            return !1
        }

        function n() {}

        function i() {}
        n.prototype = {
            "chain": function(t, n) {
                var i = this[t];
                if (!i) throw new Error("unknown hook " + t);
                this[t] = i === e ? n : function() {
                    var e = Array.prototype.slice.call(arguments, 0);
                    return e[0] = i.apply(null, e), n.apply(null, e)
                }
            },
            "set": function(e, t) {
                if (!this[e]) throw new Error("unknown hook " + e);
                this[e] = t
            },
            "addNoop": function(t) {
                this[t] = e
            },
            "addFalse": function(e) {
                this[e] = t
            }
        }, Markdown.HookCollection = n, i.prototype = {
            "set": function(e, t) {
                this["s_" + e] = t
            },
            "get": function(e) {
                return this["s_" + e]
            }
        }, Markdown.Converter = function(t) {
            function r(e) {
                return e = e.replace(/^[ ]{0,3}\[([^\[\]]+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm, function(e, t, n, i, r, a) {
                    return t = t.toLowerCase(), D.set(t, E(n)), r ? i : (a && j.set(t, a.replace(/"/g, "&quot;")), "")
                })
            }

            function a(e) {
                return e = e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm, s), e = e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm, s), e = e.replace(/\n[ ]{0,3}((<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, s), e = e.replace(/\n\n[ ]{0,3}(<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>[ \t]*(?=\n{2,}))/g, s), e = e.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, s)
            }

            function o(e) {
                return e = e.replace(/(^\n+|\n+$)/g, ""), "\n\n~K" + (q.push(e) - 1) + "K\n\n"
            }

            function s(e, t) {
                return o(t)
            }

            function l(e, t) {
                e = N.preBlockGamut(e, z), e = m(e);
                var n = "<hr />\n";
                return e = e.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, n), e = e.replace(/^[ ]{0,2}([ ]?-[ ]?){3,}[ \t]*$/gm, n), e = e.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, n), e = v(e), e = x(e), e = $(e), e = N.postBlockGamut(e, z), e = a(e), e = C(e, t)
            }

            function c(e) {
                return e = N.preSpanGamut(e), e = w(e), e = u(e), e = T(e), e = h(e), e = d(e), e = A(e), e = e.replace(/~P/g, "://"), e = E(e), e = F(e), e = e.replace(/  +\n/g, " <br>\n"), e = N.postSpanGamut(e)
            }

            function u(e) {
                var t = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>)/gi;
                return e = e.replace(t, function(e) {
                    var t = e.replace(/(.)<\/?code>(?=.)/g, "$1`");
                    return t = P(t, "!" == e.charAt(1) ? "\\`*_/" : "\\`*_")
                })
            }

            function d(e) {
                return -1 === e.indexOf("[") ? e : (e = e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, f), e = e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, f), e = e.replace(/(\[([^\[\]]+)\])()()()()()/g, f))
            }

            function f(e, t, n, i, r, a, o, s) {
                void 0 == s && (s = "");
                var l = t,
                    c = n.replace(/:\/\//g, "~P"),
                    u = i.toLowerCase(),
                    d = r,
                    f = s;
                if ("" == d)
                    if ("" == u && (u = c.toLowerCase().replace(/ ?\n/g, " ")), d = "#" + u, void 0 != D.get(u)) d = D.get(u), void 0 != j.get(u) && (f = j.get(u));
                    else {
                        if (!(l.search(/\(\s*\)$/m) > -1)) return l;
                        d = ""
                    }
                d = L(d);
                var h = '<a href="' + d + '"';
                return "" != f && (f = p(f), f = P(f, "*_"), h += ' title="' + f + '"'), h += ">" + c + "</a>"
            }

            function h(e) {
                return -1 === e.indexOf("![") ? e : (e = e.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, g), e = e.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, g))
            }

            function p(e) {
                return e.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
            }

            function g(e, t, n, i, r, a, o, s) {
                var l = t,
                    c = n,
                    u = i.toLowerCase(),
                    d = r,
                    f = s;
                if (f || (f = ""), "" == d) {
                    if ("" == u && (u = c.toLowerCase().replace(/ ?\n/g, " ")), d = "#" + u, void 0 == D.get(u)) return l;
                    d = D.get(u), void 0 != j.get(u) && (f = j.get(u))
                }
                c = P(p(c), "*_[]()"), d = P(d, "*_");
                var h = '<img src="' + d + '" alt="' + c + '"';
                return f = p(f), f = P(f, "*_"), h += ' title="' + f + '"', h += " />"
            }

            function m(e) {
                return e = e.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm, function(e, t) {
                    return "<h1>" + c(t) + "</h1>\n\n"
                }), e = e.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm, function(e, t) {
                    return "<h2>" + c(t) + "</h2>\n\n"
                }), e = e.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm, function(e, t, n) {
                    var i = t.length;
                    return "<h" + i + ">" + c(n) + "</h" + i + ">\n\n"
                })
            }

            function v(e, t) {
                e += "~0";
                var n = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
                return H ? e = e.replace(n, function(e, n, i) {
                    var r, a = n,
                        o = i.search(/[*+-]/g) > -1 ? "ul" : "ol";
                    "ol" === o && (r = parseInt(i, 10));
                    var s = b(a, o, t);
                    s = s.replace(/\s+$/, "");
                    var l = "<" + o;
                    return r && 1 !== r && (l += ' start="' + r + '"'), s = l + ">" + s + "</" + o + ">\n"
                }) : (n = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g, e = e.replace(n, function(e, t, n, i) {
                    var r, a = t,
                        o = n,
                        s = i.search(/[*+-]/g) > -1 ? "ul" : "ol";
                    "ol" === s && (r = parseInt(i, 10));
                    var l = b(o, s),
                        c = "<" + s;
                    return r && 1 !== r && (c += ' start="' + r + '"'), l = a + c + ">\n" + l + "</" + s + ">\n"
                })), e = e.replace(/~0/, "")
            }

            function b(e, t, n) {
                H++, e = e.replace(/\n{2,}$/, "\n"), e += "~0";
                var i = W[t],
                    r = new RegExp("(^[ \\t]*)(" + i + ")[ \\t]+([^\\r]+?(\\n+))(?=(~0|\\1(" + i + ")[ \\t]+))", "gm"),
                    a = !1;
                return e = e.replace(r, function(e, t, i, r) {
                    var o = r,
                        s = /\n\n$/.test(o),
                        u = s || o.search(/\n{2,}/) > -1;
                    return u || a ? o = l(R(o), !0) : (o = v(R(o), !0), o = o.replace(/\n$/, ""), n || (o = c(o))), a = s, "<li>" + o + "</li>\n"
                }), e = e.replace(/~0/g, ""), H--, e
            }

            function x(e) {
                return e += "~0", e = e.replace(/(?:\n\n|^\n?)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g, function(e, t, n) {
                    var i = t,
                        r = n;
                    return i = y(R(i)), i = M(i), i = i.replace(/^\n+/g, ""), i = i.replace(/\n+$/g, ""), i = "<pre><code>" + i + "\n</code></pre>", "\n\n" + i + "\n\n" + r
                }), e = e.replace(/~0/, "")
            }

            function w(e) {
                return e = e.replace(/(^|[^\\`])(`+)(?!`)([^\r]*?[^`])\2(?!`)/gm, function(e, t, n, i) {
                    var r = i;
                    return r = r.replace(/^([ \t]*)/g, ""), r = r.replace(/[ \t]*$/g, ""), r = y(r), r = r.replace(/:\/\//g, "~P"), t + "<code>" + r + "</code>"
                })
            }

            function y(e) {
                return e = e.replace(/&/g, "&amp;"), e = e.replace(/</g, "&lt;"), e = e.replace(/>/g, "&gt;"), e = P(e, "*_{}[]\\", !1)
            }

            function k(e) {
                return -1 === e.indexOf("*") && -1 === e.indexOf("_") ? e : (e = U(e), e = e.replace(/(^|[\W_])(?:(?!\1)|(?=^))(\*|_)\2(?=\S)([^\r]*?\S)\2\2(?!\2)(?=[\W_]|$)/g, "$1<strong>$3</strong>"), e = e.replace(/(^|[\W_])(?:(?!\1)|(?=^))(\*|_)(?=\S)((?:(?!\2)[^\r])*?\S)\2(?!\2)(?=[\W_]|$)/g, "$1<em>$3</em>"), B(e))
            }

            function S(e) {
                return -1 === e.indexOf("*") && -1 === e.indexOf("_") ? e : (e = U(e), e = e.replace(/(?=[^\r][*_]|[*_])(^|(?=\W__|(?!\*)[\W_]\*\*|\w\*\*\w)[^\r])(\*\*|__)(?!\2)(?=\S)((?:|[^\r]*?(?!\2)[^\r])(?=\S_|\w|\S\*\*(?:[\W_]|$)).)(?=__(?:\W|$)|\*\*(?:[^*]|$))\2/g, "$1<strong>$3</strong>"), e = e.replace(/(?=[^\r][*_]|[*_])(^|(?=\W_|(?!\*)(?:[\W_]\*|\D\*(?=\w)\D))[^\r])(\*|_)(?!\2\2\2)(?=\S)((?:(?!\2)[^\r])*?(?=[^\s_]_|(?=\w)\D\*\D|[^\s*]\*(?:[\W_]|$)).)(?=_(?:\W|$)|\*(?:[^*]|$))\2/g, "$1<em>$3</em>"), B(e))
            }

            function $(e) {
                return e = e.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm, function(e, t) {
                    var n = t;
                    return n = n.replace(/^[ \t]*>[ \t]?/gm, "~0"), n = n.replace(/~0/g, ""), n = n.replace(/^[ \t]+$/gm, ""), n = l(n), n = n.replace(/(^|\n)/g, "$1  "), n = n.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(e, t) {
                        var n = t;
                        return n = n.replace(/^  /gm, "~0"), n = n.replace(/~0/g, "")
                    }), o("<blockquote>\n" + n + "\n</blockquote>")
                })
            }

            function C(e, t) {
                e = e.replace(/^\n+/g, ""), e = e.replace(/\n+$/g, "");
                for (var n = e.split(/\n{2,}/g), i = [], r = /~K(\d+)K/, a = n.length, o = 0; a > o; o++) {
                    var s = n[o];
                    r.test(s) ? i.push(s) : /\S/.test(s) && (s = c(s), s = s.replace(/^([ \t]*)/g, "<p>"), s += "</p>", i.push(s))
                }
                if (!t) {
                    a = i.length;
                    for (var o = 0; a > o; o++)
                        for (var l = !0; l;) l = !1, i[o] = i[o].replace(/~K(\d+)K/g, function(e, t) {
                            return l = !0, q[t]
                        })
                }
                return i.join("\n\n")
            }

            function E(e) {
                return e = e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;"), e = e.replace(/<(?![a-z\/?!]|~D)/gi, "&lt;")
            }

            function T(e) {
                return e = e.replace(/\\(\\)/g, O), e = e.replace(/\\([`*_{}\[\]()>#+-.!])/g, O)
            }

            function _(e, t, n, i) {
                if (t) return e;
                if (")" !== i.charAt(i.length - 1)) return "<" + n + i + ">";
                for (var r = i.match(/[()]/g), a = 0, o = 0; o < r.length; o++) "(" === r[o] ? 0 >= a ? a = 1 : a++ : a--;
                var s = "";
                if (0 > a) {
                    var l = new RegExp("\\){1," + -a + "}$");
                    i = i.replace(l, function(e) {
                        return s = e, ""
                    })
                }
                if (s) {
                    var c = i.charAt(i.length - 1);
                    Q.test(c) || (s = c + s, i = i.substr(0, i.length - 1))
                }
                return "<" + n + i + ">" + s
            }

            function A(e) {
                e = e.replace(G, _);
                var t = function(e, t) {
                    var n = L(t);
                    return '<a href="' + n + '">' + N.plainLinkText(t) + "</a>"
                };
                return e = e.replace(/<((https?|ftp):[^'">\s]+)>/gi, t)
            }

            function I(e) {
                return e = e.replace(/~E(\d+)E/g, function(e, t) {
                    var n = parseInt(t);
                    return String.fromCharCode(n)
                })
            }

            function R(e) {
                return e = e.replace(/^(\t|[ ]{1,4})/gm, "~0"), e = e.replace(/~0/g, "")
            }

            function M(e) {
                if (!/\t/.test(e)) return e;
                var t, n = ["    ", "   ", "  ", " "],
                    i = 0;
                return e.replace(/[\n\t]/g, function(e, r) {
                    return "\n" === e ? (i = r + 1, e) : (t = (r - i) % 4, i = r + 1, n[t])
                })
            }

            function L(e) {
                return e = p(e), e = P(e, "*_:()[]")
            }

            function P(e, t, n) {
                var i = "([" + t.replace(/([\[\]\\])/g, "\\$1") + "])";
                n && (i = "\\\\" + i);
                var r = new RegExp(i, "g");
                return e = e.replace(r, O)
            }

            function O(e, t) {
                var n = t.charCodeAt(0);
                return "~E" + n + "E"
            }
            var N = this.hooks = new n;
            N.addNoop("plainLinkText"), N.addNoop("preConversion"), N.addNoop("postNormalization"), N.addNoop("preBlockGamut"), N.addNoop("postBlockGamut"), N.addNoop("preSpanGamut"), N.addNoop("postSpanGamut"), N.addNoop("postConversion");
            var D, j, q, H;
            t = t || {};
            var U = e,
                B = e;
            t.nonAsciiLetters && ! function() {
                var e = /[Q\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376-\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0523\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0621-\u064a\u0660-\u0669\u066e-\u066f\u0671-\u06d3\u06d5\u06e5-\u06e6\u06ee-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07c0-\u07ea\u07f4-\u07f5\u07fa\u0904-\u0939\u093d\u0950\u0958-\u0961\u0966-\u096f\u0971-\u0972\u097b-\u097f\u0985-\u098c\u098f-\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc-\u09dd\u09df-\u09e1\u09e6-\u09f1\u0a05-\u0a0a\u0a0f-\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32-\u0a33\u0a35-\u0a36\u0a38-\u0a39\u0a59-\u0a5c\u0a5e\u0a66-\u0a6f\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2-\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0-\u0ae1\u0ae6-\u0aef\u0b05-\u0b0c\u0b0f-\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32-\u0b33\u0b35-\u0b39\u0b3d\u0b5c-\u0b5d\u0b5f-\u0b61\u0b66-\u0b6f\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99-\u0b9a\u0b9c\u0b9e-\u0b9f\u0ba3-\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0be6-\u0bef\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58-\u0c59\u0c60-\u0c61\u0c66-\u0c6f\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0-\u0ce1\u0ce6-\u0cef\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d28\u0d2a-\u0d39\u0d3d\u0d60-\u0d61\u0d66-\u0d6f\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32-\u0e33\u0e40-\u0e46\u0e50-\u0e59\u0e81-\u0e82\u0e84\u0e87-\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa-\u0eab\u0ead-\u0eb0\u0eb2-\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0ed0-\u0ed9\u0edc-\u0edd\u0f00\u0f20-\u0f29\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8b\u1000-\u102a\u103f-\u1049\u1050-\u1055\u105a-\u105d\u1061\u1065-\u1066\u106e-\u1070\u1075-\u1081\u108e\u1090-\u1099\u10a0-\u10c5\u10d0-\u10fa\u10fc\u1100-\u1159\u115f-\u11a2\u11a8-\u11f9\u1200-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u1676\u1681-\u169a\u16a0-\u16ea\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u17e0-\u17e9\u1810-\u1819\u1820-\u1877\u1880-\u18a8\u18aa\u1900-\u191c\u1946-\u196d\u1970-\u1974\u1980-\u19a9\u19c1-\u19c7\u19d0-\u19d9\u1a00-\u1a16\u1b05-\u1b33\u1b45-\u1b4b\u1b50-\u1b59\u1b83-\u1ba0\u1bae-\u1bb9\u1c00-\u1c23\u1c40-\u1c49\u1c4d-\u1c7d\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u203f-\u2040\u2054\u2071\u207f\u2090-\u2094\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2183-\u2184\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2c6f\u2c71-\u2c7d\u2c80-\u2ce4\u2d00-\u2d25\u2d30-\u2d65\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3006\u3031-\u3035\u303b-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31b7\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fc3\ua000-\ua48c\ua500-\ua60c\ua610-\ua62b\ua640-\ua65f\ua662-\ua66e\ua67f-\ua697\ua717-\ua71f\ua722-\ua788\ua78b-\ua78c\ua7fb-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8d0-\ua8d9\ua900-\ua925\ua930-\ua946\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa50-\uaa59\uac00-\ud7a3\uf900-\ufa2d\ufa30-\ufa6a\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe33-\ufe34\ufe4d-\ufe4f\ufe70-\ufe74\ufe76-\ufefc\uff10-\uff19\uff21-\uff3a\uff3f\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]/g,
                    t = "Q".charCodeAt(0),
                    n = "A".charCodeAt(0),
                    i = "Z".charCodeAt(0),
                    r = "a".charCodeAt(0) - i - 1;
                U = function(a) {
                    return a.replace(e, function(e) {
                        for (var a, o = e.charCodeAt(0), s = ""; o > 0;) a = o % 51 + n, a >= t && a++, a > i && (a += r), s = String.fromCharCode(a) + s, o = o / 51 | 0;
                        return "Q" + s + "Q"
                    })
                }, B = function(e) {
                    return e.replace(/Q([A-PR-Za-z]{1,3})Q/g, function(e, a) {
                        for (var o, s = 0, l = 0; l < a.length; l++) o = a.charCodeAt(l), o > i && (o -= r), o > t && o--, o -= n, s = 51 * s + o;
                        return String.fromCharCode(s)
                    })
                }
            }();
            var F = t.asteriskIntraWordEmphasis ? S : k;
            this.makeHtml = function(e) {
                if (D) throw new Error("Recursive call to converter.makeHtml");
                return D = new i, j = new i, q = [], H = 0, e = N.preConversion(e), e = e.replace(/~/g, "~T"), e = e.replace(/\$/g, "~D"), e = e.replace(/\r\n/g, "\n"), e = e.replace(/\r/g, "\n"), e = "\n\n" + e + "\n\n", e = M(e), e = e.replace(/^[ \t]+$/gm, ""), e = N.postNormalization(e), e = a(e), e = r(e), e = l(e), e = I(e), e = e.replace(/~D/g, "$$"), e = e.replace(/~T/g, "~"), e = N.postConversion(e), q = j = D = null, e
            };
            var z = function(e) {
                    return l(e)
                },
                W = {
                    "ol": "\\d+[.]",
                    "ul": "[*+-]"
                },
                K = "[-A-Z0-9+&@#/%?=~_|[\\]()!:,.;]",
                V = "[-A-Z0-9+&@#/%=~_|[\\])]",
                G = new RegExp('(="|<)?\\b(https?|ftp)(://' + K + "*" + V + ")(?=$|\\W)", "gi"),
                Q = new RegExp(V, "i")
        }
    }(),
    function() {
        function e() {}

        function t(e) {
            this.buttonBar = d.getElementById("wmd-button-bar" + e), this.preview = d.getElementById("wmd-preview" + e), this.input = d.getElementById("wmd-input" + e)
        }

        function n(e, t) {
            var n, r, a, o = this,
                s = [],
                c = 0,
                u = "none",
                d = function(e, t) {
                    u != e && (u = e, t || h()), g.isIE && "moving" == u ? a = null : r = setTimeout(f, 1)
                },
                f = function(e) {
                    a = new i(t, e), r = void 0
                };
            this.setCommandMode = function() {
                u = "command", h(), r = setTimeout(f, 0)
            }, this.canUndo = function() {
                return c > 1
            }, this.canRedo = function() {
                return s[c + 1] ? !0 : !1
            }, this.undo = function() {
                o.canUndo() && (n ? (n.restore(), n = null) : (s[c] = new i(t), s[--c].restore(), e && e())), u = "none", t.input.focus(), f()
            }, this.redo = function() {
                o.canRedo() && (s[++c].restore(), e && e()), u = "none", t.input.focus(), f()
            };
            var h = function() {
                    var r = a || new i(t);
                    return r ? "moving" == u ? (n || (n = r), void 0) : (n && (s[c - 1].text != n.text && (s[c++] = n), n = null), s[c++] = r, s[c + 1] = null, e && e(), void 0) : !1
                },
                p = function(e) {
                    var t = !1;
                    if ((e.ctrlKey || e.metaKey) && !e.altKey) {
                        var n = e.charCode || e.keyCode,
                            i = String.fromCharCode(n);
                        switch (i.toLowerCase()) {
                            case "y":
                                o.redo(), t = !0;
                                break;
                            case "z":
                                e.shiftKey ? o.redo() : o.undo(), t = !0
                        }
                    }
                    return t ? (e.preventDefault && e.preventDefault(), window.event && (window.event.returnValue = !1), void 0) : void 0
                },
                m = function(e) {
                    if (!e.ctrlKey && !e.metaKey) {
                        var t = e.keyCode;
                        t >= 33 && 40 >= t || t >= 63232 && 63235 >= t ? d("moving") : 8 == t || 46 == t || 127 == t ? d("deleting") : 13 == t ? d("newlines") : 27 == t ? d("escape") : (16 > t || t > 20) && 91 != t && d("typing")
                    }
                },
                v = function() {
                    l.addEvent(t.input, "keypress", function(e) {
                        !e.ctrlKey && !e.metaKey || e.altKey || 89 != e.keyCode && 90 != e.keyCode || e.preventDefault()
                    });
                    var e = function() {
                        (g.isIE || a && a.text != t.input.value) && void 0 == r && (u = "paste", h(), f())
                    };
                    l.addEvent(t.input, "keydown", p), l.addEvent(t.input, "keydown", m), l.addEvent(t.input, "mousedown", function() {
                        d("moving")
                    }), t.input.onpaste = e, t.input.ondrop = e
                },
                b = function() {
                    v(), f(!0), h()
                };
            b()
        }

        function i(t, n) {
            var i = this,
                r = t.input;
            this.init = function() {
                l.isVisible(r) && (n || !d.activeElement || d.activeElement === r) && (this.setInputAreaSelectionStartEnd(), this.scrollTop = r.scrollTop, (!this.text && r.selectionStart || 0 === r.selectionStart) && (this.text = r.value))
            }, this.setInputAreaSelection = function() {
                if (l.isVisible(r))
                    if (void 0 === r.selectionStart || g.isOpera) {
                        if (d.selection) {
                            if (d.activeElement && d.activeElement !== r) return;
                            r.focus();
                            var e = r.createTextRange();
                            e.moveStart("character", -r.value.length), e.moveEnd("character", -r.value.length), e.moveEnd("character", i.end), e.moveStart("character", i.start), e.select()
                        }
                    } else r.focus(), r.selectionStart = i.start, r.selectionEnd = i.end, r.scrollTop = i.scrollTop
            }, this.setInputAreaSelectionStartEnd = function() {
                if (t.ieCachedRange || !r.selectionStart && 0 !== r.selectionStart) {
                    if (d.selection) {
                        i.text = l.fixEolChars(r.value);
                        var e = t.ieCachedRange || d.selection.createRange(),
                            n = l.fixEolChars(e.text),
                            a = "",
                            o = a + n + a;
                        e.text = o;
                        var s = l.fixEolChars(r.value);
                        e.moveStart("character", -o.length), e.text = n, i.start = s.indexOf(a), i.end = s.lastIndexOf(a) - a.length;
                        var c = i.text.length - l.fixEolChars(r.value).length;
                        if (c) {
                            for (e.moveStart("character", -n.length); c--;) n += "\n", i.end += 1;
                            e.text = n
                        }
                        t.ieCachedRange && (i.scrollTop = t.ieCachedScrollTop), t.ieCachedRange = null, this.setInputAreaSelection()
                    }
                } else i.start = r.selectionStart, i.end = r.selectionEnd
            }, this.restore = function() {
                void 0 != i.text && i.text != r.value && (r.value = i.text), this.setInputAreaSelection(), r.scrollTop = i.scrollTop
            }, this.getChunks = function() {
                var t = new e;
                return t.before = l.fixEolChars(i.text.substring(0, i.start)), t.startTag = "", t.selection = l.fixEolChars(i.text.substring(i.start, i.end)), t.endTag = "", t.after = l.fixEolChars(i.text.substring(i.end)), t.scrollTop = i.scrollTop, t
            }, this.setChunks = function(e) {
                e.before = e.before + e.startTag, e.after = e.endTag + e.after, this.start = e.before.length, this.end = e.before.length + e.selection.length, this.text = e.before + e.selection + e.after, this.scrollTop = e.scrollTop
            }, this.init()
        }

        function r(e, t, n) {
            var i, r, a, o = 3e3,
                s = "delayed",
                u = function(e, t) {
                    l.addEvent(e, "input", t), e.onpaste = t, e.ondrop = t, l.addEvent(e, "keypress", t), l.addEvent(e, "keydown", t)
                },
                f = function() {
                    var e = 0;
                    return window.innerHeight ? e = window.pageYOffset : d.documentElement && d.documentElement.scrollTop ? e = d.documentElement.scrollTop : d.body && (e = d.body.scrollTop), e
                },
                h = function() {
                    if (t.preview) {
                        var n = t.input.value;
                        if (!n || n != a) {
                            a = n;
                            var i = (new Date).getTime();
                            n = e.makeHtml(n);
                            var o = (new Date).getTime();
                            r = o - i, S(n)
                        }
                    }
                },
                p = function() {
                    if (i && (clearTimeout(i), i = void 0), "manual" !== s) {
                        var e = 0;
                        "delayed" === s && (e = r), e > o && (e = o), i = setTimeout(h, e)
                    }
                },
                m = function(e) {
                    return e.scrollHeight <= e.clientHeight ? 1 : e.scrollTop / (e.scrollHeight - e.clientHeight)
                },
                v = function() {
                    t.preview && (t.preview.scrollTop = (t.preview.scrollHeight - t.preview.clientHeight) * m(t.preview))
                };
            this.refresh = function(e) {
                e ? (a = "", h()) : p()
            }, this.processingTime = function() {
                return r
            };
            var b, x = !0,
                w = function(e) {
                    var n = t.preview,
                        i = n.parentNode,
                        r = n.nextSibling;
                    i.removeChild(n), n.innerHTML = e, r ? i.insertBefore(n, r) : i.appendChild(n)
                },
                y = function(e) {
                    t.preview.innerHTML = e
                },
                k = function(e) {
                    if (b) return b(e);
                    try {
                        y(e), b = y
                    } catch (t) {
                        b = w, b(e)
                    }
                },
                S = function(e) {
                    var i = c.getTop(t.input) - f();
                    if (t.preview && (k(e), n()), v(), x) return x = !1, void 0;
                    var r = c.getTop(t.input) - f();
                    g.isIE ? setTimeout(function() {
                        window.scrollBy(0, r - i)
                    }, 0) : window.scrollBy(0, r - i)
                },
                $ = function() {
                    u(t.input, p), h(), t.preview && (t.preview.scrollTop = 0)
                };
            $()
        }

        function a(e, t, n, r, a, o, s) {
            function c(e) {
                if (v.focus(), e.textOp) {
                    n && n.setCommandMode();
                    var a = new i(t);
                    if (!a) return;
                    var o = a.getChunks(),
                        s = function() {
                            v.focus(), o && a.setChunks(o), a.restore(), r.refresh()
                        },
                        l = e.textOp(o, s);
                    l || s()
                }
                e.execute && e.execute(n)
            }

            function u(e, n) {
                var i = "0px",
                    r = "-20px",
                    a = "-40px",
                    o = e.getElementsByTagName("span")[0];
                n ? (o.style.backgroundPosition = e.XShift + " " + i, e.onmouseover = function() {
                    o.style.backgroundPosition = this.XShift + " " + a
                }, e.onmouseout = function() {
                    o.style.backgroundPosition = this.XShift + " " + i
                }, g.isIE && (e.onmousedown = function() {
                    d.activeElement && d.activeElement !== t.input || (t.ieCachedRange = document.selection.createRange(), t.ieCachedScrollTop = t.input.scrollTop)
                }), e.isHelp || (e.onclick = function() {
                    return this.onmouseout && this.onmouseout(), c(this), !1
                })) : (o.style.backgroundPosition = e.XShift + " " + r, e.onmouseover = e.onmouseout = e.onclick = function() {})
            }

            function f(e) {
                return "string" == typeof e && (e = a[e]),
                    function() {
                        e.apply(a, arguments)
                    }
            }

            function p() {
                var n = t.buttonBar,
                    i = document.createElement("ul");
                i.id = "wmd-button-row" + e, i.className = "wmd-button-row", i = n.appendChild(i);
                var r = 0,
                    a = function(t, n, a, o) {
                        var s = document.createElement("li");
                        s.className = "wmd-button", s.style.left = r + "px", r += 25;
                        var l = document.createElement("span");
                        return s.id = t + e, s.appendChild(l), s.title = n, s.XShift = a, o && (s.textOp = o), u(s, !0), i.appendChild(s), s
                    },
                    l = function(t) {
                        var n = document.createElement("li");
                        n.className = "wmd-spacer wmd-spacer" + t, n.id = "wmd-spacer" + t + e, i.appendChild(n), r += 25
                    };
                b.bold = a("wmd-bold-button", s("bold"), "0px", f("doBold")), b.italic = a("wmd-italic-button", s("italic"), "-20px", f("doItalic")), l(1), b.link = a("wmd-link-button", s("link"), "-40px", f(function(e, t) {
                    return this.doLinkOrImage(e, t, !1)
                })), b.quote = a("wmd-quote-button", s("quote"), "-60px", f("doBlockquote")), b.code = a("wmd-code-button", s("code"), "-80px", f("doCode")), b.image = a("wmd-image-button", s("image"), "-100px", f(function(e, t) {
                    return this.doLinkOrImage(e, t, !0)
                })), l(2), b.olist = a("wmd-olist-button", s("olist"), "-120px", f(function(e, t) {
                    this.doList(e, t, !0)
                })), b.ulist = a("wmd-ulist-button", s("ulist"), "-140px", f(function(e, t) {
                    this.doList(e, t, !1)
                })), b.heading = a("wmd-heading-button", s("heading"), "-160px", f("doHeading")), b.hr = a("wmd-hr-button", s("hr"), "-180px", f("doHorizontalRule")), l(3), b.undo = a("wmd-undo-button", s("undo"), "-200px", null), b.undo.execute = function(e) {
                    e && e.undo()
                };
                var c = /win/.test(h.platform.toLowerCase()) ? s("redo") : s("redomac");
                if (b.redo = a("wmd-redo-button", c, "-220px", null), b.redo.execute = function(e) {
                        e && e.redo()
                    }, o) {
                    var d = document.createElement("li"),
                        p = document.createElement("span");
                    d.appendChild(p), d.className = "wmd-button wmd-help-button", d.id = "wmd-help-button" + e, d.XShift = "-240px", d.isHelp = !0, d.style.right = "0px", d.title = s("help"), d.onclick = o.handler, u(d, !0), i.appendChild(d), b.help = d
                }
                m()
            }

            function m() {
                n && (u(b.undo, n.canUndo()), u(b.redo, n.canRedo()))
            }
            var v = t.input,
                b = {};
            p();
            var x = "keydown";
            g.isOpera && (x = "keypress"), l.addEvent(v, x, function(e) {
                if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey) {
                    var t = e.charCode || e.keyCode,
                        n = String.fromCharCode(t).toLowerCase();
                    switch (n) {
                        case "b":
                            c(b.bold);
                            break;
                        case "i":
                            c(b.italic);
                            break;
                        case "l":
                            c(b.link);
                            break;
                        case "q":
                            c(b.quote);
                            break;
                        case "k":
                            c(b.code);
                            break;
                        case "g":
                            c(b.image);
                            break;
                        case "o":
                            c(b.olist);
                            break;
                        case "u":
                            c(b.ulist);
                            break;
                        case "h":
                            c(b.heading);
                            break;
                        case "r":
                            c(b.hr);
                            break;
                        case "y":
                            c(b.redo);
                            break;
                        case "z":
                            e.shiftKey ? c(b.redo) : c(b.undo);
                            break;
                        default:
                            return
                    }
                    e.preventDefault && e.preventDefault(), window.event && (window.event.returnValue = !1)
                }
            }), l.addEvent(v, "keyup", function(e) {
                if (e.shiftKey && !e.ctrlKey && !e.metaKey) {
                    var t = e.charCode || e.keyCode;
                    if (13 === t) {
                        var n = {};
                        n.textOp = f("doAutoindent"), c(n)
                    }
                }
            }), g.isIE && l.addEvent(v, "keydown", function(e) {
                var t = e.keyCode;
                return 27 === t ? !1 : void 0
            }), this.setUndoRedoButtonStates = m
        }

        function o(e, t) {
            this.hooks = e, this.getString = t
        }

        function s(e) {
            return e.replace(/^\s*(.*?)(?:\s+"(.+)")?\s*$/, function(e, t, n) {
                var i = !1;
                return t = t.replace(/%(?:[\da-fA-F]{2})|\?|\+|[^\w\d-./[\]]/g, function(e) {
                    if (3 === e.length && "%" == e.charAt(0)) return e.toUpperCase();
                    switch (e) {
                        case "?":
                            return i = !0, "?";
                        case "+":
                            if (i) return "%20"
                    }
                    return encodeURI(e)
                }), n && (n = n.trim ? n.trim() : n.replace(/^\s*/, "").replace(/\s*$/, ""), n = n.replace(/"/g, "quot;").replace(/\(/g, "&#40;").replace(/\)/g, "&#41;").replace(/</g, "&lt;").replace(/>/g, "&gt;")), n ? t + ' "' + n + '"' : t
            })
        }
        var l = {},
            c = {},
            u = {},
            d = window.document,
            f = window.RegExp,
            h = window.navigator,
            p = {
                "lineLength": 72
            },
            g = {
                "isIE": /msie/.test(h.userAgent.toLowerCase()),
                "isIE_5or6": /msie 6/.test(h.userAgent.toLowerCase()) || /msie 5/.test(h.userAgent.toLowerCase()),
                "isOpera": /opera/.test(h.userAgent.toLowerCase())
            },
            m = {
                "bold": "Strong <strong> Ctrl+B",
                "boldexample": "strong text",
                "italic": "Emphasis <em> Ctrl+I",
                "italicexample": "emphasized text",
                "link": "Hyperlink <a> Ctrl+L",
                "linkdescription": "enter link description here",
                "linkdialog": '<p><b>Insert Hyperlink</b></p><p>http://example.com/ "optional title"</p>',
                "quote": "Blockquote <blockquote> Ctrl+Q",
                "quoteexample": "Blockquote",
                "code": "Code Sample <pre><code> Ctrl+K",
                "codeexample": "enter code here",
                "image": "Image <img> Ctrl+G",
                "imagedescription": "enter image description here",
                "imagedialog": "<p><b>Insert Image</b></p><p>http://example.com/images/diagram.jpg \"optional title\"<br><br>Need <a href='http://www.google.com/search?q=free+image+hosting' target='_blank'>free image hosting?</a></p>",
                "olist": "Numbered List <ol> Ctrl+O",
                "ulist": "Bulleted List <ul> Ctrl+U",
                "litem": "List item",
                "heading": "Heading <h1>/<h2> Ctrl+H",
                "headingexample": "Heading",
                "hr": "Horizontal Rule <hr> Ctrl+R",
                "undo": "Undo - Ctrl+Z",
                "redo": "Redo - Ctrl+Y",
                "redomac": "Redo - Ctrl+Shift+Z",
                "help": "Markdown Editing Help",
                "ok": "OK",
                "cancel": "Cancel"
            },
            v = "http://",
            b = "http://";
        Markdown.Editor = function(e, i, s) {
            s = s || {}, "function" == typeof s.handler && (s = {
                "helpButton": s
            }), s.strings = s.strings || {}, s.helpButton && (s.strings.help = s.strings.help || s.helpButton.title);
            var l = function(e) {
                return s.strings[e] || m[e]
            };
            i = i || "";
            var c = this.hooks = new Markdown.HookCollection;
            c.addNoop("onPreviewRefresh"), c.addNoop("postBlockquoteCreation"), c.addFalse("insertImageDialog"), this.getConverter = function() {
                return e
            };
            var u, f = this;
            this.run = function() {
                if (!u) {
                    u = new t(i);
                    var h, p, g = new o(c, l),
                        m = new r(e, u, function() {
                            c.onPreviewRefresh()
                        });
                    /\?noundo/.test(d.location.href) || (h = new n(function() {
                        m.refresh(), p && p.setUndoRedoButtonStates()
                    }, u), this.textOperation = function(e) {
                        h.setCommandMode(), e(), f.refreshPreview()
                    }), p = new a(i, u, h, m, g, s.helpButton, l), p.setUndoRedoButtonStates();
                    var v = f.refreshPreview = function() {
                        m.refresh(!0)
                    };
                    v()
                }
            }
        }, e.prototype.findTags = function(e, t) {
            var n, i = this;
            e && (n = l.extendRegExp(e, "", "$"), this.before = this.before.replace(n, function(e) {
                return i.startTag = i.startTag + e, ""
            }), n = l.extendRegExp(e, "^", ""), this.selection = this.selection.replace(n, function(e) {
                return i.startTag = i.startTag + e, ""
            })), t && (n = l.extendRegExp(t, "", "$"), this.selection = this.selection.replace(n, function(e) {
                return i.endTag = e + i.endTag, ""
            }), n = l.extendRegExp(t, "^", ""), this.after = this.after.replace(n, function(e) {
                return i.endTag = e + i.endTag, ""
            }))
        }, e.prototype.trimWhitespace = function(e) {
            var t, n, i = this;
            e ? t = n = "" : (t = function(e) {
                return i.before += e, ""
            }, n = function(e) {
                return i.after = e + i.after, ""
            }), this.selection = this.selection.replace(/^(\s*)/, t).replace(/(\s*)$/, n)
        }, e.prototype.skipLines = function(e, t, n) {
            void 0 === e && (e = 1), void 0 === t && (t = 1), e++, t++;
            var i, r;
            if (navigator.userAgent.match(/Chrome/) && "X".match(/()./), this.selection = this.selection.replace(/(^\n*)/, ""), this.startTag = this.startTag + f.$1, this.selection = this.selection.replace(/(\n*$)/, ""), this.endTag = this.endTag + f.$1, this.startTag = this.startTag.replace(/(^\n*)/, ""), this.before = this.before + f.$1, this.endTag = this.endTag.replace(/(\n*$)/, ""), this.after = this.after + f.$1, this.before) {
                for (i = r = ""; e--;) i += "\\n?", r += "\n";
                n && (i = "\\n*"), this.before = this.before.replace(new f(i + "$", ""), r)
            }
            if (this.after) {
                for (i = r = ""; t--;) i += "\\n?", r += "\n";
                n && (i = "\\n*"), this.after = this.after.replace(new f(i, ""), r)
            }
        }, l.isVisible = function(e) {
            return window.getComputedStyle ? "none" !== window.getComputedStyle(e, null).getPropertyValue("display") : e.currentStyle ? "none" !== e.currentStyle.display : void 0
        }, l.addEvent = function(e, t, n) {
            e.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener(t, n, !1)
        }, l.removeEvent = function(e, t, n) {
            e.detachEvent ? e.detachEvent("on" + t, n) : e.removeEventListener(t, n, !1)
        }, l.fixEolChars = function(e) {
            return e = e.replace(/\r\n/g, "\n"), e = e.replace(/\r/g, "\n")
        }, l.extendRegExp = function(e, t, n) {
            (null === t || void 0 === t) && (t = ""), (null === n || void 0 === n) && (n = "");
            var i, r = e.toString();
            return r = r.replace(/\/([gim]*)$/, function(e, t) {
                return i = t, ""
            }), r = r.replace(/(^\/|\/$)/g, ""), r = t + r + n, new f(r, i)
        }, c.getTop = function(e, t) {
            var n = e.offsetTop;
            if (!t)
                for (; e = e.offsetParent;) n += e.offsetTop;
            return n
        }, c.getHeight = function(e) {
            return e.offsetHeight || e.scrollHeight
        }, c.getWidth = function(e) {
            return e.offsetWidth || e.scrollWidth
        }, c.getPageSize = function() {
            var e, t, n, i;
            self.innerHeight && self.scrollMaxY ? (e = d.body.scrollWidth, t = self.innerHeight + self.scrollMaxY) : d.body.scrollHeight > d.body.offsetHeight ? (e = d.body.scrollWidth, t = d.body.scrollHeight) : (e = d.body.offsetWidth, t = d.body.offsetHeight), self.innerHeight ? (n = self.innerWidth, i = self.innerHeight) : d.documentElement && d.documentElement.clientHeight ? (n = d.documentElement.clientWidth, i = d.documentElement.clientHeight) : d.body && (n = d.body.clientWidth, i = d.body.clientHeight);
            var r = Math.max(e, n),
                a = Math.max(t, i);
            return [r, a, n, i]
        }, u.createBackground = function() {
            var e = d.createElement("div"),
                t = e.style;
            e.className = "wmd-prompt-background", t.position = "absolute", t.top = "0", t.zIndex = "1000", g.isIE ? t.filter = "alpha(opacity=50)" : t.opacity = "0.5";
            var n = c.getPageSize();
            return t.height = n[1] + "px", g.isIE ? (t.left = d.documentElement.scrollLeft, t.width = d.documentElement.clientWidth) : (t.left = "0", t.width = "100%"), d.body.appendChild(e), e
        }, u.prompt = function(e, t, n, i, r) {
            var a, o;
            void 0 === t && (t = "");
            var s = function(e) {
                    var t = e.charCode || e.keyCode;
                    return 27 === t ? (e.stopPropagation && e.stopPropagation(), u(!0), !1) : void 0
                },
                u = function(e) {
                    l.removeEvent(d.body, "keyup", s);
                    var t = o.value;
                    return e ? t = null : (t = t.replace(/^http:\/\/(https?|ftp):\/\//, "$1://"), /^(?:https?|ftp):\/\//.test(t) || (t = "http://" + t)), a.parentNode.removeChild(a), r(t), !1
                },
                f = function(n, i) {
                    a = d.createElement("div"), a.className = "wmd-prompt-dialog", a.style.padding = "10px;", a.style.position = "fixed", a.style.width = "400px", a.style.zIndex = "1001";
                    var r = d.createElement("div");
                    r.innerHTML = e, r.style.padding = "5px", a.appendChild(r);
                    var f = d.createElement("form"),
                        h = f.style;
                    f.onsubmit = function() {
                        return u(!1)
                    }, h.padding = "0", h.margin = "0", h.cssFloat = "left", h.width = "100%", h.textAlign = "center", h.position = "relative", a.appendChild(f), o = d.createElement("input"), o.type = "text", o.value = t, h = o.style, h.display = "block", h.width = "80%", h.marginLeft = h.marginRight = "auto", f.appendChild(o);
                    var p = d.createElement("input");
                    p.type = "button", p.onclick = function() {
                        return u(!1)
                    }, p.value = n, h = p.style, h.margin = "10px", h.display = "inline", h.width = "7em";
                    var m = d.createElement("input");
                    m.type = "button", m.onclick = function() {
                        return u(!0)
                    }, m.value = i, h = m.style, h.margin = "10px", h.display = "inline", h.width = "7em", f.appendChild(p), f.appendChild(m), l.addEvent(d.body, "keyup", s), a.style.top = "50%", a.style.left = "50%", a.style.display = "block", g.isIE_5or6 && (a.style.position = "absolute", a.style.top = d.documentElement.scrollTop + 200 + "px", a.style.left = "50%"), d.body.appendChild(a), a.style.marginTop = -(c.getHeight(a) / 2) + "px", a.style.marginLeft = -(c.getWidth(a) / 2) + "px"
                };
            setTimeout(function() {
                f(n, i);
                var e = t.length;
                if (void 0 !== o.selectionStart) o.selectionStart = 0, o.selectionEnd = e;
                else if (o.createTextRange) {
                    var r = o.createTextRange();
                    r.collapse(!1), r.moveStart("character", -e), r.moveEnd("character", e), r.select()
                }
                o.focus()
            }, 0)
        };
        var x = o.prototype;
        x.prefixes = "(?:\\s{4,}|\\s*>|\\s*-\\s+|\\s*\\d+\\.|=|\\+|-|_|\\*|#|\\s*\\[[^\n]]+\\]:)", x.unwrap = function(e) {
            var t = new f("([^\\n])\\n(?!(\\n|" + this.prefixes + "))", "g");
            e.selection = e.selection.replace(t, "$1 $2")
        }, x.wrap = function(e, t) {
            this.unwrap(e);
            var n = new f("(.{1," + t + "})( +|$\\n?)", "gm"),
                i = this;
            e.selection = e.selection.replace(n, function(e, t) {
                return new f("^" + i.prefixes, "").test(e) ? e : t + "\n"
            }), e.selection = e.selection.replace(/\s+$/, "")
        }, x.doBold = function(e, t) {
            return this.doBorI(e, t, 2, this.getString("boldexample"))
        }, x.doItalic = function(e, t) {
            return this.doBorI(e, t, 1, this.getString("italicexample"))
        }, x.doBorI = function(e, t, n, i) {
            e.trimWhitespace(), e.selection = e.selection.replace(/\n{2,}/g, "\n");
            var r = /(\**$)/.exec(e.before)[0],
                a = /(^\**)/.exec(e.after)[0],
                o = Math.min(r.length, a.length);
            if (o >= n && (2 != o || 1 != n)) e.before = e.before.replace(f("[*]{" + n + "}$", ""), ""), e.after = e.after.replace(f("^[*]{" + n + "}", ""), "");
            else if (!e.selection && a) {
                e.after = e.after.replace(/^([*_]*)/, ""), e.before = e.before.replace(/(\s?)$/, "");
                var s = f.$1;
                e.before = e.before + a + s
            } else {
                e.selection || a || (e.selection = i);
                var l = 1 >= n ? "*" : "**";
                e.before = e.before + l, e.after = l + e.after
            }
        }, x.stripLinkDefs = function(e, t) {
            return e = e.replace(/^[ ]{0,3}\[(\d+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|$)/gm, function(e, n, i, r, a) {
                return t[n] = e.replace(/\s*$/, ""), r ? (t[n] = e.replace(/["(](.+?)[")]$/, ""), r + a) : ""
            })
        }, x.addLinkDef = function(e, t) {
            var n = 0,
                i = {};
            e.before = this.stripLinkDefs(e.before, i), e.selection = this.stripLinkDefs(e.selection, i), e.after = this.stripLinkDefs(e.after, i);
            var r = "",
                a = /(\[)((?:\[[^\]]*\]|[^\[\]])*)(\][ ]?(?:\n[ ]*)?\[)(\d+)(\])/g,
                o = function(e) {
                    n++, e = e.replace(/^[ ]{0,3}\[(\d+)\]:/, "  [" + n + "]:"), r += "\n" + e
                },
                s = function(e, t, r, l, c, u) {
                    return r = r.replace(a, s), i[c] ? (o(i[c]), t + r + l + n + u) : e
                };
            e.before = e.before.replace(a, s), t ? o(t) : e.selection = e.selection.replace(a, s);
            var l = n;
            return e.after = e.after.replace(a, s), e.after && (e.after = e.after.replace(/\n*$/, "")), e.after || (e.selection = e.selection.replace(/\n*$/, "")), e.after += "\n\n" + r, l
        }, x.doLinkOrImage = function(e, t, n) {
            e.trimWhitespace(), e.findTags(/\s*!?\[/, /\][ ]?(?:\n[ ]*)?(\[.*?\])?/);
            var i;
            if (!(e.endTag.length > 1 && e.startTag.length > 0)) {
                if (e.selection = e.startTag + e.selection + e.endTag, e.startTag = e.endTag = "", /\n\n/.test(e.selection)) return this.addLinkDef(e, null), void 0;
                var r = this,
                    a = function(a) {
                        if (i.parentNode.removeChild(i), null !== a) {
                            e.selection = (" " + e.selection).replace(/([^\\](?:\\\\)*)(?=[[\]])/g, "$1\\").substr(1);
                            var o = " [999]: " + s(a),
                                l = r.addLinkDef(e, o);
                            e.startTag = n ? "![" : "[", e.endTag = "][" + l + "]", e.selection || (e.selection = n ? r.getString("imagedescription") : r.getString("linkdescription"))
                        }
                        t()
                    };
                return i = u.createBackground(), n ? this.hooks.insertImageDialog(a) || u.prompt(this.getString("imagedialog"), v, this.getString("ok"), this.getString("cancel"), a) : u.prompt(this.getString("linkdialog"), b, this.getString("ok"), this.getString("cancel"), a), !0
            }
            e.startTag = e.startTag.replace(/!?\[/, ""), e.endTag = "", this.addLinkDef(e, null)
        }, x.doAutoindent = function(e) {
            var t = this,
                n = !1;
            e.before = e.before.replace(/(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]*\n$/, "\n\n"), e.before = e.before.replace(/(\n|^)[ ]{0,3}>[ \t]*\n$/, "\n\n"), e.before = e.before.replace(/(\n|^)[ \t]+\n$/, "\n\n"), e.selection || /^[ \t]*(?:\n|$)/.test(e.after) || (e.after = e.after.replace(/^[^\n]*/, function(t) {
                return e.selection = t, ""
            }), n = !0), /(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]+.*\n$/.test(e.before) && t.doList && t.doList(e), /(\n|^)[ ]{0,3}>[ \t]+.*\n$/.test(e.before) && t.doBlockquote && t.doBlockquote(e), /(\n|^)(\t|[ ]{4,}).*\n$/.test(e.before) && t.doCode && t.doCode(e), n && (e.after = e.selection + e.after, e.selection = "")
        }, x.doBlockquote = function(e) {
            e.selection = e.selection.replace(/^(\n*)([^\r]+?)(\n*)$/, function(t, n, i, r) {
                return e.before += n, e.after = r + e.after, i
            }), e.before = e.before.replace(/(>[ \t]*)$/, function(t, n) {
                return e.selection = n + e.selection, ""
            }), e.selection = e.selection.replace(/^(\s|>)+$/, ""), e.selection = e.selection || this.getString("quoteexample");
            var t, n = "",
                i = "";
            if (e.before) {
                for (var r = e.before.replace(/\n$/, "").split("\n"), a = !1, o = 0; o < r.length; o++) {
                    var s = !1;
                    t = r[o], a = a && t.length > 0, /^>/.test(t) ? (s = !0, !a && t.length > 1 && (a = !0)) : s = /^[ \t]*$/.test(t) ? !0 : a, s ? n += t + "\n" : (i += n + t, n = "\n")
                }
                /(^|\n)>/.test(n) || (i += n, n = "")
            }
            e.startTag = n, e.before = i, e.after && (e.after = e.after.replace(/^\n?/, "\n")), e.after = e.after.replace(/^(((\n|^)(\n[ \t]*)*>(.+\n)*.*)+(\n[ \t]*)*)/, function(t) {
                return e.endTag = t, ""
            });
            var l = function(t) {
                var n = t ? "> " : "";
                e.startTag && (e.startTag = e.startTag.replace(/\n((>|\s)*)\n$/, function(e, t) {
                    return "\n" + t.replace(/^[ ]{0,3}>?[ \t]*$/gm, n) + "\n"
                })), e.endTag && (e.endTag = e.endTag.replace(/^\n((>|\s)*)\n/, function(e, t) {
                    return "\n" + t.replace(/^[ ]{0,3}>?[ \t]*$/gm, n) + "\n"
                }))
            };
            /^(?![ ]{0,3}>)/m.test(e.selection) ? (this.wrap(e, p.lineLength - 2), e.selection = e.selection.replace(/^/gm, "> "), l(!0), e.skipLines()) : (e.selection = e.selection.replace(/^[ ]{0,3}> ?/gm, ""), this.unwrap(e), l(!1), !/^(\n|^)[ ]{0,3}>/.test(e.selection) && e.startTag && (e.startTag = e.startTag.replace(/\n{0,2}$/, "\n\n")), !/(\n|^)[ ]{0,3}>.*$/.test(e.selection) && e.endTag && (e.endTag = e.endTag.replace(/^\n{0,2}/, "\n\n"))), e.selection = this.hooks.postBlockquoteCreation(e.selection), /\n/.test(e.selection) || (e.selection = e.selection.replace(/^(> *)/, function(t, n) {
                return e.startTag += n, ""
            }))
        }, x.doCode = function(e) {
            var t = /\S[ ]*$/.test(e.before),
                n = /^[ ]*\S/.test(e.after);
            if (!n && !t || /\n/.test(e.selection)) {
                e.before = e.before.replace(/[ ]{4}$/, function(t) {
                    return e.selection = t + e.selection, ""
                });
                var i = 1,
                    r = 1;
                /(\n|^)(\t|[ ]{4,}).*\n$/.test(e.before) && (i = 0), /^\n(\t|[ ]{4,})/.test(e.after) && (r = 0), e.skipLines(i, r), e.selection ? /^[ ]{0,3}\S/m.test(e.selection) ? /\n/.test(e.selection) ? e.selection = e.selection.replace(/^/gm, "    ") : e.before += "    " : e.selection = e.selection.replace(/^(?:[ ]{4}|[ ]{0,3}\t)/gm, "") : (e.startTag = "    ", e.selection = this.getString("codeexample"))
            } else e.trimWhitespace(), e.findTags(/`/, /`/), e.startTag || e.endTag ? e.endTag && !e.startTag ? (e.before += e.endTag, e.endTag = "") : e.startTag = e.endTag = "" : (e.startTag = e.endTag = "`", e.selection || (e.selection = this.getString("codeexample")))
        }, x.doList = function(e, t, n) {
            var i = /(\n|^)(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*$/,
                r = /^\n*(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*/,
                a = "-",
                o = 1,
                s = function() {
                    var e;
                    return n ? (e = " " + o + ". ", o++) : e = " " + a + " ", e
                },
                l = function(e) {
                    return void 0 === n && (n = /^\s*\d/.test(e)), e = e.replace(/^[ ]{0,3}([*+-]|\d+[.])\s/gm, function() {
                        return s()
                    })
                };
            if (e.findTags(/(\n|^)*[ ]{0,3}([*+-]|\d+[.])\s+/, null), !e.before || /\n$/.test(e.before) || /^\n/.test(e.startTag) || (e.before += e.startTag, e.startTag = ""), e.startTag) {
                var c = /\d+[.]/.test(e.startTag);
                if (e.startTag = "", e.selection = e.selection.replace(/\n[ ]{4}/g, "\n"), this.unwrap(e), e.skipLines(), c && (e.after = e.after.replace(r, l)), n == c) return
            }
            var u = 1;
            e.before = e.before.replace(i, function(e) {
                return /^\s*([*+-])/.test(e) && (a = f.$1), u = /[^\n]\n\n[^\n]/.test(e) ? 1 : 0, l(e)
            }), e.selection || (e.selection = this.getString("litem"));
            var d = s(),
                h = 1;
            e.after = e.after.replace(r, function(e) {
                return h = /[^\n]\n\n[^\n]/.test(e) ? 1 : 0, l(e)
            }), e.trimWhitespace(!0), e.skipLines(u, h, !0), e.startTag = d;
            var g = d.replace(/./g, " ");
            this.wrap(e, p.lineLength - g.length), e.selection = e.selection.replace(/\n/g, "\n" + g)
        }, x.doHeading = function(e) {
            if (e.selection = e.selection.replace(/\s+/g, " "), e.selection = e.selection.replace(/(^\s+|\s+$)/g, ""), !e.selection) return e.startTag = "## ", e.selection = this.getString("headingexample"), e.endTag = " ##", void 0;
            var t = 0;
            e.findTags(/#+[ ]*/, /[ ]*#+/), /#+/.test(e.startTag) && (t = f.lastMatch.length), e.startTag = e.endTag = "", e.findTags(null, /\s?(-+|=+)/), /=+/.test(e.endTag) && (t = 1), /-+/.test(e.endTag) && (t = 2), e.startTag = e.endTag = "", e.skipLines(1, 1);
            var n = 0 == t ? 2 : t - 1;
            if (n > 0) {
                var i = n >= 2 ? "-" : "=",
                    r = e.selection.length;
                for (r > p.lineLength && (r = p.lineLength), e.endTag = "\n"; r--;) e.endTag += i
            }
        }, x.doHorizontalRule = function(e) {
            e.startTag = "----------\n", e.selection = "", e.skipLines(2, 1, !0)
        }
    }(),
    function() {
        function e() {
            for (var e = 0; e < b.length; e++) b[e].refreshPreview()
        }

        function t(e) {
            return {
                "bold": "Strong <strong> Ctrl+B",
                "boldexample": "strong text",
                "italic": "Emphasis <em> Ctrl+I",
                "italicexample": "emphasized text",
                "link": "Hyperlink <a> Ctrl+L",
                "linkdescription": "enter link description here",
                "linkdialog": '<p><b>Insert Hyperlink</b></p><p>http://example.com/ "optional title"</p>',
                "quote": "Blockquote <blockquote> Ctrl+Q",
                "quoteexample": "Blockquote",
                "code": e ? "Preformatted text <pre><code> Ctrl-K" : "Code Sample <pre><code> Ctrl+K",
                "codeexample": e ? "enter preformatted text here" : "enter code here",
                "image": "Image <img> Ctrl+G",
                "imagedescription": "enter image description here",
                "imagedialog": '<p><b>Insert Image</b></p><p>http://example.com/images/diagram.jpg "optional title"<br><br>' + function(e) {
                    return "Need " + e.startAnchor + "free image hosting?" + e.endAnchor
                }({
                    "startAnchor": "<a href='http://www.google.com/search?q=free+image+hosting' target='_blank'>",
                    "endAnchor": "</a>"
                }) + "</p>",
                "olist": "Numbered List <ol> Ctrl+O",
                "ulist": "Bulleted List <ul> Ctrl+U",
                "litem": "List item",
                "heading": "Heading <h1>/<h2> Ctrl+H",
                "headingexample": "Heading",
                "hr": "Horizontal Rule <hr> Ctrl+R",
                "undo": "Undo - Ctrl+Z",
                "redo": "Redo - Ctrl+Y",
                "redomac": "Redo - Ctrl+Shift+Z",
                "help": "Markdown Editing Help",
                "ok": "OK",
                "cancel": "Cancel"
            }
        }

        function n(e) {
            var t = e.match(/^\s*>\s*!/gm);
            if (t && t.length == e.split("\n").length) {
                var n = !1;
                e = e.replace(/(.*) (\w)/, function(e, t, i) {
                    return n = !0, t + "\n> " + i
                }), n || (e = e.replace(/^(\s*>\s*)!/m, "$1&#33;"))
            }
            return e
        }

        function i(e) {
            var t = /\<blockquote\>[\n\s]*?\<p\>[\n\s]*?(![\s\S]*?)\<\/p\>[\n\s]*?\<\/blockquote\>/g,
                n = /^\s*?[^\s!]/m,
                i = /^\s*?!/gm;
            return e = e.replace(t, function(e, t) {
                return n.test(t) ? e : (e = e.replace(t, t.replace(i, "")), e = e.replace("<blockquote>", '<blockquote class="spoiler">'))
            })
        }

        function r(e) {
            for (var t, n = [], i = /<(a|code)[^>]*>/gi; null != (t = i.exec(e));) {
                n.push(t.index);
                var r = new RegExp("</" + t[1] + ">", "ig");
                r.lastIndex = i.lastIndex;
                var a = r.exec(e);
                if (null == a) break;
                n.push(r.lastIndex), i.lastIndex = r.lastIndex
            }
            return n
        }

        function a(e) {
            if (!window.tagRendererRaw) return e;
            var t, n, i = StackExchange.options.site.nonAsciiTags ? /\[(meta-)?tag:([a-z0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF#+.-]+)\]/gi : /\[(meta-)?tag:([a-z0-9#+.-]+)\]/gi;
            return e = e.replace(i, function(i, a, o, s) {
                if (!v && a) return i;
                t || (t = r(e), n = t.length);
                for (var l = !1, c = 0; n > c && !(t[c] > s); c++) l = !l;
                if (l) return i;
                var u = null;
                StackExchange.options.site.parentUrl && !a && (u = StackExchange.options.site.parentUrl);
                var d = sanitizeAndSplitTags(o);
                return 1 !== d.length ? i : tagRendererRaw(d[0], u)
            })
        }

        function o(e) {
            var t, n, i;
            "undefined" == typeof y && (y = StackExchange.options.styleCode), y && (t = u(e), n = u(t + e), e = h(e, t, n));
            var i = s(e);
            return y && (i = p(i, t, n)), i
        }

        function s(e) {
            return e.replace(/<[^>]*>?/gi, l)
        }

        function l(e) {
            return e.match(k) || e.match(S) || e.match(C) ? e : ""
        }

        function c(e) {
            if ("" == e) return "";
            var t = /<\/?\w+[^>]*(\s|$|>)/g,
                n = e.toLowerCase().match(t),
                i = (n || []).length;
            if (0 == i) return e;
            for (var r, a, o, s = "<p><img><br><li><hr>", l = [], c = [], u = !1, d = 0; i > d; d++)
                if (r = n[d].replace(/<\/?(\w+).*/, "$1"), !(l[d] || s.search("<" + r + ">") > -1)) {
                    if (a = n[d], o = -1, !/^<\//.test(a))
                        for (var f = d + 1; i > f; f++)
                            if (!l[f] && n[f] == "</" + r + ">") {
                                o = f;
                                break
                            } - 1 == o ? u = c[d] = !0 : l[o] = !0
                }
            if (!u) return e;
            var d = 0;
            return e = e.replace(t, function(e) {
                var t = c[d] ? "" : e;
                return d++, t
            })
        }

        function u(e) {
            var t = (e.match(/~/g) || []).length;
            return new Array(t + 2).join("~")
        }

        function d(e) {
            var t = _.length;
            t > 0 && 0 === e.indexOf(_[t - 1]) ? _[t - 1] = e : _.push(e), A.trigger()
        }

        function f(e) {
            if (/^lang-/.test(e)) return e;
            var t = "c_" + e,
                n = E[t];
            return n ? n : T[t] ? null : (T[t] = !0, d(e), null)
        }

        function h(e, t, n) {
            return e = e.replace(I, function(e, n, i) {
                return t + n + t + i
            }), e.replace(R, function(e, t) {
                return n + t + n
            })
        }

        function p(e, t, n) {
            var i = new RegExp(t + "([a-z0-9#+.-]+)" + t + "(\\s*?<pre)", "gi");
            e = e.replace(i, function(e, t, n) {
                var i = f(t);
                return i ? n + " class='" + i + " prettyprint-override'" : n
            });
            var r, a = new RegExp("(" + n + "([a-z0-9#+.-]+)" + n + ")|(<pre><code>)", "gi");
            return e.replace(a, function(e, t, n) {
                if (t) return r = n, "";
                if (!r) return e;
                var i = f(r);
                return i ? "<pre class='" + i + " prettyprint-override'><code>" : e
            })
        }

        function g(e) {
            function t() {
                l.animate({
                    "height": c.height() - u
                })
            }

            function n(e) {
                e.is(":animated") || e.animate({
                    "top": -15
                }, 400).animate({
                    "top": 0
                }, 400).animate({
                    "top": -8
                }, 300).animate({
                    "top": 0
                }, 300).animate({
                    "top": -4
                }, 200).animate({
                    "top": 0
                }, 200).animate({
                    "top": -2
                }, 100).animate({
                    "top": 0
                }, 100).animate({
                    "top": -1
                }, 50).animate({
                    "top": 0
                }, 50)
            }

            function i(e) {
                if (c) return e(), void 0;
                if (!h) {
                    h = !0;
                    var i = g.offset();
                    u = i.top - $("#wmd-button-row" + p).offset().top - $("#wmd-button-row" + p).outerHeight() - 5, d = $("#wmd-help-button" + p);
                    var r = d.offset().left + d.outerWidth(),
                        a = i.left,
                        o = g.outerWidth() + a,
                        s = Math.max(r, o);
                    f = {
                        "right": r - s,
                        "width": s - a,
                        "top": $("#wmd-button-row" + p).outerHeight() + 5
                    }, d.addClass("active-help"), l = $("<div style='clear:both' />").insertBefore(g), c = $('<div id="mdhelp' + p + '" class="mdhelp"><ul id="mdhelp-tabs' + p + '" class="mdhelp-tabs"><li /></ul></div>').find("li").addSpinner().end().css(f).insertAfter(d), t(), $.get("/posts/markdown-help", {
                        "postfix": p
                    }).done(function(i) {
                        c.remove(), c = $(i).insertAfter(d).css(f), $("#mdhelp-tabs" + p).delegate("li:not(:last-child)", "click", function() {
                            var e = $(this).hasClass("selected");
                            if (c.find(".mdhelp-tab").hide(), $("#mdhelp-tabs" + p + " li").removeClass("selected"), !e) {
                                $("#" + $(this).attr("data-tab")).show(), $(this).addClass("selected");
                                var i = $(this).attr("data-buttons");
                                if (i)
                                    for (var r = i.split(","), a = 0; a < r.length; a++) n($("#wmd-" + r[a] + "-button" + p))
                            }
                            t()
                        }), h = !1, e()
                    })
                }
            }

            function r() {
                m = !0, i(function() {
                    d.addClass("active-help"), c.show(), t()
                })
            }

            function a() {
                m || r()
            }

            function o() {
                c.hide(), l.animate({
                    "height": 0
                }), d.removeClass("active-help")
            }

            function s() {
                c && c.is(":visible") ? o() : r()
            }
            var l, c, u, d, f, h = !1,
                p = (e || {}).postfix || "",
                g = $("#wmd-input" + p),
                m = !1;
            this.toggle = s, this.showOnce = a
        }

        function m(e) {
            function t(e) {
                return "facebook.stackoverflow.com" === e ? "stackoverflow.com" : e
            }

            function n(e, t) {
                var n = u[e + "|" + t];
                return n ? n : (i(e, t), null)
            }

            function i(e, n) {
                if (!d[e + "|" + n] && !r(t(e))) {
                    d[e + "|" + n] = !0;
                    var i = f[e];
                    i || (i = f[e] = []), i.push(n), g.trigger()
                }
            }

            function r(e) {
                if (e === c) return !1;
                if (m["s_" + e]) return !0;
                var t = /^meta\./.test(c);
                return c === "meta." + e || !t && "meta." + c === e ? !1 : t && e === StackExchange.options.networkMetaHostname ? !1 : c === StackExchange.options.networkMetaHostname ? !1 : !0
            }

            function a(e) {
                var t = e.toLowerCase().replace(/\./g, "$").replace(/-/g, "_").replace(/[^_$a-z]/, "");
                return window.apiCallbacks[t] || (window.apiCallbacks[t] = function(t) {
                    v(t, e)
                }), "apiCallbacks." + t
            }

            function o(e, n) {
                var i = t(e);
                if (i === c) return !0;
                var r = b[e];
                return r || (r = b[e] = {
                    "count": 0,
                    "ids": {}
                }), r.ids[n] ? !0 : r.count >= x ? !1 : (r.count++, r.ids[n] = !0, !0)
            }
            var s = /<a href="((\S+)\/q(?:uestions)?\/(\d+)(?:|\/\S*?))">\1<\/a>/g,
                l = window.location.hostname.toLowerCase(),
                c = t(l),
                u = {},
                d = {},
                f = {},
                h = "6AU78DZ)GcdjNjAszYmTLQ((",
                p = "!6G7RPxWUNTleV",
                g = StackExchange.helpers.DelayedReaction(function() {
                    var e = !1;
                    for (var n in f)
                        if (f.hasOwnProperty(n)) {
                            var i, r = a(n);
                            f[n].length > 30 ? i = f[n].splice(0, 30).join(";") : (i = f[n].join(";"), delete f[n]), e = !0, $.ajax({
                                "url": "http://api.stackexchange.com/2.0/questions/" + i + "?pagesize=30&key=" + h + "&filter=" + p + "&site=" + t(n),
                                "crossDomain": !0,
                                "jsonpCallback": r,
                                "dataType": "jsonp"
                            });
                            break
                        }
                    e && g.trigger()
                }, 1e3, {
                    "sliding": !0
                }),
                m = {};
            window.apiCallbacks = {};
            var v = function(t, n) {
                    if (t) {
                        if (t.error_message) return /^No site found/.test(t.error_message) && (m["s_" + n] = !0), void 0;
                        if (t.items) {
                            for (var i = t.items, r = i.length, a = 0; r > a; a++) {
                                var o = i[a];
                                u[n + "|" + o.question_id] = o.title
                            }
                            e && e()
                        }
                    }
                },
                b = {},
                x = /^meta\./.test(c) ? 40 : 10;
            return function(e) {
                return b = {}, e.replace(s, function(e, t, i, r) {
                    if (i = i.toLowerCase().replace(/^http:\/\//, ""), /[^a-z0-9.]/.test(i)) return e;
                    if (!o(i, r)) return e;
                    var a = n(i, r);
                    return a ? '<a href="' + t + '">' + a + "</a>" : e
                })
            }
        }
        if (!StackExchange.MarkdownEditor) {
            var v, b = [],
                x = m(e),
                w = $.Callbacks();
            StackExchange.MarkdownEditor = function(e) {
                var r = e.postfix || "";
                v = StackExchange.options.site.isMetaSite;
                var s = new Markdown.Converter({
                        "nonAsciiLetters": !0,
                        "asteriskIntraWordEmphasis": !StackExchange.options.disableIntrawordEmphasis
                    }),
                    l = s.hooks;
                l.addNoop("preSafe"), e.disableAutoQuestionLinks || l.chain("postConversion", x), l.chain("postConversion", function(e) {
                    return l.preSafe(e)
                }), l.chain("postConversion", o), l.chain("postConversion", c), l.chain("postConversion", i), l.chain("postConversion", a);
                var u = new g({
                        "postfix": r
                    }),
                    d = {
                        "helpButton": {
                            "handler": u.toggle
                        },
                        "strings": t(e.noCode)
                    },
                    f = new Markdown.Editor(s, r, d);
                f.hooks.chain("postBlockquoteCreation", n), StackExchange.options.disableImageUploads || f.hooks.set("insertImageDialog", StackExchange.imageUploader.uploadImageDialog), w.fire(f, e.postfix);
                var h = $("#wmd-preview" + r);
                return f.hooks.chain("onPreviewRefresh", function() {
                    h.trigger("wmdrefresh")
                }), b.push(f), f.run(), e.immediatelyShowMarkdownHelp ? u.showOnce(e) : e.autoShowMarkdownHelp && $("#wmd-input" + r).one("focus", function() {
                    u.showOnce(e)
                }), f.disableSubmission = function() {
                    $("#submit-button" + r).attr("disabled", "disabled"), StackExchange.navPrevention.stop()
                }, f
            }, StackExchange.MarkdownEditor.creationCallbacks = w, StackExchange.MarkdownEditor.refreshAllPreviews = e;
            var y;
            StackExchange.MarkdownEditor.sanitizeHtml = s;
            var k = /^(<\/?(b|blockquote|code|del|dd|dl|dt|em|h1|h2|h3|i|kbd|li|ol(?: start="\d+")?|p|pre|s|sup|sub|strong|strike|ul)>|<(br|hr)\s?\/?>)$/i,
                S = /^(<a\shref="((https?|ftp):\/\/|\/)[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)*[\]$]+"(\stitle="[^"<>]+")?\s?>|<\/a>)$/i,
                C = /^(<img\ssrc="(https?:\/\/|\/)[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)*[\]$]+"(\swidth="\d{1,3}")?(\sheight="\d{1,3}")?(\salt="[^"<>]*")?(\stitle="[^"<>]*")?\s?\/?>)$/i;
            StackExchange.MarkdownEditor.balanceTags = c;
            var E = {},
                T = {},
                _ = [],
                A = StackExchange.helpers.DelayedReaction(function() {
                    0 != _.length && ($.ajax("/api/tags/" + encodeURIComponent(_.join(";")) + "/syntax-highlight", {
                        "cache": !0
                    }).done(function(e) {
                        var t = !1;
                        for (var n in e) e.hasOwnProperty(n) && (E["c_" + n] = e[n], t = !0);
                        t && (StackExchange.MarkdownEditor.refreshAllPreviews(), styleCode())
                    }), _ = [])
                }, 2e3, {
                    "sliding": !0
                }),
                I = /<!-- language: ([a-z0-9#+\-.]+) -->(\s*?<pre>\s*?<code>)/gi,
                R = /<!-- language-all: ([a-z0-9#+\-.]+) -->/gi
        }
    }(), StackExchange.editor = function() {
        var e = function(e) {
                e = e || {};
                var t, n, i = e.postfix || "",
                    r = e.heartbeatType,
                    a = e.bindNavPrevention,
                    o = $("#post-form" + i),
                    s = $("#wmd-input" + i);
                n = $("#title, #edit-comment, #m-address, .edit-comment"), t = n.add(".tag-editor input"), o.submit(function() {
                    var e = !0;
                    return n.each(function() {
                        StackExchange.helpers.hideHelpOverlay($(this))
                    }), e && (StackExchange.helpers.disableSubmitButton(o), StackExchange.navPrevention.stop()), e
                }), $(".original-question").not(".processed").TextAreaResizer(), s.not(".processed").TextAreaResizer(), s.typeWatch({
                    "highlight": !1,
                    "wait": 5e3,
                    "captureLength": 5,
                    "callback": styleCode
                });
                var l = new StackExchange.MarkdownEditor(e);
                if (r) {
                    var c = e.discardSelector ? $(e.discardSelector) : null;
                    StackExchange.cardiologist.addHeart(r, s, l, c, e.postId)
                }
                if ("ask" == r || "answer" == r) {
                    var u = s.add(t),
                        d = function() {
                            return StackExchange.helpers.loadTicks(o), u.unbind("keydown", d), !0
                        };
                    u.bind("keydown", d)
                }
                if (a) {
                    var f = "edit" == r || "ask" == r ? s.add("#title").add("#tagnames") : s;
                    StackExchange.navPrevention.init(f)
                }
                if (o.find(".wmd-preview").click(function(e) {
                        2 != e.which && $(this).siblings().find("textarea").focus()
                    }), StackExchange.helpers.bindHelpOverlayEvents(n), 0 == $("#ask-page-has-errors").length && $("#title").is("input") && 0 === o.find(":focus").length && $("#title").focus(), e.oncreated && e.oncreated(l), e.discardSelector && ("ask" == r || "answer" == r || "moderatormessage" == r)) {
                    var h = $(e.discardSelector);
                    h.click(function(e) {
                        if (e.preventDefault(), confirm("Are you sure you want to discard your draft?")) {
                            $("#title").val("").blur(), $("#question-suggestions").empty(), $("#wmd-input-42").val(""), $("#wmd-preview-42").html(""), $("#answer-from-ask").is(":visible") && $("#answer-from-ask").is(":checked") && $("#answer-from-ask").click();
                            var t = $("#tagnames");
                            return t.length > 0 && t[0].func_clear && (t[0].func_clear(), t.blur()), s.val("").blur(), l.refreshPreview(), $.post("/post/discard-draft", {
                                "fkey": StackExchange.options.user.fkey,
                                "postType": r
                            }, function() {
                                $("#draft-saved").hide(), $("#draft-discarded").show();
                                var e = null;
                                e = function() {
                                    $("#draft-discarded").hide(), $("#title").unbind("keypress", e), s.unbind("keypress", e)
                                }, $("#title").bind("keypress", e), s.bind("keypress", e)
                            }), h.hide(), !1
                        }
                    })
                }
            },
            t = function(t) {
                var n = (t || {}).postfix || "",
                    i = 0 != $("#wmd-preview" + n).length && ("-42" !== n || 0 === $("#answer-from-ask").length) && 0 === $("#show-editor-button" + n).length;
                i ? (e(t), StackExchange.editor.finallyInit || (StackExchange.editor.finallyInit = function() {})) : StackExchange.editor.finallyInit = function() {
                    e(t)
                }
            };
        return {
            "init": e,
            "initIfShown": t
        }
    }(), StackExchange.cardiologist = function() {
        function e(e) {
            var n = "number" == typeof e ? e : 1e3 * (v + b);
            h && (n = Math.max(n, 6e3 - ((new Date).getTime() - h))), p && clearTimeout(p), p = setTimeout(t, n)
        }

        function t() {
            if (p = null, m.length || n(), !m.length) return e(), void 0;
            var t = m.shift();
            t.checkActive() ? t.beat() : e()
        }

        function n() {
            var e;
            m = [], u && !u.isDisabled && u.beatCount < 30 && m.push(u);
            for (var t = 0; t < g.length; t++) e = g[t], e != u && !e.isDisabled && e.beatCount < 30 && m.push(e);
            v = Math.max(15, Math.min(45, 60 / (m.length || 1)))
        }

        function i() {}

        function r(e) {
            var t = [];
            $.get("/questions/" + e, function(n) {
                var i = $(n);
                if (i.find("div.answer").each(function() {
                        var e = this.id.substring("answer-".length);
                        0 == $("#answer-" + e).length && t.push(this.id)
                    }), t.length > 0) {
                    var r = "#" + t.join(",#"),
                        a = i.find(r),
                        o = $("div.answer:last");
                    0 == o.length && (o = $("#answers-header")), a.hide(), o.after(a), a.fadeIn("slow");
                    var s = $("div.answer").length;
                    $(".subheader h2").text(s + " Answer" + (s > 1 ? "s" : "")), StackExchange.vote.init(e), StackExchange.comments.init({
                        "post": a
                    })
                }
                StackExchange.notify.close(w), x = !1
            }, "html")
        }

        function a(e, t, n, r, a) {
            var o, s = new i;
            switch (s.type = e, s.jTextarea = t, s.discardDraftLink = r, e) {
                case "ask":
                    o = 0;
                    break;
                case "answer":
                    o = $("#post-id").val() || location.href.match(/\/questions\/(\d+)/i)[1];
                    break;
                case "edit":
                    o = a || $("#post-id").val() || t.closest(".question, .answer").find(".vote input").val();
                    var l = t.closest(".inline-post"),
                        c = null;
                    l.length > 0 && (c = l[0].action.split("/").pop()), c || (c = $("#client-revision-guid").val()), s.revisionGuid = c;
                    break;
                case "moderatormessage":
                    o = +$("#moderator-message-to-user").attr("data-userid")
            }
            s.postId = o, s.editor = n, t.keypress(function() {
                s.activate()
            })
        }

        function o(e, t) {
            return u && u.checkActive() ? (u.beat(t).done(e), void 0) : (e(), void 0)
        }

        function s() {
            e(1)
        }

        function l() {
            x = !0
        }

        function c() {
            if (null == g) return !1;
            for (var e = 0; e < g.length; e++)
                if (1 == g[e].checkActive()) return !0;
            return !1
        }
        var u, d, f, h, p, g = [],
            m = [],
            v = 45,
            b = 0,
            x = !1,
            w = -2,
            y = {
                "ask": function(e) {
                    if (e.relatedQuestions) {
                        var t = $("#how-to-format"),
                            n = e.relatedQuestions != f;
                        n && t.hide(), t.empty().append("<h4>Similar Questions</h4>" + e.relatedQuestions), n && showFadingHelpText(t), f = e.relatedQuestions
                    }
                    e.suggestedTags && StackExchange.tagSuggestions && StackExchange.tagSuggestions.suggest(e.suggestedTags)
                },
                "answer": function(e, t) {
                    if (e && !x)
                        if (e.disableEditor) {
                            var n = function(e) {
                                return "This question has been " + e.message + " - no more answers will be accepted."
                            }({
                                "message": e.message
                            });
                            StackExchange.notify.show(n, w), x = !0
                        } else {
                            var i = parseInt(e.message);
                            if (i > 0) {
                                var a = function(e) {
                                    return 1 == e.count ? e.count + " new answer has been posted - " + e.startAnchor + "load new answers." + e.endAnchor : e.count + " new answers have been posted - " + e.startAnchor + "load new answers." + e.endAnchor
                                }({
                                    "count": i,
                                    "startAnchor": '<a id="load-new-answers">',
                                    "endAnchor": "</a>"
                                });
                                StackExchange.notify.show(a, w), x = !0, $("#load-new-answers").click(function() {
                                    r(t.postId)
                                })
                            }
                        }
                },
                "edit": function(e) {
                    if (e && e.message) {
                        var t = StackExchange.notify.getMessageText(w);
                        t != $("<span />").html(e.message).text() && (StackExchange.notify.close(w), StackExchange.notify.show(e.message, w))
                    }
                },
                "moderatormessage": function() {}
            };
        i.prototype = {
            "activate": function() {
                u = this, this.isActive || (this.isActive = !0, this.beatCount = 0, g.push(this), 1 === g.length && e())
            },
            "checkActive": function() {
                return !this.isActive || this.isDisabled ? !1 : this.jTextarea.closest("body").length ? !0 : (delete this.jTextarea, this.isDisabled = !0, !1)
            },
            "beat": function(e) {
                var t = this,
                    n = {
                        "type": "POST",
                        "url": "/posts/" + this.postId + "/editor-heartbeat/" + this.type,
                        "dataType": "json",
                        "data": {}
                    };
                if (e || (n.success = function(e) {
                        t.success(e)
                    }, n.error = function() {
                        t.error()
                    }, n.complete = function() {
                        t.complete()
                    }), this.shouldSendDraft()) {
                    var i = {
                        "text": this.jTextarea.val()
                    };
                    "ask" === this.type && (i.title = $("#title").val(), i.tagnames = $("#tagnames").val(), i.answertext = $("#wmd-input-42").val()), d && d.heart === this && d.title === i.title && d.tagnames === i.tagnames && d.text === i.text && d.answertext === i.answertext || (n.data = i, d = {
                        "heart": this,
                        "title": i.title,
                        "tagnames": i.tagnames,
                        "text": i.text,
                        "answertext": i.answertext
                    })
                }
                if (e && !("text" in n.data)) return $.Deferred().resolve().promise();
                if (this.revisionGuid && (n.data.clientRevisionGuid = this.revisionGuid), "answer" === this.type) {
                    var r = $("#answers-header .answers-subheader h2").text().replace(/ answers?/i, "") || "0";
                    n.data.clientCount = r
                }
                return h = (new Date).getTime(), $.ajax(n).promise()
            },
            "shouldSendDraft": function() {
                return "edit" !== this.type && u === this
            },
            "success": function(e) {
                y[this.type](e, this), e.disableEditor && (this.editor.disableSubmission(), this.isDisabled = !0), e.draftSaved && k(this.jTextarea, this.discardDraftLink), this.beatCount++, b = 0
            },
            "error": function() {
                $("#draft-saved").hide(), u === this && m.unshift(this), b = (new Date).getTime() % 100 / 10
            },
            "complete": function() {
                e()
            }
        };
        var k = function(e, t) {
            var n = $("#draft-saved"),
                i = function() {
                    n.text("draft saved").fadeIn("fast")
                };
            n.is(":visible") ? n.fadeOut("fast", i) : i(), t && t.removeClass("dno").show();
            var r = function(t) {
                (115 != t.which || !t.ctrlKey || t.shiftKey || t.altKey) && (e.unbind("keypress", r), $("#draft-saved").fadeOut("fast"))
            };
            e.bind("keypress", r), $("#draft-discarded").hide()
        };
        return {
            "addHeart": a,
            "ensureDraftSaved": o,
            "beatASAP": s,
            "notifiedOfNewAnswer": l,
            "isHeartBeating": c
        }
    }(), StackExchange.navPrevention = function() {
        var e, t, n = function() {
                var n = !1;
                return e.each(function(e) {
                    n = n || $(this).val().replace(/\s+$/g, "") !== t[e].replace(/\s+$/g, "")
                }), n
            },
            i = function(t) {
                window.onbeforeunload = t ? function() {
                    return e && n() ? t : void 0
                } : null
            },
            r = function() {
                i("You have started writing or editing a post.")
            };
        return {
            "init": function(n) {
                e = n.one("keypress", r), t = [], n.each(function() {
                    t.push($(this).val())
                })
            },
            "start": function() {
                e && r()
            },
            "stop": function() {
                e && (e.unbind("keypress", r), i(null), e = null)
            },
            "confirm": function(t) {
                return e && n() ? confirm(t) : !0
            }
        }
    }(),
    function(e) {
        function t(t) {
            return a = e(t.data.el), a.blur(), s = r(t).y, o = a.height() - s, a.css("opacity", .25), e(document).mousemove(n).mouseup(i), !1
        }

        function n(e) {
            var t = r(e).y,
                n = o + t;
            return s >= t && (n -= 5), s = t, n = Math.max(l, n), a.height(n + "px"), l > n && i(e), !1
        }

        function i() {
            e(document).unbind("mousemove", n).unbind("mouseup", i), a.css("opacity", 1), a.focus(), a = null, o = null, s = 0
        }

        function r(e) {
            return {
                "x": e.clientX + document.documentElement.scrollLeft,
                "y": e.clientY + document.documentElement.scrollTop
            }
        }
        var a, o, s = 0,
            l = 32;
        e.fn.TextAreaResizer = function() {
            return this.each(function() {
                a = e(this).addClass("processed"), o = null, e(this).parent().append(e('<div class="grippie"></div>').bind("mousedown", {
                    "el": this
                }, t));
                var n = e("div.grippie", e(this).parent())[0];
                n.style.marginRight = n.offsetWidth - e(this)[0].offsetWidth + "px"
            })
        }
    }(jQuery), StackExchange.imageUploader = function() {
        var e = {},
            t = function() {
                var e, t, n, i, r = window.document,
                    a = window.self;
                a.innerHeight && a.scrollMaxY ? (e = r.body.scrollWidth, t = a.innerHeight + a.scrollMaxY) : r.body.scrollHeight > r.body.offsetHeight ? (e = r.body.scrollWidth, t = r.body.scrollHeight) : (e = r.body.offsetWidth, t = r.body.offsetHeight), a.innerHeight ? (n = a.innerWidth, i = a.innerHeight) : r.documentElement && r.documentElement.clientHeight ? (n = r.documentElement.clientWidth, i = r.documentElement.clientHeight) : r.body && (n = r.body.clientWidth, i = r.body.clientHeight);
                var o = Math.max(e, n),
                    s = Math.max(t, i);
                return [o, s, n, i]
            },
            n = function() {
                $(".wmd-prompt-background").remove()
            },
            i = function() {
                var e = window.document,
                    n = window.navigator,
                    i = {
                        "isIE": /msie/.test(n.userAgent.toLowerCase()),
                        "isIE_5or6": /msie 6/.test(n.userAgent.toLowerCase()) || /msie 5/.test(n.userAgent.toLowerCase()),
                        "isOpera": /opera/.test(n.userAgent.toLowerCase())
                    },
                    r = e.createElement("div"),
                    a = r.style;
                r.className = "wmd-prompt-background", a.position = "absolute", a.top = "0", a.zIndex = "1000", i.isIE ? a.filter = "alpha(opacity=50)" : a.opacity = "0.5";
                var o = t();
                return a.height = o[1] + "px", i.isIE ? (a.left = e.documentElement.scrollLeft, a.width = e.documentElement.clientWidth) : (a.left = "0", a.width = "100%"), e.body.appendChild(r), r
            };
        return {
            "createImageUploadBackground": i,
            "removeImageUploadBackground": n,
            "uploadImageDialog": function(t, n) {
                var i = "upload-iframe-" + (new Date).getTime();
                "undefined" == typeof n && (n = "/upload/image");
                var r, a, o, s = window.FileReader && window.FormData,
                    l = s && "ondrop" in window,
                    c = !1,
                    u = "/render/image-upload?uploadUrl={0}&canDragDrop={1}&canPaste={2}".formatUnicorn(encodeURIComponent(n), l ? "true" : "false", c ? "true" : "false"),
                    d = $('<div class="popup" id="image-upload" style="z-index:1010; width: 420px;" tabindex="-1"></div>').addClass("async-load").data("load-url", u),
                    f = function(e) {
                        var t = e.charCode || e.keyCode;
                        return 27 === t ? (h(null), !1) : void 0
                    },
                    h = function(e) {
                        return d && d.fadeOutAndRemove(), $("body").unbind("keyup", f), $("body").unbind("paste"), void 0 !== e && t(e), a && a.fadeOutAndRemove(), !1
                    },
                    p = function(t) {
                        h();
                        var n = "/render/image-upload/preview";
                        a = $('<div class="popup" id="image-upload" style="z-index:1010;"></div>').addClass("async-load").data("load-url", n), a.appendTo("#header").center().fadeIn("fast"), $("body").bind("keyup", f);
                        var i = function() {
                            a.find("#image-preview").attr("src", t), T(a), StackExchange.helpers.bindMovablePopups(), C()
                        };
                        a.asyncLoad({
                            "callback": i,
                            "cache": e
                        })
                    },
                    g = function(e) {
                        e = e || window.event, y(e), r.style.backgroundColor = "white";
                        var t = e.dataTransfer,
                            n = t.files;
                        o = n[0];
                        var i = new window.FileReader;
                        return i.onloadend = m, i.readAsDataURL(o), !1
                    },
                    m = function(e) {
                        p(e.target.result)
                    },
                    v = function(e) {
                        if (e = e.originalEvent, e.clipboardData) {
                            var t = e.clipboardData.items;
                            if (t)
                                for (var n = 0; n < t.length; n++)
                                    if (-1 !== t[n].type.indexOf("image")) {
                                        o = t[n].getAsFile();
                                        var i = window.URL || window.webkitURL,
                                            r = i.createObjectURL(o);
                                        p(r)
                                    }
                        }
                    },
                    b = function() {
                        return !1
                    },
                    x = function() {
                        return !1
                    },
                    w = function() {
                        if (E(a), window.FormData) {
                            var e = new window.FormData;
                            e.append("uploadedImage", o), e.append("fkey", StackExchange.options.user.fkey), $.ajax({
                                "url": n,
                                "data": e,
                                "cache": !1,
                                "contentType": !1,
                                "processData": !1,
                                "type": "POST",
                                "success": function(e) {
                                    $("#" + i).contents().find("html").html(e)
                                }
                            })
                        }
                    },
                    y = function(e) {
                        return e.preventDefault && e.preventDefault(), !1
                    },
                    k = function() {
                        r = document.getElementById("image-upload"), l && (r.ondrop = g, r.ondragover = x, r.ondragleave = b), $("body").bind("paste", v), d.find(".popup-close").click(function() {
                            h(null)
                        }), d.find(":radio").change(function() {
                            var e = d.find("#filename-input"),
                                t = d.find("#url-wrapper");
                            e.toggle(), t.toggle(), $("#upload-message").css({
                                "color": "inherit",
                                "fontWeight": "inherit"
                            }).hide().text(""), t.is(":visible") && d.find("#url-input").focus()
                        }), d.find("form").submit(function() {
                            E(d);
                            var e, t = d.find(":radio:checked").val(),
                                n = d.find("#filename-input"),
                                r = d.find("#url-wrapper");
                            if ("web" == t) {
                                var a = n.next();
                                n.detach(), e = function() {
                                    n.insertBefore(a)
                                }
                            } else {
                                var o = r.next();
                                r.detach(), e = function() {
                                    r.insertBefore(o)
                                }
                            }
                            return this.target = i, window.closeDialog = h, window.displayUploadError = function(t) {
                                $("#upload-message").css({
                                    "color": "red",
                                    "fontWeight": "bold"
                                }).show().text(t), e(), e = null
                            }, !0
                        }), d.find("#filename-input").focus()
                    },
                    S = function() {
                        d.asyncLoad({
                            "callback": function() {
                                T(d), StackExchange.helpers.bindMovablePopups(), StackExchange.helpers.bindHelpOverlayEvents($("#url-input")), k()
                            },
                            "cache": e
                        })
                    },
                    C = function() {
                        a.find(".popup-close").click(function() {
                            h(null)
                        }), $("#cancel-upload").click(function() {
                            h(null)
                        }), $("#confirm-upload").click(w), window.closeDialog = h, window.displayUploadError = function(e) {
                            $("#upload-message").css({
                                "color": "red",
                                "fontWeight": "bold"
                            }).show().text(e)
                        }
                    },
                    E = function(e) {
                        var t = e.find("#upload-message");
                        t.text(t.data("uploading-text")).addSpinner()
                    },
                    T = function(e) {
                        $('<iframe style="display: none;" src="about:blank" />').attr("id", i).attr("name", i).appendTo(e)
                    };
                return d.appendTo("#header").center().fadeIn("fast").promise().done(S), $("body").bind("keyup", f), !0
            }
        }
    }(), StackExchange.postValidation = function() {
        function e(e, t, n, i) {
            var r = e.find('input[type="submit"]:visible'),
                a = r.length && r.is(":enabled");
            a && r.attr("disabled", !0), o(e, i), s(e, t, n, i), c(e), u(e), d(e);
            var f = function() {
                1 != t || e.find(C).length ? (l(e), a && r.attr("disabled", !1)) : setTimeout(f, 250)
            };
            f()
        }

        function t(t, i, o, s, l) {
            e(t, i, s, o);
            var c, u = function(e) {
                if (e.success)
                    if (l) l(e);
                    else {
                        var n = window.location.href.split("#")[0],
                            r = e.redirectTo.split("#")[0];
                        0 == r.indexOf("/") && (r = window.location.protocol + "//" + window.location.hostname + r), c = !0, window.location = e.redirectTo, n.toLowerCase() == r.toLowerCase() && window.location.reload(!0)
                    } else e.captchaHtml ? StackExchange.captcha.init(e.captchaHtml, u) : e.errors ? (t.find("input[name=priorAttemptCount]").val(function(e, t) {
                    return (+t + 1 || 0).toString()
                }), p(e.errors, t, i, o, e.warnings)) : t.find('input[type="submit"]:visible').parent().showErrorMessage(e.message)
            };
            t.submit(function() {
                if (t.find("#answer-from-ask").is(":checked")) return !0;
                var e = t.find(E);
                if ("[Edit removed during grace period]" == $.trim(e.val())) return m(e, ["Comment reserved for system use. Please use an appropriate comment."], f()), !1;
                if (a(), StackExchange.navPrevention && StackExchange.navPrevention.stop(), t.find('input[type="submit"]:visible').parent().addSpinner(), StackExchange.helpers.disableSubmitButton(t), StackExchange.options.site.enableNewTagCreationWarning) {
                    var i = t.find(C).parent().find("input#tagnames"),
                        s = i.prop("defaultValue");
                    if (i.val() !== s) return $.ajax({
                        "type": "GET",
                        "url": "/posts/new-tags-warning",
                        "dataType": "json",
                        "data": {
                            "tags": i.val()
                        },
                        "success": function(e) {
                            n(e, t, c, o, u)
                        }
                    }), !1
                }
                return setTimeout(function() {
                    r(t, o, c, u)
                }, 0), !1
            })
        }

        function n(e, t, n, a, o) {
            if (e.showWarning) {
                var s = $(e.html);
                s.bind("popupClose", function() {
                    i(t, n)
                }), s.find(".popup-actions-cancel, .popup-close a").click(function() {
                    StackExchange.helpers.closePopups(".popup"), i(t, n)
                }), s.find(".cancel-post").click(function(e) {
                    return StackExchange.helpers.closePopups(".popup"), e.preventDefault(), !1
                }), s.find(".submit-post").click(function(e) {
                    return StackExchange.helpers.closePopups(".popup"), r(t, a, n, o), e.preventDefault(), !1
                }), s.insertBefore(t.find('input[type="submit"]:visible')), StackExchange.helpers.bindMovablePopups(), s.show()
            } else r(t, a, n, o)
        }

        function i(e, t) {
            StackExchange.helpers.removeSpinner(), t || StackExchange.helpers.enableSubmitButton(e)
        }

        function r(e, t, n, r) {
            $.ajax({
                "type": "POST",
                "dataType": "json",
                "data": e.serialize(),
                "url": e.attr("action"),
                "success": r,
                "error": function() {
                    var n;
                    switch (t) {
                        case "question":
                            n = "An error occurred submitting the question.";
                            break;
                        case "answer":
                            n = "An error occurred submitting the answer.";
                            break;
                        case "edit":
                            n = "An error occurred submitting the edit.";
                            break;
                        case "tags":
                            n = "An error occurred submitting the tags.";
                            break;
                        case "post":
                        default:
                            n = "An error occurred submitting the post."
                    }
                    e.find('input[type="submit"]:visible').parent().showErrorMessage(n)
                },
                "complete": function() {
                    i(e, n)
                }
            })
        }

        function a() {
            for (var e = 0; e < A.length; e++) clearTimeout(A[e]);
            A = []
        }

        function o(e, t) {
            var n = e.find(k);
            n.length && n.blur(function() {
                A.push(setTimeout(function() {
                    var i = n.val(),
                        r = $.trim(i);
                    if (0 == r.length) return x(e, n), void 0;
                    var a = n.data("min-length");
                    if (a && r.length < a) return m(n, [function(e) {
                        return 1 == e.minLength ? "Title must be at least " + e.minLength + " character." : "Title must be at least " + e.minLength + " characters."
                    }({
                        "minLength": a
                    })], f()), void 0;
                    var o = n.data("max-length");
                    return o && r.length > o ? (m(n, [function(e) {
                        return 1 == e.maxLength ? "Title cannot be longer than " + e.maxLength + " character." : "Title cannot be longer than " + e.maxLength + " characters."
                    }({
                        "maxLength": o
                    })], f()), void 0) : ($.ajax({
                        "dataType": "jsonp",
                        "type": "POST",
                        "url": "http://stackoverflow.com/posts/validate-title",
                        "data": {
                            "title": i
                        },
                        "success": function(i) {
                            i.success ? x(e, n) : m(n, i.errors.Title, f()), "edit" != t && g(e, n, i.warnings.Title)
                        },
                        "error": function() {
                            x(e, n)
                        }
                    }), void 0)
                }, I))
            })
        }

        function s(e, t, n, i) {
            var r = e.find(S);
            r.length && r.blur(function() {
                A.push(setTimeout(function() {
                    var a = r.val(),
                        o = $.trim(a);
                    if (0 == o.length) return x(e, r), void 0;
                    if (5 == t) {
                        var s = r.data("min-length");
                        return s && o.length < s ? m(r, [function(e) {
                            return "Wiki Body must be at least " + e.minLength + " characters. You entered " + e.actual + "."
                        }({
                            "minLength": s,
                            "actual": o.length
                        })], f()) : x(e, r), void 0
                    }(1 == t || 2 == t) && $.ajax({
                        "type": "POST",
                        "url": "/posts/validate-body",
                        "data": {
                            "body": a,
                            "oldBody": r.prop("defaultValue"),
                            "isQuestion": 1 == t,
                            "isSuggestedEdit": n
                        },
                        "success": function(t) {
                            t.success ? x(e, r) : m(r, t.errors.Body, f()), "edit" != i && g(e, r, t.warnings.Body)
                        },
                        "error": function() {
                            x(e, r)
                        }
                    })
                }, I))
            })
        }

        function l(e) {
            var t = e.find(C);
            if (t.length) {
                var n = t.parent().find("input#tagnames");
                n.blur(function() {
                    A.push(setTimeout(function() {
                        var i = n.val(),
                            r = $.trim(i);
                        return 0 == r.length ? (x(e, t), void 0) : ($.ajax({
                            "type": "POST",
                            "url": "/posts/validate-tags",
                            "data": {
                                "tags": i,
                                "oldTags": n.prop("defaultValue")
                            },
                            "success": function(n) {
                                n.success ? x(e, t) : m(t, n.errors.Tags, f())
                            },
                            "error": function() {
                                x(e, t)
                            }
                        }), void 0)
                    }, I))
                })
            }
        }

        function c(e) {
            var t = e.find(E);
            t.length && t.blur(function() {
                A.push(setTimeout(function() {
                    var n = t.val(),
                        i = $.trim(n);
                    if (0 == i.length) return x(e, t), void 0;
                    var r = t.data("min-length");
                    if (r && i.length < r) return m(t, [function(e) {
                        return 1 == e.minLength ? "Your edit summary must be at least " + e.minLength + " character." : "Your edit summary must be at least " + e.minLength + " characters."
                    }({
                        "minLength": r
                    })], f()), void 0;
                    var a = t.data("max-length");
                    return a && i.length > a ? (m(t, [function(e) {
                        return 1 == e.maxLength ? "Your edit summary cannot be longer than " + e.maxLength + " character." : "Your edit summary cannot be longer than " + e.maxLength + " characters."
                    }({
                        "maxLength": a
                    })], f()), void 0) : (x(e, t), void 0)
                }, I))
            })
        }

        function u(e) {
            var t = e.find(T);
            t.length && t.blur(function() {
                A.push(setTimeout(function() {
                    var n = t.val(),
                        i = $.trim(n);
                    if (0 == i.length) return x(e, t), void 0;
                    var r = t.data("min-length");
                    if (r && i.length < r) return m(t, [function(e) {
                        return "Wiki Excerpt must be at least " + e.minLength + " characters; you entered " + e.actual + "."
                    }({
                        "minLength": r,
                        "actual": i.length
                    })], f()), void 0;
                    var a = t.data("max-length");
                    return a && i.length > a ? (m(t, [function(e) {
                        return "Wiki Excerpt cannot be longer than " + e.maxLength + " characters; you entered " + e.actual + "."
                    }({
                        "maxLength": a,
                        "actual": i.length
                    })], f()), void 0) : (x(e, t), void 0)
                }, I))
            })
        }

        function d(e) {
            var t = e.find(_);
            t.length && t.blur(function() {
                A.push(setTimeout(function() {
                    var n = t.val(),
                        i = $.trim(n);
                    return 0 == i.length ? (x(e, t), void 0) : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,20}$/i.test(n) ? (x(e, t), void 0) : (m(t, ["This email does not appear to be valid."], h()), void 0)
                }, I))
            })
        }

        function f() {
            var e = $("#sidebar, .sidebar").first().width() || 270;
            return {
                "position": {
                    "my": "left top",
                    "at": "right center"
                },
                "css": {
                    "max-width": e,
                    "min-width": e
                },
                "closeOthers": !1
            }
        }

        function h() {
            var e = $("#sidebar, .sidebar").first().width() || 270;
            return {
                "position": {
                    "my": "left top",
                    "at": "right center"
                },
                "css": {
                    "min-width": e
                },
                "closeOthers": !1
            }
        }

        function p(e, t, n, i, r) {
            if (e) {
                var a = function() {
                        var n = 0,
                            a = t.find(k),
                            o = t.find(S);
                        m(a, e.Title, f()) ? n++ : x(t, a), r && g(t, a, r.Title), m(o, e.Body, f()) ? n++ : x(t, o), r && g(t, o, r.Body), m(t.find(C), e.Tags, f()) ? n++ : x(t, t.find(C)), m(t.find(E), e.EditComment, f()) ? n++ : x(t, t.find(E)), m(t.find(T), e.Excerpt, f()) ? n++ : x(t, t.find(T)), m(t.find(_), e.Email, h()) ? n++ : x(t, t.find(_));
                        var s = t.find(".general-error"),
                            l = e.General && e.General.length > 0;
                        if (l || n > 0) {
                            if (!s.length) {
                                var c = t.find('input[type="submit"]:visible');
                                c.before('<div class="general-error-container"><div class="general-error"></div><br class="cbt" /></div>'), s = t.find(".general-error")
                            }
                            if (l) m(s, e.General, {
                                "position": "inline",
                                "css": {
                                    "float": "left",
                                    "margin-bottom": "10px"
                                },
                                "closeOthers": !1,
                                "dismissable": !1
                            });
                            else {
                                x(t, s);
                                var u;
                                switch (i) {
                                    case "question":
                                        u = function(e) {
                                            return 1 == e.specificErrorCount ? "Your question couldn't be submitted. Please see the error above." : "Your question couldn't be submitted. Please see the errors above."
                                        }({
                                            "specificErrorCount": n
                                        });
                                        break;
                                    case "answer":
                                        u = function(e) {
                                            return 1 == e.specificErrorCount ? "Your answer couldn't be submitted. Please see the error above." : "Your answer couldn't be submitted. Please see the errors above."
                                        }({
                                            "specificErrorCount": n
                                        });
                                        break;
                                    case "edit":
                                        u = function(e) {
                                            return 1 == e.specificErrorCount ? "Your edit couldn't be submitted. Please see the error above." : "Your edit couldn't be submitted. Please see the errors above."
                                        }({
                                            "specificErrorCount": n
                                        });
                                        break;
                                    case "tags":
                                        u = function(e) {
                                            return 1 == e.specificErrorCount ? "Your tags couldn't be submitted. Please see the error above." : "Your tags couldn't be submitted. Please see the errors above."
                                        }({
                                            "specificErrorCount": n
                                        });
                                        break;
                                    case "post":
                                    default:
                                        u = function(e) {
                                            return 1 == e.specificErrorCount ? "Your post couldn't be submitted. Please see the error above." : "Your post couldn't be submitted. Please see the errors above."
                                        }({
                                            "specificErrorCount": n
                                        })
                                }
                                s.text(u)
                            }
                        } else t.find(".general-error-container").remove();
                        var d;
                        y() && ($("#sidebar").animate({
                            "opacity": .4
                        }, 500), d = setInterval(function() {
                            y() || ($("#sidebar").animate({
                                "opacity": 1
                            }, 500), clearInterval(d))
                        }, 500));
                        var p;
                        t.find(".validation-error").each(function() {
                            var e = $(this).offset().top;
                            (!p || p > e) && (p = e)
                        });
                        var v = function() {
                            for (var e = 0; 3 > e; e++) t.find(".message").animate({
                                "left": "+=5px"
                            }, 100).animate({
                                "left": "-=5px"
                            }, 100)
                        };
                        if (p) {
                            var b = $(".review-bar").length;
                            p = Math.max(0, p - (b ? 125 : 30)), $("html, body").animate({
                                "scrollTop": p
                            }, v)
                        } else v()
                    },
                    o = function() {
                        1 != n || t.find(C).length ? a() : setTimeout(o, 250)
                    };
                o()
            }
        }

        function g(e, t, n) {
            var i = f();
            if (i.type = "warning", !n || 0 == n.length) return b(e, t), !1;
            var r = t.data("error-popup"),
                a = 0;
            return r && (a = r.height() + 5), v(t, n, i, a)
        }

        function m(e, t, n) {
            return n.type = "error", v(e, t, n)
        }

        function v(e, t, n, i) {
            var r, o = n.type;
            if (!(t && 0 != t.length && e.length && $("html").has(e).length)) return !1;
            if (r = 1 == t.length ? t[0] : "<ul><li>" + t.join("</li><li>") + "</li></ul>", r && r.length > 0) {
                var s = e.data(o + "-popup");
                if (s && s.is(":visible")) {
                    var l = e.data(o + "-message");
                    if (l == r) return s.animateOffsetTop(i || 0), !0;
                    s.fadeOutAndRemove()
                }
                i > 0 && (n.position.offsetTop = i);
                var c = StackExchange.helpers.showMessage(e, r, n);
                return c.find("a").attr("target", "_blank"), c.click(a), e.addClass("validation-" + o).data(o + "-popup", c).data(o + "-message", r), !0
            }
            return !1
        }

        function b(e, t) {
            w("warning", e, t)
        }

        function x(e, t) {
            w("error", e, t)
        }

        function w(e, t, n) {
            if (!n || 0 == n.length) return !1;
            var i = n.data(e + "-popup");
            return i && i.is(":visible") && i.fadeOutAndRemove(), n.removeClass("validation-" + e), n.removeData(e + "-popup"), n.removeData(e + "-message"), t.find(".validation-" + e).length || t.find(".general-" + e + "-container").remove(), !0
        }

        function y() {
            var e = !1,
                t = $("#sidebar, .sidebar").first();
            if (!t.length) return !1;
            var n = t.offset().left;
            return $(".message").each(function() {
                var t = $(this);
                return t.offset().left + t.outerWidth() > n ? (e = !0, !1) : void 0
            }), e
        }
        var k = "input#title",
            S = "textarea.wmd-input:first",
            C = ".tag-editor",
            E = "input[id^=edit-comment]",
            T = "textarea#excerpt",
            _ = "input#m-address",
            A = [],
            I = 250;
        return {
            "initOnBlur": e,
            "initOnBlurAndSubmit": t,
            "showErrorsAfterSubmission": p,
            "getSidebarPopupOptions": f
        }
    }();