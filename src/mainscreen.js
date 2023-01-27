
import { Row, Col, Button } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';


function Mainview(){
    
    const navigate = useNavigate()

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
            <Row>
                <Col>
                    <h1 style={{color:"white",fontSize:"3rem", webkitTextStroke:"2px black", fontWeight:"bold"}}>
                        Aqui esta el analisis grafico de la carrera
                    </h1>
                </Col>
                <Col>
                    <Button onClick={()=>navigate("/crearperfil")}>Crear Perfil</Button>
                </Col>
                
            </Row>
        </div>
    )

}
export default Mainview