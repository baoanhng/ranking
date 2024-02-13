import { useState, useEffect, useRef } from "react";
import { Tour } from 'antd';

import VoteHeader from "./VoteHeader";
import ListComponent from "./ListComponent";
import { lnList } from "./NovelData/NovelList";
import Transition from "../../components/Transition";
import Footer from "../../components/Footer";
import SendResult from "./SendResult";


function Vote() {

    const ref1 = useRef(null);
    const ref2 = useRef(null);

    const tourTitleStyles = {
        fontFamily: "Lexend",
        fontWeight: 800,
        fontSize: "15px"
    }

    const tourDesStyles = {
        fontFamily: "Lexend",
        fontWeight: 400,
    }

    const [open, setOpen] = useState(false);
    const steps = [
        {
            title: <span style={tourTitleStyles}>Hạng mục trước đó</span>,
            description: <p style={tourDesStyles}>Nhấn vào nút này để chuyển sang hạng mục bình chọn trước đó.<br /><em>Hiện tại đang ở hạng mục đầu tiên!</em></p>,
            // cover: (
            //     <img
            //         alt="tour.png"
            //         src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
            //     />
            // ),
            target: () => ref1.current,
            nextButtonProps: { children: "Tiếp" },
        },
        {
            title: <span style={tourTitleStyles}>Hạng mục kế tiếp</span>,
            description: <p style={tourDesStyles}>Nhấn vào nút này để chuyển sang hạng mục bình chọn tiếp theo!</p>,
            target: () => ref2.current,
            prevButtonProps: { children: "Trước" },
            nextButtonProps: { children: "Xong" },
        },
    ];

    useEffect(() => {
        const timeout = setTimeout(() => {
            setOpen(true);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    const [currentComponent, setCurrentComponent] = useState(0);

    //------------Get selected items from each category
    const [selectedItems, setSelectedItems] = useState([]);
    const handleChildSelection = (category, title, selectedItemsFromChild) => {
        setSelectedItems((prevSelectedItems) => {
            const updatedSelectedItems = [...prevSelectedItems];
            const existingIndex = updatedSelectedItems.findIndex(item => item.category === category);

            if (existingIndex !== -1) {
                // Update existing item
                updatedSelectedItems[existingIndex] = {
                    name: title,
                    category: category,
                    chosenItems: selectedItemsFromChild
                };
            } else {
                // Add new item
                updatedSelectedItems.push({
                    name: title,
                    category: category,
                    chosenItems: selectedItemsFromChild
                });
            }

            return updatedSelectedItems;
        });
    };

    useEffect(() => {
        console.log(JSON.stringify(selectedItems))
    }, [selectedItems])
    //---------------End


    //---------------Change category component
    const handleNext = () => {
        if (currentComponent < components.length - 1) {
            setCurrentComponent(currentComponent + 1);
        }
    };

    const handlePrevious = () => {
        if (currentComponent > 0) {
            setCurrentComponent(currentComponent - 1);
        }
    };
    //-----------------End

    const components = [
        <ListComponent
            id="1"
            title="Light Novel được yêu thích nhất"
            description="Với 203 lựa chọn, chắc hẵn sẽ có nhiều người không muốn chỉ vote 1 vài tựa. Như các main harem đã nói: 'Chỉ con nít mới lựa chọn, tao chơi tất'. Đúng vậy, thay vì chọn 1 các cháu có thể lựa chọn nhiều ( à thì TỐI ĐA LÀ 10 để tránh loãng nhé )"
            listData={lnList}
            maxItems={3}
            notification="Bạn chỉ được chọn tối đa 3 tựa sách cho hạng mục này!"
            category="mostFavorite"
            onSelectionChange={handleChildSelection}

        />,
        <ListComponent
            id="2"
            title="Light Novel được mong chờ nhất"
            description="Với 203 lựa chọn, chắc hẵn sẽ có nhiều người không muốn chỉ vote 1 vài tựa. Như các main harem đã nói: 'Chỉ con nít mới lựa chọn, tao chơi tất'. Đúng vậy, thay vì chọn 1 các cháu có thể lựa chọn nhiều ( à thì TỐI ĐA LÀ 10 để tránh loãng nhé )"
            listData={lnList}
            maxItems={2}
            notification="Bạn chỉ được chọn tối đa 2 tựa sách cho hạng mục này!"
            category="mostExpected"
            onSelectionChange={handleChildSelection}
        />,
        <ListComponent
            id="3"
            title="Light Novel được mong chờ nhất"
            description="Với 203 lựa chọn, chắc hẵn sẽ có nhiều người không muốn chỉ vote 1 vài tựa. Như các main harem đã nói: 'Chỉ con nít mới lựa chọn, tao chơi tất'. Đúng vậy, thay vì chọn 1 các cháu có thể lựa chọn nhiều ( à thì TỐI ĐA LÀ 10 để tránh loãng nhé )"
            listData={lnList}
            maxItems={1}
            notification="Bạn chỉ được chọn tối đa 2 tựa sách cho hạng mục này!"
            category="mostTest"
            onSelectionChange={handleChildSelection}
        />,
        <SendResult result={selectedItems} />,
    ];

    const isLastComponent = currentComponent === components.length - 1;

    //---------Scroll to top
    const [isVisible, setIsVisible] = useState(false);
    const handleScroll = () => setIsVisible(window.scrollY > 400);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    //----------End

    const [contentMouted, setContentMounted] = useState(false)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setContentMounted(true);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    //Hide Tour when width < 600px
    const [shouldHide, setShouldHide] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setShouldHide(window.innerWidth < 600);
        };

        window.addEventListener('resize', handleResize);
        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <Transition />
            {contentMouted && <div>
                <VoteHeader />
                <div className="voteContainer">
                    {components[currentComponent]}
                    <button
                        className={currentComponent === 0 ? "inactivate" : ""}
                        id="btnPrev"
                        onClick={handlePrevious}
                        ref={ref1}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <button
                        className={isLastComponent ? "inactivate" : ""}
                        id="btnNext"
                        onClick={handleNext}
                        ref={ref2}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                    <button
                        id="toTop"
                        onClick={scrollToTop}
                        style={{
                            display: isVisible ? 'block' : 'none',
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                        </svg>
                    </button>
                </div>
                {shouldHide ? null : <Tour
                    open={open}
                    onClose={() => setOpen(false)}
                    steps={steps}
                />}
                <Footer />
            </div>}
        </div>
    );
}

export default Vote;