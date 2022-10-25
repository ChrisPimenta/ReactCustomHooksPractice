import Input from '../UI/Input';
import useInput from '../../hooks/use-input';
import classes from './CheckoutForm.module.css';

const CheckoutForm = (props) => {
    const isValueEmpty = (value) => value.trim() !== '';

    const {
        value: firstName,
        setIsTouched: setFirstNameIsTouched,
        hasError: firstNameTouchedAndHasError,
        onChangeHandler: onFirstNameChangeHandler,
        onBlurHandler: onFirstNameBlurHandler,
        reset: resetFirstName,
        inputClasses: firstNameInputClasses,
    } = useInput(isValueEmpty)

    const {
        value: lastName,
        setIsTouched: setLastNameIsTouched,
        hasError: lastNameTouchedAndHasError,
        onChangeHandler: onLastNameChangeHandler,
        onBlurHandler: onLastNameBlurHandler,
        reset: resetLastName,
        inputClasses: lastNameInputClasses,
    } = useInput(isValueEmpty)

    // If no errors
    const validForm = !firstNameTouchedAndHasError && !lastNameTouchedAndHasError;

    const ctrlClass = 'control-group';

    // const {
    //     value: firstName,
    //     setIsTouched: setFirstNameIsTouched,
    //     hasError: firstNameHasError,
    //     onChangeHandler: onFirstNameChangeHandler,
    //     onBlurHandler: onFirstNameBlurHandler,
    //     reset: resetFirstName,
    //     inputClasses: firstNameInputClasses,
    //     inputRef: firstNameInputRef
    // } = useInput(isValueEmpty)

    const submitHandler = (event) => {
        event.preventDefault();

        // Touch fields first to see errors
        setFirstNameIsTouched(true);
        setLastNameIsTouched(true);

        if (!validForm) {
            return;
        }

        // Submit the order in parent
        props.sendOrderHandler();

        // Reset names
        resetFirstName();
        resetLastName();
    }

    return (
        <form onSubmit={submitHandler}>
            <div className={classes[ctrlClass]}>
                <div className={classes[firstNameInputClasses]}>
                    <Input
                        label='First Name'
                        input={{
                            id: 'firstName',
                            type: 'text',
                            onChange: onFirstNameChangeHandler,
                            onBlur: onFirstNameBlurHandler,
                            value: firstName
                        }}
                    />
                    {firstNameTouchedAndHasError && <p className={classes['error-text']}>Please enter a valid first name.</p>}
                </div>
                <div className={classes[lastNameInputClasses]}>
                    <Input
                        label='Last Name'
                        input={{
                            id: 'lastName',
                            type: 'text',
                            onChange: onLastNameChangeHandler,
                            onBlur: onLastNameBlurHandler,
                            value: lastName
                        }}
                    />
                    {lastNameTouchedAndHasError && <p className={classes['error-text']}>Please enter a valid last name.</p>}
                </div>
            </div>
            <button disabled={!validForm}>Order</button>
        </form>
    );
}

export default CheckoutForm;