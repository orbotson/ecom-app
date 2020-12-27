import { useEffect, useState, useContext } from 'react';
import Head from 'next/head';
import CategoryFilter from '../components/CategoryFilter/CategoryFilter';
import Layout from '../components/Layout/Layout';
import Slider from '../components/Slider/Slider';
import Card from '../components/Card/Card';
import CartModal from '../components/CartModal/CartModal';
import { ProductContext } from '../store/contexts/ProductContext';
import { utilService } from '../services/util.service';
import Image from 'next/image';

export default function Grocery({ products }) {
    const { shoppingCart, updateShoppingCart } = useContext(ProductContext);
    const [productsCopy, setProductsCopy] = useState([...products]);
    const [productsToShow, setProductsToShow] = useState(productsCopy.slice(0, 5));
    const [next, setNext] = useState(5);
    const [totalPrice, setTotalPrice] = useState(0);

    const productsPerPage = 5;

    useEffect(() => {
        const getCartData = () => {
            const updatedProducts = productsCopy.map(product => {
                const addedProduct = shoppingCart.find(cartProduct => product._id === cartProduct._id);
                if (addedProduct) return addedProduct;
                else return product;
            });
            setProductsCopy(updatedProducts);
            setProductsToShow(updatedProducts.slice(0, productsToShow.length));
        };
        getCartData();
    }, []);

    useEffect(() => {
        setTotalPrice(utilService.getPriceDetails(shoppingCart).finalPrice);
    }, [shoppingCart]);

    const updateCart = (product, action) => {
        const updatedCart = [...shoppingCart];

        const productIdx = shoppingCart.findIndex(({ _id }) => _id === product._id);
        if (action === 'increase') {
            productIdx === -1 ? updatedCart.push({ ...product, amount: 1 }) : updatedCart[productIdx].amount++;
        } else if (action === 'decrease') {
            updatedCart[productIdx].amount--;
            if (updatedCart[productIdx].amount < 1) updatedCart.splice(productIdx, 1);
        } else {
            updatedCart.splice(productIdx, 1);
        }

        updateShoppingCart(updatedCart);
    };

    const loadMorePosts = (start, end) => {
        const nextProducts = productsCopy.slice(start, end);
        setProductsToShow([...productsToShow, ...nextProducts]);
    };

    const handleLoadMoreClick = () => {
        loadMorePosts(next, next + productsPerPage);
        setNext(next + productsPerPage);
    };

    return (
        <Layout>
            <Head>
                <title>Grocery</title>
            </Head>
            <div className="home">
                <CategoryFilter />
                <Slider
                    items={[
                        <Image src="/images/grocery-banner-img-one.jpg" width={670} height={201} layout="responsive" />,
                        <Image src="/images/grocery-banner-img-two.jpg" width={670} height={201} layout="responsive" />,
                    ]}
                />
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
                    <span>{shoppingCart.length} Item</span>
                    <span className="price-box flex align-center justify-center">${totalPrice}</span>
                </button>
                {/* <CartModal cart={cart} totalPrice={getPriceDetails} updateCart={updateCart} /> */}
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
