import StudentEditView from "@/features/students/view/student-edit-view";

export const metadata = {
    title: "Modifier les informations d'un élève",
}
export default function StudentEditPage({params}) {

    const {id} = params;

    return (
        <StudentEditView id={id}/>
    );
}

