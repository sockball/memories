<template>
    <div>
        <table class='table'>
            <tr style='border: none'>
                <th colspan='16' style='width: 50%'>
                    <span class='left'>0</span>
                    <span class='right'>15</span>
                </th>
                <th colspan='16' style='width: 50%'>
                    <span class='left'>16</span>
                    <span class='right'>31</span>
                </th>
            </tr>
            <tr>
                <td colspan='16' style='width: 50%'>16位源端口号</td>
                <td colspan='16' style='width: 50%'>16位目的端口号</td>
            </tr>
            <tr>
                <td colspan='32'>32位序号</td>
            </tr>
            <tr>
                <td colspan='32'>32位确认号</td>
            </tr>
            <tr>
                <td colspan='4' style='width: 12.5%'>4位头部长度</td>
                <td colspan='6' style='width: 18.75%'>6位保留</td>
                <td class='one-of-thirty_two'><span>URG</span></td>
                <td class='one-of-thirty_two'><span>ACK</span></td>
                <td class='one-of-thirty_two'><span>PSH</span></td>
                <td class='one-of-thirty_two'><span>RST</span></td>
                <td class='one-of-thirty_two'><span>SYN</span></td>
                <td class='one-of-thirty_two'><span>FIN</span></td>
                <td colspan='16' style='width: 50%'>16位窗口大小</td>
            </tr>
            <tr>
                <td colspan='16'>16位校验和</td>
                <td colspan='16'>16位紧急指针</td>
            </tr>
            <tr>
                <td colspan='32'>选项，最多40字节</td>
            </tr>
            <tr>
                <td colspan='32' style='background: #004643;color: #fff'>TCP头部结构</td>
            </tr>
        </table>
    </div>    
</template>

<style scoped>
    .table {
        table-layout: fixed;
        word-wrap: break-word;
        word-break: break-all;
    }
    .table th {
        background: #004643;
        color: #fff;
        border: none;
    }
    .table td {
        text-align: center;
        border: 1px solid #004643;
    }
    .table .left {
        float: left;
    }
    .table .right {
        float: right;
    }

    .one-of-thirty_two {
        width: 3.125%;
    }
    .one-of-thirty_two span {
        display: flex;
        position: relative;
        left: -10px;
    }
</style>
