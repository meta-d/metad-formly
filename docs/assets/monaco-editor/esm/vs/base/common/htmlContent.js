import{illegalArgument}from"./errors.js";import{escapeIcons}from"./iconLabels.js";export class MarkdownString{constructor(value="",isTrustedOrOptions=!1){var _a,_b,_c;if(this.value=value,"string"!=typeof this.value)throw illegalArgument("value");"boolean"==typeof isTrustedOrOptions?(this.isTrusted=isTrustedOrOptions,this.supportThemeIcons=!1,this.supportHtml=!1):(this.isTrusted=null!==(_a=isTrustedOrOptions.isTrusted)&&void 0!==_a?_a:void 0,this.supportThemeIcons=null!==(_b=isTrustedOrOptions.supportThemeIcons)&&void 0!==_b&&_b,this.supportHtml=null!==(_c=isTrustedOrOptions.supportHtml)&&void 0!==_c&&_c)}appendText(value,newlineStyle=0){return this.value+=escapeMarkdownSyntaxTokens(this.supportThemeIcons?escapeIcons(value):value).replace(/([ \t]+)/g,((_match,g1)=>"&nbsp;".repeat(g1.length))).replace(/\>/gm,"\\>").replace(/\n/g,1===newlineStyle?"\\\n":"\n\n"),this}appendMarkdown(value){return this.value+=value,this}appendCodeblock(langId,code){return this.value+="\n```",this.value+=langId,this.value+="\n",this.value+=code,this.value+="\n```\n",this}}export function isEmptyMarkdownString(oneOrMany){return isMarkdownString(oneOrMany)?!oneOrMany.value:!Array.isArray(oneOrMany)||oneOrMany.every(isEmptyMarkdownString)}export function isMarkdownString(thing){return thing instanceof MarkdownString||!(!thing||"object"!=typeof thing)&&!("string"!=typeof thing.value||"boolean"!=typeof thing.isTrusted&&void 0!==thing.isTrusted||"boolean"!=typeof thing.supportThemeIcons&&void 0!==thing.supportThemeIcons)}export function escapeMarkdownSyntaxTokens(text){return text.replace(/[\\`*_{}[\]()#+\-!]/g,"\\$&")}export function removeMarkdownEscapes(text){return text?text.replace(/\\([\\`*_{}[\]()#+\-.!])/g,"$1"):text}export function parseHrefAndDimensions(href){const dimensions=[],splitted=href.split("|").map((s=>s.trim()));href=splitted[0];const parameters=splitted[1];if(parameters){const heightFromParams=/height=(\d+)/.exec(parameters),widthFromParams=/width=(\d+)/.exec(parameters),height=heightFromParams?heightFromParams[1]:"",width=widthFromParams?widthFromParams[1]:"",widthIsFinite=isFinite(parseInt(width)),heightIsFinite=isFinite(parseInt(height));widthIsFinite&&dimensions.push(`width="${width}"`),heightIsFinite&&dimensions.push(`height="${height}"`)}return{href,dimensions}}