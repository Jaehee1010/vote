import React, { useState } from "react";
import '../css/SignUp.css';

const SignUp = () => {
  const [candidateId, setCandidateId] = useState("");
  const [partyName, setPartyName] = useState("");
  const [name, setName] = useState("");

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

    const SignUpData = { candidateId, partyName, name };
    console.log("서버에 전송할 JSON 데이터:", JSON.stringify(SignUpData));

    try {
      const response = await fetch("http://localhost:8080/api/SignUp", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(SignUpData),
      });

      const data = await response.json();
      if (data.success) {
        alert("후보자 등록 성공했습니다.");
      } else {
        alert(`${name} 후보자는 이미 등록된 후보자입니다.`);
      }
    } catch (err) {
      console.error(err);
      alert("서버와 연결할 수 없습니다.");
    }
  };

    return (
        <div className="register-page">
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

export default SignUp;
