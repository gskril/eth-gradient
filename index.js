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

	// RGB format: (0-255), (0-255), (0-255)
	let red = numbers[0],
		green = numbers[1],
		blue = numbers[2]

	// Make sure the numbers are valid RGB values
	red = Math.max(0, Math.min(255, red))
	green = Math.max(0, Math.min(255, green))
	blue = Math.max(0, Math.min(255, blue))

	const svg = generateSvg(red, green, blue)

	fs.writeFileSync(`./test/${address.substring(0, 6)}.svg`, svg)
	return svg
}

function generateSvg(r, g, b) {
	return `
		<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
			<circle cx="128" cy="128" r="128" fill="rgb(${r}, ${g}, ${b})"/>
			<circle cx="128" cy="128" r="128" fill="url(#grad1)"/>
			<circle cx="128" cy="128" r="128" fill="url(#grad2)"/>
			<circle cx="128" cy="128" r="128" fill="url(#grad3)"/>
			<circle cx="128" cy="128" r="128" fill="url(#grad4)"/>
			<circle cx="128" cy="128" r="128" fill="url(#grad5)"/>
			<circle cx="128" cy="128" r="128" fill="url(#grad6)"/>
			<circle cx="128" cy="128" r="128" fill="url(#grad7)"/>

			<defs>
				<radialGradient id="grad1" cx="81%" cy="22%" r="100%" fx="81%" fy="22%" gradientUnits="objectBoundingBox">
					<stop offset="0" stop-color="rgb(${r}, ${g}, ${b})" stop-opacity="1" />
					<stop offset="0.5" stop-color="rgb(${r}, ${g}, ${b})" stop-opacity="0" />
				</radialGradient>
				<radialGradient id="grad2" cx="34%" cy="6%" r="100%" fx="34%" fy="6%" gradientUnits="objectBoundingBox">
					<stop offset="0" stop-color="rgb(${r+20}, ${g+20}, ${b+20})" stop-opacity="1" />
					<stop offset="0.5" stop-color="rgb(${r+20}, ${g+20}, ${b+20})" stop-opacity="0" />
				</radialGradient>
				<radialGradient id="grad3" cx="79%" cy="6%" r="100%" fx="79%" fy="6%" gradientUnits="objectBoundingBox">
					<stop offset="0" stop-color="rgb(${r-20}, ${g-20}, ${b-20})" stop-opacity="1" />
					<stop offset="0.5" stop-color="rgb(${r-20}, ${g-20}, ${b-20})" stop-opacity="0" />
				</radialGradient>
				<radialGradient id="grad4" cx="6%" cy="37%" r="100%" fx="6%" fy="37%" gradientUnits="objectBoundingBox">
					<stop offset="0" stop-color="rgb(${r+35}, ${g+35}, ${b+35})" stop-opacity="1" />
					<stop offset="0.5" stop-color="rgb(${r+35}, ${g+35}, ${b+35})" stop-opacity="0" />
				</radialGradient>
				<radialGradient id="grad5" cx="18%" cy="16%" r="100%" fx="18%" fy="16%" gradientUnits="objectBoundingBox">
					<stop offset="0" stop-color="rgb(${r+30}, ${g-20}, ${b+5})" stop-opacity="1" />
					<stop offset="0.5" stop-color="rgb(${r+30}, ${g-20}, ${b+5})" stop-opacity="0" />
				</radialGradient>
				<radialGradient id="grad6" cx="22%" cy="13%" r="100%" fx="22%" fy="13%" gradientUnits="objectBoundingBox">
					<stop offset="0" stop-color="rgb(${r+60}, ${g+60}, ${b+60})" stop-opacity="1" />
					<stop offset="0.5" stop-color="rgb(${r+60}, ${g+60}, ${b+60})" stop-opacity="0" />
				</radialGradient>
				<radialGradient id="grad7" cx="73%" cy="76%" r="100%" fx="73%" fy="76%" gradientUnits="objectBoundingBox">
					<stop offset="0" stop-color="rgb(${r+60}, ${g+60}, ${b+60})" stop-opacity="1" />
					<stop offset="0.5" stop-color="rgb(${r+60}, ${g+60}, ${b+60})" stop-opacity="0" />
				</radialGradient>
			</defs>
		</svg>
  `
}
