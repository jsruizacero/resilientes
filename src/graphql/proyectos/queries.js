import { gql } from "@apollo/client";

const PROYECTOS = gql`
  query Proyectos {
    Proyectos {
      _id
      nombre
      presupuesto
      fechaInicio
      fechaFin
      lider
      # # lider
      # estado
      # fase
      # objetivos {
      #   descripcion
      #   tipo
      # }
      # lider {
      #   _id
      #   correo
      # }
      # inscripciones {
      #   estado
      #   estudiante {
      #     _id
      #   }
      # }
    }
  }
`;

export { PROYECTOS };
