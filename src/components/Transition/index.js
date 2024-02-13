import { useSpring, animated } from '@react-spring/web';
import { useState, useEffect } from 'react';

import './Transition.scss';

function Transition() {

    const [shouldUnmount, setShouldUnmount] = useState(false);

    const propsLeft = useSpring({
        from: { transform: 'translateX(0)' },
        to: { transform: 'translateX(-100%)' },
        config: { tension: 250, friction: 10 },
        delay: 500
    });

    const propsRight = useSpring({
        from: { transform: 'translateX(0)' },
        to: { transform: 'translateX(100%)' },
        config: { tension: 250, friction: 10 },
        delay: 500
    });

    const propsTrans = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 300 },
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShouldUnmount(true);
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, []);

    return shouldUnmount ? null : (
        <animated.div style={propsTrans} className="transition">
            <div className='splashTextBG'>
                <animated.div className='left' style={propsLeft}>
                    <span>Vietnam</span>
                    <span>Light Novel</span>
                    <span>Ranking</span>
                </animated.div>
                <animated.div className='right' style={propsRight}>
                    <span>BXH</span>
                    <span>Light Novel</span>
                    <span>Việt Nam</span>
                </animated.div>
            </div>
        </animated.div>
    );
}

export default Transition;