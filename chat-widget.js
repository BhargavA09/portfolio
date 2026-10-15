/*
 * INTEGRATION SNIPPET — add to Bhargav Patel's portfolio pages:
 * <!-- <link rel="stylesheet" href="chat-widget.css"> in <head>, <script src="chat-widget.js"></script> before </body> -->
 *
 * chat-widget.js — Bhargav Patel Portfolio: Recruiter Chat Widget
 * Vanilla JS/CSS, no dependencies, no build step, no API keys, no backend.
 * All behavior is namespaced under `BPChat`; only one global is created.
 * The widget answers from a small truthful knowledge base below.
 * Anything it does not know is deflected to bhrgavpatel04@gmail.com.
 */
(function () {
  "use strict";

  var NAMESPACE = "bp-chat";

  /* ============================================================
   * KNOWLEDGE BASE — truthful facts only. Never invent.
   * ============================================================ */
  var KB = {
    name: "Bhargav Patel",
    role: "full-stack software engineer",
    summary: "Bhargav Patel is a full-stack software engineer with 3+ years of experience across React, Node.js, TypeScript, .NET/C#, Python, and SQL.",
    stack: ["React", "Node.js", "TypeScript", ".NET/C#", "Python", "SQL"],
    quantlab: {
      period: "2023—Present",
      text: "QuantLab is an AI trading intelligence platform he architected end to end. Built with React 19, TypeScript, Gemini 1.5 Pro, WebSockets, and a Monte Carlo engine. It cut API latency by 68% and holds 99.9% uptime.",
      live: "https://quant-trade-neon.vercel.app",
      label: "quant-trade-neon.vercel.app"
    },
    mcdonalds: {
      period: "May 2023—Present",
      text: "IT Systems Manager & Operations Lead at McDonald's Windsor. He owns POS/database integrations and SQL automation, keeping 99.9% uptime across 1000+ daily transactions."
    },
    edukite: {
      period: "Nov 2020—Nov 2021",
      text: "Web developer & UI tester at Edukite Learning, an e-learning company, where he shipped user-facing LMS features and REST APIs."
    },
    techie: {
      period: "May 2019—Jun 2020",
      text: "At Techie Computer he built 12+ full-stack e-commerce apps that drove $500K+ in client revenue."
    },
    education: "M.Eng in Electrical & Computer Engineering from the University of Windsor (2022—2023), and a B.Eng in Computer Engineering from Gujarat Technological University.",
    location: "Bhargav is based in Windsor, ON. He is open to remote roles across Canada and is available immediately.",
    email: "bhrgavpatel04@gmail.com",
    phone: "+1 (647) 857-9456",
    linkedin: "https://linkedin.com/in/bhrgavpatel",
    linkedinLabel: "linkedin.com/in/bhrgavpatel",
    github: "https://github.com/BhargavA09",
    githubLabel: "github.com/BhargavA09",
    resume: "resume.pdf",
    portfolio: "https://bharg-patel.vercel.app",
    articles: [
      { title: "When Wars Move Markets", url: "https://bharg-patel.vercel.app/articles/when-wars-move-markets.html" },
      { title: "The Diversification Doctrine", url: "https://bharg-patel.vercel.app/articles/the-diversification-doctrine.html" }
    ]
  };

  /* ============================================================
   * INTENT MATCHING — keyword scoring over the knowledge base.
   * ============================================================ */
  var INTENTS = [
    { name: "greeting", keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "yo", "howdy"] },
    { name: "stack", keywords: ["stack", "tech", "technology", "technologies", "skills", "language", "languages", "framework", "react", "node", "typescript", "python", ".net", "c#", "sql", "frontend", "front-end", "backend", "back-end", "fullstack", "full-stack", "full stack"] },
    { name: "quantlab", keywords: ["quantlab", "quant lab", "trading", "ai platform", "gemini", "monte carlo", "websocket"] },
    { name: "mcdonalds", keywords: ["mcdonald", "mcdonalds", "mcd", "pos", "it systems", "operations lead"] },
    { name: "edukite", keywords: ["edukite", "e-learning", "elearning", "lms", "ui tester", "ui testing"] },
    { name: "techie", keywords: ["techie", "ecommerce", "e-commerce", "shopify", "client revenue"] },
    { name: "experience", keywords: ["experience", "background", "history", "career", "worked", "work history", "resume", "cv", "years", "year of", "summary", "tell me about him", "about him", "bio"] },
    { name: "education", keywords: ["education", "degree", "university", "college", "school", "m.eng", "meng", "masters", "b.eng", "beng", "bachelor", "windsor university", "gujarat"] },
    { name: "location", keywords: ["location", "located", "based", "where", "windsor", "ontario", "remote", "relocate", "relocation", "onsite", "on-site", "hybrid", "available", "availability", "start", "when can he", "notice"] },
    { name: "contact", keywords: ["contact", "email", "mail", "phone", "number", "call", "linkedin", "github", "reach", "get in touch", "social"] },
    { name: "projects", keywords: ["project", "projects", "portfolio", "built", "apps", "side project", "github repos"] },
    { name: "articles", keywords: ["article", "articles", "blog", "wrote", "writing", "research", "publication", "wars move markets", "diversification"] },
    { name: "resume", keywords: ["resume", "download", "pdf"] },
    { name: "salary", keywords: ["salary", "pay", "compensation", "comp", "rate", "expectation", "expectations", "how much", "ctc"] },
    { name: "thanks", keywords: ["thank", "thanks", "thx", "appreciate"] },
    { name: "bye", keywords: ["bye", "goodbye", "see you", "later"] }
  ];

  function normalize(text) {
    return (" " + String(text).toLowerCase().replace(/[^a-z0-9#.+\s]/g, " ") + " ");
  }

  function detectIntent(text) {
    var t = normalize(text);
    var best = null;
    var bestScore = 0;
    for (var i = 0; i < INTENTS.length; i++) {
      var intent = INTENTS[i];
      var score = 0;
      for (var j = 0; j < intent.keywords.length; j++) {
        var kw = normalize(intent.keywords[j]).trim();
        if (kw && t.indexOf(" " + kw + " ") !== -1) score += kw.length;
      }
      if (score > bestScore) { bestScore = score; best = intent.name; }
    }
    return best;
  }

  function emailLink() {
    return '<a href="mailto:' + KB.email + '" target="_blank" rel="noopener">' + KB.email + "</a>";
  }

  /* ============================================================
   * RESPONSES — truthful answers only; unknown -> deflect to email.
   * ============================================================ */
  function respond(intent, rawText) {
    var email = emailLink();
    switch (intent) {
      case "greeting":
        return "Hello! I'm Bhargav's portfolio assistant. Ask me about his experience, tech stack, projects, or availability — or " + email + " him directly.";
      case "stack":
        return "Bhargav's core stack: <strong>React, Node.js, TypeScript, .NET/C#, Python, and SQL</strong> — 3+ years building full-stack products with them.";
      case "quantlab":
        return "<strong>QuantLab</strong> (" + KB.quantlab.period + "): " + KB.quantlab.text + ' It\'s live at <a href="' + KB.quantlab.live + '" target="_blank" rel="noopener">' + KB.quantlab.label + "</a>.";
      case "mcdonalds":
        return "<strong>McDonald's Windsor</strong> (" + KB.mcdonalds.period + "): " + KB.mcdonalds.text;
      case "edukite":
        return "<strong>Edukite Learning</strong> (" + KB.edukite.period + "): " + KB.edukite.text;
      case "techie":
        return "<strong>Techie Computer</strong> (" + KB.techie.period + "): " + KB.techie.text;
      case "experience":
        return "Quick tour: <strong>QuantLab</strong> (2023—Present) — AI trading platform, architected end to end; <strong>McDonald's Windsor</strong> (2023—Present) — IT Systems Manager & Operations Lead; <strong>Edukite Learning</strong> (2020—2021) — web developer & UI tester; <strong>Techie Computer</strong> (2019—2020) — 12+ e-commerce apps. Want detail on any of them?";
      case "education":
        return "Education: " + KB.education;
      case "location":
        return KB.location;
      case "contact":
        return "You can reach Bhargav at " + email + " or " + KB.phone + ".<br>LinkedIn: " + '<a href="' + KB.linkedin + '" target="_blank" rel="noopener">' + KB.linkedinLabel + "</a>" + "<br>GitHub: " + '<a href="' + KB.github + '" target="_blank" rel="noopener">' + KB.githubLabel + "</a>";
      case "projects":
        return 'Key projects: <strong>QuantLab</strong> — live at <a href="' + KB.quantlab.live + '" target="_blank" rel="noopener">' + KB.quantlab.label + "</a>; and this portfolio site at " + '<a href="' + KB.portfolio + '" target="_blank" rel="noopener">bharg-patel.vercel.app</a>' + ". More code lives on his " + '<a href="' + KB.github + '" target="_blank" rel="noopener">GitHub</a>' + ".";
      case "articles":
        return "Bhargav writes research articles on his portfolio: " + KB.articles.map(function (a) {
          return '"<a href="' + a.url + '" target="_blank" rel="noopener">' + a.title + "</a>";
        }).join("; ") + '".';
      case "resume":
        return 'You can download his resume here: <a href="' + KB.resume + '" target="_blank" rel="noopener">resume.pdf</a>.';
      case "salary":
        return "He's happy to discuss salary expectations directly — the best way is to email him at " + email + ".";
      case "thanks":
        return "You're welcome! If you'd like to talk to Bhargav directly: " + email + ".";
      case "bye":
        return "Goodbye! For anything else, Bhargav is reachable at " + email + ".";
      default:
        return "I don't have a verified answer to that — I only speak from what's on his portfolio. For the real answer, email Bhargav at " + email + " and he'll get back to you.";
    }
  }

  /* ============================================================
   * WIDGET
   * ============================================================ */
  var QUICK_REPLIES = ["What's his stack?", "Is he available?", "Contact"];

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function timeNow() {
    try {
      return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      return "";
    }
  }

  function BPChatWidget() {
    this.open = false;
    this.greeted = false;
    this.unread = 0;
    this.build();
    this.bind();
  }

  BPChatWidget.prototype.build = function () {
    var root = el("div", null);
    root.id = NAMESPACE + "-root";
    root.setAttribute("aria-label", "Bhargav Patel portfolio chat assistant");

    // Floating button
    this.fab = el("button", NAMESPACE + "-fab bp-attention");
    this.fab.type = "button";
    this.fab.setAttribute("aria-label", "Open chat with Bhargav's portfolio assistant");
    this.fab.setAttribute("aria-expanded", "false");
    this.fab.innerHTML =
      '<svg class="' + NAMESPACE + '-bubble-icon bp-chat-bubble-icon" viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.5 0-3-.4-4.2-1L3 20l1.1-4.3A8.5 8.5 0 1 1 21 11.5z"/></svg>' +
      '<svg class="' + NAMESPACE + '-close-icon bp-chat-close-icon" viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M6 6l12 12M18 6L6 18"/></svg>' +
      '<span class="bp-chat-badge" aria-hidden="true"></span>';

    // Panel
    var panel = el("div", "bp-chat-panel");
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Chat with Bhargav's portfolio assistant");

    var header = el("div", "bp-chat-header");
    header.innerHTML =
      '<div class="bp-chat-avatar">BP</div>' +
      '<div><p class="bp-chat-title">Ask about Bhargav</p>' +
      '<div class="bp-chat-status"><span class="bp-chat-status-dot"></span>Portfolio assistant</div></div>';

    this.messages = el("div", "bp-chat-messages");
    this.messages.setAttribute("aria-live", "polite");

    var chips = el("div", "bp-quick-replies");
    this.chips = chips;
    var self = this;
    for (var i = 0; i < QUICK_REPLIES.length; i++) {
      (function (label) {
        var chip = el("button", "bp-chip", escapeHtml(label));
        chip.type = "button";
        chip.addEventListener("click", function () {
          self.send(label);
          self.hideChips();
        });
        chips.appendChild(chip);
      })(QUICK_REPLIES[i]);
    }

    var form = el("form", "bp-chat-input");
    form.setAttribute("autocomplete", "off");
    this.input = document.createElement("input");
    this.input.type = "text";
    this.input.placeholder = "Ask about experience, stack, contact…";
    this.input.setAttribute("aria-label", "Type your message");
    this.input.setAttribute("maxlength", "500");
    var sendBtn = el("button", "bp-chat-send");
    sendBtn.type = "submit";
    sendBtn.setAttribute("aria-label", "Send message");
    sendBtn.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';
    form.appendChild(this.input);
    form.appendChild(sendBtn);

    panel.appendChild(header);
    panel.appendChild(this.messages);
    panel.appendChild(chips);
    panel.appendChild(form);

    root.appendChild(this.fab);
    root.appendChild(panel);
    document.body.appendChild(root);

    this.root = root;
    this.panel = panel;
    this.form = form;
    this.badge = root.querySelector(".bp-chat-badge");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      self.send(self.input.value);
    });
  };

  BPChatWidget.prototype.bind = function () {
    var self = this;
    this.fab.addEventListener("click", function () {
      self.toggle();
    });
    // Dismiss attention pulse on first interaction
    this.fab.addEventListener("pointerenter", function () {
      self.fab.classList.remove("bp-attention");
    }, { once: true });
  };

  BPChatWidget.prototype.toggle = function () {
    this.open = !this.open;
    this.root.classList.toggle(NAMESPACE + "-open", this.open);
    this.root.classList.toggle("bp-open", this.open);
    this.fab.setAttribute("aria-expanded", this.open ? "true" : "false");
    this.fab.setAttribute("aria-label", this.open ? "Close chat" : "Open chat with Bhargav's portfolio assistant");
    this.fab.classList.remove("bp-attention");
    if (this.open) {
      this.clearUnread();
      if (!this.greeted) {
        this.greeted = true;
        var self = this;
        this.showTyping(function () {
          self.addMessage("bot", respond("greeting"));
        });
      } else {
        this.input.focus();
      }
    }
  };

  BPChatWidget.prototype.hideChips = function () {
    this.chips.style.display = "none";
  };

  BPChatWidget.prototype.showTyping = function (done) {
    var typing = el("div", "bp-typing");
    typing.setAttribute("aria-hidden", "true");
    typing.innerHTML = "<span></span><span></span><span></span>";
    this.messages.appendChild(typing);
    this.scrollBottom();
    setTimeout(function () {
      typing.remove();
      done();
    }, 700);
  };

  BPChatWidget.prototype.addMessage = function (who, html) {
    var msg = el("div", "bp-msg " + who, html + '<span class="bp-time">' + escapeHtml(timeNow()) + "</span>");
    this.messages.appendChild(msg);
    this.scrollBottom();
  };

  BPChatWidget.prototype.scrollBottom = function () {
    this.messages.scrollTop = this.messages.scrollHeight;
  };

  BPChatWidget.prototype.clearUnread = function () {
    this.unread = 0;
    if (this.badge) {
      this.badge.textContent = "";
      this.badge.classList.remove("bp-show");
    }
  };

  BPChatWidget.prototype.bumpUnread = function () {
    if (this.open || !this.badge) return;
    this.unread += 1;
    this.badge.textContent = this.unread > 9 ? "9+" : String(this.unread);
    this.badge.classList.add("bp-show");
  };

  BPChatWidget.prototype.send = function (raw) {
    var text = String(raw || "").trim();
    if (!text) return;
    this.addMessage("user", escapeHtml(text));
    this.input.value = "";
    this.hideChips();
    var intent = detectIntent(text);
    var self = this;
    this.showTyping(function () {
      self.addMessage("bot", respond(intent, text));
      self.bumpUnread();
    });
  };

  /* ============================================================
   * INIT — idempotent, collision-safe, never throws into the page.
   * ============================================================ */
  var widget;

  function init() {
    try {
      if (window.BPChat && window.BPChat._instance) return; // already mounted
      if (!document.body) return;
      widget = new BPChatWidget();
      window.BPChat = window.BPChat || {};
      window.BPChat._instance = widget;
      window.BPChat.version = "1.0.0";
    } catch (e) {
      /* Widget must never break the host page. */
      if (window.console && console.error) console.error("[BPChat] init failed:", e);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
