import React from "react";
import { Heading, Button } from "@chakra-ui/react";
import ProductCard from "../commons/ProductCard";
import { cards } from "../utils/cards";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  function handleToTop() {
    const refe = document.getElementById("top");
    if (refe) {
      refe.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <div id="top">
      <Heading>Hotel Linking</Heading>
      <br />
      <Button
        onClick={() => {
          navigate("/codes");
        }}
      >
        See all codes
      </Button>
      <br />
      <br />
      {cards.map((pro, i) => (
        <ProductCard
          key={i}
          texto={pro.texto}
          precio={pro.precio}
          imagen={pro.imagen}
          titulo={pro.titulo}
        />
      ))}
      <br />
      <Button colorScheme="blue" onClick={handleToTop}>
        Got to Top
      </Button>
      <br />
      <br />
    </div>
  );
}

export default Home;
