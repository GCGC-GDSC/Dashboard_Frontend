// import { Key } from '@mui/icons-material'
import './table.scss'
const Table = ({branchName, data,keys,year1,year2 }) => {
  // console.log(data)
  // const parsedValues = {
  //   'total_offers':"Number of total offers",
  //   'total_multiple_offers':"Numbers of multiple offers",
  //   'highest_salary':"Highest Salary",
  //   'average_salary':"Average Salary"
  // }
  return (
    <>
    <table className="container compareTable" border={1}>
      <thead>
        <tr>
          <th className='tableHeader' colSpan={4}>
          {branchName}    
          </th>
        </tr>
        <tr>
          <th>
            Criteria
          </th>
            <th>
              {year1}
            </th>
            <th>
              {year2}
            </th>
            <th>Percentage of Change</th>
        </tr>
      </thead>
      <tbody>

        {
          keys.map((key,index) => <tr> 
            <td>
              {key}
              </td>     
              <td >
              {data[year1][key]}
              </td>     
              <td>
                {data[year2][key]}
              </td>     
              <td className={data[year2][key]>data[year1][key]?'green':''}>
                {((data[year2][key]-data[year1][key])*100/data[year1][key]).toFixed(2)}  %
                </td>       
            </tr> 
            )
        }
      </tbody>
    </table>
    </>
  )
}


export default Table