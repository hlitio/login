import './App.css';

import  ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag"

const bcryptjs = require('bcryptjs')



const AGREGAR_USUARIO = gql`
mutation($correo: String!, $password: String!, $idperfil: Int!)
{createUsuario(correo: $correo, password: $password, idperfil: $idperfil) {
  correo
}}
`

const Agregar_usuario = ()=>{
  const[nuevoUsuario,{ data, loading, error }] = useMutation(AGREGAR_USUARIO)
  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
  let correo,password,idperfil
  return(
    <div>
      <h2>Alta de usuarios</h2>
      <form onSubmit={async e=>{
        e.preventDefault()
        let passencryp = await bcryptjs.hash(password.value,8)
        nuevoUsuario({variables:{correo: correo.value,password: passencryp,idperfil:parseInt(idperfil.value,10)}})
      }}>
        <input ref={node =>{correo=node}} id="correo"></input>
        <input ref={node =>{password=node} } type="password" id="password"></input>
        <input ref={node=>{idperfil=node}} id="idperfil"></input>
        <button type="submit">Agregar Usuario</button>

      </form>
    </div>

  )
}

const client = new ApolloClient({
  uri:"http://localhost:4000/graphql"
})





function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
      
        
        <Agregar_usuario />

      </div>
    </ApolloProvider>
  );
}

export default App;
