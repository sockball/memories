<template>
    <div>
        <table class='table'>
            <tr style='border: none'>
                <th>
                    <span class='left'>0</span>
                    <span class='right'>15</span>
                </th>
                <th>
                    <span class='left'>16</span>
                    <span class='right'>31</span>
                </th>
            </tr>
            <tr>
                <td colspan='2'>查询名（可变长）</td>
            </tr>
            <tr>
                <td>16位查询类型</td>
                <td>16位查询类</td>
            </tr>
        </table>
    </div>    
</template>

<style scoped>
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
</style>
