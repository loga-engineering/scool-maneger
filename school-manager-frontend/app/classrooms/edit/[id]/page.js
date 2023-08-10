import React from "react";
import ClassroomEditView from "@/features/classrooms/view/classroom-edit-view";

export const metadata = {
    title: "Modifier une salle de classe",
}

export default function ClassroomEditPage({params}) {

    const {id} = params;

    return (
        <ClassroomEditView id={id}/>
    );
}

