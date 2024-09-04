import { EstadoOut, EstadoService } from "@/services/estado";
import { useEffect, useState } from "react";

interface SelectEstadoProps {
    onChange: (e: any) => void;
    value: string;
}

interface Regiao {
    id: number;
    sigla: string;
    nome: string;
}

interface IEstado {
    id: number;
    sigla: string;
    nome: string;
    regiao: Regiao;
}



const SelectEstado = ({ onChange, value }: SelectEstadoProps) => {
    const [estados, setEstados] = useState<EstadoOut[]>([]);

    const fetchEstados = async () => {
        const dados = await EstadoService.getEstados();
        setEstados(dados);
    }

    useEffect(() => {
        fetchEstados().then(() => {
            if(value)
                onChange({ target: { value }});
        });          
    }, []);

    return (
        <div>        
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Estado: *</span>
                </label>
                <select 
                    className="select select-bordered" 
                    id="estado"
                    onChange={onChange}
                    value={value}
                    >
                    <option value="" disabled>Selecione um estado</option>
                    {estados
                    .sort((a, b) => a.est_uf.localeCompare(b.est_uf))
                    .map(estado => (
                        <option key={estado.est_id} value={estado.est_uf}>{estado.est_nome}</option>
                    ))}
                </select>
            </div>
        </div>

    );
};

export default SelectEstado;

// https://servicodados.ibge.gov.br/api/v1/localidades/estados