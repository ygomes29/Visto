import { useEffect, useState, type ReactNode } from 'react';
import './App.css';
import LeadForm from './LeadForm';
import {
  Menu, X, ArrowRight, ArrowUpRight, Check, Sparkles,
  Users, MessageCircle, Megaphone, Gift, RefreshCcw, BarChart3,
  UserX, PackageOpen, MessageSquareOff, Heart, ShoppingBag, Search,
  Star, Clock, Plug, Brain, Send, Shirt, Bell, Instagram, Linkedin,
} from 'lucide-react';

/* ---------- helpers ---------- */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div data-reveal className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub?: string }) {
  return (
    <Reveal className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </Reveal>
  );
}

const NAV = [
  { href: '#produto', label: 'Produto' },
  { href: '#diferencial', label: 'Diferencial' },
  { href: '#como-funciona', label: 'Como funciona' },
];

/* ---------- header ---------- */

function Header({ onCta }: { onCta: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`nav-wrap ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <nav className="nav glass" aria-label="Principal">
        <a href="#top" className="nav-logo" aria-label="Visto — início">
          <img src="/brand/visto-logo.png" alt="Visto" width={96} height={38} />
        </a>
        <div className="nav-links">
          {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </div>
        <div className="nav-actions">
                    <button type="button" className="btn btn-primary btn-sm" onClick={onCta}>Começar agora</button>
        </div>
        <button
          className="nav-toggle"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <div id="mobile-menu" className="mobile-menu glass" hidden={!open}>
        {NAV.map((n) => (
          <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
            {n.label} <ArrowUpRight size={16} />
          </a>
        ))}
        <div className="mobile-menu-actions">
                    <button type="button" className="btn btn-primary" onClick={() => { setOpen(false); onCta(); }}>Começar agora</button>
        </div>
      </div>
    </header>
  );
}

/* ---------- product UI fragments (illustrative) ---------- */

function DashboardMock() {
  const bars = [38, 52, 44, 66, 58, 74, 62, 82, 70, 88, 76, 92];
  return (
    <div className="ui ui-dashboard">
      <div className="ui-chrome">
        <span /><span /><span />
        <div className="ui-url">app.visto · Visão geral</div>
      </div>
      <div className="ui-dash-body">
        <aside className="ui-side">
          <img src="/brand/visto-logo.png" alt="" className="ui-side-logo" />
          {[
            [BarChart3, 'Visão geral', true], [Users, 'Clientes', false], [MessageCircle, 'Atendimento', false],
            [Megaphone, 'Campanhas', false], [ShoppingBag, 'Catálogo', false], [Gift, 'Fidelidade', false],
          ].map(([Icon, label, active]) => {
            const I = Icon as typeof Users;
            return <div key={label as string} className={`ui-side-item ${active ? 'on' : ''}`}><I size={14} />{label as string}</div>;
          })}
        </aside>
        <div className="ui-main">
          <div className="ui-row-head">
            <div>
              <div className="ui-h">Bom dia, Ateliê Aurora</div>
              <div className="ui-sub">Resumo da semana</div>
            </div>
            <div className="ui-chip"><Sparkles size={12} /> 3 oportunidades novas</div>
          </div>
          <div className="ui-kpis">
            {[['Conversas', '128'], ['Clientes ativos', '342'], ['Campanhas', '4']].map(([k, v]) => (
              <div key={k} className="ui-kpi"><span>{k}</span><strong>{v}</strong></div>
            ))}
          </div>
          <div className="ui-chart">
            <div className="ui-chart-head"><span>Oportunidades identificadas</span><span className="ui-muted">12 semanas</span></div>
            <div className="ui-bars">
              {bars.map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CrmMock({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`ui ui-card glass-card ui-crm ${compact ? 'is-compact' : ''}`}>
      <div className="ui-card-head">
        <div className="avatar a1">MC</div>
        <div>
          <div className="ui-h">Marina Costa</div>
          <div className="ui-sub">Cliente desde mar/2024</div>
        </div>
        <span className="tag tag-blue">VIP</span>
      </div>
      <div className="ui-label">Preferências</div>
      <div className="ui-tags">
        <span className="tag">Vestidos</span><span className="tag">Vermelho</span><span className="tag">Tam. M</span>
      </div>
      {!compact && (
        <>
          <div className="ui-label">Última compra</div>
          <div className="ui-line"><Shirt size={14} /> Vestido midi vermelho <span className="ui-muted">· há 18 dias</span></div>
        </>
      )}
    </div>
  );
}

function ChatMock() {
  return (
    <div className="ui ui-card glass-card ui-chat">
      <div className="ui-card-head">
        <div className="wa-dot"><MessageCircle size={14} /></div>
        <div>
          <div className="ui-h">WhatsApp</div>
          <div className="ui-sub">Atendimento com IA</div>
        </div>
      </div>
      <div className="bubble in">Oi! Chegou algum vestido novo?</div>
      <div className="bubble out">Chegou sim, Marina! Separei 3 modelos no seu tamanho 💙</div>
      <div className="typing"><i /><i /><i /></div>
    </div>
  );
}

function CampaignMock() {
  return (
    <div className="ui ui-card glass-card ui-campaign">
      <div className="ui-card-head">
        <div className="icon-tile"><Megaphone size={15} /></div>
        <div>
          <div className="ui-h">Nova coleção · Verão</div>
          <div className="ui-sub">Campanha segmentada</div>
        </div>
      </div>
      <div className="ui-progress"><i style={{ width: '72%' }} /></div>
      <div className="ui-line ui-muted">24 clientes compatíveis · aguardando aprovação</div>
    </div>
  );
}

function RecoMock() {
  return (
    <div className="ui ui-card glass-card ui-reco">
      <div className="ui-label"><Sparkles size={12} /> Recomendado para Marina</div>
      <div className="reco-items">
        {['r1', 'r2', 'r3'].map((c) => <div key={c} className={`reco-thumb ${c}`}><Shirt size={20} /></div>)}
      </div>
    </div>
  );
}

/* ---------- page ---------- */

function App() {
  useReveal();
  const [leadOpen, setLeadOpen] = useState(false);
  const openLead = () => setLeadOpen(true);

  return (
    <div className="app" id="top">
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <Header onCta={openLead} />

      <main id="conteudo">
        {/* HERO */}
        <section className="hero">
          <div className="hero-atmos" aria-hidden="true" />
          <div className="container hero-copy">
            <Reveal>
              <span className="badge glass"><span className="badge-dot" />Inteligência artificial para o varejo de moda</span>
            </Reveal>
            <Reveal delay={80}>
              <h1>
                Sua loja vende mais.<br />
                <span className="text-blue">Sua inteligência trabalha por você.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="hero-sub">
                Transforme o atendimento, o relacionamento e as vendas da sua loja com uma inteligência artificial
                que conhece seus clientes, identifica oportunidades e ajuda sua operação a crescer.
              </p>
            </Reveal>
            <Reveal delay={240} className="hero-ctas">
              <button type="button" className="btn btn-primary btn-lg" onClick={openLead}>Conhecer o Visto <ArrowRight size={18} /></button>
              <a href="#como-funciona" className="btn btn-glass btn-lg">Ver como funciona</a>
            </Reveal>
          </div>

          <Reveal delay={300} className="container hero-stage-wrap">
            <div className="hero-stage" aria-label="Prévia ilustrativa da plataforma Visto">
              <div className="stage-main"><DashboardMock /></div>
              <div className="float f-crm"><CrmMock /></div>
              <div className="float f-chat"><ChatMock /></div>
              <div className="float f-campaign"><CampaignMock /></div>
              <div className="float f-reco"><RecoMock /></div>
            </div>
            <p className="demo-note">Interface ilustrativa · dados demonstrativos</p>
          </Reveal>
        </section>

        {/* PROBLEMA */}
        <section className="section">
          <div className="container">
            <SectionHead
              eyebrow="O problema"
              title={<>Sua loja pode estar perdendo<br className="br-d" /> vendas todos os dias.</>}
            />
            <div className="problem-grid">
              <Reveal className="problem-card">
                <div className="problem-ill">
                  <div className="mini-list">
                    {['Juliana R.', 'Camila S.', 'Patrícia M.'].map((n, i) => (
                      <div key={n} className="mini-row"><span className={`avatar sm a${i + 2}`}>{n[0]}</span>{n}<span className="ui-muted mini-r">sem contato há {[94, 132, 187][i]}d</span></div>
                    ))}
                  </div>
                </div>
                <div className="icon-tile"><UserX size={18} /></div>
                <h3>Clientes esquecidos</h3>
                <p>Clientes compram uma vez e nunca mais recebem uma abordagem personalizada.</p>
              </Reveal>
              <Reveal delay={90} className="problem-card">
                <div className="problem-ill">
                  <div className="mini-products">
                    {['r1', 'r2', 'r3'].map((c) => <div key={c} className={`reco-thumb ${c}`}><Shirt size={18} /></div>)}
                  </div>
                  <div className="mini-caption"><PackageOpen size={13} /> 12 novidades · 0 clientes avisados</div>
                </div>
                <div className="icon-tile"><PackageOpen size={18} /></div>
                <h3>Oportunidades desperdiçadas</h3>
                <p>Novas coleções chegam, mas os produtos não são apresentados aos clientes com maior interesse.</p>
              </Reveal>
              <Reveal delay={180} className="problem-card">
                <div className="problem-ill">
                  <div className="bubble in sm">Ainda tem no tamanho P?</div>
                  <div className="mini-caption warn"><Clock size={13} /> Sem resposta há 2 dias</div>
                </div>
                <div className="icon-tile"><MessageSquareOff size={18} /></div>
                <h3>Atendimento sem inteligência</h3>
                <p>Conversas ficam esquecidas e informações importantes deixam de ser aproveitadas.</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FUNCIONALIDADES */}
        <section id="produto" className="section section-alt">
          <div className="container">
            <SectionHead
              eyebrow="Funcionalidades"
              title={<>Tudo o que sua loja precisa para<br className="br-d" /> vender de forma <span className="text-blue">mais inteligente.</span></>}
            />
            <div className="bento">
              <Reveal className="bento-card b-crm featured">
                <div className="bento-copy">
                  <div className="icon-tile"><Users size={18} /></div>
                  <h3>CRM inteligente</h3>
                  <p>Histórico de compras, preferências, comportamento e relacionamento de cada cliente em um só lugar.</p>
                </div>
                <div className="bento-visual"><CrmMock /></div>
              </Reveal>
              <Reveal delay={80} className="bento-card b-reco featured">
                <div className="bento-copy">
                  <div className="icon-tile"><Sparkles size={18} /></div>
                  <h3>Recomendações personalizadas</h3>
                  <p>Identificação de produtos compatíveis com os interesses de cada cliente.</p>
                </div>
                <div className="bento-visual"><RecoMock /></div>
              </Reveal>
              <Reveal className="bento-card b-chat">
                <div className="icon-tile"><MessageCircle size={18} /></div>
                <h3>Atendimento com IA</h3>
                <p>Respostas e acompanhamento de clientes pelo WhatsApp.</p>
              </Reveal>
              <Reveal delay={60} className="bento-card b-camp">
                <div className="icon-tile"><Megaphone size={18} /></div>
                <h3>Campanhas automatizadas</h3>
                <p>Comunicação segmentada para coleções, promoções e oportunidades.</p>
              </Reveal>
              <Reveal delay={120} className="bento-card b-loyal">
                <div className="icon-tile"><Gift size={18} /></div>
                <h3>Programa de fidelidade</h3>
                <p>Acúmulo de pontos e incentivos à recompra.</p>
              </Reveal>
              <Reveal className="bento-card b-react">
                <div className="icon-tile"><RefreshCcw size={18} /></div>
                <h3>Reativação de clientes</h3>
                <p>Identificação de clientes inativos e novas oportunidades de relacionamento.</p>
              </Reveal>
              <Reveal delay={60} className="bento-card b-intel">
                <div className="icon-tile"><BarChart3 size={18} /></div>
                <h3>Inteligência comercial</h3>
                <p>Indicadores para acompanhar atendimentos, campanhas e oportunidades.</p>
              </Reveal>
              <Reveal delay={120} className="bento-card b-tryon">
                <div className="icon-tile"><Shirt size={18} /></div>
                <h3>Catálogo e provador virtual</h3>
                <p>Catálogo, reservas, pagamentos e provador com IA, direto na conversa.</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* DIFERENCIAL */}
        <section id="diferencial" className="section diff">
          <div className="diff-atmos" aria-hidden="true" />
          <div className="container">
            <SectionHead
              eyebrow="O diferencial"
              title={<>Chegou uma nova coleção.<br /><span className="text-blue">O Visto já sabe quem pode querer comprar.</span></>}
              sub="Uma cliente comprou um vestido vermelho. Dias depois, novos vestidos vermelhos chegam ao catálogo. O Visto cruza o histórico do CRM e prepara recomendações e campanhas para quem tem esse perfil."
            />
            <div className="flow" role="list">
              <Reveal className="flow-step">
                <div role="listitem">
                  <span className="flow-n">01</span>
                  <div className="flow-card glass-card">
                    <div className="ui-label"><Bell size={12} /> Novo produto</div>
                    <div className="flow-product">
                      <div className="reco-thumb r1"><Shirt size={20} /></div>
                      <div><div className="ui-h">Vestido longo rubi</div><div className="ui-sub">Coleção Verão · P ao G</div></div>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={100} className="flow-step">
                <div role="listitem">
                  <span className="flow-n">02</span>
                  <div className="flow-card glass-card">
                    <div className="ui-label"><Brain size={12} /> CRM inteligente</div>
                    <div className="ui-line"><Search size={14} /> Preferência: <strong>vestidos · vermelho</strong></div>
                    <div className="scan"><i /></div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={200} className="flow-step">
                <div role="listitem">
                  <span className="flow-n">03</span>
                  <div className="flow-card glass-card">
                    <div className="ui-label"><Users size={12} /> Clientes compatíveis</div>
                    <div className="stack">
                      {['MC', 'JR', 'AL', 'BF'].map((a, i) => <span key={a} className={`avatar sm a${i + 1}`}>{a}</span>)}
                      <span className="stack-more">+20</span>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={300} className="flow-step">
                <div role="listitem">
                  <span className="flow-n">04</span>
                  <div className="flow-card glass-card flow-final">
                    <div className="ui-label"><Send size={12} /> Campanha personalizada</div>
                    <div className="bubble out sm">Marina, chegou um vestido que é a sua cara ❤️</div>
                    <div className="ui-sub"><Check size={12} /> Pronta para revisão da loja</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FIDELIZAÇÃO */}
        <section className="section section-alt">
          <div className="container loyalty">
            <Reveal className="loyalty-copy">
              <span className="eyebrow">Fidelização</span>
              <h2>Cada compra é o começo <span className="text-blue">da próxima.</span></h2>
              <p>O Visto mantém o relacionamento vivo: entende quem é cada cliente e cria o motivo certo para ela voltar.</p>
              <ul className="check-list">
                {['Histórico de compras e preferências individuais', 'Segmentação de clientes', 'Pontos de fidelidade e incentivos à recompra', 'Campanhas personalizadas', 'Reativação de clientes inativos'].map((t) => (
                  <li key={t}><span className="check"><Check size={13} /></span>{t}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120} className="loyalty-visual">
              <div className="loyal-card glass-card l-points">
                <div className="ui-card-head">
                  <div className="icon-tile"><Star size={15} /></div>
                  <div><div className="ui-h">Clube Aurora</div><div className="ui-sub">Marina Costa</div></div>
                </div>
                <div className="points"><strong>1.240</strong><span>pontos</span></div>
                <div className="ui-progress"><i style={{ width: '62%' }} /></div>
                <div className="ui-sub">Faltam 760 pontos para o próximo benefício</div>
              </div>
              <div className="loyal-card glass-card l-history">
                <div className="ui-label">Histórico</div>
                {[['Vestido midi vermelho', 'mar'], ['Blazer linho', 'jan'], ['Saia plissada', 'nov']].map(([p, m]) => (
                  <div key={p} className="hist-row"><ShoppingBag size={13} />{p}<span className="ui-muted">{m}</span></div>
                ))}
              </div>
              <div className="loyal-card glass-card l-segment">
                <div className="ui-label"><Heart size={12} /> Segmentos</div>
                <div className="ui-tags">
                  <span className="tag tag-blue">Fiéis</span><span className="tag">Novas</span><span className="tag">Inativas 90d+</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section id="como-funciona" className="section">
          <div className="container">
            <SectionHead
              eyebrow="Como funciona"
              title={<>Mais inteligência para sua loja.<br /><span className="text-muted">Menos trabalho manual.</span></>}
            />
            <div className="steps" role="list">
              {[
                [Plug, '01', 'Conecte sua operação', 'Centralize informações, atendimento e oportunidades.'],
                [Users, '02', 'Conheça seus clientes', 'Use o CRM para entender histórico de compras e preferências.'],
                [Sparkles, '03', 'Venda com inteligência', 'Crie relacionamentos personalizados, campanhas e novas oportunidades.'],
              ].map(([Icon, n, t, d], i) => {
                const I = Icon as typeof Users;
                return (
                  <Reveal key={n as string} delay={i * 90} className="step">
                    <div role="listitem">
                      <div className="step-top"><span className="step-n">{n as string}</span><div className="icon-tile"><I size={18} /></div></div>
                      <h3>{t as string}</h3>
                      <p>{d as string}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section id="contato" className="section cta-section">
          <div className="container">
            <Reveal className="cta-box">
              <div className="cta-glow" aria-hidden="true" />
              <h2>O futuro da sua loja começa com uma conversa.</h2>
              <p>Descubra como o Visto pode transformar o atendimento, o relacionamento e as vendas do seu negócio.</p>
              <button type="button" className="btn btn-white btn-lg" onClick={openLead}>Conhecer o Visto <ArrowRight size={18} /></button>
            </Reveal>
          </div>
        </section>
      </main>

      <LeadForm open={leadOpen} onClose={() => setLeadOpen(false)} />

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src="/brand/visto-logo.png" alt="Visto" width={110} height={44} loading="lazy" />
              <p>Inteligência artificial para o varejo de moda.</p>
            </div>
            <div>
              <h4>Produto</h4>
              <ul>
                <li><a href="#produto">Funcionalidades</a></li>
                <li><a href="#diferencial">Diferencial</a></li>
              </ul>
            </div>
            <div>
              <h4>Empresa</h4>
              <ul>
                <li><a href="#">Sobre nós</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#contato">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4>Suporte</h4>
              <ul>
                <li><a href="#">Central de Ajuda</a></li>
                <li><a href="#">Termos de Uso</a></li>
                <li><a href="#">Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; {new Date().getFullYear()} Visto. Todos os direitos reservados.</span>
            <div className="social">
              <a href="https://www.instagram.com/visto.app/" target="_blank" rel="noopener noreferrer" aria-label="Instagram do Visto"><Instagram size={18} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
