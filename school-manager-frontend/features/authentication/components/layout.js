import {Avatar, Box, Container, Grid, Stack, Typography} from "@mui/material";

export default function Layout(props) {
  return (

        <Box mt={5} alignItems={"center"}>

          <Stack height={"80%"} width={"100%"} alignItems={"center"}>

            <Box height={150} width={150} marginX={"auto"}>
              <Avatar alt="Loga School" src="/img.png" sx={{ width: 150, height: 150 }} />
            </Box>
              {/*
            <Typography variant={"h3"} gutterBottom>
              {"Gestion d'établissement scolaire"}
            </Typography>*/}

              {props.children}
          </Stack>

            {/*<Grid container spacing={3}>

                {props.children}

            </Grid>*/}

        </Box>


    /*<Box mt={5} alignItems={"center"} p={3}>
        <Stack spacing={3}>

            {props.children}
        </Stack>
    </Box>*/
  )
}