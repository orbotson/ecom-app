import { SWRConfig } from 'swr';
import Navbar from '../components/Navbar.jsx';
import { utilService } from '../services/util.service.js';
import '../styles/globals.scss';

const { fetcher } = utilService;

function MyApp({ Component, pageProps }) {
    return (
        <SWRConfig value={{ refreshInterval: 10000, fetcher }}>
            <Navbar />
            <Component {...pageProps} />
        </SWRConfig>
    );
}

export default MyApp;
