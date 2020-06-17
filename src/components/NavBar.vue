<template>
    <div class="nav-wrapper">
        <NavBarItem :icon="listIcon" to="/"/>
        <NavBarItem v-if="isAdmin" :icon="adminIcon" class="admin-icon" to="/admin" />
    </div>
</template>

<script>
    import NavBarItem from "./NavBarItem";
    import ListIcon from '../assets/img/list.svg';
    import SettingsIcon from '../assets/img/settings.svg';
    import {isAdmin} from "../utils/AuthService";

    export default {
        name: "NavBar",
        components: {
            NavBarItem
        },
        props: {

        },
        methods: {
        },
        data: function () {
            return {
                listIcon: ListIcon,
                adminIcon: SettingsIcon,
                isAdmin: isAdmin()
            }
        }
    }
</script>

<style>
    .nav-wrapper{
        position: absolute;
        width: 100%;
        height: 60px;
        left: 0;
        background: #801336 ;
        top: calc(100% - 60px);
        padding: 10px 20px;
        justify-content: space-evenly;
        align-items: center;
        z-index: 10;
    }

    .admin-icon img{
        padding: 5px;
    }
</style>