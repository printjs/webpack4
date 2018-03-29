import { IRouteProps } from ".";
import { Note } from "@views/note/note";



export const NavRoute: IRouteProps[] = [
    {
        path: "/note",
        icon: "book",
        component: Note,
    },
];
