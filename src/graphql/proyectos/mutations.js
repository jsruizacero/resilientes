import { gql } from '@apollo/client';

// const EDITAR_PROYECTO = gql`
//   mutation Mutation($_id: String!, $campos: camposProyecto!) {
//     editarProyecto(_id: $_id, campos: $campos) {
//       _id
//       estado
//     } 
//   }
// `;
const EDITAR_PROYECTO = gql`
  mutation EditarProyecto(
    $_id: String!
    $nombre: String!
    $presupuesto: Float!
    $fechaInicio: Date!
    $fechaFin: Date!
    $lider: String
    # $objetivos: [crearObjetivo]
  ) {
    editarProyecto(
      _id: $_id
      nombre: $nombre
      presupuesto: $presupuesto
      fechaInicio: $fechaInicio
      fechaFin: $fechaFin
      lider: $lider
      # objetivos: $objetivos
    ) {
      _id
      nombre
      presupuesto
    }
  }
`;


const CREAR_PROYECTO = gql`
  mutation CrearProyecto(
    $nombre: String!
    $presupuesto: Float!
    $fechaInicio: Date!
    $fechaFin: Date!
    $lider: String
    # $objetivos: [crearObjetivo]
  ) {
    crearProyecto(
      nombre: $nombre
      presupuesto: $presupuesto
      fechaInicio: $fechaInicio
      fechaFin: $fechaFin
      lider: $lider
      # objetivos: $objetivos
    ) {
      _id
    }
  }
`;


const ELIMINAR_PROYECTO = gql`
  mutation EliminarProyecto(
    $_id: String
  ) {
    eliminarProyecto(
      _id: $_id
    ) {
      _id
    }
  }
`;

export { EDITAR_PROYECTO, CREAR_PROYECTO, ELIMINAR_PROYECTO };
