<script setup>
import { api } from '@/services/api.js'
import { onMounted, ref } from 'vue'

const allTasks = ref([])
const title = ref('')

onMounted(async () => {
    try {
        const responseHello = await api.getHello()
        title.value = responseHello.data
        await loadTasks()
    } catch (error) {
        console.error('Erreur au chargement:', error)
    }
})

async function completeTask(id) {
    try {
        const fetchInsert = await api.putTask(id)
        if (fetchInsert.status === 200) {
            await loadTasks()
        } else {
            alert(`Erreur: ${fetchInsert.error}`)
        }
    } catch (error) {
        alert(`Erreur lors de la completation : ${error.message}`)
    }
}


async function deleteTask(id) {
    try {
        const fetchInsert = await api.deleteTask(id)
        if (fetchInsert.status === 200) {
            await loadTasks()
        } else {
            alert(`Erreur: ${fetchInsert.error}`)
        }
    } catch (error) {
        alert(`Erreur lors de la suppresion: ${error.message}`)
    }
}

async function loadTasks() {
    try {
        const dataTasks = await api.getTasks()
        allTasks.value = dataTasks.data
    } catch (error) {
        console.error('Erreur lors du chargement des tâches:', error)
    }
}


</script>

<template>
    <p>{{ title }}</p>

    <a href="/addTask">
        <button style="margin-top: 2vh; margin-bottom: 2vh;">Ajouter une tache</button>
    </a>

    <div class="allTasks">
        <div v-if="allTasks" v-for="task in allTasks">
            <div class="task">
                <div class="titleTask">
                    <p> ID : </p>
                    <p>{{ task.uniqueId }}</p>
                </div>
                <div class="titleTask">
                    <p> Etat : </p>
                    <p>{{ task.state }}</p>
                </div>
                <div class="titleTask">
                    <p> Description : </p>
                    <p>{{ task.description }}</p>
                </div>
                <div class="titleTask">
                    <button type="button" @click="completeTask(task.uniqueId)">Completer</button>
                </div>
                <div class="titleTask">
                    <button type="button" @click="deleteTask(task.uniqueId)">Supprimer</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
