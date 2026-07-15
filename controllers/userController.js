import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export async function createUser(req, res) {
    try{
        const passwordHash = bcrypt.hashSync(req.body.password, 10);

        const newUser = new User({

            email : req.body.email,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            password : passwordHash

        })
    
        await newUser.save()
        res.json({message: "User created successfully"})

    } catch (error) {
        res.json(
            {
                message: "Error creating user",
            }
        )
    }
    
}

export async function loginUser(req, res) {

    try {

        const user = await User.findOne({
            email:req.body.email
        })

        console.log(user)

        if (user == null){
            res.status(404).json({
                message: "User not found!"
            })
        }else{
            const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.password)
            if (isPasswordCorrect){

                const payload = {
                    email : user.email,
                    firstname : user.firstname,
                    lastname : user.lastname,
                    isAdmin : user.isAdmin,
                    isBlocked : user.isBlocked,
                    isEmailVerified : user.isEmailVerified,
                    image : user.image
                }
            
             const token = jwt.sign(payload,process.env.JwtSecretKey, {
                expiresIn : "48h"
             })

                console.log(token)
                res.json({
                    isAdmin : user.isAdmin,
                    token : token
                })

            }else{

                res.status(401).json({
                    message : "Invalid password"
                })
            }
        }
    }catch (error) {
        res.status(500).json({
            message : "Error logging in"
        })

    }
}

export default function isAdmin(req){
    if (req.user == null){
        return false
    }
    if (req.user.isAdmin){
        return true
    }else{
        return false
    }
}