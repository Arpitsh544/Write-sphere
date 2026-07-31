import { BlogPost, UserProfile } from "../types";

export const initialUserProfile: UserProfile = {
  name: "Elena Rodriguez",
  email: "elena@writesphere.com",
  handle: "@elena_writes",
  bio: "Digital Nomad | Coffee Enthusiast | Sharing stories about tech, travel, and the minimalist lifestyle.",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBANSQjKGgyxuPjwlSmvA6F8z-DFAiKGtI6o-hl9XhYW65vb0AXgjyUSmYvXGoJbGn_r9QgkxphgY4jwq8Skykbky8dVi3tCPqR1PUtNjUAXuaGaDfgeM-xvuUxlmNcM11LFrZq-JgdOF1N4F75RV9wy1pLmWLmivhkMDGynskJGYaZB6EqI1VgBLXXAmPMkpUTjpY_3K0Z_HoGqhxvR9mR5wuOHUtMFVL6RkbgmcVfJ016D0jwAByP",
  followersCount: 1200,
  followingCount: 482,
  publishedCount: 24,
  isPremium: true,
};

export const initialBlogs: BlogPost[] = [
  {
    id: "blog-1",
    title: "The Zen of Minimalist Product Design in 2024",
    subtitle:
      "Exploring how the world's leading tech companies are pivoting back to physical buttons and quiet interfaces in an age of digital noise.",
    category: "Technology",
    date: "Oct 24, 2023",
    readTime: "5 min read",
    author: {
      name: "Elena Vance",
      role: "Senior Tech Journalist",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDWX7i5QHm8cX0LV6XroFChvMrMR2oWNn4GdQBhr8AEkBZsJsOkZGWX5PMhdhUkFWcQ8YBY26AdxHDyiHUl-IUDfovmXlVOk5hiJeBzASe-Ol7u3DVVUPiwg-YeDKBNBGVM-jPwUTk29mtFXp4UuPlcFm-6gyA2HYMEgo_Fq8CICWQAAN1PYEQlPnBKglTsA8VMPyKoUqxEU_BuLNzVeVMIP3EmmwgBQHrzyNMBd-25gEIbBTKXLHAa",
      handle: "@elena_vance",
      isFollowing: false,
    },
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQNuXs1oP5iOArqmW4oonWOHlXpvjJGEaAxFqzl3F8nHKNLrJiSfHT1wGZzFDQB5-cqrzcKtDCYZHO2T_qPczW0wgwXaHKs91BEfpw8I4eB-FTeNYGTKCZI3fKtOGEW5U0-9QZu7zBfBRQu6iX5n5SG-WFbs6_LboUcCizvIMCqo1CsALbQOZvY_dAMcEAKfLns3h8zWlfLwoLh3hhvCUYo6zfZ9TfyzLCpXRE5gC5_eLSGqCK0HoZ",
    isMustRead: true,
    likesCount: 2420,
    commentsCount: 128,
    isLiked: false,
    isSaved: false,
    viewsCount: 5400,
    tags: ["Minimalism", "Technology", "Design"],
    status: "published",
    content: [
      "In an era defined by constant notifications and the relentless hum of digital noise, silence has become a luxury. Modern software and hardware creators are beginning to realize that the most powerful feature a product can offer is peace of mind.",
      "## The Shift Back to Physicality & Quiet Design",
      "For years, interfaces expanded aggressively with glowing metrics, infinite feeds, and intrusive red badges. Today, leading design teams are taking a stand for intentionality. By returning to tactical feedback, subdued visual palettes, and purposeful typography, digital tools can empower users without consuming their mental bandwith.",
      "## Less Friction, More Meaning",
      "When every component on a screen competes for eyes, nothing stands out. Designing for zen means respecting the human attention span and giving content room to breathe.",
    ],
  },
  {
    id: "blog-2",
    title: "The Silent Architect: Why Minimalism is the Future of Digital Narrative",
    subtitle:
      "In an era defined by constant notifications and the relentless hum of digital noise, silence has become a luxury.",
    category: "Design Philosophy",
    date: "Oct 24, 2023",
    readTime: "8 min read",
    author: {
      name: "Julian Vane",
      role: "Lead Editor at WriteSphere",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBxwEplHQjke_KsTcoOEmokjZMcVpUXAAbgMJR2dXfDP6WWC58N3hhxLB70lpEwTmf_amwrMB53ptcvbdcTBevHdlJvNcfTJcZ-oRjYpljGvSfP4iRO_4KsOmQeorDxhyX6mepbEl6PQyPjg80CrpKAizZ0VMjDEQ9g7tt7i-q0wrskBWAnRObOGETmRztvHUWmyHnMV2Mp8XgfkqDzG5BBzTC0CoDxbUoBRhMDaHM6AtWEIkFT6Ijc",
      handle: "@julianvane",
      isFollowing: false,
    },
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXsG4faqJK6zNoY9bYe3J-cc6ii9voL79Q0qoQXlNeQ94EKL8aSJBuy55RVa5OiWrpSxv5e5rTI80pEOyPuljkA7CJE9PVLORVUTukkvmP-db4aahhhLaqfExCfNP9cB_DAlQOP-sPkJU3Tp2uxA43CARCc0rr35BL7PZMYlKIW_-KihfzpKAE5K0navicORbcF4DbLMzOR1V8pFT8K1Se2ejrzF7tsjDX8D8_MNBG6cyRuNthHkzs",
    figureImage: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGv2YYho0j7aN-rX-fYKFyH45LNVLlEugFY6mHV5h3qdZubXHZ8BSAvHIE-R8EmfPSheA-ASfGe2AW8IVCSj-mA5gfk1KTME5pVlNWgiSadVlTjIsvpr3isNP8PFLiCKQ9VKzfK5Et4UgdjA8TxLtj1kGGud3s8wksdmrvLNonZIMYa1HbezdPOGROKSv1Do-dH4EkGVqsPRDZEGBHua90t7O1vqqu3xY6d309NMrSXh1MI7jmi3AZ",
      caption: "Figure 1.1: The visualization of focused digital neural pathways.",
    },
    isMustRead: false,
    likesCount: 2400,
    commentsCount: 128,
    isLiked: false,
    isSaved: false,
    viewsCount: 8200,
    tags: ["Minimalism", "WritingTips", "UXDesign"],
    status: "published",
    content: [
      "In an era defined by constant notifications and the relentless hum of digital noise, silence has become a luxury. This article explores how minimalist design isn't just an aesthetic choice, but a cognitive necessity for deep reading and meaningful content consumption.",
      "## The Cognitive Load Crisis",
      "Every blinking banner, unnecessary sidebar, and high-contrast pop-up consumes a fraction of our attention. For a writer, the goal is to create a seamless bridge between their thoughts and the reader's mind. When the interface is busy, that bridge becomes cluttered with obstacles.",
      "By leveraging whitespace—or what we like to call 'breathable space'—we allow the typography to stand as the primary architecture of the experience. This doesn't mean stripping away functionality; rather, it means hiding the machinery so the narrative can breathe.",
      "## Designing for the Zen State",
      "Achieving a 'Flow' state in reading requires a careful balance of rhythm and tone. Typography choices must be invisible yet impactful. The font weight, line-height, and paragraph spacing are the silent conductors of the reading speed.",
      "As we move forward, the platforms that will succeed are those that value the user's peace of mind as much as their engagement metrics. Minimalism is more than a style; it's a profound respect for the human attention span.",
    ],
  },
  {
    id: "blog-3",
    title: "Finding Silence in the Heart of Tokyo",
    subtitle:
      "A traveler's guide to the most peaceful shrines and hidden parks away from the neon lights of Shibuya.",
    category: "Travel",
    date: "Oct 18, 2023",
    readTime: "3 min read",
    author: {
      name: "Julian Gray",
      role: "Travel Photographer & Essayist",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCDXra_zlccfEmU4AbSQznEALOZ0z6bp1GxeKNbaTaGiDvgKAB4Te2WRPpwJbpU1XI-wjD3XBL7IDKaz24tMGQnWvt7aJ2aLDrW2IeIn1j1Aq8gVnGwg7UYCt06XqB3Z99wVkLm25rD0Xwj9G3sNLAXa_kmB1UXJVDT4VubcdAGBASNE7RIAW5SKA8ugLmCF1dHIhxY2iR3giNN8k0OmE0pYX8mIh3QM7mhYChG33MbvuyJ_CesrEJ2",
      handle: "@juliangray",
    },
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCDXra_zlccfEmU4AbSQznEALOZ0z6bp1GxeKNbaTaGiDvgKAB4Te2WRPpwJbpU1XI-wjD3XBL7IDKaz24tMGQnWvt7aJ2aLDrW2IeIn1j1Aq8gVnGwg7UYCt06XqB3Z99wVkLm25rD0Xwj9G3sNLAXa_kmB1UXJVDT4VubcdAGBASNE7RIAW5SKA8ugLmCF1dHIhxY2iR3giNN8k0OmE0pYX8mIh3QM7mhYChG33MbvuyJ_CesrEJ2",
    likesCount: 120,
    commentsCount: 10,
    viewsCount: 1450,
    tags: ["Travel", "Japan", "Mindfulness"],
    status: "published",
    content: [
      "Tokyo is renowned for its bustling crosswalks, luminous neon billboards, and endless urban energy. Yet, beneath the high-frequency pulse of the metropolis lies a world of tranquil sanctuaries.",
      "## Hidden Gardens & Ancient Temples",
      "Just a few paces off the main avenues, mossy stone pathways wind through bamboo groves and quiet koi ponds. At Nezu Museum's Japanese garden, morning mist lingers over wooden bridges, creating a profound sense of stillness.",
      "Stepping into these sanctuary spaces restores clarity, reminding us that tranquility is always accessible even amidst the most vibrant cities.",
    ],
  },
  {
    id: "blog-4",
    title: "Why Generative AI is Changing Narrative Flow",
    subtitle:
      "How creative writers are using LLMs to storyboard complex world-building scenarios without losing their voice.",
    category: "AI",
    date: "Oct 10, 2023",
    readTime: "7 min read",
    author: {
      name: "Sarah Chen",
      role: "AI & Narrative Researcher",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA3FuQdtfXuYY2bdaIlhIG4NoM-U9wbalGCOyPPGIpKaCsOZeJ0jh45OtHyDcU74LGIMCWZXYGpvpk_WwStV-KG2evDUX8NSmbia9ic40nLvTfe2_xRaGsQuIoByUJMxsoCK45OlbJYES8nRpMq0xXMdhl8GcqCXCMRJI20zqWtfojucZGaselGf9ObY2AP55IFD8n0rgT9jxOwePLaeOkcBRP0i2RTgfqMHOtWi30vGB2lNkSVQTyd",
      handle: "@sarah_ai",
    },
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA3FuQdtfXuYY2bdaIlhIG4NoM-U9wbalGCOyPPGIpKaCsOZeJ0jh45OtHyDcU74LGIMCWZXYGpvpk_WwStV-KG2evDUX8NSmbia9ic40nLvTfe2_xRaGsQuIoByUJMxsoCK45OlbJYES8nRpMq0xXMdhl8GcqCXCMRJI20zqWtfojucZGaselGf9ObY2AP55IFD8n0rgT9jxOwePLaeOkcBRP0i2RTgfqMHOtWi30vGB2lNkSVQTyd",
    likesCount: 85,
    commentsCount: 24,
    viewsCount: 2100,
    tags: ["AI", "CreativeWriting", "Storytelling"],
    status: "published",
    content: [
      "Generative artificial intelligence is redefining the creative toolkit for authors and narrative creators around the globe. Rather than replacing human artistry, generative models serve as dynamic sparring partners.",
      "## World-Building at Scale",
      "Writers can now instantly brainstorm multi-generational character histories, dialect nuances, and speculative technology systems. By automating tedious outline drafting, storytellers preserve their creative energy for core thematic resonance.",
      "## Preserving the Human Element",
      "The key to masterful AI-assisted writing is maintaining human voice and intentional curation. Technology supplies the canvas options; the human heart directs the brushstroke.",
    ],
  },
  {
    id: "blog-5",
    title: "The Art of the Clean Commit Message",
    subtitle:
      "Practical tips for maintaining a readable git history in large-scale collaborative software projects.",
    category: "Programming",
    date: "Sep 28, 2023",
    readTime: "4 min read",
    author: {
      name: "Marcus Webb",
      role: "Staff Software Engineer",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAmlW379Mf6ugkCz2H3lGqSeC3WVMQtzzg5btPE0U47eBWqIi_zz3ZFNJfeqcn9WJxhE7M_fxQW4g-3hBGzwJ1YsfmqofA-K5HhNT8aWyk4YdwEYxKbIVlSGVJiWunTyy8HafBY41KqkTrzpS2Eje9OQhNi_tIRIqK5Xb3rodSdIhpYCN7f26yDbSAJcj0uQROEPbuau7I-kJqDE_5hNpXT8l5O3H0OvaNxTqyNc8wmfZrJ8dlYkPHs",
      handle: "@marcuswebb",
    },
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAmlW379Mf6ugkCz2H3lGqSeC3WVMQtzzg5btPE0U47eBWqIi_zz3ZFNJfeqcn9WJxhE7M_fxQW4g-3hBGzwJ1YsfmqofA-K5HhNT8aWyk4YdwEYxKbIVlSGVJiWunTyy8HafBY41KqkTrzpS2Eje9OQhNi_tIRIqK5Xb3rodSdIhpYCN7f26yDbSAJcj0uQROEPbuau7I-kJqDE_5hNpXT8l5O3H0OvaNxTqyNc8wmfZrJ8dlYkPHs",
    likesCount: 342,
    commentsCount: 18,
    viewsCount: 3800,
    tags: ["Git", "Programming", "Development"],
    status: "published",
    content: [
      "A software codebase is a living historical record. While code describes 'how' a feature functions, git commit logs tell the story of 'why' specific choices were made.",
      "## Imperative Mood & Clear Scope",
      "Always write commit subjects in the imperative mood ('Add user authentication' instead of 'Added user authentication'). Keep lines under 50 characters and elaborate in the body on motivation, trade-offs, and breaking changes.",
      "## Atomic Commits",
      "Small, focused commits make code reviews faster, debugging easier, and git bisect pinpointing effortless.",
    ],
  },
  {
    id: "blog-6",
    title: "The Art of Minimalist Living in a Digital Age",
    subtitle:
      "Mindful habits to reclaim your digital sanctuary and focus on what truly matters.",
    category: "Digital Nomad",
    date: "Oct 24, 2023",
    readTime: "6 min read",
    author: {
      name: "Elena Rodriguez",
      role: "Digital Nomad & Writer",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBANSQjKGgyxuPjwlSmvA6F8z-DFAiKGtI6o-hl9XhYW65vb0AXgjyUSmYvXGoJbGn_r9QgkxphgY4jwq8Skykbky8dVi3tCPqR1PUtNjUAXuaGaDfgeM-xvuUxlmNcM11LFrZq-JgdOF1N4F75RV9wy1pLmWLmivhkMDGynskJGYaZB6EqI1VgBLXXAmPMkpUTjpY_3K0Z_HoGqhxvR9mR5wuOHUtMFVL6RkbgmcVfJ016D0jwAByP",
      handle: "@elena_writes",
    },
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXsG4faqJK6zNoY9bYe3J-cc6ii9voL79Q0qoQXlNeQ94EKL8aSJBuy55RVa5OiWrpSxv5e5rTI80pEOyPuljkA7CJE9PVLORVUTukkvmP-db4aahhhLaqfExCfNP9cB_DAlQOP-sPkJU3Tp2uxA43CARCc0rr35BL7PZMYlKIW_-KihfzpKAE5K0navicORbcF4DbLMzOR1V8pFT8K1Se2ejrzF7tsjDX8D8_MNBG6cyRuNthHkzs",
    likesCount: 342,
    commentsCount: 12,
    viewsCount: 1200,
    tags: ["Minimalism", "Lifestyle", "DigitalNomad"],
    status: "published",
    content: [
      "As digital nomads, our workspaces change constantly—from high-altitude mountain cafes in Colombia to serene coastal lofts in Portugal. Maintaining clarity requires curating not just physical luggage, but digital environments.",
      "## Decluttering the Screen",
      "Consolidate communication channels, turn off non-essential push notifications, and adopt batch processing for emails. When your digital desktop is clean, focus follows naturally.",
    ],
  },
  {
    id: "blog-7",
    title: "Finding Your Voice: A Guide for Creative Souls",
    subtitle:
      "Overcoming imposter syndrome and writing authentically for the open web.",
    category: "Creative Writing",
    date: "Sep 12, 2023",
    readTime: "5 min read",
    author: {
      name: "Elena Rodriguez",
      role: "Digital Nomad & Writer",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBANSQjKGgyxuPjwlSmvA6F8z-DFAiKGtI6o-hl9XhYW65vb0AXgjyUSmYvXGoJbGn_r9QgkxphgY4jwq8Skykbky8dVi3tCPqR1PUtNjUAXuaGaDfgeM-xvuUxlmNcM11LFrZq-JgdOF1N4F75RV9wy1pLmWLmivhkMDGynskJGYaZB6EqI1VgBLXXAmPMkpUTjpY_3K0Z_HoGqhxvR9mR5wuOHUtMFVL6RkbgmcVfJ016D0jwAByP",
      handle: "@elena_writes",
    },
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCDXra_zlccfEmU4AbSQznEALOZ0z6bp1GxeKNbaTaGiDvgKAB4Te2WRPpwJbpU1XI-wjD3XBL7IDKaz24tMGQnWvt7aJ2aLDrW2IeIn1j1Aq8gVnGwg7UYCt06XqB3Z99wVkLm25rD0Xwj9G3sNLAXa_kmB1UXJVDT4VubcdAGBASNE7RIAW5SKA8ugLmCF1dHIhxY2iR3giNN8k0OmE0pYX8mIh3QM7mhYChG33MbvuyJ_CesrEJ2",
    likesCount: 156,
    commentsCount: 8,
    viewsCount: 890,
    tags: ["Writing", "Creativity", "Mindset"],
    status: "published",
    content: [
      "Every writer faces the blank canvas with a quiet hesitation: 'Will anyone care about what I have to say?' Imposter syndrome is not a sign of weakness; it is a sign that you care deeply about your craft.",
      "## Write for One Person",
      "When drafting, imagine writing a letter to a single friend who needs to hear your perspective. This immediately grounds your tone in authentic empathy.",
    ],
  },
  {
    id: "blog-8",
    title: "Draft: The Future of Quiet Technology in Modern Workspaces",
    subtitle: "A deep dive into zero-distraction hardware and software interfaces.",
    category: "Technology",
    date: "Draft • Saved 2h ago",
    readTime: "4 min read",
    author: {
      name: "Elena Rodriguez",
      role: "Digital Nomad & Writer",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBANSQjKGgyxuPjwlSmvA6F8z-DFAiKGtI6o-hl9XhYW65vb0AXgjyUSmYvXGoJbGn_r9QgkxphgY4jwq8Skykbky8dVi3tCPqR1PUtNjUAXuaGaDfgeM-xvuUxlmNcM11LFrZq-JgdOF1N4F75RV9wy1pLmWLmivhkMDGynskJGYaZB6EqI1VgBLXXAmPMkpUTjpY_3K0Z_HoGqhxvR9mR5wuOHUtMFVL6RkbgmcVfJ016D0jwAByP",
      handle: "@elena_writes",
    },
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAmlW379Mf6ugkCz2H3lGqSeC3WVMQtzzg5btPE0U47eBWqIi_zz3ZFNJfeqcn9WJxhE7M_fxQW4g-3hBGzwJ1YsfmqofA-K5HhNT8aWyk4YdwEYxKbIVlSGVJiWunTyy8HafBY41KqkTrzpS2Eje9OQhNi_tIRIqK5Xb3rodSdIhpYCN7f26yDbSAJcj0uQROEPbuau7I-kJqDE_5hNpXT8l5O3H0OvaNxTqyNc8wmfZrJ8dlYkPHs",
    likesCount: 0,
    commentsCount: 0,
    viewsCount: 0,
    tags: ["Technology", "Work", "Focus"],
    status: "draft",
    content: [
      "Draft content exploring quiet technology...",
    ],
  },
];

export const initialComments: Record<string, any[]> = {
  "blog-2": [
    {
      id: "c1",
      authorName: "Maya Lin",
      authorAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBcNVDpCXE0smONXtRSkkB8lhlc5s_9tpaf2pc8NB4HiTwHMtdqOj3ok8PKkxX8EYDy_XLsikx3MaOKBOoAEwpd-LHYvFePuhH-7oK1mB2OiGhHWnnsPM1bIPbJJCeDmzbP1uGZbPQ6otUd1ewhDqFaJb_kPcmHDmuwPt6XhyrMZAa0Ir2A5n5_UY-5hLXn1teOw5HD7iV7X3VlhFI2JLJMTfd2y3nlhYbqRy0m2LOTVxuVCPrfcG4v",
      date: "2 hours ago",
      text: "This article articulated exactly what I've felt when reading on modern blogs. Whitespace is truly an active architectural element!",
      likes: 42,
      isLiked: false,
    },
    {
      id: "c2",
      authorName: "David K.",
      authorAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA2EScVgXFobF3ACMTtenOTfaufUFGi1rkCClTETJK8GJxS7-M6XZip3jfnLvvGKrbQk2TO4THwIFl9MIZ_Kk_6xOSMzVKvVeL7gPcaO1U-xHSQamqH9txjA9QwI6_aBDBcIVuoLAhrM6TsrX67VnJ5lWLFh4M7I9Grim900mtJ0PzOCFSO_yEt-l5YU33-SIQqs1SSgn0GzTqOEyXKBOo2nKI4jvhUHJezBM9shTJkBx2b1Nu5RMGN",
      date: "5 hours ago",
      text: "Brilliant perspective on cognitive load in UI. Subscribing to Julian's future pieces!",
      likes: 19,
      isLiked: false,
    },
  ],
};
