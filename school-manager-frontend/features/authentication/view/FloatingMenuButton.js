import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useEffect, useState} from "react";
import {authConfig} from "@/features/authentication/auth-config";
import {usePathname, useRouter} from "next/navigation";
import {Box, IconButton} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

export default function FloatingMenuButton() {

    const pathname = usePathname();
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {

        const isValid = localStorage.getItem('token');
        if (isValid) {
            setAuthenticated(true);
        }
    }, [pathname]);

    const options = [
        {
            label: "Sign in",
            href: authConfig.path.signin,
        },{
            label: "Sign up",
            href: authConfig.path.signup,
        }];

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);

    };
    const handleSelect = (href) => {
        setAnchorEl(null);
        router.push(href);
    };
    const logout = () => {
        setAnchorEl(null);
        localStorage.removeItem("token")
        router.push(authConfig.path.signin);
    }

    return (
        <Box>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ color: "text.secondary", fontWeight: "bold"}}
                style={{ position: 'fixed', top: 8, right: 140 }}
                startIcon={<PersonIcon />}
            >
                Compte
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                { authenticated && (
                    <MenuItem key={authConfig.path.user} onClick={() => handleSelect(authConfig.path.user)}>
                        {"Profil"}
                    </MenuItem>
                )}
                {options.map((option) => (
                    <MenuItem key={option.href} onClick={() => handleSelect(option.href)}>
                        {option.label}
                    </MenuItem>
                ))}
                { authenticated && (
                    <MenuItem key={"LogOut"} onClick={() => logout()}>
                        {"Log out"}
                    </MenuItem>
                )}

            </Menu>
        </Box>
    );
}
