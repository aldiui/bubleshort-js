// Menggunakan framework backend javascript express
const express = require("express");
// Memparsing data dengan library body parser
const bodyParser = require("body-parser");
// Library bawaah node js untuk mengakses file
const fs = require("fs");

// Inisialisasi framework express
const app = express();
// Mendefiniskan PORT yang digunakan
const port = 3000;

// Pengaturan parsing data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mendukung untuk statis juga untuk menampilkan index.html
app.use(express.static("public"));

// Index.html sebagai route uri
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Routing untuk menyimpan data
app.post("/saveData", (req, res) => {
    // Menangkap data yang diinputkan
    const inputAngka = req.body.inputAngka;

    // Cek validasi input data
    if (!inputAngka) {
        res.status(400).json({ success: false, message: "Input angka tidak boleh kosong!" });
        return;
    }

    // Melakukan shorting data dan validasi type data
    const bubbleShort = inputAngka.map((num) => parseInt(num)).sort((a, b) => a - b);

    //  Data yang disimpan ke data.txt
    const dataToSave = `Nilai tugas : ${bubbleShort.join(", ")}`;

    //  Proses menyimpan data ke data.txt
    fs.writeFile("public/data.txt", dataToSave, (err) => {
        if (err) {
            // Response error
            res.status(500).json({ success: false, message: "Error saving data to file" });
        } else {
            // Response success
            res.status(200).json({ success: true, message: "Data berhasil tersimpan!", data: dataToSave });
        }
    });
});

// Routing untuk menghapys data
app.post("/deleteData", (req, res) => {
    // Menangkap data yang diinputkan
    const inputAngka = req.body.inputAngka;

    // Cek validasi input data
    if (!inputAngka) {
        res.status(400).json({ success: false, message: "Input angka tidak boleh kosong!" });
        return;
    }

    //  Data yang disimpan ke data.txt
    const dataToSave = `Nilai tugas : ${inputAngka}`;

    //  Proses menhapus data dengan mereset dan replace ke data.txt
    fs.writeFile("public/data.txt", dataToSave, (err) => {
        if (err) {
            // Response error
            res.status(500).json({ success: false, message: "Error saving data to file" });
        } else {
            // Response success
            res.status(200).json({ success: true, message: "Data berhasil direset ulang!", data: dataToSave });
        }
    });
});

// Inisialisasi untuk menjalankan server dengan port yang sudah ditentukan
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
