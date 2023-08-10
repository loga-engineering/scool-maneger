import React from "react";
import ClassroomListView from "@/features/classrooms/view/classroom-list-view";

export const metadata = {
    title: "Gestion des salles de classe",
}

export default function ClassroomPage() {
    return (
        <ClassroomListView />
    );
}

