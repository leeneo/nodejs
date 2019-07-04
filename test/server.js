var http = require('http')

// http.createServer(function (request, response) {
//     response.writeHead(200, { 'Content-Type': 'text/plain' });
//     response.end('Hello World!');
// }).listen(8802)

let app=http.createServer((request,response)=>{
	response.write('Hello World!')
    response.end('Node js!');
})
app.listen(8802)


console.log('Server running at localhost:8802')