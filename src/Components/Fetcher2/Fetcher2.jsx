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

    for (let inst in vskp) {
      let institute = vskp[inst];

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
      for(let i=0;i<institute[0].length;i++){
        companySet.add(institute[0][i].name_of_the_company)
        dict.push({
          name_of_the_company:  institute[0][i].name_of_the_company ,
          profile_offered: institute[0][i].profile_offered,
          package:institute[0][i].package,
      });}
    }

    // ----------------------------------- batch updates
    setCompanySetState(companySet)
    setDictState(dict)
    setFilterState(dict)
    // ---------------------------------------


  
    

}

const filterCards = event => {
  const value = event.target.value.toLowerCase();
  const filteredUsers = dictState.filter(comp=>{ 
    return comp.name_of_the_company.toLowerCase().includes(value)
  });
  setFilterState(filteredUsers);
}
useEffect(() => {
  getCompanyList()
},[])
  return (
    <>
    <BasicTabs/>
    <div className="App">
      
    </div>
    </>
  );
}

export default Fetcher2;