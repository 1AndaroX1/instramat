<script>
	import Pagination from '$lib/Pagination.svelte';
	import ProductList from '$lib/ProductList.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<section
	class="flex flex-wrap flex-row flex-start container mx-auto mt-8 px-8 flex-1 whitespace-pre-line"
>
	<ProductList list={data.result} />

	<Pagination pageNumber={data.page} totalPages={data.totalPages} />
</section>
