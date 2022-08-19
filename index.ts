import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { sequelizeClient } from "./database/client";
import { port } from "./config.json"
import { addNewUser, getUser } from "./routes/user";
import { updateLocation } from "./routes/loc";
import { getShops } from "./routes/getshops";

const app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json

app.use(bodyParser.json())
app.post('/adduser', addNewUser)
app.post('/getuser', getUser)
app.post('/updatelocation', updateLocation)
app.get('/getshops', getShops)

sequelizeClient.sync().then(() => {
    console.log("Database synced");
}).catch((err) => {
    console.log(`Encountered an error ${err}`);
})

app.listen(port, () => console.log(`Listening on port ${port}`));