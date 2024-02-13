import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";

import "./Comment.scss"
import { commentsList } from './Comment';
import SectionTitle from '../../../components/SectionTitle';

gsap.registerPlugin(ScrollTrigger);


function Comment() {

    const commentRef = useRef(null);
    useEffect(() => {
        const el = commentRef.current;
        gsap.fromTo(el, {
            x: 500,
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
        <div className="comment">
            <SectionTitle
                title={"Bình Luận"}
                description={"Phần bình luận từ các bên được phỏng vấn. Kéo sang trái/phải để xem nội dung kế tiếp!"}
            />
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                loop={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
                ref={commentRef}
            >
                {commentsList.map((comment, index) => (
                    <SwiperSlide key={index}>
                        <div className='avatar'>
                            <img alt='' src={comment.avatar} />
                            <p>@{comment.username}</p>
                        </div>
                        <p className='content'>{comment.content}</p>
                        <span>━ <span className='author'>{comment.author}</span> ━</span>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Comment;