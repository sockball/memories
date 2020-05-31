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
                <td colspan='9' style='background: #004643;color: #fff'>以太网ARP请求/应答报文</td>
            </tr>
        </table>
    </div>    
</template>

<script>
export default {
    data () {
        return {
            list: [
                { text: '硬件类型', size: 2 },
                { text: '协议类型', size: 2 },
                { text: '硬件地址长度', size: 1 },
                { text: '协议地址长度', size: 1 },
                { text: '操作', size: 2 },
                { text: '发送端以太网地址', size: 6 },
                { text: '发送端IP地址', size: 4 },
                { text: '目的端以太网地址', size: 6 },
                { text: '目的端IP地址', size: 4 },
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
