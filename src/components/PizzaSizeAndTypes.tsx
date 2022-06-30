import React, { FC } from "react";
import { useSelector } from "react-redux";
import { selectPizza } from "../store/slices/pizzaSlice";

type SizeAndTypesProps = {
    sizes: [size: { size: number }];
    pizzaTypes: number[];
    sizeActive: number;
    setSizeActive: (i: number) => void;
    typeActive: number;
    setTypeActive: (i: number) => void;
};

const PizzaSizeAndTypes: FC<SizeAndTypesProps> = ({
    sizes,
    pizzaTypes,
    sizeActive,
    setSizeActive,
    typeActive,
    setTypeActive,
}) => {
    const { pizzaEdges } = useSelector(selectPizza);

    return (
        <div className="pizza-block__selector">
            <ul>
                {sizes.map((size, i) => (
                    <li
                        onClick={() => setSizeActive(i)}
                        className={sizeActive === i ? "active" : ""}
                        key={i}
                    >
                        {size.size} см.
                    </li>
                ))}
            </ul>

            <p className="edges">Бортик</p>
            <ul>
                {pizzaTypes.map((type, i) => (
                    <li
                        onClick={() => setTypeActive(i)}
                        className={typeActive === i ? "active" : ""}
                        key={i}
                    >
                        {pizzaEdges[type]}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PizzaSizeAndTypes;
