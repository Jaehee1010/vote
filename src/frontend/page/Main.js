import React, { useState } from 'react';
import '../css/Main.css';

const candidates = [
  { id: 1, name: "이재명", number: 1, image: "/images/크리스범스테드.jpg" },
  { id: 2, name: "김문수", number: 2, image: "/images/크리스범스테드.jpg" },
  { id: 4, name: "이준석", number: 4, image: "/images/크리스범스테드.jpg" },
  { id: 5, name: "권영국", number: 5, image: "/images/크리스범스테드.jpg" },
  { id: 7, name: "황교안", number: 7, image: "/images/크리스범스테드.jpg" },
  { id: 8, name: "송진모", number: 8, image: "/images/크리스범스테드.jpg" },
];

function Main() {
  const [selectedId, setSelectedId] = useState(null);
  const voteRate = 0;

  return (
    <div className="main-container">
      <div className="banner">
        <img src="/images/김문수 배너.png" alt="배너" className="banner-img" />
      </div>

      <h2 className="section-title">21대 대통령 선거 후보자</h2>

      <div className="candidate-grid">
        {candidates.map((c) => (
          <div key={c.id} className="candidate-wrapper">
            <div
              className={`candidate-card ${selectedId === c.id ? 'selected' : ''}`}
              onClick={() => setSelectedId(c.id)}
            >
              <img src={c.image} alt={c.name} />
            </div>
            <div className="candidate-label">
              기호 {c.number}번 {c.name}
            </div>
          </div>
        ))}
      </div>

      <div className="vote-box">
        <div className="vote-info">
          <p>투표 시작일: 2025년 06월 03일 00시</p>
          <p>투표 종료일: 2025년 06월 03일 23시</p>
        </div>
        <div className="vote-chart">
          <div className="circle">
            <div className="circle-text">
              <p className="circle-title">실시간 투표율</p>
              <p className="circle-percent">{voteRate}%</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        © 2025, Made by K-Digital Training 3기<br />
        Team: "삼삼오오" Members: 김석진, 이재희, 최찬희, 함영준
      </footer>
    </div>
  );
}

export default Main;
