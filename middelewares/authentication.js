import jwt from "jsonwebtoken"
import dotenv from "dotenv"

export default function authenticateUser(req,res,next){
    
    
    const header = req.header("Authorization")

    if (header != null){

      const token = header.replace("Bearer ","")

      jwt.verify(token,process.env.JwtSecretKey, 
        (error, decoded)=>{
          
          console.log(decoded)
          if (decoded == null){
            res.json(
              {
                message : "Invalid Token Please Login Again"
              }
            )
          }else{
            
            req.user = decoded
            next()


          }

        }
      )

    }else{
      next()
    }

}