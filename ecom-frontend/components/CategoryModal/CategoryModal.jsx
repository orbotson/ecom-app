import Image from 'next/image';
import { IoCloseOutline } from 'react-icons/io5';

export default function CategoryModal({ setCategory, isOpen, closeModal }) {
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

    const onCardClick = async (e, cardCategory) => {
        e.stopPropagation();
        setCategory(cardCategory);
        closeModal();
    };

    return (
        <div className={`category-modal flex flex-column ${isOpen && 'active-category-modal'}`} onClick={closeModal}>
            <button className="close-modal-btn flex self-center align-center justify-center">
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
        </div>
    );
}
