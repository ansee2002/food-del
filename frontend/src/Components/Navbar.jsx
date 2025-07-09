import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../assets/frontend_assets/assets';
import { Link, useNavigate }    from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';

  const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu]=useState("menu");
  const { getTotalCartAmount, token, setToken }  = useContext(StoreContext);

  const navigate = useNavigate();

  const logout =() => {
     localStorage.removeItem("token");
     setToken("");
     navigate("/")
  };
  

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
   <ul className="navbar-menu">
  <Link to={'/'} onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
  <a href='#explore-menu'  onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
  <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
  <a href='#footer' onClick={()=>setMenu("contact us")} className={menu==="contact us"?"active":""}>contact us</a>
</ul>
<div className="navbar-right">
<img src={assets.search_icon} alt=""/>
    <div className="navbar-search-icon">
        <Link to='/cart'><img src={assets.basket_icon} alt=""/></Link>
        <div className={getTotalCartAmount() === 0 ?"":"dot"}></div>
    </div>
    {!token?<button onClick={() => setShowLogin(true)}>Sign in</button>
    :<div className='navbar-profile'>
      <img src={assets.profile_icon} alt="" />
      <ul className='nav-profile-dropdown'>
        <li onClick={()=>navigate('/myorders')} ><img src={assets.bag_icon} alt="image not found" /><p>Orders</p></li>
        <hr />
        {/* Added the Address Page Link */}
        <li onClick={() => navigate('/address')}><img src={assets.location_icon} alt="Address" style={{width:'20px', height:'20px'}} /><p>Address</p></li>
              <hr />
              <li onClick={() => navigate('/profile')}><img src={assets.profile_icon} alt="Profile" style={{width:'20px', height:'20px'}} /><p>Profile</p></li>
              <hr />
              <li onClick={() => navigate('/reviewed-foods')}><img src={assets.rating_starts} alt="Reviews" style={{width:'20px', height:'20px'}} /><p>Reviews</p></li>
              < hr />

        <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
      </ul>
      </div>}
</div>
</div>
  );
};

export default Navbar;