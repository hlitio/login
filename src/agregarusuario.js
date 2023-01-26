import { useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag"
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';




const AGREGAR_USUARIO = gql`
mutation($correo: String!, $password: String!, $idperfil: Int!)
{createUsuario(correo: $correo, password: $password, idperfil: $idperfil) {
   success
    errors {      
      message
      
    }
}}
`


const Agregar_Usuario = ()=>{
    const[nuevoUsuario,{ data, loading, error }] = useMutation(AGREGAR_USUARIO)
    
    let correo,password,idperfil
    return(
        <div className="container d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
            <div style={{width:"30%"}} className="border p-4 shadow-lg bg-white">
                <Form onSubmit={async e=>{
                    e.preventDefault()
                    
                    nuevoUsuario({variables:{correo: e.target.correo.value,password: e.target.password.value,idperfil:parseInt(e.target.idperfil.value,10)}})
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
                        
                        <Form.Group className="mb-3" controlId="idperfil">
                            <Form.Label>Perfil</Form.Label>
                            <Form.Control type="text" placeholder="Contraseña"/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Agregar
                        </Button>                    
        
                </Form>
            </div>
      </div>
  
    )
}

export default Agregar_Usuario
  

