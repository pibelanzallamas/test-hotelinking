import { useState } from "react";
import "./App.css";
import AppRoutes from "./components/AppRoutes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;

/*
TRABAJO PARA HOTELINKING BACK Y <FRONT</FRONT>
pagina para registrarse y / o loguearse
lista de ofertas y un boton para generar un codigo promocional
pagina con lista de codigos promocionales disponibles, boton para canjearlos
realizar feedback de las operaciones realizadas

un usuario pueda ver ofertas y generar codigos, y luego listar 
esos codigos y poder marcarlos 


tabla codigos
id ---------usuario.id-------nombre----------------usado

.createCode crea un codigo con el id del user
.readCodes ver codigos por user id 
.selectCode mod campo usado de false a true

tabla user
id---------email----------salt-----------password

.createUser 
.loginUser

pagina principal
email:
password:
boton (ENTRAR)

pagina home
TITULO  navbar hamburger con listado
carta de producto
IMAGEN 1x1
Titulo en negrita
precio
descripcion de 150ch
!oferta! 
boton codigo

pagina mi perfil
navbar
Codigos
lista de codigos
check boton titulo de producto - precio tachado - boton de submit al lado
boton de submit grande

*/
