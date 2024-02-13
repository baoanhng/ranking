import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useLayoutEffect } from "react";

import "./LastTop10.scss"
import gold from "../../../assets/gold.png"
import silver from "../../../assets/silver.png"
import bronze from "../../../assets/bronze.png"

gsap.registerPlugin(ScrollTrigger);

function LastTop10() {

    const component = useRef(null);
    const slider = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            let panels = gsap.utils.toArray(".panel");
            gsap.to(panels, {
                x: -(slider.current.offsetWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: slider.current,
                    pin: true,
                    scrub: 1,
                    start: "top 18%",
                    end: "+=" + (slider.current.offsetWidth),
                    // markers: true
                }
            });
        }, component);
        return () => ctx.revert();
    });


    return (
        <div className="lastTop10">
            <div ref={component}>
                <div className="top10Header">
                    <h1><span>Bảng Xếp Hạng</span></h1>
                    <p>Vinh danh 10 series được bình chọn nhiều nhất cho bảng xếp hạng đợt gần nhất, <strong>nửa cuối năm 2023!</strong></p>
                </div>
                <div ref={slider} className="container">
                    <div className="panel">
                        <div className="panelRank"><img alt="" src={gold} /></div>
                        <img className="panelCover" alt="" src="images/top10/01.jpg" />
                    </div>
                    <div className="panel">
                        <div className="panelRank"><img alt="" src={silver} /></div>
                        <img className="panelCover" alt="" src="images/top10/02.jpg" />
                    </div>
                    <div className="panel">
                        <div className="panelRank"><img alt="" src={bronze} /></div>
                        <img className="panelCover" alt="" src="images/top10/03.jpg" />
                    </div>
                    <div className="panel">
                        <div className="panelRank"><span>#4</span></div>
                        <img className="panelCover" alt="" src="images/top10/04.jpg" />
                    </div>
                    <div className="panel">
                        <div className="panelRank"><span>#5</span></div>
                        <img className="panelCover" alt="" src="images/top10/05.jpg" />
                    </div>
                    <div className="panel">
                        <div className="panelRank"><span>#6</span></div>
                        <img className="panelCover" alt="" src="images/top10/06.jpg" />
                    </div>
                    <div className="panel">
                        <div className="panelRank"><span>#7</span></div>
                        <img className="panelCover" alt="" src="images/top10/07.jpg" />
                    </div>
                    <div className="panel">
                        <div className="panelRank"><span>#8</span></div>
                        <img className="panelCover" alt="" src="images/top10/08.jpg" />
                    </div>
                    <div className="panel">
                        <div className="panelRank"><span>#9</span></div>
                        <img className="panelCover" alt="" src="images/top10/09.jpg" />
                    </div>
                    <div className="panel">
                        <div className="panelRank"><span>#10</span></div>
                        <img className="panelCover" alt="" src="images/top10/10.jpg" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LastTop10;