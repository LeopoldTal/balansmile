import { isBalancedVanilla } from './balance-vanilla';

describe('isBalancedVanilla', () => {
	describe('balanced', () => {
		const TEST_CASES = [
			'',
			'hello',
			'()',
			'()()',
			'(())',
			'() (()) ((()))',
			'((hello) ((())) world)',
			':(:)',
		];

		TEST_CASES.forEach(message => {
			it(message, () => {
				expect(isBalancedVanilla(message)).toBeTruthy();
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
			':)',
			':(',
			':):(',
		];

		TEST_CASES.forEach(message => {
			it(message, () => {
				expect(isBalancedVanilla(message)).toBeFalsy();
			});
		});
	});
});
