import axios from "axios";
import React, { useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import "../style/nav.css";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2"

function NavigationBar() {
  //method post
  const [show, setShow] = useState(false); //useState berfungsi untuk menyimpan data sementara
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [tahunTerbit, setTahunterbit] = useState("");

  const history = useHistory();

  const handleClose = () => setShow(false); // fungsi handleClose akan menyetel variabel acara ke false.
  const handleShow = () => setShow(true); //  menyetel variabel status acara ke true,

  const addUser = async (e) => {
    e.preventDefault(); //mencegah reload

    //memanggil data dri method
    const data = {
      judul: judul,
      deskripsi: deskripsi,
      pengarang: pengarang,
      tahunTerbit: tahunTerbit,
    };

    //axios post untuk menambahkan data ke database
    await axios.post("http://localhost:8000/daftarBuku", data);
    Swal.fire({
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
      .then(() => {
        window.location.reload(); //otomatis reload web setelah menambahkan data
      })
      .catch((error) => {
        // alert error untuk mengetahui jika terjadi error
        alert("Terjadi kesalahan" + error);
      });
  };

  const logout = () => {
    window.location.reload();
    localStorage.clear();
    history.push("/login");
  };

  return (
    //navbar untuk masuk ke masing" path
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Perpustakaan Sederhana
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <a className="navbar-brand btn" href="/">
             Home
          </a>
              </li>
              {localStorage.getItem("id") !== null ? (
                <>
                  <li className="nav-item">
                    <button className="navbar-brand btn" onClick={handleShow}>
                      Tambah Buku
                    </button>
                  </li>
                  <li className="nav-item float-ringht">
                    <a className="navbar-brand btn" onClick={logout}>
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <li className="nav-item float-ringht">
                  <a className="navbar-brand btn" href="/login">
                    Login
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {/* modal untuk mengisi data saat ingin menambahkan isi table */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="add" closeButton>
          <Modal.Title>Add Buku</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addUser} method="POST">
            <div className="mb-3">
              <Form.Label>
                <strong>Judul</strong>
              </Form.Label>
              <InputGroup className="d-flex gap-3">
                <Form.Control
                  placeholder="Masukkan Judul"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  required
                />
              </InputGroup>
            </div>
            <div className="mb-3">
              <Form.Label>
                <strong>Deskripsi</strong>
              </Form.Label>
              <InputGroup className="d-flex gap-3">
                <Form.Control
                  placeholder="Masukkan Deskripsi"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  required
                />
              </InputGroup>
            </div>
            <div className="mb-3">
              <Form.Label>
                <strong>Tahun Terbit</strong>
              </Form.Label>
              <InputGroup className="d-flex gap-3">
                <Form.Control
                  type="Date"
                  placeholder="Masukkan Tahun Terbit"
                  value={tahunTerbit}
                  onChange={(e) => setTahunterbit(e.target.value)}
                  required
                />
              </InputGroup>
            </div>
            <div className="mb-3">
              <Form.Label>
                <strong>Pengarang</strong>
              </Form.Label>
              <InputGroup className="d-flex gap-3">
                <Form.Control
                  placeholder="Masukkan Pengarang"
                  value={pengarang}
                  onChange={(e) => setPengarang(e.target.value)}
                  required
                />
              </InputGroup>
            </div>
            <button
              className="mx-1 button-btl btn btn-danger"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="mx-1 button btn btn-primary"
              onClick={handleClose}
            >
              Save
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default NavigationBar;
