import {Button, Stack} from "@mui/material";

export default function FormikSubmitButton({cancelLabel = "Annuler", validateLabel = "Modifier", onCancel}) {

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

export const formikSubmit = async (values, isEdit, createFunction, updateFunction, router, Config) => {
    try {
        let id = values.id;
        if (isEdit) {
            console.log("updateFunction ====> ", values);
            await updateFunction(id, values);
        } else {
            console.log("createFunction ====> ", values);
            const createdValue = await createFunction(values);
            id = createdValue.id;
        }
        router.push(Config.path.details(id));
    } catch (error) {
        console.error(error);
    }
};

