window.onload = function () {
	var staticWheelElement = document.querySelector("#static-wheel");
	var reflectorWheelElement = document.querySelector("#reflector-wheel");
	var wheelOrderElement = document.querySelector("#wheel-order");
	var ringSettingElement = document.querySelector("#ring-setting");
	var startPositionElement = document.querySelector("#start-position");
	var plugboardTextElement = document.querySelector("#plugboard-text");

	var keyboardElement = document.querySelector("#keyboard");
	var plugboardElement = document.querySelector("#plugboard");
	var lightboardElement = document.querySelector("#lightboard");

	// double stepping?


	var keys = [];
	keys[0] = "qwertyuiop".split("");
	keys[1] = "asdfghjkl".split("");
	keys[2] = "zxcvbnm".split("");
	var lightboardLayout = keys;

	var keyElements = {};

	for (row of keys) {
		var keyRow = document.createElement("div");
		keyboardElement.appendChild(keyRow);
		keyRow.classList.add("keyRow");
		for (letter of row) {
			var key = document.createElement("div");
			var keyText = document.createTextNode(letter.toUpperCase());
			keyElements[letter] = key;
			key.appendChild(keyText);
			keyRow.appendChild(key);
			key.classList.add("key");

			key.addEventListener("touchstart", function (event) {
				var key = event.target;
				debug.textContent = "touchstart on " + key;
				key.classList.add("hover");
				key.classList.add("active");
			});

			key.addEventListener("touchend", function (event) {
				var key = event.target;
				debug.textContent = "touchend on " + key;

				key.classList.remove("hover");
				key.classList.remove("active");

				var text = document.querySelector("#text");
				text.textContent += key.textContent.toUpperCase();
			});
		}
	}

	// var reg = /([A-Za-z])/
	// console.log('abc93'.match(reg))

	var debug = document.querySelector("#debug");

	function pressdown(event) {
		// event.key
		// String.fromCharCode(event.keyCode).toLowerCase()
		var key = String.fromCharCode(event.keyCode).toLowerCase()
		if (keyElements[key]) {
			var keyElement = keyElements[key];
			keyElement.classList.add("hover");
			keyElement.classList.add("active");

			debug.textContent = "pressdown on key";
		} else {
			debug.textContent = "pressdown elsewhere";
		}
	}

	function pressup(event) {
		// var key = event.key
		// var key = String.fromCharCode(event.keyCode).toLowerCase()
		var key = String.fromCharCode(event.keyCode).toLowerCase()
		if (keyElements[key]) {
			var keyElement = keyElements[key];

			keyElement.classList.remove("hover");
			keyElement.classList.remove("active");

			var text = document.querySelector("#text");
			text.textContent += key.toUpperCase();
			debug.textContent = "pressup on key";
		} else {
			debug.textContent = "pressup elsewhere";
		}
	}

	document.addEventListener("keydown", pressdown);
	document.addEventListener("keyup", pressup);

	// staticWheelElement.textContent = "Stator/Entrittswalze (ETW) (Static Wheel): ";
	// reflectorWheelElement.textContent = "Umkehrwalze (UKW) (Reflector Wheel): ";
	// wheelOrderElement.textContent = "Walzenlage (Wheel order): ";
	// ringSettingElement.textContent = "Ringstellung (Ring Setting): ";
	// startPositionElement.textContent = "Grundstellung (Ground Setting) (start position): ";
	// plugboardTextElement.textContent = "Steckerbrett (Plugboard): ";

	function randomAlphabet() {
		var alphabet = "abcdefghijklmnopqrstuvwxyz";
		var alphabetArray = [];
		for (var i = 0; i < alphabet.length; i++) {
			alphabetArray[i] = alphabet.slice().charAt(i);
		}

		var randomAlphabet = []
		for (var i = 0; i < alphabet.length; i++) {
			var index = Math.floor(Math.random()*alphabetArray.length);
			randomAlphabet.push(alphabetArray.splice(index, 1)[0]);
		}
		return randomAlphabet;
	}

	function alphabet() {
		return "abcdefghijklmnopqrstuvwxyz".split("");
	}

	function zip(keys, values) {
		var map = {}
		for (var i = 0; i < keys.length; i++) { // let var
			map[keys[i]] = values[i];
		}
		return map;
	}

	function invert(map) {
		var inverse = {};
		for (key in map) {
			inverse[map[key]] = key;
		}
		return inverse;
	}

	function randomMap() {
		return zip(alphabet(), randomAlphabet());
	}

	var strArray = randomAlphabet();
	console.log('random alefbet:', strArray);

	var rotatedStrArray = rotate(strArray);
	console.log('rotated:', rotatedStrArray);

	var subtractedRotatedStrArray = subtract(rotatedStrArray);
	console.log('rotated and subtracted:', subtractedRotatedStrArray);

	function rotate(strArray) {
		//return str.substring(1) + str.substring(0, 1);
		return strArray.slice(1).concat(strArray.slice(0, 1));
	}

	var map = randomMap();
	console.log(map);
	console.log(rotateMap(map));

	// use .keys and .values
	function rotateMap(map) {
		var keys = Object.keys(map);
		// var values = Object.values(map);
		// var newmap = zip(keys, rotate(values));
		// return newmap;
	}
	// a 97
	// z 122
	//
	// console.log('eval')
	// for (let i = 97; i < 97+26; i++) {
	// 	console.log(i, "->", 122 - ((123 - i) % 26));
	// }
	// 122 - ((123 - charcode) % 26)
	// 25%(charcode - 98)

	function subtract(strArray) {
		var newstr = [];
		for (letter of strArray) {
			newstr.push(String.fromCharCode(122 - ((123 - letter.charCodeAt(0)) % 26)));
		}
		return newstr;
	}

	//

	var Rotor = function() {
		this.wiring = randomMap();

		this.position = 0;
		this.rotate = function() {
			this.position++;
		}
	}

	var Enigma = function() {

	}

	var rotor = new Rotor();
}
