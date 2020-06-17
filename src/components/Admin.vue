<template>
    <div class="page-wrapper col" ref="container">
        <h1 class="page-title admin-title">Administration</h1>
        <Accordion title="New User" ref-value="accordion-new-user">
            <form @submit.prevent="onNewUserSubmit" class="col admin-form">
                <FormInput label="Username" name="username" id="username"
                           v-model="newUser.username"/>
                <FormInput label="Password" name="password" id="password" type="password"
                           v-model="newUser.password"/>
                <FormInput type="select" name="usertype" id="usertype"
                           :options="options" v-model="newUser.userType"></FormInput>
                <input class="contact-form-submit admin-submit" type="submit"
                       value="Create user">
                <div class="server-message" ref="new-user-message"></div>
            </form>
        </Accordion>
        <Accordion title="New location" ref-value="accordion-new-location">
            <form @submit.prevent="onNewPlaceSubmit" class="col admin-form">
                <FormInput label="Name" name="name" id="name"
                           v-model="newPlace.name"/>
                <FormInput label="Coordinates" name="coordinates" id="coordinates"
                           v-model="newPlace.coordinates"/>
                <FormInput label="County" name="county" id="county"
                           v-model="newPlace.county"/>
                <FormInput label="Address" name="address" id="address"
                           v-model="newPlace.address"/>
                <FormInput label="Tetra" name="tetra" id="tetra" type="checkbox"
                           v-model="newPlace.tetra"/>
                <FormInput label="Weed control" name="gazirtas" id="gazirtas" type="checkbox"
                           v-model="newPlace.gazirtas"/>
                <FormInput label="Approach" name="approach" id="approach"
                           v-model="newPlace.approach"/>
                <FormInput label="Contact" name="contact" id="contact"
                           v-model="newPlace.contact"/>
                <FormInput label="Entrace" name="entrance" id="entrance"
                           v-model="newPlace.entrance"/>
                <FormInput label="Technology" name="technology" id="technology"
                           v-model="newPlace.technology"/>
                <FormInput label="Owner" name="owner" id="owner"
                           v-model="newPlace.owner"/>
                <input class="contact-form-submit admin-submit" type="submit"
                       value="Create location">
                <div class="server-message" ref="new-place-message"></div>
            </form>
        </Accordion>
        <Accordion title="Excel file upload/import" ref-value="xls-import">
            <form @submit.prevent="confirm" class="col admin-form">
                <FormInput name="xls-file" id="xls-file-upload" type="file"
                           label="Excel file select" file-type=".xls, .xlsx"
                           v-on:filechange="onFileChange"
                />
                <input class="contact-form-submit admin-submit" type="submit"
                       value="File upload">
                <div class="server-message" ref="excel-upload-message"></div>
            </form>
        </Accordion>
        <Accordion title="Excel file download/export" ref-value="xls-export"
                   class="border-bottom">
            <button class="contact-form-submit admin-submit" @click="onDatabaseDownload">
                Excel file download
            </button>
        </Accordion>
        <NavBar/>

        <Confirm v-if="needConfirm" :title="confirmData.title" :message="confirmData.message"
                 :ok-button-text="confirmData.okButtonText" v-on:onaccept="okFunction(onDatabaseUpload)"
                 :cancel-button-text="confirmData.cancelButtonText" v-on:oncancel="cancelFunction"
                 :class="{'confirm-slide-out':isConfirmClosing}"
        />
    </div>
</template>

<script>
    import NavBar from "./NavBar";
    import Accordion from "./Accordion";
    import FormInput from "./FormInput";
    import Confirm from "./Confirm";
    import axios from "axios";
    // eslint-disable-next-line no-unused-vars
    import {saveAs} from 'file-saver';
    // eslint-disable-next-line no-unused-vars
    import Excel from 'exceljs';

    import {
        API_REGISTER_ENDPOINT,
        API_ROOT_URL,
        API_UPLOAD_XLS_ENDPOINT,
        API_DOWNLOAD_XLS_ENDPOINT,
        API_CREATE_PLACE_ENDPOINT
    } from "../utils/api_url";

    export default {
        name: "Admin",
        components: {
            NavBar,
            Accordion,
            FormInput,
            Confirm
        },
        methods: {
            onNewPlaceSubmit: function () {
                let isEmpty = Object.values(this.newPlace).some(x => (x == null || x === ''));
                if(!isEmpty){
                    axios.post(API_ROOT_URL + API_CREATE_PLACE_ENDPOINT, {
                        name: this.newPlace.name,
                        coordinates: this.newPlace.coordinates,
                        county: this.newPlace.county,
                        address: this.newPlace.address,
                        tetra: this.newPlace.tetra,
                        gazirtas: this.newPlace.gazirtas,
                        approach: this.newPlace.approach,
                        contact: this.newPlace.contact,
                        entrance: this.newPlace.entrance,
                        technology: this.newPlace.technology,
                        owner: this.newPlace.owner
                    })
                    .then((response) => {
                        //console.log(response);
                        if(response.status === 200){
                            this.setMessage(
                                'new-place-message',
                                'message',
                                'Location created!'
                            );
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                    console.log('can send');
                } else {
                    this.setMessage('new-place-message', 'error', 'Empty field(s)!');
                }

            },
            onNewUserSubmit: function () {
                if (this.newUser.username && this.newUser.password) {
                    axios.post(API_ROOT_URL + API_REGISTER_ENDPOINT, {
                        username: this.newUser.username,
                        password: this.newUser.password,
                        isAdmin: (this.newUser.userType === 'admin')
                    }, {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                        }
                    })
                        .then((response) => {
                                if (response.data.type === "register" && response.data.payload === true) {
                                    this.setMessage(
                                        'new-user-message',
                                        'message',
                                        'User created!'
                                    );
                                }
                            }
                        ).catch((error) => {
                            if (error) {
                                this.setMessage(
                                    'new-user-message',
                                    'error',
                                    'Incorrect username/password!'
                                );
                            }
                        }
                    );
                } else {
                    this.setMessage(
                        'new-user-message',
                        'error',
                        'Empty field(s)!'
                    );
                }

            },
            onDatabaseUpload: function () {
                let formData = new FormData();
                formData.append('file', this.file);
                //console.log('formData', this.file);

                axios.post(API_ROOT_URL + API_UPLOAD_XLS_ENDPOINT,
                    formData
                    , {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(() => {
                        this.setMessage('excel-upload-message', 'message',
                            'Upload successful!');
                    })
                    .catch(() => {
                        this.setMessage('excel-upload-message', 'error',
                            'Upload unsuccessful!');
                    });
            },
            onDatabaseDownload: function () {
                axios.get(API_ROOT_URL + API_DOWNLOAD_XLS_ENDPOINT)
                    .then((response) => {
                        if (response.status === 200) {
                            let data = response.data;

                            let workbook = new Excel.Workbook();
                            workbook.created = new Date();

                            let worksheet = workbook.addWorksheet('Adatok');

                            data.forEach((row) => {
                                worksheet.addRow([
                                    row.name,
                                    row.coordinates,
                                    row.county,
                                    row.address,
                                    row.tetra ? 'igen' : 'nem',
                                    row.gazirtas ? 'igen' : 'nem',
                                    row.approach,
                                    row.contact,
                                    row.entrance,
                                    row.technology,
                                    row.owner
                                ]);
                                //data.push(row.convertToArray());
                            });

                            workbook.xlsx.writeBuffer()
                                .then((buffer) => {
                                    saveAs(new Blob([buffer]), 'gyorki_database.xlsx')
                                });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            okFunction: function (callback) {
                this.needConfirm = false;
                callback();
            },
            cancelFunction: function () {
                this.isConfirmClosing = true;
                setTimeout(() => {
                    this.needConfirm = false;
                    this.isConfirmClosing = false;
                }, 300);

                //this.needConfirm = false;
            },
            onFileChange: function (file) {
                this.file = file;

            },
            confirm: function () {
                if (this.file) {
                    this.needConfirm = true;
                } else {
                    this.setMessage('excel-upload-message', 'error', 'Nincs kiválaszott fájl');
                }
            },
            setMessage: function (ref, type, message) {
                // eslint-disable-next-line no-unused-vars
                let element = this.$refs[ref];

                if (type === 'error') {
                    element.innerHTML = '<p class="error-message">' + message + '</p>';
                } else if (type === 'message') {
                    element.innerHTML = '<p class="success-message">' + message + '</p>';
                }


                setTimeout(() => {
                    element.innerHTML = '';
                }, 5000)
            }

        },
        data: function () {
            return {
                newUser: {
                    username: '',
                    password: '',
                    userType: ''
                },
                newPlace: {
                    name: '',
                    coordinates: '',
                    county: '',
                    address: '',
                    tetra: false,
                    gazirtas: false,
                    approach: '',
                    contact: '',
                    entrance: '',
                    technology: '',
                    owner: ''
                },
                options: [
                    {name: 'Felhasználó', value: 'felhasznalo'},
                    {name: 'Admin', value: 'admin'}
                ],
                confirmData: {
                    title: 'Feltöltés',
                    message: 'Biztos felül akarja írni a jelenlegi adatbázist?',
                    okButtonText: 'Igen',
                    cancelButtonText: 'Nem',
                },
                file: null,
                needConfirm: false,
                isConfirmClosing: false
            }
        }
    }
</script>

<style>
    .admin-title {
        margin-bottom: 20px;
        color: #fff;
    }

    .admin-form {
        padding: 0 10px;
    }

    .admin-submit {
        margin-bottom: 0;

    }

    .admin-submit:focus {
        outline: none;
    }

    .server-message {
        height: 20px;
        justify-content: center;
        margin-top: 10px;
    }


</style>