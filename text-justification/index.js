/*
Iterate over the words (i)
	lineLen: var for storing line length (-1 to account for last word having no space)
	line: var for storing the line
	j: var for storing pointer to last word (exclusive)
	Iterate from beginning until line length > maxWidth using j
		lineLen = lineLen + wordLen + 1(space)

	if (lineLen === maxWidth) continue

	extraSpaces = wordLen - lineLen

	Iterate from i to j using k
		if (k < j) {
			line += words[k] + " "
		}
		else {
			line += words[k]
		}

		if (k === words.len) { // last line
			pad out line until maxWidth
		}
		else {
			pad out line until Math.ceil(extraSpaces/(j-i-1))
			extraSpaces -= Math.ceil(extraSpaces/(j-i-1))
		}


	*/
const textJustify = (words, maxWidth)  => {
	let j = 0;
	const lines = [];
	for (let i = 0; i < words.length; i = j) {
		let lineLen = -1;
		let line = "";

		while (j < words.length && lineLen < maxWidth) {
			if (lineLen + words[j].length + 1 > maxWidth)  {
				break;
			}
			lineLen = lineLen + words[j].length + 1;
			j++
		}

		if (lineLen === maxWidth) { // simplest case
			for (let k = i; k < j; k++) {
				if (k < j - 1) {
					line += words[k] + " ";
				}
				else {
					line += words[k];
				}
			}
		} else { // generic case, pad out
			let extraSpaces = maxWidth - lineLen;

			for (let k = i; k < j; k++) {
				if (k < j - 1) {
					line += words[k] + " ";
					if (k < words.length) { // not last line
						let spaces = Math.ceil(extraSpaces/(j-i-1));
						console.log(extraSpaces, spaces, j, i);
						while (spaces > 0) {
							line += " ";
							spaces--;
						}
						spaces = Math.ceil(extraSpaces/(j-i-1));
						extraSpaces -= spaces;
					}
				}
				else {
					line += words[k];
				}

				if (k === words.length - 1) { // last line
					//pad out line until maxWidth
					while (lineLen < maxWidth) {
						line += " ";
						lineLen++;
					}
				}
			}
		}

		console.log(line, line.length);
		lines.push(line);
	}

	return lines;
};

const words1 = ["This", "is", "an", "example", "of", "text", "justification."];
const maxWidth1 = 16;

const case1 = textJustify(words1, maxWidth1);

console.log(case1);
