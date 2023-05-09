import asyncHandler from "../service/asyncHandler.js"
import CustomError from "../service/CustomError.js"
import User from "../models/user.schema.js"

export const cookieOption = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true
}

/*******************************************************
 * @SIGNUP
 * @route http://localhost:5000/api/auth/signup
 * @description User signUp Controller for creating new user
 * @returns User Object
 *********************************************************/

export const signUp = asyncHandler(async(req, res) => {

    // get data from user
    const {name, email, password} = res.body

    // validation
    if(!name || !email || !password) {
        throw new CustomError("Please provide all the fields", 400)
    }

    // now add the data to database
    // first check if data exists
    const existingUser = await User.findOne({email})

    if (existingUser){
        throw new CustomError("User already exists")
    }

    const user = await User.create({
        name,
        email,
        password
    })

    const token = user.getJWTtoken()

    // safety
    user.password = undefined

    // store this token to user's cookie
    res.cookie("token", token, cookieOption)

    res.status(200).json({
        success: true,
        token,
        user
    })
})

export const login = asyncHandler(async(req, res) => {
    
    // get data from user
    const {email, password} = res.body

    // validation
    if(!email || !password){
        throw new CustomError("Please provide all the details", 400)
    }

    // check user exists
    const user = User.findOne({email}).select("+password")

    if (!user){
        throw new CustomError("Invalid Credentials", 400)
    }

    // If user exists then match the password
    const isPasswordMatched = user.comparePassword(password)

    if (isPasswordMatched){
        const token = user.getJWTtoken()
        user.password = undefined
        res.cookie("token", token, cookieOption)
        return res.status(200).json({
            success: true,
            token,
            user
        })
    }

    throw new CustomError("Password is incorrect", 400)
})

export const logout = asyncHandler(async(req, res)=> {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})