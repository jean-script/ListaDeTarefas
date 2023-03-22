import { useState, useEffect } from 'react';
import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth';

import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
    deleteDoc,
    updateDoc
} from 'firebase/firestore'

import './admin.css';

export default function Admin(){

    const [tarefaInput, setTarefaInput] = useState('');
    const [user, setUser]= useState({});
    const [tarefas, setTarefa] = useState([]);
    const [edit, setEdit] = useState({}) ;

    useEffect(()=>{

        async function loadTerefas(){

            const userDetail = localStorage.getItem('@detailUser');

            setUser(JSON.parse(userDetail))

            if(userDetail){

                const data = JSON.parse(userDetail);

                const tarefaRef = collection(db, "tarefas");

                const q = query(tarefaRef, orderBy("created", 'desc'), where("userUid","==",data?.uid))

                const unsub = onSnapshot(q, (snapshot)=>{
                    let lista = [];

                    snapshot.forEach((doc)=>{
                        lista.push({
                            id:doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid
                        })
                    })

                    setTarefa(lista)
                })


            }

        }

        loadTerefas()

    },[])

    async function handleRegister(e){
        e.preventDefault();
        
        if (tarefaInput === '') {
            alert("Digite sua terefa...");
            return
        }

        if(edit?.id){
            handleUpdateTarefa();
            return;
        }

        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefaInput,
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

    async function deletaTarefa(id){
        
        const docRef = doc(db, "tarefas", id)
        await deleteDoc(docRef);

    }

    async function editTarefa(item){
        console.log(item)
        setTarefaInput(item.tarefa)
        setEdit(item);
    }

    async function handleUpdateTarefa(){
        const docRef = doc(db, "tarefas",edit?.id)
        await updateDoc(docRef, {
            tarefa:tarefaInput
        })
        .then(()=>{
            console.log("Tarefa atualizada");
            setTarefaInput('');
            setEdit({})
        })
        .catch(()=>{
            console.log("Erro ao atualizar");
            setTarefaInput('');
            setEdit({});
        })
    }

    return(
        <div className='admin-container'>
            <h1>Minhas tarefas</h1>

            <form className='form' onSubmit={handleRegister}>
                <textarea
                    placeholder='Digite sua tarefa...'
                    value={tarefaInput}
                    onChange={ (e)=> setTarefaInput(e.target.value) }
                />

                {Object.keys(edit).length > 0 ? (
                    <button className='btn-register' type='submit'>Atualizar tarefa</button>
                ) : (
                    <button className='btn-register' type='submit'>Registrar tarefa</button>
                )}
            </form>

           {tarefas.map((item)=>{
            return(
                <article className='list' key={item.id}>
                    <p>{item.tarefa}</p>
                    <div>
                        <button onClick={()=>editTarefa(item)} >Editar</button>
                        <button onClick={()=> deletaTarefa(item.id)} className='btn-delete'>Concluír</button>
                    </div>
                </article>
            )
           })}

            <button className='btn-logount' onClick={handleLogount}>Sair</button>
        </div>
    )
}