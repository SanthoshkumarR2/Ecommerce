import { useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { API } from "../Global";


 function GetSingleProduct(){

    const [data,setData] = useState([])
    const {id} = useParams();

    useEffect(()=>{
      getSingle()
    },[])

    const getSingle =async()=>{
        
       try{
        const data = await fetch(`${API}/product/singleProduct/${id}`,{
            method : "GET"
        })

        const res = await data.json()
        if(data.status == 200){
            setData([res])
        }
       }catch(err){
         console.log(err.message)
       }

    }
     console.log(data)
    return(
        <div className="single-data-container">
           {data.map((ele)=>{
             return(
                <Card sx={{ maxWidth: 500 }}>
                <CardMedia
                  sx={{ height: 450 }}
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
                  {ele.quantity < 1 ? <p className="alert">"Out of stock..!"</p> : (ele.quantity <=5 ? <p className="alert2">Hurry {ele.quantity} pieces only left !</p> : null)}
                  </Typography>
                  </CardContent>
              </Card>
             )
           })}
        </div>
    )
 }
 export default GetSingleProduct;