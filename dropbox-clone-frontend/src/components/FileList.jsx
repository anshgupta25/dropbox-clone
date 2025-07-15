import React, { useEffect, useState } from 'react';
import { getFiles, downloadFile } from '../api';
import { Link } from 'react-router-dom';
import {
  Grid, Card, CardContent, CardActions, Button, Typography, Skeleton, Stack
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function FileList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFiles().then(res => {
      setFiles(res.data);
      setLoading(false);
    });
  }, []);

  const handleDownload = (id, filename) => {
    downloadFile(id).then(res => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    });
  };

  if (loading) {
    return <Skeleton variant="rectangular" width="100%" height={300} />;
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>Uploaded Files</Typography>
      <Grid container spacing={3}>
        {files.map(file => (
          <Grid item xs={12} sm={6} md={4} key={file.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 3, '&:hover': { boxShadow: 6 } }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <InsertDriveFileIcon color="primary" />
                  <Typography variant="h6">{file.filename}</Typography>
                </Stack>
                <Typography variant="body2">Type: {file.filetype}</Typography>
                <Typography variant="body2">Uploaded: {new Date(file.upload_date).toLocaleString()}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<VisibilityIcon />} component={Link} to={`/file/${file.id}`}>View</Button>
                <Button size="small" startIcon={<DownloadIcon />} onClick={() => handleDownload(file.id, file.filename)}>Download</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
