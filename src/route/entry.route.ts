import { IRouteProps } from ".";
import { NoteComponent } from "@views/note";



export const entryRoute: IRouteProps[] = [
    {
        path: "/note",
        icon: "book",
        component: NoteComponent,
    },
];
