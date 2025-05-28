import React from 'react';
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
            <input type="text" placeholder="투표자 이름을 입력해주세요." />

            <label>주민등록번호</label>
            <input type="text" placeholder="주민등록번호를 입력해주세요." />

            <label>후보자</label>
            <input type="text" placeholder="후보자 이름을 입력해주세요." />

            <button className="submit-button">투표하기</button>
          </div>
        </div>
      </div>

      <footer className="footer">
        © 2025, Made by K-Digital Training 3기<br />
        Team: "삼삼오오" Members: 김석진, 이재희, 최찬희, 함영준
      </footer>
    </div>
  );
};

export default Vote;
