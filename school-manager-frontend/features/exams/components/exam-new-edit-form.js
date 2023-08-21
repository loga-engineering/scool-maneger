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

const useValidationSchema = ({currentValue}) => useMemo(() => {
    const validationSchema = Yup.object({
        examDate: Yup.date().required("La date d'examen est obligatoire"),
        subject: Yup.string().default("").required("La matière est obligatoire"),
        teacherName: Yup.string().default("").required('Le nom du prof est obligatoire'),

    });

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

            <FormikTextField name={"examDate"} label={"Date d'examen"} type={"date"}/>

        </SimpleCardFormikForm>
    );
}

