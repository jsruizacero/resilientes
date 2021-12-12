import React, { useEffect } from "react";
import { PageTemplate } from "../../components/pageTemplate";
import { PROYECTOS } from "../../graphql/proyectos/queries";
import { useQuery } from "@apollo/client";
import { Container, Table } from "reactstrap";
import { toast } from "react-toastify";

export const Proyectos = () => {
  const { data, loading, error } = useQuery(PROYECTOS);

  useEffect(() => {
    if (error) {
      toast.error("Un Error inesperado ocurrio");
    }
  }, [error]);

  if (loading) return <div>Cargando....</div>;

  return (
    <PageTemplate>
      <Container>
        <Table responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Presupuesto</th>
              <th>FechaInicio</th>
              <th>FechaFin</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.Proyectos.map((u) => {
                return (
                  <tr key={u._id}>
                    <td>{u.nombre}</td>
                    <td>{u.presupuesto}</td>
                    <td>{u.fechaInicio}</td>
                    <td>{u.fechaFin}</td>
                    
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Container>
    </PageTemplate>
  );
};
