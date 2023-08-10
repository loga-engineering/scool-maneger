import React from 'react';
import StudentDetailsView from "@/features/students/view/student-details-view";

export const metadata = {
    title: "Details élève",
}

export default function StudentDetailsPage({params}) {

    const {id} = params;

    return (
        <StudentDetailsView id={id}/>
    );
}

