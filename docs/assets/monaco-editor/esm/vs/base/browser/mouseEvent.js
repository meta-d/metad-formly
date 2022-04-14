import*as browser from"./browser.js";import{IframeUtils}from"./iframe.js";import*as platform from"../common/platform.js";export class StandardMouseEvent{constructor(e){this.timestamp=Date.now(),this.browserEvent=e,this.leftButton=0===e.button,this.middleButton=1===e.button,this.rightButton=2===e.button,this.buttons=e.buttons,this.target=e.target,this.detail=e.detail||1,"dblclick"===e.type&&(this.detail=2),this.ctrlKey=e.ctrlKey,this.shiftKey=e.shiftKey,this.altKey=e.altKey,this.metaKey=e.metaKey,"number"==typeof e.pageX?(this.posx=e.pageX,this.posy=e.pageY):(this.posx=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,this.posy=e.clientY+document.body.scrollTop+document.documentElement.scrollTop);let iframeOffsets=IframeUtils.getPositionOfChildWindowRelativeToAncestorWindow(self,e.view);this.posx-=iframeOffsets.left,this.posy-=iframeOffsets.top}preventDefault(){this.browserEvent.preventDefault()}stopPropagation(){this.browserEvent.stopPropagation()}}export class StandardWheelEvent{constructor(e,deltaX=0,deltaY=0){if(this.browserEvent=e||null,this.target=e?e.target||e.targetNode||e.srcElement:null,this.deltaY=deltaY,this.deltaX=deltaX,e){let e1=e,e2=e;if(void 0!==e1.wheelDeltaY)this.deltaY=e1.wheelDeltaY/120;else if(void 0!==e2.VERTICAL_AXIS&&e2.axis===e2.VERTICAL_AXIS)this.deltaY=-e2.detail/3;else if("wheel"===e.type){const ev=e;ev.deltaMode===ev.DOM_DELTA_LINE?browser.isFirefox&&!platform.isMacintosh?this.deltaY=-e.deltaY/3:this.deltaY=-e.deltaY:this.deltaY=-e.deltaY/40}if(void 0!==e1.wheelDeltaX)browser.isSafari&&platform.isWindows?this.deltaX=-e1.wheelDeltaX/120:this.deltaX=e1.wheelDeltaX/120;else if(void 0!==e2.HORIZONTAL_AXIS&&e2.axis===e2.HORIZONTAL_AXIS)this.deltaX=-e.detail/3;else if("wheel"===e.type){const ev=e;ev.deltaMode===ev.DOM_DELTA_LINE?browser.isFirefox&&!platform.isMacintosh?this.deltaX=-e.deltaX/3:this.deltaX=-e.deltaX:this.deltaX=-e.deltaX/40}0===this.deltaY&&0===this.deltaX&&e.wheelDelta&&(this.deltaY=e.wheelDelta/120)}}preventDefault(){this.browserEvent&&this.browserEvent.preventDefault()}stopPropagation(){this.browserEvent&&this.browserEvent.stopPropagation()}}