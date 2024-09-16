<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import {computed} from "vue";
import InputGroup from "primevue/inputgroup";
import Button from "primevue/button";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";

const ssl = useStorage('ws_ssl', true);
const domain = useStorage('ws_domain', 'whospoke.lucapatera.it');
const room = useStorage('ws_room', '');

const url = computed(() => {
    return `http${ssl.value?'s':''}://${domain.value}/@${room.value}/mini`;
});
</script>

<template>
    <h2 class="text-white font-bold my-2">Entra nella sessione</h2>
    <InputGroup class="mb-3">
        <InputGroupAddon>
            @
        </InputGroupAddon>
        <InputText v-model="room" placeholder="Codice sessione" />
    </InputGroup>

    <Button label="Entra" severity="info" class="w-full" as="a" link :href="url" />
</template>

<style scoped>

</style>