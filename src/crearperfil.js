import { useContext } from "react"
import { ContextoToken } from "./contextotoken"

import { useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag"
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



const AGREGAR_PERFIL = gql`
mutation($nombre: String!, $apellido: String!, $token: String!){
    createPerfil(nombre: $nombre, apellido: $apellido, token: $token) {
      success
      errors {
        message
      }
    }
  }
`


const CrearPerfil= ()=>{
    const TOKEN = useContext(ContextoToken)
    const[nuevoPerfil,{ data, loading, error }] = useMutation(AGREGAR_PERFIL)
    console.log(TOKEN.llave.token)
    
    return(
        <div className="container d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
            <div style={{width:"30%"}} className="border p-4 shadow-lg bg-white">
                <Form onSubmit={async e=>{
                    e.preventDefault()
                    
                    const respuesta= await nuevoPerfil({variables:{nombre: e.target.nombre.value,apellido: e.target.apellido.value,token:TOKEN.llave.token}})
                    console.log (respuesta)}}                   
                    >

                    
                        <legend>Perfil</legend>

                        <Form.Group className="mb-3" controlId="nombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="ingrese su nombre"/>
                            <Form.Text className="text-muted">
                                Nunca se compartira su correo
                            </Form.Text>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="apellido">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese su apellido"/>
                        </Form.Group>
                                               

                        <Button variant="primary" type="submit" >
                            Agregar
                        </Button>                    
        
                </Form>
              
            </div>
            
      </div>
  
    )

}

export default CrearPerfil