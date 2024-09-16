<script setup lang="ts">
import Join from "@/components/Join.vue";
import Settings from "@/components/Settings.vue";
import {ref} from "vue";
import Button from "primevue/button";

const page = ref('index');

function settingsButtonClick() {
    page.value = page.value === 'index' ? 'settings' : 'index';
}

</script>

<template>
    <Teleport to="body">
        <!-- REALTIME LABEL -->
        <span class="absolute top-2 left-2">
            <Button severity="secondary" @click="settingsButtonClick">
                <i class="pi pi-cog" style="font-size: 1.3rem" v-if="page==='index'"></i>
                <span v-if="page==='settings'">Torna indietro</span>
            </Button>
        </span>
    </Teleport>


    <div class="min-h-screen flex flex-col items-center justify-center px-2">
        <a href="https://whospoke.lucapatera.it/@Sikuro" target="_blank">
            <img src="/logo.svg" style="width: 80px" class="inline-block" alt="Logo"/>
        </a>
        <p class="text-amber-100 font-bold text-3xl">Who Spoke</p>
        <p class="text-gray-400 font-bold text-xl mb-4">Companion</p>

        <Join v-if="page==='index'"/>
        <Settings v-if="page==='settings'" @back="page='index'"/>
    </div>
</template>

<style>
:root {
    @apply bg-slate-900;
}
</style>
