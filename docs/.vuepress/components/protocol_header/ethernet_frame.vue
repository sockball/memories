<template>
    <div>
        <table class='table'>
            <tr>
                <td v-for='item in list'>{{ item.text }}</td>
            </tr>
            <tr>
                <td v-for='item in list'>{{ item.size }}字节</td>
            </tr>
            <tr>
                <td colspan='5' style='background: #004643;color: #fff'>以太网帧封装</td>
            </tr>
        </table>
    </div>    
</template>

<script>
export default {
    data () {
        return {
            list: [
                { text: '目的物理地址', size: 6 },
                { text: '源物理地址', size: 6 },
                { text: '类型', size: 2 },
                { text: '数据', size: '46~1500' },
                { text: 'CRC', size: 4 },
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
