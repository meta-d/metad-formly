import"./textAreaHandler.css";import*as nls from"../../../nls.js";import*as browser from"../../../base/browser/browser.js";import{createFastDomNode}from"../../../base/browser/fastDomNode.js";import*as platform from"../../../base/common/platform.js";import*as strings from"../../../base/common/strings.js";import{applyFontInfo}from"../config/domFontInfo.js";import{CopyOptions,TextAreaInput,TextAreaWrapper}from"./textAreaInput.js";import{PagedScreenReaderStrategy,TextAreaState,_debugComposition}from"./textAreaState.js";import{PartFingerprints,ViewPart}from"../view/viewPart.js";import{LineNumbersOverlay}from"../viewParts/lineNumbers/lineNumbers.js";import{Margin}from"../viewParts/margin/margin.js";import{EditorOptions}from"../../common/config/editorOptions.js";import{getMapForWordSeparators}from"../../common/core/wordCharacterClassifier.js";import{Position}from"../../common/core/position.js";import{Range}from"../../common/core/range.js";import{Selection}from"../../common/core/selection.js";import{MOUSE_CURSOR_TEXT_CSS_CLASS_NAME}from"../../../base/browser/ui/mouseCursor/mouseCursor.js";import{TokenizationRegistry}from"../../common/languages.js";import{Color}from"../../../base/common/color.js";class VisibleTextAreaData{constructor(_context,modelLineNumber,distanceToModelLineStart,widthOfHiddenLineTextBefore,distanceToModelLineEnd){this._context=_context,this.modelLineNumber=modelLineNumber,this.distanceToModelLineStart=distanceToModelLineStart,this.widthOfHiddenLineTextBefore=widthOfHiddenLineTextBefore,this.distanceToModelLineEnd=distanceToModelLineEnd,this._visibleTextAreaBrand=void 0,this.startPosition=null,this.endPosition=null,this.visibleTextareaStart=null,this.visibleTextareaEnd=null,this._previousPresentation=null}prepareRender(visibleRangeProvider){const startModelPosition=new Position(this.modelLineNumber,this.distanceToModelLineStart+1),endModelPosition=new Position(this.modelLineNumber,this._context.viewModel.model.getLineMaxColumn(this.modelLineNumber)-this.distanceToModelLineEnd);this.startPosition=this._context.viewModel.coordinatesConverter.convertModelPositionToViewPosition(startModelPosition),this.endPosition=this._context.viewModel.coordinatesConverter.convertModelPositionToViewPosition(endModelPosition),this.startPosition.lineNumber===this.endPosition.lineNumber?(this.visibleTextareaStart=visibleRangeProvider.visibleRangeForPosition(this.startPosition),this.visibleTextareaEnd=visibleRangeProvider.visibleRangeForPosition(this.endPosition)):(this.visibleTextareaStart=null,this.visibleTextareaEnd=null)}definePresentation(tokenPresentation){return this._previousPresentation||(this._previousPresentation=tokenPresentation||{foreground:1,italic:!1,bold:!1,underline:!1,strikethrough:!1}),this._previousPresentation}}const canUseZeroSizeTextarea=browser.isFirefox;export class TextAreaHandler extends ViewPart{constructor(context,viewController,visibleRangeProvider){super(context),this._primaryCursorPosition=new Position(1,1),this._primaryCursorVisibleRange=null,this._viewController=viewController,this._visibleRangeProvider=visibleRangeProvider,this._scrollLeft=0,this._scrollTop=0;const options=this._context.configuration.options,layoutInfo=options.get(131);this._setAccessibilityOptions(options),this._contentLeft=layoutInfo.contentLeft,this._contentWidth=layoutInfo.contentWidth,this._contentHeight=layoutInfo.height,this._fontInfo=options.get(44),this._lineHeight=options.get(59),this._emptySelectionClipboard=options.get(32),this._copyWithSyntaxHighlighting=options.get(21),this._visibleTextArea=null,this._selections=[new Selection(1,1,1,1)],this._modelSelections=[new Selection(1,1,1,1)],this._lastRenderPosition=null,this.textArea=createFastDomNode(document.createElement("textarea")),PartFingerprints.write(this.textArea,6),this.textArea.setClassName(`inputarea ${MOUSE_CURSOR_TEXT_CSS_CLASS_NAME}`),this.textArea.setAttribute("wrap","off"),this.textArea.setAttribute("autocorrect","off"),this.textArea.setAttribute("autocapitalize","off"),this.textArea.setAttribute("autocomplete","off"),this.textArea.setAttribute("spellcheck","false"),this.textArea.setAttribute("aria-label",this._getAriaLabel(options)),this.textArea.setAttribute("tabindex",String(options.get(112))),this.textArea.setAttribute("role","textbox"),this.textArea.setAttribute("aria-roledescription",nls.localize("editor","editor")),this.textArea.setAttribute("aria-multiline","true"),this.textArea.setAttribute("aria-haspopup","false"),this.textArea.setAttribute("aria-autocomplete","both"),options.get(30)&&options.get(81)&&this.textArea.setAttribute("readonly","true"),this.textAreaCover=createFastDomNode(document.createElement("div")),this.textAreaCover.setPosition("absolute");const simpleModel={getLineCount:()=>this._context.viewModel.getLineCount(),getLineMaxColumn:lineNumber=>this._context.viewModel.getLineMaxColumn(lineNumber),getValueInRange:(range,eol)=>this._context.viewModel.getValueInRange(range,eol)},textAreaInputHost={getDataToCopy:()=>{const rawTextToCopy=this._context.viewModel.getPlainTextToCopy(this._modelSelections,this._emptySelectionClipboard,platform.isWindows),newLineCharacter=this._context.viewModel.model.getEOL(),isFromEmptySelection=this._emptySelectionClipboard&&1===this._modelSelections.length&&this._modelSelections[0].isEmpty(),multicursorText=Array.isArray(rawTextToCopy)?rawTextToCopy:null,text=Array.isArray(rawTextToCopy)?rawTextToCopy.join(newLineCharacter):rawTextToCopy;let html,mode=null;if(CopyOptions.forceCopyWithSyntaxHighlighting||this._copyWithSyntaxHighlighting&&text.length<65536){const richText=this._context.viewModel.getRichTextToCopy(this._modelSelections,this._emptySelectionClipboard);richText&&(html=richText.html,mode=richText.mode)}return{isFromEmptySelection,multicursorText,text,html,mode}},getScreenReaderContent:currentState=>{if(1===this._accessibilitySupport){if(platform.isMacintosh){const selection=this._selections[0];if(selection.isEmpty()){const position=selection.getStartPosition();let textBefore=this._getWordBeforePosition(position);if(0===textBefore.length&&(textBefore=this._getCharacterBeforePosition(position)),textBefore.length>0)return new TextAreaState(textBefore,textBefore.length,textBefore.length,position,position)}}return TextAreaState.EMPTY}if(browser.isAndroid){const selection=this._selections[0];if(selection.isEmpty()){const position=selection.getStartPosition(),[wordAtPosition,positionOffsetInWord]=this._getAndroidWordAtPosition(position);if(wordAtPosition.length>0)return new TextAreaState(wordAtPosition,positionOffsetInWord,positionOffsetInWord,position,position)}return TextAreaState.EMPTY}return PagedScreenReaderStrategy.fromEditorSelection(currentState,simpleModel,this._selections[0],this._accessibilityPageSize,0===this._accessibilitySupport)},deduceModelPosition:(viewAnchorPosition,deltaOffset,lineFeedCnt)=>this._context.viewModel.deduceModelPositionRelativeToViewPosition(viewAnchorPosition,deltaOffset,lineFeedCnt)},textAreaWrapper=this._register(new TextAreaWrapper(this.textArea.domNode));this._textAreaInput=this._register(new TextAreaInput(textAreaInputHost,textAreaWrapper,platform.OS,browser)),this._register(this._textAreaInput.onKeyDown((e=>{this._viewController.emitKeyDown(e)}))),this._register(this._textAreaInput.onKeyUp((e=>{this._viewController.emitKeyUp(e)}))),this._register(this._textAreaInput.onPaste((e=>{let pasteOnNewLine=!1,multicursorText=null,mode=null;e.metadata&&(pasteOnNewLine=this._emptySelectionClipboard&&!!e.metadata.isFromEmptySelection,multicursorText=void 0!==e.metadata.multicursorText?e.metadata.multicursorText:null,mode=e.metadata.mode),this._viewController.paste(e.text,pasteOnNewLine,multicursorText,mode)}))),this._register(this._textAreaInput.onCut((()=>{this._viewController.cut()}))),this._register(this._textAreaInput.onType((e=>{e.replacePrevCharCnt||e.replaceNextCharCnt||e.positionDelta?(_debugComposition&&console.log(` => compositionType: <<${e.text}>>, ${e.replacePrevCharCnt}, ${e.replaceNextCharCnt}, ${e.positionDelta}`),this._viewController.compositionType(e.text,e.replacePrevCharCnt,e.replaceNextCharCnt,e.positionDelta)):(_debugComposition&&console.log(` => type: <<${e.text}>>`),this._viewController.type(e.text))}))),this._register(this._textAreaInput.onSelectionChangeRequest((modelSelection=>{this._viewController.setSelection(modelSelection)}))),this._register(this._textAreaInput.onCompositionStart((e=>{const ta=this.textArea.domNode,modelSelection=this._modelSelections[0],{distanceToModelLineStart,widthOfHiddenTextBefore}=(()=>{const textBeforeSelection=ta.value.substring(0,Math.min(ta.selectionStart,ta.selectionEnd)),lineFeedOffset1=textBeforeSelection.lastIndexOf("\n"),lineTextBeforeSelection=textBeforeSelection.substring(lineFeedOffset1+1),tabOffset1=lineTextBeforeSelection.lastIndexOf("\t"),desiredVisibleBeforeCharCount=lineTextBeforeSelection.length-tabOffset1-1,startModelPosition=modelSelection.getStartPosition(),visibleBeforeCharCount=Math.min(startModelPosition.column-1,desiredVisibleBeforeCharCount);return{distanceToModelLineStart:startModelPosition.column-1-visibleBeforeCharCount,widthOfHiddenTextBefore:measureText(lineTextBeforeSelection.substring(0,lineTextBeforeSelection.length-visibleBeforeCharCount),this._fontInfo)}})(),{distanceToModelLineEnd}=(()=>{const textAfterSelection=ta.value.substring(Math.max(ta.selectionStart,ta.selectionEnd)),lineFeedOffset2=textAfterSelection.indexOf("\n"),lineTextAfterSelection=-1===lineFeedOffset2?textAfterSelection:textAfterSelection.substring(0,lineFeedOffset2),tabOffset2=lineTextAfterSelection.indexOf("\t"),desiredVisibleAfterCharCount=-1===tabOffset2?lineTextAfterSelection.length:lineTextAfterSelection.length-tabOffset2-1,endModelPosition=modelSelection.getEndPosition(),visibleAfterCharCount=Math.min(this._context.viewModel.model.getLineMaxColumn(endModelPosition.lineNumber)-endModelPosition.column,desiredVisibleAfterCharCount);return{distanceToModelLineEnd:this._context.viewModel.model.getLineMaxColumn(endModelPosition.lineNumber)-endModelPosition.column-visibleAfterCharCount}})();this._context.viewModel.revealRange("keyboard",!0,Range.fromPositions(this._selections[0].getStartPosition()),0,1),this._visibleTextArea=new VisibleTextAreaData(this._context,modelSelection.startLineNumber,distanceToModelLineStart,widthOfHiddenTextBefore,distanceToModelLineEnd),this._visibleTextArea.prepareRender(this._visibleRangeProvider),this._render(),this.textArea.setClassName(`inputarea ${MOUSE_CURSOR_TEXT_CSS_CLASS_NAME} ime-input`),this._viewController.compositionStart(),this._context.viewModel.onCompositionStart()}))),this._register(this._textAreaInput.onCompositionUpdate((e=>{this._visibleTextArea&&(this._visibleTextArea.prepareRender(this._visibleRangeProvider),this._render())}))),this._register(this._textAreaInput.onCompositionEnd((()=>{this._visibleTextArea=null,this._render(),this.textArea.setClassName(`inputarea ${MOUSE_CURSOR_TEXT_CSS_CLASS_NAME}`),this._viewController.compositionEnd(),this._context.viewModel.onCompositionEnd()}))),this._register(this._textAreaInput.onFocus((()=>{this._context.viewModel.setHasFocus(!0)}))),this._register(this._textAreaInput.onBlur((()=>{this._context.viewModel.setHasFocus(!1)})))}dispose(){super.dispose()}_getAndroidWordAtPosition(position){const lineContent=this._context.viewModel.getLineContent(position.lineNumber),wordSeparators=getMapForWordSeparators('`~!@#$%^&*()-=+[{]}\\|;:",.<>/?');let goingLeft=!0,startColumn=position.column,goingRight=!0,endColumn=position.column,distance=0;for(;distance<50&&(goingLeft||goingRight);){if(goingLeft&&startColumn<=1&&(goingLeft=!1),goingLeft){const charCode=lineContent.charCodeAt(startColumn-2);0!==wordSeparators.get(charCode)?goingLeft=!1:startColumn--}if(goingRight&&endColumn>lineContent.length&&(goingRight=!1),goingRight){const charCode=lineContent.charCodeAt(endColumn-1);0!==wordSeparators.get(charCode)?goingRight=!1:endColumn++}distance++}return[lineContent.substring(startColumn-1,endColumn-1),position.column-startColumn]}_getWordBeforePosition(position){const lineContent=this._context.viewModel.getLineContent(position.lineNumber),wordSeparators=getMapForWordSeparators(this._context.configuration.options.get(117));let column=position.column,distance=0;for(;column>1;){const charCode=lineContent.charCodeAt(column-2);if(0!==wordSeparators.get(charCode)||distance>50)return lineContent.substring(column-1,position.column-1);distance++,column--}return lineContent.substring(0,position.column-1)}_getCharacterBeforePosition(position){if(position.column>1){const charBefore=this._context.viewModel.getLineContent(position.lineNumber).charAt(position.column-2);if(!strings.isHighSurrogate(charBefore.charCodeAt(0)))return charBefore}return""}_getAriaLabel(options){return 1===options.get(2)?nls.localize("accessibilityOffAriaLabel","The editor is not accessible at this time. Press {0} for options.",platform.isLinux?"Shift+Alt+F1":"Alt+F1"):options.get(4)}_setAccessibilityOptions(options){this._accessibilitySupport=options.get(2);const accessibilityPageSize=options.get(3);2===this._accessibilitySupport&&accessibilityPageSize===EditorOptions.accessibilityPageSize.defaultValue?this._accessibilityPageSize=500:this._accessibilityPageSize=accessibilityPageSize}onConfigurationChanged(e){const options=this._context.configuration.options,layoutInfo=options.get(131);return this._setAccessibilityOptions(options),this._contentLeft=layoutInfo.contentLeft,this._contentWidth=layoutInfo.contentWidth,this._contentHeight=layoutInfo.height,this._fontInfo=options.get(44),this._lineHeight=options.get(59),this._emptySelectionClipboard=options.get(32),this._copyWithSyntaxHighlighting=options.get(21),this.textArea.setAttribute("aria-label",this._getAriaLabel(options)),this.textArea.setAttribute("tabindex",String(options.get(112))),(e.hasChanged(30)||e.hasChanged(81))&&(options.get(30)&&options.get(81)?this.textArea.setAttribute("readonly","true"):this.textArea.removeAttribute("readonly")),e.hasChanged(2)&&this._textAreaInput.writeScreenReaderContent("strategy changed"),!0}onCursorStateChanged(e){return this._selections=e.selections.slice(0),this._modelSelections=e.modelSelections.slice(0),this._textAreaInput.writeScreenReaderContent("selection changed"),!0}onDecorationsChanged(e){return!0}onFlushed(e){return!0}onLinesChanged(e){return!0}onLinesDeleted(e){return!0}onLinesInserted(e){return!0}onScrollChanged(e){return this._scrollLeft=e.scrollLeft,this._scrollTop=e.scrollTop,!0}onZonesChanged(e){return!0}isFocused(){return this._textAreaInput.isFocused()}focusTextArea(){this._textAreaInput.focusTextArea()}getLastRenderData(){return this._lastRenderPosition}setAriaOptions(options){options.activeDescendant?(this.textArea.setAttribute("aria-haspopup","true"),this.textArea.setAttribute("aria-autocomplete","list"),this.textArea.setAttribute("aria-activedescendant",options.activeDescendant)):(this.textArea.setAttribute("aria-haspopup","false"),this.textArea.setAttribute("aria-autocomplete","both"),this.textArea.removeAttribute("aria-activedescendant")),options.role&&this.textArea.setAttribute("role",options.role)}prepareRender(ctx){this._primaryCursorPosition=new Position(this._selections[0].positionLineNumber,this._selections[0].positionColumn),this._primaryCursorVisibleRange=ctx.visibleRangeForPosition(this._primaryCursorPosition),this._visibleTextArea&&this._visibleTextArea.prepareRender(ctx)}render(ctx){this._textAreaInput.writeScreenReaderContent("render"),this._render()}_render(){if(this._visibleTextArea){const visibleStart=this._visibleTextArea.visibleTextareaStart,visibleEnd=this._visibleTextArea.visibleTextareaEnd,startPosition=this._visibleTextArea.startPosition,endPosition=this._visibleTextArea.endPosition;if(startPosition&&endPosition&&visibleStart&&visibleEnd&&visibleEnd.left>=this._scrollLeft&&visibleStart.left<=this._scrollLeft+this._contentWidth){const top=this._context.viewLayout.getVerticalOffsetForLineNumber(this._primaryCursorPosition.lineNumber)-this._scrollTop,lineCount=this._newlinecount(this.textArea.domNode.value.substr(0,this.textArea.domNode.selectionStart));let scrollLeft=this._visibleTextArea.widthOfHiddenLineTextBefore,left=this._contentLeft+visibleStart.left-this._scrollLeft,width=visibleEnd.left-visibleStart.left+1;if(left<this._contentLeft){const delta=this._contentLeft-left;left+=delta,scrollLeft+=delta,width-=delta}width>this._contentWidth&&(width=this._contentWidth);const viewLineData=this._context.viewModel.getViewLineData(startPosition.lineNumber),startTokenIndex=viewLineData.tokens.findTokenIndexAtOffset(startPosition.column-1),textareaSpansSingleToken=startTokenIndex===viewLineData.tokens.findTokenIndexAtOffset(endPosition.column-1),presentation=this._visibleTextArea.definePresentation(textareaSpansSingleToken?viewLineData.tokens.getPresentation(startTokenIndex):null);this.textArea.domNode.scrollTop=lineCount*this._lineHeight,this.textArea.domNode.scrollLeft=scrollLeft,this._doRender({lastRenderPosition:null,top,left,width,height:this._lineHeight,useCover:!1,color:(TokenizationRegistry.getColorMap()||[])[presentation.foreground],italic:presentation.italic,bold:presentation.bold,underline:presentation.underline,strikethrough:presentation.strikethrough})}return}if(!this._primaryCursorVisibleRange)return void this._renderAtTopLeft();const left=this._contentLeft+this._primaryCursorVisibleRange.left-this._scrollLeft;if(left<this._contentLeft||left>this._contentLeft+this._contentWidth)return void this._renderAtTopLeft();const top=this._context.viewLayout.getVerticalOffsetForLineNumber(this._selections[0].positionLineNumber)-this._scrollTop;if(top<0||top>this._contentHeight)this._renderAtTopLeft();else if(platform.isMacintosh){this._doRender({lastRenderPosition:this._primaryCursorPosition,top,left,width:canUseZeroSizeTextarea?0:1,height:this._lineHeight,useCover:!1}),this.textArea.domNode.scrollLeft=this._primaryCursorVisibleRange.left;const lineCount=this._newlinecount(this.textArea.domNode.value.substr(0,this.textArea.domNode.selectionStart));this.textArea.domNode.scrollTop=lineCount*this._lineHeight}else this._doRender({lastRenderPosition:this._primaryCursorPosition,top,left,width:canUseZeroSizeTextarea?0:1,height:canUseZeroSizeTextarea?0:1,useCover:!1})}_newlinecount(text){let result=0,startIndex=-1;for(;;){if(startIndex=text.indexOf("\n",startIndex+1),-1===startIndex)break;result++}return result}_renderAtTopLeft(){this._doRender({lastRenderPosition:null,top:0,left:0,width:canUseZeroSizeTextarea?0:1,height:canUseZeroSizeTextarea?0:1,useCover:!0})}_doRender(renderData){this._lastRenderPosition=renderData.lastRenderPosition;const ta=this.textArea,tac=this.textAreaCover;applyFontInfo(ta,this._fontInfo),ta.setTop(renderData.top),ta.setLeft(renderData.left),ta.setWidth(renderData.width),ta.setHeight(renderData.height),ta.setColor(renderData.color?Color.Format.CSS.formatHex(renderData.color):""),ta.setFontStyle(renderData.italic?"italic":""),renderData.bold&&ta.setFontWeight("bold"),ta.setTextDecoration(`${renderData.underline?" underline":""}${renderData.strikethrough?" line-through":""}`),tac.setTop(renderData.useCover?renderData.top:0),tac.setLeft(renderData.useCover?renderData.left:0),tac.setWidth(renderData.useCover?renderData.width:0),tac.setHeight(renderData.useCover?renderData.height:0);const options=this._context.configuration.options;options.get(50)?tac.setClassName("monaco-editor-background textAreaCover "+Margin.OUTER_CLASS_NAME):0!==options.get(60).renderType?tac.setClassName("monaco-editor-background textAreaCover "+LineNumbersOverlay.CLASS_NAME):tac.setClassName("monaco-editor-background textAreaCover")}}function measureText(text,fontInfo){if(0===text.length)return 0;const container=document.createElement("div");container.style.position="absolute",container.style.top="-50000px",container.style.width="50000px";const regularDomNode=document.createElement("span");applyFontInfo(regularDomNode,fontInfo),regularDomNode.style.whiteSpace="pre",regularDomNode.append(text),container.appendChild(regularDomNode),document.body.appendChild(container);const res=regularDomNode.offsetWidth;return document.body.removeChild(container),res}