import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { WaterGraphs } from "../../components/WaterGraphs";
import { useEffect, useState } from "react";



export const WaterMedition = () => {
  const [data, setData] = useState([]) 
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("192.168.5.1") 
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false); 
      });
  }, [])
  if(isLoading){
    return <h1>Cargando...</h1>
  }
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
            {data.length > 0 &&
              data.map((value) => (
                <tr>
                  <td>{value.id}</td>
                  <td>{value.fecha}</td>
                  <td>{value.medicion}</td>
                  <td>{value.direccion}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        <WaterGraphs data={data} />
      </div>
    </div>
  );
};
