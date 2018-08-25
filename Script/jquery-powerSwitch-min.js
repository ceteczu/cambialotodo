// This is just a sample script. Paste your real code (javascript or HTML) here.
/*
 * powerSwitch.js by zhangxinxu(.com)
 * under MIT License
 * you can use powerSwitch to switch anything
 */
(function(f, g, h) {
    var e = typeof history.pushState == "function";
    g.powerSwitch = function(b, a) {
        g(b).powerSwitch(a)
    };
    g.extend(g.powerSwitch, {
        getRelative: function(b, d) {
            b = g(b);
            if (b.length == 0) {
                return g()
            }
            var a = [],
                c = false;
            b.each(function(n, o) {
                var m = g(this).attr(d.attribute) || (g(this).attr("href") || "").split("#")[1];
                if (m && a[m] != true) {
                    var p = g();
                    if (/^\w+$/.test(m)) {
                        p = g("#" + m);
                        if (p.length === 0) {
                            p = g("." + m)
                        }
                        if (p.length === 0) {
                            p = g(m)
                        }
                    } else {
                        p = g(m)
                    }
                    p.each(function(i, j) {
                        a.push(j)
                    });
                    a[m] = true
                } else {
                    if (a[m] == true) {
                        c = true
                    }
                }
            });
            b.data("isMoreToOne", c);
            return g(a)
        },
        transition: function(d, c, b) {
            var a = "transform " + c + "ms linear";
            if (e == false) {
                return
            }
            if (b == true) {
                d.css("webkitTransition", "none").css("transition", "none").data("hasTransition", false)
            } else {
                if (!d.data("hasTransition")) {
                    d.css({
                        webkitTransition: "-webkit-" + a,
                        webkitBackfaceVisibility: "hidden",
                        transition: a,
                        BackfaceVisibility: "hidden"
                    }).data("hasTransition", true)
                }
            }
        },
        translate: function(c, a, b) {
            var d = "translate" + a + "(" + b + ")";
            e ? c.css("webkitTransform", d).css("transform", d) : c.css(a == "X" ? {
                left: b
            } : {
                top: b
            })
        },
        animation: function(y, d, t) {
            var b = null,
                w = this,
                u = t.animation == "none";
            var r = function(k, i, j) {
                if (parseInt(j) === j) {
                    j += "px"
                }
                if (e) {
                    w.transition(k, t.duration, u);
                    w.translate(k, i, j)
                } else {
                    k[u ? "css" : "animate"](i == "X" ? {
                        left: j
                    } : {
                        top: j
                    }, t.duration)
                }
            };
            if ((d && d.length) || (y && y.length)) {
                if (t.toggle == true && t.animation == "translate") {
                    t.animation = "none"
                }
                switch (t.animation) {
                    case "translate":
                        var s = y.data("index"),
                            x = d.data("index");
                        var c = {
                            vertical: "Y",
                            horizontal: "X"
                        };
                        if (s != h && x != h) {
                            var z = 100,
                                a = true;
                            if (t.prevOrNext) {
                                switch (t.prevOrNext.attr("data-type")) {
                                    case "prev":
                                        a = false;
                                        break;
                                    case "next":
                                        a = true;
                                        break;
                                    default:
                                        a = s < x
                                }
                            }
                            z = (a * 2 - 1) * 100;
                            w.transition(d.show(), t.duration, true);
                            w.translate(d, c[t.direction], z + "%");
                            setTimeout(function() {
                                r(y, c[t.direction], -1 * z + "%");
                                r(d, c[t.direction], "0%")
                            }, 17);
                            t.prevOrNext = null
                        } else {
                            y.hide();
                            d.show()
                        }
                        break;
                    case "slide":
                        if (t.duration != "sync") {
                            if (y) {
                                y.slideUp(t.duration)
                            }
                            if (d) {
                                d.slideDown(t.duration)
                            }
                        } else {
                            if (y) {
                                y.slideUp("normal", function() {
                                    if (d) {
                                        d.slideDown()
                                    }
                                })
                            } else {
                                if (d) {
                                    d.slideDown()
                                }
                            }
                        }
                        break;
                    case "fade":
                        if (t.duration != "sync") {
                            if (y) {
                                y.fadeOut(t.duration)
                            }
                            if (d) {
                                d.fadeIn(t.duration)
                            }
                        } else {
                            if (y) {
                                y.fadeOut("normal", function() {
                                    if (d) {
                                        d.fadeIn()
                                    }
                                })
                            } else {
                                if (d) {
                                    d.fadeIn()
                                }
                            }
                        }
                        break;
                    case "visibility":
                        if (y) {
                            y.css("visibility", "hidden")
                        }
                        if (d) {
                            d.css("visibility", "visible")
                        }
                        break;
                    default:
                        if (y) {
                            y.hide()
                        }
                        if (d) {
                            d.show()
                        }
                }
            } else {
                if (t.container && t.container.length) {
                    var v = t.container.data("position");
                    b = t.container.get(0);
                    if (t.direction == "vertical") {
                        if (b.scrollHeight - b.clientHeight >= Math.max(v.top, 1)) {
                            t.animation == "auto" ? t.container.animate({
                                scrollTop: v.top
                            }) : t.container.scrollTop(v.top)
                        } else {
                            r(t.container, "Y", -1 * v.top)
                        }
                    } else {
                        if (b.scrollWidth - b.clientWidth >= Math.max(v.left, 1)) {
                            t.animation == "auto" ? t.container.animate({
                                scrollLeft: v.left
                            }) : t.container.scrollLeft(v.left)
                        } else {
                            r(t.container, "X", -1 * v.left)
                        }
                    }
                }
            }
        }
    });
    g.fn.powerSwitch = function(G) {
        var O = {
            direction: "horizontal",
            eventType: "click",
            classAdd: "",
            classRemove: "",
            classPrefix: "",
            attribute: "data-rel",
            animation: "auto",
            duration: 250,
            container: null,
            autoTime: 0,
            number: "auto",
            hoverDelay: 200,
            toggle: false,
            onSwitch: g.noop
        };
        var V = g.extend({}, O, G || {});
        g.each(["disabled", "prev", "play", "pause", "next"], function(i, l) {
            l = g.trim(l);
            var m = l.slice(0, 1).toUpperCase() + l.slice(1),
                k = "class" + m,
                j = V.classPrefix.slice(-1);
            if (V[k] === h) {
                if (V.classPrefix) {
                    if (/\-/g.test(V.classPrefix)) {
                        V[k] = j == "-" ? (V.classPrefix + l) : [V.classPrefix, l].join("-")
                    } else {
                        if (/_/g.test(V.classPrefix)) {
                            V[k] = j == "_" ? (V.classPrefix + l) : [V.classPrefix, l].join("_")
                        } else {
                            V[k] = V.classPrefix + m
                        }
                    }
                } else {
                    V[k] = l
                }
            }
        });
        var b = V.indexSelected || -1,
            D = parseInt(V.number) || 1,
            d = null,
            S = null,
            R = g(),
            H = 0;
        var Q = g(this);
        if (Q.length == 0) {
            if (V.container == null || V.autoTime == 0) {
                return Q
            }
        }
        R = g.powerSwitch.getRelative(Q, V);
        if ((H = R.length) == 0) {
            return Q
        }
        if (b == -1 && V.toggle == false) {
            if (V.classAdd) {
                Q.each(function(i, j) {
                    if (b != -1) {
                        return
                    }
                    if (g(j).hasClass(V.classAdd)) {
                        b = i
                    }
                })
            } else {
                R.each(function(i, j) {
                    if (b != -1) {
                        return
                    }
                    if (V.animation == "visibility") {
                        if (g(j).css("visibility") != "hidden") {
                            b = i
                        }
                    } else {
                        if (g(j).css("display") != "none") {
                            b = i
                        }
                    }
                })
            }
        }
        var P = false,
            U = g(),
            a = g(),
            C = g();
        var I = function(i) {
            if (i <= 0) {
                U.addClass(V.classDisabled).removeAttr("title").attr("disabled", "disabled")
            } else {
                U.removeClass(V.classDisabled).attr("title", U.data("title")).removeAttr("disabled")
            }
            if ((H - i) / D > 1) {
                a.removeClass(V.classDisabled).attr("title", a.data("title")).removeAttr("disabled")
            } else {
                a.addClass(V.classDisabled).removeAttr("title").attr("disabled", "disabled")
            }
        };
        if (Q.eq(0).data("isMoreToOne") == true) {
            P = true;
            if (V.classDisabled) {
                U = Q.eq(0), a = Q.eq(1);
                U.data("title", U.attr("title"));
                a.data("title", a.attr("title"));
                I(b);
                if (b <= 0 && V.container) {
                    g(V.container).scrollLeft(0).scrollTop(0)
                }
            } else {
                if (V.container) {
                    R.clone().insertAfter(R.eq(H - 1));
                    R = g.powerSwitch.getRelative(Q, V);
                    C = Q.eq(1)
                } else {
                    U = Q.eq(0), a = Q.eq(1);
                    C = a
                }
            }
        }
        var T = false;
        if (Q.length == 1 && H > 1) {
            T = true
        }
        var N = function(m) {
            var l = R.slice(m, m + D);
            var n = null,
                k = null,
                j = null;
            if (V.toggle == false) {
                if (P == true) {
                    if (V.container) {
                        var i = l.position();
                        V.container = g(V.container);
                        V.container.data("position", i);
                        g.powerSwitch.animation(null, null, V);
                        V.classDisabled && I(m)
                    } else {
                        g.powerSwitch.animation(R.eq(b, b + D), l, V)
                    }
                    V.onSwitch.call(this, l)
                } else {
                    if (T == true) {
                        g.powerSwitch.animation(null, l, V);
                        V.onSwitch.call(this, l)
                    } else {
                        if (b !== m) {
                            k = Q.eq(m);
                            if (b >= 0) {
                                n = Q.eq(b);
                                j = R.eq(b, b + D)
                            } else {
                                n = g();
                                j = g()
                            }
                            k.addClass(V.classAdd).removeClass(V.classRemove);
                            n.addClass(V.classRemove).removeClass(V.classAdd);
                            g.powerSwitch.animation(j, l, V);
                            V.onSwitch.call(this, l, n, j)
                        }
                    }
                }
                b = m
            } else {
                if ((V.animation == "visibility" && l.css("visibility") == "hidden") || (V.animation != "visibility" && l.css("display") == "none")) {
                    g.powerSwitch.animation(null, l, V);
                    display = true
                } else {
                    g.powerSwitch.animation(l, null, V);
                    display = false
                }
                V.onSwitch.call(this, l, display)
            }
        };
        var c = location.href.split("#")[1];
        Q.each(function(i, j) {
            g(j).data("index", i);
            if (P == true) {
                g(j).bind("click", function() {
                    var l, k;
                    if (V.classDisabled) {
                        if (g(this).attr("disabled")) {
                            return false
                        }
                        if (i == 0) {
                            l = b - D;
                            l = Math.max(0, l)
                        } else {
                            if (i == 1) {
                                l = b + D;
                                l = Math.min(l, H - 1)
                            }
                        }
                        N.call(this, l)
                    } else {
                        if (V.container && H > D) {
                            if (i == 0) {
                                l = b - D;
                                if (l < 0) {
                                    k = R.eq(b + H);
                                    g(V.container).data("position", k.position());
                                    g.powerSwitch.animation(null, null, g.extend({}, V, {
                                        animation: "none"
                                    }));
                                    l = b + H - D
                                }
                            } else {
                                if (i == 1) {
                                    l = b + D;
                                    if (l > H * 2 - D) {
                                        k = R.eq(b - H);
                                        g(V.container).data("position", k.position());
                                        g.powerSwitch.animation(null, null, g.extend({}, V, {
                                            animation: "none"
                                        }));
                                        l = b - H + D
                                    }
                                }
                            }
                            N.call(this, l);
                            C = g(this)
                        } else {
                            i ? K(this) : J(this);
                            C = g(this)
                        }
                    }
                    return false
                })
            } else {
                if (T == true) {
                    g(j).bind("click", function() {
                        var k;
                        if (V.number == "auto") {
                            D = H
                        }
                        if (!g(this).attr("disabled")) {
                            if (b == -1) {
                                k = 0
                            } else {
                                k = b + D
                            }
                            N.call(this, k);
                            if (k >= H - 1) {
                                g(this).addClass(V.classDisabled).attr("disabled", "disabled").removeAttr("title")
                            }
                        }
                        return false
                    })
                } else {
                    if (V.eventType == "click") {
                        g(j).bind("click", function() {
                            V.prevOrNext = g(this);
                            N.call(this, i);
                            return false
                        });
                        if (c && j.href && c == j.href.split("#")[1]) {
                            g(j).trigger("click")
                        }
                    } else {
                        if (/^hover|mouseover$/.test(V.eventType)) {
                            g(j).hover(function() {
                                V.prevOrNext = g(this);
                                clearTimeout(d);
                                d = setTimeout(function() {
                                    N.call(j, i)
                                }, parseInt(V.hoverDelay) || 0)
                            }, function() {
                                clearTimeout(d)
                            })
                        }
                    }
                }
            }
        });
        R.each(function(i, j) {
            g(j).data("index", i)
        });
        var K = function(i) {
                var j = b + 1;
                if (j >= H) {
                    j = 0
                }
                N.call(i || Q.get(j), j)
            },
            J = function(i) {
                var j = b - 1;
                if (j < 0) {
                    j = H - 1
                }
                N.call(i || Q.get(j), j)
            },
            L = function() {
                C.trigger("click")
            },
            F = function() {
                clearTimeout(S);
                if (F.flagAutoPlay == true) {
                    S = setTimeout(function() {
                        P == false ? K() : L();
                        F()
                    }, V.autoTime)
                }
            };
        if ((T == false && V.toggle == false && P == false) || (P == true && !V.classDisabled)) {
            if (V.container && P == false) {
                var E = "";
                Q.length && g.each(["Prev", "Pause", "Next"], function(i, j) {
                    if (V.autoTime == 0 && j == "Pause") {
                        return
                    }
                    E = E + '<a href="javascript:" class="' + V["class" + j] + '" data-type="' + j.toLowerCase() + '"></a>'
                });
                V.container.append(E).delegate("a", "click", function() {
                    var i = g(this).attr("data-type"),
                        k = V["class" + i.slice(0, 1).toUpperCase() + i.slice(1)],
                        j = b;
                    switch (i) {
                        case "prev":
                            V.prevOrNext = g(this);
                            J();
                            break;
                        case "play":
                            F.flagAutoPlay = true;
                            g(this).attr("data-type", "pause").removeClass(k).addClass(V.classPause);
                            F();
                            break;
                        case "pause":
                            F.flagAutoPlay = false;
                            g(this).attr("data-type", "play").removeClass(k).addClass(V.classPlay);
                            F();
                            break;
                        case "next":
                            V.prevOrNext = g(this);
                            K();
                            break
                    }
                    return false
                })
            }
            if (V.autoTime) {
                var M = [Q, R, V.container];
                if (P == true || (document.body.contains && V.container && V.container.get(0).contains(R.get(0)))) {
                    M = [Q, V.container]
                }
                g.each(M, function(i, j) {
                    if (j) {
                        j.hover(function(k) {
                            if (k.pageX !== h || V.eventType == "click") {
                                clearTimeout(S)
                            }
                        }, function(k) {
                            if (k.pageX !== h || V.eventType == "click") {
                                F()
                            }
                        })
                    }
                });
                F.flagAutoPlay = true;
                F()
            }
        }
        return Q
    }
})(window, jQuery);
/*
if ('this_is' == /an_example/) {
    of_beautifier();
} else {
    var a = b ? (c % d) : e[f];
}*/