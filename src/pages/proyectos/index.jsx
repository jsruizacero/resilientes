import React, { useEffect, useState } from "react";
import { PageTemplate } from "../../components/pageTemplate";
import { PROYECTOS } from "../../graphql/proyectos/queries";
import {  ELIMINAR_PROYECTO } from "../../graphql/proyectos/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { Container, Table, Button } from "reactstrap";
import { toast } from "react-toastify";
import { BookAdd } from "@styled-icons/boxicons-solid/BookAdd";
import { ModalEditarProyecto } from "./ModalEditarProyecto";
import { Pencil } from "@styled-icons/bootstrap/Pencil";
import { Trash } from "@styled-icons/bootstrap/Trash";
import { useUser } from '../../context/userContext';



export const Proyectos = () => {
  const { userData } = useUser();

  const { data, loading, error } = useQuery(PROYECTOS);
  const [modalProyecto, setModalProyecto] = useState(false);
  const toggle = () => setModalProyecto(!modalProyecto);
  const [proyectoSelecccionado, setProyectoSelecccionado] = useState({});
  useEffect(() => {
    if (error) {
      toast.error("Un Error inesperado ocurrio");
    }
  }, [error]);

  const [eliminarProyecto, { loading: loadingDelete, error: errorDeleting }] =
  useMutation(ELIMINAR_PROYECTO);

  useEffect(() => {
    if (error || errorDeleting) {
      toast.error("Un Error inesperado ocurrio");
    }
  }, [error, errorDeleting]);

  if (loading) return <div>Cargando....</div>;

  return (
    <PageTemplate>
      <Container>
        <Button
          className="d-flex ml-auto mb-3"
          onClick={() => {
            toggle();
            setProyectoSelecccionado({});
          }}
        >
          <BookAdd size="20" />
          <span className="ms-2 d-in">Adicionar Proyecto</span>
        </Button>
        <ModalEditarProyecto
          isOpen={modalProyecto}
          toggle={toggle}
          proyecto={proyectoSelecccionado}
        />
        <Table responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Presupuesto</th>
              <th>FechaInicio</th>
              <th>FechaFin</th>
              <th>Lider</th>
            <th>Editar</th>
            <th>Eliminar</th>
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
                    <td>{userData.find((i) => i._id === u.lider)?.nombre}</td>
                  <td
                    onClick={() => {
                      toggle();
                      setProyectoSelecccionado(u);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <Pencil size="20" />
                  </td>
                  <td
                    onClick={() =>
                      eliminarProyecto({
                        variables: { _id: u._id },
                        refetchQueries: ["Proyectos"],
                        onCompleted: () => toast.warning("Proyecto eliminado"),
                      })
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {loadingDelete ? "Eliminando.." : <Trash size="20" />}
                  </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Container>
    </PageTemplate>
  );
};
