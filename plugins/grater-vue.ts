// plugins/grater-vue.js
import Vue from 'vue'
import * as GraterVue from 'grater-vue/dist/grater-vue.umd'
// light theme (default)
import 'grater-vue/dist/light.min.css'
import 'grater-vue/dist/palette.min.css' // only if you want to use the 'bg', 'color' and 'border' property
import 'grater-vue/dist/grater-vue.css'

Vue.use(GraterVue)
