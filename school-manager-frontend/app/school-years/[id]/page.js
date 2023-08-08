import React from 'react';
import SchoolYearDetailsView from "../../../features/school-years/view/school-year-details-view";

export const metadata = {
    title: "Details année scolaire",
}

export default function SchoolYearDetailsPage({params}) {

    const {id} = params;

    return (
        <SchoolYearDetailsView id={id}/>
    );
}

