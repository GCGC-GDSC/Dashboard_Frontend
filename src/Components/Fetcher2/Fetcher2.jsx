import React from "react"
import { useState, useEffect } from "react";
import Card from "./Card";
import result from "./localDB2"
import "./Fetcher2.scss"
import BasicTabs from "../Tabs/Tabs"

function Fetcher2() {
  
//   const [allUsers, setAllUsers] = useState([]);
//   const [users, setUsers] = useState([]);
//   *********
const [dictState,setDictState] = useState([])
const [filterState,setFilterState] = useState([])
const [companySetState, setCompanySetState] = useState(new Set())


const getCompanyList = () => {

  let companySet = new Set() 
  let dict = [];
    const { vskp, blr, hyd } = result;
    // console.log(vskp);
    // console.log(blr);
    // console.log(hyd);
    for (let inst in vskp) {
      let institute = vskp[inst];
      // console.log(institute.length);

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
      // console.log(institute.length);
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
      // console.log(institute.length);

      for(let i=0;i<institute[0].length;i++){
        companySet.add(institute[0][i].name_of_the_company)
        dict.push({
          name_of_the_company:  institute[0][i].name_of_the_company ,
          profile_offered: institute[0][i].profile_offered,
          package:institute[0][i].package,
      });}
    }

    // console.log(companySet);
    // ----------------------------------- batch updates
    setCompanySetState(companySet)
    setDictState(dict)
    setFilterState(dict)
    // ---------------------------------------


  
    

}

const filterCards = event => {
  const value = event.target.value.toLowerCase();
  // console.log(value)
  const filteredUsers = dictState.filter(comp=>{ 
    return comp.name_of_the_company.toLowerCase().includes(value)
  });
  // console.log("😭😭😭",filteredUsers);
  setFilterState(filteredUsers);
}
useEffect(() => {
  getCompanyList()
},[])
  return (
    <>
    <BasicTabs/>
    <div className="App">
      {/* {console.log('rendered')}
      <h1>Company Cards</h1>
      <input className="search-box" onChange={filterCards} placeholder="Search..."/>
      <div className="cards-container">
       { filterState.map((company, index) =>
          <Card key={`company-${index}`} index={index} company={company} />
        )}
      
      </div> */}
    </div>
    </>
  );
}

export default Fetcher2;