<template>
    <div class="login-wrapper col">
        <img src="../assets/img/logo_szoveg_nelkul_d_rgb.svg" alt="Györki logo"
             class="login-logo">
        <ContactForm/>
    </div>

</template>

<script>
    import ContactForm from "./ContactForm";

    export default {
        name: "Login",
        components: {ContactForm},
        data: function () {
            return {}
        }
    }
</script>

<style>
    .login-logo {
        margin-bottom: 40px;
        margin-top: 40px;
        max-width: 300px;
        width: 100%;
    }

    .login-wrapper{
        padding: 0 20px;
    }

    .contact-form-wrapper{
        margin-top: calc(50vh - 260px);
    }

</style>