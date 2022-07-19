import './table.css'
const Table = ({ data, column,category,keys }) => {
  return (
    <>
    <table className="container" border='1' >
      <thead>
        <tr>
          <th style={{color:"white",textAlign:"center"}}>{category}</th>
          {column.map((item, index) => <th style={{color:"white",textAlign:"center"}}>{item}</th>)}
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


export default Table