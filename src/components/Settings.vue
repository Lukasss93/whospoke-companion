<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import InputText from "primevue/inputtext";
import Switch from "@/components/Switch.vue";
import {computed} from "vue";

const ssl = useStorage('ws_ssl', true);
const domain = useStorage('ws_domain', 'whospoke.lucapatera.it');
const sslLabel = computed(() => ssl.value ? 'https' : 'http');

</script>

<template>
    <h2 class="text-white font-bold my-2">Impostazioni</h2>
    <div class="flex flex-col gap-1 w-full mb-2">
        <label for="username" class="text-white">Dominio</label>
        <InputText id="username" v-model="domain" aria-describedby="username-help" />
    </div>
    <div class="flex flex-col gap-1 w-full mb-4">
        <label for="username" class="text-white">Protocollo</label>
        <Switch :label="sslLabel" v-model="ssl" />
    </div>
</template>

<style scoped>

</style>