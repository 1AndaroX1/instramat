<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	export let pageNumber;
	export let totalPages;

	function goToPage(pageNumber) {
		const newUrl = new URL($page.url);
		if (pageNumber == 1) {
			newUrl?.searchParams?.delete('page', pageNumber);
		} else {
			newUrl?.searchParams?.set('page', pageNumber);
		}

		goto(newUrl);
	}
</script>

<!-- Пагинация -->

<div class="flex gap-2 flex-1 container flex-wrap flex-row m-3 justify-center">
	<button
		class={pageNumber == 1
			? 'pointer-events-none hover:bg-zinc-200 cursor-not-allowed bg-zinc-200 btn-main'
			: 'btn-main'}
		on:click={goToPage(pageNumber - 1)}
		disabled={pageNumber == 1}
	>
		Назад
	</button>

	<div class="flex self-center w-3 mx-3">
		{pageNumber}
	</div>

	<button
		class={pageNumber == totalPages
			? 'pointer-events-none hover:bg-zinc-200 cursor-not-allowed bg-zinc-200 btn-main'
			: 'btn-main'}
		on:click={goToPage(pageNumber + 1)}
		disabled={pageNumber == totalPages}
	>
		Вперед
	</button>
</div>
