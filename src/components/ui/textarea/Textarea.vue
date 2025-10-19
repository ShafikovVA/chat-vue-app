<script setup lang="ts">
    import type { ITextareaProps } from './textarea.type';
    import { useTemplateRef, watch, onMounted, nextTick } from 'vue';

    const { modelValue, className, onPressEnter, disabled } = defineProps<ITextareaProps>();
    const emit = defineEmits(['update:modelValue']);
    const MAX_HEIGHT = 300;
    const MIN_HEIGHT = 40;


    const textareaRef = useTemplateRef<HTMLTextAreaElement>('textareaRef');
    
    const resize = () => {
        if (textareaRef.value) {
            textareaRef.value.style.height = 'auto';
            textareaRef.value.style.height = `${Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, textareaRef.value.scrollHeight))}px`;
        }
    };

    watch(() => modelValue, () => {
        nextTick(resize);
    });

    onMounted(() => {
        resize();
    });

    const handleInput = (event: Event) => {
        emit('update:modelValue', (event.target as HTMLTextAreaElement).value);
        resize();
    };

    const handleKeyPress = (event: KeyboardEvent) => {
        if(onPressEnter) {
            if (event.key === 'Enter') {
                if (event.shiftKey) {
                    // Разрешить перенос строки по умолчанию
                    return;
                } else {
                    event.preventDefault();
                    onPressEnter(event)
                }
            }
        }
    }
</script>

<template>
  <textarea 
            ref="textareaRef"
            class="message-controlls__text"
            :class="className"
            name="message"
            placeholder="Type message" 
            :value="modelValue"
            @input="handleInput"
            @keypress="handleKeyPress"
            rows="1"
            :disabled="disabled"
            ></textarea>
</template>

<style lang="css">
    @import 'tailwindcss';
    
    textarea {
        @apply flex-1 text-lg bg-white rounded-xl px-3 py-1 transition-all resize-none box-border 
        disabled:text-gray-400 disabled:cursor-no-drop disabled:bg-gray-100
    }
</style>