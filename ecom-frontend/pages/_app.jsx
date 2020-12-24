import '../styles/globals.scss';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import { ProductContextProvider } from '../store/contexts/ProductContext';

function MyApp({ Component, pageProps }) {
    return (
        <ProductContextProvider>
            <Component {...pageProps} />
        </ProductContextProvider>
    );
}

export default MyApp;
