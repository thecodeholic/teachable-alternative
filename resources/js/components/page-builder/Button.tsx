import React from 'react';
import { useNode } from '@craftjs/core';

interface ButtonProps {
    text: string;
    backgroundColor?: string;
    color?: string;
    padding?: string;
    borderRadius?: number;
    fontSize?: number;
    onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
    text,
    backgroundColor = '#3b82f6',
    color = '#ffffff',
    padding = '8px 16px',
    borderRadius = 4,
    fontSize = 14,
    onClick,
}) => {
    const {
        connectors: { connect, drag },
        isActive,
    } = useNode((state) => ({
        isActive: state.events.selected,
    }));

    return (
        <button
            ref={(ref) => connect(drag(ref))}
            onClick={onClick}
            style={{
                backgroundColor,
                color,
                padding,
                borderRadius,
                fontSize,
                border: 'none',
                cursor: 'pointer',
                outline: isActive ? '2px solid #3b82f6' : 'none',
                outlineOffset: '2px',
            }}
        >
            {text}
        </button>
    );
};

Button.craft = {
    displayName: 'Button',
    props: {
        text: 'Click Me',
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        padding: '8px 16px',
        borderRadius: 4,
        fontSize: 14,
    },
    related: {
        toolbar: () => {
            return <div>Button Toolbar</div>;
        },
    },
};
