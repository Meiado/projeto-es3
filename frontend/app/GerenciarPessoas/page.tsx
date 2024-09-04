import CadastrarPessoa from "@/components/Fisica/CadastrarPessoa";
import ListaPessoasFisicas from "@/components/Fisica/ListaPessoasFisicas";
import FisicaService, { FisicaOut } from "@/services/fisica";
import { useEffect, useState } from "react";
import "../globals.css";

const GerenciarPessoas = () => {
    const [fisicas, setFisicas] = useState<FisicaOut[]>([]);

    useEffect(() => {
        fetchFisicas();
    }, []);

    const fetchFisicas = async () => {
        const data = await FisicaService.getFisicas();
        setFisicas(data);
    };

    return (
        <main className="max-w-4xl mx-auto mt-4">
        <div className="text-center my-5 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Gerenciamento de pessoas</h1>
            <CadastrarPessoa fetchFisicas={fetchFisicas}/>
        </div>
        <ListaPessoasFisicas fisicas={fisicas} fetchFisicas={fetchFisicas} />      
        </main>
    );
}

export default GerenciarPessoas;