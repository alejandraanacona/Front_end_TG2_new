<template>
    
    <router-link :to="to" class="link" :class="{ active: isActive }" @click="setActive">
        <i class="icon" :class="icon"/>
        <transition name="fade">
            <span v-if="!collapsed">
                <slot/>
            </span>
        </transition>
    </router-link>
</template>

<script>
import { computed,ref } from 'vue'
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
        const collapsed = ref(false);

        const setActive = () => {
            collapsed.value = !collapsed.value;
            linkColor.value = isActive.value ? 'white' : 'rgba(255, 252, 252, 0.696)'; 
        };

        return { isActive, collapsed, setActive,linkColor  };
    }
}
</script>

<style scoped>
.fade-enter-active,

.fade-leave-active{
    transition: opacity 0.1s;
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

    color: rgba(240, 232, 232, 0.696);
    text-decoration: none;

}

.link:hover {
    color:rgb(4, 11, 51);
}

.link:active {
  background-color: rgb(2, 56, 93); /* Color de fondo cuando el enlace está activo */
  color:rgb(34, 83, 114); /* Color de texto cuando el enlace está activo */
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
    background-color:rgb(255, 255, 255);
    position: absolute;
    top: 5%;
    left:-1px;
}
.link.active:after{
    content: '';
    width: 4px;
    height: 100%;
    background-color:rgb(0, 0, 0);
    position: absolute;
    top: 5%;
    left:-1px;
}
</style>