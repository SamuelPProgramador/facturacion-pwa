<script setup>

import {

    Chart as ChartJS,

    Title,

    Tooltip,

    Legend,

    LineElement,

    CategoryScale,

    LinearScale,

    PointElement

} from 'chart.js'

import { Line } from 'vue-chartjs'

import { computed } from 'vue'

import { useFacturasStore }
    from '@/stores/facturasStore'

ChartJS.register(

    Title,

    Tooltip,

    Legend,

    LineElement,

    CategoryScale,

    LinearScale,

    PointElement

)

const facturasStore = useFacturasStore()

const chartData = computed(() => {

    const agrupadas = {}

    facturasStore.facturas.forEach(

        factura => {

            const fecha = new Date(
                factura.fecha
            ).toLocaleDateString()

            if (!agrupadas[fecha]) {

                agrupadas[fecha] = 0

            }

            agrupadas[fecha] += factura.total

        }

    )

    return {

        labels: Object.keys(agrupadas),

        datasets: [

            {

                label: 'Ventas',

                data: Object.values(
                    agrupadas
                ),

                borderColor: '#2563eb',

                backgroundColor:
                    'rgba(37,99,235,0.2)',

                tension: 0.4,

                fill: true

            }

        ]

    }

})

const chartOptions = {

    responsive: true,

    maintainAspectRatio: false

}

</script>

<template>

    <div
        class="bg-white p-6 rounded shadow h-[400px]"
    >

        <h2 class="text-2xl font-bold mb-6">

            Ventas por Día

        </h2>

        <Line
            :data="chartData"
            :options="chartOptions"
        />

    </div>

</template>