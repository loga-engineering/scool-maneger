import React, {useState} from 'react';
import {FormControl, FormHelperText, InputAdornment, OutlinedInput, Stack, TextField} from "@mui/material";
import {Search} from "@mui/icons-material";
import Autocomplete from '@mui/material/Autocomplete';

export default function SearchField({query, setQuery, label, length}) {

    const handleChange = (event) => {
        const value = event.target.value.toString();
        if (value.length >= length) {
            setQuery(value);
        }
        //else if(!value) setQuery("");
    };

    return (
        <OutlinedInput
            defaultValue={query}
            onChange={(event) => handleChange(event)}
            startAdornment={(
                <InputAdornment position={"start"}>
                    <Search/>
                </InputAdornment>
            )}
            placeholder={label}
        />

    );
}

