import { useState } from 'react';
import Image from 'next/image';
import { IoCloseOutline } from 'react-icons/io5';

export default function CategoryFilter() {
    const [category, setCategory] = useState('No Category Selected');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

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

    return (
        <div className="category-filter flex space-between align-center">
            <p className="chosen-category">{category}</p>
            <button className="filter-btn" onClick={() => setIsFilterOpen(true)}>
                Filter
            </button>
            <section className="categories-modal flex flex-column">
                <button className="close-modal-btn self-center">
                    <IoCloseOutline />
                </button>
                <section className="category-cards flex wrap justify-center">
                    {categories.map(({ icon, label }) => {
                        return (
                            <section key={label} className="category-card flex flex-column align-center justify-center">
                                <span className="category-icon">
                                    <Image src={icon} width={40} height={40} />
                                </span>
                                <span className="category-label">{label}</span>
                            </section>
                        );
                    })}
                </section>
            </section>
        </div>
    );
}
