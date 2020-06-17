<template>
    <div class="login-wrapper col">
        <h1 class="page-title">ACME <span>Corp.</span></h1>
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

    .page-title {
        flex-direction: column;
        font-family: NunitoLight, sans-serif;
        margin-top: 50px;
        font-weight: 200;
    }

    .page-title, .page-title span {
        color: #f2f2f2;
        font-size: 46px;
        letter-spacing: 2px;
    }

    .page-title span {
        margin-top: -20px;
    }

    .login-wrapper{
        padding: 0 20px;
    }

    .contact-form-wrapper{
        margin-top: calc(50vh - 260px);
    }

</style>