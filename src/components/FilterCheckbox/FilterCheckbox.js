import React from 'react';
import './FilterCheckbox.css'

export default function FilterCheckbox({ checkedCheckbox, onChangeShorts }) {
    return (
        <label className="filter-checkbox">
            <input className="filter-checkbox__input" type="checkbox" checked={checkedCheckbox} onChange={onChangeShorts} />
            <span className="filter-checkbox__slider"></span>
        </label>
    );
};