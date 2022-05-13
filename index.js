const { isAddress, stripZeros } = require('essential-eth')
const fs = require('fs')

const addresses = [
	'0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7',
	'0x1eC4dE886d40d487366Cde7664767Db1DF6a02e7',
	'0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
	'0x7f268357A8c2552623316e2562D90e642bB538E5',
]

addresses.forEach(address => {
	gradientFromAddress(address)
})


function gradientFromAddress(address) {
	if (!isAddress(address)) {
		throw new Error('Invalid Ethereum address')
	}

	// Convert the address to an array of numbers
	const numbers = Array.from(stripZeros(address))

	// HSL format: (0-360), (0-100)%, (0-100)%
	// RGB format: (0-255), (0-255), (0-255)

	// Testing with HSL
	let hue = numbers[0]
	let saturation = numbers[1]

	// Make sure the numbers are valid hsl values
	hue = hue > 360 ? 200 : hue
	saturation = saturation > 100 ? 100 : saturation

	// Testing with RGB
	let red = numbers[0]
	let green = numbers[1]
	let blue = numbers[2]

	// Make sure the numbers are valid rgb values
	red = red > 255 ? 255 : red
	green = green > 255 ? 255 : green
	blue = blue > 255 ? 255 : blue

	const hsl = {
		hue: hue,
		saturation: saturation,
		lightness: 50,
	}
	const rgb = {
		red: red,
		green: green,
		blue: blue,
	}

	fs.writeFileSync(`./test/${address.substring(0, 6)}-hsl.svg`, generateSvg(hsl))
	fs.writeFileSync(`./test/${address.substring(0, 6)}-rgb.svg`, generateSvg(rgb))

	return generateSvg(hsl)
}

function generateSvg(color) {
	let color1, color2

	if (color.hue) {
		color1 = `hsl(${color.hue}, ${color.saturation}%, 80%)`
		color2 = `hsl(${color.hue}, ${color.saturation}%, 50%)`
	} else {
		const hsl = rgbToHsl(color.red, color.green, color.blue)
		color1 = `hsl(${hsl[0]}, ${hsl[1]}%, 80%)`
		color2 = `hsl(${hsl[0]}, ${hsl[1]}%, 50%)`
	}

	return `
		<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="128" cy="128" r="128" fill="url(#gradient)"/>
			<defs>
				<radialGradient id="gradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(63.5 102) rotate(44.1319) scale(140.023)">
					<stop offset="0" stop-color="${color1}"/>
					<stop offset="1" stop-color="${color2}"/>
				</radialGradient>
			</defs>
		</svg>
  `
}

function rgbToHsl(r, g, b) {
	;(r /= 255), (g /= 255), (b /= 255)
	var max = Math.max(r, g, b),
		min = Math.min(r, g, b)
	var h,
		s,
		l = (max + min) / 2

	if (max == min) {
		h = s = 0 // achromatic
	} else {
		var d = max - min
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0)
				break
			case g:
				h = (b - r) / d + 2
				break
			case b:
				h = (r - g) / d + 4
				break
		}
		h /= 6
	}

	return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)]
}
