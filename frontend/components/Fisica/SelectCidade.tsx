import { useEffect, useState } from "react";

interface SelectCidadeProps {
    estado: string;
    onChange: (event) => void;
    value: string;
    cidade: string;
}

interface ICidade {
    nome: string;
    codigo_ibge: string;
}

const SelectCidade = ({ estado, onChange, value, cidade }: SelectCidadeProps) => {
    const [cidades, setCidades] = useState<ICidade[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!estado) return; // Evita chamadas desnecessárias quando o estado não está definido

        fetch("https://brasilapi.com.br/api/ibge/municipios/v1/" + estado)
        .then(response => response.json())
        .then(data => {
          setCidades(data);
          if (!cidade) {
            onChange({ target: { value: data[0]?.nome } });
          } else {
            const cidadeCorrespondente = data.find(c => c.nome === cidade);
            if (cidadeCorrespondente) {
              onChange({ target: { value: cidadeCorrespondente.nome } });
            }
          }
        })
        
            .finally(() => setLoading(false)); // Garante que setLoading(false) seja chamado independentemente do resultado
    }, [estado]);

    return (
        <div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Cidade: *</span>
                </label>
                {loading ? (
                    <p>Carregando cidades...</p>
                ) : (
                    <select
                        name="cidade"
                        onChange={onChange}
                        value={value}
                        className="select select-bordered"
                        id="cidade"
                    >
                        {!cidades.length && (
                            <option value="">
                                Selecione um estado antes
                            </option>
                        )}
                        {cidades.map(cidade => (
                            <option key={cidade.codigo_ibge} value={cidade.nome}>
                                {cidade.nome}
                            </option>
                        ))}
                    </select>
                )}
            </div>
        </div>
    );
};

export default SelectCidade;
