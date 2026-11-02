const router=require('express').Router();
const AcademyData=require('../models/AcademyData');
const auth=require('../middleware/auth');
const fields=['students','attendance','payments','exams','expenses','inventory'];
router.use(auth);
router.get('/',async(req,res,next)=>{
  try { let doc=await AcademyData.findOne({key:'main'}).lean(); if(!doc) doc=await AcademyData.create({key:'main'}); const out={}; fields.forEach(k=>out[k]=doc[k]||[]); res.json(out); }
  catch(err){next(err)}
});
router.put('/',async(req,res,next)=>{
  try {
    const update={};
    for(const key of fields){ if(Object.prototype.hasOwnProperty.call(req.body,key)){ if(!Array.isArray(req.body[key])) return res.status(400).json({message:`${key} must be an array`}); update[key]=req.body[key]; } }
    if(!Object.keys(update).length) return res.status(400).json({message:'No valid academy records supplied'});
    const doc=await AcademyData.findOneAndUpdate({key:'main'},{$set:update,$setOnInsert:{key:'main'}},{new:true,upsert:true,runValidators:true});
    const out={}; fields.forEach(k=>out[k]=doc[k]||[]); res.json(out);
  }catch(err){next(err)}
});
router.post('/reset',async(req,res,next)=>{
  try { const empty={}; fields.forEach(k=>empty[k]=[]); await AcademyData.findOneAndUpdate({key:'main'},{$set:empty,$setOnInsert:{key:'main'}},{upsert:true,new:true}); res.json({message:'Academy records cleared'}); }
  catch(err){next(err)}
});
module.exports=router;
