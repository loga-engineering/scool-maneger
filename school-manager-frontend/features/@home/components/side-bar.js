"use client";

import React from 'react';
import Link from "next/link";
import {Avatar, Box, ListItemButton, ListItemIcon, ListItemText, MenuItem, Stack, Typography} from "@mui/material";
import {Home, School, CalendarMonth, Person} from "@mui/icons-material";
import {usePathname} from "next/navigation";
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';

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
        label: "Elèves",
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

            {menus.map(({label, href, icon}) => (
                <Link key={href} href={href}  underline="none">
                    <ListItemButton sx={{
                        backgroundColor: theme => (pathname === href) && theme.palette.primary.light,
                        color: 'text.secondary',
                    }}>
                        <ListItemIcon>
                            {icon}
                        </ListItemIcon>
                        <ListItemText sx={{ textDecorationLine: 'none' }}>{label}</ListItemText>
                    </ListItemButton>
                </Link>
            ))}

        </Stack>
    );
}

