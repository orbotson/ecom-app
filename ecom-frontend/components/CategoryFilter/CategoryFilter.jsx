export default function CategoryFilter({ category, setIsFilterClicked, setModalStyle }) {
    const onFilterBtnClick = () => {
        document.body.style.overflowY = 'hidden';
        setIsFilterClicked(true);
    };

    return (
        <div className="category-filter flex space-between align-center">
            <p className="chosen-category">{category}</p>
            <button className="filter-btn" onClick={onFilterBtnClick}>
                Filter
            </button>
        </div>
    );
}
