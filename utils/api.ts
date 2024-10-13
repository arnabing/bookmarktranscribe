import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const fetchTranscript = async () => {
  const response = await api.get(`/transcript`);
  return response.data;
};
