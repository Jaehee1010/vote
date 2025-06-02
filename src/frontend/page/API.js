import React, { useState } from 'react';
import axios from 'axios'
import Main from './Main';

const API_BASE = 'http://192.168.56.101:8001';
const ADMIN_KEY = 'admin123'; // 실제 환경에서는 보안에 주의

function AdminPanel() {
  const [candidateId, setCandidateId] = useState('');
  const [name, setName] = useState('');
  const [partyName, setPartyName] = useState('');
  const [status, setStatus] = useState(null);

  const handleInit = async () => {
    try {
      const response = await axios.get(`${API_BASE}/admin/init`, {
        headers: {
          'admin-key': ADMIN_KEY
        }
      });
      setStatus(response.data);
    } catch (err) {
      console.error(err);
      setStatus(err.response?.data || '에러 발생');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.get(`${API_BASE}/admin/registerCandidate`, {
        headers: {
          'admin-key': ADMIN_KEY
        },
        params: {
          candidateId,
          name,
          partyName
        }
      });
      setStatus(response.data);
    } catch (err) {
      console.error(err);
      setStatus(err.response?.data || '에러 발생');
    }
  };
}

export default AdminPanel;
