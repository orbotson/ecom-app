import { useState } from 'react';
import { storageService } from '../services/storage.service.js';
import CategoryFilter from '../components/CategoryFilter';
import Layout from '../components/Layout';
import Slider from '../components/Slider';
import Card from '../components/Card';

export default function Grocery({ products }) {
    const [cart, setCart] = useState((typeof window !== 'undefined' && storageService.load('cart')) || []);
    const [productsToShow, setProductsToShow] = useState(products.slice(0, 5));
    const [next, setNext] = useState(5);

    const productsPerPage = 5;

    const updateCart = (product, action = 'add') => {
        const currCart = [...cart];
        let updatedCart;

        const productIdx = cart.findIndex(({ _id }) => _id === product._id);
        if (action === 'add') {
            productIdx === -1 ? currCart.push({ ...product, amount: 1 }) : currCart[productIdx].amount++;
            updatedCart = [...currCart];
        } else {
            currCart[productIdx].amount--;
            if (currCart[productIdx].amount < 1) currCart.splice(productIdx, 1);
            updatedCart = [...currCart];
        }

        storageService.store('cart', updatedCart);
        setCart(updatedCart);
    };

    const loadMorePosts = (start, end) => {
        const nextProducts = products.slice(start, end);
        setProductsToShow([...productsToShow, ...nextProducts]);
    };

    const handleLoadMoreClick = () => {
        loadMorePosts(next, next + productsPerPage);
        setNext(next + productsPerPage);
    };

    return (
        <Layout>
            <div className="home">
                <CategoryFilter />
                <Slider />
                <section className="cards-container grid">
                    {products &&
                        productsToShow.map(product => (
                            <section key={product._id}>
                                <Card product={product} updateCart={updateCart} />
                            </section>
                        ))}
                </section>
                {products.length !== productsToShow.length && (
                    <section className="load-btn-container">
                        <button className="load-btn" onClick={handleLoadMoreClick}>
                            Load More
                        </button>
                    </section>
                )}
            </div>
        </Layout>
    );
}

export async function getStaticProps() {
    const res = await fetch('http://localhost:3030/api/product');
    const products = await res.json();
    return {
        props: {
            products,
        },
        revalidate: 5,
    };
}
