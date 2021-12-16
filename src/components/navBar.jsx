import React,{useState,useEffect} from "react";
import { Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export const NavBar = () => {
  const { loginWithRedirect,logout, isAuthenticated } = useAuth0();
  const [auxAuth,setAuth]=useState(false)

  useEffect (( )=>{
      isAuthenticated?setAuth(true):setAuth(false)
  },[isAuthenticated])

  return (
    <Nav className='bg-dark d-flex justify-content-around mb-4 nav py-3'>
      <NavItem>
        <Link to="/">Inicio</Link>
      </NavItem>
      <NavItem>
        <Link to="/usuarios">Usuarios</Link>
      </NavItem>
      <NavItem>
        <Link to="/proyectos">Proyectos</Link>
      </NavItem>
      <NavItem>
          {!auxAuth ? <button onClick={() => loginWithRedirect()} className="btn btn-outline-light">Iniciar Sesión</button> :
          <button  onClick={() => logout({ returnTo: window.location.origin })} className="btn btn-outline-light"> Cerrar Sesión</button>}
      </NavItem>
    </Nav>
  );
};
