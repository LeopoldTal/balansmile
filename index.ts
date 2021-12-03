import { isBalancedWithSmileys } from './smiley/balance-smiley';
import { isBalancedVanilla } from './vanilla/balance-vanilla';

const main = () => {
	const message = process.argv[2] || '';
	const vanilla = isBalancedVanilla(message);
	const withSmileys = isBalancedWithSmileys(message);
	console.log(
		`${message}\nBalanced without smileys: ${vanilla}\nBalanced with smileys: ${withSmileys}`
	);
};

main();
