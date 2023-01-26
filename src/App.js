import './App.css';
import Login from './login';
import Agregar_Usuario from './agregarusuario';
import Mainview from './mainscreen';

import  ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/client';
import { Route, Routes } from 'react-router-dom';
import ProviderToken from './contextotoken';

import { useState } from 'react';


const jose = require('jose')








const client = new ApolloClient({
  uri:"http://localhost:4000/graphql"
})





function App() {
  
  return (
    <ProviderToken>
      <ApolloProvider client={client}>
        <div className="App">

          <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/agregar_usuario" element={<Agregar_Usuario/>}></Route>
            <Route path="/mainview" element={<Mainview/>}></Route>
          </Routes>        

        </div>
      </ApolloProvider>
    </ProviderToken>
  );
}

export default App;
