import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '../layouts/MainLayout.vue'

import Dashboard from '../pages/Dashboard/index.vue'
import Clientes from '../pages/Clientes/index.vue'
import Productos from '../pages/Productos/index.vue'
import Facturacion from '../pages/Facturacion/index.vue'
import Facturas from '../pages/Facturas/index.vue'
import Configuracion from '../pages/Configuracion/index.vue'

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '',
                component: Dashboard
            },
            {
                path: 'clientes',
                component: Clientes
            },
            {
                path: 'productos',
                component: Productos
            },
            {
                path: 'facturacion',
                component: Facturacion
            },
            {
            path: 'facturas',
            component: Facturas
            },
            {
                path: 'configuracion',
                component: Configuracion
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router