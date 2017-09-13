const uuid = require('uuid'),
    fs = require("fs"),
    joi = require('joi'),
    Boom = require("boom"),
    cardStore = require('./cardStore')
    ;

var Handlers = {};
var cardShema = joi.object().keys({
    name: joi.string().min(3).max(50).required(),
    recipient_email: joi.string().email().required(),
    sender_name: joi.string().min(3).max(50).required(),
    sender_email: joi.string().email().required(),
    card_image: joi.string().regex(/.+\.(jpg|bmp|png|gif)\b/).required()
})

Handlers.NewCardHandler = (req, reply) => {
    if (req.method == 'get') {
        reply.view('new', { card_images: mapImages() })
    } else {
        joi.validate(req.payload, cardShema, function (err, val) {
            if (err)
                return reply(Boom.badRequest(err.details[0].message));
            let card = {
                name: val.name,
                recipient_email: val.recipient_email,
                sender_name: val.sender_name,
                sender_email: val.sender_name,
                card_image: val.card_image
            }
            saveCard(card);
            reply.redirect('/cards')
        })

    }
}

Handlers.deleteCardHandler = (req, reply) => {
    delete cardStore.cards[req.params.id];
    reply();
}

Handlers.cardsHandler = (req, reply) => {
    reply.view('cards', { cards:cardStore.cards })
}
Handlers.UploadHandler=(req,reply)=>{
    let image=req.payload.upload_image;
    // check file upload
    if(image.bytes){
        fs.link(image.path,'public/images/cards/'+image.filename,function(){
            fs.unlink(image.path);

        })
        reply.redirect('/cards');
    }
}

function saveCard(card) {
    let id = uuid.v1()
    card.id = id;
   cardStore.cards[id] = card;
}
function mapImages() {
    return fs.readdirSync('./public/images/cards');
}
module.exports = Handlers;