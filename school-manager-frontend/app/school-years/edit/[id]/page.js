import SchoolYearEditView from "@/features/school-years/view/school-year-edit-view";

export const metadata = {
    title: "Modifier l'année scolaire",
}

export default function SchoolYearEditPage({params}) {

    const {id} = params;

    return (
        <SchoolYearEditView id={id}/>
    );
}

