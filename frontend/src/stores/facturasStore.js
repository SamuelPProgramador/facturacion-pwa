import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFacturasStore = defineStore('facturas', () => {

    const facturas = ref(
        JSON.parse(localStorage.getItem('facturas')) || []
    )

    const guardarLocal = () => {

        localStorage.setItem(
            'facturas',
            JSON.stringify(facturas.value)
        )

    }

    const agregarFactura = (factura) => {

        facturas.value.unshift(factura)

        guardarLocal()

    }
    const obtenerSiguienteNumero = () => {

    const ultimoNumero =
        facturas.value.length + 1

    return `FAC-${String(ultimoNumero).padStart(6, '0')}`

}

    return {
        facturas,
        agregarFactura,
        obtenerSiguienteNumero
    }

})