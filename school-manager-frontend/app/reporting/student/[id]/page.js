import PredictResultView from "@/features/reporting/view/predict-result-view";

export const metadata = {
    title: "Prédiction de moyenne",
}

export default function PredictResultPage({params}) {

    const {id} = params;

    return (
        <PredictResultView id={id}/>
    );
}

