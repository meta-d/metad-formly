import{Emitter}from"../common/event.js";import{Disposable}from"../common/lifecycle.js";class WindowManager{constructor(){this._zoomFactor=1}getZoomFactor(){return this._zoomFactor}}WindowManager.INSTANCE=new WindowManager;class DevicePixelRatioMonitor extends Disposable{constructor(){super(),this._onDidChange=this._register(new Emitter),this.onDidChange=this._onDidChange.event,this._listener=()=>this._handleChange(!0),this._mediaQueryList=null,this._handleChange(!1)}_handleChange(fireEvent){this._mediaQueryList&&this._mediaQueryList.removeEventListener("change",this._listener),this._mediaQueryList=matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`),this._mediaQueryList.addEventListener("change",this._listener),fireEvent&&this._onDidChange.fire()}}class PixelRatioImpl extends Disposable{constructor(){super(),this._onDidChange=this._register(new Emitter),this.onDidChange=this._onDidChange.event,this._value=this._getPixelRatio();const dprMonitor=this._register(new DevicePixelRatioMonitor);this._register(dprMonitor.onDidChange((()=>{this._value=this._getPixelRatio(),this._onDidChange.fire(this._value)})))}get value(){return this._value}_getPixelRatio(){const ctx=document.createElement("canvas").getContext("2d");return(window.devicePixelRatio||1)/(ctx.webkitBackingStorePixelRatio||ctx.mozBackingStorePixelRatio||ctx.msBackingStorePixelRatio||ctx.oBackingStorePixelRatio||ctx.backingStorePixelRatio||1)}}class PixelRatioFacade{constructor(){this._pixelRatioMonitor=null}_getOrCreatePixelRatioMonitor(){return this._pixelRatioMonitor||(this._pixelRatioMonitor=new PixelRatioImpl),this._pixelRatioMonitor}get value(){return this._getOrCreatePixelRatioMonitor().value}get onDidChange(){return this._getOrCreatePixelRatioMonitor().onDidChange}}export const PixelRatio=new PixelRatioFacade;export function getZoomFactor(){return WindowManager.INSTANCE.getZoomFactor()}const userAgent=navigator.userAgent;export const isFirefox=userAgent.indexOf("Firefox")>=0;export const isWebKit=userAgent.indexOf("AppleWebKit")>=0;export const isChrome=userAgent.indexOf("Chrome")>=0;export const isSafari=!isChrome&&userAgent.indexOf("Safari")>=0;export const isWebkitWebView=!isChrome&&!isSafari&&isWebKit;export const isElectron=userAgent.indexOf("Electron/")>=0;export const isAndroid=userAgent.indexOf("Android")>=0;export const isStandalone=window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches;