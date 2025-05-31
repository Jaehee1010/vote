import React, { useState } from 'react';
import axios from 'axios';

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

  
  return (
    <div style={{ padding: '1rem', maxWidth: '600px' }}>
      <h2>📋 관리자 패널</h2>

      <section style={{ marginBottom: '1rem' }}>
        <h3>🛠 투표 시스템 초기화</h3>
        <button onClick={handleInit}>초기화 요청 보내기</button>
      </section>

      <section style={{ marginBottom: '1rem' }}>
        <h3>👤 후보자 등록</h3>
        <input
          placeholder="후보자 ID"
          value={candidateId}
          onChange={(e) => setCandidateId(e.target.value)}
        />
        <input
          placeholder="후보자 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="정당 이름"
          value={partyName}
          onChange={(e) => setPartyName(e.target.value)}
        />
        <button onClick={handleRegister}>후보자 등록</button>
      </section>

      <section>
        <h3>📦 응답 결과</h3>
        <pre>{JSON.stringify(status, null, 2)}</pre>
      </section>
    </div>
  );
}

export default AdminPanel;
