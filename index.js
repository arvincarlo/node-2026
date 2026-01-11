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

const replaceTemplate = (template, product) => {
    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {

    const { query, pathname } = url.parse(req.url, true);

    // Overview page
    if (pathname === '/overview' || pathname === '/') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });

        const cardsHTML = dataObj.map(element => replaceTemplate(tempCard, element)).join('');

        const overviewHTML = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHTML);

        res.end(overviewHTML);
    }

    // Product page
    else if (pathname === '/product') {
        const product = dataObj.at(query.id);

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        const productHTML = replaceTemplate(tempProduct, product);

        res.end(productHTML);
    }
    // API
    else if (pathname === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(data);
    }

    // Not found
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