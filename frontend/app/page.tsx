'use client';
import React, { useState } from 'react';
import GerenciarPessoas from './GerenciarPessoas/page';
import ReceberDoacao from './ReceberDoacao/page';
import { HiMenu } from "react-icons/hi";

export default function Home() {
  const [menuOption, setMenuOption] = useState('');

  return (
    <>
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content mt-3">
        <label htmlFor="my-drawer" className="btn btn-ghost drawer-button"><HiMenu className='size-7'/></label>
        {!menuOption && <h1 className="text-2xl font-bold no-underline hover:underline cursor-default text-center">SSABA-APP</h1>}
        {menuOption === 'gerenciarPessoas' && <GerenciarPessoas />}
        {menuOption === 'receberDoacao' && <ReceberDoacao setMenuOption = {setMenuOption}/>}
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="flex menu p-4 w-80 min-h-full bg-base-200 text-base-content gap-4">
          <p className="text-2xl font-bold no-underline hover:underline cursor-default text-center">SSABA-APP</p>
          <li><a className='btn btn-sm btn-outline btn-info' onClick={() => setMenuOption('gerenciarPessoas')}>Gerenciar Pessoas</a></li>
          <li><a className='btn btn-sm btn-outline btn-info' onClick={() => setMenuOption('receberDoacao')}>Cadastrar Doação</a></li>
        </ul>
      </div>
    </div>
      <div>
        
      </div>
    </>
  );
}
