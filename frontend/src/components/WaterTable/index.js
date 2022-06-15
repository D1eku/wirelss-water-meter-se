import React from "react";
import Row from "./Row";

export default function WagonTable({ wagon }) {
  /**
   *
   * @param {id, tara, tipo_carro}
   * @returns row object
   *
   * renderRow, nos permite renderisar y enviar los paramétros para dibujar la fila
   */
  const renderRow = ({ id, tara, tipo_carro }) => {
    return <Row numid={id} tare={tara} type={tipo_carro} />;
  };

  /**
   * Al llamar a la función table, dibujamos principalmente la tabla que será mostrada en pantalla.
   * En la sección tbody se recorre trainEngine para poder dibujar cada una de las filas.
   */
  const table = () => {
    return (
      <div className=" sm: w-min md: w-screen-md lg: w-screen-lg xl: w-screen-xl">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-2 overflow-x-auto">
          <h1 className="font-bold text-xl text-gray-800">
            Carros Registrados
          </h1>
          <form className="mt-4">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider ">
                      Número
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                      Peso Tara
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                      Tipo Carro
                    </th>
                  </tr>
                </thead>
                <tbody>{wagon.map(renderRow)}</tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return table();
}
