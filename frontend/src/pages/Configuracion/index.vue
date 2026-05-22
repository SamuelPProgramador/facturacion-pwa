<script setup>
import { ref } from 'vue'

import { useEmpresaStore } from '@/stores/empresaStore'

const store = useEmpresaStore()

const nombre = ref(store.empresa.nombre)
const rnc = ref(store.empresa.rnc)
const telefono = ref(store.empresa.telefono)
const direccion = ref(store.empresa.direccion)
const mensaje = ref(store.empresa.mensaje)

const guardar = () => {

    store.empresa = {

        nombre: nombre.value,
        rnc: rnc.value,
        telefono: telefono.value,
        direccion: direccion.value,
        mensaje: mensaje.value

    }

    store.guardarEmpresa()

    alert('Configuración guardada')

}
</script>

<template>

    <div>

        <h1 class="text-3xl font-bold mb-6">
            Configuración Empresa
        </h1>

        <div class="bg-white p-5 rounded shadow">

            <div class="grid gap-4">

                <input
                    v-model="nombre"
                    type="text"
                    placeholder="Nombre empresa"
                    class="border p-3 rounded"
                />

                <input
                    v-model="rnc"
                    type="text"
                    placeholder="RNC"
                    class="border p-3 rounded"
                />

                <input
                    v-model="telefono"
                    type="text"
                    placeholder="Teléfono"
                    class="border p-3 rounded"
                />

                <input
                    v-model="direccion"
                    type="text"
                    placeholder="Dirección"
                    class="border p-3 rounded"
                />

                <textarea
                    v-model="mensaje"
                    placeholder="Mensaje factura"
                    class="border p-3 rounded"
                />

                <button
                    @click="guardar"
                    class="bg-blue-600 text-white py-3 rounded"
                >
                    Guardar Configuración
                </button>

            </div>

        </div>

    </div>

</template>