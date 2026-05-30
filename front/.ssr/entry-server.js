import { renderToString } from "react-dom/server";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { createPortal } from "react-dom";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import "@emailjs/browser";
//#region src/components/Header/hook/useMediaQuery.js
var useMediaQuery = (query) => {
	const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
	useEffect(() => {
		const media = window.matchMedia(query);
		const listener = (e) => setMatches(e.matches);
		media.addEventListener("change", listener);
		return () => media.removeEventListener("change", listener);
	}, [query]);
	return matches;
};
var Header_module_default = {
	header: "_header_1hfjb_7",
	header_hidden: "_header_hidden_1hfjb_51",
	download_btn: "_download_btn_1hfjb_61",
	header_block_links: "_header_block_links_1hfjb_119",
	header_block: "_header_block_1hfjb_119",
	desktop_nav: "_desktop_nav_1hfjb_155",
	nav_link: "_nav_link_1hfjb_167",
	burger_btn: "_burger_btn_1hfjb_211",
	burger_btn_open: "_burger_btn_open_1hfjb_273",
	mobile_overlay: "_mobile_overlay_1hfjb_301",
	mobile_overlay_open: "_mobile_overlay_open_1hfjb_333",
	mobile_nav: "_mobile_nav_1hfjb_343",
	mobile_nav_link: "_mobile_nav_link_1hfjb_359"
};
//#endregion
//#region src/components/Header/Header.jsx
var NAV_LINKS = [
	{
		label: "LANDING",
		href: "#landing"
	},
	{
		label: "EXPERIENCE",
		href: "#experience"
	},
	{
		label: "TECH STACK",
		href: "#skills"
	},
	{
		label: "PROJECTS",
		href: "#projects"
	},
	{
		label: "CONTACT ME",
		href: "#contact"
	}
];
var DesktopNav = () => /* @__PURE__ */ jsx("nav", {
	className: Header_module_default.desktop_nav,
	children: NAV_LINKS.map(({ label, href }) => /* @__PURE__ */ jsx("a", {
		href,
		className: Header_module_default.nav_link,
		children: label
	}, href))
});
var Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [hidden, setHidden] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 900px)");
	const lastScrollY = useRef(0);
	const isAnchorNavRef = useRef(false);
	const scrollEndTimer = useRef(null);
	const toggleMenu = () => setIsMenuOpen((p) => !p);
	useEffect(() => {
		document.body.style.overflow = isMenuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isMenuOpen]);
	useEffect(() => {
		const onScrollEnd = () => {
			clearTimeout(scrollEndTimer.current);
			scrollEndTimer.current = setTimeout(() => {
				isAnchorNavRef.current = false;
				lastScrollY.current = window.scrollY;
				window.removeEventListener("scroll", onScrollEnd);
			}, 150);
		};
		const handleAnchorClick = (e) => {
			const href = e.currentTarget.getAttribute("href");
			if (href === "#landing") {
				e.preventDefault();
				isAnchorNavRef.current = true;
				setHidden(false);
				window.scrollTo({
					top: 0,
					behavior: "smooth"
				});
				window.addEventListener("scroll", onScrollEnd, { passive: true });
				return;
			}
			if (!document.querySelector(href)) return;
			isAnchorNavRef.current = true;
			setHidden(false);
			window.addEventListener("scroll", onScrollEnd, { passive: true });
		};
		document.querySelectorAll("a[href^=\"#\"]").forEach((link) => {
			link.addEventListener("click", handleAnchorClick);
		});
		return () => {
			document.querySelectorAll("a[href^=\"#\"]").forEach((link) => {
				link.removeEventListener("click", handleAnchorClick);
			});
			clearTimeout(scrollEndTimer.current);
		};
	}, []);
	useEffect(() => {
		const handleScroll = () => {
			if (isAnchorNavRef.current) return;
			const currentY = window.scrollY;
			const delta = currentY - lastScrollY.current;
			if (Math.abs(delta) < 5) return;
			if (delta > 0 && currentY > 60) setHidden(true);
			else setHidden(false);
			lastScrollY.current = currentY;
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("header", {
		className: `${Header_module_default.header} ${hidden ? Header_module_default.header_hidden : ""}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: Header_module_default.header_block,
			children: [/* @__PURE__ */ jsx("div", {
				className: Header_module_default.header_logo,
				children: /* @__PURE__ */ jsx("a", {
					href: "/documents/CV_Artem_Starikov.docx",
					download: true,
					className: Header_module_default.download_btn,
					children: "Download CV"
				})
			}), /* @__PURE__ */ jsx("div", {
				className: Header_module_default.header_block_links,
				children: isDesktop ? /* @__PURE__ */ jsx(DesktopNav, {}) : /* @__PURE__ */ jsxs("button", {
					className: `${Header_module_default.burger_btn} ${isMenuOpen ? Header_module_default.burger_btn_open : ""}`,
					onClick: toggleMenu,
					"aria-label": "Меню",
					"aria-expanded": isMenuOpen,
					children: [
						/* @__PURE__ */ jsx("span", {}),
						/* @__PURE__ */ jsx("span", {}),
						/* @__PURE__ */ jsx("span", {})
					]
				})
			})]
		})
	}), !isDesktop && createPortal(/* @__PURE__ */ jsx("div", {
		className: `${Header_module_default.mobile_overlay} ${isMenuOpen ? Header_module_default.mobile_overlay_open : ""}`,
		"aria-hidden": !isMenuOpen,
		children: /* @__PURE__ */ jsx("nav", {
			className: Header_module_default.mobile_nav,
			children: NAV_LINKS.map(({ label, href }) => /* @__PURE__ */ jsx("a", {
				href,
				className: Header_module_default.mobile_nav_link,
				onClick: toggleMenu,
				children: label
			}, href))
		})
	}), document.body)] });
};
var Landing_module_default = {
	landing_wrapper: "_landing_wrapper_15sr2_5",
	landing: "_landing_15sr2_5",
	title_block: "_title_block_15sr2_51",
	cv_block: "_cv_block_15sr2_53",
	expirience_block: "_expirience_block_15sr2_55",
	projects_block: "_projects_block_15sr2_57",
	contact_block: "_contact_block_15sr2_59",
	social_block: "_social_block_15sr2_61",
	end_to_end: "_end_to_end_15sr2_121",
	cursor: "_cursor_15sr2_131",
	blink: "_blink_15sr2_1",
	project_header: "_project_header_15sr2_237",
	transition_icon: "_transition_icon_15sr2_269",
	project_cards_body: "_project_cards_body_15sr2_279",
	project_card_giff: "_project_card_giff_15sr2_289",
	project_tech_icons: "_project_tech_icons_15sr2_311",
	tech_card: "_tech_card_15sr2_323",
	social_icon: "_social_icon_15sr2_393",
	contact_header: "_contact_header_15sr2_499",
	tech_stack_title: "_tech_stack_title_15sr2_541"
};
//#endregion
//#region src/components/Landing/compotent/AnimatedTitle.jsx
var SEGMENT_SETS = [[
	{
		text: "Full Stack Developer",
		style: "highlight"
	},
	{
		text: "\n",
		style: "break"
	},
	{
		text: "Redefining",
		style: "plain"
	},
	{
		text: " web with End-to-End Solutions",
		style: "end_to_end"
	}
], [
	{
		text: "Let's work",
		style: "plain"
	},
	{
		text: "\n",
		style: "break"
	},
	{
		text: " together",
		style: "end_to_end"
	},
	{
		text: "",
		style: "plain"
	}
]];
function useTypingCycle(segmentSets, typeSpeed = 55, deleteSpeed = 25, pauseAfterType = 5e3, pauseAfterDelete = 300) {
	const [setIndex, setSetIndex] = useState(0);
	const [charCount, setCharCount] = useState(0);
	const [phase, setPhase] = useState("typing");
	const segments = segmentSets[setIndex];
	const fullLength = segments.map((s) => s.text).join("").length;
	useEffect(() => {
		let timeout;
		if (phase === "typing") if (charCount < fullLength) timeout = setTimeout(() => setCharCount((c) => c + 1), typeSpeed);
		else timeout = setTimeout(() => setPhase("deleting"), pauseAfterType);
		if (phase === "deleting") if (charCount > 0) timeout = setTimeout(() => setCharCount((c) => c - 1), deleteSpeed);
		else timeout = setTimeout(() => {
			setSetIndex((i) => (i + 1) % segmentSets.length);
			setPhase("typing");
		}, pauseAfterDelete);
		return () => clearTimeout(timeout);
	}, [
		charCount,
		phase,
		fullLength
	]);
	let remaining = charCount;
	const displayed = segments.map((seg) => {
		if (seg.style === "break") return {
			...seg,
			visible: remaining > 0 ? "\n" : ""
		};
		const slice = seg.text.slice(0, remaining);
		remaining = Math.max(0, remaining - seg.text.length);
		return {
			...seg,
			visible: slice
		};
	});
	return {
		displayed,
		done: phase === "typing" && charCount >= fullLength,
		currentSegIdx: displayed.findIndex((s) => s.visible.length < s.text.length && s.style !== "break")
	};
}
function Cursor() {
	return /* @__PURE__ */ jsx("span", {
		className: Landing_module_default.cursor,
		children: "|"
	});
}
function AnimatedTitle() {
	const { displayed, done, currentSegIdx } = useTypingCycle(SEGMENT_SETS);
	return /* @__PURE__ */ jsxs("div", {
		style: { display: "grid" },
		children: [/* @__PURE__ */ jsxs("h2", {
			style: {
				visibility: "hidden",
				gridArea: "1 / 1",
				margin: 0,
				pointerEvents: "none"
			},
			children: [
				/* @__PURE__ */ jsx("span", { children: SEGMENT_SETS[0][0].text }),
				/* @__PURE__ */ jsx("br", {}),
				/* @__PURE__ */ jsx("span", { children: SEGMENT_SETS[0][2].text }),
				/* @__PURE__ */ jsx("span", {
					className: Landing_module_default.end_to_end,
					children: SEGMENT_SETS[0][3].text
				})
			]
		}), /* @__PURE__ */ jsxs("h2", {
			style: {
				gridArea: "1 / 1",
				margin: 0
			},
			children: [
				/* @__PURE__ */ jsxs("span", { children: [displayed[0].visible, !done && currentSegIdx === 0 && /* @__PURE__ */ jsx(Cursor, {})] }),
				displayed[1].visible && /* @__PURE__ */ jsx("br", {}),
				displayed[2].visible && /* @__PURE__ */ jsxs("span", {
					className: displayed[2].style === "end_to_end" ? Landing_module_default.end_to_end : void 0,
					children: [displayed[2].visible, !done && currentSegIdx === 2 && /* @__PURE__ */ jsx(Cursor, {})]
				}),
				displayed[3].visible && /* @__PURE__ */ jsxs("span", {
					className: displayed[3].style === "end_to_end" ? Landing_module_default.end_to_end : void 0,
					children: [displayed[3].visible, !done && currentSegIdx === 3 && /* @__PURE__ */ jsx(Cursor, {})]
				}),
				done && /* @__PURE__ */ jsx(Cursor, {})
			]
		})]
	});
}
//#endregion
//#region src/components/Landing/Landing.jsx
var project_tech_icons = [
	{
		name: "Azure",
		icon: "/assets/tech_icons/Microsoft_Azure.png"
	},
	{
		name: "Next",
		icon: "/assets/tech_icons/next.png"
	},
	{
		name: "Microsoft Graph",
		icon: "/assets/tech_icons/Microsoft_graph.png"
	},
	{
		name: "Nest",
		icon: "/assets/tech_icons/nest.png"
	},
	{
		name: "Tailwind",
		icon: "/assets/tech_icons/tailwind.png"
	},
	{
		name: "Typescript",
		icon: "/assets/tech_icons/typescript.png"
	},
	{
		name: "Postgresql",
		icon: "/assets/tech_icons/postgresql.png"
	},
	{
		name: "Redux",
		icon: null
	},
	{
		name: "Redis",
		icon: null
	}
];
var social_icons = [
	{
		name: "GitHub",
		icon: "/assets/social_icons/github.png",
		link: "https://github.com/IIbreathII"
	},
	{
		name: "LinkedIn",
		icon: "/assets/social_icons/linkedin.png",
		link: "https://www.linkedin.com/in/%D0%B0%D1%80%D1%82%D0%B5%D0%BC-%D1%81%D1%82%D0%B0%D1%80%D0%B8%D0%BA%D0%BE%D0%B2-92a300360/"
	},
	{
		name: "Discord",
		icon: "/assets/social_icons/discord.png",
		link: "https://discord.com/users/1471826882096926720"
	},
	{
		name: "Telegram",
		icon: "/assets/social_icons/telegram.png",
		link: "https://t.me/Temastarichok"
	}
];
var fadeUp = {
	hidden: {
		opacity: 0,
		y: 20
	},
	visible: (delay = 0) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: .5,
			ease: "easeOut",
			delay
		}
	})
};
var liftHover = {
	rest: {
		y: 0,
		scale: 1
	},
	hover: {
		y: -3,
		scale: 1.02,
		transition: {
			duration: .22,
			ease: "easeOut"
		}
	}
};
var stagger = {
	hidden: {},
	visible: { transition: {
		staggerChildren: .05,
		delayChildren: .2
	} }
};
var staggerChild = {
	hidden: {
		opacity: 0,
		y: 10
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .3,
			ease: "easeOut"
		}
	}
};
function Landing() {
	const scrollToSection = useCallback((e, id) => {
		e.preventDefault();
		e.stopPropagation();
		const target = document.querySelector(id);
		if (!target) return;
		target.scrollIntoView({ behavior: "smooth" });
	}, []);
	const handleCVClick = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		window.open("/documents/CV_Artem_Starikov.docx", "_blank", "noopener,noreferrer");
	}, []);
	const handleSocialClick = useCallback((e, link) => {
		e.preventDefault();
		e.stopPropagation();
		window.open(link, "_blank", "noopener,noreferrer");
	}, []);
	return /* @__PURE__ */ jsx("section", {
		className: Landing_module_default.landing_wrapper,
		id: "landing",
		children: /* @__PURE__ */ jsxs("div", {
			className: Landing_module_default.landing,
			children: [
				/* @__PURE__ */ jsx(motion.div, {
					className: Landing_module_default.title_block,
					variants: fadeUp,
					custom: .1,
					initial: "hidden",
					animate: "visible",
					children: /* @__PURE__ */ jsx(AnimatedTitle, {})
				}),
				/* @__PURE__ */ jsx(motion.div, {
					className: Landing_module_default.cv_block,
					variants: fadeUp,
					custom: .2,
					initial: "hidden",
					animate: "visible",
					whileHover: {
						y: -3,
						scale: 1.02,
						transition: {
							duration: .22,
							ease: "easeOut"
						}
					},
					onClick: handleCVClick,
					style: { cursor: "pointer" },
					children: /* @__PURE__ */ jsx("h2", { children: "My CV" })
				}),
				/* @__PURE__ */ jsxs(motion.div, {
					className: Landing_module_default.projects_block,
					variants: {
						...fadeUp,
						...liftHover
					},
					custom: .3,
					initial: "hidden",
					animate: "visible",
					whileHover: "hover",
					onClick: (e) => scrollToSection(e, "#projects"),
					style: { cursor: "pointer" },
					children: [/* @__PURE__ */ jsxs("div", {
						className: Landing_module_default.project_header,
						children: [/* @__PURE__ */ jsx("h2", { children: "Recent Projects" }), /* @__PURE__ */ jsx("div", { className: Landing_module_default.transition_icon })]
					}), /* @__PURE__ */ jsxs("div", {
						className: Landing_module_default.project_cards_body,
						children: [
							/* @__PURE__ */ jsx("div", { className: Landing_module_default.project_card_giff }),
							/* @__PURE__ */ jsx("h2", {
								className: Landing_module_default.tech_stack_title,
								children: "Tech stack"
							}),
							/* @__PURE__ */ jsx(motion.div, {
								className: Landing_module_default.project_tech_icons,
								variants: stagger,
								initial: "hidden",
								animate: "visible",
								children: project_tech_icons.map((tech) => /* @__PURE__ */ jsxs(motion.div, {
									className: Landing_module_default.tech_card,
									variants: staggerChild,
									children: [tech.icon && /* @__PURE__ */ jsx("img", {
										src: tech.icon,
										alt: tech.name,
										width: 24,
										height: 24,
										loading: "lazy",
										decoding: "async"
									}), /* @__PURE__ */ jsx("span", { children: tech.name })]
								}, tech.name))
							})
						]
					})]
				}),
				/* @__PURE__ */ jsxs(motion.div, {
					className: Landing_module_default.expirience_block,
					variants: {
						...fadeUp,
						...liftHover
					},
					custom: .35,
					initial: "hidden",
					animate: "visible",
					whileHover: "hover",
					onClick: (e) => scrollToSection(e, "#experience"),
					style: { cursor: "pointer" },
					children: [/* @__PURE__ */ jsx("h2", { children: "Experience" }), /* @__PURE__ */ jsxs("p", { children: [
						/* @__PURE__ */ jsx("span", { children: "Artem Starikov" }),
						" is a passionate ",
						/* @__PURE__ */ jsx("span", { children: "Full Stack Developer" }),
						" with ",
						/* @__PURE__ */ jsx("span", { children: "1.5 years " }),
						"of experience building open source projects.",
						/* @__PURE__ */ jsx("span", { children: " Based in Ukraine, " }),
						"crafting clean ",
						/* @__PURE__ */ jsx("span", { children: "Frontend" }),
						" interfaces and reliable ",
						/* @__PURE__ */ jsx("span", { children: "Backend" }),
						" solutions."
					] })]
				}),
				/* @__PURE__ */ jsxs(motion.div, {
					className: Landing_module_default.contact_block,
					variants: {
						...fadeUp,
						...liftHover
					},
					custom: .4,
					initial: "hidden",
					animate: "visible",
					whileHover: "hover",
					onClick: (e) => scrollToSection(e, "#contact"),
					style: { cursor: "pointer" },
					children: [/* @__PURE__ */ jsxs("div", {
						className: Landing_module_default.contact_header,
						children: [/* @__PURE__ */ jsxs("p", { children: [
							"Let's work together,",
							/* @__PURE__ */ jsx("br", {}),
							"Just click!"
						] }), /* @__PURE__ */ jsx("div", { className: Landing_module_default.transition_icon })]
					}), /* @__PURE__ */ jsx("h2", { children: "Contact" })]
				}),
				/* @__PURE__ */ jsx(motion.div, {
					className: Landing_module_default.social_block,
					variants: fadeUp,
					initial: "hidden",
					animate: "visible",
					children: social_icons.map((icon) => /* @__PURE__ */ jsx(motion.div, {
						className: Landing_module_default.social_icon,
						whileHover: {
							scale: 1.15,
							y: -4,
							transition: { duration: .2 }
						},
						whileTap: { scale: .9 },
						children: /* @__PURE__ */ jsx("img", {
							src: icon.icon,
							alt: icon.name,
							width: 32,
							height: 32,
							fetchPriority: "high",
							decoding: "async",
							onClick: (e) => handleSocialClick(e, icon.link)
						})
					}, icon.name))
				})
			]
		})
	});
}
var Experience_module_default = {
	experience_wrapper: "_experience_wrapper_1sibq_3",
	experience: "_experience_1sibq_3",
	coverImage: "_coverImage_1sibq_43",
	content_wrapper: "_content_wrapper_1sibq_67",
	contentInner: "_contentInner_1sibq_97",
	job: "_job_1sibq_117",
	avatarWrapper: "_avatarWrapper_1sibq_131",
	jobText: "_jobText_1sibq_155",
	jobTitle: "_jobTitle_1sibq_167",
	jobStack: "_jobStack_1sibq_183",
	textGroup: "_textGroup_1sibq_203",
	heading: "_heading_1sibq_219",
	description: "_description_1sibq_235",
	skillsList: "_skillsList_1sibq_269"
};
//#endregion
//#region src/components/Experience/Experience.jsx
var fadeLeft = {
	hidden: {
		opacity: 0,
		x: -40
	},
	visible: {
		opacity: 1,
		x: 0
	}
};
var Accent = ({ children }) => /* @__PURE__ */ jsx("span", {
	style: { color: "var(--color-accent, #FB3640)" },
	children
});
function Experience() {
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, {
		once: true,
		amount: .05
	});
	return /* @__PURE__ */ jsx("section", {
		className: Experience_module_default.experience_wrapper,
		id: "experience",
		ref: sectionRef,
		children: /* @__PURE__ */ jsxs("div", {
			className: Experience_module_default.experience,
			children: [/* @__PURE__ */ jsx("img", {
				src: "./assets/image/bunny.png",
				alt: "Experience cover",
				className: Experience_module_default.coverImage
			}), /* @__PURE__ */ jsx("div", {
				className: Experience_module_default.content_wrapper,
				children: /* @__PURE__ */ jsxs("div", {
					className: Experience_module_default.contentInner,
					children: [/* @__PURE__ */ jsxs(motion.div, {
						className: Experience_module_default.job,
						variants: fadeLeft,
						initial: "hidden",
						animate: isInView ? "visible" : "hidden",
						transition: {
							duration: .6,
							ease: "easeOut",
							delay: .1
						},
						children: [/* @__PURE__ */ jsx("div", { className: Experience_module_default.avatarWrapper }), /* @__PURE__ */ jsxs("div", {
							className: Experience_module_default.jobText,
							children: [/* @__PURE__ */ jsx("p", {
								className: Experience_module_default.jobTitle,
								children: "Full stack developer"
							}), /* @__PURE__ */ jsx("p", {
								className: Experience_module_default.jobStack,
								children: "node.js core stack"
							})]
						})]
					}), /* @__PURE__ */ jsxs(motion.div, {
						className: Experience_module_default.textGroup,
						variants: fadeLeft,
						initial: "hidden",
						animate: isInView ? "visible" : "hidden",
						transition: {
							duration: .6,
							ease: "easeOut",
							delay: .25
						},
						children: [/* @__PURE__ */ jsx("h2", {
							className: Experience_module_default.heading,
							children: "My Experience"
						}), /* @__PURE__ */ jsxs("div", {
							className: Experience_module_default.description,
							children: [
								/* @__PURE__ */ jsxs("p", { children: [
									"I am a ",
									/* @__PURE__ */ jsx(Accent, { children: "Full Stack Developer" }),
									" with 1+ years of experience. My core stack is based on the ",
									/* @__PURE__ */ jsx(Accent, { children: "Node.js" }),
									" ecosystem (",
									/* @__PURE__ */ jsx(Accent, { children: "React / Next.js" }),
									" on the frontend and ",
									/* @__PURE__ */ jsx(Accent, { children: "NestJS / Express" }),
									" on the backend)."
								] }),
								/* @__PURE__ */ jsx("br", {}),
								/* @__PURE__ */ jsx("p", { children: "In my projects, I have been responsible for the full development lifecycle, handling everything from UI design to API architecture, complex integrations, and deployment." }),
								/* @__PURE__ */ jsx("br", {}),
								/* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Key responsibilities and skills:" }) }),
								/* @__PURE__ */ jsxs("ul", {
									className: Experience_module_default.skillsList,
									children: [
										/* @__PURE__ */ jsxs("li", { children: [
											"Creating UIs and developing high-performance client interfaces using ",
											/* @__PURE__ */ jsx(Accent, { children: "React" }),
											" and ",
											/* @__PURE__ */ jsx(Accent, { children: "Next.js" })
										] }),
										/* @__PURE__ */ jsxs("li", { children: [
											"Managing complex application states (",
											/* @__PURE__ */ jsx(Accent, { children: "Redux" }),
											")"
										] }),
										/* @__PURE__ */ jsxs("li", { children: [
											"Designing server architecture and building REST APIs (CRUD, pagination) with ",
											/* @__PURE__ */ jsx(Accent, { children: "NestJS" }),
											" and ",
											/* @__PURE__ */ jsx(Accent, { children: "Express" })
										] }),
										/* @__PURE__ */ jsxs("li", { children: [
											"Working with relational databases (",
											/* @__PURE__ */ jsx(Accent, { children: "PostgreSQL, MySQL" }),
											") and caching data using ",
											/* @__PURE__ */ jsx(Accent, { children: "Redis" }),
											" on the backend"
										] }),
										/* @__PURE__ */ jsxs("li", { children: [
											"Integrating external services (in-depth experience with ",
											/* @__PURE__ */ jsx(Accent, { children: "Microsoft Graph API" }),
											")"
										] }),
										/* @__PURE__ */ jsx("li", { children: "Optimizing heavy asynchronous processes and bulk operations" }),
										/* @__PURE__ */ jsxs("li", { children: ["Deep practical experience developing with ", /* @__PURE__ */ jsx(Accent, { children: "TypeScript" })] }),
										/* @__PURE__ */ jsxs("li", { children: [
											"Version control and collaboration: ",
											/* @__PURE__ */ jsx(Accent, { children: "Git" }),
											" (branching, code review), ",
											/* @__PURE__ */ jsx(Accent, { children: "Jira" })
										] }),
										/* @__PURE__ */ jsxs("li", { children: [
											"Containerization (",
											/* @__PURE__ */ jsx(Accent, { children: "Docker" }),
											"), deployment, and application maintenance"
										] })
									]
								})
							]
						})]
					})]
				})
			})]
		})
	});
}
var Skills_module_default = { skills: "_skills_ymokj_1" };
var skillSection_module_default = {
	skillSection: "_skillSection_1kp2c_1",
	container: "_container_1kp2c_25",
	stickyHeader: "_stickyHeader_1kp2c_41",
	headerContent: "_headerContent_1kp2c_53",
	sectionNumber: "_sectionNumber_1kp2c_67",
	title: "_title_1kp2c_79",
	contentBlock: "_contentBlock_1kp2c_93",
	textContent: "_textContent_1kp2c_107",
	description: "_description_1kp2c_117",
	techList: "_techList_1kp2c_135",
	techItem: "_techItem_1kp2c_149",
	techIndex: "_techIndex_1kp2c_181",
	techName: "_techName_1kp2c_193",
	customScroll: "_customScroll_1kp2c_205"
};
//#endregion
//#region src/components/Skills/components/skillSection.jsx
function useTypewriter(text, isInView, speed = 50) {
	const [displayed, setDisplayed] = useState("");
	const [done, setDone] = useState(false);
	useEffect(() => {
		if (!isInView || done) return;
		setDisplayed("");
		let i = 0;
		const interval = setInterval(() => {
			setDisplayed(text.slice(0, i + 1));
			i++;
			if (i >= text.length) {
				clearInterval(interval);
				setDone(true);
			}
		}, speed);
		return () => clearInterval(interval);
	}, [
		isInView,
		text,
		done
	]);
	return displayed;
}
function SkillSection({ index, number, title, text, technologies, bgColor, textColor, stickyTop, headerRef, sectionRef }) {
	const titleRef = useRef(null);
	const contentRef = useRef(null);
	const isTitleInView = useInView(titleRef, {
		once: true,
		amount: .1
	});
	const isContentInView = useInView(contentRef, {
		once: true,
		amount: .1
	});
	const typedTitle = useTypewriter(title, isTitleInView);
	return /* @__PURE__ */ jsxs("section", {
		ref: sectionRef,
		className: skillSection_module_default.skillSection,
		style: {
			"--bg-color": bgColor,
			backgroundColor: bgColor,
			color: textColor,
			position: stickyTop !== null ? "sticky" : "relative",
			top: stickyTop !== null ? `${stickyTop}px` : "auto",
			zIndex: index + 1,
			maxHeight: stickyTop !== null ? `calc(100vh - ${stickyTop}px)` : "100vh",
			display: "flex",
			flexDirection: "column",
			overflow: "hidden"
		},
		children: [/* @__PURE__ */ jsx("div", {
			className: skillSection_module_default.stickyHeader,
			ref: headerRef,
			children: /* @__PURE__ */ jsx("div", {
				className: skillSection_module_default.container,
				children: /* @__PURE__ */ jsxs("div", {
					className: skillSection_module_default.headerContent,
					children: [/* @__PURE__ */ jsxs("span", {
						className: skillSection_module_default.sectionNumber,
						children: [
							"(",
							number,
							")"
						]
					}), /* @__PURE__ */ jsx("h2", {
						className: skillSection_module_default.title,
						ref: titleRef,
						children: typedTitle
					})]
				})
			})
		}), /* @__PURE__ */ jsx("div", {
			className: skillSection_module_default.contentBlock,
			children: /* @__PURE__ */ jsx("div", {
				className: skillSection_module_default.container,
				children: /* @__PURE__ */ jsxs(motion.div, {
					ref: contentRef,
					className: skillSection_module_default.textContent,
					initial: {
						opacity: 0,
						x: -40
					},
					animate: isContentInView ? {
						opacity: 1,
						x: 0
					} : {
						opacity: 0,
						x: -40
					},
					transition: {
						duration: .6,
						ease: "easeOut"
					},
					children: [/* @__PURE__ */ jsx("p", {
						className: skillSection_module_default.description,
						children: text
					}), /* @__PURE__ */ jsx("ul", {
						className: skillSection_module_default.techList,
						children: technologies.map((tech, i) => /* @__PURE__ */ jsxs("li", {
							className: skillSection_module_default.techItem,
							children: [/* @__PURE__ */ jsx("span", {
								className: skillSection_module_default.techIndex,
								children: String(i + 1).padStart(2, "0")
							}), /* @__PURE__ */ jsx("span", {
								className: skillSection_module_default.techName,
								children: tech
							})]
						}, i))
					})]
				})
			})
		})]
	});
}
//#endregion
//#region src/components/Skills/Skills.jsx
var skillsData = [
	{
		id: 1,
		number: "01",
		title: "Frontend",
		text: "Building responsive and interactive user interfaces using modern web technologies.",
		technologies: [
			"React",
			"Next.js",
			"TypeScript",
			"Tailwind CSS",
			"HTML/CSS"
		],
		bgColor: "var(--color-foreground)",
		textColor: "var(--color-font)"
	},
	{
		id: 2,
		number: "02",
		title: "Backend",
		text: "Creating robust and scalable server-side applications and APIs.",
		technologies: [
			"Node.js",
			"NestJS",
			"Express",
			"PostgreSQL",
			"Redis",
			"MySQL"
		],
		bgColor: "var(--color-accent)",
		textColor: "var(--color-background)"
	},
	{
		id: 3,
		number: "03",
		title: "Cloud & DevOps",
		text: "Deploying and managing applications in the cloud with automated workflows.",
		technologies: [
			"Azure",
			"Docker",
			"CI/CD",
			"Git",
			"Nginx"
		],
		bgColor: "var(--color-accent-white)",
		textColor: "var(--color-foreground)"
	}
];
function Skills() {
	const headerRefs = useRef([]);
	const [headerHeights, setHeaderHeights] = useState([]);
	useEffect(() => {
		const measure = () => {
			setHeaderHeights(headerRefs.current.map((el) => el?.offsetHeight ?? 0));
		};
		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, []);
	const getStickyTop = (index) => headerHeights.slice(0, index).reduce((acc, h) => acc + h, 0);
	return /* @__PURE__ */ jsx("section", {
		className: Skills_module_default.skills,
		id: "skills",
		children: skillsData.map((skill, index) => /* @__PURE__ */ jsx(SkillSection, {
			index,
			number: skill.number,
			title: skill.title,
			text: skill.text,
			technologies: skill.technologies,
			bgColor: skill.bgColor,
			textColor: skill.textColor,
			stickyTop: headerHeights.length ? getStickyTop(index) : null,
			headerRef: (el) => headerRefs.current[index] = el
		}, skill.id))
	});
}
var Projects_module_default = {
	projectsSection: "_projectsSection_12phj_1",
	container: "_container_12phj_15",
	sectionTitle: "_sectionTitle_12phj_29",
	projectsList: "_projectsList_12phj_49"
};
var ProjectCard_module_default = {
	projectCard: "_projectCard_1h77w_1",
	infoBlock: "_infoBlock_1h77w_17",
	title: "_title_1h77w_31",
	description: "_description_1h77w_49",
	techList: "_techList_1h77w_69",
	techItem: "_techItem_1h77w_85",
	techIcon: "_techIcon_1h77w_109",
	mediaBlock: "_mediaBlock_1h77w_121",
	gifImage: "_gifImage_1h77w_143",
	socialLinks: "_socialLinks_1h77w_157",
	socialLink: "_socialLink_1h77w_157",
	socialIcon: "_socialIcon_1h77w_201"
};
//#endregion
//#region src/components/Projects/components/ProjectCard.jsx
var fromLeft = {
	hidden: {
		opacity: 0,
		x: -40
	},
	visible: {
		opacity: 1,
		x: 0
	}
};
var fromRight = {
	hidden: {
		opacity: 0,
		x: 40
	},
	visible: {
		opacity: 1,
		x: 0
	}
};
var container = {
	hidden: {},
	visible: { transition: { staggerChildren: .1 } }
};
function ProjectCard({ title, description, gifUrl, technologies, socialLinks, projectLink }) {
	return /* @__PURE__ */ jsxs(motion.article, {
		className: ProjectCard_module_default.projectCard,
		initial: "hidden",
		whileInView: "visible",
		viewport: {
			once: true,
			amount: .2
		},
		children: [/* @__PURE__ */ jsxs(motion.div, {
			className: ProjectCard_module_default.infoBlock,
			variants: container,
			children: [
				/* @__PURE__ */ jsx(motion.h3, {
					className: ProjectCard_module_default.title,
					variants: fromLeft,
					transition: {
						duration: .5,
						ease: "easeOut"
					},
					children: title
				}),
				/* @__PURE__ */ jsx(motion.p, {
					className: ProjectCard_module_default.description,
					variants: fromLeft,
					transition: {
						duration: .5,
						ease: "easeOut"
					},
					children: description
				}),
				/* @__PURE__ */ jsx(motion.ul, {
					className: ProjectCard_module_default.techList,
					variants: container,
					children: technologies.map((tech, index) => /* @__PURE__ */ jsxs(motion.li, {
						className: ProjectCard_module_default.techItem,
						variants: fromLeft,
						transition: {
							duration: .4,
							ease: "easeOut"
						},
						children: [tech.icon && /* @__PURE__ */ jsx("img", {
							src: tech.icon,
							alt: `${tech.name} icon`,
							className: ProjectCard_module_default.techIcon
						}), /* @__PURE__ */ jsx("span", {
							className: ProjectCard_module_default.techName,
							children: tech.name
						})]
					}, index))
				}),
				socialLinks && socialLinks.length > 0 && /* @__PURE__ */ jsx(motion.div, {
					className: ProjectCard_module_default.socialLinks,
					variants: fromLeft,
					transition: {
						duration: .5,
						ease: "easeOut"
					},
					children: socialLinks.map((link, index) => /* @__PURE__ */ jsx("a", {
						href: link.url,
						target: "_blank",
						rel: "noopener noreferrer",
						className: ProjectCard_module_default.socialLink,
						"aria-label": `Link to project on ${link.name || "external site"}`,
						children: /* @__PURE__ */ jsx("img", {
							src: link.icon,
							alt: "link icon",
							className: ProjectCard_module_default.socialIcon
						})
					}, index))
				})
			]
		}), /* @__PURE__ */ jsx(motion.a, {
			href: projectLink,
			target: "_blank",
			rel: "noopener noreferrer",
			style: { display: "block" },
			className: ProjectCard_module_default.mediaBlock,
			variants: fromRight,
			transition: {
				duration: .6,
				ease: "easeOut"
			},
			whileHover: {
				y: -6,
				scale: 1.02
			},
			children: gifUrl ? /* @__PURE__ */ jsx("img", {
				src: gifUrl,
				alt: `${title} preview`,
				className: ProjectCard_module_default.gifImage
			}) : /* @__PURE__ */ jsx("div", { className: ProjectCard_module_default.placeholder })
		})]
	});
}
//#endregion
//#region src/components/Projects/Projects.jsx
var projectsData = [{
	id: 1,
	title: "Teams Schedule Helper",
	description: "An open source platform for managing teams and scheduling meetings directly integrated with Microsoft Teams.",
	gifUrl: "./assets/project_preview/schedule.png",
	gifLink: "https://github.com/orgs/Horizon-Office/repositories",
	technologies: [
		{
			name: "Azure",
			icon: "./assets/tech_icons/Microsoft_Azure.png"
		},
		{
			name: "Microsoft graph",
			icon: "./assets/tech_icons/Microsoft_graph.png"
		},
		{
			name: "Nest.js",
			icon: "./assets/tech_icons/nest.png"
		},
		{
			name: "Next.js",
			icon: "./assets/tech_icons/white/next.png"
		},
		{
			name: "TypeScript",
			icon: "./assets/tech_icons/typescript.png"
		},
		{
			name: "Redux",
			icon: null
		},
		{
			name: "Redis",
			icon: null
		},
		{
			name: "Type ORM",
			icon: null
		},
		{
			name: "PostgreSQL",
			icon: "./assets/tech_icons/white/postgrees.png"
		}
	]
}, {
	id: 2,
	title: "Shveina rota",
	description: "A volunteer platform supporting the Ukrainian military by coordinating the production and delivery of handmade clothing and gear.",
	gifUrl: "./assets/project_preview/Shveya.png",
	gifLink: "https://shveinarota.org/en",
	technologies: [
		{
			name: "Next.js",
			icon: "./assets/tech_icons/white/next.png"
		},
		{
			name: "Nest.js",
			icon: "./assets/tech_icons/nest.png"
		},
		{
			name: "MySQL",
			icon: "./assets/tech_icons/white/mySQL.png"
		},
		{
			name: "Type ORM",
			icon: null
		},
		{
			name: "TypeScript",
			icon: null
		}
	]
}];
function Projects() {
	return /* @__PURE__ */ jsx("section", {
		className: Projects_module_default.projectsSection,
		id: "projects",
		children: /* @__PURE__ */ jsxs("div", {
			className: Projects_module_default.container,
			children: [/* @__PURE__ */ jsx("h2", {
				className: Projects_module_default.sectionTitle,
				children: "Recent Projects"
			}), /* @__PURE__ */ jsx("div", {
				className: Projects_module_default.projectsList,
				children: projectsData.map((project) => /* @__PURE__ */ jsx(ProjectCard, {
					title: project.title,
					description: project.description,
					gifUrl: project.gifUrl,
					projectLink: project.gifLink,
					technologies: project.technologies,
					socialLinks: project.socialLinks
				}, project.id))
			})]
		})
	});
}
//#endregion
//#region src/components/Contact/hooks/useContactForm.js
var STORAGE_KEY = "contactFormDraft";
function useContactForm() {
	const [fields, setFields] = useState(() => {
		try {
			const savedFields = localStorage.getItem(STORAGE_KEY);
			return savedFields ? JSON.parse(savedFields) : {
				name: "",
				email: "",
				message: ""
			};
		} catch (error) {
			console.error("Ошибка при чтении из localStorage", error);
			return {
				name: "",
				email: "",
				message: ""
			};
		}
	});
	const [status, setStatus] = useState("idle");
	useEffect(() => {
		console.group("📧 EmailJS ENV check");
		console.log("MODE:", "production");
		console.log("VITE_EMAILJS_SERVICE_ID:", "❌ undefined");
		console.log("VITE_EMAILJS_TEMPLATE_ID:", "❌ undefined");
		console.log("VITE_EMAILJS_PUBLIC_KEY:", "❌ undefined");
		console.groupEnd();
	}, []);
	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(fields));
	}, [fields]);
	const handleChange = (e) => {
		setFields((prev) => ({
			...prev,
			[e.target.name]: e.target.value
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus("loading");
		const serviceId = void 0;
		const templateId = void 0;
		console.group("📤 EmailJS sendAttempt");
		console.log("serviceId:", serviceId ?? "❌ MISSING");
		console.log("templateId:", templateId ?? "❌ MISSING");
		console.log("publicKey:", "❌ MISSING");
		console.log("payload:", {
			name: fields.name,
			email: fields.email,
			message: fields.message.slice(0, 30) + "…"
		});
		console.groupEnd();
		console.error("❌ EmailJS: одна или несколько ENV-переменных не определены. Отправка прервана.");
		setStatus("error");
		setTimeout(() => setStatus("idle"), 3e3);
	};
	return {
		fields,
		status,
		handleChange,
		handleSubmit
	};
}
var Contact_module_default = {
	contactWrapper: "_contactWrapper_19ieu_3",
	contactContainer: "_contactContainer_19ieu_19",
	leftSide: "_leftSide_19ieu_39",
	formContainer: "_formContainer_19ieu_59",
	title: "_title_19ieu_73",
	subtitle: "_subtitle_19ieu_87",
	form: "_form_19ieu_59",
	inputField: "_inputField_19ieu_119",
	textArea: "_textArea_19ieu_121",
	submitBtn: "_submitBtn_19ieu_165",
	rightSide: "_rightSide_19ieu_199",
	linksContainer: "_linksContainer_19ieu_219",
	linkItem: "_linkItem_19ieu_235",
	icon: "_icon_19ieu_265",
	linkText: "_linkText_19ieu_281",
	copied: "_copied_19ieu_299"
};
//#endregion
//#region src/components/Contact/Contact.jsx
function Contact() {
	const [copied, setCopied] = useState(false);
	const { fields, status, handleChange, handleSubmit } = useContactForm();
	const email = "artemstarik7@gmail.com";
	const contactLinks = [
		{
			id: 1,
			name: "Discord",
			url: "https://discord.com/users/1471826882096926720",
			iconSrc: "./assets/social_icons/discord.png",
			iconAlt: "Discord"
		},
		{
			id: 3,
			name: "GitHub",
			url: "https://github.com/IIbreathII",
			iconSrc: "./assets/social_icons/github.png",
			iconAlt: "GitHub"
		},
		{
			id: 4,
			name: "LinkedIn",
			url: "https://www.linkedin.com/in/%D0%B0%D1%80%D1%82%D0%B5%D0%BC-%D1%81%D1%82%D0%B0%D1%80%D0%B8%D0%BA%D0%BE%D0%B2-92a300360/",
			iconSrc: "./assets/social_icons/linkedin.png",
			iconAlt: "LinkedIn"
		},
		{
			id: 5,
			name: "Telegram",
			url: "https://t.me/Temastarichok",
			iconSrc: "./assets/social_icons/telegram.png",
			iconAlt: "Telegram"
		}
	];
	const handleCopy = () => {
		navigator.clipboard.writeText(email);
		setCopied(true);
		setTimeout(() => setCopied(false), 2e3);
	};
	return /* @__PURE__ */ jsx("section", {
		className: Contact_module_default.contactWrapper,
		id: "contact",
		children: /* @__PURE__ */ jsxs("div", {
			className: Contact_module_default.contactContainer,
			children: [/* @__PURE__ */ jsx("div", {
				className: Contact_module_default.leftSide,
				children: /* @__PURE__ */ jsxs("div", {
					className: Contact_module_default.formContainer,
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: Contact_module_default.title,
							children: "Get in touch"
						}),
						/* @__PURE__ */ jsx("p", {
							className: Contact_module_default.subtitle,
							children: "Feel free to contact me any time. I will get back to you as soon as possible!"
						}),
						/* @__PURE__ */ jsxs("form", {
							className: Contact_module_default.form,
							onSubmit: handleSubmit,
							children: [
								/* @__PURE__ */ jsx("input", {
									type: "text",
									name: "name",
									value: fields.name,
									onChange: handleChange,
									placeholder: "Name",
									className: Contact_module_default.inputField,
									required: true
								}),
								/* @__PURE__ */ jsx("input", {
									type: "email",
									name: "email",
									value: fields.email,
									onChange: handleChange,
									placeholder: "Email",
									className: Contact_module_default.inputField,
									required: true
								}),
								/* @__PURE__ */ jsx("textarea", {
									name: "message",
									value: fields.message,
									onChange: handleChange,
									placeholder: "message",
									className: Contact_module_default.textArea,
									required: true
								}),
								/* @__PURE__ */ jsxs("button", {
									type: "submit",
									className: Contact_module_default.submitBtn,
									disabled: status === "loading",
									children: [
										status === "loading" && "Sending...",
										status === "success" && "Sent!",
										status === "error" && "Error, try again",
										status === "idle" && "Submit"
									]
								})
							]
						})
					]
				})
			}), /* @__PURE__ */ jsx("div", {
				className: Contact_module_default.rightSide,
				children: /* @__PURE__ */ jsxs("div", {
					className: Contact_module_default.linksContainer,
					children: [/* @__PURE__ */ jsxs("div", {
						className: `${Contact_module_default.linkItem} ${Contact_module_default.emailBlock} ${copied ? Contact_module_default.copied : ""}`,
						onClick: handleCopy,
						children: [/* @__PURE__ */ jsx("img", {
							src: "./assets/social_icons/email.png",
							alt: "Email",
							className: Contact_module_default.icon
						}), /* @__PURE__ */ jsx("span", {
							className: Contact_module_default.linkText,
							children: copied ? "Copied!" : email
						})]
					}), contactLinks.map((link) => /* @__PURE__ */ jsxs("a", {
						href: link.url,
						className: Contact_module_default.linkItem,
						target: "_blank",
						rel: "noreferrer",
						children: [/* @__PURE__ */ jsx("img", {
							src: link.iconSrc,
							alt: link.iconAlt,
							className: Contact_module_default.icon
						}), /* @__PURE__ */ jsx("span", {
							className: Contact_module_default.linkText,
							children: link.name
						})]
					}, link.id))]
				})
			})]
		})
	});
}
//#endregion
//#region src/App.jsx
function App() {
	const landingWrapperRef = useRef(null);
	const [stickyTop, setStickyTop] = useState(0);
	useEffect(() => {
		const calculateStickyPosition = () => {
			if (landingWrapperRef.current) {
				const landingHeight = landingWrapperRef.current.offsetHeight;
				const windowHeight = window.innerHeight;
				setStickyTop(Math.min(0, windowHeight - landingHeight));
			}
		};
		calculateStickyPosition();
		window.addEventListener("resize", calculateStickyPosition);
		return () => window.removeEventListener("resize", calculateStickyPosition);
	}, []);
	return /* @__PURE__ */ jsxs("div", {
		style: { position: "relative" },
		children: [
			/* @__PURE__ */ jsx(Header, {}),
			/* @__PURE__ */ jsx("div", {
				ref: landingWrapperRef,
				style: {
					position: "sticky",
					top: stickyTop,
					zIndex: 1
				},
				children: /* @__PURE__ */ jsx(Landing, {})
			}),
			/* @__PURE__ */ jsxs("div", {
				style: {
					position: "relative",
					zIndex: 2,
					backgroundColor: "#ffffff"
				},
				children: [
					/* @__PURE__ */ jsx(Experience, {}),
					/* @__PURE__ */ jsx(Skills, {}),
					/* @__PURE__ */ jsx(motion.div, {
						initial: {
							opacity: 0,
							y: 40
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: {
							once: true,
							amount: .05
						},
						transition: {
							duration: .7,
							ease: "easeOut"
						},
						children: /* @__PURE__ */ jsx(Projects, {})
					}),
					/* @__PURE__ */ jsx(Contact, {})
				]
			})
		]
	});
}
//#endregion
//#region src/entry-server.jsx
function render() {
	return renderToString(/* @__PURE__ */ jsx(App, {}));
}
//#endregion
export { render };
