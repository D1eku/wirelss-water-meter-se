import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { WaterGraphs } from "../../components/WaterGraphs";

const dummyData = [
  {
    id: 1,
    fecha: "10-08-2022",
    medicion: 9382,
    direccion: "mi casa",
  },
  {
    id: 1,
    fecha: "11-08-2022",
    medicion: 1234,
    direccion: "mi casa",
  },
  {
    id: 1,
    fecha: "12-08-2022",
    medicion: 1543,
    direccion: "mi casa",
  },
  {
    id: 1,
    fecha: "13-08-2022",
    medicion: 5754,
    direccion: "mi casa",
  },
  {
    id: 1,
    fecha: "14-08-2022",
    medicion: 3456,
    direccion: "mi casa",
  },
  {
    id: 1,
    fecha: "15-08-2022",
    medicion: 0,
    direccion: "mi casa",
  },
];

export const WaterMedition = () => {
  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Fecha de revisión</Form.Label>
          <Form.Control
            type="date"
            placeholder="Seleccione fecha"
            style={{
              width: "200px",
            }}
          />
          <Form.Text className="text-muted">
            Ingrese la fecha para revisar la medición del agua
          </Form.Text>
        </Form.Group>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Fecha</th>
              <th>Medicion</th>
              <th>Direccion</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.length > 0 &&
              dummyData.map((data) => (
                <tr>
                  <td>{data.id}</td>
                  <td>{data.fecha}</td>
                  <td>{data.medicion}</td>
                  <td>{data.direccion}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        <WaterGraphs data={dummyData}/>
      </div>
    </div>
  );
};
