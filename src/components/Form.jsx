import React, { useState } from "react";
import {
  Input,
  Stack,
  Button,
  Heading,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Link,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { alerts } from "../utils/alerts";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../state/userState";

function Form({ register }) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const user = await axios.post("http://localhost:3000/users.php", {
        login: true, // Añade este campo
        email,
        password,
      });
      if (user.data.status === "success") {
        // Comprueba el estado en la respuesta
        dispatch(setUser(user.data)); // O ajusta según tu estructura
        alerts("Success!", user.data.message, "success");
        navigate("/home");
      } else {
        alerts("Sorry!", user.data.message, "warning");
      }
    } catch (er) {
      console.log(er);
      alerts(
        "Sorry!",
        "Ocurrió un error al intentar iniciar sesión.",
        "warning"
      );
    }
  };

  const handleRegister = async () => {
    try {
      const user = await axios.post("http://localhost:3000/users.php", {
        register: true,
        email,
        password,
        nombre,
      });
      if (user.data.status === "success") {
        alerts(`Success ${nombre}!`, user.data.message, "success");
        navigate("/");
      } else {
        alerts("Sorry!", user.data.message, "warning");
      }
    } catch (e) {
      console.log(e);
      alerts("Sorry!", "Ocurrió un error al intentar registrarte.", "warning");
    }
  };

  return (
    <div>
      <Heading>Hotel Linking</Heading>
      <br />

      <Stack spacing={3}>
        {register && (
          <FormControl isInvalid={nombre === ""}>
            <InputGroup>
              <InputLeftAddon>Nombre</InputLeftAddon>
              <Input
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
                value={nombre}
                variant="outline"
                placeholder="Natalia"
                autoComplete="off"
              />
              <FormErrorMessage>Email is required.</FormErrorMessage>
            </InputGroup>
          </FormControl>
        )}

        <FormControl isInvalid={email === ""}>
          <InputGroup>
            <InputLeftAddon>Email</InputLeftAddon>
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              variant="outline"
              placeholder="nataliarodriguez@email.com"
              autoComplete="off"
            />
          </InputGroup>
        </FormControl>

        <FormControl isInvalid={password === ""}>
          <InputGroup size="md">
            <InputLeftAddon>Password</InputLeftAddon>
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="1234"
              autoComplete="off"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        {register ? (
          <>
            <Button colorScheme="blue" onClick={handleRegister}>
              Register
            </Button>
            <Link onClick={() => navigate("/")}>Log in</Link>
          </>
        ) : (
          <>
            <Button colorScheme="green" onClick={handleLogin}>
              Log in
            </Button>
            <Link onClick={() => navigate("/register")}>Register</Link>
          </>
        )}
      </Stack>
    </div>
  );
}

export default Form;
