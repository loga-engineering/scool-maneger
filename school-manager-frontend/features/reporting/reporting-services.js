import axios from "axios";
import {useMutation} from "@tanstack/react-query";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {atom} from "recoil";

const urlBase = process.env.MODEL_URL;

export const predictionQueryState = atom({
    key: 'predictionQueryStateAtom',
    default: "",
});

export const predict_grade = async (student) => {
    try {
        const response = await axios.post(urlBase + "predict", student);
        console.log("response ==> ", response);
        console.log(response.data);

         if (response.status === 200) {
            const predictedGrade = response.data.predicted_grade;
            console.log("predictedGrade >> ", predictedGrade);
            return response.data;
         } else {
             throw new Error('Erreur lors de la récupération de la prédiction de note');
         }
    } catch (error) {
        console.error(error);
    }
};

export const usePredict = () => {
    return useMutation((student) => predict_grade(student));
};

