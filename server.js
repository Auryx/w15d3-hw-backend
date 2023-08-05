require("dotenv").config();
// const PORT = process.env.PORT || 8000
const { PORT = 8000, DATABASE_URL } = process.env
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")

/////////////////////////

mongoose.connect(DATABASE_URL)

mongoose.connection
.on("open", () => console.log("Mongo connected"))
.on("close", () => console.log("Mongo disconnected"))
.on("error", () => console.log(error))

/////////////////////////

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

/////////////////////////

const cheeseSchema = new mongoose.Schema({
    name: String,
    countryOfOrigin: String,
    image: String    
})

const Cheese = mongoose.model("Cheese", cheeseSchema)

/////////////////////////
app.get("/", (req, res) => {
    res.json({hello: "world"})
})

/////////////////////////

// INDUCES => IDUCS: INDEX DESTROY UPDATE CREATE SHOW

// INDEX - GET - /cheese - gets all Cheese
app.get("/cheese", async (req, res) => {
    try {
      // fetch all Cheese from database
      const cheese = await Cheese.find({});
      // send json of all Cheese
      res.json(cheese);
    } catch (error) {
      // send error as JSON
      res.status(400).json({ error });
    }
});

// CREATE - POST - /cheese - create a new cheese
app.post("/cheese", async (req, res) => {
    try {
        // create the new cheese
        const cheese = await Cheese.create(req.body)
        // send newly created cheese as JSON
        res.json(cheese)
    }
    catch(error){
        res.status(400).json({ error })
    }
});

// SHOW - GET - /cheese/:id - get a single cheese
app.get("/cheese/:id", async (req, res) => {
    try {
      // get a cheese from the database
      const cheese = await Cheese.findById(req.params.id);
      // return the cheese as json
      res.json(cheese);
    } catch (error) {
      res.status(400).json({ error });
    }
});

// UPDATE - PUT - /cheese/:id - update a single cheese
app.put("/cheese/:id", async (req, res) => {
    try {
      // update the cheese
      const cheese = await Cheese.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      // send the updated cheese as json
      res.json(c);
    } catch (error) {
      res.status(400).json({ error });
    }
});

// DESTROY - DELETE - /Cheese/:id - delete a single cheese
app.delete("/cheese/:id", async (req, res) => {
    try {
        // delete the cheese
        const cheese = await Cheese.findByIdAndDelete(req.params.id)
        // send deleted cheese as json
        res.status(204).json(cheese)
    } catch(error){
        res.status(400).json({error})
    }
})

/////////////////////////

app.listen(PORT, () => console.log(`listening on ${PORT}`))