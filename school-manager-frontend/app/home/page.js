
import Link from "next/link";
import {Box, Card, CardActionArea, CardContent, Container, Grid, Typography} from "@mui/material";
import Layout from "@/app/home/layout";

const modules = [
    {
        label: "Gestion reporting",
        href: "/reporting",
        description : "analyser, rechercher, modifier..."
    },{
        label: "Gestion années scolaire",
        href: "/school-years",
        description : "rechercher, modifier, ajouter, supprimer..."
    },
    {
        label: "Gestion classes",
        href: "/classrooms",
        description : "rechercher, modifier, ajouter, supprimer..."
    },
    {
        label: "Gestion élèves",
        href: "/students",
        description : "rechercher, modifier, ajouter, supprimer..."
    },
    {
        label: "Gestion examens",
        href: "/exams",
        description : "rechercher, modifier, ajouter, supprimer..."
    },{
        label: "Gestion notes",
        href: "/grades",
        description : "rechercher, modifier, ajouter, supprimer..."
    }
]

export default function Home() {

    return (
        <Layout>
            <Container component={"main"} maxWidth={"lg"}>
                <Box mt={5}>
                    <Typography variant={"h2"} gutterBottom>
                        {"Gestion d'établissement scolaire"}
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {modules.map(model => (
                        <Grid key={model.href} item xs={4}>
                                <Card>
                                    <Link href={model.href} style={{textDecoration: 'none'}}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography color={"primary.main"}>
                                                    {model.label}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {model.description}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Link>
                                </Card>
                        </Grid>
                    ))}

                </Grid>
            </Container>
        </Layout>
    );
}
