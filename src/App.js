import React, { useState } from 'react';
import "./App.css";
import {
  ApolloProvider,
  ApolloClient,
  // createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import IndexUsuarios from "./pages/usuarios";
import { UserContext } from './context/userContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Inicio } from './pages/inicio';
import { Proyectos } from './pages/proyectos';
import { Auth0Provider } from "@auth0/auth0-react";


function App() {

  // const httpLink = createHttpLink({
  //   uri: 'http://localhost:4000/graphql',
  // });
  
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
    onError: ({ networkError, graphQLErrors }) => {
      console.log('graphQLErrors', graphQLErrors)
      console.log('networkError', networkError)
    }
    // link: httpLink,
  });

  const [userData, setUserData] = useState([])

  return (
    <Auth0Provider 
      domain="misiontic-resilientes.us.auth0.com"
      clientId="CNxBx1f00LIt4OG07JahvnPIckLV8pO9"
      redirectUri={window.location.origin}
      audience="https://misiontic-resilientes.us.auth0.com/api/v2/"
    >
      {/* <header className="App-header"> */}
        <ApolloProvider client={client}>
          <UserContext.Provider value={{ userData, setUserData }}>
            <BrowserRouter>
              <Routes>
                {/* <Route path="/" element={<PrivateLayout />}> */}
                  <Route path="" element={<Inicio/>} />
                  <Route path="/usuarios" element={<IndexUsuarios />} />
                  <Route path="/proyectos" element={<Proyectos />} />
                  
                  {/* <Route
                    path="/usuarios/editar/:_id"
                    element={<EditarUsuario />}
                  />
                  <Route path="page2" element={<Page2 />} />
                  <Route path="category1" element={<IndexCategory1 />} />
                  <Route path="category1/page1" element={<Category1 />} /> */}
                {/* </Route> */}
              </Routes>
            </BrowserRouter>
          </UserContext.Provider>
        </ApolloProvider>
        <ToastContainer/>
      {/* </header> */}
    </Auth0Provider>
  );
}

export default App;
