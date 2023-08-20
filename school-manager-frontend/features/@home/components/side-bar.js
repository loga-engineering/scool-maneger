"use client";

import React from 'react';
import {usePathname} from "next/navigation";
import GroupsIcon from '@mui/icons-material/Groups';
import {Home, CalendarMonth} from "@mui/icons-material";
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import {Avatar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack} from "@mui/material";


const menus = [
    {
        icon: <Home/>,
        label: "Home",
        href: "/"
    },
    {
        icon: <CalendarMonth/>,
        label: "Années scolaire",
        href: "/school-years"
    },
    {
        icon: <SchoolOutlinedIcon/>,
        label: "Classes",
        href: "/classrooms"
    },
    {
        icon: <GroupsIcon/>,
        label: "Eleves",
        href: "/students"
    },
    {
        icon: <HistoryEduOutlinedIcon/>,
        label: "Examens",
        href: "/exams"
    },
    {
        icon: <GradeOutlinedIcon/>,
        label: "Notes",
        href: "/grades"
    },
]

export default function SideBar() {

    const pathname = usePathname();

    return (
        <Stack height={"100%"} width={300} sx={{
            backgroundColor: theme => theme.palette.divider,
        }}>
            <Box height={150} width={60} marginX={"auto"} p={1} pr={15} alignItems="center">
                    <Avatar alt="Loga School" src="/img.png" sx={{ width: 120, height: 120 }} />
            </Box>
            <List>
            {menus.map(({label, href, icon}) => (
                <ListItem key={href} disablePadding>
                        <ListItemButton href={href} sx={{
                            backgroundColor: theme => (pathname === href) && theme.palette.primary.light,
                            color: 'text.secondary',
                        }}>
                            <ListItemIcon>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={label} variant={"h5"} sx={{ fontWeight: "bold" }}/>
                        </ListItemButton>
                </ListItem>
            ))}
            </List>
        </Stack>
    );
}

