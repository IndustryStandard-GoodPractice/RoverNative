import { useState, useCallback, useEffect, useRef } from 'react';

const useComponentSize = () => {
    const [size, setSize] = useState({ height: 360, width: 360 });

    const onLayout = useCallback(event => {
        const { width, height } = event.nativeEvent.layout;
        setSize({ width, height });
    }, [size]);

    return [size, onLayout];
};

export default useComponentSize;