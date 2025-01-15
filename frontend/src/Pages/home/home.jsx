import React, { useState } from 'react'
import './home.css'
import Header from '../../Components/Header/Header'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay'
import AppDown from '../../Components/AppDown/AppDown'

const home = () => {
    const [category, setCategory] = useState("All")

  return (
    <div>
      <Header/>
      <ExploreMenu setCategory={setCategory} category={category}/>
      <FoodDisplay category = {category}/>
      <AppDown/>
    </div>
  )
}

export default home
