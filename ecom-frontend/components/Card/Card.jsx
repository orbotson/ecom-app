import { useState, useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { utilService } from '../../services/util.service.js';

export default function Card({ product, updateCart, currLocale, prevLocale }) {
    const [productCount, setProductCount] = useState(0);
    const [isAddClicked, setIsAddClicked] = useState(false);
    let { t } = useTranslation();

    useEffect(() => {
        console.log('currLocale:', currLocale);
        console.log('prevLocale:', prevLocale);
    }, []);

    const handleDefBtnClick = () => {
        setIsAddClicked(true);
        handlePlusBtnClick();
    };

    const handleMinusBtnClick = () => {
        updateCart(product, 'decrease');
        productCount === 1 && setIsAddClicked(false);
        setProductCount(productCount - 1);
    };

    const handlePlusBtnClick = () => {
        setProductCount(productCount + 1);
        updateCart(product, 'increase');
    };

    const getSalePercents = (sale, originalPrice) => {
        return Math.floor((1 - sale / originalPrice) * 100).toFixed(0) + '%';
    };

    const getProductLocalizedPrice = price => {
        try {
            const convertedPrice = utilService.convertPrice(price, prevLocale.currency, currLocale.currency);
            return utilService.getLocalizedPrice(convertedPrice, currLocale.locale, currLocale.currency);
        } catch (err) {
            console.log('err:', err);
        }
    };

    const addBtn = (
        <button className="add-btn flex align-center" onClick={handleDefBtnClick}>
            <span className="btn-label">{t('common:add')}</span>
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
                {product.sale > 0 && (
                    <section className="sale-label">{getSalePercents(product.sale, product.price)}</section>
                )}
                <img src={`${product.imgUrl}`} alt="Product" />
            </section>
            <section className="product-info">
                <div className="prices">
                    <span className="price">
                        {getProductLocalizedPrice(product.sale > 0 ? product.sale : product.price)}
                    </span>
                    {product.sale > 0 && <span className="sale">{getProductLocalizedPrice(product.price)}</span>}
                </div>
                <p className="name">{product.name}</p>
                {btnToDisplay}
            </section>
        </div>
    );
}
