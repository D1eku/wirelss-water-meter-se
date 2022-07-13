import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { WaterGraphs } from "../../components/WaterGraphs";
import { useEffect, useState } from "react";
import axios from "axios";


export const WaterMedition = () => {

  const onChangeDateRevition =(e) =>{
    
    const aux2 = []
    originalData.forEach( element => {
      if(element.measure_at === e )
        aux2.push(element)
    })
    
    if(aux2 === []){
      setData(originalData);
    }else{
      setData(aux2)
    }

  }

  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get("http://192.168.5.1:8000/api/medicion/").then((res) => {
      //console.log("Res.data = ", res.data);
      let aux = res.data.mediciones
      //sorting data....
      console.log("Array before ", res.data.mediciones)
      aux.sort((a,b) => a.measure_at > b.measure_at)
      console.log("Array after ", aux)
      setOriginalData(aux);
      console.log("original data ", originalData)
      setData(originalData);
      setIsLoading(false);

    })
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
            onChange={e => onChangeDateRevition(e.target.value)}
            onClick={e => console.log(e.target.value)}
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
          <tbody id="date">
            {data.length > 0 &&
              data.map((value, i) => (
                <tr key={i}>
                  <td>{i}</td>
                  <td>{value.measure_at}</td>
                  <td>{value.value}</td>
                  <td>{value.address}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        <WaterGraphs data={data} />
        <WaterGraphs data={originalData} />
      </div>
      
    </div>
  );
};

