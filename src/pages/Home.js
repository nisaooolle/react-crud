import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../style/Home.css"

export default function Home() {
  const [buku, setBuku] = useState([]);

  const getAll = () => {
    axios
      .get("http://localhost:8000/daftarBuku")
      .then((res) => {
        setBuku(res.data);
      })
      .catch((error) => {
        alert("Terjadi kesalahan" + error);
      });
  };

  useEffect(() => {
    getAll();
  }, []);

  const deleteUser = async (id) => {
    axios.delete("http://localhost:8000/daftarBuku/" + id);
    alert("user berhasil dihapuss ygy");
    getAll();
  }
  return (
    <div className="container my-5">
      <table className="table table-bordered">
        <thead>
          <tr className="tabel">
            <th>No</th>
            <th>Judul</th>
            <th>Deskripsi</th>
            <th>Tahun terbit</th>
            <th>Pengarang</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {buku.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.judul}</td>
              <td>{book.deskripsi}</td>
              <td>{book.tahunTerbit}</td>
              <td>{book.pengarang}</td>
              <td className="data">
                <Button
                  variant="danger"
                  className="mx-1"
                  onClick={() => deleteUser(book.id)}
                >
                  Hapus
                </Button>
                <a href={"/edit/" + book.id}>
                  <Button variant="warning" className="mx-1">
                    Ubah
                  </Button>
                </a>
              </td>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
