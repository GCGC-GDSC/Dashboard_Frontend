// import { Key } from '@mui/icons-material'
import './table.scss'
const Table = ({branchName, data,keys,year1,year2 }) => {
  // console.log(data)
  const parsedValues = {
    'total_placed':"No. of Students Placed",
    'total_multiple_offers':"No. of Multiple Offers",
    'highest_salary':"Highest Salary",
    'average_salary':"Average Salary",
    'total_students_eligible':"No. of Students Eligible"
  }
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
            <th>% of Change</th>
        </tr>
      </thead>
      <tbody>

        {
          keys.map((key,index) => <tr> 
            <td>
              {parsedValues[key]}
              </td>     
              <td >
              {parseFloat(data[year1][key]).toFixed(2)}
              </td>     
              <td>
                {parseFloat(data[year2][key]).toFixed(2)}
              </td>     
              <td className={data[year2][key]>data[year1][key]?'green':''}>
                {
                
                isNaN(((data[year2][key]-data[year1][key])*100/data[year1][key])) ? 0: ((data[year2][key]-data[year1][key])*100/data[year1][key]).toFixed(2)
                }  %
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