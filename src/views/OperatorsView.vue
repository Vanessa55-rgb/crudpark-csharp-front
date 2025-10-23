<template>
  <div>
    <h1>Operators</h1>

    <!-- Lista de operadores -->
    <ul>
      <li v-for="op in operators" :key="op.ID">
        {{ op.Name }} | {{ op.UserName }} | {{ op.Email || "No Email" }} |
        <strong>{{ op.Status ? "Active" : "Inactive" }}</strong>
        <button @click="deleteOperator(op.ID)">Delete</button>
      </li>
    </ul>

    <!-- Formulario para agregar -->
    <h2>Add Operator</h2>
    <form @submit.prevent="addOperator">
      <input v-model="newOperator.Name" placeholder="Name" required />
      <input v-model="newOperator.UserName" placeholder="User Name" required />
      <input v-model="newOperator.Email" placeholder="Email" type="email" />
      <input
        v-model="newOperator.Password"
        placeholder="Password"
        type="password"
        required
      />
      <label>
        <input type="checkbox" v-model="newOperator.Status" /> Active
      </label>
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
import api from "../api/api";

export default {
  data() {
    return {
      operators: [],
      newOperator: {
        Name: "",
        UserName: "",
        Password: "",
        Email: "",
        Status: true,
      },
    };
  },
  methods: {
    async fetchOperators() {
      try {
        const res = await api.get("/operator");
        this.operators = res.data;
      } catch (err) {
        console.error("Error fetching operators:", err);
      }
    },
    async addOperator() {
      try {
        await api.post("/operator", this.newOperator);
        Object.assign(this.newOperator, {
          Name: "",
          UserName: "",
          Password: "",
          Email: "",
          Status: true,
        });
        this.fetchOperators();
      } catch (err) {
        console.error("Error adding operator:", err);
      }
    },
    async deleteOperator(id) {
      try {
        await api.delete(`/operator/${id}`);
        this.fetchOperators();
      } catch (err) {
        console.error("Error deleting operator:", err);
      }
    },
  },
  mounted() {
    this.fetchOperators();
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
