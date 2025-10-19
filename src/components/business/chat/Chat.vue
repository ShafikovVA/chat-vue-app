<script setup lang="ts">
import { ref } from 'vue';
import type { IMessageProps } from '../message/message.type';
import MessageControlls from '../messageControlls/MessageControlls.vue';
import MessageList from '../messageList/MessageList.vue';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const loading = ref<boolean>(false);

const messages = ref<IMessageProps[]>([]);

const onSubmit = async (message: string) => {
    if(message === '') return;

    messages.value.push({
        time: new Date(),
        self: true,
        text: message,
    });

    loading.value = true;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
    }).finally(() => {
        loading.value = false;
    });
    
    console.log(response.text);

    if(response) {
        messages.value.push({
        time: new Date(),
        text: response.text ?? '',
    });
    }

 
}

</script>

<template>
    <div class="chat">
        <MessageList :messages="messages" />
        <MessageControlls :onSubmit="onSubmit" :loading="loading" />
    </div>
</template>

<style lang="css">
  @import "tailwindcss";
    .chat {
      @apply flex flex-col w-full bg-white rounded-2xl overflow-hidden;  
    }
</style>