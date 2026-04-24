# **App Name**: InsightPulse Dashboard

## Core Features:

- Live Intelligence Header: Displays the application title, 'LIVE PILOT' status with a pulsing red dot, and operational statistics.
- AI-Driven Lead Volume Chart: Visualizes 'AI-driven lead volume' over the last 6 months (JAN – JUN 2025) using a Chart.js line graph, distinguishing 'Prompt Graph' (red solid, gradient fill) from 'Traditional' (gray dashed). Includes animation for drawing on load.
- Dynamic Metric Display: Presents key performance indicators such as 'Lead volume', 'Cost per lead', 'ROI generated', and 'Live results' with their respective values and concise descriptions. Features a count-up animation for values on load.
- Dealership Activity Ticker: Shows real-time or recent activities of various dealerships through an infinitely scrolling left ticker.
- System Status Footer: Displays overall system operational status, including a pulsing green dot for 'All systems nominal', reinforcing trust and reliability.
- Responsive Data Visualization: Ensures all data and visual elements are precisely rendered within the fixed 414px wide × 518px tall container without overflow or scrollbars.

## Style Guidelines:

- Primary color: Striking red (#db3533), used for key metrics, prominent data lines, and 'LIVE PILOT' indicator, conveying urgency and high-value insights.
- Background color: A very deep charcoal (#0c0c0e), explicitly requested, providing a stark and modern dark canvas that makes the primary red and light text stand out vibrantly.
- Accent color: A vibrant green (#4cbf40), specifically used for the 'All systems nominal' status indicator, offering a contrasting signal of positive status.
- Font family: 'IBM Plex Mono' (monospace) is used throughout the interface for its technical, precise, and highly readable quality. Note: currently only Google Fonts are supported.
- Text styling: Metric values are bolded and sized 22px in primary red. Labels are 9px uppercase gray monospace, while descriptions are 9px darker gray monospace for clear hierarchy.
- Minimalist geometric icons are used, specifically a red dot for 'LIVE PILOT' and a green dot for 'All systems nominal', to visually convey status.
- Fixed dimension layout: The widget maintains an exact size of 414px wide by 518px tall with a standalone, columnar arrangement to fit all content without scrolling.
- Animated data presentation: Includes chart drawing animation, metric count-up effects on load, infinite ticker scrolling for dealership updates, and pulsating status dots for 'LIVE PILOT' and 'All systems nominal', providing a dynamic and engaging user experience.