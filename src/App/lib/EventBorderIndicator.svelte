<script lang='ts'>
	let damaged = false;
	let timeoutRef:undefined|number
	export const showDamageHappen = ()=>{
		damaged = true;
		if(timeoutRef){
			clearTimeout(timeoutRef)
		}
		timeoutRef = setTimeout(()=>(damaged= false), 800)
	}
</script>
<div class={`${damaged ? "damaged-glow":""} ` + "absolute inset-0  damaged-glow-indicator" }>

</div>
