import { useState, useEffect } from 'react';
import Image from 'next/image';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import MobileMenu from './MobileMenu';

export default function Navbar({ isMenuActive, onToggleMenu }) {
    const [lang, setLang] = useState('English');

    const langOptions = [
        { lang: 'Arabic', flagUrl: '/images/sa.svg' },
        { lang: 'Chinese', flagUrl: '/images/cn.svg' },
        { lang: 'English', flagUrl: '/images/us.svg' },
        { lang: 'German', flagUrl: '/images/de.svg' },
        { lang: 'Hebrew', flagUrl: '/images/il.svg' },
        { lang: 'Spanish', flagUrl: '/images/es.svg' },
    ];

    useEffect(() => {
        const setDefaultLang = () => {
            const { flagUrl, lang } = langOptions[2];
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
        setDefaultLang();
    }, []);

    const optionsWithIcons = langOptions.map(({ lang, flagUrl }) => {
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
                <button className="mobile-menu-btn" onClick={() => onToggleMenu(true)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className="logo-container">
                    <Image src="/images/pickbazar.svg" alt="Pickbazar logo" width={110} height={18} />
                </div>
            </div>
            <Dropdown className="lang-switcher" options={optionsWithIcons} onChange={onSelect} value={lang} />
            <MobileMenu isOpen={isMenuActive} onClose={onToggleMenu} />
            {isMenuActive && <div className="screen" onClick={() => onToggleMenu(false)}></div>}
        </nav>
    );
}