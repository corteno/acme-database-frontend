<template>
    <div class="confirm-wrapper col" :class="className">
        <h3 class="confirm-title">{{title}}</h3>
        <p class="confirm-message">{{message}}</p>
        <div class="confirm-button-wrapper">
            <button class="confirm-success confirm-button" v-on:click="onOk">{{okButtonText}}</button>
            <button class="confirm-deny confirm-button" v-on:click="onCancel">{{cancelButtonText}}</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Confirm",
        methods: {
            onOk: function(){
                this.$emit('onaccept');
            },
            onCancel: function(){
                this.$emit('oncancel');
            }
        },
        props: {
            title: {
                type: String,
                default: 'Title'
            },
            message: {
                type: String,
                default: 'Message'
            },
            okButtonText: {
                type: String,
                default: 'Ok'
            },
            cancelButtonText: {
                type: String,
                default: 'Cancel'
            },
            okFunction: {
                type: Function
            },
            cancelFunction: {
                type: Function
            },
            className: {
                type: String,
                default: ''
            }

        }
    }
</script>

<style>
    .confirm-wrapper {
        position: absolute;
        bottom: 80px;
        width: 90%;
        background: #801336;
        left: 5%;
        padding: 20px;
        border-radius: 5px;
        max-width: 400px;
        animation: confirm-slide-in 0.3s;
    }

    .confirm-slide-out {
        animation: confirm-slide-out 0.35s !important;
        animation-fill-mode: forwards;
    }

    @keyframes confirm-slide-in {
        0% {
            bottom: -400px;
        }

        100% {
            bottom: 80px;
        }
    }

    @keyframes confirm-slide-out {
        0% {
            bottom: 80px;
        }

        100% {
            bottom: -400px;
        }
    }

    .confirm-title, .confirm-message {
        color: #f2f2f2;
    }

    .confirm-title {
        margin-top: 0;
        font-family: NotoSansBold, sans-serif;
        text-transform: uppercase;
        justify-content: center;
    }

    .confirm-message {
        margin-bottom: 20px;
    }

    .confirm-button-wrapper {
        justify-content: center;
    }

    .confirm-button {
        border: none;
        color: #f2f2f2;
        padding: 10px 30px;
        border-radius: 5px;
        margin: 0 10px;
        font-size: 16px;
        cursor: pointer;
    }

    .confirm-button:focus {
        outline: none;
    }

    .confirm-success {
        /*background: #0c9463;*/
        background: #008f56;
    }

    .confirm-deny {
        background: #c02739;
    }

</style>