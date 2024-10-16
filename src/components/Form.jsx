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
    const user = { email: "brandon", id: "1" };
    dispatch(setUser(user));
    navigate("/home");
    try {
      const user = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });

      if (user.data) {
        dispatch(setUser(user.data.payload));
        alerts("Success!", "You have logged in successfully", "success");
        navigate("/home");
      }
    } catch (er) {
      console.log(er);
      alerts(
        "Sorry!",
        "You couldn't be logged in successfully, try again!",
        "warning"
      );
    }
  };

  const handleRegister = async () => {
    try {
      const user = await axios.post(
        "http://localhost:3000/api/users/register",
        {
          email,
          password,
          nombre,
        }
      );

      if (user.data) {
        alerts(
          `Success ${user.data.name}!`,
          `You have registered successfully`,
          "success"
        );
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      alerts("Sorry!", "You couldn't register, try again!", "warning");
    }
  };

  return (
    <div>
      <Heading>Hotel Linking</Heading>
      <br />

      <Stack spacing={3}>
        {register && (
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
          </InputGroup>
        )}

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
