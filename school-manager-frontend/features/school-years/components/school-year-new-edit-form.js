import * as Yup from "yup";
import {useFormik} from "formik";
import {useRouter} from "next/navigation";
import {useCallback, useMemo} from "react";

import {schoolYearConfig} from "../school-year-config";
import {generateValues} from "@/shared/forms/formik-hooks";
import FormikTextField from "../../../shared/forms/formik-text-field";
import {createSchoolYear, updateSchoolYearById} from "../school-year-services";
import {SimpleCardFormikForm} from "@/shared/forms/formik-form-provider";
import {formikSubmit} from "@/shared/forms/formik-submit";


const useValidationSchema = ({currentValue}) => useMemo(() => {
    const validationSchema = Yup.object({
        year: Yup.string().default("").required("L'année est obligatoire"),
        startDate: Yup.string().default("").required("La date de debut est obligatoire"),
        endDate: Yup.string().default("").required('La date de fin est obligatoire'),
    });

    return generateValues({currentValue, validationSchema});
}, [currentValue]);


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
            <FormikTextField name={"year"} label={"Année"}/>
            <FormikTextField name={"startDate"} label={"Date de debut"} type={"date"}/>
            <FormikTextField name={"endDate"} label={"Date de fin"} type={"date"}/>
        </SimpleCardFormikForm>
    );
}

