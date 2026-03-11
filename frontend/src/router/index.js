import { createRouter, createWebHistory } from 'vue-router'
import PaginaInicio from '../views/paginaInicio.vue'
import KnowUs from '../views/knowUs.vue'
import Experiences from '../views/experiences.vue'
import ContacUs from '../views/contactUs.vue'
import FAQ from '../views/faq.vue'
import LoginView from '../views/loginView.vue'
import CreateAccount from '../views/createAccount.vue'
import ForgotPassword from '../views/forgotPassword.vue'
import ModalPassword from '../views/modalPassword.vue'
import SectionAcademy from '../views/sectionAcademy.vue'
import SectionHealth from '../views/sectionHealth.vue'
import SectionFinances from '../views/sectionFinance.vue'
import SectionLeisure from '../views/sectionLeisure.vue'
import Calendar from '../views/calendario.vue'
import CreateAcademy from '../views/createSecAca.vue'
import CreateHealth from '../views/createSecSal.vue'
import CreateFinance from '../views/createSecFin.vue'
import CreateLeisure from '../views/createSecLei.vue'
import EditAcademy from '../views/editSecAca.vue'
import EditHealth from '../views/editSecSal.vue'
import EditFinance from '../views/editSecFin.vue'
import EditLeisure from '../views/editSecLei.vue'


const routes = [
  { path: '/', component: LoginView}, // La vista de Login
  { path: '/home', component: PaginaInicio }, // La vista de Home/Sidebar principal
  { path: '/knowUs', component: KnowUs}, //  Conocenos
  { path: '/experiences', component: Experiences}, // Experiencias
  { path: '/contactUs', component: ContacUs}, // Contactanos
  { path: '/faq', component: FAQ}, // FAQ
  { path: '/createAccount', component: CreateAccount }, // La vista de Home/Sidebar principal
  { path: '/forgotPassword', component: ForgotPassword }, // La vista de recuperar contraseña
  { path: '/modalPassword', component: ModalPassword }, // La vista del modal recuperar contraseña
  { path: '/estudio', component: SectionAcademy }, // La seccion de estudio
  { path: '/salud', component: SectionHealth }, // La seccion de salud
  { path: '/finanzas', component: SectionFinances }, // La seccion de finanzas
  { path: '/tiempo-libre', component: SectionLeisure }, // La seccion de tiempo libre
  { path: '/calendario', component: Calendar }, // La seccion de tiempo libre
  { path: '/createAcademy', component: CreateAcademy }, // Crear registro academico
  { path: '/createHealth', component: CreateHealth }, // Crear registro Salud
  { path: '/createFinance', component: CreateFinance }, // Crear registro Finanzas
  { path: '/createLeisure', component: CreateLeisure }, // Crear registro Tiempo libre
  { path: '/editAcademy/:id', name: 'EditAcademy', component: EditAcademy },// Editar registro academico
  { path: '/editHealth/:id', name: 'EditHealth', component: EditHealth  },// Editar registro salud
  { path: '/editFinance/:id', name: 'EditFinance', component: EditFinance },// Editar registro finanzas
  { path: '/editLeisure/:id', name: 'EditLeisure', component: EditLeisure },// Editar registro tiempo libre
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
