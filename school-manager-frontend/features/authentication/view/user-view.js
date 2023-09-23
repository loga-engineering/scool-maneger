"use client";

import {Box, LinearProgress, Stack, Typography} from "@mui/material";
import {useFindProfile} from "@/features/authentication/auth-service";
import User from "@/features/authentication/components/user";

export default function UserView() {

    const {data: currentValue, isLoading, isError, error, refetch} = useFindProfile();


    return (
        <Box p={3}>
            <Stack spacing={3}>
                <Typography variant="h3">
                    {"Profil utilisateur"}
                </Typography>
                {isLoading && <LinearProgress/>}

                {currentValue && <User currentValue={currentValue}/>}

            </Stack>
        </Box>
    );
}

