import Home2Main from './components/home2/Home2Main';

export const metadata = {
  title: 'Dholera Smart City Gujarat | High ROI Plots - Dholera Times',
  description:
    'Exclusive residential plots in Dholera Smart City Gujarat! Close to Dholera SIR & International Airport. Book now for high returns!',
  keywords: [
    'Dholera Smart City',
    'Dholera SIR',
    'Dholera plots for sale',
    'Dholera residential plots',
    'Dholera plot investment',
    'Dholera Smart City investment',
    'plots near Dholera SIR',
    'Dholera latest news',
    'Tata Semiconductor Dholera',
    'Dholera real estate',
    'Dholera investment opportunities',
    'Dholera land for sale',
    'buy plots in Dholera',
    'Dholera Gujarat smart city',
    'Dholera infrastructure projects',
    'Dholera industrial corridor',
    'Dholera property investment',
    'Dholera future development',
    'Dholera GIFT city alternative',
  ],
  alternates: {
    canonical: 'https://www.dholeratimes.com',
  },
};

export const revalidate = 3600;

export default function Page() {
  return <Home2Main />;
}