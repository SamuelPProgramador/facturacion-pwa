<script setup>
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

import { ref, computed } from 'vue'

import FacturaPDF from '@/components/FacturaPDF.vue'
import { useFacturasStore } from '@/stores/facturasStore'
import * as XLSX from 'xlsx'

import FileSaver
from 'file-saver'

const store = useFacturasStore()
const facturaSeleccionada = ref(null)
const busqueda = ref('')

const facturasStore =
    useFacturasStore()

const reimprimirFactura = async (factura) => {

    facturaSeleccionada.value = factura

    await new Promise(resolve =>
        setTimeout(resolve, 300)
    )

    const elemento =
        document.getElementById('facturaPDF')

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

    pdf.save(`${factura.numero}.pdf`)
}

const exportarExcel = () => {

    const datos = facturasStore.facturas.map(

        factura => ({

            Factura: factura.numero,

            Cliente:
                factura.cliente?.nombre
                || 'Consumidor Final',

            Total: factura.total,

            MetodoPago:
                factura.metodoPago,

            Fecha: factura.fecha

        })

    )

    const worksheet =
        XLSX.utils.json_to_sheet(datos)

    const workbook =
        XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(

        workbook,

        worksheet,

        'Facturas'

    )

    const excelBuffer =
        XLSX.write(

            workbook,

            {

                bookType: 'xlsx',

                type: 'array'

            }

        )

    const data = new Blob(

        [excelBuffer],

        {

            type:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

        }

    )

    FileSaver.saveAs(

        data,

        'facturas.xlsx'

    )

}
const facturasFiltradas = computed(() => {

    return facturasStore.facturas.filter(

        factura => {

            const cliente =
                factura.cliente?.nombre || ''

            return (

                factura.numero
                    .toLowerCase()

                    .includes(
                        busqueda.value.toLowerCase()
                    )

                ||

                cliente
                    .toLowerCase()

                    .includes(
                        busqueda.value.toLowerCase()
                    )

                ||

                factura.metodoPago
                    .toLowerCase()

                    .includes(
                        busqueda.value.toLowerCase()
                    )

            )

        }

    )

})
</script>

<template>

    <div>

        <h1 class="text-3xl font-bold mb-6">
            Historial Facturas
        </h1>

        <button
            @click="exportarExcel"
            class="bg-green-600 text-white px-5 py-3 rounded-xl mb-5"
                > Exportar Excel

        </button>
        
        <div v-for="factura in store.facturas" :key="factura.numero" class="bg-white p-5 rounded shadow mb-4">

            <div class="flex justify-between">

                <div>

                    <h2 class="text-xl font-bold">
                        {{ factura.numero }}
                    </h2>

                    <p>
                        {{ factura.fecha }}
                    </p>

                    <p>
                        Cliente:
                        {{
                            factura.cliente?.nombre
                            || 'Consumidor Final'
                        }}
                    </p>
                    <p>

                        Método:
                        {{ factura.metodoPago }}

                    </p>

                </div>


                <div class="text-right">

                    <h2 class="text-2xl font-bold text-green-600">

                        RD$
                        {{ factura.total }}

                    </h2>

                </div>

            </div>

            <!-- PRODUCTOS -->
            <div class="mt-4">

                <div v-for="producto in factura.productos" :key="producto.id" class="border-t py-2">

                    {{ producto.nombre }}
                    x
                    {{ producto.cantidad }}

                </div>

            </div>
            <button @click="reimprimirFactura(factura)" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
                Reimprimir PDF
            </button>
        </div>

        <div class="fixed top-0 left-[-9999px]">

        <FacturaPDF
            v-if="facturaSeleccionada"
            :cliente="facturaSeleccionada.cliente"
            :carrito="facturaSeleccionada.productos"
            :total="facturaSeleccionada.total"
            :numero="facturaSeleccionada.numero"
            :fecha="facturaSeleccionada.fecha"
    />

</div>

    </div>



</template>