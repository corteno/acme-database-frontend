<template>
    <div class="contact-form-input-wrapper"
         v-bind:class="{'has-value':hasValue, 'has-file':hasFile}">
        <textarea v-if="textarea"
                  class="contact-form-input"
                  v-bind:class="className"
                  v-bind:name="name"
                  v-bind:id="id"
                  v-model="inputValue"
        ></textarea>

        <select v-else-if="type === 'select'"
                class="contact-form-input"
                v-bind:name="name"
                v-bind:id="id">
            <option v-bind:key="option.name"
                    v-for="option in options"
                    :value="option.value"
            >{{option.name}}
            </option>
        </select>

        <input v-else-if="type === 'file'"
               :type="type"
               class="contact-form-input"
               v-bind:class="{className}"
               v-bind:name="name"
               v-bind:id="id"
               v-bind:accept="fileTypeString"
               v-on:change="onFileChange"
        >

        <input v-else
               v-bind:type="type"
               class="contact-form-input"
               v-bind:class="{className}"
               v-bind:name="name"
               v-bind:id="id"
               v-model="inputValue"
               v-bind:accept="fileTypeString"
        >
        <p class="input-file-name" v-if="type === 'file'">{{fileName}}</p>

        <div v-if="type === 'select'" class="select-arrow"></div>
        <label v-if="type !== 'select'" v-bind:for="id">{{label}}</label>
    </div>
</template>

<script>
    export default {
        name: "FormInput",
        inheritAttrs: true,
        methods: {
            onFileChange: function (e) {
                this.fileName = e.target.files[0].name;
                this.hasFile = true;

                this.$emit('filechange', e.target.files[0]);
            }
        },
        computed: {
            inputValue: {
                get() {
                    return this.value;
                },
                set(val) {
                    //this.value = val;
                    this.hasValue = (val !== '');
                    this.$emit('input', val);
                }
            },
            fileTypeString: function () {
                if (this.fileType !== '') {
                    return this.fileType.toString();
                } else {
                    return '';
                }

            }
        },
        props: {
            textarea: {
                type: Boolean,
                default: false
            },
            type: {
                default: 'text'
            },
            name: {
                type: String,
                default: '',
                required: true
            },
            className: {
                default: ''
            },
            id: {
                type: String,
                default: ''
            },
            label: {
                default: 'Label'
            },
            value: {
                type: [String, Boolean],
                default: ''
            },
            options: {
                type: Array
            },
            fileType: {
                type: String,
                default: ''
            }

        },
        data: function () {
            return {
                hasValue: false,
                fileName: 'Nincs fájl kiválasztva',
                hasFile: false
            };
        }
    }
</script>

<style scoped>
    .contact-form-input-wrapper {
        position: relative;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .contact-form-input-wrapper label {
        position: absolute;
        left: 1px;
        top: 5px;
        color: #cacaca;
        font-family: NunitoRegular, sans-serif;
        transition: 0.2s top, 0.2s color;
    }

    .contact-form-input {
        flex-shrink: 0;
        height: 30px;
        min-height: 30px;
        width: 100%;
        border: none;
        border-bottom: 1px solid #cacaca;
        outline: none;
        margin-bottom: 30px;
        transition: 0.2s border-bottom-color;
        color: #f2f2f2;

        background: transparent;

        font-family: NunitoRegular, sans-serif;
        font-size: 16px;
        border-radius: 0;
    }

    select.contact-form-input {
        position: relative;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        color: #cacaca;

    }

    .select-arrow {
        position: absolute;
        height: 30px;
        width: 20px;
        right: 0;
        background: url("../assets/img/chevron-down.svg") no-repeat center;
        transition: 0.2s transform;
    }

    select.contact-form-input:focus ~ .select-arrow {
        transform: rotate(180deg);
    }

    textarea.contact-form-input {
        resize: none;
        min-height: 100px;
    }

    textarea.contact-form-input ~ label {
        top: 0;
    }

    .has-value label, .contact-form-input:focus ~ label {
        top: -20px;
        color: #f2f2f2;
    }

    .has-value .contact-form-input {
        border-bottom-color: #f2f2f2;
    }

    input[type="file"] {
        display: none;
    }

    input[type="checkbox"] {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        position: relative;

        box-shadow: none;

        box-sizing: border-box;
        width: 20px;
        height: 20px;
        min-height: auto;
        margin-top: 30px;
        align-self: flex-start;

        border: 1px solid #9E9E9E;

    }

    input[type="checkbox"]:after {
        position: absolute;
        content: '';
        width: 12px;
        height: 5px;
        transform: rotate(-45deg);

        top: 4px;
        left: 2px;

        border-bottom: 2px solid #2c3e50;
        border-left: 2px solid #2c3e50;

        opacity: 0;
    }

    input[type="checkbox"]:checked:after {
        opacity: 1;
    }

    input[type="checkbox"] ~ label {
        top: 0 !important;
    }

    input[type="checkbox"]:checked {
        background: #f2f2f2;
        border-color: #f2f2f2;
    }



    .has-file {
        flex-direction: column;
    }

    input[type="file"] ~ label {
        position: relative;
        min-height: 30px;
        align-self: flex-start;
        padding-left: 20px;
        padding-right: 50px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 4px;
        font-family: NunitoBold, sans-serif;
        font-size: 13px;
        text-transform: uppercase;
        color: #f2f2f2;
        background-color: #801336;
        background-image: url("../assets/img/upload.svg");
        background-repeat: no-repeat;
        background-size: 20px;
        background-position: 95%;
        margin-bottom: 40px;
        align-items: center;
    }

    .input-file-name {
        color: #f2f2f2;
        text-align: left;
        align-items: flex-start;
    }

    @media screen and (min-width: 600px) {
        .contact-form-input-wrapper {
            align-self: flex-start;
            max-width: 600px;
        }

        .contact-form-submit {
            align-self: flex-start;
        }
    }


</style>