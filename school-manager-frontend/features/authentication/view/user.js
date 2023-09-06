"use client";

//import {useRouter} from "next/navigation";
import { useEffect, useState } from "react"
import LayoutAuthenticated from "../components/layout-authenticated"
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {Box, Typography} from "@mui/material";
import axios from "axios";

const urlBase = process.env.BACKEND_URL;

export default function User() {
  const [content, setContent] = useState(null)
//  const router = useRouter()

  useEffect(() => {
    fetchContent().then();
  }, [])


/*  async function fetchContent() {
    const res = await fetch(urlBase+"test/user", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
    if (res.ok) {
      const text = await res.text()
      setContent(text)
    }
  }*/

  async function fetchContent() {
    try {
      const response = await axios.get(`${urlBase}test/user`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });

      if (response.status === 200) {
        const text = response.data;
        setContent(text);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      // Gérer les erreurs de manière appropriée (affichage d'un message d'erreur, par exemple)
    }
  }

  return (
    <LayoutAuthenticated>
      <Box>
        <Typography>User</Typography>
        {content && (
          <Typography>{content}</Typography>
        )}
      </Box>
    </LayoutAuthenticated>
  );

}