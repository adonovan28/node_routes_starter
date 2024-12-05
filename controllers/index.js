const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;


const awesomeFunction = (Req, res, next) => {
  res.json("Awesome Name!");
};

const tooeleTechFunction = (Req, res, next) => {
  res.json("Tooele Tech is Awesome!");
};

const getAllStudents = async(req, res) =>{
  try {
    const result = await mongodb.getDb().db().collection("students").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET single contact
const getSingleStudent = async (req, res)=>{
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("students")
      .find({_id: userId});
    result.toArray().then((lists) =>{
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

//CREATE contact
// const createStudent = async (req, res)=>{
//   try {
//     const student = {
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       age: req.body.age,
//       currentCollege: req.body.currentCollege,
//     };

//     console.log(student);
    
//     const response = await mongodb
//       .getDb()
//       .db()
//       .collection("students")
//       .insertOnce(student);
//       if (response.acknowledged) {
//         res.status(201).json(response);
//       } else {
//         res 
//           .status(500)
//           .json(
//             response.error|| "Some error occurred while creating the student."
//           );
//       }
//   } catch (error) {
//     res.status(500).json(error);
//   }

// }
const createStudent = async (req, res) => {
  try {
      const student = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          age: req.body.age,
          currentCollege: req.body.currentCollege
      };

      const response = await mongodb.getDb().db().collection("students").insertOne(student);
      if (response.acknowledged) {
          res.status(201).json(response);
      } else {
          res.status(500).json(response.error || "Some error occurred when created this student");
      }
  } catch (error) {
      res.status(500).json(error);
  }

}
// update one student
// const updateStudent = async(req, res) => {
//   try {
//     const userId = newObjectId(req.params.id);
//     const student = {
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       age: req.body.age,
//       currentCollege: req.body.currentCollege,
//     };

//     console.log(JSON.stringify(student));
    

//     const response = await mongodb
//       .getDb()
//       .db()
//       .collection("students")
//       .replaceOne({_id: userId}, student);
//     if(response.acknowledged){
//       res.status(204).json(response);
//     }else{
//       res
//         .status(500)
//         .json(
//           response.error || "Some error occurred while updating the student."
//         );
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
const updateStudent = async (req, res) => {
  try {
      const userId = new ObjectId(req.params.id);
      let student = await mongodb.getDb().db().collection("students").findOne({_id: userId});

      if (req.body.firstName !== undefined) {
          student.firstName = req.body.firstName;
      }
      if (req.body.lastName !== undefined) {
          student.lastName = req.body.lastName;
      }
      if (req.body.email !== undefined) {
          student.email = req.body.email;
      }
      if (req.body.age !== undefined) {
          student.age = req.body.age;
      }
      if (req.body.currentCollege !== undefined) {
          student.currentCollege = req.body.currentCollege;
      }

      const response = await mongodb.getDb().db().collection("students").replaceOne({_id: userId}, student);
      if (response.acknowledged) {
          res.status(204).json(response);
      } else {
          res.status(500).json(response.error);
      }

  } catch (error) {
      res.status(500).json(error)
  }
}

//delete student
const deleteStudent = async (req, res)=>{
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("students")
      .deleteOne({_id: userId}, true);
    console.log(response);
    if(response.acknowledged){
      res.status(200).send(response);
    }else{
      res
        .status(500)
        .json(
          response.error || "Some error occurred while deleting the student."
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { awesomeFunction, tooeleTechFunction, getAllStudents, updateStudent, createStudent, getSingleStudent, deleteStudent };
