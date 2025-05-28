import React, {useEffect, useState} from "react";
import { FaBan } from "react-icons/fa";
import '../css/SignUpList.css'

const SignUpList = () => {
    const [list, setList] = useState([]);

    const handleSignUpList = async (e) => {
        try {
            const response = await fetch("http://localhost:8080/api/SignUpList", {
                method: 'GET',
            });
            const data = await response.json();
            console.log(data);
            setList(data);
        } catch (err) {
            console.error("후보자 목록 불러오기 실패했습니다.", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/SignUpDelete/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert("삭제가 정상적으로 완료되었습니다.");
                handleSignUpList();
            } else {
                alert("삭제가 정상적으로 처리되지 않았습니다.");
            }
        } catch (error) {
            console.error("삭제 중 오류 발생했습니다.", error);
            alert("서버 오류로 삭제 실패했습니다.");
        }
    };

    useEffect(() => {
        handleSignUpList();
    }, []);

    return (
        <div className="signUpList-container">
            <div className="signUpList-card">
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
                        {list.map((c, index) => (
                            <tr key ={index}>
                                <td>{c.number}</td>
                                <td>{c.party}</td>
                                <td>{c.name}</td>
                                <td>
                                    <FaBan
                                        className="ban-icon"
                                        onClick={() => handleDelete(c.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SignUpList;