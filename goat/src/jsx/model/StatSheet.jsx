import React, {useEffect, useState, createRef, useRef, ErrorBoundary}  from 'react';
import '../../css/model/SearchResult.css'

const StatSheet = ({ playerData }) => {

    //const stats = Object.entries(playerData.statsSheet);
    //const stats = playerData.statsSheet
    //const stats = Object.entries(playerData.statsSheet)
    //const [statsTable, setStatsTable] = useState()
    const [singleData, setSingleData] = useState(playerData.length==1)

    const ref = useRef(null);


    useEffect(() => {
        console.log(playerData)
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

    }, [playerData])    

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
                    <StatsSheetData dataList = {playerData} single = {singleData}/>
                </table>
        </>
    )
}

const StatsSheetData = ( {dataList, single} ) => {

    useEffect(() => {}, [dataList])

    const listData = ( ) => {
        if (Object.keys(dataList[0]).length === 0 && dataList[0].constructor === Object){
            return(<tbody></tbody>)            
        } else {
            console.log(dataList.length)
            return(
                <tbody>{
                    dataList.map( (s, index) =>
                        <tr key = {index} >
                            <td hidden={single}>{s.name}</td>
                            <td>{s.statsSheet.minutes}</td>
                            <td>{s.statsSheet.points}</td>
                            <td>{s.statsSheet.twoPointsMade + '/' + s.statsSheet.twoPointsAttempted}</td>
                            <td>{s.statsSheet.twoPointsPercentage}</td>
                            <td>{s.statsSheet.threePointsMade + '/' + s.statsSheet.threePointsAttempted}</td>
                            <td>{s.statsSheet.threePointsPercentage}</td>
                            <td>{s.statsSheet.freeThrowsMade + '/' + s.statsSheet.freeThrowsAttempted}</td>
                            <td>{s.statsSheet.freeThrowsPercentage}</td>
                            <td>{s.statsSheet.offensiveRebounds + ' | ' + s.statsSheet.defensiveRebounds}</td>
                            <td>{s.statsSheet.totalRebounds}</td>
                            <td>{s.statsSheet.assists}</td>
                            <td>{s.statsSheet.steals}</td>
                            <td>{s.statsSheet.turnovers}</td>
                            <td>{s.statsSheet.commitedBlocks}</td>
                            <td>{s.statsSheet.recievedBlocks}</td>
                            <td>{s.statsSheet.commitedFouls}</td>
                            <td>{s.statsSheet.recievedFouls}</td>
                        </tr>)
                }</tbody>
            )
        }
    }

    return(
        <>
            {listData()}
        </>
    )
}

export default StatSheet