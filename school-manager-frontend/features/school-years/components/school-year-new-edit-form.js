import * as Yup from "yup";
import {useFormik} from "formik";
import {useRouter} from "next/navigation";
import {useCallback, useMemo} from "react";

import {Box} from "@mui/material";
import {schoolYearConfig} from "../school-year-config";
import {generateValues} from "@/shared/forms/formik-hooks";
import FormikTextField from "../../../shared/forms/formik-text-field";
import {createSchoolYear, updateSchoolYearById} from "../school-year-services";
import {SimpleCardFormikForm} from "@/shared/forms/formik-form-provider";
import {formikSubmit} from "@/shared/forms/formik-submit";
import {FormikDatePicker} from "@/shared/forms/formik-date-picker";


const useValidationSchema = ({currentValue}) => useMemo(() => {
    const validationSchema = Yup.object({
        year: Yup.string().default("").required("L'année est obligatoire"),
        startDate: Yup.date().required("La date de debut est obligatoire"),
        endDate: Yup.date().required('La date de fin est obligatoire'),
    });

    currentValue = {
        ...currentValue,
        starDate: currentValue?.starDate && new Date(currentValue.starDate),
        endDate: currentValue?.endDate && new Date(currentValue.endDate),
    }

    console.log("=========>",currentValue);

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
            <Box display="flex" gap={"16px"} >
                <Box flex={2}>
                    <Box display="flex" gap={"16px"} >
                        <Box flex={1}>
                            <FormikTextField name={"year"} label={"Année"}/>
                        </Box>
                        <Box flex={1}>
                            <FormikDatePicker name={"startDate"} label={"Date de debut"} />
                        </Box>
                    </Box>
                </Box>
                <Box flex={1}>
                    <FormikDatePicker name={"endDate"} label={"Date de fin"} />
                </Box>
            </Box>
        </SimpleCardFormikForm>
    );
}

