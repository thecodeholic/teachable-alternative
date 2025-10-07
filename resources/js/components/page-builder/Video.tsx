import React from 'react';
import { useNode } from '@craftjs/core';

interface VideoProps {
    src: string;
    title?: string;
    width?: number;
    height?: number;
    borderRadius?: number;
    autoplay?: boolean;
    controls?: boolean;
    loop?: boolean;
}

export const Video: React.FC<VideoProps> = ({
    src,
    title = 'Video',
    width = 560,
    height = 315,
    borderRadius = 8,
    autoplay = false,
    controls = true,
    loop = false,
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
                width,
                height,
                borderRadius,
                border: isActive ? '2px solid #3b82f6' : '2px solid transparent',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <video
                src={src}
                title={title}
                width={width}
                height={height}
                autoPlay={autoplay}
                controls={controls}
                loop={loop}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: borderRadius - 2,
                }}
            />
            {isActive && (
                <div
                    style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        backgroundColor: 'rgba(59, 130, 246, 0.9)',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                    }}
                >
                    Video
                </div>
            )}
        </div>
    );
};

Video.craft = {
    displayName: 'Video',
    props: {
        src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        title: 'Sample Video',
        width: 560,
        height: 315,
        borderRadius: 8,
        autoplay: false,
        controls: true,
        loop: false,
    },
    related: {
        toolbar: () => {
            return <div>Video Toolbar</div>;
        },
    },
};



