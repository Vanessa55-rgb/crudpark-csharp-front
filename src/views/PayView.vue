<template>
  <div>
    <h1>Pays</h1>

    <!-- Lista de pagos -->
    <ul>
      <li v-for="p in pays" :key="p.ID">
        <strong>TicketID:</strong> {{ p.TicketID }} |
        <strong>OperatorID:</strong> {{ p.OperatorID }} |
        <strong>Amount:</strong> ${{ p.Amount.toFixed(2) }} |
        <strong>Method:</strong> {{ p.PayMethod }} | <strong>Date:</strong>
        {{ formatDate(p.DatePay) }}
        <button @click="deletePay(p.ID)">Delete</button>
      </li>
    </ul>

    <!-- Formulario para agregar -->
    <h2>Add Pay</h2>
    <form @submit.prevent="addPay">
      <input
        v-model.number="newPay.TicketID"
        type="number"
        placeholder="Ticket ID"
        required
      />
      <input
        v-model.number="newPay.OperatorID"
        type="number"
        placeholder="Operator ID"
        required
      />
      <input
        v-model.number="newPay.Amount"
        type="number"
        step="0.01"
        placeholder="Amount"
        required
      />
      <input v-model="newPay.PayMethod" placeholder="Pay Method" required />
      <input
        v-model="newPay.DatePay"
        type="datetime-local"
        placeholder="Date Pay"
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
      pays: [],
      newPay: {
        TicketID: 0,
        OperatorID: 0,
        Amount: 0,
        PayMethod: "",
        DatePay: "",
      },
    };
  },
  methods: {
    async fetchPays() {
      try {
        const res = await api.get("/pay");
        this.pays = res.data;
      } catch (err) {
        console.error("Error fetching pays:", err);
      }
    },
    async addPay() {
      try {
        await api.post("/pay", this.newPay);
        this.newPay = {
          TicketID: 0,
          OperatorID: 0,
          Amount: 0,
          PayMethod: "",
          DatePay: "",
        };
        this.fetchPays();
      } catch (err) {
        console.error("Error adding pay:", err);
      }
    },
    async deletePay(id) {
      try {
        await api.delete(`/pay/${id}`);
        this.fetchPays();
      } catch (err) {
        console.error("Error deleting pay:", err);
      }
    },
    formatDate(dateStr) {
      if (!dateStr) return "No Date";
      const date = new Date(dateStr);
      return date.toLocaleString();
    },
  },
  mounted() {
    this.fetchPays();
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
