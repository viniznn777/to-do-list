import { useEffect, useState } from "react";
import "./App.css";
import React from "react";
import { IoIosAdd, IoMdTrash } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  let [lista, setLista] = useState([]);
  let [novoItem, setNovoItem] = useState("");

  useEffect(() => {
    setLista([]);
  }, []);

  return (
    <div className="containerAll">
      <h1>Lista de Tarefas</h1>
      <div className="App">
        <div className="containerInput">
          <input
            type="text"
            value={novoItem}
            onChange={(e) => setNovoItem(e.target.value)}
            className="Input"
            placeholder="Adicione uma tarefa"
            id="input"
          />
          <button onClick={() => AddItem()} className="btn-add">
            <IoIosAdd />
          </button>
        </div>
        <ul className="containerLista">
          {lista.length > 0 ? (
            lista.map((item, index) => (
              <li key={index}>
                {item}
                <button onClick={() => deletarItem(index)}>
                  <IoMdTrash />
                </button>
              </li>
            ))
          ) : (
            <p>Adicione uma tarefa 😃</p>
          )}
        </ul>
        <ToastContainer />
      </div>
    </div>
  );

  function AddItem() {
    if (novoItem.length <= 0) {
      errorToADD("Por favor, adicione uma tarefa!");
      document.querySelector(".Input").focus();
      return;
    }

    let itemIndex = lista.indexOf(capitalizeItem(novoItem));
    if (itemIndex >= 0) {
      errorToADD("Ops 🤪, parece que você já adicionou esta tarefa!");
      return;
    }

    setLista([...lista, capitalizeItem(novoItem)]);
    setNovoItem("");
    successADD("Tarefa adicionada");
    document.querySelector(".Input").focus();
  }

  function deletarItem(index) {
    let tempArray = [...lista];
    tempArray.splice(index, 1);
    setLista(tempArray);
    successADD("Tarefa removida ✔");
  }

  function capitalizeItem(string) {
    return `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;
  }

  function successADD(string) {
    toast.success(`${string}`, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  function errorToADD(string) {
    toast.error(`${string}`, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
}

export default App;
