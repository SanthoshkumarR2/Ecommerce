import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { API } from "../Global";

function GetCartItems() {
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const value = await fetch(`${API}/cart/allCartItems/${userId}`, {
      method: "GET",
    });

    const res = await value.json();

    // Filter out any items where cartItems or price are missing
    const validItems = res.filter(item => item.cartItems && item.cartItems.price);

    const Qty = {};
    validItems.forEach((item) => {
      Qty[item._id] = 1;
    });
    setQuantity(Qty);

    updateTotalAmount(validItems, Qty);
    setData(validItems);
  };

  const removeItem = async (id) => {
    const value = await fetch(`${API}/cart/${id}`, {
      method: "DELETE",
    });

    const res = await value.json();

    if (value.status === 200) {
      alert(res.message);
      getItems();
    }
  };

  const decrease = (id) => {
    if (quantity[id] > 0) {
      setQuantity((prev) => {
        const newQty = { ...prev };
        newQty[id] -= 1;
        updateTotalAmount(data, newQty);
        return newQty;
      });
    }
  };

  const increase = (id, stockQty) => {
    let remainQty = stockQty - quantity[id];

    if (remainQty >= 1) {
      setQuantity((prev) => {
        const newQty = { ...prev };
        newQty[id] += 1;
        updateTotalAmount(data, newQty);
        return newQty;
      });
    } else {
      alert("There is no enough Quantity");
    }
  };

  const updateTotalAmount = (items, qty) => {
    const newTotal = items.reduce((acc, cv) => {
      // Ensure cv.cartItems and cv.cartItems.price are valid
      if (cv.cartItems && cv.cartItems.price) {
        const quantity = qty[cv._id] || 1;  // Default quantity to 1 if not defined
        const amount = cv.cartItems.price * quantity;
        return acc + amount;
      }
      return acc; // Skip items with missing data
    }, 0);

    setTotalAmount(newTotal);
  };

  const makeOrder = async () => {
    let items = data && data.map((ele) => ele.cartItems._id);

    let detail = {
      allItems: items,
      orderBy: userId,
      amount: totalAmount,
      QtyById: quantity,
    };

    const createData = await fetch(`${API}/order/create`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(detail),
    });

    const res = await createData.json();

    if (createData.status === 200) {
      alert(res.message);
      EmptyTheCart();
    } else {
      alert(res.message);
    }
  };

  const EmptyTheCart = async () => {
    const remove = await fetch(`${API}/cart/emptyTheCart/${userId}`, {
      method: "DELETE",
    });

    const res = await remove.json();

    if (remove.status === 200) {
      getItems();
    }
  };

  return (
    <div className="cart-container">
      {data.length > 0 &&
        data.map((ele, index) => (
          <div key={index} className="cart-items">
            {ele.cartItems && (
              <div>
                <div>ProductName: {ele.cartItems.productName}</div>
                <div>Category: {ele.cartItems.categoryName}</div>
                <div>Price: {ele.cartItems.price}</div>
                <div>
                  Quantity:{" "}
                  <button className="dec-qty-btn" onClick={() => decrease(ele._id)}>
                    -
                  </button>
                  {quantity[ele._id]}
                  <button
                    className="inc-qty-btn"
                    onClick={() => increase(ele._id, ele.cartItems.quantity)}
                  >
                    +
                  </button>
                </div>
              </div>
            )}
            <div>
              <button onClick={() => removeItem(ele._id)} className="remove-cart-btn">
                Remove from cart
              </button>
              {ele.cartItems && (
                <div>Amount: {ele.cartItems.price * quantity[ele._id]}</div>
              )}
            </div>
          </div>
        ))}
      <div className="cart-items">
        <div>Total Amount: Rs.{totalAmount}</div>

        <Button variant="contained" onClick={makeOrder}>
          Process Order
        </Button>
      </div>
    </div>
  );
}

export default GetCartItems;
