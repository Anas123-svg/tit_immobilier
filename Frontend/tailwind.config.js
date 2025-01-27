/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  important:true,
  theme: {
  	extend: {
  		fontFamily: {
  			prata: [
  				'Prata',
  				'sans-serif'
  			]
  		},
  		colors: {
  			primary: {
  				DEFAULT: '#EB6F2D',
  				light: '#F19D64',
  				dark: '#C25315'
  			},
  			secondary: {
  				DEFAULT: '#1692BA',
  				light: '#4AB9DB',
  				dark: '#0E7191'
  			},
  			offwhite: {
  				DEFAULT: '#F7F7F7',
  				light: '#FFFFFF',
  				dark: '#E6E6E6'
  			},
  			dullwhite: {
  				DEFAULT: '#FBFBFB',
  				light: '#FFFFFF',
  				dark: '#EFEFEF'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	container: {
  		center: true,
  		padding: {
  			DEFAULT: '1rem',
  			sm: '2rem',
  			lg: '2rem',
  			xl: '3rem',
  			'2xl': '4rem'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
