<script lang="ts">
	import { Button } from '$lib/components/ui/button/index';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100 p-4">
	<Card class="w-full max-w-md">
		<CardHeader>
			<CardTitle class="text-2xl font-bold text-center">Bookmark Manager</CardTitle>
		</CardHeader>
		<CardContent class="space-y-4">
			<div class="space-y-5">
				<Label for="test-input">Test Input</Label>
				<Input id="test-input" placeholder="Ketik sesuatu ..." />
			</div>

			<Button class="w-full">Coba klik saya</Button>
		</CardContent>
	</Card>
</div>
