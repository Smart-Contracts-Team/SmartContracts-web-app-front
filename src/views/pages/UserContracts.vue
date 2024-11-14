<script setup lang="ts">
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast'
import { onBeforeMount, ref } from 'vue';
import { ContractService } from '@/services/ContractService';
import type { IContract } from '@/interfaces/Contract';
import { UserService } from '@/services/UserService';
import { storageBaseUrl } from '@/config/firebaseConfig'

const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const toast = useToast()
const expandedRows = ref<number[]>([]);
const loadingList = ref(false)
const photoLoaded = ref(false)
const userId = Number(localStorage.getItem('userId') ?? 0);
const registeredContracts = ref<IContract[]>([])

onBeforeMount(async () => {
    await loadContracts()
});

async function loadContracts() {
    try {
        loadingList.value = true
        const response = await ContractService.getContractsByInfluencerId(userId)
        registeredContracts.value = response

        registeredContracts.value = await Promise.all(response.map(async (contract) => {
            const business = await UserService.getUserById(contract.businessId);
            return {
                ...contract,
                businessName: business.firstName,
                businessPhoto: business.photo
            };
        }));
        photoLoaded.value = true
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error fetching services',
            life: 3000
        })
    } finally {
        loadingList.value = false
    }
}

function expandAll() {
    expandedRows.value = registeredContracts.value.map(contract => contract.id);
}

function collapseAll() {
    expandedRows.value = [];
}

function formatCurrency(value: number) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

const getStatusLabel = (status: string) => {
    switch (status) {
        case 'active':
            return { severity: 'success', label: 'Active' };
        case 'pending':
            return { severity: 'warn', label: 'Pending' };
        case 'cancel':
            return { severity: 'danger', label: 'Cancel' };
        default:
            return { severity: 'secondary', label: 'Undefined' }; // Valor por defecto
    }
};
//abierto, pendiente, en proceso, cerrado
</script>

<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Row Expansion</div>
        <!-- <DataTable v-model:expandedRows="expandedRows" :value="registeredContracts" dataKey="id"
            tableStyle="min-width: 60rem" stripedRows paginator :rows="10" :rowsPerPageOptions="[10, 20, 50]"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"></DataTable> -->
        <DataTable v-model:expandedRows="expandedRows" :value="registeredContracts" dataKey="id" removableSort
            :filters="filters" tableStyle="min-width: 60rem" stripedRows paginator :rows="10"
            :rowsPerPageOptions="[10, 20, 50]">
            <template #header>
                <div class="flex justify-between">
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Search..." />
                    </IconField>
                    <div class="flex flex-wrap justify-end gap-2">
                        <Button text icon="pi pi-plus" label="Expand All" @click="expandAll" />
                        <Button text icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
                    </div>
                </div>
            </template>
            <Column expander style="width: 2rem" />
            <Column field="title" header="Title" sortable></Column>
            <Column header="Business" field="businessName" sortable>
                <template #body="{ data }">
                    <div class="flex items-center gap-2">
                        <img v-if="photoLoaded" :alt="data.businessName" :src="`${storageBaseUrl}` + data.businessPhoto"
                            style="width: 32px; height: 32px;" />
                        <!-- Si la imagen aún no ha cargado, mostramos el skeleton -->
                        <Skeleton v-else shape="circle" size="32" />
                        <span>{{ data.businessName }}</span>
                    </div>
                </template>
            </Column>
            <Column field="price" header="Price" sortable>
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.price) }}
                </template>
            </Column>
            <Column field="startDate" header="Start Date" sortable></Column>
            <Column field="finalDate" header="Final Date" sortable></Column>
            <Column field="type" header="Type" sortable></Column>
            <Column field="status" header="Status" sortable style="min-width: 12rem">
                <template #body="slotProps">
                    <Tag :value="getStatusLabel(slotProps.data.status).label"
                        :severity="getStatusLabel(slotProps.data.status).severity" />
                </template>
            </Column>
            <template #expansion="slotProps">
                <div class="p-4">
                    <h5 class="font-bold text-l mb-2">Contract description:</h5>
                    <p class="mb-4">{{ slotProps.data.description }}</p>
                    <h5 class="font-bold text-l mb-2">Services included:</h5>
                    <DataTable :value="slotProps.data.services" removableSort>
                        <Column field="name" header="Name" sortable></Column>
                        <Column field="description" header="Description" sortable></Column>
                        <Column field="price" header="Price" sortable>
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.price) }}
                            </template>
                        </Column>
                        <Column field="stars" header="Rating" sortable style="min-width: 12rem">
                            <template #body="slotProps">
                                <Rating :modelValue="slotProps.data.stars" :readonly="true" />
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </template>
        </DataTable>
    </div>
</template>