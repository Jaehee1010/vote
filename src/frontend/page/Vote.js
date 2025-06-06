import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Vote.css';

const Vote = () => {
  const [voterName, setVoterName] = useState('');
  const [residentId, setResidentId] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await fetch("http://192.168.56.101:8001/voter/getCandidates");
        const raw = await res.text();
        const parsed = JSON.parse(raw);
        const data = typeof parsed === 'string' ? JSON.parse(parsed) : parsed;

        if (Array.isArray(data)) {
          setCandidates(data);
        } else {
          alert("후보자 목록이 배열 형식이 아닙니다.");
        }
      } catch (err) {
        console.error("후보자 목록 불러오기 실패", err);
        alert("후보자 목록을 불러올 수 없습니다.");
      }
    };

    fetchCandidates();
  }, []);

  const handleSubmit = async () => {
    let message = '';

    if (!voterName.trim()) {
      message += '투표자 이름을 입력해주세요.\n';
    } else if (!/^[가-힣]{2,10}$/.test(voterName.trim())) {
      message += '투표자 이름은 한글 2~10자로 입력해주세요.\n';
    }

    if (!residentId.trim()) {
      message += '주민등록번호를 입력해주세요.\n';
    } else if (!residentId.includes('-')) {
      message += "주민등록번호에 '-'를 포함해서 입력해주세요. 예: 123456-1234567\n";
    }

    if (!candidateName.trim()) {
      message += '후보자를 선택해주세요.\n';
    }

    if (message) {
      alert(message);
      return;
    }

const rrnSuffix = residentId.split('-')[1]; 

try {
  const response = await fetch(`http://192.168.56.101:8001/voter/vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      voterName: voterName,
      rrnSuffix: rrnSuffix,
      candidateName: candidateName
    })
  });

  const data = await response.json();

  if (response.ok) {
    alert("투표가 완료되었습니다.");
    setVoterName('');
    setResidentId('');
    setCandidateName('');
    navigate('/');
  } else {
    alert("투표 실패: " + (data.message || data.error));
  }
} catch (err) {
  console.error(err);
  alert("서버와 연결할 수 없습니다.");
}
  };

  return (
    <div className="vote-container">
      <h3 className="section-title">21대 대통령 선거 후보자</h3>

      <div className="vote-page-grid">
        <div className="candidate-table">
          <div className="candidate-table-title">후보자 목록</div>
          {candidates.map((c, index) => (
            <div
              key={index}
              className={`table-row ${candidateName === c.name ? 'selected' : ''}`}
              onClick={() => setCandidateName(c.name)}
            >
              <div>{c.candidateId || c.id}</div>
              <div>{c.partyName}</div>
              <div>{c.name}</div>
            </div>
          ))}
        </div>

        <div className="vote-form-box">
          <img
            src="/images/투표마크.png"
            alt="투표 마크"
            className="vote-form-image"
          />
          <div className="vote-form">
            <label>투표자</label>
            <input
              type="text"
              placeholder="투표자 이름을 입력해주세요."
              value={voterName}
              onChange={(e) => setVoterName(e.target.value)}
            />

            <label>주민등록번호</label>
            <input
              type="text"
              placeholder="주민등록번호를 입력해주세요."
              value={residentId}
              onChange={(e) => setResidentId(e.target.value)}
            />

            <label>후보자</label>
            <input
              type="text"
              placeholder="후보자 행을 클릭해서 선택해주세요."
              value={candidateName}
              readOnly
            />

            <button className="submit-button" onClick={handleSubmit}>
              투표하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vote;
