import React, { useState } from 'react';
import Sidebar from './Sidebar';
import '../css/Products.css';

const Products = () => {
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        let message = "";

        if (!productId.trim()) {
            message += "상품 ID를 입력해주세요.\n";
        } else if (!/^\d+$/.test(productId.trim())) {
            message += "상품 ID는 숫자만 입력해주세요.\n";
        }

        if (!productName.trim()) {
            message += "상품명을 입력해주세요.\n";
        } else if (!/^[가-힣a-zA-Z0-9\s]{2,30}$/.test(productName.trim())) {
            message += "상품명은 2~30자의 한글, 영문, 숫자, 공백만 허용됩니다.\n";
        }

        if (message) {
            alert(message);
            return;
        }

        const productData = { productId, productName };

        try {
            const response = await fetch("http://192.168.56.101:8001/admin/registerProduct", {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'admin-key': 'admin123'
                },
                body: JSON.stringify(productData),
            });

            const data = await response.json();
            if (response.ok) {
                alert("상품 등록에 성공했습니다.");
            } else {
                alert("상품 등록에 실패했습니다: " + data.message);
            }
        } catch (err) {
            console.error(err);
            alert("서버와 연결할 수 없습니다.");
        }
    };

    return (
        <div className="producks-page">
            <Sidebar />
            <div className="producks-form-container">
                <div className="producks-card">
                    <h2 className="producks-title">상품 등록</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="producks-form-group">
                            <label className="producks-label">상품 ID</label>
                            <input
                                type="text"
                                placeholder="상품 ID를 입력해주세요."
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                                required
                                className="producks-input"
                            />
                        </div>
                        <div className="producks-form-group">
                            <label className="producks-label">상품명</label>
                            <input
                                type="text"
                                placeholder="상품명을 입력해주세요."
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                required
                                className="producks-input"
                            />
                        </div>
                        <button type="submit" className='producks-button'>등록하기</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Products;
