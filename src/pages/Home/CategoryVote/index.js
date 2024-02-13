import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";

import "./CategoryVote.scss"
import SectionTitle from "../../../components/SectionTitle"
import haruhi from "../../../assets/haruhi.webp"

gsap.registerPlugin(ScrollTrigger);

function CategoryVote() {

    const categories = [
        "Light Novel được yêu thích nhất",
        "Light Novel được mong chờ nhất",
        "Light Novel được yêu thích nhất",
        "Light Novel được yêu thích nhất",
        "Light Novel được yêu thích nhất",
        "Light Novel được yêu thích nhất",
        "Light Novel được yêu thích nhất",
    ]

    useEffect(() => {
        const textElements = gsap.utils.toArray('.categoryItem');
        textElements.forEach(text => {
            gsap.fromTo(text, {
                x: 500,
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
    useEffect(() => {
        const el = mediaRef.current;
        gsap.fromTo(el, {
            x: -500,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: el,
                end: 'top 30%',
                scrub: true,
            },
        });
    }, [])

    return (
        <div className=" wrapper categoryVote">
            <SectionTitle
                title="Hạng Mục"
                description="Những hạng mục bình chọn cho bảng xếp hạng năm nay!"
            />
            <div className="categoryContainer">
                <div className="categoryImg" ref={mediaRef}>
                    <img id="haruhi" alt="" src={haruhi} />
                </div>
                <div className="categoryText">
                    {categories.map((category, index) => (
                        <div className="categoryItem" key={index}>
                            <div className="categoryIndex">0{index + 1}</div>
                            <div className="categoryName">
                                <p>{category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CategoryVote;