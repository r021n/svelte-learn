<script lang="ts">
	import { Button } from '$lib/components/ui/button/index';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card/index';
</script>

<div class="flex h-screen items-center justify-center bg-slate-50">
	<Card class="w-[350px]">
		<CardHeader>
			<CardTitle>Setup Berhasil</CardTitle>
		</CardHeader>
		<CardContent>
			<p class="mb-4 text-sm text-muted-foreground">
				Sveltekit + Tailwind v4 + Shadcn siap digunakan
			</p>
			<Button class="w-full">Klik Saya</Button>
		</CardContent>
	</Card>
</div>

<style lang="postcss">
	@reference "tailwindcss";
</style>
