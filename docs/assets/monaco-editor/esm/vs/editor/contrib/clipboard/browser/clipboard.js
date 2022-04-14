var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){result.done?resolve(result.value):function adopt(value){return value instanceof P?value:new P((function(resolve){resolve(value)}))}(result.value).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))};import*as browser from"../../../../base/browser/browser.js";import*as platform from"../../../../base/common/platform.js";import{CopyOptions,InMemoryClipboardMetadataManager}from"../../../browser/controller/textAreaInput.js";import{EditorAction,MultiCommand,registerEditorAction}from"../../../browser/editorExtensions.js";import{ICodeEditorService}from"../../../browser/services/codeEditorService.js";import{EditorContextKeys}from"../../../common/editorContextKeys.js";import*as nls from"../../../../nls.js";import{MenuId,MenuRegistry}from"../../../../platform/actions/common/actions.js";import{IClipboardService}from"../../../../platform/clipboard/common/clipboardService.js";const CLIPBOARD_CONTEXT_MENU_GROUP="9_cutcopypaste",supportsCut=platform.isNative||document.queryCommandSupported("cut"),supportsCopy=platform.isNative||document.queryCommandSupported("copy"),supportsPaste=void 0!==navigator.clipboard&&!browser.isFirefox||document.queryCommandSupported("paste");function registerCommand(command){return command.register(),command}export const CutAction=supportsCut?registerCommand(new MultiCommand({id:"editor.action.clipboardCutAction",precondition:void 0,kbOpts:platform.isNative?{primary:2102,win:{primary:2102,secondary:[1044]},weight:100}:void 0,menuOpts:[{menuId:MenuId.MenubarEditMenu,group:"2_ccp",title:nls.localize({key:"miCut",comment:["&& denotes a mnemonic"]},"Cu&&t"),order:1},{menuId:MenuId.EditorContext,group:"9_cutcopypaste",title:nls.localize("actions.clipboard.cutLabel","Cut"),when:EditorContextKeys.writable,order:1},{menuId:MenuId.CommandPalette,group:"",title:nls.localize("actions.clipboard.cutLabel","Cut"),order:1},{menuId:MenuId.SimpleEditorContext,group:"9_cutcopypaste",title:nls.localize("actions.clipboard.cutLabel","Cut"),when:EditorContextKeys.writable,order:1}]})):void 0;export const CopyAction=supportsCopy?registerCommand(new MultiCommand({id:"editor.action.clipboardCopyAction",precondition:void 0,kbOpts:platform.isNative?{primary:2081,win:{primary:2081,secondary:[2067]},weight:100}:void 0,menuOpts:[{menuId:MenuId.MenubarEditMenu,group:"2_ccp",title:nls.localize({key:"miCopy",comment:["&& denotes a mnemonic"]},"&&Copy"),order:2},{menuId:MenuId.EditorContext,group:"9_cutcopypaste",title:nls.localize("actions.clipboard.copyLabel","Copy"),order:2},{menuId:MenuId.CommandPalette,group:"",title:nls.localize("actions.clipboard.copyLabel","Copy"),order:1},{menuId:MenuId.SimpleEditorContext,group:"9_cutcopypaste",title:nls.localize("actions.clipboard.copyLabel","Copy"),order:2}]})):void 0;MenuRegistry.appendMenuItem(MenuId.MenubarEditMenu,{submenu:MenuId.MenubarCopy,title:{value:nls.localize("copy as","Copy As"),original:"Copy As"},group:"2_ccp",order:3}),MenuRegistry.appendMenuItem(MenuId.EditorContext,{submenu:MenuId.EditorContextCopy,title:{value:nls.localize("copy as","Copy As"),original:"Copy As"},group:"9_cutcopypaste",order:3});export const PasteAction=supportsPaste?registerCommand(new MultiCommand({id:"editor.action.clipboardPasteAction",precondition:void 0,kbOpts:platform.isNative?{primary:2100,win:{primary:2100,secondary:[1043]},linux:{primary:2100,secondary:[1043]},weight:100}:void 0,menuOpts:[{menuId:MenuId.MenubarEditMenu,group:"2_ccp",title:nls.localize({key:"miPaste",comment:["&& denotes a mnemonic"]},"&&Paste"),order:4},{menuId:MenuId.EditorContext,group:"9_cutcopypaste",title:nls.localize("actions.clipboard.pasteLabel","Paste"),when:EditorContextKeys.writable,order:4},{menuId:MenuId.CommandPalette,group:"",title:nls.localize("actions.clipboard.pasteLabel","Paste"),order:1},{menuId:MenuId.SimpleEditorContext,group:"9_cutcopypaste",title:nls.localize("actions.clipboard.pasteLabel","Paste"),when:EditorContextKeys.writable,order:4}]})):void 0;class ExecCommandCopyWithSyntaxHighlightingAction extends EditorAction{constructor(){super({id:"editor.action.clipboardCopyWithSyntaxHighlightingAction",label:nls.localize("actions.clipboard.copyWithSyntaxHighlightingLabel","Copy With Syntax Highlighting"),alias:"Copy With Syntax Highlighting",precondition:void 0,kbOpts:{kbExpr:EditorContextKeys.textInputFocus,primary:0,weight:100}})}run(accessor,editor){if(!editor.hasModel())return;!editor.getOption(32)&&editor.getSelection().isEmpty()||(CopyOptions.forceCopyWithSyntaxHighlighting=!0,editor.focus(),document.execCommand("copy"),CopyOptions.forceCopyWithSyntaxHighlighting=!1)}}function registerExecCommandImpl(target,browserCommand){target&&(target.addImplementation(1e4,"code-editor",((accessor,args)=>{const focusedEditor=accessor.get(ICodeEditorService).getFocusedCodeEditor();if(focusedEditor&&focusedEditor.hasTextFocus()){const emptySelectionClipboard=focusedEditor.getOption(32),selection=focusedEditor.getSelection();return selection&&selection.isEmpty()&&!emptySelectionClipboard||document.execCommand(browserCommand),!0}return!1})),target.addImplementation(0,"generic-dom",((accessor,args)=>(document.execCommand(browserCommand),!0))))}registerExecCommandImpl(CutAction,"cut"),registerExecCommandImpl(CopyAction,"copy"),PasteAction&&(PasteAction.addImplementation(1e4,"code-editor",((accessor,args)=>{const codeEditorService=accessor.get(ICodeEditorService),clipboardService=accessor.get(IClipboardService),focusedEditor=codeEditorService.getFocusedCodeEditor();if(focusedEditor&&focusedEditor.hasTextFocus()){return!(!document.execCommand("paste")&&platform.isWeb)||__awaiter(void 0,void 0,void 0,(function*(){const clipboardText=yield clipboardService.readText();if(""!==clipboardText){const metadata=InMemoryClipboardMetadataManager.INSTANCE.get(clipboardText);let pasteOnNewLine=!1,multicursorText=null,mode=null;metadata&&(pasteOnNewLine=focusedEditor.getOption(32)&&!!metadata.isFromEmptySelection,multicursorText=void 0!==metadata.multicursorText?metadata.multicursorText:null,mode=metadata.mode),focusedEditor.trigger("keyboard","paste",{text:clipboardText,pasteOnNewLine,multicursorText,mode})}}))}return!1})),PasteAction.addImplementation(0,"generic-dom",((accessor,args)=>(document.execCommand("paste"),!0)))),supportsCopy&&registerEditorAction(ExecCommandCopyWithSyntaxHighlightingAction);