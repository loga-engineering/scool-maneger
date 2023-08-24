import GradeEditView from "@/features/grades/view/grade-edit-view";

export const metadata = {
    title: "Modifier une note",
}

export default function GradeEditPage({params}) {

    const {id} = params;

    return (
        <GradeEditView id={id}/>
    );
}

