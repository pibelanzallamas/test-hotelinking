import React, { useState } from "react";
import {
  Card,
  Image,
  CardBody,
  Heading,
  Stack,
  Button,
  Text,
  Code,
} from "@chakra-ui/react";
import { alerts } from "../utils/alerts";

// disfruta su compania
function ProductCard({ texto, titulo, precio, imagen }) {
  const [activated, setActivated] = useState(false);
  const [code, setCode] = useState("");

  //esta codeado?
  function handleSearchCode() {
    //con el titulo buscar un codigo con ese titulo
    //si hay: mostrar el codigo correspondiente de la bd
    //si no: no hacer nada
  }

  function handleActivate() {
    let codigo = "";
    const abecedario = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");

    for (let i = 0; i < 8; i++) {
      const random = Math.floor(Math.random() * abecedario.length);
      codigo += abecedario[random];
    }

    setCode(codigo);
    alerts("Succes!", "The promo-code was generated!", "success");

    // crear fila en base de datos con -codigo, titulo y un state false y un usuario.id-

    setActivated(true);
  }

  return (
    <div>
      <Card maxW="sm">
        <CardBody>
          <Image
            src={imagen}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{titulo}</Heading>
            <Text>{texto}</Text>
            <Text color="blue.600" fontSize="2xl">
              {precio}
            </Text>
          </Stack>
          <br />
          {activated ? (
            <Text>
              Your code is: <Code>{code}</Code>
            </Text>
          ) : (
            <Button
              onClick={() => handleActivate()}
              variant="solid"
              colorScheme="blue"
            >
              Get Code!
            </Button>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default ProductCard;
