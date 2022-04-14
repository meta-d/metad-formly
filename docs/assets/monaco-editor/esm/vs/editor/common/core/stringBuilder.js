import*as strings from"../../../base/common/strings.js";import*as platform from"../../../base/common/platform.js";import*as buffer from"../../../base/common/buffer.js";let _utf16LE_TextDecoder,_utf16BE_TextDecoder,_platformTextDecoder;function getUTF16LE_TextDecoder(){return _utf16LE_TextDecoder||(_utf16LE_TextDecoder=new TextDecoder("UTF-16LE")),_utf16LE_TextDecoder}function getUTF16BE_TextDecoder(){return _utf16BE_TextDecoder||(_utf16BE_TextDecoder=new TextDecoder("UTF-16BE")),_utf16BE_TextDecoder}export function getPlatformTextDecoder(){return _platformTextDecoder||(_platformTextDecoder=platform.isLittleEndian()?getUTF16LE_TextDecoder():getUTF16BE_TextDecoder()),_platformTextDecoder}export const hasTextDecoder="undefined"!=typeof TextDecoder;export let createStringBuilder;export let decodeUTF16LE;function standardDecodeUTF16LE(source,offset,len){const view=new Uint16Array(source.buffer,offset,len);return len>0&&(65279===view[0]||65534===view[0])?compatDecodeUTF16LE(source,offset,len):getUTF16LE_TextDecoder().decode(view)}function compatDecodeUTF16LE(source,offset,len){const result=[];let resultLen=0;for(let i=0;i<len;i++){const charCode=buffer.readUInt16LE(source,offset);offset+=2,result[resultLen++]=String.fromCharCode(charCode)}return result.join("")}hasTextDecoder?(createStringBuilder=capacity=>new StringBuilder(capacity),decodeUTF16LE=standardDecodeUTF16LE):(createStringBuilder=capacity=>new CompatStringBuilder,decodeUTF16LE=compatDecodeUTF16LE);class StringBuilder{constructor(capacity){this._capacity=0|capacity,this._buffer=new Uint16Array(this._capacity),this._completedStrings=null,this._bufferLength=0}reset(){this._completedStrings=null,this._bufferLength=0}build(){return null!==this._completedStrings?(this._flushBuffer(),this._completedStrings.join("")):this._buildBuffer()}_buildBuffer(){if(0===this._bufferLength)return"";const view=new Uint16Array(this._buffer.buffer,0,this._bufferLength);return getPlatformTextDecoder().decode(view)}_flushBuffer(){const bufferString=this._buildBuffer();this._bufferLength=0,null===this._completedStrings?this._completedStrings=[bufferString]:this._completedStrings[this._completedStrings.length]=bufferString}write1(charCode){const remainingSpace=this._capacity-this._bufferLength;remainingSpace<=1&&(0===remainingSpace||strings.isHighSurrogate(charCode))&&this._flushBuffer(),this._buffer[this._bufferLength++]=charCode}appendASCII(charCode){this._bufferLength===this._capacity&&this._flushBuffer(),this._buffer[this._bufferLength++]=charCode}appendASCIIString(str){const strLen=str.length;if(this._bufferLength+strLen>=this._capacity)return this._flushBuffer(),void(this._completedStrings[this._completedStrings.length]=str);for(let i=0;i<strLen;i++)this._buffer[this._bufferLength++]=str.charCodeAt(i)}}class CompatStringBuilder{constructor(){this._pieces=[],this._piecesLen=0}reset(){this._pieces=[],this._piecesLen=0}build(){return this._pieces.join("")}write1(charCode){this._pieces[this._piecesLen++]=String.fromCharCode(charCode)}appendASCII(charCode){this._pieces[this._piecesLen++]=String.fromCharCode(charCode)}appendASCIIString(str){this._pieces[this._piecesLen++]=str}}