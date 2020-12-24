import { useContext, useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import { ProductContext } from '../store/contexts/ProductContext';
import { utilService } from '../services/util.service';

export default function Checkout() {
    const { shoppingCart } = useContext(ProductContext);
    const [prices, setPrices] = useState({});
    const [addresses, setAddress] = useState([
        {
            label: 'Home',
            details: '27 Street, 2569 Heritage Road Visalia, CA 93291',
        },
        { label: 'Office', details: '33 Baker Street, Crescent Road, CA 65746' },
    ]);
    const [deliveryOptions, setDeliveryOptions] = useState([
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
    ]);
    const [contactNums, setContactNums] = useState([
        { label: 'Primary', num: '202-555-0191' },
        { label: 'Secondary', num: '202-555-0701' },
    ]);

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
        return addresses.map(({ label, details }, idx) => {
            return (
                <li className="sub-card" key={idx}>
                    <input type="radio" value={label} name="radio" id={`address-${label}`} />
                    <label className="flex flex-column" htmlFor={`address-${label}`}>
                        <span className="address-title">{label}</span>
                        <span className="address-details">{details}</span>
                        <div className="address-btns">
                            <img src="images/pencil.svg" alt="Edit Button" title="edit" />
                            <img src="images/delete.svg" alt="Edit Button" title="edit" />
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
                    <input type="radio" value={label} name="radio" id={`address-${label}`} />
                    <label className="flex flex-column" htmlFor={`address-${label}`}>
                        <span className="address-title">{label}</span>
                        <span className="address-details">{txt}</span>
                    </label>
                </li>
            );
        });
    };

    const renderContactNum = () => {
        return contactNums.map(({ label, num }, idx) => {
            return (
                <li className="sub-card" key={idx}>
                    <input type="radio" value={label} name="radio" id={`address-${label}`} />
                    <label className="flex flex-column" htmlFor={`address-${label}`}>
                        <span className="address-title">{label}</span>
                        <span className="address-details">{num}</span>
                        <div className="address-btns">
                            <img src="images/pencil.svg" alt="Edit Button" title="edit" />
                            <img src="images/delete.svg" alt="Edit Button" title="edit" />
                        </div>
                    </label>
                </li>
            );
        });
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
                            <button className="add-address-btn">
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
                        <ul className="address-list">{renderDeliveryOptions()}</ul>
                    </section>
                    <section className="contact-number cards-container">
                        <div className="cards-header flex align-center">
                            <span className="step">3</span>
                            <span className="title">Contact Number</span>
                            <button className="add-address-btn">
                                <span className="plus">+</span>
                                <span className="txt">Add Contact</span>
                            </button>
                        </div>
                        <ul className="address-list">{renderContactNum()}</ul>
                    </section>
                    <section className="payment-option cards-container"></section>
                </section>
            </Layout>
        </div>
    );
}
