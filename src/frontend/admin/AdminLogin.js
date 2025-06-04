import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/AdminLogin.css';


const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const respone = await fetch("http://192.168.56.101:8001/admin/admin-login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'admin-key': password
                }
            });

            const data = await respone.json();

            if (respone.ok) {
                alert('관리자 인증 성공했습니다.');
                navigate('/admin/SystemInit');
            } else {
                alert(data.message || '인증 실패했습니다.');
            }
        } catch (error) {
            console.error('인증 요청 중 오류 발생했습니다.', error);
            alert('오류가 발생했습니다.')
        }
    };

    return (
        <div className="admin-wrapper">
            <div className="admin-card">
                <h2 className="admin-title">관리자 로그인</h2>
                <form onSubmit={handleSubmit}>
                    <div className="admin-input-group">
                        <label className="admin-label">비밀번호</label>
                        <input
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="admin-input"
                        />
                    </div>
                    <button type="submit" className="admin-button">등록하기</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;