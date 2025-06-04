import React from "react";
import Sidebar from "./Sidebar";
import '../css/SystemInit.css';

const SystemInit = ({ selected = "system", onSelect = () => {} }) => {
    const handleInit = async () => {
        try {
            const respone = await fetch("http://192.168.56.101:8001/admin/init", {
                method: 'GET',
                headers: {
                    'admin-key' : 'admin123'
                }
            });

            const result = await respone.json();

            if (respone.ok) {
                alert("시스템 초기화가 완료되었습니다.");
            } else {
                alert(result.message || "초기화에 실패했습니다.");
            }
        } catch (error) {
            console.error("초기화 중 오류 발생: ", error);
            alert("초기화 요청 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="init-page-container">
            <Sidebar selected={selected} onSelect={onSelect} />
            <div className="init-content">
                <div className="init-card">
                    <h2 className="init-title">시스템 초기화</h2>
                    <p className="init-description">📌투표 시스템을 초기화합니다. (최초의 1회만 실행)</p>
                    <button className="init-button" onClick={handleInit}>시스템 초기화</button>
                </div>
            </div>
        </div>
    );
};

export default SystemInit;