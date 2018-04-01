import { IRouteProps } from ".";
import { Note } from "@views/note";



export const entryRoute: IRouteProps[] = [
    {
        path: "/note",
        icon: "book",
        component: Note,
    },
];
