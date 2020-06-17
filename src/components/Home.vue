<template>
    <div class="home-wrapper col" v-scroll="handleScroll">
        <FormInput label="Search" class="search-input-wrapper"
                   name="search-input" id="search-input"
                   v-model="searchInput"/>

        <!--   Implement pooled list     -->
        <ul class="places-list-wrapper">
            <Accordion v-for="place in displayList" class="places-list-item"
                       v-bind:key="place.name" :title="place.name">
                <p>
                    <span>LAT:</span> {{place.coordinates}}
                </p>
                <p>
                    <span>Google Maps:</span>
                    <a :href="'http://maps.google.com/?q=' + place.coordinates"
                       target="_blank">
                        Link
                    </a>
                </p>
                <p><span>WAZE:</span>
                    <a :href="'https://waze.com/ul?ll=' + place.coordinates"
                       target="_blank">
                        Link
                    </a>
                </p>
                <p><span>County:</span> {{place.county}}</p>
                <p><span>Address:</span> {{place.address}}</p>
                <p><span>Tetra:</span> {{place.tetra ? 'Yes' : 'No'}}</p>
                <p><span>Weed control:</span> {{place.gazirtas ? 'Yes' : 'No'}}</p>
                <p><span>Approach:</span> {{place.approach}}</p>
                <p><span>Contact:</span> {{place.contact}}</p>
                <p><span>Entrance:</span> {{place.entrance}}</p>
                <p><span>Technology:</span> {{place.technology}}</p>
                <p><span>owner:</span> {{place.owner}}</p>
                <button v-if="isAdmin" class="confirm-button confirm-deny place-delete-button"
                        @click="confirm(place._id)">
                    Delete
                </button>
            </Accordion>
        </ul>

        <NavBar/>
        <Confirm v-if="needConfirm" :title="confirmData.title" :message="confirmData.message"
                 :ok-button-text="confirmData.okButtonText" v-on:onaccept="okFunction(deletePlace)"
                 :cancel-button-text="confirmData.cancelButtonText" v-on:oncancel="cancelFunction"
                 :class="{'confirm-slide-out':isConfirmClosing}"
        />
    </div>
</template>

<script>
    import FormInput from "./FormInput";
    import NavBar from "./NavBar";

    import axios from 'axios';
    import {API_ROOT_URL, API_GET_PLACES_ENDPOINT, API_DELETE_PLACE_ENDPOINT} from "../utils/api_url";
    import {isAdmin} from "../utils/AuthService";
    import Accordion from "./Accordion";
    import Confirm from "./Confirm";


    export default {
        name: "Home",
        components: {
            Accordion,
            FormInput,
            NavBar,
            Confirm
        },
        computed: {
            filteredList() {
                if (this.searchInput) {
                    return this.placesData.filter(post => {
                        return post.name.toLowerCase().includes(this.searchInput.toLowerCase());
                    })
                } else {
                    return this.placesData;
                }

            },
            displayList() {
                return this.filteredList.slice(0, this.defaultDisplayCount);
            }
        },
        beforeMount() {
            axios.get(API_ROOT_URL + API_GET_PLACES_ENDPOINT)
                .then((response) => {
                    this.placesData = response.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        created() {
            window.addEventListener('scroll', this.handleScroll, true);
        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll, true);
        },
        methods: {
            handleScroll: function () {
                let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.body.scrollHeight;
                if (bottomOfWindow && this.displayList.length >= this.defaultDisplayCount) {
                    this.defaultDisplayCount += 15;
                }
            },
            confirm: function (data) {
                this.deleteId = data;
                this.needConfirm = true;
            },
            deletePlace: function () {
                axios.delete(API_ROOT_URL + API_DELETE_PLACE_ENDPOINT,
                    {
                        headers: {
                            Authorization: '***'
                        },
                        data: {
                            id: this.deleteId
                        }
                    })
                    .then((response) => {
                        let index = this.placesData.findIndex((place) => {
                            return place._id === response.data;
                        });

                        this.placesData.splice(index, 1);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                console.log(this.deleteId);
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
                    this.deleteId = null;
                }, 300);
            }
        },
        data: function () {
            return {
                defaultDisplayCount: 15,
                searchInput: '',
                placesData: [],
                isAdmin: isAdmin(),
                confirmData: {
                    title: 'Törlés',
                    message: 'Biztos felül akarja ezt a helyet?',
                    okButtonText: 'Igen',
                    cancelButtonText: 'Nem',
                },
                deleteId: null,
                needConfirm: false,
                isConfirmClosing: false
            }
        }
    }
</script>

<style>
    .home-wrapper {
        width: 100%;
        height: 100%;
    }

    .search-input-wrapper {
        display: flex;
        position: fixed !important;
        height: 80px !important;
        width: 100%;
        padding: 0 20px;
        align-self: center !important;
    }

    .search-input-wrapper label {
        left: 20px !important;
    }

    .search-input-wrapper input {
        appearance: none;

        height: 50px !important;
        border: 1px solid #801336 !important;
        border-radius: 10px !important;
        margin-bottom: 0;
        background: #801336 !important;
        padding-left: 10px;

        box-shadow: transparent !important;
    }

    .has-value.search-input-wrapper label, .search-input-wrapper input:focus ~ label {
        top: 12px !important;
        opacity: 0;
    }

    .search-input-wrapper label {
        margin-left: 10px;
        font-size: 18px !important;
        color: #fafafa !important;
        top: 12px !important;
        font-family: NunitoLight, sans-serif !important;
        transition: top 0s !important;
    }

    .places-list-wrapper {
        flex-direction: column;

        margin-top: 80px;

    }

    .places-list-item .accordion-title {
        font-size: 24px;
        margin: 15px 0;
        font-family: NotoSansRegular, sans-serif !important;
    }

    .places-list-wrapper .accordion-content {
        margin-bottom: 10px;
    }

    .places-list-item {
        flex-direction: column;
    }

    .places-list-item p {
        color: #9E9E9E;
        justify-content: flex-start;
        text-align: left;
        margin-bottom: 15px;
        flex-direction: column;
        /*width: 100%;
        border-top: 1px solid #9E9E9E;
        color: #f2f2f2;
        padding: 0 20px;
        padding-top: 10px;
        font-family: NunitoBold, sans-serif;*/
    }

    .places-list-item a {
        color: #9E9E9E;
        text-decoration: underline;
    }


    .places-list-item span {
        display: flex;
        color: #f2f2f2;
        font-size: 16px;
        font-family: NotoSansBold, sans-serif;
        font-weight: bold;
        line-height: 21px;
    }

    .place-delete-button {
        align-self: flex-start;
        margin-left: 0 !important;
    }

</style>