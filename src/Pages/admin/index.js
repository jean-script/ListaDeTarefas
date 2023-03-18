import { useState, useEffect } from 'react';
import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth';

import {
    addDoc,
    collection
} from 'firebase/firestore'

import './admin.css';

export default function Admin(){

    const [tarefaInput, setTarefaInput] = useState('');
    const [user, setUser]= useState({});

    useEffect(()=>{

        async function loadTerefas(){

            const userDetail = localStorage.getItem('@detailUser');

            setUser(JSON.parse(userDetail))

        }

        loadTerefas()

    },[])

    async function handleRegister(e){
        e.preventDefault();
        
        if (tarefaInput === '') {
            alert("Digite sua terefa...");
            return
        }

        await addDoc(collection(db, "tarefas"), {
            tarefas: tarefaInput,
            created: new Date(),
            userUid: user?.uid
        })
        .then(()=>{
            console.log("Tarefa Registrada");
            setTarefaInput('');  
        })
        .catch((err)=>{
            console.log("Erro ao cadastrar"+ err);
        })

    }

    async function handleLogount(){
        await signOut(auth);
    }

    return(
        <div className='admin-container'>
            <h1>Minhas tarefas</h1>

            <form className='form' onSubmit={handleRegister}>
                <textarea
                    placeholder='Dgite sua tarefa...'
                    value={tarefaInput}
                    onChange={ (e)=> setTarefaInput(e.target.value) }
                />

                <button className='btn-register' type='submit'>Registrar tarefa</button>
            </form>

            <article className='list'>
                <p>Estudar JavaScript</p>
                <div>
                    <button>Editar</button>
                    <button className='btn-delete'>Concluír</button>
                </div>
            </article>

            <button className='btn-logount' onClick={handleLogount}>Sair</button>
        </div>
    )
}