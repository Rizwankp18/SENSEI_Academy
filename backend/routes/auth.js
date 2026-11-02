const router=require('express').Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const Admin=require('../models/Admin');
router.post('/login',async(req,res,next)=>{
  try{
    const email=String(req.body.email||'').trim().toLowerCase();
    const password=String(req.body.password||'');
    const admin=await Admin.findOne({email});
    if(!admin || !(await bcrypt.compare(password,admin.passwordHash))) return res.status(401).json({message:'Incorrect email or password'});
    const token=jwt.sign({id:admin._id,email:admin.email},process.env.JWT_SECRET,{expiresIn:'12h'});
    res.json({token,admin:{name:admin.name,email:admin.email}});
  }catch(err){next(err)}
});
module.exports=router;
