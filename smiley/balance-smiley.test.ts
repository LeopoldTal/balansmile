import { isBalancedWithSmileys } from './balance-smiley';

describe('isBalancedWithSmileys', () => {
	describe('balanced', () => {
		const TEST_CASES = [
			'',
			'hello',
			'()',
			'()()',
			'(())',
			'() (()) ((()))',
			'((hello) ((())) world)',
			':)',
			':(',
			':(:)',
			':):(',
			':()',
			'(:)',
			'(:()',
			'(:))',
			':(()',
			':)(:(:) (:))())()():(:::i',
			':)(:(:) (:()())()():(:::i',
			':)(:(:) (:)))())()():(:::i',
		];

		TEST_CASES.forEach(message => {
			it(message, () => {
				expect(isBalancedWithSmileys(message)).toBeTruthy();
			});
		});
	});

	describe('unbalanced', () => {
		const TEST_CASES = [
			'(',
			')',
			'((hello)',
			'(hello))',
			')(',
			'()()()(',
			'()())()',
			'()()())(',
			':))',
			':((',
			'(:(',
			':)(:(:) ()))())()():(:::i',
		];

		TEST_CASES.forEach(message => {
			it(message, () => {
				expect(isBalancedWithSmileys(message)).toBeFalsy();
			});
		});
	});
});
