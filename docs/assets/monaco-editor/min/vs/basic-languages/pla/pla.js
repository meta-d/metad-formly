/*! For license information please see pla.js.LICENSE.txt */
define("vs/basic-languages/pla/pla",["require","require"],(require=>(()=>{var o,s=Object.defineProperty,a=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,p=Object.prototype.hasOwnProperty,k=(o="undefined"!=typeof WeakMap?new WeakMap:0,(e,t)=>o&&o.get(e)||(t=((o,e,t,i)=>{if(e&&"object"==typeof e||"function"==typeof e)for(let n of r(e))!p.call(o,n)&&(t||"default"!==n)&&s(o,n,{get:()=>e[n],enumerable:!(i=a(e,n))||i.enumerable});return o})((o=>s(o,"__esModule",{value:!0}))({}),e,1),o&&o.set(e,t),t)),f={};((o,e)=>{for(var t in e)s(o,t,{get:e[t],enumerable:!0})})(f,{conf:()=>m,language:()=>u});var m={comments:{lineComment:"#"},brackets:[["[","]"],["<",">"],["(",")"]],autoClosingPairs:[{open:"[",close:"]"},{open:"<",close:">"},{open:"(",close:")"}],surroundingPairs:[{open:"[",close:"]"},{open:"<",close:">"},{open:"(",close:")"}]},u={defaultToken:"",tokenPostfix:".pla",brackets:[{open:"[",close:"]",token:"delimiter.square"},{open:"<",close:">",token:"delimiter.angle"},{open:"(",close:")",token:"delimiter.parenthesis"}],keywords:[".i",".o",".mv",".ilb",".ob",".label",".type",".phase",".pair",".symbolic",".symbolic-output",".kiss",".p",".e",".end"],comment:/#.*$/,identifier:/[a-zA-Z]+[a-zA-Z0-9_\-]*/,plaContent:/[01\-~\|]+/,tokenizer:{root:[{include:"@whitespace"},[/@comment/,"comment"],[/\.([a-zA-Z_\-]+)/,{cases:{"@eos":{token:"keyword.$1"},"@keywords":{cases:{".type":{token:"keyword.$1",next:"@type"},"@default":{token:"keyword.$1",next:"@keywordArg"}}},"@default":{token:"keyword.$1"}}}],[/@identifier/,"identifier"],[/@plaContent/,"string"]],whitespace:[[/[ \t\r\n]+/,""]],type:[{include:"@whitespace"},[/\w+/,{token:"type",next:"@pop"}]],keywordArg:[[/[ \t\r\n]+/,{cases:{"@eos":{token:"",next:"@pop"},"@default":""}}],[/@comment/,"comment","@pop"],[/[<>()\[\]]/,{cases:{"@eos":{token:"@brackets",next:"@pop"},"@default":"@brackets"}}],[/\-?\d+/,{cases:{"@eos":{token:"number",next:"@pop"},"@default":"number"}}],[/@identifier/,{cases:{"@eos":{token:"identifier",next:"@pop"},"@default":"identifier"}}],[/[;=]/,{cases:{"@eos":{token:"delimiter",next:"@pop"},"@default":"delimiter"}}]]}};return k(f)})()));