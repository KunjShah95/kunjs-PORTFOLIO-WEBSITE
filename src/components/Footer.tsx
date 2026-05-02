import { Github, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/KunjShah95', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/kunjshah05', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/kunjshah_dev', label: 'Twitter' },
  ]

  return (
    <footer className="py-8 bg-surface border-t border-border">
      <div className="container-aligned">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} — Built with AI
          </p>
          
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-txt transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}