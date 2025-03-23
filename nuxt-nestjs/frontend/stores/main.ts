import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
    const token = ref<string>('')

    const getToken = computed(() => token.value)
    
    function setLocalStorage(name : string, value: any) {
        localStorage.setItem(name, value)
    } 
    
    function getLocalStorage(name: string) {
        return localStorage.getItem(name) || ''
    }

    function setToken(value: string) {
        token.value = value
    }

  return { token, setLocalStorage, getLocalStorage, setToken, getToken}
})
