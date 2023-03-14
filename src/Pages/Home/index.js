import { useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

export default function Home(){

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleLogin(e){
    e.preventDefault();

    if(email !== "" && senha !== ''){
      alert('teste')
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
          autoComplete={false}
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
