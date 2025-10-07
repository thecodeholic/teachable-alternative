import React from 'react';
import { useNode } from '@craftjs/core';

interface SpacerProps {
    height: number;
    backgroundColor?: string;
}

export const Spacer: React.FC<SpacerProps> = ({
    height,
    backgroundColor = 'transparent',
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
                height,
                backgroundColor,
                border: isActive ? '2px solid #3b82f6' : '2px solid transparent',
                cursor: 'pointer',
                position: 'relative',
            }}
        >
            {isActive && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        whiteSpace: 'nowrap',
                    }}
                >
                    Spacer ({height}px)
                </div>
            )}
        </div>
    );
};

Spacer.craft = {
    displayName: 'Spacer',
    props: {
        height: 20,
        backgroundColor: 'transparent',
    },
    related: {
        toolbar: () => {
            return <div>Spacer Toolbar</div>;
        },
    },
};



