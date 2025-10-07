import React from 'react';
import { useNode } from '@craftjs/core';

interface CourseCardProps {
    title: string;
    description: string;
    price: string;
    image: string;
    instructor?: string;
    rating?: number;
    students?: number;
    backgroundColor?: string;
    borderRadius?: number;
    padding?: number;
    margin?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
    title,
    description,
    price,
    image,
    instructor = 'Expert Instructor',
    rating = 4.5,
    students = 0,
    backgroundColor = '#ffffff',
    borderRadius = 12,
    padding = 0,
    margin = '0',
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
                borderRadius,
                padding,
                margin,
                border: isActive ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                cursor: 'pointer',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => {
                if (!isActive) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                }
            }}
            onMouseLeave={(e) => {
                if (!isActive) {
                    e.currentTarget.style.transform = 'translateY(0)';
                }
            }}
        >
            <div style={{ position: 'relative' }}>
                <img
                    src={image}
                    alt={title}
                    style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                    }}
                >
                    {price}
                </div>
            </div>

            <div style={{ padding: '20px' }}>
                <h3
                    style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        margin: '0 0 8px 0',
                        color: '#1f2937',
                        lineHeight: '1.3',
                    }}
                >
                    {title}
                </h3>

                <p
                    style={{
                        fontSize: '14px',
                        color: '#6b7280',
                        margin: '0 0 12px 0',
                        lineHeight: '1.5',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: '#fbbf24', fontSize: '14px' }}>★</span>
                        <span style={{ fontSize: '14px', color: '#6b7280', marginLeft: '4px' }}>
                            {rating}
                        </span>
                    </div>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
                        ({students} students)
                    </span>
                </div>

                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '15px' }}>
                    by {instructor}
                </div>

                <button
                    style={{
                        width: '100%',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        padding: '10px 16px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease-in-out',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#2563eb';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#3b82f6';
                    }}
                >
                    Enroll Now
                </button>
            </div>
        </div>
    );
};

CourseCard.craft = {
    displayName: 'Course Card',
    props: {
        title: 'Course Title',
        description: 'This is a sample course description that explains what students will learn.',
        price: '$99',
        image: 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=Course+Image',
        instructor: 'Expert Instructor',
        rating: 4.5,
        students: 1234,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 0,
        margin: '0',
    },
    related: {
        toolbar: () => {
            return <div>Course Card Toolbar</div>;
        },
    },
};



