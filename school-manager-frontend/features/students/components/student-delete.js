import React, {useState} from "react";
import Alert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton, Snackbar, Tooltip} from "@mui/material";

import {useDeleteStudent} from "@/features/students/student-services";

export default function StudentDelete({id, refetch}) {

    const [deleted, setDeleted] = useState(false);
    const deleteStudent = useDeleteStudent();

    const handleDelete = () => {
        const confirmation = window.confirm("Etes vous sur de vouloir supprimer cet élève ?");
        if (confirmation) {

            deleteStudent.mutate(id,{
                onSuccess: () => {
                    setDeleted(true);
                },
                onError: (error) => {
                    console.error("===> ", error);
                    throw error;
                },
            });
        }
    };

    return(
        <>
            <Tooltip arrow title="Supprimer">
                <IconButton onClick={handleDelete}><DeleteIcon/>
                </IconButton>
            </Tooltip>

            <Snackbar
                open={deleted}
                autoHideDuration={6000}
                onClose={() => setDeleted(false)}
            >
                <Alert
                    severity="success"
                    onClose={refetch}
                >
                    Elève supprimé avec succès !
                </Alert>
            </Snackbar>
        </>
    );
}