<script setup lang="ts">
import ModalAlert from "../components/ModalAlert.vue";

import { ref } from "vue";
import { useRouter } from "vue-router";
import { ZodObject } from "zod";
import { usePostServer } from "../services/api";

import { IForm } from "../interfaces";
import { signInSchema, validateSignForm } from "../services/validation";
import { useStore } from "../store";

const router = useRouter();
const store = useStore();

if (store.getters.sessionToken) {
    router.push("/");
}

const props = defineProps({
    isSignUp: Boolean,
    formSchema: {
        type: ZodObject<IForm>,
        default: {},
    },
});

const formInput = ref({
    username: "",
    password: "",
});

const modalAlert = ref({
    title: "",
    content: "",
});

const endpoint = "auth" + `${props.isSignUp ? "/signup" : "/signin"}`;
const { execute, isLoading } = usePostServer(endpoint, { data: formInput.value });

const closeAlert = () => (modalAlert.value.content = "");
const activateAlert = (title: string, content: string) => (modalAlert.value = { title, content });

const handleSubmit = async () => {
    const formErrors = validateSignForm(signInSchema, formInput.value);
    if (formErrors) return activateAlert("Invalid form input", formErrors);

    const { data, error } = await execute();

    if (error.value) {
        return activateAlert(
            error.value.response?.statusText || "Something went wrong",
            error.value.response?.data?.message || ":(",
        );
    }

    const { token } = data.value;
    store.commit("setToken", token);
    router.push("/");
};
</script>

<template>
    <h1 class="my-8 text-4xl font-bold text-primary">Hubla</h1>
    <div v-if="isLoading">Loading...</div>
    <form
        v-else
        @submit.prevent="handleSubmit"
        action="#"
        class="flex flex-col gap-3 justify-center px-12 pt-7 pb-5 w-10/12 rounded-xl shadow h-fit bg-light shadow-gray-900"
    >
        <div class="w-full">
            <label for="username" class="mx-1 text-lg font-bold text-primary">Username</label>
            <input
                v-model="formInput.username"
                type="text"
                placeholder="Username"
                name="username"
                class="p-2 w-full rounded-lg border shadow-sm focus:ring-2 border-primary text-dark focus:ring-primary focus:border-secondary focus:ouline-none"
            />
        </div>

        <div class="w-full">
            <label for="password" class="mx-1 text-lg font-bold text-primary">Password</label>
            <input
                v-model="formInput.password"
                type="password"
                placeholder="Password"
                name="password"
                class="p-2 w-full rounded-lg border shadow-sm focus:ring-2 border-primary text-dark focus:ring-primary focus:border-secondary focus:ouline-none"
            />
        </div>

        <button
            class="p-2 my-3 mx-auto w-1/2 font-bold rounded-xl border shadow shadow-gray-900 text-primary border-primary"
        >
            {{ props.isSignUp ? "Sign up" : "Login" }}
        </button>
    </form>
    <h1
        @click="router.push(`${props.isSignUp ? '/signin' : '/signup'}`)"
        class="p-2 underline cursor-pointer text-primary underline-offset-4"
    >
        {{ props.isSignUp ? "Have an account? Sign in." : "Dont have an account? Sign up." }}
    </h1>
    <ModalAlert
        v-if="modalAlert.content"
        :title="modalAlert.title"
        :content="modalAlert.content"
        @close-modal-button="closeAlert"
        @close-modal-x="closeAlert"
    />
</template>
