import { useEffect, useState } from "react";
import "./App.css";
import React from "react";
import { IoIosAdd, IoMdTrash } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  let [lista, setLista] = useState([]);
  {
    /* Setada uma lista e estado com o useState */
  }
  let [novoItem, setNovoItem] = useState("");
  {
    /* Setado onde o novo item será colocado */
  }

  useEffect(() => {
    setLista([]);
  }, []);
  {
    /* useEffect para atualizar a lista quando o valor mudar */
  }

  return (
    <div className="containerAll">
      <h1>Lista de Tarefas</h1>
      <div className="App">
        <div className="containerInput">
          {/* input onde contém o onChange setando o novo valor para a variável {novo item} através do estado setNovoItem */}
          <input
            type="text"
            value={novoItem}
            onChange={(e) => setNovoItem(e.target.value)}
            className="Input"
            placeholder="Adicione uma tarefa"
            id="input"
          />
          {/* Ao clicar é passado uma função a ser chamada com uma arrow function */}
          <button onClick={() => AddItem()} className="btn-add">
            <IoIosAdd />
          </button>
        </div>
        <ul className="containerLista">
          {/* Se tiver valor na lista será mostrado o item com uma função através do map. Caso não tenha valor será mostrado um paragrafo com uma frase "Adicione uma tarefa" */}
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
        <ToastContainer />{" "}
        {/* lib Toastify para indicar o sucesso ao adicionar ou remover itens da lista */}
      </div>
    </div>
  );

  function AddItem() {
    if (novoItem.length <= 0) {
      errorToADD("Por favor, adicione uma tarefa!");
      document.querySelector(".Input").focus();
      return;
      {
        /* bloco para verificar se o input está vazio, caso esteja vazio será mostrado uma mensagem de alerta para o usuário. */
      }
    }

    let itemIndex = lista.indexOf(capitalizeItem(novoItem));
    if (itemIndex >= 0) {
      errorToADD("Ops 🤪, parece que você já adicionou esta tarefa!");
      {
        /* bloco para verificar se o valor inserido pelo usuário já está na lista, caso seja verdadeira será mostrado uma mensagem de alerta para o usuário. */
      }
      return;
    }
    {
      /* bloco de função para se caso as outras verificações acima for falsa ele executará a adição do item normalmente */
    }
    setLista([...lista, capitalizeItem(novoItem)]);
    {
      /* setLista terá o valor que já tinha antes, mais o novo que foi adicionado na variável novoItem */
    }
    setNovoItem("");
    successADD("Tarefa adicionada");
    document.querySelector(".Input").focus();
  }

  {
    /* Função com o parâmetro de (index) para saber qual item será removido da lista. */
  }
  function deletarItem(index) {
    let tempArray = [...lista];
    {
      /* lista temporária que contém todos os valores da lista */
    }
    tempArray.splice(index, 1);
    {
      /* deletando o item através do index do item e passando novamente o valor "tempArray" para o setLista, já com o valor deletado. */
    }
    setLista(tempArray);
    successADD("Tarefa removida ✔");
  }

  function capitalizeItem(string) {
    return `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;
    {
      /* Função para deixar os valores da lista em capitalize */
    }
  }

  {
    /* Bloco abaixo são as funções para mostrar as mensagens de sucesso ou erro com o parâmetro "string", que é a mensagem que será mostrada para o usuário na toast */
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
