

import { useEffect, useState } from "react"
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {Box, Card, Stack, TextField, Typography} from "@mui/material";
import axios from "axios";
import {getProfile, useFindProfile} from "@/features/authentication/auth-service";


export default function User({currentValue}) {


//   const [content, setContent] = useState(null)
// //  const router = useRouter()
//
//   useEffect(() => {
//     fetchContent().then();
//   }, [])
//
//
//   const fetchContent = () => {
//     try {
//       const response = getProfile();
//
//       if (response.status === 200) {
//         const data = response.data;
//         setContent(text);
//       }
//     } catch (error) {
//       console.error('Error fetching content:', error);
//     }
//   }

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
                      value={currentValue.authorities[0].authority}
                      InputProps={{readOnly: true}}
                  />
              </Box>
          </Box>
        </Stack>
      </Card>

  );

}