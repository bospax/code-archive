import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Code Archive',
	tagline: 'Dinosaurs are cool',
	favicon: 'img/book.png',

	url: 'https://codebible.netlify.app/',

	baseUrl: '/',

	organizationName: 'josepacheco',
	projectName: 'documetations',

	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',

	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					routeBasePath: '/',
					sidebarPath: './sidebars.js',
					editUrl:
						'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
				},
				blog: false,
				theme: {
					customCss: './src/css/custom.css',
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			image: 'img/docusaurus-social-card.jpg',
			navbar: {
				title: 'Code Archive',
				logo: {
					alt: 'Code Archive Logo',
					src: 'img/book.png',
				},
				items: [
					{
						type: 'docSidebar',
						sidebarId: 'tutorialSidebar',
						position: 'left',
						label: 'References',
					},
				],
			},
			footer: {
				copyright: `Copyright © ${new Date().getFullYear()} My Code Archive.`,
			},
			prism: {
				theme: prismThemes.github,
				darkTheme: prismThemes.dracula,
				additionalLanguages: ['php', 'scss', 'tsx', 'jsx'],
			},
		}),
};

export default config;
