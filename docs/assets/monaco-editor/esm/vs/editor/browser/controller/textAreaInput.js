import*as browser from"../../../base/browser/browser.js";import*as dom from"../../../base/browser/dom.js";import{StandardKeyboardEvent}from"../../../base/browser/keyboardEvent.js";import{RunOnceScheduler}from"../../../base/common/async.js";import{Emitter}from"../../../base/common/event.js";import{Disposable}from"../../../base/common/lifecycle.js";import{Mimes}from"../../../base/common/mime.js";import*as strings from"../../../base/common/strings.js";import{TextAreaState,_debugComposition}from"./textAreaState.js";import{Selection}from"../../common/core/selection.js";export var TextAreaSyntethicEvents;!function(TextAreaSyntethicEvents){TextAreaSyntethicEvents.Tap="-monaco-textarea-synthetic-tap"}(TextAreaSyntethicEvents||(TextAreaSyntethicEvents={}));export const CopyOptions={forceCopyWithSyntaxHighlighting:!1};export class InMemoryClipboardMetadataManager{constructor(){this._lastState=null}set(lastCopiedValue,data){this._lastState={lastCopiedValue,data}}get(pastedText){return this._lastState&&this._lastState.lastCopiedValue===pastedText?this._lastState.data:(this._lastState=null,null)}}InMemoryClipboardMetadataManager.INSTANCE=new InMemoryClipboardMetadataManager;class CompositionContext{constructor(){this._lastTypeTextLength=0}handleCompositionUpdate(text){const typeInput={text:text=text||"",replacePrevCharCnt:this._lastTypeTextLength,replaceNextCharCnt:0,positionDelta:0};return this._lastTypeTextLength=text.length,typeInput}}export class TextAreaInput extends Disposable{constructor(_host,_textArea,_OS,_browser){super(),this._host=_host,this._textArea=_textArea,this._OS=_OS,this._browser=_browser,this._onFocus=this._register(new Emitter),this.onFocus=this._onFocus.event,this._onBlur=this._register(new Emitter),this.onBlur=this._onBlur.event,this._onKeyDown=this._register(new Emitter),this.onKeyDown=this._onKeyDown.event,this._onKeyUp=this._register(new Emitter),this.onKeyUp=this._onKeyUp.event,this._onCut=this._register(new Emitter),this.onCut=this._onCut.event,this._onPaste=this._register(new Emitter),this.onPaste=this._onPaste.event,this._onType=this._register(new Emitter),this.onType=this._onType.event,this._onCompositionStart=this._register(new Emitter),this.onCompositionStart=this._onCompositionStart.event,this._onCompositionUpdate=this._register(new Emitter),this.onCompositionUpdate=this._onCompositionUpdate.event,this._onCompositionEnd=this._register(new Emitter),this.onCompositionEnd=this._onCompositionEnd.event,this._onSelectionChangeRequest=this._register(new Emitter),this.onSelectionChangeRequest=this._onSelectionChangeRequest.event,this._asyncTriggerCut=this._register(new RunOnceScheduler((()=>this._onCut.fire()),0)),this._asyncFocusGainWriteScreenReaderContent=this._register(new RunOnceScheduler((()=>this.writeScreenReaderContent("asyncFocusGain")),0)),this._textAreaState=TextAreaState.EMPTY,this._selectionChangeListener=null,this.writeScreenReaderContent("ctor"),this._hasFocus=!1,this._currentComposition=null;let lastKeyDown=null;this._register(this._textArea.onKeyDown((_e=>{const e=new StandardKeyboardEvent(_e);(109===e.keyCode||this._currentComposition&&1===e.keyCode)&&e.stopPropagation(),e.equals(9)&&e.preventDefault(),lastKeyDown=e,this._onKeyDown.fire(e)}))),this._register(this._textArea.onKeyUp((_e=>{const e=new StandardKeyboardEvent(_e);this._onKeyUp.fire(e)}))),this._register(this._textArea.onCompositionStart((e=>{_debugComposition&&console.log("[compositionstart]",e);const currentComposition=new CompositionContext;if(this._currentComposition)this._currentComposition=currentComposition;else{if(this._currentComposition=currentComposition,2===this._OS&&lastKeyDown&&lastKeyDown.equals(109)&&this._textAreaState.selectionStart===this._textAreaState.selectionEnd&&this._textAreaState.selectionStart>0&&this._textAreaState.value.substr(this._textAreaState.selectionStart-1,1)===e.data&&("ArrowRight"===lastKeyDown.code||"ArrowLeft"===lastKeyDown.code))return _debugComposition&&console.log("[compositionstart] Handling long press case on macOS + arrow key",e),currentComposition.handleCompositionUpdate("x"),void this._onCompositionStart.fire({data:e.data});this._browser.isAndroid,this._onCompositionStart.fire({data:e.data})}}))),this._register(this._textArea.onCompositionUpdate((e=>{_debugComposition&&console.log("[compositionupdate]",e);const currentComposition=this._currentComposition;if(!currentComposition)return;if(this._browser.isAndroid){const newState=TextAreaState.readFromTextArea(this._textArea),typeInput=TextAreaState.deduceAndroidCompositionInput(this._textAreaState,newState);return this._textAreaState=newState,this._onType.fire(typeInput),void this._onCompositionUpdate.fire(e)}const typeInput=currentComposition.handleCompositionUpdate(e.data);this._textAreaState=TextAreaState.readFromTextArea(this._textArea),this._onType.fire(typeInput),this._onCompositionUpdate.fire(e)}))),this._register(this._textArea.onCompositionEnd((e=>{_debugComposition&&console.log("[compositionend]",e);const currentComposition=this._currentComposition;if(!currentComposition)return;if(this._currentComposition=null,this._browser.isAndroid){const newState=TextAreaState.readFromTextArea(this._textArea),typeInput=TextAreaState.deduceAndroidCompositionInput(this._textAreaState,newState);return this._textAreaState=newState,this._onType.fire(typeInput),void this._onCompositionEnd.fire()}const typeInput=currentComposition.handleCompositionUpdate(e.data);this._textAreaState=TextAreaState.readFromTextArea(this._textArea),this._onType.fire(typeInput),this._onCompositionEnd.fire()}))),this._register(this._textArea.onInput((e=>{if(_debugComposition&&console.log("[input]",e),this._textArea.setIgnoreSelectionChangeTime("received input event"),this._currentComposition)return;const newState=TextAreaState.readFromTextArea(this._textArea),typeInput=TextAreaState.deduceInput(this._textAreaState,newState,2===this._OS);0===typeInput.replacePrevCharCnt&&1===typeInput.text.length&&strings.isHighSurrogate(typeInput.text.charCodeAt(0))||(this._textAreaState=newState,""===typeInput.text&&0===typeInput.replacePrevCharCnt&&0===typeInput.replaceNextCharCnt&&0===typeInput.positionDelta||this._onType.fire(typeInput))}))),this._register(this._textArea.onCut((e=>{this._textArea.setIgnoreSelectionChangeTime("received cut event"),this._ensureClipboardGetsEditorSelection(e),this._asyncTriggerCut.schedule()}))),this._register(this._textArea.onCopy((e=>{this._ensureClipboardGetsEditorSelection(e)}))),this._register(this._textArea.onPaste((e=>{if(this._textArea.setIgnoreSelectionChangeTime("received paste event"),e.preventDefault(),!e.clipboardData)return;let[text,metadata]=ClipboardEventUtils.getTextData(e.clipboardData);text&&(metadata=metadata||InMemoryClipboardMetadataManager.INSTANCE.get(text),this._onPaste.fire({text,metadata}))}))),this._register(this._textArea.onFocus((()=>{const hadFocus=this._hasFocus;this._setHasFocus(!0),this._browser.isSafari&&!hadFocus&&this._hasFocus&&this._asyncFocusGainWriteScreenReaderContent.schedule()}))),this._register(this._textArea.onBlur((()=>{this._currentComposition&&(this._currentComposition=null,this.writeScreenReaderContent("blurWithoutCompositionEnd"),this._onCompositionEnd.fire()),this._setHasFocus(!1)}))),this._register(this._textArea.onSyntheticTap((()=>{this._browser.isAndroid&&this._currentComposition&&(this._currentComposition=null,this.writeScreenReaderContent("tapWithoutCompositionEnd"),this._onCompositionEnd.fire())})))}_installSelectionChangeListener(){let previousSelectionChangeEventTime=0;return dom.addDisposableListener(document,"selectionchange",(e=>{if(!this._hasFocus)return;if(this._currentComposition)return;if(!this._browser.isChrome)return;const now=Date.now(),delta1=now-previousSelectionChangeEventTime;if(previousSelectionChangeEventTime=now,delta1<5)return;const delta2=now-this._textArea.getIgnoreSelectionChangeTime();if(this._textArea.resetSelectionChangeTime(),delta2<100)return;if(!this._textAreaState.selectionStartPosition||!this._textAreaState.selectionEndPosition)return;const newValue=this._textArea.getValue();if(this._textAreaState.value!==newValue)return;const newSelectionStart=this._textArea.getSelectionStart(),newSelectionEnd=this._textArea.getSelectionEnd();if(this._textAreaState.selectionStart===newSelectionStart&&this._textAreaState.selectionEnd===newSelectionEnd)return;const _newSelectionStartPosition=this._textAreaState.deduceEditorPosition(newSelectionStart),newSelectionStartPosition=this._host.deduceModelPosition(_newSelectionStartPosition[0],_newSelectionStartPosition[1],_newSelectionStartPosition[2]),_newSelectionEndPosition=this._textAreaState.deduceEditorPosition(newSelectionEnd),newSelectionEndPosition=this._host.deduceModelPosition(_newSelectionEndPosition[0],_newSelectionEndPosition[1],_newSelectionEndPosition[2]),newSelection=new Selection(newSelectionStartPosition.lineNumber,newSelectionStartPosition.column,newSelectionEndPosition.lineNumber,newSelectionEndPosition.column);this._onSelectionChangeRequest.fire(newSelection)}))}dispose(){super.dispose(),this._selectionChangeListener&&(this._selectionChangeListener.dispose(),this._selectionChangeListener=null)}focusTextArea(){this._setHasFocus(!0),this.refreshFocusState()}isFocused(){return this._hasFocus}refreshFocusState(){this._setHasFocus(this._textArea.hasFocus())}_setHasFocus(newHasFocus){this._hasFocus!==newHasFocus&&(this._hasFocus=newHasFocus,this._selectionChangeListener&&(this._selectionChangeListener.dispose(),this._selectionChangeListener=null),this._hasFocus&&(this._selectionChangeListener=this._installSelectionChangeListener()),this._hasFocus&&this.writeScreenReaderContent("focusgain"),this._hasFocus?this._onFocus.fire():this._onBlur.fire())}_setAndWriteTextAreaState(reason,textAreaState){this._hasFocus||(textAreaState=textAreaState.collapseSelection()),textAreaState.writeToTextArea(reason,this._textArea,this._hasFocus),this._textAreaState=textAreaState}writeScreenReaderContent(reason){this._currentComposition||this._setAndWriteTextAreaState(reason,this._host.getScreenReaderContent(this._textAreaState))}_ensureClipboardGetsEditorSelection(e){const dataToCopy=this._host.getDataToCopy(),storedMetadata={version:1,isFromEmptySelection:dataToCopy.isFromEmptySelection,multicursorText:dataToCopy.multicursorText,mode:dataToCopy.mode};InMemoryClipboardMetadataManager.INSTANCE.set(this._browser.isFirefox?dataToCopy.text.replace(/\r\n/g,"\n"):dataToCopy.text,storedMetadata),e.preventDefault(),e.clipboardData&&ClipboardEventUtils.setTextData(e.clipboardData,dataToCopy.text,dataToCopy.html,storedMetadata)}}class ClipboardEventUtils{static getTextData(clipboardData){const text=clipboardData.getData(Mimes.text);let metadata=null;const rawmetadata=clipboardData.getData("vscode-editor-data");if("string"==typeof rawmetadata)try{metadata=JSON.parse(rawmetadata),1!==metadata.version&&(metadata=null)}catch(err){}return[text,metadata]}static setTextData(clipboardData,text,html,metadata){clipboardData.setData(Mimes.text,text),"string"==typeof html&&clipboardData.setData("text/html",html),clipboardData.setData("vscode-editor-data",JSON.stringify(metadata))}}export class TextAreaWrapper extends Disposable{constructor(_actual){super(),this._actual=_actual,this.onKeyDown=this._register(dom.createEventEmitter(this._actual,"keydown")).event,this.onKeyUp=this._register(dom.createEventEmitter(this._actual,"keyup")).event,this.onCompositionStart=this._register(dom.createEventEmitter(this._actual,"compositionstart")).event,this.onCompositionUpdate=this._register(dom.createEventEmitter(this._actual,"compositionupdate")).event,this.onCompositionEnd=this._register(dom.createEventEmitter(this._actual,"compositionend")).event,this.onInput=this._register(dom.createEventEmitter(this._actual,"input")).event,this.onCut=this._register(dom.createEventEmitter(this._actual,"cut")).event,this.onCopy=this._register(dom.createEventEmitter(this._actual,"copy")).event,this.onPaste=this._register(dom.createEventEmitter(this._actual,"paste")).event,this.onFocus=this._register(dom.createEventEmitter(this._actual,"focus")).event,this.onBlur=this._register(dom.createEventEmitter(this._actual,"blur")).event,this._onSyntheticTap=this._register(new Emitter),this.onSyntheticTap=this._onSyntheticTap.event,this._ignoreSelectionChangeTime=0,this._register(dom.addDisposableListener(this._actual,TextAreaSyntethicEvents.Tap,(()=>this._onSyntheticTap.fire())))}hasFocus(){const shadowRoot=dom.getShadowRoot(this._actual);return shadowRoot?shadowRoot.activeElement===this._actual:!!dom.isInDOM(this._actual)&&document.activeElement===this._actual}setIgnoreSelectionChangeTime(reason){this._ignoreSelectionChangeTime=Date.now()}getIgnoreSelectionChangeTime(){return this._ignoreSelectionChangeTime}resetSelectionChangeTime(){this._ignoreSelectionChangeTime=0}getValue(){return this._actual.value}setValue(reason,value){const textArea=this._actual;textArea.value!==value&&(this.setIgnoreSelectionChangeTime("setValue"),textArea.value=value)}getSelectionStart(){return"backward"===this._actual.selectionDirection?this._actual.selectionEnd:this._actual.selectionStart}getSelectionEnd(){return"backward"===this._actual.selectionDirection?this._actual.selectionStart:this._actual.selectionEnd}setSelectionRange(reason,selectionStart,selectionEnd){const textArea=this._actual;let activeElement=null;const shadowRoot=dom.getShadowRoot(textArea);activeElement=shadowRoot?shadowRoot.activeElement:document.activeElement;const currentIsFocused=activeElement===textArea,currentSelectionStart=textArea.selectionStart,currentSelectionEnd=textArea.selectionEnd;if(currentIsFocused&&currentSelectionStart===selectionStart&&currentSelectionEnd===selectionEnd)browser.isFirefox&&window.parent!==window&&textArea.focus();else{if(currentIsFocused)return this.setIgnoreSelectionChangeTime("setSelectionRange"),textArea.setSelectionRange(selectionStart,selectionEnd),void(browser.isFirefox&&window.parent!==window&&textArea.focus());try{const scrollState=dom.saveParentsScrollTop(textArea);this.setIgnoreSelectionChangeTime("setSelectionRange"),textArea.focus(),textArea.setSelectionRange(selectionStart,selectionEnd),dom.restoreParentsScrollTop(textArea,scrollState)}catch(e){}}}}