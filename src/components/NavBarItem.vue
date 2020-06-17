<template>
    <div class="nav-item col" :class="className">
        <router-link :to="to" >
            <img :src="icon" alt="">
        </router-link>
    </div>

</template>

<script>
    export default {
        name: "NavBarItem",
        props: {
            icon: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: 'Link'
            },
            linkTo: {
                type: String,
                default: ''
            },
            className: {
                type: String,
                default: ''
            },
            to: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>
    .nav-item img {
        height: 40px;
        width: 40px;
    }

    .nav-item p {
        font-family: NotoSansRegular, sans-serif;
        color: #e9e9e9;
        font-size: 14px;
        text-transform: uppercase;
    }
</style>