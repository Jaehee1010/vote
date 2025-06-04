import React, { use, useState }from "react";
import '../css/SignUp.css'
import { useNavigate } from "react-router-dom";


const Voter = () => {
    const [name, setName] = useState("");
    const [resident, setResident] = useState("");
    const [addr, setAddr] = useState("");
    const navigate = useNavigate();

    const openPostcode = () => {
        new window.daum.Postcode({
            oncomplete: (data) => {
                setAddr(data.address);
            },
        }).open();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let message = "";

        if (!name.trim()) {
            message += "이름을 입력해주세요.\n";
        } else if (!/^[가-힣]{2,10}$/.test(name.trim())) {
            message += "주민등록증에 있는 이름을 입력해주세요. (한글 2~10자)\n";
        }

        if (!resident.trim()) {
            message += "주민등록번호를 입력해주세요.\n"
        } else if (!resident.includes("-")) {
            message += "주민등록번호에 '-'를 포함해서 입력해주세요. 예: 123456-1234567\n";
        }

        if (!addr.trim()) {
            message += "주소를 입력해주세요.\n";
        }

        if (message) {
            alert(message);
            return;
        }

        
        const VoterData = {
            name,
            rrnSuffix: resident.split("-")[1],
            addr,
        };

        console.log("서버에 전송할 JSON 데이터:", JSON.stringify(VoterData));
        try {
            const response = await fetch("http://192.168.56.101:8001/voter/registerVoter", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify(VoterData),
        });

        const data = await response.json();
        if (response.ok && data.success) {
            alert("유권자 등록 성공했습니다.");
            navigate("/Vote");
        } else {
            const errorMessage = data.error || data.message || "";
            const match = errorMessage.match(/유권자\s(.+?)[는은이]/);

            if (match && match[1]) {
                alert(`유권자 ${match[1]}은 이미 등록되어 있습니다.`);
            } else {
                alert("유권자 등록에 실패했습니다.");
            }
        }
    } catch (err) {
        console.error(err);
        alert("서버와 연결할 수 없습니다.");
    }
}

return(
    <div className="signUp-container">
        <div className="signUp-card">
            <h1 className="signUp-title">유권자 등록</h1>
            <form onSubmit={handleSubmit}>
                <div className="signUp-form">
                    <label className="signUp-label">이름</label>
                    <input 
                        type="text"
                        placeholder="이름을 입력해주세요."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="signUp-input"
                    />
                </div>
                <div className="signUp-form">
                    <label className="signUp-label">주민등록번호</label>
                    <input 
                        type="text"
                        placeholder="주민등록번호를 - 포함해서 입력해주세요."
                        value={resident}
                        onChange={(e) => setResident(e.target.value)}
                        className="signUp-input"
                    />
                </div>
                <div className="signUp-form">
                    <label className="signUp-label">주소</label>
                    <input 
                        type="text"
                        placeholder="주소를 입력해주세요."
                        value={addr}
                        onClick={openPostcode}
                        readOnly
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

export default Voter;


