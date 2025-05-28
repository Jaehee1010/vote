import React, { useState }from "react";
import '../css/SignUp.css'


const SignUp = () => {
    const [number, setNumber] = useState("");
    const [party, setParty] = useState("");
    const [name, setName] = useState("");

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        let message = "";

        if (!number.trim()) {
            message += "후보자 기호 번호를 입력해주세요\n";
        } else if (!/^\d+$/.test(number.trim())) {
            message += "기호 번호는 숫자만 입력해주세요.\n";
        }

        if (!party.trim()) {
            message += "소속정당명을 입력해주세요.\n";
        } else if (!/^[가-힣]{2,10}$/.test(party.trim())) {
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

        const SignUpData = {
            number,
            party,
            name,
        };

        console.log("서버에 전송할 JSON 데이터:", JSON.stringify(SignUpData));
        try {
            const response = await fetch("http://localhost:8080/api/SignUp", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify(SignUpData),
        });

        const data = await response.json();
        if (data.success){
            alert("후보자 등록 성공했습니다.");
        } else {
            alert("후보자 등록 실패했습니다. " + data.message);
        }
    } catch (err) {
        console.error(err);
        alert("서버와 연결할 수 없습니다.")
    }
};
return(
    <div className="signUp-container">
        <div className="signUp-card">
            <h1 className="signUp-title">후보자 등록</h1>
            <form onSubmit={handleSubmit}>
                <div className="signUp-form">
                    <label className="signUp-label">기호 번호</label>
                    <input 
                        type="text"
                        placeholder="기호 번호를 입력해주세요."
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="signUp-input"
                    />
                </div>
                <div className="signUp-form">
                    <label className="signUp-label">소속정당명</label>
                    <input 
                        type="text"
                        placeholder="소속정당명을 입력해주세요."
                        value={party}
                        onChange={(e) => setParty(e.target.value)}
                        className="signUp-input"
                    />
                </div>
                <div className="signUp-form">
                    <label className="signUp-label">후보자 이름</label>
                    <input 
                        type="text"
                        placeholder="후보자 이름을 입력해주세요."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="signUp-input"
                    />
                </div>
                <button type="submit" className="signUp-button">
                    등록하기
                </button>
            </form>
        </div>
    </div>
    );
};

export default SignUp;


