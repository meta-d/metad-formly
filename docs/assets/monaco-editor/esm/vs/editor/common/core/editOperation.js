import{Range}from"./range.js";export class EditOperation{static insert(position,text){return{range:new Range(position.lineNumber,position.column,position.lineNumber,position.column),text,forceMoveMarkers:!0}}static delete(range){return{range,text:null}}static replace(range,text){return{range,text}}static replaceMove(range,text){return{range,text,forceMoveMarkers:!0}}}