import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import { API } from "../Global";

function GetAllProducts() {
  const [data, setData] = useState("");
  const [checked, setChecked] = useState([]);
  const navigate = useNavigate();

  let category = ["electronics", "dress", "furnitures", "others"];

  useEffect(() => {
    if (checked.length) {
      filterProperty();
    } else {
      getDatas();
    }
  }, [checked]);

  const handleFilter = (value) => {
    let all = [...checked];
    if (!all.includes(value)) {
      all.push(value);
    } else {
      all = all.filter((c) => c !== value);
    }
    setChecked(all);
  };

  const filterProperty = async () => {
    const value = await fetch(`${API}/product/product-filter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked }),
    });

    const res = await value.json();

    if (value.status === 200) {
      setData(res.datas);
    }
  };

  const getDatas = async () => {
    const value = await fetch(`${API}/product/getAll`, {
      method: "GET",
    });

    const res = await value.json();

    setData(res);
  };

  const addItems = async (id) => {
    const addItem = await fetch(`${API}/cart/addtocart/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });

    const res = await addItem.json();

    if (addItem.status === 200) {
      alert(res.message);
    } else if (addItem.status === 403) {
      alert(res.message);
    }
  };

  return (
    <>
      <div className="card-container">
        <div className="sub1">
          <div className="location-filter">
            <h5>Category:</h5>
            {category.map((ele) => (
              <div className="list" key={ele}>
                <input
                  type="checkbox"
                  value={ele}
                  onChange={(e) => handleFilter(e.target.value)}
                />
                <label>{ele}</label>
              </div>
            ))}
          </div>
        </div>

        <Grid container spacing={2} className="products-container sub2">
          {data &&
            data.map((ele, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card className="card">
                  <CardMedia
                    sx={{ height: 200, objectFit: 'cover' }}
                    image={ele.productImage}
                    title={ele.productName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      {ele.productName}
                    </Typography>
                    <Typography gutterBottom variant="h6">
                      Rs.{ele.price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {ele.description.length > 100
                        ? `${ele.description.substring(0, 100)}...`
                        : ele.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => addItems(ele._id)}
                      disabled={ele.quantity < 1}
                    >
                      Add to cart
                    </Button>
                    <Button size="small" onClick={() => navigate(`/single/${ele._id}`)}>
                      View
                    </Button>
                  </CardActions>
                  <CardContent>
                    <Typography variant="h6">
                      {ele.quantity < 1 ? (
                        <p className="alert">"Out of stock..!"</p>
                      ) : (
                        ele.quantity <= 5 && (
                          <p className="alert2">
                            Hurry {ele.quantity} pieces only left!
                          </p>
                        )
                      )}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
    </>
  );
}

export default GetAllProducts;
