import PredictNewView from "@/features/reporting/view/predict-new-view";

export const metadata = {
    title: "Prédiction de moyenne",
}

export default function PredictNewPage({params}) {

    const {id} = params;

    return (
        <PredictNewView id={id}/>
    );
}

