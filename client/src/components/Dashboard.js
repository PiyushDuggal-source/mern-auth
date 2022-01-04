import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import { useForm } from "react-hook-form";
import Error from "./Error";
import Success from "./Success";
import { Button, Form, Card } from "react-bootstrap";

const Dashboard = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [infos, setInfos] = useState({});
  const [warning, setWarning] = useState(false);

  const { id } = useParams();

  const deleteAccount = async () => {
    localStorage.removeItem("token");
    await axios
      .delete(`https://mern-auth-crud.herokuapp.com/delete/${id}`)
      .then((response) => {
        alert(`${response.data.message}`);
      });

    navigate("/");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Wrong site");
      setWarning(true);
    } else {
      const getData = async () => {
        await axios
          .get(`https://mern-auth-crud.herokuapp.com/single`, {
            headers: { "x-access-token": token },
          })
          .then((result) => {
            if (id === result.data.userId) {
              setInfos(result.data);
            } else {
              setError("Wrong site");
              setWarning(true);
            }
          });
      };
      getData();
    }
  }, []);
  const saveData = async (data) => {
    console.log(data);
    await axios.patch(
      `https://mern-auth-crud.herokuapp.com/addDetails/${id}`,
      data
    );
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return error ? (
    <Error error={error} warning={warning} />
  ) : (
    <div className="container m-2">
      <Card>
        <Card.Body>
          <Success></Success>
          <div className="container">
            {infos != null ? (
              <div className="d-flex justify-content-center ">
                <h2 className="ms-2">
                  <span style={{ fontSize: "20px", fontWeight: "500" }}>
                    {" "}
                    Hobby:
                  </span>{" "}
                  {infos.hobby}
                </h2>
                <h2 className="ms-2">
                  <span style={{ fontSize: "20px", fontWeight: "500" }}>
                    Salary:
                  </span>{" "}
                  {infos.salary}
                </h2>
              </div>
            ) : (
              " "
            )}
          </div>

          <h3 className="text-center mb-3" style={{ fontSize: "30px" }}>
            Add your hobbies and salary:{" "}
          </h3>

          <Form onSubmit={handleSubmit(saveData)}>
            <Form.Group id="hobby">
              <Form.Label>Hobby: </Form.Label>
              <Form.Control type="text" {...register("hobby")} required />
            </Form.Group>
            <Form.Group id="salary">
              <Form.Label>Salary: </Form.Label>
              <Form.Control type="number" {...register("salary")} required />
            </Form.Group>

            <Button
              onClick={() => {
                window.location.reload();
              }}
              className="w-100 mt-3"
              type="submit"
            >
              Save
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between">
            <button onClick={() => logOut()} className="btn btn-danger">
              LogOut
            </button>
            <button onClick={() => deleteAccount()} className="btn btn-danger">
              Delete Account
            </button>
            <Button onClick={() => navigate("/dashboard")}>DashBoard</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Dashboard;
