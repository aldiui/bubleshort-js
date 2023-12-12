const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/saveData", (req, res) => {
    const inputAngka = req.body.inputAngka;
    const bubbleShort = inputAngka.map((num) => parseInt(num)).sort((a, b) => a - b);

    const dataToSave = `Nilai tugas : ${bubbleShort.join(", ")}`;

    fs.writeFile("public/data.txt", dataToSave, (err) => {
        if (err) {
            res.status(500).json({ success: false, message: "Error saving data to file" });
        } else {
            res.status(200).json({ success: true, message: "Data berhasil tersimpan!", data: dataToSave });
        }
    });
});

app.post("/deleteData", (req, res) => {
    const deleteData = req.body.deleteData;
    const dataToSave = `Nilai tugas : ${deleteData}`;

    fs.writeFile("public/data.txt", dataToSave, (err) => {
        if (err) {
            res.status(500).json({ success: false, message: "Error saving data to file" });
        } else {
            res.status(200).json({ success: true, message: "Data berhasil direset ulang!", data: dataToSave });
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
