import Vue from "vue";
import VueRouter from "vue-router";

import OperatorsView from "../views/OperatorsView.vue";
import VehicleMonthlyView from "../views/VehicleMonthlyView.vue";
import MonthlyView from "../views/MonthlyView.vue";
import RateView from "../views/RateView.vue";
import TicketView from "../views/TicketView.vue";
import PayView from "../views/PayView.vue";
import MembershipPlanView from "../views/MembershipPlanView.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/operators", name: "Operators", component: OperatorsView },
  { path: "/vehicles", name: "VehicleMonthly", component: VehicleMonthlyView },
  { path: "/monthlies", name: "Monthly", component: MonthlyView },
  { path: "/rates", name: "Rate", component: RateView },
  { path: "/tickets", name: "Ticket", component: TicketView },
  { path: "/pays", name: "Pay", component: PayView },
  { path: "/plans", name: "MembershipPlan", component: MembershipPlanView },
  { path: "/", redirect: "/operators" }, // Redirige al inicio
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
