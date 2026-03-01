import { useState } from 'react';
import './App.css';
import {
  Menu, ArrowRight, Play, Check,
  Users, Clock, ShoppingBag,
  Smartphone, CreditCard, Sparkles, MessageCircle,
  BarChart3, LayoutDashboard, Instagram, Twitter, Linkedin, Store
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="app">
      {/* 1. HEADER */}
      <header className="header">
        <div className="container header-container">
          <div className="logo-wrapper">
            <span className="logo-text">vist<span className="logo-o">O</span></span>
          </div>

          <nav className="nav-links">
            <a href="#produto">Produto</a>
            <a href="#solucoes">Soluções</a>
            <a href="#precos">Preços</a>
            <a href="#recursos">Recursos</a>
            <a href="#sobre">Sobre</a>
          </nav>

          <div className="header-actions">
            <button className="btn btn-ghost">Login</button>
            <button className="btn btn-primary">Começar agora</button>
          </div>

          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu />
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content animate-fade-in">
            <div className="hero-badge">
              <Sparkles size={16} />
              <span>Plataforma #1 para WhatsApp</span>
            </div>

            <h1>
              A nova geração de <span className="text-gradient">gestão inteligente</span> para lojas que vendem pelo WhatsApp.
            </h1>

            <p className="hero-subtitle">
              Catálogo, provador virtual com IA, reservas, pagamentos e automações em um único lugar.
            </p>

            <div className="hero-actions">
              <button className="btn btn-primary">
                🚀 Criar minha loja grátis
              </button>
              <button className="btn btn-secondary">
                <Play size={18} /> Ver demonstração
              </button>
            </div>

            <div className="hero-microcopy">
              <Check size={14} className="check-icon" /> Sem cartão de crédito &bull; Setup em 2 minutos
            </div>
          </div>

          <div className="hero-visual animate-fade-in delay-200">
            <img src="/mockup1.png" alt="Visto Dashboard" className="hero-mockup" />
          </div>
        </div>
      </section>

      {/* 3. SOCIAL PROOF */}
      <section className="social-proof animate-fade-in delay-300">
        <div className="container">
          <p>Confiado por lojas que vendem todos os dias pelo WhatsApp</p>
          <div className="logos-grid">
            <div className="logo-placeholder">Acme Corp</div>
            <div className="logo-placeholder">Globex</div>
            <div className="logo-placeholder">Soylent</div>
            <div className="logo-placeholder">Initech</div>
            <div className="logo-placeholder">Umbrella</div>
          </div>
        </div>
      </section>

      {/* 4. METRICS */}
      <section className="section metrics">
        <div className="container">
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-value text-gradient">+70k</div>
              <div className="metric-label">clientes atendidos</div>
            </div>
            <div className="metric-card">
              <div className="metric-value text-gradient">50K</div>
              <div className="metric-label">reservas realizadas</div>
            </div>
            <div className="metric-card">
              <div className="metric-value text-gradient">3x</div>
              <div className="metric-label">mais conversão com provador</div>
            </div>
            <div className="metric-card">
              <div className="metric-value text-gradient">90%</div>
              <div className="metric-label">menos tempo no atendimento</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. O QUE É O VISTO */}
      <section id="produto" className="section">
        <div className="container">
          <div className="section-header">
            <h2>Tudo que sua loja precisa para vender mais — <span className="text-gradient">automaticamente.</span></h2>
          </div>

          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon"><ShoppingBag /></div>
              <h3 className="feature-title">Catálogo inteligente</h3>
              <p className="feature-desc">Seus produtos organizados e fáceis de compartilhar no WhatsApp.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><Users /></div>
              <h3 className="feature-title">CRM de clientes</h3>
              <p className="feature-desc">Histórico completo, preferências e gestão do relacionamento.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><Clock /></div>
              <h3 className="feature-title">Reservas online</h3>
              <p className="feature-desc">Agendamento de provador presencial e retirada na loja.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><CreditCard /></div>
              <h3 className="feature-title">Pagamentos automáticos</h3>
              <p className="feature-desc">Links de pagamento direto na conversa, sem maquininha.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><Sparkles /></div>
              <h3 className="feature-title">Provador virtual IA</h3>
              <p className="feature-desc">O cliente vê como a roupa fica no corpo antes de comprar.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><MessageCircle /></div>
              <h3 className="feature-title">Automação de WhatsApp</h3>
              <p className="feature-desc">Respostas rápidas e funil de vendas automatizado.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><LayoutDashboard /></div>
              <h3 className="feature-title">Gestão de equipe</h3>
              <p className="feature-desc">Vários atendentes no mesmo número de WhatsApp.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><BarChart3 /></div>
              <h3 className="feature-title">Relatórios em tempo real</h3>
              <p className="feature-desc">Acompanhe métricas, vendas e conversões ao vivo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRIMARY FEATURE - VIRTUAL TRY-ON */}
      <section className="section highlight-feature">
        <div className="container highlight-container">
          <div className="highlight-content">
            <h2>O provador virtual que faz o cliente comprar <span className="text-gradient">sem sair do WhatsApp.</span></h2>
            <p className="text-lg">
              Ofereça uma experiência premium e elimine objeções de tamanho ou caimento. Nossa IA gera fotos ultra-realistas dos seus clientes usando suas peças.
            </p>

            <div className="highlight-list">
              <div className="highlight-list-item">
                <Check className="highlight-list-icon" /> Comparação Antes / Depois
              </div>
              <div className="highlight-list-item">
                <Check className="highlight-list-icon" /> Geração instantânea de looks
              </div>
              <div className="highlight-list-item">
                <Check className="highlight-list-icon" /> Compartilhamento direto com o cliente
              </div>
            </div>

            <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Testar agora <ArrowRight size={18} />
            </button>
          </div>

          <div className="highlight-visual">
            <img src="/mockup2.png" alt="Provador Virtual IA" className="try-on-mockup" />
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS */}
      <section id="como-funciona" className="section">
        <div className="container">
          <div className="section-header">
            <h2>Como funciona</h2>
            <p className="text-lg">Comece a usar em menos de 5 minutos</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Crie sua loja</h3>
              <p>Cadastre seus produtos e defina suas preferências de pagamento em poucos cliques.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Conecte seu WhatsApp</h3>
              <p>Integre seu número e ative múltiplos atendentes na mesma conta instantaneamente.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Comece a vender com IA</h3>
              <p>Envie links, gere provadores virtuais e feche vendas de forma automatizada.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PARA QUEM É */}
      <section id="solucoes" className="section audience">
        <div className="container">
          <div className="section-header">
            <h2>Feito para o seu negócio</h2>
          </div>

          <div className="audience-grid">
            <div className="audience-card">
              <ShoppingBag size={32} className="icon" />
              <h4>Lojas de roupas</h4>
            </div>
            <div className="audience-card">
              <LayoutDashboard size={32} className="icon" />
              <h4>Franquias</h4>
            </div>
            <div className="audience-card">
              <Users size={32} className="icon" />
              <h4>Personal shoppers</h4>
            </div>
            <div className="audience-card">
              <Store size={32} className="icon" />
              <h4>Showrooms</h4>
            </div>
            <div className="audience-card">
              <Smartphone size={32} className="icon" />
              <h4>E-commerce físico + digital</h4>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PREÇOS */}
      <section id="precos" className="section bg-color">
        <div className="container">
          <div className="section-header">
            <h2>Planos simples e transparentes</h2>
            <p className="text-lg">Plataforma gratuita + créditos para IA. Use apenas o que precisar.</p>
          </div>

          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="price-header">
                <h3 className="price-title">Free</h3>
                <p>Ideal para começar</p>
              </div>
              <div className="price-amount">R$ 0<span>/mês</span></div>

              <ul className="price-features">
                <li><Check size={18} className="check-icon" /> Catálogo ilimitado</li>
                <li><Check size={18} className="check-icon" /> CRM básico</li>
                <li><Check size={18} className="check-icon" /> Gestão de reservas</li>
                <li><Check size={18} className="check-icon" /> Integrações básicas</li>
              </ul>
              <button className="btn btn-secondary" style={{ width: '100%' }}>Começar grátis</button>
            </div>

            <div className="pricing-card popular">
              <div className="popular-badge">Mais escolhido</div>
              <div className="price-header">
                <h3 className="price-title">Pro</h3>
                <p>Para lojas em crescimento</p>
              </div>
              <div className="price-amount">R$ 97<span>/mês</span></div>

              <ul className="price-features">
                <li><Check size={18} className="check-icon" /> Tudo do Free</li>
                <li><Check size={18} className="check-icon" /> Automação de WhatsApp</li>
                <li><Check size={18} className="check-icon" /> Relatórios avançados</li>
                <li><Check size={18} className="check-icon" /> Gestão de Equipe</li>
                <li><Check size={18} className="check-icon" /> Integrações premium</li>
              </ul>
              <button className="btn btn-primary" style={{ width: '100%' }}>Assinar Pro</button>
            </div>

            <div className="pricing-card" style={{ background: '#0F0F0F', color: 'white' }}>
              <div className="price-header">
                <h3 className="price-title" style={{ color: 'white' }}>Créditos de IA</h3>
                <p style={{ color: '#9CA3AF' }}>Use apenas quando gerar imagens</p>
              </div>
              <div className="price-amount" style={{ color: 'white' }}>R$ 49<span>/pacote</span></div>

              <ul className="price-features" style={{ color: '#D1D5DB' }}>
                <li style={{ color: '#D1D5DB' }}><Check size={18} className="check-icon" /> 500 gerações de looks</li>
                <li style={{ color: '#D1D5DB' }}><Check size={18} className="check-icon" /> Alta resolução</li>
                <li style={{ color: '#D1D5DB' }}><Check size={18} className="check-icon" /> Modelos diversificados</li>
                <li style={{ color: '#D1D5DB' }}><Check size={18} className="check-icon" /> Sem validade</li>
              </ul>
              <button className="btn btn-primary" style={{ width: '100%', background: 'white', color: 'black' }}>Comprar Créditos</button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. APP PREVIEW */}
      <section className="section app-preview">
        <div className="container">
          <div className="section-header">
            <h2>Tudo na palma da sua mão</h2>
            <p className="text-lg">Gerencie sua loja e responda seus clientes de onde estiver.</p>
          </div>
          <div className="app-mockup-container">
            <img src="/mockup3.png" alt="Mobile App Visto" className="app-mockup" />
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Sua loja pronta para vender 24h por dia.</h2>
          <p className="text-lg">Junte-se a mais de 70.000 clientes que já transformaram o atendimento via WhatsApp em uma máquina de vendas.</p>
          <button className="btn btn-secondary">
            Criar loja grátis
          </button>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo-wrapper footer-logo">
                <span className="logo-text">vist<span className="logo-o" style={{ color: 'var(--brand-color)' }}>O</span></span>
              </div>
              <p>A nova geração de gestão inteligente para lojas que vendem pelo WhatsApp.</p>
            </div>

            <div>
              <h4>Produto</h4>
              <ul className="footer-links">
                <li><a href="#">Funcionalidades</a></li>
                <li><a href="#">Provador Virtual IA</a></li>
                <li><a href="#">Preços</a></li>
                <li><a href="#">Changelog</a></li>
              </ul>
            </div>

            <div>
              <h4>Empresa</h4>
              <ul className="footer-links">
                <li><a href="#">Sobre nós</a></li>
                <li><a href="#">Carreiras</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4>Suporte</h4>
              <ul className="footer-links">
                <li><a href="#">Central de Ajuda</a></li>
                <li><a href="#">Status</a></li>
                <li><a href="#">Termos de Uso</a></li>
                <li><a href="#">Privacidade</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div>&copy; {new Date().getFullYear()} Visto. Todos os direitos reservados.</div>
            <div className="social-links">
              <a href="#"><Instagram size={20} /></a>
              <a href="#"><Twitter size={20} /></a>
              <a href="#"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
