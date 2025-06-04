import React, { useState } from 'react';
import Sidebar from './Sidebar';
import '../css/RegisterCandidate.css';

const RegisterCandidate = () => {
    const [candidateId, setCandidateId] = useState('');
    const [partyName, setPartyName] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        let message = "";

        if (!candidateId.trim()) {
            message += "후보자 기호 번호를 입력해주세요\n";
        } else if (!/^\d+$/.test(candidateId.trim())) {
            message += "기호 번호는 숫자만 입력해주세요.\n";
        }

        if (!partyName.trim()) {
        message += "소속정당명을 입력해주세요.\n";
        } else if (!/^[가-힣]{2,10}$/.test(partyName.trim())) {
        message += "소속정당명을 입력해주세요. (한글 2~10자)\n";
        }

        if (!name.trim()) {
        message += "후보자 이름을 입력해주세요.\n";
        } else if (!/^[가-힣]{2,10}$/.test(name.trim())) {
        message += "후보자 이름을 입력해주세요. (한글 2~10자)\n";
        }

        if (message) {
        alert(message);
        return;
        }

        const candidateData = { candidateId, partyName, name };

        try {
            const response = await fetch("http://192.168.56.101:8001/admin/registerCandidate", {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'admin-key': 'admin123'
                },
                body: JSON.stringify(candidateData),
            });

            const data = await response.json();
            if (response.ok) {
                alert("후보자 등록 성공했습니다.");
            } else {
                alert("후보자 등록 실패했습니다. " + data.message);
            }
        } catch (err) {
            console.error(err);
            alert("서버와 연결할 수 없습니다.");
        }
    };

    return (
        <div className="register-page">
            <Sidebar />
            <div className="register-form-container">
                <div className="register-card">
                    <h2 className="register-title">후보자 등록</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="register-form-group">
                            <label className="register-label">기호 번호</label>
                            <input
                            type="text"
                            placeholder="기호 번호를 입력해주세요."
                            value={candidateId}
                            onChange={(e) => setCandidateId(e.target.value)}
                            required
                            className="register-input"
                            />
                        </div>
                        <div className="register-form-group">
                            <label className="register-label">소속정당명</label>
                            <input
                            type="text"
                            placeholder="소속정당명을 입력해주세요."
                            value={partyName}
                            onChange={(e) => setPartyName(e.target.value)}
                            required
                            className="register-input"
                            /> 
                        </div>
                        <div className="register-form-group">
                            <label className="register-label">후보자 이름</label>
                            <input
                            type="text"
                            placeholder="후보자 이름을 입력해주세요."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="register-input"
                            />
                        </div>
                        <button type="submit" className='register-button'>등록하기</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterCandidate;