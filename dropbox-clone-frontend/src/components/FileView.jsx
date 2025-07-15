import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { viewFile, downloadFile } from '../api';
import {
  Typography,
  Container,
  Card,
  CardContent,
  CircularProgress,
  Button,
  Stack
} from '@mui/material';

export default function FileView() {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [fileType, setFileType] = useState('');
  const [metadata, setMetadata] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching file view for ID:", id);
    viewFile(id)
      .then(res => {
        const contentType = res.headers['content-type'];

        if (contentType.includes('application/json')) {
          // text or json
          setFileType('text');
          setMetadata({
            filename: res.data.filename,
            filetype: res.data.filetype,
            size: res.data.size,
            upload_date: res.data.upload_date
          });
          setContent(res.data.content);
        } else if (contentType.startsWith('image')) {
          setFileType('image');
          setContent(res.request.responseURL);
        } else if (contentType === 'application/pdf') {
          setFileType('pdf');
          setContent(res.request.responseURL);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error viewing file:", err);
        setLoading(false);
        setContent(null);
      });
  }, [id]);

  const handleDownload = () => {
    downloadFile(id).then(res => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', metadata.filename || 'downloaded_file');
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!content) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography color="error">File not found or failed to load.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {metadata.filename && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>File Details</Typography>
            <Typography>Filename: {metadata.filename}</Typography>
            <Typography>Type: {metadata.filetype}</Typography>
            <Typography>Size: {metadata.size} bytes</Typography>
            <Typography>Uploaded on: {new Date(metadata.upload_date).toLocaleString()}</Typography>
          </CardContent>
        </Card>
      )}

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" onClick={handleDownload}>Download</Button>
      </Stack>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>File Content</Typography>
          {fileType === 'image' ? (
            <img src={content} alt="Uploaded File" style={{ maxWidth: '100%' }} />
          ) : fileType === 'pdf' ? (
            <iframe src={content} width="100%" height="600px" title="PDF Viewer"></iframe>
          ) : (
            <pre style={{ backgroundColor: '#f0f0f0', padding: '1rem', overflow: 'auto' }}>
              {content}
            </pre>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
