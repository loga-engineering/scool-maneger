import React from 'react';
import ClassroomDetailsView from "@/features/classrooms/view/classroom-details-view";

export const metadata = {
    title: "Details salle de classe",
}

export default function ClassroomDetailsPage({params}) {

    const {id} = params;

    return (
        <ClassroomDetailsView id={id}/>
    );
}

