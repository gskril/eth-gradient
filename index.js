const { isAddress, stripZeros } = require('essential-eth')
const fs = require('fs')

const addresses = [
	'0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7',
	'0x1eC4dE886d40d487366Cde7664767Db1DF6a02e7',
	'0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
	'0x7f268357A8c2552623316e2562D90e642bB538E5',
	'0x0000000035634b55f3d99b071b5a354f48e10bef',
	'0x59728544b08ab483533076417fbbb2fd0b17ce3a',
	'0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72',
]

addresses.forEach((address) => {
	gradientFromAddress(address)
})

function gradientFromAddress(address) {
	if (!isAddress(address)) {
		throw new Error('Invalid Ethereum address')
	}

	// Convert the address to an array of numbers
	const numbers = Array.from(stripZeros(address))

	// HSL format: (0-360), (0-100)%, (0-100)%
	let hue = numbers[0]
	let saturation = numbers[1]

	// Make sure the numbers are valid hsl values
	hue = hue > 360 ? 200 : hue
	saturation = saturation > 100 ? 100 : saturation

	const svg = generateSvg({
		hue,
		saturation,
	})

	fs.writeFileSync(`./test/${address.substring(0, 6)}.svg`, svg)
	return svg
}

function generateSvg(color) {
	const color1 = `hsl(${color.hue}, ${color.saturation}%, 80%)`
	const color2 = `hsl(${color.hue}, ${color.saturation}%, 50%)`

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
