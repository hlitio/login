import { useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag"
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VentanaModal from './ventanamodal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const AGREGAR_USUARIO = gql`
mutation($correo: String!, $password: String!)
{createUsuario(correo: $correo, password: $password) {
   success
    errors {      
      message
      
    }
}}
`


const Agregar_Usuario = ()=>{
    const[nuevoUsuario,{ data, loading, error }] = useMutation(AGREGAR_USUARIO)
    const [showTrue, setShowTrue] = useState(false);
    const [showFalse, setShowFalse] = useState(false);
  
    const navigate = useNavigate()
    
    
   

    return(
        <div className="container d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
            <div style={{width:"30%"}} className="border p-4 shadow-lg bg-white">
                <Form onSubmit={async e=>{
                    e.preventDefault()
                    //idperfil:parseInt(e.target.idperfil.value,10)
                    const respuesta= await nuevoUsuario({variables:{correo: e.target.correo.value,password: e.target.password.value}})
                    
                   
                    if (respuesta.data.createUsuario.success) {
                        
                        
                       
                        
                        
                        setShowTrue(true)    
                        setTimeout(()=>{navigate("/")}, 4000);
                        
                        

                    }else{
                        setShowFalse(true)
                    }
                    
                    
                    
                    
                    }}>

                    
                        <legend>Alta de usuarios</legend>

                        <Form.Group className="mb-3" controlId="correo">
                            <Form.Label>Dirección de correo</Form.Label>
                            <Form.Control type="email" placeholder="ingrese su correo"/>
                            <Form.Text className="text-muted">
                                Nunca se compartira su correo
                            </Form.Text>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Contraseña"/>
                        </Form.Group>
                                               

                        <Button variant="primary" type="submit" >
                            Agregar
                        </Button>                    
        
                </Form>
                {showTrue &&
                <VentanaModal show={true} titulo="Mensaje" mensaje="Se creo correctamente el usuario"/>}
                {showFalse &&
                <VentanaModal show={true} titulo="Error .!" mensaje="No se pudo crear el usuario"/>}
            </div>
            
      </div>
  
    )
}

export default Agregar_Usuario
  

