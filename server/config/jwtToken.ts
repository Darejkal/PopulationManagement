const jwt = require("jsonwebtoken");

const generateToken = (id:string) => {
    return jwt.sign({
        id: id
    }, process.env.JWT_SECRET, {expiresIn: "24h"})
}

export default generateToken