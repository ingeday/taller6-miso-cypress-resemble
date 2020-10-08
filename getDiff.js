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
        await fs.readFile('testingVRT/2base.png'),
        await fs.readFile('testingVRT/2later.png'),
        options
    );

    console.log(data);

    await fs.writeFile('testingVRT/2output.png', data.getBuffer());
}

getDiff();
