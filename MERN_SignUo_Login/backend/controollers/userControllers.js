const Register = require("../models/student");
var bcrypt = require('bcryptjs');
const fs =require('fs')
const shortid = require('shortid'); // Import shortid library


//////////   


exports.first = async (req, res) => {
    // Equivalent to window.location.hostname

    // console.log('Latitude: ' + position.coords.latitude);
    // console.log('Longitude: ' + position.coords.longitude);
    const hostname = req.hostname;
    // console.log(`Hostname: ${hostname}`);

    // Equivalent to window.location.pathname
    const pathname = req.path;
    // console.log(`Pathname: ${pathname}`);

    // Equivalent to window.location.protocol
    const protocol = req.protocol;
    // console.log(`Protocol: ${protocol}`);

    const href = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    // console.log(`Href: ${href}`);

    // Extract specific headers
    const headers = req.headers;
    const connection = headers['connection'];
    const host = headers['host'];
    const secChUaPlatform = headers['sec-ch-ua-platform'];
    const acceptLanguage = headers['accept-language'];
    const secChUa = headers['sec-ch-ua'];

    // Only server-side info
    const info = {
        'href': href,
        'IP Address': req.ip,
        'Host': req.hostname,
        'Pathname': req.path,
        'Protocol': req.protocol,
        'Connection': connection,
        'Host Header': host,
        'Sec-CH-UA-Platform': secChUaPlatform,
        'Accept-Language': acceptLanguage,
        'Sec-CH-UA': secChUa
    };

    // console.log(info);

    // Send the info object as a JSON response
    res.json(info);
};




exports.first = async (req, res) => {

    // const id = req.params.id;
    // console.log(id)
    // console.log(res.cork(), "jugal");

    // res.write('Mozilla');
    // res.write(' Developer Network');
    // res.uncork();

    res.param = 'Hello, World!';
    console.log(res.param);  // Outputs: Hello, World!

    // Uncomment these lines if you need to log additional request details:
    // console.log(req.user, "user");
    // console.log(req.session, "session");
    // console.log(req.body, "body");
    // console.log(req.user ? req.user.role : "No user role", "userRole");
    // console.log(req.ip, "dsdffsfrIpAddress");

    console.log(`Request received on worker ${process.pid}`);

    res.json({ message: `Hello, this is the response from the server. Worker ${process.pid}` });
};



exports.forms = async (req, res) => {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
        return res.status(422).json({ error: "Please fill all the required fields" });
    }

    try {
        // Check if the user already exists
        const userExist = await Register.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: 'User email already exists' });
        }

        // Generate a unique shortId
        const shortId = shortid.generate();

        console.log(shortId)

        // Create a new user instance
        const addData = new Register({
            name,
            email,
            password,
            shortId // Ensure this field is included in your schema
        });

        // Save the new user to the database
        const upload = await addData.save();
        console.log(upload);

        // Optionally, append the user data to a file
        // Uncomment this block if you want to use it
        // fs.appendFile("hash.txt", JSON.stringify({...upload}) + "\n", (err) => {
        //     if (err) {
        //         console.error(err);
        //         return;
        //     }
        //     console.log("Data appended successfully to hash.txt");
        // });


         // Pass headers to generateAuthToken method
 const token = await addData.generateAuthToken(
    `${req.protocol}://${req.get('host')}${req.originalUrl}`,
    req.ip,
    req.hostname,
    req.path,
    req.protocol,
    req.headers['connection'],
    req.headers['host'],
    req.headers['sec-ch-ua-platform'],
    req.headers['accept-language'],
    req.headers['sec-ch-ua']
);


//Simple way --->
// const token = await addData.generateAuthToken(); // Use the correct method name
// console.log("Generated token:", token);




    res.status(200).send({ 'success': result, 'token': token });
        

        

        res.status(201).json({ message: "Data successfully uploaded" });
    } catch (err) {
        if (err.code === 11000) {
            res.status(422).json({ error: 'Duplicate key error: A record with this shortId already exists.' });
        } else {
            console.error(err);
            res.status(500).json({ error: "An error occurred" });
        }
    }
};

/// Login with  ?????????????????????????????????????????????????????????????

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Please provide email and password" });
    }

    try {
        const userValid = await Register.findOne({ email });
        if (!userValid) {
            return res.status(422).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, userValid.password);
        if (!isMatch) {
            return res.status(422).json({ error: "Invalid email or password" });
        }

        const token = await userValid.generateAuthtoken();
        console.log("Generated token:", token);

        res.cookie("jwttoken", token, { 
            expires: new Date(Date.now() + 9000000),
            httpOnly: true, // Set HTTP only to prevent JavaScript access
            // Other cookie options if needed
        });

        console.log("Cookie set successfully");

        const result = {
            user: userValid,
            token
        };

        return res.status(200).json({ message: "Login successful", result });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}



// Email password Update request 
exports.update = async (req, res) => {
    try {
      const email = req.body.email; 
      console.log(email , "first email");
  
      let password = req.body.password;
      console.log(password , "password");
  
      let hashpassword = await bcrypt.hash(password, 12);
      console.log(hashpassword, "hashed password");
  
      const updatedUser = await Register.findOneAndUpdate(
        { email: email }, 
        { password: hashpassword }, 
        { new: true }
      );
  
      
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" }); /// 
      }
  
      console.log("User updated:", updatedUser);
      res.status(200).send(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };





//authentication

//check user login



exports.auth = async (req, res, next) => {
    try {
      const userData = req.user;
      console.log(userData, "userData DashBord"); // Check if userData is defined
  
      if (!userData) {
        return res.status(401).json({ error: "User data not available" });
      }
  
      return res.status(200).json({ userData });
    } catch (error) {
      console.log(`Error from user route: ${error}`);
      return res.status(500).json({ error: "Internal server error" });
    }
  };


// exports.login = async,authenticate  (req, res) => {

//     console.log("hello")
//     res.send(req.rootUser)
// });

// router.get("/Cont",authenticate,(req,res)=>{


///Out Line Row class
exports.logout = async (req, res) => {

// router.get("/logout", (req, res) => {
    try {
        console.log("hello hellow eolred");
        res.clearCookie("usercookie");
        res.status(200).send("UserLogout");
        // Update the user's session to indicate that they are logged out
        req.session.user = null;

        // Redirect the user to a different page after logout
        res.redirect("/login");
    } catch (error) {
        console.error("Error occurred during logout:", error);
        res.status(500).send("Error occurred during logout");
    }
}


::: ------------------>>

    // Example routes
app.get('/', (req, res, next) => {
    // Simulate a bad request error
    next(new BadRequestError('Invalid request body'));
});

app.get('/user/:id', (req, res, next) => {
    const userId = req.params.id;

    // Simulate a not found error
    if (userId !== '123') {
        return next(new NotFoundError('User not found'));
    }

    // Simulate success
    res.json({ userId, username: 'john_doe' });
});

