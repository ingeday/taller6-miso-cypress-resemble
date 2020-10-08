const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const output_path=path.join(__dirname,'../testingVRT');
const data=[];
fs.readdir(output_path, function(err, files) {
    if(err) {
        return console.log(`error leyendo ${output_path} => ${err}`)
    }
    let filesArray=[];
    
    //files.forEach(function(file){
      //  filesArray.push(file);
    //})
    
    
    for(i=1; i<5; i++) {
        let tempData=[]; anyData=false;
        iter=0;
        files.forEach(function(el){
        
            if(el.startsWith(i)) {
                anyData=true;
                tempData.push(el);
            }
            
        })
        if(anyData)
            data.push(tempData);
    }
    console.log(data)
})

router.get('/', (req, res) => {
  res.render('form',{ title: 'Registration form', data:data });
});

module.exports = router;