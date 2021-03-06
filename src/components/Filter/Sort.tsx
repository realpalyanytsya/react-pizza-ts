import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFilter, setSortType } from "../../store/slices/filterSlice";

type sortItem = {
    name: string;
    sortProp: string;
};

export const sortTypes: sortItem[] = [
    { name: "за популярністю", sortProp: "rating" },
    { name: "від дорогих до дешевих", sortProp: "price" },
    { name: "від дешевих до дорогих", sortProp: "-price" },
    { name: "за алфавітом", sortProp: "title" },
];

const Sort = () => {
    const [openPopUp, setOpenPopUp] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();
    const { sortType } = useSelector(selectFilter);

    const selectAndHide = (obj: sortItem) => {
        setOpenPopUp(false);
        dispatch(setSortType(obj));
    };

    const hidePopUp = (e: MouseEvent) => {
        const _e = e as MouseEvent & {
            path: Node[];
        };
        if (sortRef.current && !_e.path.includes(sortRef.current)) {
            setOpenPopUp(false);
        }
    };

    useEffect(() => {
        document.body.addEventListener("click", hidePopUp);

        return () => document.body.removeEventListener("click", hidePopUp);
    }, []);

    return (
        <div className="sort" ref={sortRef}>
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортувати:</b>
                <span onClick={() => setOpenPopUp(!openPopUp)}>
                    {sortType.name}
                </span>
            </div>
            {openPopUp && (
                <div className="sort__popup">
                    <ul>
                        {sortTypes.map((obj, i) => (
                            <li
                                key={i}
                                onClick={() => selectAndHide(obj)}
                                className={
                                    sortType.sortProp === obj.sortProp
                                        ? "active"
                                        : ""
                                }
                            >
                                {obj.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Sort;
