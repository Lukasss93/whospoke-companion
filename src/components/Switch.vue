<script setup lang="ts">
import ToggleSwitch from "primevue/toggleswitch";
import {useId} from "vue";

defineProps<{ label: string }>();
const ssl = defineModel<boolean>();
const inputId = useId();
</script>

<template>
    <div class="flex w-full border border-surface-700 bg-surface-950 px-2 py-1.5 rounded-md">
        <label :for="inputId" class="text-white flex-1">{{label}}</label>
        <ToggleSwitch :inputId="inputId" v-model="ssl" />
    </div>
</template>

<style scoped>

</style>