import TiktokClient from './TiktokClient';

export const metadata = {
  title: 'Gestión de TikTok — SrCloock',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <TiktokClient />;
}
