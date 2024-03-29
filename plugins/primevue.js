import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Checkbox from "primevue/checkbox";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; //optional for column grouping
import Row from "primevue/row"; //optional for row
import Badge from "primevue/badge";
import ProgressBar from "primevue/progressbar";
import Toolbar from "primevue/toolbar";
import RadioButton from "primevue/radiobutton";
import InputNumber from "primevue/inputnumber";
import Timeline from 'primevue/timeline';

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(PrimeVue, { ripple: true });
	nuxtApp.vueApp.component("PrimeBtn", Button);
	nuxtApp.vueApp.component("PrimeModal", Dialog);
	nuxtApp.vueApp.component("PrimeText", InputText);
	nuxtApp.vueApp.component("PrimeSelect", Dropdown);
	nuxtApp.vueApp.component("PrimeCheck", Checkbox);
	nuxtApp.vueApp.component("PrimeDataTable", DataTable);
	nuxtApp.vueApp.component("PrimeCol", Column);
	nuxtApp.vueApp.component("PrimeColGroup", ColumnGroup);
	nuxtApp.vueApp.component("PrimeRow", Row);
	nuxtApp.vueApp.component("PrimeBadge", Badge);
	nuxtApp.vueApp.component("PrimeBar", ProgressBar);
	nuxtApp.vueApp.component("Toolbar", Toolbar);
	nuxtApp.vueApp.component("PrimeRadio", RadioButton);
	nuxtApp.vueApp.component("PrimeNumber", InputNumber);
	nuxtApp.vueApp.component("PrimeTimeLine", Timeline);
});
