import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Globe, Sparkles } from 'lucide-react'
import { IDENTITY, PROJECTS, EXPERIENCE, EDUCATION, BLOGS } from '../data/portfolio'

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string, isLive?: boolean }[]>([])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const closeAssistant = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isOpen])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAssistant()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeAssistant])

  const openAssistant = () => {
    setIsOpen(true)
    if (messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: "Hello! I'm Kunj's AI Assistant. I can tell you about his projects, experience, tech stack, or answer general questions using real-time search. How can I help?"
        }
      ])
    }
  }

  const fetchExternalIntel = async (query: string) => {
    try {
      // Using DuckDuckGo Instant Answer API for "web search" simulation
      const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`);
      const data = await response.json();
      return data.AbstractText || data.RelatedTopics?.[0]?.Text || null;
    } catch (error) {
      return null;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isThinking) return

    const userMessage = input.trim()
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    const query = userMessage.toLowerCase()
    setInput('')
    setIsThinking(true)

    let response = ''
    let isWebResult = false

    // --- LOCAL KNOWLEDGE BASE (Portfolio Data) ---

    // 1. Specific Project Queries
    const foundProject = PROJECTS.find(p => query.includes(p.title.toLowerCase()) || query.includes(p.slug.replace('-', ' ')));

    // 2. Identity & Overview
    if (query.includes('who are you') || query.includes('who is kunj') || (query.includes('about') && query.includes('kunj'))) {
      response = `Hi! I'm Kunj's virtual assistant. \n\nKunj is a **Full Stack AI/ML & Automation Specialist** from Ahmedabad, India. He builds end-to-end intelligent systems that automate complex workflows. \n\nHe currently focuses on **Full Stack AI**, **Autonomous Automation**, and **Agentic Reasoning**.`;
    }
    // Specific Project Match
    else if (foundProject) {
      response = `**${foundProject.title}** is a really cool project!\n\nIt's ${foundProject.desc.toLowerCase()}\n\n**Tech Used:** ${foundProject.tech.join(', ')}.`;
    }
    // 3. General Projects / Portfolio
    else if (query.includes('project') || query.includes('work') || query.includes('portfolio') || query.includes('what have you built')) {
      const topProjects = PROJECTS.slice(0, 3).map(p => `• **${p.title}**: ${p.desc}`).join('\n\n');
      response = `Kunj has built some impressive AI systems. Here are a few highlights:\n\n${topProjects}\n\nAsk me about "CinePulse" or "Sentinel CLI" to learn more!`;
    }
    // 4. Experience / Job
    else if (query.includes('experience') || query.includes('job') || query.includes('working') || query.includes('intern')) {
      const exp = EXPERIENCE[0];
      response = `Right now, Kunj is working as an **${exp.role.replace(/_/g, ' ')}** at **${exp.company.replace(/_/g, ' ')}**.\n\nHe's helping them build automated AI workflows that can handle complex business tasks on their own.`;
    }
    // 5. Skills / Tech Stack
    else if (query.includes('skill') || query.includes('tech') || query.includes('code') || query.includes('stack')) {
      response = `Kunj has a strong technical toolkit:\n\n` +
        `🧠 **AI & GenAI:** He builds with LangChain, Python, and Large Language Models (LLMs).\n` +
        `💻 **Web Dev:** He builds fast sites using React and TypeScript.\n` +
        `🛠️ **Systems:** He knows his way around Linux, Docker, and Cloud deployment.\n\nBasically, if it involves AI or code, he's on it!`;
    }
    // 6. Education
    else if (query.includes('study') || query.includes('college') || query.includes('education') || query.includes('degree')) {
      const edu = EDUCATION[0];
      response = `Kunj is currently studying for his **${edu.degree}** at ${edu.school}. He is diving deep into AI and Neural Networks.`;
    }
    // 7. Blogs / Writing
    else if (query.includes('blog') || query.includes('article') || query.includes('write') || query.includes('writing') || query.includes('read')) {
      const topBlogs = BLOGS.slice(0, 3).map(b => `• **${b.title}**`).join('\n');
      response = `Kunj loves writing about what he builds. He has written simplified guides on:\n\n${topBlogs}\n\nCheck out the Blogs page for the full articles!`;
    }
    // 8. Contact
    else if (query.includes('contact') || query.includes('email') || query.includes('reach') || query.includes('hire')) {
      response = `You can chat with Kunj directly via email at: **${IDENTITY.contact}**\n\nHe's always open to hearing about new ideas or opportunities!`;
    }
    // --- FALLBACK: WEB SEARCH ---
    else {
      const externalInfo = await fetchExternalIntel(query);
      if (externalInfo) {
        response = `Here is what I found on the web:\n\n"${externalInfo}"\n\n(I simplify things, but this is from a live search!)`;
        isWebResult = true;
      } else {
        response = "I'm not exactly sure about that. I mostly know about Kunj's work in AI and Engineering. \n\nFeel free to ask about his **Projects**, **Skills**, or how to **Contact** him!";
      }
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: response, isLive: isWebResult }])
      setIsThinking(false)
    }, 800)
  }

  return (
    <>
      <button
        onClick={openAssistant}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[110] w-12 h-12 sm:w-14 sm:h-14 bg-txt text-bg hover:bg-primary transition-all duration-300 shadow-2xl flex items-center justify-center group rounded-full border border-primary/20"
      >
        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform text-primary" />
        <span className="sr-only">AI Assistant</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
onClick={closeAssistant}
              className="fixed inset-0 z-[105]"
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-4 right-4 sm:bottom-24 sm:right-8 z-[110] w-[calc(100vw-32px)] sm:w-[400px] h-[500px] sm:h-[600px] max-h-[80vh] bg-bg border border-border shadow-2xl flex flex-col overflow-hidden rounded-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface/50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold tracking-wider uppercase text-txt">Kunj's Assistant</span>
                </div>
                <button onClick={closeAssistant} className="p-2 hover:bg-surface rounded-full transition-colors">
                  <X className="w-4 h-4 text-muted" />
                </button>
              </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] p-3 sm:p-4 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed ${m.role === 'user'
                    ? 'bg-txt text-bg rounded-br-none'
                    : 'bg-surface border border-border text-txt rounded-bl-none'
                    }`}>
                    {m.isLive && (
                      <div className="flex items-center gap-1.5 text-[10px] text-primary mb-2 font-bold uppercase tracking-wider">
                        <Globe className="w-3 h-3" /> Web Search Result
                      </div>
                    )}
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex items-start">
                  <div className="bg-surface border border-border text-txt rounded-2xl rounded-bl-none p-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-muted/50 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-muted/50 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-muted/50 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-surface/50 border-t border-border">
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about projects, skills, or search web..."
                  className="w-full bg-bg border border-border rounded-full pl-4 pr-12 py-3 text-xs sm:text-sm focus:outline-none focus:border-primary transition-colors text-txt placeholder:text-muted"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isThinking}
                  className="absolute right-1.5 p-2 bg-txt text-bg rounded-full hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
