// Test whether a string has balanced parentheses, where
// the smileys :) and :( are considered balanced text.
export const isBalancedWithSmileys = (message: string) => {
	let minDepth = 0;
	let maxDepth = 0;
	let afterColon = false;

	for (let charIndex = 0; charIndex < message.length; charIndex++) {
		const curChar = message[charIndex];

		if (curChar === '(') {
			maxDepth++; // `(` can always be interpreted as an opening paren…
			if (!afterColon) { // …and if it isn't part of a smiley, we must do so.
				minDepth++;
			}
		} else if (curChar === ')') {
			minDepth--; // `)` can always be interpreted as a closing paren…
			if (!afterColon) { // …and if it isn't part of a smiley, we must do so.
				maxDepth--;
			}
			if (maxDepth < 0) {
				// We don't have enough `(` to balance all the `)`.
				return false;
			}
			if (minDepth < 0) {
				// We're forced to interpret some `:)` as a smiley
				// or some `:(` as an opening paren.
				minDepth = 0;
			}
		}

		afterColon = curChar === ':';
	}

	// At the end of the message, it must be possible to close all parentheses
	// by interpreting some number of `:(` as smileys and some number of `:)` as closing parens.
	return minDepth === 0;
};
