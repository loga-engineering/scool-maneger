import GradeDetailsView from "@/features/grades/view/grade-details-view";

export const metadata = {
    title: "Details note",
}

export default function GradeDetailsPage({params}) {

    const {id} = params;

    return (
        <GradeDetailsView id={id}/>
    );
}

