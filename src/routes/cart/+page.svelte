<script>
	import '../../styles.css';
	import { fade, fly } from 'svelte/transition';
	import { cart } from '../../cartStore';
	import CartElement from '$lib/CartElement.svelte';
	import dayjs from 'dayjs';
	/** @type {import('./$types').ActionData} */
	// export let form;

	let showConfirmDialog = false;

	$: totalPriceString = `${$cart.reduce((total, el) => {
		let days = 1;
		if (el.endDate && el.startDate) {
			days = dayjs(el.endDate).diff(dayjs(el.startDate), 'days', false);
		}

		return total + (el.price - el.discount) * el.count * days;
	}, 0)}р.`;
</script>

<div class="container mx-auto">
	<p class="text-xl leading-6 font-semibold">Корзина</p>
	<div class="flex flex-row py-8 items-start gap-6">
		<div class="flex flex-col h-full gap-4 bg-white w-full pointer-events-auto">
			{#if $cart.length === 0}
				<div class="w-full h-full flex items-center">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class=" mt-6 w-24 h-24">
						<path
							d="M11 9H13V6H16V4H13V1H11V4H8V6H11M7 18C5.9 18 5 18.9 5 20S5.9 22 7 22 9 21.1 9 20 8.1 18 7 18M17 18C15.9 18 15 18.9 15 20S15.9 22 17 22 19 21.1 19 20 18.1 18 17 18M7.2 14.8V14.7L8.1 13H15.5C16.2 13 16.9 12.6 17.2 12L21.1 5L19.4 4L15.5 11H8.5L4.3 2H1V4H3L6.6 11.6L5.2 14C5.1 14.3 5 14.6 5 15C5 16.1 5.9 17 7 17H19V15H7.4C7.3 15 7.2 14.9 7.2 14.8Z" />
					</svg>
					<p class="">В корзине пусто</p>
				</div>
			{/if}
			{#each $cart as product}
				<CartElement {product} />
			{/each}
		</div>
		<div
			class="flex flex-col gap-4 w-64 shadow-md rounded-md p-6 flex-shrink-0 border border-zinc-200">
			<p class="text-xl font-bold">К оплате</p>

			<p>{totalPriceString}</p>
			<button
				class="btn-main w-full"
				disabled={$cart.length === 0}
				on:click={() => (showConfirmDialog = true)}>
				Заказать
			</button>
		</div>
	</div>
</div>

{#if showConfirmDialog}
	<div
		class="flex fixed top-0 left-0 bg-black/50 w-full h-full z-50 items-center justify-center border-r-1">
		<div
			class="bg-zinc-400 uppercase will-change-transform opacity-none"
			in:fly={{
				y: -100,
				duration: 1000
			}}
			out:fade>
			<div class="bg-white p-6 rounded-md">
				<button class="absolute w-5 h-5 right-2 top-2" on:click={() => (showConfirmDialog = false)}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<title>Закрыть</title><path
							d="M3,16.74L7.76,12L3,7.26L7.26,3L12,7.76L16.74,3L21,7.26L16.24,12L21,16.74L16.74,21L12,16.24L7.26,21L3,16.74M12,13.41L16.74,18.16L18.16,16.74L13.41,12L18.16,7.26L16.74,5.84L12,10.59L7.26,5.84L5.84,7.26L10.59,12L5.84,16.74L7.26,18.16L12,13.41Z" />
					</svg>
				</button>

				<form method="post" class="flex flex-col gap-2">
					<input type="hidden" name="cart" id="cart" value={JSON.stringify($cart)} />
					<label class="flex flex-col" for="firstName">
						<span> Имя: </span>
						<input
							class="rounded-md"
							id="firstName"
							name="firstName"
							type="text"
							placeholder="Иван" />
					</label>

					<label class="flex flex-col" for="lastName">
						<span> Фамилия: </span>
						<input
							class="rounded-md"
							id="lastName"
							name="lastName"
							type="text"
							placeholder="Иванов" />
					</label>

					<label class="flex flex-col" for="phoneNumber">
						<span> Номер телефона: </span>
						<input
							class="rounded-md"
							id="phoneNumber"
							name="phoneNumber"
							pattern="\+375 &#123;0,1&#125;\(&#123;0,1&#125;\d&#123;2&#125;\)&#123;0,1&#125; &#123;0,1&#125;\d&#123;3&#125;[ -]&#123;0,1&#125;\d&#123;2&#125;[ -]&#123;0,1&#125;\d&#123;2&#125;"
							type="text"
							placeholder="+375 12 345 67 89" />
					</label>
					<div class="flex items-center pt-4">
						<input type="submit" class=" btn-main" value="Подтвердить" />
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}
