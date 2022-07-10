import React, { useMemo } from 'react'
import { getColorByPokemonType, uppercaseFirstLetter } from '../../utils'

type Props = {
  name: string
  order: number
  type: string
  image: string
  onClicked: () => void
}

const Pokemon: React.FC<Props> = ({ name, order, type, image, onClicked }) => {
  const background = useMemo(() => {
    return getColorByPokemonType(type)
  }, [type])
  return (
    <div
      style={{
        backgroundColor: background,
      }}
      onClick={onClicked}
      className={`hover:cursor-pointer py-4 px-8 m-12 flex-auto rounded-xl`}
    >
      <div className="flex justify-start">
        <span className="text-xl font-semibold text-black">{`#${String(
          order,
        ).padStart(3, '0')}`}</span>
      </div>
      <div className="flex justify-center my-4">
        <img src={image} height="120" width="120" />
      </div>
      <div className="text-xl font-semibold text-black">
        {uppercaseFirstLetter(name)}
      </div>
    </div>
  )
}

export default Pokemon
