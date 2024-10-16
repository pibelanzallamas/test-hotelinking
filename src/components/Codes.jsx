import React, { useState, useEffect } from "react";
import { Button, Heading } from "@chakra-ui/react";
import { codes } from "../utils/codes";
import { Checkbox } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { alerts } from "../utils/alerts";
import axios from "axios";

function Codes() {
  const navigate = useNavigate();
  const [estado, setEstado] = useState(false);
  const [codes2, setCodes] = useState([]);

  useEffect(() => {
    const checkAllCodes = async () => {
      try {
        const resp = axios.get("http://localhost:3000/api/codes");

        if (resp.data) {
          setCodes(resp.data);
        }
      } catch (e) {
        alerts(
          "Sorry!",
          "Something went wrong with the codes, try again!",
          "warning"
        );
        console.log(e);
      }
    };

    checkAllCodes();
  }, [estado]);

  const handleCheckOne = async (code) => {
    try {
      const resp = await axios.put(`http://localhost:3000/api/codes/${code}`);

      if (resp.data) {
        alerts("Success!", "You have checked the code correctly", "success");
        setEstado(!estado);
      }
    } catch (e) {
      console.log(e);
      alerts("Sorry!", "The code couldn't be checked, try again!", "warning");
    }
  };

  const handleCheckAll = async () => {
    try {
      const resp = await axios.put(`http://localhost:3000/api/codes/all`);

      if (resp.data) {
        alerts("Success!", "You have check all the codes correctly", "success");
        setEstado(!estado);
      }
    } catch (e) {
      console.log(e);
      alerts("Sorry!", "The codes couldn't be checked, try again!", "warning");
    }
  };

  return (
    <div>
      <Heading>Your Codes</Heading>
      <br />
      <Button onClick={() => navigate("/home")}>Home</Button>
      <br />
      <br />
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Estado</Th>
              <Th>Titulo</Th>
              <Th>Precio</Th>
              <Th>Check</Th>
            </Tr>
          </Thead>
          <Tbody>
            {codes.length > 0 &&
              codes.map((ele) => (
                <Tr key={ele.precio}>
                  <Td>
                    {ele.state ? (
                      <Checkbox isChecked={true} isReadOnly></Checkbox>
                    ) : (
                      <Checkbox isChecked={false} isReadOnly></Checkbox>
                    )}
                  </Td>
                  <Td>{ele.titulo}</Td>
                  <Td isNumeric>{ele.precio}</Td>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleCheckOne(ele.code)}
                  >
                    Check
                  </Button>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>

      <br />
      <Button onClick={() => handleCheckAll()} colorScheme="blue">
        Check all
      </Button>
    </div>
  );
}

export default Codes;
