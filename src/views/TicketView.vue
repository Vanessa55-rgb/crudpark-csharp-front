<template>
  <div>
    <h1>Tickets</h1>

    <!-- Lista de tickets -->
    <ul>
      <li v-for="t in tickets" :key="t.ID">
        Plate: {{ t.Plate }} | Type: {{ t.Type }} | Closed:
        {{ t.Closed ? "Yes" : "No" }} | OperatorID: {{ t.OperatorID }} | Start:
        Start: {{ formatDate(t.DateStart) }} |
        {{ t.DateEnd ? formatDate(t.DateEnd) : "-" }}
        <button @click="deleteTicket(t.ID)">Delete</button>
      </li>
    </ul>

    <!-- Formulario para agregar -->
    <h2>Add Ticket</h2>
    <form @submit.prevent="addTicket">
      <input v-model="newTicket.Plate" placeholder="Plate" required />
      <input v-model="newTicket.Type" placeholder="Type" required />
      <input
        v-model="newTicket.DateStart"
        type="date"
        placeholder="Start Date"
        required
      />
      <input v-model="newTicket.DateEnd" type="date" placeholder="End Date" />
      <input
        v-model.number="newTicket.OperatorID"
        type="number"
        placeholder="Operator ID"
        required
      />
      <label>
        <input type="checkbox" v-model="newTicket.Closed" /> Closed
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
      tickets: [],
      newTicket: {
        Plate: "",
        Type: "",
        DateStart: "",
        DateEnd: null,
        OperatorID: 0,
        Closed: false,
      },
    };
  },
  methods: {
    async fetchTickets() {
      try {
        const res = await api.get("/ticket");
        this.tickets = res.data;
      } catch (err) {
        console.error("Error fetching tickets:", err);
      }
    },
    async addTicket() {
      try {
        await api.post("/ticket", this.newTicket);
        this.newTicket = {
          Plate: "",
          Type: "",
          DateStart: "",
          DateEnd: null,
          OperatorID: 0,
          Closed: false,
        };
        this.fetchTickets();
      } catch (err) {
        console.error("Error adding ticket:", err);
      }
    },
    async deleteTicket(id) {
      try {
        await api.delete(`/ticket/${id}`);
        this.fetchTickets();
      } catch (err) {
        console.error("Error deleting ticket:", err);
      }
    },
    formatDate(dateStr) {
      if (!dateStr) return "-";
      const date = new Date(dateStr);
      return date.toLocaleDateString();
    },
  },
  mounted() {
    this.fetchTickets();
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
