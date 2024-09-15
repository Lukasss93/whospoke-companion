<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import {computed} from "vue";
import { useIpcRendererOn } from '@vueuse/electron';

const domain = useStorage('ws_domain', 'https://whospoke.lucapatera.it');
const room = useStorage('ws_room', '');

const url = computed(() => {
    return `${domain.value}/@${room.value}/mini`;
});

useIpcRendererOn(window.ipcRenderer,'changeRouteTo', (event, ...args) => {
    console.log(args);
});
</script>

<template>
    <div class="min-h-screen flex flex-col items-center justify-center">
        <a href="https://whospoke.lucapatera.it/@Sikuro" target="_blank">
            <img src="/logo.svg" style="width: 80px" class="inline-block" alt="Logo"/>
        </a>
        <p class="text-amber-100 font-bold text-3xl">Who Spoke</p>
        <p class="text-gray-400 font-bold text-xl">Companion</p>


        <input v-model="domain" placeholder="Dominio" class="m-4"/>
        <input v-model="room" placeholder="Codice sessione" class="m-4"/>

        <a :href="url" class="m-4 text-white bg-amber-500 p-2 rounded inline-blockl">Accedi</a>
        <p class="text-xs text-white">{{url}}</p>
    </div>
</template>

<style>
:root {
    @apply bg-slate-900;
}
</style>
