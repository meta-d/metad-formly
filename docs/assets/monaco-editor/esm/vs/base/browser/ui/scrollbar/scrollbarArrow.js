import{GlobalMouseMoveMonitor,standardMouseMoveMerger}from"../../globalMouseMoveMonitor.js";import{Widget}from"../widget.js";import{IntervalTimer,TimeoutTimer}from"../../../common/async.js";export const ARROW_IMG_SIZE=11;export class ScrollbarArrow extends Widget{constructor(opts){super(),this._onActivate=opts.onActivate,this.bgDomNode=document.createElement("div"),this.bgDomNode.className="arrow-background",this.bgDomNode.style.position="absolute",this.bgDomNode.style.width=opts.bgWidth+"px",this.bgDomNode.style.height=opts.bgHeight+"px",void 0!==opts.top&&(this.bgDomNode.style.top="0px"),void 0!==opts.left&&(this.bgDomNode.style.left="0px"),void 0!==opts.bottom&&(this.bgDomNode.style.bottom="0px"),void 0!==opts.right&&(this.bgDomNode.style.right="0px"),this.domNode=document.createElement("div"),this.domNode.className=opts.className,this.domNode.classList.add(...opts.icon.classNamesArray),this.domNode.style.position="absolute",this.domNode.style.width="11px",this.domNode.style.height="11px",void 0!==opts.top&&(this.domNode.style.top=opts.top+"px"),void 0!==opts.left&&(this.domNode.style.left=opts.left+"px"),void 0!==opts.bottom&&(this.domNode.style.bottom=opts.bottom+"px"),void 0!==opts.right&&(this.domNode.style.right=opts.right+"px"),this._mouseMoveMonitor=this._register(new GlobalMouseMoveMonitor),this.onmousedown(this.bgDomNode,(e=>this._arrowMouseDown(e))),this.onmousedown(this.domNode,(e=>this._arrowMouseDown(e))),this._mousedownRepeatTimer=this._register(new IntervalTimer),this._mousedownScheduleRepeatTimer=this._register(new TimeoutTimer)}_arrowMouseDown(e){this._onActivate(),this._mousedownRepeatTimer.cancel(),this._mousedownScheduleRepeatTimer.cancelAndSet((()=>{this._mousedownRepeatTimer.cancelAndSet((()=>this._onActivate()),1e3/24)}),200),this._mouseMoveMonitor.startMonitoring(e.target,e.buttons,standardMouseMoveMerger,(mouseMoveData=>{}),(()=>{this._mousedownRepeatTimer.cancel(),this._mousedownScheduleRepeatTimer.cancel()})),e.preventDefault()}}