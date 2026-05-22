<script setup>

import { computed } from 'vue'

import { useClientesStore }
from '@/stores/clientesStore'

import { useProductosStore }
from '@/stores/productosStore'

import { useFacturasStore }
from '@/stores/facturasStore'

const props = defineProps({

    fechaFiltro: String

})

const clientesStore = useClientesStore()

const productosStore = useProductosStore()

const facturasStore = useFacturasStore()

const facturasFiltradas = computed(() => {

    if (!props.fechaFiltro) {

        return facturasStore.facturas

    }

    return facturasStore.facturas.filter(

        factura =>

            factura.fecha.includes(
                props.fechaFiltro
            )

    )

})

const totalVentas = computed(() => {

    return facturasFiltradas.value.reduce(

        (acc, factura) =>

            acc + factura.total,

        0

    )

})

</script>

<template>

    <div
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8"
    >

        <!-- VENTAS -->

        <div
            class="bg-blue-600 text-white p-6 rounded-2xl shadow"
        >

            <h2 class="text-lg">
                Ventas
            </h2>

            <p
                class="text-3xl font-bold mt-3"
            >

                RD$
                {{ totalVentas }}

            </p>

        </div>

        <!-- FACTURAS -->

        <div
            class="bg-green-600 text-white p-6 rounded-2xl shadow"
        >

            <h2 class="text-lg">
                Facturas
            </h2>

            <p
                class="text-3xl font-bold mt-3"
            >

                {{ facturasFiltradas.length }}

            </p>

        </div>

        <!-- CLIENTES -->

        <div
            class="bg-white p-6 rounded-2xl shadow"
        >

            <h2 class="text-gray-500">
                Clientes
            </h2>

            <p
                class="text-3xl font-bold mt-3"
            >

                {{ clientesStore.clientes.length }}

            </p>

        </div>

        <!-- PRODUCTOS -->

        <div
            class="bg-white p-6 rounded-2xl shadow"
        >

            <h2 class="text-gray-500">
                Productos
            </h2>

            <p
                class="text-3xl font-bold mt-3"
            >

                {{ productosStore.productos.length }}

            </p>

        </div>

    </div>

</template>