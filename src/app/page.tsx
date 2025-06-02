"use client";

import React, { useState } from "react";
import dados, { TarefaInterface } from "@/data";
import Cabecalho from "@/componentes/Cabecalho";
import ModalTarefa from "@/componentes/Add_tarefa";

interface TarefaProps {
  titulo: string;
  concluido?: boolean;
}

const Tarefa: React.FC<TarefaProps> = ({ titulo, concluido }) => {
  const [estaConcluido, setEstaConcluido] = useState(concluido);

  const classe = `p-3 mb-3 rounded-lg shadow-md hover:cursor-pointer hover:border ${
    estaConcluido
      ? "bg-gray-800 hover:border-gray-800"
      : "bg-gray-400 hover:border-gray-400"
  }`;

  const escutarClique = () => {
    setEstaConcluido(!estaConcluido);
  };

  return (
    <div className={classe} onClick={escutarClique}>
      <h3 className="text-xl font-bold">{titulo}</h3>
      <p className="text-sm">{estaConcluido ? "Concluída" : "Pendente"}</p>
    </div>
  );
};

interface TarefasProps {
  dados: TarefaInterface[];
}

const Tarefas: React.FC<TarefasProps> = ({ dados }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {dados.map((tarefa) => (
        <Tarefa
          key={tarefa.id}
          titulo={tarefa.title}
          concluido={tarefa.completed}
        />
      ))}
    </div>
  );
};



const Home = () => {
  const [tarefas, setTarefas] = useState<TarefaInterface[]>(dados);
  const [mostrarModal, setMostrarModal] = useState(false);

  const adicionarTarefa = (titulo: string) => {
    const novaTarefa: TarefaInterface = {
      id: Date.now(),
      title: titulo,
      completed: false,
    };
    setTarefas((prev) => [novaTarefa, ...prev]);
  };

  return (
    <div className="container mx-auto p-4">
      <Cabecalho />
      <button
        className="mb-4 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
        onClick={() => setMostrarModal(true)}
      >
        Nova Tarefa
      </button>
      {mostrarModal && (
        <ModalTarefa
          onFechar={() => setMostrarModal(false)}
          onAdicionar={adicionarTarefa}
        />
      )}
      <Tarefas dados={tarefas} />
    </div>
  );
};

export default Home;