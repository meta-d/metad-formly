/*! For license information please see kotlin.js.LICENSE.txt */
define("vs/basic-languages/kotlin/kotlin",["require"],(require=>(()=>{var __defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropNames=Object.getOwnPropertyNames,__hasOwnProp=Object.prototype.hasOwnProperty,__toCommonJS=(cache=>(module,temp)=>cache&&cache.get(module)||(temp=((target,module,copyDefault,desc)=>{if(module&&"object"==typeof module||"function"==typeof module)for(let key of __getOwnPropNames(module))__hasOwnProp.call(target,key)||!copyDefault&&"default"===key||__defProp(target,key,{get:()=>module[key],enumerable:!(desc=__getOwnPropDesc(module,key))||desc.enumerable});return target})(__defProp({},"__esModule",{value:!0}),module,1),cache&&cache.set(module,temp),temp))("undefined"!=typeof WeakMap?new WeakMap:0),kotlin_exports={};((target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})})(kotlin_exports,{conf:()=>conf,language:()=>language});var conf={wordPattern:/(-?\d*\.\d\w*)|([^\`\~\!\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,comments:{lineComment:"//",blockComment:["/*","*/"]},brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"},{open:"<",close:">"}],folding:{markers:{start:new RegExp("^\\s*//\\s*(?:(?:#?region\\b)|(?:<editor-fold\\b))"),end:new RegExp("^\\s*//\\s*(?:(?:#?endregion\\b)|(?:</editor-fold>))")}}},language={defaultToken:"",tokenPostfix:".kt",keywords:["as","as?","break","class","continue","do","else","false","for","fun","if","in","!in","interface","is","!is","null","object","package","return","super","this","throw","true","try","typealias","val","var","when","while","by","catch","constructor","delegate","dynamic","field","file","finally","get","import","init","param","property","receiver","set","setparam","where","actual","abstract","annotation","companion","const","crossinline","data","enum","expect","external","final","infix","inline","inner","internal","lateinit","noinline","open","operator","out","override","private","protected","public","reified","sealed","suspend","tailrec","vararg","field","it"],operators:["+","-","*","/","%","=","+=","-=","*=","/=","%=","++","--","&&","||","!","==","!=","===","!==",">","<","<=",">=","[","]","!!","?.","?:","::","..",":","?","->","@",";","$","_"],symbols:/[=><!~?:&|+\-*\/\^%]+/,escapes:/\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,digits:/\d+(_+\d+)*/,octaldigits:/[0-7]+(_+[0-7]+)*/,binarydigits:/[0-1]+(_+[0-1]+)*/,hexdigits:/[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,tokenizer:{root:[[/[A-Z][\w\$]*/,"type.identifier"],[/[a-zA-Z_$][\w$]*/,{cases:{"@keywords":{token:"keyword.$0"},"@default":"identifier"}}],{include:"@whitespace"},[/[{}()\[\]]/,"@brackets"],[/[<>](?!@symbols)/,"@brackets"],[/@symbols/,{cases:{"@operators":"delimiter","@default":""}}],[/@\s*[a-zA-Z_\$][\w\$]*/,"annotation"],[/(@digits)[eE]([\-+]?(@digits))?[fFdD]?/,"number.float"],[/(@digits)\.(@digits)([eE][\-+]?(@digits))?[fFdD]?/,"number.float"],[/0[xX](@hexdigits)[Ll]?/,"number.hex"],[/0(@octaldigits)[Ll]?/,"number.octal"],[/0[bB](@binarydigits)[Ll]?/,"number.binary"],[/(@digits)[fFdD]/,"number.float"],[/(@digits)[lL]?/,"number"],[/[;,.]/,"delimiter"],[/"([^"\\]|\\.)*$/,"string.invalid"],[/"""/,"string","@multistring"],[/"/,"string","@string"],[/'[^\\']'/,"string"],[/(')(@escapes)(')/,["string","string.escape","string"]],[/'/,"string.invalid"]],whitespace:[[/[ \t\r\n]+/,""],[/\/\*\*(?!\/)/,"comment.doc","@javadoc"],[/\/\*/,"comment","@comment"],[/\/\/.*$/,"comment"]],comment:[[/[^\/*]+/,"comment"],[/\/\*/,"comment","@comment"],[/\*\//,"comment","@pop"],[/[\/*]/,"comment"]],javadoc:[[/[^\/*]+/,"comment.doc"],[/\/\*/,"comment.doc","@push"],[/\/\*/,"comment.doc.invalid"],[/\*\//,"comment.doc","@pop"],[/[\/*]/,"comment.doc"]],string:[[/[^\\"]+/,"string"],[/@escapes/,"string.escape"],[/\\./,"string.escape.invalid"],[/"/,"string","@pop"]],multistring:[[/[^\\"]+/,"string"],[/@escapes/,"string.escape"],[/\\./,"string.escape.invalid"],[/"""/,"string","@pop"],[/./,"string"]]}};return __toCommonJS(kotlin_exports)})()));