<script setup lang="ts">
import { CountryService } from '@/services/CountryService';
import { NodeService } from '@/services/NodeService';
import { onMounted, ref } from 'vue';

const floatValue = ref(null);
const autoValue = ref(null);
const selectedAutoValue = ref(null);
const autoFilteredValue = ref([]);
const calendarValue = ref(null);
const inputNumberValue = ref(null);
const sliderValue = ref(50);
const ratingValue = ref(null);
const colorValue = ref('#1976D2');
const radioValue = ref(null);
const checkboxValue = ref([]);
const switchValue = ref(false);
const listboxValues = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
]);
const listboxValue = ref(null);
const dropdownValues = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
]);
const dropdownValue = ref(null);
const multiselectValues = ref([
  { name: 'Australia', code: 'AU' },
  { name: 'Brazil', code: 'BR' },
  { name: 'China', code: 'CN' },
  { name: 'Egypt', code: 'EG' },
  { name: 'France', code: 'FR' },
  { name: 'Germany', code: 'DE' },
  { name: 'India', code: 'IN' },
  { name: 'Japan', code: 'JP' },
  { name: 'Spain', code: 'ES' },
  { name: 'United States', code: 'US' }
]);

const multiselectValue = ref(null);
const toggleValue = ref(false);
const selectButtonValue = ref(null);
const selectButtonValues = ref([{ name: 'Option 1' }, { name: 'Option 2' }, { name: 'Option 3' }]);
const knobValue = ref(50);
const inputGroupValue = ref(false);
const treeSelectNodes = ref(null);
const selectedNode = ref(null);

onMounted(() => {
  CountryService.getCountries().then((data) => (autoValue.value = data));
  NodeService.getTreeNodes().then((data) => (treeSelectNodes.value = data));
});

function searchCountry(event) {
  setTimeout(() => {
    if (!event.query.trim().length) {
      autoFilteredValue.value = [...autoValue.value];
    } else {
      autoFilteredValue.value = autoValue.value.filter((country) => {
        return country.name.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }
  }, 250);
}
</script>

<template>
  <Fluid class="flex flex-col md:flex-row gap-8">
    <div class="md:w-1/2">
      <div class="card flex flex-col gap-4">
        <div class="font-semibold text-xl">Datos Generales</div>

        <div class="font-semibold text-xm">Perfil</div>
        <IconField>
          <InputIcon class="pi pi-user" />
          <InputText type="text" placeholder="Username" :disabled="true"/>
        </IconField>
        <IconField>
          <InputIcon class="pi pi-google" />
          <InputText type="text" placeholder="Email" :disabled="true"/>
        </IconField>
        <IconField>
          <InputIcon class="pi pi-name" />
          <InputText type="text" placeholder="First Name"/>
        </IconField>
        <IconField>
          <InputIcon class="pi pi-name" />
          <InputText type="text" placeholder="Last Name"/>
        </IconField>
        

        <div class="font-semibold text-xm">Birth date</div>
        <DatePicker :showIcon="true" :showButtonBar="true" v-model="calendarValue"></DatePicker>

      </div>

      <!-- Estadísticas -->

      <div class="card flex flex-col gap-4">
        <div class="font-semibold text-xl">Estadísticas</div>
        <InputText v-model.number="sliderValue" />
        <Slider v-model="sliderValue" />

        <div class="flex flex-row mt-6">
          <div class="flex flex-col gap-4 w-1/2">
            <div class="font-semibold text-xl">Rating</div>
            <Rating v-model="ratingValue" />
          </div>
        </div>

        <div class="font-semibold text-xl">Carga de trabajo</div>
        <Knob v-model="knobValue" :step="10" :min="-50" :max="50" valueTemplate="{value}%" />
      </div>

    </div>

    <!-- 2do SIDE -->
    <div class="md:w-1/2">
      <div class="card flex flex-col gap-4">
        <div class="font-semibold text-xl">RadioButton</div>
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex items-center">
            <RadioButton id="option1" name="option" value="Chicago" v-model="radioValue" />
            <label for="option1" class="leading-none ml-2">Chicago</label>
          </div>
          <div class="flex items-center">
            <RadioButton id="option2" name="option" value="Los Angeles" v-model="radioValue" />
            <label for="option2" class="leading-none ml-2">Los Angeles</label>
          </div>
          <div class="flex items-center">
            <RadioButton id="option3" name="option" value="New York" v-model="radioValue" />
            <label for="option3" class="leading-none ml-2">New York</label>
          </div>
        </div>

        <div class="font-semibold text-xl">Checkbox</div>
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex items-center">
            <Checkbox id="checkOption1" name="option" value="Chicago" v-model="checkboxValue" />
            <label for="checkOption1" class="ml-2">Chicago</label>
          </div>
          <div class="flex items-center">
            <Checkbox id="checkOption2" name="option" value="Los Angeles" v-model="checkboxValue" />
            <label for="checkOption2" class="ml-2">Los Angeles</label>
          </div>
          <div class="flex items-center">
            <Checkbox id="checkOption3" name="option" value="New York" v-model="checkboxValue" />
            <label for="checkOption3" class="ml-2">New York</label>
          </div>
        </div>

        <div class="font-semibold text-xl">ToggleSwitch</div>
        <ToggleSwitch v-model="switchValue" />
      </div>
      
      
      

      
    </div>
  </Fluid>

  
</template>
