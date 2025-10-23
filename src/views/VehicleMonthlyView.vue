<template>
  <div>
    <h1>Vehicle Monthly</h1>

    <!-- Lista de vehículos -->
    <ul>
      <li v-for="v in vehicles" :key="v.ID">
        {{ v.Plate }} | {{ v.Titularname }} | {{ v.Email || "No Email" }}
        <button @click="deleteVehicle(v.ID)">Delete</button>
      </li>
    </ul>

    <!-- Formulario para agregar -->
    <h2>Add Vehicle</h2>
    <form @submit.prevent="addVehicle">
      <input v-model="newVehicle.Plate" placeholder="Plate" required />
      <input
        v-model="newVehicle.Titularname"
        placeholder="Titular Name"
        required
      />
      <input v-model="newVehicle.Email" placeholder="Email" />
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
import api from "../api/api";

export default {
  data() {
    return {
      vehicles: [],
      newVehicle: { Plate: "", Titularname: "", Email: "" },
    };
  },
  methods: {
    async fetchVehicles() {
      try {
        const res = await api.get("/vehiclemonthly");
        this.vehicles = res.data;
      } catch (err) {
        console.error("Error fetching vehicles:", err);
      }
    },
    async addVehicle() {
      try {
        await api.post("/vehiclemonthly", this.newVehicle);
        this.newVehicle = { Plate: "", Titularname: "", Email: "" };
        this.fetchVehicles();
      } catch (err) {
        console.error("Error adding vehicle:", err);
      }
    },
    async deleteVehicle(id) {
      try {
        await api.delete(`/vehiclemonthly/${id}`);
        this.fetchVehicles();
      } catch (err) {
        console.error("Error deleting vehicle:", err);
      }
    },
  },
  mounted() {
    this.fetchVehicles();
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
