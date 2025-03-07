import jwt from "jsonwebtoken"

export const generateToken = (userId , res)=>{

    const token = jwt.sign({userId} , process.env.JWT_KEY , {
        expiresIn: "1h"
    })

    res.cookie("chatToken" ,  token , {
        maxAge : 60 * 60 * 1000 , 
        httpOnly : true ,
        sameSite : "strict",
        secure : process.env.NODE_ENV !== "development"
    })

    return token ;
}