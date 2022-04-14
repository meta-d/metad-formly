import{Disposable,DisposableStore,toDisposable}from"../../../../base/common/lifecycle.js";import{getCodeEditor}from"../../../browser/editorBrowser.js";import{AbstractEditorNavigationQuickAccessProvider}from"./editorNavigationQuickAccess.js";import{localize}from"../../../../nls.js";export class AbstractGotoLineQuickAccessProvider extends AbstractEditorNavigationQuickAccessProvider{constructor(){super({canAcceptInBackground:!0})}provideWithoutTextEditor(picker){const label=localize("cannotRunGotoLine","Open a text editor first to go to a line.");return picker.items=[{label}],picker.ariaLabel=label,Disposable.None}provideWithTextEditor(context,picker,token){const editor=context.editor,disposables=new DisposableStore;disposables.add(picker.onDidAccept((event=>{const[item]=picker.selectedItems;if(item){if(!this.isValidLineNumber(editor,item.lineNumber))return;this.gotoLocation(context,{range:this.toRange(item.lineNumber,item.column),keyMods:picker.keyMods,preserveFocus:event.inBackground}),event.inBackground||picker.hide()}})));const updatePickerAndEditor=()=>{const position=this.parsePosition(editor,picker.value.trim().substr(AbstractGotoLineQuickAccessProvider.PREFIX.length)),label=this.getPickLabel(editor,position.lineNumber,position.column);if(picker.items=[{lineNumber:position.lineNumber,column:position.column,label}],picker.ariaLabel=label,!this.isValidLineNumber(editor,position.lineNumber))return void this.clearDecorations(editor);const range=this.toRange(position.lineNumber,position.column);editor.revealRangeInCenter(range,0),this.addDecorations(editor,range)};updatePickerAndEditor(),disposables.add(picker.onDidChangeValue((()=>updatePickerAndEditor())));const codeEditor=getCodeEditor(editor);if(codeEditor){2===codeEditor.getOptions().get(60).renderType&&(codeEditor.updateOptions({lineNumbers:"on"}),disposables.add(toDisposable((()=>codeEditor.updateOptions({lineNumbers:"relative"})))))}return disposables}toRange(lineNumber=1,column=1){return{startLineNumber:lineNumber,startColumn:column,endLineNumber:lineNumber,endColumn:column}}parsePosition(editor,value){const numbers=value.split(/,|:|#/).map((part=>parseInt(part,10))).filter((part=>!isNaN(part))),endLine=this.lineCount(editor)+1;return{lineNumber:numbers[0]>0?numbers[0]:endLine+numbers[0],column:numbers[1]}}getPickLabel(editor,lineNumber,column){if(this.isValidLineNumber(editor,lineNumber))return this.isValidColumn(editor,lineNumber,column)?localize("gotoLineColumnLabel","Go to line {0} and character {1}.",lineNumber,column):localize("gotoLineLabel","Go to line {0}.",lineNumber);const position=editor.getPosition()||{lineNumber:1,column:1},lineCount=this.lineCount(editor);return lineCount>1?localize("gotoLineLabelEmptyWithLimit","Current Line: {0}, Character: {1}. Type a line number between 1 and {2} to navigate to.",position.lineNumber,position.column,lineCount):localize("gotoLineLabelEmpty","Current Line: {0}, Character: {1}. Type a line number to navigate to.",position.lineNumber,position.column)}isValidLineNumber(editor,lineNumber){return!(!lineNumber||"number"!=typeof lineNumber)&&(lineNumber>0&&lineNumber<=this.lineCount(editor))}isValidColumn(editor,lineNumber,column){if(!column||"number"!=typeof column)return!1;const model=this.getModel(editor);if(!model)return!1;const positionCandidate={lineNumber,column};return model.validatePosition(positionCandidate).equals(positionCandidate)}lineCount(editor){var _a,_b;return null!==(_b=null===(_a=this.getModel(editor))||void 0===_a?void 0:_a.getLineCount())&&void 0!==_b?_b:0}}AbstractGotoLineQuickAccessProvider.PREFIX=":";