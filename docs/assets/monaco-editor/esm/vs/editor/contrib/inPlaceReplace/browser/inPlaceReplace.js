var __decorate=this&&this.__decorate||function(decorators,target,key,desc){var d,c=arguments.length,r=c<3?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)(d=decorators[i])&&(r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r);return c>3&&r&&Object.defineProperty(target,key,r),r},__param=this&&this.__param||function(paramIndex,decorator){return function(target,key){decorator(target,key,paramIndex)}};import{createCancelablePromise,timeout}from"../../../../base/common/async.js";import{onUnexpectedError}from"../../../../base/common/errors.js";import{EditorState}from"../../editorState/browser/editorState.js";import{EditorAction,registerEditorAction,registerEditorContribution}from"../../../browser/editorExtensions.js";import{Range}from"../../../common/core/range.js";import{Selection}from"../../../common/core/selection.js";import{EditorContextKeys}from"../../../common/editorContextKeys.js";import{ModelDecorationOptions}from"../../../common/model/textModel.js";import{IEditorWorkerService}from"../../../common/services/editorWorker.js";import{editorBracketMatchBorder}from"../../../common/core/editorColorRegistry.js";import*as nls from"../../../../nls.js";import{registerThemingParticipant}from"../../../../platform/theme/common/themeService.js";import{InPlaceReplaceCommand}from"./inPlaceReplaceCommand.js";let InPlaceReplaceController=class InPlaceReplaceController{constructor(editor,editorWorkerService){this.decorationIds=[],this.editor=editor,this.editorWorkerService=editorWorkerService}static get(editor){return editor.getContribution(InPlaceReplaceController.ID)}dispose(){}run(source,up){this.currentRequest&&this.currentRequest.cancel();const editorSelection=this.editor.getSelection(),model=this.editor.getModel();if(!model||!editorSelection)return;let selection=editorSelection;if(selection.startLineNumber!==selection.endLineNumber)return;const state=new EditorState(this.editor,5),modelURI=model.uri;return this.editorWorkerService.canNavigateValueSet(modelURI)?(this.currentRequest=createCancelablePromise((token=>this.editorWorkerService.navigateValueSet(modelURI,selection,up))),this.currentRequest.then((result=>{if(!result||!result.range||!result.value)return;if(!state.validate(this.editor))return;let editRange=Range.lift(result.range),highlightRange=result.range,diff=result.value.length-(selection.endColumn-selection.startColumn);highlightRange={startLineNumber:highlightRange.startLineNumber,startColumn:highlightRange.startColumn,endLineNumber:highlightRange.endLineNumber,endColumn:highlightRange.startColumn+result.value.length},diff>1&&(selection=new Selection(selection.startLineNumber,selection.startColumn,selection.endLineNumber,selection.endColumn+diff-1));const command=new InPlaceReplaceCommand(editRange,selection,result.value);this.editor.pushUndoStop(),this.editor.executeCommand(source,command),this.editor.pushUndoStop(),this.decorationIds=this.editor.deltaDecorations(this.decorationIds,[{range:highlightRange,options:InPlaceReplaceController.DECORATION}]),this.decorationRemover&&this.decorationRemover.cancel(),this.decorationRemover=timeout(350),this.decorationRemover.then((()=>this.decorationIds=this.editor.deltaDecorations(this.decorationIds,[]))).catch(onUnexpectedError)})).catch(onUnexpectedError)):Promise.resolve(void 0)}};InPlaceReplaceController.ID="editor.contrib.inPlaceReplaceController",InPlaceReplaceController.DECORATION=ModelDecorationOptions.register({description:"in-place-replace",className:"valueSetReplacement"}),InPlaceReplaceController=__decorate([__param(1,IEditorWorkerService)],InPlaceReplaceController);class InPlaceReplaceUp extends EditorAction{constructor(){super({id:"editor.action.inPlaceReplace.up",label:nls.localize("InPlaceReplaceAction.previous.label","Replace with Previous Value"),alias:"Replace with Previous Value",precondition:EditorContextKeys.writable,kbOpts:{kbExpr:EditorContextKeys.editorTextFocus,primary:3154,weight:100}})}run(accessor,editor){const controller=InPlaceReplaceController.get(editor);return controller?controller.run(this.id,!0):Promise.resolve(void 0)}}class InPlaceReplaceDown extends EditorAction{constructor(){super({id:"editor.action.inPlaceReplace.down",label:nls.localize("InPlaceReplaceAction.next.label","Replace with Next Value"),alias:"Replace with Next Value",precondition:EditorContextKeys.writable,kbOpts:{kbExpr:EditorContextKeys.editorTextFocus,primary:3156,weight:100}})}run(accessor,editor){const controller=InPlaceReplaceController.get(editor);return controller?controller.run(this.id,!1):Promise.resolve(void 0)}}registerEditorContribution(InPlaceReplaceController.ID,InPlaceReplaceController),registerEditorAction(InPlaceReplaceUp),registerEditorAction(InPlaceReplaceDown),registerThemingParticipant(((theme,collector)=>{const border=theme.getColor(editorBracketMatchBorder);border&&collector.addRule(`.monaco-editor.vs .valueSetReplacement { outline: solid 2px ${border}; }`)}));