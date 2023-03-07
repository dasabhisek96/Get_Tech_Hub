const UserController = require("../controllers/UserController");
const userController = require("../controllers/UserController"),
{ check, validationResult } = require('express-validator');

module.exports = (app) =>{

    app.post('/api/signup',
    [
        check('email','Your email is not valid').notEmpty().isEmail(),
        check('password','Password is required').notEmpty(),
        check('name','Name is required').notEmpty(),
        check('phone','Phone is required').notEmpty().isLength({
            min:10,
            max:10
        }).isMobilePhone()
    ],
    (req,res,next)=>{
        const errors = validationResult(req); 
        if (!errors.isEmpty()) { 
            return res.status(403).json(errors) 
        }
        next();
    },
    async (req,res,next)=>{ 
        try {
            let option = {
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                phone: req.body.phone
            };
            let user = await userController.create(option);
            return res.status(201).json({"data":user});
        } catch (error) {
            return res.status(error.code).json({"error":error.message});
        }  
    });

    app.post('/api/login',
    [
        check('email','Your email is not valid').notEmpty().isEmail(),
        check('password','Password is required').notEmpty(),
    ],
    (req,res,next)=>{
        const errors = validationResult(req); 
        if (!errors.isEmpty()) { 
            return res.status(403).json(errors) 
        }
        next();
    },
    async (req,res,next)=>{
        try {
            let option = {
                email: req.body.email,
                password: req.body.password
            }
            let user = await UserController.login(option);
            return res.status(200).json({"data":user});
        } catch (error) {
            return res.status(error.code).json({"error":error.message});
        }
        
    });
}