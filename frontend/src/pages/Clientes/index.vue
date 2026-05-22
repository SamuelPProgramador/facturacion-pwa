<script setup>
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

import { useClientesStore } from "@/stores/clientesStore";

const store = useClientesStore();

const nombre = ref("");
const telefono = ref("");
const direccion = ref("");
const cedula = ref("");
const email = ref("");
const tipoCliente = ref("");
const notas = ref("");
const editando = ref(false);

const clienteEditando = ref(null);
const agregarCliente = () => {
    if (!nombre.value) {
        return;
    }

    if (editando.value) {
        guardarEdicion();

        return;
    }

    store.agregarCliente({
        id: uuidv4(),

        nombre: nombre.value,

        telefono: telefono.value,

        direccion: direccion.value,
        cedula: cedula.value,

        email: email.value,

        tipoCliente: tipoCliente.value,

        notas: notas.value,

        fechaRegistro:
            new Date().toLocaleDateString()
    });

    limpiarFormulario();
};
const cargarEditar = (cliente) => {
    editando.value = true;

    clienteEditando.value = cliente.id;

    nombre.value = cliente.nombre;
    telefono.value = cliente.telefono;
    direccion.value = cliente.direccion;
};
const guardarEdicion = () => {
    store.editarCliente({
        id: clienteEditando.value,

        nombre: nombre.value,

        telefono: telefono.value,

        direccion: direccion.value,

    });

    limpiarFormulario();
};
const limpiarFormulario = () => {
    nombre.value = "";
    telefono.value = "";
    direccion.value = "";
    cedula.value = '';
    email.value = '';
    tipoCliente.value = '';
    notas.value = '';

    editando.value = false;

    clienteEditando.value = null;
};
</script>

<template>
    <div>
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold">Clientes</h1>
        </div>

        <!-- FORMULARIO -->
        <div class="bg-white p-5 rounded shadow mb-6">
            <div class="grid grid-cols-3 gap-4">
                <input v-model="nombre" type="text" placeholder="Nombre" class="border p-3 rounded" />

                <input v-model="telefono" type="text" placeholder="Teléfono" class="border p-3 rounded" />

                <input v-model="direccion" type="text" placeholder="Dirección" class="border p-3 rounded" />

                <input v-model="cedula" type="text" placeholder="Cédula / RNC" class="border p-3 rounded" />

                <input v-model="email" type="email" placeholder="Correo electrónico" class="border p-3 rounded" />
                

                <select v-model="tipoCliente" class="border p-3 rounded">
                <option value="">Tipo Cliente</option>

                <option value="Frecuente">Frecuente</option>

                <option value="Mayorista">Mayorista</option>

                <option value="Crédito">Crédito</option>
            </select>

            <textarea v-model="notas" placeholder="Notas" class="border p-3 rounded" />
            </div>
            

           

            <button @click="agregarCliente" class="mt-4 bg-blue-600 text-white px-5 py-3 rounded">
                Agregar Cliente
            </button>
        </div>

        <!-- TABLA -->
        <div class="bg-white rounded shadow overflow-hidden">
            <table class="w-full">
                <thead class="bg-gray-200">
                    <tr>
                        <th class="text-left p-4">Nombre</th>

                        <th class="text-left p-4">Teléfono</th>

                        <th class="text-left p-4">Dirección</th>
                        <th class="text-left p-4">Cedula/RNC</th>
                        <th class="text-left p-4">Email</th>
                        <th class="text-left p-4">Tipo</th>

                        <th class="text-left p-4">Acción</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="cliente in store.clientes" :key="cliente.id" class="border-t">
                        <td class="p-4">
                            {{ cliente.nombre }}
                        </td>

                        <td class="p-4">
                            {{ cliente.telefono }}
                        </td>

                        <td class="p-4">
                            {{ cliente.direccion }}
                        </td>
                        
                        <td class="p-4">
                            {{ cliente.cedula }}
                        </td>

                        <td class="p-4">
                            {{ cliente.email }}
                        </td>

                        <td class="p-4">
                            {{ cliente.tipoCliente }}
                        </td>

                        <td class="p-4">
                            <button @click="store.eliminarCliente(cliente.id)"
                                class="bg-red-500 text-white px-4 py-2 rounded">
                                Eliminar
                            </button>
                            <button @click="cargarEditar(cliente)"
                                class="bg-yellow-500 text-white px-4 py-2 rounded mr-2">
                                Editar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
