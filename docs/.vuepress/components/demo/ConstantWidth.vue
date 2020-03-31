<template>
    <ul class='box'>
        <li v-for='i in 3' :key='i' class='type'>类型{{ i }}</li>
    </ul>
</template>

<style scoped>
    .box {
        width: 300px;
        height: 69px;
        background: #204051;
        padding: 0;
    }

    .type {
        display: inline-block;
        list-style: none;
        font-size: 16px;
        color: #fff;
        /* border(1 * 2) + margin(20 * 2) = 42 */
        width: calc((100% / 3) - 42px);
        margin: 10px 20px;
        padding: 10px 0;
        text-align: center;
        border: 1px solid #CDCDCD;
        background: #be79df;
    }
</style>
