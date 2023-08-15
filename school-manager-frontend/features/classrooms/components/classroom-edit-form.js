import React, {useState} from 'react';
import * as Yup from "yup";
import {Form, FormikProvider, useFormik} from "formik";
import {Button, Card, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import {useEditClassroom} from "../classroom-services";
import {useRouter} from "next/navigation";
import {useFindSchoolYears} from "@/features/school-years/school-year-services";
import FormikTextField from "@/shared/forms/formik-text-field";

export default function ClassroomEditForm({currentValue}) {

    const router = useRouter();
    const [query, setQuery] = useState();
    const {data: schoolYears, isLoading, isError, error, refetch} = useFindSchoolYears({query});

    const [id, setId] = useState();
    const [classroom, setClassroom] = useState();
    const editClassroom = useEditClassroom(id, classroom);

    const initialValues = {
        name: currentValue.name,
        level: currentValue.level,
        headTeacherName: currentValue.headTeacherName,
        schoolYear: {
            id: currentValue.schoolYear.id,
            year: currentValue.schoolYear.year
        }
    };

    console.log(initialValues);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Le nom est obligatoire"),
        level: Yup.string().required("Le niveau est obligatoire"),
        headTeacherName: Yup.string(),
    });

    const formik = useFormik({
        initialValues, validationSchema,
        onSubmit: async (values, {resetForm}) => {
            try {
                setClassroom(values);
                setId(currentValue.id);
                editClassroom.mutate();

                router.push("/classrooms/" + currentValue.id);

            } catch (error) {
                console.error(error);
            }
        }
    });

    return (
        <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
                <Card>
                    <Stack spacing={3} p={3}>
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

                        <Stack direction={"row"} spacing={2} justifyContent={"end"}>
                            <Button type="reset">
                                {"Annuler"}
                            </Button>

                            <Button type={"submit"} variant={"outlined"}>
                                {"Modifier"}
                            </Button>
                        </Stack>

                    </Stack>
                </Card>
            </Form>
        </FormikProvider>
    );
}

