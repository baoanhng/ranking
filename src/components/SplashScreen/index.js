import { useSpring, useTrail, useSpringRef, useChain, animated } from '@react-spring/web';
import { useState, useEffect } from 'react';

import './SplashScreen.scss';

function SplashScreen() {

    const [visible, setVisible] = useState(false)
    const [shouldUnmount, setShouldUnmount] = useState(false);

    const arrayText = [
        "BẢNG XẾP HẠNG",
        "LIGHT NOVEL",
        "LỚN NHẤT VIỆT NAM",
        "ĐÃ TRỞ LẠI!"
    ]

    const springRef = useSpringRef()
    const springProps = useTrail(4, {
        ref: springRef,
        from: { opacity: 0, transform: 'translateY(-150px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { tension: 250, friction: 10 }
    });

    const transRef = useSpringRef()
    const transProps = useTrail(4, {
        ref: transRef,
        from: { opacity: 1, transform: 'translateY(0)' },
        to: { opacity: 0, transform: 'translateY(150px)' },
        delay: 2000
    });

    const props = useSpring({
        from: { transform: 'translateY(0)' },
        to: { transform: 'translateY(100vh)' },
        config: { tension: 250, friction: 10 },
        delay: 1900
    });

    const propsLeft = useSpring({
        from: { transform: 'translateX(0)' },
        to: { transform: 'translateX(-100%)' },
        config: { tension: 250, friction: 10 },
        delay: 2400
    });

    const propsRight = useSpring({
        from: { transform: 'translateX(0)' },
        to: { transform: 'translateX(100%)' },
        config: { tension: 250, friction: 10 },
        delay: 2400
    });

    useChain([springRef, transRef])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setVisible(true)
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShouldUnmount(true);
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, []);

    return shouldUnmount ? null : (
        <div className="splashScreen">
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
            <animated.div className="splashText" style={props}>
                {!visible && (
                    <>
                        {arrayText.map((text, index) => (
                            <animated.div key={index} style={springProps[index]}>
                                <span>{text}</span>
                            </animated.div>
                        ))}
                    </>
                )}
                {visible && (
                    <>
                        {arrayText.map((text, index) => (
                            <animated.div key={index} style={transProps[index]}>
                                <span>{text}</span>
                            </animated.div>
                        ))}
                    </>
                )}
            </animated.div>
        </div>
    );
}

export default SplashScreen;