import classes from './LoadingSpinner.module.css';
import { Fragment } from 'react';
import ReactDOM from 'react-dom';

const portalElement = document.getElementById('loading-spinner');

const LoadingSpinner = (props) => {
    return (
        <Fragment>
            {
                ReactDOM.createPortal(
                    <Fragment>
                        <div className={classes['lds-backdrop']}>
                            <div className={classes['lds-circle']}>Loading...<div></div></div>
                        </div>
                    </Fragment>, portalElement)
            }
        </Fragment>
    )
};

export default LoadingSpinner;