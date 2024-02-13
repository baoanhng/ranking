import React, { useState, useEffect } from 'react';

import "./VoteHeader.scss"
import voteHalu from "../../../assets/voteHalu.webp"

function VoteHeader() {
    const [imgHeight, setImgHeight] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            const imgElement = document.getElementById('votebanner');
            if (imgElement) {
                const newImgHeight = imgElement.clientHeight;
                setImgHeight(newImgHeight * 0.65);
            }
        };

        window.addEventListener('resize', handleResize);

        const handleImageLoad = () => {
            const imgElement = document.getElementById('votebanner');
            if (imgElement) {
                const newImgHeight = imgElement.clientHeight;
                setImgHeight(newImgHeight * 0.65);
            }
        };

        const imgElement = document.getElementById('votebanner');
        if (imgElement) {
            imgElement.addEventListener('load', handleImageLoad);
        }

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (imgElement) {
                imgElement.removeEventListener('load', handleImageLoad);
            }
        };
    }, []);
    return (
        <div className="voteHeader">
            <img id='votebanner' alt="" src={voteHalu} />
            <div style={{ height: imgHeight }}></div>
        </div>
    );
}

export default VoteHeader;