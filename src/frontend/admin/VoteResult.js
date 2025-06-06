import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../css/VoteResult.css';
import Sidebar from './Sidebar';

ChartJS.register(ArcElement, Tooltip, Legend);

const VoteResult = () => {
    const [results, setResults] = useState(null);

    useEffect(() => {
        const fetchVoteResults = async () => {
        try {
            const response = await fetch('http://192.168.56.101:8001/public/votingStatus');
            const raw = await response.text();
            const parsed = JSON.parse(raw);
            const data = typeof parsed === 'string' ? JSON.parse(parsed) : parsed;

            console.log('✅ 파싱된 투표 결과:', data);
            if (data && Array.isArray(data.candidates)) {
            setResults(data.candidates);
            } else {
            console.warn('❌ candidates가 배열이 아닙니다:', data.candidates);
            setResults([]);
            }
        } catch (error) {
            console.error('❌ 투표 결과 불러오기 실패:', error);
            setResults([]);
        }
        };

        fetchVoteResults();
    }, []);

    if (results === null) return <div>결과 불러오는 중...</div>;
    if (results.length === 0) return <div>표를 집계할 데이터가 없습니다.</div>;

    const labels = results.map(r => `${r.id}번 ${r.name}`);
    const dataValues = results.map(r => parseFloat(r.votePercentage));
    const backgroundColors = ['#FF3B30', '#007AFF', '#FFD60A', '#A2845E', '#9B59B6', '#BDC3C7'];

    const data = {
        labels,
        datasets: [
        {
            data: dataValues,
            backgroundColor: backgroundColors,
            borderWidth: 1,
        },
        ],
    };

    return (
        <div className="vote-result-page">
        <Sidebar />

        <div className="vote-result-container">
            <div className="vote-card">
            <h2 className="vote-title">투표 현황 조회</h2>
            <div className="vote-chart">
                <Doughnut
                    data={data}
                    options={{
                    plugins: {
                        legend: {
                        position: 'top',
                        labels: {
                            boxWidth: 20,
                            padding: 10,
                        }
                        }
                    }
                    }}
                />
            </div>
            <div className="vote-summary">
                {results.map((r, idx) => (
                <div key={idx}>
                    {idx + 1}위 : 기호 {r.id}번 {r.name} - {r.voteCount.toLocaleString()}표 ({r.votePercentage}%)
                </div>
                ))}
            </div>
            </div>
        </div>
        </div>
    );
};

export default VoteResult;
