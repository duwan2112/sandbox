import React, {useState} from "react";
import * as XLSX from "xlsx";
import {Badge} from "reactstrap";

export default function Index() {
  const [dateUsers, setDateUsers] = useState(null);
  const [search, setSearch] = useState("");
  const [dateSelected, setDateSelected] = useState(null);
  const [errorSelected, setErrorSelected] = useState(false);

  const handleChange = (e) => {
    const hojas = [];
    let reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onloadend = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, {type: "array"});
      workbook.SheetNames.forEach(function (sheetName) {
        const XL_row_object = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheetName]
        );
        hojas.push({data: XL_row_object, sheetName});
      });
      const newUsers = hojas.find(
        (element) => element.sheetName === "BD Construida"
      );

      setDateUsers(newUsers);
    };
  };

  const onSubmitSearch = (e) => {
    setErrorSelected(false);
    setDateSelected(null);
    e.preventDefault();
    const newSelected = dateUsers.data.find(
      (element) => element["ID PERSONAL"] === parseInt(search)
    );
    if (newSelected) {
      const keys = Object.keys(newSelected);
      const values = Object.values(newSelected);
      return setDateSelected({keys, values});
    }
    setErrorSelected(true);
    setTimeout(() => {
      setErrorSelected(false);
    }, 3000);
  };
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <input
        type="file"
        name="file"
        id="file"
        onChange={handleChange}
        placeholder="Ejemplo: 102312312"
      />

      {dateUsers && (
        <div>
          <form onSubmit={onSubmitSearch}>
            <div className="text-center pt-5 pb-4">
              {" "}
              <input
                type="number"
                name="search"
                value={search}
                onChange={onChangeSearch}
                id=""
              />
              <button type="submit">Enviar</button>
            </div>
            {errorSelected && (
              <div className="text-center">
                {" "}
                <Badge className="p-2" color="danger">
                  Cedula no encontrado{" "}
                </Badge>{" "}
              </div>
            )}
            {dateSelected && (
              <div className="text-center">
                {dateSelected.keys.map((element, i) => (
                  <p key={i}>
                    {element}: {dateSelected.values[i]}{" "}
                  </p>
                ))}
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
