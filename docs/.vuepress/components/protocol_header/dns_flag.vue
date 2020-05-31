<template>
    <div>
        <table class='table'>
            <tr>
                <td v-for='item in list'>{{ item.text }}</td>
            </tr>
            <tr>
                <td v-for='item in list'>{{ item.size }}位</td>
            </tr>
        </table>
    </div>    
</template>

<script>
export default {
    data () {
        return {
            list: [
                { text: 'QR', size: 1 },
                { text: 'opcode', size: 4 },
                { text: 'AA', size: 1 },
                { text: 'TC', size: 1 },
                { text: 'RD', size: 1 },
                { text: 'RA', size: 1 },
                { text: 'zero', size: 3 },
                { text: 'rcode', size: 4 },
            ]
        }
    }    
}
</script>

<style scoped>
    .table td {
        text-align: center;
        border: 1px solid #004643;
    }
</style>
