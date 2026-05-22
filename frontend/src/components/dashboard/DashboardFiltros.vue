<script setup>

defineProps({

    fechaFiltro: String

})

defineEmits([
    'update:fechaFiltro'
])

</script>

<template>

    <div
        class="bg-white p-5 rounded-2xl shadow-sm"
    >

        <label
            class="block mb-3 font-semibold"
        >

            Filtrar por Fecha

        </label>

        <input
            :value="fechaFiltro"
            @input="$emit(
                'update:fechaFiltro',
                $event.target.value
            )"
            type="date"
            class="border p-3 rounded-xl"
        />

    </div>

</template>