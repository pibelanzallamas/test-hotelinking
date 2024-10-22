import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useSelector } from "react-redux";

function ProductCard({ texto, titulo, precio, imagen, isUser }) {
  const [activated, setActivated] = useState(false);
  const [code, setCode] = useState("");
  const [promoted, setPromoted] = useState();
  const user = useSelector((state) => state.user);

  //crea el código de un producto en la base de datos
  const handleActivate = async () => {
    let codigo = "";
    const abecedario = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");

    for (let i = 0; i < 8; i++) {
      const random = Math.floor(Math.random() * abecedario.length);
      codigo += abecedario[random];
    }

    setCode(codigo);

    try {
      const resp = await axios.post("http://localhost:3000/codes.php", {
        uid: user.id,
        title: titulo,
        price: parseFloat(precio.replace("$", "")),
        code: codigo,
        state: false,
        create: true,
      });

      setActivated(true);
      alerts("Succes!", "The promo-code was generated!", "success");
    } catch (e) {
      console.log(e);
      alerts("Sorry!", "The promo-code couldn't be generated!", "success");
    }
  };

  //chequea si ese producto ya tiene código
  useEffect(() => {
    axios
      .post("http://localhost:3000/codes.php", {
        title: titulo,
        uid: user.id,
        checkTitle: true,
      })
      .then((promo) => {
        if (promo.data.promo.id) {
          setActivated(true);
          setPromoted(promo.data.promo.code);
        }
      })
      .catch((e) => console.log(e));
  }, []);

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
              {/* //muestra el promocionado o el activado */}
              Your code is: <Code>{code || promoted}</Code>
            </Text>
          ) : (
            isUser && (
              <Button
                onClick={() => handleActivate()}
                variant="solid"
                colorScheme="blue"
              >
                Get Code!
              </Button>
            )
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default ProductCard;
