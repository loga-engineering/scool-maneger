import {TextField} from "@mui/material";
import {useField} from "formik";

export default function FormikTextField({label, name, ...other}) {

    const [field, meta, form] = useField(name);

    return (
        <TextField
            fullWidth
            label={label}
            {...field}
            error={!!meta.error}
            helperText={meta.error}
            {...other}
        />
    );
}

