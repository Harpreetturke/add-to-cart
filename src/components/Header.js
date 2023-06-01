import React, { useEffect, useState } from "react";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Nav from 'react-bootstrap/Nav'
import {Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADD, DLT, REMOVE } from "../redux/actions/action";
const Header = () => {

 const [price,setPrice]=useState(0);
 //console.log(price);
  //useSelector hmara jo v reducer hoga uske ander se state ki value get krna ki help kraga
  const getdata = useSelector((state) => state.cartreducer.carts);
  console.log(getdata);
  const dispatch = useDispatch();
  // const handleclick1=(e)=>{
  //   e.qnty+1;
  // }
  

  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const send = (e) => {
    //console.log(e);
    //function nu trigger krn lyi dispatch use krde aa
  dispatch(ADD(e));

  }

  const dlt =(id) =>{
    dispatch(DLT(id))
    // history("/");
  }
//remove one
const remove =(item)=>{
    dispatch(REMOVE(item))
}

const total= ()=>{
  let price=0;
  getdata.map((ele,k)=>{
    price = ele.price * ele.qnty + price
  });
  setPrice(price);
};


useEffect(()=>{
  total();
},[total])

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-3">Cart Application</NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light">Home</NavLink>
            
          </Nav>
   
          <Badge badgeContent={getdata.length} color="primary"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >


            <i className="fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: "pointer" }}></i>
          </Badge>
        </Container>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >

          {
            getdata.length ?
              <div className="card_details" style={{ width: "24rem", padding:10}}>
                <Table>
                  <thead>
                    <tr>
                    <th>Photo</th>
                    <th>Restaurant Name</th>
                    </tr>
                  </thead>
                 <tbody>
                  {
                    getdata.map((e)=>{
                      
                      return(
                        <>
                        <tr>
                          <td>
                         <NavLink to={`/cart/${e.id}`} 
          onClick={handleClose}> 
                         <img src={e.imgdata} style={{width:"5rem",height:"5rem"}}/>
                         </NavLink>
                          </td>
                          
                          <td>
                            <p>{e.rname}</p>
                            <p>Price : ₹{e.price}</p>
                            <p>Quantity :
                            <i className="fa fa-plus" aria-hidden="true" onClick={()=>send(e)}></i>
                             {e.qnty} 
                              <i className="fa fa-minus" aria-hidden="true" onClick={()=>remove(e)} ></i> 
                             </p>
                            <p style={{color:"red",fontSize:20,cursor:"pointer"}} onClick={()=>dlt(e.id)}>
                              <i className="fas fa-trash smalltrash"></i>
                            </p>
                          </td>
                          <td className="mt-5" style={{color:"red",fontSize:20,cursor:"pointer"}} onClick={()=>dlt(e.id)}>
                          <i className="fas fa-trash largetrash" ></i>
                          </td>
                        </tr>
                        </>
                      )
                    })
                  }
                  <p className="text-center">Total : ₹{price}</p>
                 </tbody>
                </Table>
              </div> :
              <div className="card_details d-flex justify-content-center align-items-center" style={{ width: "24rem", padding: 10, position: "relative" }}>
                <i className="fas fa-close smallclose"
                  onClick={handleClose}
                  style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }}></i>
                <p style={{ fontSize: 22 }}>Your cart is empty</p>
                <img src="https://media3.giphy.com/media/jtECu4KjK3cqiAUMyR/200w.gif?cid=6c09b952bejnhwrhxp0eg02vvpm9yco092o5o037feen21a1&rid=200w.gif&ct=g" alt="" className="emptycart_img" style={{ width: "5rem", padding: 10 }} />
              </div>
          }

        </Menu>
      </Navbar>
    </>
  )
}
export default Header;