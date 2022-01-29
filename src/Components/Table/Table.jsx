import './table.css'

const Table = ({ data, column,category,keys }) => {
  return (
    <>
    <table className="container">
      <thead>
        <tr>
          <th style={{fontSize:"small",color:"white"}}>{category}</th>
          {column.map((item, index) => <TableHeadItem item={item.toUpperCase()} />)}
        </tr>
        
      </thead>
      <tbody>
        {
          data.map((item,index) => <tr> 
            <td>
              {keys[index]}
            </td>
            { data[index].map(item=> <td>{item}</td> )}
            </tr> )
        }
      </tbody>
    </table>
    </>
  )
}

const TableHeadItem = ({ item }) => <th>{item}</th>

export default Table