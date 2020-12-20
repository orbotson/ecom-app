import { useState } from 'react';
import Image from 'next/image';
import { IoCloseOutline } from 'react-icons/io5';

export default function CategoryFilter() {
    const [category, setCategory] = useState('No Category Selected');
    const [isFilterClicked, setIsFilterClicked] = useState(false);
    const [modalStyle, setModalStyle] = useState({});

    const categories = [
        { icon: '/images/apple.svg', label: 'Frutis & Vegetables' },
        { icon: '/images/meat.svg', label: 'Meat & Fish' },
        { icon: '/images/coffee-cup.svg', label: 'Snacks' },
        { icon: '/images/dog-food.svg', label: 'Pet Care' },
        { icon: '/images/spray-bottle.svg', label: 'Home & Cleaning' },
        { icon: '/images/milk.svg', label: 'Dairy' },
        { icon: '/images/pan.svg', label: 'Cooking' },
        { icon: '/images/pie.svg', label: 'Breakfast' },
        { icon: '/images/cocktail.svg', label: 'Beverage' },
        { icon: '/images/mirror.svg', label: 'Beauty & Health' },
    ];

    function onFilterBtnClick() {
        document.body.style.overflowY = 'hidden';
        setIsFilterClicked(true);
        setModalStyle({
            transform: 'translateY(0%) translateY(0px) translateX(-50%)',
        });
    }

    function onCloseModal() {
        document.body.style.overflowY = 'auto';
        setIsFilterClicked(false);
        setModalStyle({
            transform: 'translateY(100%) translateY(100px) translateX(-50%)',
        });
    }

    async function onCardClick(e, cardCategory) {
        e.stopPropagation();
        setCategory(cardCategory);
        onCloseModal();
        // label && await loadProducts(label);
    }

    return (
        <div className="category-filter flex space-between align-center">
            <p className="chosen-category">{category}</p>
            <button className="filter-btn" onClick={onFilterBtnClick}>
                Filter
            </button>
            {isFilterClicked && (
                <section className="categories-modal flex flex-column" style={modalStyle} onClick={onCloseModal}>
                    <button className="close-modal-btn self-center">
                        <IoCloseOutline />
                    </button>
                    <section className="category-cards grid">
                        {categories.map(({ icon, label }) => {
                            return (
                                <section
                                    key={label}
                                    className="category-card flex flex-column align-center justify-center"
                                    onClick={e => onCardClick(e, label)}
                                >
                                    <span className="category-icon flex align-center justify-center">
                                        <Image src={icon} alt="Category Icon" width={40} height={40} />
                                    </span>
                                    <span className="category-label">{label}</span>
                                </section>
                            );
                        })}
                    </section>
                </section>
            )}
        </div>
    );
}
