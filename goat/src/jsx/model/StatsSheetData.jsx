import React, { useEffect } from 'react';

const StatsSheetData = ({ dataList, single }) => {

    useEffect(() => { }, [dataList]);

    const listData = () => {
        //debugger
        if (Object.keys(dataList[0]).length === 0 && dataList[0].constructor === Object) {
            return (<tbody></tbody>);
        } else {
            if (dataList[0].type == "Tournament" || dataList[0].type == "Game") { dataList.shift(); }
            console.log(dataList);
            //debugger;
            return (
                <tbody>{dataList.map((s, index) => <tr key={index}>
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
                </tr>)}</tbody>
            );
        }
    };

    return (
        <>
            {listData()}
        </>
    );
};

export default StatsSheetData