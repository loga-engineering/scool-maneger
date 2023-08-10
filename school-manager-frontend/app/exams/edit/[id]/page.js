import ExamEditView from "@/features/exams/view/exam-edit-view";

export const metadata = {
    title: "Modifier un examen",
}

export default function ExamEditPage({params}) {

    const {id} = params;

    return (
        <ExamEditView id={id}/>
    );
}

