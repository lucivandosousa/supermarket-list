import { ChangeEvent, useState } from 'react'
import './App.css'

function App() {
  const [inputText, setInputText] = useState("")
  const [itens, setItens] = useState<Itens[]>([])

  interface Itens {
    id: string
    title: string
  }

  function handleInputItens(e: ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value)
  }

  function saveItem(item: string) {
    if (!item) {
      alert("Adicione um item na lista")
      return
    }

    const newItem = {
      id: crypto.randomUUID(),
      title: item
    }

    setItens([...itens, newItem])
    setInputText("")
  }

  function deleteItem(id: string) {
    setItens( (current) => current.filter((item) => item.id !== id) )
  }

  return (
    <>
      <div>
        <h1>Lista de Supermercado</h1>
        <input type="text" onChange={handleInputItens} value={inputText} />
        <button onClick={() => saveItem(inputText)}>Adicionar</button>
      </div>
      {
        itens.length === 0 ? <p>Sua lista está vazia.</p>
        : 
        <div>
        {
          itens.map((item) => (
            <div key={item.id}>
              <p>{item.title}</p>
              <button onClick={() => deleteItem(item.id)}>X</button>
            </div>
          ))
        }
        </div>
      }
    </>
  )
}

export default App
