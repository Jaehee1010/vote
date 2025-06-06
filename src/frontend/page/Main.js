import React, { useEffect, useState } from 'react';
import '../css/Main.css';

const bannerImages = [
  "/images/이준석 배너.png",
  "/images/이재명 배너.png",
  "/images/김문수 배너.png",
  "/images/권영국 배너.png",
  "/images/황교안 배너.png",
  "/images/송진호 배너.png"
];

const candidates = [
  { id: 1, name: "이재명", number: 1, image: "/images/이재명프로필.png" },
  { id: 2, name: "김문수", number: 2, image: "/images/김문수프로필.png" },
  { id: 4, name: "이준석", number: 4, image: "/images/이준석프로필.png" },
  { id: 5, name: "권영국", number: 5, image: "/images/권영국프로필.png" },
  { id: 7, name: "황교안", number: 7, image: "/images/황교안프로필.png" },
  { id: 8, name: "송진호", number: 8, image: "/images/송진호프로필.png" }
];

function Main() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [voteRate, setVoteRate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
   const fetchVoteRate = async () => {
  try {
    const response = await fetch("http://192.168.56.101:8001/public/votingStatus", {
      method: 'GET',
      headers: { 'Cache-Control': 'no-cache' }
    });

    let data = await response.json();

    if (typeof data === 'string') {
      console.warn("⚠️ 문자열 응답 감지, JSON 재파싱 시도");
      data = JSON.parse(data);
    }

    console.log("✅ 투표율 응답 데이터:", data);

    if (data && typeof data === 'object' && 'participationRate' in data) {
      const rate = parseFloat(data.participationRate.replace('%', ''));
      if (!isNaN(rate)) {
        setVoteRate(rate);
      } else {
        console.warn("⚠️ participationRate가 숫자가 아님:", data.participationRate);
      }
    } else {
      console.warn("❌ participationRate 필드 없음:", data);
    }
  } catch (error) {
    console.error("실시간 투표율 불러오기 실패:", error);
  }
};



    fetchVoteRate();
    const interval = setInterval(fetchVoteRate, 10000);
    return () => clearInterval(interval);
  }, []);

  const donutStyle = {
    background: `conic-gradient(#4caf50 ${voteRate}%, #ccc ${voteRate}% 100%)`,
    transition: 'background 1s ease-in-out'
  };

  return (
    <div className="main-container">
      <div className="banner">
        <img src={bannerImages[currentBanner]} alt="배너" className="banner-img" />
      </div>

      <h2 className="section-title">21대 대통령 선거 후보자</h2>

      <div className="candidate-grid-wrapper">
        <div className="candidate-grid">
          {candidates.map((c) => (
            <div key={c.id} className="candidate-wrapper">
              <div className="candidate-card">
                <div className="image-box">
                  <img src={c.image} alt={`${c.name} 후보자`} />
                </div>
                <div className="text-box">
                  기호 {c.number}번 {c.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="vote-box">
        <div className="vote-info">
          <p>투표 시작일: 2025년 06월 03일 00시</p>
          <p>투표 종료일: 2025년 06월 03일 23시</p>
        </div>
        <div className="vote-chart">
          <div className="donut" style={donutStyle}>
            <div className="donut-center">
              <p className="circle-title">실시간 투표율</p>
              <p className="circle-percent">{voteRate.toFixed(2)}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
