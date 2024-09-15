import {createApp} from 'vue';
import './style.scss';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@/presets/Aura';

createApp(App)
    .use(PrimeVue, {
        unstyled: true,
        pt: Aura,
    })
    .mount('#app')
    .$nextTick(() => {
        // Use contextBridge
        window.ipcRenderer.on('main-process-message', (_event, message) => {
            console.log(message);
        });
    });
