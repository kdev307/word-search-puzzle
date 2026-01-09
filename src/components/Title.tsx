import React from 'react';

interface TitleProps {
    children?: React.ReactNode;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    style?: string;
}

function Title({ children, as, style = '', ...props }: TitleProps) {
    const Element = as || 'h2';

    return (
        <Element className={`py-4 ${style}`} {...props}>
            {children}
        </Element>
    );
}

export default Title;
