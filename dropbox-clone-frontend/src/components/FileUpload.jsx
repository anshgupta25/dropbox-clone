import React, { useState } from 'react';
import { uploadFile } from '../api';
import { Button, Card, CardContent, Typography, Alert, Stack } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

export default function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const allowedTypes = ['text/plain', 'image/jpeg', 'image/png', 'application/json', 'application/pdf'];

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }
    if (!allowedTypes.includes(file.type)) {
      setError('Unsupported file type');
      return;
    }
    try {
      await uploadFile(file);
      setError('');
      setFile(null);
      onUploadSuccess?.();  // optional chaining
    } catch {
      setError('Upload failed');
    }
  };

  return (
    <Card sx={{ mb: 4, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Upload a File</Typography>
        <Stack spacing={2} direction="row" alignItems="center">
          <input type="file" onChange={e => setFile(e.target.files[0])} />
          <Button
            variant="contained"
            startIcon={<UploadIcon />}
            onClick={handleUpload}
            disabled={!file}
          >
            Upload
          </Button>
        </Stack>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </CardContent>
    </Card>
  );
}
