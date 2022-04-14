import{Range}from"../core/range.js";import{Searcher}from"../model/textModelSearch.js";import*as strings from"../../../base/common/strings.js";import{assertNever}from"../../../base/common/types.js";import{DEFAULT_WORD_REGEXP,getWordAtText}from"../core/wordHelper.js";export class UnicodeTextModelHighlighter{static computeUnicodeHighlights(model,options,range){const startLine=range?range.startLineNumber:1,endLine=range?range.endLineNumber:model.getLineCount(),codePointHighlighter=new CodePointHighlighter(options),candidates=codePointHighlighter.getCandidateCodePoints();let regex;regex="allNonBasicAscii"===candidates?new RegExp("[^\\t\\n\\r\\x20-\\x7E]","g"):new RegExp(`${buildRegExpCharClassExpr(Array.from(candidates))}`,"g");const searcher=new Searcher(null,regex),ranges=[];let m,hasMore=!1,ambiguousCharacterCount=0,invisibleCharacterCount=0,nonBasicAsciiCharacterCount=0;forLoop:for(let lineNumber=startLine,lineCount=endLine;lineNumber<=lineCount;lineNumber++){const lineContent=model.getLineContent(lineNumber),lineLength=lineContent.length;searcher.reset(0);do{if(m=searcher.next(lineContent),m){let startIndex=m.index,endIndex=m.index+m[0].length;if(startIndex>0){const charCodeBefore=lineContent.charCodeAt(startIndex-1);strings.isHighSurrogate(charCodeBefore)&&startIndex--}if(endIndex+1<lineLength){const charCodeBefore=lineContent.charCodeAt(endIndex-1);strings.isHighSurrogate(charCodeBefore)&&endIndex++}const str=lineContent.substring(startIndex,endIndex),word=getWordAtText(startIndex+1,DEFAULT_WORD_REGEXP,lineContent,0),highlightReason=codePointHighlighter.shouldHighlightNonBasicASCII(str,word?word.word:null);if(0!==highlightReason){3===highlightReason?ambiguousCharacterCount++:2===highlightReason?invisibleCharacterCount++:1===highlightReason?nonBasicAsciiCharacterCount++:assertNever(highlightReason);const MAX_RESULT_LENGTH=1e3;if(ranges.length>=MAX_RESULT_LENGTH){hasMore=!0;break forLoop}ranges.push(new Range(lineNumber,startIndex+1,lineNumber,endIndex+1))}}}while(m)}return{ranges,hasMore,ambiguousCharacterCount,invisibleCharacterCount,nonBasicAsciiCharacterCount}}static computeUnicodeHighlightReason(char,options){const codePointHighlighter=new CodePointHighlighter(options);switch(codePointHighlighter.shouldHighlightNonBasicASCII(char,null)){case 0:return null;case 2:return{kind:1};case 3:{const codePoint=char.codePointAt(0),primaryConfusable=codePointHighlighter.ambiguousCharacters.getPrimaryConfusable(codePoint),notAmbiguousInLocales=strings.AmbiguousCharacters.getLocales().filter((l=>!strings.AmbiguousCharacters.getInstance(new Set([...options.allowedLocales,l])).isAmbiguous(codePoint)));return{kind:0,confusableWith:String.fromCodePoint(primaryConfusable),notAmbiguousInLocales}}case 1:return{kind:2}}}}function buildRegExpCharClassExpr(codePoints,flags){return`[${strings.escapeRegExpCharacters(codePoints.map((i=>String.fromCodePoint(i))).join(""))}]`}class CodePointHighlighter{constructor(options){this.options=options,this.allowedCodePoints=new Set(options.allowedCodePoints),this.ambiguousCharacters=strings.AmbiguousCharacters.getInstance(new Set(options.allowedLocales))}getCandidateCodePoints(){if(this.options.nonBasicASCII)return"allNonBasicAscii";const set=new Set;if(this.options.invisibleCharacters)for(const cp of strings.InvisibleCharacters.codePoints)isAllowedInvisibleCharacter(String.fromCodePoint(cp))||set.add(cp);if(this.options.ambiguousCharacters)for(const cp of this.ambiguousCharacters.getConfusableCodePoints())set.add(cp);for(const cp of this.allowedCodePoints)set.delete(cp);return set}shouldHighlightNonBasicASCII(character,wordContext){const codePoint=character.codePointAt(0);if(this.allowedCodePoints.has(codePoint))return 0;if(this.options.nonBasicASCII)return 1;let hasBasicASCIICharacters=!1,hasNonConfusableNonBasicAsciiCharacter=!1;if(wordContext)for(let char of wordContext){const codePoint=char.codePointAt(0),isBasicASCII=strings.isBasicASCII(char);hasBasicASCIICharacters=hasBasicASCIICharacters||isBasicASCII,isBasicASCII||this.ambiguousCharacters.isAmbiguous(codePoint)||strings.InvisibleCharacters.isInvisibleCharacter(codePoint)||(hasNonConfusableNonBasicAsciiCharacter=!0)}return!hasBasicASCIICharacters&&hasNonConfusableNonBasicAsciiCharacter?0:this.options.invisibleCharacters&&!isAllowedInvisibleCharacter(character)&&strings.InvisibleCharacters.isInvisibleCharacter(codePoint)?2:this.options.ambiguousCharacters&&this.ambiguousCharacters.isAmbiguous(codePoint)?3:0}}function isAllowedInvisibleCharacter(character){return" "===character||"\n"===character||"\t"===character}