"use client";

import React from 'react';
import Link from "next/link";
import {Box, ListItemButton, ListItemIcon, ListItemText, Stack, Typography} from "@mui/material";
import {Home, School, CalendarMonth} from "@mui/icons-material";
import {usePathname} from "next/navigation";

const menus = [
    {
        icon: <Home/>,
        label: "Home",
        href: "/"
    },
    {
        icon: <CalendarMonth/>,
        label: "Années scolaires",
        href: "/school-years"
    },
]

export default function SideBar() {

    const pathname = usePathname();

    return (
        <Stack height={"100%"} width={300} sx={{
            backgroundColor: theme => theme.palette.divider,
        }}>
            <Box height={100} width={50} marginX={"auto"}>
                {"Logo"}
            </Box>

            {menus.map(({label, href, icon}) => (
                <Link key={href} href={href}>
                    <ListItemButton sx={{
                        backgroundColor: theme => (pathname === href) && theme.palette.primary.light,
                    }}>
                        <ListItemIcon>
                            {icon}
                        </ListItemIcon>
                        <ListItemText>{label}</ListItemText>
                    </ListItemButton>
                </Link>
            ))}

        </Stack>
    );
}

