const Hapi = require("hapi"),
    CardStore=require('./lib/cardStore');

    
const server = new Hapi.Server();
CardStore.initialize();

server.connection({ port: 3000, host: 'localhost' });


server.views({
    engines: {
        html: require('handlebars')
    },
    path: './templates'
})

server.ext('onPreResponse',function(req,reply){
    if(req.response.isBoom){
        reply.view('error',req.response)
    }else{
        reply.continue();
    }
})


server.route(require('./lib/routes'))

server.start((err) => {
    if (err)
        throw err
    console.log(`Server running at: ${server.info.uri}`);
});
