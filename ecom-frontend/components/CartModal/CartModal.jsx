import Link from 'next/link';
import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { utilService } from '../../services/util.service.js';

export default function CartModal({ cart, updateCart, closeModal }) {
    // const [modalStyle, setModalStyle] = useState({ ...style });

    // const onCloseModal = () => {
    //     document.body.style.overflowY = 'auto';
    //     // setIsCartClicked(false);
    //     setModalStyle({
    //         transform: 'translateY(100%) translateY(100px) translateX(-50%)',
    //         opacity: 0,
    //         visibility: 'hidden',
    //     });
    // };

    const getFinalPrice = () => {
        const price = utilService.getPriceDetails(cart).finalPrice;
        return price.toFixed(2);
    };

    const renderProducts = () => {
        return cart.map(product => {
            const { amount, price, priceBy, name, _id, imgUrl } = product;
            return (
                <section className="product flex align-center justify-center" key={_id}>
                    <div className="amount-btns flex flex-column align-center">
                        <button className="plus-btn">+</button>
                        <span className="amount">{amount}</span>
                        <button className="minus-btn">-</button>
                    </div>
                    <div className="img-container">
                        <img src={imgUrl} alt="Product" />
                    </div>
                    <div className="product-info flex flex-column">
                        <span className="name">{name}</span>
                        <span className="unit-price">${price}</span>
                        <span className="price-details">{`${amount} X ${price} ${priceBy}`}</span>
                    </div>
                    <span className="price">${price * amount}</span>
                    <span className="remove-btn">X</span>
                </section>
            );
        });
    };

    return (
        <div className="cart-modal flex flex-column">
            <button className="close-modal-btn flex justify-center align-center" onClick={closeModal}>
                <IoCloseOutline />
            </button>
            <div className="modal-content flex flex-column">
                <header className="flex aling-center justify-center">
                    <img className="icon" src="images/shopping-cart-green.svg" />
                    <span className="flex align-center">{cart.length} Item</span>
                </header>
                <main className="products-container">
                    {cart.length > 0 ? (
                        renderProducts()
                    ) : (
                        <span className="no-products flex flex-column align-center justify-center">
                            <img src="/images/error.svg" alt="Empty Cart" />
                            <span className="msg">No products found</span>
                        </span>
                    )}
                </main>
                <span className="voucher">Do you have a voucher?</span>
                <Link className="checkout-btn-container" href="/checkout">
                    <button className="checkout-btn flex space-between" onClick={closeModal}>
                        <span className="self-center">Checkout</span>
                        <span className="total-price flex align-center">${getFinalPrice()}</span>
                    </button>
                </Link>
            </div>
        </div>
    );
}
