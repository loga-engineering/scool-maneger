import {InputAdornment, OutlinedInput,} from "@mui/material";
import {Search} from "@mui/icons-material";

export default function SearchField({query, setQuery, label, length}) {

    const handleChange = (event) => {
        const value = event.target.value.toString();
        if (value.length >= length) {
            setQuery(value);
        }
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

