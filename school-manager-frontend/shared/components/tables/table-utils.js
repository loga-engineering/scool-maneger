import {IconButton, Link, MenuItem, Stack, Tooltip} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

export const initialPagination = {pageIndex: 0, pageSize: 10};

export default function ActionMenuItems({config, children, id}){

    return(
        <Stack direction={"row"} spacing={0}>
            <MenuItem key="details">
                <Link href={config.path.details(id)}>
                    <Tooltip title="Détails">
                        <IconButton><VisibilityIcon /></IconButton>
                    </Tooltip>
                </Link>
            </MenuItem>,
            <MenuItem key="edit">
                <Link href={config.path.edit(id)}>
                    <Tooltip title="Modifier">
                        <IconButton><EditIcon /></IconButton>
                    </Tooltip>
                </Link>
            </MenuItem>,
            <MenuItem key="delete">
                {children}
            </MenuItem>,
        </Stack>
    );
}