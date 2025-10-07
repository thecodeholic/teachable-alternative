import React from 'react';
import { useNode } from '@craftjs/core';

interface HeadingProps {
    text: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    fontSize?: number;
    color?: string;
    textAlign?: 'left' | 'center' | 'right';
    fontWeight?: 'normal' | 'bold' | 'semibold';
    margin?: string;
    padding?: string;
}

export const Heading: React.FC<HeadingProps> = ({
    text,
    level = 1,
    fontSize,
    color = '#000000',
    textAlign = 'left',
    fontWeight = 'bold',
    margin = '0',
    padding = '0',
}) => {
    const {
        connectors: { connect, drag },
        isActive,
    } = useNode((state) => ({
        isActive: state.events.selected,
    }));

    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    const defaultFontSizes = { 1: 32, 2: 28, 3: 24, 4: 20, 5: 18, 6: 16 };
    const finalFontSize = fontSize || defaultFontSizes[level];

    return (
        <Tag
            ref={(ref) => connect(drag(ref))}
            style={{
                fontSize: finalFontSize,
                color,
                textAlign,
                fontWeight,
                margin,
                padding,
                border: isActive ? '2px solid #3b82f6' : '2px solid transparent',
                borderRadius: '4px',
                minHeight: '20px',
                cursor: 'pointer',
            }}
        >
            {text}
        </Tag>
    );
};

Heading.craft = {
    displayName: 'Heading',
    props: {
        text: 'Click to edit heading',
        level: 1,
        color: '#000000',
        textAlign: 'left',
        fontWeight: 'bold',
        margin: '0',
        padding: '0',
    },
    related: {
        toolbar: () => {
            return <div>Heading Toolbar</div>;
        },
    },
};



