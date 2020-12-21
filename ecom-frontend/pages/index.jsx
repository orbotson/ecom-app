import { useState } from 'react';
import { storageService } from '../services/storage.service.js';
import CategoryFilter from '../components/CategoryFilter';
import Layout from '../components/Layout';
import Slider from '../components/Slider';
import Card from '../components/Card';

export default function Grocery({ products }) {
    const [cart, setCart] = useState(storageService.load('cart') || null);

    function updateCart(product, action = 'add') {
        if (!window.localStorage) return;

        const cart = storageService.load('cart');
        let updatedCart;

        const productIdx = cart.findIndex(({ _id }) => _id === product._id);
        if (action === 'add') {
            if (productIdx === -1) cart.push({ ...product, amount: 1 });
            else cart[productIdx].amount++;
        } else {
            // const productIdx = cart.findIndex(cartProduct => cartProduct._id === product._id);
            cart.splice(productIdx, 1);
        }
        storageService.store('cart', updatedCart);
        setCart(updatedCart);
    }

    return (
        <Layout>
            <div className="home">
                <CategoryFilter />
                <Slider />
                <section className="cards-container grid">
                    {products &&
                        products.map(product => (
                            <section key={product._id}>
                                <Card product={product} updateCart={updateCart} />
                            </section>
                        ))}
                </section>
            </div>
        </Layout>
    );
}

export async function getStaticProps(context) {
    const res = await fetch('http://localhost:3030/api/product');
    const products = await res.json();
    return {
        props: {
            products,
        },
        revalidate: 5,
    };
}
