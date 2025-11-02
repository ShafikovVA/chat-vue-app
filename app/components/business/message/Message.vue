<script setup lang="ts">
import type { IMessageProps } from './message.type';

    const {self, time} = defineProps<Omit<IMessageProps, 'text'>>();

    const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

</script>

<template>
    <div class="message-container" :class="{'self': self}">
        <span class="message__date">{{formatTime(time)}}</span>
        <article class="message">
            <slot></slot>
        </article>
    </div>

</template>

<style lang="css">
    @import "tailwindcss";

    .message {
        @apply w-fit max-w-xs h-fit rounded-4xl text-xl bg-blue-100 flex px-4 py-2;
    }

    .message__date {
        @apply text-xs pb-1
    }

    .message-container {
        @apply flex gap-2 items-end 
    }
    .self.message-container {
        @apply self-end flex-row-reverse 
    }

    .self .message {
        @apply bg-cyan-100;
    }

</style>