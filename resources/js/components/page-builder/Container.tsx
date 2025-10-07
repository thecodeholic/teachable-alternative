import React from 'react';
import { useNode } from '@craftjs/core';

interface ContainerProps {
    padding?: number;
    margin?: number;
    backgroundColor?: string;
    borderRadius?: number;
    children?: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
    padding = 20,
    margin = 0,
    backgroundColor = 'transparent',
    borderRadius = 0,
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
                padding,
                margin,
                backgroundColor,
                borderRadius,
                border: isActive ? '2px solid #3b82f6' : '2px solid transparent',
                minHeight: '50px',
                cursor: 'pointer',
            }}
        >
            {children}
        </div>
    );
};

Container.craft = {
    displayName: 'Container',
    props: {
        padding: 20,
        margin: 0,
        backgroundColor: 'transparent',
        borderRadius: 0,
    },
    related: {
        toolbar: () => {
            return <div>Container Toolbar</div>;
        },
    },
};
