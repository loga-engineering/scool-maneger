import React, {useState} from "react";
import Alert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton, Snackbar, Tooltip} from "@mui/material";
import {useDeleteClassroom} from "@/features/classrooms/classroom-services";

export default function ClassroomDelete({id, refetch}) {

    const [deleted, setDeleted] = useState(false);
    const deleteClassroom = useDeleteClassroom();

    const handleDelete = () => {
        const confirmation = window.confirm("Etes vous sur de vouloir supprimer cette classe ?");
        if (confirmation) {

            deleteClassroom.mutate(id,{
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
                    Classe supprimé avec succès !
                </Alert>
            </Snackbar>
        </>
    );
}