import Collapsible from 'react-collapsible';
import useTranslation from 'next-translate/useTranslation';

export default function AccordionItem({ idx }) {
    let { t } = useTranslation();

    return (
        <div className="accordion-item flex align-center justify-content">
            <Collapsible trigger={t(`help:question${idx}`)}>{t(`help:answer${idx}`)}</Collapsible>
        </div>
    );
}
