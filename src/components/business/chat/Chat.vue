<script setup lang="ts">
import { ref } from 'vue';
import type { IMessageProps } from '../message/message.type';
import MessageControlls from '../messageControlls/MessageControlls.vue';
import MessageList from '../messageList/MessageList.vue';

const messages = ref<IMessageProps[]>([
    {
        time: new Date(),
        text: 'привет'
    },
    {
        time: new Date(),
        self: true,
        text: 'привет'
    },
    {
        time: new Date(),
        text: 'Как дела?'
    },
    {
        time: new Date(),
        self: true,
        text: 'Да ок'
    },
    {
        time: new Date(),
        self: true,
        text: 'Ты как?'
    },
    {
        time: new Date(),
        text: 'Да ок'
    },
]);

const onSubmit = (message: string) => {
  if(message === '') return;
  messages.value.push({
    time: new Date(),
    self: true,
    text: message,
  });
}

</script>

<template>
    <div class="chat">
        <MessageList :messages="messages" />
        <MessageControlls :onSubmit="onSubmit" />
    </div>
</template>

<style lang="css">
  @import "tailwindcss";
    .chat {
      @apply flex flex-col w-full bg-white rounded-2xl overflow-hidden;  
    }
</style>