import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { sendChatMessage } from '../api';

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am your AI Banking & Fraud Shield Assistant. Ask me anything about account security, transaction risks, or fraud prevention.'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await sendChatMessage(userMsg);
      const botResponse = res.data?.response || res.data?.Response || res.data?.data || (typeof res.data === 'string' ? res.data : null);
      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse || 'I am processing your banking inquiry. How else can I assist?' }]);
    } catch (err) {
      const q = userMsg.toLowerCase();
      let fallback = `🤖 **Bank AI Assistant**:\nRegarding your query: "${userMsg}"\nOur banking system provides 24/7 digital banking services. You can manage accounts, transfer funds, or review transaction history directly from your customer dashboard.`;

      if (q.includes('deposit') || q.includes('withdraw') || q.includes('add money') || q.includes('cash')) {
        fallback = '💵 **Deposits & Withdrawals**:\nTo deposit or withdraw money, click "Deposit Money" or "Withdraw Money" from the left menu. Enter the amount and target account to complete the transaction immediately.';
      } else if (q.includes('transfer') || q.includes('send money') || q.includes('upi') || q.includes('pay') || q.includes('neft')) {
        fallback = '💸 **Fund Transfers**:\nYou can transfer funds instantly under the "Fund Transfer" tab. Transfers over ₹50,000 trigger our automated AI Fraud Guard modal to confirm transaction safety before processing.';
      } else if (q.includes('balance') || q.includes('account') || q.includes('ifsc') || q.includes('savings')) {
        fallback = '🏦 **Accounts & Balances**:\nView all your linked Savings, Current, and Salary accounts on the "My Accounts" page. Default IFSC code for accounts is `BKID000101`.';
      } else if (q.includes('fraud') || q.includes('risk') || q.includes('security') || q.includes('flagged') || q.includes('blocked')) {
        fallback = '🔒 **AI Security & Fraud Shield**:\nOur automated system monitors transfers for unusual amounts or geographical anomalies. If a transaction is flagged for review, you can verify it directly in the security dialog.';
      } else if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('greetings')) {
        fallback = '👋 Hello! How can I assist you with your banking needs today? Ask me about deposits, transfers, account balances, or security settings!';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: fallback }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
      {!isOpen && (
        <button
          className="btn-primary"
          onClick={() => setIsOpen(true)}
          style={{
            borderRadius: '50px',
            padding: '0.85rem 1.4rem',
            boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
          }}
        >
          <Bot size={22} />
          <span>Ask AI Assistant</span>
          <Sparkles size={16} color="#fbbf24" />
        </button>
      )}

      {isOpen && (
        <div
          className="glass-panel animate-fade-in"
          style={{
            width: '380px',
            height: '520px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '1rem 1.25rem',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(6, 182, 212, 0.2))',
              borderBottom: '1px solid var(--border-glass)',
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ background: '#6366f1', padding: '0.4rem', borderRadius: '8px' }}>
                <Bot size={20} color="#fff" />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>Banking AI Assistant</h4>
                <span style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                  Online - Fraud Guard Active
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages body */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '0.6rem',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%'
                }}
              >
                {msg.sender === 'bot' && (
                  <div style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '0.4rem', borderRadius: '50%', height: 'fit-content' }}>
                    <Bot size={16} color="#6366f1" />
                  </div>
                )}
                <div
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '14px',
                    fontSize: '0.875rem',
                    lineHeight: '1.4',
                    background: msg.sender === 'user' ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'rgba(255, 255, 255, 0.06)',
                    color: '#fff',
                    border: msg.sender === 'user' ? 'none' : '1px solid var(--border-glass)'
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <Loader2 size={16} className="pulse-glow" /> AI is thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSend}
            style={{
              padding: '0.85rem 1rem',
              borderTop: '1px solid var(--border-glass)',
              display: 'flex',
              gap: '0.5rem',
              background: 'rgba(15, 23, 42, 0.8)'
            }}
          >
            <input
              type="text"
              className="form-input"
              placeholder="Ask about transfers, security..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ fontSize: '0.85rem', padding: '0.6rem 0.85rem' }}
            />
            <button className="btn-primary" type="submit" style={{ padding: '0.6rem 0.85rem' }} disabled={loading}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
