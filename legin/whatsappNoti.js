const client = require('twilio')();

client.messages.create({
    from: 'whatsapp:+14155238886',
    body: 'hello there!',
    to: 'whatsapp: +6586930190'
})
.then(message => console.log(message.sid));