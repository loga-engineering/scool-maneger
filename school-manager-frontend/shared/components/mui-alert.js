import React, {useEffect, useState} from "react";
import Alert from "@mui/material/Alert";
import {IconButton, Snackbar, Tooltip} from "@mui/material";

export default function MuiAlert({open, severity, message, setAlert}) {


    const [opened, setOpened] = useState(open ? open : false);
    useEffect(() => {
        open && setOpened(open);
    }, []);

    return(
        <>
            <Snackbar
                open={opened}
                autoHideDuration={6000}
                onClose={() => setOpened(false)}
            >
                <Alert
                    severity={severity}
                    onClose={() => setAlert(null)}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
}