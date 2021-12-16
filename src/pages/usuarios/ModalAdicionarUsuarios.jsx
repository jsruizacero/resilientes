import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useMutation } from "@apollo/client";
import {
  CREAR_USUARIO,
  EDITAR_USUARIO,
} from "../../graphql/usuarios/mutations";
import { Enum_EstadoUsuario, Enum_Rol } from "../../utils/enum";
import { toast } from "react-toastify";

export const ModalAdicionarUsuarios = ({ isOpen, toggle, usuario }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [correo, setCorreo] = useState("");
  // const [rol, setRol] = useState('')
  // const [estado, setEstado] = useState('')

  const formData = {
    nombre: nombre,
    apellido: apellido,
    identificacion: identificacion,
    correo: correo,
    rol: Enum_Rol.ESTUDIANTE,
    estado: Enum_EstadoUsuario.AUTORIZADO,
  };

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre);
      setApellido(usuario.apellido);
      setIdentificacion(usuario.identificacion);
      setCorreo(usuario.correo);
    } else {
      setNombre("");
      setApellido("");
      setIdentificacion("");
      setCorreo('')
    }
  }, [usuario]);

  const [crearUsuario, { data, loading, error }] = useMutation(CREAR_USUARIO);
  const [
    editarUsuario,
    { data: dataEdicion, loading: loadingEdicion, error: errorEdicion },
  ] = useMutation(EDITAR_USUARIO);

  useEffect(() => {
    if (data || dataEdicion) {
      toast.success(`Usuario ${dataEdicion ? 'editado ' : 'creado'} con exito`);
    }
  }, [data, dataEdicion]);

  useEffect(() => {
    if (error || errorEdicion) {
      toast.error(`Ocurriu un problema ${error ? 'creado' : 'editado'} usuario`);
    }
  }, [error, errorEdicion]);

  const applyCreate = () => {
    if (usuario._id) {
      editarUsuario({
        variables: { _id: usuario._id, ...formData },
        onError: () => toast.error("Ocurriu un problema editando usuario"),
        onCompleted: () => toggle(),
        refetchQueries: ["Usuarios"],
      });
    } else {
      crearUsuario({
        variables: { ...formData },
        onError: () => toast.error("Ocurriu un problema creando usuario"),
        onCompleted: () => toggle(),
        refetchQueries: ["Usuarios"],
      });
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{usuario._id ? 'Editar' : 'Adicionar'} Usuario</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="nombre">Nombre</Label>
            <Input
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Digite..."
              defaultValue={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="apellido">Apellido</Label>
            <Input
              defaultValue={apellido}
              type="text"
              name="apellido"
              id="apellido"
              placeholder="Digite..."
              onChange={(e) => setApellido(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="identificacion">Identificacion</Label>
            <Input
              type="text"
              defaultValue={identificacion}
              name="identificacion"
              id="identificacion"
              placeholder="Digite..."
              onChange={(e) => setIdentificacion(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="correo">Correo</Label>
            <Input
              type="email"
              defaultValue={correo}
              name="correo"
              id="correo"
              placeholder="Digite..."
              onChange={(e) => setCorreo(e.target.value)}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => applyCreate()}
          disabled={loading || loadingEdicion}
        >
          {loading || loadingEdicion ? "Guardando..." : "Guardar"}
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalAdicionarUsuarios;
