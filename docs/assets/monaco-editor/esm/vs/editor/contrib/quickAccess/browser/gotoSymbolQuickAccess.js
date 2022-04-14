var __decorate=this&&this.__decorate||function(decorators,target,key,desc){var d,c=arguments.length,r=c<3?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)(d=decorators[i])&&(r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r);return c>3&&r&&Object.defineProperty(target,key,r),r},__param=this&&this.__param||function(paramIndex,decorator){return function(target,key){decorator(target,key,paramIndex)}},__awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){result.done?resolve(result.value):function adopt(value){return value instanceof P?value:new P((function(resolve){resolve(value)}))}(result.value).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))};import{DeferredPromise}from"../../../../base/common/async.js";import{CancellationTokenSource}from"../../../../base/common/cancellation.js";import{Codicon}from"../../../../base/common/codicons.js";import{pieceToQuery,prepareQuery,scoreFuzzy2}from"../../../../base/common/fuzzyScorer.js";import{Disposable,DisposableStore,toDisposable}from"../../../../base/common/lifecycle.js";import{format,trim}from"../../../../base/common/strings.js";import{Range}from"../../../common/core/range.js";import{SymbolKinds}from"../../../common/languages.js";import{IOutlineModelService}from"../../documentSymbols/browser/outlineModel.js";import{AbstractEditorNavigationQuickAccessProvider}from"./editorNavigationQuickAccess.js";import{localize}from"../../../../nls.js";import{ILanguageFeaturesService}from"../../../common/services/languageFeatures.js";let AbstractGotoSymbolQuickAccessProvider=class AbstractGotoSymbolQuickAccessProvider extends AbstractEditorNavigationQuickAccessProvider{constructor(_languageFeaturesService,_outlineModelService,options=Object.create(null)){super(options),this._languageFeaturesService=_languageFeaturesService,this._outlineModelService=_outlineModelService,this.options=options,this.options.canAcceptInBackground=!0}provideWithoutTextEditor(picker){return this.provideLabelPick(picker,localize("cannotRunGotoSymbolWithoutEditor","To go to a symbol, first open a text editor with symbol information.")),Disposable.None}provideWithTextEditor(context,picker,token){const editor=context.editor,model=this.getModel(editor);return model?this._languageFeaturesService.documentSymbolProvider.has(model)?this.doProvideWithEditorSymbols(context,model,picker,token):this.doProvideWithoutEditorSymbols(context,model,picker,token):Disposable.None}doProvideWithoutEditorSymbols(context,model,picker,token){const disposables=new DisposableStore;return this.provideLabelPick(picker,localize("cannotRunGotoSymbolWithoutSymbolProvider","The active text editor does not provide symbol information.")),(()=>{__awaiter(this,void 0,void 0,(function*(){(yield this.waitForLanguageSymbolRegistry(model,disposables))&&!token.isCancellationRequested&&disposables.add(this.doProvideWithEditorSymbols(context,model,picker,token))}))})(),disposables}provideLabelPick(picker,label){picker.items=[{label,index:0,kind:14}],picker.ariaLabel=label}waitForLanguageSymbolRegistry(model,disposables){return __awaiter(this,void 0,void 0,(function*(){if(this._languageFeaturesService.documentSymbolProvider.has(model))return!0;const symbolProviderRegistryPromise=new DeferredPromise,symbolProviderListener=disposables.add(this._languageFeaturesService.documentSymbolProvider.onDidChange((()=>{this._languageFeaturesService.documentSymbolProvider.has(model)&&(symbolProviderListener.dispose(),symbolProviderRegistryPromise.complete(!0))})));return disposables.add(toDisposable((()=>symbolProviderRegistryPromise.complete(!1)))),symbolProviderRegistryPromise.p}))}doProvideWithEditorSymbols(context,model,picker,token){const editor=context.editor,disposables=new DisposableStore;disposables.add(picker.onDidAccept((event=>{const[item]=picker.selectedItems;item&&item.range&&(this.gotoLocation(context,{range:item.range.selection,keyMods:picker.keyMods,preserveFocus:event.inBackground}),event.inBackground||picker.hide())}))),disposables.add(picker.onDidTriggerItemButton((({item})=>{item&&item.range&&(this.gotoLocation(context,{range:item.range.selection,keyMods:picker.keyMods,forceSideBySide:!0}),picker.hide())})));const symbolsPromise=this.getDocumentSymbols(model,token);let picksCts;const updatePickerItems=()=>__awaiter(this,void 0,void 0,(function*(){null==picksCts||picksCts.dispose(!0),picker.busy=!1,picksCts=new CancellationTokenSource(token),picker.busy=!0;try{const query=prepareQuery(picker.value.substr(AbstractGotoSymbolQuickAccessProvider.PREFIX.length).trim()),items=yield this.doGetSymbolPicks(symbolsPromise,query,void 0,picksCts.token);if(token.isCancellationRequested)return;items.length>0?picker.items=items:query.original.length>0?this.provideLabelPick(picker,localize("noMatchingSymbolResults","No matching editor symbols")):this.provideLabelPick(picker,localize("noSymbolResults","No editor symbols"))}finally{token.isCancellationRequested||(picker.busy=!1)}}));disposables.add(picker.onDidChangeValue((()=>updatePickerItems()))),updatePickerItems();let ignoreFirstActiveEvent=!0;return disposables.add(picker.onDidChangeActive((()=>{const[item]=picker.activeItems;if(item&&item.range){if(ignoreFirstActiveEvent)return void(ignoreFirstActiveEvent=!1);editor.revealRangeInCenter(item.range.selection,0),this.addDecorations(editor,item.range.decoration)}}))),disposables}doGetSymbolPicks(symbolsPromise,query,options,token){return __awaiter(this,void 0,void 0,(function*(){const symbols=yield symbolsPromise;if(token.isCancellationRequested)return[];const filterBySymbolKind=0===query.original.indexOf(AbstractGotoSymbolQuickAccessProvider.SCOPE_PREFIX),filterPos=filterBySymbolKind?1:0;let symbolQuery,containerQuery;query.values&&query.values.length>1?(symbolQuery=pieceToQuery(query.values[0]),containerQuery=pieceToQuery(query.values.slice(1))):symbolQuery=query;const filteredSymbolPicks=[];for(let index=0;index<symbols.length;index++){const symbol=symbols[index],symbolLabel=trim(symbol.name),symbolLabelWithIcon=`$(${SymbolKinds.toIcon(symbol.kind).id}) ${symbolLabel}`,symbolLabelIconOffset=symbolLabelWithIcon.length-symbolLabel.length;let symbolScore,symbolMatches,containerScore,containerMatches,containerLabel=symbol.containerName;if((null==options?void 0:options.extraContainerLabel)&&(containerLabel=containerLabel?`${options.extraContainerLabel} • ${containerLabel}`:options.extraContainerLabel),query.original.length>filterPos){let skipContainerQuery=!1;if(symbolQuery!==query&&([symbolScore,symbolMatches]=scoreFuzzy2(symbolLabelWithIcon,Object.assign(Object.assign({},query),{values:void 0}),filterPos,symbolLabelIconOffset),"number"==typeof symbolScore&&(skipContainerQuery=!0)),"number"!=typeof symbolScore&&([symbolScore,symbolMatches]=scoreFuzzy2(symbolLabelWithIcon,symbolQuery,filterPos,symbolLabelIconOffset),"number"!=typeof symbolScore))continue;if(!skipContainerQuery&&containerQuery){if(containerLabel&&containerQuery.original.length>0&&([containerScore,containerMatches]=scoreFuzzy2(containerLabel,containerQuery)),"number"!=typeof containerScore)continue;"number"==typeof symbolScore&&(symbolScore+=containerScore)}}const deprecated=symbol.tags&&symbol.tags.indexOf(1)>=0;filteredSymbolPicks.push({index,kind:symbol.kind,score:symbolScore,label:symbolLabelWithIcon,ariaLabel:symbolLabel,description:containerLabel,highlights:deprecated?void 0:{label:symbolMatches,description:containerMatches},range:{selection:Range.collapseToStart(symbol.selectionRange),decoration:symbol.range},strikethrough:deprecated,buttons:(()=>{var _a,_b;const openSideBySideDirection=(null===(_a=this.options)||void 0===_a?void 0:_a.openSideBySideDirection)?null===(_b=this.options)||void 0===_b?void 0:_b.openSideBySideDirection():void 0;if(openSideBySideDirection)return[{iconClass:"right"===openSideBySideDirection?Codicon.splitHorizontal.classNames:Codicon.splitVertical.classNames,tooltip:"right"===openSideBySideDirection?localize("openToSide","Open to the Side"):localize("openToBottom","Open to the Bottom")}]})()})}const sortedFilteredSymbolPicks=filteredSymbolPicks.sort(((symbolA,symbolB)=>filterBySymbolKind?this.compareByKindAndScore(symbolA,symbolB):this.compareByScore(symbolA,symbolB)));let symbolPicks=[];if(filterBySymbolKind){let lastSymbolKind,lastSeparator,lastSymbolKindCounter=0;function updateLastSeparatorLabel(){lastSeparator&&"number"==typeof lastSymbolKind&&lastSymbolKindCounter>0&&(lastSeparator.label=format(NLS_SYMBOL_KIND_CACHE[lastSymbolKind]||FALLBACK_NLS_SYMBOL_KIND,lastSymbolKindCounter))}for(const symbolPick of sortedFilteredSymbolPicks)lastSymbolKind!==symbolPick.kind?(updateLastSeparatorLabel(),lastSymbolKind=symbolPick.kind,lastSymbolKindCounter=1,lastSeparator={type:"separator"},symbolPicks.push(lastSeparator)):lastSymbolKindCounter++,symbolPicks.push(symbolPick);updateLastSeparatorLabel()}else sortedFilteredSymbolPicks.length>0&&(symbolPicks=[{label:localize("symbols","symbols ({0})",filteredSymbolPicks.length),type:"separator"},...sortedFilteredSymbolPicks]);return symbolPicks}))}compareByScore(symbolA,symbolB){if("number"!=typeof symbolA.score&&"number"==typeof symbolB.score)return 1;if("number"==typeof symbolA.score&&"number"!=typeof symbolB.score)return-1;if("number"==typeof symbolA.score&&"number"==typeof symbolB.score){if(symbolA.score>symbolB.score)return-1;if(symbolA.score<symbolB.score)return 1}return symbolA.index<symbolB.index?-1:symbolA.index>symbolB.index?1:0}compareByKindAndScore(symbolA,symbolB){const kindA=NLS_SYMBOL_KIND_CACHE[symbolA.kind]||FALLBACK_NLS_SYMBOL_KIND,kindB=NLS_SYMBOL_KIND_CACHE[symbolB.kind]||FALLBACK_NLS_SYMBOL_KIND,result=kindA.localeCompare(kindB);return 0===result?this.compareByScore(symbolA,symbolB):result}getDocumentSymbols(document,token){return __awaiter(this,void 0,void 0,(function*(){const model=yield this._outlineModelService.getOrCreate(document,token);return token.isCancellationRequested?[]:model.asListOfDocumentSymbols()}))}};AbstractGotoSymbolQuickAccessProvider.PREFIX="@",AbstractGotoSymbolQuickAccessProvider.SCOPE_PREFIX=":",AbstractGotoSymbolQuickAccessProvider.PREFIX_BY_CATEGORY=`${AbstractGotoSymbolQuickAccessProvider.PREFIX}${AbstractGotoSymbolQuickAccessProvider.SCOPE_PREFIX}`,AbstractGotoSymbolQuickAccessProvider=__decorate([__param(0,ILanguageFeaturesService),__param(1,IOutlineModelService)],AbstractGotoSymbolQuickAccessProvider);export{AbstractGotoSymbolQuickAccessProvider};const FALLBACK_NLS_SYMBOL_KIND=localize("property","properties ({0})"),NLS_SYMBOL_KIND_CACHE={5:localize("method","methods ({0})"),11:localize("function","functions ({0})"),8:localize("_constructor","constructors ({0})"),12:localize("variable","variables ({0})"),4:localize("class","classes ({0})"),22:localize("struct","structs ({0})"),23:localize("event","events ({0})"),24:localize("operator","operators ({0})"),10:localize("interface","interfaces ({0})"),2:localize("namespace","namespaces ({0})"),3:localize("package","packages ({0})"),25:localize("typeParameter","type parameters ({0})"),1:localize("modules","modules ({0})"),6:localize("property","properties ({0})"),9:localize("enum","enumerations ({0})"),21:localize("enumMember","enumeration members ({0})"),14:localize("string","strings ({0})"),0:localize("file","files ({0})"),17:localize("array","arrays ({0})"),15:localize("number","numbers ({0})"),16:localize("boolean","booleans ({0})"),18:localize("object","objects ({0})"),19:localize("key","keys ({0})"),7:localize("field","fields ({0})"),13:localize("constant","constants ({0})")};