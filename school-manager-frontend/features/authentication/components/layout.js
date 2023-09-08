import {Avatar, Box, Container, Grid, Stack, Typography} from "@mui/material";

export default function Layout(props) {
  return (

        <Box height={"100vh"} >

          <Stack alignItems={"center"} spacing={3}>

            <Box height={150} width={150} marginX={"auto"}>
              <Avatar alt="Loga School" src="/img.png" sx={{ width: 150, height: 150 }} />
            </Box>



                  {props.children}

          </Stack>

        </Box>

  )
}