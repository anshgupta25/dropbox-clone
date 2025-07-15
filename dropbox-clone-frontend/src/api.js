import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const uploadFile = (file) => {
    console.log("Uploading file...", file);
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const getFiles = () => {
    console.log("Fetching files list...");
    return axios.get(`${API_BASE_URL}/files`);
};

export const downloadFile = (id) => axios.get(`${API_BASE_URL}/files/${id}/download`, { responseType: 'blob' });

export const viewFile = (id) => axios.get(`${API_BASE_URL}/files/${id}/view`);
