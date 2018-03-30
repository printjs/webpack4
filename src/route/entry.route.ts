import { IRouteProps } from ".";
import { Note } from "@views/note/note";



export const entryRoute: IRouteProps[] = [
    {
        path: "/note",
        icon: "book",
        component: Note,
    },
];
