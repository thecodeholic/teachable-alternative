import React from 'react';
import { useNode } from '@craftjs/core';

interface ImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    borderRadius?: number;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export const Image: React.FC<ImageProps> = ({
    src,
    alt,
    width = 300,
    height = 200,
    borderRadius = 0,
    objectFit = 'cover',
}) => {
    const {
        connectors: { connect, drag },
        isActive,
    } = useNode((state) => ({
        isActive: state.events.selected,
    }));

    return (
        <img
            ref={(ref) => connect(drag(ref))}
            src={src}
            alt={alt}
            style={{
                width,
                height,
                borderRadius,
                objectFit,
                border: isActive ? '2px solid #3b82f6' : '2px solid transparent',
                cursor: 'pointer',
                display: 'block',
            }}
        />
    );
};

Image.craft = {
    displayName: 'Image',
    props: {
        src: 'https://via.placeholder.com/300x200',
        alt: 'Placeholder image',
        width: 300,
        height: 200,
        borderRadius: 0,
        objectFit: 'cover',
    },
    related: {
        toolbar: () => {
            return <div>Image Toolbar</div>;
        },
    },
};
