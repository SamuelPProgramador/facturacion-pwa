<script setup>

import { ref } from 'vue'

import DashboardFiltros
from '@/components/dashboard/DashboardFiltros.vue'

import DashboardCards
from '@/components/dashboard/DashboardCards.vue'

import GraficoVentas
from '@/components/dashboard/GraficoVentas.vue'

import UltimasVentas
from '@/components/dashboard/UltimasVentas.vue'

import TopProductos
from '@/components/dashboard/TopProductos.vue'

const fechaFiltro = ref('')

</script>

<template>

    <div>

        <!-- TITULO -->
        <div class="mb-8">

            <h1 class="text-4xl font-bold">

                Dashboard

            </h1>

            <p class="text-gray-500 mt-2">

                Resumen general del negocio

            </p>

        </div>

        <!-- FILTROS -->
        <DashboardFiltros
            v-model:fechaFiltro="fechaFiltro"
        />

        <!-- CARDS -->
        <DashboardCards
            :fechaFiltro="fechaFiltro"
        />

        <!-- GRAFICO -->
        <div class="mt-8">

            <GraficoVentas
                :fechaFiltro="fechaFiltro"
            />

        </div>

          <div class="mt-8">

            <TopProductos />

        </div>


        <!-- ULTIMAS VENTAS -->
        <div class="mt-8">

            <UltimasVentas />

        </div>

      
    </div>

</template>