const cors=require("cors")
const express=require("express")
const mongoose=require("mongoose")
const app=express();
const alert=require("alert")
const jwt=require("jsonwebtoken");
const middleware = require("./middleware");
app.use(express.json());
app.use(cors());
app.listen("1000",(req,res)=>{
    console.log("ok")
})

mongoose.connect("mongodb://localhost:27017/myntra",{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(!err){console.log("connected")}
    else{console.log("noit connected")}
})

const schem=mongoose.Schema({
    name:String,
    email:String,
    pass:String,
})
const User=mongoose.model("register",schem)
const sch=mongoose.Schema({
    id:Number,
        Name:String,
        Category:String,
        Image:String,
        Price:Number,
        quantity:Array
})
const Item=mongoose.model("items",sch)

const bill=mongoose.Schema({
    Date:{
        type:Date,
        default:Date.now()
    },
    person:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"register",
    },
    total:Number,
    foodItem:[{
    id:Number,
    Name:String,
    Category:String,
    Image:String,
    Price:Number,
    quantity:Array,
    qu:String,
    total:Number,
}
]
})
const Bill=mongoose.model("bills",bill)
app.post("/reg",async(req,res)=>{
    const {name,email,pass}=req.body;
    const use=new User({
        name,email,pass
    })
    let exist=await User.findOne({email:email});
    if(exist){
        alert("user exist")
    }
    else{
       await  use.save();
        alert("user registered")
    }
})
app.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    let exist=await User.findOne({email:email});
    if(exist){
        if(exist.pass===pass){
            alert("user logged in")
            let payload={
                user:{
                    id:exist.id
                }
            }
            jwt.sign(payload,'jwtsecret',{expiresIn:3600000},
            (err,token)=>{
                if(!err){
                    return res.json(token)
                }
            })
        }
        else{
            alert("wrong password")
        }
    }
    else{
        alert("user not exist")
    }
})

app.get("/get",middleware,async(req,res)=>{
    const exist =await User.findById(req.user.id);
    return res.json(exist)
})

app.get("/item",middleware,async(req,res)=>{
    const exist=await Item.find();
    return res.json(exist)
})
app.post("/bill",middleware,async(req,res)=>{
    const {foodItem,total}=req.body;
    const us=new Bill({
       foodItem:foodItem,
       person:req.user.id,
       total:total
    })
    await us.save();
    alert("bill payed succesfully")
    return res.json(us)
})
app.get("/bills",middleware,async(req,res)=>{
    let exist=await Bill.find({person:req.user.id});
    return res.json(exist)
})