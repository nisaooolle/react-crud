import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../style/Home.css";
import Swal from "sweetalert2";

export default function Home() {
  const [buku, setBuku] = useState([]); //useState berfungsi untuk menyimpan data sementara

  //untuk melihat semua data
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
    //mengambil data, memperbarui DOM secara langsung,
    getAll();
  }, []);

  //menghapus data
  const deleteUser = async (id) => {
    Swal.fire({
      title: "Yakin ingin menghapus data ini?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:8000/daftarBuku/" + id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }); // untuk pemberitahuan jika sudah berhasil menghapus
    getAll();
  };
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
            {localStorage.getItem("id") !== null ? <th>action</th> : <></>}
          </tr>
        </thead>
        <tbody>
          {buku.map(
            (
              book,
              index //map untuk memetakan data
            ) => (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.judul}</td>
                <td>{book.deskripsi}</td>
                <td>{book.tahunTerbit}</td>
                <td>{book.pengarang}</td>
                {localStorage.getItem("id") !== null ? (
                  <td className="data">
                    <Button //button klik untuk delete
                      variant="danger"
                      className="mx-1"
                      onClick={() => deleteUser(book.id)}
                    >
                      Hapus
                    </Button>
                    {/* untuk mengarahkan web ke path edit */}
                    <a href={"/edit/" + book.id}>
                      <Button //button klik untuk edit
                        variant="warning"
                        className="mx-1"
                      >
                        Ubah
                      </Button>
                    </a>
                  </td>
                ) : (
                  <></>
                )}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
