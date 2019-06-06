const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const title = 'Smart Food';
    res.render('home', {title: title}) // renders views/home.handlebars
});

router.post('/register', (req, res) =>{
    // var userId = function () {
    //    return '_' + Math.random().toString(36).substr(2, 9);
    //};
    let { name, adminNo, password, confirmpassword, telegramId, phonenumber } = req.body;
    if (isNaN(name)){
        if (password == confirmpassword) {
            if (adminNo.length == 7 && adminNo.endsWith("a")){
                var adminchar = adminNo.slice(0, 6);
                if (isNaN(adminchar)){
                }
                else{
                    if (isNaN(telegramId)){
                        
                    }
                    else{
                        if (telegramId.length == 9){
                            if (phonenumber.length == 8){
                                if (isNaN(phonenumber)){

                                }
                                else{
                                    res.redirect('/loginuser');
                                }
                            }
                        }
                    }
                }
                
            }
        }
    }
    
    //con.connect(function(err) {
    //    if (err) throw err;
    //    console.log("Connected!");
    //    var sql = "INSERT INTO User(userId, name, adminnumber, password, telegramid, phonenumber) VALUES ?";
    //    var values = [userId, name, adminnumber, password, telegramId, phonenumber]
    //    con.query(sql, [values], function (err) {
    //        if (err) throw err;
    //        console.log("1 record inserted");
    //        con.end();
    
    //    });
    //});
});

module.exports = router;