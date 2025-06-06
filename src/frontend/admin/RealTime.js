import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar'
import '../css/RealTime.css';

const RealTime = () => {
    const [totalVoters, setTotalVoters] = useState(0);
    const [voted, setVoted] = useState(0);
    const [status, setStatus] = useState('진행중');
    const [percentage, setPercentage] = useState(0);

    const fetchVoteStatus = async () => {
        try {
        const res = await fetch("http://192.168.56.101:8001/public/votingStatus");
        const raw = await res.text();
        const first = JSON.parse(raw);
        const parsed = typeof first === "string" ? JSON.parse(first) : first;

        const total = parsed.totalVoters;
        const votedCount = parsed.totalVotes;
        const isActive = parsed.isActive;
        const rateRaw = parsed.participationRate;

        const cleaned = (rateRaw || "").replace(/[^0-9.]/g, "");
        const rate = parseFloat(cleaned);

        setTotalVoters(total);
        setVoted(votedCount);
        setStatus(isActive ? "진행중" : "종료됨");
        setPercentage(!isNaN(rate) ? rate : 0);
        } catch (err) {
        console.error("fetch 실패:", err);
        }
    };

    useEffect(() => {
        fetchVoteStatus();
    }, []);

    const handleEndVote = async () => {
    const confirmed = window.confirm("정말로 투표를 종료하시겠습니까?");
    if (!confirmed) return;

    try {
    const res = await fetch("http://192.168.56.101:8001/admin/endVoting", {
    method: 'GET',
    headers: {
        'admin-key': 'admin123'
    }
    });

        const data = await res.json();

        if (res.ok) {
        alert(data.message || "투표가 종료되었습니다.");
        setStatus("종료됨"); // 상태 변경
        } else {
        alert(data.message || "투표 종료 실패");
        }
    } catch (err) {
        console.error("투표 종료 오류:", err);
        alert("오류가 발생했습니다.");
    }
    };

    return (
    <div className="main-layout">
        <Sidebar />
        <div className="realtime-content">
        <div className="realtime-container">
            <h3 className="title">현재 투표 현황
                <button className="refresh-button" onClick={fetchVoteStatus}>🔄</button>
            </h3>
            <div className="status-grid">
            <div className="box">
                <div className="number">{totalVoters}</div>
                <div className="label">등록 유권자</div>
            </div>
            <div className="box">
                <div className="number">{voted}</div>
                <div className="label">투표 완료</div>
            </div>
            <div className="circle-box">
                <svg className="circle-graph" viewBox="0 0 36 36">
                <path className="bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                <path className="progress" strokeDasharray={`${percentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                <text x="18" y="20.35" className="percentage" textAnchor="middle">{percentage}%</text>
                </svg>
                <div className="circle-label">실시간 투표율</div>
            </div>
            <div className="box">
                <div className="status-text">{status}</div>
                <div className="label">투표 상태</div>
            </div>
            </div>
            <button className="end-button" onClick={handleEndVote}>투표 종료</button>
        </div>
        </div>
    </div>
    );
}

export default RealTime;