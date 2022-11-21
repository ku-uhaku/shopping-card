import React, { useContext } from "react";
import Shopping from "../context/Shopping";
import { BsTrash } from "react-icons/bs";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import Swal from "sweetalert2";
const TotalCard = () => {
    const { card, setCard, deleteItem, incrementQ, decrementQ } =
        useContext(Shopping);
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12">
                        <table className="table table-bordered my-3">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {card.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                width={100}
                                            />
                                        </td>
                                        <td>${item.price}</td>
                                        <td>
                                            <div className="btn">
                                                <BiUpArrow
                                                    onClick={() =>
                                                        incrementQ(item)
                                                    }
                                                />
                                            </div>
                                            <span className="mx-1">
                                                {item.quantity}
                                            </span>
                                            <div className="btn">
                                                <BiDownArrow
                                                    onClick={() =>
                                                        decrementQ(item)
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td>${item.price * item.quantity}</td>
                                        <td>
                                            <div className="btn">
                                                <BsTrash
                                                    onClick={() =>
                                                        deleteItem(item)
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="2">Total</td>
                                    <td colSpan="2">
                                        $
                                        {card.reduce(
                                            (total, item) =>
                                                total +
                                                item.price * item.quantity,
                                            0
                                        )}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row ">
                    <div className="col-md-12">
                        <button
                            className="btn btn-danger float-right "
                            onClick={() => {
                                const swalWithBootstrapButtons = Swal.mixin({
                                    customClass: {
                                        confirmButton: "btn btn-success",
                                        cancelButton: "btn btn-danger",
                                    },
                                    buttonsStyling: false,
                                });

                                swalWithBootstrapButtons
                                    .fire({
                                        title: "Are you sure?",
                                        text: "You won't be able to revert this!",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonText: "Yes, delete it!",
                                        cancelButtonText: "No, cancel!",
                                        reverseButtons: true,
                                    })
                                    .then((result) => {
                                        if (result.isConfirmed) {
                                            swalWithBootstrapButtons.fire(
                                                "Deleted!",
                                                "Your file has been deleted.",
                                                "success"
                                            );
                                            setCard([]);
                    localStorage.setItem("cart", JSON.stringify([]));
                                            
                                        } else if (
                                            result.dismiss ===
                                            Swal.DismissReason.cancel
                                        ) {
                                            swalWithBootstrapButtons.fire(
                                                "Cancelled",
                                                "Your imaginary file is safe :)",
                                                "error"
                                            );
                                        }
                                    });
                            }}>
                            Clear card
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TotalCard;
