import { NavRoute } from "@route/nav.route";

/**
 * action types
 */
export const GETNAVROUTE = "获取所有的系统导航路由";
/**
 * action creators
 */
export function getNavRoute() {
    return {
        type: GETNAVROUTE,
    };
}
/**
 * reducers
 */

