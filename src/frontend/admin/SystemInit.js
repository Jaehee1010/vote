import React, { useState } from "react";
import Sidebar from "./Sidebar";
import '../css/SystemInit.css';

const SystemInit = ({ selected = "system", onSelect = () => {} }) => {
    const [startHour, setStartHour] = useState('');
    const [startMinute, setStartMinute] = useState('');
    const [endHour, setEndHour] = useState('');
    const [endMinute, setEndMinute] = useState('');

    const handleInit = async () => {
        try {
            const now = new Date();
            const start = new Date(now);
            const end = new Date(now);

            start.setHours(Number(startHour), Number(startMinute), 0, 0);
            end.setHours(Number(endHour), Number(endMinute), 0, 0);

            if (isNaN(start) || isNaN(end)) {
                alert('시작 시간과 종료 시간을 정확히 입력하세요.');
                return;
            }

            if (end <= start) {
                alert('종료 시간은 시작 시간보다 늦어야 합니다.');
                return;
            }

            const diffMinutes = Math.round((end - start) / 60000);

            const payload = {
                durationMinutes: diffMinutes,
            };

            const res = await fetch('http://192.168.56.101:8001/admin/init', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'admin-key': 'admin123',
                },
                body: JSON.stringify(payload)
            });

            const result = await res.json();
            if (res.ok) {
                alert(result.message || "시스템 초기화 완료했습니다.");
            } else {
                alert(result.message || "초기화 실패했습니다.");
            }
        } catch (err) {
            console.error("초기화 중 오류 발생했습니다.", err);
            alert("초기화 요청 중 오류 발생했습니다.");
        }
    };

    return (
        <div className="init-page-container">
            <Sidebar selected={selected} onSelect={onSelect} />
            <div className="init-content">
                <div className="init-card">
                    <h2 className="init-title">시스템 초기화</h2>
                    <p className="init-description">📌투표 시스템을 초기화합니다. (최초의 1회만 실행)</p>
                        <div className="time-range-inputs">
                            <div className="time-row">
                                <label className="time-label-title">시작 시간:</label>
                                <input
                                type="number"
                                className="time-input"
                                placeholder="시"
                                min="0"
                                max="23"
                                value={startHour}
                                onChange={(e) => setStartHour(e.target.value)}
                                />
                                <span className="time-label">시</span>
                                <input
                                type="number"
                                className="time-input"
                                placeholder="분"
                                min="0"
                                max="59"
                                value={startMinute}
                                onChange={(e) => setStartMinute(e.target.value)}
                                />
                                <span className="time-label">분</span>
                            </div>

                            <div className="time-row">
                                <label className="time-label-title">종료 시간:</label>
                                <input
                                type="number"
                                className="time-input"
                                placeholder="시"
                                min="0"
                                max="23"
                                value={endHour}
                                onChange={(e) => setEndHour(e.target.value)}
                                />
                                <span className="time-label">시</span>
                                <input
                                type="number"
                                className="time-input"
                                placeholder="분"
                                min="0"
                                max="59"
                                value={endMinute}
                                onChange={(e) => setEndMinute(e.target.value)}
                                />
                                <span className="time-label">분</span>
                            </div>
                        </div>
                    <button className="init-button" onClick={handleInit}>시스템 초기화</button>
                </div>
            </div>
        </div>
    );
};

export default SystemInit;
