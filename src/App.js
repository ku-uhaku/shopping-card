import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import Shopping from "./context/Shopping";
import ProductList from "./data/ProductList";
import { useState } from "react";
import TotalCard from "./Components/TotalCard";
import Swal from "sweetalert2";

function App() {
    const [card, setCard] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    );
    const addToCard = (item) => {
        let cardItem = card.find((eleCard) => item.id === eleCard.id);

        if (!cardItem) {
            item.quantity = 1;
            setCard([item, ...card]);
        } else {
            item.quantity += 1;
            setCard([...card]);
        }
    };

    const saveToStorage = () => {
        localStorage.setItem("cart", JSON.stringify(card));
    };
    const incrementQ = (incitem) => {
        incitem.quantity += 1;
        setCard([...card]);
        localStorage.setItem("cart", JSON.stringify(card));
    };
    const decrementQ = (decitem) => {
        if (decitem.quantity <= 1) {
            let newCard = card.filter((eleFiltered) => {
                return eleFiltered.id !== decitem.id;
            });

            setCard(newCard);
        localStorage.setItem("cart", JSON.stringify(newCard));

        } else {
            decitem.quantity -= 1;
            setCard([...card]);
        localStorage.setItem("cart", JSON.stringify(card));

        }
    };

    const deleteItem = (delItem) => {
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
                        "Your product has been removed.",
                        "success"
                    );
                    let newCard = card.filter((eleFiltered) => {
                        return eleFiltered.id !== delItem.id;
                    });
                    setCard(newCard);
                    localStorage.setItem("cart", JSON.stringify(newCard));
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        "Cancelled",
                        "Your  product has been safe :)",
                        "error"
                    );
                }
            });
    };

    return (
        <BrowserRouter>
            <Shopping.Provider
                value={{
                    ProductList,
                    addToCard,
                    card,
                    setCard,
                    deleteItem,
                    decrementQ,
                    incrementQ,
                    saveToStorage,
                }}>
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/card" element={<TotalCard />}></Route>
                </Routes>
            </Shopping.Provider>
        </BrowserRouter>
    );
}

export default App;
