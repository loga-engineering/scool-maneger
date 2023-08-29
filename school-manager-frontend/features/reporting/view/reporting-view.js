"use client";
import ReportingBasicPie from "@/features/reporting/components/reporting-basic-pie";
import ReportingBarChart from "@/features/reporting/components/reporting-bar-chart";
import ReportingLineChart from "@/features/reporting/components/reporting-line-chart";
import {Box, Card, CardContent, CardHeader, Grid, Stack, Typography} from "@mui/material";

export default function ReportingView() {


    return (
        <Box>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>
                <Typography variant="h3" p={3}>
                    {"Analyse & Reporting"}
                </Typography>
            </Stack>

            <Grid container display="flex" spacing={2} p={2}>
                <Grid key={"ReportingBarChart1"} item xs={4} flex={1}>
                    <Card>
                        <CardHeader title={"Nombre d'inscrits par année"}  />
                        <CardContent>
                            <ReportingBarChart />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid key={"BasicLineChart2"} item xs={4} flex={1}>
                    <Card>
                        <CardHeader title={"Chiffre d'affaire par année"}/>
                        <CardContent>
                            <ReportingLineChart />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid key={"BasicPie3"} item xs={4} flex={1}>
                    <Card>
                        <CardHeader title={"Nombre de diplomé"}/>
                        <CardContent>
                            <ReportingBasicPie />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </Box>
    );
}