<template>
    <form @submit.prevent="onSubmit" class="contact-form-wrapper"
        enctype="multipart/form-data" accept-charset="x-UTF-16LE-BOM">
        <FormInput type="text" id="username" name="username" label="Username"
                   v-model="username"
        />
        <FormInput type="password" id="password" name="password" label="Password"
                   v-model="password"
        />
        <input type="submit" class="contact-form-submit" value="Login">
        <p class="err-message">{{messageFromServer}}</p>
    </form>
</template>

<script>
    import FormInput from "./FormInput";
    import axios from 'axios';
    import {API_ROOT_URL, API_LOGIN_ENDPOINT} from "../utils/api_url";
    import {login} from '../utils/AuthService';

    export default {
        name: "ContactForm",
        components: {FormInput},
        /*computed: {
            contactName: {
                get(){
                    return this.contactName
                }
            }
        },*/
        methods: {
            onSubmit: function () {
                if (this.username && this.password) {
                    axios.post(API_ROOT_URL + API_LOGIN_ENDPOINT, {
                        username: this.username,
                        password: this.password
                    }, {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                        }
                    })
                        .then((response) => {
                                if (response.data.type === "login" ) {
                                    login(response.data.payload);
                                    this.$router.push('/');
                                }
                            }
                        ).catch((error) => {
                            if (error) {
                                console.log(error);
                                this.setErrorMessage('Helytelen felhasználónév/jelszó');
                            }
                        }
                    );
                } else {
                    this.setErrorMessage('Empty field(s)');
                }

            },
            setErrorMessage: function (message) {
                this.messageFromServer = message;
            }
        },
        data: function () {
            return {
                username: '',
                password: '',
                messageFromServer: ''
            }
        }

    }
</script>

<style>
    .contact-form-wrapper {
        display: flex;
        flex-direction: column;
        max-width: 400px;
        width: 100%;
        justify-self: center;
        margin: 0 auto;
    }

    .contact-form-submit {
        appearance: none;
        font-family: NunitoBold, sans-serif;
        text-transform: uppercase;
        border: 1px solid #801336;
        padding: 10px 20px;
        color: #f2f2f2;
        border-radius: 4px;
        cursor: pointer;
        background: #801336;
        justify-content: center;

        transition: 0.2s all;
    }

    .contact-form-submit:hover{
        color: #f2f2f2 !important;
    }

    .contact-form-submit:hover {
        color: #313131;
        border-color: #313131;
    }

    .err-message {
        margin-top: 20px;
        color: #c72c41;
        font-family: NunitoBold, sans-serif;
    }

    @media screen and (min-width: 600px) {
        .contact-form-submit {
            align-self: flex-start;
        }
    }

</style>