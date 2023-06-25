<script>
	import '../styles.css';
	import { fade, fly } from 'svelte/transition';
	import { cart } from '../cartStore';
	import ProductPrice from '$lib/ProductPrice.svelte';
	export let data;

	let y;
	let catalogMenuVisible = false;
	let cartFormVisible = false;
	let activeCategory = {};
	let activeSubCategory = {};

	function catalogClick() {
		catalogMenuVisible = !catalogMenuVisible;
		cartFormVisible = false;
	}
	function cartClick() {
		cartFormVisible = !cartFormVisible;
		catalogMenuVisible = false;
	}
	function cartConfirmClick() {
		catalogMenuVisible = false;
		cartFormVisible = false;
	}
	function removeFromCart(product) {
		$cart = $cart.filter((val) => val.id != product.id);
	}
</script>

<svelte:window bind:scrollY={y} />

<!-- анимация блока контактов -->
<div
	class="bg-zinc-400 w-full uppercase will-change-transform opacity-none"
	in:fly={{
		y: -100,
		duration: 1000
	}}
	out:fade
>
	<div class="container mx-auto flex flex-row justify-between font-semibold px-4">
		<p>+375 ** ***-**-**</p>
		<p>tg: @instramat</p>
		<p>Inst: instramat</p>
	</div>
</div>

<header class="sticky h-fit top-0">
	<nav>
		<!-- нав бар -->
		<div class="flex flex-row container mx-auto px-4 gap-4 py-2 items-center bg-white">
			<a href="/">
				<img src="../picture/Logo.svg" alt="instramat.by" class="min-w-full w-64" />
			</a>
			<button
				class="font-semibold flex flex-row items-center gap-2 bg-main text-zinc-50 rounded-full px-8 cursor-pointer py-4"
				on:click={catalogClick}
			>
				<div class="flex flex-col gap-1">
					<span class="h-0.5 w-6 rounded-sm bg-zinc-50" />
					<span class="h-0.5 w-6 rounded-sm bg-zinc-50" />
					<span class="h-0.5 w-6 rounded-sm bg-zinc-50" />
				</div>
				<span>Каталог</span>
			</button>

			<!-- Поиск -->
			<form action="/catalog" class="border rounded-full relative flex items-center w-full">
				<input
					type="search"
					name="search"
					placeholder="поиск по каталогу..."
					class="py-4 outline-none ml-6 w-full border-none focus:ring-0"
				/>
				<button type="submit" class="p-3 bg-main rounded-full mr-1 text-zinc-50"
					><svg class="h-6 w-6" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
						/>
					</svg></button
				>
			</form>

			<!-- Корзина -->
			<button
				class="font-semibold flex flex-row items-center gap-2 bg-main text-zinc-50 rounded-full px-8 cursor-pointer py-4"
				on:click={cartClick}
			>
				<svg class="class=h-6 w-6" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z"
					/>
				</svg>
				<p>Корзина</p>
			</button>
		</div>
	</nav>

	<!-- функция каталога -->
	{#if catalogMenuVisible}
		<div class="bg-white h-60 w-screen absolute" in:fly={{ x: -200, duration: 1000 }} out:fade>
			<div class="container flex flex-row mx-auto px-4 h-full">
				<!-- категории -->
				<div class="flex flex-col border-r-2 h-full pr-2 gap-2 w-40">
					<a href="/catalog" class=" font-semibold text-lg">Все товары</a>
					{#each data.categories as category}
						<a
							href="/catalog?category={category.slug}"
							class={activeCategory.slug === category.slug ? ' font-semibold text-main' : ''}
							on:mouseenter={() => {
								activeCategory = category;
								activeSubCategory = {};
							}}>{category.title}</a
						>
					{/each}
				</div>

				<!-- подкатегории -->
				<div class="pl-2">
					<div class="flex flex-col gap-2 pr-4 border-r-2 h-full">
						{#if activeCategory.title}
							<p class="font-semibold">{activeCategory.title}</p>
							{#each data.subCategories.filter((el) => el.category.slug === activeCategory.slug) as subCategory}
								<a
									href="/catalog?sub-category={subCategory.slug}"
									class=""
									on:mouseenter={() => (activeSubCategory = subCategory)}
									>{subCategory.title}
								</a>
							{/each}
						{/if}
					</div>
				</div>

				<!-- типЫ -->
				<div class="pl-2">
					<div class="flex flex-col gap-2 pl-2 h-full">
						{#if activeSubCategory.title}
							<p class="font-semibold">{activeSubCategory.title}</p>
							{#each data.types.filter((el) => el.subCategory.slug === activeSubCategory.slug) as type}
								<a href="/catalog?type={type.slug}" class="">{type.title}</a>
							{/each}
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- функция корзины -->
	{#if cartFormVisible}
		<div
			class="h-96 w-screen absolute right-0 bg pointer-events-none z-50"
			in:fly={{ x: 200, duration: 1000 }}
			out:fade
		>
			<div class="justify-end flex flex-row mx-auto px-4 h-full">
				<div
					class="flex flex-col h-full gap-4 bg-white p-6 rounded-lg shadow-lg ring-1 ring-zinc-200 w-96 overflow-auto pointer-events-auto"
				>
					<p class="text-xl leading-6 font-semibold">Корзина</p>
					{#if $cart.length === 0}
						<p class="">В корзине пусто</p>
					{/if}
					{#each $cart as product}
						<div class="flex flex-row gap-4 w-full items-center">
							<button on:click={() => removeFromCart(product)}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="w-6 text-zinc-600 hover:text-zinc-800 cursor-pointer"
									viewBox="0 0 24 24"
									><path
										fill="currentColor"
										d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12M8 9h8v10H8V9m7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5Z"
									/></svg
								>
							</button>

							<img src={product.picture + '?thumb=300x300f'} class="w-24 rounded-md" alt="Товар" />

							<div class="flex flex-col gap-1">
								<p class="font-semibold">{product.name}</p>
								<div>
									<ProductPrice
										price={product.price}
										discount={product.discount}
										isRentable={product.isRentable}
									/>
								</div>
							</div>
						</div>
					{/each}
					<div class="flex flex-col mt-auto gap-4">
						<p>{$cart.reduce((total, el) => total + el.price - el.discount, 0)} р.</p>
						<button
							class={$cart.length === 0
								? 'pointer-events-none hover:bg-zinc-200 cursor-not-allowed bg-zinc-200 btn-main'
								: 'btn-main w-full'}
							on:click={cartConfirmClick}
							disabled={$cart.length === 0}
						>
							<a href="/cart"> Оформить</a>
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
</header>

<div><slot /></div>

<!-- футер -->
<footer class="bg-main text-zinc-50 mt-auto">
	<div class="container mx-auto flex flex-row font-semibold px-4 justify-center">
		<div class="flex flex-row gap-4 py-2 items-center">
			<a href="/">
				<img src="../picture/Logo.svg" alt="instramat.by" class="min-w-full w-24 invert" />
			</a>
			<p><a href="/about">О нас</a></p>
			<p><a href="/contact">Контакты</a></p>
			<div class="flex gap-4">
				<a href="https://t.me/+sjCj1jSe7iMzOTMy">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6"
						><path
							d="M9.78 18.65l.28-4.23l7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3L3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"
							fill="currentColor"
						/></svg
					></a
				>
				<a href="/"
					><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24 " class="h-6 w-6"
						><path
							fill="currentColor"
							d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3Z"
						/></svg
					>
				</a>
			</div>
		</div>
	</div>
</footer>
