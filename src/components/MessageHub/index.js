import React, { useState, useMemo, useEffect } from 'react'
import { useTransition, animated } from '@react-spring/web'

import "./MessageHub.scss"

let id = 0
function MessageHub({ config = { tension: 125, friction: 20, precision: 0.1 }, timeout = 3000, children }) {
    const refMap = useMemo(() => new WeakMap(), [])
    const cancelMap = useMemo(() => new WeakMap(), [])
    const [items, setItems] = useState([])
    const transitions = useTransition(items, {
        from: { opacity: 0, height: 0, life: '100%' },
        keys: item => item.key,
        enter: item => async (next, cancel) => {
            cancelMap.set(item, cancel)
            await next({ opacity: 1, height: refMap.get(item).offsetHeight })
            await next({ life: '0%' })
        },
        leave: [{ opacity: 0 }, { height: 0 }],
        onRest: (result, ctrl, item) => {
            setItems(state =>
                state.filter(i => {
                    return i.key !== item.key
                })
            )
        },
        config: (item, index, phase) => key => phase === 'enter' && key === 'life' ? { duration: timeout } : config,
    })
    useEffect(() => {
        children(msg => {
            setItems(state => [...state, { key: id++, msg }])
        })
    }, [])
    return (
        <div className="notiContainer">
            {transitions(({ life, ...style }, item) => (
                <animated.div className="message" style={style}>
                    <div className='messageContent' ref={ref => ref && refMap.set(item, ref)}>
                        <animated.div className="life" style={{ right: life }} />
                        <p>{item.msg}</p>
                        <button
                            onClick={e => {
                                e.stopPropagation()
                                if (cancelMap.has(item) && life.get() !== '0%') cancelMap.get(item)()
                            }}>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>

                            </div>
                        </button>
                    </div>
                </animated.div>
            ))}
        </div>
    )
}

export default MessageHub;