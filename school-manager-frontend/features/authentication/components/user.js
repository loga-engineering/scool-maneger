

import {Box, Card, Stack, TextField, Typography} from "@mui/material";


export default function User({currentValue}) {


    let authority = "| ";
    currentValue?.authorities.forEach((role) => {
        authority += role.authority +" | ";
    });

  return (
      <Card>
        <Stack spacing={3} p={3}>
          <Box display="flex" gap="16px">
            <Box flex={1}>
                  <TextField
                      fullWidth
                      label="email"
                      value={currentValue.email}
                      InputProps={{readOnly: true}}
                  />
            </Box>
              <Box flex={1}>
                  <TextField
                      fullWidth
                      label="Nom d'utilisateur"
                      value={currentValue.username}
                      InputProps={{readOnly: true}}
                  />
              </Box>
              <Box flex={1}>
                  <TextField
                      fullWidth
                      label="Role"
                      value={authority}
                      InputProps={{readOnly: true}}
                  />
              </Box>
          </Box>
        </Stack>
      </Card>

  );

}