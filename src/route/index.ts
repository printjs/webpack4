import { RouteProps } from "react-router-dom";
import { createBrowserHistory } from "history";
import { AnyAction } from "redux";
import { entryRoute } from "@route/entry.route";
import { GETENTRYROUTE } from "@route/entry.redux";

export const history = createBrowserHistory({
    forceRefresh: true,
});

export interface IRouteProps extends RouteProps {
    icon: string;
}

export function handleRoute(state: IRouteProps[] = entryRoute, action: AnyAction) {
    switch (action.type) {
        case GETENTRYROUTE:
            state = entryRoute.slice(0);
        default:
            break;
    }
    return state;
}
