import React, {useState} from "react";
import Alert from "@mui/material/Alert";
import {IconButton, Snackbar, Tooltip} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDeleteGrade} from "@/features/grades/grade-services";

export default function GradeDelete({id, refetch}) {

    const [deleted, setDeleted] = useState(false);
    const deleteGrade = useDeleteGrade();

    const handleDelete = () => {
        const confirmation = window.confirm("Etes vous sur de vouloir supprimer cette note ?");
        if (confirmation) {

            deleteGrade.mutate(id,{
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
                    Note supprimé avec succès !
                </Alert>
            </Snackbar>
        </>
    );
}