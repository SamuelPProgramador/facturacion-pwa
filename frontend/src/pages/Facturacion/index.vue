<script setup>
import { ref, computed} from 'vue'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'


import { useClientesStore } from '@/stores/clientesStore'
import { useProductosStore } from '@/stores/productosStore'
import { useFacturacionStore } from '@/stores/facturacionStore'
import FacturaPDF from '@/components/FacturaPDF.vue'
import { useFacturasStore } from '../../stores/facturasStore'

const clientesStore = useClientesStore()
const productosStore = useProductosStore()
const facturacionStore = useFacturacionStore()
const facturasStore = useFacturasStore()
const clienteSeleccionado = ref('')
const metodoPago = ref('Efectivo')
const buscarProducto = ref('')
const tipoDocumento = ref('FACTURA')

const obtenerCliente = () => {

    return clientesStore.clientes.find(
        cliente => cliente.id === clienteSeleccionado.value
    )

}
const productosFiltrados = computed(() => {

    return productosStore.productos.filter(producto =>

        producto.nombre
            .toLowerCase()
            .includes(
                buscarProducto.value.toLowerCase()
            )

    )

})
const generarPDF = async () => {

    if (facturacionStore.carrito.length === 0) {
        alert('Agrega productos')
        return
    }

    const elemento = document.getElementById('facturaPDF')

    if (!elemento) {
        alert('No se encontró la factura')
        return
    }

    try {

        const canvas = await html2canvas(elemento, {
            backgroundColor: '#ffffff'
        })

        const imgData = canvas.toDataURL('image/png')

        const pdf = new jsPDF('p', 'mm', 'a4')

        const imgWidth = 190

        const imgHeight =
            (canvas.height * imgWidth) / canvas.width

        pdf.addImage(
            imgData,
            'PNG',
            10,
            10,
            imgWidth,
            imgHeight
        )

        pdf.save('factura.pdf')

    } catch (error) {

        console.error(error)

        alert(error)

    }

}
const finalizarVenta = async () => {

    if (facturacionStore.carrito.length === 0) {

        alert('No hay productos')

        return
    }

    // DESCONTAR INVENTARIO
    facturacionStore.carrito.forEach(item => {

        if (tipoDocumento.value == 'FACTURA') {
                productosStore.descontarStock(
                item.id,
                item.cantidad
        )

        }
 
    })

    // NUMERO FACTURA
        const prefijo =
        tipoDocumento.value === 'FACTURA'
            ? 'FAC'
            : 'COT'

    const numero =
        `${prefijo}-${String(Date.now()).slice(-6)}`
    //const numeroFactura =
      //  facturasStore.obtenerSiguienteNumero()
    // CREAR FACTURA
    const factura = {

        numero: numeroFactura,

        fecha: new Date().toLocaleString(),

        cliente: obtenerCliente(),

        productos: [...facturacionStore.carrito],

        total: facturacionStore.total,

        metodoPago: metodoPago.value,

        tipo: tipoDocumento.value,

    }

    // GUARDAR FACTURA
    facturasStore.agregarFactura(factura)

    // GENERAR PDF
    await generarPDF()

    // LIMPIAR
    facturacionStore.carrito = []

    clienteSeleccionado.value = ''

    alert('Venta completada')

}


</script>

<template>

    <div>

        <h1 class="text-3xl font-bold mb-6">
            Facturación
        </h1>

                <select
            v-model="tipoDocumento"
            class="border p-3 rounded-xl"
        >

            <option value="FACTURA">
                Factura
            </option>

            <option value="COTIZACION">
                Cotización
            </option>

        </select>

        
        <!-- CLIENTE -->
        <p>
    Tipo:
    {{ factura.tipo }}
</p>

        <div class="bg-white p-5 rounded shadow mb-6">

            <label class="block mb-2 font-semibold">
                Cliente
            </label>

            <select v-model="clienteSeleccionado" class="border p-3 rounded w-full">

                <option value="">
                    Seleccionar Cliente
                </option>

                <option v-for="cliente in clientesStore.clientes" :key="cliente.id" :value="cliente.id">
                    {{ cliente.nombre }}
                </option>

            </select>

        </div>
        <div class="bg-white p-5 rounded shadow mb-6">

    <label class="block mb-2 font-semibold">

        Método de Pago

    </label>

    <select
        v-model="metodoPago"
        class="border p-3 rounded w-full"
    >

        <option value="Efectivo">
            Efectivo
        </option>

        <option value="Tarjeta">
            Tarjeta
        </option>

        <option value="Transferencia">
            Transferencia
        </option>

        <option value="Crédito">
            Crédito
        </option>

    </select>

</div>

        <div class="grid grid-cols-2 gap-6">

            <!-- PRODUCTOS -->
            <div class="bg-white p-5 rounded shadow">

                <h2 class="text-xl font-bold mb-4">
                    Productos
                </h2>

                <input v-model="buscarProducto" type="text" placeholder="Buscar producto..."
                    class="border p-3 rounded w-full mb-4" />
                <div v-for="producto in productosFiltrados" :key="producto.id"
                    class="border p-4 rounded mb-3 flex justify-between items-center">

                    <div>

                        <h3 class="font-bold">
                            {{ producto.nombre }}
                        </h3>

                        <p>
                            RD$ {{ producto.precio }}
                        </p>

                    </div>

                    <button @click="facturacionStore.agregarProducto(producto)" :disabled="producto.stock <= 0"
                        class="px-4 py-2 rounded text-white" :class="producto.stock <= 0
                                ? 'bg-gray-400'
                                : 'bg-green-600'">

                        {{ producto.stock <= 0 ? 'Sin Stock' : 'Agregar' }} </button>

                </div>

            </div>

            <!-- CARRITO -->
            <div class="bg-white p-5 rounded shadow">

                <h2 class="text-xl font-bold mb-4">
                    Carrito
                </h2>

                <div v-for="item in facturacionStore.carrito" :key="item.id" class="border p-4 rounded mb-3">

                    <div class="flex justify-between">

                        <div>

                            <h3 class="font-bold">
                                {{ item.nombre }}
                            </h3>

                            <p>
                                RD$ {{ item.precio }}
                            </p>

                        </div>

                        <button @click="facturacionStore.eliminarProducto(item.id)"
                            class="bg-red-500 text-white px-3 py-1 rounded">
                            X
                        </button>

                    </div>

                    <div class="flex items-center gap-3 mt-3">

                        <button @click="facturacionStore.disminuirCantidad(item.id)"
                            class="bg-gray-300 px-3 py-1 rounded">
                            -
                        </button>

                        <span>
                            {{ item.cantidad }}
                        </span>

                        <button @click="facturacionStore.aumentarCantidad(item.id)"
                            class="bg-gray-300 px-3 py-1 rounded">
                            +
                        </button>

                    </div>

                </div>

                <!-- TOTAL -->
                <div class="mt-6 border-t pt-4">

                  <div class="space-y-2">

    <div class="flex justify-between">

        <span>
            Subtotal:
        </span>

        <span>

            RD$
            {{ facturacionStore.subtotal.toFixed(2) }}

        </span>

    </div>

    <div class="flex justify-between">

        <span>
            ITBIS (18%)
        </span>

        <span>

            RD$
            {{ facturacionStore.itbis.toFixed(2) }}

        </span>

    </div>

    <div
        class="flex justify-between text-2xl font-bold border-t pt-3"
    >

        <span>
            Total:
        </span>

        <span class="text-green-600">

            RD$
            {{ facturacionStore.total.toFixed(2) }}

        </span>

    </div>

</div>
                </div>
                <button @click="finalizarVenta" class="mt-6 bg-blue-600 text-white px-6 py-3 rounded">
                    Generar PDF
                </button>

            </div>

        </div>

            <div class="fixed top-0 left-[-9999px]">

        <FacturaPDF :cliente="obtenerCliente()" :carrito="facturacionStore.carrito" :total="facturacionStore.total"
            :numero="facturasStore.obtenerSiguienteNumero()" :fecha="new Date().toLocaleString()" />

    </div>
    </div>



</template>
