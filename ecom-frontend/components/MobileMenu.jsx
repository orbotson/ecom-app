import Link from 'next/link';
import { IoCloseOutline } from 'react-icons/io5';

export default function MobileMenu() {
    return (
        <div className="mobile-menu">
            <section className="exit-btn-container flex align-center">
                <span className="exit-btn">
                    <IoCloseOutline />
                </span>
            </section>
            <section className="join-btn-container flex align-center justify-center">
                <button className="join-btn">Join In</button>
            </section>
            <section className="links flex flex-column">
                <Link href="/">
                    <a>Grocery</a>
                </Link>
                <Link href="/help">
                    <a>Need Help</a>
                </Link>
            </section>
        </div>
    );
}
