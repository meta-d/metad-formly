(self.webpackChunkmetad_formly=self.webpackChunkmetad_formly||[]).push([[179],{"./apps/example sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$":(module,__unused_webpack_exports,__webpack_require__)=>{var map={"./src/app/nx-welcome.component.stories.ts":"./apps/example/src/app/nx-welcome.component.stories.ts"};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id="./apps/example sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$"},"./apps/example sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$":(module,__unused_webpack_exports,__webpack_require__)=>{var map={"./src/app/intro.stories.mdx":"./apps/example/src/app/intro.stories.mdx"};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id="./apps/example sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$"},"./libs sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./libs sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$",module.exports=webpackEmptyContext},"./libs sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./libs sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$",module.exports=webpackEmptyContext},"./apps/example/src/styles.scss":()=>{},"./apps/example/src/polyfills.ts":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__("./node_modules/zone.js/fesm2015/zone.js")},"./libs/material/json/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{cD:()=>MetadFormlyMatJsonModule});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.js");var core=__webpack_require__("./node_modules/@angular/core/fesm2020/core.mjs"),fesm2020_forms=__webpack_require__("./node_modules/@angular/forms/fesm2020/forms.mjs"),ngx_formly_core=__webpack_require__("./node_modules/@ngx-formly/core/fesm2015/ngx-formly-core.js"),startWith=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/startWith.js"),distinctUntilChanged=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/distinctUntilChanged.js");let MetadFormlyJsonComponent=class MetadFormlyJsonComponent extends ngx_formly_core.fS{constructor(){super(...arguments),this.appearance="standard",this.fControl=new fesm2020_forms.FormControl}ngOnInit(){var _a,_b,_c;this.appearance=null!==(_c=null===(_b=null===(_a=this.to)||void 0===_a?void 0:_a.attributes)||void 0===_b?void 0:_b.appearance)&&void 0!==_c?_c:this.appearance,this.formControl.valueChanges.pipe((0,startWith.O)(this.formControl.value)).subscribe((value=>{console.warn(value),this.fControl.setValue(JSON.stringify(value||void 0,null,2))})),this.fControl.valueChanges.pipe((0,distinctUntilChanged.x)()).subscribe((value=>{try{const json=function parse(value){return function isBlank(value){return null==value||"string"==typeof value&&!value.trim()}(value)?null:JSON.parse(value)}(value);this.formControl.setValue(json,{emitEvent:!1})}catch(err){this.fControl.setErrors({err})}}))}};MetadFormlyJsonComponent.propDecorators={appearance:[{type:core.HostBinding,args:["class.metad-formly-mat-json"]}]},MetadFormlyJsonComponent=(0,tslib_es6.gn)([(0,core.Component)({changeDetection:core.ChangeDetectionStrategy.OnPush,selector:"metad-formly-mat-json",template:'<mat-form-field [appearance]="appearance">\n  <mat-label>{{to.label}}</mat-label>\n\n  <textarea matInput [formControl]="fControl"></textarea>\n\n  <mat-error *ngIf="fControl.invalid">\n    <span *ngFor="let item of fControl.errors | keyvalue">{{item.value.message}}</span>\n  </mat-error>\n</mat-form-field>\n',styles:[":host {\n  flex: 1;\n  max-width: 100%;\n}\n\n.mat-form-field {\n  max-width: 100%;\n}"]})],MetadFormlyJsonComponent);var common=__webpack_require__("./node_modules/@angular/common/fesm2020/common.mjs"),form_field=__webpack_require__("./node_modules/@angular/material/fesm2020/form-field.mjs"),icon=__webpack_require__("./node_modules/@angular/material/fesm2020/icon.mjs"),input=__webpack_require__("./node_modules/@angular/material/fesm2020/input.mjs");let MetadFormlyMatJsonModule=class MetadFormlyMatJsonModule{};MetadFormlyMatJsonModule=(0,tslib_es6.gn)([(0,core.NgModule)({imports:[common.ez,fesm2020_forms.FormsModule,fesm2020_forms.ReactiveFormsModule,form_field.lN,input.c,icon.Ps,ngx_formly_core.X0.forChild({types:[{name:"mat-json",component:MetadFormlyJsonComponent},{name:"json",extends:"mat-json"}]})],exports:[MetadFormlyJsonComponent],declarations:[MetadFormlyJsonComponent],providers:[]})],MetadFormlyMatJsonModule)},"./apps/example/src/app/nx-welcome.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,default:()=>nx_welcome_component_stories});var fesm2020_forms=__webpack_require__("./node_modules/@angular/forms/fesm2020/forms.mjs"),fesm2020_button=__webpack_require__("./node_modules/@angular/material/fesm2020/button.mjs"),json=__webpack_require__("./libs/material/json/index.ts"),ngx_formly_core=__webpack_require__("./node_modules/@ngx-formly/core/fesm2015/ngx-formly-core.js"),client=__webpack_require__("./node_modules/@storybook/angular/dist/ts3.9/client/index.js"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.js"),core=__webpack_require__("./node_modules/@angular/core/fesm2020/core.mjs");let NxWelcomeComponent=class NxWelcomeComponent{constructor(){this.form=new fesm2020_forms.FormGroup({}),this.model={}}ngOnInit(){}onSubmit(model){console.log(model)}};NxWelcomeComponent.ctorParameters=()=>[],NxWelcomeComponent.propDecorators={schema:[{type:core.Input}]},NxWelcomeComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"metad-formly-nx-welcome",template:"\n    \x3c!--\n     * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n     This is a starter component and can be deleted.\n     * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n     Delete this file and get started with your project!\n     * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n     --\x3e\n    <style>\n      html {\n        -webkit-text-size-adjust: 100%;\n        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,\n          'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,\n          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',\n          'Noto Color Emoji';\n        line-height: 1.5;\n        tab-size: 4;\n        scroll-behavior: smooth;\n      }\n      body {\n        font-family: inherit;\n        line-height: inherit;\n        margin: 0;\n      }\n      h1,\n      h2,\n      p,\n      pre {\n        margin: 0;\n      }\n      *,\n      ::before,\n      ::after {\n        box-sizing: border-box;\n        border-width: 0;\n        border-style: solid;\n        border-color: currentColor;\n      }\n      h1,\n      h2 {\n        font-size: inherit;\n        font-weight: inherit;\n      }\n      a {\n        color: inherit;\n        text-decoration: inherit;\n      }\n      pre {\n        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,\n          'Liberation Mono', 'Courier New', monospace;\n      }\n      svg {\n        display: block;\n        vertical-align: middle;\n      }\n\n      svg {\n        shape-rendering: auto;\n        text-rendering: optimizeLegibility;\n      }\n      pre {\n        background-color: rgba(55, 65, 81, 1);\n        border-radius: 0.25rem;\n        color: rgba(229, 231, 235, 1);\n        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,\n          'Liberation Mono', 'Courier New', monospace;\n        overflow: scroll;\n        padding: 0.5rem 0.75rem;\n      }\n\n      .shadow {\n        box-shadow: 0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgba(0, 0, 0, 0.1),\n          0 4px 6px -2px rgba(0, 0, 0, 0.05);\n      }\n      .rounded {\n        border-radius: 1.5rem;\n      }\n\n      .wrapper {\n        width: 100%;\n      }\n      .container {\n        margin-left: auto;\n        margin-right: auto;\n        max-width: 768px;\n        padding-bottom: 3rem;\n        padding-left: 1rem;\n        padding-right: 1rem;\n        color: rgba(55, 65, 81, 1);\n        width: 100%;\n      }\n      #welcome {\n        margin-top: 2.5rem;\n      }\n      #welcome h1 {\n        font-size: 3rem;\n        font-weight: 500;\n        letter-spacing: -0.025em;\n        line-height: 1;\n      }\n      #welcome span {\n        display: block;\n        font-size: 1.875rem;\n        font-weight: 300;\n        line-height: 2.25rem;\n        margin-bottom: 0.5rem;\n      }\n      #hero {\n        align-items: center;\n        background-color: hsla(214, 62%, 21%, 1);\n        border: none;\n        box-sizing: border-box;\n        color: rgba(55, 65, 81, 1);\n        display: grid;\n        grid-template-columns: 1fr;\n        margin-top: 3.5rem;\n      }\n      #hero .text-container {\n        color: rgba(255, 255, 255, 1);\n        padding: 3rem 2rem;\n      }\n      #hero .text-container h2 {\n        font-size: 1.5rem;\n        line-height: 2rem;\n        position: relative;\n      }\n      #hero .text-container h2 svg {\n        color: hsla(162, 47%, 50%, 1);\n        height: 2rem;\n        left: -0.25rem;\n        position: absolute;\n        top: 0;\n        width: 2rem;\n      }\n      #hero .text-container h2 span {\n        margin-left: 2.5rem;\n      }\n      #hero .text-container a {\n        background-color: rgba(255, 255, 255, 1);\n        border-radius: 0.75rem;\n        color: rgba(55, 65, 81, 1);\n        display: inline-block;\n        margin-top: 1.5rem;\n        padding: 1rem 2rem;\n        text-decoration: inherit;\n      }\n      #hero .logo-container {\n        display: none;\n        justify-content: center;\n        padding-left: 2rem;\n        padding-right: 2rem;\n      }\n      #hero .logo-container svg {\n        color: rgba(255, 255, 255, 1);\n        width: 66.666667%;\n      }\n\n      #middle-content {\n        align-items: flex-start;\n        display: grid;\n        gap: 4rem;\n        grid-template-columns: 1fr;\n        margin-top: 3.5rem;\n      }\n\n      #learning-materials {\n        padding: 2.5rem 2rem;\n      }\n      #learning-materials h2 {\n        font-weight: 500;\n        font-size: 1.25rem;\n        letter-spacing: -0.025em;\n        line-height: 1.75rem;\n        padding-left: 1rem;\n        padding-right: 1rem;\n      }\n      .list-item-link {\n        align-items: center;\n        border-radius: 0.75rem;\n        display: flex;\n        margin-top: 1rem;\n        padding: 1rem;\n        transition-property: background-color, border-color, color, fill, stroke,\n          opacity, box-shadow, transform, filter, backdrop-filter,\n          -webkit-backdrop-filter;\n        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n        transition-duration: 150ms;\n        width: 100%;\n      }\n      .list-item-link svg:first-child {\n        margin-right: 1rem;\n        height: 1.5rem;\n        transition-property: background-color, border-color, color, fill, stroke,\n          opacity, box-shadow, transform, filter, backdrop-filter,\n          -webkit-backdrop-filter;\n        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n        transition-duration: 150ms;\n        width: 1.5rem;\n      }\n      .list-item-link > span {\n        flex-grow: 1;\n        font-weight: 400;\n        transition-property: background-color, border-color, color, fill, stroke,\n          opacity, box-shadow, transform, filter, backdrop-filter,\n          -webkit-backdrop-filter;\n        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n        transition-duration: 150ms;\n      }\n      .list-item-link > span > span {\n        color: rgba(107, 114, 128, 1);\n        display: block;\n        flex-grow: 1;\n        font-size: 0.75rem;\n        font-weight: 300;\n        line-height: 1rem;\n        transition-property: background-color, border-color, color, fill, stroke,\n          opacity, box-shadow, transform, filter, backdrop-filter,\n          -webkit-backdrop-filter;\n        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n        transition-duration: 150ms;\n      }\n      .list-item-link svg:last-child {\n        height: 1rem;\n        transition-property: all;\n        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n        transition-duration: 150ms;\n        width: 1rem;\n      }\n      .list-item-link:hover {\n        color: rgba(255, 255, 255, 1);\n        background-color: hsla(162, 47%, 50%, 1);\n      }\n      .list-item-link:hover > span {\n      }\n      .list-item-link:hover > span > span {\n        color: rgba(243, 244, 246, 1);\n      }\n      .list-item-link:hover svg:last-child {\n        transform: translateX(0.25rem);\n      }\n\n      #other-links {\n      }\n      .button-pill {\n        padding: 1.5rem 2rem;\n        transition-duration: 300ms;\n        transition-property: background-color, border-color, color, fill, stroke,\n          opacity, box-shadow, transform, filter, backdrop-filter,\n          -webkit-backdrop-filter;\n        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n        align-items: center;\n        display: flex;\n      }\n      .button-pill svg {\n        transition-property: background-color, border-color, color, fill, stroke,\n          opacity, box-shadow, transform, filter, backdrop-filter,\n          -webkit-backdrop-filter;\n        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n        transition-duration: 150ms;\n        flex-shrink: 0;\n        width: 3rem;\n      }\n      .button-pill > span {\n        letter-spacing: -0.025em;\n        font-weight: 400;\n        font-size: 1.125rem;\n        line-height: 1.75rem;\n        padding-left: 1rem;\n        padding-right: 1rem;\n      }\n      .button-pill span span {\n        display: block;\n        font-size: 0.875rem;\n        font-weight: 300;\n        line-height: 1.25rem;\n      }\n      .button-pill:hover svg,\n      .button-pill:hover {\n        color: rgba(255, 255, 255, 1) !important;\n      }\n      #nx-console:hover {\n        background-color: rgba(0, 122, 204, 1);\n      }\n      #nx-console svg {\n        color: rgba(0, 122, 204, 1);\n      }\n\n      #nx-repo:hover {\n        background-color: rgba(24, 23, 23, 1);\n      }\n      #nx-repo svg {\n        color: rgba(24, 23, 23, 1);\n      }\n\n      #nx-cloud {\n        margin-bottom: 2rem;\n        margin-top: 2rem;\n        padding: 2.5rem 2rem;\n      }\n      #nx-cloud > div {\n        align-items: center;\n        display: flex;\n      }\n      #nx-cloud > div svg {\n        border-radius: 0.375rem;\n        flex-shrink: 0;\n        width: 3rem;\n      }\n      #nx-cloud > div h2 {\n        font-size: 1.125rem;\n        font-weight: 400;\n        letter-spacing: -0.025em;\n        line-height: 1.75rem;\n        padding-left: 1rem;\n        padding-right: 1rem;\n      }\n      #nx-cloud > div h2 span {\n        display: block;\n        font-size: 0.875rem;\n        font-weight: 300;\n        line-height: 1.25rem;\n      }\n      #nx-cloud p {\n        font-size: 1rem;\n        line-height: 1.5rem;\n        margin-top: 1rem;\n      }\n      #nx-cloud pre {\n        margin-top: 1rem;\n      }\n      #nx-cloud a {\n        color: rgba(107, 114, 128, 1);\n        display: block;\n        font-size: 0.875rem;\n        line-height: 1.25rem;\n        margin-top: 1.5rem;\n        text-align: right;\n      }\n      #nx-cloud a:hover {\n        text-decoration: underline;\n      }\n\n      #commands {\n        padding: 2.5rem 2rem;\n\n        margin-top: 3.5rem;\n      }\n      #commands h2 {\n        font-size: 1.25rem;\n        font-weight: 400;\n        letter-spacing: -0.025em;\n        line-height: 1.75rem;\n        padding-left: 1rem;\n        padding-right: 1rem;\n      }\n      #commands p {\n        font-size: 1rem;\n        font-weight: 300;\n        line-height: 1.5rem;\n        margin-top: 1rem;\n        padding-left: 1rem;\n        padding-right: 1rem;\n      }\n      details {\n        align-items: center;\n        display: flex;\n        margin-top: 1rem;\n        padding-left: 1rem;\n        padding-right: 1rem;\n        width: 100%;\n      }\n      details pre > span {\n        color: rgba(181, 181, 181, 1);\n      }\n      summary {\n        border-radius: 0.5rem;\n        display: flex;\n        font-weight: 400;\n        padding: 0.5rem;\n        cursor: pointer;\n        transition-property: background-color, border-color, color, fill, stroke,\n          opacity, box-shadow, transform, filter, backdrop-filter,\n          -webkit-backdrop-filter;\n        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n        transition-duration: 150ms;\n      }\n      summary:hover {\n        background-color: rgba(243, 244, 246, 1);\n      }\n      summary svg {\n        height: 1.5rem;\n        margin-right: 1rem;\n        width: 1.5rem;\n      }\n\n      #love {\n        color: rgba(107, 114, 128, 1);\n        font-size: 0.875rem;\n        line-height: 1.25rem;\n        margin-top: 3.5rem;\n        opacity: 0.6;\n        text-align: center;\n      }\n      #love svg {\n        color: rgba(252, 165, 165, 1);\n        width: 1.25rem;\n        height: 1.25rem;\n        display: inline;\n        margin-top: -0.25rem;\n      }\n\n      @media screen and (min-width: 768px) {\n        #hero {\n          grid-template-columns: repeat(2, minmax(0, 1fr));\n        }\n        #hero .logo-container {\n          display: flex;\n        }\n        #middle-content {\n          grid-template-columns: repeat(2, minmax(0, 1fr));\n        }\n      }\n    </style>\n    <div class=\"wrapper\">\n      <div class=\"container\">\n        \x3c!--  WELCOME  --\x3e\n        <div id=\"welcome\">\n          <h1>\n            <span> Metad Formly, </span>\n            Components for ngx-formly 👋\n          </h1>\n        </div>\n\n        <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit(model)\">\n          <formly-form [form]=\"form\" [fields]=\"schema\" [model]=\"model\"></formly-form>\n          <button mat-button type=\"submit\">Submit</button>\n        </form>\n\n      </div>\n    </div>\n  ",encapsulation:core.ViewEncapsulation.None}),(0,tslib_es6.w6)("design:paramtypes",[])],NxWelcomeComponent);var animations=__webpack_require__("./node_modules/@angular/platform-browser/fesm2020/animations.mjs");const nx_welcome_component_stories={title:"NxWelcomeComponent",component:NxWelcomeComponent,decorators:[(0,client.moduleMetadata)({imports:[animations.PW,fesm2020_forms.ReactiveFormsModule,fesm2020_button.ot,ngx_formly_core.X0.forRoot(),json.cD]})]},Primary=(args=>({props:args})).bind({});Primary.args={schema:[{key:"value",type:"json",templateOptions:{label:"JSON"}}]}},"./generated-stories-entry.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module=__webpack_require__.nmd(module),(0,__webpack_require__("./node_modules/@storybook/angular/dist/ts3.9/client/index.js").configure)([__webpack_require__("./apps/example sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$"),__webpack_require__("./apps/example sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$"),__webpack_require__("./libs sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$"),__webpack_require__("./libs sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$")],module,!1)},"./storybook-init-framework-entry.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__("./node_modules/@storybook/angular/dist/ts3.9/client/index.js")},"./apps/example/src/app/intro.stories.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{_1TextareaForJsonObject:()=>_1TextareaForJsonObject,_2MaterialAppearanceForJsonType:()=>_2MaterialAppearanceForJsonType,_3AntdTextareaType:()=>_3AntdTextareaType,default:()=>intro_stories});__webpack_require__("./node_modules/core-js/modules/es.object.keys.js"),__webpack_require__("./node_modules/core-js/modules/es.array.index-of.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),__webpack_require__("./node_modules/core-js/modules/es.object.assign.js"),__webpack_require__("./node_modules/react/index.js");var esm=__webpack_require__("./node_modules/@mdx-js/react/dist/esm.js"),dist_esm=__webpack_require__("./node_modules/@storybook/addon-docs/dist/esm/index.js"),client=__webpack_require__("./node_modules/@storybook/angular/dist/ts3.9/client/index.js"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.js"),core=__webpack_require__("./node_modules/@angular/core/fesm2020/core.mjs"),fesm2020_forms=__webpack_require__("./node_modules/@angular/forms/fesm2020/forms.mjs"),fesm2020_button=__webpack_require__("./node_modules/@angular/material/fesm2020/button.mjs"),animations=__webpack_require__("./node_modules/@angular/platform-browser/fesm2020/animations.mjs"),json=__webpack_require__("./libs/material/json/index.ts"),common=__webpack_require__("./node_modules/@angular/common/fesm2020/common.mjs"),ngx_formly_core=__webpack_require__("./node_modules/@ngx-formly/core/fesm2015/ngx-formly-core.js"),ng_zorro_antd_input=__webpack_require__("./node_modules/ng-zorro-antd/fesm2020/ng-zorro-antd-input.mjs");let MetadFormlyFieldTextAreaComponent=class MetadFormlyFieldTextAreaComponent extends ngx_formly_core.fS{};MetadFormlyFieldTextAreaComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"metad-formly-field-nz-textarea",template:' <textarea nz-input [formControl]="$any(formControl)" [formlyAttributes]="field"></textarea> ',changeDetection:core.ChangeDetectionStrategy.OnPush})],MetadFormlyFieldTextAreaComponent);let MetadFormlyNzTextAreaModule=class MetadFormlyNzTextAreaModule{};MetadFormlyNzTextAreaModule=(0,tslib_es6.gn)([(0,core.NgModule)({declarations:[MetadFormlyFieldTextAreaComponent],imports:[common.ez,fesm2020_forms.ReactiveFormsModule,ng_zorro_antd_input.o7,ngx_formly_core.X0.forChild({types:[{name:"nz-textarea",component:MetadFormlyFieldTextAreaComponent}]})]})],MetadFormlyNzTextAreaModule);let MetadFormlyAntdModule=class MetadFormlyAntdModule{};MetadFormlyAntdModule=(0,tslib_es6.gn)([(0,core.NgModule)({imports:[common.ez,MetadFormlyNzTextAreaModule]})],MetadFormlyAntdModule);let MetaFormlyComponent=class MetaFormlyComponent{constructor(){this.model={},this.form=new fesm2020_forms.FormGroup({})}ngOnInit(){}onSubmit(model){console.log(model)}};MetaFormlyComponent.ctorParameters=()=>[],MetaFormlyComponent.propDecorators={schema:[{type:core.Input}],model:[{type:core.Input}]},MetaFormlyComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"metad-formly",template:'<form [formGroup]="form" (ngSubmit)="onSubmit(model)">\n    <formly-form [form]="form" [fields]="schema" [model]="model"></formly-form>\n    <button mat-button type="submit">Submit</button>\n</form>',styles:["form {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n}"]}),(0,tslib_es6.w6)("design:paramtypes",[])],MetaFormlyComponent);let MetadFormlyModule=class MetadFormlyModule{};MetadFormlyModule=(0,tslib_es6.gn)([(0,core.NgModule)({imports:[animations.PW,fesm2020_forms.ReactiveFormsModule,ngx_formly_core.X0.forRoot(),json.cD,MetadFormlyAntdModule,fesm2020_button.ot],exports:[MetaFormlyComponent],declarations:[MetaFormlyComponent],providers:[]})],MetadFormlyModule);var _excluded=["components"];function _extends(){return _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}var layoutProps={};function MDXContent(_ref){var components=_ref.components,props=_objectWithoutProperties(_ref,_excluded);return(0,esm.kt)("wrapper",_extends({},layoutProps,props,{components,mdxType:"MDXLayout"}),(0,esm.kt)(dist_esm.h_,{title:"Intro",component:MetaFormlyComponent,decorators:[(0,client.moduleMetadata)({imports:[MetadFormlyModule]})],mdxType:"Meta"}),(0,esm.kt)("h1",{id:"metad-formly-components"},"Metad Formly Components"),(0,esm.kt)("p",null,"Let's define a story for our ",(0,esm.kt)("inlineCode",{parentName:"p"},"Formly")," components"),(0,esm.kt)("h2",{id:"material-components"},"Material Components"),(0,esm.kt)("pre",null,(0,esm.kt)("code",{parentName:"pre",className:"language-javascript"},"{\n  key: 'value',\n  type: 'json',\n  templateOptions: {\n    label: 'JSON'\n  }\n}\n")),(0,esm.kt)(dist_esm.oG,{name:"1. Textarea for JSON Object",mdxType:"Story"},{template:"<metad-formly [schema]=\"[{\n      key: 'value',\n      type: 'json',\n      templateOptions: {\n        label: 'JSON'\n      }\n    }]\"\n    [model]=\"{\n      value: {\n        key: 'value',\n        type: 'json',\n        templateOptions: {\n          label: 'JSON'\n        }\n      }\n    }\"></metad-formly>"}),(0,esm.kt)("p",null,"You can set attributes in templateOptions to change material component appearance:"),(0,esm.kt)("pre",null,(0,esm.kt)("code",{parentName:"pre",className:"language-javascript"},'[\n  {\n    key: "value",\n    type: "json",\n    templateOptions: {\n      label: "JSON Outline",\n      attributes: {\n        appearance: "outline",\n      },\n    },\n  },\n  {\n    key: "value2",\n    type: "json",\n    templateOptions: {\n      label: "JSON Fill",\n      attributes: {\n        appearance: "fill",\n      },\n    },\n  },\n]\n')),(0,esm.kt)("p",null,"Result:"),(0,esm.kt)(dist_esm.oG,{name:"2. Material Appearance for JSON Type",mdxType:"Story"},{template:"<metad-formly [schema]=\"[{\n      key: 'value',\n      type: 'json',\n      templateOptions: {\n        label: 'JSON Outline',\n        attributes: {\n          appearance: 'outline'\n        }\n      }\n    }, {\n      key: 'value2',\n      type: 'json',\n      templateOptions: {\n        label: 'JSON Fill',\n        attributes: {\n          appearance: 'fill'\n        }\n      }\n    }]\"></metad-formly>"}),(0,esm.kt)("h2",{id:"ant-design-components"},"Ant Design Components"),(0,esm.kt)(dist_esm.oG,{name:"3. Antd Textarea Type",mdxType:"Story"},{template:"<metad-formly [schema]=\"[{\n      key: 'value',\n      type: 'nz-textarea',\n      templateOptions: {\n        label: 'Textarea'\n      }\n    }]\"\n    model=\"{\n      value: {\n        key: 'value',\n        type: 'nz-textarea',\n        templateOptions: {\n          label: 'JSON'\n        }\n      }\n    }\"></metad-formly>"}))}MDXContent.isMDXComponent=!0;var _1TextareaForJsonObject=function _1TextareaForJsonObject(){return{template:"<metad-formly [schema]=\"[{\n      key: 'value',\n      type: 'json',\n      templateOptions: {\n        label: 'JSON'\n      }\n    }]\"\n    [model]=\"{\n      value: {\n        key: 'value',\n        type: 'json',\n        templateOptions: {\n          label: 'JSON'\n        }\n      }\n    }\"></metad-formly>"}};_1TextareaForJsonObject.storyName="1. Textarea for JSON Object",_1TextareaForJsonObject.parameters={storySource:{source:"{\n  template: `<metad-formly [schema]=\"[{\n      key: 'value',\n      type: 'json',\n      templateOptions: {\n        label: 'JSON'\n      }\n    }]\"\n    [model]=\"{\n      value: {\n        key: 'value',\n        type: 'json',\n        templateOptions: {\n          label: 'JSON'\n        }\n      }\n    }\"></metad-formly>`\n}"}};var _2MaterialAppearanceForJsonType=function _2MaterialAppearanceForJsonType(){return{template:"<metad-formly [schema]=\"[{\n      key: 'value',\n      type: 'json',\n      templateOptions: {\n        label: 'JSON Outline',\n        attributes: {\n          appearance: 'outline'\n        }\n      }\n    }, {\n      key: 'value2',\n      type: 'json',\n      templateOptions: {\n        label: 'JSON Fill',\n        attributes: {\n          appearance: 'fill'\n        }\n      }\n    }]\"></metad-formly>"}};_2MaterialAppearanceForJsonType.storyName="2. Material Appearance for JSON Type",_2MaterialAppearanceForJsonType.parameters={storySource:{source:"{\n  template: `<metad-formly [schema]=\"[{\n      key: 'value',\n      type: 'json',\n      templateOptions: {\n        label: 'JSON Outline',\n        attributes: {\n          appearance: 'outline'\n        }\n      }\n    }, {\n      key: 'value2',\n      type: 'json',\n      templateOptions: {\n        label: 'JSON Fill',\n        attributes: {\n          appearance: 'fill'\n        }\n      }\n    }]\"></metad-formly>`\n}"}};var _3AntdTextareaType=function _3AntdTextareaType(){return{template:"<metad-formly [schema]=\"[{\n      key: 'value',\n      type: 'nz-textarea',\n      templateOptions: {\n        label: 'Textarea'\n      }\n    }]\"\n    model=\"{\n      value: {\n        key: 'value',\n        type: 'nz-textarea',\n        templateOptions: {\n          label: 'JSON'\n        }\n      }\n    }\"></metad-formly>"}};_3AntdTextareaType.storyName="3. Antd Textarea Type",_3AntdTextareaType.parameters={storySource:{source:"{\n  template: `<metad-formly [schema]=\"[{\n      key: 'value',\n      type: 'nz-textarea',\n      templateOptions: {\n        label: 'Textarea'\n      }\n    }]\"\n    model=\"{\n      value: {\n        key: 'value',\n        type: 'nz-textarea',\n        templateOptions: {\n          label: 'JSON'\n        }\n      }\n    }\"></metad-formly>`\n}"}};var componentMeta={title:"Intro",decorators:[(0,client.moduleMetadata)({imports:[MetadFormlyModule]})],component:MetaFormlyComponent,includeStories:["_1TextareaForJsonObject","_2MaterialAppearanceForJsonType","_3AntdTextareaType"]},mdxStoryNameToKey={"1. Textarea for JSON Object":"_1TextareaForJsonObject","2. Material Appearance for JSON Type":"_2MaterialAppearanceForJsonType","3. Antd Textarea Type":"_3AntdTextareaType"};componentMeta.parameters=componentMeta.parameters||{},componentMeta.parameters.docs=Object.assign({},componentMeta.parameters.docs||{},{page:function page(){return(0,esm.kt)(dist_esm.aT,{mdxStoryNameToKey,mdxComponentAnnotations:componentMeta},(0,esm.kt)(MDXContent,null))}});const intro_stories=componentMeta},"?4f7e":()=>{}},__webpack_require__=>{var __webpack_exec__=moduleId=>__webpack_require__(__webpack_require__.s=moduleId);__webpack_require__.O(0,[22],(()=>(__webpack_exec__("./node_modules/@storybook/core-server/node_modules/@storybook/core-client/dist/esm/globals/polyfills.js"),__webpack_exec__("./node_modules/@storybook/core-server/node_modules/@storybook/core-client/dist/esm/globals/globals.js"),__webpack_exec__("./storybook-init-framework-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-docs/dist/esm/frameworks/common/config.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-docs/dist/esm/frameworks/angular/config.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/angular/dist/ts3.9/client/preview/config.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-actions/dist/esm/preset/addDecorator.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-actions/dist/esm/preset/addArgs.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-backgrounds/dist/esm/preset/addDecorator.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-backgrounds/dist/esm/preset/addParameter.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-measure/dist/esm/preset/addDecorator.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-outline/dist/esm/preset/addDecorator.js-generated-config-entry.js"),__webpack_exec__("./generated-stories-entry.js"),__webpack_exec__("./node_modules/@angular/material/prebuilt-themes/indigo-pink.css"),__webpack_exec__("./node_modules/ng-zorro-antd/ng-zorro-antd.min.css"),__webpack_exec__("./apps/example/src/styles.scss"),__webpack_exec__("./apps/example/src/polyfills.ts"),__webpack_exec__("./node_modules/@angular-devkit/build-angular/node_modules/core-js/proposals/reflect-metadata.js"))));__webpack_require__.O()}]);