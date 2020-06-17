<template>
    <div id="app" >
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'App',
        components: {

        },
        mounted: function(){
        },
        methods: {
        },
        data: function (){
            return {
            }
        }
    }
</script>

<style>
    html{
        height: 100%;
        background: #2d132c;
        overflow-x: hidden;
    }


    #app {
        width: 100vw;
        display: flex;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 20px;
        margin-bottom: 60px;
        justify-content: center;
    }

    .page-wrapper{
        flex-direction: column;
        width: 100%;
    }

    .page-title{
        font-family: NotoSansRegular, sans-serif;
        font-weight: 400;
        padding: 0 20px;
        color: #f2f2f2;
        margin: 0;
    }

    * {
        font-family: NunitoRegular, sans-serif;
        box-sizing: border-box;
        color: #212121;
    }

    body {
        height: 100%;
        margin: 0;
        align-items: flex-start;
        overflow-y: scroll;
    }

    title {
        display: none;
    }

    body, code, pre, main, article, div, form, input, textarea, label, ul, li, header, nav, h1, h2, h3, h4, button, section {
        display: flex;
    }

    a, p, em, strong {
        display: inline-flex;
    }

    input:focus {
        outline: none;
    }

    ul {
        padding: 0;
        margin: 0;
    }

    sup {
        display: inline;
    }

    li {
        list-style: none;
    }

    a {
        text-decoration: none;
        color: #000;
    }

    p {
        display: inline;
        margin: 0;
    }

    /*--------------------------------------------------------------
    # General
    --------------------------------------------------------------*/

    .col {
        flex-direction: column;
    }

    .row {
        flex-direction: row;
    }


    .error-message {
        color: #c72c41;
    }

    .success-message {
        color: #21bf73 !important;
    }

    @font-face {
        font-family: NunitoRegular;
        src: url("./assets/fonts/Nunito-Regular.ttf");
    }

    @font-face {
        font-family: NunitoLight;
        src: url("./assets/fonts/Nunito-Light.ttf");
    }

    @font-face {
        font-family: NunitoBold;
        src: url("./assets/fonts/Nunito-Bold.ttf");
    }

    @font-face {
        font-family: NotoSansRegular;
        src: url("./assets/fonts/NotoSans-Regular.ttf");
    }

    @font-face {
        font-family: NotoSansBold;
        src: url("./assets/fonts/NotoSans-Bold.ttf");
    }
</style>
