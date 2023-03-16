import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.css';


import { auth } from '../../firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Home(){

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e){
    e.preventDefault();

    if(email !== "" && senha !== ''){
      
      await signInWithEmailAndPassword(auth, email, senha)
      .then(()=>{
        /// navegar para admin
        navigate('/admin', {
          replace:true
        })

      })
      .catch(()=>{
        console.log("Erro ao fazer o login");
      })

    }else {
      alert('preencha todos os campos')
    }
  }

  return(
    <div className='home-container'>
      <h1>Lista de tarefas</h1>
      <span>Gerencie sua agenda de forma fácil</span>

      <form className='form' onSubmit={handleLogin}>

        <input
          type="text"
          placeholder='Digite seu email...'
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder='*******'
          value={senha}
          onChange={(e)=> setSenha(e.target.value)}
        />

        <button type='submit'>Acessar</button>

      </form>

      <Link to="/register" className='button-link'>Não possui uma conta? Cadastre-se</Link>

    </div>
  )
}
