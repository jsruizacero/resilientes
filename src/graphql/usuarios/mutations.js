import { gql } from "@apollo/client";

const EDITAR_USUARIO = gql`
  mutation EditarUsuario(
    $_id: String!
    $nombre: String!
    $apellido: String!
    $identificacion: String!
    $correo: String!
    $estado: Enum_EstadoUsuario
    $rol: Enum_Rol!

  ) {
    editarUsuario(
      _id: $_id
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      correo: $correo
      estado: $estado
      rol: $rol

    ) {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
      
    }
  }
`;

const CREAR_USUARIO = gql`
  mutation CrearUsuario(
    $apellido: String!
    $identificacion: String!
    $correo: String!
    $nombre: String!
    $estado: Enum_EstadoUsuario
    $rol: Enum_Rol!
  ) {
    crearUsuario(
      apellido: $apellido
      identificacion: $identificacion
      correo: $correo
      nombre: $nombre
      estado: $estado
      rol: $rol
    ) {
      identificacion
      _id
    }
  }
`;

const ELIMINAR_USUARIO = gql`
  mutation EliminarUsuario(
    $_id: String!
  ) {
    eliminarUsuario(
      _id: $_id
    ) {
      nombre
    }
  }
`;

export { EDITAR_USUARIO, CREAR_USUARIO, ELIMINAR_USUARIO };
