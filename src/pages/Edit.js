import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import "../style/edit.css"

const Edit = () => {
  const param = useParams();
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [tahunTerbit, setTahunterbit] = useState("");

  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:8000/daftarBuku/" + param.id)
      .then((response) => {
        const newBook = response.data;
        setJudul(newBook.judul);
        setDeskripsi(newBook.deskripsi);
        setTahunterbit(newBook.tahunTerbit);
        setPengarang(newBook.pengarang);
      })
      .catch((error) => {
        alert("Terjadi kesalahan Sir!!" + error);
      });
  }, []);

  const submitActionHandler = async (event) => {
    event.preventDefault();

    await axios
    .put("http://localhost:8000/daftarBuku/" + param.id, {
      judul: judul,
      deskripsi: deskripsi,
      pengarang: pengarang,
      tahunTerbit: tahunTerbit
    })
    .then(() => {
        alert("berhasil mengubah data user ygy");
        history.push("/");
        window.location.reload();
    })
    .catch((error) => {
        alert("Terjadi kesalahan :" + error)
    })
  };
  return (
    <div className="edit mx-5">
      <div className="container my-5">
        <h2>Update</h2>
        <hr />
        <Form onSubmit={submitActionHandler}>
          <div className="name mb-3">
            <Form.Label>
              <strong>Judul</strong>
            </Form.Label>
            <InputGroup className="d-flex gap-3">
              <Form.Control
                placeholder="Judul"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
              />
            </InputGroup>
          </div>

          <div className="place-of birth mb-3">
            <Form.Label>
              <strong className="name">Deskripsi</strong>
            </Form.Label>
            <InputGroup className="d-flex gap-3">
              <Form.Control
                placeholder="Deskripsi"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
              />
            </InputGroup>
          </div>

          <div className="birth-date mb-3">
            <Form.Label>
              <strong className="name">Tahun Terbit</strong>
            </Form.Label>
            <InputGroup className="d-flex gap-3">
              <Form.Control
                type="Date"
                placeholder="tahunTerbit"
                value={tahunTerbit}
                onChange={(e) => setTahunterbit(e.target.value)}
              />
            </InputGroup>
          </div>

          <div className="birth-date mb-3">
            <Form.Label>
              <strong className="name">Pengarang</strong>
            </Form.Label>
            <InputGroup className="d-flex gap-3">
              <Form.Control
                placeholder="Pengarang"
                value={pengarang}
                onChange={(e) => setPengarang(e.target.value)}
              />
            </InputGroup>
          </div>
          <div>
            <div className="d-flex justify-content-end align-items-center mt-2 mb-">
              <button className="button btn btn-primary" type="submit">
                Save
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Edit;
