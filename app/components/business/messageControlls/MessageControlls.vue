<script setup lang="ts">
import Textarea from '../../ui/textarea/Textarea.vue';
import { ref } from 'vue';

const { onSubmit, loading } = defineProps<{
    onSubmit: (text: string) => void;
    loading?: boolean,
}>();

const form = ref();
const messageText = ref<string>('');


const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if(loading) return;
    onSubmit(messageText.value);
    messageText.value = "";
}

const handlePressEnter = async () => {
    onSubmit(messageText.value);
    messageText.value = "";
}

</script>


<template>
    <form 
        ref="form"
        class="message-controlls" 
        v-on:submit="handleSubmit" 
    >
        <Textarea 
            :onPressEnter="handlePressEnter" 
            :disabled="loading" 
            v-model="messageText"
        >
        </Textarea>
        <button 
            class="message-controlls__submit" 
            type="submit"
            :disabled="loading"
        >
            {{ loading ? 'Загрузка' : 'Отправить'}}
        </button>
    </form>    
</template>

<style lang="css">
    @import "tailwindcss";

    .message-controlls {
        @apply flex w-full gap-2 p-5 bg-blue-500 items-end
    }
    .message-controlls__text {
        @apply flex-1 bg-white rounded-xl transition-all resize-none
    }
    .message-controlls__submit {
        @apply bg-gray-100 rounded-xl px-2 py-1 w-32 text-base
         cursor-pointer hover:not-[disabled]:bg-blue-200 transition-all h-10 disabled:text-gray-400
         disabled:cursor-no-drop
    }
 
</style>