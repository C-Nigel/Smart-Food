console.log('Whatapp api started');
console.log('Whatsapp api loading');
const client = require('twilio')('AC1a90e7f70defbea4e19b01f7a4f8a6ee', '0f710e0acab2e3a5fafdc1a6568e4768');

client.messages.create({
    from: 'whatsapp:+14155238886',
    body: 'hello there!',
    to: 'whatsapp: +6586930190'
})
.then(message => console.log(message.sid));

console.log('Whatsapp api load complete');
