import "../globals.css"
import DoacaoForm from "@/components/Doacao/DoacaoForm";
import { useEffect, useState } from "react";
import FisicaService, { FisicaOut } from "@/services/fisica";
import { ProdutoOut, ProdutoService } from "@/services/produto";
import TabelaDoacoes from "@/components/Doacao/TabelaDoacoes";
import { DoacaoOut, DoacaoService } from "@/services/doacao";
import RegistrarDoacao from "@/components/Doacao/RegistrarDoacao";

interface ReceberDoacaoProps {
    setMenuOption: (option: string) => void;
}

const ReceberDoacao = ({ setMenuOption }: ReceberDoacaoProps) => {
    const [fisicas, setFisicas] = useState<FisicaOut[]>([]);
    const [produtos, setProdutos] = useState<ProdutoOut[]>([]);
    const [doacoes, setDoacoes] = useState<DoacaoOut[]>([]);
    const [novaDoacao, setNovaDoacao] = useState(false);

    useEffect(() => {
        fetchFisicas();
        fetchProdutos();
        fetchDoacoes();
    }, []);

    const fetchFisicas = async () => {
        const data = await FisicaService.getFisicas();
        setFisicas(data);
    };

    const fetchProdutos = async () => {
        const data = await ProdutoService.getProdutos();
        setProdutos(data);
    }

    const fetchDoacoes = async () => {
        const data = await DoacaoService.getDoacoes();
        setDoacoes(data);
    }

    const removerDoacao = async (id: number) => {
        const result = await DoacaoService.removerDoacao(id);
        if(result)
            fetchDoacoes();
    }
    useEffect(() => {
        if(novaDoacao) {
            fetchDoacoes();
            setNovaDoacao(false);
        }
    },[novaDoacao])

    return (
        <main className="max-w-4xl mx-auto mt-4">
            <div className="text-center my-5 flex flex-col gap-5">
                <h1 className="text-2xl font-bold">Doações recebidas</h1>
                <TabelaDoacoes removerDoacao={removerDoacao} setMenuOption={setMenuOption} doadores={fisicas} produtos={produtos} doacoes={doacoes} />
                <RegistrarDoacao setNovaDoacao={setNovaDoacao} setMenuOption={setMenuOption} produtos={produtos} doadores={fisicas}/>
            </div>
            
        </main>
    );
};

export default ReceberDoacao;