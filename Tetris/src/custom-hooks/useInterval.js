import { useEffect, useRef } from 'react';

const useInterval = (callback, intervalTime, deps = []) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (intervalTime) {
            const interval = setInterval(savedCallback.current, intervalTime);

            return () => clearInterval(interval);
        }
    }, [intervalTime, ...deps]);
};

export default useInterval;
