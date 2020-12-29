//Forms are not functioning at the moment
export default function MultiModal({ modalToRender, isOpen, dataToEdit }) {
    const renderModal = () => {
        if (modalToRender === 'address') {
            return (
                <section className="add-address-modal">
                    <form className="flex flex-column">
                        <header>{dataToEdit ? 'Edit Address' : 'Add New Address'}</header>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter Title"
                            value={dataToEdit ? dataToEdit.label : ''}
                        />
                        <textarea
                            name="address"
                            id="address"
                            rows="10"
                            placeholder="Enter Address"
                            value={dataToEdit ? dataToEdit.details : ''}
                        ></textarea>
                        <button type="submit">Save Address</button>
                    </form>
                </section>
            );
        } else if (modalToRender === 'contact') {
            return (
                <section className="add-contact-modal">
                    <form className="flex flex-column">
                        <header>{dataToEdit ? 'Edit Contact' : 'Add New Contact'}</header>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Enter a phone number"
                            value={dataToEdit ? dataToEdit.num : ''}
                        />
                        <button type="submit">Save Contact</button>
                    </form>
                </section>
            );
        } else if (modalToRender === 'credit') {
            //stipe form
        }
    };

    return <div className={`multi-modal ${isOpen && 'show-modal'}`}>{renderModal()}</div>;
}
