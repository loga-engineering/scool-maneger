import ExamDetailsView from "@/features/exams/view/exam-details-view";

export const metadata = {
    title: "Details examen",
}

export default function ExamDetailsPage({params}) {

    const {id} = params;

    return (
        <ExamDetailsView id={id}/>
    );
}

