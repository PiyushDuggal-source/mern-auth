import React, { useState } from "react";
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

const HomePage = () => {
  const [infos, setInfo] = useState();

  useEffect(() => {
    const getInfo = async () => {
      await axios
        .get(`https://mern-auth-crud.herokuapp.com/getUserInfos`)
        .then((response) => {
          setInfo(response.data);
        });
    };
    getInfo();
  }, []);

  const navigate = useNavigate();
  return (
    <Card>
      <Card.Body>
        <div className="container d-flex justify-content-center mb-4">
          <Button onClick={() => navigate("/dashboard")}>DashBoard</Button>
        </div>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Users Information</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Hobby</Th>
              <Th isNumeric>Salary</Th>
            </Tr>
          </Thead>
          <Tbody>
            {infos
              ? infos.map((info, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{info.name}</Td>
                      <Td>{info.hobby ? info.hobby : "-NA-"}</Td>
                      <Td isNumeric>{info.salary ? info.salary : "-NA-"}</Td>
                    </Tr>
                  );
                })
              : "  "}
          </Tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default HomePage;
