// import { Key } from '@mui/icons-material'
import './table.css'
const Table = ({ data,keys }) => {
  const parsedValues = {
    'total_offers':"Number of total offers",
    'total_multiple_offers':"Numbers of multiple offers",
    'highest_salary':"Highest Salary",
    'average_salary':"Average Salary"
  }
  return (
    <>
    <table className="container">
      <thead>
        <tr>
          <th>
            Criteria
          </th>
            <th>
              {data.year1.name}
            </th>
            <th>
              {data.year2.name}
            </th>
            <th>Percentage of Change</th>
        </tr>
      </thead>
      <tbody>

        {
          keys.map((key,index) => <tr> 
            <td>
              {parsedValues[key]}
              </td>     
              <td >
              {data.year1[key]}
              </td>     
              <td>
                {data.year2[key]}
              </td>     
              <td className={data.year2[key]>data.year1[key]?'green':''}>
                {((data.year2[key]-data.year1[key])*100/data.year1[key]).toFixed(2)}  %
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