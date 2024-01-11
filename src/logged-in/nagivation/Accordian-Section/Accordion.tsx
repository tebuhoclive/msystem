import React, { ReactElement, ReactNode, useState } from 'react';
import "./Accordion.scss";

interface AccordionProp{
    title:string,
    children:ReactNode
}

const AccordionSection: React.FC<AccordionProp>  = ({ title,children}:AccordionProp) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-section">
      <div className="accordion-header" onClick={toggleAccordion}>
        {title}
      </div>
      {isOpen && children}
    </div>
  );
};


export default AccordionSection;
