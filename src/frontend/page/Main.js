import React, { useState } from 'react';
import '../css/Main.css';

const candidates = [
  { id: 1, name: "이재명", number: 1, image: "/images/candidate1.png" },
  { id: 2, name: "김문수", number: 2, image: "/images/candidate2.png" },
  { id: 4, name: "이준석", number: 4, image: "/images/candidate4.png" },
  { id: 5, name: "권영국", number: 5, image: "/images/candidate5.png" },
  { id: 7, name: "황교안", number: 7, image: "/images/candidate7.png" },
  { id: 8, name: "송진모", number: 8, image: "/images/candidate8.png" },
];

function Main() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="main-container">
      {/* 상단 배너 */}
      <div className="banner">
        <img src="/images/김문수 배너.png" alt="배너" className="banner-img" />
      </div>

      <h2 className="section-title">23대 대통령 선거 후보자</h2>

      {/* 후보자 카드 */}
      <div className="candidate-grid">
        {candidates.map((c) => (
          <div
            key={c.id}
            className={`candidate-card ${selectedId === c.id ? 'selected' : ''}`}
            onClick={() => setSelectedId(c.id)}
          >
            <img src={c.image} alt={c.name} />
            <p>기호 {c.number}번 {c.name}</p>
          </div>
        ))}
      </div>

      {/* 투표 일정 및 차트 */}
      <div className="vote-info">
        <div className="vote-date">
          <p>투표 시작일: 2025년 06월 03일 00시</p>
          <p>투표 종료일: 2025년 06월 03일 23시</p>
        </div>
        <div className="vote-chart">
          <p>실시간 투표율</p>
          <div className="circle">00%</div>
        </div>
      </div>

      {/* 푸터 */}
      <footer className="footer">
        © 2025, Made by K-Digital Training 3기<br />
        Team: "삼삼오오" Members: 김석진, 이재희, 최찬희, 함영준
      </footer>
    </div>
  );
}

export default Main;