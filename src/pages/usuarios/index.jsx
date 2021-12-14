import React, {  useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USUARIOS } from "../../graphql/usuarios/queries";
import { ELIMINAR_USUARIO } from "../../graphql/usuarios/mutations";
import { Pencil } from "@styled-icons/bootstrap/Pencil";
import { toast } from "react-toastify";
import { Enum_Rol, Enum_EstadoUsuario } from "../../utils/enum";
import { Button, Container, Table } from "reactstrap";
import ModalAdicionarUsuarios from "./ModalAdicionarUsuarios";
import { Trash } from "@styled-icons/bootstrap/Trash";
import { UserPlus } from "@styled-icons/boxicons-regular/UserPlus";
import { PageTemplate } from "../../components/pageTemplate";
import { useUser } from '../../context/userContext';



const IndexUsuarios = () => {
  const { setUserData } = useUser()
  const { data, error, loading } = useQuery(GET_USUARIOS);
  const [abreModal, setAbreModal] = useState(false);
  const toggle = () => setAbreModal(!abreModal);

  const [eliminarUsuario, { loading: loadingDelete, error: errorDeleting }] =
    useMutation(ELIMINAR_USUARIO);

  useEffect(() => {
    if (error || errorDeleting) {
      toast.error("Un Error inesperado ocurrio");
    }
  }, [error, errorDeleting]);

  useEffect(() => {
    if(data) {
      setUserData(data?.Usuarios)
    }
    // eslint-disable-next-line
  }, [])

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({});

  if (loading) return <div>Cargando....</div>;

  return (
    <PageTemplate>
    <Container className="pt-5">
      <Button
        className="d-flex ml-auto mb-3"
        onClick={() => {
          toggle();
          setUsuarioSeleccionado({});
        }}
      >
        <UserPlus size="20" />
        <span className="ms-2 d-in">Adicionar usuario</span>
      </Button>
      <ModalAdicionarUsuarios
        isOpen={abreModal}
        toggle={toggle}
        usuario={usuarioSeleccionado}
      />
      Datos Usuarios:
      <Table responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Identificación</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.Usuarios.map((u) => {
              return (
                <tr key={u._id}>
                  <td>{u.nombre}</td>
                  <td>{u.apellido}</td>
                  <td>{u.correo}</td>
                  <td>{u.identificacion}</td>
                  <td>{Enum_Rol[u.rol]}</td>
                  <td>{Enum_EstadoUsuario[u.estado]}</td>
                  <td
                    onClick={() => {
                      toggle();
                      setUsuarioSeleccionado(u);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <Pencil size="20" />
                  </td>
                  <td
                    onClick={() =>
                      eliminarUsuario({
                        variables: { _id: u._id },
                        refetchQueries: ["Usuarios"],
                        onCompleted: () => toast.warning("Usuario eliminado"),
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

export default IndexUsuarios;
