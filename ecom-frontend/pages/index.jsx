import { useEffect, useState } from 'react';
import CategoryFilter from '../components/CategoryFilter/CategoryFilter';
import Layout from '../components/Layout/Layout';
import Slider from '../components/Slider/Slider';
import Card from '../components/Card/Card';
import CartModal from '../components/CartModal/CartModal';

export default function Grocery({ products }) {
    const [productsCopy, setProductsCopy] = useState(products);
    const [cart, setCart] = useState([]);
    const [productsToShow, setProductsToShow] = useState(productsCopy.slice(0, 5));
    const [next, setNext] = useState(5);

    const productsPerPage = 5;

    useEffect(() => {
        const getCartData = () => {
            const updatedProducts = productsCopy.map(product => {
                const addedProduct = cart.find(cartProduct => product._id === cartProduct._id);
                if (addedProduct) return addedProduct;
                else return product;
            });
            setProductsCopy(updatedProducts);
            setProductsToShow(updatedProducts.slice(0, productsToShow.length));
        };
        getCartData();
    }, []);

    useEffect(() => {
        console.log('cart:', cart);
    });

    const updateCart = (product, action) => {
        const currCart = [...cart];
        let updatedCart;

        const productIdx = cart.findIndex(({ _id }) => _id === product._id);
        if (action === 'increase') {
            productIdx === -1 ? currCart.push({ ...product, amount: 1 }) : currCart[productIdx].amount++;
            updatedCart = [...currCart];
        } else if (action === 'decrease') {
            currCart[productIdx].amount--;
            if (currCart[productIdx].amount < 1) currCart.splice(productIdx, 1);
            updatedCart = [...currCart];
        } else {
            currCart.splice(productIdx, 1);
            updatedCart = [...currCart];
        }

        setCart(updatedCart);
    };

    const loadMorePosts = (start, end) => {
        const nextProducts = productsCopy.slice(start, end);
        setProductsToShow([...productsToShow, ...nextProducts]);
    };

    const handleLoadMoreClick = () => {
        loadMorePosts(next, next + productsPerPage);
        setNext(next + productsPerPage);
    };

    const getTotalPrice = () => {
        if (cart.length === 0) return '0.00';
        let totalPrice = 0;
        for (let product of cart) {
            const { price, sale, amount } = product;
            totalPrice += (sale || price) * amount;
        }
        return totalPrice.toFixed(2);
    };

    return (
        <Layout>
            <div className="home">
                <CategoryFilter />
                <Slider />
                <section className="cards-container grid">
                    {productsCopy &&
                        productsToShow.map(product => (
                            <section key={product._id}>
                                <Card product={product} updateCart={updateCart} />
                            </section>
                        ))}
                </section>
                {productsCopy.length !== productsToShow.length && (
                    <section className="load-btn-container">
                        <button className="load-btn" onClick={handleLoadMoreClick}>
                            Load More
                        </button>
                    </section>
                )}
                <button className="cart-btn flex align-center">
                    <img className="icon" src="images/shopping-cart-white.svg" />
                    <span>{cart.length} Item</span>
                    <span className="price-box flex align-center justify-center">${getTotalPrice()}</span>
                </button>
                {/* <CartModal cart={cart} totalPrice={getTotalPrice} updateCart={updateCart} /> */}
            </div>
        </Layout>
    );
}

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3030/api/product');
    const products = await res.json();
    return {
        props: {
            products,
        },
    };
}
