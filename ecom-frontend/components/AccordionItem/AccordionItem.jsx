import { useState } from 'react';
import Collapsible from 'react-collapsible';

export default function AccordionItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="accordion-item flex align-center justify-content">
            <Collapsible trigger={question} onClick={() => setIsOpen(!isOpen)}>
                {answer}
            </Collapsible>
        </div>
    );
}
