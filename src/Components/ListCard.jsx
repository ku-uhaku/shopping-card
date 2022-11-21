import Card from "./Card";
import React, { useContext } from "react";
import Shopping from "../context/Shopping";

const ListCard = () => {
    const { ProductList } = useContext(Shopping);

    return (
        <div className="row d-flex ">
            {ProductList.map((Product) => (
                <Card key={Product.id} product={Product} />
            ))}
        </div>
    );
};

export default ListCard;
