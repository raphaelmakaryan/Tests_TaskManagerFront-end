<template>
    <p class="fs-1">Ajouter une tache</p>

    <div class="my-5">
        <div class="container">
            <div class="row">
                <form @submit.prevent="forAddTask">
                    <div class="col-12 my-2">
                        <label for="inputDescription" class="form-label">Description de la task</label>
                        <input type="text" class="form-control" id="inputDescription" v-model="description" required
                            aria-label="inputDescription">
                    </div>
                    <div class="col-12 my-2">
                        <button type="submit" class="btn btn-primary">Ajouter</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>

<script>
import { api } from '@/services/api.js'

export default {
    name: "addTask",
    data() {
        return {
            description: '',
        };
    },
    methods: {
        async forAddTask() {
            let descriptionUser = this.description
            let fetchInsert = await api.postTask(descriptionUser)
            if (fetchInsert.status == 200) {
                this.$router.push({ path: '/' });
            } else {
                alert(`Login failed because ${data.error}!`);
            }
        }
    }
};

</script>

<style scoped></style>