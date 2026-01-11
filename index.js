const fs = require('fs');
const http = require('http');
const url = require('url');

////////////////////////////////////
// FILES

// const textInput = fs.readFileSync('./starter/txt/input.txt', 'utf-8')

// console.log(textInput);

// const textOutput = `This is what we know about the avocade: ${textInput} \n Creaeted on ${Date.now().toLocaleString()}`;

// fs.writeFileSync('./starter/txt/output2.txt', textOutput);

// console.log('File written!');

// Non blocking/asynchronous way
// fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data) => {
//     if (err) return console.log('ERROR! 💥');

//     fs.readFile(`./starter/txt/${data}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./starter/txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile('./starter/txt/final.txt', `FINAL2 calling callbacks: ${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('Your file has been written ');
//             }) 
//         })
//     });
// });


////////////////////////////////////
// SERVER
const server = http.createServer((req, res) => {
    const pathName = req.url;
    if (pathName === '/overview' || pathName === '/') res.end('This is the OVERVIEW');
    else if (pathName === '/product') res.end('This is the PRODUCT');
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
})