const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

require('dotenv').config();
const express=require('express');
const cors=require('cors');
const helmet=require('helmet');
const bcrypt=require('bcryptjs');
const connectDB=require('./config/db');
const Admin=require('./models/Admin');
const authRoutes=require('./routes/auth');
const dataRoutes=require('./routes/data');
const app=express();
app.use(helmet());
app.use(cors({origin:process.env.CLIENT_ORIGIN||'http://localhost:5173'}));
app.use(express.json({limit:'2mb'}));
app.get('/api/health',(req,res)=>res.json({status:'ok',service:'Sensei Academy API'}));
app.use('/api/auth',authRoutes);
app.use('/api/data',dataRoutes);
app.use((err,req,res,next)=>{console.error(err);res.status(500).json({message:'Server error. Check the backend terminal.'});});
const PORT=process.env.PORT||5000;
(async()=>{
  try {
    if(!process.env.JWT_SECRET) throw new Error('JWT_SECRET is missing in backend/.env');
    await connectDB();
    const email=(process.env.ADMIN_EMAIL||'').trim().toLowerCase();
    const password=process.env.ADMIN_PASSWORD||'';
    if(!email||!password) throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in backend/.env');
    const existing=await Admin.findOne({email});
    if(!existing){
      const passwordHash=await bcrypt.hash(password,12);
      await Admin.create({name:process.env.ADMIN_NAME||'Academy Administrator',email,passwordHash});
      console.log(`Initial admin created: ${email}`);
    } else console.log(`Admin account ready: ${email}`);
    app.listen(PORT,()=>console.log(`Sensei API running at http://localhost:${PORT}`));
  } catch(err){console.error('Startup failed:',err.message);process.exit(1)}
})();
