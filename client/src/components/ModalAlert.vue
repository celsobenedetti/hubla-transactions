<script setup lang="ts">
const props = defineProps({
    title: String,
    content: String,
    buttonText: String,
});
const emit = defineEmits(["close-modal-button", "close-modal-x"]);
</script>

<template>
    <div
        @click="emit('close-modal-x')"
        class="flex fixed top-0 z-20 justify-center items-center p-6 w-screen h-full rounded-xl bg-tr-dark"
    >
        <div
            @click="(e) => e.stopPropagation()"
            class="flex bg-primary-dark relative flex-col justify-around items-center p-4 rounded-xl border border-dark min-w-[250px]"
        >
            <h1 class="mt-4 font-bold">{{ props.title }}</h1>
            <p class="text-center whitespace-pre-line">{{ props.content }}</p>
            <button
                @click="emit('close-modal-button')"
                class="py-1 px-10 my-4 font-bold rounded-lg border shadow-sm text-primary border-dark shadow-gray-900"
            >
                {{ props.buttonText || "Ok" }}
            </button>
        </div>
    </div>
</template>
