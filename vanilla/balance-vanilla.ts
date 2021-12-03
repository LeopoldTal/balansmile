// Test whether a string has balanced parentheses.
export const isBalancedVanilla = (message: string) => {
	let depth = 0;
	for (let charIndex = 0; charIndex < message.length; charIndex++) {
		const curChar = message[charIndex];
		if (curChar === '(') {
			// Parentheses are now nested 1 level deeper.
			depth++;
		} else if (curChar === ')') {
			// Close 1 level of parentheses.
			// If we were already at the top level, then it's unbalanced.
			if (--depth < 0) {
				return false;
			}
		}
	}

	// At the end of the message, all parentheses must be closed.
	return depth === 0;
};
