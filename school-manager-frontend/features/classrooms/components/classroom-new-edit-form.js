import * as Yup from "yup";
import {useFormik} from "formik";
import {useRouter} from "next/navigation";
import React, {useCallback, useMemo, useState} from "react";

import {generateValues} from "@/shared/forms/formik-hooks";
import FormikTextField from "../../../shared/forms/formik-text-field";
import {SimpleCardFormikForm} from "@/shared/forms/formik-form-provider";
import {formikSubmit} from "@/shared/forms/formik-submit";
import {classroomConfig} from "@/features/classrooms/classroom-config";
import {createClassroom, updateClassroomById} from "@/features/classrooms/classroom-services";
import {InputLabel, MenuItem, Select} from "@mui/material";
import {useFindSchoolYears} from "@/features/school-years/school-year-services";


const useValidationSchema = ({currentValue}) => useMemo(() => {
    const validationSchema = Yup.object({
        name: Yup.string().default("").required("Le nom est obligatoire"),
        level: Yup.string().default("").required("Le niveau est obligatoire"),
        headTeacherName: Yup.string().default(""),
        schoolYear: Yup.object().shape({
            id: Yup.number().required("Ce champ est obligatoire"),
        }),
    });

    return generateValues({currentValue, validationSchema});
}, [currentValue]);


export default function ClassroomNewEditForm({currentValue, isEdit}) {

    const router = useRouter();
    const [query, setQuery] = useState();
    const {data: schoolYears, isLoading, isError, error, refetch} = useFindSchoolYears({query});
    const {initialValues, validationSchema} = useValidationSchema({currentValue});


    const formik = useFormik({
        initialValues, validationSchema,
        onSubmit: async (values, {resetForm}) => {
            await formikSubmit(values, isEdit, createClassroom, updateClassroomById, router, classroomConfig);
        }
    });

    const onCancel = useCallback(() => {
        const href = isEdit ? classroomConfig.path.details(currentValue.id) : classroomConfig.path.root;

        router.push(href);
    }, []);

    return (
        <SimpleCardFormikForm formik={formik} isEdit={isEdit} onCancel={onCancel}>

            <FormikTextField name={"name"} label={"Nom"}/>
            <FormikTextField name={"level"} label={"Niveau"}/>
            <FormikTextField name={"headTeacherName"} label={"Prof. Titulaire"}/>

            <InputLabel id="select-filled-label">Année scolaire</InputLabel>
            <Select
                fullWidth
                labelId="select-filled-label"
                {...formik.getFieldProps("schoolYear.id")}
                error={!!formik.errors["schoolYear.id"]}
                helperText={formik.errors["schoolYear.id"]}
            >
                {schoolYears?.map((schoolYear) => (
                    <MenuItem key={schoolYear.id} value={schoolYear.id}> {schoolYear.year}</MenuItem>
                ))}
            </Select>

        </SimpleCardFormikForm>
    );
}

