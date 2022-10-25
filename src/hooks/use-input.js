import { useState } from 'react';

const useInput = (validateValue) => {
    const [inputValue, setInputValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const inputValueIsValid = validateValue(inputValue);
    console.log(inputValueIsValid, isTouched);
    const hasError = !inputValueIsValid && isTouched;

    const onChangeHandler = (event) => {
        setInputValue(event.target.value);
    }

    const onBlurHandler = () => {
        setIsTouched(true);
    }

    const reset = () => {
        setIsTouched(false);
        setInputValue('');
    }

    const inputClasses = !hasError ? 'form-control' : 'form-control invalid';

    return {
        value: inputValue,
        setIsTouched,
        hasError,
        onChangeHandler,
        onBlurHandler,
        reset,
        inputClasses,
    }
}

export default useInput;