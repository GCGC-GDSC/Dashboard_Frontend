import './table.css'
const Table = ({ data, column,category,keys }) => {
  return (
    <>
    <table className="container">
      <thead>
        <tr>
          <th style={{color:"white"}}>{category}</th>
          {column.map((item, index) => <TableHeadItem item={item} />)}
        </tr>
        
      </thead>
      <tbody>
        {
          data.map((item,index) => <tr> 
            <td>
              {keys[index]}
            </td>
            { data[index].map(item=> <td>{category ==="Package(LPA)"?item.toFixed(2):item} </td> )}
            </tr> )
        }
      </tbody>
    </table>
    </>
  )
}

const TableHeadItem = ({ item }) => <th>{item}</th>

export default Table