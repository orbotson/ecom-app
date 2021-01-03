import Collapsible from 'react-collapsible';

export default function AccordionItem({ question, answer }) {
    return (
        <div className="accordion-item flex align-center justify-content">
            <Collapsible trigger={question}>{answer}</Collapsible>
        </div>
    );
}
