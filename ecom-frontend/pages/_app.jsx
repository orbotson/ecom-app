import { SWRConfig } from 'swr';
import { fetcher } from '../services/util.service.js';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
    return (
        <SWRConfig value={{ refreshInterval: 10000, fetcher }}>
            <Component {...pageProps} />
        </SWRConfig>
    );
}

export default MyApp;
