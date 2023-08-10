import React from 'react';
import {useModule} from "../context/module-context";
import {Typography} from "@mui/material";

export default function ModuleName() {

    const {name, urlBase} = useModule();

    return (
        <Typography>{name}</Typography>
    );
}

