import React from 'react';

const categories = ['Classic', 'Modern', 'Special Edition'];

const CategoryFilter = ({ activeCategory, onChange }: {
    activeCategory: string;
    onChange: (category: string) => void;
}) => {
    return (
        <ul className="flex gap-x-8 text-white  text-lg justify-center mb-10">
            {categories.map((cat) => (
                <li
                    key={cat}
                    className={`cursor-pointer   cool-link ${activeCategory === cat ? ' underline' : 'opacity-70'
                        }`}
                    onClick={() => onChange(cat)}
                >
                    {cat}
                </li>
            ))}
        </ul>
    );
};

export default CategoryFilter;
