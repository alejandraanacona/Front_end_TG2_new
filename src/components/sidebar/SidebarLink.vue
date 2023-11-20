<template>
    
    <router-link :to="to" class="link" :class="{ active: isActive }" @click="isActive">
        <i class="icon" :class="icon"/>
        <transition name="fade">
            <span v-if="!collapsed">
                <slot/>
            </span>
        </transition>
    </router-link>
</template>

<script>
import { computed } from 'vue'
//import { useRoute } from 'vue-router';
import { collapsed } from './state';

export default {
    props: {
        to: { type: String, required: true },
        icon: { type: String, required: true }
    },
    setup(props) {
        const route = getRoute()
        const isActive = computed(() => route.path === props.to)
        return { isActive, collapsed }
    }
}
</script>

<style scoped>
.fade-enter-active,

.fade-leave-active{
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to{
    opacity: 0.5;
}

.link {
    display: flex;
    align-items: center;
    text-align: left;
    padding-left: 30px;

    cursor: pointer;
    position: relative;
    font-weight: 500;
    user-select: none;
    font-size: large;

    margin: 0.1em 0.1;
    padding: 0.5em;
    border-radius: 2.5em;
    height: 1.5em;

    color: rgba(255, 252, 252, 0.696);
    text-decoration: none;

}

.link:hover {
    color:rgb(253, 250, 250);
}

.link:active {
  background-color: rgb(199, 218, 24); /* Color de fondo cuando el enlace está activo */
  color:rgb(253, 250, 250); /* Color de texto cuando el enlace está activo */
  font-weight: bold; /* Fuente en negrita cuando el enlace está activo */
}

.link.icon {
    flex-shrink: 0;
    width: 50px;
    margin-right: 20px;
}

.link.active:before{
    content: '';
    width: 4px;
    height: 100%;
    background-color:rgb(253, 250, 250);
    position: absolute;
    top: 5%;
    left:-1px;
}
</style>