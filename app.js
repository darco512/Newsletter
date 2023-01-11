const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const client = require("@mailchimp/mailchimp_marketing");

const app = express();

client.setConfig({
    apiKey: "81f4c15cca977eed5b38d4a0e3f3ffc3-us21",
    server: "us21",
  });

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    const run = async () => {
        const response = await client.lists.batchListMembers("1bbd333dae", {
          members: [{
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
          }}],
        });
        
        if(res.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        console.log(response);
      };
      run();

})

app.post("/failure", function(req, res){
    res.redirect("/");
})


app.listen(3000, function(){
    console.log("Server is running on port 3000");
});



// 81f4c15cca977eed5b38d4a0e3f3ffc3-us21
// 1bbd333dae




// 81f4c15cca977eed5b38d4a0e3f3ffc3-us21
// 1bbd333dae