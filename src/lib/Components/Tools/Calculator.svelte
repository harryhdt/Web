<script lang="ts">
	type Operator = '+' | '−' | '×' | '÷';
	const keys = [
		'C',
		'DEL',
		'÷',
		'×',
		'7',
		'8',
		'9',
		'−',
		'4',
		'5',
		'6',
		'+',
		'1',
		'2',
		'3',
		'=',
		'0',
		'.'
	] as const;
	type Key = (typeof keys)[number];

	let display = $state('0');
	let storedValue = $state<number | null>(null);
	let operator = $state<Operator | null>(null);
	let startFresh = $state(false);
	let hasError = $state(false);

	function clear() {
		display = '0';
		storedValue = null;
		operator = null;
		startFresh = false;
		hasError = false;
	}

	function showError() {
		clear();
		display = 'Error';
		hasError = true;
	}

	function enterDigit(digit: string) {
		if (hasError) clear();
		if (startFresh || display === '0') {
			display = digit;
			startFresh = false;
		} else if (display.length < 16) {
			display += digit;
		}
	}

	function enterDecimal() {
		if (hasError) clear();
		if (startFresh) {
			display = '0.';
			startFresh = false;
		} else if (!display.includes('.') && display.length < 16) {
			display += '.';
		}
	}

	function deleteDigit() {
		if (hasError || startFresh) {
			clear();
			return;
		}
		display = display.length > 1 ? display.slice(0, -1) : '0';
		if (display === '-') display = '0';
	}

	function calculate(left: number, right: number, operation: Operator): number | null {
		let result: number;
		switch (operation) {
			case '+':
				result = left + right;
				break;
			case '−':
				result = left - right;
				break;
			case '×':
				result = left * right;
				break;
			case '÷':
				if (right === 0) return null;
				result = left / right;
		}
		return Number.isFinite(result) ? result : null;
	}

	function formatResult(value: number): string {
		return Number(value.toPrecision(12)).toString();
	}

	function chooseOperator(nextOperator: Operator) {
		if (hasError) return;
		if (operator && storedValue !== null && !startFresh) {
			const result = calculate(storedValue, Number(display), operator);
			if (result === null) {
				showError();
				return;
			}
			display = formatResult(result);
			storedValue = result;
		} else if (storedValue === null) {
			storedValue = Number(display);
		}
		operator = nextOperator;
		startFresh = true;
	}

	function equals() {
		if (hasError || !operator || storedValue === null || startFresh) return;
		const result = calculate(storedValue, Number(display), operator);
		if (result === null) {
			showError();
			return;
		}
		display = formatResult(result);
		storedValue = null;
		operator = null;
		startFresh = true;
	}

	function pressKey(key: Key) {
		if (/^\d$/.test(key)) enterDigit(key);
		else if (key === '.') enterDecimal();
		else if (key === 'C') clear();
		else if (key === 'DEL') deleteDigit();
		else if (key === '=') equals();
		else if (key === '+' || key === '−' || key === '×' || key === '÷') chooseOperator(key);
	}

	function keyLabel(key: Key): string {
		switch (key) {
			case 'C':
				return 'Clear';
			case 'DEL':
				return 'Delete last digit';
			case '+':
				return 'Add';
			case '−':
				return 'Subtract';
			case '×':
				return 'Multiply';
			case '÷':
				return 'Divide';
			case '=':
				return 'Equals';
			case '.':
				return 'Decimal point';
			default:
				return key;
		}
	}
</script>

<div class="mx-auto flex w-full min-w-0 max-w-sm flex-col gap-3 pb-3 @md/tools:max-w-md">
	<div class="min-w-0 rounded-lg bg-neutral-800 px-4 py-3 text-right text-white">
		<p class="h-5 text-sm text-neutral-300">
			{storedValue !== null && operator ? `${formatResult(storedValue)} ${operator}` : ''}
		</p>
		<p
			class="scrollbar-none overflow-x-auto overflow-y-hidden whitespace-nowrap text-2xl font-semibold leading-tight @xs/tools:text-3xl"
			role="status"
			aria-live="polite"
		>
			{display}
		</p>
	</div>
	<div class="grid grid-cols-4 gap-1.5 @xs/tools:gap-2">
		{#each keys as key (key)}
			<button
				type="button"
				aria-label={keyLabel(key)}
				onclick={() => pressKey(key)}
				class="min-h-11 cursor-pointer rounded-lg border border-neutral-200 px-1 text-base font-semibold transition-colors hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 @xs/tools:min-h-12 @xs/tools:text-lg {key ===
				'='
					? 'row-span-2 bg-blue-600 text-white hover:bg-blue-700'
					: key === '0'
						? 'col-span-2 bg-white'
						: 'bg-white'}"
			>
				{key}
			</button>
		{/each}
	</div>
</div>
