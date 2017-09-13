var Handlers=require('./handlers');

var routes = [
    {
        path: '/',
        method: 'GET',
        handler: {
            file: 'templates/index.html'
        },
        config:{
            auth:false
        }
    },
    {
        path: '/assets/{path*}',
        method: 'GET',
        handler: {
            directory: {
                path: './public',
                listing: false
            }
        },
        config:{
            auth:false
        }
    },
    {
        path: '/cards/new',
        method: ['GET', 'POST'],
        handler: Handlers.NewCardHandler
    },
    {
        path: '/cards/{id}',
        method: 'DELETE',
        handler: Handlers.deleteCardHandler
    },
    {
        path: '/cards',
        method: 'GET',
        handler: Handlers.cardsHandler
    },
    {
        path:'/upload',
        method:'GET',
        handler:{
            file:'templates/upload.html'
        }
    },
    {
        path:'/upload',
        method:'POST',
        handler:Handlers.UploadHandler,
        config:{
            payload:{
                output:'file',
                uploads:'public/images'
            }
        }
    }


]
module.exports=routes;


