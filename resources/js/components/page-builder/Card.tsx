import React from 'react';
import { useNode } from '@craftjs/core';

interface CardProps {
    title: string;
    content: string;
    icon?: string;
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: number;
    padding?: number;
    margin?: string;
    children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
    title,
    content,
    icon,
    backgroundColor = '#ffffff',
    borderColor = '#e5e7eb',
    borderRadius = 8,
    padding = 20,
    margin = '0',
    children,
}) => {
    const {
        connectors: { connect, drag },
        isActive,
    } = useNode((state) => ({
        isActive: state.events.selected,
    }));

    return (
        <div
            ref={(ref) => connect(drag(ref))}
            style={{
                backgroundColor,
                border: `1px solid ${borderColor}`,
                borderRadius,
                padding,
                margin,
                border: isActive ? '2px solid #3b82f6' : `1px solid ${borderColor}`,
                cursor: 'pointer',
                minHeight: '100px',
            }}
        >
            {icon && (
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>
                    {icon}
                </div>
            )}
            <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                margin: '0 0 10px 0',
                color: '#1f2937'
            }}>
                {title}
            </h3>
            <p style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: '0',
                lineHeight: '1.5'
            }}>
                {content}
            </p>
            {children}
        </div>
    );
};

Card.craft = {
    displayName: 'Card',
    props: {
        title: 'Card Title',
        content: 'Card content goes here. You can add any text or other elements.',
        icon: '📄',
        backgroundColor: '#ffffff',
        borderColor: '#e5e7eb',
        borderRadius: 8,
        padding: 20,
        margin: '0',
    },
    related: {
        toolbar: () => {
            return <div>Card Toolbar</div>;
        },
    },
};



