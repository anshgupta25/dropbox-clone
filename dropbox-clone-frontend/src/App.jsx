import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import FileView from './components/FileView';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';

export default function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            📦 Dropbox Clone
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={
            <>
              <FileUpload />
              <FileList />
            </>
          } />
          <Route path="/file/:id" element={<FileView />} />
        </Routes>
      </Container>
    </Router>
  );
}
