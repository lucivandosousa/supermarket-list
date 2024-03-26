import { ChangeEvent, useEffect, useState } from 'react'
import './App.css'
import { FaCheck, FaTrashAlt } from "react-icons/fa"

function App() {
  const [inputText, setInputText] = useState("")
  const [itens, setItens] = useState<Itens[]>(() => {
    const newState = localStorage.getItem("lista-compras")
    if (!newState) {return []}
    return JSON.parse(newState)
  })

  useEffect(() => {
    localStorage.setItem('lista-compras', JSON.stringify(itens));
  }, [itens])
  interface Itens {
    id: string
    title: string
    check: boolean
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
      title: item,
      check: false
    }

    setItens(current => {
      const newState = [...current, newItem]
      localStorage.setItem("lista-compras", JSON.stringify(newState))
      return newState
    })
    setInputText("")
  }

  function deleteItem(id: string) {
    setItens(
      (current) => current.filter((item) => item.id !== id)
    )
  }

  function setCheckItens(id: string) {
    setItens(
      (current) => current.map((item) => item.id === id ? { ...item, check: !item.check } : item )
    )
  }

  return (
    <div className="container">

      <h1>Lista de Supermercado</h1>
      <input type="text" onChange={handleInputItens} value={inputText} placeholder='adicione um item...'/>
      <button onClick={() => saveItem(inputText)}>Adicionar</button>

      {itens.length === 0 && <p className="empity-list">Sua lista de compras está vazia.</p>}
      {
        itens.map((item) => (
          <div key={item.id} className="itens-list">
            <p className={item.check ? "itemCheck" : ""}>{item.title}</p>
            <div>
              <button onClick={() => setCheckItens(item.id)}><FaCheck /></button>
              <button onClick={() => deleteItem(item.id)}><FaTrashAlt /></button>
            </div>
          </div>
        ))
      }

    </div>
  )
}

export default App
