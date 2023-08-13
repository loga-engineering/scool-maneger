import React, {useState} from "react";
import {useDeleteSchoolYear} from "@/features/school-years/school-year-services";
import Alert from "@mui/material/Alert";
import {IconButton, Snackbar, Tooltip} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function SchoolYearDelete({id, refetch}) {

    const [deleted, setDeleted] = useState(false);
    const deleteSchoolYear = useDeleteSchoolYear();

    const handleDelete = () => {
        const confirmation = window.confirm("Etes vous sur de vouloir supprimer cette année scolaire ?");
        if (confirmation) {

            deleteSchoolYear.mutate(id,{
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
            <Tooltip title="Supprimer">
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
                    Année scolaire supprimé avec succès !
                </Alert>
            </Snackbar>
        </>
    );
}