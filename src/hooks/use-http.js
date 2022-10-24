import { useState, useCallback } from 'react';
import { promiseSleep } from '../test-helpers/promiseSleep';

const useHttp = (url, options) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const httpRequest = useCallback(async (requestConfig, successCallback) => {
        setIsLoading(true);

        try {
            const response = await fetch(
                requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                header: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
            });

            // To simulate slow API. Not for PROD of course.
            await promiseSleep(2000);

            if (!response.ok) {
                throw Error('Request failed');
            }

            const data = await response.json();

            // If all went well perform the success callback, giving the data returned
            successCallback(data);

        } catch (error) {
            setError(error.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [])

    return {
        isLoading,
        error,
        httpRequest
    }
};

export default useHttp;
