<script>
	export let product;
	import { cart } from '../cartStore';
	import dayjs from 'dayjs';
	import ProductPrice from '$lib/ProductPrice.svelte';

	function removeFromCart(product) {
		$cart = $cart.filter((val) => val.id != product.id);
	}

	function updateStore() {
		const newArray = [...$cart];
		const index = newArray.findIndex((el) => el.id === product.id);
		newArray[index] = product;
		$cart = [...newArray];
	}

	const dateFormat = 'YYYY-MM-DD';

	let startDate = {
		min: dayjs(),
		max: dayjs().add(1, 'month'),
		current: dayjs()
	};
	$: endDate = {
		min: startDate.current.add(1, 'day'),
		max: dayjs().add(2, 'months'),
		current: startDate.current.add(1, 'day')
	};

	$: startDateValue = startDate.current.format(dateFormat);
	$: endDateValue = endDate.current.format(dateFormat);

	$: product.startDate = startDate.current.toJSON();
	$: product.endDate = endDate.current.toJSON();

	function startDateChange(e) {
		startDate.current = dayjs(e.target.value);
		if (endDate.current.isBefore(startDate.current) && endDate.current.isSame(startDate.current)) {
			endDate.current = startDate.current.add(1, 'day');
		}

		updateStore();
	}

	function endDateChange(e) {
		endDate.current = dayjs(e.target.value);

		updateStore();
	}

	function countChange() {
		updateStore();
	}
</script>

<div class="flex flex-row p-3 shadow-md gap-3 rounded-md border border-zinc-200">
	<img src={product.picture + '?thumb=300x300f'} class="w-32 h-32 rounded-md" alt="Товар" />

	<div class="flex flex-col gap-1 w-full">
		<p class="font-semibold">{product.name}</p>
		<div>
			<ProductPrice
				price={product.price}
				discount={product.discount}
				isRentable={product.isRentable} />
		</div>
	</div>

	<!-- выбор даты -->
	{#if product.isRentable}
		<div class="justify-center flex flex-col gap-1">
			<input
				value={startDateValue}
				on:change={startDateChange}
				type="date"
				min={startDate.min.format(dateFormat)}
				max={startDate.max.format(dateFormat)}
				class="px-3 py-2 rounded-md border border-zinc-300" />
			<input
				value={endDateValue}
				on:change={endDateChange}
				type="date"
				min={endDate.min.format(dateFormat)}
				max={endDate.max.format(dateFormat)}
				class="px-3 py-2 rounded-md border border-zinc-300" />
		</div>

		<!-- {JSON.stringify(startDate)}
		{JSON.stringify(endDate)} -->
	{/if}

	<!-- выбор количества -->
	<div class="items-center flex flex-row">
		<input
			min="1"
			max={product.quantity}
			bind:value={product.count}
			on:change={countChange}
			class="px-3 py-2 rounded-md border border-zinc-300 w-32"
			type="number" />
	</div>

	<!-- кнопка удалить -->
	<div class="flex flex-row gap-4 items-center">
		<button on:click={() => removeFromCart(product)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-8 text-zinc-600 hover:text-zinc-800 cursor-pointer"
				viewBox="0 0 24 24">
				<path
					fill="currentColor"
					d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12M8 9h8v10H8V9m7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5Z" />
			</svg>
		</button>
	</div>
</div>
