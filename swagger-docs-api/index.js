const express = require("express")
const swaggerUi = require("swagger-ui-express")
const YAML = require("yaml")
const fs = require("fs");
const fileUpload = require("express-fileupload");

const app = express();

const PORT = process.env.PORT || 3000;

// Initialize Swagger
const swaggerDocument = YAML.parse(fs.readFileSync("./swagger.yaml", "utf-8"))

// Middlewares
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json())
app.use(fileUpload());

let courses = [
    {
        id: "11",
        name: "Nodejs",
        price: 1000
    },
    {
        id: "22",
        name: "Reactjs",
        price: 2000
    },
    {
        id: "33",
        name: "Vuejs",
        price: 3000
    }
]

app.get("/", (req, res) => {
    res.send("hello")
})

app.get("/api/v1/string", (req, res) => {
    res.send("hello world");
})

app.get("/api/v1/object", (req, res) => {
    res.json({
        message: "hello world"
    });
});

app.get("/api/v1/array", (req, res) => {
    res.json(courses)
})

app.get("/api/v1/object/:id", (req, res) => {
    const course = courses.find(course => course.id == req.params.id)
    res.json(course)
})

app.post("/api/v1/object", (req, res) => {
    const course = req.body;
    courses.push(course)
    res.json(courses.length)
})

app.get("/api/v1/urlquery", (req, res) => {
    res.json(req.query);
})

app.post("/api/v1/fileupload", (req, res) => {

    const image = req.files.file;
    console.log(req.headers)
    uploadPath = __dirname + '/images/' + Date.now() + ".jpg";

    // Use the mv() method to place the file somewhere on your server
    image.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');
    });
})

app.listen(PORT, () => {
    console.log("http://localhost:3000")
})
