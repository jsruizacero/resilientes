import React from "react";
import { PageTemplate } from "../components/pageTemplate";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

export const Inicio = () => {
  return (
    <PageTemplate>
      <Container>
        <h1 className="display-3">Inicio!</h1>
        <p className="lead">inicio</p>
        <hr className="my-2" />
        <p>container.</p>
        <p className="lead">
          <Link to="/usuarios" className="btn-primary">
            Usuarios
          </Link>
        </p>
      </Container>
    </PageTemplate>
  );
};
