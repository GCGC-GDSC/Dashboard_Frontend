import { useState, useEffect } from "react";
import Card from "./Card";
import result from "./localDB2"
import "./Fetcher2.scss"

function Fetcher2() {

    useEffect(() => {
        getCompanyList()
    },[])
//   const [allUsers, setAllUsers] = useState([]);
//   const [users, setUsers] = useState([]);

//   *********
const [dictState,setDictState] = useState([])
const [companySetState, setCompanySetState] = useState(new Set())


const getCompanyList = () => {

  let companySet = new Set() 
  let dict = [];
    const { vskp, blr, hyd } = result;
    console.log(vskp);
    console.log(blr);
    console.log(hyd);
    for (let inst in vskp) {
      let institute = vskp[inst];
      console.log(institute.length);

      for(let i=0;i<institute[0].length;i++){
      companySet.add(institute[0][i].name_of_the_company)
      dict.push({
        name_of_the_company:  institute[0][i].name_of_the_company ,
        profile_offered: institute[0][i].profile_offered,
        package:institute[0][i].package,
    });}
    }
    for (let inst in blr) {
      let institute = blr[inst];
      console.log(institute.length);
      for(let i=0;i<institute[0].length;i++){
        companySet.add(institute[0][i].name_of_the_company)
        dict.push({
          name_of_the_company:  institute[0][i].name_of_the_company ,
          profile_offered: institute[0][i].profile_offered,
          package:institute[0][i].package,
      });}
    }
    for (let inst in hyd) {
      let institute = hyd[inst];
      console.log(institute.length);

      for(let i=0;i<institute[0].length;i++){
        companySet.add(institute[0][i].name_of_the_company)
        dict.push({
          name_of_the_company:  institute[0][i].name_of_the_company ,
          profile_offered: institute[0][i].profile_offered,
          package:institute[0][i].package,
      });}
    }

    console.log(companySet);
    setCompanySetState(companySet)
    setDictState(dict)
    console.log("😉😉😉😉");
    console.log(dict);


  
    

}

const filterCards = event => {
  const value = event.target.value.toLowerCase();
  const filteredUsers = Array.from(companySetState).filter((comp) => {
    return comp === value
  });
  console.log("😭😭😭",filteredUsers);
  setDictState(filteredUsers);
}

  return (
    <div className="App">
      <h1>Company Cards</h1>
      <input className="search-box" onInput={filterCards} placeholder="Search..."/>
      <div className="cards-container">
       { dictState.map((company, index) => 
          <Card key={`company-${index}`} index={index} company={company} companySet={companySetState}/>
        )}
      
      </div>
    </div>
  );
}

export default Fetcher2;