import React, {useEffect, useState, createRef, useRef, ErrorBoundary}  from 'react';
import '../../css/model/SearchResult.css'
import StatsSheetData from './StatsSheetData';

const StatSheet = ({ componentData }) => {

    //const stats = Object.entries(playerData.statsSheet);
    //const stats = playerData.statsSheet
    //const stats = Object.entries(playerData.statsSheet)
    //const [statsTable, setStatsTable] = useState()
    const [singleData, setSingleData] = useState(true)

    const ref = useRef(null);

    useEffect(() => {
        console.log(componentData)
        setSingleData(componentData.length==1)
        //debugger
        /*
        const table = ref.current;
        //var table = createRef()
        console.log(stats)
        setStatsTable(playerData.statsSheet)

        var tableData = new Map(stats)/*[ ...stats.keys()].filter(function(item, pos) {
            return headers.indexOf(item) == pos;
        })
        
        let headers = [ ...tableData.keys() ]
        
        console.log(headers)
        
        
        const fillTable = () => {
            var thead = "<thead>" 
            var tbody = "<tbody> <tr>"; 
            //table.innerHTML = ""
            //debugger
            for(var y = 0; y < headers.length; y++){
                thead += "<th scope='col'>" + headers[y] + "</th>"
                tbody += "<td>" + tableData.get(headers[y]) + "</td>";
            }  
            
            table.innerHTML += thead + tbody + "</tr>";
        }

        fillTable()*/

    }, [componentData])    

    return(
        <>
                <table className="table table-secondary table-bordered table-hover table-responsive" id="StatsTable" align='center'>
                    <thead>
                        <tr>
                            <th rowSpan="2" hidden={singleData}>Name</th>
                            <th rowSpan="2">Min</th>
                            <th rowSpan="2">Pts</th>
                            <th colSpan="2">2P</th>
                            <th colSpan="2">3P</th>
                            <th colSpan="2">FT</th>
                            <th colSpan="2">Rebounds</th>
                            <th rowSpan="2">Ast</th>
                            <th rowSpan="2">Stl</th>
                            <th rowSpan="2">TO</th>
                            <th colSpan="2">Blk</th>
                            <th colSpan="2">Fouls</th>
                        </tr>
                        <tr>
                            <td>M/A</td>
                            <td>%</td>
                            <td>M/A</td>
                            <td>%</td>
                            <td>M/A</td>
                            <td>%</td>
                            <td>Off | Def</td>
                            <td>Tot</td>
                            <td>Made</td>
                            <td>Rec</td>
                            <td>Made</td>
                            <td>Rec</td>
                        </tr>
                    </thead>
                    <StatsSheetData dataList = {componentData} single = {singleData}/>
                </table>
        </>
    )
}

export default StatSheet