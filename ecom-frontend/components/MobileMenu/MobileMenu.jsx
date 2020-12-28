import Link from 'next/link';
import { IoCloseOutline } from 'react-icons/io5';

export default function MobileMenu({ isOpen, onClose }) {
    return (
        <div className={`mobile-menu ${isOpen && 'active'}`}>
            <section className="exit-btn-container flex align-center">
                <span className="exit-btn" onClick={() => onClose(false)}>
                    <IoCloseOutline />
                </span>
            </section>
            <section className="join-btn-container flex align-center justify-center">
                <button className="join-btn">Join In</button>
            </section>
            <section className="links flex flex-column">
                <Link href="/">
                    <a onClick={() => onClose(false)}>Grocery</a>
                </Link>
                <Link href="/checkout">
                    <a onClick={() => onClose(false)}>Checkout</a>
                </Link>
                <Link href="/help">
                    <a onClick={() => onClose(false)}>Need Help</a>
                </Link>
            </section>
        </div>
    );
}
