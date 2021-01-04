import Link from 'next/link';
import { IoCloseOutline } from 'react-icons/io5';
import useTranslation from 'next-translate/useTranslation';

export default function MobileMenu({ isOpen, onClose }) {
    let { t } = useTranslation();

    return (
        <div className={`mobile-menu ${isOpen && 'active'}`}>
            <section className="exit-btn-container flex align-center">
                <span className="exit-btn" onClick={() => onClose(false)}>
                    <IoCloseOutline />
                </span>
            </section>
            <section className="join-btn-container flex align-center justify-center">
                <button className="join-btn">{t('common:join')}</button>
            </section>
            <section className="links flex flex-column">
                <Link href="/">
                    <a onClick={() => onClose(false)}>{t('common:grocery')}</a>
                </Link>
                <Link href="/checkout">
                    <a onClick={() => onClose(false)}>{t('common:checkout')}</a>
                </Link>
                <Link href="/help">
                    <a onClick={() => onClose(false)}>{t('common:help')}</a>
                </Link>
            </section>
        </div>
    );
}
