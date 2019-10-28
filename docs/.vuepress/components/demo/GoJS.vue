<template>
    <div :id='id'></div>
</template>

<script>
import go from 'gojs'

export default {
    data () {
        return {
            id: 'gojs-demo',
            legendColor: {
                country: '#F0134D',
                province: '#FF6F5E',
                city: '#40BFC1',
                area: '#F5F0E3',                
            },
            attr: {
                // 显示名称的属性名 (如中国、湖南省...
                name: 'name',
                // 区分级别的属性名
                level: 'level'
            },
            data: [
                { key: 0, parent: 0, name: '中国', level: 'country', id: 1},
                { key: 1, parent: 0, name: '湖南省', level: 'province', id: 2},
                { key: 2, parent: 1, name: '长沙市', level: 'city', id: 3},
                { key: 3, parent: 4, name: '哈尔滨市', level: 'city', id: 4},
                { key: 4, parent: 0, name: '黑龙江省', level: 'province', id: 5},
                { key: 5, parent: 1, name: '常德市', level: 'city', id: 5},
                { key: 6, parent: 2, name: 'A区', level: 'area', id: 6},
                { key: 7, parent: 5, name: 'B区', level: 'area', id: 7}
            ]
        }
    },
    methods: {
        // 图例及类别的颜色
        legend (level) {
            return this.legendColor[level]
        },
        tooltip (row) {
            return `ID：${row.id}`
        },
        gennerateDemo () {
            const $ = go.GraphObject.make

            const myDiagram = $(go.Diagram, this.id, {
                'toolManager.hoverDelay': 100,  // 100 milliseconds instead of the default 850
                allowCopy: false,
                layout: $(go.TreeLayout, { angle: 90, nodeSpacing: 10, layerSpacing: 40, layerStyle: go.TreeLayout.LayerUniform })
            })

            // 图例说明
            myDiagram.add(
                $(go.Part, 'Table',
                    { position: new go.Point(300, 10), selectable: false },
                    $(go.TextBlock, '级别',
                        { row: 0, font: '700 14px Droid Serif, sans-serif' }),
                    $(go.Panel, 'Horizontal',
                        { row: 1, alignment: go.Spot.Left },
                        $(go.Shape, 'Rectangle',
                            { desiredSize: new go.Size(30, 30), fill: this.legendColor['country'], margin: 5 }),
                        $(go.TextBlock, '国家',
                            { font: '700 13px Droid Serif, sans-serif' })
                    ),
                    $(go.Panel, 'Horizontal',
                        { row: 2, alignment: go.Spot.Left },
                        $(go.Shape, 'Rectangle',
                            { desiredSize: new go.Size(30, 30), fill: this.legendColor['province'], margin: 5 }),
                        $(go.TextBlock, '省',
                            { font: '700 13px Droid Serif, sans-serif' })
                    ),
                    $(go.Panel, 'Horizontal',
                        { row: 3, alignment: go.Spot.Left },
                        $(go.Shape, 'Rectangle',
                            { desiredSize: new go.Size(30, 30), fill: this.legendColor['city'], margin: 5 }),
                        $(go.TextBlock, '市',
                            { font: '700 13px Droid Serif, sans-serif' })
                    ),
                    $(go.Panel, 'Horizontal',
                        { row: 4, alignment: go.Spot.Left },
                        $(go.Shape, 'Rectangle',
                            { desiredSize: new go.Size(30, 30), fill: this.legendColor['area'], margin: 5 }),
                        $(go.TextBlock, '区',
                            { font: '700 13px Droid Serif, sans-serif' })
                    )
                ))

            // define tooltips for nodes
            const tooltiptemplate =
                $('ToolTip',
                    { 'Border.fill': 'whitesmoke', 'Border.stroke': 'black' },
                    $(go.TextBlock,
                        {
                            font: 'bold 8pt Helvetica, bold Arial, sans-serif',
                            wrap: go.TextBlock.WrapFit,
                            margin: 5
                        },
                        new go.Binding('text', '', this.tooltip))
                )

            // replace the default Node template in the nodeTemplateMap
            myDiagram.nodeTemplate =
                $(go.Node, 'Auto',
                    { deletable: false, toolTip: tooltiptemplate },
                    // new go.Binding('text', 'name'),
                    $(go.Shape, 'Rectangle',
                        {
                            fill: 'lightgray',
                            stroke: null, strokeWidth: 0,
                            stretch: go.GraphObject.Fill,
                            alignment: go.Spot.Center
                        },
                        new go.Binding('fill', this.attr.level, this.legend)),
                    $(go.TextBlock,
                        {
                            font: '700 12px Droid Serif, sans-serif',
                            textAlign: 'center',
                            margin: 10, maxSize: new go.Size(80, NaN)
                        },
                        new go.Binding('text', this.attr.name))
                )

            // define the Link template
            myDiagram.linkTemplate =
                $(go.Link, { routing: go.Link.Orthogonal, corner: 5, selectable: false },
                    $(go.Shape, { strokeWidth: 3, stroke: '#424242' }))  // the gray link shape

            // create the model for the family tree
            myDiagram.model = new go.TreeModel(this.data)
        }
    },
    mounted () {
        this.gennerateDemo()
    }
}
</script>

<style scopped>
    #gojs-demo {
        background-color: white;
        border: solid 1px black;
        width: 600px;
        height: 550px;
        margin: 30px auto;
    }
</style>
