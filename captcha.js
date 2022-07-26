
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
const hexColor = "0123456789abcdef";

let captcha = "";
// let hashed = "";

let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");


function generateStringForCaptcha(length = 6) {
	let index = null;
	let captchaString = "";
	for (let i = 0; i < length; i++) {
		index = Math.floor(Math.random() * (letters.length - 1));
		captchaString += letters.charAt(index);
	}

	return captchaString;
}

function colorGenerator() {
	let index = null;
	let color = "#";
	for (let i = 0; i < 6; i++) {
		index = Math.floor(Math.random() * (hexColor.length - 1));
		color += hexColor.charAt(index);
	}

	return color;
}

function lineNoiseGenerator(length = 25) {
	for (let i = 0; i < length; i++) {
		context.beginPath();
		context.moveTo(canvas.width * Math.random(), canvas.height * Math.random());
		context.lineTo(canvas.width * Math.random(), canvas.height * Math.random());
		context.strokeStyle = colorGenerator();
		context.lineWidth = 2;
		context.stroke();
	}
}

function dotNoiseGenerator(length = 150) {
	for (let i = 0; i < length; i++) {
		context.fillStyle = colorGenerator();
		context.fillRect(canvas.width * Math.random(), canvas.height * Math.random(), 5, 5)
	}
}

function draw() {
	canvas.style.border = '1px solid black';
	canvas.style.width = '150px';
	canvas.style.backgroundColor = colorGenerator();

	context.font = "italic 75px Arial";
	context.fillStyle = colorGenerator();

	captcha = generateStringForCaptcha()
	// hashed = sha1(captcha.toLocaleLowerCase())
	context.fillText(captcha, 0, 100);
	// captcha = ""; // unset for safety

	lineNoiseGenerator();
	dotNoiseGenerator();
	convertCanvasToImage();
}

function convertCanvasToImage() {
	let image = document.getElementById("captchaImage");
	image.src = canvas.toDataURL();
}

function validateCaptcha() {
	let text = document.getElementById('captchaText').value;
    return text.toLocaleLowerCase() === captcha.toLocaleLowerCase();
	// return sha1(text.toLocaleLowerCase()) === hashed;
}

function regenerateCaptcha() {
	document.getElementById('captchaText').value = "";
	context.clearRect(0, 0, canvas.width, canvas.height);
	draw();
}

draw();