import React, { useState } from 'react';
import './FilterCheckbox.css'

export default function FilterCheckbox({ onCheckedShorts, checkboxFromStorage }) {
    const [ checked, setChecked ] = useState(checkboxFromStorage || false);
 
    const handleChange = () => {
        setChecked(!checked);
        onCheckedShorts(!checked);
    }

    return (
        <label className="filter-checkbox">
            <input className="filter-checkbox__input" type="checkbox" checked={checked} onChange={handleChange} />
            <span className="filter-checkbox__slider"></span>
        </label>
    );
};