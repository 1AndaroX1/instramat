<script>
	import '../styles.css';
</script>

<header>
	<div class="bg-zinc-400 w-full">
		<div class="container mx-auto flex flex-row justify-between font-semibold px-4">
			<p>+375 ** ***-**-**</p>
			<p>tg: @instramat</p>
			<p>Inst: instramat</p>
		</div>
	</div>
	<nav>
		<div class="flex flex-row container mx-auto px-4 gap-4 py-2 items-center">
			<a href="/">
				<img src="../picture/Лого.svg" alt="instramat.by" class="min-w-full w-64" />
			</a>
			<button
				class="font-semibold flex flex-row items-center gap-2 bg-main text-zinc-50 rounded-full px-8 cursor-pointer py-4"
			>
				<div class="flex flex-col gap-1">
					<span class="h-0.5 w-6 rounded-sm bg-zinc-50" />
					<span class="h-0.5 w-6 rounded-sm bg-zinc-50" />
					<span class="h-0.5 w-6 rounded-sm bg-zinc-50" />
				</div>
				<span>Каталог</span>
			</button>
			<div class="border rounded-full relative flex items-center w-full">
				<input
					type="search"
					name="searchField"
					placeholder="поиск по каталогу..."
					class="py-4 outline-none ml-6 w-full"
				/>
				<button type="submit" class="p-3  bg-main rounded-full mr-1 text-zinc-50"
					><svg class="h-6 w-6" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
						/>
					</svg></button
				>
			</div>
			<button
				class="font-semibold flex flex-row items-center gap-2 bg-main text-zinc-50 rounded-full px-8 cursor-pointer  py-4"
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
</header>

<slot />

<footer />
