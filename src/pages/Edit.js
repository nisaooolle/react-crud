import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import "../style/edit.css";
import Swal from "sweetalert2";

const Edit = () => {
  //method edit
  const param = useParams(); //mengembalikan objek
  const [judul, setJudul] = useState(""); //useState berfungsi untuk menyimpan data sementara
  const [deskripsi, setDeskripsi] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [tahunTerbit, setTahunterbit] = useState("");

  const history = useHistory(); // akses ke instance riwayat yang dapat digunakan untuk bernavigasi.

  useEffect(() => {
    //mengambil data, memperbarui DOM secara langsung,
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
    //untuk mengeksekusi setiap kali event dipicu.
    event.preventDefault(); //tindakan default yang termasuk dalam acara tersebut tidak akan terjadi.

    //axios put untuk mengedit data
    await Swal.fire({
      title: "Anda yakin ingin mengedit?",
      text: "yakinn ingin mengedit!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios.put("http://localhost:8000/daftarBuku/" + param.id, {
            judul: judul,
            deskripsi: deskripsi,
            pengarang: pengarang,
            tahunTerbit: tahunTerbit,
          });
          Swal.fire("Edit!", "Berhasil mengedit", "success");
        }
      })
      .then(() => {
        history.push("/"); //untuk mengepush ulang data setelah diedit
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        // window.location.reload();
      })
      .catch((error) => {
        alert("Terjadi kesalahan :" + error);
      });
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
