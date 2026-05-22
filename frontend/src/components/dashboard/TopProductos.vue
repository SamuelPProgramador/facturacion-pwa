<script setup>

import { computed } from 'vue'

import { useFacturasStore }
from '@/stores/facturasStore'

const facturasStore = useFacturasStore()

const productosVendidos = computed(() => {

    const conteo = {}

    facturasStore.facturas.forEach(

        factura => {

            factura.productos.forEach(

                producto => {

                    if (
                        !conteo[
                            producto.nombre
                        ]
                    ) {

                        conteo[
                            producto.nombre
                        ] = 0

                    }

                    conteo[
                        producto.nombre
                    ] += producto.cantidad

                }

            )

        }

    )

    return Object.entries(
        conteo
    )

    .map(([nombre, cantidad]) => ({

        nombre,

        cantidad

    }))

    .sort(

        (a, b) =>

            b.cantidad - a.cantidad

    )

    .slice(0, 5)

})

</script>

<template>

    <div
        class="bg-white p-6 rounded-2xl shadow"
    >

        <h2
            class="text-2xl font-bold mb-6"
        >

            Productos Más Vendidos

        </h2>

        <div
            v-for="producto in productosVendidos"
            :key="producto.nombre"
            class="flex justify-between border-b py-4"
        >

            <div>

                <h3 class="font-bold">

                    {{ producto.nombre }}

                </h3>

            </div>

            <div>

                <span
                    class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                >

                    {{ producto.cantidad }}
                    vendidos

                </span>

            </div>

        </div>

    </div>

</template>