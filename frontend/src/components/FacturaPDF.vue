<script setup>
import { useEmpresaStore } from '@/stores/empresaStore'

defineProps({
    cliente: Object,
    carrito: Array,
    total: Number,
    numero: String,
    fecha: String
})


const empresaStore = useEmpresaStore()
</script>

<template>

    <div id="facturaPDF" style="background: white; width: 800px; padding: 40px;">

        <div class="flex justify-between mb-10">

            <div>

                <h1 class="text-4xl font-bold">
                    {{ tipo }}
                </h1>
                <p class="mt-2 font-bold">
                    {{ numero }}
                </p>

                <p class="mt-2">
                    Fecha:
                    {{ fecha }}
                </p>

            </div>

            <div class="text-right">

                <h2 class="text-2xl font-bold">
                    {{ empresaStore.empresa.nombre }}
                </h2>

                <p>
                    Santo Domingo
                </p>
                <p>
                    RNC:
                    {{ empresaStore.empresa.rnc }}
                </p>

                <p>
                    {{ empresaStore.empresa.telefono }}
                </p>

                <p>
                    {{ empresaStore.empresa.direccion }}
                </p>

            </div>

        </div>

        <!-- CLIENTE -->
        <div class="mb-8">

            <h3 class="font-bold text-xl mb-2">
                Cliente
            </h3>

            <p>
                {{ cliente?.nombre || 'Consumidor Final' }}
            </p>

            <p>
                {{ cliente?.telefono }}
            </p>

            <p>
                {{ cliente?.direccion }}
            </p>

        </div>

        <!-- TABLA -->
        <table class="w-full border">

            <thead style="background: #e5e7eb;">

                <tr>

                    <th class="border p-3 text-left">
                        Producto
                    </th>

                    <th class="border p-3 text-left">
                        Cantidad
                    </th>

                    <th class="border p-3 text-left">
                        Precio
                    </th>

                    <th class="border p-3 text-left">
                        Total
                    </th>

                </tr>

            </thead>

            <tbody>

                <tr v-for="item in carrito" :key="item.id">

                    <td class="border p-3">
                        {{ item.nombre }}
                    </td>

                    <td class="border p-3">
                        {{ item.cantidad }}
                    </td>

                    <td class="border p-3">
                        RD$ {{ item.precio }}
                    </td>

                    <td class="border p-3">

                        RD$
                        {{ item.precio * item.cantidad }}

                    </td>

                </tr>

            </tbody>

        </table>

        <!-- TOTAL -->
        <div class="mt-10 text-right">

            <h2 class="text-3xl font-bold">

                Total:
                RD$
                {{ total }}

            </h2>

        </div>

        <div class="mt-10 text-center">

    <p>
        {{ empresaStore.empresa.mensaje }}
    </p>
    </div>
    

</div>

</template>