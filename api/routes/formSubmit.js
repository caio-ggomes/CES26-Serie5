var express = require("express");
var router = express.Router();
const fs = require('fs');

'use strict'

router.post("/", function(req, res) {
    
    const newUser = {
      name: req.body['name'],
      age: req.body['age'],
    };

    let file = "./data.json";

    if (newUser['age'] > 18){

        fs.readFile(file, (err, data) => {
            if (err && err.code === "ENOENT") {
                // But the file might not yet exist.  If so, just write the object and bail
                return fs.writeFile(file, '[' + JSON.stringify(newUser) + ']', error => console.error);
            }
            else if (err) {
                // Some other error
                console.error(err);
            }    
            // 2. Otherwise, get its JSON content
            else {
                try {
    
                    // 3. Append the object you want
                    const fileData = data.slice(0, -1) + ',\n' + JSON.stringify(newUser) + ']';
        
                    //4. Write the file back out
                    return fs.writeFile(file, fileData, error => console.error)
                } catch(exception) {
                    console.error(exception);
                }
            }
        });
        
        res.send('Usuário Adicionado com Sucesso');
        console.log('Usuário Adicionado com Sucesso');
    }
    else {
        res.send('Idade precisa ser superior a 18 anos');
        console.log('Idade precisa ser superior a 18 anos');
    }
  });

module.exports = router;