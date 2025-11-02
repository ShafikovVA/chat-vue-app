<script setup lang="ts">
import { ref, onUpdated } from 'vue';
import Message from '../message/Message.vue';
import type { IMessageProps } from '../message/message.type';

const { messages } = defineProps<{messages: IMessageProps[]}>()
const messageList = ref();

onUpdated(() => {
    messageList.value.scrollTo(0, messageList.value.scrollHeight);
})

</script>

<template>
    <div ref="messageList" class="message-list">
        {{ messages.length === 0 ? 'Начните общение' : '' }}
        <Message v-for="message in messages"
            :self="message.self"
            :time="message.time"
        >
            {{ message.text }}
        </Message>
    </div>
</template>

<style lang="css">
    @import "tailwindcss";

    .message-list {
        @apply p-6 flex flex-col gap-3 flex-1 h-full overflow-auto;
    }
</style>