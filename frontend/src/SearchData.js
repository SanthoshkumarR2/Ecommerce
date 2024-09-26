import { useSearch } from "./Context/Search.js";
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import {useState,useEffect,useContext} from "react"
import { useNavigate } from "react-router-dom";
import CardMedia from '@mui/material/CardMedia';
import "./App.css"

 function SearchData(){
    const [values, setValues] = useSearch();
    console.log(values)
    const navigate = useNavigate()

   
    return(
        <div className='search-container'>
        { values.results && values.results.length > 0 ? 
            values.results.map((ele, index) => {
                return (
    <Card sx={{ maxWidth: '30%', height: '90%'}}>
      <CardMedia
        sx={{ height: 300, objectFit:'cover' }}
        image={ele.productImage}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {ele.productName}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
        Rs.{ele.price}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {ele.description}
        </Typography>
      </CardContent>
      
      <CardContent>
      <Typography gutterBottom variant="h6" component="div">
        {ele.quantity < 1 ? <p className="alert">"Out of Stock..!"</p> : (ele.quantity <=5 ? <p className="alert2">Hurry {ele.quantity} pieces only left !</p> : null)}
        </Typography>
        </CardContent>
    </Card>
                );
            }) 
            : <div className="msg">"No Product Found..!" </div>
        }
    </div>
    
    )
 }
 export default SearchData;