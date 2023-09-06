
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {authConfig} from "@/features/authentication/auth-config";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Box} from "@mui/material";

const options = [
    {
        label: "Profile",
        href: authConfig.path.user,
    },{
        label: "Sign In",
        href: authConfig.path.signin,
    },{
        label: "Sign Up",
        href: authConfig.path.signup,
    }]


export default function FloatingMenuButton() {

    const router = useRouter();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (href) => {
        setAnchorEl(null);
        router.push(href);
    };

    const logout = () => {
        localStorage.removeItem("token")
        router.push(authConfig.path.signin);
    }

    return (
        <Box>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{ position: 'fixed', top: 8, right: 20 }}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {options.map((option) => (
                    <MenuItem key={option.label} onClick={handleClose(option.href)}>
                        {option.label}
                    </MenuItem>
                ))}
                <MenuItem key={"LogOut"} onClick={logout}>
                    {"Log out"}
                </MenuItem>
            </Menu>
        </Box>
    );
}
