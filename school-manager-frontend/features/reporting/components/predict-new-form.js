

import {useRecoilState} from "recoil";
import {useRouter} from "next/navigation";

import * as Yup from "yup";
import FormikTextField from "@/shared/forms/formik-text-field";
import {Form, FormikProvider, useFormik} from "formik";
import React, {useCallback, useState} from "react";
import {reportingConfig} from "@/features/reporting/reporting-config";
import {FormikSelect} from "@/shared/forms/formik-select";
import {predict_grade, predictionQueryState} from "@/features/reporting/reporting-services";
import {Backdrop, Box, Button, Card, CircularProgress, MenuItem, Stack, Typography} from "@mui/material";


export default function PredictNewForm({id}) {

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const router = useRouter();
    const [isEdit,setIsEdit] = useState(false);
    const [predictedGrade,setPredictedGrade] = useRecoilState(predictionQueryState);

    const validationSchema = Yup.object().shape({
        sex: Yup.string().required("Le champ 'Sexe' est obligatoire."),
        age: Yup.number().required("Le champ 'Âge' est obligatoire."),
        address: Yup.string().required("Le champ 'Adresse' est obligatoire."),
        famsize: Yup.string().required("Le champ 'Taille de la famille' est obligatoire."),
        Pstatus: Yup.string().required("Le champ 'Statut des parents' est obligatoire."),
        Medu: Yup.number().required("Le champ 'Éducation de la mère' est obligatoire."),
        Fedu: Yup.number().required("Le champ 'Éducation du père' est obligatoire."),
        traveltime: Yup.number().required("Le champ 'Temps de trajet' est obligatoire."),
        studytime: Yup.number().required("Le champ 'Temps d'étude' est obligatoire."),
        failures: Yup.number().required("Le champ 'Nombre d'échecs' est obligatoire."),
        schoolsup: Yup.string().required("Le champ 'Soutien scolaire' est obligatoire."),
        famsup: Yup.string().required("Le champ 'Soutien familial' est obligatoire."),
        paid: Yup.string().required("Le champ 'Cours Privée' est obligatoire."),
        internet: Yup.string().required("Le champ 'Accès à internet' est obligatoire."),
        famrel: Yup.number().required("Le champ 'Relation familiale' est obligatoire."),
        freetime: Yup.number().required("Le champ 'Temps libre' est obligatoire."),
        goout: Yup.number().required("Le champ 'Sorties' est obligatoire."),
        health: Yup.number().required("Le champ 'Santé' est obligatoire."),
        absences: Yup.number().required("Le champ 'Absences' est obligatoire."),
        G1: Yup.number().required("Le champ 'Moyenne 1' est obligatoire."),
        G2: Yup.number().required("Le champ 'Moyenne 2' est obligatoire.")
    });

    const initialValues = {
        sex: "",
        age: "",
        address: "",
        famsize: "",
        Pstatus: "",
        Medu: "",
        Fedu: "",
        traveltime: "",
        studytime: "",
        failures: "",
        schoolsup: "",
        famsup: "",
        paid: "",
        internet: "",
        famrel: "",
        freetime: "",
        goout: "",
        health: "",
        absences: "",
        G1: "",
        G2: ""
    };



    const formik = useFormik({
        initialValues, validationSchema,
        onSubmit: async (values, {resetForm}) => {
            try {
                console.log("Values ===> ", values);
                const response = predict_grade(values);
                console.log("response ===> ",response);
                if (response.status === 200) {
                    setPredictedGrade((prevState) => ({
                        ...prevState,
                        predicted_grade: response.predicted_grade,
                    }));
                    handleClose();
                    router.push(reportingConfig.path.result(id));
                }

            } catch (error) {
                console.error(error);
            }
        }
    });

    const onCancel = useCallback(() => {
        router.push(reportingConfig.path.root);
    }, []);

    return (
        <Card>
            <FormikProvider value={formik}>
                <Form onSubmit={formik.handleSubmit}>
                    <Stack spacing={3} p={3}>

                    <Box display="flex" gap="16px">
                        <Box flex={1}>
                            <FormikSelect name={"sex"} label={"Genre"} >
                                <MenuItem key={"Masc"} value={"M"}>M</MenuItem>
                                <MenuItem key={"Fem"} value={"F"}>F</MenuItem>
                            </FormikSelect>
                        </Box>
                        <Box flex={1}>
                            <FormikTextField name={"age"} label={"Age"}/>
                        </Box>
                    </Box>
                    <Box display="flex" gap="16px">
                        <Box flex={1}>
                            <FormikSelect name={"address"} label={"Zone d'habitation"} >
                                <MenuItem key={"Masc"} value={"U"}>Zone urbaine</MenuItem>
                                <MenuItem key={"Fem"} value={"F"}>Zone rurale</MenuItem>
                            </FormikSelect>
                        </Box>
                        <Box flex={1}>
                            <FormikTextField name={"absences"} label={"Nombre d'abscence"}/>
                        </Box>
                    </Box>
                    <Box display="flex" gap="16px">
                        <Box flex={1}>
                            <FormikSelect name={"famsize"} label={"Taille de la famille"} >
                                <MenuItem key={"LE3"} value={"LE3"}>Inférieur ou égal à 3</MenuItem>
                                <MenuItem key={"GT3"} value={"GT3"}>Supérieur strictement à 3</MenuItem>
                            </FormikSelect>
                        </Box>
                        <Box flex={1}>
                            <FormikSelect name={"Pstatus"} label={"Cohabitation des parents"} >
                                <MenuItem key={"T"} value={"T"}>Habitent ensemble</MenuItem>
                                <MenuItem key={"A"} value={"A"}>Vivent séparément</MenuItem>
                            </FormikSelect>
                        </Box>
                    </Box>
                    <Box display="flex" gap="16px">
                        <Box flex={1}>
                            <FormikSelect name={"Medu"} label={"Niveau d'éucation de la mère"} >
                                <MenuItem key={"0"} value={0}>Analphabet</MenuItem>
                                <MenuItem key={"1"} value={1}>Primaire</MenuItem>
                                <MenuItem key={"2"} value={2}>Collège</MenuItem>
                                <MenuItem key={"3"} value={3}>Lycée</MenuItem>
                                <MenuItem key={"4"} value={4}>Université</MenuItem>
                            </FormikSelect>
                        </Box>
                        <Box flex={1}>
                            <FormikSelect name={"Pedu"} label={"Niveau d'éducation du père"} >
                                <MenuItem key={"0"} value={0}>Analphabet</MenuItem>
                                <MenuItem key={"1"} value={1}>Primaire</MenuItem>
                                <MenuItem key={"2"} value={2}>Collège</MenuItem>
                                <MenuItem key={"3"} value={3}>Lycée</MenuItem>
                                <MenuItem key={"4"} value={4}>Université</MenuItem>
                            </FormikSelect>
                        </Box>
                    </Box>
                    <Box display="flex" gap="16px">
                        <Box flex={1}>
                            <FormikSelect name={"traveltime"} label={"Temps de trajet maison-ecole"} >
                                <MenuItem key={"1"} value={1}>Inférieur à 15min</MenuItem>
                                <MenuItem key={"2"} value={2}>15 à 30min</MenuItem>
                                <MenuItem key={"3"} value={3}>30min à 1h</MenuItem>
                                <MenuItem key={"4"} value={4}>Supérieur à 1h</MenuItem>
                            </FormikSelect>
                        </Box>
                        <Box flex={1}>
                            <FormikSelect name={"studytime"} label={"Temps d'étude par semaine"} >
                                <MenuItem key={"1"} value={1}>Inférieur à 2h</MenuItem>
                                <MenuItem key={"2"} value={2}>2 à 5h</MenuItem>
                                <MenuItem key={"3"} value={3}>5 à 10h</MenuItem>
                                <MenuItem key={"4"} value={4}>Supérieur à 10h</MenuItem>
                            </FormikSelect>
                        </Box>
                    </Box>
                    <Box display="flex" gap="16px">
                        <Box flex={1}>
                            <FormikSelect name={"failures"} label={"Nombre de redoublement"} >
                                <MenuItem key={"0"} value={0}>0</MenuItem>
                                <MenuItem key={"1"} value={1}>1</MenuItem>
                                <MenuItem key={"2"} value={2}>2</MenuItem>
                                <MenuItem key={"3"} value={3}>3</MenuItem>
                                <MenuItem key={"4"} value={4}>4</MenuItem>
                            </FormikSelect>
                        </Box>
                        <Box flex={1}>
                            <FormikSelect name={"schoolsup"} label={"Cours de soutient"} >
                                <MenuItem key={"oui"} value={"yes"}>Oui</MenuItem>
                                <MenuItem key={"non"} value={"no"}>Non</MenuItem>
                            </FormikSelect>
                        </Box>
                    </Box>
                    <Box display="flex" gap="16px">
                        <Box flex={1}>
                            <FormikSelect name={"famsup"} label={"Soutien éducatif familial"} >
                                <MenuItem key={"oui"} value={"yes"}>Oui</MenuItem>
                                <MenuItem key={"non"} value={"no"}>Non</MenuItem>
                            </FormikSelect>
                        </Box>
                        <Box flex={1}>
                            <FormikSelect name={"paid"} label={"Cours privé"} >
                                <MenuItem key={"oui"} value={"yes"}>Oui</MenuItem>
                                <MenuItem key={"non"} value={"no"}>Non</MenuItem>
                            </FormikSelect>
                        </Box>
                        <Box flex={1}>
                            <FormikSelect name={"internet"} label={"Accès à internet"} >
                                <MenuItem key={"oui"} value={"yes"}>Oui</MenuItem>
                                <MenuItem key={"non"} value={"no"}>Non</MenuItem>
                            </FormikSelect>
                        </Box>
                    </Box>
                    <Box display="flex" gap="16px">
                        <Box flex={1}>
                            <FormikSelect name={"famrel"} label={"Qualité des relations familiales"} >
                                <MenuItem key={"1"} value={1}>Très mauvaise</MenuItem>
                                <MenuItem key={"2"} value={2}>Mauvaise</MenuItem>
                                <MenuItem key={"3"} value={3}>Moyenne</MenuItem>
                                <MenuItem key={"4"} value={4}>Bonne</MenuItem>
                                <MenuItem key={"5"} value={5}>Excellente</MenuItem>
                            </FormikSelect>
                        </Box>
                        <Box flex={1}>
                            <FormikSelect name={"freetime"} label={"Temps libre"} >
                                <MenuItem key={"0"} value={1}>Très faible</MenuItem>
                                <MenuItem key={"1"} value={2}>Faible</MenuItem>
                                <MenuItem key={"2"} value={3}>Moyen</MenuItem>
                                <MenuItem key={"3"} value={4}>grand</MenuItem>
                                <MenuItem key={"4"} value={5}>Très grand</MenuItem>
                            </FormikSelect>
                        </Box>
                    </Box>
                    <Box display="flex" gap="16px">
                        <Box flex={1}>
                            <FormikSelect name={"goout"} label={"Sortie entre amis"} >
                                <MenuItem key={"1"} value={1}>Très faible</MenuItem>
                                <MenuItem key={"2"} value={2}>Faible</MenuItem>
                                <MenuItem key={"3"} value={3}>Moyenne</MenuItem>
                                <MenuItem key={"4"} value={4}>Nombreuses</MenuItem>
                                <MenuItem key={"5"} value={5}>Très nombreuses</MenuItem>
                            </FormikSelect>
                        </Box>
                        <Box flex={1}>
                            <FormikSelect name={"health"} label={"Etat de santé"} >
                                <MenuItem key={"1"} value={1}>Très mauvais</MenuItem>
                                <MenuItem key={"2"} value={2}>Mauvais</MenuItem>
                                <MenuItem key={"3"} value={3}>Moyen</MenuItem>
                                <MenuItem key={"4"} value={4}>Bon</MenuItem>
                                <MenuItem key={"5"} value={5}>Excellent</MenuItem>
                            </FormikSelect>
                        </Box>
                    </Box>
                    <Box display="flex" gap="16px">
                        <Box flex={1}>
                            <FormikTextField name={"G1"} label={"Moyenne 1"}/>
                        </Box>
                        <Box flex={1}>
                            <FormikTextField name={"G2"} label={"Moyenne 2"}/>
                        </Box>
                    </Box>

                    <Stack direction={"row"} spacing={2} justifyContent={"end"}>
                        <Button type="reset" onClick={onCancel} sx={{ color: "text.secondary" }} >
                            {"Annuler"}
                        </Button>

                        <Button type={"submit"} variant={"outlined"} onClick={handleOpen}>
                            {"Valider"}
                        </Button>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={open}
                        >
                            <CircularProgress color="success" />
                        </Backdrop>
                    </Stack>

                    </Stack>
                </Form>
            </FormikProvider>
        </Card>


    )
}