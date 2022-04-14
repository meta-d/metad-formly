var _CodeActionModel_isDisposed,__classPrivateFieldGet=this&&this.__classPrivateFieldGet||function(receiver,state,kind,f){if("a"===kind&&!f)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof state?receiver!==state||!f:!state.has(receiver))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===kind?f:"a"===kind?f.call(receiver):f?f.value:state.get(receiver)},__classPrivateFieldSet=this&&this.__classPrivateFieldSet||function(receiver,state,value,kind,f){if("m"===kind)throw new TypeError("Private method is not writable");if("a"===kind&&!f)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof state?receiver!==state||!f:!state.has(receiver))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===kind?f.call(receiver,value):f?f.value=value:state.set(receiver,value),value};import{createCancelablePromise,TimeoutTimer}from"../../../../base/common/async.js";import{isCancellationError}from"../../../../base/common/errors.js";import{Emitter}from"../../../../base/common/event.js";import{Disposable,MutableDisposable}from"../../../../base/common/lifecycle.js";import{isEqual}from"../../../../base/common/resources.js";import{Range}from"../../../common/core/range.js";import{RawContextKey}from"../../../../platform/contextkey/common/contextkey.js";import{Progress}from"../../../../platform/progress/common/progress.js";import{getCodeActions}from"./codeAction.js";export const SUPPORTED_CODE_ACTIONS=new RawContextKey("supportedCodeAction","");class CodeActionOracle extends Disposable{constructor(_editor,_markerService,_signalChange,_delay=250){super(),this._editor=_editor,this._markerService=_markerService,this._signalChange=_signalChange,this._delay=_delay,this._autoTriggerTimer=this._register(new TimeoutTimer),this._register(this._markerService.onMarkerChanged((e=>this._onMarkerChanges(e)))),this._register(this._editor.onDidChangeCursorPosition((()=>this._onCursorChange())))}trigger(trigger){const selection=this._getRangeOfSelectionUnlessWhitespaceEnclosed(trigger);return this._createEventAndSignalChange(trigger,selection)}_onMarkerChanges(resources){const model=this._editor.getModel();model&&resources.some((resource=>isEqual(resource,model.uri)))&&this._autoTriggerTimer.cancelAndSet((()=>{this.trigger({type:2})}),this._delay)}_onCursorChange(){this._autoTriggerTimer.cancelAndSet((()=>{this.trigger({type:2})}),this._delay)}_getRangeOfMarker(selection){const model=this._editor.getModel();if(model)for(const marker of this._markerService.read({resource:model.uri})){const markerRange=model.validateRange(marker);if(Range.intersectRanges(markerRange,selection))return Range.lift(markerRange)}}_getRangeOfSelectionUnlessWhitespaceEnclosed(trigger){if(!this._editor.hasModel())return;const model=this._editor.getModel(),selection=this._editor.getSelection();if(selection.isEmpty()&&2===trigger.type){const{lineNumber,column}=selection.getPosition(),line=model.getLineContent(lineNumber);if(0===line.length)return;if(1===column){if(/\s/.test(line[0]))return}else if(column===model.getLineMaxColumn(lineNumber)){if(/\s/.test(line[line.length-1]))return}else if(/\s/.test(line[column-2])&&/\s/.test(line[column-1]))return}return selection}_createEventAndSignalChange(trigger,selection){const model=this._editor.getModel();if(!selection||!model)return void this._signalChange(void 0);const markerRange=this._getRangeOfMarker(selection),position=markerRange?markerRange.getStartPosition():selection.getStartPosition(),e={trigger,selection,position};return this._signalChange(e),e}}export var CodeActionsState;!function(CodeActionsState){CodeActionsState.Empty={type:0};CodeActionsState.Triggered=class Triggered{constructor(trigger,rangeOrSelection,position,_cancellablePromise){this.trigger=trigger,this.rangeOrSelection=rangeOrSelection,this.position=position,this._cancellablePromise=_cancellablePromise,this.type=1,this.actions=_cancellablePromise.catch((e=>{if(isCancellationError(e))return emptyCodeActionSet;throw e}))}cancel(){this._cancellablePromise.cancel()}}}(CodeActionsState||(CodeActionsState={}));const emptyCodeActionSet={allActions:[],validActions:[],dispose:()=>{},documentation:[],hasAutoFix:!1};export class CodeActionModel extends Disposable{constructor(_editor,_registry,_markerService,contextKeyService,_progressService){super(),this._editor=_editor,this._registry=_registry,this._markerService=_markerService,this._progressService=_progressService,this._codeActionOracle=this._register(new MutableDisposable),this._state=CodeActionsState.Empty,this._onDidChangeState=this._register(new Emitter),this.onDidChangeState=this._onDidChangeState.event,_CodeActionModel_isDisposed.set(this,!1),this._supportedCodeActions=SUPPORTED_CODE_ACTIONS.bindTo(contextKeyService),this._register(this._editor.onDidChangeModel((()=>this._update()))),this._register(this._editor.onDidChangeModelLanguage((()=>this._update()))),this._register(this._registry.onDidChange((()=>this._update()))),this._update()}dispose(){__classPrivateFieldGet(this,_CodeActionModel_isDisposed,"f")||(__classPrivateFieldSet(this,_CodeActionModel_isDisposed,!0,"f"),super.dispose(),this.setState(CodeActionsState.Empty,!0))}_update(){if(__classPrivateFieldGet(this,_CodeActionModel_isDisposed,"f"))return;this._codeActionOracle.value=void 0,this.setState(CodeActionsState.Empty);const model=this._editor.getModel();if(model&&this._registry.has(model)&&!this._editor.getOption(81)){const supportedActions=[];for(const provider of this._registry.all(model))Array.isArray(provider.providedCodeActionKinds)&&supportedActions.push(...provider.providedCodeActionKinds);this._supportedCodeActions.set(supportedActions.join(" ")),this._codeActionOracle.value=new CodeActionOracle(this._editor,this._markerService,(trigger=>{var _a;if(!trigger)return void this.setState(CodeActionsState.Empty);const actions=createCancelablePromise((token=>getCodeActions(this._registry,model,trigger.selection,trigger.trigger,Progress.None,token)));1===trigger.trigger.type&&(null===(_a=this._progressService)||void 0===_a||_a.showWhile(actions,250)),this.setState(new CodeActionsState.Triggered(trigger.trigger,trigger.selection,trigger.position,actions))}),void 0),this._codeActionOracle.value.trigger({type:2})}else this._supportedCodeActions.reset()}trigger(trigger){this._codeActionOracle.value&&this._codeActionOracle.value.trigger(trigger)}setState(newState,skipNotify){newState!==this._state&&(1===this._state.type&&this._state.cancel(),this._state=newState,skipNotify||__classPrivateFieldGet(this,_CodeActionModel_isDisposed,"f")||this._onDidChangeState.fire(newState))}}_CodeActionModel_isDisposed=new WeakMap;