const mongoose=require("mongoose");
var bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken")
// const keysecret=process.env.SECRETY_KEY;

const keysecret = process.env.SECRET_KEY


const Students=new mongoose.Schema({ 
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  shortId: { type: String, unique: true } ,// Ensure shortId is unique
    date: {
        type: Date,
        default: Date.now // Default value for date
      },
    
    tokens:[
        {
            token:{
                type:String
            },
        }
    ]



})


//new models  -------------------------------->>>
const studentSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    date: { type: Date, default: Date.now }, // Default date time
    shortId: { type: String, unique: true }, // Ensure shortId is unique
    tokens:[
        {
            token:{
                type:String
            },
        }
    ],
    address: [
        {
            add: { type: String }
        }
    ],

 
});




studentSchema.methods.generateAuthToken = async function (href, ip, hostname, pathname, protocol, connection, host, secChUaPlatform, acceptLanguage, secChUa) {
    const token = {
        href,
        'IP Address': ip,
        Host: hostname,
        Pathname: pathname,
        Protocol: protocol,
        Connection: connection,
        'Host Header': host,
        'Sec-CH-UA-Platform': secChUaPlatform,
        'Accept-Language': acceptLanguage,
        'Sec-CH-UA': secChUa
    }; // Example token, this should be generated securely
    this.address.push({ add: JSON.stringify(token) });
    await this.save();
    return token;
};



//Simple token generation ----->><>>
// studentSchema.methods.generateAuthToken = async function () {
//     let token = "453564456456"; // Example token, this should be generated securely
//     this.address.push({ add: token });
//     await this.save();
//     return token;
// };


///JSON web Token authentication



//////////////////////////LINK - 
//we are generated token /// store in DataBase
//authentication 

//GenerateAuthToken is a function use in login router

Students.methods.generateAuthtoken = async function () {

  try {
    let token23 = jwt.sign({
      userID:this._id.toString(),
    email:this.email}, keysecret)


    this.tokens = this.tokens.concat({ token: token23 });
    await this.save();
    return token23;
} catch (error) {
    res.status(422).json(error)
} 
};


  ///Hash create in password ////////////use express

Students.pre("save", async function (next) {
    try {
      if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
      }
  
      next();
    } catch (error) {
      throw new Error(error);
    }
  });




const Register = new mongoose.model("Usersdata", Students,)
    // Error handler function
  module.exports = Register;
