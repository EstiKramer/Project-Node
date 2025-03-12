import { userModel } from "../models/User.js";

export async function getAllusers(req,res) {
    try{
        let data = await userModel.find();
        res.json(data)
    }
    catch (err){
        console.log(err)
        res.status(400).json({title:"cannot get all users",message:
            err.message
        })

    }}
    export async function getById(req, res) {
        let {id} = req.params
        try{
            let data = await userModel.findById(id)
            if(!data)
                return res.status(404).json({title:"cannot find by id",message:"user with such id not found"})
            res.json(data)
        }
        catch(err){
            console.log(err)
            res.status(400).json({title:"cannot gey by id",message:err.message})
        }
    }
  



export async function updateUserDetails(req, res) {
    let { id } = req.params;
    const { username, email, role, registration } = req.body;

    // ווידוא שכל הפרטים שהוזנו קיימים
    if (!username && !email && !role && !registration) {
        return res.status(400).json({
            title: "missing parameters",
            message: "At least one of username or email must be provided"
        });
    }

    try {
        // עידכון רק את הנתונים שהוזנו
        let data = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!data) {
            return res.status(404).json({
                title: "cannot update by id",
                message: "user with such id not found"
            });
        }
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            title: "cannot update",
            message: err.message
        });
    }
}

// פונקציה לעדכון סיסמה
export async function updateUserPassword(req, res) {
    let { id } = req.params;
    const { newPassword } = req.body;

    // ווידוא שהוזנה סיסמה חדשה
    if (!newPassword) {
        return res.status(400).json({
            title: "missing password",
            message: "new password is required"
        });
    }

    try {
        // עדכון הסיסמה בלבד
        let data = await userModel.findByIdAndUpdate(id, { password: newPassword }, { new: true });
        if (!data) {
            return res.status(404).json({
                title: "cannot update by id",
                message: "user with such id not found"
            });
        }
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            title: "cannot update password",
            message: err.message
        });
    }
}

    export async function add_signUp(req, res) {
        console.log("Received data:", req.body);
        if(!req.body.userName || !req.body.email || !req.body.password )
            return res.status(404).json({title:"missing parameters",message:"name email password are required"})
        try{
            let newuser = new userModel(req.body)
            await newuser.save()
            res.json(newuser)
        }
        catch(err){
            console.log(err)
            res.status(400).json({title:"cannot add",message:err.message})
        }
    }
    export async function getUserByNamePassword_Login(req, res) {
        try{
            let data = await userModel.findOne({email:req.body.email, password:req.body.password})
            if(!data)
                return res.status(404).json({title:"cannot find user with such details",message:"wrong name or password"})
            res.json(data)
        }
        catch(err){
            console.log(err)
            res.status(400).json({title:"cannot log in user",message:err.message})
        }
    }