import { useEffect, useState, useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { ProductContext } from '../store/contexts/ProductContext';
import { productService } from '../services/product.service';
import CategoryFilter from '../components/CategoryFilter/CategoryFilter';
import Layout from '../components/Layout/Layout';
import Slider from '../components/Slider/Slider';
import Card from '../components/Card/Card';
import CartModal from '../components/CartModal/CartModal';
import DarkScreen from '../components/DarkScreen/DarkScreen';
import CategoryModal from '../components/CategoryModal/CategoryModal';

export default function Grocery({ products }) {
    const { shoppingCart, currLocale, prevLocale, updateShoppingCart } = useContext(ProductContext);
    const [productsCopy, setProductsCopy] = useState([...products]);
    const [productsToShow, setProductsToShow] = useState(productsCopy.slice(0, 5));
    const [next, setNext] = useState(5);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isCartClicked, setIsCartClicked] = useState(false);
    const [isFilterClicked, setIsFilterClicked] = useState(false);
    const [category, setCategory] = useState('No Category Selected');
    let { t } = useTranslation();

    const productsPerPage = 5;

    useEffect(() => {
        const getCartData = () => {
            const updatedProducts = productsCopy.map(product => {
                const addedProduct = shoppingCart.find(cartProduct => product._id === cartProduct._id);
                return addedProduct || product;
            });
            setProductsCopy(updatedProducts);
            setProductsToShow(updatedProducts.slice(0, productsToShow.length));
        };
        getCartData();
    }, []);

    useEffect(() => {
        setTotalPrice(productService.getPriceDetails(shoppingCart).finalPrice);
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

    const onCartBtnClick = () => {
        document.body.style.overflowY = 'hidden';
        setIsCartClicked(true);
    };

    const onCloseModal = () => {
        document.body.style.overflowY = 'auto';
        setIsCartClicked(false);
        setIsFilterClicked(false);
    };

    return (
        <Layout>
            <Head>
                <title>Grocery</title>
            </Head>
            <div className="home flex">
                <CategoryFilter category={category} setIsFilterClicked={setIsFilterClicked} />
                <CategoryModal
                    setCategory={setCategory}
                    isOpen={isFilterClicked}
                    setIsOpen={setIsFilterClicked}
                    closeModal={onCloseModal}
                />
                {(isCartClicked || isFilterClicked) && <DarkScreen toggleMenu={onCloseModal} />}
                <main className="content-wrapper">
                    <Slider
                        items={[
                            <Image
                                src="/images/grocery-banner-img-one.jpg"
                                width={670}
                                height={201}
                                layout="responsive"
                            />,
                            <Image
                                src="/images/grocery-banner-img-two.jpg"
                                width={670}
                                height={201}
                                layout="responsive"
                            />,
                        ]}
                    />
                    <section className="cards-container grid">
                        {productsCopy &&
                            productsToShow.map(product => (
                                <section key={product._id}>
                                    <Card
                                        product={product}
                                        updateCart={updateCart}
                                        currLocale={currLocale}
                                        prevLocale={prevLocale}
                                    />
                                </section>
                            ))}
                    </section>
                    {productsCopy.length !== productsToShow.length && (
                        <section className="load-btn-container">
                            <button className="load-btn" onClick={handleLoadMoreClick}>
                                {t('common:load')}
                            </button>
                        </section>
                    )}
                    <button className="cart-btn flex align-center" onClick={onCartBtnClick}>
                        <div className="wrapper flex align-center">
                            <img className="icon" src="images/shopping-cart-white.svg" />
                            <span>
                                {shoppingCart.length} {t('common:items')}
                            </span>
                        </div>
                        <span className="price-box flex align-center justify-center">
                            {productService.getProductLocalizedPrice(totalPrice, currLocale, prevLocale)}
                        </span>
                    </button>
                </main>
                <section className="cart-modal-wrapper">
                    <CartModal
                        cart={shoppingCart}
                        updateCart={updateCart}
                        closeModal={onCloseModal}
                        isOpen={isCartClicked}
                        currLocale={currLocale}
                        prevLocale={prevLocale}
                    />
                </section>
            </div>
        </Layout>
    );
}

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3030/api/product');
    const products = await res.json();
    return {
        props: {
            products: products,
        },
    };
}
