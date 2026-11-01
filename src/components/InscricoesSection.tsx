import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, UserCheck, Sparkles, Building, Phone, Mail, User } from 'lucide-react';
import { InscriptionData } from '../types';

const INITIAL_INSCRIPTIONS: InscriptionData[] = [
  {
    id: 'insc-1',
    nomeResponsavel: 'Francisco Chagas',
    email: 'chagas.junino@caninde.ce.gov.br',
    telefone: '(85) 98877-6655',
    cidade: 'Canindé',
    nomeGrupo: 'Junina Estrela do Sertão',
    categoriaGrupo: 'Quadrilha Adulta Estilizada',
    tipoParticipacao: 'Circuito Competitivo Oficial',
    dataEnvio: '2025-05-10',
    status: 'Aprovada'
  },
  {
    id: 'insc-2',
    nomeResponsavel: 'Maria Aparecida dos Santos',
    email: 'cidinha.cariri@juazeiro.com.br',
    telefone: '(88) 99765-4321',
    cidade: 'Juazeiro do Norte',
    nomeGrupo: 'Flor de Mandacaru Mirim',
    categoriaGrupo: 'Quadrilha Infantil / Escolar',
    tipoParticipacao: 'Mostra Cultural Livre',
    dataEnvio: '2025-05-12',
    status: 'Aprovada'
  }
];

export const InscricoesSection: React.FC = () => {
  const [inscriptions, setInscriptions] = useState<InscriptionData[]>(() => {
    const saved = localStorage.getItem('ceara_junino_inscriptions');
    return saved ? JSON.parse(saved) : INITIAL_INSCRIPTIONS;
  });

  const [formData, setFormData] = useState({
    nomeResponsavel: '',
    email: '',
    telefone: '',
    cidade: '',
    nomeGrupo: '',
    categoriaGrupo: 'Quadrilha Adulta Estilizada',
    tipoParticipacao: 'Circuito Competitivo Oficial',
  });

  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'formulario' | 'inscritos'>('formulario');

  useEffect(() => {
    localStorage.setItem('ceara_junino_inscriptions', JSON.stringify(inscriptions));
  }, [inscriptions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nomeResponsavel || !formData.email || !formData.telefone || !formData.cidade || !formData.nomeGrupo) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    const newInscription: InscriptionData = {
      id: `insc-${Date.now()}`,
      nomeResponsavel: formData.nomeResponsavel,
      email: formData.email,
      telefone: formData.telefone,
      cidade: formData.cidade,
      nomeGrupo: formData.nomeGrupo,
      categoriaGrupo: formData.categoriaGrupo,
      tipoParticipacao: formData.tipoParticipacao,
      dataEnvio: new Date().toISOString().split('T')[0],
      status: 'Em Análise'
    };

    setInscriptions([newInscription, ...inscriptions]);
    setSubmitted(true);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });

    // Limpar formulário
    setFormData({
      nomeResponsavel: '',
      email: '',
      telefone: '',
      cidade: '',
      nomeGrupo: '',
      categoriaGrupo: 'Quadrilha Adulta Estilizada',
      tipoParticipacao: 'Circuito Competitivo Oficial',
    });
  };

  return (
    <section id="inscricoes" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-amber-900/10 dark:border-stone-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[#3C744D] dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <UserCheck className="w-4 h-4 text-amber-500" />
            Edital Aberto • Temporada 2025
          </div>
          <h2 className="font-display text-3xl sm:text-5xl text-stone-900 dark:text-amber-100 uppercase tracking-wide">
            Inscrições Ceará Junino 2025
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-300 text-base sm:text-lg">
            Cadastre sua quadrilha, grupo de tradição, banda regional ou iniciativa cultural para integrar a programação oficial do festival.
          </p>

          {/* Alternador entre Formulário e Lista de Inscritos */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => setActiveTab('formulario')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'formulario'
                  ? 'bg-[#3C744D] text-[#EFDCAB] shadow-md'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              Formulário de Inscrição
            </button>
            <button
              onClick={() => setActiveTab('inscritos')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'inscritos'
                  ? 'bg-[#3C744D] text-[#EFDCAB] shadow-md'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              <span>Painel de Submissões</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-stone-950">
                {inscriptions.length}
              </span>
            </button>
          </div>
        </div>

        {activeTab === 'formulario' ? (
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-10 border border-amber-900/10 dark:border-stone-800 shadow-xl">
            {submitted ? (
              <div className="text-center py-10 space-y-4 animate-fadeIn">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                <h3 className="font-display text-3xl text-stone-900 dark:text-amber-100">
                  Inscrição Submetida com Sucesso!
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto">
                  A documentação do seu grupo foi recebida pela curadoria do Ceará Junino. Acompanhe o status no Painel de Submissões.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-sm font-semibold hover:bg-stone-50"
                  >
                    Inscrever Outro Grupo
                  </button>
                  <button
                    onClick={() => setActiveTab('inscritos')}
                    className="px-5 py-2.5 rounded-xl bg-[#3C744D] text-[#EFDCAB] text-sm font-semibold shadow-md hover:bg-[#2D5A3C]"
                  >
                    Ver no Painel
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-amber-600" />
                      Nome do Responsável: *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: João da Silva"
                      value={formData.nomeResponsavel}
                      onChange={(e) => setFormData({ ...formData, nomeResponsavel: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2 flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-amber-600" />
                      E-mail para Contato: *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="contato@grupojunino.com.br"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2 flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-amber-600" />
                      Telefone / WhatsApp: *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(85) 99999-9999"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2 flex items-center gap-1.5">
                      <Building className="w-4 h-4 text-amber-600" />
                      Município Sede: *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Canindé, Juazeiro, Fortaleza..."
                      value={formData.cidade}
                      onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      Nome do Grupo / Quadrilha: *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Quadrilha Raio de Luz"
                      value={formData.nomeGrupo}
                      onChange={(e) => setFormData({ ...formData, nomeGrupo: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                      Categoria Artística:
                    </label>
                    <select
                      value={formData.categoriaGrupo}
                      onChange={(e) => setFormData({ ...formData, categoriaGrupo: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Quadrilha Adulta Estilizada">Quadrilha Adulta Estilizada</option>
                      <option value="Quadrilha Adulta Tradicional">Quadrilha Adulta Tradicional</option>
                      <option value="Quadrilha Infantil / Escolar">Quadrilha Infantil / Escolar</option>
                      <option value="Banda Regional / Trio Pé de Serra">Banda Regional / Trio Pé de Serra</option>
                      <option value="Grupo Folclórico (Bumba-meu-boi/Maneiro Pau)">Grupo Folclórico (Bumba-meu-boi/Maneiro Pau)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                      Modalidade Desejada:
                    </label>
                    <select
                      value={formData.tipoParticipacao}
                      onChange={(e) => setFormData({ ...formData, tipoParticipacao: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Circuito Competitivo Oficial">Circuito Competitivo Oficial</option>
                      <option value="Mostra Cultural Livre">Mostra Cultural Livre</option>
                      <option value="Apresentação em Quermesse Comunitária">Apresentação em Quermesse Comunitária</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#3C744D] hover:bg-[#2D5A3C] text-[#EFDCAB] font-display text-xl tracking-wider shadow-lg shadow-green-900/20 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 mx-auto"
                  >
                    <Send className="w-5 h-5 text-amber-300" />
                    Enviar Inscrição Oficial 2025
                  </button>
                  <p className="text-xs text-stone-500 mt-2">
                    A submissão inicial não gera taxas. A comissão julgadora da Secult entrará em contato via e-mail.
                  </p>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Painel de Inscritos Demonstrativo */
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-amber-900/10 dark:border-stone-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
              <h3 className="font-display text-2xl text-stone-900 dark:text-amber-100">
                Inscrições Registradas no Sistema
              </h3>
              <span className="text-xs text-stone-500">
                Total de {inscriptions.length} grupos cadastrados
              </span>
            </div>

            <div className="divide-y divide-stone-100 dark:divide-stone-800">
              {inscriptions.map((insc) => (
                <div key={insc.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base">
                        {insc.nomeGrupo}
                      </h4>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        insc.status === 'Aprovada'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {insc.status}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500">
                      Responsável: <strong>{insc.nomeResponsavel}</strong> • {insc.cidade} • {insc.telefone}
                    </p>
                    <span className="text-xs text-[#3C744D] dark:text-amber-400 font-semibold">
                      {insc.categoriaGrupo} — {insc.tipoParticipacao}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-stone-400 self-start sm:self-center">
                    Enviado em {insc.dataEnvio}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
