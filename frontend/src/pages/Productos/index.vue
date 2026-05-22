<script setup>
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

import { useProductosStore } from '@/stores/productosStore'

const store = useProductosStore()

const nombre = ref('')
const precio = ref('')
const stock = ref('')
const codigo = ref('')
const categoria = ref('')
const costo = ref('')
const unidad = ref('')
const stockMinimo = ref('')
const descripcion = ref('')
const editando = ref(false)

const productoEditando = ref(null)

const agregarProducto = () => {

    if (!nombre.value || !precio.value) {
        return
    }

    if (editando.value) {

        guardarEdicion()

        return
    }

    store.agregarProducto({

        id: uuidv4(),

        nombre: nombre.value,

        precio: Number(precio.value),

        stock: Number(stock.value),

        codigo: codigo.value,

        categoria: categoria.value,

        costo: Number(costo.value),

        unidad: unidad.value,

        stockMinimo: Number(stockMinimo.value),

        descripcion: descripcion.value



    })

    limpiarFormulario()

}

const cargarEditar = (producto) => {

    editando.value = true

    productoEditando.value = producto.id

    nombre.value = producto.nombre
    precio.value = producto.precio
    stock.value = producto.stock
    codigo.value = producto.codigo

}

const guardarEdicion = () => {

    store.editarProducto({

        id: productoEditando.value,

        nombre: nombre.value,

        precio: Number(precio.value),

        stock: Number(stock.value),

        codigo: codigo.value

    })

    limpiarFormulario()

}

const limpiarFormulario = () => {

    nombre.value = ''
    precio.value = ''
    stock.value = ''
    codigo.value = ''
    categoria.value = ''
    costo.value = ''
    unidad.value = ''
    stockMinimo.value = ''
    descripcion.value = ''

    editando.value = false

    productoEditando.value = null




}

const confirmarEliminar = (id) => {

    const confirmar = confirm(
        '¿Eliminar producto?'
    )

    if (confirmar) {

        store.eliminarProducto(id)

    }

}

</script>

<template>

    <div>

        <div class="flex justify-between items-center mb-6">

            <h1 class="text-3xl font-bold">
                Productos
            </h1>

        </div>

        <!-- FORM -->
        <div class="bg-white p-5 rounded shadow mb-6">

            <div class="grid grid-cols-4 gap-4">

                <input v-model="nombre" type="text" placeholder="Producto" class="border p-3 rounded" />

                <input v-model="precio" type="number" placeholder="Precio" class="border p-3 rounded" />

                <input v-model="stock" type="number" placeholder="Stock" class="border p-3 rounded" />

                <input v-model="codigo" type="text" placeholder="Código" class="border p-3 rounded" />
                <input v-model="categoria" type="text" placeholder="Categoría" class="border p-3 rounded" />

                <input v-model="costo" type="number" placeholder="Costo Compra" class="border p-3 rounded" />

                <input v-model="unidad" type="text" placeholder="Unidad (KG, LB, UND)" class="border p-3 rounded" />

                <input v-model="stockMinimo" type="number" placeholder="Stock mínimo" class="border p-3 rounded" />

                <textarea v-model="descripcion" placeholder="Descripción" class="border p-3 rounded" />

            </div>

            <button @click="agregarProducto" class="mt-4 bg-green-600 text-white px-5 py-3 rounded">
                {{ editando ? 'Guardar Cambios' : 'Agregar Producto' }}
            </button>

        </div>

        <!-- TABLA -->
        <div class="bg-white rounded shadow overflow-hidden">

            <table class="w-full">

                <thead class="bg-gray-200">

                    <tr>

                        <th class="p-4 text-left">
                            Código
                        </th>

                        <th class="p-4 text-left">
                            Producto
                        </th>

                        <th class="p-4 text-left">
                            Precio
                        </th>

                        <th class="p-4 text-left">
                            Stock
                        </th>

                        <th class="p-4 text left">
                            Categoria
                        </th>
                        <th class="p-4 text left">
                            Costo
                        </th>
                        <th class="p-4 text left">
                            Unidad
                        </th>
                        <th class="p-4 text left">
                            Stock Min.
                        </th>

                        <th class="p-4 text-left">
                            Acción
                        </th>


                    </tr>

                </thead>

                <tbody>

                    <tr v-for="producto in store.productos" :key="producto.id" class="border-t">

                        <td class="p-4">
                            {{ producto.codigo }}
                        </td>

                        <td class="p-4">
                            {{ producto.nombre }}
                        </td>

                        <td class="p-4">
                            RD$ {{ producto.precio }}
                        </td>


                        <td class="p-4">
                            <span v-if="producto.stock <= producto.stockMinimo" class="text-red-600 font-bold">
                                {{ producto.stock }} ⚠ STOCK BAJO
                            </span>

                            <span v-else>
                                {{ producto.stock }}
                            </span>
                        </td>



                        <td class="p-4">
                            {{ producto.categoria }}
                        </td>
                        <td class="p-4">
                            {{ producto.costo }}
                        </td>
                        <td class="p-4">
                            {{ producto.unidad }}
                        </td>
                        <td class="p-4">
                            {{ producto.stockMinimo }}

                        </td>

                        <td class="p-4">

                            <button @click="confirmarEliminar(producto.id)"
                                class="bg-red-500 text-white px-4 py-2 rounded">
                                Eliminar
                            </button>
                            <button @click="cargarEditar(producto)"
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