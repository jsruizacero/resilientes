import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  Label,
} from "reactstrap";
import {
  CREAR_PROYECTO,
  EDITAR_PROYECTO,
} from "../../graphql/proyectos/mutations";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useUser } from "../../context/userContext";

export const ModalEditarProyecto = ({ isOpen, toggle, proyecto }) => {
  const { userData } = useUser();
  const [nombreProyecto, setnombreProyecto] = useState("");
  const [presupuesto, setPresupuesto] = useState(0);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [lider, setLider] = useState("");

  const formData = {
    nombre: nombreProyecto,
    presupuesto: Number(presupuesto),
    fechaInicio: fechaInicio,
    fechaFin: fechaFin,
    lider: lider,
  };

  useEffect(() => {
    if (proyecto) {
      setnombreProyecto(proyecto.nombre);
      setPresupuesto(proyecto.presupuesto);
      setFechaInicio(proyecto.fechaInicio);
      setFechaFin(proyecto.fechaFin);
      setLider(proyecto.lider);
    }
  }, [proyecto]);

  const [crearProyecto, { loading }] = useMutation(CREAR_PROYECTO);

  const [editarProyecto, { loading: loadingEditando }] =
    useMutation(EDITAR_PROYECTO);

  const applyCreate = () => {
    if (proyecto._id) {
      editarProyecto({
        variables: { _id: proyecto._id, ...formData },
        onError: () => toast.error("Ocurriu un problema editando proyecto"),
        onCompleted: () => toggle(),
        refetchQueries: ["Proyectos"],
      });
    } else {
      crearProyecto({
        variables: { ...formData },
        onError: () => toast.error("Ocurriu un problema creando proyecto"),
        onCompleted: () => toggle(),
        refetchQueries: ["Proyectos"],
      });
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {proyecto._id ? "Editar" : "Adicionar"} Proyecto
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="nombre">Nombre del Proyecto</Label>
            <Input
              type="text"
              defaultValue={nombreProyecto}
              name="nombre"
              id="nombre"
              placeholder="Digite..."
              onChange={(e) => setnombreProyecto(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="presupuesto">Presupuesto</Label>
            <Input
              type="number"
              defaultValue={presupuesto}
              name="presupuesto"
              id="presupuesto"
              placeholder="Digite..."
              onChange={(e) => setPresupuesto(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="fechaInicio">Fecha Inicio</Label>
            <Input
              type="date"
              defaultValue={fechaInicio}
              name="fechaInicio"
              id="fechaInicio"
              placeholder="Digite..."
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="fechaFin">Fecha Fin</Label>
            <Input
              type="date"
              defaultValue={fechaFin}
              name="fechaFin"
              id="fechaFin"
              placeholder="Digite..."
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="lider"></Label>
            <FormGroup>
              <Label for="exampleSelect">Select</Label>
              <Input
                type="select"
                defaultValue={lider}
                name="select"
                id="exampleSelect"
                onChange={(e) => setLider(e.target.value)}
              >
                {userData?.map((i) => (
                  <option value={i._id}>{i.nombre}</option>
                ))}
              </Input>
            </FormGroup>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => applyCreate()}
          disabled={loading || loadingEditando}
        >
          {loading || loadingEditando ? "Guardando..." : "Guardar"}
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};
