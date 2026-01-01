<script lang="ts">
    import { getExpenseStore } from "$lib/state/expense-store-context";
    import { todayISO } from '$lib/domain/date';
    import { Card } from "$lib/components/ui/card/index"
    import { Button } from "$lib/components/ui/button/index"

    const store = getExpenseStore();

    function addDummy() {
		const firstCategory = store.categories[0];
		store.addExpense({
			date: todayISO(),
			amount: 25000,
			categoryId: firstCategory.id,
			note: "Dummy expense"
		});
	}
</script>
<div class="grid gap-4 max-w-xl">
    <Card class="p-4">
        <div class="text-sm text-muted-foreground">Active Month</div>
        <div class="font-semibold">{store.activeMonth}</div>
    </Card>

    <Card class="p-4">
        <div class="text-sm text-muted-foreground">Total bulan aktif</div>
        <div class="text-2xl font-bold">Rp {store.totalActiveMonth.toLocaleString("id-ID")}</div>

        <Button class="mt-4" onclick={addDummy}>Tambah dummy</Button>
    </Card>

    <Card class="p-4">
        <div class="text-sm text-muted-foreground">By category (bulan aktif)</div>
        <ul class="mt-2 space-y-1">
            {#each store.totalByCategoryActiveMonth as row (row.categoryId)}
                <li class="flex justify-between">
                    <span>{row.category?.name ?? row.categoryId}</span>
                    <span>Rp {row.total.toLocaleString("id-ID")}</span>
                </li>
            {/each}
        </ul>
    </Card>
</div>