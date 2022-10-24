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
                            <div>
                                <div className={classes['lds-text']}>{props.loadingMessage ? props.loadingMessage : 'Loading...'}</div>
                                <div className={classes['lds-circle']}><div></div></div>
                            </div>
                        </div>
                    </Fragment>, portalElement)
            }
        </Fragment>
    )
};

export default LoadingSpinner;