import { useState } from 'react';

export default function Card({ product, updateCart }) {
    const [productCount, setProductCount] = useState(0);
    const [isAddClicked, setIsAddClicked] = useState(false);

    function handleDefBtnClick() {
        setProductCount(productCount + 1);
        setIsAddClicked(true);
    }

    function handleMinusBtnClick() {
        updateCart(product, 'remove');
        productCount === 1 && setIsAddClicked(false);
        setProductCount(productCount - 1);
    }

    function handlePlusBtnClick() {
        setProductCount(productCount + 1);
        updateCart(product, 'add');
    }

    function getSalePercents(sale, originalPrice) {
        return Math.floor((1 - sale / originalPrice) * 100).toFixed(0) + '%';
    }

    const addBtn = (
        <button className="add-btn flex align-center" onClick={handleDefBtnClick}>
            <span className="btn-label">Add</span>
            <span className="btn-icon flex align-center">+</span>
        </button>
    );

    const counterBtn = (
        <div className="counter-btn flex align-center space-between">
            <button className="minus-btn flex align-center" onClick={handleMinusBtnClick}>
                -
            </button>
            <span className="btn-label">{productCount}</span>
            <button className="plus-btn flex align-center" onClick={handlePlusBtnClick}>
                +
            </button>
        </div>
    );

    const btnToDisplay = isAddClicked ? counterBtn : addBtn;

    return (
        <div className="card flex flex-column">
            <section className="img-container flex">
                {product.sale > 0 && <section className="sale-label">{getSalePercents(product.sale, product.price)}</section>}
                <img src={`${product.imgUrl}`} alt="Product" />
            </section>
            <section className="product-info">
                <div className="prices">
                    <span className="price">${product.price}</span>
                    {product.sale > 0 && <span className="sale">${product.sale}</span>}
                </div>
                <p className="name">{product.name}</p>
                {btnToDisplay}
            </section>
        </div>
    );
}
