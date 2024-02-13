import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";

import "./SectionTitle.scss"

gsap.registerPlugin(ScrollTrigger);


function SectionTitle({ title, description }) {

    const titleRef = useRef(null);

    useEffect(() => {
        const el = titleRef.current;
        gsap.fromTo(el, {
            y: -200,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: el,
                end: 'top 50%',
                scrub: true
            },
        });
    }, [])

    return (
        <div className="sectionTitle">
            <div className="sectionTitleContent" ref={titleRef}>
                <h1><span>{title}</span></h1>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default SectionTitle;