import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import '../css/ProductsList.css';
import { FaBan } from "react-icons/fa";

const ProductsList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://192.168.56.101:8001/admin/getAllProducts", {
                    method: 'GET',
                    headers: {
                        'admin-key': 'admin123',
                    }
                });

                const raw = await res.text();                
                const parsed = JSON.parse(raw);               
                const data = typeof parsed === "string" ? JSON.parse(parsed) : parsed;

                console.log("최종 데이터:", data);
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    alert("상품 목록이 배열 형식이 아닙니다.");
                    console.warn("예상치 못한 응답 형식", data);
                }
            } catch (err) {
                console.error("상품 목록 불러오기 실패", err);
                alert("네트워크 오류 또는 서버 문제");
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        const confirmed = window.confirm('정말 삭제하시겠습니까?');
        if (!confirmed) return;

        try {
            const res = await fetch(`http://192.168.56.101:8001/admin/deleteProduct?productId=${productId}`, {
                method: 'GET',
                headers: {
                    'admin-key': 'admin123'
                }
            });

            if (res.ok) {
                alert('삭제되었습니다.');
                setProducts((prev) => prev.filter((p) => p.productId !== productId)); 
            } else {
                alert('삭제 실패');
            }
        } catch (err) {
            console.error("삭제 중 오류 발생했습니다.", err);
            alert('오류 발생했습니다.');
        }
    };

    return (
        <div className="producksListPage-container">
            <Sidebar />
            <div className="producksList-wrapper">
                <div className="producksList-card">
                    <h2 className="producksList-title">상품 목록</h2>
                    <table className="producksList-table">
                        <thead>
                            <tr>
                                <th>상품 ID</th>
                                <th>상품명</th>
                                <th>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p.productId}>
                                    <td>{p.productId}</td>
                                    <td>{p.productName}</td>
                                    <td>
                                        <FaBan className="ban-icon" onClick={() => handleDelete(p.productId)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductsList;
