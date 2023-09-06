import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {authConfig} from "@/features/authentication/auth-config";
import {Box, Button, Card, Typography} from "@mui/material";
import axios from "axios";

const urlBase = process.env.BACKEND_URL;
export default function LayoutAuthenticated(props) {
  const [profile, setProfile] = useState()
  const router = useRouter()

  useEffect(() => {
    fetchProfile().then();
  }, [])

  // async function fetchProfile() {
  //   const res = await fetch(urlBase +"test/profile", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": "Bearer " + localStorage.getItem("token")
  //     }
  //   })
  //   if (res.ok) {
  //     const json = await res.json()
  //     setProfile(json)
  //   } else {
  //     await router.push(authConfig.path.signin)
  //   }
  // }

  async function fetchProfile() {
    try {
      const response = await axios.get(`${urlBase}test/profile`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });

      if (response.status === 200) {
        const json = response.data;
        setProfile(json);
      } else {
        await router.push(authConfig.path.signin);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  function logout() {
    localStorage.removeItem("token")
    router.push(authConfig.path.signin);
  }

  return (
      <Box p={5}>
          <Card>
            <Box>
              <Typography>Signed in as: {profile && profile.username}</Typography>
              <Button onClick={logout} >Log out</Button>
            </Box>
            {props.children}
          </Card>
      </Box>
  )
}