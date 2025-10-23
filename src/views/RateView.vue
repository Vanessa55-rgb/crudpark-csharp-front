<template>
  <div>
    <h1>Rates</h1>

    <!-- Lista de tarifas -->
    <ul>
      <li v-for="r in rates" :key="r.ID">
        Hour: {{ r.BaseValueByHour.toFixed(2) }} | Fraction:
        {{ r.BaseValueByFraction.toFixed(2) }} |
        {{ r.MaxDay !== null ? r.MaxDay.toFixed(2) : "-" }} | TimeHopeMinutes:
        {{ r.TimeHopeMinutes }}
        <button @click="deleteRate(r.ID)">Delete</button>
      </li>
    </ul>

    <!-- Formulario para agregar -->
    <h2>Add Rate</h2>
    <form @submit.prevent="addRate">
      <input
        v-model.number="newRate.BaseValueByHour"
        type="number"
        step="0.01"
        placeholder="Base Value Hour"
        required
      />
      <input
        v-model.number="newRate.BaseValueByFraction"
        type="number"
        step="0.01"
        placeholder="Base Value Fraction"
        required
      />
      <input
        v-model.number="newRate.MaxDay"
        type="number"
        step="0.01"
        placeholder="Max Day"
      />
      <input
        v-model.number="newRate.TimeHopeMinutes"
        type="number"
        placeholder="TimeHopeMinutes"
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
      rates: [],
      newRate: {
        BaseValueByHour: 0,
        BaseValueByFraction: 0,
        MaxDay: null,
        TimeHopeMinutes: 30,
      },
    };
  },
  methods: {
    async fetchRates() {
      try {
        const res = await api.get("/rate");
        this.rates = res.data;
      } catch (err) {
        console.error("Error fetching rates:", err);
      }
    },
    async addRate() {
      try {
        await api.post("/rate", this.newRate);
        this.newRate = {
          BaseValueByHour: 0,
          BaseValueByFraction: 0,
          MaxDay: null,
          TimeHopeMinutes: 30,
        };
        this.fetchRates();
      } catch (err) {
        console.error("Error adding rate:", err);
      }
    },
    async deleteRate(id) {
      try {
        await api.delete(`/rate/${id}`);
        this.fetchRates();
      } catch (err) {
        console.error("Error deleting rate:", err);
      }
    },
  },
  mounted() {
    this.fetchRates();
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
  max-width: 320px;
}
button {
  cursor: pointer;
  padding: 6px 10px;
}
</style>
