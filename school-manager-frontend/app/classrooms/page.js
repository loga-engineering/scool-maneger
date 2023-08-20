import React from "react";
import {ModuleProvider} from "../../shared/context/module-context";
import ClassroomListView from "@/features/classrooms/view/classroom-list-view";

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

