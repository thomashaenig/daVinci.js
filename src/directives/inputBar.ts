﻿//#region IMPORT
import { templateReplacer, checkDirectiveIsRegistrated } from "../utils/utils";
import { ShortCutDirectiveFactory, IShortcutObject } from "./shortcut";
import * as template from "text!./inputBar.html";
import { logging } from "../utils/logger";
import { IRegisterDirective } from "../utils/interfaces";
//#endregion

class InputBarController implements ng.IController {

    public $onInit(): void {
        this.logger.debug("initial Run of inputBarController");
    }

    //#region VARIABLES
    accept: () => void;
    cancel: () => void;
    timeout: ng.ITimeoutService;
    textInput: string = "";
    element: JQuery;
    //#endregion

    //#region theme
    private _theme: string;
    get theme(): string {
        if (this._theme) {
            return this._theme;
        }
        return "default";
    }
    set theme(value: string) {
        if (value !== this._theme) {
            this._theme = value;
        }
    }
    //#endregion

    //#region icon
    private _icon: string;
    get icon(): string {
        if (this._icon) {
            return this._icon;
        }
        return "lui-icon--search";
    }
    set icon(value: string) {
        if (value !== this._icon) {
            this._icon = value;
        }
    }
    //#endregion

    //#region placeholder
    private _placeholder;
    public get placeholder() : string {
        if (this._placeholder) {
            return this._placeholder;
        }
        return "search";
    }
    public set placeholder(v : string) {
        if (this._placeholder !== v) {
            this._placeholder = v;
        }
    }
    //#endregion

    //#region hasFocus
    private _hasFocus = false;
    public get hasFocus() : boolean {
        return this._hasFocus;
    }
    public set hasFocus(v : boolean) {
        if (v !== this._hasFocus) {
            this._hasFocus = v;
            if(this.element && v) {
                this.element.children().eq(1).focus();
            }
        }
    }
    //#endregion

    //#region logger
    private _logger: logging.Logger;
    private get logger(): logging.Logger {
        if (!this._logger) {
            try {
                this._logger = new logging.Logger("InputBarController");
            } catch (e) {
                this.logger.error("ERROR in create logger instance", e);
            }
        }
        return this._logger;
    }
    //#endregion

    static $inject = ["$element", "$scope", "$timeout"];

    /**
     * init of List View Controller
     */
    constructor(element: JQuery, scope: ng.IScope, timeout: ng.ITimeoutService) {
        this.timeout = timeout;
        this.element = element;
        let that = this;

        scope.$watch(function () { return element.is(":visible"); }, function () {
            try {
                if (element.is(":visible")) {
                    element.children().eq(1).focus();
                }
            } catch (e) {
                this.logger.error("error in constructor", e);
            }
        });
    }

    /**
     * manage all shortcut events, called on the input tag
     * @param objcet element which is returned from the shortcut directive
     */
    shortcutHandlerSearchBar(shortcutObject: IShortcutObject): void {
        switch(shortcutObject.name) {
            case "accept":
                this.accept();
                break;
            case "cancel":
                this.cancel();
                break;
        }
    }
}

export function InputBarDirectiveFactory(rootNameSpace: string): ng.IDirectiveFactory {
    "use strict";
    return ($document: ng.IAugmentedJQuery, $injector: ng.auto.IInjectorService, $registrationProvider: IRegisterDirective) => {
        return {
            restrict: "E",
            replace: true,
            template: templateReplacer(template, rootNameSpace),
            controller: InputBarController,
            controllerAs: "vm",
            scope: {},
            bindToController: {
                accept: "&?",
                cancel: "&?",
                icon: "<?",
                placeholder: "<?",
                textInput: "=",
                theme: "<?",
                hasFocus: "="
            },
            compile: function () {
                checkDirectiveIsRegistrated($injector, $registrationProvider, rootNameSpace,
                    ShortCutDirectiveFactory(rootNameSpace), "Shortcut");
            }
        };
    };
}


