import { useEffect, useRef } from 'react';

const useInterval = (callback, intervalTime) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (intervalTime) {
            const interval = setInterval(savedCallback.current, intervalTime);
            const cleanUp = () => clearInterval(interval);

            return cleanUp;
        }
    }, [intervalTime]);
};

export default useInterval;
