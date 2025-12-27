'use client';

import { useState, useRef, useEffect, useCallback } from "react";
import {
    X,
    Sparkles,
    Paperclip,
    ArrowUpIcon,
    Code2,
    Rocket,
    Layers,
    Palette,
    MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const VARUN_INFO = {
    name: "Penjendru Varun",
    role: "Full Stack Developer & UI/UX Enthusiast",
    phone: "+91 8838149983",
    email: "pencs127@rmkcet.ac.in",
    education: {
        current: "3rd Year, B.E Computer Science and Engineering",
        college: "RMK College of Engineering and Technology (RMKCET)",
        cgpa: "8.18",
        gradYear: "2027",
        school12: "Velammal Nexus (2021-2023)",
        school10: "Narayana Schools (2015-2021)"
    },
    internships: [
        "SystemTron: C++ Programming Intern (Jan 2024 - Feb 2024). Worked on algorithm optimization.",
        "ApproTech R&D Solutions: UI/UX Designer Intern (June 2025 - July 2025). Designed a Home-Made Food Delivery App.",
        "Shadow Fox: UI/UX Designer Intern (August 2025). Specializing in modern UI/UX principles."
    ],
    projects: [
        "Rental Room Website: An interactive booking platform designed in Figma.",
        "Personal Portfolio: A high-end showcase using glassmorphism and motion UI.",
        "CashPulse: A financial management app for MSMEs built during a 36-hour hackathon."
    ],
    certificates: [
        "NPTEL: Introduction to Internet of Things (Jul-Oct 2025). Scored 87% (Elite + Topper Top 5%).",
        "Infosys: Java Foundation Certification (March 2025).",
        "Udemy: HTML & CSS From Scratch (June 2024).",
        "Typing.com: 97% Accuracy Mastery (Jan 2024).",
        "NoviTech: Machine Learning Workshop (June 2024).",
        "TCS iON: Communication Skills (Dec 2024)."
    ]
};

const getResponse = (input: string) => {
    const query = input.toLowerCase();

    if (query.match(/\b(hi|hello|hey|greetings|hola)\b/)) {
        return "Hello! I'm Varun's AI Assistant. How can I help you learn more about Varun today? ✨";
    }

    if (query.match(/\b(bye|goodbye|see ya|tata)\b/)) {
        return "Goodbye! Feel free to come back if you have more questions about Varun. Have a great day!";
    }

    if (query.includes("who are you") || query.includes("identity")) {
        return "I am Varun's AI Personal Assistant, specifically designed to answer your questions about his professional journey and skills.";
    }

    if (query.includes("phone") || query.includes("number") || query.includes("mobile")) {
        return `Varun's contact number is ${VARUN_INFO.phone}. You can reach out to him for collaborations.`;
    }

    if (query.includes("email") || query.includes("mail")) {
        return `You can email Varun at ${VARUN_INFO.email}.`;
    }

    if (query.includes("studying") || query.includes("education") || query.includes("college") || query.includes("school")) {
        return `Varun is currently a ${VARUN_INFO.education.current} at ${VARUN_INFO.education.college}. He graduated school from ${VARUN_INFO.education.school12} and ${VARUN_INFO.education.school10}.`;
    }

    if (query.includes("cgpa") || query.includes("marks") || query.includes("percentage") || query.includes("grade")) {
        return `Varun has a solid academic record with a current CGPA of ${VARUN_INFO.education.cgpa}. He is set to graduate in ${VARUN_INFO.education.gradYear}.`;
    }

    if (query.includes("internship") || query.includes("experience") || query.includes("work")) {
        return `Varun has completed three significant internships: \n1. ${VARUN_INFO.internships[0]}\n2. ${VARUN_INFO.internships[1]}\n3. ${VARUN_INFO.internships[2]}`;
    }

    if (query.includes("project") || query.includes("build") || query.includes("made")) {
        return `Varun has built several impressive projects: \n- ${VARUN_INFO.projects[0]}\n- ${VARUN_INFO.projects[1]}\n- ${VARUN_INFO.projects[2]}`;
    }

    if (query.includes("certificate") || query.includes("certification") || query.includes("certified") || query.includes("award")) {
        return `Varun holds several professional certifications, most notably being a Top 5% Topper in the NPTEL IOT course (87%). His other certifications include Java Foundation (Infosys), Web Development (Udemy), ML Workshop (NoviTech), and Communication Skills (TCS iON).`;
    }

    return "I am sorry, I am not here to generate such responses. I am specifically trained to provide information about Varun's career, education, and skills.";
};

interface AutoResizeProps {
    minHeight: number;
    maxHeight?: number;
}

function useAutoResizeTextarea({ minHeight, maxHeight }: AutoResizeProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            textarea.style.height = `${minHeight}px`;
            const newHeight = Math.max(
                minHeight,
                Math.min(textarea.scrollHeight, maxHeight ?? Infinity)
            );
            textarea.style.height = `${newHeight}px`;
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        if (textareaRef.current) textareaRef.current.style.height = `${minHeight}px`;
    }, [minHeight]);

    return { textareaRef, adjustHeight };
}

export function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hi! I'm Varun's AI Assistant. Ask me anything about his projects, internships, or contact details!",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 48,
        maxHeight: 120,
    });
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = (overrideInput?: string) => {
        const textToSend = typeof overrideInput === 'string' ? overrideInput : inputValue;
        if (!textToSend.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: textToSend,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        adjustHeight(true);

        setTimeout(() => {
            const responseText = getResponse(textToSend);
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
        }, 600);
    };

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer group overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <MessageSquare className="relative text-white w-7 h-7" />
                <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[90vw] h-[600px] max-h-[80vh] bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl"
                        style={{
                            backgroundImage: "url('https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_moon_2.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div className="absolute inset-0 bg-black/70 pointer-events-none" />

                        <div className="relative p-6 bg-black/40 border-b border-white/5 flex items-center justify-between backdrop-blur-md">
                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-purple-500/30 shadow-lg">
                                    <img src="/assets/varun_side_profile.jpg" alt="Varun" className="w-full h-full object-cover scale-110" />
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
                                </div>
                                <div>
                                    <h3 className="text-white font-black text-sm uppercase tracking-tighter">Varun AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                        <p className="text-neutral-500 text-[10px] uppercase font-bold tracking-widest italic">Personal Assistant</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-xl bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div
                            ref={scrollRef}
                            className="relative flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide scroll-smooth"
                        >
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`relative max-w-[85%] p-4 rounded-2xl text-sm ${msg.sender === 'user'
                                        ? 'bg-purple-600 text-white rounded-tr-none shadow-lg shadow-purple-900/20'
                                        : 'bg-black/60 text-neutral-200 rounded-tl-none border border-white/10 backdrop-blur-md'
                                        }`}>
                                        {msg.sender === 'bot' && (
                                            <div className="flex items-center gap-1.5 mb-2 opacity-40">
                                                <Sparkles size={10} className="text-purple-400" />
                                                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Assistant</span>
                                            </div>
                                        )}
                                        <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="relative p-4 border-t border-white/5 bg-black/40 backdrop-blur-md">
                            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
                                <QuickAction icon={<Code2 className="w-3 h-3" />} label="Internships" onClick={() => handleSend("Tell me about your internships")} />
                                <QuickAction icon={<Rocket className="w-3 h-3" />} label="Projects" onClick={() => handleSend("What projects have you done?")} />
                                <QuickAction icon={<Layers className="w-3 h-3" />} label="Education" onClick={() => handleSend("Where are you studying?")} />
                                <QuickAction icon={<Palette className="w-3 h-3" />} label="Contact" onClick={() => handleSend("How can I contact Varun?")} />
                            </div>

                            <div className="relative bg-neutral-900/80 rounded-2xl border border-white/10 p-2 group transition-all focus-within:border-purple-500/50 shadow-inner">
                                <Textarea
                                    ref={textareaRef}
                                    value={inputValue}
                                    onChange={(e) => {
                                        setInputValue(e.target.value);
                                        adjustHeight();
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                    placeholder="Type a message..."
                                    className={cn(
                                        "w-full px-3 py-2 resize-none border-none outline-none",
                                        "bg-transparent text-white text-sm",
                                        "focus-visible:ring-0 focus-visible:ring-offset-0 ring-0",
                                        "placeholder:text-neutral-600 min-h-[48px]"
                                    )}
                                />
                                <div className="flex items-center justify-between p-1">
                                    <div className="flex items-center gap-1">
                                        <button className="p-2 text-neutral-500 hover:text-white transition-colors">
                                            <Paperclip size={16} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleSend()}
                                        disabled={!inputValue.trim()}
                                        className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                                            inputValue.trim()
                                                ? "bg-purple-600 text-white hover:bg-purple-500 active:scale-95 shadow-lg shadow-purple-500/30"
                                                : "bg-white/5 text-neutral-600 cursor-not-allowed"
                                        )}
                                    >
                                        <ArrowUpIcon size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function QuickAction({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 transition-all shrink-0 active:scale-95"
        >
            {icon}
            <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
        </button>
    );
}
