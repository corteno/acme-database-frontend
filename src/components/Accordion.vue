<template>
    <div class="accordion-wrapper" :class="{className, 'accordion-open':isOpen }">
        <h3 class="accordion-title" @click="onClick">{{title}}</h3>
        <div class="accordion-content-wrapper col" :ref="refValue"
             :style="{maxHeight: currentHeight + 'px'}">
            <div class="accordion-content">
                <slot/>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Accordion",
        props: {
            title: {
                type: String,
                default: 'Accordion title'
            },
            className: {
                type: String,
                default: ''
            },
            refValue: {
                type: String,
                default: ''
            },
            defaultContentHeight: {
                type: Number,
                default: 0
            }
        },
        mounted() {
            this.defaultcontentHeight = this.$refs[this.refValue].offsetHeight;
            this.currentHeight = 0;
        },
        methods: {
            onClick: function () {
                //console.log(this.$refs[this.refValue].scrollHeight);
                if (this.isOpen) {
                    this.currentHeight = 0;
                } else {

                    this.currentHeight = this.defaultcontentHeight;

                }
                this.isOpen = !this.isOpen;
                //Continue making accordion, get height 
                //console.log(this.$refs[this.refValue].scrollHeight);
            }
        },
        data: function () {
            return {
                isOpen: false,
                currentHeight: {
                    type: Number,
                    default: 0
                }
            }
        }
    }
</script>

<style scoped>
    .accordion-wrapper {
        flex-direction: column;
        width: 100%;
        border-top: 1px solid #9E9E9E;
        padding: 0 20px;
    }


    .accordion-title {
        color: #9E9E9E;
        font-family: NunitoRegular, sans-serif;
        font-weight: lighter;
        transition: 0.2s color;
        cursor: pointer;
    }

    .accordion-content-wrapper {
        width: 100%;
        overflow: hidden;
        transition: 0.3s max-height ease-out;
        -webkit-transition: 0.3s max-height ease-out;
    }

    .accordion-content {
        flex-direction: column;
        width: 100%;
        padding-top: 20px;
        margin-bottom: 20px;
        height: 100% !important;
    }

    .accordion-open .accordion-title {
        color: #f2f2f2;
        font-family: NunitoRegular, sans-serif;
    }

    .accordion-open .accordion-content {
    }


    .border-bottom {
        border-bottom: 1px solid #9E9E9E;
    }

</style>