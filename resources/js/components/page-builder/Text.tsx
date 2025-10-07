import React from 'react';
import { useNode } from '@craftjs/core';

interface TextProps {
    text: string;
    fontSize?: number;
    color?: string;
    textAlign?: 'left' | 'center' | 'right';
    fontWeight?: 'normal' | 'bold';
    margin?: string;
    padding?: string;
}

export const Text: React.FC<TextProps> = ({
    text,
    fontSize = 16,
    color = '#000000',
    textAlign = 'left',
    fontWeight = 'normal',
    margin = '0',
    padding = '0',
}) => {
    const {
        connectors: { connect, drag },
        isActive,
    } = useNode((state) => ({
        isActive: state.events.selected,
    }));

    return (
        <p
            ref={(ref) => connect(drag(ref))}
            style={{
                fontSize,
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
        </p>
    );
};

Text.craft = {
    displayName: 'Text',
    props: {
        text: 'Click to edit text',
        fontSize: 16,
        color: '#000000',
        textAlign: 'left',
        fontWeight: 'normal',
        margin: '0',
        padding: '0',
    },
    related: {
        toolbar: () => {
            return <div>Text Toolbar</div>;
        },
    },
};
