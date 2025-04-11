
import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-10 py-6 text-center text-muted-foreground">
      <div className="container mx-auto">
        <p className="mb-2">© {new Date().getFullYear()} Кофемолка Калькулятор</p>
        <div className="flex items-center justify-center gap-2">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
