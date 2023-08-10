import React from 'react';
import {InputAdornment, OutlinedInput} from "@mui/material";
import {Search} from "@mui/icons-material";

export default function SearchField({query, setQuery}) {
    return (
        <OutlinedInput
            value={query}
            onChange={e => setQuery(e.target.value)}

            startAdornment={(
                <InputAdornment position={"start"}>
                    <Search/>
                </InputAdornment>
            )}
        />
    );
}

