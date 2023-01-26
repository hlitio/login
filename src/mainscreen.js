import { useContext } from "react"
import { ContextoToken } from "./contextotoken"
function Mainview(){
    const TOKEN = useContext(ContextoToken)
    console.log(TOKEN.llave.token)
    
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
            <h1 style={{color:"white",
            fontSize:"4.5rem", webkitTextStroke:"2px black", fontWeight:"bold"}}>Aqui {TOKEN.llave.token}</h1>
        </div>
    )

}
export default Mainview