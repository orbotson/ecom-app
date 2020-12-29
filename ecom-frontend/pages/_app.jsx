import '../styles/globals.scss';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import { ProductContextProvider } from '../store/contexts/ProductContext';
import { UserContextProvider } from '../store/contexts/UserContext';

function MyApp({ Component, pageProps }) {
    return (
        <UserContextProvider>
            <ProductContextProvider>
                <Component {...pageProps} />
            </ProductContextProvider>
        </UserContextProvider>
    );
}

export default MyApp;
