import "./index.css";
import { Link} from "react-router-dom";
import axios from "axios";
import Form from 'react-bootstrap/Form'
import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";


export const Login = () => {

  let canRedirect = false;

  const doLogin = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    data.set("username", "admin")
    data.set("password", "embebidos")
    console.log(data)

    const loginState = await axios.post("http://192.168.5.1:8000/api/login",data)
    console.log(loginState.data);

    if(loginState.data === "Logueado"){
      canRedirect = true;
    }

    console.log("canRedirect: ", canRedirect)
    if(canRedirect){
      window.location.href = "/menu/waterMedition/"
    }
  }

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-3">Aqua Pro</h2>

                  <Form onSubmit={doLogin}>
                    <Form.Group className="mb-4" controlId="formBasicUsername">
                      <Form.Label> Username </Form.Label>
                      <Form.Control type="text" placeholder="Enter Username"/>
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password"/>
                    </Form.Group>
                    <Button variant="btn btn-outline-light btn-lg px-5" type="submit">
                      Ingresar
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
