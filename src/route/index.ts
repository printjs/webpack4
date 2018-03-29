import { RouteProps } from "react-router-dom";
import { GETNAVROUTE } from "@route/nav.redux";
import { NavRoute } from "@route/nav.route";
import { createBrowserHistory } from "history";


export const history = createBrowserHistory(); 

export interface IRouteProps extends RouteProps {
    icon: string;
}

export function handleRoute(state: IRouteProps[] = NavRoute, action: {
    type: string;
}) {
    switch (action.type) {
        case GETNAVROUTE:
            state = NavRoute;
        default:
            break;
    }
    return state;
}
