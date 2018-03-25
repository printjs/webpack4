import { RouteProps } from "react-router-dom";
import { GETNAVROUTE } from "@route/nav.redux";
import { NavRoute } from "@route/nav.route";

export interface IRouteProps extends RouteProps {
    icon: string;
}

export function todoNav(state: IRouteProps[] = [], action: {
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
