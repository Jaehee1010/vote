import React, { useState } from 'react';
import '../css/Store.css';

const products = [
  { id: 1, name: '주먹밥', price: 1, image: '/images/김문수프로필.png' },
  { id: 2, name: '아이스 아메리카노', price: 2, image: '/images/coffee.png' },
  { id: 3, name: '편의점 상품권', price: 3, image: '/images/giftcard.png' },
  { id: 4, name: '햄버거 세트', price: 5, image: '/images/burger.png' },
  { id: 5, name: '도넛', price: 1, image: '/images/김문수프로필.png' },
  { id: 6, name: '피자 한 판', price: 8, image: '/images/pizza.png' },
  { id: 7, name: '치킨 세트', price: 10, image: '/images/chicken.png' },
  { id: 8, name: '과일 바구니', price: 6, image: '/images/fruit.png' },
  { id: 9, name: '스낵', price: 1, image: '/images/snack.png' },
  { id: 10, name: '에너지바', price: 2, image: '/images/energybar.png' },
];

const ITEMS_PER_PAGE = 8;

function Store() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const currentItems = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePurchase = (item) => {
    alert(`${item.name} (${item.price} Token) 구매 완료!`);
  };

  return (
    <div className="store-container">
      <h1 className="store-title">TOKEN STORE</h1>
      <div className="banner-placeholder"></div>

      <div className="product-grid">
        {currentItems.map((item) => (
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

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Store;
