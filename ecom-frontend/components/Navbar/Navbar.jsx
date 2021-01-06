import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Dropdown from 'react-dropdown';
import useTranslation from 'next-translate/useTranslation';
import { ProductContext } from '../../store/contexts/ProductContext';
import 'react-dropdown/style.css';

export default function Navbar({ handleMenuClick }) {
    const { currLocale, availableLocales, changeLocale } = useContext(ProductContext);
    const [page, setPage] = useState('');
    const [lang, setLang] = useState('');

    const router = useRouter();
    let { t } = useTranslation();

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

            setLang({
                label: (
                    <div className="option-container flex align-center">
                        <img src={currLocale.flagUrl} />
                        <span>{currLocale.lang}</span>
                    </div>
                ),
                value: currLocale.lang.toLowerCase(),
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

    const langsOptions = availableLocales.map(({ locale, lang, flagUrl }) => {
        return {
            label: (
                <div className="option-container flex align-center">
                    <img src={flagUrl} />
                    <span>{lang}</span>
                </div>
            ),
            value: locale,
        };
    });

    const onLangChange = ({ value, label }) => {
        value === 'he'
            ? document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl')
            : document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
        changeLocale(value);
        router.push(`${window.location.origin}/${value}${router.route}`);
    };

    const onPageChange = () => {
        //router.push...
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
            <Dropdown className="page-switcher" options={pagesOptions} onChange={onPageChange} value={page} />
            <form className="searchfield flex align-center grow-1">
                <span className="flex align-center justify-center">
                    <img src="/images/search.svg" className="search-icon self-center" alt="Search" />
                </span>
                <input type="text" placeholder={t('common:searchPH')} name="seachfiled" />
            </form>
            <span className="offer">{t('common:offer')}</span> {/*Should be a link*/}
            <Link href="/help">
                <div className="help-link-wrapper flex align-center justify-center">
                    <img src="/images/question.svg" alt="Help" />
                    <a>{t('common:help')}</a>
                </div>
            </Link>
            <Dropdown className="lang-switcher" options={langsOptions} onChange={onLangChange} value={lang} />
            <button className="join-btn">{t('common:join')}</button>
        </nav>
    );
}
