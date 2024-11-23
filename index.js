import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userModel from "./model/userModel.js";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGOURI = process.env.MONGO_URI;

mongoose
  .connect(MONGOURI)
  .then(() => {
    console.log("mongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(console.error);
  });


app.get("/get-todo", async (req, res) => {
    try {
        const result = await userModel.find();
        res.send({
            success: true,
            message: "todos fetched successfully",
            data: result,
        })
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "todo fetching failed",
        })
    }
})

app.get("/:todoId", async (req, res) => {
    const todoId =  req.params.todoId;
    try {
        const result = await userModel.findById(todoId);
        res.send({
            success: true,
            message: "fetched todo item by todoId",
            data: result
        })
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "todo item fetch failed",
        })
    }
})

app.post("/create-todo", async (req, res) => {
    const userTodoData = await req.body;
    try {
        const result = await userModel.create(userTodoData);
        res.send({
            success: true,
            message: "Todo created Successfully",
            data: result,
        })
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Failed to create Todo",
        })
    }
})

app.put("/update/:todoId", async (req, res) => {
    const todoId = req.params.todoId;
    const updatedData = req.body;
    try {
        const result = await userModel.findByIdAndUpdate(todoId, updatedData, {new: true,});
        res.send({
            success: true,
            message: "todo item updated successfully",
            data: result,
        })
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "failed to update item",
        })
    }
})

app.delete("/delete/:todoId", async (req, res) => {
    const todoId = req.params.todoId
    try {
        const result = await userModel.findByIdAndDelete(todoId);
        res.send({
            success: true,
            message: "todo item deleted Successfully",
            data: result,
        })
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "failed to delete todo item",
        })
    }
})