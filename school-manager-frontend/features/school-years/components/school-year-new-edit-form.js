import * as Yup from "yup";
import {useFormik} from "formik";
import {useRouter} from "next/navigation";
import {useCallback, useMemo} from "react";
import {Box, Stack} from "@mui/material";
import {schoolYearConfig} from "../school-year-config";
import {generateValues} from "@/shared/forms/formik-hooks";
import {formikSubmit} from "@/shared/forms/formik-submit";
import {FormikDatePicker} from "@/shared/forms/formik-date-picker";
import FormikTextField from "../../../shared/forms/formik-text-field";
import {SimpleCardFormikForm} from "@/shared/forms/formik-form-provider";
import {createSchoolYear, updateSchoolYearById} from "../school-year-services";



const useValidationSchema = ({currentValue}) => useMemo(() => {
    const validationSchema = Yup.object({
        year: Yup.string().default("").required("L'année est obligatoire"),
        startDate: Yup.string()
            .required("Date requise")
            .matches(
                /^\d{4}-\d{2}-\d{2}$/,
                "Veuillez saisir une date au format YYYY-MM-DD"
            ).default(""),
        endDate: Yup.string()
            .required("Date requise")
            .matches(
                /^\d{4}-\d{2}-\d{2}$/,
                "Veuillez saisir une date au format YYYY-MM-DD"
            ).default(""),
    })

    currentValue = {
        id: currentValue?.id,
        year: currentValue?.year,
        startDate: currentValue?.startDate && new Date(currentValue.startDate).toISOString().substring(0, 10),
        endDate: currentValue?.endDate && new Date(currentValue.endDate).toISOString().substring(0, 10),
    }

    console.log("=========> currentValue ",currentValue);

    return generateValues({currentValue, validationSchema});
}, []);


export default function SchoolYearNewEditForm({currentValue, isEdit}) {

    const router = useRouter();
    const {initialValues, validationSchema} = useValidationSchema({currentValue});


    const formik = useFormik({
        initialValues, validationSchema,
        onSubmit: async (values, {resetForm}) => {
            await formikSubmit(values, isEdit, createSchoolYear, updateSchoolYearById, router, schoolYearConfig);
        }
    });

    const onCancel = useCallback(() => {
        const href = isEdit ? schoolYearConfig.path.details(currentValue.id) : schoolYearConfig.path.root;

        router.push(href);
    }, []);

    return (
        <SimpleCardFormikForm formik={formik} isEdit={isEdit} onCancel={onCancel}>
            <Stack flexDirection={"row"} alignItems={"center"}>
            <Box display="flex" gap={"30px"} >
                <Box flex={1}>
                    <FormikTextField name={"year"} label={"Année"}/>
                </Box>
                <Box flex={1}>
                    <FormikDatePicker name={"startDate"} label={"Date de debut"} isEdit={isEdit} />
                </Box>
                <Box flex={1}>
                    <FormikDatePicker name={"endDate"} label={"Date de fin"} isEdit={isEdit} />
                </Box>
            </Box></Stack>
        </SimpleCardFormikForm>
    );
}

