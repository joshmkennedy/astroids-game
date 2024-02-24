<script lang='ts'>
	export let value:number;

	
</script>

<div class="inline-block w-[160px] overflow-hidden h-[20px] p-1 border-2 border-slate-100 rounded-md">
	<div class="bg-green-400 w-full h-full rounded-sm transition-all " style="transform-origin:left center; transform:scaleX({value});"></div>	
</div>
