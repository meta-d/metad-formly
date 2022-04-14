import{Selection}from"../core/selection.js";export class ReplaceCommand{constructor(range,text,insertsAutoWhitespace=!1){this._range=range,this._text=text,this.insertsAutoWhitespace=insertsAutoWhitespace}getEditOperations(model,builder){builder.addTrackedEditOperation(this._range,this._text)}computeCursorState(model,helper){const srcRange=helper.getInverseEditOperations()[0].range;return Selection.fromPositions(srcRange.getEndPosition())}}export class ReplaceCommandThatSelectsText{constructor(range,text){this._range=range,this._text=text}getEditOperations(model,builder){builder.addTrackedEditOperation(this._range,this._text)}computeCursorState(model,helper){const srcRange=helper.getInverseEditOperations()[0].range;return Selection.fromRange(srcRange,0)}}export class ReplaceCommandWithoutChangingPosition{constructor(range,text,insertsAutoWhitespace=!1){this._range=range,this._text=text,this.insertsAutoWhitespace=insertsAutoWhitespace}getEditOperations(model,builder){builder.addTrackedEditOperation(this._range,this._text)}computeCursorState(model,helper){const srcRange=helper.getInverseEditOperations()[0].range;return Selection.fromPositions(srcRange.getStartPosition())}}export class ReplaceCommandWithOffsetCursorState{constructor(range,text,lineNumberDeltaOffset,columnDeltaOffset,insertsAutoWhitespace=!1){this._range=range,this._text=text,this._columnDeltaOffset=columnDeltaOffset,this._lineNumberDeltaOffset=lineNumberDeltaOffset,this.insertsAutoWhitespace=insertsAutoWhitespace}getEditOperations(model,builder){builder.addTrackedEditOperation(this._range,this._text)}computeCursorState(model,helper){const srcRange=helper.getInverseEditOperations()[0].range;return Selection.fromPositions(srcRange.getEndPosition().delta(this._lineNumberDeltaOffset,this._columnDeltaOffset))}}export class ReplaceCommandThatPreservesSelection{constructor(editRange,text,initialSelection,forceMoveMarkers=!1){this._range=editRange,this._text=text,this._initialSelection=initialSelection,this._forceMoveMarkers=forceMoveMarkers,this._selectionId=null}getEditOperations(model,builder){builder.addTrackedEditOperation(this._range,this._text,this._forceMoveMarkers),this._selectionId=builder.trackSelection(this._initialSelection)}computeCursorState(model,helper){return helper.getTrackedSelection(this._selectionId)}}