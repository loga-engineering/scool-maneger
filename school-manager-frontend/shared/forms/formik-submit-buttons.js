import {Button, Stack} from "@mui/material";

export default function FormikSubmitButtons({cancelLabel = "Annuler", validateLabel = "Modifier", onCancel}) {

    return (
        <Stack direction={"row"} spacing={2} justifyContent={"end"}>
            <Button type="reset" onClick={onCancel}>
                {cancelLabel}
            </Button>

            <Button type={"submit"} variant={"outlined"}>
                {validateLabel}
            </Button>
        </Stack>
    );
}

