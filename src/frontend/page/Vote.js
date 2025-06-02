import React, { useState } from 'react';
import '../css/Vote.css';

const candidates = [
  { id: 1, name: "이재명", number: 1, image: "/images/아놀드.jpg" },
  { id: 2, name: "김문수", number: 2, image: "/images/아놀드.jpg" },
  { id: 3, name: "이준석", number: 3, image: "/images/아놀드.jpg" },
  { id: 4, name: "권영국", number: 4, image: "/images/크리스범스테드.jpg" },
  { id: 5, name: "황교안", number: 5, image: "/images/크리스범스테드.jpg" },
  { id: 6, name: "송진모", number: 6, image: "/images/크리스범스테드.jpg" },
];

const Vote = () => {
  const [voterName, setVoterName] = useState('');
  const [residentId, setResidentId] = useState('');
  const [candidateName, setCandidateName] = useState('');

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
          {candidates.map((c) => (
            <div key={c.id} className="candidate-wrapper">
              <div className="candidate-card">
                <img src={c.image} alt={c.name} />
              </div>
              <div className="candidate-label">
                기호 {c.number}번 {c.name}
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
