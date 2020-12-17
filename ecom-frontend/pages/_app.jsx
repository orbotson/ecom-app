import { useState } from 'react';
import { SWRConfig } from 'swr';
import { utilService } from '../services/util.service.js';
import Navbar from '../components/Navbar.jsx';
import MobileMenu from '../components/MobileMenu.jsx';
import '../styles/globals.scss';

const { fetcher } = utilService;

function MyApp({ Component, pageProps }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = isOpen => {
        console.log('handling isOpen:', isOpen);
        setIsMenuOpen(isOpen);
    };

    return (
        // <SWRConfig value={{ refreshInterval: 10000, fetcher }}>
        <>
            {/* {isMenuOpen && <div className="screen" onClick={() => handleMenuToggle(false)}></div>} */}
            <Navbar isMenuActive={isMenuOpen} onToggleMenu={handleMenuToggle} />
            <Component {...pageProps} />
        </>
        // </SWRConfig>
    );
}

export default MyApp;
