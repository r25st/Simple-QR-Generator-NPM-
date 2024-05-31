
// importing inquirer module
import inquirer from 'inquirer'; 
// importing qr-image module
import qr from 'qr-image';
// importing fs method
import fs from 'fs';

// using inquirer for questioning
inquirer
  .prompt([
    // asking question to user :p
    {
        type: "input",
        name: "URL",
        message: "Please input the URL to be generated to QR Code = ",
        default: "www.bing.com"
    }
  ])
//   generate answer
  .then((answers) => {
    // defining userURL from answer
    let userURL = answers.URL;

    // using qr to generate qr code from userURL (which is the user input URL)
    let qr_svg = qr.image(userURL); 
    // creating writable stream and saving the qr code   
    qr_svg.pipe(fs.createWriteStream(`${userURL}.png`));

    // saving the user URL on URL.txt
    fs.writeFile('URL.txt',`${userURL}`, (err) => {
        if (err) throw err;
        console.log(`File has been saved!`);
    })
  })
//   some stuff from documentation :p
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });