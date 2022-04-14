import{$,addDisposableListener,append,EventHelper,EventType}from"../../dom.js";import{StandardKeyboardEvent}from"../../keyboardEvent.js";import{EventType as GestureEventType,Gesture}from"../../touch.js";import{ActionRunner}from"../../../common/actions.js";import{Emitter}from"../../../common/event.js";import"./dropdown.css";export class BaseDropdown extends ActionRunner{constructor(container,options){super(),this._onDidChangeVisibility=this._register(new Emitter),this.onDidChangeVisibility=this._onDidChangeVisibility.event,this._element=append(container,$(".monaco-dropdown")),this._label=append(this._element,$(".dropdown-label"));let labelRenderer=options.labelRenderer;labelRenderer||(labelRenderer=container=>(container.textContent=options.label||"",null));for(const event of[EventType.CLICK,EventType.MOUSE_DOWN,GestureEventType.Tap])this._register(addDisposableListener(this.element,event,(e=>EventHelper.stop(e,!0))));for(const event of[EventType.MOUSE_DOWN,GestureEventType.Tap])this._register(addDisposableListener(this._label,event,(e=>{e instanceof MouseEvent&&e.detail>1||(this.visible?this.hide():this.show())})));this._register(addDisposableListener(this._label,EventType.KEY_UP,(e=>{const event=new StandardKeyboardEvent(e);(event.equals(3)||event.equals(10))&&(EventHelper.stop(e,!0),this.visible?this.hide():this.show())})));const cleanupFn=labelRenderer(this._label);cleanupFn&&this._register(cleanupFn),this._register(Gesture.addTarget(this._label))}get element(){return this._element}show(){this.visible||(this.visible=!0,this._onDidChangeVisibility.fire(!0))}hide(){this.visible&&(this.visible=!1,this._onDidChangeVisibility.fire(!1))}dispose(){super.dispose(),this.hide(),this.boxContainer&&(this.boxContainer.remove(),this.boxContainer=void 0),this.contents&&(this.contents.remove(),this.contents=void 0),this._label&&(this._label.remove(),this._label=void 0)}}export class DropdownMenu extends BaseDropdown{constructor(container,options){super(container,options),this._actions=[],this._contextMenuProvider=options.contextMenuProvider,this.actions=options.actions||[],this.actionProvider=options.actionProvider,this.menuClassName=options.menuClassName||"",this.menuAsChild=!!options.menuAsChild}set menuOptions(options){this._menuOptions=options}get menuOptions(){return this._menuOptions}get actions(){return this.actionProvider?this.actionProvider.getActions():this._actions}set actions(actions){this._actions=actions}show(){super.show(),this.element.classList.add("active"),this._contextMenuProvider.showContextMenu({getAnchor:()=>this.element,getActions:()=>this.actions,getActionsContext:()=>this.menuOptions?this.menuOptions.context:null,getActionViewItem:action=>this.menuOptions&&this.menuOptions.actionViewItemProvider?this.menuOptions.actionViewItemProvider(action):void 0,getKeyBinding:action=>this.menuOptions&&this.menuOptions.getKeyBinding?this.menuOptions.getKeyBinding(action):void 0,getMenuClassName:()=>this.menuClassName,onHide:()=>this.onHide(),actionRunner:this.menuOptions?this.menuOptions.actionRunner:void 0,anchorAlignment:this.menuOptions?this.menuOptions.anchorAlignment:0,domForShadowRoot:this.menuAsChild?this.element:void 0})}hide(){super.hide()}onHide(){this.hide(),this.element.classList.remove("active")}}