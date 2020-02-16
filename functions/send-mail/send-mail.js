var nodemailer = require('nodemailer');

const mail = process.env.MAIL;
const pwd = process.env.PWD;
console.log('mail ', mail);
console.log('pwd ', pwd);

var transport = nodemailer.createTransport({
	service: "hotmail",
	auth: {
		user: mail,
		pass: pwd
	}
});
// exports.handler is required by netlify to process.
exports.handler = async (event, context, callback) => {
	// Only allow POST
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers':
			'Origin, X-Requested-With, Content-Type, Accept',
	};
	if (event.httpMethod === 'OPTIONS') {
		return {
			headers,
			statusCode: 200,
			body: JSON.stringify({ message: 'You can use CORS' }),
		}
	}
	if (event.httpMethod !== "POST") {
		return { statusCode: 405, body: "Method Not Allowed" };
	}

	// setup e-mail data, even with unicode symbols
	const mailOptions = {
		from: mail, // sender address (who sends)
		to: mail, // list of receivers (who receives)
		subject: 'Nuovo Messaggio : ', // Subject line
		text: 'Hello world ', // plaintext body
		html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js' // html body
	};

	// send mail with defined transport object
	try {
		let info = await transport.sendMail(mailOptions);
		console.log('Message sent: ', info);
		return {
			headers,
			statusCode: 201,
			body: `message sent`
		};
	} catch (err) {
		console.log("Errore in invio messaggio : ", err);
		return {
			headers,
			statusCode: 500,
			body: `message not sent`
		};
	}


}