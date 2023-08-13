import React, {useEffect, useState} from 'react';
import * as Yup from "yup";
import {Form, FormikProvider, useFormik} from "formik";
import {Button, Card, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import {updateClassroomById} from "../classroom-services";
import {useRouter} from "next/navigation";
import {findAllSchoolYearNames} from "@/features/school-years/school-year-services";

export default function ClassroomEditForm({currentValue}) {

    const router = useRouter();
    const [schoolYears, setSchoolYears] = useState([]);

    useEffect(() => {
        const fetchSchoolYears = async () => {
            try {
                const data = await findAllSchoolYearNames();
                setSchoolYears(data);
                console.log("=====>", schoolYears)
            } catch (error) {
                console.error("Erreur lors de la récupération des années scolaire : ", error);
            }
        };
        fetchSchoolYears();
    }, []);

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
                console.log("===>: ", values);

                const updated = await updateClassroomById(currentValue.id, values);

                router.push("/classrooms/" + updated.id);

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
                        <TextField
                            fullWidth
                            label="Nom"
                            variant={"outlined"}
                            {...formik.getFieldProps("name")}
                            error={!!formik.errors["name"]}
                            helperText={formik.errors["name"]}
                        />

                        <TextField
                            fullWidth
                            label="niveau"
                            {...formik.getFieldProps("level")}
                            error={!!formik.errors["level"]}
                            helperText={formik.errors["level"]}
                        />

                        <TextField
                            fullWidth
                            label="Prof. Titulaire"
                            {...formik.getFieldProps("headTeacherName")}
                            error={!!formik.errors["headTeacherName"]}
                            helperText={formik.errors["headTeacherName"]}
                        />
                        <InputLabel id="select-filled-label">Année scolaire</InputLabel>
                        <Select
                            fullWidth
                            labelId="select-filled-label"
                            {...formik.getFieldProps("schoolYear.id")}
                            error={!!formik.errors["schoolYear.id"]}
                            helperText={formik.errors["schoolYear.id"]}
                        >
                            {schoolYears.map((schoolYear) => (
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
