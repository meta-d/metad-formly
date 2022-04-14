import*as arrays from"../../../base/common/arrays.js";import{Position}from"../core/position.js";import{ContiguousTokensEditing,EMPTY_LINE_TOKENS,toUint32Array}from"./contiguousTokensEditing.js";import{LineTokens}from"./lineTokens.js";import{TokenMetadata}from"../languages.js";export class ContiguousTokensStore{constructor(languageIdCodec){this._lineTokens=[],this._len=0,this._languageIdCodec=languageIdCodec}flush(){this._lineTokens=[],this._len=0}getTokens(topLevelLanguageId,lineIndex,lineText){let rawLineTokens=null;if(lineIndex<this._len&&(rawLineTokens=this._lineTokens[lineIndex]),null!==rawLineTokens&&rawLineTokens!==EMPTY_LINE_TOKENS)return new LineTokens(toUint32Array(rawLineTokens),lineText,this._languageIdCodec);const lineTokens=new Uint32Array(2);return lineTokens[0]=lineText.length,lineTokens[1]=getDefaultMetadata(this._languageIdCodec.encodeLanguageId(topLevelLanguageId)),new LineTokens(lineTokens,lineText,this._languageIdCodec)}static _massageTokens(topLevelLanguageId,lineTextLength,_tokens){const tokens=_tokens?toUint32Array(_tokens):null;if(0===lineTextLength){let hasDifferentLanguageId=!1;if(tokens&&tokens.length>1&&(hasDifferentLanguageId=TokenMetadata.getLanguageId(tokens[1])!==topLevelLanguageId),!hasDifferentLanguageId)return EMPTY_LINE_TOKENS}if(!tokens||0===tokens.length){const tokens=new Uint32Array(2);return tokens[0]=lineTextLength,tokens[1]=getDefaultMetadata(topLevelLanguageId),tokens.buffer}return tokens[tokens.length-2]=lineTextLength,0===tokens.byteOffset&&tokens.byteLength===tokens.buffer.byteLength?tokens.buffer:tokens}_ensureLine(lineIndex){for(;lineIndex>=this._len;)this._lineTokens[this._len]=null,this._len++}_deleteLines(start,deleteCount){0!==deleteCount&&(start+deleteCount>this._len&&(deleteCount=this._len-start),this._lineTokens.splice(start,deleteCount),this._len-=deleteCount)}_insertLines(insertIndex,insertCount){if(0===insertCount)return;const lineTokens=[];for(let i=0;i<insertCount;i++)lineTokens[i]=null;this._lineTokens=arrays.arrayInsert(this._lineTokens,insertIndex,lineTokens),this._len+=insertCount}setTokens(topLevelLanguageId,lineIndex,lineTextLength,_tokens,checkEquality){const tokens=ContiguousTokensStore._massageTokens(this._languageIdCodec.encodeLanguageId(topLevelLanguageId),lineTextLength,_tokens);this._ensureLine(lineIndex);const oldTokens=this._lineTokens[lineIndex];return this._lineTokens[lineIndex]=tokens,!!checkEquality&&!ContiguousTokensStore._equals(oldTokens,tokens)}static _equals(_a,_b){if(!_a||!_b)return!_a&&!_b;const a=toUint32Array(_a),b=toUint32Array(_b);if(a.length!==b.length)return!1;for(let i=0,len=a.length;i<len;i++)if(a[i]!==b[i])return!1;return!0}acceptEdit(range,eolCount,firstLineLength){this._acceptDeleteRange(range),this._acceptInsertText(new Position(range.startLineNumber,range.startColumn),eolCount,firstLineLength)}_acceptDeleteRange(range){const firstLineIndex=range.startLineNumber-1;if(firstLineIndex>=this._len)return;if(range.startLineNumber===range.endLineNumber){if(range.startColumn===range.endColumn)return;return void(this._lineTokens[firstLineIndex]=ContiguousTokensEditing.delete(this._lineTokens[firstLineIndex],range.startColumn-1,range.endColumn-1))}this._lineTokens[firstLineIndex]=ContiguousTokensEditing.deleteEnding(this._lineTokens[firstLineIndex],range.startColumn-1);const lastLineIndex=range.endLineNumber-1;let lastLineTokens=null;lastLineIndex<this._len&&(lastLineTokens=ContiguousTokensEditing.deleteBeginning(this._lineTokens[lastLineIndex],range.endColumn-1)),this._lineTokens[firstLineIndex]=ContiguousTokensEditing.append(this._lineTokens[firstLineIndex],lastLineTokens),this._deleteLines(range.startLineNumber,range.endLineNumber-range.startLineNumber)}_acceptInsertText(position,eolCount,firstLineLength){if(0===eolCount&&0===firstLineLength)return;const lineIndex=position.lineNumber-1;lineIndex>=this._len||(0!==eolCount?(this._lineTokens[lineIndex]=ContiguousTokensEditing.deleteEnding(this._lineTokens[lineIndex],position.column-1),this._lineTokens[lineIndex]=ContiguousTokensEditing.insert(this._lineTokens[lineIndex],position.column-1,firstLineLength),this._insertLines(position.lineNumber,eolCount)):this._lineTokens[lineIndex]=ContiguousTokensEditing.insert(this._lineTokens[lineIndex],position.column-1,firstLineLength))}}function getDefaultMetadata(topLevelLanguageId){return(16384|topLevelLanguageId<<0|2<<23)>>>0}