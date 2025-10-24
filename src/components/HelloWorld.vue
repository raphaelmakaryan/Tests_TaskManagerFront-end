<script setup>
import { api } from '@/services/api.js'
import {onMounted, ref} from 'vue'

const title = ref("")

onMounted(async () => {
    const response = await api.getHello()
    title.value = ref(response.data)
})

</script>

<template>
    <p>{{ title }}</p>
</template>

<style scoped></style>
