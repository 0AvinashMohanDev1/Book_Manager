const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {redisClient}=require("../helpers/redis")
require("dotenv").config();

class Users{
    /**
     * @desc add user
     * @route POST /register
     * @access Public 
     */

    static async addUser(req, res) {
        const { name, email, password, role } = req.body;
        try {
          const userExists = await User.findOne({ email });
          if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
          }
      
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
      
          const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
          });
      
          let token=await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:5*60*60});
          await redisClient.set(req._remoteAddress,token,{EX:5});
          if (user) {
            res.status(201).json({
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              token: token,
            });
          } else {
            res.status(400).json({ message: 'Invalid user data' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Server error', error:error.message });
        }
      }
    /**
     * @desc get user
     * @route POST /login
     * @access Public 
     */
      static async login(req, res) {
        const { email, password } = req.body;
      
        try {
          const user = await User.findOne({ email });

          const payload={id:user._id,name:user.name,role:user.role}
      
          let token=await jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:15*60*60});
          await redisClient.set(req._remoteAddress,token,{EX:15*60});
          if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              token: token,
            });
          } else {
            res.status(401).json({ message: 'Invalid email or password' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Server error', error:error.message });
        }
      }

      /**
     * @desc get users
     * @route GET /
     * @access Protected (Requires authentication token and role as admin) 
     */
      static async getUsers(req,res){
        try {
          let users=await User.find();
          res.status(200).json({users});
        } catch (error) {
          res.status(500).send({error:error.message});
        }
      }

      /**
     * @desc update user
     * @route PUT /:id
     * @access Protected (Requires authentication token and role as admin) 
     */
      static async updateUser(req,res){
        try {
          let id=req.params.id;
          const data=req.body;
          let result=await User.findByIdAndUpdate(id,data);
          res.status(200).json({message:"User Update success fully"});
        } catch (error) {
          res.status(500).send({error:error.message});
        }
      }

      /**
     * @desc delete user
     * @route DELETE /:id
     * @access Protected (Requires authentication token and role as admin) 
     */
      static async deleteUser(req,res){
        try {
          let result=await User.findByIdAndDelete(req.params.id);
          res.status(200).json({message:"User has been removed"});
        } catch (error) {
          res.status(500).json({error:error.message});
        }
      }
}

module.exports=Users;