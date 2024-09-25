import {useState,useEffect} from "react"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { API } from "../Global";

 function GetAllProducts(){

  const [data,setData] = useState("")
  const [checked, setChecked] = useState([]);
  const navigate = useNavigate()

  let category = ["electronics","dress","furnitures","others"]


 
  useEffect(() => {
    if (checked.length){
      filterProperty();
    }else{
      getDatas()
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
   
    const value = await fetch(`${API}/product/product-filter`,{
      method : "POST",
      headers:{
       "Content-Type": "application/json",
      },
      body : JSON.stringify({checked})
    })

    const res = await value.json()

    if(value.status == 200){
        setData(res.datas)
    }
   };

  console.log(data)


  const getDatas = async()=>{

      const value = await fetch(`${API}/product/getAll`,{
        method : "GET"
      })

      const res = await value.json()

      setData(res)
  }


  const addItems = async(id)=>{

    const addItem = await fetch(`${API}/cart/addtocart/${id}`,{
        method : "POST",
        headers : {
            "Content-type" : "application/json"
        }
    })

    const res = await addItem.json()

      if(addItem.status == 200){
         alert(res.message)
      }else if(addItem.status == 403){
        alert(res.message)
      }
  }

     return(
      <>
       
        <div className='card-container'>
            
          <div className='sub1'>
            
            <div className='location-filter'>
              <h5>Category:</h5>
            {category.map((ele)=>{
               return(
                <div className='list'>
                <input
                type='checkbox'
                value={ele}
                onChange={(e)=> handleFilter(e.target.value)}
                />
                <label>{ele}</label>
                </div>
               )
            })}
            </div>
            </div>
          
        <div className="products-container sub2" >
           { data && data.map((ele,index)=>{
              return(
    <Card sx={{ maxWidth: 300 }} className="card" >
      <CardMedia
        sx={{ height: 200 }}
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
        <Typography variant="body2" sx={{ color: 'text.secondary' }} >
        {ele.description.length > 100 ? `${ele.description.substring(0, 100)}...` : ele.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>addItems(ele._id)} disabled={ ele.quantity < 1 ? true : false}>Add to cart</Button>
        <Button size="small" onClick={()=> navigate(`/single/${ele._id}`) }>view</Button>
       
      </CardActions>
      <CardContent>
      <Typography gutterBottom variant="h6" component="div">
        {ele.quantity < 1 ? <p className="alert">"Out of stock..!"</p> : (ele.quantity <=5 ? <p className="alert2">Hurry {ele.quantity} pieces only left !</p> : null)}
        </Typography>
        </CardContent>
    </Card>
              )
           })}
        </div>
        </div> 
        </>
     )
 }

 export default GetAllProducts;