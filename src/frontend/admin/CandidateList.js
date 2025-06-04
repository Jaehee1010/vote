import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar'
import '../css/CandidateList.css';
import { FaBan } from "react-icons/fa";

const CandidateList = () => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const fetchCandidates = async () => {
        try {
            const res = await fetch("http://192.168.56.101:8001/admin/getAllCandidates", {
            method: 'GET',
                headers: {
                'admin-key': 'admin123',
            }
        });

        const raw = await res.text();                
        const parsed = JSON.parse(raw);               
        const data = typeof parsed === "string"       
            ? JSON.parse(parsed)
            : parsed;

        console.log("최종 데이터:", data);
        console.log("Array.isArray(data):", Array.isArray(data));

        if (Array.isArray(data)) {
            setCandidates(data);
        } else {
            alert("후보자 목록이 배열 형식이 아닙니다.");
            console.warn("예상치 못한 응답 형식", data);
        }
        } catch (err) {
        console.error("후보자 목록 불러오기 실패", err);
        alert("네트워크 오류 또는 서버 문제");
        }
    };

    fetchCandidates();
}, []);

    const handleDelete = async (candidateId) => {
        const confirmed = window.confirm('정말 삭제하시겠습니까?');
        if (!confirmed) return;

        try {
        const res = await fetch(`http://192.168.56.101:8001/admin/deleteCandidate?candidateId=${candidateId}`, {
            method: 'GET',
            headers: {
            'admin-key': 'admin123'
            }
        });

        if (res.ok) {
            alert('삭제되었습니다.');
            setCandidates((prev) => prev.filter((c) => c.id !== candidateId)); 
        } else {
            alert('삭제 실패');
        }
        } catch (err) {
        console.error("삭제 중 오류 발생했습니다.", err);
        alert('오류 발생했습니다.');
        }
    };

    return (
        <div className="page-container">
            <Sidebar />
            <div className="signUpList-wrapper">
                <h2 className="signUpList-title">후보자 목록</h2>
            <table className="signUpList-table">
                <thead>
                    <tr>
                    <th>기호 번호</th>
                    <th>소속정당명</th>
                    <th>후보자 이름</th>
                    <th>등록 취소</th>
                    </tr>
                </thead>
            <tbody>
                {candidates.map((c) => (
                    <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.partyName}</td>
                    <td>{c.name}</td>
                    <td>
                        <FaBan className="ban-icon" onClick={() => handleDelete(c.id)} />
                    </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
    );
};

export default CandidateList;