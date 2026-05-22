<script setup>

import { computed } from 'vue'

import { useFacturasStore }
from '@/stores/facturasStore'

const facturasStore = useFacturasStore()

const ultimasFacturas = computed(() => {

    return facturasStore.facturas.slice(0, 5)

})

</script>

<template>

    <div
        class="bg-white p-6 rounded-2xl shadow"
    >

        <h2
            class="text-2xl font-bold mb-6"
        >

            Últimas Ventas

        </h2>

        <div
            v-for="factura in ultimasFacturas"
            :key="factura.numero"
            class="border-b py-4 flex justify-between items-center"
        >

            <div>

                <h3 class="font-bold">

                    {{ factura.numero }}

                </h3>

                <p class="text-gray-600">

                    {{
                        factura.cliente?.nombre
                        || 'Consumidor Final'
                    }}

                </p>

                <p
                    class="text-sm text-gray-400"
                >

                    {{ factura.fecha }}

                </p>

            </div>

            <div>

                <h2
                    class="text-2xl font-bold text-green-600"
                >

                    RD$
                    {{ factura.total }}

                </h2>

            </div>

        </div>

    </div>

</template>