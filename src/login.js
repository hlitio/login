import { useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag"
import { Button, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LOGIN_USUARIO = gql`
mutation($correo: String!, $password: String!){
  login(correo: $correo, password: $password) {
    success
    token
    errors {
      message
    }
  }
}
`

const Login = ()=>{

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const navigate = useNavigate()

    const [loginUser,{ data, loading, error }] = useMutation(LOGIN_USUARIO)

  
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
   

    return(
     
      <div className="container d-flex justify-content-center align-items-center" style={{height:"100vh"}}>

        <div style={{width:"30%"}} className="border p-4 shadow-lg bg-white">
            <Form            
                    
                onSubmit={async e=>{
                    e.preventDefault()   
                    
                    
                    let respuesta = await loginUser({variables:{correo: e.target.correo.value,password:e.target.password.value}})
                    console.log(respuesta.data.login.success)
                    console.log("Correo: " , e.target.correo.value, " Contraseña: " , e.target.password.value)
                    if (respuesta.data.login.success) {
                        navigate("/mainview")
                    }else {
                        
                            setShow(true)
                       
                        
                    }
    
                }} >
            
                <legend>Login</legend>
            
                <Form.Group className="mb-3" controlId="correo">
                    <Form.Label>Dirección de correo</Form.Label>
                    <Form.Control type="email" placeholder="ingrese su correo" />
                    <Form.Text className="text-muted">
                        Nunca se compartira su correo
                    </Form.Text>
                </Form.Group>

                

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" />
                </Form.Group>
        
              
                <Button variant="primary" type="submit" >
                    Ingresar
                </Button>

                <Form.Group className="mt-3 d-flex justify-content-end" controlId="registrarse">
                <p>No eres miembro? <Link to="/agregar_usuario">Registrate</Link></p>
                </Form.Group>
                
            </Form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ERROR !!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Datos ingresados incorrectos</Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="primary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
         
        </div>
    
      </div>
    
    )
  }

  export default Login