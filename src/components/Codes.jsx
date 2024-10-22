import React, { useState, useEffect } from "react";
import { Button, Heading } from "@chakra-ui/react";
// import { codes } from "../utils/codes";
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
import { useSelector } from "react-redux";

function Codes() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [estado, setEstado] = useState(false);
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3000/codes.php", { uid: user.id, getByUid: true })
      .then((resp) => setCodes(resp.data.codes))
      .catch((err) => console.log(err));
  }, [estado]);

  const handleCheckOne = async (code) => {
    try {
      const resp = await axios.post("http://localhost:3000/codes.php", {
        updateState: true,
        code,
      });

      if (resp.data.mod) {
        alerts("Success!", "You have checked the code correctly", "success");
        setEstado(!estado);
      } else {
        alerts("Sorry!", "The code couldn't be checked, try again!", "warning");
      }
    } catch (e) {
      console.log(e);
      alerts("Sorry!", "The code couldn't be checked, try again!", "warning");
    }
  };

  const handleCheckAll = async () => {
    try {
      const resp = await axios.post("http://localhost:3000/codes.php", {
        updateAllStates: true,
        uid: user.id,
      });

      if (resp.data.mod) {
        alerts("Success!", "You have check all the codes correctly", "success");
        setEstado(!estado);
      } else {
        alerts(
          "Sorry!",
          "The codes couldn't be checked, try again!",
          "warning"
        );
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
              <Th>Code</Th>
              <Th>Check</Th>
            </Tr>
          </Thead>
          <Tbody>
            {codes.length > 0 &&
              codes.map((ele) => (
                <Tr key={ele.price}>
                  <Td>
                    {ele.state ? (
                      <Checkbox isChecked={true} isReadOnly></Checkbox>
                    ) : (
                      <Checkbox isChecked={false} isReadOnly></Checkbox>
                    )}
                  </Td>
                  <Td>{ele.title}</Td>
                  <Td isNumeric>{ele.price}</Td>
                  <Td>{ele.code}</Td>

                  {ele.state ? (
                    <Td>Checked!</Td>
                  ) : (
                    <Button
                      colorScheme="blue"
                      onClick={() => handleCheckOne(ele.code)}
                    >
                      Check
                    </Button>
                  )}
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
