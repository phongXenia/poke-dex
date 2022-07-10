import React from 'react'
import Modal from 'react-modal'
import { PokemonType } from '../../App'
import { getColorByPokemonType, uppercaseFirstLetter } from '../../utils'

type Props = {
  openModal: boolean
  onRequestClose: () => void
  pokemon: PokemonType | null
}

Modal.setAppElement('#root')

const PokemonDetail: React.FC<Props> = ({
  onRequestClose,
  openModal,
  pokemon,
}) => {
  return (
    <Modal
      style={{
        overlay: {
          backgroundColor: '#16171f',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        },
        content: {
          backgroundColor: `rgba(255,255,255,0)`,
          border: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
      isOpen={openModal}
    >
      <div
        className="w-3/4 rounded-lg px-8 py-12 flex items-center relative"
        style={{
          backgroundColor: getColorByPokemonType(
            pokemon ? pokemon.types[0].type.name : 'white',
          ),
        }}
      >
        <div
          className="flex flex-col justify-center items-center px-2 py-8 rounded-lg mt-2 mr-8"
          style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
        >
          <div className="font-semibold">{`#${String(pokemon?.order).padStart(
            3,
            '0',
          )}`}</div>
          <div className="font-semibold">
            {uppercaseFirstLetter(pokemon?.name || '')}
          </div>
          <img
            src={pokemon?.sprites.other['official-artwork'].front_default}
            width="150"
            height="150"
          />
          <div className="mt-8">
            Height: <span>{pokemon?.height}</span>
          </div>
          <div className="mt-8">
            Weight: <span>{pokemon?.weight}</span>
          </div>
        </div>
        <div>
          <div
            className="absolute top-5 right-5 cursor-pointer"
            onClick={onRequestClose}
          >
            X
          </div>
          <div className="text-2xl font-medium">Abilities</div>
          <div
            className="flex items-center px-2 py-8 rounded-lg mt-2"
            style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
          >
            {pokemon?.abilities.map(({ ability }) => (
              <div className="mr-4" key={ability.name}>
                {uppercaseFirstLetter(ability.name)}
              </div>
            ))}
          </div>
          <div className="text-2xl font-medium mt-6">Stat</div>
          <div
            className="flex items-center px-2 py-8 rounded-lg mt-2 justify-between flex-wrap"
            style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
          >
            {pokemon?.stats.map(({ base_stat, stat }) => (
              <div key={stat.name} className="flex flex-col items-center m-5">
                <div className="text-lg font-semibold text-red-400">
                  {stat.name.toUpperCase()}
                </div>
                <div className="text-lg text-black">{base_stat}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default PokemonDetail
