const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

const compareImages = require('resemblejs/compareImages');
const fs2 = require('mz/fs');

const router = express.Router();


router.get('/', (req, res) => {
    const output_path=path.join(__dirname,'../testingVRT');
    const data=[];

    files=fs.readdirSync(output_path);
        for(i=1; i<100; i++) {
            let tempData=[]; anyData=false;
            iter=0;
            files.forEach(function(el){
                console.log(el)
                if(el.startsWith(`${i}.`)) {
                    anyData=true;
                    tempData.push(el);
                }
                
            })
            if(anyData)
                data.push(tempData);
        }
        console.log(data)

    res.render('form',{ title: 'Registration form', data:data });
});

router.get('/compare',(req,res)=>{
    const compareImages = require('resemblejs/compareImages');
    const fs = require('mz/fs');

    async function getDiff(){
        const options = {
            output: {
                errorColor: {
                    red: 255,
                    green: 0,
                    blue: 255
                },
                errorType: 'movement',
                transparency: 0.3,
                largeImageThreshold: 1200,
                useCrossOrigin: false,
                outputDiff: true
            },
            scaleToSameSize: true,
            ignore: ['nothing', 'less', 'antialiasing', 'colors', 'alpha'],
        };
    
        // The parameters can be Node Buffers
        // data is the same as usual with an additional getBuffer() function
        const data = await compareImages(
            await fs.readFile('testingVRT/45.base_1602141369.png'),
            await fs.readFile('testingVRT/45.base_1602141369.png'),
            options
        );
    
        fd=fs.openSync("testingVRT/45.log","w+");                
        fs.writeSync(fd,JSON.stringify(data));
    
        await fs.writeFile('testingVRT/45.output.png', data.getBuffer());
        return data;
    }
    
    getDiff().then((data)=>{
        res.render('compare',{ title: 'Registration form', data:data });
    })
    
})

router.get('/generate',(req,res)=>{
    
    const compareImages = require('resemblejs/compareImages');
    const fs = require('mz/fs');
    var contador = 0;

    async function getDiff(cont,file1,file2){
        const options = {
            output: {
                errorColor: {
                    red: 255,
                    green: 0,
                    blue: 255
                },
                errorType: 'movement',
                transparency: 0.3,
                largeImageThreshold: 1200,
                useCrossOrigin: false,
                outputDiff: true
            },
            scaleToSameSize: true,
            ignore: ['nothing', 'less', 'antialiasing', 'colors', 'alpha'],
        };
    
        // The parameters can be Node Buffers
        // data is the same as usual with an additional getBuffer() function
        const data = await compareImages(
            await fs.readFile(`testingVRT/${cont}.${file1}`),
            await fs.readFile(`testingVRT/${cont}.${file2}`),
            options
        );
    
        fd=fs.openSync(`testingVRT/${cont}.log`,"w+");                
        fs.writeSync(fd,JSON.stringify(data));
    
        await fs.writeFile(`testingVRT/${cont}.output.png`, data.getBuffer());
        return data;
    }
    
    
    function counterFile() {
        try {
            var data = fs.readFileSync("counter.txt","utf8");
            console.log(`data: ${data}`)
            contador=parseInt(data)+1;
            fd=fs.openSync("counter.txt","w+");
            fs.writeSync(fd,contador);
        } catch (error) {
            console.log(`${error}`)
             
                contador=1;  
                    fd=fs.openSync("counter.txt","w+");
                    
                    fs.writeSync(fd,"1");
                            
        }
        return contador;
    }
    var cc=counterFile();
    const output_path=path.join(__dirname,'../cypress-screenshots/cypress/screenshots/color_palette_screenshot.spec.js');
    
    files=fs.readdirSync(output_path);
    console.log(`files`)
    console.log(`${files}`)
       let arrayFile=[];
       files.forEach(function(el){
           arrayFile.push(el);
           fs.copyFileSync(`./cypress-screenshots/cypress/screenshots/color_palette_screenshot.spec.js/${el}`,`./testingVRT/${cc}.${el}`);
           fs.unlinkSync(`./cypress-screenshots/cypress/screenshots/color_palette_screenshot.spec.js/${el}`);
        });
    
    console.log(cc);
    console.log(arrayFile);

    getDiff(cc,arrayFile[0],arrayFile[1]).then((data)=>{
        res.render('compare',{ title: 'Registration form', data:data });
    })
    
})

module.exports = router;