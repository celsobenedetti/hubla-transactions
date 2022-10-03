<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
const file = ref();

const handleFileUpload = async () => {
    // debugger;
    console.log("selected file", file?.value?.files[0]);
    //Upload to server
};
const handleFileSubmit = async () => {
    const formData = new FormData();
    console.log({ upload: file.value });
    formData.append("file", file.value.files[0]);
    axios.post("http://localhost:3000/transactions/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
</script>

<template>
    <input ref="file" v-on:change="handleFileUpload()" type="file" />
    <button class="btn btn-primary btn-md" @click="handleFileSubmit">Send</button>
</template>
