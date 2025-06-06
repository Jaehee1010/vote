import React, { useState } from "react";
import { FaDownload, FaSearch } from "react-icons/fa";

import "../css/Pledge.css";

const Pledge = () => {
    const candidate = [
        {
        number: "기호 1번",
        name: "이재명",
        party: "더불어민주당",
        birth: "1964년 12월 22일",
        job: "국회의원(제22대 계양구을)",
        education: "중앙대학교 법과대학 법학과 졸업",
        career: "(전)경기도지사,(전)더불어민주당 당대표",
        image: "/images/이재명프로필.png",
        pdf: "/pdfs/이재명10대공약.pdf",
        banner: "/images/이재명 배너.png",
        pledges: [
            "1. [경제·산업] 세계를 선도하는 경제 강국을 만들겠습니다.",
            "2. [정치·사법] 내란극복과 K-민주주의 위상 회복으로 민주주의 강국을 만들겠습니다.",
            "3. [경제·산업] 가계·소상공인의 활력을 증진하고, 공정경제를 실현하겠습니다.",
            "4. [외교·통상] 세계질서 변화에 실용적으로 대처하는 외교안보 강국을 만들겠습니다.",
            "5. [사법·행정·보건의료] 국민의 생명과 안전을 지키는 나라를 만들겠습니다.",
            "6. [행정 ·경제 ·산업] 세종 행정수도와 ‘5극 3특’ 추진으로 국토균형발전을 이루겠습니다.",
            "7. [교육·경제·복지] 노동이 존중받고 모든 사람의 권리가 보장되는 사회를 만들겠습니다.",
            "8. [경제·복지] 생활안정으로 아동·청년·어르신 등 모두가 잘사는 나라를 만들겠습니다.",
            "9. [교육·복지] 저출생·고령화 위기를 극복하고 아이부터 어르신까지 함께 돌보는 국가를 만들겠습니다.",
            "10. [환경·산업] 미래세대를 위해 기후위기에 적극 대응하겠습니다.",
        ],
        },
        {
        number: "기호 2번",
        name: "김문수",
        party: "국민의힘",
        birth: "1951년 08월 27일",
        job: "정당인",
        education: "서울대학교 경영학과 졸업",
        career: "(전)경기도지사(민선4기, 5기),(전)고용노동부장관",
        image: "/images/김문수프로필.png",
        pdf: "/pdfs/김문수10대공약.pdf",
        banner: "/images/김문수 배너.png",
        pledges: [
            "1. [재정·경제·복지·국방·통일·외교통상·산업자원·건설교통] 자유 주도 성장, 기업하기 좋은 나라",
            "2. [재정·경제·복지·교육·인적자원·산업자원·건설교통·과학기술·정보통신] AI·에너지 3대 강국 도약",
            "3. [재정·경제·복지·교육·인적자원·산업자원·건설교통] 청년이 크는 나라, 미래가 열리는 대한민국",
            "4. [재정·경제·복지·산업자원·건설교통] GTX로 연결되는 나라, 함께 크는 대한민국",
            "5. [재정·경제·복지·산업자원·건설교통] 중산층 자산증식, 기회의 나라",
            "6. [재정·경제·복지·교육·인적자원·보건의료·환경·산업자원·건설교통] 아이 낳고 기르기 좋은 나라, 안심되는 평생복지",
            "7. [재정·경제·복지] 소상공인, 민생이 살아나는 서민경제",
            "8. [정치·행정·사법·보건의료·환경] 재난에 강한 나라, 국민을 지키는 대한민국",
            "9. [정치·행정·사법·국방·통일·외교통상] 특권을 끊는 정부, 신뢰를 세우는 나라",
            "10. [국방·통일·외교통상] 북핵을 이기는 힘, 튼튼한 국가안보",
        ],
        },
        {
        number: "기호 4번",
        name: "이준석",
        party: "개혁신당",
        birth: "1985년 03월 31일",
        job: "국회의원",
        education:
            "하버드대학교 Computer Science / Economics AB 졸업(2003.9 ~ 2007.6)",
        career: "(전)개혁신당 당대표,(현)개혁신당 국회의원",
        image: "/images/이준석프로필.png",
        pdf: "/pdfs/이준석10대공약.pdf",
        banner: "/images/이준석 배너.png",
        pledges: [
            "1. [행정] 대통령 힘빼고 일 잘하는 정부 만든다",
            "2. [산업자원] 중국 베트남 공장을 다시 대한민국으로",
            "3. [조세 지방자치] 지자체, 법인세 자치권 부여로 지방 경쟁력 강화!",
            "4. [경제 지방자치] 최저임금 최종 결정 권한 지자체에 위임",
            "5. [사회복지] 국민연금, 신-구 연금 분리가 유일한 해결책",
            "6. [교육] 교권 보호를 위한 교사 소송 국가책임제 및 학습지도실 제도 도입",
            "7. [사회적 경제] 5천만원 한도 든든출발자금으로 청년의 도전 응원!",
            "8. [국방] 현역대상자 가운데 장교 선발한다",
            "9. [산업자원규제혁파] 압도적 규제 혁파 위한 ‘규제기준국가제’실시",
            "10. [과학기술 연구환경] ‘과학기술 성과연금’ 및 ‘과학자 패스트트랙’ 등 「국가과학영웅 우대제도」 도입",
        ],
        },
        {
        number: "기호 5번",
        name: "권영국",
        party: "민주노동당",
        birth: "1963년 08월 15일",
        job: "정당인",
        education: "서울대학교 공과대학 금속공과 졸업",
        career: "(현)민주노동당 대표,(전)민주사회를 위한 변호사모임 노동위원장",
        image: "/images/권영국프로필.png",
        pdf: "/pdfs/권영국10대공약.pdf",
        banner: "/images/권영국 배너.png",
        pledges: [
            "1. [재정·경제·복지] 증세를 통한 불평등 해소",
            "2. [기타(노동)·재정·경제·복지] 모든 일하는 사람을 위한 노동권과 사회안전망",
            "3. [재정·경제·복지] 불평등을 넘어 함께 사는 경제구조",
            "4. [교육·인적자원·기타(사회안전)] 차별 없고 안전한 공존 사회",
            "5. [보건의료·환경] 기후정의 확립으로 생태평등 사회로의 전환",
            "6. [산업지원·건설교통·재정·경제·복지] 세입자를 위한 주거 부동산 정책",
            "7. [정치·행정·사법] 더 많은 민주주의를 위한 개헌",
            "8. [보건의료·환경·재정·경제·복지] 요람에서 무덤까지 전국민 돌봄시대",
            "9. [교육·문화·인적자원·스포츠] 경쟁이 아닌 행복의 교육으로",
            "10. [국방·통일·외교통상] 지뢰밭을 철길로, 평화와 주권",
        ],
        },
        {
        number: "기호 7번",
        name: "황교안",
        party: "무소속",
        birth: "1957년 04월 15일",
        job: "정치인",
        education: "성균관대학교 대학원 법학과 졸업(법학석사)",
        career: "(전)자유한국당 대표,(전)국무총리",
        image: "/images/황교안프로필.png",
        pdf: "/pdfs/황교안10대공약.pdf",
        banner: "/images/황교안 배너.png",
        pledges: [
            "1. [정치·행정·사법] 부정선거 척결",
            "2. [정치·행정·사법] 반국가 세력 척결",
            "3. [산업자원·건설교통] ‘강소기업 천국 코리아’ 로 희망 경제",
            "4. [재정·경제·복지] ‘깜놀 10억 창업배틀 365’ 로 창업 지원",
            "5. [과학기술·정보통신] ‘초일류 정상국가’ 프로젝트- AI·로봇·양자컴퓨터 강국 도약",
            "6. [국방·통일·외교통상] 국가안보 체계 전면 재정비",
            "7. [정치·행정·사법] 마약 청정국 지위 회복",
            "8. [재정·경제·복지] 둘째 출산 2억 드림 등",
            "9. [교육·인적자원] 내국인 우선 및 끊어진 청년 희망 사다리 구축",
            "10. [국방·통일·외교통상] 자유통일 국가 비전 달성",
        ],
        },
        {
        number: "기호 8번",
        name: "송진호",
        party: "무소속",
        birth: "1968년 03월 28일",
        job: "사단법인 글로벌데이터자산공제회 이사장",
        education: "전주해성고등학교 졸업",
        career:
            "(현)사단법인 한국사회경제연구소 이사장,(현)사단법인 독도수호연합회 총재",
        image: "/images/송진호프로필.png",
        pdf: "/pdfs/송진호10대공약.pdf",
        banner: "/images/송진호 배너.png",
        pledges: [
            "1. [과학기술 정보통신] 가상자산 산업 활성화 및 투자자 1,560만 명 구제",
            "2. [산업자원 건설교통] 무너진 건설경기 활성화",
            "3. [교육 인적자원] 청년의 미래를 국가가 함께 만듭니다",
            "4. [교육 인적자원] 꿈과 재능이 꽃피는 교육으로 전환",
            "5. [문화예술] 문화강국 대한민국, K-컬처 세계화 및 체육문화인 복리 증진",
            "6. [재정 경제 복지] 자유경제국가 정착, 다문화가정 및 외국인근로자 차별 편견 금지",
            "7. [통일외교] 남북평화통일, 선 경제/문화통일, 후 단일국가 평화통일",
            "8. [재정경제] 시장경제 회복, 서민경제·금융위상 제고 목표",
            "9. [정치행정] 국토균형개발 - 수도권 과밀 해소, 지역격차 해소",
            "10. [정치] 열린정치, 공감정치 실현",
        ],
        },
    ];

    const [selected, setSelected] = useState(candidate[1]);

    return (
        <div className="list-container">
        <div className="top-section">
            <div className="candidate-list-container">
            <div className="candidate-title">후보자 명단</div>
            <div className="candidate-list">
                {candidate.map((c, idx) => (
                <div
                    key={idx}
                    className={`candidate-item ${
                    selected.name === c.name ? "active" : ""
                    }`}
                    onClick={() => setSelected(c)}
                >
                    {c.name}
                </div>
                ))}
            </div>
            </div>
            <div className="candidate-banner">
            <img src={selected.banner} alt={selected.banner} />
            </div>
        </div>

        <div className="bottom-content">
            <div className="candidate-info-wrapper">
            <div className="profile-section">
                <img
                src={selected.image}
                alt={selected.name}
                className="profile-image"
                />
                <div className="profile-text">
                <p>
                    <strong>후보자:</strong> {selected.number} {selected.name}
                </p>
                <p>
                    <strong>출생:</strong> {selected.birth}
                </p>
                <p>
                    <strong>직업:</strong> {selected.job}
                </p>
                <p>
                    <strong>학력:</strong> {selected.education}
                </p>
                <p>
                    <strong>경력:</strong> {selected.career}
                </p>
                </div>
            </div>

            <div className="pledge-section">
                <div className="pledge-section-top">
                <h2>10대 공약 목록</h2>
                <div className="pdf-buttons">
                    <a
                    href={selected.pdf}
                    className="download-button"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <FaSearch style={{ marginRight: "6px" }} />
                    미리보기
                    </a>
                    <a
                    href={selected.pdf}
                    className="download-button"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <FaDownload size={16} />
                    공약 다운 파일 PDF
                    </a>
                </div>
                </div>
                <ul>
                {selected.pledges.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
                </ul>
            </div>
            </div>
        </div>
    </div>
    );
};

export default Pledge;
