import { useContext, useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import { ProductContext } from '../store/contexts/ProductContext';
import { UserContext } from '../store/contexts/UserContext';
import { utilService } from '../services/util.service';
import Slider from '../components/Slider/Slider';
import MultiModal from '../components/MultiModal/MultiModal';
import DarkScreen from '../components/DarkScreen/DarkScreen';

export default function Checkout() {
    const { shoppingCart } = useContext(ProductContext);
    const { loggedInUser } = useContext(UserContext);
    const [prices, setPrices] = useState({});
    const [modalToDisplay, setModalToDisplay] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModalData, setEditModalData] = useState(null);

    const deliveryOptions = [
        {
            label: '8am-11am',
            txt: '8.00 AM - 11.00 AM',
        },
        {
            label: '11am-2pm',
            txt: '11.00 AM - 2.00 PM',
        },
        {
            label: '2pm-5pm',
            txt: '2.00 PM - 5.00 PM',
        },
        {
            label: '5pm-8pm',
            txt: '5.00 PM - 8.00 PM',
        },
        {
            label: 'Next Day',
            txt: 'Next Day',
        },
    ];

    useEffect(() => {
        setPrices(utilService.getPriceDetails(shoppingCart));
    }, []);

    const renderShoppingCart = () => {
        return shoppingCart.length > 0 ? (
            shoppingCart.map(({ amount, priceBy, price, sale, name, _id }) => (
                <div className="product flex align-start" key={_id}>
                    <span className="amount">{amount}</span>
                    <span className="mult">x</span>
                    <span className="details">
                        {name} | {priceBy}
                    </span>
                    <span className="price">${sale || price}</span>
                </div>
            ))
        ) : (
            <div className="no-products flex flex-column justify-center align-center">
                <img src="images/error.svg" alt="No Products" />
                <span>No products found</span>
            </div>
        );
    };

    const renderUserAddresses = () => {
        return loggedInUser.addresses.map(({ label, details }, idx) => {
            return (
                <li className="sub-card" key={idx}>
                    <input type="radio" value={label} name="address" id={`address-${label}`} />
                    <label className="flex flex-column" htmlFor={`address-${label}`}>
                        <span className="title">{label}</span>
                        <span className="details">{details}</span>
                        <div className="edit-remove-btns">
                            <img
                                src="images/pencil.svg"
                                alt="Edit Button"
                                title="Edit"
                                onClick={() => onEditClick('address', { label, details })}
                            />
                            <img src="images/delete.svg" alt="Remove Button" title="Remove" />
                        </div>
                    </label>
                </li>
            );
        });
    };

    const renderDeliveryOptions = () => {
        return deliveryOptions.map(({ label, txt }, idx) => {
            return (
                <li className="sub-card" key={idx}>
                    <input type="radio" value={label} name="delivery" id={`address-${label}`} />
                    <label className="flex flex-column" htmlFor={`address-${label}`}>
                        <span className="title">{label}</span>
                        <span className="details">{txt}</span>
                    </label>
                </li>
            );
        });
    };

    const renderContactNum = () => {
        return loggedInUser.contactNums.map(({ label, num }, idx) => {
            return (
                <li className="sub-card" key={idx}>
                    <input type="radio" value={label} name="contact" id={`address-${label}`} />
                    <label className="flex flex-column" htmlFor={`address-${label}`}>
                        <span className="title">{label}</span>
                        <span className="details">{num}</span>
                        <div className="edit-remove-btns">
                            <img
                                src="images/pencil.svg"
                                alt="Edit Button"
                                title="Edit"
                                onClick={() => onEditClick('contact', { label, num })}
                            />
                            <img src="images/delete.svg" alt="Remove Button" title="Remove" />
                        </div>
                    </label>
                </li>
            );
        });
    };

    const renderCreditCards = () => {
        return loggedInUser.creditCards.map(({ vendorImg, lastNums, owner }) => {
            return (
                <section className="credit-card flex flex-column" key={lastNums}>
                    <img src={vendorImg} className="self-start" alt="Credit Card" />
                    <span className="card-num-label">Card Number</span>
                    <span className="card-num flex space-between">
                        <span>****</span>
                        <span>****</span>
                        <span>****</span>
                        <span>{lastNums}</span>
                    </span>
                    <span className="owner">{owner}</span>
                    <div className="edit-remove-btns">
                        <img src="images/delete.svg" alt="Remove Button" title="Remove" />
                    </div>
                </section>
            );
        });
    };

    const onAddClick = section => {
        document.body.style.overflowY = 'hidden';
        setModalToDisplay(section);
        setIsModalOpen(true);
    };

    const onEditClick = (section, data) => {
        setModalToDisplay(section);
        setEditModalData(data);
        document.body.style.overflowY = 'hidden';
        setIsModalOpen(true);
    };

    const onCloseModal = () => {
        setEditModalData(null);
        document.body.style.overflowY = 'auto';
        setIsModalOpen(false);
    };

    return (
        <div className="checkout">
            <Layout>
                <Head>
                    <title>Checkout</title>
                </Head>
                <section className="order-info">
                    <header>Your Order</header>
                    <div className="products-list">{renderShoppingCart()}</div>
                    <div className="price-calculation">
                        <div className="sub-total">
                            <span className="txt">Sub Total</span>
                            <span className="sub-price">${prices.subPrice}</span>
                        </div>
                        <div className="delivery-fee">
                            <span className="txt">Delivery Fee</span>
                            <span className="sub-price">${prices.delivery}</span>
                        </div>
                        <div className="discount">
                            <span className="txt">Discount</span>
                            <span className="sub-price">${prices.discount}</span>
                        </div>
                        <div className="total">
                            <span className="txt">Total</span>
                            <span className="sub-price">${prices.finalPrice}</span>
                        </div>
                    </div>
                </section>
                <section className="checkout-info flex flex-column">
                    <section className="delivery-address cards-container">
                        <div className="cards-header flex align-center">
                            <span className="step">1</span>
                            <span className="title">Delivery Address</span>
                            <button className="add-address-btn" onClick={() => onAddClick('address')}>
                                <span className="plus">+</span>
                                <span className="txt">Add Address</span>
                            </button>
                        </div>
                        <ul className="address-list">{renderUserAddresses()}</ul>
                    </section>
                    <section className="delivery-schedule cards-container">
                        <div className="cards-header flex align-center">
                            <span className="step">2</span>
                            <span className="title">Delivery Schedule</span>
                        </div>
                        <ul className="delivery-list">{renderDeliveryOptions()}</ul>
                    </section>
                    <section className="contact-number cards-container">
                        <div className="cards-header flex align-center">
                            <span className="step">3</span>
                            <span className="title">Contact Number</span>
                            <button className="add-contact-btn" onClick={() => onAddClick('contact')}>
                                <span className="plus">+</span>
                                <span className="txt">Add Contact</span>
                            </button>
                        </div>
                        <ul className="contact-list">{renderContactNum()}</ul>
                    </section>
                    <section className="payment-option cards-container flex flex-column align-center justify-content">
                        <div className="cards-header flex flex-column">
                            <div className="flex align-center justify-start">
                                <span className="step">4</span>
                                <span className="title">Payment Option</span>
                            </div>
                            <div className="flex align-center space-between">
                                <span className="cards-label">Saved Cards</span>
                                <button className="add-card-btn" onClick={() => onAddClick('credit')}>
                                    <span className="plus">+</span>
                                    <span className="txt">Add Card</span>
                                </button>
                            </div>
                        </div>
                        <section className="credit-cards-container">
                            <Slider items={renderCreditCards()} />
                        </section>
                        <span className="voucher self-start">Do you have a voucher?</span>
                        <small className="terms self-start">
                            By making this purchase you agree to our <span>terms and conditions</span>
                        </small>
                        <button className="proceed-btn">Proceed to Checkout</button>
                    </section>
                </section>
                <MultiModal modalToRender={modalToDisplay} isOpen={isModalOpen} dataToEdit={editModalData} />
                {isModalOpen && (
                    <span className="close-btn flex align-center justify-center" onClick={onCloseModal}>
                        X
                    </span>
                )}
                {isModalOpen && <DarkScreen toggleMenu={onCloseModal} />}
            </Layout>
        </div>
    );
}
