import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { supabase } from './lib/supabase'
import './styles.css'

function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function signIn(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setLoading(false)
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="logo">CREA<span>TE</span></div>
        <p className="muted">Pollaio • IP Production Engine</p>
        <form className="form" onSubmit={signIn}>
          <label>
            E-mail
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
          </label>
          <label>
            Senha
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
          </label>
          <button className="btn orange" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar no CREATE'}
          </button>
        </form>
        {error && <div className="error">{error}</div>}
      </section>
    </main>
  )
}

function App() {
  const [session, setSession] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setChecking(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  if (checking) {
    return <main className="shell"><div className="shell-card">Carregando CREATE...</div></main>
  }

  if (!session) return <Auth />

  return (
    <main className="shell">
      <section className="shell-card">
        <div className="topbar">
          <div>
            <div className="logo">CREA<span>TE</span></div>
            <div className="muted">Conexão com Supabase ativa</div>
          </div>
          <button className="btn secondary" onClick={() => supabase.auth.signOut()}>Sair</button>
        </div>
        <div className="status"><span className="dot" /> Usuário autenticado</div>
        <p className="muted" style={{marginTop: 18}}>
          A infraestrutura real do CREATE está conectada. O próximo passo é migrar a interface V4 aprovada para React,
          substituindo o localStorage por Universos, Personagens, Conhecimento, Produção e Produtos no Supabase.
        </p>
        <div className="next">
          <strong>Base preservada</strong>
          <div className="muted" style={{marginTop: 6}}>
            O CREATE V4 aprovado está em <code>legacy/CREATE_V4_aprovado.html</code> para não perdermos a referência visual.
          </div>
        </div>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
