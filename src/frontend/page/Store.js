import React from 'react';
import '../css/Store.css';
import axios from 'axios';

const products = [
  { id: 1, name: '문화상품권', price: 1, image: '/images/문화상품권.jpg' },
  { id: 2, name: '영화관람권', price: 1, image: '/images/영화관람권.jpg' },
  { id: 3, name: '편의점상품권', price: 1, image: '/images/편의점상품권.jpg' },
  { id: 4, name: '배달앱금액권', price: 1, image: '/images/배달앱금액권.jpg' },
  { id: 5, name: '커피교환권', price: 1, image: '/images/커피교환권.jpg' },
  { id: 6, name: '보조배터리', price: 1, image: '/images/보조배터리.jpg' },
  { id: 7, name: '여행용세트', price: 1, image: '/images/여행용세트.jpg' },
  { id: 8, name: '기부', price: 1, image: '/images/기부.png' },
];

function Store() {
  const handlePurchase = async (item) => {
    const voterName = window.prompt("이름을 입력하세요:");
    if (!voterName) return;

    const rrnSuffix = window.prompt("주민번호 뒷자리 7자리를 입력하세요:");
    if (!rrnSuffix) return;

    try {
      const res = await axios.get("http://localhost:8001/voter/purchaseProduct", {
        params: {
          productName: item.name,
          voterName,
          rrnSuffix
        }
      });
      alert(res.data.message); // 구매 성공
    } catch (err) {
      alert(err.response?.data?.error || "구매에 실패했습니다."); // 인증 실패
    }
  };

  return (
    <div className="store-container">
      <h1 className="store-title">TOKEN STORE</h1>

      <div className="store-banner">
        <img src="/images/토큰 배너.png" alt="배너 이미지" />
      </div>

      <div className="product-grid">
        {products.map((item) => (
          <div className="product-card" key={item.id}>
            <img src={item.image} alt={item.name} className="product-image" />
            <div className="product-name">{item.name}</div>
            <div className="product-price">{item.price} Token</div>
            <button className="buy-button" onClick={() => handlePurchase(item)}>
              구매하기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Store;
