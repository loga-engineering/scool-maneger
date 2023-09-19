import axios from "axios";
import {useMutation} from "@tanstack/react-query";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {atom} from "recoil";

const urlBase = process.env.MODEL_URL;

export const predictionQueryState = atom({
    key: 'predictionQueryState',
    default: {
        predicted_grade: "",
    },
});

export const predict_grade = async (student) => {
    const {data} = await axios.post(urlBase + "predict", student);

    return data;
};

export const usePredict = () => {
    return useMutation((student) => predict_grade(student));
};

