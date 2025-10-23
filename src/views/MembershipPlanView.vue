<template>
  <div>
    <h1>Membership Plans</h1>

    <!-- Lista de planes -->
    <ul>
      <li v-for="p in plans" :key="p.ID">
        {{ p.Name }} - {{ p.Description }} - ${{ p.Price }}
        <button @click="deletePlan(p.ID)">Delete</button>
      </li>
    </ul>

    <h2>Add Plan</h2>

    <!-- Formulario para agregar -->
    <form @submit.prevent="addPlan">
      <input v-model="newPlan.Name" placeholder="Name" required />
      <input v-model="newPlan.Description" placeholder="Description" required />
      <input
        v-model.number="newPlan.Price"
        type="number"
        step="0.01"
        placeholder="Price"
        required
      />
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
import api from "../api/api";

export default {
  data() {
    return {
      plans: [],
      newPlan: { Name: "", Description: "", Price: 0 },
    };
  },
  methods: {
    async fetchPlans() {
      try {
        const res = await api.get("/membershipplan");
        this.plans = res.data;
      } catch (err) {
        console.error("Error fetching plans:", err);
      }
    },
    async addPlan() {
      try {
        await api.post("/membershipplan", this.newPlan);
        this.newPlan = { Name: "", Description: "", Price: 0 };
        this.fetchPlans();
      } catch (err) {
        console.error("Error adding plan:", err);
      }
    },
    async deletePlan(id) {
      try {
        await api.delete(`/membershipplan/${id}`);
        this.fetchPlans();
      } catch (err) {
        console.error("Error deleting plan:", err);
      }
    },
  },
  mounted() {
    this.fetchPlans();
  },
};
</script>

<style scoped>
h1,
h2 {
  margin-bottom: 10px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 6px;
}
form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 300px;
}
button {
  cursor: pointer;
  padding: 5px 10px;
}
</style>
