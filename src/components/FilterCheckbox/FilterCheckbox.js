import React from 'react';
import './FilterCheckbox.css'

export default function FilterCheckbox({onCheckedShorts}) {

    const handleChange = (event) => {
        onCheckedShorts(event.target.checked)
    }

    return (
        <label className="filter-checkbox">
            <input className="filter-checkbox__input" type="checkbox" onChange={handleChange}  />
            <span className="filter-checkbox__slider"></span>
        </label>
    );
};