import { useContext, useState, useEffect } from 'react';
import Head from 'next/head';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import useTranslation from 'next-translate/useTranslation';
import { ProductContext } from '../store/contexts/ProductContext';
import { UserContext } from '../store/contexts/UserContext';
import { productService } from '../services/product.service';
import Layout from '../components/Layout/Layout';
import MultiModal from '../components/MultiModal/MultiModal';
import DarkScreen from '../components/DarkScreen/DarkScreen';

export default function Checkout() {
    const { shoppingCart } = useContext(ProductContext);
    const { loggedInUser } = useContext(UserContext);
    const [prices, setPrices] = useState({});
    const [modalToDisplay, setModalToDisplay] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModalData, setEditModalData] = useState(null);
    let { t } = useTranslation();

    const deliveryOptions = [
        {
            label: 'Express-Dlivery',
            txt: '90 min express delivery',
        },
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

    const responsive = {
        desktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    useEffect(() => {
        setPrices(productService.getPriceDetails(shoppingCart));
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
                <span>{t('checkout:noProducts')}</span>
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
                <li className="sub-card flex" key={idx}>
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
                <section className="order-info-container">
                    <section className="order-info">
                        <header>{t('checkout:yourOrder')}</header>
                        <div className="products-list">{renderShoppingCart()}</div>
                        <div className="price-calculation">
                            <div className="sub-total">
                                <span className="txt">{t('checkout:subTotal')}</span>
                                <span className="sub-price">${prices.subPrice}</span>
                            </div>
                            <div className="delivery-fee">
                                <span className="txt">{t('checkout:deliveryFee')}</span>
                                <span className="sub-price">${prices.delivery}</span>
                            </div>
                            <div className="discount">
                                <span className="txt">{t('checkout:discount')}</span>
                                <span className="sub-price">${prices.discount}</span>
                            </div>
                            <div className="total">
                                <div className="total-label">
                                    <span className="txt">{t('checkout:total')}</span>
                                    <span className="vat-txt"> ({t('checkout:totalVat')})</span>
                                </div>
                                <span className="sub-price">${prices.finalPrice}</span>
                            </div>
                        </div>
                    </section>
                </section>
                <section className="checkout-info flex flex-column">
                    <section className="delivery-address cards-container">
                        <div className="cards-header flex align-center">
                            <span className="step">1</span>
                            <span className="title">{t('checkout:deliveryAddress')}</span>
                            <button className="add-address-btn" onClick={() => onAddClick('address')}>
                                <span className="plus">+</span>
                                <span className="txt">{t('checkout:addAddress')}</span>
                            </button>
                        </div>
                        <ul className="address-list">{renderUserAddresses()}</ul>
                    </section>
                    <section className="delivery-schedule cards-container">
                        <div className="cards-header flex align-center">
                            <span className="step">2</span>
                            <span className="title">{t('checkout:deliverySchedule')}</span>
                        </div>
                        <ul className="delivery-list">{renderDeliveryOptions()}</ul>
                    </section>
                    <section className="contact-number cards-container">
                        <div className="cards-header flex align-center">
                            <span className="step">3</span>
                            <span className="title">{t('checkout:contactNumber')}</span>
                            <button className="add-contact-btn" onClick={() => onAddClick('contact')}>
                                <span className="plus">+</span>
                                <span className="txt">{t('checkout:addContact')}</span>
                            </button>
                        </div>
                        <ul className="contact-list">{renderContactNum()}</ul>
                    </section>
                    <section className="payment-option cards-container flex flex-column align-center justify-content">
                        <div className="cards-header flex flex-column">
                            <div className="flex align-center justify-start">
                                <span className="step">4</span>
                                <span className="title">{t('checkout:paymentOption')}</span>
                            </div>
                            <div className="flex align-center space-between">
                                <span className="cards-label">{t('checkout:savedCards')}</span>
                                <button className="add-card-btn" onClick={() => onAddClick('credit')}>
                                    <span className="plus">+</span>
                                    <span className="txt">{t('checkout:addCard')}</span>
                                </button>
                            </div>
                        </div>
                        <section className="credit-cards-container">
                            {/* <Slider items={renderCreditCards()} breakpoints={sliderBreakpoints} /> */}
                            <Carousel responsive={responsive}>{renderCreditCards()}</Carousel>
                        </section>
                        <span className="voucher self-start">{t('checkout:voucher')}</span>
                        <small className="terms self-start">
                            {t('checkout:byAgree')} <span>{t('checkout:terms')}</span>
                        </small>
                        <button className="proceed-btn">{t('checkout:proceed')}</button>
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
