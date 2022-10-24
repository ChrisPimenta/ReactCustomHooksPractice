/**
 * Use this to add sleep timers within async functions or promises execution
 * @param ms 
 * @returns A promise
 */
export const promiseSleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
};
