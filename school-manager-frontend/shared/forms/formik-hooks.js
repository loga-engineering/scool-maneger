import {merge} from "lodash";


export const generateValues = ({validationSchema, currentValue}) => {
    const defaultValues = validationSchema?.getDefault();

    const initialValues = merge({}, defaultValues, currentValue);

    return {initialValues, validationSchema}
}