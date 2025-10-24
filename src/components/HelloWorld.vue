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
    <h1>Task Manager</h1>
    <p aria-label="titleHello">{{ title }}</p>

    <a href="/addTasks">
        <button class="btn btn-primary my-2">Ajouter une tache</button>
    </a>

    <div class="allTasks">
        <div v-if="allTasks" v-for="task in allTasks">
            <div class="taskItem">
                <div class="titleTask forId">
                    <p class="forIdTitle"> ID : </p>
                    <p class="forIdValue">{{ task.uniqueId }}</p>
                </div>
                <div class="titleTask forState">
                    <p class="forStateTitle"> Etat : </p>
                    <p class="forStateValue">{{ task.state }}</p>
                </div>
                <div class="titleTask forDesc">
                    <p class="forDescTitle"> Description : </p>
                    <p class="forDescValue">{{ task.description }}</p>
                </div>
                <div class="titleTask">
                    <button type="button" class="btn btn-success" @click="completeTask(task.uniqueId)">Completer</button>
                </div>
                <div class="titleTask">
                    <button type="button"  class="btn btn-danger" @click="deleteTask(task.uniqueId)">Supprimer</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
