(() => {
        "use strict";
        var e = {};
        e.g = function() {
            if ("object" == typeof globalThis) return globalThis;
            try {
                return this || new Function("return this")()
            } catch (e) {
                if ("object" == typeof window) return window
            }
        }();
        const t = function(e) {
                const t = [];
                let n = 0;
                for (let r = 0; r < e.length; r++) {
                    let i = e.charCodeAt(r);
                    i < 128 ? t[n++] = i : i < 2048 ? (t[n++] = i >> 6 | 192, t[n++] = 63 & i | 128) : 55296 == (64512 & i) && r + 1 < e.length && 56320 == (64512 & e.charCodeAt(r + 1)) ? (i = 65536 + ((1023 & i) << 10) + (1023 & e.charCodeAt(++r)), t[n++] = i >> 18 | 240, t[n++] = i >> 12 & 63 | 128, t[n++] = i >> 6 & 63 | 128, t[n++] = 63 & i | 128) : (t[n++] = i >> 12 | 224, t[n++] = i >> 6 & 63 | 128, t[n++] = 63 & i | 128)
                }
                return t
            },
            n = {
                byteToCharMap_: null,
                charToByteMap_: null,
                byteToCharMapWebSafe_: null,
                charToByteMapWebSafe_: null,
                ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                get ENCODED_VALS() {
                    return this.ENCODED_VALS_BASE + "+/="
                },
                get ENCODED_VALS_WEBSAFE() {
                    return this.ENCODED_VALS_BASE + "-_."
                },
                HAS_NATIVE_SUPPORT: "function" == typeof atob,
                encodeByteArray(e, t) {
                    if (!Array.isArray(e)) throw Error("encodeByteArray takes an array as a parameter");
                    this.init_();
                    const n = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
                        r = [];
                    for (let t = 0; t < e.length; t += 3) {
                        const i = e[t],
                            s = t + 1 < e.length,
                            o = s ? e[t + 1] : 0,
                            a = t + 2 < e.length,
                            c = a ? e[t + 2] : 0,
                            l = i >> 2,
                            u = (3 & i) << 4 | o >> 4;
                        let h = (15 & o) << 2 | c >> 6,
                            d = 63 & c;
                        a || (d = 64, s || (h = 64)), r.push(n[l], n[u], n[h], n[d])
                    }
                    return r.join("")
                },
                encodeString(e, n) {
                    return this.HAS_NATIVE_SUPPORT && !n ? btoa(e) : this.encodeByteArray(t(e), n)
                },
                decodeString(e, t) {
                    return this.HAS_NATIVE_SUPPORT && !t ? atob(e) : function(e) {
                        const t = [];
                        let n = 0,
                            r = 0;
                        for (; n < e.length;) {
                            const i = e[n++];
                            if (i < 128) t[r++] = String.fromCharCode(i);
                            else if (i > 191 && i < 224) {
                                const s = e[n++];
                                t[r++] = String.fromCharCode((31 & i) << 6 | 63 & s)
                            } else if (i > 239 && i < 365) {
                                const s = ((7 & i) << 18 | (63 & e[n++]) << 12 | (63 & e[n++]) << 6 | 63 & e[n++]) - 65536;
                                t[r++] = String.fromCharCode(55296 + (s >> 10)), t[r++] = String.fromCharCode(56320 + (1023 & s))
                            } else {
                                const s = e[n++],
                                    o = e[n++];
                                t[r++] = String.fromCharCode((15 & i) << 12 | (63 & s) << 6 | 63 & o)
                            }
                        }
                        return t.join("")
                    }(this.decodeStringToByteArray(e, t))
                },
                decodeStringToByteArray(e, t) {
                    this.init_();
                    const n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
                        r = [];
                    for (let t = 0; t < e.length;) {
                        const i = n[e.charAt(t++)],
                            s = t < e.length ? n[e.charAt(t)] : 0;
                        ++t;
                        const o = t < e.length ? n[e.charAt(t)] : 64;
                        ++t;
                        const a = t < e.length ? n[e.charAt(t)] : 64;
                        if (++t, null == i || null == s || null == o || null == a) throw Error();
                        const c = i << 2 | s >> 4;
                        if (r.push(c), 64 !== o) {
                            const e = s << 4 & 240 | o >> 2;
                            if (r.push(e), 64 !== a) {
                                const e = o << 6 & 192 | a;
                                r.push(e)
                            }
                        }
                    }
                    return r
                },
                init_() {
                    if (!this.byteToCharMap_) {
                        this.byteToCharMap_ = {}, this.charToByteMap_ = {}, this.byteToCharMapWebSafe_ = {}, this.charToByteMapWebSafe_ = {};
                        for (let e = 0; e < this.ENCODED_VALS.length; e++) this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e), this.charToByteMap_[this.byteToCharMap_[e]] = e, this.byteToCharMapWebSafe_[e] = this.ENCODED_VALS_WEBSAFE.charAt(e), this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e, e >= this.ENCODED_VALS_BASE.length && (this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e, this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e)
                    }
                }
            },
            r = function(e) {
                return function(e) {
                    const r = t(e);
                    return n.encodeByteArray(r, !0)
                }(e).replace(/\./g, "")
            },
            i = function(e) {
                try {
                    return n.decodeString(e, !0)
                } catch (e) {
                    console.error("base64Decode failed: ", e)
                }
                return null
            };

        function s() {
            return "undefined" != typeof navigator && "string" == typeof navigator.userAgent ? navigator.userAgent : ""
        }
        const o = () => function() {
                if ("undefined" != typeof self) return self;
                if ("undefined" != typeof window) return window;
                if (void 0 !== e.g) return e.g;
                throw new Error("Unable to locate global object.")
            }().__FIREBASE_DEFAULTS__,
            a = () => {
                try {
                    return o() || (() => {
                        if ("undefined" == typeof process || void 0 === process.env) return;
                        const e = process.env.__FIREBASE_DEFAULTS__;
                        return e ? JSON.parse(e) : void 0
                    })() || (() => {
                        if ("undefined" == typeof document) return;
                        let e;
                        try {
                            e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)
                        } catch (e) {
                            return
                        }
                        const t = e && i(e[1]);
                        return t && JSON.parse(t)
                    })()
                } catch (e) {
                    return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)
                }
            },
            c = e => {
                var t, n;
                return null === (n = null === (t = a()) || void 0 === t ? void 0 : t.emulatorHosts) || void 0 === n ? void 0 : n[e]
            },
            l = e => {
                var t;
                return null === (t = a()) || void 0 === t ? void 0 : t[`_${e}`]
            };
        class u {
            constructor() {
                this.reject = () => {}, this.resolve = () => {}, this.promise = new Promise(((e, t) => {
                    this.resolve = e, this.reject = t
                }))
            }
            wrapCallback(e) {
                return (t, n) => {
                    t ? this.reject(t) : this.resolve(n), "function" == typeof e && (this.promise.catch((() => {})), 1 === e.length ? e(t) : e(t, n))
                }
            }
        }
        class h extends Error {
            constructor(e, t, n) {
                super(t), this.code = e, this.customData = n, this.name = "FirebaseError", Object.setPrototypeOf(this, h.prototype), Error.captureStackTrace && Error.captureStackTrace(this, d.prototype.create)
            }
        }
        class d {
            constructor(e, t, n) {
                this.service = e, this.serviceName = t, this.errors = n
            }
            create(e, ...t) {
                const n = t[0] || {},
                    r = `${this.service}/${e}`,
                    i = this.errors[e],
                    s = i ? function(e, t) {
                        return e.replace(p, ((e, n) => {
                            const r = t[n];
                            return null != r ? String(r) : `<${n}?>`
                        }))
                    }(i, n) : "Error",
                    o = `${this.serviceName}: ${s} (${r}).`;
                return new h(r, o, n)
            }
        }
        const p = /\{\$([^}]+)}/g;

        function f(e, t) {
            if (e === t) return !0;
            const n = Object.keys(e),
                r = Object.keys(t);
            for (const i of n) {
                if (!r.includes(i)) return !1;
                const n = e[i],
                    s = t[i];
                if (m(n) && m(s)) {
                    if (!f(n, s)) return !1
                } else if (n !== s) return !1
            }
            for (const e of r)
                if (!n.includes(e)) return !1;
            return !0
        }

        function m(e) {
            return null !== e && "object" == typeof e
        }

        function g(e) {
            const t = [];
            for (const [n, r] of Object.entries(e)) Array.isArray(r) ? r.forEach((e => {
                t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e))
            })) : t.push(encodeURIComponent(n) + "=" + encodeURIComponent(r));
            return t.length ? "&" + t.join("&") : ""
        }

        function v(e) {
            const t = {};
            return e.replace(/^\?/, "").split("&").forEach((e => {
                if (e) {
                    const [n, r] = e.split("=");
                    t[decodeURIComponent(n)] = decodeURIComponent(r)
                }
            })), t
        }

        function _(e) {
            const t = e.indexOf("?");
            if (!t) return "";
            const n = e.indexOf("#", t);
            return e.substring(t, n > 0 ? n : void 0)
        }
        class y {
            constructor(e, t) {
                this.observers = [], this.unsubscribes = [], this.observerCount = 0, this.task = Promise.resolve(), this.finalized = !1, this.onNoObservers = t, this.task.then((() => {
                    e(this)
                })).catch((e => {
                    this.error(e)
                }))
            }
            next(e) {
                this.forEachObserver((t => {
                    t.next(e)
                }))
            }
            error(e) {
                this.forEachObserver((t => {
                    t.error(e)
                })), this.close(e)
            }
            complete() {
                this.forEachObserver((e => {
                    e.complete()
                })), this.close()
            }
            subscribe(e, t, n) {
                let r;
                if (void 0 === e && void 0 === t && void 0 === n) throw new Error("Missing Observer.");
                r = function(e, t) {
                    if ("object" != typeof e || null === e) return !1;
                    for (const n of t)
                        if (n in e && "function" == typeof e[n]) return !0;
                    return !1
                }(e, ["next", "error", "complete"]) ? e : {
                    next: e,
                    error: t,
                    complete: n
                }, void 0 === r.next && (r.next = I), void 0 === r.error && (r.error = I), void 0 === r.complete && (r.complete = I);
                const i = this.unsubscribeOne.bind(this, this.observers.length);
                return this.finalized && this.task.then((() => {
                    try {
                        this.finalError ? r.error(this.finalError) : r.complete()
                    } catch (e) {}
                })), this.observers.push(r), i
            }
            unsubscribeOne(e) {
                void 0 !== this.observers && void 0 !== this.observers[e] && (delete this.observers[e], this.observerCount -= 1, 0 === this.observerCount && void 0 !== this.onNoObservers && this.onNoObservers(this))
            }
            forEachObserver(e) {
                if (!this.finalized)
                    for (let t = 0; t < this.observers.length; t++) this.sendOne(t, e)
            }
            sendOne(e, t) {
                this.task.then((() => {
                    if (void 0 !== this.observers && void 0 !== this.observers[e]) try {
                        t(this.observers[e])
                    } catch (e) {
                        "undefined" != typeof console && console.error && console.error(e)
                    }
                }))
            }
            close(e) {
                this.finalized || (this.finalized = !0, void 0 !== e && (this.finalError = e), this.task.then((() => {
                    this.observers = void 0, this.onNoObservers = void 0
                })))
            }
        }

        function I() {}

        function b(e) {
            return e && e._delegate ? e._delegate : e
        }
        class w {
            constructor(e, t, n) {
                this.name = e, this.instanceFactory = t, this.type = n, this.multipleInstances = !1, this.serviceProps = {}, this.instantiationMode = "LAZY", this.onInstanceCreated = null
            }
            setInstantiationMode(e) {
                return this.instantiationMode = e, this
            }
            setMultipleInstances(e) {
                return this.multipleInstances = e, this
            }
            setServiceProps(e) {
                return this.serviceProps = e, this
            }
            setInstanceCreatedCallback(e) {
                return this.onInstanceCreated = e, this
            }
        }
        const T = "[DEFAULT]";
        class E {
            constructor(e, t) {
                this.name = e, this.container = t, this.component = null, this.instances = new Map, this.instancesDeferred = new Map, this.instancesOptions = new Map, this.onInitCallbacks = new Map
            }
            get(e) {
                const t = this.normalizeInstanceIdentifier(e);
                if (!this.instancesDeferred.has(t)) {
                    const e = new u;
                    if (this.instancesDeferred.set(t, e), this.isInitialized(t) || this.shouldAutoInitialize()) try {
                        const n = this.getOrInitializeService({
                            instanceIdentifier: t
                        });
                        n && e.resolve(n)
                    } catch (e) {}
                }
                return this.instancesDeferred.get(t).promise
            }
            getImmediate(e) {
                var t;
                const n = this.normalizeInstanceIdentifier(null == e ? void 0 : e.identifier),
                    r = null !== (t = null == e ? void 0 : e.optional) && void 0 !== t && t;
                if (!this.isInitialized(n) && !this.shouldAutoInitialize()) {
                    if (r) return null;
                    throw Error(`Service ${this.name} is not available`)
                }
                try {
                    return this.getOrInitializeService({
                        instanceIdentifier: n
                    })
                } catch (e) {
                    if (r) return null;
                    throw e
                }
            }
            getComponent() {
                return this.component
            }
            setComponent(e) {
                if (e.name !== this.name) throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);
                if (this.component) throw Error(`Component for ${this.name} has already been provided`);
                if (this.component = e, this.shouldAutoInitialize()) {
                    if (function(e) {
                            return "EAGER" === e.instantiationMode
                        }(e)) try {
                        this.getOrInitializeService({
                            instanceIdentifier: T
                        })
                    } catch (e) {}
                    for (const [e, t] of this.instancesDeferred.entries()) {
                        const n = this.normalizeInstanceIdentifier(e);
                        try {
                            const e = this.getOrInitializeService({
                                instanceIdentifier: n
                            });
                            t.resolve(e)
                        } catch (e) {}
                    }
                }
            }
            clearInstance(e = "[DEFAULT]") {
                this.instancesDeferred.delete(e), this.instancesOptions.delete(e), this.instances.delete(e)
            }
            async delete() {
                const e = Array.from(this.instances.values());
                await Promise.all([...e.filter((e => "INTERNAL" in e)).map((e => e.INTERNAL.delete())), ...e.filter((e => "_delete" in e)).map((e => e._delete()))])
            }
            isComponentSet() {
                return null != this.component
            }
            isInitialized(e = "[DEFAULT]") {
                return this.instances.has(e)
            }
            getOptions(e = "[DEFAULT]") {
                return this.instancesOptions.get(e) || {}
            }
            initialize(e = {}) {
                const {
                    options: t = {}
                } = e, n = this.normalizeInstanceIdentifier(e.instanceIdentifier);
                if (this.isInitialized(n)) throw Error(`${this.name}(${n}) has already been initialized`);
                if (!this.isComponentSet()) throw Error(`Component ${this.name} has not been registered yet`);
                const r = this.getOrInitializeService({
                    instanceIdentifier: n,
                    options: t
                });
                for (const [e, t] of this.instancesDeferred.entries()) {
                    n === this.normalizeInstanceIdentifier(e) && t.resolve(r)
                }
                return r
            }
            onInit(e, t) {
                var n;
                const r = this.normalizeInstanceIdentifier(t),
                    i = null !== (n = this.onInitCallbacks.get(r)) && void 0 !== n ? n : new Set;
                i.add(e), this.onInitCallbacks.set(r, i);
                const s = this.instances.get(r);
                return s && e(s, r), () => {
                    i.delete(e)
                }
            }
            invokeOnInitCallbacks(e, t) {
                const n = this.onInitCallbacks.get(t);
                if (n)
                    for (const r of n) try {
                        r(e, t)
                    } catch (e) {}
            }
            getOrInitializeService({
                instanceIdentifier: e,
                options: t = {}
            }) {
                let n = this.instances.get(e);
                if (!n && this.component && (n = this.component.instanceFactory(this.container, {
                        instanceIdentifier: (r = e, r === T ? void 0 : r),
                        options: t
                    }), this.instances.set(e, n), this.instancesOptions.set(e, t), this.invokeOnInitCallbacks(n, e), this.component.onInstanceCreated)) try {
                    this.component.onInstanceCreated(this.container, e, n)
                } catch (e) {}
                var r;
                return n || null
            }
            normalizeInstanceIdentifier(e = "[DEFAULT]") {
                return this.component ? this.component.multipleInstances ? e : T : e
            }
            shouldAutoInitialize() {
                return !!this.component && "EXPLICIT" !== this.component.instantiationMode
            }
        }
        class k {
            constructor(e) {
                this.name = e, this.providers = new Map
            }
            addComponent(e) {
                const t = this.getProvider(e.name);
                if (t.isComponentSet()) throw new Error(`Component ${e.name} has already been registered with ${this.name}`);
                t.setComponent(e)
            }
            addOrOverwriteComponent(e) {
                this.getProvider(e.name).isComponentSet() && this.providers.delete(e.name), this.addComponent(e)
            }
            getProvider(e) {
                if (this.providers.has(e)) return this.providers.get(e);
                const t = new E(e, this);
                return this.providers.set(e, t), t
            }
            getProviders() {
                return Array.from(this.providers.values())
            }
        }
        const S = [];
        var O;
        ! function(e) {
            e[e.DEBUG = 0] = "DEBUG", e[e.VERBOSE = 1] = "VERBOSE", e[e.INFO = 2] = "INFO", e[e.WARN = 3] = "WARN", e[e.ERROR = 4] = "ERROR", e[e.SILENT = 5] = "SILENT"
        }(O || (O = {}));
        const R = {
                debug: O.DEBUG,
                verbose: O.VERBOSE,
                info: O.INFO,
                warn: O.WARN,
                error: O.ERROR,
                silent: O.SILENT
            },
            C = O.INFO,
            A = {
                [O.DEBUG]: "log",
                [O.VERBOSE]: "log",
                [O.INFO]: "info",
                [O.WARN]: "warn",
                [O.ERROR]: "error"
            },
            N = (e, t, ...n) => {
                if (t < e.logLevel) return;
                const r = (new Date).toISOString(),
                    i = A[t];
                if (!i) throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);
                console[i](`[${r}]  ${e.name}:`, ...n)
            };
        class D {
            constructor(e) {
                this.name = e, this._logLevel = C, this._logHandler = N, this._userLogHandler = null, S.push(this)
            }
            get logLevel() {
                return this._logLevel
            }
            set logLevel(e) {
                if (!(e in O)) throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
                this._logLevel = e
            }
            setLogLevel(e) {
                this._logLevel = "string" == typeof e ? R[e] : e
            }
            get logHandler() {
                return this._logHandler
            }
            set logHandler(e) {
                if ("function" != typeof e) throw new TypeError("Value assigned to `logHandler` must be a function");
                this._logHandler = e
            }
            get userLogHandler() {
                return this._userLogHandler
            }
            set userLogHandler(e) {
                this._userLogHandler = e
            }
            debug(...e) {
                this._userLogHandler && this._userLogHandler(this, O.DEBUG, ...e), this._logHandler(this, O.DEBUG, ...e)
            }
            log(...e) {
                this._userLogHandler && this._userLogHandler(this, O.VERBOSE, ...e), this._logHandler(this, O.VERBOSE, ...e)
            }
            info(...e) {
                this._userLogHandler && this._userLogHandler(this, O.INFO, ...e), this._logHandler(this, O.INFO, ...e)
            }
            warn(...e) {
                this._userLogHandler && this._userLogHandler(this, O.WARN, ...e), this._logHandler(this, O.WARN, ...e)
            }
            error(...e) {
                this._userLogHandler && this._userLogHandler(this, O.ERROR, ...e), this._logHandler(this, O.ERROR, ...e)
            }
        }
        let P, L;
        const M = new WeakMap,
            U = new WeakMap,
            x = new WeakMap,
            F = new WeakMap,
            j = new WeakMap;
        let V = {
            get(e, t, n) {
                if (e instanceof IDBTransaction) {
                    if ("done" === t) return U.get(e);
                    if ("objectStoreNames" === t) return e.objectStoreNames || x.get(e);
                    if ("store" === t) return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0])
                }
                return z(e[t])
            },
            set: (e, t, n) => (e[t] = n, !0),
            has: (e, t) => e instanceof IDBTransaction && ("done" === t || "store" === t) || t in e
        };

        function H(e) {
            return e !== IDBDatabase.prototype.transaction || "objectStoreNames" in IDBTransaction.prototype ? (L || (L = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey])).includes(e) ? function(...t) {
                return e.apply(W(this), t), z(M.get(this))
            } : function(...t) {
                return z(e.apply(W(this), t))
            } : function(t, ...n) {
                const r = e.call(W(this), t, ...n);
                return x.set(r, t.sort ? t.sort() : [t]), z(r)
            }
        }

        function B(e) {
            return "function" == typeof e ? H(e) : (e instanceof IDBTransaction && function(e) {
                if (U.has(e)) return;
                const t = new Promise(((t, n) => {
                    const r = () => {
                            e.removeEventListener("complete", i), e.removeEventListener("error", s), e.removeEventListener("abort", s)
                        },
                        i = () => {
                            t(), r()
                        },
                        s = () => {
                            n(e.error || new DOMException("AbortError", "AbortError")), r()
                        };
                    e.addEventListener("complete", i), e.addEventListener("error", s), e.addEventListener("abort", s)
                }));
                U.set(e, t)
            }(e), t = e, (P || (P = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])).some((e => t instanceof e)) ? new Proxy(e, V) : e);
            var t
        }

        function z(e) {
            if (e instanceof IDBRequest) return function(e) {
                const t = new Promise(((t, n) => {
                    const r = () => {
                            e.removeEventListener("success", i), e.removeEventListener("error", s)
                        },
                        i = () => {
                            t(z(e.result)), r()
                        },
                        s = () => {
                            n(e.error), r()
                        };
                    e.addEventListener("success", i), e.addEventListener("error", s)
                }));
                return t.then((t => {
                    t instanceof IDBCursor && M.set(t, e)
                })).catch((() => {})), j.set(t, e), t
            }(e);
            if (F.has(e)) return F.get(e);
            const t = B(e);
            return t !== e && (F.set(e, t), j.set(t, e)), t
        }
        const W = e => j.get(e);
        const $ = ["get", "getKey", "getAll", "getAllKeys", "count"],
            q = ["put", "add", "delete", "clear"],
            G = new Map;

        function K(e, t) {
            if (!(e instanceof IDBDatabase) || t in e || "string" != typeof t) return;
            if (G.get(t)) return G.get(t);
            const n = t.replace(/FromIndex$/, ""),
                r = t !== n,
                i = q.includes(n);
            if (!(n in (r ? IDBIndex : IDBObjectStore).prototype) || !i && !$.includes(n)) return;
            const s = async function(e, ...t) {
                const s = this.transaction(e, i ? "readwrite" : "readonly");
                let o = s.store;
                return r && (o = o.index(t.shift())), (await Promise.all([o[n](...t), i && s.done]))[0]
            };
            return G.set(t, s), s
        }
        V = (e => ({
            ...e,
            get: (t, n, r) => K(t, n) || e.get(t, n, r),
            has: (t, n) => !!K(t, n) || e.has(t, n)
        }))(V);
        class J {
            constructor(e) {
                this.container = e
            }
            getPlatformInfoString() {
                return this.container.getProviders().map((e => {
                    if (function(e) {
                            const t = e.getComponent();
                            return "VERSION" === (null == t ? void 0 : t.type)
                        }(e)) {
                        const t = e.getImmediate();
                        return `${t.library}/${t.version}`
                    }
                    return null
                })).filter((e => e)).join(" ")
            }
        }
        const X = "@firebase/app",
            Y = "0.8.4",
            Q = new D("@firebase/app"),
            Z = "[DEFAULT]",
            ee = {
                [X]: "fire-core",
                "@firebase/app-compat": "fire-core-compat",
                "@firebase/analytics": "fire-analytics",
                "@firebase/analytics-compat": "fire-analytics-compat",
                "@firebase/app-check": "fire-app-check",
                "@firebase/app-check-compat": "fire-app-check-compat",
                "@firebase/auth": "fire-auth",
                "@firebase/auth-compat": "fire-auth-compat",
                "@firebase/database": "fire-rtdb",
                "@firebase/database-compat": "fire-rtdb-compat",
                "@firebase/functions": "fire-fn",
                "@firebase/functions-compat": "fire-fn-compat",
                "@firebase/installations": "fire-iid",
                "@firebase/installations-compat": "fire-iid-compat",
                "@firebase/messaging": "fire-fcm",
                "@firebase/messaging-compat": "fire-fcm-compat",
                "@firebase/performance": "fire-perf",
                "@firebase/performance-compat": "fire-perf-compat",
                "@firebase/remote-config": "fire-rc",
                "@firebase/remote-config-compat": "fire-rc-compat",
                "@firebase/storage": "fire-gcs",
                "@firebase/storage-compat": "fire-gcs-compat",
                "@firebase/firestore": "fire-fst",
                "@firebase/firestore-compat": "fire-fst-compat",
                "fire-js": "fire-js",
                firebase: "fire-js-all"
            },
            te = new Map,
            ne = new Map;

        function re(e, t) {
            try {
                e.container.addComponent(t)
            } catch (n) {
                Q.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`, n)
            }
        }

        function ie(e) {
            const t = e.name;
            if (ne.has(t)) return Q.debug(`There were multiple attempts to register component ${t}.`), !1;
            ne.set(t, e);
            for (const t of te.values()) re(t, e);
            return !0
        }

        function se(e, t) {
            const n = e.container.getProvider("heartbeat").getImmediate({
                optional: !0
            });
            return n && n.triggerHeartbeat(), e.container.getProvider(t)
        }
        const oe = new d("app", "Firebase", {
            "no-app": "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",
            "bad-app-name": "Illegal App name: '{$appName}",
            "duplicate-app": "Firebase App named '{$appName}' already exists with different options or config",
            "app-deleted": "Firebase App named '{$appName}' already deleted",
            "no-options": "Need to provide options, when not being deployed to hosting via source.",
            "invalid-app-argument": "firebase.{$appName}() takes either no argument or a Firebase App instance.",
            "invalid-log-argument": "First argument to `onLog` must be null or a function.",
            "idb-open": "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
            "idb-get": "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
            "idb-set": "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
            "idb-delete": "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."
        });
        class ae {
            constructor(e, t, n) {
                this._isDeleted = !1, this._options = Object.assign({}, e), this._config = Object.assign({}, t), this._name = t.name, this._automaticDataCollectionEnabled = t.automaticDataCollectionEnabled, this._container = n, this.container.addComponent(new w("app", (() => this), "PUBLIC"))
            }
            get automaticDataCollectionEnabled() {
                return this.checkDestroyed(), this._automaticDataCollectionEnabled
            }
            set automaticDataCollectionEnabled(e) {
                this.checkDestroyed(), this._automaticDataCollectionEnabled = e
            }
            get name() {
                return this.checkDestroyed(), this._name
            }
            get options() {
                return this.checkDestroyed(), this._options
            }
            get config() {
                return this.checkDestroyed(), this._config
            }
            get container() {
                return this._container
            }
            get isDeleted() {
                return this._isDeleted
            }
            set isDeleted(e) {
                this._isDeleted = e
            }
            checkDestroyed() {
                if (this.isDeleted) throw oe.create("app-deleted", {
                    appName: this._name
                })
            }
        }
        const ce = "9.14.0";

        function le(e, t = {}) {
            let n = e;
            if ("object" != typeof t) {
                t = {
                    name: t
                }
            }
            const r = Object.assign({
                    name: Z,
                    automaticDataCollectionEnabled: !1
                }, t),
                i = r.name;
            if ("string" != typeof i || !i) throw oe.create("bad-app-name", {
                appName: String(i)
            });
            var s;
            if (n || (n = null === (s = a()) || void 0 === s ? void 0 : s.config), !n) throw oe.create("no-options");
            const o = te.get(i);
            if (o) {
                if (f(n, o.options) && f(r, o.config)) return o;
                throw oe.create("duplicate-app", {
                    appName: i
                })
            }
            const c = new k(i);
            for (const e of ne.values()) c.addComponent(e);
            const l = new ae(n, r, c);
            return te.set(i, l), l
        }

        function ue(e, t, n) {
            var r;
            let i = null !== (r = ee[e]) && void 0 !== r ? r : e;
            n && (i += `-${n}`);
            const s = i.match(/\s|\//),
                o = t.match(/\s|\//);
            if (s || o) {
                const e = [`Unable to register library "${i}" with version "${t}":`];
                return s && e.push(`library name "${i}" contains illegal characters (whitespace or "/")`), s && o && e.push("and"), o && e.push(`version name "${t}" contains illegal characters (whitespace or "/")`), void Q.warn(e.join(" "))
            }
            ie(new w(`${i}-version`, (() => ({
                library: i,
                version: t
            })), "VERSION"))
        }
        const he = "firebase-heartbeat-store";
        let de = null;

        function pe() {
            return de || (de = function(e, t, {
                blocked: n,
                upgrade: r,
                blocking: i,
                terminated: s
            } = {}) {
                const o = indexedDB.open(e, t),
                    a = z(o);
                return r && o.addEventListener("upgradeneeded", (e => {
                    r(z(o.result), e.oldVersion, e.newVersion, z(o.transaction))
                })), n && o.addEventListener("blocked", (() => n())), a.then((e => {
                    s && e.addEventListener("close", (() => s())), i && e.addEventListener("versionchange", (() => i()))
                })).catch((() => {})), a
            }("firebase-heartbeat-database", 1, {
                upgrade: (e, t) => {
                    if (0 === t) e.createObjectStore(he)
                }
            }).catch((e => {
                throw oe.create("idb-open", {
                    originalErrorMessage: e.message
                })
            }))), de
        }
        async function fe(e, t) {
            var n;
            try {
                const n = (await pe()).transaction(he, "readwrite"),
                    r = n.objectStore(he);
                return await r.put(t, me(e)), n.done
            } catch (e) {
                if (e instanceof h) Q.warn(e.message);
                else {
                    const t = oe.create("idb-set", {
                        originalErrorMessage: null === (n = e) || void 0 === n ? void 0 : n.message
                    });
                    Q.warn(t.message)
                }
            }
        }

        function me(e) {
            return `${e.name}!${e.options.appId}`
        }
        class ge {
            constructor(e) {
                this.container = e, this._heartbeatsCache = null;
                const t = this.container.getProvider("app").getImmediate();
                this._storage = new _e(t), this._heartbeatsCachePromise = this._storage.read().then((e => (this._heartbeatsCache = e, e)))
            }
            async triggerHeartbeat() {
                const e = this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),
                    t = ve();
                if (null === this._heartbeatsCache && (this._heartbeatsCache = await this._heartbeatsCachePromise), this._heartbeatsCache.lastSentHeartbeatDate !== t && !this._heartbeatsCache.heartbeats.some((e => e.date === t))) return this._heartbeatsCache.heartbeats.push({
                    date: t,
                    agent: e
                }), this._heartbeatsCache.heartbeats = this._heartbeatsCache.heartbeats.filter((e => {
                    const t = new Date(e.date).valueOf();
                    return Date.now() - t <= 2592e6
                })), this._storage.overwrite(this._heartbeatsCache)
            }
            async getHeartbeatsHeader() {
                if (null === this._heartbeatsCache && await this._heartbeatsCachePromise, null === this._heartbeatsCache || 0 === this._heartbeatsCache.heartbeats.length) return "";
                const e = ve(),
                    {
                        heartbeatsToSend: t,
                        unsentEntries: n
                    } = function(e, t = 1024) {
                        const n = [];
                        let r = e.slice();
                        for (const i of e) {
                            const e = n.find((e => e.agent === i.agent));
                            if (e) {
                                if (e.dates.push(i.date), ye(n) > t) {
                                    e.dates.pop();
                                    break
                                }
                            } else if (n.push({
                                    agent: i.agent,
                                    dates: [i.date]
                                }), ye(n) > t) {
                                n.pop();
                                break
                            }
                            r = r.slice(1)
                        }
                        return {
                            heartbeatsToSend: n,
                            unsentEntries: r
                        }
                    }(this._heartbeatsCache.heartbeats),
                    i = r(JSON.stringify({
                        version: 2,
                        heartbeats: t
                    }));
                return this._heartbeatsCache.lastSentHeartbeatDate = e, n.length > 0 ? (this._heartbeatsCache.heartbeats = n, await this._storage.overwrite(this._heartbeatsCache)) : (this._heartbeatsCache.heartbeats = [], this._storage.overwrite(this._heartbeatsCache)), i
            }
        }

        function ve() {
            return (new Date).toISOString().substring(0, 10)
        }
        class _e {
            constructor(e) {
                this.app = e, this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck()
            }
            async runIndexedDBEnvironmentCheck() {
                return "object" == typeof indexedDB && new Promise(((e, t) => {
                    try {
                        let n = !0;
                        const r = "validate-browser-context-for-indexeddb-analytics-module",
                            i = self.indexedDB.open(r);
                        i.onsuccess = () => {
                            i.result.close(), n || self.indexedDB.deleteDatabase(r), e(!0)
                        }, i.onupgradeneeded = () => {
                            n = !1
                        }, i.onerror = () => {
                            var e;
                            t((null === (e = i.error) || void 0 === e ? void 0 : e.message) || "")
                        }
                    } catch (e) {
                        t(e)
                    }
                })).then((() => !0)).catch((() => !1))
            }
            async read() {
                if (await this._canUseIndexedDBPromise) {
                    return await async function(e) {
                        var t;
                        try {
                            return (await pe()).transaction(he).objectStore(he).get(me(e))
                        } catch (e) {
                            if (e instanceof h) Q.warn(e.message);
                            else {
                                const n = oe.create("idb-get", {
                                    originalErrorMessage: null === (t = e) || void 0 === t ? void 0 : t.message
                                });
                                Q.warn(n.message)
                            }
                        }
                    }(this.app) || {
                        heartbeats: []
                    }
                }
                return {
                    heartbeats: []
                }
            }
            async overwrite(e) {
                var t;
                if (await this._canUseIndexedDBPromise) {
                    const n = await this.read();
                    return fe(this.app, {
                        lastSentHeartbeatDate: null !== (t = e.lastSentHeartbeatDate) && void 0 !== t ? t : n.lastSentHeartbeatDate,
                        heartbeats: e.heartbeats
                    })
                }
            }
            async add(e) {
                var t;
                if (await this._canUseIndexedDBPromise) {
                    const n = await this.read();
                    return fe(this.app, {
                        lastSentHeartbeatDate: null !== (t = e.lastSentHeartbeatDate) && void 0 !== t ? t : n.lastSentHeartbeatDate,
                        heartbeats: [...n.heartbeats, ...e.heartbeats]
                    })
                }
            }
        }

        function ye(e) {
            return r(JSON.stringify({
                version: 2,
                heartbeats: e
            })).length
        }
        var Ie;
        Ie = "", ie(new w("platform-logger", (e => new J(e)), "PRIVATE")), ie(new w("heartbeat", (e => new ge(e)), "PRIVATE")), ue(X, Y, Ie), ue(X, Y, "esm2017"), ue("fire-js", "");
        ue("firebase", "9.14.0", "app");

        function be(e, t) {
            var n = {};
            for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                var i = 0;
                for (r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]])
            }
            return n
        }
        Object.create;
        Object.create;

        function we() {
            return {
                "dependent-sdk-initialized-before-auth": "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."
            }
        }
        const Te = we,
            Ee = new d("auth", "Firebase", {
                "dependent-sdk-initialized-before-auth": "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."
            }),
            ke = new D("@firebase/auth");

        function Se(e, ...t) {
            ke.logLevel <= O.ERROR && ke.error(`Auth (9.14.0): ${e}`, ...t)
        }

        function Oe(e, ...t) {
            throw Ne(e, ...t)
        }

        function Re(e, ...t) {
            return Ne(e, ...t)
        }

        function Ce(e, t, n) {
            const r = Object.assign(Object.assign({}, Te()), {
                [t]: n
            });
            return new d("auth", "Firebase", r).create(t, {
                appName: e.name
            })
        }

        function Ae(e, t, n) {
            if (!(t instanceof n)) throw n.name !== t.constructor.name && Oe(e, "argument-error"), Ce(e, "argument-error", `Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)
        }

        function Ne(e, ...t) {
            if ("string" != typeof e) {
                const n = t[0],
                    r = [...t.slice(1)];
                return r[0] && (r[0].appName = e.name), e._errorFactory.create(n, ...r)
            }
            return Ee.create(e, ...t)
        }

        function De(e, t, ...n) {
            if (!e) throw Ne(t, ...n)
        }

        function Pe(e) {
            const t = "INTERNAL ASSERTION FAILED: " + e;
            throw Se(t), new Error(t)
        }

        function Le(e, t) {
            e || Pe(t)
        }
        const Me = new Map;

        function Ue(e) {
            Le(e instanceof Function, "Expected a class definition");
            let t = Me.get(e);
            return t ? (Le(t instanceof e, "Instance stored in cache mismatched with class"), t) : (t = new e, Me.set(e, t), t)
        }

        function xe() {
            var e;
            return "undefined" != typeof self && (null === (e = self.location) || void 0 === e ? void 0 : e.href) || ""
        }

        function Fe() {
            return "http:" === je() || "https:" === je()
        }

        function je() {
            var e;
            return "undefined" != typeof self && (null === (e = self.location) || void 0 === e ? void 0 : e.protocol) || null
        }

        function Ve() {
            return !("undefined" != typeof navigator && navigator && "onLine" in navigator && "boolean" == typeof navigator.onLine && (Fe() || function() {
                const e = "object" == typeof chrome ? chrome.runtime : "object" == typeof browser ? browser.runtime : void 0;
                return "object" == typeof e && void 0 !== e.id
            }() || "connection" in navigator)) || navigator.onLine
        }
        class He {
            constructor(e, t) {
                this.shortDelay = e, this.longDelay = t, Le(t > e, "Short delay should be less than long delay!"), this.isMobile = "undefined" != typeof window && !!(window.cordova || window.phonegap || window.PhoneGap) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(s()) || "object" == typeof navigator && "ReactNative" === navigator.product
            }
            get() {
                return Ve() ? this.isMobile ? this.longDelay : this.shortDelay : Math.min(5e3, this.shortDelay)
            }
        }

        function Be(e, t) {
            Le(e.emulator, "Emulator should always be set here");
            const {
                url: n
            } = e.emulator;
            return t ? `${n}${t.startsWith("/")?t.slice(1):t}` : n
        }
        class ze {
            static initialize(e, t, n) {
                this.fetchImpl = e, t && (this.headersImpl = t), n && (this.responseImpl = n)
            }
            static fetch() {
                return this.fetchImpl ? this.fetchImpl : "undefined" != typeof self && "fetch" in self ? self.fetch : void Pe("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")
            }
            static headers() {
                return this.headersImpl ? this.headersImpl : "undefined" != typeof self && "Headers" in self ? self.Headers : void Pe("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")
            }
            static response() {
                return this.responseImpl ? this.responseImpl : "undefined" != typeof self && "Response" in self ? self.Response : void Pe("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")
            }
        }
        const We = {
                CREDENTIAL_MISMATCH: "custom-token-mismatch",
                MISSING_CUSTOM_TOKEN: "internal-error",
                INVALID_IDENTIFIER: "invalid-email",
                MISSING_CONTINUE_URI: "internal-error",
                INVALID_PASSWORD: "wrong-password",
                MISSING_PASSWORD: "internal-error",
                EMAIL_EXISTS: "email-already-in-use",
                PASSWORD_LOGIN_DISABLED: "operation-not-allowed",
                INVALID_IDP_RESPONSE: "invalid-credential",
                INVALID_PENDING_TOKEN: "invalid-credential",
                FEDERATED_USER_ID_ALREADY_LINKED: "credential-already-in-use",
                MISSING_REQ_TYPE: "internal-error",
                EMAIL_NOT_FOUND: "user-not-found",
                RESET_PASSWORD_EXCEED_LIMIT: "too-many-requests",
                EXPIRED_OOB_CODE: "expired-action-code",
                INVALID_OOB_CODE: "invalid-action-code",
                MISSING_OOB_CODE: "internal-error",
                CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "requires-recent-login",
                INVALID_ID_TOKEN: "invalid-user-token",
                TOKEN_EXPIRED: "user-token-expired",
                USER_NOT_FOUND: "user-token-expired",
                TOO_MANY_ATTEMPTS_TRY_LATER: "too-many-requests",
                INVALID_CODE: "invalid-verification-code",
                INVALID_SESSION_INFO: "invalid-verification-id",
                INVALID_TEMPORARY_PROOF: "invalid-credential",
                MISSING_SESSION_INFO: "missing-verification-id",
                SESSION_EXPIRED: "code-expired",
                MISSING_ANDROID_PACKAGE_NAME: "missing-android-pkg-name",
                UNAUTHORIZED_DOMAIN: "unauthorized-continue-uri",
                INVALID_OAUTH_CLIENT_ID: "invalid-oauth-client-id",
                ADMIN_ONLY_OPERATION: "admin-restricted-operation",
                INVALID_MFA_PENDING_CREDENTIAL: "invalid-multi-factor-session",
                MFA_ENROLLMENT_NOT_FOUND: "multi-factor-info-not-found",
                MISSING_MFA_ENROLLMENT_ID: "missing-multi-factor-info",
                MISSING_MFA_PENDING_CREDENTIAL: "missing-multi-factor-session",
                SECOND_FACTOR_EXISTS: "second-factor-already-in-use",
                SECOND_FACTOR_LIMIT_EXCEEDED: "maximum-second-factor-count-exceeded",
                BLOCKING_FUNCTION_ERROR_RESPONSE: "internal-error"
            },
            $e = new He(3e4, 6e4);

        function qe(e, t) {
            return e.tenantId && !t.tenantId ? Object.assign(Object.assign({}, t), {
                tenantId: e.tenantId
            }) : t
        }
        async function Ge(e, t, n, r, i = {}) {
            return Ke(e, i, (async () => {
                let i = {},
                    s = {};
                r && ("GET" === t ? s = r : i = {
                    body: JSON.stringify(r)
                });
                const o = g(Object.assign({
                        key: e.config.apiKey
                    }, s)).slice(1),
                    a = await e._getAdditionalHeaders();
                return a["Content-Type"] = "application/json", e.languageCode && (a["X-Firebase-Locale"] = e.languageCode), ze.fetch()(Xe(e, e.config.apiHost, n, o), Object.assign({
                    method: t,
                    headers: a,
                    referrerPolicy: "no-referrer"
                }, i))
            }))
        }
        async function Ke(e, t, n) {
            e._canInitEmulator = !1;
            const r = Object.assign(Object.assign({}, We), t);
            try {
                const t = new Ye(e),
                    i = await Promise.race([n(), t.promise]);
                t.clearNetworkTimeout();
                const s = await i.json();
                if ("needConfirmation" in s) throw Qe(e, "account-exists-with-different-credential", s);
                if (i.ok && !("errorMessage" in s)) return s;
                {
                    const t = i.ok ? s.errorMessage : s.error.message,
                        [n, o] = t.split(" : ");
                    if ("FEDERATED_USER_ID_ALREADY_LINKED" === n) throw Qe(e, "credential-already-in-use", s);
                    if ("EMAIL_EXISTS" === n) throw Qe(e, "email-already-in-use", s);
                    if ("USER_DISABLED" === n) throw Qe(e, "user-disabled", s);
                    const a = r[n] || n.toLowerCase().replace(/[_\s]+/g, "-");
                    if (o) throw Ce(e, a, o);
                    Oe(e, a)
                }
            } catch (t) {
                if (t instanceof h) throw t;
                Oe(e, "network-request-failed")
            }
        }
        async function Je(e, t, n, r, i = {}) {
            const s = await Ge(e, t, n, r, i);
            return "mfaPendingCredential" in s && Oe(e, "multi-factor-auth-required", {
                _serverResponse: s
            }), s
        }

        function Xe(e, t, n, r) {
            const i = `${t}${n}?${r}`;
            return e.config.emulator ? Be(e.config, i) : `${e.config.apiScheme}://${i}`
        }
        class Ye {
            constructor(e) {
                this.auth = e, this.timer = null, this.promise = new Promise(((e, t) => {
                    this.timer = setTimeout((() => t(Re(this.auth, "network-request-failed"))), $e.get())
                }))
            }
            clearNetworkTimeout() {
                clearTimeout(this.timer)
            }
        }

        function Qe(e, t, n) {
            const r = {
                appName: e.name
            };
            n.email && (r.email = n.email), n.phoneNumber && (r.phoneNumber = n.phoneNumber);
            const i = Re(e, t, r);
            return i.customData._tokenResponse = n, i
        }

        function Ze(e) {
            if (e) try {
                const t = new Date(Number(e));
                if (!isNaN(t.getTime())) return t.toUTCString()
            } catch (e) {}
        }

        function et(e) {
            return 1e3 * Number(e)
        }

        function tt(e) {
            var t;
            const [n, r, s] = e.split(".");
            if (void 0 === n || void 0 === r || void 0 === s) return Se("JWT malformed, contained fewer than 3 sections"), null;
            try {
                const e = i(r);
                return e ? JSON.parse(e) : (Se("Failed to decode base64 JWT payload"), null)
            } catch (e) {
                return Se("Caught error parsing JWT payload as JSON", null === (t = e) || void 0 === t ? void 0 : t.toString()), null
            }
        }
        async function nt(e, t, n = !1) {
            if (n) return t;
            try {
                return await t
            } catch (t) {
                throw t instanceof h && function({
                    code: e
                }) {
                    return "auth/user-disabled" === e || "auth/user-token-expired" === e
                }(t) && e.auth.currentUser === e && await e.auth.signOut(), t
            }
        }
        class rt {
            constructor(e) {
                this.user = e, this.isRunning = !1, this.timerId = null, this.errorBackoff = 3e4
            }
            _start() {
                this.isRunning || (this.isRunning = !0, this.schedule())
            }
            _stop() {
                this.isRunning && (this.isRunning = !1, null !== this.timerId && clearTimeout(this.timerId))
            }
            getInterval(e) {
                var t;
                if (e) {
                    const e = this.errorBackoff;
                    return this.errorBackoff = Math.min(2 * this.errorBackoff, 96e4), e
                } {
                    this.errorBackoff = 3e4;
                    const e = (null !== (t = this.user.stsTokenManager.expirationTime) && void 0 !== t ? t : 0) - Date.now() - 3e5;
                    return Math.max(0, e)
                }
            }
            schedule(e = !1) {
                if (!this.isRunning) return;
                const t = this.getInterval(e);
                this.timerId = setTimeout((async () => {
                    await this.iteration()
                }), t)
            }
            async iteration() {
                var e;
                try {
                    await this.user.getIdToken(!0)
                } catch (t) {
                    return void("auth/network-request-failed" === (null === (e = t) || void 0 === e ? void 0 : e.code) && this.schedule(!0))
                }
                this.schedule()
            }
        }
        class it {
            constructor(e, t) {
                this.createdAt = e, this.lastLoginAt = t, this._initializeTime()
            }
            _initializeTime() {
                this.lastSignInTime = Ze(this.lastLoginAt), this.creationTime = Ze(this.createdAt)
            }
            _copy(e) {
                this.createdAt = e.createdAt, this.lastLoginAt = e.lastLoginAt, this._initializeTime()
            }
            toJSON() {
                return {
                    createdAt: this.createdAt,
                    lastLoginAt: this.lastLoginAt
                }
            }
        }
        async function st(e) {
            var t;
            const n = e.auth,
                r = await e.getIdToken(),
                i = await nt(e, async function(e, t) {
                    return Ge(e, "POST", "/v1/accounts:lookup", t)
                }(n, {
                    idToken: r
                }));
            De(null == i ? void 0 : i.users.length, n, "internal-error");
            const s = i.users[0];
            e._notifyReloadListener(s);
            const o = (null === (t = s.providerUserInfo) || void 0 === t ? void 0 : t.length) ? s.providerUserInfo.map((e => {
                var {
                    providerId: t
                } = e, n = be(e, ["providerId"]);
                return {
                    providerId: t,
                    uid: n.rawId || "",
                    displayName: n.displayName || null,
                    email: n.email || null,
                    phoneNumber: n.phoneNumber || null,
                    photoURL: n.photoUrl || null
                }
            })) : [];
            const a = (c = e.providerData, l = o, [...c.filter((e => !l.some((t => t.providerId === e.providerId)))), ...l]);
            var c, l;
            const u = e.isAnonymous,
                h = !(e.email && s.passwordHash || (null == a ? void 0 : a.length)),
                d = !!u && h,
                p = {
                    uid: s.localId,
                    displayName: s.displayName || null,
                    photoURL: s.photoUrl || null,
                    email: s.email || null,
                    emailVerified: s.emailVerified || !1,
                    phoneNumber: s.phoneNumber || null,
                    tenantId: s.tenantId || null,
                    providerData: a,
                    metadata: new it(s.createdAt, s.lastLoginAt),
                    isAnonymous: d
                };
            Object.assign(e, p)
        }
        class ot {
            constructor() {
                this.refreshToken = null, this.accessToken = null, this.expirationTime = null
            }
            get isExpired() {
                return !this.expirationTime || Date.now() > this.expirationTime - 3e4
            }
            updateFromServerResponse(e) {
                De(e.idToken, "internal-error"), De(void 0 !== e.idToken, "internal-error"), De(void 0 !== e.refreshToken, "internal-error");
                const t = "expiresIn" in e && void 0 !== e.expiresIn ? Number(e.expiresIn) : function(e) {
                    const t = tt(e);
                    return De(t, "internal-error"), De(void 0 !== t.exp, "internal-error"), De(void 0 !== t.iat, "internal-error"), Number(t.exp) - Number(t.iat)
                }(e.idToken);
                this.updateTokensAndExpiration(e.idToken, e.refreshToken, t)
            }
            async getToken(e, t = !1) {
                return De(!this.accessToken || this.refreshToken, e, "user-token-expired"), t || !this.accessToken || this.isExpired ? this.refreshToken ? (await this.refresh(e, this.refreshToken), this.accessToken) : null : this.accessToken
            }
            clearRefreshToken() {
                this.refreshToken = null
            }
            async refresh(e, t) {
                const {
                    accessToken: n,
                    refreshToken: r,
                    expiresIn: i
                } = await async function(e, t) {
                    const n = await Ke(e, {}, (async () => {
                        const n = g({
                                grant_type: "refresh_token",
                                refresh_token: t
                            }).slice(1),
                            {
                                tokenApiHost: r,
                                apiKey: i
                            } = e.config,
                            s = Xe(e, r, "/v1/token", `key=${i}`),
                            o = await e._getAdditionalHeaders();
                        return o["Content-Type"] = "application/x-www-form-urlencoded", ze.fetch()(s, {
                            method: "POST",
                            headers: o,
                            body: n
                        })
                    }));
                    return {
                        accessToken: n.access_token,
                        expiresIn: n.expires_in,
                        refreshToken: n.refresh_token
                    }
                }(e, t);
                this.updateTokensAndExpiration(n, r, Number(i))
            }
            updateTokensAndExpiration(e, t, n) {
                this.refreshToken = t || null, this.accessToken = e || null, this.expirationTime = Date.now() + 1e3 * n
            }
            static fromJSON(e, t) {
                const {
                    refreshToken: n,
                    accessToken: r,
                    expirationTime: i
                } = t, s = new ot;
                return n && (De("string" == typeof n, "internal-error", {
                    appName: e
                }), s.refreshToken = n), r && (De("string" == typeof r, "internal-error", {
                    appName: e
                }), s.accessToken = r), i && (De("number" == typeof i, "internal-error", {
                    appName: e
                }), s.expirationTime = i), s
            }
            toJSON() {
                return {
                    refreshToken: this.refreshToken,
                    accessToken: this.accessToken,
                    expirationTime: this.expirationTime
                }
            }
            _assign(e) {
                this.accessToken = e.accessToken, this.refreshToken = e.refreshToken, this.expirationTime = e.expirationTime
            }
            _clone() {
                return Object.assign(new ot, this.toJSON())
            }
            _performRefresh() {
                return Pe("not implemented")
            }
        }

        function at(e, t) {
            De("string" == typeof e || void 0 === e, "internal-error", {
                appName: t
            })
        }
        class ct {
            constructor(e) {
                var {
                    uid: t,
                    auth: n,
                    stsTokenManager: r
                } = e, i = be(e, ["uid", "auth", "stsTokenManager"]);
                this.providerId = "firebase", this.proactiveRefresh = new rt(this), this.reloadUserInfo = null, this.reloadListener = null, this.uid = t, this.auth = n, this.stsTokenManager = r, this.accessToken = r.accessToken, this.displayName = i.displayName || null, this.email = i.email || null, this.emailVerified = i.emailVerified || !1, this.phoneNumber = i.phoneNumber || null, this.photoURL = i.photoURL || null, this.isAnonymous = i.isAnonymous || !1, this.tenantId = i.tenantId || null, this.providerData = i.providerData ? [...i.providerData] : [], this.metadata = new it(i.createdAt || void 0, i.lastLoginAt || void 0)
            }
            async getIdToken(e) {
                const t = await nt(this, this.stsTokenManager.getToken(this.auth, e));
                return De(t, this.auth, "internal-error"), this.accessToken !== t && (this.accessToken = t, await this.auth._persistUserIfCurrent(this), this.auth._notifyListenersIfCurrent(this)), t
            }
            getIdTokenResult(e) {
                return async function(e, t = !1) {
                    const n = b(e),
                        r = await n.getIdToken(t),
                        i = tt(r);
                    De(i && i.exp && i.auth_time && i.iat, n.auth, "internal-error");
                    const s = "object" == typeof i.firebase ? i.firebase : void 0,
                        o = null == s ? void 0 : s.sign_in_provider;
                    return {
                        claims: i,
                        token: r,
                        authTime: Ze(et(i.auth_time)),
                        issuedAtTime: Ze(et(i.iat)),
                        expirationTime: Ze(et(i.exp)),
                        signInProvider: o || null,
                        signInSecondFactor: (null == s ? void 0 : s.sign_in_second_factor) || null
                    }
                }(this, e)
            }
            reload() {
                return async function(e) {
                    const t = b(e);
                    await st(t), await t.auth._persistUserIfCurrent(t), t.auth._notifyListenersIfCurrent(t)
                }(this)
            }
            _assign(e) {
                this !== e && (De(this.uid === e.uid, this.auth, "internal-error"), this.displayName = e.displayName, this.photoURL = e.photoURL, this.email = e.email, this.emailVerified = e.emailVerified, this.phoneNumber = e.phoneNumber, this.isAnonymous = e.isAnonymous, this.tenantId = e.tenantId, this.providerData = e.providerData.map((e => Object.assign({}, e))), this.metadata._copy(e.metadata), this.stsTokenManager._assign(e.stsTokenManager))
            }
            _clone(e) {
                return new ct(Object.assign(Object.assign({}, this), {
                    auth: e,
                    stsTokenManager: this.stsTokenManager._clone()
                }))
            }
            _onReload(e) {
                De(!this.reloadListener, this.auth, "internal-error"), this.reloadListener = e, this.reloadUserInfo && (this._notifyReloadListener(this.reloadUserInfo), this.reloadUserInfo = null)
            }
            _notifyReloadListener(e) {
                this.reloadListener ? this.reloadListener(e) : this.reloadUserInfo = e
            }
            _startProactiveRefresh() {
                this.proactiveRefresh._start()
            }
            _stopProactiveRefresh() {
                this.proactiveRefresh._stop()
            }
            async _updateTokensIfNecessary(e, t = !1) {
                let n = !1;
                e.idToken && e.idToken !== this.stsTokenManager.accessToken && (this.stsTokenManager.updateFromServerResponse(e), n = !0), t && await st(this), await this.auth._persistUserIfCurrent(this), n && this.auth._notifyListenersIfCurrent(this)
            }
            async delete() {
                const e = await this.getIdToken();
                return await nt(this, async function(e, t) {
                    return Ge(e, "POST", "/v1/accounts:delete", t)
                }(this.auth, {
                    idToken: e
                })), this.stsTokenManager.clearRefreshToken(), this.auth.signOut()
            }
            toJSON() {
                return Object.assign(Object.assign({
                    uid: this.uid,
                    email: this.email || void 0,
                    emailVerified: this.emailVerified,
                    displayName: this.displayName || void 0,
                    isAnonymous: this.isAnonymous,
                    photoURL: this.photoURL || void 0,
                    phoneNumber: this.phoneNumber || void 0,
                    tenantId: this.tenantId || void 0,
                    providerData: this.providerData.map((e => Object.assign({}, e))),
                    stsTokenManager: this.stsTokenManager.toJSON(),
                    _redirectEventId: this._redirectEventId
                }, this.metadata.toJSON()), {
                    apiKey: this.auth.config.apiKey,
                    appName: this.auth.name
                })
            }
            get refreshToken() {
                return this.stsTokenManager.refreshToken || ""
            }
            static _fromJSON(e, t) {
                var n, r, i, s, o, a, c, l;
                const u = null !== (n = t.displayName) && void 0 !== n ? n : void 0,
                    h = null !== (r = t.email) && void 0 !== r ? r : void 0,
                    d = null !== (i = t.phoneNumber) && void 0 !== i ? i : void 0,
                    p = null !== (s = t.photoURL) && void 0 !== s ? s : void 0,
                    f = null !== (o = t.tenantId) && void 0 !== o ? o : void 0,
                    m = null !== (a = t._redirectEventId) && void 0 !== a ? a : void 0,
                    g = null !== (c = t.createdAt) && void 0 !== c ? c : void 0,
                    v = null !== (l = t.lastLoginAt) && void 0 !== l ? l : void 0,
                    {
                        uid: _,
                        emailVerified: y,
                        isAnonymous: I,
                        providerData: b,
                        stsTokenManager: w
                    } = t;
                De(_ && w, e, "internal-error");
                const T = ot.fromJSON(this.name, w);
                De("string" == typeof _, e, "internal-error"), at(u, e.name), at(h, e.name), De("boolean" == typeof y, e, "internal-error"), De("boolean" == typeof I, e, "internal-error"), at(d, e.name), at(p, e.name), at(f, e.name), at(m, e.name), at(g, e.name), at(v, e.name);
                const E = new ct({
                    uid: _,
                    auth: e,
                    email: h,
                    emailVerified: y,
                    displayName: u,
                    isAnonymous: I,
                    photoURL: p,
                    phoneNumber: d,
                    tenantId: f,
                    stsTokenManager: T,
                    createdAt: g,
                    lastLoginAt: v
                });
                return b && Array.isArray(b) && (E.providerData = b.map((e => Object.assign({}, e)))), m && (E._redirectEventId = m), E
            }
            static async _fromIdTokenResponse(e, t, n = !1) {
                const r = new ot;
                r.updateFromServerResponse(t);
                const i = new ct({
                    uid: t.localId,
                    auth: e,
                    stsTokenManager: r,
                    isAnonymous: n
                });
                return await st(i), i
            }
        }
        class lt {
            constructor() {
                this.type = "NONE", this.storage = {}
            }
            async _isAvailable() {
                return !0
            }
            async _set(e, t) {
                this.storage[e] = t
            }
            async _get(e) {
                const t = this.storage[e];
                return void 0 === t ? null : t
            }
            async _remove(e) {
                delete this.storage[e]
            }
            _addListener(e, t) {}
            _removeListener(e, t) {}
        }
        lt.type = "NONE";
        const ut = lt;

        function ht(e, t, n) {
            return `firebase:${e}:${t}:${n}`
        }
        class dt {
            constructor(e, t, n) {
                this.persistence = e, this.auth = t, this.userKey = n;
                const {
                    config: r,
                    name: i
                } = this.auth;
                this.fullUserKey = ht(this.userKey, r.apiKey, i), this.fullPersistenceKey = ht("persistence", r.apiKey, i), this.boundEventHandler = t._onStorageEvent.bind(t), this.persistence._addListener(this.fullUserKey, this.boundEventHandler)
            }
            setCurrentUser(e) {
                return this.persistence._set(this.fullUserKey, e.toJSON())
            }
            async getCurrentUser() {
                const e = await this.persistence._get(this.fullUserKey);
                return e ? ct._fromJSON(this.auth, e) : null
            }
            removeCurrentUser() {
                return this.persistence._remove(this.fullUserKey)
            }
            savePersistenceForRedirect() {
                return this.persistence._set(this.fullPersistenceKey, this.persistence.type)
            }
            async setPersistence(e) {
                if (this.persistence === e) return;
                const t = await this.getCurrentUser();
                return await this.removeCurrentUser(), this.persistence = e, t ? this.setCurrentUser(t) : void 0
            }
            delete() {
                this.persistence._removeListener(this.fullUserKey, this.boundEventHandler)
            }
            static async create(e, t, n = "authUser") {
                if (!t.length) return new dt(Ue(ut), e, n);
                const r = (await Promise.all(t.map((async e => {
                    if (await e._isAvailable()) return e
                })))).filter((e => e));
                let i = r[0] || Ue(ut);
                const s = ht(n, e.config.apiKey, e.name);
                let o = null;
                for (const n of t) try {
                    const t = await n._get(s);
                    if (t) {
                        const r = ct._fromJSON(e, t);
                        n !== i && (o = r), i = n;
                        break
                    }
                } catch (e) {}
                const a = r.filter((e => e._shouldAllowMigration));
                return i._shouldAllowMigration && a.length ? (i = a[0], o && await i._set(s, o.toJSON()), await Promise.all(t.map((async e => {
                    if (e !== i) try {
                        await e._remove(s)
                    } catch (e) {}
                }))), new dt(i, e, n)) : new dt(i, e, n)
            }
        }

        function pt(e) {
            const t = e.toLowerCase();
            if (t.includes("opera/") || t.includes("opr/") || t.includes("opios/")) return "Opera";
            if (vt(t)) return "IEMobile";
            if (t.includes("msie") || t.includes("trident/")) return "IE";
            if (t.includes("edge/")) return "Edge";
            if (ft(t)) return "Firefox";
            if (t.includes("silk/")) return "Silk";
            if (yt(t)) return "Blackberry";
            if (It(t)) return "Webos";
            if (mt(t)) return "Safari";
            if ((t.includes("chrome/") || gt(t)) && !t.includes("edge/")) return "Chrome";
            if (_t(t)) return "Android";
            {
                const t = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,
                    n = e.match(t);
                if (2 === (null == n ? void 0 : n.length)) return n[1]
            }
            return "Other"
        }

        function ft(e = s()) {
            return /firefox\//i.test(e)
        }

        function mt(e = s()) {
            const t = e.toLowerCase();
            return t.includes("safari/") && !t.includes("chrome/") && !t.includes("crios/") && !t.includes("android")
        }

        function gt(e = s()) {
            return /crios\//i.test(e)
        }

        function vt(e = s()) {
            return /iemobile/i.test(e)
        }

        function _t(e = s()) {
            return /android/i.test(e)
        }

        function yt(e = s()) {
            return /blackberry/i.test(e)
        }

        function It(e = s()) {
            return /webos/i.test(e)
        }

        function bt(e = s()) {
            return /iphone|ipad|ipod/i.test(e) || /macintosh/i.test(e) && /mobile/i.test(e)
        }

        function wt() {
            return function() {
                const e = s();
                return e.indexOf("MSIE ") >= 0 || e.indexOf("Trident/") >= 0
            }() && 10 === document.documentMode
        }

        function Tt(e = s()) {
            return bt(e) || _t(e) || It(e) || yt(e) || /windows phone/i.test(e) || vt(e)
        }

        function Et(e, t = []) {
            let n;
            switch (e) {
                case "Browser":
                    n = pt(s());
                    break;
                case "Worker":
                    n = `${pt(s())}-${e}`;
                    break;
                default:
                    n = e
            }
            return `${n}/JsCore/9.14.0/${t.length?t.join(","):"FirebaseCore-web"}`
        }
        class kt {
            constructor(e) {
                this.auth = e, this.queue = []
            }
            pushCallback(e, t) {
                const n = t => new Promise(((n, r) => {
                    try {
                        n(e(t))
                    } catch (e) {
                        r(e)
                    }
                }));
                n.onAbort = t, this.queue.push(n);
                const r = this.queue.length - 1;
                return () => {
                    this.queue[r] = () => Promise.resolve()
                }
            }
            async runMiddleware(e) {
                var t;
                if (this.auth.currentUser === e) return;
                const n = [];
                try {
                    for (const t of this.queue) await t(e), t.onAbort && n.push(t.onAbort)
                } catch (e) {
                    n.reverse();
                    for (const e of n) try {
                        e()
                    } catch (e) {}
                    throw this.auth._errorFactory.create("login-blocked", {
                        originalMessage: null === (t = e) || void 0 === t ? void 0 : t.message
                    })
                }
            }
        }
        class St {
            constructor(e, t, n) {
                this.app = e, this.heartbeatServiceProvider = t, this.config = n, this.currentUser = null, this.emulatorConfig = null, this.operations = Promise.resolve(), this.authStateSubscription = new Rt(this), this.idTokenSubscription = new Rt(this), this.beforeStateQueue = new kt(this), this.redirectUser = null, this.isProactiveRefreshEnabled = !1, this._canInitEmulator = !0, this._isInitialized = !1, this._deleted = !1, this._initializationPromise = null, this._popupRedirectResolver = null, this._errorFactory = Ee, this.lastNotifiedUid = void 0, this.languageCode = null, this.tenantId = null, this.settings = {
                    appVerificationDisabledForTesting: !1
                }, this.frameworks = [], this.name = e.name, this.clientVersion = n.sdkClientVersion
            }
            _initializeWithPersistence(e, t) {
                return t && (this._popupRedirectResolver = Ue(t)), this._initializationPromise = this.queue((async () => {
                    var n, r;
                    if (!this._deleted && (this.persistenceManager = await dt.create(this, e), !this._deleted)) {
                        if (null === (n = this._popupRedirectResolver) || void 0 === n ? void 0 : n._shouldInitProactively) try {
                            await this._popupRedirectResolver._initialize(this)
                        } catch (e) {}
                        await this.initializeCurrentUser(t), this.lastNotifiedUid = (null === (r = this.currentUser) || void 0 === r ? void 0 : r.uid) || null, this._deleted || (this._isInitialized = !0)
                    }
                })), this._initializationPromise
            }
            async _onStorageEvent() {
                if (this._deleted) return;
                const e = await this.assertedPersistence.getCurrentUser();
                return this.currentUser || e ? this.currentUser && e && this.currentUser.uid === e.uid ? (this._currentUser._assign(e), void await this.currentUser.getIdToken()) : void await this._updateCurrentUser(e, !0) : void 0
            }
            async initializeCurrentUser(e) {
                var t;
                const n = await this.assertedPersistence.getCurrentUser();
                let r = n,
                    i = !1;
                if (e && this.config.authDomain) {
                    await this.getOrInitRedirectPersistenceManager();
                    const n = null === (t = this.redirectUser) || void 0 === t ? void 0 : t._redirectEventId,
                        s = null == r ? void 0 : r._redirectEventId,
                        o = await this.tryRedirectSignIn(e);
                    n && n !== s || !(null == o ? void 0 : o.user) || (r = o.user, i = !0)
                }
                if (!r) return this.directlySetCurrentUser(null);
                if (!r._redirectEventId) {
                    if (i) try {
                        await this.beforeStateQueue.runMiddleware(r)
                    } catch (e) {
                        r = n, this._popupRedirectResolver._overrideRedirectResult(this, (() => Promise.reject(e)))
                    }
                    return r ? this.reloadAndSetCurrentUserOrClear(r) : this.directlySetCurrentUser(null)
                }
                return De(this._popupRedirectResolver, this, "argument-error"), await this.getOrInitRedirectPersistenceManager(), this.redirectUser && this.redirectUser._redirectEventId === r._redirectEventId ? this.directlySetCurrentUser(r) : this.reloadAndSetCurrentUserOrClear(r)
            }
            async tryRedirectSignIn(e) {
                let t = null;
                try {
                    t = await this._popupRedirectResolver._completeRedirectFn(this, e, !0)
                } catch (e) {
                    await this._setRedirectUser(null)
                }
                return t
            }
            async reloadAndSetCurrentUserOrClear(e) {
                var t;
                try {
                    await st(e)
                } catch (e) {
                    if ("auth/network-request-failed" !== (null === (t = e) || void 0 === t ? void 0 : t.code)) return this.directlySetCurrentUser(null)
                }
                return this.directlySetCurrentUser(e)
            }
            useDeviceLanguage() {
                this.languageCode = function() {
                    if ("undefined" == typeof navigator) return null;
                    const e = navigator;
                    return e.languages && e.languages[0] || e.language || null
                }()
            }
            async _delete() {
                this._deleted = !0
            }
            async updateCurrentUser(e) {
                const t = e ? b(e) : null;
                return t && De(t.auth.config.apiKey === this.config.apiKey, this, "invalid-user-token"), this._updateCurrentUser(t && t._clone(this))
            }
            async _updateCurrentUser(e, t = !1) {
                if (!this._deleted) return e && De(this.tenantId === e.tenantId, this, "tenant-id-mismatch"), t || await this.beforeStateQueue.runMiddleware(e), this.queue((async () => {
                    await this.directlySetCurrentUser(e), this.notifyAuthListeners()
                }))
            }
            async signOut() {
                return await this.beforeStateQueue.runMiddleware(null), (this.redirectPersistenceManager || this._popupRedirectResolver) && await this._setRedirectUser(null), this._updateCurrentUser(null, !0)
            }
            setPersistence(e) {
                return this.queue((async () => {
                    await this.assertedPersistence.setPersistence(Ue(e))
                }))
            }
            _getPersistence() {
                return this.assertedPersistence.persistence.type
            }
            _updateErrorMap(e) {
                this._errorFactory = new d("auth", "Firebase", e())
            }
            onAuthStateChanged(e, t, n) {
                return this.registerStateListener(this.authStateSubscription, e, t, n)
            }
            beforeAuthStateChanged(e, t) {
                return this.beforeStateQueue.pushCallback(e, t)
            }
            onIdTokenChanged(e, t, n) {
                return this.registerStateListener(this.idTokenSubscription, e, t, n)
            }
            toJSON() {
                var e;
                return {
                    apiKey: this.config.apiKey,
                    authDomain: this.config.authDomain,
                    appName: this.name,
                    currentUser: null === (e = this._currentUser) || void 0 === e ? void 0 : e.toJSON()
                }
            }
            async _setRedirectUser(e, t) {
                const n = await this.getOrInitRedirectPersistenceManager(t);
                return null === e ? n.removeCurrentUser() : n.setCurrentUser(e)
            }
            async getOrInitRedirectPersistenceManager(e) {
                if (!this.redirectPersistenceManager) {
                    const t = e && Ue(e) || this._popupRedirectResolver;
                    De(t, this, "argument-error"), this.redirectPersistenceManager = await dt.create(this, [Ue(t._redirectPersistence)], "redirectUser"), this.redirectUser = await this.redirectPersistenceManager.getCurrentUser()
                }
                return this.redirectPersistenceManager
            }
            async _redirectUserForId(e) {
                var t, n;
                return this._isInitialized && await this.queue((async () => {})), (null === (t = this._currentUser) || void 0 === t ? void 0 : t._redirectEventId) === e ? this._currentUser : (null === (n = this.redirectUser) || void 0 === n ? void 0 : n._redirectEventId) === e ? this.redirectUser : null
            }
            async _persistUserIfCurrent(e) {
                if (e === this.currentUser) return this.queue((async () => this.directlySetCurrentUser(e)))
            }
            _notifyListenersIfCurrent(e) {
                e === this.currentUser && this.notifyAuthListeners()
            }
            _key() {
                return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`
            }
            _startProactiveRefresh() {
                this.isProactiveRefreshEnabled = !0, this.currentUser && this._currentUser._startProactiveRefresh()
            }
            _stopProactiveRefresh() {
                this.isProactiveRefreshEnabled = !1, this.currentUser && this._currentUser._stopProactiveRefresh()
            }
            get _currentUser() {
                return this.currentUser
            }
            notifyAuthListeners() {
                var e, t;
                if (!this._isInitialized) return;
                this.idTokenSubscription.next(this.currentUser);
                const n = null !== (t = null === (e = this.currentUser) || void 0 === e ? void 0 : e.uid) && void 0 !== t ? t : null;
                this.lastNotifiedUid !== n && (this.lastNotifiedUid = n, this.authStateSubscription.next(this.currentUser))
            }
            registerStateListener(e, t, n, r) {
                if (this._deleted) return () => {};
                const i = "function" == typeof t ? t : t.next.bind(t),
                    s = this._isInitialized ? Promise.resolve() : this._initializationPromise;
                return De(s, this, "internal-error"), s.then((() => i(this.currentUser))), "function" == typeof t ? e.addObserver(t, n, r) : e.addObserver(t)
            }
            async directlySetCurrentUser(e) {
                this.currentUser && this.currentUser !== e && this._currentUser._stopProactiveRefresh(), e && this.isProactiveRefreshEnabled && e._startProactiveRefresh(), this.currentUser = e, e ? await this.assertedPersistence.setCurrentUser(e) : await this.assertedPersistence.removeCurrentUser()
            }
            queue(e) {
                return this.operations = this.operations.then(e, e), this.operations
            }
            get assertedPersistence() {
                return De(this.persistenceManager, this, "internal-error"), this.persistenceManager
            }
            _logFramework(e) {
                e && !this.frameworks.includes(e) && (this.frameworks.push(e), this.frameworks.sort(), this.clientVersion = Et(this.config.clientPlatform, this._getFrameworks()))
            }
            _getFrameworks() {
                return this.frameworks
            }
            async _getAdditionalHeaders() {
                var e;
                const t = {
                    "X-Client-Version": this.clientVersion
                };
                this.app.options.appId && (t["X-Firebase-gmpid"] = this.app.options.appId);
                const n = await (null === (e = this.heartbeatServiceProvider.getImmediate({
                    optional: !0
                })) || void 0 === e ? void 0 : e.getHeartbeatsHeader());
                return n && (t["X-Firebase-Client"] = n), t
            }
        }

        function Ot(e) {
            return b(e)
        }
        class Rt {
            constructor(e) {
                this.auth = e, this.observer = null, this.addObserver = function(e, t) {
                    const n = new y(e, t);
                    return n.subscribe.bind(n)
                }((e => this.observer = e))
            }
            get next() {
                return De(this.observer, this.auth, "internal-error"), this.observer.next.bind(this.observer)
            }
        }

        function Ct(e, t, n) {
            const r = Ot(e);
            De(r._canInitEmulator, r, "emulator-config-failed"), De(/^https?:\/\//.test(t), r, "invalid-emulator-scheme");
            const i = !!(null == n ? void 0 : n.disableWarnings),
                s = At(t),
                {
                    host: o,
                    port: a
                } = function(e) {
                    const t = At(e),
                        n = /(\/\/)?([^?#/]+)/.exec(e.substr(t.length));
                    if (!n) return {
                        host: "",
                        port: null
                    };
                    const r = n[2].split("@").pop() || "",
                        i = /^(\[[^\]]+\])(:|$)/.exec(r);
                    if (i) {
                        const e = i[1];
                        return {
                            host: e,
                            port: Nt(r.substr(e.length + 1))
                        }
                    } {
                        const [e, t] = r.split(":");
                        return {
                            host: e,
                            port: Nt(t)
                        }
                    }
                }(t),
                c = null === a ? "" : `:${a}`;
            r.config.emulator = {
                url: `${s}//${o}${c}/`
            }, r.settings.appVerificationDisabledForTesting = !0, r.emulatorConfig = Object.freeze({
                host: o,
                port: a,
                protocol: s.replace(":", ""),
                options: Object.freeze({
                    disableWarnings: i
                })
            }), i || function() {
                function e() {
                    const e = document.createElement("p"),
                        t = e.style;
                    e.innerText = "Running in emulator mode. Do not use with production credentials.", t.position = "fixed", t.width = "100%", t.backgroundColor = "#ffffff", t.border = ".1em solid #000000", t.color = "#b50000", t.bottom = "0px", t.left = "0px", t.margin = "0px", t.zIndex = "10000", t.textAlign = "center", e.classList.add("firebase-emulator-warning"), document.body.appendChild(e)
                }
                "undefined" != typeof console && "function" == typeof console.info && console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.");
                "undefined" != typeof window && "undefined" != typeof document && ("loading" === document.readyState ? window.addEventListener("DOMContentLoaded", e) : e())
            }()
        }

        function At(e) {
            const t = e.indexOf(":");
            return t < 0 ? "" : e.substr(0, t + 1)
        }

        function Nt(e) {
            if (!e) return null;
            const t = Number(e);
            return isNaN(t) ? null : t
        }
        class Dt {
            constructor(e, t) {
                this.providerId = e, this.signInMethod = t
            }
            toJSON() {
                return Pe("not implemented")
            }
            _getIdTokenResponse(e) {
                return Pe("not implemented")
            }
            _linkToIdToken(e, t) {
                return Pe("not implemented")
            }
            _getReauthenticationResolver(e) {
                return Pe("not implemented")
            }
        }
        async function Pt(e, t) {
            return Ge(e, "POST", "/v1/accounts:update", t)
        }
        class Lt extends Dt {
            constructor(e, t, n, r = null) {
                super("password", n), this._email = e, this._password = t, this._tenantId = r
            }
            static _fromEmailAndPassword(e, t) {
                return new Lt(e, t, "password")
            }
            static _fromEmailAndCode(e, t, n = null) {
                return new Lt(e, t, "emailLink", n)
            }
            toJSON() {
                return {
                    email: this._email,
                    password: this._password,
                    signInMethod: this.signInMethod,
                    tenantId: this._tenantId
                }
            }
            static fromJSON(e) {
                const t = "string" == typeof e ? JSON.parse(e) : e;
                if ((null == t ? void 0 : t.email) && (null == t ? void 0 : t.password)) {
                    if ("password" === t.signInMethod) return this._fromEmailAndPassword(t.email, t.password);
                    if ("emailLink" === t.signInMethod) return this._fromEmailAndCode(t.email, t.password, t.tenantId)
                }
                return null
            }
            async _getIdTokenResponse(e) {
                switch (this.signInMethod) {
                    case "password":
                        return async function(e, t) {
                            return Je(e, "POST", "/v1/accounts:signInWithPassword", qe(e, t))
                        }(e, {
                            returnSecureToken: !0,
                            email: this._email,
                            password: this._password
                        });
                    case "emailLink":
                        return async function(e, t) {
                            return Je(e, "POST", "/v1/accounts:signInWithEmailLink", qe(e, t))
                        }(e, {
                            email: this._email,
                            oobCode: this._password
                        });
                    default:
                        Oe(e, "internal-error")
                }
            }
            async _linkToIdToken(e, t) {
                switch (this.signInMethod) {
                    case "password":
                        return Pt(e, {
                            idToken: t,
                            returnSecureToken: !0,
                            email: this._email,
                            password: this._password
                        });
                    case "emailLink":
                        return async function(e, t) {
                            return Je(e, "POST", "/v1/accounts:signInWithEmailLink", qe(e, t))
                        }(e, {
                            idToken: t,
                            email: this._email,
                            oobCode: this._password
                        });
                    default:
                        Oe(e, "internal-error")
                }
            }
            _getReauthenticationResolver(e) {
                return this._getIdTokenResponse(e)
            }
        }
        async function Mt(e, t) {
            return Je(e, "POST", "/v1/accounts:signInWithIdp", qe(e, t))
        }
        class Ut extends Dt {
            constructor() {
                super(...arguments), this.pendingToken = null
            }
            static _fromParams(e) {
                const t = new Ut(e.providerId, e.signInMethod);
                return e.idToken || e.accessToken ? (e.idToken && (t.idToken = e.idToken), e.accessToken && (t.accessToken = e.accessToken), e.nonce && !e.pendingToken && (t.nonce = e.nonce), e.pendingToken && (t.pendingToken = e.pendingToken)) : e.oauthToken && e.oauthTokenSecret ? (t.accessToken = e.oauthToken, t.secret = e.oauthTokenSecret) : Oe("argument-error"), t
            }
            toJSON() {
                return {
                    idToken: this.idToken,
                    accessToken: this.accessToken,
                    secret: this.secret,
                    nonce: this.nonce,
                    pendingToken: this.pendingToken,
                    providerId: this.providerId,
                    signInMethod: this.signInMethod
                }
            }
            static fromJSON(e) {
                const t = "string" == typeof e ? JSON.parse(e) : e,
                    {
                        providerId: n,
                        signInMethod: r
                    } = t,
                    i = be(t, ["providerId", "signInMethod"]);
                if (!n || !r) return null;
                const s = new Ut(n, r);
                return s.idToken = i.idToken || void 0, s.accessToken = i.accessToken || void 0, s.secret = i.secret, s.nonce = i.nonce, s.pendingToken = i.pendingToken || null, s
            }
            _getIdTokenResponse(e) {
                return Mt(e, this.buildRequest())
            }
            _linkToIdToken(e, t) {
                const n = this.buildRequest();
                return n.idToken = t, Mt(e, n)
            }
            _getReauthenticationResolver(e) {
                const t = this.buildRequest();
                return t.autoCreate = !1, Mt(e, t)
            }
            buildRequest() {
                const e = {
                    requestUri: "http://localhost",
                    returnSecureToken: !0
                };
                if (this.pendingToken) e.pendingToken = this.pendingToken;
                else {
                    const t = {};
                    this.idToken && (t.id_token = this.idToken), this.accessToken && (t.access_token = this.accessToken), this.secret && (t.oauth_token_secret = this.secret), t.providerId = this.providerId, this.nonce && !this.pendingToken && (t.nonce = this.nonce), e.postBody = g(t)
                }
                return e
            }
        }
        const xt = {
            USER_NOT_FOUND: "user-not-found"
        };
        class Ft extends Dt {
            constructor(e) {
                super("phone", "phone"), this.params = e
            }
            static _fromVerification(e, t) {
                return new Ft({
                    verificationId: e,
                    verificationCode: t
                })
            }
            static _fromTokenResponse(e, t) {
                return new Ft({
                    phoneNumber: e,
                    temporaryProof: t
                })
            }
            _getIdTokenResponse(e) {
                return async function(e, t) {
                    return Je(e, "POST", "/v1/accounts:signInWithPhoneNumber", qe(e, t))
                }(e, this._makeVerificationRequest())
            }
            _linkToIdToken(e, t) {
                return async function(e, t) {
                    const n = await Je(e, "POST", "/v1/accounts:signInWithPhoneNumber", qe(e, t));
                    if (n.temporaryProof) throw Qe(e, "account-exists-with-different-credential", n);
                    return n
                }(e, Object.assign({
                    idToken: t
                }, this._makeVerificationRequest()))
            }
            _getReauthenticationResolver(e) {
                return async function(e, t) {
                    return Je(e, "POST", "/v1/accounts:signInWithPhoneNumber", qe(e, Object.assign(Object.assign({}, t), {
                        operation: "REAUTH"
                    })), xt)
                }(e, this._makeVerificationRequest())
            }
            _makeVerificationRequest() {
                const {
                    temporaryProof: e,
                    phoneNumber: t,
                    verificationId: n,
                    verificationCode: r
                } = this.params;
                return e && t ? {
                    temporaryProof: e,
                    phoneNumber: t
                } : {
                    sessionInfo: n,
                    code: r
                }
            }
            toJSON() {
                const e = {
                    providerId: this.providerId
                };
                return this.params.phoneNumber && (e.phoneNumber = this.params.phoneNumber), this.params.temporaryProof && (e.temporaryProof = this.params.temporaryProof), this.params.verificationCode && (e.verificationCode = this.params.verificationCode), this.params.verificationId && (e.verificationId = this.params.verificationId), e
            }
            static fromJSON(e) {
                "string" == typeof e && (e = JSON.parse(e));
                const {
                    verificationId: t,
                    verificationCode: n,
                    phoneNumber: r,
                    temporaryProof: i
                } = e;
                return n || t || r || i ? new Ft({
                    verificationId: t,
                    verificationCode: n,
                    phoneNumber: r,
                    temporaryProof: i
                }) : null
            }
        }
        class jt {
            constructor(e) {
                var t, n, r, i, s, o;
                const a = v(_(e)),
                    c = null !== (t = a.apiKey) && void 0 !== t ? t : null,
                    l = null !== (n = a.oobCode) && void 0 !== n ? n : null,
                    u = function(e) {
                        switch (e) {
                            case "recoverEmail":
                                return "RECOVER_EMAIL";
                            case "resetPassword":
                                return "PASSWORD_RESET";
                            case "signIn":
                                return "EMAIL_SIGNIN";
                            case "verifyEmail":
                                return "VERIFY_EMAIL";
                            case "verifyAndChangeEmail":
                                return "VERIFY_AND_CHANGE_EMAIL";
                            case "revertSecondFactorAddition":
                                return "REVERT_SECOND_FACTOR_ADDITION";
                            default:
                                return null
                        }
                    }(null !== (r = a.mode) && void 0 !== r ? r : null);
                De(c && l && u, "argument-error"), this.apiKey = c, this.operation = u, this.code = l, this.continueUrl = null !== (i = a.continueUrl) && void 0 !== i ? i : null, this.languageCode = null !== (s = a.languageCode) && void 0 !== s ? s : null, this.tenantId = null !== (o = a.tenantId) && void 0 !== o ? o : null
            }
            static parseLink(e) {
                const t = function(e) {
                    const t = v(_(e)).link,
                        n = t ? v(_(t)).deep_link_id : null,
                        r = v(_(e)).deep_link_id;
                    return (r ? v(_(r)).link : null) || r || n || t || e
                }(e);
                try {
                    return new jt(t)
                } catch (e) {
                    return null
                }
            }
        }
        class Vt {
            constructor() {
                this.providerId = Vt.PROVIDER_ID
            }
            static credential(e, t) {
                return Lt._fromEmailAndPassword(e, t)
            }
            static credentialWithLink(e, t) {
                const n = jt.parseLink(t);
                return De(n, "argument-error"), Lt._fromEmailAndCode(e, n.code, n.tenantId)
            }
        }
        Vt.PROVIDER_ID = "password", Vt.EMAIL_PASSWORD_SIGN_IN_METHOD = "password", Vt.EMAIL_LINK_SIGN_IN_METHOD = "emailLink";
        class Ht {
            constructor(e) {
                this.providerId = e, this.defaultLanguageCode = null, this.customParameters = {}
            }
            setDefaultLanguage(e) {
                this.defaultLanguageCode = e
            }
            setCustomParameters(e) {
                return this.customParameters = e, this
            }
            getCustomParameters() {
                return this.customParameters
            }
        }
        class Bt extends Ht {
            constructor() {
                super(...arguments), this.scopes = []
            }
            addScope(e) {
                return this.scopes.includes(e) || this.scopes.push(e), this
            }
            getScopes() {
                return [...this.scopes]
            }
        }
        class zt extends Bt {
            constructor() {
                super("facebook.com")
            }
            static credential(e) {
                return Ut._fromParams({
                    providerId: zt.PROVIDER_ID,
                    signInMethod: zt.FACEBOOK_SIGN_IN_METHOD,
                    accessToken: e
                })
            }
            static credentialFromResult(e) {
                return zt.credentialFromTaggedObject(e)
            }
            static credentialFromError(e) {
                return zt.credentialFromTaggedObject(e.customData || {})
            }
            static credentialFromTaggedObject({
                _tokenResponse: e
            }) {
                if (!e || !("oauthAccessToken" in e)) return null;
                if (!e.oauthAccessToken) return null;
                try {
                    return zt.credential(e.oauthAccessToken)
                } catch (e) {
                    return null
                }
            }
        }
        zt.FACEBOOK_SIGN_IN_METHOD = "facebook.com", zt.PROVIDER_ID = "facebook.com";
        class Wt extends Bt {
            constructor() {
                super("google.com"), this.addScope("profile")
            }
            static credential(e, t) {
                return Ut._fromParams({
                    providerId: Wt.PROVIDER_ID,
                    signInMethod: Wt.GOOGLE_SIGN_IN_METHOD,
                    idToken: e,
                    accessToken: t
                })
            }
            static credentialFromResult(e) {
                return Wt.credentialFromTaggedObject(e)
            }
            static credentialFromError(e) {
                return Wt.credentialFromTaggedObject(e.customData || {})
            }
            static credentialFromTaggedObject({
                _tokenResponse: e
            }) {
                if (!e) return null;
                const {
                    oauthIdToken: t,
                    oauthAccessToken: n
                } = e;
                if (!t && !n) return null;
                try {
                    return Wt.credential(t, n)
                } catch (e) {
                    return null
                }
            }
        }
        Wt.GOOGLE_SIGN_IN_METHOD = "google.com", Wt.PROVIDER_ID = "google.com";
        class $t extends Bt {
            constructor() {
                super("github.com")
            }
            static credential(e) {
                return Ut._fromParams({
                    providerId: $t.PROVIDER_ID,
                    signInMethod: $t.GITHUB_SIGN_IN_METHOD,
                    accessToken: e
                })
            }
            static credentialFromResult(e) {
                return $t.credentialFromTaggedObject(e)
            }
            static credentialFromError(e) {
                return $t.credentialFromTaggedObject(e.customData || {})
            }
            static credentialFromTaggedObject({
                _tokenResponse: e
            }) {
                if (!e || !("oauthAccessToken" in e)) return null;
                if (!e.oauthAccessToken) return null;
                try {
                    return $t.credential(e.oauthAccessToken)
                } catch (e) {
                    return null
                }
            }
        }
        $t.GITHUB_SIGN_IN_METHOD = "github.com", $t.PROVIDER_ID = "github.com";
        class qt extends Bt {
            constructor() {
                super("twitter.com")
            }
            static credential(e, t) {
                return Ut._fromParams({
                    providerId: qt.PROVIDER_ID,
                    signInMethod: qt.TWITTER_SIGN_IN_METHOD,
                    oauthToken: e,
                    oauthTokenSecret: t
                })
            }
            static credentialFromResult(e) {
                return qt.credentialFromTaggedObject(e)
            }
            static credentialFromError(e) {
                return qt.credentialFromTaggedObject(e.customData || {})
            }
            static credentialFromTaggedObject({
                _tokenResponse: e
            }) {
                if (!e) return null;
                const {
                    oauthAccessToken: t,
                    oauthTokenSecret: n
                } = e;
                if (!t || !n) return null;
                try {
                    return qt.credential(t, n)
                } catch (e) {
                    return null
                }
            }
        }
        qt.TWITTER_SIGN_IN_METHOD = "twitter.com", qt.PROVIDER_ID = "twitter.com";
        class Gt {
            constructor(e) {
                this.user = e.user, this.providerId = e.providerId, this._tokenResponse = e._tokenResponse, this.operationType = e.operationType
            }
            static async _fromIdTokenResponse(e, t, n, r = !1) {
                const i = await ct._fromIdTokenResponse(e, n, r),
                    s = Kt(n);
                return new Gt({
                    user: i,
                    providerId: s,
                    _tokenResponse: n,
                    operationType: t
                })
            }
            static async _forOperation(e, t, n) {
                await e._updateTokensIfNecessary(n, !0);
                const r = Kt(n);
                return new Gt({
                    user: e,
                    providerId: r,
                    _tokenResponse: n,
                    operationType: t
                })
            }
        }

        function Kt(e) {
            return e.providerId ? e.providerId : "phoneNumber" in e ? "phone" : null
        }
        class Jt extends h {
            constructor(e, t, n, r) {
                var i;
                super(t.code, t.message), this.operationType = n, this.user = r, Object.setPrototypeOf(this, Jt.prototype), this.customData = {
                    appName: e.name,
                    tenantId: null !== (i = e.tenantId) && void 0 !== i ? i : void 0,
                    _serverResponse: t.customData._serverResponse,
                    operationType: n
                }
            }
            static _fromErrorAndOperation(e, t, n, r) {
                return new Jt(e, t, n, r)
            }
        }

        function Xt(e, t, n, r) {
            return ("reauthenticate" === t ? n._getReauthenticationResolver(e) : n._getIdTokenResponse(e)).catch((n => {
                if ("auth/multi-factor-auth-required" === n.code) throw Jt._fromErrorAndOperation(e, n, t, r);
                throw n
            }))
        }
        async function Yt(e, t, n = !1) {
            const r = await nt(e, t._linkToIdToken(e.auth, await e.getIdToken()), n);
            return Gt._forOperation(e, "link", r)
        }
        async function Qt(e, t, n = !1) {
            var r;
            const {
                auth: i
            } = e, s = "reauthenticate";
            try {
                const r = await nt(e, Xt(i, s, t, e), n);
                De(r.idToken, i, "internal-error");
                const o = tt(r.idToken);
                De(o, i, "internal-error");
                const {
                    sub: a
                } = o;
                return De(e.uid === a, i, "user-mismatch"), Gt._forOperation(e, s, r)
            } catch (e) {
                throw "auth/user-not-found" === (null === (r = e) || void 0 === r ? void 0 : r.code) && Oe(i, "user-mismatch"), e
            }
        }
        async function Zt(e, t, n = !1) {
            const r = "signIn",
                i = await Xt(e, r, t),
                s = await Gt._fromIdTokenResponse(e, r, i);
            return n || await e._updateCurrentUser(s.user), s
        }
        new WeakMap;
        const en = "__sak";
        class tn {
            constructor(e, t) {
                this.storageRetriever = e, this.type = t
            }
            _isAvailable() {
                try {
                    return this.storage ? (this.storage.setItem(en, "1"), this.storage.removeItem(en), Promise.resolve(!0)) : Promise.resolve(!1)
                } catch (e) {
                    return Promise.resolve(!1)
                }
            }
            _set(e, t) {
                return this.storage.setItem(e, JSON.stringify(t)), Promise.resolve()
            }
            _get(e) {
                const t = this.storage.getItem(e);
                return Promise.resolve(t ? JSON.parse(t) : null)
            }
            _remove(e) {
                return this.storage.removeItem(e), Promise.resolve()
            }
            get storage() {
                return this.storageRetriever()
            }
        }
        class nn extends tn {
            constructor() {
                super((() => window.localStorage), "LOCAL"), this.boundEventHandler = (e, t) => this.onStorageEvent(e, t), this.listeners = {}, this.localCache = {}, this.pollTimer = null, this.safariLocalStorageNotSynced = function() {
                    const e = s();
                    return mt(e) || bt(e)
                }() && function() {
                    try {
                        return !(!window || window === window.top)
                    } catch (e) {
                        return !1
                    }
                }(), this.fallbackToPolling = Tt(), this._shouldAllowMigration = !0
            }
            forAllChangedKeys(e) {
                for (const t of Object.keys(this.listeners)) {
                    const n = this.storage.getItem(t),
                        r = this.localCache[t];
                    n !== r && e(t, r, n)
                }
            }
            onStorageEvent(e, t = !1) {
                if (!e.key) return void this.forAllChangedKeys(((e, t, n) => {
                    this.notifyListeners(e, n)
                }));
                const n = e.key;
                if (t ? this.detachListener() : this.stopPolling(), this.safariLocalStorageNotSynced) {
                    const r = this.storage.getItem(n);
                    if (e.newValue !== r) null !== e.newValue ? this.storage.setItem(n, e.newValue) : this.storage.removeItem(n);
                    else if (this.localCache[n] === e.newValue && !t) return
                }
                const r = () => {
                        const e = this.storage.getItem(n);
                        (t || this.localCache[n] !== e) && this.notifyListeners(n, e)
                    },
                    i = this.storage.getItem(n);
                wt() && i !== e.newValue && e.newValue !== e.oldValue ? setTimeout(r, 10) : r()
            }
            notifyListeners(e, t) {
                this.localCache[e] = t;
                const n = this.listeners[e];
                if (n)
                    for (const e of Array.from(n)) e(t ? JSON.parse(t) : t)
            }
            startPolling() {
                this.stopPolling(), this.pollTimer = setInterval((() => {
                    this.forAllChangedKeys(((e, t, n) => {
                        this.onStorageEvent(new StorageEvent("storage", {
                            key: e,
                            oldValue: t,
                            newValue: n
                        }), !0)
                    }))
                }), 1e3)
            }
            stopPolling() {
                this.pollTimer && (clearInterval(this.pollTimer), this.pollTimer = null)
            }
            attachListener() {
                window.addEventListener("storage", this.boundEventHandler)
            }
            detachListener() {
                window.removeEventListener("storage", this.boundEventHandler)
            }
            _addListener(e, t) {
                0 === Object.keys(this.listeners).length && (this.fallbackToPolling ? this.startPolling() : this.attachListener()), this.listeners[e] || (this.listeners[e] = new Set, this.localCache[e] = this.storage.getItem(e)), this.listeners[e].add(t)
            }
            _removeListener(e, t) {
                this.listeners[e] && (this.listeners[e].delete(t), 0 === this.listeners[e].size && delete this.listeners[e]), 0 === Object.keys(this.listeners).length && (this.detachListener(), this.stopPolling())
            }
            async _set(e, t) {
                await super._set(e, t), this.localCache[e] = JSON.stringify(t)
            }
            async _get(e) {
                const t = await super._get(e);
                return this.localCache[e] = JSON.stringify(t), t
            }
            async _remove(e) {
                await super._remove(e), delete this.localCache[e]
            }
        }
        nn.type = "LOCAL";
        const rn = nn;
        class sn extends tn {
            constructor() {
                super((() => window.sessionStorage), "SESSION")
            }
            _addListener(e, t) {}
            _removeListener(e, t) {}
        }
        sn.type = "SESSION";
        const on = sn;
        class an {
            constructor(e) {
                this.eventTarget = e, this.handlersMap = {}, this.boundEventHandler = this.handleEvent.bind(this)
            }
            static _getInstance(e) {
                const t = this.receivers.find((t => t.isListeningto(e)));
                if (t) return t;
                const n = new an(e);
                return this.receivers.push(n), n
            }
            isListeningto(e) {
                return this.eventTarget === e
            }
            async handleEvent(e) {
                const t = e,
                    {
                        eventId: n,
                        eventType: r,
                        data: i
                    } = t.data,
                    s = this.handlersMap[r];
                if (!(null == s ? void 0 : s.size)) return;
                t.ports[0].postMessage({
                    status: "ack",
                    eventId: n,
                    eventType: r
                });
                const o = Array.from(s).map((async e => e(t.origin, i))),
                    a = await
                function(e) {
                    return Promise.all(e.map((async e => {
                        try {
                            return {
                                fulfilled: !0,
                                value: await e
                            }
                        } catch (e) {
                            return {
                                fulfilled: !1,
                                reason: e
                            }
                        }
                    })))
                }(o);
                t.ports[0].postMessage({
                    status: "done",
                    eventId: n,
                    eventType: r,
                    response: a
                })
            }
            _subscribe(e, t) {
                0 === Object.keys(this.handlersMap).length && this.eventTarget.addEventListener("message", this.boundEventHandler), this.handlersMap[e] || (this.handlersMap[e] = new Set), this.handlersMap[e].add(t)
            }
            _unsubscribe(e, t) {
                this.handlersMap[e] && t && this.handlersMap[e].delete(t), t && 0 !== this.handlersMap[e].size || delete this.handlersMap[e], 0 === Object.keys(this.handlersMap).length && this.eventTarget.removeEventListener("message", this.boundEventHandler)
            }
        }

        function cn(e = "", t = 10) {
            let n = "";
            for (let e = 0; e < t; e++) n += Math.floor(10 * Math.random());
            return e + n
        }
        an.receivers = [];
        class ln {
            constructor(e) {
                this.target = e, this.handlers = new Set
            }
            removeMessageHandler(e) {
                e.messageChannel && (e.messageChannel.port1.removeEventListener("message", e.onMessage), e.messageChannel.port1.close()), this.handlers.delete(e)
            }
            async _send(e, t, n = 50) {
                const r = "undefined" != typeof MessageChannel ? new MessageChannel : null;
                if (!r) throw new Error("connection_unavailable");
                let i, s;
                return new Promise(((o, a) => {
                    const c = cn("", 20);
                    r.port1.start();
                    const l = setTimeout((() => {
                        a(new Error("unsupported_event"))
                    }), n);
                    s = {
                        messageChannel: r,
                        onMessage(e) {
                            const t = e;
                            if (t.data.eventId === c) switch (t.data.status) {
                                case "ack":
                                    clearTimeout(l), i = setTimeout((() => {
                                        a(new Error("timeout"))
                                    }), 3e3);
                                    break;
                                case "done":
                                    clearTimeout(i), o(t.data.response);
                                    break;
                                default:
                                    clearTimeout(l), clearTimeout(i), a(new Error("invalid_response"))
                            }
                        }
                    }, this.handlers.add(s), r.port1.addEventListener("message", s.onMessage), this.target.postMessage({
                        eventType: e,
                        eventId: c,
                        data: t
                    }, [r.port2])
                })).finally((() => {
                    s && this.removeMessageHandler(s)
                }))
            }
        }

        function un() {
            return window
        }

        function hn() {
            return void 0 !== un().WorkerGlobalScope && "function" == typeof un().importScripts
        }
        const dn = "firebaseLocalStorageDb",
            pn = "firebaseLocalStorage",
            fn = "fbase_key";
        class mn {
            constructor(e) {
                this.request = e
            }
            toPromise() {
                return new Promise(((e, t) => {
                    this.request.addEventListener("success", (() => {
                        e(this.request.result)
                    })), this.request.addEventListener("error", (() => {
                        t(this.request.error)
                    }))
                }))
            }
        }

        function gn(e, t) {
            return e.transaction([pn], t ? "readwrite" : "readonly").objectStore(pn)
        }

        function vn() {
            const e = indexedDB.open(dn, 1);
            return new Promise(((t, n) => {
                e.addEventListener("error", (() => {
                    n(e.error)
                })), e.addEventListener("upgradeneeded", (() => {
                    const t = e.result;
                    try {
                        t.createObjectStore(pn, {
                            keyPath: fn
                        })
                    } catch (e) {
                        n(e)
                    }
                })), e.addEventListener("success", (async () => {
                    const n = e.result;
                    n.objectStoreNames.contains(pn) ? t(n) : (n.close(), await
                        function() {
                            const e = indexedDB.deleteDatabase(dn);
                            return new mn(e).toPromise()
                        }(), t(await vn()))
                }))
            }))
        }
        async function _n(e, t, n) {
            const r = gn(e, !0).put({
                [fn]: t,
                value: n
            });
            return new mn(r).toPromise()
        }

        function yn(e, t) {
            const n = gn(e, !0).delete(t);
            return new mn(n).toPromise()
        }
        class In {
            constructor() {
                this.type = "LOCAL", this._shouldAllowMigration = !0, this.listeners = {}, this.localCache = {}, this.pollTimer = null, this.pendingWrites = 0, this.receiver = null, this.sender = null, this.serviceWorkerReceiverAvailable = !1, this.activeServiceWorker = null, this._workerInitializationPromise = this.initializeServiceWorkerMessaging().then((() => {}), (() => {}))
            }
            async _openDb() {
                return this.db || (this.db = await vn()), this.db
            }
            async _withRetries(e) {
                let t = 0;
                for (;;) try {
                    const t = await this._openDb();
                    return await e(t)
                } catch (e) {
                    if (t++ > 3) throw e;
                    this.db && (this.db.close(), this.db = void 0)
                }
            }
            async initializeServiceWorkerMessaging() {
                return hn() ? this.initializeReceiver() : this.initializeSender()
            }
            async initializeReceiver() {
                this.receiver = an._getInstance(hn() ? self : null), this.receiver._subscribe("keyChanged", (async (e, t) => ({
                    keyProcessed: (await this._poll()).includes(t.key)
                }))), this.receiver._subscribe("ping", (async (e, t) => ["keyChanged"]))
            }
            async initializeSender() {
                var e, t;
                if (this.activeServiceWorker = await async function() {
                        if (!(null === navigator || void 0 === navigator ? void 0 : navigator.serviceWorker)) return null;
                        try {
                            return (await navigator.serviceWorker.ready).active
                        } catch (e) {
                            return null
                        }
                    }(), !this.activeServiceWorker) return;
                this.sender = new ln(this.activeServiceWorker);
                const n = await this.sender._send("ping", {}, 800);
                n && (null === (e = n[0]) || void 0 === e ? void 0 : e.fulfilled) && (null === (t = n[0]) || void 0 === t ? void 0 : t.value.includes("keyChanged")) && (this.serviceWorkerReceiverAvailable = !0)
            }
            async notifyServiceWorker(e) {
                var t;
                if (this.sender && this.activeServiceWorker && ((null === (t = null === navigator || void 0 === navigator ? void 0 : navigator.serviceWorker) || void 0 === t ? void 0 : t.controller) || null) === this.activeServiceWorker) try {
                    await this.sender._send("keyChanged", {
                        key: e
                    }, this.serviceWorkerReceiverAvailable ? 800 : 50)
                } catch (t) {}
            }
            async _isAvailable() {
                try {
                    if (!indexedDB) return !1;
                    const e = await vn();
                    return await _n(e, en, "1"), await yn(e, en), !0
                } catch (e) {}
                return !1
            }
            async _withPendingWrite(e) {
                this.pendingWrites++;
                try {
                    await e()
                } finally {
                    this.pendingWrites--
                }
            }
            async _set(e, t) {
                return this._withPendingWrite((async () => (await this._withRetries((n => _n(n, e, t))), this.localCache[e] = t, this.notifyServiceWorker(e))))
            }
            async _get(e) {
                const t = await this._withRetries((t => async function(e, t) {
                    const n = gn(e, !1).get(t),
                        r = await new mn(n).toPromise();
                    return void 0 === r ? null : r.value
                }(t, e)));
                return this.localCache[e] = t, t
            }
            async _remove(e) {
                return this._withPendingWrite((async () => (await this._withRetries((t => yn(t, e))), delete this.localCache[e], this.notifyServiceWorker(e))))
            }
            async _poll() {
                const e = await this._withRetries((e => {
                    const t = gn(e, !1).getAll();
                    return new mn(t).toPromise()
                }));
                if (!e) return [];
                if (0 !== this.pendingWrites) return [];
                const t = [],
                    n = new Set;
                for (const {
                        fbase_key: r,
                        value: i
                    }
                    of e) n.add(r), JSON.stringify(this.localCache[r]) !== JSON.stringify(i) && (this.notifyListeners(r, i), t.push(r));
                for (const e of Object.keys(this.localCache)) this.localCache[e] && !n.has(e) && (this.notifyListeners(e, null), t.push(e));
                return t
            }
            notifyListeners(e, t) {
                this.localCache[e] = t;
                const n = this.listeners[e];
                if (n)
                    for (const e of Array.from(n)) e(t)
            }
            startPolling() {
                this.stopPolling(), this.pollTimer = setInterval((async () => this._poll()), 800)
            }
            stopPolling() {
                this.pollTimer && (clearInterval(this.pollTimer), this.pollTimer = null)
            }
            _addListener(e, t) {
                0 === Object.keys(this.listeners).length && this.startPolling(), this.listeners[e] || (this.listeners[e] = new Set, this._get(e)), this.listeners[e].add(t)
            }
            _removeListener(e, t) {
                this.listeners[e] && (this.listeners[e].delete(t), 0 === this.listeners[e].size && delete this.listeners[e]), 0 === Object.keys(this.listeners).length && this.stopPolling()
            }
        }
        In.type = "LOCAL";
        const bn = In;

        function wn(e) {
            return new Promise(((t, n) => {
                const r = document.createElement("script");
                var i, s;
                r.setAttribute("src", e), r.onload = t, r.onerror = e => {
                    const t = Re("internal-error");
                    t.customData = e, n(t)
                }, r.type = "text/javascript", r.charset = "UTF-8", (null !== (s = null === (i = document.getElementsByTagName("head")) || void 0 === i ? void 0 : i[0]) && void 0 !== s ? s : document).appendChild(r)
            }))
        }

        function Tn(e) {
            return `__${e}${Math.floor(1e6*Math.random())}`
        }
        Tn("rcb"), new He(3e4, 6e4);
        const En = "recaptcha";
        async function kn(e, t, n) {
            var r;
            const i = await n.verify();
            try {
                let s;
                if (De("string" == typeof i, e, "argument-error"), De(n.type === En, e, "argument-error"), s = "string" == typeof t ? {
                        phoneNumber: t
                    } : t, "session" in s) {
                    const t = s.session;
                    if ("phoneNumber" in s) {
                        De("enroll" === t.type, e, "internal-error");
                        const n = await
                        function(e, t) {
                            return Ge(e, "POST", "/v2/accounts/mfaEnrollment:start", qe(e, t))
                        }(e, {
                            idToken: t.credential,
                            phoneEnrollmentInfo: {
                                phoneNumber: s.phoneNumber,
                                recaptchaToken: i
                            }
                        });
                        return n.phoneSessionInfo.sessionInfo
                    } {
                        De("signin" === t.type, e, "internal-error");
                        const n = (null === (r = s.multiFactorHint) || void 0 === r ? void 0 : r.uid) || s.multiFactorUid;
                        De(n, e, "missing-multi-factor-info");
                        const o = await
                        function(e, t) {
                            return Ge(e, "POST", "/v2/accounts/mfaSignIn:start", qe(e, t))
                        }(e, {
                            mfaPendingCredential: t.credential,
                            mfaEnrollmentId: n,
                            phoneSignInInfo: {
                                recaptchaToken: i
                            }
                        });
                        return o.phoneResponseInfo.sessionInfo
                    }
                } {
                    const {
                        sessionInfo: t
                    } = await async function(e, t) {
                        return Ge(e, "POST", "/v1/accounts:sendVerificationCode", qe(e, t))
                    }(e, {
                        phoneNumber: s.phoneNumber,
                        recaptchaToken: i
                    });
                    return t
                }
            } finally {
                n._reset()
            }
        }
        class Sn {
            constructor(e) {
                this.providerId = Sn.PROVIDER_ID, this.auth = Ot(e)
            }
            verifyPhoneNumber(e, t) {
                return kn(this.auth, e, b(t))
            }
            static credential(e, t) {
                return Ft._fromVerification(e, t)
            }
            static credentialFromResult(e) {
                const t = e;
                return Sn.credentialFromTaggedObject(t)
            }
            static credentialFromError(e) {
                return Sn.credentialFromTaggedObject(e.customData || {})
            }
            static credentialFromTaggedObject({
                _tokenResponse: e
            }) {
                if (!e) return null;
                const {
                    phoneNumber: t,
                    temporaryProof: n
                } = e;
                return t && n ? Ft._fromTokenResponse(t, n) : null
            }
        }

        function On(e, t) {
            return t ? Ue(t) : (De(e._popupRedirectResolver, e, "argument-error"), e._popupRedirectResolver)
        }
        Sn.PROVIDER_ID = "phone", Sn.PHONE_SIGN_IN_METHOD = "phone";
        class Rn extends Dt {
            constructor(e) {
                super("custom", "custom"), this.params = e
            }
            _getIdTokenResponse(e) {
                return Mt(e, this._buildIdpRequest())
            }
            _linkToIdToken(e, t) {
                return Mt(e, this._buildIdpRequest(t))
            }
            _getReauthenticationResolver(e) {
                return Mt(e, this._buildIdpRequest())
            }
            _buildIdpRequest(e) {
                const t = {
                    requestUri: this.params.requestUri,
                    sessionId: this.params.sessionId,
                    postBody: this.params.postBody,
                    tenantId: this.params.tenantId,
                    pendingToken: this.params.pendingToken,
                    returnSecureToken: !0,
                    returnIdpCredential: !0
                };
                return e && (t.idToken = e), t
            }
        }

        function Cn(e) {
            return Zt(e.auth, new Rn(e), e.bypassAuthState)
        }

        function An(e) {
            const {
                auth: t,
                user: n
            } = e;
            return De(n, t, "internal-error"), Qt(n, new Rn(e), e.bypassAuthState)
        }
        async function Nn(e) {
            const {
                auth: t,
                user: n
            } = e;
            return De(n, t, "internal-error"), Yt(n, new Rn(e), e.bypassAuthState)
        }
        class Dn {
            constructor(e, t, n, r, i = !1) {
                this.auth = e, this.resolver = n, this.user = r, this.bypassAuthState = i, this.pendingPromise = null, this.eventManager = null, this.filter = Array.isArray(t) ? t : [t]
            }
            execute() {
                return new Promise((async (e, t) => {
                    this.pendingPromise = {
                        resolve: e,
                        reject: t
                    };
                    try {
                        this.eventManager = await this.resolver._initialize(this.auth), await this.onExecution(), this.eventManager.registerConsumer(this)
                    } catch (e) {
                        this.reject(e)
                    }
                }))
            }
            async onAuthEvent(e) {
                const {
                    urlResponse: t,
                    sessionId: n,
                    postBody: r,
                    tenantId: i,
                    error: s,
                    type: o
                } = e;
                if (s) return void this.reject(s);
                const a = {
                    auth: this.auth,
                    requestUri: t,
                    sessionId: n,
                    tenantId: i || void 0,
                    postBody: r || void 0,
                    user: this.user,
                    bypassAuthState: this.bypassAuthState
                };
                try {
                    this.resolve(await this.getIdpTask(o)(a))
                } catch (e) {
                    this.reject(e)
                }
            }
            onError(e) {
                this.reject(e)
            }
            getIdpTask(e) {
                switch (e) {
                    case "signInViaPopup":
                    case "signInViaRedirect":
                        return Cn;
                    case "linkViaPopup":
                    case "linkViaRedirect":
                        return Nn;
                    case "reauthViaPopup":
                    case "reauthViaRedirect":
                        return An;
                    default:
                        Oe(this.auth, "internal-error")
                }
            }
            resolve(e) {
                Le(this.pendingPromise, "Pending promise was never set"), this.pendingPromise.resolve(e), this.unregisterAndCleanUp()
            }
            reject(e) {
                Le(this.pendingPromise, "Pending promise was never set"), this.pendingPromise.reject(e), this.unregisterAndCleanUp()
            }
            unregisterAndCleanUp() {
                this.eventManager && this.eventManager.unregisterConsumer(this), this.pendingPromise = null, this.cleanUp()
            }
        }
        const Pn = new He(2e3, 1e4);
        class Ln extends Dn {
            constructor(e, t, n, r, i) {
                super(e, t, r, i), this.provider = n, this.authWindow = null, this.pollId = null, Ln.currentPopupAction && Ln.currentPopupAction.cancel(), Ln.currentPopupAction = this
            }
            async executeNotNull() {
                const e = await this.execute();
                return De(e, this.auth, "internal-error"), e
            }
            async onExecution() {
                Le(1 === this.filter.length, "Popup operations only handle one event");
                const e = cn();
                this.authWindow = await this.resolver._openPopup(this.auth, this.provider, this.filter[0], e), this.authWindow.associatedEvent = e, this.resolver._originValidation(this.auth).catch((e => {
                    this.reject(e)
                })), this.resolver._isIframeWebStorageSupported(this.auth, (e => {
                    e || this.reject(Re(this.auth, "web-storage-unsupported"))
                })), this.pollUserCancellation()
            }
            get eventId() {
                var e;
                return (null === (e = this.authWindow) || void 0 === e ? void 0 : e.associatedEvent) || null
            }
            cancel() {
                this.reject(Re(this.auth, "cancelled-popup-request"))
            }
            cleanUp() {
                this.authWindow && this.authWindow.close(), this.pollId && window.clearTimeout(this.pollId), this.authWindow = null, this.pollId = null, Ln.currentPopupAction = null
            }
            pollUserCancellation() {
                const e = () => {
                    var t, n;
                    (null === (n = null === (t = this.authWindow) || void 0 === t ? void 0 : t.window) || void 0 === n ? void 0 : n.closed) ? this.pollId = window.setTimeout((() => {
                        this.pollId = null, this.reject(Re(this.auth, "popup-closed-by-user"))
                    }), 2e3): this.pollId = window.setTimeout(e, Pn.get())
                };
                e()
            }
        }
        Ln.currentPopupAction = null;
        const Mn = new Map;
        class Un extends Dn {
            constructor(e, t, n = !1) {
                super(e, ["signInViaRedirect", "linkViaRedirect", "reauthViaRedirect", "unknown"], t, void 0, n), this.eventId = null
            }
            async execute() {
                let e = Mn.get(this.auth._key());
                if (!e) {
                    try {
                        const t = await async function(e, t) {
                            const n = Vn(t),
                                r = jn(e);
                            if (!await r._isAvailable()) return !1;
                            const i = "true" === await r._get(n);
                            return await r._remove(n), i
                        }(this.resolver, this.auth) ? await super.execute() : null;
                        e = () => Promise.resolve(t)
                    } catch (t) {
                        e = () => Promise.reject(t)
                    }
                    Mn.set(this.auth._key(), e)
                }
                return this.bypassAuthState || Mn.set(this.auth._key(), (() => Promise.resolve(null))), e()
            }
            async onAuthEvent(e) {
                if ("signInViaRedirect" === e.type) return super.onAuthEvent(e);
                if ("unknown" !== e.type) {
                    if (e.eventId) {
                        const t = await this.auth._redirectUserForId(e.eventId);
                        if (t) return this.user = t, super.onAuthEvent(e);
                        this.resolve(null)
                    }
                } else this.resolve(null)
            }
            async onExecution() {}
            cleanUp() {}
        }
        async function xn(e, t) {
            return jn(e)._set(Vn(t), "true")
        }

        function Fn(e, t) {
            Mn.set(e._key(), t)
        }

        function jn(e) {
            return Ue(e._redirectPersistence)
        }

        function Vn(e) {
            return ht("pendingRedirect", e.config.apiKey, e.name)
        }

        function Hn(e, t, n) {
            return async function(e, t, n) {
                const r = Ot(e);
                Ae(e, t, Ht);
                const i = On(r, n);
                return await xn(i, r), i._openRedirect(r, t, "signInViaRedirect")
            }(e, t, n)
        }
        async function Bn(e, t, n = !1) {
            const r = Ot(e),
                i = On(r, t),
                s = new Un(r, i, n),
                o = await s.execute();
            return o && !n && (delete o.user._redirectEventId, await r._persistUserIfCurrent(o.user), await r._setRedirectUser(null, t)), o
        }
        class zn {
            constructor(e) {
                this.auth = e, this.cachedEventUids = new Set, this.consumers = new Set, this.queuedRedirectEvent = null, this.hasHandledPotentialRedirect = !1, this.lastProcessedEventTime = Date.now()
            }
            registerConsumer(e) {
                this.consumers.add(e), this.queuedRedirectEvent && this.isEventForConsumer(this.queuedRedirectEvent, e) && (this.sendToConsumer(this.queuedRedirectEvent, e), this.saveEventToCache(this.queuedRedirectEvent), this.queuedRedirectEvent = null)
            }
            unregisterConsumer(e) {
                this.consumers.delete(e)
            }
            onEvent(e) {
                if (this.hasEventBeenHandled(e)) return !1;
                let t = !1;
                return this.consumers.forEach((n => {
                    this.isEventForConsumer(e, n) && (t = !0, this.sendToConsumer(e, n), this.saveEventToCache(e))
                })), this.hasHandledPotentialRedirect || ! function(e) {
                    switch (e.type) {
                        case "signInViaRedirect":
                        case "linkViaRedirect":
                        case "reauthViaRedirect":
                            return !0;
                        case "unknown":
                            return $n(e);
                        default:
                            return !1
                    }
                }(e) || (this.hasHandledPotentialRedirect = !0, t || (this.queuedRedirectEvent = e, t = !0)), t
            }
            sendToConsumer(e, t) {
                var n;
                if (e.error && !$n(e)) {
                    const r = (null === (n = e.error.code) || void 0 === n ? void 0 : n.split("auth/")[1]) || "internal-error";
                    t.onError(Re(this.auth, r))
                } else t.onAuthEvent(e)
            }
            isEventForConsumer(e, t) {
                const n = null === t.eventId || !!e.eventId && e.eventId === t.eventId;
                return t.filter.includes(e.type) && n
            }
            hasEventBeenHandled(e) {
                return Date.now() - this.lastProcessedEventTime >= 6e5 && this.cachedEventUids.clear(), this.cachedEventUids.has(Wn(e))
            }
            saveEventToCache(e) {
                this.cachedEventUids.add(Wn(e)), this.lastProcessedEventTime = Date.now()
            }
        }

        function Wn(e) {
            return [e.type, e.eventId, e.sessionId, e.tenantId].filter((e => e)).join("-")
        }

        function $n({
            type: e,
            error: t
        }) {
            return "unknown" === e && "auth/no-auth-event" === (null == t ? void 0 : t.code)
        }
        const qn = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
            Gn = /^https?/;
        async function Kn(e) {
            if (e.config.emulator) return;
            const {
                authorizedDomains: t
            } = await async function(e, t = {}) {
                return Ge(e, "GET", "/v1/projects", t)
            }(e);
            for (const e of t) try {
                if (Jn(e)) return
            } catch (e) {}
            Oe(e, "unauthorized-domain")
        }

        function Jn(e) {
            const t = xe(),
                {
                    protocol: n,
                    hostname: r
                } = new URL(t);
            if (e.startsWith("chrome-extension://")) {
                const i = new URL(e);
                return "" === i.hostname && "" === r ? "chrome-extension:" === n && e.replace("chrome-extension://", "") === t.replace("chrome-extension://", "") : "chrome-extension:" === n && i.hostname === r
            }
            if (!Gn.test(n)) return !1;
            if (qn.test(e)) return r === e;
            const i = e.replace(/\./g, "\\.");
            return new RegExp("^(.+\\." + i + "|" + i + ")$", "i").test(r)
        }
        const Xn = new He(3e4, 6e4);

        function Yn() {
            const e = un().___jsl;
            if (null == e ? void 0 : e.H)
                for (const t of Object.keys(e.H))
                    if (e.H[t].r = e.H[t].r || [], e.H[t].L = e.H[t].L || [], e.H[t].r = [...e.H[t].L], e.CP)
                        for (let t = 0; t < e.CP.length; t++) e.CP[t] = null
        }
        let Qn = null;

        function Zn(e) {
            return Qn = Qn || function(e) {
                return new Promise(((t, n) => {
                    var r, i, s;

                    function o() {
                        Yn(), gapi.load("gapi.iframes", {
                            callback: () => {
                                t(gapi.iframes.getContext())
                            },
                            ontimeout: () => {
                                Yn(), n(Re(e, "network-request-failed"))
                            },
                            timeout: Xn.get()
                        })
                    }
                    if (null === (i = null === (r = un().gapi) || void 0 === r ? void 0 : r.iframes) || void 0 === i ? void 0 : i.Iframe) t(gapi.iframes.getContext());
                    else {
                        if (!(null === (s = un().gapi) || void 0 === s ? void 0 : s.load)) {
                            const t = Tn("iframefcb");
                            return un()[t] = () => {
                                gapi.load ? o() : n(Re(e, "network-request-failed"))
                            }, wn(`https://apis.google.com/js/api.js?onload=${t}`).catch((e => n(e)))
                        }
                        o()
                    }
                })).catch((e => {
                    throw Qn = null, e
                }))
            }(e), Qn
        }
        const er = new He(5e3, 15e3),
            tr = {
                style: {
                    position: "absolute",
                    top: "-100px",
                    width: "1px",
                    height: "1px"
                },
                "aria-hidden": "true",
                tabindex: "-1"
            },
            nr = new Map([
                ["identitytoolkit.googleapis.com", "p"],
                ["staging-identitytoolkit.sandbox.googleapis.com", "s"],
                ["test-identitytoolkit.sandbox.googleapis.com", "t"]
            ]);

        function rr(e) {
            const t = e.config;
            De(t.authDomain, e, "auth-domain-config-required");
            const n = t.emulator ? Be(t, "emulator/auth/iframe") : `https://${e.config.authDomain}/__/auth/iframe`,
                r = {
                    apiKey: t.apiKey,
                    appName: e.name,
                    v: ce
                },
                i = nr.get(e.config.apiHost);
            i && (r.eid = i);
            const s = e._getFrameworks();
            return s.length && (r.fw = s.join(",")), `${n}?${g(r).slice(1)}`
        }
        const ir = {
            location: "yes",
            resizable: "yes",
            statusbar: "yes",
            toolbar: "no"
        };
        class sr {
            constructor(e) {
                this.window = e, this.associatedEvent = null
            }
            close() {
                if (this.window) try {
                    this.window.close()
                } catch (e) {}
            }
        }

        function or(e, t, n, r = 500, i = 600) {
            const o = Math.max((window.screen.availHeight - i) / 2, 0).toString(),
                a = Math.max((window.screen.availWidth - r) / 2, 0).toString();
            let c = "";
            const l = Object.assign(Object.assign({}, ir), {
                    width: r.toString(),
                    height: i.toString(),
                    top: o,
                    left: a
                }),
                u = s().toLowerCase();
            n && (c = gt(u) ? "_blank" : n), ft(u) && (t = t || "http://localhost", l.scrollbars = "yes");
            const h = Object.entries(l).reduce(((e, [t, n]) => `${e}${t}=${n},`), "");
            if (function(e = s()) {
                    var t;
                    return bt(e) && !!(null === (t = window.navigator) || void 0 === t ? void 0 : t.standalone)
                }(u) && "_self" !== c) return function(e, t) {
                const n = document.createElement("a");
                n.href = e, n.target = t;
                const r = document.createEvent("MouseEvent");
                r.initMouseEvent("click", !0, !0, window, 1, 0, 0, 0, 0, !1, !1, !1, !1, 1, null), n.dispatchEvent(r)
            }(t || "", c), new sr(null);
            const d = window.open(t || "", c, h);
            De(d, e, "popup-blocked");
            try {
                d.focus()
            } catch (e) {}
            return new sr(d)
        }
        const ar = "__/auth/handler",
            cr = "emulator/auth/handler";

        function lr(e, t, n, r, i, s) {
            De(e.config.authDomain, e, "auth-domain-config-required"), De(e.config.apiKey, e, "invalid-api-key");
            const o = {
                apiKey: e.config.apiKey,
                appName: e.name,
                authType: n,
                redirectUrl: r,
                v: ce,
                eventId: i
            };
            if (t instanceof Ht) {
                t.setDefaultLanguage(e.languageCode), o.providerId = t.providerId || "",
                    function(e) {
                        for (const t in e)
                            if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
                        return !0
                    }(t.getCustomParameters()) || (o.customParameters = JSON.stringify(t.getCustomParameters()));
                for (const [e, t] of Object.entries(s || {})) o[e] = t
            }
            if (t instanceof Bt) {
                const e = t.getScopes().filter((e => "" !== e));
                e.length > 0 && (o.scopes = e.join(","))
            }
            e.tenantId && (o.tid = e.tenantId);
            const a = o;
            for (const e of Object.keys(a)) void 0 === a[e] && delete a[e];
            return `${function({config:e}){if(!e.emulator)return`
            https: //${e.authDomain}/${ar}`;return Be(e,cr)}(e)}?${g(a).slice(1)}`}const ur="webStorageSupport";const hr=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=on,this._completeRedirectFn=Bn,this._overrideRedirectResult=Fn}async _openPopup(e,t,n,r){var i;Le(null===(i=this.eventManagers[e._key()])||void 0===i?void 0:i.manager,"_initialize() not called before _openPopup()");return or(e,lr(e,t,n,xe(),r),cn())}async _openRedirect(e,t,n,r){var i;return await this._originValidation(e),i=lr(e,t,n,xe(),r),un().location.href=i,new Promise((()=>{}))}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(Le(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch((()=>{delete this.eventManagers[t]})),n}async initAndGetManager(e){const t=await async function(e){const t=await Zn(e),n=un().gapi;return De(n,e,"internal-error"),t.open({where:document.body,url:rr(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:tr,dontclear:!0},(t=>new Promise((async(n,r)=>{await t.restyle({setHideOnLeave:!1});const i=Re(e,"network-request-failed"),s=un().setTimeout((()=>{r(i)}),er.get());function o(){un().clearTimeout(s),n(t)}t.ping(o).then(o,(()=>{r(i)}))}))))}(e),n=new zn(e);return t.register("authEvent",(t=>{De(null==t?void 0:t.authEvent,e,"invalid-auth-event");return{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ur,{type:ur},(n=>{var r;const i=null===(r=null==n?void 0:n[0])||void 0===r?void 0:r.webStorageSupport;void 0!==i&&t(!!i),Oe(e,"internal-error")}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Kn(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Tt()||mt()||bt()}};var dr="@firebase/auth",pr="0.20.11";class fr{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),(null===(e=this.auth.currentUser)||void 0===e?void 0:e.uid)||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(e)}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged((t=>{var n;e((null===(n=t)||void 0===n?void 0:n.stsTokenManager.accessToken)||null)}));this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){De(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}const mr=l("authIdTokenMaxAge")||300;let gr=null;function vr(e=function(e="[DEFAULT]"){const t=te.get(e);if(!t&&e===Z)return le();if(!t)throw oe.create("no-app",{appName:e});return t}()){const t=se(e,"auth");if(t.isInitialized())return t.getImmediate();const n=function(e,t){const n=se(e,"auth");if(n.isInitialized()){const e=n.getImmediate();if(f(n.getOptions(),null!=t?t:{}))return e;Oe(e,"already-initialized")}return n.initialize({options:t})}(e,{popupRedirectResolver:hr,persistence:[bn,rn,on]}),r=l("authTokenSyncURL");if(r){const e=(i=r,async e=>{const t=e&&await e.getIdTokenResult(),n=t&&((new Date).getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>mr)return;const r=null==t?void 0:t.token;gr!==r&&(gr=r,await fetch(i,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))});!function(e,t,n){b(e).beforeAuthStateChanged(t,n)}(n,e,(()=>e(n.currentUser))),function(e,t,n,r){b(e).onIdTokenChanged(t,n,r)}(n,(t=>e(t)))}var i;const s=c("auth");return s&&Ct(n,`http://${s}`),n}var _r;_r="Browser",ie(new w("auth",((e,{options:t})=>{const n=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),{apiKey:i,authDomain:s}=n.options;return((e,n)=>{De(i&&!i.includes(":"),"invalid-api-key",{appName:e.name}),De(!(null==s?void 0:s.includes(":")),"argument-error",{appName:e.name});const r={apiKey:i,authDomain:s,clientPlatform:_r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Et(_r)},o=new St(e,n,r);return function(e,t){const n=(null==t?void 0:t.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Ue);(null==t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,null==t?void 0:t.popupRedirectResolver)}(o,t),o})(n,r)}),"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback(((e,t,n)=>{e.getProvider("auth-internal").initialize()}))),ie(new w("auth-internal",(e=>(e=>new fr(e))(Ot(e.getProvider("auth").getImmediate()))),"PRIVATE").setInstantiationMode("EXPLICIT")),ue(dr,pr,function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}(_r)),ue(dr,pr,"esm2017"),(e=>{if(-1!=location.href.indexOf(e.pageDashboard)){le(e.firebaseConfig);const i=vr();t=t=>{if(t){localStorage.setItem("auth_image",t.photoURL);let n=`\n                <div id="auth-true" class="flex w-full flex-col items-center justify-center rounded-lg border border-gray-400 py-3 px-3">\n                    <img src='${t.photoURL}' class='mb-2 rounded-full shadow-md p-2 bg-white w-20 h-20' />\n                    <div class="mb-2 text-2xl font-bold">${t.displayName}</div>\n                    <div class="mb-3 text-gray-500">${t.email}</div>\n                    <button id='button_auth_signout' class="auth_google rounded-md text-white bg-blue-600 appearance-none outline-0 inline-flex items-center justify-center border-none px-3 py-2 cursor-pointer" type='button' aria-label='Logout'><span>Logout</span></button>\n                </div>\n                `;e.container.innerHTML=n,e.container.querySelector("#button_auth_signout").addEventListener("click",(e=>{var t;e.preventDefault(),(t=i,b(t).signOut()).then((()=>{localStorage.removeItem("auth_image")}))}))}else{let t='\n                <div class="flex w-full flex-col items-center justify-center rounded-lg border border-gray-400 py-3 px-3">\n<button id=\'auth_google\' class="auth_google rounded-md text-white bg-blue-600 appearance-none outline-0 inline-flex items-center justify-center border-none px-3 py-2 cursor-pointer" type=\'button\' aria-label=\'Sign in with Google\'><svg class=\'mr-2\' width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" /></svg><span>Sign in with Google</span></button>\n                ';e.container.innerHTML=t,e.container.querySelector(".auth_google").addEventListener("click",(t=>{t.preventDefault();const n=new Wt;Hn(i,n).then((()=>{window.location.href=e.pageDashboard}))}))}},b(i).onAuthStateChanged(t,n,r)}var t,n,r})({firebaseConfig,pageDashboard,container})})();
