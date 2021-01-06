import useTranslation from 'next-translate/useTranslation';

export default function MultiModal({ modalToRender, isOpen, dataToEdit }) {
    let { t } = useTranslation();

    const renderModal = () => {
        if (modalToRender === 'address') {
            return (
                <section className="add-address-modal">
                    <form className="flex flex-column">
                        <header>{dataToEdit ? t('checkout:editAddress') : t('checkout:addNewAddress')}</header>
                        <input
                            type="text"
                            name="title"
                            placeholder={t('checkout:enterTitle')}
                            value={dataToEdit ? dataToEdit.label : ''}
                        />
                        <textarea
                            name="address"
                            id="address"
                            rows="10"
                            placeholder={t('checkout:enterAddress')}
                            value={dataToEdit ? dataToEdit.details : ''}
                        ></textarea>
                        <button type="submit">{t('checkout:saveAddress')}</button>
                    </form>
                </section>
            );
        } else if (modalToRender === 'contact') {
            return (
                <section className="add-contact-modal">
                    <form className="flex flex-column">
                        <header>{dataToEdit ? t('checkout:editContact') : t('checkout:addNewContact')}</header>
                        <input
                            type="text"
                            name="phone"
                            placeholder={t('checkout:enterPhone')}
                            value={dataToEdit ? dataToEdit.num : ''}
                        />
                        <button type="submit">{t('checkout:saveContact')}</button>
                    </form>
                </section>
            );
        } else if (modalToRender === 'credit') {
            //stripe form
        }
    };

    return <div className={`multi-modal ${isOpen && 'show-modal'}`}>{renderModal()}</div>;
}
