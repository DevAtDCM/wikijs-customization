const CM_LNK_ACTIVE = "mad-cm-lnk-active",
    CM_LNK_ACTIVE2 = "mad-cm-lnk-active2",
    CM_COLLAPSIBLE = "mad-cm-collapsible",
    CM_COLLAPSIBLE_ACTIVE = "mad-cm-collapsible-active",
    CM_COLLAPSIBLE_INACTIVE = "mad-cm-collapsible-inactive",
    CM_SECTION = "mad-cm-section",
    CM_SECTION_EXPANDED = "expanded",
    NO_LINE_NUMBERS_CLASS = "next-codeblock-no-line-numbers";
var menuItemType, header, navigation, main, footer, btnToTop, sideColumn, pageTitle, breadcrumbs, hideSideColumn, headerProcessed = navProcessed = mainProcessed = footerProcessed = !1,
    breadcrumbsHidden = !1,
    btnToTopProcessed = !1,
    btnToTopVisible = !1,
    curPathRel = window.location.pathname,
    curPathAbs = window.location.href,
    mo = new MutationObserver(moCallback),
    moConfig = {
        attributes: !0,
        childList: !0,
        subtree: !0,
        characterDataOldValue: !0,
        attributeOldValue: !0
    },
    moTarget = document;
if (slidingMenu) {
    var icon_pinOff = "mdi-pin-off-outline",
        icon_pinOn = "mdi-pin-outline",
        icon_menu = "mdi-menu",
        pmb = null,
        pmbHolder = null,
        mb = null,
        mbHolder = null,
        contentHolder = null,
        backToTopHolder = null,
        menuOpening = menuClosing = menuClosed = menuOpened = !1;
    "" == (pinMenu = getCookie(COOKIE_NAME)) ? (pinMenu = !1, setCookie(COOKIE_NAME, pinMenu, COOKIE_DAYS)) : pinMenu = "false" !== pinMenu
} else var pinMenu = !0;
var mouseLeftEdgeOpensMenu, sideColumnHidden = !1,
    isMouseOverNav = !1,
    menuFirstHover = !0,
    mobileDevice = isMobileDevice();

function isMobileDevice() {
    return !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

function fixMobileDeviceNodeValue(e) {
    var t = e.nodeValue;
    if (t) {
        if ((o = t.split("#")).length > 1) {
            if (isNumeric(o[1])) {
                level = parseInt(o[1]);
                var n = t.replace("#" + o[1] + "#", "")
            }
        } else n = t;
        var o = n.split("#");
        e.nodeValue = o[0]
    }
}

function moStart() {
    mo.observe(moTarget, moConfig)
}

function moStop() {
    mo.disconnect()
}

function moCallback(e, t) {
    for (const {
            addedNodes: t
        } of e)
        for (const e of t) e.tagName && e.matches("NAV") && e.style && e.style.getPropertyValue("transform") && (e.style.removeProperty ? e.style.removeProperty("transform") : e.style.removeAttribute("transform"));
    header = document.querySelector("header[data-booted='true']"), navigation = document.querySelector("nav[data-booted='true']"), main = document.querySelector("main[data-booted='true']"), footer = document.querySelector("footer[data-booted='true']"), btnToTop = document.querySelector("i.mdi-arrow-up"), btnToTopVisible = !1, btnToTop && (btnToTopVisible = !0, btnToTop = btnToTop.closest("button"), pinMenu || "5px" == btnToTop.style.left || (btnToTop.style.left = "5px")), header && !headerProcessed && (customizeHeader(header), headerProcessed = !0), navigation && !navProcessed && (customizeNavigation(navigation), navProcessed = !0), main && !mainProcessed && (customizeMainContent(main), mainProcessed = !0), footer && !footerProcessed && (customizeFooter(footer), footerProcessed = !0), mouseLeftEdgeOpensMenu && (document.onmousemove = handleMouseMove)
}

function customizeHeader(e) {
    if (addSiteTitleNavigation) {
        var t = e.querySelector("span.subheading");
        t && (t.style.cssText = "cursor: pointer;", t.addEventListener("click", function() {
            window.location = "/"
        }), addSiteTitleNavigation = !1)
    }
}

function customizeNavigation(e, level = 0) {
    if (slidingMenu && (e.style.removeProperty ? e.style.removeProperty("transform") : e.style.removeAttribute("transform")), collapsibleMenu) {
        // Check if 0 nested elements
        if (!e.querySelector(".__view").children[level]) {
            return;
        }

        var t = e.querySelector(".__view")?.children[level]?.children[1]?.childNodes;
        if (!t) return;

        mobileDevice 
        ? t.forEach(function(e) {
            e.childNodes.forEach((child, index) => {
                fixMobileDeviceNodeValue(child);
                // Here we recursively call customizeNavigation() on each child element
                if (child.childNodes.length > 0) {
                    customizeNavigation(child, level + 1);
                }
            });
        }) : (t.forEach(function(e) {
            e.nextElementSibling, e.previousElementSibling;
            var t = e.previousElementSibling;
            if ("DVD" == (menuItemType = getMenuItemType(e)) && hideDivider) e.style.display = "none";
            else if (getMenuItemInfo(e, "level") > getMenuItemInfo(t, "level")) {
                var n = groupItems(e);
                n.wrapGroup(CM_SECTION), t.classList.add(CM_COLLAPSIBLE, CM_COLLAPSIBLE_INACTIVE), sectionContainsActivePage(n) ? t.classList.toggle(CM_COLLAPSIBLE_INACTIVE) : t.href == curPathAbs && (t.classList.add(CM_LNK_ACTIVE2), t.nextElementSibling.classList.add(CM_SECTION_EXPANDED), t.classList.toggle(CM_COLLAPSIBLE_ACTIVE), t.classList.toggle(CM_COLLAPSIBLE_INACTIVE)), "HDR" == getMenuItemType(t) && t.addEventListener("click", e => {
                    e.target;
                    sectionState(t.nextElementSibling, "toggle")
                }, !1)
            }

            if (e.childNodes.length > 0) {
                customizeNavigation(e, level + 1);
            }

        }), t.forEach(function(e) {
            "HDR" == (menuItemType = getMenuItemType(e)) ? (getMenuItemInfo(e, "icon") && (headerAppendIcon(e, getMenuItemInfo(e, "icon")), e.childNodes[1].nodeValue = getMenuItemInfo(e, "text")), e.childNodes[0].nodeValue = getMenuItemInfo(e, "text")) : "LNK" == menuItemType && (e.childNodes[1].childNodes[0].nodeValue = getMenuItemInfo(e, "text"))
        }))
    }!mobileDevice && slidingMenu && ((pmbHolder = document.createElement("button")).className = "v-btn v-btn--top v-btn--depressed v-btn--fab v-btn--fixed v-btn--left v-btn--round theme--dark v-size--small primary mad-pmb", pmbHolder.type = "button", pmbHolder.insertAdjacentHTML("afterbegin", '<span class="v-btn__content"><i aria-hidden="true" class="v-icon notranslate mdi theme--dark ' + icon_pinOff + '" style="transform:rotate(0deg);"></i></span>'), pmb = pmbHolder.querySelector("i"), (mbHolder = document.createElement("button")).className = "v-btn v-btn--top v-btn--depressed v-btn--fab v-btn--fixed v-btn--left v-btn--round theme--dark v-size--small primary mb", mbHolder.type = "button", mbHolder.insertAdjacentHTML("afterbegin", '<span class="v-btn__content"><i aria-hidden="true" class="v-icon notranslate mdi theme--dark ' + icon_menu + '"></i></span>'), e.parentNode.insertBefore(mbHolder, e), mb = mbHolder.querySelector("i"), mbHolder.addEventListener("mouseenter", menuOpen), addListeners(e, "mouseenter mouseleave mouseover", navEvent), addListeners(pmbHolder, "mouseleave mouseup", pmbEvent), pinMenu || !0 === isMouseOverNav || setTimeout(function() {
        menuClose()
    }, 100), menuOpening = !1, menuOpened = !0, pinMenu ? (pmb.classList.add(icon_pinOff), menuOpen(), e.classList.add("mad-nav-visible")) : pmb.classList.add(icon_pinOn))
}

function customizeMainContent(e) {
    if (breadcrumbs = e.querySelector("header"), removeBreadcrumbs && !breadcrumbsHidden && breadcrumbs && (breadcrumbs.nextSibling && breadcrumbs.nextSibling.remove(), breadcrumbs.remove(), breadcrumbsHidden = !0), sideColumn = e.querySelector("div.flex.page-col-sd.lg3.xl2"))
        if ((hideSideColumn = removeTocCard && removeTagCard && removeHistoryCard && removeBookmarkCard) || !1 === sideColumnPosition || "false" === sideColumnPosition) {
            sideColumn.remove(), sideColumnHidden = !0, (n = e.querySelector("div.offset-lg-3.offset-xl-2")) && n.classList.remove("offset-lg-3", "offset-xl-2");
            var t = e.querySelector("div.flex.page-col-content");
            t && t.classList.remove("xs12", "lg9", "xl10")
        } else if (!0 === sideColumnPosition);
    else if ("right" === sideColumnPosition.toLowerCase()) {
        var n;
        insertAfter(sideColumn, sideColumn.nextElementSibling), (n = e.querySelector("div.offset-lg-3.offset-xl-2")) && n.classList.remove("offset-lg-3", "offset-xl-2")
    }
    mobileDevice || (pageTitle = e.querySelector("div.is-page-header"), pinMenu ? e.style.setProperty("padding-left", "256px", "important") : (breadcrumbs && breadcrumbs.querySelector("div").style.setProperty("padding-left", "56px", "important"), pageTitle && breadcrumbsHidden && pageTitle.style.setProperty("padding-left", "56px", "important"), sideColumn && (sideColumn.style["padding-left"] = "16px"), e.style.setProperty("padding-left", "0px", "important")));
    var o = e.querySelectorAll("div.v-card.v-sheet");
    Array.from(o).forEach(e => {
        removeTocCard && e.querySelector("div[role=list]") && (e.remove(), removeTocCard = !1), removeTagCard && e.innerHTML.includes("mdi-tag") && (e.remove(), removeTagCard = !1), removeBookmarkCard && e.innerHTML.includes("mdi-bookmark") && (e.remove(), removeBookmarkCard = !1), removeHistoryCard && (e.innerHTML.includes("mdi-history") || e.innerHTML.includes("caption") && !e.innerHTML.includes('role="listitem"') && !e.innerHTML.includes("mdi-tag")) && (e.remove(), removeHistoryCard = !1)
    });
    var i = e.querySelectorAll("div." + NO_LINE_NUMBERS_CLASS);
    Array.from(i).forEach(e => {
        removePrismJSLineNumbers(getNextSibling(e, ".code-toolbar"))
    }), faccordion(), customizeVideoPlayer && setupVideoElements()
}

function customizeFooter(e) {}

function isNumeric(e) {
    return !isNaN(e)
}

function headerAppendIcon(e, t) {
    var n = document.createElement("div");
    n.className = "v-avatar v-list-item__avatar rounded-0 v-avatar--tile", n.style = "height: 24px; min-width: 24px; width: 24px;";
    var o = document.createElement("i");
    o.className = "v-icon notranslate " + t + " theme--dark", o.setAttribute("aria-hidden", "true"), n.insertBefore(o, n.firstChild), e.insertBefore(n, e.firstChild)
}

function sectionContainsActivePage(e) {
    var t;
    if (Array.isArray(e)) {
        if ((t = Array.prototype.filter.call(e, function(e) {
                return e.matches("." + CM_LNK_ACTIVE)
            })) && t.length > 0) return !0
    } else if (t = e.querySelector("." + CM_LNK_ACTIVE)) return !0;
    return !1
}
moStart(), Array.prototype.wrapGroup = function(e) {
    const t = document.createElement("div");
    "" != e && (t.className = e), this.forEach(e => {
        e.parentNode.insertBefore(t, e), t.appendChild(e)
    }), this.forEach(e => {
        if (e.childNodes[1].childNodes[0].nodeValue = getMenuItemInfo(e, "text"), e.href == curPathAbs) {
            for (e.classList.add(CM_LNK_ACTIVE), parent = e.parentNode; parent && parent.classList.contains(CM_SECTION);) {
                parent.classList.add(CM_SECTION_EXPANDED);
                var t = parent;
                parent = parent.parentNode
            }
            t.previousElementSibling.classList.toggle(CM_COLLAPSIBLE_ACTIVE)
        }
    })
};
const fnmap = {
        toggle: "toggle",
        show: "add",
        hide: "remove"
    },
    sectionState = (e, t) => {
        if (!sectionContainsActivePage(e)) {
            e.previousElementSibling;
            e.parentNode.querySelectorAll("." + CM_SECTION + "." + CM_SECTION_EXPANDED).forEach(function(n) {
                var o = n.previousElementSibling;
                n == e || sectionContainsActivePage(n) || o.href == curPathAbs || (n.classList[fnmap[t]](CM_SECTION_EXPANDED), n.previousElementSibling.classList[fnmap[t]](CM_COLLAPSIBLE_ACTIVE), n.previousElementSibling.classList[fnmap[t]](CM_COLLAPSIBLE_INACTIVE))
            }), e.classList[fnmap[t]](CM_SECTION_EXPANDED), e.previousElementSibling.classList[fnmap[t]](CM_COLLAPSIBLE_ACTIVE), e.previousElementSibling.classList[fnmap[t]](CM_COLLAPSIBLE_INACTIVE)
        }
    };

function groupItems(e) {
    var t = [];
    do {
        t.push(e), e = e.nextElementSibling
    } while (e && getMenuItemInfo(e, "level") == getMenuItemInfo(e.previousElementSibling, "level"));
    return t
}

function getMenuItemInfo(e, t) {
    if (!e) return null;
    t = t || "level";
    var n = 0,
        o = (e = e.innerText).match(/#(mdi|fa)([\s\S]*?)#/gs);
    o && (e = e.replace(o[0], ""), 0 == (o = o[0].split("#")[1]).toLowerCase().indexOf("mdi-") && (o = "mdi " + o));
    var i = e.split("#");
    if (i.length > 1) {
        if (isNumeric(i[1])) {
            n = parseInt(i[1]);
            var r = e.replace("#" + i[1] + "#", "")
        }
    } else r = e;
    return "level" == t ? n : "text" == t ? r : "icon" == t ? o : e
}

function getMenuItemType(e) {
    if (!e.tagName) return null;
    switch (e.tagName.toLowerCase()) {
        case "div":
            return "HDR";
        case "a":
            return "LNK";
        case "hr":
            return "DVD";
        default:
            return null
    }
}

function getLoggedInUser() {
    return parseJwt(getCookie("jwt")).email
}

function parseJwt(e) {
    if (!e) return;
    const t = e.split(".")[1].replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(t))
}

function setCookie(e, t, n, o) {
    o && "" != o || (o = "/"), n && "" != n || (n = 365), document.cookie = e + "=" + t + "; path=" + o + "; expires=" + new Date(Date.now() + 864e5 * n)
}

function getCookie(e) {
    e += "=";
    for (var t = document.cookie.split(";"), n = 0; n < t.length; n++) {
        var o = t[n].trim();
        if (0 == o.indexOf(e)) return o.substring(e.length, o.length)
    }
    return ""
}

function removePrismJSLineNumbers(e) {
    [].forEach.call(e.getElementsByClassName("prismjs"), function(e) {
        e.classList.remove("line-numbers"), e.childNodes[0].setAttribute("style", "margin-left: -2rem;"), e.querySelector("span[class='line-numbers-rows']").remove()
    })
}

function insertAfter(e, t) {
    t.parentNode.insertBefore(e, t.nextSibling)
}

function insertBefore(e, t) {
    t.parentNode.insertBefore(e, t)
}

function addListeners(e, t, n) {
    t.split(" ").forEach(t => e.addEventListener(t, n, !1))
}

function menuClose(e) {
    menuClosing || menuOpening || !0 === isMouseOverNav || (menuClosing = !0, menuOpened = !1, "number" != typeof e && (e = 600), setTimeout(function() {
        navigation.classList.remove("mad-nav-visible"), navigation.classList.add("mad-nav-hidden"), sideColumn && (sideColumn.style["padding-left"] = "16px"), animatePmb("hide"), pinMenu || animateRtt("show")
    }, e), setTimeout(function() {
        menuClosing = !1, menuClosed = !0
    }, e + 300))
}

function menuOpen() {
    menuClosing || menuOpening || (menuOpening = !0, menuClosed = !1, navigation.classList.remove("mad-nav-hidden"), navigation.classList.add("mad-nav-visible"), pinMenu || animateRtt("hide"), setTimeout(function() {
        animatePmb("show")
    }, 500), setTimeout(function() {
        pinMenu || !0 === isMouseOverNav || setTimeout(function() {
            menuClose()
        }, 100), menuOpening = !1, menuOpened = !0
    }, 800))
}

function pmbShow() {
    animatePmb("show")
}

function pmbHide() {
    setTimeout(function() {
        animatePmb("hide")
    }, 500)
}

function navEvent() {
    "mouseenter" === event.type ? isMouseOverNav = !0 : "mouseleave" === event.type ? isMouseOverNav = !1 : "mouseover" === event.type && (isMouseOverNav = !0), mbHolder.contains(event.relatedTarget) || pmbHolder.contains(event.relatedTarget) || ("mouseenter" === event.type && pmbShow(), "mouseleave" === event.type && (pinMenu ? pmbHide() : menuClose()))
}

function pmbEvent() {
    "mouseup" === event.type ? toggleMenuPin() : main.contains(event.relatedTarget) && "mouseleave" === event.type && (pinMenu ? pmbHide() : menuClose())
}

function toggleMenuPin() {
    document.activeElement && document.activeElement.blur(), pinMenu = !pinMenu, setCookie(COOKIE_NAME, pinMenu, COOKIE_DAYS), pinMenu ? (menuOpen(), breadcrumbs && breadcrumbs.querySelector("div").style.removeProperty("padding-left"), pageTitle && breadcrumbsHidden && pageTitle.style.removeProperty("padding-left"), pmb.classList.remove(icon_pinOn), pmb.classList.add(icon_pinOff), main.style.setProperty("padding-left", "256px", "important"), main.style["transition-timing-function"] = "ease-in", main.style.transition = "0.5s padding ease-out", btnToTop && "235px" != btnToTop.style.left && (btnToTop.style.left = "235px"), btnToTopVisible && animateRtt("show")) : (breadcrumbs && breadcrumbs.querySelector("div").style.setProperty("padding-left", "56px", "important"), pageTitle && breadcrumbsHidden && pageTitle.style.setProperty("padding-left", "56px", "important"), animateRtt("hide"), pmb.classList.remove(icon_pinOff), pmb.classList.add(icon_pinOn), main.style.setProperty("padding-left", "0px", "important"), main.style["transition-timing-function"] = "ease-out", main.style.transition = "0.5s padding ease-out")
}

function animatePmb(e) {
    "show" == e.toLowerCase() ? (pmbHolder.classList.add("fab-transition-enter", "fab-transition-enter-active"), navigation.parentNode.insertBefore(pmbHolder, navigation.nextSibling), setTimeout(function() {
        pmbHolder.classList.remove("fab-transition-enter"), pmbHolder.classList.add("fab-transition-enter-to"), pmbHolder.classList.remove("fab-transition-enter-active", "fab-transition-enter-to")
    }, 300)) : "hide" == e.toLowerCase() && (pmbHolder.classList.add("fab-transition-leave", "fab-transition-leave-active"), pmbHolder.classList.remove("fab-transition-leave"), pmbHolder.classList.add("fab-transition-leave-to"), setTimeout(function() {
        pmbHolder.classList.remove("fab-transition-leave-active", "fab-transition-leave-to"), pmbHolder.remove()
    }, 300))
}

function animateRtt(e) {
    (btnToTop = document.querySelector("i.mdi-arrow-up")) && (btnToTop = btnToTop.closest("button"), "show" == e.toLowerCase() ? setTimeout(function() {
        btnToTop.classList.remove("fab-transition-leave-active", "fab-transition-leave-to"), btnToTop.classList.add("fab-transition-enter", "fab-transition-enter-active"), setTimeout(function() {
            btnToTop.classList.remove("fab-transition-enter"), btnToTop.classList.add("fab-transition-enter-to"), btnToTop.classList.remove("fab-transition-enter-active", "fab-transition-enter-to")
        }, 300)
    }, 300) : "hide" == e.toLowerCase() && (moStop(), btnToTop.classList.add("fab-transition-leave", "fab-transition-leave-active"), btnToTop.classList.remove("fab-transition-leave"), btnToTop.classList.add("fab-transition-leave-to"), setTimeout(function() {
        moStart()
    }, 100)))
}

function handleMouseMove(e) {
    var t, n, o;
    null == (e = e || window.event).pageX && null != e.clientX && (n = (t = e.target && e.target.ownerDocument || document).documentElement, o = t.body, e.pageX = e.clientX + (n && n.scrollLeft || o && o.scrollLeft || 0) - (n && n.clientLeft || o && o.clientLeft || 0), e.pageY = e.clientY + (n && n.scrollTop || o && o.scrollTop || 0) - (n && n.clientTop || o && o.clientTop || 0));
    var i = leftEdge || 2;
    navigation && (e.pageX < i && !pinMenu && mouseLeftEdgeOpensMenu && !menuClosing && !menuOpening && !menuOpened && menuOpen(), menuFirstHover && (menuFirstHover = !1, isMouseOverNav = isDescendant(navigation, document.elementFromPoint(e.pageX, e.pageY))))
}
var getNextSibling = function(e, t) {
        var n = e.nextElementSibling;
        if (!t) return n;
        for (; n;) {
            if (n.matches(t)) return n;
            n = n.nextElementSibling
        }
    },
    getPreviousSibling = function(e, t) {
        var n = e.previousElementSibling;
        if (!t) return n;
        for (; n;) {
            if (n.matches(t)) return n;
            n = n.previousElementSibling
        }
    },
    setupVideoElements = function() {
        document.querySelectorAll("div.mad-wjsc-video").forEach(e => {
            var t = e.querySelector("video");
            t.addEventListener ? t.addEventListener("contextmenu", function(e) {
                e.preventDefault()
            }, !1) : t.attachEvent("oncontextmenu", function() {
                window.event.returnValue = !1
            }), t.addEventListener ? t.addEventListener("selectstart", function(e) {
                e.preventDefault()
            }, !1) : t.attachEvent("onselectstart", function() {
                window.event.returnValue = !1
            }), t.addEventListener ? t.addEventListener("dragstart", function(e) {
                e.preventDefault()
            }, !1) : t.attachEvent("ondragstart", function() {
                window.event.returnValue = !1
            }), t.controlsList = "nodownload noremoteplayback", t.controls = !0
        })
    },
    disableGlobalContextMenu = function() {
        document.getElementById("root").addEventListener("contextmenu", function(e) {
            e.preventDefault()
        })
    },
    faccordion = function() {
        function e(e, t, n, o) {
            void 0 === t && (t = 400), void 0 === o && (o = !1), e.style.overflow = "hidden", o && (e.style.display = "block");
            var i, r = window.getComputedStyle(e),
                a = parseFloat(r.getPropertyValue("height")),
                s = parseFloat(r.getPropertyValue("padding-top")),
                l = parseFloat(r.getPropertyValue("padding-bottom")),
                d = parseFloat(r.getPropertyValue("margin-top")),
                c = parseFloat(r.getPropertyValue("margin-bottom")),
                m = a / t,
                u = s / t,
                p = l / t,
                f = d / t,
                v = c / t;
            window.requestAnimationFrame(function r(b) {
                void 0 === i && (i = b);
                var g = b - i;
                o ? (e.style.height = m * g + "px", e.style.paddingTop = u * g + "px", e.style.paddingBottom = p * g + "px", e.style.marginTop = f * g + "px", e.style.marginBottom = v * g + "px") : (e.style.height = a - m * g + "px", e.style.paddingTop = s - u * g + "px", e.style.paddingBottom = l - p * g + "px", e.style.marginTop = d - f * g + "px", e.style.marginBottom = c - v * g + "px"), g >= t ? (e.style.height = "", e.style.paddingTop = "", e.style.paddingBottom = "", e.style.marginTop = "", e.style.marginBottom = "", e.style.overflow = "", o || (e.style.display = "none"), "function" == typeof n && n()) : window.requestAnimationFrame(r)
            })
        }
        Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector);
        var t = function(e, t) {
                var n = [];
                let o = e.parentElement.children,
                    i = !1;
                for (let r = 0; r < o.length; r++) i || e !== o[r] ? i && o[r].matches(t) && n.push(o[r]) : i = !0;
                return n
            },
            n = function(t) {
                var n, o, i;
                t && t.classList && (t.classList.toggle("show"), o = 350, 0 === (n = t).clientHeight ? e(n, o, i, !0) : e(n, o, i))
            },
            o = function(t) {
                var n;
                t && t.classList && (t.classList.remove("show"), e(t, 350, n))
            },
            i = function(e) {
                e && e.classList && (e.classList.toggle("collapsed"), e.classList.toggle("expanded"))
            };
        document.querySelectorAll("div.faccordion").forEach(e => {
            e.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach(e => {
                var t = document.createElement("div");
                t.classList.add("inner"),
                    function(e, t, n) {
                        var o = [];
                        for (e = e.nextElementSibling; e && !e.matches(t);) !n || e.matches(n) ? (o.push(e), e = e.nextElementSibling) : e = e.nextElementSibling;
                        return o
                    }(e, "ul").forEach(e => {
                        e.parentNode.insertBefore(t, e), t.appendChild(e)
                    })
            }), e.querySelectorAll("ul h1,h2,h3,h4,h5,h6").forEach(e => {
                e.classList.remove("toc-header")
            }), e.querySelector("ul") && e.querySelector("ul").classList.add("faccordion"), e.querySelectorAll("ul ul").forEach(e => {
                e.classList.add("inner")
            }), e.querySelectorAll("ul h1,h2,h3,h4,h5,h6").forEach(e => {
                e.classList.add("toggle", "show")
            }), e.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach(e => {
                Array.prototype.slice.call(e.parentNode.children).forEach(t => {
                    t.parentNode.querySelectorAll("div .inner").length ? e.classList.add("collapsed") : e.classList.add("single")
                })
            })
        }), document.querySelectorAll(".toggle").forEach(e => {
            e.onclick = function(r) {
                if (r.preventDefault(), function(e, t) {
                        if (t.nodeType) return e === t;
                        for (var n = "string" == typeof t ? document.querySelectorAll(t) : t, o = n.length; o--;)
                            if (n[o] === e) return !0;
                        return !1
                    }(e.nextElementSibling, "div.inner")) {
                    i(e);
                    let r = t(e, ":not(div)");
                    r[0] && r[0].classList.contains("show") ? (o(r[0]), e.parentNode.querySelectorAll(".toggle.show.expanded").forEach(e => {
                        let o = t(e, ":not(div)");
                        i(e), n(e.nextElementSibling), n(o[0])
                    }), n(e.nextElementSibling)) : (function(e, t) {
                        Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector);
                        var n = [];
                        for (let o of e.parentNode.children) o !== e && o.matches(t) && n.push(o);
                        return n
                    }(e.closest("li"), "li").forEach(e => {
                        e.querySelectorAll(".inner").forEach(e => {
                            o(e)
                        }), e.querySelectorAll(".toggle").forEach(e => {
                            e.classList.contains("expanded") && i(e)
                        })
                    }), n(e.nextElementSibling), n(r[0]))
                } else e.nextElementSibling.classList.contains("show") ? o(e.nextElementSibling) : n(e.nextElementSibling)
            }
        })
    };

function jsSleep(e) {
    return new Promise(t => setTimeout(t, e))
}
async function sleep(e) {
    await jsSleep(e)
}

function isDescendant(e, t) {
    for (var n = t.parentNode; null != n;) {
        if (n == e) return !0;
        n = n.parentNode
    }
    return !1
}