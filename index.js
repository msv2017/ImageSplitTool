var Jimp = require("jimp");

let mode = process.argv[2];
let n = process.argv[3];
let input = process.argv[4];
let output = process.argv[5] || input;

if (!mode || !n || !input) {
    console.log("Invalid input parameters!");
    return;
}

function splitImageVert() {
    Jimp.read(input).then(function (image) {
        let { width, height } = image.bitmap;
        let newImage = new Jimp(Math.max(n, 1 - n) * width, height * 2);
        newImage.blit(image, 0, 0, 0, 0, width * n, height);
        newImage.blit(image, 0, height, width * n, 0, width * (1 - n), height);
        newImage.write(output);
    }).catch(function (err) {
        console.log(err);
    });
}

function splitImageHoriz() {
    Jimp.read(input).then(function (image) {
        let { width, height } = image.bitmap;
        let newImage = new Jimp(2 * width, Math.max(n, 1 - n) * height);
        newImage.blit(image, 0, 0, 0, 0, width, height * n);
        newImage.blit(image, width, 0, 0, height * (1 - n), width, height * (1 - n));
        newImage.write(output);
    }).catch(function (err) {
        console.log(err);
    });
}

switch (mode) {
    case "v": splitImageVert();
        break;
    case "h": splitImageHoriz();
        break;
}
