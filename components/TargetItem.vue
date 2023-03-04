<template>
  <div>
    <ul v-for="budget in data" :key="budget.name">
      <li>
        {{ budget?.targetName }} - {{ budget?.targetAmount }}
      </li>
      <li>
        {{ budget?.expenseName }} - {{ budget?.expenseAmount }}
      </li>
      <li>
        <!-- {{ getPercent() }} -->
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { reactive } from 'vue';
  import { useBudget } from '~~/stores/budgetStore';
  const budgetData = useBudget()

  const data = reactive(budgetData.getBudget)

  defineProps({
    targetName: String,
    targetAmount: Number,
    expenseName: String,
    expenseAmount: Number,
  })

                  // function getPercent () {
                  //   let diference = expenseAmount / targetAmount;
                  //   let percent = diference * 100;
                  //   return `*${ percent } % `;
                  // }

</script>
