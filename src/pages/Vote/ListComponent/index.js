import React, { useRef, useState, useEffect } from "react";
import { Tooltip } from 'antd';

import "./ListComponent.scss";
import Category from "../../../components/Category";
import MessageHub from "../../../components/MessageHub";

function ListComponent({ id, title, description, listData, maxItems, notification, category, onSelectionChange }) {
    const [chosenItems, setChosenItems] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [showSelected, setShowSelected] = useState(false);

    //---------------Reset compoent when parent change to next category
    useEffect(() => {
        setChosenItems(JSON.parse(localStorage.getItem(`bxhlnvn_${category}`)) ?? []);
    }, [category]);
    //---------------End

    //---------------Select item logic
    const handleClick = (id) => {
        const isChosen = chosenItems.find(item => item.id === id);
        //Show alert if reach max number of items
        if (chosenItems.length >= maxItems && !isChosen) {
            alertRef.current(notification);
            return;
        }

        const selectedObject = listData.find(item => item.id === id);

        setChosenItems((prev) => {
            const newResult = isChosen ? prev.filter((item) => item.id !== id) : [...prev, selectedObject]
            localStorage.setItem(`bxhlnvn_${category}`, JSON.stringify(newResult))
            return newResult
        });
    };
    //--------------End

    //--------------Pass chosen items to parent component
    useEffect(() => {
        onSelectionChange(category, title, chosenItems);
    }, [chosenItems]);
    //--------------End

    const alertRef = useRef(null);

    //-----------------Search function
    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };
    //Vietnamese accents to Latin
    const removeAccents = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');

    const filteredLnList = listData.filter((ln) =>
        removeAccents(ln.name.toLowerCase()).includes(removeAccents(searchInput.toLowerCase()))
    );
    //-----------------End

    //-----------------Show selected items
    const handleShowSelected = () => {
        setShowSelected(!showSelected);
    };

    const displayList = showSelected ? chosenItems : filteredLnList;
    //------------------End

    return (
        <div className="mostFavoriteLN">
            <Category
                title={id + ". " + title}
                description={description}
            />
            <div className="functionContainer">
                <Tooltip title="Chỉ cần nhập kí tự hoặc từ nào đó, tất cả những tác phẩm trong tên có chứa kí tự hoặc từ đó sẽ xuất hiện bên dưới. Nhập càng đầy đủ càng chính xác.">
                    <input
                        type="text"
                        placeholder="Lọc theo tên bất kể hoa thường dấu hoặc không dấu..."
                        value={searchInput}
                        onChange={handleSearchInputChange}
                    />
                </Tooltip>
                <Tooltip title="Nhấn để hiển thị những tác phẩm mà bạn đang lựa chọn, nhấn một lần nữa để hiển thị lại tất cả.">
                    <button onClick={handleShowSelected}>
                        {showSelected ? <span>Hiển thị <strong>Tất Cả</strong></span> : <span>Hiển thị <strong>Đã Chọn</strong></span>}
                    </button>
                </Tooltip>
            </div>
            <div className="mostFavoriteLNList">
                {displayList.map((ln) => (
                    <div
                        key={ln.id}
                        className={`lnItem ${chosenItems.find(item => item.id === ln.id) ? 'lnChosen' : ''}`}
                        onClick={() => handleClick(ln.id)}
                    >
                        <img alt="" src={`images/ln/${ln.cover}`} />
                        <div className="info">
                            <h4>{ln.name}</h4>
                            <p>NXB: {ln.nxb}</p>
                        </div>
                        <span className="lnID">{ln.id}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                        </svg>
                    </div>
                ))}
            </div>
            <MessageHub>{(msg) => (alertRef.current = msg)}</MessageHub>
        </div>
    );
}

export default ListComponent;
