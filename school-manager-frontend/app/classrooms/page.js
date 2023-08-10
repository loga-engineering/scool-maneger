import React from "react";
import ClassroomListView from "@/features/classrooms/view/classroom-list-view";
import {ModuleProvider} from "../../shared/context/module-context";

export const metadata = {
    title: "Gestion des salles de classe",
}

export default function ClassroomPage() {
    return (
        <ModuleProvider name={"classrooms"} urlBase={"/classrooms"}>
            <ClassroomListView/>
        </ModuleProvider>
    );
}

