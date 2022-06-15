import Table from "react-bootstrap/Table";

const dummyData = [
  {
    id: 1,
    fecha: "10-08-2022",
    medicion: 9382,
    direccion: "mi casa",
  },
  {
    id: 1,
    fecha: "10-08-2022",
    medicion: 1234,
    direccion: "mi casa",
  },
  {
    id: 1,
    fecha: "10-08-2022",
    medicion: 1543,
    direccion: "mi casa",
  },
  {
    id: 1,
    fecha: "10-08-2022",
    medicion: 5754,
    direccion: "mi casa",
  },
  {
    id: 1,
    fecha: "10-08-2022",
    medicion: 3456,
    direccion: "mi casa",
  },
  {
    id: 1,
    fecha: "10-08-2022",
    medicion: 0,
    direccion: "mi casa",
  },
];

export const WaterMedition = () => {
  return (
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
  );
};
