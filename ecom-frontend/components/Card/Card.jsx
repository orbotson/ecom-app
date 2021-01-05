import { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { productService } from '../../services/product.service.js';

export default function Card({ product, updateCart, currLocale, prevLocale }) {
    const [productPrice, setProductPrice] = useState(product.price);
    const [productSale, setProductSale] = useState(product.sale);
    const [productCount, setProductCount] = useState(0);
    const [isAddClicked, setIsAddClicked] = useState(false);
    let { t } = useTranslation();

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

    useEffect(() => {
        const getProductLocalizedPrice = () => {
            let convertedPrice, convertedSale, localizedSale;
            if (currLocale.locale !== 'en-US') {
                convertedPrice = productService.convertPrice(product.price, prevLocale.currency, currLocale.currency);
                if (productSale)
                    convertedSale = productService.convertPrice(product.sale, prevLocale.currency, currLocale.currency);
            }
            const localizedPrice = productService.getLocalizedPrice(
                convertedPrice || product.price,
                currLocale.locale,
                currLocale.currency
            );

            if (productSale) {
                localizedSale = productService.getLocalizedPrice(
                    convertedSale || product.sale,
                    currLocale.locale,
                    currLocale.currency
                );
                setProductSale(localizedSale);
            }
            setProductPrice(localizedPrice);
        };
        getProductLocalizedPrice();
    }, [currLocale]);

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
                    <span className="price">{productPrice}</span>
                    {product.sale > 0 && <span className="sale">{productPrice}</span>}
                </div>
                <p className="name">{product.name}</p>
                {btnToDisplay}
            </section>
        </div>
    );
}
