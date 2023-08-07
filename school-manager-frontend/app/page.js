import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import EleveList from './(Eleves)/EleveList/page';

export default function Home() {
  return (
    <main>
        <h1>School Management</h1>
        <EleveList />

      
    </main>
    
  )
}
