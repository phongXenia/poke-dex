import React from 'react'
import Pokedx from '../../assets/images/pokedex.png'

const Header: React.FC = () => {
  return (
    <div className="flex justify-center py-12">
      <img src={Pokedx} width="300" height="400" />
    </div>
  )
}

export default Header
