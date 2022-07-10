import { useEffect, useRef, useState } from 'react'
import { apiService } from './api'
import './App.scss'
import InfiniteScroll from 'react-infinite-scroll-component'
import Header from './components/Header'
import Pokemon from './components/Pokemon'
import PokemonDetail from './components/PokemonDetail'
export type PokemonType = {
  height: number
  weight: number
  stats: {
    base_stat: number
    stat: { name: string }
  }[]
  abilities: {
    ability: {
      name: string
    }
  }[]
  name: string
  order: number
  types: {
    type: {
      name: string
    }
  }[]
  sprites: {
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
}

function App() {
  const offset = useRef(0)
  const [listPokemon, setListPokemon] = useState<PokemonType[]>([])
  const [viewingPokemon, setViewingPokemon] = useState<PokemonType | null>(null)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    getPokemonData()
  }, [])

  const getPokemonData = async () => {
    try {
      const {
        data: { results },
      } = await apiService.get<{ results: { url: string; name: string }[] }>(
        `?limit=20&offset=${offset.current}`,
      )
      const pokemon = await Promise.all(
        results.map(({ name }) => {
          return apiService.get<PokemonType>(`/${name}`)
        }),
      )
      const mappedPokemon = pokemon.map((response) => response.data)
      if (offset.current > 0) {
        setListPokemon((oldList) => [...oldList, ...mappedPokemon])
      } else {
        setListPokemon(mappedPokemon)
      }
    } catch (error) {
      console.log('error ::: ', error)
    }
  }

  return (
    <div className="App justify-center bg-bg-color">
      <Header />
      <InfiniteScroll
        hasMore={listPokemon.length < 1154}
        loader={null}
        next={() => {
          offset.current += 1
          getPokemonData()
        }}
        dataLength={listPokemon.length}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="flex flex-wrap">
          {listPokemon.map((poke) => {
            const { name, order, sprites, types } = poke
            return (
              <Pokemon
                onClicked={() => {
                  setOpenModal(true)
                  setViewingPokemon(poke)
                }}
                order={order}
                key={order}
                name={name}
                type={types[0].type.name}
                image={sprites.other['official-artwork'].front_default}
              />
            )
          })}
        </div>
      </InfiniteScroll>
      <PokemonDetail
        pokemon={viewingPokemon}
        openModal={openModal}
        onRequestClose={() => {
          setOpenModal(false)
          setViewingPokemon(null)
        }}
      />
    </div>
  )
}

export default App
