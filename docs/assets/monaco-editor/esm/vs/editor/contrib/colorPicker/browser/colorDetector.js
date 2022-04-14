var __decorate=this&&this.__decorate||function(decorators,target,key,desc){var d,c=arguments.length,r=c<3?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)(d=decorators[i])&&(r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r);return c>3&&r&&Object.defineProperty(target,key,r),r},__param=this&&this.__param||function(paramIndex,decorator){return function(target,key){decorator(target,key,paramIndex)}},__awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){result.done?resolve(result.value):function adopt(value){return value instanceof P?value:new P((function(resolve){resolve(value)}))}(result.value).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))};import{createCancelablePromise,TimeoutTimer}from"../../../../base/common/async.js";import{RGBA}from"../../../../base/common/color.js";import{onUnexpectedError}from"../../../../base/common/errors.js";import{Disposable,DisposableStore}from"../../../../base/common/lifecycle.js";import{StopWatch}from"../../../../base/common/stopwatch.js";import{noBreakWhitespace}from"../../../../base/common/strings.js";import{DynamicCssRules}from"../../../browser/editorDom.js";import{registerEditorContribution}from"../../../browser/editorExtensions.js";import{Range}from"../../../common/core/range.js";import{ModelDecorationOptions}from"../../../common/model/textModel.js";import{ILanguageFeatureDebounceService}from"../../../common/services/languageFeatureDebounce.js";import{ILanguageFeaturesService}from"../../../common/services/languageFeatures.js";import{getColors}from"./color.js";import{IConfigurationService}from"../../../../platform/configuration/common/configuration.js";export const ColorDecorationInjectedTextMarker=Object.create({});const MAX_DECORATORS=500;let ColorDetector=class ColorDetector extends Disposable{constructor(_editor,_configurationService,_languageFeaturesService,languageFeatureDebounceService){super(),this._editor=_editor,this._configurationService=_configurationService,this._languageFeaturesService=_languageFeaturesService,this._localToDispose=this._register(new DisposableStore),this._decorationsIds=[],this._colorDatas=new Map,this._colorDecoratorIds=new Set,this._ruleFactory=new DynamicCssRules(this._editor),this._colorDecorationClassRefs=this._register(new DisposableStore),this._debounceInformation=languageFeatureDebounceService.for(_languageFeaturesService.colorProvider,"Document Colors",{min:ColorDetector.RECOMPUTE_TIME}),this._register(_editor.onDidChangeModel((()=>{this._isEnabled=this.isEnabled(),this.onModelChanged()}))),this._register(_editor.onDidChangeModelLanguage((()=>this.onModelChanged()))),this._register(_languageFeaturesService.colorProvider.onDidChange((()=>this.onModelChanged()))),this._register(_editor.onDidChangeConfiguration((()=>{let prevIsEnabled=this._isEnabled;this._isEnabled=this.isEnabled(),prevIsEnabled!==this._isEnabled&&(this._isEnabled?this.onModelChanged():this.removeAllDecorations())}))),this._timeoutTimer=null,this._computePromise=null,this._isEnabled=this.isEnabled(),this.onModelChanged()}isEnabled(){const model=this._editor.getModel();if(!model)return!1;const languageId=model.getLanguageId(),deprecatedConfig=this._configurationService.getValue(languageId);if(deprecatedConfig&&"object"==typeof deprecatedConfig){const colorDecorators=deprecatedConfig.colorDecorators;if(colorDecorators&&void 0!==colorDecorators.enable&&!colorDecorators.enable)return colorDecorators.enable}return this._editor.getOption(17)}static get(editor){return editor.getContribution(this.ID)}dispose(){this.stop(),this.removeAllDecorations(),super.dispose()}onModelChanged(){if(this.stop(),!this._isEnabled)return;const model=this._editor.getModel();model&&this._languageFeaturesService.colorProvider.has(model)&&(this._localToDispose.add(this._editor.onDidChangeModelContent((()=>{this._timeoutTimer||(this._timeoutTimer=new TimeoutTimer,this._timeoutTimer.cancelAndSet((()=>{this._timeoutTimer=null,this.beginCompute()}),this._debounceInformation.get(model)))}))),this.beginCompute())}beginCompute(){this._computePromise=createCancelablePromise((token=>__awaiter(this,void 0,void 0,(function*(){const model=this._editor.getModel();if(!model)return Promise.resolve([]);const sw=new StopWatch(!1),colors=yield getColors(this._languageFeaturesService.colorProvider,model,token);return this._debounceInformation.update(model,sw.elapsed()),colors})))),this._computePromise.then((colorInfos=>{this.updateDecorations(colorInfos),this.updateColorDecorators(colorInfos),this._computePromise=null}),onUnexpectedError)}stop(){this._timeoutTimer&&(this._timeoutTimer.cancel(),this._timeoutTimer=null),this._computePromise&&(this._computePromise.cancel(),this._computePromise=null),this._localToDispose.clear()}updateDecorations(colorDatas){const decorations=colorDatas.map((c=>({range:{startLineNumber:c.colorInfo.range.startLineNumber,startColumn:c.colorInfo.range.startColumn,endLineNumber:c.colorInfo.range.endLineNumber,endColumn:c.colorInfo.range.endColumn},options:ModelDecorationOptions.EMPTY})));this._decorationsIds=this._editor.deltaDecorations(this._decorationsIds,decorations),this._colorDatas=new Map,this._decorationsIds.forEach(((id,i)=>this._colorDatas.set(id,colorDatas[i])))}updateColorDecorators(colorData){this._colorDecorationClassRefs.clear();let decorations=[];for(let i=0;i<colorData.length&&decorations.length<500;i++){const{red,green,blue,alpha}=colorData[i].colorInfo.color,rgba=new RGBA(Math.round(255*red),Math.round(255*green),Math.round(255*blue),alpha);let color=`rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;const ref=this._colorDecorationClassRefs.add(this._ruleFactory.createClassNameRef({backgroundColor:color}));decorations.push({range:{startLineNumber:colorData[i].colorInfo.range.startLineNumber,startColumn:colorData[i].colorInfo.range.startColumn,endLineNumber:colorData[i].colorInfo.range.endLineNumber,endColumn:colorData[i].colorInfo.range.endColumn},options:{description:"colorDetector",before:{content:noBreakWhitespace,inlineClassName:`${ref.className} colorpicker-color-decoration`,inlineClassNameAffectsLetterSpacing:!0,attachedData:ColorDecorationInjectedTextMarker}}})}this._colorDecoratorIds=new Set(this._editor.deltaDecorations([...this._colorDecoratorIds],decorations))}removeAllDecorations(){this._decorationsIds=this._editor.deltaDecorations(this._decorationsIds,[]),this._colorDecoratorIds=new Set(this._editor.deltaDecorations([...this._colorDecoratorIds],[])),this._colorDecorationClassRefs.clear()}getColorData(position){const model=this._editor.getModel();if(!model)return null;const decorations=model.getDecorationsInRange(Range.fromPositions(position,position)).filter((d=>this._colorDatas.has(d.id)));return 0===decorations.length?null:this._colorDatas.get(decorations[0].id)}isColorDecorationId(decorationId){return this._colorDecoratorIds.has(decorationId)}};ColorDetector.ID="editor.contrib.colorDetector",ColorDetector.RECOMPUTE_TIME=1e3,ColorDetector=__decorate([__param(1,IConfigurationService),__param(2,ILanguageFeaturesService),__param(3,ILanguageFeatureDebounceService)],ColorDetector);export{ColorDetector};registerEditorContribution(ColorDetector.ID,ColorDetector);