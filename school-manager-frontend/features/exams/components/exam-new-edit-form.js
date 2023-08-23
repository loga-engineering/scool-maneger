import * as Yup from "yup";
import {Box} from "@mui/material";
import {useFormik} from "formik";
import {useRouter} from "next/navigation";
import {useCallback, useMemo} from "react";

import {generateValues} from "@/shared/forms/formik-hooks";
import {formikSubmit} from "@/shared/forms/formik-submit";
import {examConfig} from "@/features/exams/exam-config";
import FormikTextField from "../../../shared/forms/formik-text-field";
import {SimpleCardFormikForm} from "@/shared/forms/formik-form-provider";
import {createExam, updateExamById} from "@/features/exams/exam-services";
import {FormikDatePicker} from "@/shared/forms/formik-date-picker";

const useValidationSchema = ({currentValue}) => useMemo(() => {
    const validationSchema = Yup.object({
        examDate: Yup.string()
            .required("Date requise")
            .matches(
                /^\d{4}-\d{2}-\d{2}$/,
                "Veuillez saisir une date au format YYYY-MM-DD"
            ).default(""),
        subject: Yup.string().default("").required("La matière est obligatoire"),
        teacherName: Yup.string().default("").required('Le nom du prof est obligatoire'),

    });

    currentValue = {
        ...currentValue,
        examDate: currentValue?.examDate && new Date(currentValue.examDate).toISOString().substring(0, 10),
    }

    return generateValues({currentValue, validationSchema});
}, [currentValue]);


export default function ExamNewEditForm({currentValue, isEdit}) {

    const router = useRouter();
    const {initialValues, validationSchema} = useValidationSchema({currentValue});


    const formik = useFormik({
        initialValues, validationSchema,
        onSubmit: async (values, {resetForm}) => {
            await formikSubmit(values, isEdit, createExam, updateExamById, router, examConfig);
        }
    });

    const onCancel = useCallback(() => {
        const href = isEdit ? examConfig.path.details(currentValue.id) : examConfig.path.root;
        router.push(href);
    }, []);

    return (
        <SimpleCardFormikForm formik={formik} isEdit={isEdit} onCancel={onCancel}>
            <Box display="flex" gap="16px">
                <Box flex={1}>
                    <FormikTextField name={"subject"} label={"Matière"}/>
                </Box>
                <Box flex={1}>
                    <FormikTextField name={"teacherName"} label={"Nom prof."}/>
                </Box>
            </Box>

            <FormikDatePicker name={"examDate"} label={"Date d'examen"} isEdit={isEdit} />

        </SimpleCardFormikForm>
    );
}

