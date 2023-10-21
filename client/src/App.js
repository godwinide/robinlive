import './App.css';
import { useEffect, useState } from 'react'


const TableItem = ({ table, duration }) => {
  const [totalwins, setTotalwins] = useState(0);
  const [totallosses, setTotallosses] = useState(0);
  const [try1, setTry1] = useState(0);
  const [try2, setTry2] = useState(0);
  const [try3, setTry3] = useState(0);
  const [try4, setTry4] = useState(0);
  const [try5, setTry5] = useState(0);

  const init = async () => {
    const data = await fetch(`https://robinroulettelive.site/api/get-results/${table.tableId}/?duration=${duration}`);
    const res = await data.json();
    const { results } = res;


    const twins = results.filter(r => r.resultType == true);
    const tlosses = results.filter(r => r.resultType == false);
    const firsttry = results.filter(r => r.resultType == true && r.trialPostion == 1);
    const secondtry = results.filter(r => r.resultType == true && r.trialPostion == 2);
    const thirdtry = results.filter(r => r.resultType == true && r.trialPostion == 3);
    const fourthtry = results.filter(r => r.resultType == true && r.trialPostion == 4);
    const fifthtry = results.filter(r => r.resultType == true && r.trialPostion == 5);

    setTotalwins(twins.length);
    setTotallosses(tlosses.length);
    setTry1(firsttry.length);
    setTry2(secondtry.length);
    setTry3(thirdtry.length);
    setTry4(fourthtry.length);
    setTry5(fifthtry.length);
  }

  useEffect(() => {
    init();
  }, [duration])


  return (
    totalwins > 0 && totalwins > 0
    &&
    <tr>
      <td>{table.tableName}</td>
      <td>{totalwins}</td>
      <td>{totallosses}</td>
      <td>{try1}</td>
      <td>{try2}</td>
      <td>{try3}</td>
      <td>{try4}</td>
      <td>{try5}</td>
    </tr>
  )

}


function App() {
  const [tables, setTables] = useState([]);
  const [duration, setDuration] = useState(1);

  const init = async () => {
    const data = await fetch(`https://robinroulettelive.site/api/get-tables`);
    const res = await data.json();
    if (res?.tables) {
      setTables(res.tables);
    }
    setTimeout(init, 2000);
  }

  useEffect(() => {
    init();
  }, [duration]);

  return (
    <div className='container'>
      <h1 className="my-5 text-center">Robin Live Stats</h1>

      <div className="duration-wrap">
        <h3>Select Duration</h3>
        <select value={duration} onChange={e => setDuration(e.target.value)} className="form-select" aria-label="Default select example">
          <option value="1">Last 1hr</option>
          <option value="2">Last 2hrs</option>
          <option value="3">Last 3hrs</option>
          <option value="4">Last 4hrs</option>
          <option value="5">Last 5hrs</option>
          <option value="6">Last 6hrs</option>
          <option value="12">Last 12hrs ago</option>
          <option value="24">Last 24hrs ago</option>
          <option value="48">2 days ago</option>
          <option value="72">3 days ago</option>
        </select>
      </div>

      <h3 className="my-4">Stats</h3>
      <div className='table-wrap table table-striped'>
        <table className='table'>
          <thead>
            <tr>
              <th>Table</th>
              <th>Total Wins</th>
              <th>Total Losses</th>
              <th>1st Try</th>
              <th>2nd Try</th>
              <th>3rd Try</th>
              <th>4th Try</th>
              <th>5th Try</th>
              <th>6st Try</th>
            </tr>
          </thead>
          <tbody>
            {
              tables.map(t => (
                <TableItem table={t} duration={duration} />
              ))
            }
          </tbody>
        </table>
        {
          tables.length === 0 &&
          <p className='text-center'>No data available</p>

        }
      </div>
    </div>
  );
}

export default App;
