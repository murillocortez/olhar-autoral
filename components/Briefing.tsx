import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Send } from 'lucide-react';
import Logo from './Logo';
import { supabase } from '../supabaseClient';

interface BriefingProps {
  onBack: () => void;
}

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  focusedField: string | null;
  setFocusedField: (name: string | null) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

// Extracted Component: InputField
const InputField: React.FC<FieldProps> = ({
  label,
  name,
  value,
  onChange,
  focusedField,
  setFocusedField,
  type = "text",
  placeholder = "",
  required = true
}) => {
  const hasValue = value && value.length > 0;
  const isActive = focusedField === name || hasValue;

  return (
    <div className="relative group mb-10 md:mb-12">
      <label
        htmlFor={name}
        className={`absolute left-0 transition-all duration-300 pointer-events-none uppercase tracking-[0.2em] font-medium
          ${isActive
            ? '-top-6 text-neutral-300 text-[10px]'
            : 'top-3 text-neutral-400 text-sm'}
        `}
      >
        {label} {required && <span className="text-neutral-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={focusedField === name ? placeholder : ""}
        onFocus={() => setFocusedField(name)}
        onBlur={() => setFocusedField(null)}
        className="w-full bg-transparent border-b border-neutral-700 py-3 text-white font-sans text-lg font-light focus:outline-none focus:border-white transition-colors duration-500 placeholder-neutral-600 autofill:bg-transparent"
      />
      {/* Bottom Glow Line on Focus */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focusedField === name ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="absolute bottom-0 left-0 w-full h-[1px] bg-white origin-left"
      />
    </div>
  );
};

// Extracted Component: TextAreaField
const TextAreaField: React.FC<FieldProps> = ({
  label,
  name,
  value,
  onChange,
  focusedField,
  setFocusedField,
  rows = 3,
  placeholder = ""
}) => {
  const hasValue = value && value.length > 0;
  const isActive = focusedField === name || hasValue;

  return (
    <div className="relative group mb-12">
      <label
        htmlFor={name}
        className={`absolute left-0 transition-all duration-300 pointer-events-none uppercase tracking-[0.2em] font-medium
          ${isActive
            ? '-top-6 text-neutral-300 text-[10px]'
            : 'top-3 text-neutral-400 text-sm'}
        `}
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={focusedField === name ? placeholder : ""}
        onFocus={() => setFocusedField(name)}
        onBlur={() => setFocusedField(null)}
        className="w-full bg-transparent border-b border-neutral-700 py-3 text-white font-sans text-lg font-light focus:outline-none focus:border-white transition-colors duration-500 resize-none placeholder-neutral-600 leading-relaxed"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focusedField === name ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="absolute bottom-0 left-0 w-full h-[1px] bg-white origin-left"
      />
    </div>
  );
};

const Briefing: React.FC<BriefingProps> = ({ onBack }) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const nome = formData.get('nome') as string;
    const email = formData.get('email') as string;

    // Validação básica
    if (!nome || !email) {
      alert("Por favor, preencha o nome e o e-mail.");
      setIsSubmitting(false);
      return;
    }

    // Coleta dos dados mapeados para a tabela do Supabase
    const data = {
      nome: nome,
      profissao: formData.get('profissao') as string,
      email: email,
      telefone: formData.get('telefone') as string,
      objetivo: formData.get('objetivo') as string,
      descricao_fundamento: formData.get('descricao') as string,
      desejo_fotografico: formData.get('como_ser_visto') as string,
      referencias: formData.get('referencias') as string,
    };

    try {
      const { error } = await supabase.from('briefings').insert(data);

      if (error) {
        console.error('Erro ao enviar briefing:', error);
        alert("Ocorreu um erro ao enviar o briefing. Por favor, tente novamente.");
      } else {
        // Tenta enviar a notificação por e-mail (não bloqueia o sucesso do usuário se falhar)
        try {
          await supabase.functions.invoke('send-briefing-notification', {
            body: { record: data }
          });
        } catch (notifyError) {
          console.error('Erro ao enviar notificação:', notifyError);
        }

        setIsSent(true);
      }
    } catch (err) {
      console.error('Erro inesperado:', err);
      alert("Ocorreu um erro inesperado. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSent) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 text-center"
      >
        <Logo variant="symbol" className="w-16 h-16 text-white mb-8" />
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Briefing enviado com sucesso.</h2>
        <p className="text-neutral-300 text-lg max-w-md font-light mb-12">
          Obrigado por compartilhar sua visão.
        </p>
        <button
          onClick={onBack}
          className="uppercase tracking-[0.2em] text-xs text-white border-b border-white/30 pb-1 hover:border-white transition-colors"
        >
          Voltar ao site
        </button>
      </motion.div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-neutral-950 text-neutral-100 pt-24 pb-32 px-6 md:px-12"
    >
      <div className="max-w-3xl mx-auto">

        {/* Nav Back */}
        <button
          onClick={onBack}
          className="group flex items-center gap-3 text-neutral-400 hover:text-white transition-colors mb-16"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-[0.2em] text-xs">Voltar</span>
        </button>

        {/* Header */}
        <div className="mb-16 md:mb-24 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Logo variant="symbol" className="w-14 h-14 mx-auto text-neutral-700 mb-8" />
            <h1 className="font-serif text-4xl md:text-6xl text-white mb-6">
              Briefing Personalizado
            </h1>
            <p className="text-neutral-300 font-light text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
              Me conte sobre você e sobre o que deseja criar.
            </p>
          </motion.div>
        </div>

        {/* Form */}
        <motion.form
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-12"
        >
          {/* Section: Identity */}
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-neutral-500 block mb-8 font-semibold">01. Identidade</span>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
              <InputField
                label="Nome Completo"
                name="nome"
                value={formValues['nome'] || ''}
                onChange={handleInputChange}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              />
              <InputField
                label="Profissão / Cargo"
                name="profissao"
                required={false}
                value={formValues['profissao'] || ''}
                onChange={handleInputChange}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
              <InputField
                label="E-mail"
                name="email"
                type="email"
                value={formValues['email'] || ''}
                onChange={handleInputChange}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              />
              <InputField
                label="Telefone / WhatsApp"
                name="telefone"
                type="tel"
                value={formValues['telefone'] || ''}
                onChange={handleInputChange}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              />
            </div>
          </div>

          {/* Section: Vision */}
          <div className="space-y-4 pt-8 border-t border-neutral-800">
            <span className="text-xs uppercase tracking-widest text-neutral-500 block mb-8 font-semibold">02. Visão & Intenção</span>

            <InputField
              label="Objetivo do Ensaio / Evento"
              name="objetivo"
              placeholder="Ex: Reposicionamento de marca, registro de show..."
              value={formValues['objetivo'] || ''}
              onChange={handleInputChange}
              focusedField={focusedField}
              setFocusedField={setFocusedField}
            />

            <TextAreaField
              label="Descrição da Intenção Criativa"
              name="descricao"
              rows={4}
              placeholder="Qual atmosfera você imagina? Que sentimentos queremos despertar?"
              value={formValues['descricao'] || ''}
              onChange={handleInputChange}
              focusedField={focusedField}
              setFocusedField={setFocusedField}
            />

            <TextAreaField
              label="Como você deseja ser visto na fotografia?"
              name="como_ser_visto"
              rows={2}
              placeholder="Ex: Forte, vulnerável, autêntico, misterioso..."
              value={formValues['como_ser_visto'] || ''}
              onChange={handleInputChange}
              focusedField={focusedField}
              setFocusedField={setFocusedField}
            />
          </div>

          {/* Section: References */}
          <div className="space-y-4 pt-8 border-t border-neutral-800">
            <span className="text-xs uppercase tracking-widest text-neutral-500 block mb-8 font-semibold">03. Referências</span>
            <InputField
              label="Link para Referências Visuais"
              name="referencias"
              required={false}
              placeholder="Pinterest, Drive, Instagram ou Site"
              value={formValues['referencias'] || ''}
              onChange={handleInputChange}
              focusedField={focusedField}
              setFocusedField={setFocusedField}
            />
            <p className="text-xs text-neutral-500 mt-2 font-light">
              * Caso prefira, podemos construir o moodboard juntos após esta etapa.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-12 flex justify-center">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.8)" }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-4 px-12 py-5 border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="uppercase tracking-[0.25em] text-sm text-neutral-300 group-hover:text-white transition-colors font-medium">
                {isSubmitting ? 'Preparando...' : 'Enviar Briefing'}
              </span>
              {!isSubmitting && <Send size={16} className="text-neutral-400 group-hover:text-white transition-colors" />}
            </motion.button>
          </div>
        </motion.form>

      </div>
    </motion.section>
  );
};

export default Briefing;