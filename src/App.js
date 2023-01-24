import './App.css';

import  ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag"

const bcryptjs = require('bcryptjs')

const jose = require('jose')

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
    <div className="contenedor-login">
      
      <form onSubmit={async e=>{
        e.preventDefault()
        let passencryp = await bcryptjs.hash(password.value,8)
        nuevoUsuario({variables:{correo: correo.value,password: passencryp,idperfil:parseInt(idperfil.value,10)}})
      }} className="pure-form pure-form-aligned">
         <fieldset>
          <legend>Alta de usuarios</legend>
          <div className= "pure-control-group">
            <label for= "correo">Correo: </label>
            <input ref={node =>{correo=node}} id="correo"></input>
          </div>
          <div className= "pure-control-group">
            <label for= "password">Password: </label>
            <input ref={node =>{password=node} } type="password" id="password"></input>
          </div>
          <div className= "pure-control-group">
            <label for= "idperfil">IdPerfil: </label>
            <input ref={node=>{idperfil=node}} id="idperfil"></input>
          </div>
          <div className= "pure-controls">
            <button type="submit" className="pure-button pure-button-primary">Agregar Usuario</button>
          </div>
        </fieldset>

      </form>
    </div>

  )
}

const Login = ()=>{
 
  let correo,password
  const secret = new TextEncoder().encode(
    'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
  )
  const alg = 'HS256'

  return(
    <div className="contenedor-login">
      
      <form onSubmit={async e=>{
        e.preventDefault()
        let passencryp = await bcryptjs.hash(password.value,8)


        const jwt = await new jose.SignJWT({ user:123456 })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer('urn:example:issuer')
        .setAudience('urn:example:audience')
        .setExpirationTime('2h')
        .sign(secret)

        console.log("Token:", jwt)
        console.log("----------------------")
        console.log("Verificando")
        console.log("----------------------")

        const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret, {
          issuer: 'urn:example:issuer',
          audience: 'urn:example:audience',
        })
        
        console.log(protectedHeader)
        console.log(payload)


        
      }} className="pure-form pure-form-aligned">
         <fieldset>
          <legend>Login</legend>
          <div className= "pure-control-group">
            <label htmlFor= "correo">Correo: </label>
            <input ref={node =>{correo=node}} id="correo"></input>
          </div>
          <div className= "pure-control-group">
            <label htmlFor= "password">Password: </label>
            <input ref={node =>{password=node} } type="password" id="password"></input>
          </div>
         
          <div className= "pure-controls">
            <button type="submit" className="pure-button pure-button-primary">Agregar Usuario</button>
          </div>
        </fieldset>

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
      
        
        <Login />

      </div>
    </ApolloProvider>
  );
}

export default App;
