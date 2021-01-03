import { useState, useEffect } from 'react';
import Link from 'next/link';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function Navbar({ handleMenuClick }) {
    const [page, setPage] = useState('Grocery');
    const [lang, setLang] = useState('English');

    const pages = [
        { name: 'Grocery', url: '/images/pages-dropdown/groceries.svg' },
        { name: 'Grocery Two', url: '/images/pages-dropdown/groceries.svg' },
        { name: 'Bakery', url: '/images/pages-dropdown/bread.svg' },
        { name: 'Makeup', url: '/images/pages-dropdown/makeup.svg' },
        { name: 'Bags', url: '/images/pages-dropdown/backpack.svg' },
        { name: 'Clothing', url: '/images/pages-dropdown/tshirt.svg' },
        { name: 'Furniture', url: '/images/pages-dropdown/couch.svg' },
        { name: 'Furniture Two', url: '/images/pages-dropdown/couch.svg' },
        { name: 'Book', url: '/images/pages-dropdown/book.svg' },
        { name: 'Medicine', url: '/images/pages-dropdown/medicine.svg' },
    ];

    const langs = [
        { lang: 'Arabic', flagUrl: '/images/sa.svg' },
        { lang: 'Chinese', flagUrl: '/images/cn.svg' },
        { lang: 'English', flagUrl: '/images/us.svg' },
        { lang: 'German', flagUrl: '/images/de.svg' },
        { lang: 'Hebrew', flagUrl: '/images/il.svg' },
        { lang: 'Spanish', flagUrl: '/images/es.svg' },
    ];

    useEffect(() => {
        const setDefaultValues = () => {
            const { name, url } = pages[0];
            setPage({
                label: (
                    <div className="option-container flex align-center">
                        <img src={url} />
                        <span>{name}</span>
                    </div>
                ),
                value: name.toLowerCase(),
            });

            const { flagUrl, lang } = langs[2];
            setLang({
                label: (
                    <div className="option-container flex align-center">
                        <img src={flagUrl} />
                        <span>{lang}</span>
                    </div>
                ),
                value: lang.toLowerCase(),
            });
        };
        setDefaultValues();
    }, []);

    const pagesOptions = pages.map(({ name, url }) => {
        return {
            label: (
                <div className="option-container flex align-center">
                    <img src={url} />
                    <span>{name}</span>
                </div>
            ),
            value: name.toLowerCase(),
        };
    });

    const langsOptions = langs.map(({ lang, flagUrl }) => {
        return {
            label: (
                <div className="option-container flex align-center">
                    <img src={flagUrl} />
                    <span>{lang}</span>
                </div>
            ),
            value: lang.toLowerCase(),
        };
    });

    const onSelect = () => {
        //i18n
        console.log('selected');
    };

    return (
        <nav className="navbar flex space-between align-center">
            <div className="wrapper flex align-center">
                <button className="mobile-menu-btn" onClick={() => handleMenuClick(true)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className="logo-container">
                    <Link href="/">
                        <img src="/images/pickbazar.svg" alt="Pickbazar logo" title="Homepage" />
                    </Link>
                </div>
            </div>
            <Dropdown className="page-switcher" options={pagesOptions} onChange={onSelect} value={page} />
            <form className="searchfield flex align-center grow-1">
                <span className="flex align-center justify-center">
                    <img src="/images/search.svg" className="search-icon self-center" alt="Search" />
                </span>
                <input type="text" placeholder="Search yout products from here" name="seachfiled" />
            </form>
            <span className="offer">Offer</span> {/*Should be a link*/}
            <Link href="/help">
                <div className="help-link-wrapper flex align-center justify-center">
                    <img src="/images/question.svg" alt="Help" />
                    <a>Need Help</a>
                </div>
            </Link>
            <Dropdown className="lang-switcher" options={langsOptions} onChange={onSelect} value={lang} />
            <button className="join-btn">Join</button>
        </nav>
    );
}
