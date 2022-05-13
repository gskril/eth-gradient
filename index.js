const { isAddress, stripZeros } = require('essential-eth')

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

	const hsl = `hsl(${hue}, ${saturation}%, 50%)`
	const rgb = `rgb(${red}, ${green}, ${blue})`

	return hsl + '\n' + rgb
}

console.log(gradientFromAddress(''))
