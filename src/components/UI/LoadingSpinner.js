import classes from './LoadingSpinner.module.css';

// TODO: Finish loading spinner by adding using portals and adding it into the root dom node
const LoadingSpinner = props => {
    return <div className={classes['lds-circle']}>LOADING NOW......</div>
};

export default LoadingSpinner;