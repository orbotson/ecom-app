import { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import MobileMenu from '../MobileMenu/MobileMenu';
import DarkScreen from '../DarkScreen/DarkScreen';

export default function Layout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = isOpen => {
        setIsMenuOpen(isOpen);
        document.body.style.overflowY = (isOpen && 'hidden') || 'auto';
    };

    return (
        <div className="layout">
            <Navbar handleMenuClick={handleMenuToggle} />
            <MobileMenu isOpen={isMenuOpen} onClose={handleMenuToggle} />
            {isMenuOpen && <DarkScreen toggleMenu={handleMenuToggle} />}
            <div className="children">{children}</div>
        </div>
    );
}
