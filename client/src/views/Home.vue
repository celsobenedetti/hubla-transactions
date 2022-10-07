<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { computed } from "@vue/reactivity";

import { useStore } from "../store";
import { useGetServer, usePostServer, useDeleteServer } from "../services/api";
import ModalAlert from "../components/ModalAlert.vue";

const formData = new FormData();
const file = ref();
const hasFile = ref(false);

const router = useRouter();
const store = useStore();
const sessionToken = store.getters.sessionToken;

if (!sessionToken) {
    router.push("/signin");
}

const modalAlert = ref({
    title: "",
    content: "",
});

const closeAlert = () => (modalAlert.value.content = "");
const activateAlert = (title: string, content: string) => (modalAlert.value = { title, content });

const {
    data,
    execute: getTransactions,
    isLoading: isLoadingGet,
} = useGetServer("transactions", { immediate: false, token: sessionToken });

if (sessionToken) {
    getTransactions();
}

const {
    execute: postFile,
    isLoading: isLoadingPost,
    error: fileUploadError,
} = usePostServer("transactions/upload", {
    token: sessionToken,
    headers: {
        "Content-Type": "multipart/form-data",
    },
    data: formData,
});

const deleteTransaction = async (id: string) => {
    await useDeleteServer(`transactions/${id}`, { token: sessionToken, immediate: true });
    getTransactions();
};

const isLoading = computed(() => isLoadingGet.value || isLoadingPost.value);

const handleUpload = () => (hasFile.value = true);
const handleFileSubmit = async () => {
    if (!hasFile.value) return;

    formData.delete("file");
    formData.append("file", file.value.files[0]);

    await postFile();

    if (fileUploadError.value?.response?.data?.error) {
        const { error, message } = fileUploadError.value?.response?.data;
        activateAlert(error, message);
        console.log({ err: fileUploadError.value?.response?.data.error });
    } else {
        getTransactions();
    }
};

const selectedVendorId = ref(undefined);
const vendorTransactions = computed(() => {
    const transactions = data.value?.filter((t: any) => t.vendorId === selectedVendorId.value);
    const total = transactions.reduce((acc: number, t: any) => {
        if (t.type == 3) return acc - t.value;
        else return acc + t.value;
    }, 0);
    return { transactions, total };
});
const clearSelection = () => (selectedVendorId.value = undefined);

const getTransactionType = (type: number) => {
    if (type == 1) return "Producer Sale";
    if (type == 2) return "Afiliate Sale";
    if (type == 3) return "Commission Payment";
    return "Commission Received";
};

const logOut = () => {
    store.commit("logUserOut");
    router.push("/signin");
};
</script>

<template>
    <div v-if="isLoading">Loading...</div>
    <div
        v-else
        class="relative w-full h-full min-h-screen flex flex-col items-center justify-center"
    >
        <button @click="logOut" class="btn btn-warning btn-xs absolute top-3 right-3">
            Logout
        </button>
        <h1 class="text-2xl font-bold my-4">Hubla Transactions</h1>
        <div class="flex my-4 gap-4 w-full justify-center">
            <h2 class="text-md font-bold">Upload transaction file:</h2>
            <input ref="file" @change="handleUpload" type="file" />

            <button v-if="hasFile" class="btn btn-sm btn-primary" @click="handleFileSubmit">
                Send
            </button>
            <button v-else class="btn-disabled">Send</button>
        </div>
        <div v-if="data?.length" class="w-full min-h-[80vh]">
            <table class="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Vendor</th>
                        <th>Product</th>
                        <th>Type</th>
                        <th>Value</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody v-if="!selectedVendorId">
                    <tr v-for="transaction in data">
                        <th>{{ transaction.id }}</th>
                        <th
                            @click="selectedVendorId = transaction.vendorId"
                            class="hover:text-primary hover:cursor-pointer"
                        >
                            {{ transaction.vendor.name }}
                        </th>
                        <th>{{ transaction.product.name }}</th>
                        <th>{{ getTransactionType(transaction.type) }}</th>
                        <th :class="transaction.type == 3 ? 'text-red-400' : 'text-primary'">
                            {{ transaction.value / 100 }}
                        </th>
                        <th
                            title="Delete"
                            @click="deleteTransaction(transaction.id)"
                            class="text-2xl cursor-pointer font-bold text-red-400"
                        >
                            X
                        </th>
                    </tr>
                </tbody>

                <tbody v-else>
                    <tr v-for="transaction in vendorTransactions.transactions">
                        <th>{{ transaction.id }}</th>
                        <th
                            @click="selectedVendorId = transaction.vendorId"
                            class="hover:text-primary hover:cursor-pointer"
                        >
                            {{ transaction.vendor.name }}
                        </th>
                        <th>{{ transaction.product.name }}</th>
                        <th>{{ getTransactionType(transaction.type) }}</th>
                        <th :class="transaction.type == 3 ? 'text-red-400' : 'text-primary'">
                            {{ transaction.value / 100 }}
                        </th>
                        <th
                            @click="deleteTransaction(transaction.id)"
                            class="text-2xl cursor-pointer font-bold text-red-400"
                        >
                            X
                        </th>
                    </tr>

                    <tr>
                        <th>Total</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th :class="vendorTransactions.total < 0 ? 'text-red-400' : 'text-primary'">
                            {{ vendorTransactions.total / 100 }} R$
                        </th>
                        <th
                            @click="clearSelection"
                            v-if="selectedVendorId"
                            class="font-bold cursor-pointer text-red-400"
                        >
                            clear
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="my-4">No transactions found, you can upload a file above</div>
    </div>

    <ModalAlert
        v-if="modalAlert.content"
        :title="modalAlert.title"
        :content="modalAlert.content"
        @close-modal-button="closeAlert"
        @close-modal-x="closeAlert"
    />
</template>
