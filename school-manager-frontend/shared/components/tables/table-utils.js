import Link from 'next/link'
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {IconButton, MenuItem, Stack, Tooltip} from "@mui/material";

export const initialPagination = {pageIndex: 0, pageSize: 10};

export default function ActionMenuItems({config, children, id}){

    return(
        <Stack direction={"row"} spacing={0}>
            <MenuItem key={id + "details"}>
                <Link href={config.path.details(id)}>
                    <Tooltip arrow title="Détails">
                        <IconButton><VisibilityIcon /></IconButton>
                    </Tooltip>
                </Link>
            </MenuItem>
            <MenuItem key={id +"edit"}>
                <Link href={config.path.edit(id)}>
                    <Tooltip arrow title="Modifier">
                        <IconButton><EditIcon /></IconButton>
                    </Tooltip>
                </Link>
            </MenuItem>
            <MenuItem key={id +"delete"}>
                {children}
            </MenuItem>
        </Stack>
    );
}