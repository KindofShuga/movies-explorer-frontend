import React, { useCallback } from "react";
import validator from 'validator';

export function useFormWithValidation() {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = validator.ltrim(target.value);
        const validation = () => {
            setValues({ ...values, [name]: value });
            setErrors({ ...errors, [name]: target.validationMessage });
            setIsValid(target.closest("form").checkValidity());
        }
        if (name === "email" && !validator.isEmail(value)) {
            target.setCustomValidity("Введён неккоректный email")
            validation();
        }
        else {
            target.setCustomValidity("")
            validation();
        }
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return { values, handleChange, errors, isValid, resetForm, setIsValid };
}