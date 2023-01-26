//import React from 'react';

//const ContextoToken = React.createContext();

//export const ProviderToken = ContextoToken.Provider;
//export const ConsumerToken = ContextoToken.Consumer;

//export default ContextoToken;

import React, {useState} from 'react'

export const ContextoToken = React.createContext({})

export default function ProviderToken({children}){

	const [llave,setLlave] = useState({token:"estará la ventana Principal"})
	return(
		<ContextoToken.Provider value={{llave,setLlave}}>
			{children}
		</ContextoToken.Provider>
	)
}