﻿
/**
 * Filter to check which selection state is active
 */
export function qStatusFilter() {
    "use strict";
    return function (elementStatus: string) {
        switch (elementStatus) {
            case "S":
                return "selected";
            case "SP":
                return "selected";
            case "A":
                return "alternative";
            case "AP":
                return "alternative";
            case "X":
                return "excluded";
            case "XS":
                return "selectedExcluded";
            case "L":
                return "locked";

            default:
                return "optional";
        }
    };
}

/**
 * Filter to check which selection state is active
 */
export function qPublicFilter() {
    "use strict";
    return function (elementStatus: string) {
        switch (elementStatus) {
            case "SP":
                return "published";
            case "AP":
                return "published";
            case "P":
                return "published";

            default:
                return "unpublished";
        }
    };
}

/**
 * Filter to check which item is selected
 */
export function qSelectedFilter() {
    "use strict";
    return function (elementStatus: string) {
        switch (elementStatus) {
            case "S":
                return true;
            case "XS":
                return true;
            default:
                return false;
        }
    };
}