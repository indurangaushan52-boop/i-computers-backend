import Student from "../models/students.js";
import jwt from "jsonwebtoken";

export function createStudent(req, res) {

  if (req.user == null){

    res.status(403).json({
      message : "Unauthorized Access, you need to login before creating student"
    })
    return
  }

  if (!req.user.isAdmin){
    res.status(403).json({
      message : "Only Admins can create students"
    })
    return
  }


  const newStudent = new Student({
      name: req.body.name,
      age: req.body.age,
      city: req.body.city
  })
  newStudent.save().then(
    ()=> {
      res.json(
        { message: "Student created successfully" });
    }
  ).catch(
    (error)=>("Error creating student: ",error)

    )

};  

export function getStudents(req, res) {
    
  Student.find().then(

    (result) => {

      console.log("Students retrieved successfully");
      res.json(result);

    }
  )}
