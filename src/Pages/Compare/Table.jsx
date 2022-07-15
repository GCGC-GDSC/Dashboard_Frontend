import { Key } from '@mui/icons-material'
import './table.css'
const Table = ({ data,keys }) => {
  const parsedValues=(key)=>{
    // return ["Number of Companies","Number of students Placed","Highest Package","Number of off campus placements"]
    return key
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
        </tr>
      </thead>
      <tbody>

        {
          keys.map((key,index) => <tr> 
            <td>
              {parsedValues(key)}
              </td>     
              <td className={data.year1[key]>data.year2[key]?'green':''}>
              {data.year1[key]}
              </td>     
              <td className={data.year1[key]<data.year2[key]?'green':''}>
                {data.year2[key]}
              </td>            
            </tr> 
            )
        }
      </tbody>
    </table>
    </>
  )
}

const TableHeadItem = ({ item }) => <th>{item}</th>

export default Table