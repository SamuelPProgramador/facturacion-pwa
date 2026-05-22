import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEmpresaStore = defineStore('empresa', () => {

    const empresa = ref(

        JSON.parse(localStorage.getItem('empresa'))

        ||

        {
            nombre: '',
            rnc: '',
            telefono: '',
            direccion: '',
            mensaje: 'Gracias por su compra'
        }

    )

    const guardarEmpresa = () => {

        localStorage.setItem(
            'empresa',
            JSON.stringify(empresa.value)
        )

    }

    return {
        empresa,
        guardarEmpresa
    }

})