import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";

import "./Media.scss"
import SectionTitle from "../../../components/SectionTitle"
import { mediaList } from "./Media";

gsap.registerPlugin(ScrollTrigger);

function Media() {

    useEffect(() => {
        const textElements = gsap.utils.toArray('.mediaItem');
        textElements.forEach(text => {
            gsap.fromTo(text, {
                x: -1000,
                opacity: 0
            }, {
                x: 0,
                opacity: 1,
                scrollTrigger: {
                    trigger: text,
                    end: 'top 50%',
                    scrub: true,
                },
            });
        })
    }, [])


    const mediaRef = useRef(null);
    // useEffect(() => {
    //     const el = mediaRef.current;
    //     gsap.fromTo(el, {
    //         x: -500,
    //         opacity: 0
    //     }, {
    //         x: 0,
    //         opacity: 1,
    //         scrollTrigger: {
    //             trigger: el,
    //             end: 'top 30%',
    //             scrub: true,
    //         },
    //     });
    // }, [])

    return (
        <div className="wrapper media">
            <SectionTitle
                title="Truyền Thông"
                description="Các bên hỗ trợ truyền thông cho bảng xếp hạng!"
            />
            <div className="mediaContent" ref={mediaRef}>
                {mediaList.map((media, index) => (
                    <div key={index} className="mediaItem">
                        <img
                            onClick={() => window.open(media.url, '_blank')}
                            alt=""
                            src={media.avatar}
                        />
                        <p>@{media.username}</p>
                        <p className="fullName">{media.name}</p>
                    </div>))}
            </div>
        </div>
    );
}

export default Media;