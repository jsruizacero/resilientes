import React,{useEffect} from 'react'
import { NavBar } from './navBar'
import { useAuth0} from "@auth0/auth0-react";

export const PageTemplate = ({children}) => {

    const {isAuthenticated, getAccessTokenSilently,logout } = useAuth0();
    useEffect (()=> {
        if(isAuthenticated){
            const fetchAuthToken=async ()=>{
                const accessToken=await getAccessTokenSilently({
                    audience:'https://misiontic-resilientes.us.auth0.com/api/v2/' 
            
                })
                localStorage.setItem('token',accessToken)
                /*let user=await getUser();
                if(user.role!='Inactivo' && user.active=='Autorizado'){
                    localStorage.setItem('user', JSON.stringify(user))
                }else{
                    alert('El usuario no está autorizado o no posee rol')
                    logout({ returnTo: window.location.origin })
                }*/
                

            }
    
            fetchAuthToken();
        }
    },[isAuthenticated]);

    return isAuthenticated ? (<> <NavBar/>{children}</>) :(<> <NavBar/> <div className="text-5xl text">No esta autorizado para ver este sitio.</div></>);
}