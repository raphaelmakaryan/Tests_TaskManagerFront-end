<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'App',
    setup() {
        const router = useRouter();
/*
        onMounted(() => {
            router.push('/');
        });
        */
    }
};
</script>