"use client";

import {usePathname, useRouter} from "next/navigation";
import GroupsIcon from '@mui/icons-material/Groups';
import {CalendarMonth, Home} from "@mui/icons-material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

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
    {
        icon: <TrendingUpIcon/>,
        label: "Reporting",
        href: "/reporting"
    },
]

export default function SideBar() {

    const pathname = usePathname();
    const router = useRouter();
    const handleThemeChange = (theme, href) => {
        if(href === "/" ) {
            if (pathname === href)
            return theme.palette.mode === "dark" ? theme.palette.primary.dark :
                theme.palette.secondary.main;
        } else if(pathname.includes(href)){
            return theme.palette.mode === "dark" ? theme.palette.primary.dark :
                theme.palette.secondary.main;
        }
        else return (theme.palette.mode ==="dark") ?( theme.palette.secondary.dark): theme.palette.secondary.light;
    };

    return (
        <Box sx={{
        backgroundColor: theme => (theme.palette.mode ==="dark") ?( theme.palette.secondary.dark): theme.palette.secondary.light,
        }} >
            <Stack height={"100%"} width={300} >

                <Box height={150} width={60} marginX={"auto"} p={1} pr={20} alignItems="center">
                        <Avatar alt="Loga School" src="/img.png" sx={{ width: 140, height: 140 }} />
                </Box>
                <List>

                {menus.map(({label, href, icon}) => (
                    <ListItem key={href} disablePadding>
                            <ListItemButton onClick={() => router.push(href)} sx={{
                                backgroundColor: theme => handleThemeChange(theme, href),
                            }}>
                                <ListItemIcon>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={label} variant={"h4"} sx={{ fontWeight: "bold" }}/>
                            </ListItemButton>
                    </ListItem>
                ))}
                </List>
            </Stack>
        </Box>
    );
}

