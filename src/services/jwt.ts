
import jwt from "jsonwebtoken";

type Data = {
    id : String
};

export function generateToken(data : Data){
    const token = jwt.sign(data,process.env.JWT_KEY  as string);
    return token;
}

export function verifyToken(token : string) {
    try{    
        const data = jwt.verify(token,process.env.JWT_KEY as string);
        return data;
    }catch(error){
        return null;
    }
    
    
}
