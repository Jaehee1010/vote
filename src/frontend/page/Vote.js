import React, { useState, useEffect } from 'react';
import '../css/Vote.css';

const Vote = () => {
  const [voterName, setVoterName] = useState('');
  const [residentId, setResidentId] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/SignUpList");
        const data = await response.json();
        setCandidates(data);
      } catch (error) {
        console.error("후보자 목록 불러오기 실패:", error);
        alert("후보자 목록을 불러오지 못했습니다.");
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
      message += '후보자 이름을 입력해주세요.\n';
    }

    if (message) {
      alert(message);
      return;
    }

    const voteData = {
      voterName,
      residentId,
      candidateName,
    };

    console.log("서버에 전송할 투표 데이터:", voteData);

    try {
      const response = await fetch("http://localhost:8080/api/Vote", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(voteData),
      });

      const data = await response.json();
      if (data.success) {
        alert("투표가 완료되었습니다.");
      } else {
        alert("투표 실패: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("서버와 연결할 수 없습니다.");
    }
  };

  return (
    <div className="vote-container">
      <h2 className="section-title">21대 대통령 선거 후보자</h2>

      <div className="vote-page-grid">
        <div className="candidate-grid">
          {candidates.map((c, index) => (
            <div key={index} className="candidate-wrapper">
              <div className="candidate-card" onClick={() => setCandidateName(c.name)}>
                <img src={c.image || "/images/default.png"} alt={c.name} />
              </div>
              <div className="candidate-label">
                기호 {c.number}번 {c.name} ({c.party})
              </div>
            </div>
          ))}
        </div>

        <div className="vote-form-box">
          <img
            src="/images/투표마크.png"
            alt="투표 박스"
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
              placeholder="후보자 이름을 입력해주세요."
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
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
