import React, { useCallback } from "react";
import validator from 'validator';

//хук управления формой
export function useForm() {
    const [values, setValues] = React.useState({});

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setValues({ ...values, [name]: value });
    };

    return { values, handleChange, setValues };
}

//хук управления формой и валидации формы
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