import * as React from 'react';
import Link from 'next/link';
import {Box, Card, CardContent, Container, Grid, Typography} from "@mui/material";


const modules = [
    {
        label: "Gestion années scolaire",
        href: "/school-years"
    },
    {
        label: "Gestion classes",
        href: "/classrooms"
    },
    {
        label: "Gestion élèves",
        href: "/students"
    },
    {
        label: "Gestion examens",
        href: "/exams"
    },{
        label: "Gestion notes",
        href: "/grades"
    }
]

export default function Home() {
    return (
        <Container component={"main"} maxWidth={"lg"}>
            <Box mt={5}>
                <Typography variant={"h2"} gutterBottom>
                    {"Gestion d'établissement Scolaire"}
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {modules.map(model => (
                    <Grid key={model.href} item xs={4}>
                        <Link href={model.href}>
                            <Card>
                                <CardContent>
                                    <Typography>
                                        {model.label}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}

            </Grid>
        </Container>
    )
}
