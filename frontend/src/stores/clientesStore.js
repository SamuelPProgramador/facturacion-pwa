import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useClientesStore = defineStore('clientes', () => {

    const clientes = ref(
        JSON.parse(localStorage.getItem('clientes')) || []
    )

    const guardarLocal = () => {
        localStorage.setItem(
            'clientes',
            JSON.stringify(clientes.value)
        )
    }

    const agregarCliente = (cliente) => {
        clientes.value.push(cliente)
        guardarLocal()
    }

    const eliminarCliente = (id) => {
        clientes.value = clientes.value.filter(
            cliente => cliente.id !== id
        )

        guardarLocal()
    }
    const editarCliente = (clienteActualizado) => {

    const index = clientes.value.findIndex(
        cliente => cliente.id === clienteActualizado.id
    )

    if(index !== -1){

        clientes.value[index] = clienteActualizado

        guardarLocal()

    }

}

    return {
        clientes,
        agregarCliente,
        eliminarCliente,
        editarCliente
    }

})