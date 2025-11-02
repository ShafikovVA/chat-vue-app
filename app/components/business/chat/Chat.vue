<script setup lang="ts">
import { ref } from 'vue';
import type { IMessageProps } from '../message/message.type';
import MessageControlls from '../messageControlls/MessageControlls.vue';
import MessageList from '../messageList/MessageList.vue';


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
    
   
    const response = await $fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({
            message,
        })
    }).finally(() => {
        loading.value = false;
    });

    console.log(response);

    // console.log(response.value);
    
    // if(response) {
    //     messages.value.push({
    //         time: new Date(),
    //         text: response.value.text ?? '',
    //     });
    // }
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